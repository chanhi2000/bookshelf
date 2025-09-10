---
lang: en-US
title: "Standalone Aspire Dashboard Setup for Distributed .NET Applications"
description: "Article(s) > Standalone Aspire Dashboard Setup for Distributed .NET Applications"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - DevOps
  - Docker
  - Go
  - Prometheus
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
  - go
  - prometheus
  - go-prometheus
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Standalone Aspire Dashboard Setup for Distributed .NET Applications"
    - property: og:description
      content: "Standalone Aspire Dashboard Setup for Distributed .NET Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/standalone-aspire-dashboard-setup-for-distributed-dotnet-applications.html
prev: /programming/cs/articles/README.md
date: 2025-08-30
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_157.png
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

```component VPCard
{
  "title": "Prometheus > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go-prometheus/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Standalone Aspire Dashboard Setup for Distributed .NET Applications"
  desc="Learn how to run the Aspire Dashboard as a standalone container for instant traces, logs, and metrics in your .NET applications."
  url="https://milanjovanovic.tech/blog/standalone-aspire-dashboard-setup-for-distributed-dotnet-applications"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_157.png"/>

You've built a distributed .NET application. Multiple services, databases, message queues. Now something's slow, and you need to figure out why.

**The Aspire Dashboard runs perfectly as a standalone container**, giving you [**distributed tracing**](/milanjovanovic.tech/introduction-to-distributed-tracing-with-opentelemetry-in-dotnet.md), [**structured logs**](/milanjovanovic.tech/5-serilog-best-practices-for-better-structured-logging.md), and real-time metrics without the full orchestration framework.

While [**Aspire's orchestration**](/milanjovanovic.tech/dotnet-aspire-a-game-changer-for-cloud-native-development.md) is incredibly powerful for managing distributed applications, sometimes you just need the observability piece. Maybe you're already using [**Docker Compose**](/milanjovanovic.tech/using-dotnet-aspire-with-the-docker-publisher.md) or [<VPIcon icon="fas fa-globe"/>Kubernetes](https://doineedkubernetes.com/). Maybe you're debugging an existing system. The standalone dashboard gives you valuable telemetry visualization with minimal setup.

Let's get it running in under 5 minutes.

---

## Why Run the Aspire Dashboard Standalone?

Most teams already have their deployment story figured out. Docker Compose, Kubernetes, or some platform-specific orchestration. You don't want to rewrite everything just to get observability.

The standalone **Aspire Dashboard** hits a sweet spot **for development**:

- **Drop-in observability**: Just add a container to your existing setup
- **Full OpenTelemetry support**: Works with any OTLP-compatible application
- **Developer-friendly**: Designed for local development and debugging
- **Immediate value**: See traces, logs, and metrics within minutes

::: note One caveat

it's **in-memory only**. Perfect for development and debugging, not for production. For production, you'll want something like [**Jaeger**](/milanjovanovic.tech/introduction-to-distributed-tracing-with-opentelemetry-in-dotnet.md), [<VPIcon icon="iconfont icon-prometheus"/>Prometheus](https://prometheus.io/), or a commercial APM solution.

:::

But for understanding what your code is doing right now? It's exactly what you need.

---

## Step 1: Add the Dashboard Container

Drop this into your <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`:

```yaml title="docker-compose.yaml"
aspire-dashboard:
  container_name: aspire-dashboard
  image: mcr.microsoft.com/dotnet/aspire-dashboard:9.0
  ports:
    - 18888:18888
```

That's it. The dashboard is running. Navigate to `http://localhost:18888` and... you'll need a token.

![Aspire Dashboard login screen](https://milanjovanovic.tech/blogs/mnw_157/aspire_dashboard_login.png?imwidth=3840)

**Check the container logs** for the login link. The dashboard generates a unique authentication token on startup:

![Aspire Dashboard login link](https://milanjovanovic.tech/blogs/mnw_157/aspire_dashboard_login_link.png?imwidth=3840)

Click that link, and you're in. Empty for now, but not for long.

---

## Step 2: Wire Up Your .NET Services

Your services need to know where to send their telemetry. Add these environment variables to your API containers:

```yaml title="docker-compose.yaml"
users.api:
  image: ${DOCKER_REGISTRY-}usersapi
  build:
    context: .
    dockerfile: Users.Api/Dockerfile
  ports:
    - 5100:5100
    - 5101:5101
  environment:
    - OTEL_EXPORTER_OTLP_ENDPOINT=http://aspire-dashboard:18889
    - OTEL_EXPORTER_OTLP_PROTOCOL=grpc
  depends_on:
    - users.database
```

Notice port `18889`? That's the OTLP ingestion endpoint. The dashboard listens on `18888` for the UI, `18889` for telemetry data.

---

## Step 3: Configure OpenTelemetry in Your Code

Install the necessary [<VPIcon icon="fas fa-globe"/>OpenTelemetry packages](https://nuget.org/packages?q=OpenTelemetry):

```xml
<PackageReference Include="Npgsql.OpenTelemetry" Version="9.0.3" />
<PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.12.0" />
<PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.12.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.12.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.Http" Version="1.12.0" />
```

Then configure OpenTelemetry in your <VPIcon icon="iconfont icon-csharp"/>`Program.cs`:

```cs title="Program.cs"
builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => resource.AddService(builder.Environment.ApplicationName))
    .WithTracing(tracing => tracing
        .AddHttpClientInstrumentation()
        .AddAspNetCoreInstrumentation()
        .AddNpgsql())
    .WithMetrics(metrics => metrics
        .AddHttpClientInstrumentation()
        .AddAspNetCoreInstrumentation());

builder.Logging.AddOpenTelemetry(options =>
{
    options.IncludeScopes = true;
    options.IncludeFormattedMessage = true;
});

builder.Services.AddOpenTelemetry().UseOtlpExporter();
```

This configuration:

- **Traces** HTTP calls, ASP.NET Core requests, and database queries
- **Collects metrics** on request duration, response codes, and throughput
- **Structured logging** with full context and formatted messages
- **Exports everything** to the Aspire Dashboard via OTLP

The `UseOtlpExporter()` method automatically picks up the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable you configured earlier.

---

## What You Get

Start your application and make a few requests. The dashboard immediately lights up with data.

### Structured Logs

Every log entry includes full context: trace IDs, request paths, user identities. Click any log to see the complete structured data.

![Aspire Dashboard structured logs](https://milanjovanovic.tech/blogs/mnw_157/structured_logs.png?imwidth=3840)

### Distributed Traces

See the complete request flow across all your services. Which database query is slow? Which HTTP call is failing? The trace view shows you exactly where time is spent.

![Aspire Dashboard distributed traces](https://milanjovanovic.tech/blogs/mnw_157/distributed_traces.png?imwidth=3840)

You can click into a trace to see the individual spans and any metadata associated with them.

![Aspire Dashboard distributed trace details](https://milanjovanovic.tech/blogs/mnw_157/distributed_trace_details.png?imwidth=3840)

### Real-Time Metrics

Response times, error rates, throughput, all updating live. Perfect for load testing or understanding traffic patterns.

![Aspire Dashboard metrics](https://milanjovanovic.tech/blogs/mnw_157/metrics.png?imwidth=3840)

---

## Summary

The standalone **Aspire Dashboard** is perfect for local development and debugging. Spin up your stack, make requests, and instantly see what's happening across all your services. Find bottlenecks in the trace view, correlate logs with requests, watch metrics update in real-time.

Remember: this is for development only since data is in-memory and disappears on restart. That last part might be fixed soon, according to the [<VPIcon icon="fa-brands fa-youtube"/>Aspire roadmap](https://youtu.be/zvBu0OOCVos). For production, you'll want proper solutions like Jaeger for tracing, Prometheus for metrics, or a commercial APM like Application Insights.

<VidStack src="youtube/zvBu0OOCVos" />

But for that immediate "what is my code actually doing?" question during development? You've got professional observability in under 5 minutes.

Just add the container, configure OpenTelemetry, and start debugging like a pro.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Standalone Aspire Dashboard Setup for Distributed .NET Applications",
  "desc": "Learn how to run the Aspire Dashboard as a standalone container for instant traces, logs, and metrics in your .NET applications.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/standalone-aspire-dashboard-setup-for-distributed-dotnet-applications.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
