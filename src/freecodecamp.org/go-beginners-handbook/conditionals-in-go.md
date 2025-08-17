---
lang: en-US
title: Conditionals in Go
description: Article(s) > (15/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (15/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Conditionals in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/conditionals-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-conditionals-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>
Go

We use the `if` statement to execute different instructions depending on a condition:

```go
if age < 18 {
    //underage
}
```

The `else` part is optional:

```go
if age < 18 {
    //underage
} else {
  //adult
}
```

and can be combined with other `if`s:

```go
if age < 12 {
    //child
} else if age < 18  {
  //teen
} else {
    //adult
}
```

If you define any variable inside the `if`, that’s only visible inside the `if` (same applies to `else` and anywhere you open a new block with `{}`).

If you’re going to have many different if statements to check a single condition, it’s probably better to use `switch`:

```go
switch age {
case 0: fmt.Println("Zero years old")
case 1: fmt.Println("One year old")
case 2: fmt.Println("Two years old")
case 3: fmt.Println("Three years old")
case 4: fmt.Println("Four years old")
default: fmt.Println(i + " years old")
}
```

Compared to C, JavaScript, and other languages, you don’t need to have a `break` after each `case`.
