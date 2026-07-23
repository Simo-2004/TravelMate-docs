# 3.4.4 Dynamic Model

The diagrams distribute responsibilities among the analysis objects identified in [3.4.3](./object-model). Every sequence follows the flow **Actor → Boundary → Control → Entity**: the actor addresses only a boundary, controls orchestrate the use case, and entities never send messages back to controls or boundaries.

## 3.4.4.1 Sequence Diagram — Log In (UC2)

```mermaid
sequenceDiagram
    actor T as Traveler
    participant LF as LoginForm
    participant LC as LoginControl
    participant A as Account
    participant CN as ConfirmationNotice

    T->>LF: enterCredentials(username, secret)
    T->>LF: submit()
    LF->>LC: <<create>>
    LC->>A: verifyCredentials(username, secret)
    A-->>LC: accepted / rejected
    alt credentials accepted
        LC->>LF: openApplication()
        LF-->>T: application shell shown
    else credentials rejected
        LC->>CN: <<create>> showFailure()
        CN-->>T: "credentials not recognised"
    end
    destroy LC
    LC-->>LF: endLoginTransaction()
```

**Responsibilities assigned.** `LoginForm` collects and submits; `LoginControl` owns the flow and decides the outcome; `Account` answers only the question "do these credentials match?" and never drives navigation.

## 3.4.4.2 Sequence Diagram — Create Account (UC1)

```mermaid
sequenceDiagram
    actor T as Traveler
    participant CF as CreateAccountForm
    participant CC as CreateAccountControl
    participant A as Account
    participant TR as Traveler_Entity
    participant CN as ConfirmationNotice

    T->>CF: openForm()
    CF->>CC: <<create>>
    T->>CF: fillIdentity(name, surname, description, tags)
    T->>CF: choosePhoto()
    T->>CF: fillCredentials(username, secret)
    T->>CF: submit()
    CF->>CC: requestCreation(identity, credentials)
    CC->>CC: validate(identity, credentials)
    alt validation failed
        CC->>CF: showFieldErrors()
        CF-->>T: inline errors per field
    else validation passed
        CC->>A: <<create>> storeCredentials(username, secret)
        CC->>TR: <<create>> storeIdentity(identity)
        CC->>CN: <<create>> showSuccess()
        CN-->>T: profile created
        destroy CF
        CC->>CF: openApplication()
    end
```

**Note on the model.** Validation is a responsibility of the **control**, not of the entities: it concerns the use case (is this submission acceptable?) rather than the domain concepts themselves.

## 3.4.4.3 Sequence Diagram — Search Trips and Companions (UC3)

```mermaid
sequenceDiagram
    actor T as Traveler
    participant SF as SearchForm
    participant SC as SearchControl
    participant TR as Trip
    participant CO as Companion
    participant RV as SearchResultsView

    T->>SF: selectMode(trips | companions)
    T->>SF: enterQuery(text)
    SF->>SC: <<create>>
    SF->>SC: search(query, mode)
    alt mode = trips
        SC->>TR: matchAgainst(query)
        TR-->>SC: matching trips
    else mode = companions
        SC->>CO: matchAgainst(query)
        CO-->>SC: matching companions
    end
    SC->>SC: rankByRelevance()
    SC->>RV: <<create>> display(rankedResults)
    RV-->>T: ranked list
    T->>RV: selectResult()
    RV->>SC: openDetails(selection)
```

## 3.4.4.4 Sequence Diagram — Save a Bookmark (UC4)

```mermaid
sequenceDiagram
    actor T as Traveler
    participant DV as TripDetailsView
    participant BC as BookmarkControl
    participant B as Bookmark
    participant CN as ConfirmationNotice

    T->>DV: toggleBookmark()
    DV->>BC: <<create>>
    BC->>B: isAlreadySaved(target)
    B-->>BC: saved / not saved
    alt not yet saved
        BC->>B: <<create>> save(target)
        BC->>CN: <<create>> show("saved")
    else already saved
        destroy B
        BC->>B: remove(target)
        BC->>CN: <<create>> show("removed")
    end
    CN-->>T: outcome
    DV->>DV: refreshBookmarkIndicator()
```

## 3.4.4.5 Sequence Diagram — Converse with a Companion (UC5)

```mermaid
sequenceDiagram
    actor T as Traveler
    participant CW as ChatWindow
    participant CC as ChatControl
    participant CV as Conversation
    participant M as Message
    participant CO as Companion

    T->>CW: openConversation(companion)
    CW->>CC: <<create>>
    CC->>CV: retrieveHistory(companion)
    CV-->>CC: past messages
    CC->>CW: display(history)
    T->>CW: composeAndSend(text)
    CW->>CC: sendMessage(text)
    CC->>M: <<create>> outgoing(text)
    CC->>CV: append(message)
    CC->>CO: determineReply(text)
    CO-->>CC: reply text
    CC->>M: <<create>> incoming(replyText)
    CC->>CV: append(reply)
    CC->>CW: display(updatedThread)
    CW-->>T: conversation updated
```

## 3.4.4.6 Sequence Diagram — Share a Trip in a Conversation (UC6)

```mermaid
sequenceDiagram
    actor T as Traveler
    participant CW as ChatWindow
    participant AP as TripAttachmentPicker
    participant IC as TripInviteControl
    participant B as Bookmark
    participant TR as Trip
    participant CO as Companion
    participant CV as Conversation

    T->>CW: requestAttachTrip()
    CW->>IC: <<create>>
    IC->>B: listSavedTrips()
    B-->>IC: saved trips
    IC->>AP: <<create>> display(savedTrips)
    T->>AP: selectTrip()
    destroy AP
    AP->>IC: inviteWith(trip)
    IC->>CV: append(inviteMessage)
    IC->>TR: describingTags()
    TR-->>IC: trip tags
    IC->>CO: wouldAccept(tripTags)
    CO-->>IC: accepts / declines
    IC->>CV: append(companionResponse)
    CV-->>CW: updated thread
    CW-->>T: invite and response shown
```

**Object discovered through this diagram.** Building this sequence made explicit that the decision to accept or decline is a *domain* judgement belonging to the **Companion** (it depends on that companion's own tags), not a rule of the chat use case. The responsibility was therefore assigned to the `Companion` entity rather than to `TripInviteControl` — an example of the sequence diagram refining the object model.

## 3.4.4.7 Statechart — Companion Presence

The presence indicator shown beside a companion's name is state-dependent behaviour of a single object, and is therefore modelled as a statechart.

```mermaid
stateDiagram-v2
    [*] --> Offline
    Offline --> Online : Traveler activity in conversation
    Online --> Online : further activity (timer restarts)
    Online --> Offline : idle timeout elapsed
    Offline --> Hidden : Traveler enables Offline mode
    Online --> Hidden : Traveler enables Offline mode
    Hidden --> Offline : Traveler disables Offline mode
    note right of Hidden
        While the Traveler is invisible,
        no companion presence is disclosed
    end note
```

## 3.4.4.8 Statechart — Bookmark Lifecycle

```mermaid
stateDiagram-v2
    [*] --> NotSaved
    NotSaved --> Saved : toggleBookmark()
    Saved --> NotSaved : toggleBookmark()
    Saved --> Saved : reopened from BookmarkListView
    NotSaved --> [*]
```

## 3.4.4.9 Envisioned Dynamic Behaviour (deferred)

The following flows belong to the envisioned platform and are not realised by the delivered system.

- **Token-based authentication**: credentials are validated by a remote service that issues a session token with a limited lifetime, refreshed transparently by the client.
- **Compatibility matching**: candidate travellers are scored on shared interests, destination overlap, travel style, and availability, then ranked by the resulting compatibility percentage.
- **Real-time messaging**: a message is delivered over the network to a second real Traveler, who is notified, and whose reading of the message updates the sender's view with a read receipt.
