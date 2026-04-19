---
lang: en-US
title: "Chaos Testing Your TypeScript SDKs with Toxiproxy"
description: "Article(s) > Chaos Testing Your TypeScript SDKs with Toxiproxy"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Chaos Testing Your TypeScript SDKs with Toxiproxy"
    - property: og:description
      content: "Chaos Testing Your TypeScript SDKs with Toxiproxy"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/chaos-testing-your-typescript-sdks-with-toxiproxy.html
prev: /programming/js-express/articles/README.md
date: 2026-04-01
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
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
  name="Chaos Testing Your TypeScript SDKs with Toxiproxy"
  desc="Learn how to use Toxiproxy with Docker Compose to inject real network failures into your Node.js backend. Verify that your TypeScript SDK actually handles latency, timeouts, and connection resets."
  url="https://typescript.tv/testing/chaos-testing-your-typescript-sdks-with-toxiproxy"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

Learn how to use Toxiproxy with Docker Compose to inject real network failures into your Node.js backend. Verify that your TypeScript SDK actually handles latency, timeouts, and connection resets.

Every API client works when the network is fast and the server is healthy. But production networks drop packets, add latency spikes, and reset connections without warning. [<VPIcon icon="iconfont icon-github"/>`Shopify/toxiproxy`](https://github.com/Shopify/toxiproxy) from [<VPIcon icon="fa-brands fa-shopify"/>Shopify](https://shopify.com/) lets you inject real failures into a running Node.js backend so you can test what actually happens when things go wrong.

---

## The Happy Path Trap

Most developers never test network failure scenarios because they're hard to reproduce. Instead, they ship retry logic they've never actually triggered, timeout handling they've never actually observed, and error recovery they've never actually verified.

Toxiproxy solves this by sitting between your client and your server as a TCP proxy. You control it through a REST API, injecting failures on demand. Your client connects to Toxiproxy instead of the real server, and Toxiproxy forwards traffic until you tell it not to.

---

## Setting Up the Backend

Start with a minimal [<VPIcon icon="iconfont icon-expressjs"/>Express](https://expressjs.com/) server that returns user data. This is the service your client will call through Toxiproxy.

```ts title="server.ts"
import express from 'express';
 
const app = express();
 
app.get('/api/users/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Alice',
    email: 'alice@example.com',
  });
});
 
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

Package this in a Dockerfile:

```dockerfile title="Dockerfile"
FROM node:lts-slim
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY server.ts ./
RUN npx tsc
CMD ["node", "server.js"]
```

---

## Adding Toxiproxy with Docker Compose

Toxiproxy needs a configuration file that defines which backend services to proxy. Each proxy maps a listen address to an upstream server:

```json title="toxiproxy.json"
[
  {
    "name": "backend",
    "listen": "0.0.0.0:6000",
    "upstream": "backend:3000",
    "enabled": true
  }
]
```

Wire everything together in [<VPIcon icon="fa-brands fa-docker"/>Docker Compose](https://docs.docker.com/compose/):

```yaml title="docker-compose.yml"
services:
  backend:
    build: .
    ports:
      - '3000:3000'
 
  toxiproxy:
    image: ghcr.io/shopify/toxiproxy:2.12.0
    ports:
      - '6000:6000'
      - '8474:8474'
    volumes:
      - ./toxiproxy.json:/etc/toxiproxy/config.json
    command: ['-host=0.0.0.0', '-config=/etc/toxiproxy/config.json']
    depends_on:
      - backend
```

The Toxiproxy container exposes two ports that serve different purposes. Port "6000" is where your client connects. Toxiproxy listens here and forwards traffic to the real backend on port "3000", so from the client's perspective it looks like the real server.

Port "8474" is Toxiproxy's control API. You send HTTP requests here to add or remove toxics (latency, bandwidth limits, connection resets) or to enable and disable proxies entirely.

Starting the Docker services:

```sh
docker compose up
```

Hit [`localhost:6000/api/users/1`](http://localhost:6000/api/users/1) and you'll get the same response as the real backend on port 3000. The proxy is transparent until you start adding toxics.

---

## Writing the API Client

Here's a simple client with timeout and retry logic. This is the code you want to stress-test:

```ts title="client.ts"
interface User {
  id: string;
  name: string;
  email: string;
}
 
export async function fetchUser(id: string, baseUrl = 'http://localhost:6000'): Promise<User> {
  const response = await fetch(`${baseUrl}/api/users/${id}`, {
    signal: AbortSignal.timeout(5000),
  });
 
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
 
  return response.json() as Promise<User>;
}
 
export async function fetchUserWithRetry(id: string, retries = 3): Promise<User> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetchUser(id);
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`Attempt ${attempt} failed, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
 
  throw new Error('Unreachable');
}
```

The client points at port "6000" (Toxiproxy) instead of port "3000" (the real backend). It has a 5-second timeout and exponential backoff. Now let's see if those actually work.

---

## Injecting Toxics

Toxiproxy calls its failure modes "toxics." You add them through the REST API. Each toxic attaches to a proxy and modifies traffic passing through it.

### Adding Latency

Add 3 seconds of latency to every response:

```sh
curl -X POST http://localhost:8474/proxies/backend/toxics \
-H "Content-Type: application/json" \
-d '{
  "name": "latency_downstream",
  "type": "latency",
  "attributes": { "latency": 3000, "jitter": 500 }
}'
```

The `jitter` attribute adds randomness, so latency varies between 2500ms and 3500ms per request. This is closer to real-world behavior than a fixed delay.

### Simulating a Timeout

Add enough latency to exceed your client's timeout:

```sh
curl -X POST http://localhost:8474/proxies/backend/toxics \
-H "Content-Type: application/json" \
-d '{
  "name": "timeout_downstream",
  "type": "latency",
  "attributes": { "latency": 10000 }
}'
```

Your client has a 5-second timeout, so a 10-second delay will trigger it. This is how you verify that your `AbortSignal.timeout` actually aborts the request instead of hanging forever.

### Severing the Connection

Disable the proxy entirely to simulate a complete outage:

```sh
curl -X POST http://localhost:8474/proxies/backend \
-H "Content-Type: application/json" \
-d '{
  "name": "backend",
  "listen": "0.0.0.0:6000",
  "upstream": "backend:3000",
  "enabled": false
}'
```

This is the most brutal test. The connection is refused immediately. Re-enable it to verify your retry logic recovers:

```sh
curl -X POST http://localhost:8474/proxies/backend \
-H "Content-Type: application/json" \
-d '{
  "name": "backend",
  "listen": "0.0.0.0:6000",
  "upstream": "backend:3000",
  "enabled": true
}'
```

### Limiting Bandwidth

Throttle the connection to 1 KB/s to simulate a degraded network:

```sh
curl -X POST http://localhost:8474/proxies/backend/toxics \
-H "Content-Type: application/json" \
-d '{
  "name": "bandwidth_downstream",
  "type": "bandwidth",
  "attributes": { "rate": 1 }
}'
```

This is particularly useful for testing file uploads, streaming responses, or any endpoint that transfers more than a few bytes.

### Removing a Toxic

Remove a specific toxic by name:

```sh
curl -X DELETE http://localhost:8474/proxies/backend/toxics/latency_downstream
```

The proxy itself stays up. Only the injected failure is removed.

---

## Automating It in Tests

The real power of Toxiproxy is using it programmatically in your test suite. Here's how to drive it from [<VPIcon icon="fas fa-globe"/>Vitest](https://vitest.dev/):

```ts :collapsed-liens title="client.test.ts"
import { describe, it, expect, afterEach } from 'vitest';
import { fetchUser, fetchUserWithRetry } from './client';
 
const TOXIPROXY_API = 'http://localhost:8474';
const PROXY_NAME = 'backend';
 
async function addToxic(toxic: Record<string, unknown>) {
  const res = await fetch(`${TOXIPROXY_API}/proxies/${PROXY_NAME}/toxics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toxic),
  });
  if (!res.ok) throw new Error(`Failed to add toxic: ${await res.text()}`);
}
 
async function removeToxic(name: string) {
  await fetch(`${TOXIPROXY_API}/proxies/${PROXY_NAME}/toxics/${name}`, {
    method: 'DELETE',
  });
}
 
async function setProxyEnabled(enabled: boolean) {
  const res = await fetch(`${TOXIPROXY_API}/proxies/${PROXY_NAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: PROXY_NAME,
      listen: '0.0.0.0:6000',
      upstream: 'backend:3000',
      enabled,
    }),
  });
  if (!res.ok) throw new Error(`Failed to toggle proxy: ${await res.text()}`);
}
 
afterEach(async () => {
  await setProxyEnabled(true);
});
 
describe('API client resilience', () => {
  it('handles healthy responses', async () => {
    const user = await fetchUser('1');
    expect(user.name).toBe('Alice');
  });
 
  it('times out on slow responses', async () => {
    await addToxic({
      name: 'slow',
      type: 'latency',
      attributes: { latency: 10000 },
    });
 
    await expect(fetchUser('1')).rejects.toThrow();
    await removeToxic('slow');
  });
 
  it('retries on connection failure', async () => {
    await setProxyEnabled(false);
 
    const result = fetchUserWithRetry('1', 3);
 
    // Re-enable after 2 seconds so the second retry succeeds
    setTimeout(() => setProxyEnabled(true), 2000);
 
    const user = await result;
    expect(user.name).toBe('Alice');
  });
 
  it('fails after exhausting retries', async () => {
    await setProxyEnabled(false);
    await expect(fetchUserWithRetry('1', 2)).rejects.toThrow();
  });
});
```

Each test injects a specific failure, asserts your client handles it correctly, and cleans up afterward. The `afterEach` hook re-enables the proxy so a failing test doesn't break subsequent ones.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Chaos Testing Your TypeScript SDKs with Toxiproxy",
  "desc": "Learn how to use Toxiproxy with Docker Compose to inject real network failures into your Node.js backend. Verify that your TypeScript SDK actually handles latency, timeouts, and connection resets.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/chaos-testing-your-typescript-sdks-with-toxiproxy.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
