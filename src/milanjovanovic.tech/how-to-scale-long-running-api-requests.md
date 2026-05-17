---
lang: en-US
title: "How to Scale Long-Running API Requests"
description: "Article(s) > How to Scale Long-Running API Requests"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Scale Long-Running API Requests"
    - property: og:description
      content: "How to Scale Long-Running API Requests"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-scale-long-running-api-requests.html
prev: /academics/system-design/articles/README.md
date: 2026-05-23
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_195.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Desgin > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Scale Long-Running API Requests"
  desc="When a single API call takes minutes to finish, it punishes both your users and your server. Here's the progression I walk through to turn long-running endpoints into something responsive, scalable, and operable - and when to reach for managed cloud services instead."
  url="https://milanjovanovic.tech/blog/how-to-scale-long-running-api-requests"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_195.png"/>

Every system I've worked on eventually grows an endpoint that takes minutes to finish (or longer). A report that aggregates years of data. A bulk import. A workflow that fans out to three external services and a database before it can answer.

You end up with two problems at once. Your users sit on a spinner for several minutes, and your API holds that request open the entire time - burning a thread, a connection, and a slot in your concurrency budget. A small traffic spike on that one endpoint could potentially take the rest of the API down with it.

I want to walk through the progression I use to fix this. It's the same path the diagram below traces, from "the request just blocks" to a fully decoupled, queue-backed worker pool - the shape I usually call an [**async API**](building-async-apis-in-aspnetcore-the-right-way.md).

Depending on your requirements, you might stop at any point along the way - but I want to make sure you understand the full path and the trade-offs at each step.

![System design progression for scaling long-running API requests, from synchronous request to queue-based competing consumers.](https://milanjovanovic.tech/blogs/mnw_195/scaling_long_running_requests.png)

---

## Step 0: The Naive Version

A user sends a request. The application server does the work. The work takes five minutes. The connection stays open the whole time.

There is nothing *wrong* with this approach - it's just paying for correctness with availability. The user experience is bad, and the blast radius is large: every long request you accept is a request you *can't* accept somewhere else.

The first realization you need to internalize is that **the response time and the work duration don't have to be the same thing**.

![Diagram of a blocking API request, where the user sends a request and waits for the work to finish before getting a response.](https://milanjovanovic.tech/blogs/mnw_195/blocking_api_request.png)

---

## Step 1: Accept the Work, Don't Do It

The first move is to stop doing the work inside the request.

I add a `jobs` table that represents the work I *intend* to do. The API endpoint now does three things:

1. Validate the request.
2. Insert a row into `jobs` with status `Pending`.
3. Return `202 Accepted` with a job ID.

A [**background processor**](running-background-tasks-in-asp-net-core.md) running inside the same API picks up `Pending` rows and works through them. The client either polls a `GET /jobs/{id}` endpoint or - better - I push updates via [**SignalR**](adding-real-time-functionality-to-dotnet-applications-with-signalr.md), [**Server-Sent Events**](server-sent-events-in-aspnetcore-and-dotnet-10.md), or email when the job is done.

![Diagram of an API request that accepts work and returns 202, with a background processor that picks up pending jobs and processes them asynchronously.](https://milanjovanovic.tech/blogs/mnw_195/202_accepted_background_processor.png)

This already buys you a lot. The endpoint returns in milliseconds, the user gets a job ID they can track, and a spike of incoming requests just becomes a spike of rows in a table. That table is cheap to write to.

But there's a ceiling here, and it's easy to hit.

---

## Step 2: Decouple the Worker From the API

The background processor in Step 1 still lives inside your API process. It competes for the same CPU, memory, and connection pool as your real endpoints. If processing gets heavy or slow, your API starts feeling it - the very thing you were trying to avoid.

The fix is to pull the background processor out into its own deployable, and put a queue between the two.

The API now publishes a message to the queue (and optionally writes the job row for tracking). A pool of background workers consumes from the queue and does the actual work - the same shape I covered in [**event-driven architecture with RabbitMQ**](event-driven-architecture-in-dotnet-with-rabbitmq.md). This is the **competing consumers** pattern, and it gives you something the previous step couldn't: **independent scaling**.

![System design progression for scaling long-running API requests, from synchronous request to queue-based competing consumers.](https://milanjovanovic.tech/blogs/mnw_195/scaling_long_running_requests_final.png)

Three things change once you cross this line:

- **The queue absorbs spikes.** Your API can keep accepting work at a constant rate while the workers drain at their own pace.
- **You scale workers separately from the API.** More throughput on background jobs doesn't mean more API instances.
- **Failures become normal.** A worker crash is just a message that goes back on the queue, not a 500 to your user.

You also get retryability, pause/resume, structured error handling, and a **dead-letter queue** for poison messages - effectively for free, because the queue infrastructure already provides them.

---

## What This Costs You

I'd be lying if I said this was a free upgrade.

You're now running a queue, a worker fleet, and a notification path. That's more moving parts to deploy, monitor, and alert on. Your "is this done yet?" semantics are no longer obvious from the HTTP response - the client has to ask, or you have to tell them. And every job needs to be [**idempotent**](the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.md), because at-least-once delivery means your workers *will* see duplicates.

If you only have one slow endpoint and modest traffic, this is overkill. A simple "fire-and-forget with status polling" inside the same process is fine. Don't reach for a queue until the pain justifies it.

---

## When I'd Use a Cloud Service Instead

You don't always need to assemble this from parts. A few alternatives I would consider:

- [**AWS SQS**](complete-guide-to-amazon-sqs-and-amazon-sns-with-masstransit.md) **Lambda** or [**Azure Service Bus**](messaging-made-easy-with-azure-service-bus.md) **Azure Functions** when I want the worker pool to scale to zero and I don't want to manage hosts.
- **Azure Durable Functions** or **AWS Step Functions** when the work is a multi-step workflow with timers, retries, and human approvals. Orchestration is what they're good at.
- [<VPIcon icon="fas fa-globe"/>Temporal](https://temporal.io/) when the workflow is long-lived (hours, days) and I need first-class durable execution, versioning, and visibility across runs.

The trade-off is the usual one: less operational work, more vendor coupling, and a pricing model you need to model carefully when throughput grows.

---

## Summary

The progression is simple, and it generalizes:

1. **Don't do slow work inside the request.** Accept it, persist it, return `202`.
2. **Don't run workers inside the API.** Put a queue in between and scale the two sides independently.
3. **Tell the user when it's done.** Polling is fine, push is better.

This isn't a microservices argument. It's a separation between *accepting work* and *doing work* - two concerns that have very different scaling profiles and very different failure modes.

If you want the full implementation walkthrough, the [<VPIcon icon="fa-brands fa-youtube"/>video version is here](https://youtu.be/U40HzU_KkDY).

<VidStack src="youtube/U40HzU_KkDY" />

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Scale Long-Running API Requests",
  "desc": "When a single API call takes minutes to finish, it punishes both your users and your server. Here's the progression I walk through to turn long-running endpoints into something responsive, scalable, and operable - and when to reach for managed cloud services instead.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-scale-long-running-api-requests.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
