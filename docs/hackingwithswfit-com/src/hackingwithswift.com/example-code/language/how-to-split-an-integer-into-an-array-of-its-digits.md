---
lang: ko-KR
title: "How to split an integer into an array of its digits"
description: "Article(s) > How to split an integer into an array of its digits"
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
  - ios-8.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to split an integer into an array of its digits"
    - property: og:description
      content: "How to split an integer into an array of its digits"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/how-to-split-an-integer-into-an-array-of-its-digits.html
date: 2019-03-28
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Language - free Swift example code",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/example-code/language/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "How to split an integer into an array of its digits | Language - free Swift example code",
  "desc": "How to split an integer into an array of its digits",
  "link": "https://hackingwithswift.com/example-code/language/how-to-split-an-integer-into-an-array-of-its-digits",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 8.0

<!-- TODO: 작성 -->

<!-- 
You can take any integer number and convert it to array of integer digits using this extension:

```swift
extension BinaryInteger {
    var digits: [Int] {
        return String(describing: self).compactMap { Int(String($0)) }
    }
}
```

That’s a protocol extension, so you should be able to call it using `Int`, `UInt64`, `Int8`, and so on.

-->

::: details Similar solutions…

<!--
/example-code/language/how-to-split-an-array-into-chunks">How to split an array into chunks 
/example-code/strings/how-to-split-a-string-into-an-array-componentsseparatedby">How to split a string into an array: components(separatedBy:) 
/example-code/language/how-to-check-whether-an-integer-lies-inside-a-range">How to check whether an integer lies inside a range 
/example-code/uikit/how-to-pad-a-uitextview-by-setting-its-text-container-inset">How to pad a UITextView by setting its text container inset 
/quick-start/swiftui/how-to-dynamically-adjust-the-appearance-of-a-view-based-on-its-size-and-location">How to dynamically adjust the appearance of a view based on its size and location</a>
-->

:::

