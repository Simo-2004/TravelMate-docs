# 3.3.5 Implementation `[Mixed]`

> Flutter/Dart, local persistence, and the SonarCloud build gate are verified `[R1.0 – Frozen]`; the backend stack is `[EM – Deferred]`.

## Technology Stack

- **NFR-I.1.1**: `[R1.0 – Frozen]` Mobile: Flutter (Dart), SDK constraint `^3.11.4` (`pubspec.yaml`)
- **NFR-I.1.2**: `[EM – Deferred]` Backend: a server-side application framework exposing a REST API
- **NFR-I.1.3**: `[EM – Deferred]` Database: a relational database
- **NFR-I.1.4**: `[EM – Deferred]` Caching: a session/cache store for the remote backend
- **NFR-I.1.5**: `[EM – Deferred]` Deployment: containerised backend deployment
- **NFR-I.1.6**: `[R1.0 – Frozen]` Continuous static analysis: GitHub Actions runs a SonarCloud scan on every change (`.github/workflows/sonar.yml`, `sonar-project.properties`), analysing `lib/` with coverage sourced from `flutter test --coverage`

**Repository note:** The current GitHub repository (`Simo-2004/TravelMate`) is a Flutter mobile application (Release 1.0) and **does not** include a backend implementation. Its only runtime dependencies are `cupertino_icons`, `flutter_svg`, and `shared_preferences` — there is no networking package. The backend technology stack (NFR-I.1.2–I.1.5) is a planned/preferred stack for a subsequent Evolutionary Maintenance cycle and should be treated as a recommendation, not a current implementation.

Currently implemented in repository:

- Mobile: Flutter (Dart) — `lib/` contains the full application
- Local persistence: `SharedPreferences`-based repositories (`lib/shared/data/*.dart`)
- State management: `ValueNotifier`-based singleton stores (`lib/shared/state/*.dart`)
- Static analysis & coverage reporting: SonarCloud via GitHub Actions

Deferred (not present in repository):

- Any backend framework, relational database, cache, server-side search, or real messaging infrastructure

## Development Standards

- **NFR-I.2.1**: `[R1.0 – Frozen]` Code shall follow Dart/Flutter style guides, enforced via `analysis_options.yaml`. The project includes the official `flutter_lints` rule set and extends it with 6 additional lint rules not enabled by default: `prefer_single_quotes`, `prefer_final_locals`, `prefer_final_in_for_each`, `unnecessary_lambdas`, `unawaited_futures`, and `sort_pub_dependencies`
- **NFR-I.2.2**: `[R1.0 – Frozen]` Automated testing shall run via `flutter test`; the repository includes a test suite under `test/` (`chat_store_test.dart`, `logic_test.dart`, `navigation_test.dart`, `persistence_test.dart`, `widget_test.dart`, `widgets_test.dart`, `screens_test.dart`)
- **NFR-I.2.3**: `[R1.0 – Frozen]` Security and quality scanning shall be integrated into the automated build pipeline via SonarCloud
- **NFR-I.2.4**: `[EM – Deferred]` Code reviews shall be mandatory before merge (process requirement, not verifiable from the codebase alone)

## Version Control

- **NFR-I.3.1**: `[R1.0 – Frozen]` Git-based version control with semantic versioning (`pubspec.yaml` declares `version: 1.0.0+1`)
- **NFR-I.3.2**: `[R1.0 – Frozen]` Feature branches shall be used for development
- **NFR-I.3.3**: `[R1.0 – Frozen]` Release tags/GitHub Releases shall document version history (see Deployment)
