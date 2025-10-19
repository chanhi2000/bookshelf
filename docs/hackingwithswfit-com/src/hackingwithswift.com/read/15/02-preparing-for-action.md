---
lang: ko-KR
title: "Preparing for action"
description: "Article(s) > Preparing for action"
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
      content: "Article(s) > Preparing for action"
    - property: og:description
      content: "Preparing for action"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/15/02-preparing-for-action.html
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
  "title": "Preparing for action | Hacking with iOS",
  "desc": "Preparing for action",
  "link": "https://hackingwithswift.com/read/15/2/preparing-for-action",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/ce5YR-M0QMw" />

Open Interface Builder with <VPIcon icon="iconfont icon-xcode"/>`Main.storyboard` and place a button on there with the title "Tap" - position it in the middle of the screen, near the bottom. Don’t worry that we’re positioning things using an iPhone XR-sized screen - Auto Layout will automatically make it look great on iPads.

We want our button to always stay near the bottom of the view controller, so Ctrl-drag from the button to the view directly below it and choose “Bottom Space to Safe Area.” Now Ctrl-drag the same way again and choose "Center Horizontally in Safe Area.”

That's it for Auto Layout, so please switch to the assistant view so we can add an action and an outlet. Ctrl-drag from the button to your code to create an action for the button called `tapped()`.

Every time the user taps the "Tap" button, we're going to execute a different animation. This will be accomplished by cycling through a counter, and moving an image view. To make all that work, you need to add two more properties to the class:

```swift
var imageView: UIImageView!
var currentAnimation = 0
```

There isn't an image view in the storyboard - we're going to create it ourself in `viewDidLoad()` using an initializer that takes a `UIImage` and makes the image view the correct size for the image.

Add this code to `viewDidLoad()`:

```swift
imageView = UIImageView(image: UIImage(named: "penguin"))
imageView.center = CGPoint(x: 512, y: 384)
view.addSubview(imageView)
```

That places the penguin in the middle of an iPad-sized landscape screen, ready for us to animate.

There's one more thing we're going to do before we start looking at the animations, and that's to put a little bit of code into the `tapped()` method so that we cycle through animations each time the button is tapped. Put this in there:

```swift
currentAnimation += 1

if currentAnimation > 7 {
    currentAnimation = 0
}
```

That will add 1 to the value of `currentAnimation` until it reaches 7, at which point it will set it back to 0.

