---
lang: ko-KR
title: "Refactoring for the win"
description: "Article(s) > Refactoring for the win"
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
      content: "Article(s) > Refactoring for the win"
    - property: og:description
      content: "Refactoring for the win"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/04/05-refactoring-for-the-win.html
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
  "title": "Refactoring for the win | Hacking with iOS",
  "desc": "Refactoring for the win",
  "link": "https://hackingwithswift.com/read/4/5/refactoring-for-the-win",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/4GfOfx9z3Ss" />

Our app has a fatal flaw, and there are two ways to fix it: double up on code, or refactor. Cunningly, the first option is nearly always the easiest, and yet counter-intuitively also the hardest.

The flaw is this: we let users select from a list of websites, but once they are on that website they can get pretty much anywhere else they want just by following links. Wouldn't it be nice if we could check every link that was followed so that we can make sure it's on our safe list?

One solution - doubling up on code - would have us writing the list of accessible websites twice: once in the `UIAlertController` and once when we're checking the link. This is extremely easy to write, but it can be a trap: you now have two lists of websites, and it's down to you to keep them both up to date. And if you find a bug in your duplicated code, will you remember to fix it in the other place too?

The second solution is called refactoring, and it's effectively a rewrite of the code. The end result should do the same thing, though. The purpose of the rewrite is to make it more efficient, make it easier to read, reduce its complexity, and to make it more flexible. This last use is what we'll be shooting for: we want to refactor our code so there's a shared array of allowed websites.

Up where we declared our two properties `webView` and `progressView`, add this:

```swift
var websites = ["apple.com", "hackingwithswift.com"]
```

That's an array containing the websites we want the user to be able to visit.

With that array, we can modify the web view's initial web page so that it's not hard-coded. In `viewDidLoad()`, change the initial web page to this:

```swift
let url = URL(string: "https:/" + websites[0])!
webView.load(URLRequest(url: url))
```

So far, so easy. The next change is to make our `UIAlertController` use the websites for its list of `UIAlertAction`s. Go down to the `openTapped()` method and replace these two lines:

```swift
ac.addAction(UIAlertAction(title: "apple.com", style: .default, handler: openPage))
ac.addAction(UIAlertAction(title: "hackingwithswift.com", style: .default, handler: openPage))
```

…with this loop:

```swift
for website in websites {
    ac.addAction(UIAlertAction(title: website, style: .default, handler: openPage))
}
```

That will add one `UIAlertAction` object for each item in our array. Again, not too complicated.

The final change is something new, and it belongs to the `WKNavigationDelegate` protocol. If you find space for a new method and start typing "web" you'll see the list of `WKWebView`-related code completion options. Look for the one called `decidePolicyFor` and let Xcode fill in the method for you.

This delegate callback allows us to decide whether we want to allow navigation to happen or not every time something happens. We can check which part of the page started the navigation, we can see whether it was triggered by a link being clicked or a form being submitted, or, in our case, we can check the URL to see whether we like it.

Now that we've implemented this method, it expects a response: should we load the page or should we not? When this method is called, you get passed in a parameter called `decisionHandler`. This actually holds a function, which means if you "call" the parameter, you're actually calling the function.

In project 2 I talked about closures: chunks of code that you can pass into a function like a variable and have executed at a later date. This `decisionHandler` is also a closure, except it's the other way around - rather than giving someone else a chunk of code to execute, you're being given it and are required to execute it.

And make no mistake: you *are required* to do something with that `decisionHandler` closure. That might make sound an extremely complicated way of returning a value from a method, and that's true - but it's also underestimating the power a little! Having this `decisionHandler` variable/function means you can show some user interface to the user "Do you really want to load this page?" and call the closure when you have an answer.

You might think that already sounds complicated, but I’m afraid there’s one more thing that might hurt your head. Because you might call the `decisionHandler` closure straight away, or you might call it later on (perhaps after asking the user what they want to do), Swift considers it to be an *escaping* closure. That is, the closure has the potential to escape the current method, and be used at a later date. We won’t be using it that way, but it has the *potential* and that’s what matters.

Because of this, Swift wants us to add the special keyword `@escaping` when specifying this method, so we’re acknowledging that the closure might be used later. You don’t need to do anything else - just add that one keyword, as you’ll see in the code below.

So, we need to evaluate the URL to see whether it's in our safe list, then call the `decisionHandler` with a negative or positive answer. Here's the code for the method:

```swift
func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    let url = navigationAction.request.url

    if let host = url?.host {
        for website in websites {
            if host.contains(website) {
                decisionHandler(.allow)
                return
            }
        }
    }

    decisionHandler(.cancel)
}
```

There are some easy bits, but they are outweighed by the hard bits so let's go through every line in detail to make sure:

1. First, we set the constant `url` to be equal to the `URL` of the navigation. This is just to make the code clearer.
2. Second, we use `if let` syntax to unwrap the value of the optional `url.host`. Remember I said that `URL` does a lot of work for you in parsing URLs properly? Well, here's a good example: this line says, "if there is a host for this URL, pull it out" - and by "host" it means "website domain" like apple.com. Note: we need to unwrap this carefully because not all URLs have hosts.
3. Third, we loop through all sites in our safe list, placing the name of the site in the `website` variable.
4. Fourth, we use the `contains()` String method to see whether each safe website exists somewhere in the host name.
5. Fifth, if the website was found then we call the decision handler with a positive response - we want to allow loading.
6. Sixth, if the website was found, after calling the `decisionHandler` we use the `return` statement. This means "exit the method now."
7. Last, if there is no host set, or if we've gone through all the loop and found nothing, we call the decision handler with a negative response: cancel loading.

You give the `contains()` method a string to check, and it will return true if it is found inside whichever string you used with `contains()`. You've already met the `hasPrefix()` method in project 1, but `hasPrefix()` isn't suitable here because our safe site name could appear anywhere in the URL. For example, slashdot.org redirects to m.slashdot.org for mobile devices, and `hasPrefix()` would fail that test.

The `return` statement is new, but it's one you'll be using a lot from now on. It exits the method immediately, executing no further code. If you said your method returns a value, you'll use the `return` statement to return that value.

Your project is complete: press <kbd>Cmd</kbd>+<kbd>R</kbd> to run the finished app, and enjoy!

