# Implementation

This document records the construction of TravelMate: the translation of the interfaces specified in the [ODD](../odd/overview) into source code, and the tools, conventions and procedures by which that translation is performed and verified.

It records how the system is built. The requirements are stated in the [RAD](../rad/overview), the architecture in the [SDD](../sdd/overview), and the class interfaces in the [ODD](../odd/overview); none is restated here.

## Position in the lifecycle

Implementation is the base of the V-model, at which specification ends and construction begins. Each specifying phase is answered by a verifying one, and this document supplies what the verifying side requires: the conventions against which the source is assessed, the correspondence by which a class is matched to its specification, and the criteria a change is required to satisfy.

| Specifying phase | Verified by |
|------------------|-------------|
| [RAD](../rad/overview) — requirements | [System testing](../testing/overview) |
| [SDD](../sdd/overview) — architecture | Integration testing |
| [ODD](../odd/overview) — class interfaces | Unit testing |

## Contents

- [4.1 Development Environment & Toolchain](./environment) — the tools required to build the system
- [4.2 Coding Standards & Static Analysis](./coding-standards) — the conventions the source obeys, and how conformance is established
- [4.3 Design-to-Code Traceability](./traceability) — how each specified interface is located in the source
- [4.4 Build & Execution Process](./build-process) — the commands producing a running application
- [4.5 Quality Criteria](./quality-criteria) — the thresholds a change is required to satisfy
- [4.6 API Code Documentation](./api-documentation) — the reference generated from the source
