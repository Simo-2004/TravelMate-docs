# 5.1 System Quality

The continuous analysis performed on the source, what it measured, and the outcome against the criteria adopted in [4.5](../implementation/quality-criteria).

## The analysis

The source is submitted to a hosted analysis service by the workflow declared in the repository, on every change proposed and on every change merged. The workflow retrieves the dependencies, runs the test suite with coverage, and submits the source together with the coverage report.

The analysis differs from the static analysis of [4.2](../implementation/coding-standards) in what it examines. Static analysis checks the source against a rule set at the moment it is written. This analysis keeps a record over time, applies a wider set of rules, and assesses each result against the thresholds adopted for the project.

## What is measured

| Measure | Counts |
|---------|--------|
| **Reliability** | Defects likely to make the program behave incorrectly |
| **Security** | Defects that could be exploited |
| **Security hotspots** | Code that is security-sensitive and needs a human decision, rather than a defect |
| **Maintainability** | Code that works but will be costly to change |
| **Coverage** | The share of executable lines the test suite runs |
| **Duplication** | The share of lines belonging to a block that appears elsewhere |

The first four are also reported as a letter rating from A to E, where A means no open issue of that kind.

The two criteria of [4.5](../implementation/quality-criteria) are applied to new code. The figures below are for the source as a whole and are given as context, not as the conditions a change must pass.

## Initial state

The first analysis reported open issues in three of the four measures.

<img src="/static/pics/sonar-pre-test-1.png" alt="Security and hotspot measures at the first analysis" width="100%" style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; margin-bottom: 15px;" />

Security stood at **C** with four open issues, one of them of high severity. The security review rating stood at **E**, the lowest, with three hotspots none of which had been reviewed. A hotspot is not a defect: the rating was E because the decisions had not been recorded, not because the code was known to be unsafe.

<img src="/static/pics/sonar-pre-test-2.png" alt="Reliability and maintainability measures at the first analysis" width="100%" style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; margin-bottom: 15px;" />

Reliability stood at **C** with nine open issues, all of medium severity. Maintainability stood at **A** by rating but carried a large number of open issues, which is the case the rating alone does not show: the rating reflects the cost of the worst issue, not how many there are.

## State after resolution

Every issue was either corrected in the source or, for the hotspots, reviewed and its decision recorded.

<img src="/static/pics/sonarcloudnew1.png" alt="Quality gate, duplication, coverage and security after resolution" width="100%" style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; margin-bottom: 15px;" />

<img src="/static/pics/sonarcloudnew2.png" alt="Reliability and maintainability after resolution" width="100%" style="border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; margin-bottom: 15px;" />

## Comparison

| Measure | First analysis | Current |
|---------|:--------------:|:-------:|
| Security rating | C | **A** |
| Security issues | 4 | **0** |
| Security review rating | E | **A** |
| Security hotspots to review | 3 | **0** |
| Reliability rating | C | **A** |
| Reliability issues | 9 | **0** |
| Maintainability rating | A | **A** |
| Maintainability issues | 2,310 | **0** |
| Duplication | — | **0.0%** |
| Coverage | — | **99.7%** |

Duplication and coverage carry no figure for the first analysis because the coverage report was not yet submitted with the source, so neither could be computed.

## Outcome against the adopted criteria

**The quality gate passes, with every condition met.**

| Criterion | Threshold adopted | Measured |
|-----------|------------------|----------|
| Coverage | At least 80% | 99.7% |
| Duplication | At most 3% | 0.0% |

Coverage exceeds the threshold by a wide margin, which follows from the design rather than from the number of tests written. [DG-M1](../sdd/introduction/design-goals) requires the logic to be exercisable without a database, a key store or a device, and [ODD 3](../odd/class-interfaces/) meets that by placing an interface in front of every platform facility. The classes that could not be reached without a device are the ones excluded from the measurement in [4.5](../implementation/quality-criteria), and what remains is reachable by a test.

Duplication is at zero. The design decisions that keep a rule in one place — the shared conversion of characterising labels, the tag normalisation used by two screens, the shared interface elements — are what the figure reflects.

## Security hotspots

The three hotspots were reviewed and the decision for each recorded, which is what moved the review rating from E to A. Reviewing a hotspot does not change the code: it records that a human has looked at security-sensitive code and judged it.

One decision changed the source rather than only recording a judgement. The retrieval of dependencies was changed to the form that pins resolution to the recorded versions, described in [4.1](../implementation/environment), so that a build cannot silently take a version that was never reviewed.

## Analysis report

The analysis reads the source and the coverage report. It does not run the application.

A high coverage figure states that a line was run by some test, not that the test asserted the right thing. Whether the system does what the RAD requires is established by the tests themselves, and is recorded in [5.2](./system-testing) and [5.3](./requirements-traceability).

The figures also cover only what the suite can reach. As recorded in [5.2](./system-testing), no test exercises a real platform facility, so the coverage figure says nothing about the classes that address the database, the key store and the gallery.
