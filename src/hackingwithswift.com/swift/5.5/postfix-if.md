---
lang: en-US
title: if for postfix member expressions
description: Article(s) > if for postfix member expressions
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - swift
  - swift-5.5
head:
  - - meta:
    - property: og:title
      content: Article(s) > if for postfix member expressions
    - property: og:description
      content: if for postfix member expressions
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.5/postfix-if.html
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
  "title": "if for postfix member expressions | Changes in Swift 5.5",
  "desc": "if for postfix member expressions",
  "link": "https://hackingwithswift.com/swift/5.5/postfix-if", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 5.5

[SE-0308 (<FontIcon icon="iconfont icon-github"/>`apple/swift-evolution`)](https://github.com/apple/swift-evolution/blob/main/proposals/0308-postfix-if-config-expressions.md) allows Swift to use `#if` conditions with postfix member expressions. This sounds a bit obscure, but it solves a problem commonly seen with SwiftUI: you can now optionally add modifiers to a view.

For example, this change allows us to create a text view with two different font sizes depending on whether we’re using iOS or another platform:

```swift
import SwiftUI

Text("Welcome")
#if os(iOS)
    .font(.largeTitle)
#else
    .font(.headline)
#endif
```

You can nest these if you want, although it’s a bit hard on your eyes:

```swift
Text("Welcome")
#if os(iOS)
    .font(.largeTitle)
    #if DEBUG
        .foregroundColor(.red)
    #endif
#else
    .font(.headline)
#endif
```

You could use wildly different postfix expressions if you wanted:

```swift
let result = [1, 2, 3]
#if os(iOS)
    .count
#else
    .reduce(0, +)
#endif

print(result)
```

Technically you could make `result` end up as two completely different types if you wanted, but that seems like a bad idea. What you *definitely* can’t do is use other kinds of expressions such as using `+ [4]` instead of `.count` – if it doesn’t start with `.` then it’s not a postfix member expression.


::: details Other Changes in Swift 5.5

```component VPCard
{
  "title": "Async await | Changes in Swift 5.5",
  "desc": "Async await",
  "link": "/hackingwithswift.com/swift/5.5/async-await.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Async sequences | Changes in Swift 5.5",
  "desc": "Async sequences",
  "link": "/hackingwithswift.com/swift/5.5/async-sequences.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Effectful read-only properties | Changes in Swift 5.5",
  "desc": "Effectful read-only properties",
  "link": "/hackingwithswift.com/swift/5.5/effectful-read-only-properties.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Structured concurrency | Changes in Swift 5.5",
  "desc": "Structured concurrency",
  "link": "/hackingwithswift.com/swift/5.5/structured-concurrency.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "async let bindings | Changes in Swift 5.5",
  "desc": "async let bindings",
  "link": "/hackingwithswift.com/swift/5.5/async-let-bindings.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Continuations for interfacing async tasks with synchronous code | Changes in Swift 5.5",
  "desc": "Continuations for interfacing async tasks with synchronous code",
  "link": "/hackingwithswift.com/swift/5.5/continuations.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Actors | Changes in Swift 5.5",
  "desc": "Actors",
  "link": "/hackingwithswift.com/swift/5.5/actors.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Global actors | Changes in Swift 5.5",
  "desc": "Global actors",
  "link": "/hackingwithswift.com/swift/5.5/global-actors.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Sendable and @Sendable closures | Changes in Swift 5.5",
  "desc": "Sendable and @Sendable closures",
  "link": "/hackingwithswift.com/swift/5.5/sendable.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
<!-- 
```component VPCard
{
  "title": "if for postfix member expressions | Changes in Swift 5.5",
  "desc": "if for postfix member expressions",
  "link": "/hackingwithswift.com/swift/5.5/postfix-if.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
```component VPCard
{
  "title": "Interchangeable use of CGFloat and Double types | Changes in Swift 5.5",
  "desc": "Interchangeable use of CGFloat and Double types",
  "link": "/hackingwithswift.com/swift/5.5/interchangeable-cgfloat-double.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Codable synthesis for enums with associated values | Changes in Swift 5.5",
  "desc": "Codable synthesis for enums with associated values",
  "link": "/hackingwithswift.com/swift/5.5/codable-enums.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "lazy now works in local contexts | Changes in Swift 5.5",
  "desc": "lazy now works in local contexts",
  "link": "/hackingwithswift.com/swift/5.5/local-lazy.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Extending property wrappers to function and closure parameters | Changes in Swift 5.5",
  "desc": "Extending property wrappers to function and closure parameters",
  "link": "/hackingwithswift.com/swift/5.5/property-wrapper-function-parameters.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Extending static member lookup in generic contexts | Changes in Swift 5.5",
  "desc": "Extending static member lookup in generic contexts",
  "link": "/hackingwithswift.com/swift/5.5/static-member-generic.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[<FontIcon icon="fas fa-file-zipper"/>Download Swift 5.5 playground](https://hackingwithswift.com/files/playgrounds/swift/playground-5-4-to-5-5.playground.zip)

:::

