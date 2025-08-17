---
lang: en-US
title: "The Real Cost of Abstractions in .NET"
description: "Article(s) > The Real Cost of Abstractions in .NET"
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
      content: "Article(s) > The Real Cost of Abstractions in .NET"
    - property: og:description
      content: "The Real Cost of Abstractions in .NET"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-real-cost-of-abstractions-in-dotnet.html
prev: /programming/cs/articles/README.md
date: 2025-08-23
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_156.png
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
  name="The Real Cost of Abstractions in .NET"
  desc="Not all abstractions are created equal. Some isolate real volatility and protect your system from change. Others quietly pile up complexity and hide performance problems. Learn when to embrace abstractions versus when they become technical debt that slows down your team."
  url="https://milanjovanovic.tech/blog/the-real-cost-of-abstractions-in-dotnet"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_156.png"/>

As developers, we love abstractions. Repositories, services, mappers, wrappers. They make our code look "clean," they promise testability, and they give us the sense that we're building something flexible.

**Every abstraction is a loan. You pay interest the moment you write it.**

Some abstractions earn their keep by isolating real volatility and protecting your system from change. Others quietly pile up complexity, slow down onboarding, and hide performance problems behind layers of indirection.

Let's explore when abstractions pay dividends and when they become technical debt.

---

## When Abstractions Pay Off

The best abstractions **isolate true volatility**, the parts of your system that you genuinely expect to change.

### Example: Payment Processing

Your core business logic shouldn't depend directly on Stripe's SDK. If you ever switch to Adyen or Braintree, you don't want that decision rippling through every corner of your codebase. Here, an abstraction makes perfect sense:

```cs
public interface IPaymentProcessor
{
    Task ProcessAsync(Order order, CancellationToken ct);
}

public class StripePaymentProcessor : IPaymentProcessor
{
    public async Task ProcessAsync(Order order, CancellationToken ct)
    {
        // Stripe-specific implementation
        // Handle webhooks, error codes, etc.
    }
}

public class AdyenPaymentProcessor : IPaymentProcessor
{
    public async Task ProcessAsync(Order order, CancellationToken ct)
    {
        // Adyen-specific implementation
        // Different API, same business outcome
    }
}
```

Now your business logic can stay focused on the domain:

```cs
public class CheckoutService(IPaymentProcessor processor)
{
    public Task CheckoutAsync(Order order, CancellationToken cancellationToken) =>
        processor.ProcessAsync(order, cancellationToken);
}
```

This abstraction isolates a genuinely unstable dependency (the payment provider) while keeping checkout logic independent. When Stripe changes their API or you switch providers, only one class needs to change.

**That's a good abstraction**. It buys you optionality where you actually need it.

---

## When Abstractions Become Technical Debt

Problems arise when we abstract things that aren't actually volatile. We end up wrapping stable libraries or creating layers that don't add real value. The "clean" layer you added today becomes tomorrow's maintenance burden.

### The Repository That Lost Its Way

Most teams start with something reasonable:

```cs
public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
}
```

But as requirements evolve, so does the interface:

```cs
public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByEmailAsync(string email);
    Task<IEnumerable<User>> GetActiveUsersAsync();
    Task<IEnumerable<User>> GetUsersByRoleAsync(string role);
    Task<IEnumerable<User>> SearchAsync(string keyword, int page, int pageSize);
    Task<IEnumerable<User>> GetUsersWithRecentActivityAsync(DateTime since);
    // ...and it keeps growing
}
```

Suddenly, the repository is leaking **query logic into its interface**. Every new way of fetching users means another method, and your "abstraction" becomes a grab bag of every possible query.

Meanwhile, Entity Framework already gives you all of this through LINQ: strongly typed queries that map directly to SQL. Instead of leveraging that power, you've introduced an indirection layer that hides query performance characteristics and often performs worse. The repository pattern made sense when ORMs were immature. Today, it's often just ceremony.

I've been guilty of this myself. But part of maturing as a developer is recognizing when patterns become anti-patterns. Repositories make sense when they encapsulate complex query logic or provide a unified API over multiple data sources. But you should strive to keep them focused on domain logic. As soon as they explode into a myriad of methods for every possible query, it's a sign that the abstraction has failed.

---

## Service Wrappers: The Good and The Ugly

Not all service wrappers are problematic. Context matters.

::: tip ✅ Good Example: External API Integration

When integrating with external APIs, a wrapper provides genuine value by centralizing concerns:

```cs
public interface IGitHubClient
{
    Task<UserDto?> GetUserAsync(string username);
    Task<IReadOnlyList<RepoDto>> GetRepositoriesAsync(string username);
}

public class GitHubClient(HttpClient httpClient) : IGitHubClient
{
    public Task<UserDto?> GetUserAsync(string username) =>
        httpClient.GetFromJsonAsync<UserDto>($"/users/{username}");

    public Task<IReadOnlyList<RepoDto>> GetRepositoriesAsync(string username) =>
        httpClient.GetFromJsonAsync<IReadOnlyList<RepoDto>>($"/users/{username}/repos");
}
```

This wrapper isolates GitHub's API details. When authentication changes or endpoints evolve, you update one place. Your business logic never needs to know about HTTP headers, base URLs, or JSON serialization.

:::

::: warning ❌ Bad Example: Pass-Through Services

The trouble starts when we wrap our own stable services without adding business value:

```cs
public class UserService(IUserRepository userRepository)
{
    // Just forwarding calls with no added value
    public Task<User?> GetByIdAsync(Guid id) => userRepository.GetByIdAsync(id);
    public Task<IEnumerable<User>> GetAllAsync() => userRepository.GetAllAsync();
    public Task SaveAsync(User user) => userRepository.SaveAsync(user);
}
```

This `UserService` is pure indirection. All it does is forward calls to the `IUserRepository`. It doesn't enforce business rules, add validation, implement caching, or provide any real functionality. It's a layer that exists only because "services are good architecture."

As these anemic wrappers multiply, your codebase becomes a maze. Developers waste time navigating layers instead of focusing on where business logic actually lives.\

:::

---

## Making Better Decisions

Here's how to think about when abstractions are worth the investment:

### Abstract Policies, Not Mechanics

- **Policies** are decisions that might change: which payment provider to use, how to handle caching, retry strategies for external calls
- **Mechanics** are stable implementation details: EF Core's LINQ syntax, `HttpClient` configuration, JSON serialization

Abstract policies because they give you flexibility. Don't abstract mechanics, they're already stable APIs that rarely change in breaking ways.

### Wait for the Second Implementation

If you only have one implementation, resist the interface urge. A single implementation doesn't justify abstraction, it's premature generalization that adds complexity without benefit.

Consider this evolution:

```cs
// Step 1: Start concrete
public class EmailNotifier
{
    public async Task SendAsync(string to, string subject, string body)
    {
        // SMTP implementation
    }
}

// Step 2: Need SMS? Now abstract
public interface INotifier
{
    Task SendAsync(string to, string subject, string body);
}

public class EmailNotifier : INotifier { /* ... */ }
public class SmsNotifier : INotifier { /* ... */ }
```

The abstraction emerges naturally when you actually need it. The interface reveals itself through real requirements, not imaginary ones.

### Keep Implementations Inside, Abstractions at Boundaries

Inside your application, prefer **concrete types**. Use Entity Framework directly, configure `HttpClient` as typed clients, work with domain entities. Only introduce abstractions where your system meets the outside world: external APIs, third-party SDKs, infrastructure services.

That's where change is most likely, and where abstractions earn their keep.

---

## Refactoring Out Bad Abstractions

Regularly review your abstractions with this question: If I removed this abstraction, would the code become simpler or more complex?

If removing an interface or service layer would make the code clearer and more direct, that abstraction is probably costing more than it's worth. Don't be afraid to delete unnecessary layers. Simpler code is often better code.

When you identify problematic abstractions, here's how to safely remove them:

1. **Identify the real consumers**. Who actually needs the abstraction?
2. **Inline the interface**. Replace abstract calls with concrete implementations.
3. **Delete the wrapper**. Remove the unnecessary indirection.
4. **Simplify the calling code**. Take advantage of the concrete API's features.

For example, replacing a repository with direct EF Core usage:

```cs
// Before: Hidden behind repository
var users = await _userRepo.GetActiveUsersWithRecentOrders();

// After: Direct, optimized query
var users = await _context.Users
    .Where(u => u.IsActive)
    .Where(u => u.Orders.Any(o => o.CreatedAt > DateTime.Now.AddDays(-30)))
    .Include(u => u.Orders.Take(5))
    .ToListAsync();
```

The concrete version is more explicit about what data it fetches and how, making performance characteristics visible and optimization possible. If you need the same query in multiple places, you could move it into an extension method to make it shareable.

---

## The Bottom Line

Abstractions are powerful tools for managing complexity and change, but they're not free. Each one adds indirection, cognitive overhead, and maintenance burden.

The [**cleanest architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) isn't the one with the most layers. It's the one where each layer has a clear, justified purpose.

Before adding your next abstraction, ask yourself:

- Am I abstracting a policy or just a mechanic?
- Do I have two implementations, or am I speculating about future needs?
- Will this make my system more adaptable, or just harder to follow?
- If I removed this layer, would the code become simpler?

::: note Remember

abstractions are loans that accrue interest over time. Make sure you're borrowing for the right reasons, not just out of habit.

:::

The goal is to use abstractions intentionally, where they solve real problems and protect against genuine volatility. Build abstractions that earn their keep. Delete the ones that don't.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Real Cost of Abstractions in .NET",
  "desc": "Not all abstractions are created equal. Some isolate real volatility and protect your system from change. Others quietly pile up complexity and hide performance problems. Learn when to embrace abstractions versus when they become technical debt that slows down your team.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-real-cost-of-abstractions-in-dotnet.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
