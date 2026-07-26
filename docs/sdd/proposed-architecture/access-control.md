# 3.5 Access Control & Security

## The problem this system actually has

Access control normally arbitrates between many users with different rights. TravelMate has **one user and one account** ([1.1](../introduction/purpose)), so that problem is nearly empty. The problem it does have is different and is the one the design addresses: the data never leaves the device, so **the threat is whoever obtains the stored files**, not another user of the system.

The two are treated separately below because they are answered by different mechanisms — the first by authentication, the second by encryption at rest.

## Access matrix

Rights are **static**: they are fixed at design time and do not vary at run time. There are no roles, no delegation, and no rights that change with the state of the system.

| Subject | Account | Personal profile | Conversations | Saved items | Privacy preferences | Trip catalogue |
|---------|---------|------------------|---------------|-------------|---------------------|----------------|
| **Traveler, admitted** | replace | read, write | read, write, delete | read, write, delete | read, write | read |
| **Traveler, not admitted** | verify, create | — | — | — | — | — |
| **Holder of the stored files** | — | — | — | — | *read* | *read* |

The third row is the row that matters, and it is the design's central security claim. Someone who obtains the database and the preference files, but not the key held by the operating system, can read the trip catalogue — which is public — and the four privacy preferences ([3.4](./persistent-data) records why), and **nothing else**. The profile, the content of every conversation, and the username are ciphertext; the password is not present in any recoverable form at all.

The matrix is implemented as an **access-control list oriented to the object**, in the sense that the restriction is attached to the data rather than to the subject: the encryption of a column is a property of that column. This suits a system where the objects are few and the subjects are one; a capability list oriented to the subject would carry the same information at more expense.

## Authentication

The Traveler is admitted by **username and password**, the mechanism the slides identify as the most common and the one appropriate here: a smart card presupposes hardware the design cannot require, and biometrics would delegate the decision to a platform facility whose behaviour this lifecycle does not verify.

Verification proceeds as follows.

1. The stored username is decrypted and compared with the supplied one, **disregarding letter case** ([FR-A.1.4](../../rad/proposed-system/functional)).
2. The supplied password is put through the same derivation as the stored one, using the salt and iteration count recorded alongside it, and the results are compared.

The second step never recovers the stored password, because the derivation is one-way. This is why the account table stores a derived value rather than an encrypted one: encryption would imply a key that could reverse it, and the requirement ([NFR-I.4](../../rad/proposed-system/non-functional/implementation)) is that nothing can.

Failure is reported **without distinguishing which of the two was wrong** ([UC2](../../rad/proposed-system/system-models/use-case-model)), so that a failed attempt does not confirm that a username exists.

### Parameters

| Property | Value | Why |
|----------|-------|-----|
| Derivation | PBKDF2 with HMAC-SHA-256 | Established, and deliberately expensive |
| Iterations | 100 000 | High enough to make exhaustive search costly; low enough to stay within the 1 s bound of [NFR-P.3](../../rad/proposed-system/non-functional/performance) |
| Salt | 16 bytes, unique per credential | Identical passwords do not produce identical stored values, and precomputed tables are useless |
| Derived length | 32 bytes | Matches the digest and leaves no truncation |

The iteration count is stored **with** the credential rather than assumed, so that raising it later does not invalidate accounts written under the old value.

## Protection of data at rest

| Property | Value |
|----------|-------|
| Algorithm | AES-256 in GCM mode — authenticated encryption |
| Key length | 32 bytes (256 bits) |
| Nonce | 12 bytes, **freshly generated for every encryption** |
| Stored form | `nonce ‖ ciphertext ‖ tag`, base64-encoded in a text column |

Two properties of this choice are load-bearing.

**Authentication, not merely concealment.** GCM produces a tag that fails verification if the stored bytes were altered. Tampering therefore surfaces as an explicit failure rather than as plausible-looking wrong data — which is what [NFR-R.3](../../rad/proposed-system/non-functional/reliability) requires, and what an unauthenticated mode would not give.

**A fresh nonce per encryption.** Reusing a nonce under the same key is the one mistake that breaks GCM outright. Generating it per call, and storing it beside the ciphertext, means two identical values do not produce identical stored payloads and the failure mode cannot occur through ordinary use.

### The key

The key is the whole of the protection, so its handling is the whole of the security design.

- It is **generated on the device** on first use, from a cryptographically secure source. It is never derived from anything the Traveler types, never shipped with the application, and never present in the source.
- It is **held in the operating system's key store**, not in the application's own data. A copy of the database is therefore not a copy of the key.
- It is **read once and retained in memory** for the run, so that repeated operations do not repeatedly consult the key store — the economy [NFR-P.6](../../rad/proposed-system/non-functional/performance) asks for.
- The Security subsystem reaches the key store through the `SecureKeyStore` interface of [3.2](./subsystem-decomposition), so the key lifecycle can be verified against a substitute without a device.

## Uniformity

The policy must be the same in every subsystem, and the decomposition is what makes it so. Encryption is applied in exactly one place — the Persistence subsystem, on the way to storage — and the key is obtained in exactly one place. No screen, store, or DAO encrypts anything, and none of them can accidentally bypass the policy, because none of them holds a key.

## Residual risks

Two are recorded, because a design that claims none is not being honest.

**The first-run account is seeded with credentials present in the source.** [FR-A.1.6](../../rad/proposed-system/functional) requires the application to be usable before any registration, and the design meets it by writing a default account on first run. Those credentials are readable by anyone who reads the repository. The exposure is bounded — registering replaces the account, and the data protected by the key is not reachable through it on another device — but on a device where the Traveler has never registered, the default credentials admit whoever knows them. A networked release would replace this with an enrolment step; within this scope it is a known and accepted weakness rather than a solved problem.

**Protection is at rest, not in use.** While the application is running, decrypted values exist in memory. A compromise of the running process is outside what encryption at rest can address, and the design does not claim otherwise.

## Goals and requirements served

| Serves | How |
|--------|-----|
| [DG-D1](../introduction/design-goals) Confidentiality | Authenticated encryption under an OS-held key; one-way credential storage |
| [DG-D2](../introduction/design-goals) Survival of data | The authentication tag turns silent corruption into an explicit failure |
| [DG-M1](../introduction/design-goals) Testability | Key access sits behind an interface; the cipher is pure and needs no device |
| [NFR-I.3](../../rad/proposed-system/non-functional/implementation), [NFR-I.4](../../rad/proposed-system/non-functional/implementation) | The parameters and key handling above |
| [NFR-L.2](../../rad/proposed-system/non-functional/legal), [NFR-L.3](../../rad/proposed-system/non-functional/legal) | Credentials unrecoverable even by the development team; content unreadable without the OS-held key |
| [NFR-R.3](../../rad/proposed-system/non-functional/reliability) | Alteration is detectable |
| [NFR-P.3](../../rad/proposed-system/non-functional/performance) | Iteration count chosen against the 1 s bound |
