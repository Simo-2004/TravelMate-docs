# 4.2 Coding Standards & Static Analysis

The conventions the source obeys, and the means by which conformance to them is established. The conventions themselves are fixed in [ODD 1.2](../odd/introduction/interface-guidelines); this chapter records how each is realised and how conformance is checked.

## Static analysis

The rule set is declared in `analysis_options.yaml`. It activates the framework's published rule set unaltered — no rule of that set is disabled — and adds the rules below.

| Rule | Convention enforced |
|------|--------------------|
| `unawaited_futures` | An asynchronous operation whose result is deliberately not awaited is marked as such |
| `prefer_final_locals` | A value never reassigned is declared as fixed |
| `prefer_final_in_for_each` | The same, for loop variables |
| `unnecessary_lambdas` | An operation passed as a value is named directly rather than wrapped |
| `prefer_single_quotes` | One form of string quoting throughout |
| `sort_pub_dependencies` | Declared libraries kept in a fixed order |

`unawaited_futures` is the rule bearing on the specification rather than on style. [ODD 3.2](../odd/class-interfaces/application-state) requires an operation altering state to return before its write completes; the rule obliges each such call to be marked, by which a write deliberately not awaited is distinguished in the source from an omitted instruction to wait.

**The source analyses without issue.** Analysis over the application and the test suite reports no error, warning or informational result.

## Formatting

The output of the standard formatter is the accepted form of the source. Indentation, line breaking and argument wrapping are settled by it and are therefore not matters for review, which is confined to what the formatter cannot decide.

**The source conforms to it in full.** The formatter, run in the mode that reports rather than rewrites, reports no file requiring alteration.

Two properties make the convention inexpensive to hold. The formatter alters **only line breaking and the trailing commas** that follow from it, neither of which affects behaviour; and it is applied to the whole source at once rather than to a change at a time, so that a difference in style never accompanies a difference in logic within one change.

## Documentation comments

Every public element carries a documentation comment in the form the generator of [4.6](./api-documentation) consumes. Each states the purpose of the element and, where the element is an interface or a substitutable dependency, the reason it exists in that form.

A comment states **why** an element takes the form it does, the form itself being visible in the code beneath it. Comments recording a constraint that would otherwise be re-derived — why a value is not awaited, why a count is obtained rather than a read, why a bar is withheld — are the ones carried in the source; the remainder belong to this documentation.

## Test suite

The tests are source subject to every convention above and are analysed together with the application. They are recorded here because they are written during construction; the results obtained from them belong to [Phase 5](../testing/overview).

Each is exercised against the substitutes specified in [ODD 3](../odd/class-interfaces/), so that no test requires a database, a key store or a device. A shared harness supplies those substitutes.

| Test file | Exercises | Corresponding specification |
|-----------|-----------|----------------------------|
| `logic_test.dart` | Trip and companion ranking, reply selection, proposal matching, validation, tag normalisation, and the domain objects | [ODD 3.3](../odd/class-interfaces/domain-logic) |
| `persistence_test.dart` | The preference-store data sources and the state-owning classes reading them | [ODD 3.2](../odd/class-interfaces/application-state), [3.4](../odd/class-interfaces/persistence) |
| `profile_sqlite_test.dart` | The cipher, the key provider, the profile repository and its data source | [ODD 3.6](../odd/class-interfaces/security), [3.4](../odd/class-interfaces/persistence) |
| `chat_sqlite_test.dart` | The conversation repository, its data source, and the store reading them | [ODD 3.4](../odd/class-interfaces/persistence), [3.2](../odd/class-interfaces/application-state) |
| `auth_test.dart` | Credential derivation and verification, and the account repository | [ODD 3.6](../odd/class-interfaces/security), [3.4](../odd/class-interfaces/persistence) |
| `trip_sqlite_test.dart` | Catalogue seeding and reading | [ODD 3.4](../odd/class-interfaces/persistence) |
| `widgets_test.dart`, `screens_test.dart` | The shared interface elements and the screens composed from them | [ODD 3.1](../odd/class-interfaces/presentation) |
| `login_test.dart`, `account_creation_test.dart` | Entry and account creation, through their substitutable operations | [ODD 3.1](../odd/class-interfaces/presentation) |
| `navigation_test.dart` | Selection of a destination and the consuming of a focus request | [ODD 3.1](../odd/class-interfaces/presentation) |

The largest group exercises Domain Logic, which follows from its specification: every operation there is pure, and a pure operation is exercised by supplying arguments and comparing the result.

The classes excluded from coverage measurement in [4.5](./quality-criteria) are those holding no decision — the concrete classes addressing the database, the key store and the gallery. The logic they carry is exercised through the classes above them.

## Point of verification

The conventions divide by when conformance is established.

| Convention | Established |
|------------|-------------|
| Static analysis rules | Continuously, by the environments of [4.1](./environment), and on every change submitted |
| Test suite | On every change submitted, by the workflow of [4.5](./quality-criteria) |
| Formatting | When the source is edited |
| Documentation comments | On review |

The first two are conditions of admission: a change failing either is reported by the workflow before it is merged. The remaining two are observed rather than enforced, formatting being verifiable at any time by running the formatter in its reporting mode.
