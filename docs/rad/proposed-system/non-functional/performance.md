# 3.3.3 Performance `[Mixed]`

> All computation in Release 1.0 is local; there is no network round-trip. Response-time and throughput targets that presuppose a remote API are `[EM – Deferred]`.

## Response Times

- **NFR-P.1.1**: `[R1.0 – Frozen]` Search shall complete with no perceptible delay: the trip catalog is loaded from SQLite once at startup into an in-memory cache (`TripStore`) and searched synchronously thereafter, and the companion catalog is in-code
- **NFR-P.1.2**: `[R1.0 – Frozen]` Database writes shall be issued without blocking the UI: profile, bookmark, and chat persistence are fire-and-forget async calls that update in-memory state first, so the interface never waits on disk I/O
- **NFR-P.1.3**: `[R1.0 – Frozen]` The AES key shall be memoized after first retrieval, so repeated encrypt/decrypt operations avoid redundant secure-storage reads (`ProfileKeyProvider`)
- **NFR-P.1.4**: `[R1.0 – Frozen]` Password hashing is **deliberately slow** (100,000 PBKDF2 iterations) as a security control; the resulting login delay is an intentional trade-off, not a performance defect
- **NFR-P.1.5**: `[R1.0 – Frozen]` The simulated chat auto-reply shall arrive after a fixed, deliberate delay of 900ms (`ChatStore._replyDelay`), chosen to mimic a real reply rather than to meet a technical constraint
- **NFR-P.1.6**: `[EM – Deferred]` API response time (P95) shall be ≤ 500ms for read operations
- **NFR-P.1.7**: `[EM – Deferred]` Matching algorithm shall complete within 5 seconds for 10K+ profiles

## Throughput `[EM – Deferred]`

- **NFR-P.2.1**: System shall support at least 10,000 concurrent users
- **NFR-P.2.2**: API shall handle 1,000 requests per second
- **NFR-P.2.3**: Database shall support 500 concurrent connections
- **NFR-P.2.4**: Chat system shall handle 100 messages per second

> These targets presuppose the `[EM – Deferred]` remote backend and do not apply to a single-device, local-first application.

## Resource Utilization `[Mixed]`

- **NFR-P.3.1**: `[R1.0 – Frozen]` Mobile app package size shall remain reasonable for distribution as a GitHub Release APK (see Deployment)
- **NFR-P.3.2**: `[R1.0 – Frozen]` Profile photos shall be stored as files on disk and referenced by path, never as BLOBs in the database, keeping the database small and avoiding the memory cost of loading image bytes through SQLite (`ProfileImageStorage`)
- **NFR-P.3.3**: `[R1.0 – Frozen]` Chat messages shall be indexed by `mate_id` so retrieving a single conversation does not require a full table scan
- **NFR-P.3.4**: `[EM – Deferred]` API server CPU usage shall not exceed 70% under peak load

## Optimization `[Mixed]`

- **NFR-P.4.1**: `[R1.0 – Frozen]` Images shall use vector formats (SVG, via `flutter_svg`) where practical to minimise asset size
- **NFR-P.4.2**: `[R1.0 – Frozen]` Search ranking shall short-circuit: a candidate failing to match any search term is excluded before scoring the remaining terms (`mate_search.dart`, `trip_search.dart`)
- **NFR-P.4.3**: `[EM – Deferred]` Frontend shall implement lazy loading and virtualization for large server-backed lists
