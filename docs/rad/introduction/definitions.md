# 1.4 Definitions, Acronyms & Abbreviations

- **RAD**: Requirements Analysis Document
- **SDD**: System Design Document
- **ODD**: Object Design Document
- **API**: Application Programming Interface
- **MVVM**: Model-View-ViewModel
- **UI**: User Interface
- **UX**: User Experience
- **DAO (Data Access Object)**: An interface isolating database access from business logic; TravelMate defines one per table, with a `sqflite` adapter in production and an in-memory fake in tests
- **SQLite**: The embedded, file-based relational database engine used for all on-device persistence (via the `sqflite` package)
- **AES-256-GCM**: Authenticated symmetric encryption used for field-level protection of sensitive database columns; the GCM authentication tag makes tampering detectable
- **Nonce / IV**: A 12-byte random value generated fresh for each encryption, prepended to the ciphertext so the same plaintext never produces the same payload twice
- **PBKDF2 (Password-Based Key Derivation Function 2)**: The one-way, deliberately slow hashing function (HMAC-SHA256, 100,000 iterations) used to store login passwords
- **Salt**: A random per-password value mixed into the hash to defeat precomputed (rainbow-table) attacks
- **Keystore / Keychain**: The OS-provided secure storage where the AES key is persisted at rest, accessed via `flutter_secure_storage`
- **Auto-reply**: The canned response generated locally by matching a chat message against an ordered list of keyword rules; used by the Release 1.0 simulated chat in place of a real companion's reply
- **Bookmark**: A saved reference to a trip or companion profile, persisted on-device

The following acronyms denote technologies that appear **only** in the envisioned, `[EM – Deferred]` architecture (Feasibility Study §3.1) and are not part of the Release 1.0 codebase:

- **GDPR**: General Data Protection Regulation
- **JWT**: JSON Web Token
- **REST**: Representational State Transfer
- **ORM**: Object-Relational Mapping

> Domain-specific and business terminology is defined in [4. Glossary](../glossary).
