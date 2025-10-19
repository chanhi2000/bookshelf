---
lang: ko-KR
title: "Collision detection: SKPhysicsContactDelegate"
description: "Article(s) > Collision detection: SKPhysicsContactDelegate"
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
      content: "Article(s) > Collision detection: SKPhysicsContactDelegate"
    - property: og:description
      content: "Collision detection: SKPhysicsContactDelegate"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/11/04-spinning-slots-skaction.html
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
  "title": "Collision detection: SKPhysicsContactDelegate | Hacking with iOS",
  "desc": "Collision detection: SKPhysicsContactDelegate",
  "link": "https://hackingwithswift.com/read/11/3/04-spinning-slots-skaction",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/etL7NXfpZR8" />

Just by adding a physics body to the balls and bouncers we already have some collision detection because the objects bounce off each other. But it's not being detected by *us*, which means we can't do anything about it.

In this game, we want the player to win or lose depending on how many green or red slots they hit, so we need to make a few changes:

1. Add rectangle physics to our slots.
2. Name the slots so we know which is which, then name the balls too.
3. Make our scene the contact delegate of the physics world - this means, "tell us when contact occurs between two bodies."
4. Create a method that handles contacts and does something appropriate.

The first step is easy enough: add these two lines just before you call `addChild()` for `slotBase`:

```swift
slotBase.physicsBody = SKPhysicsBody(rectangleOf: slotBase.size)
slotBase.physicsBody?.isDynamic = false
```

The slot base needs to be non-dynamic because we don't want it to move out of the way when a player ball hits.

The second step is also easy, but bears some explanation. As with UIKit, it's easy enough to store a variable pointing at specific nodes in your scene for when you want to make something happen, and there are lots of times when that's the right solution.

But for general use, Apple recommends assigning names to your nodes, then checking the name to see what node it is. We need to have three names in our code: good slots, bad slots and balls. This is really easy to do - just modify your `makeSlot(at:)` method so the `SKSpriteNode` creation looks like this:

```swift
if isGood {
    slotBase = SKSpriteNode(imageNamed: "slotBaseGood")
    slotGlow = SKSpriteNode(imageNamed: "slotGlowGood")
    slotBase.name = "good"
} else {
    slotBase = SKSpriteNode(imageNamed: "slotBaseBad")
    slotGlow = SKSpriteNode(imageNamed: "slotGlowBad")
    slotBase.name = "bad"
}
```

Then add this to the code where you create the balls:

```swift
ball.name = "ball"
```

We don't need to name the bouncers, because we don't actually care when their collisions happen.

Now comes the tricky part, which is setting up our scene to be the contact delegate of the physics world. The initial change is easy: we just need to conform to the `SKPhysicsContactDelegate` protocol then assign the physics world's `contactDelegate` property to be our scene. But by default, you still won't get notified when things collide.

What we need to do is change the `contactTestBitMask` property of our physics objects, which sets the contact notifications we want to receive. This needs to introduce a whole new concept - bitmasks - and really it doesn't matter at this point, so we're going to take a shortcut for now, then return to it in a later project.

Let's set up all the contact delegates and bitmasks now. First, make your class conform to the `SKPhysicsContactDelegate` protocol by modifying its definition to this:

```swift
class GameScene: SKScene, SKPhysicsContactDelegate {
```

Then assign the current scene to be the physics world's contact delegate by putting this line of code in `didMove(to:)`, just below where we set the scene's physics body:

```swift
physicsWorld.contactDelegate = self
```

Now for our shortcut: we're going to tell all the ball nodes to set their `contactTestBitMask` property to be equal to their `collisionBitMask`. Two bitmasks, with confusingly similar names but quite different jobs.

The `collisionBitMask` bitmask means "which nodes should I bump into?" By default, it's set to everything, which is why our ball are already hitting each other and the bouncers. The `contactTestBitMask` bitmask means "which collisions do you want to know about?" and by default it's set to nothing. So by setting `contactTestBitMask` to the value of `collisionBitMask` we're saying, "tell me about every collision."

This isn't particularly efficient in complicated games, but it will make no difference at all in this current project. And, like I said, we'll return to this in a later project to explain more. Until then, add this line just before you set each ball's `restitution` property:

```swift
ball.physicsBody!.contactTestBitMask = ball.physicsBody!.collisionBitMask           
```

That’s the only change required for us to detect collisions, so now it's time to write the code that does the hard work.

But first, a little explanation: when contact between two physics bodies occurs, we don't know what order it will come in. That is, did the ball hit the slot, did the slot hit the ball, or did *both* happen? I know this sounds like pointless philosophy, but it's important because we need to know which one is the ball!

Before looking at the actual contact method, I want to look at two other methods first, because this is our ultimate goal. The first one, `collisionBetween()` will be called when a ball collides with something else. The second one, `destroy()` is going to be called when we're finished with the ball and want to get rid of it.

Put these new methods into to your code:

```swift
func collisionBetween(ball: SKNode, object: SKNode) {
    if object.name == "good" {
        destroy(ball: ball)
    } else if object.name == "bad" {
        destroy(ball: ball)
    }
}

func destroy(ball: SKNode) {
    ball.removeFromParent()
}
```

The `removeFromParent()` method removes a node from your node tree. Or, in plain English, it removes the node from your game.

You might look at that and think it's utterly redundant, because no matter what happens it's effectively the same as writing this:

```swift
func collisionBetween(ball: SKNode, object: SKNode) {
    ball.removeFromParent()
}
```

But trust me on this: we're going to make these methods do more shortly, so get it right now and it will save refactoring later.

With those two in place, our contact checking method almost writes itself. We'll get told which two bodies collided, and the contact method needs to determine which one is the ball so that it can call `collisionBetween()` with the correct parameters. This is as simple as checking the names of both properties to see which is the ball, so here's the new method to do contact checking:

```swift
func didBegin(_ contact: SKPhysicsContact) {
    if contact.bodyA.node?.name == "ball" {
        collisionBetween(ball: contact.bodyA.node!, object: contact.bodyB.node!)
    } else if contact.bodyB.node?.name == "ball" {
        collisionBetween(ball: contact.bodyB.node!, object: contact.bodyA.node!)
    }
}
```

If you're particularly observant, you may have noticed that we don't have a special case in there for when both bodies are balls - i.e., if one ball collides with another. This is because our `collisionBetween()` method will ignore that particular case, because it triggers code only if the other node is named "good" or "bad".

Run the game now and you'll start to see things coming together: you can drop balls on the bouncers and they will bounce, but if they touch one of the good or bad slots the balls will be destroyed. It works, but it's boring. Players want to score points so they feel like they achieved something, even if that "something" is just nudging up a number on a CPU.

Before I move on, I want to return to my philosophical question from earlier: “did the ball hit the slot, did the slot hit the ball, or did *both* happen?” That last case won’t happen all the time, but it will happen *sometimes*, and it’s important to take it into account.

If SpriteKit reports a collision twice - i.e. “ball hit slot *and* slot hit ball” - then we have a problem. Look at this line of code:

```swift
collisionBetween(ball: contact.bodyA.node!, object: contact.bodyB.node!)
```

And now this line of code:

```swift
ball.removeFromParent()
```

The first time that code runs, we force unwrap both nodes and remove the ball - so far so good. The *second* time that code runs (for the other half of the same collision), our problem strikes: we try to force unwrap something we already removed, and our game will crash.

To solve this, we’re going to rewrite the `didBegin()` method to be clearer and safer: we’ll use `guard` to ensure both `bodyA` and `bodyB` have nodes attached. If either of them don’t then this is a ghost collision and we can bail out immediately.

```swift
func didBegin(_ contact: SKPhysicsContact) {
    guard let nodeA = contact.bodyA.node else { return }
    guard let nodeB = contact.bodyB.node else { return }

    if nodeA.name == "ball" {
        collisionBetween(ball: nodeA, object: nodeB)
    } else if nodeB.name == "ball" {
        collisionBetween(ball: nodeB, object: nodeA)
    }
}
```

It takes a little more explanation and a little more code, but the result is safer - and that’s always worth striving for!

