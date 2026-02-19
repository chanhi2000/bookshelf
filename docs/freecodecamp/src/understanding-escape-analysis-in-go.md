---
lang: en-US
title: "Understanding Escape Analysis in Go – Explained with Example Code"
description: "Article(s) > Understanding Escape Analysis in Go – Explained with Example Code"
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
      content: "Article(s) > Understanding Escape Analysis in Go – Explained with Example Code"
    - property: og:description
      content: "Understanding Escape Analysis in Go – Explained with Example Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/understanding-escape-analysis-in-go.html
prev: /programming/go/articles/README.md
date: 2026-02-13
isOriginal: false
author:
  - name: Eti Ijeoma
    url: https://freecodecamp.org/news/author/Omah/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770921059389/c45b42cb-8cff-4de5-b3d1-7c7adad402c5.png
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
  name="Understanding Escape Analysis in Go – Explained with Example Code"
  desc="In most languages, the stack and heap are two ways a program stores data in memory, managed by the language runtime. Each is optimized for different use cases, such as fast access or flexible lifetimes. Go follows the same model, but you usually don’..."
  url="https://freecodecamp.org/news/understanding-escape-analysis-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770921059389/c45b42cb-8cff-4de5-b3d1-7c7adad402c5.png"/>

In most languages, the stack and heap are two ways a program stores data in memory, managed by the language runtime. Each is optimized for different use cases, such as fast access or flexible lifetimes.

Go follows the same model, but you usually don’t decide between the stack and the heap directly. Instead, the Go compiler decides where values live. If the compiler can prove a value is only needed within the current function call, it can keep it on the stack. If it cannot prove that, the value “escapes” and is placed on the heap. This technique is called **escape analysis**.

This matters because heap allocations increase garbage collector work. In code that runs often, that extra work can show up as more CPU spent in GC, more allocations, and less predictable performance.

In this article, I’ll explain what escape analysis is, the common patterns that trigger heap allocation, and how to confirm and reduce avoidable allocations.

::: note Prerequisites

- Familiarity with Go fundamentals (functions, variables, structs, slices, maps)
- Basic understanding of pointers in Go (`&` and `*`)
- A general idea of how goroutines work

:::

---

## Do You Really Need to Care About Escape Analysis?

Before we go deeper, I want to call this out clearly. For the correctness of your program, it doesn’t matter whether a variable lives on the stack or on the heap, or whether you know that detail. The Go compiler is smart enough to place values where they need to be so that your program behaves correctly.

Most of the time, you don’t need to think about this at all. It only starts to matter when performance becomes a problem. If your program is already fast enough, you’re done, and there’s no point trying to squeeze out extra speed.

You should only start caring about stack vs heap when you have benchmarks that show your program is too slow, and those same benchmarks point to heavy heap allocation and garbage collection as part of the problem.

---

## Memory Layout and Lifecycle

To get a better understanding of what escape analysis is, you first need a simple picture of how Go lays out memory while your program runs. At this level, it comes down to the stack each goroutine uses, how stack frames are carved out of that stack, and when values move to the heap where the garbage collector can see them.

### Goroutine Stacks and Stack Frames

When a Go program starts, the runtime creates the `main` goroutine, and every `go` statement creates a new goroutine, each with its own stack.

There’s not a single global stack for the whole process. As of writing this article, with Go v1.25.7, each goroutine gets an initial contiguous block of 2,048 bytes of memory, which acts as its stack. The stack is where Go stores data that belongs to function calls. When a goroutine calls a function, Go reserves a chunk of that goroutine’s stack for the function’s local data. That chunk is called a **stack frame**.

It holds the function’s local variables and the call state needed to return and continue execution. If that function calls another function, a new frame is added on top. When the inner function returns, its frame becomes invalid, and the goroutine continues in the caller’s frame.

A stack frame only lives for as long as the function is active. Once the function returns, anything stored in its frame is considered invalid, even if the raw bytes are still in memory and will be reused later. Code must not rely on those values after the return

Go stacks can grow. A goroutine starts with a small stack and the runtime grows it when needed, but the lifetime rule stays the same. A value is safe in a stack frame only if nothing can still reference it after the function returns. If it might be referenced later, it can’t stay in that frame and must be placed somewhere safer.

### Pointers and Lifetime

In Go, taking an address like `p := &x` means you now have a pointer in one stack frame that refers to a value which may have been created in another frame. When you pass that pointer into a function, Go still passes by value. The callee gets its own pointer variable on its own stack frame, but the address inside still points to the same underlying value. So pointers are how you share access to one value across several frames without copying the value itself.

Lifetime becomes important when a pointer can outlive the frame where the pointed value was created. As long as both the pointer and the value live inside frames that are still active in the current call stack, everything is safe.

Once a pointer might still exist after the original frame has returned, the value can no longer stay in that frame, because that frame will become invalid. At that point, the value has to be placed in a safer location so that no pointer ever points into dead stack memory.

---

## Sharing Down and Sharing Up

Now that you have a picture of stacks, frames, and pointers, we can look at two common ways pointers move through your code. I’ll call them sharing down and sharing up. The names aren’t special Go terms. They’re just a simple way to describe how a pointer moves along the call stack.

### Sharing Down

Sharing down means a function passes a pointer or reference to functions it calls. The pointer moves deeper into the call stack, but the value it points to still belongs to a frame that is active.

::: tip Example code:

```go
package main

import "fmt"

func main() {
    n := 10
    multiply(&n) 
}

func multiply(v *int) {
   *v = *v * 2
}
```

:::

In `main`, you take the address of `n` and pass it into `multiply`. While `multiply` runs, both the `main` frame and the `multiply` frames are active. The pointer in `multiply` points to a value that still lives in an active frame, so this situation is safe from a lifetime point of view.

![Diagram showing two stack frames on one goroutine, with the upper frame pointing to a value in the lower frame to illustrate sharing down on the stack](https://cdn.hashnode.com/res/hashnode/image/upload/v1770153560595/0681b535-3668-406d-acaf-6e27679d52e1.png)

In the diagram below, after the `multiply` function runs and returns, the `multiply` frame becomes invalid, and we don’t need to do anything because the stack pointer is simply popped back to the previous frame's address. This action automatically reclaims all the memory used by that function in one step, so the garbage collector is not involved in cleaning up stack memory

![Diagram showing two stack frames with a value in the upper frame updated through a pointer stored in the lower frame, again illustrating sharing down entirely on the stack](https://cdn.hashnode.com/res/hashnode/image/upload/v1770153730555/9093b49a-a8bc-497d-be06-77738a89a6c4.png)

### Sharing Up

Sharing up means a function returns a pointer, or stores it somewhere that will still be around after the function returns. The pointer moves back up the call stack or into some longer-lived state while the frame that created the value is about to end, so that value can no longer be tied to that one frame.

The same idea shows up when you share a value with another goroutine, because Go doesn’t let one goroutine hold pointers into another goroutine’s stack, so shared data needs a lifetime that is not tied to a single stack.

#### Heap, garbage collection, and lifetime

Values that might outlive a single stack frame can’t stay in that frame. The compiler places them on the heap instead. The heap is a separate region of memory that isn’t tied to one function call. Any goroutine can hold pointers to heap values, and those values stay valid as long as something in the program can still reach them. You can think of the heap as storage for “*might live longer than this call*”.

The garbage collector is what keeps this safe. Periodically, the runtime starts from a set of roots (global variables, active stack frames, some internal state) and follows all the pointers it can see. Any heap value that is still reachable is kept. Any heap value that is no longer reachable is treated as garbage and its memory is reclaimed.

This means a pointer in `main` will never legally point into dead stack memory. Either the value stayed in an active frame, or it was placed on the heap where the GC can track its lifetime. The tradeoff is that more heap allocations and longer-lived objects require the GC to do more work.

::: tip Here’s an example:

```go
package main

import "fmt"

type Car struct {
    Brand string
    Model string
}

func main() {
    // main receives a pointer from a function it called and this is sharing up
    carPtr := makeCar("Volkswagen", "Golf") 

    fmt.Printf("I received a car: %s %s\n", carPtr.Brand, carPtr.Model)
}

func makeCar(b, m string) *Car {
    myCar := Car{
        Brand: b,
        Model: m,
    }
    return &myCar
}
```

:::

::: info In the above code:

1. In `makeCar` (the callee frame), Go creates a local variable `myCar`. Because you return `&myCar`, the compiler allocates the `Car` value on the heap, and let’s `myCar` hold the heap address `0xc00029fa0`.
2. When `makeCar` returns, that address is copied into `carPtr` in `main` (the top frame). `carPtr` is just another stack variable, but its value is still `0xc00029fa0`, so now `main` also points to the same heap `Car`.
3. On the right, the heap bubble shows the actual `Car` value at `0xc00029fa0`. Both `car` (while `makeCar` is running) and `carPtr` (after it returns) reach that same value through their pointers.
4. Once `makeCar` is done, its frame drops into the “invalid memory” region, but the `Car` stays alive on the heap because `main` still holds `carPtr`. That’s the escape: the value stops being tied to the callee frame and gets heap lifetime instead.

![Diagram showing a caller and callee stack frame both holding a pointer to the same value in heap memory, illustrating a value being shared up and escaping the stack](https://cdn.hashnode.com/res/hashnode/image/upload/v1770255008545/5ef80c9b-3203-4ca3-a26e-f1e2462912cf.png)

:::

---

## Escape Analysis in Practice

Escape analysis is how the Go compiler decides whether a value lives on the stack or on the heap. It’s not only about returning pointers – it follows how addresses move through your code. If a value might outlive the current function, the compiler can’t keep it in that stack frame and moves it to the heap. Since only the compiler sees the full picture, the useful thing is to ask it to show these decisions and then link them back to your code.

To do that, we can pass compiler flags using `-gcflags` when running `go build` or `go run`. If you want to see the available options, you can check `go tool compile -h`. In that list, `-m` prints the compiler’s optimisation decisions, including escape analysis output. If you want more details, you can use `-m=2` or `-m=3` for a more verbose output. The `-l` flag disables inlining, so the report is easier to read because the compiler is not merging small functions into their callers.

So, the command will look like this:

```sh
go run -gcflags='all=-m -l' .
```

Or for a build:

```sh
go build -gcflags='all=-m -l' .
```

---

## How to Use Escape Analysis to Guide Performance

You can think of escape analysis as the thing that turns your code choices into GC work. When a value escapes, it gets heap lifetime, and the garbage collector has to visit it. In hot paths, lots of small escaping values show up as extra GC time and jitter in latency. When a value stays in a stack frame, it becomes invalid and dies with the frame and the GC does not care about it.

Here are five simple practices that help performance without making

1. **Prefer values for small data:** If the function doesn’t need to mutate the caller’s data, use value types for small structs and basic types when passing arguments and returning results. It’s cheap to copy an `int` or a small struct, and it often keeps lifetimes local to a single call.
2. **Use pointers when sharing or mutation is part of the design:** opt for pointers when you genuinely need shared mutable state or want to avoid copying large structs.
3. **Avoid creating long-lived references by accident**: Be careful when returning pointers to locals, capturing variables in closures, or storing addresses in long-lived structs, maps, or interfaces. These patterns are the ones most likely to push values out of a stack frame.
4. **Pass in reusable buffers on hot paths**: On code paths that run very often, the problem is usually not one big allocation, but many small ones happening in a loop. A common cause is functions that always create a new buffer inside, even when the caller could have passed one in.<br/>?A simple way to cut those extra allocations is to let the caller own the buffer. The caller allocates a `[]byte` once, then passes it into the function each time. The function only fills the buffer instead of creating a new one.

Here’s an example of how a bad function allocates a new buffer every call:

```go
package main
    
// Bad: helper allocates every call.
func fillBad() []byte {
    buf := make([]byte, 4096)
    // pretend we read into it
    buf[0] = 1
    return buf
}
    
func hotPathBad() {
    for i := 0; i < 1_000_000; i++ {
        b := fillBad() // allocates 1,000,000 times
        _ = b
    }
}

func main() {
    hotPathBad()
}
```

When we run escape analysis with this:

```sh
go run -gcflags='-m -l' .
```

We see the following:

```plaintext
./main.go:5:13: make([]byte, 4096) escapes to heap
```

If we were only allocating a few times, we could choose not to worry – but the real problem is how this looks inside the loop. `hotPathBad` calls `fillBad` on every iteration, so each call allocates a new 4 KB slice on the heap. If this loop runs many times, you end up creating a lot of short-lived heap objects. The garbage collector then has to find and clean up all those buffers, which adds extra work that you could have avoided by reusing a single buffer.

Here’s an example of a better version where the caller allocates once and reuses:

```go
package main
    
func fill(buf []byte) int {
    // pretend we read into it
    buf[0] = 1
    return 1
}

func hotPath() {
    buf := make([]byte, 4096) 
    for i := 0; i < 1_000_000; i++ {
        n := fill(buf) 
        _ = buf[:n]
    }
}

func main() {
    hotPath()
}
```

In this version, `hotPath` controls the buffer. It allocates `buf` once, then passes it into `fill` on every loop. You still read the same data, but you avoid creating a new slice on each call. That reduces avoidable allocations in the hot path.

---

## Conclusion

In Go, where a value ends up is not decided by how you create it. It’s decided by how long that value must remain valid and how it is referenced as your code runs.

The practical takeaway is not to avoid pointers. It’s to be deliberate about lifetime. Value semantics can keep lifetimes tight and reduce GC work, while pointers can be the right choice when you need shared state or in-place updates. The balance is to write the clear version first, then look at your benchmarks and profiles to see if anything actually really needs to change.

::: info Further Reading

Language Mechanics On Stacks And Pointers - William Kennedy

<SiteInfo
  name="A Guide to the Go Garbage Collector - The Go Programming Language"
  desc="This guide is intended to aid advanced Go users in better understanding their application costs by providing insights into the Go garbage collector. It also provides guidance on how Go users may use these insights to improve their applications' resource utilization. It does not assume any knowledge of garbage collection, but does assume familiarity with the Go programming language."
  url="https://go.dev/doc/gc-guide/"
  logo="https://go.dev/images/favicon-gopher.svg"
  preview="https://go.dev/doc/gopher/gopher5logo.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding Escape Analysis in Go – Explained with Example Code",
  "desc": "In most languages, the stack and heap are two ways a program stores data in memory, managed by the language runtime. Each is optimized for different use cases, such as fast access or flexible lifetimes. Go follows the same model, but you usually don’...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/understanding-escape-analysis-in-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
