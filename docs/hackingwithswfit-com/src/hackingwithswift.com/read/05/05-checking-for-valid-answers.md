---
lang: ko-KR
title: "Checking for valid answers"
description: "Article(s) > Checking for valid answers"
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
      content: "Article(s) > Checking for valid answers"
    - property: og:description
      content: "Checking for valid answers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/05/05-checking-for-valid-answers.html
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
  "title": "Checking for valid answers | Hacking with iOS",
  "desc": "Checking for valid answers",
  "link": "https://hackingwithswift.com/read/5/5/checking-for-valid-answers",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/mZdSnxVG9pM" />

As you’ve seen, the `return` keyword exits a method at any time it's used. If you use `return` by itself, it exits the method and does nothing else. But if you use `return` with a value, it sends that value back to whatever called the method. We’ve used it previously to send back the number of rows in a table, for example.

Before you can send a value back, you need to tell Swift that you expect to return a value. Swift will automatically check that a value is returned and it's of the right data type, so this is important. We just put in stubs (empty methods that do nothing) for three new methods, each of which returns a value. Let's take a look at one in more detail:

```swift
func isOriginal(word: String) -> Bool {
    return true
}
```

The method is called `isOriginal()`, and it takes one parameter that's a string. But before the opening brace there's something important: `-> Bool`. This tells Swift that the method will return a boolean value, which is the name for a value that can be either true or false.

The body of the method has just one line of code: `return true`. This is how the `return` statement is used to send a value back to its caller: we're returning true from this method, so the caller can use this method inside an `if` statement to check for true or false.

This method can have as much code as it needs in order to evaluate fully whether the word has been used or not, including calling any other methods it needs. We're going to change it so that it calls another method, which will check whether our `usedWords` array already contains the word that was provided. Replace its current `return true` code with this:

```swift
return !usedWords.contains(word)
```

There are two new things here. First, `contains()` is a method that checks whether the array it’s called on (`usedWords`) contains the value specified in parameter 2 (`word`). If it does contain the value, `contains()` returns true; if not, it returns false. Second, the `!` symbol. You've seen this before as the way to force unwrap optional variables, but here it's something different: it means *not*.

The difference is small but important: when used before a variable or constant, `!` means "not" or "opposite". So if `contains()` returns true, `!` flips it around to make it false, and vice versa. When used after a variable or constant, `!` means "force unwrap this optional variable."

This is used because our method is called `isOriginal()`, and should return true if the word has never been used before. If we had used `return usedWords.contains(word)`, then it would do the opposite: it would return true if the word had been used and false otherwise. So, by using `!` we're flipping it around so that the method returns true if the word is new.

That's one method down. Next is the `isPossible()`, which also takes a string as its only parameter and returns a `Bool` - true or false. This one is more complicated, but I've tried to make the algorithm as simple as possible.

How can we be sure that "cease" can be made from "agencies", using each letter only once? The solution I've adopted is to loop through every letter in the player's answer, seeing whether it exists in the eight-letter start word we are playing with. If it does exist, we remove the letter from the start word, then continue the loop. So, if we try to use a letter twice, it will exist the first time, but then get removed so it doesn't exist the next time, and the check will fail.

In project 4 we used the `contains()` method to see if one string exists inside another. Here we need something more precise: if it exists, *where*? That extra information allows us to remove the character from our word so that it won’t be used twice. Swift has a separate method for this called `firstIndex(of:)`, which will return the first position of the substring if it exists or nil otherwise.

To put that into practice, here’s the `isPossible()` method:

```swift
func isPossible(word: String) -> Bool {
    guard var tempWord = title?.lowercased() else { return false }

    for letter in word {
        if let position = tempWord.firstIndex(of: letter) {
            tempWord.remove(at: position)
        } else {
            return false
        }
    }

    return true
}
```

If the letter was found in the string, we use `remove(at:)` to remove the used letter from the `tempWord` variable. This is why we need the `tempWord` variable at all: because we'll be removing letters from it so we can check again the next time the loop goes around.

The method ends with `return true`, because this line is reached only if every letter in the user's word was found in the start word no more than once. If any letter isn't found, or is used more than possible, one of the `return false` lines would have been hit, so by this point we're sure the word is good.

::: important

we have told Swift that we are returning a boolean value from this method, and it will check every possible outcome of the code to make sure a boolean value is returned no matter what.

:::

Time for the final method. Replace the current `isReal()` method with this:

```swift
func isReal(word: String) -> Bool {
    let checker = UITextChecker()
    let range = NSRange(location: 0, length: word.utf16.count)
    let misspelledRange = checker.rangeOfMisspelledWord(in: word, range: range, startingAt: 0, wrap: false, language: "en")

    return misspelledRange.location == NSNotFound
}
```

There's a new class here, called `UITextChecker`. This is an iOS class that is designed to spot spelling errors, which makes it perfect for knowing if a given word is real or not. We're creating a new instance of the class and putting it into the `checker` constant for later.

There's a new type here too, called `NSRange`. This is used to store a string range, which is a value that holds a start position and a length. We want to examine the whole string, so we use 0 for the start position and the string's length for the length.

Next, we call the `rangeOfMisspelledWord(in:)` method of our `UITextChecker` instance. This wants five parameters, but we only care about the first two and the last one: the first parameter is our string, `word`, the second is our range to scan (the whole string), and the last is the language we should be checking with, where `en` selects English.

Parameters three and four aren't useful here, but for the sake of completeness: parameter three selects a point in the range where the text checker should start scanning, and parameter four lets us set whether the `UITextChecker` should start at the beginning of the range if no misspelled words were found starting from parameter three. Neat, but not helpful here.

Calling `rangeOfMisspelledWord(in:)` returns another `NSRange` structure, which tells us where the misspelling was found. But what we care about was whether any misspelling was found, and if nothing was found our `NSRange` will have the special location `NSNotFound`. Usually `location` would tell you where the misspelling started, but `NSNotFound` is telling us the word is spelled correctly - i.e., it's a valid word.

::: note

In case you were curious, `NSRange` pre-dates Swift, and therefore doesn’t have access to optionals - `NSNotFound` is effectively a magic number that means “not found”, assigned to a constant to make it easier to use.

:::

Here the `return` statement is used in a new way: as part of an operation involving `==`. This is a very common way to code, and what happens is that `==` returns true or false depending on whether `misspelledRange.location` is equal to `NSNotFound`. That true or false is then given to `return` as the return value for the method.

We could have written that same line across multiple lines, but it's not common:

```swift
if misspelledRange.location == NSNotFound {
    return true
} else {
    return false
}
```

That completes the third of our missing methods, so the project is almost complete. Run it now and give it a thorough test!

Before we continue, there’s one small thing I want to touch on briefly. In the `isPossible()` method we looped over each letter by treating the word as an array, but in this new code we use `word.utf16` instead. Why?

The answer is an annoying backwards compatibility quirk: Swift’s strings natively store international characters as individual characters, e.g. the letter “é” is stored as precisely that. However, UIKit was written in Objective-C before Swift’s strings came along, and it uses a different character system called UTF-16 - short for 16-bit Unicode Transformation Format - where the accent and the letter are stored separately.

It’s a subtle difference, and often it isn’t a difference at all, but it’s becoming increasingly problematic because of the rise of emoji - those little images that are frequently used in messages. Emoji are actually just special character combinations behind the scenes, and they are measured differently with Swift strings and UTF-16 strings: Swift strings count them as 1-letter strings, but UTF-16 considers them to be 2-letter strings. This means if you use `count` with UIKit methods, you run the risk of miscounting the string length.

I realize this seems like pointless additional complexity, so let me try to give you a simple rule: when you’re working with UIKit, SpriteKit, or any other Apple framework, use `utf16.count` for the character count. If it’s just your own code - i.e. looping over characters and processing each one individually - then use `count` instead.

