---
lang: ko-KR
title: "Filtering using functions as parameters"
description: "Article(s) > Filtering using functions as parameters"
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
      content: "Article(s) > Filtering using functions as parameters"
    - property: og:description
      content: "Filtering using functions as parameters"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/39/06-filtering-using-functions-as-parameters.html
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
  "title": "Filtering using functions as parameters | Hacking with iOS",
  "desc": "Filtering using functions as parameters",
  "link": "https://hackingwithswift.com/read/39/6/filtering-using-functions-as-parameters",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

We're going to add the ability for users to filter the word list in one of two ways: by showing only words that occur at or greater than a certain frequency, or by showing words that contain a specific string. This will work by giving `PlayData` a new array, `filteredWords`, that will store all words that matches the user's filter. This will also be used for the table view's data source.

As before, we're going to be writing the tests first so we can be sure the code we right is correct, but first we must create some skeleton code in `PlayData` that the test will work. Start by adding this `filteredWords` property to `PlayData`:

```swift
var filteredWords = [String]()
```

Now add this empty method, just below the existing `init()` method:

```swift
func applyUserFilter(_ input: String) {
}
```

That's just enough functionality for us to start writing tests: an `applyUserFilter()` method that accepts a single string parameter, such as "home" or "100". What it needs to do is decide whether that parameter contains a number ("100") or not ("home"), then either show words with that frequency or words that match that substring.

I've done some number crunching for you, and have found that 495 words appear at least 100 times, whereas only one word appears more than 10,000 times. I've also found that "test" appears 56 times, "Swift" appears 7 times, and "Objective-C" doesn't appear once - conclusive proof, I think, that Shakespeare prefers Swift.

Using these numbers, as well as some more, we can write the following test in <FontIcon icon="fa-brands fa-swift"/>`Project39Tests.swift`:

```swift
func testUserFilterWorks() {
    let playData = PlayData()

    playData.applyUserFilter("100")
    XCTAssertEqual(playData.filteredWords.count, 495)

    playData.applyUserFilter("1000")
    XCTAssertEqual(playData.filteredWords.count, 55)

    playData.applyUserFilter("10000")
    XCTAssertEqual(playData.filteredWords.count, 1)

    playData.applyUserFilter("test")
    XCTAssertEqual(playData.filteredWords.count, 56)

    playData.applyUserFilter("swift")
    XCTAssertEqual(playData.filteredWords.count, 7)

    playData.applyUserFilter("objective-c")
    XCTAssertEqual(playData.filteredWords.count, 0)
}
```

I haven't included any messages to print when the tests fail, but I'm sure you can fill those in yourself!

Finding the numbers for this wasn't hard, so you're welcome to try it yourself once you've written the real `applyUserFilter()` later on: just pass anything you want into `applyUserFilter()` then assert that it's equal to 0. When you run the test, Xcode will check all the assertions you've made, and tell you what the actual answer was. You can then update your number with Xcode's number, and you're done.

If you run that new test now it will fail - after all, `filteredWords` is never actually being set in the `PlayData` class, so it will always contain 0. This is a feature of test-driven development: write tests that fail, then write just enough code to make those tests pass. For us, that means filling in `applyUserFilter()` so that it does something useful.

To make this test pass is surprisingly easy, although I'm going to make your life more difficult by squeezing some extra knowledge into you.

Let's start with identifying what the user is trying to do. They will enter a string into a `UIAlertController`, which could be "100", "556", "dog" or even "objective-c". Our code needs to decide whether the string they entered was an integer (in which case it is used to filter by frequency) or not (in which case it's used to filter by substring).

Swift has a built-in way to find out whether a string contains an integer, because it comes with a special `Int` failable initializer that accepts a string. A failable initializer is just like that `init()` method we wrote for `PlayData`, but instead of `init()` it's `init?()` because it can fail - it can return `nil`. In this situation, we'll get `nil` back if Swift was unable to convert the string we gave it into an integer.

Using this approach, we can begin to fill in `applyUserFilter()`:

```swift
func applyUserFilter(_ input: String) {
    if let userNumber = Int(input) {
        // we got a number!
    } else {
        // we got a string!
    }
}
```

You've already seen how to use `filter()` and the `count(for:)` method of `NSCountedSet`, plus we used `range(of:)` way back in project 4, so you should know everything you need to be able to write some filtering code to replace those two comments.

If you're not sure, have a think for a moment. My solution is below:

```swift
if let userNumber = Int(input) {
    filteredWords = allWords.filter { self.wordCounts.count(for: $0) >= userNumber }
} else {
    filteredWords = allWords.filter { $0.range(of: input, options: .caseInsensitive) != nil }
}
```

The first filter creates an array out of words with a count great or equal to the number the user entered, which is used when their text input was parsed as an integer. The second filter creates an array out of words that contain the user's text as a substring, which is used when their text input was not a number.

But I already said I want to squeeze some more knowledge into you, and in this case I want to extend our app so that rather than apply a filter directly, `applyUserFilter()` just calls a different method, `applyFilter()`, telling it what the filter function should be. This will allow you to add your own filters later on from inside <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift`, without having to manipulate the contents of the `PlayData` object directly.

To make this work, we're going to create a new method called `applyFilter()`, which will accept a function as its only parameter. This function needs to accept a single string parameter, and return true or false depending on whether that string should be included in the `filteredWords` array. That's the exact format required by the `filter()` method, so we can just pass it straight in.

Accepting a function as a parameter has syntax that can hurt your eyes at first, but the important thing to remember is that Swift considers functions to be a data type, just like strings, integers and others. This means they have a parameter name, just like strings and other data types.

First, here's what the `applyFilter()` method would look like if our filter was a regular string:

```swift
func applyFilter(_ filter: String) { }
```

Now, I'll modify that so that the `filter` parameter is actually a function that accepts a string and returns a boolean:

```swift
func applyFilter(_ filter: (String) -> Bool) { }
```

Let's break that down. First, the parameter is still called `filter`, which means that's how we can refer to it inside `applyFilter()`. Then we have `(String)`, which means this parameter is a function that accepts a single string parameter. Finally, we have `-> Bool`, which means the function should return a boolean.

It's possible to have as many of these as you want, so we could have written a method that accepts three filters if we wanted to:

```swift
func applyFilter(_ filter1: (String) -> Bool, filter2: (Int) -> String, filter3: (Double)) { }
```

In that code, `filter2` must be a function that accepts an integer parameter and returns a string, and `filter3` must be a function that accepts a double and returns nothing. We don't need anything that complicated here, but I hope you can see the syntax isn't that scary once you're used to it!

Here's the definition of `applyFilter()` again:

```swift
func applyFilter(_ filter: (String) -> Bool) { }
```

It accepts a single parameter, which must be a function that takes a string and returns a boolean. This is exactly what `filter()` wants, so we can just pass that parameter straight on. Here's the final code for `applyFilter()`:

```swift
func applyFilter(_ filter: (String) -> Bool) {
    filteredWords = allWords.filter(filter)
}
```

With that method written, we can now update `applyUserFilter()` so that it calls `applyFilter()` rather than modifying `filteredWords` directly, like this:

```swift
func applyUserFilter(_ input: String) {
    if let userNumber = Int(input) {
        applyFilter { self.wordCounts.count(for: $0) >= userNumber }
    } else {
        applyFilter { $0.range(of: input, options: .caseInsensitive) != nil }
    }
}
```

Does this code work? Well, there's only one way to find out: re-run the `testUserFilterWorks()` test and see what it returns. This test was failing before because we weren't even modifying `filteredWords`, but hopefully now all six assertions will evaluate to true, and the test will pass.

Having two methods rather than one might seem pointless to you, but it's actually smart forward-thinking. Modifying the `filteredWords` property in only one place means that if we add more code to `applyFilter()` later on, it will immediately be used everywhere the method is called. If we had modified `filteredWords` directly, we'd need to remember all the places it was changed and copy-paste code there every time a change was made.

This two-method approach also gives us encapsulation, which means that functionality is encapsulated inside an object rather than exposed for others to manipulate. If you want to adjust filters directly from <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift` - which is a perfectly valid thing to want to do - you really wouldn't want to change the `filteredWords` property directly. Instead, it's much nicer to call a method, and trust that `PlayData` will do the right thing.

There is a catch with this approach: what's stopping you from (unwisely!) trying to change the `filteredWords` property from <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift`? The answer is "nothing" - you could put something like this in `viewDidLoad()` if you really wanted to:

```swift
playData.filteredWords = ["Neener!"]
```

Doing that would unpick all the work we did to avoid accessing `filteredWords`. Fortunately, Swift comes to the rescue: we can specify that everyone can *read* from the `filteredWords` property, but only the `PlayData` class can *write* to it. This restores our safety, and forces everyone to use the `applyUserFilter()` and `applyFilter()` methods.

To make this change, adjust the `filteredWords` property in `PlayData` to this:

```swift
private(set) var filteredWords = [String]()
```

That marks the setter of `filteredWords` - the code that handles writing - as private, which means only code inside the `PlayData` class can use it. The getter - the code that handles reading - is unaffected.

You might think I engineered all this just to teach you even more Swift, but I couldn't possibly comment…

