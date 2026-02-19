---
lang: en-US
title: "How to Elevate Your Database Game: Supercharging Query Performance with Postgres FDW"
description: "Article(s) > How to Elevate Your Database Game: Supercharging Query Performance with Postgres FDW"
icon: iconfont icon-postgresql
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-sceince
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Elevate Your Database Game: Supercharging Query Performance with Postgres FDW"
    - property: og:description
      content: "How to Elevate Your Database Game: Supercharging Query Performance with Postgres FDW"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/fdw-pushdown.html
prev: /data-science/articles/README.md
date: 2026-02-19
isOriginal: false
author:
  - name: Hamdaan Ali
    url: https://freecodecamp.org/news/author/hamdaan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771357398917/8db8c3fd-9f16-4631-aa48-2537e8a4cb45.png
---

# {{ $frontmatter.title }} 관련

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
  name="How to Elevate Your Database Game: Supercharging Query Performance with Postgres FDW"
  desc="Foreign data wrappers (FDWs) make remote Postgres tables feel local. That convenience is exactly why FDW performance surprises are so common. A query that looks like a normal join can execute like a distributed system: rows move across the network, r..."
  url="https://freecodecamp.org/news/fdw-pushdown"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1771357398917/8db8c3fd-9f16-4631-aa48-2537e8a4cb45.png"/>

Foreign data wrappers (FDWs) make remote Postgres tables feel local. That convenience is exactly why FDW performance surprises are so common.

A query that looks like a normal join can execute like a distributed system: rows move across the network, remote statements get executed repeatedly, and the local planner quietly becomes a coordinator. In that world, “fast SQL” is not mainly about CPU or indexes. It’s about **data movement** and **round-trips**.

This handbook covers the mechanism that determines whether a federated query behaves like a clean remote query or a chatty distributed workflow: **pushdown**.

Pushdown is not “moving compute”. Pushdown determines whether filtering, joining, ordering, and aggregation occur at the data source or after the data has already crossed the wire. When pushdown works, the local server receives a reduced result set. When it doesn’t, Postgres often has to fetch broad intermediate sets and finish the work locally.

The chapters ahead will help you build a practical mental model of what is “shippable” in `postgres_fdw`, why some expressions are blocked, and how to read `EXPLAIN (ANALYZE, BUFFERS, VERBOSE)` without getting tricked by familiar plan shapes.

After the core method, the handbook covers tuning knobs that matter in production, schema and indexing considerations, benchmarking methodology, monitoring and logging, and a case study that shows what a real pushdown win looks like end-to-end.

The later sections go deeper into advanced shippability edge cases, cost model calibration, and regression-proofing FDW workloads.

::: note Prerequisites

This handbook assumes basic comfort with Postgres query plans. It builds on `EXPLAIN (ANALYZE, BUFFERS)` rather than reintroducing SQL fundamentals, indexing, or join algorithms.

The focus here is federated execution: how foreign queries behave, and how to reason about them with the same clarity as local plans.

Here’s what you should already be comfortable with:

- Reading `EXPLAIN (ANALYZE, BUFFERS)` output and spotting obvious plan smells (row explosions, bad join order, missed indexes).
- Basic join mechanics (nested loop, hash join, merge join) and why cardinality estimates matter.
- Postgres statistics at a practical level (`ANALYZE`, correlation, and what “estimated rows vs actual rows” implies).

And here’s what you need to follow along with the examples:

- A Postgres “local” instance that will run `postgres_fdw` and act as the coordinator.
- A Postgres “remote” instance that holds the foreign tables.
- Permission on the local side to:
  - `CREATE EXTENSION postgres_fdw;`
  - create a `SERVER` and `USER MAPPING`
  - create `FOREIGN TABLE` objects (or permission to use existing ones)
- A way to run queries and capture plans:
  - `psql` is enough, and so is any GUI, as long as you can run `EXPLAIN (ANALYZE, BUFFERS, VERBOSE)`.

We won’t go through a long environment setup walkthrough. The examples assume the FDW objects exist and focus on plans and behavior.

We also won’t go into general distributed systems theory. Only the pieces that show up in an FDW plan are used.

---

## Executive Summary

The single most important lesson of this handbook is that **FDW pushdown reduces data movement**. It’s tempting to think of pushdown as merely changing where a calculation happens (“move the work to the remote”). But what really matters is whether the remote server is asked for only the rows you need.

When pushdown is working, the remote server performs the selective join and filtering, and the local Postgres receives a small, already reduced result set. When pushdown fails, the local server becomes a distributed query coordinator: it pulls large intermediate sets over the network and then finishes the heavy lifting locally.

Why does this matter? Because a refactor that makes more of your query shippable to the remote server can slash end‑to‑end latency without changing a single row of output. In the case study we'll explore later, rewriting a query so that the FDW can ship a joined remote query instead of performing multiple foreign scans and local joins reduces runtime from approximately **166 ms to 25 ms**. The business logic did not change – the *shape* of the work changed.

Below is a simple bar chart illustrating that dramatic drop. The chart uses actual timings from the case study. If you run the experiment yourself, the numbers may differ depending on your hardware and network, but the relative difference should be clear.

![Bar chart titled "Query Execution Time: Before vs After Refactor." The chart shows execution time in milliseconds on the vertical axis. The "Before" bar is much taller, over 160 ms, compared to the "After" bar, which is below 20 ms, indicating a significant improvement in execution time after refactoring.](https://cdn.hashnode.com/res/hashnode/image/upload/v1771117284661/ecadfc8b-7e45-4122-921d-5b06215d627a.png)

---

## Motivation

Foreign data wrappers let you query remote data using the same SQL syntax you use locally. That convenience is exactly why they can be so deceptive.

A federated query may look like a normal join, but under the hood, it behaves like a distributed system: some part of the plan runs on the remote server, some on the local server, and every boundary between them is a network hop. The slow path is rarely “bad SQL” – it’s usually a combination of two things:

1. **Too many rows are pulled over the network.** Without pushdown, the FDW retrieves a large slice of the remote table and applies your filters and joins locally. This may lead to tens of thousands or millions of rows being shipped across the network when you only needed hundreds or fewer.
2. **Too many round-trips.** If the plan performs a nested loop that drives a foreign scan, it can end up executing the same remote query hundreds or thousands of times. Each call might be fast on its own, but latency adds up.

This isn't speculation. PostgreSQL's documentation makes clear that a foreign table **has no local storage** and that Postgres “asks the FDW to fetch data from the external source” [^1]. There is no local buffer cache or heap storage to hide mistakes. Every row you retrieve must traverse the network at least once. If your plan fetches more rows than it needs, or repeatedly does so, performance can degrade quickly.

That’s why you should treat the Remote SQL shown in `EXPLAIN (VERBOSE)` as part of your query plan. It tells you exactly what the remote server is being asked to do. If it’s missing your filters or joins, you know the local server will have to finish the job. The rest of this handbook will teach you how to read that plan, how to force pushdown when possible, and how to recognize the signs that something has gone wrong.

---

## FDW Basics Without the Setup Tax

You might be tempted to skip this section if you've already created foreign tables in your own databases. Don't. Understanding the architecture of foreign data wrappers is essential to understanding why pushdown matters.

### SQL/MED in a nutshell

PostgreSQL implements the **SQL/MED** (Management of External Data) standard through its FDW framework. To access a remote Postgres server via `postgres_fdw`, you perform four steps:

1. **Install the extension**: `CREATE EXTENSION postgres_fdw` tells Postgres to load the FDW code.
2. **Create a foreign server**: `CREATE SERVER foreign_server FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host '...', port '...', dbname '...')`defines where the remote server resides and how to connect.
3. **Create a user mapping**: `CREATE USER MAPPING FOR your_user SERVER foreign_server OPTIONS (user 'remote_user', password '...')` tells Postgres how to authenticate on the remote side.
4. **Create a foreign table**: `CREATE FOREIGN TABLE remote_table (...) SERVER foreign_server OPTIONS (schema_name '...', table_name '...');` defines the columns and references the remote table.

Once you've done that, you can run `SELECT` statements against the foreign table as if it were local. But the definition hides an important detail: there is no storage associated with that foreign table [^1]. Every time you `SELECT`, `INSERT`, `UPDATE`, or `DELETE`, the FDW must connect to the remote server, build a remote query, send it, and read the results. This overhead is small for simple queries but becomes critical as queries get more complex.

[^1]: https://postgresql.org/docs/current/postgres-fdw.html#:~:text=It%20is%20generally%20recommended%20that,differently%20from%20the%20local%20server

### What postgres_fdw does and does not do

`postgres_fdw` does two things for you:

1. It builds remote SQL from your query, including pushing down safe filters, joins, sorts, and aggregates when it can.
2. It fetches rows from the remote server and hands them to the local executor. If some part of your query cannot be executed remotely, the local executor performs that part.

The FDW tries hard to minimize data transfer by sending as much of your `WHERE` clause as possible to the remote server and by not retrieving unused columns [^2]. It also has a number of tuning knobs that we'll explore later (such as `fetch_size`, `use_remote_estimate`, `fdw_startup_cost`, and `fdw_tuple_cost`[^3]). But the real win often comes from structuring your query so that the FDW can push work down.

[^2]: https://postgresql.org/docs/current/postgres-fdw.html#:~:text=
[^3]: https://postgresql.org/docs/current/postgres-fdw.html#:~:text=This%20option%2C%20which%20can%20be,false

There's one last architectural point to keep in mind: the remote server runs with a restricted session environment. In remote sessions opened by `postgres_fdw`, the `search_path` is set to `pg_catalog` only, and `TimeZone`, `DateStyle`, and `IntervalStyle` are set to specific values [^4]. This means that any functions you expect to run remotely must be schema‑qualified or packaged in a way that the FDW can find them. It also underscores why you should not override session settings for FDW connections unless you know exactly what you are doing [^4].

[^4]: https://postgresql.org/docs/current/postgres-fdw.html#:~:text=In%20the%20remote%20sessions%20opened,their%20expected%20search%20path%20environment

---

## Pushdown Mechanics

At a high level, “pushdown” means pushing as much of your SQL query as possible to the remote server. But the FDW cannot simply send arbitrary SQL. It must be *safe* and *portable* for remote evaluation. Postgres uses the term **shippable** to describe expressions and operations that can be evaluated on the foreign server.

### What “shippable” means in practice

An expression is considered shippable if it meets several conditions:

1. **It uses built‑in functions, operators, or data types**, or functions/operators from extensions that have been explicitly allow‑listed via the extensions option on the foreign server [^2]. If you use a custom function or an extension that has not been declared, the FDW assumes it cannot run remotely.
2. **It’s marked IMMUTABLE.** Postgres distinguishes between `IMMUTABLE`, `STABLE`, and `VOLATILE` functions. Only immutable functions – those that always return the same output for the same inputs and don’t depend on session state – are candidates for pushdown [^5]. This rule prevents time‑dependent functions, such as `now()` or `random()` from being evaluated remotely, because the result might differ between the local and remote servers.
3. **It doesn’t depend on local collations or type conversions**. PostgreSQL’s docs warn that type or collation mismatches can lead to semantic anomalies [^1]. If the FDW cannot guarantee that a comparison behaves identically on both servers, it will refuse to push it down. For example, comparing a `citext` column to a `text` constant could be unsafe if the remote server doesn’t have the `citext` extension installed.

[^5]: https://postgresql.org/docs/current/postgres-fdw.html#:~:text=functions%20in%20such%20clauses%20must,to%20reduce%20the%20risk%20of

From these rules, you can derive a mental checklist: avoid non‑immutable functions in your `WHERE` clause, keep your join conditions simple and typed correctly, and list any third‑party extensions you want to use in the foreign server’s extensions option so that they are considered shippable [^2].

### WHERE pushdown

If a `WHERE` clause consists entirely of shippable expressions, it will be included in the remote query. Otherwise, it will be evaluated locally. This matters because pushing a filter down reduces the number of rows returned to the local server.

Consider a predicate like this:

```sql
WHERE created_at >= now() - interval '30 days'
```

Because `now()` is volatile (it returns a different value each time it’s called), Postgres cannot assume the remote server will interpret `now()` the same way. The FDW therefore pulls the entire table and applies the filter locally.

A better approach is to pass a parameter into the query or compute the cutoff timestamp once in the application and embed it into the SQL.

### Join pushdown conditions

Joins are the next big lever. When `postgres_fdw` encounters a join between foreign tables on the **same foreign server**, it will send the entire join to the remote server unless it believes it will be more efficient to fetch the tables individually or unless the tables use different user mappings [^6]

[^6]: https://postgresql.org/docs/current/postgres-fdw.html#:~:text=When%20,clauses.

It applies the same precautions described for `WHERE` clauses: the join condition must be shippable, and both tables must be on the same server. Cross‑server joins are never pushed down – the FDW will perform them locally.

### Shippability decision tree

It can be helpful to visualize the shippability rules as a flowchart. Below is a simple decision tree that you can use when inspecting an expression or join clause.

It starts with the question of whether an expression is in a WHERE or JOIN clause. Further decisions are made based on factors like using volatile functions, built-in functions, type mismatches, or cross-server joins. The flowchart concludes with outcomes like "Not shippable, evaluated locally" or "Shippable, included in Remote SQL."

If you reach the left side of the tree, the expression will be evaluated locally. If you reach the right side, the FDW can ship it.

![Flowchart for determining SQL expression shippability. It starts with the question of whether an expression is in a WHERE or JOIN clause. Further decisions are made based on factors like using volatile functions, built-in functions, type mismatches, or cross-server joins. The flowchart concludes with outcomes like "Not shippable, evaluated locally" or "Shippable, included in Remote SQL."](https://cdn.hashnode.com/res/hashnode/image/upload/v1771109842865/9dafcd32-c390-487d-8b35-2911d6075b13.png)

<!-- TODO: mermaid화 -->

---

## Shippable Operations: a Deep Dive

Postgres has been expanding what `postgres_fdw` can be pushed down over several versions. This section walks through each operation class and the conditions required for pushdown.

### Filters (WHERE clauses)

As explained above, simple filters that use built‑in operators and immutable functions are generally pushed down. If you see a `Filter:` node above a Foreign Scan in your plan, it means some part of your predicate didn’t qualify. Common reasons include using `now()`, `timezone()` or other volatile functions, referencing a non‑allow‑listed extension, or comparing different collation settings.

When this happens, the entire table (or at least all rows matching other shippable conditions) is fetched, and the filter is applied locally.

**Plan smell:** Look for a Foreign Scan node with a `Filter:` line directly above it. That means filtering happened locally. Also look for broad Remote SQL such as:

```sql
SELECT * FROM remote_table WHERE (name = 'Hamdaan')
```

with no group constraints. That's a sign that the filter was not pushed down.

### Joins

Simple inner joins between foreign tables on the same foreign server are usually pushable. The join condition must satisfy the same shippability rules as filters. If the join involves more than one foreign server, if the join condition uses an unshippable function, or if the foreign tables use different user mappings, the FDW will fetch each table separately and join them locally [^6]. This can lead to large intermediate sets being transferred.

**Plan smell:** A Hash Join or Merge Join where both inputs are Foreign Scan nodes indicates that the join was performed locally. Conversely, a single Foreign Scan representing a join and containing the `JOIN ... ON` clause in Remote SQL indicates that the join was pushed down.

### Aggregates (GROUP BY, COUNT, SUM, and so on)

Starting in PostgreSQL 10, aggregates can be pushed to the remote server when possible. The release notes state explicitly: “push aggregate functions to the remote server,” and explain that this **reduces the amount of data that must be transferred from the remote server and offloads aggregate computation** [^7].

[^7]: https://postgresql.org/docs/release/10.0/#:~:text=,Jeevan%20Chalke%2C%20Ashutosh%20Bapat

To qualify, both the grouping expressions and the aggregate functions themselves must be shippable. If the FDW cannot push an aggregate, it will fetch the raw rows and perform the aggregation locally.

**Plan smell:** Look for a `GroupAggregate` node above a Foreign Scan that returns many rows. When the aggregate is pushed down, there will be no local aggregate node. Instead, the Remote SQL will include a `GROUP BY` clause.

### ORDER BY and LIMIT

Prior to PostgreSQL 12, sorting and limiting were rarely pushed down. In version 12, Etsuro Fujita’s patch allows ORDER BY sorts and LIMIT clauses to be pushed to `postgres_fdw` foreign servers **in more cases** [^8]. For the sort or limit to be pushed, the underlying scan must be pushable, and the ordering expression must be shippable. Partitioned queries or complicated join trees may still cause the sort or limit to be applied locally.

[^8]: https://postgresql.org/docs/release/12.0/#:~:text=,Etsuro%20Fujita%29%20%C2%A7%20%C2%A7

**Plan smell:** A local Sort or Limit node above a Foreign Scan indicates the operation was not pushed down. Conversely, a Remote SQL statement containing ORDER BY and LIMIT indicates that pushdown succeeded.

### DISTINCT

Distinct operations can be pushed down when the distinct expression list is shippable. But if the distinct is combined with unshippable expressions, or if the distinct is applied after a join that cannot be pushed down, the FDW will retrieve all rows and perform the distinct locally.

### Window functions

In practice, window functions are rarely pushed down through `postgres_fdw`. They often require ordering or partitioning semantics that are difficult to represent portably. If you see a `WindowAgg` node in your plan, it’s almost always local. That doesn’t mean you can't use window functions with foreign tables, but you should expect them to incur network and CPU costs.

### Version differences

Postgres developers continue to improve the FDW layer. Here are some notable changes by version:

1. **PostgreSQL 9.6** introduced remote join pushdown and allowed UPDATE/DELETE pushdown. Before 9.6, all joins were local.
2. **PostgreSQL 10** introduced aggregate pushdown, enabling remote GROUP BY and aggregate functions [^7].
3. **PostgreSQL 12** expanded ORDER BY and LIMIT pushdown [^8].
4. **PostgreSQL 15** added pushdown for certain CASE expressions and other improvements.

If you learned FDW behavior on an older version, revisit your assumptions.

---

## Pushdown Blockers and Why They Exist

When pushdown fails, it’s not due to bad luck. There’s always a reason grounded in safety or correctness. Here are the most common blockers and how to diagnose them.

### Non‑immutable functions

Functions marked `VOLATILE` or `STABLE` cannot be pushed down because their results may differ between the local and remote server. Examples include `now()`, `random()`, `current_user`, and user‑defined functions that look at session variables or query the database. Even functions you might think are harmless, like `age()` or `clock_timestamp()`, can cause pushdown to fail.

::: tip Fix

Compute volatile values in your application or in a CTE before referencing the foreign table. For example, compute timestamp `'now' - interval '30 days'` as a constant and compare your `created_at` column against that constant. Alternatively, move the logic into a stored generated column on the remote table.

:::

### Type and collation mismatches

The documentation warns that when types or collations don’t match between the local and remote tables, the remote server may interpret conditions differently [^1]. This is particularly insidious when text comparisons, case‑insensitive collations, or non‑default locale settings are used. If Postgres can't guarantee the same semantics, it will pull rows locally and evaluate the expression.

::: tip Fix

Make sure that your foreign table definition uses the same data types and collations as the remote table. When in doubt, explicitly cast values to a common type.

:::

### Cross‑server joins

Joins across different foreign servers cannot be pushed down. The FDW can only ship a join when both tables reside on the same remote server and use the same user mapping [^6]. Otherwise, it will perform two separate scans and join the results locally.

::: tip Fix

If you frequently join tables across servers, consider consolidating the tables on a single server, materializing a view on one side, or pulling the smaller table into a temporary local table before joining.

:::

### Mixed local and foreign joins

A join between a local table and a foreign table will not be pushed down. Even though the foreign side might be pushdown‑eligible, the FDW cannot join it with local data on the remote server. A nested loop with a parameterized foreign scan is the typical pattern here, resulting in many remote calls.

::: tip Fix

Filter or aggregate as much as possible on the foreign side first (via a CTE or by materializing a subset) before joining to local tables.

:::

### Remote session settings and search paths

Because `postgres_fdw` sets a restricted `search_path`, `TimeZone`, `DateStyle`, and `IntervalStyle` in remote sessions [^4], any functions you call must be schema‑qualified or otherwise compatible. If a function relies on the current search path or session settings, it may break or produce different results on the remote side.

::: tip Fix

Schema‑qualify remote functions and ensure that any environment‑dependent logic is safe to execute under the default FDW session settings. If necessary, attach `SET search_path` or other settings to your remote functions.

:::

### Troubleshooting matrix

The table below maps symptoms in your `EXPLAIN` plan to likely causes and fixes. Use it as a quick diagnostic tool when something looks off.

| **Symptom in plan** | **Likely cause** | **Suggested fix** |
| --- | --- | --- |
| Foreign Scan has loops much greater than 1 | Parameterized remote lookup caused by nested loop, join conditions not shippable | Rewrite join so the FDW can ship a single joined query, or batch remote requests via an `IN` list or temporary table |
| Broad Remote SQL that lacks scope predicates | `WHERE` clause contains non‑immutable functions or unsupported operators | Replace volatile functions with constants or allow‑list extension functions, ensure types and collations match |
| Local Hash Join or Merge Join between two foreign tables | Join could not be pushed down (different servers, user mappings, or unshippable join expression) | Consolidate tables on one server, align user mappings, or rewrite the join condition |
| Local Sort, Limit, or Unique on top of a Foreign Scan | `ORDER BY`, `LIMIT`, or `DISTINCT` could not be pushed down | Simplify sort expressions, push filters deeper, check PG version for improvements |
| Plan runs but gives wrong results when pushdown is enabled | Semantic mismatch due to type/collation differences or remote session settings [^1] [^4] | Align types/collations, schema‑qualify functions, use stable session settings |

---

## Reading EXPLAIN Like a Pro

![SQL execution plan analysis table with columns: exclusive, inclusive, rows x, rows, loops, and node details. Rows display Nested Loop Join, Hash Join, and Seq Scan operations with costs, times, and buffers. Highlighted cells indicate notable metrics.](https://cdn.hashnode.com/res/hashnode/image/upload/v1771117830315/62ca8fde-2638-4ae1-b968-1100ac5251bb.png)

Many developers skim `EXPLAIN` plans for local queries, looking at the top nodes and overall cost. For FDW queries, you must invert that habit: read the foreign parts first. The Remote SQL string tells you what the remote server is being asked to do, and the loops field tells you how many times that remote call is executed.

### Inspect the Foreign Scan nodes

Start by finding the Foreign Scan node(s). In `EXPLAIN (VERBOSE)`, each foreign scan includes a line like:

```sql
Remote SQL: SELECT ...
```

This line is not a trivial – it’s the actual SQL that will run on the remote server. Read it carefully. Does it include your `WHERE` predicates? Does it include your join conditions? If not, you know the local server will pick up the slack.

Look at the loops column. If the loops exceed 1, the same remote query is executed multiple times. For example:

```sql
Foreign Scan on public.user_entity (rows=1 loops=416)
  Remote SQL: SELECT id, tenant_id FROM public.user_entity WHERE enabled AND service_account_client_link IS NULL AND id = $1
```

This is the “N+1” problem in disguise. The plan executes the foreign scan once per outer row. Multiply the per‑loop cost by the number of loops to understand why the query is slow. The fix is to rewrite the query so that the join and filters are applied in a single remote call.

### Recognize InitPlan vs SubPlan

An InitPlan runs once and caches its result. A SubPlan can run per outer row. In FDW queries, subplans often drive parameterized remote scans. If you see a SubPlan attached to a nested loop that feeds a foreign scan, suspect a parameterized remote lookup and look for ways to turn it into an InitPlan or merge it into a single remote query.

### Understand CTE materialization

Common table expressions (CTEs) behave differently depending on whether they are marked `MATERIALIZED` or `NOT MATERIALIZED`. A materialized CTE is computed once and stored in a temporary structure, then read by the rest of the query. A non‑materialized CTE is inlined into the parent query, allowing optimizations to span across the boundary.

In PostgreSQL 12 and later, CTEs are inlined by default unless they’re referenced multiple times or explicitly marked `MATERIALIZED`. Materializing a CTE that contains a foreign scan can freeze a broad remote fetch and prevent later clauses from being pushed down. On the other hand, materialization can prevent repeated remote scans if the CTE is referenced multiple times. Use this lever deliberately to control where remote work happens.

### Annotated example

Let's annotate a simplified excerpt from a real plan. The goal is to show how to quickly read the relevant parts.

```plaintesxt
Nested Loop  (rows=414 loops=1)
  -> Hash Join  (rows=416 loops=1)
       -> Foreign Scan on public.user_entity (rows=1 loops=416)
            Remote SQL: SELECT id, tenant_id FROM public.user_entity WHERE enabled AND service_account_client_link IS NULL AND id = $1
  -> Foreign Scan on public.user_attribute (rows=671 loops=1)
       Remote SQL: SELECT ua.user_id, ua.value FROM user_attribute ua JOIN user_entity u ON ua.user_id = u.id JOIN tenant r ON u.tenant_id = r.id WHERE ua.name = 'attribute A' AND r.name = 'demo' AND u.enabled AND u.service_account_client_link IS NULL AND (g.name = 'keycloak-group-a' OR g.parent_group = $1)
```

In the old plan, the first Foreign Scan executed 416 times, each time retrieving a single row. The Remote SQL only applies the filter on enabled and service_account_client_link – it doesn’t include the tenant or group scoping. That scoping is applied by the nested loop outside the foreign scan.

In the refactored plan, the second Foreign Scan results from combining user_attribute, user_entity, user_group_membership, keycloak_group, and tenant into a single remote query. It retrieves 671 rows in a single query and includes all relevant filters. There is no repeated remote call. The timing difference is driven by the different loop values and the selectivity of the Remote SQL.

---

## How to Tune postgres_fdw

Once you've structured your query for maximum pushdown, tuning knobs let you squeeze out further performance improvements and adjust planner decisions.

### fetch_size

`fetch_size` controls how many rows `postgres_fdw` retrieves per network fetch. The default is `100` rows [^9]. A small fetch size means more round-trips and lower memory usage. A larger fetch size reduces network overhead at the cost of buffering more rows in memory.

[^9]: https://postgresql.org/docs/current/postgres-fdw.html#:~:text=

In practice, increasing `fetch_size` to a few thousand can reduce latency for large result sets. It’s specified either at the foreign server or foreign table level:

```sql
ALTER SERVER foreign_server OPTIONS (ADD fetch_size '1000');
ALTER FOREIGN TABLE remote_table OPTIONS (ADD fetch_size '1000');
```

### use_remote_estimate

By default, the planner estimates the cost of foreign scans using local statistics. This can be wildly inaccurate if the foreign table has a different data distribution. Setting `use_remote_estimate` to true tells `postgres_fdw` to run `EXPLAIN` on the remote server to get row count and cost estimates. This can dramatically improve join order selection at the cost of an additional remote query during planning [^3]. You can set this per table or per server:

```sql
ALTER SERVER foreign_server OPTIONS (SET use_remote_estimate 'true');
```

### fdw_startup_cost and fdw_tuple_cost

These cost parameters model the overhead of starting a foreign scan and the cost per row fetched. Adjusting them can influence the planner’s choice of join strategy. A higher `fdw_startup_cost` discourages the planner from choosing plans with many small foreign scans (which might generate many remote calls). A higher `fdw_tuple_cost` discourages plans that fetch large numbers of rows [^3]. Use these only after you have solid evidence from `EXPLAIN` and experiments.

### ANALYZE and analyze_sampling

Running `ANALYZE` on a foreign table collects local statistics by sampling the remote table [^3]. Accurate stats are essential for good estimates when `use_remote_estimate` is false.

But if the remote table changes frequently, these stats become stale quickly. The `analyze_sampling` option controls whether sampling happens on the remote side or locally. When `analyze_sampling` is set to `random`, `system`, `bernoulli`, or `auto`, `ANALYZE` will sample rows remotely instead of pulling all rows into the local server[^3].

### extensions

The extensions option lists extensions whose functions and operators can be shipped to the remote server [^2. If you rely on functions from citext, `pg_trgm`, or other extensions, add them to the server definition:

```sql
ALTER SERVER foreign_server OPTIONS (SET extensions 'citext,pg_trgm');
```

### A quick knob impact table

| **Knob** | **Primary effect** | **When to change it** | **Possible downside** |
| --- | --- | --- | --- |
| fetch_size | Number of rows per fetch | Result sets are large and latency dominates | Too large consumes memory |
| use_remote_estimate | Better row count/cost estimates | Planner misestimates foreign scans | Extra remote queries during planning |
| fdw_startup_cost | Penalty per foreign scan | Planner chooses many small foreign scans | Wrong values bias the planner |
| fdw_tuple_cost | Cost per row fetched | Planner pulls too many rows | Mis‑tuned values mislead planner |
| extensions | Which extension functions are shippable | Using extension functions in predicates | Extensions must exist and match on both servers |

---

## Schema and Index Recommendations

Pushdown doesn’t eliminate the need for good indexes. In fact, effective pushdown depends on the remote server having indexes that support the filter and join predicates you’re shipping.

Below are some patterns to watch for in FDW queries and the indexes that support them. You can adapt these to your own schema.

| **Table** | **Access pattern** | **Recommended index** | **Why** |
| --- | --- | --- | --- |
| tenant (remote) | Filter by tenant.name | UNIQUE (name) or BTREE (name) | Resolves tenant ID quickly |
| keycloak_group (remote) | Filter by name, join by tenant_id, filter on parent_group | Composite (tenant_id, name) and (parent_group) | Supports resolving root group and walking one‑level hierarchy |
| user_group_membership (remote) | Join by user_id, filter by group_id | BTREE (group_id, user_id) | Efficiently finds users in a set of groups |
| user_attribute (remote) | Filter by name, join by user_id | Composite (name, user_id) (optionally include value) | Matches “attribute name → users → values” flow |
| user_entity (remote) | Filter by tenant_id, enabled, service_account_client_link IS NULL, join by id | Partial index on (tenant_id, id) with predicate on enabled and service_account_client_link IS NULL | Helps remote planner start from user table when tenant and user filters are applied |
| filtercategory (local) | Filter by category && uuid[], join on (entitytype, entityid) | GIN index on category, BTREE (entitytype, entityid) | Speeds array overlap checks and join predicate |

In general, indexes should reflect the join order you expect the remote planner to use. If your Remote SQL starts with:

```sql
FROM user_attribute ua JOIN user_entity u ON ua.user_id = u.id JOIN user_group_membership ugm ON ...
```

ensure that indexes exist on `user_attribute(user_id`) and `user_group_membership(user_id)`.

---

## Benchmarking Methodology

It’s easy to claim a performance improvement without proper measurement. Here's a repeatable method you can use to benchmark FDW query changes.

1. **Warm the caches.** Run each query once to load data into the remote buffer cache and the local FDW connection. Discard the timings.
2. **Measure latencies.** Use EXPLAIN (ANALYZE, BUFFERS, VERBOSE) to capture execution times, buffer usage, and remote row counts. Be aware that EXPLAIN ANALYZE adds overhead, so record the raw execution time if possible by running the query directly.
3. **Record remote metrics.** On the remote server, enable pg_stat_statements and track the calls, total_time, and rows for each remote query. This gives you a per‑query breakdown and confirms what Remote SQL is executed.
4. **Control for concurrency and network latency.** Run benchmarks during a quiet period or isolate the test cluster. If your environment has high network latency, record the round‑trip time separately to attribute delays.
5. **Compare apples to apples.** Benchmark the old and new queries under identical conditions. Use the same sample data, same remote server, and same connection settings.
6. **Look at row counts.** The primary goal of pushdown is to reduce the number of rows shipped. Compare the rows column of each Foreign Scan node.

Here's a simple matrix you can use to record your experiments:

| **Scenario** | **What you're testing** | **Expected change in Remote SQL** | **Metrics to record** |
| --- | --- | --- | --- |
| Baseline (old query) | Starting point: broad remote scans + local joins | Remote SQL lacks scoping predicates | p50/p95 latency, remote row count, local sort/hash time |
| Refactor (new query) | Join + filter pushdown | Remote SQL includes joins and filters | Same metrics, plus remote row count |
| Introduce a volatile function | Pushdown blocker test | Clause removed from Remote SQL | Remote row count increases, local filter cost increases |
| Type or collation mismatch | Semantic risk test | Remote SQL might change behavior or lose pushdown | Compare correctness and row counts |
| ORDER/LIMIT pushdown | Version‑dependent test | Remote SQL includes ORDER BY, LIMIT | Sort time shifts to remote. Row count should remain |
| use_remote_estimate on/off | Planning accuracy test | Planner uses remote estimates | Planning time, join order, and runtime difference |

---

## Monitoring and Logging

In production, you need to know when a query starts misbehaving. There are two places to look: the local server and the remote server.

### Local metrics

1. **pg_stat_statements.** This extension tracks planning and execution times, row counts, and buffer hits for each query. Look for high total times relative to rows or calls.
2. **Auto Explain or auto_explain.** Turn on `auto_explain.log_min_duration_statement` to capture slow queries with plans. This will show you the Remote SQL executed and whether the plan changed.
3. **Connection pool metrics.** Monitor connection counts and wait events related to FDW operations (for example, PostgresFdwConnect, PostgresFdwGetResult) as described in the documentation [^10].

[^10]: https://postgresql.org/docs/current/postgres-fdw.html#:~:text=,Extension

### Remote metrics

1. **pg_stat_statements on the remote server.** This lets you see which Remote SQL queries are being executed, how often, and how long they take. Compare these with the Remote SQL strings in your local EXPLAIN plans.
2. **Server logs.** Increase `log_statement` or `log_min_duration_statement` on the remote server to capture long-running remote queries.

Correlating local and remote metrics can reveal patterns such as a new code path causing a surge in remote queries or pushdown failures, leading to heavy remote scans.

---

## Case Study: Refactoring a Keycloak Coverage Query

The theory above may seem abstract until you see it play out in practice. Let's walk through a real example inspired by a Keycloak integration.

The original query calculated coverage: given a list of category IDs, it returned the percentage of users who had attributes mapped to those categories and a JSON array of entity counts. The query used a CTE to build a list of scoped users, then joined it with user attributes, category mappings, and a few other tables.

### Symptom

In a test environment with 100K user records, the query averaged 166 ms. This was slower than expected. Running `EXPLAIN (ANALYZE, BUFFERS, VERBOSE)` showed two foreign scans on the Keycloak database. The first scanned `user_entity` 416 times (loops = 416). The second pulled all rows from `user_attribute` where `name = 'attributeA'` before filtering by tenant and group locally.

Here's a simplified excerpt (numbers are approximate):

```sql
Foreign Scan on public.user_entity  (actual time=0.117..0.117 rows=1 loops=416)
  Remote SQL: SELECT id, tenant_id FROM public.user_entity WHERE (enabled AND service_account_client_link IS NULL AND id = $1)
Foreign Scan on public.user_attribute  (actual time=41.267..80.352 rows=80739 loops=1)
  Remote SQL: SELECT value, user_id FROM public.user_attribute WHERE (('attributeA' = name))
```

The first scan performed a single-row lookup 416 times. The second scan retrieved 80,739 rows because the only condition pushed down was `name = 'attributeA'`. Tenant and group scoping occurred locally. That meant 80k rows were transferred over the network and then filtered down to about 671 on the local side.

### Diagnosis

There were two main issues.

First was the N+1 remote calls on user_entity. The join to `user_entity` was not pushed down, so the plan executed a remote lookup for each row from `user_group_membership`. This created 416 remote queries.

Second was the unscoped attribute fetch. Because the `WHERE` clause included `user_entity.tenant_id = tenant.id` and `keycloak_group.name = 'groupA'` in a higher CTE, the FDW could not see those predicates when scanning `user_attribute`. It therefore fetched all rows with `name = 'attributeA'` and left the tenant and group filters to the local side.

### Refactor

The fix was to inline the tenant and group joins into the user_attribute scan to avoid the nested-loop pattern. The refactored `selected_user_attributes` CTE looked like this (simplified for readability):

```sql
WITH selected_user_attributes AS (
  SELECT DISTINCT ua.user_id, ua.value
  FROM public.user_attribute ua
  JOIN public.user_entity u ON u.id = ua.user_id
  JOIN public.user_group_membership ugm ON ugm.user_id = u.id
  JOIN public.keycloak_group g ON g.id = ugm.group_id
  JOIN public.tenant r ON r.id = u.tenant_id
  WHERE ua.name = 'attributeA'
    AND u.enabled
    AND u.service_account_client_link IS NULL
    AND r.name = 'tenantA'
    AND (g.name = 'groupA' OR g.parent_group = (
         SELECT id FROM public.keycloak_group WHERE name = 'groupA' AND tenant_id= r.id
    ))
)
```

This single query expresses the same scoping logic that previously lived in separate CTEs. Because all the join conditions are on the same foreign server and use built‑in operators, the FDW can push down the entire join. The new plan looked like this:

```sql
Foreign Scan  (actual time=7.840..7.856 rows=671 loops=1)
  Remote SQL: SELECT ua.user_id, ua.value FROM user_attribute ua JOIN user_entity u ON ua.user_id = u.id JOIN user_group_membership ugm ON ugm.user_id = u.id JOIN keycloak_group g ON g.id = ugm.group_id JOIN tenant r ON u.tenant_id= r.id WHERE ua.name = 'attributeA' AND u.enabled AND u.service_account_client_link IS NULL AND r.name = 'tenantA' AND (g.name = 'groupA' OR g.parent_group = $1)
```

Only one remote query is executed, and it returns 671 rows. Tenant and group scoping occur on the remote server. There is no nested loop or repeated remote scan. The final runtime dropped to **about 25 ms**.

### Why it improved

1. **Fewer rows crossing the network.** The old plan fetched 80k attribute rows and filtered them locally. The new plan fetched only the 671 scoped rows.
2. **No repeated remote calls.** The old plan executed 416 remote scans of `user_entity`. The new plan performs one joined remote query.
3. **Less local work.** Because the join and filtering happen remotely, the local side no longer hashes or filters large sets.

### Key takeaway

If you see a Foreign Scan with a high loops count or a Remote SQL that doesn’t contain your filters and joins, you’re leaving performance on the table. Merging filters and joins into a single remote query (subject to shippability rules) often yields orders-of-magnitude improvements.

---

## Checklist and Troubleshooting Guide

The following steps summarize how to approach FDW performance tuning:

1. **Inspect the Remote SQL.** Always run `EXPLAIN (VERBOSE)` and look at what is being sent to the remote. If your predicates are missing, the FDW isn't pushing them down.
2. **Check loops.** If the loops are greater than 1 on a Foreign Scan, you are paying for repeated remote calls. Rewrite the query or reorder the joins to make the foreign scan run once.
3. **Make predicates shippable.** Replace volatile functions with constants or parameters. Ensure operators and functions are built‑in or explicitly allow‑listed via the extensions option [^2].
4. **Align types and collations.** Use the same data types and collations on both sides to avoid semantic mismatches [^1].
5. **Push joins to the same server.** Consolidate tables on one foreign server if possible. Joins across servers cannot be pushed down [^6].
6. **Use use_remote_estimate when planning seems off.** Enabling remote estimates can improve join order selection [^3].
7. **Tune fetch_size and costs** if your queries transfer many rows. A bigger fetch_size reduces round-trip; adjusting `fdw_startup_cost` and `fdw_tuple_cost` influences the planner [^3].
8. **Analyze foreign tables** if you rely on local cost estimates. Keep in mind that stats can get stale quickly [^3].
9. **Monitor both servers.** Use `pg_stat_statements` on local and remote servers to see how often remote queries run and how long they take.
10. **Test version upgrades.** Each major release improves FDW pushdown semantics (for example, aggregates in 10 [^7], ORDER/LIMIT in 12 [^8]). Retest after upgrading.

---

## Case Study Takeaways

Querying remote data with PostgreSQL’s `postgres_fdw` can be fast and convenient if you respect the underlying mechanics. Pushdown is the difference between streaming a trickle of relevant rows and hauling an ocean of data across the network. It isn't simply a matter of moving CPU cycles – it changes how much data moves, how many network round-trip occur, and how much your local server has to do.

The rules may seem restrictive – use only immutable functions, avoid cross‑server joins, align types and collations – but they exist to preserve correctness while enabling optimization.

By reading `EXPLAIN` from the bottom up, inspecting the Remote SQL, and understanding the shippability rules, you can spot slow patterns quickly. Armed with tuning knobs like `fetch_size` and `use_remote_estimate`, and a willingness to rewrite queries to make joins and filters pushable, you can often achieve dramatic performance gains without touching your hardware.

This case study shows that rewriting a query to enable a single-joined remote query reduced runtime from around **166 ms to 25 ms**. That sort of improvement is not rare. It’s what happens when you treat FDW queries as distributed queries rather than local queries in disguise.

The next time you debug a slow FDW query, remember this handbook. Check the Remote SQL. Count the loops. Ask yourself: “Am I doing the work close to the data, or am I bringing the data to the work?” Adjust accordingly, and you'll write queries that make the most of Postgres's federated capabilities while keeping your latency in check.

This section closes the case study loop and summarizes exactly what changed in the plan and why it produced a large end-to-end win. The following sections of the handbook turn that single win into a repeatable method: how Postgres determines what is shippable, how to quickly read FDW plans, which operations and versions matter, and how to debug common failure modes that prevent pushdown.

---

## Advanced Operations: A Deeper Dive into Shippability

The previous sections introduced the basic rules around what can be pushed to the remote and why. To really make sense of those rules, you need to see how they play out on the operations you use every day.

This section walks through filters, joins, aggregates, ordering, and limits, DISTINCT queries, and window functions in more detail. By the end, you should have a mental map of which operations to trust and which to double‑check when reading your plans.

### Filters and simple predicates

#### `WHERE` clauses matter more than you think

When you specify `WHERE attribute = 'value'` on a foreign table, the FDW will happily transmit that predicate to the remote server as long as the comparison uses built‑in types and immutable operators. For example:

- `WHERE id = 42` is fine
- `WHERE lower(username) = 'hamdaan'` is fine if `lower()` is allow‑listed and immutable
- `WHERE created_at >= now() - interval '7 days'` is not shippable because `now()` is volatile

When such a predicate cannot be pushed, the FDW will fetch every row that matches all the shippable predicates and apply the rest locally. That means that a seemingly innocuous call to `now()` can blow up your network traffic.

The lesson is simple: compute volatile values up front (in your application or in a CTE) and reference them as constants in the query against the foreign table.

#### Complex expressions are not automatically unsafe

Suppose you have `WHERE (status = 'active' AND (age BETWEEN 18 AND 29 OR age > 65))`. This entire expression is shippable because it uses built‑in boolean logic, simple comparisons, and immutable operators. The FDW will deparse it into remote SQL and forward it. You only need to worry when one of the subexpressions introduces a function or operator that the FDW doesn’t recognize or cannot safely assume exists on the remote.

A good heuristic is: if you can express your filter using only simple comparisons, boolean logic, and built‑in functions, pushdown should work. When in doubt, check the Remote SQL.

#### Array and JSON operators

Modern Postgres makes heavy use of array and JSON functions. Many of these functions, like the array overlap operator `&&` used in the case study, are built‑in and can be shipped. But some JSON functions are provided by extensions (like `jsonb_path_query` or functions from the `pgjson` family).

If your filter uses one of these, ensure that the extension is available and allow‑listed on the foreign server. Otherwise, the FDW will fetch rows and perform the JSON logic locally. This is rarely what you want when dealing with large JSON columns.

### Joins: the good, the bad, and the ugly

#### Same‑server joins are your friend

If you join multiple foreign tables that are all defined on the same foreign server and user mapping, and if the join condition uses only shippable expressions, then the FDW can generate a single remote join. This is the ideal case.

For example, joining orders and customers on `orders.customer_id = customers.id` is pushable, as long as both tables reside on the same foreign server. The remote planner will use its own statistics and indexes to plan the join, and the local server will simply iterate through the result. Postgres 9.6 and later support this pattern [^6].

#### Cross‑server joins break pushdown

If you attempt to join two foreign tables that live on different servers (or even on the same remote server but with different user mappings), postgres_fdw will fetch the tables separately and join them locally. This is almost always slower than pushing the join down, because you end up transferring both tables in their entirety.

The FDW design team chose not to support cross‑server joins because there is no portable way to tell two remote servers to cooperate on a join. Your options are: replicate one table on the other server, materialize the smaller table locally before joining, or restructure the query to filter aggressively on each side before joining locally.

#### Mixed local/foreign joins are tricky

Joining a local table to a foreign table cannot be pushed down, for straightforward reasons: the remote server has no access to your local data. A common pattern that triggers repeated remote calls looks like this:

```sql
SELECT u.id, a.value
FROM users u
LEFT JOIN user_attribute a
  ON a.user_id = u.id AND a.name = 'favorite_color';
```

If `users` is a local table and `user_attribute` is foreign, the plan may use a nested loop: for each local u, it executes a remote lookup in user_attribute to retrieve attributes.

The fix is to flip the query: retrieve all relevant rows from `user_attribute` in one remote scan, then join them locally. Or, if possible, create a small temporary table on the remote side with your u.id values, perform the join entirely remotely, and then fetch the results.

#### Join conditions matter

Even when joining two foreign tables on the same server, an unshippable join condition will force the join to be local. For example, `JOIN ON textcol ILIKE '%foo%'` is not pushable because `ILIKE` might not exist or behave identically on the remote.

If you need case‑insensitive matching, consider lowercasing both sides: `LOWER(textcol) = 'foo'` (assuming the remote server has the `lower()` function available and allowed). Similarly, joining on a cast expression (for example, `JOIN ON CAST(a.id AS text) = b.text_id`) can block pushdown. Define your columns with matching types instead.

### Aggregates and grouping

Aggregates are where the data movement story shines. When you can push down a `GROUP BY` and aggregate functions like `COUNT`, `SUM`, `AVG`, or `MAX`, you reduce the result set to just the aggregated rows. This can be a difference of several orders of magnitude.

Postgres 10 introduced aggregate pushdown [^7]. But not all aggregates are equal:

**Simple aggregates** such as `COUNT(*)`, `SUM(col)`, `AVG(col)`, `MIN(col)`, and `MAX(col)` are shippable when applied to shippable expressions. Even `COUNT(DISTINCT col)` is often shippable, because the remote can deduplicate before counting. The FDW will wrap the aggregate in a remote query and return just the aggregated row.

If you see a GroupAggregate node on the local side, check whether all involved columns and functions are shippable. If they are, ensure that the join conditions above are also pushable.

**Filtered aggregates** such as `COUNT(*) FILTER (WHERE x > 5) or SUM(col) FILTER (WHERE status = 'active')` are often pushable, because they translate into `SUM(CASE WHEN condition THEN col ELSE 0 END) or COUNT(...)`. As long as the filter is shippable, the FDW will push it into the remote aggregate.

**User‑defined aggregates** are rarely pushable. If you have a custom aggregate function, the FDW will not assume that it exists or behaves the same on the remote server. Even if you install the function on both servers, postgres_fdw won't push it unless the function is in an allow‑listed extension.

**Grouping sets and rollups** are not currently pushable. When you write `GROUP BY GROUPING SETS (...) or ROLLUP(...)`, Postgres will compute the grouping locally even if the underlying scan is remote.

If you need complex rollups, consider performing them in two steps: push down the initial grouping to the remote server to reduce rows, then perform the rollup locally.

### ORDER BY, LIMIT, and DISTINCT

Ordering and limiting rows may seem like purely cosmetic features, but they affect how much data is transferred. If the remote can sort and limit, the local server only receives the top N rows. If it cannot, the local server must sort everything.

Postgres 12 expanded the cases where `ORDER BY` and LIMIT are pushed down [^8]. Here are guidelines:

- **Single foreign scan with simple sort:** If your query selects from one foreign table and sorts by a shippable expression (for example, `ORDER BY created_at DESC`), the FDW will include `ORDER BY` in Remote SQL. It will also push down `LIMIT` and `OFFSET`. This is ideal because the remote server does the sort and sends only the top rows.
- **Sort after join:** If you sort after joining two foreign tables on the same server, and the join and sort expressions are shippable, the FDW may push both down. But if the sort requires columns from the local side or from a different remote server, the FDW cannot push it down.
- **Sort after aggregation:** Sorting aggregated results is often pushable as long as the aggregate itself is pushable. But when grouping occurs locally, the sort remains local.
- **DISTINCT behaves like GROUP BY.** If the distinct expression list is shippable, the FDW can push it down. If you write `SELECT DISTINCT ON (col1) col2, col3 FROM ...` and col3 is not part of the `DISTINCT` list, Postgres will treat this as `GROUP BY` and may push it. Be aware that `DISTINCT ON` semantics differ from plain `DISTINCT` and may not be pushable in older Postgres versions.

### Window functions

Window functions (for example, `ROW_NUMBER() OVER (PARTITION BY ...), RANK(), LAG(), LEAD()`) rely on ordering and partitioning across rows.

Postgres has not yet taught `postgres_fdw` how to push window functions. When you see a WindowAgg node in your plan, it’s almost always local. The FDW will fetch the rows, and the local server will sort, partition, and compute the window. If you need to run window functions on remote data, plan to transfer the data locally.

### Version‑specific quirks

The exact pushdown capabilities vary by release. When planning migrations or deciding whether to rely on a pushdown behavior, check the release notes:

- **9.6:** first version to support pushdown of joins and sorts, and remote updates and deletes.
- **10:** introduced aggregate pushdown [^7], significantly reducing network use for `GROUP BY` queries.
- **11:** improved partition pruning and join ordering for foreign tables.
- **12:** expanded `ORDER BY` and `LIMIT` pushdown [^8].
- **15:** added pushdown for simple `CASE` expressions and additional built‑in functions.
- **17** (development at the time of writing) continues to expand shippable constructs. Always test on your target version because subtle improvements can change what the FDW can ship.

---

## Common Anti‑Patterns and How to Avoid Them

Everyone has run into FDW queries that seemed reasonable but turned out to be bottlenecks. Here are a few of the most common mistakes and how to correct them. These examples are deliberately simplified – so you can adapt them to your schema.

### Using volatile functions in predicates

::: tabs

@tab:active Anti‑pattern

```sql
SELECT *
FROM audit_logs
WHERE event_ts >= now() - interval '1 day';
```

`now()` is a volatile function, so the FDW refuses to push this predicate. It pulls all rows from audit_logs and filters them locally.

@tab Better

```sql
SELECT *
FROM audit_logs
WHERE event_ts >= $1;
```

Compute `$1` (a timestamp) in your application or upstream query. Or compute it once in a CTE:

```sql
WITH cutoff AS (SELECT now() - interval '1 day' AS ts) SELECT * FROM audit_logs, cutoff WHERE event_ts >= cutoff.ts;
```

The FDW sees a constant and pushes the predicate.

:::

### Joining local and foreign data first

::: tabs

@tab:active Anti‑pattern

```sql
SELECT u.email, ua.value
FROM users u
LEFT JOIN user_attribute ua ON u.id = ua.user_id AND ua.name = 'favorite_movie';
```

This uses a local table (users) to drive a join to a foreign table (user_attribute). The FDW receives 10,000 individual remote queries if users have 10,000 rows. Each call fetches one or zero rows from user_attribute.

@tab Better

```sql
-- Fetch all favorite movies remotely and join locally
WITH remote_movies AS (
  SELECT ua.user_id, ua.value
  FROM user_attribute ua
  WHERE ua.name = 'favorite_movie'
)
SELECT u.email, rm.value
FROM users u
LEFT JOIN remote_movies rm ON u.id = rm.user_id;
```

Now the FDW issues one query to fetch all relevant attributes, and the join is done locally in one pass.

:::

### Cross‑server joins without materialization

::: tabs

@tab:active Anti‑pattern

```sql
SELECT *
FROM remote_db1.orders o
JOIN remote_db2.customers c ON o.customer_id = c.id;
```

This is not pushable because the two tables are on different foreign servers. Postgres will fetch orders and customers separately and join them locally. If orders have 1 million rows and customers have 50,000 rows, you will transfer 1.05 million rows.

@tab Better

Replicate or materialize one side on the other server (or locally) before joining. For example, create a materialized view m_customers on remote_db1 containing just the id and name of the customers you need, then join orders and m_customers on the same server. Alternatively, copy customers into a temporary table on the local server and join there.

:::

### Complex expressions on join keys

::: tabs

@tab:active Anti‑pattern

```sql
SELECT *
FROM remote_table a
JOIN remote_table b ON CAST(a.key AS text) = b.key_text;
```

Casting a numeric key to text prevents pushdown. The remote server cannot use indexes and must return both tables. The local server performs the join and cast.

@tab Better

Align your schemas so that the join columns use the same type. If you cannot change the schema, create a computed column on the remote server with the appropriate type and use it in the join.

:::

### Ignoring collation and type mismatches

::: tabs

@tab:active Anti‑pattern

```sql
SELECT *
FROM remote_table
WHERE citext_col = 'abc';
```

If the remote server doesn’t have the citext extension installed, the comparison semantics will differ, and the FDW will refuse to ship the filter. This appears harmless until you see the plan and realize all rows were fetched.

@tab Better

Install the same extensions and collations on the remote server, or convert the column to a base type like text on both sides.

:::

---

## Extending Tuning: Calibrating Cost Models

Earlier, we discussed `fetch_size`, `use_remote_estimate`, and the cost knobs. This section expands on how to use them strategically.

### Balancing fetch size and memory

`fetch_size` controls how many rows the FDW asks for in each round trip [^9]. Think of it as the batch size. The default (100) works well for small result sets. If you expect to retrieve tens of thousands of rows, a higher fetch size reduces the overhead of many network requests. But there are trade‑offs:

- **Memory consumption:** Each foreign scan buffers rows until they are consumed. A huge fetch size (for example, 10,000) may allocate more memory than you expect, especially when multiple scans run concurrently. Monitor memory usage as you increase this setting.
- **Latency hiding:** If network latency is high, overlapping network requests with local processing can hide some latency. But `postgres_fdw` does not pipeline multiple fetches – it waits for one batch before requesting the next. This means that a larger batch size reduces the number of waits, but cannot overlap them. If you operate across data centers, consider using a connection pooler or caching layer instead of just increasing fetch_size.

### Remote estimates vs. local estimates

The planner uses statistics to estimate how many rows each node will produce, which in turn influences join order. When `use_remote_estimate` is false (the default), the planner guesses based on local stats collected by `ANALYZE` on the foreign table. This can be wrong if the remote table has a different distribution than the local sample, or if the table has changed since the last `ANALYZE`.

Setting `use_remote_estimate` to true instructs the FDW to run `EXPLAIN` on the remote server during planning to obtain row counts and cost estimates [^3]. This can improve join ordering, especially when joining multiple foreign tables or mixing local and foreign tables. The downside is increased planning time because each remote estimate runs an extra query.

::: tip In practice:

- Enable `use_remote_estimate` on queries with complex joins where the planner picks obviously wrong join orders. If enabling it improves the plan, consider leaving it on for that server or table.
- Use `ANALYZE` on foreign tables periodically if your remote data is relatively static. This populates local stats and can avoid the overhead of remote estimates.
- Don’t enable `use_remote_estimate` indiscriminately on simple lookups. The cost of additional round-trip remote flights may outweigh the benefit.

:::

### Tuning cost parameters

`fdw_startup_cost` and `fdw_tuple_cost` control how much the planner thinks it costs to start a foreign scan and fetch each row [^3]. If these are too low, the planner may choose a nested loop that generates many small remote calls. If they are too high, the planner might avoid remote scans even when they are efficient.

You can adjust these parameters based on empirical measurement:

- Increase `fdw_startup_cost` to discourage the planner from using nested loops that call the remote table repeatedly. You might set it to the average cost of a round-trip remote.
- Increase `fdw_tuple_cost` if network bandwidth is limited or expensive. This indicates to the planner that each remote row incurs higher fetch costs than a local row. The planner will prefer plans that filter early on the remote side.

Always adjust these settings gradually and observe the effect on the plan. Keep separate settings per foreign server if network conditions differ.

### When to analyze foreign tables

Running `ANALYZE` on a foreign table collects sample statistics by pulling a subset of rows from the remote server. This helps the planner estimate row counts when `use_remote_estimate` is off. It also helps decide whether to use an index on the remote side. You should analyze foreign tables when:

- The remote table is large and static, and you want accurate local estimates without the overhead of remote estimates.
- You have just defined a foreign table, and the default stats are empty.
- You changed the extensions allow‑list to enable more pushdown and want the planner to see the effect.

Conversely, if the remote data changes constantly, `ANALYZE` results will quickly become stale. In that case, rely on use_remote_estimate instead.

---

## Further Case Studies and Practical Examples

The Keycloak coverage example is not the only place where pushdown matters. The following scenarios illustrate other patterns you may encounter.

### Reporting on a sharded logging system

Imagine you store application logs across multiple shards, each a separate Postgres database. You want to produce a report of the number of error logs per service per day.

A naïve approach might join all shards in one query:

```sql
SELECT shard, service, date_trunc('day', log_time) AS day, COUNT(*)
FROM shard1.logs
UNION ALL
SELECT shard, service, date_trunc('day', log_time) AS day, COUNT(*)
FROM shard2.logs
...;
```

This approach will fetch all log rows to the local server and aggregate them locally. A better solution is to push the grouping to each shard:

```sql
SELECT shard, service, day, sum(count)
FROM (
  SELECT 1 AS shard, service, date_trunc('day', log_time) AS day, COUNT(*) AS count
  FROM shard1.logs
  WHERE log_time >= $1 AND log_time < $2
  GROUP BY service, day
  UNION ALL
  SELECT 2 AS shard, service, date_trunc('day', log_time) AS day, COUNT(*)
  FROM shard2.logs
  WHERE log_time >= $1 AND log_time < $2
  GROUP BY service, day
  ...
) x
GROUP BY shard, service, day;
```

Here, each foreign server returns a small set of aggregated rows instead of raw logs. The outer aggregation sums across shards. This pattern generalizes: push grouping and filtering to the remote side, then combine locally.

### Combining remote and local data for analytics

Suppose you have a local table `users` and a remote table `orders`. You want to compute the average order amount per user segment. A naïve query might look like:

```sql
SELECT u.segment, AVG(o.amount)
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.segment;
```

This is a local join driving a remote nested loop. The better approach is to aggregate orders remotely by user_id and join on the small result:

```sql
WITH remote_totals AS (
  SELECT user_id, SUM(amount) AS total, COUNT(*) AS n
  FROM orders
  GROUP BY user_id
)
SELECT u.segment, AVG(rt.total / rt.n)
FROM users u
JOIN remote_totals rt ON u.id = rt.user_id
GROUP BY u.segment;
```

This pushes the heavy aggregation to the remote and transfers only one row per user. The local join then groups by segment. As with other examples, the key is to reduce remote rows before they cross the network.

### Avoiding pushdown for correctness

There are legitimate cases where you should *prevent* pushdown because of semantic differences. Postgres allows you to do this by adding `OFFSET 0` or wrapping the foreign table in a CTE.

For example, if a built‑in function behaves differently on the remote due to a version mismatch, you can force local evaluation:

```sql
WITH local_eval AS (SELECT  FROM remote_table)  -- CTE prevents pushdown
SELECT 
FROM local_eval
WHERE some_complex_expression(local_eval.col) > 0;
```

Alternatively, a `WHERE` clause like `random() < 0.1` will not push down because `random()` is volatile – you don't need to force it. But adding `OFFSET 0` is a simple hack that prevents any pushdown:

```sql
SELECT * FROM remote_table OFFSET 0;
```

Knowing how to disable pushdown intentionally helps you debug. If a query returns different results when pushdown occurs, suspect type/collation mismatches or remote session settings [^4].

---

## Monitoring, Diagnostics, and Regression Testing

Monitoring doesn't end at counting remote rows. To make pushdown reliable in production, you need to set up mechanisms to detect regressions and gather evidence when performance changes.

### Automate EXPLAIN regression tests

In addition to unit tests and integration tests, you can add tests that assert the shape of your plans. For instance, if a mission‑critical report must always push down a `WHERE` clause, you can write a test that runs `EXPLAIN (VERBOSE)` and checks that the Remote SQL contains the filter. You might even parse loops and assert that it is 1. When a developer inadvertently adds a non‑immutable function or changes a join, the test will fail. This is akin to snapshot testing for SQL.

### Monitor pg_stat_statements across servers

Enable `pg_stat_statements` on both the local and remote servers. On the local side, track the total time, planning time, and rows for each FDW query. On the remote side, track which queries are being executed.

Look for outliers: a query whose remote calls spike or whose average remote rows jump from hundreds to thousands. Those are early signs of pushdown failure.

### Log remote SQL with auto_explain

Setting `auto_explain.log_min_duration_statement` (for example, to 500ms) causes Postgres to automatically log slow queries with their plans. Combine this with `auto_explain.log_verbose = true` and `auto_explain.log_nested_statements = true` to capture remote SQL as well. When a federated query slows down, the log will show you exactly what remote SQL was executed and how often. This is invaluable in production, where you cannot always run EXPLAIN interactively.

### Use connection pooling and prepare statements

`postgres_fdw` maintains a connection pool keyed on the user mapping. It reuses connections between queries, but you can also use connection pooling at the network level (for example, pgbouncer or pgcat).

Keeping connections warm reduces the startup cost, as captured by `fdw_startup_cost`. Meanwhile, preparing statements on the remote server (via `PREPARE` and `EXECUTE`) can save parse time when the same remote SQL is executed frequently. `postgres_fdw` can use server‑side prepared statements for parameterized scans.

### Regression testing after version upgrades

Every major Postgres release brings improvements to postgres_fdw pushdown semantics. But new releases also change planner heuristics and remote SQL generation. After an upgrade, rerun your key queries with EXPLAIN (VERBOSE), compare the Remote SQL, and benchmark them.

In some cases, a release may push down something previously local, revealing a latent type mismatch or a function difference. In other cases, pushdown may be withheld due to a new rule. Don’t assume that an upgrade automatically improves performance – test it.

---

## Extended Guidelines for Advanced DBAs

To close this handbook, here are consolidated guidelines distilled from the previous sections. They go beyond simple bullet points to capture nuances. Keep them handy for reference or print them out for your team.

1. **Respect the FDW safety model.** Immutable functions and built‑in operators are your friends. Anything outside that scope must be explicitly allowed or evaluated locally. Understand which items belong to each category and plan accordingly.
2. **Always read the Remote SQL.** Don’t trust your intuition about what is being pushed down. The Remote SQL string is the only source of truth. It indicates whether a predicate, join, sort, or limit operation is occurring remotely. It also shows parameter placeholders (for example, $1) that correspond to values passed from the local plan.
3. **Reduce before you fetch.** The network is the highest cost. If the remote can reduce rows through filtering, grouping, or limiting, let it. If it cannot, structure your query to enable it. Avoid queries that require pulling large raw tables and processing them locally.
4. **Beware of join order.** The planner sometimes chooses a nested loop with a foreign table as the inner side, resulting in repeated remote calls. Examine loops: if you see a high number, consider rewriting the query or adjusting cost parameters.
5. **Use CTEs strategically.** A CTE can isolate remote scans and let you control whether they are materialized once or inlined. Use `MATERIALIZED` to avoid repeated remote scans when a CTE is referenced multiple times. Use `NOT MATERIALIZED` to allow optimizations across CTE boundaries.
6. **Instrument, monitor, iterate.** Good FDW performance is not a one‑off fix. Monitor queries and plans. Use tests to catch regressions. Adjust tuning knobs and indexes as your data or workload changes. Document your reasoning so others can understand why a particular plan is expected.
7. **Educate your team.** Federated queries invite subtle bugs and performance traps. Share the high‑level rules – immutable functions only, cross‑server joins are local, always check remote SQL – so engineers write safer queries by default. A 30‑minute training can save hours of debugging later.

---

## Bringing it All Together

This handbook has covered a lot of ground: from the high‑level principle that pushdown is about data movement, to the nitty‑gritty of join conditions and tuning knobs, to troubleshooting steps and case studies. It is intentionally opinionated and personal: these are the patterns and pitfalls encountered in real systems, not abstract guidelines. By sharing specific examples, I hoped to make the rules memorable and show how they interplay with actual workloads.

The goal is not just to tell you what to do, but to show you how to think and problem solve: review the plan, trace data movement, and determine whether the query is doing the heavy work in the right place.

That thinking process, practiced enough times, becomes second nature. When you write a new query, you'll automatically consider whether your predicates are immutable, whether the join can be shipped, and whether you are about to trigger an N+1 pattern. When you review plans, you'll start from the Foreign Scan nodes and remote SQL, not the top‑level node. When you tune, you'll know which knobs to twist and in which order.

Keep experimenting. Use the examples here as starting points. Try different structures in a test environment and measure the difference. The more you play with pushdown, the more comfortable you'll become with its constraints and superpowers.

If this handbook helps you avoid one performance incident or saves you from shipping a broken query, it has done its job. Enjoy exploring the federated world of Postgres.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Elevate Your Database Game: Supercharging Query Performance with Postgres FDW",
  "desc": "Foreign data wrappers (FDWs) make remote Postgres tables feel local. That convenience is exactly why FDW performance surprises are so common. A query that looks like a normal join can execute like a distributed system: rows move across the network, r...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/fdw-pushdown.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
