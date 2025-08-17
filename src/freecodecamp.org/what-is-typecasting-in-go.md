---
lang: en-US
title: "What is Typecasting in Go? Explained with Code Examples"
description: "Article(s) > What is Typecasting in Go? Explained with Code Examples"
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
      content: "Article(s) > What is Typecasting in Go? Explained with Code Examples"
    - property: og:description
      content: "What is Typecasting in Go? Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-typecasting-in-go.html
prev: /programming/go/articles/README.md
date: 2025-04-22
isOriginal: false
author:
  - name: Pedro Bertao
    url : https://freecodecamp.org/news/author/bertao/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745329132242/7af1f157-973f-4375-8b09-b79a4f444805.png
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
  name="What is Typecasting in Go? Explained with Code Examples"
  desc="When you’re working with data in Go, especially when you need to handle dynamic inputs like JSON from third-party APIs, understanding how to properly convert between data types is key. This helps you avoid bugs and crashes. Often times, the values re..."
  url="https://freecodecamp.org/news/what-is-typecasting-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745329132242/7af1f157-973f-4375-8b09-b79a4f444805.png"/>

When you’re working with data in Go, especially when you need to handle dynamic inputs like JSON from third-party APIs, understanding how to properly convert between data types is key. This helps you avoid bugs and crashes.

Often times, the values returned by APIs are stored as generic `interface{}` types. These require explicit typecasting to use them correctly. But without proper type conversion, you risk data loss, unexpected behavior, or even runtime crashes.

In this article, we’ll explore how typecasting works in Go. You’ll learn what it is, how to do it correctly, and why it’s crucial for writing safe and reliable code.

You’ll learn about implicit vs explicit typecasting, common pitfalls to avoid, and how to safely work with dynamic data. We’ll also cover practical examples, including how to handle JSON data and how Go’s new generics feature can simplify type conversions.

---

## Why You Should Care About Typecasting

I decided to write about this after running into a real issue in a company's codebase. The app was pulling data from a third-party API that returned JSON objects. The values were dynamic and stored as generic `interface{}` types, but the code was trying to use them directly as `int`, `float64`, and `string` without checking or converting the types properly. This caused silent bugs, unexpected behavior, and even crashes that took hours to trace back.

If you're learning Go - or any language - knowing when and how to typecast can save hours of debugging. So let’s get into it.

---

## What Is Typecasting?

Typecasting (or type conversion) is when you convert one type of variable into another. For example, turning an `int` into a `float`, or a `string` into a number. It’s a simple but essential technique for working with data that doesn’t always come in the type you expect.

There are two main types of typecasting:

- **Implicit (automatic):** Happens behind the scenes, usually when it’s safe (for example, `int` to `float64` in some languages).
- **Explicit (manual):** You, the developer, are in charge of the conversion. This is the case in Go.

Why does this matter? Because if you don’t convert types correctly, your program might:

- Lose data (for example, decimals getting cut off).
- Crash unexpectedly.
- Show incorrect results to users.

I share some resources at the end of the article if you’re looking for Go packages that simplify type conversions and reduce boilerplate.

---

## How to Typecast in Go

Go is a statically typed language, and it doesn’t do implicit conversions between different types. If you want to change a type, you have to do it yourself using explicit syntax.

Let’s look at some basic examples:

```go
var a int = 42                     // Declare a variable 'a' of type int and assign the value 42
var b float64 = float64(a)        // Explicitly convert 'a' from int to float64 and store it in 'b'
                                  // Go requires manual (explicit) type conversion between different types
```

Here, we’re converting an `int` (`a`) into a `float64` (`b`). This is a widening conversion - it’s safe because every integer can be represented as a float.

Now the reverse:

```go
var x float64 = 9.8              // Declare a float64 variable 'x' with a decimal value
var y int = int(x)               // Convert 'x' to an int and store it in 'y'
                                 // This removes (truncates) everything after the decimal point
                                 // So y will be 9, not 10 — it doesn't round!
```

Here, we convert a `float64` to an `int`, which **truncates** the decimal part. This is a narrowing conversion and can lead to data loss.

Go forces you to be explicit so you don’t accidentally lose information or break your logic.

---

## Common Mistakes to Avoid

When working with dynamic data like JSON or third-party APIs, it's common to use `interface{}` to represent unknown types. But you can't directly use them as specific types without checking first.

Here's a mistake many beginners make:

```go
var data interface{} = "123"       // 'data' holds a value of type interface{} (a generic type)
value := data.(string)             // This tries to assert that 'data' is a string
                                   // If it's not a string, this will panic and crash the program
```

If `data` isn’t actually a `string`, this will panic at runtime.

A safer version would be:

```go
value, ok := data.(string)         // Try to convert 'data' to string, safely
if !ok {
    fmt.Println("Type assertion failed")  // If the type doesn't match, 'ok' will be false
} else {
    fmt.Println("Value is:", value)       // Only use 'value' if assertion was successful
}
```

This checks the type before converting and avoids a crash. Always handle the `ok` case when asserting types from `interface{}`.

---

## A Real-World Example: Where Things Go Wrong

We will be using a lot of the JSON marshal and unmarshal functions. If you want to understand what these are, here’s a quick introduction or review.

### What is Marshaling in Go?

Marshaling refers to the process of converting Go data structures into a JSON representation. This is especially useful when you're preparing data to be sent over the network or saved to a file. The result of marshaling is typically a byte slice containing the JSON string.

Unmarshaling, on the other hand, is the reverse operation. It converts JSON data into Go structures, allowing you to work with external or dynamic data formats in a strongly typed manner.

In typical applications, you might marshal a struct to send data via an API, or unmarshal a JSON payload received from a third-party service.

When using structs, marshalling and unmarshalling are straightforward and benefit from field tags that guide JSON key mapping. But when working with unstructured or unknown JSON formats, you might unmarshal into a `map[string]interface{}`. In these cases, type assertions become necessary to safely access and manipulate the data.

Understanding how marshalling and unmarshalling work is fundamental when building services that consume or expose APIs, interact with webhooks, or deal with configuration files in JSON format.

Alright, now back to our example:

Let’s say you get a JSON response from an API and unmarshal it into a map:

```go
package main

import (
    "encoding/json"
    "fmt"
)

func main() {
    data := []byte(`{"price": 10.99}`)        // Simulated JSON input

    var result map[string]interface{}         // Use a map to unmarshal the JSON
    json.Unmarshal(data, &result)             // Unmarshal into a generic map

    price := result["price"].(float64)        // Correctly assert that price is a float64
    fmt.Println("The price is:", price)

    total := int(result["price"])             // ❌ This will fail!
}
```

This fails because `result["price"]` is of type `interface{}`. Trying to convert it directly to `int` causes a compile-time error:

```plaintext title="compile-time error ooutput"
cannot convert result["price"] (map index expression of type interface{}) to type int: need type assertion
```

You need to assert the type first.

### The Right Way to Do It

Here’s the safe and correct version:

```go
package main

import (
    "encoding/json"
    "fmt"
)

func main() {
    data := []byte(`{"price": 10.99}`)        // JSON input representing a float value

    var result map[string]interface{}         // Create a map to hold the parsed JSON
    json.Unmarshal(data, &result)             // Parse the JSON into the map

    // Step 1: Assert that the value is a float64
    priceFloat, ok := result["price"].(float64)
    if !ok {
        fmt.Println("Failed to convert price to float64")
        return
    }

    fmt.Println("Total as float:", priceFloat)  // Successfully extracted float value

    // Step 2: Convert the float to an int (truncates decimals)
    total := int(priceFloat)
    fmt.Println("Total as integer:", total)     // Final integer result (e.g., 10 from 10.99)
}
```

This works because we first check that the value is a `float64` and only then convert it to an `int`. That two-step process - type assertion then conversion - is key to avoiding errors.

---

## Advanced: How to Use Generics for Safer Typecasting

With the introduction of **generics** in Go 1.18, you can write reusable functions that work with any type. Generics let you define functions where the type can be specified when the function is called.

### What are Generics in Go?

Generics were introduced in Go 1.18 to allow writing functions and data structures that work with any type. They help reduce code duplication and increase type safety by enabling parameterized types.

In the context of typecasting, generics allow you to write flexible helpers (like `getValue[T]`) that reduce repetitive `interface{}` assertions and make your code easier to maintain.

- Type parameters are defined with square brackets: `[T any]`
- The `any` keyword is an alias for `interface{}`
- Compile-time checks ensure the past types are used safely

Generics are especially useful in libraries, APIs, and when working with dynamic structures like JSON objects.

Let’s say you want to extract values from `map[string]interface{}` without writing repetitive assertions:

```go
// A generic function that safely retrieves and type-asserts a value from a map
func getValue[T any](data map[string]interface{}, key string) (T, bool) {
    val, ok := data[key]                  // Check if the key exists in the map
    if !ok {
        var zero T                        // Declare a zero value of type T
        return zero, false                // Return zero value and false if key not found
    }

    converted, ok := val.(T)              // Try to convert (type assert) the value to type T
    return converted, ok                  // Return the result and success status
}
```

This function:

- Accepts any type `T` that you specify (like `float64`, `string`, and so on)
- Asserts the type for you
- Returns the value and a boolean indicating success

::: note Usage

```go
price, ok := getValue[float64](result, "price") // Try to get a float64 from the map
if !ok {
    fmt.Println("Price not found or wrong type")
}

title, ok := getValue[string](result, "title")  // Try to get a string from the map
if !ok {
    fmt.Println("Title not found or wrong type")
}
```

This pattern keeps your code clean and readable while avoiding panics from unsafe assertions.

:::

---

## Final Thoughts

Whether you’re just starting with Go or diving into more advanced patterns like generics, understanding typecasting is key to writing safe and reliable code.

It may seem like a small detail, but incorrect type conversions can cause crashes, bugs, or silent data loss - especially when working with JSON, APIs, or user input.

Here’s what you should take away:

- 🧠 Always know the type you’re working with.
- 🔍 Use type assertions carefully and check the `ok` value.
- 🧰 Use generics to simplify repetitive assertion logic.
- 💡 Don’t rely on luck — be intentional with conversions.

Mastering typecasting in Go will not only make you a better developer but also help you understand how typed systems work across different languages.

---

## Common Type Conversion Table in Go

| From Type | To Type | Syntax Example | Notes |
| --- | --- | --- | --- |
| `int` | `float64` | `float64(myInt)` | Safe, widening conversion |
| `float64` | `int` | `int(myFloat)` | Truncates decimals |
| `string` | `int` | `strconv.Atoi(myString)` | Returns `int` and error |
| `int` | `string` | `strconv.Itoa(myInt)` | Converts `int` to decimal string |
| `[]byte` | `string` | `string(myBytes)` | Valid UTF-8 required |
| `string` | `[]byte` | `[]byte(myString)` | Creates byte slice |

---

## Helpful Packages for Type Conversion

- `strconv`: Converting strings to numbers and vice versa
- `reflect`: Introspect types at runtime (use with caution)
- `encoding/json`: Automatic type mapping when unmarshaling
- `fmt`: Quick conversion to string with formatting

---

::: info References

<SiteInfo
  name="Effective Go - The Go Programming Language"
  desc="Go is a new language. Although it borrows ideas from existing languages, it has unusual properties that make effective Go programs different in character from programs written in its relatives. A straightforward translation of a C++ ..."
  url="https://go.dev/doc/effective_go/"
  logo="https://go.dev/images/favicon-gopher.svg"
  preview="https://go.dev/doc/gopher/gopher5logo.jpg"/>

<SiteInfo
  name="Tutorial: Getting started with generics - The Go Programming Language"
  desc="This tutorial introduces the basics of generics in Go. With generics, you can declare and use functions or types that are written to work with any of a set of types provided by calling code..."
  url="https://go.dev/doc/tutorial/generics/"
  logo="https://go.dev/images/favicon-gopher.svg"
  preview="https://go.dev/doc/gopher/gopher5logo.jpg"/>

```component VPCard
{
  "title": "Golang Cast: Go Type Casting and Type Conversion",
  "desc": "Type casting is a technique used in programming to convert one data type to another and is essential in statically typed languages like Golang, which require explicit type conversion.",
  "link": "/gosolve.io/golang-cast-go-type-casting-and-type-conversion.md",
  "logo": "https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png",
  "background": "rgba(56,119,242,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Typecasting in Go? Explained with Code Examples",
  "desc": "When you’re working with data in Go, especially when you need to handle dynamic inputs like JSON from third-party APIs, understanding how to properly convert between data types is key. This helps you avoid bugs and crashes. Often times, the values re...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-typecasting-in-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
