---
lang: ko-KR
title: self is no longer required in many places
description: Article(s) > self is no longer required in many places
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
      content: Article(s) > self is no longer required in many places
    - property: og:description
      content: self is no longer required in many places
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.3/removing-self.html
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
  "title": "self is no longer required in many places | Changes in Swift 5.3",
  "desc": "self is no longer required in many places",
  "link": "https://hackingwithswift.com/swift/5.3/removing-self", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 5.3

[SE-0269 (<VPIcon icon="iconfont icon-github"/>`apple/swift-evolution`)](https://github.com/apple/swift-evolution/blob/master/proposals/0269-implicit-self-explicit-capture.md) allows us to stop using `self` in many places where it isn’t necessary. Prior to this change, we’d need to write `self.` in any closure that referenced `self` so we were making our capture semantics explicit, however often it was the case that our closure could not result in a reference cycle, meaning that the `self` was just clutter.

For example, before this change we would write code like this:

```swift
struct OldContentView: View {
    var body: some View {
        List(1..<5) { number in
            self.cell(for: number)
        }
    }

    func cell(for number: Int) -> some View {
        Text("Cell \(number)")
    }
}
```

That call to `self.cell(for:)` cannot cause a reference cycle, because it’s being used inside a struct. Thanks to SE-0269, we can now write the same code like this:

```swift
struct NewContentView: View {
    var body: some View {
        List(1..<5) { number in
            cell(for: number)
        }
    }

    func cell(for number: Int) -> some View {
        Text("Cell \(number)")
    }
}
```

This is likely to be extremely popular in any framework that makes heavy use of closures, including SwiftUI and Combine.

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
<!-- 
```component VPCard
{
  "title": "self is no longer required in many places | Changes in Swift 5.3",
  "desc": "self is no longer required in many places",
  "link": "/hackingwithswift.com/swift/5.3/removing-self.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
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

```component VPCard
{
  "title": "Refined didSet semantics | Changes in Swift 5.3",
  "desc": "Refined didSet semantics",
  "link": "/hackingwithswift.com/swift/5.3/refined-didset.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

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

