---
lang: ko-KR
title: How to round the corners of a view
description: Article(s) > How to round the corners of a view
category:
  - Swift
  - SwiftUI
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - swiftui
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: Article(s) > How to round the corners of a view
    - property: og:description
      content: How to round the corners of a view
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-round-the-corners-of-a-view.html
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "SwiftUI by Example",
  "desc": "Back to Home",
  "link": "/hackingwithswift.com/swiftui/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
   "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "How to round the corners of a view | SwiftUI by Example",
  "desc": "How to round the corners of a view",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-round-the-corners-of-a-view",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

Any SwiftUI view can have its corners rounded using the `cornerRadius()` modifier. This takes a simple value in points that controls how pronounced the rounding should be.

So, you can create a text view with 15-point rounded corners like this:

```swift
Text("Round Me")
    .padding()
    .background(.red)
    .cornerRadius(15)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-round-the-corners-of-a-view-1.zip)

![The text “Round Me” in a red rounded rectangle.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-round-the-corners-of-a-view-1~dark@2x.png)

You can automatically round the shortest edge fully by using the `clipShape()` modifier with a `Capsule`, like this:

```swift
Text("Round Me")
    .padding()
    .background(.red)
    .clipShape(Capsule())
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-round-the-corners-of-a-view-2.zip)

![The text “Round Me” in a red capsule or pill shape.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-round-the-corners-of-a-view-2~dark@2x.png)

::: details Similar solutions…

```component VPCard
{
  "title": "SwiftUI tips and tricks | SwiftUI by Example",
  "desc": "SwiftUI tips and tricks",
  "link": "/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to convert a SwiftUI view to an image | SwiftUI by Example",
  "desc": "How to convert a SwiftUI view to an image",
  "link": "/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to make a view dismiss itself | SwiftUI by Example",
  "desc": "How to make a view dismiss itself",
  "link": "/hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create and compose custom views | SwiftUI by Example",
  "desc": "How to create and compose custom views",
  "link": "/hackingwithswift.com/swiftui/how-to-create-and-compose-custom-views.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to add Metal shaders to SwiftUI views using layer effects | SwiftUI by Example",
  "desc": "How to add Metal shaders to SwiftUI views using layer effects",
  "link": "/hackingwithswift.com/swiftui/how-to-add-metal-shaders-to-swiftui-views-using-layer-effects.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

