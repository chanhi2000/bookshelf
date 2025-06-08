---
lang: en-US
title: if let shorthand for unwrapping optionals
description: Article(s) > if let shorthand for unwrapping optionals
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - swift
  - swift-5.7
head:
  - - meta:
    - property: og:title
      content: Article(s) > if let shorthand for unwrapping optionals
    - property: og:description
      content: if let shorthand for unwrapping optionals
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.7/if-let-shorthand.html
prev: /hackingwithswift.com/swift/5.8/collection-downcasts.md
isOriginal: false
author:
  - name: Paul Hudson
    url: https://hackingwithswift.com/about
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
  "title": "if let shorthand for unwrapping optionals | Changes in Swift 5.7",
  "desc": "if let shorthand for unwrapping optionals",
  "link": "https://hackingwithswift.com/swift/5.7/if-let-shorthand", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 5.7

[SE-0345 <FontIcon icon="iconfont icon-github"/>`apple/swift-evolution`](https://github.com/apple/swift-evolution/blob/main/proposals/0345-if-let-shorthand.md) introduces new shorthand syntax for unwrapping optionals into shadowed variables of the same name using `if let` and `guard let`. This means we can now write code like this:

```swift
var name: String? = "Linda"

if let name {
    print("Hello, \(name)!")
}
```

Whereas previously we would have written code more like this:

```swift
if let name = name {
    print("Hello, \(name)!")
}

if let unwrappedName = name {
    print("Hello, \(unwrappedName)!")
} 
```

This change *doesn’t* extend to properties inside objects, which means code like this will *not* work:

```swift
struct User {
    var name: String
}

let user: User? = User(name: "Linda")

if let user.name {
    print("Welcome, \(user.name)!")
}
```

::: details Other Changes in Swift 5.7
<!-- 
```component VPCard
{
  "title": "if let shorthand for unwrapping optionals | Changes in Swift 5.7",
  "desc": "if let shorthand for unwrapping optionals",
  "link": "/hackingwithswift.com/swift/5.7/if-let-shorthand.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
```component VPCard
{
  "title": "Multi-statement closure type inference | Changes in Swift 5.7",
  "desc": "Multi-statement closure type inference",
  "link": "/hackingwithswift.com/swift/5.7/multi-statement-inference.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Clock, Instant, and Duration | Changes in Swift 5.7",
  "desc": "Clock, Instant, and Duration",
  "link": "/hackingwithswift.com/swift/5.7/clock.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Regular expressions | Changes in Swift 5.7",
  "desc": "Regular expressions",
  "link": "/hackingwithswift.com/swift/5.7/regexes.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Type inference from default expressions | Changes in Swift 5.7",
  "desc": "Type inference from default expressions",
  "link": "/hackingwithswift.com/swift/5.7/default-type-inference.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Concurrency in top-level code | Changes in Swift 5.7",
  "desc": "Concurrency in top-level code",
  "link": "/hackingwithswift.com/swift/5.7/top-level-concurrency.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Opaque parameter declarations | Changes in Swift 5.7",
  "desc": "Opaque parameter declarations",
  "link": "/hackingwithswift.com/swift/5.7/opaque-parameter-declarations.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Structural opaque result types | Changes in Swift 5.7",
  "desc": "Structural opaque result types",
  "link": "/hackingwithswift.com/swift/5.7/structural-opaque-result-types.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Unlock existentials for all protocols | Changes in Swift 5.7",
  "desc": "Unlock existentials for all protocols",
  "link": "/hackingwithswift.com/swift/5.7/unlock-existentials.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Lightweight same-type requirements for primary associated types | Changes in Swift 5.7",
  "desc": "Lightweight same-type requirements for primary associated types",
  "link": "/hackingwithswift.com/swift/5.7/primary-associated-types.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Constrained existential types | Changes in Swift 5.7",
  "desc": "Constrained existential types",
  "link": "/hackingwithswift.com/swift/5.7/constrained-existentials.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Distributed actor isolation | Changes in Swift 5.7",
  "desc": "Distributed actor isolation",
  "link": "/hackingwithswift.com/swift/5.7/distributed-actors.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "buildPartialBlock for result builders | Changes in Swift 5.7",
  "desc": "buildPartialBlock for result builders",
  "link": "/hackingwithswift.com/swift/5.7/buildpartialblock.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Implicitly opened existentials | Changes in Swift 5.7",
  "desc": "Implicitly opened existentials",
  "link": "/hackingwithswift.com/swift/5.7/implicitly-opened-existentials.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Unavailable from async attribute | Changes in Swift 5.7",
  "desc": "Unavailable from async attribute",
  "link": "/hackingwithswift.com/swift/5.7/noasync.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[<FontIcon icon="fas fa-file-zipper"/>Download Swift 5.7 playground](https://hackingwithswift.com/files/playgrounds/swift/playground-5-6-to-5-7.playground.zip)

:::

