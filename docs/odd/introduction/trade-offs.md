# 1.1 Object Design Trade-offs

> **Status: placeholder.**

To be written: the trade-offs resolved during object design, each stated as the alternatives available, the criterion applied, and the decision taken.

Intended scope:

- **Buy or build** — for each capability obtained from an off-the-shelf library rather than written, the reason for the choice and what it commits the design to.
- **Memory against response time** — where data is held in memory to avoid a read, and where the read is repeated to avoid holding it.
- **Generality against simplicity** — where an interface admits more than the delivered system needs, and where it is deliberately narrow.
- **Testability against directness** — where an abstraction is introduced so a class can be exercised without a device.

Each trade-off is to be traced to the design goals of [SDD 1.2](../../sdd/introduction/design-goals) whose priority decided it.
