# 5. Glossary

Terms of the **solution domain**, as used in this document. Application-domain terms — Traveler, Companion, Trip, Bookmark, Conversation, Presence — keep the meanings given in the [RAD glossary](../rad/glossary) and are not repeated. The abbreviations of [1.3](./introduction/definitions) are not repeated either.

## Architecture

**Subsystem** — A group of classes with a common purpose, offering a defined service. The unit of decomposition; there are seven, listed in [3.2](./proposed-architecture/subsystem-decomposition).

**Layer** — A horizontal grouping of subsystems offering services upward. TravelMate has three.

**Closed layering** — A layering in which a layer addresses only the one immediately below it. Adopted, for maintainability.

**Open layering** — A layering in which a layer may address any layer below it. Rejected; it buys efficiency the system does not need.

**Partition** — Subsystems at the same level with distinct responsibilities, as opposed to stacked layers.

**Coupling** — The degree to which one subsystem depends on another. Kept low by depending on interfaces rather than implementations.

**Cohesion** — The degree to which the contents of one subsystem belong together. Kept high by grouping what changes together and for the same reason.

**Service** — The operations a subsystem offers, forming its interface. Specified in [4](./subsystem-services).

**Design goal** — A quality guiding architectural choice, derived from a non-functional requirement. Ranked in [1.2](./introduction/design-goals), because they conflict.

## Architectural styles

**Three-layer architecture** — Interface, application logic, storage. The style adopted.

**Model–View–Controller (MVC)** — A style separating state, its presentation, and the handling of input, in which the model does not know its views. Adopted within the upper two layers.

**Repository style** — A style in which subsystems address a shared store through a single point rather than directly. Adopted in part: the storage layer is that single point.

**Client/Server, Peer-to-Peer** — Styles presupposing more than one node. Rejected; there is one.

**Pipes and Filters** — A style for data transformed in successive stages. Rejected; the system is interactive, not a pipeline.

## Solution-domain components

**Store** — An observable holder of one kind of application state, publishing its changes. Realises the control objects of the analysis model, grouped by state rather than by use case ([3.6](./proposed-architecture/global-control-flow)).

**Repository** — Translates between domain objects and stored rows, and applies encryption. The only component that knows data is encrypted.

**DAO (Data Access Object)** — Issues storage commands, expressed in rows rather than domain objects. Declared as an interface.

**Data source** — Decides which mechanism holds a kind of data, and performs store fallback when that decision changes.

**Adapter** — A component whose only purpose is to satisfy an interface by delegating to a platform facility. The only device-dependent code in the system.

**Off-the-shelf component (COTS)** — A pre-existing component integrated rather than built. Listed in [3.3](./proposed-architecture/hardware-software-mapping).

## Control

**Event-driven control** — Control in which the system waits and reacts, rather than executing a predetermined sequence. The mechanism adopted.

**Procedure-driven control** — Control determined by the order of the code. Rejected; an interactive system cannot decide when input is needed.

**Thread-based control** — Control in which several flows proceed in parallel. Rejected; one user, no computation long enough to justify it.

**Event loop** — The single-threaded scheduler dispatching events and resuming suspended asynchronous operations.

**Observer** — The pattern by which a store notifies subscribed views without knowing them.

**Idempotent** — An operation producing the same result whether performed once or repeatedly. The property required of every start-up action ([3.7](./proposed-architecture/boundary-conditions)).

## Persistence and security

**Schema version** — The number identifying the shape of the database, raised when tables are added so that existing installations create what they lack.

**Upsert** — A write that replaces an existing row rather than adding a second one. How single-row tables enforce uniqueness.

**Store fallback** — Reading from a secondary store when the primary one holds nothing, and promoting what is found into the primary store. The mechanism by which data is carried forward when the store holding a kind of data changes; performed once, inside the first read.

**Seeding** — Writing built-in content on a first run only, so that a later run never overwrites the Traveler's data.

**Encryption at rest** — Protection applied to data as stored. Distinct from protection in use, which this design does not provide ([3.5](./proposed-architecture/access-control)).

**Authenticated encryption** — Encryption that additionally makes alteration detectable, through a tag verified on decryption.

**Nonce (IV)** — A value used once per encryption, so that identical inputs do not yield identical stored payloads. Stored alongside the payload it belongs to.

**Key derivation** — Producing a storable value from a credential by a deliberately costly, one-way computation.

**Salt** — A value unique to each credential, mixed in before derivation, so that identical credentials do not yield identical stored values.

**Access matrix** — The statement of which subject may perform which operation on which resource. Given in [3.5](./proposed-architecture/access-control).

**Static access control** — Rights fixed at design time. Adopted; there is one subject and no role hierarchy.
