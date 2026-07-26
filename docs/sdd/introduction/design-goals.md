# 1.2 Design Goals

Design goals are the qualities that guide architectural choice. They are derived from the non-functional requirements of [RAD 3.3](../../rad/proposed-system/non-functional/), classified below by the standard criteria, and ranked — because they conflict, and a design cannot maximise all of them at once.

Identifiers name the **category**, not the priority: `D` dependability, `M` maintenance, `P` performance, `U` end user, `C` cost. The ranking is a separate judgement, given after the list.

## The goals

### Dependability

**DG-D1 — Confidentiality of stored data.** Personal data and conversation content are unreadable, and credentials unrecoverable, to anyone holding the stored files without the key held by the operating system.
*Derived from NFR-I.3, NFR-I.4, NFR-L.2, NFR-L.3.*

**DG-D2 — Survival of data.** Stored data survives restarts and application upgrades without loss or duplication, and a damaged record never prevents the application from starting.
*Derived from NFR-R.1, NFR-R.2, NFR-R.4.*

### Maintenance

**DG-M1 — Testability without a device.** The logic of the system can be exercised in automated tests without a database engine, an operating-system key store, or a physical device, so that coverage above 80% is both attainable and meaningful.
*Derived from NFR-S.3, NFR-S.4.*

**DG-M2 — Isolation of the storage mechanism.** A change in how data is stored does not propagate into the logic or the presentation.
*Derived from NFR-S.2, NFR-S.7.*

**DG-M3 — Openness to a network tier.** Introducing a server later is an addition beneath the existing logic, not a rewrite of it.
*Derived from RAD objective 6.*

### Performance

**DG-P1 — Responsiveness.** Every interaction respects the bounds of RAD 3.3.3: search within 100 ms, visible state within one frame, credential verification within 1 s.

### End user

**DG-U1 — Directness of interaction.** Every principal function is reachable within three interactions, and every action that alters stored data is visibly confirmed.
*Derived from NFR-U.3, NFR-U.4.*

### Cost

**DG-C1 — Economy of construction.** The system is built by one developer within one academic lifecycle. Proven off-the-shelf components are preferred wherever one exists that meets the need.

## Priority

Where two goals conflict, the lower-ranked one yields.

| Rank | Goal | Why it ranks here |
|:----:|------|-------------------|
| 1 | **DG-D1** Confidentiality | The system holds personal data with no server to fall back on. A breach is irreversible. |
| 2 | **DG-D2** Survival of data | Data the Traveler cannot recover is a worse outcome than a function that is slow. |
| 3 | **DG-M1** Testability | Nothing else can be *demonstrated* to hold without it. It is the goal that makes the others verifiable. |
| 4 | **DG-M2** Isolation of storage | Governs the decomposition: cheap to honour if designed in, expensive to retrofit. |
| 5 | **DG-P1** Responsiveness | Genuinely required, but the bounds are generous for a system computing everything locally. |
| 6 | **DG-U1** Directness | Constrains presentation, the layer most tolerant of later change. |
| 7 | **DG-M3** Openness to a network tier | Serves a release this lifecycle does not deliver. Honoured where free, never at the cost of a goal above it. |
| 8 | **DG-C1** Economy | A constraint on effort, not a property of the system. |

Category and priority are independent, and visibly so: **DG-M3** sits seventh while its category peers rank third and fourth, and **DG-P1** overtakes the end-user goal. This table, not the classification above it, is what the design was decided by.

## Conflicts resolved

Four conflicts were settled explicitly, and each one shaped a decision recorded later in this document.

**DG-D1 against DG-P1 — protection against speed.** Credential verification is made *deliberately slow*; the cost of the derivation is what makes a stolen credential store useless. Confidentiality wins, but the expense is confined: it is paid at login and registration only, and never per record.

**DG-D1 against DG-P1 — encryption against queryability.** Encrypted columns cannot be searched, ordered or indexed by the database. Rather than encrypt everything and lose querying, or query everything and lose protection, protection is applied **per column**: readable content is encrypted, and the structural columns needed to retrieve and order it are not. [3.4](../proposed-architecture/persistent-data) records the choice for every column.

**DG-M1 against DG-C1 — testability against economy.** Placing an abstraction in front of every platform facility is more code than calling the plugins directly. Testability wins: each facility sits behind an interface, and the thin adapter implementing it is excluded from coverage measurement rather than counted as tested.

**DG-M3 against DG-C1 — openness against economy.** Openness is honoured only through decisions that cost nothing today: the logic depends on abstractions a networked implementation could equally satisfy. No server-shaped machinery — client stubs, synchronisation, conflict resolution — is built in anticipation. This is why DG-M3 ranks seventh: it earns a design that *permits* a network tier, not one that *provides for* it.
