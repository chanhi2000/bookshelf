---
lang: ko-KR
title: "How do you read from the command line?"
description: "Article(s) > How do you read from the command line?"
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
  - ios-7.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How do you read from the command line?"
    - property: og:description
      content: "How do you read from the command line?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/system/how-do-you-read-from-the-command-line.html
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
  "title": "How do you read from the command line? | System - free Swift example code",
  "desc": "How do you read from the command line?",
  "link": "https://hackingwithswift.com/example-code/system/how-do-you-read-from-the-command-line",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 7.0

<!-- TODO: 작성 -->

<!-- 
If you're working on a command-line app for macOS or Linux, you'll probably want to read and manipulate commands typed by the user. This is easy to do using the `readLine()` function, which reads one line of user input (everything until they hit return) and sends it back to you.

Note: it's possible for users to enter no input, which is different from an empty string. This means `readLine()` returns an optional string when you call it, where nil is used to represent "no input".

Here's some example code to get you started:

```swift
print("Please enter your name:")

if let name = readLine() {
    print("Hello, \(name)!")
} else {
    print("Why are you being so coy?")
}

print("TTFN!")
```

When that example is run, you'll see the first `print()` message, then the program will pause until the user has entered some text and pressed return. If they entered any text at all, including an empty string, they'll see the "Hello" output. If they entered no text - try it yourself by pressing Ctrl+D to trigger an "end of file" signal - they'll get the other message. Regardless of what they press, they'll see the final "TTFN!" message before the program finishes.

It should go without saying that command-line input is not available on iOS. Maybe in iOS 15…

-->

::: details Similar solutions…

<!--
/example-code/system/how-to-run-code-when-your-app-is-terminated">How to run code when your app is terminated 
/quick-start/swiftui/swiftui-tips-and-tricks">SwiftUI tips and tricks 
/quick-start/concurrency/how-to-make-async-command-line-tools-and-scripts">How to make async command-line tools and scripts 
/example-code/uikit/how-to-localize-your-ios-app">How to localize your iOS app 
/example-code/uikit/how-to-create-live-playgrounds-in-xcode">How to create live playgrounds in Xcode</a>
-->

:::

