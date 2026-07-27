# 4. Subsystems & Services

A service is a set of related operations that share a common purpose and together form a subsystem's interface — the contract between it and its callers. Each entry below states an operation's purpose: what it does, what it requires, and what it returns, at the level meaningful to a caller. Signatures, parameter types, visibility, and pre- and postconditions are the concern of the [ODD](../odd/class-interfaces/) and are not repeated here.

The subsystems are those of [3.2](./proposed-architecture/subsystem-decomposition). Services are listed in dependency order, from the layer that calls to the layer that is called.

## Presentation

Offers no service to other subsystems. It is the top of the layering: the framework invokes it, and it calls only downward.

Its internal structure is a set of screens, one per destination of [RAD 3.4.5](../rad/proposed-system/system-models/ui-navigational-paths), built from shared widgets and a common set of visual conventions. Navigation is offered *within* the subsystem, by a controller that publishes the selected destination so that the shell and the screens agree on it without addressing one another.

## Application State

Called by Presentation. Each service owns one kind of state, publishes changes to it, and is the only writer of it.

| Service | Operations offered |
|---------|--------------------|
| **Account** | Initialise the account, seeding a default if none exists; verify a pair of credentials; replace the account with newly created credentials |
| **Personal profile** | Read the current profile; replace it in whole or in part |
| **Privacy preferences** | Read the current preferences; change one |
| **Saved items** | Read the collection; add or remove an item; test whether an item is present |
| **Conversations** | Obtain the exchange with a companion; obtain that companion's presence; record activity; send a message; send a trip as a proposal; discard an exchange |
| **Trip catalogue** | Obtain the recommended and recently consulted collections |
| **Search mode** | Read whether trips or companions are being searched; change it |

Every service in this subsystem shares one contractual property: **an operation that changes state returns as soon as the change is visible, not when it has been stored.** Callers must not assume a completed write, and [3.6](./proposed-architecture/global-control-flow) explains why.

Six of the seven services persist their state and offer an **initialisation** operation, called once by the start-up sequence of [3.7](./proposed-architecture/boundary-conditions) and safe to call more than once. Search mode is the exception: its value is not persisted, so it is not part of that sequence and always starts at its default.

## Domain Logic

Called by Application State. Every operation is a pure function: it computes its result from its arguments alone, holds no state, and touches no storage.

| Service | Operations offered |
|---------|--------------------|
| **Trip search** | Rank trips against a query |
| **Companion search** | Rank companions against a query |
| **Auto-reply** | Determine the reply corresponding to the content of a message |
| **Trip proposal** | Determine whether a companion's preferences correspond to a trip's characterising labels |
| **Account validation** | Determine whether the fields of a registration submission are acceptable, and what is wrong with each that is not |
| **Label input** | Normalise a label and determine whether it duplicates one already recorded |

This is the subsystem in which the rules of the domain live. It offers the widest service and has the narrowest dependencies — it calls nothing.

## Persistence

Called by Application State. Offers two kinds of service, at two levels.

**Data sources** decide *where* a kind of data lives, and perform store fallback when that decision changes. This is the interface Application State depends on.

| Service | Operations offered |
|---------|--------------------|
| **Profile data source** | Read the stored profile, falling back to the secondary store and then to the default; write the profile |
| **Conversation data source** | Read every exchange; append a message; discard an exchange |
| **Saved items store** | Read the collection; write it |
| **Privacy preferences store** | Read the preferences; write them |

**Repositories** translate between domain objects and stored rows, and apply encryption. They are called by data sources and by nothing above them.

| Service | Operations offered |
|---------|--------------------|
| **Profile repository** | Read the profile row and decrypt it; encrypt a profile and write it |
| **Account repository** | Seed an account if none exists; replace the account; verify credentials against the stored values |
| **Conversation repository** | Count messages; read every message grouped by companion; append one; append many; delete an exchange |
| **Trip repository** | Seed the catalogue if empty; read both collections |

The division is the point of the subsystem: a data source knows *which mechanism*, a repository knows *what shape and what protection*, and neither knows how the command reaches the store.

## Data Access

Called by Persistence. Declared as **interfaces**, so that Persistence depends on the contract and not on the storage engine — the mechanism of [3.2](./proposed-architecture/subsystem-decomposition).

| Service | Operations offered |
|---------|--------------------|
| **Profile access** | Read the single profile row; insert or replace it |
| **Account access** | Count accounts; read the single account row; insert or replace it |
| **Conversation access** | Count messages; read all messages; insert one; insert many; delete those of one companion |
| **Trip access** | Count trips; insert many; read one collection in stored order |
| **Connection** | Yield the shared database connection, opening and initialising it on first request |

Every operation is expressed in terms of rows — untyped maps of column to value — and none in terms of domain objects. This is what keeps the boundary honest: a DAO that returned a profile would have to know what a profile is, and the subsystem would no longer be replaceable.

## Security

Called by Persistence. Two services, plus one interface it declares for the layer beneath it.

| Service | Operations offered |
|---------|--------------------|
| **Cipher** | Encrypt a value, producing a payload that carries its own nonce; decrypt a payload, failing if it was altered or was produced under another key |
| **Credential hashing** | Derive a storable value from a credential, returning it with its salt and iteration count; verify a supplied credential against a stored value, salt and iteration count |
| **Key provider** | Yield the encryption key, generating and storing it on first use |

**`SecureKeyStore`** is the interface this subsystem declares and depends on: read a value by name, write a value by name. It is what allows the key lifecycle to be verified without a device.

## Media Storage

Called by Presentation, for the reason recorded in [3.2](./proposed-architecture/subsystem-decomposition).

| Service | Operations offered |
|---------|--------------------|
| **Image storage** | Copy a chosen file into the application's private storage under a unique name, and return the path by which it is thereafter found |
| **Image selection** | Obtain a file from the device's gallery |

The separation is deliberate: selection requires a device and cannot be tested without one; storage is ordinary file handling and can. Only selection is an adapter.

## Traceability

Every use case of the delivered system is realised by subsystems, and every subsystem realises at least one use case — the check of design correctness, verifiable in both directions.

| Use case | Presentation | Application State | Domain Logic | Persistence | Data Access | Security | Media |
|----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| UC1 Create Account | ● | ● | ● | ● | ● | ● | ● |
| UC2 Log In | ● | ● | | ● | ● | ● | |
| UC3 Search | ● | ● | ● | ● | ● | | |
| UC4 Save an item | ● | ● | | ● | | | |
| UC5 Converse | ● | ● | ● | ● | ● | ● | |
| UC6 Share a trip | ● | ● | ● | ● | ● | ● | |
| UC7 Manage profile and settings | ● | ● | ● | ● | ● | ● | ● |

Two readings follow from this table. **Presentation and Application State appear in every row**: every use case is initiated through the interface and changes or reads application state. **Data Access and Security are absent from UC4**, because saved items are held in the preference store and are not encrypted, by the decisions of [3.4](./proposed-architecture/persistent-data).
