---
lang: en-US
title: "How to Work With Dapper in .Net"
description: "Article(s) > How to Work With Dapper in .Net"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c#
  - cs
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Work With Dapper in .Net"
    - property: og:description
      content: "How to Work With Dapper in .Net"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-dapper-in-net.html
prev: /programming/cs/articles/README.md
date: 2026-03-26
isOriginal: false
author:
  - name: Grant Riordan
    url: https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/uploads/covers/66b52b176a1b17f6b28d9822/d091bd67-ef80-4cae-ad84-3dc5b79ca73b.jpg
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
  name="How to Work With Dapper in .Net"
  desc="When you're working with .NET, interacting with databases (particularly SQL databases) is inevitable. Common approaches involve using ORM (Object Relational Mapping) with tools like Entity Framework. "
  url="https://freecodecamp.org/news/how-to-work-with-dapper-in-net"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/66b52b176a1b17f6b28d9822/d091bd67-ef80-4cae-ad84-3dc5b79ca73b.jpg"/>

When you're working with .NET, interacting with databases (particularly SQL databases) is inevitable. Common approaches involve using ORM (Object Relational Mapping) with tools like Entity Framework.

Dapper stands out as a lightweight and high-performance ORM tool with numerous advantages. But where Dapper really excels is in its speed and control. Here, we'll explore Dapper's suitability for performance-critical .NET projects with simpler database relationships utilising raw SQL queries.

The article guides you in building a lightweight .NET Web API for a social media application with Dapper using a Postgres database.

::: note Prerequisites

- Latest .Net SDK and runtime (at time of writing, it's .Net 10).
- Knowledge of the C# programming language and how Dependency Injection works
- A running PostgreSQL instance
- DB Viewer software, for example DBeaver, pgAdmin, or the PostgreSQL extension for VS Code

:::

---

## What Is Dapper?

Dapper is a "micro ORM", providing lightweight, high-performance data access with minimal abstraction. It relies on SQL queries (these are the queries you use when interacting with an SQL database) for example:

`SELECT * FROM influencers WHERE ID = 1`, mapping the results to objects directly.

Here's how Dapper's README describes what it does:

> This [Dapper] provides a simple and efficient API for invoking SQL, with support for both synchronous and asynchronous data access, and allows both buffered and non-buffered queries. – Dapper github repository README

An ORM (Object-Relational Mapper) is like a translator between a programming language and a database, allowing software to interact with databases using familiar programming objects (instead of direct SQL queries), making it easier to manage and manipulate data in applications.

As Dapper is a "Micro-ORM", it acts a middle-ground between direct SQL and a full fledged ORM like that of the Entity Framework (EF) which you may have heard of before. It has a lot of the basic features, but doesn't come with all the "bloat," making it a secure and faster database tool.

---

## Challenges and Advantages of Dapper

### Challenges of Dapper

| **Challenge** | **Description** |
| --- | --- |
| No Built-in LINQ Support | Dapper lacks native LINQ integration, forcing developers to write raw SQL instead of using expressive LINQ queries for data filtering and projections. This can slow development for teams accustomed to LINQ in ORMs like EF Core. |
| Limited Conventions | With fewer defaults and automations, Dapper requires explicit mappings and configurations for schemas or parameters, leading to more setup code compared to convention-heavy ORMs. |
| Fewer Features for Complex Data Models | Handling intricate entity relationships (for example, deep hierarchies or many-to-many joins) demands custom SQL and manual mapping, increasing complexity in apps with rich relational data. |
| No Lazy Loading | Related entities aren't loaded on-demand – everything must be eagerly fetched via multi-mapping or separate queries, potentially causing performance issues or extra code for deferred loading. |
| Manual SQL Writing | Developers must craft all queries by hand, which can introduce errors, SQL injection risks (if parameters are mishandled), and more boilerplate, making maintenance tougher than auto-generated queries in full ORMs. |
| No Change Tracking | Dapper doesn't monitor object changes, so updates and deletes require manual SQL, which can complicate write operations and lead to inefficiencies in CRUD-heavy apps. |
| Lack of Database Migrations | No built-in tools for schema evolution or versioning, forcing reliance on external libraries or manual scripts – a stark contrast to EF Core's integrated migrations. |
| Connection Management Challenges | While Dapper uses ADO.NET connections, improper handling (for example, not disposing properly) can lead to pooling issues or leaks, especially in high-concurrency web apps. |

### Advantages of Dapper

But let’s not dwell on the negatives. Now let's concentrate on the advantages, as these far outweigh the challenges.

| Advantage | Description |
| --- | --- |
| Minimal Abstraction | As a micro-ORM, Dapper offers a thin wrapper over ADO.NET, giving developers direct access to SQL without heavy abstractions. This is ideal for those who want precise control over data access code and prefer working closer to the barebones. |
| Optimised for Read-Heavy Workloads | Dapper shines in applications with frequent reads, allowing custom SQL optimisations for queries like reporting or dashboards, resulting in faster data retrieval compared to feature-rich ORMs. |
| High Performance | Known for its lightweight design and low overhead, Dapper delivers extremely fast execution, especially with large datasets or high-throughput operations. It often outperforms Entity Framework in benchmarks for raw speed. |
| Full Control Over SQL Queries | Developers write explicit SQL, enabling fine-tuned queries for complex scenarios; while this requires manual management, it avoids the "black box" issues of auto-generated SQL in other ORMs. |
| Flexible Result Mapping | Dapper allows easy mapping of query results to custom objects or view models with custom logic, supporting features like multi-mapping for joins without rigid conventions. |
| Simplicity and Ease of Use | With a small API surface and quick setup, Dapper has a low learning curve, making it accessible for rapid prototyping or integrating into existing .NET projects without bloat. |
| Support for Multiple Result Sets | Using methods like QueryMultiple, Dapper efficiently handles queries returning several result sets in one call, reducing roundtrips to the database and boosting efficiency. |
| Built-in SQL Injection Protection | Automatic parameterisation secures queries against injection attacks, combining raw SQL flexibility with safety out of the box. |
| Broad Database Compatibility | Built on ADO.NET, Dapper works seamlessly with any database provider (for example, SQL Server, PostgreSQL), offering versatility without vendor lock-in. |

---

## Getting Started – Installation

You’re going to use the CLI (Command Line Interface) to install Dapper in your project. I've chosen this method, as it’s not only quicker, but will help build confidence with the CLI.

### Cloning the Repo:

In your terminal app, navigate to the folder where you want the repository to be located and run the following command to clone the public tutorial repository:

```sh
git clone https://github.com/grant-dot-dev/dapper_tutorial.git
```

You then need to add Dapper and the Postgres support to your project. You can do this with the following command:

```sh
cd FCC.DapperTutorial

# add Dapper nuget package
dotnet add package Dapper

# add Postgres driver
dotnet add package Npgsql
```

Update your `defaultConnection` connection string within <VPIcon icon="iconfont icon-json"/>`appsettings.json` with the location of your `Postgres` instance.

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=social_media;Username=postgres;Password=yourpassword"
}
```

### Create Seeding File

Create a folder in your project called **Infrastructure**. Then within this folder create a file called <VPIcon icon="iconfont icon-csharp"/>`DbUtilities.cs` and populate it with the following code:

```cs :collapsed-lines title="DbUtilities.cs"
using Dapper;
using Npgsql;
using Microsoft.Extensions.Configuration;

namespace DapperTutorial.Infrastructure;

public static class DBUtilities
{
    private const string CreateUserSql = @"
        CREATE TABLE IF NOT EXISTS ""User"" (
            UserId TEXT PRIMARY KEY,
            Username TEXT,
            FirstName TEXT,
            LastName TEXT,
            Avatar TEXT,
            Email TEXT,
            DOB DATE
        );";

    private const string CreatePostSql = @"
        CREATE TABLE IF NOT EXISTS Post (
            PostId TEXT PRIMARY KEY,
            Likes INTEGER,
            Content TEXT,
            Timestamp TIMESTAMP,
            UserId TEXT,
            FOREIGN KEY(UserId) REFERENCES ""User""(UserId)
        );";

    private const string InsertUsersSql = @"
        INSERT INTO ""User"" (UserId, Username, FirstName, LastName, Avatar, Email, DOB) VALUES
            ('1', 'iron_man', 'Tony', 'Stark', NULL, 'tony.stark@example.com', '1970-05-29'),
            ('2', 'batman', 'Bruce', 'Wayne', NULL, 'bruce.wayne@example.com', '1972-11-11'),
            ('3', 'spiderman', 'Peter', 'Parker', NULL, 'peter.parker@example.com', '1995-08-10'),
            ('4', 'wonderwoman', 'Diana', 'Prince', NULL, 'diana.prince@example.com', '1985-04-02'),
            ('5', 'superman', 'Clark', 'Kent', NULL, 'clark.kent@example.com', '1980-07-18'),
            ('6', 'black-widow', 'Natasha', 'Romanoff', NULL, 'natasha.romanoff@example.com', '1983-06-25'),
            ('7', 'deadpool', 'Wade', 'Wilson', NULL, 'wade.wilson@example.com', '1977-02-19'),
            ('8', 'green-lantern', 'Hal', 'Jordan', NULL, 'hal.jordan@example.com', '1988-09-05'),
            ('9', 'captain-america', 'Steve', 'Rogers', NULL, 'steve.rogers@example.com', '1920-07-04'),
            ('10', 'catwoman', 'Selina', 'Kyle', NULL, 'selina.kyle@example.com', '1982-12-08')
        ON CONFLICT (UserId) DO NOTHING;";

    private const string InsertPostsSql = @"
        INSERT INTO Post (PostId, Likes, Content, Timestamp, UserId) VALUES
            ('p1', 10, 'Hello, world!', '2025-10-12 10:00:00', '1'),
            ('p2', 5, 'My first post!', '2025-10-12 11:00:00', '2'),
            ('p3', 7, 'Excited to join!', '2025-10-12 12:00:00', '3'),
            ('p4', 3, 'What a great day!', '2025-10-12 13:00:00', '4'),
            ('p5', 15, 'Superhero meetup!', '2025-10-12 14:00:00', '5')
        ON CONFLICT (PostId) DO NOTHING;";

    public static async Task SeedDatabaseAsync(IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync();

        await using var transaction = await connection.BeginTransactionAsync();

        try
        {
            await connection.ExecuteAsync(CreateUserSql, transaction: transaction);
            await connection.ExecuteAsync(CreatePostSql, transaction: transaction);

            var userCount = await connection.QuerySingleAsync<int>(
                @"SELECT COUNT(*) FROM ""User"";", transaction: transaction);

            var postCount = await connection.QuerySingleAsync<int>(
                "SELECT COUNT(*) FROM Post;", transaction: transaction);

            if (userCount > 0 && postCount > 0)
            {
                await transaction.CommitAsync();
                return;
            }

            await connection.ExecuteAsync(InsertUsersSql, transaction: transaction);
            await connection.ExecuteAsync(InsertPostsSql, transaction: transaction);

            await transaction.CommitAsync();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}
```

Add a **seed** endpoint to your API within the <VPIcon icon="iconfont icon-csharp"/>`Program.cs` file as normal:

```cs title="Program.cs"
// add the using statement
using DapperTutorial.Infrastructure;

// add the seed endpoint
app.MapPost("/seed", async (IConfiguration configuration) =>
{
    try
    {
        await DBUtilities.SeedDatabaseAsync(configuration);
        return Results.Ok("Database seeded successfully.");
    }
    catch (Exception ex)
    {
        return Results.Problem($"An error occurred while seeding the database: {ex.Message}");
    }
});
```

In your terminal, run the app with `dotnet run`, call the `/seed` endpoint, and this will initiate the database. Check the records have seeded correctly by viewing your database within your preferred database tool.

---

## Querying Data With Dapper

This section of the tutorial will focus on the basics of using the Dapper library to query the database. We'll explore the basics of loading, saving, and protecting your SQL database.

Firstly, we'll implement the **repository pattern**, a commonly used pattern in development. A repository acts as one stop place for all your database functions. Using a repository which implements an interface allows you to easily test and mock your database functionality.

Start by creating the models for your data within a Models folder.

```cs title="User.cs"
public sealed class User
{
    public string UserId { get; init; } = string.Empty;
    public string Username { get; init; } = string.Empty;
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string? Avatar { get; init; }
    public string Email { get; init; } = string.Empty;
    public DateOnly? DOB { get; init; }
}

// Post.cs Model
public sealed class Post
{
    public string PostId { get; init; } = string.Empty;
    public int Likes { get; init; }
    public string Content { get; init; } = string.Empty;
    public DateTime Timestamp { get; init; }
    public string UserId { get; init; } = string.Empty;
}
```

Following best practice, create an <VPIcon icon="iconfont icon-csharp"/>`IRepository.cs` file within an **Application** folder, and paste the following code which defines your querying functions:

```cs title="IRepository.cs"
using DapperTutorial.Models;

namespace DapperTutorial.Application;

public interface IRepository
{
    Task<IReadOnlyList<User>> GetUsersAsync();
    Task<User?> GetUserByIdAsync(string userId);
    Task<IReadOnlyList<Post>> GetPostsAsync();
    Task<Post?> GetPostByIdAsync(string postId);
    Task<IReadOnlyList<Post>> GetPostsByUser(string userId);
}
```

You now have a base interface, which can be mocked for unit testing purposes within a wider application. This is one of the many perks of implementing this pattern.

Now, create the concrete implementation of the repository like so:

```cs :collapsed-lines
using Dapper;
using DapperTutorial.Application;
using DapperTutorial.Models;
using Npgsql;

namespace DapperTutorial.Infrastructure;

public class Repository(IConfiguration configuration) : IRepository
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Missing connection string: ConnectionStrings:DefaultConnection");

    public async Task<IReadOnlyList<User>> GetUsersAsync()
    {
        const string sql = @"
            SELECT
                UserId,
                Username,
                FirstName,
                LastName,
                Avatar,
                Email,
                DOB
            FROM ""User""
            ORDER BY Username;";

        await using var connection = CreateConnection();
        var users = await connection.QueryAsync<User>(sql);
        return users.AsList();
    }

    public async Task<User?> GetUserByIdAsync(string userId)
    {
        const string sql = @"
            SELECT
                UserId,
                Username,
                FirstName,
                LastName,
                Avatar,
                Email,
                DOB
            FROM ""User""
            WHERE UserId = @UserId;";

        await using var connection = CreateConnection();
        return await connection.QuerySingleOrDefaultAsync<User>(sql, new { UserId = userId });
    }

    public async Task<IReadOnlyList<Post>> GetPostsAsync()
    {
        const string sql = @"
            SELECT
                PostId,
                Likes,
                Content,
                Timestamp,
                UserId
            FROM Post
            ORDER BY Timestamp DESC;";

        await using var connection = CreateConnection();
        var posts = await connection.QueryAsync<Post>(sql);
        return posts.AsList();
    }

    public async Task<IReadOnlyList<Post>> GetPostsByUser(string userId)
    {
        const string sql = @"
            SELECT
                PostId,
                Likes,
                Content,
                Timestamp,
                UserId
            FROM Post
            WHERE UserId = @UserId
            ORDER BY Timestamp DESC;";

        await using var connection = CreateConnection();
        var posts = await connection.QueryAsync<Post>(sql, new { UserId = userId });
        return posts.AsList();
    }

    public async Task<Post?> GetPostByIdAsync(string postId)
    {
        var sql = @"
            SELECT * FROM Post
            WHERE PostId = @PostId;";

        await using var connection = CreateConnection();
        return await connection.QuerySingleOrDefaultAsync<Post>(sql, new { PostId = postId });
    }

    private NpgsqlConnection CreateConnection() => new(_connectionString);
}
```

#### Unpacking the Repository:

The primary constructor injects `IConfiguration`, which is automatically provided by ASP.Net Core's built-in dependency injection system. This means you don't need to instantiate it yourself – the framework handles that for you. This allows access to the connection string defined in <VPIcon icon="iconfont icon-json"/>`appsettings.json`, which Dapper needs in order to connect to the database.

You'll also notice the null-coalescing `??` operator. This is a defensive pattern that throws a clear, descriptive error immediately if the connection string is missing, rather than letting a cryptic `NullReferenceException` surface somewhere further down the line when trying to use the connection string's value, if not provided.

Each method contains a SQL string prefixed with the `@` character, making it a verbatim string literal. This allows the string to span multiple lines without needing `\n` escape characters or string concatenation, so we can format our SQL the same way we would in a query editor. This makes it much easier to read.

`User` is a reserved word in PostgreSQL, hence the double quotes around `"User"`.

If you're familiar with SQL, you can easily use Dapper's query methods. This is the key strength of Dapper: it gives you the flexibility of plain SQL, with the added benefits of an ORM.

- `QueryAsync()`: Use this method when your query could return zero or more results. It will always return a collection, never null, so you don't need to worry about null checks when no rows are found.
- `QuerySingleOrDefaultAsync()`: Use this method when you expect at most one result. This is useful for methods like `GetByIdAsync`, or fetching a user's profile. If no matching row is found, it returns the default value for that type – `null` for reference types like `User?`.

---

## QuerySingle vs QueryFirst

Both `QuerySingleOrDefaultAsync` and `QueryFirstOrDefaultAsync` are used when you want to return a single result, and both return the default value for the type of `null` for reference types, when no rows are found.

The difference is in how they behave when **more than one row is returned**.

`QuerySingleOrDefaultAsync` will throw an exception, which makes it the safer choice when querying by primary key, as if you ever get two results back, something has gone seriously wrong and you want to know about it immediately rather than silently returning the wrong record, such as incorrect duplicate.

`QueryFirstOrDefaultAsync`, on the other hand, takes the first result and ignores the rest. This makes it the better fit for scenarios such as "*give me the most recent post by this user*", where multiple results are expected yet you just want the top one, typically driven by an `ORDER BY` in your query.

---

## Writing Data With Dapper

You have successfully created methods for querying and returning data from the repository, but you're going to require methods for inserting and updating existing records.

### Insert Method

Add a `CreateUserAsync()` method definition to the `IRepository` interface, and then copy the below implementation into your <VPIcon icon="iconfont icon-csharp"/>`Repository.cs`:

```cs title="Repository.cs"
public async Task<bool> CreateUserAsync(User user)
{
    const string sql = @"
        INSERT INTO ""User"" (
            UserId,
            Username,
            FirstName,
            LastName,
            Avatar,
            Email,
            DOB
        ) VALUES (
            @UserId,
            @Username,
            @FirstName,
            @LastName,
            @Avatar,
            @Email,
            @DOB
        );";

    await using var connection = CreateConnection();
    var rowsAffected = await connection.ExecuteAsync(sql, user);
    return rowsAffected > 0;
}
```

As before, state the SQL for inserting a record into the User table, with the parameters needed to assign the values.

A few things worth noting:

- Dapper maps the `user` object's properties directly to the `@` parameters by name, so you can just pass `user` rather than constructing an anonymous object.
- `ExecuteAsync()` returns the number of rows affected, so returning `rowsAffected > 0` gives the caller a simple success/failure bool.
- `Avatar` and `DOB` are nullable on the model, and Dapper handles this gracefully: it will insert `NULL` into the database when those values are `null`.

### Protecting Your Database – Parameterisation and SQL Injection

You may have noticed that throughout this tutorial, values are never inserted directly into the SQL string. Instead, we use placeholders like `@UserId` and `@Username`, with the actual values passed separately. This is called **parameterisation**, and it's one of the most important habits you can build as a developer.

To understand why, consider what happens without it. If you were to build a query using string interpolation:

````cs
// Never do this
var sql = $"SELECT * FROM \"User\" WHERE Username = '{username}'";


//A malicious user could pass the following as their username:
```
' OR '1'='1
````

Which would turn your query into:

```sql
SELECT * FROM "User" WHERE Username = '' OR '1'='1'
```

Since `'1'='1'` is always true, this query returns every user in the database. With a more destructive payload, an attacker could drop tables, delete records, or extract sensitive data entirely. This is known as a **SQL injection attack**, and it remains one of the most common and damaging vulnerabilities in web applications.

Dapper protects you from this automatically. When you write:

```cs
const string sql = @"SELECT * FROM ""User"" WHERE Username = @Username";
var user = await connection.QuerySingleOrDefaultAsync<User>(sql, new { Username = username });
```

Dapper sends the SQL and the values to the database separately. The database receives the query structure first, compiles it, and then applies the value as pure data – it can never be interpreted as SQL. No matter what a user passes in, it will always be treated as a value, never as an instruction.

This is why throughout this tutorial, you will always see:

- `@ParameterName` placeholders in the SQL string
- Values passed as an anonymous object, a model, or `DynamicParameters`

But never string interpolation or concatenation inside a SQL string.

---

## Updating Data With Dapper

You don't always want to create new records. Sometimes, you would rather update records instead. Below is the code required to do this. Add this method to your repository, not forgetting to add the definition to the repository interface:

```cs
public async Task<bool> UpdateUserAsync(User user)
{
    const string sql = @"
    UPDATE ""User"" SET
        Username = @Username,
        FirstName = @FirstName,
        LastName = @LastName,
        Avatar = @Avatar,
        Email = @Email,
        DOB = @DOB
    WHERE UserId = @UserId;";
    await using var connection = CreateConnection();
    var affectedRows = await connection.ExecuteAsync(sql, user);
    return affectedRows > 0;
}
```

Like all other queries / actions with Dapper, an SQL command is written and passed to `ExecuteAsync()` along with the object to be updated, and Dapper will automatically map the properties based on name.

---

## Deleting Records With Dapper

Just like before, add the following code to your repository. Add your delete SQL command, and pass to the `ExecuteAsync()` method. Below, instead of passing the user object, you're manually mapping the userId to the SQL `` `@UserId` `` parameter.

```cs
public async Task<bool> DeleteUserAsync(string userId)
{
    const string sql = @"
    DELETE FROM ""User""
    WHERE UserId = @UserId;";

    await using var connection = CreateConnection();
    var affectedRows = await connection.ExecuteAsync(sql, new { UserId = userId });
    return affectedRows > 0;
}
```

There may be a time where you don't want to delete one record at a time, and instead would like to delete multiple in one go. This can be achieved by Dapper's internal mechanics, and passing a list of items to the `ExecuteAsync()` method, like so:

```cs
public async Task<bool> DeleteUsersBatchAsync(IEnumerable<string> userIds)
{
    const string sql = @"
        DELETE FROM ""User""
        WHERE UserId = @UserId;";

    await using var connection = CreateConnection();
    var affectedRows = await connection.ExecuteAsync(sql, userIds.Select(id => new { UserId = id }));

    return affectedRows > 0;
}
```

Dapper will iterate over the collection and execute the statement once per item. It's not a single batch query under the hood it's multiple executions, so for large datasets you'd want to consider a different approach – but for typical use cases it's clean and convenient.

---

## Batch Processing With Dapper

For true batch processing in a single round trip, you would need to lean on SQL rather than Dapper itself. Dapper is just the messenger here, and the batching logic lives in the query.

The most common approach is using `In / Any` (depending on SQL database flavour):

```cs
public async Task<bool> DeleteUsersAsync(IEnumerable<string> userIds)
{
    const string sql = @"
        DELETE FROM ""User""
        WHERE UserId = ANY(@UserIds);";

    await using var connection = CreateConnection();
    var affectedRows = await connection.ExecuteAsync(sql, new { UserIds = userIds.ToArray() });
    return affectedRows > 0;
}
```

This sends a single query to the database with all the IDs, rather than one query per ID. Npgsql supports passing an array directly to `ANY()`, which is the PostgreSQL idiom for this.

::: note

`ANY(@UserIds)` is PostgreSQL-specific syntax. If you were using SQL Server you'd use `WHERE UserId IN @UserIds` instead – Dapper has built-in support for expanding `IN` parameters when passed an `IEnumerable`.

:::

In summary:

- **Multiple executions**: one round trip per item, simple but inefficient at scale, especially when deleting a lot of users, or their posts.
- `ANY` **/** `IN`: single round trip regardless of list size, much more efficient for larger datasets.

For most everyday use cases, the difference won't matter. But it's a good habit to reach for the single query approach when you know you're dealing with a collection.

::: note

Remember to keep the `IRepository` interface updated with any new methods you've learnt within this tutorial so far

:::

---

## Transactions With Dapper

If you cast your mind back to the seeding utility, you may have noticed a transaction was already being used there. Now it's time to understand what they are and why they matter.

A transaction guarantees that either **all** operations succeed, or **none** of them do. This is the atomicity principle: the database will never be left in a half-finished state.

Imagine the scenario where a new user signs up to the social media application, and you ask them to write their first post, during the registration process – meaning their account and their first post is stored in the same operation.

Without a transaction, if the user insert succeeds but the post insert fails, you're left with an orphaned user record in the database – an account with no post, and no way to know something went wrong.

If you're familiar with SQL, you may have written transactions directly like so:

```sql
BEGIN TRANSACTION;
    INSERT INTO "User" (UserId, Username ...) VALUES (...);
    INSERT INTO Post (PostId, ...) VALUES (...);
COMMIT;
```

With Dapper, rather than writing the transaction logic inside the SQL itself, you manage it from your C# code instead. Each SQL statement stays as its own focused block, and you wrap them together in a transaction at the application level. This gives you the same atomicity guarantee, but with the added benefit of being able to use C#'s `try/catch` to handle failures and trigger a rollback cleanly.

```cs :collapsed-lines
public async Task<bool> CreateUserWithPostAsync(User user, Post post)
{
    const string insertUserSql = @"
        INSERT INTO ""User"" (UserId, Username, FirstName, LastName, Avatar, Email, DOB)
        VALUES (@UserId, @Username, @FirstName, @LastName, @Avatar, @Email, @DOB);";

    const string insertPostSql = @"
        INSERT INTO Post (PostId, Likes, Content, Timestamp, UserId)
        VALUES (@PostId, @Likes, @Content, @Timestamp, @UserId);";

    await using var connection = CreateConnection();
    await connection.OpenAsync();
    await using var transaction = await connection.BeginTransactionAsync();

    try
    {
        await connection.ExecuteAsync(insertUserSql, user, transaction);
        await connection.ExecuteAsync(insertPostSql, post, transaction);
        await transaction.CommitAsync();
        return true;
    }
    catch (Exception)
    {
        await transaction.RollbackAsync();
        return false;
    }
}
```

It also means you can write some useful methods, which run particular SQL blocks conditionally. Take the below example: there are 3 different SQL blocks which can be run as part of the transaction `insertUserSql`, `insertPostSql` and `logActivitySql`.

For the below example, imagine you have an `ActivityLog` table that tracks user actions across the application. All three blocks are part of the same transaction, but only two of them are guaranteed to run. If the flag is inactive, the activity log is skipped entirely, and the transaction commits with just the user and post. If anything fails, all of it rolls back regardless.

```cs :collapsed-lines
public async Task<bool> CreateUserWithPostAndLogAsync(User user, Post post, bool logActivity)
{
    const string insertUserSql = @"
        INSERT INTO ""User"" (UserId, Username, FirstName, LastName, Avatar, Email, DOB)
        VALUES (@UserId, @Username, @FirstName, @LastName, @Avatar, @Email, @DOB);";

    const string insertPostSql = @"
        INSERT INTO Post (PostId, Likes, Content, Timestamp, UserId)
        VALUES (@PostId, @Likes, @Content, @Timestamp, @UserId);";

    const string logActivitySql = @"
        INSERT INTO ActivityLog (UserId, Action, Timestamp)
        VALUES (@UserId, 'SIGNUP', @Timestamp);";

    await using var connection = CreateConnection();
    await connection.OpenAsync();
    await using var transaction = await connection.BeginTransactionAsync();

    try
    {
        await connection.ExecuteAsync(insertUserSql, user, transaction);
        await connection.ExecuteAsync(insertPostSql, post, transaction);

        if (logActivity)
        {
            await connection.ExecuteAsync(logActivitySql, new { user.UserId, Timestamp = DateTime.UtcNow }, transaction);
        }

        await transaction.CommitAsync();
        return true;
    }
    catch (Exception)
    {
        await transaction.RollbackAsync();
        return false;
    }
}
```

---

## Multi-mapping / Splits

So far, every query has returned data from a single table, mapped to a single object. But real applications rarely work that way. Data is relational, and you'll frequently need to query across multiple tables at once using a **JOIN**.

Dapper handles this through **multi-mapping**, which allows a single query to map results across multiple objects simultaneously. To demonstrate this, you're going to return a list of posts with their associated author's details populated (rather than just a `UserId` foreign key reference).

First, create the model used to store the combined data in your Models folder.

```cs
public sealed class PostWithAuthor
{
    public Post Post { get; init; } = null!;
    public User Author { get; init; } = null!;
}
```

Now add the following method to your repository (not forgetting to always add the method definition to your interface too).

```cs
public async Task<IReadOnlyList<PostWithAuthor>> GetPostsWithAuthorsAsync()
{
    const string sql = @"
        SELECT
            p.PostId,
            p.Likes,
            p.Content,
            p.Timestamp,
            p.UserId,
            u.UserId,
            u.Username,
            u.FirstName,
            u.LastName,
            u.Avatar,
            u.Email,
            u.DOB
        FROM Post p
        INNER JOIN ""User"" u ON p.UserId = u.UserId
        ORDER BY p.Timestamp DESC;";

    await using var connection = CreateConnection();

    var results = await connection.QueryAsync<Post, User, PostWithAuthor>(
        sql,
        (post, user) => new PostWithAuthor { Post = post, Author = user },
        splitOn: "UserId"
    );

    return results.AsList();
}
```

There is quite a bit going on here compared to the queries you have written so far, so let's unpack it.

### `SELECT` Statement

Unlike previous queries where you could rely on `SELECT *`, column order matters here. Dapper needs to know where the `Post` columns end and the `User` columns begin in the result set. You're explicitly listing every column, with all `Post` columns first and all `User` columns second.

```cs
QueryAsync<Post, User, PostWithAuthor>
```

Rather than a single generic type, you are now passing three: the first two are the objects you want to map to, and the third is the return type. Dapper will split the result set into a `Post` and a `User`, and hand both to you to combine however you like.

### The Mapping Function

```cs
(post, user) => new PostWithAuthor { Post = post, Author = user }
```

This is where you stitch the two objects together. Dapper passes you the mapped `Post` and `User` for each row, and you return the combined `PostWithAuthor`. This is also where you have full control: if you wanted to flatten the result into a single object rather than a nested one, you could do that here instead.

```cs
splitOn: "UserId"
```

This is the most important part to understand. The `splitOn` parameter tells Dapper the name of the column where the first object ends and the second begins. In this case, when Dapper encounters `UserId` for the second time in the result set, it knows everything from that point onwards belongs to the `User` object.

It defaults to `Id` – so if your split column were named `Id`, you wouldn't need to specify it at all. Since both `Post` and `User` share `UserId` as their identifier, you must specify it explicitly here.

#### A Common Mistake

Because `splitOn` works by column position, the column you split on must be the **first column of the second object** in your SELECT. If `u.UserId` were not the first `User` column listed, Dapper would split in the wrong place and you'd end up with incorrectly mapped data. It's the kind of bug that can be tricky to spot because no exception is thrown, the data is just wrong.

---

## What Comes Next – Possible Additions

Use this tutorial as a base to build upon. The next steps are to look at how you could structure your project to make your repository tidier. For example, you could move your SQL commands into files of their own, and import them in to your repository, making your repository code slimmer.

To avoid this tutorial becoming too bloated, I tried to cover the key features of Dapper. Now you know the fundamentals, you could push your learning further to cover:

- `QueryMultiple`: execute several SQL statements in a single round trip. This is ideal for dashboard-style endpoints.
- **Dynamic parameters**: build queries conditionally using `DynamicParameters`, which is useful for search and filter scenarios.
- **Endpoint implementation**: add API endpoints to call your repository methods, injecting the `IRepository` into your minimal endpoints.

::: tip For example

```cs
app.MapPost("/insert-user", async (IRepository repository, User newUser) =>
{
    var success = await repository.InsertUserAsync(newUser);
    return success
        ? Results.Ok($"User {newUser.Username} inserted successfully.")
        : Results.Problem("Failed to insert user.");
});
```

:::

---

## Final Thoughts

Dapper won't be the right tool for every project. If you're working with complex entity relationships, frequent schema changes, or a team heavily invested in LINQ, Entity Framework may be the better fit. And there's nothing wrong with that.

But when performance matters, when you need precise control over what's hitting your database, or when you're working with a schema you don't own, Dapper's transparency is hard to beat. You always know exactly what query is being executed, because you wrote it yourself.

The trade-off is straightforward: Entity Framework gives you speed of development, Dapper gives you speed of execution. Understanding both makes you a more well-rounded .NET developer – and knowing when to reach for each one is a skill in itself.

If you already know SQL, Dapper's learning curve is remarkably shallow. There's no magic, no conventions to memorise, no generated queries to second-guess. Just SQL, mapped cleanly to your C# objects, and as this tutorial has hopefully shown, that doesn't have to mean unsafe or hard to maintain.

::: info

Again, thanks for reading and I hope you have found this tutorial useful. If you'd like to chat about anything in this tutorial or hear about future articles, you can follow me on [X/Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`grant-dot-dev`)](https://x.com/grant-dot-dev).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work With Dapper in .Net",
  "desc": "When you're working with .NET, interacting with databases (particularly SQL databases) is inevitable. Common approaches involve using ORM (Object Relational Mapping) with tools like Entity Framework. ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-dapper-in-net.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
