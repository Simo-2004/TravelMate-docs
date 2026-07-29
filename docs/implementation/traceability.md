# 4.3 Design-to-Code Traceability

The correspondence between the interfaces specified in [ODD 3](../odd/class-interfaces/) and the files of the source. It is recorded so that a specified element can be located without searching, and so that the source can be shown to contain what the specification requires and nothing beyond it.

## Rule of correspondence

The location of an element follows from two rules rather than from a decision taken per element.

**The directory follows from the package.** An element specified in a section of [ODD 3](../odd/class-interfaces/) is located in the directory assigned to that package by [ODD 2](../odd/packages).

**The file name follows from the class name.** A class named in the specification is located in the file bearing its name, converted from the capitalised form to the lower-case form separated by underscores.

Applied together, the rules determine the file from the specification alone: `ProfileRepository`, specified under Persistence, is located at `shared/data/profile_repository.dart`. The tables below record the result of the rules, not a mapping established independently of them.

## Presentation

Specified in [ODD 3.1](../odd/class-interfaces/presentation).

| Specified element | File |
|-------------------|------|
| `NavigationController`, `NavigationScope` | `features/navigation/navigation_controller.dart` |
| `NavigationShell` | `features/navigation/navigation_shell.dart` |
| `NavigationItem`, `NavigationStyle`, `NavigationConfig`, `NavigationDefaults` | `features/navigation/navigation_config.dart` |
| `LoginScreen` | `features/auth/login_screen.dart` |
| `CreateAccountScreen` | `features/auth/create_account_screen.dart` |
| `HomeScreen` | `features/home/home_screen.dart` |
| `SearchScreen`, `SearchResultsScreen`, `MateDetailsScreen` | `features/search/`, one file each |
| `SavedItemsScreen` | `features/saved/saved_items_screen.dart` |
| `ChatScreen` | `features/chat/chat_screen.dart` |
| `TravelScheduleScreen` | `features/schedule/travel_schedule_screen.dart` |
| `PersonalProfileScreen` | `features/profile/personal_profile_screen.dart` |
| `SettingsScreen`, `PrivacySettingsScreen`, `SupportScreen` | `features/settings/`, one file each |
| `AppSnackBar` | `shared/widgets/app_snackbar.dart` |
| `AppStrings`, `AppColors`, `AppSizes` | `core/constants/`, one file each |
| `AppTextStyles`, `AppTheme` | `core/theme/`, one file each |
| `AppTransitions` | `shared/transitions/app_transitions.dart` |

The remaining shared interface elements are specified by group rather than individually, as recorded in [ODD 3.1](../odd/class-interfaces/presentation). Each is located in `shared/widgets/` under the rule above.

## Application State

Specified in [ODD 3.2](../odd/class-interfaces/application-state). Every element is located in `shared/state/`.

| Specified element | File |
|-------------------|------|
| `AuthService` | `auth_service.dart` |
| `PersonalProfileStore` | `personal_profile_store.dart` |
| `PrivacySettingsStore` | `privacy_settings_store.dart` |
| `SavedTripPreviewStore` | `saved_trip_preview_store.dart` |
| `ChatStore` | `chat_store.dart` |
| `TripStore` | `trip_store.dart` |
| `SearchResearchModeStore` | `search_research_mode_store.dart` |

## Domain Logic

Specified in [ODD 3.3](../odd/class-interfaces/domain-logic). The rules are located in `shared/utils/` and the domain objects in `shared/models/`.

| Specified element | File |
|-------------------|------|
| Trip ranking | `shared/utils/trip_search.dart` |
| Companion ranking | `shared/utils/mate_search.dart` |
| Reply selection | `shared/utils/chat_auto_reply.dart` |
| Proposal matching | `shared/utils/trip_invite.dart` |
| `AccountValidation` | `shared/utils/account_validation.dart` |
| `TagInput` | `shared/utils/tag_input.dart` |
| `PersonalProfile`, `MateProfile`, `TripTileData`, `TripTag`, `ChatMessage`, `SavedTripPreview`, `PrivacySettings` | `shared/models/`, one file each |
| `TripTagCodec` | `shared/models/trip_tag_codec.dart` |
| `SearchResearchMode` | `shared/models/search_research_mode.dart` |

The four ranking and matching operations are not classes, and the rule naming a file after its class does not apply to them. Each is located in a file named after the operation it provides.

## Persistence

Specified in [ODD 3.4](../odd/class-interfaces/persistence). Every element is located in `shared/data/`.

| Specified element | File |
|-------------------|------|
| `ProfileDataSource` *(interface)* | `profile_data_source.dart` |
| `SqliteProfileData`, `PersonalProfileData` | `sqlite_profile_data.dart`, `personal_profile_data.dart` |
| `ChatDataSource` *(interface)* | `chat_data_source.dart` |
| `SqliteChatData`, `ChatHistoryData` | `sqlite_chat_data.dart`, `chat_history_data.dart` |
| `SavedBookmarksData`, `PrivacySettingsData` | one file each |
| `ProfileRepository`, `AccountRepository`, `ChatRepository`, `TripRepository` | one file each |
| The built-in catalogues | `trip_catalog.dart`, `mate_catalog.dart`, `chat_auto_reply_catalog.dart`, `trip_tag_catalog.dart`, `trip_media_catalog.dart`, `mate_tag_palette.dart` |

## Data Access

Specified in [ODD 3.5](../odd/class-interfaces/data-access). Every element is located in `core/database/`.

| Interface | File | Concrete class | File |
|-----------|------|----------------|------|
| `ProfileDao` | `profile_dao.dart` | `ProfileSqfliteDao` | `profile_sqflite_dao.dart` |
| `AccountDao` | `account_dao.dart` | `AccountSqfliteDao` | `account_sqflite_dao.dart` |
| `ChatDao` | `chat_dao.dart` | `ChatSqfliteDao` | `chat_sqflite_dao.dart` |
| `TripDao` | `trip_dao.dart` | `TripSqfliteDao` | `trip_sqflite_dao.dart` |

`DatabaseHelper` is located in `database_helper.dart`.

## Security

Specified in [ODD 3.6](../odd/class-interfaces/security). Every element is located in `core/security/`.

| Specified element | File |
|-------------------|------|
| `AesCipher` | `aes_cipher.dart` |
| `PasswordHasher`, `HashedPassword` | `password_hasher.dart` |
| `ProfileKeyProvider` | `profile_key_provider.dart` |
| `SecureKeyStore` *(interface)* | `secure_key_store.dart` |
| `FlutterSecureKeyStore` | `flutter_secure_key_store.dart` |

## Media Storage

Specified in [ODD 3.7](../odd/class-interfaces/media-storage). Both elements are located in `features/profile/image/`.

| Specified element | File |
|-------------------|------|
| `ProfileImageStorage` | `profile_image_storage.dart` |
| `ProfileImagePicker` | `profile_image_picker.dart` |

## Interfaces

An interface and the concrete class realizing it are located in **separate files of the same directory**, the interface bearing its own name and the realization bearing the name specified for it in [ODD 1.2](../odd/introduction/interface-guidelines).

The separation is what makes the dependency rule of [ODD 2](../odd/packages) checkable by inspection: a class depending on an interface names the interface file, and a class naming a realization file instead is visibly in breach.

Only the assembly of the system names realizations. Each is named in the factory constructor that composes an object with its standard dependencies, and in no other place.

## Elements sharing a file

The naming rule assigns one file to one class. A file additionally holds a type that exists only to serve the class named after it:

| File | Additionally holds | Relation |
|------|--------------------|----------|
| `password_hasher.dart` | `HashedPassword` | The value the class returns |
| `privacy_settings.dart` | `PrivacySettingKey` | The enumeration addressing the class |
| `saved_trip_preview.dart` | `SavedBookmarkType` | The kinds the class distinguishes |
| `navigation_controller.dart` | `NavigationScope` | The means by which the controller is reached |
| `chat_auto_reply_catalog.dart` | `ChatAutoReplyRule` | The entry the catalogue holds |
| `mate_tag_palette.dart` | `MateTagPaletteEntry` | As above |
| `trip_repository.dart` | `TripCollections`, the result type of the read operation | The named collections and the pair returned |
| `navigation_config.dart` | `NavigationItem`, `NavigationStyle`, `NavigationDefaults` | The configuration and its parts |

A type carried in this way is one the class cannot be used without. Separating it would oblige every caller to name two files where the specification declares one element, and the specification records each such type under the class it serves.

Classes private to a file — the internal state of a screen, an element used by one screen alone — are not specified and are located with the class they serve.

## Verification in both directions

Correspondence is established in both directions, neither being sufficient alone.

**Every specified element has a file.** The tables above are complete with respect to [ODD 3](../odd/class-interfaces/): each element specified there appears in one of them.

**Every public element has a specification.** A class present in the source and absent from [ODD 3](../odd/class-interfaces/) would be an element introduced during construction and never designed. The source contains none, with one qualification recorded in [ODD 3.1](../odd/class-interfaces/presentation): the shared interface elements are specified by group rather than individually, and are traced to their directory rather than to a named entry.

The second direction is the one the V-model requires and the one a table alone cannot establish. It is what distinguishes a specification the source realises from a specification the source has departed from.
