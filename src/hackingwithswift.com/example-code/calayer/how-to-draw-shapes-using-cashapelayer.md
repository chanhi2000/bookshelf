---
lang: ko-KR
title: "How to draw shapes using CAShapeLayer"
description: "Article(s) > How to draw shapes using CAShapeLayer"
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
  - ios-3.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to draw shapes using CAShapeLayer"
    - property: og:description
      content: "How to draw shapes using CAShapeLayer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/calayer/how-to-draw-shapes-using-cashapelayer.html
date: 2019-03-28
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
  "title": "How to draw shapes using CAShapeLayer | CALayer - free Swift example code",
  "desc": "How to draw shapes using CAShapeLayer",
  "link": "https://hackingwithswift.com/example-code/calayer/how-to-draw-shapes-using-cashapelayer",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 3.0

<!-- TODO: 작성 -->

<!-- 
There are lots of `CALayer` subclasses out there, but `CAShapeLayer` is one of my favorites: it provides hardware-accelerated drawing of all sorts of 2D shapes, and includes extra functionality such as fill and stroke colors, line caps, patterns and more.

To get you started, this uses `UIBezierPath` to create a rounded rectangle, which is then colored red using `CAShaperLayer`. Remember, `CALayer` sits underneath UIKit, so you need to use `CGColor` rather than `UIColor`.

```swift
let layer = CAShapeLayer()
layer.path = UIBezierPath(roundedRect: CGRect(x: 64, y: 64, width: 160, height: 160), cornerRadius: 50).cgPath
layer.fillColor = UIColor.red.cgColor
view.layer.addSublayer(layer)
```

-->

::: details Similar solutions…

<!--
/quick-start/swiftui/how-to-combine-shapes-to-create-new-shapes">How to combine shapes to create new shapes 
/example-code/uikit/how-to-draw-shapes-using-uibezierpath">How to draw shapes using UIBezierPath 
/quick-start/swiftui/how-to-fill-and-stroke-shapes-at-the-same-time">How to fill and stroke shapes at the same time 
/example-code/calayer/how-to-make-a-shape-draw-itself-using-strokeend">How to make a shape draw itself using strokeEnd 
/quick-start/swiftui/swiftuis-built-in-shapes">SwiftUI’s built-in shapes</a>
-->

:::

