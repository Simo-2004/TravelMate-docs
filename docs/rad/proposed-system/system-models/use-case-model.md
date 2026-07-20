# 3.4.2 Use Case Model

> **Scope note:** These scenarios and use cases depict the **envisioned** platform end-to-end. Within the **Release 1.0** baseline, only the on-device flows are realised — **UC2 (local search)**, **UC3 (save profile/trip)**, and the local portions of **UC8 (manage account/settings)** are `[R1.0 – Frozen]`. Use cases that depend on the remote backend — **UC1 (register), UC4 (send message), UC5/UC6 (create/join trip), UC7 (report user)** — are `[EM – Deferred]`.

## Primary Use Cases

### UC1: Register and Create Profile
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

### UC2: Search and Filter Travelers
**Actors**: Traveler User
**Preconditions**: User is authenticated, has completed profile
**Main Flow**:
1. User navigates to "Find Companions"
2. Applies search filters (age, interests, destination, budget)
3. System displays ranked list of compatible profiles
4. User scrolls through results
5. Clicks on profile to view details
**Postconditions**: List of matching profiles displayed

### UC3: Save Profile/Trip
**Actors**: Traveler User
**Preconditions**: User viewing a profile or trip
**Main Flow**:
1. User clicks "Save" button on profile/trip
2. System adds item to user's saved list
3. Confirmation message displayed
**Postconditions**: Item added to saved list

### UC4: Send Message
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

### UC5: Create Trip
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

### UC6: Join Trip
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

### UC7: Report User
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

### UC8: Manage User Account
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
