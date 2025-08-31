---
lang: ko-KR
title: "Editing multiline text with UITextView"
description: "Article(s) > Editing multiline text with UITextView"
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
      content: "Article(s) > Editing multiline text with UITextView"
    - property: og:description
      content: "Editing multiline text with UITextView"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/19/06-editing-multiline-text-with-uitextview.html
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
  "title": "Editing multiline text with UITextView | Hacking with iOS",
  "desc": "Editing multiline text with UITextView",
  "link": "https://hackingwithswift.com/read/19/6/editing-multiline-text-with-uitextview",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/We4VzqqJTow" />

Our extension is going to let users type in JavaScript, so before we get onto more coding we're going to add a basic user interface. Open <FontIcon icon="iconfont icon-xcode"/>`MainInterface.storyboard`, then delete its UIImageView and navigation bar. Once that's done, embed the view controller in a navigation controller.

::: note

When you delete the image view, it’s possible Xcode might leave its connection intact. This will cause you problems later, so I suggest you double check the image view is really dead: right-click on the yellow view controller circle above your view, and if you see an outlet called “imageView” click the X next to it to clear the connection.

:::

We're going to use a new UIKit component called `UITextView`. You already met `UITextField` in project 5, and it's useful for letting users enter text into a single-line text box. But if you want multiple lines of text you need `UITextView`, so search for "textview" in the object library and drag one into your view so that it takes up all the space. Delete the template "Lorem ipsum" text that is in there.

Go to the Editor menu and use Resolve Layout Issues > Reset To Suggested Constraints to add automatic Auto Layout constraints. Now use the assistant editor to create an outlet named `script` for the text view in <FontIcon icon="fa-brands fa-swift"/>`ActionViewController.swift`, and while you're there you can delete the `UIImageView` outlet that Xcode made for you.

This text view is going to contain code rather than writing, so we don’t want any of Apple’s “helpful” text correction systems in place. To turn them off, select the text view then go to the attributes inspector - you want to to set Capitalization to None, then Correction, Smart Dashes, Smart Insert, Smart Quotes, and Spell Checking all to No.

That's everything for Interface Builder, so switch back to the standard editor, open <FontIcon icon="fa-brands fa-swift"/>`ActionViewController.swift` and add these two properties to your class:

```swift
var pageTitle = ""
var pageURL = ""
```

We're going to store these two because they are being transmitted by Safari. We'll use the page title to show useful text in the navigation bar, and the URL is there for you to use yourself if you make improvements.

You already saw that we're receiving the data dictionary from Safari, because we used the `print()` function to output its values. Replace the `print()` call with this:

```swift
self?.pageTitle = javaScriptValues["title"] as? String ?? ""
self?.pageURL = javaScriptValues["URL"] as? String ?? ""

DispatchQueue.main.async {
    self?.title = self?.pageTitle
}
```

That sets our two properties from the `javaScriptValues` dictionary, typecasting them as String. It then uses `async()` to set the view controller's `title` property on the main queue. This is needed because the closure being executed as a result of `loadItem(forTypeIdentifier:)` could be called on any thread, and we don't want to change the UI unless we're on the main thread.

You might have noticed that I haven't written `[weak self] in` for the `async()` call, and that's because it's not needed. The closure will capture the variables it needs, which includes `self`, but we're already inside a closure that has declared `self` to be weak, so this new closure will use that.

We can immediately make our app useful by modifying the `done()` method. It's been there all along, but I've been ignoring it because there's so much other prep to do just to get out of first gear, but it's now time to turn our eyes towards it and add some functionality.

The `done()` method was originally called as an action from the storyboard, but we deleted the navigation bar Apple put in because it's terrible. Instead, let's create a `UIBarButtonItem` in code, and make that call `done()` instead. Put this in `viewDidLoad()`:

```swift
navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(done))
```

Right now, `done()` just has one line of code, which is this:

```swift
self.extensionContext!.completeRequest(returningItems: self.extensionContext!.inputItems, completionHandler: nil)
```

Calling `completeRequest(returningItems:)` on our extension context will cause the extension to be closed, returning back to the parent app. However, it will pass back to the parent app any items that we specify, which in the current code is the same items that were sent in.

In a Safari extension like ours, the data we return here will be passed in to the `finalize()` function in the Action.js JavaScript file, so we're going to modify the `done()` method so that it passes back the text the user entered into our text view.

To make this work, we need to:

- Create a new `NSExtensionItem` object that will host our items.
- Create a dictionary containing the key "customJavaScript" and the value of our script.
- Put that dictionary into *another* dictionary with the key `NSExtensionJavaScriptFinalizeArgumentKey`.
- Wrap the big dictionary inside an `NSItemProvider` object with the type identifier `kUTTypePropertyList`.
- Place that `NSItemProvider` into our `NSExtensionItem` as its attachments.
- Call `completeRequest(returningItems:)`, returning our `NSExtensionItem`.

I realize that seems like far more effort than it ought to be, but it's really just the reverse of what we are doing inside `viewDidLoad()`.

With all that in mind, rewrite your `done()` method to this:

```swift
@IBAction func done() {
    let item = NSExtensionItem()
    let argument: NSDictionary = ["customJavaScript": script.text]
    let webDictionary: NSDictionary = [NSExtensionJavaScriptFinalizeArgumentKey: argument]
    let customJavaScript = NSItemProvider(item: webDictionary, typeIdentifier: kUTTypePropertyList as String)
    item.attachments = [customJavaScript]

    extensionContext?.completeRequest(returningItems: [item])
}
```

That's all the code required to send data back to Safari, at which point it will appear inside the `finalize()` function in Action.js. From there we can do what we like with it, but in this project the JavaScript we need to write is remarkably simple: we pull the "customJavaScript" value out of the `parameters` array, then pass it to the JavaScript `eval()` function, which executes any code it finds.

Open Action.js, and change the `finalize()` function to this:

```swift
finalize: function(parameters) {
    var customJavaScript = parameters["customJavaScript"];
    eval(customJavaScript);
}
```

That's it! Our user has written their code in our extension, tapped Done, and it gets executed in Safari using `eval()`. If you want to give it a try, enter the code `alert(document.title);` into the extension. When you tap Done, you'll return to Safari and see the page title in a message box.

