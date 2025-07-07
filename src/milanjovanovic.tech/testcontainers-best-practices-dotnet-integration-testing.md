---
lang: en-US
title: "Testcontainers Best Practices for .NET Integration Testing"
description: "Article(s) > Testcontainers Best Practices for .NET Integration Testing"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Testcontainers Best Practices for .NET Integration Testing"
    - property: og:description
      content: "Testcontainers Best Practices for .NET Integration Testing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/testcontainers-best-practices-dotnet-integration-testing.html
prev: /programming/cs/articles/README.md
date: 2025-06-28
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_148.png
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

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Testcontainers Best Practices for .NET Integration Testing"
  desc="Integration tests shouldn't rely on external infrastructure—but they also shouldn't mock everything away. In this post, we look at how to use Testcontainers in .NET to spin up real Postgres and Redis instances in your tests, how to manage container lifecycle using IAsyncLifetime, and how to structure your xUnit fixtures for speed and reliability"
  url="https://milanjovanovic.tech/blog/testcontainers-best-practices-dotnet-integration-testing"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_148.png"/>

Integration tests with Testcontainers are powerful, but they can quickly become a maintenance nightmare if you don't follow the right patterns.

I've seen teams struggle with flaky tests, slow test suites, and configuration headaches that could have been avoided with better practices from the start.

Today, I'll show you the patterns that make [<FontIcon icon="fas fa-globe"/>Testcontainers](https://testcontainers.com/) tests reliable, fast, and easy to maintain.

---

## How Testcontainers Changes Integration Testing

Traditional [**integration tests**](/milanjovanovic.tech/testcontainers-integration-testing-using-docker-in-dotnet.md) often rely on shared test databases or in-memory alternatives that don't match production behavior. You either deal with test pollution between runs or sacrifice realism for speed.

Testcontainers solves this by spinning up real [<FontIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) containers for your dependencies. Your tests run against actual PostgreSQL, Redis, or any other service you use in production. When tests complete, containers are destroyed, giving you a clean slate every time.

The magic happens through Docker's API. Testcontainers manages the entire lifecycle: pulling images, starting containers, waiting for readiness, and cleanup. Your test code just needs to know how to connect.

---

## Prerequisites

First, make sure you have the necessary packages:

```powershell
Install-Package Microsoft.AspNetCore.Mvc.Testing
Install-Package Testcontainers.PostgreSql
Install-Package Testcontainers.Redis
```

If you want to learn more about the basic setup, check out my article on [**integrating testing with Testcontainers**](/milanjovanovic.tech/testcontainers-integration-testing-using-docker-in-dotnet.md).

---

## Creating Test Containers

Here's how to set up your containers with proper configuration:

```cs
PostgreSqlContainer _postgresContainer = new PostgreSqlBuilder()
    .WithImage("postgres:17")
    .WithDatabase("devhabit")
    .WithUsername("postgres")
    .WithPassword("postgres")
    .Build();

RedisContainer _redisContainer = new RedisBuilder()
    .WithImage("redis:latest")
    .Build();
```

To start and stop containers cleanly across your test suite, implement `IAsyncLifetime` in your `WebApplicationFactory`:

```cs
public sealed class IntegrationTestWebAppFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    public async Task InitializeAsync()
    {
        await _postgresContainer.StartAsync();
        await _redisContainer.StartAsync();
        // Start other dependencies here
    }

    public async Task DisposeAsync()
    {
        await _postgresContainer.StopAsync();
        await _redisContainer.StopAsync();
    }
}
```

This ensures containers are ready before tests run and cleaned up afterward. This means no leftover Docker state or race conditions.

::: tip

pin your image versions (like `postgres:17`) to avoid surprises from upstream changes

:::

I learned this the hard way when a minor version update caused my tests to fail unexpectedly.

---

## Pass Configuration to Your App

The biggest mistake I see is hardcoding connection strings. Testcontainers assigns dynamic ports. Don't hardcode anything.

Instead, inject values via `WebApplicationFactory.ConfigureWebHost`:

```cs
protected override void ConfigureWebHost(IWebHostBuilder builder)
{
    builder.UseSetting("ConnectionStrings:Database", _postgresContainer.GetConnectionString());
    builder.UseSetting("ConnectionStrings:Redis", _redisContainer.GetConnectionString());
}
```

The key is to use the `UseSetting` method to pass connection strings dynamically. It also avoids any race conditions or conflicts with other tests that might run in parallel.

This ensures your tests always connect to the right ports, regardless of what Docker assigns.

There's no need to remove services from the service collection or manually configure them (contrary to what you might find online). Just set the connection strings, and your application will use them automatically.

---

## Share Expensive Setup with xUnit Collection Fixtures

What's a test fixture? A **fixture** is a shared context for your tests, allowing you to set up expensive resources like databases or message brokers once and reuse them across multiple tests.

This is where most teams get tripped up. The choice between class and collection fixtures affects both test performance and isolation.

**Class Fixture** - One container per test class:

Use class fixtures when tests modify global state or when debugging test interactions becomes difficult.

```cs{1}
public class AddItemToCartTests : IClassFixture<DevHabitWebAppFactory>
{
    private readonly DevHabitWebAppFactory _factory;

    public AddItemToCartTests(DevHabitWebAppFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Should_ReturnFailure_WhenNotEnoughQuantity() { ... }
}
```

**Collection Fixture** - One container shared across multiple test classes:

Use collection fixtures when your tests don't modify shared state or when you can reliably clean up between tests.

```cs
[CollectionDefinition(nameof(IntegrationTestCollection))]
public sealed class IntegrationTestCollection : ICollectionFixture<DevHabitWebAppFactory>
{
}
```

Then apply it to your test classes:

```cs{1}
[Collection(nameof(IntegrationTestCollection))]
public class AddItemToCartTests : IntegrationTestFixture
{
    public AddItemToCartTests(DevHabitWebAppFactory factory) : base(factory) { }

    [Fact]
    public async Task Should_ReturnFailure_WhenNotEnoughQuantity()
    {
        Guid customerId = await Sender.CreateCustomerAsync(Guid.NewGuid());
        var command = new AddItemToCartCommand(customerId, ticketTypeId, Quantity + 1);

        Result result = await Sender.Send(command);

        result.Error.Should().Be(TicketTypeErrors.NotEnoughQuantity(Quantity));
    }
}
```

When to use which:

- Class fixtures when you need full isolation between test classes (slower but safer)
- Collection fixtures when test classes don't interfere with each other (faster but requires discipline)

With collection fixtures, you have to take care of cleaning up any state that might persist between tests. This could include resetting databases, clearing caches, or removing test data. If you don't do this, you risk tests affecting each other, leading to flaky results.

---

## Utility Methods for Auth and Cleanup

Your fixture can expose helpers to simplify test writing:

```cs
public async Task<HttpClient> CreateAuthenticatedClientAsync() { ... }

protected async Task CleanupDatabaseAsync() { ... }
```

These methods can handle authentication setup and database cleanup, so you don't have to repeat boilerplate code in every test. This lets your test code focus on assertions, not setup.

---

## Writing Maintainable Integration Tests

With the infrastructure properly configured, your actual tests should focus on business logic:

```cs
[Fact]
public async Task Should_ReturnFailure_WhenNotEnoughQuantity()
{
    //Arrange
    Guid customerId = await Sender.CreateCustomerAsync(Guid.NewGuid());
    var eventId = Guid.NewGuid();
    var ticketTypeId = Guid.NewGuid();

    await Sender.CreateEventWithTicketTypeAsync(eventId, ticketTypeId, Quantity);

    var command = new AddItemToCartCommand(customerId, ticketTypeId, Quantity + 1);

    //Act
    Result result = await Sender.Send(command);

    //Assert
    result.Error.Should().Be(TicketTypeErrors.NotEnoughQuantity(Quantity));
}
```

Notice how the tests focus on business rules rather than infrastructure concerns. The container complexity is hidden behind well-designed base classes and helper methods. You're not mocking Postgres or Redis, you're testing real behavior.

---

## Conclusion

Testcontainers transforms integration testing by giving you the confidence that comes from testing against real dependencies. No more wondering if your in-memory database behavior matches production, or dealing with shared test environments that break when someone else runs their tests.

Start simple: pick one integration test that currently uses mocks or in-memory databases, and convert it to use Testcontainers. You'll immediately notice the difference in confidence when that test passes. Then gradually expand to cover your critical business flows.

If you want to learn how to structure your applications for testability from day one, my [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) course covers integration testing with Testcontainers alongside domain modeling, API design, and the architectural decisions that make applications maintainable over time.

That's all for today.

See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Testcontainers Best Practices for .NET Integration Testing",
  "desc": "Integration tests shouldn't rely on external infrastructure—but they also shouldn't mock everything away. In this post, we look at how to use Testcontainers in .NET to spin up real Postgres and Redis instances in your tests, how to manage container lifecycle using IAsyncLifetime, and how to structure your xUnit fixtures for speed and reliability",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/testcontainers-best-practices-dotnet-integration-testing.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
