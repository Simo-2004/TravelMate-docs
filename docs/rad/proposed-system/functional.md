# 3.2 Functional Requirements

> Requirements are tagged `[R1.0 – Frozen]` or `[EM – Deferred]` as defined in [3.1 Overview](./overview).

## Module A: User Management and Profiling

### A.1 User Registration and Authentication `[EM – Deferred]`
- **FR-A.1.1**: System shall allow unauthenticated users to register with email/password
- **FR-A.1.2**: System shall support social login (Google, Facebook)
- **FR-A.1.3**: System shall enforce password complexity requirements (minimum 8 characters, mixed case, numbers)
- **FR-A.1.4**: System shall send email verification on registration
- **FR-A.1.5**: System shall implement JWT-based authentication for secure API access

### A.2 Profile Management `[R1.0 – Frozen]`
- **FR-A.2.1**: Users shall be able to create and edit their profile with:
  - First name, last name, date of birth
  - Bio/description (max 500 characters)
  - Profile photo (multiple photos supported)
  - Gender and preferred pronouns
  - Location (city/country)
- **FR-A.2.2**: System shall validate user age (minimum 18 years)
- **FR-A.2.3**: Users shall be able to upload up to 5 profile photos
- **FR-A.2.4**: System shall allow users to view and edit their profile information
- **FR-A.2.5**: System shall display profile completion percentage

### A.3 Interests and Destinations `[R1.0 – Frozen]`
- **FR-A.3.1**: Users shall select interests from predefined categories:
  - Adventure, Relaxation, Culture, Museums, Food, Nightlife, Sports, Nature, Photography, Budget Travel, Luxury Travel, Family-Friendly, Solo Travel, Group Travel
- **FR-A.3.2**: Users shall select multiple favorite destinations
- **FR-A.3.3**: System shall store interest-destination relationships for matching purposes
- **FR-A.3.4**: Users shall be able to update interests and destinations at any time

### A.4 Privacy Management `[R1.0 – Frozen]` (server-dependent items deferred)
- **FR-A.4.1**: Users shall be able to set profile visibility (Public, Friends Only, Hidden)
- **FR-A.4.2**: Users shall have option to hide profile from search results
- **FR-A.4.3**: Users shall be able to block other users
- **FR-A.4.4**: Users shall be able to display last name only to saved matches
- **FR-A.4.5**: System shall maintain a blocked users list
- **FR-A.4.6**: Users shall be able to report abusive profiles
- **FR-A.4.7**: System shall allow data export (GDPR compliance)
- **FR-A.4.8**: System shall allow account deletion and data removal

## Module B: Search Engine and Matching

### B.1 Travel Companion Search `[R1.0 – Frozen]`
- **FR-B.1.1**: System shall provide advanced search with filters for:
  - Age range
  - Gender
  - Languages spoken
  - Budget level (Budget/Mid-range/Luxury)
  - Flexibility level (Very Flexible/Moderately Flexible/Set Plans)
  - Interests (multi-select)
  - Location
- **FR-B.1.2**: System shall display search results with user profiles
- **FR-B.1.3**: Search results shall be sorted by compatibility score (default)
- **FR-B.1.4**: System shall support pagination (20 profiles per page)
- **FR-B.1.5**: Search response time must be < 2 seconds for standard queries

### B.2 Matching Algorithm `[EM – Deferred]`
- **FR-B.2.1**: System shall calculate compatibility score based on:
  - Shared interests (40% weight)
  - Destination overlap (30% weight)
  - Travel style compatibility (20% weight)
  - Availability dates overlap (10% weight)
- **FR-B.2.2**: System shall recommend compatible travelers in discover feed
- **FR-B.2.3**: Matching shall exclude blocked users and hidden profiles
- **FR-B.2.4**: System shall learn from user interactions to improve recommendations

### B.3 Trip/Destination Search `[R1.0 – Frozen]` (join flows deferred)
- **FR-B.3.1**: System shall allow searching for trips by:
  - Destination
  - Date range
  - Budget
  - Number of participants
  - Trip creator interests
- **FR-B.3.2**: System shall display trip details:
  - Title, description, destination
  - Start/end dates, budget estimate
  - Creator profile, participants list
  - Itinerary overview
- **FR-B.3.3**: Users shall be able to request to join trips
- **FR-B.3.4**: Trip creators shall approve/reject join requests

## Module C: Interaction and Saving

### C.1 Saved Items `[R1.0 – Frozen]`
- **FR-C.1.1**: Users shall be able to save (favorite) travel companion profiles
- **FR-C.1.2**: Users shall be able to save trips they're interested in
- **FR-C.1.3**: System shall maintain a saved items list per user
- **FR-C.1.4**: Users shall be able to view their saved items
- **FR-C.1.5**: Saved items shall be organized by type (companions/trips)
- **FR-C.1.6**: Users shall be able to unsave items

### C.2 Integrated Chat System `[EM – Deferred]`
- **FR-C.2.1**: System shall support 1-on-1 private messaging
- **FR-C.2.2**: System shall support group messaging for trip participants
- **FR-C.2.3**: Chat messages shall include:
  - Message text (max 5000 characters)
  - Timestamp
  - Read/unread status
  - User identification
- **FR-C.2.4**: System shall display online/offline status
- **FR-C.2.5**: Users shall receive notifications for new messages
- **FR-C.2.6**: Users shall be able to search message history
- **FR-C.2.7**: Users shall be able to block users from initiating chats
- **FR-C.2.8**: Chat history shall be encrypted in transit and at rest

### C.3 Notifications `[EM – Deferred]`
- **FR-C.3.1**: System shall send notifications for:
  - New messages
  - Match recommendations
  - Trip join requests
  - Connection requests
  - Profile views
- **FR-C.3.2**: Users shall be able to control notification preferences
- **FR-C.3.3**: System shall support push notifications on mobile
- **FR-C.3.4**: System shall support email notifications

## Module D: Trip Management `[EM – Deferred]`

### D.1 Trip Creation
- **FR-D.1.1**: Users shall be able to create trips with:
  - Title, description
  - Destination
  - Start/end dates
  - Budget estimate
  - Max participants
  - Itinerary items
- **FR-D.1.2**: System shall validate date ranges (start before end)
- **FR-D.1.3**: Trip creator shall be marked as organizer
- **FR-D.1.4**: System shall generate trip ID and access code

### D.2 Trip Participation
- **FR-D.2.1**: Users shall be able to join trips they're invited to
- **FR-D.2.2**: Trip creators shall approve join requests
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
- **FR-E.2.1**: Administrators shall have access to system analytics dashboard
- **FR-E.2.2**: Administrators shall view user statistics and engagement metrics
- **FR-E.2.3**: Administrators shall monitor system performance metrics

## Implementation status (baseline traceability)

This section provides the formal traceability between the `[R1.0 – Frozen]` requirements and the delivered code, confirming the Waterfall **design = code** principle: every frozen requirement maps to an implementation, and every `[EM – Deferred]` item is correctly absent from the baseline. The TravelMate GitHub repository (Simo-2004/TravelMate) is the Release 1.0 Flutter application with a local-first architecture. The following summary maps the functional requirements above to the current codebase status (implemented / partial / deferred):

- Implemented (client-side in the repository):
  - Saved Items (FR-C.1.x): Implemented via `SavedTripPreviewStore` and `SavedBookmarksData` (see `lib/shared/state/saved_trip_preview_store.dart` and `lib/shared/data/saved_bookmarks_data.dart`).
  - Local Search & Discovery (FR-B.1.x, FR-B.3.x partial): Client-side search and filtering for mock `TripCatalog` and `MateCatalog` are implemented in `lib/features/search/search_results_screen.dart`, `lib/shared/data/trip_catalog.dart`, and `lib/shared/data/mate_catalog.dart`.
  - Personal Profile (FR-A.2.x): `PersonalProfileStore` and the profile UI are implemented (`lib/shared/state/personal_profile_store.dart`, `lib/features/profile/personal_profile_screen.dart`, `lib/shared/models/personal_profile.dart`).
  - Privacy Settings (FR-A.4.x): Implemented via `PrivacySettingsStore` and `PrivacySettingsData` (`lib/shared/state/privacy_settings_store.dart`, `lib/shared/data/privacy_settings_data.dart`).
  - Presentation/UI screens and navigation (core app flows): Implemented (see `lib/features/*` and `lib/features/navigation/navigation_shell.dart`).

- Partial / Mock implementations:
  - Trip data and discovery are supplied as static/mock catalogs (`TripCatalog`, `TripMediaCatalog`) rather than dynamic trip creation or server-side trip persistence.
  - Search ranking is implemented locally using a scoring heuristic; server-side ranking and large-scale search (Elasticsearch) are not present.

- Not implemented / Planned (no code in repository):
  - Authentication (FR-A.1.x) — there is no backend auth or social login implemented in the repository.
  - Messaging & real-time chat (FR-C.2.x) — chat and messaging systems are not implemented.
  - Trip creation and server-side trip lifecycle management (FR-D.1.x, FR-D.2.x) — trips are mock data; create/join flows backed by a server are planned.
  - Administration tools, moderation dashboards, analytics (FR-E.x) — admin backend is not implemented.

This status section is intentionally concise; specific file paths above provide direct references to the corresponding implementations in the repository.
