# Dependencies

## Key Packages and Plugins Used in the TravelMate Flutter App

## Project Information

```yaml
name: travelmate
description: A Flutter application for finding travel companions
publish_to: 'none'
version: 1.0.0+1
```

## Core Dependencies

### Flutter SDK
- **flutter**: `>=3.0.0`
  - Core Flutter framework
  - Material Design widgets
  - Hot reload for development

### UI & Graphics

#### 1. **cupertino_icons** (^1.0.8)
```yaml
cupertino_icons: ^1.0.8
```
**Purpose**: Provides iOS-style (Cupertino) icons for the app

**Usage:**
- Used in bottom navigation for iOS-style consistency
- Icon set for Material and Cupertino designs
- Cross-platform icon support

**Key Features:**
- Over 900 built-in icons
- Scalable vector icons
- Platform-aware rendering

#### 2. **flutter_svg** (^2.0.10)
```yaml
flutt_svg: ^2.0.10
```
**Purpose**: Render SVG (Scalable Vector Graphics) files

**Usage in TravelMate:**
- Profile avatar images
- App icons and logos
- UI illustrations and decorations
- Navigation icons

**Example:**
```dart
import 'package:flutter_svg/flutter_svg.dart';

SvgPicture.asset(
  'assets/icons/mate_avatar_1.svg',
  width: 100,
  height: 100,
)
```

**Advantages:**
- Scalable without quality loss
- Smaller file sizes than raster images
- Easy color manipulation
- Animation support

### Data Persistence

#### 3. **shared_preferences** (^2.3.2)
```yaml
shared_preferences: ^2.3.2
```
**Purpose**: Local key-value data storage

**Usage in TravelMate:**
- Store user profile information
- Persist privacy settings
- Save bookmarked trips and mates
- Remember user preferences

**Implementation:**
```dart
class SavedBookmarksData {
  static const String _storageKey = 'saved_bookmarks_v1';
  
  Future<void> save(SavedTripPreview preview) async {
    final prefs = await SharedPreferences.getInstance();
    // Store data as JSON
  }
}
```

**Data Stored:**
- Personal profile (name, bio, interests)
- Saved trips and mates
- Privacy settings
- Search preferences

**Storage Limitations:**
- Suitable for small to medium data
- Not encrypted by default
- Not suitable for sensitive data

## Development Dependencies

### Testing

#### flutter_test
```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
```
**Purpose**: Flutter testing framework

**Features:**
- Widget testing
- Unit testing
- Integration testing
- Test runner

## Dependency Tree Analysis

```
travelmate
├─ flutter (v3.0.0+)
│  ├─ Material Design
│  ├─ Cupertino Widgets
│  └─ Foundation
├─ cupertino_icons (v1.0.8)
│  ├─ Assets (icon font)
│  └─ No sub-dependencies
├─ flutter_svg (v2.0.10)
│  ├─ xml (XML parsing)
│  ├─ flutter_test
│  └─ vector_math (transformations)
└─ shared_preferences (v2.3.2)
   ├─ platform_channel
   ├─ shared_preferences_android
   ├─ shared_preferences_ios
   └─ shared_preferences_linux
```

## Platform-Specific Implementations

### Android
- **SharedPreferences**: Uses Android's SharedPreferences API
- **SVG Rendering**: Software rendering for SVG
- **Icons**: Direct access to font files

### iOS
- **SharedPreferences**: Uses NSUserDefaults for data storage
- **SVG Rendering**: CoreGraphics-based rendering
- **Icons**: iOS font support

### Web
- **SharedPreferences**: LocalStorage in browser
- **SVG**: Native SVG support in DOM
- **Icons**: Web font support

### Linux/Windows
- **SharedPreferences**: File-based storage
- **SVG**: Software rendering
- **Icons**: Font file support

## Version Management Strategy

### Caret (^) Notation
All dependencies use caret notation:
```yaml
package: ^X.Y.Z  # Compatible with X.Y.Z and higher
```

**Example:**
- `^1.0.8` means `>= 1.0.8 && < 2.0.0`
- `^2.0.10` means `>= 2.0.10 && < 3.0.0`

**Benefits:**
- Automatic patch and minor updates
- Breaking changes avoided
- Security updates included

## Dependency Size Impact

| Package | Size | Impact |
|---------|------|--------|
| flutter_svg | ~100KB | Adds SVG rendering capabilities |
| shared_preferences | ~50KB | Local storage wrapper |
| cupertino_icons | ~150KB | Icon font file |

**Total APK Impact**: ~300-400KB (compressed)

## Update Strategy

### Stability
- Only update major versions after testing
- Pin versions in `pubspec.lock` after verification
- Regular security updates for shared_preferences

### Process
1. Check package changelog
2. Run full test suite
3. Test on all target platforms
4. Update `pubspec.yaml`
5. Run `flutter pub get`

## Future Dependency Recommendations

As the app grows, consider adding:

### State Management
- **Provider**: For more complex state management
- **Riverpod**: Type-safe state management
- **GetIt**: Service locator for dependency injection

### Networking
- **Dio**: HTTP client for API calls
- **http**: Lightweight HTTP package

### Database
- **sqflite**: SQLite database for local data
- **hive**: Lightweight key-value storage

### Navigation
- **go_router**: Modern navigation solution
- **auto_route**: Type-safe routing

### Form Handling
- **reactive_forms**: Advanced form management
- **formz**: Easy form validation

### Analytics
- **firebase_analytics**: Analytics tracking
- **firebase_crashlytics**: Crash reporting

### Localization
- **intl**: Internationalization support
- **localization**: Translation management

## Dependency Constraints

### Minimum Requirements
- **Flutter**: >= 3.0.0 (Stable)
- **Dart**: >= 2.18.0
- **Android**: API 21+ (Android 5.0)
- **iOS**: 11.0+

## Pub.dev Package Health

All dependencies have excellent pub.dev ratings:
- ✅ **cupertino_icons**: 100% pub points
- ✅ **flutter_svg**: 130 pub points, actively maintained
- ✅ **shared_preferences**: 140 pub points, Google-maintained

## Security Considerations

### Data Storage
- SharedPreferences stores data unencrypted
- For sensitive data (tokens, passwords), use:
  - **flutter_secure_storage**: Encrypted storage
  - **LocalAuthentication**: Biometric protection

### Dependencies
- Regular `flutter pub outdated` checks
- `flutter pub upgrade` for minor/patch updates
- Security advisories monitoring via pub.dev

## Build Configuration

### pubspec.lock
```
Locked versions ensure reproducible builds
Generated automatically by flutter pub get
Included in version control
```

### Getting Dependencies
```bash
# Get all dependencies
flutter pub get

# Upgrade dependencies
flutter pub upgrade

# Check for outdated packages
flutter pub outdated

# Analyze dependencies
flutter pub deps
```
