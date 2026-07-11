# 3.4 System Models

## 3.4.1 Scenarios

### Scenario 1: Finding a Travel Companion

**Actor**: Sarah (28-year-old solo traveler)
**Context**: Sarah wants to travel to Japan in 3 months but prefers having a companion for safety and shared experiences.
**Trigger**: Sarah opens TravelMate app after registering and completing her profile.

**Flow**:
1. Sarah navigates to the "Search Companions" section
2. She applies filters: interests (Culture, Photography), destination (Japan), age range (25-35), language (English)
3. System displays 12 compatible profiles sorted by match score
4. Sarah views 3 promising profiles in detail
5. She saves 2 profiles and sends a message to the highest-match person
6. After chatting, they plan to meet for coffee to discuss trip details
7. They successfully coordinate a 2-week Japan trip together

**Result**: Sarah found a compatible travel companion and completed her trip with shared experiences.

### Scenario 2: Creating and Joining a Group Trip

**Actor**: Marco (Italian traveler, 35) wants to organize a Mediterranean cruise
**Context**: Marco has already met 2 other travelers (Anna and Tom) through TravelMate and wants to formalize their trip.

**Flow**:
1. Marco creates a trip: "Mediterranean Summer 2024"
   - Destination: Mediterranean region
   - Dates: July 1-15, 2024
   - Budget: €2000-3000 per person
   - Max participants: 6 people
2. System generates trip code and access URL
3. Marco invites Anna and Tom through the app
4. Anna and Tom receive notifications and accept the invitation
5. Marco adds trip details and itinerary via group chat
6. Two more travelers request to join; Marco approves them
7. The 6 travelers coordinate logistics in the group chat

**Result**: Successfully organized group trip with communication infrastructure.

### Scenario 3: Moderation of Inappropriate Behavior

**Actor**: System Administrator
**Context**: A user receives a report about inappropriate messaging from another user.

**Flow**:
1. User reports the offending profile with description
2. System sends notification to admin dashboard
3. Admin reviews the reported user's profile and message history
4. Admin identifies repeated violations of community guidelines
5. Admin sends warning to offending user
6. User ignores warning and continues inappropriate behavior
7. Admin suspends the account for 7 days
8. Offending user is notified of suspension reason

**Result**: Community safety maintained through moderation.

## 3.4.2 Use Case Model

### Primary Use Cases

#### UC1: Register and Create Profile
**Actors**: Unauthenticated User
**Preconditions**: User has email address
**Main Flow**:
1. User opens app and clicks "Sign Up"
2. Enters email and password
3. Receives verification email
4. Clicks verification link
5. Creates profile with name, photo, bio
6. Selects interests and favorite destinations
7. Sets privacy preferences
**Postconditions**: User account created, profile visible on platform

#### UC2: Search and Filter Travelers
**Actors**: Traveler User
**Preconditions**: User is authenticated, has completed profile
**Main Flow**:
1. User navigates to "Find Companions"
2. Applies search filters (age, interests, destination, budget)
3. System displays ranked list of compatible profiles
4. User scrolls through results
5. Clicks on profile to view details
**Postconditions**: List of matching profiles displayed

#### UC3: Save Profile/Trip
**Actors**: Traveler User
**Preconditions**: User viewing a profile or trip
**Main Flow**:
1. User clicks "Save" button on profile/trip
2. System adds item to user's saved list
3. Confirmation message displayed
**Postconditions**: Item added to saved list

#### UC4: Send Message
**Actors**: Traveler User (Sender, Receiver)
**Preconditions**: Both users are authenticated
**Main Flow**:
1. User opens another user's profile
2. Clicks "Send Message" button
3. Types message in chat interface
4. Sends message
5. Recipient receives notification
6. Recipient opens chat and replies
**Postconditions**: Message delivered, notification sent

#### UC5: Create Trip
**Actors**: Traveler User (Trip Creator)
**Preconditions**: User is authenticated
**Main Flow**:
1. User clicks "Create Trip"
2. Enters trip title, destination, dates, budget
3. Adds trip description and itinerary
4. Sets max participants
5. Publishes trip
6. Generates shareable trip link/code
**Postconditions**: Trip created, visible in search results

#### UC6: Join Trip
**Actors**: Traveler User (Participant)
**Preconditions**: Trip exists, user authenticated
**Main Flow**:
1. User finds trip through search
2. Clicks "Request to Join"
3. Trip creator receives notification
4. Creator reviews request and approves/rejects
5. If approved, user added to trip participants
6. User gains access to group chat
**Postconditions**: User is trip participant or request is pending

#### UC7: Report User
**Actors**: Traveler User, Administrator
**Preconditions**: User viewing reported profile/content
**Main Flow**:
1. User clicks "Report" button
2. Selects reason (Inappropriate content, Spam, Harassment, etc.)
3. Writes description
4. Submits report
5. System notifies administrators
6. Admin reviews report and takes action
**Postconditions**: Report recorded, admin notified

#### UC8: Manage User Account
**Actors**: Traveler User
**Preconditions**: User authenticated
**Main Flow**:
1. User opens settings
2. Can update profile info, interests, destinations
3. Can change privacy settings
4. Can view saved items
5. Can manage blocked users
6. Can request data export or delete account
**Postconditions**: Settings updated

## 3.4.3 Object Model (Class Diagram)

```
USER (Entity)
├─ id: UUID (PK)
├─ email: String (Unique, Not Null)
├─ password_hash: String (Encrypted)
├─ first_name: String
├─ last_name: String
├─ date_of_birth: Date
├─ bio: Text
├─ profile_photo_url: String
├─ gender: Enum (M, F, Other, Prefer Not to Say)
├─ location: String
├─ privacy_setting: Enum (Public, Friends Only, Hidden)
├─ is_verified: Boolean
├─ is_active: Boolean
├─ created_at: Timestamp
├─ updated_at: Timestamp
├─ last_login: Timestamp
├─ Relationships:
│  ├─ 1-to-N: Profile Photos
│  ├─ M-to-N: Interests
│  ├─ M-to-N: Favorite Destinations
│  ├─ 1-to-N: Created Trips
│  ├─ M-to-N: Trip Participations
│  ├─ 1-to-N: Sent Messages
│  ├─ 1-to-N: Received Messages
│  ├─ 1-to-N: Saved Items
│  ├─ M-to-N: Blocked Users
│  └─ 1-to-N: Reports

INTEREST (Entity)
├─ id: UUID (PK)
├─ category: String
├─ name: String (e.g., "Adventure", "Culture")
├─ description: Text
└─ Relationships:
   └─ M-to-N: Users

DESTINATION (Entity)
├─ id: UUID (PK)
├─ name: String
├─ country: String
├─ continent: String
├─ latitude: Float
├─ longitude: Float
├─ description: Text
└─ Relationships:
   ├─ M-to-N: Users (Favorites)
   └─ 1-to-N: Trips

TRIP (Entity)
├─ id: UUID (PK)
├─ title: String
├─ description: Text
├─ destination_id: UUID (FK)
├─ creator_id: UUID (FK)
├─ start_date: Date
├─ end_date: Date
├─ budget_min: Decimal
├─ budget_max: Decimal
├─ max_participants: Integer
├─ access_code: String (Unique)
├─ status: Enum (Draft, Published, Cancelled, Completed)
├─ created_at: Timestamp
├─ updated_at: Timestamp
└─ Relationships:
   ├─ Many-to-1: Destination
   ├─ Many-to-1: Creator (User)
   ├─ M-to-N: Participants (Users)
   ├─ 1-to-N: Trip Itinerary Items
   └─ 1-to-N: Group Messages

TRIP_ITINERARY_ITEM (Entity)
├─ id: UUID (PK)
├─ trip_id: UUID (FK)
├─ day: Integer
├─ title: String
├─ description: Text
├─ location: String
├─ start_time: Time
├─ end_time: Time
└─ Relationships:
   └─ Many-to-1: Trip

SAVED_ITEM (Entity)
├─ id: UUID (PK)
├─ user_id: UUID (FK)
├─ target_id: UUID (FK)
├─ target_type: Enum (User, Trip)
├─ created_at: Timestamp
└─ Relationships:
   ├─ Many-to-1: User
   └─ Foreign reference to User or Trip

MESSAGE (Entity)
├─ id: UUID (PK)
├─ sender_id: UUID (FK)
├─ recipient_id: UUID (FK) [null if group]
├─ chat_room_id: UUID (FK) [null if 1-on-1]
├─ text: Text (Max 5000 chars)
├─ is_read: Boolean
├─ created_at: Timestamp
├─ updated_at: Timestamp
├─ deleted_at: Timestamp [soft delete]
└─ Relationships:
   ├─ Many-to-1: Sender (User)
   ├─ Many-to-1: Recipient (User)
   └─ Many-to-1: Chat Room

CHAT_ROOM (Entity)
├─ id: UUID (PK)
├─ type: Enum (OneToOne, Group)
├─ name: String [required for groups]
├─ trip_id: UUID (FK) [null if personal chat]
├─ created_at: Timestamp
└─ Relationships:
   ├─ M-to-N: Participants (Users)
   ├─ 1-to-N: Messages
   └─ Many-to-1: Trip [if group chat]

REPORT (Entity)
├─ id: UUID (PK)
├─ reporter_id: UUID (FK)
├─ reported_user_id: UUID (FK)
├─ reason: String
├─ description: Text
├─ status: Enum (Pending, Under Review, Resolved, Dismissed)
├─ admin_response: Text
├─ created_at: Timestamp
├─ resolved_at: Timestamp
└─ Relationships:
   ├─ Many-to-1: Reporter (User)
   ├─ Many-to-1: Reported User
   └─ Many-to-1: Administrator (User)

NOTIFICATION (Entity)

### 3.4.4 Current codebase mapping

The following model classes are present in the TravelMate repository and map to the conceptual entities above (file paths indicate the concrete implementations):

- `MateProfile` — `lib/shared/models/mate_profile.dart` (represents travel companion profiles used by `MateCatalog`).
- `TripTileData` / `TripTag` — `lib/shared/models/trip_tile_data.dart` and `lib/shared/models/trip_tag.dart` (used by `TripCatalog` and UI tiles).
- `SavedTripPreview` — `lib/shared/models/saved_trip_preview.dart` (bookmark preview model stored in `SavedBookmarksData`).
- `PersonalProfile` / `PersonalTag` — `lib/shared/models/personal_profile.dart` and `lib/shared/models/personal_tag.dart` (user profile model with interests).
- `PrivacySettings` / `PrivacySettingKey` — `lib/shared/models/privacy_settings.dart` (privacy configuration).
- `SearchResearchMode` — `lib/shared/models/search_research_mode.dart` (enum switching search modes between trips and mates).

Notes:
- The repository is currently a mobile-front-end Release 1.0; several backend entities such as `User` with authentication, persistent `Trip` records, and server-side `Message` entities are represented conceptually in this RAD but are not implemented as backend models in the repository.
- Mock catalogs (`MateCatalog`, `TripCatalog`, `TripMediaCatalog`) provide static data used by the UI; they live in `lib/shared/data/`.
├─ id: UUID (PK)
├─ user_id: UUID (FK)
├─ type: String (NewMessage, MatchRecommendation, etc.)
├─ title: String
├─ body: Text
├─ data: JSON
├─ is_read: Boolean
├─ created_at: Timestamp
└─ Relationships:
   └─ Many-to-1: User
```

## 3.4.4 Dynamic Model

### User Authentication Flow
```
1. User submits credentials
   ↓
2. System validates email/password
   ↓
3a. If valid: Generate JWT token
3b. If invalid: Return 401 Unauthorized
   ↓
4. Return token and refresh token
   ↓
5. Client stores tokens locally
   ↓
6. Token expires after 24 hours
7. Client uses refresh token to get new token
```

### Matching Algorithm Flow
```
1. User initiates search with filters
   ↓
2. System queries User database with filter criteria
   ↓
3. For each result, calculate compatibility score:
   - Shared interests: 40%
   - Destination overlap: 30%
   - Travel style: 20%
   - Date availability: 10%
   ↓
4. Exclude blocked/hidden profiles
   ↓
5. Sort by compatibility score descending
   ↓
6. Apply pagination (20 results per page)
   ↓
7. Return ranked results to client
   ↓
8. Client renders results with match percentage
```

### Chat Message Flow
```
1. User sends message in chat
   ↓
2. Client validates message (not empty, < 5000 chars)
   ↓
3. Message encrypted with TLS
   ↓
4. Message sent to backend API
   ↓
5. Backend stores message in database
   ↓
6. Backend sends push notification to recipient
   ↓
7. Recipient receives notification
   ↓
8. If recipient opens chat:
   - Fetch new messages from backend
   - Mark messages as read
   - Update sender's view
```

## 3.4.5 UI-Navigational Paths & Screen Mockups

### Navigation Structure

```
App Root
├─ Authentication Screens
│  ├─ Login
│  ├─ Register
│  ├─ Forgot Password
│  └─ Email Verification
├─ Onboarding (First-time users)
│  ├─ Welcome
│  ├─ Profile Creation
│  ├─ Interests Selection
│  └─ Destination Selection
├─ Main App (Tab Navigation)
│  ├─ Discover Tab
│  │  ├─ Recommended Companions
│  │  ├─ Search Results
│  │  ├─ Saved Profiles
│  │  └─ Saved Trips
│  ├─ Search Tab
│  │  ├─ Search Companions
│  │  ├─ Search Trips
│  │  ├─ Filter Options
│  │  └─ Results List
│  ├─ Chat Tab
│  │  ├─ Conversations List
│  │  ├─ 1-on-1 Chat
│  │  ├─ Group Chat
│  │  └─ Chat Details
│  ├─ Trips Tab
│  │  ├─ My Trips (Creator)
│  │  ├─ Joined Trips (Participant)
│  │  ├─ Trip Details
│  │  ├─ Trip Itinerary
│  │  ├─ Trip Participants
│  │  └─ Create Trip
│  └─ Profile Tab
│     ├─ My Profile
│     ├─ Edit Profile
│     ├─ Settings
│     ├─ Privacy Settings
│     ├─ Blocked Users
│     ├─ Saved Items
│     ├─ Account Management
│     └─ Help & Support
└─ Modal Screens
   ├─ Profile View (other users)
   ├─ Trip Details
   ├─ Report User
   ├─ Block User
   └─ Confirmation Dialogs
```

### Key Screen Descriptions

#### 1. Discover/Recommendation Feed
**Purpose**: Show recommended compatible travelers
**Elements**:
- Profile card with photo, name, age, top interests
- Compatibility score/percentage
- Quick action buttons: Save, Message, Skip, View Profile
- Swipeable card interface (Tinder-like)

#### 2. Search & Filter Screen
**Purpose**: Allow advanced filtering for companions/trips
**Elements**:
- Filter chips: Age, Interests, Destination, Budget, Language
- Filter sliders for numeric ranges
- Multi-select checkboxes for interests
- Search button
- Results count

#### 3. Profile Details Screen
**Purpose**: Display comprehensive user profile
**Elements**:
- Photo gallery (carousel)
- Name, age, location, bio
- Interests tags
- Favorite destinations
- Verification badge
- Action buttons: Save, Message, Block, Report

#### 4. Chat Screen
**Purpose**: 1-on-1 or group messaging
**Elements**:
- Chat header with user info
- Message list (timestamp, sender, content)
- Read receipts
- Typing indicator
- Message input field
- Send button
- Emoji/attachment options

#### 5. Trip Details Screen
**Purpose**: Display trip information
**Elements**:
- Trip title, destination, dates
- Trip creator info
- Budget range
- Participants list (with avatars)
- Itinerary timeline
- Join/Leave button
- Group chat access

#### 6. Settings Screen
**Purpose**: User account and app settings
**Elements**:
- Profile settings
- Notification preferences
- Privacy settings
- Language selection
- Dark/light theme toggle
- About app
- Logout

### Mobile Navigation Pattern
- Bottom tab navigation for main sections
- Hamburger menu for secondary options
- Back button for screen hierarchy
- Floating action button (FAB) for creating trips

### Web Navigation Pattern
- Left sidebar with navigation menu
- Responsive design collapsible on mobile widths
- Breadcrumb navigation
- Search bar in header
