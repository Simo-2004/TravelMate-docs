# 3.5 Access Control & Security

Access control normally arbitrates between many subjects with different rights. TravelMate has one Traveler and one account, so that problem is nearly empty. The problem the design does have is that data never leaves the device: the adversary is whoever obtains the stored files, not another user of the system. Authentication answers the first; encryption at rest answers the second.

## Access matrix

Rights are **static** — fixed at design time, with no roles, no delegation, and no variation at run time.

| Subject | Account | Personal profile | Conversations | Saved items | Privacy preferences | Trip catalogue |
|---------|---------|------------------|---------------|-------------|---------------------|----------------|
| **Traveler, admitted** | replace | read, write | read, write, delete | read, write, delete | read, write | read |
| **Traveler, not admitted** | verify, create | — | — | — | — | — |
| **Holder of the stored files** | — | — | — | — | *read* | *read* |

The third row is the design's central security claim: someone who obtains the database and the preference files, but not the key held by the operating system, can read the trip catalogue and the four privacy preferences ([3.4](./persistent-data) records why) and nothing else. The profile, the content of every conversation, and the username are ciphertext; the password is not present in any recoverable form.

The matrix is realised as an access-control list oriented to the object: the restriction is a property of the data itself, since the encryption of a column travels with that column.

## Authentication

The Traveler is admitted by **username and password**. A smart card would presuppose hardware the design cannot require, and biometrics would delegate the decision to a platform facility this lifecycle does not verify.

Verification proceeds in two steps:

1. The stored username is decrypted and compared with the supplied one, disregarding letter case ([FR-A.1.4](../../rad/proposed-system/functional)).
2. The supplied password is put through the same derivation as the stored one, using the salt and iteration count recorded alongside it, and the two derived values are compared.

The second step never recovers the stored password: the derivation is one-way. This is why the account table stores a derived value rather than an encrypted one — encryption would imply a key that could reverse it, and [NFR-I.4](../../rad/proposed-system/non-functional/implementation) requires that nothing can. The comparison of derived values is made in **constant time**, so it does not disclose how many leading bytes matched.

Failure returns a single message that does not distinguish which of the two credentials was wrong.

### Parameters

| Property | Value | Rationale |
|----------|-------|-----------|
| Derivation | PBKDF2 with HMAC-SHA-256 | Established, and deliberately expensive |
| Iterations | 100 000 | High enough to make exhaustive search costly, low enough to stay within the 1 s bound of [NFR-P.3](../../rad/proposed-system/non-functional/performance) |
| Salt | 16 bytes, unique per credential | Identical passwords do not yield identical stored values, and precomputed tables are useless |
| Derived length | 32 bytes | Matches the digest, so nothing is truncated |

The iteration count is stored **with** the credential rather than assumed, so raising it later does not invalidate an account written under the previous value.

## Protection of data at rest

| Property | Value |
|----------|-------|
| Algorithm | AES-256 in GCM mode — authenticated encryption |
| Key length | 32 bytes (256 bits) |
| Nonce | 12 bytes, freshly generated for every encryption |
| Stored form | `nonce ‖ ciphertext ‖ tag`, base64-encoded in a text column |

Two properties of this choice carry the design.

**Authentication:** GCM produces a tag that fails verification if the stored bytes were altered, so tampering surfaces as an explicit failure rather than as plausible but wrong data — what [NFR-R.3](../../rad/proposed-system/non-functional/reliability) requires and an unauthenticated mode would not provide.

**New nonce per encryption.** Reusing a nonce under the same key defeats GCM outright. Generating one per call and storing it beside the ciphertext means identical values do not produce identical payloads, and the failure mode cannot arise through ordinary use.

### Key management

- The key is **generated on the device** on first use from a cryptographically secure source. It is never derived from anything the Traveler types, never shipped with the application, and never present in the source.
- It is **held in the operating system's key store**, not in the application's own data, so a copy of the database is not a copy of the key.
- It is **read once and retained in memory** for the run, satisfying [NFR-P.6](../../rad/proposed-system/non-functional/performance).
- The Security subsystem reaches the key store through the `SecureKeyStore` interface of [3.2](./subsystem-decomposition), so the key lifecycle can be verified without a device.

## Uniformity

The policy is applied in one place: encryption is performed by the Persistence subsystem on the way to storage, and the key is obtained by one component. No screen, store or DAO encrypts anything or holds a key, so none can bypass the policy.

## Residual risks

**Verification discloses, by its duration, whether the username is correct.** The username is compared first, and a mismatch returns *before* the credential derivation is performed; a correct username with a wrong secret runs the full 100 000 iterations. The two outcomes therefore differ by a measurable interval even though the message returned is identical. This does not satisfy [NFR-I.4](../../rad/proposed-system/non-functional/implementation), which requires that verification not reveal through its duration how much of a supplied credential was correct. The exposure is narrow — with a single account, what leaks is confirmation of a guessed username rather than the enumeration of a user base — but the username is encrypted at rest precisely to conceal it, and this channel discloses it without reading the database at all. Performing the derivation before comparing the username, and returning one result at the end, would close it.

**Protection is at rest, not in use.** While the application runs, decrypted values exist in memory. A compromise of the running process is outside what encryption at rest can address, and the design does not claim otherwise.

## Goals and requirements served

| Serves | How |
|--------|-----|
| [DG-D1](../introduction/design-goals) Confidentiality | Authenticated encryption under an OS-held key; one-way credential storage |
| [DG-D2](../introduction/design-goals) Survival of data | The authentication tag turns silent corruption into an explicit failure |
| [DG-M1](../introduction/design-goals) Testability | Key access sits behind an interface; the cipher is pure and needs no device |
| [NFR-I.3](../../rad/proposed-system/non-functional/implementation) | AES-256-GCM per column, key outside application data |
| [NFR-I.4](../../rad/proposed-system/non-functional/implementation) | **Partly** — one-way derivation and constant-time comparison hold; the timing channel recorded above does not |
| [NFR-L.2](../../rad/proposed-system/non-functional/legal), [NFR-L.3](../../rad/proposed-system/non-functional/legal) | Credentials unrecoverable by anyone holding the data; content unreadable without the OS-held key |
| [NFR-R.3](../../rad/proposed-system/non-functional/reliability) | Alteration is detectable |
| [NFR-P.3](../../rad/proposed-system/non-functional/performance) | Iteration count chosen against the 1 s bound |
