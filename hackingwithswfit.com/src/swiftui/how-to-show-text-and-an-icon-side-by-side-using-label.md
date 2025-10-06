---
lang: ko-KR
title: How to show text and an icon side by side using Label
description: Article(s) > How to show text and an icon side by side using Label
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
      content: Article(s) > How to show text and an icon side by side using Label
    - property: og:description
      content: How to show text and an icon side by side using Label
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label.html
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
  "title": "How to show text and an icon side by side using Label | SwiftUI by Example",
  "desc": "How to show text and an icon side by side using Label",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

**Updated in iOS 15**

SwiftUI has a dedicated view type for showing text and icons side by side, which will be particularly helpful for menus, lists, and more.

To use labels, you can either use SF Symbols like this:

```swift
Label("Your account", systemImage: "folder.circle")
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-1.zip)

![A folder symbol inside a circle beside the text “Your Account”.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-1~dark.png)

Or use your own images, like this:

```swift
Label("Welcome to the app", image: "star")
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-2.zip)

![A yellow star beside the text “Welcome to the app”.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-2~dark.png)

You can scale the text and icon in parallel using the `font()` modifier, like this:

```swift
Label("Your account", systemImage: "person.crop.circle")
    .font(.title)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-3.zip)

A circular person symbol beside the text “Your Account”.

You can control how the label is displayed by applying the `labelStyle()` modifier using `.titleOnly`, `.iconOnly`, and `.titleAndIcon`, like this:

```swift
VStack {
    Label("Text Only", systemImage: "heart")
        .font(.title)
        .labelStyle(.titleOnly)

    Label("Icon Only", systemImage: "star")
        .font(.title)
        .labelStyle(.iconOnly)

    Label("Both", systemImage: "paperplane")
        .font(.title)
        .labelStyle(.titleAndIcon)
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-4.zip)

![The words “Text Only”. The outline of a star. A paper airplane symbol beside the word “Both”.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-4~dark.png)

::: important

If you're using Xcode 12, you need to use `TitleOnlyLabelStyle()`, `IconOnlyLabelStyle()`, and `TitleAndIconLabelStyle()` instead. `TitleAndIconLabelStyle()` is only available from iOS 14.5.

:::

If you want, you can provide entirely custom views for the text and image, like this:

```swift
Label {
    Text("Paul Hudson")
        .foregroundStyle(.primary)
        .font(.largeTitle)
        .padding()
        .background(.gray.opacity(0.2))
        .clipShape(Capsule())
} icon: {
    RoundedRectangle(cornerRadius: 10)
        .fill(.blue)
        .frame(width: 64, height: 64)
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-5.zip)

![A blue rounded rectangle beside a grey capsule containing “Paul Hudson”.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label-5~dark.png)

::: details Similar solutions…

```component VPCard
{
  "title": "How to hide the label of a Picker, Stepper, Toggle, and more using labelsHidden() | SwiftUI by Example",
  "desc": "How to hide the label of a Picker, Stepper, Toggle, and more using labelsHidden()",
  "link": "/hackingwithswift.com/swiftui/how-to-hide-the-label-of-a-picker-stepper-toggle-and-more-using-labelshidden.md",
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
  "title": "How to force views to one side inside a stack using Spacer | SwiftUI by Example",
  "desc": "How to force views to one side inside a stack using Spacer",
  "link": "/hackingwithswift.com/swiftui/how-to-force-views-to-one-side-inside-a-stack-using-spacer.md",
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
  "title": "How to format text inside text views | SwiftUI by Example",
  "desc": "How to format text inside text views",
  "link": "/hackingwithswift.com/swiftui/how-to-format-text-inside-text-views.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

