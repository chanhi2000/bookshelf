---
lang: en-US
title: "How to Go from Toy API Calls to Production-Ready Networking in JavaScript"
description: "Article(s) > How to Go from Toy API Calls to Production-Ready Networking in JavaScript"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Go from Toy API Calls to Production-Ready Networking in JavaScript"
    - property: og:description
      content: "How to Go from Toy API Calls to Production-Ready Networking in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-go-from-toy-api-calls-to-production-ready-networking-in-javascript.html
prev: /programming/js-express/articles/README.md
date: 2026-04-07
isOriginal: false
author:
  - name: Gabor Koos
    url: https://freecodecamp.org/news/author/gkoos/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/eba00755-1be3-42af-841c-71916e81dcc6.png
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

[[toc]]

---

<SiteInfo
  name="How to Go from Toy API Calls to Production-Ready Networking in JavaScript"
  desc="Imagine this scenario: you ship a feature in the morning. By afternoon, users are rage-clicking a button and your UI starts showing nonsense: out-of-order results, missing updates, and random failures"
  url="https://freecodecamp.org/news/how-to-go-from-toy-api-calls-to-production-ready-networking-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/eba00755-1be3-42af-841c-71916e81dcc6.png"/>

Imagine this scenario: you ship a feature in the morning. By afternoon, users are rage-clicking a button and your UI starts showing nonsense: out-of-order results, missing updates, and random failures you can't reproduce on demand.

That's the gap between toy `fetch()` snippets and production networking.

In this guide, you'll learn how to close that gap. We'll start with a simple request and progressively add the patterns that real apps need: ordering control, failure handling, retries, and cancellation. Later, we'll touch on advanced topics like rate limiting, circuit breakers, request coalescing, and caching, so you can choose the right tools for your use case.

::: note Prerequisites

You don't need to be an expert, but you should already know:

- Core JavaScript and `async/await`
- Basic DOM updates in the browser
- How to run Node.js projects with npm scripts
- How to inspect requests in browser DevTools

:::

---

## What This Repo Does

The companion code for this article is available in the GitHub repository [<VPIcon icon="iconfont icon-github"/>`gkoos/article-js-fetch-production`](https://github.com/gkoos/article-js-fetch-production). It contains a small Express backend and a small vanilla JavaScript frontend.

The app simulates a ticket queue system where each request to the backend allocates the next ticket number for a given queue ID. It increments a counter for each queue ID on every request, and the frontend appends each returned ticket number to the DOM.

The backend exposes `/tickets/:id/nextNumber`, and every request increments a counter for that ticket ID before returning the next number.

The frontend lets you choose a ticket ID, send requests, and append each returned number to the page so you can clearly see how responses arrive over time.

As the article progresses through each level, we'll extend this same app to demonstrate the challenges and solutions of real-world networking patterns.

---

## How to Install

From the project root, install everything with this command:

```sh
npm run install:all
```

---

## How to Run

From the project root, start both servers:

```sh
npm run dev
```

Then open `localhost:5173` in your browser.

- The backend runs on `localhost:3000`
- The frontend runs on `localhost:5173`

---

## Basic `fetch`

We'll start with the simplest case: one button click triggers one request, and the UI appends the returned ticket number.

In our demo, the backend exposes `GET /tickets/:id/nextNumber`. Each request increments a counter for that ticket ID and returns the new value.

For a single request flow, this basic fetch pattern is enough:

```js
const res = await fetch("/tickets/1/nextNumber");
const ticket = await res.json();
document.querySelector(".tickets").append(ticket.ticketNumber);
```

---

## Handling Slow Networks and Preventing Out-of-Order Responses

At this level, everything looks correct. But the network isn't always this predictable. First of all, speed may vary: some requests may take longer than others. To simulate this, let's add some random delay on the backend:

```js title="backend/index.js"
app.get('/tickets/:id/nextNumber', (req, res) => {
  const ticketId = req.params.id;

  // Initialize counter if it doesn't exist
  if (!counters[ticketId]) {
    counters[ticketId] = 0;
  }

  counters[ticketId]++;
  const assignedNumber = counters[ticketId];

  // Delay the response to simulate slow network
  const delay = Math.floor(Math.random() * 5000);
  setTimeout(() => {
    res.json({
      ticketId: ticketId,
      ticketNumber: assignedNumber
    });
  }, delay);
});
```

One thing that immediately becomes apparent is that if the request is slow, the UI may feel unresponsive, so a load indicator could help. But this is a UI-level improvement, not a networking pattern.

Another, even more critical issue is that if the user clicks multiple times quickly, the responses may arrive out of order:

In production, this can't be allowed. So how do we ensure that the UI reflects the correct order of ticket numbers, even if responses arrive in a different order?

Our use case is simple: rapid clicking is probably not what the user intended, so we can disable the button until the first request completes (another UI-level improvement).

But we can do more: **cancel any pending requests when a new one is made**. This is where the `AbortController` API comes in. We can create an `AbortController` instance for each request, and call `abort()` on it when a new request is initiated. This will ensure that only the latest request is active, and any previous requests will be cancelled.

With the UI improvements and cancellation in place, we can now handle rapid clicks without worrying about out-of-order responses. The frontend code:

```js :collapsed-lines title="frontend/main.js"
const ticketIdInput = document.getElementById('ticketId');
const fetchBtn = document.getElementById('fetchBtn');
const ticketList = document.getElementById('ticketList');
const loading = document.getElementById('loading');

let currentController = null;

function setLoadingState(isLoading) {
  fetchBtn.disabled = isLoading;
  loading.classList.toggle('hidden', !isLoading);
}

fetchBtn.addEventListener('click', async () => {
  const ticketId = ticketIdInput.value.trim();
  
  if (!ticketId) {
    alert('Please enter a ticket ID');
    return;
  }

  // Abort any in-flight request for this queue before starting a new one
  if (currentController) {
    currentController.abort();
  }
  currentController = new AbortController();
  setLoadingState(true);

  try {
    const res = await fetch(`/tickets/${ticketId}/nextNumber`, { signal: currentController.signal });
    const data = await res.json();
    
    // Append to DOM
    const ticketElement = document.createElement('div');
    ticketElement.className = 'ticket-item';
    ticketElement.textContent = `Queue \({data.ticketId}: #\){data.ticketNumber}`;
    ticketList.appendChild(ticketElement);
    
    // Scroll to latest item
    ticketElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (error) {
    if (error.name === 'AbortError') return;
    console.error('Error fetching ticket:', error);
    alert('Error fetching ticket');
  } finally {
    setLoadingState(false);
  }
});
```

The code is on the <VPIcon icon="fas fa-code-branch"/>`01-abortController` branch in the repo, and you can switch to it to see the full implementation:

```sh
git checkout 01-abortController
```

---

## Handling HTTP Errors and Unreliable Responses

The network can be unpredictable in other ways too. What if the request fails due to a network error, or the server returns a 500 error? The `fetch()` API doesn't throw for HTTP errors, so we need to check the response status and handle it accordingly.

Let's add random failures on the backend:

```js
app.get('/tickets/:id/nextNumber', (req, res) => {
  const ticketId = req.params.id;

  // Initialize counter if it doesn't exist
  if (!counters[ticketId]) {
    counters[ticketId] = 0;
  }

  counters[ticketId]++;
  const assignedNumber = counters[ticketId];
  const shouldFail = Math.random() < 0.3; // 30% chance to fail with a 500 error

  const delay = Math.floor(Math.random() * 5000);
  setTimeout(() => {
    if (shouldFail) {
      res.status(500).json({
        error: 'Random backend failure',
        ticketId: ticketId
      });
      return;
    }

    res.json({
      ticketId: ticketId,
      ticketNumber: assignedNumber
    });
  }, delay);
});
```

If you run the app, you'll see something like this:

Which is odd, because on the frontend, we put `fetch()` in a `try/catch` block, so we would expect to catch any errors. But `fetch()` only **throws for network errors, not for HTTP errors**. So if the server returns a 500 error, `fetch()` will resolve successfully, and we need to check the response status to determine if it was an error.

To handle this, we can check `res.ok` after the fetch call:

```js
try {
  const res = await fetch(`/tickets/${ticketId}/nextNumber`, { signal: currentController.signal });
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  
  // Append to DOM
  const ticketElement = document.createElement('div');
  ticketElement.className = 'ticket-item';
  ticketElement.textContent = `Queue \({data.ticketId}: #\){data.ticketNumber}`;
  ticketList.appendChild(ticketElement);
  
  // Scroll to latest item
  ticketElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
} catch (error) {
  if (error.name === 'AbortError') return;
  console.error('Error fetching ticket:', error);
  alert('Error fetching ticket');
} finally {
  setLoadingState(false);
}
```

This will ensure that we catch both network errors and HTTP errors. Also note that although the backend throws a 500 error, it still updates the counter, so the next successful request will return the incremented ticket number.

The request is not [**idempotent**](/freecodecamp.org/idempotence-explained.md), meaning repeated requests can have different effects. When designing an API, it's important to consider whether your endpoints should be idempotent or not, and how that affects error handling and retries on the client side.

The code with error handling is on the <VPIcon icon="fas fa-code-branch"/>`02-errorHandling` branch in the repo, and you can switch to it to see the full implementation:

```sh
git checkout 02-errorHandling
```

---

## Adding Automatic Retries for Transient Failures

At this point, we have implemented basic error handling and cancellation with raw `fetch()`. But at the moment, if a request fails, the user has to manually click the button again to retry. Some errors, however, are transient, and can be resolved by simply retrying the request.

Implementing a retry mechanism means we automatically retry failed requests a certain number of times before giving up. We can do this with a simple loop and some delay between retries, but the retry strategy can get more complex.

For example, you might want to implement exponential backoff, where the delay between retries increases exponentially with each attempt to avoid overwhelming the server with too many requests in a short period of time. Your retry logic also needs to take into account which errors are retryable (for example, network errors, 500 errors) and which are not (for example, 400 errors).

This can quickly get out of hand if you try to implement it all with raw `fetch()`, which is why libraries like [<VPIcon icon="iconfont icon-github"/>`sindresorhus/ky`](https://github.com/sindresorhus/ky) are so useful. With `ky`, you can simply specify the number of retries and it will handle the retry logic for you, including exponential backoff and retrying only for certain types of errors. It also has built-in support for cancellation with `AbortController`, so you can easily integrate it with your existing cancellation logic.

Let's add `ky` to our project and see how it simplifies our code:

```sh
cd frontend
npm install ky
```

Then we can update our frontend code to use `ky` instead of `fetch()`:

```js
import ky from 'ky';

// ...

fetchBtn.addEventListener('click', async () => {
  const ticketId = ticketIdInput.value.trim();
  
  if (!ticketId) {
    alert('Please enter a ticket ID');
    return;
  }

  // Abort any in-flight request for this queue before starting a new one
  if (currentController) {
    currentController.abort();
  }
  currentController = new AbortController();
  setLoadingState(true);

  try {
    const data = await ky
      .get(`/tickets/${ticketId}/nextNumber`, { signal: currentController.signal })
      .json();
    
    // Append to DOM
    ...
  } catch (error) {
    if (error.name === 'AbortError') return;
    console.error('Error fetching ticket:', error);
  } finally {
    setLoadingState(false);
  }
});
```

With `ky`, we can also easily add retries with a simple option:

```js
const data = await ky
  .get(`/tickets/${ticketId}/nextNumber`, { 
    signal: currentController.signal,
    retry: {
      limit: 3, // Retry up to 3 times
      methods: ['get'], // Only retry GET requests
      statusCodes: [500], // Only retry on 500 errors
      backoffLimit: 10000 // Maximum delay of 10 seconds between retries
    }
  })
  .json();
```

Pretty neat, right? This way we can handle retries without having to write all the retry logic ourselves, and we can easily customize the retry behavior with different options.

The code with `ky` and retries is on the <VPIcon icon="fas fa-code-branch"/>`03-retries` branch in the repo, and you can switch to it to see the full implementation:

```sh
git checkout 03-retries
npm install
npm run dev
```

And with that, we have evolved our simple `fetch()` call into a more robust networking pattern that can handle slow networks, out-of-order responses, random failures, and retries with minimal code and complexity.

Of course `ky` is just one of many libraries out there that can help you with these patterns. For example [<VPIcon icon="iconfont icon-github"/>`axios/axios`](https://github.com/axios/axios) is another popular choice.

---

## Production-Ready Patterns

Many times, this is all you need to make your app's networking more resilient and production-ready. But production-grade APIs often require additional patterns and features beyond just retries and cancellation.

For example, you might want to implement caching to avoid unnecessary network requests. Or your backend is rate-limited, so you need to implement client-side rate limiting or circuit breakers to prevent overwhelming the server. If you have a distributed backend, you might need to implement request tracing and correlation IDs to track requests across multiple services.

To briefly touch on these topics, we'll introduce a library called [<VPIcon icon="iconfont icon-github"/>`fetch-kit/ffetch`](https://github.com/fetch-kit/ffetch). `ffetch` is a modern fetch wrapper that provides a lot of these features out of the box, including retries, cancellation, caching, and more. It also has a very flexible API that allows you to customize its behavior with plugins and middleware.

Rewriting our frontend code to use `ffetch` would look something like this:

```js title="frontend/main.js"
import { createClient } from '@fetchkit/ffetch';

// ...

const api = createClient({
  timeout: 10000,
  retries: 3,
  throwOnHttpError: true, // Automatically throw for HTTP errors
  shouldRetry: ({ response }) => response?.status === 500 // Only retry on 500 errors
});

// ...
```

And then in our click handler:

```js
const response = await api(`/tickets/${ticketId}/nextNumber`, {
      signal: currentController.signal
    });
    const data = await response.json();
```

The code is on the <VPIcon icon="fas fa-code-branch"/>`04-ffetch` branch in the repo, and you can switch to it to see the full implementation:

```sh
git checkout 04-ffetch
npm install
npm run dev
```

### Rate limiting

Most APIs have some form of rate limiting, which means that if you send too many requests in a short period of time, the server will start rejecting them with `429 Too Many Requests` errors. To handle this, you can implement client-side rate limiting to ensure that you don't exceed the server's limits.

With `ffetch`, you can centralize a shared retry policy for rate-limit responses instead of handling `429` ad hoc at each call site. A practical approach is to retry only a few times and add exponential backoff so retried requests are spaced out.

```js
import { createClient } from '@fetchkit/ffetch';

const api = createClient({
  timeout: 10000,
  retries: 2,
  throwOnHttpError: true,
  shouldRetry: ({ response }) => response?.status === 429, // Only retry on 429 errors
  retryDelay: ({ attempt }) => 2 ** attempt * 200 // Exponential backoff: 200ms, 400ms
});
```

### Circuit breakers

Rate limiting and backend outages are related but not identical. A [<VPIcon icon="fas fa-globe"/>circuit breaker](https://blog.gaborkoos.com/posts/2025-09-17-Stop-Hammering-Broken-APIs-the-Circuit-Breaker-Pattern/) addresses repeated failures by temporarily stopping outbound calls after a threshold is reached, then allowing recovery checks later.

In `ffetch`, this can be handled with the circuit plugin:

```js
import { createClient } from '@fetchkit/ffetch';
import { circuitPlugin } from '@fetchkit/ffetch/plugins/circuit';

const api = createClient({
  timeout: 10000,
  retries: 2,
  throwOnHttpError: true,
  shouldRetry: ({ response }) =>
    [500, 502, 503, 504].includes(response?.status ?? 0),
  plugins: [
    circuitPlugin({
      threshold: 5,
      reset: 30000
    })
  ]
});
```

This helps your frontend fail fast during incidents, reduce useless load on unhealthy services, and recover automatically after the reset window.

### Request Coalescing

In some cases, you might have multiple components or parts of your app that need to fetch the same data. (Unlike earlier in the article, where the user was rapidly clicking a button, here we might actually need all the responses.)

Instead of sending multiple identical requests, you can implement *request coalescing* to combine them into a single request and share the response. `ffetch` has built-in support for this with its `dedupe` plugin:

```js
import { createClient } from '@fetchkit/ffetch';
import { dedupePlugin } from '@fetchkit/ffetch/plugins/dedupe';

const api = createClient({
  timeout: 10000,
  retries: 2,
  throwOnHttpError: true,
  plugins: [dedupePlugin({ ttl: 1000 })]
});

// Same request fired twice -> one in-flight request, shared result
const [r1, r2] = await Promise.all([
  api('/tickets/1/nextNumber'),
  api('/tickets/1/nextNumber')
]);
```

### Caching

Caching stores a response so future requests for the same resource can be served without hitting the network. This saves bandwidth, reduces latency, and protects your backend from redundant load.

None of the techniques below are specific to any fetch library — they work with plain `fetch`, `ky`, `axios`, or anything else.

#### HTTP Cache Headers

The simplest form of caching costs you nothing on the client side. If your server sets the right response headers, the browser will handle everything automatically.

```plaintext
Cache-Control: max-age=60, stale-while-revalidate=30
```

`max-age=60` means the browser will serve the cached response for up to 60 seconds without touching the network. `stale-while-revalidate=30` extends that window: for an extra 30 seconds after the cache expires, the browser serves the stale copy immediately while fetching a fresh one in the background.

This is usually the right first move. Before writing any client-side caching code, check whether your API can simply return appropriate `Cache-Control` headers.

#### In-Memory Cache

When you need finer control — or when your API can't set headers — you can cache responses yourself in a plain JavaScript `Map`. The idea is to key by URL, store the response alongside a timestamp, and skip the network if the entry is still fresh.

```js
const cache = new Map();
const TTL_MS = 60_000; // 1 minute

async function cachedFetch(url, options) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < TTL_MS) {
    return cached.data;
  }

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}
```

This is intentionally simple. Its main limitation is that it disappears on page reload and isn't shared across tabs. For most short-lived UI state, that's fine.

#### Storage-Backed Cache

If you need the cache to survive a page reload, write it to `localStorage` or `sessionStorage` instead:

```js
function getCached(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCached(key, data, ttlMs = 60_000) {
  localStorage.setItem(key, JSON.stringify({ data, expiresAt: Date.now() + ttlMs }));
}

async function fetchWithStorage(url) {
  const key = `cache:${url}`;
  const cached = getCached(key);
  if (cached) return cached;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  setCached(key, data);
  return data;
}
```

Keep in mind that `localStorage` is synchronous, limited to ~5 MB, and stores only strings. It works well for small, infrequently changing data like user preferences or reference lookups. For large datasets consider `IndexedDB`, or a library like [<VPIcon icon="iconfont icon-github"/>`jakearchibald/idb-keyval`](https://github.com/jakearchibald/idb-keyval) that wraps it with a simpler API.

#### Cache Invalidation

Caching introduces one classic problem: stale data. A few common strategies help address this:

- **Time-based expiry (TTL)**: what the examples above use. Simple, but the cache may be stale for up to `TTL_MS` milliseconds.
- **Manual invalidation**: after a mutation (POST/PUT/DELETE), explicitly delete the relevant cache keys so the next read fetches fresh data.
- **Stale-while-revalidate**: serve the cached copy immediately, then refresh it in the background. The browser `Cache-Control` header supports this natively. You can replicate it manually by returning the cached value and triggering a background `fetch` at the same time.

The right choice depends on how often the data changes and how much staleness your users can tolerate.

---

## Conclusion

In this article, we started with a simple `fetch()` call and progressively added patterns to handle real-world networking challenges: out-of-order responses, slow networks, random failures, retries, cancellation, rate limiting, circuit breaking, request coalescing, and caching.

We also introduced libraries like `ky` and `ffetch` that provide many of these features out of the box, making it easier to write production-ready networking code without reinventing the wheel.

You don't need all of these on day one. Start with `res.ok` and an `AbortController`. Add retries when transient failures start showing up in your error logs. Add a circuit breaker when a downstream dependency has reliability problems.

Let the problems surface, then apply the pattern. The key is to understand the trade-offs and choose the right tool for your specific use case.

With these patterns in your toolkit, you'll be better equipped to build resilient, user-friendly applications that can handle the unpredictability of real-world networks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Go from Toy API Calls to Production-Ready Networking in JavaScript",
  "desc": "Imagine this scenario: you ship a feature in the morning. By afternoon, users are rage-clicking a button and your UI starts showing nonsense: out-of-order results, missing updates, and random failures",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-go-from-toy-api-calls-to-production-ready-networking-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
