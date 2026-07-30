# 4.5 Quality Criteria

The thresholds a change to the source is required to satisfy, and the analysis by which satisfaction is established. The criteria constrain construction: they state what a change must satisfy to be admitted, not what the completed system is found to achieve. The results obtained against them belong to [Phase 5](../system-testing).

## The thresholds adopted

| Criterion | Threshold | Applied to |
|-----------|-----------|------------|
| **Coverage** | At least 80% | New code |
| **Duplication** | At most 3% | New code |

Both are set for this project rather than accepted as supplied. Each is recorded below with what it measures and the requirement it serves.

## Coverage

Coverage is the proportion of executable lines exercised by the test suite. It is measured from the report produced by the command of [4.4](./build-process) and is consumed by the analysis in the form written there.

The threshold **realises [NFR-S.4](../rad/proposed-system/non-functional/supportability)**, which requires coverage to be measured automatically and to remain above 80%. It is therefore not a value chosen at the point of analysis but the requirement stated in the RAD, carried through [DG-M1](../sdd/introduction/design-goals) in the SDD and applied here.

The threshold is attainable because the design makes it so. [DG-M1](../sdd/introduction/design-goals) requires the logic of the system to be exercisable without a database, a key store or a device, and [ODD 3](../odd/class-interfaces/) realises that requirement by declaring an interface in front of every platform facility. A threshold of this kind set over a design lacking those interfaces would oblige a device to be attached before it could be met.

## Duplication

Duplication is the proportion of lines belonging to a block repeated elsewhere in the analysed source.

The threshold is **adopted by this project** under [NFR-S.5](../rad/proposed-system/non-functional/supportability), which requires every change to be analysed for maintainability, and no value is fixed by the requirement itself. The value adopted is 3%.

It serves [DG-M2](../sdd/introduction/design-goals) and [NFR-S.7](../rad/proposed-system/non-functional/supportability): a rule expressed twice is a rule that can be altered once and left inconsistent. Several decisions recorded in the design exist to hold a rule in one place — the conversion of characterising labels specified in [ODD 3.3](../odd/class-interfaces/domain-logic), the normalisation applied by the profile editor and the account-creation screen alike, the shared interface elements of [ODD 3.1](../odd/class-interfaces/presentation). The threshold is what causes a departure from those decisions to be reported rather than merely regretted.

## Application to new code

Both criteria are applied to **what a change introduces**, not to the source in aggregate.

A criterion applied to the aggregate is satisfied or failed by the size of the system rather than by the change under examination. A large body of well-covered source admits an untested addition without the aggregate moving perceptibly, and the criterion then reports nothing about the change that caused it to be evaluated. Applied to new code, the criterion is answerable by the author of the change at the time the change is made.

Reformatting is the one case in which the distinction requires care: source that is only re-laid-out is reported as new, and its coverage is assessed. This is why the formatting of [4.2](./coding-standards) was applied to the whole source at once rather than progressively.

## Exclusions from coverage

The classes below are excluded from the coverage measurement. Each is a class [ODD 3](../odd/class-interfaces/) specifies as **holding no decision**: a concrete class whose whole content is delegation to a platform library, exercisable only with the facility it delegates to.

| Excluded | Specified in | Delegates to |
|----------|-------------|--------------|
| The four concrete data access classes | [ODD 3.5](../odd/class-interfaces/data-access) | The database library |
| `DatabaseHelper` | [ODD 3.5](../odd/class-interfaces/data-access) | The database library and the directory facility |
| `FlutterSecureKeyStore` | [ODD 3.6](../odd/class-interfaces/security) | The OS key store |
| `ProfileImagePicker` | [ODD 3.7](../odd/class-interfaces/media-storage) | The device gallery |
| The assembly of the system | [ODD 2](../odd/packages) | — |

The exclusion is what makes the measurement meaningful rather than indulgent. Counting these classes would either depress the proportion by an amount no test could raise, or force a device to be attached for the suite to run — and the requirement of [NFR-S.3](../rad/proposed-system/non-functional/supportability) is that logic be exercisable without one.

The logic these classes carry is not excluded. Conversion, encryption, record composition and the copying of a file are exercised through the classes above them, as recorded in [4.2](./coding-standards).

Generated sources are excluded by declaration. As recorded in [4.4](./build-process) the system generates none, and the exclusion stands against their introduction rather than against anything present.

## Exclusions from duplication

The test suite is excluded from the duplication measurement.

A test declares the state it exercises and the expectation it asserts, and tests of one class necessarily resemble one another in structure. Similarity between two tests is a property of tests rather than a defect in them, and counting it would report a fault where the repetition carries meaning. The application source is measured in full.

## Point of application

The analysis is performed by the workflow declared in the repository, on every change submitted and on every change merged. It retrieves the dependencies, runs the suite with coverage, and submits the source together with the report.

A change failing either threshold is reported before it is merged. The criteria are consequently conditions of admission rather than measurements taken afterwards, which is the property that places them in this phase and not in the one that verifies the completed system.

The same criteria are reported while the source is edited, through the association recorded in [4.1](./environment), so that a change is assessed against them before it is submitted rather than only after.
