---
lang: ko-KR
title: "Optimizing SpriteKit physics"
description: "Article(s) > Optimizing SpriteKit physics"
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
      content: "Article(s) > Optimizing SpriteKit physics"
    - property: og:description
      content: "Optimizing SpriteKit physics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/36/07-optimizing-spritekit-physics.html
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hacking with iOS – learn to code iPhone and iPad apps with free Swift tutorials",
  "desc": "Learn Swift coding for iOS with these free tutorials – learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/read/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Optimizing SpriteKit physics | Hacking with iOS",
  "desc": "Optimizing SpriteKit physics",
  "link": "https://hackingwithswift.com/read/36/7/optimizing-spritekit-physics",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

If you play our game on a real device, you’ll notice a problem: whenever new rocks are created off-screen, the game freezes briefly. It’s not a lot – maybe a tenth of a second depending on your device – but it’s still enough to be noticeable. You might also notice there’s a short delay the first time the player dies – try watching the particle system and you’ll see it’s far from smooth, at least the first time.

Both of these are optimization problems, and both can be fixed with a small amount of thinking. I know you might be tempted to move on to the next project, but trust me – spending a little time adding extra polish is good for you!

The reason our game pauses when rocks are created is because SpriteKit loads the rock texture and calculates pixel-perfect collisions for it. Although it’s an implementation detail – i.e., something we shouldn’t need to think about – SpriteKit will actually cache its textures for us, so although we can and should cache our rock texture it’s not the big problem here.

Instead, it’s that pesky pixel-perfect collision calculation: scanning the rock texture to see which pixels are transparent, so SpriteKit knows which parts we can crash into.

Now, if you think about it this pixel scanning doesn’t need to take place every time we create a new rock. In fact, it only needs to be run *once*: figure out the shape of the rock, then use copies of that physics body for all new rocks in the future. As all the rocks have the same shape, this means we do the work once and every future rock creation is effectively free.

To make that happen we need to add two new properties to our game scene: one to store the rock texture, and one to store the rock physics body. Add these now:

```swift
let rockTexture = SKTexture(imageNamed: "rock")
var rockPhysics: SKPhysicsBody!
```

Next, in `didMove(to:)` we need to create an `SKPhysicsBody` from our rock texture and store it in that `rockPhysics` property for later on:

```swift
rockPhysics = SKPhysicsBody(texture: rockTexture, size: rockTexture.size())
```

Now for the important part: now that we have our rock physics calculated, we should use *that* for the `topRock` and `bottomRock` physics bodies in the `createRocks()` method. Now, we can’t just assign it directly, because SpriteKit needs all its physics bodies to be unique. However, we can call *copy()* on our original to create a new instance, then typecast that as an `SKPhysicsBody`.

So, please modify the physics code in `createRocks()` to this:

```swift
topRock.physicsBody = rockPhysics.copy() as? SKPhysicsBody
bottomRock.physicsBody = rockPhysics.copy() as? SKPhysicsBody
```

That will remove the speed bump when creating new rocks, which means our game should stay nice and smooth while playing.

As for the other problem – the little speed bump when the player first dies – this is solved with another cache, this time for the player’s explosion. Even though this won’t be used in our game, this will force SpriteKit to preload the texture and keep it in memory, so it’s already there when it’s really needed.

So, please add this third property now:

```swift
let explosion = SKEmitterNode(fileNamed: "PlayerExplosion")
```

Done!
