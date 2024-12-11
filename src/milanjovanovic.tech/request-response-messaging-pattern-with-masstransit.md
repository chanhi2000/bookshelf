---
lang: ko-KR
title: Request-Response Messaging Pattern With MassTransit
description: Article(s) > Request-Response Messaging Pattern With MassTransit
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
      content: Article(s) > Request-Response Messaging Pattern With MassTransit
    - property: og:description
      content: Request-Response Messaging Pattern With MassTransit
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/request-response-messaging-pattern-with-masstransit.html
prev: /programming/cs/articles/README.md
date: 2024-04-27
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_087.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Request-Response Messaging Pattern With MassTransit"
  desc="When building distributed systems with .NET, direct calls between services can create tight coupling. The request-response messaging pattern can allow distributed services to communicate in a loosely coupled way."
  url="https://milanjovanovic.tech/blog/request-response-messaging-pattern-with-masstransit/"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_087.png"/>

Building distributed applications might seem simple at first. It's just servers talking to each other. Right?

However, it opens a set of potential problems you must consider. What if the network has a hiccup? A service unexpectedly crashes? You try to scale, and everything crumbles under the load? This is where the way your distributed system communicates becomes critical.

Traditional synchronous communication, where services call each other directly, is inherently fragile. It creates tight coupling, making your whole application vulnerable to single points of failure.

To combat this, we can turn to distributed messaging (and introduce an entirely different set of problems, but that's a story for another issue).

One powerful tool for achieving this in the .NET world is MassTransit.

In this week's issue, we'll explore MassTransit's implementation of the request-response pattern.

---

## Request-Response Messaging Pattern Introduction

Let's start by explaining how the request-response messaging pattern works.

The request-response pattern is just like making a traditional function call but over the network. One service, the requester, sends a request message and waits for a corresponding response message. This is a [**synchronous communication approach**](/milanjovanovic.tech/modular-monolith-communication-patterns.md) from the requester's side.

The good parts:

- **Loose Coupling**: Services don't need direct knowledge of each other, only of the message contracts. This makes changes and scaling easier.
- **Location Transparency**: The requester doesn't need to know *where* the responder is located, leading to improved flexibility.

The bad parts:

- **Latency**: The overhead of messaging adds some additional latency.
- **Complexity**: Introducing a messaging system and managing the additional infrastructure can increase project complexity.

![Request response messaging pattern diagram.](https://milanjovanovic.tech/blogs/mnw_087/request_response.png?imwidth=3840)

---

[**MassTransit**](/milanjovanovic.tech/using-masstransit-with-rabbitmq-and-azure-service-bus.md) supports the [<FontIcon icon="fas fa-globe"/>request-response](https://masstransit.io/documentation/concepts/requests) messaging pattern out of the box. We can use a **request client** to send requests and wait for a response. The request client is asynchronous and supports the `await` keyword. The request will also have a timeout of 30 seconds by default, to prevent waiting for the response for too long.

Let's imagine a scenario where you have an order processing system that needs to fetch an order's latest status. We can fetch the status from an Order Management service. With MassTransit, you'll create a request client to initiate the process. This client will send a `GetOrderStatusRequest` message onto the bus.

```cs
public record GetOrderStatusRequest
{
    public string OrderId { get; init; }
}
```

On the Order Management side, a responder (or consumer) will be listening for `GetOrderStatusRequest` messages. It receives the request, potentially queries a database to get the status, and then sends a `GetOrderStatusResponse` message back onto the bus. The original request client will be waiting for this response and can then process it accordingly.

```cs
public class GetOrderStatusRequestConsumer : IConsumer<GetOrderStatusRequest>
{
    public async Task Consume(ConsumeContext<GetOrderStatusRequest> context)
    {
        // Get the order status from a database.

        await context.ResponseAsync<GetOrderStatusResponse>(new
        {
            // Set the respective response properties.
        });
    }
}
```

---

## Getting User Permissions In a Modular Monolith

Here's a real-world scenario where my team decided to implement this pattern. We were building a [**modular monolith**](/milanjovanovic.tech/modular-monolith-architecture/README.md), and one of the modules was responsible for managing user permissions. The other modules could call out to the Users module to get the user's permissions. And this works great while we are still inside a monolith system.

However, at one point we needed to extract one module into a separate service. This meant that the communication with the Users module using simple method calls would no longer work.

Luckily, we were already using MassTransit and RabbitMQ for messaging inside the system.

So, we decided to use the MassTransit request-response feature to implement this.

The new service will inject an `IRequestClient<GetUserPermissions>`. We can use it to send a `GetUserPermissions` message and await a response.

A very powerful feature of MassTransit is that you can await more than one response message. In this example, we're waiting for a `PermissionsResponse` or an `Error` response. This is great, because we also have a way to handle failures in the consumer.

```cs{11,13,18}
internal sealed class PermissionService(
    IRequestClient<GetUserPermissions> client)
    : IPermissionService
{
    public async Task<Result<PermissionsResponse>> GetUserPermissionsAsync(
        string identityId)
    {
        var request = new GetUserPermissions(identityId);

        Response<PermissionsResponse, Error> response =
            await client.GetResponse<PermissionsResponse, Error>(request);

        if (response.Is(out Response<Error> errorResponse))
        {
            return Result.Failure<PermissionsResponse>(errorResponse.Message);
        }

        if (response.Is(out Response<PermissionsResponse> permissionResponse))
        {
            return permissionResponse.Message;
        }

        return Result.Failure<PermissionsResponse>(NotFound);
    }
}
```

In the Users module, we can easily implement the `GetUserPermissionsConsumer`. It will respond with a `PermissionsResponse` if the permissions are found or an `Error` in case of a failure.

```cs
public sealed class GetUserPermissionsConsumer(
    IPermissionService permissionService)
    : IConsumer<GetUserPermissions>
{
    public async Task Consume(ConsumeContext<GetUserPermissions> context)
    {
        Result<PermissionsResponse> result =
            await permissionService.GetUserPermissionsAsync(
                context.Message.IdentityId);

        if (result.IsSuccess)
        {
            await context.RespondAsync(result.Value);
        }
        else
        {
            await context.RespondAsync(result.Error);
        }
    }
}
```

---

## Closing Thoughts

By embracing messaging patterns with MassTransit, you're building on a much sturdier foundation. Your .NET services are now less tightly coupled, giving you the flexibility to evolve them independently and weather those inevitable network glitches or service outages.

The [<FontIcon icon="fa-brands fa-youtube"/>request-response pattern](https://youtu.be/NjsoykEOkrk) is a powerful tool in your messaging arsenal. MassTransit makes it remarkably easy to implement, ensuring that requests and responses are delivered reliably.

<VidStack src="youtube/NjsoykEOkrk" />

We can use request-response to implement communication between modules in a [**modular monolith**](/milanjovanovic.tech/modular-monolith-architecture/README.md). However, don't take this to the extreme, or your system might suffer from increased latency.

Start small, experiment, and see how the reliability and flexibility of messaging can transform your development experience.

That's all for this week. Stay awesome!

