# 3.4.2 Use Case Model

> **Scope note:** Verified against the repository. `[R1.0 – Frozen]` use cases below are realised by concrete screens; `[EM – Deferred]` use cases depend on the remote backend / real other users and are not implemented.

## Primary Use Cases

### UC1: Register and Create Profile `[EM – Deferred]`
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

> Release 1.0 has no such flow: the app launches directly into Home with a pre-filled default profile (`PersonalProfile.defaultProfile`) that the user may edit at any time (see UC8).

### UC2: Search Trips and Companions `[R1.0 – Frozen]`
**Actors**: App user
**Preconditions**: None
**Main Flow**:
1. User opens the Search tab
2. Toggles between "Trips" and "Mates" mode (`SearchResearchModeStore`)
3. Types a free-text query
4. System returns a term-ranked list of up to 5 matches (`filterMates` / `filterTrips`)
5. User taps a result to open its detail screen
**Postconditions**: Ranked list of matching trips or companions displayed

*Realised by*: `SearchScreen`, `SearchResultsScreen` (`lib/features/search/`).

### UC3: Save a Trip or Companion Profile `[R1.0 – Frozen]`
**Actors**: App user
**Preconditions**: User viewing a trip or companion detail screen
**Main Flow**:
1. User taps the bookmark button
2. System adds the item to the local saved-items list and persists it
3. A confirmation `SnackBar` is displayed
**Postconditions**: Item added to Saved Items, visible on the Saved tab

*Realised by*: `SaveTripButton`, `SavedTripPreviewStore` (`lib/shared/state/saved_trip_preview_store.dart`).

### UC4: Chat with a Companion (Simulated) `[R1.0 – Frozen]`
**Actors**: App user
**Preconditions**: User viewing a companion's profile screen
**Main Flow**:
1. User taps "Chat" to open the conversation for that companion
2. User types and sends a message
3. `ChatStore` matches the message against a keyword rule table and, after a short delay, appends the companion's auto-reply
4. The companion's presence indicator shows "online" while the conversation is active, returning to "offline" after 5 seconds of inactivity
**Postconditions**: Message and auto-reply appended to the conversation, persisted locally

*Realised by*: `ChatScreen`, `ChatStore` (`lib/features/chat/`, `lib/shared/state/chat_store.dart`).

### UC4b: Attach a Saved Trip to a Chat `[R1.0 – Frozen]`
**Actors**: App user
**Preconditions**: User is in a companion's chat and has at least one saved trip
**Main Flow**:
1. User taps the attachment icon to open the trip picker
2. User selects one of their saved trips
3. System sends an invite message carrying the trip attachment
4. `mateLikesTrip` compares the trip's tags with the companion's interest/preferred-trip tags; the companion's auto-reply accepts or politely declines accordingly
**Postconditions**: Invite message and companion's response appended to the conversation

*Realised by*: `ChatTripAttachmentPicker`, `trip_invite.dart` (`lib/shared/widgets/chat_trip_attachment_picker.dart`, `lib/shared/utils/trip_invite.dart`).

### UC4c: Send Message Between Real Users `[EM – Deferred]`
**Actors**: Traveler User (Sender, Receiver)
**Preconditions**: Both users are authenticated and connected via a real backend
**Main Flow**:
1. User opens another (real) user's profile and sends a message
2. Recipient receives a push notification
3. Recipient opens the chat and replies
**Postconditions**: Message delivered over the network, notification sent

### UC5: Create Trip `[EM – Deferred]`
**Actors**: Traveler User (Trip Creator)
**Main Flow**:
1. User enters trip title, destination, dates, budget, and itinerary
2. Sets max participants and publishes the trip
3. System generates a shareable trip link/code
**Postconditions**: Trip created, visible in search results

> Release 1.0's 8 trips are fixed mock data; there is no trip-creation UI.

### UC6: Join Trip `[EM – Deferred]`
**Actors**: Traveler User (Participant)
**Main Flow**:
1. User finds a trip through search and requests to join
2. Trip creator reviews and approves/rejects the request
3. If approved, user is added as a participant and gains access to the group chat
**Postconditions**: User is a trip participant or the request is pending

### UC7: Report User `[EM – Deferred]`
**Actors**: Traveler User, Administrator
**Main Flow**:
1. User selects a reason and submits a report against another user
2. Administrators review the report and take action
**Postconditions**: Report recorded, admin notified

> No Report or Block action exists anywhere in the Release 1.0 UI.

### UC8: Manage Local Profile and Settings `[R1.0 – Frozen]`
**Actors**: App user
**Preconditions**: None
**Main Flow**:
1. User opens the Settings tab
2. Can edit personal profile (name, description, photo, interest/trip tags) via Profile
3. Can toggle privacy preferences via Privacy
4. Can browse FAQ and a (simulated) "Contact support" action via Support
5. Can view saved items via the Saved tab
**Postconditions**: Local profile and preferences updated and persisted

*Realised by*: `SettingsScreen`, `PersonalProfileScreen`, `PrivacySettingsScreen`, `SupportScreen`.

> "Manage blocked users" and "request data export or delete account" do **not** exist in Release 1.0 — there is nothing to block (no other real users) and no account to delete. These remain `[EM – Deferred]`.
