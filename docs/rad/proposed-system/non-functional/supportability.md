# 3.3.4 Supportability

Supportability requirements concern the ease with which the system can be understood, corrected, and extended after delivery.

**NFR-S.1 — Coding conventions.** All source code shall conform to a single agreed style, enforced automatically by static analysis rather than by review alone. The configuration shall extend the language's recommended rule set with the additional rules adopted by the project.

**NFR-S.2 — Separation of concerns.** Business logic shall be separated from storage and from presentation, so that a change in the way data is stored does not propagate through the rest of the system.

**NFR-S.3 — Testability by construction.** Components that hold logic shall depend on abstractions rather than on platform services, so that they can be exercised in tests without a database, a key store, or a physical device.

**NFR-S.4 — Automated verification.** A test suite shall accompany the source code and shall be runnable with a single command. Coverage shall be measured automatically and shall remain above 80%.

**NFR-S.5 — Continuous analysis.** Every change shall be analysed automatically for defects, security issues, and maintainability before it is considered complete.

**NFR-S.6 — Purposeful comments.** Comments shall explain decisions that are not evident from the code itself, rather than restate what the code already expresses.

**NFR-S.7 — Extensibility.** A new function shall be addable as a self-contained module, without modifying unrelated parts of the system.

## Deferred to future releases

Structured logging with request tracing, aggregated error reporting, and interface versioning for backward compatibility all become relevant once a server component exists.
