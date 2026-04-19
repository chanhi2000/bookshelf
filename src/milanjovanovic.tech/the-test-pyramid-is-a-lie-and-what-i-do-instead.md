---
lang: en-US
title: "The Test Pyramid Is a Lie (and What I Do Instead)"
description: "Article(s) > The Test Pyramid Is a Lie (and What I Do Instead)"
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
      content: "Article(s) > The Test Pyramid Is a Lie (and What I Do Instead)"
    - property: og:description
      content: "The Test Pyramid Is a Lie (and What I Do Instead)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-test-pyramid-is-a-lie-and-what-i-do-instead.html
prev: /programming/cs/articles/README.md
date: 2026-04-25
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_191.png
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
  name="The Test Pyramid Is a Lie (and What I Do Instead)"
  desc="The test pyramid made sense when integration tests meant a shared database server and a 20-minute build. It doesn't match how I build .NET systems in 2026. Most of my real bugs live at the seams, and unit tests don't catch any of them. Here's the testing shape I actually ship with."
  url="https://milanjovanovic.tech/blog/the-test-pyramid-is-a-lie-and-what-i-do-instead"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_191.png"/>

I'll be honest. For years, my projects didn't look like the **test pyramid**.

A wide base of unit tests, a narrow middle of integration tests, a tiny sliver of end-to-end tests at the top. I'd nod along in conference talks, then go back to my own code and do something different.

A thin layer of unit tests for the things worth unit-testing. A thick slab of integration tests against real PostgreSQL, real RabbitMQ, real HTTP. A handful of end-to-end tests for the flows that would get me fired if they broke.

And I shipped with more confidence that way, not less. Here's why, and here's the shape I actually use.

---

## Where the Pyramid Comes From

The pyramid was popularized by Mike Cohn in 2009, when integration tests meant a shared database server, flaky CI, and 20-minute builds. Unit tests with mocks were the pragmatic compromise.

![The classic test pyramid, with a wide base of unit tests, a narrow middle of integration tests, and a tiny sliver of end-to-end tests at the top.](https://milanjovanovic.tech/blogs/mnw_191/test_pyramid.png?imwidth=3840)

That world is gone. With [**Testcontainers**](/milanjovanovic.tech/testcontainers-integration-testing-using-docker-in-dotnet.md), I can spin up PostgreSQL, Redis, and RabbitMQ in a fresh container per test class in a few seconds. The [<VPIcon icon="fa-brands fa-microsoft"/>Aspire test host](https://learn.microsoft.com/en-us/dotnet/aspire/testing/overview) takes this further by wiring up your entire application graph. The argument that real dependencies are too expensive mostly doesn't apply anymore.

But the advice didn't update.

---

## The Bug That Convinced Me

A few years ago I had a service with **94% unit test coverage**. All green.

A user reported that deleting an account didn't actually delete their data. The bug was three lines long:

```cs
public async Task Handle(DeleteAccountCommand command, CancellationToken ct)
{
    var account = await _repository.GetByIdAsync(command.AccountId, ct);
    account.MarkAsDeleted();
    // Missing: await _unitOfWork.SaveChangesAsync(ct);
}
```

The honest diagnosis is that the test for this case was never written. You can absolutely verify `SaveChangesAsync` was called with a mock. But in a codebase where that test is *one of hundreds* of handler tests, each with its own mock setup and its own verification list, it's the kind of assertion people forget. I forgot.

A single integration test against a real database would have caught it without anyone having to remember. That's the point: the fewer invariants your test style forces you to remember, the fewer bugs slip through.

That was the last week I took the test pyramid seriously.

---

## What Unit Tests Are Actually Good At

I still write unit tests. Just not many.

They earn their keep when the logic is non-trivial, pure (no I/O, no time, no randomness), and hard to exercise end-to-end. That's a specific set of code: [**value objects**](/milanjovanovic.tech/value-objects-in-dotnet-ddd-fundamentals.md) and [**rich domain models**](/milanjovanovic.tech/refactoring-from-an-anemic-domain-model-to-a-rich-domain-model.md), pricing and tax calculations, parsers, mappers, serializers.

Notice what's **not** on that list: application services, handlers, controllers, repositories, infrastructure. Those live at the seams, and the seams are where real bugs live.

---

## What I Actually Write Instead

Here's the shape I've settled on for a typical .NET service or [**modular monolith**](/milanjovanovic.tech/what-is-a-modular-monolith.md).

### Layer 1: A thin base of unit tests

Maybe 15-25% of the test count. All domain logic. No mocks of collaborators. If a unit test needs a mock, I usually pull the test up to the integration layer instead.

```cs
[Fact]
public void Confirm_WhenPending_TransitionsToConfirmed()
{
    var order = Order.Create(CustomerId.New(), Money.Usd(100));

    order.Confirm();

    order.Status.Should().Be(OrderStatus.Confirmed);
    order.DomainEvents.Should().ContainSingle(e => e is OrderConfirmedEvent);
}
```

No container or mocks. Microseconds per test. This is what unit tests are for.

### Layer 2: A thick middle of integration tests

The majority. Maybe 60-70% of the suite. Every [**command and query handler**](/milanjovanovic.tech/cqrs-pattern-with-mediatr.md), every HTTP endpoint, every message consumer gets a test that runs against **real infrastructure** inside Testcontainers. In a [**modular monolith**](/milanjovanovic.tech/testing-modular-monoliths-system-integration-testing.md), this is where you verify that modules talk to each other correctly across their public APIs.

```cs
public class DeleteAccountTests(IntegrationTestWebAppFactory factory)
    : BaseIntegrationTest(factory)
{
    [Fact]
    public async Task DeleteAccount_WhenAccountExists_MarksAccountAsDeleted()
    {
        var account = await CreateAccountAsync();

        var response = await HttpClient.DeleteAsync($"/accounts/{account.Id}");

        response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var stored = await DbContext.Accounts
            .IgnoreQueryFilters()
            .SingleAsync(a => a.Id == account.Id);

        stored.IsDeleted.Should().BeTrue();
    }
}
```

That test exercises the HTTP layer, routing, model binding, authorization, the handler, the unit of work, EF Core, and PostgreSQL. It proves the thing you actually care about: **when I call this endpoint, the row changes.** And it does it without anyone having to remember to assert `SaveChangesAsync` was called.

### Layer 3: A small cap of end-to-end tests

Under 10%. Only the flows where a silent failure would be a commercial or compliance problem. Signup, payment, refund, password reset, [**two-factor enrollment**](/milanjovanovic.tech/how-to-implement-two-factor-authentication-in-aspnetcore.md). They're slow and occasionally flaky, but they catch the one failure mode everything else misses: *the system as a whole still works*.

### Layer 0: Architecture and contract tests

Often forgotten, but they're part of the suite. [**Architecture tests**](/milanjovanovic.tech/5-architecture-tests-you-should-add-to-your-dotnet-projects.md) enforce layering and module boundaries. Contract tests verify that message schemas and API shapes don't drift. They run in milliseconds and catch the "six months from now, someone will break this without realizing" kind of bug.

The shape that comes out of this is closer to Kent C. Dodds' **testing trophy** than a pyramid. The fat middle is deliberate. That's where my confidence comes from.

---

## The Usual Objections

**"Integration tests are slow."** My typical integration suite runs in 2-4 minutes in CI with Testcontainers reuse and test-class parallelization. Slower than unit tests, yes. Faster than finding the bug in production.

**"Mocks are fine if you're disciplined."** Maybe. But every large codebase I've audited that leaned heavily on mocks had the same pathology: tests that pass after a refactor even though the refactor broke production. That's not discipline failing. That's the tool being pointed in the wrong direction.

---

## Summary

The test pyramid was good advice for 2009 infrastructure and poor advice for 2026 infrastructure. Testcontainers and Aspire changed the economics, and the fastest feedback loop that still tells you the truth is now an integration test against real dependencies. Unit tests still belong on pure domain logic. Everything at the seams belongs in the integration layer.

If you want to see how I wire this into a real system, with the [**integration test harness**](/milanjovanovic.tech/testing-modular-monoliths-system-integration-testing.md), module boundaries, and the full [**Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) setup, check out [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md). It's the same approach I use on my own projects.

Thanks for reading.

And stay awesome!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Test Pyramid Is a Lie (and What I Do Instead)",
  "desc": "The test pyramid made sense when integration tests meant a shared database server and a 20-minute build. It doesn't match how I build .NET systems in 2026. Most of my real bugs live at the seams, and unit tests don't catch any of them. Here's the testing shape I actually ship with.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-test-pyramid-is-a-lie-and-what-i-do-instead.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
