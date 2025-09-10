---
lang: en-US
title: "Understanding the Language Server Protocol - Easier Code Editing Across Languages and Tools"
description: "Article(s) > Understanding the Language Server Protocol - Easier Code Editing Across Languages and Tools"
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
      content: "Article(s) > Understanding the Language Server Protocol - Easier Code Editing Across Languages and Tools"
    - property: og:description
      content: "Understanding the Language Server Protocol - Easier Code Editing Across Languages and Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-the-language-server-protocol-easier-code-editing-across-languages.html
prev: /programming/go/articles/README.md
date: 2025-01-09
isOriginal: false
author:
  - name: Alex Pliutau
    url : https://freecodecamp.org/news/author/pltvs/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1736371728078/f1da2e66-4095-44e6-bcdf-de44c92e81ad.jpeg
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
  name="Understanding the Language Server Protocol - Easier Code Editing Across Languages and Tools"
  desc="In the past, many code editors were built just for one specific language. To provide rich and smart code editing, tight integration between the editor and the language tooling was a must. On the other hand, there were (and still are) more general-pur..."
  url="https://freecodecamp.org/news/what-is-the-language-server-protocol-easier-code-editing-across-languages"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1736371728078/f1da2e66-4095-44e6-bcdf-de44c92e81ad.jpeg"/>

In the past, many code editors were built just for one specific language. To provide rich and smart code editing, tight integration between the editor and the language tooling was a must.

On the other hand, there were (and still are) more general-purpose editors, but they lacked in functionality when it came to more advanced language-specific features like code completion, “go to definition”, and so on. As an example, code highlighting was done using regular expressions.

With the growing number of code editors and programming languages available, this became the classic **M\*N** complexity problem.

But then Microsoft introduced the [<FontIcon icon="fas fa-globe"/>Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) as a solution to the problem above, which elegantly transforms this **M\*N** complexity into a more manageable **M+N** situation.

---

## Why Microsoft Created the LSP

The LSP was initially driven by the needs of VS Code. VS Code had to work with hundreds of different Language Servers as part of its extensions. But there were multiple problems:

- **Language mismatch**: Language Servers are often written in different languages than the editor (like VS Code's Node.js).
- **Performance impact**: Language features can be resource-intensive, potentially slowing down the editor.
- **Integration complexity**: Multiple editors and multiple languages introduces the **M\*N** complexity mentioned above.

Exactly because of that, Microsoft introduced LSP to standardize the communication between language tools and editors, allowing language servers to be written in any language, run separately for better performance, and easily integrate with any LSP-compliant editor. This simplifies language support for both tool providers and editor vendors.

You can find more info in this [<FontIcon icon="iconfont icon-vscode"/>Language Server Extension Guide](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide).

<SiteInfo
  name="Language Server Extension Guide"
  desc="Learn how to create Language Servers to provide rich language features in Visual Studio Code."
  url="https://code.visualstudio.com/api/language-extensions/language-server-extension-guide/"
  logo="/assets/favicon.ico"
  preview="https://code.visualstudio.com/opengraphimg/opengraph-docs.png"/>

---

## What is the Language Server Protocol (LSP)?

The LSP separates language servers from code editors (language clients). By making language servers independent processes dedicated to language understanding, the LSP enables any editor to utilize a standard language server. This means that a single standard language server can be used by all editors.

This interoperability is achieved through a defined set of standard messages and procedures that govern communication between language servers and editors. The LSP defines the format of the messages sent using JSON-RPC between the development tool and the language server.

![Communication between the editor and the Language Server](https://miro.medium.com/v2/resize:fit:700/0*Vdycq7316e_hKTCe.png)

---

## Language Server Features

The list of features may vary for each individual language server, but usually they provide the following functionalities:

- Auto-completion
- Go to definition/declaration
- Find references
- Code formatting
- Diagnostics
- Documentation

And more.

For example, [here (<FontIcon icon="iconfont icon-github"/>`golang/tools`)](https://github.com/golang/tools/blob/master/gopls/doc/features/README.md) you can see the list of editor features that **gopls** (the Go Language Server) provides.

And [<FontIcon icon="fas fa-globe"/>here](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#languageFeatures) you can see the full LSP specification for available features.

There are hundreds of Language Servers out there. Typically, every mature programming language (or markup language) has at least one Language Server. You can see the full list of language servers that implement LSP [<FontIcon icon="fas fa-globe"/>here](https://microsoft.github.io/language-server-protocol/implementors/servers/).

---

## How Does LSP Work?

The Language Server Protocol is built upon [<FontIcon icon="fas fa-globe"/>JSON-RPC](https://jsonrpc.org/). It specifically uses JSON RPC 2.0. You can think of JSON-RPC as a remote procedure call protocol that uses JSON for data encoding.

In a nutshell, it works like this. First, the editor establishes a connection with the language server. Then as the developer types code, the editor sends incremental changes to the language server. It then sends back insights like code completion suggestions and diagnostics.

Let’s see one real example for auto-completion. The request from the Language Client (editor) for this case will be:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "textDocument/completion",
  "params": {
    "textDocument": {
      "uri": "file:///home/alex/code/test/main.go"
    },
    "position": {
      "line": 35,
      "character": 21
    }
  }
}
```

As you can see, it sends the information about current cursor position and the buffer file. Let’s break it down:

- **ID**: The client sets this field to identify the request uniquely. Once the request is processed, it will return a response with the same request ID so that the client can match which response is for what request.
- **Method**: A string containing the name of the method to be invoked.
- **Params**: The parameters to be passed to the method. This can be structured as an array or an object.

Language server can access this file, analyze it, and respond with suggestions:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "isIncomplete": false,
    "items": [
      {
        "label": "Println",
        "kind": 3,
        "insertText": "Println(${1:format}, ${2:a ...interface{}})$0",
        "insertTextFormat": 2,
        "detail": "func Println(a ...interface{}) (n int, err error)",
        "documentation": "Println formats ..."
      },
      // ... other items
    ]
  }
}
```

---

## Language Server for Go

The most popular and commonly used language server for Go is [gopls (<FontIcon icon="iconfont icon-github"/>`golang/tools`)](https://github.com/golang/tools/tree/master/gopls). It is used by many editors, for example by the [Visual Studio Code Go extension (<FontIcon icon="iconfont icon-github"/>`golang/vscode-go`)](https://github.com/golang/vscode-go). Previously, there was another popular Language Server for Go by the Sourcegraph team called [go-langserver (<FontIcon icon="iconfont icon-github"/>`golang/vscode-go`)](https://github.com/sourcegraph/go-langserver), but this is no longer under active maintenance.

Many editors install gopls Language Server automatically if it’s not present on the host machine. But you can install it manually as well:

```sh
# check if its' installed and which version
gopls version
# golang.org/x/tools/gopls v0.16.2

# install or upgrade
go install golang.org/x/tools/gopls@latest
```

gopls also provides an experimental CLI interface:

```sh
gopls references ./main.go:35:8
```

---

## LSP Adoption

The trend is definitely towards LSP adoption. Many editors that didn't initially support it are adding LSP capabilities due to its benefits.

But it's important to note that not all editors use LSP. Classic editors like **Vi**, **Vim** (in its basic configuration), and **emacs** (without specific plugins) traditionally rely on simpler methods for language support, such as syntax highlighting based on regular expressions.

Also, when your editor uses a Language Server, it can have a noticeable impact on CPU and memory, especially for large projects or complex languages. The good news is that you can choose a more efficient language server or disable them in your editor.

Here is how I can inspect what language servers my [<FontIcon icon="fas fa-globe"/>Zed](https://zed.dev/) editor is currently running:

```sh
ps aux | grep language-server

node yaml-language-server --stdio
node tailwindcss-language-server --stdio
# ...
```

---

## Conclusion

Thanks to the Language Server Protocol, advanced coding capabilities are becoming universally accessible across various programming languages and coding environments.

It’s good to know how your code editors work, so it’s beneficial to have an understanding of this widely used technology called LSP. In short, LSP knowledge helps you understand and better utilize modern coding tools.

LSP is a win for both language providers and tooling vendors.

### Resources

<SiteInfo
  name="microsoft/language-server-protocol"
  desc="Defines a common protocol for language servers."
  url="https://github.com/microsoft/language-server-protocol/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/47b23c8b4f0203f2c47c1cfde73e75f40ff4a5579cbfbfe09a9344dab63b84cb/microsoft/language-server-protocol"/>

<SiteInfo
  name="golang/tools"
  desc="[mirror] Go Tools."
  url="https://github.com/golang/tools/tree/master/gopls"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/77eff25a6e98a9fd803bd89fbf88ba51bbbec3d022c4f011adead83364993d8d/golang/tools"/>

<SiteInfo
  name="packagemain.tech | Alex Pliutau | Substack"
  desc="Welcome to packagemain.tech, your one-stop shop for mastering Backend, Cloud, Kubernetes, Microservices, APIs, and more. We'll provide you with hands-on, practical and real-world tutorials that you can use to build your software development skills. Click to read packagemain.tech, a Substack publication with thousands of subscribers."
  url="https://packagemain.tech/"
  logo="https://substack-post-media.s3.amazonaws.com/public/images/2ea54e25-eaa6-4630-bfc0-10b8cfdce894/apple-touch-icon-1024x1024.png"
  preview="https://substack-post-media.s3.amazonaws.com/public/images/2ea54e25-eaa6-4630-bfc0-10b8cfdce894/favicon.ico"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding the Language Server Protocol - Easier Code Editing Across Languages and Tools",
  "desc": "In the past, many code editors were built just for one specific language. To provide rich and smart code editing, tight integration between the editor and the language tooling was a must. On the other hand, there were (and still are) more general-pur...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-the-language-server-protocol-easier-code-editing-across-languages.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
