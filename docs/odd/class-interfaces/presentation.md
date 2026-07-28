# 3.1 Presentation

## Purpose

The Presentation package presents the system to the Traveler and collects input. It comprises the screens, the elements from which they are composed, the classes governing movement between screens, and the classes holding the visual conventions applied throughout the interface.

## Dependencies

| Depends on | For |
|------------|-----|
| Application State | The state displayed, obtained by subscription |
| Domain Logic | Ranking of results and validation of submitted values |
| Media Storage | Selection and storage of a photograph, as permitted by [SDD 3.2](../../sdd/proposed-architecture/subsystem-decomposition) |

No class of this package opens a database, encrypts a value, or holds knowledge of where data is stored.

## General constraints

The following constraints bind every screen of the package and are not restated in individual entries.

| Constraint | Consequence for the interface |
|------------|-------------------------------|
| A screen holds no application state | State is obtained by subscription to the class owning it. A screen holds only what pertains to a task in progress: a partly completed form, a pending selection, whether a submission is under way. |
| A screen decides no domain question | Ranking, validation, reply selection and proposal matching are delegated to Domain Logic. A screen determines when a question is asked, not what its answer is. |
| A screen is rebuilt on notification | A subscribed value that changes causes the screen to be rebuilt from the new value. No screen tests whether a value has changed. |
| A screen declares no fixed value | Text, colours, sizes and text styles are obtained from the classes specified under [Visual conventions](#visual-conventions). |
| A screen terminates failure | An exception raised beneath a screen is caught there and reported as a brief message. The task remains usable and values already entered are retained. |

### Substitutable operations

A screen performing an operation with an effect beyond itself — verification of credentials, creation of an account, acquisition of a photograph — accepts that operation as an optional parameter and applies the standard one when none is supplied.

The parameter permits the screen to be exercised independently of the facility underlying the operation: a substitute is supplied, and the screen executes without a database, a key store or a device. This applies the resolution recorded in [1.1](../introduction/trade-offs) at the level of the individual screen.

## Navigation classes

Movement between screens is determined by the classes below rather than by the screens themselves, so that no screen holds knowledge of which others exist.

### `NavigationController`

**Purpose.** Holds the selected destination and publishes changes to it. It constitutes the single point at which the current destination is determined.

**Dependencies.** None beyond its own package.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Read the selected destination | — | The destination in effect | — |
| Change the selected destination | The destination to select | — | Publishes the change to subscribers. Selection of the destination already in effect publishes nothing. |
| Request input focus for the destination | — | — | Records a pending request and publishes it |
| Consume a pending focus request | — | Whether a request was pending | Returns affirmatively once per request recorded, and negatively thereafter |

A focus request constitutes an event rather than a state. Multiple screens subscribe to the controller and are rebuilt when it publishes; absent the consuming operation, each rebuild would act upon a request already served.

### `NavigationScope`

**Purpose.** Renders the controller reachable by the screens beneath it without transmission through each intermediate class, and causes those screens to be rebuilt when the controller publishes.

**Dependencies.** `NavigationController`, `NavigationItem`.


| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Obtain the enclosing scope | A position in the interface | The scope, or null | Null where no enclosing scope exists |
| Obtain the controller | A position in the interface | The controller, or null | As above |
| Obtain the destination bearing a given label | A position, and a label | The destination, or null | Null where no destination bears that label |

Each operation admits a null result, since a screen may be presented outside a scope when reached from another screen rather than from the shell. A screen invoking these operations specifies its behaviour for the null result.

### `NavigationShell`

**Purpose.** Holds the principal destinations, presents the selected one, and presents the bar by which selection is made.

**Dependencies.** `NavigationController`, `NavigationConfig`, `NavigationScope`, `AppTransitions`, and the classes holding the visual conventions.

**Operations.** The shell offers no operation to other classes. It accepts a configuration and, optionally, a controller. A controller it creates is disposed of when the shell is discarded; a controller supplied to it is not, ownership remaining with the supplier.

**Behaviour.** The bar is withheld while the on-screen keyboard is presented.

### Navigation configuration classes

These classes describe the destinations and the appearance of the bar, separately from the shell presenting them. All are immutable and none holds application state.

| Class | Holds |
|-------|-------|
| `NavigationItem` | One destination: its label, the title presented above it, its icon, and the screen it presents |
| `NavigationStyle` | The appearance of the bar, and the values distinguishing a selected destination from an unselected one |
| `NavigationConfig` | The destinations, the style, and the destination selected initially |
| `NavigationDefaults` | The configuration applied where none is supplied |

The separation permits the shell to be presented with an alternative set of destinations without modification to the shell.

## Screen classes

Each screen presents one part of the system. Screens are classified as those reached before entry, the principal destinations held by the shell, and those reached from another screen.

| Screen | Presents | Subscribes to |
|--------|----------|---------------|
| `LoginScreen` | Entry by username and password | — |
| `CreateAccountScreen` | Creation of an account with a profile | — |
| `HomeScreen` | Recommended and recently consulted trips | Trip catalogue |
| `SearchScreen` | Entry of a query, and immediate results | Search mode, trip catalogue |
| `SavedItemsScreen` | The saved items | Saved items |
| `SettingsScreen` | The settings, and departure from the account | — |
| `SearchResultsScreen` | The complete results of a query | Search mode, trip catalogue |
| `MateDetailsScreen` | One companion, and the means to converse or propose a trip | Saved items |
| `ChatScreen` | One conversation, and the companion's presence | Conversations |
| `TravelScheduleScreen` | The itinerary of one trip | Saved items |
| `PersonalProfileScreen` | The personal profile, and its editing | Personal profile |
| `PrivacySettingsScreen` | The privacy preferences | Privacy preferences |
| `SupportScreen` | The support material | — |

A screen subscribing to nothing may nonetheless act upon state. `LoginScreen` verifies credentials and `SettingsScreen` terminates the session; neither subscribes, since neither presents a value subject to change while it is presented.

`PersonalProfileScreen` and `CreateAccountScreen` hold the values under edit until submission, in accordance with the first general constraint. An abandoned edit therefore leaves no trace, no class beyond the screen having been notified of it.

`SettingsScreen` returns the interface to entry and discards the preceding history, so that the authenticated part of the system cannot be re-entered by reversal. Stored data is unaffected, as specified in [SDD 3.7](../../sdd/proposed-architecture/boundary-conditions).

## Shared interface elements

Elements appearing on more than one screen are specified once and applied by each, so that a change of appearance is effected in one place and no two screens diverge where they are required to agree.

| Group | Provides |
|-------|----------|
| Input | The text field, the search field, and the button submitting a form |
| Trip and companion | The card presenting a trip or a companion, the panel presenting one in full, and the sections listing several |
| Conversation | The message bubble, the composition bar, the presence indicator, and the means of attaching a trip |
| Profile and tags | The profile picture, the profile card, and the tag groups in fixed and editable form |
| Feedback | `AppSnackBar` |

`AppSnackBar` is specified individually, carrying a constraint the remaining elements do not. It replaces any message currently presented rather than appending to it, so that an action repeated rapidly yields one message rather than a queue persisting beyond the interaction. It accepts the means of presenting a message rather than a position in the interface, permitting invocation after an awaited operation.

## Visual conventions

No screen and no interface element declares a colour, a size, a text style or a fixed text. All are held by the classes below and obtained from them.

| Class | Holds | Form |
|-------|-------|------|
| `AppStrings` | Every text presented to the Traveler | Fixed values |
| `AppColors` | The palette | Fixed values |
| `AppSizes` | Spacing, radii, icon and text sizes | Derived from the device |
| `AppTextStyles` | The text styles, composed from the sizes | Derived |
| `AppTheme` | The theme applied to the entire interface | Derived |
| `AppTransitions` | The movement from one screen to the next | Fixed values |

`AppSizes` is obtained from the current position in the interface rather than declared directly. Its values are proportions of the smaller dimension of the device rather than fixed lengths, preserving the proportions of the interface across screen sizes. Text sizes incorporate the text scale selected by the Traveler, by which the requirement of [RAD 3.3.1](../../rad/proposed-system/non-functional/usability) is satisfied without a separate layout per device.

`AppStrings` holds every text presented to the Traveler, by which a second language becomes an addition to one class rather than a revision of every screen.

## Exceptions

No class of this package raises an exception. Presentation constitutes the boundary at which exceptions raised beneath it terminate.

A screen invoking an operation liable to fail catches the failure, presents a brief message, and leaves the task unaltered. Causes upon which a screen cannot act differently are not distinguished: a photograph that cannot be read and one the Traveler declined to select both leave the previously held photograph in effect, and only the former is reported.
