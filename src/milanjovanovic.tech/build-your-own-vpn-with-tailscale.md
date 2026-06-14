---
lang: en-US
title: "Build Your Own VPN With Tailscale"
description: "Article(s) > Build Your Own VPN With Tailscale"
icon: fa-brands fa-docker
category:
  - Go
  - Grafana
  - DevOps
  - Docker
  - Data Science
  - PostgreSQL
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - go
  - golang
  - grafana
  - devops
  - docker
  - data-science
  - sql
  - postgres
  - postgresql
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Build Your Own VPN With Tailscale"
    - property: og:description
      content: "Build Your Own VPN With Tailscale"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techblogbuild-your-own-vpn-with-tailscale.html
prev: /devops/docker/articles/README.md
date: 2026-07-04
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_201.png
---

# {{ $frontmatter.title }} 관련

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
  "title": "Grafana > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/go-grafana/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
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
  name="Build Your Own VPN With Tailscale"
  desc="Most of what runs on your servers was never meant to be public: databases, dashboards, admin panels, internal APIs. Tailscale connects your machines into one private, encrypted network so they can talk to each other (and to you) while the public internet sees nothing. Here's what it is and how to wire up applications across multiple VPSs with zero open ports."
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techblogbuild-your-own-vpn-with-tailscale"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_201.png"/>

Right now, a bot is scanning the internet for your database. Not yours in particular. Every database, on every server with a public IP, around the clock. The moment something on your VPS gets a public port, you're in that game whether you meant to join or not.

And most of what runs on a server was never built to play it. The database. The admin panel. The metrics dashboard. The internal API only your other services call.

None of that is meant for the public. Yet the standard tutorial hands each one a public port anyway, and with it a second job: certificates, login pages, IP allowlists, and bots probing around the clock.

There's a better default: keep those services private, reachable only by you and by each other, and expose nothing. This issue shows you how, using [<VPIcon icon="iconfont icon-taliscale"/>Tailscale](https://tailscale.com).

---

## What Tailscale Actually Is

A **VPN** (virtual private network) is an encrypted tunnel between machines over the public internet. Traffic inside it stays private, even across networks you don't control.

**Tailscale** uses that idea to connect *your own* machines (PCs, servers, phones) into a single private network only your devices can see, called a **tailnet**. It runs on [<VPIcon icon="fas fa-globe"/>WireGuard](https://wireguard.com/), a modern, heavily audited encryption protocol, and manages all the keys and addresses for you.

The shape is what sets it apart from an old-school VPN. A traditional VPN is **hub and spoke**: every device dials one central server, and all traffic funnels through it. Tailscale builds a **mesh**, where every device connects *directly* to every other device over its own encrypted tunnel.

![A traditional hub-and-spoke VPN where all traffic flows through one central server, next to a Tailscale mesh where every device has a direct encrypted tunnel to every other device](https://milanjovanovic.tech/blogs/mnw_201/hub_and_spoke_vs_mesh.png)
<!-- TODO: mermaid화 -->

No server sits in the traffic path. Your app-to-database traffic takes the shortest route between the boxes, and there's nothing to babysit.

How do devices find each other with no server in the middle? Tailscale splits the job: a **coordination server** keeps a directory of your devices and their keys (a phone book), while your **actual data** flows directly between devices, encrypted end to end.

![Tailscale's coordination server exchanges only public keys and device metadata with each device, while the actual data flows through a direct WireGuard tunnel between the devices themselves](https://milanjovanovic.tech/blogs/mnw_201/coordination_vs_data_plane.png)
<!-- TODO: mermaid화 -->

The key property: devices only ever dial *outward*, to the coordination server and to each other. Nothing has to connect *inward*, which is what lets us close every firewall port next.

---

## Connecting Two VPSs With Zero Open Ports

Installing Tailscale is two commands per machine (plus the app on your PC):

```sh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Open the login URL it prints, approve the device, and it joins your tailnet with a **stable private IP** (in the `100.x.y.z` range) and a name that never change, on any network.

Here's the setup we'll build:

- `vps-app` (`100.64.0.2`) runs a .NET API in [<VPIcon icon="fa-brands fa-docker"/>Docker](https://docker.com).
- `vps-data` (`100.64.0.3`) runs [<VPIcon icon="iconfont icon-postgresql"/>Postgres](https://postgresql.org) and [<VPIcon icon="iconfont icon-grafana"/>Grafana](https://grafana.com) in Docker.
- The API queries Postgres across the boxes, you reach everything from your PC, and the internet sees none of it.

![A PC, an API VPS, and a data VPS connected in one tailnet: the PC calls the API by tailnet name, the API reaches Postgres on the other VPS by tailnet IP, and a public internet node is blocked with no inbound ports open](https://milanjovanovic.tech/blogs/mnw_201/private_apps_over_tailnet.png)
<!-- TODO: mermaid화 -->

**Close the firewall.** Because Tailscale only dials outward, your cloud firewall needs no inbound rules to reach these boxes. Confirm SSH works over the tailnet, then delete the public port-22 rule so SSH stops existing as far as the internet is concerned.

**Bind services to the tailnet IP.** This is the step that makes "zero open ports" true. Publishing a Docker port the usual way (`-p 5432:5432`) binds it to `0.0.0.0`, every interface. Publish private services on the **tailnet IP only** instead. On `vps-data`:

```yaml title="docker-compose.yml"
services:
  postgres:
    image: postgres:18
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - '100.64.0.3:5432:5432'   # tailnet IP, not 0.0.0.0
    volumes:
      - pgdata:/var/lib/postgresql/data

  grafana:
    image: grafana/grafana:12.1.0
    restart: unless-stopped
    ports:
      - '100.64.0.3:3000:3000'
    volumes:
      - grafana:/var/lib/grafana

volumes:
  pgdata:
  grafana:
```

Now Postgres has no public endpoint at any layer, yet every device on your tailnet reaches it.

**Wire the app to the other box** with an ordinary connection string pointed at the data box's stable tailnet IP:

```yaml title="docker-compose.yml"
services:
  api:
    image: ghcr.io/milanjovanovic/api:latest
    restart: unless-stopped
    ports:
      - '100.64.0.2:8080:8080'
    environment:
      ConnectionStrings__AppDb: 'Host=100.64.0.3;Port=5432;Database=app;Username=app;Password=${POSTGRES_PASSWORD}'
```

Then from your PC, on any network:

```sh
curl http://vps-app:8080/health
psql -h vps-data -p 5432 -U app app
```

Look back at everything this setup let you skip. WireGuard encrypts every byte, so TLS certificates never entered the picture. Grafana went up without a reverse proxy or a login page, and you reached each service by its tailnet name instead of a DNS record. The services run, but the internet can't see them.

---

## The Payoff

Once your machines share one private network, every internal service (databases, queues, dashboards, admin panels, service-to-service APIs) stops being a public endpoint you have to defend. It becomes a private address you simply connect to.

This is the exact pattern I run for [<VPIcon icon="fas fa-globe"/>Katabench](https://katabench.com), the coding platform I'm building. One reverse proxy on 80 and 443 is public, because users load the app through it. Everything else (the **deployment panel**, Postgres, the message queue, Grafana, all the telemetry) lives on the tailnet with no public hostname at all.

The mental model that makes it stick: **a public hostname is something a service has to earn**, and only when an outside party genuinely must reach it. Everything else stays private by default.

Fifteen minutes of setup, zero open ports, and your infrastructure disappears from the public internet without losing an ounce of convenience.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build Your Own VPN With Tailscale",
  "desc": "Most of what runs on your servers was never meant to be public: databases, dashboards, admin panels, internal APIs. Tailscale connects your machines into one private, encrypted network so they can talk to each other (and to you) while the public internet sees nothing. Here's what it is and how to wire up applications across multiple VPSs with zero open ports.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techblogbuild-your-own-vpn-with-tailscale.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
