# 3.5 Data Access

## Purpose

The Data Access package issues storage commands against the database and owns the connection to it. It is the lowest level at which the system addresses the database, and the only one holding knowledge of the storage engine.

## Dependencies

The package depends on the database library and on the facility yielding the application's private directory. It depends on no other package of the system.

## General constraints

| Constraint | Consequence for the interface |
|------------|-------------------------------|
| Every operation is expressed in records | A record is a set of named values corresponding to columns. Domain objects do not appear in any operation. |
| An interface is declared for each table | Persistence depends on the interface, never on the implementation. |
| An implementation holds no logic beyond the command | Conversion, encryption and grouping belong to Persistence. An implementation composes a command, issues it, and returns what it yields. |
| Every implementation obtains the connection from one owner | The connection is supplied rather than opened, so that no implementation holds a second handle to the same file. |

The first constraint is what renders the package replaceable. An implementation returning a domain object would hold knowledge of what that object is, and the boundary between this package and Persistence would no longer exist.

## Interfaces

Each interface is fitted to one table. No interface generalises across tables, for the reason recorded in [1.1](../introduction/trade-offs).

### `ProfileDao`

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Read the profile record | — | The record, or null | Null where the table holds nothing |
| Insert or replace the profile record | A record | — | Replaces any record held |

### `AccountDao`

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Count the accounts held | — | The count | Determines whether seeding is required |
| Read the account record | — | The record, or null | Null where the table holds nothing |
| Insert or replace the account record | A record | — | Replaces any record held |

### `ChatDao`

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Count the messages held | — | The count | Answered without reading the messages |
| Read every message record | — | The records | Ordered by insertion |
| Insert one message record | A record | — | — |
| Insert many message records | The records | — | Issued as one operation |
| Delete the messages of one companion | A companion | — | Removes every record bearing that companion |

Reading yields every message of every conversation rather than those of one companion. Grouping is performed by Persistence, as specified in [3.4](./persistence).

### `TripDao`

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Count the trips held | — | The count | Determines whether seeding is required |
| Insert many trip records | The records | — | Issued as one operation |
| Read the records of one collection | A collection | The records | Ordered by the position stored with each record |

Both collections are held in one table, each record bearing the collection to which it belongs and its position within that collection. Order is therefore stored rather than derived, and is preserved across readings.

## Single-record tables

The profile and the account are each held as **one record pinned to a fixed identifier**. An insertion supplies that identifier and replaces any record already bearing it, by which the table is constrained to hold at most one record without a further rule being enforced elsewhere.

This is why neither interface offers a delete operation, and why neither read operation accepts a criterion: there is one record to read, or none.

## `DatabaseHelper`

**Purpose.** Owns the connection to the database and establishes its structure. It constitutes the single point at which the database file is opened.

**Dependencies.** The database library, and the facility yielding the application's private directory.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Obtain the connection | — | The connection | Opens the database and establishes its structure where the connection is not yet open; yields the open connection otherwise |

**Constraints.**

The class offers one instance, reached by name, and declares its constructor private. A second instance would open a second handle to one file.

The connection is opened on **first request** rather than at start-up, no data being addressed until an operation requires it. The consequence of this deferral under concurrent initialisation is recorded in [SDD 3.4](../../sdd/proposed-architecture/persistent-data).

Establishment of the structure is **idempotent**: each table and each index is created where absent and left unaltered where present. The same establishment is performed whether the database is created or found at an earlier structure, so that a structure extended by a subsequent release requires no separate provision.

**Declared structure.**

| Table | Holds | Encrypted columns |
|-------|-------|-------------------|
| Profile | The personal profile, as one record | Every column but the identifier |
| Account | The account, as one record | The username; the password is held as a derived value |
| Trips | Both catalogue collections | None |
| Messages | Every message of every conversation | The text alone |

An index is declared on the companion of a message record, serving the deletion of a conversation. The columns left readable are those required for retrieval and ordering, as specified in [SDD 3.4](../../sdd/proposed-architecture/persistent-data).

## Interface Realizations

One concrete class is designated to realize each interface. Each accepts the connection owner in place of the standard one, permitting it to be exercised against a substitute.

| Concrete Class | Realises |
|----------------|----------|
| `ProfileSqfliteDao` | `ProfileDao` |
| `AccountSqfliteDao` | `AccountDao` |
| `ChatSqfliteDao` | `ChatDao` |
| `TripSqfliteDao` | `TripDao` |

Each obtains the connection, composes the command, issues it, and returns what it yields. None interprets a value, and none holds state between operations.

A count is obtained by a command yielding the count rather than by reading the records and counting them, so that the condition governing seeding is settled without the cost of reading a table in full.

## Exceptions

No class of this package raises an exception of its own.

An exception raised by the database library — a file that cannot be opened, a command that cannot be issued — propagates to the caller unaltered. No implementation catches such an exception, there being no substitute value a class at this level could supply: it holds no knowledge of what the record signifies and therefore none of what an acceptable default would be.
