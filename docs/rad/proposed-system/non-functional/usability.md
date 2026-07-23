# 3.3.1 Usability `[Mixed]`

> Verified against the repository: the mobile interface, text-scaling clamp, and navigation are `[R1.0 – Frozen]`. Dark theme, a guided onboarding flow, and a formal accessibility audit do **not** exist in the codebase and are corrected or deferred below.

## User Interface Design `[R1.0 – Frozen]`

- **NFR-U.1.1**: The mobile app shall follow Material Design 3 conventions
- **NFR-U.1.2**: The interface shall use responsive layout primitives (`LayoutBuilder`, `MediaQuery`) so content adapts to the available width
- **NFR-U.1.3**: ~~The system shall support dark and light themes~~ — **corrected**: `AppTheme` (`lib/core/theme/app_theme.dart`) defines only a light theme; dark theme is `[EM – Deferred]`

## User Experience `[Mixed]`

- **NFR-U.2.1**: `[R1.0 – Frozen]` New users shall be able to complete sign-up in a single screen that collects profile identity and credentials together, with per-field inline validation errors (`CreateAccountScreen`). A first-run default account is seeded so the app is also usable without signing up; a multi-step guided onboarding flow (welcome, interests, destinations) remains `[EM – Deferred]`
- **NFR-U.2.2**: `[R1.0 – Frozen]` Core flows (search, save, edit profile, open chat) shall be reachable within 3 taps from the bottom navigation
- **NFR-U.2.3**: `[R1.0 – Frozen]` User-facing confirmations (e.g. save/unsave, settings changes, chat history cleared) shall be surfaced via a `SnackBar`
- **NFR-U.2.4**: `[EM – Deferred]` The system shall provide contextual help and tooltips for complex features

## Accessibility `[Mixed]`

- **NFR-U.3.1**: `[R1.0 – Frozen]` The app shall clamp text scaling between 0.9x and 1.2x so user font-size preferences are respected without breaking layout (`TravelMateApp.builder`, `lib/main.dart`)
- **NFR-U.3.2**: `[EM – Deferred]` The application shall comply with WCAG 2.1 Level AA standards — **no accessibility audit has been performed** against Release 1.0; this is a target for a future lifecycle, not a verified property
- **NFR-U.3.3**: `[EM – Deferred]` The mobile app shall support screen readers (VoiceOver, TalkBack) with verified semantics labelling
