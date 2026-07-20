# 1.6 Overview

This document outlines the complete requirements for the TravelMate application, including functional and non-functional requirements, system architecture, and design specifications. Requirements are tagged `[R1.0 – Frozen]` (realised by the Release 1.0 codebase) or `[EM – Deferred]` (envisioned, not part of this lifecycle), as defined in the RAD's [top-level Methodological Note](../overview).

## Repository snapshot (ground truth)

This RAD was verified directly against the codebase at `https://github.com/Simo-2004/TravelMate`. The Release 1.0 application is a Flutter mobile app with the following verified characteristics:

- **Local-first architecture**: all persistence is via `SharedPreferences` (see `lib/shared/data/`); the only declared dependencies are `flutter`, `cupertino_icons`, `flutter_svg`, and `shared_preferences` — no networking package is present
- **State management**: `ValueNotifier`-based singleton stores (see `lib/shared/state/`)
- **Mock data catalogs**: trips and companions are static/generated mock data (`lib/shared/data/trip_catalog.dart`, `lib/shared/data/mate_catalog.dart`)
- **Simulated chat**: a fully local, per-companion chat with a keyword-matched auto-reply engine, persisted history, and simulated online/offline presence (`lib/features/chat/`, `lib/shared/state/chat_store.dart`)
- **No backend server implementation** is present in the repository; backend components described in this RAD are `[EM – Deferred]` to a future Evolutionary Maintenance lifecycle

Every functional and non-functional requirement, and every model in this RAD, was cross-checked against the classes and screens listed above before being tagged. Where the previous edition of this document described a component (e.g. an `age`/`location` profile field, a percentage-weighted matching algorithm, or an already-integrated backend) that does not exist in the repository, that description has been corrected or moved to the `[EM – Deferred]` vision.
