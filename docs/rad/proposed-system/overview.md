# 3.1 Overview

The **envisioned** TravelMate system is a social platform for travellers whose end-state (the Complete Product Vision, Feasibility Study §3.1) is built on a 3-tier architecture:

- **Presentation Layer**: Flutter-based mobile app (MVVM architecture)
- **Application Layer**: A remote backend exposing an API
- **Data Layer**: A server-side relational database

The end-state implements intelligent matching algorithms, secure communication channels, and comprehensive user management to create a seamless travel companion discovery and coordination experience.

**Baseline of this lifecycle (Release 1.0):** as decided in the Feasibility Study (§3.2), the software delivered by the present lifecycle is a **self-contained, local-first** Flutter application. It is nonetheless a fully realised 2-layer client architecture — presentation/state above, and a **local relational data layer** (SQLite + DAO/repository pattern + AES-256-GCM encryption at rest) below. What it lacks is the network tier: there is no server and no second real user, so companion profiles are catalog data and their chat replies are generated on-device.

Accordingly, each requirement in this chapter is tagged **`[R1.0 – Frozen]`** (part of the delivered, frozen baseline, verified against the repository) or **`[EM – Deferred]`** (domain requirement deferred to a future Evolutionary Maintenance lifecycle). Only `[R1.0 – Frozen]` requirements bind the design and the code.

## Baseline scope summary

| Module | Area | Status |
|--------|------|--------|
| A.1 | Local account, sign-up & authentication | `[R1.0 – Frozen]` |
| A.1b | Email verification, social login, multi-user accounts | `[EM – Deferred]` |
| A.2 | Profile management (encrypted, with gallery photo) | `[R1.0 – Frozen]` |
| A.3 | Interests & trip tags | `[R1.0 – Frozen]` |
| A.4 | Privacy preferences (local, largely unenforced) | `[R1.0 – Frozen]` |
| B.1 | Trip & companion search (local catalog) | `[R1.0 – Frozen]` |
| B.2 | Weighted compatibility matching algorithm | `[EM – Deferred]` |
| B.3 | Trip browsing (SQLite-backed catalog) | `[R1.0 – Frozen]` (creation/join deferred) |
| C.1 | Saved items (bookmarks) | `[R1.0 – Frozen]` |
| C.2 | Simulated 1-to-1 chat (local auto-reply engine) | `[R1.0 – Frozen]` |
| C.2b | Real-time messaging between distinct users | `[EM – Deferred]` |
| C.3 | Notifications | `[EM – Deferred]` |
| D | Trip management (creation, join, server lifecycle) | `[EM – Deferred]` |
| E | Administration & moderation | `[EM – Deferred]` |
| F.1 | Local data persistence (SQLite) | `[R1.0 – Frozen]` |
| F.2 | Encryption at rest & credential security | `[R1.0 – Frozen]` |
