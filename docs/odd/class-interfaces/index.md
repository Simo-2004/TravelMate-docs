# 3. Class Interfaces

> **Status: placeholder.**

To be written: the public interface of every class of the delivered system — a general description of the class, its dependencies on other classes and packages, its public attributes and operations, and the exceptions it raises.

The specification is divided by package, following the decomposition of [2. Packages](../packages), so that a reader looking for a class can reach it through the subsystem that contains it. The division is one of presentation only: the sections below are jointly the chapter, and no class belongs to more than one.

Every entry conforms to the conventions of [1.2](../introduction/interface-guidelines), and every operation realises part of a service declared in [SDD 4](../../sdd/subsystem-services).

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
