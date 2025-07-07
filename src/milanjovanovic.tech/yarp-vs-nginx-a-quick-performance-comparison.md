---
lang: en-US
title: "YARP vs Nginx - A Quick Performance Comparison"
description: "Article(s) > YARP vs Nginx - A Quick Performance Comparison"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - DevOps
  - Docker
  - NGINX
  - Node.js
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
  - nginx
  - webserver
  - web-server
  - reverse-proxy
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > YARP vs Nginx - A Quick Performance Comparison"
    - property: og:description
      content: "YARP vs Nginx - A Quick Performance Comparison"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/yarp-vs-nginx-a-quick-performance-comparison.html
prev: /programming/cs/articles/README.md
date: 2025-05-31
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_144.png
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
  "title": "NGINX > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/nginx/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="YARP vs Nginx - A Quick Performance Comparison"
  desc="In this article, we will compare the performance of YARP and Nginx, two popular reverse proxy solutions."
  url="https://milanjovanovic.tech/blog/yarp-vs-nginx-a-quick-performance-comparison"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_144.png"/>

When you're building .NET applications, choosing the right **reverse proxy** can make a huge difference. Two popular options keep coming up: Microsoft's [**YARP**](/milanjovanovic.tech//milanjovanovic.tech/implementing-an-api-gateway-for-microservices-with-yarp.md) (Yet Another Reverse Proxy) and the tried-and-true [<FontIcon icon="iconfont icon-nginx"/>Nginx](https://nginx.org/).

Here's the thing - everyone talks about which one is "better," but rarely do you see actual numbers. So I decided to put both through the same tests and see what happens.

I'll test both proxies using the exact same API, same hardware, and same load testing approach. No bias, just data.

---

## The Test API

I kept the test API super simple on purpose. This way, we're measuring proxy performance, not how fast the backend can process complex requests:

```cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () =>
{
    return Results.Ok("Hello world!");
});

app.Run();
```

This basic endpoint means we're testing the proxy itself, not waiting for complex business logic to run.

---

## YARP Configuration

YARP is pretty nice to work with if you're already in the .NET world. The setup is straightforward:

```cs
var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();
app.MapReverseProxy();
app.Run();
```

It's equally simple to configure [**load balancing**](/milanjovanovic.tech/horizontally-scaling-aspnetcore-apis-with-yarp-load-balancing.md) or [**authentication**](/milanjovanovic.tech/implementing-api-gateway-authentication-with-yarp.md).

The routing setup is clean and uses a `**catch-all` pattern to forward everything:

```json
{
  "ReverseProxy": {
    "Routes": {
      "default": {
        "ClusterId": "hello",
        "Match": { "Path": "{**catch-all}" }
      }
    },
    "Clusters": {
      "hello": {
        "Destinations": {
          "destination1": {
            "Address": "http://hello.api:8080"
          }
        }
      }
    }
  }
}
```

---

## Nginx Setup

For Nginx, I went with Docker to keep things simple. The configuration does the same job as YARP:

```yml
nginx.proxy:
  image: nginx:alpine
  ports:
    - '3001:80'
  volumes:
    - ./nginx-proxy.conf:/etc/nginx/nginx.conf:ro
  depends_on:
    - hello.api
```

The Nginx config does exactly what YARP does - just with different syntax:

```conf
events {}

http {
    upstream backend {
        server hello.api:8080;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://backend;
        }
    }
}
```

---

## Full Docker Compose Setup

Here's the complete `docker-compose.yml` that ties everything together:

```yml title="docker-compose.yaml"
services:
  hello.api:
    image: ${DOCKER_REGISTRY-}helloapi
    build:
      context: .
      dockerfile: Hello.Api/Dockerfile

  yarp.proxy:
    image: ${DOCKER_REGISTRY-}yarpproxy
    build:
      context: .
      dockerfile: Yarp.Proxy/Dockerfile
    ports:
      - 3000:8080
    depends_on:
      - hello.api

  nginx.proxy:
    image: nginx:alpine
    ports:
      - '3001:80'
    volumes:
      - ./nginx-proxy.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - hello.api
```

---

## Load Testing with k6

I used k6 to hit both proxies with the same load patterns. I repeated the test with different numbers of virtual users (VUs) to see how each proxy handles increasing traffic. This keeps things fair - same test, same conditions:

```js title="YARP Test Script"
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    yarp: {
      executor: 'per-vu-iterations',
      vus: 200, // 10, 50, 100, 200
      iterations: 1000,
      exec: 'testYarp',
      startTime: '0s'
    }
  }
};

export function testYarp() {
  let res = http.get('http://localhost:3000/hello');
  check(res, {
    'YARP: status 200': (r) => r.status === 200
  });
}
```

```js title="Nginx Test Script"
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    nginx: {
      executor: 'per-vu-iterations',
      vus: 200, // 10, 50, 100, 200
      iterations: 1000,
      exec: 'testNginx',
      startTime: '0s'
    }
  }
};

export function testNginx() {
  let res = http.get('http://localhost:3001/hello');
  check(res, {
    'NGINX: status 200': (r) => r.status === 200
  });
}
```

---

## Performance Results

Here's where things get interesting. The numbers show a clear pattern:

```plaintext title="output"
| VUs  | YARP RPS | NGINX RPS | YARP p90 Latency (ms) | NGINX p90 Latency (ms) | YARP p95 Latency (ms) | NGINX p95 Latency (ms) |
|------|----------|-----------|-----------------------|------------------------|-----------------------|------------------------|
| 10   | 12692    | 9756      | 1.04                  | 1.10                   | 1.06                  | 1.52                   |
| 50   | 27080    | 10614     | 2.70                  | 5.23                   | 3.18                  | 5.68                   |
| 100  | 32432    | 10324     | 4.66                  | 10.61                  | 5.43                  | 10.96                  |
| 200  | 36662    | 10169     | 7.77                  | 21.23                  | 8.81                  | 21.92                  |
```

**Request per second (RPS)** is how many requests each proxy handled per second.

![YARP vs Nginx RPS comparison](https://milanjovanovic.tech/blogs/mnw_144/rps_comparison.png?imwidth=3840)

**p90 latency** is the time it took for 90% of requests to complete.

![YARP vs Nginx p90 latency comparison](https://milanjovanovic.tech/blogs/mnw_144/p90_comparison.png?imwidth=3840)

**p95 latency** is the time it took for 95% of requests to complete.

![YARP vs Nginx p95 latency comparison](https://milanjovanovic.tech/blogs/mnw_144/p95_comparison.png?imwidth=3840)

### Throughput Analysis

YARP really shines here. It handles way more requests - almost 3.6x more at 200 users. What's cool is how it scales up as you add more load. Nginx stays pretty much flat around 10k requests per second, but YARP keeps climbing from 12k all the way to 36k.

### Latency Comparison

The latency story is even more impressive for YARP. At 200 users, YARP keeps response times under 8ms while Nginx hits 21ms. That's a big difference when you're trying to keep your app fast.

---

## Hold Up - That's Not Fair

Looking at these results, we're missing something important: **this comparison isn't fair to Nginx**.

The default Nginx configuration I used is fine for basic setups, but it's not optimized for high-throughput scenarios. Nginx uses conservative defaults that work everywhere but don't push performance limits.

So let me fix the Nginx configuration and re-run the tests.

Here's the updated Nginx config with some tweaks to improve performance:

```conf :collapsed-lines
worker_processes auto;

events {
    worker_connections 65536;
    multi_accept on;
    use epoll;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 30;
    keepalive_requests 1000;
    types_hash_max_size 4096;

    upstream backend {
        server hello.api:8080;
        keepalive 512;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Connection "";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## Performance Results - After Tuning

Here are the results after re-running the tests:

```plaintext title="output"
| VUs  | YARP RPS | NGINX RPS | YARP p90 Latency (ms) | NGINX p90 Latency (ms) | YARP p95 Latency (ms) | NGINX p95 Latency (ms) |
|------|----------|-----------|-----------------------|------------------------|-----------------------|------------------------|
| 10   | 12692    | 17572     | 1.04                  | 0.58                   | 1.06                  | 0.74                   |
| 50   | 27080    | 36687     | 2.70                  | 1.81                   | 3.18                  | 2.09                   |
| 100  | 32432    | 43289     | 4.66                  | 3.18                   | 5.43                  | 3.88                   |
| 200  | 36662    | 46850     | 7.77                  | 6.34                   | 8.81                  | 7.72                   |
```

![YARP vs Nginx RPS comparison](https://milanjovanovic.tech/blogs/mnw_144/rps_comparison_tuned.png?imwidth=3840)

![YARP vs Nginx p90 latency comparison](https://milanjovanovic.tech/blogs/mnw_144/p90_comparison_tuned.png?imwidth=3840)

![YARP vs Nginx p95 latency comparison](https://milanjovanovic.tech/blogs/mnw_144/p95_comparison_tuned.png?imwidth=3840)

### Throughput Analysis

Now this is more interesting. Nginx actually edges out YARP in raw throughput - hitting 46k requests per second vs YARP's 36k at 200 users. Both proxies scale well as load increases, but Nginx shows why it's been the go-to choice for high-traffic sites.

### Latency Comparison

The latency story is pretty close. At lower loads, Nginx actually has better response times. At 200 users, both proxies keep response times reasonable - YARP at 7.77ms and Nginx at 6.34ms for p90 latency. The difference isn't huge either way.

---

## Key Takeaways

**Configuration matters more than you think**. The initial results showed YARP crushing Nginx, but that was with Nginx's conservative defaults. Once properly tuned, Nginx shows why it's been powering the internet for years.

**Nginx wins on raw performance**. With proper configuration, Nginx handles more requests and keeps latency slightly lower. That extra throughput matters when you're dealing with serious traffic.

**YARP offers better integration**. Even though Nginx edges out performance, YARP feels natural in .NET projects. Same configuration style, same patterns, same tooling. Sometimes that developer experience is worth more than a few extra requests per second.

**Always tune your tools**. This whole exercise shows why benchmarks with default configs can be misleading. If you're choosing between these two, make sure you're comparing optimized configurations, not defaults.

The choice isn't as clear-cut as I initially thought. Nginx wins on pure performance, but YARP wins on .NET integration. Pick based on what matters more for your specific situation.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "YARP vs Nginx - A Quick Performance Comparison",
  "desc": "In this article, we will compare the performance of YARP and Nginx, two popular reverse proxy solutions.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/yarp-vs-nginx-a-quick-performance-comparison.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
