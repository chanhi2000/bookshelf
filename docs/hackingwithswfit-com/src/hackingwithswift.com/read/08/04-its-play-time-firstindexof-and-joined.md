---
lang: ko-KR
title: "It's play time: firstIndex(of:) and joined()"
description: "Article(s) > It's play time: firstIndex(of:) and joined()"
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
      content: "Article(s) > It's play time: firstIndex(of:) and joined()"
    - property: og:description
      content: "It's play time: firstIndex(of:) and joined()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/08/04-its-play-time-firstindexof-and-joined.html
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
  "title": "It's play time: firstIndex(of:) and joined() | Hacking with iOS",
  "desc": "It's play time: firstIndex(of:) and joined()",
  "link": "https://hackingwithswift.com/read/8/4/its-play-time-firstindexof-and-joined",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/InHeXXy3NFc" />

We need to add three more methods to our view controller in order to bring this game to life: one to handle letter buttons being tapped, another to handle the current word being cleared, and a third to handle the current word being submitted. The first two are easiest, so let's get those done so we can get onto the serious stuff.

First, we already used the `addTarget()` method in `viewDidLoad()` to make all our letter buttons call the method `letterTapped()`, but right now it’s empty. Please fill it in like this:

```swift
@objc func letterTapped(_ sender: UIButton) {
    guard let buttonTitle = sender.titleLabel?.text else { return }
    currentAnswer.text = currentAnswer.text?.appending(buttonTitle)
    activatedButtons.append(sender)
    sender.isHidden = true
}
```

That does four things: 

1. It adds a safety check to read the title from the tapped button, or exit if it didn’t have one for some reason.
2. Appends that button title to the player’s current answer.
3. Appends the button to the `activatedButtons` array
4. Hides the button that was tapped.

The `activatedButtons` array is being used to hold all buttons that the player has tapped before submitting their answer. This is important because we're hiding each button as it is tapped, so if the user taps "Clear" we need to know which buttons are currently in use so we can re-show them. You already created an empty method for clear being tapped, so fill it in like this:

```swift
@objc func clearTapped(_ sender: UIButton) {
    currentAnswer.text = ""

    for btn in activatedButtons {
        btn.isHidden = false
    }

    activatedButtons.removeAll()
}
```

As you can see, this method removes the text from the current answer text field, unhides all the activated buttons, then removes all the items from the `activatedButtons` array.

That just leaves one very important method to fill in, and you already created its stub: the `submitTapped()` method for when the player taps the submit button.

This method will use `firstIndex(of:)` to search through the `solutions` array for an item and, if it finds it, tells us its position. Remember, the return value of `firstIndex(of:)` is optional so that in situations where nothing is found you won't get a value back - we need to unwrap its return value carefully.

If the user gets an answer correct, we're going to change the answers label so that rather than saying "7 LETTERS" it says "HAUNTED", so they know which ones they have solved already. 

The way we're going to do this is hopefully easy enough to understand: `firstIndex(of:)` will tell us which solution matched their word, then we can use that position to find the matching clue text. All we need to do is split the answer label text up by `\n`, replace the line at the solution position with the solution itself, then re-join the answers label back together.

You've already learned how to use `components(separatedBy:)` to split text into an array, and now it's time to meet its counterpart: `joined(separator:)`. This makes an array into a single string, with each array element separated by the string specified in its parameter.

Once that's done, we clear the current answer text field and add one to the score. If the score is evenly divisible by 7, we know they have found all seven words so we're going to show a `UIAlertController` that will prompt the user to go to the next level.

If you remember, Swift has a division remainder operator, `%`, that tells us what number remains when you divide one number evenly by another - that’s perfect here.

That's all the parts explained, so here's the complete `submitTapped()` method:

```swift
@objc func submitTapped(_ sender: UIButton) {
    guard let answerText = currentAnswer.text else { return }

    if let solutionPosition = solutions.firstIndex(of: answerText) {
        activatedButtons.removeAll()

        var splitAnswers = answersLabel.text?.components(separatedBy: "\n")
        splitAnswers?[solutionPosition] = answerText
        answersLabel.text = splitAnswers?.joined(separator: "\n")

        currentAnswer.text = ""
        score += 1

        if score % 7 == 0 {
            let ac = UIAlertController(title: "Well done!", message: "Are you ready for the next level?", preferredStyle: .alert)
            ac.addAction(UIAlertAction(title: "Let's go!", style: .default, handler: levelUp))
            present(ac, animated: true)
        }
    }
}
```

We haven’t written a `levelUp()` method yet, but it’s not so hard. It needs to:

1. Add 1 to `level`.
2. Remove all items from the `solutions` array.
3. Call `loadLevel()` so that a new level file is loaded and shown.
4. Make sure all our letter buttons are visible.

Add this `levelUp()` method now:

```swift
func levelUp(action: UIAlertAction) {
    level += 1
    solutions.removeAll(keepingCapacity: true)

    loadLevel()

    for btn in letterButtons {
        btn.isHidden = false
    }
}
```

As you can see, that code clears out the existing `solutions` array before refilling it inside `loadLevel()`. Then of course you'd need to create level2.txt, level3.txt and so on.

To get you started, I've made an example level2.txt for you inside my example files for this project - try adding that to the project and see what you think. Any further levels are for you to do - just make sure there's a total of 20 letter groups each time!

