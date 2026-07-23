# 3.4.5 UI-Navigational Paths & Screen Mockups

This section describes the paths a Traveler follows through the interface and what each screen presents. It complements the boundary objects of [3.4.3](./object-model): those state *what* is exchanged between the Traveler and the system, while this section states *where* it is exchanged and *how one arrives there*.

## Navigational structure

The application opens on the login screen. Nothing else is reachable until the Traveler is admitted, after which four principal destinations are available at all times through the bottom navigation.

```
Login
├─ credentials ─────────────────────────► admitted
└─ Create Account ──────────────────────► admitted

Once admitted — four permanent destinations:

Home ──────────► Trip Details
Search ────────► Trip Details
       └───────► Companion Profile ────► Conversation ──► Trip Details
Saved ─────────► Trip Details
       └───────► Companion Profile
Settings ──────► Profile Editor
         └─────► Privacy Preferences
         └─────► Assistance
         └─────► leave ──────────────────► Login
```

Trip Details is reachable from four places — the two carousels on Home, a search result, a saved item, and a trip shared inside a conversation — which is why it is presented identically in each case.

## Screens

| Screen | What it presents | Boundary object |
|--------|------------------|-----------------|
| **Login** | Credentials, the means to submit them, and the way to create an account instead | LoginForm |
| **Create Account** | The fields of a travel identity, the choice of a photograph, and the credentials to be established | CreateAccountForm |
| **Home** | Recommended trips and trips consulted recently, and a way into search | HomeView |
| **Search** | The choice between trips and companions, a query, and the ranked results | SearchForm, SearchResultsView |
| **Trip Details** | A trip's destination, description, illustrations, and characterising labels, with the means to save it | TripDetailsView |
| **Companion Profile** | A companion's identity, interests, and trip preferences, with the means to save them or open a conversation | CompanionProfileView |
| **Conversation** | The exchange with one companion, the companion's presence, and the means to write, to share a saved trip, and to discard the exchange | ChatWindow, TripAttachmentPicker |
| **Saved** | Everything the Traveler has set aside, trips and companions together | BookmarkListView |
| **Settings** | The profile in summary, and the way to each of the settings screens and out of the application | — |
| **Profile Editor** | The Traveler's own identity, open to revision, with the means to confirm or abandon | ProfileEditorForm |
| **Privacy Preferences** | The four preferences, each open to change | PrivacySettingsView |
| **Assistance** | Frequently asked questions and the means to request help | — |

Every screen that alters stored data reports the outcome through a transient notice (ConfirmationNotice), as required by [NFR-U.4](../non-functional/usability).

## Screens of the envisioned platform

The following belong to the envisioned platform and have no counterpart in the delivered system: password recovery and email verification; a multi-step introduction for a first-time Traveler; a conversations list and group conversations; a section devoted to the Traveler's own trips, those they have joined, and the creation of new ones; the list of Travelers they have blocked; account management including obtaining and erasing one's data; and the dialogues for reporting or blocking another Traveler.

Two of these deserve mention because they are commonly expected of an application of this kind and are deliberately absent. A **swipeable recommendation feed** presenting one companion at a time with a compatibility percentage would require the matching described in [3.2.2](../functional); the delivered system offers instead the Home carousels and the ranked results of a search. An **advanced filter screen**, restricting results by age, budget, language, or location, would require information the delivered system does not hold about companions.
