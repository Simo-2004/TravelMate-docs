# 3.3.7 Packaging `[Mixed]`

> Android release packaging is frozen for Release 1.0; web and cloud distribution are `[EM – Deferred]`.

## Mobile Distribution

- **NFR-PK.1.1**: iOS app shall be distributed via Apple App Store
- **NFR-PK.1.2**: Android app shall be distributed via Google Play Store
- **NFR-PK.1.3**: Apps shall support minimum OS versions: iOS 12+, Android 7+
- **NFR-PK.1.4**: App shall be code-signed with valid certificates

## Web Deployment `[EM – Deferred]`

- **NFR-PK.2.1**: Web app shall be deployable to cloud platforms (AWS, GCP, Azure)
- **NFR-PK.2.2**: Docker images shall be published to container registries
- **NFR-PK.2.3**: Infrastructure as Code (Terraform/CloudFormation) shall define deployments
- **NFR-PK.2.4**: Environment-specific configurations shall be managed externally

## Release Management

- **NFR-PK.3.1**: Releases shall follow semantic versioning (MAJOR.MINOR.PATCH)
- **NFR-PK.3.2**: Release notes shall document features, fixes, and known issues
- **NFR-PK.3.3**: Beta releases shall be tested by internal teams before public release
- **NFR-PK.3.4**: Backward compatibility shall be maintained for at least 2 previous versions
