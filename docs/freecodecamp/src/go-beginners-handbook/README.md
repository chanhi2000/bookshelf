---
lang: en-US
title: "The Go Handbook - Learn Golang for Beginners"
description: "Article(s) > The Go Handbook - Learn Golang for Beginners"
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
      content: "Article(s) > The Go Handbook - Learn Golang for Beginners"
    - property: og:description
      content: "The Go Handbook - Learn Golang for Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/
prev: /programming/go/articles/README.md
date: 2022-10-19
isOriginal: false
author: Flavio Copes
cover: https://freecodecamp.org/news/content/images/2022/10/golang.png
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
  name="The Go Handbook - Learn Golang for Beginners"
  desc="Golang is an awesome, simple, modern, and fast programming language. It’s compiled, open source, and strongly typed. Golang - also called Go - was created by Google engineers with these main goals: make their projects compile (and run) faster be sim..."
  url="https://freecodecamp.org/news/go-beginners-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

Golang is an awesome, simple, modern, and fast programming language.

It’s compiled, open source, and strongly typed.

Golang - also called Go - was created by Google engineers with these main goals:

- make their projects compile (and run) faster
- be simple so people can pick it up in little time
- be low level enough but also avoid some pitfalls of being too low level
- be portable (compiled Go programs are binaries that do not require other files to run and are cross-platform, so they can be distributed easily)
- be boring, stable, predictable, offer less opportunities to make mistakes
- make it easy to take advantage of multiprocessor systems

Go was meant to be a replacement for C and C++ codebases. It aims to make some things simpler like concurrency and memory management, with garbage collection.

Also, it was built to work along with C and C++ codebases, thanks to its C interoperability features.

You can use Go for many different tasks, and it can solve both simple problems and very complex ones.

You can use Go to create command line utilities and networking servers, and it's widely used in many different scenarios.

For example, Docker and Kubernetes are written in Go.

My favorite Static Site Generator (Hugo) is written in Go.

Caddy, a quite popular web server, is written in Go.

There’s lots of different, widely used tools that use this programming language under the hood.

This handbook will introduce you to the Go programming language so you can get started coding in Go.

```component VPCard
{
  "title": "How to get started with Go",
  "desc": "(1/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/how-to-get-started-with-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to install Go",
  "desc": "(2/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/how-to-install-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to setup your editor",
  "desc": "(3/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/how-to-setup-your-editor.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to write Hello, World! in Go",
  "desc": "(4/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/how-to-write-hello-world-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to compile and run a Go program",
  "desc": "(5/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/how-to-compile-and-run-a-go-program.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "The Go workspace",
  "desc": "(6/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/the-go-workspace.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Diving into the Go language",
  "desc": "(7/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/diving-into-the-go-language.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Variables in Go",
  "desc": "(8/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/variables-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Basic types in Go",
  "desc": "(9/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/basic-types-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Strings in Go",
  "desc": "(10/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/strings-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Arrays in Go",
  "desc": "(11/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/arrays-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Slices in Go",
  "desc": "(12/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/slices-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Maps in Go",
  "desc": "(13/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/maps-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Loops in Go",
  "desc": "(14/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/loops-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Conditionals in Go",
  "desc": "(15/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/conditionals-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Operators in Go",
  "desc": "(16/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/operators-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Structs in Go",
  "desc": "(17/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/structs-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Functions in Go",
  "desc": "(18/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/functions-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Pointers in Go",
  "desc": "(19/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/pointers-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Methods in Go",
  "desc": "(20/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/methods-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Interfaces in Go",
  "desc": "(21/21) The Go Handbook - Learn Golang for Beginners",
  "link": "/freecodecamp.org/go-beginners-handbook/interfaces-in-go.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Where to Go from Here

This handbook is an introduction to the Go programming language.

Beside these basics, there are many things to learn now.

Garbage collection, error handling, concurrency and networking, the filesystem APIs, and much more.

The sky is the limit.

My suggestion is to pick a program you want to build and just start, learning the things you need along the way.

It will be fun and rewarding.

::: note

you can get a PDF and ePub version of this Go Beginner's Handbook here

<SiteInfo
  name="Books | Flavio Copes"
  desc="I help people learn to code."
  url="https://flaviocopes.com/books/"
  logo="https://flaviocopes.com/img/favicon-16x16.png"
  preview="https://flaviocopes.com/images/og.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Go Handbook - Learn Golang for Beginners",
  "desc": "Golang is an awesome, simple, modern, and fast programming language. It’s compiled, open source, and strongly typed. Golang - also called Go - was created by Google engineers with these main goals: make their projects compile (and run) faster be sim...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
