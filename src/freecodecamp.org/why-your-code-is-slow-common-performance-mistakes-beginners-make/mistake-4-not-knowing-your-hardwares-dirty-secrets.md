---
lang: en-US
title: "Mistake #4: Not Knowing Your Hardware’s Dirty Secrets"
description: "Article(s) > (4/8) Why Your Code is Slow: Common Performance Mistakes Beginners Make"
icon: fa-brands fa-python
category:
  - Python
  - Java
  - C#
  - C++
  - C
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - java
  - c#
  - csharp
  - c++
  - cpp
  - c
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (4/8) Why Your Code is Slow: Common Performance Mistakes Beginners Make"
    - property: og:description
      content: "Mistake #4: Not Knowing Your Hardware’s Dirty Secrets"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-your-code-is-slow-common-performance-mistakes-beginners-make/mistake-4-not-knowing-your-hardwares-dirty-secrets.html
date: 2025-03-29
isOriginal: false
author:
  - name: Rahul
    url : https://freecodecamp.org/news/author/RAHULISM/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Why Your Code is Slow: Common Performance Mistakes Beginners Make",
  "desc": "Maybe you’ve experienced something like this before: you’ve written code that works, but when you hit “run,” it takes forever. You stare at the spinner, wondering if it’s faster to just solve the problem by hand. But you end up looking something like...",
  "link": "/freecodecamp.org/why-your-code-is-slow-common-performance-mistakes-beginners-make/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why Your Code is Slow: Common Performance Mistakes Beginners Make"
  desc="Maybe you’ve experienced something like this before: you’ve written code that works, but when you hit “run,” it takes forever. You stare at the spinner, wondering if it’s faster to just solve the problem by hand. But you end up looking something like..."
  url="https://freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make#heading-mistake-4-not-knowing-your-hardwares-dirty-secrets"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png"/>

Your code doesn’t run in a magical fairyland—it runs on real hardware. CPUs, memory, and caches have quirks that can turn “logically fast” code into a sluggish mess. Here’s what most tutorials won’t tell you:

---

## Problem 1: The CPU’s Crystal Ball is Broken (Memory Prefetching)

::: tabs

@tab:active What you think happens

*“I’m looping through data sequentially. The CPU should predict what I need next!”*

@tab What actually happens

Modern CPUs have a memory prefetcher—a smart assistant that tries to guess which memory locations you’ll need next and loads them in advance.

But here’s the catch: If your access pattern is too random, the prefetcher gives up. Instead of smoothly fetching data ahead of time, the CPU is left waiting, like someone stuck refreshing Google Maps on a broken internet connection or blind date.

This happens a lot with linked lists and hash tables, where memory jumps around unpredictably.

:::

::: tip Example

```py
# Linked list traversal (random memory jumps)  
class Node:  
    def __init__(self, val):  
        self.val = val  
        self.next = None  

head = Node(0)  
current = head  
for _ in range(100000):  # Each 'next' points to a random memory location  
    current.next = Node(0)  
    current = current.next  

# Walking this list = 100,000 cache misses
```

**Why this hurts**

Each time the CPU needs the next `Node`, it has to fetch it from a random memory location, making prefetching useless and causing frequent cache misses.

:::

::: info The Fix: Use Contiguous Data Structures

Instead of using a linked list, store your data in a contiguous memory block (like an array or NumPy array). This way, the CPU can easily prefetch the next elements in sequence, speeding things up.

```py
# Array traversal (prefetcher-friendly)  
data = [0] * 100000  # Contiguous memory  
for item in data:  
    pass  # CPU prefetches next elements seamlessly
```

**Why this is better:**

- The CPU efficiently prefetches upcoming values instead of waiting.
- Fewer cache misses = way faster execution.
- Hot loops (loops that run millions of times) get a huge performance boost.

:::

📌 **Hot loops** are loops that execute a massive number of times, like those in data processing, AI models, and game engines. Even a small speedup in a hot loop can dramatically improve overall performance.

---

## Problem 2: The Invisible Tax of Memory Pages (TLB Thrashing)

::: tabs

@tab:active What you think happens:

*“My 10GB dataset is just… there. Accessing it is free, right?”*

@tab What actually happens:

Your OS splits memory into 4KB pages. Every time your program accesses a new memory page, the CPU consults a Translation Lookaside Buffer (TLB)—a “phonebook” for fast page lookups.

If your program jumps between too many pages, you get TLB misses, and the CPU wastes cycles waiting for the OS to fetch memory mappings.

:::

::: tip Example:

```py
# Iterating a giant list with random access  
data = [x for x in range(10_000_000)]  
total = 0  
for i in random_indexes:  # 1,000,000 random jumps  
    total += data[i]  # Each jump likely hits a new page
```

**Why this hurts**

- TLB misses can add 10-100 CPU cycles per access.
- If you have millions of random accesses, that’s billions of wasted cycles.

:::

::: info The Fix: Process Data in Chunks

To reduce TLB misses:

- **Process data in chunks** (for example, 4096 elements at a time) instead of randomly jumping around.
- **Use huge pages** (2MB instead of 4KB) so that more data fits in each memory page.

:::

---

## Problem 3: Your Code is a Tourist in the Wrong CPU Neighborhood (NUMA)

::: tabs

@tab:active What you think happens

*“My 64-core server is a speed paradise!”*

@tab What actually happens:

On multi-socket servers, memory is divided into NUMA (Non-Uniform Memory Access) zones. Each CPU socket has its own local memory, and accessing memory from another socket is slow—like ordering Uber Eats from another city.

:::

::: tip Example

```py
# Running this on a 2-socket server:  
from multiprocessing import Pool  
import numpy as np  

def process(chunk):  
    data = np.load("giant_array.npy")  # Allocated on Socket 1's RAM  
    return chunk * data  # If process runs on Socket 2's CPU... ouch  

with Pool(64) as p:  
    p.map(process, big_data)  # 64 cores fighting over remote RAM
```

**Why this hurts**

- Accessing memory from another NUMA zone can be 2-4x slower.
- Your 64 cores end up waiting for memory instead of actually computing.

:::

::: info The Fix: Pin Processes to NUMA-Aware Memory

Instead of letting your processes randomly access memory, you can pin them to the correct NUMA node.

- Use `numactl` on Linux to allocate memory near the CPU that will use it.
- Use `numba`-aware libraries in NumPy to ensure data is allocated optimally.

:::

---

## Problem 4: The CPU is a Drama Queen (Speculative Execution)

::: tabs

@tab:active What you think happens

*“My code runs in the order I wrote it!”*

@tab What actually happens:

CPUs speculatively execute code ahead of time. If they guess wrong, they have to rollback everything and restart, which slows things down.

:::

::: tip Example

```cpp
// Unpredictable branches = CPU's worst nightmare  
if (rare_condition) {  // 99% of the time, this is false  
    do_work();  
}
```

**Why this hurts**

A branch misprediction wastes 15-20 cycles. In hot loops, this can really hurt performance.

::: info The Fix: Make Branches Predictable

Sort data to help the CPU make better predictions:

```py
# Process all 'valid' items first, then 'invalid' ones  
sorted_data = sorted(data, key=lambda x: x.is_valid, reverse=True)  
for item in sorted_data:  
    if item.is_valid:  # CPU learns the pattern → accurate predictions  
        process(item)
```

**Why This Works:**

- Branching becomes predictable—the CPU stops guessing wrong.
- Sorting ahead of time reduces rollbacks and wasted cycles.

:::

---

## How to Fight Back

Here’s how you can stop your CPU from sabotaging your code:

::: tabs

@tab:active 1.

Treat Memory Like a Highway: Cache lines matter. Keep data contiguous so the CPU doesn’t have to search for it.

@tab 2.

Profile with `perf`: Use Linux’s `perf` tool to spot cache misses, page faults, and TLB thrashing:

```bash
perf stat -e cache-misses,page-faults ./your_code
```

@tab 3.

Assume Nothing. Benchmark Everything: CPUs have a thousand undocumented behaviors. Test different data layouts, loop structures, and memory allocations to see what’s fastest.

:::
