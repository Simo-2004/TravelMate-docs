# Persistent Data Management

> **Binding scope:** This document designs the **Release 1.0** on-device persistence. It realises the domain concepts specified in [RAD §3.4.3](/rad/proposed-system/system-models/object-model) — the analysis model deliberately says nothing about storage mechanisms, which are decided here.

> ⚠️ **Alignment status:** the sections from *Data Models & Storage* onwards still describe the earlier `SharedPreferences`-only design and have **not** yet been revised for the SQLite migration. Only the sections above that point are current.

## Overview

TravelMate uses a **local-first data management strategy** built on an embedded **SQLite** database, with field-level encryption applied to sensitive content. A residual amount of low-sensitivity data is still held in `SharedPreferences`.

## Data Storage Strategy

### Primary Storage Mechanism: SQLite

All principal data is persisted in a single SQLite database file, `travelmate.db` (schema version 4), opened from the application's private documents directory. SQLite was chosen because it provides:

- A relational schema with indexes, enabling conversations to be retrieved without scanning every message
- Transactional, single-file storage that is trivially backed up with the app sandbox
- Idempotent schema creation (`CREATE TABLE IF NOT EXISTS`), making both fresh installs and upgrades safe
- No server or network dependency, consistent with the local-first constraint

### Database Schema

Columns marked 🔒 hold AES-256-GCM base64 payloads rather than plain text.

```sql
personal_profile            -- single row, pinned to id = 1
├─ id                INTEGER PRIMARY KEY
├─ first_name        TEXT NOT NULL   🔒
├─ last_name         TEXT NOT NULL   🔒
├─ description       TEXT NOT NULL   🔒
├─ photo_path        TEXT NOT NULL   🔒   (file path, never image bytes)
├─ interest_tags     TEXT NOT NULL   🔒   (JSON array, encrypted)
└─ trip_tags         TEXT NOT NULL   🔒   (JSON array, encrypted)

account                     -- single row: one local user
├─ id                  INTEGER PRIMARY KEY
├─ username            TEXT NOT NULL   🔒
├─ password_salt       TEXT NOT NULL        (base64 random salt)
├─ password_hash       TEXT NOT NULL        (base64 PBKDF2 hash — one-way)
└─ password_iterations INTEGER NOT NULL

trips                       -- public read-only catalog, plain text by design
├─ id                INTEGER PRIMARY KEY AUTOINCREMENT
├─ trip_id           TEXT NOT NULL
├─ collection        TEXT NOT NULL        ('trips' | 'recents')
├─ position          INTEGER NOT NULL     (preserves catalog order)
├─ asset             TEXT NOT NULL
├─ label             TEXT NOT NULL
├─ schedule_images   TEXT NOT NULL        (JSON array)
├─ tags              TEXT NOT NULL        (JSON array)
├─ destination_title TEXT NOT NULL
└─ description       TEXT NOT NULL

chat_messages               -- indexed by mate_id
├─ id                INTEGER PRIMARY KEY AUTOINCREMENT
├─ mate_id           TEXT NOT NULL        (plain: needed for querying)
├─ message_id        TEXT NOT NULL
├─ text              TEXT NOT NULL   🔒   (conversation content)
├─ is_from_me        INTEGER NOT NULL     (plain: structural)
├─ sent_at           TEXT NOT NULL        (plain ISO-8601: needed for ordering)
└─ attached_trip_id  TEXT                 (nullable trip reference)

INDEX idx_chat_messages_mate_id ON chat_messages (mate_id)
```

**Encryption rationale.** Identifiers, flags, and timestamps remain in plain text because they are structural — required to query and order rows — and are not sensitive in isolation. Only readable user content is encrypted. Trip rows are public catalog content and are not encrypted at all.

### Storage Architecture

```
Screens / Stores  (PersonalProfileStore, TripStore, ChatStore, AuthService)
        ↓
Data sources      (SqliteProfileData, SqliteChatData)  — migration from legacy store
        ↓
Repositories      (ProfileRepository, TripRepository, AccountRepository, ChatRepository)
        ↓            ← owns mapping + encryption; unit-tested against fake DAOs
DAO interfaces    (ProfileDao, TripDao, AccountDao, ChatDao)
        ↓            ← sqflite adapters; thin, excluded from coverage
DatabaseHelper    (single shared sqflite connection)

Security          AesCipher ← ProfileKeyProvider ← SecureKeyStore (OS keystore)
                  PasswordHasher (PBKDF2, independent of the AES key)
```

The layering exists so that all mapping and cryptographic logic sits in the repositories, which depend only on DAO *interfaces* and can therefore be unit-tested against in-memory fakes; the `sqflite` adapters remain thin enough to be excluded from coverage.

### Residual SharedPreferences usage

Saved bookmarks and privacy preferences are still written as plain JSON to `SharedPreferences`. The legacy profile and chat stores are retained solely as one-time migration sources into the database.

### Cryptographic design

| Concern | Mechanism |
|---------|-----------|
| Field encryption | AES-256-GCM, fresh 12-byte nonce per value, payload stored as `base64(nonce ‖ ciphertext+tag)` |
| Tamper detection | GCM authentication tag — decryption fails on alteration or wrong key |
| Key generation | 256-bit key from a cryptographically secure RNG, created on first use |
| Key storage | OS keystore/keychain, never in the database or source |
| Password storage | PBKDF2-HMAC-SHA256, 100,000 iterations, 32-byte key, 16-byte random salt |
| Password verification | Constant-time comparison of derived hashes |

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

## Annex — Server-Side Schema (Informative, Non-Binding)

> The on-device schema is **not** here — it is specified in *Data Storage Strategy* above and is part of the frozen Release 1.0 design. This annex concerns only the **multi-user, server-side** database of the envisioned platform, which would be introduced by a future Evolutionary Maintenance lifecycle.

A networked release would replace the single-row `account` and `personal_profile` tables with a multi-tenant schema in which every row is scoped to a user identifier, and would move the conversation tables server-side so that messages are exchanged between two real accounts rather than generated locally. The conceptual entities such a schema would have to represent (`USER`, `TRIP`, `MESSAGE`, `CHAT_ROOM`, `REPORT`, `NOTIFICATION`) are catalogued in the deferred portion of [RAD §3.4.3](/rad/proposed-system/system-models/object-model).

Designing that schema is outside the scope of this document, since the corresponding requirements are `[EM – Deferred]` and therefore not frozen.