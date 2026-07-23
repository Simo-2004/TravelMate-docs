# 2. Current System

## 2.1 Existing Solutions

Currently, travelers seeking companions rely on several fragmented approaches:

### Manual Methods
- **Social Media Groups**: Users post in Facebook groups or Reddit communities to find travel companions
- **Travel Forums**: Platforms like TravelBlog or BackpackerTalk facilitate connections but lack matching algorithms
- **Word of Mouth**: Personal recommendations and referrals
- **Travel Agencies**: Limited service focused primarily on package tours

### Limitations of Current Approaches

1. **Inefficiency**: No structured matching based on interests and compatibility
2. **Safety Concerns**: Difficulty verifying user identities and backgrounds
3. **Scattered Communication**: Multiple platforms and tools required for coordination
4. **Limited Visibility**: Hard to discover like-minded travelers
5. **No Accountability**: Lack of review systems and community moderation

## 2.2 Problem Statement

There is no comprehensive platform specifically designed for:
- Efficiently discovering travelers based on interests, style, and budget
- Providing integrated communication for trip coordination
- Building a trusted community through verification and ratings
- Managing the complete journey from discovery to trip planning

## 2.3 Opportunity

The envisioned TravelMate platform addresses these gaps by providing an intelligent matching system, a unified communication platform, built-in safety and trust mechanisms, and seamless trip planning tools (`[EM – Deferred]`, see Feasibility Study §3.1).

**Release 1.0** validates the core discovery-and-connection concept on a single device, ahead of investing in a real backend: an authenticated local account, an encrypted personal profile, a searchable catalog of trips and companions, a bookmarking system, and — as a working proof of concept for the communication experience — a **simulated, keyword-driven chat** that lets a user rehearse coordinating a trip with a companion before any real messaging infrastructure exists. Critically, it also establishes the **persistence and security foundations** (relational storage, encryption at rest, key management, password hashing) that a future networked release would build upon.

### Current repository status `[R1.0 – Frozen]`

The TravelMate repository (`Simo-2004/TravelMate`) is the Release 1.0 Flutter mobile application. Verified against the codebase:

- Persistence is a local **SQLite** database (`travelmate.db`, schema v4) with four tables — `personal_profile`, `trips`, `account`, `chat_messages` — accessed through DAO interfaces and repositories (`lib/core/database/`, `lib/shared/data/`)
- Sensitive data is **encrypted at rest** with AES-256-GCM; the key is generated on first use and held in the OS keystore via `flutter_secure_storage` (`lib/core/security/`)
- **Authentication is implemented**: the app opens on a login screen, supports sign-up, and verifies credentials against an encrypted username plus a PBKDF2 salted password hash (`lib/features/auth/`, `lib/shared/state/auth_service.dart`)
- Search and discovery are implemented client-side; trips are read from SQLite (seeded once from a static catalog), while companion profiles remain a fixed in-code catalog (`MateCatalog`)
- **Chat is implemented**, but fully simulated: a local, per-companion conversation with a keyword-matched auto-reply engine, message text encrypted at rest, and simulated online/offline presence — there is no real messaging between distinct users
- `SharedPreferences` is still used for saved bookmarks and privacy preferences, and is retained as a one-time migration source for profile and chat history
- A remote backend, multi-user accounts, server-side persistence, and moderation tools are **not** implemented; they are `[EM – Deferred]` to a future Evolutionary Maintenance lifecycle

This RAD describes the envisioned target system alongside the Release 1.0 baseline. See the "Implementation status" section of [3.2 Functional Requirements](./proposed-system/functional) and [3.4.3 Object Model](./proposed-system/system-models/object-model) to trace which requirements and classes are implemented in the codebase today.
