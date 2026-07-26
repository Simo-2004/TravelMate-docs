# 2. Current Software Architecture

## Overview

Travellers currently coordinate journeys through general-purpose software not designed for the purpose: social platforms, travel forums, messaging applications, and agency booking systems.

[RAD 2](../rad/current-system) examines these from the standpoint of the traveller's needs. This section examines them as **software systems** — their architecture, the interfaces they expose, and the data they hold — in order to establish whether any of them can be integrated with, extended, or built upon, and what constraints their properties place on the architecture of TravelMate.

## Existing Systems

| System category | Architecture | Interface exposed to third parties | Data relevant to companion finding |
|-----------------|--------------|------------------------------------|-----------------------------------|
| **Social platforms** | Centralised client/server over a closed social graph | Programmatic interfaces oriented to publishing on the authenticated user's own behalf; group membership and third-party content not exposed | Travel intentions appear as unstructured prose inside general-purpose posts |
| **Travel forums** | Server-rendered web portals | Published for human readers; no documented programmatic interface | Discussion threads, unstructured and unindexed by intent |
| **Messaging applications** | Centralised client/server with end-to-end encrypted content | Bot and notification interfaces only; message content unreadable to third parties by design | Conversations, inaccessible by construction |
| **Agency and booking systems** | Business-to-business distribution systems | Reachable only under commercial agreement | Inventory and itineraries; no traveller profile or availability data |

## Integration Assessment

TravelMate requires structured data about travellers: their interests, the journeys they are drawn to, and their availability to travel with someone. None of the systems above holds that data in a form that can be obtained programmatically.

| Question | Finding |
|----------|---------|
| Does any system expose the required data through a documented interface? | No. Interfaces are oriented to publishing, not to querying other users' content. |
| Could the required data be derived from what is exposed? | No. Where travel intent appears at all it is unstructured prose, not attributes. |
| Is identity federation available? | Not on terms compatible with a system holding all data on the device. |
| Is any existing system's logic being preserved? | No. |

The development context is therefore **greenfield**, in the specific sense that matters to system design: there is no existing architecture to conform to, no legacy interface to wrap, and no existing logic to preserve. The design is unconstrained in its structure — and equally unassisted, since nothing can be reused.

## Architectural Constraints

The absence of an integrable system is not a neutral finding. It determines four properties of the proposed architecture.

| Constraint | Consequence for the design |
|------------|---------------------------|
| No external source of trip or companion data | The catalogue must be supplied with the application and served from local storage |
| No identity provider usable on these terms | The account must be established, stored and verified on the device |
| No external system to interoperate with | Schema, data representation and internal interfaces are chosen freely |
| No party consuming data from TravelMate | The system exposes no external interface either, as [RAD 3.3.6](../rad/proposed-system/non-functional/interface) records |

The first two constraints are the reason the system is self-contained on one device rather than the result of a preference for local storage: with no data source and no identity provider to call, there is nothing for a network tier to do in this release.

## Design Response

The proposed architecture answers these constraints as follows, each specified in Chapter 3:

- A **single node** carrying the whole system, since no external node holds anything it needs ([3.3](./proposed-architecture/hardware-software-mapping)).
- **Local persistence** of every kind of data, with the storage mechanism chosen per kind rather than imposed by an external schema ([3.4](./proposed-architecture/persistent-data)).
- **Local authentication and protection at rest**, since the device rather than a server is the trust boundary ([3.5](./proposed-architecture/access-control)).
- **Off-the-shelf components** for persistence, cryptography and media selection, which is the only reuse available where no existing system can be built upon ([3.3](./proposed-architecture/hardware-software-mapping)).

| Constraint | Response in the proposed architecture |
|------------|---------------------------------------|
| Catalogue must be local | Trip catalogue seeded into the database on first run and read from it thereafter |
| Account must be local | Single-row account table with a one-way derived credential ([NFR-I.4](../rad/proposed-system/non-functional/implementation)) |
| Device is the trust boundary | Authenticated field-level encryption under a key held by the operating system ([NFR-I.3](../rad/proposed-system/non-functional/implementation)) |
| No external schema to conform to | Storage mechanism selected per kind of data and confined to one subsystem ([NFR-S.2](../rad/proposed-system/non-functional/supportability)) |
| No reuse of existing systems available | Established components integrated behind application-declared interfaces ([NFR-S.3](../rad/proposed-system/non-functional/supportability)) |
