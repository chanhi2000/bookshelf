---
lang: en-US
title: "Getting Started With PgVector in .NET for Simple Vector Search"
description: "Article(s) > Getting Started With PgVector in .NET for Simple Vector Search"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
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
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting Started With PgVector in .NET for Simple Vector Search"
    - property: og:description
      content: "Getting Started With PgVector in .NET for Simple Vector Search"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/getting-started-with-pgvector-in-dotnet-for-simple-vector-search.html
prev: /programming/cs/articles/README.md
date: 2026-03-28
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_187.png
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
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Getting Started With PgVector in .NET for Simple Vector Search"
  desc="Vector search doesn't require a dedicated vector database. PostgreSQL with pgvector gives you similarity search right next to your relational data. Here's how to set it up in .NET with Aspire, Dapper, and Ollama."
  url="https://milanjovanovic.tech/blog/getting-started-with-pgvector-in-dotnet-for-simple-vector-search"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_187.png"/>

Not every AI feature needs a dedicated vector database.

Dedicated vector databases like [<VPIcon icon="fas fa-globe"/>Pinecone](https://pinecone.io/), [<VPIcon icon="fas fa-globe"/>Qdrant](https://qdrant.tech/), and [<VPIcon icon="fas fa-globe"/>Weaviate](https://weaviate.io/) get all the attention. But if your data already lives in PostgreSQL, you don't need another moving part.

[<VPIcon icon="iconfont icon-github"/>`pgvector/pgvector`](https://github.com/pgvector/pgvector) is a PostgreSQL extension that adds vector storage and similarity search directly to your existing database. You enable the extension, create a vector column, and start querying.

In this week's issue, I'll walk you through:

- What [**vector search**](/milanjovanovic.tech/hat-is-vector-search-a-concise-guide.md) is and when you need it
- Provisioning pgvector with .NET Aspire and Ollama
- Generating embeddings with [**MEAI**](/milanjovanovic.tech/orking-with-llms-in-dotnet-using-microsoft-extensions-ai.md) and storing with Dapper
- Querying by semantic similarity using cosine distance

Let's dive in.

---

## What Is Vector Search?

Traditional database queries work with exact matches. You search for `"authentication"` and get rows containing that exact word. But what about rows that mention `"login"`, `"sign-in"`, or `"identity verification"`? Those are semantically similar, but a `LIKE` query won't find them.

[**Vector search**](/milanjovanovic.tech/hat-is-vector-search-a-concise-guide.md) solves this by comparing **meaning** instead of text.

You convert text into an array of numbers (called an **embedding**) using a machine learning model. Semantically similar text produces similar arrays. Then, instead of matching keywords, you find the vectors that are **closest** to your query vector.

When would you use this?

- **Semantic search** - Find results by meaning, not just keywords
- **RAG (Retrieval-Augmented Generation)** - Feed relevant context to an LLM
- **Recommendations** - "Users who liked X also liked Y"
- **Deduplication** - Find near-duplicate content

The key insight is that you don't need a specialized database for this. If you're already on PostgreSQL, pgvector gives you all of this as an extension.

---

## Provisioning Infrastructure With .NET Aspire

We'll use [**.NET Aspire**](/milanjovanovic.tech/otnet-aspire-a-game-changer-for-cloud-native-development.md) to provision a pgvector-enabled PostgreSQL container and an [**Ollama**](/milanjovanovic.tech/ow-to-extract-structured-data-from-images-using-ollama-in-dotnet.md) instance with the [<VPIcon icon="iconfont icon-ollama"/>qwen3-embedding](https://ollama.com/library/qwen3-embedding) embedding model.

```cs{8,13}
var builder = DistributedApplication.CreateBuilder(args);

var ollama = builder.AddOllama("ollama")
    .WithLifetime(ContainerLifetime.Persistent)
    .WithDataVolume()
    .WithGPUSupport();

var embeddingModel = ollama.AddModel("qwen3-embedding:0.6b");

var postgres = builder.AddPostgres("postgres", port: 6432)
    .WithLifetime(ContainerLifetime.Persistent)
    .WithDataVolume()
    .WithImage("pgvector/pgvector", "pg17")
    .AddDatabase("articles");

builder.AddProject<Projects.PgVector_Articles>("pgvector-articles")
    .WithReference(embeddingModel)
    .WithReference(postgres)
    .WaitFor(embeddingModel)
    .WaitFor(postgres);

builder.Build().Run();
```

The `pgvector/pgvector:pg17` image is PostgreSQL 17 with the pgvector extension pre-installed. `WithLifetime(ContainerLifetime.Persistent)` keeps the containers running across app restarts so you don't lose data during development. `WaitFor` ensures the database and model are ready before the API starts.

If you're not using Aspire, you can run the same `pgvector/pgvector:pg17` image via `docker compose` and point to it with a regular connection string.

---

## Configuring the API Project

The API project needs a few packages:

```sh
dotnet add package Aspire.Npgsql
dotnet add package Pgvector.Dapper
dotnet add package CommunityToolkit.Aspire.OllamaSharp
```

`Pgvector.Dapper` provides the Dapper type handler for the `Vector` type. Other than [Pgvector.Dapper (<VPIcon icon="iconfont icon-github"/>`pgvector/pgvector-dotnet`)](https://github.com/pgvector/pgvector-dotnet/tree/master/src/Pgvector.Dapper), there are also libraries for [Npgsql (<VPIcon icon="iconfont icon-github"/>`pgvector/pgvector-dotnet`)](https://github.com/pgvector/pgvector-dotnet/tree/master/src/Pgvector) and [EF Core (<VPIcon icon="iconfont icon-github"/>`pgvector/pgvector-dotnet`)](https://github.com/pgvector/pgvector-dotnet/tree/master/src/Pgvector.EntityFrameworkCore) if you prefer those instead.

Register the services in <VPIcon icon="iconfont icon-csharp"/>`Program.cs`:

```cs title="Program.cs"
builder.AddOllamaApiClient("ollama-qwen3-embedding")
    .AddEmbeddingGenerator();

builder.AddNpgsqlDataSource("articles", configureDataSourceBuilder: b =>
{
    b.UseVector();
});

SqlMapper.AddTypeHandler(new VectorTypeHandler());
```

`AddEmbeddingGenerator()` registers an `IEmbeddingGenerator<string, Embedding<float>>` using the [**`Microsoft.Extensions.AI`**](/milanjovanovic.tech/working-with-llms-in-dotnet-using-microsoft-extensions-ai.md) abstraction. `UseVector()` enables pgvector type mapping on the Npgsql data source. The `VectorTypeHandler` lets Dapper serialize and deserialize `Vector` parameters.

---

## Initializing the Database

Before storing vectors, we need to enable the pgvector extension and create a table.

```cs
app.MapPost("/init", async (NpgsqlDataSource dataSource) =>
{
    await using var conn = await dataSource.OpenConnectionAsync();

    await using var enableExt = new NpgsqlCommand(
        "CREATE EXTENSION IF NOT EXISTS vector", conn);
    await enableExt.ExecuteNonQueryAsync();

    conn.ReloadTypes();

    await conn.ExecuteAsync(
        """
        CREATE TABLE IF NOT EXISTS articles (
            id SERIAL PRIMARY KEY,
            url TEXT NOT NULL,
            title TEXT NOT NULL,
            embedding vector(1024) NOT NULL
        )
        """);

    await conn.ExecuteAsync(
        """
        CREATE INDEX IF NOT EXISTS articles_embedding_idx
        ON articles USING hnsw (embedding vector_cosine_ops)
        """);

    return Results.Ok("Database initialized.");
});
```

::: note A few things to note:

- `CREATE EXTENSION IF NOT EXISTS vector` enables pgvector in the database
- `embedding vector(1024)` defines a vector column with 1024 dimensions, matching the Ollama embedding model's output (`qwen3-embedding:0.6b`)
- `conn.ReloadTypes()` refreshes Npgsql's type cache so it recognizes the new `vector` type
- The **HNSW index** with `vector_cosine_ops` enables fast approximate nearest-neighbor search using cosine distance.

:::

[<VPIcon icon="fa-brands fa-wikipedia-w"/>HNSW](https://en.wikipedia.org/wiki/Hierarchical_navigable_small_world) (Hierarchical Navigable Small World) is a graph-based algorithm that builds a multi-layer structure for efficient similarity lookups.

Without the index, pgvector does a sequential scan over every row. That's fine for hundreds of rows, but HNSW keeps queries fast as the dataset grows.

---

## Generating and Storing Embeddings

Now we generate embeddings for our content and store them alongside the data.

```cs
app.MapPost("/embeddings/generate", async (
    BlogService blogService,
    IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator,
    NpgsqlDataSource dataSource,
    ILogger<Program> logger) =>
{
    await using var conn = await dataSource.OpenConnectionAsync();
    conn.ReloadTypes();

    int count = 0;

    foreach (var articleUrl in File.ReadAllLines("sitemap_urls.txt"))
    {
        var (title, content) = await blogService.GetTitleAndContentAsync(articleUrl);

        var embedding = await embeddingGenerator.GenerateAsync(content);

        await conn.ExecuteAsync(
            "INSERT INTO articles (url, title, embedding) VALUES (@url, @title, @embedding)",
            new
            {
                url = articleUrl,
                title,
                embedding = new Vector(embedding.Vector.ToArray())
            });

        count++;
        logger.LogInformation("Processed ({Count}): {Url}", count, articleUrl);
    }

    return Results.Ok(new { processed = count });
});
```

`embeddingGenerator.GenerateAsync(content)` sends the text to the Ollama model and returns a vector. We wrap it in a `Pgvector.Vector` and Dapper handles the rest.

The `IEmbeddingGenerator` is provider-agnostic. If you want to swap Ollama for OpenAI or Azure OpenAI later, only the registration in `Program.cs` changes. Your endpoint code stays the same.

---

## Similarity Search With Cosine Distance

This is where it gets interesting. To search, we embed the query text and find the closest vectors in the database.

```cs
app.MapGet("/search", async (
    string query,
    IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator,
    NpgsqlDataSource dataSource,
    int limit = 5) =>
{
    var searchEmbedding = await embeddingGenerator.GenerateAsync(query);

    await using var con = await dataSource.OpenConnectionAsync();
    con.ReloadTypes();

    var embedding = new Vector(searchEmbedding.Vector.ToArray());

    var results = await con.QueryAsync<SearchResult>(
        @"""
        SELECT title, url, embedding <=> @embedding as distance
        FROM articles
        ORDER BY embedding <=> @embedding
        LIMIT @limit
        """,
        new { embedding, limit });

    return Results.Ok(new { query, results });
});

record SearchResult(string Title, string Url, double Distance);
```

The `<=>` operator is pgvector's **cosine distance** function, where lower values mean more similar. We order by distance ascending and take the top N matches.

The critical part: the query text must be embedded with the **same model** that produced the stored embeddings. Different models produce vectors in different embedding spaces, and comparing them would be meaningless.

There are also shared embedding spaces models that can embed text and images into compatible vectors, but that's a more advanced topic. One example is the [<VPIcon icon="fas fa-globe"/>Voyage 4 model family](https://blog.voyageai.com/2026/01/15/voyage-4/).

A query like `"how to secure an API"` will surface articles about authentication, JWT validation, and authorization, even if they don't contain those exact words.

pgvector supports three distance operators:

- `<->` - L2 (Euclidean) distance, uses `vector_l2_ops`
- `<=>` - Cosine distance, uses `vector_cosine_ops`
- `<#>` - Inner product (negative), uses `vector_ip_ops`

Cosine distance is the most common choice for text embeddings.

---

## Summary

You don't need a dedicated vector database to add semantic search to your application. If you're already running PostgreSQL, pgvector gives you vector storage and similarity search without adding new infrastructure.

Here's what we covered:

- **pgvector** is a PostgreSQL extension - enable it and you get a native `vector` column type
- **.NET Aspire** provisions pgvector-enabled PostgreSQL and Ollama with minimal configuration
- **Embeddings** turn text into vectors using models like `qwen3-embedding` via `IEmbeddingGenerator`
- **Similarity search** uses the cosine distance operator (`<=>`) to find the closest matches
- **HNSW indexes** make vector queries fast at scale

Your vectors live right next to your relational data, so you can join, filter, and paginate just like any other query without syncing between databases or managing extra infrastructure.

If you want to explore more advanced scenarios like [**building semantic search with S3 Vectors and Semantic Kernel**](/milanjovanovic.tech/uilding-semantic-search-with-amazon-s3-vectors-and-semantic-kernel.md), I've covered that in a previous article.


---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Started With PgVector in .NET for Simple Vector Search",
  "desc": "Vector search doesn't require a dedicated vector database. PostgreSQL with pgvector gives you similarity search right next to your relational data. Here's how to set it up in .NET with Aspire, Dapper, and Ollama.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/getting-started-with-pgvector-in-dotnet-for-simple-vector-search.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
