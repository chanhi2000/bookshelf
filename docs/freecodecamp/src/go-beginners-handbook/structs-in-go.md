---
lang: en-US
title: Structs in Go
description: Article(s) > (17/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (17/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Structs in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/go-beginners-handbook/structs-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-structs-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

A **struct** is a *type* that contains one or more variables. It’s like a collection of variables. We call them *fields*. And they can have different types.

Here’s an example of a struct definition:

```go
type Person struct {
    Name string
    Age int
}
```

Note that I used uppercase names for the fields, otherwise those will be *private* to the package. And when you pass the struct to a function provided by another package, like the ones we use to work with JSON or database, those fields cannot be accessed.

Once we define a struct we can initialize a variable with that type:

```go
flavio := Person{"Flavio", 39}
```

and we can access the individual fields using the dot syntax:

```go
flavio.Age //39
flavio.Name /"Flavio"
```

You can also initialize a new variable from a struct in this way:

```go
flavio := Person{Age: 39, Name: "Flavio"}
```

This lets you initialize only one field, too:

```go
flavio := Person{Age: 39}
```

or even initialize it without any value:

```go
flavio := Person{}

//or

var flavio Person
```

and set the values later:

```go
flavio.Name = "Flavio"
flavio.Age = 39
```

Structs are useful because you can group unrelated data and pass it around to/from functions, store in a slice, and more.

Once defined, a struct is a type like `int` or `string` and this means you can use it inside other structs, too:

```go
type FullName struct {
    FirstName string
    LastName string
}

type Person struct {
    Name FullName
    Age int
}
```
