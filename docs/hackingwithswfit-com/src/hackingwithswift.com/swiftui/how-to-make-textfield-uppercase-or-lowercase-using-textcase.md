---
lang: ko-KR
title: How to make TextField uppercase or lowercase using textCase()
description: Article(s) > How to make TextField uppercase or lowercase using textCase()
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
      content: Article(s) > How to make TextField uppercase or lowercase using textCase()
    - property: og:description
      content: How to make TextField uppercase or lowercase using textCase()
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase.html
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
  "title": "How to make TextField uppercase or lowercase using textCase() | SwiftUI by Example",
  "desc": "How to make TextField uppercase or lowercase using textCase()",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI's `TextField` view normally lets users write their text in whatever case they want, but if you want to control that you can force either uppercase or lowercase text using the `textCase()` modifier.

For example, this asks users to enter their name and uppercases every letter:

```swift
struct ContentView: View {
    @State private var name = "Paul"

    var body: some View {
        TextField("Shout your name at me", text: $name)
            .textFieldStyle(.roundedBorder)
            .textCase(.uppercase)
            .padding(.horizontal)
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase-1.zip)

![A text box containing the word “PAUL”](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase-1~dark.png)

::: important

If you're using Xcode 12 you need to use `RoundedBorderTextFieldStyle()` rather than `.roundedBorder`.

:::

::: details Similar solutions…

```component VPCard
{
  "title": "How to make a TextField expand vertically as the user types | SwiftUI by Example",
  "desc": "How to make a TextField expand vertically as the user types",
  "link": "/hackingwithswift.com/swiftui/how-to-make-a-textfield-expand-vertically-as-the-user-types.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to make a TextField or TextEditor have default focus | SwiftUI by Example",
  "desc": "How to make a TextField or TextEditor have default focus",
  "link": "/hackingwithswift.com/swiftui/how-to-make-a-textfield-or-texteditor-have-default-focus.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to dismiss the keyboard for a TextField | SwiftUI by Example",
  "desc": "How to dismiss the keyboard for a TextField",
  "link": "/hackingwithswift.com/swiftui/how-to-dismiss-the-keyboard-for-a-textfield.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to add a TextField to an alert | SwiftUI by Example",
  "desc": "How to add a TextField to an alert",
  "link": "/hackingwithswift.com/swiftui/how-to-add-a-textfield-to-an-alert.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to format a TextField for numbers | SwiftUI by Example",
  "desc": "How to format a TextField for numbers",
  "link": "/hackingwithswift.com/swiftui/how-to-format-a-textfield-for-numbers.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

