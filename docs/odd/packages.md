# 2. Packages

> **Status: placeholder.**

To be written: the organisation of the subsystems of [SDD 3.2](../sdd/proposed-architecture/subsystem-decomposition) into packages and source files, and the dependencies between those packages.

Intended scope:

- **The package structure** — each package, the subsystem it realises, and the directory of the source tree it occupies.
- **Contents** — the classes each package holds, and the criterion by which a class belongs to one package rather than another.
- **Dependencies** — which package uses which, in what direction, and through what interface.
- **A package diagram** — the same information in one figure.

The dependencies stated here are to be shown consistent with the layering of [SDD 3.1](../sdd/proposed-architecture/overview): a package may address a package in the layer below it, and no package addresses one above it. The two dependencies that appear to breach this rule are already stated in [SDD 3.2](../sdd/proposed-architecture/subsystem-decomposition) and are to be carried over rather than restated as new.
