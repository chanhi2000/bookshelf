---
lang: ko-KR
title: "Tilt to move: CMMotionManager"
description: "Article(s) > Tilt to move: CMMotionManager"
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
      content: "Article(s) > Tilt to move: CMMotionManager"
    - property: og:description
      content: "Tilt to move: CMMotionManager"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/26/03-tilt-to-move-cmmotionmanager.html
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
  "title": "Tilt to move: CMMotionManager | Hacking with iOS",
  "desc": "Tilt to move: CMMotionManager",
  "link": "https://hackingwithswift.com/read/26/3/tilt-to-move-cmmotionmanager",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/dbDIQt4oxxA" />

We're going to control this game using the accelerometer that comes as standard on all iPads, but it has a problem: it doesn't come as standard on any Macs, which means we either resign ourselves to testing only on devices or we put in a little hack. This course isn't calling Giving Up with Swift, so we're going to add a hack - in the simulator you'll be able to use touch, and on devices you'll have to use tilting.

To get started, add this property so we can reference the player throughout the game:

```swift
var player: SKSpriteNode!
```

We're going to add a dedicated `createPlayer()` method that loads the sprite, gives it circle physics, and adds it to the scene, but it's going to do three other things that are important.

First, it's going to set the physics body's `allowsRotation` property to be false. We haven't changed that so far, but it does what you might expect - when false, the body no longer rotates. This is useful here because the ball looks like a marble: it's shiny, and those reflections wouldn't rotate in real life.

Second, we're going to give the ball a `linearDamping` value of 0.5, which applies a lot of friction to its movement. The game will still be hard, but this does help a little by slowing the ball down naturally.

Finally, we'll be combining three values together to get the ball's `contactTestBitMask`: the star, the vortex and the finish.

Here's the code for `createPlayer()`:

```swift
func createPlayer() {
    player = SKSpriteNode(imageNamed: "player")
    player.position = CGPoint(x: 96, y: 672)
    player.zPosition = 1
    player.physicsBody = SKPhysicsBody(circleOfRadius: player.size.width / 2)
    player.physicsBody?.allowsRotation = false
    player.physicsBody?.linearDamping = 0.5

    player.physicsBody?.categoryBitMask = CollisionTypes.player.rawValue
    player.physicsBody?.contactTestBitMask = CollisionTypes.star.rawValue | CollisionTypes.vortex.rawValue | CollisionTypes.finish.rawValue
    player.physicsBody?.collisionBitMask = CollisionTypes.wall.rawValue
    addChild(player)
}
```

You can go ahead and add a call to `createPlayer()` directly after the call to `loadLevel()` inside `didMove(to:)`. Note: you must create the player after the level, otherwise it will appear below vortexes and other level objects.

If you try running the game now, you'll see the ball drop straight down until it hits a wall, then it bounces briefly and stops. This game has players looking down on their iPad, so by default there ought to be no movement - it's only if the player tilts their iPad down that the ball should move downwards.

The ball is moving because the scene's physics world has a default gravity roughly equivalent to Earth's. We don't want that, so in `didMove(to:)` add this somewhere:

```swift
physicsWorld.gravity = .zero
```

Playing the game *now* hasn't really solved much: sure, the ball isn't moving now, but… the ball isn't moving now! This would make for a pretty terrible game on the App Store.

Before we get onto how to work with the accelerometer, we're going to put together a hack that lets you simulate the experience of moving the ball using touch. What we're going to do is catch `touchesBegan()`, `touchesMoved()`, and `touchesEnded()`, and use them to set or unset a new property called `lastTouchPosition`. Then in the `update()` method we'll subtract that touch position from the player's position, and use it set the world's gravity.

It's a hack. And if you're happy to test on a device, you don't really need it. But if you're stuck with the iOS Simulator or are just curious, let's put in the hack. First, declare the new property:

```swift
var lastTouchPosition: CGPoint?
```

Now use `touchesBegan()` and `touchesMoved()` to set the value of that property using the same three lines of code, like this:

```swift
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    guard let touch = touches.first else { return }
    let location = touch.location(in: self)
    lastTouchPosition = location
}

override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
    guard let touch = touches.first else { return }
    let location = touch.location(in: self)
    lastTouchPosition = location
}
```

When `touchesEnded()` is called, we need to set the property to be `nil` - it is optional, after all:

```swift
override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
    lastTouchPosition = nil
}
```

Easy, I know, but it gets (only a little!) trickier in the `update()` method. This needs to unwrap our optional property, calculate the difference between the current touch and the player's position, then use that to change the `gravity` value of the physics world. Here it is:

```swift
override func update(_ currentTime: TimeInterval) {
    if let currentTouch = lastTouchPosition {
        let diff = CGPoint(x: currentTouch.x - player.position.x, y: currentTouch.y - player.position.y)
        physicsWorld.gravity = CGVector(dx: diff.x / 100, dy: diff.y / 100)
    }
}
```

This is clearly not a permanent solution, but it's good enough that you can run the app now and test it out.

Now for the new bit: working with the accelerometer. This is easy to do, which is remarkable when you think how much is happening behind the scenes.

All motion detection is done with an Apple framework called Core Motion, and most of the work is done by a class called `CMMotionManager`. Using it here won't require any special user permissions, so all we need to do is create an instance of the class and ask it to start collecting information. We can then read from that information whenever and wherever we need to, and in this project the best place is `update()`.

Add `import CoreMotion` just above the `import SpriteKit` line at the top of your game scene, then add this property:

```swift
var motionManager: CMMotionManager!
```

Now it's just a matter of creating the object and asking it start collecting accelerometer data. This is done using the `startAccelerometerUpdates()` method, which instructs Core Motion to start collecting accelerometer information we can read later. Put this this into `didMove(to:)`:

```swift
motionManager = CMMotionManager()
motionManager.startAccelerometerUpdates()
```

The last thing to do is to poll the motion manager inside our `update()` method, checking to see what the current tilt data is. But there's a complication: we already have a hack in there that lets us test in the simulator, so we want one set of code for the simulator and one set of code for devices.

Swift solves this problem by adding special compiler instructions. If the instruction evaluates to true it will compile one set of code, otherwise it will compile the other. This is particularly helpful once you realize that any code wrapped in compiler instructions that evaluate to false never get seen - it's like they never existed. So, this is a great way to include debug information or activity in the simulator that never sees the light on devices.

The compiler directives we care about are: `#if targetEnvironment(simulator)`, `#else` and `#endif`. As you can see, this is mostly the same as a standard Swift if/else block, although here you don't need braces because everything until the `#else` or `#endif` will execute.

The code to read from the accelerometer and apply its tilt data to the world gravity look like this:

```swift
if let accelerometerData = motionManager.accelerometerData {
    physicsWorld.gravity = CGVector(dx: accelerometerData.acceleration.y * -50, dy: accelerometerData.acceleration.x * 50)
}
```

The first line safely unwraps the optional accelerometer data, because there might not be any available. The second line changes the gravity of our game world so that it reflects the accelerometer data. You're welcome to adjust the speed multipliers as you please; I found a value of 50 worked well.

Note that I passed accelerometer Y to `CGVector`'s X and accelerometer X to `CGVector`'s Y. This is not a typo! Remember, your device is rotated to landscape right now, which means you also need to flip your coordinates around.

We need to put that code inside the current `update()` method, wrapped inside the new compiler directives. Here's how the method should look now:

```swift
override func update(_ currentTime: TimeInterval) {
#if targetEnvironment(simulator)
    if let currentTouch = lastTouchPosition {
        let diff = CGPoint(x: currentTouch.x - player.position.x, y: currentTouch.y - player.position.y)
        physicsWorld.gravity = CGVector(dx: diff.x / 100, dy: diff.y / 100)
    }
#else
    if let accelerometerData = motionManager.accelerometerData {
        physicsWorld.gravity = CGVector(dx: accelerometerData.acceleration.y * -50, dy: accelerometerData.acceleration.x * 50)
    }
#endif
}
```

If you can test on a device, please do. It took only a few lines of code, but the game is now adapting beautifully to device tilting!

