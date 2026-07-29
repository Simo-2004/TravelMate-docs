# 4.5 Quality Criteria

> **Status: placeholder.**

To be written: the thresholds a change to the source is required to satisfy, and the analysis by which satisfaction is established.

The thresholds adopted for this project are stated below and are the subject of this chapter.

| Criterion | Threshold | Applied to |
|-----------|-----------|------------|
| **Coverage** | At least 80% | New code |
| **Duplication** | At most 3% | New code |

Intended scope:

- **The two thresholds** — what each measures, and the consequence of a change failing either.
- **New code rather than the whole source** — why the criteria are applied to what a change introduces rather than to the system in aggregate.
- **Exclusions** — the parts of the source excluded from each measurement, and the justification for each exclusion.
- **The point of application** — when the analysis is performed, and what it governs.
- **Relation to the design goals** — the goals of [SDD 1.2](../sdd/introduction/design-goals) these thresholds serve.

The criteria are recorded here rather than in [Phase 5](../system-testing) because they constrain construction: they state what a change must satisfy to be admitted, not what the completed system is found to achieve. The results obtained against them belong to the verification phase.
