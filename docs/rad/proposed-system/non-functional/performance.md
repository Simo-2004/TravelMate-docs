# 3.3.3 Performance `[Mixed]`

> Mobile resource and render targets are frozen for Release 1.0; API throughput and scale requirements are `[EM – Deferred]`.

## Response Times `[Mixed]`

- **NFR-P.1.1**: API response time (P95) shall be ≤ 500ms for read operations
- **NFR-P.1.2**: Search queries shall respond within 2 seconds for standard filters
- **NFR-P.1.3**: Profile page shall load and render within 1 second (P95)
- **NFR-P.1.4**: Chat messages shall sync within 500ms (P95)
- **NFR-P.1.5**: Matching algorithm shall complete within 5 seconds for 10K+ profiles

## Throughput `[EM – Deferred]`

- **NFR-P.2.1**: System shall support at least 10,000 concurrent users
- **NFR-P.2.2**: API shall handle 1,000 requests per second
- **NFR-P.2.3**: Database shall support 500 concurrent connections
- **NFR-P.2.4**: Chat system shall handle 100 messages per second

## Resource Utilization `[Mixed]`

- **NFR-P.3.1**: Mobile app APK/IPA size shall not exceed 150MB
- **NFR-P.3.2**: Memory usage on mobile devices shall not exceed 200MB during normal operation
- **NFR-P.3.3**: API server CPU usage shall not exceed 70% under peak load
- **NFR-P.3.4**: Database query time shall be optimized with indexes (< 100ms for typical queries)

## Optimization `[Mixed]`

- **NFR-P.4.1**: Images shall be optimized and compressed (WebP format supported)
- **NFR-P.4.2**: API responses shall support field filtering to reduce payload size
- **NFR-P.4.3**: Database queries shall be optimized and avoid N+1 problems
- **NFR-P.4.4**: Frontend shall implement lazy loading and virtualization for lists
