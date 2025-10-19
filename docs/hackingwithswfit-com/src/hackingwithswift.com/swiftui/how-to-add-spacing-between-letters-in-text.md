---
lang: ko-KR
title: How to add spacing between letters in text
description: Article(s) > How to add spacing between letters in text
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
      content: Article(s) > How to add spacing between letters in text
    - property: og:description
      content: How to add spacing between letters in text
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-add-spacing-between-letters-in-text.html
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
  "title": "How to add spacing between letters in text | SwiftUI by Example",
  "desc": "How to add spacing between letters in text",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-add-spacing-between-letters-in-text",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI gives us two modifiers to control the spacing of characters inside a text view, allowing us to make the letters spaced more tightly or further apart depending on what you want.

The two modifiers are `tracking()` and `kerning()`: both add spacing between letters, but tracking will pull apart ligatures whereas kerning will not, and kerning will leave some trailing whitespace whereas tracking will not.

So, this adds 20 points of tracking to “Hello World”, which will space the letters out a fair amount:

```swift
Text("Hello World")
    .tracking(20)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-add-spacing-between-letters-in-text-1.zip)

![The text “Hello World” written with widely spaces between letters.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-add-spacing-between-letters-in-text-1~dark.png)

If you want to really see how kerning and tracking are different, try this:

```swift
struct ContentView: View {
    @State private var amount = 50.0

    var body: some View {
        VStack {
            Text("ffi")
                .font(.custom("AmericanTypewriter", size: 72))
                .kerning(amount)
            Text("ffi")
                .font(.custom("AmericanTypewriter", size: 72))
                .tracking(amount)

            Slider(value: $amount, in: 0...100) {
                Text("Adjust the amount of spacing")
            }
        }
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-add-spacing-between-letters-in-text-2.zip)

![The text “ffi” with space between the two f's, and the text “ffi” with space between all three letters](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-add-spacing-between-letters-in-text-2~dark.png)

That uses the text string “ffi” in American Typewriter, which has a ligature making the letter combination look better. Because tracking pulls ligatures apart and kerning does not, as you adjust the slider upwards the first text will look more like “f fi” and the second will look more like “f f i”.

::: details Similar solutions…

```component VPCard
{
  "title": "How to style text views with fonts, colors, line spacing, and more | SwiftUI by Example",
  "desc": "How to style text views with fonts, colors, line spacing, and more",
  "link": "/hackingwithswift.com/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to customize stack layouts with alignment and spacing | SwiftUI by Example",
  "desc": "How to customize stack layouts with alignment and spacing",
  "link": "/hackingwithswift.com/swiftui/how-to-customize-stack-layouts-with-alignment-and-spacing.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to control spacing around individual views using padding | SwiftUI by Example",
  "desc": "How to control spacing around individual views using padding",
  "link": "/hackingwithswift.com/swiftui/how-to-control-spacing-around-individual-views-using-padding.md",
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
  "title": "How to automatically switch between HStack and VStack based on size class | SwiftUI by Example",
  "desc": "How to automatically switch between HStack and VStack based on size class",
  "link": "/hackingwithswift.com/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

