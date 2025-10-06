---
lang: ko-KR
title: Adding swipe to delete and EditButton
description: Article(s) > Adding swipe to delete and EditButton
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
      content: Article(s) > Adding swipe to delete and EditButton
    - property: og:description
      content: Adding swipe to delete and EditButton
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/adding-swipe-to-delete-and-editbutton.html
date: 2024-04-30
isOriginal: false
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
  "title": "Adding swipe to delete and EditButton | SwiftUI by Example",
  "desc": "Adding swipe to delete and EditButton",
  "link": "https://hackingwithswift.com/quick-start/swiftui/adding-swipe-to-delete-and-editbutton",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 16

Before we're done with this app, let's make a handful of smaller changes that help polish up what we have.

First, what happens if the user looks at their order and decides against one of the items? Right now we can _add_ items but can't _delete_ them, but this isn't too hard to remedy.

Just like UIKit, SwiftUI's `List` view can be manipulated using `IndexSet` - a collection of locations in its data. So, we can add a method to `OrderView` that accepts an `IndexSet` and uses it to delete those items from our order array:

```swift
func deleteItems(at offsets: IndexSet) {
    order.items.remove(atOffsets: offsets)
}
```

To connect that to SwiftUI, we need to add an `onDelete()` modifier to the `ForEach` that shows the menu items in the order. This accepts a closure that will be executed when deletion happens, and that closure must accept an `IndexSet` and delete those items - basically exactly what our `deleteItems(at:)` method already does.

Modify the first section in the `OrderView` form to this:

```swift
Section {
    ForEach(order.items) { item in
        HStack {
            Text(item.name)
            Spacer()
            Text("$\(item.price)")
        }
    }
    .onDelete(perform: deleteItems)
}
```

If the user wants to remove several items at a time, that's also easy to do in SwiftUI. We just added the method to handle deletion, so now we can add an edit button to the navigation bar and let SwiftUI handle the rest. No, really!

Add this after the `navigationTitle()` modifier in `OrderView`:

```swift
.toolbar {
    EditButton()
}
```

SwiftUI already knows that an edit button should toggle the table between editing and non-editing mode, while also changing title between Edit and Done - another example of us getting the system default behavior for free.

Let's move on to a second upgrade: why do we let users press the Place Order button if they haven't added anything to their order? This doesn't make sense, and we shouldn't really allow it. So, let's _not_ allow it!

Here's how that part of `OrderView` looks right now:

```swift
Section {
    NavigationLink("Place Order") {
        CheckoutView()
    }
}
```

What we want is to disable that when there are no items in our order. Well, thanks to the power of SwiftUI we can do exactly that with the `disabled()` modifier, like this:

```swift
Section {
    NavigationLink("Place Order") {
        CheckoutView()
    }
}
.disabled(order.items.isEmpty)
```

If you run the app now you'll find that you can add an item, go to the order screen, and _delete_ that item, and Place Order will automatically become disabled as your cart becomes empty.

Much better!

::: details Further Reading…

```component VPCard
{
  "title": "How to let users delete rows from a list | SwiftUI by Example",
  "desc": "How to let users delete rows from a list",
  "link": "/hackingwithswift.com/swiftui/how-to-let-users-delete-rows-from-a-list.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to enable editing on a list using EditButton | SwiftUI by Example",
  "desc": "How to enable editing on a list using EditButton",
  "link": "/hackingwithswift.com/swiftui/how-to-enable-editing-on-a-list-using-editbutton.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Enabling and disabling elements in forms | SwiftUI by Example",
  "desc": "Enabling and disabling elements in forms",
  "link": "/hackingwithswift.com/swiftui/enabling-and-disabling-elements-in-forms.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

::: details Similar solutions…

```component VPCard
{
  "title": "How to enable editing on a list using EditButton | SwiftUI by Example",
  "desc": "How to enable editing on a list using EditButton",
  "link": "/hackingwithswift.com/swiftui/how-to-enable-editing-on-a-list-using-editbutton.md",
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
  "title": "SwiftUI tips and tricks | SwiftUI by Example",
  "desc": "SwiftUI tips and tricks",
  "link": "/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to let users delete rows from a list | SwiftUI by Example",
  "desc": "How to let users delete rows from a list",
  "link": "/hackingwithswift.com/swiftui/how-to-let-users-delete-rows-from-a-list.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to delete Core Data objects from SwiftUI views | SwiftUI by Example",
  "desc": "How to delete Core Data objects from SwiftUI views",
  "link": "/hackingwithswift.com/swiftui/how-to-delete-core-data-objects-from-swiftui-views.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::

