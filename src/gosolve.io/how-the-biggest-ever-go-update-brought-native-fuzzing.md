---
lang: en-US
title: "How The Biggest Ever Go Update Brought Native Fuzzing"
description: "Article(s) > How The Biggest Ever Go Update Brought Native Fuzzing"
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
      content: "Article(s) > How The Biggest Ever Go Update Brought Native Fuzzing"
    - property: og:description
      content: "How The Biggest Ever Go Update Brought Native Fuzzing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/gosolve.io/how-the-biggest-ever-go-update-brought-native-fuzzing.html
prev: /programming/go/articles/README.md
date: 2023-03-03
isOriginal: false
author:
  - name: Yanick
    url : https://gosolve.io/author/jgadek/
cover: https://gosolve.io/wp-content/uploads/2023/05/23424-1024x1024.png
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
  name="How The Biggest Ever Go Update Brought Native Fuzzing"
  desc="Go 1.18 released in the first half of 2022 was probably the biggest update in Golang's history. Google themselves called it a milestone in the development of the Golang programming language that can be considered a culmination of the last 10 years of design and development efforts."
  url="https://gosolve.io/how-the-biggest-ever-go-update-brought-native-fuzzing"
  logo="https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png"
  preview="https://gosolve.io/wp-content/uploads/2023/05/23424-1024x1024.png"/>

You could say Go was born out of frustration with other languages that were available back then. Go creators felt that none of the other programming languages could concurrently offer the level of efficiency in compiler instrumentation, execution, and general ease of programming. With these criteria in mind, Golang developers started designing a language that would soon become one of the most developer-friendly languages.

Although Google created Go much later than some of the other popular languages, its developers could take into consideration modern trends such as cloud computing into consideration while designing the language itself.

Simplicity, great performance, user-friendly compiler, and easy deployment - code is compiled to a single binary, so there’s no hassle with multiple binary files. Add low resource usage and a standard library with a decent networking package and you have an excellent contender for the developer’s choice.

Golang can be treated as the language of modern applications. To not look too far, there’s Kubernetes, one of the major containerization platforms written completely in Go

---

## Go 1.18 - what came with this major programming language update?

As the Go dev blog states, Go 1.18 introduced significant “changes to the language, implementation of the core toolchain, runtime, and libraries”. And what changes do we talk about exactly?

For one, Generics were introduced. This was the support for generic programming in Go that some users really wanted. The generic code is written with abstract data types that were called type parameters.

Other introduced features and bug fixes included quite numerous changes to the go command, vet update for generic code, runtime (garbage collector changes), and fuzz testing.

---

## Fuzz testing in Go

Go 1.18 introduced Go fuzz tests (or fuzzing) which is a type of automated testing that manipulates inputs to a program in order to find bugs. In fact, Go was either the first major programming language to introduce fuzz testing as support for fuzz tests for other major languages such as Python or Java is practically non-existent. Though the “unsafe” no longer maintained languages support fuzzing (e.g. C++) mostly to expose bugs and find potential security exploits, it is usually done with third-party support integrations and not native support.

Go fuzz testing code coverage guidance to walk through the code in an intelligent way and report on A failing input to the user. Due to its generative nature, it can often uncover edge-case bugs that a human would normally miss. A fuzz test is often a good way to find potential security issues and program vulnerabilities.

Now there are certain requirements when it comes to Go test fuzz. For one a fuzz test must be a function that accepts only `*testing.F` and has no return value, a fuzz target must be a method call to `(*testing.F).Fuzz` which accepts `*testing.T` as the first parameter and is followed by the fuzzing argument. Moreover, the number of fuzz targets must be exactly one per fuzz test and the fuzz test arguments can only be of certain types.

Before starting a test fuzz please mind that it can consume a lot of memory to the point of impacting the performance of your machine while it’s conducting fuzz tests. The fuzzing engine also writes values that grow the fuzz cache directory while it runs. Moreover, there is no limit to the number of files in the fuzz cache so big storage might be needed.

---

## Running fuzz tests in Go

You can run fuzzing in two ways. First, as a unit test with the default `go test`. Second, with fuzzing with `go test -fuzz=TestName`. In general, fuzz tests are run similarly to the unit tests - every seed corpus file will be tested against the fuzz target. All failures will be then reported before exiting the given corpus entry.

Here’s an example output:

```sh
go test -fuzz Fuzzy
# 
# fuzz: elapsed: 0s, gathering baseline coverage: 0/168 completed
# fuzz: elapsed: 0s, gathering baseline coverage: 168/168 completed, now fuzzing with 4 workers
# fuzz: elapsed: 3s, execs: 293843 (97047/sec), new interesting: 8 (total: 196)
# fuzz: elapsed: 6s, execs: 549392 (91565/sec), new interesting: 11 (total: 203)
# fuzz: elapsed: 9s, execs: 806943 (89660/sec), new interesting: 21 (total: 217)
# PASS
# ok      foo 9.371s
```

In the first lines, you can find an indication of the baseline coverage being collected before running the fuzz test. To do this, the fuzzing engine executes both the generated corpus and the seed corpus and makes sure there are no errors. It also needs to understand the code coverage that the existing corpus provides.

The next few lines give you intel on active fuzzing, such as the time elapsed since the fuzzing began, the total number of inputs run against the target and the total number of “interesting” inputs. These are the inputs added to the generated corpus during this particular fuzzing and have to expand the code coverage beyond the existing corpus files.

---

## Fuzz test failing input

As with any other testing effort, you may experience a failure for a number of reasons, such as panic in the code or the test, the target called `t.Fail` directly or indirectly, a stack overflow or otherwise a non-recoverable error occurred. A failure might be also caused by the fuzz target taking too long to complete.

---

## Corpus file format for fuzz testing

There is a specific format for corpus files encoding in which the first line informs the fuzzing engine about the encoding version of the test file.

```sh
go test fuzz v1
# 
# []byte("\\xbdHello\\xbd")
# int64(33823)
```

---

## Summary

Fuzzing is a great way to test code for edge cases that developers might struggle to think of when building test cases. However, it isn’t about throwing in invalid data but rather inputs that are valid enough to run the tests. Any dedicated go team serious about software development should try to write tests in such a way that it can include fuzzing among other existing unit tests and regression tests.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How The Biggest Ever Go Update Brought Native Fuzzing",
  "desc": "Go 1.18 released in the first half of 2022 was probably the biggest update in Golang's history. Google themselves called it a milestone in the development of the Golang programming language that can be considered a culmination of the last 10 years of design and development efforts.",
  "link": "https://chanhi2000.github.io/bookshelf/gosolve.io/how-the-biggest-ever-go-update-brought-native-fuzzing.html",
  "logo": "https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png",
  "background": "rgba(56,119,242,0.2)"
}
```
