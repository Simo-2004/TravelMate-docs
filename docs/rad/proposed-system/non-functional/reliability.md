# 3.3.2 Reliability `[Mixed]`

> On-device error and crash handling is frozen for Release 1.0; server availability and replication requirements are `[EM – Deferred]`.

## Availability `[EM – Deferred]`

- **NFR-R.1.1**: System shall maintain 99.5% uptime (< 3.6 hours downtime/month)
- **NFR-R.1.2**: All critical features shall have automatic failover mechanisms
- **NFR-R.1.3**: Database shall be replicated across at least 2 geographic regions
- **NFR-R.1.4**: API servers shall be load-balanced with auto-scaling

## Error Handling `[R1.0 – Frozen]`

- **NFR-R.2.1**: The system shall gracefully handle network interruptions
- **NFR-R.2.2**: Failed requests shall be automatically retried up to 3 times with exponential backoff
- **NFR-R.2.3**: All errors shall be logged with full context for debugging
- **NFR-R.2.4**: User sessions shall be recovered automatically upon reconnection

## Data Integrity `[Mixed]`

- **NFR-R.3.1**: All data modifications shall be atomically committed
- **NFR-R.3.2**: Database shall support ACID transactions
- **NFR-R.3.3**: Backup shall occur every 6 hours with point-in-time recovery capability
- **NFR-R.3.4**: Data consistency shall be validated through checksums

## Crash Recovery `[R1.0 – Frozen]`

- **NFR-R.4.1**: Mobile app shall not crash under normal operating conditions
- **NFR-R.4.2**: Unsaved user input shall be automatically recovered after crashes
- **NFR-R.4.3**: Crash logs shall be automatically reported for analysis
