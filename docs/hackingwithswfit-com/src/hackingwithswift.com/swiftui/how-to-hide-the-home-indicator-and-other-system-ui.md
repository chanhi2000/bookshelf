---
lang: ko-KR
title: How to hide the home indicator and other system UI
description: Article(s) > How to hide the home indicator and other system UI
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
      content: Article(s) > How to hide the home indicator and other system UI
    - property: og:description
      content: How to hide the home indicator and other system UI
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-hide-the-home-indicator-and-other-system-ui.html
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
  "title": "How to hide the home indicator and other system UI | SwiftUI by Example",
  "desc": "How to hide the home indicator and other system UI",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-hide-the-home-indicator-and-other-system-ui",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

**New in iOS 16**

SwiftUI's `persistentSystemOverlays()` modifier lets us show or hide the so-called “non-transient system views” that are automatically placed over our UI - Apple's name for the home indicator, the multitask indicator on iPad, and more.

For example, this will request to hide the overlays:

```swift
Text("This needs to take up lots of space")
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(.yellow)
    .persistentSystemOverlays(.hidden)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-hide-the-home-indicator-and-other-system-ui-1.zip)

::: note

This is a *request* to hide the overlays - it's down to the system to decide what it actually do.

:::

::: details Similar solutions…

```component VPCard
{
  "title": "How to hide the tab bar, navigation bar, or other toolbars | SwiftUI by Example",
  "desc": "How to hide the tab bar, navigation bar, or other toolbars",
  "link": "/hackingwithswift.com/swiftui/how-to-hide-the-tab-bar-navigation-bar-or-other-toolbars.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to stop system gestures from interfering with your own | SwiftUI by Example",
  "desc": "How to stop system gestures from interfering with your own",
  "link": "/hackingwithswift.com/swiftui/how-to-stop-system-gestures-from-interfering-with-your-own.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to show different images and other views in light or dark mode | SwiftUI by Example",
  "desc": "How to show different images and other views in light or dark mode",
  "link": "/hackingwithswift.com/swiftui/how-to-show-different-images-and-other-views-in-light-or-dark-mode.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to let users share content using the system share sheet | SwiftUI by Example",
  "desc": "How to let users share content using the system share sheet",
  "link": "/hackingwithswift.com/swiftui/how-to-let-users-share-content-using-the-system-share-sheet.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to layer views on top of each other using ZStack | SwiftUI by Example",
  "desc": "How to layer views on top of each other using ZStack",
  "link": "/hackingwithswift.com/swiftui/how-to-layer-views-on-top-of-each-other-using-zstack.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

