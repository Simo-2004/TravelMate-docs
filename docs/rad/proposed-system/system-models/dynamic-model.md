# 3.4.4 Dynamic Model

> **Scope note:** The dynamic flows below model the **envisioned** platform. The Authentication Flow and the Chat Message Flow are `[EM – Deferred]` (they require the remote backend). Only the client-side portion of the Matching/Search Flow — local filtering over the mock catalogs — is realised in the `[R1.0 – Frozen]` baseline.

## User Authentication Flow
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

## Matching Algorithm Flow
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

## Chat Message Flow
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
