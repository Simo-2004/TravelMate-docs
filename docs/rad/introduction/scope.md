# 1.2 Scope of the System

## Envisioned scope (long-term vision)

The envisioned TravelMate platform, described in full in the Feasibility Study (§3.1), encompasses:

- **User Management**: Registration, authentication, profile creation and management
- **Search & Discovery Engine**: Advanced filtering and matching capabilities
- **Communication Platform**: Real-time private messaging and group chat between real users
- **Trip Management**: Creation, joining, and coordination of travel plans
- **Social Features**: Saved companions/trips and user rating/review system
- **Administration**: Moderation, reporting, and user management tools

## Release 1.0 scope (this lifecycle)

Release 1.0, the baseline delivered by this lifecycle, is a **self-contained, local-first, single-device application** backed by an encrypted SQLite database. It covers:

- **Account & Authentication**: Sign-up and login against a single locally stored account; the username is AES-encrypted and the password is kept only as a PBKDF2-HMAC-SHA256 salted hash, never reversibly
- **Encrypted Personal Profile**: Local editing of name, surname, description, interest/trip tags, and a profile photo picked from the device gallery — all persisted as AES-256-GCM ciphertext in SQLite
- **Trip & Companion Catalog Browsing**: Browsing trips persisted in SQLite (seeded once from a static catalog) and companion profiles served from a fixed in-code catalog
- **Search & Discovery**: Keyword search and term-based ranking across trips and companions
- **Saved Items**: Bookmarking trips and companion profiles, persisted on-device
- **Simulated Chat**: A local, per-companion conversation with a keyword-matched auto-reply engine, encrypted message text at rest, and simulated online/offline presence
- **Privacy Preferences**: Local toggles persisted on-device (see [3.2 Functional Requirements, Module A](../proposed-system/functional))

### Out of Scope (Release 1.0)

The following are part of the envisioned platform but are **not** implemented in this lifecycle — they are `[EM – Deferred]` domain requirements recorded in [3. Proposed System](../proposed-system/):

- Multiple concurrent user accounts (the local account table holds a single row)
- Email verification, social login, and password recovery
- A remote backend, server-side database, or any network communication
- Real-time messaging or communication between distinct real users
- Advanced search filters (age, budget, languages, location) and a weighted compatibility-matching algorithm
- Trip creation by users, join requests, and participant management
- User reporting, blocking enforcement, and administrative moderation
- Push or email notifications
- Payment processing and booking integration
- Real-time translation services
- Travel insurance or liability coverage
