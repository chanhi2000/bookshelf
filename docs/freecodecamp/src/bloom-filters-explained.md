---
lang: en-US
title: "Bloom Filters Explained: The Probabilistic Data Structure Powering Instagram, Google, and High-Scale Systems"
description: "Article(s) > Bloom Filters Explained: The Probabilistic Data Structure Powering Instagram, Google, and High-Scale Systems"
icon: fas fa-database
category:
  - Dart
  - Flutter
  - C#
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - c#
  - cs
  - csharp
  - dotnet
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Bloom Filters Explained: The Probabilistic Data Structure Powering Instagram, Google, and High-Scale Systems"
    - property: og:description
      content: "Bloom Filters Explained: The Probabilistic Data Structure Powering Instagram, Google, and High-Scale Systems"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/bloom-filters-explained.html
prev: /articles/README.md
date: 2026-09-01
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e3025afa-a736-4dd0-923b-e6ea8508f030.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Bloom Filters Explained: The Probabilistic Data Structure Powering Instagram, Google, and High-Scale Systems"
  desc="Instagram has over 500 million registered usernames. When a new user tries to register, the platform needs to answer one question almost instantly: has this username already been taken? The naïve answ"
  url="https://freecodecamp.org/news/bloom-filters-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e3025afa-a736-4dd0-923b-e6ea8508f030.png"/>

Instagram has over 500 million registered usernames. When a new user tries to register, the platform needs to answer one question almost instantly: has this username already been taken?

The naïve answer is a database query. Pull the users table, search for the username, return whether it exists. This works fine at small scale. But at 500 million records, queried millions of times every day, it becomes a serious bottleneck. Even with indexing, the database is doing expensive work for every single registration attempt.

Luckily, there's a smarter approach. Before the database is ever touched, you ask a different system a much faster question. That system gives you one of two answers:

::: important

**Definitely not here:** This is guaranteed. Zero exceptions. The username is available and you can skip the database entirely.

**Probably here:** This is not guaranteed. The username might be taken, or this might be a false alarm. You need to confirm with the database.

:::

That system is a Bloom Filter. It can't tell you with certainty that something exists. But it can tell you with absolute certainty that something does **not** exist. And in systems at scale, that one-sided guarantee eliminates the vast majority of expensive database queries.

::: note Prerequisites

Before reading this article, you should be comfortable with:

- Basic data structures: arrays and how indexing works
- What a hash function is at a conceptual level: a function that takes an input and produces a fixed-size output
- Basic programming concepts in either Dart or C#

You don't need to understand database internals or distributed systems deeply. Where these appear in this article, they serve only to illustrate why Bloom Filters matter in real engineering.

:::

---

## What is a Bloom Filter?

A Bloom Filter is a probabilistic data structure that represents a set without storing the actual values in that set.

The word probabilistic is the important one. Unlike a regular set or a database, a Bloom Filter doesn't give you definitive answers about membership. It gives you probabilistic answers. And the probability is deliberately asymmetric:

It will never tell you something is absent when it's actually present. This is called having no false negatives.

It might occasionally tell you something is present when it is actually absent. This is called a false positive. The rate at which this happens is small, controlled, and mathematically predictable.

This asymmetry is what makes Bloom Filters useful. The "definitely not here" answer is trustworthy. The "probably here" answer is a signal to go confirm elsewhere.

---

## The Two Components of a Bloom Filter

A Bloom Filter is built from two things.

### 1. A bit array

A fixed-size array of bits, all initialized to zero. This is the entire storage of the filter. Not strings or objects, just bits. Zeros and ones.

```plaintext
Position: 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
Value:     0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0
```

The size of this array is chosen based on how many items you expect to store and what false positive rate you can tolerate. A larger array means fewer false positives but more memory.

### 2. Multiple hash functions

There are typically three to seven hash functions. Each one takes an input and produces a number that maps to a position in the bit array. Different hash functions produce different positions for the same input.

The hash functions must be fast, independent of each other, and distribute their outputs uniformly across the bit array. The quality of the hash functions directly affects the false positive rate.

---

## How Adding an Item Works

To add the username "seyi_codes" to the filter, you run it through all three hash functions:

```plaintext
hash1("seyi_codes") = 3
hash2("seyi_codes") = 7
hash3("seyi_codes") = 11
```

You set those three positions in the bit array to 1:

```plaintext
Position: 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
Value:     0  0  0  1  0  0  0  1  0  0  0  1  0  0  0  0
                    ^           ^              ^
                  hash1       hash2          hash3
```

The username "seyi_codes" is now represented in the filter. But the string itself is stored nowhere. Only the fact that positions 3, 7, and 11 were set by something.

Now add a second username "aderonke":

```plaintext
hash1("aderonke") = 1
hash2("aderonke") = 7
hash3("aderonke") = 13
```

```plaintext
Position: 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
Value:     0  1  0  1  0  0  0  1  0  0  0  1  0  1  0  0
              ^     ^           ^              ^     ^
```

Position 7 was already set by "seyi_codes" and gets set again by "aderonke". This is normal. Bits can be shared across multiple items. This sharing is also the source of false positives. We'll talk a bit more about this below.

---

## How Checking an Item Works

To check whether a username exists in the filter, you run it through the same hash functions and check whether all the resulting positions are set to 1. #### Checking "seyi_codes" which was added:

```plaintext
hash1("seyi_codes") = 3  → bit[3] = 1  ✓
hash2("seyi_codes") = 7  → bit[7] = 1  ✓
hash3("seyi_codes") = 11 → bit[11] = 1 ✓
```

All three positions are 1. The filter says "probably here." We confirm with the database, and see that the username is taken.

### Checking "john_doe" which was never added:

```plaintext
hash1("john_doe") = 2  → bit[2] = 0  ✗
```

The very first hash returned a position that is still 0. We stop immediately. The filter says "definitely not here." We don't check the remaining hash functions. We don't touch the database. The username is available.

This early exit is critical to understanding why Bloom Filters are fast. The moment any hash function returns a 0 bit, the check is over. An item that was actually added would have set all its positions to 1. A 0 anywhere proves the item was never added.

---

## False Positives Explained

Here's where the probabilistic part becomes concrete.

Check the username "tiwa_codes" which was never added:

```plaintext
hash1("tiwa_codes") = 3  → bit[3] = 1  ✓  (set by seyi_codes)
hash2("tiwa_codes") = 7  → bit[7] = 1  ✓  (set by seyi_codes and aderonke)
hash3("tiwa_codes") = 13 → bit[13] = 1 ✓  (set by aderonke)
```

All three positions are 1. The filter says "probably here." But "tiwa_codes" was never added. The bits at positions 3, 7, and 13 were set by other usernames. "tiwa_codes" happened to hash to positions that were already occupied.

This is a false positive. The filter is wrong. But it's wrong in the acceptable direction. It said "probably here" when the answer is actually "not here." We go to the database, confirm the username is actually available, and proceed.

The filter never makes the opposite mistake. It will never say "definitely not here" for something that was actually added, because adding an item sets all its positions to 1, and the check verifies all positions are 1. ---

## Why You Can't Delete From a Bloom Filter

Deletion isn't possible in a standard Bloom Filter.

If you tried to delete "seyi_codes" by flipping its bits back to 0, you would flip position 7 back to 0. But position 7 is also used by "aderonke." Now "aderonke" would appear to be absent from the filter even though it was never removed.

This is a fundamental limitation. The filter doesn't track which item set which bit. Bits are shared. Removing one item's bits would corrupt the representation of other items.

Variations like the Counting Bloom Filter solve this by storing a count at each position instead of a single bit (and incrementing the count on add and decrementing on delete). But counting filters use significantly more memory.

---

## The False Positive Rate

The false positive rate isn't random. It's determined mathematically by three parameters:

**m** is the size of the bit array. A larger array means more positions available, fewer collisions, lower false positive rate, and more memory consumed.

**n** is the number of items added to the filter. As more items are added, more bits are set to 1. More bits set to 1 means more positions are already occupied by other items, which means higher probability of false positives.

**k** is the number of hash functions. More hash functions means each item leaves a more specific fingerprint. Initially this reduces false positives. But as the array fills up, more hash functions means more positions to check, each of which has a higher probability of already being set.

For a filter with a 1% false positive rate representing 100 million items, you need approximately 958 million bits (about 120 megabytes). The actual usernames stored as strings would require several gigabytes. The filter achieves a 95% reduction in memory by storing fingerprints instead of values.

For most production systems, a false positive rate between 0.1% and 1% strikes the right balance. At 1%, 99% of "username available" queries never touch the database. The 1% that are false positives go to the database for confirmation and get resolved correctly there.

---

## Implementation in Dart

This is an educational implementation showing the mechanics of how a Bloom Filter works. In production systems, Bloom Filters are built into the infrastructure layers (databases, caches, or CDNs) rather than implemented at the application level.

```dart :collapsed-lines
import 'dart:typed_data';

class BloomFilter {
  final Uint8List _bitArray;
  final int _size;
  final int _hashCount;

  BloomFilter({required int size, required int hashCount})
      : _size = size,
        _hashCount = hashCount,
        _bitArray = Uint8List((size / 8).ceil());

  // set a bit at the given position
  void _setBit(int position) {
    final byteIndex = position ~/ 8;
    final bitIndex = position % 8;
    _bitArray[byteIndex] |= (1 << bitIndex);
  }

  // check if a bit is set at the given position
  bool _getBit(int position) {
    final byteIndex = position ~/ 8;
    final bitIndex = position % 8;
    return (_bitArray[byteIndex] & (1 << bitIndex)) != 0;
  }

  // generate k hash positions for a given value
  List<int> _getHashPositions(String value) {
    final positions = <int>[];

    for (int i = 0; i < _hashCount; i++) {
      int hash = 0;
      final input = '$i:$value'; 

      for (final char in input.codeUnits) {
        hash = (hash * 31 + char) & 0x7FFFFFFF;
      }

      positions.add(hash % _size);
    }

    return positions;
  }

  // add an item to the filter
  void add(String value) {
    for (final position in _getHashPositions(value)) {
      _setBit(position);
    }
  }

  // check if an item might be in the filter
  // returns false: definitely NOT in the set
  // returns true: PROBABLY in the set (may be a false positive)
  bool mightContain(String value) {
    for (final position in _getHashPositions(value)) {
      if (!_getBit(position)) {
        return false; 
      }
    }
    return true; 
  }
}
```

Let's walk through the key decisions in this implementation.

First, `Uint8List` is used for the bit array instead of a `List<bool>`. A `List<bool>` in Dart allocates a full object per element. A `Uint8List` packs 8 bits per byte, which is how Bloom Filters achieve their memory efficiency. The `_setBit` and `_getBit` methods handle the byte and bit index arithmetic.

`_getHashPositions` generates k different positions for a given value by seeding each hash function differently using the index i. Prepending `'$i:$value'` ensures each of the k hash functions produces a different result for the same input. The result is taken modulo `_size` to map the hash to a valid bit position in the filter.

`mightContain` returns false the moment any position is not set. This is the early exit that makes checking fast. If all positions are set, it returns true, which means the item is probably in the set but might be a false positive.

**Using the Bloom Filter:**

```dart :collapsed-lines
void main() {
  // filter sized for roughly 1000 items with low false positive rate
  final filter = BloomFilter(size: 10000, hashCount: 3);

  // add usernames to the filter
  final registeredUsernames = [
    'seyi_codes',
    'aderonke_dev',
    'inioluwa_tech',
    'tiwaloluwa',
    'flutter_ninja',
  ];

  for (final username in registeredUsernames) {
    filter.add(username);
    print('Added: $username');
  }

  print('');

  // check some usernames
  final usernamesToCheck = [
    'seyi_codes',      // was added — should return true
    'aderonke_dev',    // was added — should return true
    'john_doe',        // was not added — should return false
    'new_user_123',    // was not added — should return false
    'random_handle',   // was not added — should return false
  ];

  for (final username in usernamesToCheck) {
    final result = filter.mightContain(username);
    if (result) {
      print('$username: PROBABLY taken — confirm with database');
    } else {
      print('$username: DEFINITELY available — skip the database');
    }
  }
}
// 
// Added: seyi_codes
// Added: aderonke_dev
// Added: inioluwa_tech
// Added: tiwaloluwa
// Added: flutter_ninja
// 
// seyi_codes: PROBABLY taken — confirm with database
// aderonke_dev: PROBABLY taken — confirm with database
// john_doe: DEFINITELY available — skip the database
// new_user_123: DEFINITELY available — skip the database
// random_handle: DEFINITELY available — skip the database
```

The items that were added return "probably taken" and would trigger a database confirmation. The items that were never added return "definitely available" and skip the database entirely.

### Simulating the false positive rate:

```cs
void measureFalsePositiveRate() {
  final filter = BloomFilter(size: 1000, hashCount: 3);
  final random = Random();

  // add 100 items
  final addedItems = <String>{};
  for (int i = 0; i < 100; i++) {
    final item = 'user_$i';
    filter.add(item);
    addedItems.add(item);
  }

  // check 1000 items that were never added
  int falsePositives = 0;
  int totalChecks = 1000;

  for (int i = 100; i < 100 + totalChecks; i++) {
    final item = 'user_$i'; 
    if (filter.mightContain(item)) {
      falsePositives++;
    }
  }

  final rate = (falsePositives / totalChecks * 100).toStringAsFixed(2);
  print('False positive rate: $rate% ($falsePositives out of $totalChecks)');
}
```

Running this demonstrates that false positives are real but controlled. Change the filter size and hash count and you can observe the false positive rate change accordingly.

---

## Implementation in C#

```cs :collapsed-lines
using System;
using System.Collections;
using System.Text;

public class BloomFilter
{
    private readonly BitArray _bitArray;
    private readonly int _size;
    private readonly int _hashCount;

    public BloomFilter(int size, int hashCount)
    {
        _size = size;
        _hashCount = hashCount;
        _bitArray = new BitArray(size);
    }

    private int[] GetHashPositions(string value)
    {
        var positions = new int[_hashCount];

        for (int i = 0; i < _hashCount; i++)
        {
            var input = $"{i}:{value}";
            var bytes = Encoding.UTF8.GetBytes(input);

            int hash = 0;
            foreach (var b in bytes)
            {
                hash = (hash * 31 + b) & 0x7FFFFFFF;
            }

            positions[i] = hash % _size;
        }

        return positions;
    }

    public void Add(string value)
    {
        foreach (var position in GetHashPositions(value))
        {
            _bitArray[position] = true;
        }
    }

    // false  = definitely NOT in the set
    // true   = PROBABLY in the set
    public bool MightContain(string value)
    {
        foreach (var position in GetHashPositions(value))
        {
            if (!_bitArray[position])
                return false;
        }
        return true;
    }
}
```

C# provides `BitArray` from `System.Collections` which handles the bit-level storage natively. The logic is identical to the Dart implementation: the same hashing approach, the same early exit on a zero bit, and the same probabilistic return value.

### Using it in a realistic C# API scenario:

```cs :collapsed-lines
public class UsernameService
{
    private readonly BloomFilter _bloomFilter;
    private readonly IUserRepository _userRepository;

    public UsernameService(IUserRepository userRepository)
    {
        _userRepository = userRepository;

        // sized for 10 million usernames, ~1% false positive rate
        _bloomFilter = new BloomFilter(size: 95_850_584, hashCount: 7);

        // populate the filter from existing usernames on startup
        LoadExistingUsernames();
    }

    private void LoadExistingUsernames()
    {
        // stream usernames from database to avoid loading all into memory
        foreach (var username in _userRepository.StreamAllUsernames())
        {
            _bloomFilter.Add(username);
        }
    }

    public async Task<bool> IsUsernameAvailableAsync(string username)
    {
        // check the filter first — O(k) where k is the number of hash functions
        if (!_bloomFilter.MightContain(username))
        {
            // definitely not taken — no database query needed
            return true;
        }

        // probably taken — confirm with the database
        // this handles both true positives and false positives
        var existingUser = await _userRepository.FindByUsernameAsync(username);
        return existingUser == null;
    }

    public async Task RegisterUsernameAsync(string username)
    {
        // add to the filter when a new username is registered
        _bloomFilter.Add(username);
        await _userRepository.CreateUserAsync(username);
    }
}
```

This is the pattern used in production systems. The Bloom Filter sits in front of the database. Most username availability checks never reach the database. The ones that do are either true positives (username is actually taken) or false positives (the filter was wrong, but the database confirms that the username is actually available).

The service adds new usernames to both the filter and the database on registration. On startup, it populates the filter from existing database records by streaming them rather than loading all into memory at once.

---

## Where Bloom Filters Are Used in Real Systems

### Instagram and Twitter: Username Availability

The filter is checked before any database query. A "definitely not here" result skips the database entirely. A "probably here" result triggers a database confirmation. The vast majority of registration attempts get resolved without touching the database.

### Google Chrome: Safe Browsing

Chrome ships with a Bloom Filter of known malicious URLs embedded directly in the browser. When you visit any URL, Chrome checks the local filter first. If the filter says "definitely not malicious," no network request is made. If it says "probably malicious," Chrome contacts Google's servers to confirm. Billions of URL checks happen locally with zero network latency.

### Apache Cassandra

Each SSTable (storage file on disk) has an associated Bloom Filter in memory. When querying for a key, Cassandra checks the filter for each SSTable first. A "definitely not here" result means Cassandra skips that SSTable entirely, avoiding an expensive disk read. This is one of the primary reasons Cassandra can sustain high read throughput on large datasets.

### Medium: Recommendation Engine

Medium tracks which articles each user has already read using Bloom Filters. Before recommending an article, the filter is checked. A "definitely not read" result means the article is a candidate for recommendation. The filter prevents the same article from being recommended to a user who has already seen it, without storing the entire read history in a queryable database for every recommendation request.

### Akamai CDN: Cache Management

Akamai uses Bloom Filters to identify one-hit wonders: content that's requested only once and isn't worth caching. When content is requested for the first time, it's added to the filter. If it appears in the filter on a subsequent request, it might be worth caching. Content that never appears twice in the filter isn't cached, saving expensive cache storage for content that actually benefits from it.

---

## When to Use a Bloom Filter

Use a Bloom Filter when you need to check membership in a very large set and the cost of false positives is low.

The ideal scenario is one where a "definitely not here" answer lets you skip an expensive operation entirely, like a database query, network request, disk read, or cache miss. If the cost of that operation is significant and most checks return "not here," a Bloom Filter can eliminate the majority of those expensive operations.

You can also use it when memory efficiency matters. When the set is so large that storing the actual values would be prohibitively expensive in memory, a Bloom Filter represents that set in a fraction of the space.

And it's a good fit when false positives are acceptable and recoverable. If a false positive means one extra database query, that's acceptable. If a false positive means data loss or incorrect behavior, a Bloom Filter isn't the right tool.

---

## When Not to Use It

Don't use a Bloom Filter when you need exact membership testing with no false positives. A hash set or a database index gives you exact answers. If the cost of a false positive isn't acceptable, use an exact data structure.

Don't use it when you need to retrieve the actual stored values. A Bloom Filter stores no values. You can't get anything back from it except a yes or no answer.

It's also not a good idea when items need to be deletable. Standard Bloom Filters don't support deletion. If your use case requires removing items from the set, use a Counting Bloom Filter or a different data structure entirely.

Finally, don't use it for small sets. If the set is small enough that a hash set fits comfortably in memory, use a hash set. The complexity of a Bloom Filter isn't justified when an exact solution is available at the same memory cost.

---

## Conclusion

A Bloom Filter solves a specific problem with unusual elegance. When the set is enormous and checking membership against it directly is expensive, the filter acts as a fast, memory-efficient pre-check.

It tells you with absolute certainty when something is not in the set. That certainty is what makes it valuable. Every "definitely not here" answer is a database query avoided, a network request saved, and a disk read skipped.

The false positives are the price of that efficiency. A small, controlled, mathematically predictable rate of wrong answers in the "probably here" direction. Wrong in the direction that costs you one extra confirmation. Never wrong in the direction that causes you to miss something that was actually there.

Instagram uses this to protect a database with 500 million rows. Google uses this to check malicious URLs without a network request. Cassandra uses this to skip disk reads on terabytes of data. The pattern is the same in every case: an expensive operation sits behind a fast, probabilistic gate. The gate lets through only what needs to go through.

That's what a Bloom Filter does. And that's why it's one of the most quietly powerful data structures in modern systems engineering.

Understanding this definitely equips your architectural decision for large systems query and data set.

Happy Coding!!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Bloom Filters Explained: The Probabilistic Data Structure Powering Instagram, Google, and High-Scale Systems",
  "desc": "Instagram has over 500 million registered usernames. When a new user tries to register, the platform needs to answer one question almost instantly: has this username already been taken? The naïve answ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/bloom-filters-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
