---
lang: en-US
title: "How to Use PostgreSQL as a Cache, Queue, and Search Engine"
description: "Article(s) > How to Use PostgreSQL as a Cache, Queue, and Search Engine"
icon: iconfont icon-postgresql
category:
  - DevOps
  - Docker
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use PostgreSQL as a Cache, Queue, and Search Engine"
    - property: og:description
      content: "How to Use PostgreSQL as a Cache, Queue, and Search Engine"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-postgresql-as-a-cache-queue-and-search-engine.html
prev: /data-science/postgresql/articles/README.md
date: 2026-04-22
isOriginal: false
author:
  - name: Aaron Yong
    url: https://freecodecamp.org/news/author/aaronhsyong/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6fcdd3c0-eead-42a7-b2f0-cf4c6a3d06dc.png
---

# {{ $frontmatter.title }} 관련

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
  name="How to Use PostgreSQL as a Cache, Queue, and Search Engine"
  desc="”Just use Postgres” has been circulating as advice for years, but most articles arguing for it are opinion pieces. I wanted hard numbers. So I built a benchmark suite that pits vanilla PostgreSQL agai"
  url="https://freecodecamp.org/news/how-to-use-postgresql-as-a-cache-queue-and-search-engine"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6fcdd3c0-eead-42a7-b2f0-cf4c6a3d06dc.png"/>

"Just use Postgres" has been circulating as advice for years, but most articles arguing for it are opinion pieces. I wanted hard numbers.

So I built a benchmark suite that pits vanilla PostgreSQL against a feature-optimized PostgreSQL instance — measuring caching, message queues, full-text search, and pub/sub under controlled conditions.

In this article, you'll learn how to use PostgreSQL's built-in features for caching, job queues, full-text search, and pub/sub. You'll see actual benchmark results (latency percentiles, throughput, and error rates) comparing naive PostgreSQL patterns against optimized ones, and understand where PostgreSQL's limits are so you can decide whether you really need that extra service in your stack.

::: note Prerequisites

To follow along or reproduce the benchmarks, you'll need:

- Docker and Docker Compose
- Node.js 20+ (for the Express TypeScript API layer)
- [<VPIcon icon="fas fa-globe"/>k6](https://k6.io/) for load testing
- Basic familiarity with SQL and PostgreSQL

The full benchmark project is [open source on GitHub (<VPIcon icon="iconfont icon-github"/>`aaronhsyong2/pg-stack-benchmark`)](https://github.com/aaronhsyong2/pg-stack-benchmark) — you can clone it and run every test yourself.

:::

---

## The Setup

The benchmark uses two identical PostgreSQL 17 instances running in Docker containers, each with fixed resource constraints (2 CPUs, 2 GB RAM). Both share the same Express TypeScript API layer — the only difference is which PostgreSQL features are enabled.

```plaintext
┌─────────┐     ┌──────────────────┐     ┌─────────────────┐
│   k6    │────>│  Express API     │────>│  PG Baseline    │
│  (load  │     │  (TypeScript)    │     │  (vanilla PG17) │
│  test)  │────>│  Port 3001/3002  │────>│  PG Modded      │
└─────────┘     └──────────────────┘     │  (features on)  │
                                         └─────────────────┘
```
<!-- TODO: mermaid화 -->

The baseline instance uses naïve approaches (regular tables, `ILIKE` search, polling). The modded instance uses PostgreSQL's built-in features (UNLOGGED tables, `tsvector` with GIN indexes, `LISTEN/NOTIFY`, partial indexes). Same hardware, same API code, same data. Only the database features differ.

Both instances share this tuned <VPIcon icon="fas fa-gears"/>`postgresql.conf`:

```ini title="postgresql.conf"
# Memory allocation
shared_buffers = 512MB           # 25% of available RAM
effective_cache_size = 1536MB    # 75% of RAM — helps the query planner
work_mem = 16MB                  # per-sort/hash operation memory

# SSD-optimized planner settings
random_page_cost = 1.1           # default 4.0 assumes spinning disks
effective_io_concurrency = 200   # allow parallel I/O on SSDs
```

These settings matter. The defaults assume spinning disks from the early 2000s. Setting `random_page_cost = 1.1` tells the query planner that random reads are nearly as fast as sequential reads on SSDs, which encourages index usage over sequential scans.

---

## Benchmark 1: Caching with UNLOGGED Tables

**The idea:** Use an UNLOGGED table as an in-database cache. UNLOGGED tables skip PostgreSQL's Write-Ahead Log (WAL) — the mechanism that guarantees durability. Since cache data is ephemeral by nature, losing it on a crash is acceptable, and skipping WAL removes the biggest write bottleneck.

```sql
-- Modded: UNLOGGED table for cache entries
CREATE UNLOGGED TABLE cache_entries (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    expires_at TIMESTAMPTZ
);

-- Baseline: same schema, but a regular (logged) table
CREATE TABLE cache_entries (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    expires_at TIMESTAMPTZ
);
```

### Results (200 Virtual Users)

| **Mode** | **p50** | **p95** | **avg** | **req/s** |
| ---: | :---: | :---: | :---: | :---: |
| Baseline (regular table) | 1.87ms | 6.00ms | 2.50ms | 1,754/s |
| Modded (UNLOGGED table) | 1.71ms | 5.24ms | 2.17ms | 1,760/s |

A consistent 13% improvement across all percentiles. Not dramatic, but free — you change one keyword in your `CREATE TABLE` statement.

### Under Stress (1,000 Virtual Users, No Sleep)

| **Mode** | **p50** | **p95** | **req/s** | **Total Requests** |
| ---: | :---: | :---: | :---: | :---: |
| Baseline | 83.38ms | 143.23ms | 7,663/s | 728,021 |
| Modded | 77.69ms | 126.39ms | 8,062/s | 765,934 |

The relative improvement stays locked at 12-13% regardless of load level. The UNLOGGED advantage is a per-write optimization — it saves the same amount of I/O whether you are doing 100 or 10,000 writes per second. The modded instance served 37,000 more requests in the same time window.

### The Verdict

UNLOGGED tables won't match Redis for sub-millisecond hot-path caching (real-time bidding, gaming leaderboards). But for web applications where the difference between 2ms and 5ms is invisible to users, they eliminate an entire infrastructure dependency for zero additional complexity.

You do give up Redis data structures (sorted sets, HyperLogLog, streams). If you need those, a dedicated cache is still the right call.

---

## Benchmark 2: Job Queues with SKIP LOCKED

**The idea:** Use PostgreSQL as a job queue with `SELECT ... FOR UPDATE SKIP LOCKED`. Multiple workers poll the same table, and `SKIP LOCKED` ensures each worker gets a different row — no duplicates, no contention.

```sql
-- Queue table with a partial index on pending jobs only
CREATE TABLE job_queue (
    id SERIAL PRIMARY KEY,
    payload JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partial index: only indexes pending jobs
-- As jobs complete, they leave the index — it stays small forever
CREATE INDEX idx_pending_jobs ON job_queue (created_at)
    WHERE status = 'pending';
```

The dequeue pattern:

```sql
-- Atomic dequeue: select + update in one statement
UPDATE job_queue SET status = 'processing'
WHERE id = (
    SELECT id FROM job_queue
    WHERE status = 'pending'
    ORDER BY created_at
    LIMIT 1
    FOR UPDATE SKIP LOCKED  -- skip rows locked by other workers
) RETURNING *;
```

How `SKIP LOCKED` works: Worker A locks row 1. Worker B tries row 1, sees the lock, skips it, and takes row 2 instead. No blocking, no duplicates. If a worker crashes, the transaction rolls back and the row becomes available again.

### Results (100 Producers + 50 Consumers)

| Mode | p50 | p95 | avg | req/s |
| --- | --- | --- | --- | --- |
| Baseline (full index) | 1.90ms | 5.01ms | 2.30ms | 1,053/s |
| Modded (partial index) | 1.81ms | 5.28ms | 2.29ms | 1,052/s |

They're virtually identical. The partial index doesn't show its value in a 60-second benchmark because the table doesn't accumulate enough completed rows for the index size difference to matter. In a production system with millions of completed jobs, the partial index keeps the index at kilobytes while a full index grows to gigabytes.

::: important The Verdict

`SKIP LOCKED` is production-ready for job queues. Libraries like [<VPIcon icon="iconfont icon-github"/>`timgit/pg-boss`](https://github.com/timgit/pg-boss) (Node.js) and [<VPIcon icon="iconfont icon-github"/>`riverqueue/river`](https://github.com/riverqueue/river) (Go) build on this exact pattern.

You do give up exchange/routing patterns (fan-out, topic-based routing) and consumer groups with message replay. If you need those, a dedicated message broker is still the right tool. For simple "process this job once" workloads, PostgreSQL handles it.

:::

---

## Benchmark 3: Full-Text Search with tsvector

**The idea:** Use PostgreSQL's built-in full-text search instead of a separate search service. A `tsvector` column stores pre-processed search tokens, and a GIN (Generalized Inverted Index) enables fast lookups using the same inverted index concept that powers Elasticsearch.

```sql
-- Search-optimized article table
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    search_vector tsvector  -- pre-computed search tokens
);

-- GIN index for full-text search
CREATE INDEX idx_search ON articles USING GIN (search_vector);

-- Auto-update search_vector on insert/update
CREATE OR REPLACE FUNCTION update_search_vector() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := to_tsvector('english',
        COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.body, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_search
    BEFORE INSERT OR UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();
```

The baseline uses `ILIKE` with a leading wildcard — the approach most developers reach for first:

```sql
-- Baseline: sequential scan on every query
SELECT * FROM articles
WHERE title ILIKE '%postgresql%' OR body ILIKE '%postgresql%';

-- Modded: GIN index lookup with relevance ranking
SELECT id, title,
    ts_rank(search_vector, plainto_tsquery('english', 'postgresql')) AS rank
FROM articles
WHERE search_vector @@ plainto_tsquery('english', 'postgresql')
ORDER BY rank DESC LIMIT 20;
```

### Results (500 Virtual Users)

| **Mode** | **p50** | **p95** | **avg** | **req/s** |
| ---: | :---: | :---: | :---: | :---: |
| Baseline (ILIKE) | 1.96ms | 101.83ms | 25.22ms | 561/s |
| Modded (tsvector + GIN) | 2.76ms | 10.39ms | 3.76ms | 675/s |

This is the standout result. The baseline's p95 of 101ms versus the modded's 10ms is a 10x improvement.

Why the baseline's p50 (1.96ms) is slightly better than the modded's (2.76ms): simple `ILIKE` queries on small result sets can be fast when the data fits in `shared_buffers`. But as load increases and the buffer cache is contested, sequential scans degrade dramatically. The GIN index stays stable.

### Under Stress (500 Virtual Users, No Sleep)

| **Mode** | **p50** | **p95** | **req/s** | **Total Requests** |
| ---: | :---: | :---: | :---: | :---: |
| Baseline (ILIKE) | 599ms | 1,000ms | 558/s | 50,212 |
| Modded (tsvector) | 209ms | 396ms | 1,441/s | 129,679 |

ILIKE collapses to 1-second p95 latencies. Each query forces a sequential scan of all 10,000 articles, blocking shared buffers and starving concurrent queries. The tsvector approach serves 2.6x more requests in the same time window because the GIN index lookup is O(log n) regardless of concurrency.

::: important The Verdict

This is the strongest argument in the entire benchmark. The fix requires zero extensions — `to_tsvector()`, `plainto_tsquery()`, and `CREATE INDEX USING GIN` are all built into core PostgreSQL. If you're doing `WHERE column ILIKE '%term%'` on any table with more than a few thousand rows, you're leaving massive performance on the table.

You do give up distributed search across shards, complex analyzers for CJK languages, and aggregation/faceted search pipelines. For a product search bar, blog search, or internal tool — PostgreSQL is enough.

:::

---

## Benchmark 4: Pub/Sub with LISTEN/NOTIFY

**The idea:** Use PostgreSQL's native `LISTEN/NOTIFY` for pub/sub messaging, triggered automatically on INSERT via a database trigger.

```sql
-- Trigger that fires pg_notify on every new message
CREATE OR REPLACE FUNCTION notify_message() RETURNS trigger AS $$
BEGIN
    PERFORM pg_notify(NEW.channel, NEW.payload::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notify
    AFTER INSERT ON messages
    FOR EACH ROW EXECUTE FUNCTION notify_message();
```

::: info Results (200 Virtual Users)

| **Mode** | **p50** | **p95** | **avg** | **req/s** |
| ---: | :---: | :---: | :---: | :---: |
| Baseline (poll-based) | 1.99ms | 6.04ms | 2.84ms | 1,116/s |
| Modded (LISTEN/NOTIFY) | 1.65ms | 4.80ms | 2.13ms | 1,131/s |

Here we have a 20% improvement at p95. The trigger-based approach does more work per INSERT (INSERT + NOTIFY), but the reduced round trips and better connection reuse patterns offset the overhead.

:::

::: important The Verdict

`LISTEN/NOTIFY` works for real-time features where you would otherwise reach for Redis pub/sub. The main limitation is payload size (8,000 bytes maximum) and the requirement for dedicated connections (incompatible with PgBouncer in transaction mode).

:::

---

## The Combined Workload: The Honest Test

Individual benchmarks are flattering. The real question: can one PostgreSQL instance handle caching, queues, search, and pub/sub simultaneously without degrading?

### Results (All Four Workloads Running Together)

| **Mode** | **p50** | **p95** | **avg** | **req/s** |
| ---: | :---: | :---: | :---: | :---: |
| Baseline | 1.65ms | 5.24ms | 2.17ms | 1,424/s |
| Modded | 1.86ms | 6.05ms | 2.47ms | 1,417/s |

Under combined load, the baseline marginally outperforms the modded setup. The modded PostgreSQL does more work per operation — maintaining GIN indexes, firing triggers, running `pg_cron` in the background. When all these features are active simultaneously, the overhead is measurable: about 15% higher p95 latency.

But both setups stay comfortably under 10ms at p95. For most web applications, that's more than good enough.

---

## What I Learned

After running all these benchmarks, here's what I would tell a team evaluating whether to "just use Postgres":

1. **Do it for full-text search:** Switching from `ILIKE` to `tsvector` with a GIN index is a 10x improvement that requires zero extensions. This is the single highest-ROI change in the entire PostgreSQL ecosystem, and most developers don't know it exists.
2. **Do it for job queues:** `SKIP LOCKED` is production-ready and eliminates RabbitMQ for simple "process this job" workloads. Use a library like pg-boss or river rather than rolling your own.
3. **Consider it for caching:** UNLOGGED tables give a steady 13% improvement over regular tables. If sub-millisecond latency is not a hard requirement (and for most web apps, it is not), you can drop Redis entirely.
4. **Be honest about the overhead:** Running all four roles simultaneously adds about 15% latency compared to running any single role. Whether that matters depends on your latency budget.
5. **Know where to stop:** PostgreSQL won't match Redis for sub-millisecond caching, Kafka for millions of messages per second, or Elasticsearch for distributed multi-node search with complex analyzers. The line is at extreme throughput or extreme specialization.

The honest conclusion is not "PostgreSQL does everything." It is: for most applications, a single well-configured PostgreSQL instance handles 80% of what you would otherwise need three to five additional services for. That is less infrastructure to deploy, monitor, and maintain — and fewer things to break at 3 AM.

Enterprise-scale applications processing millions of messages per second, serving sub-millisecond cache hits to millions of concurrent users, or running distributed search across terabytes of documents will still need specialized tools. Those tools exist for a reason, and at that scale the operational cost of running them is justified by the performance you get back.

But most of us aren't building at that scale — and may never need to. Starting with PostgreSQL for these roles means you ship faster with fewer moving parts. If and when you outgrow what PostgreSQL can handle, your benchmarks will tell you exactly which role needs to be extracted into a dedicated service. That is a much better position than starting with five services on day one because you assumed you would need them.

The [benchmark project (<VPIcon icon="iconfont icon-github"/>`aaronhsyong2/pg-stack-benchmark`)](https://github.com/aaronhsyong2/pg-stack-benchmark) is open source if you want to reproduce these results or adapt the tests for your own workload.

::: info

You can find more of my writing at [<VPIcon icon="fas fa-globe"/>`site.aaronhsyong.com`](https://site.aaronhsyong.com).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use PostgreSQL as a Cache, Queue, and Search Engine",
  "desc": "”Just use Postgres” has been circulating as advice for years, but most articles arguing for it are opinion pieces. I wanted hard numbers. So I built a benchmark suite that pits vanilla PostgreSQL agai",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-postgresql-as-a-cache-queue-and-search-engine.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
