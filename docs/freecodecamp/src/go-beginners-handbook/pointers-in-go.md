---
lang: en-US
title: Pointers in Go
description: Article(s) > (19/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (19/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Pointers in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/go-beginners-handbook/pointers-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-pointers-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

Go supports pointers.

Suppose you have a variable:

```go
age := 20
```

Using `&age` you get the pointer to the variable, its memory address.

When you have the pointer to the variable, you can get the value it points to by using the `*` operator:

```go
age := 20
ageptr = &age
agevalue = *ageptr
```

This is useful when you want to call a function and pass the variable as a parameter. Go by default copies the value of the variable inside the function, so this will not change the value of `age`:

```go
func increment(a int) {
    a = a + 1
}

func main() {
    age := 20
    increment(age)

    //age is still 20
}
```

You can use pointers for this:

```go
func increment(a *int) {
    *a = *a + 1
}

func main() {
    age := 20
    increment(&age)

    //age is now 21
}
```
