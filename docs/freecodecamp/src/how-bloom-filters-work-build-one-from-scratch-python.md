---
lang: en-US
title: "How a Bloom Filter Works: Build One From Scratch in Python"
description: "Article(s) > How a Bloom Filter Works: Build One From Scratch in Python"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How a Bloom Filter Works: Build One From Scratch in Python"
    - property: og:description
      content: "How a Bloom Filter Works: Build One From Scratch in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-bloom-filters-work-build-one-from-scratch-python.html
prev: /programming/py/articles/README.md
date: 2026-06-29
isOriginal: false
author:
  - name: Prasanth Madhurapantula
    url: https://freecodecamp.org/news/author/catalysed/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c34b8589-9a73-4d91-9051-793cff8b2037.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How a Bloom Filter Works: Build One From Scratch in Python"
  desc="A Bloom filter gives you something that feels like magic: it can tell you whether an item is in a set of billions, using only a few kilobytes of memory. And it answers in the same tiny amount of time "
  url="https://freecodecamp.org/news/how-bloom-filters-work-build-one-from-scratch-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c34b8589-9a73-4d91-9051-793cff8b2037.png"/>

A Bloom filter gives you something that feels like magic: it can tell you whether an item is in a set of billions, using only a few kilobytes of memory. And it answers in the same tiny amount of time no matter how much you have stored.

That sounds impossible. A normal set has to remember every item, so its memory grows with the data. But a Bloom filter remembers almost nothing about the items themselves, yet it still answers membership questions. The catch is that it's allowed to be wrong in one specific, controllable direction.

It's not magic, and the moment you build one yourself, the trick becomes clear and you should understand exactly what it can and can't promise.

In this tutorial, we'll build a working Bloom filter from scratch in Python, using nothing but a list of bits and a couple of hash functions. By the end, you'll understand bit arrays, why we use several hashes, what a false positive is, the one guarantee a Bloom filter never breaks, and how to size one for a target error rate.

---

## What a Bloom Filter Actually Is

A Bloom filter is a **probabilistic data structure**. Its whole job is to answer one question, "is this item in the set?", and it gives one of only two answers:

- **Definitely not in the set.** This answer is always correct.
- **Possibly in the set.** This answer is usually correct, but it's occasionally wrong.

The surprising part is that it answers without storing the items at all. A normal set, like Python's `set` or a hash table, keeps every item it has seen, so its memory grows with both the number of items and the size of each one.

A Bloom filter keeps only a fixed row of bits. Its size is decided up front and never changes, whether you store short words or long URLs or whole files.

So a Bloom filter isn't really a container. It's closer to a **fingerprint of a set**. You can't ask it to list what's inside, or to hand an item back. You can only ask "have you probably seen this?", and you can trust its "no" completely.

A quick way to picture it: instead of keeping a guest list of names, you keep a wall of light switches. When a guest arrives, you flip a few switches chosen from their name. To check whether someone came, you look at their switches. If any one of them is off, they definitely never arrived. If all of them are on, they probably did, though someone else's name might have flipped those same switches.

That picture also explains why you would reach for one instead of a plain set. For a million URLs averaging fifty bytes each, a real set costs tens of megabytes and grows with the length of the URLs. A Bloom filter for the same million items at a one percent error rate costs about 1.2 megabytes, fixed, no matter how long the URLs are.

When the set is huge, has to live in memory on every machine, or holds large items, that saving is the difference between practical and impossible. The price is the rare false positive, and the usual pattern makes that cheap: a "no" skips an expensive lookup, and a "yes" just triggers the slower exact check you would have run anyway.

The rule of thumb: if you need exact answers, deletion, or the ability to list what is stored, use a real set. If you need a tiny, fast gate that sits in front of an expensive operation and reliably tells you when you can skip it, use a Bloom filter.

---

## A Short History

The structure is named after Burton Howard Bloom, who described it in a 1970 paper, [<VPIcon icon="fas fa-globe"/>"Space/Time Trade-offs in Hash Coding with Allowable Errors"](https://dl.acm.org/doi/10.1145/362686.362692), in Communications of the ACM.

His motivating example was wonderfully ordinary. A program that hyphenated and spell-checked text needed to look words up in a dictionary, and storing the whole dictionary in the tiny memories of 1970 was too expensive. Bloom's idea was to accept a small, controlled rate of mistakes in exchange for a large saving in space. That single trade, allow a little error and save a lot of memory, is why the structure still turns up in so many large systems more than fifty years later.

---

## Where Bloom Filters Are Used

You've very likely used software backed by a Bloom filter today. They're important in:

- **Databases and storage engines:** Cassandra, HBase, Bigtable, and many log-structured (LSM-tree) stores keep a Bloom filter for each on-disk file. Before a slow disk read, the engine asks the filter "could this key be in this file?" A "no" lets it skip the file entirely, which avoids a huge number of reads.
- **Safe browsing:** Early versions of Google Chrome checked each URL against a local Bloom filter of known-dangerous sites. A "no" meant safe, with no network call. A "yes" was rare and triggered a real check against the full list.
- **Caches and CDNs:** A common trick is to cache an item only after it has been requested at least twice. A Bloom filter cheaply remembers "have I seen this once before?", which filters out the flood of one-time requests.
- **Recommendations:** Medium has described using a Bloom filter to avoid recommending articles you've already read.
- **Networking and crypto:** Routers use them to spot duplicate packets, and early Bitcoin light clients used them to request relevant transactions without revealing exactly which addresses they cared about.

The shape is always the same. A Bloom filter stands in front of something expensive (a disk read, a network request, a database query) and turns most of those expensive checks into a couple of fast array reads. Now let's build one and see exactly how.

---

## The Core Idea: a Bit Array and a Few Hashes

A Bloom filter is built on two pieces:

1. A **bit array**: a long row of bits, all starting at 0.2. A handful of **hash functions** that each turn an item into a position in that array.

To **add** an item, you run it through each hash function, get several positions, and set the bit at each of those positions to 1. To **check** an item, you run it through the same hash functions and look at those same positions. If every one of them is 1, the item is "probably present". If even one is 0, the item is "definitely absent".

That second answer is the important one. If a bit is still 0, you know for certain you never added anything that would have set it. The filter never misses something it has actually seen.

Here's the whole structure in Python:

```py
import hashlib

class BloomFilter:
    def __init__(self, size, num_hashes):
        self.size = size              # number of bits in the array (m)
        self.num_hashes = num_hashes  # number of hash functions (k)
        self.bits = [0] * size        # every bit starts at 0
```

---

## Turning an Item into Positions

We need `num_hashes` different positions for each item, and they need to be spread out. A common, clean trick is **double hashing**: compute two independent hashes once, then combine them to produce as many positions as you need.

```py
def _positions(self, item):
    data = item.encode("utf-8")
    h1 = int.from_bytes(hashlib.sha256(data).digest()[:8], "big")
    h2 = int.from_bytes(hashlib.md5(data).digest()[:8], "big")
    for i in range(self.num_hashes):
        yield (h1 + i * h2) % self.size
```

Three things are happening:

- `sha256` and `h2` from `md5` give us two big numbers that are stable for the same string and look random across different strings.
- `h1 + i * h2` mixes them into a different value for each `i`, so the positions scatter instead of clumping together.
- `% self.size` folds each value into a valid index, from `0` to `size - 1`.

Run this for one item and you get `num_hashes` positions. Those positions are the item's fingerprint inside the filter.

---

## Adding and Checking

Adding sets the bit at every position. Checking asks whether they're all set.

```py
def add(self, item):
    for idx in self._positions(item):
        self.bits[idx] = 1

def __contains__(self, item):
    return all(self.bits[idx] for idx in self._positions(item))
```

Defining `__contains__` lets us use Python's natural `in` syntax. Let's try it:

```py
bf = BloomFilter(size=1000, num_hashes=4)
bf.add("alice")
bf.add("bob")

print("alice" in bf)   # True
print("bob" in bf)     # True
print("carol" in bf)   # almost always False
```

`"carol"` was never added, so at least one of its four bits is almost certainly still 0, and the filter reports absence. That's the common case. But notice the words "almost certainly". That hedge is the whole story of the next section.

---

## False Positives Are Normal

Bits are shared. With enough items added, the four bits that happen to encode `"carol"` might all have been set to 1 by other items, even though `"carol"` itself was never added. When that happens, the filter says "probably present" for something that's absent. That's a **false positive**.

People new to Bloom filters sometimes think this is a bug. It's not. It's the price you pay for using so little memory, and it's tunable. You can watch it happen by cramming many items into a small filter:

```py
bf = BloomFilter(size=200, num_hashes=4)
for i in range(100):
    bf.add(f"user-{i}")

# None of these were added, but some will sneak through as "present":
false_hits = sum(f"ghost-{i}" in bf for i in range(1000))
print(false_hits)  # a non-zero number: the false positive rate in action
```

The filter is never wrong in the other direction, though. Every `user-i` you added still returns `True`, because adding an item sets all of its bits, and those bits never get cleared. This is the one promise a Bloom filter always keeps:

- A "no" is always correct. No false negatives, ever.
- A "yes" might be wrong. False positives are possible.

That asymmetry is exactly what makes Bloom filters useful. A web browser can keep a Bloom filter of known-malicious URLs and check every link instantly. A "no" means the link is safe and needs no further work. A "yes" is rare and just triggers a slower, exact check against the real list. The filter turns most lookups into a couple of array reads.

---

## Sizing it for a Target Error Rate

The false positive rate depends on three numbers: the bit array size `m`, the number of items you expect to add `n`, and the number of hash functions `k`. The approximate false positive rate is:

```text
p = (1 - e^(-k*n/m)) ** k
```

You don't have to guess these. Given the number of items `n` and a target false positive rate `p` you can pick the best `m` and `k` directly:

```py
import math

def optimal_params(n, p):
    m = math.ceil(-n * math.log(p) / (math.log(2) ** 2))  # bits needed
    k = max(1, round((m / n) * math.log(2)))               # hashes to use
    return m, k

print(optimal_params(1_000_000, 0.01))  # about (9_585_059, 7)
```

Read that result carefully. To track one million items with a one percent error rate, you need roughly 9.6 million bits, which is about 1.2 megabytes, and 7 hash functions.

A real `set` of one million strings would cost far more, and most of that cost grows with the length of the strings. The Bloom filter doesn't care how long the items are, only how many there are.

---

## What it Cannot Do: Delete

There's one more honest limitation. You can't remove an item by clearing its bits, because those bits are shared. Clearing the bits for `"alice"` might also clear a bit that `"bob"` depends on, and now `"bob"` would wrongly report as absent, breaking the no-false-negatives promise.

If you need deletion, the standard fix is a **counting Bloom filter**, where each slot is a small counter instead of a single bit. Add increments the counters, remove decrements them, and a slot counts as "set" while its counter is above zero. It costs more memory, which is the usual trade.

---

## Putting it Together

Here's what we built and what it costs:

| Operation | Cost |
| --- | --- |
| `add` | $O\left(k\right)$ |
| `in` (check) | $O\left(k\right)$ |
| space | about `m` bits for `n` items, independent of item size |

The takeaways:

- A Bloom filter is a bit array plus a few hash functions. Adding sets `k` bits, checking asks whether those `k` bits are all set.
- A "no" is always correct. A "yes" can be a false positive, and the rate is something you tune with `m` and `k`.
- It's tiny and fast because it stores fingerprints, not the items, so it forgets what the items actually were.
- It can't delete without a counting variant, because bits are shared.

The next time a system tells you "this is definitely not in the cache, skip the lookup" or "this might be a known item, let me double-check", you'll know exactly what's underneath: a row of bits, a few hashes, and one carefully chosen direction in which it's allowed to be wrong.

If you enjoy learning data structures by building them rather than memorizing them, that's the idea behind a learn-by-doing platform I built called [<VPIcon icon="fas fa-globe"/>IWTLP](https://iwtlp.com), where this Bloom filter is one of the build-it-yourself exercises in the data engineering track.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How a Bloom Filter Works: Build One From Scratch in Python",
  "desc": "A Bloom filter gives you something that feels like magic: it can tell you whether an item is in a set of billions, using only a few kilobytes of memory. And it answers in the same tiny amount of time ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-bloom-filters-work-build-one-from-scratch-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
