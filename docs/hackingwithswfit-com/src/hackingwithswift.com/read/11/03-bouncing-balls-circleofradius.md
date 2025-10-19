---
lang: ko-KR
title: "Bouncing balls: circleOfRadius"
description: "Article(s) > Bouncing balls: circleOfRadius"
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
      content: "Article(s) > Bouncing balls: circleOfRadius"
    - property: og:description
      content: "Bouncing balls: circleOfRadius"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/11/03-bouncing-balls-circleofradius.html
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
  "title": "Bouncing balls: circleOfRadius | Hacking with iOS",
  "desc": "Bouncing balls: circleOfRadius",
  "link": "https://hackingwithswift.com/read/11/3/03-bouncing-balls-circleofradius",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/f-qio_g_D2Y" />

You're not going to get rich out of red rectangles, so let's use balls instead. Take the box code out (everything after `let location =` in `touchesBegan()`) and replace it with this instead:

```swift
let ball = SKSpriteNode(imageNamed: "ballRed")
ball.physicsBody = SKPhysicsBody(circleOfRadius: ball.size.width / 2.0)
ball.physicsBody?.restitution = 0.4
ball.position = location
addChild(ball)
```

There are two new things there. First, we're using the `circleOfRadius` initializer for `SKPhysicsBody` to add circular physics to this ball, because using rectangles would look strange. Second, we're giving the ball's physics body a restitution (bounciness) level of 0.4, where values are from 0 to 1.

Note: the physics body of a node is optional, because it might not exist. We know it exists because we just created it, so it’s not uncommon to see `physicsBody!` to force unwrap the optional.

When you run the game now, you'll be able to tap on the screen to drop bouncy balls. It's fractionally more interesting, but let's face it: this is still a dreadful game.

To make it more exciting we're going to add something for the balls to bounce off. In the Content folder I provided you with is a picture called "bouncer.png", so we're going to place that in the game now.

Just before the end of the `didMove(to:)` method, add this:

```swift
let bouncer = SKSpriteNode(imageNamed: "bouncer")
bouncer.position = CGPoint(x: 512, y: 0)
bouncer.physicsBody = SKPhysicsBody(circleOfRadius: bouncer.size.width / 2.0)
bouncer.physicsBody?.isDynamic = false
addChild(bouncer)
```

There's a new data type in there called `CGPoint`, but, like `CGSize`, it's very simple: it just holds X/Y co-ordinates. Remember, SpriteKit's positions start from the center of nodes, so X:512 Y:0 means "centered horizontally on the bottom edge of the scene."

Also new is the `isDynamic` property of a physics body. When this is true, the object will be moved by the physics simulator based on gravity and collisions. When it's false (as we're setting it) the object will still collide with other things, but it won't ever be moved as a result.

Using this code, the bouncer node will be placed on the screen and your balls can collide with it - but it won't move. Give it a try now.

Adding a bouncer took five lines of code, but our game needs more than one bouncer. In fact, I want five of them, evenly distributed across the screen. Now, you *could* just copy and paste the code five times then change the positions, but I hope you realize there's a better way: creating a method that does all the work, then calling that method each time we want a bouncer.

The method code itself is nearly identical to what you just wrote, with the only change being that we need to position the box at the `CGPoint` specified as a parameter:

```swift
func makeBouncer(at position: CGPoint) {
    let bouncer = SKSpriteNode(imageNamed: "bouncer")
    bouncer.position = position
    bouncer.physicsBody = SKPhysicsBody(circleOfRadius: bouncer.size.width / 2.0)
    bouncer.physicsBody?.isDynamic = false
    addChild(bouncer)
}
```

With that method in place, you can place a bouncer in one line of code: just call `makeBouncer(at:)` with a position, and it will be placed and given a non-dynamic physics body automatically.

You might have noticed that the parameter to `makeBouncer(at:)` has two names: `at` and `position`. This isn’t required, but it makes your code more readable: the first name is the one you use when *calling* the method, and the second name is the one you use *inside* the method. That is, you write `makeBouncer(at:)` to call it, but inside the method the parameter is named `position` rather than `at`. This is identical to `cellForRowAt indexPath` in table views.

To show this off, delete the bouncer code from `didMove(to:)`, and replace it with this:

```swift
makeBouncer(at: CGPoint(x: 0, y: 0))
makeBouncer(at: CGPoint(x: 256, y: 0))
makeBouncer(at: CGPoint(x: 512, y: 0))
makeBouncer(at: CGPoint(x: 768, y: 0))
makeBouncer(at: CGPoint(x: 1024, y: 0))
```

If you run the game now you'll see five bouncers evenly spread across the screen, and the balls you drop bounce off any of them. It's still not a game, but we're getting there. Now to add something between the bouncers…

