---
lang: ko-KR
title: "How to measure touch strength using 3D Touch"
description: "Article(s) > How to measure touch strength using 3D Touch"
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
      content: "Article(s) > How to measure touch strength using 3D Touch"
    - property: og:description
      content: "How to measure touch strength using 3D Touch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/37/07-how-to-measure-touch-strength-using-3d-touch.html
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
  "title": "How to measure touch strength using 3D Touch | Hacking with iOS",
  "desc": "How to measure touch strength using 3D Touch",
  "link": "https://hackingwithswift.com/read/37/7/how-to-measure-touch-strength-using-3d-touch",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

3D Touch is a new technology that was first trialled in Apple Watch as Force Touch, but introduced fully inside the iPhone 6s. In iOS it's responsible for multiple interesting technologies: peek and pop (to preview and jump into view controllers), application shortcuts (menus on the home screen for common actions) and also pressure-sensitive taps for `UITouch`.

All three of these are surprisingly simple to do, but in this project we're going to use only the last one, and I think you'll be impressed by how easy it is. This project is about producing a hoax, and we're going to make it so that if you press hard on any card it will automatically become a star. This allows you to be able to "guess" correctly even without an Apple Watch around, because any card is the right answer as long as you press correctly.

To accomplish this, we're going to use two new properties of `UITouch`: `force` and `maximumPossibleForce`. The first tells us how strongly the user is pressing for the current touch, and the second tells us the maximum recognizable strength for the current touch. For our purposes, we just need to make sure the two match: if the user is pressing as hard as the screen can recognize, we'll enable our cheat.

The cheat itself is really simple, because we just need to change the image on the front of the card and set its `isCorrect` property to be true.

There is one small problem here, but it's trivial to fix: devices older than the iPhone 6s devices don't support 3D Touch, and even 3D Touch devices can have the feature disabled on user request. So, we need to add a simple check to ensure 3D Touch is available and enabled on our current device.

That's how it all needs to work in theory, but now for the implementation. To keep things as straightforward as possible, we're going to add all this work to `touchesMoved()` in <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift`, which will get called every time the user's finger moves on the screen. Inside this method, we'll find where the user's touch was, then loop through all the cards to find which one (if any) they are over. Then, if they are over a card and are pressing hard enough, we'll enable the cheat.

Add this method to <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift` now:

```swift
override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesMoved(touches, with: event)

    guard let touch = touches.first else { return }
    let location = touch.location(in: cardContainer)

    for card in allCards {
        if card.view.frame.contains(location) {
            if view.traitCollection.forceTouchCapability == .available {
                if touch.force == touch.maximumPossibleForce {
                    card.front.image = UIImage(named: "cardStar")
                    card.isCorrect = true
                }
            }
        }
    }
}
```

That contains three pieces of code that we haven't looked at before. The first two are tiny but important, so I want to cover them briefly before moving on. The first is `location(in:)`, which is the UIKit version of the `location(in:)` method we've used in SpriteKit several times. The second is the `contains()` method of `CGRect`, which returns true if a point is inside the rectangle.

I told you it was tiny, but it's definitely important: our point is the location of the current touch, and our rectangle is the frame of each card. So, this method returns true if the user's finger is over a particular card.

The third piece of new code is the check whether 3D Touch is available, although as you can see the check is actually for "force touch" being available - presumably because Apple's marketing department got involved after development had completed! This is done by reading the current trait collection for the view and checking whether its `forceTouchCapability` is set to `.available`.

That's all the code it takes to enable our first cheat, but I'm afraid that you can test it only if you have a 3D Touch-capable device - Xcode's iOS simulator does not support 3D Touch, so either you test with a real device or just take my word for it!

Note: in case you were wondering, that code will indeed run every time the user moves their finger, but like I said earlier "`UIImage` shares image data across image views very efficiently, so there's no extra cost to this approach." The same is true here: this code will run very quickly.

