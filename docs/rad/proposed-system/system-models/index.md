# 3.4 System Models

The analysis model describes the system through three complementary views, derived from the scenarios and use cases gathered during requirements elicitation.

| View | Question answered | Instruments used here |
|------|-------------------|-----------------------|
| **Functional model** | What does the system do? | Scenarios, use cases, use case diagram |
| **Structural model** | What is the system made of? | Analysis class diagram (Entity–Boundary–Control) |
| **Dynamic model** | How does it behave over time? | Sequence diagrams, statecharts |

These models describe the application domain as seen by the user, not the software that implements it: the storage mechanism, the data-access components, and the cryptographic machinery are design decisions, specified in the System Design Document and the Object Design Document rather than here.

## Contents

- [3.4.1 Scenarios](./scenarios)
- [3.4.2 Use Case Model](./use-case-model)
- [3.4.3 Object Model](./object-model) — actors, EBC objects, class diagram, associations
- [3.4.4 Dynamic Model](./dynamic-model) — sequence diagrams, statecharts
- [3.4.5 UI-Navigational Paths & Screen Mockups](./ui-navigational-paths)
