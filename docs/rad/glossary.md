# 4. Glossary

Definitions of the domain, business, and technical terms used in this document. Where a term denotes something belonging to the envisioned platform rather than to the delivered system, this is stated.

## Actors and people

**Traveler** — The person using the application: the only actor of the delivered system.

**Companion** — A potential travel mate presented by the system. In the delivered system companions are catalogue entries, not other users; their replies in conversation are produced by the system from their recorded characteristics.

**Administrator** — A moderator who reviews reports and sanctions misconduct. Envisioned only.

**Trip Creator / Trip Participant** — The organiser of a journey and those who join it. Envisioned only.

## Domain concepts

**Account** — The credentials admitting the Traveler to the application. The delivered system holds one.

**Profile** — A Traveler's travel identity: name, description, photograph, and the labels describing their interests and trip preferences.

**Trip** — A travel itinerary with a destination, a description, illustrations, and characterising labels. The delivered system offers a fixed catalogue; creating one is envisioned only.

**Trip Tag** — A reusable label describing the character of a trip, drawn from a shared vocabulary and used both to describe trips and to express a Traveler's preferences.

**Bookmark / Saved Item** — A saved reference to a trip or a companion, kept in a single collection.

**Conversation** — The exchange between the Traveler and one companion.

**Message** — A single utterance within a conversation, optionally carrying a trip as a proposal.

**Auto-reply** — The response a companion gives, determined by the system from the content of the Traveler's message.

**Presence** — The indication of whether a companion appears available. In the delivered system it is simulated: a companion appears present while the exchange is active and absent after a short period of inactivity.

**Privacy Preferences** — The Traveler's stated choices about visibility and messages.

**Compatibility Score** — A measure of how well two travellers match. Envisioned only.

**Itinerary** — A detailed plan of activities and timings within a trip. Envisioned only.

**Moderation** — Review of user-generated content against the community rules. Envisioned only.

**Report** — A submission flagging another Traveler's conduct. Envisioned only.

## Analysis and modelling

**Entity object** — An analysis object representing a concept of the domain and the information the system retains about it.

**Boundary object** — An analysis object representing the interaction between an actor and the system, in the user's terms rather than in terms of a visual interface.

**Control object** — An analysis object coordinating boundaries and entities for the duration of one use case, holding no domain data of its own.

**Use case** — A description of what an actor obtains from the system, stated as an entry condition, a flow of events, and an exit condition.

**Scenario** — A concrete narrative instance of a use case, used to elicit and to illustrate requirements.

**Association / Aggregation / Composition** — Structural relationships between entities: a plain connection; a whole–part relationship whose parts exist independently; and a whole–part relationship whose parts do not.

**Generalisation** — The factoring of attributes common to several entities into a shared parent.

## Technical terms

**Encryption at rest** — Protection applied to data as stored, so that it cannot be read by someone inspecting the stored data without the key.

**Authenticated encryption** — Encryption that additionally makes alteration of the stored data detectable.

**Non-reversible storage** — Storage of a credential in a form from which the original cannot be recovered; verification re-derives the stored value from what the user supplies.

**Cross-platform framework** — A framework allowing one body of logic to serve several target platforms.

**Relational store** — A store organising data into tables with defined relationships, queried rather than read whole.

**Version control / Semantic versioning** — The recording of successive states of the source, and the numbering convention conveying the nature of each change.

**Continuous integration** — Automatic building, testing, and analysis of every change.

**Code coverage** — The proportion of the source exercised by the automated tests.
