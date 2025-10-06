---
lang: ko-KR
title: "How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate"
description: "Article(s) > How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate"
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
      content: "Article(s) > How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate"
    - property: og:description
      content: "How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/06-how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate.html
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
  "title": "How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate | Hacking with iOS",
  "desc": "How GameplayKit AI works: GKGameModel, GKGameModelPlayer and GKGameModelUpdate",
  "link": "https://hackingwithswift.com/read/34/6/how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Amongst the many features introduced in GameplayKit, one of the most immediately useful is its ability to provide artificial intelligence that can evaluate a situation and make smart choices. We're going to be using it in our Four in a Row game to provide a meaningful opponent, but first it's essential that you understand how GameplayKit tackles the AI problem because it directly affects the code we'll write.

GameplayKit has three protocols we need to implement in various parts of our model:

- The `GKGameModel` protocol is used to represent the state of play, which means it needs to know where all the game pieces are, who the players are, what happens after each move is made, and what the score for a player is given any state.
- The `GKGameModelPlayer` protocol is used to represent one player in the game. This protocol is so simple we already implemented it: all you need to do is make sure your player class has a `playerId` integer. It's used to identify a player uniquely inside the AI.
- The `GKGameModelUpdate` protocol is used to represent one possible move in the game. For us, that means storing a column number to represent a piece being played there. This protocol requires that you also store a `value` integer, which is used to rank all possible results by quality to help GameplayKit make a good choice.

We have a sensible match for the first two in our `Board` and `Player` classes, but we have nothing suitable for `GKGameModelUpdate` so let's create that now. Like I said, this needs to track only how "good" a move is, where each move is represented by a column number to play.

This is easy to do, so please go ahead and create a new Cocoa Touch class in your project. Name it “Move”, and make it subclass from “NSObject”. Now replace its source code with this:

```swift
import GameplayKit
import UIKit

class Move: NSObject, GKGameModelUpdate {
    var value: Int = 0
    var column: Int

    init(column: Int) {
        self.column = column
    }
}
```

That's it: the default for `value` is 0, and we create a `Move` object by passing in the column it represents. We're done with that class, and I already said we were finished with the `Player` class, which means we can focus our mental energies on what remains: `Board`.

GameplayKit's artificial intelligence works through brute force: it tries every possible move, then tries every possible follow-on move, then every possible follow-on follow-on move, etc. This runs up combinations extremely quickly, particularly when you consider that there are 4,531,985,219,092 unique positions for all the pieces on the board! So, you will inevitably limit the depth of the search to provide just enough intelligence to be interesting.

Now, this bit is really important, so read carefully. When you ask GameplayKit to find a move, it will examine all possible moves. To begin with, that is every column, because they all have space for moves in them. It then takes a copy of the game, and makes a virtual move on that copy. It then takes a copy of the game, and makes a different virtual move, and so on until until all initial first moves have been made.

Next, it starts to re-use its copies to save on memory: it will take one of those copies and apply a game state to it, which means it will reset the board so that it matches the position after one of its virtual moves. It will then rinse and repeat: it will examine all possible moves, and make one. It does this for all moves, and does so recursively until it has created a tree of all possible moves and outcomes, or at least as many as you ask it to scan.

Each time the AI has made a move, it will ask us what the player score is. For some games this will be as simple as returning a score variable, but for our 4IR game it's a bit trickier because there is no score, only a win or a loss. The original Apple source code provides a simple heuristic for this, and I've kept it here because it's quite fun - the AI can sometimes make dumb mistakes, or sometimes play like a genius, which makes the game interesting!

If you were wondering, a *heuristic* is the computer science term for a guesstimate - it's a function that tries to solve a problem quickly by taking shortcuts. For us, that means we'll tell the AI the player's score is 1000 if a move wins the game, -1000 if a move loses the game, or 0 otherwise.

All this information is important because I hope now you can see why we separate the game model from the game view - why we have a `slots` array inside the game board and a `placedChips` array inside the view controller. If you're still not sure, try to imagine how many moves the AI needs to simulate in order to decide what to do - our board has seven columns, so:

- The player goes first, and all seven columns are valid.
- The AI calculates its first move, which could be any of those seven columns. (7 moves in total.)
- The AI then calculates what the player might do, but the player's move depends on the previous AI move so it has to calculate one player move for every possible AI move. (49 more moves; 56 in total.)
- The AI then calculates what its second move might look like, which of course depends on the players first and second moves, and the AI's first move. So, for every one of those 49 moves, it has to calculate 7 more. (343 moves; 399 in total.)

…and so on. Eventually one column will become full so the multiplications will decrease, but you're still talking many thousands of copies of the board. Now imagine if the `Board` class kept track of all the `UIViews` used to draw the chips - suddenly we'd be copying far more than intended, and doing it 5000 times!

So: if a couple of chapters ago you were thinking I was wasting your time by forcing you to separate your model from your view, I hope you can now see why. AI is slow enough without doing a huge stack of extra work for no reason!

That's enough theory, it's time for some code. If you remember nothing else, remember this: to simulate a move, GameplayKit takes copies of our board state, finds all possible moves that can happen, and applies them all on different copies.

