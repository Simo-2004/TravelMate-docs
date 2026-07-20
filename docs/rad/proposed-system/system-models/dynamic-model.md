# 3.4.4 Dynamic Model

> **Scope note:** The flows below were verified against the repository. Local Search & Ranking and Simulated Chat are `[R1.0 – Frozen]`. Authentication and the weighted Matching Algorithm are `[EM – Deferred]` — they describe the envisioned backend and are not implemented.

## Local Search & Ranking Flow `[R1.0 – Frozen]`

```
1. User types a query in the Search tab (trips or mates mode)
   ↓
2. Query is split into whitespace-separated terms and lower-cased
   ↓
3. For each candidate (trip or mate), every term must match at least one
   field (name/label, description, keywords/tags) or the candidate is excluded
   ↓
4. Matching terms are scored and summed (prefix match > substring match,
   name/label weighted higher than description)
   ↓
5. Candidates are sorted by score descending, then alphabetically
   ↓
6. Result list is capped to a fixed limit (5)
   ↓
7. UI re-renders the ranked list via ValueListenableBuilder / setState
```

*Realised by*: `filterMates` (`lib/shared/utils/mate_search.dart`), `filterTrips` (`lib/shared/utils/trip_search.dart`).

## Simulated Chat Flow `[R1.0 – Frozen]`

```
1. User sends a message in ChatScreen
   ↓
2. ChatStore.sendMessage: rejects if blank, marks the companion "online"
   (notifyActivity), appends the message (isFromMe: true) to local history
   ↓
3. History is persisted immediately via ChatHistoryData (SharedPreferences)
   ↓
4. resolveAutoReply matches the message text against ChatAutoReplyCatalog's
   ordered keyword rules (whole-word, case-insensitive); falls back to a
   generic reply if nothing matches
   ↓
5. After a fixed 900ms delay, the matched reply is appended (isFromMe: false)
   and persisted
   ↓
6. If no further activity occurs for 5 seconds, the companion's presence
   indicator reverts to "offline"
```

*Realised by*: `ChatStore` (`lib/shared/state/chat_store.dart`), `resolveAutoReply` (`lib/shared/utils/chat_auto_reply.dart`).

## Trip-Invite-in-Chat Flow `[R1.0 – Frozen]`

```
1. User opens the trip attachment picker inside a chat and selects a saved trip
   ↓
2. ChatStore.sendTripInvite appends an invite message carrying attachedTripId
   ↓
3. mateLikesTrip compares the trip's TripTag labels against the companion's
   own interest + preferredTrips tags (case-insensitive)
   ↓
4. If any tag overlaps: the companion's scheduled auto-reply is an acceptance
   If no tag overlaps: the companion's scheduled auto-reply is a decline
   ↓
5. Reply is appended after the standard 900ms simulated delay
```

*Realised by*: `mateLikesTrip` (`lib/shared/utils/trip_invite.dart`), `ChatTripAttachmentPicker`.

## User Authentication Flow (Envisioned) `[EM – Deferred]`

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
6. Token expires after 24 hours; client uses refresh token to get a new one
```

## Compatibility Matching Algorithm Flow (Envisioned) `[EM – Deferred]`

```
1. User initiates search with filters
   ↓
2. System queries the User database with filter criteria
   ↓
3. For each result, calculate a compatibility score:
   - Shared interests: 40%
   - Destination overlap: 30%
   - Travel style: 20%
   - Date availability: 10%
   ↓
4. Exclude blocked/hidden profiles
   ↓
5. Sort by compatibility score descending, apply pagination
   ↓
6. Client renders results with a match percentage
```

> This weighted percentage model does not exist in Release 1.0; the real, local ranking is the term-based scoring described in "Local Search & Ranking Flow" above.

## Real-Time Message Flow (Envisioned) `[EM – Deferred]`

```
1. User sends message in chat to a real recipient
   ↓
2. Client validates and encrypts the message (TLS)
   ↓
3. Message sent to backend API, stored in the database
   ↓
4. Backend sends a push notification to the recipient
   ↓
5. Recipient opens chat: new messages are fetched, marked read, and the
   sender's view is updated with delivery/read status
```
