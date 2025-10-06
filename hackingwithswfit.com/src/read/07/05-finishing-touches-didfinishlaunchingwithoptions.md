---
lang: ko-KR
title: "Rendering a petition: loadHTMLString"
description: "Article(s) > Rendering a petition: loadHTMLString"
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
      content: "Article(s) > Rendering a petition: loadHTMLString"
    - property: og:description
      content: "Rendering a petition: loadHTMLString"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/07/05-finishing-touches-didfinishlaunchingwithoptions.html
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
  "title": "Rendering a petition: loadHTMLString | Hacking with iOS",
  "desc": "Rendering a petition: loadHTMLString",
  "link": "https://hackingwithswift.com/read/7/5/finishing-touches-didfinishlaunchingwithoptions",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/9VorfMsbKQQ" />

Before this project is finished, we're going to make two changes. First, we're going to add another tab to the `UITabBarController` that will show popular petitions, and second we're going to make our loading code a little more resilient by adding error messages.

As I said previously, we can't really put the second tab into our storyboard because both tabs will host a `ViewController` and doing so would require us to duplicate the view controllers in the storyboard. You can do that if you really want, but please don't - it's a maintenance nightmare!

Instead, we're going to leave our current storyboard configuration alone, then create the second view controller using code. This isn't something you've done before, but it's not hard and we already took the first step, as you'll see.

Open the file <VPIcon icon="fa-brands fa-swift"/>`AppDelegate.swift`. This has been in all our projects so far, but it's not one we've had to work with until now. Look for the `didFinishLaunchingWithOptions` method, which should be at the top of the file. This gets called by iOS when the app has finished loading and is ready to be used, and we're going to hijack it to insert a second `ViewController` into our tab bar.

It should already have some default Apple code in there, but we're going to add some more just before the `return true` line:

```swift
if let tabBarController = window?.rootViewController as? UITabBarController {
    let storyboard = UIStoryboard(name: "Main", bundle: nil)
    let vc = storyboard.instantiateViewController(withIdentifier: "NavController")
    vc.tabBarItem = UITabBarItem(tabBarSystemItem: .topRated, tag: 1)
    tabBarController.viewControllers?.append(vc)
}
```

Every line of that is new, so let's dig in deeper:

- Our storyboard automatically creates a window in which all our view controllers are shown. This window needs to know what its initial view controller is, and that gets set to its `rootViewController` property. This is all handled by our storyboard.
- In the Single View App template, the root view controller is the `ViewController`, but we embedded ours inside a navigation controller, then embedded *that* inside a tab bar controller. So, for us the root view controller is a `UITabBarController`.
- We need to create a new `ViewController` by hand, which first means getting a reference to our <VPIcon icon="iconfont icon-xcode"/>`Main.storyboard` file. This is done using the `UIStoryboard` class, as shown. You don't need to provide a bundle, because `nil` means "use my current app bundle."
- We create our view controller using the `instantiateViewController()` method, passing in the storyboard ID of the view controller we want. Earlier we set our navigation controller to have the storyboard ID of "NavController", so we pass that in.
- We create a `UITabBarItem` object for the new view controller, giving it the "Top Rated" icon and the tag 1. That tag will be important in a moment.
- We add the new view controller to our tab bar controller's `viewControllers` array, which will cause it to appear in the tab bar.

So, the code creates a duplicate `ViewController` wrapped inside a navigation controller, gives it a new tab bar item to distinguish it from the existing tab, then adds it to the list of visible tabs. This lets us use the same class for both tabs without having to duplicate things in the storyboard.

The reason we gave a tag of 1 to the new `UITabBarItem` is because it's an easy way to identify it. Remember, both tabs contain a `ViewController`, which means the same code is executed. Right now that means both will download the same JSON feed, which makes having two tabs pointless. But if you modify `urlString` in <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift`’s `viewDidLoad()` method to this, it will work much better:

```swift
let urlString: String

if navigationController?.tabBarItem.tag == 0 {
    // urlString = "https://api.whitehouse.gov/v1/petitions.json?limit=100"
    urlString = "https://hackingwithswift.com/samples/petitions-1.json"
} else {
    // urlString = "https://api.whitehouse.gov/v1/petitions.json?signatureCountFloor=10000&limit=100"
    urlString = "https://hackingwithswift.com/samples/petitions-2.json"
}
```

That adjusts the code so that the first instance of `ViewController` loads the original JSON, and the second loads only petitions that have at least 10,000 signatures. Once again I’ve provided cached copies of the Whitehouse API data in case it changes or goes away in the future - use whichever one you prefer.

The project is almost done, but we're going to make one last change. Our current loading code isn't very resilient: we have a couple of `if` statements checking that things are working correctly, but no `else` statements showing an error message if there's a problem.

This is easily fixed by adding a new `showError()` method that creates a `UIAlertController` showing a general failure message:

```swift
func showError() {
    let ac = UIAlertController(title: "Loading error", message: "There was a problem loading the feed; please check your connection and try again.", preferredStyle: .alert)
    ac.addAction(UIAlertAction(title: "OK", style: .default))
    present(ac, animated: true)
}
```

You can now adjust the JSON downloading and parsing code to call this error method everywhere a condition fails, like this:

```swift
if let url = URL(string: urlString) {
    if let data = try? Data(contentsOf: url) {
        parse(json: data)
    } else {
        showError()
    }
} else {
    showError()
}
```

Alternatively we could rewrite this to be a little cleaner by inserting `return` after the call to `parse()`. This means that the method would exit if parsing was reached, so we get to the end of the method it means parsing *wasn’t* reached and we can show the error. Try this instead:

```swift
if let url = URL(string: urlString) {
    if let data = try? Data(contentsOf: url) {
        parse(json: data)
        return
    }
}

showError()
```

Both approaches are perfectly valid - do whichever you prefer.

Regardless of which you opt for, now that error messages are shown when the app hits problems we’re done - good job!

