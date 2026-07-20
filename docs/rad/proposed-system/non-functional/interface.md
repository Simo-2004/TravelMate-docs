# 3.3.6 Interface `[EM – Deferred]`

> The REST/JWT/OAuth interfaces below require the remote backend and are therefore deferred to a future Evolutionary Maintenance lifecycle. They do not bind Release 1.0.

## API Standards

- **NFR-IF.1.1**: All APIs shall follow RESTful principles
- **NFR-IF.1.2**: API responses shall use JSON format
- **NFR-IF.1.3**: API shall use standard HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- **NFR-IF.1.4**: API rate limiting: 1000 requests/hour per user
- **NFR-IF.1.5**: API endpoints shall include pagination, filtering, and sorting

## Authentication & Authorization

- **NFR-IF.2.1**: APIs shall use JWT Bearer tokens for authentication
- **NFR-IF.2.2**: Tokens shall expire after 24 hours
- **NFR-IF.2.3**: Role-based access control (RBAC) shall enforce permissions
- **NFR-IF.2.4**: All sensitive endpoints shall require authentication
- **NFR-IF.2.5**: API shall support OAuth2 for third-party integrations

## Data Format

- **NFR-IF.3.1**: Timestamps shall use ISO 8601 format (UTC)
- **NFR-IF.3.2**: Currencies shall be represented with ISO 4217 codes
- **NFR-IF.3.3**: Coordinates shall use WGS 84 (GPS) format
- **NFR-IF.3.4**: Phone numbers shall support international format (E.164)
