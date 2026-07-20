# 3.3.3 Performance `[Mixed]`

> All computation in Release 1.0 is local (in-memory search over small mock catalogs); there is no network round-trip. Response-time and throughput targets that presuppose a remote API are `[EM – Deferred]`.

## Response Times

- **NFR-P.1.1**: `[R1.0 – Frozen]` Search and bookmark actions shall complete synchronously with no perceptible delay, since they operate on in-memory mock catalogs (`TripCatalog`, `MateCatalog`) with no I/O beyond `SharedPreferences` writes
- **NFR-P.1.2**: `[R1.0 – Frozen]` The simulated chat auto-reply shall arrive after a fixed, deliberate delay of 900ms (`ChatStore._replyDelay`), chosen to mimic a real reply rather than to meet a technical constraint
- **NFR-P.1.3**: `[EM – Deferred]` API response time (P95) shall be ≤ 500ms for read operations
- **NFR-P.1.4**: `[EM – Deferred]` Matching algorithm shall complete within 5 seconds for 10K+ profiles

## Throughput `[EM – Deferred]`

- **NFR-P.2.1**: System shall support at least 10,000 concurrent users
- **NFR-P.2.2**: API shall handle 1,000 requests per second
- **NFR-P.2.3**: Database shall support 500 concurrent connections
- **NFR-P.2.4**: Chat system shall handle 100 messages per second

> These targets presuppose the `[EM – Deferred]` remote backend and do not apply to a single-device, local-first application.

## Resource Utilization `[Mixed]`

- **NFR-P.3.1**: `[R1.0 – Frozen]` Mobile app package size shall remain reasonable for distribution as a GitHub Release APK (see Deployment)
- **NFR-P.3.2**: `[EM – Deferred]` API server CPU usage shall not exceed 70% under peak load

## Optimization `[Mixed]`

- **NFR-P.4.1**: `[R1.0 – Frozen]` Images shall use vector formats (SVG, via `flutter_svg`) where practical to minimise asset size
- **NFR-P.4.2**: `[R1.0 – Frozen]` Search ranking shall short-circuit: a candidate failing to match any search term is excluded before scoring the remaining terms (`mate_search.dart`, `trip_search.dart`)
- **NFR-P.4.3**: `[EM – Deferred]` Frontend shall implement lazy loading and virtualization for large server-backed lists
