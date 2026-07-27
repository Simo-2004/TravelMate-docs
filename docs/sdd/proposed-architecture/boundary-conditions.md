# 3.7 Boundary Conditions

The use cases of [RAD 3.4.2](../../rad/proposed-system/system-models/use-case-model) describe the system in ordinary operation. This section specifies its behaviour at start-up, at termination, and on failure, since these conditions determine the interfaces of the subsystems and cannot be added afterwards.

## Start-up

Start-up is the one part of the system whose order is fixed rather than event-driven.

1. The framework binding is established, making platform facilities reachable.
2. **Six state subsystems are initialised concurrently**: the account, the trip catalogue, saved items, the personal profile, privacy preferences, and conversations. None reads what another writes, so all six are started together and the sequence waits for all to complete.
3. The interface starts, at the login screen, only once all six have completed.

The third step is what the ordering exists to guarantee: were the interface to start first, a screen could render against a store that had not yet read its data, and the Traveler would see default values replaced a moment later.

### Configuration at start-up

Three things are created on a first run and on no subsequent run, each **idempotent** so that a partially completed first run does not leave the system in a state a second run cannot repair.

| Created | Condition | Mechanism |
|---------|-----------|-----------|
| Account | No account row exists | Seeded with the default credentials of [FR-A.1.6](../../rad/proposed-system/functional) |
| Trip catalogue | The trips table is empty | Seeded from the built-in catalogue |
| Encryption key | No key is present in the OS key store | Generated from a secure source and written there |

Two further steps are deferred to first use rather than performed at start-up: the **database connection** is opened lazily, and the **key** is read into memory only when first required. Neither is needed until data is touched, so deferring them shortens start-up.

**Store fallback** is also a start-up condition, though not a distinct step: it occurs inside the first read performed by a data source, as specified in [3.4](./persistent-data).

## Termination

The system specifies **no shutdown sequence**.

The application may be terminated by the operating system at any moment, without notice and without an opportunity to run cleanup code. The design compensates with an invariant that holds throughout execution rather than at its end:

> **Every change is durable at the moment it is made.** A store that changes its value writes it immediately, without waiting for the write to finish and without deferring it. There is nothing to flush at termination, because nothing is held back.

Two forms of ending are distinguished. **Signing out** returns the interface to the login screen and removes it from the navigation history; stored data is untouched, and the process continues running. **Process termination** releases nothing explicitly — the database connection, active timers, and the in-memory key are reclaimed with the process. The only exposure is a write in flight at the instant of termination; since writes are individual and small, the loss is bounded to that single change.

## Failure

### Handled conditions

| Failure | Response | Requirement |
|---------|----------|-------------|
| A stored preference value is malformed or unparseable | Falls back to the documented default; the application starts normally | [NFR-R.1](../../rad/proposed-system/non-functional/reliability) |
| No data has ever been stored | Falls back to the documented default | [NFR-R.1](../../rad/proposed-system/non-functional/reliability) |
| A photograph cannot be obtained from the gallery | Reports the failure; the surrounding task remains usable and the previously held photograph is retained | [NFR-R.5](../../rad/proposed-system/non-functional/reliability), [UC1](../../rad/proposed-system/system-models/use-case-model), [UC7](../../rad/proposed-system/system-models/use-case-model) |
| A submitted field is unacceptable | Reports the fault beside the field; retains the other values | [FR-A.1.3](../../rad/proposed-system/functional) |
| Credentials are not recognised | Reports failure without distinguishing which credential was wrong | [UC2](../../rad/proposed-system/system-models/use-case-model) |
| Stored encrypted content has been altered | The authentication tag fails verification, so alteration is detected rather than yielding incorrect data | [NFR-R.3](../../rad/proposed-system/non-functional/reliability) |

### Known limitation

Recovery from unreadable data is **not applied uniformly**, and [NFR-R.1](../../rad/proposed-system/non-functional/reliability) is not fully met.

The preference-store path degrades as required: a malformed value is caught and the default is returned. The **encrypted database path does not**. A payload that cannot be decrypted — altered, truncated, or written under a key no longer available — raises a failure that no component catches. Since the six initialisations of start-up are awaited before the interface starts, this failure occurs before the login screen is reached, and the application does not start.

Detection is correct: the authentication tag functions as specified, and [NFR-R.3](../../rad/proposed-system/non-functional/reliability) is met. What is missing is recovery from a detected failure — the design specifies the former and not the latter.

The correction is confined to the Persistence subsystem: a decryption failure should be treated as the preference readers treat a parse failure, discarding the unreadable record and returning the documented default. The choice belongs there because [3.2](./subsystem-decomposition) places knowledge of encryption exclusively in that subsystem; handling the failure above it would require the calling layers to know what they are deliberately kept ignorant of.

### Out of scope

Failures arising from a network, a remote service, or a second node do not exist for this system. Automatic crash reporting is deferred by [RAD 3.3.2](../../rad/proposed-system/non-functional/reliability), since it presupposes a service to receive the reports.

## Goals and requirements served

| Serves | How |
|--------|-----|
| [DG-D2](../introduction/design-goals) Survival of data | Durability at the moment of change rather than at shutdown; idempotent first-run configuration |
| [DG-D1](../introduction/design-goals) Confidentiality | The key is created at the boundary and never leaves the OS key store |
| [NFR-R.1](../../rad/proposed-system/non-functional/reliability) | **Partly** — see Known limitation above |
| [NFR-R.3](../../rad/proposed-system/non-functional/reliability), [NFR-R.5](../../rad/proposed-system/non-functional/reliability) | Alteration detected; optional operations fail without taking the task with them |
| [NFR-R.4](../../rad/proposed-system/non-functional/reliability) | Store fallback performed once, inside the first read |
