---
lang: en-US
title: "MediatR and MassTransit Going Commercial: What This Means For You"
description: "Article(s) > MediatR and MassTransit Going Commercial: What This Means For You"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - csharp
  - c#
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > MediatR and MassTransit Going Commercial: What This Means For You"
    - property: og:description
      content: "MediatR and MassTransit Going Commercial: What This Means For You"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/mediatr-and-masstransit-going-commercial-what-this-means-for-you.html
prev: /programming/cs/articles/README.md
date: 2025-04-05
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_136.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="MediatR and MassTransit Going Commercial: What This Means For You"
  desc="Popular .NET libraries MediatR, AutoMapper, and MassTransit are transitioning to commercial licenses after over a decade of free open-source availability. This article examines the reasons behind these changes, what they mean for your projects, and the practical options available to developers moving forward."
  url="https://milanjovanovic.tech/blog/mediatr-and-masstransit-going-commercial-what-this-means-for-you"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_136.png"/>

Big changes are happening in the .NET ecosystem. Three powerhouse libraries - MediatR, AutoMapper, and MassTransit - are moving to commercial licenses. Not so long ago, Fluent Assertions also announced its plans to move to a commercial license.

As someone who's built countless systems with these tools over the past decade, I have thoughts. And some strong opinions.

---

## The Libraries We Love (And Sometimes Hate)

If you're a .NET developer, you likely use at least one of these:

[AutoMapper (<VPIcon icon="iconfont icon-github"/>`AutoMapper/AutoMapper`)](https://github.com/AutoMapper/AutoMapper) (794.7M downloads) transforms objects from one type to another. It removes mountains of tedious mapping code that nobody enjoys writing. One line replaces twenty. **I personally despise AutoMapper and mapping libraries in general**, but I can't deny their popularity.

[MediatR (<VPIcon icon="iconfont icon-github"/>`jbogard/MediatR`)](https://github.com/jbogard/MediatR) (286.6M downloads) implements the [**mediator pattern**](/milanjovanovic.tech/cqrs-pattern-with-mediatr.md). It decouples requests from the objects handling them, promoting separation of concerns. There's also the pipeline behavior feature, which allows you to add cross-cutting concerns. I'm a huge fan and use it regularly in my projects.

[MassTransit (<VPIcon icon="iconfont icon-github"/>`MassTransit/MassTransit`)](https://github.com/MassTransit/MassTransit) (130.0M downloads) makes distributed messaging simple. It wraps message brokers like [**RabbitMQ and Azure Service Bus**](/milanjovanovic.tech/using-masstransit-with-rabbitmq-and-azure-service-bus.md) with an elegant API. Building event-driven systems becomes approachable. This is another tool I love and often recommend.

These libraries aren't just popular - they're transformative. They've shaped how we build .NET applications.

---

## The Maintainer's Reality

Both announcements tell a similar story.

![AutoMapper and MediatR Going Commercial.<br/>Source: [<VPIcon icon="fas fa-globe"/>AutoMapper and MediatR Going Commercial](https://jimmybogard.com/automapper-and-mediatr-going-commercial/)](https://milanjovanovic.tech/blogs/mnw_136/mediatr_automapepr_announcement.png?imwidth=3840)

::: info Jimmy Bogard (AutoMapper, MediatR) writes:

> You can see exactly where my contributions cratered and flat-lined. And that's just commits—issues, PRs, discussions, all my time dried up.

:::

His OSS work was previously sponsored by his former employer. When he went independent, that support vanished. His focus shifted to his consulting business.

![Announcing MassTransit v9.<br/>Source: [<VPIcon icon="fas fa-globe"/>Announcing MassTransit v9](https://masstransit.io/introduction/v9-announcement)](https://milanjovanovic.tech/blogs/mnw_136/masstransit_announcement.png?imwidth=3840)

Similarly, MassTransit has grown from "a single assembly that supported MSMQ" in 2007 to over thirty NuGet packages. Its success created demands that are impossible to meet through volunteer work alone:

- Full-time development resources
- Enterprise-grade support
- Long-term sustainability

Both maintainers face the same dilemma: how do you support widely used libraries when nobody pays you to do it?

---

## The Commercial Transition

Here's what's happening:

- **AutoMapper and MediatR**: Jimmy hasn't shared specific timing or pricing yet. He states, "Short term, nothing will change."
- **MassTransit**: Moving from v8 (open source) to v9 (commercial) with this timeline:
  - Q3 2025: v9 prerelease for early adopters
  - Q1 2026: v9 official release under commercial license
  - Through 2026: v8 security patches continue

MassTransit's pricing targets:

- Small/medium businesses: $400/month or $4000/year
- Large enterprises: $1200/month or $12000/year
- Support for ISVs and consultants who build client applications

None of this is set in stone. The pricing aspect should be final by the time the commercial version is released.

---

## Why I Respect This Decision

Both maintainers waited over a decade before making this move. They've contributed immense value to our community for free.

Their announcements show careful consideration. They're not abandoning users:

- Existing versions remain open source
- Security patches will continue
- Commercial licenses support sustainable development

I honestly hope none of the above changes in the future. The work they do is valuable.

Writing these libraries from scratch would cost your team far more than their license fees.

---

## Your Options Now (With My Take)

If your project uses these libraries, you have choices:

### 1. Purchase the commercial license

This supports continued development and gets you new features and official support.

### 2. Stay on the current open source version

MassTransit v8 and current MediatR/AutoMapper will remain available. Security patches will continue through 2026 for MassTransit. For MassTransit specifically, I'd consider staying on v8 for the long term if possible.

### 3. Switch to alternatives

For AutoMapper: consider [<VPIcon icon="iconfont icon-github"/>`MapsterMapper/Mapster`](https://github.com/MapsterMapper/Mapster) or **manual mapping** (my recommendation).

For MediatR: explore [<VPIcon icon="iconfont icon-github "/>`FastEndpoints/FastEndpoints`](https://github.com/FastEndpoints/FastEndpoints) or [**build a simple mediator yourself**](/milanjovanovic.tech/stop-conflating-cqrs-and-mediatr.md).

For MassTransit: look at raw client libraries like [<VPIcon icon="fas fa-globe"/>RabbitMQ.Client](https://nuget.org/packages/rabbitmq.client/) and [<VPIcon icon="fas fa-globe"/>Azure.Messaging.ServiceBus](https://nuget.org/packages/Azure.Messaging.ServiceBus), and another option to consider is [**Rebus**](/milanjovanovic.tech/implementing-the-saga-pattern-with-rebus-and-rabbitmq.md).

### 4. Write equivalent functionality yourself

MediatR isn't too complex to build on your own. I recommend giving it a try as an excellent coding exercise - it's probably the simplest way to move away from MediatR.

For AutoMapper, many teams have deep integrations with business logic in custom mappers. This makes extracting and replacing it difficult. Expect significant tech debt if you don't address this.

MassTransit, on the other hand, does so many things (and does them well) that migrating away would be challenging. [**Saga support**](/milanjovanovic.tech/implementing-the-saga-pattern-with-masstransit.md) or the [**request-response messaging**](/milanjovanovic.tech/request-response-messaging-pattern-with-masstransit.md) features are hard to replicate. The only real alternative is diving into raw client libraries for your chosen message transport.

Each option involves tradeoffs. The right choice depends on your project needs and budget.

---

## A Shift to Fundamentals

These changes have made me reflect on something important: we should never lose sight of fundamentals.

We've been pampered and spoiled by these awesome libraries. It's easy to lose sight of the actual problems they're solving and how they work under the hood. People know how to use MediatR, but they don't understand the mechanisms behind it.

The same goes for MassTransit. It abstracts away so many complexities of working with message brokers that it's possible to use it without knowing how RabbitMQ or Azure Service Bus actually works.

Remember this: using a library that abstracts something away doesn't excuse you from understanding the patterns and tools you're using. The **fundamentals are still there** and always have been. This might be the perfect opportunity to deepen your knowledge of what's happening beneath these abstractions.

---

## A Reality Check

Open source isn't free. Someone pays - either with time or money.

I'm honestly tired of seeing developers complain about these changes. Who are they to demand software for free? The entitlement is astounding. These maintainers have provided immense value for over a decade without asking for anything in return.

We've enjoyed years of exceptional tooling without directly funding it. Now we face a reckoning.

As businesses reap massive productivity gains from these libraries, it's reasonable to ask: shouldn't some of that value flow back to the creators?

I hope these projects thrive under their new models. They've earned support after years of thankless work.

Both my [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.d) and [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md) courses currently use MediatR and MassTransit extensively. I plan to keep them on MediatR v12 and MassTransit v8 in the short term. However, I'll also be updating them to show migration paths away from these libraries.

What's your take? Will you stick with the open versions, pay for licenses, or explore alternatives?

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "MediatR and MassTransit Going Commercial: What This Means For You",
  "desc": "Popular .NET libraries MediatR, AutoMapper, and MassTransit are transitioning to commercial licenses after over a decade of free open-source availability. This article examines the reasons behind these changes, what they mean for your projects, and the practical options available to developers moving forward.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/mediatr-and-masstransit-going-commercial-what-this-means-for-you.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
