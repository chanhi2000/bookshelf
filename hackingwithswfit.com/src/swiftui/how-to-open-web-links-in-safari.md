---
lang: ko-KR
title: How to open web links in Safari
description: Article(s) > How to open web links in Safari
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
      content: Article(s) > How to open web links in Safari
    - property: og:description
      content: How to open web links in Safari
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-open-web-links-in-safari.html
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
  "title": "How to open web links in Safari | SwiftUI by Example",
  "desc": "How to open web links in Safari",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-open-web-links-in-safari",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI gives us a dedicated `Link` view that looks like a button but opens a URL in Safari when pressed. It's easy enough to use - just give it a title for the button, plus a destination URL to show, like this:

```swift
Link("Learn SwiftUI", destination: URL(string: "https://hackingwithswift.com/quick-start/swiftui")!)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-open-web-links-in-safari-1.zip)

<VidStack src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-open-web-links-in-safari-1~dark.mp4" />

As it's just a text link, you can customize it with a font, color, and more:

```swift
Link("Visit Apple", destination: URL(string: "https://www.apple.com")!)
    .font(.title)
    .foregroundStyle(.red)
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-open-web-links-in-safari-2.zip)

![The words “Visit Apple” in red.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-open-web-links-in-safari-2~dark.png)

And if you'd rather create your own view rather than just use text, you can do that too:

```swift
Link(destination: URL(string: "https://www.apple.com")!) {
    Image(systemName: "link.circle.fill")
        .font(.largeTitle)
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-open-web-links-in-safari-3.zip)

![A link icon on a blue circle.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-open-web-links-in-safari-3~dark.png)

Alternatively, you can open a URL from code by using the `openURL` environment key, like this:

```swift
struct ContentView: View {
    @Environment(\.openURL) var openURL

    var body: some View {
        Button("Visit Apple") {
            openURL(URL(string: "https://www.apple.com")!)
        }
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-open-web-links-in-safari-4.zip)

![A “Visit Apple” link in blue.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-open-web-links-in-safari-4~dark.png)

::: details Similar solutions…

```component VPCard
{
  "title": "How to customize the way links are opened | SwiftUI by Example",
  "desc": "How to customize the way links are opened",
  "link": "/hackingwithswift.com/swiftui/how-to-customize-the-way-links-are-opened.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to open a new window | SwiftUI by Example",
  "desc": "How to open a new window",
  "link": "/hackingwithswift.com/swiftui/how-to-open-a-new-window.md",
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
  "title": "How to render Markdown content in text | SwiftUI by Example",
  "desc": "How to render Markdown content in text",
  "link": "/hackingwithswift.com/swiftui/how-to-render-markdown-content-in-text.md",
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

:::

