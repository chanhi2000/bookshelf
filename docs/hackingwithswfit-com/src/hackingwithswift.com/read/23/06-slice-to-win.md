---
lang: ko-KR
title: "Slice to win"
description: "Article(s) > Slice to win"
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
      content: "Article(s) > Slice to win"
    - property: og:description
      content: "Slice to win"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/23/06-slice-to-win.html
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
  "title": "Slice to win | Hacking with iOS",
  "desc": "Slice to win",
  "link": "https://hackingwithswift.com/read/23/6/slice-to-win",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/kzGSiGXbxWo" />

We need to modify `touchesMoved()` to detect when users slice penguins and bombs. The code isn't complicated, but it *is* long, so I'm going to split it into three. First, here's the structure - place this just before the end of `touchesMoved()`:

```swift
let nodesAtPoint = nodes(at: location)

for case let node as SKSpriteNode in nodesAtPoint {
    if node.name == "enemy" {
        // destroy penguin
    } else if node.name == "bomb" {
        // destroy bomb
    }
}
```

Now, let's take a look at what destroying a penguin should do. It should:

1. Create a particle effect over the penguin.
2. Clear its node name so that it can't be swiped repeatedly.
3. Disable the `isDynamic` of its physics body so that it doesn't carry on falling.
4. Make the penguin scale out and fade out at the same time.
5. After making the penguin scale out and fade out, we should remove it from the scene.
6. Add one to the player's score.
7. Remove the enemy from our `activeEnemies` array.
8. Play a sound so the player knows they hit the penguin.

Replace the `// destroy penguin` with this, following along with my numbered comments:

```swift
// 1
if let emitter = SKEmitterNode(fileNamed: "sliceHitEnemy") {
    emitter.position = node.position
    addChild(emitter)
}

// 2
node.name = ""

// 3
node.physicsBody?.isDynamic = false

// 4
let scaleOut = SKAction.scale(to: 0.001, duration:0.2)
let fadeOut = SKAction.fadeOut(withDuration: 0.2)
let group = SKAction.group([scaleOut, fadeOut])

// 5
let seq = SKAction.sequence([group, .removeFromParent()])
node.run(seq)

// 6
score += 1

// 7
if let index = activeEnemies.firstIndex(of: node) {
    activeEnemies.remove(at: index)
}

// 8
run(SKAction.playSoundFileNamed("whack.caf", waitForCompletion: false))
```

You've now seen the two ways of collecting SpriteKit actions together: groups and sequences. An action *group* specifies that all actions inside it should execute simultaneously, whereas an action `sequence` runs them all one at a time. In the code above we have a group inside a sequence, which is common.

If the player swipes a bomb by accident, they lose the game immediately. This uses much the same code as destroying a penguin, but with a few differences:


- The node called "bomb" is the bomb image, which is inside the bomb container. So, we need to reference the node's parent when looking up our position, changing the physics body, removing the node from the scene, and removing the node from our `activeEnemies` array..
- I'm going to create a different particle effect for bombs than for penguins.
- We end by calling the (as yet unwritten) method `endGame()`.

Replace the `// destroy bomb` comment with this:

```swift
guard let bombContainer = node.parent as? SKSpriteNode else { continue }

if let emitter = SKEmitterNode(fileNamed: "sliceHitBomb") {
    emitter.position = bombContainer.position
    addChild(emitter)
}

node.name = ""
bombContainer.physicsBody?.isDynamic = false

let scaleOut = SKAction.scale(to: 0.001, duration:0.2)
let fadeOut = SKAction.fadeOut(withDuration: 0.2)
let group = SKAction.group([scaleOut, fadeOut])

let seq = SKAction.sequence([group, .removeFromParent()])
bombContainer.run(seq)

if let index = activeEnemies.firstIndex(of: bombContainer) {
    activeEnemies.remove(at: index)
}

run(SKAction.playSoundFileNamed("explosion.caf", waitForCompletion: false))
endGame(triggeredByBomb: true)
```

Before I walk you through the `endGame()` method, we need to adjust the `update()` method a little. Right now, if a penguin or a bomb falls below -140, we remove it from the scene. We're going to modify that so that if the player misses slicing a penguin, they lose a life. We're also going to delete the node's name just in case any further checks for enemies or bombs happen - clearing the node name will avoid any problems.

In the `update()` method, replace this code:

```swift
if node.position.y < -140 {
    node.removeFromParent()
    activeEnemies.remove(at: index)
}
```

…with this:

```swift
if node.position.y < -140 {
    node.removeAllActions()

    if node.name == "enemy" {
        node.name = ""
        subtractLife()

        node.removeFromParent()
        activeEnemies.remove(at: index)
    } else if node.name == "bombContainer" {
        node.name = ""
        node.removeFromParent()
        activeEnemies.remove(at: index)
    }
}
```

That's mostly the same, except now we call `subtractLife()` when the player lets any penguins through. So, if you miss a penguin you lose one life; if you swipe a bomb, you lose all your lives. Or at least you would if our code actually compiled, which it won't: you're missing the `subtractLife()` and `endGame()` methods!

