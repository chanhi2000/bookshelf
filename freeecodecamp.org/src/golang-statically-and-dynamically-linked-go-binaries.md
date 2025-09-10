---
lang: en-US
title: "How Statically and Dynamically Linked Go Binaries Work"
description: "Article(s) > How Statically and Dynamically Linked Go Binaries Work"
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
      content: "Article(s) > How Statically and Dynamically Linked Go Binaries Work"
    - property: og:description
      content: "How Statically and Dynamically Linked Go Binaries Work"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/golang-statically-and-dynamically-linked-go-binaries.html
prev: /programming/go/articles/README.md
date: 2024-09-10
isOriginal: false
author:
  - name: Alex Pliutau
    url : https://freecodecamp.org/news/author/pltvs/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725977444176/20f3bebf-e250-45c3-926e-146d50e4db93.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Statically and Dynamically Linked Go Binaries Work"
  desc="One of the biggest strengths of Go is its compiler. It abstracts many things for you and lets you compile your program easily for almost any platform and architecture. And though it seems easy, there are some nuances to it and multiple ways of compil..."
  url="https://freecodecamp.org/news/golang-statically-and-dynamically-linked-go-binaries"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1725977444176/20f3bebf-e250-45c3-926e-146d50e4db93.png"/>

One of the biggest strengths of Go is its compiler. It abstracts many things for you and lets you compile your program easily for almost any [<VPIcon icon="fa-brands fa-golang"/>platform and architecture](https://pkg.go.dev/cmd/dist).

And though it seems easy, there are some nuances to it and multiple ways of compiling the same program which results in different executables.

In this article, we’ll explore statically and dynamically linked executables, internal and external linkers, and examine binaries using tools like **file, ld**, and **ldd**.

---

## What is Static and Dynamic linking?

**Static linking** is the practice of copying all the libraries your program needs directly into the final executable file image.

And Go *loves and wants* that whenever it’s possible. This is because it's more portable, as it doesn’t require the presence of the library on the host system where it runs. So your binary can run on any system no matter which distro/version, and it won't depend on any system libraries.

**Dynamic linking**, on the other hand, is when external or shared libraries are copied into the executable file *by name during run time*.

And it has its own advantages, too. For example the program can re-use popular **libc** libraries that are available on the host system and not re-implement them. You can also benefit from host updates without re-linking your program. It can also reduce the executable file size in many cases.

---

## Statically Linked Program

Let’s review a program that will *always* get statically linked. This program doesn’t call C code using [<VPIcon icon="fa-brands fa-golang"/>`cgo`](https://pkg.go.dev/cmd/cgo), so everything can be packaged in a static binary. Our program only prints a simple message to stdout, which Go can do internally without needing to use something from **libc**.

```go
package main

import "fmt"

func main() {
    fmt.Println("hi, user")
}
```

---

## What is a Binary Anyway?

We can use a [`file`](https://man7.org/linux/man-pages/man1/file.1.html) program to examine the file type first.

```sh
go build main1.go

file main1 | tr , '\n'
# 
# main1: ELF 64-bit LSB executable
#  ARM aarch64
#  version 1 (SYSV)
#  statically linked
#  Go BuildID=...
#  with debug_info
#  not stripped
```

It tells us that it’s an [`ELF`](https://wiki.osdev.org/ELF) (Executable and Linkable Format) executable file. It also tells us that it’s “statically linked“.

We won’t dive into what ELF is, but there are other executable file formats. ELF is the default one on Linux, Mach-O is the default one for macOS, PE/PE32+ for Windows, and so on.

Note: in this article we’ll be working with Linux (Ubuntu) and its tooling, but the same is possible on other platforms.

And there is another Linux program called [`ldd`](https://man7.org/linux/man-pages/man1/ldd.1.html) that can tell us if the binary is statically or dynamically linked.

```sh
ldd main1
# 
# not a dynamic executable
```

---

## Dynamically Linked Program

As mentioned above, Go has a mechanism called `cgo` to call C code from Go. Even Go’s stdlib uses it in multiple places - for example in the [<VPIcon icon="fa-brands fa-golang"/>`net`](https://pkg.go.dev/net) package, where it uses the standard C library to work with DNS.

Importing such packages or using cgo in your code by default produces a dynamically-linked binary, linked to those **libc** libraries.

```go
package main

import (
    "fmt"
    "log"
    "net"
)

func main() {
    ipv4Addr, ipv4Net, err := net.ParseCIDR("192.0.2.1/24")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(ipv4Addr)
    fmt.Println(ipv4Net)
}
```

We can use our `file` and `ldd` programs again to examine the second binary.

```sh
go build main2.go

file main2 | tr , '\n'
# 
# main2: ELF 64-bit LSB executable
#  ARM aarch64
#  version 1 (SYSV)
#  dynamically linked
#  interpreter /lib/ld-linux-aarch64.so.1
#  Go BuildID=...
#  with debug_info
#  not stripped
# 
ldd main2
#
#    linux-vdso.so.1 (0x0000ffff87c81000)
#    libc.so.6 => /lib/aarch64-linux-gnu/libc.so.6 (0x0000ffff87a80000)
#    /lib/ld-linux-aarch64.so.1 (0x0000ffff87c44000)
```

The `file` program now shows us that it is a **dynamically liked** binary and `ldd` shows us the dynamic dependencies of our binary. In this case it relies on <VPIcon icon="iconfont icon-c"/>`libc.so.6` and **ld-linux** which is a dynamic linker for Linux systems.

---

## Can We Make it Statically Linked?

There are multiple reasons why you might want your binaries to be static, but the main one is to make deployment and distribution easier. But! It’s not always necessary, and by linking **libc** you benefit from host updates. Also, in case of our **net** package, you use those complex DNS lookup functions included in **libc**.

What’s interesting is that Go’s net package also has a pure-Go version, which makes it possible to disable cgo during compile time. You can do it by specifying build tags or by fully disabling cgo using **CGO_ENABLED=0**.

```sh
go build -tags netgo main2.go
ldd main2
# 
# not a dynamic executable

CGO_ENABLED=0 go build main2.go
ldd main2
# 
# not a dynamic executable
```

The above proves that we end up with a static binary in both cases.

---

## Internal vs External Linker

Linker is a program that reads the Go archive or object for a package main, along with its dependencies, and combines them into an executable binary.

By default, Go’s toolchain uses its internal linker ([<VPIcon icon="fa-brands fa-golang"/>go tool link](https://pkg.go.dev/cmd/link)), but you can specify which linker to use during the compilation time. This can give you a combination of benefits of a static binary as well as full-fledged libc capabilities.

On Linux, the default linker is gcc’s [`ld](`https://man7.org/linux/man-pages/man1/ld.1.html). And we can tell it to produce a static binary.

```sh
go build -ldflags "-linkmode 'external' -extldflags '-static'" main2.go
# 
# /usr/bin/ld: /tmp/go-link-629224677/000004.o: in function `_cgo_97ab22c4dc7b_C2func_getaddrinfo':
# /tmp/go-build/cgo_unix_cgo.cgo2.c:60:(.text+0x30):
# warning: Using 'getaddrinfo' in statically linked applications requires at runtime the shared libraries from the glibc version used for linking
ldd main2
# 
# not a dynamic executable
```

It works, but we have a warning here. In our case **glibc** uses **libnss** to support a number of different providers for address resolution services and you cannot statically link libnss.

Other cgo packages may produce similar warnings and you’ll have to check the documentation to see if they’re critical or not.

---

## Cross-Compilation

As mentioned in the introduction, cross-compilation is a very nice feature of Go. It lets you compile your program for almost any platform/architecture. But it can be very tricky if your program uses `cgo`, because it’s generally tricky to cross-compile C code.

```sh
CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 go build main2.go
CGO_ENABLED=1 GOOS=darwin GOARCH=arm64 go build main2.go
#
# cgo: C compiler "clang" not found: exec: "clang":
# executable file not found in $PATH
```

You can overcome that by installing the toolchain for the target OS and/or architecture.

If you can, it’s always better to just not use `cgo` for cross-compilation. You’ll get stable binaries which are statically linked.

---

## Bonus Point: Reduce Binary Size

As you may notice, the output of the `file` command above had the following: “with debug_info not stripped“. This means that our binary has debugging information in it. But we usually don’t need it, and removing it may reduce the binary size.

```sh
go build main1.go
du -sh main1
#
# 1.9M    main1

go build -ldflags="-w -s" main1.go
du -sh main1
#
# 1.3M    main1

file main1 | tr , '\n'
# 
# main1: ELF 64-bit LSB executable
#  ARM aarch64
#  version 1 (SYSV)
#  statically linked
#  Go BuildID=...
#  stripped
```

---

## Beware: LD_PRELOAD Trick

The Linux system program <VPIcon icon="iconfont icon-c"/>`ld-linux.so` (dynamic linker/loader) uses `LD_PRELOAD` to load specified shared libraries. In particular, before any other library, the dynamic loader will first load shared libraries that are in LD_PRELOAD.

The LD_PRELOAD trick is a powerful technique used in dynamically linked binaries to override or intercept function calls to shared libraries.

By setting the LD_PRELOAD environment variable to point to a custom shared object file, users can inject their own code into a program's execution, effectively replacing or augmenting existing library functions.

This method allows for various applications, such as debugging, testing, and even modifying program behaviour without altering the original source code.

```sh
LD_PRELOAD=/path/to/my/malloc.so /bin/ls
```

It also shows that **statically linked binaries** are more secure, as they don’t have this issue since they don’t seek any external libraries. Also, there is a “**secure-execution mode”** - a security feature implemented by the dynamic linker on Linux systems to restrict certain behaviours when running programs that require elevated privileges.

---

## Conclusion

Computers are not magic, you just have to understand them.

And understanding Go compilation and execution processes is crucial for developing robust cross-platform applications.

Hopefully, after reading this article, you now have a better understanding of how Go compilation works.

### Further Reads

- [Explore more articles from packagemain.tech](https://packagemain.tech/)
- [Source Code](https://github.com/plutov/packagemain/tree/master/static-dynamic-linking)
- [src/cmd/cgo/doc.go](https://cs.opensource.google/go/go/+/refs/tags/go1.19.3:src/cmd/cgo/doc.go)
- [cmd/link](https://pkg.go.dev/cmd/link)
- [Debugging a weird 'file not found' error](https://jvns.ca/blog/2021/11/17/debugging-a-weird--file-not-found--error/)
- [How the heck do we get to main()](http://dbp-consulting.com/tutorials/debugging/linuxProgramStartup.html)
- [A General Overview of What Happens Before main()](https://embeddedartistry.com/blog/2019/04/08/a-general-overview-of-what-happens-before-main/)
- [Rust Before Main](https://youtu.be/q8irLfXwaFM)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Statically and Dynamically Linked Go Binaries Work",
  "desc": "One of the biggest strengths of Go is its compiler. It abstracts many things for you and lets you compile your program easily for almost any platform and architecture. And though it seems easy, there are some nuances to it and multiple ways of compil...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/golang-statically-and-dynamically-linked-go-binaries.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
