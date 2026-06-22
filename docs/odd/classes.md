# ODD - Object Design Document

## Class Diagrams

### Project Overview

TravelMate is a Flutter-based mobile application implementing a layered architecture with clear separation between presentation, business logic, and data layers. The design follows MVVM pattern with reactive state management using `ValueNotifier`.

```
┌─────────────────────────────────────────────────────────┐
│              PRESENTATION LAYER (UI/Screens)                   │
│  HomeScreen | SearchScreen | SavedScreen | SettingsScreen  │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│         BUSINESS LOGIC LAYER (State Management)              │
│  ViewModels | Stores | Controllers | Services             │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│         DATA LAYER (Models & Data Access)                   │
│  Models | Data Classes | Local Storage | Repositories     │
└─────────────────────────────────────────────────────────┘
```

## Data Layer Classes

### 1. MateProfile Class

```dart
/// Represents a travel mate/companion profile
class MateProfile {
  /// Unique identifier for the mate
  final String id;
  
  /// Mate's display name
  final String name;
  
  /// Bio/description about the mate
  final String description;
  
  /// Asset path to profile image (optional)
  final String? profileImageAsset;
  
  /// Search keywords associated with mate (e.g., tags, interests)
  final List<String> keywords;
  
  /// List of interests/hobbies
  final List<String> interests;
  
  /// Constructor
  const MateProfile({
    required this.id,
    required this.name,
    required this.description,
    this.profileImageAsset,
    required this.keywords,
    required this.interests,
  });
  
  /// Match this mate profile with search query
  /// Returns true if any keyword or interest matches the query
  bool matchesQuery(String query) {
    if (query.isEmpty) return true;
    final lowerQuery = query.toLowerCase();
    return keywords.any((k) => k.toLowerCase().contains(lowerQuery)) ||
        interests.any((i) => i.toLowerCase().contains(lowerQuery)) ||
        name.toLowerCase().contains(lowerQuery);
  }
}
```

### 2. TripTileData Class

```dart
/// Data model for displaying trip information in UI tiles
class TripTileData {
  /// Unique trip identifier
  final String tripId;
  
  /// Asset path to trip cover image
  final String asset;
  
  /// Trip display label/title
  final String label;
  
  /// List of schedule images for this trip
  final List<String> scheduleImages;
  
  /// Associated tags/categories for the trip
  final List<TripTag> tripTags;
  
  /// Constructor
  const TripTileData({
    required this.tripId,
    required this.asset,
    required this.label,
    required this.scheduleImages,
    required this.tripTags,
  });
  
  /// Get number of schedule images
  int get scheduleCount => scheduleImages.length;
  
  /// Get tag count
  int get tagCount => tripTags.length;
}
```

### 3. TripTag Class

```dart
/// Represents a tag/category for trips (e.g., "Beach Trip", "Mountain Hiking")
class TripTag {
  /// Tag display label
  final String label;
  
  /// Background color for the tag
  final Color backgroundColor;
  
  /// Text color for the tag
  final Color textColor;
  
  /// Optional border color
  final Color? borderColor;
  
  /// Constructor
  const TripTag({
    required this.label,
    required this.backgroundColor,
    required this.textColor,
    this.borderColor,
  });
}
```

### 4. SavedTripPreview Class

```dart
/// Represents a saved/bookmarked trip preview
class SavedTripPreview {
  /// Trip name/title
  final String tripName;
  
  /// Destination title
  final String destinationTitle;
  
  /// Brief description of the trip
  final String description;
  
  /// Asset path to trip image
  final String imageAsset;
  
  /// Type of saved item ("trip" or "mate")
  final String itemType;
  
  /// Constructor
  const SavedTripPreview({
    required this.tripName,
    required this.destinationTitle,
    required this.description,
    required this.imageAsset,
    required this.itemType,
  });
  
  /// Converts SavedTripPreview to JSON for storage
  Map<String, dynamic> toJson() {
    return {
      'tripName': tripName,
      'destinationTitle': destinationTitle,
      'description': description,
      'imageAsset': imageAsset,
      'itemType': itemType,
    };
  }
  
  /// Creates SavedTripPreview from JSON
  factory SavedTripPreview.fromJson(Map<String, dynamic> json) {
    return SavedTripPreview(
      tripName: json['tripName'] as String,
      destinationTitle: json['destinationTitle'] as String,
      description: json['description'] as String,
      imageAsset: json['imageAsset'] as String,
      itemType: json['itemType'] as String? ?? 'trip',
    );
  }
}
```

### 5. PersonalProfile Class

```dart
/// User's personal profile information
class PersonalProfile {
  /// User's first name
  final String firstName;
  
  /// User's last name
  final String lastName;
  
  /// User's bio/description
  final String description;
  
  /// Asset path to profile photo
  final String photoAsset;
  
  /// User's age
  final int age;
  
  /// User's location
  final String location;
  
  /// User's interests/tags
  final List<PersonalTag> interests;
  
  /// Default profile instance
  static const PersonalProfile defaultProfile = PersonalProfile(
    firstName: 'Alessia',
    lastName: 'Rossi',
    description: 'Slow traveler, beach lover...',
    photoAsset: 'assets/icons/mate_avatar_1.svg',
    age: 28,
    location: 'Rome, Italy',
    interests: [],
  );
  
  /// Constructor
  const PersonalProfile({
    required this.firstName,
    required this.lastName,
    required this.description,
    required this.photoAsset,
    required this.age,
    required this.location,
    this.interests = const [],
  });
  
  /// Get full name
  String get fullName => '$firstName $lastName';
  
  /// Convert to JSON for storage
  Map<String, dynamic> toJson() => {
    'firstName': firstName,
    'lastName': lastName,
    'description': description,
    'photoAsset': photoAsset,
    'age': age,
    'location': location,
    'interests': interests.map((i) => i.toJson()).toList(),
  };
  
  /// Create from JSON
  factory PersonalProfile.fromJson(Map<String, dynamic> json) {
    return PersonalProfile(
      firstName: json['firstName'] as String,
      lastName: json['lastName'] as String,
      description: json['description'] as String,
      photoAsset: json['photoAsset'] as String,
      age: json['age'] as int,
      location: json['location'] as String,
      interests: (json['interests'] as List?)
          ?.map((i) => PersonalTag.fromJson(i))
          .toList() ?? [],
    );
  }
}
```

### 6. PersonalTag Class

```dart
/// Represents a personal interest tag/category
class PersonalTag {
  /// Tag label
  final String label;
  
  /// Background color
  final Color backgroundColor;
  
  /// Text color
  final Color textColor;
  
  /// Optional border color
  final Color? borderColor;
  
  /// Constructor
  const PersonalTag({
    required this.label,
    required this.backgroundColor,
    required this.textColor,
    this.borderColor,
  });
  
  /// Convert to JSON
  Map<String, dynamic> toJson() => {
    'label': label,
    'backgroundColor': backgroundColor.value,
    'textColor': textColor.value,
    'borderColor': borderColor?.value,
  };
  
  /// Create from JSON
  factory PersonalTag.fromJson(Map<String, dynamic> json) {
    return PersonalTag(
      label: json['label'] as String,
      backgroundColor: Color(json['backgroundColor'] as int),
      textColor: Color(json['textColor'] as int),
      borderColor: json['borderColor'] != null
          ? Color(json['borderColor'] as int)
          : null,
    );
  }
}
```

### 7. PrivacySettings Class

```dart
/// User's privacy configuration settings
class PrivacySettings {
  /// Whether profile should be private
  final bool privateProfile;
  
  /// Show profile only to people within radius
  final bool onlyPeopleInRadius;
  
  /// Offline mode setting
  final bool offlineMode;
  
  /// Default privacy settings
  static const PrivacySettings defaults = PrivacySettings(
    privateProfile: false,
    onlyPeopleInRadius: false,
    offlineMode: false,
  );
  
  /// Constructor
  const PrivacySettings({
    required this.privateProfile,
    required this.onlyPeopleInRadius,
    required this.offlineMode,
  });
  
  /// Copy with modifications
  PrivacySettings copyWith({
    bool? privateProfile,
    bool? onlyPeopleInRadius,
    bool? offlineMode,
  }) {
    return PrivacySettings(
      privateProfile: privateProfile ?? this.privateProfile,
      onlyPeopleInRadius: onlyPeopleInRadius ?? this.onlyPeopleInRadius,
      offlineMode: offlineMode ?? this.offlineMode,
    );
  }
  
  /// Convert to JSON
  Map<String, dynamic> toJson() => {
    'privateProfile': privateProfile,
    'onlyPeopleInRadius': onlyPeopleInRadius,
    'offlineMode': offlineMode,
  };
  
  /// Create from JSON
  factory PrivacySettings.fromJson(Map<String, dynamic> json) {
    return PrivacySettings(
      privateProfile: json['privateProfile'] as bool? ?? false,
      onlyPeopleInRadius: json['onlyPeopleInRadius'] as bool? ?? false,
      offlineMode: json['offlineMode'] as bool? ?? false,
    );
  }
}
```

### 8. SearchResearchMode Class

```dart
/// Enumeration for search mode types
enum SearchResearchMode {
  /// Search for trips
  trips('Trips'),
  
  /// Search for travel companions/mates
  mates('Mates');
  
  /// Display label for the mode
  final String label;
  
  /// Constructor
  const SearchResearchMode(this.label);
}
```

## Data Access Layer Classes

### 9. MateCatalog Class

```dart
/// Static catalog of available mate profiles (mock data)
class MateCatalog {
  /// List of predefined mate profiles
  static const List<MateProfile> mates = [
    MateProfile(
      id: 'mate_1',
      name: 'Alessia',
      description: 'Slow traveler, beach lover...',
      profileImageAsset: 'assets/images/mates/mate_1.png',
      keywords: ['beach', 'relaxation', 'italy'],
      interests: ['Swimming', 'Photography', 'Local Food'],
    ),
    // ... more mate profiles
  ];
  
  /// Filter mates by search query
  static List<MateProfile> search(String query) {
    if (query.isEmpty) return mates;
    return mates.where((mate) => mate.matchesQuery(query)).toList();
  }
}
```

### 10. TripCatalog Class

```dart
/// Static catalog of available trips (mock data)
class TripCatalog {
  /// List of predefined trip tags
  static const List<TripTag> _tagSet1 = [
    TripTag(
      label: 'economic-trip',
      backgroundColor: Color(0xFFFFF700),
      textColor: Color(0xFF000000),
    ),
    // ... more tags
  ];
  
  /// List of all available trips
  static const List<TripTileData> trips = [
    TripTileData(
      tripId: 'trip_1',
      asset: 'assets/images/trips/trip_1.png',
      label: 'Mediterranean Adventure',
      scheduleImages: [...],
      tripTags: _tagSet1,
    ),
    // ... more trips
  ];
  
  /// Filter trips by search query
  static List<TripTileData> search(String query) {
    if (query.isEmpty) return trips;
    final lowerQuery = query.toLowerCase();
    return trips
        .where((trip) => trip.label.toLowerCase().contains(lowerQuery))
        .toList();
  }
}
```

### 11. SavedBookmarksData Class

```dart
/// Data access class for saved bookmarks using SharedPreferences
class SavedBookmarksData {
  /// Storage key constant
  static const String _storageKey = 'saved_bookmarks_v1';
  
  /// Constructor
  const SavedBookmarksData();
  
  /// Read all saved bookmarks from local storage
  Future<List<SavedTripPreview>> readAll() async {
    final preferences = await SharedPreferences.getInstance();
    final savedData = preferences.getStringList(_storageKey);
    
    if (savedData == null) return [];
    
    return savedData
        .map((item) => SavedTripPreview.fromJson(
            jsonDecode(item) as Map<String, dynamic>))
        .toList();
  }
  
  /// Save a new bookmark
  Future<void> save(SavedTripPreview preview) async {
    final preferences = await SharedPreferences.getInstance();
    final current = await readAll();
    current.add(preview);
    
    final encoded =
        current.map((item) => jsonEncode(item.toJson())).toList();
    await preferences.setStringList(_storageKey, encoded);
  }
  
  /// Delete a bookmark
  Future<void> delete(String tripName) async {
    final preferences = await SharedPreferences.getInstance();
    final current = await readAll();
    current.removeWhere((item) => item.tripName == tripName);
    
    final encoded =
        current.map((item) => jsonEncode(item.toJson())).toList();
    await preferences.setStringList(_storageKey, encoded);
  }
}
```

### 12. PersonalProfileData Class

```dart
/// Data access class for personal profile using SharedPreferences
class PersonalProfileData {
  /// Storage key constant
  static const String _storageKey = 'personal_profile_v1';
  
  /// Constructor
  const PersonalProfileData();
  
  /// Read personal profile from storage
  Future<PersonalProfile> read() async {
    final preferences = await SharedPreferences.getInstance();
    final profileJson = preferences.getString(_storageKey);
    
    if (profileJson == null) {
      return PersonalProfile.defaultProfile;
    }
    
    return PersonalProfile.fromJson(
        jsonDecode(profileJson) as Map<String, dynamic>);
  }
  
  /// Save personal profile to storage
  Future<void> save(PersonalProfile profile) async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.setString(
        _storageKey, jsonEncode(profile.toJson()));
  }
}
```

### 13. PrivacySettingsData Class

```dart
/// Data access class for privacy settings using SharedPreferences
class PrivacySettingsData {
  /// Storage key constant
  static const String _storageKey = 'privacy_settings_v1';
  
  /// Constructor
  const PrivacySettingsData();
  
  /// Read privacy settings from storage
  Future<PrivacySettings> read() async {
    final preferences = await SharedPreferences.getInstance();
    final settingsJson = preferences.getString(_storageKey);
    
    if (settingsJson == null) {
      return PrivacySettings.defaults;
    }
    
    return PrivacySettings.fromJson(
        jsonDecode(settingsJson) as Map<String, dynamic>);
  }
  
  /// Save privacy settings to storage
  Future<void> save(PrivacySettings settings) async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.setString(
        _storageKey, jsonEncode(settings.toJson()));
  }
}
```

## State Management Layer Classes

### 14. PersonalProfileStore Class

```dart
/// State management for personal profile using ValueNotifier
class PersonalProfileStore extends ValueNotifier<PersonalProfile> {
  final PersonalProfileData _profileData;
  
  /// Private constructor
  PersonalProfileStore._({PersonalProfileData? profileData})
      : _profileData = profileData ?? const PersonalProfileData(),
        super(PersonalProfile.defaultProfile);
  
  /// Singleton instance
  static final PersonalProfileStore _instance =
      PersonalProfileStore._();
  
  /// Get singleton instance
  static PersonalProfileStore get instance => _instance;
  
  /// Initialize by loading from storage
  Future<void> initialize() async {
    value = await _profileData.read();
  }
  
  /// Update personal profile
  Future<void> updateProfile(PersonalProfile profile) async {
    value = profile;
    await _profileData.save(profile);
    notifyListeners();
  }
}
```

### 15. SavedTripPreviewStore Class

```dart
/// State management for saved trip previews using ValueNotifier
class SavedTripPreviewStore extends ValueNotifier<List<SavedTripPreview>> {
  final SavedBookmarksData _bookmarksData;
  
  /// Private constructor
  SavedTripPreviewStore._({SavedBookmarksData? bookmarksData})
      : _bookmarksData = bookmarksData ?? const SavedBookmarksData(),
        super(const []);
  
  /// Singleton instance
  static final SavedTripPreviewStore _instance =
      SavedTripPreviewStore._();
  
  /// Get singleton instance
  static SavedTripPreviewStore get instance => _instance;
  
  /// Initialize by loading from storage
  Future<void> initialize() async {
    value = await _bookmarksData.readAll();
  }
  
  /// Add saved trip preview
  Future<void> addSavedTrip(SavedTripPreview preview) async {
    if (!value.any((item) => item.tripName == preview.tripName)) {
      await _bookmarksData.save(preview);
      value = [...value, preview];
      notifyListeners();
    }
  }
  
  /// Remove saved trip preview
  Future<void> removeSavedTrip(String tripName) async {
    await _bookmarksData.delete(tripName);
    value = value.where((item) => item.tripName != tripName).toList();
    notifyListeners();
  }
  
  /// Check if trip is saved
  bool isSaved(String tripName) {
    return value.any((item) => item.tripName == tripName);
  }
}
```

### 16. PrivacySettingsStore Class

```dart
/// State management for privacy settings using ValueNotifier
class PrivacySettingsStore extends ValueNotifier<PrivacySettings> {
  final PrivacySettingsData _settingsData;
  
  /// Private constructor
  PrivacySettingsStore._({PrivacySettingsData? settingsData})
      : _settingsData = settingsData ?? const PrivacySettingsData(),
        super(PrivacySettings.defaults);
  
  /// Singleton instance
  static final PrivacySettingsStore _instance =
      PrivacySettingsStore._();
  
  /// Get singleton instance
  static PrivacySettingsStore get instance => _instance;
  
  /// Initialize by loading from storage
  Future<void> initialize() async {
    value = await _settingsData.read();
  }
  
  /// Update privacy settings
  Future<void> updateSettings(PrivacySettings settings) async {
    value = settings;
    await _settingsData.save(settings);
    notifyListeners();
  }
  
  /// Toggle specific setting
  Future<void> toggleSetting(String settingKey) async {
    switch (settingKey) {
      case 'privateProfile':
        await updateSettings(
            value.copyWith(privateProfile: !value.privateProfile));
        break;
      case 'onlyPeopleInRadius':
        await updateSettings(
            value.copyWith(onlyPeopleInRadius: !value.onlyPeopleInRadius));
        break;
      case 'offlineMode':
        await updateSettings(
            value.copyWith(offlineMode: !value.offlineMode));
        break;
    }
  }
}
```

### 17. NavigationController Class

```dart
/// Manages navigation state between screens
class NavigationController extends ChangeNotifier {
  int _index = 0;
  
  /// Current navigation index
  int get index => _index;
  
  /// Constructor with optional initial index
  NavigationController({int initialIndex = 0}) : _index = initialIndex;
  
  /// Navigate to specific index
  void navigateTo(int newIndex) {
    if (_index != newIndex) {
      _index = newIndex;
      notifyListeners();
    }
  }
}
```

### 18. SearchResearchModeStore Class

```dart
/// Manages search mode state (trips vs mates)
class SearchResearchModeStore extends ValueNotifier<SearchResearchMode> {
  /// Private constructor
  SearchResearchModeStore._() : super(SearchResearchMode.trips);
  
  /// Singleton instance
  static final SearchResearchModeStore _instance =
      SearchResearchModeStore._();
  
  /// Get singleton instance
  static SearchResearchModeStore get instance => _instance;
  
  /// Switch between search modes
  void switchMode(SearchResearchMode mode) {
    if (value != mode) {
      value = mode;
      notifyListeners();
    }
  }
}
```

## Class Relationship Diagram

```
Data Models
├─ MateProfile
├─ TripTileData
│  └─ depends on TripTag
├─ SavedTripPreview
├─ PersonalProfile
│  └─ contains PersonalTag
├─ PrivacySettings
└─ SearchResearchMode (Enum)

Data Access Layer
├─ MateCatalog
├─ TripCatalog
├─ SavedBookmarksData
├─ PersonalProfileData
└─ PrivacySettingsData

State Management Layer
├─ PersonalProfileStore
├─ SavedTripPreviewStore
├─ PrivacySettingsStore
├─ NavigationController
└─ SearchResearchModeStore

UI Layer (Screens & Widgets)
├─ HomeScreen
├─ SearchScreen
├─ SavedItemsScreen
├─ SettingsScreen
└─ [Many reusable widgets]
```

## Key Design Patterns

### ValueNotifier Pattern
All state stores extend `ValueNotifier<T>` to provide reactive state management:
- Automatic UI updates when state changes
- Efficient rebuilding of dependent widgets
- Clean separation of business logic from UI

### Singleton Pattern
State stores use singleton pattern for app-wide access:
```dart
static final _instance = SomeStore._();
static SomeStore get instance => _instance;
```

### Catalog Pattern
Static catalogs (`MateCatalog`, `TripCatalog`) provide:
- Mock data for development/testing
- Easy data source abstraction
- Separation of business logic from data

### Repository Pattern
Data access classes (`SavedBookmarksData`, etc.) encapsulate:
- Local storage operations (SharedPreferences)
- Data serialization/deserialization
- CRUD operations for domain models
