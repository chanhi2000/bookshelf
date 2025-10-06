---
lang: ko-KR
title: "How to post messages using NotificationCenter"
description: "Article(s) > How to post messages using NotificationCenter"
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
  - ios-2.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to post messages using NotificationCenter"
    - property: og:description
      content: "How to post messages using NotificationCenter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-post-messages-using-notificationcenter.html
date: 2018-03-28
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
  "title": "How to post messages using NotificationCenter | System - free Swift example code",
  "desc": "How to post messages using NotificationCenter",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "link": "https://hackingwithswift.com/example-code/how-to-post-messages-using-notificationcenter",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 2.0

<!-- TODO: 작성 -->

<!--
iOS notifications are a simple and powerful way to send data in a loosely coupled way. That is, the sender of a notification doesn't have to care about who (if anyone) receives the notification, it just posts it out there to the rest of the app and it could be picked up by lots of things or nothing depending on your app's state.

As a basic example, you might want various parts of your app to do some work when the user logs in - you might want some views to refresh, you might want a database to update itself, and so on. To do this, just post a notification name like this:

```swift
let nc = NotificationCenter.default
nc.post(name: Notification.Name("UserLoggedIn"), object: nil)
```

Note: it is preferable, for type safety, to define your notification names as static strings that belong to a class or struct or other global form so that you don't make a typo and introduce bugs.

To register to catch a notification being posted, use this:

```swift
nc.addObserver(self, selector: #selector(userLoggedIn), name: Notification.Name("UserLoggedIn"), object: nil)
```

That will call a `userLoggedIn()` method when your notification is posted.

-->

::: details Similar solutions…

<!--
/quick-start/swiftui/how-to-create-multi-column-lists-using-table">How to create multi-column lists using Table 
/quick-start/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue">How to use @MainActor to run code on the main queue 
/quick-start/swiftui/how-to-add-advanced-text-styling-using-attributedstring">How to add advanced text styling using AttributedString 
/quick-start/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions">How to use continuations to convert completion handlers into async functions 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks</a>
-->

:::

