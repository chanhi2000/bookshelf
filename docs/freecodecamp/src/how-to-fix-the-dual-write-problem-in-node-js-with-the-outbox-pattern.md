---
lang: en-US
title: "How to Fix the Dual-Write Problem in Node.js with the Outbox Pattern"
description: "Article(s) > How to Fix the Dual-Write Problem in Node.js with the Outbox Pattern"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Fix the Dual-Write Problem in Node.js with the Outbox Pattern"
    - property: og:description
      content: "How to Fix the Dual-Write Problem in Node.js with the Outbox Pattern"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fix-the-dual-write-problem-in-node-js-with-the-outbox-pattern.html
prev: /programming/js-express/articles/README.md
date: 2026-08-06
isOriginal: false
author:
  - name: Gabor Koos
    url: https://freecodecamp.org/news/author/gkoos/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bcec9aaf-d418-4e5a-b8aa-f3c75b35f482.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
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
  name="How to Fix the Dual-Write Problem in Node.js with the Outbox Pattern"
  desc="Imagine you're building an e-commerce platform where placing an order needs to trigger several things at once: the warehouse has to be told to prepare the shipment, the email service has to send a con"
  url="https://freecodecamp.org/news/how-to-fix-the-dual-write-problem-in-node-js-with-the-outbox-pattern"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bcec9aaf-d418-4e5a-b8aa-f3c75b35f482.png"/>

Imagine you're building an e-commerce platform where placing an order needs to trigger several things at once: the warehouse has to be told to prepare the shipment, the email service has to send a confirmation, and the fraud checker has to review the transaction.

The order service handles the checkout, saves the order to its database, and then publishes an `order.created` event to a message queue so every downstream system can react independently.

This is a common and reasonable design, but it has a reliability problem that's easy to miss until something goes wrong in production.

When a customer places an order and the payment goes through, the application needs to do two things: save the order to the database and publish the event to the queue. These are two separate writes to two separate systems, and there's no way to make them share a single atomic transaction. If the process crashes, the network hiccups, or a deployment rolls out between the two writes, one side commits and the other does not. The order sits confirmed on the customer's screen while the warehouse has no idea it exists.

The [<VPIcon icon="fas fa-globe"/>transactional outbox pattern](https://microservices.io/patterns/data/transactional-outbox.html) is the standard solution to this problem. In this article, we'll build it from scratch in Node.js, using PostgreSQL for the order service database, SQS for the queue, and DynamoDB as the fulfillment service's database. For local development, we'll use [<VPIcon icon="fas fa-globe"/>floci](https://floci.io), a free open-source AWS emulator that runs all three with a single Docker container.

::: note Prerequisites

To follow along, you should be comfortable with:

- Node.js and async/await
- Database transactions (BEGIN, COMMIT, ROLLBACK)
- The general concept of a message queue

You don't need prior experience with AWS, SQS, or DynamoDB. We'll be running everything locally.

You will need Node.js 20 or later and Docker installed on your machine.

:::

---

## The Problem with Two Writes

The order service scenario from the intro is one place this problem appears, but the same pattern comes up in many other contexts.

A user registers and the app inserts their account record, then sends a message to trigger the welcome email and the onboarding workflow. A file is uploaded and the API writes the metadata to the database, then publishes a message to kick off a processing worker for virus scanning or thumbnail generation. A payment webhook arrives, the handler records it in the database, then notifies downstream services that the payment is confirmed.

In every case, the application needs two writes to succeed together: one to the database and one to a queue or external system. If the second one is lost, the first one has no way of knowing.

If you want a deeper look at what database transactions actually guarantee and where they stop helping, see [<VPIcon icon="fas fa-globe"/>Beyond Happy Path Engineering: Databases](https://blog.gaborkoos.com/posts/2026-08-01-Beyond-Happy-Path-Engineering-Databases/).

The naïve implementation looks straightforward:

```js
await db.query('INSERT INTO orders (customer_id, amount_cents) VALUES ($1, $2)', [customerId, amountCents]);
await sqs.send(new SendMessageCommand({ QueueUrl: QUEUE_URL, MessageBody: JSON.stringify({ customerId, amountCents }) }));
```

The database write happens first, then the queue write. Under normal conditions this works fine. The problem is what happens when something goes wrong between the two.

If the process crashes, runs out of memory, or gets killed mid-deployment after the database write but before `sqs.send` is called, the order record exists in the database but no event is ever published. The warehouse, email service, and fraud checker never find out the order happened. From the customer's perspective the order went through. From every downstream system's perspective it doesn't exist.

The failure can also go the other way. If `sqs.send` succeeds but the database write is later rolled back due to a constraint violation or an error in a subsequent step, you've published an event for an order that doesn't actually exist. A consumer acting on that event may try to fulfill an order with no corresponding record, or charge a customer for something that was never saved.

There's also a timing window even when both writes eventually succeed. Between the database commit and the successful `sqs.send`, a consumer that queries the database after receiving the event may not find the order yet, depending on transaction isolation and replication lag. These are two separate systems with no shared transaction boundary, and no amount of careful sequencing fully closes the gap.

These aren't edge cases that only happen under extraordinary circumstances. Deploys restart processes mid-request. Out-of-memory kills happen without warning. Networks drop connections at any point. Any of these can interrupt the two-write sequence, and the result is a system that's silently inconsistent with no error logged and no alert fired.

A variation I've seen a few times that looks safer but is actually worse is wrapping both operations in a database transaction:

```js
// PLEASE DO NOT EVER DO THIS
const client = await pool.connect();
await client.query('BEGIN');
await client.query('INSERT INTO orders (customer_id, amount_cents) VALUES ($1, $2)', [customerId, amountCents]);
await sqs.send(new SendMessageCommand({ QueueUrl: QUEUE_URL, MessageBody: JSON.stringify({ customerId, amountCents }) }));
await client.query('COMMIT');
```

The intent is to make the two writes feel like a unit, but a database transaction has no authority over SQS. The transaction can only roll back database operations. If `sqs.send` succeeds and then `COMMIT` fails, the message is already in the queue and can't be taken back. If the process crashes after `COMMIT` but before the function returns, the transaction committed and the message was sent, but the caller may retry, potentially inserting a duplicate order.

Beyond the correctness problems, this pattern holds an open database connection and any row locks for the entire duration of the SQS network call. SQS is normally fast, but under load, retries, or a degraded queue, that call can take seconds. Every other request trying to read or write the same rows has to wait. In a busy application, this is a reliable way to exhaust the connection pool and bring down unrelated parts of the service.

---

## The Outbox Pattern

The core idea is to stop treating the queue publish as a second write that happens after the database write, and instead make it part of the same database transaction.

Rather than calling `sqs.send` directly, the application inserts a row into an `outbox` table in the same transaction as the business record. A separate relay process reads the outbox table and publishes the messages to SQS. On the other end, a consumer receives the messages and writes to its own data store. In our case that is a fulfillment service writing to DynamoDB, completely separate from the order service's PostgreSQL database.

If the transaction rolls back for any reason, the outbox row disappears with it. There's no orphaned message in the queue because the message was never sent. If the application crashes after committing but before the relay runs, the outbox row is still there with `status='pending'`, and the relay will pick it up on its next iteration.

The only guarantee the pattern relies on is the one the database already provides: atomicity within a single transaction.

The relay worker is responsible for the eventual delivery guarantee. It runs on an interval, selects pending rows, publishes them to SQS, and marks them as sent only after SQS confirms receipt. If the relay crashes mid-run, it will reprocess the same rows on the next iteration, which means SQS may receive some messages more than once.

That's why the consumer needs to be **idempotent**: it must handle receiving the same message twice without creating duplicate fulfillment records. We'll cover how to implement that when we build the consumer.

This separation of concerns is what makes the pattern practical. The request handler commits one atomic database transaction and returns. The relay handles the network call to SQS asynchronously, at its own pace, with its own retry logic, without holding database connections open or blocking request handling. The consumer is fully decoupled from the order service and owns its own data store.

The diagram below illustrates the flow:

![Diagram: outbox pattern flow](https://cdn.hashnode.com/uploads/covers/68b08746916c71e1ed2db58e/ab0620f0-65c6-43f1-a406-00bfd4880cdc.svg)

---

## What We'll Build

Now let's see the whole thing in practice. We'll implement a simple order placement API. When a customer sends a request to place an order, the order service saves it to PostgreSQL and inserts a row into the outbox table, all in one atomic transaction. A relay worker wakes up periodically, reads the pending outbox rows, and publishes each one as a message to SQS. A separate fulfillment service receives those messages from the queue and creates fulfillment records in DynamoDB.

By the end, you'll have an HTTP endpoint you can call, and you'll be able to verify that placing an order triggers the creation of a fulfillment record in a completely separate database, owned by a completely separate service, without either service ever talking to the other directly.

You can find the complete working code at [github.com/gkoos/article-outbox (<VPIcon icon="iconfont icon-github"/>`gkoos/article-outbox`)](https://github.com/gkoos/article-outbox).

---

## Project Setup

Before you can run any code, you need to get floci running so you have local instances of PostgreSQL, SQS, and DynamoDB. You'll also need Node.js 20 or later and Docker installed.

Start by cloning the repository and installing dependencies:

```sh
git clone https://github.com/gkoos/article-outbox
cd article-outbox
npm install
```

Next, start floci. This command pulls the latest floci image and starts a Docker container that exposes a local AWS API endpoint (make sure Docker is running):

```sh
npm run floci:start
```

On Linux and macOS, this just works. On Windows with Docker Desktop, **you need to edit the `floci:start` script in your <VPIcon icon="iconfont icon-json"/>`package.json` to change the Docker socket mount from `/var/run/docker.sock` to `//var/run/docker.sock`**.

The floci container is now listening on port 4566 and can spin up RDS (PostgreSQL), SQS, and DynamoDB instances on demand.

Now provision the AWS resources with a single setup command:

```sh
npm run setup
```

This script creates an RDS PostgreSQL database instance, an SQS queue named `orders`, and a DynamoDB table named `fulfillments`. It waits for RDS to become available and then writes a `.env` file with the correct connection details. The environment variables `PG_PORT`, `SQS_QUEUE_URL`, and `DYNAMODB_TABLE_NAME` now point to the local emulated services.

Finally, create the PostgreSQL tables:

```sh
npm run migrate
```

This creates the `orders` table and the `outbox` table in PostgreSQL. You now have a fully functional local environment ready to build against.

---

## Database Schema

The two tables are simple. `orders` holds the business records: each order has a customer ID, an amount in cents, and a timestamp. The `outbox` table is the heart of the pattern: it's where the application writes the event that needs to be published.

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  sent_at TIMESTAMPTZ
);

CREATE INDEX ON outbox (status, created_at) WHERE status = 'pending';
```

The `orders` table needs nothing special. The `outbox` table stores the event metadata: what type of event it is (`event_type`), what data it contains (`payload` as JSON), and whether it has been sent yet (`status`).

The status starts as `pending`. When the relay publishes it to SQS, it will mark it as `sent` and record the timestamp. The index on `(status, created_at) WHERE status = 'pending'` lets the relay quickly find the next batch of unsent events without scanning the entire table.

---

## The Request Handler

This is where the pattern starts. The request handler receives an HTTP POST, inserts an order into the database, inserts a corresponding row into the outbox table, and commits everything in a single atomic transaction. The key insight is that neither write succeeds unless both succeed.

```js :collapsed-lines
const client = await pool.connect();
try {
  await client.query('BEGIN');

  // Insert the order record
  const { rows } = await client.query(
    'INSERT INTO orders (customer_id, amount_cents) VALUES ($1, $2) RETURNING *',
    [customerId, amountCents]
  );
  const order = rows[0];

  // Insert the outbox record in the same transaction
  await client.query(
    `INSERT INTO outbox (event_type, payload)
     VALUES ($1, $2)`,
    ['order.created', JSON.stringify({ orderId: order.id, customerId: order.customer_id, amountCents: order.amount_cents, createdAt: order.created_at })],
  );

  await client.query('COMMIT');
  res.status(201).json(order);
} catch (err) {
  await client.query('ROLLBACK');
  next(err);
} finally {
  client.release();
}
```

The handler gets `customerId` and `amountCents` from the request body, starts an explicit transaction with `BEGIN`, and inserts the order. Then it inserts an outbox row with the order data as the payload.

Everything commits atomically. If anything fails, everything rolls back and the client gets an error. If the process crashes between the commit and the response, the client won't get a 201, but the order and the outbox row are still safely committed to the database and the relay will eventually pick it up. The handler doesn't call SQS at all. That is the relay's job.

---

## The Relay Worker

The relay worker is a separate process that polls the outbox table every second and publishes pending rows to SQS. It runs independently of the HTTP server and has no shared state with it.

```js :collapsed-lines
async function relay() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(`
      SELECT *
      FROM outbox
      WHERE status = 'pending'
      ORDER BY created_at
      LIMIT 10
      FOR UPDATE SKIP LOCKED -- prevents multiple relays from processing the same rows
    `);

    for (const row of rows) {
      await sqsClient.send(new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify(row.payload),
        MessageAttributes: {
          EventType: { DataType: 'String', StringValue: row.event_type },
        },
      }));

      await client.query(
        `UPDATE outbox SET status = 'sent', sent_at = now() WHERE id = $1`,
        [row.id],
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Relay error:', err.message);
  } finally {
    client.release();
  }
}

setInterval(relay, 1000);
```

`FOR UPDATE SKIP LOCKED` is the key to running multiple relay instances safely: when a relay picks up a batch of rows, it locks them. Any other relay instance trying to select the same rows will skip them and move to the next available ones, so you never get two relays publishing the same message from the same run.

The relay marks each row as `sent` only after `sqsClient.send` returns. If the relay crashes after sending to SQS but before updating the row, the row stays `pending` and the relay will resend it on the next iteration.

Note that the `UPDATE` happens inside the same transaction as the `SELECT FOR UPDATE`, so if the relay crashes mid-batch, the entire batch rolls back and all rows in it will be retried, including any that were already successfully sent to SQS.

The at-least-once delivery guarantee applies at the batch level, not the individual row level. You can read about this problem in [<VPIcon icon="fas fa-globe"/>Beyond Happy Path Engineering: the Network](https://blog.gaborkoos.com/posts/2026-07-01-Beyond-Happy-Path-Engineering-the-Network/): when a response is lost, the caller can't know whether the operation succeeded, so it retries, and the receiver may see the same request twice. This means the consumer may see the same message more than once, which is why idempotency matters on the consumer side.

---

## The Consumer

The consumer is a completely separate service. It knows nothing about the order service's PostgreSQL database. Its only input is the SQS queue, and its only output is the DynamoDB `fulfillments` table. This is the point of the pattern: the two services are decoupled by the queue, and each owns its own data store.

As we saw earlier, because SQS delivers at least once (meaning a message might be delivered more than once), the consumer must be idempotent. The `PutItem` call uses a `ConditionExpression` that makes the write a no-op if a fulfillment record for that order already exists, so redelivered messages are handled safely.

```js :collapsed-lines
async function consume() {
  const { Messages } = await sqsClient.send(new ReceiveMessageCommand({
    QueueUrl:              QUEUE_URL,
    WaitTimeSeconds:       20,   // long-poll: wait up to 20s for messages
    MaxNumberOfMessages:   10,
    MessageAttributeNames: ['All'],
  }));

  for (const msg of Messages ?? []) {
    const event = JSON.parse(msg.Body);

    try {
      await dynamoClient.send(new PutItemCommand({
        TableName: 'fulfillments',
        Item: {
          orderId:     { S: event.orderId },
          customerId:  { S: event.customerId },
          amountCents: { N: String(event.amountCents) },
          status:      { S: 'received' },
          createdAt:   { S: new Date().toISOString() },
        },
        ConditionExpression: 'attribute_not_exists(orderId)', // idempotency check
      }));
    } catch (err) {
      if (err.name !== 'ConditionalCheckFailedException') throw err;
      // already processed, safe to continue
    }

    // delete the message only after the write succeeds (or was already done)
    await sqsClient.send(new DeleteMessageCommand({
      QueueUrl:      QUEUE_URL,
      ReceiptHandle: msg.ReceiptHandle,
    }));
  }
}
```

`ConditionExpression: 'attribute_not_exists(orderId)'` tells DynamoDB to reject the write if a record with that `orderId` already exists. When that happens, DynamoDB throws a `ConditionalCheckFailedException`. The consumer catches that specific error and ignores it, then deletes the message from the queue and moves on. Any other error is rethrown and the message stays in the queue to be retried.

The `DeleteMessage` call happens after the DynamoDB write, not before. If the process crashes between the write and the delete, SQS will redeliver the message and the condition check will handle it. If the process crashes before the write, the message stays in the queue and will be processed normally on the next delivery.

---

## Running the Whole Thing

With floci running and the resources provisioned, open three terminal tabs and start each process:

```sh
node src/server.js    # the order API on port 3000
node src/relay.js     # the outbox relay
node src/consumer.js  # the fulfillment consumer
```

Now place an order:

```sh
curl -X POST localhost:3000/orders \
-H 'Content-Type: application/json' \
-d '{"customerId":"c1","amountCents":4999}'
```

You should get back a 201 with the new order record:

```json
{
  "id": "1768d35b-083d-45f1-adb5-4063d8d7fcab",
  "customer_id": "c1",
  "amount_cents": 4999,
  "created_at": "2026-07-30T20:27:10.628Z"
}
```

Within a second the relay will pick up the outbox row and publish it to SQS. The consumer will receive the message and write a fulfillment record to DynamoDB. The repo includes a convenience script to verify this:

```sh
npm run check
```

You should see a fulfillment record with the `orderId` from the order you just placed:

```json
{
  "orderId": "c335640e-bc4a-47e4-afed-484c95fbd6d3",
  "customerId": "c1",
  "amountCents": "4999",
  "status": "received",
  "createdAt": "2026-07-30T19:02:54.929Z",
}
```

---

## Going to Production

Because the local setup uses floci to emulate AWS, switching to real AWS requires no code changes at all. The AWS SDK reads the endpoint from `AWS_ENDPOINT_URL` in the environment. In production, you simply don't set that variable and the SDK talks to real AWS using the credentials and region from the standard environment variables (`AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, or an IAM role if you are running on EC2 or ECS).

Running multiple relay instances is safe out of the box because of `FOR UPDATE SKIP LOCKED`. You can scale the relay horizontally and each instance will pick up a different set of rows without duplicating messages.

One thing worth adding before going to production is handling permanent failures in the relay. Right now the relay only uses `pending` and `sent`. You should add a `failed` status and a retry counter: after a row has failed N times, mark it `failed` and stop retrying it. Then configure a dead-letter queue on the `orders` SQS queue as well, so that messages the consumer can't process after the maximum number of retries land somewhere you can inspect rather than disappearing silently.

For high-throughput systems where polling latency matters, [<VPIcon icon="fa-brands fa-wikipedia-w"/>change data capture](https://en.wikipedia.org/wiki/Change_data_capture) (CDC) is a common alternative to the polling relay. Tools like [<VPIcon icon="fas fa-globe"/>Debezium](https://debezium.io/) read directly from the PostgreSQL write-ahead log and publish changes to [<VPIcon icon="iconfont icon-kafka"/>Kafka](https://kafka.apache.org/) or SQS without any polling delay. The outbox table and the consumer stay exactly the same, only the relay is replaced.

This is a bigger operational commitment than a polling worker, so polling is the right starting point for most systems.

---

## Conclusion

The dual-write problem is easy to overlook because the naïve implementation works correctly most of the time. It only fails in the gaps between two separate system writes, and those gaps only become visible when something goes wrong at exactly the wrong moment. By the time you notice it in production, data is already inconsistent and there is no clean way to recover.

The transactional outbox pattern closes that gap at the database level. The outbox row is part of the same atomic commit as the business record, so the two are always in sync. The relay handles the network call to SQS independently, with its own retry logic, without touching the request lifecycle. The consumer handles at-least-once delivery with a single condition check on the write.

Each piece is simple on its own, and together they give you reliable, decoupled event delivery without distributed transactions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Fix the Dual-Write Problem in Node.js with the Outbox Pattern",
  "desc": "Imagine you're building an e-commerce platform where placing an order needs to trigger several things at once: the warehouse has to be told to prepare the shipment, the email service has to send a con",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fix-the-dual-write-problem-in-node-js-with-the-outbox-pattern.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
