---
lang: ko-KR
title: Migrating from UIKit to SwiftUI
description: Article(s) > Migrating from UIKit to SwiftUI
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
      content: Article(s) > Migrating from UIKit to SwiftUI
    - property: og:description
      content: Migrating from UIKit to SwiftUI
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swiftui/migrating-from-uikit-to-swiftui.html
date: 2023-06-17
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
  "title": "Migrating from UIKit to SwiftUI | SwiftUI by Example",
  "desc": "Migrating from UIKit to SwiftUI",
  "link": "https://hackingwithswift.com/quick-start/swiftui/migrating-from-uikit-to-swiftui", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Updated for Xcode 15

If you've used UIKit before, many of the classes you know and love map pretty much directly to their SwiftUI equivalents just by dropping the `UI` prefix. That doesn't mean they are the same thing underneath, just that they have the same or similar functionality.

Here's a list to get you started, with UIKit class names followed by SwiftUI names:

- `UITableView`: `List`
- `UICollectionView`: `LazyVGrid` and `LazyHGrid`
- `UIScrollView`: `ScrollView`
- `UILabel`: `Text`
- `UITextField`: `TextField`
- `UITextField` with `isSecureTextEntry` set to true: `SecureField`
- `UITextView`: `TextEditor` (plain strings only)
- `UISwitch`: `Toggle`
- `UISlider`: `Slider`
- `UIButton`: `Button`
- `UINavigationController`: `NavigationStack` or `NavigationSplitView`
- `UIAlertController` with style `.alert`: `.alert()`
- `UIAlertController` with style `.actionSheet`: `.confirmationDialog()`
- `UIStackView` with horizontal axis: `HStack`
- `UIStackView` with vertical axis: `VStack`
- `UIImageView`: `Image`
- `UISegmentedControl`: `Picker`
- `UIStepper`: `Stepper`
- `UIDatePicker`: `DatePicker`
- `UIProgressView`: `ProgressView` with a value
- `UIActivityIndicatorView`: `ProgressView` without a value
- `MKMapView`: `Map`
- `NSAttributedString`: `AttributedString`.

There are many other components that are exclusive to SwiftUI, such as a stack view that lets us build things by depth rather than horizontally or vertically.

::: details Similar solutions…

```component VPCard
{
  "title": "Answering the big question: should you learn SwiftUI, UIKit, or both? | SwiftUI by Example",
  "desc": "Answering the big question: should you learn SwiftUI, UIKit, or both?",
  "link": "/hackingwithswift.com/swiftui/answering-the-big-question-should-you-learn-swiftui-uikit-or-both.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Frequently asked questions about SwiftUI | SwiftUI by Example",
  "desc": "Frequently asked questions about SwiftUI",
  "link": "/hackingwithswift.com/swiftui/frequently-asked-questions-about-swiftui.md",
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
  "title": "How to fix “Ambiguous reference to member 'buildBlock()'” | SwiftUI by Example",
  "desc": "How to fix “Ambiguous reference to member 'buildBlock()'”",
  "link": "/hackingwithswift.com/swiftui/how-to-fix-ambiguous-reference-to-member-buildblock.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "How to add Metal shaders to SwiftUI views using layer effects | SwiftUI by Example",
  "desc": "How to add Metal shaders to SwiftUI views using layer effects",
  "link": "/hackingwithswift.com/swiftui/how-to-add-metal-shaders-to-swiftui-views-using-layer-effects.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

:::


