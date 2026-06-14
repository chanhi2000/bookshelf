---
lang: en-US
title: "The Modular Monolith Boundary I Couldn't Take Back"
description: "Article(s) > The Modular Monolith Boundary I Couldn't Take Back"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Modular Monolith Boundary I Couldn't Take Back"
    - property: og:description
      content: "The Modular Monolith Boundary I Couldn't Take Back"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-modular-monolith-boundary-i-couldnt-take-back.html
prev: /academics/system-design/articles/README.md
date: 2026-06-20
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_199.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Desgin > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Modular Monolith Boundary I Couldn't Take Back"
  desc="We built the system exactly the way a modular monolith is supposed to be built, and that's how I ended up with two modules I couldn't pull apart a year later. Here's how a reasonable boundary decision turns into one you can't undo, and the early signals I walked right past."
  url="https://milanjovanovic.tech/blog/the-modular-monolith-boundary-i-couldnt-take-back"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_199.png"/>

We built the system the way you're supposed to: a [**modular monolith**](/milanjovanovic.tech/what-is-a-modular-monolith.md), one module per business domain, modules talking to each other through events so nothing was tightly coupled.

The system let dealers and customers build an order together on a showroom floor. So giving that order-building collaboration its own module, separate from the product catalog, was an easy decision to defend. They were two distinct domains, and separating them into modules is textbook.

It took about a year, and a piece of business context none of us had at the start, for that decision to quietly stop being reversible.

---

## The Setup

This was the [**40-year-old system I wrote about rewriting**](/milanjovanovic.tech/what-rewriting-a-40-year-old-project-taught-me-about-software-development.md). The backend is a manufacturing ERP, with the dealer ordering tool layered on top.

Two areas felt obviously distinct. The **Catalog** module owned products, configurations, options, and pricing. The **Collaboration** module owned the back-and-forth of building an order: drafts, comments, approvals, revisions. It looked like a clean separation: different responsibilities, different parts of the team.

![Day one: Catalog and Collaboration as two cleanly separated modules, linked only by a single asynchronous events flow](https://milanjovanovic.tech/blogs/mnw_199/clean_boundary_day_one.png)

Splitting them was the deliberate call, not a reflex, and every choice that followed held up on its own.

---

## The Slow Snowball

The trouble started as ordinary feature work.

A collaboration screen needed product options, so it read from the catalog. Then it needed live pricing too. Then a requirement landed: an order had to reflect catalog changes immediately. None of them looked like an architecture decision.

But every one of them added a thread between `Collaboration` and `Catalog`. The two modules I had carefully separated were weaving themselves back together, one feature at a time. The boundary was still there in the folder structure. It had stopped being there in any way that mattered.

![Catalog and Collaboration a year later, linked by events, two reads, and a synchronous price check](https://milanjovanovic.tech/blogs/mnw_199/coupling_a_year_later.png)

---

## The Assumption That Aged Badly

The deeper problem was the communication style, and it's the decision I'd still defend hardest. Across the whole rewrite, modules [**communicated asynchronously**](/milanjovanovic.tech/modular-monolith-communication-patterns.md), through events. It kept modules decoupled during a high-stakes migration and let us replace the legacy system one piece at a time. Catalog publishes an event, Collaboration reacts when it gets to it, and the two stay independent.

That held up right until the business needed an order to be correct *now*. A dealer changes a configuration, and the price has to be right the instant they hit save. Eventual consistency had been the right assumption for every requirement we knew about. The requirement that broke it didn't exist yet when we drew the boundary.

![Eventual consistency on day one versus the later need for immediate consistency between Collaboration and Catalog](https://milanjovanovic.tech/blogs/mnw_199/eventual_vs_immediate_consistency.png)

You can't bolt immediate consistency onto an asynchronous boundary. So we did what everyone does: synchronous calls, shared transactions, and workarounds to paper over the gap. Fix by fix, the system was telling us that, given the consistency the business now needed, these two belonged in one module.

---

## The Signals That Didn't Look Like Signals

In hindsight, the signals were all there. At the time, not one of them looked like a signal.

- **Collaboration constantly read Catalog's data.** I took it for ordinary cross-module traffic, when it was really the boundary telling me the two belonged together.
- **Nearly every new Collaboration feature reached into Catalog.** That feels like healthy growth, right up until you notice it's merge pressure.
- **We kept adding event handlers just to keep the two in sync.** It passed for good event-driven design, and it was actually the coupling I wanted to avoid, wearing a disguise.
- **Then came the first "this has to be correct immediately" hotfix.** Easy to wave off as a one-off, except it was the eventual-consistency assumption starting to crack.

Any one of these is invisible. Together, over a year, they're the whole story.

---

## What I'd Tell My Past Self

**A module boundary is a guess, so treat it like one.** You're guessing - so keep testing the guess instead of filing it away as settled.

**Start with fewer, coarser modules.** You can always split a module once the seam is obvious. When you're unsure, [**keep things together**](/milanjovanovic.tech/how-to-keep-your-data-boundaries-intact-in-a-modular-monolith.md) and let a module earn its independence. It's the same instinct as waiting for the [**third repetition before you extract an abstraction**](/milanjovanovic.tech/dry-is-the-most-misunderstood-rule-in-programming.md).

![Splitting one coarse module into two is cheap and low risk; merging two modules back into one is expensive and risky](https://milanjovanovic.tech/blogs/mnw_199/split_is_cheap_merge_is_expensive.png)

**Let consistency draw your boundaries.** Eventual consistency across a boundary is a bet that they never will. Make that bet on purpose, not by default.

**Watch the cheap decisions, not the expensive ones.** We pour deliberation into decisions that are easy to reverse and wave through the ones that quietly aren't. A module boundary feels cheap, because on the day you draw it, it is. The cost shows up later, compounding, which is exactly why nobody's watching when it does.

---

## The Part That's Uncomfortable

None of this means modular monoliths are a trap, or that async messaging is a mistake. I'd build it as a modular monolith again tomorrow. Every call was sound for the context we had, and that context was incomplete in a way nobody could see yet.

The lesson is smaller and harder to sit with: the boundaries you draw earliest are the ones most likely to be invalidated by what you learn later, and the least likely to be revisited once they are. The door wasn't one-way when I walked through it. It became one-way behind me, one reasonable feature at a time.

---

## Summary

- A module boundary is a **guess** made when you know the least, so treat it as provisional, not settled.
- Prefer **fewer, coarser modules**. Splitting one later is cheap - merging two back together is the expensive, risky direction.
- Let **consistency** draw your boundaries. If two things have to be correct at the same instant, they belong on the same side of the line.

If you want a structured way to design module boundaries, and the judgment for when to keep modules together or split them apart, that's exactly what I teach in [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Modular Monolith Boundary I Couldn't Take Back",
  "desc": "We built the system exactly the way a modular monolith is supposed to be built, and that's how I ended up with two modules I couldn't pull apart a year later. Here's how a reasonable boundary decision turns into one you can't undo, and the early signals I walked right past.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-modular-monolith-boundary-i-couldnt-take-back.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
