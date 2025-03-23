---
lang: en-US
title: Slices in Go
description: Article(s) > (12/21) The Go Handbook – Learn Golang for Beginners 
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
      content: Article(s) > (12/21) The Go Handbook – Learn Golang for Beginners
    - property: og:description
      content: Slices in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/slices-in-go.html
date: 2022-10-19
author: Flavio Copes
isOriginal: false
cover: https://freecodecamp.org/news/content/images/2022/10/golang.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Go Handbook – Learn Golang for Beginners",
  "desc": "Golang is an awesome, simple, modern, and fast programming language. It’s compiled, open source, and strongly typed. Golang – also called Go – was created by Google engineers with these main goals: make their projects compile (and run) faster be sim...",
  "link": "/freecodecamp.org/go-beginners-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Go Handbook – Learn Golang for Beginners"
  desc="Golang is an awesome, simple, modern, and fast programming language. It’s compiled, open source, and strongly typed. Golang – also called Go – was created by Google engineers with these main goals: make their projects compile (and run) faster be sim..."
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-slices-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

A slice is a data structure similar to an array, but it can change in size.

Under the hood, slices use an array and they are an abstraction built on top of them that makes them more flexible and useful (think about arrays as lower level).

You will use slices in a way that’s very similar to how you use arrays in higher level languages.

You define a slice similarly to an array, omitting the length:

```go
var mySlice []string //a slice of strings
```

You can initialize the slice with values:

```go
var mySlice = []string{"First", "Second", "Third"}

//or

mySlice := []string{"First", "Second", "Third"}
```

You can create an empty slice of a specific length using the `make()` function:

```go
mySlice := make([]string, 3) //a slice of 3 empty strings
```

You can create a new slice from an existing slice, appending one or more items to it:

```go
mySlice := []string{"First", "Second", "Third"}

newSlice := append(mySlice, "Fourth", "Fifth")
```

Note that we need to assign the result of `append()` to a new slice, otherwise we’ll get a compiler error. The original slice is not modified – we’ll get a brand new one.

You can also use the `copy()` function to duplicate a slice so it does not share the same memory of the other one and is independent:

```go
mySlice := []string{"First", "Second", "Third"}

newSlice := make([]string, 3)

copy(newSlice, mySlice)
```

If the slice you’re copying to does not have enough space (is shorter than the original) only the first items (until there’s space) will be copied.

You can initialize a slice from an array:

```go
myArray := [3]string{"First", "Second", "Third"}

mySlice = myArray[:]
```

Multiple slices can use the same array as the underlying array:

```go
myArray := [3]string{"First", "Second", "Third"}

mySlice := myArray[:]
mySlice2 := myArray[:]

mySlice[0] = "test"

fmt.Println(mySlice2[0]) /"test"
```

Those 2 slices now share the same memory. Modifying one slice modifies the underlying array and causes the other slice generated from the array to be modified, too.

As with arrays, each item in a slice is stored in memory in consecutive memory locations.

If you know you need to perform operations on the slice, you can request it to have more capacity than initially needed. This way, when you need more space, the space will be readily available (instead of finding and moving the slice to a new memory location with more space to grow and dispose via garbage collection of the old location).

We can specify the **capacity** by adding a third parameter to `make()`:

```go
newSlice := make([]string, 0, 10)
//an empty slice with capacity 10
```

As with strings, you can get a portion of a slice using this syntax:

```go
mySlice := []string{"First", "Second", "Third"}

newSlice := mySlice[:2] //get the first 2 items
newSlice2 := mySlice[2:] //ignore the first 2 items
newSlice3 := mySlice[1:3] //new slice with items in position 1-2
```
