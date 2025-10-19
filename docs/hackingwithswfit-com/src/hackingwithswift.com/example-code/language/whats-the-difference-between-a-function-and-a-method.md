---
lang: ko-KR
title: "What’s the difference between a function and a method?"
description: "Article(s) > What’s the difference between a function and a method?"
category:
  - Swift
  - iOS
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - swift-5.10
  - ios
  - ios-9.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What’s the difference between a function and a method?"
    - property: og:description
      content: "What’s the difference between a function and a method?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/whats-the-difference-between-a-function-and-a-method.html
date: 2019-03-28
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Language - free Swift example code",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/example-code/language/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "What’s the difference between a function and a method? | Language - free Swift example code",
  "desc": "What’s the difference between a function and a method?",
  "link": "https://hackingwithswift.com/example-code/language/whats-the-difference-between-a-function-and-a-method",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 9.0

<!-- TODO: 작성 -->

<!-- 
Some folks use “function” and “method” interchangeably, but there’s a small difference: both of them are reusable chunks of code, but methods belong to classes, structs, and enums, whereas functions do not.

So:

```swift
func thisIsAFunction() {
}

struct Person {
    func thisIsAMethod() {
    }
}
```

Because methods always belong to a data type, they have a concept of `self` that functions do not. This is a special value passed in by Swift, and it refers to whatever instance the method was called on.

Swift uses the same keyword, `func`, for both functions and methods.

-->

::: details Similar solutions…

<!--
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
-->

:::

