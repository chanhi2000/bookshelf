---
lang: en-US
title: "Monitoring .NET Applications with OpenTelemetry and Grafana"
description: "Article(s) > Monitoring .NET Applications with OpenTelemetry and Grafana"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Go
  - Grafana
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - go
  - grafana
  - go-grafana
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Monitoring .NET Applications with OpenTelemetry and Grafana"
    - property: og:description
      content: "Monitoring .NET Applications with OpenTelemetry and Grafana"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/monitoring-dotnet-applications-with-opentelemetry-and-grafana.html
prev: /programming/cs/articles/README.md
date: 2025-06-21
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_147.png
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
  "title": "Grafana > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go-grafana/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Monitoring .NET Applications with OpenTelemetry and Grafana"
  desc="Instrumenting your .NET apps with OpenTelemetry is easy. But what about actually seeing those metrics and traces in action? Here's how to stream observability data from your .NET services into Grafana — in just a few lines of code."
  url="https://milanjovanovic.tech/blog/monitoring-dotnet-applications-with-opentelemetry-and-grafana"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_147.png"/>

Your .NET application is running in production, but you're flying blind.

When something breaks, you're stuck digging through logs, guessing at performance bottlenecks, and trying to piece together what actually happened across your distributed system.

That ends today.

[<FontIcon icon="iconfont icon-grafana"/>Grafana](https://grafana.com/) is a complete observability platform that unifies metrics, logs, and traces in one place.

With Grafana, you get:

- **Unified dashboards** that combine metrics, logs, and traces
- **Advanced alerting** that actually works when things go wrong
- **Deep trace analysis** to understand request flows across services
- **Log correlation** that connects your traces to the exact log entries that matter

[<FontIcon icon="iconfont icon-grafana"/>Grafana Cloud](https://grafana.com/products/cloud/) makes this even easier. No infrastructure to manage, automatic scaling, and built-in integrations with [<FontIcon icon="fas fa-globe"/>OpenTelemetry](https://opentelemetry.io/). There's a generous free tier that allows you to get started without any upfront costs.

When you combine Grafana with OpenTelemetry, you get vendor-neutral observability that actually delivers insights instead of just pretty charts.

---

## Setting Up OpenTelemetry in .NET

First, install the core OpenTelemetry packages:

```powershell
Install-Package OpenTelemetry.Extensions.Hosting
Install-Package OpenTelemetry.Exporter.OpenTelemetryProtocol
Install-Package OpenTelemetry.Instrumentation.AspNetCore
Install-Package OpenTelemetry.Instrumentation.Http
```

You can also add instrumentation for other libraries as needed:

```powershell
Install-Package OpenTelemetry.Instrumentation.EntityFrameworkCore
Install-Package OpenTelemetry.Instrumentation.StackExchangeRedis
Install-Package Npgsql.OpenTelemetry
```

Configure OpenTelemetry in your <FontIcon icon="iconfont icon-csharp"/>`Program.cs`:

```cs :collapsed-lines title="Program.cs"
var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddOpenTelemetry()
    .ConfigureResource(resource => resource.AddService(serviceName))
    .WithTracing(tracing =>
    {
        tracing
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation()
            .AddEntityFrameworkCoreInstrumentation()
            .AddRedisInstrumentation()
            .AddNpgsql();

        tracing.AddOtlpExporter();
    });

builder.Logging.AddOpenTelemetry(logging =>
{
    logging.IncludeScopes = true;
    logging.IncludeFormattedMessage = true;

    logging.AddOtlpExporter();
});

var app = builder.Build();

// Your app configuration...

app.Run();
```

This configuration:

- Sets up [**tracing with OpenTelemetry**](introduction-to-distributed-tracing-with-opentelemetry-in-dotnet)
- Sets up automatic instrumentation for ASP.NET Core and HTTP requests
- Adds Entity Framework Core and Redis instrumentation
- Configures PostgreSQL instrumentation if you're using Npgsql
- Configures OTLP export for traces and logs (we can also add metrics later)

---

## Configuring OTLP Export to Grafana Cloud

Get your Grafana Cloud credentials:

::: tabs

@tab:active 1.

Log into [<FontIcon icon="iconfont icon-grafana"/>Grafana Cloud](https://grafana.com/auth/sign-up/create-user)

@tadb 2.

Go to **My Account** → **Stack Details**

![Grafana cloud stack details](https://milanjovanovic.tech/blogs/mnw_147/grafana_setup.png?imwidth=3840)

@tab 3.

Find your **OTLP endpoint** (looks like `https://otlp-gateway-prod-eu-west-2.grafana.net/otlp`)

![Grafana cloud endpoint](https://milanjovanovic.tech/blogs/mnw_147/grafana_setup_endpoint.png?imwidth=3840)

@tab 4.

Generate an **API token** with permissions

![Grafana cloud token](https://milanjovanovic.tech/blogs/mnw_147/grafana_setup_token.png?imwidth=3840)

You should also see the environment variables you can use to configure OpenTelemetry:

![Grafana cloud environment variables](https://milanjovanovic.tech/blogs/mnw_147/grafana_setup_env_vars.png?imwidth=3840)

:::

Configure the OTLP exporter in your <FontIcon icon="iconfont icon-json"/>`appsettings.json`:

```json title="appsettings.json"
{
  "OTEL_EXPORTER_OTLP_ENDPOINT": "https://otlp-gateway-prod-eu-west-2.grafana.net/otlp",
  "OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf",
  "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Basic <your-base64-encoded-token>"
}
```

You can also set these as environment variables in your hosting environment.

---

## Viewing and Analyzing Data in Grafana

Start your application and generate some traffic. Now head to your Grafana Cloud instance.

### Traces

If everything is set up correctly, you should see traces from your application in the **Traces** section.

Here's an example of a trace view in Grafana Cloud. It's a `POST users/register` request that contains multiple spans:

![Grafana cloud trace example](https://milanjovanovic.tech/blogs/mnw_147/grafana_trace_1.png?imwidth=3840)

Here's another example of a trace that includes messages sent to a message broker (like RabbitMQ or Kafka).

![Grafana cloud trace example](https://milanjovanovic.tech/blogs/mnw_147/grafana_trace_2.png?imwidth=3840)

### Logs

You can also view logs in Grafana Cloud.

Here's an example of a log view that shows multiple log entries for our application.

![Grafana cloud logs example](https://milanjovanovic.tech/blogs/mnw_147/grafana_logs_1.png?imwidth=3840)

You can drill down into individual log entries, filter by severity, and search for specific terms.

![Grafana cloud logs example](https://milanjovanovic.tech/blogs/mnw_147/grafana_logs_2.png?imwidth=3840)

OpenTelemetry automatically correlates your logs with traces. In the trace detail view, click **Logs** to see all log entries that occurred during that request.

Your logs will include trace and span IDs.

---

## Conclusion

You now have full observability for your .NET application.

When something goes wrong in production, you won't be guessing anymore. You'll see exactly which requests were slow, what errors occurred, and how they propagated through your system.

Grafana gives you the dashboards and alerting to catch problems before users do. OpenTelemetry gives you the detailed traces to understand exactly what happened.

This setup scales from a single service to hundreds of microservices without changing your instrumentation code.

**Ready to take your observability further?**

This article showed you the basics, but modern applications need advanced patterns like distributed tracing across event-driven architectures, custom instrumentation strategies, and observability-driven development practices.

I cover all of this in-depth in my [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md) course, where you'll learn how to implement OpenTelemetry across complex, event-driven systems that actually scale in production.

That's all for today.

See you next Saturday.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Monitoring .NET Applications with OpenTelemetry and Grafana",
  "desc": "Instrumenting your .NET apps with OpenTelemetry is easy. But what about actually seeing those metrics and traces in action? Here's how to stream observability data from your .NET services into Grafana — in just a few lines of code.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/monitoring-dotnet-applications-with-opentelemetry-and-grafana.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
