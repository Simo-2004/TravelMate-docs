# 1.1 Object Design Trade-offs

The trade-offs recorded in [SDD 1.2](../../sdd/introduction/design-goals) are settled at the level of the architecture. The four below are settled at the level of individual classes: each names the alternatives available at that grain, the decision taken, and the design goal whose priority decided it.

## "Buy" VS build

**Cryptographic primitives are bought, not built.** AES-256 in GCM mode and PBKDF2 with HMAC-SHA-256 are supplied by established libraries rather than implemented for this system. A hand-written cipher can pass every test in the suite and still be broken, since correctness of a cryptographic primitive is not established by testing — [DG-D1](../../sdd/introduction/design-goals) settles this in favour of a proven implementation, and [DG-C1](../../sdd/introduction/design-goals) offers no argument the other way.

**Platform storage is bought.** The local database and the OS key store are reached through their platform libraries rather than a custom file format.

## Memory VS Response Time

**The trip catalogue is loaded once and held in memory for the run.** It is read-only content consulted repeatedly, from the search screen and from every recommendation surface. Reading it from the database at each consultation would trade one memory cost, paid once at start-up, for a repeated one paid on every screen that lists a trip. [DG-P1](../../sdd/introduction/design-goals) decides for the one-time cost.

**The encryption key is retained in memory after its first read.** The alternative is a secure-storage round trip before every encryption and every decryption. Holding the key in memory for the run avoids that cost at the price of the key existing outside the OS key store while the application runs — the residual exposure [SDD 3.5](../../sdd/proposed-architecture/access-control) records as accepted.

**A photograph is stored as a path, not as bytes.** The database column records only where Media Storage saved the file, never its content. Passing image bytes through the database would hold a decoded copy in memory and duplicate what the file system already holds; a path costs a few bytes and one file read at the moment the image is shown.

## Generality VS Simplicity

**Each Data Access interface exposes only what its one table needs.** The profile, the account, the conversations and the trip catalogue are four differently-shaped tables, and each is reached through an interface fitted to that shape — as narrow as two operations for the single-row profile, as wide as five for the conversation table's count, read, insert and delete. No interface generalises across them. A single contract parameterised over an arbitrary row would have to admit operations most of the four never use, in exchange for nothing the fitted interfaces do not already provide; [DG-M2](../../sdd/introduction/design-goals) asks only that the storage mechanism be isolated, not that its interface be uniform.

## Testability VS directness

**Every platform facility is reached through an interface it does not otherwise need.** The database connection, the OS key store and the device's photo gallery could each be addressed directly by the class that uses them. Instead, an interface is declared for the key store, and the classes translating between domain objects and stored rows receive their cipher already resolved rather than resolving it themselves. The indirection exists only so each class can be exercised in a test against a substitute rather than the platform facility itself — the resolution [SDD 1.2](../../sdd/introduction/design-goals) gives to testability over economy.
