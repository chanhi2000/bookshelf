---
lang: ko-KR
title: "What is an enum?"
description: "Article(s) > What is an enum?"
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
  - ios-13.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is an enum?"
    - property: og:description
      content: "What is an enum?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/language/what-is-an-enum.html
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
  "title": "What is an enum? | Language - free Swift example code",
  "desc": "What is an enum?",
  "link": "https://hackingwithswift.com/example-code/language/what-is-an-enum",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 13.0

<!-- TODO: 작성 -->

<!-- 
“Enum” is short for “enumeration”, and it’s a way of letting you use fixed names for special values rather than relying on strings or integers.

For example, if we wanted to track how happy a user was, you could use a number scale where -1 meant unhappy, +1 meant happy, and 0 meant they were in between, but then the onus is on you to remember what those numbers mean. A better idea is to use an enum like this one:

```swift
enum Satisfaction {
    case unhappy
    case meh
    case happy
}
```

Those cases can now be referenced as `Satisfaction.happy`, so it’s clear what you mean - and internally it’s treated no different from an integer, so it has no performance impact.

We can create a `Person` struct using that new enum, like this:

```swift
struct Person {
    var name: String
    var satisfaction: Satisfaction
}
```

Because Swift knows the `satisfaction` property must be a value from the `Satisfaction` enum we can just specify the case we want to use when creating a value:

```swift
let person = Person(name: "Taylor", satisfaction: .happy)
```

-->

::: details Similar solutions…

<!--
/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable">How to list all cases in an enum using CaseIterable 
/quick-start/swiftui/how-to-create-multi-step-animations-using-phase-animators">How to create multi-step animations using phase animators 
/example-code/language/how-to-add-raw-values-to-enums">How to add raw values to enums 
/quick-start/concurrency/how-to-create-and-use-task-local-values">How to create and use task local values 
/quick-start/concurrency/how-to-handle-different-result-types-in-a-task-group">How to handle different result types in a task group</a>
-->

:::

