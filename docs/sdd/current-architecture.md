# 2. Current Software Architecture

TravelMate is **greenfield**: it replaces no existing software system. There is no prior architecture to describe, no legacy interface to preserve, and no data belonging to another system to migrate. The alternatives travellers use today — social media groups, forums, agencies — are examined in [RAD 2](../rad/current-system) as a problem domain, not as systems this design must interoperate with.

The design therefore starts from the analysis model rather than from an existing structure, and is free in every architectural choice it makes.

## The one exception

Greenfield does not mean there is nothing to carry forward. An earlier state of the application persisted the personal profile and the chat history through the platform's simple key–value preference store. The current design stores both in an encrypted relational database instead.

This is not project history: it is a **live obligation on the design**. Copies of the application holding data in the earlier form exist on devices, and [NFR-R.4](../rad/proposed-system/non-functional/reliability) requires that an upgrade carry that data forward exactly once, without loss and without duplication.

The design meets this obligation by placing the decision of *where* a kind of data lives in a dedicated component — the data source of [3.2](./proposed-architecture/subsystem-decomposition) — which, on its first read, looks in the new store, falls back to the old one, and promotes what it finds. [3.4](./proposed-architecture/persistent-data) specifies the mechanism, and [3.7](./proposed-architecture/boundary-conditions) treats it as a start-up condition.

The consequence for the architecture is that **the choice of storage mechanism is not permitted to be visible above the persistence layer**. It has already changed once; it is exactly the kind of decision that changes again. This is the origin of design goal [DG-4](./introduction/design-goals).
