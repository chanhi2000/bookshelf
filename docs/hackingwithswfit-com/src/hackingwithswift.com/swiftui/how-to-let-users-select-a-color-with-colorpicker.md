---
lang: ko-KR
title: How to let users select a color with ColorPicker
description: Article(s) > How to let users select a color with ColorPicker
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
      content: Article(s) > How to let users select a color with ColorPicker
    - property: og:description
      content: How to let users select a color with ColorPicker
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-let-users-select-a-color-with-colorpicker.html
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
  "title": "How to let users select a color with ColorPicker | SwiftUI by Example",
  "desc": "How to let users select a color with ColorPicker",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-let-users-select-a-color-with-colorpicker",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI has a native `ColorPicker` control that allows the user to select a color. To use it, first create a `Color` property that can be changed using `@State` or similar, then

```swift
struct ContentView: View {
    @State private var bgColor = Color.red

    var body: some View {
        VStack {
            ColorPicker("Set the background color", selection: $bgColor)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(bgColor)
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-let-users-select-a-color-with-colorpicker-1.zip)

![The words “Set the background color” and a rainbow colored ring, below which is a grid style color picker with an opacity slider.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-let-users-select-a-color-with-colorpicker-1~dark.png)

By default `ColorPicker` supports opacity in the color selection, but you can disable that with a slightly different initializer:

```swift
struct ContentView: View {
    @State private var bgColor = Color.red

    var body: some View {
        VStack {
            ColorPicker("Set the background color", selection: $bgColor, supportsOpacity: false)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(bgColor)
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-let-users-select-a-color-with-colorpicker-2.zip)

![The words “Set the background color” and a rainbow colored ring, below which is a grid style color picker without an opacity slider.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-let-users-select-a-color-with-colorpicker-2~dark.png)

::: details Similar solutions…

```component VPCard
{
  "title": "How to let users select pictures using PhotosPicker | SwiftUI by Example",
  "desc": "How to let users select pictures using PhotosPicker",
  "link": "/hackingwithswift.com/swiftui/how-to-let-users-select-pictures-using-photospicker.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to let users select text | SwiftUI by Example",
  "desc": "How to let users select text",
  "link": "/hackingwithswift.com/swiftui/how-to-let-users-select-text.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to let the user select multiple dates | SwiftUI by Example",
  "desc": "How to let the user select multiple dates",
  "link": "/hackingwithswift.com/swiftui/how-to-let-the-user-select-multiple-dates.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to let users import videos using PhotosPicker | SwiftUI by Example",
  "desc": "How to let users import videos using PhotosPicker",
  "link": "/hackingwithswift.com/swiftui/how-to-let-users-import-videos-using-photospicker.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to let users share content using the system share sheet | SwiftUI by Example",
  "desc": "How to let users share content using the system share sheet",
  "link": "/hackingwithswift.com/swiftui/how-to-let-users-share-content-using-the-system-share-sheet.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

