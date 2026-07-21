# 3.3.4 Supportability `[R1.0 – Frozen]`

## Maintainability

- **NFR-S.1.1**: Code shall follow Dart/Flutter style conventions, enforced by a linter configuration (`analysis_options.yaml`) that includes the base `flutter_lints` rule set plus 6 project-specific rules layered on top — `prefer_single_quotes`, `prefer_final_locals`, `prefer_final_in_for_each`, `unnecessary_lambdas`, `unawaited_futures`, `sort_pub_dependencies` — enforcing stricter immutability, consistent string quoting, and safe handling of asynchronous calls than the default set alone requires
- **NFR-S.1.2**: Non-obvious logic shall carry explanatory comments (see e.g. `mate_search.dart`, `chat_store.dart`) rather than restating what the code already says
- **NFR-S.1.3**: A test suite shall exist and be runnable via `flutter test` (`test/` — 8 test files covering chat, logic, navigation, persistence, and widgets)
- **NFR-S.1.4**: Test coverage shall be measured via `flutter test --coverage` and published to SonarCloud (`sonar.dart.lcov.reportPaths` in `sonar-project.properties`), maintaining Code Coverage above 80% as enforced by the SonarCloud Quality Gate (see [System Testing](/system-testing))

## Extensibility

- **NFR-S.2.1**: `[R1.0 – Frozen]` The layered structure (presentation / state / data) shall allow new features to be added under `lib/features/` without modifying unrelated modules
- **NFR-S.2.2**: `[EM – Deferred]` API versioning shall support backward compatibility — applies only to the future remote backend

## Debugging

- **NFR-S.3.1**: `[EM – Deferred]` System shall provide structured logging at DEBUG/INFO/WARN/ERROR levels with request tracing — no logging framework is present in Release 1.0 beyond default Flutter/Dart diagnostics
