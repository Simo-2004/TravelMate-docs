# 1.3 Definitions, Acronyms & Abbreviations

Terms of the **application domain** — Traveler, Companion, Trip, Bookmark, Conversation — are defined in the [RAD glossary](../../rad/glossary) and keep the same meaning here. Terms of the **architecture** — subsystem, layer, service — are defined in [SDD 1.3](../../sdd/introduction/definitions). This section defines what belongs to object design.

## Documents

| Acronym | Term | Meaning |
|---------|------|---------|
| **ODD** | Object Design Document | This document |
| **SDD** | [System Design Document](../../sdd/overview) | The architecture this specification realises |
| **RAD** | [Requirements Analysis Document](../../rad/overview) | The requirements the architecture serves |

## Structural terms

| Term | Meaning |
|------|---------|
| **Class** | The unit of specification in this document. Named by a noun, unique across the system. |
| **Interface** | A class declaring operations without implementing them. What other classes are permitted to depend on. |
| **Implementation** | A class providing the operations an interface declares. Named after the mechanism it uses. |
| **Package** | A directory of the source tree holding the classes of one subsystem. The unit of [2. Packages](../packages). |
| **Operation** | A named action a class offers, with what it requires and what it returns. Named by a verb. |
| **Attribute** | A named value a class holds. Named by a noun. |
| **Visibility** | Whether a name is part of the specification (public) or internal to its file (private). |
| **Signature** | The name of an operation together with its parameters and the type of its result. |
| **Precondition** | What must hold before an operation is called. |
| **Postcondition** | What the operation guarantees once it has returned. |
| **Invariant** | A property of an object that holds for its whole life. |

## Patterns

| Pattern | Meaning |
|---------|---------|
| **Singleton** | A class of which only one instance can exist, reached by name. |
| **Repository** | A class translating between domain objects and stored rows, and applying encryption. |
| **DAO** *(Data Access Object)* | An interface issuing storage commands, expressed in rows rather than domain objects. |
| **Data source** | A class choosing where a kind of data is held, and performing store fallback on the first read. |
| **Adapter** | A class whose only purpose is to satisfy an interface by calling a platform library. |
| **Observer** | The arrangement by which a class publishes changes to its state without knowing who is listening. |
| **Factory** | A named constructor assembling an object together with the dependencies it needs. |

## Object terms

| Term | Meaning |
|------|---------|
| **Domain object** | An object representing a thing of the application domain. Immutable. |
| **Immutable** | Fixed at creation and never changed afterwards. Modified by producing a copy. |
| **Copy operation** | The operation producing a new object from an existing one with some attributes replaced. Named `copyWith`. |
| **Row** | A stored record, expressed as a map of column name to value. The form data takes below a repository. |
| **Store** | A class owning one kind of application state and publishing its changes. |
| **Test substitute** | A class standing in for a platform facility during a test, so the class under test runs without a device. |

## Technical terms

| Term | Meaning |
|------|---------|
| **AES-256-GCM** | An encryption algorithm that conceals content and makes alteration of it detectable. |
| **PBKDF2** | A deliberately slow derivation, used to store a credential so the original cannot be recovered. |
| **Salt** | A value unique to each credential, mixed in before derivation so identical credentials do not give identical stored values. |
| **Nonce** | A value used once per encryption so identical inputs do not give identical outputs. |
| **Authentication tag** | A value produced with the ciphertext, which fails verification if the stored bytes were altered. |
| **Exception** | The means by which an operation reports failure. Never a return value. |
| **Asynchronous operation** | An operation returning before its result is available, which the caller awaits. |

## External libraries

The libraries this specification depends on, with the versions it assumes.

| Library | Version | Used for |
|---------|---------|----------|
| `encrypt` | ^5.0.3 | AES-256-GCM encryption and decryption |
| `pointycastle` | ^3.9.1 | PBKDF2 credential derivation |
| `flutter_secure_storage` | ^9.2.2 | The OS key store holding the encryption key |
| `sqflite` | ^2.3.3 | The local database |
| `shared_preferences` | ^2.3.2 | The preference store |
| `path_provider` | ^2.1.4 | The private directory holding the database file and photographs |
| `image_picker` | ^1.1.2 | Selection of a photograph from the device gallery |
