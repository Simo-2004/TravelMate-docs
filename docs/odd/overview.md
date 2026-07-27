# ODD — Object Design Document

> **Status: skeleton.** The structure of this document is fixed; the chapters are placeholders and their content is to be written.

This document records the object design of TravelMate: the refinement of the subsystems established in the [SDD](../sdd/overview) into the classes that realise them, and the specification of the interfaces through which those classes are addressed.

Where the SDD states how the system is organised as a whole, this document states how each subsystem is built from individual objects. It fixes the trade-offs settled during object design, the conventions every interface obeys, the organisation of the source into packages, and the public interface of each class.

## Relationship to the other documents

| Document | Question answered | Level |
|----------|-------------------|-------|
| [RAD](../rad/overview) | What must the system do, for whom, under what constraints? | Application domain |
| [SDD](../sdd/overview) | How is the system organised as a whole? | Architecture |
| **ODD** (this document) | How is each subsystem specified as classes and interfaces? | Individual objects |

The three documents form a chain in which each is answerable to the one before it. Every class specified here belongs to a subsystem defined in [SDD 3.2](../sdd/proposed-architecture/subsystem-decomposition), and every operation realises part of a service declared in [SDD 4](../sdd/subsystem-services). No class appears here that no subsystem contains.

## Audience

| Reader | Use made of this document |
|--------|---------------------------|
| System architect | Verifies that the classes are consistent with the system design |
| Developer | Implements classes and subsystems against a fixed interface |
| Tester | Derives test cases from interfaces, preconditions and postconditions |

## Scope

The specification covers the classes of the **delivered system**. Requirements the RAD marks as deferred have no classes here, and none are anticipated: specifying an interface for a subsystem this lifecycle does not build would fix a contract nothing can verify.

## Contents

- [1. Introduction](./introduction/) — trade-offs, interface conventions, terminology
- [2. Packages](./packages) — the organisation of the source into packages and their dependencies
- [3. Class Interfaces](./class-interfaces/) — the public interface of each class, by package
- [4. Glossary](./glossary) — object-design terminology
