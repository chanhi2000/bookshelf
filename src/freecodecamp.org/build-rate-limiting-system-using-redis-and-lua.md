---
lang: en-US
title: "How to Build a Distributed Rate Limiting System Using Redis and Lua Scripts"
description: "Article(s) > How to Build a Distributed Rate Limiting System Using Redis and Lua Scripts"
icon: fa-brands fa-node
category:
  - Node.js
  - Lua
  - Redis
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - lua
  - redis
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Distributed Rate Limiting System Using Redis and Lua Scripts"
    - property: og:description
      content: "How to Build a Distributed Rate Limiting System Using Redis and Lua Scripts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-rate-limiting-system-using-redis-and-lua.html
prev: /prgramming/js-node/articles/README.md
date: 2024-11-20
isOriginal: false
author: Birks Sachdev
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/CGWK6k2RduY/upload/a5ac857cec1d18720a060fc5e3462cf3.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/prgramming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Lua > Article(s)",
  "desc": "Article(s)",
  "link": "/prgramming/lua/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Redis > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/redis/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Distributed Rate Limiting System Using Redis and Lua Scripts"
  desc="In this comprehensive guide, you’ll build a distributed rate limiter using Redis and Lua scripting to control user requests in a high-traffic environment. Rate limiting is crucial in any system to prevent abuse, manage traffic, and protect your resou..."
  url="https://freecodecamp.org/news/build-rate-limiting-system-using-redis-and-lua"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/CGWK6k2RduY/upload/a5ac857cec1d18720a060fc5e3462cf3.jpeg"/>

In this comprehensive guide, you’ll build a distributed rate limiter using Redis and Lua scripting to control user requests in a high-traffic environment.

Rate limiting is crucial in any system to prevent abuse, manage traffic, and protect your resources. By leveraging Redis and Lua, you'll build an efficient, scalable rate limiting system that can handle a large number of requests while keeping your backend services safe.

We will also include an interactive demo where users can simulate traffic, observe rate limits being enforced, and view logs of blocked requests.

---

## What You Will Learn

- How to build a rate limiting system using Redis.
- How to use Lua scripts with Redis to achieve atomic operations.
- Understanding Redis data structures for efficient request tracking.
- Techniques for handling high traffic in a distributed system.
- Using Docker to simulate and scale a distributed rate limiter.

::: note Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v14 or higher)
- Redis
- Docker (for simulating a distributed environment)
- Basic understanding of Node.js, Redis, and Lua scripting.

:::

---

## Project Overview

In this tutorial, you will:

1. Build a rate limiter using Redis and Lua to enforce request quotas.
2. Use Lua scripts to ensure atomic operations, avoiding race conditions.
3. Implement a token bucket algorithm for rate limiting.
4. Create an interactive demo to simulate high traffic and visualize rate limiting in action.

### System Architecture

You'll build the system with the following components:

1. **API Server**: Handles incoming user requests.
2. **Redis**: Stores request data and enforces rate limits.
3. **Lua Scripts**: Ensures atomic updates to Redis for rate limiting.
4. **Docker**: Simulates a distributed environment with multiple instances.

---

## Step 1: How to Set Up the Project

Let's start by setting up our Node.js project:

```sh
mkdir distributed-rate-limiter
cd distributed-rate-limiter
npm init -y
```

Next, install the required dependencies:

```sh
npm install express redis dotenv
```

- **express**: A lightweight web server framework.
- **redis**: For interacting with Redis.
- **dotenv**: For managing environment variables.

Create a <FontIcon icon="fas fa-file-lines"/>`.env` file with the following content:

```properties title=".env"
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=3000
RATE_LIMIT=5
TIME_WINDOW=60
```

These variables define the Redis host, port, rate limit (number of allowed requests), and the time window (in seconds).

---

## Step 2: How to Set Up Redis

Before we dive into the code, ensure that Redis is installed and running on your system. If you don’t have Redis installed, you can use Docker to quickly set it up:

```sh
docker run -p 6379:6379 \
--name redis-rate-limiter \
-d redis
```

---

## Step 3: How to Implement the Rate Limiter with Redis and Lua

To efficiently handle rate limiting, we'll use a token bucket algorithm. In this algorithm:

1. Each user has a “bucket” of tokens.
2. Each request consumes a token.
3. Tokens refill periodically at a set rate.

To ensure atomicity and avoid race conditions, we'll use Lua scripting with Redis. Lua scripts in Redis execute atomically, which means they can’t be interrupted by other operations while running.

### How to Create a Lua Script for Rate Limiting

Create a file called <FontIcon icon="iconfont icon-lua"/>`rate_limiter.lua`:

```lua title="rate_limiter.lua"
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local current = redis.call("get", key)

if current and tonumber(current) >= limit then
    return 0
else
    if current then
        redis.call("incr", key)
    else
        redis.call("set", key, 1, "EX", window)
    end
    return 1
end
```

1. **Inputs**:
    - `KEYS[1]`: The Redis key representing the user’s request count.
    - `ARGV[1]`: The rate limit (maximum number of allowed requests).
    - `ARGV[2]`: The time window (in seconds) for the rate limit.
2. **Logic**:
    - If the user has reached the rate limit, return `0` (request blocked).
    - If the user is within the limit, increment their request count or set a new count with an expiration if it's the first request.
    - Return 1 (request allowed).

---

## Step 4: How to Create the Node.js API Server

Create a file called <FontIcon icon="fa-brands fa-js"/>`server.js`:

```js :collapsed-lines stitle="server.js"
require('dotenv').config();
const express = require('express');
const redis = require('redis');
const fs = require('fs');
const path = require('path');

const app = express();
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const rateLimitScript = fs.readFileSync(path.join(__dirname, 'rate_limiter.lua'), 'utf8');

const RATE_LIMIT = parseInt(process.env.RATE_LIMIT);
const TIME_WINDOW = parseInt(process.env.TIME_WINDOW);

// Middleware for rate limiting
async function rateLimiter(req, res, next) {
  const ip = req.ip;
  try {
    const allowed = await client.eval(rateLimitScript, 1, ip, RATE_LIMIT, TIME_WINDOW);
    if (allowed === 1) {
      next();
    } else {
      res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }
  } catch (err) {
    console.error('Error in rate limiter:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

app.use(rateLimiter);

app.get('/', (req, res) => {
  res.send('Welcome to the Rate Limited API!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

1. **Rate Limiter Middleware**:
    - Retrieves the client's IP address and checks if they are within the rate limit using the Lua script.
    - If the user exceeds the limit, a `429` response is sent.
2. **API Endpoint**:
    - The root endpoint is rate-limited, so users can only access it a limited number of times within the specified window.

---

## Step 5: How to Test the Rate Limiter

::: tabs

@tab:active 1.

Start Redis

```sh
docker start redis-rate-limiter
```

@tab 2.

Run the Node.js Server

```sh
node server.js
```

@tab 3.

Simulate Requests

- Use `curl` or Postman to test the rate limiter:

```sh
curl http://localhost:3000
```

- Send multiple requests rapidly to see rate limiting in action.

:::

---

## Step 6: How to Visualize Rate Limiting Metrics

To monitor rate limiting metrics like cache hits and blocked requests, we'll add logging to the middleware in <FontIcon icon="fa-brands fa-js"/>`server.js`:

```js :collapsed-lines title="server.js"
async function rateLimiter(req, res, next) {
  const ip = req.ip;
  try {
    const allowed = await client.eval(rateLimitScript, 1, ip, RATE_LIMIT, TIME_WINDOW);
    if (allowed === 1) {
      console.log(`Allowed request from ${ip}`);
      next();
    } else {
      console.log(`Blocked request from ${ip}`);
      res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }
  } catch (err) {
    console.error('Error in rate limiter:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
```

---

## Step 7: How to Deploy with Docker

Let’s containerize the application to run it in a distributed environment.

Create a <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`:

```dockerfile title="Dockerfile"
FROM node:14
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and Run the Docker Container:

```sh
docker build -t rate-limiter .
docker run -p 3000:3000 rate-limiter
```

Now you can scale the rate limiter by running multiple instances.

---

## Conclusion: What You’ve Learned

Congratulations! You’ve successfully built a distributed rate limiter using Redis and Lua scripts. Throughout this tutorial, you’ve learned how to:

1. Implement rate limiting to control user requests in a distributed system.
2. Use Lua scripts in Redis to perform atomic operations.
3. Apply a token bucket algorithm to manage request quotas.
4. Monitor rate limiting metrics to optimize performance.
5. Use Docker to simulate a scalable distributed environment.

### Next Steps

1. **Add Rate Limiting by User ID**: Extend the system to support rate limits per user.
2. **Integrate with Nginx**: Use Nginx as a reverse proxy with Redis-backed rate limiting.
3. **Deploy with Kubernetes**: Scale your rate limiter using Kubernetes for high availability.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Distributed Rate Limiting System Using Redis and Lua Scripts",
  "desc": "In this comprehensive guide, you’ll build a distributed rate limiter using Redis and Lua scripting to control user requests in a high-traffic environment. Rate limiting is crucial in any system to prevent abuse, manage traffic, and protect your resou...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-rate-limiting-system-using-redis-and-lua.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
