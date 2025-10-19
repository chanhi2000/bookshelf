---
lang: ko-KR
title: How to display solid shapes
description: Article(s) > How to display solid shapes
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
      content: Article(s) > How to display solid shapes
    - property: og:description
      content: How to display solid shapes
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-display-solid-shapes.html
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
  "title": "How to display solid shapes | SwiftUI by Example",
  "desc": "How to display solid shapes",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-display-solid-shapes",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI has several built-in shapes such as rectangles, circles, and capsules, each of which can be created, color, and positioned as needed.

For example, if you wanted a 200x200 red rectangle, you would use this:

```swift
Rectangle()
    .fill(.red)
    .frame(width: 200, height: 200)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-display-solid-shapes-1.zip)

![A red square.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-display-solid-shapes-1~dark.png)

Similarly, if you wanted a 100x100 blue circle you would use this:

```swift
Circle()
    .fill(.blue)
    .frame(width: 100, height: 100)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-display-solid-shapes-2.zip)

![A blue circle.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-display-solid-shapes-2~dark.png)

There's a dedicated shape for rounded rectangles, allowing you to customize how much rounding should be applied, as well as having complete control over the type of rounding. For example, this creates a rounded rectangle with 25 points of rounding on each corner:

```swift
RoundedRectangle(cornerRadius: 25)
    .fill(.green)
    .frame(width: 150, height: 100)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-display-solid-shapes-3.zip)

![A green rounded rectangle.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-display-solid-shapes-3~dark.png)

Finally, SwiftUI provides a `Capsule()` shape as a specialized form of rounded rectangles, where the shortest edge of the rectangle is always fully rounded. This is a popular style with buttons, because you get a lozenge-shaped button in just a couple of lines of code:

```swift
Capsule()
    .fill(.green)
    .frame(width: 150, height: 100)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-display-solid-shapes-4.zip)

![A green capsule or lozenge shape.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-display-solid-shapes-4~dark.png)

::: details Similar solutions…

```component VPCard
{
  "title": "How to draw part of a solid shape using trim() | SwiftUI by Example",
  "desc": "How to draw part of a solid shape using trim()",
  "link": "/hackingwithswift.com/swiftui/how-to-draw-part-of-a-solid-shape-using-trim.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to combine shapes to create new shapes | SwiftUI by Example",
  "desc": "How to combine shapes to create new shapes",
  "link": "/hackingwithswift.com/swiftui/how-to-combine-shapes-to-create-new-shapes.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to display a bottom sheet | SwiftUI by Example",
  "desc": "How to display a bottom sheet",
  "link": "/hackingwithswift.com/swiftui/how-to-display-a-bottom-sheet.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to customize the display mode of NavigationSplitView | SwiftUI by Example",
  "desc": "How to customize the display mode of NavigationSplitView",
  "link": "/hackingwithswift.com/swiftui/how-to-customize-the-display-mode-of-navigationsplitview.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "SwiftUI's built-in shapes | SwiftUI by Example",
  "desc": "SwiftUI's built-in shapes",
  "link": "/hackingwithswift.com/swiftui/swiftuis-built-in-shapes.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

