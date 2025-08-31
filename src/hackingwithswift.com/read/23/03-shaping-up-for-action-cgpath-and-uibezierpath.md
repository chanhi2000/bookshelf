---
lang: ko-KR
title: "Shaping up for action: CGPath and UIBezierPath"
description: "Article(s) > Shaping up for action: CGPath and UIBezierPath"
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
      content: "Article(s) > Shaping up for action: CGPath and UIBezierPath"
    - property: og:description
      content: "Shaping up for action: CGPath and UIBezierPath"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/23/03-shaping-up-for-action-cgpath-and-uibezierpath.html
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
  "title": "Shaping up for action: CGPath and UIBezierPath | Hacking with iOS",
  "desc": "Shaping up for action: CGPath and UIBezierPath",
  "link": "https://hackingwithswift.com/read/23/3/shaping-up-for-action-cgpath-and-uibezierpath",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/ztVwxIpMwiI" />

Like I already explained, we're going to keep an array of the user's swipe points so that we can draw a shape resembling their slicing. To make this work, we're going to need four new methods, two of which you've met already. They are: `touchesBegan()`, `touchesMoved()`, `touchesEnded()` and `redrawActiveSlice()`. You already know how `touchesBegan()` and `touchesMoved()` works, and the other "touches" methods all work the same way.

First things first: add this new property to your class so that we can store swipe points:

```swift
var activeSlicePoints = [CGPoint]()
```

We're going to tackle the two easiest methods first: `touchesMoved()` and `touchesEnded()`. All the `touchesMoved()` method needs to do is figure out where in the scene the user touched, add that location to the slice points array, then redraw the slice shape, so that's easy enough:

```swift
override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
    guard let touch = touches.first else { return }
    let location = touch.location(in: self)
    activeSlicePoints.append(location)
    redrawActiveSlice()
}
```

When the user finishes touching the screen, `touchesEnded()` will be called. I'm going to make this method fade out the slice shapes over a quarter of a second. We *could* remove them immediately but that looks ugly, and leaving them sitting there for no reason would rather destroy the effect. So, fading it is - add this `touchesEnded()` method:

```swift
override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
    activeSliceBG.run(SKAction.fadeOut(withDuration: 0.25))
    activeSliceFG.run(SKAction.fadeOut(withDuration: 0.25))
}
```

You haven't used the `fadeOut(withDuration:)` action before, but I think it's pretty obvious what it does!

So far this is all easy stuff, but we're going to look at an interesting method now: `touchesBegan()`. One we’ve read out the touch from the `UITouch` set, this needs to do several things:

1. Remove all existing points in the `activeSlicePoints` array, because we're starting fresh.
2. Get the touch location and add it to the `activeSlicePoints` array.
3. Call the (as yet unwritten) `redrawActiveSlice()` method to clear the slice shapes.
4. Remove any actions that are currently attached to the slice shapes. This will be important if they are in the middle of a `fadeOut(withDuration:)` action.
5. Set both slice shapes to have an alpha value of 1 so they are fully visible.

We can convert that to code with ease - in fact, I've put numbered comments in the code below so you can match them up to the points above:

```swift
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    guard let touch = touches.first else { return }

    // 1  
    activeSlicePoints.removeAll(keepingCapacity: true)

    // 2
    let location = touch.location(in: self)
    activeSlicePoints.append(location)

    // 3
    redrawActiveSlice()

    // 4
    activeSliceBG.removeAllActions()
    activeSliceFG.removeAllActions()

    // 5
    activeSliceBG.alpha = 1
    activeSliceFG.alpha = 1
}
```

So, there's some challenge there but not a whole lot. Where it gets interesting is the `redrawActiveSlice()` method, because this is going to use a `UIBezierPath` that will be used to connect our swipe points together into a single line.

As with the previous method, let's take a look at what `redrawActiveSlice()` needs to do:

1. If we have fewer than two points in our array, we don't have enough data to draw a line so it needs to clear the shapes and exit the method.
2. If we have more than 12 slice points in our array, we need to remove the oldest ones until we have at most 12 - this stops the swipe shapes from becoming too long. 
3. It needs to start its line at the position of the first swipe point, then go through each of the others drawing lines to each point.
4. Finally, it needs to update the slice shape paths so they get drawn using their designs - i.e., line width and color.

To make this work, you're going to need to know that an `SKShapeNode` object has a property called `path` which describes the shape we want to draw. When it's `nil`, there's nothing to draw; when it's set to a valid path, that gets drawn with the `SKShapeNode`'s settings. `SKShapeNode` expects you to use a data type called `CGPath`, but we can easily create that from a `UIBezierPath`.

Drawing a complex path using `UIBezierPath` is a cinch: we'll use its `move(to:)` method to position the start of our lines, then loop through our `activeSlicePoints` array and call the path's `addLine(to:)` method for each point.

To stop the array storing more than 12 slice points, we’re going new method called `removeFirst()`, which lets us remove a certain number of items from the start of an array. In this case we know we want at most 12, so we can subtract 12 from our current count to see how many excess we have, and pass that to `removeFirst()`.

I'm going to insert numbered comments into the code again to help you match up the goals with the code more easily:

```swift
func redrawActiveSlice() {
    // 1
    if activeSlicePoints.count < 2 {
        activeSliceBG.path = nil
        activeSliceFG.path = nil
        return
    }

    // 2
    if activeSlicePoints.count > 12 {
        activeSlicePoints.removeFirst(activeSlicePoints.count - 12)
    }

    // 3
    let path = UIBezierPath()
    path.move(to: activeSlicePoints[0])

    for i in 1 ..< activeSlicePoints.count {
        path.addLine(to: activeSlicePoints[i])
    }

    // 4
    activeSliceBG.path = path.cgPath
    activeSliceFG.path = path.cgPath
}
```

At this point, we have something you can run: press <kbd>Cmd</kbd>+<kbd>R</kbd> to run the game, then tap and swipe around on the screen to see the slice effect - I think you'll agree that `SKShapeNode` is pretty powerful!

![As the player swipes, their slices light up the screen in a bright yellow curve.](https://hackingwithswift.com/img/books/hws/23-2@2x.png)

Before we're done with the slice effect, we're going to add one more thing: a "swoosh" sound that plays as you swipe around. You've already seen the `playSoundFileNamed()` method of `SKAction`, but we're going to use it a little differently here.

You see, if we just played a swoosh every time the player moved, there would be 100 sounds playing at any given time - one for every small movement they made. Instead, we want only one swoosh to play at once, so we're going to set to true a property called `isSwooshSoundActive`, make the `waitForCompletion` of our `SKAction` true, then use a completion closure for `runAction()` so that `isSwooshSoundActive` is set to false.

So, when the player first swipes we set `isSwooshSoundActive` to be true, and only when the swoosh sound has finished playing do we set it back to false again. This will allow us to ensure only one swoosh sound is playing at a time.

First, give your class this new property:

```swift
var isSwooshSoundActive = false
```

Now we need to check whether that's false when `touchesMoved()` is called, and, if it is false, call a new method called `playSwooshSound()`. Add this to code just before the end of `touchesMoved()`:

```swift
if !isSwooshSoundActive {
    playSwooshSound()
}
```

I've provided you with three different swoosh sounds, all of which are effectively the same just at varying pitches. The `playSwooshSound()` method needs to set `isSwooshSoundActive` to be true (so that no other swoosh sounds are played until we're ready), play one of the three sounds, then when the sound has finished set `isSwooshSoundActive` to be false again so that another swoosh sound can play.

By playing our sound with `waitForCompletion` set to true, SpriteKit automatically ensures the completion closure given to `runAction()` isn't called until the sound has finished, so this solution is perfect.

```swift
func playSwooshSound() {
    isSwooshSoundActive = true

    let randomNumber = Int.random(in: 1...3)
    let soundName = "swoosh\(randomNumber).caf"

    let swooshSound = SKAction.playSoundFileNamed(soundName, waitForCompletion: true)

    run(swooshSound) { [weak self] in
        self?.isSwooshSoundActive = false
    }
}
```

If you try running the game now you should hear only one swipe sound at a time.

