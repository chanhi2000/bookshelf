---
lang: en-US
title: "Go Vet Command and Its Usage"
description: "Article(s) > Go Vet Command and Its Usage"
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
      content: "Article(s) > Go Vet Command and Its Usage"
    - property: og:description
      content: "Go Vet Command and Its Usage"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/gosolve.io/go-vet-command-and-its-usage.html
prev: /programming/go/articles/README.md
date: 2023-03-12
isOriginal: false
author:
  - name: Yanick
    url : https://gosolve.io/author/jgadek/
cover: https://gosolve.io/wp-content/uploads/2023/05/2345-1024x1024.png
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
  name="Go Vet Command and Its Usage"
  desc="The Golang vet command is a built-in tool that is included in the Go programming language. It is designed to help developers identify and diagnose potential problems in their Go code. This can be useful for catching errors before they are compiled, ensuring that the code is as clean and efficient as possible."
  url="https://gosolve.io/go-vet-command-and-its-usage"
  logo="https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png"
  preview="https://gosolve.io/wp-content/uploads/2023/05/2345-1024x1024.png"/>

Go vet command is a handy tool that can help you write better and cleaner code. It helps you find errors in your application and reports suspicious constructs such as abnormal or useless code, as well as detect common mistakes using different packages.

Vet command (or should we say vet commands?) is a collection of different analysis tool commands and sub-analyzers. It is worth mentioning that vet uses heuristics which can’t guarantee that 100% of the reports will be genuine issues. However, it can detect errors that compliers might omit.

---

## Using the vet command

You can invoke vet with the go command. The following command will vet the current directory package:

```sh
go vet
```

If you wish to vet a package in another directory you need to provide a path:

```sh
go vet my_machine/project/...
```

If you want to vet specific packages you can use:

```sh
go help packages
```

---

## Listing all available checks with tool vet help

You can list all available checks by running the:

```sh
go tool vet help
```

Now, let’s briefly go over what you can exactly get from the `go tool vet` help commands.

::: tabs

@tab:active <code>asmdecl</code>

asmdecl reports mismatches between the Go declarations and assembly files.

@tab <code>assign</code>

This is a check for useless assignments.

@tab <code>atomic</code>

This is for common mistakes using the `sync/atomic` package and will check any irregularities in the usage of the atomic function.

@tab <code>bools</code>

Detects common mistakes that involve boolean operators.

@tab <code>buildtag</code>

Checks the form and location of the `+build` tags. The `+build` flags supported by `go vet` are related to the resolution and execution of the control package.

@tab <code>cgocall</code>

Checks for violations of the cgo pointer passing rules.

@tab <code>composites</code>

Looks for any composite literals using unkeyed fields.

@tab <code>copylocks</code>

Detects copied locks passed by value as an error. The locks should never be copied, as the copy of the lock will copy the internal state of the “original” making it the same as the “original”.

@tab <code>httpresponse</code>

Checks for any mistakes in HTTP responses usage

@tab <code>loopclosure</code>

Checks for any references to loop variables from within nested functions.

@tab <code>lostcancel</code>

Detects cancel func that is returned by `context.WithCancel`. Creating a cancellable context will return a new context with a function that enables you to cancel that particular context. You can use that function to cancel each and every operation linked to that context, however, it has to be called in order. Otherwise, it will leak context.

@tab <code>nilfunc</code>

Searches for useless comparisons between `nil` and functions.

@tab <code>printf</code>

Checks for consistency in `Printf` format. Constructs such as `Printf` calls with arguments that don’t align with the format string will be flagged.

@tab <code>shift</code>

This go vet analysis tool will try to find shifts that either exceed or equal the integer width.

@tab <code>stdmethods</code>

Checks for methods that you have implemented from the standard library interfaces and their compatibility.

@tab <code>structtag</code>

Detects fields that don’t conform to the convention defined in the reflect package.

@tab <code>tests</code>

This analyzer catches likely mistakes made while using either a test or an example.

@tab <code>unmarshal</code>

It returns all instances of passing non-interface or non-pointer values to unmarshal.

@tab <code>unreachable</code>

Simply checks for any code that is unreachable.

@tab <code>unsafeptr</code>

Detects any invalid conversion of uintptr to unsafe.Pointer.

@tab <code>unusedresults</code>

Detects unused results of calls to functions.

:::

---

## Conclusions on the go vet analysis tool

Go vet is a very useful collection of tools that can help you find different issues with your source code. By design, all checks are performed, unless any flags are set to true. In that case, only those tests will be run. Analogically, setting a flag to false will disable that particular test.

Please mind that not all returned errors are genuine problems. Moreover, if you wish to look for other subtle issues in your go programs, one that no specific checker detects, there is an option to add additional checks and custom analyzers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Go Vet Command and Its Usage",
  "desc": "The Golang vet command is a built-in tool that is included in the Go programming language. It is designed to help developers identify and diagnose potential problems in their Go code. This can be useful for catching errors before they are compiled, ensuring that the code is as clean and efficient as possible.",
  "link": "https://chanhi2000.github.io/bookshelf/gosolve.io/go-vet-command-and-its-usage.html",
  "logo": "https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png",
  "background": "rgba(56,119,242,0.2)"
}
```
