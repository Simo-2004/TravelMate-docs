# 4.4 Build & Execution Process

The procedure transforming the source into a running application, stated as the commands performing it. The commands are those the continuous analysis workflow issues, so that a build performed locally and one performed by the workflow are the same build.

The toolchain each command requires is recorded in [4.1](./environment).

## Dependency retrieval

Performed once before any other command, and again whenever the declared dependencies change.

```bash
flutter pub get --enforce-lockfile
```

The option constrains resolution to the versions recorded in `pubspec.lock`, as specified in [4.1](./environment). Without it a retrieval may select a newer version admitted by the declared range, and the build ceases to be reproducible; with it, a lock file inconsistent with the declared ranges causes the command to fail rather than to resolve afresh.

## Execution during development

```bash
flutter run
```

Compiles the application and installs it on the connected device or running emulator. The application starts at the login screen, following the start-up sequence specified in [SDD 3.7](../sdd/proposed-architecture/boundary-conditions).

The credentials seeded on a first run are those recorded in [FR-A.1.6](../rad/proposed-system/functional).

## Test execution

```bash
flutter test
```

Runs the suite recorded in [4.2](./coding-standards). No test requires a device, a database or a key store, each being exercised against the substitutes specified in [ODD 3](../odd/class-interfaces/); the command therefore completes without an emulator attached.

Coverage is produced by the same command with the reporting option, and is the report the analysis of [4.5](./quality-criteria) consumes.

```bash
flutter test --coverage
```

The report is written to `coverage/lcov.info`, which is the path declared to the analysis.

## Static analysis

```bash
dart analyze lib/ test/
```

Applies the rule set declared in `analysis_options.yaml`. Conformance to the formatter is established separately, by the command reporting rather than rewriting:

```bash
dart format --output=none --set-exit-if-changed lib/ test/
```

Both are recorded in [4.2](./coding-standards) together with the state the source is required to be in.

## Production build

The distributable artefact is produced for Android, the platform against which the system is verified.

```bash
flutter build apk --release
```

The release mode compiles ahead of time and omits the development instrumentation. The resulting artefact is the one distributed as recorded in [Deployment](../deployment).

## Application icon

The icon is derived from one source image rather than maintained per platform and per resolution. It is regenerated when that image changes, and at no other time.

```bash
dart run flutter_launcher_icons
```

The source image and the platforms to which it is applied are declared in `pubspec.yaml`.

## Generated sources

**No part of the source is generated.** The system declares no code generation step, and the build consists of retrieval and compilation alone.

The domain objects convert themselves to and from their stored form through operations written by hand and specified in [ODD 3.3](../odd/class-interfaces/domain-logic), rather than through generated conversions. The consequence is that a build requires no generation step before compiling, and that a file of the source is never the output of a tool.

## Bundled resources

Images and icons are declared in `pubspec.yaml` and are bundled by the build. They are referenced through the catalogues specified in [ODD 3.4](../odd/class-interfaces/persistence), so that a reference appears in one place rather than in each screen presenting it.

## Order of the commands

| Order | Command | Required |
|:-----:|---------|----------|
| 1 | Dependency retrieval | Before any other command, and after a change to the declared dependencies |
| 2 | Static analysis, formatting check | Before a change is submitted |
| 3 | Test execution with coverage | Before a change is submitted |
| 4 | Execution or production build | To run or distribute the application |

The workflow issues the first and third on every change submitted. The second is issued locally, as recorded in [4.2](./coding-standards). The fourth is issued when an artefact is required and is not part of the analysis of a change.
