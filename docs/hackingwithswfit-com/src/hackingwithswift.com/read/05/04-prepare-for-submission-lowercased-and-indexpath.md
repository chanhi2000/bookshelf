---
lang: ko-KR
title: "Prepare for submission: lowercased() and IndexPath"
description: "Article(s) > Prepare for submission: lowercased() and IndexPath"
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
      content: "Article(s) > Prepare for submission: lowercased() and IndexPath"
    - property: og:description
      content: "Prepare for submission: lowercased() and IndexPath"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/05/04-prepare-for-submission-lowercased-and-indexpath.html
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
  "title": "Prepare for submission: lowercased() and IndexPath | Hacking with iOS",
  "desc": "Prepare for submission: lowercased() and IndexPath",
  "link": "https://hackingwithswift.com/read/5/4/prepare-for-submission-lowercased-and-indexpath",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/jjOcsdYZE9c" />

You can breathe again: we're done with closures for now. I know that wasn't easy, but once you understand basic closures you really have come a long way in your Swift adventure.

We're going to do some much easier coding now, because believe it or not we're not that far from making this game actually work!

We have now gone over the structure of a closure: trailing closure syntax, unowned self, a parameter being passed in, then the need for `self.` to make capturing clear. We haven't really talked about the actual content of our closure, because there isn't a lot to it. As a reminder, here's how it looks:

```swift
guard let answer = ac?.textFields?[0].text else { return }
self?.submit(answer)
```

The first line safely unwraps the array of text fields - it's optional because there might not be any. The second line pulls out the text from the text field and passes it to our (all-new-albeit-empty) `submit()` method.

This method needs to check whether the player's word can be made from the given letters. It needs to check whether the word has been used already, because obviously we don't want duplicate words. It also needs to check whether the word is actually a valid English word, because otherwise the user can just type in nonsense.

If all three of those checks pass, `submit()` needs to add the word to the `usedWords` array, then insert a new row in the table view. We could just use the table view's `reloadData()` method to force a full reload, but that's not very efficient when we're changing just one row.

First, let’s create dummy methods for the three checks we’re going to do: is the word possible, is it original, and is it real? Each of these will accept a word string and return true or false, but for now we’ll just always return true - we’ll come back to these soon. Add these methods now:

```swift
func isPossible(word: String) -> Bool {
    return true
}

func isOriginal(word: String) -> Bool {
    return true
}

func isReal(word: String) -> Bool {
    return true
}
```

With those three methods in place, we can write our first pass at the `submit()` method:

```swift
func submit(_ answer: String) {
    let lowerAnswer = answer.lowercased()

    if isPossible(word: lowerAnswer) {
        if isOriginal(word: lowerAnswer) {
            if isReal(word: lowerAnswer) {
                usedWords.insert(answer, at: 0)

                let indexPath = IndexPath(row: 0, section: 0)
                tableView.insertRows(at: [indexPath], with: .automatic)
            }
        }
    }
}
```

If a user types "cease" as a word that can be made out of our started word "agencies", it's clear that is correct because there is one "c", two "e"s, one "a" and one "s". But what if they type "Cease"? Now it has a capital C, and "agencies" doesn't have a capital C. Yes, that's right: strings are case-sensitive, which means Cease is not cease is not CeasE is not CeAsE.

The solution to this is quite simple: all the starter words are lowercase, so when we check the player's answer we immediately lowercase it using its `lowercased()` method. This is stored in the `lowerAnswer` constant because we want to use it several times.

We then have three `if` statements, one inside another. These are called nested statements, because you nest one inside the other. Only if all three statements are true (the word is possible, the word hasn't been used yet, and the word is a real word), does the main block of code execute.

Once we know the word is good, we do three things: insert the new word into our `usedWords` array at index 0. This means "add it to the start of the array," and means that the newest words will appear at the top of the table view.

The next two things are related: we insert a new row into the table view. Given that the table view gets all its data from the used words array, this might seem strange. After all, we just inserted the word into the `usedWords` array, so why do we need to insert anything into the table view?

The answer is animation. Like I said, we could just call the `reloadData()` method and have the table do a full reload of all rows, but it means a lot of extra work for one small change, and also causes a jump - the word wasn't there, and now it is.

This can be hard for users to track visually, so using `insertRows()` lets us tell the table view that a new row has been placed at a specific place in the array so that it can animate the new cell appearing. Adding one cell is also significantly easier than having to reload everything, as you might imagine!

There are two quirks here that require a little more detail. First, `IndexPath` is something we looked at briefly in project 1, as it contains a section and a row for every item in your table. As with project 1 we aren't using sections here, but the row number should equal the position we added the item in the array - position 0, in this case.

Second, the `with` parameter lets you specify how the row should be animated in. Whenever you're adding and removing things from a table, the `.automatic` value means "do whatever is the standard system animation for this change." In this case, it means "slide the new row in from the top."

Our three checking methods always return true regardless of what word is entered, but apart from that the game is starting to come together. Press <kbd>Cmd</kbd>+<kbd>R</kbd> to play back what you have: you should be able to tap the + button and enter words into the alert.

