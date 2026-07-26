---
lang: en-US
title: "Should You Split That Into Microservices? Ask These 5 Questions First"
description: "Article(s) > Should You Split That Into Microservices? Ask These 5 Questions First"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - devops
  - design
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Should You Split That Into Microservices? Ask These 5 Questions First"
    - property: og:description
      content: "Should You Split That Into Microservices? Ask These 5 Questions First"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/should-you-split-that-into-microservices-ask-these-5-questions-first.html
prev: /academics/system-design/articles/README.md
date: 2026-08-01
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_205.png
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
  name="Should You Split That Into Microservices? Ask These 5 Questions First"
  desc="Nobody regrets microservices on day one. The regret shows up eighteen months later, when the team is drowning in distributed-systems problems they never needed…"
  url="https://milanjovanovic.tech/blog/should-you-split-that-into-microservices-ask-these-5-questions-first"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_205.png"/>

I've helped teams adopt microservices, and I've helped teams dig themselves out of microservices. The second group is bigger.

In almost every failure case, the decision to split came before the reasons did. The app might need to scale someday. The monolith feels messier every sprint. A conference talk made independent deployments look easy. None of those are reasons to take on a distributed system.

Meanwhile, the actual trade is brutal and specific: **microservices exchange local complexity for distributed complexity.** A method call becomes a network hop. A transaction becomes a saga. A stack trace becomes a distributed trace across three services and a queue.

![The same feature as a method call in a monolith, versus a network call between two services with retries, an outbox, idempotency, and tracing](https://milanjovanovic.tech/blogs/mnw_205/method_call_vs_distributed.png)

Sometimes that trade is worth it. I've made it myself, and I'd make it again *in the right situation*. The five questions below are how I find out. Answer them honestly and the decision usually makes itself.

---

## 1. Do Parts of the System Have Genuinely Different Scaling Needs?

I don't mean needs you might have someday. I mean needs you can measure today: one part of the system handles 100x the traffic of the rest, or needs a GPU, or eats memory in a way that forces you to size the whole deployment for its peak.

That's a real reason. Extracting a hot path so it can scale (and fail) independently is one of the best arguments for a service boundary.

![Three monolith instances each duplicating a hot Search module, versus one monolith instance plus three copies of an extracted Search service](https://milanjovanovic.tech/blogs/mnw_205/hot_path_scaling.png)

But check the honest version first: most .NET monoliths [**scale out fine behind a load balancer**](/milanjovanvic.tech/scaling-monoliths-a-practical-guide-for-growing-systems.md). If your whole app comfortably runs on three instances, you don't have a scaling problem worth a service boundary.

---

## 2. Are Teams Actually Blocking Each Other?

Microservices are an organizational tool as much as a technical one. The strongest version of this signal looks like: multiple teams, one codebase, and a release process where team A's half-finished feature delays team B's hotfix. Deploy trains, release freezes, merge queues that take a day.

![Three teams' changes feeding one release train, versus each team deploying its own service independently, with the hotfix already live](https://milanjovanovic.tech/blogs/mnw_205/deploy_train_vs_independent.png)

If that's your life, independent deployability has real value.

If you're a team of six, it isn't. One team doesn't step on itself hard enough to justify operating a distributed system. I'd go as far as saying: **below roughly two full teams, the organizational argument for microservices is zero.**

---

## 3. Can You Draw the Data Boundary?

This is the question that kills most splits, and it's the one people skip.

Each service must **own its data** outright. Owning it means no other service reads its tables directly, not even for one convenient join. If two candidate services constantly need each other's data to answer basic queries, they aren't two services. They're one service you're about to cut in half.

![Two candidate services, each owning its database, with red cross-boundary queries between them: one service, cut in half](https://milanjovanovic.tech/blogs/mnw_205/data_boundary_entanglement.png)

I learned this one the hard way, and wrote about it in [**the modular monolith boundary I couldn't take back**](/milanjovanvic.tech/the-modular-monolith-boundary-i-couldnt-take-back.md): a boundary that looks clean on the org chart can be hopelessly entangled at the data level. The entanglement doesn't go away when you add a network between the halves. It gets worse, because now every "join" is an API call, and [**keeping the data boundaries intact**](/milanjovanvic.tech/how-to-keep-your-data-boundaries-intact-in-a-modular-monolith.md) becomes a distributed problem.

---

## 4. Does Anything Require Independent Failure or Release?

Some parts of a system carry requirements the rest doesn't:

- A payment flow that must stay up even when the reporting module is down
- A component with a compliance boundary (PCI, HIPAA) where you want the audited surface as small as possible
- An integration that ships weekly while the core ships quarterly

These are legitimate isolation requirements, and a service boundary is a clean way to express them. Notice how specific they are. A general wish for isolation is not on the list.

![The rest of the system with Reporting down in one dashed boundary, and a healthy Payments service isolated in its own, where the PCI scope stops](https://milanjovanovic.tech/blogs/mnw_205/independent_failure_isolation.png)

---

## 5. Can You Afford the Platform Tax?

Before the first microservice delivers any value, you need: a container platform, CI/CD per service, centralized logging, [**distributed tracing**](/milanjovanvic.tech/introduction-to-distributed-tracing-with-opentelemetry-in-dotnet.md), a message broker, and the reliability patterns that make inter-service communication safe ([**outbox**](/milanjovanvic.tech/implementing-the-outbox-pattern.md), [**idempotent consumers**](/milanjovanvic.tech/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.md), retries with backoff).

That's the entry fee, paid in engineer-months, before benefit number one.

![Iceberg: one microservice above the waterline, with the container platform, CI/CD, logging, tracing, broker, and reliability patterns below it](https://milanjovanovic.tech/blogs/mnw_205/platform_tax_iceberg.png)

A team that can't spare that capacity doesn't get a cheaper version of microservices. It gets a distributed monolith with none of the benefits and all of the costs.

---

## Scoring It

The rule I use:

- **Four or five yes answers:** split, and start with one service, not twelve. Extract the piece with the clearest boundary and run it in production for a quarter before extracting the next.
- **Two or three:** you want modules, not services. A [**modular monolith**](/milanjovanvic.tech/what-is-a-modular-monolith.md) gives you the boundaries, the team ownership, and the option to split later, without the platform tax. The boundaries you enforce now are exactly [**what makes the eventual migration mechanical**](/milanjovanvic.tech/breaking-it-down-how-to-migrate-your-modular-monolith-to-microservices.md) instead of heroic.
- **Zero or one:** keep the monolith and invest the energy you just saved into making it excellent.

![The five questions feed one decision: how many honest yes answers. Four or five means microservices, two or three a modular monolith, zero or one keep the monolith](https://milanjovanovic.tech/blogs/mnw_205/five_questions_scoring.png)

The teams that regret microservices almost never got the technology wrong. They got this checklist wrong, eighteen months earlier, in the meeting where the split was decided before the reasons existed. Run the five questions before your version of that meeting.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Should You Split That Into Microservices? Ask These 5 Questions First",
  "desc": "Nobody regrets microservices on day one. The regret shows up eighteen months later, when the team is drowning in distributed-systems problems they never needed…",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/should-you-split-that-into-microservices-ask-these-5-questions-first.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
