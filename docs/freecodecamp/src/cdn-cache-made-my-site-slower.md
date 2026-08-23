---
lang: en-US
title: "I Added a CDN Cache to My Site and It Got Slower. Here's the Math I Should Have Done First."
description: "Article(s) > I Added a CDN Cache to My Site and It Got Slower. Here's the Math I Should Have Done First."
icon: fas fa-network-wired
category:
  - DevOps
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
head:
  - - meta:
    - property: og:title
      content: "Article(s) > I Added a CDN Cache to My Site and It Got Slower. Here's the Math I Should Have Done First."
    - property: og:description
      content: "I Added a CDN Cache to My Site and It Got Slower. Here's the Math I Should Have Done First."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/cdn-cache-made-my-site-slower.html
prev: /devops/articles/README.md
date: 2026-08-28
isOriginal: false
author:
  - name: Javeed Shaik
    url: https://freecodecamp.org/news/author/javeedshaik7/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0d81b7df-9dbd-4288-80c5-3ea40551fe4a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="I Added a CDN Cache to My Site and It Got Slower. Here's the Math I Should Have Done First."
  desc="Last week I put a CDN cache in front of a static site, expecting it to get faster. But instead, it got measurably slower. Not subtly: an independent crawler that had flagged 38 slow pages before the c"
  url="https://freecodecamp.org/news/cdn-cache-made-my-site-slower"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0d81b7df-9dbd-4288-80c5-3ea40551fe4a.png"/>

Last week I put a CDN cache in front of a static site, expecting it to get faster.

But instead, it got measurably slower. Not subtly: an independent crawler that had flagged 38 slow pages before the change flagged **75** after it.

I reverted it the same day. This is what happened, why it happened, and the one calculation that would have told me not to bother before I deployed anything.

::: note Prerequisites

You don't need to have run a CDN before. But this will make more sense if you're comfortable with:

- **What a CDN does at a high level:** it keeps copies of your pages on servers around the world and serves each visitor from a nearby one.
- **Basic HTTP caching headers:** roughly what `Cache-Control` and `max-age` are for. I explain `s-maxage` and `must-revalidate` where they come up.
- **Reading a** `curl` **command:** every measurement in this article is a one-line `curl` you can run against your own site.

:::

No Cloudflare-specific knowledge is assumed, and there's nothing to install. The core lesson is arithmetic, and it applies to any CDN.

---

## The Setup

The site is a static Astro build: 77 HTML pages, no server-side rendering, and no database. It sits behind Cloudflare on the free plan, with an origin server in Navi Mumbai. Traffic is modest: roughly 9 visitors a day.

Google Search Console reported an **average response time of 711 ms**. Google's own guidance is 200 ms. That's 3.5× over, and it looked like an obvious problem with an obvious cause.

The cause was real: Cloudflare was caching **none** of the HTML:

```sh
curl -sI https://example.com/ | grep -i 'cache-control|cf-cache-status'
#
# cache-control: no-cache
# cf-cache-status: DYNAMIC
```

`DYNAMIC` means Cloudflare isn't caching the response at all. Every single HTML request (from every visitor and every crawler on earth) was traveling all the way to Mumbai.

The origin was sending `Cache-Control: no-cache`, which was a deliberate choice by past-me so that deploys would be visible immediately. Static assets (JS, CSS, fonts, and images) were cached fine. Only the HTML was passing through.

So: origin far away, HTML uncached, and a metric saying responses were slow. Cache the HTML at the edge and the problem goes away. Right?

---

## What I Changed

I changed two things, in this order.

**1. The origin header.** From `no-cache` to:

```plaintext
Cache-Control: public, max-age=0, s-maxage=31536000, must-revalidate
```

This is a useful pattern worth knowing. `max-age=0, must-revalidate` means **browsers** revalidate on every request, so a deploy is instantly visible to users, exactly what `no-cache` guaranteed. But `s-maxage` applies **only to shared caches**, which lets a CDN hold the object for a year while browsers keep checking.

**2. A Cloudflare Cache Rule.** Here's a detail that surprised me: the header alone does nothing. Cloudflare won't cache extensionless HTML on the strength of your `Cache-Control` header. I verified this on a throwaway path rather than assuming it:

```plaintext
req 1: cf-cache-status: DYNAMIC
req 2: cf-cache-status: DYNAMIC
req 3: cf-cache-status: DYNAMIC
```

Five requests, with `s-maxage` set to a year, still `DYNAMIC` every time. You need an explicit Cache Rule marking the response *eligible for cache*. That's actually a useful property. It means you can ship the header change safely, well ahead of switching caching on.

With the rule deployed, it worked exactly as intended:

```plaintext
req 1: cf-cache-status: MISS
req 2: cf-cache-status: HIT
req 3: cf-cache-status: HIT
```

And it looked like a win. Time to first byte on a warm page dropped from ~0.28 s to ~0.17 s.

I was measuring from India. The origin is in India. **Hold that thought.**

---

## The Result

The next crawl came back worse. Same site, same day, and the same 80 URLs:

| Crawl | HTML caching | Slow pages flagged |
| --- | --- | --- |
| 11:58 AM | off | **38** |
| 6:04 PM | on | **75** |

Nearly double. I had made the exact metric I was trying to fix substantially worse.

---

## Why it Backfired, Part One: a MISS is Not Free

The mental model I had was that caching is a coin flip between two outcomes: a HIT, which is fast, and a MISS, which costs the same as having no cache at all.

That second half is wrong. On a MISS, the CDN doesn't just proxy your response through. It has to **store** the object as it streams. That work costs something.

I measured it by purging the cache and then fetching the same pages two ways: through Cloudflare, and straight to the origin IP with `--resolve`.

```sh
# through Cloudflare, cache cold
curl -s -o /dev/null -w '%{time_starttransfer}' https://example.com/page

# straight to origin, bypassing Cloudflare entirely
curl -sk -o /dev/null -w '%{time_starttransfer}' --resolve example.com:443:203.0.113.10 https://example.com/page
```

Across six pages:

| path | TTFB |
| --- | --- |
| warm HIT | **0.239 s** |
| **cold MISS** | **0.366 s** |
| straight to origin (no caching) | **0.281 s** |

A cache MISS was **~85 ms slower** than simply not caching. Which means every request that misses is now *worse off* than it was before I started.

---

## Why it Backfired, Part Two: Crawlers Are Always Cold

A cache only pays off when the same URL is requested again while it's still cached, at the same edge location.

A crawler doesn't do that. It fetches each URL **once**.

I could verify this precisely, and the technique is worth stealing: **if a request is served from the CDN's cache, it never reaches your origin.** So the origin access log is a direct measurement of your miss rate.

```sh
grep -ic "crawler-user-agent" /var/log/nginx/access.log
```

During the crawl of ~80 URLs, my origin logged **~82 requests**. Every single page the crawler asked for was a miss. A **0% hit rate**, and every one of those misses now carried the extra ~85 ms.

The same logic applies to first-time human visitors, who are also, by definition, arriving cold.

---

## The Calculation I Should've Done First

Here's the whole thing, and it takes about a minute.

You have three numbers:

- $\text{H}$: time on a cache hit
- $\text{M}$: time on a cache miss
- $\text{B}$: your baseline, the time with no caching at all

Caching only wins when your average request beats the baseline:

$$
h\times{H}+\left(1−h\right)\times{\text{M}}<\text{B}
$$

Solve for the hit rate `h`:

$$
h>\frac{\left(\text{M}−\text{B}\right)}{\left(\text{M}−\text{H}\right)}
$$

For my numbers:

$$
\begin{align*}
h>&\frac{\left(0.366−0.281\right)}{\left(0.366−0.239\right)}
h>&\frac{0.085}{0.127}
h>&0.67
\end{align*}
$$

**I needed a 67% cache hit rate just to break even.**

Now the reality check. 77 pages, and about 9 visitors a day, plus a search crawler refetching each page every few days. Call it 35 HTML requests a day, spread across 77 URLs *and* across many edge locations worldwide. And a full cache purge on every deploy.

The realistic hit rate is close to zero. I needed 67%.

The change was never going to work, and I could have known that before writing a line of config.

---

## The Part That Stings

The diagnosis was correct. The origin genuinely is far from most of the traffic. The HTML genuinely wasn't cached. The 711 ms was real.

I just picked a fix without asking **what fraction of requests would actually benefit from it**.

And my verification made it worse, because I measured from a laptop sitting in the same country as the origin. Local `curl` timings said the change was a success. Only the external crawler – the thing that raised the issue in the first place – showed the regression.

So just make sure you **verify against the metric that flagged the problem, not a proxy for it.**

---

## A Technique Worth Keeping

One piece of this survived the revert, and it's genuinely useful.

If you cache HTML at the edge, your deploy pipeline must purge that cache. And **an API call returning** `"success": true` **isn't evidence the cache actually dropped anything.** So don't trust it. Check.

```sh
LOCAL=$(shasum -a 256 dist/index.html | cut -d' ' -f1)
LIVE=$(curl -s https://example.com/ | shasum -a 256 | cut -d' ' -f1)

if [ "$LOCAL" != "$LIVE" ]; then
  echo "EDGE IS STALE — this deploy is not live" >&2
  exit 3
fi
```

That compares the bytes your CDN is actually serving against the bytes you just built. It's the difference between "the purge API said OK" and "the site is genuinely updated."

A related trap: if those hashes *never* match, suspect a feature that rewrites HTML at the edge (script optimizers, email obfuscation, auto-minification) before you suspect the cache.

Better still, don't hardcode the assumption that caching is on. Ask:

```sh
STATE=$(curl -sI https://example.com/ | tr -d '\r' | awk 'tolower($1)=="cf-cache-status:"{print $2}')

case "$STATE" in
  DYNAMIC|BYPASS) echo "HTML isn't cached; a missing purge is harmless" ;;
  *)              echo "HTML IS cached — a failed purge means this deploy is invisible" ;;
esac
```

Now the check corrects itself when someone toggles the cache rule, instead of quietly rotting.

---

## What I'd Tell You to Do Instead

Calculate your break-even hit rate before you deploy. `(M − B) / (M − H)`. If you can't plausibly reach it, stop.

Estimate your real hit rate honestly. Requests per day, divided across your URLs, divided again across edge locations, reset on every deploy. It's usually far lower than it feels.

Measure from where your users and crawlers actually are, not from the machine next to your origin.

Remember caching is a popularity bet. It rewards sites where the same URLs are requested repeatedly, in a short window. A high-traffic site would have won here comfortably. A 9-visitors-a-day site never could.

And if you're staring at a slow origin far from your audience, the honest answer might not be a cache at all. It might be moving the origin.

::: info About Author

I write about the engineering behind [<VPIcon icon="fas fa-globe"/>Healthy Calculator Hub](https://healthycalculatorhub.com), a set of free health and fitness calculators — including, evidently, the optimizations that don't work.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "I Added a CDN Cache to My Site and It Got Slower. Here's the Math I Should Have Done First.",
  "desc": "Last week I put a CDN cache in front of a static site, expecting it to get faster. But instead, it got measurably slower. Not subtly: an independent crawler that had flagged 38 slow pages before the c",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/cdn-cache-made-my-site-slower.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
