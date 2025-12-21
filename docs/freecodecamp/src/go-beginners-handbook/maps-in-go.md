---
lang: en-US
title: Maps in Go
description: Article(s) > (13/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (13/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Maps in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/go-beginners-handbook/maps-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-maps-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

A map is a very useful data type in Go.

In other language it’s also called a *dictionary* or *hash map* or *associative array*.

Here’s how you create a map:

```go
agesMap := make(map[string]int)
```

You don’t need to set how many items the map will hold.

You can add a new item to the map in this way:

```go
agesMap["flavio"] = 39
```

You can also initialize the map with values directly using this syntax:

```go
agesMap := map[string]int{"flavio": 39}
```

You can get the value associated with a key using:

```go
age := agesMap["flavio"]
```

You can delete an item from the map using the `delete()` function in this way:

```go
delete(agesMap, "flavio")
```
