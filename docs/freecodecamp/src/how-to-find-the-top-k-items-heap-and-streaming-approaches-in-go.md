---
lang: en-US
title: "How to Find the Top-K Items: Heap and Streaming Approaches in Go"
description: "Article(s) > How to Find the Top-K Items: Heap and Streaming Approaches in Go"
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
      content: "Article(s) > How to Find the Top-K Items: Heap and Streaming Approaches in Go"
    - property: og:description
      content: "How to Find the Top-K Items: Heap and Streaming Approaches in Go"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-find-the-top-k-items-heap-and-streaming-approaches-in-go.html
prev: /programming/go/articles/README.md
date: 2026-03-11
isOriginal: false
author:
  - name: Gabor Koos
    url: https://freecodecamp.org/news/author/gkoos/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4cf09440-765e-416a-8d15-ff12496f595d.png
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
  name="How to Find the Top-K Items: Heap and Streaming Approaches in Go"
  desc="Finding the top K items in a dataset pops up everywhere: from highlighting the hottest posts in a social feed, to detecting the largest transactions in a financial system, or spotting the heaviest use"
  url="https://freecodecamp.org/news/how-to-find-the-top-k-items-heap-and-streaming-approaches-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4cf09440-765e-416a-8d15-ff12496f595d.png"/>

Finding the top K items in a dataset pops up everywhere: from highlighting the hottest posts in a social feed, to detecting the largest transactions in a financial system, or spotting the heaviest users in a telemetry stream.

At first glance, you might think sorting everything and picking the top K is fine, but that approach quickly becomes a bottleneck as data grows or flows in continuously.

In this article, we'll explore **heap-based** and **streaming** approaches in Go that keep only the elements that matter. You'll see how to process data efficiently, maintain bounded memory, and make performance predictable - even when datasets are massive or unending.

The theory is language-agnostic, but we'll use Go's `container/heap` package to demonstrate the implementation details.

By the end, you'll have a practical toolkit for top-K queries that works in real-world applications, from dashboards to analytics pipelines.

::: note Prerequisites

To get the most out of this tutorial, you should be familiar with:

- **Basic data structures**: especially **heaps / priority queues**. I'll explain the minimum you need, but prior exposure helps.
- **Big O notation**: understanding time and space [<VPIcon icon="fa-brands fa-wikipedia-w"/>complexity](https://en.wikipedia.org/wiki/Big_O_notation) will help you appreciate the efficiency of different approaches.
- **Basic Go programming**: variables, slices, loops, and functions.
- **Arrays and slices**: understanding how to traverse and manipulate collections.
- **Sorting concepts**: knowing what it means to sort a collection, even if you don't implement it yourself.
- **Channels (optional)**: for the streaming example, a basic understanding of Go channels will make it easier to follow.

If some of these are unfamiliar, you can still follow the article, but you may need to refer to the Go [<VPIcon icon="fa-brands fa-golang"/>documentation](https://go.dev/doc/) or basic tutorials to fill in the gaps. This tutorial is designed to be hands-on and practical, so I'll explain the key concepts as we go.

:::

---

## The Problem and the Naïve Approach

Let's start with a simple example. Suppose we have a list of user scores:

```go
scores := []int{50, 20, 80, 70, 60}
```

And we want to find the top 3 scores. The naïve approach is to

1. **Sort the entire slice** in ascending or descending order.
2. **Select the last K elements** (or first K, depending on sort order).

```go
package main

import (
    "fmt"
    "sort"
)

func main() {
    scores := []int{50, 20, 80, 70, 60}
    sort.Sort(sort.Reverse(sort.IntSlice(scores))) // sort descending
    top3 := scores[:3]
    fmt.Println(top3) // Output: [80 70 60]
}
```

Sorting the entire dataset takes O(n log n) time, even if we only need the top-K elements. For small datasets, this is fine, but for large datasets or streams, sorting everything is unnecessary and can waste both CPU and memory.

This motivates more efficient strategies, such as *heap-based* or *streaming* approaches, which maintain only the top-K elements as we traverse the data.

---

## Efficient Top-K Algorithms in Go

Instead of sorting the entire dataset, we can use a *min-heap* to efficiently maintain the top-K elements.

### What is a Min-Heap?

A min-heap is a [<VPIcon icon="fas fa-globe"/>complete binary tree](https://geeksforgeeks.org/dsa/complete-binary-tree/) where **the value of each node is less than or equal to the values of its children**. For example:

![Min-Heap Example](https://cdn.hashnode.com/uploads/covers/68b08746916c71e1ed2db58e/14776800-bbaa-4f79-98f5-abdb16b8c004.webp)

In a min-heap, the smallest element is always at the root. This property allows us to efficiently maintain the top-K largest elements by **keeping a min-heap of size K**.

Once the heap is full, if a new element is less than or equal to the root (the smallest top-K score), we reject it. If it's greater, we replace the root (which is no longer in the top-K) and **re-heapify** to restore the min-heap property.

Re-heapifying is the **repair step** after that replacement. Since we overwrite the root, the min-heap rule can be violated at the top of the tree.

To fix it, we inspect both children to find the smaller one, and only then decide whether to swap: if the parent is greater than that smaller child, we swap with that child and continue this *sift-down* process. We never swap with the larger child first, because that could still leave a smaller child above a larger parent and break the min-heap property.

The process stops when the parent is less than or equal to both children (or when we reach a leaf). Because each swap moves one level down, the repair touches at most the height of the heap, so it takes O(log K) time.

The following diagram illustrates the process: we insert 35 into a heap of size 5 containing 10, 15, 20, 25 and 30:

![Heap Insertion Example](https://cdn.hashnode.com/uploads/covers/68b08746916c71e1ed2db58e/0cdf7205-ade8-4432-aeff-150d88a3a8de.webp)

::: info How it works for Top-K

1. Maintain a min-heap of size K.
2. Fill the heap with the first K elements.
3. For each remaining element, compare it with the root (`h[0]`, the smallest of the current top-K).
4. If it's not larger than the root, reject it in O(1). Otherwise replace the root and re-heapify in O(log K).
5. After processing all elements, the heap contains the top-K elements because smaller elements are continuously discarded.

:::

### Implementing a Min-Heap in Go

Go's standard library provides a `container/heap` package that makes it easy to implement a min-heap. Here's how we can use it to maintain the top-K scores:

```go :collapsed-lines
package main

import (
    "container/heap"
    "fmt"
)

type IntHeap []int
func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] } // min-heap
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func topK(nums []int, k int) []int {
    if k <= 0 {
        return []int{}
    }

    h := &IntHeap{}
    heap.Init(h)

    for _, num := range nums {
        if h.Len() < k {
            heap.Push(h, num)
            continue
        }

        // h[0] is the root of the min-heap (the smallest value in current top-K).
        // If num is not larger, we can reject it in O(1).
        if num <= (*h)[0] {
            continue
        }

        // Replace root and restore heap order in O(log K).
        (*h)[0] = num
        heap.Fix(h, 0)
    }

    result := make([]int, h.Len())
    for i := len(result)-1; i >= 0; i-- {
        result[i] = heap.Pop(h).(int)
    }
    return result
}

func main() {
    data := []int{50, 20, 80, 70, 60}
    fmt.Println(topK(data, 3)) // Output: [80 70 60]
}
```

In this implementation, we define an `IntHeap` type that implements the `heap.Interface`: the `Len`, `Less`, `Swap`, `Push`, and `Pop` methods.

- `IntHeap` is a slice of integers that represents our min-heap. A slice can represent a binary tree in a compact form, where the parent-child relationships are determined by indices (for a node at index `i`, its left child is at `2*i + 1` and its right child is at `2*i + 2`).
- `Len` returns the number of elements in the heap.
- `Less` defines the ordering for the heap, and since we want a min-heap, we return true if the element at index `i` is less than the element at index `j`.
- `Swap` swaps the elements at the given indices.
- `Push` adds a new element to the heap by appending it to the underlying slice.
- `heap.Pop(h)` removes and returns the smallest element from this min-heap. Internally, Go's `container/heap` first swaps the root with the last element, restores heap order, and then calls our `Pop` method, which removes and returns the last element of the underlying slice.

The `topK` function first fills the heap to size `K`. After that, it uses `h[0]` as a fast threshold check, because `h[0]` is always the root of the min-heap (the smallest value currently in the top-K set).

If a new number is less than or equal to `h[0]`, we reject it immediately in O(1). If it is larger, we replace the root and call `heap.Fix(h, 0)` to re-heapify in O(log K). `heap.Fix` restores heap order after a value change and may move the element down or up as needed. In this specific root-replacement case, it moves downward.

If `K` is larger than the number of input elements, `topK` simply returns all available elements, sorted in descending order.

Finally, we pop all elements while filling the result slice from right to left, so the returned top-K scores are in descending order.

### Streaming / Online Top-K

The same min-heap logic can be applied to **streaming data**. Instead of waiting for all values first, we process each item as it arrives:

1. Read one value from the stream.
2. If the heap has fewer than `K` elements, push the value.
3. Otherwise, compare with the root (`h[0]`): reject it if it's not larger, or replace the root and re-heapify.

At any moment, the heap contains the best `K` values seen so far. This is ideal for logs, metrics, event pipelines, or any unbounded input where storing everything isn't practical.

Below is a simple implementation using a channel to simulate incoming values (reusing the `IntHeap` type from the previous section):

```go :collapsed-lines
func topKFromStream(stream <-chan int, k int) []int {
    if k <= 0 {
        return []int{}
    }

    h := &IntHeap{}
    heap.Init(h)

    for value := range stream {
        if h.Len() < k {
            heap.Push(h, value)
            continue
        }

        if value <= (*h)[0] {
            continue
        }

        (*h)[0] = value
        heap.Fix(h, 0)
    }

    result := make([]int, h.Len())
    for i := len(result) - 1; i >= 0; i-- {
        result[i] = heap.Pop(h).(int)
    }
    return result
}

func main() {
    stream := make(chan int)

    go func() {
        defer close(stream)
        for _, v := range []int{50, 20, 80, 70, 60, 90, 10} {
            stream <- v
        }
    }()

    fmt.Println(topKFromStream(stream, 3)) // Output: [90 80 70]
}
```

This pattern gives you online top-K updates with **bounded memory** (you only need to store the top-K elements, not the whole dataset), while still returning a descending top-K result at the end.

If the stream ends before `K` elements arrive, `topKFromStream` returns all seen elements, sorted in descending order.

Of course, in a real application, you may want to handle edge cases (like empty streams, non-integer values (if you generalize the heap type), or concurrent access) and consider how to gracefully shut down the stream processing.

Note that although we chose Go for our examples, the same min-heap approach applies in any language with a priority queue or heap data structure, such as Python's `heapq`, Java's `PriorityQueue`, or C++'s `std::priority_queue`.

If your language doesn't have a built-in heap, you can implement one using an array and the standard heap operations (sift-up, sift-down). The core logic of maintaining a bounded heap of size K and using the root as a threshold remains consistent across implementations.

---

## Trade-offs & Practical Considerations

When implementing top-K queries, choosing the right strategy depends on dataset size, latency requirements, and memory limits. The same algorithm can behave very differently depending on whether data is small and static or large and continuously arriving.

### Memory Usage

With naive sorting, you must have the full dataset in memory before sorting. The min-heap approach uses O(K) working memory, since the heap never grows beyond K elements. This difference becomes especially important in streaming scenarios, where a heap lets you keep bounded memory no matter how many items eventually arrive.

### Time Complexity

A heap-based top-K computation runs in O(N log K), which is typically much cheaper than full sorting when K is far smaller than N. Full sorting remains O(N log N), even if you only need a tiny top slice at the end. With the optimized root check (`h[0]`), rejected values are O(1) after warmup, while accepted updates still cost O(log K), making throughput easier to reason about under load.

### Batch vs Streaming

In batch workloads, where all records are available up front, both full sorting and heap-based methods can work well. For smaller datasets, full sorting is often the simplest solution. As data grows larger - especially when K is much smaller than N - a heap-based approach reduces unnecessary work by avoiding a complete sort.

In streaming workloads, an online heap is typically the better fit. It processes each value as it arrives and maintains only the best K elements seen so far, which keeps memory usage bounded and avoids storing historical data that no longer matters.

In distributed systems, the pattern usually extends one step further: compute the top-K independently on each partition, then **merge** those partial results. With P partitions, this produces up to P × K candidate elements that need combining.

A straightforward approach is to push all candidates into another min-heap of size K, which takes O(PK log K) in the worst case. If each partition already returns its local top-K in sorted order, and the merge stage only needs to extract the final global top-K (not fully merge all P × K items), a heap-based [<VPIcon icon="fa-brands fa-wikipedia-w"/>k-way merge](https://en.wikipedia.org/wiki/K-way_merge_algorithm) over the P "heads" can do this in O(K log P) time, which is much more efficient.

At scale, the merge phase can still become a bottleneck, so practical systems carefully balance partition size, fan-out, and merge strategy to keep pipelines performant.

### Multi-dimensional Top-K

Some ranking problems are not one-dimensional. If ordering depends on multiple attributes, such as score, timestamp, and tie-breakers, you can still apply the same heap pattern by defining a custom comparator that captures your priority rules.

More advanced query types, such as [<VPIcon icon="fas fa-globe"/>skyline-style selection](https://blog.gaborkoos.com/posts/2025-07-31-Skyline-Queries-For-Non-Academics/), may require different techniques, but for many practical cases a carefully defined heap ordering remains a robust and efficient foundation.

---

## Conclusion

Top-K is a small problem that shows up in big systems. The difference between "sort everything" and "keep only what matters" may seem minor at first - until your dataset grows, your stream never ends, or your service needs to respond in milliseconds.

A min-heap turns the problem into a bounded one. Instead of scaling with the size of your data, your working set scales with K. That shift is what makes the approach powerful in practice, whether you're processing a batch job, consuming a live stream, or merging results across partitions.

Once you internalize this pattern, you'll start recognizing it everywhere: leaderboards, monitoring systems, analytics pipelines, ranking engines. The implementation is compact, the guarantees are clear, and the performance scales predictably - and that's usually what good engineering looks like.

From here, you can explore more advanced structures and techniques to tackle even bigger or more complex top-K challenges:

- **Max-heaps and dual heaps**: for sliding-window top-K or tracking both largest and smallest elements.
- **Order-statistics trees / augmented BSTs**: fast rank queries and updates in a sorted structure.
- **Skip lists with priorities**: probabilistic balancing and efficient streaming updates.

These advanced patterns build on the min-heap foundation, letting you handle larger datasets, tighter latency constraints, or more sophisticated ranking criteria. Mastering them will put you in a position to design truly high-performance, real-world ranking and analytics systems.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Find the Top-K Items: Heap and Streaming Approaches in Go",
  "desc": "Finding the top K items in a dataset pops up everywhere: from highlighting the hottest posts in a social feed, to detecting the largest transactions in a financial system, or spotting the heaviest use",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-find-the-top-k-items-heap-and-streaming-approaches-in-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
