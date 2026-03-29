---
lang: en-US
title: "How to Implement Token Bucket Rate Limiting with FastAPI"
description: "Article(s) > How to Implement Token Bucket Rate Limiting with FastAPI"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement Token Bucket Rate Limiting with FastAPI"
    - property: og:description
      content: "How to Implement Token Bucket Rate Limiting with FastAPI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/token-bucket-rate-limiting-fastapi.html
prev: /programming/py-fastapi/articles/README.md
date: 2026-03-28
isOriginal: false
author:
  - name: Prosper Ugbovo
    url: https://freecodecamp.org/news/author/yongdev/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fba3d4a6-faca-429a-8e16-a3e9778d2cf8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement Token Bucket Rate Limiting with FastAPI"
  desc="APIs power everything from mobile apps to enterprise platforms, quietly handling millions of requests per day. Without safeguards, a single misconfigured client or a burst of automated traffic can ove"
  url="https://freecodecamp.org/news/token-bucket-rate-limiting-fastapi"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fba3d4a6-faca-429a-8e16-a3e9778d2cf8.png"/>

APIs power everything from mobile apps to enterprise platforms, quietly handling millions of requests per day. Without safeguards, a single misconfigured client or a burst of automated traffic can overwhelm your service, degrading performance for everyone.

Rate limiting prevents this. It controls how many requests a client can make within a given timeframe, protecting your infrastructure from both intentional abuse and accidental overload.

Among the several algorithms used for rate limiting, the **Token Bucket** stands out for its balance of simplicity and flexibility. Unlike fixed window counters that reset abruptly, the Token Bucket allows short bursts of traffic while still enforcing a sustainable long-term rate. This makes it a practical choice for APIs where clients occasionally need to send a quick flurry of requests without being penalized.

In this guide, you'll implement a Token Bucket rate limiter in a FastAPI application. You'll build the algorithm from scratch as a Python class, wire it into FastAPI as middleware with per-user tracking, add standard rate limit headers to your responses, and test everything with a simple script. By the end, you'll have a working rate limiter you can drop into any FastAPI project.

::: note Prerequisites

To follow this tutorial, you'll need:

- **Python 3.9 or later** installed on your machine. You can verify your version by running `python --version`.
- **Familiarity with Python** and basic knowledge of how HTTP APIs work.
- **A text editor** such as VS Code, Vim, or any editor you prefer.

:::

---

## Understanding the Token Bucket Algorithm

Before writing code, it helps to understand the mechanism you'll be building.

The Token Bucket algorithm models rate limiting with two simple concepts: a **bucket** that holds tokens, and a **refill process** that adds tokens at a steady rate.

Here is how it works:

1. The bucket starts full, holding a fixed maximum number of tokens (the capacity).
2. Each incoming request costs one token. If the bucket has tokens available, the request is allowed, and one token is removed.
3. If the bucket is empty, the request is rejected with a `429 Too Many Requests` response.
4. Tokens are added back to the bucket at a constant refill rate, regardless of whether requests are coming in. The bucket never exceeds its maximum capacity.

The capacity determines how large a burst the system absorbs. The refill rate defines the sustained throughput. For example, a bucket with a capacity of 10 and a refill rate of 2 tokens per second allows a client to fire 10 requests instantly, but after that, they can only make 2 requests per second until the bucket refills.

This two-parameter design gives you precise control:

| Parameter | Controls | Example |
| --- | --- | --- |
| **Capacity** (max tokens) | Maximum burst size | 10 tokens = 10 requests at once |
| **Refill rate** | Sustained throughput | 2 tokens/sec = 2 requests/sec long-term |
| **Refill interval** | Granularity of refill | 1.0 sec = tokens added every second |

Compared to other rate-limiting algorithms:

- **Fixed Window** counters reset at hard boundaries (for example, every minute), which can allow double the intended rate at window edges. The Token Bucket has no such boundary.
- **Sliding Window** counters are more accurate but more complex to implement and maintain.
- **Leaky Bucket** processes requests at a fixed rate and queues the rest. The Token Bucket is similar, but allows bursts instead of forcing a constant pace.

The Token Bucket is widely used in production systems. AWS API Gateway, NGINX, and Stripe all use variations of it.

---

## Setting Up the FastAPI Project

Create a project directory and install the dependencies:

```sh
mkdir fastapi-ratelimit && cd fastapi-ratelimit
```

Create and activate a virtual environment:

```sh
python -m venv venv
```

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

```sh
source venv/bin/activate
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
venv\Scripts\activate
```

:::

Install FastAPI and Uvicorn:

```sh
pip install fastapi uvicorn
```

Create the project file structure:

```sh title="file structure"
fastapi-ratelimit/
├── main.py
└── ratelimiter.py
```

Create <VPIcon icon="fa-brands fa-python"/>`main.py` with a minimal FastAPI application:

```py title="main.py"
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello, world!"}
```

Start the server to verify the setup. You should see output similar to:

```sh
uvicorn main:app --reload
#
# INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
# INFO:     Started reloader process
```

Open in your browser `http://127.0.0.1:8000` or run curl `http://127.0.0.1:8000`. You should receive:

```json
{"message": "Hello, world!"}
```

With the project running, you can move on to building the rate limiter.

---

## Implementing the Token Bucket Class

Open <VPIcon icon="fa-brands fa-python"/>`ratelimiter.py` in your editor and add the following code. This class implements the Token Bucket algorithm with thread-safe operations:

```py :collapsed-lines title="ratelimiter.py"
import time
import threading


class TokenBucket:
    """
    Token Bucket rate limiter.

    Each bucket starts full at `max_tokens` and refills `refill_rate`
    tokens every `interval` seconds, up to the maximum capacity.
    """

    def __init__(self, max_tokens: int, refill_rate: int, interval: float):
        """
        Initialize a new Token Bucket.

        :param max_tokens: Maximum number of tokens the bucket can hold (burst capacity).
        :param refill_rate: Number of tokens added per refill interval.
        :param interval: Time in seconds between refills.
        """
        assert max_tokens > 0, "max_tokens must be positive"
        assert refill_rate > 0, "refill_rate must be positive"
        assert interval > 0, "interval must be positive"

        self.max_tokens = max_tokens
        self.refill_rate = refill_rate
        self.interval = interval

        self.tokens = max_tokens
        self.refilled_at = time.time()
        self.lock = threading.Lock()

    def _refill(self):
        """Add tokens based on elapsed time since the last refill."""
        now = time.time()
        elapsed = now - self.refilled_at

        if elapsed >= self.interval:
            num_refills = int(elapsed // self.interval)
            self.tokens = min(
                self.max_tokens,
                self.tokens + num_refills * self.refill_rate
            )
            # Advance the timestamp by the number of full intervals consumed,
            # not to `now`, so partial intervals aren't lost.
            self.refilled_at += num_refills * self.interval

    def allow_request(self, tokens: int = 1) -> bool:
        """
        Attempt to consume `tokens` from the bucket.

        Returns True if the request is allowed, False if the bucket
        does not have enough tokens.
        """
        with self.lock:
            self._refill()

            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False

    def get_remaining(self) -> int:
        """Return the current number of available tokens."""
        with self.lock:
            self._refill()
            return self.tokens

    def get_reset_time(self) -> float:
        """Return the Unix timestamp when the next refill occurs."""
        with self.lock:
            return self.refilled_at + self.interval
```

::: info The class has three public methods:

- `allow_request()` is the core method. It refills tokens based on elapsed time, then tries to consume one. It returns `True` if the request is allowed, `False` if the bucket is empty.
- `get_remaining()` returns the number of tokens the client has left. You will use this for response headers.
- `get_reset_time()` returns when the next token will be added. This is also exposed in response headers.

:::

The `threading.Lock` ensures that concurrent requests don't create race conditions when reading or modifying the token count. This is important because FastAPI runs request handlers concurrently.

::: note

This implementation stores bucket state in memory. If you restart the server, all buckets reset. For persistence across restarts or multiple server instances, you would store token counts in Redis or a similar external store. The in-memory approach is sufficient for single-instance deployments.

:::

---

## Adding Per-User Rate Limiting Middleware

A single global bucket would throttle all users together. One heavy user could exhaust the limit for everyone. Instead, you'll assign a separate bucket to each user, identified by their IP address.

Add the following to <VPIcon icon="fa-brands fa-python"/>`ratelimiter.py`, below the `TokenBucket` class:

```py :collapsed-lines title="ratelimiter.py"
from collections import defaultdict


class RateLimiterStore:
    """
    Manages per-user Token Buckets.

    Each unique client key (e.g., IP address) gets its own bucket
    with identical parameters.
    """

    def __init__(self, max_tokens: int, refill_rate: int, interval: float):
        self.max_tokens = max_tokens
        self.refill_rate = refill_rate
        self.interval = interval
        self._buckets: dict[str, TokenBucket] = {}
        self._lock = threading.Lock()

    def get_bucket(self, key: str) -> TokenBucket:
        """
        Return the TokenBucket for a given client key.
        Creates a new bucket if one does not exist yet.
        """
        with self._lock:
            if key not in self._buckets:
                self._buckets[key] = TokenBucket(
                    max_tokens=self.max_tokens,
                    refill_rate=self.refill_rate,
                    interval=self.interval,
                )
            return self._buckets[key]
```

Now open <VPIcon icon="fa-brands fa-python"/>`main.py` and replace its contents with the full application, including the rate-limiting middleware:

```py :collapsed-lines title='main.py"
import time

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from ratelimiter import RateLimiterStore

app = FastAPI()

# Configure rate limits: 10 requests burst, 2 tokens added every 1 second.
limiter = RateLimiterStore(max_tokens=10, refill_rate=2, interval=1.0)


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """
    Middleware that enforces per-IP rate limiting on every request.
    Adds standard rate limit headers to every response.
    """
    # Identify the client by IP address.
    client_ip = request.client.host
    bucket = limiter.get_bucket(client_ip)

    # Check if the client has tokens available.
    if not bucket.allow_request():
        retry_after = bucket.get_reset_time() - time.time()
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Try again later."},
            headers={
                "Retry-After": str(max(1, int(retry_after))),
                "X-RateLimit-Limit": str(bucket.max_tokens),
                "X-RateLimit-Remaining": str(bucket.get_remaining()),
                "X-RateLimit-Reset": str(int(bucket.get_reset_time())),
            },
        )

    # Request is allowed. Process it and add rate limit headers to the response.
    response = await call_next(request)
    response.headers["X-RateLimit-Limit"] = str(bucket.max_tokens)
    response.headers["X-RateLimit-Remaining"] = str(bucket.get_remaining())
    response.headers["X-RateLimit-Reset"] = str(int(bucket.get_reset_time()))
    return response


@app.get("/")
async def root():
    return {"message": "Hello, world!"}


@app.get("/data")
async def get_data():
    return {"data": "Some important information"}


@app.get("/health")
async def health():
    return {"status": "ok"}
```

The middleware does the following on every incoming request:

1. Extracts the client's IP address from `request.client.host`.
2. Retrieves (or creates) that client's Token Bucket from the store.
3. Calls `allow_request()`. If the bucket is empty, it returns a `429` response with a `Retry-After` header telling the client how long to wait.
4. If tokens are available, it processes the request normally and attaches rate limit headers to the response.

The three `X-RateLimit-*` headers follow a [<VPIcon icon="fas fa-globe"/>widely adopted convention](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/):

| Header | Meaning |
| --- | --- |
| `X-RateLimit-Limit` | Maximum burst capacity (max tokens) |
| `X-RateLimit-Remaining` | Tokens left in the current bucket |
| `X-RateLimit-Reset` | Unix timestamp when the next refill occurs |

These headers allow well-behaved clients to self-throttle before hitting the limit.

---

## Testing the Rate Limiter

Restart the server if it's not already running:

```sh
uvicorn main:app --reload
```

### Manual Testing with curl

Manual testing with `curl` is useful during development when you want to quickly verify that your middleware is working. A single request lets you confirm that the rate limit headers are present, the values are correct, and one token is consumed as expected.

This approach is fast and requires no additional setup, making it ideal for spot-checking your configuration after making changes.

Send a single request and inspect the response:

```sh
curl -i http://127.0.0.1:8000/data
```

You should see a `200` response with headers like:

```plaintext
HTTP/1.1 200 OK
x-ratelimit-limit: 10
x-ratelimit-remaining: 9
x-ratelimit-reset: 1739836801
```

### Automated Burst Test

While `curl` confirms that the rate limiter is active, it can't verify that the limiter actually blocks requests when the bucket is empty. For that, you need to send requests faster than the refill rate and observe the `429` responses. An automated burst test is essential before deploying to production, after changing your bucket parameters, or when you need to verify both the blocking and refill behavior.

Create a file called <VPIcon icon="fa-brands fa-python"/>`test_ratelimit.py` in your project directory:

```py :collapsed-lines title="test_ratelimit.py"
import requests
import time


def test_burst():
    """Send 15 rapid requests to trigger the rate limit."""
    url = "http://127.0.0.1:8000/data"
    results = []

    for i in range(15):
        response = requests.get(url)
        remaining = response.headers.get("X-RateLimit-Remaining", "N/A")
        results.append((i + 1, response.status_code, remaining))
        print(f"Request {i+1:2d} | Status: {response.status_code} | Remaining: {remaining}")

    print()

    allowed = sum(1 for _, status, _ in results if status == 200)
    blocked = sum(1 for _, status, _ in results if status == 429)
    print(f"Allowed: {allowed}, Blocked: {blocked}")


def test_refill():
    """Exhaust tokens, wait for a refill, then confirm requests succeed again."""
    url = "http://127.0.0.1:8000/data"

    print("\n--- Exhausting tokens ---")
    for i in range(12):
        response = requests.get(url)
        print(f"Request {i+1:2d} | Status: {response.status_code}")

    print("\n--- Waiting 3 seconds for refill ---")
    time.sleep(3)

    print("\n--- Sending requests after refill ---")
    for i in range(5):
        response = requests.get(url)
        remaining = response.headers.get("X-RateLimit-Remaining", "N/A")
        print(f"Request {i+1:2d} | Status: {response.status_code} | Remaining: {remaining}")


if __name__ == "__main__":
    print("=== Burst Test ===")
    test_burst()

    # Allow bucket to refill before next test
    time.sleep(6)

    print("\n=== Refill Test ===")
    test_refill()
```

Install the `requests` library if you don't have it:

```sh
pip install requests
```

Run the test. You should see output similar to:

```sh
python test_ratelimit.py
#
# === Burst Test ===
# Request  1 | Status: 200 | Remaining: 9
# Request  2 | Status: 200 | Remaining: 8
# Request  3 | Status: 200 | Remaining: 7
# ...
# Request 10 | Status: 200 | Remaining: 0
# Request 11 | Status: 429 | Remaining: 0
# Request 12 | Status: 429 | Remaining: 0
# ...
# Request 15 | Status: 429 | Remaining: 0
# 
# Allowed: 10, Blocked: 5
```

The first 10 requests succeed (one token each from the full bucket). Requests 11 through 15 are rejected because the bucket is empty. The refill test then confirms that after waiting, tokens reappear and requests succeed again.

::: note

The exact split between allowed and blocked requests may vary slightly due to timing. Tokens may refill between rapid requests. This is expected behavior.

:::

---

## Where Rate Limiting Fits in Your Architecture

The implementation in this tutorial runs inside your application process, which is the simplest approach and works well for single-instance deployments. In larger systems, rate limiting typically appears at multiple layers:

- **API gateway level** (NGINX, Kong, Traefik, Envoy): A coarse global rate limit applied to all traffic before it reaches your application. This protects against large-scale abuse and DDoS.
- **Application level** (this tutorial): Fine-grained per-user or per-endpoint limits inside your service. This is useful for enforcing different quotas on different API tiers.
- **Both**: Many production systems combine a gateway-level global limiter with an in-app per-user limiter. The gateway catches the flood and the application enforces business rules.

For multi-instance deployments (multiple server processes behind a load balancer), the in-memory `RateLimiterStore` won't share state across instances. In that case, replace the in-memory dictionary with Redis. The Token Bucket logic stays the same – only the storage layer changes.

---

## Conclusion

In this guide, you built a Token Bucket rate limiter from scratch and integrated it into a FastAPI application with per-user tracking and standard rate limit response headers. You also tested the implementation to verify that burst capacity and refill behavior work as expected.

The Token Bucket algorithm gives you two straightforward controls, capacity for burst tolerance and refill rate for sustained throughput, which cover the vast majority of rate-limiting needs.

From here, you can extend this foundation by:

- Replacing the in-memory store with Redis for multi-instance deployments.
- Applying different rate limits per endpoint by creating separate `RateLimiterStore` instances.
- Using authenticated user IDs instead of IP addresses for more accurate client identification.
- Adding metrics and logging to track how often clients are being throttled.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement Token Bucket Rate Limiting with FastAPI",
  "desc": "APIs power everything from mobile apps to enterprise platforms, quietly handling millions of requests per day. Without safeguards, a single misconfigured client or a burst of automated traffic can ove",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/token-bucket-rate-limiting-fastapi.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
