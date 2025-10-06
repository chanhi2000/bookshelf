---
lang: ko-KR
title: "Animating a 3D flip effect using transition(with:)"
description: "Article(s) > Animating a 3D flip effect using transition(with:)"
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
      content: "Article(s) > Animating a 3D flip effect using transition(with:)"
    - property: og:description
      content: "Animating a 3D flip effect using transition(with:)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/37/03-animating-a-3d-flip-effect-using-transitionwith.html
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
  "title": "Animating a 3D flip effect using transition(with:) | Hacking with iOS",
  "desc": "Animating a 3D flip effect using transition(with:)",
  "link": "https://hackingwithswift.com/read/37/3/animating-a-3d-flip-effect-using-transitionwith",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

There's a reason I've made you put the card functionality into a separate view controller, and it's because we're going to be adding some functionality to cards to handle them being flipped over. iOS makes this kind of animation really easy, but it's done in a slightly different way to our previous animations.

To handle tap detection we're going to use a `UITapGestureRecognizer` rather than something like `touchesBegan`. This will make more sense later on, but the TL;DR version is that part of the hoax effect will be you running your finger over the cards using your powers to "feel" for the star - something like `touchesBegan()` will just cause problems.

So, please add this gesture recognizer to the end of `viewDidLoad()` in the `CardViewController` class:

```swift
let tap = UITapGestureRecognizer(target: self, action: #selector(cardTapped))
back.isUserInteractionEnabled = true
back.addGestureRecognizer(tap)
```

We haven't written the `cardTapped()` method yet, but it's trivial because all it will do is pass the message on to the `ViewController` class to handle. This is important: we need each card to decide if it was tapped, but we need to pass control onto the `ViewController` class to act upon the tap, otherwise it's possible users might tap two cards at the same time and cause problems.

So, the `cardTapped()` method in the card view controller is simple:

```swift
@objc func cardTapped() {
    delegate.cardTapped(self)
}
```

Of course, that just pushes all the work to the `ViewController` class, where things get more complicated. The `cardTapped()` method there needs to:

- Ensure that only one card can be tapped at any time
- Loop through all the cards in the `allCards` array.
- When it finds the card that was tapped, animate it to flip over then fade away.
- For all other cards, animate them fading away.
- Reset the game after two seconds so that more cards appear.

We'll be doing the animation using methods inside `CardViewController`, and resetting the game is done just by calling `loadCards()`, so that's all straightforward. But what's the best way to ensure that only one card can be chosen by the player?

It turns out this is pretty easy: as soon as the user taps any card, we're going to disable user interaction for our main view. We can then check that property inside the `cardTapped()` method using the `guard` keyword, then set it back to true inside `loadCards()`.

To make things slightly more interesting, I want to introduce you to the `perform()` method family. These exist on objects that inherit from `NSObject`, which is both our view controllers, and allow us to call a method after a delay or in the background really easily.

Let's take this step by step. First, here's the `cardTapped()` method for the `ViewController` class:

```swift
func cardTapped(_ tapped: CardViewController) {
    guard view.isUserInteractionEnabled == true else { return }
    view.isUserInteractionEnabled = false

    for card in allCards {
        if card == tapped {
            card.wasTapped()
            card.perform(#selector(card.wasntTapped), with: nil, afterDelay: 1)
        } else {
            card.wasntTapped()
        }
    }

    perform(#selector(loadCards), with: nil, afterDelay: 2)
}
```

You can see that calls `wasTapped()` and `wasntTapped()` methods in the card view controllers, each of which will perform some animation - we'll get onto that in a moment. Using the `afterDelay` variant of `perform()` will cause `wasntTapped()` to be called after 1 second, and `loadCards()` to be called after 2 seconds.

For now, focus on the first two lines of that method: that's what stops users tapping two cards at once. By disabling the user interaction (and also checking that it was enabled beforehand) we can be sure the user gets to make only one choice. But we do need to re-enable user interaction when we're done, otherwise our app will be useless.

So, add this line somewhere into the `loadCards()` method:

```swift
view.isUserInteractionEnabled = true
```

Now all we need to do is write the `wasTapped()` and `wasntTapped()` methods of the card view controller. We'll do `wasntTapped()` first because it uses code you already know, so re-open <VPIcon icon="fa-brands fa-swift"/>`CardViewController.swift` and add this:

```swift
@objc func wasntTapped() {
    UIView.animate(withDuration: 0.7) {
        self.view.transform = CGAffineTransform(scaleX: 0.00001, y: 0.00001)
        self.view.alpha = 0
    }
}
```

That tells the card to zoom down and fade away over 0.7 seconds. Things are more interesting in the `wasTapped()` method because it needs to animate a 3D flip effect from the card back to the card front. But if you were imagining this was going to be hard, you're wrong: this flip effect has been around since the earliest days of iOS, so Apple made it extremely easy.

Here is the `wasTapped()` method in its entirety:

```swift
func wasTapped() {
    UIView.transition(with: view, duration: 0.7, options: [.transitionFlipFromRight], animations: { [unowned self] in
        self.back.isHidden = true
        self.front.isHidden = false
    })
}
```

As you can see, all the work is done by the `transition(with:)` method. This takes a view to operate on as its first parameter, and all the animations you perform need to be done on subviews of this container view. We pass `.transitionFlipFromRight` to create the flip effect, but you should try using the code completion to explore other options.

Inside the animations block, we just adjust the `isHidden` properties of the front and back image views, but in the context of `.transitionFlipFromRight` that will cause iOS to animate this change as a flip - it really is that simple.

That's it! Run the project now and you'll find you can tap on any card to flip it over - a neat effect with hardly any code. Thanks, iOS!

