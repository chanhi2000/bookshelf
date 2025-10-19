---
lang: ko-KR
title: How to rotate a view
description: Article(s) > How to rotate a view
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
      content: Article(s) > How to rotate a view
    - property: og:description
      content: How to rotate a view
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-rotate-a-view.html
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
  "title": "How to rotate a view | SwiftUI by Example",
  "desc": "How to rotate a view",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-rotate-a-view",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

SwiftUI’s `rotationEffect()` modifier lets us rotate views freely, using either degrees or radians.

For example, if you wanted to rotate some text by -90 degrees so that it reads upwards, you would use this:

```swift
Text("Up we go")
    .rotationEffect(.degrees(-90))
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-rotate-a-view-1.zip)

![The text “Up we go” rotated 90 degrees counter-clockwise.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-rotate-a-view-1~dark@2x.png)

If you prefer using radians, just pass in `.radians()` as your parameter, like this:

```swift
Text("Up we go")
    .rotationEffect(.radians(.pi))
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-rotate-a-view-2.zip)

![The text “Up we go” upside down.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-rotate-a-view-2~dark@2x.png)

View rotation is so fast that it’s effectively free, so you could even make it interactive using a slider if you wanted:

```swift
struct ContentView: View {
    @State private var rotation = 0.0

    var body: some View {
        VStack {
            Slider(value: $rotation, in: 0...360)

            Text("Up we go")
                .rotationEffect(.degrees(rotation))
        }
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-rotate-a-view-3.zip)

<VidStack src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-rotate-a-view-3~dark.mp4" />

By default views rotate around their center, but if you want to pin the rotation from a particular point you can add an extra parameter for that. For example if you wanted to make the slider above pivoting the rotation around the view’s top-left corner you’d write this:

```swift
struct ContentView: View {
    @State private var rotation = 0.0

    var body: some View {
        VStack {
            Slider(value: $rotation, in: 0...360)

            Text("Up we go")
                .rotationEffect(.degrees(rotation), anchor: .topLeading)
        }
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-rotate-a-view-4.zip)

<VidStack src="https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-rotate-a-view-4~dark.mp4" />

::: details Similar solutions…

```component VPCard
{
  "title": "How to rotate a view in 3D | SwiftUI by Example",
  "desc": "How to rotate a view in 3D",
  "link": "/hackingwithswift.com/swiftui/how-to-rotate-a-view-in-3d.md",
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
  "title": "How to convert a SwiftUI view to an image | SwiftUI by Example",
  "desc": "How to convert a SwiftUI view to an image",
  "link": "/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to make a view dismiss itself | SwiftUI by Example",
  "desc": "How to make a view dismiss itself",
  "link": "/hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to create and compose custom views | SwiftUI by Example",
  "desc": "How to create and compose custom views",
  "link": "/hackingwithswift.com/swiftui/how-to-create-and-compose-custom-views.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

