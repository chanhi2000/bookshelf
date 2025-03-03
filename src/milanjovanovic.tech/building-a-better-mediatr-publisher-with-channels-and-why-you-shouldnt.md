---
lang: en-US
title: "Building a Better MediatR Publisher With Channels (and why you shouldn't)"
description: "Article(s) > Building a Better MediatR Publisher With Channels (and why you shouldn't)"
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
      content: "Article(s) > Building a Better MediatR Publisher With Channels (and why you shouldn't)"
    - property: og:description
      content: "Building a Better MediatR Publisher With Channels (and why you shouldn't)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/building-a-better-mediatr-publisher-with-channels-and-why-you-shouldnt.html
prev: /programming/cs/articles/README.md
date: 2025-02-22
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_130.png
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
  name="Building a Better MediatR Publisher With Channels (and why you shouldn't)"
  desc="Discover why MediatR's notification publishers block your application, and explore a Channel-based solution before reaching for a message queue."
  url="https://milanjovanovic.tech/blog/building-a-better-mediatr-publisher-with-channels-and-why-you-shouldnt"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_130.png"/>

I've been meaning to write this article for a while now. This problem has been bugging me, and I finally found the time to address it.

What problem is that?

Well, it's about MediatR's [**notification publishing**](/milanjovanovic.tech/how-to-publish-mediatr-notifications-in-parallel.md) mechanism.

MediatR supports simple in-process publish/subscribe capabilities. This lets you broadcast notifications to multiple handlers without coupling them directly to the publisher.

While MediatR's notification system appears asynchronous at first glance, **it's not**.

By asynchronous, I mean that the publishing thread should not wait for all handlers to complete. Instead, it should return immediately after queuing the notification for processing.

In this article, we'll understand MediatR's notification publishing mechanics. We'll use distributed tracing to examine its execution model, and explore alternatives for true asynchronous processing.

---

## The Notification Publisher

[<FontIcon icon="iconfont icon-github"/>`jbogard/MediatR`](https://github.com/jbogard/MediatR) provides two built-in implementations of its `INotificationPublisher` interface. They each have distinct characteristics but share one crucial trait: they block the publishing thread until the handlers complete.

Here's the `INotificationPublisher` interface:

```cs :collapsed-lines title="INotificationPublisher.cs"
public interface INotificationPublisher
{
    Task Publish(
        IEnumerable<NotificationHandlerExecutor> handlerExecutors,
        INotification notification,
        CancellationToken cancellationToken);
}
```

This interface provides the contract for executing notification handlers, but the execution strategy is left to the implementing classes.

By default, MediatR uses the `ForeachAwaitPublisher`:

```cs title="ForeachAwaitPublisher.cs"
public class ForeachAwaitPublisher : INotificationPublisher
{
    public async Task Publish(
        IEnumerable<NotificationHandlerExecutor> handlerExecutors,
        INotification notification,
        CancellationToken cancellationToken)
    {
        foreach (var handler in handlerExecutors)
        {
            await handler.HandlerCallback(notification, cancellationToken).ConfigureAwait(false);
        }
    }
}
```

This implementation processes handlers sequentially, ensuring a predictable order of execution.

The alternative `TaskWhenAllPublisher` offers concurrent execution:

```cs title="TaskWhenAllPublisher.cs"
public class TaskWhenAllPublisher : INotificationPublisher
{
    public Task Publish(
        IEnumerable<NotificationHandlerExecutor> handlerExecutors,
        INotification notification,
        CancellationToken cancellationToken)
    {
        var tasks = handlerExecutors
            .Select(handler => handler.HandlerCallback(notification, cancellationToken))
            .ToArray();

        return Task.WhenAll(tasks);
    }
}
```

While this publisher executes handlers concurrently, it's crucial to understand that "concurrent" doesn't mean [**"background processing"**](/milanjovanovic.tech/building-async-apis-in-aspnetcore-the-right-way.md). The publishing thread still waits for all handlers to complete before continuing.

---

## Proving the Point with OpenTelemetry

To demonstrate the blocking nature of both publishers, let's set up a simple example with [<FontIcon icon="fas fa-globe"/>OpenTelemetry](https://opentelemetry.io/) tracing:

```cs{9-11} :collapsed-lines
var builder = WebApplication.CreateBuilder(args);

// This will register all handlers in the same assembly as the Program class
// We're also configuring the notifcation publisher
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<Program>();

    cfg.NotificationPublisherType = typeof(ForeachAwaitPublisher);
    // or we could say 👇
    // cfg.NotificationPublisherType = typeof(TaskWhenAllPublisher);
});

builder.Services
    .AddOpenTelemetry()
    .ConfigureResource(r => r.AddService(DiagnosticConfig.Source.Name))
    .WithTracing(tracing =>
        tracing
            .AddAspNetCoreInstrumentation()
            .AddSource(DiagnosticConfig.Source.Name))
    .UseOtlpExporter();

var app = builder.Build();

// Dummy endpoint to trigger the notification
app.MapPost("orders", async (IMediator mediator) =>
{
    using var activity = DiagnosticConfig.Source.StartActivity("CreateOrder");

    var orderId = Guid.NewGuid();
    // Just publish the notification, we don't care about doing "real" work here
    await mediator.Publish(new OrderCreatedNotification
    {
        OrderId = orderId,
        ParentId = activity?.Id // Propagating the parent activity ID
    });

    return Results.Ok(orderId);
});

app.Run();

// The simple notification class
public class OrderCreatedNotification : INotification
{
    public Guid OrderId { get; set; }
    public string? ParentId { get; set; }
}

// A slow handler to simulate blocking behavior
public class SlowOrderCreatedHandler(ILogger<SlowOrderCreatedHandler> logger)
    : INotificationHandler<OrderCreatedNotification>
{
    public async Task Handle(OrderCreatedNotification notification, CancellationToken token)
    {
        using var activity = DiagnosticConfig.Source.StartActivity(
            "SlowOrderCreatedHandler.Handle",
            ActivityKind.Internal,
            notification.ParentId);

        await Task.Delay(2000, token); // Simulate work

        logger.LogInformation(
            "Slow handler completed for order {OrderId}",
            notification.OrderId);
    }
}

// Defines the OpenTelemetry ActivitySource
internal static class DiagnosticConfig
{
    internal static readonly ActivitySource Source = new("Order.Service");
}
```

When we examine the resulting traces, we'll see that the handler execution spans are contained within the HTTP request span, indicating that the request thread is blocked until all handlers complete.

Now, let's see how these publishers behave in practice. I'll add a few more handlers to the mix to make the example more interesting.

### ForeachAwaitPublisher Traces

You can see the sequential execution of handlers in the trace visualization. The request span encompasses all handler execution, demonstrating the blocking nature of the `ForeachAwaitPublisher`.

![Distributed trace demonstrating notification handling.](https://milanjovanovic.tech/blogs/mnw_130/foreachawait_publisher.png?imwidth=3840)

### TaskWhenAllPublisher Traces

Similarly, the `TaskWhenAllPublisher` shows concurrent handler execution within the request span. We do get a slight improvement in handler execution time, but the request thread still waits for all handlers to complete before returning.

![Distributed trace demonstrating notification handling.](https://milanjovanovic.tech/blogs/mnw_130/taskwhenall_publisher.png?imwidth=3840)

---

## Building an Async Notification Publisher with Channels

How can we make MediatR's notification publishing truly asynchronous?

We'll implement a custom `INotificationPublisher` that leverages `System.Threading.Channels` for true asynchronous processing. This implementation will queue notifications for background processing, allowing the publishing thread to return immediately.

Here's the `ChannelPublisher`:

```cs title="ChannelPublisher.cs"
// The publisher just queues the notification for processing
public class ChannelPublisher(NotificationsQueue queue) : INotificationPublisher
{
    public async Task Publish(
        IEnumerable<NotificationHandlerExecutor> handlerExecutors,
        INotification notification,
        CancellationToken cancellationToken)
    {
        // Write the message to the channel, and return immediately
        await queue.Writer.WriteAsync(
            new NotificationEntry(handlerExecutors.ToArray(), notification),
            cancellationToken);
    }
}

// It's the Channel that handles the actual message passing
// We can control the capacity and backpressure handling here
public class NotificationsQueue(int capacity = 100)
{
    private readonly Channel<NotificationEntry> _queue =
        Channel.CreateBounded<NotificationEntry>(new BoundedChannelOptions(capacity)
        {
            FullMode = BoundedChannelFullMode.Wait // Backpressure handling
        });

    public ChannelReader<NotificationEntry> Reader => _queue.Reader;
    public ChannelWriter<NotificationEntry> Writer => _queue.Writer;
}

// A simple data structure to hold the notification and handlers
public record NotificationEntry(NotificationHandlerExecutor[] Handlers, INotification Notification);

// Program.cs
builder.Services.AddSingleton<NotificationsQueue>();
```

But this is just part of the solution. We need a background service to process the queued notifications:

```cs title="ChannelPublisherWorker.cs"
// We'll use the NotificationsQueue to read and process notifications
public class ChannelPublisherWorker(NotificationsQueue queue) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Read notifications from the queue and process them
        await foreach (NotificationEntry entry in queue.Reader.ReadAllAsync(stoppingToken))
        {
            // Parallel.ForEachAsync for style points
            await Parallel.ForEachAsync(entry.Handlers, stoppingToken, async (executor, token) =>
            {
                // We're finally executing the handler
                await executor.HandlerCallback(entry.Notification, token);
            });
        }
    }
}

// Program.cs
builser.Services.AddHostedService<ChannelPublisherWorker>();
```

This implementation offers several advantages:

- True background processing - the publisher returns immediately after queueing the notification
- Backpressure handling through bounded channel capacity
- Independent handler execution

To use this publisher, register it with MediatR by setting the `NotificationPublisherType` to be `ChannelPublisher`:

```cs
services.AddMediatR(cfg =>
{
    cfg.NotificationPublisherType = typeof(ChannelPublisher);
});
```

Let's see how this implementation performs in practice.

---

## Comparing Approaches With OpenTelemetry

When we examine the traces with our `ChannelPublisher`, we'll see a significant difference:

1. The HTTP request span completes quickly after queueing the notification
2. Handler execution spans appear as separate traces
3. Overall system responsiveness improves

![Distributed trace demonstrating notification handling.](https://milanjovanovic.tech/blogs/mnw_130/channel_publisher.png?imwidth=3840)

This visualization clearly demonstrates the non-blocking nature of our implementation.

But is it worth it?

Here's what you should consider first before adopting this approach:

- The `ChannelPublisher` introduces additional complexity compared to the built-in publishers
- Error handling is your responsibility (e.g., retrying failed handlers, [<FontIcon icon="fa-brands fa-wikipedia-w"/>dead-letter queue](https://en.wikipedia.org/wiki/Dead_letter_queue))
- And did I mention [**idempotent consumers**](/milanjovanovic.tech/idempotent-consumer-handling-duplicate-messages)? Yeah... you need those too
- [**Channels**](/milanjovanovic.tech/lightweight-in-memory-message-bus-using-dotnet-channels) aren't durable - messages are lost if the application crashes

Before you know it, you might find yourself reinventing the wheel with a custom message queueing system.

Instead, consider using a real message broker like [<FontIcon icon="iconfont icon-rabbitmq"/>RabbitMQ](https://rabbitmq.com/). Combine it with a library like [<FontIcon icon="fas fa-globe"/>MassTransit](https://masstransit.io) or [<FontIcon icon="fas fa-globe"/>NServiceBus](https://particular.net/nservicebus) for a robust, scalable, and reliable messaging solution.

---

## Takeaway

MediatR's notification system is great for simple in-process pub/sub scenarios. However, the built-in publishers can become a bottleneck in high-throughput applications due to their blocking nature.

The `ChannelPublisher` implementation we explored offers true asynchronous processing. However, it also comes with extra complexity around message handling and delivery guarantees. Managing message persistence, error handling, retries, and idempotency quickly becomes challenging.

If your application requires these features, you'll be better off adopting a mature solution like [**RabbitMQ**](/milanjovanovic.tech/using-masstransit-with-rabbitmq-and-azure-service-bus.md) or [**Amazon SQS**](/milanjovanovic.tech/complete-guide-to-amazon-sqs-and-amazon-sns-with-masstransit.md).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a Better MediatR Publisher With Channels (and why you shouldn't)",
  "desc": "Discover why MediatR's notification publishers block your application, and explore a Channel-based solution before reaching for a message queue.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/building-a-better-mediatr-publisher-with-channels-and-why-you-shouldnt.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
