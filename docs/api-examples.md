---
outline: deep
---

# API Documentation

Complete API reference for TravelMate internal services and future backend integration.

## Current Architecture (Release 1.0)

TravelMate Release 1.0 operates as a **local-first mobile application** using **ValueNotifier-based reactive architecture** with SharedPreferences for persistence. All services are in-memory with no remote API calls.

### Service Layer Overview

The application is structured around 4 core services:

#### 1. **Search Service** (Dual-Mode Search)

Provides search functionality for both trips and travel companions.

**Interface:**

```dart
class SearchService {
  /// Search trips by query with scoring algorithm
  List<TripTileData> searchTrips(String query);
  
  /// Search mates by query with scoring algorithm  
  List<MateProfile> searchMates(String query);
  
  /// Switch between trips/mates search mode
  void switchSearchMode(SearchResearchMode mode);
}
```

**Scoring Algorithm:**
- Trip search: Prioritizes exact label match (8pts) → destination (7pts) → description (2pts) → tags (3-6pts)
- Mate search: Name match (8pts) → description (3pts) → keywords (4-6pts)
- Results sorted by score descending, then alphabetically

**Current Implementation:**
- `SearchResearchModeStore`: Manages search mode state (trips/mates)
- `TripCatalog.searchTrips()`: Filters 8 pre-defined trips from mock data
- `MateCatalog.searchMates()`: Filters 5+ pre-defined mates from mock data
- Full-text search on: name, description, keywords, tags, interests

#### 2. **Bookmark Service** (Saved Items Management)

Manages user's saved trips and travel companion profiles.

**Interface:**

```dart
class BookmarkService {
  /// Get all saved bookmarks
  Future<List<SavedTripPreview>> getAllBookmarks();
  
  /// Check if item is bookmarked
  bool isBookmarked(SavedTripPreview item);
  
  /// Add to bookmarks
  void addBookmark(SavedTripPreview item);
  
  /// Remove from bookmarks
  void removeBookmark(SavedTripPreview item);
  
  /// Toggle bookmark state
  bool toggleBookmark(SavedTripPreview item);
}
```

**Current Implementation:**
- `SavedTripPreviewStore`: Singleton ValueNotifier managing saved items list
- `SavedBookmarksData`: SharedPreferences persistence layer
- Storage key: `saved_bookmarks_v1` (JSON serialized)
- Supports bookmarking both trips and mate profiles
- Real-time reactivity via ValueListenableBuilder

#### 3. **Profile Service** (User Profile Management)

Handles personal profile data, interests, and travel preferences.

**Interface:**

```dart
class ProfileService {
  /// Initialize/load user profile
  Future<void> initialize();
  
  /// Get current profile
  PersonalProfile getProfile();
  
  /// Update profile information
  void updateProfile(PersonalProfile profile);
  
  /// Update interests/tags
  void updateInterests(List<String> interests);
  
  /// Get profile as AsyncValue
  Stream<PersonalProfile> profileStream();
}
```

**Data Model:**

```dart
class PersonalProfile {
  final String firstName;
  final String lastName;
  final String description;
  final String photoAsset;
  final List<String> interestTags;      // User interests
  final List<String> tripTags;           // Preferred trip types
}
```

**Current Implementation:**
- `PersonalProfileStore`: Singleton ValueNotifier with profile state
- `PersonalProfileData`: SharedPreferences persistence
- Storage key: `personal_profile_v1` (JSON serialized)
- Default profile loaded on app startup
- Profile screen for editing (name, bio, interests, preferences)

#### 4. **Privacy Service** (Privacy Settings)

Manages user privacy preferences and settings.

**Interface:**

```dart
class PrivacyService {
  /// Initialize privacy settings
  Future<void> initialize();
  
  /// Get current privacy settings
  PrivacySettings getSettings();
  
  /// Update all privacy settings
  void updateSettings(PrivacySettings settings);
  
  /// Toggle individual privacy setting
  void toggleSetting(PrivacySettingKey key);
}
```

**Data Model:**

```dart
enum PrivacySettingKey {
  privateProfile,        // Hide profile from search
  onlyPeopleInRadius,    // Show only nearby users
  checkMessages,         // Enable messaging
  offlineMode,          // Offline-only mode
}

class PrivacySettings {
  final bool privateProfile;
  final bool onlyPeopleInRadius;
  final bool checkMessages;
  final bool offlineMode;
}
```

**Current Implementation:**
- `PrivacySettingsStore`: Singleton ValueNotifier with settings state
- `PrivacySettingsData`: SharedPreferences persistence
- Storage key: `privacy_settings_v1` (JSON serialized)
- Settings page with toggle controls
- Future: Backend integration for preference enforcement

### Data Persistence Layer

**Storage Strategy:**

```dart
// SharedPreferences as primary storage
class DataAccessLayer {
  // Catalogs (Read-Only Mock Data)
  - MateCatalog: 5+ pre-defined mate profiles
  - TripCatalog: 8 pre-defined trip packages
  - TripMediaCatalog: Asset path management
  
  // Repositories (Persistent User Data)
  - SavedBookmarksData: Manages saved items
  - PersonalProfileData: Manages user profile
  - PrivacySettingsData: Manages privacy preferences
}
```

**JSON Serialization Pattern:**

```dart
// All models implement toJson/fromJson
class PersonalProfile {
  Map<String, dynamic> toJson() => {
    'firstName': firstName,
    'lastName': lastName,
    'description': description,
    'photoAsset': photoAsset,
    'interestTags': interestTags,
    'tripTags': tripTags,
  };
  
  factory PersonalProfile.fromJson(Map<String, dynamic> json) => 
    PersonalProfile(/* ... */);
}
```

### State Management Pattern

**Reactive Architecture:**

```dart
// ValueNotifier-based singleton stores
class PersonalProfileStore extends ValueNotifier<PersonalProfile> {
  static final instance = PersonalProfileStore._();
  
  Future<void> initialize() async {
    value = await _data.read(); // Load from SharedPreferences
  }
  
  void updateProfile(PersonalProfile profile) {
    value = profile;
    unawaited(_data.write(profile)); // Persist on change
  }
}

// UI consumption via ValueListenableBuilder
ValueListenableBuilder<PersonalProfile>(
  valueListenable: PersonalProfileStore.instance,
  builder: (context, profile, _) {
    return Text(profile.firstName);
  },
)
```

## Backend API (Evolutionary Maintenance)

> The following specification is **not** part of the frozen Release 1.0 baseline. It documents a possible remote backend whose adoption would constitute Evolutionary Maintenance and therefore require a new, complete lifecycle starting from a dedicated Feasibility Study.

### REST API Specification (Planned)

#### Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
```

#### User Management

```
GET    /api/v1/users/profile          # Get current user profile
PUT    /api/v1/users/profile          # Update user profile
GET    /api/v1/users/privacy          # Get privacy settings
PUT    /api/v1/users/privacy          # Update privacy settings
DELETE /api/v1/users/account          # Delete account
```

#### Search & Discovery

```
GET /api/v1/search/mates?query=...&limit=20&offset=0
GET /api/v1/search/trips?query=...&limit=20&offset=0
GET /api/v1/mates/:id                # Get mate profile detail
GET /api/v1/trips/:id                # Get trip detail
```

#### Bookmarks

```
GET    /api/v1/bookmarks              # List all bookmarks
POST   /api/v1/bookmarks              # Add bookmark
DELETE /api/v1/bookmarks/:id          # Remove bookmark
```

#### Messaging (Future)

```
GET    /api/v1/messages               # List conversations
GET    /api/v1/messages/:userId       # Get conversation
POST   /api/v1/messages/:userId       # Send message
DELETE /api/v1/messages/:id           # Delete message
```

### Backend Technology Stack (Proposed)

**Server:** Django REST Framework (Python)  
**Database:** PostgreSQL  
**Cache:** Redis  
**Search:** Elasticsearch  
**Authentication:** JWT with refresh tokens  
**CDN:** CloudFlare or AWS CloudFront  

### Data Models (Backend)

```dart
// Extended User Model
User {
  id: UUID,
  email: String (unique),
  firstName: String,
  lastName: String,
  description: String,
  photoUrl: String,
  interests: List<String>,
  tripPreferences: List<String>,
  privacySettings: PrivacySettings,
  location: GeoLocation?,
  createdAt: DateTime,
  updatedAt: DateTime,
}

// Extended Trip Model
Trip {
  id: UUID,
  name: String,
  destination: String,
  description: String,
  startDate: DateTime,
  endDate: DateTime,
  budget: Range<Float>,
  tags: List<String>,
  photos: List<String>,
  organizer: User,
  participants: List<User>,
  createdAt: DateTime,
}

// Matching Algorithm (Backend)
MatchScore {
  userId: UUID,
  compatibilityScore: Float (0-100),
  commonInterests: List<String>,
  tripOverlap: Float (0-100),
  distanceKm: Float,
}
```

## Evolutionary Maintenance Candidates

> The items below are **not** planned iterations of the current lifecycle. Each of them introduces new functional requirements and, under the Waterfall model, would trigger a separate Evolutionary Maintenance lifecycle beginning with its own Feasibility Study.

### Delivered in Release 1.0 (frozen baseline)
- ✅ Local-first architecture with SharedPreferences
- ✅ Mock data catalogs (MateCatalog, TripCatalog)
- ✅ ValueNotifier state management
- ✅ Basic search with scoring algorithm
- ✅ Bookmark/favorites system

### Candidate evolution: Remote backend
- Backend Django API with PostgreSQL
- User authentication (JWT)
- Server-side search with Elasticsearch
- Cloud storage for profile photos
- Basic messaging system

### Candidate evolution: Advanced features
- Real-time messaging with WebSockets
- Location-based matching algorithm
- Automated matching model
- Trip recommendations
- User reviews & ratings

### Candidate evolution: Scale and distribution
- Mobile app signing & distribution (App Store, Play Store)
- Web platform
- Desktop applications
- Performance optimization (caching, pagination)
- Analytics & monitoring

## Development Guidelines

### Adding New Services

```dart
// 1. Create data model
class MyModel {
  final String id;
  final String name;
  
  Map<String, dynamic> toJson() => {...};
  factory MyModel.fromJson(Map json) => ...;
}

// 2. Create data access layer
class MyDataAccess {
  static const String _key = 'my_data_v1';
  Future<MyModel> read() async { ... }
  Future<void> write(MyModel model) async { ... }
}

// 3. Create store (state management)
class MyStore extends ValueNotifier<MyModel> {
  static final instance = MyStore._();
  Future<void> initialize() async {
    value = await _data.read();
  }
}

// 4. Use in UI
ValueListenableBuilder<MyModel>(
  valueListenable: MyStore.instance,
  builder: (context, model, _) => ...,
)
```

### Testing Services

```dart
// Unit tests for search algorithm
test('Search trips - exact match scores highest', () {
  final results = SearchService.searchTrips('Trip 1');
  expect(results[0].label, 'Trip 1');
});

// Widget tests for UI integration
testWidgets('Bookmark button updates saved items', (tester) async {
  await tester.pumpWidget(const TravelMateApp());
  final beforeCount = SavedTripPreviewStore.instance.value.length;
  await tester.tap(find.byIcon(Icons.bookmark_border));
  await tester.pump();
  expect(SavedTripPreviewStore.instance.value.length, beforeCount + 1);
});
```

## Performance Considerations

- **Search:** O(n) linear scan with multi-term matching; optimizes to O(log n) with backend Elasticsearch
- **Storage:** SharedPreferences < 5MB; migrate to SQLite for >10MB data
- **UI Updates:** ValueNotifier provides efficient incremental updates (only listeners rebuild)
- **Memory:** Mock catalogs cached at startup (~1MB); optimize with lazy loading if needed

## Security Notes

**Current (Release 1.0):** No sensitive data stored; local-only processing  
**Future (Backend):**
- All API calls over HTTPS
- JWT token expiration & refresh strategy
- Password hashing (bcrypt)
- Rate limiting on API endpoints
- Input validation & sanitization
- CORS configuration
- Certificate pinning on mobile

## Troubleshooting

**Search returns empty results:** Verify search terms match stored data; check `MateCatalog.mates` and `TripCatalog.trips`  
**Bookmarks not persisting:** Check SharedPreferences permissions; verify JSON serialization works  
**UI not updating:** Ensure using `ValueListenableBuilder`; check store initialization in `main()`  
**Profile not loading:** Verify `PersonalProfileStore.initialize()` completes before UI renders
