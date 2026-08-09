---
lang: en-US
title: "How Do You Build a Social Media Feed? (System Design)"
description: "Article(s) > How Do You Build a Social Media Feed? (System Design)"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - devops
  - design
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Do You Build a Social Media Feed? (System Design)"
    - property: og:description
      content: "How Do You Build a Social Media Feed? (System Design)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloghow-do-you-build-a-social-media-feed-system-design.html
prev: /academics/system-design/articles/README.md
date: 2026-08-15
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_207.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Desgin > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Do You Build a Social Media Feed? (System Design)"
  desc="The home feed looks like the easiest feature in a social app: fetch posts from the accounts you follow, sort, return a page."
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techbloghow-do-you-build-a-social-media-feed-system-design"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_207.png"/>

Every social app has a home feed, and it looks like the easiest feature in the product.

Fetch the recent posts from every account the user follows, merge them, sort by time, return the first page. You could ship it in an afternoon.

Feeds are a classic system design problem because the obvious version does the work at read time, and the version that survives production does it at write time. Let's build one and watch where each version breaks.

---

## Fan-Out on Read

The naive feed computes everything at read time: **fan-out on read**.

The feed is a query. When a user opens the app, the Feed API runs the merge live, against the posts of every account they follow. A user following 800 accounts turns one page view into an 800-way merge that runs before anything renders, and pull-to-refresh throws the result away and runs it again.

![A client requests its feed, and the Feed API fans out reads to the posts of every followed author in the post store, merging and sorting the results on every refresh](https://milanjovanovic.tech/blogs/mnw_207/feed_read_storm.png)

To be fair to the naive design: with a composite index on `(author_id, created_at)`, that merge is a single query that returns in milliseconds, and it stays fine well past the point most products ever reach. If your users follow a few hundred accounts and you serve hundreds of feed reads per second, ship the query and move on.

The problem is the ratio. Twitter published its numbers years ago: roughly 300,000 home timeline reads per second against about 5,000 new tweets. Sixty reads for every write is the ratio that justifies moving the work to the write side.

---

## The Single-Writer Rule

Before fixing reads, the write path needs one property: a single writer.

Public traffic enters through an API gateway, and only the Post API writes the post store. The gateway already handles authentication. What the single writer buys is one transactional boundary: committing a post and recording its event happen atomically, in commit order.

Split posting across two services and you get two event streams with no shared order, where a delete can race ahead of the create it refers to. It also gives your [**invariants**](/milanjovanovic.tech/what-invariants-are-and-why-a-domain-model-is-the-best-place-to-enforce-them.md) one home.

![A client publishes through an API gateway to the Post API, which is the only writer of the post store, while a blocked red path shows that direct client writes are not allowed](https://milanjovanovic.tech/blogs/mnw_207/write_path.png)

Fan-out on write depends on this: every committed post produces exactly one event.

---

## Fan-Out on Write

The first fix most teams reach for is caching the merged page per user with a short TTL, and it does absorb repeat refreshes. But a feed cache entry serves exactly one user, so the hit rate is only as good as how often that user reloads within the window, and every expiry brings back the full merge. **Fan-out on write** is that cache with the timer removed: kept correct by writes instead of rebuilt on expiry, and populated for every follower whether or not they ever read.

When an author publishes a post:

1. The Post API commits the post to the post store.
2. It publishes a small immutable event to a [**topic**](/milanjovanovic.tech/getting-started-with-nats-jetstream-in-dotnet.md): author id, post id, timestamp.
3. Fan-out workers consume the event, expand the author into their follower list, and append the post id to each follower's **timeline**: a capped list of recent post ids in a cache.

The Feed API serves a feed with one timeline lookup and a batched fetch to hydrate the ids into posts. Scroll past the cap and the feed falls back to the query path. Almost nobody does.

![An author's post is committed to the post store and published to a topic, two fan-out workers append post ids to the timeline cache, and the Feed API serves a reader with one cache read, hydrating the ids from the post store](https://milanjovanovic.tech/blogs/mnw_207/fan_out_on_write.png)

Five decisions make this hold up in production:

- **Store ids, not posts.** Twitter capped home timelines at roughly 800 entries, and 800 ids is about 10 KB per user: 100 million users fit in a terabyte of cache. Full 2 KB post documents would need 160 TB.
- **Enforce policy at hydration.** Deleted posts drop out as hydration misses, block filters run on every request, and an unfollow needs no cleanup: the author's entries age out past the cap.
- **The projection is disposable.** A lost timeline is rebuilt from the post store with the naive query, once per cold user. The catch: a dead cache node sends every user on it cold at once, so cap rebuild concurrency or the post store inherits a read storm.
- **Publish the event if and only if the post commits.** Publish before commit and you announce posts that don't exist; publish after and a crash can lose the event. The [**Outbox pattern**](/milanjovanovic.tech/implementing-the-outbox-pattern.md) closes both gaps.
- **Chunk the fan-out.** [**Competing consumers**](/milanjovanovic.tech/nats-jetstream-job-queue-dotnet.md) parallelize across posts, not within one, so a big expansion is split into follower-range sub-jobs that workers share. Appends are [**idempotent**](/milanjovanovic.tech/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.md), keyed by post id, so a redelivered chunk touches nothing already written.

The tradeoff: **eventual consistency**. The first user to notice is the author: they publish, refresh, and their own post is missing.

The fix is read-your-own-writes at the feed edge: the Feed API merges the reader's own recent posts in at read time. Followers seeing a post a few seconds late is the part nobody notices.

---

## Write Amplification

Fan-out on write has a multiplier hiding in step 3: every publish costs one timeline write per follower.

For an account with 300 followers, that's 300 small cache appends. Cheap.

But follower counts follow a power-law distribution. An account with 50 million followers publishes once, and the workers now owe the cache 50 million writes.

The 60-to-1 ratio justified paying per write because writes were rare and each append was cheap. A post that becomes 50 million appends, most of them into timelines nobody will open, breaks both premises. Even the expansion is heavy: 50 million follower rows paged out of the graph store just to know where to write.

While the workers grind through it, two things go wrong for everyone else:

- **Consumer lag.** The celebrity's chunks tie up worker capacity for minutes, the backlog ages, and every feed behind it goes stale.
- **Cache churn.** Allocating timeline entries for tens of millions of mostly inactive followers pressures the cache, and warm timelines are evicted to make room.

![A celebrity post at the head of the topic ties up the fan-out workers with 50 million cache appends, while the backlog of ordinary posts behind it grows and warm feeds are evicted from the timeline cache](https://milanjovanovic.tech/blogs/mnw_207/write_amplification.png)

Two mitigations come before a redesign. Fan out only to followers who were active recently, and rebuild dormant timelines on their next visit (the disposable projection already paid for that path). Route the biggest accounts to their own queue, so ordinary posts stop waiting behind them.

What neither does is shrink the work: the biggest accounts still owe millions of writes per post, and the cache pressure lands regardless.

---

## Hybrid Fan-Out

No single strategy serves both ends of a power-law distribution.

Ordinary authors keep fan-out on write. Bounded follower sets make write-time work cheap, and reads stay one lookup.

Celebrity authors switch to a narrow form of fan-out on read. Their posts are appended to a compact **celebrity index**, keyed by author, and publishing becomes one write regardless of follower count.

At read time, the Feed API merges the user's materialized timeline with recent candidates from the celebrity indexes they follow, deduplicates, and hydrates. A follower-count threshold or cost model decides which path an author uses.

![Ordinary posts flow through the topic to fan-out workers that write follower timelines, celebrity posts land in a compact celebrity index with one write per post, and the Feed API merges both sources at read time before returning the feed to the reader](https://milanjovanovic.tech/blogs/mnw_207/hybrid_feed.png)

Twitter described this same architecture publicly years ago: home timelines materialized in [<VPIcon icon="iconfont icon-redis"/>Redis](https://redis.io) by fan-out workers, with the highest-follower accounts merged in at read time.

The tradeoffs:

- **Reads get more complex and less predictable.** A user following many celebrity accounts pays multiple index reads and a bigger merge on every page.
- **Pagination needs a cursor per source.** Where the merge stopped in the timeline, plus the last id consumed from each celebrity index. Resuming each source from its own position is what keeps a mid-scroll post from duplicating or vanishing.
- **The threshold flaps.** Promotion can put a post in both sources, which the merge deduplicates by post id. Demotion is the dangerous direction: posts that live only in the index vanish from feeds unless you backfill them into follower timelines or keep merging the demoted index for a grace window.

---

## Ranked Feeds

Everything so far assumes reverse-chronological order, which is the feed that Twitter talk describes. None of the big networks ship that as the default anymore.

A ranked feed keeps the same plumbing and adds a funnel on the read path:

1. **Candidate generation.** The materialized timeline and celebrity indexes become candidate sources, joined by out-of-network sources: posts from accounts you don't follow, retrieved by embedding similarity and graph signals.
2. **Light ranking.** A cheap model trims thousands of candidates to a few hundred, because the good model is too expensive to run on everything.
3. **Heavy ranking.** A neural model scores each surviving post by predicting engagement probabilities (like, reply, repost, dwell time) and combining them into one weighted score.
4. **Re-ranking.** Product rules run last: author diversity, integrity filters, blocked-content removal, ad slots.

![The timeline cache, celebrity index, and out-of-network sources feed candidate generation, a light ranker trims thousands of posts to a few hundred, a heavy ranker scores them by predicted engagement, and re-ranking rules produce the final page](https://milanjovanovic.tech/blogs/mnw_207/ranked_feed_funnel.png)

When Twitter open-sourced its recommendation algorithm in 2023, this was the shape: roughly half the candidates in-network, half out-of-network, funneled through a light ranker into a neural "heavy ranker" that predicts engagement.

None of it replaces the fan-out machinery. The timeline you materialized is still there; it became one candidate source among several, and the merge became a scoring stage.

---

## Operating the Pipeline

Most of this system is asynchronous, so operating it means watching lag rather than error rates.

- **Consumer lag.** The age of the oldest unprocessed publish event. The first number to alarm on.
- **Fan-out writes per post, by author.** The number a per-author throttle acts on. One author dominating worker time means the celebrity threshold is set wrong.
- **Commit-to-visible latency.** From transaction commit until the post shows up in follower timelines, tracked at a high percentile. The first follower gets it in milliseconds; the 50 millionth is the number that matters.
- **Feed cache hit rate.** A dropping hit rate is the early symptom of cache churn.

![The pipeline from Post API through topic, workers, and timeline cache to the Feed API, annotated with the lag metric each stage exposes and a commit-to-visible latency span across the whole path](https://milanjovanovic.tech/blogs/mnw_207/pipeline_metrics.png)

---

## Summary

The whole progression:

- **Fan-out on read**: the feed is a query; fine until the read-to-write ratio makes it the most expensive path in the product.
- **Single writer**: one transactional boundary, so every committed post produces exactly one event.
- **Fan-out on write**: materialize timelines at publish time; reads become one lookup, and the projection stays disposable.
- **Write amplification**: one celebrity post becomes 50 million writes, and everyone else pays.
- **Hybrid fan-out**: ordinary authors fan out on write; celebrity posts sit in a compact index that the Feed API merges in at read time.

If you'd rather design this than read about it, I just launched **System Design Studio** on [<VPIcon icon="fas fa-globe"/>Katabench](https://katabench.com/system-design). You wire components on a canvas, and a grader checks your topology, then explains what it can and cannot prove.

The three challenges behind this article (the write path, timeline fan-out, celebrity fan-out) are free. Start with the celebrity fan-out, and hit reply if the grader disagrees with you.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Do You Build a Social Media Feed? (System Design)",
  "desc": "The home feed looks like the easiest feature in a social app: fetch posts from the accounts you follow, sort, return a page.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloghow-do-you-build-a-social-media-feed-system-design.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
