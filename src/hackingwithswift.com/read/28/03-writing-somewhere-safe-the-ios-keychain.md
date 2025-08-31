---
lang: ko-KR
title: "Writing somewhere safe: the iOS keychain"
description: "Article(s) > Writing somewhere safe: the iOS keychain"
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
      content: "Article(s) > Writing somewhere safe: the iOS keychain"
    - property: og:description
      content: "Writing somewhere safe: the iOS keychain"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/28/03-writing-somewhere-safe-the-ios-keychain.html
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
  "title": "Writing somewhere safe: the iOS keychain | Hacking with iOS",
  "desc": "Writing somewhere safe: the iOS keychain",
  "link": "https://hackingwithswift.com/read/28/3/writing-somewhere-safe-the-ios-keychain",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/h9RVeeUVhf8" />

When the app first runs, users should see a totally innocuous screen, with nothing secret visible. But we also don't want secret information to be visible when the user leaves the app for a moment then comes back, or if they double-tap the home button to multitask - doing so might mean that the app is left unlocked, which is the last thing we want.

To make this work, let's start by giving the view controller a totally innocuous title that absolutely won't make anyone wonder what's going on. Put this into `viewDidLoad()`:

```swift
title = "Nothing to see here"
```

Next we're going to create two new methods: `unlockSecretMessage()` to load the message into the text view, and `saveSecretMessage()`. But before we do that, I want to introduce you to a helpful class called `KeychainWrapper`, which we'll be using to read and write keychain values.

This class was not made by Apple; instead, it's open source software released under the MIT license, which means we can use it in our own projects as long as the copyright message remains intact. This class is needed because working with the keychain is *complicated* - far harder than anything we have done so far. So instead of using it directly, we'll be using this wrapper class that makes the keychain work like `UserDefaults`.

If you haven't already downloaded this project's files from [GitHub (<FontIcon icon="iconfont icon-github"/>`twostraws/HackingWithSwift`)](https://github.com/twostraws/HackingWithSwift), please do so now. In there you'll find the files <FontIcon icon="fa-brands fa-swift"/>`KeychainWrapper.swift` and <FontIcon icon="fa-brands fa-swift"/>`KeychainItemAccessibility.swift`; please copy them into your Xcode project to make the class available.

The first of our two new methods, `unlockSecretMessage()`, needs to show the text view, then load the keychain's text into it. Loading strings from the keychain using `KeychainWrapper` is as simple as using its `string(forKey:)` method, but the result is optional so you should unwrap it once you know there's a value there.

Here it is:

```swift
func unlockSecretMessage() {
    secret.isHidden = false
    title = "Secret stuff!"

    if let text = KeychainWrapper.standard.string(forKey: "SecretMessage") {
        secret.text = text
    }
}
```

If you prefer, you can use nil coalescing to provide the default value of an empty string, like this:

```swift
func unlockSecretMessage() {
    secret.isHidden = false
    title = "Secret stuff!"

    secret.text = KeychainWrapper.standard.string(forKey: "SecretMessage") ?? ""
}
```

Use whichever you prefer!

The second of our two new methods, `saveSecretMessage()`, needs to write the text view's text to the keychain, then make it hidden. This is done using the `set()` method of `KeychainWrapper`, so it's just as easy as reading. Note that we should only execute this code if the text view is visible, otherwise if a save happens before the app is unlocked then it will overwrite the saved text!

Here's the code:

```swift
@objc func saveSecretMessage() {
    guard secret.isHidden == false else { return }

    KeychainWrapper.standard.set(secret.text, forKey: "SecretMessage")
    secret.resignFirstResponder()
    secret.isHidden = true
    title = "Nothing to see here"
}
```

I slipped a new method in there: `resignFirstResponder()`. This is used to tell a view that has input focus that it should give up that focus. Or, in Plain English, to tell our text view that we're finished editing it, so the keyboard can be hidden. This is important because having a keyboard present might arouse suspicion - as if our rather obvious navigation bar title hadn't done enough already…

Now, there are still two questions remaining: how should users trigger a save when they are ready, and how do we ensure that as soon as the user starts to leave the app we make their data safe? For the first problem, consider this: how often do you see a save button in iOS? Hardly ever, I expect!

It turns out that one answer solves both problems: if we automatically save when the user leaves the app then the user need never worry about saving because it's done for them, and our save method above automatically hides the text when it's called so the app becomes safe as soon as any action is taken to leave it.

We're already using `NotificationCenter` to watch for the keyboard appearing and disappearing, and we can watch for another notification that will tell us when the application will stop being active - i.e., when our app has been backgrounded or the user has switched to multitasking mode. This notification is called `UIApplication.willResignActiveNotification`, and you should make us an observer for it in `viewDidLoad()` like this:

```swift
notificationCenter.addObserver(self, selector: #selector(saveSecretMessage), name: UIApplication.willResignActiveNotification, object: nil)
```

That calls our `saveSecretMessage()` directly when the notification comes in, which means the app automatically saves any text and hides it when the app is moving to a background state.

The last thing to do before the app is actually useful is to make tapping the button call `unlockSecretMessage()`, like this:

```swift
@IBAction func authenticateTapped(_ sender: Any) {
    unlockSecretMessage()
}
```

It's not actually secure at this point (other than saving its data in the iOS keychain!), but by saving and loading its text it is at least useful.

