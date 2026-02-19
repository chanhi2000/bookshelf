---
lang: en-US
title: "Resilient API Calls with ts-retry-promise"
description: "Article(s) > Resilient API Calls with ts-retry-promise"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Resilient API Calls with ts-retry-promise"
    - property: og:description
      content: "Resilient API Calls with ts-retry-promise"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/resilient-api-calls-with-ts-retry-promise.html
prev: /programming/ts/articles/README.md
date: 2025-07-17
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Resilient API Calls with ts-retry-promise"
  desc="External APIs are often unreliable. Between rate limits, network issues, and service outages, failures are bound to happen. In this post, you'll learn how to build more resilient TypeScript API clients using ”ts-retry-promise”. We cover defensive error handling, smart retry conditions, and how to integrate retries cleanly into your service logic."
  url="https://typescript.tv/best-practices/resilient-api-calls-with-ts-retry-promise"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

External APIs are often unreliable. Between rate limits, network issues, and service outages, failures are bound to happen. In this post, you'll learn how to build more resilient TypeScript API clients using "ts-retry-promise". We cover defensive error handling, smart retry conditions, and how to integrate retries cleanly into your service logic.

When working with external APIs, failures are inevitable. Whether it's a rate limit, DNS failure, a temporary service outage, or your own client losing connectivity, your application needs a strategy to handle these disruptions gracefully. This is where [<VPIcon icon="fa-brands fa-npm"/>`ts-retry-promise`](https://npmjs.com/package/ts-retry-promise) becomes a valuable tool for building reliable, production-grade clients.

---

## Defensive Helpers

Before handling retries, we need to safely inspect error objects returned from an API. External services often return unpredictable shapes, and assuming structure can lead to runtime failures. To handle this defensively, it's useful to implement type guards that explicitly check the shape of these errors:

```ts
export const hasErrorCode = (error: unknown): error is { code: string | number } => {
  return !!error && typeof error === 'object' && 'code' in error;
};
 
export const hasErrorStatus = (error: unknown): error is { status: number } => {
  return !!error && typeof error === 'object' && 'status' in error && typeof error.status === 'number';
};
```

---

## Retry Conditions

With `ts-retry-promise`, we define a `retryConfig` that outlines how and when retries should happen. In the following example we use a trading API where we configure our client to retry only on transient issues such as rate limiting or temporary network failures, while avoiding retries for known business logic errors like pattern day trading restrictions:

```ts
import ms from 'ms';
import { RetryConfig } from 'ts-retry-promise';
 
const retryConfig: Partial<RetryConfig> = {
  delay: ms('10s'),
  retries: 'INFINITELY',
  timeout: ms('5m'),
  retryIf: (error: unknown) => {
    if (hasErrorCode(error)) {
      // Pattern Day Trading Block
      if (error.code === 40310100) return false;
      return true;
    }
 
    if (hasErrorStatus(error)) {
      // Too Many Requests
      return error.status === 429;
    }
 
    return false;
  },
} as const;
```

This config ensures that we keep retrying when the problem is on the other side, or when our client is temporarily offline but we fail quickly for expected, non-recoverable conditions.

---

---

## Usage with API Clients

Once the retry behavior is defined, applying it is straightforward. Here’s a full example of a possible `TradingClient` class that wraps its operations using the retry logic:

```ts :collapsed-lines
import ms from 'ms';
import { retry, RetryConfig } from 'ts-retry-promise';
 
export const hasErrorCode = (error: unknown): error is { code: string | number } => {
  return !!error && typeof error === 'object' && 'code' in error;
};
 
export const hasErrorStatus = (error: unknown): error is { status: number } => {
  return !!error && typeof error === 'object' && 'status' in error && typeof error.status === 'number';
};
 
export class TradingClient {
  private readonly retryConfig: Partial<RetryConfig> = {
    delay: ms('10s'),
    retries: 'INFINITELY',
    timeout: ms('5m'),
    retryIf: (error: unknown) => {
      if (hasErrorCode(error)) {
        // Pattern day trading block
        if (error.code === 40310100) return false;
        return true;
      }
 
      if (hasErrorStatus(error)) {
        // Too Many Requests
        return error.status === 429;
      }
 
      return false;
    },
  };
 
  constructor(private sdk: { cancelOrder: (id: string) => Promise<void> }) {}
 
  async cancelOrderById(orderId: string) {
    return retry(() => this.sdk.cancelOrder(orderId), this.retryConfig);
  }
}
```

This pattern keeps reshares the retry logic, ensuring that all relevant calls are automatically retried when they encounter eligible failures.

---

## Where to Go from Here

For synchronous workflows, `ts-retry-promise` is a clean, lightweight choice. But in distributed systems or microservice environments, retries might need to happen outside the request lifecycle. In those cases, pushing failed operations into a queue like [<VPIcon icon="fas fa-globe"/>BullMQ](https://docs.bullmq.io/) (built on top of [<VPIcon icon="iconfont icon-redis"/>Redis](https://redis.io/)), [<VPIcon icon="fa-brands fa-amazon"/>Amazon SQS](https://aws.amazon.com/sqs/), or a streaming platform like [<VPIcon icon="iconfont icon-kafka"/>Kafka](https://kafka.apache.org/) can offer more control and the ability to handle retries asynchronously. These systems support delayed retries, backoff strategies, and dead-letter queues, making them ideal for high-throughput or critical workflows where you don’t want retry logic embedded in every service.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Resilient API Calls with ts-retry-promise",
  "desc": "External APIs are often unreliable. Between rate limits, network issues, and service outages, failures are bound to happen. In this post, you'll learn how to build more resilient TypeScript API clients using ”ts-retry-promise”. We cover defensive error handling, smart retry conditions, and how to integrate retries cleanly into your service logic.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/resilient-api-calls-with-ts-retry-promise.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
