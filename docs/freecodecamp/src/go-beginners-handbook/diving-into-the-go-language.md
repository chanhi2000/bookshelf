---
lang: en-US
title: Diving into the Go language
description: Article(s) > (7/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (7/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: Diving into the Go language
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/diving-into-the-go-language.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-diving-into-the-go-language"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

Now that we've got the first notions in place, and we ran our first Hello, World! program, we can dive into the language.

The language has no semantically significant whitespace. This is like C, C++, Rust, Java, JavaScript, but unlike Python, where whitespace is meaningful and is used to create blocks instead of curly brackets.

Semicolons are optional, like in JavaScript (unlike in C, C++, Rust or Java).

Go takes indentation and visual order very seriously.

When we install Go we also get access to the `gofmt` command line tool which we can use to format Go programs. VS Code uses that under the hood to format Go source files.

This is very interesting and innovative because formatting and issues like tabs vs spaces or “should I put the curly brackets on the same line of the loop definition or in the next line” are a huge waste of time.

The language creators defined the rules, and everyone uses those rules.

This is great for projects with large teams.

I recommend you enable in the VS Code Settings “**Format on Save**” and “**Format on Paste**”:

![VS Code settings for Go - Format on Paste and Format on Save](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_14.39.42.png)

You can write comments in Go using the usual C / C++ / JavaScript / Java syntax:

```go
// this is a line comment

/*
multi
line
comment
*/
```
