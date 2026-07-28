# 3.2 Application State

## Purpose

The Application State package holds the state of the running application and publishes its changes. Each class owns one kind of state, constitutes its sole writer, and is reached by name.

## Dependencies

| Depends on | For |
|------------|-----|
| Persistence | Reading state at start-up and writing it when it changes |
| Domain Logic | Determining the reply to a message |

No class of this package holds knowledge of the interface. A change is published; which screens observe it is not known here.

## General constraints

The following constraints bind every class of the package and are not restated in individual entries.

| Constraint | Consequence for the interface |
|------------|-------------------------------|
| One instance exists | The constructor is private and a single instance is offered by name, so that no caller may create a second holder of the same state. |
| An operation altering state returns before the write completes | The value is altered and published first; the write is requested and not awaited. A caller must not assume storage has occurred. This realises the contract of [SDD 4](../../sdd/subsystem-services). |
| A published collection is unmodifiable | A caller cannot alter the state by altering a collection obtained from it. |
| The backing dependency is substitutable | Each class accepts its Persistence dependency in place of the standard one, permitting the class to be exercised without a database or key store. |

### Initialisation

A class holding persisted state offers an **initialisation** operation, which reads the stored value and publishes it. The operation is idempotent: an invocation subsequent to the first performs nothing and returns.

The operation is invoked once for each such class by the start-up sequence of [SDD 3.7](../../sdd/proposed-architecture/boundary-conditions). `SearchResearchModeStore` holds no persisted state, offers no initialisation operation, and is not part of that sequence.

## Publication forms

The package publishes state in three forms, determined by the state itself rather than by preference.

| Form | Applied to | Rationale |
|------|------------|-----------|
| A single published value | Personal profile, privacy preferences, saved items, search mode | The state is one value, observed as a whole |
| One published value per key | Conversations | A screen presents one conversation and must not be rebuilt when another changes |
| No publication | Trip catalogue, account | The catalogue is read-only and complete after initialisation; the account is acted upon rather than presented |

## `AuthService`

**Purpose.** Owns the account and answers credential checks.

**Dependencies.** `AccountRepository`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Initialise | — | — | Creates the account with default credentials where none exists. Idempotent. |
| Verify credentials | A username and a password | Whether the pair is accepted | Does not distinguish which of the two was incorrect |
| Replace the account | A username and a password | — | Substitutes the stored account with the credentials supplied |

The account is not published. It is acted upon by the entry and account-creation screens and presented by neither.

## `PersonalProfileStore`

**Purpose.** Owns the personal profile and publishes changes to it.

**Dependencies.** `ProfileDataSource`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Initialise | — | — | Publishes the stored profile, or the documented default where none is stored. Idempotent. |
| Replace the profile | A profile | — | Publishes it and requests the write |
| Replace the description | A description | — | Publishes a copy of the profile bearing it |
| Replace the photograph reference | A reference | — | As above |
| Replace the name | A given name, a family name, or both | — | As above; an omitted part is retained |

The final three operations are stated separately from the first because a screen altering one part must not be required to reconstruct the whole profile. Each produces a copy of the current profile, in accordance with the immutability of domain objects.

## `PrivacySettingsStore`

**Purpose.** Owns the privacy preferences and publishes changes to them.

**Dependencies.** `PrivacySettingsData`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Initialise | — | — | Publishes the stored preferences, or the documented defaults. Idempotent. |
| Replace the preferences | A set of preferences | — | Publishes it and requests the write |
| Alter one preference | The preference identified, and its value | — | Publishes a copy bearing the altered value |

A preference is identified by an enumerated value rather than by name, so that a preference absent from the enumeration cannot be requested.

## `SavedTripPreviewStore`

**Purpose.** Owns the saved items and publishes changes to them.

**Dependencies.** `SavedBookmarksData`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Initialise | — | — | Publishes the stored items, or an empty collection. Idempotent. |
| Determine whether an item is saved | An item | Whether it is present | — |
| Add an item | An item | — | Places it first, removing any earlier occurrence of the same item |
| Remove an item | An item | — | Removes it where present; performs nothing otherwise |
| Reverse the saved condition of an item | An item | The resulting condition | Removes the item where saved, adds it otherwise |

An item is identified by its source identifier and its kind, so that a trip and a companion bearing the same title remain distinct.

Additions place the item first, by which the collection presents itself in order of saving without a stored ordinal.

## `ChatStore`

**Purpose.** Owns the conversations and the presence of each companion, and publishes changes to each separately.

**Dependencies.** `ChatDataSource`, and the reply-selection operation of Domain Logic.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Initialise | — | — | Publishes every stored conversation, grouped by companion. Idempotent. |
| Obtain a conversation | A companion | The published conversation | Yields an empty conversation where none exists |
| Obtain a companion's presence | A companion | The published presence | Absent until activity is recorded |
| Record activity | A companion | — | Marks the companion present and restarts the interval after which absence is resumed |
| Send a message | A companion, and the text | — | Appends the message, then schedules the reply determined by Domain Logic |
| Send a trip as a proposal | A companion, a trip, the message and the reply | — | Appends the message bearing the trip, then schedules the reply supplied |
| Discard a conversation | A companion | — | Empties the published conversation and requests its deletion |

Blank text is rejected without a message being appended.

The reply is scheduled rather than appended immediately, and presence is resumed after an interval of inactivity; both realise [FR-D.1.2 and FR-D.1.5](../../rad/proposed-system/functional). Each companion is subject to at most one pending presence interval, a subsequent record of activity cancelling the interval outstanding.

The proposal operation receives the reply from its caller rather than determining it. Whether a companion accepts a proposal is a domain question, decided by Domain Logic and supplied to this operation as a result.

## `TripStore`

**Purpose.** Owns the trip catalogue.

**Dependencies.** `TripRepository`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Initialise | — | — | Seeds the catalogue where empty, then reads both collections. Idempotent. |
| Obtain the recommended collection | — | The collection | — |
| Obtain the recently consulted collection | — | The collection | — |
| Obtain a trip by identifier | An identifier | The trip, or null | Null for a blank or unrecognised identifier; disregards letter case |

The catalogue publishes nothing and is read-only: it is complete once initialisation has returned and does not change thereafter.

Retrieval by identifier returns without waiting, permitting a trip attached to a message to be presented while the conversation is being composed.

## `SearchResearchModeStore`

**Purpose.** Owns the subject of a search — trips or companions — and publishes changes to it.

**Dependencies.** None.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Reverse the subject | — | — | Publishes the alternative subject |

The subject is not persisted. It applies to a search in progress rather than to the Traveler's account, and a subsequent run begins at trips.

## Exceptions

No class of this package raises an exception.

An exception raised by Persistence beneath an operation of this package propagates to the caller unaltered. No class here catches such an exception or substitutes a value for it, since a class owning state cannot determine whether an unreadable stored value should be replaced by a default or reported. [SDD 3.7](../../sdd/proposed-architecture/boundary-conditions) specifies where that determination is made and records the case in which it is absent.
