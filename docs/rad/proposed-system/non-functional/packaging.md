# 3.3.7 Packaging `[Mixed]`

> Android build/signing and GitHub-based distribution are `[R1.0 – Frozen]` (see [Deployment](/deployment)); app-store publication and web/cloud distribution are `[EM – Deferred]`.

## Mobile Distribution

- **NFR-PK.1.1**: `[R1.0 – Frozen]` Android app shall be built in `release` mode and distributed as an APK via GitHub Releases
- **NFR-PK.1.2**: `[R1.0 – Frozen]` App shall be code-signed for release builds
- **NFR-PK.1.3**: `[EM – Deferred]` iOS app shall be distributed via Apple App Store
- **NFR-PK.1.4**: `[EM – Deferred]` Android app shall be distributed via Google Play Store

> Release 1.0 is **not** published to any app store; it is distributed as a downloadable APK attached to a GitHub Release.

## Web Deployment `[EM – Deferred]`

- **NFR-PK.2.1**: Web app shall be deployable to cloud platforms (AWS, GCP, Azure)
- **NFR-PK.2.2**: Docker images shall be published to container registries
- **NFR-PK.2.3**: Infrastructure as Code (Terraform/CloudFormation) shall define deployments

## Release Management `[R1.0 – Frozen]`

- **NFR-PK.3.1**: Releases shall follow semantic versioning (MAJOR.MINOR.PATCH), as declared in `pubspec.yaml` (`version: 1.0.0+1`)
- **NFR-PK.3.2**: Release notes shall document the scope of Release 1.0 (see [Deployment](/deployment))
