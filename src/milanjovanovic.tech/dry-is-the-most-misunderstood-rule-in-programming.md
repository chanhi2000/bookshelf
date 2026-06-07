---
lang: en-US
title: "DRY Is the Most Misunderstood Rule in Programming"
description: "Article(s) > DRY Is the Most Misunderstood Rule in Programming"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > DRY Is the Most Misunderstood Rule in Programming"
    - property: og:description
      content: "DRY Is the Most Misunderstood Rule in Programming"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/dry-is-the-most-misunderstood-rule-in-programming.html
prev: /programming/cs/articles/README.md
date: 2026-06-06
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_197.png
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
  name="DRY Is the Most Misunderstood Rule in Programming"
  desc="DRY was never about code that looks the same. It's about knowledge. Most of the tangled abstractions I've had to unwind started as a well-meaning attempt to remove duplication that was never really duplication. Here's how I think about it now, and the rule I use instead."
  url="https://milanjovanovic.tech/blog/dry-is-the-most-misunderstood-rule-in-programming"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_197.png"/>

Every developer learns DRY early, and almost everyone learns it wrong.

Don't Repeat Yourself. See two pieces of code that look the same, extract a method, delete the duplicate. I did this for years and wrote some of the worst code I've ever had to maintain:

- A shared helper that grew a new boolean parameter every sprint.
- A base class nobody dared touch because six unrelated features inherited from it.
- A "common" module two independent parts of the system both depended on, so neither could change without the other.

Every one started as an innocent attempt to not repeat myself.

---

## What DRY Actually Says

Here's the part most people skip. The original definition, from Andy Hunt and Dave Thomas in [<VPIcon icon="fa-brands fa-wikipedia-w"/>The Pragmatic Programmer](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer), says nothing about code:

> Every piece of **knowledge** must have a single, unambiguous, authoritative representation within a system.

It's about knowledge. A single *fact* about your domain, like a tax rule or the format of an invoice number, should live in exactly one place. When that fact changes, you change it once instead of hunting for seven copies.

---

## The Mistake: Deduplicating Code, Not Knowledge

Two pieces of code can look identical and represent completely different knowledge.

Say you validate two addresses. One is a customer's shipping address, the other is a warehouse address. Today the rules are identical:

```cs
public bool IsValid(Address address) =>
    !string.IsNullOrWhiteSpace(address.Street) &&
    !string.IsNullOrWhiteSpace(address.City) &&
    !string.IsNullOrWhiteSpace(address.PostalCode);
```

The DRY reflex says extract one validator and call it from both places. But these are different concepts that happen to share rules this week. The day the warehouse needs a loading-dock code, you're back in the shared method bolting on a flag to keep the other caller working:

```cs
public bool IsValid(Address address, bool requireDockCode = false) =>
    !string.IsNullOrWhiteSpace(address.Street) &&
    !string.IsNullOrWhiteSpace(address.City) &&
    !string.IsNullOrWhiteSpace(address.PostalCode) &&
    (!requireDockCode || !string.IsNullOrWhiteSpace(address.DockCode));
```

That boolean is the tell. The first time a shared method grows a flag so one caller behaves differently, you didn't have duplication. You had two things that looked alike and glued them together. Give it a year and the signature has three more flags, each one a place where the two concepts were never actually the same.

---

## The Wrong Abstraction Costs More Than Duplication

::: note

Duplication is far cheaper than the wrong abstraction

:::

Copy-paste is visible and local. You can see both copies, and if they drift apart, that was always allowed. The wrong abstraction is invisible and global. Every caller depends on one shape and bends it to fit, the flags pile up, and you end up afraid to touch a method you no longer understand. I've spent more time deleting bad abstractions than I ever saved writing them.

This is the [**hidden coupling cost I wrote about in the abstractions piece**](/milanjovanovic.tech/the-real-cost-of-abstractions-in-dotnet.md), and DRY-by-reflex is one of the most common ways it sneaks in.

---

## Where It Hurts Most: Across Boundaries

Inside one class, a bad helper is annoying. Across module boundaries, it's structural damage.

Picture a [**modular monolith**](/milanjovanovic.tech/what-is-a-modular-monolith.md) with a `Billing` module and a `Shipping` module. Both have an `Order`. A well-meaning engineer notices the two classes share fields and pulls them into a shared type both modules reference:

```cs
// Shared.Orders, referenced by both Billing and Shipping
public class Order
{
    public Guid Id { get; set; }
    public string CustomerName { get; set; }
    public decimal Total { get; set; }
    // ...whatever either module happens to need
}
```

Now Billing and Shipping can't evolve independently. A change to billing's order forces a recompile, re-test, and redeploy of shipping. You took two bounded contexts that were supposed to be decoupled and welded them together to save a few properties.

Two modules each owning their own `Order` is the whole point of [**keeping data inside its boundaries**](/milanjovanovic.tech/how-to-keep-your-data-boundaries-intact-in-a-modular-monolith.md). The shapes are allowed to be similar, modeling the same real-world thing from two points of view that drift over time. It's the same reason [**vertical slices**](/milanjovanovic.tech/vertical-slice-architecture-is-easier-than-you-think.md) tolerate a little repetition, so each slice can change on its own.

---

## The Rule I Use: Wait for the Third Time

I don't deduplicate the second time I see something. I wait for the third, and I ask one question: if this rule changes, do both copies have to change together?

- **Yes** - it's real duplication, the same fact written in several places. Extract it, and that's DRY doing its job.
- **No** - the resemblance is a coincidence. Leave it alone, and coupling them will cost you later.

Let the code repeat until the right abstraction becomes obvious, because good abstractions are discovered from concrete cases, not guessed up front. Some people call this AHA, for "Avoid Hasty Abstractions."

A practical tell: extract when you can name the concept. A real domain name like `Money`, `TaxRate`, or `InvoiceNumber` is probably knowledge worth a [**value object**](/milanjovanovic.tech/value-objects-in-dotnet-ddd-fundamentals.md). If the best name you can find is `Helper`, `Utils`, or `ProcessData`, you're abstracting shape, not knowledge.

---

## When DRY Is Right

Applied correctly, DRY is invaluable. A business rule belongs in exactly one place. Watch what happens when "an order over $1,000 needs manager approval" gets copy-pasted across three services:

```cs
// OrderService
if (order.Total > 1000) { /* require approval */ }

// CheckoutService
if (order.Total > 1000m) { /* require approval */ }

// AdminController - someone bumped the limit here, and only here
if (order.Total > 5000) { /* require approval */ }
```

You will eventually update two of them and ship a bug. That drifted third copy is exactly how it happens. Push the rule into the [**domain model**](/milanjovanovic.tech/refactoring-from-an-anemic-domain-model-to-a-rich-domain-model.md) where it has one home:

```cs
public bool RequiresManagerApproval() => Total > 1000;
```

That's the single authoritative representation DRY is actually about.

---

## Summary

- DRY is about **knowledge**, not code that looks alike.
- The wrong abstraction costs more than the duplication it replaced, and it's harder to undo.
- Wait for the third occurrence. Extract only when both copies encode the same fact and must change together.

The next time you're about to delete a duplicate, don't ask whether the code looks the same. Ask whether it *means* the same. That one question will save you more maintenance pain than DRY ever saved you typing.

If you want to see how I draw these boundaries in a real system, with independent modules and abstractions that earn their place, that's the heart of [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "DRY Is the Most Misunderstood Rule in Programming",
  "desc": "DRY was never about code that looks the same. It's about knowledge. Most of the tangled abstractions I've had to unwind started as a well-meaning attempt to remove duplication that was never really duplication. Here's how I think about it now, and the rule I use instead.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/dry-is-the-most-misunderstood-rule-in-programming.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
