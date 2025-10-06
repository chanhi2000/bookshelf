---
lang: ko-KR
title: "Implementing GKGameModel: gameModelUpdates(for:) and apply()"
description: "Article(s) > Implementing GKGameModel: gameModelUpdates(for:) and apply()"
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
      content: "Article(s) > Implementing GKGameModel: gameModelUpdates(for:) and apply()"
    - property: og:description
      content: "Implementing GKGameModel: gameModelUpdates(for:) and apply()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/07-implementing-gkgamemodel-gamemodelupdatesfor-and-apply.html
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
  "title": "Implementing GKGameModel: gameModelUpdates(for:) and apply() | Hacking with iOS",
  "desc": "Implementing GKGameModel: gameModelUpdates(for:) and apply()",
  "link": "https://hackingwithswift.com/read/34/7/implementing-gkgamemodel-gamemodelupdatesfor-and-apply",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Now you understand how GameplayKit approaches AI, it's time for some action. Open up <VPIcon icon="fa-brands fa-swift"/>`Board.swift`, then make your `Board` class conform to the `GKGameModel` protocol like this:

```swift
class Board: NSObject, GKGameModel {
```

As soon as you do that, your beautiful project will stop compiling and you'll see two errors: the `Board` class does not conform to `NSCopying` or `GKGameModel`. We covered `NSCoding` in previous projects but not `NSCopying`, so let's start there.

As you'll no doubt remember(!), `NSCoding` is used to encoding and decode objects so that they can be archived, such as when you're writing to `UserDefaults`. This is great for when you want to save or distribute your data, but it's not very efficient if you just want to copy it, and that's where `NSCopying` comes in: it's a protocol that lets iOS take a copy of your object in memory, with the copy being identical but separate to the original. As you saw in the last chapter, GameplayKit will be taking a lot of copies of our game board, so we definitely need to conform to `NSCopying`.

Implementing `NSCopying` is as simple as adding one new method, called `copy(with zone:)`. The "zone" part is an optimization hangover from many years ago, and has been ignored for years. In our particular case, we're going to take a little shortcut by merging two things together: taking a copy of the game board and applying a game state.

If you remember, GameplayKit takes multiple copies of our board so that it can evaluate various moves. It then re-uses those copies by setting their game state, which is where GameplayKit resets the board so that it matches the position after one of its moves. To remove some code duplication, we're going to make `copy(with:)` call the method used to apply a board state. That is, `copy(with:)` will make an empty `Board` object then call a new `setGameModel()` method to actually copy across the slot data and set the active player.

This is helpful because `setGameModel()` is part of the `GKGameModel` protocol, so we needed to implement it anyway. This method needs to accept a `GKGameModel` object as its only parameter, but of course we know that's a `Board` object so we'll do an optional downcast before copying across the properties.

Here's the code - add this to the `Board` class:

```swift
func copy(with zone: NSZone? = nil) -> Any {
    let copy = Board()
    copy.setGameModel(self)
    return copy
}

func setGameModel(_ gameModel: GKGameModel) {
    if let board = gameModel as? Board {
        slots = board.slots
        currentPlayer = board.currentPlayer
    }
}
```

Next, GameplayKit will ask us to tell it all the possible moves that can be made, if any. This will be called on a copy of our game board that may already have had virtual moves applied to it, but that's OK because the copy has its own `slots` array that we can read from to find where moves are possible.

Because we're conforming to the `GKGameModel` protocol, this method needs to have a precise name, accept a precise parameter, and return a precise data type. Specifically, it needs to be called `gameModelUpdates(for:)`, it needs to accept a `GKGameModelPlayer` object, and return a `GKGameModelUpdate` object. In our game, the last two map to the `Player` and `Move` classes, both of which conform to those protocols.

We've already written several methods that make this code surprisingly easy: if `isWin(for:)` is true either for the player or their opponent we return nil, and we call `canMove(in:)` for every column to see if the AI can move in each column. If so, we create a new `Move` object to represent that column, and add it to an array of possible moves.

To make sure you understand all the code, here it is broken down:

1. We optionally downcast our `GKGameModelPlayer` parameter into a `Player` object.
2. If the player or their opponent has won, return `nil` to signal no moves are available.
3. Otherwise, create a new array that will hold `Move` objects.
4. Loop through every column in the board, asking whether the player can move in that column.
5. If so, create a new `Move` object for that column, and add it to the array.
6. Finally, return the array to tell the AI all the possible moves it can make.

Here's the code, with the number comments matching the list above:

```swift
func gameModelUpdates(for player: GKGameModelPlayer) -> [GKGameModelUpdate]? {
    // 1
    if let playerObject = player as? Player {
        // 2
        if isWin(for: playerObject) || isWin(for: playerObject.opponent) {
            return nil
        }

        // 3
        var moves = [Move]()

        // 4
        for column in 0 ..< Board.width {
            if canMove(in: column) {
                // 5
                moves.append(Move(column: column))
            }
        }

        // 6
        return moves
    }

    return nil
}
```

The next step for the AI is to try all of those moves. GameplayKit will execute a method called `apply()` once for every move, and again this will get called on a copy of our game board that reflects the current state of play after its virtual moves. This method needs to accept a `GKGameModelUpdate` object as a parameter (that's a `Move` for us), then apply that move to its copy of the board.

Again, we've already written the methods required to make this happen. Our `Move` class contains a column number that represent's an AI move, so we just need to downcast the `GKGameModelUpdate` to a `Move`, call `add(chip:)` for that move, then change players. Here's the code:

```swift
func apply(_ gameModelUpdate: GKGameModelUpdate) {
    if let move = gameModelUpdate as? Move {
        add(chip: currentPlayer.chip, in: move.column)
        currentPlayer = currentPlayer.opponent
    }
}
```

Once GameplayKit has made a move, it will want to know whether the move is good or not. Obviously this varies from game to game, so Apple's implementation is simple: it will ask us to provide a player score after each virtual move has been made, and that score affects the way GameplayKit ranks each move.

The method name this time is `score(for:)`, and we'll get passed a `GKGameModelPlayer` object that we need to evaluate. This is a `Player` object in our game, so we'll optionally downcast it. Now, as I said already our game doesn't have a meaningful score that can be passed back as this method's return value, so we'll use a very lazy heuristic: if the player has won we'll return 1000, if their opponent has won we'll return -1000, otherwise we'll return 0.

Here's the code:

```swift
func score(for player: GKGameModelPlayer) -> Int {
    if let playerObject = player as? Player {
        if isWin(for: playerObject) {
            return 1000
        } else if isWin(for: playerObject.opponent) {
            return -1000
        }
    }

    return 0
}
```

There are only two further changes required to make our `Board` class conform fully to the `GKGameModel` protocol, both of which are easy and just do typecasting. You see, GameplayKit wants to see these two properties:

```swift
var players: [GKGameModelPlayer]?
var activePlayer: GKGameModelPlayer?
```

We don't have these right now, because we use our custom subclasses of `NSObject`. Rather than duplicate data, we're going to use computed properties to just return what we have - Swift will then correctly treat them as `GKGameModelPlayer` types. So, rather than adding those two lines of code above, use this code instead:

```swift
var players: [GKGameModelPlayer]? {
    return Player.allPlayers
}

var activePlayer: GKGameModelPlayer? {
    return currentPlayer
}
```

That's it: the `Board` class now conforms fully to the `GKGameModel` protocol, the `Player` class conforms fully to the `GKGameModelPlayer` protocol, and the `Move` class conforms fully to the `GKGameModelUpdate` protocol - we're finished with all these classes and those protocols, which means we can get onto the next task: configuring the AI player.

