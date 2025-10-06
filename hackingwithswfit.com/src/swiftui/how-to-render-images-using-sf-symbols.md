---
lang: ko-KR
title: How to render images using SF Symbols
description: Article(s) > How to render images using SF Symbols
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
      content: Article(s) > How to render images using SF Symbols
    - property: og:description
      content: How to render images using SF Symbols
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-render-images-using-sf-symbols.html
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
  "title": "How to render images using SF Symbols | SwiftUI by Example",
  "desc": "How to render images using SF Symbols",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-render-images-using-sf-symbols",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI's `Image` view lets us load any of the 2400+ icons from SF Symbols, with many of them working in multi-color too.

To load icons from Apple's SF Symbols set, use the `Image(systemName:)` initializer, passing in the icon string to load, like this:

```swift
Image(systemName: "moon.stars.fill")
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-render-images-using-sf-symbols-1.zip)

![A symbol showing the cresent moon and stars.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-render-images-using-sf-symbols-1~dark.png)

The image you get back is scalable and colorable, which means you can ask SwiftUI to scale up the image to match whatever Dynamic Type text style it accompanies, if any:

```swift
Image(systemName: "wind.snow")
    .font(.largeTitle)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-render-images-using-sf-symbols-2.zip)

![A large symbol showing a gust of wind blowing snowflakes along.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-render-images-using-sf-symbols-2~dark.png)

And it also means you can tint the image using the same `foregroundStyle()` modifier you've already seen:

```swift
Image(systemName: "cloud.heavyrain.fill")
    .font(.largeTitle)
    .foregroundStyle(.red)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-render-images-using-sf-symbols-3.zip)

![A red symbol showing a cloud dispensing heavy rain.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-render-images-using-sf-symbols-3~dark.png)

If you're using an image that has color elements, you can activate multi-color mode using `.renderingMode(.original)`, like this:

```swift
Image(systemName: "cloud.sun.rain.fill")
    .renderingMode(.original)
    .font(.largeTitle)
    .padding()
    .background(.black)
    .clipShape(Circle())
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-render-images-using-sf-symbols-4.zip)

![A black circle on top of which is a symbol which depicts a white cloud dispensing blue rain and partially obscuring a yellow sun.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-render-images-using-sf-symbols-4~dark.png)

You can optionally apply a `foregroundStyle()` modifier to a multi-color SF Symbol, which will cause part of the symbol to be recolored. For example, this will render part of the icon blue and part green:

```swift
Image(systemName: "person.crop.circle.fill.badge.plus")
    .renderingMode(.original)
    .foregroundStyle(.blue)
    .font(.largeTitle)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-render-images-using-sf-symbols-5.zip)

![A symbol showing a circular blue person symbol, overlaid with a circular green plus symbol.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-render-images-using-sf-symbols-5~dark.png)

::: details Similar solutions…

```component VPCard
{
  "title": "How to get custom colors and transparency with SF Symbols | SwiftUI by Example",
  "desc": "How to get custom colors and transparency with SF Symbols",
  "link": "/hackingwithswift.com/swiftui/how-to-get-custom-colors-and-transparency-with-sf-symbols.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to animate SF Symbols | SwiftUI by Example",
  "desc": "How to animate SF Symbols",
  "link": "/hackingwithswift.com/swiftui/how-to-animate-sf-symbols.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to render a SwiftUI view to a PDF | SwiftUI by Example",
  "desc": "How to render a SwiftUI view to a PDF",
  "link": "/hackingwithswift.com/swiftui/how-to-render-a-swiftui-view-to-a-pdf.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to render Markdown content in text | SwiftUI by Example",
  "desc": "How to render Markdown content in text",
  "link": "/hackingwithswift.com/swiftui/how-to-render-markdown-content-in-text.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to render a gradient | SwiftUI by Example",
  "desc": "How to render a gradient",
  "link": "/hackingwithswift.com/swiftui/how-to-render-a-gradient.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

