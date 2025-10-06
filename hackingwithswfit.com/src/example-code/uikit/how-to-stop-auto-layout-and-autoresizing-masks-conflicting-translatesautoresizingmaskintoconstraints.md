---
lang: ko-KR
title: "How to stop Auto Layout and autoresizing masks conflicting: translatesAutoresizingMaskIntoConstraints"
description: "Article(s) > How to stop Auto Layout and autoresizing masks conflicting: translatesAutoresizingMaskIntoConstraints"
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
  - ios-7.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to stop Auto Layout and autoresizing masks conflicting: translatesAutoresizingMaskIntoConstraints"
    - property: og:description
      content: "How to stop Auto Layout and autoresizing masks conflicting: translatesAutoresizingMaskIntoConstraints"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-stop-auto-layout-and-autoresizing-masks-conflicting-translatesautoresizingmaskintoconstraints.html
date: 2019-03-28
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "UIKit - free Swift example code",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/example-code/uikit/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "How to stop Auto Layout and autoresizing masks conflicting: translatesAutoresizingMaskIntoConstraints | UIKit - free Swift example code",
  "desc": "How to stop Auto Layout and autoresizing masks conflicting: translatesAutoresizingMaskIntoConstraints",
  "link": "https://hackingwithswift.com/example-code/uikit/how-to-stop-auto-layout-and-autoresizing-masks-conflicting-translatesautoresizingmaskintoconstraints",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 7.0

<!-- TODO: 작성 -->

<!--
If you create any views in code - text views, buttons, labels, etc - you need to be careful how you add Auto Layout constraints to them. The reason for this is that iOS creates constraints for you that match the new view's size and position, and if you try to add your own constraints these will conflict and your app will break.

There are two solutions. First, don't add Auto Layout constraints to views created in code. Sound like a bad idea? That's because it is: like it or lump it, Auto Layout is something you want on your side. So, that leaves option two: tell iOS *not* to create Auto Layout constraints automatically, and that's done with this line of code:

```swift
yourView.translatesAutoresizingMaskIntoConstraints = false
```

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

