---
lang: en-US
title: "How to Build an In-Memory Rate Limiter in Next.js"
description: "Article(s) > How to Build an In-Memory Rate Limiter in Next.js"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an In-Memory Rate Limiter in Next.js"
    - property: og:description
      content: "How to Build an In-Memory Rate Limiter in Next.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-in-memory-rate-limiter-in-nextjs.html
prev: /programming/ts/articles/README.md
date: 2026-01-10
isOriginal: false
author:
  - name: Orim Dominic Adah
    url : https://freecodecamp.org/news/author/orimdominic/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1767981990510/95306973-8c9a-435b-936e-ae5476f600de.png
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

```component VPCard
{
  "title": "Netx.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an In-Memory Rate Limiter in Next.js"
  desc="An API rate limiter is a server-side component of a web service that limits the number of API requests a client can make to an endpoint within a period of time. For example, X (formerly known as Twitter) limits the number of tweets that a specific us..."
  url="https://freecodecamp.org/news/how-to-build-an-in-memory-rate-limiter-in-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1767981990510/95306973-8c9a-435b-936e-ae5476f600de.png"/>

An API rate limiter is a server-side component of a web service that limits the number of API requests a client can make to an endpoint within a period of time. For example, X (formerly known as Twitter) limits the number of tweets that a specific user can make to three hundred every three hours.

Rate limiters enforce the responsible use of APIs by blocking requests that exceed the set usage limits.

By following along with this article, you will:

- Learn how rate limiters work
- Build an in-memory rate limiter for a Next.js app router project
- Use Artillery to load test the rate limiter for accuracy and resilience

To get the most out of this article, you should have experience in building APIs with Next.js app router, Express, or any other Node.js backend framework that uses middlewares.

---

## Benefits of Rate Limiters

Rate limiters control how many requests are allowed within a given time window. They have several benefits you know know about if you’re considering using them.

First, they help prevent the abuse of web servers. Rate limiters guard web servers from overuse that needlessly increases their load. They block excessive requests from Denial of Service (DoS) attacks from bots so that the web service doesn’t crash from unnecessary overload and can continue to be available to legitimate users.

They also help manage the cost of using external APIs. Some API endpoints make requests to external APIs to complete their operations – for example, API endpoints that send emails through an email service provider. When an endpoint relies on paid external APIs and user access of the endpoint is not restricted, excessive usage can lead to increased and expensive costs for the web service. Rate limiters block the excessive usage of endpoints like these, helping to keep costs to a reasonable minimum.

---

## How Rate Limiters Work

Rate limiters work using a three-step mechanism. The process includes tracking requests from specific clients, monitoring their usage, and blocking extra requests once the threshold has been exceeded.

In more detail, rate limiters:

- **Track requests**: Rate limiters take note of API clients that make requests and attributes that are specific to the clients (for example, an IP addresses or a userId). These specific attributes are references or keys that are used to identify clients.
- **Monitor usage**: Depending on the rate limiting mechanism, rate limiters increase or decrease the metric that is used to determine the threshold of use. For example, within a three-hour time period, Twitter can track and increase the number of times a user makes an API request to the `create tweet` endpoint.
- **Ensure threshold compliance**: Rate limiters check the threshold of use for every request made. If it has been exceeded, it blocks the request from accessing the functionality of the API endpoint and responds with a status code of 429.

![Client-server interaction in a rate-limited endpoint](https://cdn.hashnode.com/res/hashnode/image/upload/v1767810794741/616acc5a-4df5-4314-ace2-d179b973874d.png)

---

## Rate Limiting Algorithms

You can implement rate limiting using different algorithms based on the requirements of the rate limiter. Each rate limiting algorithm has its merits and demerits. Below are some popular rate limiting algorithms you can play around with.

### Fixed Window Algorithm

In the fixed window rate limiting algorithm, the number of requests made within a fixed time period is tracked and every request increases the request count tracked. If the number requests within the time frame is exceeded, any extra request that comes in within the time frame is blocked. At the end of the time period, the request count is reset and increases for every request made.

Its mechanism is easy to understand and it’s memory-efficient. Its challenge is that spikes in traffic close to the start or the end of a time window can allow more requests than permitted.

### Sliding Window Algorithm

The sliding window algorithm fixes the issue with the fixed window algorithm where spikes in traffic close to the start or end of a time window can allow more requests than permitted.

It works as follows:

- It keeps a track of the timestamps of requests made in a cache.
- When there’s a new request, it removes all timestamps that are older than the start of the current time window and it appends the new request’s timestamp to the cache.
- If the count of the requests in the cache is higher than the threshold, the request is blocked. Otherwise, it’s allowed.

Although this algorithm is more accurate than the fixed window algorithm, it consumes more memory because of the storage of timestamps.

### Token Bucket Algorithm

In the token bucket algorithm, a bucket that contains a predefined number of tokens is assigned to a user. Tokens are added to the bucket at a predefined rate, for example 2 tokens may be added every second.

Once the bucket is full, no more tokens are added. Each request consumes one or more tokens, and if the tokens are exhausted, requests are blocked until the bucket has tokens again.

The Token Bucket algorithm has the benefits of being memory efficient, easy to implement, and accurate enough to block extra requests even during a burst in traffic.

In this tutorial, we’ll use the fixed window algorithm to build a rate limiter. We’ll also battle-test it for resilience and accuracy using Artillery.

---

## How to Build an In-Memory Rate Limiter

If you’re a backend developer, you may have noticed that users sometimes abuse the reset password API endpoint in your Next.js application. This is a cause for concern because the API endpoint makes a request to your email service provider to send an email and you get charged for it.

Because of this, you may want to limit the requests that users make to this endpoint so that you can prevent the abuse of the API and save costs. And that’s where a rate limiter comes in.

You can get the [code for this tutorial here (<VPIcon icon="iconfont icon-github" />`orimdominic/nextjs-app-router-rate-limiter`)](https://github.com/orimdominic/nextjs-app-router-rate-limiter). You can clone it, install the dependencies with `npm install`, and run it following the instructions in the [<VPIcon icon="fa-brands fa-markdown"/>`README` file (<VPIcon icon="iconfont icon-github" />`orimdominic/nextjs-app-router-rate-limiter`)](https://github.com/orimdominic/nextjs-app-router-rate-limiter/blob/main/README.md). You’ll need it to follow along with the rest of this article.

I built the project using Next.js and it uses the app router. I’ve also built the rate limiter and [you can find it here (<VPIcon icon="iconfont icon-github" />`orimdominic/nextjs-app-router-rate-limiter`)](https://github.com/orimdominic/nextjs-app-router-rate-limiter/blob/main/src/lib/server/rate-limiter.ts). You can see how to use it in the [reset password API endpoint here (<VPIcon icon="iconfont icon-github" />`orimdominic/nextjs-app-router-rate-limiter`)](https://github.com/orimdominic/nextjs-app-router-rate-limiter/blob/main/src/pages/api/reset-password-init.ts).

It has a user interface that you can use to test the rate limiter – but let’s dive into the code first.

### The Rate Limiter

The [<VPIcon icon="fas fa-folder-open"/>`src/lib/server/`<VPIcon icon="iconfont icon-typescript"/>`rate-limiter.ts` (<VPIcon icon="iconfont icon-github" />`orimdominic/nextjs-app-router-rate-limiter`)](https://github.com/orimdominic/nextjs-app-router-rate-limiter/blob/main/src/lib/server/rate-limiter.ts) file exports a function called `applyRateLimiter` which accepts three parameters:

- the request object
- the response object
- `getOptsFn`

`getOptsFn` is a function that accepts the request object and, when executed, returns properties specific to the request for tracking, monitoring, and blocking by the rate limiter. `getOptsFn` is a function and not a static object so that the specific properties of a request can be dynamically created by the request handler for each request.

[<VPIcon icon="fas fa-folder-open"/>`src/lib/server/`<VPIcon icon="iconfont icon-typescript"/>`rate-limiter.ts` (<VPIcon icon="iconfont icon-github" />`orimdominic/nextjs-app-router-rate-limiter`)](https://github.com/orimdominic/nextjs-app-router-rate-limiter/blob/main/src/lib/server/rate-limiter.ts) also has an in-memory map called `cache`. `cache` stores the key (or unique identifier) of a request and maps it to its usage. An interval runs every minute to remove keys with `expiredAt` values that have passed from the cache. This helps to manage the amount of memory used by the cache.

```ts title="lib/server/rate-limiter.ts"
type GetOptionsFn = (req: NextApiRequest) => {
  key: string;
  maxTries: number;
  expiresAt: Date;
};

const cache = new Map<string, Usage>();

// clear stale keys from cache every minute
setInterval(() => {
  const currentDate = new Date();
  for (const [key, usage] of cache) {
    if (!usage) continue;

    if (currentDate > usage.expiresAt) {
      cache.delete(key);
    }
  }
}, 60000);
```

When the rate limiter is executed, it uses the `getOptsFn` to generate the following from the request:

- `key`: The unique identifier for the request that can be used to track its usage
- `maxTries`: The maximum number of times a request can be made within the specified time window
- `expiresAt`: The expiry time of a time window

based on its content where it was created.

```ts
const opts = getOptsFn(req);
const usage = cache.get(opts.key);

if (!usage) {
  cache.set(opts.key, {
    tries: 1,
    maxTries: opts.maxTries,
    expiresAt: opts.expiresAt,
  });

  return;
}
```

The rate limiter then checks if the `key` of the request exists in the cache. If it doesn’t, it sets it in the cache, mapping it to the following values:

- `tries` : The number of times that the request has been made without being blocked
- `maxTries`: The maximum number of times that the request should be allowed within the time window without blocking
- `expiresAt`: The expiry time of the time window

It also allows the request to continue by exiting the rate limiter through the `return` statement. The values set in `cache` will be used to determine if and when consecutive requests with the same key should be blocked or not.

If the request’s key exists in `cache`, the rate limiter checks if the number of unblocked tries (`usage.tries`) from `cache` is less than the number of allowed usage tries (`usage.maxTries`). If it evaluates to `true`, it means that the request has not exceeded its maximum tries. It also checks if the expiry time of the time window stored in `cache` for the request has elapsed.

The request is not blocked if one of the following conditions evaluates to `true`:

- the request has not exceeded its maximum tries AND its time window has not elapsed
- the current time window of the request usage in cache (`usage.expiresAt`) has elapsed

```ts
const currentDate = new Date();
const retryAfter = usage.expiresAt.getTime() - currentDate.getTime();
const canProceed = usage.tries < opts.maxTries && retryAfter >= 0;

if (canProceed) {
  cache.set(opts.key, {
    ...usage,
    tries: usage.tries + 1,
  });

  return;
}

if (retryAfter <= 0) { // if usage.expiresAt has elapsed
  cache.set(opts.key, {
    tries: 1,
    maxTries: opts.maxTries,
    expiresAt: opts.expiresAt,
  });

  return;
}
```

If the first condition is truthy, the rate limiter increases the number of tries (`usage.tries`) that the request has in the cache and then allows the request to proceed by exiting the rate limiter using the `return` statement. If the second condition is truthy, the rate limiter resets the usage of the request in the cache using values gotten from `getOptsFn` and then allows the request to proceed. If both conditions are falsy, the request is blocked with a 429 response status code.

```ts
res.setHeader("Retry-After", retryAfter);
return res.status(429).json({
  error: { message: "Too many requests" },
});
```

According to REST specifications, a 429 HTTP response may include a [<VPIcon icon="fa-brands fa-firefox" />Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After) header to let clients know how long to wait before making a new request. The value of the `Retry-After` header had been calculated beforehand and is set on the response object using `res.setHeader`.

### The Request Handler

You can find the reset password request handler in [<VPIcon icon="fas fa-folder-open"/>`src/pages/api/`<VPIcon icon="iconfont icon-typescript"/>`reset-password-init.ts` (<VPIcon icon="iconfont icon-github" />`orimdominic/nextjs-app-router-rate-limiter`)](https://github.com/orimdominic/nextjs-app-router-rate-limiter/blob/main/src/pages/api/reset-password-init.ts). First, it performs validation checks on the request method and body to ensure that it is fit for its operations. The validation ensures that the request is a POST request and that the request body includes an `email` property. It ends the request with the appropriate response code if validation fails.

```ts title="pages/api/reset-password.ts"
if (req.method !== "POST") {
  return res.status(405).json({
    error: { message: "Not allowed" },
  });
}

if (!req.body.email || typeof req.body.email != "string") {
  return res.status(400).json({
    error: { message: "'email' is required" },
  });
}
```

`generateOptions` is the function that is eventually passed as `getOptsFn` to the rate limiter. The `generateOptions` function generates the specific properties of the request for the rate limiter. In the case of this endpoint, the properties are:

- `key`: A string in the format `[method].[endpoint].[email]`. For an email value of “Hello@me.com”, the key will be `post.reset-password.hello@me.com` which will be constant for every request for that email to this endpoint. This key value format makes it unique and specific to this request.
- `expiresAt`: The time when the time window expires. If the request is in cache, this value is ignored by the rate limiter and it uses the value in the cache instead
- `maxTries`: The maximum number of tries that should be allowed within the time window. If the request is in the rate limiter cache already, this value is ignored in preference of the value in cache.

```ts
const generateOptions = function (req: NextApiRequest) {
  const now = new Date();
  const inFiveSeconds = new Date(now.getTime() + 5000);

  return {
    expiresAt: inFiveSeconds,
    key: `post.reset-password.${req.body.email.toLowerCase()}`,
    maxTries: 1,
  };
};
```

For the reset password handler, requests are rate limited to one every five seconds. You can tweak the `expiresAt` and `maxTries` values to test how it works. `applyRateLimiter` is executed with its arguments and if it does not block the request, the handler can go on to send the mail and respond to the client.

---

## The Front End

You can visit the user interface to test the rate limiter manually. Visit the URL shown (`http://localhost:3000` by default) after you ran `npm run dev`. You should see the user interface shown below to test the rate limiter.

![User interface to test the rate limiter manually](https://cdn.hashnode.com/res/hashnode/image/upload/v1767603425330/e7fd49a8-e8ce-4e76-b5f5-df094a5fa3f1.png)

---

## How to Load Test the Rate Limiter for Resilience with Artillery

[<VPIcon icon="fas fa-globe"/>Artillery](https://artillery.io/) is a tool for testing and reporting how well web applications can perform under heavy load. In this section, you will use Artillery to test how efficient and accurate the rate limiter that you built is.

To use Artillery, install it globally via the `npm i -g artillery@latest` command so that the `artillery` command can be available for use via the CLI.

### The Load Test Configuration

In the <VPIcon icon="fas fa-folder-open"/>`loadtest` folder located at the root of the project, you will find the <VPIcon icon="iconfont icon-yaml"/>`setup.yaml` file. It contains the instructions for Artillery to use to carry out the load test. The instructions tell Artillery to create virtual users that will make API requests to the application with the base URL identified by `target` in three phases:

- **Warm up**: Make API requests for a duration of ten seconds, starting from one request per second and increase it to five requests per second.
- **Ramp up**: After warm up, make API requests for a duration of thirty seconds, starting from five requests per second and increase it to ten requests per second.
- **Spike phase**: After ramp up, make API requests for a duration of twenty seconds, starting from ten requests per second and increase it to thirty requests per second.

The brings the total time of the load test to sixty seconds.

```yaml title="loadtest/setup.yaml"
config:
  target: http://localhost:3000/api

  phases:
    - duration: 10
      arrivalRate: 1
      rampTo: 5
      name: Warm up

    - duration: 30
      arrivalRate: 5
      rampTo: 10
      name: Ramp up

    - duration: 20
      arrivalRate: 10
      rampTo: 30
      name: Spike phase
```

The [<VPIcon icon="fas fa-globe"/>`plugins`](https://artillery.io/docs/reference/extensions) section contains instructions for extensions you can use to analyse the results from Artillery and get reports. For example, the [<VPIcon icon="fas fa-globe"/>`ensure`](https://artillery.io/docs/reference/extensions/ensure) plugin contains setups that will report “OK” if at least 99% of the request responses have a latency of 100ms or less.

```yaml
  plugins:
    ensure:
      thresholds:
        - http.response_time.p99: 100
        - http.response_time.p95: 75
```

The [<VPIcon icon="fas fa-globe"/>`metrics-by-endpoint`](https://artillery.io/docs/reference/extensions/metrics-by-endpoint) plugin (not used in this project) is another Artillery plugin that is used to display response time metrics for each URL in the test.

A [<VPIcon icon="fas fa-globe"/>`scenario`](https://artillery.io/docs/reference/test-script#scenarios-section) is a sequence of steps that describes a virtual user session in the app. Each virtual user created in `phases` will make an API request to the end endpoint in `flow` and the whole sequence of requests from `phases` will happen or loop only once (because the flow `count` has a value of 1).

```yaml title="loadtest/setup.yaml"
scenarios:
  - flow:
    - loop:
      - post:
          url: "/reset-password-init"
          headers:
            Content-Type: "application/json"
          json:
            email: "j.doe@email.com"
        count: 1
```

### Run the Load Test

Make sure that the application is running and run the load test with the command `artillery run loadtest/setup.yaml --output loadtest/results.json` from the root folder of the project. This will run the load test on the rate-limited endpoint and save the output of the results in `loadtest/results.json`.

### Review the Results

Regardless of the of the number of requests made, the setup of our rate limiter allows only one request every five seconds. This means that the number of requests that should be allowed within a space of sixty seconds is twelve.

If you take a look at `loadtest/results.json`, you will see that only twelve requests had a status code of 200. If you increase the values of `arrivalRate` or `rampTo` in any or all of the phases to increase the number of requests made to the endpoint and you run the load test again, only twelve requests will still have a status code of 200. This means that our rate limiter is remaining effective and accurate even under high loads.

For latency, you should consider the report of the `ensure` plugin which is logged to the terminal at the end of the test. A result such as:

```plaintext
Checks:
ok: http.response_time.p95 < 75
ok: http.response_time.p99 < 100
```

means that 95% of all requests made had a latency of less than 75 milliseconds and 99% of all requests made had a latency of less than 100 milliseconds. These are good results.

---

## Conclusion

In this article, you have learned about rate limiters, rate limiting algorithms, and how to build and use an in-memory rate limiter in Next.js.

You also got a brief introduction to load testing with Artillery. Be sure to apply what you have learned in one of your Next.js projects when you need it.

Feel free to [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`orimdominicadah`)](https://linkedin.com/in/orimdominicadah/) for questions or clarifications. Thank you for reading this far and I hope this helps you achieve what you intended to achieve. Don’t hesitate to share this article if you feel that it would help someone else out there. Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an In-Memory Rate Limiter in Next.js",
  "desc": "An API rate limiter is a server-side component of a web service that limits the number of API requests a client can make to an endpoint within a period of time. For example, X (formerly known as Twitter) limits the number of tweets that a specific us...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-in-memory-rate-limiter-in-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
