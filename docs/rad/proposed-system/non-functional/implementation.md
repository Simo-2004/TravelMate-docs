# 3.3.5 Implementation

Implementation requirements are constraints imposed on the development of the system rather than qualities of the system itself. They state what the implementation must guarantee and which technologies it is obliged to adopt; how those obligations are met — the particular libraries, algorithms, and structures — is decided in the System Design Document.

**NFR-I.1 — Development framework.** The system shall be implemented with the Flutter framework, in accordance with the technology chosen in the Feasibility Study, so that the core logic is written once rather than duplicated for each target platform.

**NFR-I.2 — Local persistence.** The system shall persist data on the device in a relational store, and shall remain fully functional with no network connection available.

**NFR-I.3 — Protection of data at rest.** Personal data and conversation content shall be encrypted with an authenticated algorithm, so that neither disclosure nor undetected alteration is possible for anyone inspecting the stored data. The encryption key shall be generated on the device and held in storage provided by the operating system, never within the application's own data or its source.

**NFR-I.4 — Protection of credentials.** Access credentials shall be stored exclusively in a non-reversible form, derived with a deliberately costly function and combined with a value unique to each credential. Verification shall not reveal, through its duration, how much of a supplied credential was correct.

**NFR-I.5 — Proportionate protection.** Data that is public by nature shall not be encrypted, so that protection is applied where it is meaningful rather than uniformly and without purpose.

**NFR-I.6 — Version control.** Development shall use version control with semantic versioning, work carried out on branches, and released versions identified by tags.

## Deferred to future releases

A server-side application exposing an interface to clients, a database serving multiple users, a caching layer for sessions, and reproducible containerised deployment.
