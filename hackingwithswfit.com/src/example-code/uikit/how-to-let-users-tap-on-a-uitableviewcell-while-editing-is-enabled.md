---
lang: ko-KR
title: "How to let users tap on a UITableViewCell while editing is enabled"
description: "Article(s) > How to let users tap on a UITableViewCell while editing is enabled"
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
      content: "Article(s) > How to let users tap on a UITableViewCell while editing is enabled"
    - property: og:description
      content: "How to let users tap on a UITableViewCell while editing is enabled"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/uikit/how-to-let-users-tap-on-a-uitableviewcell-while-editing-is-enabled.html
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
  "title": "How to let users tap on a UITableViewCell while editing is enabled | UIKit - free Swift example code",
  "desc": "How to let users tap on a UITableViewCell while editing is enabled",
  "link": "https://hackingwithswift.com/example-code/uikit/how-to-let-users-tap-on-a-uitableviewcell-while-editing-is-enabled",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 3.0

<!-- TODO: 작성 -->

<!--
As soon as you set the `editing` property of a `UITableView` to be true, its cells stop being tappable. This is often a good idea, because if a user explicitly enabled editing mode they probably want to delete or move stuff, and it's only going to be annoying if they can select rows by accident.

Of course, as always, there are times when you specifically want both actions to be available - for the user to be able to move or delete a cell, and also tap on it to select. If that's the situation you find yourself in right now, here's the line of code you need:

```swift
tableView.allowsSelectionDuringEditing = true
```

-->

::: details Similar solutions…

<!--
/quick-start/swiftui/how-to-read-tap-and-double-tap-gestures">How to read tap and double-tap gestures 
/example-code/uikit/how-to-check-whether-users-have-enabled-the-reduced-motion-setting">How to check whether users have enabled the reduced motion setting 
/quick-start/concurrency/how-to-call-an-async-function-using-async-let">How to call an async function using async let 
/example-code/system/how-to-detect-low-power-mode-is-enabled">How to detect low power mode is enabled 
/quick-start/swiftui/how-to-detect-the-location-of-a-tap-inside-a-view">How to detect the location of a tap inside a view</a>
-->

:::

