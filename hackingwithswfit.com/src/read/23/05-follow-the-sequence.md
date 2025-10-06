---
lang: ko-KR
title: "Follow the sequence"
description: "Article(s) > Follow the sequence"
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
      content: "Article(s) > Follow the sequence"
    - property: og:description
      content: "Follow the sequence"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/23/05-follow-the-sequence.html
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
  "title": "Follow the sequence | Hacking with iOS",
  "desc": "Follow the sequence",
  "link": "https://hackingwithswift.com/read/23/5/follow-the-sequence",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/tDfZfytNSls" />

You've come so far already, and really there isn't a lot to show for your work other than being able to draw glowing slice shapes when you move touches around the screen. But that's all about to change, because we're now about to create the interesting code - we're going to make the game actually create some enemies.

Now, you might very well be saying, “but Paul, we just wrote the enemy creating code, and I never want to see it again!” You're right (and I never want to see it again either!) but it's a bit more complicated: the `createEnemy()` method creates one enemy as required. The code we're going to write now will call `createEnemy()` in different ways so that we get varying groups of enemies.

For example, sometimes we want to create two enemies at once, sometimes we want to create four at once, and sometimes we want to create five in quick sequence. Each one of these will call `createEnemy()` in different ways.

There's a *lot* to cover here, so let's get started: add this new enum before the `ForceBomb` enum you added a few minutes ago:

```swift
enum SequenceType: CaseIterable {
    case oneNoBomb, one, twoWithOneBomb, two, three, four, chain, fastChain
}
```

That outlines the possible types of ways we can create enemy: one enemy that definitely is not a bomb, one that might or might not be a bomb, two where one is a bomb and one isn't, then two/three/four random enemies, a chain of enemies, then a fast chain of enemies.

The first two will be used exclusively when the player first starts the game, to give them a gentle warm up. After that, they'll be given random sequence types from `twoWithOneBomb` to `fastChain`.

You might have noticed I slipped in a new protocol there: `CaseIterable`. This is one of Swift’s most useful protocols, and it will automatically add an `allCases` property to the `SequenceType` enum that lists all its cases as an array. This is really useful in our project because we can then use `randomElement()` to pick random sequence types to run our game.

We're going to need quite a few new properties in order to make the plan work, so please add these now:

```swift
var popupTime = 0.9
var sequence = [SequenceType]()
var sequencePosition = 0
var chainDelay = 3.0
var nextSequenceQueued = true
```

And here's what they do:


- The `popupTime` property is the amount of time to wait between the last enemy being destroyed and a new one being created.
- The `sequence` property is an array of our `SequenceType` enum that defines what enemies to create.
- The `sequencePosition` property is where we are right now in the game.
- The `chainDelay` property is how long to wait before creating a new enemy when the sequence type is `.chain` or `.fastChain`. Enemy chains don't wait until the previous enemy is offscreen before creating a new one, so it's like throwing five enemies quickly but with a small delay between each one.
- The `nextSequenceQueued` property is used so we know when all the enemies are destroyed and we're ready to create more.

Whenever we call our new method, which is `tossEnemies()`, we're going to decrease both `popupTime` and `chainDelay` so that the game gets harder as they play. Sneakily, we're always going to increase the speed of our physics world, so that objects move rise and fall faster too.

Nearly all the `tossEnemies()` method is a large `switch/case` statement that looks at the `sequencePosition` property to figure out what sequence type it should use. It then calls `createEnemy()` correctly for the sequence type, passing in whether to force bomb creation or not.

The one thing that will need to be explained is the way enemy chains are created. Unlike regular sequence types, a chain is made up of several enemies with a space between them, and the game doesn't wait for an enemy to be sliced before showing the next thing in the chain.

The best thing for you to do is to put this source code into your project, and we can talk about the chain complexities in a moment:

```swift
func tossEnemies() {
    popupTime *= 0.991
    chainDelay *= 0.99
    physicsWorld.speed *= 1.02

    let sequenceType = sequence[sequencePosition]

    switch sequenceType {
    case .oneNoBomb:
        createEnemy(forceBomb: .never)

    case .one:
        createEnemy()

    case .twoWithOneBomb:
        createEnemy(forceBomb: .never)
        createEnemy(forceBomb: .always)

    case .two:
        createEnemy()
        createEnemy()

    case .three:
        createEnemy()
        createEnemy()
        createEnemy()

    case .four:
        createEnemy()
        createEnemy()
        createEnemy()
        createEnemy()

    case .chain:
        createEnemy()

        DispatchQueue.main.asyncAfter(deadline: .now() + (chainDelay / 5.0)) { [weak self] in self?.createEnemy() }
        DispatchQueue.main.asyncAfter(deadline: .now() + (chainDelay / 5.0 * 2)) { [weak self] in self?.createEnemy() }
        DispatchQueue.main.asyncAfter(deadline: .now() + (chainDelay / 5.0 * 3)) { [weak self] in self?.createEnemy() }
        DispatchQueue.main.asyncAfter(deadline: .now() + (chainDelay / 5.0 * 4)) { [weak self] in self?.createEnemy() }

    case .fastChain:
        createEnemy()

        DispatchQueue.main.asyncAfter(deadline: .now() + (chainDelay / 10.0)) { [weak self] in self?.createEnemy() }
        DispatchQueue.main.asyncAfter(deadline: .now() + (chainDelay / 10.0 * 2)) { [weak self] in self?.createEnemy() }
        DispatchQueue.main.asyncAfter(deadline: .now() + (chainDelay / 10.0 * 3)) { [weak self] in self?.createEnemy() }
        DispatchQueue.main.asyncAfter(deadline: .now() + (chainDelay / 10.0 * 4)) { [weak self] in self?.createEnemy() }
    }

    sequencePosition += 1
    nextSequenceQueued = false
}
```

That looks like a massive method, I know, but in reality it's just the same thing being called in different ways. The interesting parts are the `.chain` and `.fastChain` cases, and also I want to explain in more detail the `nextSequenceQueued` property.

Each sequence in our array creates one or more enemies, then waits for them to be destroyed before continuing. Enemy chains are different: they create five enemies with a short break between, and don't wait for each one to be destroyed before continuing.

To handle these chains, we have calls to `asyncAfter()` with a timer value. If we assume for a moment that `chainDelay` is 10 seconds, then:


- That makes `chainDelay / 10.0` equal to 1 second.
- That makes `chainDelay / 10.0 * 2` equal to 2 seconds.
- That makes `chainDelay / 10.0 * 3` equal to three seconds.
- That makes `chainDelay / 10.0 * 4` equal to four seconds.

So, it spreads out the `createEnemy()` calls quite neatly.

The `nextSequenceQueued` property is more complicated. If it's false, it means we don't have a call to `tossEnemies()` in the pipeline waiting to execute. It gets set to true only in the gap between the previous sequence item finishing and `tossEnemies()` being called. Think of it as meaning, "I know there aren't any enemies right now, but more will come shortly."

We can make our game come to life with enemies with two more pieces of code. First, add this just before the end of `didMove(to:)`:

```swift
sequence = [.oneNoBomb, .oneNoBomb, .twoWithOneBomb, .twoWithOneBomb, .three, .one, .chain]

for _ in 0 ... 1000 {
    if let nextSequence = SequenceType.allCases.randomElement() {
        sequence.append(nextSequence)
    }
}

DispatchQueue.main.asyncAfter(deadline: .now() + 2) { [weak self] in
    self?.tossEnemies()
}
```

That code fills the `sequence` array with seven pre-written sequences to help players warm up to how the game works, then adds 1001 (the `...` operator means “up to and including”) random sequence types to fill up the game. Finally, it triggers the initial enemy toss after two seconds.

The way we generate random sequence type values is using the `CaseIterable` protocol I mentioned earlier. If you cast your mind back, this is how we defined the `SequenceType` enum:

```swift
enum SequenceType: CaseIterable {
    case oneNoBomb, one, twoWithOneBomb, two, three, four, chain, fastChain
}
```

Note that it says `enum SequenceType: CaseIterable`, and it means we’ll automatically get an `allCases` property generated for our enum that contains each case in the enum in the order it was defined. So, to generate lots of random sequence types we can use `SequenceType.allCases.randomElement()` again and again.

The second change we're going to make is to remove enemies from the game when they fall off the screen. This is required, because our game mechanic means that new enemies aren't created until the previous ones have been removed. The exception to this rule are enemy chains, where multiple enemies are created in a batch, but even then the game won't continue until all enemies from the chain have been removed.

We're going to modify the `update()` method so that:

1. If we have active enemies, we loop through each of them.
2. If any enemy is at or lower than Y position -140, we remove it from the game and our `activeEnemies` array.
3. If we don't have any active enemies *and* we haven't already queued the next enemy sequence, we schedule the next enemy sequence and set `nextSequenceQueued` to be true.

Put this code first in the `update()` method:

```swift
if activeEnemies.count > 0 {
    for (index, node) in activeEnemies.enumerated().reversed() {
        if node.position.y < -140 {
            node.removeFromParent()
            activeEnemies.remove(at: index)
        }
    }
} else {
    if !nextSequenceQueued {
        DispatchQueue.main.asyncAfter(deadline: .now() + popupTime) { [weak self] in
            self?.tossEnemies()
        }

        nextSequenceQueued = true
    }
}
```

And now the part you've been waiting for extremely patiently: press <kbd>Cmd</kbd>+<kbd>R</kbd> to run the game, because it should now be getting close to useful!

![Now that the game has bombs as well as penguins, it's almost starting to come together.](https://hackingwithswift.com/img/books/hws/23-3@2x.png)

