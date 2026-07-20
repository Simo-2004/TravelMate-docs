# 3.3.2 Reliability `[Mixed]`

> On-device error handling and data persistence are `[R1.0 – Frozen]`; server availability, replication, and automated failover are `[EM – Deferred]`.

## Availability `[EM – Deferred]`

- **NFR-R.1.1**: System shall maintain 99.5% uptime (< 3.6 hours downtime/month)
- **NFR-R.1.2**: All critical features shall have automatic failover mechanisms
- **NFR-R.1.3**: Database shall be replicated across at least 2 geographic regions
- **NFR-R.1.4**: API servers shall be load-balanced with auto-scaling

> Not applicable to a single-device, local-first application with no server component.

## Error Handling `[R1.0 – Frozen]`

- **NFR-R.2.1**: Local data repositories shall fail safe: malformed or missing `SharedPreferences` entries shall fall back to a documented default rather than crash the app (e.g. `PersonalProfileData.read()` and `PrivacySettingsData.read()` catch decode errors and return `PersonalProfile.defaultProfile` / `PrivacySettings.defaults`)
- **NFR-R.2.2**: Legacy saved-item records (from an earlier field schema) shall still resolve correctly via a documented fallback matching strategy (`SavedTripPreviewStore._matchesEntry`)

## Data Integrity `[R1.0 – Frozen]`

- **NFR-R.3.1**: Local writes to `SharedPreferences` shall be performed as a full read-modify-write of the serialized JSON value, avoiding partial updates
- **NFR-R.3.2**: `[EM – Deferred]` Database shall support ACID transactions and point-in-time backup — applies only to the future remote backend

## Crash Recovery `[Mixed]`

- **NFR-R.4.1**: `[EM – Deferred]` Mobile app shall not crash under normal operating conditions — no crash-reporting or verification infrastructure exists in Release 1.0 to substantiate this as a measured property
- **NFR-R.4.2**: `[EM – Deferred]` Crash logs shall be automatically reported for analysis
