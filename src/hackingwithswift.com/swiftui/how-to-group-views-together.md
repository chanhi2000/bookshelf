---
lang: ko-KR
title: How to group views together
description: Article(s) > How to group views together
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
      content: Article(s) > How to group views together
    - property: og:description
      content: How to group views together
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-group-views-together.html
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
  "title": "How to group views together | SwiftUI by Example",
  "desc": "How to group views together",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-group-views-together",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

If you need several views to act as one - for example, to transition together or to apply the same modifier in many places all at once - then you should use SwiftUI's `Group` view. 

To demonstrate this, we could create a `VStack` with several pieces of text, and apply a single `font()` modifier to them all at once:

```swift
Group {
    Text("Line 1")
    Text("Line 2")
    Text("Line 3")
}
.font(.largeTitle)
```

> [<FontIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-group-views-together-1.zip)

You could do the same with `VStack` or `HStack`, of course, but by using `Group` we haven't needed to specify how our text views should be arranged - if this view is placed into a larger view, that parent gets to decide whether the text views should be arranged horizontally, vertically, or some other way entirely.

::: details Similar solutions…

```component VPCard
{
  "title": "How to group views together with ControlGroup | SwiftUI by Example",
  "desc": "How to group views together with ControlGroup",
  "link": "/hackingwithswift.com/swiftui/how-to-group-views-together-with-controlgroup.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to combine text views together | SwiftUI by Example",
  "desc": "How to combine text views together",
  "link": "/hackingwithswift.com/swiftui/how-to-combine-text-views-together.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to blend views together | SwiftUI by Example",
  "desc": "How to blend views together",
  "link": "/hackingwithswift.com/swiftui/how-to-blend-views-together.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to group views visually using GroupBox | SwiftUI by Example",
  "desc": "How to group views visually using GroupBox",
  "link": "/hackingwithswift.com/swiftui/how-to-group-views-visually-using-groupbox.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Composing views to create a list row | SwiftUI by Example",
  "desc": "Composing views to create a list row",
  "link": "/hackingwithswift.com/swiftui/composing-views-to-create-a-list-row.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

