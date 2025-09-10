---
lang: en-US
title: "How .NET Aspire Simplifies Service Discovery"
description: "Article(s) > How .NET Aspire Simplifies Service Discovery"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - csharp
  - c#
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How .NET Aspire Simplifies Service Discovery"
    - property: og:description
      content: "How .NET Aspire Simplifies Service Discovery"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-dotnet-aspire-simplifies-service-discovery.html
prev: /programming/cs/articles/README.md
date: 2025-03-29
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_135.png
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
  name="How .NET Aspire Simplifies Service Discovery"
  desc=".NET Aspire revolutionizes distributed application development by simplifying service discovery through configuration-based approaches that eliminate the complexity of service-to-service communication."
  url="https://milanjovanovic.tech/blog/how-dotnet-aspire-simplifies-service-discovery"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_135.png"/>

Unless you've been living under a rock, you know that [<VPIcon icon="fa-brands fa-microsoft   "/>.NET Aspire](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/aspire-overview) is changing (for the better) how we build distributed applications in .NET. A simple way to think about Aspire: it makes all the difficult things in software development easy.

.NET Aspire is a cloud-native application stack that simplifies the development and deployment of distributed applications. One of the key challenges when building multi-service applications is building reliable [**communication between services**](/milanjovanovic.tech/modular-monolith-communication-patterns.md).

In this week's newsletter, I want to focus on one aspect of .NET Aspire - [**service discovery**](/milanjovanovic.tech/service-discovery-in-microservices-with-net-and-consul.md). Service discovery lets our services figure out how to locate other services they want to integrate with. .NET Aspire tackles this challenge with a simple, configuration-based approach that reduces complexity and boilerplate code.

---

## Understanding Service Discovery

[<VPIcon icon="fa-brands fa-microsoft"/>Service discovery**](https://learn.microsoft.com/en-us/dotnet/core/extensions/service-discovery) is the process by which services in a distributed application locate and communicate with each other. As applications scale and evolve, keeping track of service endpoints becomes increasingly challenging. Services might run on different ports during development or be deployed to different environments in production, making hard-coded service URLs impractical.

Traditional approaches to service discovery often introduce complexity:

- Manual configuration of service endpoints that must be updated as environments change
- Complex intermediary systems that require additional maintenance
- Custom code to handle service resolution and connection management

While many service discovery implementations rely on centralized registries, .NET Aspire takes a different approach by leveraging application configuration to connect services. This design choice simplifies the development experience while maintaining flexibility for various deployment scenarios. Aspire automatically takes care of wiring up the correct service URLs and injecting them into your application settings.

![Diagram explaining how the .NET Aspire service discovery mechanism works.](https://milanjovanovic.tech/blogs/mnw_135/aspire_service_discovery.png?imwidth=3840)

---

## Practical Example of Service Discovery

To understand how .NET Aspire handles service discovery, let's look at a practical example of an application with multiple services:

```cs
var builder = DistributedApplication.CreateBuilder(args);

// Add services to the app
var apiService = builder.AddProject<Projects.WeatherApi>("weather-api");
var webFrontend = builder.AddProject<Projects.WebFrontend>("web-frontend")
    .WithReference(apiService);
    
builder.Build().Run();
```

In this App Host definition, we're creating two services: a weather API and a web frontend. The `.WithReference()` method establishes a connection between these services, which enables service discovery. This simple declaration tells [**.NET Aspire**](/milanjovanovic.tech/dotnet-aspire-a-game-changer-for-cloud-native-development.md) that the web frontend depends on the weather API and needs to communicate with it. Note that the `web-frontend` has to be a server-side application (like [<VPIcon icon="fa-brands fa-microsoft"/>Blazor Server](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models)) for Aspire to be able to inject the service URL.

With this configuration in place, the web frontend can now reach the API using the service name `weather-api` without additional service discovery code:

```cs
// Configures the default Aspire services, including service discovery
builder.AddServiceDefaults();

// In Program.cs of the web-frontend project
builder.Services.AddHttpClient("weather-api", (_, client) => {
    // The service name "weather-api" automatically resolves to the correct address
    client.BaseAddress = new Uri("http://weather-api");
});
```

This works because .NET Aspire manages the mapping between service names and their actual endpoints. When the application runs, service discovery ensures that requests to `http://weather-api` are routed to the appropriate destination.

---

## Service Discovery Under the Hood

The previous example contains a bit of "magic" that might not be immediately clear. The `AddServiceDefaults()` method configures the default services for the application, including service discovery.

If we were to configure everything manually, it would look something like this:

```cs
builder.Services.AddServiceDiscovery();

builder.Services.AddHttpClient("weather-api", (_, client) => {
    client.BaseAddress = new Uri("http://weather-api");
})
.AddServiceDiscovery();
```

The first `AddServiceDiscovery()` method registers the necessary services to enable service discovery in the application. The second `AddServiceDiscovery()` method on the HTTP client configures it to use service discovery for resolving the base address. This means that when the HTTP client makes requests to `http://weather-api`, it will automatically resolve the correct endpoint based on the service discovery configuration.

We can also configure service discovery globally for all HTTP clients in the application:

```cs
builder.Services.ConfigureHttpClientDefaults(static http =>
{
    // Turn on service discovery by default
    http.AddServiceDiscovery();
});
```

This configuration ensures that all HTTP clients in the application will use service discovery by default, eliminating the need to configure it for each client individually.

What Aspire does at runtime for all of this to work is inject a set of configuration values. The configuration value names are derived from the service names we defined in the App Host, plus the respective scheme (http or https). Here's an example of what the `weather-api` configuration might look like:

```json
{
  "Services": {
    "weather-api": {
      "http": [
        "localhost:8080"
      ]
    }
  }
}
```

We can also configure service discovery to work with HTTPS by adding the `https` scheme to the service name:

```cs
// Specify the https scheme explicitly in the service name
builder.Services.AddHttpClient("weather-api", (_, client) => {
    client.BaseAddress = new Uri("https://weather-api");
});

// Alternatively, we can use the https+http scheme and let Aspire handle the conversion
builder.Services.AddHttpClient("weather-api-2", (_, client) => {
    client.BaseAddress = new Uri("https+http://weather-api");
});
```

A significant advantage of Aspire's service discovery is its consistent behavior across environments:

- During development, services might run on localhost with different ports
- In testing environments, services could be containerized
- In production, services might be deployed to Kubernetes or other platforms

Your code remains unchanged across these scenarios because the service name abstraction shields you from the underlying networking details.

Note that you don't have to use .NET Aspire to benefit from [<VPIcon icon="fa-brands fa-microsoft"/>service discovery](https://learn.microsoft.com/en-us/dotnet/core/extensions/service-discovery). It's available as a standalone library (`Microsoft.Extensions.ServiceDiscovery`) and you can use it in any .NET application.

---

## Service Discovery with YARP as a Proxy

A powerful application of .NET Aspire's service discovery capabilities is in API gateway scenarios using [**YARP**](/milanjovanovic.tech/implementing-an-api-gateway-for-microservices-with-yarp.md) (Yet Another Reverse Proxy). Let's explore how to implement this pattern:

```cs
// In the App Host
var apiService = builder.AddProject<Projects.WeatherApi>("weather-api");
var userService = builder.AddProject<Projects.UserApi>("user-api");
var proxyService = builder.AddProject<Projects.ApiGateway>("api-gateway")
    .WithReference(apiService)
    .WithReference(userService);
```

We'll need to add the YARP NuGet package to the API gateway project:

```powershell
Install-Package Yarp.ReverseProxy # Adds the YARP package
Install-Package Microsoft.Extensions.ServiceDiscovery.Yarp # Adds the YARP service discovery package
```

In the gateway project, we can configure YARP to use service discovery:

```cs :collapsed-lines
// In Program.cs of the api-gateway project
var builder = WebApplication.CreateBuilder(args);

// Cofigures the service discovery services
builder.Services.AddServiceDiscovery();

// Add YARP services
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    // Configures a destination resolver that can use service discovery
    .AddServiceDiscoveryDestinationResolver();

var app = builder.Build();

// Configure the HTTP request pipeline
app.MapReverseProxy();

app.Run();
```

The YARP configuration in `appsettings.json` leverages the service names for endpoint resolution:

```json :collapsed-lines title="appsettings.json"
{
  "ReverseProxy": {
    "Routes": {
      "weather-route": {
        "ClusterId": "weather-cluster",
        "Match": {
          "Path": "/weather/{**catch-all}"
        },
        "Transforms": [
          { "PathRemovePrefix": "/weather" }
        ]
      },
      "user-route": {
        "ClusterId": "user-cluster",
        "Match": {
          "Path": "/users/{**catch-all}"
        },
        "Transforms": [
          { "PathRemovePrefix": "/users" }
        ]
      }
    },
    "Clusters": {
      "weather-cluster": {
        "Destinations": {
          "destination1": {
            "Address": "http://weather-api"
          }
        }
      },
      "user-cluster": {
        "Destinations": {
          "destination1": {
            "Address": "http://user-api"
          }
        }
      }
    }
  }
}
```

This configuration creates an API gateway that:

- Routes requests with path `/weather/*` to the weather API service
- Routes requests with path `/users/*` to the user API service
- Uses service names (`weather-api` and `user-api`) that service discovery resolves at runtime

The beauty of this approach is that the gateway doesn't need to know the actual endpoints of the backend services. It simply uses the service names, and .NET Aspire handles providing the configuration at runtime. This makes the gateway configuration more portable and easier to maintain as the application evolves.

---

## Conclusion

.NET Aspire transforms service discovery from a complex infrastructure challenge into a straightforward configuration concern. By using a configuration-based approach rather than a centralized registry, it simplifies the development experience while maintaining the flexibility needed for various deployment scenarios.

The key advantages of Aspire's service discovery include:

- Declarative service relationships in the App Host
- Simple service name resolution that works across environments
- Seamless integration with the .NET ecosystem and dependency injection
- Powerful applications in patterns like API gateways with YARP

As the .NET Aspire stack continues to evolve, its approach to service discovery represents one of the ways it's making cloud-native development more accessible to .NET developers. By reducing the complexity of service-to-service communication, Aspire enables teams to focus on building features rather than wrestling with infrastructure concerns.

If you want to explore more robust service discovery solutions for large-scale distributed systems, check out my previous article on [**implementing service discovery with Consul**](/milanjovanovic.tech/service-discovery-in-microservices-with-net-and-consul.md). It provides a complementary approach for scenarios that might require a more traditional service registry.

For those who found the YARP integration particularly interesting, my [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md) course dives deeper into building scalable applications with YARP as an API gateway. You'll learn how to leverage these patterns to create maintainable, evolvable systems regardless of whether you're using microservices or a monolith.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How .NET Aspire Simplifies Service Discovery",
  "desc": ".NET Aspire revolutionizes distributed application development by simplifying service discovery through configuration-based approaches that eliminate the complexity of service-to-service communication.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-dotnet-aspire-simplifies-service-discovery.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
