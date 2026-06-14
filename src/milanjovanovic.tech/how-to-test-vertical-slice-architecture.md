---
lang: en-US
title: "How to Test Vertical Slice Architecture"
description: "Article(s) > How to Test Vertical Slice Architecture"
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
      content: "Article(s) > How to Test Vertical Slice Architecture"
    - property: og:description
      content: "How to Test Vertical Slice Architecture"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloghow-to-test-vertical-slice-architecture.html
prev: /programming/cs/articles/README.md
date: 2026-07-11
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_202.png
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
  name="How to Test Vertical Slice Architecture"
  desc="The most common question I get about vertical slice architecture isn't about structure. It's ”where do my tests go?” The layered-architecture testing habits (mock the repository, test the service) don't map onto slices, and that's a feature. Here's the testing approach that fits VSA naturally."
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techbloghow-to-test-vertical-slice-architecture"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_202.png"/>

Whenever I write about [**vertical slice architecture**](/milanjovanovic.tech/vertical-slice-architecture.md), the same question shows up in my inbox: **"OK, but how do I test it?"**

It's a fair question, because the testing habits most of us learned grew up alongside layered architecture. Mock the repository, test the service, assert the service called the repository. In VSA there is no service layer to test and often no repository to mock. The slice is a request, a handler, and the database work, living together in one place.

People read that and conclude vertical slices are hard to test. It's the opposite. You just have to stop testing layers and start testing what the slice actually is: **a feature**.

---

## The Slice Is the Unit

A vertical slice has a natural contract: a request goes in at the top, and an observable outcome comes out the bottom (a response, plus rows in a database, plus maybe a message on a bus).

So test exactly that contract:

**One slice = one focused set of tests that exercise it from the endpoint to the database.**

Not a handler test with a mocked `DbContext`. Not an endpoint test with a mocked handler. The whole slice, through its public entrance, against a real database.

![A test boundary drawn around an entire vertical slice: the test sends an HTTP request through the endpoint and handler to a real Postgres container and asserts on the response and the database state, with only truly external services faked](https://milanjovanovic.tech/blogs/mnw_202/slice_test_boundary.png)
<!-- TODO: mermaid화 -->

If you're coming from layered architecture, this feels like "just integration tests". It is, and that's the point: [**the test pyramid is a lie**](/milanjovanovic.tech/the-test-pyramid-is-a-lie-and-what-i-do-instead.md) for this kind of code. A slice test catches broken SQL, broken mapping, broken validation, and broken routing in one go, none of which a mocked-out unit test can see.

---

## The Setup That Makes It Practical

Two pieces make slice tests fast enough to run constantly: `WebApplicationFactory` to host the app in-memory, and [**Testcontainers**](/milanjovanovic.tech/testcontainers-integration-testing-using-docker-in-dotnet.md) for real infrastructure in Docker. My examples use Postgres, but the same approach covers Redis, a message broker, or anything else the slice touches.

The shared fixture boots both once for the whole test class:

```cs
public class ApiFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly PostgreSqlContainer _db = new PostgreSqlBuilder()
        .WithImage("postgres:17-alpine")
        .Build();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseSetting("ConnectionStrings:Database", _db.GetConnectionString());

        // Fake only what you don't own (payment gateways, email providers)
        builder.ConfigureTestServices(services =>
            services.AddSingleton<IEmailSender, FakeEmailSender>());
    }

    public async Task InitializeAsync()
    {
        await _db.StartAsync();

        // Create the schema once the container is up. If your app already
        // migrates on startup, drop this and let the host do it.
        using var scope = Services.CreateScope();
        await scope.ServiceProvider
            .GetRequiredService<AppDbContext>()
            .Database.MigrateAsync();
    }

    public new Task DisposeAsync() => _db.DisposeAsync().AsTask();
}
```

And a slice test reads like a description of the feature:

```cs
public class CreateShipmentTests(ApiFixture api) : IClassFixture<ApiFixture>
{
    [Fact]
    public async Task Creates_shipment_and_persists_it()
    {
        var client = api.CreateClient();
        var orderId = Guid.NewGuid();

        var response = await client.PostAsJsonAsync("/shipments", new
        {
            OrderId = orderId,
            Address = "123 Main Street"
        });

        response.StatusCode.Should().Be(HttpStatusCode.Created);

        // A fresh scope, so we read what actually persisted.
        using var scope = api.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var shipment = await db.Shipments.SingleAsync(s => s.OrderId == orderId);
        shipment.Status.Should().Be(ShipmentStatus.Pending);
    }

    [Fact]
    public async Task Rejects_a_shipment_without_an_address()
    {
        var client = api.CreateClient();
        var orderId = Guid.NewGuid();

        var response = await client.PostAsJsonAsync("/shipments",
            new { OrderId = orderId, Address = "" });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

        // The 400 is only half the contract; make sure nothing slipped through.
        using var scope = api.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        (await db.Shipments.AnyAsync(s => s.OrderId == orderId)).Should().BeFalse();
    }
}
```

Two small choices in the assertion carry weight. It reads through a **fresh scope**, so you see what actually persisted, not what EF Core's change tracker still holds in memory. And it filters by the `OrderId` you sent instead of grabbing "the one row", which keeps the test truthful even when it isn't the only thing writing to the database.

Notice what the test doesn't know: whether the slice uses MediatR or plain endpoints, EF Core or Dapper, one file or three. That ignorance is the payoff. **You can refactor everything inside the slice without touching a single test.** Tests coupled to layers punish refactoring; tests coupled to behavior enable it.

A note on speed, because it's the usual objection: the container and the host start once per test class, not per test. On my machine a suite like this runs in seconds, and my [**Testcontainers best practices**](/milanjovanovic.tech/testcontainers-best-practices-dotnet-integration-testing.md) cover the reuse tricks that keep it that way as the suite grows.

That database is shared, though, and it's worth saying out loud: every test in the class writes to the same Postgres, and the state carries over. Filtering by `OrderId` (like above) keeps individual assertions honest, but anything that counts rows or checks ordering wants a clean slate. A small helper on the fixture wipes the tables between runs, no extra libraries required:

```cs
public async Task ResetAsync()
{
    using var scope = Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Add each table the slice touches.
    await db.Shipments.ExecuteDeleteAsync();
}
```

Then call it at the top of each test. xUnit runs the tests in a class sequentially, so a reset at the start hands each one a clean slate:

```cs
[Fact]
public async Task Creates_shipment_and_persists_it()
{
    await api.ResetAsync();

    // ... arrange, act, assert
}
```

Now each test starts from a known state.

---

## Where Unit Tests Still Earn Their Keep

Most slices are thin: validate, load, mutate, save. Slice tests cover those completely, and unit testing a thin handler through mocks just restates the implementation.

But some slices contain real logic: pricing rules, state machines, date math around business calendars. When that happens, don't test the logic through HTTP. Extract it into the domain (a method on the entity, a domain service, a plain class) and unit test it there, exhaustively, with no infrastructure in sight.

The split is clean:

- **Slice tests** prove the feature works end to end: routing, validation, persistence, the happy path, and the important sad paths.
- **Unit tests** hammer the interesting domain logic with every edge case, at nanosecond speed.

If a slice has no interesting logic, it gets no unit tests.

---

## Keep the Slices From Growing Into Each Other

One more failure mode: tests pass, features work, and six months later every slice quietly references three others. Slice independence is the property that makes VSA worth having, so put it under test too, with [**architecture tests**](/milanjovanovic.tech/enforcing-software-architecture-with-architecture-tests.md):

```cs
[Fact]
public void Slices_should_not_reference_other_slices()
{
    var result = Types.InAssembly(typeof(Program).Assembly)
        .That().ResideInNamespace("Features.Shipments")
        .ShouldNot().HaveDependencyOn("Features.Invoicing")
        .GetResult();

    result.IsSuccessful.Should().BeTrue();
}
```

Cheap to write, and it turns "please don't couple slices" from a code-review plea into a failing build.

---

## Summary

Testing vertical slice architecture stops being confusing the moment you pick the right unit:

1. **Test the slice as a feature**: real HTTP in, real database out, via `WebApplicationFactory` + Testcontainers.
2. **Fake only what you don't own.** Your database is yours; a real one goes in the test.
3. **Unit test extracted domain logic**, not thin handlers.
4. **Architecture tests** keep slices independent while the codebase grows.

The result is a suite that describes features instead of layers, survives refactoring, and catches the bugs that actually reach production.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Test Vertical Slice Architecture",
  "desc": "The most common question I get about vertical slice architecture isn't about structure. It's ”where do my tests go?” The layered-architecture testing habits (mock the repository, test the service) don't map onto slices, and that's a feature. Here's the testing approach that fits VSA naturally.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloghow-to-test-vertical-slice-architecture.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
