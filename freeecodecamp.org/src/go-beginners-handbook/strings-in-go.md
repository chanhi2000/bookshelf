---
lang: en-US
title: Strings in Go
description: Article(s) > (10/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (10/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Strings in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/strings-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-strings-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>


A string in Go is a sequence of `byte` values.

As we saw above, you can define a string using this syntax:

```go
var name = "test"
```

It’s important to note that unlike other languages, strings are defined only using double quotes, not single quotes.

To get the length of a string, use the built-in `len()` function:

```go
len(name) //4
```

You can access individual characters using square brackets, passing the index of the character you want to get:

```go
name[0] /"t" (indexes start at 0)
name[1] /"e"
```

You can get a portion of the string using this syntax:

```go
name[0:2] /"te"
name[:2]  /"te"
name[2:]  /"st"
```

Using this you can create a copy of the string using:

```go
var newstring = name[:]
```

You can assign a string to a new variable like this:

```go
var first = "test"
var second = first
```

Strings are **immutable**, so you cannot update the value of a string.

Even if you assign a new value to `first` using an assignment operator, the value `second` is still going to be `"test"`:

```go
var first = "test"
var second = first

first = "another test"

first  /"another test"
second /"test"
```

Strings are reference types, which means if you pass a string to a function, the **reference** to the string will be copied, not its value. But since strings are immutable, in this case it’s not a big difference in practice with passing an `int`, for example.

You can concatenate two strings using the `+` operator:

```go
var first = "first"
var second = "second"

var word = first + " " + second  /"first second"
```

Go provides several string utilities in the the `strings` package.

We already saw how to import a package in the “Hello, World!” example.

Here’s how you can import `strings`:

```go
package main

import (
    "strings"
)
```

And then you can use it.

For example we can use the `HasPrefix()` function to see if a string starts with a specific substring:

```go
package main

import (
    "strings"
)

func main() {
    strings.HasPrefix("test", "te") // true
}
```

You can find the full list of methods here:

```component VPCard
{
  "title": "strings package - strings - Go Packages",
  "desc": "Package strings implements simple functions to manipulate UTF-8 encoded strings.",
  "link": "https://pkg.go.dev/strings/",
  "logo": "https://pkg.go.dev/static/shared/icon/favicon.ico",
  "background": "rgba(54,123,153,0.2)"
}
```

Here’s a list of methods you might use frequently:

- `strings.ToUpper()` returns a new string, uppercase
- `strings.ToLower()` returns a new string, lowercase
- `strings.HasSuffix()` checks if a string ends with a substring
- `strings.HasPrefix()` checks if a string starts with a substring
- `strings.Contains()` checks if a string contains a substring
- `strings.Count()` counts how many times a substring appears in a string
- `strings.Join()` used to join multiple strings and create a new one
- `strings.Split()` used to create an array of strings from a string, dividing the original one on a specific character, like a comma or a space
- `strings.ReplaceAll()` used to replace a portion in a string and replace it with a new one
