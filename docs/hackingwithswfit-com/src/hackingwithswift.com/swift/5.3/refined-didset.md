---
lang: ko-KR
title: Refined didSet semantics
description: Article(s) > Refined didSet semantics
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - swift
  - swift-5.3
head:
  - - meta:
    - property: og:title
      content: Article(s) > Refined didSet semantics
    - property: og:description
      content: Refined didSet semantics
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.3/refined-didset.html
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
  "title": "Refined didSet semantics | Changes in Swift 5.3",
  "desc": "Refined didSet semantics",
  "link": "https://hackingwithswift.com/swift/5.3/refined-didset", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 5.3

[SE-0268 (<VPIcon icon="iconfont icon-github"/>`apple/swift-evolution`)](https://github.com/apple/swift-evolution/blob/master/proposals/0268-didset-semantics.md) adjusts the way the `didSet` property observers work so that they are more efficient. This doesn’t require a code change unless you were somehow relying on the previous buggy behavior; you’ll just get a small performance improvement for free.

Internally, this change makes Swift *not* retrieve the previous value when setting a new value in any instance where you weren’t using the old value, and if you don’t reference `oldValue` *and* don’t have a `willSet` Swift will change your data in-place.

If you do happen to be relying on the old behavior, you can work around it simply by referencing `oldValue` to trigger your custom getter, like this:

```swift
didSet {
    _ = oldValue
}
```

::: details Other Changes in Swift 5.3

```component VPCard
{
  "title": "Multi-pattern catch clauses | Changes in Swift 5.3",
  "desc": "Multi-pattern catch clauses",
  "link": "/hackingwithswift.com/swift/5.3/multipattern-catch.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Multiple trailing closures | Changes in Swift 5.3",
  "desc": "Multiple trailing closures",
  "link": "/hackingwithswift.com/swift/5.3/multiple-trailing-closures.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Synthesized Comparable conformance for enums | Changes in Swift 5.3",
  "desc": "Synthesized Comparable conformance for enums",
  "link": "/hackingwithswift.com/swift/5.3/synthesized-comparable-enum.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "self is no longer required in many places | Changes in Swift 5.3",
  "desc": "self is no longer required in many places",
  "link": "/hackingwithswift.com/swift/5.3/removing-self.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Type-based program entry points | Changes in Swift 5.3",
  "desc": "Type-based program entry points",
  "link": "/hackingwithswift.com/swift/5.3/atmain.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "where clauses on contextually generic declarations | Changes in Swift 5.3",
  "desc": "where clauses on contextually generic declarations",
  "link": "/hackingwithswift.com/swift/5.3/where-clauses.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Enum cases as protocol witnesses | Changes in Swift 5.3",
  "desc": "Enum cases as protocol witnesses",
  "link": "/hackingwithswift.com/swift/5.3/enum-protocol-witnesses.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
<!-- 
```component VPCard
{
  "title": "Refined didSet semantics | Changes in Swift 5.3",
  "desc": "Refined didSet semantics",
  "link": "/hackingwithswift.com/swift/5.3/refined-didset.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
```component VPCard
{
  "title": "A new Float16 type | Changes in Swift 5.3",
  "desc": "A new Float16 type",
  "link": "/hackingwithswift.com/swift/5.3/float16.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Swift Package Manager gains binary dependencies, resources, and more | Changes in Swift 5.3",
  "desc": "Swift Package Manager gains binary dependencies, resources, and more",
  "link": "/hackingwithswift.com/swift/5.3/spm-improvements.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[<VPIcon icon="fas fa-file-zipper"/>Download Swift 5.3 playground](https://hackingwithswift.com/files/playgrounds/swift/playground-5-2-to-5-3.playground.zip)

:::

