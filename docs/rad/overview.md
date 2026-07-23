# RAD - Requirements Analysis Document

> **Methodological Note:** This Requirements Analysis Document (RAD) represents the formal output of the Requirements Analysis phase, produced under the sequential, document-driven life cycle described in [Software Life Cycle Model Choice](#software-life-cycle-model-choice) below. It captures the complete requirement set of the envisioned TravelMate platform for traceability, while formally distinguishing the scope committed to in the present lifecycle.

## Software Life Cycle Model Choice

Although the project follows a sequential approach for drafting its documentation (RAD, SDD, ODD), the life cycle adopted departs from the pure Waterfall model in favor of a **V-Model with feedback**.

This engineering choice was driven by the need to integrate modern Continuous Integration practices (via GitHub Actions) and static/dynamic code analysis (via SonarCloud). The V-Model preserves the documentary rigor typical of sequential models, while pairing each design phase with a corresponding verification and validation phase. Specifically, the development of software components was constantly validated through Unit Testing, ensuring Code Coverage above 80% and enabling rapid feedback cycles for defect correction.

> **Baseline scope and requirement tagging:** As established in the Feasibility Study (§3.2), this lifecycle delivers **Release 1.0**, a local-first application: it runs entirely on the device, with a local **SQLite** database, **AES-256-GCM encryption** for sensitive data, and **PBKDF2** password hashing — but no remote server and no other real users. Every requirement in this document is therefore tagged:
> - **`[R1.0 – Frozen]`** — part of the Release 1.0 baseline, verified against the current repository. These requirements are reviewed, approved, and officially **frozen**, and constitute the unalterable input for the System Design phase.
> - **`[EM – Deferred]`** — a domain requirement recorded for completeness but **deferred to a future Evolutionary Maintenance lifecycle**. It is *not* part of the frozen baseline and does not bind the design, implementation, testing, or deployment of Release 1.0.
>
> This separation guarantees the V-Model principle of **design = code, verified against it**: every `[R1.0 – Frozen]` requirement traces to a concrete class or screen in `Simo-2004/TravelMate` and to a corresponding verification step (see [System Testing](/system-testing)), and no `[EM – Deferred]` requirement is described as if it were already realised.

## Overview

TravelMate is a mobile application designed to connect travelers with similar interests. The **Release 1.0 baseline** authenticates the user against a locally stored account, then lets them browse a catalog of trips and companion profiles, rank both by a free-text search query, bookmark favourites, maintain an encrypted personal profile with a photo picked from the device gallery, adjust privacy preferences, and hold a **simulated conversation** with a companion through a local, keyword-based auto-reply engine. Everything runs offline against a local SQLite database; there is no server and no other real user.

### Project Vision

The long-term vision (documented in full in the Feasibility Study, §3.1) is a platform that bridges the gap between solo travelers seeking companionship and group travelers looking for like-minded individuals, connected through a real backend, multi-user accounts, and real messaging. Realising that vision is **out of scope** for this lifecycle and is recorded here only for traceability, tagged `[EM – Deferred]`.

### Key Features (Release 1.0)

- **Local Account & Authentication**: Sign-up and login against a single account persisted in SQLite, with an AES-encrypted username and a PBKDF2 salted password hash
- **Encrypted Personal Profile**: Identity, description, interest/trip tags and photo path stored as AES-256-GCM ciphertext in the local database
- **Trip & Companion Catalog**: Trips persisted in SQLite (seeded once from a static catalog); companion profiles served from a fixed in-code catalog
- **Search & Discovery**: Keyword search and term-based ranking across trips and companions
- **Simulated Chat**: A local, per-companion conversation with a keyword-matched auto-reply engine, encrypted message text at rest, simulated presence, and trip sharing
- **Saved Items**: Bookmarking of trips and companion profiles, persisted on-device
- **Privacy Preferences**: Local toggles persisted on-device
