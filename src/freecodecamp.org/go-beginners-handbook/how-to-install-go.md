---
lang: en-US
title: How to install Go
description: Article(s) > (2/21) The Go Handbook - Learn Golang for Beginners 
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
      content: Article(s) > (2/21) The Go Handbook - Learn Golang for Beginners
    - property: og:description
      content: How to install Go
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/go-beginners-handbook/how-to-install-go.html
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
  url="https://freecodecamp.org/news/go-beginners-handbook#heading-how-to-install-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/10/golang.png"/>

Go to [<FontIcon icon="fa-brands fa-golang"/>go.dev/doc/install](https://go.dev/doc/install) and download the package for your Operating System.

Run the installer, and at the end of the process you will have the `go` command available in your terminal:

![Welcome to the Go installer](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_10.19.21.png)

![Successful installation modal](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_10.20.54.png)

Open the terminal and run `go version` and you should see something like this:

![Displaying the Go version you have](https://freecodecamp.org/news/content/images/2022/10/Screen_Shot_2022-07-28_at_10.21.32.png)

::: note

You might have to open a new terminal before you can run the program, as the installer added the Go binaries folder to the path.

:::

The exact location of the Go installation files will depend on your Operating System.

::: tabs

@tab:active <FontIcon icon="iconfont icon-macos"/>

On macOS, it’s under <FontIcon icon="fas fa-folder-open"/>`/usr/local/go`, with binaries in <FontIcon icon="fas fa-folder-open"/>`/usr/local/go/bin`.

@tab <FontIcon icon="fa-brands fa-windows"/>

On Windows, it will be under <FontIcon icon="fas fa-folder-open"/>`C:\Program Files\go`.

:::

The Windows and Mac installers will set the Go binaries path automatically.

On a Mac you might also want to install Go via Homebrew using `brew install golang`. This will make it easier to update later.

On Linux you will have to add the Go binaries folder to your terminal path before you can run the `go` command after unpackaging the Linux package to <FontIcon icon="fas fa-folder-open"/>`/usr/local/go` with this command:

```sh
echo 'export PATH=$PATH:/usr/local/go/bin' >> $HOME/.profile
source $HOME/.profile
```