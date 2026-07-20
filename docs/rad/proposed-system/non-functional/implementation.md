# 3.3.5 Implementation `[Mixed]`

> Flutter/Dart and local persistence are frozen for Release 1.0; the backend stack is `[EM – Deferred]`.

## Technology Stack

- **NFR-I.1.1**: Mobile: Flutter (Dart language)
- **NFR-I.1.2**: Backend: Python with Django and Django REST Framework
- **NFR-I.1.3**: Database: PostgreSQL (v12+)
- **NFR-I.1.4**: Caching: Redis for session/cache management
- **NFR-I.1.5**: Deployment: Docker containerization
- **NFR-I.1.6**: Build automation: GitHub Actions for build and verification

**Repository note:** The current GitHub repository (Simo-2004/TravelMate) is a Flutter mobile application (Release 1.0) and **does not** include a backend implementation. The backend technology stack listed above is a planned/preferred stack for a subsequent Evolutionary Maintenance cycle and should be treated as a recommendation rather than a current implementation.

Currently implemented in repository:

- Mobile: Flutter (Dart) — implemented (`lib/` contains the full Flutter app)
- Local persistence: SharedPreferences-based repositories (`lib/shared/data/*.dart`) — implemented
- State management: ValueNotifier-based singleton stores (`lib/shared/state/*.dart`) — implemented

Deferred (not present in repository):

- Django REST Framework backend, PostgreSQL database, Redis cache, server-side search, and messaging infrastructure.

## Development Standards

- **NFR-I.2.1**: All code shall follow PEP-8 (Python) and Dart style guides
- **NFR-I.2.2**: Code reviews shall be mandatory before merge
- **NFR-I.2.3**: Automated testing shall run on all pull requests
- **NFR-I.2.4**: Security scanning shall be integrated into the automated build and verification pipeline

## Version Control

- **NFR-I.3.1**: Git-based version control with semantic versioning
- **NFR-I.3.2**: Main branch shall always contain production-ready code
- **NFR-I.3.3**: Feature branches shall be used for development
- **NFR-I.3.4**: Release tags shall document version history
