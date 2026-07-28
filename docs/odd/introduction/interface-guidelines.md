# 1.2 Interface Documentation Guidelines

The conventions below are fixed before the specification begins and do not change within it. They apply to every entry of [3. Class Interfaces](../class-interfaces/), and their purpose is to make an interface readable without reading the code that implements it.

## Naming

| Element | Rule | Example |
|---------|------|---------|
| Class | A noun, unique across the whole system | `ProfileRepository`, `AesCipher` |
| Operation | Begins with a verb | `readProfile`, `encryptString`, `countAccounts` |
| Attribute and parameter | A noun | `firstName`, `sentAt`, `iterations` |
| Operation returning true or false | Begins with `is`, `has` or a similar form | `isSaved`, `isFromMe` |
| Implementation of an interface | The name of the interface, preceded by the mechanism it uses | `ProfileDao` is implemented by `ProfileSqfliteDao`; `SecureKeyStore` by `FlutterSecureKeyStore` |

The last rule is what makes a dependency legible at a glance: a class that names a mechanism is an implementation, and the interface it implements is the part other classes are permitted to depend on.

## Visibility

Two levels are used, and no others. A name beginning with an underscore is **private** to its file; every other name is **public** and is part of the specification. Anything not listed in chapter 3 is private and may change without notice.

Two uses of a private constructor are worth distinguishing, because they mean different things:

- A class that must exist only once declares its constructor private and offers a single fixed instance, so that no second instance can be created.
- A class that holds only constants declares its constructor private so that it cannot be instantiated at all.

## Errors and absent values

**An error is reported by raising an exception, never by a return value.** No operation returns a code, a flag or an empty result to signal that it failed. A caller that receives a value has received a correct one.

**A null result means absence, not failure.** It is returned where a value is legitimately not there — no record has been stored yet, or a search found nothing — and every operation that may return null states the condition under which it does.

Exceptions travel upward without being caught by the layers between. They are handled at the two places where something can be done about them: the classes reading the preference store, which replace an unreadable value with a documented default, and the screens, which report the failure to the Traveler. [SDD 3.7](../../sdd/proposed-architecture/boundary-conditions) records where this handling is complete and where it is not.

## Immutability

Domain objects are immutable. Their attributes are fixed when the object is created and never change afterwards. An object is modified by producing a **new copy with some attributes replaced**, through an operation named `copyWith`, rather than by writing to the original.

A collection published by a class that owns state is unmodifiable, so a caller cannot alter the state by altering the list it was given.

## Design patterns

Five patterns are applied. Each is named here once, with the obligation it places on the interfaces that use it, and is not re-argued at every occurrence in chapter 3.

| Pattern | Applied to | What it fixes in the interface |
|---------|------------|--------------------------------|
| **Singleton** | The database connection and each class owning application state | One fixed instance, reached by name. The constructor is private, so no caller can create a second one. |
| **Repository** | One class for each kind of stored data | Its operations accept and return domain objects. Rows, columns and encryption do not appear in them. |
| **Data Access Object** | One interface for each table | Its operations accept and return rows, expressed as maps of column name to value. Domain objects do not appear in them. |
| **Adapter** | The OS key store and the device photo gallery | An interface declared by the design, implemented by a class that calls the platform library. Callers depend on the interface only. |
| **Observer** | The classes owning application state | The state is read as a value and its changes are published. A caller subscribes to be notified; it is never told which screens exist. |

The Repository and Data Access rows state the same boundary from its two sides, and together they are the rule that keeps the two layers separable: a repository never sees a column name, and a data access object never sees a domain object.

## Form of each entry

Every class in chapter 3 is specified in the same order:

1. **Purpose** — what the class is responsible for, in one or two sentences.
2. **Dependencies** — the classes and packages it uses, and the interfaces it depends on rather than implementations.
3. **Public attributes and operations** — for each operation, what it does, what it requires, and what it returns.
4. **Exceptions** — what it raises, and under what condition.

A heading is omitted when it does not apply — a class that raises nothing has no exceptions section — but the order never varies.
