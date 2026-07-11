# Hardware & Software Mapping

## Overview

This document describes how the TravelMate application is mapped to hardware devices, operating systems, and deployment infrastructure.

## Hardware Requirements

### Minimum Device Specifications

#### Mobile Devices

**Android Devices**
- **Minimum OS**: Android 5.0 (API 21)
- **Recommended OS**: Android 8.0+ (API 26+)
- **Minimum RAM**: 2GB
- **Recommended RAM**: 4GB+
- **Storage**: 150MB for app + assets
- **Screen**: 4.5" diagonal minimum
- **Processor**: Dual-core 1.5GHz minimum

**iOS Devices**
- **Minimum OS**: iOS 11.0
- **Recommended OS**: iOS 14.0+
- **Supported Devices**: iPhone 6s and newer
- **Minimum RAM**: 1GB
- **Recommended RAM**: 2GB+
- **Storage**: 100MB for app + assets

#### Desktop Platforms (Future)

**Windows**
- **Minimum OS**: Windows 10
- **Recommended OS**: Windows 11
- **RAM**: 4GB
- **Storage**: 200MB

**macOS**
- **Minimum OS**: macOS 10.13
- **Recommended OS**: macOS 11+
- **RAM**: 4GB
- **Storage**: 200MB

**Linux**
- **Recommended Distros**: Ubuntu 20.04+, Fedora 32+
- **RAM**: 4GB
- **Storage**: 200MB

### Device Features Utilized

| Feature | Usage | Required |
|---------|-------|----------|
| Touch Screen | Main input | Yes |
| GPS/Location | Future feature | No |
| Camera | Profile photos (future) | No |
| Microphone | Voice messaging (future) | No |
| Accelerometer | Gesture detection (future) | No |
| Internet Connection | Backend sync (future) | No (offline mode) |
| LocalStorage | Data persistence | Yes |
| Notifications | Push alerts (future) | No |

## Software Requirements

### Development Environment

**Flutter SDK**
```
Flutter version: >=3.0.0 <4.0.0
Dart version: >=2.18.0 <3.0.0
```

**IDE Support**
- Android Studio 4.0+
- Visual Studio Code 1.50+
- IntelliJ IDEA 2021.1+

**Build Tools**
- Xcode 13.0+ (iOS)
- Android SDK 30+ (Android)
- CMake 3.10+ (Windows/Linux)

### Runtime Requirements

**Android Runtime**
- **ART** (Android Runtime) - Modern Android versions
- **JIT/AOT Compilation** - Dynamic code compilation
- **Dart VM** - Embedded in APK

**iOS Runtime**
- **Objective-C Runtime** - iOS native runtime
- **JIT Compilation** - On-device compilation
- **Dart VM** - Embedded in app bundle

**Web Runtime** (Future)
- **JavaScript Engine** - Chrome V8 compatible
- **WebAssembly** - For Dart compilation
- **Browser APIs** - LocalStorage, etc.

## Platform-Specific Implementations

### Android Implementation

**Architecture**
```
Flutter Framework
    ↑
Flutter Engine (C++)
    ↑
Android Framework
    ↑
Linux Kernel (Android)
```

**Storage Implementation**
```dart
// Android-specific SharedPreferences
// Stores in: /data/data/com.example.travelmate/shared_prefs/
// Format: XML files
// Accessible via: SharedPreferences.getInstance()
```

**File Locations**
- **App Cache**: `/data/data/com.example.travelmate/cache/`
- **App Data**: `/data/data/com.example.travelmate/files/`
- **SharedPreferences**: `/data/data/com.example.travelmate/shared_prefs/`

### iOS Implementation

**Architecture**
```
Flutter Framework
    ↑
Flutter Engine (C++)
    ↑
Foundation Framework
    ↑
Darwin Kernel (iOS)
```

**Storage Implementation**
```dart
// iOS-specific SharedPreferences
// Stores via: NSUserDefaults
// Format: Binary plist files
// Location: ~/Library/Preferences/com.example.travelmate.plist
```

**File Locations**
- **Documents**: `NSDocumentDirectory`
- **Cache**: `NSCachesDirectory`
- **App Support**: `NSApplicationSupportDirectory`

### Web Implementation (Future)

**Architecture**
```
Flutter Web Framework
    ↑
Dart JavaScript Compiler
    ↑
JavaScript/WebAssembly
    ↑
Browser APIs
```

**Storage Implementation**
```javascript
// Browser LocalStorage API
window.localStorage.setItem('saved_bookmarks_v1', jsonData);
const data = window.localStorage.getItem('saved_bookmarks_v1');
```

## Deployment Architecture

### Build & Distribution

```
Source Code (GitHub)
    ↓
Flutter Build Pipeline
    ↓ (Android)
APK/AAB --> Google Play Store
    ↑
    ├ (iOS)
    └ IPA --> Apple App Store
    ↑
    ├ (Web)
    └ JavaScript/WASM --> Web Hosting
```

### Distribution Channels

**Mobile App Stores**
- **Google Play Store**
  - Min API Level: 21
  - Target API Level: 33+
  - App Bundle Format (AAB)
  - Automatic app signing

- **Apple App Store**
  - Min iOS: 11.0
  - Target iOS: 14.0+
  - Notarization required
  - Code signing certificates

**Direct Distribution** (Future)
- APK distribution for Android
- Beta testing programs
- Enterprise deployment

### Build & Verification Pipeline

```
Git Push
    ↓
GitHub Actions
    ↓
+-- Flutter Analyze
+-- Run Tests
+-- Build APK/AAB
+-- Build IPA
+-- Code Signing
+-- Upload to Store
    ↓
App Store Distribution
```

## Network Architecture (Informative, Non-Binding)

> This section pertains to the `[EM – Deferred]` remote backend and is **not** part of the frozen Release 1.0 mapping. See SDD Annex A.

### Communication Protocol

**Current State**: Offline-first, no network required

**Future Architecture**:
```
Flutter Client
    ↑
HTTP/REST API (JSON)
    ↑
Django Backend
    ↑
PostgreSQL Database
```

### API Integration

**Planned HTTP Client**
```dart
import 'package:dio/dio.dart';

final dio = Dio();
final response = await dio.get('/api/mates/');
final mates = List<MateProfile>.from(
  response.data.map((m) => MateProfile.fromJson(m))
);
```

### Network Security (Future)

- **HTTPS/TLS 1.3**: All API communication encrypted
- **Certificate Pinning**: Prevent MITM attacks
- **JWT Authentication**: Token-based auth
- **Request Signing**: HMAC-based request validation

## Device Capability Detection

### Runtime Detection

```dart
import 'package:flutter/foundation.dart';

// Platform detection
if (kIsWeb) {
  // Web-specific code
} else if (defaultTargetPlatform == TargetPlatform.android) {
  // Android-specific code
} else if (defaultTargetPlatform == TargetPlatform.iOS) {
  // iOS-specific code
}

// Check device orientation
MediaQuery.of(context).orientation == Orientation.portrait

// Check screen size
MediaQuery.of(context).size.width > 600  // Tablet
```

### Permission Handling (Future)

```dart
import 'package:permission_handler/permission_handler.dart';

// Request permissions
await Permission.location.request();
await Permission.camera.request();
await Permission.microphone.request();

// Check permission status
if (await Permission.contacts.status.isDenied) {
  // Request permission
}
```

## Performance Mapping

### Device Performance Tiers

**Tier 1: Low-End Devices**
- 2GB RAM, single-core processor
- **Optimization**: List virtualization, image caching
- **Target**: Android 5-7

**Tier 2: Mid-Range Devices**
- 4GB RAM, dual-core 1.5GHz
- **Optimization**: Normal optimizations apply
- **Target**: Android 8-10, iPhone 7+

**Tier 3: High-End Devices**
- 6GB+ RAM, octa-core processor
- **Optimization**: Full feature set enabled
- **Target**: Android 11+, iPhone 12+

### Performance Metrics

| Metric | Target | Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|--------|--------|
| App Start | <2s | <3s | <1.5s | <1s |
| Screen Load | <500ms | <1s | <400ms | <200ms |
| Scroll FPS | 60 | 45-50 | 55-60 | 60 |
| Memory (MB) | <150 | <200 | <150 | <150 |

## Scalability Mapping

### Current Architecture (Release 1.0)
```
Single Device Instance
    ↓
Local SharedPreferences
    ↓
Few MB of data
```

### Future Scalability (Backend Integration)
```
Multiple Device Instances
    ↓
Cloud Sync Service
    ↓
Backend Database
    ↓
Millions of users
```

## Development Machine Mapping

### Recommended Development Environment

**Minimum Specs**
- **CPU**: Intel i5 or equivalent
- **RAM**: 8GB minimum
- **Storage**: 50GB free
- **OS**: macOS 10.13+, Windows 10, or Ubuntu 20.04+

**Recommended Specs**
- **CPU**: Intel i7/i9 or M1/M2
- **RAM**: 16GB+
- **Storage**: SSD with 100GB+ free
- **OS**: Latest stable (macOS 12+, Windows 11, Ubuntu 22.04+)

**Emulators**
- **Android Emulator**: 2GB RAM allocated
- **iOS Simulator**: Xcode built-in
- **Web**: Chrome/Firefox DevTools

## Localization & Region Mapping (Future)

### Supported Regions
- **Europe**: Primary market
- **North America**: Secondary
- **Asia-Pacific**: Future expansion

### Time Zone Handling
```dart
import 'package:intl/intl.dart';

final formatter = DateFormat.yMd().addPattern('Hm');
final formatted = formatter.format(DateTime.now());
```

## Accessibility Mapping

### Device Accessibility Features

**Screen Reader Support**
- iOS: VoiceOver
- Android: TalkBack
- Web: NVDA, JAWS

**Text Scaling**
```dart
MediaQuery.of(context).textScaleFactor
```

**Dark Mode**
```dart
MediaQuery.of(context).platformBrightness == Brightness.dark
```

## Testing Environment Mapping

### Test Device Coverage

**Android**
- Samsung Galaxy A10 (2GB RAM, Android 9)
- Google Pixel 4 (6GB RAM, Android 11)
- Samsung Galaxy S21 (8GB RAM, Android 12)

**iOS**
- iPhone SE (2nd Gen, iOS 15)
- iPhone 11 (iOS 15)
- iPhone 13 (iOS 16)

**Web**
- Chrome 100+
- Firefox 100+
- Safari 15+

## Maintenance & Updates Mapping

### Update Strategy

**Critical Updates** (<1 hour delivery)
- Security patches
- Crash fixes
- Data corruption fixes

**Regular Updates** (Weekly/Monthly)
- Feature additions
- Performance improvements
- Minor bug fixes

**Major Updates** (Quarterly)
- Architecture changes
- API upgrades
- New frameworks

### Rollback Capability
- Version management via git tags
- Previous APK/IPA versions available
- Data migration rollback procedures
