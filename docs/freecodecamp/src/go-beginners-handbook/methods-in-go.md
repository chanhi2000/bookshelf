---
lang: en-US
title: Methods in Go
description: Article(s) > (20/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (20/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Methods in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/go-beginners-handbook/methods-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-methods-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

You can assign a function to a struct, and in this case we call it a *method*.

Example:

```go
type Person struct {
    Name string
    Age int
}

func (p Person) Speak() {
    fmt.Println("Hello from " + p.Name)
}

func main() {
    flavio := Person{Age: 39, Name: "Flavio"}
    flavio.Speak()
}
```

You can declare methods to be pointer receiver or value receiver.

The above example shows a value receiver. It receives a copy of the struct instance.

This would be a pointer receiver that receives the pointer to the struct instance:

```go
func (p *Person) Speak() {
    fmt.Println("Hello from " + p.Name)
}
```
