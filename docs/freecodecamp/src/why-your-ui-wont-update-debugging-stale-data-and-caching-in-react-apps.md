---
lang: en-US
title: "Why Your UI Won’t Update: Debugging Stale Data and Caching in React Apps"
description: "Article(s) > Why Your UI Won’t Update: Debugging Stale Data and Caching in React Apps"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why Your UI Won’t Update: Debugging Stale Data and Caching in React Apps"
    - property: og:description
      content: "Why Your UI Won’t Update: Debugging Stale Data and Caching in React Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-your-ui-wont-update-debugging-stale-data-and-caching-in-react-apps.html
prev: /programming/js-react/articles/README.md
date: 2026-02-06
isOriginal: false
author:
  - name: Oluwadamisi Samuel
    url: https://freecodecamp.org/news/author/Oluwadamisi/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770312709391/8442f6df-1133-47f7-a035-02c958145811.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why Your UI Won’t Update: Debugging Stale Data and Caching in React Apps"
  desc="Your UI doesn’t “randomly” refuse to update. In most cases, it’s rendering cached data, which is data that was saved somewhere so the app doesn’t have to do the same work again. Caching is great for performance, but it becomes a pain when you don’t r..."
  url="https://freecodecamp.org/news/why-your-ui-wont-update-debugging-stale-data-and-caching-in-react-apps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770312709391/8442f6df-1133-47f7-a035-02c958145811.png"/>

Your UI doesn’t “randomly” refuse to update. In most cases, it’s rendering cached data, which is data that was saved somewhere so the app doesn’t have to do the same work again.

Caching is great for performance, but it becomes a pain when you don’t realize which layer is reusing old data.

If you’ve ever seen this:

- You update a profile name, but the screen still shows the old one.
- You delete an item, but it stays in the list.
- Your API returns fresh JSON, but the page refuses to change.
- You deploy a fix, but your teammate still sees the old behavior.

You’re probably hitting a cache.

What makes this especially confusing is that not all stale UI comes from “real” caches. Modern web apps have multiple places where data can be reused, saved, or replayed between your UI, your API and when your app is deployed. When you don’t have a clear mental model of these layers, debugging turns into guesswork.

This article lays out a practical guide of the five most common caching layers that cause stale UI, plus one non-cache trap that looks exactly like one. The goal is to help you quickly identify where stale data is coming from, so you can fix the right thing instead of “refreshing harder.”

---

## Why it Matters

I first ran into this while building an app where the UI wouldn’t update after a successful change. The API returned 200 OK, the database was correct, but the screen stayed stale. I assumed something was wrong with my code or state logic. Instead, the issue was coming from a caching layer I hadn’t invalidated. That’s the real problem with stale UI, you can’t debug it effectively unless you know which layer might be serving cached data.

When you understand where caching happens:

- You debug faster by identifying the layer instead of guessing.
- You avoid production-only bugs caused by caching defaults.
- You stop chasing React issues when the data was never fresh.

This article gives you a simple mental model to pinpoint the layer and fix the right thing.

::: note The Mental Model

When your UI shows data, it feels like it comes straight from your API. In reality, the request/response path can hit multiple reuse points.

:::

---

## Non-Cache Cause

Duplicated React local state (same symptoms as caching). This one isn’t a formal cache, but it causes a lot of “why didn’t it update?” bugs especially for beginners.

### The common trap:

```jsx
const [name, setName] = useState(user.name) // initialized once
```

`useState` only uses its argument during the initial render. On every subsequent render, React ignores this value and preserves the existing state.

If `user.name` later changes (for example, after fresh API data arrives), the `name` state will not update automatically. At that point, `name` becomes a stale copy of `user.name`, and the UI renders outdated data unless you manually synchronize it.

This happens because you have duplicated state:

- `user.name` is the source of truth.
- `name` state is a local snapshot taken once.

React does not keep duplicated state in sync for you.

Correct patterns:

#### 1. Render directly from the source when possible

If the value is not being edited locally, do not copy it into state:

```jsx
<span>{user.name}</span>
```

This guarantees the UI always reflects the latest data.

#### 2. Explicitly synchronize local state when editable state is required

If you need local, editable state (for example, a controlled input), you must opt in to synchronization:

```jsx
const [name, setName] = useState(user.name);  

    useEffect(() => {    
        setName(user.name); 
     }, [user.name]);
```

This effect runs only when `user.name` changes, explicitly updating local state to match the new source value.

---

## Cache 1: React Query Cache

React Query (TanStack Query) stores query results in a QueryClient cache (in memory by default) so your UI can render quickly and avoid unnecessary network requests. When a component needs data, React Query can return cached data immediately and then decide whether to fetch the data again based on options like `staleTime` and “refetch” behaviors (on mount, window focus, reconnect).

### Common failure mode: mutation succeeds, but the UI stays old

A 200 OK only confirms the mutation request succeeded. It does not automatically update the cached query data your UI is rendering.

After a mutation, one of these usually happens:

- The query that renders the screen was not invalidated/fetched
- You invalidated the wrong query key (the UI reads from a different key)
- The UI is rendering local React state that’s out of sync (not the query result)

The simplest “safe” pattern is: invalidate the exact query key your UI uses, so it fetches fresh data.

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: () => {
      // Invalidate the same key your UI query uses (example: ["user", userId])
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
}
```

If your UI uses a different key (for example `["me"]` or `["user", userId, "profile"]`), you must invalidate that key instead, React Query won’t “figure it out” from the URL.

### Query Keys: React Query Caches by Key, not URL

React Query does not cache by endpoint URL. The query key is the identity of the cached data. If two different requests share the same key, React Query treats them as the same data and they can overwrite each other.

You should avoid keys like `["user"]` (too broad), and use keys like `["user", userId]` and `["users", { page, search, filter }]`.

::: info Two settings that control “when it will refetch”

- **staleTime:** how long cached data is treated as fresh. While data is fresh, React Query is less likely to refetch automatically.
- **gcTime (formerly cacheTime):** how long unused query data stays in memory after it’s no longer used by any component, before it’s garbage collected.

:::

---

## Cache 2: Next.js `fetch()` Caching

This is the one that surprises a lot of frontend devs. Next.js can cache results to speed things up. That means your server might return a previously saved copy of:

- The API data it fetched, or
- The page it already built

This is often the first time frontend developers encounter server-side caching behavior that affects UI correctness. So, even if your database has the new value, you can still see the old one, because Next.js didn’t fetch the API again, or didn’t rebuild the page this time.

This mainly applies to the App Router (Next.js calls these saved copies the Data Cache and Full Route Cache).

### What you’ll notice when this happens

- You refresh the page and it still shows the old value.
- Your API is correct (Postman/curl shows the new email), but the UI is stuck.
- Sometimes it “fixes itself” after a short wait (because the saved copy refreshes on a timer).

For example: “I updated my profile email, but prod still shows the old one”

The page (reads email on the server):

```jsx title="app/settings/page.tsx"
export default async function SettingsPage() {
 const res = await fetch("https://api.example.com/users/42", {
  method: "GET",
})
  const user = await res.json();

  return (
    <main>
      <h1>Settings</h1>
      <p>Email: {user.email}</p>
    </main>
  );
}
```

You submit an “Update email” form, the API returns **200 OK**, the database is updated, but /settings still shows the previous email in production.

That usually means you’re seeing a saved copy somewhere on the server side.

### How to debug it

#### Step 1: Reproduce in a production-like run

Caching can behave differently in development. Run:

```sh
next build && next start
```

Then test again.

#### Step 2: Confirm whether the request is reaching your Next.js server at all

Add a log inside the page:

```js
console.log("Rendering /settings at", new Date().toISOString());
```

Then reload settings twice.

- If you see a new timestamp every reload, the request is reaching your server and the page code is running.
- If you don’t see logs in production, your request may not be reaching your server at all (often because a hosting/CDN layer is serving a saved copy before Next.js runs). You’ll confirm that in the CDN section later.

#### Step 3: Force Next.js to ask your API every time

Change the fetch to:

```js
const res = await fetch("https://api.example.com/me", {
  method: "GET",
  cache: "no-store",
});
```

This means: don’t save this response – always fetch it again.

If this fixes the stale email then the problem was a saved copy of the API response (Data Cache).

#### Step 4: If the email is still stale, force Next.js to rebuild the page every request

Add this to the page file:

```jsx title="app/settings/page.tsx"
export const dynamic = "force-dynamic";
```

This means: don’t serve a saved copy of the page; rebuild it per request.

### A “beginner-safe” setup for the user settings pages with some of the suggestions:

```jsx title="app/settings/page.tsx"
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const res = await fetch("https://api.example.com/me", { cache: "no-store" });
  const me = await res.json();
  return <p>Email: {me.email}</p>;
}
```

When you want caching for speed, but still need real time updates, these are some options you can take:

#### Option A: Refresh the saved copy every N seconds

Good for public pages, not ideal for “my settings must update now.”

```js
await fetch(url, { next: { revalidate: 60 } });
```

This means: “You can reuse a saved copy, but refresh it at most every 60 seconds.”

#### Option B: Refresh right after the update (best for “update email” flows)

If you update the email on the server (Server Action or API route), tell Next.js to throw away the saved copy for /settings page so the next visit is fresh:

```jsx title="app/settings/actions.ts"
"use server";

import { revalidatePath } from "next/cache";

export async function updateEmail(email: string) {
  await fetch("https://api.example.com/me/email", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email }),
  });

  // Tell Next.js: next request to /settings should be rebuilt
  revalidatePath("/settings");
}
```

::: note

Next.js caching details can differ by version and by App Router vs Pages Router. Instead of trying to memorize defaults, debug by setting the behavior explicitly (no-store, revalidate, force-dynamic) and observe what changes.

:::

---

## Cache 3: Browser HTTP Cache (a Saved Copy in Your Browser)

Sometimes the browser reuses a saved copy of an API response (from memory or disk), so it doesn’t fully fetch it again.

### What you’ll notice

You open DevTools, and the network shows (from memory cache) or (from disk cache).

### Fast check

DevTools → Network

- Turn on Disable cache (only works while DevTools is open)
- Reload and retry

### Why it happens

Usually your server allows caching via headers like Cache-Control or ETag (which can lead to 304 Not Modified).

---

## Cache 4: CDN/Hosting Cache

This is often a production-only cache, which is why frontend bugs can appear “impossible” to reproduce locally. In production, a CDN/hosting layer can serve a saved copy of a response before your request reaches your server. That’s why “prod is stale, local is fine” happens.

::: info What you’ll notice

- Prod is stale, local is fine
- Different users see different results (different regions/POPs)
- Pages are very fast even right after data changed

:::

::: tip Fast check

Open DevTools → Network → click the request → Response Headers

- Age: if present and increasing, it’s strong evidence you’re getting a cached response from an intermediary cache
- Provider headers can hint HIT/MISS (examples: x-vercel-cache, cf-cache-status)
- Source (Age header, HTTP caching): 

```component VPCard
{
  "title": "RFC 9111: HTTP Caching",
  "desc": "The Hypertext Transfer Protocol (HTTP) is a stateless application-level protocol for distributed, collaborative, hypertext information systems. This document defines HTTP caches and the associated header fields that control cache behavior or indicate cacheable response messages. This document obsoletes RFC 7234.",
  "link": "https://rfc-editor.org/rfc/rfc9111/",
  "logo": "https://rfc-editor.org/favicon.ico",
  "background": "rgba(227,227,227,0.2)"
}
```

:::

### Quick diagnostic check

Change the URL slightly by adding this to the end of the URL:

```plaintext
?debug=1700000000000
```

If the new URL shows fresh data, the edge was likely caching the original URL. This doesn’t fix it for everyone, you’d still need correct cache settings or a purge/invalidation on your CDN.

---

## Cache 5: Service Worker Cache (Only if Your Site is a PWA)

If your site has a service worker, it can return a saved response before the network runs. This can make new deployments or new data seem “ignored.”

::: info What you’ll notice

- Works in Incognito but not normal mode
- Hard refresh doesn’t help
- DevTools “Disable cache” doesn’t fully explain it

:::

::: tip Fast check (Chrome)

Open DevTools → Application → Service Workers

- enable Bypass for network, or Unregister temporarily
- reload and retest

:::

---

## 10-Second Debug Guide

Stale data is rarely random: it usually means a cache layer is doing its job, just not in the way you expect. Modern applications stack multiple caches, so debugging is less about fixing code immediately and more about locating the layer responsible.

Think of this as a quick cheat sheet to figure out which cache layer might be serving stale data, so you can focus your debugging on the right layer.

- No request in Network? Go to `Cache 1 (React Query)`, then Local state, then `Cache 5 (Service worker)`.
- Request exists, but response is old? Go to `Cache 3 (Browser)`, `Cache 4 (CDN)`, then `Cache 2 (Next.js)`.
- Response is fresh, UI is old? Go back to `Cache 1 (invalidating / query keys)` and Local state.

Once you know the likely layer, use the Fast check in that section to confirm it.

---

## Prevention: Set Caching Intentionally

Most stale-data bugs happen because caching settings were never chosen but the defaults were.

- User-specific pages (settings/admin/dashboard): default to fresh: Next.js: use cache: "no-store" on important fetches, and/or force dynamic routes when needed.
- Public pages (marketing/blog/docs): saving + revalidate is usually fine: Decide a revalidate window that matches the business need (seconds/minutes/hours).
- React Query: set staleTime based on how often the data actually changes, and make query keys match the inputs.
- APIs: set Cache-Control / Vary intentionally so shared caches don’t mix user-specific responses.

---

## Recap

Caching itself isn’t the problem. Stale UI happens when a cache exists but you didn’t choose it intentionally or align it with the data’s freshness requirements.

If the UI won’t update, it’s usually because you’re seeing a saved copy from React Query, Next.js, the browser, a CDN, or a service worker. And sometimes it’s not a cache at all, it’s local React state

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Your UI Won’t Update: Debugging Stale Data and Caching in React Apps",
  "desc": "Your UI doesn’t “randomly” refuse to update. In most cases, it’s rendering cached data, which is data that was saved somewhere so the app doesn’t have to do the same work again. Caching is great for performance, but it becomes a pain when you don’t r...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-your-ui-wont-update-debugging-stale-data-and-caching-in-react-apps.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
