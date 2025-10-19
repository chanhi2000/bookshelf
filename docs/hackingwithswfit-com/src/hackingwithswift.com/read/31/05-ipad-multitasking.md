---
lang: ko-KR
title: "iPad multitasking"
description: "Article(s) > iPad multitasking"
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
      content: "Article(s) > iPad multitasking"
    - property: og:description
      content: "iPad multitasking"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/31/05-ipad-multitasking.html
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
  "title": "iPad multitasking | Hacking with iOS",
  "desc": "iPad multitasking",
  "link": "https://hackingwithswift.com/read/31/5/ipad-multitasking",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Although Multitasking is fairly recent in iOS, it’s already seen widespread adoption. This is partly because it’s so easy to do, but partly because users are asking for it so much. 

You'll be pleased to know that supporting multitasking is easy. In fact, it's so easy that our current app *already supports it*. Don't believe me? Try it out now: launch your app, rotate the simulator to landscape (Cmd + left or right cursor key), then drag from the right edge of the screen.

The first time you do this, you'll see a list of various apps to choose from. Please choose Calendar for now. When you do this, iOS will activate Slide Over, which means your app still owns the full screen, but it's dimmed as the Calendar app has focus in the right part of the screen. On the left edge of Calendar you'll see a thin white line, which is the divider - drag that a little to the left and you'll see the whole interface change as iOS switches from Slide Over to Split View.

Now, the reason I asked you to change the simulator to landscape mode is because Split View actually has two snap points. The first, which you probably triggered this time, has your original app taking up about 2/3rds of the screen on the left and Calendar taking up the remainder on the right. The second, which you can get to by dragging the divider into the center of the screen, has both apps taking up half the screen each. If you're in portrait orientation you have only one mode, which is about 60/40.

So, our app already supports multitasking pretty well, although we'll make it better in a moment. First, though: what if you're upgrading existing apps? Well, you might not have such an easy ride, but if your code is modern you're probably still OK. To make multitasking work, you need to:

1. Have a launch XIB. This is the same thing that enables iPhone 6 support with iOS 8, and has been created for new projects ever since iOS 8 was released, so you probably already have one. If not, add a new file, choose User Interface, then Launch Screen. Then, in your plist, add a key for "Launch screen interface file base name" and point it to the name of your launch XIB, without the ".xib" extension. For example, if your launch screen is called LaunchScreen.xib, give this key the value of "LaunchScreen".
2. Make sure your app is configured to support all orientations. This may already be configured this way, but if not make sure you choose all orientations now. As you might imagine, selectively choosing only some orientations would cause havoc with multitasking!
3. Use Auto Layout everywhere. If your app pre-dates Auto Layout or if you found it intimidating at first, you might still be struggling along with autoresizing masks. Now is the time to change: the various multitasking sizes make Auto Layout a no-brainer.
4. Use adaptive UI wherever needed. Adaptive layout is Apple's term for technologies like Size Classes and Dynamic Type, the former of which is a huge advantage when working with multitasking. Size Classes let you make your interface adjust to two major screen sizes, compact and regular, which previously were great for working with iPhone and iPad, but are now also used for iPad multitasking.

Even though this particular project works with multitasking by default, it doesn't have any adaptive user interface built in. As a result, if we use multitasking the *other* way - i.e., if it's our app that is the one occupying 1/3rd of the screen while some other app has the remainder - then it looks terrible: our vertically stacked web views end up being so thin that they are unusable.

The solution is simple: we're going to tell the stack view to arrange its web views horizontally when we have lots of space, and vertically when we don't. This is done using the `traitCollectionDidChange()` method, which gets called automatically when our app's size class has changed. We can then query which size class we now have, and adapt our user interface.

There is one complication, and that's understanding size classes. There are two axes for size classes, namely horizontal and vertical, and each of them has two sizes, Compact and Regular. No matter what orientation or multitasking setup, the vertical size class is always regular on iPad. For the other possibilities, here are the key rules:


- An iPad app running by itself in portrait or landscape has a regular horizontal size classes.
- In landscape where the apps are split 50/50, both are running in a compact horizontal size class.
- In landscape where the apps are split 70/30, the app on the left is a regular horizontal size class and the app on the right is compact.
- In portrait where the apps are split 60/40, both are running in a compact horizontal size class.

We're going to use this information so that we detect when the size class has changed and update our stack view appropriately. When we have a regular horizontal size class we'll use horizontal stacking, and when we have a compact size class we'll use vertical stacking. Here's the code:

```swift
override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
    if traitCollection.horizontalSizeClass == .compact {
        stackView.axis = .vertical
    } else {
        stackView.axis = .horizontal
    }
}
```

The project is technically finished at this point, but we're going to do two more things just to make it a bit more polished. First, we're going to create a method that updates the navigation bar to show the page title from the active web view when it changes. This will read the `title` property of the web view to set the view controller’s title, then place the current URL into our address bar.

Here's that method:

```swift
func updateUI(for webView: WKWebView) {
    title = webView.title
    addressBar.text = webView.url?.absoluteString ?? ""
}
```

Second, we need to call that method in the two places it's needed: whenever we select a web view, and whenever the web view changes page. The former is just a matter of adding this line just before the end of `selectWebView()`:

```swift
updateUI(for: webView)
```

The latter is a matter of implementing the web view’s `didFinish` method, which we can receive because we configured our view controller to be the delegate of each of the web views. So, put this code somewhere in <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift`:

```swift
func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
    if webView == activeWebView {
        updateUI(for: webView)
    }
}
```

As you can see, we only update the user interface to reflect a page's title if it comes from the active web view, otherwise it would be confusing. That's it - the project is done!

