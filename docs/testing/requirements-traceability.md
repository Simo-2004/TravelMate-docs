# 5.3 Requirements Traceability

Each requirement of the [RAD](../rad/overview) and the verification that establishes it, so that no requirement of the delivered system is left unverified and no verification is left without a requirement it serves.

This closes the V-model. [4.3](../implementation/traceability) established that the source realises the specification; this chapter establishes that the specification realises the requirements.

## Means of verification

Not every requirement is established the same way, and stating which means was used matters as much as stating that it was met.

| Means | What it establishes |
|-------|--------------------|
| **Test** | The behaviour was exercised and the result compared against what the requirement states |
| **Measurement** | A figure was produced and compared against a stated bound, as recorded in [5.1](./system-quality) |
| **Inspection** | The property is settled by the structure of the source and is read from it rather than run |

Inspection is used where a requirement constrains the shape of the system rather than its behaviour. A requirement that no component depends on a platform library is established by reading the dependencies, not by running them.

## Use cases

Every use case of [RAD 3.4.2](../rad/proposed-system/system-models/use-case-model) is exercised. They are not all exercised at the same level.

| Use case | Exercised at | By |
|----------|--------------|-----|
| **UC1** Create Account | Component | A valid form creating the account, the profile, the tags and the photograph; a short password, an invalid username and missing names each blocked; a failing photograph reported without losing the form |
| **UC2** Log In | System | The application starting locked; valid credentials unlocking it; a wrong password and an unknown username each leaving it locked |
| **UC3** Search Trips and Companions | Component | Submitting a query opening the results; a blank query doing nothing; typing narrowing results as they are shown; the mode deciding whether trips or companions are ranked |
| **UC4** Save a Trip or Companion | System | A trip saved on one tab appearing on the saved tab; removing it emptying that tab; a companion saved from their profile reaching the same tab |
| **UC5** Converse with a Companion | System | Conversation history outliving the screen that presented it |
| **UC6** Share a Trip in a Conversation | Component | A companion whose preferences match accepting; one whose preferences differ declining; the attached trip opening its itinerary |
| **UC7** Manage Profile and Settings | System | The settings tab presenting the signed-in profile and opening it; signing out locking the application, with a fresh entry working and a wrong password still refused |

**UC2, UC4, UC5 and UC7 are exercised at system level**, through the assembled application and its real screens. **UC1, UC3 and UC6 are exercised at component level**, through the screen that performs them with stand-ins behind it.

The difference is worth stating plainly. A component test establishes that the screen performs the task correctly when its collaborators behave as specified; it does not establish that the assembled application wires those collaborators together. For UC1, UC3 and UC6 that wiring is established indirectly — by the system tests that reach the same screens while moving between tabs, and by the integration tests covering the layers beneath them — rather than by a test that performs the whole task through the assembled application.

## Functional requirements

The delivered modules and the level at which each is established.

| Requirements | Established by | Level |
|--------------|---------------|-------|
| **A.1** Account and authentication | Test | Unit (validation), component (both screens), integration (the stored account), system (locking and unlocking) |
| **A.2** Personal profile | Test | Component (the profile screen), integration (the encrypted record and the stored photograph) |
| **A.3** Interests and trip preferences | Test | Unit (normalisation and duplicate rejection), component (adding and removing) |
| **A.4** Privacy preferences | Test | Object (the preference class), component (the screen), integration (the stored value) |
| **B.1** Search | Test | Unit (ranking and multi-term matching), component (both search screens) |
| **B.2** Trip presentation | Test | Object (the catalogue), component (home and itinerary), integration (seeding and order) |
| **C.1** Saved items | Test | Object (the saved-items class), component (the saved tab), system (saving on one tab and finding it on another) |
| **D.1** Conversations | Test | Unit (reply selection and proposal matching), object (the conversation store and its timed behaviour), integration (stored messages), system (history outliving the screen) |

Every delivered functional requirement is established by test. None rests on inspection alone.

## Non-functional requirements

| Group | Established by | Note |
|-------|---------------|------|
| **Usability** (U.1–U.6) | Inspection, with component tests for the parts that are behaviour | Sizing derived from the device is read from the source; confirmation of an action is exercised |
| **Reliability** (R.1–R.6) | Test | Malformed stored values, altered ciphertext and a failing photograph are each exercised. **R.1 is met in part** — see below |
| **Performance** (P.1–P.6) | Inspection | The bounds are read from the design: a write that is not awaited, a catalogue held in memory, a key read once. **P.3 is met in part** — see below |
| **Supportability** (S.1–S.7) | Measurement and inspection | S.4 by the coverage figure of [5.1](./system-quality); S.1 by the analysis passing without issue; S.2, S.3 and S.7 by the dependency structure recorded in [4.3](../implementation/traceability) |
| **Implementation** (I.1–I.6) | Inspection, with tests for the cryptographic properties | The algorithms and the key handling are exercised by the security suite. **I.4 is met in part** — see below |
| **Packaging** (PK.1–PK.4) | Inspection | The artefact and its distribution, recorded in [Deployment](../deployment) |
| **Legal** (L.1–L.4) | Test | The security suite establishes that no personal value is readable at rest and that the password cannot be recovered |

Performance is established by inspection rather than by measurement. The bounds of [RAD 3.3.3](../rad/proposed-system/non-functional/performance) are stated for a device, and the suite runs headless; what the tests establish is the property the bound depends on — that a write is not awaited, that the catalogue is read once — not the elapsed time on a device.

## Requirements met in part

Three requirements are met incompletely. Each was known from the design rather than found during verification, and each is recorded where the decision was taken.

| Requirement | Respect in which it is not met | Recorded in | Found by |
|-------------|-------------------------------|-------------|----------|
| [NFR-R.1](../rad/proposed-system/non-functional/reliability) | Recovery from an unreadable stored value is applied to the preference store and not to the encrypted database. A payload that cannot be decrypted is detected but not recovered from, and the failure occurs before the interface starts | [SDD 3.7](../sdd/proposed-architecture/boundary-conditions) | Inspection |
| [NFR-I.4](../rad/proposed-system/non-functional/implementation) | Verification discloses by its duration whether the username is correct: a mismatched username returns before the credential derivation runs | [SDD 3.5](../sdd/proposed-architecture/access-control) | Inspection |
| [NFR-P.3](../rad/proposed-system/non-functional/performance) | Credential derivation occupies the single thread for its duration, so the interface cannot repaint while it runs | [SDD 3.6](../sdd/proposed-architecture/global-control-flow) | Inspection |

All three were found by inspection, and the reason is the same in each case: they are properties of what the design **does not** do. No test fails, because the behaviour each describes is the behaviour the code was written to have. A test can show that detection works; it cannot show that recovery is missing except by asserting the failure that recovery would prevent.

The part of each requirement that **is** met is established by test. Detection of an altered payload, the one-way storage of the password and the constant-time comparison are all exercised by the security suite; what those tests establish is recorded in [5.2](./system-testing).

## Deferred requirements

The requirements below are excluded from this release by the RAD. They have no design, no source and no verification, and their absence here is deliberate.

| Deferred | Scope |
|----------|-------|
| Module E — Trip Organisation | Creating, publishing and joining a trip; managing participants |
| Module F — Administration | Reports, warnings, suspensions and an auditable record |
| Interface requirements | Every requirement of [RAD 3.3.6](../rad/proposed-system/non-functional/interface), which presuppose a server and a network |
| Parts of Modules A, B and D | The items each module's own deferred section lists |

A deferred requirement is not an unverified one. Verifying it would need a system this lifecycle does not build, and specifying a test for it would fix a contract nothing can run.

## Outcome

Every use case of the delivered system is exercised. Every delivered functional requirement is established by test. Every non-functional requirement is established by test, measurement or inspection, with three met in part and each recorded above with the respect in which it falls short.

No verification in the suite serves a requirement that does not exist, and no requirement of the delivered system is left without one.
