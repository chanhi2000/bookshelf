---
lang: ko-KR
title: "Creating a basic text editor"
description: "Article(s) > Creating a basic text editor"
category:
  - Swift
  - iOS
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - xcode
  - appstore
  - ios  
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Creating a basic text editor"
    - property: og:description
      content: "Creating a basic text editor"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/28/02-creating-a-basic-text-editor.html
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hacking with iOS - learn to code iPhone and iPad apps with free Swift tutorials",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/read/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Creating a basic text editor | Hacking with iOS",
  "desc": "Creating a basic text editor",
  "link": "https://hackingwithswift.com/read/28/2/creating-a-basic-text-editor",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/0lEWz4fBzoA" />

Open <VPIcon icon="iconfont icon-xcode"/>`Main.storyboard` in Interface Builder, and embed the default view controller inside a navigation controller. Now place a text view inside (*not* a text field!) so that it fills up most of the space: it should touch the left and right edges of our view, go up to the bottom of the navigation bar, then go down to the bottom of the safe area - that’s where IB will snap to when you drag near the virtual home indicator at the bottom of the view controller. We don’t need anything special for our Auto Layout constraints, so just go to Editor > Resolve Auto Layout Issues > Add Missing Constraints to place them automatically.

Delete the "Lorem ipsum" text in the text view, then use the assistant editor to make an outlet for it called `secret`. That's us done with the storyboard for now; switch back to the standard editor and open <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift`.

We need to add the same code we used in project 19 to make the text view adjust its content and scroll insets when the keyboard appears and disappears. This code is identical apart from the outlet is called `secret` now.

First, put this into `viewDidLoad()`:

```swift
let notificationCenter = NotificationCenter.default
notificationCenter.addObserver(self, selector: #selector(adjustForKeyboard), name: UIResponder.keyboardWillHideNotification, object: nil)
notificationCenter.addObserver(self, selector: #selector(adjustForKeyboard), name: UIResponder.keyboardWillChangeFrameNotification, object: nil)
```

As a reminder, that asks iOS to tell us when the keyboard changes or when it hides. As a double reminder: the hide is required because we do a little hack to make the hardware keyboard toggle work correctly - see project 19 if you don't remember why this is needed.

Here's the `adjustKeyboard()` method, which again is identical apart from the outlet name to that seen in project 19:

```swift
@objc func adjustForKeyboard(notification: Notification) {
    guard let keyboardValue = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else { return }

    let keyboardScreenEndFrame = keyboardValue.cgRectValue
    let keyboardViewEndFrame = view.convert(keyboardScreenEndFrame, from: view.window)

    if notification.name == UIResponder.keyboardWillHideNotification {
        secret.contentInset = .zero
    } else {
        secret.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: keyboardViewEndFrame.height - view.safeAreaInsets.bottom, right: 0)
    }

    secret.scrollIndicatorInsets = secret.contentInset

    let selectedRange = secret.selectedRange
    secret.scrollRangeToVisible(selectedRange)
}
```

None of that is new, so you're probably bored by now. Not to worry: we're going to fix up our storyboard in preparation for authentication, so re-open Main.storyboard.

Place a button over the text view, give it the title "Authenticate" and make it 44 points high. For constraints, give it a fixed height constraint, then make it align horizontally and vertically with its superview. Now use the assistant editor to create an action for it called “authenticateTapped”.

Before you leave Interface Builder, you need to do something we haven't done yet, which is to move views backwards and forwards relative to each other. When the user has authenticated, we need to show the text box while making sure the button is no longer visible, and the easiest way to do that is to place the button behind the text view so that when the text is visible it covers up the button.

To move the text view to the front, select the Authenticate button in the document outline then drag it *above* the text view. When you do this the button will disappear on the canvas, but that's OK - it's still there, and we can still use it.

The last thing to do is ensure the text view starts life hidden, so select it in Interface Builder, choose the attributes inspector, and check the Hidden box - it's near the bottom, not far below Tag. That's our layout complete!

