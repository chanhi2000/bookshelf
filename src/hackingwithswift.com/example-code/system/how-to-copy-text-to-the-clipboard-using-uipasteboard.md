---
lang: ko-KR
title: "How to copy text to the clipboard using UIPasteboard"
description: "Article(s) > How to copy text to the clipboard using UIPasteboard"
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
      content: "Article(s) > How to copy text to the clipboard using UIPasteboard"
    - property: og:description
      content: "How to copy text to the clipboard using UIPasteboard"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-copy-text-to-the-clipboard-using-uipasteboard.html
date: 2023-04-25
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System - free Swift example code",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/example-code/system/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "How to copy text to the clipboard using UIPasteboard | System - free Swift example code",
  "desc": "How to copy text to the clipboard using UIPasteboard",
  "link": "https://hackingwithswift.com/example-code/how-to-copy-text-to-the-clipboard-using-uipasteboard",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 3.0

<!-- TODO: 작성 -->

<!-- 
You can write to and read from the iOS clipboard by using the `UIPasteboard` class, which has a `general` property that returns the shared system space for copying and pasting data between apps. Using this you can write text to the clipboard just like this:

```swift
let pasteboard = UIPasteboard.general
pasteboard.string = "Hello, world!"
```

To read text back from the clipboard, you should unwrap its optional value like this:

```swift
if let string = pasteboard.string {
    // text was found and placed in the "string" constant
}
```

-->

::: details Similar solutions…

<!--
/example-code/system/how-to-copy-objects-in-swift-using-copy">How to copy objects in Swift using copy() 
/example-code/uikit/how-to-disable-undo-redo-copy-and-paste-gestures-using-editinginteractionconfiguration">How to disable undo, redo, copy, and paste gestures using editingInteractionConfiguration 
/example-code/language/what-is-copy-on-write">What is copy on write? 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/swiftui/how-to-add-advanced-text-styling-using-attributedstring">How to add advanced text styling using AttributedString</a>
-->

:::

