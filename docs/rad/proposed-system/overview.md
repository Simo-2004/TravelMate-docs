# 3.1 Overview

The **envisioned** TravelMate system is a social platform for travellers whose end-state (the Complete Product Vision, Feasibility Study §3.1) is built on a 3-tier architecture:

- **Presentation Layer**: Flutter-based mobile app and web interface (MVVM architecture)
- **Application Layer**: Django-based REST API backend
- **Data Layer**: PostgreSQL relational database

The end-state implements intelligent matching algorithms, secure communication channels, and comprehensive user management to create a seamless travel companion discovery and coordination experience.

**Baseline of this lifecycle (Release 1.0):** as decided in the Feasibility Study (§3.2), the software delivered by the present lifecycle is a **self-contained, local-first** Flutter application. Accordingly, each requirement in this chapter is tagged **`[R1.0 – Frozen]`** (part of the delivered, frozen baseline) or **`[EM – Deferred]`** (domain requirement deferred to a future Evolutionary Maintenance lifecycle). Only `[R1.0 – Frozen]` requirements bind the design and the code.

## Baseline scope summary

| Module | Area | Status |
|--------|------|--------|
| A.1 | User registration & authentication | `[EM – Deferred]` |
| A.2 | Profile management | `[R1.0 – Frozen]` |
| A.3 | Interests & destinations | `[R1.0 – Frozen]` |
| A.4 | Privacy management (local settings) | `[R1.0 – Frozen]` (server-dependent items deferred) |
| B.1 | Travel companion search (local) | `[R1.0 – Frozen]` |
| B.2 | Matching algorithm (server-side scoring) | `[EM – Deferred]` |
| B.3 | Trip/destination search (local mock) | `[R1.0 – Frozen]` (join flows deferred) |
| C.1 | Saved items (bookmarks) | `[R1.0 – Frozen]` |
| C.2 | Integrated chat | `[EM – Deferred]` |
| C.3 | Notifications | `[EM – Deferred]` |
| D | Trip management (server lifecycle) | `[EM – Deferred]` |
| E | Administration & moderation | `[EM – Deferred]` |
