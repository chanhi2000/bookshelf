---
lang: ko-KR
title: Strings are collections again
description: Article(s) > Strings are collections again
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - swift
  - swift-4.0
head:
  - - meta:
    - property: og:title
      content: Article(s) > Strings are collections again
    - property: og:description
      content: Strings are collections again
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/4.0/strings.html
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
  "title": "Strings are collections again | Changes in Swift 4.0",
  "desc": "Strings are collections again",
  "link": "https://hackingwithswift.com/swift/4.0/strings", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 4.0

This is a small change, but one guaranteed to make a lot of people happy: strings are collections again. This means you can reverse them, loop over them character-by-character, `map()` and `flatMap()` them, and more. For example:

```swift
let quote = "It is a truth universally acknowledged that new Swift versions bring new features."
let reversed = quote.reversed()

for letter in quote {
    print(letter)
}
```

This change was introduced as part of a broad set of amendments called the [String Manifesto (<VPIcon icon="iconfont icon-github"/>`apple/swift`)](https://github.com/apple/swift/blob/master/docs/StringManifesto.md).

::: details Other Changes in Swift 4.0

```component VPCard
{
  "title": "Encoding and decoding data using Codable | Changes in Swift 4.0",
  "desc": "Encoding and decoding data using Codable",
  "link": "/hackingwithswift.com/swift/4.0/codable.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Multi-line string literals | Changes in Swift 4.0",
  "desc": "Multi-line string literals",
  "link": "/hackingwithswift.com/swift/4.0/multiline-strings.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Improved keypaths for key-value coding | Changes in Swift 4.0",
  "desc": "Improved keypaths for key-value coding",
  "link": "/hackingwithswift.com/swift/4.0/keypaths.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Improved dictionary functionality | Changes in Swift 4.0",
  "desc": "Improved dictionary functionality",
  "link": "/hackingwithswift.com/swift/4.0/dictionaries.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
<!-- 
```component VPCard
{
  "title": "Strings are collections again | Changes in Swift 4.0",
  "desc": "Strings are collections again",
  "link": "/hackingwithswift.com/swift/4.0/strings.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
```component VPCard
{
  "title": "One-sided ranges | Changes in Swift 4.0",
  "desc": "One-sided ranges",
  "link": "/hackingwithswift.com/swift/4.0/one-sided-ranges.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[<VPIcon icon="fas fa-file-zipper"/>Download Swift 4.0 playground](https://hackingwithswift.com/files/playgrounds/swift/playground-3-1-to-4-0.playground.zip)

:::

