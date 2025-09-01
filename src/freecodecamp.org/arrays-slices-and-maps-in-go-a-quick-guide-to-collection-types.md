---
lang: en-US
title: "Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types"
description: "Article(s) > Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types"
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
      content: "Article(s) > Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types"
    - property: og:description
      content: "Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/arrays-slices-and-maps-in-go-a-quick-guide-to-collection-types.html
prev: /programming/go/articles/README.md
date: 2025-09-06
isOriginal: false
author:
  - name: Gabor Koos
    url : https://freecodecamp.org/news/author/gkoos/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757090426408/327ded41-5020-4f83-afa2-334f15569998.png
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
  name="Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types"
  desc="Golang has a reputation for simplicity, and one reason is its small set of core data structures. Unlike some languages that offer lists, vectors, dictionaries, hashmaps, tuples, sets, and more, Go keeps things minimal. The three fundamental building ..."
  url="https://freecodecamp.org/news/arrays-slices-and-maps-in-go-a-quick-guide-to-collection-types"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757090426408/327ded41-5020-4f83-afa2-334f15569998.png"/>

Golang has a reputation for simplicity, and one reason is its small set of core data structures. Unlike some languages that offer lists, vectors, dictionaries, hashmaps, tuples, sets, and more, Go keeps things minimal.

The three fundamental building blocks you’ll use every day are:

- **Arrays**: fixed-size sequences of elements.
- **Slices**: flexible, dynamic views of arrays.
- **Maps**: key–value stores implemented as hash tables.

With these three, you can represent almost any collection of data you need.

In this tutorial, you'll learn how to use arrays, slices, and maps effectively. You'll also peek under the hood to see how Go represents them in memory. This will help you understand their performance characteristics and avoid common pitfalls.

By the end, you'll be able to:

- Choose the right data type for your problem.
- Write idiomatic Go code for collections.
- Understand how these types behave internally.
- Build a small project combining arrays, slices, and maps.

Let's dive in!

::: note Prerequisites

This tutorial is designed for readers who already have some basic experience with Go. You don’t need to be an expert, but you should be comfortable with:

- Writing and running simple Go programs (`go run`, `go build`).
- Declaring and using variables, functions, and basic types (for example, `int`, `string`, `bool`).
- Understanding control structures like `if`, `for`, and `range`.
- Using the Go toolchain and `go mod init` to set up a project.

If you’ve completed the [<FontIcon icon="fa-brands fa-golang"/>Tour of Go](https://go.dev/tour) or written a few small Go programs, you’ll be ready to follow along – we’ll cover the internals at a beginner-friendly level.

:::

---

## Arrays in Go

An array is a numbered sequence of elements of the same type with a fixed length. Here’s an example in Go:

```go
package main

import "fmt"

func main() {
    var nums [3]int // array of 3 integers
    fmt.Println(nums) // [0 0 0]
}
```

This code declares an array with space for exactly three `int` values. Go arrays are zero-indexed, meaning the first element is at index 0. The elements, like every Go variable, are initialized to the zero value of their type (0 for integers, ““ for strings, and so on).

Once the array is created, you can access its elements using their index like this:

```go
package main

import "fmt"

func main() {
    var nums [3]int // array of 3 integers
    nums[1] = 2
    fmt.Println(nums[1]) // 2
    fmt.Println(nums) // [0 2 0]
}
```

### Initializing with Values

So far, we’ve seen that arrays are created with their elements set to the zero value of the element type. But often, you’ll want to give an array specific starting values right when you declare it. This process is called **initialization**: you provide the values in a list, and Go fills the array in order.

```go
package main

import "fmt"

func main() {
    nums := [3]int{1, 2, 3} // array of 3 integers
    fmt.Println(nums) // [1 2 3]
}
```

If you omit the size when initializing an array, Go will infer it from the number of elements you provide:

```go
package main

import "fmt"

func main() {
    nums := [...]int{1, 2, 3} // array of 3 integers
    fmt.Println(nums) // [1 2 3]
}
```

If you specify the size explicitly, the compiler will enforce that size:

```go
package main

import "fmt"

func main() {
    nums := [3]int{1, 2} // array of 3 integers
    fmt.Println(nums) // [1 2 0]
}
```

### Array Length

In Go, the length of an array is part of its type. `[3]int` and `[4]int` are considered completely different types, even though they both hold integers (you cannot assign a `[4]int` to a `[3]int`, or even compare them directly, because their lengths don’t match):

```go
package main

import "fmt"

func main() {
    var a [3]int
    var b [4]int
    fmt.Println(a == b) // compilation error
}
```

When you use `[...]` in an array literal, Go counts how many elements you’ve provided and that will be the length. The length of an array is fixed and cannot be changed afterwards.

You can retrieve the length of an array using the built-in `len` function:

```go
package main

import "fmt"

func main() {
    nums := [3]int{1, 2, 3}
    fmt.Println(len(nums)) // 3
}
```

### Inner Representation of Arrays

In Go, arrays are represented as contiguous blocks of memory. This means that the elements of an array are stored one after the other in memory, making it easy to calculate the address of any element based on its index.

For example, consider the following array:

```go
package main

import "fmt"

func main() {
    nums := [3]int32{1, 2, 3} // array of 3 32-bit integers
    fmt.Println(&nums[0]) // address of the first element
    fmt.Println(&nums[1]) // address of the second element
    fmt.Println(&nums[2]) // address of the third element
}
```

It will give you something like this:

```plaintext
0xc00000a0f0
0xc00000a0f4
0xc00000a0f8
```

32 bits are 4 bytes, so the addresses of the elements differ by 4 bytes as well.

In the example above, we used `&nums[0]` to get the address of the first element. You might wonder what happens if you take the address of the array itself, using `&nums`:

```go
fmt.Println(&nums)
```

At first glance, you might expect this to give you the same result as `&nums[0]`, like in C where arrays often “decay” into pointers. But Go is different:

- `&nums` is a pointer to the **entire array** (type `*[3]int32`).
- `&nums[0]` is a pointer to the **first element** (type `*int32`).

When you print `&nums`, the `fmt` package recognizes it as a pointer to an array and shows the array’s contents (`&[1 2 3]`) rather than a raw memory address.

In Go, arrays and pointers to arrays are distinct types, and `&nums` is of type `*[3]int32`, not `*int32`. When you print `&nums`, `fmt` recognizes it as a pointer to an array and displays the array's contents, not the address. If you want the address of the first element, you use `&nums[0]`, which is of type `*int32`.

If you try to access an out-of-bounds index, your program will panic at runtime with an error:

```go
package main

import "fmt"

func main() {
    nums := [3]int32{1, 2, 3}
        i := 4
    fmt.Println(&nums[i])
}
```

```plaintext
panic: runtime error: index out of range [4] with length 3

goroutine 1 [running]:
main.main()
        C:/projects/Articles/Go Context/main.go:8 +0x3d
exit status 2
```

This behavior is called **bounds checking**: before Go reads or writes an array element, it ensures the index is within the valid range (`0` up to `len(array)-1`). If it’s not, the program immediately panics instead of letting you access memory that doesn’t belong to the array.

Bounds checking is important because it:

- Prevents memory corruption: in languages like C, out-of-bounds access can overwrite unrelated memory and cause hard-to-find bugs or security issues.
- Makes programs safer by default: Go will stop execution right away rather than let invalid memory access continue silently.
- Helps debugging: the panic message clearly shows the invalid index and the array’s length, so you can quickly track down the bug.
- It trades a small runtime cost for much greater safety and reliability.

Like every other data structure in Go, arrays are passed by value, meaning that when you pass an array to a function, a copy is made. This can lead to performance issues, so for large arrays, it's often better to pass a pointer to the array instead.

### Multi-dimensional Arrays

Multi-dimensional arrays let you model data that naturally fits into rows and columns (or higher dimensions). Some common uses include:

- Matrices and grids
- Images and pixel data in 2D or 3D
- Static lookup tables

Go supports multi-dimensional arrays, which are essentially arrays of arrays. Here's an example:

```go
package main

import "fmt"

func main() {
    var matrix [2][3]int // 2x3 matrix
    matrix[0][0] = 1
    matrix[0][1] = 2
    matrix[0][2] = 3
    matrix[1][0] = 4
    matrix[1][1] = 5
    matrix[1][2] = 6
    fmt.Println(matrix)
}
```

In this example, we create a 2x3 matrix (2 rows and 3 columns) and initialize its elements. You can access elements using two indices: the first for the row and the second for the column. This can be extended to more dimensions too, but the size of each dimension must be known at compile time.

### Limitations

The greatest limitation of arrays in Golang is that their size must be known at compile time. Once it’s declared, the size can’t be changed. Because of this rigidity, arrays are rarely used directly.

### When Arrays Are Useful

Despite their rigidity, arrays have a few niche but important use cases in Go:

- Fixed-size data like IP addresses
- Low-level data structures
- Interop with C or system calls

---

## Slices in Go

Because arrays are fixed-size, Go introduced **slices**: flexible, dynamic sequences built on top of arrays. Think of slices as views into arrays. A slice keeps three things:

1. **Pointer**: A reference to the underlying array.
2. **Length**: The number of elements in the slice.
3. **Capacity**: The maximum number of elements the slice can hold (which is always greater than or equal to the length).

Unlike arrays, a slice's length and capacity can change dynamically as you add or remove elements.

### When to Use Slices

In practice, slices are the default way to work with collections in Go. You’ll use them when:

- You don’t know the size of the collection in advance.
- You need to grow or shrink the collection over time.
- You want to pass around subsections of an array without copying data.
- You want idiomatic Go code (most Go APIs accept and return slices, not arrays).

Arrays are mainly useful when you need a fixed size known at compile time (like a 16-byte UUID). For almost everything else, slices are the go-to choice.

### How to Declare a Slice

```go
var s []int           // slice of integers
fmt.Println(s)        // []
fmt.Println(len(s))   // length: 0
fmt.Println(cap(s))   // capacity: 0
```

With `var s []int` you are **declaring a slice**. That means you’ve introduced a variable `s` of type “slice of int” (`[]int`), but you haven’t yet given it any backing array. At this point, `s` is `nil` – it doesn’t point to any actual storage. That’s why its length and capacity are both zero, until you allocate or append to it.

Note that you can also declare a slice using `var s[]int{}` which initializes the slice with zero elements, but you can’t create an empty array using this syntax: `var s[...]int{}`. The latter is invalid in Go: you can’t use `[...]` with `var` and an empty initialiser!

### Allocate (with `make`)

```go
s := make([]int, 3) // length 3, capacity 3
fmt.Println(s)      // [0 0 0]
```

Here, Go creates an underlying array of size 3 and makes `s` point to it. Now `s` has length 3 and capacity 3. You can also specify a larger capacity:

```go
s := make([]int, 3, 5) // length 3, capacity 5
fmt.Println(s)         // [0 0 0]
fmt.Println(len(s))    // length: 3
fmt.Println(cap(s))    // capacity: 5
```

The built-in `make` function is Go’s way of allocating and initializing certain composite types: slices, maps, and channels. Unlike `new`, which gives you a pointer to a zeroed value, `make` sets up the internal data structures those types need to work.

For slices, `make` does three things under the hood:

1. Allocates an array of the given size (either the length you specify, or the capacity if you provide both).
2. Creates a slice header (pointer, length, capacity) that points to that array.
3. Returns the slice header, ready to use.

### Append Elements

One of the main reasons slices are so useful compared to arrays is that they can grow dynamically. In practice, you’ll often start with a slice of a certain length and then need to add more elements later. Again, this is something arrays don’t allow.

Go provides the built-in `append` function for this. `append` takes an existing slice and one or more new elements, and returns a new slice with those elements added:

```go
s := make([]int, 3, 5)  // create [0 0 0]
s = append(s, 1)
s = append(s, 2, 3)
fmt.Println(s)          // [0 0 0 1 2 3]
fmt.Println(len(s))     // length: 6
fmt.Println(cap(s))     // capacity: 10 - may be different, depending on the Go version and implementation, but generally it will double when exceeded
```

If there’s enough capacity, `append` just writes into the existing array. If not, Go automatically allocates a new larger array, copies the old elements over, and adds the new value. That’s why a slice can grow even though arrays themselves are fixed-size. On one hand, this provides flexibility, but it can also lead to performance overhead due to the need for memory allocation and copying.

To mitigate this, it's a good practice to preallocate slices with an appropriate capacity when you know the size in advance.

### How to Slice Slices

In Golang, you can create a new slice by slicing an existing one. You can do this using the `[:]` operator. The syntax is `slice[low:high]`, where `low` is the starting index (inclusive) and `high` is the ending index (exclusive). If `low` is omitted, it defaults to 0. If `high` is omitted, it defaults to the length of the slice:

```go
s := []int{1, 2, 3, 4, 5}
s1 := s[1:4] // [2 3 4]
s2 := s[:3]  // [1 2 3]
s3 := s[2:]  // [3 4 5]
fmt.Println(s1, s2, s3)
```

If two slices share the same underlying array, changes to the elements of one slice will be reflected in the other. This is because both slices point to the same data in memory. For example:

```go
s := []int{1, 2, 3, 4, 5}
s1 := s[1:4] // [2 3 4]
s2 := s[2:]  // [3 4 5]
s1[0] = 10
fmt.Println(s)  // [1 10 3 4 5]
fmt.Println(s2)  // [10 3 4 5]
```

### Inner Representation of Slices

Internally, a slice is represented by a struct that contains a pointer to the underlying array, the length of the slice, and its capacity:

```go
type slice struct {
    ptr *ElementType  // pointer to underlying array
    len int
    cap int
}
```

This allows slices to be lightweight and efficient, as they don't require copying the entire array when being passed around, just the pointer to the array (and length and capacity). This is often a source of confusion: passing a slice to a function *feels* like passing by reference, as the values are not copied – but the slice struct itself is still passed by value:

```go
package main

import "fmt"

func modify(s1 [3]int, s2 []int) {
    s1[0] = 99
    s2[0] = 99
}

func main() {
    nums_array := [...]int{1, 2, 3} // array of 3 integers
    nums_slice := []int{1, 2, 3}    // slice of 3 integers
    modify(nums_array, nums_slice)
    fmt.Println(nums_array)         // Output: [1 2 3] - only modified the copy
    fmt.Println(nums_slice)         // Output: [99 2 3] - modified the value in the original slice
}
```

### How to Copy Slices

Copying a slice creates a new slice with the same elements. You can do this using the built-in `copy` function:

```go
s1 := []int{1, 2, 3}
s2 := make([]int, len(s1))
copy(s2, s1)      // copies elements from s1 to s2
fmt.Println(s2)   // [1 2 3]
```

Common pitfalls when copying slices:

- **Capacity**: When copying a slice, the capacity of the destination slice is not automatically adjusted. If the destination slice has a smaller capacity than the source slice, it will only copy up to the capacity of the destination slice.
- **Nil Slices**: If the source slice is nil, the `copy` function will not panic, but the destination slice will remain unchanged.
- **Overlapping Slices**: If the source and destination slices overlap, the behavior is undefined. To avoid this, make sure to copy to a separate slice.

### Multi-dimensional Slices

Just like multi-dimensional arrays, you can create multi-dimensional slices, which are essentially slices of slices:

```go
matrix := [][]int{
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9},
}
fmt.Println(matrix)
```

Or:

```go
rows := 3
cols := 4
matrix := make([][]int, rows)
for i := range matrix {
    matrix[i] = make([]int, cols)
}
```

Multi-dimensional slices are useful when you need flexible, dynamic grids of data. Common use cases include:

- Representing game boards (for example, Tic-Tac-Toe, Minesweeper). This could be done with an array, too.
- Mathematical matrices where the size isn’t fixed.
- Jagged arrays, where each row can have a different length.

Because slices can grow and shrink, they’re generally preferred over multi-dimensional arrays unless you need a fixed size known at compile time.

### Slices vs Arrays

Let’s recap the key differences between slices and arrays in Go:

1. **Size**: Arrays have a fixed size, while slices can grow and shrink dynamically.
2. **Memory**: Arrays are value types and are copied when passed to functions, while slices are reference types and only the slice header is copied.
3. **Flexibility**: Slices provide more flexibility and are generally preferred over arrays for most use cases.

---

## Maps in Go

A **map** is Go's built-in associative data type (hash table). It stores key-value pairs with fast average-time lookups.

Unlike arrays and slices, which are indexed only by integers, maps let you use more meaningful keys such as names, IDs, or other comparable values. This makes them ideal when you need to look up, group, or count data quickly, for example, storing user ages by username, counting word frequencies in text, or mapping product IDs to their prices.

### How to Declare a Map

```go
m := make(map[string]int)  // a map with string keys and int values
m["alice"] = 23
m["bob"] = 30
fmt.Println(m)             // map[alice:23 bob:30]
```

Here, we create a map with string keys and int values. We can add key-value pairs to the map using the syntax `m[key] = value`. The `make` function is used to initialize the map. When we print the map, we see the key-value pairs in the output.

Keys can be of any type that is comparable (for example, strings, integers, structs). But they can’t be slices, maps, or functions.

A key in a map must be unique. If you assign a value to an existing key, it will overwrite the previous value.

### How to Access Values

Once you have a map, you can retrieve a value using its key with the syntax `map[key]`:

```go
age := m["alice"]
fmt.Println(age) // 23
```

If the key doesn't exist, you get the zero value:

```go
age := m["charlie"]
fmt.Println(age) // 0
```

Here’s what happens under the hood:

1. Go computes the hash of the key (`"alice"`) to find which bucket in the hash table to look in. A **bucket** is a small container within the hash table that holds one or more key-value pairs. When multiple keys hash to the same bucket, they are stored together inside it.
2. It searches the bucket for the key.
3. If the key exists, Go returns the associated value (`23` in this case).
4. If the key doesn’t exist, Go returns the zero value of the map’s value type (`0` for `int`, `""` for `string`, `nil` for a pointer or slice, and so on).
    

To distinguish between a **key that doesn’t exist** and a key whose value happens to be the zero value of the map’s value type, Go provides a second return value when you access a map. Normally, `m[key]` just returns the value. But if you write:

```go
value, ok := m[key]
```

- `value` is the map value for that key (or the zero value if the key is missing).
- `ok` is a boolean that is `true` if the key exists in the map, and `false` if it does not.

You need this because some types have a zero value that is valid in your application. For example, consider a map of usernames to ages:

```go
m := map[string]int{
    "alice": 23,
    "bob":   0,
}
```

If you try to access `"bob"` or `"charlie"` without the second return value:

```go
fmt.Println(m["bob"])     // 0
fmt.Println(m["charlie"]) // 0
```

Both print `0`, so you can’t tell whether `"charlie"` is missing or `"bob"` actually has age `0`. Using the second return value solves this:

```go
age, ok := m["charlie"]
if !ok {
    fmt.Println("Key not found")
}
```

Here, `ok` is `false` for `"charlie"` but would be `true` for `"bob"`. This is a common pattern in Go to safely handle map lookups.

### How to Iterate Over a Map

Iterating over a map means going through all key-value pairs in the map, one at a time. You do this with a `for` loop and the `range` keyword:

```go
for key, value := range m {
    fmt.Printf("%s: %d\n", key, value)
}
```

What’s happening here:

- `range m` produces each key in the map, one by one.
- The loop assigns the current key to `key` and the corresponding value to `value`.
- Inside the loop, you can use `key` and `value` to process, print, or modify data.

Iterating over a map is useful whenever you need to:

- Process all entries in the map (for example, compute a total, filter items, or apply a transformation).
- Print or display data in key-value format (like logging user ages or product prices).
- Perform aggregate operations, such as counting, summing, or finding the maximum/minimum value.

::: note Important note

Map iteration order in Go is randomized: each loop may produce keys in a different order. This prevents you from relying on insertion order. If you need a deterministic order, you can collect the keys into a slice, sort them, and iterate over the sorted keys.

:::

### Inner Representation of Maps

Go maps are implemented as hash tables with buckets:

- Keys are hashed to decide which bucket they go into.
- Each bucket holds multiple key-value pairs.
- When a bucket gets too full, Go splits it into two (similar to dynamic resizing).
- That's why map operations are usually O(1), but not guaranteed constant time.

Just keep in mind that maps are not safe for concurrent writes. If multiple goroutines write to a map at the same time, you’ll get a runtime panic. Use `sync.Mutex` or `sync.RWMutex` to protect map access in concurrent scenarios.

If you're interested in how different hash map implementations work under the hood, check out my [<FontIcon icon="fas fa-globe"/>article on hash maps](https://blog.gaborkoos.com/posts/2025-08-03-Hash-Map-Deep-Dive/).

### Arrays vs. Slices vs. Maps

Here’s a quick comparison of the feature set of collection types in Go:

| Feature | Arrays | Slices | Maps |
| --- | --- | --- | --- |
| Size | Fixed | Dynamic | Dynamic |
| Type | Value type | Reference type | Reference type |
| Zero value | Array of zero values | Nil slice | Nil map |
| Length | Known at compile time | Known at runtime | N/A |
| Indexing | By integer | By integer | By key |
| Internal rep | Contiguous memory block | Header (ptr, len, cap) + array | Hash table with buckets |
| Use cases | Low-level, fixed-size data | Most lists, sequences | Lookups, dictionaries |

---

## Mini Project: Shopping Cart Totals

Let's combine slices and maps into a practical program: given a list of items and their prices, compute the total cost of all items.

The list of items is represented as a slice of strings, and the prices are stored in a map. The key is the item name, and the value is the price:

```go
package main

import "fmt"

func main() {
    items := []string{"apple", "banana", "orange"}
    prices := map[string]float64{
        "apple":  0.99,
        "banana": 0.59,
        "orange": 0.79,
    }

    var total float64
    for _, item := range items {
        total += prices[item]
    }
    fmt.Printf("Total cost: $%.2f\n", total)
}
```

```plaintext
Total cost: $2.37
```

This short example shows the synergy between slices (to hold the item names) and maps (to look up prices).

---

## Practice Challenge

Write a function that takes a slice of integers and returns a new slice with duplicates removed. (Solution below.)

---

## Conclusion

Go keeps things simple: with arrays, slices, and maps, you can model almost all everyday data problems.

- **Arrays**: fixed size, contiguous memory, rarely used directly.
- **Slices**: flexible, built on top of arrays, your go-to for ordered collections.
- **Maps**: hash tables for key–value lookups.

You now have the tools to confidently handle collections in Go. The next step? Try writing a small project where you read data from a file, store it in slices, and process it into maps for quick lookups. That's how Go developers handle real-world data.

### Practice Challenge Solution

To remove duplicates from a slice, we can keep track of the values we’ve seen in a map and build a new slice containing only the first occurrence of each element:

```go
package main

import "fmt"

func removeDuplicates(intSlice []int) []int {
    seen := make(map[int]bool) // to track seen integers
    result := []int{}
    for _, v := range intSlice {
        if !seen[v] { // if we haven't seen this integer yet, set it to seen and add it to the result
            seen[v] = true
            result = append(result, v)
        }
    }
    return result
}

func main() {
    s := []int{1, 2, 2, 3, 4, 4, 5}
    s = removeDuplicates(s)
    fmt.Println(s) // [1 2 3 4 5]
}
```

How it works:

- `seen` keeps track of numbers that have already been added.
- `result` collects unique numbers as we iterate.
- For each element in the input slice, if it hasn’t been seen, we mark it and append it to `result`.
- Finally, `result` contains only unique values.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Arrays, Slices, and Maps in Go: a Quick Guide to Collection Types",
  "desc": "Golang has a reputation for simplicity, and one reason is its small set of core data structures. Unlike some languages that offer lists, vectors, dictionaries, hashmaps, tuples, sets, and more, Go keeps things minimal. The three fundamental building ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/arrays-slices-and-maps-in-go-a-quick-guide-to-collection-types.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
