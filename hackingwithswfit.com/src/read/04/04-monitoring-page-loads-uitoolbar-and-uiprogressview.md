---
lang: ko-KR
title: "Monitoring page loads: UIToolbar and UIProgressView"
description: "Article(s) > Monitoring page loads: UIToolbar and UIProgressView"
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
      content: "Article(s) > Monitoring page loads: UIToolbar and UIProgressView"
    - property: og:description
      content: "Monitoring page loads: UIToolbar and UIProgressView"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/04/04-monitoring-page-loads-uitoolbar-and-uiprogressview.html
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
  "title": "Monitoring page loads: UIToolbar and UIProgressView | Hacking with iOS",
  "desc": "Monitoring page loads: UIToolbar and UIProgressView",
  "link": "https://hackingwithswift.com/read/4/4/monitoring-page-loads-uitoolbar-and-uiprogressview",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/Nj6qvHyNMug" />

Now is a great time to meet two new `UIView` subclasses: `UIToolbar` and `UIProgressView`. `UIToolbar` holds and shows a collection of `UIBarButtonItem` objects that the user can tap on. We already saw how each view controller has a `rightBarButton` item, so a `UIToolbar` is like having a whole bar of these items. `UIProgressView` is a colored bar that shows how far a task is through its work, sometimes called a "progress bar."

The way we're going to use `UIToolbar` is quite simple: all view controllers automatically come with a `toolbarItems` array that automatically gets read in when the view controller is active inside a `UINavigationController`.

This is very similar to the way `rightBarButtonItem` is shown only when the view controller is active. All we need to do is set the array, then tell our navigation controller to show its toolbar, and it will do the rest of the work for us.

We're going to create two `UIBarButtonItems` at first, although one is special because it's a flexible space. This is a unique `UIBarButtonItem` type that acts like a spring, pushing other buttons to one side until all the space is used.

In `viewDidLoad()`, put this new code directly below where we set the `rightBarButtonItem`:

```swift
let spacer = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: nil, action: nil)
let refresh = UIBarButtonItem(barButtonSystemItem: .refresh, target: webView, action: #selector(webView.reload))

toolbarItems = [spacer, refresh]
navigationController?.isToolbarHidden = false
```

The first line is new, or at least part of it is: we're creating a new bar button item using the special system item type `.flexibleSpace`, which creates a flexible space. It doesn't need a target or action because it can't be tapped. The second line you've seen before, although now it's calling the `reload()` method on the web view rather than using a method of our own.

The last two lines are new: the first creates an array containing the flexible space and the refresh button, then sets it to be our view controller's `toolbarItems` array. The second sets the navigation controller's `isToolbarHidden` property to be false, so the toolbar will be shown - and its items will be loaded from our current view.

That code will compile and run, and you'll see the refresh button neatly aligned to the right - that's the effect of the flexible space automatically taking up as much room as it can on the left.

The next step is going to be to add a `UIProgressView` to our toolbar, which will show how far the page is through loading. However, this requires two new pieces of information:

- You can't just add random `UIView` subclasses to a `UIToolbar`, or to the `rightBarButtonItem` property. Instead, you need to wrap them in a special `UIBarButtonItem`, and use that instead.
- Although `WKWebView` tells us how much of the page has loaded using its `estimatedProgress` property, the `WKNavigationDelegate` system doesn't tell us when this value has changed. So, we're going to ask iOS to tell us using a powerful technique called key-value observing, or KVO.

First, let's create the progress view and place it inside the bar button item. Begin by declaring the property at the top of the `ViewController` class next to the existing `WKWebView` property:

```swift
var progressView: UIProgressView!
```

Now place this code directly before the `let spacer =` line in viewDidLoad():

```swift
progressView = UIProgressView(progressViewStyle: .default)
progressView.sizeToFit()
let progressButton = UIBarButtonItem(customView: progressView)
```

All three of those lines are new, so let's go over them:

1. The first line creates a new `UIProgressView` instance, giving it the default style. There is an alternative style called `.bar`, which doesn't draw an unfilled line to show the extent of the progress view, but the default style looks best here.
2. The second line tells the progress view to set its layout size so that it fits its contents fully.
3. The last line creates a new `UIBarButtonItem` using the `customView` parameter, which is where we wrap up our `UIProgressView` in a `UIBarButtonItem` so that it can go into our toolbar.

With the new `progressButton` item created, we can put it into our toolbar items anywhere we want it. The existing spacer will automatically make itself smaller to give space to the progress button, so I'm going to modify my `toolbarItems` array to this:

```swift
toolbarItems = [progressButton, spacer, refresh]
```

That is, progress view first, then a space in the center, then the refresh button on the right.

If you run the app now, you'll just see a thin gray line for our progress view - that's because it's default value is 0, so there's nothing colored in. Ideally we want to set this to match our webView's `estimatedProgress` value, which is a number from 0 to 1, but WKNavigationDelegate doesn't tell us when this value has changed.

Apple's solution to this is huge. Apple's solution is powerful. And, best of all, Apple's solution is almost everywhere in its toolkits, so once you learn how it works you can apply it elsewhere. It's called key-value observing (KVO), and it effectively lets you say, "please tell me when the property X of object Y gets changed by anyone at any time."

We're going to use KVO to watch the `estimatedProgress` property, and I hope you'll agree that it's useful. First, we add ourselves as an observer of the property on the web view by adding this to `viewDidLoad()`:

```swift
webView.addObserver(self, forKeyPath: #keyPath(WKWebView.estimatedProgress), options: .new, context: nil)
```

The `addObserver()` method takes four parameters: who the observer is (we're the observer, so we use `self`), what property we want to observe (we want the `estimatedProgress` property of `WKWebView`), which value we want (we want the value that was just set, so we want the new one), and a context value.

 `forKeyPath` and `context` bear a little more explanation. `forKeyPath` isn't named `forProperty` because it's not just about entering a property name. You can actually specify a path: one property inside another, inside another, and so on. More advanced key paths can even add functionality, such as averaging all elements in an array! Swift has a special keyword, `#keyPath`, which works like the `#selector` keyword you saw previously: it allows the compiler to check that your code is correct - that the `WKWebView` class actually has an `estimatedProgress` property.

 `context` is easier: if you provide a unique value, that same context value gets sent back to you when you get your notification that the value has changed. This allows you to check the context to make sure it was your observer that was called. There are some corner cases where specifying (and checking) a context is required to avoid bugs, but you won't reach them during any of this series.

::: warning

in more complex applications, all calls to `addObserver()` should be matched with a call to `removeObserver()` when you're finished observing - for example, when you're done with the view controller.

:::

Once you have registered as an observer using KVO, you *must* implement a method called `observeValue()`. This tells you when an observed value has changed, so add this method now:

```swift
override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
    if keyPath == "estimatedProgress" {
        progressView.progress = Float(webView.estimatedProgress)
    }
}
```

As you can see it's telling us which key path was changed, and it also sends us back the context we registered earlier so you can check whether this callback is for you or not.

In this project, all we care about is whether the `keyPath` parameter is set to `estimatedProgress` - that is, if the `estimatedProgress` value of the web view has changed. And if it has, we set the `progress` property of our progress view to the new `estimatedProgress` value.

Minor note: `estimatedProgress` is a `Double`, which as you should remember is one way of representing decimal numbers like 0.5 or 0.55555. Unhelpfully, `UIProgressView`'s `progress` property is a `Float`, which is another (lower-precision) way of representing decimal numbers. Swift doesn't let you put a `Double` into a `Float`, so we need to create a new `Float` from the `Double`.

If you run your project now, you'll see the progress view fills up with blue as the page loads.

