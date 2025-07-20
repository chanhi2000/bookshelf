---
lang: en-US
title: "Named Query Filters in EF 10 (multiple query filters per entity)"
description: "Article(s) > Named Query Filters in EF 10 (multiple query filters per entity)"
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
      content: "Article(s) > Named Query Filters in EF 10 (multiple query filters per entity)"
    - property: og:description
      content: "Named Query Filters in EF 10 (multiple query filters per entity)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/named-query-filters-in-ef-10-multiple-query-filters-per-entity.html
prev: /programming/cs/articles/README.md
date: 2025-07-26
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_152.png
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
  name="Named Query Filters in EF 10 (multiple query filters per entity)"
  desc="EF 10 introduces named query filters, allowing multiple filters on a single entity and letting you selectively disable specific filters without turning off all query filters. This article explains how the feature works, shows practical examples for combining soft deletion and multi-tenancy, highlights best practices like using constants for filter names, and explores where such fine-grained control is particularly useful."
  url="https://milanjovanovic.tech/blog/named-query-filters-in-ef-10-multiple-query-filters-per-entity"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_152.png"/>

Entity Framework Core's global query filters have long been a convenient way to apply common conditions to all queries on an entity. They're especially handy in scenarios like [**soft deletion**](/milanjovanovic.tech/implementing-soft-delete-with-ef-core.md) and [**multi-tenancy**](/milanjovanovic.tech/multi-tenant-applications-with-ef-core.md), where you want the same `WHERE` clause added automatically to every query.

Previous versions of EF Core, however, suffered from **one big limitation**: each entity type could only have one filter defined. If you needed to combine multiple conditions (for example, soft-delete and tenant isolation) you either had to write explicit `&&` expressions or manually disable and reapply filters in specific queries.

With EF 10, that changes. The new **named query filters** feature lets you attach multiple filters to a single entity and reference them by name. You can then disable individual filters as needed, rather than turning off all filters at once.

Let's explore this new capability, why it matters, and some practical ways to use it.

---

## What Are Query Filters?

If you've used EF Core for a while, you may already be familiar with [<FontIcon icon="fa-brands fa-microsoft"/>global query filters](https://learn.microsoft.com/en-us/ef/core/querying/filters). A query filter is a condition that EF automatically applies to all queries for a particular entity type. Under the hood, EF adds a `WHERE` clause whenever that entity is queried. Typical uses include:

- **Soft deletion**: filtering out rows where IsDeleted is true so that deleted records don't show up in queries by default
- **Multi-tenancy**: filtering by a TenantId so that each tenant only sees its own data

For example, a soft-delete filter might be configured like this:

```cs
modelBuilder.Entity<Order>()
    .HasQueryFilter(order => !order.IsDeleted);
```

With the filter in place, every query on `Orders` automatically excludes soft-deleted records. To include deleted data (say, for an admin report), you can call `IgnoreQueryFilters()` on the query. The downside is that all filters on that entity are disabled, which opens the door to accidentally leaking data you don't intend to show.

---

## Using Multiple Query Filters

Until now, EF permitted only one query filter per entity. If you called `HasQueryFilter` twice on the same entity, the second call overwrote the first. To combine filters you had to write a single expression with `&&`:

```cs
modelBuilder.Entity<Order>()
    .HasQueryFilter(order => !order.IsDeleted && order.TenantId == tenantId);
```

This works but makes it impossible to selectively disable one condition. `IgnoreQueryFilters()` disables both, forcing you to manually re-apply whichever filter you still need. EF 10 introduces a better alternative: **named query filters**.

To attach multiple filters to an entity, call `HasQueryFilter` with a name for each filter:

```cs
modelBuilder.Entity<Order>()
    .HasQueryFilter("SoftDeletionFilter", order => !order.IsDeleted)
    .HasQueryFilter("TenantFilter", order => order.TenantId == tenantId);
```

Under the hood, EF creates separate filters identified by the names you provide. You can now turn off just the soft-delete filter while keeping the tenant filter in place:

```cs
// Returns all orders (including soft‑deleted) for the current tenant
var allOrders = await context.Orders.IgnoreQueryFilters(["SoftDeletionFilter"]).ToListAsync();
```

If you omit the parameter array, `IgnoreQueryFilters()` disables all filters for the entity.

---

## Tip: Using Constants for Filter Names

Named filters use string keys. Hard-coding those names throughout your codebase makes it easy to introduce typos and brittle magic strings. To avoid this, define constants or enums for your filter names and reuse them wherever needed. For example:

```cs
public static class OrderFilters
{
    public const string SoftDelete = nameof(SoftDelete);
    public const string Tenant = nameof(Tenant);
}

modelBuilder.Entity<Order>()
    .HasQueryFilter(OrderFilters.SoftDelete, order => !order.IsDeleted)
    .HasQueryFilter(OrderFilters.Tenant, order => order.TenantId == tenantId);

// Later in your query
var allOrders = await context.Orders.IgnoreQueryFilters([OrderFilters.SoftDelete]).ToListAsync();
```

Having the filter names defined in a single place reduces duplication and improves maintainability. Another best practice is to wrap the ignore call in an extension method or repository so that consumers don't directly interact with filter names at all. For example:

```cs
public static IQueryable<Order> IncludeSoftDeleted(this IQueryable<Order> query)
    => query.IgnoreQueryFilters([OrderFilters.SoftDelete]);
```

This makes your intent explicit and centralizes the filter logic in one place.

---

## Wrapping Up

The introduction of **named query filters** in EF 10 removes one of the longstanding limitations of EF's [**global query filters**](/milanjovanovic.tech/how-to-use-global-query-filters-in-ef-core.md) feature. You can now:

- Attach multiple filters to a single entity and manage them individually
- Selectively disable specific filters in a LINQ query using `IgnoreQueryFilters(["FilterName"])`
- Simplify common patterns like [**soft deletion**](/milanjovanovic.tech/implementing-soft-delete-with-ef-core.md) plus [**multi-tenancy**](/milanjovanovic.tech/multi-tenant-applications-with-ef-core.md) without resorting to complicated conditional logic

Named query filters can become a powerful tool to keep your queries clean and your domain logic encapsulated.

Whether you're building SaaS applications that isolate tenant data or ensuring that deleted records stay hidden until you explicitly need them, EF 10's named query filters offer the flexibility you've been waiting for.

Give them a try in the preview and start thinking about how they can simplify your codebase.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Named Query Filters in EF 10 (multiple query filters per entity)",
  "desc": "EF 10 introduces named query filters, allowing multiple filters on a single entity and letting you selectively disable specific filters without turning off all query filters. This article explains how the feature works, shows practical examples for combining soft deletion and multi-tenancy, highlights best practices like using constants for filter names, and explores where such fine-grained control is particularly useful.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/named-query-filters-in-ef-10-multiple-query-filters-per-entity.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
