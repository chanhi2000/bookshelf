---
lang: en-US
title: "Learn How to Use Pointers in Go – With Example Code"
description: "Article(s) > Learn How to Use Pointers in Go – With Example Code"
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
      content: "Article(s) > Learn How to Use Pointers in Go – With Example Code"
    - property: og:description
      content: "Learn How to Use Pointers in Go – With Example Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-how-to-use-pointers-in-go-with-example-code.html
prev: /programming/go/articles/README.md
date: 2025-10-07
isOriginal: false
author:
  - name: Gabor Koos
    url : https://freecodecamp.org/news/author/gkoos/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759763060124/8b3f21fa-052e-4c18-a1b4-9fe4fd456830.png
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
  name="Learn How to Use Pointers in Go – With Example Code"
  desc="Pointers are a fundamental but often dreaded concept in every programming language that supports them. Luckily for us, Go makes working with pointers straightforward and safe. In this article, we will demystify pointers in Go. You'll learn: What poi..."
  url="https://freecodecamp.org/news/learn-how-to-use-pointers-in-go-with-example-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759763060124/8b3f21fa-052e-4c18-a1b4-9fe4fd456830.png"/>

Pointers are a fundamental but often dreaded concept in every programming language that supports them. Luckily for us, Go makes working with pointers straightforward and safe.

In this article, we will demystify pointers in Go. You'll learn:

- What pointers are and how to use them
- How to declare pointers and dereference them
- Common pitfalls, like nil pointers and reference types
- Pointer receivers in structs (a key reason pointers are so useful in Go)
- A bonus look at weak pointers (Go 1.24+) for advanced memory management

By the end, you'll have a solid understanding of pointers and be confident using them in your own Go programs.

::: note Prerequisites

This article assumes you have a basic understanding of Go, including:

- Variables and basic types (`int`, `string`, and so on)
- Functions and function calls
- Structs and methods

:::

Familiarity with memory concepts (like copying vs referencing values) can be helpful, but it is not required. I’ll explain all examples in a beginner-friendly way.

---

## What is a Pointer?

### Understanding Memory

Memory in a computer is a large sequence of bytes, each with a unique address. Every variable in a program occupies one or more contiguous bytes in memory, depending on its type:

- An `int32` typically occupies 4 bytes.
- An `int64` typically occupies 8 bytes.
- A `bool` usually occupies 1 byte.

Structs, arrays, and slices occupy the sum of their fields' sizes, plus potential padding for alignment (for quick access). Each variable has a unique memory address, which is where its data is stored.

For example, consider:

```go
var a int32 = 100
var b bool = true
```

This will look something like this in memory:

![Memory Layout](https://i.ibb.co/B2jZ3Smc/memory.png)

`a` occupies 4 bytes and holds the value `100`. `b` occupies 1 byte and holds `true`. A variable's address is simply the location in memory where its data starts (0×02022 for `a`, and 0x0207 for `b` in this example).

### Stack vs Heap

In Go, variables can be allocated on the **stack** or the **heap**. The stack is a region of memory that stores local variables and function call information. It’s fast to allocate and deallocate, as it works in a last-in-first-out manner.

The heap is a larger pool of memory used for dynamic allocation. Variables allocated on the heap can outlive the function that created them, making them suitable for data that needs to be shared or modified across different parts of a program.

The Go runtime automatically manages memory allocation and garbage collection, so you don't need to worry about manually freeing memory like in some other languages.

The stack and heap are just implementation details. As a Go programmer, you typically don't need to worry about where a variable is allocated. The Go compiler and runtime handle this for you. You definitely don't have to worry about it in this article – just know they exist and that pointers can point to values in either location.

### The Pointer

A pointer is simply a variable that **stores the memory address of another variable**. From the diagram above, you can see that an address is basically an integer value (which happens to represent a location in memory). On a 64-bit system, addresses are typically 8 bytes (64 bits) long, so a pointer variable will also occupy 8 bytes.

In Go, you declare a pointer using the `*` operator. Pointers also have a **type**, which is the type of the variable they point to. For example:

```go
var p *int32 // a pointer to an int32
```

You can get the address of a variable using the `&` operator:

```go
var a int32 = 100
var p *int32 = &a // p now holds the address of a
```

In memory:

![Pointer Example](https://i.ibb.co/4ZGzs3Rz/pointer.png)

`a` holds the value `100` at address `0x0202`. `p` holds the address of `a` (`0x0202`), and `p` itself is stored at its own address (`0x0207`).

The reason pointers carry type information is that you can **dereference** them: follow the address to access the underlying value. This is also done using the `*` operator:

```go
var a int32 = 100
var p *int32 = &a // p now holds the address of a

fmt.Println(*p) // prints the value at the address p points to, which is the value of a: 100
```

This dual use of `*` is a common source of confusion, so let's clarify:

1. In a *type declaration* (like `var p *int32`), `*` indicates that `p` is a pointer to an `int32`.
2. In an *expression* (like `*p`), `*` dereferences the pointer, giving you access to the value it points to.

Next, let's break down how to declare and use pointers in practice, so you can see how `&` and `*` work together.

---

## Declaring and Using Pointers

Now that we know what pointers are conceptually, let's see how they look in real Go code.

### Pointers to Basic Types

As we saw earlier, you can declare a pointer variable with the `*` operator in the type:

```go
var p *int      // p is a pointer to an int, but currently nil
fmt.Println(p)  // <nil>
```

Like every variable in Go, if you don't initialize it, it defaults to the zero value for its type. For pointers, the zero value is `nil`, meaning it doesn't point to any valid memory address.

You can also use the built-in `new` function to allocate a value and get its pointer:

```go
p := new(int)  // p is a pointer to an int with a zero value (0 for int)
fmt.Println(*p) // prints 0, the zero value for int
```

### Getting an Address with `&`

The `&` operator retrieves the address of an existing variable:

```go
x := 42
p := &x // p now holds the address of x

fmt.Println(*p) // 42
*p = 99         // change the value at the address p points to (which is x)
fmt.Println(x)  // 99
fmt.Println(p)  // prints the memory address of x, e.g., 0xc0000140b8
fmt.Println(&x) // prints the same address as p
```

### Pointers to Structs

Pointers can point to any type. They are especially common with **structs**:

```go
type User struct {
    Name string
    Age  int
}

func main() {
    u := User{"Alice", 30}
    p := &u                 // pointer to User
    fmt.Println((*p).Age)   // 30
    fmt.Println(p.Name)     // Alice - shorthand for (*p).Name
}
```

You can access fields with either `(*p).Name` or simply `p.Name`. Go **automatically dereferences struct pointers** for convenience.

We'll explore struct pointers more in the "Pointer Receivers" section.

### Pointers to Other User Types

You can create pointers to any named type:

```go
type Point struct {
    X, Y int
}
p := &Point{X: 1, Y: 2} // pointer to Point
fmt.Println(p.X, p.Y)   // 1 2 - shorthand for (*p).X and (*p).Y
```

The syntax works exactly the same for user-defined types as it does for built-ins.

---

## Why Use Pointers?

At first glance, pointers may look like mental gymnastics. Why not just use values directly? Here are some key reasons to use pointers in Go:

### Avoiding Copies

When you assign a value in Go, it's copied:

```go
type User struct {
    Name string
    Age  int
}

u1 := User{"Alice", 30}
u2 := u1  // copy
u2.Age = 40

fmt.Println(u1.Age) // 30
fmt.Println(u2.Age) // 40
```

When the struct is small with just a few fields (like this example), copying is cheap. But if it's large (hundreds of fields or nested data), copying can be inefficient. Passing a pointer avoids making a full copy:

```go
func Birthday(u *User) {
    u.Age++
}

u := User{"Bob", 29}
Birthday(&u)
fmt.Println(u.Age) // 30
```

### Sharing and Mutating State

Sometimes you want multiple parts of your program to work with the same object. With values, each assignment makes a copy:

```go
type Counter struct {
    value int32
}

c1 := Counter{value: 0} // c1 is a Counter
c2 := c1  // c2 is a copy - another Counter

c2.value++
fmt.Println(c1.value) // 0
fmt.Println(c2.value) // 1
```

Using pointers ensures both variables refer to the same underlying data:

```go
pc1 := &Counter{value: 0} // pc1 is a pointer to a Counter
pc2 := pc1   // copy of the pointer - both point to the same Counter

pc2.value++
fmt.Println(pc1.value) // 1
fmt.Println(pc2.value) // 1
```

This diagram illustrates the two memory layouts:

![Value vs Pointer](https://i.ibb.co/tPXSr9FN/counter.png)

`c1` and `c2` are stored separately at `0x0202` and `0x0207`, each with its own 4-byte `value` field. In the second example, `pc1` and `pc2` are stored at `0x0202` and `0x020a` respectively, and both hold the same address (`0x1002`) pointing to a single `Counter` instance in the heap, having its own 4-byte `value` field.

### Method Receivers

Go methods can have **value receivers** or **pointer receivers**. Pointer receivers are needed when:

- The method should modify the struct
- The struct is large and copying would be costly
- You want consistency (it's common to make all receivers pointers if some need to be)

We'll cover this in detail in the "Pointer Receivers" section.

### Interfacing with Low-Level APIs

Some libraries and system calls require you to pass memory addresses, not copies. Pointers make this possible, while still being type-safe in Go.

---

## Common Pitfalls and Misunderstandings

### Nil Pointers

If you declare a pointer without initializing it, it will be `nil`. Dereferencing a nil pointer will immediately cause a runtime panic:

```go
var p *int
fmt.Println(*p) // panic: runtime error: invalid memory address or nil pointer dereference
```

This is Go's way of telling you that you tried to follow an address that doesn't exist. To safely use pointers, you always need to give them a valid target before dereferencing:

```go
x := 42
p := &x          // p points to x
fmt.Println(*p)  // 42

q := new(int)    // allocates memory for an int, initializes it to 0
fmt.Println(*q)  // 0
```

Both `&` and `new` ensure that the pointer points to valid memory.

### Reference Types

In Go, everything is passed by value. But this value depends on the **inner representation** of the type. For example, a slice is stored in memory as:

```go
struct {
    ptr *ElementType // pointer to the underlying array
    len int          // length of the slice
    cap int          // capacity of the slice
}
```

When you pass a slice to a function, you are passing a copy of this struct. The `ptr` field still points to the same underlying array, so changes to the elements of the slice inside the function will affect the original slice.

Because of this behavior, slices are often referred to as **reference types**: you don’t need to use pointers with them to share or mutate data. Other reference types in Go include maps and channels. Strings are also considered reference types, but they are immutable, so you cannot change their contents.

Note that pointers themselves are not reference types: they are simply variables that hold memory addresses.

(To complicate things a bit further, if you pass a slice to a function and then re-slice it or append to it, you are modifying the copy of the slice struct. The original slice outside the function will not see these changes!)

---

## Pointer Receivers

When defining methods on structs in Go, you can choose between value receivers and pointer receivers. Understanding the difference is key to writing correct and efficient Go code.

### Value Receivers vs Pointer Receivers

**Value receiver**: the method gets a copy of the struct. Any modifications inside the method do not affect the original struct.

**Pointer receiver**: the method gets a copy of the pointer, which still points to the original struct. Modifications inside the method affect the original struct.

Example:

```go
type Counter struct {
    value int
}
```

If you try to increment the counter using a value receiver, it won't work as expected:

```go
func (c Counter) Inc() {
    c.value++ // INCORRECT: modifies the copy, not the original
}

c := Counter{value: 5}
c.Inc()
fmt.Println(c.value) // still 5
```

With a pointer receiver, it works correctly:

```go
func (c *Counter) Inc() {
    // note the shorthand syntax to (*c).value
    c.value++ // CORRECT: modifies the original via the pointer
}

c := Counter{value: 5}
c.Inc()
fmt.Println(c.value) // now 6
```

Even though the method receives a copy of the pointer, both the copy and the original pointer point to the same struct in memory (in the heap), so changes inside the method affect the original.

### Idiomatic Go

- Small structs can use value receivers if mutation isn't needed.
- Large structs or any struct that must be mutated should use pointer receivers.
- If some methods need pointer receivers, it's common to make all methods use pointer receivers for consistency.

Pointer receivers are arguably the most common and practical use of pointers in Go. They allow methods to mutate state safely without unnecessary copies.

---

## Exercises for the Reader

To solidify your understanding of pointers, try the following exercises:

1. Write a function that swaps two integers using pointers.
2. Create a struct representing a `Rectangle` with width and height. Write methods to calculate the area and to scale the rectangle by a factor, using pointer receivers.

---

## Bonus: Weak Pointers (Go 1.24+)

Go 1.24 introduced weak references, which let you hold a reference to a value without preventing it from being garbage-collected. This is useful when you want a cache or auxiliary data structure without prolonging the lifetime of the objects.

### What Are Weak Pointers?

A weak pointer is a pointer that does not count toward keeping the referenced object alive. If the only references to an object are weak, the garbage collector can still free it.

Weak pointers are provided by the runtime/weak package:

```go
import "runtime/weak"

type Cache struct {
    data weak.Map[string, *User]
}

func main() {
    c := Cache{data: weak.MakeMap[string, *User]()}
    u := &User{"Alice", 30}

    c.data.Set("alice", u) // weak reference stored
}

// ...later
if user, ok := c.data.Get("alice"); ok {
    fmt.Println(user.Name) // Alice
} else {
    fmt.Println("User has been garbage collected")
}
```

If `u` is no longer referenced elsewhere, the garbage collector can reclaim it, even though it exists in the `weak.Map`.

Essentially, a weak pointer can turn into a nil pointer if the object it points to has been garbage collected. You should always check if it's nil before dereferencing it.

### When to Use Weak Pointers

- Caches: Keep objects around if they're still in use, but don't prevent GC if not.
- Avoid memory leaks: Especially in long-running services where temporary objects could otherwise accumulate.
- Auxiliary indexing: Like mapping IDs to objects without controlling their lifetimes.

Weak pointers are an advanced feature and should be used judiciously. Most Go programs will never need them, but in certain scenarios, they can be very useful.

---

## Summary & Best Practices

- Pointers store addresses of variables and allow you to share and mutate data efficiently.
- Use `&` to get an address, `*` to dereference and declare.
- Pointer receivers let methods mutate structs without unnecessary copies.
- Be cautious with nil pointers to avoid panics.
- Reference types (slices, maps, channels) already share underlying data.
- Weak pointers (Go 1.24+) provide advanced memory management for caches or auxiliary structures.

While not as powerful as in languages like C/C++, Go pointers are safe and easy to use. Experiment with them in small programs, and you'll quickly see how they can help you write more efficient and easy-to-read Go code.

---

## Solutions to Exercises

### 1. Swapping two integers using pointers:

```go
func swap(a, b *int) {
    *a, *b = *b, *a
}

x, y := 1, 2
swap(&x, &y)
fmt.Println(x, y) // 2 1
```

Here, `swap` takes two pointers to integers and swaps their values by dereferencing them. Without pointers, you would only swap copies of the integers, leaving the originals unchanged.

### 2. Rectangle struct with methods:

```go
type Rectangle struct {
    Width, Height float64
}

func (r *Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}

rect := Rectangle{Width: 3, Height: 4}
fmt.Println(rect.Area()) // 12
rect.Scale(2)
fmt.Println(rect.Area()) // 48
```

Because `Scale` modifies the rectangle, it uses a pointer receiver. The `Area` method could use either a value or pointer receiver since it doesn't modify the struct, but using a pointer receiver is consistent and avoids copying the struct.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn How to Use Pointers in Go – With Example Code",
  "desc": "Pointers are a fundamental but often dreaded concept in every programming language that supports them. Luckily for us, Go makes working with pointers straightforward and safe. In this article, we will demystify pointers in Go. You'll learn: What poi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-how-to-use-pointers-in-go-with-example-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
