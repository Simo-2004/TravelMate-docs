# 3.4.1 Scenarios

## Scenario 1: Browsing and Saving a Trip `[R1.0 – Frozen]`

**Actor**: A user of the Release 1.0 app
**Context**: The user wants to explore travel ideas offline, with no account and no network connection.

**Flow**:
1. The user opens the Home tab and browses the "Recommended trips" and "Viewed recently" carousels, backed by the mock `TripCatalog`
2. The user taps a trip tile and opens its Travel Schedule screen, seeing its image gallery, tags, and description
3. The user taps the bookmark button; the trip is added to Saved Items and persisted locally
4. The user opens the Saved tab and confirms the trip appears there

**Result**: A trip is discovered and bookmarked entirely on-device, with no server round-trip.

## Scenario 2: Searching for a Companion and Starting a Simulated Chat `[R1.0 – Frozen]`

**Actor**: A user of the Release 1.0 app
**Context**: The user wants to see how the companion-matching and communication experience would feel.

**Flow**:
1. The user opens the Search tab, switches to "Mates" mode, and types a keyword (e.g. an interest)
2. The term-based ranking (`filterMates`) returns matching mock companion profiles, ranked by relevance
3. The user opens a companion's profile and taps "Chat"
4. The user sends a message; after a short simulated delay, the companion's `ChatStore` auto-reply engine replies with a canned response matched to a keyword in the message
5. The user attaches a previously saved trip to the conversation as an invite; the companion accepts or declines automatically depending on whether the trip's tags overlap with the companion's own tags

**Result**: The user experiences the full discovery-to-coordination flow with a simulated companion, validating the UX ahead of any real backend or real other users.

## Scenario 3: Finding a Travel Companion (Envisioned) `[EM – Deferred]`

**Actor**: Sarah (28-year-old solo traveler)
**Context**: Sarah wants to travel to Japan in 3 months but prefers having a companion for safety and shared experiences, in the platform's envisioned end-state.

**Flow**:
1. Sarah registers, completes her profile, and navigates to "Search Companions"
2. She applies filters: interests, destination (Japan), age range, language
3. The compatibility-matching backend returns ranked, real companion profiles
4. Sarah messages the highest-match person over real-time chat
5. They coordinate and complete a trip together

**Result**: Sarah found a compatible, real travel companion — this scenario describes the envisioned end-state, not Release 1.0.

## Scenario 4: Creating and Joining a Group Trip (Envisioned) `[EM – Deferred]`

**Actor**: Marco (Italian traveler, 35) wants to organize a Mediterranean cruise
**Context**: Marco has already met 2 other travelers through TravelMate and wants to formalize their trip.

**Flow**:
1. Marco creates a trip with destination, dates, budget, and max participants
2. The system generates a trip code and access URL
3. Marco invites other travelers, who accept
4. Additional travelers request to join; Marco approves them
5. The group coordinates logistics in a group chat

**Result**: A group trip is organized with real communication infrastructure — requires trip creation, invitations, and real-time group chat, all `[EM – Deferred]`.

## Scenario 5: Moderation of Inappropriate Behavior (Envisioned) `[EM – Deferred]`

**Actor**: System Administrator
**Context**: A user receives a report about inappropriate messaging from another user.

**Flow**:
1. User reports the offending profile with a description
2. The system notifies an admin dashboard
3. An administrator reviews the report and message history, issues a warning, then a suspension

**Result**: Community safety is maintained through moderation — requires accounts, real messaging, and an administration module, none of which exist in Release 1.0.
