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

Release 1.0, the baseline delivered by this lifecycle, is a **self-contained, local-first, single-device demonstration**. It covers:

- **Personal Profile**: Local editing of name, description, and a photo chosen from a small set of preset avatars
- **Trip & Companion Catalog Browsing**: Browsing a fixed catalog of mock trips and mock companion profiles
- **Search & Discovery**: Keyword search and ranking across the mock catalogs
- **Saved Items**: Bookmarking trips and companion profiles, persisted on-device
- **Simulated Chat**: A local, per-companion conversation with a keyword-matched auto-reply engine and simulated online/offline presence
- **Privacy Preferences**: Local toggles persisted on-device; in Release 1.0 these are user preferences with limited behavioural effect (see [3.2 Functional Requirements, Module A](../proposed-system/functional))

### Out of Scope (Release 1.0)

The following are part of the envisioned platform but are **not** implemented in this lifecycle — they are `[EM – Deferred]` domain requirements recorded in [3. Proposed System](../proposed-system/):

- User registration, authentication, and account management
- A remote backend, database, or any network communication
- Real-time messaging or communication between distinct real users
- Trip creation by users, join requests, and participant management
- User reporting, blocking enforcement, and administrative moderation
- Push or email notifications
- Payment processing and booking integration
- Real-time translation services
- Travel insurance or liability coverage
