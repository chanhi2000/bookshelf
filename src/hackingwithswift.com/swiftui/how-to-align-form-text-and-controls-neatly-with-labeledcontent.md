---
lang: ko-KR
title: How to align form text and controls neatly with LabeledContent
description: Article(s) > How to align form text and controls neatly with LabeledContent
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
      content: Article(s) > How to align form text and controls neatly with LabeledContent
    - property: og:description
      content: How to align form text and controls neatly with LabeledContent
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-align-form-text-and-controls-neatly-with-labeledcontent.html
next: /hackingwithswift.com/swiftui/working-with-containers.md
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
  "title": "How to align form text and controls neatly with LabeledContent | SwiftUI by Example",
  "desc": "How to align form text and controls neatly with LabeledContent",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-align-form-text-and-controls-neatly-with-labeledcontent",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI's forms do a great job of making many views look good out of the box, but sometimes you need a little extra control to get exactly the right result - aligning text correctly, labelling custom views, or aligning controls that don't carry labels such as `Slider`.

In its simplest form, using `LabeledContent` is similar to using the `badge()` modifier: 

```swift
Form {
    LabeledContent("This is important", value: "Value goes here")
}
```

> [<FontIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-align-form-text-and-controls-neatly-with-labeledcontent-1.zip)

This will place the title on the leading edge of the screen and the value on the trailing edge. The alignment will automatically adjust depending on your platform: iOS left aligns the title and right aligns the value, whereas macOS *right* aligns the title and *left* aligns the value. This is particularly important for forms on macOS, where other view types such as `TextField` and `Toggle` automatically align their title and value, whereas `Slider` would not.

On iOS this use of `LabeledContent` gives the same result as using `Text("This is important").badge("Value goes here")`, but the real power of `LabeledContent` is that it can take any view, whereas badges accepts only text and numbers.

So, we could use `LabeledContent` to show an image by passing a custom content closure:

```swift
LabeledContent("This is important") {
    Image(systemName: "exclamationmark.triangle")
}
```

> [<FontIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-align-form-text-and-controls-neatly-with-labeledcontent-2.zip)

But more importantly, we can also use it with any views that would not normally have a label, such as `Slider`:

```swift
struct ContentView: View {
    @State private var brightness = 0.5

    var body: some View {
        Form {
            LabeledContent {
                Slider(value: $brightness)
            } label: {
                Text("Brightness")
            }
        }
    }
}
```

> [<FontIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-align-form-text-and-controls-neatly-with-labeledcontent-3.zip)

This is particularly important on macOS, because it was place the label on the left-hand side of the form and the slider on the right.

::: important

At the time of writing, some SwiftUI views such as `Stepper` will *not* use the title of your `LabeledContent` for VoiceOver. This makes them rather opaque in terms of accessibility support, so you should use them carefully.

:::

If the title of your `LabeledContent` includes two pieces of text, iOS will automatically render the second text in a smaller, lighter font, making it look like a subtitle:

```swift
Form {
    LabeledContent {
        Text("Value")
    } label: {
        Text("Title")
        Text("Subtitle")
    }
}
```

> [<FontIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-align-form-text-and-controls-neatly-with-labeledcontent-4.zip)

In fact, it supports up to four pieces of text using this approach, with each one rendered smaller and lighter:

```swift
Form {
    LabeledContent {
        Text("Value")
    } label: {
        Text("Title")
        Text("Subtitle")
        Text("Subsubtitle")
        Text("Subsubsubtitle")
    }
}
```

> [<FontIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-align-form-text-and-controls-neatly-with-labeledcontent-5.zip)

::: tip

If you apply the `labelsHidden()` modifier to any `LabeledContent`, the label title will be hidden while leaving the content visible.

:::

::: details Similar solutions…

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
  "title": "All SwiftUI property wrappers explained and compared | SwiftUI by Example",
  "desc": "All SwiftUI property wrappers explained and compared",
  "link": "/hackingwithswift.com/swiftui/all-swiftui-property-wrappers-explained-and-compared.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Building a menu using List | SwiftUI by Example",
  "desc": "Building a menu using List",
  "link": "/hackingwithswift.com/swiftui/building-a-menu-using-list.html",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Basic form design | SwiftUI by Example",
  "desc": "Basic form design",
  "link": "/hackingwithswift.com/swiftui/basic-form-design.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Showing and hiding form rows | SwiftUI by Example",
  "desc": "Showing and hiding form rows",
  "link": "/hackingwithswift.com/swiftui/showing-and-hiding-form-rows.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

