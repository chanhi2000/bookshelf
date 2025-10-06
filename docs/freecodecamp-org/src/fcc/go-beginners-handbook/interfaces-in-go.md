---
lang: en-US
title: Interfaces in Go
description: Article(s) > (21/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (21/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Interfaces in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/go-beginners-handbook/interfaces-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-interfaces-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

An interface is a *type* that defines one or more *method signatures*.

Methods are not implemented, just their signature: the name, parameter types and return value type.

Something like this:

```go
type Speaker interface {
    Speak()
}
```

Now you could have a function accept any type that implements all the methods defined by the interface:

```go
func SaySomething(s Speaker) {
    s.Speak()
}
```

And we can pass it any struct that implements those methods:

```go
type Speaker interface {
    Speak()
}

type Person struct {
    Name string
    Age int
}

func (p Person) Speak() {
    fmt.Println("Hello from " + p.Name)
}

func SaySomething(s Speaker) {
    s.Speak()
}

func main() {
    flavio := Person{Age: 39, Name: "Flavio"}
    SaySomething(flavio)
}
```
