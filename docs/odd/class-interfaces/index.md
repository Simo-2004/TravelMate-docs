# 3. Class Interfaces

This chapter specifies the public interface of every class of the delivered system: its responsibility, its dependencies, the operations it offers, and the exceptions it raises.

The specification is divided by package, following [2. Packages](../packages). The division is one of presentation: the sections below are jointly the chapter, and no class belongs to more than one.

## Scope of the specification

Only the public interface of a class is specified. A name absent from this chapter is private, and a class may hold any number of private members without those forming part of its contract. A specified element cannot be altered without altering this document; an unspecified one may be altered freely.

Operations are stated by purpose, requirement and result. The conventions of [1.2](../introduction/interface-guidelines) apply throughout and are not restated in individual entries:

- An error is reported by raising an exception, never by a return value.
- A null result denotes a legitimately absent value, never a failed operation.
- Domain objects are immutable and are altered by producing a copy.
- A collection returned to a caller is unmodifiable.

Entries follow a fixed order — purpose, dependencies, operations, exceptions — and a heading is omitted where it does not apply.

## Conformance to the architecture

Each class realises part of a subsystem of [SDD 3.2](../../sdd/proposed-architecture/subsystem-decomposition), and each operation realises part of a service of [SDD 4](../../sdd/subsystem-services). No class is specified that no subsystem contains, and no service is left without classes realising it.

The dependency rules of [2. Packages](../packages) bind every entry: a class may depend on classes of its own package and of the packages beneath it, and a dependency crossing a package boundary is declared on an interface wherever one exists.

## Contents

| Section | Package | Realises |
|---------|---------|----------|
| [3.1 Presentation](./presentation) | `features/`, `shared/widgets/`, `core/theme/`, `core/constants/` | Presentation |
| [3.2 Application State](./application-state) | `shared/state/` | Application State |
| [3.3 Domain Logic](./domain-logic) | `shared/utils/`, `shared/models/` | Domain Logic |
| [3.4 Persistence](./persistence) | `shared/data/` | Persistence |
| [3.5 Data Access](./data-access) | `core/database/` | Data Access |
| [3.6 Security](./security) | `core/security/` | Security |
| [3.7 Media Storage](./media-storage) | `features/profile/image/` | Media Storage |
