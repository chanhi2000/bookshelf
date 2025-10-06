---
lang: en-US
title: "Mistake #5: Memory Fragmentation"
description: "Article(s) > (5/8) Why Your Code is Slow: Common Performance Mistakes Beginners Make"
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
      content: "Article(s) > (5/8) Why Your Code is Slow: Common Performance Mistakes Beginners Make"
    - property: og:description
      content: "Mistake #5: Memory Fragmentation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/why-your-code-is-slow-common-performance-mistakes-beginners-make/mistake-5-memory-fragmentation.html
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
  url="https://freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make#heading-mistake-5-memory-fragmentation"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png"/>

You’ve optimized your algorithms. You’ve nailed Big O. Yet your app still crashes with “out of memory” errors or slows to a crawl over time. The culprit? Memory fragmentation—a ghost in the machine that most developers ignore until it’s too late.

::: important What’s Happening Under the Hood

When your code allocates and frees memory blocks of varying sizes, it leaves behind a patchwork of free and used spaces. Over time, this creates a Swiss cheese effect in your RAM: plenty of total free memory, but no contiguous blocks for new allocations.

:::

::: tip Example

Imagine a C++ server that handles requests by allocating buffers of random sizes:

```cpp
void process_request() {  
    // Allocate a buffer of random size between 1-1024 bytes  
    char* buffer = new char[rand() % 1024 + 1];  
    // ... process ...  
    delete[] buffer;  
}
```

After millions of requests, your memory looks like this:

`[USED][FREE][USED][FREE][USED][FREE]...`

Now, when you try to allocate a 2KB buffer, it fails—not because there’s no space, but because no single free block is large enough.

:::

::: info How to Fix it:

Use a memory pool to allocate fixed-size blocks:

```cpp
class MemoryPool {  
public:  
    MemoryPool(size_t block_size) : block_size_(block_size) {}  
    void* allocate() { /* get a pre-allocated block */ }  
    void deallocate(void* ptr) { /* return block to pool */ }  
};  

// All requests use buffers of fixed size (1024 bytes)  
MemoryPool pool(1024);  
void process_request() {  
    char* buffer = static_cast<char*>(pool.allocate());  
    // ... process ...  
    pool.deallocate(buffer);  
}
```

By standardizing block sizes, you eliminate fragmentation.

:::

---

## The Autoboxing Trap (Java, C#, and so on)

::: important What’s Happening?

In languages that mix primitives (like `int`, `float`) and objects (like `Integer`, `Double`), converting a primitive to its object wrapper is called **autoboxing**. It feels harmless, but in hot loops, it’s a performance disaster.

:::

::: tip Example

```java
// Slow: Creates 1,000,000 Integer objects (and garbage!)
List<Integer> list = new ArrayList<>();
for (int i = 0; i < 1_000_000; i++) {  
    list.add(i);  // Autoboxing 'i' to Integer  
}
```

**Why this hurts performance**:

- **Memory overhead:** Each `Integer` object adds 16-24 bytes of extra memory (object headers, pointers). With 1,000,000 numbers, that’s an extra 16-24MB wasted just on overhead.
- **Garbage collection (GC) pressure:** Since objects are allocated on the heap, the GC constantly cleans up old `Integer` objects, leading to latency spikes.
- **CPU cache inefficiency:** Primitives like `int` are tightly packed in memory, but `Integer` objects are scattered across the heap with extra indirection, wrecking cache locality.

:::

---

## The Fix: Use Primitive Collections

To avoid autoboxing, use data structures that store raw primitives instead of objects. In Java, Eclipse Collections provides primitive-friendly lists like `IntList` that store raw `int` values directly.

::: tip Example: The Faster Version (Primitive Collections)

```java
// Import primitive-friendly collection
import org.eclipse.collections.api.list.primitive.IntList;
import org.eclipse.collections.impl.list.mutable.primitive.IntArrayList;  

// Use IntArrayList to store raw ints
IntList list = new IntArrayList();  
for (int i = 0; i < 1_000_000; i++) {  
    list.add(i);  // No autoboxing! Stores raw 'int'  
}
```

**How this fix works:**

- Stores raw `int` values instead of `Integer` objects, eliminating memory overhead.
- Avoids heap allocations, so the garbage collector doesn’t get involved.
- Keeps numbers tightly packed in memory, improving CPU cache efficiency.

:::

::: info The Fix for <FontIcon icon="iconfont icon-csharp"/>C#

In C#, you can avoid unnecessary heap allocations by using `struct`s and `Span<T>`, which keep data on the stack or in contiguous memory rather than the heap.

```c#
// Span<T> avoids heap allocations  
Span<int> numbers = stackalloc int[1_000_000];  
for (int i = 0; i < numbers.Length; i++) {  
    numbers[i] = i;  // No boxing, no heap allocation  
}
```

No object wrappers. No GC pressure. Just performance.

:::
