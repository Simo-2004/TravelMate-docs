# 1. Introduction

The ODD specifies the object design of TravelMate: the class structures, interfaces and constraints that developers implement directly. Where the [SDD](../../sdd/overview) fixed the subsystems, the persistence strategy and the global control flow, this document narrows the focus to individual objects — their responsibilities, their operations, and the patterns chosen to realise them.

A small number of patterns recur across the specification and are introduced once here rather than repeated at every occurrence:

- **Singleton** — each state-owning class and the database connection are reached through one lazily-created instance, so that no two parts of the application hold independent copies of the same state or open a second handle to the same file.
- **Repository** — access to stored data is mediated by one repository per kind of data, so that the shape of a domain object and the shape of a stored row vary independently of each other.
- **Adapter** — the two operations that reach a platform facility directly — the OS key store and the device's photo gallery — are each wrapped behind an interface the rest of the design depends on, not on the underlying plugin.

The system is realised as a single application, decomposed into the seven packages of [SDD 3.2](../../sdd/proposed-architecture/subsystem-decomposition); [2. Packages](../packages) restates that decomposition at the level this document requires.

## Contents

- [1.1 Object Design Trade-offs](./trade-offs)
- [1.2 Interface Documentation Guidelines](./interface-guidelines)
- [1.3 Definitions, Acronyms & Abbreviations](./definitions)
- [1.4 References](./references)
