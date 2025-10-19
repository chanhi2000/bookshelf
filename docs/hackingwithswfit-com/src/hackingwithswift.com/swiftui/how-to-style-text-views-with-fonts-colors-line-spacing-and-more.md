---
lang: ko-KR
title: How to style text views with fonts, colors, line spacing, and more
description: Article(s) > How to style text views with fonts, colors, line spacing, and more
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
      content: Article(s) > How to style text views with fonts, colors, line spacing, and more
    - property: og:description
      content: How to style text views with fonts, colors, line spacing, and more
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more.html
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
  "title": "How to style text views with fonts, colors, line spacing, and more | SwiftUI by Example",
  "desc": "How to style text views with fonts, colors, line spacing, and more",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

Not only do text views give us a predictably wide range of control in terms of how they look, they are also designed to work seamlessly alongside core Apple technologies such as Dynamic Type.

By default a Text view has a “Body” Dynamic Type style, but you can select from other sizes and weights by calling `.font()` on it like this:

```swift
Text("This is an extremely long text string that will never fit even the widest of phones without wrapping")
    .font(.largeTitle)
    .frame(width: 300)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more-1.zip)

![A very long sentence wrapped across multiple lines.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more-1~dark.png)

We can control the color of text using the `.foregroundStyle()` modifier, like this:

```swift
Text("The best laid plans")
    .foregroundStyle(.red)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-2.zip)

![The words “The best laid plans” in red text](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more-2~dark.png)

For more complex text coloring, e.g. using a gradient, you should use `foregroundStyle()` like this:

```swift
Text("The best laid plans")
    .foregroundStyle(.blue.gradient)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-3.zip)

You can also set the background color, but that uses `.background()` because it's possible to use more advanced backgrounds than just a flat color. Anyway, to give our layout a yellow background color we would add this:

```swift
Text("The best laid plans")
    .padding()
    .background(.yellow)
    .foregroundStyle(.white)
    .font(.headline)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-4.zip)

![The words “The best laid plans” in white text over a rectangular dark yellow background](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more-3~dark.png)

There are even more options. For example, we can adjust the line spacing in our text. The default value is 0, which means there is no extra line spacing applied, but you can also specify position values to add extra spacing between lines:

```swift
Text("This is an extremely long text string that will never fit even the widest of phones without wrapping")
    .font(.largeTitle)
    .lineSpacing(50)
    .frame(width: 300)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-5.zip)

![A very long sentence with multiple widely spaced lines.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more-4~dark.png)

You can also use the `fontDesign()` modifier to adjust only the style of the font without also adjusting its size, like this:

```swift
Text("Hello, world!")
    .fontDesign(.serif)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-6.zip)

Or use the `fontWidth()` modifier to compress or expand the font, like this:

```swift
Text("Hello, world!")
    .fontWidth(.condensed)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-7.zip)

::: note

You will find that `fontWidth()` only works with fonts that have been designed to support it. If your font hasn't been designed with font width in mind, you'll just get the default width.

:::

::: details Similar solutions…

```component VPCard
{
  "title": "Polishing designs with fonts and colors | SwiftUI by Example",
  "desc": "Polishing designs with fonts and colors",
  "link": "/hackingwithswift.com/swiftui/polishing-designs-with-fonts-and-colors.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to add spacing between letters in text | SwiftUI by Example",
  "desc": "How to add spacing between letters in text",
  "link": "/hackingwithswift.com/swiftui/how-to-add-spacing-between-letters-in-text.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to control spacing around individual views using padding | SwiftUI by Example",
  "desc": "How to control spacing around individual views using padding",
  "link": "/hackingwithswift.com/swiftui/how-to-control-spacing-around-individual-views-using-padding.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to customize stack layouts with alignment and spacing | SwiftUI by Example",
  "desc": "How to customize stack layouts with alignment and spacing",
  "link": "/hackingwithswift.com/swiftui/how-to-customize-stack-layouts-with-alignment-and-spacing.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "SwiftUI tips and tricks | SwiftUI by Example",
  "desc": "SwiftUI tips and tricks",
  "link": "/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

