---
lang: en-US
title: "Build a Hybrid Search Engine in PostgreSQL: BM25 + Vector Retrieval"
description: "Article(s) > Build a Hybrid Search Engine in PostgreSQL: BM25 + Vector Retrieval"
icon: iconfont icon-postgresql
category:
  - Python
  - Data Science
  - PostgreSQL
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - data-science
  - sql
  - postgres
  - postgresql
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Build a Hybrid Search Engine in PostgreSQL: BM25 + Vector Retrieval"
    - property: og:description
      content: "Build a Hybrid Search Engine in PostgreSQL: BM25 + Vector Retrieval"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-hybrid-search-engine-in-postgresql-bm25-vector-retrieval.html
prev: /data-science/postgresql/articles/README.md
date: 2026-10-21
isOriginal: false
author:
  - name: Beau Carnes
    url: https://freecodecamp.org/news/author/beaucarnes/
cover: https://cdn.hashnode.com/uploads/covers/5f68e7df6dfc523d0a894e7c/644a1317-5022-4e1f-9a0a-6b115453d874.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
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
  name="Build a Hybrid Search Engine in PostgreSQL: BM25 + Vector Retrieval"
  desc="Most application search setups force a trade-off: settle for simple text filters, or manage a separate search cluster like Elasticsearch with complex synchronization pipelines. In a new video course o"
  url="https://freecodecamp.org/news/build-a-hybrid-search-engine-in-postgresql-bm25-vector-retrieval"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5f68e7df6dfc523d0a894e7c/644a1317-5022-4e1f-9a0a-6b115453d874.png"/>

Most application search setups force a trade-off: settle for simple text filters, or manage a separate search cluster like Elasticsearch with complex synchronization pipelines.

In a new video course on the freeCodeCamp.org YouTube channel, I demonstrate how to run an entire production-grade search pipeline inside PostgreSQL. By pairing lexical keyword matching with dense vector embeddings in a single database, you eliminate external dependencies while preserving ACID guarantees for your search index.

Search queries usually demand two different retrieval behaviors. Exact queries like `"Apollo 13"` require precise keyword matching, which keyword engines handle best. Conceptual queries like `"animals that make their own light"` describe an idea without naming *bioluminescence*, which is where semantic vector search excels. Hybrid search executes both strategies simultaneously and uses Reciprocal Rank Fusion (RRF) in SQL to merge the results into one ranked list.

In this course I build a complete full-stack search application over 240,000 Simple English Wikipedia articles. The tutorial covers setting up the `pg_textsearch` extension for corpus-aware BM25 ranking, storing 384-dimensional sentence embeddings with `pgvector` and `pgvectorscale`, and profiling query plans with `EXPLAIN (ANALYZE, BUFFERS)`. The backend ties everything together using Python, FastAPI, and Psycopg, featuring match highlighting and single-transaction document writes.

[<VPIcon icon="fa-brands fa-youtube"/>Watch the PostgreSQL Hybrid Search Course on freeCodeCamp.org](https://youtu.be/kT7nXO32L-Q) (1-hour watch).

<VidStack src="youtube/kT7nXO32L-Q" />

::: info

https://github.com/beaucarnes/wikisearch

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build a Hybrid Search Engine in PostgreSQL: BM25 + Vector Retrieval",
  "desc": "Most application search setups force a trade-off: settle for simple text filters, or manage a separate search cluster like Elasticsearch with complex synchronization pipelines. In a new video course o",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-hybrid-search-engine-in-postgresql-bm25-vector-retrieval.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
