---
lang: en-US
title: How to compile and run a Go program
description: Article(s) > (5/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (5/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: How to compile and run a Go program
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/how-to-compile-and-run-a-go-program.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-how-to-compile-and-run-a-go-program"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

Now open the terminal in the `hello` folder and run the program using:

```sh
go run hello.go
```

![Hello world output in Go](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_12.18.23.png)

Our program ran successfully, and it printed “Hello, World!” to the terminal.

The `go run` tool first compiles and then runs the program specified.

You can create a **binary** using `go build`:

```sh
go build hello.go
```

This will create a <VPIcon icon="fa-brands fa-golang"/>`hello.go` file that’s a binary you can execute:

![Executable binary in Go](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_12.19.50.png)

In the introduction I mentioned that Go is portable.

Now you can distribute this binary and everyone can run the program as-is, because the binary is already packaged for execution.

The program will run on the same architecture we built it on.

We can create a different binary for a different architecture using the `GOOS` and `GOARCH` environment variables, like this:

```go
GOOS=windows GOARCH=amd64 go build hello.go
```

This will create a <VPIcon icon="fas fa-gears"/>`hello.exe` executable for 64-bit Windows machines:

![Hello.exe executable](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_15.36.55.png)

Setup for 64-bit macOS (Intel or Apple Silicon) is `GOOS=darwin GOARCH=amd64` and Linux is `GOOS=linux GOARCH=amd64`.

This is one of the best features of Go.
