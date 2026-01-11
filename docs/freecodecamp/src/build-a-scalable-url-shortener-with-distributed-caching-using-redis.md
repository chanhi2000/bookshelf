---
lang: en-US
title: "How to Build a Scalable URL Shortener with Distributed Caching Using Redis"
description: "Article(s) > How to Build a Scalable URL Shortener with Distributed Caching Using Redis"
icon: fa-brands fa-node
category:
  - Node.js
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
  - redis
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Scalable URL Shortener with Distributed Caching Using Redis"
    - property: og:description
      content: "How to Build a Scalable URL Shortener with Distributed Caching Using Redis"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-scalable-url-shortener-with-distributed-caching-using-redis.html
prev: /programming/js-node/articles/README.md
date: 2024-11-20
isOriginal: false
author: Birks Sachdev
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/b9-odQi5oDo/upload/934c8b697ce5ce612a217d47ddf5430d.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
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
  name="How to Build a Scalable URL Shortener with Distributed Caching Using Redis"
  desc="In this tutorial, we'll build a scalable URL shortening service using Node.js and Redis. This service will leverage distributed caching to handle high traffic efficiently, reduce latency, and scale seamlessly. We'll explore key concepts such as consi..."
  url="https://freecodecamp.org/news/build-a-scalable-url-shortener-with-distributed-caching-using-redis"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/b9-odQi5oDo/upload/934c8b697ce5ce612a217d47ddf5430d.jpeg"/>

In this tutorial, we'll build a scalable URL shortening service using Node.js and Redis. This service will leverage distributed caching to handle high traffic efficiently, reduce latency, and scale seamlessly. We'll explore key concepts such as consistent hashing, cache invalidation strategies, and sharding to ensure the system remains fast and reliable.

By the end of this guide, you'll have a fully functional URL shortener service that uses distributed caching to optimize performance. We'll also create an interactive demo where users can input URLs and see real-time metrics like cache hits and misses.

---

## What You Will Learn

- How to build a URL shortener service using **Node.js** and **Redis**.
- How to implement **distributed caching** to optimize performance.
- Understanding **consistent hashing** and **cache invalidation strategies**.
- Using **Docker** to simulate multiple Redis instances for sharding and scaling.

::: note Prerequisites

Before starting, make sure you have the following installed:

- Node.js (v14 or higher)
- Redis
- Docker
- Basic knowledge of JavaScript, Node.js, and Redis.

:::

---

## Project Overview

We'll build a URL shortener service where:

1. Users can shorten long URLs and retrieve the original URLs.
2. The service uses **Redis caching** to store mappings between shortened URLs and original URLs.
3. The cache is distributed across multiple Redis instances to handle high traffic.
4. The system will demonstrate **cache hits** and **misses** in real-time.

### System Architecture

To ensure scalability and performance, we'll divide our service into the following components:

1. **API Server**: Handles requests for shortening and retrieving URLs.
2. **Redis Caching Layer**: Uses multiple Redis instances for distributed caching.
3. **Docker**: Simulates a distributed environment with multiple Redis containers.

---

## Step 1: Setting Up the Project

Let's set up our project by initializing a Node.js application:

```sh
mkdir scalable-url-shortener
cd scalable-url-shortener
npm init -y
```

Now, install the necessary dependencies:

```sh
npm install express redis shortid dotenv
```

- `express`: A lightweight web server framework.
- `redis`: To handle caching.
- `shortid`: For generating short, unique IDs.
- `dotenv`: For managing environment variables.

Create a <VPIcon icon="iconfont icon-doitenv" />`.env` file in the root of your project:

```properties title=".env"
PORT=3000
REDIS_HOST_1=localhost
REDIS_PORT_1=6379
REDIS_HOST_2=localhost
REDIS_PORT_2=6380
REDIS_HOST_3=localhost
REDIS_PORT_3=6381
```

These variables define the Redis hosts and ports we'll be using.

---

## Step 2: Setting Up Redis Instances

We'll use Docker to simulate a distributed environment with multiple Redis instances.

Run the following commands to start three Redis containers:

```sh
docker run -p 6379:6379 --name redis1 -d redis
docker run -p 6380:6379 --name redis2 -d redis
docker run -p 6381:6379 --name redis3 -d redis
```

This will set up three Redis instances running on different ports. We'll use these instances to implement **consistent hashing** and sharding.

---

## Step 3: Implementing the URL Shortener Service

Let's create our main application file, <VPIcon icon="fa-brands fa-js"/>`index.js`:

```js title="index.js"
require('dotenv').config();
const express = require('express');
const redis = require('redis');
const shortid = require('shortid');

const app = express();
app.use(express.json());

const redisClients = [
  redis.createClient({ host: process.env.REDIS_HOST_1, port: process.env.REDIS_PORT_1 }),
  redis.createClient({ host: process.env.REDIS_HOST_2, port: process.env.REDIS_PORT_2 }),
  redis.createClient({ host: process.env.REDIS_HOST_3, port: process.env.REDIS_PORT_3 })
];

// Hash function to distribute keys among Redis clients
function getRedisClient(key) {
  const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return redisClients[hash % redisClients.length];
}

// Endpoint to shorten a URL
app.post('/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('URL is required');

  const shortId = shortid.generate();
  const redisClient = getRedisClient(shortId);

  await redisClient.set(shortId, url);
  res.json({ shortUrl: `http://localhost:${process.env.PORT}/${shortId}` });
});

// Endpoint to retrieve the original URL
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const redisClient = getRedisClient(shortId);

  redisClient.get(shortId, (err, url) => {
    if (err || !url) {
      return res.status(404).send('URL not found');
    }
    res.redirect(url);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```

As you can see in this code, we have:

1. **Consistent Hashing**:
    - We distribute keys (shortened URLs) across multiple Redis clients using a simple hash function.
    - The hash function ensures that URLs are distributed evenly across the Redis instances.
2. **URL Shortening**:
    - The **/shorten** endpoint accepts a long URL and generates a short ID using the **shortid** library.
    - The shortened URL is stored in one of the Redis instances using our hash function.
3. **URL Redirection**:
    - The **/:shortId** endpoint retrieves the original URL from the cache and redirects the user.
    - If the URL is not found in the cache, a **404** response is returned.

---

## Step 4: Implementing Cache Invalidation

In a real-world application, URLs may expire or change over time. To handle this, we need to implement **cache invalidation**.

### Adding Expiry to Cached URLs

Let's modify our <VPIcon icon="fa-brands fa-js"/>`index.js` file to set an expiration time for each cached entry:

```js title="index.js"
// Endpoint to shorten a URL with expiration
app.post('/shorten', async (req, res) => {
  const { url, ttl } = req.body; // ttl (time-to-live) is optional
  if (!url) return res.status(400).send('URL is required');

  const shortId = shortid.generate();
  const redisClient = getRedisClient(shortId);

  await redisClient.set(shortId, url, 'EX', ttl || 3600); // Default TTL of 1 hour
  res.json({ shortUrl: `http://localhost:${process.env.PORT}/${shortId}` });
});
```

- **TTL (Time-To-Live)**: We set a default expiration time of **1 hour** for each shortened URL. You can customize the TTL for each URL if needed.
- **Cache Invalidation**: When the TTL expires, the entry is automatically removed from the cache.

---

## Step 5: Monitoring Cache Metrics

To monitor **cache hits** and **misses**, we’ll add some logging to our endpoints in <VPIcon icon="fa-brands fa-js"/>`index.js`:

```js title="index.js"
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const redisClient = getRedisClient(shortId);

  redisClient.get(shortId, (err, url) => {
    if (err || !url) {
      console.log(`Cache miss for key: ${shortId}`);
      return res.status(404).send('URL not found');
    }
    console.log(`Cache hit for key: ${shortId}`);
    res.redirect(url);
  });
});
```

Here’s what’s going on in this code:

- **Cache Hits**: If a URL is found in the cache, it’s a cache hit.
- **Cache Misses**: If a URL is not found, it’s a cache miss.
- This logging will help you monitor the performance of your distributed cache.

---

## Step 6: Testing the Application

::: tabs

@tab 1.

Start your Redis instances**:

```sh
docker start redis1 redis2 redis3
```

@tab 2.

Run the Node.js server**:

```sh
node index.js
```

@tab 3.

Test the endpoints** using `curl` or Postman:

- Shorten a URL:

```sh
POST http://localhost:3000/shorten
Body: { "url": "https://example.com" }
```

- Access the shortened URL:

```sh
GET http://localhost:3000/{shortId}
```

:::

---

## Conclusion: What You’ve Learned

Congratulations! You’ve successfully built a scalable **URL shortener service** with **distributed caching** using Node.js and Redis. Throughout this tutorial, you’ve learned how to:

1. Implement **consistent hashing** to distribute cache entries across multiple Redis instances.
2. Optimize your application with **cache invalidation strategies** to keep data up-to-date.
3. Use **Docker** to simulate a distributed environment with multiple Redis nodes.
4. Monitor **cache hits and misses** to optimize performance.

### Next Steps:

- **Add a Database**: Store URLs in a database for persistence beyond the cache.
- **Implement Analytics**: Track click counts and analytics for shortened URLs.
- **Deploy to the Cloud**: Deploy your application using Kubernetes for auto-scaling and resilience.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Scalable URL Shortener with Distributed Caching Using Redis",
  "desc": "In this tutorial, we'll build a scalable URL shortening service using Node.js and Redis. This service will leverage distributed caching to handle high traffic efficiently, reduce latency, and scale seamlessly. We'll explore key concepts such as consi...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/build-a-scalable-url-shortener-with-distributed-caching-using-redis.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
