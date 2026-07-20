# 3.4.3 Object Model

## Release 1.0 Object Model (Class Diagram) `[R1.0 – Frozen]`

The diagram below reflects the **actual** Dart classes in the repository, field-for-field, verified directly against the source. This is the object model that binds the Implementation phase.

```
MateProfile (lib/shared/models/mate_profile.dart)
├─ id: String
├─ name: String
├─ description: String
├─ profileImageAsset: String?
├─ keywords: List<String>
├─ interests: List<String>
└─ preferredTrips: List<String>

TripTileData (lib/shared/models/trip_tile_data.dart)
├─ tripId: String
├─ asset: String
├─ label: String
├─ scheduleImages: List<String>
├─ tags: List<TripTag>
├─ destinationTitle: String
└─ description: String

TripTag (lib/shared/models/trip_tag.dart)
├─ label: String
├─ backgroundColor: Color
├─ textColor: Color
└─ borderColor: Color?

PersonalProfile (lib/shared/models/personal_profile.dart)
├─ firstName: String
├─ lastName: String
├─ description: String
├─ photoAsset: String
├─ interestTags: List<String>
└─ tripTags: List<String>
   (no age, no location, no gender — these fields do not exist)

PrivacySettings (lib/shared/models/privacy_settings.dart)
├─ privateProfile: bool
├─ onlyPeopleInRadius: bool
├─ checkMessages: bool
└─ offlineMode: bool

SavedTripPreview (lib/shared/models/saved_trip_preview.dart)
├─ tripName: String
├─ destinationTitle: String
├─ description: String
├─ coverImage: String
├─ tags: List<TripTag>
├─ bookmarkType: String   ("trip" | "mate", see SavedBookmarkType)
└─ sourceId: String        (id of the originating Trip or Mate)

ChatMessage (lib/shared/models/chat_message.dart)
├─ id: String
├─ text: String
├─ isFromMe: bool
├─ sentAt: DateTime
└─ attachedTripId: String?  (set when the message carries a trip invite)

SearchResearchMode (lib/shared/models/search_research_mode.dart)
└─ enum { trips, mates }
```

### Relationships (Release 1.0)

- `TripTileData` **has** a list of `TripTag`
- `SavedTripPreview` **references** either a `TripTileData` or a `MateProfile` via `sourceId` + `bookmarkType`
- `PersonalProfile` is a singleton, held by `PersonalProfileStore`
- `ChatMessage` instances are grouped per companion (`MateProfile.id`) inside `ChatStore`; an `attachedTripId`, when present, resolves back to a `TripTileData` via `TripCatalog.findTripById`

## Envisioned Conceptual Entity Model `[EM – Deferred]`

The entities below describe the envisioned backend data model (Feasibility Study §3.1). They are **not** implemented as backend models in the repository — Release 1.0 has no database and no server.

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
└─ Relationships:
   ├─ 1-to-N: Profile Photos
   ├─ M-to-N: Interests
   ├─ M-to-N: Favorite Destinations
   ├─ 1-to-N: Created Trips
   ├─ M-to-N: Trip Participations
   ├─ 1-to-N: Sent Messages
   ├─ 1-to-N: Received Messages
   ├─ 1-to-N: Saved Items
   ├─ M-to-N: Blocked Users
   └─ 1-to-N: Reports

INTEREST (Entity)
├─ id: UUID (PK)
├─ category: String
├─ name: String
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

MESSAGE (Entity)
├─ id: UUID (PK)
├─ sender_id: UUID (FK)
├─ recipient_id: UUID (FK) [null if group]
├─ chat_room_id: UUID (FK) [null if 1-on-1]
├─ text: Text
├─ is_read: Boolean
├─ created_at: Timestamp
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

## Codebase Mapping and Traceability

- `MateProfile` — `lib/shared/models/mate_profile.dart`, populated by `MateCatalog`
- `TripTileData` / `TripTag` — `lib/shared/models/trip_tile_data.dart`, `lib/shared/models/trip_tag.dart`, populated by `TripCatalog` / `TripTagCatalog`
- `SavedTripPreview` — `lib/shared/models/saved_trip_preview.dart`, persisted by `SavedBookmarksData`
- `PersonalProfile` — `lib/shared/models/personal_profile.dart`, persisted by `PersonalProfileData`
- `PrivacySettings` / `PrivacySettingKey` — `lib/shared/models/privacy_settings.dart`, persisted by `PrivacySettingsData`
- `SearchResearchMode` — `lib/shared/models/search_research_mode.dart`, a bare 2-value enum (`trips`, `mates`) with no associated label field
- `ChatMessage` — `lib/shared/models/chat_message.dart`, persisted per-companion by `ChatHistoryData`, orchestrated by `ChatStore`

**Corrections from the previous edition of this document:**
- There is **no `PersonalTag` class** in the repository — `PersonalProfile.interestTags` / `tripTags` are plain `List<String>`, not a list of colored tag objects
- `SavedTripPreview`'s image field is `coverImage`, not `imageAsset`; its type discriminator is `bookmarkType`, not `itemType`; it also carries `tags` and `sourceId`, both previously undocumented
- `TripTileData`'s tag field is `tags`, not `tripTags`; it has no `scheduleCount`/`tagCount` getters
- `MateProfile` has a `preferredTrips` field that was previously undocumented
- `ChatMessage` and the entire chat subsystem were entirely absent from earlier editions of this RAD despite being implemented
