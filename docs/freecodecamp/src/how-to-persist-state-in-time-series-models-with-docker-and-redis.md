---
lang: en-US
title: "How to Persist State in Time-Series Models with Docker and Redis"
description: "Article(s) > How to Persist State in Time-Series Models with Docker and Redis"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Python
  - Flask
  - Data Science
  - Redis
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - py
  - python
  - flask
  - py-flask
  - data-science
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Persist State in Time-Series Models with Docker and Redis"
    - property: og:description
      content: "How to Persist State in Time-Series Models with Docker and Redis"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-persist-state-in-time-series-models-with-docker-and-redis.html
prev: /devops/docker/articles/README.md
date: 2025-10-09
isOriginal: false
author:
  - name: Chirag Agrawal
    url : https://freecodecamp.org/news/author/chiragagrawal/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759972706788/66d45afa-f86b-4365-8a55-8b6873df718b.png
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
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Redis > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/redis/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Persist State in Time-Series Models with Docker and Redis"
  desc="Have you ever built a brilliant time-series model, one that could forecast sales or predict stock prices, only to watch it fail in the real world? Well, this is a common frustration. Your model works perfectly on your machine, but the moment you depl..."
  url="https://freecodecamp.org/news/how-to-persist-state-in-time-series-models-with-docker-and-redis"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759972706788/66d45afa-f86b-4365-8a55-8b6873df718b.png"/>

Have you ever built a brilliant time-series model, one that could forecast sales or predict stock prices, only to watch it fail in the real world? Well, this is a common frustration. Your model works perfectly on your machine, but the moment you deploy it in a Docker container, it seems to develop amnesia. It forgets everything it knew yesterday, making its predictions for tomorrow useless.

Don’t worry. This isn't likely a flaw in your model. It's a clash between how time-series models and Docker containers are designed to work.

Time-series models are all about memory. They need to remember the past to predict the future. But Docker containers are built to be stateless and forgetful, wiping their memory clean with every restart. This fundamental conflict can turn a powerful model into a worthless one in production.

In this article, we’ll solve that problem. We're going to give your time-series model a permanent memory. You'll learn how to build a production-ready prediction service that uses Redis as an external brain and Docker volumes to ensure that memory survives any restart. We'll walk through a hands-on example, step-by-step, so you can learn how to build a system that is both intelligent and incredibly reliable.

---

## Who is This Guide For?

To get the most out of this tutorial, it’ll be helpful to have a few things under your belt. We’ll be diving into some code and command-line work, so a little preparation will go a long way.

- The main tools for this project are [<VPIcon icon="fa-brands fa-docker"/>Docker](https://docs.docker.com/get-started/get-docker/) and [<VPIcon icon="fa-brands fa-docker"/>Docker Compose](https://docs.docker.com/compose/). Make sure you have them installed and running on your computer.
- You’ll also find it easier to follow along if you’re comfortable with the basics of Docker, Python, and the [<VPIcon icon="iconfont icon-flask"/>Flask](http://flask.palletsprojects.com/en/stable/quickstart/) web framework. A bit of command-line experience will also be handy for running the commands in the tutorial.
- But don't worry if you've never used [<VPIcon icon="iconfont icon-redis"/>Redis](https://redis.io/docs/latest/) before. All you need to know is that it’s a fast, in-memory database. We’ll handle the rest along the way.

Think of this as a guided tour. As long as you're curious and have the basic tools ready, you'll be in great shape.

---

## Understanding the Problem

Before jumping into solutions, let's first clarify what a time-series model is and then explore why containerizing it is so tricky.

### So, what is a time-series model?

Simply put, a time-series model is a type of model that analyzes data points collected over time to predict future values. Think of it like predicting the weather. A meteorologist doesn't just look at the sky right now. They look at the temperature, pressure, and wind patterns from the last few hours and days to forecast what will happen tomorrow.

Time-series models do the same thing with data, whether it's website traffic, stock prices, or energy consumption. The key takeaway is that history matters. The sequence of past events provides the context needed to make an intelligent prediction about the future.

Now, here’s what breaks when you put these models in Docker.

### 1. Containers are ephemeral by design

Docker containers are meant to be stateless. This works great for most APIs. A user profile endpoint? Stateless. A sentiment analysis model? Stateless. They take an input, return an output, and forget everything in between.

Time-series models don't work this way. They need context from previous predictions. Without it, your model is essentially blind.

### 2. Lost context between predictions

Each prediction happens in isolation. Your model receives a single data point and makes a guess without knowing what came before. This defeats the entire purpose of time-series modeling.

You may think: "I'll just load all historical data on every request." But that approach fails for two reasons:

- It's slow. Really slow if you have thousands of data points
- It doesn't scale. When you have multiple series or high request volume, you'll hit performance walls fast

### 3. Model amnesia on restart

Every time you deploy a new version or the container crashes, all accumulated state disappears. Your model starts from scratch. In production, this is unacceptable.

---

## The Solution: External State Store

Instead of keeping state inside the container, we’ll move it outside. Redis becomes the model's memory.

The pattern looks like this:

```plaintext
Client Request → Flask API → Redis → Prediction with Context
```
<!-- TODO: mermiad화 -->

Your container stays stateless and replaceable. But the system as a whole maintains state through Redis.

---

## Hands-On Implementation

Let's build this. Clone the demo repository:

```sh
git clone https://github.com/ag-chirag/docker-redis-time-series
cd docker-redis-time-series
```

### Start with the broken approach

The <VPIcon icon="iconfont icon-yaml"/>`docker-compose.initial.yml` file shows what NOT to do:

```yaml title="docker-compose.initial.yml"
services:
  api:
    build: ./flask-api
    ports:
      - "5000:5000"

  redis:
    image: redis:alpine
```

Notice what's missing? No volumes. Redis stores data in the container's filesystem, which means that data is temporary.

Run it:

```sh
docker compose -f docker-compose.initial.yml up
```

Make a few predictions:

```sh
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "series_id": "demo",
    "historical_data": [
      {"timestamp": "2024-01-01T12:00:00", "value": 10},
      {"timestamp": "2024-01-01T12:01:00", "value": 20},
      {"timestamp": "2024-01-01T12:02:00", "value": 30}
    ]
  }'
```

You'll get a response showing Redis is working:

```json
{
  "data_points_used": 3,
  "prediction": 40,
  "redis_connected": true
}
```

Now restart the services:

```sh
docker compose down
docker compose -f docker-compose.initial.yml up
```

Make another prediction. Check the `data_points_used` field. It reset. All your historical data is gone. This is exactly what we're trying to avoid.

### How to fix it with volumes

The correct <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` adds persistence:

```yaml title="docker-compose.yml"
services:
  api:
    build: ./flask-api
    ports:
      - "5000:5000"
    environment:
      - REDIS_HOST=redis

  redis:
    image: redis:alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

#### So, what is a volume and how does it work?

Think of a Docker volume as a dedicated external hard drive for your container. By default, when a container writes data, it does so to a temporary layer that gets destroyed when the container is removed. A volume provides a way to save that data permanently.

Here’s how it works:

1. Docker creates and manages a special storage area on the host machine, completely separate from any container's filesystem. In our docker-compose.yml, the `volumes: redis_data:` section at the bottom tells Docker to create a named volume called `redis_data`.
2. When the Redis container starts, the `volumes: - redis_data:/data` line tells Docker to "plug in" this external hard drive. It connects the `redis_data` volume to the `/data` directory inside the container.
3. Now, whenever the Redis process inside the container writes data to its `/data` directory (which we've configured it to do), it's actually writing to the `redis_data` volume on the host machine.
4. When you run docker compose down, the Redis container is destroyed, but the `redis_data` volume is untouched. It's like unplugging the external hard drive, and the data is still safe. The next time you run docker compose up, a brand new Redis container is created, the volume is re-attached, and Redis finds all its old data right where it left it.

This mechanism is the key to giving our stateful service a memory that survives restarts.

Run the corrected version:

```sh
docker compose up --build
```

Send several predictions to build up state:

```sh
for i in {1..5}; do
  curl -X POST http://localhost:5000/predict \
    -H "Content-Type: application/json" \
    -d "{
      \"series_id\": \"demo\",
      \"historical_data\": [{\"timestamp\": \"2024-01-01T12:0$i:00\", \"value\": $((i*10))}]
    }"
done
```

Now comes the test. Restart everything:

```sh
docker compose down
docker compose up
```

Make another prediction. Look at `data_points_used`. It includes all previous points. The model picks up exactly where it left off.

This works because the volume exists independently of the container lifecycle.

### How the code handles state

The Flask API in <VPIcon icon="fas fa-folder-open"/>`flask-api/`<VPIcon icon="fa-brands fa-python"/>`app.py` stores each data point in Redis using sorted sets:

```py title="flask-api/app.py"
def store_data_point(series_id, timestamp, value):
    key = f"ts:{series_id}"
    redis_client.zadd(key, {json.dumps({"ts": timestamp, "val": value}): timestamp})
```

When making predictions, it retrieves recent history:

```py title="flask-api/app.py"
def get_recent_data(series_id, limit=100):
    key = f"ts:{series_id}"
    data = redis_client.zrange(key, -limit, -1)
    return [json.loads(d) for d in data]
```

Redis sorted sets give you automatic time ordering. The volume ensures this data survives restarts.

### Test the health endpoint

Check that everything is connected properly:

```sh
curl http://localhost:5000/health
```

You should see:

```json
{
  "model_loaded": true,
  "redis_connected": true,
  "status": "healthy"
}
```

If `redis_connected` is false, check your Docker logs. Common issues are network configuration or Redis not starting properly.

---

## What About Scaling?

This setup works well for single-instance deployments. When traffic increases, you have a few options.

### Horizontal scaling with Redis Cluster

For high throughput, distribute your data across multiple Redis nodes. Redis Cluster handles sharding automatically.

### High availability with Redis Sentinel

Add failover capability so your state store doesn't become a single point of failure. Sentinel monitors Redis instances and promotes replicas when the primary fails.

### Use managed Redis services

AWS ElastiCache, Azure Cache for Redis, or Google Cloud Memorystore handle the operational burden. You focus on your model, they handle Redis reliability.

The key insight: your API containers remain stateless. You scale the state store independently.

---

## Common Pitfalls to Avoid

I can't emphasize this enough: test your persistence before deploying to production.

### Don't assume volumes work

Actually restart your containers and verify state persists. I've seen deployments fail because someone forgot to mount the volume in production.

### Don't ignore Redis memory limits

Redis keeps everything in memory. Monitor your memory usage. Set maxmemory policies appropriate for your workload. If you run out of memory, Redis will start evicting keys or refuse writes.

### Don't skip monitoring

Add health checks. Monitor Redis connection status. Track prediction latency. You want to know when things break, not learn about it from angry users.

---

## Conclusion

Time-series models need memory. Docker containers lose memory by default. The solution is simple: separate state from compute.

Use Redis as an external state store. Use Docker volumes to persist that state. Your model stays smart, your containers stay replaceable, and your deployments become reliable.

The full working code is available at [<VPIcon icon="iconfont icon-github"/>`ag-chirag/docker-redis-time-series`](https://github.com/ag-chirag/docker-redis-time-series). Clone it, run it, break it, learn from it.

And remember: the simplest solution that works is usually the right one. You don't always need Kubernetes and StatefulSets. Sometimes Docker Compose and a volume are enough.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Persist State in Time-Series Models with Docker and Redis",
  "desc": "Have you ever built a brilliant time-series model, one that could forecast sales or predict stock prices, only to watch it fail in the real world? Well, this is a common frustration. Your model works perfectly on your machine, but the moment you depl...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-persist-state-in-time-series-models-with-docker-and-redis.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
