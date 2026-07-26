# 3. Proposed Software Architecture

This chapter specifies the architecture of the delivered system. It is organised in the seven parts that correspond to the decision areas of system design.

| Section | Decision |
|---------|----------|
| [3.1 Overview](./overview) | Which architectural style, and why |
| [3.2 Subsystem Decomposition](./subsystem-decomposition) | Which subsystems, layered how |
| [3.3 Hardware/Software Mapping](./hardware-software-mapping) | Which nodes, which off-the-shelf components |
| [3.4 Persistent Data Management](./persistent-data) | What is stored, where, in what form |
| [3.5 Access Control & Security](./access-control) | Who may do what, and how data is protected |
| [3.6 Global Software Control](./global-control-flow) | How the sequence of operations is determined |
| [3.7 Boundary Conditions](./boundary-conditions) | Start-up, termination, failure |

Each section closes by naming the design goals of [1.2](../introduction/design-goals) it serves and the requirements it realises, so that the correctness of the design — every decision justified by a requirement, every requirement met by a decision — can be checked in both directions.
