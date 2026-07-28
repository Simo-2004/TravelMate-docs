# 3.4 Persistence

## Purpose

The Persistence package determines where each kind of data is held, translates between domain objects and stored records, and applies encryption. It is the only package holding knowledge that data is encrypted.

## Dependencies

| Depends on | For |
|------------|-----|
| Data Access | Issuing storage commands against the database |
| Security | Encrypting and decrypting values, and deriving credential values |
| Domain Logic | The domain objects it accepts and returns |
| The preference store | Holding the kinds of data specified in [SDD 3.4](../../sdd/proposed-architecture/persistent-data) |

The dependency on the preference store bypasses Data Access, as specified in [SDD 3.2](../../sdd/proposed-architecture/subsystem-decomposition): for data held outside the database, Data Access has no part.

## Structure

The package is specified at two levels, distinguished by what each accepts and returns.

| Level | Accepts and returns | Addressed by |
|-------|--------------------|--------------|
| **Data sources** | Domain objects | Application State |
| **Repositories** | Domain objects, converted to records | Data sources |

A data source determines the mechanism holding a kind of data. A repository determines the form that data takes and the protection applied to it. Neither holds knowledge of how a command reaches the store, which belongs to Data Access.

## General constraints

| Constraint | Consequence for the interface |
|------------|-------------------------------|
| A repository accepts and returns domain objects | Column names and record structure do not appear in its operations. |
| A repository receives the means of obtaining the cipher | The cipher is supplied rather than resolved, so no repository addresses the key store and each may be exercised with a substitute cipher. |
| A repository receives its data access dependency | Supplied as the declared interface, so each repository may be exercised without a database. |
| Encryption is applied on the path to storage | A value is encrypted as a record is composed and decrypted as one is read. No caller of this package encrypts anything. |

The columns encrypted and those left readable are specified in [SDD 3.4](../../sdd/proposed-architecture/persistent-data) and are not restated here.

## Data sources

### `ProfileDataSource`

**Purpose.** The interface through which the personal profile is read and written. Application State depends on this interface and on no implementation of it.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Read the profile | — | The profile | Yields the documented default where nothing is held |
| Write the profile | A profile | — | Replaces what is held |

Reading never yields null. The absence of a stored profile is a foreseen condition answered by the default, not by an absent result.

### `SqliteProfileData`

**Purpose.** Holds the personal profile in the database, and performs store fallback on the first read.

**Dependencies.** `ProfileRepository`, and a secondary data source consulted during fallback.

Implements `ProfileDataSource`. Reading consults the database first; where it holds nothing, the secondary store is consulted; a profile found there is **written to the database and returned**, so that the fallback occurs once and subsequent reads are answered by the database alone. Where neither holds a profile, the documented default is returned.

A factory constructor assembles the class with its standard dependencies, so that a caller obtains a usable instance without composing the repository, the cipher and the key provider itself.

### `PersonalProfileData`

**Purpose.** Holds the personal profile in the preference store.

**Dependencies.** The preference store, and `PersonalProfile` for conversion.

Implements `ProfileDataSource`, and is therefore a complete alternative to the database implementation. It additionally offers one operation beyond the interface:

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Read the stored profile | — | The profile, or null | Null where nothing is held or what is held cannot be used |

This operation exists because the fallback of `SqliteProfileData` must distinguish **nothing held** from **a held profile equal to the default**. The interface operation cannot express that distinction, since it answers both with the default.

A held value that cannot be interpreted is treated as nothing held, satisfying [NFR-R.1](../../rad/proposed-system/non-functional/reliability).

### `ChatDataSource`

**Purpose.** The interface through which conversations are read and altered.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Read every conversation | — | The conversations, grouped by companion | Yields an empty result where none is held |
| Append a message | A companion, and the message | — | — |
| Discard a conversation | A companion | — | Removes every message of that companion |

### `SqliteChatData`

**Purpose.** Holds the conversations in the database, and performs store fallback on the first read.

**Dependencies.** `ChatRepository`, and a secondary data source consulted during fallback.

Implements `ChatDataSource`. The fallback is attempted once for the life of the instance, before the first read is answered: where the database holds no message, the conversations held by the secondary store are written to it in a single operation. Subsequent reads omit the attempt.

The condition is assessed by counting the messages held rather than by reading them, so that the ordinary case — a database already holding conversations — is settled without reconstructing and decrypting every message.

### Preference-store data sources

Two kinds of data are held in the preference store alone. Their data sources declare no interface, there being one mechanism and no choice to express.

| Class | Holds | Operations |
|-------|-------|-----------|
| `SavedBookmarksData` | The saved items | Read the collection; write the collection |
| `PrivacySettingsData` | The privacy preferences | Read the preferences; write the preferences |
| `ChatHistoryData` | Conversations, as the secondary store of the fallback | Read every conversation; write every conversation |

Each writes its collection in full rather than by element, the preference store admitting no partial alteration.

Each returns the documented default where nothing is held **and where what is held cannot be interpreted**. A malformed value is discarded and the default returned, in satisfaction of [NFR-R.1](../../rad/proposed-system/non-functional/reliability).

## Repositories

### `ProfileRepository`

**Purpose.** Converts the personal profile to and from a stored record, encrypting its values.

**Dependencies.** `ProfileDao`, and the means of obtaining the cipher.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Read the profile | — | The profile, or null | Null where no record is held. Decrypts each value of the record. |
| Write the profile | A profile | — | Encrypts each value and replaces the record |

Tag collections are converted to a single value before encryption, a record holding one value per column.

### `AccountRepository`

**Purpose.** Holds the account and verifies credentials.

**Dependencies.** `AccountDao`, the means of obtaining the cipher, and `PasswordHasher`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Seed the account | A username and a password | — | Writes the account where none is held; performs nothing otherwise |
| Replace the account | A username and a password | — | Replaces any account held |
| Verify credentials | A username and a password | Whether the pair is accepted | Compares the username disregarding case, then the derived password value |

The username is encrypted and the password is stored only as a derived value, as specified in [SDD 3.5](../../sdd/proposed-architecture/access-control). The salt and the iteration count are stored beside the derived value, so that verification applies the parameters under which the account was written rather than those in effect at the time of verification.

Verification returns whether the pair is accepted, and reports no cause. The residual disclosure arising from the order of the two comparisons is recorded in [SDD 3.5](../../sdd/proposed-architecture/access-control).

### `ChatRepository`

**Purpose.** Converts messages to and from stored records, encrypting their text, and groups them by companion.

**Dependencies.** `ChatDao`, and the means of obtaining the cipher.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Count the messages held | — | The count | Answered without reconstructing or decrypting any message |
| Read every conversation | — | The messages, grouped by companion | Grouping is performed here; each conversation preserves the order of sending |
| Append a message | A companion, and the message | — | — |
| Append many conversations | The conversations | — | Written as one operation; performs nothing where none is supplied |
| Discard a conversation | A companion | — | — |

Only the text of a message is encrypted. The companion, the originator, the instant of sending and any attached trip remain readable, being required for grouping and ordering.

Grouping is performed in this class rather than requested of Data Access, the stored records being read in full and arranged once.

### `TripRepository`

**Purpose.** Holds the trip catalogue and converts its entries to and from stored records.

**Dependencies.** `TripDao`, and the built-in catalogue from which seeding is performed.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Seed the catalogue | — | — | Writes the built-in catalogue where none is held; performs nothing otherwise |
| Read both collections | — | The recommended and recently consulted collections | Each preserves its stored order |

Trip records are not encrypted, the catalogue being content the system supplies rather than content the Traveler enters. This repository therefore requires no cipher, and is the one repository whose dependencies do not include Security.

The collection to which an entry belongs and its position within that collection are stored with it, both collections being held in one place.

## Built-in catalogues

The content the system supplies is declared as fixed values rather than obtained from storage. It is written to storage on a first run and read from storage thereafter.

| Class | Supplies |
|-------|----------|
| `TripCatalog` | The trips of the recommended and recently consulted collections |
| `MateCatalog` | The companions |
| `ChatAutoReplyCatalog` | The rules associating keywords with replies, in the order assessed |
| `TripTagCatalog` | The characterising labels a trip may bear |
| `TripMediaCatalog` | The references to trip and itinerary images |
| `MateTagPalette` | The colours applied to the labels of a companion |

`MateCatalog` is read directly by Presentation rather than through a data source, companions being fixed content that is neither stored nor altered.

## Exceptions

| Condition | Response |
|-----------|----------|
| A value held in the preference store cannot be interpreted | Discarded; the documented default is returned |
| A stored record is absent | Null is returned by a repository; the default by a data source |
| A stored encrypted value cannot be decrypted | The exception raised by Security propagates to the caller |

The third condition is not answered by this package. A decryption that fails is caught nowhere, and the limitation this entails is recorded in [SDD 3.7](../../sdd/proposed-architecture/boundary-conditions), together with the correction it prescribes: the treatment specified for the first condition, applied to the third.
