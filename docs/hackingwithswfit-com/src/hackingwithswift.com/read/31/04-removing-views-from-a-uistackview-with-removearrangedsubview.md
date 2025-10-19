---
lang: ko-KR
title: "Removing views from a UIStackView with removeArrangedSubview()"
description: "Article(s) > Removing views from a UIStackView with removeArrangedSubview()"
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
      content: "Article(s) > Removing views from a UIStackView with removeArrangedSubview()"
    - property: og:description
      content: "Removing views from a UIStackView with removeArrangedSubview()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/31/04-removing-views-from-a-uistackview-with-removearrangedsubview.html
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
  "title": "Removing views from a UIStackView with removeArrangedSubview() | Hacking with iOS",
  "desc": "Removing views from a UIStackView with removeArrangedSubview()",
  "link": "https://hackingwithswift.com/read/31/4/removing-views-from-a-uistackview-with-removearrangedsubview",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

That was a long chapter, and I hope you learned a lot. But you deserve a break, so I have some good news: it's trivial to remove views from a UIStackView. Heck, at its simplest it's just a matter of telling `removeArrangedSubview()` which view you don’t want then removing that view from its superview - the others are automatically resized and re-arranged to fill the space.

However, using `removeArrangedSubview()` *doesn’t* remove the view altogether - it keeps the view in memory, which is helpful if you plan to re-add it later on because you can avoid recreating it. Here, though, we actually want to remove the web view and destroy it entirely, and that can be done with a call to `removeFromSuperview()` instead.

In this particular project, we need to do a little more:


- We want the delete button to work only if there's a web view selected.
- We want to find the location of the active web view inside the stack view, then remove it.
- If there are now no more web views, we want to call `setDefaultTitle()` to reset the user interface.
- We need to find whatever web view immediately follows the one that was removed.
- We then make that the new selected web view, highlighting it in blue.

We already pointed the delete button at a method called `deleteWebView()`, so all you need to do is plug this in. I've added comments to make sure it's all clear:

```swift
@objc func deleteWebView() {
    // safely unwrap our webview
    if let webView = activeWebView {
        if let index = stackView.arrangedSubviews.firstIndex(of: webView) {
            // We found the webview - remove it from the stack view and destroy it
            webView.removeFromSuperview()

            if stackView.arrangedSubviews.count == 0 {
                // go back to our default UI
                setDefaultTitle()
            } else {
                // convert the Index value into an integer
                var currentIndex = Int(index)

                // if that was the last web view in the stack, go back one
                if currentIndex == stackView.arrangedSubviews.count {
                    currentIndex = stackView.arrangedSubviews.count - 1
                }

                // find the web view at the new index and select it
                if let newSelectedWebView = stackView.arrangedSubviews[currentIndex] as? WKWebView {
                    selectWebView(newSelectedWebView)
                }
            }
        }
    }
}
```

So, although the act of removing a view from a `UIStackView` is just a matter of calling either `removeArrangedSubview()` or `removeFromSuperview()` depending on whether you want to use it again, we need to do a little more to make sure the user interface updates correctly.

The last thing we're going to do is talk about multitasking on iPad, and add a few user interface clean ups to make the project complete…

