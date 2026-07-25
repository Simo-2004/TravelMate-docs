# 3.4.2 Use Case Model

Each use case is specified by its name, participating actors, assumptions, entry condition, flow of events, exceptions, exit condition, and special requirements. The flow separates what the actor does from what the system does. Exceptions are stated apart from the main flow rather than mixed into it.

**Special requirements** name the non-functional constraints that bear on the use case in particular. They do not restate [3.3](../non-functional/); they identify which of its requirements must hold for this use case to be considered correctly realised, and are the point at which the qualities of [3.3](../non-functional/) attach to the functions of [3.2](../functional).

Use cases marked **(deferred)** require a server or a second real Traveler and are not delivered by this lifecycle; they are specified in outline only.

## Use Case Diagram

```mermaid
flowchart LR
    T(["Traveler"])
    A(["Administrator"])

    subgraph D["Delivered"]
        UC1["UC1 Create Account"]
        UC2["UC2 Log In"]
        UC3["UC3 Search Trips and Companions"]
        UC4["UC4 Save a Trip or Companion"]
        UC5["UC5 Converse with a Companion"]
        UC6["UC6 Share a Trip in a Conversation"]
        UC7["UC7 Manage Profile and Settings"]
    end

    subgraph F["Deferred"]
        UC8["UC8 Register a Verified Identity"]
        UC9["UC9 Message a Real Traveler"]
        UC10["UC10 Create Trip"]
        UC11["UC11 Join Trip"]
        UC12["UC12 Report a Traveler"]
    end

    T --- UC1
    T --- UC2
    T --- UC3
    T --- UC4
    T --- UC5
    T --- UC7
    T -.-> UC8
    T -.-> UC9
    T -.-> UC10
    T -.-> UC11
    T -.-> UC12
    A -.-> UC12

    UC4 -. extend .-> UC3
    UC6 -. extend .-> UC5
    UC5 -. include .-> UC2
```

**Relationships.** Saving (UC4) *extends* searching (UC3): a Traveler may save a result, but a search is complete without it. Sharing a trip (UC6) *extends* conversing (UC5) for the same reason. Conversing *includes* logging in, since no conversation is reachable without an admitted Traveler.

## UC1 — Create Account

**Participating actor:** Traveler
**Assumptions:** The Traveler has the application installed and is not currently admitted.
**Entry condition:** The Traveler is at the login screen and chooses to create an account.

| Traveler | System |
|----------|--------|
| 1. Requests to create an account. | 2. Presents a form for a travel identity — name, surname, description, interest and trip labels, photograph — together with a username and a secret. |
| 3. Supplies the identity fields. | |
| 4. Optionally chooses a photograph from the device. | 5. Retains the chosen photograph as part of the form. |
| 6. Supplies a username and a secret, and submits the form. | 7. Validates every field. |
| | 8. Records the credentials in a form from which the secret cannot be recovered, records the travel identity, and admits the Traveler. |

**Exceptions:**
- *A field is unacceptable.* The system reports, beside each offending field, what is wrong with it; no account is created and the values already supplied are retained for correction.
- *The photograph cannot be obtained.* The system reports the failure and leaves the rest of the form intact; the Traveler may submit without a photograph.

**Exit condition:** The Traveler is admitted under the newly created identity, which replaces any account previously held.

**Special requirements:**
- [NFR-U.5](../non-functional/usability) — the whole identity and its credentials are supplied within a single form, and a rejected submission need not be composed again from the beginning.
- [NFR-I.4](../non-functional/implementation) — the secret is retained only in non-reversible form, derived with a deliberately costly function and a value unique to it.
- [NFR-P.3](../non-functional/performance) — that derivation completes within 1 s.
- [NFR-U.4](../non-functional/usability) — the outcome is confirmed visibly within 300 ms.

*Realised by:* `CreateAccountScreen`, `AuthService`, `AccountValidation`.

## UC2 — Log In

**Participating actor:** Traveler
**Assumptions:** An account exists; one is provided on first installation.
**Entry condition:** The Traveler opens the application, which presents the login screen.

| Traveler | System |
|----------|--------|
| 1. Supplies a username and a secret and submits them. | 2. Compares the username with the stored account, disregarding letter case. |
| | 3. Checks the supplied secret against the stored account without recovering the original. |
| | 4. Admits the Traveler to the application. |

**Exceptions:**
- *The username is not recognised, or the secret does not match.* The system reports that the credentials were not recognised, without indicating which of the two was at fault, and remains at the login screen.

**Exit condition:** The Traveler is admitted to the application, or remains at the login screen and may try again.

**Special requirements:**
- [NFR-I.4](../non-functional/implementation) — verification re-derives the stored value rather than recovering the secret, and its duration does not reveal how much of the supplied secret was correct.
- [NFR-P.3](../non-functional/performance) — verification completes within 1 s, and its cost falls on no other operation.
- [NFR-R.2](../non-functional/reliability) — the account is read as a single record, an update replacing it rather than creating a second one.

*Realised by:* `LoginScreen`, `AuthService`, `AccountRepository`.

## UC3 — Search Trips and Companions

**Participating actor:** Traveler
**Entry condition:** The Traveler is admitted and opens the search function.

| Traveler | System |
|----------|--------|
| 1. Chooses whether to search trips or companions. | |
| 2. Enters a query. | 3. Retains the candidates matching every term of the query. |
| | 4. Ranks them by how closely and in which field each term matches, resolving equal ranks alphabetically. |
| | 5. Presents the ranked results. |
| 6. Selects a result. | 7. Presents that trip or companion in detail. |

**Exceptions:**
- *No candidate matches.* The system states that nothing matched, distinguishing this from an empty catalogue, and suggests what may be searched on.
- *The query is empty.* The system presents the catalogue in its own order, so that the Traveler may browse without searching.

**Exit condition:** A ranked list is presented, and the detail of any selected result is shown.

**Special requirements:**
- [NFR-P.1](../non-functional/performance) — results are presented within 100 ms of submission, over the whole catalogue.
- [NFR-I.2](../non-functional/implementation) — the search is served entirely from the device, with no network exchange whatsoever.
- [NFR-U.3](../non-functional/usability) — the search is reachable within three interactions from the main navigation.

*Realised by:* `SearchScreen`, `SearchResultsScreen`, `filterMates`, `filterTrips`.

## UC4 — Save a Trip or Companion

**Participating actor:** Traveler
**Entry condition:** The Traveler is examining a trip or a companion.

| Traveler | System |
|----------|--------|
| 1. Requests that the item be saved. | 2. Records the item among the Traveler's saved items. |
| | 3. Confirms the outcome and marks the item as saved. |

**Exceptions:**
- *The item is already saved.* The system removes it from the saved items instead, confirms the removal, and marks the item as not saved.

**Exit condition:** The item is present among the saved items, or has been removed from them, and the indication shown on the item reflects this.

**Special requirements:**
- [NFR-P.2](../non-functional/performance) — the indication on the item changes within one frame (16 ms), the write to storage proceeding in the background.
- [NFR-U.4](../non-functional/usability) — the outcome is confirmed within 300 ms and stays legible for at least 1.5 s.
- [FR-C.1.5](../functional) — the item appears once in the collection however many times it is saved.

*Realised by:* `SaveTripButton`, `SavedTripPreviewStore`.

## UC5 — Converse with a Companion

**Participating actor:** Traveler
**Assumptions:** Companions are supplied by the system, not by other Travelers; their replies are produced by the system from their own recorded characteristics.
**Entry condition:** The Traveler is examining a companion and chooses to converse.

| Traveler | System |
|----------|--------|
| 1. Opens the conversation. | 2. Presents the exchange held so far, or an invitation to begin if there is none. |
| 3. Composes and sends a message. | 4. Records the message and shows the companion as present. |
| | 5. Determines the companion's reply from the content of the message and, within one second, records and presents it. |
| | 6. Shows the companion as absent once the Traveler has been inactive for five seconds. |

**Exceptions:**
- *The message is empty.* The system does not record it and the conversation is unchanged.
- *No reply corresponds to the content of the message.* The system gives a general reply rather than none.
- *The Traveler has declared themselves absent.* The system discloses no presence for the companion.

**Exit condition:** The exchange is recorded and will be presented again on a later visit, unless the Traveler has discarded it.

**Special requirements:**
- [NFR-I.3](../non-functional/implementation) — the content of the exchange is encrypted at rest with an authenticated algorithm, under a key held by the operating system.
- [NFR-P.4](../non-functional/performance) — the exchange is retrieved within 100 ms for up to 500 messages, without examining the messages of other conversations.
- [FR-D.1.2](../functional) — the reply is presented within 1 s of the message being sent.
- [FR-D.1.5](../functional) — the companion is shown as absent after 5 seconds of inactivity.

*Realised by:* `ChatScreen`, `ChatStore`, `ChatAutoReplyCatalog`.

## UC6 — Share a Trip in a Conversation

**Participating actor:** Traveler
**Entry condition:** The Traveler is conversing with a companion.

| Traveler | System |
|----------|--------|
| 1. Asks to share a trip. | 2. Presents the trips the Traveler has saved. |
| 3. Chooses one. | 4. Adds it to the conversation as an invitation. |
| | 5. Determines whether the trip's characterising labels correspond to the companion's own preferences, and records the acceptance or refusal as the companion's reply. |

**Exceptions:**
- *The Traveler has saved no trips.* The system states that there is nothing to share and explains how a trip may be saved.

**Exit condition:** The invitation and the companion's response form part of the conversation.

**Special requirements:**
- [FR-C.1.1](../functional) — only trips already among the Traveler's saved items may be proposed; the picker offers no other source.
- [NFR-P.2](../non-functional/performance) — the invitation appears in the exchange without blocking the interface.
- [NFR-I.3](../non-functional/implementation) — the invitation and the response are protected as any other conversation content.

*Realised by:* `ChatTripAttachmentPicker`, `mateLikesTrip`.

## UC7 — Manage Profile and Settings

**Participating actor:** Traveler
**Entry condition:** The Traveler is admitted and opens the settings function.

| Traveler | System |
|----------|--------|
| 1. Opens the settings. | 2. Presents the profile, the privacy preferences, the assistance material, and the means of leaving the application. |
| 3. Revises the profile, or adjusts a privacy preference. | 4. Retains the change and confirms it. |
| 5. Optionally leaves the application. | 6. Returns to the login screen. |

**Exceptions:**
- *The Traveler abandons a revision before confirming it.* The system restores the values last confirmed.
- *A replacement photograph cannot be obtained.* The system reports the failure and retains the photograph previously held.

**Exit condition:** The revised profile and preferences are retained and will be presented again on a later visit.

**Special requirements:**
- [NFR-I.3](../non-functional/implementation) — the personal data of the profile is encrypted at rest with an authenticated algorithm.
- [NFR-P.5](../non-functional/performance) — a chosen photograph is stored as a file and referred to by reference, never embedded in the database.
- [NFR-R.2](../non-functional/reliability) — the profile is written as a single record, an update replacing it rather than creating a second one.
- [NFR-U.6](../non-functional/usability) — the editable fields remain legible across the text-scaling range 0.9×–1.2×.

*Realised by:* `SettingsScreen`, `PersonalProfileScreen`, `PrivacySettingsScreen`, `SupportScreen`.

## Deferred use cases

**UC8 — Register a Verified Identity.** The system verifies ownership of an email address, or delegates identity to an external provider, and allows a forgotten secret to be recovered, yielding an account recognised across devices.

**UC9 — Message a Real Traveler.** A message is delivered over the network to a second registered Traveler, who is notified of it; the sender is informed once it has been read.

**UC10 — Create Trip.** A Traveler describes a journey — title, destination, dates, budget, itinerary, and the number of companions sought — and publishes it, obtaining a reference by which others may find it.

**UC11 — Join Trip.** A Traveler requests to join a published trip; the organiser accepts or refuses, and an accepted Traveler joins the group and its conversation.

**UC12 — Report a Traveler.** A Traveler states a reason and submits a report; an Administrator examines it with the relevant history and issues a warning or a suspension.
