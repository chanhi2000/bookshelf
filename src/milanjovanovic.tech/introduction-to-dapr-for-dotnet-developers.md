---
lang: en-US
title: "Introduction to Dapr for .NET Developers"
description: "Article(s) > Introduction to Dapr for .NET Developers"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Dapr
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - dapr
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introduction to Dapr for .NET Developers"
    - property: og:description
      content: "Introduction to Dapr for .NET Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/introduction-to-dapr-for-dotnet-developers.html
prev: /programming/cs/articles/README.md
date: 2025-03-01
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_131.png
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
  name="Introduction to Dapr for .NET Developers"
  desc="Explore how Dapr helps .NET developers build better microservices with standardized building blocks, practical code examples, and seamless integration with .NET Aspire to simplify your distributed systems journey."
  url="https://milanjovanovic.tech/blog/introduction-to-dapr-for-dotnet-developers"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_131.png"/>

Building distributed systems has never been more important—or more challenging. As .NET developers, we're constantly juggling [**service discovery**](/milanjovanovic.tech/service-discovery-in-microservices-with-net-and-consul.md), state management, [**messaging**](/milanjovanovic.tech/simple-messaging-in-dotnet-with-redis-pubsub.md), [**resilience patterns**](/milanjovanovic.tech/building-resilient-cloud-applications-with-dotnet.md), and various infrastructure SDKs. Our business logic gets buried under mountains of plumbing code, and we become tightly coupled to specific technologies.

What if there was a better way?

Enter [<FontIcon icon="fas fa-globe"/>Dapr](https://dapr.io/) (Distributed Application Runtime), an open-source project that handles the complex infrastructure challenges so you can focus on what matters most: your application's business logic.

In this article, we'll explore how Dapr transforms microservice development for .NET developers by:

- Abstracting away infrastructure-specific code behind consistent APIs
- Providing standardized building blocks for common distributed system patterns
- Enabling you to use the same code from local development to production
- Integrating seamlessly with .NET and ASP.NET Core applications

Whether you're building your first microservice or evolving a complex system, Dapr offers a simpler path forward. Let's explore how it works.

---

## What is Dapr?

[<FontIcon icon="fas fa-globe"/>Dapr](https://dapr.io/) is a portable, event-driven runtime that simplifies building microservices. As a graduated project within the [<FontIcon icon="fas fa-globe"/>Cloud Native Computing Foundation](https://cncf.io/) (CNCF), Dapr has proven its value in production environments.

At its core, Dapr provides standardized building blocks that abstract away the complexity of common microservice patterns. Rather than wrestling with infrastructure-specific code, you can focus on your business logic while Dapr handles the rest.

Before Dapr, building a microservice architecture in .NET might require direct integration with multiple infrastructure components:

```cs
// Pre-Dapr approach - direct infrastructure dependencies
builder.Services.AddStackExchangeRedisCache(options => { options.Configuration = "redis:6379"; });

builder.Services.AddSingleton<IMessageBroker>(provider => new KafkaMessageBroker("kafka:9092"));

builder.Services.AddSingleton<ISecretManager>(provider =>
    new AzureKeyVaultClient(new Uri("https://myvault.vault.azure.net")));
```

This approach tightly couples your application to specific technologies.

With Dapr, you gain flexibility through standardized APIs:

```cs
// Dapr approach - simple, consistent APIs
builder.Services.AddDaprClient();

// Later in code:
// State management (could be Redis, Cosmos DB, etc.)
await daprClient.SaveStateAsync("statestore", "customer-123", customerData);

// Pub/sub (could be Kafka, RabbitMQ, etc.)
await daprClient.PublishEventAsync("pubsub", "orders", orderData);

// Secrets (could be Azure Key Vault, HashiCorp Vault, etc.)
var secret = await daprClient.GetSecretAsync("secretstore", "api-keys");
```

The underlying providers can be swapped without code changes - just by updating Dapr component configuration files.

---

## The Sidecar Pattern: How Dapr Works

Dapr uses the [<FontIcon icon="fa-brands fa-microsoft"/>sidecar](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar) architectural pattern, where it runs as a separate process alongside your application:

![Dapr sidecar diagram with the building blocks and services.<br/>Source: [<FontIcon icon="fas fa-globe"/>Dapr](https://dapr.io/)](https://milanjovanovic.tech/blogs/mnw_131/dapr_sidecar.png?imwidth=3840)

Your application communicates with the Dapr sidecar through HTTP or gRPC, and Dapr handles communication with infrastructure services. This separation brings several benefits:

- **Language Agnostic**: Dapr works with any programming language, including all .NET variants
- **Cross-cutting Concerns**: Security, observability, and resiliency are handled by Dapr, not your code
- **Infrastructure Abstraction**: Your application remains decoupled from specific technologies
- **Simplified Development**: Clean, maintainable code focused on business logic
- **Production Ready**: Built-in features that improve reliability in production environments

---

## Building Blocks: Dapr's Core Capabilities

Dapr offers several [<FontIcon icon="fas fa-globe"/>building blocks](https://docs.dapr.io/concepts/building-blocks-concept/) that solve common microservice challenges. Each provides a standardized API that abstracts away infrastructure complexity:

1. **Service Invocation**: Enables reliable service-to-service communication with automatic service discovery, load balancing, and retries.
2. **State Management**: Provides a unified way to store and retrieve state with features like concurrency control and transactions.
3. **Pub/Sub**: Implements asynchronous messaging between services, allowing for loosely-coupled, event-driven architectures.
4. **Workflows**: Enables you to define long running, persistent processes that span multiple microservices.
5. **Bindings**: Connects your applications to external systems, either for triggering your app from external events or invoking external services.
6. **Actors**: Implements the virtual actor pattern, making it easy to build stateful microservices with encapsulated state and behavior.
7. **Secrets**: Offers secure access to sensitive configuration like connection strings and API keys from various secret stores.
8. **Configuration**: Centralizes application settings with support for dynamic updates across multiple services.
9. **Distributed Lock**: Provides mutually exclusive access to shared resources in a distributed environment.
10. **Cryptography**: Offers encryption and decryption operations while handling key management.
11. **Jobs**: Allows you to schedule and orchestrate jobs (e.g., schedule batch processing jobs to run every business day)
12. **Conversation**: Lets you supply prompts to converse with different large language models (LLMs). Includes prompt caching and PII obfuscation.

Here's an overview of Dapr's building blocks and the most popular services they interact with:

![Dapr components diagram with the base building blocks and services.<br/>Source: [<FontIcon icon="fas fa-globe"/>Dapr](https://dapr.io/)](https://milanjovanovic.tech/blogs/mnw_131/dapr_components.png?imwidth=3840)

Let's explore the most commonly used building blocks in depth.

---

## Service Invocation

The [<FontIcon icon="fas fa-globe"/>service invocation](https://docs.dapr.io/developing-applications/building-blocks/service-invocation/service-invocation-overview/) building block enables reliable service-to-service communication with automatic mTLS encryption, retries, and observability.

This solves several challenging microservice problems:

- **Service Discovery**: Finding where services are located
- **Resilient Communication**: Handling transient failures gracefully
- **Load Balancing**: Distributing requests across multiple instances
- **Observability**: Tracking requests across service boundaries
- **Security**: Encrypting traffic between services

![Diagram showing how the service invocation flow looks like with Dapr.<br/>Source: [<FontIcon icon="fas fa-globe"/>Dapr](https://dapr.io/)](https://milanjovanovic.tech/blogs/mnw_131/dapr_service_invocation.png?imwidth=3840)

Here's a simple example of invoking a service using Dapr's .NET SDK:

```cs
// Client application making a request
using Dapr.Client;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDaprClient();

var app = builder.Build();

app.MapGet("/checkout/{itemId}", async (int itemId, DaprClient daprClient) =>
{
    // Create order data
    var orderData = new OrderData(itemId, DateTime.UtcNow);

    // Invoke the order-processing service
    var result = await daprClient.InvokeMethodAsync<OrderData, string>(
        "order-processor",
        "process-order",
        orderData);

    return Results.Ok(new { Message = $"Order {itemId} processed: {result}" });
});

await app.RunAsync();

public record OrderData(int ItemId, DateTime OrderedAt);
```

And the corresponding service handling the request:

```cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/process-order", (OrderData order) =>
{
    Console.WriteLine($"Processing order {order.ItemId} placed at {order.OrderedAt}");
    return $"Order {order.ItemId} confirmation: #{Guid.NewGuid().ToString()[..8]}";
});

await app.RunAsync();

public record OrderData(int ItemId, DateTime OrderedAt);
```

What's happening here:

- The `checkout` service calls `InvokeMethodAsync` using the `DaprClient` to send a request to the `order` service
- The Dapr sidecar for the checkout service receives this request
- The Dapr sidecar looks up the location of the order service
- The request is forwarded to the Dapr sidecar of the order service
- The order service's Dapr sidecar forwards the request to the order service
- The response follows the reverse path

This process provides automatic service discovery, encryption, retries, and distributed tracing without any additional code.

---

## Publish & Subscribe

The [<FontIcon icon="fas fa-globe"/>publish and subscribe](https://docs.dapr.io/developing-applications/building-blocks/pubsub/pubsub-overview/) building block provides asynchronous messaging between services with at-least-once delivery guarantees. This pattern is essential for building resilient, loosely-coupled microservices that can:

- Process operations asynchronously without blocking the user
- Continue functioning when downstream services are unavailable
- Scale independently based on workload

![Diagram showing how the publish subscribe flow looks like with Dapr.<br/>Source: [<FontIcon icon="fas fa-globe"/>Dapr](https://dapr.io/)](https://milanjovanovic.tech/blogs/mnw_131/dapr_publish_subscribe.png?imwidth=3840)

Pub/Sub in Dapr follows this flow:

- A publisher service sends a message to a topic via the Dapr sidecar
- The publisher Dapr sidecar converts the message to the [<FontIcon icon="fas fa-globe"/>CloudEvent](https://cloudevents.io/) format and forwards it to the configured message broker
- Subscriber services receive the message through their Dapr sidecars
- The subscriber application processes the message

Dapr uses component configuration files to define the pub/sub message broker. Here's a typical Redis pub/sub component:

```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: order-events
spec:
  type: pubsub.redis
  version: v1
  metadata:
    - name: redisHost
      value: localhost:6379
    - name: redisPassword
      value: ''
```

The key parts of this configuration are:

- `metadata.name`: The component name (`order-events`) that your application will reference when publishing/subscribing
- `spec.type`: The type of component (`pubsub.redis` in this case)
- `spec.metadata`: Configuration specific to the component type

This file should be placed in a `components` directory where Dapr can discover it. When running locally, this is typically `./components/` relative to your application.

What if you want to switch from Redis to RabbitMQ? You'd replace the `spec.type` with `pubsub.rabbitmq` and update the `metadata` section accordingly. This change doesn't require any code modifications in your application. Isn't this flexibility amazing?

Here's how to publish events using Dapr:

```cs
// Publisher service
using Dapr.Client;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDaprClient();

var app = builder.Build();

app.MapPost("/create-order", async (OrderRequest request, DaprClient daprClient) =>
{
    var orderEvent = new OrderCreatedEvent(
        request.OrderId,
        request.CustomerId,
        request.Items,
        DateTime.UtcNow
    );

    // Publish event to "orders" topic
    await daprClient.PublishEventAsync("order-events", "orders", orderEvent);

    return Results.Accepted();
});

await app.RunAsync();

public record OrderRequest(Guid OrderId, string CustomerId, List<string> Items);
public record OrderCreatedEvent(Guid OrderId, string CustomerId, List<string> Items, DateTime CreatedAt);
```

And here's how a subscriber would handle these events:

```cs
// Subscriber service
using Dapr;
using Microsoft.AspNetCore.OutputCaching;

var builder = WebApplication.CreateBuilder(args);

// Add Dapr event handling
builder.Services.AddDapr();
builder.Services.AddControllers();

var app = builder.Build();

// Required for Dapr pub/sub
app.UseCloudEvents();
app.MapSubscribeHandler();

// Subscribe to "orders" topic
app.MapPost("/events/orders", [Topic("order-events", "orders")] async (OrderCreatedEvent orderEvent) =>
{
    Console.WriteLine($"Processing order {orderEvent.OrderId} for customer {orderEvent.CustomerId}");
    await ProcessOrderAsync(orderEvent);
    return Results.Ok();
});

await app.RunAsync();

async Task ProcessOrderAsync(OrderCreatedEvent orderEvent)
{
    // Process the order
    await Task.Delay(100); // Simulate work
}

public record OrderCreatedEvent(Guid OrderId, string CustomerId, List<string> Items, DateTime CreatedAt);
```

The key components:

- The publisher uses Dapr to send events to a topic
- Dapr handles the interaction with the message broker (Kafka, Redis, etc.)
- The subscriber decorates endpoints with `[Topic]` attributes
- Dapr delivers the messages to the appropriate subscribers

Note that the `name` defined in the component file (`order-events` in our example) must match the first parameter used in `PublishEventAsync("order-events", ...)` and `[Topic("order-events", ...)]`. If these names don't match exactly, messages won't flow correctly between services.

---

## Dapr and .NET Aspire: Better Together

[<FontIcon icon="fas fa-globe"/>Dapr works seamlessly with .NET Aspire](https://diagrid.io/blog/net-aspire-dapr-what-are-they-and-how-they-complement-each-other), Microsoft's new cloud-ready stack for building distributed applications. While Aspire focuses on .NET-specific application orchestration, Dapr provides language-agnostic building blocks.

Here's how to integrate Dapr with a .NET Aspire application:

```cs
using CommunityToolkit.Aspire.Hosting.Dapr;

// Program.cs in the Aspire AppHost project
var builder = DistributedApplication.CreateBuilder(args);

// Add Aspire service and configure Dapr
var orderService = builder.AddProject<Projects.OrderService>("orderservice")
    .WithDaprSidecar(new DaprSidecarOptions
    {
        AppId = "order-api",
        Config = "./dapr/config.yaml",
        ResourcesPaths = ["./dapr/components"]
    });

// Add another service that can communicate with the order service via Dapr
var checkoutService = builder.AddProject<Projects.CheckoutService>("checkoutservice")
    .WithDaprSidecar(new DaprSidecarOptions
    {
        AppId = "checkout-api",
        Config = "./dapr/config.yaml",
        ResourcesPaths = ["./dapr/components"]
    })
    // Reference the order service by its Dapr app ID
    .WithReference(orderService);

builder.Build().Run();
```

Note that I'm using the `CommunityToolkit.Aspire.Hosting.Dapr` package, which is the official Dapr integration for .NET Aspire. The `Aspire.Hosting.Dapr` library is now deprecated.

Here's an example of how a message flow might look in the Aspire dashboard:

![A distributed trace from the Aspire dashboard showing a message flow from the checkout service to the order service.](https://milanjovanovic.tech/blogs/mnw_131/dapr_aspire_distributed_trace.png?imwidth=3840)

---

## Learning with Dapr University

If you're looking for a structured way to learn Dapr, I highly recommend checking out [<FontIcon icon="fas fa-globe"/>Dapr University](https://diagrid.ws/41oIYRX). You can run the hands-on lessons completely for free.

As someone who started with limited Dapr experience, I found the "Dapr 101" course particularly valuable. It provides hands-on exercises for State Management, Service Invocation, and Pub/Sub—exactly what you need to get started quickly.

![Dapr university learning platform.](https://milanjovanovic.tech/blogs/mnw_131/dapr_university.png?imwidth=3840)

---

## Conclusion

Dapr simplifies microservice development for .NET developers by providing standardized building blocks that handle infrastructure complexity. With its sidecar pattern, Dapr lets you focus on business logic while it manages cross-cutting concerns. As you build distributed applications, consider how Dapr can help you:

- Accelerate development with ready-made patterns
- Build more resilient systems with fewer lines of code
- Avoid vendor lock-in through abstraction (building blocks)
- Improve production reliability with built-in best practices

Ready to dive deeper? Check out [<FontIcon icon="fas fa-globe"/>Dapr University](https://diagrid.ws/41oIYRX) for comprehensive courses and hands-on learning.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introduction to Dapr for .NET Developers",
  "desc": "Explore how Dapr helps .NET developers build better microservices with standardized building blocks, practical code examples, and seamless integration with .NET Aspire to simplify your distributed systems journey.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/introduction-to-dapr-for-dotnet-developers.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
