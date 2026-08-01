# Feasibility Study: TravelMate

## 1. Purpose

This is the first formal step of the lifecycle adopted for TravelMate. Its purpose is to decide whether the project should begin. It states the problem, weighs the options for addressing it, estimates the time and resources needed, and records the decision taken.

## 2. Definition of the problem

A traveller looking for someone to travel with has no dedicated means of finding one. General social platforms are not built for it: they offer no way to match on the things that decide whether two people travel well together — budget, interests, pace, and the kind of trip each has in mind. A search carried out through them is slow, and it puts the traveller in contact with strangers without any of the checks such a meeting would call for.

The problem calls for a dedicated application, built around matching and around the safety of the people using it.

## 3. Options considered

Three decisions settle the shape of the project.

| Decision | Option taken | Reason |
|----------|-------------|--------|
| **Development technology** | A cross-platform framework, compiling one body of logic to more than one platform | One codebase rather than one per platform, which is what makes the schedule attainable by a single developer |
| **Architecture and data** | A self-contained application, holding its data on the device | Removes the cost of running a server and a remote database, which a zero budget cannot cover |
| **Visual design** | The interface is prototyped before it is built | Settling the interface in advance avoids rework in the later phases, which a sequential lifecycle makes expensive |

The second decision is the one that shapes the rest. An application that keeps its data on the device needs no infrastructure, so the project can be delivered at no cost; but it also means the data has no server to fall back on, which is why the protection of stored data becomes a leading concern in the phases that follow.

### 3.1 Full product vision

Beyond this release, TravelMate is conceived as a full platform for travellers. The vision is recorded here to guide any later development, not to commit this lifecycle to building it:

- A **client-server architecture** — mobile and web front ends, an application backend, a shared database — giving access to an account from any device.
- **Identity verification**, trust and safety measures, and moderation tools for an administrator.
- **Matching performed on the server** at scale, **messaging between real people**, notifications, and trips planned jointly.
- The obligations a networked platform carries: data protection duties, availability, and capacity for a large number of users.

Building any part of this is **evolutionary maintenance**. It starts a new lifecycle, beginning with a feasibility study of its own.

### 3.2 Scope of this lifecycle

The project has a **zero budget** and a **fixed schedule of fourteen weeks**. Building the full vision within them is not possible, so the scope was cut deliberately rather than discovered to be too large partway through.

**This lifecycle delivers a self-contained application** covering the core of the product: a personal profile, search for trips and companions, saved items, conversations, and privacy preferences — all held on the device, with no network.

The rest of the vision is recorded as **deferred**. The RAD carries each deferred item in the section of its module that lists them, and two whole modules — trip organisation and administration — are deferred in full. They are written down so that the record of the intended product stays complete, but they are outside what this lifecycle commits to.

This keeps every later phase working from one buildable baseline, which is what allows the design, the code and the tests to be checked against each other.

## 4. Time and resources

The work is grouped into phases and spread over fourteen weeks, one work package per phase, each starting only when the one before it is complete.

<img src="/static/pics/diagramma-di-gantt.png" alt="Gantt chart of the fourteen-week schedule" width="100%" style="border: 1px solid #ddd; border-radius: 7px;" />

The diagonal shape and the absence of any bar reaching back into an earlier phase are what the sequential lifecycle means in practice: a phase ends with its documents fixed, and they are not reopened unless a formal review calls for it.

The resource estimate is one developer for the whole period. No paid service, licence or hosting is required, which is what holds the cost at zero.

## 5. Conclusion

The assessment of costs against benefits is positive. A cross-platform framework and an application that holds its own data keep the project inside a zero budget and a fourteen-week schedule, and leave enough of that schedule for the design and verification a sequential lifecycle requires.

**The study is approved.** The project starts, and the next phase is the [Requirements Analysis Document](./rad/overview), in which the requirements are stated formally.
