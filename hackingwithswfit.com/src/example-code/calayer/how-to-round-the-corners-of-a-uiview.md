---
lang: ko-KR
title: "How to round the corners of a UIView"
description: "Article(s) > How to round the corners of a UIView"
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
  - ios-3.2
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to round the corners of a UIView"
    - property: og:description
      content: "How to round the corners of a UIView"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-round-the-corners-of-a-uiview.html
date: 2019-06-01
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CALayer - free Swift example code",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/example-code/calayer/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "How to round the corners of a UIView | CALayer - free Swift example code",
  "desc": "How to round the corners of a UIView",
  "link": "https://hackingwithswift.com/example-code/calayer/how-to-round-the-corners-of-a-uiview",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 3.2

<VidStack src="youtube/YwNFw_doBnw" />

<!-- TODO: 작성 -->

<!-- 
All `UIView` subclasses have the ability to round their corners thanks to their underlying `CALayer` - that's the bit that handles the actual drawing of your views. To round the corners of a view, use this code:

```swift
yourView.layer.cornerRadius = 10
```

The number you specify is how far the rounding should go, measured in points. So if you have a view that's 100x100 points and give it a `cornerRadius` property of 50, it will look like a circle.

Note that some types of view don't have `clipsToBounds` enabled by default, which means their corners will not round until you enable this property.

-->

::: details Similar solutions…

<!--
/quick-start/swiftui/how-to-round-the-corners-of-a-view">How to round the corners of a view 
/example-code/calayer/how-to-round-only-specific-corners-using-maskedcorners">How to round only specific corners using maskedCorners 
/example-code/language/fixing-ambiguous-reference-to-member-when-using-ceil-or-round">Fixing "Ambiguous reference to member when using ceil or round" 
/example-code/uikit/how-to-mask-one-uiview-using-another-uiview">How to mask one UIView using another UIView 
/example-code/calayer/how-to-add-a-border-outline-color-to-a-uiview">How to add a border outline color to a UIView</a>
-->

:::

