# 3.4.5 UI-Navigational Paths & Screen Mockups

## Release 1.0 Navigation Structure `[R1.0 – Frozen]`

Verified against `lib/main.dart`, `lib/features/auth/`, and `lib/features/navigation/navigation_config.dart`. The app launches on a **login screen**; the 4-tab shell is reachable only after authentication.

```
App Root (TravelMateApp)
├─ Login Screen  ← entry point
│  ├─ username / password fields → authenticate
│  └─ → Create Account Screen
│     └─ identity + tags + gallery photo + credentials → creates account,
│        then opens the shell (clearing the auth stack)
└─ NavigationShell (bottom tab bar, 4 tabs) — after successful login
   ├─ Home Tab
   │  ├─ Recommended trips carousel
   │  ├─ Viewed recently carousel
   │  └─ → Travel Schedule (on trip tap)
   ├─ Search Tab
   │  ├─ Trips / Mates mode switch
   │  ├─ Inline ranked results (top 5)
   │  ├─ → Search Results screen (on query submit)
   │  ├─ → Travel Schedule (on trip tap)
   │  └─ → Mate Details (on mate tap)
   ├─ Saved Tab
   │  ├─ Unified list of saved trips + mates
   │  ├─ → Travel Schedule (on saved trip tap)
   │  └─ → Mate Details (on saved mate tap)
   └─ Settings Tab
      ├─ Profile summary preview
      ├─ → Personal Profile screen (edit)
      ├─ → Privacy Settings screen
      ├─ → Support screen (FAQ + contact)
      └─ → Exit (signs out, returns to the Login Screen)

Pushed from Mate Details:
└─ → Chat screen (simulated conversation)
   └─ → Trip attachment picker (from saved trips)
      └─ → Travel Schedule (on attached-trip tap in a message bubble)
```

### Screens not present in Release 1.0

The following screens are part of the envisioned platform (Feasibility Study §3.1) and are `[EM – Deferred]`: Forgot Password, Email Verification, multi-step Onboarding (Welcome / Interests / Destination Selection), a dedicated Chat tab with a conversations list and group chat, a Trips tab (My Trips / Joined Trips / Create Trip / Trip Participants), Blocked Users, Account Management (data export/deletion), and modal Report User / Block User dialogs.

## Key Screen Descriptions (Release 1.0)

### 0. Login & Create Account Screens `[R1.0 – Frozen]`
**Purpose**: Authenticate the user, or register a new local account
**Elements (Login)**: Brand header, username field, obscured password field, "Enter" button, link to account creation, inline error feedback on failure
**Elements (Create Account)**: Name/surname/description fields, circular photo preview with gallery upload action, editable interest and trip tag groups, username/password fields, per-field validation errors, submit button
*Realised by*: `LoginScreen`, `CreateAccountScreen` (`lib/features/auth/`)

### 1. Home Screen `[R1.0 – Frozen]`
**Purpose**: Landing tab showing recommended and recently viewed trips from the SQLite catalog
**Elements**: Read-only search bar (tap to jump to Search tab), two horizontal trip carousels
*Realised by*: `HomeScreen` (`lib/features/home/home_screen.dart`)

### 2. Search / Search Results Screens `[R1.0 – Frozen]`
**Purpose**: Free-text search across the trip catalog or the companion catalog
**Elements**: Search bar, Trips/Mates mode switch button, vertical ranked result list, empty-state message
*Realised by*: `SearchScreen`, `SearchResultsScreen`, `SearchModeView` (`lib/features/search/`)

### 3. Mate Details Screen `[R1.0 – Frozen]`
**Purpose**: Display a companion profile from the in-code catalog
**Elements**: Name, description, interest tags, preferred-trip tags, bookmark button, "Chat" button
*Realised by*: `MateDetailsScreen` (`lib/features/search/mate_details_screen.dart`)

### 4. Travel Schedule Screen `[R1.0 – Frozen]`
**Purpose**: Display a trip's detail
**Elements**: Image gallery/slider, bookmark button, tag chips, destination title and description
*Realised by*: `TravelScheduleScreen` (`lib/features/schedule/travel_schedule_screen.dart`)

### 5. Chat Screen `[R1.0 – Frozen]`
**Purpose**: Simulated 1-on-1 conversation with a companion
**Elements**: Companion name and simulated online/offline indicator, message list, trip-attachment picker, text input bar, clear-history action
*Realised by*: `ChatScreen` (`lib/features/chat/chat_screen.dart`)

### 6. Saved Items Screen `[R1.0 – Frozen]`
**Purpose**: Unified list of bookmarked trips and companions
**Elements**: Preview cards with image, name, description, and tags; tapping opens the resolved trip or companion screen
*Realised by*: `SavedItemsScreen` (`lib/features/saved/saved_items_screen.dart`)

### 7. Settings, Personal Profile, Privacy Settings, Support Screens `[R1.0 – Frozen]`
**Purpose**: Local profile editing, privacy toggles, FAQ, (simulated) contact support, and sign-out
**Elements**: Editable text fields, profile photo picker (device gallery plus bundled preset avatars), editable tag chips, boolean toggle switches, expandable FAQ cards, Exit action returning to the login screen
*Realised by*: `SettingsScreen`, `PersonalProfileScreen`, `PrivacySettingsScreen`, `SupportScreen` (`lib/features/settings/`, `lib/features/profile/`)

## Envisioned Screens (not implemented) `[EM – Deferred]`

### Discover/Recommendation Feed (swipeable, compatibility-scored)
**Purpose**: Show recommended compatible travelers with a Tinder-like swipeable card interface and a compatibility percentage — no swipeable card interface or compatibility score exists in Release 1.0; the closest analogue is the Home carousels and ranked Search results.

### Advanced Filter Screen
**Purpose**: Filter chips and sliders for age, interests, destination, budget, language — Release 1.0 offers only a single free-text query field.

### Trip Creation, Trip Participants, Report User, Block User
Require the `[EM – Deferred]` backend and account system described in Module D and E of [3.2 Functional Requirements](../functional).
