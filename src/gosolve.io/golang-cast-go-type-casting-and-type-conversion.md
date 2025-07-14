---
lang: en-US
title: "Golang Cast: Go Type Casting and Type Conversion"
description: "Article(s) > Golang Cast: Go Type Casting and Type Conversion"
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
      content: "Article(s) > Golang Cast: Go Type Casting and Type Conversion"
    - property: og:description
      content: "Golang Cast: Go Type Casting and Type Conversion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/gosolve.io/golang-cast-go-type-casting-and-type-conversion.html
prev: /programming/go/articles/README.md
date: 2023-04-18
isOriginal: false
author:
  - name: Yanick
    url : https://gosolve.io/author/jgadek/
cover: https://gosolve.io/wp-content/uploads/2023/05/23456-1024x1024.png
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
  name="Golang Cast: Go Type Casting and Type Conversion"
  desc="Type casting is a technique used in programming to convert one data type to another and is essential in statically typed languages like Golang, which require explicit type conversion."
  url="https://gosolve.io/golang-cast-go-type-casting-and-type-conversion"
  logo="https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png"
  preview="https://gosolve.io/wp-content/uploads/2023/05/23456-1024x1024.png"/>

Golang cast refers to the process of converting a value of one type to another type. This conversion can be done automatically or explicitly by the programmer. Golang supports implicit type conversion, which means that it can automatically convert one type to another if it is safe to do so.

In Golang, data types are explicitly defined and cannot be changed once they are declared. Therefore, type conversion is necessary when you need to perform operations on variables of different data types. Golang supports several data types, including integers, floating points, and strings, among others.

---

## How to use type casting in Golang

To use type casting in Golang, you need to specify the type you want to convert to using the cast operator which is denoted by the type name in parentheses before the variable or expression you want to convert. For example, to convert a float number to an integer, you can use the following expression:

```go
var f float32 = 3.14
var i int = int(f)
```

In this code example, the float value `3.14` is explicitly converted to an integer using the cast operator `int`. The resulting value is assigned to the variable `i`.

---

## Golang type conversions

Golang does support implicit type conversion, which is also known as automatic type conversion. This type conversion occurs automatically during arithmetic operations on values of different data types. For example, if you add an int and a float, Golang will automatically convert the int to a float before performing the addition.

```go
var i int = 5
var f float32 = 3.14
var result = f + i
```

In this example, the integer value `5` is implicitly converted to a floating point before the addition is performed.

---

## Go type assertion

Golang also supports type assertion, which is a mechanism for extracting the concrete type from an interface value. Type assertion is used when you have an interface value and need to access its underlying type. Here is an example:

```go
var val interface{} = "hello"
s := val.(string)
```

In this example, the interface value `val` is assigned the string value `"hello"`. Type assertion is used to extract the concrete type of `val` and assign it to the variable `s`.

---

## Strconv package

The Golang standard library includes the `strconv` package, which provides functions for converting between string values and other data types. Here are some examples of using it for type conversion in Golang:

```go
var s string = "123"
i, err := strconv.Atoi(s) // convert string to int

var i int = 123
s := strconv.Itoa(i) // convert int to string
```

In the first example, the string value `123` is converted to an integer using the `strconv.Atoi` function. In the second example, the integer value `123` is converted to a string using the `strconv.Itoa` function.

---

## Uint Conversion in Go

Golang supports uint conversions, which are conversions between unsigned integers of different sizes. Golang also supports numeric conversions, which are conversions between numeric types, including floating points and integers. In numeric conversions, the values are converted to the target type based on their range and precision.

In conclusion, type casting is an essential technique in Golang that allows you to convert values of one data type to another. Golang supports explicit and implicit type conversions, as well as type assertion, which is used to extract the concrete type from an interface value. The Golang standard library includes the `strconv` package, which provides functions for converting between string values and other data types. With Golang, you can perform type casting by specifying the type you want to convert to using the cast operator, denoted by the type name in parentheses before the variable or expression you want to convert. It’s essential to note that Golang is a statically typed language, which means that once you declare a variable with a particular data type, you cannot change it later. Therefore, type casting is necessary when you need to perform operations on variables of different data types.

---

## Go casting and data type

Another important aspect of type casting in Golang is that you can only perform type casting between compatible data types. For instance, you cannot convert a string value to an integer directly using the cast operator. Instead, you need to use the `strconv` package to convert the string to an integer.

Here’s a code example that demonstrates type casting in Golang:

```go
package main

import (
  "fmt"
)

func main() {
  var num1 int32 = 10
  var num2 int64

  num2 = int64(num1)

  fmt.Println("num1: ", num1)
  fmt.Println("num2: ", num2)
}
```

In this example, we have two variables `num1` and `num2`, where `num1` is an `int32`, and `num2` is an `int64`. We use the cast operator to convert `num1` to an `int64` and assign the result to `num2`. Finally, we print the values of `num1` and `num2`. 

```plaintext title="ooutput
num1: 10
num2: 10
```

As you can see from the output, the type casting worked correctly, and num1 was converted to an `int64` and assigned to num2. It’s essential to note that type casting can result in data loss if you’re converting a larger data type to a smaller data type. For instance, if you convert a long value to an int, you may lose precision in the process. Therefore, you need to be careful when performing type casting and ensure that the target data type can handle the converted value correctly.

In conclusion, type casting is an essential aspect of Golang programming that allows you to convert values of one data type to another. Golang supports explicit and implicit type conversions, as well as type assertion, which is used to extract the concrete type from an interface value. Type casting is necessary when you need to perform operations on variables of different data types. However, you need to be careful when performing type casting and ensure that the target data type can handle the converted value correctly.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Golang Cast: Go Type Casting and Type Conversion",
  "desc": "Type casting is a technique used in programming to convert one data type to another and is essential in statically typed languages like Golang, which require explicit type conversion.",
  "link": "https://chanhi2000.github.io/bookshelf/gosolve.io/golang-cast-go-type-casting-and-type-conversion.html",
  "logo": "https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png",
  "background": "rgba(56,119,242,0.2)"
}
```
