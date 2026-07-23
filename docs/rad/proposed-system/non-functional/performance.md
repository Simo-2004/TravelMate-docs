# 3.3.3 Performance

Performance requirements state the responsiveness the Traveler must experience. Since the delivered system performs all of its work on the device, they are expressed without reference to network latency.

**NFR-P.1 — Responsiveness of search.** Search results shall be produced without perceptible delay and without requiring any network exchange.

**NFR-P.2 — Non-blocking persistence.** Saving data shall never block the interface: the visible state shall update immediately, while the write to storage proceeds in the background.

**NFR-P.3 — Cost of credential verification.** The deliberate slowness of credential verification is a security property rather than a defect. It shall nevertheless remain within a delay acceptable at login, and shall affect no other operation.

**NFR-P.4 — Efficient retrieval of conversations.** Retrieving a single conversation shall not require examining the messages belonging to other conversations.

**NFR-P.5 — Storage of images.** Photographs shall be stored as files and referred to by reference, never embedded in the database, so that the size of the database remains independent of the size of the images.

**NFR-P.6 — Economy of repeated operations.** Values that are costly to obtain and do not change during a session shall be retained after first use rather than obtained again.

## Deferred to future releases

Throughput targets — concurrent users, requests per second, simultaneous database connections — and server-side response times apply only to a networked release, as does the performance of matching computed over a large population of profiles.
