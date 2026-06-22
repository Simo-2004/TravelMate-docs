# SDD - System Design Document

## Architecture & Subsystems

### Overall System Architecture

TravelMate follows a **3-Tier Client-Server Mobile Architecture** with a clear separation between presentation, business logic, and data layers.

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (Flutter Mobile App)                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │        Presentation Layer (Screens & Widgets)          │  │
│  └─────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────┐  │
│  │     Business Logic Layer (State Management)          │  │
│  └─────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────┐  │
│  │      Data Layer (Models & Repositories)            │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        ↓ (Future Integration)
┌─────────────────────────────────────────────────────────┐
│              SERVER LAYER (Django REST API - Future)                 │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Serializers │  │  Views   │  │ Services │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────────────┘
                        ↓ (HTTP/REST)
┌─────────────────────────────────────────────────────────┐
│               DATABASE LAYER (PostgreSQL)                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Users  │  │  Trips  │  │ Messages │     │
│  └──────┘  └──────┘  └──────┘     │
└─────────────────────────────────────────────────────────┘
```

## Subsystems

### 1. Presentation Subsystem

**Components:**
- **Home Screen** - Main landing page with recommendations
- **Search Subsystem** - Trip and mate search functionality
- **Saved Subsystem** - Bookmarks management
- **Profile Subsystem** - User profile and settings
- **Navigation Shell** - Tab-based navigation controller

**Responsibilities:**
- Render UI components
- Handle user interactions
- Display data from state stores
- Navigate between features

**Technologies:**
- Flutter widgets (StatelessWidget, StatefulWidget)
- Material Design components
- Custom reusable widgets

### 2. Business Logic Subsystem

**Components:**
- **PersonalProfileStore** - User profile state
- **SavedTripPreviewStore** - Bookmarks state
- **PrivacySettingsStore** - Privacy preferences
- **NavigationController** - Navigation state
- **SearchResearchModeStore** - Search mode state

**Responsibilities:**
- Manage application state
- Handle business rules
- Persist state changes
- Notify UI of changes

**Technologies:**
- ValueNotifier (reactive state)
- ChangeNotifier (observable pattern)
- SharedPreferences integration

### 3. Data Subsystem

**Components:**
- **Models** - Domain entities (MateProfile, Trip, User)
- **Repositories** - Data access layer
- **Catalogs** - Static mock data
- **Data Access Objects** - Persistence operations

**Responsibilities:**
- Provide CRUD operations
- Serialize/deserialize data
- Search and filter data
- Manage local storage

**Technologies:**
- Dart classes
- JSON serialization
- SharedPreferences

### 4. Core Subsystem

**Components:**
- **Configuration** - App constants and settings
- **Theme Manager** - Visual styling
- **Transitions** - UI animation transitions
- **Constants** - Colors, sizes, strings

**Responsibilities:**
- Provide app-wide configuration
- Manage theming
- Define design tokens
- Centralize constants

**Technologies:**
- Dart constants
- Material Theme
- Animation classes

## Component Interactions

### Data Flow Example: Saving a Trip

```
1. User taps "Save Trip" button (Presentation)
2. SaveTripButton widget calls onTap callback
3. Screen calls SavedTripPreviewStore.addSavedTrip()
4. Store validates and creates SavedTripPreview
5. Store calls SavedBookmarksData.save()
6. Repository serializes and writes to SharedPreferences
7. Store updates value and notifies listeners
8. ValueListenableBuilder rebuilds UI with updated bookmarks
```

### State Persistence Flow

```
User Action
    ↓
Screen/Widget
    ↓
Store.updateMethod()
    ↓
Value update + notifyListeners()
    ↓
Repository.save()
    ↓
SharedPreferences persist
    ↓
UI automatically rebuilds
```

## Design Principles

### 1. Single Responsibility Principle (SRP)
- Each class has one reason to change
- Stores manage state, not UI
- Repositories handle persistence, not business logic

### 2. Open/Closed Principle (OCP)
- Extensible through inheritance
- New features don't require modification of existing code
- Repository pattern allows swapping implementations

### 3. Liskov Substitution Principle (LSP)
- Consistent behavior across implementations
- Models conform to expected interfaces
- Stores maintain consistent API

### 4. Interface Segregation Principle (ISP)
- Focused interfaces (Searchable, Serializable)
- Widgets accept only needed data
- No unnecessary dependencies

### 5. Dependency Inversion Principle (DIP)
- Depend on abstractions (interfaces)
- High-level modules don't depend on low-level
- Repository pattern inverts dependencies

## Module Dependencies

```
Presentation (Screens/Widgets)
    |
    +-- depends on --> Business Logic (Stores)
    |
    +-- depends on --> Core (Constants, Theme)
    
Business Logic (Stores)
    |
    +-- depends on --> Data Layer (Repositories)
    |
    +-- depends on --> Models
    
Data Layer
    |
    +-- depends on --> Models
    |
    +-- depends on --> SharedPreferences
    
Core
    |
    +-- no dependencies (independent)
```

## Communication Patterns

### 1. One-Way Binding (Reactive)
```dart
Store (data) --> UI (display)
(ValueListenableBuilder watches store changes)
```

### 2. Callback Pattern
```dart
UI (action) --> callback function --> Store (update)
```

### 3. Singleton Pattern
```dart
Any layer --> Store.instance --> Centralized state
```

## Scalability Considerations

### Current Architecture
- **Mobile-first** - Optimized for Flutter
- **Local-first** - No network required for core features
- **Lightweight** - Minimal dependencies

### Future Enhancements
- **Backend Integration** - Add Django REST API layer
- **Real-time Sync** - WebSocket for live updates
- **Offline-first** - Local database (SQLite)
- **Advanced State** - Migration to Provider/BLoC if needed

## Security Considerations

### Data Security
- User data stored locally in SharedPreferences
- Sensitive data would need encryption layer
- No hardcoded secrets or credentials

### Network Security (Future)
- HTTPS for all API communication
- JWT token-based authentication
- Certificate pinning for sensitive endpoints

### Code Security
- Input validation for all user inputs
- No SQL injection risk (no direct SQL)
- Secure parsing of JSON data

## Performance Considerations

### Memory Optimization
- Reusable widgets (const constructors)
- Lazy loading where applicable
- Efficient list rendering

### UI Responsiveness
- Async operations for I/O
- No blocking main thread
- Debouncing for rapid user actions

### Storage Efficiency
- JSON serialization for compact storage
- Efficient data structures
- Cleanup of obsolete data

## Deployment Architecture

### Platform Support
- **iOS** (11.0+)
- **Android** (API 21+)
- **Web** (Future)
- **Desktop** (Future)

### Build Pipeline
```
Source Code
    ↓
Flutter Build
    ↓
Native Compilation (iOS/Android)
    ↓
App Distribution (App Store/Play Store)
```

### Version Management
- Semantic versioning (MAJOR.MINOR.PATCH)
- Feature branches for development
- Release builds for distribution
