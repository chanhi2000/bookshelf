---
lang: en-US
title: "Getting Started With NATS JetStream in .NET"
description: "Article(s) > Getting Started With NATS JetStream in .NET"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting Started With NATS JetStream in .NET"
    - property: og:description
      content: "Getting Started With NATS JetStream in .NET"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloggetting-started-with-nats-jetstream-in-dotnet.html
prev: /programming/cs/articles/README.md
date: 2026-06-27
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_200.png
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Getting Started With NATS JetStream in .NET"
  desc="NATS almost never comes up when .NET developers talk about message queues, and that's a shame. It's a tiny, fast, single-binary broker, and JetStream adds durable, at-least-once delivery on top. Here's why it's worth a look and how to wire it into an ASP.NET Core app."
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techbloggetting-started-with-nats-jetstream-in-dotnet"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_200.png"/>

When .NET developers need a message queue, they reach for [**RabbitMQ**](/milanjovanovic.tech/event-driven-architecture-in-dotnet-with-rabbitmq.md), [**Azure Service Bus**](/milanjovanovic.tech/messaging-made-easy-with-azure-service-bus.md), or a Postgres table.

NATS almost never comes up. That's a shame: it's quietly become one of my favorite tools for this.

NATS is a messaging system written in Go that runs as a single binary with no external dependencies. **JetStream**, its durable layer, turns it into a real queue with at-least-once delivery. And the [.NET client (<VPIcon icon="iconfont icon-github"/>`nats-io/nats.net`)](https://github.com/nats-io/nats.net) is a pleasure to work with.

---

## Core NATS vs JetStream

NATS has two layers, and the difference matters.

Core [<VPIcon icon="fas fa-globe"/>NATS](https://nats.io) is fire-and-forget pub/sub. You publish to a subject, and whoever is subscribed at that moment gets it. If no one is listening, the message is gone, which suits live notifications but not a work queue.

[<VPIcon icon="fas fa-globe"/>JetStream](https://docs.nats.io/nats-concepts/jetstream) is the persistence layer on top. It captures messages published to a subject into a stream on disk, so a consumer can read them later, even after a restart. That persistence is what turns a subject into a durable queue.

![Core NATS drops a message when no subscriber is online; JetStream persists it to a file-backed stream and delivers it later](https://milanjovanovic.tech/blogs/mnw_200/core_nats_vs_jetstream.png)
<!-- TODO: mermaid화 -->

---

## Why It's Worth a Look

A few things stood out coming from the usual brokers:

- **Tiny.** The official server image is about **18 MB**, a single Go binary with no ZooKeeper or Erlang to babysit.
- **Fast.** Core NATS pushes **millions** of small messages per second on a single node. JetStream adds disk persistence, so it's slower, but still comfortably in the **hundreds of thousands** per second.
- **Cheap to run.** A server idles in tens of megabytes of RAM, so it runs right next to your app.
- **Flexible per stream.** Each [<VPIcon icon="fas fa-globe"/>ream](https://docs.nats.io/nats-concepts/jetstream/streams) sets its own storage and retention, so one server can host a cache and a strict work queue side by side.

---

## Set It Up

You need the server and two NuGet packages.

Run the server with JetStream enabled. `-js` turns it on, and `-sd` points it at a directory so streams survive a restart:

```yaml title="docker-compose.yml"
nats:
  image: nats:2.14-alpine
  command: ['-js', '-sd', '/data']
  ports: ['4222:4222']
  volumes:
    - nats-data:/data
  restart: unless-stopped
```

Add the client and its dependency-injection integration:

```sh
dotnet add package NATS.Net
dotnet add package NATS.Extensions.Microsoft.DependencyInjection
```

Then wire it into `Program.cs`. `AddNatsClient` registers one multiplexed, self-reconnecting connection, and the next line exposes a JetStream context to inject anywhere:

```cs title="Program.cs"
builder.Services.AddNatsClient(nats =>
    nats.ConfigureOptions(opts => opts with { Url = "nats://localhost:4222" }));

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<INatsConnection>().CreateJetStreamContext());
```

---

## Publish a Job

With the JetStream context in DI, a Minimal API endpoint publishes in one call. `Job` is a plain record, and `NATS.Net` serializes it to JSON for you, so you work with typed messages, no extra setup. `EnsureSuccess` throws if the stream didn't store the message:

```cs
app.MapPost("/jobs", async (CreateJob request, INatsJSContext js, CancellationToken ct) =>
{
    var job = new Job(Guid.NewGuid(), request.Payload);

    PubAckResponse ack = await js.PublishAsync("jobs.work", job, cancellationToken: ct);
    ack.EnsureSuccess();

    return Results.Accepted($"/jobs/{job.Id}");
});
```

![A producer publishes to a work-queue stream, and a pool of workers competes on one durable pull consumer](https://milanjovanovic.tech/blogs/mnw_200/nats_job_pipeline.png)
<!-- TODO: mermaid화 -->

---

## Process Jobs in a Worker

A `BackgroundService` is the natural home for the consumer. It creates the stream and durable consumer on startup, then pulls messages in a loop. Every running instance shares the `workers` consumer, so they compete for jobs and each runs once:

```cs
public class JobWorker(INatsJSContext js) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        await js.CreateStreamAsync(new StreamConfig("JOBS", ["jobs.work"])
        {
            Retention = StreamConfigRetention.Workqueue, // a queue: acked messages are removed
            Storage   = StreamConfigStorage.File         // durable: survives a restart
        }, ct);

        var consumer = await js.CreateOrUpdateConsumerAsync("JOBS", new ConsumerConfig("workers")
        {
            AckPolicy  = ConsumerConfigAckPolicy.Explicit,
            AckWait    = TimeSpan.FromSeconds(30), // must exceed your worst-case processing time
            MaxDeliver = 5                         // drop a poison message after 5 tries
        }, ct);

        await foreach (var msg in consumer.ConsumeAsync<Job>(cancellationToken: ct))
        {
            await ProcessAsync(msg.Data, ct);          // the side effect
            await msg.AckAsync(cancellationToken: ct); // then ack
        }
    }
}
```

Register it with `builder.Services.AddHostedService<JobWorker>()`. The worker is a singleton, so resolve scoped dependencies like `DbContext` through `IServiceScopeFactory`.

Two stream settings shape how the queue behaves.

`Storage` is `File` (on disk, survives restarts) or `Memory` (faster, but gone on restart).

`Retention` controls when a message leaves the stream:

- `Limits` (the default) keeps every message until it hits an age, size, or count limit. The stream is a replayable log, and reading a message doesn't remove it.
- `Workqueue` drops a message the moment a consumer acks it, so the stream itself is the queue. Messages are delivered in publish order, oldest first (FIFO).
- `Interest` keeps a message only while a consumer still needs it, then drops it once every interested consumer acks.

For a job queue: `Workqueue` on `File`, as in the worker above.

---

## Acknowledge After the Side Effect

Look closely at the worker loop: it processes first, then acks. That order is the rule that makes JetStream reliable, and most quickstarts skip it.

**Acknowledge the message *after* the side effect, never before.**

JetStream gives you at-least-once delivery. If a worker runs a job and crashes before acking, JetStream redelivers it. But ack before the work is finished, and a crash leaves the job marked done with nothing to show for it.

![A worker fetches a job, runs it, persists the result, and only then acks; a crash before the ack causes a redelivery](https://milanjovanovic.tech/blogs/mnw_200/ack_after_side_effect.png)
<!-- TODO: mermaid화 -->

The flip side is that a job can run more than once, so your handler has to be idempotent. The usual fix is to track the messages you've already handled and skip duplicates, in the same transaction as the side effect. I covered the full pattern in [**The Idempotent Consumer Pattern in .NET**](/milanjovanovic.tech/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.md). At-least-once delivery only holds up when the handler reading the stream is idempotent.

---

## Summary

NATS JetStream gives you a durable, at-least-once work queue from a single 18 MB binary, and it slots into an ASP.NET Core app cleanly: publish from an endpoint, process in a `BackgroundService`, ack after the work is done.

I went in skeptical, half-expecting to miss RabbitMQ. It won me over: easy to operate, no surprises, and it clusters with Raft-based replication when a bigger load calls for it. It's now the first thing I reach for when I need a queue and don't want to think much about the broker. It runs my own production job queue today, and I wrote up that design (two streams, competing consumers, publish-before-ack) in [**how I use NATS JetStream as a job queue in .NET**](/milanjovanovic.tech/nats-jetstream-job-queue-dotnet.md).

If you haven't tried it, spin up the container and publish a message. That's all there is to getting started.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Started With NATS JetStream in .NET",
  "desc": "NATS almost never comes up when .NET developers talk about message queues, and that's a shame. It's a tiny, fast, single-binary broker, and JetStream adds durable, at-least-once delivery on top. Here's why it's worth a look and how to wire it into an ASP.NET Core app.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloggetting-started-with-nats-jetstream-in-dotnet.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
