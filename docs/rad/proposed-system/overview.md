# 3.1 Overview

The envisioned TravelMate system is a social platform for travellers: a mobile client, an application server, and a shared database, through which registered users discover one another, agree on journeys, and coordinate them by messaging. This end state is described in the Feasibility Study.

The present lifecycle delivers a **self-contained application running entirely on the Traveler's own device**. It is a complete two-layer client — presentation and local relational storage — but it has no network tier. The consequence, which shapes the whole of this chapter, is that there is no second real user: companions are catalogue data, and the replies they give in conversation are produced by the system itself from their recorded characteristics.

What the delivered system does provide is the full experience of discovering, saving, and corresponding about journeys, together with the account, persistence, and data-protection foundations on which a networked release would be built.

## Scope of the delivered system

| Area | Delivered | Deferred |
|------|-----------|----------|
| **Account** | Registration, login, sign-out against a single local account | Email verification, external identity providers, several accounts, password recovery |
| **Profile** | Identity, description, photograph, freely chosen interest and trip labels | — |
| **Privacy** | Four recorded preferences, of which absence governs behaviour | Enforcement of visibility, proximity, and message acceptance |
| **Discovery** | Free-text search over trips and companions, with ranking | Restriction by age, budget, language or location; compatibility scoring |
| **Trips** | Browsing a fixed catalogue and its details | Creating a trip, requesting to join, managing participants |
| **Saved items** | Saving and removing trips and companions | — |
| **Conversations** | Exchange with a companion, presence indication, sharing a saved trip | Messaging between real Travelers, group conversations, read receipts, notifications |
| **Administration** | — | Reporting, moderation, suspension, audit |

Requirements for each area follow in [3.2](./functional); the qualities they must exhibit are stated in [3.3](./non-functional/).
