# 3.2 Functional Requirements

Functional requirements state what the system must do. They are grouped into modules corresponding to the areas of the application.

Each module lists first the requirements satisfied by the delivered system, then — under **Deferred to future releases** — those belonging to the envisioned platform that a later evolution would have to meet. A consolidated mapping from requirements to the components that realise them appears in [3.2.7](#_3-2-7-traceability).

## 3.2.1 Module A — Account and Profile

### A.1 Account and authentication

- **FR-A.1.1** The application shall require a username and a secret before any other function becomes reachable.
- **FR-A.1.2** A Traveler shall be able to register, supplying a travel identity and the credentials that will admit them subsequently, within a single form.
- **FR-A.1.3** The system shall validate every field of the registration form and shall report each unacceptable value beside the field concerned, indicating what is wrong with it.
- **FR-A.1.4** The stored username shall be compared disregarding letter case.
- **FR-A.1.5** The secret shall never be stored in a recoverable form; verification shall re-derive the stored value from the supplied secret rather than decrypt it.
- **FR-A.1.6** An account shall be available on first installation, so that the application is usable before any registration takes place.
- **FR-A.1.7** A Traveler shall be able to leave the application, which shall return to the login screen.

> The system holds a single account: registering replaces any account already present. Supporting several Travelers on one installation is deferred.

### A.2 Personal profile

- **FR-A.2.1** A Traveler shall be able to record and revise their own name, surname, and description.
- **FR-A.2.2** A Traveler shall be able to choose a profile photograph from the device, or one of the illustrations supplied with the application.
- **FR-A.2.3** A chosen photograph shall be copied into the application's own storage and referred to by reference; the image itself shall not be held in the database.
- **FR-A.2.4** Revisions to the profile shall be abandonable before confirmation, restoring the values last confirmed.
- **FR-A.2.5** The profile shall be retained between uses of the application and shall be protected as required by [NFR-I.3](./non-functional/implementation).

### A.3 Interests and trip preferences

- **FR-A.3.1** A Traveler shall be able to describe their interests and trip preferences as freely chosen labels.
- **FR-A.3.2** The system shall disregard differences of spacing and letter case when determining whether a label has already been recorded.
- **FR-A.3.3** Labels shall be addable and removable both at registration and when revising the profile.

### A.4 Privacy preferences

- **FR-A.4.1** A Traveler shall be able to state four privacy preferences: whether their profile is private, whether they are visible only to nearby Travelers, whether they accept messages, and whether they appear absent.
- **FR-A.4.2** Each preference shall be retained between uses of the application.
- **FR-A.4.3** Declaring oneself absent shall suppress the presence indication of companions, so that a Traveler who is invisible is not shown the presence of others.

> Of the four preferences, only absence governs behaviour in the delivered system; the remaining three are recorded but not yet enforced, as the conditions they describe — search visibility, proximity, unsolicited messages — presuppose other Travelers. Enforcing them is deferred.

### Deferred to future releases

Verification of ownership of an email address, delegation of identity to an external provider, recovery of a forgotten secret, several accounts on one installation, blocking another Traveler, reporting an abusive profile, obtaining a copy of one's data, and erasing one's account.

## 3.2.2 Module B — Search and Discovery

- **FR-B.1.1** A Traveler shall be able to search either trips or companions, choosing between the two.
- **FR-B.1.2** The system shall retain only those candidates matching every term of the query, and shall rank them according to how closely and in which field each term matches, preferring matches at the beginning of a name to matches within it, and matches in a name to matches in a description.
- **FR-B.1.3** Candidates of equal rank shall be ordered alphabetically.
- **FR-B.1.4** An empty query shall return the catalogue in its own order, so that the Traveler may browse before searching.
- **FR-B.1.5** The system shall state explicitly when nothing matches, distinguishing this from an empty catalogue.
- **FR-B.2.1** The system shall present a trip's destination, description, illustrations, and characterising labels.
- **FR-B.2.2** The main view shall present recommended trips and trips consulted recently.

### Deferred to future releases

Restricting a search by age, budget, spoken language, or location; a compatibility score computed from shared interests, overlapping destinations, travel style, and availability; recommendations that improve as the system observes the Traveler's choices; and the exclusion from results of Travelers who have been blocked.

## 3.2.3 Module C — Saved Items

- **FR-C.1.1** A Traveler shall be able to save a trip or a companion while examining it.
- **FR-C.1.2** Saving an item already saved shall remove it, and the indication shown on the item shall reflect its current state at all times.
- **FR-C.1.3** The system shall keep a single collection of saved items, holding trips and companions together.
- **FR-C.1.4** Selecting a saved item shall reopen the trip or companion it refers to.
- **FR-C.1.5** An item shall not appear twice in the collection, however many times it is saved.

## 3.2.4 Module D — Conversations

- **FR-D.1.1** A Traveler shall be able to open a conversation with any companion, from that companion's profile.
- **FR-D.1.2** A message sent by the Traveler shall receive a reply determined by the content of the message; where no specific reply applies, a general one shall be given.
- **FR-D.1.3** Each conversation shall be retained between uses of the application until the Traveler discards it.
- **FR-D.1.4** Conversation content shall be protected as required by [NFR-I.3](./non-functional/implementation), while the information needed to retrieve and order conversations may remain unprotected.
- **FR-D.1.5** A companion shall be shown as present while the exchange is active, and as absent once the Traveler has been inactive for a short interval.
- **FR-D.1.6** A Traveler shall be able to propose one of their saved trips within a conversation; the companion shall accept or decline according to whether the trip's characterising labels correspond to their own preferences.
- **FR-D.1.7** A Traveler shall be able to discard an entire conversation.

> Companions are not other Travelers: their replies are produced by the system from their own recorded characteristics. Exchanges between two real Travelers are deferred.

### Deferred to future releases

Messages exchanged between two registered Travelers over a network, conversations among the participants of a trip, indication that a message has been read, searching within a conversation history, and notification of a Traveler who is not currently using the application.

## 3.2.5 Module E — Trip Organisation

Entirely deferred. The delivered system offers a fixed catalogue of trips and no means of creating one.

A later release shall allow a Traveler to describe a journey — title, destination, dates, budget, itinerary, and the number of companions sought — and publish it; shall allow other Travelers to request to join; shall allow the organiser to accept or refuse those requests and shall prevent the stated number of participants from being exceeded.

## 3.2.6 Module F — Administration

Entirely deferred. A later release shall allow an Administrator to examine reports submitted by Travelers, to issue warnings, to suspend accounts, to remove content that violates the community rules, and shall retain an auditable record of these interventions.

## 3.2.7 Traceability

The delivered system realises the requirements above as follows. This mapping supports verification and is not itself a requirement.

| Requirements | Realised by |
|--------------|-------------|
| A.1 Account and authentication | `LoginScreen`, `CreateAccountScreen`, `AuthService`, `AccountRepository`, `AccountValidation` |
| A.2 Personal profile | `PersonalProfileScreen`, `PersonalProfileStore`, `ProfileRepository`, `ProfileImageStorage` |
| A.3 Interests and trip preferences | `TagInput`, `EditablePersonalTagGroup` |
| A.4 Privacy preferences | `PrivacySettingsScreen`, `PrivacySettingsStore` |
| B.1 Search | `filterMates`, `filterTrips`, `SearchScreen`, `SearchResultsScreen` |
| B.2 Trip presentation | `TravelScheduleScreen`, `HomeScreen`, `TripRepository`, `TripStore` |
| C.1 Saved items | `SavedTripPreviewStore`, `SavedBookmarksData`, `SavedItemsScreen` |
| D.1 Conversations | `ChatScreen`, `ChatStore`, `ChatRepository`, `ChatAutoReplyCatalog`, `mateLikesTrip` |

Companion profiles are supplied as a fixed catalogue held in the source (`MateCatalog`) rather than in the database; trips are seeded into the database once from an equivalent catalogue and read from it thereafter.
