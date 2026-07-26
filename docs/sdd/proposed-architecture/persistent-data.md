# 3.4 Persistent Data Management

## What must survive

Persistent data is what outlives one run of the application. The candidates are the entity objects of [RAD 3.4.3.2](../../rad/proposed-system/system-models/object-model), but not all of them qualify and not only they do.

| Data | Persistent | Why |
|------|-----------|-----|
| Account credentials | Yes | The Traveler must be admitted on a later run |
| Personal profile, including interest and trip labels | Yes | [FR-A.2.5](../../rad/proposed-system/functional) |
| Conversations and their messages | Yes | [FR-D.1.3](../../rad/proposed-system/functional) |
| Saved items | Yes | [FR-C.1.x](../../rad/proposed-system/functional) |
| Privacy preferences | Yes | [FR-A.4.2](../../rad/proposed-system/functional) — a boundary object that is nonetheless persistent |
| Profile photograph | Yes | Referenced by the profile |
| Trip catalogue | Yes | Seeded once, then read from storage |
| Companion catalogue | **No** | Fixed content compiled into the application; never modified, so nothing to persist |
| Companion presence, search results, ranking | **No** | Derived, and meaningful only during a run |

## Three mechanisms, deliberately

The data is not homogeneous, and one mechanism does not suit all of it. The choice for each follows the standard decision criteria — access pattern, need for queries, volume, and whether the data is structured.

| Mechanism | Holds | Why this mechanism |
|-----------|-------|--------------------|
| **Relational database** (`travelmate.db`) | Account, personal profile, conversations, trip catalogue | Structured, queried by attribute, and — for messages — retrieved as a subset selected by conversation and kept in order. This is what a relational store is for. |
| **Key–value preference store** | Saved items, privacy preferences | Small, read whole and written whole, never queried by attribute. A database table would add a schema, a migration path and a join for data that is always fetched in its entirety. |
| **File system** | Profile photographs | Large and unstructured. Storing images as rows would make the database grow with them and force image bytes through the query engine. The database holds only the path. |

The third choice is the one the criteria most clearly dictate: large unstructured content belongs in files, and is exactly the case flat files exist for. It is also what makes [NFR-P.5](../../rad/proposed-system/non-functional/performance) satisfiable.

## Database schema

One file, `travelmate.db`, in the application's private storage directory. Schema version **4**.

```sql
CREATE TABLE IF NOT EXISTS personal_profile (
  id            INTEGER PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  description   TEXT NOT NULL,
  photo_path    TEXT NOT NULL,
  interest_tags TEXT NOT NULL,
  trip_tags     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS account (
  id                  INTEGER PRIMARY KEY,
  username            TEXT NOT NULL,
  password_salt       TEXT NOT NULL,
  password_hash       TEXT NOT NULL,
  password_iterations INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  mate_id          TEXT NOT NULL,
  message_id       TEXT NOT NULL,
  text             TEXT NOT NULL,
  is_from_me       INTEGER NOT NULL,
  sent_at          TEXT NOT NULL,
  attached_trip_id TEXT
);

CREATE TABLE IF NOT EXISTS trips (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id           TEXT NOT NULL,
  collection        TEXT NOT NULL,
  position          INTEGER NOT NULL,
  asset             TEXT NOT NULL,
  label             TEXT NOT NULL,
  schedule_images   TEXT NOT NULL,
  tags              TEXT NOT NULL,
  destination_title TEXT NOT NULL,
  description       TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_mate_id
  ON chat_messages (mate_id);
```

Three properties of this schema are design decisions rather than incidental.

**`personal_profile` and `account` hold a single row**, identified by a fixed key. Writing is an upsert, so an update replaces the row rather than appending a second one — which is how [NFR-R.2](../../rad/proposed-system/non-functional/reliability) is enforced by the schema itself rather than by a convention the code must remember.

**`chat_messages` carries an index on `mate_id`.** Retrieving one conversation must not examine the messages of others ([NFR-P.4](../../rad/proposed-system/non-functional/performance)); the index is what makes that true rather than merely intended. It is also the reason `mate_id` cannot be encrypted — see below.

**`trips` stores two collections in one table**, distinguished by `collection` and ordered by `position`. The catalogue is public read-only content: it is seeded once on first run and read from the database thereafter, which keeps a single retrieval path rather than one for seeded data and another for stored data.

## What is encrypted, and what is not

Encryption is applied by the Persistence subsystem, per column, before the value reaches Data Access. The engine never sees plaintext for a protected column, and no component above Persistence knows encryption happens at all.

Protection is deliberately **not uniform**, as [NFR-I.5](../../rad/proposed-system/non-functional/implementation) requires. Encrypting a column costs the ability to query, order or index it; encrypting content that is public gains nothing and loses that.

| Table | Encrypted | Plain | Why plain |
|-------|-----------|-------|-----------|
| `personal_profile` | `first_name`, `last_name`, `description`, `photo_path`, `interest_tags`, `trip_tags` | `id` | A fixed key with no informational content |
| `account` | `username` | `password_salt`, `password_hash`, `password_iterations` | The stored credential is one-way, not concealed: encrypting it would protect nothing that derivation does not already protect |
| `chat_messages` | `text` | `mate_id`, `message_id`, `is_from_me`, `sent_at`, `attached_trip_id` | The columns by which conversations are selected and ordered. Encrypting `mate_id` would defeat the index and force every message to be decrypted to find one conversation |
| `trips` | — | all | Public catalogue content |

Label lists are serialised before encryption, so a structured value is protected as one payload rather than field by field.

### Residual exposure, stated plainly

Two consequences follow from the choices above and are recorded rather than concealed.

**Conversation metadata is readable.** Someone who obtains the database learns *that* an exchange took place with a given companion, when, and in which direction — but not what was said. This is the price of [NFR-P.4](../../rad/proposed-system/non-functional/performance), and it is a genuine trade-off, not an oversight.

**Saved items and privacy preferences are not encrypted**, because they live in the preference store, which offers no field-level encryption. Saved items are references to public catalogue entries and fall squarely under [NFR-I.5](../../rad/proposed-system/non-functional/implementation). Privacy preferences are four booleans about the Traveler, which is weaker ground: they are personal, if barely informative. The current design accepts this on the grounds that the preferences reveal nothing beyond four settings, but it is the point at which the protection policy is least uniform, and moving them into the encrypted database is the natural correction should the policy be tightened.

## Evolution of the schema

The schema will change again, and the design provides for it in two ways.

**Within the database**, the version number is raised and the creation statements — written as `CREATE TABLE IF NOT EXISTS` — are executed on both a fresh install and an upgrade. Initialisation is therefore idempotent: a table already present is left untouched, a table newly introduced is created, and existing rows are not disturbed. This satisfies [NFR-R.4](../../rad/proposed-system/non-functional/reliability) for **additive** change — the introduction of a table or of a new kind of record. A change that *reshaped* an existing table would require a transformation step the mechanism does not provide, and would be specified deliberately rather than applied automatically.

**Between mechanisms**, the data source of [3.2](./subsystem-decomposition) supports **store fallback**, which is how [NFR-R.4](../../rad/proposed-system/non-functional/reliability) is satisfied when the mechanism holding a kind of data changes. On its first read the data source consults the primary store; finding it empty, it consults the secondary store; finding data there, it writes it into the primary store and returns it. Every subsequent read finds the primary store populated and does not consult the secondary one again. The transfer therefore occurs **exactly once**, is driven by a read rather than by a version check, and is invisible above the Persistence subsystem.

The trip catalogue uses the same shape of decision for seeding: rows are inserted only if the table is empty, so seeding is idempotent and a Traveler's database is never overwritten by the built-in catalogue on a later run.

## Concurrency

Access to the database is coordinated through a **single connection**, opened lazily and held by one owner. Concurrent operations are serialised by that owner rather than competing through independent handles, which is what [NFR-R.6](../../rad/proposed-system/non-functional/reliability) requires. No locking policy beyond this is needed: as [3.6](./global-control-flow) establishes, the application has one user, one process and one thread of execution, so the concurrent access that locking policies exist to arbitrate does not arise.

## Goals and requirements served

| Serves | How |
|--------|-----|
| [DG-D1](../introduction/design-goals) Confidentiality | Readable content encrypted before it reaches the engine; credentials stored one-way |
| [DG-D2](../introduction/design-goals) Survival of data | Idempotent creation, single-row upserts, once-only store fallback |
| [DG-M2](../introduction/design-goals) Isolation of storage | The mechanism for each kind of data is chosen inside Persistence and known nowhere above it |
| [DG-P1](../introduction/design-goals) Responsiveness | Index on `mate_id`; structural columns left queryable; images out of the database |
| [NFR-I.3](../../rad/proposed-system/non-functional/implementation), [NFR-I.4](../../rad/proposed-system/non-functional/implementation), [NFR-I.5](../../rad/proposed-system/non-functional/implementation) | The per-column policy above |
| [NFR-R.2](../../rad/proposed-system/non-functional/reliability), [NFR-R.4](../../rad/proposed-system/non-functional/reliability), [NFR-R.6](../../rad/proposed-system/non-functional/reliability) | Single-row schema, idempotent upgrade, single connection |
| [NFR-P.4](../../rad/proposed-system/non-functional/performance), [NFR-P.5](../../rad/proposed-system/non-functional/performance) | Index on conversation; photographs held as files |
