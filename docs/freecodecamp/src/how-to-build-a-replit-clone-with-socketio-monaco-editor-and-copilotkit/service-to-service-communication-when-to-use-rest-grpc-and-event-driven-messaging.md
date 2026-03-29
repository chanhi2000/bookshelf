---
lang: en-US
title: "Service-to-Service Communication: When to Use REST, gRPC, and Event-Driven Messaging"
description: "Article(s) > Service-to-Service Communication: When to Use REST, gRPC, and Event-Driven Messaging"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Service-to-Service Communication: When to Use REST, gRPC, and Event-Driven Messaging"
    - property: og:description
      content: "Service-to-Service Communication: When to Use REST, gRPC, and Event-Driven Messaging"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/service-to-service-communication-when-to-use-rest-grpc-and-event-driven-messaging.html
prev: /programming/ts/articles/README.md
date: 2026-04-15
isOriginal: false
author:
  - name: Abisoye Alli-Balogun
    url: https://freecodecamp.org/news/author/AbisoyeAlli/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b56ca584-75e1-4d0f-a88a-c2419a0b5d6e.png
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

[[toc]]

---

<SiteInfo
  name="Service-to-Service Communication: When to Use REST, gRPC, and Event-Driven Messaging"
  desc="The communication layer is one of the few architectural decisions that touches everything in your apps. It determines your latency floor, how independently teams can deploy, how failures propagate, an"
  url="https://freecodecamp.org/news/service-to-service-communication-when-to-use-rest-grpc-and-event-driven-messaging"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b56ca584-75e1-4d0f-a88a-c2419a0b5d6e.png"/>

The communication layer is one of the few architectural decisions that touches everything in your apps. It determines your latency floor, how independently teams can deploy, how failures propagate, and how much pain you feel every time a contract needs to change.

There are three dominant patterns: REST over HTTP, gRPC with Protocol Buffers, and event-driven messaging through a broker. Most production systems use a mix of all three. The skill is knowing which pattern fits which interaction.

In this article, you'll learn the core mechanics of each communication style, the real trade-offs between them across five dimensions (latency, coupling, schema evolution, debugging, and operational complexity), and a decision framework for choosing the right pattern for each service interaction.

::: note Prerequisites

To get the most out of this article, you should be familiar with:

- Basic HTTP concepts (request/response, status codes, headers)
- Working with APIs in any backend language (the examples use TypeScript and Node.js)
- General understanding of microservices architecture
- Familiarity with JSON as a data interchange format

:::

---

## The Three Patterns at a Glance

Before diving deep, here's the landscape:

|  | REST | gRPC | Event-Driven |
| --- | --- | --- | --- |
| **Communication** | Synchronous | Synchronous (+ streaming) | Asynchronous |
| **Protocol** | HTTP/1.1 or HTTP/2 | HTTP/2 | Broker-dependent (TCP) |
| **Serialization** | JSON (typically) | Protocol Buffers (binary) | JSON, Avro, Protobuf |
| **Coupling** | Request-time | Request-time + schema | Temporal decoupling |
| **Best for** | Public APIs, CRUD | Internal high-throughput | Workflows, event sourcing |

Each has strengths, and none is universally better. The rest of this article explores why.

---

## REST: The Default Choice

REST over HTTP is the most widely understood communication pattern. Services expose resources at URL endpoints, and clients interact through standard HTTP methods.

```ts
// Order service calls the inventory service
async function checkInventory(productId: string): Promise<InventoryStatus> {
  const response = await fetch(
    `https://inventory-service/api/v1/products/${productId}/stock`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getServiceToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new HttpError(response.status, await response.text());
  }

  return response.json();
}
```

### Where REST Excels

Every language, framework, and platform speaks HTTP. Your frontend, your mobile app, your partner integrations, and your internal services can all use the same protocol.

The tooling is also mature: load balancers, API gateways, caching proxies, and debugging tools all understand HTTP natively.

It's also relatively simple. A new developer can read a REST call and understand what it does. The URL describes the resource. The HTTP method describes the action. The status code describes the outcome. There's no schema compilation step, no code generation, and no special client library required.

Beyond this, HTTP has built-in caching semantics. A `GET /products/123` response with a `Cache-Control: max-age=60` header can be cached by every proxy between the caller and the server. gRPC and event-driven patterns have no equivalent built-in mechanism.

```ts
// REST response with cache headers
app.get("/api/v1/products/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  res.set("Cache-Control", "public, max-age=60");
  res.set("ETag", computeETag(product));

  res.json(product);
});
```

### Where REST Falls Short

REST's resource-oriented model often requires multiple round-trips to assemble a response. Fetching an order with its items, customer details, and shipping status might mean three separate HTTP calls. Each call adds network latency, TCP handshake overhead, and serialization cost.

```ts
// Three sequential calls to build one view
async function getOrderDetails(orderId: string): Promise<OrderDetails> {
  const order = await fetch(`/api/orders/${orderId}`).then((r) => r.json());
  const customer = await fetch(`/api/customers/${order.customerId}`).then((r) => r.json());
  const shipment = await fetch(`/api/shipments/${order.shipmentId}`).then((r) => r.json());

  return { order, customer, shipment };
}
```

You can mitigate this with composite endpoints or GraphQL, but that adds complexity. gRPC handles this more naturally with message composition.

The serialization overhead is also an issue. JSON is human-readable but expensive to parse. For high-throughput internal communication where nobody reads the payloads, you are paying a tax in CPU and bandwidth for readability you do not need.

Finally, there's no streaming. Standard REST is request-response. If you need the server to push updates to the client (real-time order tracking, live metrics), REST requires workarounds like polling, Server-Sent Events, or WebSockets. None of these are part of the REST model itself.

---

## gRPC: The Performance Choice

gRPC is a Remote Procedure Call framework built on HTTP/2 and Protocol Buffers. Instead of URLs and JSON, you define services and messages in `.proto` files, and the framework generates strongly-typed client and server code.

### Defining the Contract

```protobuf
// inventory.proto
syntax = "proto3";

package inventory;

service InventoryService {
  // Unary: single request, single response
  rpc CheckStock(StockRequest) returns (StockResponse);

  // Server streaming: single request, stream of responses
  rpc WatchStockLevels(WatchRequest) returns (stream StockUpdate);

  // Client streaming: stream of requests, single response
  rpc BulkUpdateStock(stream StockAdjustment) returns (BulkUpdateResult);
}

message StockRequest {
  string product_id = 1;
  string warehouse_id = 2;
}

message StockResponse {
  string product_id = 1;
  int32 available = 2;
  int32 reserved = 3;
  google.protobuf.Timestamp last_updated = 4;
}

message StockUpdate {
  string product_id = 1;
  int32 available = 2;
  string warehouse_id = 3;
}
```

After running `protoc` (the Protocol Buffer compiler), you get generated client and server stubs in your target language. The TypeScript client looks like this:

```ts
import { InventoryServiceClient } from "./generated/inventory";
import { credentials } from "@grpc/grpc-js";

const client = new InventoryServiceClient(
  "inventory-service:50051",
  credentials.createInsecure()
);

async function checkStock(productId: string): Promise<StockResponse> {
  return new Promise((resolve, reject) => {
    client.checkStock(
      { productId, warehouseId: "warehouse-eu-1" },
      (error, response) => {
        if (error) reject(error);
        else resolve(response);
      }
    );
  });
}
```

### Where gRPC Excels

Protocol Buffers serialize to a compact binary format. A message that is 1 KB as JSON might be 300 bytes as Protobuf. Combined with HTTP/2 multiplexing (multiple requests over a single TCP connection), gRPC delivers significantly lower latency and higher throughput than REST for internal service calls. And we all know performance is important.

| Metric | REST (JSON/HTTP 1.1) | gRPC (Protobuf/HTTP 2) |
| --- | --- | --- |
| Serialization size | Larger (text-based JSON) | Significantly smaller (binary Protobuf) |
| Serialization time | Slower (JSON parse/stringify) | Faster (binary encode/decode) |
| Requests per connection | 1 (without pipelining) | Multiplexed |
| Connection overhead | New connection per request (HTTP/1.1) | Persistent connections with multiplexing |

The exact improvement depends on payload size, network topology, and server implementation. In benchmarks, the difference ranges from marginal (tiny payloads on fast networks) to an order of magnitude (large payloads, high concurrency).

The takeaway: gRPC's binary serialization and HTTP/2 multiplexing give it a structural advantage for internal traffic, but you should measure in your own environment before making latency claims.

Also, gRPC natively supports four communication patterns: unary (request-response), server streaming, client streaming, and bidirectional streaming. This makes it a natural fit for real-time use cases like live stock updates, log tailing, or progress reporting.

```ts
// Server streaming: watch inventory changes in real time
function watchStockLevels(warehouseId: string): void {
  const stream = client.watchStockLevels({ warehouseId });

  stream.on("data", (update: StockUpdate) => {
    console.log(`Product \({update.productId}: \){update.available} available`);
  });

  stream.on("error", (error) => {
    console.error("Stream error:", error.message);
    // Reconnect logic here
  });

  stream.on("end", () => {
    console.log("Stream ended");
  });
}
```

Finally, it has strong typing across services. The `.proto` file is the single source of truth. Both the client and server are generated from it. If the inventory service changes the `StockResponse` message, the order service's build fails until it regenerates its client. You catch breaking changes at compile time, not at 3 AM.

### Where gRPC Falls Short

The first key issue is browser support. Browsers can't make native gRPC calls because the browser's `fetch` API doesn't expose the HTTP/2 framing that gRPC requires (for example, trailers for status codes and fine-grained control over bidirectional streams).

You need gRPC-Web, which uses a proxy like Envoy to translate between the browser-compatible subset of gRPC and the full protocol. Alternatively, you can place a REST or GraphQL gateway in front of your gRPC services.

Either way, gRPC isn't a viable choice for any endpoint that a browser calls directly — which is why the decision framework in this article defaults to REST for public-facing APIs.

It's also difficult to debug. You can't `curl` a gRPC endpoint. The binary payloads aren't human-readable. Tools like `grpcurl` and Postman's gRPC support help, but the debugging experience is worse than inspecting a JSON response in a browser's network tab.

```sh
# Debugging a REST endpoint
curl -s https://inventory-service/api/v1/products/abc-123/stock | jq

# Debugging a gRPC endpoint (requires grpcurl)
grpcurl -plaintext -d '{"product_id": "abc-123"}' \
  inventory-service:50051 inventory.InventoryService/CheckStock
```

Finally, operational overhead is an issue. You need to manage `.proto` files, run code generation in your build pipeline, version your proto definitions, and ensure all consumers regenerate when schemas change.

For a team with two services, this is manageable. For twenty services, you need a proto registry and a governance process.

---

## Event-Driven Messaging: The Decoupling Choice

Event-driven communication flips the model. Instead of service A calling service B directly, service A publishes an event to a broker (Kafka, RabbitMQ, Amazon SNS/SQS, or similar), and service B consumes it asynchronously.

```ts
// Order service publishes an event after confirming an order
import { Kafka } from "kafkajs";

const kafka = new Kafka({ brokers: ["kafka:9092"] });
const producer = kafka.producer();

async function publishOrderConfirmed(order: Order): Promise<void> {
  await producer.send({
    topic: "order.confirmed",
    messages: [
      {
        key: order.id,
        value: JSON.stringify({
          eventType: "order.confirmed",
          eventId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          data: {
            orderId: order.id,
            customerId: order.customerId,
            items: order.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
            total: order.total,
          },
        }),
      },
    ],
  });
}
```

```ts
// Inventory service consumes the event independently
const consumer = kafka.consumer({ groupId: "inventory-service" });

async function startInventoryConsumer(): Promise<void> {
  await consumer.subscribe({ topic: "order.confirmed" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());

      for (const item of event.data.items) {
        await decrementStock(item.productId, item.quantity);
      }

      logger.info("Inventory updated for order", {
        orderId: event.data.orderId,
      });
    },
  });
}
```

### Where Event-Driven Excels

First, it employs temporal decoupling. The producer doesn't wait for the consumer. The order service publishes "order confirmed" and moves on. If the inventory service is down, the event sits in the broker until it recovers. No timeout, no retry logic in the producer, no cascading failure.

One event can also trigger multiple independent reactions. When an order is confirmed, the inventory service decrements stock, the notification service sends a confirmation email, the analytics service records a conversion, and the shipping service starts fulfillment. The order service doesn't know or care about any of these consumers.

```text
order.confirmed event
  ├── inventory-service    → Decrement stock
  ├── notification-service → Send confirmation email
  ├── analytics-service    → Record conversion
  └── shipping-service     → Create shipment
```

Adding a new consumer requires zero changes to the producer. This is the lowest coupling you can achieve between services.

There's also a natural audit trail. If your broker retains events (Kafka does this by default), you have a complete history of everything that happened. You can replay events to rebuild state, debug issues by examining the exact sequence of events, or spin up a new service that processes historical events to backfill its data.

### Where Event-Driven Falls Short

After the order service publishes "order confirmed," there's a window where the inventory service hasn't yet processed the event. During that window, a concurrent request might read stale stock levels. If your use case requires "read your own writes" consistency, event-driven communication alone is not enough.

```ts
// The problem: order confirmed, but stock not yet decremented
async function handleCheckout(cart: Cart): Promise<Order> {
  const order = await createOrder(cart);
  await publishOrderConfirmed(order);

  // If another request checks stock RIGHT NOW,
  // it sees the old (pre-decrement) value.
  // The inventory consumer hasn't processed the event yet.
  return order;
}
```

Debugging also gets more complex. When something goes wrong in a synchronous call chain, you get a stack trace. When something goes wrong in an event-driven flow, you get a message in a dead-letter queue and a question: which producer sent this? When? What was the system state at that time? Distributed tracing helps, but correlating events across services is fundamentally harder than following a request through a call stack.

You can also have issues with ordering guarantees. Most brokers guarantee ordering within a partition (Kafka) or a queue, but not globally. If the order service publishes "order confirmed" and then "order cancelled," the inventory service might process the cancellation first if the events land on different partitions.

```ts
// Use a consistent partition key to guarantee ordering per entity
await producer.send({
  topic: "order.events",
  messages: [
    {
      // All events for the same order go to the same partition
      key: order.id,
      value: JSON.stringify(event),
    },
  ],
});
```

Keying messages by entity ID (order ID, customer ID) ensures events for the same entity are processed in order. Events for different entities can be processed in parallel.

Finally, your operations get more complex. Running a message broker isn't free. Kafka requires ZooKeeper (or KRaft), topic management, partition rebalancing, consumer group coordination, and monitoring for consumer lag. Managed services like Amazon MSK, Confluent Cloud, or Amazon SQS reduce this burden but add cost.

### Handling Broker Failures

What happens when the broker is unavailable? If your service writes to the database and then publishes an event, a broker outage means the event is lost even though the database write succeeded.

These patterns help:

#### 1. The Outbox Pattern

Instead of publishing directly to the broker, write the event to an "outbox" table in the same database transaction as your business data. A separate process (a poller or a change-data-capture connector like Debezium) reads the outbox table and publishes to the broker.

```ts
// Outbox pattern: write event to the database, not the broker
// db injected via dependency injection
async function confirmOrder(order: Order, db: Database): Promise<void> {
  await db.transaction(async (tx) => {
    // Business write and event write in the same transaction
    await tx.update("orders", { id: order.id, status: "confirmed" });
    await tx.insert("outbox", {
      id: crypto.randomUUID(),
      topic: "order.confirmed",
      key: order.id,
      payload: JSON.stringify({
        orderId: order.id,
        customerId: order.customerId,
        items: order.items,
        total: order.total,
      }),
      created_at: new Date(),
    });
  });
  // A separate relay process picks up outbox rows and publishes to Kafka
}
```

Because the event and the business data are written atomically, you never lose an event due to a broker outage. The relay process retries until the broker is back.

#### 2. At-least-once delivery

Most brokers guarantee at-least-once delivery, meaning consumers may see the same event more than once (for example, after a rebalance or a retry). Your consumers must be idempotent: processing the same event twice should produce the same result as processing it once.

```ts
// Idempotent consumer: use the eventId to deduplicate
async function handleOrderConfirmed(event: EventEnvelope<OrderData>): Promise<void> {
  const alreadyProcessed = await db.query(
    "SELECT 1 FROM processed_events WHERE event_id = $1",
    [event.eventId]
  );

  if (alreadyProcessed.rows.length > 0) {
    logger.info("Duplicate event, skipping", { eventId: event.eventId });
    return;
  }

  await db.transaction(async (tx) => {
    await decrementStock(tx, event.data.items);
    await tx.insert("processed_events", {
      event_id: event.eventId,
      processed_at: new Date(),
    });
  });
}
```

The combination of the outbox pattern (producer side) and idempotent consumers (consumer side) gives you reliable event-driven communication even when the broker has intermittent failures.

---

## The Five Trade-Off Dimensions

Choosing a communication pattern isn't about which is "best." It's about which trade-offs you can accept for each specific interaction. Here are the five dimensions that matter most.

### 1. Latency

| Pattern | Relative Latency | Why |
| --- | --- | --- |
| gRPC | Lowest | Binary serialization, HTTP/2 multiplexing, persistent connections |
| REST | Low-moderate | JSON parsing overhead, typically HTTP/1.1 connection setup |
| Event-driven | Highest (by design) | Broker write, replication, consumer poll interval |

Exact numbers depend on payload size, network hops, and infrastructure. The structural ordering is consistent: gRPC is fastest for synchronous calls, REST is close behind, and event-driven messaging trades latency for decoupling.

If the caller needs an immediate response (user-facing checkout, real-time search), use gRPC or REST. If the caller doesn't need the result right now (send email, update analytics), use events.

### 2. Coupling

Coupling has two dimensions: **temporal** (does the caller wait for the receiver?) and **schema** (do they share a contract?).

| Pattern | Temporal Coupling | Schema Coupling |
| --- | --- | --- |
| REST | High (caller blocks) | Low (JSON is flexible) |
| gRPC | High (caller blocks) | High (shared `.proto` files) |
| Event-driven | None (fire and forget) | Medium (shared event schema) |

REST's loose typing is a double-edged sword. You can add fields to a JSON response without breaking consumers (additive changes are safe). But you can also accidentally remove a field, and the consumer fails at runtime instead of compile time.

gRPC's strict typing catches breaking changes at build time, but it means every schema change requires regenerating clients. For two services, this is trivial. For twenty services consuming the same proto, you need a coordination process.

Event-driven messaging decouples in time but still couples on the event schema. If the `order.confirmed` event changes its structure, every consumer must handle both the old and new format during the transition.

### 3. Schema Evolution

Schema evolution is how you change the contract between services without breaking existing consumers. This is where the three patterns diverge most sharply.

#### REST (JSON):

```ts
// Version 1: price as a number
{ "productId": "abc-123", "price": 49.99 }

// Version 2: price as an object (breaking change)
{ "productId": "abc-123", "price": { "amount": 49.99, "currency": "USD" } }
```

JSON has no built-in versioning. You manage it through one of three strategies:

| Strategy | How It Works | Trade-offs |
| --- | --- | --- |
| **URL versioning** (`/api/v1/` vs `/api/v2/`) | Each version is a separate endpoint. Consumers opt in to the new version explicitly. | Simplest to understand. Duplicates route handlers. Hard to sunset old versions when many consumers pin to `/v1/`. |
| **Header versioning** (`Accept: application/vnd.myapi.v2+json`) | Single URL, version negotiated via headers. | Cleaner URLs, no route duplication. Harder to test (you can't just paste a URL into a browser). Proxy and cache behavior is trickier since the response varies by header. |
| **Defensive parsing** (consumer-side tolerance) | No explicit versioning. Consumers ignore unknown fields and use defaults for missing ones. | Zero coordination cost for additive changes. Breaks down for structural changes (field renames, type changes) where the consumer can't infer intent. |

Additive changes (new fields) are safe with any strategy. Structural changes (renaming fields, changing types) require explicit versioning — URL or header — so consumers can migrate at their own pace.

#### gRPC (Protocol Buffers):

```protobuf
// Protocol Buffers have built-in evolution rules
message StockResponse {
  string product_id = 1;
  int32 available = 2;
  int32 reserved = 3;
  // Field 4 was removed (never reuse field numbers)
  string warehouse_id = 5;       // New field: old clients ignore it
  optional string region = 6;    // Optional: old clients don't send it
}
```

Protocol Buffers handle evolution well by design. You can add new fields (old clients ignore them), deprecate fields (stop writing them, keep the number reserved), and use `optional` for fields that may not be present.

You can't rename fields, change field types, or reuse field numbers. These rules are enforced by the tooling.

#### Event-driven (Avro/JSON Schema):

For events, schema registries like Confluent Schema Registry enforce compatibility rules:

```ts
// Register a schema with backward compatibility
// New consumers can read old events, old consumers can read new events
const schema = {
  type: "record",
  name: "OrderConfirmed",
  fields: [
    { name: "orderId", type: "string" },
    { name: "customerId", type: "string" },
    { name: "total", type: "double" },
    // New field with default: backward compatible
    { name: "currency", type: "string", default: "USD" },
  ],
};
```

With a schema registry, producers can't publish events that violate the compatibility contract. This is the strongest governance model: the registry rejects incompatible schemas before they reach consumers.

### 4. Debugging and Observability

| Pattern | Debugging Experience |
| --- | --- |
| REST | Best. Human-readable payloads, browser DevTools, `curl`, standard HTTP tracing. |
| gRPC | Moderate. Binary payloads need `grpcurl` or Postman. Metadata is inspectable. Distributed tracing works well. |
| Event-driven | Hardest. Asynchronous flows require correlation IDs, dead-letter queue inspection, and broker-specific tooling. |

For event-driven systems, correlation IDs are essential:

```ts
// Always include a correlation ID in events
interface EventEnvelope<T> {
  eventId: string;
  eventType: string;
  correlationId: string; // Links related events across services
  causationId: string;   // The event that caused this one
  timestamp: string;
  source: string;
  data: T;
}

async function publishEvent<T extends { entityId: string }>(
  topic: string,
  type: string,
  data: T,
  correlationId: string,
  causationId?: string
): Promise<void> {
  const event: EventEnvelope<T> = {
    eventId: crypto.randomUUID(),
    eventType: type,
    correlationId,
    causationId: causationId ?? correlationId,
    timestamp: new Date().toISOString(),
    source: SERVICE_NAME,
    data,
  };

  await producer.send({
    topic,
    messages: [{ key: data.entityId, value: JSON.stringify(event) }],
  });
}
```

When investigating an issue, you search for the correlation ID across all services and reconstruct the full event chain. Without it, you're searching for a needle in a haystack.

### 5. Operational Complexity

| Pattern | What You Operate |
| --- | --- |
| REST | HTTP server, load balancer, API gateway |
| gRPC | gRPC server, proto registry, code generation pipeline, gRPC-Web proxy (if browser clients exist) |
| Event-driven | Message broker (Kafka/RabbitMQ/SQS), schema registry, dead-letter queues, consumer lag monitoring |

REST has the lowest operational overhead. Every team knows how to run an HTTP server.

gRPC adds a build-time dependency (proto compilation) and requires teams to learn new tooling.

Event-driven adds a runtime dependency (the broker) that must be highly available because if the broker goes down, inter-service communication stops.

---

## The Decision Framework

Use this framework when deciding how a specific pair of services should communicate. The answer is rarely one pattern for your entire system.

```text
Does the caller need an immediate response?
├── Yes → Is this a public-facing or browser-accessible API?
│         ├── Yes → REST
│         └── No  → Is throughput or latency critical?
│                   ├── Yes → gRPC
│                   └── No  → REST (simpler, good enough)
└── No  → Can the caller tolerate eventual consistency?
          ├── No  → Use synchronous call (REST or gRPC) with async follow-up
          └── Yes → Does the event need to trigger multiple consumers?
                    ├── Yes → Event-driven messaging
                    └── No  → Is ordering critical?
                              ├── Yes → Event-driven with partition key
                              └── No  → Event-driven (or simple queue like SQS)
```
<!-- TODO: mermaid화 -->

Some concrete examples:

| Interaction | Pattern | Why |
| --- | --- | --- |
| Browser fetches product details | REST | Browser can't call gRPC natively, plus REST offers cacheability |
| Checkout validates payment in real time | gRPC | Low latency, strong typing, internal-only (no browser in the path) |
| Order confirmed triggers fulfillment | Event-driven | Multiple consumers, temporal decoupling |
| Frontend fetches user profile | REST | Simple CRUD, cacheable, browser-native |
| ML service scores recommendations | gRPC | High throughput, binary payloads, streaming |
| User signup triggers welcome email | Event-driven | Async, no need for immediate response |
| Service health checks | REST | Simplicity, universal tooling |
| Real-time stock level monitoring | gRPC streaming | Continuous updates, bidirectional if needed |

---

## Hybrid Architectures: Using All Three

Most production systems use a combination. Here's a pattern that works well:

```text
┌──────────┐    REST     ┌──────────────┐    gRPC    ┌──────────────┐
│ Browser  │────────────▶│  API Gateway │───────────▶│ Order Service│
└──────────┘             └──────────────┘            └──────┬───────┘
                                                           │
                                                    publishes event
                                                           │
                                                           ▼
                                                    ┌─────────────┐
                                                    │    Kafka     │
                                                    └──────┬──────┘
                                          ┌────────────────┼────────────────┐
                                          ▼                ▼                ▼
                                   ┌────────────┐  ┌────────────┐  ┌────────────┐
                                   │ Inventory  │  │ Notification│  │ Analytics  │
                                   │  Service   │  │  Service    │  │  Service   │
                                   └────────────┘  └────────────┘  └────────────┘
```
<!-- TODO: mermaid화 -->

- **REST** at the edge: the browser talks to the API gateway using standard HTTP. Cacheable, debuggable, universally supported.
- **gRPC** between the gateway and internal services: low latency, strong typing, efficient serialization.
- **Event-driven** for downstream reactions: the order service publishes an event, and multiple consumers react independently.

### The Anti-Synchronous Trap

A common mistake is using synchronous calls (REST or gRPC) where events are a better fit. The symptom: a service that makes five synchronous calls during a single request, waiting for each to complete before responding to the caller.

```ts
// Anti-pattern: synchronous fan-out
async function confirmOrder(order: Order): Promise<void> {
  await inventoryService.decrementStock(order.items);    // 50ms
  await paymentService.capturePayment(order.paymentId);  // 200ms
  await notificationService.sendConfirmation(order);     // 100ms
  await analyticsService.recordConversion(order);        // 80ms
  await shippingService.createShipment(order);           // 150ms
  // Total: 580ms, and if any one fails, the order fails
}
```

Only the first two calls (inventory and payment) are critical to confirming the order. The rest are reactions that can happen asynchronously:

```ts
// Better: synchronous for critical path, events for reactions
async function confirmOrder(order: Order): Promise<void> {
  // Critical path: must succeed for the order to be valid
  await inventoryService.decrementStock(order.items);
  await paymentService.capturePayment(order.paymentId);

  // Non-critical: publish event, let consumers handle the rest
  await publishOrderConfirmed(order);
  // Total: 250ms, and notification/analytics/shipping failures
  // don't block the checkout
}
```

This is the same tiered approach from my [<VPIcon icon="fas fa-globe"/>designing resilient APIs](https://abisoye.dev/blog/designing-resilient-apis) article. Critical operations are synchronous. Non-critical reactions are event-driven. The caller responds faster, and downstream failures do not cascade.

---

## Schema Governance at Scale

As your service count grows, schema management becomes a first-class concern. Here's a practical approach for each pattern.

### REST: OpenAPI as the Contract

```yaml title="openapi/inventory-service.yaml"
openapi: "3.1.0"
info:
  title: Inventory Service
  version: "1.2.0"
paths:
  /api/v1/products/{productId}/stock:
    get:
      operationId: getStock
      parameters:
        - name: productId
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Stock level for the product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/StockResponse"
components:
  schemas:
    StockResponse:
      type: object
      required: [productId, available, reserved]
      properties:
        productId:
          type: string
        available:
          type: integer
        reserved:
          type: integer
```

Generate client SDKs from the OpenAPI spec using tools like `openapi-typescript` or `openapi-generator`. This gives you type safety without the build-time coupling of gRPC.

### gRPC: Proto Registry

Store `.proto` files in a shared repository or a dedicated proto registry (Buf Schema Registry is a good option). Use Buf's breaking change detection in CI:

```sh
# Detects breaking changes before they merge
buf breaking --against ".git#branch=main"
```

This command requires a `buf.yaml` configuration file at the root of your proto directory. The file defines your module name and any lint or breaking change rules. See the [<VPIcon icon="fas fa-globe"/>Buf documentation](https://buf.build/docs/configuration/v2/buf-yaml) for setup details.

This fails your pull request if you rename a field, change a type, or reuse a field number. Non-breaking changes (adding fields, adding services) pass through.

### Events: Schema Registry with Compatibility Modes

For event-driven systems, a schema registry enforces compatibility at publish time. Confluent Schema Registry supports four modes:

| Mode | Rule | Use Case |
| --- | --- | --- |
| **BACKWARD** | New schema can read old data | Consumer-first evolution |
| **FORWARD** | Old schema can read new data | Producer-first evolution |
| **FULL** | Both directions | Safest, most restrictive |
| **NONE** | No checks | Development only |

Use `FULL` compatibility for production topics. It ensures that any consumer, regardless of which schema version it was built against, can read any event on the topic.

---

## Conclusion

In this article, you learned the core mechanics of REST, gRPC, and event-driven messaging, the five trade-off dimensions that matter when choosing between them (latency, coupling, schema evolution, debugging, and operational complexity), and a decision framework for matching patterns to specific service interactions.

The key takeaways:

1. **REST for the edge:** Browser clients, public APIs, simple CRUD. Cacheable, debuggable, universally supported.
2. **gRPC for internal hot paths:** High-throughput service-to-service calls where latency matters and both sides are under your control.
3. **Events for reactions:** When the producer shouldn't wait, when multiple consumers need the same signal, or when temporal decoupling prevents cascading failures.
4. **Use all three:** Most production systems combine patterns. REST at the boundary, gRPC internally, events for async workflows.
5. **Schema governance scales the system:** OpenAPI for REST, proto registries for gRPC, schema registries for events. Without governance, schema changes become the primary source of production incidents.

The right communication pattern isn't a global decision. It's a per-interaction decision, made deliberately, based on which trade-offs you can accept for that specific data flow.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Service-to-Service Communication: When to Use REST, gRPC, and Event-Driven Messaging",
  "desc": "The communication layer is one of the few architectural decisions that touches everything in your apps. It determines your latency floor, how independently teams can deploy, how failures propagate, an",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/service-to-service-communication-when-to-use-rest-grpc-and-event-driven-messaging.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
