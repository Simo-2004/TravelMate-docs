# 5.2 System Testing

> **Status: placeholder.**

To be written: the levels at which the system is exercised, what each level establishes, and the results obtained.

The test files and the specification each exercises are tabulated in [4.2](../implementation/coding-standards), and the commands running them in [4.4](../implementation/build-process). Neither is restated; this chapter states what the tests **establish** rather than what they are.

Intended scope:

- **Levels of testing** — unit, integration and system, each defined by the specification it answers rather than by the tool running it.
- **Unit testing** — the classes exercised in isolation against substitutes, and what their results establish about [ODD 3](../odd/class-interfaces/).
- **Integration testing** — the chains of classes exercised together, and what their results establish about the decomposition of [SDD 3.2](../sdd/proposed-architecture/subsystem-decomposition).
- **System testing** — the use cases of [RAD 3.4.2](../rad/proposed-system/system-models/use-case-model) exercised through the interface, and the correspondence between each use case and the tests exercising it.
- **Timed behaviour** — how the two intervals specified in [ODD 3.2](../odd/class-interfaces/application-state) are exercised without waiting for them to elapse.
- **Results** — the outcome of the suite, and the coverage attained.
- **Limits of the suite** — what no test exercises, and the consequence of that for what the results establish.

## Point requiring resolution before writing

The suite exercises **no class against a real platform facility**: every test substitutes the database, the key store and the gallery. The consequence is that the wiring between the application and the platform is not verified by any test, and the classes performing that wiring are the ones excluded from coverage in [4.5](../implementation/quality-criteria).

This is a property of the suite as it stands, not a defect in a class. It is to be recorded as a limit on what the results establish, and its consequence for [NFR-S.4](../rad/proposed-system/non-functional/supportability) stated plainly.
