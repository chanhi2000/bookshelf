---
lang: ko-KR
title: ++ and -- are deprecated
description: Article(s) > ++ and -- are deprecated
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - swift
  - swift-2.2
head:
  - - meta:
    - property: og:title
      content: Article(s) > ++ and -- are deprecated
    - property: og:description
      content: ++ and -- are deprecated
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/2.2/increment-decrement.html
prev: /hackingwithswift.com/swift/3.0/verbs-and-nouns.md
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "HACKING WITH SWIFT",
  "desc": "What's new in Swift?",
  "link": "/hackingwithswift.com/swift/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "++ and -- are deprecated | Changes in Swift 2.22.2",
  "desc": "++ and -- are deprecated",
  "link": "https://hackingwithswift.com/swift/2.2/increment-decrement", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 2.2

Swift 2.2 formally deprecates the `++` and `--` operators, which means they still work but you'll get a warning when you use them. Deprecation is usually a first step towards removing something entirely, and in this case both of these operators will be removed in Swift 3.0.

In their place, you need to use `+= 1` and `-= 1` instead. These operators have been there all along, and are not going away.

You might wonder why two long-standing operators are being removed, particularly when they exist in C, C#, Java, and - critically to its "joke" - C++. There are several answers, not least:

1. Writing `++` rather than `+= 1` is hardly a dramatic time saving
2. Although it's easy once you know it, `++` doesn't have an obvious meaning to people learning Swift, whereas `+=` at least reads as "add and assign."
3. C-style loops - one of the most common situations where `++` and `--` were used - have also been deprecated, which brings me on to my next point…

::: details Other changes in Swift 2.2…
<!-- 
```component VPCard
{
  "title": "++ and -- are deprecated | Changes in Swift 2.2",
  "desc": "++ and -- are deprecated",
  "link": "/hackingwithswift.com/swift/2.2/increment-decrement.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
```component VPCard
{
  "title": "Traditional C-style for loops are deprecated | Changes in Swift 2.2",
  "desc": "Traditional C-style for loops are deprecated",
  "link": "/hackingwithswift.com/swift/2.2/c-loops.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Comparing tuples | Changes in Swift 2.2 ",
  "desc": "Comparing tuples",
  "link": "/hackingwithswift.com/swift/2.2/comparing-tuples.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Tuple splat syntax is deprecated | Changes in Swift 2.2",
  "desc": "Tuple splat syntax is deprecated",
  "link": "/hackingwithswift.com/swift/2.2/tuple-splat.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "More keywords can be used as argument labels | Changes in Swift 2.2",
  "desc": "More keywords can be used as argument labels",
  "link": "/hackingwithswift.com/swift/2.2/more-keywords.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Variable parameters have been deprecated | Changes in Swift 2.2",
  "desc": "Variable parameters have been deprecated",
  "link": "/hackingwithswift.com/swift/2.2/variable-parameters.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Renamed debug identifiers: line, function, file | Changes in Swift 2.2",
  "desc": "Renamed debug identifiers: line, function, file",
  "link": "/hackingwithswift.com/swift/2.2/renamed-identifiers.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Stringified selectors are deprecated | Changes in Swift 2.2",
  "desc": "Stringified selectors are deprecated",
  "link": "/hackingwithswift.com/swift/2.2/stringified-selectors.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Compile-time Swift version checking | Changes in Swift 2.2",
  "desc": "Compile-time Swift version checking",
  "link": "/hackingwithswift.com/swift/2.2/version-checking.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[<VPIcon icon="fas fa-file-zipper"/>Download Swift 2.2 playground](https://hackingwithswift.com/files/playgrounds/swift/playground-2-1-to-2-2.playground.zip)

:::

