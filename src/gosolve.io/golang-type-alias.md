---
lang: en-US
title: "Golang Type Alias"
description: "Article(s) > Golang Type Alias"
icon: fa-brands fa-golang
category:
  - Go
  - Article(s)
tag:
  - blog
  - gosolve.io
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Golang Type Alias"
    - property: og:description
      content: "Golang Type Alias"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/gosolve.io/golang-type-alias.html
prev: /programming/go/articles/README.md
date: 2023-02-16
isOriginal: false
author:
  - name: Yanick
    url : https://gosolve.io/author/jgadek/
cover: https://gosolve.io/wp-content/uploads/2023/05/234-1024x1024.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Golang Type Alias"
  desc="Golang type aliases were introduced in Go version 1.9 and have been available since. Type alias declaration has a different form from the standard type definition and can be particularly helpful during code refactoring but can also have other uses."
  url="https://gosolve.io/golang-type-alias"
  logo="https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png"
  preview="https://gosolve.io/wp-content/uploads/2023/05/234-1024x1024.png"/>

## Type declaration and type definition

Before 1.9 Go language had a way to create an alternative name for all constants, functions, and almost all variables. As mentioned, alias declaration has a bit different syntax from the type definition. The type alias allows you to create a new name for an existing type. The form type declaration has is as follows:

```go
type NewAlias = OldType
```

whereas the standard type definition structure looks like that:

```go
type NewAlias OldType
```

The most significant difference between the two is that the alias declaration does create a new distinct type separate from the type it was created from. It simply creates an alias for the `T1` name. You could think about this as an alternate name for the type `T2`.

---

## Code refactoring

Type alias declaration wasn’t designed with everyday use in mind. The main idea behind the implementation of this feature to Go was to help with the maintenance of the existing code and code repair. When you need to move a type between packages while undertaking large-scale refactorings compatibility with existing clients is crucial.

---

## Type aliases: parameter types and compatibility

To make sure that the existing type and the alias will be compatible, the type alias should have interchangeable parameter types.

```go
package main

import (  
  "fmt"
)

type foo struct{}  
  
// declare a new alias for foo type  
type bar = foo
  
func printType(i bar) {  
  fmt.Printf(“my type is %T\\n”, b)  
}

func main() {  
  var b bar  
  printType(b)  
}
```

---

## Code readability

In addition to working on large codebases type aliases can be used to improve the general readability of the code. Complex function definitions can be replaced with aliases too.

```go
type QueryFunc = func(ctx context.Context, sql string, args …any) (Rows, error)
```

It’s part of `jackc/pgx` library. Instead of using this function prototype in each function, it is easier and more readable to use the new name (alias) as an argument. For example:

```go
func getFromDatabase(ctx context.Context, query QueryFunc) (Rows, error)
rows, err := getFromDatabase(ctx, conn1.Query)
rows, err = getFromDatabase(ctx, txn1.Query)
```

---

## Reducing boilerplate code

Using alternate names for types often used by packages can reduce the boilerplate code. Take into consideration the following example:

```go
for i := range listOfObjects {
  valueOfOne := listOfObjects[i].Database.Transaction.Get(ctx, 1)
  valueOfTwo := listOfObjects[i].Database.Transaction.Get(ctx, 2)
}

// ---

type getter = func(context.Context, int)
var get getter
for i := range listOfObjects {
  get = listOfObjects[i].Database.Transaction.Get
  valueOfOne = get(ctx, 1)
  valueOfTwo = get(ctx, 2)
}
```

By defining these aliases and giving the types an alternate spelling that is simpler we allow packages to simply refer to Get instead of using the whole path which on a larger scale is helpful in keeping the code clean and tight.

---

## Key takeaways

Type aliasing refers to the method of declaring a new name for an existing type. This alternate spelling improves code readability and is a big game-changer in code refactoring. From the business perspective, it shows that even if Golang is much younger than technologies such as Python and Java, Go core developers try to do anything to make it workable from the get-go.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Golang Type Alias",
  "desc": "Golang type aliases were introduced in Go version 1.9 and have been available since. Type alias declaration has a different form from the standard type definition and can be particularly helpful during code refactoring but can also have other uses.",
  "link": "https://chanhi2000.github.io/bookshelf/gosolve.io/golang-type-alias.html",
  "logo": "https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png",
  "background": "rgba(56,119,242,0.2)"
}
```
