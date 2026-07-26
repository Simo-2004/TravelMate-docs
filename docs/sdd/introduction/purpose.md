# 1.1 Purpose of the System

TravelMate lets a Traveler describe themselves, discover trips and companions, set aside those of interest, and converse with a companion about a possible journey. The purpose of the system is stated in full in [RAD 1.1](../../rad/introduction/purpose).

What concerns the design is the **shape** that purpose takes: TravelMate is a self-contained application that runs entirely on the Traveler's own device. Everything the Traveler does is served locally, from data held locally, under an account held locally.

That shape is what the architecture is built for, and it settles three things at the outset.

**The device is the whole system.** Every function is computed and every value stored on one node, so the design is free of the concerns that dominate distributed systems — no topology, no protocol, no latency budget, no partial failure. What it gains in exchange is that responsiveness is entirely within its control: nothing the Traveler does waits on anything outside the device.

**Access has a single subject.** One Traveler, one account. Authentication establishes who is using the application; there are no roles to arrange, no rights to delegate, and no concurrent principals to arbitrate between.

**The device is the trust boundary.** Because data stays on the device, protecting it means protecting it *where it rests*: the design's security obligation is that whoever obtains the stored files cannot read the Traveler's personal data or recover their credentials. This is the security problem the system genuinely has, and the one the architecture solves.

The design must also stay open to acquiring a network tier in a later release, so that doing so is an addition beneath the existing logic rather than a rewrite of it. This is a design goal with a stated priority — deliberately a low one — rather than a licence to build server machinery now.
