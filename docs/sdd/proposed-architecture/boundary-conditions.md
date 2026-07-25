# 3.7 Boundary Conditions

The use cases of [RAD 3.4.2](../../rad/proposed-system/system-models/use-case-model) describe the system in ordinary operation. This section describes it at its boundaries: coming up, going down, and failing. These conditions are specified here because they determine the interfaces of the subsystems and cannot be added afterwards.

## Start-up

Start-up is a single ordered sequence, and it is the only part of the system whose order is fixed rather than event-driven.

1. The framework binding is established, making platform facilities reachable.
2. **Six state subsystems are initialised together**, not in sequence: the account, the trip catalogue, saved items, the personal profile, privacy preferences, and conversations. They are independent — none reads what another writes — so they are started concurrently and the sequence waits for all of them.
3. Only when all six have completed does the interface start, at the login screen.

The third step is what makes the ordering necessary. If the interface started first, a screen could render against a store that had not yet read its data, and the Traveler would see default values replaced a moment later.

### Configuration performed at start-up

Three things are created on a first run and on no subsequent run. Each is **idempotent**, so a partially completed first run does not leave the system in a state a second run cannot repair.

| Created | When | Mechanism |
|---------|------|-----------|
| Account | No account row exists | Seeded with the default credentials of [FR-A.1.6](../../rad/proposed-system/functional) |
| Trip catalogue | The trips table is empty | Seeded from the built-in catalogue |
| Encryption key | No key is present in the OS key store | Generated from a secure source and written there |

Two further things happen lazily rather than at start-up, on first use: the **database connection** is opened, and the **key is read** into memory. Neither is needed until data is actually touched, and deferring them keeps start-up shorter.

Migration from the previous storage mechanism ([2](../current-architecture)) is also a start-up condition, though it is not a separate step: it happens inside the first read of the profile and of the conversations, as [3.4](./persistent-data) describes.

## Termination

The system has **no shutdown sequence**, and this is a decision rather than an omission.

The application may be terminated by the operating system at any moment, without notice and without an opportunity to run cleanup. A design that relied on a shutdown step to flush state would lose data exactly when the platform is least cooperative. The design therefore holds the opposite invariant:

> **Every change is durable at the moment it is made.** A store that changes its value writes it immediately, without waiting for the write to finish and without deferring it to a later point. There is nothing to flush at termination because nothing is held back.

Two forms of ending are distinguished:

**Signing out** is not a termination. It returns the interface to the login screen and makes the application's functions unreachable until credentials are supplied again. Stored data is untouched — signing out is not erasure — and the process continues to run.

**Process termination** releases nothing explicitly. The database connection, the timers, and the in-memory copy of the key are reclaimed with the process. The only consequence for correctness is a write that was in flight when the process ended; because writes are individual and small, the loss is bounded to the single change being made at that instant.

## Failure

### What is handled

| Failure | Response | Requirement |
|---------|----------|-------------|
| A stored preference value is malformed or unparseable | Fall back to the documented default; the application starts normally | [NFR-R.1](../../rad/proposed-system/non-functional/reliability) |
| No data has ever been stored | Fall back to the documented default | [NFR-R.1](../../rad/proposed-system/non-functional/reliability) |
| A photograph cannot be obtained from the gallery | Report the failure; the surrounding task remains usable and the previously held photograph is retained | [NFR-R.5](../../rad/proposed-system/non-functional/reliability), [UC1](../../rad/proposed-system/system-models/use-case-model), [UC7](../../rad/proposed-system/system-models/use-case-model) |
| A submitted field is unacceptable | Report the fault beside the field; retain the other values | [FR-A.1.3](../../rad/proposed-system/functional) |
| Credentials are not recognised | Report failure without distinguishing which was wrong | [UC2](../../rad/proposed-system/system-models/use-case-model) |
| Stored encrypted content has been altered | The authentication tag fails verification, so the alteration is detected rather than yielding wrong data | [NFR-R.3](../../rad/proposed-system/non-functional/reliability) |

### A gap in this design, recorded

Recovery from unreadable data is **not applied uniformly**, and the design does not currently meet [NFR-R.1](../../rad/proposed-system/non-functional/reliability) in full.

The preference-store path degrades as required: a malformed value is caught and the default is returned. The **encrypted database path does not**. A payload that cannot be decrypted — because it was altered, truncated, or written under a key that is no longer available — raises a failure that no component catches. Because the six initialisations of the start-up sequence are awaited before the interface starts, that failure occurs *before the login screen is reached*, and the application does not start at all.

This is precisely the outcome [NFR-R.1](../../rad/proposed-system/non-functional/reliability) exists to forbid: *a damaged record must never prevent the application from starting*. Detection is correct — the authentication tag does its work, and [NFR-R.3](../../rad/proposed-system/non-functional/reliability) is met — but detection without recovery converts a damaged field into an unusable application.

The gap is narrow and its correction is known: the read paths of the Persistence subsystem should treat a decryption failure the way the preference readers treat a parse failure — discard the unreadable record, return the documented default, and let the application start. The choice belongs at the Persistence subsystem because that is where [3.2](./subsystem-decomposition) places the knowledge that data is encrypted at all; recovering above it would require the layers above to know what they are deliberately kept ignorant of.

It is recorded here rather than in a defect list because it is a **property of the design**, not of a particular line of code: the design specified detection and did not specify recovery.

### What is out of scope

Failures arising from a network, a remote service, or a second node do not exist for this system. Crash reporting is deferred by [RAD 3.3.2](../../rad/proposed-system/non-functional/reliability) because it requires a service to receive the reports, and there is none.

## Goals and requirements served

| Serves | How |
|--------|-----|
| [DG-2](../introduction/design-goals) Survival of data | Durability at the moment of change rather than at shutdown; idempotent first-run configuration |
| [DG-1](../introduction/design-goals) Confidentiality | The key is created at the boundary and never leaves the OS key store |
| [NFR-R.1](../../rad/proposed-system/non-functional/reliability) | **Partly** — see the gap recorded above |
| [NFR-R.3](../../rad/proposed-system/non-functional/reliability), [NFR-R.5](../../rad/proposed-system/non-functional/reliability) | Alteration detected; optional operations fail without taking the task with them |
| [NFR-R.4](../../rad/proposed-system/non-functional/reliability) | Migration performed once, inside the first read |
