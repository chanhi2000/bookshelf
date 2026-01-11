---
lang: en-US
title: "Using .NET Aspire With the Docker Publisher"
description: "Article(s) > Using .NET Aspire With the Docker Publisher"
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
      content: "Article(s) > Using .NET Aspire With the Docker Publisher"
    - property: og:description
      content: "Using .NET Aspire With the Docker Publisher"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/using-dotnet-aspire-with-the-docker-publisher.html
prev: /programming/cs/articles/README.md
date: 2025-07-05
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_149.png
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
  name="Using .NET Aspire With the Docker Publisher"
  desc="A practical walkthrough of using .NET Aspire's Docker publisher to generate Docker Compose files from C# code. Learn how to set up an API with Postgres and Redis, publish to Docker Compose, and deploy to a VPS with minimal configuration."
  url="https://milanjovanovic.tech/blog/using-dotnet-aspire-with-the-docker-publisher"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_149.png"/>

[**.NET Aspire**](/milanjovanovic.tech/dotnet-aspire-a-game-changer-for-cloud-native-development.md) is one of the most exciting additions to the .NET ecosystem in years.

It brings a fresh, modern approach to building cloud-native apps, with a focus on developer productivity, great defaults, and tight integration across your entire stack.

One of the most asked-for features is the ability to publish your app to Docker Compose. This is now available in the latest preview, and I'm excited to share how it works.

In this post, I'll walk you through how I used Aspire's **Docker publisher** to spin up a demo app that includes an API, a Postgres database, and a Redis cache. Everything runs using Docker Compose, and Aspire generates the whole thing from C# code.

I'll show you how to set it up, explain what it's doing behind the scenes, and give you a glimpse into how easy it is to take that setup and run it on a VPS or cloud server.

---

## The Demo App

The app is intentionally simple, just enough to demonstrate how Aspire wires things together.

- API project: a minimal .NET Web API
- Postgres: used for data storage
- Redis: used for caching

In a traditional setup, you'd manually connect these services, manage configuration files, handle environment variables, and write a <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` from scratch.

With Aspire, you declare everything in C# inside the AppHost project. Here's a quick look at the setup:

```cs{4}
var builder = DistributedApplication.CreateBuilder(args);

// Enables Docker publisher
builder.AddDockerComposeEnvironment("aspire-docker-demo");

var postgres = builder.AddPostgres("database")
    .WithDataVolume();

var database = postgres.AddDatabase("demo-db");

var redis = builder.AddRedis("cache");

var webApi = builder.AddProject<Projects.Web_Api>("web-api")
    .WithReference(database).WaitFor(postgres)
    .WithReference(redis).WaitFor(redis);

builder.Build().Run();
```

This gives you a development environment where Aspire runs Postgres and Redis in containers, and connects your API to them.

The `AddDockerComposeEnvironment` method enables the Docker publisher. It's available in the `Aspire.Hosting.Docker` NuGet package, which is currently in preview.

```powershell
Install-Package Aspire.Hosting.Docker -Version 9.3.1-preview.1.25305.6
```

---

## Installing the Aspire CLI

To publish your app to Docker Compose, install the **Aspire CLI**:

```sh
dotnet tool install --global aspire.cli --prerelease
```

Then you can run the `publish` command:

```sh
aspire publish -o docker-compose-artifacts
```

This command will scan your solution for the Aspire project and generate a Docker Compose file and an <VPIcon icon="iconfont icon-doitenv" />`.env` file based on the services you've defined.

![Aspire publish command](https://milanjovanovic.tech/blogs/mnw_149/aspire_publish.png?imwidth=1920)

---

## The Docker Compose File

Let's examine what Aspire created for us:

```yml :collapsed-lines title="docker-compose.yaml"
services:
  database:
    image: 'docker.io/library/postgres:17.4'
    environment:
      POSTGRES_HOST_AUTH_METHOD: 'scram-sha-256'
      POSTGRES_INITDB_ARGS: '--auth-host=scram-sha-256 --auth-local=scram-sha-256'
      POSTGRES_USER: 'postgres'
      POSTGRES_PASSWORD: '${DATABASE_PASSWORD}'
    ports:
      - '8000:5432'
    volumes:
      - type: 'volume'
        target: '/var/lib/postgresql/data'
        source: 'aspire.apphost-1f0ed76b33-database-data'
        read_only: false
    networks:
      - 'aspire'
  redis:
    image: 'docker.io/library/redis:7.4'
    command:
      - '-c'
      - 'redis-server --requirepass $$REDIS_PASSWORD'
    entrypoint:
      - '/bin/sh'
    environment:
      REDIS_PASSWORD: '${REDIS_PASSWORD}'
    ports:
      - '8001:6379'
    networks:
      - 'aspire'
  web-api:
    image: '${WEB_API_IMAGE}'
    environment:
      OTEL_DOTNET_EXPERIMENTAL_OTLP_EMIT_EXCEPTION_LOG_ATTRIBUTES: 'true'
      OTEL_DOTNET_EXPERIMENTAL_OTLP_EMIT_EVENT_LOG_ATTRIBUTES: 'true'
      OTEL_DOTNET_EXPERIMENTAL_OTLP_RETRY: 'in_memory'
      ASPNETCORE_FORWARDEDHEADERS_ENABLED: 'true'
      HTTP_PORTS: '8002'
      ConnectionStrings__demo-db: 'Host=database;Port=5432;Username=postgres;Password=${DATABASE_PASSWORD};Database=demo-db'
      ConnectionStrings__redis: 'redis:6379,password=${REDIS_PASSWORD}'
    ports:
      - '8003:8002'
      - '8005:8004'
    depends_on:
      database:
        condition: 'service_started'
      redis:
        condition: 'service_started'
    networks:
      - 'aspire'
networks:
  aspire:
    driver: 'bridge'
volumes:
  aspire.apphost-1f0ed76b33-database-data:
    driver: 'local'
```

This <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yaml` file is generated from the C# code we wrote earlier. It defines the services, their images, environment variables, ports, and dependencies.

The <VPIcon icon="iconfont icon-doitenv" />`.env` file contains some of the configuration we need:

```sh title=".env"
# Parameter database-password
DATABASE_PASSWORD=<YOUR_STRONG_PASSWORD>

# Container image name for web-api
# Change this to the imaage name in the container registry
WEB_API_IMAGE=web-api:latest

# Parameter redis-password
REDIS_PASSWORD=<YOUR_STRONG_PASSWORD>
```

It contains the passwords for the database and Redis, as well as the image name for the API. You'll need to replace the placeholders with actual values. For the API image, you can build and tag the image yourself, or use a pre-built one from a registry.

---

## Publishing and Running on a VPS

Aspire doesn't deploy the app for you, but it gives you everything you need.

Once the Compose file is ready, deployment to a VPS is straightforward:

1. Copy the artifacts to your server using (`scp` or `git`).
2. SSH into the VPS.
3. Run `docker compose up -d` inside the artifact directory.

Make sure Docker and Docker Compose are installed on the server.

You can expose ports with a reverse proxy like Nginx or Caddy, and secure it with HTTPS using Let's Encrypt.

I'll cover this in more detail in a future post.

---

## Wrapping Up

.NET Aspire with Docker Compose provides a smooth developer experience and a simple way to deploy full-stack apps.

You define everything in C#, test it locally, and publish it with one command. No need to write Compose files or manage infrastructure manually. This opens up new possibilities for deploying and managing cloud-native apps. You're not locked into a specific cloud provider, and you can easily move between environments.

Can I just say how much I love this? I'm really excited about the future of cloud-native development with .NET and Aspire.

If you liked this article and want to learn how I structure larger apps, check out [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md). It walks you through building clean, scalable .NET applications with strong internal boundaries and maintainability in mind.

Thanks for reading and stay awesome!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using .NET Aspire With the Docker Publisher",
  "desc": "A practical walkthrough of using .NET Aspire's Docker publisher to generate Docker Compose files from C# code. Learn how to set up an API with Postgres and Redis, publish to Docker Compose, and deploy to a VPS with minimal configuration.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/using-dotnet-aspire-with-the-docker-publisher.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
