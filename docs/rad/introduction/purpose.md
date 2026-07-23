# 1.1 Purpose of the System

TravelMate is designed to address the challenge of finding travel companions with compatible interests and travel styles. The envisioned system provides:

- A platform for travelers to create profiles highlighting their interests and preferred destinations
- Search and discovery tools to browse compatible travelers and trips
- A conversational channel for coordination and planning between travelers
- A safe, moderated environment for interaction between users

**Release 1.0** realises a self-contained demonstration of this experience on a single device, backed by a real local persistence and security stack: the user signs up or logs in against an account stored in a local **SQLite** database (username AES-encrypted, password stored only as a **PBKDF2** salted hash), then browses a catalog of trips and companion profiles, ranks them by a free-text search query, bookmarks favourites, maintains an **encrypted** personal profile with a photo picked from the device gallery, and can hold a **simulated conversation** with a companion through a local, keyword-based auto-reply engine whose message text is encrypted at rest.

No remote server is involved and there are no other real users: companion profiles are catalog data, and their replies are generated on-device. Multi-user accounts, real matching between distinct people, real-time messaging, and moderation are part of the long-term vision but are **not** realised in this lifecycle (see [1.2 Scope](./scope)).
