---
lang: ko-KR
title: "Detecting wins and draws in Four in a Row"
description: "Article(s) > Detecting wins and draws in Four in a Row"
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
      content: "Article(s) > Detecting wins and draws in Four in a Row"
    - property: og:description
      content: "Detecting wins and draws in Four in a Row"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/05-detecting-wins-and-draws-in-four-in-a-row.html
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
  "title": "Detecting wins and draws in Four in a Row | Hacking with iOS",
  "desc": "Detecting wins and draws in Four in a Row",
  "link": "https://hackingwithswift.com/read/34/5/detecting-wins-and-draws-in-four-in-a-row",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Now it's time to make our game an actual game - i.e., something a player can win. Four in a Row is what's called a zero-sum game, which means for one player to win the other must lose. This in turn means it's very easy to determine a winner: as soon as either player manages to place four chips in a row in any direction, they win. As for detecting a draw, that's just a matter of checking to see if no more moves are available.

Of the two, detecting a draw is far easier, so let's write that first. We already put a stub for `isFull()` into the `Board` class, but we can fill that out now: it will return false if any column passes the `canMove(in:)` test, otherwise it will return false. Here's the updated method for <VPIcon icon="fa-brands fa-swift"/>`Board.swift`:

```swift
func isFull() -> Bool {
    for column in 0 ..< Board.width {
        if canMove(in: column) {
            return false
        }
    }

    return true
}
```

Now for the more challenging method: how to detect when a player has won? In Apple's original code for this, they took a brute force approach with four different methods for detecting wins: left to right, up to down, and two types of diagonal. It's probably very efficient code, but it's unpleasant to read and understand, so I've ditched their code and replaced it with something substantially shorter and easier to understand.

My solution involves two methods: `isWin(for:)` and `squaresMatch(initialChip:)`, and we'll start with the second one first.

For a player to win, they must have four chips of the same color lined up in a row anywhere on the board. The `squaresMatch(initialChip:)` method has the job of being given a square on the board and checking for one possible win type. It will accept five parameters:

- The chip color to check.
- The row and column of the initial chip.
- The X and Y movement of our check.

That last one is the tricky part, so let me explain further. To detect a horizontal win, we'll call this method with an X movement of 1 and a Y movement of 0. The method can then check a slot, move along by X:1 and Y:0 (i.e., one place to the right), check a second slot, move along by X:1 and Y:0, check a third slot, then move along by X:1 and Y:0 and check the final slot. If all four have matched the player's chip color, they win.

The advantage to using this technique is that it can check for all other win types. For example, checking a vertical win means passing an X movement of 0 and a Y movement of 1, and checking a diagonal win means passing an X movement of 1 and a Y movement of 1. Remember, though, that diagonal wins go both up and down, so we need to have a second diagonal check with a Y movement of -1.

To make the `squaresMatch(initialChip:)` method safe to call from any slot on the board, we'll make it return false if it will try to check outside the bounds of the board. For example, if it starts in the bottom left and tries to search for a downward win, we'll bail out immediately. The method will also return false as soon as it has failed to detect a win for a particular movement, because there's no point checking slots 3 and 4 if slot 2 doesn't match the player's chip color.

That's everything you need to know, so here's the code for `squaresMatch(initialChip:)` - put this into the `Board` class:

```swift
func squaresMatch(initialChip: ChipColor, row: Int, col: Int, moveX: Int, moveY: Int) -> Bool {
    // bail out early if we can't win from here
    if row + (moveY * 3) < 0 { return false }
    if row + (moveY * 3) >= Board.height { return false }
    if col + (moveX * 3) < 0 { return false }
    if col + (moveX * 3) >= Board.width { return false }

    // still here? Check every square
    if chip(inColumn: col, row: row) != initialChip { return false }
    if chip(inColumn: col + moveX, row: row + moveY) != initialChip { return false }
    if chip(inColumn: col + (moveX * 2), row: row + (moveY * 2)) != initialChip { return false }
    if chip(inColumn: col + (moveX * 3), row: row + (moveY * 3)) != initialChip { return false }

    return true
}
```

That just leaves one final task before our game starts being useful: we need to fill in the `isWin(for:)` method so that it loops over every slot in the board, calling `squaresMatch(initialChip:)` four times for each slot: once for horizontal wins, once for vertical wins, and once for both kinds of diagonal wins. As soon as any of those calls returns true for any slot, the whole method returns true. If the loop finishes with no win, the method will return false so that play continues.

This also involves one small further change: now that our `Player` class conforms to `GKGameModelPlayer`, we need to make the `isWin(for:)` method accept a `GKGameModelPlayer` as its parameter. This is what’s given to us by GameplayKit later on, but we can typecast it back to a regular `Player` inside the method.

Add this import to <VPIcon icon="fa-brands fa-swift"/>`Board.swift` now:

```swift
import GameplayKit
```

Now replace your existing `isWin(for:)` method with this updated version:

```swift
func isWin(for player: GKGameModelPlayer) -> Bool {
    let chip = (player as! Player).chip

    for row in 0 ..< Board.height {
        for col in 0 ..< Board.width {
            if squaresMatch(initialChip: chip, row: row, col: col, moveX: 1, moveY: 0) {
                return true
            } else if squaresMatch(initialChip: chip, row: row, col: col, moveX: 0, moveY: 1) {
                return true
            } else if squaresMatch(initialChip: chip, row: row, col: col, moveX: 1, moveY: 1) {
                return true
            } else if squaresMatch(initialChip: chip, row: row, col: col, moveX: 1, moveY: -1) {
                return true
            }
        }
    }

    return false
}
```

At this point, you have a complete two-player Four in a Row game on your hands. If it weren't for GameplayKit, we'd be done here. But you want to add an AI opponent, don't you? Sure you do. So go ahead and run your app briefly, marvel at your coding prowess, then get back to Xcode: this is where the difficulty ramps up!

