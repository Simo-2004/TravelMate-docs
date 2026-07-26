# 1.5 Overview

The remainder of this document is organised as follows.

**[Chapter 2 — Current Software Architecture](../current-architecture)** states what the design starts from. TravelMate is greenfield: there is no system being replaced. The chapter records the one respect in which this is not quite true, and the obligation that follows from it.

**[Chapter 3 — Proposed Software Architecture](../proposed-architecture/)** is the substance of the document, in seven parts:

- **[3.1 Overview](../proposed-architecture/overview)** — the architectural style chosen, and why.
- **[3.2 Subsystem Decomposition](../proposed-architecture/subsystem-decomposition)** — the seven subsystems, their layering, and the coupling and cohesion the decomposition achieves.
- **[3.3 Hardware/Software Mapping](../proposed-architecture/hardware-software-mapping)** — the single node the system runs on, and the off-the-shelf components integrated into it.
- **[3.4 Persistent Data Management](../proposed-architecture/persistent-data)** — what is stored, in which of the three mechanisms, in what schema, and how it is carried across upgrades.
- **[3.5 Access Control & Security](../proposed-architecture/access-control)** — the access matrix, authentication, and the protection of data at rest.
- **[3.6 Global Software Control](../proposed-architecture/global-control-flow)** — the control model, and how concurrency is handled without threads.
- **[3.7 Boundary Conditions](../proposed-architecture/boundary-conditions)** — start-up, termination, and failure.

**[Chapter 4 — Subsystems & Services](../subsystem-services)** specifies the interface each subsystem offers the others: the contract on which the [ODD](../../odd/classes) builds.

**[Chapter 5 — Glossary](../glossary)** defines the solution-domain terms.

Each of the seven parts of Chapter 3 corresponds to one decision area of system design, and each closes by naming the design goals of [1.2](./design-goals) it serves and the requirements it realises. Class-level detail — signatures, types, visibility, pre- and postconditions — belongs to the ODD and is deliberately absent here.
