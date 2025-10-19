---
lang: ko-KR
title: "Pixel-perfect physics in SpriteKit, plus explosions and more"
description: "Article(s) > Pixel-perfect physics in SpriteKit, plus explosions and more"
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
      content: "Article(s) > Pixel-perfect physics in SpriteKit, plus explosions and more"
    - property: og:description
      content: "Pixel-perfect physics in SpriteKit, plus explosions and more"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/36/05-pixel-perfect-physics-in-spritekit-plus-explosions-and-more.html
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
  "title": "Pixel-perfect physics in SpriteKit, plus explosions and more | Hacking with iOS",
  "desc": "Pixel-perfect physics in SpriteKit, plus explosions and more",
  "link": "https://hackingwithswift.com/read/36/5/pixel-perfect-physics-in-spritekit-plus-explosions-and-more",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Everything in our game is configured to look good, but it's not actually playable yet. Surprisingly, you're now only about 10 minutes away from a fully working game, because as soon as we add in a few physics calls the game is good to go.

As you might imagine, Flappy Bird is a game where physics really matters. The player's plane has physics, the rocks have physics, the ground has physics, and there's also gravity pulling the player inevitably downwards towards their doom. So, we need to make sure we are told when collisions happen, which means we need to conform to the `SKPhysicsContactDelegate` protocol. Change your `GameScene` class's definition to this:

```swift
class GameScene: SKScene, SKPhysicsContactDelegate {
```

Now in your `didMove(to:)` method you want to make the SpriteKit physics world report collisions to the game scene so they can be acted upon. We're also going to use this opportunity to adjust the gravity of the physics world - you can set this to any value you want, but be warned: the game is hard enough without massive amounts of gravity!

Add these two lines to `didMove(to:)`:

```swift
physicsWorld.gravity = CGVector(dx: 0.0, dy: -5.0)
physicsWorld.contactDelegate = self
```

So: physics. Let's start by adding physics to the player. To make things fair, we're going to use pixel-perfect collision detection to maximize the player's chance of survival, and SpriteKit makes this really easy to do. In your `createPlayer()` method, just after the call to `addChild()`, add this:

```swift
player.physicsBody = SKPhysicsBody(texture: playerTexture, size: playerTexture.size())
player.physicsBody!.contactTestBitMask = player.physicsBody!.collisionBitMask
player.physicsBody?.isDynamic = true

// player.physicsBody?.collisionBitMask = 0
```

Those four lines of code pack in a lot of functionality, and might not make sense right away so let me break it down:

1. The first line sets up pixel-perfect physics using the sprite of the plane. This sprite animates, but the difference is so tiny it won't matter.
2. The second line makes SpriteKit tell us whenever the player collides with anything. This is wasteful in some games, but here the player dies if they touch anything so it's the right thing to do.
3. The third line makes the plane respond to physics. This is the default, but I'm including it here because we'll change it later.
4. The last line makes the plane bounce off nothing, or at least it would do if it weren't commented out. I've made it commented out just for a moment so you can see it's working - I'll tell you when to remove the comment.

You might think lines 2 and 4 contradict each other, but they don't and they are both needed. SpriteKit distinguishes between contact (two things touched) and collision (two things should bounce off each other in the physics world). We want our plane to notify us if it touches anything - any rock, the score counter red rectangles, or the ground. But we *don't* want it to bounce off them, because we don't want the player to lose any momentum when they touch the hidden score counters.

Don't bother running the game just yet, because all you'll see is the player falling off the screen! To make things interesting we need to make some more changes first.

In the `createGround()` method, just before the call to `addChild()`, add this:

```swift
ground.physicsBody = SKPhysicsBody(texture: ground.texture!, size: ground.texture!.size())
ground.physicsBody?.isDynamic = false
```

That sets up pixel-perfect collision for the ground sprites, but makes them non-dynamic - that is, they will respond to physics in the game so that the plane hits the ground, but they won't get moved by the physics. Without this line the ground would drop off the screen thanks to gravity.

We can start to approach a playable game by making just two more changes. First, add these two lines to `touchesBegan()`:

```swift
player.physicsBody?.velocity = CGVector(dx: 0, dy: 0)
player.physicsBody?.applyImpulse(CGVector(dx: 0, dy: 20))
```

The second line means "give the player a push upwards every time the player taps the screen." The first line is there to make the physics a bit more realistic and it effectively neutralizes any existing upward velocity the player has before applying the new movement. Without that, the player could tap multiple times quickly and apply a huge upwards force to the plane, sending them miles off the top of the screen. With that line, the plane behaves much more like the "dodo" plane in the game *Grand Theft Auto: Vice City* - each upward thrust adds only a tiny bit of lift.

The second change is to make the player's movement more dramatic. It's going to take 1/1000th of the player's upward velocity (a tiny amount) and turn that into rotation. This means that when the player is moving upwards the plane tilts up a little, and when the player is falling the plane tilts down. It's a simple effect, but it really highlights the player's impending doom!

To make the effect nicer we'll add it as a `rotate(toAngle:)` action over a tenth of a second. This smooths out the rotation a little, but because it's happening more slowly than the game's frame rate it effectively means the rotation animation is always happening.

All this is going to happen in the `update()` method, which is called by SpriteKit once every frame so we can update our game world with any custom logic. You should have deleted that as part of the standard cleaning for Xcode’s SpriteKit template, but it’s easy to put back now:

```swift
override func update(_ currentTime: TimeInterval) {
    let value = player.physicsBody!.velocity.dy * 0.001
    let rotate = SKAction.rotate(toAngle: value, duration: 0.1)

    player.run(rotate)
}
```

If you run your game now you'll see it's almost playable: the player falls towards the ground, and tapping keeps them in flight just a little bit longer. You can't collide with the rocks, but you *can* collide with the ground because of that commented line that modified `collisionBitMask`. I made it commented because you should be able to fly your play around then crash into the ground in various interesting ways - it's the best (read: most fun!) way to make sure your physics are configured correctly.

::: note

Please uncomment that line of code now so that the player can no longer bounce off the ground.

:::

Now for the interesting part: adding physics to the rocks. This is going to use pixel-perfect collisions for the rocks themselves, and rectangle physics for the red scoring rectangle. All three of them need to have their `isDynamic` property set to `false` so your rocks don't fall of the screen.

So, we're going to make three changes, all in the `createRocks()` method. The first is just after the `let topRock =` line - add these two lines of code:

```swift
topRock.physicsBody = SKPhysicsBody(texture: rockTexture, size: rockTexture.size())
topRock.physicsBody?.isDynamic = false
```

The second change is just after the `let bottomRock =` line - add these two lines of code:

```swift
bottomRock.physicsBody = SKPhysicsBody(texture: rockTexture, size: rockTexture.size())
bottomRock.physicsBody?.isDynamic = false
```

Finally, add these two lines of code just after the `let rockCollision =` line:

```swift
rockCollision.physicsBody = SKPhysicsBody(rectangleOf: rockCollision.size)
rockCollision.physicsBody?.isDynamic = false
```

Again, we're using pixel-perfect collision for the rocks and simple rectangle physics for the score collision rectangle. It's worth me saying that per-pixel collision detection is substantially slower than rectangle- and circle-based detection, but in our simple game it's perfectly OK.

Before you run the game again, I'd like you to make one more change. Go to <VPIcon icon="fa-brands fa-swift"/>`GameViewController.swift` and you'll see these two lines of code:

```swift
view.showsFPS = true
view.showsNodeCount = true
```

We've just added quite a lot of physics to our game, and physics can be annoying to debug because it's invisible. Or at least it's invisible *by default* - SpriteKit can actually draw faint blue lines around all our game physics, which really helps make sure everything is configured correctly. Add these new line below the previous two:

```swift
view.showsPhysics = true
```

If you run the game now and look closely you should be able to see the blue physics lines all around the rocks, ground and even the player. It's such a small thing, but trust me: it's a real time saver!

We still have one more thing to do before our game starts to be playable, and that's to add collisions between the player's plane and pretty much everything else in the game. We already configured the player to report back whenever it touches anything else that has physics, so we now need to implement the `didBegin()` method and take appropriate action.

First: what happens when the player touches a red score rectangle? Well, we gave those rectangles a specific name - "scoreDetect" - which means we can check to see whether the collision involved a node named "scoreDetect" and, if so, it means the player passed through the rocks. When that happens we're going to remove the score rectangle from the game (so they can't somehow score double points by accident), play the "coin.wav" sound effect, and increment the score by one.

Here's the code - add this method to your `GameScene` class, just below `update()`:

```swift
func didBegin(_ contact: SKPhysicsContact) {
    if contact.bodyA.node?.name == "scoreDetect" || contact.bodyB.node?.name == "scoreDetect" {
        if contact.bodyA.node == player {
            contact.bodyB.node?.removeFromParent()
        } else {
            contact.bodyA.node?.removeFromParent()
        }

        let sound = SKAction.playSoundFileNamed("coin.wav", waitForCompletion: false)
        run(sound)

        score += 1

        return
    }

    guard contact.bodyA.node != nil &amp;&amp; contact.bodyB.node != nil else {
        return
    }
}
```

There are five important things to note in that code:

1. It checks to see whether the contact's `bodyA` or `bodyB` property was a score detection rectangle. This is because we don't know whether the player collided with the rectangle or the ectangle collided with the player. That might sound weirdly philosophical, but trust me: it matters.
2. When you first play a sound in the simulator, expect your game to pause for half a second while the sound engine is initialized. This doesn't happen on devices, but it does make this game extremely hard - at least until we fix it in the next chapter.
3. Adding one to the `score` property triggers the `didSet` property observer we created earlier, which means the score label will be updated.
4. I added a `return` line to the end because if the player collides with anything else we want to destroy them. This just means, "you hit something safe; don't continue in this method."
5. The `guard` at the end avoids a common problem. When the player hits a “scoreDetect” node it’s possible *two* collisions are triggered: “player hit score detect” and “score detect hit player”. The first time our code works, but the second time the “scoreDetect” node has been removed so the game considers the player destroyed. The `guard` avoids that by skipping any collisions where either node has become nil.

And now for the really interesting bit: making the player die when they touch any rock or the ground. Because the player's physics are configured to report back contact with absolutely everything, and because we just made `didBegin()` exit if the player touches a scoring rectangle, we can be sure that any code coming after our previous additions will only be executed if the player hit a rock or the ground.

When this happens, we want the player to die and the game to end. So, if the collision is between the player and anything else, we're going to create a smoky particle effect using the PlayerExplosion.sks asset you copied in at the beginning, play "explosion.wav", remove the player from the game, then change the game's `speed` property to be 0.

Add this code just before the end of `didBegin()`:

```swift
if contact.bodyA.node == player || contact.bodyB.node == player {
    if let explosion = SKEmitterNode(fileNamed: "PlayerExplosion") {
        explosion.position = player.position
        addChild(explosion)
    }

    let sound = SKAction.playSoundFileNamed("explosion.wav", waitForCompletion: false)
    run(sound)

    player.removeFromParent()
    speed = 0
}
```

All that is old except for the last line: the `speed` property. All SpriteKit nodes can have actions attached to them, and by default they all run in real time - that is, one second in an action is equal to one second on a real clock.

This `speed` property is a time multiplier that lets you adjust how fast actions attached to a node should run. It's 1.0 by default (real time), but you could make it 2.0 to make actions happen twice as fast. That is, "fade out over 5 seconds" would actually become "fade out over 2.5 seconds."

We're adjusting the `speed` property to 0 for our game scene, which in turns get inherited by all children - i.e., everything in the game. This has the effect of halting all those move actions we added to make parallax scrolling work, effectively ending the game.

If you run the game now you'll see it's basically done: you can tap to fly high, stop tapping to fall, fly through rocks to score points, or crash into something else to die in an explosion. We could very easily stop here, but I'm going to go a bit further and add some extra polish. Partly because polish is fun, but mostly because it gives me a chance to introduce you to another useful SpriteKit feature…

