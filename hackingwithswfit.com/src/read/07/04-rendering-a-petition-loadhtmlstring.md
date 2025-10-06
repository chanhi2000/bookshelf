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
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/07/04-rendering-a-petition-loadhtmlstring.html
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
  "link": "https://hackingwithswift.com/read/7/4/rendering-a-petition-loadhtmlstring",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/T6wvsQ78w0c" />

After all the JSON parsing, it's time for something easy: we need to create a detail view controller class so that it can draw the petition content in an attractive way.

The easiest way for rendering complex content from the web is nearly always to use a `WKWebView`, and we're going to use the same technique from project 4 to create a `DetailViewController` that contains a web view.

Go to the File menu and choose New > File, then choose iOS > Source > Cocoa Touch Class. Click Next, name it “DetailViewController”, make it a subclass of “UIViewController”, then click Next and Create.

Replace *all* the `DetailViewController` code with this:

```swift
import UIKit
import WebKit

class DetailViewController: UIViewController {
    var webView: WKWebView!
    var detailItem: Petition?

    override func loadView() {
        webView = WKWebView()
        view = webView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
```

This is almost identical to the code from project 4, but you'll notice I've added a `detailItem` property that will contain our `Petition` instance.

That was the easy bit. The hard bit is that we can't just drop the petition text into the web view, because it will probably look tiny. Instead, we need to wrap it in some HTML, which is a whole other language with its own rules and its own complexities.

Now, this series isn't called "Hacking with HTML," so I don't intend to go into much detail here. However, I will say that the HTML we're going to use tells iOS that the page fits mobile devices, and that we want the font size to be 150% of the standard font size. All that HTML will be combined with the `body` value from our petition, then sent to the web view.

Place this in `viewDidLoad()`, directly beneath the call to `super.viewDidLoad()`:

```swift
guard let detailItem = detailItem else { return }

let html = """
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style> body { font-size: 150%; } </style>
</head>
<body>
\(detailItem.body)
</body>
</html>
"""

webView.loadHTMLString(html, baseURL: nil)
```

That `guard` at the beginning unwraps `detailItem` into itself if it has a value, which makes sure we exit the method if for some reason we didn’t get any data passed into the detail view controller.

::: note

It’s very common to unwrap variables using the same name, rather than create slight variations. In this case we could have used `guard let unwrappedItem = detailItem`, but that isn’t any better.

:::

I've tried to make the HTML as clear as possible, but if you don't care for HTML don't worry about it. What matters is that there's a Swift string called `html` that contains everything needed to show the page, and that's passed in to the web view's `loadHTMLString()` method so that it gets loaded. This is different to the way we were loading HTML before, because we aren't using a website here, just some custom HTML.

That's it for the detail view controller, it really is that simple. However, we still need to connect it to the table view controller by implementing the `didSelectRowAt` method. 

Previously we used the `instantiateViewController()` method to load a view controller from <VPIcon icon="iconfont icon-xcode"/>`Main.storyboard`, but in this project `DetailViewController` isn’t in the storyboard - it’s just a free-floating class. This makes `didSelectRowAt` easier, because it can load the class directly rather than loading the user interface from a storyboard.

So, add this new method to your `ViewController` class now:

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let vc = DetailViewController()
    vc.detailItem = petitions[indexPath.row]
    navigationController?.pushViewController(vc, animated: true)
}
```

Go ahead and run the project now by pressing <kbd>Cmd</kbd>+<kbd>R</kbd> or clicking play, then tap on a row to see more detail about each petition. Some petitions don’t have detail text, but most do - try a few and see what you can find.

