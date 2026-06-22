# Object Interfaces

## Interface Layer Overview

TravelMate's interface layer includes data serialization, state management callbacks, and UI component contracts.

## 1. Data Serialization Interfaces

### 1.1 JSON Serializable Contracts

Domain models implement serialization to support local storage:

```dart
/// Interface contract for models that can be converted to/from JSON
abstract class JsonSerializable<T> {
  /// Convert object to JSON-compatible map
  Map<String, dynamic> toJson();
  
  /// Create object from JSON map
  factory JsonSerializable.fromJson(Map<String, dynamic> json);
}

/// Implementations:
/// - SavedTripPreview
/// - PersonalProfile
/// - PersonalTag
/// - PrivacySettings
```

### 1.2 Searchable Interface

Profiles that support search filtering:

```dart
/// Interface for searchable profiles
abstract class Searchable {
  /// Match this profile with search query
  /// Returns true if query matches any searchable field
  bool matchesQuery(String query);
}

/// Implementations:
/// - MateProfile: Searches name, keywords, interests
```

## 2. State Management Interfaces

### 2.1 Reactive Store Pattern

```dart
/// Base interface for reactive state stores
abstract class ReactiveStore<T> extends ValueNotifier<T> {
  /// Initialize store by loading from persistent storage
  Future<void> initialize();
  
  /// Get current state value
  @override
  T get value;
  
  /// Update state and notify listeners
  @override
  set value(T newValue);
}

/// Concrete implementations:
/// - PersonalProfileStore extends ValueNotifier<PersonalProfile>
/// - SavedTripPreviewStore extends ValueNotifier<List<SavedTripPreview>>
/// - PrivacySettingsStore extends ValueNotifier<PrivacySettings>
```

### 2.2 Data Access Callbacks

```dart
/// Type definition for privacy setting change callback
typedef PrivacySettingChanged = void Function(
  String settingKey,
  bool newValue,
);

/// Usage in PrivacySettingsScreen:
class PrivacySettingsScreen extends StatefulWidget {
  final PrivacySettingChanged? onSettingChanged;
  // ...
}
```

## 3. Data Access Interfaces

### 3.1 Repository Interface Pattern

```dart
/// Generic interface for data persistence operations
abstract class DataRepository<T> {
  /// Read all items from storage
  Future<List<T>> readAll();
  
  /// Read single item by identifier
  Future<T?> readById(String id);
  
  /// Save item to storage
  Future<void> save(T item);
  
  /// Delete item from storage
  Future<void> delete(String id);
  
  /// Clear all items
  Future<void> clear();
}

/// Implementations:
/// - SavedBookmarksData: Manages SavedTripPreview items
/// - PersonalProfileData: Manages PersonalProfile
/// - PrivacySettingsData: Manages PrivacySettings
```

### 3.2 Catalog/Query Interface

```dart
/// Interface for static data catalogs with search capability
abstract class DataCatalog<T extends Searchable> {
  /// Get all items from catalog
  static List<T> getAll();
  
  /// Search catalog by query
  static List<T> search(String query);
  
  /// Filter by multiple criteria
  static List<T> filter(Map<String, dynamic> criteria);
}

/// Implementations:
/// - MateCatalog: Provides mate profile data
/// - TripCatalog: Provides trip tile data
```

## 4. UI Component Interfaces

### 4.1 Widget Contracts

```dart
/// Base interface for reusable UI components
abstract class TravelMateWidget extends Widget {
  /// Build the widget UI
  @override
  Widget build(BuildContext context);
}

/// Custom widget types:
/// - CustomButton: Reusable button with styling
/// - TravelTag: Styled tag/chip component
/// - PersonalTagChip: Interactive tag selection
/// - SaveTripButton: Save/bookmark button with state
/// - MateDetailsPanel: Profile information display
/// - TravelImageSlider: Image carousel component
/// - PersonalProfileCard: User profile card display
```

### 4.2 Widget Builder Interfaces

```dart
/// Interface for components that build dynamic content
abstract class ContentBuilder {
  /// Build content based on data
  Widget buildContent(BuildContext context, dynamic data);
  
  /// Build empty state
  Widget buildEmpty(BuildContext context);
  
  /// Build error state
  Widget buildError(BuildContext context, String error);
  
  /// Build loading state
  Widget buildLoading(BuildContext context);
}

/// Implementations:
/// - TripTileBuilder
/// - MateCardBuilder
/// - SavedItemCardBuilder
```

## 5. Screen/Feature Interfaces

### 5.1 Screen Lifecycle

```dart
/// Interface for screen/feature implementations
abstract class TravelMateScreen extends StatelessWidget {
  /// Screen route name for navigation
  static const String routeName = '';
  
  /// Initialize screen state
  void initializeState(BuildContext context);
  
  /// Build screen UI
  @override
  Widget build(BuildContext context);
}

/// Screen implementations:
class HomeScreen extends TravelMateScreen { }
class SearchScreen extends TravelMateScreen { }
class SavedItemsScreen extends TravelMateScreen { }
class SettingsScreen extends TravelMateScreen { }
class PersonalProfileScreen extends TravelMateScreen { }
class MateDetailsScreen extends TravelMateScreen { }
class PrivacySettingsScreen extends TravelMateScreen { }
class SupportScreen extends TravelMateScreen { }
```

### 5.2 Navigation Interface

```dart
/// Navigation item configuration
class NavigationItem {
  /// Display label
  final String label;
  
  /// Icon asset path
  final String iconAsset;
  
  /// Selected icon asset path
  final String? selectedIconAsset;
  
  /// Associated screen
  final Widget screen;
  
  /// Constructor
  NavigationItem({
    required this.label,
    required this.iconAsset,
    this.selectedIconAsset,
    required this.screen,
  });
}

/// Navigation style configuration
class NavigationStyle {
  /// Background color
  final Color backgroundColor;
  
  /// Active/selected item color
  final Color activeColor;
  
  /// Inactive item color
  final Color inactiveColor;
  
  /// Constructor
  NavigationStyle({
    required this.backgroundColor,
    required this.activeColor,
    required this.inactiveColor,
  });
}
```

## 6. Configuration Interfaces

### 6.1 App Configuration

```dart
/// Theme configuration interface
abstract class AppThemeProvider {
  /// Get light theme
  static ThemeData lightTheme();
  
  /// Get dark theme
  static ThemeData darkTheme();
  
  /// Get color scheme
  static ColorScheme colorScheme();
}

/// Text styles configuration
abstract class AppTextStyleProvider {
  /// Get heading style (large)
  static TextStyle titleLg(AppSizes sizes);
  
  /// Get heading style (medium)
  static TextStyle titleMd(AppSizes sizes);
  
  /// Get body text style
  static TextStyle bodyText(AppSizes sizes);
  
  /// Get caption style
  static TextStyle caption(AppSizes sizes);
}

/// Size/spacing configuration
abstract class AppSizesProvider {
  /// Standard padding
  static const double paddingXs = 4.0;
  static const double paddingSm = 8.0;
  static const double paddingMd = 16.0;
  static const double paddingLg = 24.0;
  static const double paddingXl = 32.0;
  
  /// Border radius
  static const double radiusXs = 4.0;
  static const double radiusSm = 8.0;
  static const double radiusMd = 12.0;
  static const double radiusLg = 16.0;
}
```

## 7. Service Interfaces

### 7.1 Search Service

```dart
/// Interface for search functionality
abstract class SearchService {
  /// Search mates by query
  List<MateProfile> searchMates(String query);
  
  /// Search trips by query
  List<TripTileData> searchTrips(String query);
  
  /// Apply advanced filters
  List<T> applyFilters<T extends Searchable>(
    List<T> items,
    Map<String, dynamic> filters,
  );
}

/// Implementation:
class SearchServiceImpl implements SearchService {
  @override
  List<MateProfile> searchMates(String query) {
    return MateCatalog.search(query);
  }
  
  @override
  List<TripTileData> searchTrips(String query) {
    return TripCatalog.search(query);
  }
}
```

### 7.2 Bookmark Service

```dart
/// Interface for bookmark/save operations
abstract class BookmarkService {
  /// Check if item is bookmarked
  Future<bool> isBookmarked(String itemId);
  
  /// Add bookmark
  Future<void> addBookmark(SavedTripPreview item);
  
  /// Remove bookmark
  Future<void> removeBookmark(String itemId);
  
  /// Get all bookmarks
  Future<List<SavedTripPreview>> getBookmarks();
  
  /// Clear all bookmarks
  Future<void> clearBookmarks();
}

/// Implementation:
class BookmarkServiceImpl implements BookmarkService {
  final SavedTripPreviewStore _store = SavedTripPreviewStore.instance;
  
  @override
  Future<bool> isBookmarked(String itemId) async {
    return _store.value.any((item) => item.tripName == itemId);
  }
  
  @override
  Future<void> addBookmark(SavedTripPreview item) async {
    await _store.addSavedTrip(item);
  }
  
  @override
  Future<void> removeBookmark(String itemId) async {
    await _store.removeSavedTrip(itemId);
  }
}
```

## 8. Notification/Event Interfaces

### 8.1 Notification Callbacks

```dart
/// Callback when user saves/bookmarks an item
typedef ItemSavedCallback = void Function(String itemId, bool isSaved);

/// Callback when search mode changes
typedef SearchModeChangedCallback = void Function(
  SearchResearchMode mode,
);

/// Callback when privacy settings change
typedef PrivacySettingChangedCallback = void Function(
  String settingKey,
  bool newValue,
);

/// Callback when navigation index changes
typedef NavigationIndexChangedCallback = void Function(int newIndex);
```

## 9. Provider Pattern Interfaces

### 9.1 Dependency Injection Setup

```dart
/// Service locator for dependency management
class ServiceLocator {
  static final _instance = ServiceLocator._internal();
  
  factory ServiceLocator() {
    return _instance;
  }
  
  ServiceLocator._internal();
  
  /// Register singleton services
  void registerSingletons() {
    // State stores
    _register<PersonalProfileStore>(
      () => PersonalProfileStore.instance,
    );
    _register<SavedTripPreviewStore>(
      () => SavedTripPreviewStore.instance,
    );
    _register<PrivacySettingsStore>(
      () => PrivacySettingsStore.instance,
    );
    
    // Services
    _register<SearchService>(() => SearchServiceImpl());
    _register<BookmarkService>(() => BookmarkServiceImpl());
  }
  
  /// Get registered service
  T get<T>() => _services[T] as T;
  
  /// Register service
  void _register<T>(T Function() factory) {
    _services[T] = factory();
  }
  
  final Map<Type, dynamic> _services = {};
}
```

## 10. Widget State Management Interfaces

### 10.1 Consumer Widgets

```dart
/// Widget that listens to PersonalProfileStore changes
class PersonalProfileConsumer extends StatelessWidget {
  final Widget Function(BuildContext, PersonalProfile, Widget?) builder;
  
  const PersonalProfileConsumer({required this.builder});
  
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<PersonalProfile>(
      valueListenable: PersonalProfileStore.instance,
      builder: builder,
    );
  }
}

/// Widget that listens to SavedTripPreviewStore changes
class SavedTripsConsumer extends StatelessWidget {
  final Widget Function(
    BuildContext,
    List<SavedTripPreview>,
    Widget?,
  ) builder;
  
  const SavedTripsConsumer({required this.builder});
  
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<List<SavedTripPreview>>(
      valueListenable: SavedTripPreviewStore.instance,
      builder: builder,
    );
  }
}

/// Widget that listens to PrivacySettingsStore changes
class PrivacySettingsConsumer extends StatelessWidget {
  final Widget Function(
    BuildContext,
    PrivacySettings,
    Widget?,
  ) builder;
  
  const PrivacySettingsConsumer({required this.builder});
  
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<PrivacySettings>(
      valueListenable: PrivacySettingsStore.instance,
      builder: builder,
    );
  }
}
```

## API Contracts Summary

| Layer | Component | Responsibility |
|-------|-----------|----------------|
| **Data** | Models | Domain data representation |
| **Data** | Repositories | Persistence operations |
| **Data** | Catalogs | Static data provision |
| **Business** | Stores | State management |
| **Business** | Controllers | Feature coordination |
| **Business** | Services | Business logic |
| **Presentation** | Screens | Feature UIs |
| **Presentation** | Widgets | Reusable components |
| **Presentation** | Consumers | State listening |

## Design Principles Applied

1. **Single Responsibility**: Each class has one reason to change
2. **Dependency Injection**: Services injected, not instantiated
3. **Separation of Concerns**: Clear layer boundaries
4. **DRY (Don't Repeat Yourself)**: Reusable components and services
5. **SOLID Principles**: Open/Closed, Liskov Substitution, Interface Segregation
6. **Immutability**: Data models are immutable where possible
7. **Reactive Patterns**: ValueNotifier for UI reactivity
