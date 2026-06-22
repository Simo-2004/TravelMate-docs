# Persistent Data Management

## Overview

TravelMate uses a **local-first data management strategy** with SharedPreferences for persistent storage. This section details how data is structured, stored, retrieved, and managed.

## Data Storage Strategy

### Primary Storage Mechanism: SharedPreferences

SharedPreferences is used for all persistent data due to:
- Simple key-value interface
- Native platform support (iOS, Android, Web)
- Automatic serialization
- No external database dependency
- Suitable for small to medium data

### Storage Architecture

```
┌──────────────────────────────────────────────────┐
│        Application Layer (Dart Code)             │
│                                                  │
│  PersonalProfileStore (ValueNotifier<Profile>)   │
│  SavedTripPreviewStore (ValueNotifier<List>)     │
│  PrivacySettingsStore (ValueNotifier<Settings>)  │
└──────────────────────────────────────────────────┘
                    ↑ read/write
┌──────────────────────────────────────────────────┐
│    Data Access Layer (Repositories)              │
│                                                  │
│  PersonalProfileData                             │
│  SavedBookmarksData                              │
│  PrivacySettingsData                             │
└──────────────────────────────────────────────────┘
                    ↑ serialize/deserialize
┌──────────────────────────────────────────────────┐
│  SharedPreferences (Platform Bridge)             │
└──────────────────────────────────────────────────┘
                    ↑ platform-specific
┌──────────────────────────────────────────────────┐
│     Persistent Storage (Device Storage)          │
│                                                  │
│  Android: SharedPreferences XML files            │
│  iOS: NSUserDefaults (plist)                     │
│  Web: Browser LocalStorage                       │
└──────────────────────────────────────────────────┘
```

## Data Models & Storage

### 1. PersonalProfile Data

**Storage Key**: `personal_profile_v1`

**Data Structure** (JSON):
```json
{
  "firstName": "Alessia",
  "lastName": "Rossi",
  "description": "Slow traveler, beach lover...",
  "photoAsset": "assets/icons/mate_avatar_1.svg",
  "age": 28,
  "location": "Rome, Italy",
  "interests": [
    {
      "label": "Adventure",
      "backgroundColor": 4294967295,
      "textColor": 4278190080,
      "borderColor": null
    }
  ]
}
```

**CRUD Operations**:
- **Create**: First app launch with default profile
- **Read**: Load on app startup and profile screen
- **Update**: When user edits profile
- **Delete**: On account deletion

**Repository**: `PersonalProfileData`
```dart
Future<PersonalProfile> read()  // Load from storage
Future<void> save(PersonalProfile profile)  // Persist
```

### 2. SavedTripPreview Data

**Storage Key**: `saved_bookmarks_v1`

**Data Structure** (JSON Array):
```json
[
  {
    "tripName": "Mediterranean Adventure",
    "destinationTitle": "Greece",
    "description": "7-day Greek island hopping...",
    "imageAsset": "assets/images/trips/trip_1.png",
    "itemType": "trip"
  },
  {
    "tripName": "Alessia",
    "destinationTitle": "Mate Profile",
    "description": "Slow traveler, beach lover...",
    "imageAsset": "assets/icons/mate_avatar_1.svg",
    "itemType": "mate"
  }
]
```

**CRUD Operations**:
- **Create**: Add to bookmarks list
- **Read**: Display saved items
- **Update**: Modify bookmark metadata
- **Delete**: Remove from bookmarks

**Repository**: `SavedBookmarksData`
```dart
Future<List<SavedTripPreview>> readAll()  // Get all saved
Future<void> save(SavedTripPreview item)  // Add bookmark
Future<void> delete(String tripName)      // Remove bookmark
```

### 3. PrivacySettings Data

**Storage Key**: `privacy_settings_v1`

**Data Structure** (JSON):
```json
{
  "privateProfile": false,
  "onlyPeopleInRadius": false,
  "offlineMode": false
}
```

**CRUD Operations**:
- **Create**: Initialize with defaults
- **Read**: Load on app startup
- **Update**: When user changes settings
- **Delete**: On account deletion

**Repository**: `PrivacySettingsData`
```dart
Future<PrivacySettings> read()           // Load defaults
Future<void> save(PrivacySettings s)     // Persist settings
```

## Data Serialization

### JSON Serialization Pattern

All models implement `toJson()` and `fromJson()` methods:

```dart
class PersonalProfile {
  Map<String, dynamic> toJson() => {
    'firstName': firstName,
    'lastName': lastName,
    'interests': interests.map((i) => i.toJson()).toList(),
  };
  
  factory PersonalProfile.fromJson(Map<String, dynamic> json) {
    return PersonalProfile(
      firstName: json['firstName'] as String,
      interests: (json['interests'] as List?)
          ?.map((i) => PersonalTag.fromJson(i))
          .toList() ?? [],
    );
  }
}
```

### Serialization Process

```
Dart Object
  ↓ toJson()
Map<String, dynamic>
  ↓ jsonEncode()
String (JSON)
  ↓ setString()
SharedPreferences
```

## Data Validation

### Input Validation Rules

| Field     | Validation       | Rule                     |
|-----------|------------------|--------------------------|
| firstName |`Required, String`| Max 100 chars, non-empty |
| lastName  |`Required, String`| Max 100 chars, non-empty |
| age       | `Integer`        | Range 18-120             |
| bio       |Optional, `String`| Max 500 chars            |
| interests | `List<Tag>`      | Max 20 interests         |
| tripName  | `String`         | Max 200 chars, unique    |

### Validation Implementation

```dart
void validateProfile(PersonalProfile profile) {
  if (profile.firstName.isEmpty || profile.firstName.length > 100) {
    throw ValidationException('Invalid first name');
  }
  if (profile.age < 18 || profile.age > 120) {
    throw ValidationException('Invalid age');
  }
  // ... more validations
}
```

## Data Access Patterns

### Repository Pattern

All data access goes through repository classes:

```dart
class SavedBookmarksData {
  static const String _storageKey = 'saved_bookmarks_v1';
  const SavedBookmarksData();
  
  // Read all saved bookmarks
  Future<List<SavedTripPreview>> readAll() async {
    final prefs = await SharedPreferences.getInstance();
    final savedData = prefs.getStringList(_storageKey) ?? [];
    return savedData
        .map((item) => SavedTripPreview.fromJson(
            jsonDecode(item) as Map<String, dynamic>))
        .toList();
  }
  
  // Save new bookmark
  Future<void> save(SavedTripPreview preview) async {
    final current = await readAll();
    current.add(preview);
    final encoded = current
        .map((item) => jsonEncode(item.toJson()))
        .toList();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_storageKey, encoded);
  }
}
```

## Data Backup & Recovery

### Backup Strategy

**Current Implementation:**
- User settings backed up to SharedPreferences
- Each app start loads settings from storage
- No cloud backup (future feature)

**Recommended Enhancements:**
- Backup to cloud storage (Google Drive, iCloud)
- Automatic periodic backups
- Export/import data feature

### Data Recovery

```dart
Future<void> resetToDefaults() async {
  await PersonalProfileStore.instance
      .updateProfile(PersonalProfile.defaultProfile);
  await SavedTripPreviewStore.instance.clear();
  await PrivacySettingsStore.instance
      .updateSettings(PrivacySettings.defaults);
}
```

## Data Migration

### Version Management

Storage keys include version numbers for migration:

```dart
// Current version
static const String _storageKey = 'saved_bookmarks_v1';

// For future migration to v2
static const String _storageKeyV2 = 'saved_bookmarks_v2';
```

### Migration Strategy

```dart
Future<void> migrateIfNeeded() async {
  final prefs = await SharedPreferences.getInstance();
  final hasV1 = prefs.containsKey('saved_bookmarks_v1');
  final hasV2 = prefs.containsKey('saved_bookmarks_v2');
  
  if (hasV1 && !hasV2) {
    // Migrate from v1 to v2
    final v1Data = prefs.getStringList('saved_bookmarks_v1');
    final v2Data = transformData(v1Data);
    await prefs.setStringList('saved_bookmarks_v2', v2Data);
  }
}
```

## Data Security

### Current Security Measures

1. **No Sensitive Data** - Passwords/tokens not stored locally
2. **User Input Validation** - All inputs validated
3. **Secure Serialization** - JSON encoding prevents injection

### Recommended Enhancements

1. **Encryption** - Encrypt sensitive data with flutter_secure_storage
2. **Authentication** - Local biometric authentication
3. **HTTPS Only** - When backend is integrated
4. **Certificate Pinning** - Prevent MITM attacks

### Implementation for Sensitive Data (Future)

```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const storage = FlutterSecureStorage();

// Store sensitive data
await storage.write(
  key: 'auth_token',
  value: 'secure_token_value',
);

// Retrieve sensitive data
Final token = await storage.read(key: 'auth_token');
```

## Data Lifecycle

### Typical Data Lifecycle

```
1. DATA CREATION
   - User creates profile on first launch
   - Serialized to JSON
   - Stored in SharedPreferences

2. DATA USAGE
   - Loaded on app startup
   - Cached in ValueNotifier stores
   - Used by UI layer

3. DATA MODIFICATION
   - User edits profile/settings
   - Changes reflected in stores
   - Persisted to SharedPreferences

4. DATA DELETION
   - User deletes account or clears data
   - Removed from SharedPreferences
   - Stores reset to defaults
```

## Data Cleanup

### Cleanup Strategy

```dart
// Clear obsolete bookmarks (older than 1 year)
Future<void> cleanupOldBookmarks() async {
  final store = SavedTripPreviewStore.instance;
  final cutoffDate = DateTime.now().subtract(Duration(days: 365));
  
  // Only remove if metadata includes date (future enhancement)
  // For now, manual cleanup only
}

// Full data reset
Future<void> fullReset() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.clear();
}
```

## Performance Optimization

### Query Optimization

```dart
// Efficient search with early exit
bool isSaved(String tripName) {
  return SavedTripPreviewStore.instance.value
      .any((item) => item.tripName == tripName);  // O(n) but fast
}

// Bulk operations
Future<void> addMultipleBookmarks(List<SavedTripPreview> items) async {
  for (final item in items) {
    await SavedTripPreviewStore.instance.addSavedTrip(item);
  }
  // Consider batching for better performance
}
```

### Memory Optimization

- Load data only when needed
- Use lazy loading for large lists
- Cache computed values
- Clear unused references

## Future Database Migration

### SQL Schema (When Migrating to SQLite)

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  age INTEGER,
  location TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interests (
  id INTEGER PRIMARY KEY,
  user_id INTEGER FOREIGN KEY,
  label TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE saved_trips (
  id INTEGER PRIMARY KEY,
  user_id INTEGER FOREIGN KEY,
  trip_name TEXT NOT NULL,
  destination TEXT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```