---
lang: en-US
title: How to write Hello, World! in Go
description: Article(s) > (4/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (4/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: How to write Hello, World! in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/how-to-write-hello-world-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-how-to-write-hello-world-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

Now we’re ready to create our first Go program!

It’s a programmer's tradition to make the first program print the “Hello, World!” string to the terminal when it’s run. So we’ll do that first, and then we’ll explain how we did it.

Maybe you have a folder in your home directory where you keep all your coding projects and tests.

In there, create a new folder, for example call it `hello`.

In there, create a <VPIcon icon="fa-brands fa-golang"/>`hello.go` file (you can name it as you want).

Add this content:

```go title="hello.golang"
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

![Go "Hello, World!" code](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_12.17.14.png)

This is your first Go program!

Let’s analyze this line by line.

```go
package main
```

We organize Go programs in packages.

Each <VPIcon icon="fa-brands fa-golang"/>`.go` file first declares which package it is part of.

A package can be composed by multiple files, or just one file.

A program can contain multiple packages.

The `main` package is the entry point of the program and identifies an executable program.

```go
import "fmt"
```

We use the `import` keyword to import a package.

`fmt` is a built-in package provided by Go that provides input/output utility functions.

We have a [large standard library (<VPIcon icon="fa-brands fa-golang"/>`std`)](https://pkg.go.dev/std) ready to use that we can use for anything from network connectivity to math, crypto, image processing, filesystem access, and more.

You can read about all the features that this `fmt` package provides [on the official documentation (<VPIcon icon="fa-brands fa-golang"/>`fmt`)](https://pkg.go.dev/fmt).

```go
func main() {

}
```

Here we declare the `main()` function.

What’s a function? We’ll see more about them later, but in the meantime let’s say a function is a block of code that’s assigned a name, and contains some instructions.

The `main` function is special because what’s where the program starts.

In this simple case we just have one function - the program starts with that and then ends.

```go
fmt.Println("Hello, World!")
```

This is the content of the function we defined.

We call the `Println()` function defined in the `fmt` package we previously imported, passing a string as a parameter.

This function, according to the [docs (<VPIcon icon="fa-brands fa-golang"/>`fmt`)](https://pkg.go.dev/fmt#Printf) "*formats according to a format specifier and writes to standard output*”.

Take a look at the docs because they are great. They even have examples you can run:

![Go basic function example](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_14.18.46.png)

We use the “dot” syntax `fmt.Println()` to specify that the function is provided by that package.

After the code executes the `main` function, it has nothing else to do and the execution ends.
