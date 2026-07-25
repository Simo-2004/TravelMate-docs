# 3.3.3 Performance

Performance requirements state the responsiveness the Traveler must experience. Since the delivered system performs all of its work on the device, they are expressed without reference to network latency.

Every figure below is an upper bound to be verified on the **reference device**, which this document declares to be a mobile handset with four cores and 4 GB of memory running Android 13 — the lowest specification among those the project supports. A requirement is satisfied if the bound holds on that device; on better hardware it holds a fortiori.

**NFR-P.1 — Responsiveness of search.** Search results shall be presented within **100 ms** of the query being submitted, over the whole catalogue and without any network exchange.

**NFR-P.2 — Non-blocking persistence.** Saving data shall never block the interface: the visible state shall update within **one frame rendered at 60 Hz — 16 ms** — while the write to storage proceeds in the background.

**NFR-P.3 — Cost of credential verification.** The deliberate slowness of credential verification required by [NFR-I.4](./implementation) is a security property rather than a defect. It shall nevertheless complete within **1 s**, and shall affect no operation other than login and registration.

**NFR-P.4 — Efficient retrieval of conversations.** Retrieving a single conversation shall not require examining the messages belonging to other conversations, and shall complete within **100 ms** for a conversation of up to **500 messages**.

**NFR-P.5 — Storage of images.** Photographs shall be stored as files and referred to by reference, never embedded in the database. Each photograph shall therefore enlarge the database by no more than the length of its file path, so that the size of the database remains independent of the size of the images.

**NFR-P.6 — Economy of repeated operations.** Any value whose derivation exceeds **10 ms** and which does not change during a session shall be retained after first use rather than derived again.

## Deferred to future releases

Throughput targets — concurrent users, requests per second, simultaneous database connections — and server-side response times apply only to a networked release, as does the performance of matching computed over a large population of profiles.
