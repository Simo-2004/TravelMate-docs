# 3.3.2 Reliability

Reliability requirements concern the system's ability to preserve the Traveler's data and to behave predictably when something goes wrong.

**NFR-R.1 — Tolerance of unreadable data.** If stored data cannot be read or interpreted, the system shall fall back to a documented default state rather than fail, so that a damaged record can never prevent the application from starting.

**NFR-R.2 — Integrity of unique records.** Records that exist in a single instance — the account and the personal profile — shall be written so that an update replaces the existing record rather than creating a second one.

**NFR-R.3 — Detection of alteration.** Encrypted content shall be stored in a form that makes alteration detectable, so that corruption surfaces as an explicit failure rather than as silently incorrect data.

**NFR-R.4 — Preservation of data across upgrades.** When the application is updated, data written by a previous version shall be carried forward exactly once, without loss and without duplication.

**NFR-R.5 — Containment of failures.** The failure of an optional operation, such as selecting a photograph, shall be reported to the Traveler and shall leave the surrounding task usable.

**NFR-R.6 — Single point of access to storage.** Concurrent access to the local store shall be coordinated through a single connection, so that simultaneous operations cannot leave data in an inconsistent state.

## Deferred to future releases

Service availability targets, automatic failover, geographic replication, and scheduled backup all presuppose a server component and belong to a networked release. The same applies to automatic crash reporting, which requires a service to receive the reports.
