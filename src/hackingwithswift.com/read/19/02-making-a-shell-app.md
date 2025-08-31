---
lang: ko-KR
title: "Making a shell app"
description: "Article(s) > Making a shell app"
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
      content: "Article(s) > Making a shell app"
    - property: og:description
      content: "Making a shell app"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/19/02-basic-swift-debugging-using-print.html
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
  "title": "Making a shell app | Hacking with iOS",
  "desc": "Making a shell app",
  "link": "https://hackingwithswift.com/read/19/2/basic-swift-debugging-using-print",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/VOzPapykPm0" />

Safari extensions are launched from within the Safari action menu, but they ship inside a parent app. That is, you can't ship an extension by itself - it needs have an app alongside it. Frequently the app does very little, but it must at least be present.

There are two common ways to use the app side of the extension: to show help information, or to show basic settings for the user to adjust. We're going to go with the first option, although to skip writing lots of help text we'll just be using "Hello, world!"

Open your app’s <FontIcon icon="iconfont icon-xcode"/>`Main.storyboard` file, drop a `UILabel` into the view controller, then give it the text "Hello, world!". Using the document outline, Ctrl-drag from the label to the view just above it, and select "Center Horizontally in Safe Area“ and "Center Vertically in Safe Area.”

When you add those two constraints, you'll probably see some orange boxes around your label - one is wholly orange, and one has a dashed line. These orange markers mean your views don't match your constraints: the solid orange lines mean "this is where you view is," and the dashed orange lines mean "this is where your view will be when your code runs."

The reason for the difference is because labels have a default size of whatever fits their current text. We placed the label by hand, and in my case I made it too small, so Xcode is telling me when the code runs the label will be smaller. You can fix this warning by going to the Editor menu and choosing Resolve Auto Layout Issues > Update Frames, which will make the label the size Auto Layout thinks it ought to be.

That's the entire app complete. We're not going to add any more to it here because it's really not the point; we're going to focus on the extension from here on.

