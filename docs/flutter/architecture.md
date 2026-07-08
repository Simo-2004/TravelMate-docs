# Flutter Architecture

> **Methodological Note:** In accordance with the Waterfall lifecycle, the Implementation (Coding) phase commenced strictly after the approval and freezing of all design specifications (SDD and ODD). The following API documentation and source code represent the exact translation of the previously frozen design into functional software modules, culminating in the *Code Freeze* milestone.

## Overview of the Flutter Application Structure

TravelMate follows a **Clean Architecture** pattern with clear separation of concerns across multiple layers. The application is organized into logical modules within the `lib` directory.

## Directory Structure

```
lib/
├─ core/                           # Core application configuration
│  ├─ constants/                   # App-wide constants
│  │  ├─ app_colors.dart
│  │  ├─ app_sizes.dart
│  │  ├─ app_strings.dart
│  │  └─ app_sizes.dart
│  └─ theme/                     # Theme configuration
│     ├─ app_theme.dart           # Material theme definitions
│     └─ app_text_styles.dart      # Text styling definitions
├─ features/                       # Feature modules (screens & logic)
│  ├─ home/                       # Home feature
│  │  └─ home_screen.dart
│  ├─ search/                     # Search feature
│  │  ├─ search_screen.dart
│  │  ├─ search_results_screen.dart
│  │  └─ mate_details_screen.dart
│  ├─ saved/                      # Saved items feature
│  │  └─ saved_items_screen.dart
│  ├─ profile/                    # User profile feature
│  │  └─ personal_profile_screen.dart
│  ├─ settings/                   # Settings feature
│  │  ├─ settings_screen.dart
│  │  ├─ privacy_settings_screen.dart
│  │  └─ support_screen.dart
│  ├─ schedule/                   # Trip schedule feature
│  │  └─ travel_schedule_screen.dart
│  ├─ navigation/                 # Navigation management
│  │  ├─ navigation_shell.dart     # Bottom nav shell
│  │  ├─ navigation_controller.dart
│  │  └─ navigation_config.dart
└─ shared/                        # Shared resources across features
   ├─ data/                        # Data layer
   │  ├─ mate_catalog.dart         # Mock mate profiles
   │  ├─ trip_catalog.dart         # Mock trip data
   │  ├─ saved_bookmarks_data.dart # Local storage
   │  ├─ personal_profile_data.dart
   │  ├─ privacy_settings_data.dart
   │  └─ trip_media_catalog.dart
   ├─ models/                     # Domain models
   │  ├─ mate_profile.dart
   │  ├─ trip_tile_data.dart
   │  ├─ saved_trip_preview.dart
   │  ├─ personal_profile.dart
   │  ├─ privacy_settings.dart
   │  ├─ search_research_mode.dart
   │  ├─ personal_tag.dart
   │  └─ trip_tag.dart
   ├─ state/                      # State management (stores)
   │  ├─ personal_profile_store.dart
   │  ├─ saved_trip_preview_store.dart
   │  ├─ privacy_settings_store.dart
   │  └─ search_research_mode_store.dart
   ├─ transitions/               # UI transitions
   │  └─ app_transitions.dart
   └─ widgets/                    # Reusable UI components
      ├─ custom_button.dart
      ├─ travel_tag.dart
      ├─ personal_tag_chip.dart
      ├─ mate_card.dart
      ├─ personal_profile_card.dart
      ├─ travel_image_slider.dart
      ├─ save_trip_button.dart
      └─ settings_action_card.dart
├─ main.dart                       # App entry point
└─ test/                           # Test files
```

## Architectural Layers

### 1. **Presentation Layer** (`/features`, `/shared/widgets`)

Responsible for UI rendering and user interactions.

**Components:**
- **Screens**: Full-page widgets (HomeScreen, SearchScreen, etc.)
- **Widgets**: Reusable UI components (CustomButton, TravelTag, etc.)
- **Navigation**: Tab-based navigation with NavigationShell

**Characteristics:**
- Stateless and Stateful widgets for UI building
- Responsive to state changes via ValueListenableBuilder
- Clean separation between UI logic and business logic

### 2. **Business Logic Layer** (`/shared/state`)

Manages application state and business rules.

**Components:**
- **Stores**: ValueNotifier-based reactive state containers
- **Controllers**: Feature-specific coordination logic (e.g., NavigationController)

**Responsibilities:**
- State initialization and persistence
- Business rule enforcement
- Event handling and transformation

### 3. **Data Layer** (`/shared/data`, `/shared/models`)

Handles data persistence and retrieval.

**Components:**
- **Models**: Domain entities (MateProfile, TripTileData, etc.)
- **Data Access**: Repository-like classes (SavedBookmarksData, PersonalProfileData)
- **Catalogs**: Static mock data sources (MateCatalog, TripCatalog)

**Responsibilities:**
- CRUD operations on local storage
- JSON serialization/deserialization
- Data filtering and search

### 4. **Core Layer** (`/core`)

Application-wide configuration and constants.

**Components:**
- **Constants**: Colors, sizes, strings, asset paths
- **Theme**: Material theme definition, text styles

**Responsibilities:**
- Centralized styling and theming
- App-wide string constants (i18n ready)
- Design system constants

## Data Flow

```
UI Layer (Widgets/Screens)
        ↑ ↓ (listen/update)
 State Management (Stores)
        ↑ ↓ (read/write)
 Data Layer (Models/Repositories)
        ↑ ↓ (serialize/deserialize)
 Persistent Storage (SharedPreferences)
```

## Feature-Based Organization

Each feature in `/features` is self-contained with its own screens and logic:

### Home Feature
- Displays recommended trips and mates
- Shows featured content
- Access point to other features

### Search Feature
- Trip and mate search functionality
- Advanced filtering capabilities
- Search results display
- Profile details view

### Saved Feature
- Bookmarked trips and mates
- Persistent saved items
- Quick access to favorites

### Profile Feature
- User profile editing
- Photo management
- Interest/tag selection

### Settings Feature
- App settings and preferences
- Privacy controls
- Help and support

### Navigation Feature
- Bottom tab navigation
- Screen routing
- Navigation state management

## Design Patterns Used

### 1. **MVVM Pattern**
- **Model**: Data classes in `/models`
- **View**: Flutter widgets in `/features`
- **ViewModel**: Stores in `/shared/state`

### 2. **Repository Pattern**
```dart
// Data access abstraction
class SavedBookmarksData {
  Future<List<SavedTripPreview>> readAll()
  Future<void> save(SavedTripPreview item)
  Future<void> delete(String id)
}
```

### 3. **Singleton Pattern**
```dart
// Centralized store access
class PersonalProfileStore {
  static final _instance = PersonalProfileStore._();
  static PersonalProfileStore get instance => _instance;
}
```

### 4. **Factory Pattern**
```dart
// JSON deserialization
factory SavedTripPreview.fromJson(Map<String, dynamic> json) {
  return SavedTripPreview(...);
}
```

### 5. **Observer Pattern (ValueNotifier)**
```dart
// Reactive state management
class SavedTripPreviewStore extends ValueNotifier<List<SavedTripPreview>> {
  // UI automatically rebuilds on value changes
}
```

## Key Files and Their Roles

| File | Purpose |
|------|----------|
| `main.dart` | App initialization, store setup, route configuration |
| `app_colors.dart` | Centralized color palette |
| `app_sizes.dart` | Spacing, sizing, padding constants |
| `app_strings.dart` | UI text strings (i18n ready) |
| `app_theme.dart` | Material Theme and dark/light mode |
| `app_text_styles.dart` | Reusable text styling |
| `navigation_shell.dart` | Bottom navigation container |
| Model files | Data entities with serialization |
| Store files | State management and persistence |
| Data files | Local storage operations |

## Dependency Injection

While not using a formal DI container, the app uses:
- **Service Locators**: Singleton stores accessible globally
- **Constructor Injection**: Passing dependencies to widgets
- **Factory Methods**: Creating instances with dependencies

## Performance Considerations

### Memory Efficiency
- Use of `const` constructors for widgets
- Lazy loading of data
- Efficient list rendering with `ListView.builder`

### Build Optimization
- Minimal rebuilds via ValueListenableBuilder
- Widget composition for reusability
- Const widgets where possible

### Storage Optimization
- Local caching with SharedPreferences
- JSON serialization for persistence
- Efficient data structures

## Testing Architecture

The modular structure supports:
- **Unit Tests**: Test models, stores, data access separately
- **Widget Tests**: Test individual widgets in isolation
- **Integration Tests**: Test complete features end-to-end

## Future Scalability

The architecture supports:
- Adding new features in `/features` without affecting others
- Extending data layer with API integration (replace catalogs)
- Adding state management middleware (logging, analytics)
- Implementing advanced navigation (GoRouter, AutoRoute)
- Backend integration without major refactoring
