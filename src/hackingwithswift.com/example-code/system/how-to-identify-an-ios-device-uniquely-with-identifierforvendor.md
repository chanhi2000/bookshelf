---
lang: ko-KR
title: "How to identify an iOS device uniquely with identifierForVendor"
description: "Article(s) > How to identify an iOS device uniquely with identifierForVendor"
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
  - ios-6.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to identify an iOS device uniquely with identifierForVendor"
    - property: og:description
      content: "How to identify an iOS device uniquely with identifierForVendor"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/how-to-identify-an-ios-device-uniquely-with-identifierforvendor.html
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
  "title": "How to identify an iOS device uniquely with identifierForVendor | System - free Swift example code",
  "desc": "How to identify an iOS device uniquely with identifierForVendor",
  "link": "https://hackingwithswift.com/example-code/how-to-identify-an-ios-device-uniquely-with-identifierforvendor",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 6.0

<!-- TODO: 작성 -->

<!-- 
Early iOS releases gave every device a unique identifier, but this was soon abused by developers to identify individual users uniquely - something that Apple really dislikes. So, Apple removed the truly unique identifier and instead introduced an identifier for each vendor: a UUID that's the same for all apps for a given developer for each user, but varies between developers and between devices.

That is, if a user has five of your apps installed and five of mine, your five will all share the same vendor identifier, and my five will all share the same vendor identifier, but our two identifiers will be different.

Here's how to use it:

```swift
if let uuid = UIDevice.current.identifierForVendor?.uuidString {
    print(uuid)
}
```

-->

::: details Similar solutions…

<!--
/example-code/uikit/how-to-identify-your-auto-layout-constraints">How to identify your Auto Layout constraints 
/quick-start/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts">How to use Instruments to profile your SwiftUI code and identify slow layouts 
/quick-start/swiftui/how-to-detect-device-rotation">How to detect device rotation 
/example-code/uikit/how-to-respond-to-the-device-being-shaken">How to respond to the device being shaken 
/example-code/system/how-to-make-the-device-vibrate">How to make the device vibrate</a>
-->

:::

