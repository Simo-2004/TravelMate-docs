# 5.2 System Testing

The levels at which the system is exercised, what each level establishes, and the results obtained.

The commands running the suite are given in [4.4](../implementation/build-process) and are not repeated. This chapter states what the tests **establish**, not how they are run.

## Organisation of the suite

The suite is divided by **testing level**. Each level answers a different question, and the level a test belongs to states what kind of failure it reports.

| Level | Scope | Answers the specification in |
|-------|-------|------------------------------|
| **Unit** | One function, in isolation | [ODD 3.3](../odd/class-interfaces/domain-logic), [3.6](../odd/class-interfaces/security) |
| **Object** | One class, over its whole interface and every state it can hold | [ODD 3](../odd/class-interfaces/) |
| **Component** | One widget or screen, through its own interface | [ODD 3.1](../odd/class-interfaces/presentation) |
| **Integration** | Several layers wired together, across their interfaces | [SDD 3.2](../sdd/proposed-architecture/subsystem-decomposition) |
| **System** | The assembled application, driven as a person would | [RAD 3.4.2](../rad/proposed-system/system-models/use-case-model) |

Two further suites are defined by **concern** rather than by level: regression and security.

The whole suite runs headless. No test needs an emulator or a device, which is possible because every platform facility sits behind an interface, as required by [DG-M1](../sdd/introduction/design-goals) and realised in [ODD 3](../odd/class-interfaces/). A shared harness supplies in-memory stand-ins for the data access classes and the key store.

## Unit level

Pure functions and static operations, with no state and no dependencies. Same input, same result, every time.

| File | Under test |
|------|-----------|
| `search_test.dart` | Trip and companion ranking, including multi-term matching |
| `chat_logic_test.dart` | Reply selection and proposal matching |
| `validation_test.dart` | Field validation and tag normalisation, at every boundary |
| `codec_test.dart` | Label conversion, round trip and tolerance of malformed stored values |
| `crypto_test.dart` | The cipher and the credential derivation, as algorithms |

These establish the purity claimed in [ODD 3.3](../odd/class-interfaces/domain-logic): a result computed from the arguments alone, verified by supplying arguments and comparing.

## Object level

Where a unit test exercises one function, an object test exercises one **class**: every operation it offers, over every state it can hold — defaults, derived values, copies, conversion to and from the stored form, and the notifications a state-owning class publishes as its value changes.

| File | Under test |
|------|-----------|
| `model_classes_test.dart` | The seven domain objects |
| `catalog_classes_test.dart` | The built-in catalogues, the navigation configuration classes and the sizing class |
| `store_classes_test.dart` | Six of the state-owning classes |
| `chat_store_test.dart` | The conversation store: messages, presence transitions, and the timed behaviour |
| `navigation_controller_test.dart` | The destination controller and the scope reaching it |

## Component level

A component is several classes composed behind one interface. Each screen is driven through **its own** interface, with stand-ins behind it — never through the real account service or the real gallery. This is the substitutable-operation arrangement specified in [ODD 3.1](../odd/class-interfaces/presentation), exercised.

| File | Under test |
|------|-----------|
| `widgets_test.dart`, `widget_variants_test.dart` | The shared interface elements and their variants |
| `screens_test.dart` | Each screen presented on its own |
| `auth_screens_test.dart` | Entry and account creation |
| `search_test.dart` | The search screen and its results |
| `saved_items_test.dart` | The saved tab, including how a saved item is matched |
| `home_screen_test.dart` | The home tab and its shortcuts |
| `chat_invite_test.dart` | Attaching a trip to a conversation, accepted and declined |
| `profile_photo_test.dart` | The profile picture and the upload flow |
| `tag_editing_test.dart` | Adding and removing tags |
| `snackbar_test.dart` | The brief message element |

## Integration level

Each class is already covered alone. These tests wire the layers together and check what happens **between** them. Only the lowest edge is replaced — the data access classes and the key store — so every interface above it is exercised as specified.

| File | Under test |
|------|-----------|
| `profile_persistence_test.dart` | Key provider → cipher → repository → data access, and the data source above them |
| `chat_persistence_test.dart` | The same chain for conversations, with the store on top |
| `auth_persistence_test.dart` | The encrypted username and the derived password together |
| `trip_persistence_test.dart` | Catalogue seeding, ordering, labels and image lists |
| `legacy_storage_test.dart` | The preference-store data sources on the read path |
| `profile_image_storage_test.dart` | The copy into private storage, against the real file system |

The chain in the first two files is the layering of [SDD 3.1](../sdd/proposed-architecture/overview) exercised end to end: a domain object entering at the top is encrypted, converted to a record, and read back unchanged.

`profile_image_storage_test.dart` is the one test that reaches a real facility. The class it exercises takes the directory as an argument rather than resolving it, so it can be run against an ordinary temporary directory — the design decision recorded in [ODD 3.7](../odd/class-interfaces/media-storage).

## System level

The real application widget, the real screens, the real state-owning classes. Nothing is replaced except the platform plugins. Each test follows a complete task the way a person would perform it, entirely through the interface: no state is set directly and no screen is constructed by hand.

| File | What is driven |
|------|---------------|
| `app_boot_test.dart` | The application starts locked; only a valid credential unlocks it |
| `app_journeys_test.dart` | Moving between tabs, saving on one tab and finding it on another, conversation history outliving the screen, and signing out re-locking the application |

These are the tests that answer the RAD. The correspondence between each use case and the tests exercising it is given in [5.3](./requirements-traceability).

## Regression suite

Not organised by level. Each test names a **specific defect that was fixed** and asserts the behaviour that replaced it, so a change that quietly brings the defect back fails with a clear label rather than somewhere unrelated.

The behaviours pinned are: a brief message replacing rather than queueing behind an earlier one; message identifiers continuing rather than restarting after the application is started again; the saved control changing colour rather than swapping its icon; the read-path fallback happening once and not again; and a photograph being held as a path and never as image content.

## Security suite

The other levels ask whether the system works. These ask what someone who obtains the stored files can read, and what happens if they alter them. They exercise the guarantees of [SDD 3.5](../sdd/proposed-architecture/access-control) from the position of the holder of the files.

| Property | What is checked |
|----------|----------------|
| **Integrity** | A ciphertext altered in the tag or in the body fails to decrypt; a truncated payload fails rather than decrypting in part; unusable content fails predictably |
| **Confidentiality** | Content encrypted under one key cannot be read under another; the same value encrypts differently each time; the key is generated once and not rewritten |
| **Confidentiality at rest** | No field of the stored profile row survives as readable text, and message text is unreadable at rest — with a control asserting that the check would fail if the values were readable |
| **Irreversibility** | The application itself cannot turn the stored password back into the secret; identical passwords produce different stored values |
| **Hostile input** | Query metacharacters and wildcards are treated as data, never as part of a query |

The third row is worth noting for its form: a test that finds no readable text proves nothing unless it would fail when readable text is present. The suite includes that control.

## Results

The whole suite passes.

| Level | Files | Tests |
|-------|:-----:|:-----:|
| Unit | 5 | 80 |
| Object | 5 | 94 |
| Component | 11 | 126 |
| Integration | 6 | 58 |
| System | 2 | 12 |
| Regression | 1 | 9 |
| Security | 1 | 20 |
| **Total** | **31** | **399** |

Coverage measured from this suite is recorded in [5.1](./system-quality).

The distribution follows the design. The component level is the largest because the interface has the most classes; the system level is the smallest because a system test covers a whole task and few are needed to reach every use case.

## Limits of the suite

**No test exercises a real database or a real key store.** The stand-ins replace the data access classes and the key store, so every interface above them is exercised but the classes that address the platform libraries are never run. These are the classes excluded from coverage in [4.5](../implementation/quality-criteria), and the exclusion and this limit are the same fact seen from two sides.

What this leaves unverified is narrow, because those classes hold no decision: each composes a command, issues it, and returns what it yields. What is not established by any test is that the command is accepted by the real engine — only that the class builds and issues the one the interface specifies.

**The suite runs on one platform.** Behaviour that differs between operating systems, such as where the key store keeps its values, is not exercised. [SDD 3.3](../sdd/proposed-architecture/hardware-software-mapping) records that Android is the platform the design targets and against which it is verified.
