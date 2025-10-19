---
lang: ko-KR
title: "How to position a view using Auto Layout anchors"
description: "Article(s) > How to position a view using Auto Layout anchors"
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
      content: "Article(s) > How to position a view using Auto Layout anchors"
    - property: og:description
      content: "How to position a view using Auto Layout anchors"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors.html
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
  "title": "How to position a view using Auto Layout anchors | UIKit - free Swift example code",
  "desc": "How to position a view using Auto Layout anchors",
  "link": "https://hackingwithswift.com/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 9.0

<!-- TODO: 작성 -->

<!--
Auto Layout anchors make it easy to position your views relative to others. There are lots of anchors to choose from: leading and trailing edges, top and bottom edges, center X and center Y, and more. 

To try it out, first create a view something like this:

```swift
let child = UIView()
child.translatesAutoresizingMaskIntoConstraints = false
child.backgroundColor = .red
view.addSubview(child)
```

Now we can position that view by activating various anchors. For example, we could pin it to the top and bottom edges of the screen, make it precisely 128 points wide, then center it horizontally:

```swift
child.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
child.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
child.widthAnchor.constraint(equalToConstant: 128).isActive = true
child.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor).isActive = true
```

To explore anchors further, try typing `child.anchor` and exploring the code completion options.

-->

::: details Similar solutions…

<!--
/example-code/uikit/how-to-make-a-uiview-fill-the-screen-using-auto-layout-anchors">How to make a UIView fill the screen using Auto Layout anchors 
/quick-start/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view">How to position and style subviews that come from a different view 
/quick-start/swiftui/how-to-position-views-in-a-grid-using-lazyvgrid-and-lazyhgrid">How to position views in a grid using LazyVGrid and LazyHGrid 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-detect-when-the-size-or-position-of-a-view-changes">How to detect when the size or position of a view changes</a>
-->

:::

