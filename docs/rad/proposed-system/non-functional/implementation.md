# 3.3.5 Implementation `[Mixed]`

> Flutter/Dart, the SQLite persistence stack, the encryption layer, and the SonarCloud build gate are verified `[R1.0 – Frozen]`; the remote backend stack is `[EM – Deferred]`.

## Technology Stack

- **NFR-I.1.1**: `[R1.0 – Frozen]` Mobile: Flutter (Dart), SDK constraint `^3.11.4` (`pubspec.yaml`)
- **NFR-I.1.2**: `[R1.0 – Frozen]` Local database: SQLite via `sqflite`, stored in the app's private documents directory resolved with `path_provider`
- **NFR-I.1.3**: `[R1.0 – Frozen]` Encryption: AES-256-GCM via the pure-Dart `encrypt` package, keeping the full encrypt/decrypt round trip unit-testable without platform channels
- **NFR-I.1.4**: `[R1.0 – Frozen]` Key storage: OS keystore/keychain via `flutter_secure_storage`
- **NFR-I.1.5**: `[R1.0 – Frozen]` Password hashing: PBKDF2-HMAC-SHA256 via `pointycastle`
- **NFR-I.1.6**: `[R1.0 – Frozen]` Media selection: device gallery access via `image_picker`; selected files are copied into app storage and referenced by path
- **NFR-I.1.7**: `[R1.0 – Frozen]` Continuous static analysis: GitHub Actions runs a SonarCloud scan on every change (`.github/workflows/sonar.yml`, `sonar-project.properties`), analysing `lib/` with coverage sourced from `flutter test --coverage`
- **NFR-I.1.8**: `[EM – Deferred]` Backend: a server-side application framework exposing a REST API, a server-side relational database, and a session/cache store, deployed in containers

**Repository note:** The repository (`Simo-2004/TravelMate`) is a Flutter mobile application (Release 1.0) with a complete **local** persistence and security stack, but **no** backend implementation and no networking package among its dependencies. The backend technology stack (NFR-I.1.8) is a planned/preferred stack for a subsequent Evolutionary Maintenance cycle and should be treated as a recommendation, not a current implementation.

Currently implemented in repository:

- Mobile: Flutter (Dart) — `lib/` contains the full application
- Persistence: SQLite (`travelmate.db`, schema v4) with DAO interfaces and repositories (`lib/core/database/`, `lib/shared/data/`)
- Security: AES-256-GCM field encryption, OS-keystore-held key, PBKDF2 password hashing (`lib/core/security/`)
- State management: `ValueNotifier`-based singleton stores (`lib/shared/state/`)
- Residual `SharedPreferences` usage: saved bookmarks and privacy preferences, plus retained legacy stores used only as one-time migration sources
- Static analysis & coverage reporting: SonarCloud via GitHub Actions

Deferred (not present in repository):

- Any backend framework, server-side database, cache, server-side search, or real messaging infrastructure

## Architectural Standards `[R1.0 – Frozen]`

- **NFR-I.2.1**: Database access shall be isolated behind DAO interfaces, so business logic never depends directly on `sqflite`
- **NFR-I.2.2**: Secret storage shall be isolated behind a `SecureKeyStore` interface, so the encryption layer never depends directly on a platform plugin
- **NFR-I.2.3**: Mapping, encryption, and query-composition logic shall reside in repositories — which are unit-tested against in-memory fake DAOs — while thin platform adapters shall be excluded from coverage
- **NFR-I.2.4**: Stores and screens shall expose test seams (injectable repositories/data sources) so flows can be exercised without live SQLite or secure-storage plugins

## Development Standards

- **NFR-I.3.1**: `[R1.0 – Frozen]` Code shall follow Dart/Flutter style guides, enforced via `analysis_options.yaml`. The project includes the official `flutter_lints` rule set and extends it with 6 additional lint rules not enabled by default: `prefer_single_quotes`, `prefer_final_locals`, `prefer_final_in_for_each`, `unnecessary_lambdas`, `unawaited_futures`, and `sort_pub_dependencies`
- **NFR-I.3.2**: `[R1.0 – Frozen]` Automated testing shall run via `flutter test`, with a test suite under `test/`
- **NFR-I.3.3**: `[R1.0 – Frozen]` Security and quality scanning shall be integrated into the automated build pipeline via SonarCloud
- **NFR-I.3.4**: `[EM – Deferred]` Code reviews shall be mandatory before merge (process requirement, not verifiable from the codebase alone)

## Version Control

- **NFR-I.4.1**: `[R1.0 – Frozen]` Git-based version control with semantic versioning (`pubspec.yaml` declares `version: 1.0.0+1`)
- **NFR-I.4.2**: `[R1.0 – Frozen]` Feature branches shall be used for development
- **NFR-I.4.3**: `[R1.0 – Frozen]` Release tags/GitHub Releases shall document version history (see Deployment)
