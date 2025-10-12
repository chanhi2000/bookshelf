---
lang: en-US
title: "How to Work with Collections in Go Using the Standard Library Helpers"
description: "Article(s) > How to Work with Collections in Go Using the Standard Library Helpers"
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
      content: "Article(s) > How to Work with Collections in Go Using the Standard Library Helpers"
    - property: og:description
      content: "How to Work with Collections in Go Using the Standard Library Helpers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-work-with-collections-in-go-using-the-standard-library-helpers/
prev: /programming/go/articles/README.md
date: 2025-09-13
isOriginal: false
author:
  - name: Gabor Koos
    url : https://freecodecamp.org/news/author/gkoos/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757716951175/0969475a-acc5-4aa4-b2eb-fdb28ba62eee.png
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
  name="How to Work with Collections in Go Using the Standard Library Helpers"
  desc="In a previous article—Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types—we explored Go's three built-in collection types and how they work under the hood. That gave us the foundation for storing and accessing data efficiently. But in ..."
  url="https://freecodecamp.org/news/how-to-work-with-collections-in-go-using-the-standard-library-helpers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757716951175/0969475a-acc5-4aa4-b2eb-fdb28ba62eee.png"/>

In a previous article—[**Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types**](/freecodecamp.org/arrays-slices-and-maps-in-go-a-quick-guide-to-collection-types.md)—we explored Go's three built-in collection types and how they work under the hood. That gave us the foundation for storing and accessing data efficiently.

But in real programs, having the data is only the start. You usually need to sort a slice, search for an element, clone or compare collections, or even reach for higher-level data structures like heaps or rings. Writing all that by hand is tedious and error-prone.

If arrays, slices, and maps are the *nouns* of Go's collections, then the standard library helpers are the *verbs*. They let you do things with your data: sorting, searching, cloning, filtering, and transforming it in predictable and efficient ways.

Modern additions like the `slices` and `maps` packages (introduced in Go 1.21 and improved further in 1.25) give you type-safe, generic operations, while long-standing packages like `sort` and `container/heap` handle essentials such as ordering, searching, and priority queues.

In this article, we'll walk through these helpers with examples and case studies. By the end, you'll know how to manipulate collections idiomatically in Go, using the full power of the standard library.

### What We’ll Cover:

- [Sorting & Searching Collections](#heading-sorting-amp-searching-collections)
- [Collection Helpers: slices & maps](#heading-collection-helpers-slices-amp-maps)
- ["Classical" Data Structures with container/\*](#heading-classical-data-structures-with-container)
- [Specialized Utilities](#heading-specialized-utilities)
- [Case Study: A Simple Job Scheduler](#heading-case-study-a-simple-job-scheduler)

::: note Prerequisites

To follow along, you should:

- Be comfortable with Go basics like variables, functions, and structs.
- Have read the previous [**article**](/freecodecamp.org/arrays-slices-and-maps-in-go-a-quick-guide-to-collection-types.md) on arrays, slices, and maps, or already understand how these core collection types work.
- Have Go 1.25 or later installed on your system, so you can try out the modern slices and maps helpers as well as recent language improvements (at the time of writing).

:::

You don't need any prior knowledge of algorithms or data structures—everything we use from the standard library will be explained step by step.

---

## Sorting & Searching Collections

Sorting and searching are among the most common operations you'll perform on slices and arrays in Go. The standard library provides robust tools to make these tasks simple and efficient. In this section, we'll explore the `sort` and `slices` packages, with examples showing how to use them in practical scenarios.

### Sorting with `sort`

The `sort` package provides functions for sorting slices of basic types (`int`, `string`, `float64`) and a generic `sort.Slice` for custom types.

#### Sorting a slice of integers

```go
package main

import (
    "fmt"
    "sort"
)

func main() {
    scores := []int{42, 23, 17, 99, 56}

    // Sort in ascending order
    sort.Ints(scores)
    fmt.Println("Sorted scores:", scores)
}
// 
// Sorted scores: [17 23 42 56 99]
```

#### Sorting a slice of strings

```go
names := []string{"Alice", "Bob", "Charlie", "Diana"}
sort.Strings(names)
fmt.Println("Sorted names:", names)
//
// Sorted names: [Alice Bob Charlie Diana]
```

#### Reverse sorting

To sort in reverse order, first you have to convert the slice to a type that implements `sort.Interface`, such as `sort.IntSlice` or `sort.StringSlice`, and then use `sort.Reverse`:

```go
sort.Sort(sort.Reverse(sort.StringSlice(names)))
fmt.Println("Reverse sorted names:", names)
//
// Reverse sorted names: [Diana Charlie Bob Alice]
```

`sort.StringSlice` is a type that wraps a `[]string` and implements the `sort.Interface`, allowing you to use it with the `sort` package functions. Then, `sort.Reverse` takes that and provides a reversed ordering. Finally, `sort.Sort` performs the actual sorting.

::: note

Note that `sort.Reverse` doesn't actually reverse your slice first, it just tells Go to sort it in the opposite direction.

:::

#### Sorting by a custom criterion

For slices of structs or custom logic, use `sort.Slice` and provide a comparison function:

```go
type Player struct {
    Name  string
    Score int
}

players := []Player{
    {"Alice", 42},
    {"Bob", 99},
    {"Charlie", 17},
}

// Sort by Score descending
sort.Slice(players, func(i, j int) bool {
    return players[i].Score > players[j].Score
})

fmt.Println("Players sorted by score:", players)
//
// Players sorted by score: [{Bob 99} {Alice 42} {Charlie 17}]
```

Here, we pass the slice that we want to sort (`players`) and a comparison function to `sort.Slice`. The sorting works by calling your comparison function with two indices (`i` and `j`) repeatedly during the sorting process. Your function returns true if the element at index `i` should come before the element at index `j` in the final sorted order. In this case, `players[i].Score > players[j].Score` creates a descending sort because elements with higher scores are placed before elements with lower scores.

Sometimes you may want to sort a slice but keep the original order of equal elements. For that, use `sort.SliceStable`:

```go
sort.SliceStable(players, func(i, j int) bool {
    return players[i].Score > players[j].Score
})
```

This ensures that if two players have the same score, their original order in the slice is preserved.

### Searching with `sort.Search`

Once a slice is sorted, `sort.Search` provides a convenient way to perform a binary search to find the index of the first element that satisfies a condition.

Binary search is a fast algorithm for finding a target value in a sorted array or list. It works by repeatedly dividing the search interval in half, compare the middle element to the target, then continue searching in the left or right half depending on the result. This approach reduces the search space quickly and finds the target in O(log n) time, making it much more efficient than linear search for large datasets. Here is a simple diagram to illustrate the binary search process:

![an image showing the steps involved in a binary search](https://i.imgur.com/teSktUu.png)

This provides a significant performance boost over linear search, especially for large datasets. Some common use cases include:

- Finding a threshold: Which player first reached a score of 50?
- Inserting while maintaining order: Where should we insert a new score so the leaderboard stays sorted?
- Filtering ranges: What is the first element above a certain value?

::: tip Example: Finding the first score above a threshold

```go
scores := []int{17, 23, 42, 56, 99}
threshold := 50

// Find where the first score >= threshold occurs
index := sort.Search(len(scores), func(i int) bool {
    return scores[i] >= threshold
})

if index < len(scores) {
    fmt.Printf("First score >= %d is at index %d with value %d\n",
        threshold, index, scores[index])
}
else {
    fmt.Printf("No scores >= %d found\n", threshold)
}
//
// First score >= 50 is at index 3 with value 56
```

The index is practical: it tells us which player crosses the threshold first. We can use it to highlight that player, insert new scores, or extract a sublist.

What happens here if the threshold is higher than any score in the list? `sort.Search` will return the length of the slice, which is an out-of-bounds index. Always check the returned index before using it to avoid runtime panics.

:::

### Sorting and Searching with `slices`

The `slices` package provides convenient functions that simplify common slice operations, reduce boilerplate, and work with generic types.

```go
import (
    "fmt"
    "slices"
)

scores := []int{42, 23, 17, 99, 56}

// Sort in-place
slices.Sort(scores)
fmt.Println("Sorted scores:", scores)

// Binary search
index := slices.BinarySearch(scores, 56)
if index >= 0 {
    fmt.Println("Found 56 at index:", index)
} else {
    fmt.Println("56 not found")
}
//
// Sorted scores: [17 23 42 56 99]
// Found 56 at index: 3
```

The `slices.Sort` function sorts the slice in place, while `slices.BinarySearch` performs a binary search on the sorted slice. If the element is found, it returns its index; otherwise, it returns a negative value indicating the element is not present.

Why is `slices.Sort` more convenient? With the newer (Go 1.18+) `slices` package, you can sort and search using a single import, and it works with any ordered type - thanks to Go's generics. The API is also simpler for basic types, since you don't need to provide a comparison function.

Go's generics feature allows you to write functions that work with many types while maintaining type safety. The `slices` package uses generics so you can sort or search slices of `int`, `float64`, `string`, or any other ordered type, all with the same function call.

#### Sorting custom types

```go
type Player struct {
    Name  string
    Score int
}

players := []Player{
    {"Alice", 42},
    {"Bob", 99},
    {"Charlie", 17},
}

// Sort by Score descending
slices.SortFunc(players, func(a, b Player) int {
    return b.Score - a.Score
})

fmt.Println("Players sorted by score:", players)
//
// Players sorted by score: [{Bob 99} {Alice 42} {Charlie 17}]
```

Here, `slices.SortFunc` takes a comparison function that returns a negative value if `a` should come before `b`, zero if they are equal, and a positive value if `a` should come after `b`. This allows for flexible sorting criteria.

### Practical Example: Sorting a Leaderboard

```go
type Player struct {
    Name  string
    Score int
    Date  string // date achieved
}

func main() {
    leaderboard := []Player{
        {"Alice", 42, "2023-01-01"},
        {"Bob", 99, "2023-01-02"},
        {"Charlie", 17, "2023-01-03"},
        {"Diana", 56, "2023-01-04"},
    }

    // Sort descending by score
    slices.SortFunc(leaderboard, func(a, b Player) int {
        return b.Score - a.Score
    })

    fmt.Println("Top players:")
    for i, p := range leaderboard {
        fmt.Printf("%d: %s (%d points) - %s\n", i+1, p.Name, p.Score, p.Date)
    }
}
//
// Top players:
// 1: Bob (99 points) - 2023-01-02
// 2: Diana (56 points) - 2023-01-04
// 3: Alice (42 points) - 2023-01-01
// 4: Charlie (17 points) - 2023-01-03
```

In this example, we define a `Player` struct with a name, score, and date. We create a slice of players representing a leaderboard. Using `slices.SortFunc`, we sort the players in descending order by their scores. Finally, we print out the sorted leaderboard.

::: important Key Takeaways

- Use `sort.Ints`, `sort.Strings`, or `sort.Slice` for classic sorting tasks.
- Use `sort.Search` for binary searches on sorted slices.
- The `slices` package simplifies sorting and searching with generic, type-safe helpers.
- For structs, `SortFunc` or `slices.SortFunc` provides a clean way to define custom sort logic.
- Sorting is often the first step before applying other helpers like filtering, mapping, or priority queues.

:::

---

## Collection Helpers: `slices` & `maps`

Once you know how to store, sort, and search collections, the next step is manipulating them efficiently. Go's standard library provides modern, type-safe helpers in the `slices` and `maps` packages, which simplify common operations like cloning, filtering, deleting, and extracting keys or values.

### Slice Helpers

The `slices` package offers a variety of functions to work with slices in a more convenient way. You could see `slices.Sort` and `slices.BinarySearch` in the previous chapter - here are some other useful ones:

#### Cloning a slice

```go
import "slices"

original := []int{1, 2, 3, 4}
copy := slices.Clone(original)
copy[0] = 99

fmt.Println("Original:", original)
fmt.Println("Copy:", copy)
//
// Original: [1 2 3 4]
// Copy: [99 2 3 4]
```

Remember, slices are reference types in Go. Cloning avoids accidental mutation of the original slice when passing slices around.

#### Checking for containment and equality

```go
import "slices"

a := []int{1, 2, 3}
b := []int{1, 2, 3}
c := []int{4, 5, 6}

fmt.Println("Contains:", slices.Contains(a, 2))
fmt.Println("Equal:", slices.Equal(a, b))
fmt.Println("Equal:", slices.Equal(a, c))
//
//Contains: true
Equal: true
Equal: false
```

`slices.Contains` checks if a slice contains a specific element.

`slices.Equal` checks if two slices are equal in length and content. Note that `a == b` would return `false` because they are different slice headers, even though their contents are the same.

#### Inserting and deleting elements

```go
names := []string{"Alice", "Bob", "Charlie"}

// Insert "Diana" at index 1
names = slices.Insert(names, 1, "Diana")
fmt.Println(names) // [Alice Diana Bob Charlie]

// Remove element at index 2
names = slices.Delete(names, 2, 3)
fmt.Println(names) // [Alice Diana Charlie]
//
// [Alice Diana Bob Charlie]
// [Alice Diana Charlie]
```

`slices.Insert` adds an element at a specified index, shifting subsequent elements to the right.

`slices.Delete` removes elements in the range `[start, end)` (inclusive of `start` and exclusive of `end`), shifting subsequent elements to the left.

#### Finding min, max, sorting, and using binary search

Slices of *ordered types* can be queried for their minimum or maximum values, sorted, or searched using binary search.

Ordered types in Go are types that support comparison operators like `<`, `<=`, `>`, and `>=`. This includes built-in types such as integers (`int`, `int8`, `int16`, `int32`, `int64`), unsigned integers (`uint`, `uint8`, `uint16`, `uint32`, `uint64`), floating-point numbers (`float32`, `float64`), and strings. These types can be compared directly using these operators.

```go
scores := []int{42, 23, 17, 99, 56}

fmt.Println(slices.Min(scores))
fmt.Println(so are there any accuracy issues?
x(scores))
//
// 17
// 99
```

`slices.Min` and `slices.Max` return the minimum and maximum values in a slice of ordered types.

For sorting and binary search, we already saw `slices.Sort` and `slices.BinarySearch` in the previous chapter.

### Practical Example: Filtering a Slice

Suppose you want to remove all players with a score below 50:

```go
type Player struct {
    Name  string
    Score int
    Date  string // date achieved
}

players := []Player{
    {"Alice", 42, "2023-01-01"},
    {"Bob", 99, "2023-01-02"},
    {"Charlie", 17, "2023-01-03"},
    {"Diana", 56, "2023-01-04"},
}

// Filter out low scores
filtered := players[:0] // use the same underlying array
for _, p := range players {
    if p.Score >= 50 {
        filtered = append(filtered, p)
    }
}

fmt.Println(filtered)
//
// [{Bob 99 2023-01-02} {Diana 56 2023-01-04}]
```

Here, we create a new slice `filtered` that has zero length but shares the same underlying array as `players`. This means you can efficiently build up filtered by appending elements, without allocating a new array. Then, we iterate over `players`, appending only those with a score of 50 or higher to `filtered`. This approach is memory efficient since it avoids allocating a new array.

### Map Helpers

The `maps` package provides generic functions for working with maps: cloning, comparing, extracting keys/values, and more.

#### Extracting keys and values

```go
import "maps"

scores := map[string]int{
    "Alice":   42,
    "Bob":     99,
    "Charlie": 17,
}

// Get all keys
keys := maps.Keys(scores)
fmt.Println(keys) // [Alice Bob Charlie] (order not guaranteed!)

// Get all values
values := maps.Values(scores)
fmt.Println(values) // [42 99 17] (order not guaranteed!)
```

`maps.Keys` returns a slice of all keys in the map, while `maps.Values` returns a slice of all values.

Important to note: the order of keys and values returned by `maps.Keys` and `maps.Values` is not guaranteed, as Go maps do not maintain any specific order.

#### Cloning and comparing maps

```go
clone := maps.Clone(scores)
fmt.Println(clone)

equal := maps.Equal(scores, clone)
fmt.Println(equal) // true
//
// map[Alice:42 Bob:99 Charlie:17]
// true
```

`maps.Clone` creates a *shallow copy* of the map, meaning that the new map has its own set of keys and values, but if any of the values are reference types (like slices, pointers, or other maps), both maps will still point to the same underlying data for those values. Only the top-level map structure is duplicated, not the contents of any referenced objects.

`maps.Equal` checks if two maps have the same keys and values. It returns `true` if both maps contain exactly the same set of keys, and for each key, the corresponding value is also the same in both maps. The order of keys doesn't matter, only the content does. If any key or value differs, the maps are not considered equal.

#### Deleting with a condition

Say we want to remove all players with a score below 50 from a map:

```go
for name, score := range scores {
    if score < 50 {
        delete(scores, name)
    }
}
```

This iterates over the map and deletes entries that don't meet the condition. Note that modifying a map while iterating over it is safe in Go.

`maps.DeleteFunc` provides a functional-style alternative to the loop above:

```go
maps.DeleteFunc(scores, func(name string, score int) bool {
    return score < 50
})
```

Here, `maps.DeleteFunc` takes a predicate function that returns `true` for keys to delete. It abstracts away the loop and makes the intent clearer.

### Practical Example: Combining Slices & Maps

Imagine you have a configuration map and need to process keys in sorted order:

```go
config := map[string]string{
    "host":     "localhost",
    "port":     "8080",
    "protocol": "http",
    "timeout":  "30s",
    "retries":  "3",
    "logLevel": "debug",
}

// Extract and sort keys
keys := maps.Keys(config)
slices.Sort(keys)

for _, k := range keys {
    fmt.Printf("%s = %s\n", k, config[k])
}
//
// host = localhost
// logLevel = debug
// port = 8080
// protocol = http
// retries = 3
// timeout = 30s
```

This is a common pattern: `maps.Keys` + `slices.Sort` to process maps deterministically.

::: note Performance Notes

Both `slices` and `maps` functions are optimized for performance, but keep in mind:

- Most operations are $O\left(n\right)$ since they need to iterate over the entire collection.
- Cloning creates a shallow copy, which is fast but be cautious with reference types.
- Maps have average $O\left(1\right)$ access time, but worst-case $O\left(n\right)$ if many keys collide.

:::

::: important Key Takeaways

- The `slices` package provides type-safe, concise operations for cloning, inserting, deleting, and searching slices.
- The `maps` package makes it easy to extract keys/values, clone, compare, and conditionally delete map entries.
- Combining these helpers allows you to write clean, idiomatic, and expressive Go code without boilerplate loops.
- These helpers complement sorting/searching routines and prepare slices/maps for more advanced operations, like building priority queues or filtering datasets.

:::

---

## "Classical" Data Structures with `container/*`

While slices and maps cover most day-to-day needs, sometimes you need specialized data structures that provide predictable performance or specific behaviors. Go's standard library includes a few such structures under the `container\*` packages:

- `container/list`: a doubly linked list
- `container/heap`: a priority queue (min-heap by default)
- `container/ring`: a circular list

These aren't as commonly used as slices or maps, but they're valuable when you need efficient insertions, removals, or queue-like behavior.

### Doubly Linked Lists with `container/list`

A linked list is a sequence of elements where each element points to the next (and in the case of a doubly linked list, also to the previous).

- Inserting or removing elements is $O\left(1\right)$ once you have a reference.
- Access by index is $O\left(n\right)$ (slower than slices).
- Great for queues or when you need frequent insertions in the middle.

::: tip Basic usage

```go
import (
    "container/list"
    "fmt"
)

func main() {
    l := list.New()

    l.PushBack("Alice")
    l.PushBack("Bob")
    l.PushFront("Eve")

    for e := l.Front(); e != nil; e = e.Next() {
        fmt.Println(e.Value)
    }
}
//
// Eve
// Alice
// Bob
```

Here, we create a new doubly linked list and add elements to the front and back. We then iterate over the list from front to back, printing each element's value.

:::

#### Removing elements

```go
element := l.Front().Next() // Alice
l.Remove(element)           // remove Alice

for e := l.Front(); e != nil; e = e.Next() {
    fmt.Println(e.Value)
}
//
// Eve
// Bob
```

We remove the element "Alice" from the list by first getting a reference to it using `l.Front().Next()`, and then calling `l.Remove(element)`. After removal, we iterate over the list again to print the remaining elements.

::: info When to use list

- When you need frequent insertions/removals in the middle of a sequence.
- When you don't care about random access by index.
- Otherwise, slices are usually simpler and faster.

:::

### Priority Queues with `container/heap`

A heap is a specialized tree-based data structure that satisfies the heap property: in a min-heap, for any given node, the value of that node is less than or equal to the values of its children. This makes heaps ideal for implementing priority queues, where you want to efficiently retrieve and remove the highest (or lowest) priority element.

#### Implementing a priority queue

You define your own type that implements `heap.Interface`:

```go
import (
    "container/heap"
    "fmt"
)

// An Item holds a value and a priority
type Item struct {
    Value    string
    Priority int
}

// A PriorityQueue implements heap.Interface
type PriorityQueue []*Item // slice of pointers to Items

func (pq PriorityQueue) Len() int            { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool  { return pq[i].Priority < pq[j].Priority }
func (pq PriorityQueue) Swap(i, j int)       { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PriorityQueue) Push(x any)         { *pq = append(*pq, x.(*Item)) }
func (pq *PriorityQueue) Pop() any {
    old := *pq
    n := len(old)
    item := old[n-1]
    *pq = old[0 : n-1]
    return item
}
```

Here, we define an `Item` struct with a value and priority. The `PriorityQueue` type is a slice of pointers to `Item`. We implement the required methods for `heap.Interface`: `Len`, `Less`, `Swap`, `Push`, and `Pop`.

#### Using the priority queue

```go
func main() {
    pq := &PriorityQueue{}
    heap.Init(pq)

    heap.Push(pq, &Item{"write report", 3})
    heap.Push(pq, &Item{"fix bug", 1})
    heap.Push(pq, &Item{"reply to emails", 2})

    for pq.Len() > 0 {
        item := heap.Pop(pq).(*Item)
        fmt.Println(item.Priority, item.Value)
    }
}
//
// 1 fix bug
// 2 reply to emails
// 3 write report
```

In this example, we create a new `PriorityQueue`, initialize it with `heap.Init`, and push several items with different priorities. When we pop items from the heap, they come out in order of priority (lowest number first).

By default, this is a min-heap (smallest priority first). You can flip `Less` to reverse the order.

### Circular Buffers with `container/ring`

A ring is a circular list where the end connects back to the beginning. This is useful for fixed-size buffers, round-robin scheduling, or when you want to cycle through elements repeatedly.

::: tip Basic usage

```go
import (
    "container/ring"
    "fmt"
)

func main() {
    r := ring.New(3)
    for i := 0; i < r.Len(); i++ {
        r.Value = i + 1
        r = r.Next()
    }

    // Iterate over the ring
    r.Do(func(x any) {
        fmt.Println(x)
    })
}
//
// 1
// 2
// 3
```

In this example, we create a new ring of size 3 and populate it with values 1, 2, and 3. We then use the `Do` method to iterate over the ring and print each value.

You can also move forward or backward with `r.Move(n)` to cycle through the ring.

:::

::: tip Example use-case: Fixed-size log buffer

```go :collapsed-lines
import (
    "container/ring"
    "fmt"
)

// LogBuffer is a circular buffer for log messages
type LogBuffer struct {
    ring *ring.Ring
    size int
}

// NewLogBuffer creates a new log buffer with the given size
func NewLogBuffer(size int) *LogBuffer {
    return &LogBuffer{
        ring: ring.New(size),
        size: size,
    }
}

// Add adds a log message to the buffer
func (lb *LogBuffer) Add(msg string) {
    lb.ring.Value = msg
    lb.ring = lb.ring.Next()
}

// All returns all log messages in order (oldest to newest)
func (lb *LogBuffer) All() []string {
    logs := make([]string, 0, lb.size)
    lb.ring.Do(func(x any) {
        if x != nil {
            logs = append(logs, x.(string))
        }
    })
    return logs
}

func main() {
    lb := NewLogBuffer(3)
    lb.Add("first")
    lb.Add("second")
    lb.Add("third")
    lb.Add("fourth") // overwrites "first"

    fmt.Println(lb.All())
}
//
// [second third fourth]
```

:::

### Trade-offs compared to slices/maps

- **Memory usage**: The container types may use more memory than slices/maps due to their internal structures (for example, pointers for linked lists).
- **Performance**: Access patterns matter. For example, slices are great for sequential access, while maps excel at lookups. Choose based on your use case.
- **Complexity**: Using these types can add complexity. Weigh the benefits against the added cognitive load.

::: important Key Takeaways

- A list gives you a doubly linked list with efficient middle insertions and deletions.
- A heap provides a priority queue abstraction — powerful for scheduling and ordered retrieval.
- A ring implements a circular list, perfect for round-robin scenarios.

:::

These structures aren't everyday tools, but they fill important niches when slices and maps aren't enough.

---

## Specialized Utilities

Beyond slices, maps, and the classical container types, Go provides specialized utilities that make working with collections cleaner, safer, and more expressive. Two special collections are strings and byte slices, which have their own set of helper functions. Moreover, the `reflect` package offers powerful tools for inspecting and manipulating arbitrary types at runtime.

### Strings and Bytes as Collections

Strings and byte slices are a special type of collection in Go. The standard library provides numerous functions for searching, splitting, joining, and transforming these sequences.

#### Splitting, Joining, and Searching Strings

```go
import (
    "fmt"
    "strings"
)

func main() {
    csv := "Alice,Bob,Charlie,Diana"

    names := strings.Split(csv, ",")
    fmt.Println(names) // [Alice Bob Charlie Diana]

    joined := strings.Join(names, " & ")
    fmt.Println(joined) // Alice & Bob & Charlie & Diana

    contains := strings.Contains(csv, "Bob")
    fmt.Println("Contains Bob?", contains) // true
}
//
// [Alice Bob Charlie Diana]
// Alice & Bob & Charlie & Diana
// Contains Bob? true
```

Here, we use `strings.Split` to break a CSV string into a slice of names, `strings.Join` to concatenate them with "&", and `strings.Contains` to check if "Bob" is in the original string.

#### Transforming Strings

`strings` also provides functions for transforming strings, such as changing case, trimming whitespace, and replacing substrings:

```go
upper := strings.ToUpper("hello world")
fmt.Println(upper)
trimmed := strings.TrimSpace("   padded string   ")
fmt.Println(trimmed)
replaced := strings.ReplaceAll("Alice, Bob, Charlie, Diana", "Bob", "Brian")
fmt.Println(replaced)
//
// HELLO WORLD
// "padded string"
// [Alice Brian Charlie Diana]
```

::: important Important note

the strings functions return new strings, as strings in Go are immutable.

:::

For the complete list of string functions consult the [<VPIcon icon="fas fa-globe"/>strings package documentation](https://pkg.go.dev/strings).

#### Working with Byte Slices

The `bytes` package provides similar functionality for byte slices (`[]byte`), which are often used for binary data or when performance matters.

```go
data := []byte("hello world")

upper := bytes.ToUpper(data)
fmt.Println(string(upper))

index := bytes.Index(data, []byte("world"))
fmt.Println("Index of 'world':", index)
//
// HELLO WORLD
// Index of 'world': 6
```

Strings and bytes are interchangeable via `[]byte(str)` and `string(bytes)` conversions, making it easy to apply slice-style operations to text.

For the complete list of byte slice functions consult the [<VPIcon icon="fas fa-globe"/>bytes package documentation](https://pkg.go.dev/bytes).

### Reflection-Based Utilities

The `reflect` package provides powerful tools for inspecting and manipulating arbitrary types at runtime. While reflection is more advanced and should be used sparingly due to performance costs and complexity, it can be invaluable for generic programming tasks.

```go
import (
    "fmt"
    "reflect"
)

func main() {
    slice := []int{1, 2, 3}
    v := reflect.ValueOf(slice)

    fmt.Println("Length:", v.Len())
    fmt.Println("First element:", v.Index(0))
}
//
// Length: 3
// First element: 1
```

Here, we use `reflect.ValueOf` to get a reflection object representing the slice. We can then call methods like `Len` and `Index` to inspect its properties.

Use reflection sparingly, it's slower and less type-safe than direct slice operations, but sometimes necessary for truly generic functions.

Reflection is a deep topic. For more details, see the [<VPIcon icon="fas fa-globe"/>reflect package documentation](https://pkg.go.dev/reflect).

::: tip Example: generic pretty-printer for any collection

```go
import (
    "fmt"
    "reflect"
)
func PrettyPrint(col any) {
    v := reflect.ValueOf(col)
    switch v.Kind() {
    case reflect.Slice, reflect.Array:
        fmt.Println("Slice/Array:")
        for i := 0; i < v.Len(); i++ {
            fmt.Printf("  [%d]: %v\n", i, v.Index(i))
        }
    case reflect.Map:
        fmt.Println("Map:")
        for _, key := range v.MapKeys() {
            fmt.Printf("  %v: %v\n", key, v.MapIndex(key))
        }
    default:
        fmt.Println("Unsupported type:", v.Kind())
    }
}
func main() {
    PrettyPrint([]int{1, 2, 3})
    PrettyPrint(map[string]int{"Alice": 42, "Bob": 99})
}
//
// Slice/Array:
//   [0]: 1
//   [1]: 2
//   [2]: 3
// Map:
//   Alice: 42
//   Bob: 99
```

In this example, `PrettyPrint` uses reflection to handle both slices/arrays and maps generically. It inspects the kind of the input and prints its contents accordingly. This is a simple demonstration of how reflection can enable generic operations on collections.

:::

::: important Key Takeaways

- Strings and byte slices are specialized collections; the standard library provides rich tools to manipulate them.
- Reflection allows dynamic inspection of slices and maps, useful for generic code.

:::

---

## Case Study: A Simple Job Scheduler

To bring together what we've learned, let's implement a mini job scheduler - the kind of system you might see in a continuous integration (CI) pipeline or a task runner.

This task manager will:

- Store tasks with a title, due date, and priority.
- Allow adding and removing tasks.
- Support listing tasks sorted by due date or priority.
- Provide a "next task" operation using a priority queue.

### Defining the Job Type

First, we'll need a `Job` struct:

```go
import (
    "time"
)

type Job struct {
    ID       int
    Name     string
    ETA      time.Duration // estimated completion time
    Priority int           // lower number = higher priority
}
```

### Storing Jobs in a Map

We'll use a map to store tasks by their title for quick lookups and deletions:

```go
var jobs = make(map[int]*Job)
var nextID int // auto-incrementing ID

func AddJob(name string, eta time.Duration, priority int) int {
    id := nextID
    nextID++
    job := &Job{ID: id, Name: name, ETA: eta, Priority: priority}
    jobs[id] = job
    return id
}
```

We could store jobs in a slice, but using a map has a few advantages:

- Stable IDs: each job has a unique ID that doesn't change, even if other jobs are deleted or reordered.
- Fast lookup: retrieving, updating, or deleting a job by ID is $O\left(1\right)$.
- Extensibility: maps align naturally with database IDs or external storage if jobs are persisted.
- Sparse collections: frequent deletions don't require shifting elements as with slices.

Also note that we store pointers to `Job` in the map to avoid copying the struct on each access.

### Snapshot Report with Slices

To generate a report ordered by ETA, we collect all jobs into a slice and sort them:

```go
import "slices"

func JobsByETA() []*Job {
    all := make([]*Job, 0, len(jobs))
    for _, j := range jobs {
        all = append(all, j)
    }

    slices.SortFunc(all, func(a, b *Job) int {
        return int(a.ETA - b.ETA)
    })
    return all
}
```

Here, we create a slice of job pointers, populate it from the map, and sort it by ETA using `slices.SortFunc`. This gives us a snapshot view of jobs ordered by their estimated completion time.

### Priority Queue for Scheduling

Now let's implement a priority queue to efficiently get the next job based on priority. We could sort the entire list each time (just like we did for due dates), but that would be inefficient. Instead, we'll use a min-heap.

```go
type JobQueue []*Job

func (jq JobQueue) Len() int           { return len(jq) }
func (jq JobQueue) Less(i, j int) bool { return jq[i].Priority < jq[j].Priority }
func (jq JobQueue) Swap(i, j int)      { jq[i], jq[j] = jq[j], jq[i] }
func (jq *JobQueue) Push(x any)        { *jq = append(*jq, x.(*Job)) }
func (jq *JobQueue) Pop() any {
    old := *jq
    n := len(old)
    item := old[n-1]
    *jq = old[:n-1]
    return item
}

func NextJob() *Job {
    if jobHeap.Len() == 0 {
        return nil
    }
    return heap.Pop(jobHeap).(*Job)
}
```

Here, `JobQueue` implements `heap.Interface`, allowing us to maintain a priority queue of jobs. The `NextJob` function pops the highest-priority task from the heap.

Now we need to initialize and maintain the heap and update it when jobs are added:

```go
var jobHeap = &JobQueue{}

func AddJob(name string, eta time.Duration, priority int) int {
    id := nextID
    nextID++
    job := &Job{ID: id, Name: name, ETA: eta, Priority: priority}
    jobs[id] = job
    heap.Push(jobHeap, job)
    return id
}
```

### Putting It All Together

Here's a simple main function to demonstrate the task manager:

```go :collapsed-lines
func main() {
    AddJob("Compile assets", 5*time.Second, 2)
    AddJob("Run tests", 10*time.Second, 1)
    AddJob("Deploy", 30*time.Second, 3)

    fmt.Println("Jobs by ETA (snapshot view):")
    for _, j := range JobsByETA() {
        fmt.Println("-", j.Name, "(ETA", j.ETA, ")")
    }

    fmt.Println("\nExecuting jobs by priority:")
    for i := 0; i < 2; i++ {
        j := NextJob()
        fmt.Println("-", j.Name, "(priority", j.Priority, ")")
    }

    fmt.Println("\nAdding urgent hotfix job...")
    AddJob("Hotfix", 2*time.Second, 0)

    fmt.Println("\nContinuing execution:")
    for jobHeap.Len() > 0 {
        j := NextJob()
        fmt.Println("-", j.Name, "(priority", j.Priority, ")")
    }
}
//
// Jobs by ETA (snapshot view):
// - Compile assets (ETA 5s)
// - Run tests (ETA 10s)
// - Deploy (ETA 30s)
// 
// Executing jobs by priority:
// - Run tests (priority 1)
// - Compile assets (priority 2)
// 
// Adding urgent hotfix job...
// 
// Continuing execution:
// - Hotfix (priority 0)
// - Deploy (priority 3)
```

For this simple job scheduler, we combined maps for fast lookups, slices for snapshot reports, and a priority queue for efficient scheduling. This design is flexible, efficient, and easy to extend with additional features like job status tracking or persistence. Note that this is not production-ready code - error handling, concurrency, and other concerns would need to be addressed in a real system.

For reference, here is the complete code:

```go :collapsed-lines
package main

import (
        "container/heap"
        "fmt"
        "slices"
    "time"
)

type Job struct {
    ID       int
    Name     string
    ETA      time.Duration // estimated completion time
    Priority int           // lower number = higher priority
}

var jobs = make(map[int]*Job)
var nextID int // auto-incrementing ID

var jobHeap = &JobQueue{}

func AddJob(name string, eta time.Duration, priority int) int {
    id := nextID
    nextID++
    job := &Job{ID: id, Name: name, ETA: eta, Priority: priority}
    jobs[id] = job
    heap.Push(jobHeap, job)
    return id
}

func JobsByETA() []*Job {
    all := make([]*Job, 0, len(jobs))
    for _, j := range jobs {
        all = append(all, j)
    }

    slices.SortFunc(all, func(a, b *Job) int {
        return int(a.ETA - b.ETA)
    })
    return all
}

type JobQueue []*Job

func (jq JobQueue) Len() int           { return len(jq) }
func (jq JobQueue) Less(i, j int) bool { return jq[i].Priority < jq[j].Priority }
func (jq JobQueue) Swap(i, j int)      { jq[i], jq[j] = jq[j], jq[i] }
func (jq *JobQueue) Push(x any)        { *jq = append(*jq, x.(*Job)) }
func (jq *JobQueue) Pop() any {
    old := *jq
    n := len(old)
    item := old[n-1]
    *jq = old[:n-1]
    return item
}

func NextJob() *Job {
    if jobHeap.Len() == 0 {
        return nil
    }
    return heap.Pop(jobHeap).(*Job)
}

func main() {
    AddJob("Compile assets", 5*time.Second, 2)
    AddJob("Run tests", 10*time.Second, 1)
    AddJob("Deploy", 30*time.Second, 3)

    fmt.Println("Jobs by ETA (snapshot view):")
    for _, j := range JobsByETA() {
        fmt.Println("-", j.Name, "(ETA", j.ETA, ")")
    }

    fmt.Println("\nExecuting jobs by priority:")
    for i := 0; i < 2; i++ {
        j := NextJob()
        fmt.Println("-", j.Name, "(priority", j.Priority, ")")
    }

    fmt.Println("\nAdding urgent hotfix job...")
    AddJob("Hotfix", 2*time.Second, 0)

    fmt.Println("\nContinuing execution:")
    for jobHeap.Len() > 0 {
        j := NextJob()
        fmt.Println("-", j.Name, "(priority", j.Priority, ")")
    }
}
```

### Practice Challenge

Implement a function to remove a job by ID. Ensure it updates both the map and the priority queue correctly.

---

## Conclusion

Go keeps things simple - the language itself only gives you three basic collection types: arrays, slices, and maps. But simplicity doesn't mean lack of power. As we've seen throughout this article, the standard library layers on a rich set of helpers that let you do most of what you'll ever need in day-to-day programming:

- Sorting and searching with sort and slices.
- Convenient manipulation with slices and maps.
- Specialized data structures like list, heap, and ring for when slices and maps aren’t enough.
- Utilities for strings, bytes, and reflection that round out the toolbox.

These tools are designed to be composable. You can sort with `slices.Sort`, then filter with a loop, then store the results in a map and grab keys with `maps.Keys`. Or you can build higher-level abstractions like our job scheduler by combining heaps, maps, and slices in a few dozen lines of code.

That's the real value of Go's approach: you rarely need to reach for third-party libraries just to handle collections. Everything here is stable, battle-tested, and consistent across the ecosystem.

Note that we've only scratched the surface. Each of these packages has many more functions and options to explore. The best way to learn is by doing.

The next step is practice. Take a small side project, maybe a leaderboard, a log buffer, or a task queue, and see how far you can get with just the standard library helpers. Once you've worked through a few real-world examples, you'll start to think in these patterns automatically, writing clean, idiomatic Go without even reaching for external dependencies.

---

## Practice Challenge Solution

```go
func RemoveJob(id int) {
    if job, exists := jobs[id]; exists {
        delete(jobs, id)
        // Remove from priority queue
        for i := 0; i < jobHeap.Len(); i++ {
            if jobHeap[i].ID == id {
                heap.Remove(jobHeap, i)
                break
            }
        }
    }
}
```

How it works:

- We first check if the job with the given ID exists in the `jobs` map.
- If it does, we delete it from the map.
- Next, we iterate over the `jobHeap` to find the job with the matching ID.
- Once found, we use `heap.Remove` to remove it from the priority queue, which maintains the heap property.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work with Collections in Go Using the Standard Library Helpers",
  "desc": "In a previous article—Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types—we explored Go's three built-in collection types and how they work under the hood. That gave us the foundation for storing and accessing data efficiently. But in ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-work-with-collections-in-go-using-the-standard-library-helpers/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
