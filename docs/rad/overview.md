# RAD - Requirements Analysis Document

> **Methodological Note:** In strict adherence to the Waterfall model, this Requirements Analysis Document (RAD) represents the formal output of the Requirements Analysis phase. It captures the complete requirement set of the envisioned TravelMate platform for traceability, while formally distinguishing the scope committed to in the present lifecycle.

> **Baseline scope and requirement tagging:** As established in the Feasibility Study (§3.2), this lifecycle delivers **Release 1.0**, a local-first application whose behaviour is entirely simulated on-device (mock data, local persistence, a keyword-driven chat auto-reply engine — no server, no other real users). Every requirement in this document is therefore tagged:
> - **`[R1.0 – Frozen]`** — part of the Release 1.0 baseline, verified against the current repository. These requirements are reviewed, approved, and officially **frozen**, and constitute the unalterable input for the System Design phase.
> - **`[EM – Deferred]`** — a domain requirement recorded for completeness but **deferred to a future Evolutionary Maintenance lifecycle**. It is *not* part of the frozen baseline and does not bind the design, implementation, testing, or deployment of Release 1.0.
>
> This separation guarantees the Waterfall principle of **design = code**: every `[R1.0 – Frozen]` requirement traces to a concrete class or screen in `Simo-2004/TravelMate`, and no `[EM – Deferred]` requirement is described as if it were already realised.

## Overview

TravelMate is a mobile application designed to connect travelers with similar interests. The **Release 1.0 baseline** lets a user browse a catalog of mock trips and mock companion profiles, search and filter both, bookmark the ones they like, edit a local personal profile, adjust privacy preferences, and hold a **simulated conversation** with a companion through a local, keyword-based auto-reply engine — entirely offline, with no server and no other real users.

### Project Vision

The long-term vision (documented in full in the Feasibility Study, §3.1) is a platform that bridges the gap between solo travelers seeking companionship and group travelers looking for like-minded individuals, connected through a real backend, real accounts, and real messaging. Realising that vision is **out of scope** for this lifecycle and is recorded here only for traceability, tagged `[EM – Deferred]`.

### Key Features (Release 1.0)

- **Trip & Companion Catalog**: Browsable mock trips and mock companion profiles with rich detail screens
- **Search & Discovery**: Keyword search and ranking across trips and companions
- **Simulated Chat**: A local, per-companion conversation with a keyword-matched auto-reply engine, simulated online/offline presence, and the ability to share a saved trip inside the chat
- **Saved Items**: Bookmarking of trips and companion profiles, persisted on-device
- **Personal Profile & Privacy Preferences**: Local profile editing and privacy toggles, persisted on-device
