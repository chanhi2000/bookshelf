---
lang: en-US
title: Basic types in Go
description: Article(s) > (9/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (9/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Basic types in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/go-beginners-handbook/basic-types-in-go.html
date: 2022-10-19
author: Flavio Copes
isOriginal: false
cover: https://freecodecamp.org/news/content/images/2022/10/golang.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Go Handbook - Learn Golang for Beginners",
  "desc": "Golang is an awesome, simple, modern, and fast programming language. It’s compiled, open source, and strongly typed. Golang - also called Go - was created by Google engineers with these main goals: make their projects compile (and run) faster be sim...",
  "link": "/freecodecamp.org/go-beginners-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Go Handbook - Learn Golang for Beginners"
  desc="Golang is an awesome, simple, modern, and fast programming language. It’s compiled, open source, and strongly typed. Golang - also called Go - was created by Google engineers with these main goals: make their projects compile (and run) faster be sim..."
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-basic-types-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

Go is a typed language.

We saw how you can declare a variable, specifying its type:

```go
var age int
```

Or you can let Go infer the type from the initial value assigned:

```go
var age = 10
```

The basic types in Go are:

- Integers (`int`, `int8`, `int16`, `int32`, `rune`, `int64`, `uint`, `uintptr`, `uint8`, `uint16`, `uint64`)
- Floats (`float32`, `float64`), useful to represent decimals
- Complex types (`complex64`, `complex128`), useful in math
- Byte (`byte`), represents a single ASCII character
- Strings (`string`), a set of `byte`s
- Booleans (`bool`), either true or false

We have a lot of different types to represent integers. You will use `int` most of the time, and you might choose a more specialized one for optimization (not something you need to think about when you are just learning).

An `int` type will default to be 64 bits when used on a 64 bit system, 32 bits on a 32 bit system, and so on.

`uint` is an `int` that’s unsigned, and you can use this to double the amount of values you can store if you know the number is not going to be negative.

All the above basic types are **value types**, which means they are **passed by value** to functions when passed as parameters, or when returned from functions.
