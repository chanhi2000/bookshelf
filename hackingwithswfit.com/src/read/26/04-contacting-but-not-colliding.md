---
lang: ko-KR
title: "Contacting but not colliding"
description: "Article(s) > Contacting but not colliding"
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
      content: "Article(s) > Contacting but not colliding"
    - property: og:description
      content: "Contacting but not colliding"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/26/04-contacting-but-not-colliding.html
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
  "title": "Contacting but not colliding | Hacking with iOS",
  "desc": "Contacting but not colliding",
  "link": "https://hackingwithswift.com/read/26/4/contacting-but-not-colliding",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/9T0sJKNM2Tc" />

All the game is missing now is some challenge, and that's where our star and vortex level elements come in. Players will get one point for every star they collect, and lose one point every time they fall into a vortex. To track scores, we need a property to hold the score and a label to show it, so add these now:

```swift
var scoreLabel: SKLabelNode!

var score = 0 {
    didSet {
        scoreLabel.text = "Score: \(score)"
    }
}
```

We're going to show the label in the top-left corner of the screen, so add this to `didMove(to:)`:

```swift
scoreLabel = SKLabelNode(fontNamed: "Chalkduster")
scoreLabel.text = "Score: 0"
scoreLabel.horizontalAlignmentMode = .left
scoreLabel.position = CGPoint(x: 16, y: 16)
scoreLabel.zPosition = 2
addChild(scoreLabel)
```

When a collision happens, we need to figure out whether it was the player colliding with a star, or the star colliding with a player - the same semi-philosophical problem we had in project 11. And our solution is identical too: figure out which is which, then call another method.

First, we need to make ourselves the contact delegate for the physics world, so make your class conform to `SKPhysicsContactDelegate` then add this line in `didMove(to:)`:

```swift
physicsWorld.contactDelegate = self
```

We already know which node is our player, which means we know which node *isn't* our player. This means our `didBegin()` method is easy:

```swift
func didBegin(_ contact: SKPhysicsContact) {
    guard let nodeA = contact.bodyA.node else { return }
    guard let nodeB = contact.bodyB.node else { return }

    if nodeA == player {
        playerCollided(with: nodeB)
    } else if nodeB == player {
        playerCollided(with: nodeA)
    }
}
```

There are three types of collision we care about: when the player hits a vortex they should be penalized, when the player hits a star they should score a point, and when the player hits the finish flag the next level should be loaded. I'll deal with the first two here, and you can think about the third one yourself!

When a player hits a vortex, a few things need to happen. Chief among them is that we need to stop the player controlling the ball, which will be done using a single boolean property called `isGameOver`. Add this property now:

```swift
var isGameOver = false
```

You'll need to modify your `update()` method so that it works only when `isGameOver` is false, like this:

```swift
override func update(_ currentTime: TimeInterval) {
    guard isGameOver == false else { return }

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

Of course, a number of other things need to be done when a player collides with a vortex:


- We need to stop the ball from being a dynamic physics body so that it stops moving once it's sucked in.
- We need to move the ball over the vortex, to simulate it being sucked in. It will also be scaled down at the same time.
- Once the move and scale has completed, we need to remove the ball from the game.
- After all the actions complete, we need to create the player ball again and re-enable control.

We'll put that together using an `SKAction` sequence, followed by a trailing closure that will execute when the actions finish. When colliding with a star, we just remove the star node from the scene and add one to the score.

```swift
func playerCollided(with node: SKNode) {
    if node.name == "vortex" {
        player.physicsBody?.isDynamic = false
        isGameOver = true
        score -= 1

        let move = SKAction.move(to: node.position, duration: 0.25)
        let scale = SKAction.scale(to: 0.0001, duration: 0.25)
        let remove = SKAction.removeFromParent()
        let sequence = SKAction.sequence([move, scale, remove])

        player.run(sequence) { [weak self] in
            self?.createPlayer()
            self?.isGameOver = false
        }
    } else if node.name == "star" {
        node.removeFromParent()
        score += 1
    } else if node.name == "finish" {
        // next level?
    }
}
```

That method finishes the game, so it's down to you now to try and play the whole level without falling into a vortex. What happens when you hit the finish flag? Nothing… *yet*.

