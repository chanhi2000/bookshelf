---
lang: ko-KR
title: "Creating a GameplayKit AI using GKMinmaxStrategist"
description: "Article(s) > Creating a GameplayKit AI using GKMinmaxStrategist"
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
      content: "Article(s) > Creating a GameplayKit AI using GKMinmaxStrategist"
    - property: og:description
      content: "Creating a GameplayKit AI using GKMinmaxStrategist"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/08-creating-a-gameplaykit-ai-using-gkminmaxstrategist.html
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
  "title": "Creating a GameplayKit AI using GKMinmaxStrategist | Hacking with iOS",
  "desc": "Creating a GameplayKit AI using GKMinmaxStrategist",
  "link": "https://hackingwithswift.com/read/34/8/creating-a-gameplaykit-ai-using-gkminmaxstrategist",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

If you've made it this far then you have built a Four in a Row game where two players can place chips in the game slots and either win or draw, and you've also prepared your model data to be run through the new GameplayKit AI routines. But we haven't created the AI just yet: we've just added some methods to our game models to enable an AI to make choices.

In this final step, we're going to use a new class called `GKMinmaxStrategist`, which is a gameplay strategy that tries to MINimize losses while MAXimizing gains - hence the name minmax, or minimax. When you create a `GKMinmaxStrategist` you tell it how many moves it should look ahead, and also what it should do to break ties, i.e. if it has two or more moves that are equally good.

Once you've created the strategist object, you need to provide it a game model to examine (that's our `Board` class), then ask it either to make the best move or make a random good move. If you ask for the best move, you'll get given back a `GKGameModelUpdate` object (that's a `Move` in our game) that represents the best move. If you ask for a random good move you'll need to tell it how many it should consider good (i.e., pick one from the top 5), and you'll get back a random `GKGameModelUpdate` from that list of good moves.

Now, one thing to be aware of up front: running AI takes a long time, particularly if you have a high look ahead depth. As a result, you should run the AI on a background thread so that your user interface doesn't lock up, and only push work back to the main thread when you have a move ready to make.

Let's go ahead and implement `GKMinmaxStrategist` now. Open <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift` in your editor, then import GameplayKit. Now add this property to the `ViewController` class:

```swift
var strategist: GKMinmaxStrategist!
```

One strategist is capable of handling more than one game (i.e., if the player restarts the game) just by changing its game model, so we only need to create one `GKMinmaxStrategist` object. As it's needed straight away, we might as well put this into `viewDidLoad()` - anywhere before the call to `resetBoard()` is fine:

```swift
strategist = GKMinmaxStrategist()
strategist.maxLookAheadDepth = 7
strategist.randomSource = nil
```

Having a `maxLookAheadDepth` of 7 is a significant amount of work, because of those look aheads is one move being made by the player or AI - and each of those moves can be in any of seven columns. If you intend to alter this number upwards, be prepared for exponentially slower processing.

The `randomSource` property of `GKMinmaxStrategist` is there as a tie-breaker: if two moves result in the same advantage for the AI, which should it take? Setting it to `nil` as above means "just return the first best move," but if you wanted to have the AI take a random best move then you could try something like this:

```swift
strategist.randomSource = GKARC4RandomSource()
```

Now that the strategist is created, it wants to be fed some data. This is done by setting its `gameModel` property to an object that conforms to the `GKGameModel` protocol - which by now you should immediately recognize as our `Board` class. So, whenever we reset the board, we need to feed the new board into the strategist so it stands ready to look for moves.

We've done all the hard work to prepare for this, so all you need to do is change the start of your `resetBoard()` method to the following:

```swift
func resetBoard() {
    board = Board()
    strategist.gameModel = board

    updateUI()
```

At this point, the AI understands the state of play, and stands ready to look for good moves. With `GKMinmaxStrategist` this is done using the `bestMove(for:)` method, which accepts a `GKModelPlayer` as its parameter and returns a `GKModelUpdate` for the best move if it finds one.

Remember, however, that AI can take a long time to consider all options depending on the look ahead depth you specify, so we're going to wrap this call up in a new method: `columnForAIMove()`. This will return an optional integer: either the best column for a move, or nil to mean "no move found." We'll call this on a background thread so it can take as long as it needs.

Here's the code for `columnForAIMove()`:

```swift
func columnForAIMove() -> Int? {
    if let aiMove = strategist.bestMove(for: board.currentPlayer) as? Move {
        return aiMove.column
    }

    return nil
}
```

Once the AI has found a good move, we want to run that that move on the main thread, because it will involve user interface changes. I've wrapped this up in another new method called `makeAIMove(in:)`: this takes the column to move on, then makes it happen. This method will find the next available slot for the selected column, then use `add(chip:)` to make the move on the model, and `addChip(inColumn:)` to make the move in the view.

Once the AI move has been made, we'll call `continueGame()` to check for a win or draw, then flip turns so the player is in control.

Here's the code for `makeAIMove(in:)`:

```swift
func makeAIMove(in column: Int) {
    if let row = board.nextEmptySlot(in: column) {
        board.add(chip: board.currentPlayer.chip, in: column)
        addChip(inColumn: column, row:row, color: board.currentPlayer.color)

        continueGame()
    }
}
```

At this point our game is almost finished, but we still need to call those methods on the appropriate threads. All this will be done in one big method called `startAIMove()`, which is going to do a number of things:

1. Dispatch some work to the background thread.
2. Get the current time, then run `columnForAIMove()`.
3. Get the time again, compare the difference, and subtract that value from 1 second to form a delay value.
4. Run `makeAIMove(in:)` on the main thread after that delay, to execute the move.

The delay is there so that the AI always waits at least one second before making its move, otherwise it might confuse the user. If the AI takes half a second to find a move, we subtract that from our one second minimum to wait for a further half a second, equalling one second in total from before starting the AI to executing the move.

Here's the first draft of `startAIMove()`:

```swift
func startAIMove() {
    DispatchQueue.global().async { [unowned self] in
        let strategistTime = CFAbsoluteTimeGetCurrent()
        guard let column = self.columnForAIMove() else { return }
        let delta = CFAbsoluteTimeGetCurrent() - strategistTime

        let aiTimeCeiling = 1.0
        let delay = aiTimeCeiling - delta

        DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
            self.makeAIMove(in: column)
        }
    }
}
```

Now only one thing more is required to finish the game: we need to call `startAIMove()` when it's black's turn. Change your `updateUI()` method to this:

```swift
func updateUI() {
    title = "\(board.currentPlayer.name)'s Turn"

    if board.currentPlayer.chip == .black {
        startAIMove()
    }
}
```

Now, the game works, and you could even ship it today if you really wanted, but before you hit Run I'd like to suggest two tiny changes that make the whole experience better.

First, what happens if a user starts tapping buttons while the AI is "thinking"? Well, the answer is "bad things" - our game lets them play as black, and gets confused very quickly. So, our first change will be to disable all the column buttons when the AI's move starts, then re-enable them when it's finished.

Second, if the AI takes a long time, how does the user know the app hasn't locked up? There's no indication the AI is thinking, but it's easy enough to add by showing a custom `UIBarButtonItem` containing a `UIActivityIndicatorView`. It's not much, but it's enough to show the app is alive and well.

We're going to make both of these changes at once. All the AI code lives in `startAIMove()` so we can disable the column buttons and show the thinking spinner in there too. Add these lines to the start of `startAIMove()`, before the call to `async()`:

```swift
columnButtons.forEach { $0.isEnabled = false }

let spinner = UIActivityIndicatorView(style: .large)
spinner.startAnimating()

navigationItem.leftBarButtonItem = UIBarButtonItem(customView: spinner)
```

If you haven't seen `forEach` before, it's a way of quickly looping through an array, executing some code on every item in that array. In our case, the `$0` means "each button in the loop", and in this way all the buttons get disabled.

Once the AI has finished their move, `makeAIMove(in:)` will be called on the main thread, and that's our chance to undo these changes: we need to re-enable the column buttons, then destroy the thinking spinner. Add these two lines of code at the start of `makeAIMove(in:)`:

```swift
columnButtons.forEach { $0.isEnabled = true }
navigationItem.leftBarButtonItem = nil
```

These tiny changes stop users from accidentally screwing things up, and also stop them from worrying your app has got stuck in a loop somewhere. It's polish, yes, but polish is frequently what separates good games from great games.

That's it: the app is done! You can run it now and see how quickly you can beat the AI. It ought not to be too hard - our heuristic isn't very good, so sometimes the AI will miss obvious moves, just like a real player.

