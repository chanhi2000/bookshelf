---
lang: en-US
title: "Building a Reliable PostgreSQL Queue: Concurrency, Crashes, Retries, and Scale"
description: "Article(s) > Building a Reliable PostgreSQL Queue: Concurrency, Crashes, Retries, and Scale"
icon: iconfont icon-postgresql
category:
  - TypeScript
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - ts
  - typescript
  - data-science
  - sql
  - db
  - postgres
  - postgresql
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building a Reliable PostgreSQL Queue: Concurrency, Crashes, Retries, and Scale"
    - property: og:description
      content: "Building a Reliable PostgreSQL Queue: Concurrency, Crashes, Retries, and Scale"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/building-a-reliable-postgresql-queue-concurrency-crashes-retries-and-scale.html
prev: /data-science/postgres/articles/README.md
date: 2026-09-09
isOriginal: false
author:
  - name: Rowland Ekemezie
    url: https://blog.master.dev/author/rowlandekemezie/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10923
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building a Reliable PostgreSQL Queue: Concurrency, Crashes, Retries, and Scale"
  desc="We get into building a background task processor using PostgreSQL. It seems easy at first, but there are lots of pitfalls as a system like this scales."
  url="https://blog.master.dev/building-a-reliable-postgresql-queue-concurrency-crashes-retries-and-scale/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10923"/>

Most software products eventually need some form of background task processor: sending emails, processing payments, syncing data, generating reports, and more. As software engineers, we either end up maintaining one of these systems or building one.

The good news is that PostgreSQL makes it super easy to whip one up pretty quickly. Basically, you create a job table, have some workers poll the table for pending jobs, update their status, and you have something that pretty much works.

However, when you add new workers, a worker crashes mid-processing, or your table grows, operating the same system can become very challenging.

In this article, we’ll start with the simplest queue and let each failure mode surface what we need to build next. Let’s begin with a queue jobs table:

```sql
CREATE TABLE queue_jobs (
  id SERIAL PRIMARY KEY,
  queue TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  ...
);
```

And then workers pull from the queue and process the jobs as they transition it through the state machine — processing, completed, failed, etc.

Now comes the first issue. How would workers in a distributed system pull from the queue and process the jobs without race conditions?

---

## The First Race

The first race condition occurs when multiple workers try to process the same job simultaneously.

### a. Naive Approach

The simple strategy is to allow any worker to read the same pending row before any worker changes it.

```sql
SELECT * FROM queue_jobs WHERE 1=1 
AND status = 'pending'
ORDER BY id
LIMIT 1;
```

Try the simulation here:

<CodePen
  link="https://codepen.io/editor/rowlandekemezie/pen/01a02e40-daf9-7217-8e17-abac4e34988b"
  title="01-claim-strategies"
  :default-tab="['css','result']"
  :theme="dark"/>

Start with the naïve strategy and observe the race condition. Expand the ‘view event trace’ to step through the event history.

Apparently, with 4 workers pulling from a queue of 8 pending jobs, all workers end up processing the same job simultaneously, resulting in 24 duplicate executions.

```plaintext
Total duplicate executions:   
  (no. of workers - 1) \* jobs
```

### b. The Lock Strategy

```sql
SELECT * FROM queue_jobs
WHERE status = 'pending'
ORDER BY id
LIMIT 1 FOR UPDATE;
```

Now the duplicate claim is gone, but the workers are serialized behind the same locked row. The limitation here is that competing claim transactions can queue behind the same locked row. Even when other pending jobs exist, Worker B may wait for Worker A’s claim transaction instead of immediately moving to another available row.

```plaintext
t=0  
Queue initialized with 8 pending jobs.  
t=1  
Worker A locks J1 inside its short claim transaction. Workers B, C, D wait on that row.  
t=2  
Worker A commits J1: pending → running. The row lock is released; handler processing continues outside the transaction.  
...  
...  
t=17 Worker D commits J8: pending → running. The row lock is released; handler processing continues outside the transaction.  
t=18 4 handlers complete. Their row locks had already been released when each claim transaction committed.  
t=18 All jobs are complete.
```

### c. The Skip-Locked Strategy

```sql
SELECT * FROM queue_jobs
WHERE status = 'pending'
ORDER BY id
FOR UPDATE SKIP LOCKED
LIMIT 1;
```

The 8 jobs are processed by the workers without duplicate claims or duplicate work.

```plaintext
t=4 All jobs are complete.
t=4 4 jobs complete in parallel.
t=3 4 workers claim 4 different rows. Locked rows are skipped instead of waited on.
t=2 4 jobs complete in parallel.
t=1 4 workers claim 4 different rows. Locked rows are skipped instead of waited on.
t=0 Queue initialized with 8 pending jobs.
```

It’s important to note that the lock is held only during claiming, not during job processing. So, the lock and the transition from `pending` to `running` must happen in the same short transaction. The transaction then commits, releases the row locks, and the handlers process the jobs outside the transaction.

I ran a 100k-job concurrency test, and it completed with 0 duplicate claims and 0 jobs lost. [View the full test results (<VPIcon icon="iconfont icon-github"/>`rowlandekemezie/postgres-queue-demo`)](https://github.com/rowlandekemezie/postgres-queue-demo/blob/main/benchmarks/results/2026-08-23T08-56-41-221Z/concurrency.json).

If we step back from the queue itself and consider what could happen to workers in a distributed system, the first point of failure that comes to mind is when a worker is killed or stops responding.

---

## The Worker Dies

When a worker dies, there has to be a mechanism in place to detect it and handle it gracefully; otherwise, the job can remain stranded in a `running` state indefinitely. Crash is inevitable, so we need to think about a recovery strategy.

### Introduce Lease

A lease is a mechanism that allows a worker to claim a job and hold it for a set period. If the worker dies before the lease expires, the job can be reclaimed by another worker after the lease expires and the system makes it eligible again.

```sql
CREATE TABLE queue_job_state (
  job_id INT PRIMARY KEY, --Also serves as foreign key to the queue_job table
  locked_by TEXT,
  locked_until TIMESTAMP,
  ...
);
```

First, we separated the queue state into its own table so we can track each job’s state independently. I’ll come back to why we use three tables shortly, but for now, I have reduced the number of columns for brevity; you can view the full schema [here (<VPIcon icon="iconfont icon-github"/>`rowlandekemezie/postgres-queue-demo`)](https://github.com/rowlandekemezie/postgres-queue-demo/blob/main/migrations/001_queue.sql).

Click on **run** to see the crash recovery strategy in action.

<CodePen
  link="https://codepen.io/editor/rowlandekemezie/pen/01a03078-4243-7ed2-a4cf-72358f9b6563"
  title="02-crash-recovery-lab"
  :default-tab="['css','result']"
  :theme="dark"/>

The queue recovered from a hard worker loss and completed the job on the second attempt. View the result [here (<VPIcon icon="iconfont icon-github"/>`rowlandekemezie/postgres-queue-demo`)](https://github.com/rowlandekemezie/postgres-queue-demo/blob/main/benchmarks/results/2026-08-23T08-56-41-221Z/crash-recovery.json) to see that the real test actually killed Worker A with SIGKILL, expired its lease, recovered it, and completed through Worker B.

This works, but there’s a hole in the lease expiration mechanism. Hypothetically, Worker A can wake after Worker B has taken over. This can introduce unexpected behavior in which Worker A overwrites Worker B’s status update due to last-write-wins.

### Fencing Token

[Step through this demo (<VPIcon icon="fa-brands fa-codepen"/>`rowlandekemezie`)](https://codepen.io/editor/rowlandekemezie/pen/01a0307b-b77f-7f3f-b60e-c2079a2e129b) to see how lease expiration works and how Worker A can wake up after Worker B has taken over with fencing turned off.

<CodePen
  link="https://codepen.io/editor/rowlandekemezie/pen/01a0307b-b77f-7f3f-b60e-c2079a2e129b"
  title="03-fencing-tokens"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, turn on fencing tokens and see how it prevents Worker A from overwriting Worker B’s status update. The primary design is that the `lease_version` column is used to detect stale writes. So, when Worker A wakes up after Worker B has taken over, its lease version no longer matches the current ownership generation, and the conditional `UPDATE` matches zero rows, so the stale write is rejected.

```sql
CREATE TABLE queue_state (
-- other fields ---
   lease_version INTEGER NOT NULL DEFAULT 0 CHECK (lease_version >= 0),
);
...
```

View the full log [here (<VPIcon icon="iconfont icon-github"/>`rowlandekemezie/postgres-queue-demo`)](https://github.com/rowlandekemezie/postgres-queue-demo/blob/main/benchmarks/results/2026-08-23T08-56-41-221Z/fencing.json).

---

## Idempotency is Necessary

The fencing token prevents an old owner from mutating the state after ownership has been transferred to another worker. It does not protect against external side effects, such as preventing double payments or ensuring that email notifications are sent only once. Imagine Worker A sent out a confirmation email before it died, and Worker B took over and resent it. Worst case, if it’s payment processing. Because the job might require calling external services we don’t control, we need to ensure that email/payment/webhook handlers are idempotent.

---

## Retries Could Drown Your System

Retries are a simple but effective way to handle transient failures. However, if used naively, it can lead to a situation where retries repeatedly fail, and the system is unable to process jobs because resources are exhausted. In our example of sending an email, if the email service is temporarily unavailable, retries could keep retrying indefinitely, consuming resources and potentially causing a retry storm.

Fixed-delay retry is a simple approach in which the system retries after a fixed delay. In our example, we reschedule the job to run at a future date, so it will be retried later after the fixed delay.

The problem with fixed-delay retry is that it does not account for the underlying cause of the failure. If the email service is temporarily unavailable, the system will keep retrying at the same interval, which can lead to a retry storm. A better approach is to use an exponential backoff + jitter strategy, where the system spreads out retries so it does not overwhelm the email service.

<CodePen
  link="https://codepen.io/editor/rowlandekemezie/pen/01a0307e-907c-7f8b-bcd2-370490618cc7"
  title="04-retry-storm"
  :default-tab="['css','result']"
  :theme="dark"/>

[For example (<VPIcon icon="iconfont icon-github"/>`rowlandekemezie/postgres-queue-demo`)](https://github.com/rowlandekemezie/postgres-queue-demo/blob/main/benchmarks/results/2026-08-23T08-56-41-221Z/retry-summary.json), fixed delay peaked at 1,000 retries in one second; full jitter peaked at 58 and spread retries across ~89 seconds instead of 2 seconds.

---

## Keep Immutable Payload from Hot State

You’d notice that there are three tables in our queue system: `queue_jobs`, `queue_attempts`, and `queue_job_state`. You could definitely use a single table depending on your scale, but for now we’re using three separate tables to keep the immutable payload separate from the hot state. One of the key reasons for this design is that mixing high-frequency status updates with the immutable payload in the same database table could negatively impact performance, which we’ll get to in a second, but for now:

- `queue_jobs` is mostly immutable and stores the original job payload
- `queue_job_state` stores job statuses and state transitions
- `queue_attempts` stores execution attempts history

Generally, there are two important trade-offs for the three-table design:

- **To reduce table bloat:** separating large immutable payloads from frequently updated state reduces hot-row width, heap churn, cache pressure, vacuum work, and the size of indexes used by workers. Because job payloads could be large, updating a status field could affect memory efficiency.
- **To improve index scan performance:** Workers need to scan the queue states constantly to see which jobs are pending. By using a dedicated `queue_job_state` table, the database indexes used by workers can remain smaller and focused on the hot claim state, which can improve claim-query efficiency.

---

## Let’s Consider the Index Claim Path

Let’s dig into the index claim path as it’s the critical path for claiming jobs. While running the tests and benchmarking the queue for concurrency, retries, stale workers, and crashes, I wanted to check how expensive it is for workers to claim jobs as the table grows. So, I ran full mutating query under `EXPLAIN(ANALYZE, BUFFERS)` against progressively larger datasets. The [results (<VPIcon icon="iconfont icon-github"/>`rowlandekemezie/postgres-queue-demo`)](https://github.com/rowlandekemezie/postgres-queue-demo/blob/main/benchmarks/results/2026-08-23T08-56-41-221Z/claim-plan-summary.json) were surprising.

This is how expensive I found it’d be to find and claim the next 20 jobs as the queue grows with the `runClaimPlanExperiment` test:

- 1K pending → 1.58 ms
- 10K pending → 5.11 ms
- 100K pending → 53.57 ms
- 1M total / 100K pending → 51.85 ms

This is what the query looks like:

```ts :collapsed-lines title="benchmarks/run.ts"
function getClaimExplainSql(): string {
	return `
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
WITH candidates AS (
	SELECT state.job_id
	FROM queue_job_state AS state
	WHERE state.queue = ANY($1::text[])
		AND state.status = 'pending'
		AND state.run_at <= NOW()
	ORDER BY state.priority DESC, state.run_at ASC, state.job_id ASC
	FOR UPDATE SKIP LOCKED
	LIMIT $2
),
claimed AS (
	UPDATE queue_job_state AS state
	SET status = 'running', attempts = state.attempts + 1,
		lease_version = state.lease_version + 1, locked_by = $3,
		locked_until = NOW() + ($4::bigint * INTERVAL '1 millisecond'), updated_at = NOW()
	FROM candidates
	WHERE state.job_id = candidates.job_id
	RETURNING state.job_id, state.queue, state.priority, state.attempts,
		state.max_attempts, state.lease_version
),
attempts AS (
	INSERT INTO queue_attempts (job_id, lease_version, attempt_index, worker_id, status)
	SELECT claimed.job_id, claimed.lease_version, claimed.attempts, $3, 'running'
	FROM claimed
	RETURNING id AS attempt_id, job_id, lease_version
)
SELECT claimed.job_id, claimed.queue, job.type, job.payload, claimed.priority,
	claimed.attempts, claimed.max_attempts, claimed.lease_version,
	attempts.attempt_id, job.created_at
FROM claimed
JOIN queue_jobs AS job ON job.id = claimed.job_id
JOIN attempts ON attempts.job_id = claimed.job_id
	AND attempts.lease_version = claimed.lease_version
ORDER BY claimed.priority DESC, claimed.job_id ASC
`
}
```

The problem is not **SKIP LOCKED**, nor is it that PostgreSQL ignored the partial index, `queue_job_state_claim_idx`. The problem was that at 1M total rows with 100K pending jobs, the plan used `queue_job_state_claim_idx` through a [<VPIcon icon="fa-brands fa-wikipedia-w"/>bitmap Index Scan](https://en.wikipedia.org/wiki/Bitmap_index) feeding a Bitmap Heap Scan, and then sorting the matching candidates before applying the `LIMIT 20`. This is what it was doing

```md
# What I wanted
ordered index
    ↓
    J1
    J2
    J3
    ...
    J20
    ↓
    STOP


# What was happening
100K matching rows
        ↓
       sort
        ↓
      LIMIT 20
```

You can already see that the query is using `queue_job_state_claim_idx` but not as the ordered top-N index scan that I wanted. So, I went ahead to create a controlled experiment by changing:

```sql
state.queue = ANY($1::text[])
```

to

```sql
state.queue = $1::text
```

The equality change reduced query time from 51.85 ms to 5.307 ms (9.8x faster). The equality version used an ordered index scan on `queue_job_state_claim_idx`.

View the [claim equality control summary (<VPIcon icon="iconfont icon-github"/>`rowlandekemezie/postgres-queue-demo`)](https://github.com/rowlandekemezie/postgres-queue-demo/blob/main/benchmarks/results/2026-08-23T08-56-41-221Z/claim-equality-control-summary.json).

```json
{
  "dataset": "1m-total-100k-pending",
  "predicate": "state.queue = $1::text",
  "planningTimeMs": 3.953,
  "executionTimeMs": 5.307,
  "claimIndexUsed": true,
  "claimScanNodeType": "Index Scan",
  "indexesUsed": [
    "queue_job_state_claim_idx",
    "queue_job_state_pkey",
    "queue_jobs_id_queue_unique"
  ]
}
```

The expensive part turned out to be the candidate-selection portion of the claim query, which reduces to:

```sql
SELECT state.job_id
FROM queue_job_state AS state
WHERE state.queue = ANY($1::text[])
  AND state.status = 'pending'
  AND state.run_at <= NOW()
ORDER BY state.priority DESC, state.run_at, state.job_id
FOR UPDATE SKIP LOCKED
LIMIT 20;
```

What’s even more interesting is the sharp drop in time in the candidate selection step alone: the measured time was 0.323 ms versus 50.281 ms (~155x faster). This data point explains why the equality version is so much faster.

This is a bit of a rabbit hole, but just give me a second, and we’ll get out. First, we need to understand how this impacts the application code. Our index is effectively ordered around:

```sql
queue
priority DESC
run_at
job_id
```

If, for example, PostgreSQL knows that `queue = 'payments'`, it can enter one contiguous section of that ordered index and walk directly toward the first 20 eligible rows, but

```ts
queue = ANY('{payments,email,reports}')
```

is asking PostgreSQL to scan several index ranges for any of the three queue values.

The optimizer cannot use the same simple ordered top-N walk. In our measured case, that pushed it toward collecting a much larger candidate set and sorting it.

Based on the above realization, we had to change our worker API. Originally, our worker API looked like:

```ts
claimJobs({
  queues: ["payments", "email", "reports"],
});
```

After the benchmark, the database primitive should become:

```ts
claimJobs({
  queue: "payments",
});
```

We could still achieve the same effect for a worker that wanted to claim jobs from multiple queues at the application level, possibly with round-robin or weighted scheduling.

```ts
for (const queueName of queues) {
  const jobs = await queue.claimJobs({
    queue: queueName,
    limit: availableCapacity,
  });

  // process claims...
}
```

The important architectural decision is that each database claim operation should target a single queue name at a time. Also, the benchmark exposed how important predicate shape is. An index existing in the schema does not mean PostgreSQL can use it for the access pattern you had in mind.

---

## Putting the Worker Together

Now that you are familiar with the system you probably already use, let’s tie things together. I think the worker is the boring part of the queueing system – it’s the code that actually processes the jobs. It fundamentally follows this sequence:

- Worker starts
- Choose a queue to process
- Claim a batch with FOR UPDATE SKIP LOCKED
- Set lease and increment lease version
- Process with bounded concurrency
- Heartbeat while long-running process
- If success, complete using fencing tokens
- If failure & retryable, use exponential backoff + jitter
- If failure & not retryable, mark as dead

Explore the interactive flow in the playground:

<CodePen
  link="https://codepen.io/editor/rowlandekemezie/pen/01a031a3-c416-780f-b50a-786b7a3fa5af"
  title="05-worker-together"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

PostgreSQL provides most of the primitives needed to build a reliable queue: transactions, row-level locks, durable storage, and indexes. But, as we saw through the failure modes, operating the system as a whole could be challenging.

You may still choose SQS, a Redis-based queue, Kafka, or a mature PostgreSQL queue library instead of building this yourself. But understanding these failure modes makes those systems much less mysterious and makes it easier to recognize when a queue that seems to work could still be unreliable.

```component VPCard
{
  "title": "Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization",
  "desc": "Postgres creates an execution plan for how to retrieve the data you're asking for in a query. The execution plan is based in part on statistics from your data and indexes it has available. Just the right index and a bit of query tuning can have a huge payoff in performance gains that your users will notice.",
  "link": "/blog.master.dev/advanced-postgresql-indexing.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
[![helicopter transporting goods in picos de europa](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/09/pexels-photo-31969278.jpeg?fit=1200%2C801&ssl=1&resize=350%2C200)](https://blog.master.dev/code-portability/ "Code portability")

#### [Code portability](https://blog.master.dev/code-portability/ "Code portability")

Another good one from Nicholas C. Zakas this time on code portability. Here's some choices he made for a recent projects: Astro, because it can be deployed on a "wide range of cloud services" and also supports a variety of front-end frameworks, so you can "start with React and later…

```component VPCard
{
  "title": "Drizzle Database Migrations",
  "desc": "Drizzle ORM is a powerful object-relational mapper that combines SQL capabilities with a strongly typed API, enabling complex queries. Here we'll look at using it's ability to help with migrations, both code-first and database-first.",
  "link": "/blog.master.dev/drizzle-database-migrations.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a Reliable PostgreSQL Queue: Concurrency, Crashes, Retries, and Scale",
  "desc": "We get into building a background task processor using PostgreSQL. It seems easy at first, but there are lots of pitfalls as a system like this scales.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/building-a-reliable-postgresql-queue-concurrency-crashes-retries-and-scale.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
