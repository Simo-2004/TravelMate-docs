# 4.1 Development Environment & Toolchain

The tools required to build and run the system, each with the version the project assumes. The versions recorded here are those declared in the repository; a build performed with different ones is not the build this document describes.

## Framework and language

| Component | Version | Declared in |
|-----------|---------|-------------|
| Framework | 3.41.6, stable channel | The continuous analysis workflow |
| Framework, minimum resolved | 3.38.4 | `pubspec.lock` |
| Language SDK | 3.11.4 | `pubspec.yaml`, resolved in `pubspec.lock` |

Two distinct constraints are recorded, and the distinction matters when a build is reproduced.

The **framework version is pinned to one value.** An unpinned build obtains the latest stable framework, whose bundled language SDK may resolve dependencies differently from those recorded in the lock file; the resolution then diverges from the recorded one and the build fails the constraint described under [Dependency resolution](#dependency-resolution). The pinned value is the version against which the lock file was produced, and it is stated in the workflow for that reason.

## Development environments

The project carries configuration for two environments and requires neither in particular. Any environment providing the framework tooling is admissible, the build being performed by the command line procedure of [4.4](./build-process) rather than by an environment.

| Environment | Configuration present | Purpose |
|-------------|----------------------|---------|
| Visual Studio Code | `.vscode/settings.json` | Associates the project with the continuous analysis project, so that the criteria of [4.5](./quality-criteria) are reported while the source is edited rather than only after a change is submitted |
| IntelliJ-based environments | `.idea/`, project module file | Project structure |

Both require the framework and language plugins supplied for them. Neither configuration is required to build.

## Platform toolchains

The framework compiles one body of logic to several targets, and the repository carries the scaffolding for each. As recorded in [SDD 3.3](../sdd/proposed-architecture/hardware-software-mapping), scaffolding is not support: **Android is the platform against which the system is verified**, and the toolchain below is the one a build requires.

| Component | Version | Declared in |
|-----------|---------|-------------|
| Java, source and target compatibility | 17 | `android/app/build.gradle.kts` |
| Gradle | 8.14 | The Gradle wrapper properties |
| Android Gradle Plugin | 8.11.1 | `android/settings.gradle.kts` |
| Kotlin | 2.2.20 | `android/settings.gradle.kts` |

The Android API levels — compilation, minimum and target — are **not declared by the project**. Each is taken from the framework version in use, so that the levels follow the framework rather than being pinned separately and diverging from it.

The remaining targets are constrained only where the platform requires it. The iOS deployment target is declared as 13.0; the desktop and web targets declare no version of their own.

## Dependency resolution

External libraries are declared in `pubspec.yaml` with a permitted range, and the version selected from each range is recorded in `pubspec.lock`. The lock file is committed, so that the versions a build resolves are those recorded rather than those available at the time the build is performed.

The retrieval command of [4.4](./build-process) is issued with the option **constraining resolution to the recorded versions**. Under that option a lock file inconsistent with the declared ranges causes the build to fail rather than to resolve afresh, by which an undeclared change of version is reported at the point it occurs.

## Development-time dependencies

Libraries required to build, analyse or test the system, and absent from the delivered application.

| Library | Version | Required for |
|---------|---------|--------------|
| `flutter_lints` | ^6.0.0 | The static analysis rule set of [4.2](./coding-standards) |
| `flutter_test` | Supplied with the framework | The test suite |
| `fake_async` | ^1.3.1 | Exercising the timed behaviour specified in [ODD 3.2](../odd/class-interfaces/application-state) without waiting for the intervals to elapse |
| `flutter_launcher_icons` | ^0.14.4 | Producing the application icon for each target |

The libraries the delivered application depends on are listed in [ODD 1.3](../odd/introduction/definitions) with the versions this specification assumes.
