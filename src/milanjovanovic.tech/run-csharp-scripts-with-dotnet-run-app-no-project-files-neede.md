---
lang: en-US
title: "Run C# Scripts With dotnet run app.cs (No Project Files Needed)"
description: "Article(s) > Run C# Scripts With dotnet run app.cs (No Project Files Needed)"
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
      content: "Article(s) > Run C# Scripts With dotnet run app.cs (No Project Files Needed)"
    - property: og:description
      content: "Run C# Scripts With dotnet run app.cs (No Project Files Needed)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/run-csharp-scripts-with-dotnet-run-app-no-project-files-needed.html
prev: /programming/cs/articles/README.md
date: 2025-06-14
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_146.png
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
  name="Run C# Scripts With dotnet run app.cs (No Project Files Needed)"
  desc="With .NET 10, you can now run C# files directly. No project files, no Main method, just code. In this issue, I'll show you how to use the new `dotnet run app.cs` feature in practice: from quick one-liners to a real-world SQL seeding script."
  url="https://milanjovanovic.tech/blog/run-csharp-scripts-with-dotnet-run-app-no-project-files-needed"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_146.png"/>

.NET 10 just got a whole lot more lightweight.

You can now run a C# file directly with:

```sh
dotnet run app.cs
```

That's it. No `.csproj`. No <FontIcon icon="iconfont icon-csharp"/>`Program.cs`. No solution files. Just a single C# file.

This new feature, introduced in [<FontIcon icon="fa-brands fa-microsoft"/>.NET 10 Preview 4](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app/), is a big step toward making C# more script-friendly, especially for quick utilities, dev tooling, and CLI-based workflows.

---

## Why This Matters

For years, C# has been perceived as heavyweight for small scripts. Compare that to Python, Bash, or even JavaScript, where you can just write a file and run it.

That barrier is now gone.

You can now:

- Write one-off scripts in `.cs` files
- Use top-level statements
- Reference NuGet packages inline
- Share minimal reproducible examples without scaffolding a project

And it runs on **any OS** with the .NET SDK installed.

---

## Minimal Example

Here's a simple script that prints today's date:

```cs
Console.WriteLine($"Today is {DateTime.Now:dddd, MMM dd yyyy}");
```

Run it:

```sh
dotnet run app.cs
```

Output:

```plaintext title="output"
Today is Saturday, Jun 14 2025
```

That's it. No boilerplate, no boring `Main()` method. Just top-level programs and C# code.

---

## Referencing NuGet Packages

Let's say you want to make an HTTP request using `Flurl.Http`.

You can do this inline:

```cs
#:package Flurl.Http@4.0.2

using Flurl.Http;

var response = await "https://api.github.com"
    .WithHeader("Accept", "application/vnd.github.v3+json")
    .WithHeader("User-Agent", "dotnet-script")
    .GetAsync();

Console.WriteLine($"Status code: {response.StatusCode}");

Console.WriteLine(await response.GetJsonAsync<object>());
```

To run it:

```sh
dotnet run fetch.cs
```

Behind the scenes, the compiler downloads and restores NuGet dependencies automatically.

---

## Real-World Use Case: Seeding SQL Data

Here's a script I recently used to seed some test data into my Postgres database.

```cs :collapsed-lines
#:package Dapper@2.1.66
#:package Npgsql@9.0.3

using Dapper;
using Npgsql;

const string connectionString = "Host=localhost;Port=5432;Username=postgres;Password=postgres";

using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();

using var transaction = connection.BeginTransaction();

Console.WriteLine("Creating tables...");

await connection.ExecuteAsync(@"
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );
");

Console.WriteLine("Inserting users...");

for (int i = 1; i <= 10_000; i++)
{
    await connection.ExecuteAsync(
        "INSERT INTO users (name) VALUES (@Name);",
        new { Name = $"User {i}" });

    if (i % 1000 == 0)
    {
        Console.WriteLine($"Inserted {i} users...");
    }
}

transaction.Commit();

Console.WriteLine("Done!");
```

Why did I write this as a script? I didn't want to clutter my app with throwaway seed logic. I just needed a quick way to populate my database with test data. This script does exactly that, and I can run it with:

```sh
dotnet run seed.cs
```

---

## File-Level Directives: The Magic Behind It

The real power comes from file-level directives. These let you configure your app without leaving the <FontIcon icon="iconfont icon-csharp"/>`.cs` file:

**Package References**

```cs
#:package Dapper@2.1.66
#:package Npgsql@9.0.3
```

**SDK Selection**

```cs
#:sdk Microsoft.NET.Sdk.Web
```

This tells .NET to treat your file as a web application, enabling ASP.NET Core features:

```cs
#:sdk Microsoft.NET.Sdk.Web
#:package Microsoft.AspNetCore.OpenApi@9.*

var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

app.MapOpenApi();

app.MapGet("/", () => "Hello from a file-based API!");
app.MapGet("/users/{id}", (int id) => new { Id = id, Name = $"User {id}" });

app.Run();
```

You now have a running web API. No project file. No `Startup.cs`. Just C# that does what you want.

**MSBuild Properties**

You can also set MSBuild properties directly in the file:

```cs
#:property LangVersion preview
#:property Nullable enable
```

---

## When Your Script Grows Up

The brilliant part? When your file-based app gets complex enough to need project structure, converting is seamless:

```sh
dotnet project convert api.cs
```

This creates:

- A new folder named after your file
- A proper `.csproj` file with all your directives converted to MSBuild properties
- Your code moved to <FontIcon icon="iconfont icon-csharp"/>`api.cs` (or <FontIcon icon="iconfont icon-csharp"/>`Program.cs` if you prefer)
- Everything ready for full project development

Given our API example above, the generated `.csproj` looks like:

```xml title=".csproj"
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="9.*" />
  </ItemGroup>
</Project>
```

Your file-based app evolves naturally into a project-based app. No need to rewrite or restructure everything. This makes it easy to start small and grow as needed, without losing the simplicity of the initial script.

---

## Takeaway

The bottom line is this: C# just became significantly more approachable. The barrier to entry dropped from "learn project files and MSBuild" to "write C# and run it."

For experienced developers, this is a productivity boost for scripting and prototyping. For newcomers, this removes the biggest stumbling block to getting started with C#.

The best part? Microsoft didn't create a separate scripting language or runtime. They made regular C# easier to use. Your file-based apps are real .NET applications that can grow into full projects when needed.

The ceremony is dead. Long live practical C#.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Run C# Scripts With dotnet run app.cs (No Project Files Needed)",
  "desc": "With .NET 10, you can now run C# files directly. No project files, no Main method, just code. In this issue, I'll show you how to use the new `dotnet run app.cs` feature in practice: from quick one-liners to a real-world SQL seeding script.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/run-csharp-scripts-with-dotnet-run-app-no-project-files-needed.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
