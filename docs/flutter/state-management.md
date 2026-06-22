# State Management

## Details about the State Management Pattern Used

## Overview

TravelMate uses a **lightweight, reactive state management approach** based on **ValueNotifier** and **ChangeNotifier** from the Flutter framework. This provides a balance between simplicity and scalability without requiring external packages.

## Architecture Pattern: MVVM + Stores

```
UI Layer (Widgets)
    ↑
    ↓ (ValueListenableBuilder)
    └─ State Stores (ValueNotifier<T>)
            ↑
            ↓ (read/write)
            └─ Data Layer (Repositories)
                    ↑
                    ↓ (serialize/deserialize)
                    └─ Local Storage (SharedPreferences)
```

## Core State Management Components

### 1. ValueNotifier Pattern

**Definition**: A `ChangeNotifier` that holds a single value and notifies listeners when the value changes.

```dart
class PersonalProfileStore extends ValueNotifier<PersonalProfile> {
  PersonalProfileStore._() : super(PersonalProfile.defaultProfile);
  
  static final _instance = PersonalProfileStore._();
  static PersonalProfileStore get instance => _instance;
  
  Future<void> updateProfile(PersonalProfile profile) async {
    value = profile;  // Triggers UI rebuild
    notifyListeners();
  }
}
```

**Why ValueNotifier?**
- Built into Flutter framework (no external dependency)
- Minimal overhead and memory footprint
- Efficient rebuild notifications
- Simple API for beginners

### 2. Singleton Pattern for Stores

All state stores are singletons to provide app-wide access:

```dart
// Access from anywhere in the app
PersonalProfileStore.instance.value;  // Read state
PersonalProfileStore.instance.updateProfile(newProfile);  // Update state
```

**Benefits:**
- Single source of truth
- Predictable state access
- Easy initialization
- Memory efficient

## Store Architecture

### PersonalProfileStore

```dart
class PersonalProfileStore extends ValueNotifier<PersonalProfile> {
  final PersonalProfileData _profileData;
  
  PersonalProfileStore._({PersonalProfileData? profileData})
      : _profileData = profileData ?? const PersonalProfileData(),
        super(PersonalProfile.defaultProfile);
  
  static final PersonalProfileStore _instance = PersonalProfileStore._();
  static PersonalProfileStore get instance => _instance;
  
  /// Load profile from persistent storage
  Future<void> initialize() async {
    value = await _profileData.read();
  }
  
  /// Update and persist profile
  Future<void> updateProfile(PersonalProfile profile) async {
    value = profile;
    await _profileData.save(profile);
    notifyListeners();
  }
}
```

**Responsibilities:**
- Hold current profile state
- Persist changes to storage
- Notify listeners of changes
- Initialize on app startup

### SavedTripPreviewStore

```dart
class SavedTripPreviewStore extends ValueNotifier<List<SavedTripPreview>> {
  final SavedBookmarksData _bookmarksData;
  
  // ...
  
  Future<void> addSavedTrip(SavedTripPreview preview) async {
    if (!value.any((item) => item.tripName == preview.tripName)) {
      await _bookmarksData.save(preview);
      value = [...value, preview];  // Create new list for immutability
      notifyListeners();
    }
  }
  
  Future<void> removeSavedTrip(String tripName) async {
    await _bookmarksData.delete(tripName);
    value = value.where((item) => item.tripName != tripName).toList();
    notifyListeners();
  }
  
  bool isSaved(String tripName) => value.any((item) => item.tripName == tripName);
}
```

**Responsibilities:**
- Maintain list of saved trips
- Add/remove bookmarks
- Persist to storage
- Query saved status

### PrivacySettingsStore

```dart
class PrivacySettingsStore extends ValueNotifier<PrivacySettings> {
  // ...
  
  Future<void> toggleSetting(String settingKey) async {
    switch (settingKey) {
      case 'privateProfile':
        await updateSettings(
            value.copyWith(privateProfile: !value.privateProfile));
        break;
      // ... other settings
    }
  }
}
```

**Responsibilities:**
- Manage user privacy preferences
- Toggle individual settings
- Persist settings changes

### SearchResearchModeStore

```dart
class SearchResearchModeStore extends ValueNotifier<SearchResearchMode> {
  SearchResearchModeStore._() : super(SearchResearchMode.trips);
  
  void switchMode(SearchResearchMode mode) {
    if (value != mode) {
      value = mode;
      notifyListeners();
    }
  }
}
```

**Responsibilities:**
- Track search mode (trips vs mates)
- Switch between modes
- Notify UI of changes

## UI Integration with Stores

### ValueListenableBuilder

Used to rebuild UI when store value changes:

```dart
class PersonalProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<PersonalProfile>(
      valueListenable: PersonalProfileStore.instance,
      builder: (context, profile, child) {
        return Column(
          children: [
            Text(profile.firstName),
            Text(profile.lastName),
            // UI automatically rebuilds when profile changes
          ],
        );
      },
    );
  }
}
```

**Benefits:**
- Efficient rebuilds (only listen to changes)
- Fine-grained reactivity
- Clean separation of concerns
- Minimal performance impact

### Direct Store Access (Read-Only)

For non-reactive reads:

```dart
// Get current value without listening
PersonalProfile profile = PersonalProfileStore.instance.value;
```

## State Initialization Flow

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize all stores from persistent storage
  await Future.wait([
    SavedTripPreviewStore.instance.initialize(),
    PersonalProfileStore.instance.initialize(),
    PrivacySettingsStore.instance.initialize(),
  ]);
  
  runApp(const TravelMateApp());
}
```

**Initialization Steps:**
1. Ensure Flutter binding is initialized
2. Load all stored data from SharedPreferences
3. Populate stores with persisted values
4. App is ready to use

## Data Persistence Flow

```
UI Widget
    |
    v (calls method)
 Store.updateProfile(newProfile)
    |
    +-- Updates: value = newProfile
    +-- Persists: _profileData.save(newProfile)
    +-- Notifies: notifyListeners()
    |
    v
UI automatically rebuilds via ValueListenableBuilder
```

## State Management Best Practices

### 1. Immutable State Updates

```dart
// ❌ WRONG: Mutating existing list
value.add(newItem);
notifyListeners();

// ✅ CORRECT: Creating new list
value = [...value, newItem];
notifyListeners();
```

### 2. Single Source of Truth

```dart
// Store is the single source of truth
// All profile data flows through PersonalProfileStore
// UI reads from store, not cached locally
```

### 3. Persistence on Change

```dart
// Always persist when state changes
Future<void> updateProfile(PersonalProfile profile) async {
  value = profile;
  await _profileData.save(profile);  // Persist immediately
  notifyListeners();
}
```

### 4. Error Handling

```dart
Future<void> safeUpdate(PersonalProfile profile) async {
  try {
    await updateProfile(profile);
  } catch (e) {
    // Handle error, revert state if needed
    print('Failed to update profile: $e');
  }
}
```

## Comparison with Other Approaches

### ValueNotifier vs BLoC

| Aspect | ValueNotifier | BLoC |
|--------|---------------|------|
| Complexity | Low | High |
| Boilerplate | Minimal | Significant |
| Learning Curve | Easy | Steep |
| Scalability | Good for small-medium | Excellent for large |
| Package Dependency | None | Requires flutter_bloc |
| Stream Support | Limited | Native |

**TravelMate's Choice**: ValueNotifier is ideal for the current app size and complexity.

### ValueNotifier vs Provider

| Aspect | ValueNotifier | Provider |
|--------|---------------|----------|
| Setup | Minimal | More configuration |
| Performance | Good | Optimized |
| Scope Control | Global (singleton) | Fine-grained |
| Dependency Injection | Manual | Automatic |
| Testing | Easy | Medium |

**TravelMate's Choice**: ValueNotifier simplifies the codebase without external dependencies.

## Testing State Management

### Unit Test Example

```dart
test('PersonalProfileStore updates profile', () async {
  final store = PersonalProfileStore.instance;
  final newProfile = PersonalProfile(
    firstName: 'John',
    lastName: 'Doe',
    // ...
  );
  
  await store.updateProfile(newProfile);
  
  expect(store.value, equals(newProfile));
});
```

### Widget Test Example

```dart
testWidgets('UI rebuilds when store changes', (WidgetTester tester) async {
  await tester.pumpWidget(const TravelMateApp());
  
  final store = PersonalProfileStore.instance;
  final newProfile = /* ... */;
  
  await store.updateProfile(newProfile);
  await tester.pump();  // Rebuild
  
  expect(find.text('John'), findsOneWidget);
});
```

## Performance Considerations

### Memory Usage
- **Per Store**: ~1-5KB for metadata + value size
- **Total Stores**: ~50-100KB
- **Listeners**: No overhead per listener

### Rebuild Efficiency
- Only affected ValueListenableBuilders rebuild
- Efficient change notifications
- No unnecessary rebuilds

### Storage I/O
- Async operations prevent UI blocking
- SharedPreferences is fast for small data
- JSON serialization is efficient

## Future Improvements

### 1. Add ChangeNotifier for Complex State

For features requiring multiple related values:

```dart
class ComplexStateNotifier extends ChangeNotifier {
  String _userName = '';
  int _tripCount = 0;
  
  String get userName => _userName;
  int get tripCount => _tripCount;
  
  void updateUserName(String name) {
    _userName = name;
    notifyListeners();
  }
}
```

### 2. Implement Middleware

For logging, analytics, and debugging:

```dart
class LoggingMiddleware {
  void onStateChange(String storeName, dynamic newValue) {
    print('[$storeName] State changed: $newValue');
  }
}
```

### 3. Add Redux-like Actions

For explicit action handling:

```dart
abstract class Action {}
class UpdateProfileAction extends Action {
  final PersonalProfile profile;
  UpdateProfileAction(this.profile);
}
```

## Recommended Reading

- [ValueNotifier Documentation](https://api.flutter.dev/flutter/foundation/ValueNotifier-class.html)
- [ChangeNotifier Best Practices](https://flutter.dev/docs/development/data-and-backend/state-mgmt/options)
- [Provider Pattern](https://pub.dev/packages/provider)
- [BLoC Pattern](https://bloclibrary.dev/)
