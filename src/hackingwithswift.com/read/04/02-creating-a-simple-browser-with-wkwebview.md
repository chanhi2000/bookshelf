---
lang: ko-KR
title: "Creating a simple browser with WKWebView"
description: "Article(s) > Creating a simple browser with WKWebView"
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
      content: "Article(s) > Creating a simple browser with WKWebView"
    - property: og:description
      content: "Creating a simple browser with WKWebView"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/04/02-creating-a-simple-browser-with-wkwebview.html
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
  "title": "Creating a simple browser with WKWebView | Hacking with iOS",
  "desc": "Creating a simple browser with WKWebView",
  "link": "https://hackingwithswift.com/read/4/2/creating-a-simple-browser-with-wkwebview",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/pLiT5DdjEbM" />

In our first two projects we used Interface Builder for a lot of layout work, but here our layout will be so simple that we can do the entire thing in code. You see, before we were adding buttons and images to our view, but in this project the web view is going to take up all the space so it might as well *be* the view controller's main view.

So far, we've been using the `viewDidLoad()` method to configure our view once its layout has loaded. This time we need to override the actual loading of the view because we don't want that empty thing on the storyboard, we want our own code. It will still be placed inside the navigation controller, but the rest is up to us.

iOS has two different ways of working with web views, but the one we’ll be using for this project is called `WKWebView`. It’s part of the WebKit framework rather than the UIKit framework, but we can import it by adding this line to the top of <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift`:

```swift
import WebKit
```

When we create the web view, we need to store it as a property so we can reference it later on. So, add this property to the class now:

```swift
var webView: WKWebView!
```

Finally, add this new method *before* `viewDidLoad()`:

```swift
override func loadView() {
    webView = WKWebView()
    webView.navigationDelegate = self
    view = webView
}
```

That code will trigger a compiler error for now, but we’ll fix it in a moment.

::: note

You don’t need to put `loadView()` before `viewDidLoad()`, and in fact you could put it anywhere between `class ViewController: UIViewController {` down to the last closing brace in the file. However, I encourage you to structure your methods in an organized way, and because `loadView()` gets called before `viewDidLoad()` it makes sense to position the code above it too.

:::

Anyway, there are only three things we care about, because by now you should understand why we need to use the `override` keyword. (Hint: it's because there's a default implementation, which is to load the layout from the storyboard.)

First, we create a new instance of Apple's `WKWebView` web browser component and assign it to the `webView` property. Third, we make our view (the root view of the view controller) that web view.

Yes, I missed out the second line, and that's because it introduces new concept: delegation. Delegation is what's called a *programming pattern* - a way of writing code - and it's used extensively in iOS. And for good reason: it's easy to understand, easy to use, and extremely flexible.

A *delegate* is one thing acting in place of another, effectively answering questions and responding to events on its behalf. In our example, we're using WKWebView: Apple's powerful, flexible and efficient web renderer. But as smart as `WKWebView` is, it doesn't know (or care) how our application wants to behave, because that's our custom code.

The delegation solution is brilliant: we can tell `WKWebView` that we want to be informed when something interesting happens. In our code, we're setting the web view's `navigationDelegate` property to `self`, which means "when any web page navigation happens, please tell me - the current view controller.”

When you do this, two things happen:

1. You must conform to the protocol. This is a fancy way of saying, "if you're telling me you can handle being my delegate, here are the methods you need to implement." In the case of `navigationDelegate`, all these methods are optional, meaning that we don't *need* to implement any methods.
2. Any methods you do implement will now be given control over the `WKWebView`'s behavior. Any you don't implement will use the default behavior of `WKWebView`.

Before we go any further, it’s time to fix the compilation error. When you set any delegate, you need to conform to the protocol that matches the delegate. Yes, all the `navigationDelegate` protocol methods are optional, but Swift doesn't know that yet. All it knows is that we're promising we're a suitable delegate for the web view, and yet haven't implemented the protocol.

The fix for this is simple, but I'm going to hijack it to introduce something else at the same time, because this is an opportune moment. First, the fix: find this line:

```swift
class ViewController: UIViewController {
```

…and change it to this:

```swift
class ViewController: UIViewController, WKNavigationDelegate {
```

That's the fix. But what I want to discuss is the way `ViewController` now appears to inherit from two things, which isn’t possible in Swift. As you know, when we say `class A: B` we’re defining a new class called `A` that builds on the functionality provided by class `B`. However, when we say `class A: B, C` we’re saying it inherits from `UIViewController` (the first item in the list), *and* promises it implements the `WKNavigationDelegate` protocol.

The order here really is important: the parent class (superclass) comes first, then all protocols implemented come next, all separated by commas. We're saying that we conform to only one protocol here ( `WKNavigationDelegate`) but you can specify as many as you need to.

So, the complete meaning of this line is "create a new subclass of `UIViewController` called `ViewController`, and tell the compiler that we promise we’re safe to use as a `WKNavigationDelegate`."

This program is almost doing something useful, so before you run it let's add three more lines. Please place these in the `viewDidLoad()` method, just after the `super` call:

```swift
let url = URL(string: "https://hackingwithswift.com")!
webView.load(URLRequest(url: url))
webView.allowsBackForwardNavigationGestures = true
```

The first line creates a new data type called `URL`, which is Swift’s way of storing the location of files. You’re probably already familiar with URLs as being used online, like with [<FontIcon icon="fas fa-globe"/>https://hackingwithswift.com](https://hackingwithswift.com), but they are just as important for storing local filenames too - they are flexible little things!

Even though we’re used to URLs being strings of text, Swift stores URLs in a specific `URL` data type that adds a lot of extra functionality. So, that first line of code creates a new `URL` out of the string “[<FontIcon icon="fas fa-globe"/>https://hackingwithswift.com](https://hackingwithswift.com)”. I'm using hackingwithswift.com as an example website, but please change it to something you like.

::: warning

**you need to ensure you use `https://` for your websites, because iOS does not like apps sending or receiving data insecurely.**

If this is something you want to override, I wrote an article specifically about App Transport Security: </example-code/system/how-to-handle-the-https-requirements-in-ios-9-with-app-transport-security>.

:::

The second line does two things: it creates a new `URLRequest` object from that URL, and gives it to our web view to load.

Now, this probably seems like pointless obfuscation from Apple, but `WKWebViews` don't load websites from strings like www.hackingwithswift.com, or even from a `URL` made out of those strings. You need to turn the string into a `URL`, then put the `URL` into an `URLRequest`, and `WKWebView` will load *that*. Fortunately it's not hard to do!

::: warning

Your URL must be complete, and valid, in order for this process to work. That means including the **https://** part.

:::

The third line enables a property on the web view that allows users to swipe from the left or right edge to move backward or forward in their web browsing. This is a feature from the Safari browser that many users rely on, so it's nice to keep it around.

It’s time to run the app, so please press <kbd>Cmd</kbd>+<kbd>R</kbd> to run your app, and you should be able to view your website. Step one done!

![Just by embedding a web view into the app, we can now render any website content - win!](https://hackingwithswift.com/img/books/hws/4-1@2x.png)

