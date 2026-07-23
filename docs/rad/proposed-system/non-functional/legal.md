# 3.3.8 Legal `[Mixed]`

> Release 1.0 stores data only on the user's own device and transmits nothing. Several security controls that were previously aspirational are now **implemented and verifiable** in the codebase; the remaining obligations presuppose an account-based, networked service and stay `[EM – Deferred]`.

## Security & Credential Protection `[R1.0 – Frozen]`

- **NFR-L.1.1**: Login passwords shall never be stored in a reversible form — only a PBKDF2-HMAC-SHA256 salted hash is persisted (`PasswordHasher`)
- **NFR-L.1.2**: Password verification shall use constant-time comparison to avoid leaking information through timing
- **NFR-L.1.3**: Sensitive data at rest shall be encrypted with AES-256-GCM, including personal profile fields, the account username, and chat message content
- **NFR-L.1.4**: The encryption key shall be generated with a cryptographically secure random source and held in the OS keystore/keychain, never in the application database or source code
- **NFR-L.1.5**: Encrypted payloads shall be authenticated, so tampering with the database file is detectable on decryption

> **Residual gap, disclosed:** saved bookmarks and privacy preferences are still written as plain JSON to `SharedPreferences`, and profile photos are stored as ordinary files in the app's private directory (protected by OS app-sandboxing, not by application-level encryption). These are low-sensitivity by comparison, but they are not covered by NFR-L.1.3.

## Privacy & Data Protection `[Mixed]`

- **NFR-L.2.1**: `[R1.0 – Frozen]` The application shall collect no data beyond what the user enters on their own device, and shall transmit nothing off-device — there is no analytics, telemetry, or network client of any kind
- **NFR-L.2.2**: `[EM – Deferred]` System shall comply with GDPR regulations
- **NFR-L.2.3**: `[EM – Deferred]` Users shall have right to data export in machine-readable format (JSON/CSV)
- **NFR-L.2.4**: `[EM – Deferred]` Users shall have right to be forgotten (account deletion with data removal)
- **NFR-L.2.5**: `[EM – Deferred]` Privacy policy shall be presented and accepted during registration
- **NFR-L.2.6**: `[EM – Deferred]` Data retention policies shall comply with regulations

## Transport & Operational Security `[EM – Deferred]`

- **NFR-L.3.1**: Communications shall use TLS 1.3+
- **NFR-L.3.2**: System shall conduct periodic security audits
- **NFR-L.3.3**: Security incidents shall be logged and tracked

## Terms of Service `[EM – Deferred]`

- **NFR-L.4.1**: Terms of Service shall be agreed upon at registration
- **NFR-L.4.2**: Changes to ToS shall require user acknowledgment
- **NFR-L.4.3**: System shall maintain an audit trail of user consent

## Intellectual Property

- **NFR-L.5.1**: `[EM – Deferred]` User-generated content license terms shall be clearly stated
- **NFR-L.5.2**: `[R1.0 – Frozen]` Third-party library licenses shall be compatible with the project license — Release 1.0's dependencies (`flutter_svg`, `shared_preferences`, `sqflite`, `encrypt`, `pointycastle`, `flutter_secure_storage`, `image_picker`, `path`, `path_provider`, `cupertino_icons`) are all permissively licensed
