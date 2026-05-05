---
lang: en-US
title: "How to Query Data in DynamoDB Using .Net"
description: "Article(s) > How to Query Data in DynamoDB Using .Net"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - DevOps
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c#
  - cs
  - csharp
  - dotnet
  - devops
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Query Data in DynamoDB Using .Net"
    - property: og:description
      content: "How to Query Data in DynamoDB Using .Net"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-query-data-in-dynamodb-using-net.html
prev: /programming/cs/articles/README.md
date: 2026-05-06
isOriginal: false
author:
  - name: Grant Riordan
    url: https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/uploads/covers/66b52b176a1b17f6b28d9822/93c4db14-f870-47d6-99c9-e0816d8b628b.jpg
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
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Query Data in DynamoDB Using .Net"
  desc="If you're coming to DynamoDB from a relational background, the first thing to understand is this: it's a completely different way of thinking. DynamoDB isn't a relational database, it's a NoSQL key-va"
  url="https://freecodecamp.org/news/how-to-query-data-in-dynamodb-using-net"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/66b52b176a1b17f6b28d9822/93c4db14-f870-47d6-99c9-e0816d8b628b.jpg"/>

If you're coming to DynamoDB from a relational background, the first thing to understand is this: it's a completely different way of thinking.

DynamoDB isn't a relational database, it's a NoSQL key-value and document store. You don't write arbitrary queries against your data. Instead, you design your tables around the specific access patterns your application needs.

DynamoDB is driven by your queries, not your data.

There's no need for joins or heavy normalisation. To get the performance DynamoDB is built for, model your data so it can be retrieved efficiently using keys – partition keys and sort keys – rather than relying on table scans or complex query logic.

If you try to use DynamoDB like SQL, it will fight you — and you will lose.

::: note Prerequisites

There are a few things you'll need and some general knowledge that you should have to follow along most effectively here:

**AWS**

- An active AWS account with permissions to create and modify DynamoDB
- Basic familiarity with the AWS Console (navigating services, not deep expertise)

**C# / .NET**

- Comfortable with C#
- Dependency injection
- NuGet package management — you'll need to install `AWSSDK.DynamoDBv2`

**Databases (Conceptual)**

- (Optional) A working understanding of relational databases / SQL is actually helpful here — the article explicitly addresses readers coming from that background and explains the mental shift required

**What you don't need**

- Prior DynamoDB experience — the article covers core concepts from scratch
- Deep AWS infrastructure knowledge — IAM, VPCs, and so on aren't covered

**Optional but useful**

- AWS CLI installed locally if you want to follow the AWS CLI examples directly
- Terraform experience if following the infrastructure-as-code example (Terraform section can be skipped without losing context)

:::

---

## Core DynamoDB Concepts

DynamoDB is built around a few core concepts that directly influence how you query and structure your data.

Remember: DynamoDB is driven by how you retrieve your data, not by the shape of the data itself.

### Partition Key

- Required for every query
- Required to create a table – each table must have a partition key
- Determines data distribution and how items are stored

Data in DynamoDB is physically distributed across partitions. The partition key decides where a given item lives, which is why it's critical for both performance and scalability.

You can think of a partition key like a filing cabinet drawer label: it tells DynamoDB which drawer to open so it can go straight to your data without searching every drawer.

Partition keys are typically strings or numbers.

### Sort Key (Optional)

Also known as the **Range Key**.

- Enables range queries (`between`, `begins_with`, and so on)

When you add a sort key, items with the same partition key are grouped together and ordered by the sort key. For string sort keys, ordering is lexicographical (dictionary order). For numeric sort keys, ordering is numeric (ascending).

This has an important effect when working with dates. If you store dates as strings in a non-ISO format (for example, `DD/MM/YYYY`), they won't sort in chronological order. For example, the resulting sorted items would look like this:

```plaintext
01/01/2026
01/02/2026
01/03/2026
08/01/2026
15/02/2026
```

Here, all dates starting with `01` are grouped together, even though they span different months. This breaks range queries and ordering.

To avoid this, use either:

- **ISO 8601 format** (`YYYY-MM-DD`), which sorts correctly as a string
- **Unix timestamps** (typically milliseconds since January 1st, 1970), which sort numerically and correctly

Both approaches ensure your data is ordered correctly and can be queried efficiently. This is commonly used for timestamps, versioning, or logical groupings (for example, `ORDER#2024-01`).

### Global Secondary Index (GSI)

A Global Secondary Index (GSI) allows you to query your data using a different partition key and optional sort key than your base table. This is how you support additional access patterns without redesigning your primary key schema.

For example, if your base table is keyed by `UserId`, but you also need to query by `OrderId`, a GSI makes that possible.

#### Projection Types

A GSI doesn't have to include all attributes from the base table. When configuring your GSI you can choose:

- **ALL** — all attributes are projected
- **KEYS_ONLY** — only index and primary keys
- **INCLUDE** — a subset of selected attributes

Choosing the right projection helps reduce storage and read costs. For example, for an orders view you could project only `orderNumber`, `dateOrdered`, and `cost` rather than all other attributes which aren't needed.

#### Important Considerations

**Additional cost:** GSIs consume their own read/write capacity and storage in addition to your base table's costs. Using `ProjectionType = INCLUDE` or `KEYS_ONLY` instead of `ALL` reduces the storage cost of the GSI since less data is duplicated into the index, which can offset the additional read/write cost.

**Eventual consistency:** In DynamoDB, when you write directly to the base table you have the option to perform a strongly consistent read immediately after — meaning you're guaranteed to get the latest data. GSIs don'r support this. GSI reads are always eventually consistent.

When a customer places an order, DynamoDB writes that order to your main Orders table. It then replicates that change to any GSIs asynchronously in the background. During that brief window (typically milliseconds), a query against a GSI may not return the newly written order yet.

A real-world example of where this can catch you out:

1. Customer places an order which is written to the Orders table
2. User is redirected to the "Your Orders" page
3. "Your Orders" page queries a GSI for all orders by this customer
4. New order doesn't appear yet — GSI replication is still in progress
5. Customer refreshes the page 50ms later
6. Order now appears

For most queries — browsing a product catalogue, viewing order history, filtering by status — this is completely acceptable and unnoticeable to the user. Where it matters is when your application writes a record and immediately queries a GSI for that same record. In this scenario you have a couple of options:

- Query the base table directly after a write using a strongly consistent read, rather than the GSI
- Pass the order data directly to the UI from the write response, without a follow-up query at all — the cleanest solution in most cases

**Write amplification:** Every write to the base table may also write to one or more GSIs. GSIs are powerful, but they're not free. Overusing them is often a sign that your primary access patterns weren't well defined upfront.

**Note:** DynamoDB allows a maximum of 20 GSIs per table by default, though this can be increased via an AWS service limit request.

---

## Synthetic Keys — The Old Way

Before we look at multi-attribute GSIs, it's worth understanding the pattern they replace — because you'll encounter it in existing DynamoDB codebases.

Imagine you want to query orders by both status and date — for example, all "pending" orders placed in the last 30 days. Previously, DynamoDB GSIs only supported a single attribute as the partition key and a single attribute as the sort key. To filter on multiple attributes you had to combine them into a single synthetic attribute:

```cs
[DynamoDBTable("Orders")]
public class OrderDto
{
    [DynamoDBHashKey("customerId")]
    public string CustomerId { get; set; }

    [DynamoDBRangeKey("createdAt")]
    public long CreatedAt { get; set; }

    [DynamoDBProperty("orderId")]
    public string OrderId { get; set; }

    [DynamoDBProperty("status")]
    public string Status { get; set; }

    // Synthetic key — manually constructed before saving
    [DynamoDBProperty("statusDate")]
    public string StatusDate { get; set; } // e.g. "PENDING#2025-11-01"
}
```

Constructing this value before saving the record:

```cs
order.StatusDate = $"{order.Status}#{order.CreatedAt:yyyy-MM-dd}";
```

Then create a GSI on `statusDate` as the partition key, allowing you to query:

```cs
var results = await _context.QueryAsync<OrderDto>(
    "PENDING#2025-11-01",
    config // IndexName = "statusDate-index"
).GetRemainingAsync();
```

This worked, but came with real downsides:

- **Brittle** — every developer writing to the table must know about and correctly format the synthetic key
- **Hard to query ranges** — filtering all pending orders across a date range required careful `begins_with` or `between` conditions on a concatenated string
- **Maintenance overhead** — if status values change, every existing record needs updating
- **Invisible in the schema** — a new developer has no idea what `statusDate` means without documentation
- **Backfilling** — adding a new synthetic-key GSI to an existing table meant updating every existing record to populate the new attribute via a script re-processing the existing items.

---

## Multi-Attribute GSIs — The New Way

On November 19, 2025, AWS [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>announced multi-attribute composite keys for GSIs](https://aws.amazon.com/about-aws/whats-new/2025/11/amazon-dynamodb-multi-attribute-composite-keys-global-secondary-indexes/). You can now define a GSI partition key or sort key comprised of up to **4 attributes each** — **8 attributes in total** across the partition and sort key combined.

A few important things to note:

- **GSIs only:** This applies to GSIs only — your base table primary key structure is unchanged, still a single partition key and an optional single sort key.
- **DynamoDB handles composition internally:** You don't concatenate values yourself. DynamoDB hashes the partition key attributes together for data distribution, and maintains hierarchical sort order across the sort key attributes.
- **Strict query rules still apply:** You must supply **all** partition key attributes with equality conditions when querying. Sort key attributes must be queried **left-to-right** in the order they were defined — you can't skip attributes.
- **No backfilling required.** When you add a multi-attribute GSI to an existing table, DynamoDB automatically indexes all existing items using their natural attributes.
- **No additional cost** beyond standard GSI pricing.

The model stays clean — no synthetic attributes needed:

```cs
[DynamoDBTable("Orders")]
public class OrderDto
{
    [DynamoDBHashKey("customerId")]
    public string CustomerId { get; set; }

    [DynamoDBRangeKey("createdAt")]
    public long CreatedAt { get; set; }

    [DynamoDBProperty("orderId")]
    public string OrderId { get; set; }

    [DynamoDBProperty("status")]
    public string Status { get; set; }

    [DynamoDBProperty("total")]
    public decimal Total { get; set; }
}
```

### Defining a Multi-Attribute GSI

You can create the GSI via the AWS Console (select the attributes you want in order), via Terraform (requires AWS provider v6.29.0+), or via the AWS CLI.

The key concept to understand: you provide **multiple** `HASH` **entries** for the composite partition key and **multiple** `RANGE` **entries** for the composite sort key, in the exact order they should be evaluated. DynamoDB treats them internally as one composite partition key and one composite sort key.

Here's an AWS CLI example — a GSI on Orders with a composite partition key (`customerId` + `status`) and a single-attribute sort key (`createdAt`):

```sh
aws dynamodb update-table \
--table-name Orders \
--attribute-definitions \
AttributeName=customerId,AttributeType=S \
AttributeName=status,AttributeType=S \
AttributeName=createdAt,AttributeType=N \
--global-secondary-index-updates \
"[{\"Create\":{
\"IndexName\":\"customerStatus-createdAt-index\",
\"KeySchema\":[
    {\"AttributeName\":\"customerId\",\"KeyType\":\"HASH\"},
    {\"AttributeName\":\"status\",\"KeyType\":\"HASH\"},
    {\"AttributeName\":\"createdAt\",\"KeyType\":\"RANGE\"}
],
\"Projection\":{\"ProjectionType\":\"ALL\"}
}}]"
```

The two `HASH` entries here are valid. They define a composite partition key of `(customerId, status)`. This is the syntax AWS introduced specifically for multi-attribute GSIs. It would have been rejected before November 2025. Here's a Terraform example (AWS provider v6.29.0+):

```hcl
global_secondary_index {
  name            = "customerStatus-createdAt-index"
  projection_type = "ALL"

  key_schema {
    attribute_name = "customerId"
    key_type       = "HASH"
  }

  key_schema {
    attribute_name = "status"
    key_type       = "HASH"
  }

  key_schema {
    attribute_name = "createdAt"
    key_type       = "RANGE"
  }
}
```

### Query Rules You Must Follow

The flexibility gain with multi-attribute GSIs is real, but the query constraints are not the same as SQL. Two rules matter most:

#### 1. Partition key attributes must all be supplied, with equality only.

For a partition key of `(customerId, status)`:

**Valid**:

```plaintext
customerId = 'C123' AND status = 'PENDING'
```

**Invalid** — missing `status`:

```plaintext
customerId = 'C123'
```

**Invalid** — inequality on a partition key attribute:

```plaintext
customerId = 'C123' AND status > 'P'
```

#### 2. Sort key attributes must be queried left-to-right, with inequality only as the final condition.

For a sort key of `(tournamentRound, rank, matchId)`:

**Valid**:

```plaintext
tournamentRound = 'SEMIFINALS'

tournamentRound = 'SEMIFINALS' AND rank = 'UPPER'

tournamentRound = 'SEMIFINALS' AND rank = 'UPPER' AND matchId = 'match-002'

tournamentRound = 'SEMIFINALS' AND rank = 'UPPER' AND matchId > 'match-001'

tournamentRound BETWEEN 'QUARTERFINALS' AND 'SEMIFINALS'
```

**Invalid** — skipping the first attribute:

```plaintext
rank = 'UPPER'
```

**Invalid** — leaving a gap (skipping `bracket`)

```plaintext
tournamentRound = 'SEMIFINALS' AND matchId = 'match-002'
```

**Invalid** — adding a condition after an inequality:

```plaintext
tournamentRound > 'QUARTERFINALS' AND rank = 'UPPER'
```

::: tip Design tip

Order your sort key attributes from most general to most specific (for example, `tournamentRound → rank → matchId`). This maximises query flexibility, since each left-to-right prefix becomes a valid query pattern.

:::

#### Going deeper

AWS publishes a detailed design pattern guide with worked examples for time-series data, e-commerce orders, hierarchical organisation data, and multi-tenant SaaS platforms. The examples use the JavaScript SDK, but the schema design principles apply regardless of language. The article can be found [<VPIcon icon="fa-brands fa-aws"/>here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.DesignPattern.MultiAttributeKeys.html).

---

## C# SDK Options

When working with DynamoDB in C#, the `AWSSDK.DynamoDBv2` NuGet package gives you three different ways to interact with your tables, each with different levels of abstraction.

### Low-Level Client

```cs
var client = new AmazonDynamoDBClient();
```

The `AmazonDynamoDBClient` gives you full control over every aspect of your DynamoDB interactions. You construct requests manually, specifying every attribute, condition, and configuration explicitly.

```cs
var request = new QueryRequest
{
    TableName = "Orders",
    KeyConditionExpression = "customerId = :customerId",
    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
    {
        { ":customerId", new AttributeValue { S = "customer-123" } }
    }
};

var response = await client.QueryAsync(request);
```

This is the most verbose approach, but nothing is hidden from you. You can see exactly what's being sent to DynamoDB, which makes it easier to debug, optimise, and understand exactly what Read Capacity Units (RCUs) you're consuming. It's also the most flexible — anything DynamoDB supports, you can do here.

::: tip When to use it

When you need fine-grained control, are doing something complex, or want full visibility into your queries.

:::

### Document Model

```cs
var client = new AmazonDynamoDBClient();
var table = Table.LoadTable(client, "Orders");
```

The Document Model sits a level above the low-level client. Rather than working with raw `AttributeValue` types, you work with `Document` objects which feel more like JSON — familiar to most .NET developers.

```cs
var filter = new QueryFilter("customerId", QueryOperator.Equal, "customer-123");
var search = table.Query(filter);
var documents = await search.GetRemainingAsync();

// access the data
foreach (var doc in documents)
{
    Console.WriteLine(doc["orderId"].AsString());
    Console.WriteLine(doc["total"].AsDecimal());
}
```

Less boilerplate than the low-level client, but you're still working with loosely typed `Document` objects rather than your own C# classes. There's no mapping to strongly typed models out of the box.

::: tip When to use it

Useful for dynamic or loosely structured data where you don't want to define a fixed model, or for quick tooling and scripts.

:::

### Object Persistence Model

The Object Persistence Model is the highest level of abstraction and the most natural fit for typical .NET development.

You decorate your C# classes with attributes, and the `DynamoDBContext` handles serialisation and deserialisation automatically — similar to an ORM like Entity Framework.

```cs
[DynamoDBTable("Orders")]
public class OrderRecord
{
    [DynamoDBHashKey("customerId")]
    public string CustomerId { get; set; }

    [DynamoDBRangeKey("createdAt")]
    public long CreatedAt { get; set; }

    [DynamoDBProperty("orderId")]
    public string OrderId { get; set; }

    [DynamoDBProperty("total")]
    public decimal Total { get; set; }

    [DynamoDBProperty("status")]
    public string Status { get; set; }
}
```

Querying feels clean and strongly typed:

```cs
var orders = await dbContext
    .QueryAsync<OrderRecord>("customer-123")
    .GetRemainingAsync();
```

The trade-off is that the abstraction hides some important details: you don't always see exactly what's being sent to DynamoDB under the hood, which can make debugging and performance optimisation harder.

### Setting Up the Context

When creating the db context there are a couple of options:

#### Option 1 — using Dependency Injection:

```cs
// Program.cs
builder.Services.AddSingleton<IAmazonDynamoDB, AmazonDynamoDBClient>();

builder.Services.AddSingleton<IDynamoDBContext>(sp =>
{
    var client = sp.GetRequiredService<IAmazonDynamoDB>();
    return new DynamoDBContext(client);
});

// Then in repository / service, inject IDynamoDBContext
public class OrderRepository
{
    private readonly IDynamoDBContext _context;

    public OrderRepository(IDynamoDBContext context)
    {
        _context = context;
    }
}
```

#### Option 2 — register `AmazonDynamoDBClient` only, and instantiate the context per operation:

```cs
// Program.cs
builder.Services.AddSingleton<IAmazonDynamoDB, AmazonDynamoDBClient>();
```

Then:

```cs
public class OrderRepository
{
    private readonly IAmazonDynamoDB _client;

    public OrderRepository(IAmazonDynamoDB client)
    {
        _client = client;
    }

    public async Task<List<OrderDto>> GetOrdersAsync(string customerId)
    {
        var context = new DynamoDBContext(_client); // lightweight to instantiate
        return await context.QueryAsync<OrderDto>(customerId).GetRemainingAsync();
    }
}
```

::: note Which is better?

Option 1 is cleaner and more testable — you can mock `IDynamoDBContext` in unit tests easily. Option 2 is also valid since `DynamoDBContext` is lightweight to instantiate, but you lose the ability to mock it cleanly.

:::

::: tip When to use Object Persistence

the recommended approach for most .NET applications. Clean, strongly typed, and fits naturally into existing C# codebases.

:::

---

## Querying a Multi-Attribute GSI From C#

At the time of writing, the `DynamoDBContext.QueryAsync<T>` convenience overloads don't support multi-attribute GSI key conditions directly — you need to use the low-level client (`IAmazonDynamoDB`) and pass a `KeyConditionExpression`. The good news is the deserialisation back to your typed model is still straightforward.

Here's a query against a GSI with a composite partition key of `(customerId, status)` and a sort key of `createdAt`, returning all pending orders for a customer since a given date:

```cs
public async Task<List<OrderDto>> GetOrdersByStatusSinceAsync(
    string customerId,
    string status,
    long fromDate)
{
    var request = new QueryRequest
    {
        TableName = "Orders",
        IndexName = "customerStatus-createdAt-index",
        KeyConditionExpression =
            "customerId = :customerId " +
            "AND #status = :status " +           // #status because 'status' is a reserved word
            "AND createdAt > :fromDate",
        ExpressionAttributeNames = new Dictionary<string, string>
        {
            { "#status", "status" }
        },
        ExpressionAttributeValues = new Dictionary<string, AttributeValue>
        {
            { ":customerId", new AttributeValue { S = customerId } },
            { ":status",     new AttributeValue { S = status } },
            { ":fromDate",   new AttributeValue { N = fromDate.ToString() } }
        },
        ScanIndexForward = false // reverse sort key order — newest first, since sort key is a timestamp
    };

    var response = await _client.QueryAsync(request);

    // manually deserialise back to OrderDto using the DynamoDBContext
    return _context.FromDocuments<OrderDto>(
        response.Items.Select(Document.FromAttributeMap)
    ).ToList();
}
```

::: info Looking at the code above, notice that:

- Both partition key attributes (`customerId` and `status`) are supplied with equality — this is required.
- The sort key (`createdAt`) uses an inequality `>` (greater than) as the final condition, which is allowed.
- No synthetic string construction, no brittle formatting conventions, no backfilling existing records.

:::

If you're working on an existing codebase that uses synthetic keys, it's worth evaluating whether migrating to multi-attribute GSIs makes sense. The backfilling problem that made migrations painful before is gone, DynamoDb multi-attribute GSIs handle it automatically.

---

## Query vs Scan

This is one of the most important concepts to understand when working with DynamoDB — and one of the most common sources of performance and cost problems.

### Query

A `Query` retrieves items using the partition key, and optionally narrows results using the sort key. DynamoDB knows exactly which partition to look in, reads only the relevant items, and returns them efficiently.

```cs
// Get all orders for a customer
var orders = await _context
    .QueryAsync<OrderDto>("customer-123")
    .GetRemainingAsync();
```

You can narrow further using a sort key condition — for example, all orders placed in the last 30 days:

```cs
var thirtyDaysAgo = DateTimeOffset.UtcNow.AddDays(-30).ToUnixTimeMilliseconds();

var orders = await _context.QueryAsync<OrderDto>(
    "customer-123",
    QueryOperator.GreaterThan,
    new List<object> { thirtyDaysAgo }
).GetRemainingAsync();
```

Queries are fast and cheap — you only pay RCUs for the records actually read.

### Scan

A `Scan` reads every single item in the table, then filters the results. It doesn't use keys or indexes — it brute-forces through everything.

```cs
var conditions = new List<ScanCondition>
{
    new ScanCondition("status", ScanOperator.Equal, "pending")
};

var orders = await _context
    .ScanAsync<OrderDto>(conditions)
    .GetRemainingAsync();
```

This works — but on a table with 10 million orders, DynamoDB reads all 10 million records and then filters down to the pending ones. You pay RCUs for every single record read, not just the ones returned.

::: important

Scans should be avoided in production for large tables. They're slow, expensive, and get worse as your table grows.

The difference visualised:

```plaintext
Query:
Table [■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■]
       └── Jump straight to partition "customer-123"
               └── Read only these items — cheap

Scan:
Table [■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■]
       └── Read every single item — expensive
               └── Then discard non-matching items
```

:::

### When Is A Scan Acceptable?

Scans aren't always wrong — there are legitimate use cases:

- **Small tables** — a lookup table with 50 items, a scan is perfectly fine
- **One-off data migrations or admin scripts** — not user-facing, run occasionally
- **Development and debugging** — scanning locally or against a small dataset

::: important Rule of thumb

if it's a user-facing query on a growing table, it should be a Query, not a Scan.

Coming from SQL, developers often reach for a Scan because it feels like:

```sql
SELECT * FROM orders WHERE status = 'pending'
```

In SQL with a good index, that's fine. In DynamoDB, without a GSI on `status`, that's a full table scan every time. The solution is to design a GSI for the access patterns you need — exactly what we covered in the GSI section earlier.

:::

---

## Filter Expressions

Both Query and Scan support an optional `FilterExpression` — a condition applied *after* DynamoDB has read the records but *before* they're returned to you. It looks superficially like a SQL `WHERE` clause, and that's exactly the trap.

```cs
var request = new QueryRequest
{
    TableName = "Orders",
    KeyConditionExpression = "customerId = :customerId",
    FilterExpression = "#status = :status",
    ExpressionAttributeNames = new Dictionary<string, string>
    {
        { "#status", "status" }
    },
    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
    {
        { ":customerId", new AttributeValue { S = "customer-123" } },
        { ":status",     new AttributeValue { S = "pending" } }
    }
};
```

The critical thing to understand: `FilterExpression` does **not** reduce the cost of the query. DynamoDB still reads every record first, charges you RCUs for all of them, and only then discards the ones that don't match the filter.

For a Query, that means every record matched by the `KeyConditionExpression`. For a Scan, that means every record in the table.

It's a convenience for trimming the *response payload*, not a tool for efficient querying. If you find yourself reaching for `FilterExpression` to support a real access pattern, that's a signal you need a GSI instead.

---

## Paging Results and User Interfaces

Pagination is one of the most misunderstood aspects of DynamoDB, especially if you're coming from a SQL background.

In SQL you might write:

```sql
SELECT * FROM orders LIMIT 10 OFFSET 20
```

DynamoDB doesn't work like this. There is no concept of `OFFSET` or page numbers. Instead, DynamoDB uses cursor-based pagination via a `LastEvaluatedKey`.

### How It Works In DynamoDB

DynamoDB returns a maximum of 1MB of data per request. If your results exceed 1MB, DynamoDB returns a `LastEvaluatedKey` — a pointer to where it stopped reading. Pass this back in to the next request to continue from that position. When no `LastEvaluatedKey` is returned, you've reached the end of the data.

### How This Works In The DynamoDB C# SDK

The SDK's `GetRemainingAsync()` method handles pagination automatically, it keeps making requests until there is no `LastEvaluatedKey` left, returning everything as a single list:

```cs
// Handles all pages automatically — but loads everything into memory
var orders = await _context
    .QueryAsync<OrderDto>("customer-123")
    .GetRemainingAsync();
```

This is convenient but dangerous on large datasets. If a customer has 50,000 orders, you're loading all 50,000 into memory in one go.

### Manual Pagination — The Right Approach For UIs

For a UI with "load more" or "next/previous" navigation, control pagination manually using `GetNextSetAsync()`:

```cs
// ---- Paging Model ----
public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public string? PaginationToken { get; set; }
}

// ---- Repository Method ----
public async Task<PagedResult<OrderDto>> GetOrdersPageAsync(
    string customerId,
    string? paginationToken = null)
{
    var config = new DynamoDBOperationConfig
    {
        BackwardQuery = true // reverse sort key order — newest first if sort key is a timestamp
    };

    var search = _context.QueryAsync<OrderDto>(customerId, config);

    if (paginationToken != null)
        search.PaginationToken = paginationToken;

    var items = await search.GetNextSetAsync(25); // fetch exactly 25 records

    return new PagedResult<OrderDto>
    {
        Items = items,
        PaginationToken = search.PaginationToken // null if no more pages
    };
}
```

The `PaginationToken` is the SDK's serialised representation of the `LastEvaluatedKey` — pass it directly to the client as a string and receive it back on the next request.

### What About "go to to page 7" Navigation?

This isn't possible in DynamoDB. The `LastEvaluatedKey` is a position cursor, to reach page 7 you'd have to paginate through pages 1 to 6 first to obtain the correct cursor placement.

For most modern UIs this isn't a problem. Infinite scroll and "load more" patterns map naturally to cursor-based pagination.

### The `FilterExpression` Trap

We've already seen that `FilterExpression` is a poor substitute for a well-designed GSI. Pagination is where it goes from "wasteful" to actively broken.

DynamoDB's pagination works in two stages when a `FilterExpression` is involved:

1. Read records until the 1MB limit is reached
2. Apply the `FilterExpression`, discarding non-matching records

The `LastEvaluatedKey` is generated **after step 1 — before filtering**. So DynamoDB can return a `LastEvaluatedKey` implying there are more results, even if the filtered page returned only a handful of records.

With 1,000 orders where only 50 are "pending":

```plaintext
Page 1: Read 200 records → filter applied → 3 "pending" returned + LastEvaluatedKey

Page 2: Read 200 records → filter applied → 1 "pending" returned + LastEvaluatedKey

Page 3: Read 200 records → filter applied → 0 "pending" returned + LastEvaluatedKey

...and so on until all 1,000 records are read
```

::: important

You pay RCUs for every record **read**, NOT every record **returned**.

:::

The `Limit` parameter doesn't rescue you here. `GetNextSetAsync(25)` caps the records *read* before filtering, not the records *returned*. You can read 25, filter down to 3, and still get a `LastEvaluatedKey` back, meaning your "page size of 25" actually returns somewhere between 0 and 25 results, unpredictably.

The real fix isn't a smarter pagination strategy, it's removing the `FilterExpression` entirely. Design a GSI keyed on the attribute you're filtering by (here, `status`, or a multi-attribute GSI with `status` in the partition key). DynamoDB then reads only the matching records directly, `Limit` caps what you actually want, and pagination behaves predictably.

---

## Final Thoughts & Conclusion

DynamoDB rewards you for designing around your access patterns up front, and punishes you for pretending it's SQL. The two biggest shifts from a relational mindset are:

1. **Queries are the schema.** You model tables, keys, and GSIs around the queries you need to run. You don't normalise and figure out queries later.
2. **Keys do the work.** The Query operation is fast and cheap precisely because it uses the partition key to jump straight to the right data. Scans read everything, and they get worse as your data grows.

The November 2025 multi-attribute GSI release is a genuinely welcome change, and is a huge improvement to the AWS resource. It removes one of the most painful ergonomic issues with DynamoDB, synthetic key construction and backfilling, without loosening the constraints that make DynamoDB fast.

The query rules (all partition-key attributes supplied, sort-key attributes queried left-to-right) stay exactly the same. What you gain is cleaner, typed, natural data models and the ability to add new access patterns to existing tables without a data migration.

For new projects, my recommendation is to use multi-attribute GSIs by default. For existing codebases built on synthetic keys, evaluate whether a migration makes sense, the painful part of such migrations is now gone.

As always if you want to discuss this further, or hear about my other articles drop me a follow on ['X' (<VPIcon icon="fa-brands fa-x-twitter"/>`grantdotdev`)](https://x.com/grantdotdev).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Query Data in DynamoDB Using .Net",
  "desc": "If you're coming to DynamoDB from a relational background, the first thing to understand is this: it's a completely different way of thinking. DynamoDB isn't a relational database, it's a NoSQL key-va",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-query-data-in-dynamodb-using-net.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
