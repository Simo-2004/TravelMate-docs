# 1.4 References

## Project documents

- **[RAD — Requirements Analysis Document](../../rad/overview)** — the requirements this design realises. The design goals of [1.2](./design-goals) are derived from [RAD 3.3](../../rad/proposed-system/non-functional/), and the subsystems of [3.2](../proposed-architecture/subsystem-decomposition) from the analysis objects of [RAD 3.4.3](../../rad/proposed-system/system-models/object-model).
- **[ODD — Object Design Document](../../odd/overview)** — the class-level specification of the subsystems defined here.
- **Feasibility Study** — the product vision, and the choice of the implementation framework recorded as [NFR-I.1](../../rad/proposed-system/non-functional/implementation).

## Source

- Repository: [`Simo-2004/TravelMate`](https://github.com/Simo-2004/TravelMate)
- Continuous analysis: SonarCloud project `Simo-2004_TravelMate`, fed by the workflow in `.github/workflows/sonar.yml`

## Off-the-shelf components

The components integrated into the system, their versions, and the purpose of each are listed in [3.3](../proposed-architecture/hardware-software-mapping). Their authoritative declaration is `pubspec.yaml` in the repository.

## External

- Flutter framework documentation, for the widget model and the event loop on which [3.6](../proposed-architecture/global-control-flow) rests
- SQLite documentation, for the storage engine underlying [3.4](../proposed-architecture/persistent-data)
