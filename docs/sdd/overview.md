# SDD — System Design Document

This document records the system design of TravelMate: the transformation of the analysis model established in the [RAD](../rad/overview) into an architecture that can be built.

Where the RAD states **what** the system must do, this document states **how** it is organised to do it. It fixes the design goals and their priority, decomposes the system into subsystems, and settles the six design decisions that cut across all of them: the mapping onto hardware and off-the-shelf software, the management of persistent data, access control and security, the global control flow, and the behaviour at the system's boundaries.

## Relationship to the other documents

| Document | Question answered | Level |
|----------|-------------------|-------|
| [RAD](../rad/overview) | What must the system do, for whom, under what constraints? | Application domain |
| **SDD** (this document) | How is the system organised as a whole? | Architecture |
| [ODD](../odd/overview) | How are the classes realising each subsystem specified? | Individual objects |

Every design decision recorded here is traceable to a requirement in the RAD, and no requirement of the delivered system is left without a corresponding decision. Terms belonging to the application domain are defined in the [RAD glossary](../rad/glossary); terms belonging to the solution domain are defined in [5. Glossary](./glossary).

## Scope

The design described here is that of the **delivered system**: a self-contained application running entirely on the Traveler's own device, with no server component and no network tier. Requirements the RAD marks as deferred have no design in this document — designing for a server that this lifecycle does not build would be speculation, not engineering.

## Contents

- [1. Introduction](./introduction/) — purpose, design goals and their priority, terminology
- [2. Current Software Architecture](./current-architecture) — what the design starts from
- [3. Proposed Software Architecture](./proposed-architecture/) — the architecture itself, in seven parts
- [4. Subsystems & Services](./subsystem-services) — the interface each subsystem offers the others
- [5. Glossary](./glossary) — solution-domain terminology
