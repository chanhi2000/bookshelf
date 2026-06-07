---
lang: en-US
title: "How to Build a Self-Hosted WhatsApp Bot with n8n and WAHA"
description: "Article(s) > How to Build a Self-Hosted WhatsApp Bot with n8n and WAHA"
icon: iconfont icon-n8n
category:
  - Node.js
  - n8n
  - DevOps
  - Docker
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - devops
  - docker
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Self-Hosted WhatsApp Bot with n8n and WAHA"
    - property: og:description
      content: "How to Build a Self-Hosted WhatsApp Bot with n8n and WAHA"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-self-hosted-whatsapp-bot-with-n8n-and-waha.html
prev: /programming/js-n8n/articles/README.md
date: 2026-05-11
isOriginal: false
author:
  - name: אחיה כהן
    url: https://freecodecamp.org/news/author/achiya-automation/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/28affe4d-9359-4cbb-a311-a2ee9d0829c0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "n8n > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-n8n/articles/README.md",
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Self-Hosted WhatsApp Bot with n8n and WAHA"
  desc="WhatsApp is where your many of your customers likely already are. For support tickets, order updates, booking reminders, and lead qualification, a WhatsApp channel often converts several times better "
  url="https://freecodecamp.org/news/how-to-build-a-self-hosted-whatsapp-bot-with-n8n-and-waha"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/28affe4d-9359-4cbb-a311-a2ee9d0829c0.png"/>

WhatsApp is where your many of your customers likely already are. For support tickets, order updates, booking reminders, and lead qualification, a WhatsApp channel often converts several times better than email.

But the official WhatsApp Business Cloud API can be slow to onboard, template-restricted for proactive messages, and priced per conversation — which adds up fast at scale.

There's another path: you can run your own WhatsApp HTTP gateway on a small server, connect it to a workflow engine, and keep every message — inbound and outbound — inside infrastructure you control. No monthly conversation fees, no template approvals for routine replies, no third-party middleman holding your customer data.

In this tutorial, you'll build exactly that. By the end, you'll have a WhatsApp bot that:

- Receives every incoming message through a webhook
- Routes messages through an n8n workflow
- Replies automatically based on keywords, AI, or any API call you want
- Runs entirely on your own server, using two open-source tools

You'll use **WAHA** (WhatsApp HTTP API) as the gateway, and **n8n** as the workflow engine. Both run in Docker, both are free for self-hosting, and together they cover everything from a simple auto-reply to a full CRM integration.

::: info What You'll Learn

- How WAHA works under the hood and when to use it instead of the official Cloud API
- How to run WAHA and n8n side by side with Docker Compose
- How to scan the QR code and bind a WhatsApp account to your gateway
- How to connect WAHA's webhook to an n8n workflow
- How to build a keyword-based auto-reply bot
- How to send proactive confirmations from a separate workflow
- How to harden the setup for production (HTTPS, API keys, rate limits, Queue Mode)

:::

::: note Prerequisites

- A Linux server (any VPS works — 2 GB of RAM is enough for a small bot)
- Docker and Docker Compose installed
- A public hostname with DNS pointing at the server, or an ngrok tunnel for local testing
- A WhatsApp account you're willing to dedicate to the bot (more on that below)
- Basic familiarity with JSON and HTTP requests

:::

You don't need prior n8n experience. If you can drag a box and wire it to another box, you can build the flow.

---

## A Note on Which WhatsApp Account to Use

WAHA works by running an actual WhatsApp Web session inside a headless Chromium process. It logs in as a real account — the same way you would open web.whatsapp.com in your browser. Meta doesn't officially endorse this approach for commercial use at scale, and heavy volume from a single number can lead to a ban.

For that reason, use a dedicated number for the bot. Don't use your personal WhatsApp. Get a second SIM, eSIM, or a VoIP number that supports WhatsApp activation. Keep outbound volume reasonable, and you'll be fine for most small-business use cases.

If you plan to send thousands of marketing messages per day, switch to the official WhatsApp Business Cloud API — that's what it exists for. This tutorial is aimed at the middle ground: support bots, order updates, booking confirmations, and similar conversational flows where you need real-time control without enterprise pricing.

---

## WAHA vs the official WhatsApp Business Cloud API

Before writing any code, it helps to understand when each option is the right fit.

| Dimension | WAHA (self-hosted) | WhatsApp Cloud API (Meta) |
| --- | --- | --- |
| Onboarding | Scan a QR code — ready in minutes | Business verification, app review — days to weeks |
| Cost | Server cost only | Per-conversation pricing |
| Template approval | Not needed | Required for proactive messages outside the 24-hour window |
| Session model | One WhatsApp Web session per Core container | Native API, no web session |
| Risk | Account ban possible at high unsolicited volume | Rate limits but no ban for normal use |
| Vendor lock-in | None — pure open source | Tied to Meta's API and pricing |
| Best for | Support bots, small-team workflows, internal tools | High-volume marketing, regulated industries, >100k monthly messages |

Neither is strictly better. If you run a support team for a small business, WAHA is often the pragmatic choice. If you're a bank sending millions of transactional messages, you want the Cloud API. Many teams run both — WAHA for conversational support, Cloud API for bulk transactional traffic.

---

## Part 1: Understanding WAHA

WAHA is an open-source project that wraps WhatsApp Web behind a clean REST API. You `POST /api/sendText` with a chat ID and a message, and WAHA sends it. You configure a webhook URL, and WAHA `POST`s to that URL every time a message arrives.

Under the hood, WAHA spawns a Chromium instance, opens WhatsApp Web, and uses an engine (<VPIcon icon="fa-brands fa-js"/>`whatsapp-web.js`, `NOWEB`, or `GOWS`) to automate the session. Your code doesn't see any of that complexity — you just see an HTTP API.

The project ships in two flavors:

- **WAHA Core** — free, MIT licensed, one active session per container, community support.
- **WAHA Plus** — commercial license, multi-session support, priority support, and access to advanced endpoints.

For most developers building a single bot, Core is enough. You can always upgrade later.

Official docs live at [<VPIcon icon="fas fa-globd"/>waha.devlike.pro](https://waha.devlike.pro/). Keep that open in another tab — we'll reference specific endpoints as we go.

---

## Part 2: Running WAHA with Docker

Create a fresh directory for the project:

```sh
mkdir whatsapp-bot && cd whatsapp-bot
```

Create a <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file:

```yaml title="docker-compose.yml"
services:
  waha:
    image: devlikeapro/waha:latest
    container_name: waha
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - WAHA_DASHBOARD_ENABLED=true
      - WAHA_DASHBOARD_USERNAME=admin
      - WAHA_DASHBOARD_PASSWORD=change-me-now
      - WHATSAPP_API_KEY=super-secret-key-change-me
      - WHATSAPP_DEFAULT_ENGINE=WEBJS
    volumes:
      - ./waha-sessions:/app/.sessions
```

A few things to notice:

- The dashboard username and password protect the web UI at `http://your-server:3000`. Always change the defaults before you expose the port publicly.
- `WHATSAPP_API_KEY` is the key every HTTP request to WAHA must include in the `X-Api-Key` header. Treat it like a database password.
- `WHATSAPP_DEFAULT_ENGINE=WEBJS` uses the mature `whatsapp-web.js` engine. WAHA also supports `NOWEB` and `GOWS` engines with different trade-offs — WEBJS is the safest default for a first deployment.
- The volume mount persists the session across restarts. Without it, every container rebuild forces you to scan the QR code again.

Start the container:

```sh
docker compose up -d
docker compose logs -f waha
```

Within about 20 seconds WAHA finishes booting. Visit `http://your-server:3000` and log in with the dashboard credentials.

---

## Part 3: Starting a WhatsApp session

WAHA calls each WhatsApp account a "session." You can have one session at a time on WAHA Core.

From the dashboard, click **Start New Session** and name it `default`. WAHA displays a QR code.

On your phone:

1. Open WhatsApp.
2. Tap the three-dot menu (Android) or Settings (iOS).
3. Tap Linked Devices → Link a Device.
4. Point the camera at the QR code on your screen.

Within a few seconds the dashboard shows `WORKING` status. Your session is live.

You can also do this over the API. Start the session (`default` is the session name, encoded in the URL path):

```sh
curl -X POST http://your-server:3000/api/sessions/default/start \
-H "X-Api-Key: super-secret-key-change-me"
```

The call is idempotent — if the session is already running, nothing happens.

Fetch the QR as a PNG:

```sh
curl http://your-server:3000/api/default/auth/qr \
-H "X-Api-Key: super-secret-key-change-me" \
-H "Accept: image/png" \
--output qr.png
```

Scan and you're in.

Test that the session works by sending a message to yourself:

```sh
curl -X POST http://your-server:3000/api/sendText \
-H "X-Api-Key: super-secret-key-change-me" \
-H "Content-Type: application/json" \
-d '{
  "session": "default",
  "chatId": "15555550123@c.us",
  "text": "Hello from WAHA!"
}'
```

Replace `15555550123` with your own number (country code plus number, no `+`, no spaces, no dashes). The `@c.us` suffix marks it as an individual chat. Groups use `@g.us`.

If the message lands on your phone — congratulations. The gateway works.

---

## Part 4: Running n8n

Add an `n8n` service to your <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` alongside WAHA:

```yaml title="docker-compose.yml"
services:
  waha:
    # ... existing config

  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=n8n.example.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n.example.com/
      - GENERIC_TIMEZONE=UTC
    volumes:
      - ./n8n-data:/home/node/.n8n
```

Replace `n8n.example.com` with your real domain. For purely local testing, set:

```yaml
environment:
  - N8N_HOST=localhost
  - N8N_PROTOCOL=http
  - WEBHOOK_URL=http://localhost:5678/
```

If you want to test webhooks from your laptop without a server, run `ngrok http 5678` in another terminal and use the ngrok HTTPS URL as `WEBHOOK_URL`. n8n uses `WEBHOOK_URL` to tell external services where to POST — get this wrong and your webhooks will 404. Start the stack:

```sh
docker compose up -d
```

Visit `http://your-server:5678`. On the first visit, n8n walks you through creating an owner account (email and password). Every subsequent visit requires that login. For extra safety in production, put n8n behind a reverse proxy with an allow-list or an additional auth layer — we'll set that up later.

---

## Part 5: Creating the Webhook Trigger in n8n

Click Create Workflow. You'll see an empty canvas.

Add a Webhook node and configure it:

- **HTTP Method**: POST
- **Path**: `whatsapp` (this becomes part of the URL)
- **Response Mode**: Respond Immediately
- **Response Data**: First Entry JSON

Click Listen for Test Event. n8n shows you two URLs: a test URL and a production URL. Copy the production URL. It looks like this:

```plaintext
https://n8n.example.com/webhook/whatsapp
```

Not `webhook-test` — that one only fires while the editor is open. You want `webhook`.

---

## Part 6: Wiring WAHA to n8n

WAHA can POST to a webhook on every WhatsApp event. Tell it where to send those events.

In the WAHA dashboard, open your session and set the webhook URL. Or do it over the API:

```sh
curl -X PUT http://your-server:3000/api/sessions/default \
-H "X-Api-Key: super-secret-key-change-me" \
-H "Content-Type: application/json" \
-d '{
  "config": {
    "webhooks": [
      {
        "url": "https://n8n.example.com/webhook/whatsapp",
        "events": ["message", "session.status"]
      }
    ]
  }
}'
```

The `message` event fires on every inbound message. `session.status` fires when the session connects, disconnects, or reconnects — which is useful for alerting when your bot goes down.

Test it. From another phone, send a WhatsApp message to your bot's number. Head back to the n8n editor. Within a second or two the webhook node lights up with the event data.

The payload looks roughly like this:

```json
{
  "event": "message",
  "session": "default",
  "payload": {
    "id": "false_15555550123@c.us_3EB0...",
    "from": "15555550123@c.us",
    "body": "Hello",
    "timestamp": 1713801234,
    "fromMe": false
  }
}
```

Everything you need is in `payload`: who sent it (`from`), what they said (`body`), and when (`timestamp`).

---

## Part 7: Building the first auto-reply

A bot that only listens is boring. Let's make it answer.

You'll build a tiny keyword router: if the user sends `hi` or `hello`, the bot greets them. If they send `price`, it sends a pricing message. Anything else gets a fallback.

After the Webhook node, add a Switch node.

Configure the Switch node:

- **Mode**: Expression
- **Value**: `{{ $json.payload.body.toLowerCase().trim() }}`
- Add routing rules:
  - Rule 1: equals `hi` — output 0
  - Rule 2: equals `hello` — output 0
  - Rule 3: equals `price` — output 1
  - Fallback output: 2

After the Switch, add three HTTP Request nodes, one per output.

Configure each HTTP Request node identically, except for the body text:

- **Method**: POST
- **URL**: `http://waha:3000/api/sendText` (inside the Docker network you can reach WAHA by its service name. From outside use the full public URL)
- **Send Headers**: on
  - `X-Api-Key`: `super-secret-key-change-me`
  - `Content-Type`: `application/json`
- **Send Body**: on
  - **Body Content Type**: JSON
  - **Specify Body**: Using JSON

For the greeting node, the JSON body is:

```json
{
  "session": "default",
  "chatId": "={{ $('Webhook').item.json.payload.from }}",
  "text": "Hi! I'm the bot. Send 'price' to see pricing, or anything else for help."
}
```

For the pricing node:

```json
{
  "session": "default",
  "chatId": "={{ $('Webhook').item.json.payload.from }}",
  "text": "Our plans start at $49/month. Reply 'sales' to talk to a human."
}
```

For the fallback:

```json
{
  "session": "default",
  "chatId": "={{ $('Webhook').item.json.payload.from }}",
  "text": "I didn't catch that. Try 'hi' or 'price'."
}
```

The `={{ ... }}` syntax is an n8n expression — at runtime it pulls values from earlier nodes.

Connect the Switch outputs to their matching HTTP Request nodes. Save the workflow. Click Activate in the top-right.

Send `hi` to your bot from any phone. It should reply within a second.

Congratulations — you have a WhatsApp bot running entirely on your own infrastructure.

---

## Part 8: A Second Example — Proactive Booking Confirmations

Auto-reply is useful. Proactive outbound is where the value really compounds. Here's a second workflow that sends a booking confirmation whenever a new row lands in a database.

Create a second workflow in n8n. Use one of these triggers:

- **Schedule Trigger** — poll a database every minute for new rows
- **Webhook Trigger** — listen for a notification from your booking system
- **Database Trigger** (Postgres, MySQL, Supabase) — react to inserts in real time

For this example, use a Schedule Trigger set to every minute, followed by a Postgres **Execute Query** node that reads pending confirmations:

```sql
SELECT id, customer_phone, service_name, booking_time
FROM bookings
WHERE confirmation_sent = false
LIMIT 20;
```

After the Postgres node, add an HTTP Request node pointing to the same WAHA `sendText` endpoint you used earlier. The body:

```json
{
  "session": "default",
  "chatId": "={{ $json.customer_phone }}@c.us",
  "text": "Hi! Your booking for {{ \(json.service_name }} on {{ \)json.booking_time }} is confirmed. Reply 'change' to reschedule."
}
```

Finally, add a second Postgres node that marks the booking as sent:

```sql
UPDATE bookings
SET confirmation_sent = true, confirmation_sent_at = NOW()
WHERE id = {{ $json.id }};
```

Activate the workflow. Every minute, n8n pulls pending bookings, sends a WhatsApp confirmation, and marks them done.

This pattern generalizes. Replace the SQL with a call to Shopify for order confirmations, Stripe for receipt messages, or Calendly for appointment reminders. The WhatsApp layer stays the same — only the source of truth changes.

---

## Part 9: Going to Production

The setup above works, but it's not yet production-ready. Here's what to harden before you point real customers at it.

### 1. Put Everything Behind HTTPS

Never expose n8n or WAHA directly on plain HTTP. Put a reverse proxy in front. Caddy is the easiest choice because it handles Let's Encrypt automatically.

A minimal <VPIcon icon="fas fa-file-lines"/>`Caddyfile`:

```conf title="Caddyfile"
n8n.example.com {
    reverse_proxy n8n:5678
}

waha.example.com {
    reverse_proxy waha:3000
}
```

Run Caddy as another service in the same Docker Compose. TLS certificates are issued and renewed automatically.

### 2. Rotate the API Keys

Don't ship `super-secret-key-change-me` to production. Generate a real key:

```sh
openssl rand -hex 32
```

Put it in a `.env` file, reference it as `${WHATSAPP_API_KEY}` in `docker-compose.yml`, and add `.env` to your `.gitignore`.

### 3. Rate-limit Outbound Messages

WhatsApp bans accounts that send too many messages too fast. A safe outbound rate for a fresh number is well under 20 messages per minute. For bursty replies, add an n8n Wait node between sends, or queue outgoing messages through a small custom function node that sleeps between requests.

### 4. Scale n8n with Queue Mode

By default, n8n runs everything in a single process. That's fine for low volume. For higher throughput, switch to Queue Mode:

- Add a Redis container.
- Run one `n8n` main container (the web UI and webhook receiver).
- Run one or more `n8n-worker` containers that pull jobs from the queue.

Queue Mode is documented at [<VPIcon icon="iconfont icon-n8n"/>docs.n8n.io/hosting/scaling/queue-mode/](https://docs.n8n.io/hosting/scaling/queue-mode/). Setup adds two environment variables (`EXECUTIONS_MODE=queue`, `QUEUE_BULL_REDIS_HOST=redis`) and decouples incoming webhooks from workflow execution. The webhook responds in milliseconds while workers chew through the queue in the background.

### 5. Monitor the Session

WhatsApp Web sessions drop. The phone loses connection, WhatsApp rotates security tokens, or your server reboots. Catch those drops early.

Subscribe to the `session.status` webhook event in WAHA. When status becomes `FAILED` or `STOPPED`, route it to an n8n workflow that posts to Slack, sends an email, or pages you. The faster you know, the faster you recover.

For overall uptime, point something like Uptime Kuma at `GET /api/sessions/default` on WAHA. If WAHA reports `WORKING`, you're fine. Anything else triggers an alert.

### 6. Back Up the Sessions Volume

The `waha-sessions` directory contains the logged-in state. If you lose it, you have to scan the QR code again — possibly from a phone that's no longer handy. Back it up nightly. A simple cron job with `tar` and `rclone` to S3-compatible storage is plenty.

### 7. Add a Live-Agent Handoff

Not every conversation should stay with the bot. When a user types `human` — or when your intent classifier can't answer confidently — hand off to a real agent.

Chatwoot is a solid open-source option: it has a dedicated WhatsApp channel, agent inbox, team assignment, and conversation history. The handoff is an n8n branch that stops processing bot replies and forwards the message stream to Chatwoot's API.

---

## Common Pitfalls

A few issues catch almost everyone on their first production deploy.

### Webhooks Timing Out

WAHA gives your webhook a few seconds to respond. If your n8n workflow is slow (calling an LLM, hitting a remote API), the webhook times out and WAHA retries, potentially causing duplicate replies.

Fix: make the webhook return `200` immediately and offload the slow work. In n8n, set the Webhook node's Response Mode to *Using Respond to Webhook Node*, add a Respond to Webhook node as the first step with a `200` and empty body, then do the heavy lifting after that.

### Duplicate Messages

WAHA delivers the same `message` event more than once in edge cases (phone comes back online, session reconnects). Store the `payload.id` somewhere — Redis, a database, or n8n's static data store — and drop any ID you've already processed.

### Messages Arriving Out of Order

The webhook is async, and n8n may parallelize executions. If ordering matters — for example, in a multi-step conversation — key a queue by the sender's `chatId` and process each sender serially.

### Sessions Disconnecting After a Phone Restart

Normal WhatsApp Web behavior. WAHA auto-reconnects, but occasionally the linked-devices list needs a manual refresh. If a session refuses to come back, stop the WAHA container, delete that session's folder under `waha-sessions/`, start the container again, and rescan the QR.

### Your Number Gets Banned

The single biggest cause is rate: a new number blasting hundreds of messages an hour gets flagged fast. Warm up a number slowly — send a normal, human-like volume for the first week. Don't send to strangers unsolicited. Prefer inbound-driven replies over outbound pushes wherever you can.

### The Wrong Chat ID Format

WhatsApp individual chats use `<number>@c.us` and groups use `<groupId>@g.us`. Don't include the `+` or spaces in the number. If WAHA returns a 404 when sending, the chat ID is almost always the problem.

---

## Where to Go Next

You now have the foundation. The same two-service stack supports almost any bot you can imagine — you're only limited by what you can build in an n8n workflow.

Some natural next steps:

- **Plug in AI replies:** Add an OpenAI or Anthropic node after the Webhook, pass the user's message through it with a short system prompt, and send the response back through WAHA. Cap conversation length to prevent runaway token usage.
- **Integrate a CRM:** Look up the caller's `chatId` in HubSpot, Pipedrive, or your own database before deciding how to reply. Segment responses by customer tier.
- **Send proactive notifications:** Appointment reminders, shipping updates, payment receipts, abandoned-cart nudges. Keep the content transactional and expected — unsolicited marketing blasts are the fastest way to a ban.
- **Log every conversation:** Add a Postgres or Supabase node after the Webhook to persist messages for analytics and customer history. Your future self (and your support team) will thank you.
- **Add media handling:** WAHA exposes `sendImage`, `sendFile`, and `sendVoice` endpoints. Teach the bot to accept photos for support tickets, or send invoices as PDFs directly inside the chat.

The WhatsApp layer stays the same. Everything interesting happens upstream in the workflow.

::: info

If you want to see production examples of n8n and WAHA running at scale — or you need a similar automation built for your business — I'm the founder of Achiya Automation, where we ship WhatsApp, n8n, and Chatwoot integrations. You can find more at [<VPIcon icon="fas fa-globe"/>achiya-automation.com](https://achiya-automation.com).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Self-Hosted WhatsApp Bot with n8n and WAHA",
  "desc": "WhatsApp is where your many of your customers likely already are. For support tickets, order updates, booking reminders, and lead qualification, a WhatsApp channel often converts several times better ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-self-hosted-whatsapp-bot-with-n8n-and-waha.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
