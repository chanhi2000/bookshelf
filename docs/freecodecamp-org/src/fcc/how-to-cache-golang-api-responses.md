---
lang: en-US
title: "How to Cache Golang API Responses for High Performance"
description: "Article(s) > How to Cache Golang API Responses for High Performance"
icon: fa-brands fa-golang
category:
  - Go
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Cache Golang API Responses for High Performance"
    - property: og:description
      content: "How to Cache Golang API Responses for High Performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-cache-golang-api-responses.html
prev: /programming/go/articles/README.md
date: 2025-10-15
isOriginal: false
author:
  - name: Temitope Oyedele
    url : https://freecodecamp.org/news/author/Koded001/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760523799795/3b48a898-77fc-4983-90b5-6e21e8019f1e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Cache Golang API Responses for High Performance"
  desc="Go makes it easy to build APIs that are fast out of the box. But as usage grows, speed at the language level is not enough. If every request keeps hitting the database, crunching the same data, or serializing the same JSON over and over, latency cree..."
  url="https://freecodecamp.org/news/how-to-cache-golang-api-responses"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760523799795/3b48a898-77fc-4983-90b5-6e21e8019f1e.png"/>

Go makes it easy to build APIs that are fast out of the box. But as usage grows, speed at the language level is not enough. If every request keeps hitting the database, crunching the same data, or serializing the same JSON over and over, latency creeps up and throughput suffers. Caching is the tool that keeps performance high by storing work that has already been done so that future requests can reuse it instantly. Let’s look at four practical ways to cache APIs in Go, each explained with an analogy and backed by simple code you can adapt.

---

## Response Caching with Local and Redis Storage

When the process of generating an API response becomes expensive, the fastest solution is to store the entire response. Think of a coffee shop during the morning rush. If every customer orders the same latte, the barista could grind beans and steam milk for each order, but the line would move slowly. A smarter move is to brew a pot once and pour from it repeatedly. To handle both speed and scale, the shop keeps a small pot at the counter for instant pours and a larger urn in the back for refills. In software terms, the counter pot is a local in-memory cache such as [Ristretto (<VPIcon icon="fa-brands fa-go-lang"/>`github.com/dgraph-io/ristretto`)](https://pkg.go.dev/github.com/dgraph-io/ristretto) or [BigCache (<VPIcon icon="fa-brands fa-go-lang"/>`github.com/allegro/bigcache`)](https://pkg.go.dev/github.com/allegro/bigcache), and the urn is [<VPIcon icon="iconfont icon-redis"/>Redis](https://redis.io/), which allows multiple API servers to share the same cached responses.

In Go, this two-tier setup usually follows a cache-aside pattern: look in local memory first, fall back to Redis if needed, and only compute the result when both layers miss. Once computed, the value is saved in Redis for everyone and in memory for immediate reuse on the next call.

```go
val, ok := local.Get(key)
if !ok {
    val, err = rdb.Get(ctx, key).Result()
    if err == redis.Nil {
        val = computeResponse() // expensive DB or logic
        _ = rdb.Set(ctx, key, val, 60*time.Second).Err()
    }
    local.Set(key, val, 1)
}
w.Header().Set("Content-Type", "application/json")
w.Write([]byte(val))
```

In the code above, the first attempt is to retrieve the response from the local cache, which returns instantly if the key or data exists. If not found, it queries Redis as the second layer. If Redis also returns nothing, the expensive computation runs and its result is stored in Redis with a sixty seconds expiration so other services can access it, then placed in the local cache for immediate reuse. After which, the response is written back to the client as JSON.

This gives you the best of both worlds: lightning-fast responses for repeat calls and a consistent cache across all your API servers.

---

## Database Query Result Caching

Sometimes the API itself is simple but the real cost hides in the database. Imagine a newsroom waiting for election results. If every editor keeps calling the counting office for the same numbers, the phone lines may jam. Instead, one reporter calls once, writes the result on a board, and every editor copies from there. The board is the cache, and it saves both time and pressure on the office.

In Go, you can apply the same principle by caching query results. Rather than hitting the database for each identical request, you store the result in Redis with a key that represents the query intent. When the next request comes in, you pull from Redis, skip the database, and respond faster.

```go
key := fmt.Sprintf("q:UserByID:%d", id)
if b, err := rdb.Get(ctx, key).Bytes(); err == nil {
    var u User
    _ = json.Unmarshal(b, &u)
    return u
}

u, _ := repo.GetUser(ctx, id) // real DB call
bb, _ := json.Marshal(u)
_ = rdb.Set(ctx, key, bb, 2*time.Minute).Err()
return u
```

Here, we construct a cache key that uniquely identifies the query using the user ID, then attempts to fetch the serialized result from Redis. If the key exists, it deserializes the bytes back into a `User` struct and returns immediately without touching the database. On a cache miss, it executes the actual database query through the repository, serializes the `User` object to JSON, stores it in Redis with a two-minute expiration, and returns the result.

This pattern dramatically reduces database load and response time for read-heavy APIs, but you must remember to clear or refresh entries when data changes, or set short time-to-live values to keep results reasonably fresh.

---

## HTTP Caching with ETag and Cache-Control

Not all caching has to happen inside the server. The HTTP standard already provides tools that let clients or CDNs reuse responses. By setting headers like `ETag` and `Cache-Control`, you can tell the client whether the response has changed. If nothing is new, the client keeps its own copy and the server only sends a lightweight 304 response.

It is similar to a manager posting notices on an office board. Each sheet carries a small stamp. Employees compare the stamp against the one they already have. If it matches, they know their copy is still valid and skip taking a new one. Only when the stamp changes do they replace it.

In Go this is straightforward. Compute an ETag from the response body, compare it with what the client sends, and decide whether to return the full payload or just the 304. 

```go
etag := computeETag(responseBytes)
if match := r.Header.Get("If-None-Match"); match == etag {
    w.WriteHeader(http.StatusNotModified)
    return
}

w.Header().Set("ETag", etag)
w.Header().Set("Cache-Control", "public, max-age=60")
w.Write(responseBytes)
```

The code above generates an ETag, which is a fingerprint or hash of the response content, then checks if the client sent an `If-None-Match` header with a matching ETag from a previous request. If the ETags match, the content hasn't changed, so the server responds with a 304 Not Modified status and sends no body, saving bandwidth. When the ETags don't match or the client has no cached version, the server attaches the new ETag and a `Cache-Control` header that allows public caching for sixty seconds, then sends the full response.

This approach reduces bandwidth, lowers CPU usage, and pairs well with CDNs that can cache and serve responses directly.

---

## Stale-While-Revalidate with Background Refresh

There are cases where serving slightly old data is acceptable if it keeps the API fast. Stock dashboards, analytics summaries, or feed endpoints often fit this model. Instead of making users wait for fresh data on every request, you can serve the cached value immediately and refresh it quietly in the background. This technique is called Stale-While-Revalidate.

Picture a stock ticker screen in a lobby. The numbers may be a few seconds behind, but they are still useful to anyone glancing at the board. Meanwhile, a background process fetches the latest figures and updates the ticker. The reader never stares at a blank screen and the system stays responsive even during spikes.

In Go, this can be built by storing not just the cached data but also timestamps that define when the data is fresh, when it can still be served as stale, and when it must be recomputed. The `singleflight` package helps ensure that only one goroutine does the refresh work, preventing a dogpile of updates.

```go
entry := getEntry(key) // {data, freshUntil, staleUntil}
switch {
case time.Now().Before(entry.freshUntil):
    return entry.data
case time.Now().Before(entry.staleUntil):
    go refreshSingleflight(key) // background refresh
    return entry.data
default:
    return refreshSingleflight(key) // must refresh now
}
```

Here, the code retrieves a cache entry containing the data along with two timestamps marking the freshness and staleness boundaries. If the current time falls before the fresh threshold, the data is considered fully fresh and returned immediately. If time has passed the fresh threshold but remains within the stale window, the code returns the slightly outdated data instantly while launching a background goroutine to refresh it asynchronously, ensuring the next request gets updated information. Once time exceeds even the stale boundary, the data is too old to serve, so the code blocks and performs a synchronous refresh before returning.

This keeps latency low while still ensuring the cache updates regularly, a balance between freshness and performance.

---

## Wrapping Up

Caching is not a single tactic but a set of strategies that fit different needs. Full response caching eliminates repeat work at the top level. Query result caching protects the database from repeated load. HTTP caching leverages the protocol to cut down data transfer. Stale-While-Revalidate strikes a compromise that favors speed without leaving data stale for too long.

In practice, these approaches are often layered. A Go API might use local memory and Redis for responses, apply query-level caching for hot tables, and set ETags so clients avoid unnecessary downloads. With the right mix, you can cut latency by orders of magnitude, handle far more traffic, and save both compute and database resources.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Cache Golang API Responses for High Performance",
  "desc": "Go makes it easy to build APIs that are fast out of the box. But as usage grows, speed at the language level is not enough. If every request keeps hitting the database, crunching the same data, or serializing the same JSON over and over, latency cree...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-cache-golang-api-responses.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
