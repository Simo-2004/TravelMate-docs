# 1.1 Purpose of the System

TravelMate lets a Traveler describe themselves, discover trips and companions, set aside those of interest, and converse with a companion about a possible journey. The full statement of purpose is given in [RAD 1.1](../../rad/introduction/purpose) and is not repeated here.

What matters for the design is the consequence of the scope fixed in [RAD 1.2](../../rad/introduction/scope): the system runs **entirely on one device, with no server**. Three properties follow, and they shape every decision in this document.

**There is no network tier.** Nothing may be designed on the assumption that data can be fetched, synchronised, or validated remotely. Every function is served from the device, and the absence of a connection is the normal operating condition rather than a degraded one.

**There is a single user and a single account.** Access control has one subject, not many. There is no session to distribute, no concurrent access by distinct principals, and no role hierarchy to enforce.

**The device is the trust boundary.** Because the data never leaves the device, protecting it means protecting it *at rest*: whoever obtains the stored files must not be able to read the Traveler's personal data or recover their credentials. This is the security problem the design actually has, and [3.5](../proposed-architecture/access-control) addresses it.

The design must also leave the system open to acquiring a network tier later, without that acquisition forcing a rewrite. This is a design goal, stated with its priority in [1.2](./design-goals) — not a licence to build server infrastructure now.
