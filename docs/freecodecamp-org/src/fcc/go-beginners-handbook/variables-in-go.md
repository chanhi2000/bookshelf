---
lang: en-US
title: Variables in Go
description: Article(s) > (8/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (8/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Variables in Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/go-beginners-handbook/variables-in-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-variables-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

One of the first things you do in a programming language is defining a variable.

In Go we define variables using `var`:

```go
var age = 20
```

You can define variables at the package level:

```go
package main

import "fmt"

var age = 20

func main() {
    fmt.Println("Hello, World!")
}
```

or inside a function:

```go
package main

import "fmt"

func main() {
    var age = 20

    fmt.Println("Hello, World!")
}
```

Defined at the package level, a variable is visible across all the files that compose the package. A package can be composed of multiple files, you just need to create another file and use the same package name at the top.

Defined at the function level, a variable is visible only within that function. It’s initialized when the function is called, and destroyed when the function ends the execution.

In the example we used:

```go
var age = 20
```

we assign the value `20` to `age`.

This makes Go determine that the **type** of the variable `age` is `int`.

We’ll see more about types later, but you should know there are many different ones, starting with `int`, `string`, and `bool`.

We can also declare a variable without an existing value, but in this case we must set the type like this:

```go
var age int
var name string
var done bool
```

When you know the value, you typically use the short variable declaration with the `:=` operator:

```go
age := 10
name := "Roger"
```

For the name of the variable you can use letters, digits, and the underscore `_` as long as the name starts with a character or `_`.

Names are **case sensitive**.

If the name is long, it’s common to use camelCase. So to indicate the name of the car we use `carName`.

You can assign a new value to a variable with the assignment operator `=`

```go
var age int
age = 10
age = 11
```

If you have a variable that never changes during the program you can declare it as a constant using `const`:

```go
const age = 10
```

You can declare multiple variables on a single line:

```go
var age, name
```

and initialize them too:

```go
var age, name = 10, "Roger"

//or

age, name := 10, "Roger"
```

Declared variables that are not used in the program raise an error and the program does not compile.

You will see a warning in VS Code:

![Warning for unused declared variables](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_15.45.31.png)

and the error from the compiler:

![Error in compiler for unused declared variables](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_15.45.44.png)

If you declare a variable without initializing it to a value, it is assigned a value automatically that depends on the type - for example an integer is `0` and a string is an empty string.
