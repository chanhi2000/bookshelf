---
lang: ko-KR
title: Multiple if let bindings
description: Article(s) > Multiple if let bindings
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - swift
  - swift-1.2
head:
  - - meta:
    - property: og:title
      content: Article(s) > Multiple if let bindings
    - property: og:description
      content: Multiple if let bindings
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/1.2/if-let.html
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
  "title": "Multiple if let bindings | Changes in Swift 1.2",
  "desc": "Multiple if let bindings",
  "link": "https://hackingwithswift.com/swift/1.2/if-let", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 1.2

You may now place multiple `if let` bindings on a single line separated by a comma, rather than embed them in increasingly indented pyramids.

For example, previously you would write code like this:

```swift
if let user = loadUsername() {
    if let password = decryptPassword() {
        authenticate(user, password)
    }
}
```

As of Swift 1.2 you can write this:

```swift
if let user = loadUsername(), let password = decryptPassword() {
    authenticate(user, password)
}
```

::: details Other changes in Swift 1.2…

```component VPCard
{
  "title": "The zip() function joins two sequences | Changes in Swift 1.2",
  "desc": "The zip() function joins two sequences",
  "link": "/hackingwithswift.com/swift/1.2/zip.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "The flatMap() method transforms optionals and arrays | Changes in Swift 1.2",
  "desc": "The flatMap() method transforms optionals and arrays",
  "link": "/hackingwithswift.com/swift/1.2/flatmap.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Closures can now be marked @noescape | Changes in Swift 1.2",
  "desc": "Closures can now be marked @noescape",
  "link": "/hackingwithswift.com/swift/1.2/noescape.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Classes can now have static methods and properties | Changes in Swift 1.2",
  "desc": "Classes can now have static methods and properties",
  "link": "/hackingwithswift.com/swift/1.2/static.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Constants no longer require immediate initialization | Changes in Swift 1.2",
  "desc": "Constants no longer require immediate initialization",
  "link": "/hackingwithswift.com/swift/1.2/constants.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "A new Set data structure | Changes in Swift 1.2",
  "desc": "A new Set data structure",
  "link": "/hackingwithswift.com/swift/1.2/set.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Implicit bridging has been reduced | Changes in Swift 1.2",
  "desc": "Implicit bridging has been reduced",
  "link": "/hackingwithswift.com/swift/1.2/bridging.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
<!-- 
```component VPCard
{
  "title": "Multiple if let bindings | Changes in Swift 1.2",
  "desc": "Multiple if let bindings",
  "link": "/hackingwithswift.com/swift/1.2/if-let.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
```component VPCard
{
  "title": "Typecasting now includes as! | Changes in Swift 1.2",
  "desc": "Typecasting now includes as!",
  "link": "/hackingwithswift.com/swift/1.2/typecasting.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

