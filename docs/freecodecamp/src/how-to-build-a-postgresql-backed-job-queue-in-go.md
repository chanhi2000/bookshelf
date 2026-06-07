---
lang: en-US
title: "How to Build a PostgreSQL-Backed Job Queue in Go"
description: "Article(s) > How to Build a PostgreSQL-Backed Job Queue in Go"
icon: fa-brands fa-golang
category:
  - Go
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a PostgreSQL-Backed Job Queue in Go"
    - property: og:description
      content: "How to Build a PostgreSQL-Backed Job Queue in Go"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-postgresql-backed-job-queue-in-go.html
prev: /articles/README.md
date: 2026-06-10
isOriginal: false
author:
  - name: timothy ogbemudia
    url: https://freecodecamp.org/news/author/glamboyosa/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f16f87ae-8900-40e9-ba3b-64bf50cc1fe1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
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
  name="How to Build a PostgreSQL-Backed Job Queue in Go"
  desc="When you build a web application, not every task should happen inside a user's request. Some work is slow. Some work can fail. Some work should happen later. Sending emails, resizing images, processin"
  url="https://freecodecamp.org/news/how-to-build-a-postgresql-backed-job-queue-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f16f87ae-8900-40e9-ba3b-64bf50cc1fe1.png"/>

When you build a web application, not every task should happen inside a user's request.

Some work is slow. Some work can fail. Some work should happen later. Sending emails, resizing images, processing webhooks, generating reports, and retrying third-party APIs are all good examples.

These tasks are usually handled by a background job system.

In this article, you'll use an open source Go project called [<VPIcon icon="iconfont icon-github"/>`glamboyosa/swig`](https://github.com/glamboyosa/swig) as a practical example of how a PostgreSQL-backed job queue works in practice.

By the end, you'll understand how to build a background job queue with Go and PostgreSQL, and why PostgreSQL is more capable than most developers realize.

::: note Prerequisites

To follow along, you should have:

- Basic familiarity with Go (structs, interfaces, goroutines)
- A working understanding of PostgreSQL and SQL
- Go installed (1.21 or later)
- A PostgreSQL instance available locally or remotely

:::

::: info What You Will Learn

- How to represent and store jobs in PostgreSQL
- How to claim jobs safely across concurrent workers using `FOR UPDATE SKIP LOCKED`
- How to wake workers efficiently using `LISTEN/NOTIFY`
- How to elect a leader across instances using advisory locks
- How Go interfaces, goroutines, contexts, and transactions fit together in a real system

:::

---

## What Is a Job Queue?

A job queue is a system that stores work to be done later.

Your application adds a job to the queue. A worker takes a job from the queue and runs it.

For example, when a user signs up, your application might create the user immediately and then add a job like this:

```json
{
  "kind": "send_welcome_email",
  "payload": {
    "to": "user@example.com",
    "subject": "Welcome!"
  }
}
```

A background worker later picks up that job and sends the email. This keeps the user request fast. The signup route doesn't need to wait for the email provider before returning a response.

A job queue usually needs to answer a few important questions:

- Where are jobs stored?
- How do workers find jobs?
- How do you stop two workers from processing the same job?
- How do you retry failed jobs?
- How do you shut workers down safely?
- How do you keep job creation consistent with application data?

Swig answers those questions with Go and PostgreSQL.

---

## Why Use PostgreSQL for a Queue?

Many job queues use Redis, RabbitMQ, SQS, or Kafka. Those are all useful tools. But many applications already depend on PostgreSQL. If your app already has Postgres, you may not want to operate another service just to run background jobs.

PostgreSQL gives you several features that are surprisingly useful for queues:

- Tables for durable job storage
- Transactions for atomic writes
- Row locks for safe concurrent processing
- `SKIP LOCKED` for letting workers claim different jobs
- `LISTEN/NOTIFY` for waking workers when new jobs arrive
- Advisory locks for leader election
- JSONB for flexible job payloads

The tradeoff is important. A PostgreSQL-backed queue isn't trying to replace Kafka for event streaming or RabbitMQ for complex routing. It makes common application background jobs simple, reliable, and easy to operate without adding infrastructure.

---

## Swig's Architecture

At a high level, Swig has five parts:

1. A `swig_jobs` table in PostgreSQL
2. Go workers that process jobs
3. A worker registry that maps job names to worker types
4. A driver layer that supports both `pgx` and `database/sql`
5. A leader loop for shared maintenance work

The basic flow looks like this:

1. Your app calls `AddJob`
2. Swig serializes the job payload to JSON
3. Swig inserts a row into `swig_jobs`
4. PostgreSQL sends a notification that a job was created
5. A Go worker wakes up and tries to claim one pending job
6. PostgreSQL row locks ensure only one worker claims that row
7. The worker runs the job
8. Swig marks the job as completed or failed

The hard parts are concurrency, failure, connection lifecycle, and shutdown. That's where Go and PostgreSQL work together.

---

## How to Represent Jobs in PostgreSQL

A simplified version of Swig's job table looks like this:

```sql
CREATE TABLE swig_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind TEXT NOT NULL,
  queue TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  priority INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  scheduled_for TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  instance_id UUID,
  worker_id UUID,
  locked_at TIMESTAMPTZ,
  last_error TEXT,
  last_error_at TIMESTAMPTZ
);
```

Each row is one job. The important columns are:

- `kind`: the type of job, such as `send_email`
- `payload`: the JSON data needed to run the job
- `status`: whether the job is pending, processing, completed, or failed
- `attempts`: how many times the job has been tried
- `scheduled_for`: when the job is allowed to run
- `locked_at`: when the job was claimed

The table is the source of truth. PostgreSQL notifications can wake workers, but notifications aren't the durable queue. The rows in `swig_jobs` are.

---

## How to Define a Worker in Go

In Swig, a worker is a Go type that knows how to process one kind of job.

Here's a simple email worker:

```go
type EmailWorker struct {
    To      string `json:"to"`
    Subject string `json:"subject"`
    Body    string `json:"body"`
}

func (w *EmailWorker) JobName() string {
    return "send_email"
}

func (w *EmailWorker) Process(ctx context.Context) error {
    fmt.Printf("Sending email to %s with subject %s\n", w.To, w.Subject)
    return nil
}
```

There are two important methods:

- `JobName` tells Swig what kind of job this worker handles
- `Process` contains the actual work

The struct fields are also the job arguments. When you enqueue an `EmailWorker`, Swig serializes the struct into JSON and stores it in PostgreSQL. Later, a worker claims the row, unmarshals the JSON back into a fresh `EmailWorker`, and calls `Process`.

### Go Interfaces

Go interfaces describe behavior. Swig doesn't need to know the exact concrete type of every worker. It only needs to know that a worker can provide a job name and process a job:

```go
type Worker interface {
    JobName() string
    Process(context.Context) error
}
```

If a type has those methods, it satisfies the interface with no explicit declaration required. This is one of the reasons interfaces are so useful in Go. They let you design around behavior instead of inheritance.

---

## How to Register Workers Without Sharing State

Swig has a worker registry that maps a job name to a worker type:

```go
registry := workers.NewWorkerRegistry()
registry.RegisterWorker(&EmailWorker{})
```

Later, when a job row says `kind = 'send_email'`, Swig looks up the registered worker and runs it.

There's a subtle concurrency issue here. If the registry stored the exact `&EmailWorker{}` pointer and reused it for every job, multiple goroutines could unmarshal payloads into the same Go value at the same time.

Swig avoids this with a factory approach internally. Registration captures the worker type, and each claimed job gets a fresh worker instance before JSON is unmarshaled. The API stays simple, but internally Swig creates a new `EmailWorker` for each job. This is a useful Go pattern: keep the public API simple while making the internal lifecycle safer.

---

## How to Add a Job

Here's what adding a job looks like from the user side:

```go
err := swigClient.AddJob(ctx, &EmailWorker{
    To:      "user@example.com",
    Subject: "Welcome!",
    Body:    "Thanks for signing up.",
})
```

Inside Swig, the process is roughly:

```go
argsJSON, err := json.Marshal(workerWithArgs)
if err != nil {
    return err
}

_, err = db.ExecContext(ctx, `
    INSERT INTO swig_jobs (kind, queue, payload, priority, scheduled_for, status)
    VALUES (\(1, \)2, \(3, \)4, $5, 'pending')
`, jobName, queue, argsJSON, priority, runAt)
```

### How to Enqueue Jobs Inside Transactions

One of the best reasons to use PostgreSQL for jobs is transactional enqueueing.

Imagine a user signs up. You want to insert the user and queue a welcome email. If those happen separately, you can get inconsistent states. With a transaction, both succeed or both fail:

```go
tx, err := pool.Begin(ctx)
if err != nil {
    return err
}
defer tx.Rollback(ctx)

_, err = tx.Exec(ctx, `INSERT INTO users (email) VALUES ($1)`, email)
if err != nil {
    return err
}

err = swigClient.AddJobWithTx(ctx, tx, &EmailWorker{
    To:      email,
    Subject: "Welcome!",
    Body:    "Thanks for joining.",
})
if err != nil {
    return err
}

return tx.Commit(ctx)
```

If the transaction rolls back, the user isn't created and the job isn't queued. This is much harder to guarantee when your database and queue are separate systems.

---

## How to Handle Multiple Workers Safely

A queue gets interesting when many workers run at the same time. Imagine three workers all asking PostgreSQL for the next pending job. You don't want all three to process the same job.

A naïve approach has a race condition. Two workers can select the same job before either one updates it.

### PostgreSQL FOR UPDATE SKIP LOCKED

PostgreSQL can lock rows selected inside a transaction. `FOR UPDATE` means "lock this row because I plan to update it." `SKIP LOCKED` means "if another worker already locked a row, skip it and find another one."

This is perfect for a queue:

- Worker A locks job 1
- Worker B skips job 1 and locks job 2
- Worker C skips jobs 1 and 2 and locks job 3

No central coordinator is needed. Swig uses an atomic update pattern:

```sql
UPDATE swig_jobs
SET status = 'processing',
    instance_id = $1,
    worker_id = $2,
    locked_at = NOW(),
    attempts = attempts + 1
WHERE id = (
  SELECT id
  FROM swig_jobs
  WHERE status = 'pending'
    AND scheduled_for <= NOW()
  ORDER BY priority DESC, created_at
  FOR UPDATE SKIP LOCKED
  LIMIT 1
)
RETURNING id, kind, payload;
```

This query finds a pending job, skips already-locked jobs, marks it as processing, records which worker claimed it, and returns the job data. All of this happens atomically. Workers never do a separate `SELECT` and hope the later `UPDATE` is still safe.

---

## How to Use Goroutines for Concurrent Workers

Swig starts worker loops as goroutines:

```go
for i := 0; i < maxWorkers; i++ {
    go s.startWorker(ctx, queueType)
}
```

Each worker runs independently. PostgreSQL coordinates which job each worker gets. Go handles concurrency with goroutines, while PostgreSQL handles safe job claiming with locks.

### How to Handle Graceful Shutdown

When a service shuts down, it should wait for workers to finish cleanly. Go's `sync.WaitGroup` helps:

```go
var wg sync.WaitGroup

wg.Add(1)
go func() {
    defer wg.Done()
    processJobs()
}()

wg.Wait()
```

Swig also uses `sync.Once` to make shutdown idempotent. Calling `Stop` more than once shouldn't panic because of a double channel close. Shutdown paths are often where production systems behave differently from happy-path demos.

---

## How to Wake Workers with LISTEN/NOTIFY

If workers constantly poll the database for jobs, they waste resources when the queue is empty. PostgreSQL has `LISTEN/NOTIFY` to solve this.

A connection can listen on a channel:

```sql
LISTEN swig_jobs;
```

Another session can send a notification:

```sql
NOTIFY swig_jobs, '{"id":"job-id"}';
```

Swig creates a trigger so PostgreSQL sends a notification after a job is inserted. Workers sleep when there's no work and wake when a new job arrives.

There's an important PostgreSQL detail here: `LISTEN` is session-scoped. A worker must wait for notifications on the same database session that executed `LISTEN`. Swig handles this by creating a dedicated listener for each worker that owns one database session throughout its lifecycle.

This is a common backend engineering lesson: abstractions like connection pools are useful, but some database features depend on the lifecycle of a specific connection.

---

## How to Elect a Leader with Advisory Locks

Some queue maintenance tasks should only run on one instance at a time, including retrying failed jobs, recovering stale jobs, and cleaning old history.

Swig uses PostgreSQL advisory locks for this:

```sql
SELECT pg_try_advisory_lock($1);
```

If the result is true, that Swig instance becomes the leader. Advisory locks are also session-scoped, so Swig uses a dedicated advisory-lock connection for leadership. If that session ends, PostgreSQL releases the lock and another instance can take over. Simple failover without ZooKeeper or etcd.

---

## How to Handle Failed Jobs

When a worker returns an error, Swig records the error and either retries the job or marks it as failed:

```sql
UPDATE swig_jobs
SET status = CASE
    WHEN attempts >= max_attempts THEN 'failed'
    ELSE 'pending'
  END,
  last_error = $2,
  last_error_at = NOW()
WHERE id = $1;
```

### A Note on Delivery Semantics

It's tempting to say a job queue processes jobs exactly once. In distributed systems, that's a dangerous claim.

Consider this scenario:

1. A worker sends an email
2. The worker crashes before marking the job completed
3. The job is retried
4. The email might be sent again

The accurate description is that Swig provides atomic claiming and at-least-once processing. Because jobs can be retried, workers should be idempotent. Running the same operation more than once should produce the same result as running it once.

---

## How to Abstract the Database Driver

Swig supports both `pgx` and `database/sql` through a driver interface:

```go
type Driver interface {
    Exec(ctx context.Context, sql string, args ...interface{}) error
    Query(ctx context.Context, sql string, args ...interface{}) (Rows, error)
    QueryRow(ctx context.Context, sql string, args ...interface{}) Row
    WithTx(ctx context.Context, fn func(tx Transaction) error) error
    NewListener(ctx context.Context, channel string) (Listener, error)
    TryAdvisoryLock(ctx context.Context, lockID int64) (AdvisoryLock, bool, error)
}
```

The core queue code only depends on behavior, not a specific library. This is a common Go design: define the behavior your core package needs, write small adapters for concrete dependencies, and keep the core logic independent.

---

## Conclusion

A PostgreSQL-backed queue isn't the right answer for every system. If you need massive event streaming, Kafka may be a better fit. If you need complex routing, RabbitMQ may be better.

But for many Go applications, PostgreSQL is already there. Swig shows how far you can get with a small Go API and a few PostgreSQL features:

- Store jobs in a table
- Claim jobs atomically with `FOR UPDATE SKIP LOCKED`
- Wake workers with dedicated `LISTEN/NOTIFY` sessions
- Coordinate leadership with advisory locks
- Keep app data and jobs consistent with transactions
- Manage worker lifecycles with goroutines and contexts

::: info

That combination makes a solid foundation for background processing and a great project for learning how Go and PostgreSQL work together in production systems. You can explore the full source code at [<VPIcon icon="iconfont icon-github"/>`glamboyosa/swig`](https://github.com/glamboyosa/swig).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a PostgreSQL-Backed Job Queue in Go",
  "desc": "When you build a web application, not every task should happen inside a user's request. Some work is slow. Some work can fail. Some work should happen later. Sending emails, resizing images, processin",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-postgresql-backed-job-queue-in-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
