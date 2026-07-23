# RAD - Requirements Analysis Document

This document records the results of requirements elicitation and analysis for TravelMate. It describes the system in terms of functional and non-functional requirements together with the models that formalise them, and serves as the reference against which the design and the delivered software are verified.

## Software Life Cycle Model Choice

Although the project follows a sequential approach for drafting its documentation (RAD, SDD, ODD), the life cycle adopted departs from the pure Waterfall model in favor of a **V-Model with feedback**.

This engineering choice was driven by the need to integrate modern Continuous Integration practices (via GitHub Actions) and static/dynamic code analysis (via SonarCloud). The V-Model preserves the documentary rigor typical of sequential models, while pairing each design phase with a corresponding verification and validation phase. Specifically, the development of software components was constantly validated through Unit Testing, ensuring Code Coverage above 80% and enabling rapid feedback cycles for defect correction.

## Scope of this lifecycle

The requirements in this document describe the TravelMate platform as envisioned. The present lifecycle does not deliver all of them: it delivers a self-contained application running entirely on the Traveler's device, without a server and therefore without other real users.

Requirements are accordingly presented in two groups throughout the document. Those stated as satisfied are met by the delivered system; those collected under **Deferred to future releases** belong to the envisioned platform and would be addressed by a subsequent evolution. Nothing is presented as satisfied unless the delivered software meets it — a discipline the V-Model requires, since every requirement said to be met must have a corresponding verification.

## Overview of the system

TravelMate lets a traveller find companions with compatible interests and travel styles, and agree with them on a journey. The delivered application admits the Traveler through a local account, then allows them to browse a catalogue of trips and companion profiles, search both by free text, save those of interest, maintain a personal profile protected on the device, and hold a conversation with a companion about a possible journey.

Its principal capabilities are:

- **Account and profile** — registration and login against a locally held account, and a personal travel identity with interests and trip preferences
- **Discovery** — free-text search with relevance ranking across trips and companions
- **Saved items** — a single collection of the trips and companions a Traveler wishes to revisit
- **Conversation** — an exchange with a companion, including the sharing of a saved trip as a proposal
- **Privacy and data protection** — recorded privacy preferences, with personal data and conversation content protected where it is stored
