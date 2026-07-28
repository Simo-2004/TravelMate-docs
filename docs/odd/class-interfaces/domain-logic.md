# 3.3 Domain Logic

## Purpose

The Domain Logic package holds the rules of the domain and the objects they operate upon. It determines how results are ranked, whether a submitted value is acceptable, which reply corresponds to a message, and whether a companion would accept a proposal.

## Dependencies

The package depends on nothing. It is addressed by Application State and by Presentation, and addresses no other package.

## General constraints

| Constraint | Consequence for the interface |
|------------|-------------------------------|
| Every operation is pure | A result is computed from the arguments alone. No operation holds state, reads storage, or consults the interface. |
| Every operation is synchronous | A result is returned rather than awaited, permitting invocation while a screen is being composed. |
| Domain objects are immutable | Attributes are fixed at creation. An object is altered by producing a copy. |
| A returned collection is unmodifiable and preserves order | Order is significant for ranked results and for tag lists. |

Purity is what renders this package the most readily verifiable of the system: an operation is exercised by supplying arguments and comparing the result, without a device, a database or an interface.

## Domain objects

The objects representing the things of the application domain. Each is immutable, and each is composed of values rather than of references to other objects of the system.

| Class | Represents | Notable attributes |
|-------|------------|--------------------|
| `PersonalProfile` | The Traveler's own profile | Name, description, photograph reference, interest tags, trip tags |
| `MateProfile` | A companion | Identifier, name, description, photograph reference, keywords, interests, preferred trips |
| `TripTileData` | A trip | Identifier, label, destination, description, itinerary images, characterising tags |
| `TripTag` | A characterising label of a trip | Text, and the colours by which it is presented |
| `ChatMessage` | One message of a conversation | Identifier, text, originator, instant of sending, an optionally attached trip |
| `SavedTripPreview` | A saved item | The kind of item, its source identifier, and the values by which it is presented |
| `PrivacySettings` | The privacy preferences | One value per preference of the enumeration |

### Common operations

| Operation | Offered by | Requires | Returns | Behaviour |
|-----------|-----------|----------|---------|-----------|
| Produce an altered copy | `PersonalProfile`, `PrivacySettings` | The attributes to replace | A new object | An omitted attribute is retained |
| Convert to a stored form | Objects held in the preference store | — | The object as named values | — |
| Reconstruct from a stored form | Objects held in the preference store | The stored named values | The object | An absent or unusable value is replaced by the documented default |

Reconstruction never raises. An object whose stored form is incomplete or malformed is reconstructed with defaults in place of the unusable parts, by which the requirement of [NFR-R.1](../../rad/proposed-system/non-functional/reliability) is satisfied for the objects held in the preference store.

### Default values

`PersonalProfile` and `PrivacySettings` each offer a documented default, applied where nothing has been stored and where a stored value cannot be used. The default is a fixed value of the class rather than a value composed by the caller, so that every caller obtains the same one.

### Enumerated values

| Enumeration | Distinguishes |
|-------------|---------------|
| `PrivacySettingKey` | The privacy preferences, individually addressable |
| `SearchResearchMode` | The subject of a search: trips or companions |
| `SavedBookmarkType` | The kind of a saved item: a trip or a companion |

A value outside an enumeration cannot be requested, by which the set of preferences, subjects and item kinds is fixed at design time.

### `TripTagCodec`

**Purpose.** Converts characterising labels to and from their stored form. It is specified separately because the same conversion is required by more than one holder of stored data, and a second implementation would permit the two to diverge.

**Dependencies.** `TripTag`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Convert one label | A label | Its stored form | Colours are converted to an integral form |
| Reconstruct one label | A stored form | The label | An unusable colour is replaced by a documented default |
| Convert a collection | A collection of labels | Their stored forms | Order preserved |
| Reconstruct a collection | A stored form | The labels | An entry that is not a label is discarded |

## Ranking operations

### Trip ranking

**Requires.** A collection of trips, a query, and optionally a maximum number of results.
**Returns.** The trips matching the query, ordered by decreasing correspondence.

A blank query returns the collection unaltered, by which the catalogue is presented before the Traveler has typed. A query is divided into terms at its spaces, and **a trip is included only where every term corresponds to it** — successive terms narrow the result rather than widening it.

Correspondence is assessed against the label, the destination, the description and the characterising labels. The contribution of a field decreases in that order, and within each field a correspondence at the beginning of the value contributes more than one within it. Trips of equal correspondence are ordered by label.

Comparison disregards letter case and surrounding spaces.

### Companion ranking

**Requires.** A collection of companions, a query, and optionally a maximum number of results.
**Returns.** The companions matching the query, ordered by decreasing correspondence.

The rules are those of trip ranking, assessed against the name, the keywords and the description, whose contributions decrease in that order. Companions of equal correspondence are ordered by name.

The two operations are specified separately rather than as one parameterised operation, since the fields assessed and their relative contributions differ, and a single operation would require both sets of rules to be supplied at each invocation.

## Reply selection

**Requires.** The text of a received message.
**Returns.** The reply corresponding to it.

The text is compared against an ordered collection of rules, each associating a set of keywords with a reply. The first rule any of whose keywords occurs in the text determines the reply; where no rule corresponds, and where the text is blank, a documented fallback reply is returned.

A keyword corresponds only where it occurs as a **complete word**, so that a keyword contained within a longer word does not select a reply unrelated to the message.

The operation returns a reply in every case. It is the caller that determines when the reply is presented, in accordance with [FR-D.1.2](../../rad/proposed-system/functional).

## Proposal matching

**Requires.** A companion and a trip.
**Returns.** Whether the companion would accept a proposal of that trip.

The characterising labels of the trip are compared against the interests and preferred trips of the companion. Correspondence of at least one label yields acceptance. Comparison disregards letter case and surrounding spaces.

The operation determines only the outcome. The message and the reply conveying it are composed by the caller and supplied to Application State, in accordance with the constraint that a class owning state decides no domain question.

## `AccountValidation`

**Purpose.** Determines whether the values submitted at account creation are acceptable.

**Dependencies.** None.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Validate a username | A username | The fault, or null | Assesses presence, the permitted length, and the permitted characters |
| Validate a password | A password | The fault, or null | Assesses presence and the permitted length |
| Validate a required name | A value, and the name of the field | The fault, or null | Assesses presence and the permitted length; the field name is incorporated into the fault |
| Validate a description | A description | The fault, or null | Assesses the permitted length |

Every operation returns **null where the value is acceptable** and a statement of the fault otherwise. This is the one place in the system where a null result denotes success; it is admitted because the alternative — a value denoting acceptance alongside a fault — would require every caller to distinguish two forms of the same result.

A fault is expressed as text presentable to the Traveler, so that a screen reports the fault without interpreting it. The permitted lengths and characters are fixed values of the class, so that a screen constraining input and the operation validating it cannot diverge.

Validation raises no exception. An unacceptable value is a foreseen outcome of account creation and is reported as a result.

## `TagInput`

**Purpose.** Normalises the free text of a tag and determines whether it duplicates one already recorded.

**Dependencies.** None.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Normalise a label | Free text | The normalised label | Removes surrounding spaces and reduces internal runs of spaces to one |
| Normalise a collection | A collection of labels | The normalised collection | Normalises each, discards blanks and duplicates disregarding case, preserves order and the first form encountered |
| Add a label | The current collection, and free text | The extended collection, or null | Null where the text is blank or duplicates an entry disregarding case |
| Remove a label | The current collection, and a label | The reduced collection | Comparison disregards case |

The addition operation returns null to denote that **no alteration is required**, distinguishing that case from an addition yielding a collection identical to the current one. A screen receiving null leaves its state unaltered and reports nothing, a duplicate being an ordinary outcome of typing rather than a fault.

The class is applied by the profile editor and by the account-creation screen alike, so that a tag is normalised identically wherever it is entered.

## Exceptions

No class or operation of this package raises an exception.

Every foreseen outcome is expressed as a result: an unacceptable value as a statement of the fault, a superfluous addition as null, an unusable stored value as a documented default. The package receives no argument it cannot assess and performs no operation that can fail.
