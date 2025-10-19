---
lang: ko-KR
title: How to create static labels with a Text view
description: Article(s) > How to create static labels with a Text view
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
      content: Article(s) > How to create static labels with a Text view
    - property: og:description
      content: How to create static labels with a Text view
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-static-labels-with-a-text-view.html
prev: /hackingwithswift.com/swiftui/wrap-up-our-swiftui-project-is-complete.md
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
  "title": "How to create static labels with a Text view | SwiftUI by Example",
  "desc": "How to create static labels with a Text view",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-create-static-labels-with-a-text-view",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

**Updated in iOS 16**

Text views show static text on the screen, and are equivalent to `UILabel` in UIKit. At their most basic they look like this:

```swift
Text("Hello World")
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-static-labels-with-a-text-view-1.zip)

![The words Hello World displayed on a plain background](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-static-labels-with-a-text-view-1~dark.png)

Inside the preview window for your content view you're likely to see “Automatic preview updating paused” - go ahead and press <VPIcon icon="iconfont icon-select"/>`[Resume]` to have Swift start building your code and show you a live preview of how it looks.

::: tip

You can press <kbd>Opt</kbd>+<kbd>Cmd</kbd>+<kbd>P</kbd> to resume these previews at any time.

:::

By default text views wrap across as many lines as they need, but if you'd rather limit the number of lines they can use you should add the lineLimit modifier, like this:

```swift
Text("This is some longer text that is limited to three lines maximum, so anything more than that will cause the text to clip.")
    .lineLimit(3)
    .frame(width: 200)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-static-labels-with-a-text-view-2.zip)

![Three lines of text showing the line limit and frame modifiers.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-static-labels-with-a-text-view-2~dark.png)

You can also provide line limit ranges rather than a specific value - you might want to allow any range between 3 and 6, for example:

```swift
Text("This is some longer text that is limited to a specific range of lines, so anything more than six lines will cause the text to clip.")
    .lineLimit(3...6)
    .frame(width: 200)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-static-labels-with-a-text-view-3.zip)

If you need an _exact_ line limit - meaning “this text should have exactly two lines of height, not more and not less”, you should use the `reservesSpace` parameter like this:

```swift
Text("This is always two lines")
    .lineLimit(2, reservesSpace: true)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-static-labels-with-a-text-view-3.zip)

That doesn't mean the text will somehow be stretched across two lines, only that the text view will be sized to be two lines in height no matter what its contents. This approach is particularly helpful when you need an exact number of lines - in grids and other layouts where you want nice and even spacing, for example.

If you place a line limit on some text then provide it with a string that's too long to fit in the available space, SwiftUI will truncate the text so that it ends with “...”.

You can adjust the way SwiftUI truncates your text: the default is to remove text from the end and show an ellipsis there instead, but you can also place the ellipsis in the middle or beginning depending on how important the various parts of your string are.

For example, this truncates your text in the middle:

```swift
Text("This is an extremely long string of text that will never fit even the widest of iOS devices even if the user has their Dynamic Type setting as small as is possible, so in theory it should definitely demonstrate truncationMode().")
    .lineLimit(1)
    .truncationMode(.middle)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-static-labels-with-a-text-view-4.zip)

![A single line of text truncated in the middle.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-static-labels-with-a-text-view-3~dark.png)

Regardless of how you truncate the text, what you'll see is that your text view sits neatly centered in the main view. This is the default behavior of SwiftUI: unless it's told to position views somewhere else, it positions them relative to the center of the screen.

::: details Similar solutions…

```component VPCard
{
  "title": "How to create a list of static items | SwiftUI by Example",
  "desc": "How to create a list of static items",
  "link": "/hackingwithswift.com/swiftui/how-to-create-a-list-of-static-items.md",
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

```component VPCard
{
  "title": "SwiftUI tips and tricks | SwiftUI by Example",
  "desc": "SwiftUI tips and tricks",
  "link": "/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to add advanced text styling using AttributedString | SwiftUI by Example",
  "desc": "How to add advanced text styling using AttributedString",
  "link": "/hackingwithswift.com/swiftui/how-to-add-advanced-text-styling-using-attributedstring.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create multi-line editable text with TextEditor | SwiftUI by Example",
  "desc": "How to create multi-line editable text with TextEditor",
  "link": "/hackingwithswift.com/swiftui/how-to-create-multi-line-editable-text-with-texteditor.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

