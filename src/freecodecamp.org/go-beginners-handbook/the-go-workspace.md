---
lang: en-US
title: The Go workspace
description: Article(s) > (6/21) The Go Handbook – Learn Golang for Beginners 
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
      content: Article(s) > (6/21) The Go Handbook – Learn Golang for Beginners
    - property: og:description
      content: The Go workspace
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/the-go-workspace.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-the-go-workspace"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

One special thing about Go is what we call the **workspace**.

The workspace is the “home base” for Go.

By default Go picks the <FontIcon icon="fas fa-folder-open"/>`$HOME/go` path, so you will see a <FontIcon icon="fas fa-folder-open"/>`go` folder in your home.

It’s first created when you install a package (as we’ll see later) but also to store some tooling.

For example the moment I loaded the <FontIcon icon="fa-brands fa-golang"/>`hello.go` file in VS Code, it prompted me to install the [`gopls`](https://pkg.go.dev/golang.org/x/tools/gopls) command, the Delve debugger (`dlv`), and the [<FontIcon icon="fas fa-globe"/>`staticcheck` linter](https://staticcheck.io/).

They were automatically installed under <FontIcon icon="fas fa-folder-open"/>`$HOME/go`:

![<FontIcon icon="fas fa-folder-open"/>`$HOME/go`](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_12.27.27.png)

When you install packages using `go install`, they will be stored here.

This is what we call **GOPATH**.

You can change the `GOPATH` environment variable to change where Go should install packages.

This is useful when working on different projects at the same time and you want to isolate the libraries you use.
