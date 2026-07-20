# 3.2 Functional Requirements

> Requirements are tagged `[R1.0 – Frozen]` or `[EM – Deferred]` as defined in [3.1 Overview](./overview). `[R1.0 – Frozen]` requirements below were verified directly against the repository at `Simo-2004/TravelMate`; each cites the class or screen that realises it.

## Module A: User Management and Profiling

### A.1 User Registration and Authentication `[EM – Deferred]`
- **FR-A.1.1**: System shall allow unauthenticated users to register with email/password
- **FR-A.1.2**: System shall support social login (Google, Facebook)
- **FR-A.1.3**: System shall enforce password complexity requirements (minimum 8 characters, mixed case, numbers)
- **FR-A.1.4**: System shall send email verification on registration
- **FR-A.1.5**: System shall implement JWT-based authentication for secure API access

> No registration, login, or session logic exists in the repository. The Settings screen's "Exit" action navigates to a static confirmation screen (`_LogoutDoneScreen` in `lib/features/settings/settings_screen.dart`) — there is no account to sign out of.

### A.2 Profile Management `[R1.0 – Frozen]`
- **FR-A.2.1**: Users shall be able to edit their local profile with first name, last name, and a free-text description
- **FR-A.2.2**: Users shall select a profile photo from a fixed set of preset avatar assets (arbitrary image upload is not supported)
- **FR-A.2.3**: System shall allow users to view and edit their profile information, with edits reversible before saving (cancel restores the last saved values)
- **FR-A.2.4**: System shall persist the profile locally and restore it on app restart

*Realised by*: `PersonalProfile` (`lib/shared/models/personal_profile.dart`), `PersonalProfileStore` (`lib/shared/state/personal_profile_store.dart`), `PersonalProfileData` (`lib/shared/data/personal_profile_data.dart`), `PersonalProfileScreen` (`lib/features/profile/personal_profile_screen.dart`).

> The profile has **no** date of birth, age, gender, pronouns, or location field, and does **not** support multi-photo upload or a profile-completion percentage — these were previously (and incorrectly) documented and do not exist in the codebase.

### A.3 Interests and Trip Tags `[R1.0 – Frozen]`
- **FR-A.3.1**: Users shall add free-text interest tags and trip-preference tags to their profile (not selected from a predefined category list)
- **FR-A.3.2**: System shall de-duplicate tags case-insensitively and normalise whitespace
- **FR-A.3.3**: Users shall be able to add or remove tags at any time while editing their profile

*Realised by*: `PersonalProfile.interestTags` / `PersonalProfile.tripTags`, `EditablePersonalTagGroup` (`lib/shared/widgets/editable_personal_tag_group.dart`).

> There is no separate "favorite destinations" selector; destination-like preferences are expressed as free-text trip tags. Tags are not used for any automated matching in Release 1.0 (see B.2).

### A.4 Privacy Preferences `[R1.0 – Frozen]`
- **FR-A.4.1**: Users shall be able to toggle four local privacy preferences: *Private Profile*, *Only people in your radius*, *Check messages*, and *Offline mode*
- **FR-A.4.2**: System shall persist each toggle locally and restore it on app restart
- **FR-A.4.3**: Toggling *Offline mode* shall hide the user's own online/offline presence indicator from companions in the simulated chat (see C.2)

*Realised by*: `PrivacySettings` (`lib/shared/models/privacy_settings.dart`), `PrivacySettingsStore` (`lib/shared/state/privacy_settings_store.dart`), `PrivacySettingsScreen` (`lib/features/settings/privacy_settings_screen.dart`).

> **Honesty note (also stated in-app):** in Release 1.0, only *Offline mode* has an observable behavioural effect. *Private Profile*, *Only people in your radius*, and *Check messages* are persisted preferences with **no enforcement** — the Privacy screen itself displays: *"These toggles are ready for future integrations. Right now each action shows a click confirmation."* Enforcing these preferences (hiding profiles from search, blocking messages, radius filtering) is `[EM – Deferred]`, along with blocking other users, reporting profiles, GDPR data export, and account deletion — none of which exist in the current UI.

## Module B: Search and Discovery

### B.1 Companion Search `[R1.0 – Frozen]`
- **FR-B.1.1**: System shall provide a single free-text search field over the mock companion catalog
- **FR-B.1.2**: Results shall be ranked by a term-based scoring algorithm: each search term must match at least one of the companion's name, description, or keywords to be included; matches are weighted (name prefix highest, then name substring, keyword prefix/substring, then description substring) and summed across all terms
- **FR-B.1.3**: Results with equal score shall be sorted alphabetically by name
- **FR-B.1.4**: The inline Search tab shall show at most 5 ranked results; the dedicated Search Results screen shall show at most 5 ranked results per submitted query
- **FR-B.1.5**: An empty query shall return the catalog unranked, in its original order

*Realised by*: `filterMates` (`lib/shared/utils/mate_search.dart`), `SearchScreen` / `SearchResultsScreen` (`lib/features/search/`).

> There are **no** advanced filters (age range, gender, languages, budget level, flexibility level, location) and **no** pagination — these were previously documented but do not exist; the result set is a fixed top-N ranked list, not a paged one.

### B.2 Compatibility Matching Algorithm `[EM – Deferred]`
- **FR-B.2.1**: System shall calculate a compatibility score based on shared interests (40% weight), destination overlap (30% weight), travel style compatibility (20% weight), and availability overlap (10% weight)
- **FR-B.2.2**: System shall recommend compatible travelers in a discover feed driven by this score
- **FR-B.2.3**: Matching shall exclude blocked users and hidden profiles
- **FR-B.2.4**: System shall learn from user interactions to improve recommendations

> No weighted compatibility scoring exists in Release 1.0; the term-based ranking in B.1 is a search-relevance heuristic, not a compatibility algorithm, and produces no percentage score.

### B.3 Trip Browsing and Search `[R1.0 – Frozen]` (creation/join deferred)
- **FR-B.3.1**: System shall allow searching the mock trip catalog by a single free-text query matched against trip label, destination title, description, and tags, using the same term-based ranking as B.1
- **FR-B.3.2**: System shall display trip details: label, destination title, description, an image gallery/schedule, and a set of styled trip tags
- **FR-B.3.3**: The Home tab shall display a "Recommended trips" carousel and a "Viewed recently" carousel, each backed by the mock trip catalog

*Realised by*: `filterTrips` (`lib/shared/utils/trip_search.dart`), `TripTileData` (`lib/shared/models/trip_tile_data.dart`), `TripCatalog` (`lib/shared/data/trip_catalog.dart`), `TravelScheduleScreen` (`lib/features/schedule/travel_schedule_screen.dart`), `HomeScreen` (`lib/features/home/home_screen.dart`).

> Trips have **no** date range, budget estimate, or participant count/list fields — the trip catalog is a fixed set of 8 mock entries with no dynamic data. Requesting to join a trip and creator approval of join requests are `[EM – Deferred]` (see Module D); there is no trip creation UI in Release 1.0.

## Module C: Interaction and Saving

### C.1 Saved Items `[R1.0 – Frozen]`
- **FR-C.1.1**: Users shall be able to bookmark a companion profile or a trip from its detail screen
- **FR-C.1.2**: System shall maintain a single saved-items list per device, mixing both bookmark types, persisted locally
- **FR-C.1.3**: Users shall be able to view all saved items on the Saved tab, and tap one to reopen the corresponding trip or companion screen
- **FR-C.1.4**: Users shall be able to unsave (remove) an item; the bookmark button reflects the current saved state
- **FR-C.1.5**: Bookmarks shall be de-duplicated by source (trip or companion identifier), with a fallback match by name for legacy records

*Realised by*: `SavedTripPreview` (`lib/shared/models/saved_trip_preview.dart`), `SavedTripPreviewStore` (`lib/shared/state/saved_trip_preview_store.dart`), `SavedBookmarksData` (`lib/shared/data/saved_bookmarks_data.dart`), `SavedItemsScreen` (`lib/features/saved/saved_items_screen.dart`).

### C.2 Simulated Companion Chat `[R1.0 – Frozen]`
- **FR-C.2.1**: Users shall be able to open a private, 1-to-1 conversation with any companion from that companion's profile screen
- **FR-C.2.2**: Sent messages shall receive an automated reply, chosen by matching the message text (whole-word, case-insensitive) against an ordered list of keyword rules; if no rule matches, a fallback reply is returned
- **FR-C.2.3**: Each companion's conversation history shall persist locally and be restored on app restart, until explicitly cleared by the user
- **FR-C.2.4**: System shall simulate the companion's online/offline presence: the companion appears online while the user is actively typing or has just sent a message, and returns to offline after 5 seconds of inactivity
- **FR-C.2.5**: Users shall be able to attach a previously saved trip to the conversation as an invite; the companion's reply (accept or decline) shall be determined by whether any of the trip's tags match the companion's own interest/preferred-trip tags
- **FR-C.2.6**: Users shall be able to clear a companion's entire conversation history

*Realised by*: `ChatMessage` (`lib/shared/models/chat_message.dart`), `ChatStore` (`lib/shared/state/chat_store.dart`), `ChatHistoryData` (`lib/shared/data/chat_history_data.dart`), `ChatAutoReplyCatalog` / `resolveAutoReply` (`lib/shared/data/chat_auto_reply_catalog.dart`, `lib/shared/utils/chat_auto_reply.dart`), `mateLikesTrip` (`lib/shared/utils/trip_invite.dart`), `ChatScreen` (`lib/features/chat/chat_screen.dart`).

> This is a **fully local simulation**: there is no other real user on the other end, no network transport, no message length limit enforced, no read/unread status, and no message search. It exists to validate the coordination-and-communication UX ahead of a real backend.

### C.2b Real-Time Messaging Between Users `[EM – Deferred]`
- **FR-C.2b.1**: System shall support 1-on-1 and group messaging between distinct, authenticated real users over a network connection
- **FR-C.2b.2**: Messages shall carry read/unread status and be encrypted in transit and at rest
- **FR-C.2b.3**: Users shall be able to search message history and block another user from initiating a chat

### C.3 Notifications `[EM – Deferred]`
- **FR-C.3.1**: System shall send notifications for new messages, match recommendations, trip join requests, connection requests, and profile views
- **FR-C.3.2**: Users shall be able to control notification preferences
- **FR-C.3.3**: System shall support push notifications on mobile
- **FR-C.3.4**: System shall support email notifications

> No notification of any kind (push, email, or in-app) exists in Release 1.0.

## Module D: Trip Management `[EM – Deferred]`

### D.1 Trip Creation
- **FR-D.1.1**: Users shall be able to create trips with title, description, destination, start/end dates, budget estimate, max participants, and itinerary items
- **FR-D.1.2**: System shall validate date ranges (start before end)
- **FR-D.1.3**: Trip creator shall be marked as organizer
- **FR-D.1.4**: System shall generate a trip ID and access code

### D.2 Trip Participation
- **FR-D.2.1**: Users shall be able to request to join trips
- **FR-D.2.2**: Trip creators shall approve or reject join requests
- **FR-D.2.3**: System shall prevent exceeding max participants
- **FR-D.2.4**: System shall track all participants and their status

## Module E: Administration `[EM – Deferred]`

### E.1 User Moderation
- **FR-E.1.1**: Administrators shall be able to view all user reports
- **FR-E.1.2**: Administrators shall be able to suspend/ban users
- **FR-E.1.3**: Administrators shall be able to delete inappropriate content
- **FR-E.1.4**: Administrators shall be able to send warnings to users
- **FR-E.1.5**: System shall maintain audit logs of all admin actions

### E.2 System Monitoring
- **FR-E.2.1**: Administrators shall have access to a system analytics dashboard
- **FR-E.2.2**: Administrators shall view user statistics and engagement metrics
- **FR-E.2.3**: Administrators shall monitor system performance metrics

## Implementation status (baseline traceability)

This section provides the formal traceability between the `[R1.0 – Frozen]` requirements and the delivered code, confirming the Waterfall **design = code** principle. It was produced by direct inspection of `Simo-2004/TravelMate`, not inferred from prior documentation.

- **Implemented (client-side, local-only):**
  - Personal Profile (A.2, A.3) — `PersonalProfileStore`, `PersonalProfileData`, `PersonalProfileScreen`
  - Privacy Preferences (A.4) — `PrivacySettingsStore`, `PrivacySettingsData`, `PrivacySettingsScreen`; only *Offline mode* is behaviourally enforced
  - Companion & Trip Search (B.1, B.3) — `filterMates`, `filterTrips`, `SearchScreen`, `SearchResultsScreen`
  - Saved Items (C.1) — `SavedTripPreviewStore`, `SavedBookmarksData`, `SavedItemsScreen`
  - Simulated Chat (C.2) — `ChatStore`, `ChatHistoryData`, `ChatAutoReplyCatalog`, `ChatScreen`
  - Navigation and all presentation screens — `lib/features/*`, `lib/features/navigation/navigation_shell.dart`

- **Mock / static data:**
  - Trip and companion catalogs are fixed, generated mock data (`TripCatalog`, `MateCatalog`, `TripMediaCatalog`) — there is no dynamic trip creation or server-side persistence

- **Not implemented (no code in repository), `[EM – Deferred]`:**
  - Authentication (A.1)
  - Compatibility matching algorithm (B.2)
  - Real-time messaging between real users, encryption, read receipts (C.2b)
  - Notifications of any kind (C.3)
  - Trip creation and server-side trip lifecycle (D)
  - Administration and moderation tooling (E)
