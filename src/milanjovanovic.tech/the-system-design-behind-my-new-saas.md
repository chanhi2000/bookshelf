---
lang: en-US
title: "The System Design Behind My New SaaS"
description: "Article(s) > The System Design Behind My New SaaS"
icon: fas fa-network-wired
category:
  - DevOps
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - devops
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The System Design Behind My New SaaS"
    - property: og:description
      content: "The System Design Behind My New SaaS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techblogthe-system-design-behind-my-new-saas.html
prev: /devops/articles/README.md
date: 2026-07-25
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_204.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "DevOps > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/articles/README.md",
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
  name="The System Design Behind My New SaaS"
  desc="I just shipped Katabench, and it's the most fun system I've ever built: it takes C# from strangers and runs it safely on servers I own."
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techblogthe-system-design-behind-my-new-saas"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_204.png"/>

For the past few months, I've been building the most fun system of my career: one that takes C# code from strangers, compiles it, and runs it on my own servers.

It's called [<VPIcon icon="fas fa-globe"/>Katabench](https://katabench.com), a hands-on coding platform for .NET developers, and it's what came out of [**the urge to build something**](/milanjovanovic.tech/the-urge-to-build-something.md) I wrote about in January. You write code in the browser, across challenges for algorithms, EF Core, raw SQL, architecture tests, refactoring, secure coding, and test writing.

Nothing is simulated. A database challenge runs against a live Postgres instance, and you get back real execution numbers: allocated memory, query speed, the SQL your code produced.

But this isn't a product tour. The system design is the part you can steal. "Run untrusted code safely on hardware you own" sounds like a big-company problem. It turned out to fit on three servers.

Here's what we'll cover:

- The three-server layout, and what runs where
- Why no server is reachable from the public internet
- How I (safely) run untrusted code on my own machines
- Where I buy instead of self-host, and why

Let's dive in.

---

## The Big Picture

Katabench is three applications: a marketing website, the app itself, and the backend.

The marketing site is [<VPIcon icon="iconfont icon-astro"/>Astro](https://astro.build), for the same reason this website runs on Astro: nothing beats it for static content and SEO. The app is [<VPIcon icon="fa-brands fa-react"/>React](https://react.dev) with [<VPIcon icon="iconfont icon-vite"/>Vite](https://vite.dev) and [<VPIcon icon="iconfont icon-typescript"/>TypeScript](https://typescriptlang.org). It's a stack I'm familiar with, and you can build pretty much anything with it. Both are static builds served through [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare](https://pages.cloudflare.com), which costs me exactly $0 and includes the DNS, CDN, and DDoS protection I'd otherwise be paying for.

The backend is .NET, and that's where it gets interesting.

![The full Katabench system design: an Astro marketing site and React app served through Cloudflare, with Clerk for auth and Paddle for payments, and a backend of three Hetzner servers inside one VPN behind a Traefik reverse proxy. One server runs the .NET API with Postgres, Redis and NATS, another runs the worker and the isolated sandbox, and a third runs the Grafana observability stack.](https://milanjovanovic.tech/blogs/mnw_204/katabench_system_design.png)

Everything inside the big box runs on three [<VPIcon icon="fas fa-globe"/>Hetzner](https://hetzner.com/cloud) VPSs:

- The **API server**: the .NET API and its data stores
- The **worker server**: code execution, inside isolated sandboxes
- The **platform server**: deployments and observability

The rest of the stack: [<VPIcon icon="iconfont icon-github"/>`juanfont/headscale`](https://github.com/juanfont/headscale) for the VPN, [<VPIcon icon="fas fa-globe"/>Dokploy](https://dokploy.com) for deployments, [<VPIcon icon="iconfont icon-traefik"/>Traefik](https://traefik.io) as the reverse proxy, and [<VPIcon icon="iconfont icon-grafana"/>Grafana](https://grafana.com) for observability. Auth is [<VPIcon icon="fas fa-globe"/>Clerk](https://clerk.com) and payments are [<VPIcon icon="fas fa-globe"/>Paddle](https://paddle.com); both decisions get their own section at the end.

---

## Private by Default

The first design decision wasn't about the application at all: all of my servers are part of the same **private network** (VPN), and nothing is exposed to the public internet except ports 80 and 443.

![The Katabench VPN: the three backend servers, my desktop PC, and a Mac Mini for agent loops, all joined to one private network, with a self-hosted Headscale instance (managed through Headplane) as the control plane and ACLs restricting what each machine can reach.](https://milanjovanovic.tech/blogs/mnw_204/katabench_vpn.png)

My desktop PC is on the same VPN, and so is a Mac Mini that runs agent loops for me. That's how I reach Dokploy, Grafana, and the database. There's no public admin endpoint exposed.

The two public ports lead to **Traefik**, the reverse proxy that Dokploy manages for me, and Traefik routes traffic to the API. Everything else (Postgres, Redis, NATS, Grafana, Dokploy's own dashboard) is reachable only over the VPN.

A few weeks ago, I showed you how to [**build your own VPN with Tailscale**](/milanjovanovic.tech/build-your-own-vpn-with-tailscale.md). Katabench runs on the same idea, except the control plane is **Headscale**, an open-source, self-hosted implementation of Tailscale's coordination server, with [Headplane (<VPIcon icon="iconfont icon-github"/>`tale/headplane`)](https://github.com/tale/headplane) as its admin UI. Underneath it's still a [<VPIcon icon="fas fa-globe"/>WireGuard](https://wireguard.com) mesh. What changes is that I run the coordination server myself.

Headscale's **ACLs** decide what each machine is allowed to reach, so the worker server can't open a connection to the database even though they share a network. If Headscale goes down, existing tunnels keep working, but new machines can't join until I fix it. I can live with that: users never notice, and Headscale costs nothing.

Why Hetzner? Price. They raised their prices recently (my timing was impeccable to miss grandfathering the old prices...), but the math still beats every managed alternative.

---

## The API Server and Everything It Leans On

The API server runs the .NET API and the [<VPIcon icon="iconfont icon-postgresql"/>Postgres](https://postgresql.org) database right next to it.

![The API server: a .NET API talking to its local Postgres database, a Redis key-value cache, and a NATS JetStream stream carrying submission messages out to the worker, with a local OpenTelemetry agent alongside and nightly database backups shipped to Cloudflare R2.](https://milanjovanovic.tech/blogs/mnw_204/katabench_api.png)

If you're used to running everything in the cloud, a database on the same box as the API looks wrong. Here's why I did it anyway:

- A localhost connection has no network hop, so query latency is as low as it gets.
- A managed Postgres alone would likely cost more than I pay for this whole server.
- The failure modes are already coupled: if this server dies, the API is down whether or not the database survived it.

The real price is that backups are my problem now. Every night, a cron job ships a `pg_dump` to [<VPIcno icon="fa-brands fa-cloudflare"/>Cloudflare R2](https://developers.cloudflare.com/r2/), the exact setup I showed in [**last week's issue**](/milanjovanovic.tech/how-i-migrated-my-website-to-cloudflare-and-saved-228-dollars.md).

Also on this box:

- [<VPIcon icon="iconfont icon-redis"/>Redis](https://redis.io) for caching.
- [<VPIcon icon="fas fa-globe"/>NATS](https://nats.io) for lightweight messaging, which I use as a [**job queue**](/milanjovanovic.tech/nats-jetstream-job-queue-dotnet.md) between the API and the worker. [JetStream](https://docs.nats.io/nats-concepts/jetstream) gives it durable storage, and it handles far more scale than I'll ever need.
- An [<VPIcon icon="fas fa-globe"/>OpenTelemetry](https://opentelemetry.io) collector running in agent mode. More on that when we get to the platform server.

---

## The Worker and the Sandbox

This is the part of the system I spent the most time on, because this is where strangers run arbitrary C# on my hardware. Every decision here starts from one assumption: someone will eventually try to break out.

When you hit Submit, the API doesn't execute anything. It publishes a message to NATS and moves on.

The **worker**, on its own server, picks up the message. This is the classic [**queue with competing consumers**](/milanjovanovic.tech/how-to-scale-long-running-api-requests.md) setup: scaling out just means adding another consumer. If submissions pile up, I create another worker server, join it to the VPN, connect it to Dokploy, and it starts pulling from the same stream.

The worker has no database connection string or API credential. Its ACL also prevents it from reaching the database, limiting what a sandbox escape could expose.

And the worker doesn't run your code either. It hands it to a **sandbox**: an isolated, throwaway environment that compiles and executes a single submission. A sandbox can't touch another sandbox, and it can't reach anything else in the system. I'll write more about the specifics of the sandbox in a future issue, but the high-level idea is that it runs inside a container with no network access and a strict resource limit.

Because a sandbox can't touch anything, it's free to spin up whatever a challenge needs inside itself, like the throwaway Postgres instance your EF Core code runs against. That's how Katabench hands you back the SQL your code actually executed. Some challenges go further and inspect the query plan to check that your solution uses the right index.

It's also the basis for something bigger I'm working on: long-lived sandboxes where you build out a complete system, like a modular monolith, in an in-browser IDE. More on that another time.

---

## The Platform Server

The third server never serves a user request. It exists to manage and observe the other two.

**Dokploy** runs here. It's a self-hosted PaaS that gives me the Azure App Service experience on my own machines: push code, get a deployment, and Traefik routing is handled for me. The feature that sold me is remote server management: one Dokploy instance deploys to the whole fleet.

The other half of this server is the Grafana observability stack:

- **Grafana** for dashboards
- [<VPIcon icon="iconfont icon-grafana"/>Loki](https://grafana.com/oss/loki/) for structured logs
- [<VPIcon icon="iconfont icon-grafana"/>Tempo](https://grafana.com/oss/tempo/) for distributed traces
- [**Prometheus**](https://prometheus.io) for metrics

The OpenTelemetry collectors on the other two servers run in agent mode and stream telemetry to a gateway collector here, which feeds that stack.

![Telemetry from the other servers arriving at the gateway OpenTelemetry collector on the platform server, which forwards it into the Grafana stack of Grafana, Loki, Tempo, and Prometheus, with Dokploy running on the same box.](https://milanjovanovic.tech/blogs/mnw_204/katabench_platform.png)

My applications never talk to the monitoring backend directly; they hand everything to the local agent and stay decoupled from wherever the data ends up.

Is a dedicated observability server overkill for a brand-new SaaS? I don't think so. When your system executes other people's code, "what exactly happened here" is not a question you want to answer by grepping docker logs across three servers.

---

## Where I Buy Instead of Self-Host

Everything so far is self-hosted, which will surprise nobody who saw [<VPIcon icon="fa-brands fa-youtube"/>my side project tech stack](https://youtu.be/4gEUdn5hq_U) video earlier this year. Two pieces of Katabench went the other way: auth and payments.

Auth first: I chose **Clerk** over [<VPIcon icon="fas fa-globe"/>Keycloak](https://keycloak.org). I've shown you how to [**integrate Keycloak with ASP.NET Core**](/milanjovanovic.tech/integrate-keycloak-with-aspnetcore-using-oauth-2.md), and it's still what I recommend when you want full control over your identity setup.

But full control means all of it is my job: running the service and its database, building the sign-in forms and emails, and wiring up every external identity provider by hand. Clerk makes all of that someone else's job: sign-in components that drop into my React app, transactional emails, social logins that take minutes to enable, and users synced back to my backend.

The tradeoff: a per-user bill as you grow, and a dependency I don't control. At Katabench's current stage, getting to an MVP faster is worth more than the long-term cost of running my own auth service.

Payments follow the same logic, with one extra constraint. **Paddle** is a **merchant of record**, meaning they are legally the seller and handle global sales tax and VAT. As a solo developer selling worldwide, I'd rather give up a percentage than file tax returns in countries I couldn't place on a map.

And the constraint: I run my business from Serbia, and Stripe isn't available here. Paddle is.

The pattern behind both decisions: **I'll self-host infrastructure, but not auth or payments.** Everything else stays on my own servers, where the monthly bill stays the same no matter how much traffic shows up.

---

## Summary

- **Keep the application servers private.** The VPN connects the fleet, while ACLs limit what each machine can reach.
- **Move code execution off the API server.** NATS carries each submission to a worker, which hands it to an isolated, throwaway sandbox.
- **Separate the platform services.** Dokploy and the observability stack run without competing with user requests.
- **Choose what not to self-host.** I kept the infrastructure on my own servers and handed auth and payments to Clerk and Paddle.

Every box in the diagram hides decisions worth an issue of its own: hardening Headscale, building the sandbox, wiring the OpenTelemetry pipeline, running a Dokploy fleet.

Hit reply and tell me which part you want me to zoom in on first. Your questions will shape the next few issues and videos.

And if you're curious how all of this feels from the other side of the sandbox, [<VPIcon icon="fas fa-globe"/>Katabench](https://katabench.com) is live. Give it a try and tell me what breaks.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The System Design Behind My New SaaS",
  "desc": "I just shipped Katabench, and it's the most fun system I've ever built: it takes C# from strangers and runs it safely on servers I own.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techblogthe-system-design-behind-my-new-saas.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
