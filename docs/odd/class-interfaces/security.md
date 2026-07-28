# 3.6 Security

## Purpose

The Security package encrypts and decrypts values, derives credential values, and obtains the encryption key. It is the only package performing a cryptographic operation, and the only one addressing the operating system's key store.

## Dependencies

| Depends on | For |
|------------|-----|
| The encryption library | Authenticated encryption |
| The derivation library | Credential derivation |
| The key store library | Retention of the key outside the application's own data |

The package depends on no other package of the system. It is addressed by Persistence alone, and addresses neither storage nor the interface.

## General constraints

| Constraint | Consequence for the interface |
|------------|-------------------------------|
| A cryptographic primitive is obtained, not composed | The algorithms of [SDD 3.5](../../sdd/proposed-architecture/access-control) are applied through established libraries, for the reason recorded in [1.1](../introduction/trade-offs). |
| The key store is addressed through a declared interface | No class determining the key lifecycle addresses the platform library, permitting that lifecycle to be exercised without a device. |
| Every operation but key retrieval is synchronous and pure | Encryption, decryption and derivation compute from their arguments alone. Only retrieval of the key awaits a facility. |
| Parameters are declared, not assumed | The values governing derivation are fixed values of the class and are stored with each credential, so that verification applies the parameters under which a credential was written. |

The parameter values are specified in [SDD 3.5](../../sdd/proposed-architecture/access-control) and are not restated here.

## `AesCipher`

**Purpose.** Encrypts and decrypts a value under a supplied key, producing a form whose alteration is detectable.

**Dependencies.** The encryption library.

The class is constructed with the key it applies. It does not obtain the key, and therefore holds no dependency on the key store: a caller resolves the key and supplies a cipher bearing it.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Encrypt a value | The value | The encrypted form | Generates a fresh nonce for each invocation and returns it joined to the result |
| Decrypt a value | The encrypted form | The original value | Separates the nonce, verifies the authentication tag, and yields the value |

**Constraints.**

The encrypted form **carries its own nonce**. A nonce is generated for each encryption and joined to the result rather than held elsewhere, by which decryption requires the encrypted form and the key alone, and identical values do not produce identical forms. 

A nonce is never reused under one key. Generation for each invocation, rather than retention and reuse, is what places the condition beyond the reach of ordinary operation.

Verification of the authentication tag is performed as part of decryption and cannot be omitted. A form that has been altered is therefore reported rather than yielding a value that is plausible and incorrect, satisfying [NFR-R.3](../../rad/proposed-system/non-functional/reliability).

## `PasswordHasher`

**Purpose.** Derives a storable value from a credential, and verifies a supplied credential against a stored one.

**Dependencies.** The derivation library.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Derive a value from a credential | The credential, and optionally a salt | The derived value with its salt and iteration count | Generates a salt from a secure source where none is supplied |
| Verify a credential | The credential, and a stored value with its salt and iteration count | Whether the credential corresponds | Derives under the parameters supplied and compares |

**Constraints.**

Derivation is **one-way**. No operation of this class recovers a credential from a stored value, and none is specified that could, satisfying [NFR-I.4](../../rad/proposed-system/non-functional/implementation).

Comparison of derived values is performed in **constant time**: every position is examined whether or not an earlier one differed, so that the duration of a comparison does not disclose how many leading positions corresponded.

The salt is optional at derivation so that verification may derive under the salt already stored, the same operation serving both the writing of a credential and the checking of one.

Verification returns whether the credential corresponds and reports no cause. An unsuccessful verification is an ordinary outcome, not a failure.

### `HashedPassword`

**Purpose.** Carries a derived value together with the parameters under which it was derived.

Immutable, and composed of the derived value, the salt applied, and the iteration count applied. 

The three are carried as one value rather than returned separately, so that a caller storing a derived value cannot store it without the parameters required to verify against it later. Raising the iteration count for credentials written subsequently therefore leaves credentials already written verifiable.

## `ProfileKeyProvider`

**Purpose.** Yields the encryption key, generating and storing it where none is held.

**Dependencies.** `SecureKeyStore`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Obtain the key | — | The key | Yields the key held; where none is held, generates one from a secure source, writes it to the key store, and yields it |

**Constraints.**

The key is **generated on the device** at first use. It is not derived from anything the Traveler supplies, is not distributed with the application, and is not declared in any class.

The key is **retained in memory** after its first retrieval and yielded from memory thereafter, satisfying [NFR-P.6](../../rad/proposed-system/non-functional/performance). The residual exposure this entails is recorded in [SDD 3.5](../../sdd/proposed-architecture/access-control).

The key is identified in the key store by a declared name, so that a key written by one release is retrievable by the next.

The class addresses `SecureKeyStore` rather than the platform library, by which generation, storage and retention are exercisable against a substitute.

## `SecureKeyStore`

**Purpose.** The interface through which a value is held outside the application's own data. Declared by this package and depended upon by it.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Read a value | A name | The value, or null | Null where no value is held under that name |
| Write a value | A name, and the value | — | Replaces any value held under that name |

The interface is expressed in names and values rather than in keys, holding no knowledge of what the value it carries signifies.

### Interface Realizations

| Concrete Class | Realises | Addresses |
|----------------|----------|-----------|
| `FlutterSecureKeyStore` | `SecureKeyStore` | The operating system's key store |

The realization holds no logic beyond delegation. It is the only class of the package requiring a device, and the separation is what confines that requirement to a class holding no decision.

## Exceptions

| Raised by | Condition |
|-----------|-----------|
| `AesCipher` | An encrypted form is too short to carry a nonce, has been altered, or was produced under a different key |

This is the only exception raised anywhere in the system. It is raised rather than answered by a result because a value that cannot be decrypted has no correct substitute at this level: the class holds no knowledge of what the value signifies, and a value returned in its place would be indistinguishable from a genuine one.

Detection is therefore complete, in satisfaction of [NFR-R.3](../../rad/proposed-system/non-functional/reliability). Recovery from a detected alteration is not performed here and is not performed by any caller; [SDD 3.7](../../sdd/proposed-architecture/boundary-conditions) records that limitation and the correction it prescribes.

No other class of the package raises. An unsuccessful credential verification and an absent key are answered by results, both being foreseen conditions rather than failures.
