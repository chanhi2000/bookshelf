---
lang: en-US
title: "What is New in Go 1.25? Explained with Examples"
description: "Article(s) > What is New in Go 1.25? Explained with Examples"
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
      content: "Article(s) > What is New in Go 1.25? Explained with Examples"
    - property: og:description
      content: "What is New in Go 1.25? Explained with Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-new-in-go.html
prev: /programming/go/articles/README.md
date: 2025-09-06
isOriginal: false
author:
  - name: Pedro
    url : https://freecodecamp.org/news/author/bertao/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757071558420/9a83b3fb-dbea-4d38-96ca-460bf20c213d.png
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
  name="What is New in Go 1.25? Explained with Examples"
  desc="Go 1.25 isn’t a flashy release with big syntax changes. Instead, it’s a practical one: it fixes long-standing pitfalls, improves runtime safety, adds smarter tooling, and introduces a powerful new JSON engine. These are the kind of updates that make ..."
  url="https://freecodecamp.org/news/what-is-new-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757071558420/9a83b3fb-dbea-4d38-96ca-460bf20c213d.png"/>

Go 1.25 isn’t a flashy release with big syntax changes. Instead, it’s a practical one: it fixes long-standing pitfalls, improves runtime safety, adds smarter tooling, and introduces a powerful new JSON engine. These are the kind of updates that make your day-to-day coding experience smoother and your production apps more reliable.

Let’s walk through the highlights.

---

## Goodbye “Core Types”

Core types were introduced in Go 1.18, where, [<FontIcon icon="fa-brands fa-golang"/>according to the documentation](https://go.dev/blog/coretypes), “a core type is an abstract construct that was introduced for expediency and to simplify dealing with generic operands”. For example, we have:

- If a type is not a type parameter, its core type is simply its underlying type.
- If the type is a type parameter, its core type exists only if all types in its type set share the same underlying type. In such cases, that common underlying type becomes the core type. Otherwise, no core type exists.

In Go 1.25, the team removed the notion of core types from the spec and instead defined each feature with explicit rules for generics, simplifying the language while keeping everything fully backward-compatible. For example, operations like addition on a generic type are now described directly in terms of type sets, without needing to reference core types.

---

## Safer Nil-Pointer Handling

A bug introduced in Go 1.21 sometimes prevented `nil` pointer panics from triggering. That’s now fixed. If you dereference a `nil`, it will reliably panic. Previously, the behavior was:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // Try to open a file that doesn't exist.
    // os.Open returns a nil file handle and a non-nil error.
    f, err := os.Open("does-not-exist.txt") // f is nil, err is non-nil
    fmt.Println("err:", err) // Prints the error

    // Buggy behavior explanation:
    // The program uses f.Name() before checking the error.
    // Since f is nil, this call panics at runtime.
    // Older Go versions (1.21–1.24) sometimes let this run,
    fmt.Println("name:", f.Name())
}
```

In Go 1.21–1.24, a compiler bug sometimes suppressed the panic in the code above and made it look like your program was "fine." In Go 1.25, it will no longer run successfully. With the fixed behavior, we have:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // Try to open a file that doesn't exist.
    // os.Open returns a nil file handle and a non-nil error.
    f, err := os.Open("does-not-exist.txt") 
    fmt.Println("err:", err) // Prints an error

    // This now reliably panics, since f is nil and you’re dereferencing it.
    fmt.Println("name:", f.Name())
}
```

The key difference is that it now throws a panic, making the behavior more predictable.

---

## DWARF v5 Debug Info by Default

DWARF is a standardized format for storing debugging information inside compiled binaries.  
Think of it as a map that tells debuggers (like `gdb`, `dlv` for Go, or IDEs like VS Code/GoLand) how your compiled program relates back to your source code.

Go 1.25 now uses DWARF v5 for debug information. The result is smaller binaries and faster linking. If you need older tooling compatibility, you can disable it with `GOEXPERIMENT=nodwarf5`.

```sh
# Normal build (DWARF v5 enabled automatically):
go build ./...

# If you have tooling that doesn’t support DWARF v5, you can disable it:
GOEXPERIMENT=nodwarf5 go build ./...
```

---

## testing/synctest is Stable

Testing concurrent code just got easier. The new [<FontIcon icon="fa-brands fa-golang"/>`testing/synctest`](https://pkg.go.dev/testing/synctest) package lets you run concurrency tests in a controlled environment where goroutines and time are deterministic.

```go
// Run with: go test
package counter

import (
    "testing"
    "testing/synctest"
)

// Counter is a simple struct holding an integer.
// It has methods to increment the count and retrieve the value.
type Counter struct{ n int }

func (c *Counter) Inc() { c.n++ } // Increase counter by 1
func (c *Counter) N() int { return c.n } // Return the current count

func TestCounter_Inc_Deterministic(t *testing.T) {
    // synctest.New creates a special deterministic test environment ("bubble").
    // Inside this bubble, goroutines are scheduled in a controlled way,
    // so the test result is always predictable (no race conditions).
    st := synctest.New()
    defer st.Done() // Cleanup: always close the test bubble at the end.

    c := &Counter{}
    const workers = 10

    // Start 10 goroutines inside the synctest bubble.
    // Each goroutine calls c.Inc(), incrementing the counter.
    for i := 0; i < workers; i++ {
        st.Go(func() { c.Inc() })
    }

    // Run the bubble until all goroutines are finished.
    // This ensures deterministic completion of the test.
    st.Run()

    // Verify the result: counter should equal number of goroutines (10).
    // If not, fail the test with a clear message.
    if got, want := c.N(), workers; got != want {
        t.Fatalf("got %d, want %d", got, want)
    }
}
```

With the new `testing/synctest`, tests ensure a deterministic, flake-free run, so the counter always ends up at 10. ---

## Experimental encoding/json/v2

A brand-new JSON engine is available under the `GOEXPERIMENT=jsonv2` flag. It’s faster, more efficient, and includes a streaming-friendly `jsontext` package. Even better, the old `encoding/json` can piggyback on the new engine—so you get performance boosts without breaking old code.

---

## Tooling Improvements

- `go vet` now catches common mistakes like incorrect `sync.WaitGroup.Add` usage and unsafe host:port handling.
- `go doc -http` serves documentation locally in your browser.
- `go build -asan` can detect memory leaks automatically.

These small upgrades add up to a smoother dev workflow.

---

## Runtime Improvements

Go now runs smarter inside containers. On Linux, it automatically detects how many CPUs the container is allowed to use and adjusts itself. There’s also a new experimental garbage collector called *greenteagc*, which can make memory cleanup up to 40% faster in some cases.

---

## Flight Recorder API

Have you ever wished you could see exactly what your Go application was doing when something went wrong—like when a request suddenly takes 10 seconds instead of 100 milliseconds, or your app mysteriously starts using too much CPU? By the time you notice, it’s usually too late to debug because the issue has already passed. Go’s new FlightRecorder feature solves this by continuously capturing a lightweight runtime trace in memory, allowing your program to snapshot the last few seconds of activity to a file whenever a significant event occurs.

---

## Platform Updates

- macOS 12 (Monterey) is now the minimum supported version.
- Windows/ARM 32-bit support is deprecated and will be removed in Go 1.26.
- RISC-V and Loong64 gained new capabilities like plugin builds and race detection.

---

::: important Key Takeaways

- **Safer by default**: no more silent nil pointer bugs, better panic reporting.
- **Faster builds & runtime**: DWARF v5 debug info, container-aware scheduling, and optional GC improvements.
- **Better tooling**: smarter `go vet`, memory-leak detection, local docs.
- **Modern JSON**: `encoding/json/v2` is the future, with huge performance gains.

:::

Go 1.25 brings meaningful improvements across performance, correctness, and developer experience. From smarter CPU usage in containers to reduced garbage collector overhead, from more predictable runtime behavior to new tools like FlightRecorder, this release shows Go’s commitment to staying simple while evolving with modern workloads. If you haven’t tried it yet, now’s the time—upgrade, experiment with the new features, and see how they can make your applications faster, safer, and easier to debug.

::: info Sources

<SiteInfo
  name="Go 1.25 Release Notes - The Go Programming Language"
  desc="The latest Go release, version 1.25, arrives in August 2025, six months after Go 1.24. Most of its changes are in the implementation of the toolchain, runtime, and libraries. As always, the release maintains the Go 1 promise of compatibility. We expect almost all Go programs to continue to compile and run as before."
  url="https://go.dev/doc/go1.25/"
  logo="https://go.dev/images/favicon-gopher.svg"
  preview="https://go.dev/doc/gopher/gopher5logo.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is New in Go 1.25? Explained with Examples",
  "desc": "Go 1.25 isn’t a flashy release with big syntax changes. Instead, it’s a practical one: it fixes long-standing pitfalls, improves runtime safety, adds smarter tooling, and introduces a powerful new JSON engine. These are the kind of updates that make ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-new-in-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
