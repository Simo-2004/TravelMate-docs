# 3.2 Functional Requirements

> Requirements are tagged `[R1.0 – Frozen]` or `[EM – Deferred]` as defined in [3.1 Overview](./overview). `[R1.0 – Frozen]` requirements below were verified directly against the repository at `Simo-2004/TravelMate`; each cites the class or screen that realises it.

## Module A: User Management and Profiling

### A.1 Local Account, Sign-Up and Authentication `[R1.0 – Frozen]`
- **FR-A.1.1**: The application shall open on a login screen requiring a username and password before any other feature is reachable
- **FR-A.1.2**: Users shall be able to create an account, supplying profile identity (name, surname, description, tags, photo) together with login credentials in a single sign-up form
- **FR-A.1.3**: The system shall validate credentials on sign-up: username 3–20 characters restricted to letters, digits, `.` and `_`; password 8–64 characters; name/surname required and at most 40 characters; description at most 300 characters
- **FR-A.1.4**: The stored username shall be AES-encrypted, and matched case-insensitively on login
- **FR-A.1.5**: The password shall never be stored reversibly — only a PBKDF2-HMAC-SHA256 salted hash (100,000 iterations, 32-byte derived key, 16-byte random salt) shall be persisted, and login shall re-derive the hash and compare it in constant time
- **FR-A.1.6**: A default account shall be seeded on first run so the application is usable before any sign-up
- **FR-A.1.7**: Users shall be able to sign out, returning to the login screen

*Realised by*: `LoginScreen`, `CreateAccountScreen` (`lib/features/auth/`), `AuthService` (`lib/shared/state/auth_service.dart`), `AccountRepository` (`lib/shared/data/account_repository.dart`), `PasswordHasher` (`lib/core/security/password_hasher.dart`), `AccountValidation` (`lib/shared/utils/account_validation.dart`), `SettingsScreen._handleExit`.

> **Honesty note:** the `account` table holds a **single row** — creating an account overwrites the previous one. This is a single-user local application, not a multi-tenant system. The seeded default credentials are hard-coded constants in `AuthService` (`defaultUsername` / `defaultPassword`), acceptable for a local demonstration build but unsuitable for any networked deployment.

### A.1b Federated and Verified Identity `[EM – Deferred]`
- **FR-A.1b.1**: System shall support social login (Google, Facebook)
- **FR-A.1b.2**: System shall send email verification on registration
- **FR-A.1b.3**: System shall support multiple concurrent user accounts and password recovery
- **FR-A.1b.4**: System shall implement JWT-based authentication for secure API access

### A.2 Profile Management `[R1.0 – Frozen]`
- **FR-A.2.1**: Users shall be able to edit their profile: first name, last name, and a free-text description
- **FR-A.2.2**: Users shall be able to set a profile photo by picking an image from the device gallery, or by choosing one of the bundled preset avatars
- **FR-A.2.3**: A picked photo shall be copied into the application's private documents directory under a unique filename, and only its file path shall be persisted — image bytes shall never be stored in the database
- **FR-A.2.4**: System shall allow users to view and edit their profile information, with edits reversible before saving (cancel restores the last saved values)
- **FR-A.2.5**: The profile shall be persisted in SQLite with every text column encrypted (see F.2) and restored on app restart

*Realised by*: `PersonalProfile` (`lib/shared/models/personal_profile.dart`), `PersonalProfileStore`, `SqliteProfileData` / `ProfileRepository` (`lib/shared/data/`), `PersonalProfileScreen` (`lib/features/profile/personal_profile_screen.dart`), `ProfileImageStorage` / `ProfileImagePicker` (`lib/features/profile/image/`).

> The profile has **no** date of birth, age, gender, pronouns, or location field, and no profile-completion percentage.

### A.3 Interests and Trip Tags `[R1.0 – Frozen]`
- **FR-A.3.1**: Users shall add free-text interest tags and trip-preference tags to their profile (not selected from a predefined category list)
- **FR-A.3.2**: System shall de-duplicate tags case-insensitively and normalise whitespace
- **FR-A.3.3**: Users shall be able to add or remove tags both at sign-up and while editing their profile
- **FR-A.3.4**: Tag lists shall be JSON-encoded and encrypted before storage

*Realised by*: `PersonalProfile.interestTags` / `tripTags`, `TagInput` (`lib/shared/utils/tag_input.dart`), `EditablePersonalTagGroup`.

> Tags are not used for any automated matching in Release 1.0 (see B.2); they do influence whether a companion accepts a trip invite in chat (see C.2).

### A.4 Privacy Preferences `[R1.0 – Frozen]`
- **FR-A.4.1**: Users shall be able to toggle four local privacy preferences: *Private Profile*, *Only people in your radius*, *Check messages*, and *Offline mode*
- **FR-A.4.2**: System shall persist each toggle locally and restore it on app restart
- **FR-A.4.3**: Toggling *Offline mode* shall hide companions' presence indicators in the simulated chat (see C.2)

*Realised by*: `PrivacySettings`, `PrivacySettingsStore`, `PrivacySettingsData`, `PrivacySettingsScreen`.

> **Honesty note (also stated in-app):** only *Offline mode* has an observable behavioural effect. The other three are persisted preferences with **no enforcement** — the Privacy screen itself displays: *"These toggles are ready for future integrations. Right now each action shows a click confirmation."* Enforcing them, along with blocking, reporting, GDPR data export, and account deletion, is `[EM – Deferred]`. Privacy preferences are also the one dataset still stored as **plain JSON in `SharedPreferences`**, not in the encrypted database.

## Module B: Search and Discovery

### B.1 Companion Search `[R1.0 – Frozen]`
- **FR-B.1.1**: System shall provide a single free-text search field over the companion catalog
- **FR-B.1.2**: Results shall be ranked by a term-based scoring algorithm: each search term must match at least one of the companion's name, description, or keywords to be included; matches are weighted (name prefix highest, then name substring, keyword prefix/substring, then description substring) and summed across all terms
- **FR-B.1.3**: Results with equal score shall be sorted alphabetically by name
- **FR-B.1.4**: The result list shall be capped to a fixed limit (5)
- **FR-B.1.5**: An empty query shall return the catalog unranked, in its original order

*Realised by*: `filterMates` (`lib/shared/utils/mate_search.dart`), `SearchScreen` / `SearchResultsScreen`.

> There are **no** advanced filters (age range, gender, languages, budget level, location) and **no** pagination. Companion profiles remain a fixed in-code catalog of 3 entries (`MateCatalog`) — unlike trips, they were not migrated to SQLite.

### B.2 Compatibility Matching Algorithm `[EM – Deferred]`
- **FR-B.2.1**: System shall calculate a compatibility score based on shared interests (40% weight), destination overlap (30% weight), travel style compatibility (20% weight), and availability overlap (10% weight)
- **FR-B.2.2**: System shall recommend compatible travelers in a discover feed driven by this score
- **FR-B.2.3**: Matching shall exclude blocked users and hidden profiles
- **FR-B.2.4**: System shall learn from user interactions to improve recommendations

> No weighted compatibility scoring exists in Release 1.0; the term-based ranking in B.1 is a search-relevance heuristic, not a compatibility algorithm, and produces no percentage score.

### B.3 Trip Browsing and Search `[R1.0 – Frozen]` (creation/join deferred)
- **FR-B.3.1**: System shall allow searching the trip catalog by a single free-text query matched against trip label, destination title, description, and tags, using the same term-based ranking as B.1
- **FR-B.3.2**: System shall display trip details: label, destination title, description, an image gallery/schedule, and a set of styled trip tags
- **FR-B.3.3**: The Home tab shall display a "Recommended trips" carousel and a "Viewed recently" carousel
- **FR-B.3.4**: Trips shall be persisted in SQLite as two ordered collections (`trips`, `recents`), seeded once on first run from the bundled static catalog; thereafter the database is the source of truth

*Realised by*: `filterTrips` (`lib/shared/utils/trip_search.dart`), `TripRepository` (`lib/shared/data/trip_repository.dart`), `TripStore` (`lib/shared/state/trip_store.dart`), `TravelScheduleScreen`, `HomeScreen`.

> Trip rows are stored **in plain text** — they are public, read-only catalog content, not user data, so no encryption is applied. Trips have no date range, budget, or participant fields, and there is no trip-creation UI.

## Module C: Interaction and Saving

### C.1 Saved Items `[R1.0 – Frozen]`
- **FR-C.1.1**: Users shall be able to bookmark a companion profile or a trip from its detail screen
- **FR-C.1.2**: System shall maintain a single saved-items list per device, mixing both bookmark types, persisted locally
- **FR-C.1.3**: Users shall be able to view all saved items on the Saved tab, and tap one to reopen the corresponding trip or companion screen
- **FR-C.1.4**: Users shall be able to unsave an item; the bookmark button shall reflect the current saved state
- **FR-C.1.5**: Bookmarks shall be de-duplicated by source identifier, with a fallback match by name for legacy records

*Realised by*: `SavedTripPreview`, `SavedTripPreviewStore`, `SavedBookmarksData`, `SavedItemsScreen`.

> Bookmarks are stored as plain JSON in `SharedPreferences`, not in the encrypted database.

### C.2 Simulated Companion Chat `[R1.0 – Frozen]`
- **FR-C.2.1**: Users shall be able to open a private, 1-to-1 conversation with any companion from that companion's profile screen
- **FR-C.2.2**: Sent messages shall receive an automated reply, chosen by matching the message text (whole-word, case-insensitive) against an ordered list of keyword rules; if no rule matches, a fallback reply is returned
- **FR-C.2.3**: Each companion's conversation history shall persist in SQLite and be restored on app restart, until explicitly cleared by the user
- **FR-C.2.4**: Message text shall be encrypted at rest; structural columns (`mate_id`, `is_from_me`, `sent_at`, `attached_trip_id`) shall remain in plain text so conversations can be queried and ordered
- **FR-C.2.5**: System shall simulate the companion's online/offline presence: the companion appears online while the user is actively typing or has just sent a message, and returns to offline after 5 seconds of inactivity
- **FR-C.2.6**: Users shall be able to attach a previously saved trip to the conversation as an invite; the companion's reply (accept or decline) shall be determined by whether any of the trip's tags match the companion's own interest/preferred-trip tags
- **FR-C.2.7**: Users shall be able to clear a companion's entire conversation history

*Realised by*: `ChatMessage`, `ChatStore` (`lib/shared/state/chat_store.dart`), `ChatRepository` (`lib/shared/data/chat_repository.dart`), `SqliteChatData`, `ChatAutoReplyCatalog` / `resolveAutoReply`, `mateLikesTrip`, `ChatScreen`.

> This is a **fully local simulation**: there is no other real user on the other end, no network transport, no message length limit, no read/unread status, and no message search.

### C.2b Real-Time Messaging Between Users `[EM – Deferred]`
- **FR-C.2b.1**: System shall support 1-on-1 and group messaging between distinct, authenticated real users over a network connection
- **FR-C.2b.2**: Messages shall carry read/unread status and be encrypted in transit as well as at rest
- **FR-C.2b.3**: Users shall be able to search message history and block another user from initiating a chat

### C.3 Notifications `[EM – Deferred]`
- **FR-C.3.1**: System shall send notifications for new messages, match recommendations, trip join requests, connection requests, and profile views
- **FR-C.3.2**: Users shall be able to control notification preferences
- **FR-C.3.3**: System shall support push notifications on mobile
- **FR-C.3.4**: System shall support email notifications

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

## Module F: Data Persistence and Security

### F.1 Local Relational Persistence `[R1.0 – Frozen]`
- **FR-F.1.1**: The application shall persist data in a local SQLite database file (`travelmate.db`) stored in the application's private documents directory
- **FR-F.1.2**: The database shall expose four tables: `personal_profile` (single row), `trips` (ordered catalog rows), `account` (single row), and `chat_messages` (indexed by `mate_id`)
- **FR-F.1.3**: Table creation shall be idempotent (`CREATE TABLE IF NOT EXISTS`), and schema growth shall be handled by incrementing the database version and creating any missing tables on upgrade
- **FR-F.1.4**: A single lazily-opened database connection shall be shared application-wide to prevent multiple open handles to the same file
- **FR-F.1.5**: All database access shall pass through DAO interfaces, with mapping and encryption logic residing in repositories, so that persistence logic is testable against in-memory fakes
- **FR-F.1.6**: On first run after upgrading from a previous version, any personal profile and chat history previously saved in `SharedPreferences` shall be transparently migrated into the database

*Realised by*: `DatabaseHelper` (`lib/core/database/database_helper.dart`), `ProfileDao`/`TripDao`/`AccountDao`/`ChatDao` and their `sqflite` adapters, `ProfileRepository`, `TripRepository`, `AccountRepository`, `ChatRepository`, `SqliteProfileData`, `SqliteChatData`.

### F.2 Encryption at Rest and Credential Security `[R1.0 – Frozen]`
- **FR-F.2.1**: Sensitive text columns shall be encrypted with AES-256-GCM before being written to the database, and decrypted on read
- **FR-F.2.2**: Each encryption operation shall use a freshly generated 12-byte random nonce, stored alongside the ciphertext as a single base64 payload (`nonce || ciphertext+tag`)
- **FR-F.2.3**: The GCM authentication tag shall make tampering detectable: decryption shall fail if the payload was altered or a different key is used
- **FR-F.2.4**: The 256-bit AES key shall be generated with a cryptographically secure random source on first use and persisted in the operating system's keystore/keychain, never in the application database
- **FR-F.2.5**: The following data shall be encrypted at rest: all personal-profile text columns and tag lists, the account username, and chat message text
- **FR-F.2.6**: The following data shall remain in plain text, by design: trip catalog rows (public content), and chat structural columns needed for querying and ordering
- **FR-F.2.7**: Login passwords shall be protected by one-way PBKDF2-HMAC-SHA256 hashing with a per-password random salt, and verified by constant-time comparison

*Realised by*: `AesCipher` (`lib/core/security/aes_cipher.dart`), `ProfileKeyProvider`, `SecureKeyStore` / `FlutterSecureKeyStore`, `PasswordHasher`.

### F.3 Networked Data Protection `[EM – Deferred]`
- **FR-F.3.1**: Data shall be encrypted in transit using TLS 1.3+
- **FR-F.3.2**: The server-side database shall support ACID transactions, replication, and point-in-time backup
- **FR-F.3.3**: Users shall be able to export and permanently erase their data (GDPR compliance)

## Implementation status (baseline traceability)

This section provides the formal traceability between the `[R1.0 – Frozen]` requirements and the delivered code, confirming the V-Model **design = code, verified against it** principle (see [Software Life Cycle Model Choice](/rad/overview#software-life-cycle-model-choice)). It was produced by direct inspection of `Simo-2004/TravelMate`.

- **Implemented (local, no network):**
  - Account, sign-up, login, logout (A.1) — `AuthService`, `AccountRepository`, `LoginScreen`, `CreateAccountScreen`
  - Encrypted personal profile with gallery photo (A.2, A.3) — `ProfileRepository`, `SqliteProfileData`, `ProfileImageStorage`
  - Privacy preferences (A.4) — `PrivacySettingsStore`; only *Offline mode* is behaviourally enforced
  - Companion & trip search (B.1, B.3) — `filterMates`, `filterTrips`, `TripRepository`, `TripStore`
  - Saved items (C.1) — `SavedTripPreviewStore`, `SavedBookmarksData`
  - Simulated chat with encrypted history (C.2) — `ChatStore`, `ChatRepository`, `SqliteChatData`
  - SQLite persistence and encryption stack (F.1, F.2) — `DatabaseHelper`, DAOs, repositories, `AesCipher`, `ProfileKeyProvider`, `PasswordHasher`

- **Static / catalog data:**
  - Companion profiles remain a fixed in-code catalog of 3 entries (`MateCatalog`), not database-backed
  - Trip content originates from a bundled static catalog, seeded once into SQLite on first run

- **Stored unencrypted in `SharedPreferences`:**
  - Saved bookmarks (C.1) and privacy preferences (A.4)

- **Not implemented (no code in repository), `[EM – Deferred]`:**
  - Social login, email verification, multi-user accounts, JWT (A.1b)
  - Compatibility matching algorithm (B.2)
  - Real-time messaging between real users (C.2b)
  - Notifications (C.3)
  - Trip creation and server-side trip lifecycle (D)
  - Administration and moderation tooling (E)
  - Transport-level protection and server-side data governance (F.3)
