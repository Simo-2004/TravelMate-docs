# 3.3.4 Supportability `[R1.0 – Frozen]`

## Maintainability

- **NFR-S.1.1**: Code shall follow Dart/Flutter style conventions, enforced by `flutter_lints` (`analysis_options.yaml`)
- **NFR-S.1.2**: Non-obvious logic shall carry explanatory comments (see e.g. `mate_search.dart`, `chat_store.dart`) rather than restating what the code already says
- **NFR-S.1.3**: A test suite shall exist and be runnable via `flutter test` (`test/` — 8 test files covering chat, logic, navigation, persistence, and widgets)
- **NFR-S.1.4**: Test coverage shall be measured and published to SonarCloud via `flutter test --coverage` (`sonar.dart.lcov.reportPaths` in `sonar-project.properties`); a specific coverage percentage is not asserted here, as it is enforced live by the SonarCloud Quality Gate (see [System Testing](/system-testing))

## Extensibility

- **NFR-S.2.1**: `[R1.0 – Frozen]` The layered structure (presentation / state / data) shall allow new features to be added under `lib/features/` without modifying unrelated modules
- **NFR-S.2.2**: `[EM – Deferred]` API versioning shall support backward compatibility — applies only to the future remote backend

## Debugging

- **NFR-S.3.1**: `[EM – Deferred]` System shall provide structured logging at DEBUG/INFO/WARN/ERROR levels with request tracing — no logging framework is present in Release 1.0 beyond default Flutter/Dart diagnostics
