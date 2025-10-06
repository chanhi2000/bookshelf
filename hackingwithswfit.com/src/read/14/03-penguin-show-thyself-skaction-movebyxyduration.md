---
lang: ko-KR
title: "Penguin, show thyself: SKAction moveBy(x:y:duration:)"
description: "Article(s) > Penguin, show thyself: SKAction moveBy(x:y:duration:)"
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
      content: "Article(s) > Penguin, show thyself: SKAction moveBy(x:y:duration:)"
    - property: og:description
      content: "Penguin, show thyself: SKAction moveBy(x:y:duration:)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/14/03-penguin-show-thyself-skaction-movebyxyduration.html
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
  "title": "Penguin, show thyself: SKAction moveBy(x:y:duration:) | Hacking with iOS",
  "desc": "Penguin, show thyself: SKAction moveBy(x:y:duration:)",
  "link": "https://hackingwithswift.com/read/14/3/penguin-show-thyself-skaction-movebyxyduration",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/uVr0NqS2QrI" />

We want the slots to manage showing and hiding penguins themselves as needed, which means we need to give them some properties and methods of their own.

The two things a slot needs to know are "am I currently visible to be whacked by the player?" and "have I already been hit?" The former avoids players tapping on slots that are supposed to be invisible; the latter so that players can't whack a penguin more than once.

To track this data, put these two properties at the top of your `WhackSlot` class:

```swift
var isVisible = false
var isHit = false
```

Showing a penguin for the player to tap on will be handled by a new method called `show()`. This will make the character slide upwards so it becomes visible, then set `isVisible` to be true and `isHit` to be false. The movement is going to be created by a new `SKAction`, called `moveBy(x:y:duration:)`.

This method will also decide whether the penguin is good or bad - i.e., whether the player should hit it or not. This will be done using Swift’s `Int.random()` method: one-third of the time the penguin will be good; the rest of the time it will be bad.

To make it clear to the player which is which, we have two different pictures: penguinGood and penguinEvil. We can change the image inside our penguin sprite by changing its `texture` property. This takes a new class called `SKTexture`, which is to `SKSpriteNode` sort of what `UIImage` is to `UIImageView` - it holds image data, but isn't responsible for showing it.

Changing the character node's texture like this is helpful because it means we don't need to keep adding and removing nodes. Instead, we can just change the texture to match what kind of penguin this is, then change the node name to match so we can do tap detection later on.

However, all the above should only happen if the slot isn't already visible, because it could cause havoc. So, the very first thing the method needs to do is check whether `isVisible` is true, and if so exit.

Enough talk; here's the `show()` method:

```swift
func show(hideTime: Double) {
    if isVisible { return }

    charNode.run(SKAction.moveBy(x: 0, y: 80, duration: 0.05))
    isVisible = true
    isHit = false

    if Int.random(in: 0...2) == 0 {
        charNode.texture = SKTexture(imageNamed: "penguinGood")
        charNode.name = "charFriend"
    } else {
        charNode.texture = SKTexture(imageNamed: "penguinEvil")
        charNode.name = "charEnemy"
    }
}
```

You may have noticed that I made the method accept a parameter called `hideTime`. This is for later, to avoid having to rewrite too much code.

The `show()` method is going to be triggered by the view controller on a recurring basis, managed by a property we're going to create called `popupTime`. This will start at 0.85 (create a new enemy a bit faster than once a second), but every time we create an enemy we'll also decrease `popupTime` so that the game gets harder over time.

First, the easy bit: add this property to <VPIcon icon="fa-brands fa-swift"/>`GameScene.swift`:

```swift
var popupTime = 0.85
```

To jump start the process, we need to call `createEnemy()` once when the game starts, then have `createEnemy()` call itself thereafter. Clearly we don't want to start creating enemies as soon as the game starts, because the player needs a few moments to orient themselves so they have a chance.

So, in `didMove(to:)` we're going to call the (as yet unwritten) `createEnemy()` method after a delay. This requires some new Grand Central Dispatch (GCD) code: `asyncAfter()` is used to schedule a closure to execute after the time has been reached.

Here's how the code looks to run a closure after a delay:

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + 1) { [weak self] in
    self?.doStuff()
}
```

The deadline parameter to `asyncAfter()` means “1 second after now,” giving us the 1-second delay.

Now, onto the `createEnemy()` method. This will do several things:

- Decrease `popupTime` each time it's called. I'm going to multiply it by 0.991 rather than subtracting a fixed amount, otherwise the game gets far too fast.
- Shuffle the list of available slots using the `shuffle()` method we've used previously.
- Make the first slot show itself, passing in the current value of `popupTime` for the method to use later.
- Generate four random numbers to see if more slots should be shown. Potentially up to five slots could be shown at once.
- Call itself again after a random delay. The delay will be between `popupTime` halved and `popupTime` doubled. For example, if `popupTime` was 2, the random number would be between 1 and 4.

There are only two new things in there. First, I'll be using the `*=` operator to multiply and assign at the same time, in the same way that `+=` meant "add and assign" in project 2. Second, I'll be using the `RandomDouble()` function to generate a random `Double` value, which is what `asyncAfter()` uses for its delay.

Here's the method to create enemies:

```swift
func createEnemy() {
    popupTime *= 0.991

    slots.shuffle()
    slots[0].show(hideTime: popupTime)

    if Int.random(in: 0...12) > 4 { slots[1].show(hideTime: popupTime) }
    if Int.random(in: 0...12) > 8 {  slots[2].show(hideTime: popupTime) }
    if Int.random(in: 0...12) > 10 { slots[3].show(hideTime: popupTime) }
    if Int.random(in: 0...12) > 11 { slots[4].show(hideTime: popupTime)  }

    let minDelay = popupTime / 2.0
    let maxDelay = popupTime * 2
    let delay = Double.random(in: minDelay...maxDelay)

    DispatchQueue.main.asyncAfter(deadline: .now() + delay) { [weak self] in
        self?.createEnemy()
    }
}
```

Because `createEnemy()` calls itself, all we have to do is call it once in `didMove(to: )` after a brief delay. Put this just before the end of the method:

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + 1) { [weak self] in
    self?.createEnemy()
}
```

From then on, we don't have to worry about it because `createEnemy()` will call itself.

Before we're done, we need to upgrade the `WhackSlot` class to include a `hide()` method. If you run the code now, you'll see that the penguins appear nice and randomly, but they never actually go away. We're already passing a `hideTime` parameter to the `show()` method, and we're going to use that so the slots hide themselves after they have been visible for a time.

We could of course just make the slots hide after a fixed time, but that's no fun. By using `popupTime` as the input for hiding delay, we know the penguins will hide themselves more quickly over time.

First, add this method to the `WhackSlot` class:

```swift
func hide() {
    if !isVisible { return }

    charNode.run(SKAction.moveBy(x: 0, y: -80, duration: 0.05))
    isVisible = false
}
```

That just undoes the results of `show()`: the penguin moves back down the screen into its hole, then its `isVisible` property is set to false.

We want to trigger this method automatically after a period of time, and, through extensive testing (that is, sitting around playing) I have determined the optimal hide time to be 3.5x `popupTime`.

So, put this code at end of show():

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + (hideTime * 3.5)) { [weak self] in
    self?.hide()
}
```

Go ahead and run the app, because it's really starting to come together: the penguins show randomly, sometimes by themselves and sometimes in groups, then hide after a period of being visible. But you can't hit them, which means this game is more Watch-a-Penguin than Whack-a-Penguin. Let's fix that!

