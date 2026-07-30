# 5.3 Requirements Traceability

> **Status: placeholder.**

To be written: each requirement of the [RAD](../rad/overview) and the verification establishing it, so that no requirement of the delivered system is left unverified and no verification is left without a requirement it serves.

This closes the V-model: [4.3](../implementation/traceability) established that the source realises the specification, and this chapter establishes that the specification realises the requirements.

Intended scope:

- **Use cases** — each use case of [RAD 3.4.2](../rad/proposed-system/system-models/use-case-model) and the tests exercising it.
- **Functional requirements** — each requirement of [RAD 3.2](../rad/proposed-system/functional) and the verification establishing it, distinguishing those verified by test from those verified by inspection.
- **Non-functional requirements** — each requirement of [RAD 3.3](../rad/proposed-system/non-functional/) and how it is established. Several are established by measurement rather than by test, and the measurement is that of [5.1](./system-quality).
- **Requirements met in part** — those the design satisfies incompletely, each with the specific respect in which it is not met.
- **Deferred requirements** — those the RAD excludes from this release, listed so that their absence from the verification is deliberate rather than an omission.

## Requirements already recorded as met in part

Three limitations are recorded in the design and are to be carried here rather than restated or discovered afresh:

| Requirement | Respect in which it is not met | Recorded in |
|-------------|-------------------------------|-------------|
| [NFR-R.1](../rad/proposed-system/non-functional/reliability) | Recovery from an unreadable stored value is applied to the preference store and not to the encrypted database | [SDD 3.7](../sdd/proposed-architecture/boundary-conditions) |
| [NFR-I.4](../rad/proposed-system/non-functional/implementation) | Verification discloses by its duration whether the username is correct | [SDD 3.5](../sdd/proposed-architecture/access-control) |
| [NFR-P.3](../rad/proposed-system/non-functional/performance) | Credential derivation occupies the single thread of execution for its duration | [SDD 3.6](../sdd/proposed-architecture/global-control-flow) |

Each is a known property of the design rather than a defect found during verification. This chapter records the verification that confirms each, and states for each whether it was found by test or by inspection.
