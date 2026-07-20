# 3.4.3 Object Model (Class Diagram)

```
USER (Entity)
├─ id: UUID (PK)
├─ email: String (Unique, Not Null)
├─ password_hash: String (Encrypted)
├─ first_name: String
├─ last_name: String
├─ date_of_birth: Date
├─ bio: Text
├─ profile_photo_url: String
├─ gender: Enum (M, F, Other, Prefer Not to Say)
├─ location: String
├─ privacy_setting: Enum (Public, Friends Only, Hidden)
├─ is_verified: Boolean
├─ is_active: Boolean
├─ created_at: Timestamp
├─ updated_at: Timestamp
├─ last_login: Timestamp
├─ Relationships:
│  ├─ 1-to-N: Profile Photos
│  ├─ M-to-N: Interests
│  ├─ M-to-N: Favorite Destinations
│  ├─ 1-to-N: Created Trips
│  ├─ M-to-N: Trip Participations
│  ├─ 1-to-N: Sent Messages
│  ├─ 1-to-N: Received Messages
│  ├─ 1-to-N: Saved Items
│  ├─ M-to-N: Blocked Users
│  └─ 1-to-N: Reports

INTEREST (Entity)
├─ id: UUID (PK)
├─ category: String
├─ name: String (e.g., "Adventure", "Culture")
├─ description: Text
└─ Relationships:
   └─ M-to-N: Users

DESTINATION (Entity)
├─ id: UUID (PK)
├─ name: String
├─ country: String
├─ continent: String
├─ latitude: Float
├─ longitude: Float
├─ description: Text
└─ Relationships:
   ├─ M-to-N: Users (Favorites)
   └─ 1-to-N: Trips

TRIP (Entity)
├─ id: UUID (PK)
├─ title: String
├─ description: Text
├─ destination_id: UUID (FK)
├─ creator_id: UUID (FK)
├─ start_date: Date
├─ end_date: Date
├─ budget_min: Decimal
├─ budget_max: Decimal
├─ max_participants: Integer
├─ access_code: String (Unique)
├─ status: Enum (Draft, Published, Cancelled, Completed)
├─ created_at: Timestamp
├─ updated_at: Timestamp
└─ Relationships:
   ├─ Many-to-1: Destination
   ├─ Many-to-1: Creator (User)
   ├─ M-to-N: Participants (Users)
   ├─ 1-to-N: Trip Itinerary Items
   └─ 1-to-N: Group Messages

TRIP_ITINERARY_ITEM (Entity)
├─ id: UUID (PK)
├─ trip_id: UUID (FK)
├─ day: Integer
├─ title: String
├─ description: Text
├─ location: String
├─ start_time: Time
├─ end_time: Time
└─ Relationships:
   └─ Many-to-1: Trip

SAVED_ITEM (Entity)
├─ id: UUID (PK)
├─ user_id: UUID (FK)
├─ target_id: UUID (FK)
├─ target_type: Enum (User, Trip)
├─ created_at: Timestamp
└─ Relationships:
   ├─ Many-to-1: User
   └─ Foreign reference to User or Trip

MESSAGE (Entity)
├─ id: UUID (PK)
├─ sender_id: UUID (FK)
├─ recipient_id: UUID (FK) [null if group]
├─ chat_room_id: UUID (FK) [null if 1-on-1]
├─ text: Text (Max 5000 chars)
├─ is_read: Boolean
├─ created_at: Timestamp
├─ updated_at: Timestamp
├─ deleted_at: Timestamp [soft delete]
└─ Relationships:
   ├─ Many-to-1: Sender (User)
   ├─ Many-to-1: Recipient (User)
   └─ Many-to-1: Chat Room

CHAT_ROOM (Entity)
├─ id: UUID (PK)
├─ type: Enum (OneToOne, Group)
├─ name: String [required for groups]
├─ trip_id: UUID (FK) [null if personal chat]
├─ created_at: Timestamp
└─ Relationships:
   ├─ M-to-N: Participants (Users)
   ├─ 1-to-N: Messages
   └─ Many-to-1: Trip [if group chat]

REPORT (Entity)
├─ id: UUID (PK)
├─ reporter_id: UUID (FK)
├─ reported_user_id: UUID (FK)
├─ reason: String
├─ description: Text
├─ status: Enum (Pending, Under Review, Resolved, Dismissed)
├─ admin_response: Text
├─ created_at: Timestamp
├─ resolved_at: Timestamp
└─ Relationships:
   ├─ Many-to-1: Reporter (User)
   ├─ Many-to-1: Reported User
   └─ Many-to-1: Administrator (User)

NOTIFICATION (Entity)
├─ id: UUID (PK)
├─ user_id: UUID (FK)
├─ type: String (NewMessage, MatchRecommendation, etc.)
├─ title: String
├─ body: Text
├─ data: JSON
├─ is_read: Boolean
├─ created_at: Timestamp
└─ Relationships:
   └─ Many-to-1: User
```

> **Scope note:** The object model above describes the **envisioned** data model. Entities that require the remote backend — `USER` authentication fields, server-side `TRIP`, `MESSAGE`, `CHAT_ROOM`, `REPORT`, `NOTIFICATION` — are `[EM – Deferred]`. The `[R1.0 – Frozen]` baseline persists only the on-device models listed in the codebase mapping below.

## Current codebase mapping (Object Model traceability)

The following model classes are present in the TravelMate repository and map to the conceptual entities above (file paths indicate the concrete implementations):

- `MateProfile` — `lib/shared/models/mate_profile.dart` (represents travel companion profiles used by `MateCatalog`).
- `TripTileData` / `TripTag` — `lib/shared/models/trip_tile_data.dart` and `lib/shared/models/trip_tag.dart` (used by `TripCatalog` and UI tiles).
- `SavedTripPreview` — `lib/shared/models/saved_trip_preview.dart` (bookmark preview model stored in `SavedBookmarksData`).
- `PersonalProfile` / `PersonalTag` — `lib/shared/models/personal_profile.dart` and `lib/shared/models/personal_tag.dart` (user profile model with interests).
- `PrivacySettings` / `PrivacySettingKey` — `lib/shared/models/privacy_settings.dart` (privacy configuration).
- `SearchResearchMode` — `lib/shared/models/search_research_mode.dart` (enum switching search modes between trips and mates).

Notes:
- The repository is the mobile-front-end Release 1.0; several backend entities such as `User` with authentication, persistent `Trip` records, and server-side `Message` entities are represented conceptually in this RAD but are `[EM – Deferred]` and not implemented as backend models in the repository.
- Mock catalogs (`MateCatalog`, `TripCatalog`, `TripMediaCatalog`) provide static data used by the UI; they live in `lib/shared/data/`.
