# 1.4 References

## Project documents

| Document | What this specification takes from it |
|----------|---------------------------------------|
| **[SDD — System Design Document](../../sdd/overview)** | The subsystems the specified classes realise ([SDD 3.2](../../sdd/proposed-architecture/subsystem-decomposition)), the services whose operations they implement ([SDD 4](../../sdd/subsystem-services)), and the design goals whose priority settles the trade-offs of [1.1](./trade-offs) ([SDD 1.2](../../sdd/introduction/design-goals)) |
| **[RAD — Requirements Analysis Document](../../rad/overview)** | The requirements the specified classes ultimately serve, and the application-domain terms used without redefinition ([RAD glossary](../../rad/glossary)) |
| **Feasibility Study** | The choice of implementation framework, which fixes the language and the object model this specification is expressed in |

## Source

| Item | Location |
|------|----------|
| Repository | [`Simo-2004/TravelMate`](https://github.com/Simo-2004/TravelMate) |
| Generated interface reference | [API documentation](/api/index.html), produced from the source |
| Test suite | `test/`, which exercises the classes specified here against substitutes |
| Continuous analysis | SonarCloud project `Simo-2004_TravelMate` |

The generated reference and this document serve different purposes and are not alternatives. The generated reference lists what the code contains; this document states what the code is required to contain, and why.

## Enforced conventions

Part of [1.2](./interface-guidelines) is checked automatically rather than by review. The rules are declared in `analysis_options.yaml` in the repository, which activates the standard Flutter lint set and adds the rules below.

| Rule | Convention it enforces |
|------|------------------------|
| `prefer_final_locals` | Values that are never reassigned are declared as fixed |
| `prefer_final_in_for_each` | The same, for loop variables |
| `unawaited_futures` | An asynchronous operation whose result is deliberately not awaited must say so explicitly |
| `unnecessary_lambdas` | An operation passed as a value is named directly, not wrapped |
| `prefer_single_quotes` | One form of string quoting throughout |
| `sort_pub_dependencies` | Declared libraries kept in a fixed order |

The third rule is the one with weight for this specification: it makes the decision recorded in [SDD 4](../../sdd/subsystem-services) — that an operation changing state returns before the write completes — visible at every point where it is taken, instead of indistinguishable from an omission.

## External libraries

The libraries this specification depends on, with the versions it assumes, are listed in [1.3](./definitions). Their authoritative declaration is `pubspec.yaml` in the repository.

## External documentation

| Source | Consulted for |
|--------|---------------|
| Flutter framework documentation | The widget model, the state-notification mechanism realising the Observer arrangement, and the single-threaded execution model |
| Dart language documentation | The object model: constructors, interfaces, visibility, and asynchronous operations |
| SQLite documentation | The behaviour of the storage engine the Data Access classes address |
