---
lang: en-US
title: "How I Save $1,463 per Month Using Claude Code as My Server Admin"
description: "Article(s) > How I Save $1,463 per Month Using Claude Code as My Server Admin"
icon: iconfont icon-dokku
category:
  - DevOps
  - Docker
  - Dokku
  - Heroku
  - Github
  - Cloudflare
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - typescript.tv
  - devops
  - docker
  - dokku
  - heroku
  - github
  - cloudflare
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Save $1,463 per Month Using Claude Code as My Server Admin"
    - property: og:description
      content: "How I Save $1,463 per Month Using Claude Code as My Server Admin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/how-i-save-money-using-claude-code-as-my-server-admin.html
prev: /devops/dokku/articles/README.md
date: 2026-04-07
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dokku > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/dokku/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Heroku > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/heroku/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How I Save $1,463 per Month Using Claude Code as My Server Admin"
  desc="A step-by-step guide to migrating Node.js apps written in TypeScript from Heroku to a Hetzner dedicated server with Dokku, saving hundreds of dollars per year while keeping GitHub auto-deploy and managed Postgres."
  url="https://typescript.tv/hands-on/how-i-save-money-using-claude-code-as-my-server-admin"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

A step-by-step guide to migrating Node.js apps written in TypeScript from Heroku to a Hetzner dedicated server with Dokku, saving hundreds of dollars per year while keeping GitHub auto-deploy and managed Postgres.

Heroku was great when I started. Push code, get a URL, done. Platform-as-a-Service won the last decade because it took operational complexity away for a surcharge, and that trade-off made sense when managing servers meant writing Ansible playbooks and debugging iptables rules. But the landscape has changed. With AI coding tools like [<VPIcon icon="iconfont icon-claude"/>Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview), the complexity of managing your own server largely goes away. You describe what you want in plain English, and the tool SSHs in and runs the commands. That shifts the equation: owning your servers becomes very attractive again when the operational overhead drops to near zero.

I run several Node.js services built on TypeScript: web apps, APIs, and background workers like Telegram bots. Over time, the Heroku bills kept climbing. A basic dyno, a Postgres add-on, and a couple of worker processes added up to hundreds of dollars per year for apps that could run on a single server. I decided to migrate everything to a [<VPIcon icon="fas fa-globe"/>Hetzner](https://hetzner.com/) dedicated server running [<VPIcon icon="fas fa-globe"/>Dokku](https://dokku.com/), and the entire setup happened in the background through Claude Code's CLI while I was busy building new TypeScript projects. Here is exactly how it was done, so you can use it as a blueprint for your own migration.

---

## Why Dokku

Dokku is a lightweight, open-source Platform-as-a-Service (PaaS) built on Docker. Under the hood, it uses [<VPIcon icon="iconfont icon-github"/>`gliderlabs/herokuish`](https://github.com/gliderlabs/herokuish) to run Heroku buildpacks, which means your existing `Procfile` and <VPIcon icon="iconfont icon-json"/>`package.json` work without changes. If your app runs on Heroku, it runs on Dokku.

Even though I migrated away from Heroku, this setup is not limited to Heroku. I also moved services from [<VPIcon icon="fas fa-globe"/>Render](https://render.com/), [<VPIcon icon="fas fa-globe"/>Railway](https://railway.app/), [<VPIcon icon="fas fa-globe"/>Netlify](https://netlify.com/), and [<VPIcon icon="fas fa-globe"/>Vercel](https://vercel.com/). Any service that deploys from a `Procfile` or a Dockerfile works out of the box. The difference is that Dokku runs on your own server, so you pay for hardware instead of per-platform pricing.

I considered other tools like [<VPIcon icon="fas fa-globe"/>Coolify](https://coolify.io/) and [<VPIcon icon="fas fa-globe"/>CapRover](https://caprover.com/), but Dokku won because of its simplicity. There is no web UI to maintain, no dashboard to secure, just a CLI that works over SSH. This also means less attack surface compared to something like Coolify, which exposes an admin panel on a port that needs to be locked down. If you prefer a web interface, Coolify is worth looking at, but I like the Unix philosophy of Dokku: it does one thing well.

---

## The Plot Twist: I Didn't Write a Single Command

Before I walk you through the setup, I should confess something. Every command you see in this article, every `dokku` call, every `gh api` invocation, every `ssh` session, I did not type any of them. Not most of them. None of them. The entire migration was done through [<VPIcon icon="iconfont icon-claude"/>Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) running in my terminal. I described what I wanted in plain English, and Claude Code SSHed into the server and executed everything.

The workflow is simple: I created a private GitHub repo called `hetzner-server` and told Claude Code to use it as "infrastructure as docs", a place where every server configuration, domain change, and deployment setup gets documented in a `README.md`. When I start a new Claude Code session from that repo, it reads the existing notes and knows the full setup: which apps are deployed, which domains point where, which env vars are set, and how the webhook pipeline works.

When I want to deploy a new app, I just tell Claude Code "deploy this GitHub repo to my server." It SSHs into the Hetzner box, creates the Dokku app, uses the `gh` CLI to set up the webhook on the repo, configures the deploy key for private repos, enables Let's Encrypt, and updates the documentation. The entire deploy-a-new-app flow is a single conversation.

This works because Dokku and the GitHub CLI are both command-line tools. Claude Code can SSH into the server and run `dokku` commands, and it can run `gh api` locally to configure webhooks and deploy keys. There is no need for a server-side MCP or API. The server is just a Linux box that accepts SSH connections, and Claude Code is the glue that ties everything together. Some providers like [<VPIcon icon="iconfont icon-hostinger"/>Hostinger](https://hostinger.com/) offer an [<VPIcon icon="iconfont icon-hostinger"/>API MCP server](https://hostinger.com/support/11079316-hostinger-api-mcp-server/), but for a dedicated server you don't need one. SSH is enough.

Now, here is everything Claude Code did for me.

---

## Setting Up the Server

I ordered a Hetzner AX41-NVMe dedicated server (AMD Ryzen 5 3600 6-Core, two 512GB NVMe drives, 64GB RAM). From there, Claude Code took over. It SSHed into the rescue system, installed Ubuntu 24.04 LTS via Hetzner's `installimage`, and configured RAID 1 for redundancy.

Once Ubuntu was running, it installed Dokku:

Install Dokku

```sh
wget -NP . https://dokku.com/bootstrap.sh
sudo bash bootstrap.sh
```

After installation, it added my SSH key so I could deploy via `git push`:

Add SSH key for deployments

```sh
echo 'YOUR_PUBLIC_SSH_KEY' | dokku ssh-keys:add admin
```

The entire server setup, from ordering to a running Dokku instance, took Claude Code about 20 minutes.

---

## Choosing a Domain

Dokku assigns apps a subdomain automatically using [<VPIcon icon="fas fa-globe"/>sslip.io](https://sslip.io/), a free service that resolves any IP embedded in a hostname back to that IP. For example, `95.217.148.47.sslip.io` resolves to `95.217.148.47`. This is great for testing, but for production you want a real domain.

I bought my domain on [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare](https://cloudflare.com/) because they offer an [<VPIcon icon="fa-brands fa-cloudflare"/>official MCP server](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/) and API tokens with fine-grained permissions. Cloudflare provides an "Edit zone DNS" token template that grants only DNS access, nothing else. This means AI coding tools like [<VPIcon icon="iconfont icon-claude"/>Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) can manage DNS records programmatically without having access to your billing, account settings, or other services. If you already have domains on another registrar like [<VPIcon icon="fas fa-globe"/>Gandi](https://gandi.net/), that works too since they have a REST API with Personal Access Tokens.

Set up DNS by pointing your domain to the server:

DNS records to create

```sh
# A record
yourdomain.com → YOUR_SERVER_IP
 
# AAAA record (if you have IPv6)
yourdomain.com → YOUR_SERVER_IPV6
```

Then configure Dokku to use your domain:

Set global domain

```sh
dokku domains:set-global yourdomain.com
```

---

## SSL Certificates

Dokku has a [Let's Encrypt plugin (<VPIcon icon="iconfont icon-github"/>`dokku/dokku-letsencrypt`)](https://github.com/dokku/dokku-letsencrypt) that handles SSL certificates automatically. Install it once and enable it per app:

Install and enable Let's Encrypt

```sh
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku letsencrypt:set --global email you@example.com
dokku letsencrypt:enable your-app
```

The plugin handles certificate renewal automatically. For services that aren't Dokku apps (like a landing page or a webhook listener), you can use [<VPIcon icon="fas fa-globe"/>certbot](https://certbot.eff.org/) directly with nginx.

---

## Deploying Your First App

If your app already has a <VPIcon icon="fas fa-file-lines"/>`Procfile`, deploying to Dokku is almost identical to deploying to Heroku:

Deploy via git push

```sh
dokku apps:create my-app
git remote add dokku dokku@YOUR_SERVER_IP:my-app
git push dokku main
```

Dokku detects the language from your <VPIcon icon="iconfont icon-json"/>`package.json`, installs dependencies, runs `npm run build`, and starts the app using the command in your <VPIcon icon="fas fa-file-lines"/>`Procfile`. For Node.js, the version is resolved from `engines.node` in your <VPIcon icon="iconfont icon-json"/>`package.json`, or from an `.nvmrc` file in the repo root. If neither is present, it defaults to the latest version.

For worker processes (like a Telegram bot or background job), scale down the web process and scale up the worker:

Run as a worker instead of web

```sh
dokku ps:scale my-app web=0 worker=1
```

---

## GitHub Auto-Deploy with Webhooks

On Heroku, connecting a GitHub repo for auto-deploy is a checkbox. On Dokku, you need to set it up yourself, but it is straightforward. I used [<VPIcon icon="iconfont icon-github"/>`adnanh/webhook`](https://github.com/adnanh/webhook), a lightweight webhook listener that runs as a systemd service.

Install it on the server:

Install webhook listener

```sh
apt-get install -y webhook
```

Create a deploy script that clones the repo and pushes to Dokku:

```sh title="/opt/webhook/deploy.sh"
#!/bin/bash
set -euo pipefail
 
APP_NAME="$1"
CLONE_URL="$2"
REF="$3"
BRANCH="${REF#refs/heads/}"
 
# Create app if it does not exist
dokku apps:list | grep -q "^$APP_NAME$" || dokku apps:create "$APP_NAME"
 
# Convert HTTPS URL to SSH for private repo access
SSH_URL=$(echo "$CLONE_URL" | sed "s|https://github.com/|git@github.com:|")
 
dokku git:sync --build "$APP_NAME" "$SSH_URL" "$BRANCH"
```

Configure the webhook with HMAC signature validation so only GitHub can trigger deploys:

```json title="/opt/webhook/hooks.json"
[
  {
    "id": "dokku-deploy",
    "execute-command": "/opt/webhook/deploy.sh",
    "command-working-directory": "/tmp",
    "pass-arguments-to-command": [
      { "source": "payload", "name": "repository.name" },
      { "source": "payload", "name": "repository.clone_url" },
      { "source": "payload", "name": "ref" }
    ],
    "trigger-rule": {
      "and": [
        {
          "match": {
            "type": "payload-hmac-sha256",
            "secret": "YOUR_WEBHOOK_SECRET",
            "parameter": {
              "source": "header",
              "name": "X-Hub-Signature-256"
            }
          }
        },
        {
          "match": {
            "type": "value",
            "value": "refs/heads/main",
            "parameter": {
              "source": "payload",
              "name": "ref"
            }
          }
        }
      ]
    }
  }
]
```

Run it as a systemd service, then add the webhook URL to your GitHub repo. You can do this from the GitHub UI or with the `gh` CLI:

Add webhook via gh CLI

```sh
gh api repos/OWNER/REPO/hooks -X POST --input - << 'EOF'
{
  "config": {
    "url": "https://yourdomain.com/hooks/dokku-deploy",
    "content_type": "json",
    "secret": "YOUR_WEBHOOK_SECRET",
    "insecure_ssl": "0"
  },
  "events": ["push"],
  "active": true
}
EOF
```

For private repos, generate an SSH deploy key on the server and add it to the repo's deploy keys. GitHub requires a unique key per repo, so if you have multiple private repos, each one needs its own key pair.

---

## Migrating a Postgres Database from Heroku

This is the part that sounds scary but is actually simple. You need the [<VPIcon icon="iconfont icon-heroku"/>Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and the Dokku Postgres plugin.

Install the Postgres plugin on your server:

Install Dokku Postgres plugin

```sh
dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
```

Create a database and link it to your app. Dokku automatically sets the `DATABASE_URL` environment variable:

Create and link database

```sh
dokku postgres:create my-app-db
dokku postgres:link my-app-db my-app
```

Now capture a backup from Heroku, download it to the server, and import it:

Migrate Heroku Postgres to Dokku

```sh
# Capture a fresh backup
heroku pg:backups:capture --app my-heroku-app
 
# Get the download URL
heroku pg:backups:url --app my-heroku-app
 
# Download the dump on the server
ssh root@YOUR_SERVER_IP 'curl -o /tmp/heroku.dump "BACKUP_URL_HERE"'
 
# Import into Dokku Postgres
ssh root@YOUR_SERVER_IP 'cat /tmp/heroku.dump | dokku postgres:import my-app-db'
```

Copy over your environment variables from Heroku (excluding `DATABASE_URL`, which Dokku sets automatically):

Copy environment variables

```sh
# View Heroku config
heroku config --app my-heroku-app
 
# Set on Dokku (skip DATABASE_URL)
dokku config:set my-app KEY1=value1 KEY2=value2
```

Verify the migration by comparing record counts between Heroku and your new server. Before scaling down the Heroku dynos, make sure your DNS A records already point to your dedicated server and that the change has fully propagated. DNS records have TTLs (time-to-live), so changing an address is not immediate. If you scale down Heroku while DNS is still pointing there, your users will see errors until propagation completes. Lower your TTL ahead of time and verify with `dig yourdomain.com A` before proceeding.

Once DNS is confirmed and you are confident everything works on Hetzner, scale the Heroku app to zero dynos:

Freeze the Heroku app

```sh
heroku ps:scale web=0 --app my-heroku-app
```

After a few days of running in production on Hetzner, you can delete the Heroku app entirely:

Delete the Heroku app

```sh
heroku apps:destroy my-heroku-app --confirm my-heroku-app
```

---

## Managing Repo Settings with the GitHub CLI

The [<VPIcon icon="iconfont icon-github"/>GitHub CLI](https://cli.github.com/) (`gh`) is essential for this workflow. Claude Code used it to create webhooks on repos, add deploy keys for private repo access, manage branch protection rules, and close stale pull requests. Everything that you would click through in the GitHub UI can be scripted with `gh api`. For example, listing all webhook deliveries to debug a failed deploy:

Debug webhook deliveries

```sh
gh api repos/OWNER/REPO/hooks/HOOK_ID/deliveries \
--jq '.[] | {delivered_at, status, status_code}'
```

---

## What It Costs

On Heroku, a "Basic" always-on dyno gives you 512 MB of RAM and costs $7 per month. Each Essential Postgres database adds another $5 per month. My Hetzner AX41-NVMe server has 64 GB of RAM, two 512 GB NVMe drives, and costs $52.24 per month (hosted in Germany, taxes included).

To get the same 64 GB of RAM on Heroku, you would need 128 Basic dynos. If each app also needs its own Postgres database, the math looks like this:

|  | Heroku | Hetzner + Claude Code |
| --- | --- | --- |
| 128 dynos ("Basic" model, 512 MB each) | $896/mo | — |
| 128 Postgres databases ("Essential" model, 1 GB storage each) | $640/mo | — |
| Dedicated server ("AX41-NVMe" model, 64 GB RAM, 512 GB storage) | — | $52.24/mo |
| Claude Code subscription | — | $20/mo |
| **Total** | **$1,536/mo** | **$72.24/mo** |

That is a 21x price difference for the same amount of RAM and more than enough disk space for 128 small databases. Of course, this comparison only holds when looking at RAM and storage. In practice, CPU will be the bottleneck long before you hit 128 apps on a single machine. A dedicated server is a monolith: you cannot horizontally scale it by adding more instances behind a load balancer the way Heroku dynos can. The same limitation applies to the databases, which all share the same Postgres instance on one machine.

Dokku actually handles more than you might expect. Zero-downtime deployments work out of the box: it starts the new container, runs healthchecks, switches nginx traffic over, and shuts down the old container after 60 seconds. Load balancing is also built in: scale an app to multiple containers with `dokku ps:scale web=3` and nginx automatically distributes traffic across them. This makes sense even on a single server since Node.js is single-threaded per process, so multiple containers let you use multiple CPU cores.

For DDoS mitigation, bot protection, and WAF (Web Application Firewall), you can enable the Cloudflare proxy on your DNS records. When proxied, all traffic goes through Cloudflare before reaching your server, which hides your server's real IP and gives you DDoS protection on the free tier. Turning it on is a single toggle per DNS record. Auto-scaling is the one thing you genuinely lose compared to Heroku since Dokku only supports manual scaling.

That said, for demos, side projects, and low-traffic production services, a single Hetzner server with Dokku is the perfect sweet spot. You get the Heroku developer experience at a fixed monthly cost, and you only start thinking about scaling when your apps actually need it.

This easy math works for me as an individual running personal projects. At company scale, the effect can become even larger. David Heinemeier Hansson (DHH), co-founder of [<VPIcon icon="fas fa-globe"/>37signals](https://37signals.com/) (the company behind Basecamp and HEY), wrote about their decision to leave the cloud entirely. In his post [<VPIcon icon="fas fa-globe"/>"We have left the cloud"](https://world.hey.com/dhh/we-have-left-the-cloud-251760fb), he shared that "the napkin math is that we'll save at least $1.5 million per year by owning our own hardware rather than renting it from Amazon." That was posted back in June 2023, before models like Claude Opus 4.6 and MCP servers for major cloud hosting providers even existed. The cost of managing your own servers has only gotten cheaper since then.

DHH and 37signals also built [<VPIcon icon="iconfont icon-github"/>`basecamp/kamal`](https://github.com/basecamp/kamal), an open-source deployment tool that handles zero-downtime deployments across multiple servers. If you outgrow a single-server Dokku setup and need something production-grade with rolling deploys, Kamal is worth looking at as the next step up.

---

## The Tools That Made It Work

Here is a summary of everything used in this migration:

| Tool | Purpose |
| --- | --- |
| [<VPIcon icon="fas fa-globe"/>Dokku](https://dokku.com/) | PaaS on your own server |
| [<VPIcon icon="iconfont icon-github"/>`gliderlabs/herokuish`](https://github.com/gliderlabs/herokuish) | Heroku buildpack compatibility |
| [<VPIcon icon="iconfont icon-github"/>`dokku/dokku-postgres`](https://github.com/dokku/dokku-postgres) | Managed Postgres for Dokku |
| [<VPIcon icon="iconfont icon-github"/>`dokku/dokku-letsencrypt`](https://github.com/dokku/dokku-letsencrypt) | Automatic SSL certificates |
| [adnanh/webhook (<VPIcon icon="iconfont icon-github"/>`adnanh/webhook`)](https://github.com/adnanh/webhook) | GitHub webhook listener for auto-deploy |
| [<VPIcon icon="fas fa-globe"/>certbot](https://certbot.eff.org/) | SSL for non-Dokku services |
| [<VPIcon icon="iconfont icon-heroku"/>Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) | Database export and app management |
| [<VPIcon icon="iconfont icon-github"/>GitHub CLI](https://cli.github.com/) | Webhook setup and repo management |
| [<VPIcon icon="fas fa-globe"/>sslip.io](https://sslip.io/) | Free wildcard DNS for testing |
| [<VPIcon icon="iconfont icon-claude"/>Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) | CLI-based AI assistant for server management |
| [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare](https://cloudflare.com/) | Domain registration and DNS with API/MCP |

The entire migration was done over SSH with bash commands. No special server API or MCP integration was needed for the Hetzner server itself. You SSH in, run commands, and you are done. The only APIs I used were Cloudflare (for DNS), Gandi (for DNS on other domains), GitHub (for webhooks and deploy keys), and Heroku (for database export).

---

## Keeping Everything Up to Date

Setting up a server is only half the job. You also need to maintain it: install security patches, update system packages, renew certificates, and keep your application dependencies current. On Heroku, this mostly happens invisibly, though not always. You still need to manually approve [<VPIcon icon="iconfont icon-heroku"/>Heroku Stack](https://devcenter.heroku.com/articles/stack) (base image) upgrades when they roll out, and PaaS providers don't always give you the latest and greatest environment since they have to ensure compatibility and maturity across their platform. On your own server, updates are fully your responsibility, but you also get to choose exactly when and what to upgrade.

One option is to use a "managed server" from providers like Hetzner or [<VPIcon icon="fas fa-globe"/>OVH](https://ovhcloud.com/), where the hosting company handles OS updates and security patches for you. But if you are running an unmanaged dedicated server like I am, you need a maintenance strategy. The first line of defense is enabling `unattended-upgrades`, which automatically installs critical security patches daily without any manual intervention:

Enable automatic security updates

```sh
apt-get install -y unattended-upgrades
dpkg-reconfigure -f noninteractive unattended-upgrades
```

For everything beyond OS-level patches, like updating Dokku plugins, checking app health, and keeping dependencies current, you can automate with Claude Code.

[<VPIcon icon="iconfont icon-claude"/>Claude Code Scheduled Tasks](https://docs.anthropic.com/en/docs/claude-code/scheduled-tasks) solve this nicely. They allow you to automate workflows by running prompts on a recurring basis, daily, weekly, or hourly. You can set up a scheduled task that SSHes into your server, runs `apt update && apt upgrade`, checks for Dokku plugin updates, verifies that all apps are healthy, and commits the results to your infrastructure-as-docs repo. It turns server maintenance into a background process that runs on autopilot, just like the initial setup.

---

## Security Considerations

When you run multiple apps on one server, a compromised app should not be able to reach the others. Dokku runs each app in its own Docker container, which provides basic process isolation. But by default, containers still have broad Linux capabilities that an attacker could exploit. You can lock this down with a few Docker security flags that Dokku lets you set per app:

Harden a Dokku app

```sh
dokku docker-options:add my-app deploy "--cap-drop=ALL"
dokku docker-options:add my-app deploy "--cap-add=NET_BIND_SERVICE"
dokku docker-options:add my-app deploy "--security-opt=no-new-privileges"
dokku ps:rebuild my-app
```

`--cap-drop=ALL` removes all Linux capabilities from the container, so even if an attacker gets code execution, they cannot mount filesystems, modify network settings, or load kernel modules. `--cap-add=NET_BIND_SERVICE` adds back only the one capability a web app actually needs: binding to a port. `--security-opt=no-new-privileges` prevents processes inside the container from gaining elevated permissions through setuid binaries.

This is not full VM-level isolation. All containers still share the same host kernel and Docker daemon. But it significantly raises the bar for an attacker trying to move laterally from one compromised app to another.

Beyond container hardening, you should also lock down the server itself. Enable UFW (Uncomplicated Firewall) to only allow ports 22, 80, and 443, blocking everything else from the outside. Install [<VPIcon icon="iconfont icon-github"/>`fail2ban/fail2ban`](https://github.com/fail2ban/fail2ban) to automatically ban IPs that attempt SSH brute-force attacks. And if your domain is on Cloudflare, enable the proxy (orange cloud) on your DNS records to get free DDoS mitigation and hide your server's real IP address.

Server hardening basics

```sh
# Firewall: only allow SSH, HTTP, HTTPS
ufw default deny incoming
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
 
# Fail2ban: ban after 5 failed SSH attempts
apt-get install -y fail2ban
```

For personal projects and low-traffic services, these measures combined with container hardening are a practical and solid security baseline.

---

## Copy My Setup

This article is long. It involves server configuration, webhook scripts, database migrations, SSL certificates, and dozens of bash commands. I didn't write any of it. And you don't have to either. If you want to replicate this setup, just give Claude Code this article to read and tell it to set up your server the same way. It will SSH in, install Dokku, configure your domains, set up the webhook pipeline, migrate your databases, and document everything in a repo for you. The entire blueprint is right here.

If your Heroku bill is growing and your apps don't need Heroku's managed ecosystem, a dedicated server with Dokku gives you the same developer experience at a fraction of the cost.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Save $1,463 per Month Using Claude Code as My Server Admin",
  "desc": "A step-by-step guide to migrating Node.js apps written in TypeScript from Heroku to a Hetzner dedicated server with Dokku, saving hundreds of dollars per year while keeping GitHub auto-deploy and managed Postgres.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/how-i-save-money-using-claude-code-as-my-server-admin.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
