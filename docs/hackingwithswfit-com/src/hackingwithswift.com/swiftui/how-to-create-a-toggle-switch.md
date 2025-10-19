---
lang: ko-KR
title: How to create a toggle switch
description: Article(s) > How to create a toggle switch
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
      content: Article(s) > How to create a toggle switch
    - property: og:description
      content: How to create a toggle switch
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/how-to-create-a-toggle-switch.html
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
  "title": "How to create a toggle switch | SwiftUI by Example",
  "desc": "How to create a toggle switch",
  "link": "https://hackingwithswift.com/quick-start/swiftui/how-to-create-a-toggle-switch",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

**Updated in iOS 16**

SwiftUI's toggle lets users move between true and false states, just like `UISwitch` in UIKit.

For example, we could create a toggle that either shows a message or not depending on whether the toggle is enabled or not, but of course we *don't* want to have to track the state of the toggle by hand - we want SwiftUI to do that for us.

Instead we should define a `@State` Boolean property that will be used to store the current value of our toggle. We can then use that to show or hide other views as needed.

For example:

```swift
struct ContentView: View {
    @State private var showGreeting = true

    var body: some View {
        VStack {
            Toggle("Show welcome message", isOn: $showGreeting)

            if showGreeting {
                Text("Hello World!")
            }
        }
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-a-toggle-switch-1.zip)

![The words “Show welcome message” beside a green toggle which is turned on. Below is the text “Hello World!”.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-toggle-switch-1~dark.png)

I've made that code so that a text view is returned only when `showGreeting` is true, which means the `VStack` will decrease in size when `showGreeting` is false - it doesn't have a second view in its stack.

![The words “Show welcome message” beside a green toggle which is turned off. Below is nothing.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-toggle-switch-2~dark.png)

If you want, you can customize the color used to create your toggle switch by using the `toggleStyle()` modifier. This is helpful because the `Toggle` view doesn't work with `accentColor()`, so this is the only way to recolor it.

For example, this creates a red toggle:

```swift
struct ContentView: View {
    @State private var showGreeting = true

    var body: some View {
        VStack {
            Toggle("Show welcome message", isOn: $showGreeting)
                .toggleStyle(SwitchToggleStyle(tint: .red))

            if showGreeting {
                Text("Hello World!")
            }
        }
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-a-toggle-switch-3.zip)

![The words “Show welcome message” beside a red toggle which is turned on. Below is the text “Hello World!”.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-toggle-switch-3~dark.png)

If you're targeting iOS 15 or later, you can configure your switch to appear like a button by specifying `.toggleStyle(.button)`. In this mode the button flips its tint color when its state is on:

```swift
struct ContentView: View {
    @State private var isOn = false

    var body: some View {
        Toggle("Filter", isOn: $isOn)
            .toggleStyle(.button)
            .tint(.mint)
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-a-toggle-switch-1.zip)

![A mint green rounded rectangle with the text “Filter”.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-toggle-switch-4~dark.png)

![A mint green text label reading “Filter”.](https://hackingwithswift.com/img/books/quick-start/swiftui/how-to-create-a-toggle-switch-5~dark.png)

From iOS 16 onwards, it's also possible to bind a `Toggle` to an array of Booleans, which is helpful for times when you want to enable or disable several values all at once. For example, we could write some code to let the user subscribe to individual newsletters, or have one toggle to switch them all:

```swift
struct EmailList: Identifiable {
    var id: String
    var isSubscribed = false
}

struct ContentView: View {
    @State var lists = [
        EmailList(id: "Monthly Updates", isSubscribed: true),
        EmailList(id: "News Flashes", isSubscribed: true),
        EmailList(id: "Special Offers", isSubscribed: true)
    ]

    var body: some View {
        Form {
            Section {
                ForEach($lists) { $list in
                    Toggle(list.id, isOn: $list.isSubscribed)
                }
            }

            Section {
                Toggle("Subscribe to all", sources: $lists, isOn: \.isSubscribed)
            }
        }
    }
}
```

> [<VPIcon icon="fas fa-file-zipper"/>Download this as an Xcode project](https://hackingwithswift.com/files/projects/swiftui/how-to-create-a-toggle-switch-5.zip)

::: details Similar solutions…

```component VPCard
{
  "title": "Customizing Toggle with ToggleStyle | SwiftUI by Example",
  "desc": "Customizing Toggle with ToggleStyle",
  "link": "/hackingwithswift.com/swiftui/customizing-toggle-with-togglestyle.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

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
  "title": "How to automatically switch between HStack and VStack based on size class | SwiftUI by Example",
  "desc": "How to automatically switch between HStack and VStack based on size class",
  "link": "/hackingwithswift.com/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class.md",
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
  "title": "Two-way bindings in SwiftUI | SwiftUI by Example",
  "desc": "Two-way bindings in SwiftUI",
  "link": "/hackingwithswift.com/swiftui/two-way-bindings-in-swiftui.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

