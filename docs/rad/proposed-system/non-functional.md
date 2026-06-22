# 3.3 Non-Functional Requirements

## 3.3.1 Usability

### User Interface Design
- **NFR-U.1.1**: The mobile app shall follow Material Design 3 guidelines for Android and Human Interface Guidelines for iOS
- **NFR-U.1.2**: The web interface shall be responsive and functional on devices from 320px to 2560px width
- **NFR-U.1.3**: All interactive elements shall have minimum 48x48 dp touch target size
- **NFR-U.1.4**: The system shall support dark and light themes

### User Experience
- **NFR-U.2.1**: New users shall complete onboarding in < 5 minutes
- **NFR-U.2.2**: Core user flows shall require ≤ 3 taps/clicks to complete
- **NFR-U.2.3**: All error messages shall be clear and provide actionable solutions
- **NFR-U.2.4**: The system shall provide contextual help and tooltips for complex features
- **NFR-U.2.5**: Load times for profile pages shall be ≤ 1 second (P95)

### Accessibility
- **NFR-U.3.1**: The application shall comply with WCAG 2.1 Level AA standards
- **NFR-U.3.2**: All text shall have minimum contrast ratio of 4.5:1 (normal text) or 3:1 (large text)
- **NFR-U.3.3**: The mobile app shall support screen readers (VoiceOver, TalkBack)
- **NFR-U.3.4**: All interactive elements shall be keyboard navigable
- **NFR-U.3.5**: The system shall support text size customization

## 3.3.2 Reliability

### Availability
- **NFR-R.1.1**: System shall maintain 99.5% uptime (< 3.6 hours downtime/month)
- **NFR-R.1.2**: All critical features shall have automatic failover mechanisms
- **NFR-R.1.3**: Database shall be replicated across at least 2 geographic regions
- **NFR-R.1.4**: API servers shall be load-balanced with auto-scaling

### Error Handling
- **NFR-R.2.1**: The system shall gracefully handle network interruptions
- **NFR-R.2.2**: Failed requests shall be automatically retried up to 3 times with exponential backoff
- **NFR-R.2.3**: All errors shall be logged with full context for debugging
- **NFR-R.2.4**: User sessions shall be recovered automatically upon reconnection

### Data Integrity
- **NFR-R.3.1**: All data modifications shall be atomically committed
- **NFR-R.3.2**: Database shall support ACID transactions
- **NFR-R.3.3**: Backup shall occur every 6 hours with point-in-time recovery capability
- **NFR-R.3.4**: Data consistency shall be validated through checksums

### Crash Recovery
- **NFR-R.4.1**: Mobile app shall not crash under normal operating conditions
- **NFR-R.4.2**: Unsaved user input shall be automatically recovered after crashes
- **NFR-R.4.3**: Crash logs shall be automatically reported for analysis

## 3.3.3 Performance

### Response Times
- **NFR-P.1.1**: API response time (P95) shall be ≤ 500ms for read operations
- **NFR-P.1.2**: Search queries shall respond within 2 seconds for standard filters
- **NFR-P.1.3**: Profile page shall load and render within 1 second (P95)
- **NFR-P.1.4**: Chat messages shall sync within 500ms (P95)
- **NFR-P.1.5**: Matching algorithm shall complete within 5 seconds for 10K+ profiles

### Throughput
- **NFR-P.2.1**: System shall support at least 10,000 concurrent users
- **NFR-P.2.2**: API shall handle 1,000 requests per second
- **NFR-P.2.3**: Database shall support 500 concurrent connections
- **NFR-P.2.4**: Chat system shall handle 100 messages per second

### Resource Utilization
- **NFR-P.3.1**: Mobile app APK/IPA size shall not exceed 150MB
- **NFR-P.3.2**: Memory usage on mobile devices shall not exceed 200MB during normal operation
- **NFR-P.3.3**: API server CPU usage shall not exceed 70% under peak load
- **NFR-P.3.4**: Database query time shall be optimized with indexes (< 100ms for typical queries)

### Optimization
- **NFR-P.4.1**: Images shall be optimized and compressed (WebP format supported)
- **NFR-P.4.2**: API responses shall support field filtering to reduce payload size
- **NFR-P.4.3**: Database queries shall be optimized and avoid N+1 problems
- **NFR-P.4.4**: Frontend shall implement lazy loading and virtualization for lists

## 3.3.4 Supportability

### Maintainability
- **NFR-S.1.1**: Code shall follow established style guides and conventions
- **NFR-S.1.2**: All public APIs shall be documented with Swagger/OpenAPI
- **NFR-S.1.3**: Database schema changes shall be managed through migrations
- **NFR-S.1.4**: Code shall achieve minimum 70% test coverage
- **NFR-S.1.5**: All functions shall have documentation comments

### Extensibility
- **NFR-S.2.1**: Architecture shall support adding new modules without major refactoring
- **NFR-S.2.2**: Plugin system shall allow third-party integrations
- **NFR-S.2.3**: API versioning shall support backward compatibility
- **NFR-S.2.4**: Database schema shall support future feature additions

### Debugging
- **NFR-S.3.1**: System shall provide comprehensive logging at DEBUG, INFO, WARN, ERROR levels
- **NFR-S.3.2**: Logs shall include request/response tracing IDs
- **NFR-S.3.3**: Error tracking system shall aggregate and analyze exceptions
- **NFR-S.3.4**: Developer tools shall support local testing and staging environments

## 3.3.5 Implementation

### Technology Stack
- **NFR-I.1.1**: Mobile: Flutter (Dart language)
- **NFR-I.1.2**: Backend: Python with Django and Django REST Framework
- **NFR-I.1.3**: Database: PostgreSQL (v12+)
- **NFR-I.1.4**: Caching: Redis for session/cache management
- **NFR-I.1.5**: Deployment: Docker containerization
- **NFR-I.1.6**: CI/CD: GitHub Actions or GitLab CI

**Repository note:** The current GitHub repository (Simo-2004/TravelMate) is a Flutter mobile application (MVP) and **does not** include a backend implementation. The backend technology stack listed above is a planned/ preferred stack for Phase 2+ and should be treated as a recommendation rather than a current implementation.

Currently implemented in repository:
- Mobile: Flutter (Dart) — implemented (`lib/` contains the full Flutter app)
- Local persistence: SharedPreferences-based repositories (`lib/shared/data/*.dart`) — implemented
- State management: ValueNotifier-based singleton stores (`lib/shared/state/*.dart`) — implemented

Planned (not present in repository):
- Django REST Framework backend, PostgreSQL database, Redis cache, server-side search, and messaging infrastructure.

### Development Standards
- **NFR-I.2.1**: All code shall follow PEP-8 (Python) and Dart style guides
- **NFR-I.2.2**: Code reviews shall be mandatory before merge
- **NFR-I.2.3**: Automated testing shall run on all pull requests
- **NFR-I.2.4**: Security scanning shall be integrated into CI/CD pipeline

### Version Control
- **NFR-I.3.1**: Git-based version control with semantic versioning
- **NFR-I.3.2**: Main branch shall always contain production-ready code
- **NFR-I.3.3**: Feature branches shall be used for development
- **NFR-I.3.4**: Release tags shall document version history

## 3.3.6 Interface

### API Standards
- **NFR-IF.1.1**: All APIs shall follow RESTful principles
- **NFR-IF.1.2**: API responses shall use JSON format
- **NFR-IF.1.3**: API shall use standard HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- **NFR-IF.1.4**: API rate limiting: 1000 requests/hour per user
- **NFR-IF.1.5**: API endpoints shall include pagination, filtering, and sorting

### Authentication & Authorization
- **NFR-IF.2.1**: APIs shall use JWT Bearer tokens for authentication
- **NFR-IF.2.2**: Tokens shall expire after 24 hours
- **NFR-IF.2.3**: Role-based access control (RBAC) shall enforce permissions
- **NFR-IF.2.4**: All sensitive endpoints shall require authentication
- **NFR-IF.2.5**: API shall support OAuth2 for third-party integrations

### Data Format
- **NFR-IF.3.1**: Timestamps shall use ISO 8601 format (UTC)
- **NFR-IF.3.2**: Currencies shall be represented with ISO 4217 codes
- **NFR-IF.3.3**: Coordinates shall use WGS 84 (GPS) format
- **NFR-IF.3.4**: Phone numbers shall support international format (E.164)

## 3.3.7 Packaging

### Mobile Distribution
- **NFR-PK.1.1**: iOS app shall be distributed via Apple App Store
- **NFR-PK.1.2**: Android app shall be distributed via Google Play Store
- **NFR-PK.1.3**: Apps shall support minimum OS versions: iOS 12+, Android 7+
- **NFR-PK.1.4**: App shall be code-signed with valid certificates

### Web Deployment
- **NFR-PK.2.1**: Web app shall be deployable to cloud platforms (AWS, GCP, Azure)
- **NFR-PK.2.2**: Docker images shall be published to container registries
- **NFR-PK.2.3**: Infrastructure as Code (Terraform/CloudFormation) shall define deployments
- **NFR-PK.2.4**: Environment-specific configurations shall be managed externally

### Release Management
- **NFR-PK.3.1**: Releases shall follow semantic versioning (MAJOR.MINOR.PATCH)
- **NFR-PK.3.2**: Release notes shall document features, fixes, and known issues
- **NFR-PK.3.3**: Beta releases shall be tested by internal teams before public release
- **NFR-PK.3.4**: Backward compatibility shall be maintained for at least 2 previous versions

## 3.3.8 Legal

### Privacy & Data Protection
- **NFR-L.1.1**: System shall comply with GDPR regulations
- **NFR-L.1.2**: Users shall have right to data export in machine-readable format (JSON/CSV)
- **NFR-L.1.3**: Users shall have right to be forgotten (account deletion with data removal)
- **NFR-L.1.4**: Privacy policy shall be presented and accepted during registration
- **NFR-L.1.5**: Data retention policies shall comply with regulations (delete after account closure)

### Security & Compliance
- **NFR-L.2.1**: All passwords shall be hashed using bcrypt (or better)
- **NFR-L.2.2**: Sensitive data shall be encrypted at rest (AES-256)
- **NFR-L.2.3**: Communications shall use TLS 1.3+
- **NFR-L.2.4**: System shall conduct annual security audits
- **NFR-L.2.5**: Security incidents shall be logged and tracked

### Terms of Service
- **NFR-L.3.1**: Terms of Service shall be agreed upon at registration
- **NFR-L.3.2**: Changes to ToS shall require user acknowledgment
- **NFR-L.3.3**: System shall maintain audit trail of user consent
- **NFR-L.3.4**: Prohibited content policies shall be clearly defined

### Intellectual Property
- **NFR-L.4.1**: User-generated content license terms shall be clearly stated
- **NFR-L.4.2**: Copyright notices shall be included in all materials
- **NFR-L.4.3**: Third-party library licenses shall be compatible with project license

### Liability
- **NFR-L.5.1**: Terms shall limit liability for user interactions
- **NFR-L.5.2**: Terms shall address dispute resolution mechanisms
- **NFR-L.5.3**: Terms shall include liability limitations for service interruptions
