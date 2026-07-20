# 3.3.8 Legal `[EM – Deferred]`

> Release 1.0 collects no personal data beyond what the user types into their own local profile, which never leaves the device. There is no account, no registration, and no data transmission, so the compliance obligations below — which presuppose an account-based, networked service — do not yet apply. They are recorded here as targets for the platform envisioned in the Feasibility Study.

## Privacy & Data Protection

- **NFR-L.1.1**: System shall comply with GDPR regulations
- **NFR-L.1.2**: Users shall have right to data export in machine-readable format (JSON/CSV)
- **NFR-L.1.3**: Users shall have right to be forgotten (account deletion with data removal)
- **NFR-L.1.4**: Privacy policy shall be presented and accepted during registration
- **NFR-L.1.5**: Data retention policies shall comply with regulations (delete after account closure)

## Security & Compliance

- **NFR-L.2.1**: All passwords shall be hashed using bcrypt (or better)
- **NFR-L.2.2**: Sensitive data shall be encrypted at rest (AES-256)
- **NFR-L.2.3**: Communications shall use TLS 1.3+
- **NFR-L.2.4**: System shall conduct annual security audits
- **NFR-L.2.5**: Security incidents shall be logged and tracked

## Terms of Service

- **NFR-L.3.1**: Terms of Service shall be agreed upon at registration
- **NFR-L.3.2**: Changes to ToS shall require user acknowledgment
- **NFR-L.3.3**: System shall maintain audit trail of user consent

## Intellectual Property

- **NFR-L.4.1**: User-generated content license terms shall be clearly stated
- **NFR-L.4.2**: Third-party library licenses shall be compatible with project license — Release 1.0's dependencies (`flutter_svg`, `shared_preferences`, `cupertino_icons`) are all permissively licensed
