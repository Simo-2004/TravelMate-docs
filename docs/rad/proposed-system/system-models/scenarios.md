# 3.4.1 Scenarios

Scenarios are concrete narratives of particular people using the system. They describe single instances rather than the whole range of possibilities, and it is from them that the use cases in [3.4.2](./use-case-model) are abstracted.

The first three describe the delivered system. The last two are visionary scenarios: they describe the envisioned platform and are recorded to show what the deferred requirements are for.

## Scenario 1 — Giulia sets herself up

**Actor:** Giulia, who has just installed the application.

Giulia opens TravelMate for the first time and is met by a login screen. Rather than use the account already on the device, she chooses to create her own. She types her name and surname and describes herself in a couple of lines — she likes slow journeys and coastal towns — then adds *beaches*, *food*, and *weekend trips* as the things she is interested in. She picks a photograph of herself from her phone. Finally she chooses a username and a password; when her first password proves too short, the form says so beneath the field, and she lengthens it. She submits, and the application opens on her own profile.

**Outcome:** Giulia has an account on her device. The next time she opens the application she will be asked for the username and password she chose, and her description, labels, and photograph will be as she left them.

## Scenario 2 — Marco finds a journey worth keeping

**Actor:** Marco, who has been admitted to the application and is on a train with no signal.

Marco opens the application to pass the time. The first screen offers him a row of recommended journeys and another of ones he looked at recently. One of them catches his attention, and he opens it: a set of photographs, a description of the destination, and a handful of labels — *road trip*, *scenic*, *nature*. He decides he wants to come back to it, and marks it. The mark fills in immediately. Later he opens the section holding everything he has set aside, and the journey is there, waiting.

**Outcome:** Marco has set a journey aside without a connection at any point, and it will still be there when he returns.

## Scenario 3 — Giulia proposes a journey to a companion

**Actor:** Giulia, who has already set aside a journey to the Greek islands.

Giulia wants to know what the application would feel like if she used it to arrange something. She searches among companions for someone interested in *islands*, and the application offers her a handful, the closest match first. She opens one — Sofia, who likes city breaks and museums — and starts a conversation. She writes a greeting; Sofia answers, and appears as present while they are talking. Giulia then proposes the journey she had set aside. Sofia reads the proposal and declines politely: island-hopping is not the sort of thing she is drawn to. Giulia goes back to the results and tries someone whose interests sit closer to her own.

**Outcome:** Giulia has been through the whole sequence — finding someone, talking to them, proposing something concrete, and receiving an answer that depends on who she asked.

> Sofia is not another person using TravelMate. She is one of the companions the application offers, and her answer is worked out by the system from the interests recorded against her. This is what makes the scenario a rehearsal of the experience rather than the experience itself.

## Scenario 4 — Sarah travels to Japan *(visionary)*

**Actor:** Sarah, twenty-eight, who would rather not go alone.

Sarah is planning three months ahead and wants company for safety as much as for enjoyment. She registers, confirms her email address, and searches for people going to Japan in the same season, narrowing by age and by the languages she speaks. The platform ranks the results by how well each person's interests, destinations, and travel style agree with hers, and shows the figure it arrived at. She writes to the closest match; he replies that evening. Over the following weeks they settle the details between them, and in the spring they travel together.

**Requires:** verified registration, search filters, compatibility scoring, and messaging between real people — all deferred.

## Scenario 5 — An Administrator intervenes *(visionary)*

**Actor:** An Administrator responsible for the conduct of the community.

A Traveler reports another for messages she found offensive, and states why. The report reaches the Administrator together with the exchange it refers to. He reads both, judges the complaint founded, and warns the offending Traveler. When the behaviour continues, he suspends the account for a week and explains why.

**Requires:** accounts, real messaging, reporting, and moderation — all deferred.
