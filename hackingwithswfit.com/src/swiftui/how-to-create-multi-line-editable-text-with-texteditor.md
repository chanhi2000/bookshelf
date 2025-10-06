---
lang: ko-KR
title: How to create multi-line editable text with TextEditor
description: Article(s) > How to create multi-line editable text with TextEditor
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
      content: Article(s) > How to create multi-line editable text with TextEditor
    - property: og:description
      content: How to create multi-line editable text with TextEditor
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-multi-line-editable-text-with-texteditor.html
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
  "title": "How to create multi-line editable text with TextEditor | SwiftUI by Example",
  "desc": "How to create multi-line editable text with TextEditor",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-create-multi-line-editable-text-with-texteditor",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI has a `TextEditor` view for handling multi-line, scrolling text. You can set the font, change the colors as needed, and even adjust line spacing and how many lines can be created.

You need to store the current value of your text field somewhere, using `@State` or similar. For example, we could create a text view to let the user enter profile data like this:

```swift
struct ContentView: View {
    @State private var profileText = "Enter your bio"

    var body: some View {
        NavigationStack {
            TextEditor(text: $profileText)
                .foregroundStyle(.secondary)
                .padding(.horizontal)
                .navigationTitle("About you")
        }
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-multi-line-editable-text-with-texteditor-1.zip)

![The line “Enter your bio”, followed by more more lines of text in the same area.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-multi-line-editable-text-with-texteditor-1~dark.png)

For single-line text entry, use `TextField` instead.

::: tip

In case you were wondering, at this time there is no ability to add formatted text inside a `TextEditor` view.

:::

::: details Similar solutions…

```component VPCard
{
  "title": "How to change the background color of List, TextEditor, and more | SwiftUI by Example",
  "desc": "How to change the background color of List, TextEditor, and more",
  "link": "/hackingwithswift.com/swiftui/how-to-change-the-background-color-of-list-texteditor-and-more.md",
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
  "title": "How to customize the submit button for TextField, SecureField, and TextEditor | SwiftUI by Example",
  "desc": "How to customize the submit button for TextField, SecureField, and TextEditor",
  "link": "/hackingwithswift.com/swiftui/how-to-customize-the-submit-button-for-textfield-securefield-and-texteditor.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to let users find and replace text | SwiftUI by Example",
  "desc": "How to let users find and replace text",
  "link": "/hackingwithswift.com/swiftui/how-to-let-users-find-and-replace-text.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to format text inside text views | SwiftUI by Example",
  "desc": "How to format text inside text views",
  "link": "/hackingwithswift.com/swiftui/how-to-format-text-inside-text-views.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

