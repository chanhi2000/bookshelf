---
lang: en-US
title: "How to Keep Your Data Boundaries Intact in a Modular Monolith"
description: "Article(s) > How to Keep Your Data Boundaries Intact in a Modular Monolith"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Data Science
  - PostgreSQL
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - data-science
  - sql
  - postgres
  - posgtresql
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Keep Your Data Boundaries Intact in a Modular Monolith"
    - property: og:description
      content: "How to Keep Your Data Boundaries Intact in a Modular Monolith"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-keep-your-data-boundaries-intact-in-a-modular-monolith.html
prev: /programming/cs/articles/README.md
date: 2025-08-02
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_153.png
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Keep Your Data Boundaries Intact in a Modular Monolith"
  desc="Want real boundaries in your modular monolith? This article shows how to enforce them at the database level using Postgres schemas, roles, and EF Core — so your modules can't step on each other's data, even by accident."
  url="https://milanjovanovic.tech/blog/how-to-keep-your-data-boundaries-intact-in-a-modular-monolith"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_153.png"/>

[**Modular monoliths**](/milanjovanovic.tech/what-is-a-modular-monolith.md) promise the productivity of a monolith and the clear boundaries of microservices. They work because each module is self-contained: its domain model, behavior and data live behind a boundary. But one of the hardest places to maintain those boundaries is in the database.

Nothing stops a developer from running a rogue `JOIN` across tables or bypassing a public API.

In previous articles, I described [**four levels of data isolation**](/milanjovanovic.tech/modular-monolith-data-isolation.md) (table, schema, database and alternative persistence) and argued that [**modules should expose explicit APIs**](/milanjovanovic.tech/internal-vs-public-apis-in-modular-monoliths.md) to access their data.

This article goes deeper on the database side. You'll learn how to carve out logical and physical boundaries using PostgreSQL schemas and roles and EF Core, why those choices matter, and how to handle cross-cutting queries without breaking encapsulation.

---

## Why enforce database boundaries?

In a modular monolith each module **owns its data**. If Module A reaches into Module B's tables, you lose this constraint and your modules become tightly coupled. Instead, B exposes a public API and hides its persistence logic from consumers.

Beyond clean code, enforcing boundaries at the database level protects you against mistakes and makes it easier to extract a module into its own service later.

Database schemas act like folders: they let you organise objects and share a database among many users, but a user can access any schema only if they have privileges. This means we can deliberately lock each module to its own schema.

::: info The strategy

- Create a schema per module and a dedicated database role.
- Grant that role privileges only on its schema and set its default search path.
- Use EF with one `DbContext` per module, setting a default schema and connection string per module.
- For cross-cutting queries, publish a read-only database view that acts like a public API.
- *Optional*: Use row-level security policies to restrict access within a table.

:::

These practices give us **enforceable boundaries** while keeping the **operational overhead low**.

---

## Schemas, roles and search paths

PostgreSQL lets you create multiple schemas within a single database. A module can define its own schema and a role that owns it. The role only has usage and table-level privileges on that schema. For example, for an orders module:

```sql
-- create a user for the module and its schema
CREATE ROLE orders_role LOGIN PASSWORD 'orders_secret';
CREATE SCHEMA orders AUTHORIZATION orders_role;
GRANT USAGE ON SCHEMA orders TO orders_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA orders TO orders_role;
ALTER ROLE orders_role SET search_path = orders;
```

The `ALTER ROLE` command sets the role's default search path so unqualified names resolve to the module's schema. If you don't want to rely on the search path, always qualify table names (`orders.table_name`).

Row-level security (RLS) allows you to filter rows based on a policy expression. You enable RLS on a table and define a policy referencing `current_user` or columns:

RLS is powerful for multi-tenant scenarios or sensitive data, but it adds complexity. Start with schemas and roles and add RLS only when necessary.

---

## Configuring EF schemas and multiple DbContexts

I assume readers are comfortable with EF Core, so we'll skip the basics and focus on what matters for modular monoliths:

- Use [**one DbContext per module**](/milanjovanovic.tech/using-multiple-ef-core-dbcontext-in-single-application.md). Each context contains only the entities of its module, and you call `modelBuilder.HasDefaultSchema("orders")` in `OnModelCreating` to map entities to the correct schema. Setting a default schema also affects sequences and migrations.
- Provide a connection string per module using the module's role. Even if modules share the same database, separate credentials ensure that a misconfigured context cannot access another schema.
- Configure the migrations history table in each context using `MigrationsHistoryTable("__EFMigrationsHistory", "orders")` so that EF's migration metadata stays within the module's schema.

These settings ensure EF Core queries and migrations respect the boundaries established by the database.

---

## Step-by-step: Enforcing module boundaries

Suppose we have two modules (**Orders** and **Shipping**) and we want to enforce boundaries between them. Here's what we need to do:

### 1. Create schemas and roles

Use SQL to create orders and shipping schemas and their corresponding roles (`orders_role`, `shipping_role`). Grant each role privileges only on its schema.

```sql
-- Orders schema and role
CREATE ROLE orders_role LOGIN PASSWORD 'orders_secret';
CREATE SCHEMA orders AUTHORIZATION orders_role;
GRANT USAGE ON SCHEMA orders TO orders_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA orders TO orders_role;
ALTER ROLE orders_role SET search_path = orders;
    
-- Shipping schema and role
CREATE ROLE shipping_role LOGIN PASSWORD 'shipping_secret';
CREATE SCHEMA shipping AUTHORIZATION shipping_role;
GRANT USAGE ON SCHEMA shipping TO shipping_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA shipping TO shipping_role;
ALTER ROLE shipping_role SET search_path = shipping;
```

### 2. Add connection strings

In configuration, define separate connection strings per module:

```json
{
  "ConnectionStrings": {
    "Orders": "Host=localhost;Database=appdb;Username=orders_role;Password=orders_secret",
    "Shipping": "Host=localhost;Database=appdb;Username=shipping_role;Password=shipping_secret"
  }
}
```

### 3. Define `DbContexts`

Each module defines its own context and sets the default schema. For the Orders module:

```cs
public class OrdersDbContext : DbContext
{
    public DbSet<Order> Orders { get; set; } = default!;
    public DbSet<OrderLine> OrderLines { get; set; } = default!;
    
    public OrdersDbContext(DbContextOptions<OrdersDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // set default schema for all entities in this context
        modelBuilder.HasDefaultSchema("orders");
        // optional: configure tables explicitly
        modelBuilder.Entity<Order>().ToTable("orders");
        modelBuilder.Entity<OrderLine>().ToTable("order_lines");
        base.OnModelCreating(modelBuilder);
    }
}
```

Register each context with its connection string and specify the migrations history table:

```cs
builder.Services.AddDbContext<OrdersDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Orders"),
        o => o.MigrationsHistoryTable("__EFMigrationsHistory", "orders")));
    
builder.Services.AddDbContext<ShippingDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Shipping"),
        o => o.MigrationsHistoryTable("__EFMigrationsHistory", "shipping")));
```

### 4. Maintain migrations separately

Because each module has its own context and schema, you maintain migrations separately. When generating a migration, specify the context:

```sh
dotnet ef migrations add InitialOrders \
--context OrdersDbContext \
--output-dir Data/Migrations/Orders
```

Repeat this for the Shipping context. EF Core will generate migration classes that create tables within the specified schema (because of `HasDefaultSchema`). Remember to apply the migrations in the correct order when deploying. You can automate this by having a migration runner iterate through the contexts.

With schemas, roles and multiple contexts in place, the data boundary becomes enforceable at the database level:

- The **Orders** module's `DbContext` knows only about the orders schema and uses credentials that have no privileges on the **Shipping** schema.
- The **Shipping** module cannot query `orders.orders` directly because its role lacks the necessary privileges.
- Cross-module communication must go through the module's public API (or an asynchronous event). This explicit coupling makes dependencies obvious and maintainable.

---

## Cross-cutting queries

Even in a modular system you occasionally need a screen that spans multiple modules, such as an **Order History** page that shows order and shipping data. Resist the temptation to `JOIN` across schemas. Two approaches can help:

- **Dedicated read model**. One module owns a view model and subscribes to events from others. This pattern works well when modules might be extracted later.
- **Database views with privileges**. Since our modules share a database, we can create a read-only view in the public schema that joins the relevant tables. We grant `SELECT` on the view to a special role or module. This view acts like a controlled public API. Consumers query the view but cannot access the underlying tables directly. The trade-off is similar to calling a synchronous API: if you later split the database, the view will have to be replaced with a service call.

For example:

```sql
CREATE VIEW public.order_summary AS
SELECT o.id, o.total, s.status
FROM orders.orders o
JOIN shipping.shipments s ON s.order_id = o.id;

-- grant read access to a reporting role
GRANT SELECT ON public.order_summary TO reporting_role;
```

This approach lets you build dashboards or admin screens without breaking boundaries.

---

## Conclusion

By giving each module its own schema, role and DbContext, and by controlling cross-module access via views or APIs, you **ensure that boundaries in your modular monolith are enforceable** rather than aspirational. This discipline makes it easier to evolve your system and paves the way for a future microservice extraction.

If you found this article valuable, check out my previous posts on modular monoliths:

```component VPCard
{
  "title": "What Is a Modular Monolith?",
  "desc": "Modular monoliths blend the simplicity and robustness of traditional monolithic applications with the flexibility and scalability of microservices. Today, I'll introduce you to the modular monolith architecture and why you should know about it.",
  "link": "/milanjovanovic.tech/what-is-a-modular-monolith.md",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```

```component VPCard
{
  "title": "Modular Monolith Data Isolation",
  "desc": "Modular monoliths are an architectural approach that's becoming very popular. They combine the benefits of modularity and monolithic design. Data isolation ensures that modules are independent and loosely coupled. Today, I will show you four data isolation approaches for modular monoliths",
  "link": "/milanjovanovic.tech/modular-monolith-data-isolation.md",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```

```component VPCard
{
  "title": "Internal vs. Public APIs in Modular Monoliths",
  "desc": "Every article about modular monoliths tells you to use public APIs between modules, but they rarely explain why these APIs exist or how to design them properly. After building several large-scale modular monoliths, I've learned that public APIs are not just about clean code - they're about controlling chaos.",
  "link": "/milanjovanovic.tech/internal-vs-public-apis-in-modular-monoliths.md",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```

If you want a structured, hands-on approach to building modular systems, from defining boundaries to extracting services, check out my [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md) course. Join more than 2,100+ students who have mastered modular monoliths with it. The course walks through these patterns in depth and shows how to apply them in a real codebase.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Keep Your Data Boundaries Intact in a Modular Monolith",
  "desc": "Want real boundaries in your modular monolith? This article shows how to enforce them at the database level using Postgres schemas, roles, and EF Core — so your modules can't step on each other's data, even by accident.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-keep-your-data-boundaries-intact-in-a-modular-monolith.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
