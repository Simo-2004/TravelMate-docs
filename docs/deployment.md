# Deployment & Release

The delivered artefact, how it was produced, and what happens to the system after it.

## Release

The application is distributed as a standalone Android package, built in release mode by the command given in [4.4](./implementation/build-process). Release mode compiles ahead of time and leaves out the development instrumentation, so the artefact is the one intended for use rather than for debugging.

Android is the platform the design targets and the one against which the system is verified, as recorded in [SDD 3.3](./sdd/proposed-architecture/hardware-software-mapping). The package carries the whole application: it holds its own data on the device and needs no server, so installing it is the only step required to run it.

👉 **[Download TravelMate (Release 1.2.0)](https://github.com/Simo-2004/TravelMate/releases#release-v1.2.0)**

## State of the release

The release realises the requirements the RAD states for the delivered system. Three non-functional requirements are met only in part, each recorded in [5.3](./testing/requirements-traceability) with the respect in which it falls short, and none of them prevents the system from being used.

The requirements the RAD defers — trip organisation, administration, and everything that presupposes a server — are not in this release and were never designed into it.

## After this release

Any later change falls under maintenance and evolution rather than under this lifecycle. A change that adds a requirement — a remote service, a shared database, a new function — starts a new pass through the lifecycle, beginning with an assessment of whether the change is worth making.

The design admits such a change without being rewritten. [DG-M3](./sdd/introduction/design-goals) required the logic to depend on abstractions a networked implementation could satisfy equally, and [ODD 2](./odd/packages) keeps the classes that address storage in one package. What a later release would replace is what sits behind those interfaces, not the logic above them.
