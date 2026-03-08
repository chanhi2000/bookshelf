---
lang: en-US
title: "How to Get Started Coding in Golang"
description: "Article(s) > How to Get Started Coding in Golang"
icon: fa-brands fa-golang
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
      content: "Article(s) > How to Get Started Coding in Golang"
    - property: og:description
      content: "How to Get Started Coding in Golang"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-started-coding-in-golang.html
prev: /programming/go/articles/README.md
date: 2026-03-13
isOriginal: false
author:
  - name: Njong Emy
    url: https://freecodecamp.org/news/author/njong329/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a429db13-593a-4afe-be02-2c94ae1f246f.png
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
  name="How to Get Started Coding in Golang"
  desc="In the world of Software Engineering, there are plenty of programming languages to learn. And there are both low-level and high-level options. I’ve tried my hand at a few of them, and the one language"
  url="https://freecodecamp.org/news/how-to-get-started-coding-in-golang"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a429db13-593a-4afe-be02-2c94ae1f246f.png"/>

In the world of Software Engineering, there are plenty of programming languages to learn. And there are both low-level and high-level options.

I’ve tried my hand at a few of them, and the one language that feels like it touches both worlds is Golang – popularly known as Go. Although Go is a high-level language, it has pretty amazing performance that brings it close to the low-level edge.

Go is a fast, statically typed programming language. Types are declared at compile time, and you don’t need to run the code before catching errors. It’s also a general-purpose language that you can use for backend, cloud, servers, and more.

Go has built-in testing support, so you don’t need to install extra testing libraries. Go also has some features of object-oriented languages, but in its own way. It mirrors some OOP concepts, but also uses concepts like interfaces, structs, and so on.

In this tutorial, we're going to be looking at a few basic concepts you need to know when getting started in any programming language. A few of them are generic to many programming languages, but some of them are concepts specific to the Go programming language. We'll take a look at:

- Variables
- Formatting strings
- Arrays and slices
- Loops
- Functions
- Maps
- Structs, and
- Package scope

By the end of the article, you'll be grounded in the pure basics of Go, and we'll run a few examples to see how these work on the command line.

::: note Prerequisites

To follow along with this tutorial, it’ll be helpful if you know the basics of any programming language, such as variables, data types, and data structures. I’ll assume that you’ve worked with at least one programming language before.

:::

---

## How to Install Go

To install Go, head to [<VPIcon icon="fa-brands fa-golang"/>`golang.org`](http://golang.org/). Depending on what OS you are running, the documentation provides different installation options.

In my case, I’m using **WSL** (Windows Subsystem for Linux) with Ubuntu, so I’ll install Go inside that environment.

First, update your package list:

```sh
sudo apt update
sudo apt upgrade -y
```

Next, install a tool to download files from the internet. We’ll use **wget**:

```sh
sudo apt install -y wget
```

Now download the Go binary package:

```sh
wget https://dl.google.com/go/go1.24.2.linux-amd64.tar.gz
```

Extract the archive to <VPIcon icon="fas fa-folder-open"/>`/usr/local`:

```sh
sudo tar -C /usr/local -xzf go1.24.2.linux-amd64.tar.gz
```

After installing Go, add the Go binary directory to your **PATH** so the `go` command is available in the terminal:

```ruby
export PATH=$PATH:/usr/local/go/bin
```

You can make this change permanent by adding the line above to your <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`.bashrc` or <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`.profile`.

To confirm Go was installed successfully, run:

```go
go version
```

You should see the installed Go version printed in the terminal.

If you use VS Code, you can also install the Go extension for syntax highlighting.

---

## How to Write Your First Go Program

Before we get into writing our first program, we need to establish how Go puts its code together. In Go, every file or code is part of a package.

In this example, we’ll create a file called <VPIcon icon="fa-brands fa-golang"/>`main.go`. The name isn’t special to Go, but it’s a common convention for the file that contains the program’s entry point.

```go title="main.go"
package main

import "fmt"

func main() {
    fmt.Println("Hello, ninjas")
}
```

This is the most important file in our project. We'll begin by making the code we’ll write in this file part of a package we call `main`.

The `fmt` import is a package from the Go standard library. `fmt` is for formatting strings and outputting to the console. Notice that the `Println` function starts with a capital letter, because within the `fmt` package, the method is exported. Variables or methods that are exported in Go should begin with capital letters. The `Println` prints a line to the console.

The `main` function serves as the entry point of a Go program. A compiled Go program must contain **exactly one** `main` **function inside a** `package main`. (A larger codebase can still contain multiple programs, each in its own directory with its own `package main`.)

So when you run a Go program, the Go toolchain builds all files in the same package together and then starts execution from the `main()` function. The filename <VPIcon icon="fa-brands fa-golang"/>`main.go` does not determine execution order – it’s simply a common naming convention.

Unlike other custom packages, which are used to bundle application logic into libraries or reusable code, the `main` package is used to specify that a program is a standalone executable.

To run the code, you can simply type `go run main.go`, specifying the Go file that we want to execute.

```plaintext
Hello, ninjas
```

---

## How to Work with Variables and Numbers in Go

### How to Declare Variables

A variable is just a store for data. Go does not allow unused local variables. If you declare a variable inside a function and never use it, the compiler will raise an error. This helps prevent cluttered code and unused definitions.

Let’s see how to declare variables in Go by declaring a string

```go title="main.go"
package main

import "fmt"

func main() {

    // strings
    var nameOne string = "emy"

    fmt.Println(nameOne)
}
```

Because Go is a statically typed language, every variable must have a type at compile time. Here, we have a variable `nameOne`, it’s type, and then an initial value assigned to it.

But what if we don't want to state the variable type ourselves? Fortunately, Go lets us define variables without a type stated at compile time

```go
// strings
var nameOne string = "emy"
var nameTwo = "blessing"
var nameThree string
```

For `nameTwo`, we don’t need to explicitly state the type because Go directly infers it. If you hover above the variable, you can see that Go already tells you the type. The third variable, `nameThree`, has no value assigned to it just yet. We’ve only just declared it.

If you log the output to the console, you can see `nameOne` and `nameTwo` displayed, but you can’t see `nameThree`. It’s also logged, you just can’t see it because it has no value.

```go
emy blessing 
```

There’s an even shorter and simpler way to declare variables in Go:

```go
nameFour := "peaches"
```

Here, Go also infers the variable type based on the value assigned to it. Notice how we also didn’t use the `var` keyword. You can use this method inside any function, not just in `main`. Just keep in mind that you can't use this method of declaring variables when reassigning or updating a variable, declaring constants, or declaring safe types.

### How to Declare Integers

When it comes to declaring integers, we pretty much use the same technique as above:

```go
var ageOne int = 20
var ageTwo = 30
ageThree := 40

fmt.Println(ageOne, ageTwo, ageThree)
```

When declaring integers, we can specify the amount of memory or the bit size we want an integer to have. We can declare the integer as `int8`, `int16`, or `int64`.

Each of these memory sizes can hold a specific range of numbers. `int8`, for example, can only hold integers between -128 and 127. Anything bigger than that would throw an error:

```go
// bits and memory
var numOne int8 = 25
var numTwo int8 = -128

var numThree int8 = 129 // will throw an error
```

Another type of integer in Go is the unsigned integer, declared with `uint`. You’ll use this to declare only positive integers – you can’t use it to store negative values.

`uint`, just like the `int` type, can also be associated with bit sizes. You could have a `uint8`, `uint16`, and so on. But the ranges for these are different. You can check the complete list of bit sizes for the integer type and their ranges on this [<VPIcon icon="fa-brands fa-golang"/>Go page](https://go.dev/ref/spec#Numeric_types).

`int` is specifically used to declare whole integer numbers. To declare decimal numbers, you can use a float. The concept is the same with `int`, where you can have floats with different bit sizes. But you can only have `float32` and `float64`, where the latter can store bigger numbers than the former.

---

## How to Format Strings in Go

### Printing Strings to the Console

We came across the `fmt` package at the beginning of the article. Let’s go through some of the methods this package exposes.

First, we have the `Print()` method which logs some output the console. This method is used to log simple strings to the command line when we just want to see the output of something, and don’t really care about the readability.

If we have two simple strings as shown below;

```go
// Print
fmt.Print("Hello, ")
fmt.Print("world!")

// Output: Hello, world!
```

You can see that the code above is not on separate lines, and this is the downside of the `Print` function. If we had multiple things to log to the command line, this function would just lump them together and readability could suffer.

But we can enforce a new line with `Print()` by using the escape character `\\n` .

```go
fmt.Print("hello! \\n")
fmt.Print("new line \\n")
//
// hello! 
// new line 
```

Using escape characters throughout our code can get tiring very quickly. Luckily for us, Go has a function that helps us achieve the perfect separate line formatting we are looking for. We don’t need to use escape characters when we use `Println` .

```go
fmt.Println("Hello, friends.")
fmt.Println("How are you?")
//
// Hello, friends.
// How are you?
```

### Format Specifiers

Sometimes, you may want to log a string to the console, but you may also want to have variables within that string. This is called a formatted string, and we can achieve this with the help of format specifiers. These format specifiers are reserved characters that Go uses at runtime to position variables within strings.

Let’s use a concrete example to see the concept better,

```go
name := "Emy"
age := 27

fmt.Printf("my age is %v and my name is %v", age, name)
//
// my age is Emy and my name is 27
```

The format specifier `%v` is the default format specifier that stands for variable. We can see that in the position of the format specifiers, Go has placed the values of the arguments we passed to the `Printf` (`age` and `name`). It's important to note that the order in which we pass these arguments is important.

As we just saw above, the output of this code:

```go
name := "Emy"
age := 27

fmt.Printf("my age is %v and my name is %v", name, age)
```

Would be `my age is Emy and my name is 27`. The order in which we pass the arguments is the same way in which the compiler will replace the format specifier within our string.

Something new you might also notice is that we didn't use `Print` or `Println` in this code like we did before. When working with formatted directives, Go puts the functions `Printf`, `Sprintf`, and `Appendf` at our disposal.

- `Printf` directs the output to the console, as we’ve seen.
- With `Sprintf`, we don't direct the output to the command line, but we can store it in a variable and then use that variable somewhere else in our code.
- It gets a little more complex when working with `Appendf`, which formats according to a format specifier and appends the result to a byte slice (bytes are a bit out of the scope of this article, so we won’t dwell on them).

Besides the `%v` format specifier, we can also use `%q` if we want the embedded variable to have quotes around it.

```go
// strings
name := "Emy"

fmt.Printf("my name is %q", name)
//
// my name is "Emy"
```

This will work for the `name` variable, but not really for the `age` because it’s an integer.

```go
name := "Emy"
age := 27

fmt.Printf("my age is %q and my name is %q", name, age)
//
// my age is '\\\\x1b' and my name is "Emy"
```

We also have the `%T` specifier, which is used to output the type of a variable.

If we wanted to get the type of `age`:

```go
fmt.Printf("This is a variable of type %T", age)
```

The output of this would be:

```plaintext
This is a variable of type int
```

You can check out other format specifiers on the official [<VPIcon icon="fa-brands fa-golang"/>fmt package page](https://pkg.go.dev/fmt).

---

## How to Work with Arrays and Slices in Go

### Arrays in Go

Arrays in Go are a little bit of a mouthful. Let’s take a look at how to define an array:

```go
var ages = [3]int{20, 25, 30}
```

In this code, we have the variable name on the left side as is typical. On the right side, we have `[3]` to specify the size of the array, the type as `int` , and the values for the array inside the squiggly braces.

Once we declare an array, we can never change its size. This is kind of a bummer if you ask me, because during coding, you don’t always know the size of an array when you declare it (more on this below when we talk about slices).

Arrays in Go also can’t contain multiple types. The array we declared above can’t also contain a string, for example.

If we log the array to the console alongside its length with `fmt.Println(ages, len(ages))`, on the console we get:

```plaintext
[20 25 30] 3
```

### Slices in Go

If you need to define an array where you don’t know or don’t want to specify the size during declaration, you can use a slice. Slices are abstractions of arrays, and are more flexible than arrays because they have dynamic sizing.

```go
var scores = []int{100, 50, 60} // we don't specify the size
scores[2] = 25 // to update a value
scores = append(scores, 50) // returns a new scores slice with 50 appended to it  (you cannot do this with arrays)
fmt.Println(scores, len(scores)) // [100 50 60 50] 4
```

An important part of working with arrays, slices, or any data structures that store data is knowing how to get the elements we want. We may only want to grab data that belongs to a certain range, or data at certain positions, based on certain conditions, and so on.

When it comes to dealing with ranges, say you want to output the slice elements from position 1 (that is, [<VPIcon icon="fa-brands fa-wikipedia-w"/>index 0](https://en.wikipedia.org/wiki/Zero-based_numbering), the first element) right up to the third position (index 2).

```go
rangeOne := scores[0:3] // [100 50 60]
```

The range `scores[0:3]` indicates that the code should list the scores from index 0 up to index 3 minus 1. So it doesn’t include the element at index 3. If you wanted to log from index 2 in the slice right up to the end, for example, you’d write `scores[2:]` . Similarly, you could log from the beginning of the slice up to and excluding some position (in this case, index 3) like so, `scores[:3]` .

---

## How to Work with Loops in Go

### How to Iterate Loops

Loops in Go are similar to loops in other programming languages. The difference is that Go focuses on the `for` loop and doesn’t really dwell on `while`, `do-while`, or `for-each`.

```go
x := 0
for x < 5 {
    fmt.Println("the value of x is", x)
    x++
}
```

The loop above is straightforward and just prints the value of `x` from 0 to 4. To create a loop that uses an iterator, you can write this:

```go
for i := 0; i < 5; i++ {
    fmt.Println("value of i is", i)
}
//
// value of i is 0
// value of i is 1
// value of i is 2
// value of i is 3
// value of i is 4
```

It does pretty much the same thing as the loop above it, but we declared the iterator, it’s range, and we iterate over it in the same expression.

What if you wanted to iterate or loop over a slice, for example? We can also use an iterator to achieve this as we have above.

```go
names := []string{"emy", "ble", "winkii"}

for i := 0; i < len(names); i++ {
    fmt.Println(names[i])
}
```

### How to Use the `range` Keyword

Another interesting keyword related to iterations is `range`. Using the `range` keyword, you can use loops to perform actions on elements in a slice. `range` provides the index and value of the element in a slice, and allows you to access those within the loop.

```go
for index, value := range names {
    fmt.Printf("the position of %v is %v \\\\n", value, index)
}
```

What if you didn’t want to use the index and only the value? Well, `range` requires that you define an index and a value. So if you rewrite your loop like this:

```go
for index, value := range names {
    fmt.Printf("the value is %v \\\\n", value)
}
```

Go is going to throw an error because you’re declaring the `index` but not using it.

Luckily, there’s a way to bypass this, and Go does it neatly using the blank identifier, `_`. We use this identifier when a method or function expects that you define a return value that you don't need.

```go
for _, value := range names {
    fmt.Printf("the value is %v \\\\n", value)
}
```

You could apply the same strategy if you wanted only the index, but not the value.

```go
for index, _ := range names {
    fmt.Printf("the index is %v \\\\n", index)
}
```

---

## How to Work with Functions in Go

A function is a reusable block of code. Functions in Go are mostly created outside the `main` function. This way, other files can access and use them.

```go title="main.go"
package main

import (
    "fmt"
)

func sayGreeting(n string){
    fmt.Printf("Good morning")
}

func main() {
    sayGreeting("emy")
}
```

Go also allows you to pass functions as parameters to other functions.

```go
func cycleNames(n []string, f func(string)) {
    for _, value := range n {
        f(value)
    }
}
```

The function above takes a slice and a function as parameters. The function passed as a parameter in turn takes a string. You could pass a slice of names alongside the greeting function, so that for each name in the slice, you run the greeting function to print a greeting for that name.

```go
func main(){
    cycleNames([]string{"emy", "pearl"}, sayGreeting)
}
```

When passing the `sayGreeting` function as a parameter, you don’t invoke it immediately because that’s done within the `cycleNames` function already. You only pass its reference.

### Functions with `return` Values

Functions may also need to have a return value. So, how does Go handle that? Let’s see a small example:

```go
package main

import "fmt"

func sayHello(name string) string {
    fmt.Printf("Hello %v", name)
    return name
}

func main() {
    sayHello("Emy")
}
//
// Hello Emy
```

Just like with variables, we must specify the data type for every function parameter, and also specify the data type of the expected return value. In the example above, our function `sayHello` takes a string and returns a string.

Functions can also have multiple return values, as we see in the example below:

```go title="package main"

import "fmt"

func sayHello(name string, age int) (string, int) {
    fmt.Printf("Hello %v, you are %v years old", name, age)
    return name, age
}

func main() {
    sayHello("Emy", 27)
}
```

Just like the previous example, we have to specify data types for our function parameters and return values.

---

## How to Work with Maps in Go

A map in Go is a built-in, unordered collection of unique key-value pairs, similar to dictionaries in Python or hash tables in other languages. Maps provide fast lookups, insertions, and deletions.

With maps, all the keys must be of the same data type, and so must the values. If one key is a string, then all the other keys must also be strings. The same concept applies for values.

```go
scores := map[string]float64{
    "maths":           20,
    "english":         15,
    "french":          14,
    "spanish":         12,
}

fmt.Println(scores)
fmt.Println(scores["maths"])
//
// map[english:15 french:14 maths:20 spanish:12]
// 20
```

You can also loop through maps to get their keys and corresponding values:

```go
// loops maps
for key, value := range scores {
    fmt.Println(key, "-", value)
}

//
// french - 14
// spanish - 12
// maths - 20
// english - 15
```

When it comes to mutating maps, it's important to note that maps are reference types. Reference types are types whose variables don’t store the actual data, but rather an internal pointer to the actual data. This means that if the same data is assigned to multiple variables, when one instance gets modified, the original gets modified as well.

Let’s understand this with an example;

```go title="main.go"
package main

import "fmt"

func main() {
    scores := map[string]float64{
        "maths":   20,
        "english": 15,
        "french":  14,
        "spanish": 12,
    }

    scores2 := scores

    scores2["maths"] = 15
    fmt.Println(scores)
}
//
// map[english:15 french:14 maths:15 spanish:12]
```

If you check out the output, you can see that we modified the math score for `scores2`, but that modification also affected the original map, `scores` .

---

## How to Work with Structs in Go

A big downside of using maps is that we can only store one data type for keys and one data type for values. This feels restrictive. We need a data structure that lets us store a collection of data with different data types. This is where structs (or structures) come in.

Let’s look at an example:

```go
type Book struct {
    ID     uint
    Title  string
    Author string
    Year   int
    UserID uint
}
```

Here we have a Book struct. Structs are defined by specifying the key of the data you want the struct to carry, and the data type associated with that key.

```go
package main

import "fmt"

type Book struct {
    ID     uint
    Title  string
    Author string
    Year   int
    UserID uint
}

func main() {
    var book1 Book
    book1 = Book{1, "Jane Eyre", "Jane Austen", 1990, 6}
    fmt.Println(book1)
}
```

We initialised the `Book` struct by providing it with the data we stated in its definition. If you check the output of this (and ignore that Jane Austen didn’t write Jane Eyre, of course):

```plaintext
{1 Jane Eyre Jane Austen 1990 6}
```

If you look closely, structs resemble classes from the OOP languages. They define properties (just as with methods, properties starting with a capital letter are public and can be exported), and these properties can be used within methods or functions. The difference comes at the level of inheritance, because structs, unlike classes, support only composition and not inheritance.

We can also individually modify the properties of a struct using dot notation, like so:

```go
var book1 Book

book1 = Book{1, "Jane Eyre", "Jane Austen", 1990, 6}

book1.Title = "Things Fall Apart"
book1.Author = "Chinua Achebe"

fmt.Println(book1)
```

If you check the output again, you can see that what you initialised the struct to contain has been modified at the level of the `Title` and `Author`.

```plaintext
{1 Things Fall Apart Chinua Achebe 1990 6}
```

When working with real systems, structs come in very handy when creating models or designing the structure of data you want to store in your database.

---

## Package Scope in Go

### Importing Functions Within the Same Package

When coding real applications, it's uncommon to write all our application files in one file. This can get messy very quickly. Normally, we would write a function in one file and then call it from another file.

In this case, you can declare variables and functions in other files and still use them in your entry point file. Say you create another <VPIcon icon="fa-brands fa-golang"/>`greetings.go` file and declared some variable and method in it like this:

```go title="greetings.go"
package main

import "fmt"

var points = []int{20, 90, 100, 45, 70}

func sayHello(n string) {
    fmt.Println("Hello", n)
}
```

Notice that there is no `func main()` in this file (remember that we can have only one throughout our application).

Now, in your <VPIcon icon="fa-brands fa-golang"/>`main.go` file, you can reference the `sayHello()` function and `points` variable you created.

```go title="main.go"
func main() {
    sayHello("emy")

    for _, v := range points {
        fmt.Println(v)
    }
}
```

To run this, you’ll need to have both files running at the same time. That is:

```sh
go run main.go greetings.go
```

You can see that the output is the result of running the `sayHello()` function and looping over the `points` slice.

You could also define functions and variables in the <VPIcon icon="fa-brands fa-golang"/>`main.go` file and pass them to the <VPIcon icon="fa-brands fa-golang"/>`greetings.go` file. Remember that all these functions and variables passed between files must be declared outside the `main()` function.

### Importing Functions Across Different Packages

What if your application has, say, 100 files? Will you run all those files simultaneously? No, you won't. Since our Go code can be organised in packages, we can import a function from one package within another package. Let’s rewrite our code above, but using two different packages.

In our <VPIcon icon="fa-brands fa-golang"/>`greetings.go` file, we now have our code under a new package, `greetings` , and our `SayHello` function begins with a capital letter so that other files can import and use it.

```go title="greetings.go"
package greetings

import "fmt"

var Points = []int{20, 90, 100, 45, 70}

func SayHello(n string) {
    fmt.Println("Hello", n)
}
```

In our <VPIcon icon="fa-brands fa-golang"/>`main.go` file,

```go title="main.go"
package main

import (
    "fmt"
    "greetings"
)

func main() {
    greetings.SayHello("emy")

    for _, v := range points {
        fmt.Println(v)
    }
}
```

As you can see, we’ve imported the `greetings` package we declared in another file, and we can access the `SayHello()` method from it with dot notation.

---

## Conclusion

In this tutorial, you’ve learned some key Go concepts. You’re now familiar with how variables, strings, arrays and slices, loops, functions, maps, structs, and package scope works in Go.

At this point, you should try to take that further by building something a little bigger so you can see just how powerful and amazing Golang is.

The official [<VPIcon icon="fa-brands fa-golang"/>Tour of Go](https://go.dev/tour/welcome/1) website is also an amazing resource to reference if you want to explore these concepts a little deeper.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Started Coding in Golang",
  "desc": "In the world of Software Engineering, there are plenty of programming languages to learn. And there are both low-level and high-level options. I’ve tried my hand at a few of them, and the one language",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-started-coding-in-golang.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
