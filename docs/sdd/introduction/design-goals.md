# 1.2 Design Goals

Design goals are the qualities that guide architectural choice. They are derived from the non-functional requirements of [RAD 3.3](../../rad/proposed-system/non-functional/), classified below by the standard criteria — dependability, performance, maintenance, end user, cost — and, most importantly, **ranked**, because they conflict and a design cannot maximise all of them at once.

## The goals

### Dependability

**DG-1 — Confidentiality of stored data.** Personal data and conversation content must be unreadable, and credentials unrecoverable, to anyone who obtains the stored files without the key held by the operating system. *From [NFR-I.3](../../rad/proposed-system/non-functional/implementation), [NFR-I.4](../../rad/proposed-system/non-functional/implementation), [NFR-L.2](../../rad/proposed-system/non-functional/legal), [NFR-L.3](../../rad/proposed-system/non-functional/legal).*

**DG-2 — Survival of data.** Stored data must survive restarts and application upgrades without loss or duplication, and a damaged record must never prevent the application from starting. *From [NFR-R.1](../../rad/proposed-system/non-functional/reliability), [NFR-R.2](../../rad/proposed-system/non-functional/reliability), [NFR-R.4](../../rad/proposed-system/non-functional/reliability).*

### Maintenance

**DG-3 — Testability without a device.** The logic of the system must be exercisable in automated tests without a database engine, an operating-system key store, or a physical device, so that coverage above 80% is attainable and meaningful. *From [NFR-S.3](../../rad/proposed-system/non-functional/supportability), [NFR-S.4](../../rad/proposed-system/non-functional/supportability).*

**DG-4 — Isolation of the storage mechanism.** A change in how data is stored must not propagate into the logic or the presentation. *From [NFR-S.2](../../rad/proposed-system/non-functional/supportability), [NFR-S.7](../../rad/proposed-system/non-functional/supportability).*

**DG-5 — Openness to a network tier.** Introducing a server later must be an addition beneath the existing logic, not a rewrite of it. *From [RAD 1.3, objective 6](../../rad/introduction/objectives).*

### Performance

**DG-6 — Responsiveness.** Every interaction must respect the bounds of [RAD 3.3.3](../../rad/proposed-system/non-functional/performance): search within 100 ms, visible state within one frame, credential verification within 1 s.

### End user

**DG-7 — Directness of interaction.** Every principal function must be reachable within three interactions, and every action that alters stored data must be visibly confirmed. *From [NFR-U.3](../../rad/proposed-system/non-functional/usability), [NFR-U.4](../../rad/proposed-system/non-functional/usability).*

### Cost

**DG-8 — Economy of construction.** The system is built by one developer within one academic lifecycle. Proven off-the-shelf components are preferred to bespoke ones wherever a component exists that meets the need.

## Priority and resolution of conflicts

The goals are ranked as follows. Where two conflict, the higher-numbered goal yields.

| Rank | Goal | Why it ranks here |
|------|------|-------------------|
| 1 | **DG-1** Confidentiality | The system holds personal data with no server to fall back on; a breach is unrecoverable and irreversible. |
| 2 | **DG-2** Survival of data | Data the Traveler cannot get back is worse than a function that is slow. |
| 3 | **DG-3** Testability | Nothing else can be *demonstrated* to hold without it. It is the goal that makes the others verifiable. |
| 4 | **DG-4** Isolation of storage | Governs the decomposition; cheap to honour if designed in, expensive to retrofit. |
| 5 | **DG-6** Responsiveness | Genuinely required, but the bounds are generous for a device-local system. |
| 6 | **DG-7** Directness | Constrains presentation, which is the layer most tolerant of later change. |
| 7 | **DG-5** Openness to a network tier | Serves a release this lifecycle does not deliver. Honoured where free, never at the cost of goals above it. |
| 8 | **DG-8** Economy | A constraint on effort, not a property of the system. |

### The conflicts that were actually resolved

**DG-1 against DG-6 — protection against speed.** Credential verification is made *deliberately slow*: the cost function is what makes a stolen credential store useless. Confidentiality wins, but only where the cost is confined. The resolution is that the expense is paid at login and registration alone ([NFR-P.3](../../rad/proposed-system/non-functional/performance)), and never on a per-record basis.

**DG-1 against DG-6 — encryption against queryability.** Encrypted columns cannot be searched or ordered by the database. Rather than encrypt everything and lose querying, or query everything and lose protection, protection is applied **per column**: readable content is encrypted, and the structural columns needed to retrieve and order it are not. [3.4](../proposed-architecture/persistent-data) records the choice for every column, and [NFR-I.5](../../rad/proposed-system/non-functional/implementation) is the requirement it satisfies.

**DG-3 against DG-8 — testability against economy.** Making the logic testable without a device requires an abstraction in front of every platform facility, which is more code than calling the plugins directly. DG-3 wins: each platform facility sits behind an interface, and the thin adapter that implements it is excluded from coverage measurement rather than pretended to be tested.

**DG-4 against DG-6 — isolation against directness of access.** Routing all storage through repositories adds a level of indirection over calling the database from the logic. DG-4 wins; the cost is negligible because the data volumes are small.

**DG-5 against DG-8 — openness against economy.** Openness is honoured only through decisions that cost nothing today: the logic depends on abstractions that a networked implementation could also satisfy. No server-shaped machinery — no client stubs, no synchronisation, no conflict resolution — is built in anticipation. This is why DG-5 ranks seventh: it earns a design that *permits* a network tier, never one that *provides for* it.
