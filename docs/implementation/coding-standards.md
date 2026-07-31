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

### Organisation

The suite is arranged by **testing level**, one directory per level, so that the directory a test is placed in states what kind of failure it reports.

| Directory | Scope of one test |
|-----------|------------------|
| `unit/` | One function, in isolation |
| `object/` | One class, over its whole interface and every state it can hold |
| `component/` | One widget or screen, through its own interface |
| `integration/` | Several layers wired together, across their interfaces |
| `system/` | The assembled application, driven as a person would |
| `regression/` | A specific defect that was fixed, and the behaviour that replaced it |
| `security/` | The guarantees for data at rest, from the position of someone holding the stored files |
| `helpers/` | The shared harness: substitutes, builders and the plumbing for driving the application |

The first five follow the levels of the V-model, each answering the specification made at the corresponding phase. The last three are not levels: two are defined by concern, and one holds no tests.

A test is placed by the question it answers, not by the class it happens to touch. A test that runs one screen with substitutes behind it belongs to `component/` even where it reaches a state-owning class, because a failure in it reports that the screen is wrong.

The tests themselves, and what each level establishes, are recorded in [5.2](../testing/system-testing).

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
