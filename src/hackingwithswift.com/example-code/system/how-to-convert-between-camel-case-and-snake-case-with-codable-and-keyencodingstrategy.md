---
lang: ko-KR
title: "How to convert between camel case and snake case with Codable and keyEncodingStrategy"
description: "Article(s) > How to convert between camel case and snake case with Codable and keyEncodingStrategy"
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
  - ios-8.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to convert between camel case and snake case with Codable and keyEncodingStrategy"
    - property: og:description
      content: "How to convert between camel case and snake case with Codable and keyEncodingStrategy"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-to-convert-between-camel-case-and-snake-case-with-codable-and-keyencodingstrategy.html
date: 2019-10-28
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System - free Swift example code",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/example-code/system/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "How to convert between camel case and snake case with Codable and keyEncodingStrategy | System - free Swift example code",
  "desc": "How to convert between camel case and snake case with Codable and keyEncodingStrategy",
  "link": "https://hackingwithswift.com/example-code/system/how-to-convert-between-camel-case-and-snake-case-with-codable-and-keyencodingstrategy",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 8.0

<!-- TODO: 작성 -->

<!-- 
Most Swift developers use camel case for naming properties, which means we start with a lowercase letter then capitalize the first letter of second and subsequent words: `numberOfUsers` or `powerLevel`. On the other hand, many web APIs prefer snake case, written as `number_of_users` and `power_level`, so if you need to convert camel case to snake case you need to use the `keyEncodingStrategy` of `JSONEncoder`, like this:

```swift
let encoder = JSONEncoder()
encoder.keyEncodingStrategy = .convertToSnakeCase

if let encoded = try? encoder.encode(yourData) {
    // continue with encoded data
}
```

With that set, Swift can convert property names as part of the encoding process, which makes `Codable` much easier to use. 

-->

::: details Similar solutions…

<!--
/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared">All SwiftUI property wrappers explained and compared 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode 
/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource">How to create a random terrain tile map using SKTileMapNode and GKPerlinNoiseSource 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts</a>
-->

:::

