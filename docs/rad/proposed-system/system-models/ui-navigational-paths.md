# 3.4.5 UI-Navigational Paths & Screen Mockups

## Navigation Structure

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

## Key Screen Descriptions

### 1. Discover/Recommendation Feed
**Purpose**: Show recommended compatible travelers
**Elements**:
- Profile card with photo, name, age, top interests
- Compatibility score/percentage
- Quick action buttons: Save, Message, Skip, View Profile
- Swipeable card interface (Tinder-like)

### 2. Search & Filter Screen
**Purpose**: Allow advanced filtering for companions/trips
**Elements**:
- Filter chips: Age, Interests, Destination, Budget, Language
- Filter sliders for numeric ranges
- Multi-select checkboxes for interests
