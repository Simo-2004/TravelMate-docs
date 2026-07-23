# 1.6 Overview

This document outlines the complete requirements for the TravelMate application, including functional and non-functional requirements, system architecture, and design specifications. Requirements are tagged `[R1.0 – Frozen]` (realised by the Release 1.0 codebase) or `[EM – Deferred]` (envisioned, not part of this lifecycle), as defined in the RAD's [top-level Methodological Note](../overview).

## Repository snapshot (ground truth)

This RAD was verified directly against the codebase at `https://github.com/Simo-2004/TravelMate`. The Release 1.0 application is a Flutter mobile app with the following verified characteristics:

- **Local SQLite persistence** (`sqflite`): a single database file `travelmate.db` (schema version 4) opened from the app's private documents directory, holding four tables — `personal_profile`, `trips`, `account`, and `chat_messages` (`lib/core/database/`)
- **Field-level encryption at rest**: sensitive columns are stored as AES-256-GCM base64 payloads with a fresh random nonce per value and a tamper-detecting authentication tag (`lib/core/security/aes_cipher.dart`)
- **Key management**: the 256-bit AES key is generated on first use and persisted in the OS keystore/keychain via `flutter_secure_storage` (`lib/core/security/profile_key_provider.dart`, `flutter_secure_key_store.dart`)
- **Password security**: login passwords are never stored reversibly — only a PBKDF2-HMAC-SHA256 salted hash (100,000 iterations, 32-byte key, 16-byte random salt) verified in constant time (`lib/core/security/password_hasher.dart`)
- **Authentication**: the app entry point is a login screen; sign-up and credential verification run against the encrypted local account (`lib/features/auth/`, `lib/shared/state/auth_service.dart`)
- **Layered data access**: DAO interfaces (`ProfileDao`, `TripDao`, `AccountDao`, `ChatDao`) with `sqflite` adapters, and repositories that own all mapping/encryption logic — the repositories are unit-tested against in-memory fake DAOs, while the thin platform adapters are excluded from coverage
- **State management**: `ValueNotifier`-based singleton stores (`lib/shared/state/`)
- **Simulated chat**: a fully local, per-companion chat with a keyword-matched auto-reply engine and simulated presence, with message text encrypted at rest (`lib/features/chat/`, `lib/shared/data/chat_repository.dart`)
- **Residual `SharedPreferences` usage**: saved bookmarks and privacy preferences are still stored as plain JSON in `SharedPreferences`; the profile and chat legacy stores are retained solely as one-time migration sources into SQLite
- **No backend server implementation** is present; backend components described in this RAD are `[EM – Deferred]`

Every functional and non-functional requirement, and every model in this RAD, was cross-checked against the classes listed above before being tagged.
