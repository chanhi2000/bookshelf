---
lang: ko-KR
title: "Fixing the keyboard: NotificationCenter"
description: "Article(s) > Fixing the keyboard: NotificationCenter"
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
      content: "Article(s) > Fixing the keyboard: NotificationCenter"
    - property: og:description
      content: "Fixing the keyboard: NotificationCenter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/19/07-fixing-the-keyboard-notificationcenter.html
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
  "title": "Fixing the keyboard: NotificationCenter | Hacking with iOS",
  "desc": "Fixing the keyboard: NotificationCenter",
  "link": "https://hackingwithswift.com/read/19/7/fixing-the-keyboard-notificationcenter",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/crjzwQ5yCAE" />

Before we're done, there's a bug in our extension, and it's a bad one - or at least it's bad once you spot it. You see, when you tap to edit a text view, the iOS keyboard automatically appears so that user can start typing. But if you try typing lots, you'll notice that you can actually type underneath the keyboard because the text view hasn't adjusted its size because the keyboard appeared.

If you don't see a keyboard when you tap to edit, it probably means you have the Connect Hardware Keyboard setting turned on. Press <kbd>Shift</kbd>+<kbd>Cmd</kbd>+<kbd>K</kbd> to disable the hardware keyboard and use the on-screen one.

Having our view adjust to the presence of a keyboard is tricky, because there are a number of situations you need to cope with. For example, various keyboards are different heights, the user can rotate their device at will, they can connect a hardware keyboard when they need to, and there's even the QuickType bar that can be shown or hidden on demand.

In all the years I've done iOS development, I've seen at least a dozen ways of coping with keyboards, and few of them are easy. Even Apple's example solution requires fiddling around with constraints, which isn't ideal. I've tried to put together a solution that copes with all possibilities and also requires as little code as possible. If you manage to find something even simpler, do let me know!

We can ask to be told when the keyboard state changes by using a new class called `NotificationCenter`. Behind the scenes, iOS is constantly sending out notifications when things happen - keyboard changing, application moving to the background, as well as any custom events that applications post. We can add ourselves as an observer for certain notifications and a method we name will be called when the notification occurs, and will even be passed any useful information.

When working with the keyboard, the notifications we care about are `keyboardWillHideNotification` and `keyboardWillChangeFrameNotification`. The first will be sent when the keyboard has finished hiding, and the second will be shown when any keyboard state change happens - including showing and hiding, but also orientation, QuickType and more.

It might sound like we don't need `keyboardWillHideNotification` if we have `keyboardWillChangeFrameNotification`, but in my testing just using `keyboardWillChangeFrameNotification` isn't enough to catch a hardware keyboard being connected. Now, that's an extremely rare case, but we might as well be sure!

To register ourselves as an observer for a notification, we get a reference to the default notification center. We then use the `addObserver()` method, which takes four parameters: the object that should receive notifications (it's `self`), the method that should be called, the notification we want to receive, and the object we want to watch. We're going to pass `nil` to the last parameter, meaning "we don't care who sends the notification."

So, add this code to `viewDidLoad()`:

```swift
let notificationCenter = NotificationCenter.default
notificationCenter.addObserver(self, selector: #selector(adjustForKeyboard), name: UIResponder.keyboardWillHideNotification, object: nil)
notificationCenter.addObserver(self, selector: #selector(adjustForKeyboard), name: UIResponder.keyboardWillChangeFrameNotification, object: nil)
```

The `adjustForKeyboard()` method is complicated, but that's because it has quite a bit of work to do. First, it will receive a parameter that is of type `Notification`. This will include the name of the notification as well as a `Dictionary` containing notification-specific information called `userInfo`.

When working with keyboards, the dictionary will contain a key called `UIResponder.keyboardFrameEndUserInfoKey` telling us the frame of the keyboard after it has finished animating. This will be of type `NSValue`, which in turn is of type `CGRect`. The `CGRect` struct holds both a `CGPoint` and a `CGSize`, so it can be used to describe a rectangle.

One of the quirks of Objective-C was that arrays and dictionaries couldn't contain structures like `CGRect`, so Apple had a special class called `NSValue` that acted as a wrapper around structures so they could be put into dictionaries and arrays. That's what's happening here: we're getting an `NSValue` object, but we know it contains a `CGRect` inside so we use its `cgRectValue` property to read that value.

Once we finally pull out the correct frame of the keyboard, we need to convert the rectangle to our view's co-ordinates. This is because rotation isn't factored into the frame, so if the user is in landscape we'll have the width and height flipped - using the `convert()` method will fix that.

The next thing we need to do in the `adjustForKeyboard()` method is to adjust the `contentInset` and `scrollIndicatorInsets` of our text view. These two essentially indent the edges of our text view so that it appears to occupy less space even though its constraints are still edge to edge in the view.

Finally, we're going to make the text view scroll so that the text entry cursor is visible. If the text view has shrunk this will now be off screen, so scrolling to find it again keeps the user experience intact.

It's not a lot of code, but it *is* complicated - par for the course on this project, it seems. Anyway, here's the method:

```swift
@objc func adjustForKeyboard(notification: Notification) {
    guard let keyboardValue = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else { return }

    let keyboardScreenEndFrame = keyboardValue.cgRectValue
    let keyboardViewEndFrame = view.convert(keyboardScreenEndFrame, from: view.window)

    if notification.name == UIResponder.keyboardWillHideNotification {
        script.contentInset = .zero
    } else {
        script.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: keyboardViewEndFrame.height - view.safeAreaInsets.bottom, right: 0)
    }

    script.scrollIndicatorInsets = script.contentInset

    let selectedRange = script.selectedRange
    script.scrollRangeToVisible(selectedRange)
}
```

As you can see, setting the inset of a text view is done using the `UIEdgeInsets` struct, which needs insets for all four edges. I'm using the text view's content inset for its `scrollIndicatorInsets` to save time.

Note there's a check in there for `UIKeyboardWillHide`, and that's the workaround for hardware keyboards being connected by explicitly setting the insets to be zero.

