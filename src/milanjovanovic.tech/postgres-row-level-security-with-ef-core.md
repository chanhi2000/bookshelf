---
lang: en-US
title: "Let Postgres Enforce Tenant Isolation"
description: "Article(s) > Let Postgres Enforce Tenant Isolation"
icon: iconfont icon-postgresql
category:
  - C#
  - DotNet
  - DevOps
  - Docker
  - Data Science
  - PostgreSQL
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
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Let Postgres Enforce Tenant Isolation"
    - property: og:description
      content: "Let Postgres Enforce Tenant Isolation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/postgres-row-level-security-with-ef-core.html
prev: /data-science/postgresql/articles/README.md
date: 2026-09-12
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_211.png
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

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Let Postgres Enforce Tenant Isolation"
  desc="EF Core query filters can be bypassed. PostgreSQL row-level security enforces tenant isolation on reads and writes, if you connect with the right database role…"
  url="https://milanjovanovic.tech/blog/postgres-row-level-security-with-ef-core"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_211.png"/>

PostgreSQL **row-level security** (RLS) adds a database check behind EF Core query filters. It covers reads and writes, as long as the application connects as a non-owner role and sets the tenant every time a connection opens.

I've recommended a [**global query filter**](/milanjovanovic.tech/how-to-use-global-query-filters-in-ef-core.md) for [**shared-schema multi-tenancy**](/milanjovanovic.tech/multi-tenant-applications-with-ef-core.md) for years, and I still would. EF Core adds `WHERE tenant_id = @tenant` to every query it generates, so nobody has to remember the predicate. It also stops there: SQL you send through `ExecuteSql`, an entity you attach and save, and anything behind `IgnoreQueryFilters()` never get it.

I wanted a second check that doesn't depend on every developer remembering the first one. Postgres has one built in with **row-level security** (RLS). So I set it up with EF Core 10, [<VPIcon icon="fas fa-globe"/>Npgsql](https://npgsql.org/efcore/), and Postgres 18 on a table with 1,000,000 invoices across 50 tenants, and tried to get past it.

---

## Put the Rule in Postgres

Row-level security is a predicate that Postgres attaches to every statement against a table, for every role that isn't exempt. The application can't forget it, because it never sees it.

Superusers, roles with `BYPASSRLS`, and the table's owner all skip it, and in a lot of apps the one database user that runs migrations also serves requests and owns the tables. So the sample connects as `app_user`, a role that owns nothing and has only the DML grants it needs, and migrations run as a separate owner role. That split also keeps `DROP POLICY` out of the application's reach.

I consider it a general best practice to have a dedicated database user for executing queries against the database.

Here's an example [<VPIcon icon="iconfont icon-postgresql"/>policy](https://postgresql.org/docs/18/ddl-rowsecurity.html) on the `invoices` table:

```sql{1-2,5-6}
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON invoices
  USING      (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.tenant_id', true), '')::uuid);
```

`USING` decides which rows a read, update, or delete can reach, and `WITH CHECK` rejects an insert or update whose new `tenant_id` doesn't match the session setting. `NULLIF` makes a missing or empty setting match nothing instead of everything, which is the failure I'd rather have. `FORCE` puts the owner under the policy too, so a migration script can't touch every tenant's rows by accident.

The `current_setting` function returns the current value of a configuration parameter.

---

## Set the Tenant on Every Connection

The policy reads a session variable, so the application has to set it, and the obvious place is the start of the request. But you'll quickly run into problems with this approach.

EF Core opens the connection for a command and closes it afterwards, and [<VPIcon icon="fas fa-globe"/>Npgsql resets pooled session state](https://npgsql.org/doc/performance.html#pooled-connection-reset), so the query after my `SET` ran on a connection that had never heard of the tenant. Turning the reset off with `No Reset On Close=true` is worse: the next request picked up the previous tenant's setting and saw rows it shouldn't have.

The fix is to set the tenant every time a connection opens, on whichever physical connection Npgsql hands out. A [**connection interceptor**](/milanjovanovic.tech/how-to-use-ef-core-interceptors.md) does that, with `TenantContext` holding the tenant authorized for the current request:

```cs{8,22,26} :collapsed-lines
public sealed class TenantConnectionInterceptor(TenantContext tenant)
    : DbConnectionInterceptor
{
    public override void ConnectionOpened(
        DbConnection connection, ConnectionEndEventData eventData)
    {
        using var command = Build(connection);
        command.ExecuteNonQuery();
    }

    public override async Task ConnectionOpenedAsync(
        DbConnection connection, ConnectionEndEventData eventData,
        CancellationToken cancellationToken = default)
    {
        await using var command = Build(connection);
        await command.ExecuteNonQueryAsync(cancellationToken);
    }

    private DbCommand Build(DbConnection connection)
    {
        var command = connection.CreateCommand();
        command.CommandText = "SELECT set_config('app.tenant_id', @tenant, false)";

        var parameter = command.CreateParameter();
        parameter.ParameterName = "tenant";
        parameter.Value = tenant.TenantId?.ToString() ?? "";
        command.Parameters.Add(parameter);
        return command;
    }
}
```

`set_config` takes the tenant as a bind parameter, and `false` means session scope. The `?? ""` is what makes a request without a tenant fail closed.

Register the scoped services in <VPIcon icon="iconfont icon-csharp"/>`Program.cs`:

```cs{2,5}
builder.Services.AddScoped<TenantContext>();
builder.Services.AddScoped<TenantConnectionInterceptor>();
builder.Services.AddDbContext<AppDbContext>((sp, options) => options
    .UseNpgsql(connectionString)
    .AddInterceptors(sp.GetRequiredService<TenantConnectionInterceptor>()));
```

This is `AddDbContext`, not `AddDbContextPool`, because a pooled context would keep the first request's `TenantContext`. Behind [<VPIcon icon="fas fa-globe"/>PgBouncer](https://pgbouncer.org/features.html) in transaction pooling mode, the tenant has to be set with `set_config(..., true)` inside an explicit transaction instead.

The cost is one extra round trip per connection open, about 0.4 ms per request in my testing.

---

## Try to Bypass It

With the policy in place, I went back to the list from the top of the issue, starting with the filter switched off by hand:

```cs{2,4}
var affected = await db.Invoices
    .IgnoreQueryFilters()
    .Where(i => i.Id == otherTenantInvoiceId)
    .ExecuteUpdateAsync(
        setters => setters.SetProperty(i => i.Status, "Cancelled"),
        cancellationToken);
// affected == 0
```

`ExecuteUpdateAsync` sends the SQL straight away, without change tracking or `SaveChanges`, and the filter is gone. The row belongs to another tenant, so the policy hides it, and the update affects nothing.

The attached entity fails the same way. EF Core builds `UPDATE invoices SET ... WHERE id = @p0` from the primary key, the policy adds its own predicate, and zero rows match. EF reports that as `DbUpdateConcurrencyException`, which looks like a lost [**optimistic concurrency**](/milanjovanovic.tech/solving-race-conditions-with-ef-core-optimistic-locking.md) race, but the row was never visible to this session.

An unfiltered read still returns only the current tenant's invoices, and an insert carrying another tenant's ID fails with SQLSTATE `42501`.

What the policy can't do is decide which tenant is right. If the application resolves the wrong tenant, the policy enforces that one instead.

---

## Summary

I'd keep the EF query filter for multi-tenant applications and add the policy under it. The filter puts the tenant into the SQL, so query plans stay simple and the intent is visible in the code, and it costs nothing at runtime. The policy covers the code that never goes through it, including the `IgnoreQueryFilters()` someone adds for an admin report.

Backups and cross-tenant jobs need a role that bypasses the policy, so take that into account.

The [<VPIcon icon="fas fa-globe"/>row-level security lab](https://milanjovanovic.tech/labs/postgres-row-level-security) has the full setup, the bypass attempts, and the measured plans. With Docker and the .NET 10 SDK installed, extract the download and run:

```sh
docker compose up -d
dotnet run -- setup
dotnet run
```

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Let Postgres Enforce Tenant Isolation",
  "desc": "EF Core query filters can be bypassed. PostgreSQL row-level security enforces tenant isolation on reads and writes, if you connect with the right database role…",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/postgres-row-level-security-with-ef-core.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
