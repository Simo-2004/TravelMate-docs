# 3.3.2 Reliability `[Mixed]`

> On-device error handling, database integrity, and data migration are `[R1.0 – Frozen]`; server availability, replication, and automated failover are `[EM – Deferred]`.

## Availability `[EM – Deferred]`

- **NFR-R.1.1**: System shall maintain 99.5% uptime (< 3.6 hours downtime/month)
- **NFR-R.1.2**: All critical features shall have automatic failover mechanisms
- **NFR-R.1.3**: Database shall be replicated across at least 2 geographic regions
- **NFR-R.1.4**: API servers shall be load-balanced with auto-scaling

> Not applicable to a single-device application with no server component.

## Error Handling `[R1.0 – Frozen]`

- **NFR-R.2.1**: Data sources shall fail safe: malformed or missing persisted values shall fall back to a documented default rather than crash the app (e.g. `PrivacySettingsData.read()` returns `PrivacySettings.defaults` on a decode error; `SqliteProfileData.read()` falls back to `PersonalProfile.defaultProfile` when neither the database nor the legacy store holds a profile)
- **NFR-R.2.2**: Legacy saved-item records written under an earlier field schema shall still resolve correctly via a documented fallback matching strategy (`SavedTripPreviewStore`)
- **NFR-R.2.3**: A failed profile-photo pick shall surface a user-facing error message rather than propagate an exception (`CreateAccountScreen._uploadPhoto`)

## Data Integrity `[R1.0 – Frozen]`

- **NFR-R.3.1**: Single-row tables (`personal_profile`, `account`) shall be written with a pinned primary key and replace-on-conflict semantics, so an update can never produce duplicate rows
- **NFR-R.3.2**: Schema creation shall be idempotent (`CREATE TABLE IF NOT EXISTS`) and safe to run on both fresh installs and upgrades from an earlier schema version
- **NFR-R.3.3**: A single shared database connection shall prevent concurrent open handles to the same database file
- **NFR-R.3.4**: Encrypted payloads shall be integrity-protected by the AES-GCM authentication tag, so silent corruption or tampering surfaces as a decryption failure rather than as corrupted data
- **NFR-R.3.5**: `[EM – Deferred]` The server-side database shall support ACID transactions and point-in-time backup

## Data Migration `[R1.0 – Frozen]`

- **NFR-R.4.1**: On upgrade from a previous app version, personal profile and chat history saved in `SharedPreferences` shall be imported into the encrypted database exactly once, so upgrading users do not lose data
- **NFR-R.4.2**: The migration shall be idempotent: it runs only when the destination table is empty, and the legacy store is never written to again

*Realised by*: `SqliteProfileData`, `SqliteChatData`, `PersonalProfileData.readStored()`.

## Crash Recovery `[Mixed]`

- **NFR-R.5.1**: `[EM – Deferred]` Mobile app shall not crash under normal operating conditions — no crash-reporting infrastructure exists in Release 1.0 to substantiate this as a measured property
- **NFR-R.5.2**: `[EM – Deferred]` Crash logs shall be automatically reported for analysis
