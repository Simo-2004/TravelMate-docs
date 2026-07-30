# Testing & Integration

> **Status: skeleton.** The structure of this document is fixed; the chapters are placeholders and their content is to be written.

This document records the verification of TravelMate: what was measured, what was exercised, and what each result establishes about the specifications of the preceding phases.

It records **results**. The thresholds those results are assessed against are set in [4.5](../implementation/quality-criteria), the commands producing them in [4.4](../implementation/build-process), and the conventions the source is required to obey in [4.2](../implementation/coding-standards). None is restated here.

## Position in the lifecycle

Verification is the ascending side of the V-model. Each specifying phase is answered by the level of testing that examines what that phase specified.

| Specifying phase | Verified by | Recorded in |
|------------------|-------------|-------------|
| [ODD](../odd/overview) — class interfaces | Unit testing | [5.2](./system-testing) |
| [SDD](../sdd/overview) — architecture | Integration testing | [5.2](./system-testing) |
| [RAD](../rad/overview) — requirements | System testing | [5.2](./system-testing), [5.3](./requirements-traceability) |

Static quality is examined separately from behaviour: a source that behaves correctly may still fail the maintainability criteria, and a source satisfying them may still behave incorrectly. [5.1](./system-quality) records the first, [5.2](./system-testing) the second.

## Contents

- [5.1 System Quality](./system-quality) — the continuous analysis, its measurements, and the outcome against the adopted criteria
- [5.2 System Testing](./system-testing) — the levels of testing, what each exercises, and the results obtained
- [5.3 Requirements Traceability](./requirements-traceability) — each requirement of the RAD and the verification establishing it, including those met only in part
