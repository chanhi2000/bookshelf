---
lang: ko-KR
title: Working with forms
description: Article(s) > Working with forms
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
      content: Article(s) > Working with forms
    - property: og:description
      content: Working with forms
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/working-with-forms.html
prev: /hackingwithswift.com/swiftui/how-to-change-the-tint-color-for-individual-list-rows.md
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
  "title": "Working with forms | SwiftUI by Example",
  "desc": "Working with forms",
  "link": "https://hackingwithswift.com/quick-start/swiftui/working-with-forms",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

With its firm focus on declarative user interfaces, it should be no surprise that SwiftUI gives us a fantastic mechanism for building forms - collections of user input controls designed to gather information, such as an order form or a settings screen.

Even better, several parts of SwiftUI automatically adapt to being placed inside forms, with their appearance and behavior changing so they work better alongside other groups of input controls.

If you thought *that* was clever, you're going to love this: SwiftUI actually dynamically adjusts the layouts to the point where it can make whole new screens automatically for us depending on what platform your code is running on - it fully decouples the *purpose* of our controls from their visuals. This means we describe what we *want* and SwiftUI figures out the idiomatic way to make that happen on the current platform.

::: tip

Forms are regular containers just like `VStack`, so you can switch between the two freely depending on your purpose.

:::

::: details Similar solutions…

```component VPCard
{
  "title": "Bindings and forms | SwiftUI by Example",
  "desc": "Bindings and forms",
  "link": "/hackingwithswift.com/swiftui/bindings-and-forms.html",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Breaking forms into sections | SwiftUI by Example",
  "desc": "Breaking forms into sections",
  "link": "/hackingwithswift.com/swiftui/breaking-forms-into-sections.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Pickers in forms | SwiftUI by Example",
  "desc": "Pickers in forms",
  "link": "/hackingwithswift.com/swiftui/pickers-in-forms.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Enabling and disabling elements in forms | SwiftUI by Example",
  "desc": "Enabling and disabling elements in forms",
  "link": "/hackingwithswift.com/swiftui/enabling-and-disabling-elements-in-forms.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Working with containers | SwiftUI by Example",
  "desc": "Working with containers",
  "link": "/hackingwithswift.com/swiftui/working-with-containers.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

