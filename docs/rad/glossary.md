# 4. Glossary

Definitions of technical and domain-specific terms used in this document.

> **Scope note:** Most terms below describe the envisioned TravelMate platform (Feasibility Study §3.1) and are `[EM – Deferred]`. Terms realised in Release 1.0 are marked `[R1.0]`.

## General Terms

**Auto-Reply** `[R1.0]`: A canned response generated locally by matching a chat message against an ordered list of keyword rules; used by the Release 1.0 simulated chat in place of a real companion's reply.

**Bookmark / Saved Item** `[R1.0]`: A trip or companion profile a user has saved for later reference, identified by a `bookmarkType` ("trip" or "mate") and a `sourceId`, persisted on-device.

**Avatar**: A user-selected image that represents their profile visually across the platform.

**Compatibility Score**: A numerical percentage (0-100%) indicating how well two travelers match based on interests, travel style, and preferences.

**Community Guidelines**: Rules and policies that users must follow to maintain a safe, respectful platform.

**Destination**: A geographic location (city, region, country) that users can visit and select as favorites.

**Discovery/Feed**: A personalized list of recommended travelers or trips based on user preferences and matching algorithms.

**GDPR (General Data Protection Regulation)**: European privacy regulation ensuring user data protection rights.

**Itinerary**: A detailed plan of activities and schedule for a trip, including dates, times, and locations.

**Match**: A potential travel companion identified by the system as compatible based on criteria.

**Onboarding**: The process new users go through to set up their account and complete their profile.

**Privacy Settings**: User-controlled options to determine visibility and information sharing on the platform.

**Profile**: A user's information including personal details, interests, and preferences. `[R1.0]` In Release 1.0, the local `PersonalProfile` holds only first name, last name, description, a preset photo, and free-text tags — no age, location, or gender.

**Saved Items**: Profiles or trips users have bookmarked for later reference (see Bookmark).

**Trip**: A travel itinerary with a destination, description, and tags. `[R1.0]` In Release 1.0, trips are 8 fixed mock entries with no dates, budget, or participants.

**User**: Any person using the TravelMate platform. `[EM – Deferred]` Release 1.0 has no registered accounts — "the user" refers to the single local app user.

**Verification**: Confirmation of user identity through email validation and profile checks.

## User Roles

**Unauthenticated User/Guest**: A person who can view public content but hasn't registered or logged in.

**Administrator**: A staff member with elevated permissions to moderate content, handle reports, and manage platform operations.

**Traveler User**: Authenticated users who can search for companions, create trips, and interact with other travelers.

**Trip Creator**: A traveler who initiates and organizes a specific trip.

**Trip Participant**: A traveler who has joined an existing trip created by another user.

## Technical Terms

**API (Application Programming Interface)**: Set of protocols allowing communication between frontend and backend systems.

**Authentication**: Process of verifying a user's identity, typically through login credentials.

**Authorization**: Process of determining what authenticated users are allowed to do.

**Bcrypt**: A password hashing algorithm used to securely store passwords.

**Backend**: Server-side infrastructure handling business logic and data management.

**Cache/Caching**: Temporary storage of frequently accessed data for faster retrieval.

**Database**: Organized collection of data stored persistently. `[EM – Deferred]` PostgreSQL is the envisioned choice for the future backend; Release 1.0 persists data locally via `SharedPreferences`, not a database.

**Django**: Python web framework used for building the backend API.

**Django REST Framework**: Extension for Django enabling RESTful API development.

**Encryption**: Conversion of data into coded form to prevent unauthorized access.

**Endpoint**: Specific URL path in an API that clients can request.

**Flutter**: Google's mobile app development framework used for iOS and Android apps.

**Frontend**: Client-side user interface and application logic.

**JSON (JavaScript Object Notation)**: Lightweight data format used for API responses.

**JWT (JSON Web Token)**: Token-based authentication method for APIs.

**Load Balancing**: Distribution of traffic across multiple servers for scalability.

**Middleware**: Software layer handling cross-cutting concerns (logging, auth, etc.).

**MVC/MVVM**: Architectural patterns separating concerns (Model, View, Controller/ViewModel).

**ORM (Object-Relational Mapping)**: Technology mapping database records to application objects.

**PostgreSQL**: Open-source relational database management system.

**Python**: Programming language used for backend development.

**Rate Limiting**: Restricting number of requests a user can make in a time period.

**Redis**: In-memory data store used for caching and session management.

**REST (Representational State Transfer)**: Architectural style for API design using HTTP methods.

**Scalability**: System's ability to handle increasing load and users.

**Schema**: Definition of database structure including tables and relationships.

**SSL/TLS**: Security protocols for encrypted communication over networks.

**Token**: Authentication credential issued after successful login, used to access APIs.

**Validation**: Process of checking user input for correctness and safety.

**Webhook**: Automatic callback mechanism triggering external systems on events.

## Business Terms

**Budget Range**: The estimated cost per person for a trip (Budget/Mid-range/Luxury).

**Companion Search**: Process of finding compatible travel partners through the platform.

**Flexibility Level**: How willing a traveler is to adapt plans (Very Flexible/Moderately Flexible/Set Plans).

**Interest Category**: Classification of hobbies and preferences (e.g., Adventure, Culture, Food).

**Language Preference**: Languages a user speaks and prefers for communication.

**Matching Algorithm**: System logic determining compatibility between travelers.

**Moderation**: Process of reviewing and managing user-generated content for compliance.

**Notification**: Automatic message alerting users to important events or messages.

**Report**: User submission flagging inappropriate content or behavior.

**Review/Rating**: User feedback about another traveler's compatibility and experience.

**Saved Profile**: A traveler has bookmarked another user's profile for later reference.

**Search Filter**: Criteria used to narrow down available options (age, interests, location, etc.).

**Travel Companion**: A fellow traveler selected or matched for a journey.

**Travel Style**: The approach to travel reflecting preferences and values (adventurous, relaxed, cultural, etc.).

## Functional Area Terms

### User Management
**Account**: User's registered identity in the system.
**Profile Completion**: Percentage of profile information filled out.
**Session**: Active login period for a user.
**Two-Factor Authentication (2FA)**: Enhanced security requiring secondary verification method.

### Communication
**Group Chat**: Conversation involving trip participants or multiple users.
**Direct Message (DM)**: Private 1-on-1 conversation between two users. `[R1.0]` Release 1.0 offers a simulated, local version per companion — see Auto-Reply.
**Message Status**: Indicator showing if message is sent, delivered, or read.
**Online Status / Simulated Presence** `[R1.0]`: In Release 1.0, a companion's online indicator is not real-time — it is simulated: the companion appears "online" while the local user is active in the chat, and reverts to "offline" after 5 seconds of inactivity, or always "offline" if the user's own *Offline mode* privacy preference is enabled.

### Trip Management
**Access Code**: Unique identifier to join a private trip.
**Itinerary Item**: Individual activity/event in a trip schedule.
**Max Participants**: Maximum number of people allowed to join a trip.
**Trip Status**: Current state of a trip (Draft, Published, Ongoing, Completed, Cancelled).

### Safety & Moderation
**Block**: Action preventing another user from contacting or viewing profile.
**Inappropriate Content**: Material violating community guidelines.
**Moderation Queue**: Administrative system for reviewing flagged content.
**Suspension**: Temporary restriction of account access.
**Warning**: First-step notice to user about guideline violation.
