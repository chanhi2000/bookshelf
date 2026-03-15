---
lang: en-US
title: "Scaling SignalR With a Redis Backplane"
description: "Article(s) > Scaling SignalR With a Redis Backplane"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Scaling SignalR With a Redis Backplane"
    - property: og:description
      content: "Scaling SignalR With a Redis Backplane"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/scaling-signalr-with-redis-backplane.html
prev: /programming/cs/articles/README.md
date: 2026-03-21
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_186.png
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
  name="Scaling SignalR With a Redis Backplane"
  desc=".NET • ASP.NET Core • Software Architecture"
  url="https://milanjovanovic.tech/blog/scaling-signalr-with-redis-backplane"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_186.png"/>

I ran into this one the hard way.

I built a [**real-time notification feature with SignalR**](/milanjovanovic.tech/adding-real-time-functionality-to-dotnet-applications-with-signalr.md), tested it locally, everything worked great. Then I scaled to two instances behind a load balancer, and notifications started disappearing for some users.

The code was fine. The problem was that **SignalR connections are bound to the server process that accepted them**. Each instance only knows about its own connections. So when an API request lands on Server 1 but the user is connected to Server 2, the notification just... doesn't get delivered.

This is the SignalR scale-out problem, and it bites almost everyone who goes from one instance to more.

---

## Why SignalR Breaks When You Scale Out

With a single instance, everything just works.

![SignalR single server deployment showing all clients connected to the same server.](https://milanjovanovic.tech/blogs/mnw_186/signalr_single_server.png?imwidth=3840)

The server holds the full map of who's connected, so sending a message to a user, a group, or all clients works because that map is complete.

But scale out to two or more instances, and that map fractures.

![SignalR multi-server deployment showing clients connected to different servers.](https://milanjovanovic.tech/blogs/mnw_186/signalr_multi_server.png?imwidth=3840)

Server 1 has no idea Client 3 or Client 4 even exist. So when an order status change happens on Server 1 and needs to reach Client 3, Server 1 checks its connection map, finds nothing, and the message is quietly dropped.

---

## The Backplane Pattern

The fix is a **backplane** - a shared messaging layer that sits between all your server instances.

Every server publishes outgoing messages to a central channel, and every server subscribes to that same channel. When a message comes in, each server checks if any of its local connections should receive it.

![SignalR backplane deployment showing clients connected to different servers.](https://milanjovanovic.tech/blogs/mnw_186/signalr_backplane.png?imwidth=3840)

When Server 1 wants to notify Client 3:

1. Server 1 publishes the message to the backplane
2. All servers receive the message
3. Server 2 recognizes Client 3 as one of its connections and delivers the notification

From your code's perspective, it looks like every server can see every connection. Redis works really well for this because its [**Pub/Sub**](/milanjovanovic.tech/simple-messaging-in-dotnet-with-redis-pubsub.md) delivers messages to all subscribers in near real-time. And if you're already using Redis for [**distributed caching**](/milanjovanovic.tech/caching-in-aspnetcore-improving-application-performance.md), you don't even need to spin up anything new.

---

## Setting It Up

Let me walk through how I set this up in an order notification system. Clients connect to a SignalR hub, authenticate via JWT, and get real-time status updates when an order changes.

### Install the NuGet Package

```sh
dotnet add package Microsoft.AspNetCore.SignalR.StackExchangeRedis
```

### Register the Backplane

Chain `.AddStackExchangeRedis()` onto your `AddSignalR()` call:

```cs
builder.Services.AddSignalR()
    .AddStackExchangeRedis(builder.Configuration.GetConnectionString("cache")!);
```

If you're running with [**.NET Aspire**](/milanjovanovic.tech/dotnet-aspire-a-game-changer-for-cloud-native-development.md), you will have the Redis connection string registered via environment variables, so you can just pull it from configuration. Reference the same named connection:

```cs
builder.AddRedisDistributedCache("cache");

builder.Services.AddSignalR()
    .AddStackExchangeRedis(builder.Configuration.GetConnectionString("cache")!);
```

If you have multiple SignalR apps sharing the same Redis instance, you'll want to add a channel prefix. Otherwise, messages from one app will reach subscribers in every app on that Redis server.

```cs
builder.Services.AddSignalR()
    .AddStackExchangeRedis(connectionString, options =>
    {
        options.Configuration.ChannelPrefix = RedisChannel.Literal("OrderNotifications");
    });
```

The nice thing is that your `IHubContext<>` call site doesn't change at all. `Clients.User(...)` works the same whether you have one instance or ten - the backplane handles routing behind the scenes.

When I tested this with two replicas in [**.NET Aspire**](/milanjovanovic.tech/dotnet-aspire-a-game-changer-for-cloud-native-development.md), I tagged each notification with the sending instance's ID. A client on Replica 1 received a notification stamped with Replica 2's ID, which confirmed the message was crossing instances through Redis.

---

## The Sticky Sessions Requirement

This is something you should know before you set up the backplane: **you still need sticky sessions**.

The Redis backplane solves message *routing*, but it does **not** remove the need for sticky sessions.

SignalR's connection negotiation is a two-step process:

1. The client sends a `POST` to `/hub/negotiate` to obtain a connection token
2. The client uses that token to establish the WebSocket connection

Both requests must land on the **same server**. If your load balancer routes the negotiation to Server 1 but the WebSocket upgrade to Server 2, the connection fails.

![SignalR connection negotiation showing the need for sticky sessions.](https://milanjovanovic.tech/blogs/mnw_186/sticky_sessions.png?imwidth=3840)

**Make sure sticky sessions are enabled in your load balancer.** Most load balancers support this via IP hash or cookie affinity - check the docs for whichever you're using.

---

## What Happens When Redis Goes Down?

One thing worth knowing: **SignalR does not buffer messages when Redis is unavailable**.

If Redis stops responding, any messages sent during the outage are simply lost. SignalR may throw exceptions, but your existing WebSocket connections stay open - clients don't get disconnected. Once Redis comes back, SignalR reconnects automatically.

For most real-time scenarios like order updates or live dashboards, this is fine. The next state change triggers a fresh notification anyway, or the user can just reload. If you're dealing with something more critical (financial data, operational alerts), you'll want a reconciliation strategy on reconnect or a durable queue running alongside.

---

## Redis Backplane vs. Azure SignalR Service

If you're on Azure, the managed [<VPIcon icon="iconfont icon-microsoftazure"/>Azure SignalR Service](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-overview) is worth considering. It proxies all client connections through the service, so sticky sessions aren't required and your servers only hold a small number of constant connections to the service.

The Redis backplane is the better fit when you're self-hosted, latency-sensitive, or already running Redis. For everything else, Azure SignalR Service is the cleaner option.

---

## Summary

Honestly, the Redis backplane is almost *too* simple to set up. One method call on `AddSignalR()` and your app goes from silently dropping messages to routing them across every instance. You don't need to make changes to your hub code, client code, or application logic.

Just remember two things:

- **You still need sticky sessions**
- **Messages aren't buffered** if Redis goes down temporarily

Get those two right and SignalR scales out just as smoothly as the rest of your stack.

If you want to go deeper on building real-time features and APIs in .NET, check out my [**Pragmatic REST APIs**](/milanjovanovic.tech/pragmatic-rest-apis/README.md) course.

Hope this was useful. See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scaling SignalR With a Redis Backplane",
  "desc": ".NET • ASP.NET Core • Software Architecture",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/scaling-signalr-with-redis-backplane.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
