---
lang: en-GB
title: "MOOving to a self-hosted Bluesky PDS"
description: "Article(s) > MOOving to a self-hosted Bluesky PDS"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - dbushell.com
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > MOOving to a self-hosted Bluesky PDS"
    - property: og:description
      content: "MOOving to a self-hosted Bluesky PDS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/mooving-to-a-self-hosted-bluesky-pds.html
prev: /devops/docker/articles/README.md
date: 2026-03-03
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2026-03-02-mooving-to-a-self-hosted-bluesky-pds.png
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

[[toc]]

---

<SiteInfo
  name="MOOving to a self-hosted Bluesky PDS"
  desc="The one where I yolo a data migration"
  url="https://dbushell.com/2026/03/02/mooving-to-a-self-hosted-bluesky-pds/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2026-03-02-mooving-to-a-self-hosted-bluesky-pds.png"/>

[Bluesky (<VPIcon icon="fa-brands fa-bluesky"/>`dbushell.com`)](https://bsky.app/profile/dbushell.com/) is a “Twitter clone” that runs on the [<VPIcon icon="fas fa-globe"/>AT Protocol](https://atproto.com/). I have to be honest, I’d struggle to explain how atproto works. I think it’s similar to [<VPIcon icon="fas fa-globe"/>Nostr](https://nostr.com/) but like, good? When atproto devs talk about *The Atmosphere* they sound like blockchain bros. The marketing needs consideration. Bluesky however, is a lot of fun. Feels like early Twitter.

Nobody cool uses ~Twitter~ anymore ever. It’s a cesspit of racists asking Gork to undress women.

---

## Self-hosting

[<VPIcon icon="fa-brands fa-mastodon"/>Mastodon](https://social.lol/@db/) and [Bluesky (<VPIcon icon="fa-brands fa-bluesky"/>`dbushell.com`)](https://bsky.app/profile/dbushell.com/) are the social platforms I use. I’ve always been tempted to self-host my own Mastodon instance but the requirements are steep. I use the [<VPIcon icon="fas fa-globe"/>omg.lol](https://home.omg.lol/) server instead. Self-hosting the [Bluesky PDS (<VPIcon icon="iconfont icon-github"/>`bluesky-social/pds`)](https://github.com/bluesky-social/pds) is much less demanding.

My setup includes:

### Raspberry Pi 5

This is the host machine [I glued an NVMe](https://dbushell.com/2024/03/25/self-hosted-update-spring-2024/#raspberry-pi-5) onto the underside. All services run as [Docker containers](https://dbushell.com/2024/08/12/docker-network-bugs-and-fixes/) for easy security sandboxing. I say easy but it took many painful years to master Docker. I have the Pi on a VLAN firewall because I’m extra paranoid.
<!-- TODO: /dbushell.com/self-hosted-update-spring-2024.md -->
<!-- TODO: /dbushell.com/docker-network-bugs-and-fixes.md -->

### Bluesky PDS

I setup my [Bluesky PDS (<VPIcon icon="iconfont icon-github"/>`bluesky-social/pds`)](https://github.com/bluesky-social/pds) using the official Docker container. It’s configure with [environment variables (<VPIcon icon="iconfont icon-github"/>`bluesky-social/pds#environment-variables`)](https://github.com/bluesky-social/pds#environment-variables) and has a single data volume mounted. I backup that volume to my NAS.

### Caddy

I’ve put [<VPIcon icon="fas fa-globe"/>Caddy](https://caddyserver.com/) in front of the PDS container. Right now it just acts as a reverse proxy. This gives me flexibility later if I want to add access logs, rate limiting, or other plugins.

### Cloudflare Tunnel

Booo! If you know a good European alternative please [<VPIcon icon="fas fa-globe"/>let me know!](https://dbushell.com/contact/) The tunnel links Caddy to the outside world via Cloudflare to avoid exposing my home IP address. Cloudflare also adds an extra level of bot protection.

The guides I followed suggest adding wildcard DNS for the tunnel. Cloudflare has shuffled the dashboard for the umpteenth time and I can’t figure out how. I think sub-domains are only used for user handles, e.g. `user.example.net`. I use a different custom domain for my handle (`@dbushell.com`) with a manual TXT record to verify.

### Proton SMTP

Allowing the PDS to send emails isn’t strictly necessary. It’s useful for password resets and I think it’ll send a code if I migrate PDS again. I went through the hassle of adding my PDS domain to [<VPIcon icon="iconfont icon-proton"/>Proton Mail](https://proton.me/) and followed their [<VPIcon icon="iconfont icon-proton"/>SMTP guide](https://proton.me/support/smtp-submission).

```sh
PDS_EMAIL_SMTP_URL=smtp://pds@example.net:S3CR3TT0K3N@smtp.protonmail.ch:587
PDS_EMAIL_FROM_ADDRESS=pds@example.net
```

This shows how the PDS enviornment variables are formatted. It took me forever to figure out where the username and password went.

---

## PDS MOOver

[<VPIcon icon="fas fa-globe"/>PDS MOOver](https://pdsmoover.com/) by [Bailey Townsend (<VPIcon icon="fa-brands fa-bluesky"/>`baileytownsend.dev`)](https://bsky.app/profile/baileytownsend.dev) is the tool that does the data migration. It takes your Bluesky password and probably sees your private key, so use at your own risk! I setup a new account to test it before I YOLO’d my main.

MOOve successful!

I still login at `bsky.app` but I now select “custom account provider” and enter my PDS domain. [<VPIcon icon="fas fa-globe"/>SkyTools](https://skytools.anon5r.com/) has a tool that confirms it. [<VPIcon icon="fas fa-globe"/>Bluesky Debug](https://bsky-debug.app/handle) can check handles are verified correctly. [<VPIcon icon="fas fa-globe"/>PDSIs.dev](https://pdsls.dev/) is a neat atproto explorer.

I cross-referenced the following guides for help:

<SiteInfo
  name="Notes on Self Hosting a Bluesky PDS Alongside Other Services"
  desc="I’ve recently set up a Bluesky Personal Data Server (PDS) to store the data for my Bluesky account. I wanted to host it on my server alongside the many other web apps, databases, and many other services. I additionally wanted to use my top-level domain as my handle. I started out following the install guide on the official PDS repo and it initially started out pretty well. However, I pretty quickly ran into some issues where the default config didn’t work for me."
  url="https://cprimozic.net/notes/posts/notes-on-self-hosting-bluesky-pds-alongside-other-services/"
  logo="https://cprimozic.net/notes/img/theme-colors/green.png"
  preview="https://cprimozic.net/notes/img/favicon/green.png"/>

<SiteInfo
  name="Self-host federated Bluesky instance (PDS) with CloudFlare Tunnel » MszPro・株式会社Smartソフト"
  desc="This article talks about setting up your own Bluesky personal data server, so you will hold your follow data, post data, and medias on your own server. With proper setup, you will be able to follow people on other At Proto instances (like bsky.social); and people on bsky.social can follow you. Using CloudFlare tunnel We"
  url="https://mszpro.com/bluesky-self-hosted/"
  logo="https://static-assets.mszpro.com/2024/12/cropped-Unknown-192x192.webp"
  preview="https://static-assets.mszpro.com/2024/12/cropped-Unknown.webp"/>

<SiteInfo
  name="Host a PDS via a Cloudflare Tunnel"
  desc="Learn how to use a Cloudflare Tunnel to host your PDS on a local network."
  url="https://baileytownsend.dev/articles/host-a-pds-with-a-cloudflare-tunnel/"
  logo="https://baileytownsend.dev/favicon.ico"
  preview="https://baileytownsend.dev/article-assets/12/cover.png"/>

- [~~Self-hosting Bluesky PDS~~](https://mattdyson.org/blog/2024/11/self-hosting-bluesky-pds/)

Most of the Cloudflare stuff is outdated because Cloudflare rolls dice every month.

Bluesky is still heavily centralised but the atproto layer allows anyone to control their own data. I like doing that on principle. I don’t like maintenance, but I’ve heard that’s minimal for a PDS. Supposedly it’s possible to [<VPIcon icon="fa-brands fa-bluesky"/>migrate back to Bluesky’s PDS](https://docs.bsky.app/blog/incoming-migration) if I get bored.

I’m tempted to build something in *The Atmosphere*. Any ideas?

::: note Update for 3rd March 2026

[<VPIcon icon="fas fa-globe"/>Xan](https://xan.lol/) suggested I add a favicon which can appear on [<VPIcon icon="fas fa-globe"/>witchsky.app](https://witchsky.app/). In Docker I mounted a “public” directory to the Caddy container. In the Caddyfile route I added a handle to match `/favicon.ico` and serve the file (before the reverse proxy to the PDS container). I knew Caddy would come in handy!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "MOOving to a self-hosted Bluesky PDS",
  "desc": "The one where I yolo a data migration",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/mooving-to-a-self-hosted-bluesky-pds.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
