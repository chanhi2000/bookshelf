---
lang: ko-KR
title: How to make a scroll view move to a location using ScrollViewReader
description: Article(s) > How to make a scroll view move to a location using ScrollViewReader
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
      content: Article(s) > How to make a scroll view move to a location using ScrollViewReader
    - property: og:description
      content: How to make a scroll view move to a location using ScrollViewReader
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-make-a-scroll-view-move-to-a-location-using-scrollviewreader.html
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
  "title": "How to make a scroll view move to a location using ScrollViewReader | SwiftUI by Example",
  "desc": "How to make a scroll view move to a location using ScrollViewReader",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-make-a-scroll-view-move-to-a-location-using-scrollviewreader",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

If you want to programmatically make SwiftUI's `ScrollView` move to a specific location, you should embed a `ScrollViewReader` inside it. This provides a `scrollTo()` method that can move to any view inside the parent scrollview, just by providing its anchor.

For example, this creates 100 colored boxes in a vertical scroll view, and when you press the button it will scroll directly to the box with ID 8:

```swift
struct ContentView: View {
    let colors: [Color] = [.red, .green, .blue]

    var body: some View {
        ScrollViewReader { value in        
            ScrollView {
                Button("Jump to #8") {
                    value.scrollTo(8)
                }
                .padding()

                ForEach(0..<100) { i in
                    Text("Example \(i)")
                        .font(.title)
                        .frame(width: 200, height: 200)
                        .background(colors[i % colors.count])
                        .id(i)
                }
            }
        }
        .frame(height: 350)
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-make-a-scroll-view-move-to-a-location-using-scrollviewreader-1.zip)

For more control over your scroll, you can specify a second parameter called `anchor`, to control where your target view should be positioned after the scroll has completed.

For example, this will scroll to the same view as before, except this time place that view at the top:

```swift
struct ContentView: View {
    let colors: [Color] = [.red, .green, .blue]

    var body: some View {
        ScrollViewReader { value in        
            ScrollView {
                Button("Jump to #8") {
                    value.scrollTo(8, anchor: .top)
                }
                .padding()

                ForEach(0..<100) { i in
                    Text("Example \(i)")
                        .font(.title)
                        .frame(width: 200, height: 200)
                        .background(colors[i % colors.count])
                        .id(i)
                }
            }
        }
        .frame(height: 350)
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-make-a-scroll-view-move-to-a-location-using-scrollviewreader-2.zip)

<VidStack src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-make-a-scroll-view-move-to-a-location-using-scrollviewreader-2~dark.mp4 "/>

If you call `scrollTo()` inside `withAnimation()` the movement will be animated.

::: tip

`scrollTo()` works great with lists too.

:::

::: details Similar solutions…

```component VPCard
{
  "title": "How to scroll to a specific row in a list | SwiftUI by Example",
  "desc": "How to scroll to a specific row in a list",
  "link": "/hackingwithswift.com/swiftui/how-to-scroll-to-a-specific-row-in-a-list.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to make views scroll with a custom transition | SwiftUI by Example",
  "desc": "How to make views scroll with a custom transition",
  "link": "/hackingwithswift.com/swiftui/how-to-make-views-scroll-with-a-custom-transition.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to detect the location of a tap inside a view | SwiftUI by Example",
  "desc": "How to detect the location of a tap inside a view",
  "link": "/hackingwithswift.com/swiftui/how-to-detect-the-location-of-a-tap-inside-a-view.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to dynamically adjust the appearance of a view based on its size and location | SwiftUI by Example",
  "desc": "How to dynamically adjust the appearance of a view based on its size and location",
  "link": "/hackingwithswift.com/swiftui/how-to-dynamically-adjust-the-appearance-of-a-view-based-on-its-size-and-location.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to indent the content or scroll indicators in a ScrollView | SwiftUI by Example",
  "desc": "How to indent the content or scroll indicators in a ScrollView",
  "link": "/hackingwithswift.com/swiftui/how-to-indent-the-content-or-scroll-indicators-in-a-scrollview.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

