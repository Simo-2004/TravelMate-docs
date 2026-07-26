# 1.3 Definitions, Acronyms & Abbreviations

Terms of the **application domain** — Traveler, Companion, Trip, Bookmark, Conversation — are defined in the [RAD glossary](../../rad/glossary) and keep exactly the same meaning here. This section defines only what belongs to the **solution domain**.

## Documents

- **SDD** — System Design Document, this document
- **RAD** — [Requirements Analysis Document](../../rad/overview), which this design realises
- **ODD** — [Object Design Document](../../odd/classes), which specifies the classes realising this design

## Architecture

- **Subsystem** — A group of classes with a common purpose, offering a defined service to the rest of the system. The unit of decomposition in [3.2](../proposed-architecture/subsystem-decomposition).
- **Layer** — A horizontal grouping of subsystems offering services to the layer above. TravelMate uses a **closed** layering: a layer addresses only the one immediately below it.
- **Service** — The set of operations a subsystem offers, forming its interface. Specified in [4](../subsystem-services).
- **Coupling / Cohesion** — The degree to which a subsystem depends on others; the degree to which its own contents belong together. The design maximises the second and minimises the first.

## Solution-domain components

- **Store** — An observable holder of application state, notifying the presentation when the value it holds changes. The system's control objects are realised as stores.
- **Repository** — The component that translates between domain objects and stored rows, and that applies encryption. The only component that knows data is encrypted.
- **DAO** *(Data Access Object)* — The component that issues the actual storage commands. Declared as an interface, so the repository above it never depends on the storage engine.
- **Data source** — The component that chooses *where* a kind of data lives, and performs migration between stores when that choice changes.
- **Adapter** — A thin component whose only purpose is to satisfy an interface by delegating to a platform facility.

## Technical terms

- **Off-the-shelf component (COTS)** — A pre-existing component integrated rather than built. Enumerated in [3.3](../proposed-architecture/hardware-software-mapping).
- **AES-256-GCM** — An authenticated encryption algorithm: it conceals content and makes alteration of it detectable.
- **Nonce (IV)** — A value used once per encryption so that identical inputs do not produce identical outputs.
- **PBKDF2** — A deliberately slow key-derivation function, used to store a credential so that the original cannot be recovered from it.
- **Salt** — A value unique to each credential, mixed in before derivation so that identical credentials do not yield identical stored values.
- **Event loop** — The single-threaded scheduler that dispatches events and resumes suspended asynchronous operations. The basis of the control flow described in [3.6](../proposed-architecture/global-control-flow).
- **Observer** — The pattern by which the presentation is notified of state changes without the state holder knowing the presentation.
