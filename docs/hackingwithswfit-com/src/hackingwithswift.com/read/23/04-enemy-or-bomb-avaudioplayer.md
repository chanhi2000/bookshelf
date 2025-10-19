---
lang: ko-KR
title: "Enemy or bomb: AVAudioPlayer"
description: "Article(s) > Enemy or bomb: AVAudioPlayer"
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
      content: "Article(s) > Enemy or bomb: AVAudioPlayer"
    - property: og:description
      content: "Enemy or bomb: AVAudioPlayer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/23/04-enemy-or-bomb-avaudioplayer.html
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
  "title": "Enemy or bomb: AVAudioPlayer | Hacking with iOS",
  "desc": "Enemy or bomb: AVAudioPlayer",
  "link": "https://hackingwithswift.com/read/23/4/enemy-or-bomb-avaudioplayer",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/4R6rbsWLRoM" />

In this section we're going to look at just one method, which should tell you immediately that this is a *complicated* method. This method is called `createEnemy()`, and is responsible for launching either a penguin or a bomb into the air for the player to swipe. That's it - that's all it does. And yet it's going to take quite a lot of code because it takes quite a lot of functionality in order to make the game complete:

1. Should this enemy be a penguin or a bomb?
2. Where should be it created on the screen?
3. What direction should it be moving in?

It should be obvious that 3) relies on 2) - if you create something on the left edge of the screen, having it move to the left would make the game impossible for players!

An additional complexity is that in the early stages of the game we sometimes want to force a bomb, and sometimes force a penguin, in order to build a smooth learning curve. For example, it wouldn't be fair to make the very first enemy a bomb, because the player would swipe it and lose immediately.

We're going to specify what kind of enemy we want using an enum. You've used enums already (not least in project 2), but you've never created one before. To make `createEnemy()` work, we need to declare a new enum that tracks what kind of enemy should be created: should we force a bomb always, should we force a bomb never, or use the default randomization?

Add this *above* your class definition in <VPIcon icon="fa-brands fa-swift"/>`GameScene.swift`:

```swift
enum ForceBomb {
    case never, always, random
}
```

You can now use those values in your code, for example like this:

```swift
if forceBomb == .never {
    enemyType = 1
} else if forceBomb == .always {
    enemyType = 0
}
```

OK, it's time to start looking at the `createEnemy()` method. I say "start" because we're going to look at it in three passes: the code required to create bombs, the code to position enemies and set up their physics, and the code required to do everything else. Your code probably won't run until all three parts are in place, so don't worry!

We're going to need to track enemies that are currently active in the scene, so please add this array as a property of your class:

```swift
var activeEnemies = [SKSpriteNode]()
```

And now let's look at the core of the `createEnemy()` method. It needs to:

1. Accept a parameter of whether we want to force a bomb, not force a bomb, or just be random.
2. Decide whether to create a bomb or a penguin (based on the parameter input) then create the correct thing.
3. Add the new enemy to the scene, and also to our `activeEnemies` array.

That's it. Not too much, I hope. To decide whether to create a bomb or a player, I'll choose a random number from 0 to 6, and consider 0 to mean "bomb". Here's the code:

```swift
func createEnemy(forceBomb: ForceBomb = .random) {
    let enemy: SKSpriteNode

    var enemyType = Int.random(in: 0...6)

    if forceBomb == .never {
        enemyType = 1
    } else if forceBomb == .always {
        enemyType = 0
    }

    if enemyType == 0 {
        // bomb code goes here
    } else {
        enemy = SKSpriteNode(imageNamed: "penguin")
        run(SKAction.playSoundFileNamed("launch.caf", waitForCompletion: false))
        enemy.name = "enemy"
    }

    // position code goes here

    addChild(enemy)
    activeEnemies.append(enemy)
}
```

::: note

Xcode will show you a compiler error for now, but don’t worry - we’re going to fix it.

:::

There's nothing complicated in there, but I *have* taken out two fairly meaty chunks of code. That `// position code goes here` comment masks a lot of missing functionality that really makes the game come alive, so we're going to fill that in now.

I'm going to use numbered comments again so you can see exactly how this code matches up with what it should do. So, here is what that missing position code needs to do:

1. Give the enemy a random position off the bottom edge of the screen.
2. Create a random angular velocity, which is how fast something should spin.
3. Create a random X velocity (how far to move horizontally) that takes into account the enemy's position.
4. Create a random Y velocity just to make things fly at different speeds.
5. Give all enemies a circular physics body where the `collisionBitMask` is set to 0 so they don't collide.

The only thing that might catch you out in the actual code is my use of magic numbers, which is what programmers call seemingly random (but actually important) numbers appearing in code. Ideally you don't want these, because it's better to make them constants with names, but then how would I be able to give you any homework?

Turning those five points into code is easy enough - just replace the `// position code goes here` with this:

```swift
// 1
let randomPosition = CGPoint(x: Int.random(in: 64...960), y: -128)
enemy.position = randomPosition

// 2
let randomAngularVelocity = CGFloat.random(in: -3...3 )
let randomXVelocity: Int

// 3
if randomPosition.x < 256 {
    randomXVelocity = Int.random(in: 8...15)
} else if randomPosition.x < 512 {
    randomXVelocity = Int.random(in: 3...5)
} else if randomPosition.x < 768 {
    randomXVelocity = -Int.random(in: 3...5)
} else {
    randomXVelocity = -Int.random(in: 8...15)
}

// 4
let randomYVelocity = Int.random(in: 24...32)

// 5
enemy.physicsBody = SKPhysicsBody(circleOfRadius: 64)
enemy.physicsBody?.velocity = CGVector(dx: randomXVelocity * 40, dy: randomYVelocity * 40)
enemy.physicsBody?.angularVelocity = randomAngularVelocity
enemy.physicsBody?.collisionBitMask = 0
```

The last missing part of the `createEnemy()` method is about creating bombs, and I've left it separate because it requires some thinking. A "bomb" node in our game is actually going to be made up of three parts: the bomb image, a bomb fuse particle emitter, and a container that puts the two together so we can move and spin them around together.

The reason we need to keep the bomb image and bomb fuse separate is because tapping on a bomb is a fatal move that causes the player to lose all their lives immediately. If the fuse particle emitter were inside the bomb image, then the user could accidentally tap a stray fuse particle and lose unfairly.

As a reminder, we're going to force the Z position of bombs to be 1, which is higher than the default value of 0. This is so that bombs always appear in front of penguins, because hours of play testing has made it clear to me that it's awful if you don't realize there's a bomb lurking behind something when you swipe it!

Creating a bomb also needs to play a fuse sound, but that has its own complexity. You've already seen that `SKAction` has a very simple way to play sounds, but it's so simple that it's not useful here because we want to be able to stop the sound and `SKAction` sounds don't let you do that. It would be confusing for the fuse sound to be playing when no bombs are visible, so we need a better solution.

That solution is called `AVAudioPlayer`, and it's not a SpriteKit class - it's available to use in your UIKit apps too if you want. We're going to have an `AVAudioPlayer` property for our class that will store a sound just for bomb fuses so that we can stop it as needed.

Let's put numbers to the tasks this chunk of code needs to perform:

1. Create a new `SKSpriteNode` that will hold the fuse and the bomb image as children, setting its Z position to be 1.
2. Create the bomb image, name it "bomb", and add it to the container.
3. If the bomb fuse sound effect is playing, stop it and destroy it.
4. Create a new bomb fuse sound effect, then play it.
5. Create a particle emitter node, position it so that it's at the end of the bomb image's fuse, and add it to the container.

That's all you need to know in order to continue. We need to start by importing the AVFoundation framework, so add this line now next to `import SpriteKit`:

```swift
import AVFoundation
```

You'll also need to declare the `bombSoundEffect` property, so put this just after the declaration of `isSwooshSoundActive`:

```swift
var bombSoundEffect: AVAudioPlayer?
```

Now for the real work. Please replace the `// bomb code goes here` comment with this, watching out for my numbered comments to help you match code against meaning:

```swift
// 1
enemy = SKSpriteNode()
enemy.zPosition = 1
enemy.name = "bombContainer"

// 2
let bombImage = SKSpriteNode(imageNamed: "sliceBomb")
bombImage.name = "bomb"
enemy.addChild(bombImage)

// 3
if bombSoundEffect != nil {
    bombSoundEffect?.stop()
    bombSoundEffect = nil
}

// 4
if let path = Bundle.main.url(forResource: "sliceBombFuse", withExtension: "caf") {
    if let sound = try?  AVAudioPlayer(contentsOf: path) {
        bombSoundEffect = sound
        sound.play()
    }
}

// 5
if let emitter = SKEmitterNode(fileNamed: "sliceFuse") {
    emitter.position = CGPoint(x: 76, y: 64)
    enemy.addChild(emitter)
}
```

After all that work, you're almost done with bombs. But there's one small bug that we can either fix now or fix when you can see it, but we might as well fix it now because your brain is thinking about all that bomb code.

The bug is this: we're using `AVAudioPlayer` so that we can stop the bomb fuse when bombs are no longer on the screen. But where do we actually stop the sound? Well, we don't yet - but we need to.

To fix the bug, we need to modify the `update()` method, which is something we haven't touched before - in fact, so far we’ve just been deleting it! This method is called every frame before it's drawn, and gives you a chance to update your game state as you want. We're going to use this method to count the number of bomb containers that exist in our game, and stop the fuse sound if the answer is 0.

Change your `update()` method to this:

```swift
override func update(_ currentTime: TimeInterval) {
    var bombCount = 0

    for node in activeEnemies {
        if node.name == "bombContainer" {
            bombCount += 1
            break
        }
    }

    if bombCount == 0 {
        // no bombs - stop the fuse sound!
        bombSoundEffect?.stop()
        bombSoundEffect = nil
    }
}
```

