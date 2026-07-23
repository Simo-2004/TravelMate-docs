# 3.3.7 Packaging

Packaging requirements define how the system is assembled and delivered to the Traveler.

**NFR-PK.1 — Release configuration.** The application shall be assembled in a configuration optimised for release, distinct from the one used during development.

**NFR-PK.2 — Signed artefacts.** Distributed builds shall be signed, so that their origin and integrity can be verified by the target platform before installation.

**NFR-PK.3 — Identifiable releases.** Every released version shall be uniquely identifiable and accompanied by a description of its contents, so that a Traveler can determine which version they are running and what it changed.

**NFR-PK.4 — Retrievable history.** Releases shall be published through a channel that keeps previous versions retrievable, so that a defective release can be withdrawn without losing the ability to reinstall a working one.

## Deferred to future releases

Publication through the official application stores of the mobile platforms, distribution of a web client usable without installation, and containerised deployment of the server component.
