---
lang: en-US
title: "How to Implement the Outbox Pattern in Go and PostgreSQL"
description: "Article(s) > How to Implement the Outbox Pattern in Go and PostgreSQL"
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
      content: "Article(s) > How to Implement the Outbox Pattern in Go and PostgreSQL"
    - property: og:description
      content: "How to Implement the Outbox Pattern in Go and PostgreSQL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-the-outbox-pattern-in-go-and-postgresql.html
prev: /programming/go/articles/README.md
date: 2026-03-20
isOriginal: false
author:
  - name: Alex Pliutau
    url: https://freecodecamp.org/news/author/pltvs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7a24b5a7-6619-4997-b24c-c4a743f37c33.png
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
  name="How to Implement the Outbox Pattern in Go and PostgreSQL"
  desc="In event-driven systems, two things need to happen when you process a request: you need to save data to your database, and you need to publish an event to a message broker so other services know somet"
  url="https://freecodecamp.org/news/how-to-implement-the-outbox-pattern-in-go-and-postgresql"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7a24b5a7-6619-4997-b24c-c4a743f37c33.png"/>

In event-driven systems, two things need to happen when you process a request: you need to save data to your database, and you need to publish an event to a message broker so other services know something changed.

These two operations look simple, but they hide a dangerous reliability problem. What if the database write succeeds but the message broker is temporarily unreachable? Or your service crashes between the two steps? You end up in an inconsistent state: your database has the new data, but the rest of the system never heard about it.

The **Outbox Pattern** is a well-established solution to this problem. In this tutorial, you'll learn what the pattern is, why it works, and how to implement it in Go with PostgreSQL and Google Cloud Pub/Sub.

::: note Prerequisites

Before reading this tutorial, you should be familiar with:

- The basics of the Go programming language
- SQL and PostgreSQL
- The concept of database transactions
- Basic familiarity with event-driven or distributed systems (helpful but not required)

:::

---

## The Problem: Two Operations, No Atomicity

To understand why the Outbox Pattern exists, you need to understand a core challenge in distributed systems: **atomicity across different systems**.

In a relational database, a **transaction** lets you group multiple operations so they either all succeed or all fail together. If you insert a row and update another row in the same transaction, you're guaranteed that both happen – or neither does.

The problem arises when you try to extend this guarantee *across two different systems:* for example, your database and your message broker (like Kafka, RabbitMQ, or Pub/Sub). These systems don't share a transaction boundary.

Here's a typical event-driven flow that breaks without the Outbox Pattern:

1. A user places an order.
2. Your service saves the order to the database ✅
3. Your service publishes an `order.created` event to the message broker ❌ (broker is down)
4. The order exists in the database, but downstream services never learned about it.

Or the reverse failure:

1. Your service publishes the event first ✅
2. Your service tries to save the order to the database ❌ (database times out)
3. Downstream services received a notification for an order that doesn't exist.

Either scenario leaves your system in an inconsistent state. This is the core problem the Outbox Pattern solves.

Here's what the process looks like when not using the Outbox Pattern:

![diagram without outbox](https://cdn.hashnode.com/uploads/covers/5ea89c91fdc930d846b413ab/9f9abcaa-adc8-48ab-b8cb-c47cb731724e.png)
<!-- TODO: mermaid화 -->
---

## How the Outbox Pattern Works

The Outbox Pattern solves the atomicity problem by keeping both operations *inside* the database:

1. Saves your business data (for example, a new order) to your database.
2. Writes the event message to a special table called the outbox table in the same database transaction.
3. A separate background process called the Message Relay polls the outbox table and publishes pending messages to the broker.
4. Once the broker confirms receipt, the relay marks the message as processed.

Because steps 1 and 2 happen in the same database transaction, they are **atomic**. Either both succeed or neither does. You can never end up with saved data but no corresponding event queued – or an event queued for data that was never saved.

The message is never published directly to the broker in your main application code. Instead, the database acts as a reliable staging area.

![diagram with outbox](https://cdn.hashnode.com/uploads/covers/5ea89c91fdc930d846b413ab/ef5413b0-6c8e-42b8-949f-5eefe3844231.png)
<!-- TODO: mermaid화 -->

---

## The Outbox Table Schema

The outbox table stores pending messages until the relay picks them up. Here's a typical PostgreSQL schema:

```sql
CREATE TABLE outbox (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    topic       varchar(255)  NOT NULL,
    message     jsonb         NOT NULL,
    state       varchar(50)   NOT NULL DEFAULT 'pending',
    created_at  timestamptz   NOT NULL DEFAULT now(),
    processed_at timestamptz
);
```

::: info Let's walk through each column:

- `id`: A unique identifier for each message. Using UUIDs makes it easy to reference specific messages.
- `topic`: The destination topic or queue name in your message broker (for example, `orders.created`).
- `message`: The event payload, stored as JSON. This is the data your consumers will receive.
- `state`: Tracks whether the message has been sent. The two main values are `pending` (waiting to be published) and `processed` (successfully published).
- `created_at`: When the message was inserted. The relay uses this to process messages in order.
- `processed_at`: When the relay successfully published the message.

:::

You may want to add additional columns depending on your needs: for example, a `retry_count` column to track how many times the relay has attempted to send a message, or an `error` column to log failure reasons.

---

## The Message Relay

The Message Relay is a background process (often a goroutine, a sidecar, or a separate service) that bridges the outbox table and the message broker.

Its responsibilities are:

1. Periodically query the outbox table for messages with `state = 'pending'`.
2. Publish each message to the appropriate topic in the broker.
3. Once the broker confirms delivery, update the row's `state` to `'processed'`.
4. Handle failures gracefully: if publishing fails, leave the message as `'pending'` so it will be retried.

This design gives you **at-least-once delivery**: a message will always be sent, even if the relay crashes and restarts. The trade-off is that a message might occasionally be sent more than once (more on this below), so your consumers should handle duplicates.

---

## Go and PostgreSQL Implementation

Let's build a concrete example. Imagine you have an orders service. When a new order is created, you want to:

1. Save the order to a PostgreSQL `orders` table.
2. Publish an `order.created` event to Google Cloud Pub/Sub.

You'll use [<VPIcon icon="iconfont icon-github" />`jackc/pgx`](https://github.com/jackc/pgx) for the PostgreSQL driver.

### The Orders Service

The key insight is that the order insert and the outbox insert happen **inside the same transaction**. If anything goes wrong, both are rolled back.

```go :collapsed-lines title="orders/main.go"
package main

import (
    "context"
    "encoding/json"
    "log"
    "os"

    "github.com/google/uuid"
    "github.com/jackc/pgx/v5"
    "github.com/jackc/pgx/v5/pgxpool"
)

// Order represents a customer order in our system.
type Order struct {
    ID       uuid.UUID `json:"id"`
    Product  string    `json:"product"`
    Quantity int       `json:"quantity"`
}

// OrderCreatedEvent is the payload published to the message broker.
// It contains only the fields that downstream services need to know about.
type OrderCreatedEvent struct {
    OrderID uuid.UUID `json:"order_id"`
    Product string    `json:"product"`
}

// createOrderInTx saves a new order and its outbox event atomically.
// Both operations share the same transaction (tx), so either both succeed
// or both are rolled back — ensuring consistency.
func createOrderInTx(ctx context.Context, tx pgx.Tx, order Order) error {
    // Step 1: Insert the business data (the actual order).
    _, err := tx.Exec(ctx,
        "INSERT INTO orders (id, product, quantity) VALUES (\(1, \)2, $3)",
        order.ID, order.Product, order.Quantity,
    )
    if err != nil {
        return err
    }
    log.Printf("Inserted order %s into database", order.ID)

    // Step 2: Serialize the event payload that consumers will receive.
    event := OrderCreatedEvent{
        OrderID: order.ID,
        Product: order.Product,
    }
    msg, err := json.Marshal(event)
    if err != nil {
        return err
    }

    // Step 3: Write the event to the outbox table.
    // This does NOT publish to Pub/Sub — it just queues it for the relay.
    _, err = tx.Exec(ctx,
        "INSERT INTO outbox (topic, message) VALUES (\(1, \)2)",
        "orders.created", msg,
    )
    if err != nil {
        return err
    }
    log.Printf("Inserted outbox event for order %s", order.ID)

    return nil
}

func main() {
    ctx := context.Background()

    pool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
    if err != nil {
        log.Fatalf("Unable to connect to database: %v", err)
    }
    defer pool.Close()

    // Begin a transaction that will cover both the order insert
    // and the outbox insert.
    tx, err := pool.Begin(ctx)
    if err != nil {
        log.Fatalf("Unable to begin transaction: %v", err)
    }
    // If anything fails, the deferred Rollback is a no-op after a successful Commit.
    defer tx.Rollback(ctx)

    newOrder := Order{
        ID:       uuid.New(),
        Product:  "Super Widget",
        Quantity: 10,
    }

    if err := createOrderInTx(ctx, tx, newOrder); err != nil {
        log.Fatalf("Failed to create order: %v", err)
    }

    // Committing the transaction makes both writes permanent simultaneously.
    if err := tx.Commit(ctx); err != nil {
        log.Fatalf("Failed to commit transaction: %v", err)
    }

    log.Println("Successfully created order and queued outbox event.")
}
```

Notice that `createOrderInTx` receives a `pgx.Tx` (a transaction) rather than a pool connection. This is intentional: it enforces that the caller is responsible for managing the transaction boundary, making the atomicity guarantee explicit.

### The Relay Service

The relay runs as a separate background process. It polls the outbox table, publishes messages, and marks them as processed.

A critical detail here is the use of `FOR UPDATE SKIP LOCKED` in the SQL query. This PostgreSQL feature lets you run **multiple relay instances** concurrently without them stepping on each other. When one instance locks a row to process it, other instances skip that row and move on to the next one.

```go :collapsed-lines title="relay/main.go"

package main

import (
    "context"
    "log"
    "time"

    "cloud.google.com/go/pubsub"
    "github.com/google/uuid"
    "github.com/jackc/pgx/v5/pgxpool"
)

// OutboxMessage mirrors the columns we need from the outbox table.
type OutboxMessage struct {
    ID      uuid.UUID
    Topic   string
    Message []byte
}

// processOutboxMessages picks up one pending message, publishes it to Pub/Sub,
// and marks it as processed — all within a single database transaction.
func processOutboxMessages(ctx context.Context, pool *pgxpool.Pool, pubsubClient *pubsub.Client) error {
    tx, err := pool.Begin(ctx)
    if err != nil {
        return err
    }
    defer tx.Rollback(ctx)

    // Query for the next pending message.
    // FOR UPDATE SKIP LOCKED ensures that if multiple relay instances are
    // running, they won't try to process the same message simultaneously.
    rows, err := tx.Query(ctx, `
        SELECT id, topic, message
        FROM outbox
        WHERE state = 'pending'
        ORDER BY created_at
        LIMIT 1
        FOR UPDATE SKIP LOCKED
    `)
    if err != nil {
        return err
    }
    defer rows.Close()

    var msg OutboxMessage
    if rows.Next() {
        if err := rows.Scan(&msg.ID, &msg.Topic, &msg.Message); err != nil {
            return err
        }
    } else {
        // No pending messages — nothing to do.
        return nil
    }

    log.Printf("Publishing message %s to topic %s", msg.ID, msg.Topic)

    // Publish the message to the Pub/Sub topic and wait for confirmation.
    result := pubsubClient.Topic(msg.Topic).Publish(ctx, &pubsub.Message{
        Data: msg.Message,
    })
    if _, err = result.Get(ctx); err != nil {
        // Publishing failed. We return the error here without committing,
        // so the transaction rolls back and the message stays 'pending'.
        // The relay will retry it on the next polling interval.
        return err
    }

    // Mark the message as processed now that the broker has confirmed receipt.
    _, err = tx.Exec(ctx,
        "UPDATE outbox SET state = 'processed', processed_at = now() WHERE id = $1",
        msg.ID,
    )
    if err != nil {
        return err
    }
    log.Printf("Marked message %s as processed", msg.ID)

    // Commit the transaction: the state update becomes permanent.
    return tx.Commit(ctx)
}

func main() {
    // In production, initialize real connections using environment variables
    // or a config file. These are left as placeholders for clarity.
    var (
        pool         *pgxpool.Pool
        pubsubClient *pubsub.Client
    )

    // Poll the outbox table every second.
    // Adjust the interval based on your latency requirements.
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    for range ticker.C {
        if err := processOutboxMessages(context.Background(), pool, pubsubClient); err != nil {
            log.Printf("Error processing outbox: %v", err)
        }
    }
}
```

The polling interval (1 second in this example) controls the maximum latency between an event being written to the outbox and it being published to the broker. For most use cases, 1–5 seconds is perfectly acceptable. If you need lower latency, you can reduce the interval, or consider using PostgreSQL's `LISTEN/NOTIFY` feature to wake up the relay immediately when a new row is inserted.

---

## Why Messages Can Be Delivered More Than Once

You might wonder: isn't the Outbox Pattern supposed to guarantee *exactly once* delivery?

It does not. It guarantees **at-least-once** delivery. Here's the edge case:

1. The relay publishes the message to Pub/Sub successfully.
2. Before it can update the outbox row to `'processed'`, the relay process crashes.
3. On restart, the relay sees the message is still `'pending'` and publishes it again.

This is a rare but possible scenario. The standard way to handle it is to design your message **consumers to be idempotent**. This means that they can safely receive and process the same message multiple times without causing incorrect behavior.

Common strategies for idempotency include:

- Using the message's `id` as a deduplication key, and checking if you've already processed it before acting.
- Making your operations naturally idempotent. For example, using `INSERT ... ON CONFLICT DO NOTHING` instead of a plain `INSERT`.

---

## Alternative: PostgreSQL Logical Replication

The polling approach described above is simple and works well, but it has two drawbacks: it introduces some latency (up to one polling interval), and it issues database queries even when there's nothing to process.

For high-throughput systems where these trade-offs matter, PostgreSQL offers a more advanced alternative: **logical replication** via the **Write-Ahead Log (WAL)**.

Every change made to a PostgreSQL database is first written to the WAL – an append-only log used for crash recovery and replication. With logical replication, you can subscribe to changes in specific tables and receive them as a stream in near real-time.

Instead of your relay asking "Are there any new messages?" on a schedule, PostgreSQL will proactively notify your relay the moment a new row is inserted into the outbox table.

This approach is lower latency and more resource-efficient for high-volume workloads. The trade-off is added implementation complexity: you need to manage a replication slot in PostgreSQL and handle the WAL stream correctly.

In Go, you can use the [<VPIcon icon="iconfont icon-github" />`jackc/pglogrepl`](https://github.com/jackc/pglogrepl) library to interact with PostgreSQL's logical replication protocol.

For more details on how WAL and change data capture work in PostgreSQL, see the [<VPIcon icon="iconfont icon-postgresql"/>official Write-Ahead Logging documentation](https://postgresql.org/docs/current/wal-intro.html).

![diagram with WAL](https://cdn.hashnode.com/uploads/covers/5ea89c91fdc930d846b413ab/c706cc8f-6bbd-49d1-90c0-8c4934c2718e.png)
<!-- TODO: mermaid화 -->

---

## Conclusion

The Outbox Pattern solves a fundamental problem in distributed systems: how do you reliably perform a database write and publish a message to a broker in a consistent way?

The key idea is to use your database as the source of truth for *both* the business data and the pending messages. By writing to the outbox table in the same transaction as your business data, you get atomic guarantees from the database itself: no distributed transaction protocol required.

Here's a quick summary of the key concepts:

- **The outbox table** stores pending events as part of your regular database schema.
- **The transaction** wraps both the business write and the outbox write, making them atomic.
- **The Message Relay** is a background process that reads from the outbox and publishes to the broker.
- **At-least-once delivery** means your consumers must be idempotent.
- `FOR UPDATE SKIP LOCKED` allows multiple relay instances to run safely in parallel.
- **Logical replication** is an advanced alternative that avoids polling for high-throughput systems.

The pattern is simple in concept, but there are several ways to implement it depending on your scale and infrastructure. The polling approach shown in this tutorial is a solid starting point for most applications.

::: info Resources

<SiteInfo
  name="packagemain/outbox at main · plutov/packagemain"
  desc="Collection of materials for my Youtube Channel about Go - plutov/packagemain"
  url="https://github.com/plutov/packagemain/tree/main/outbox/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b4ed312e4aec4613c0cb8cab147b79b4691c29e73f9e8941749aba23c0dc6b32/plutov/packagemain"/>

<SiteInfo
  name="28.3. Write-Ahead Logging (WAL)"
  desc="28.3. Write-Ahead Logging (WAL) Write-Ahead Logging (WAL) is a standard method for ensuring data integrity. A detailed description can be …"
  url="https://postgresql.org/docs/18/wal-intro.html/"
  logo="https://postgresql.org/favicon.ico"
  preview="https://postgresql.org/media/img/about/press/elephant.png"/>

<SiteInfo
  name="jackc/pglogrepl"
  desc="PostgreSQL logical replication library for Go."
  url="https://github.com/jackc/pglogrepl/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/573944300e90c57feae8da631323bf54afe6f991d7b133af1bfc10d733fd2479/jackc/pglogrepl"/>

<SiteInfo
  name="jackc/pgx"
  desc="PostgreSQL driver and toolkit for Go."
  url="https://github.com/jackc/pgx/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/fe5801b026c94065a9c93b3a8623e9cca266701455dc1bbd17145f8d01afa55e/jackc/pgx"/>

<SiteInfo
  name="packagemain.tech | Alex Pliutau | Substack"
  desc="Hands-on, practical and real-world tutorials that you can use to build your software development skills. Main topics: Backend, Databases, Software Architecture, DevOps, Distributed Systems, APIs. Click to read packagemain.tech, a Substack publication with tens of thousands of subscribers."
  url="https://packagemain.tech/"
  logo="https://substackcdn.com/image/fetch/$s_!_EdA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2ea54e25-eaa6-4630-bfc0-10b8cfdce894%2Ffavicon-48x48.png"
  preview="https://substackcdn.com/image/fetch/$s_!3xfL!,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fpackagemain.substack.com%2Ftwitter%2Fsubscribe-card.jpg%3Fv%3D1166708614%26version%3D9"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement the Outbox Pattern in Go and PostgreSQL",
  "desc": "In event-driven systems, two things need to happen when you process a request: you need to save data to your database, and you need to publish an event to a message broker so other services know somet",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-the-outbox-pattern-in-go-and-postgresql.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
