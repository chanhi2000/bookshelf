---
lang: ko-KR
title: How to load custom colors from an asset catalog
description: Article(s) > How to load custom colors from an asset catalog
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
      content: Article(s) > How to load custom colors from an asset catalog
    - property: og:description
      content: How to load custom colors from an asset catalog
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-load-custom-colors-from-an-asset-catalog.html
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
  "title": "How to load custom colors from an asset catalog | SwiftUI by Example",
  "desc": "How to load custom colors from an asset catalog",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-load-custom-colors-from-an-asset-catalog",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

**Improved in iOS 17**

Creating your SwiftUI colors in an asset catalog is the easiest way to visualize them, but also the easiest way to add light and dark mode adjustments.

Helpfully, it's trivial to load an asset catalog color into a SwiftUI `Color`, and in fact if you're using Xcode 15 or later you can write this:

```swift
Color(.yourColorName)
```

This was introduced in Xcode 15 alongside iOS 17, but works just fine back in all older versions of iOS.

If you're using Xcode 14 and earlier, you need to write the name of your colors like this:

```swift
Color("YourColorName")
```

::: important

With the newer Xcode 15 variant, the first letter of your color name is lowercased to fit in with standard Swift naming conventions, but if you're using the older stringly-typed approach you should keep the casing the same as it is in your asset catalog.

:::

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
  "title": "Polishing designs with fonts and colors | SwiftUI by Example",
  "desc": "Polishing designs with fonts and colors",
  "link": "/hackingwithswift.com/swiftui/polishing-designs-with-fonts-and-colors.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to style text views with fonts, colors, line spacing, and more | SwiftUI by Example",
  "desc": "How to style text views with fonts, colors, line spacing, and more",
  "link": "/hackingwithswift.com/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to lazy load views using LazyVStack and LazyHStack | SwiftUI by Example",
  "desc": "How to lazy load views using LazyVStack and LazyHStack",
  "link": "/hackingwithswift.com/swiftui/how-to-lazy-load-views-using-lazyvstack-and-lazyhstack.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to load a remote image from a URL | SwiftUI by Example",
  "desc": "How to load a remote image from a URL",
  "link": "/hackingwithswift.com/swiftui/how-to-load-a-remote-image-from-a-url.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

