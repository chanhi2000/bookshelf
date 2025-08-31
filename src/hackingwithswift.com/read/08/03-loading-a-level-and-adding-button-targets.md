---
lang: ko-KR
title: "Loading a level and adding button targets"
description: "Article(s) > Loading a level and adding button targets"
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
      content: "Article(s) > Loading a level and adding button targets"
    - property: og:description
      content: "Loading a level and adding button targets"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/08/03-loading-a-level-and-adding-button-targets.html
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
  "title": "Loading a level and adding button targets | Hacking with iOS",
  "desc": "Loading a level and adding button targets",
  "link": "https://hackingwithswift.com/read/8/3/loading-a-level-and-adding-button-targets",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/VudWhMzF1uQ" />

After our mammoth effort of building the user interface in code, it’s time to continue with something much easier: loading a level and showing letter parts on our buttons.

This game asks players to spell seven words out of various letter groups, and each word comes with a clue for them to guess. It's important that the total number of letter groups adds up to 20, as that's how many buttons you have. I created the first level for you, and it looks like this:

```swift
HA|UNT|ED: Ghosts in residence
LE|PRO|SY: A Biblical skin disease
TW|ITT|ER: Short online chirping
OLI|VER: Has a Dickensian twist
ELI|ZAB|ETH: Head of state, British style
SA|FA|RI: The zoological web
POR|TL|AND: Hipster heartland
```

As you can see, I've used the pipe symbol to split up my letter groups, meaning that one button will have "HA", another "UNT", and another "ED". There's then a colon and a space, followed by a simple clue. This level is in the files for this project you should download from [GitHub at (<FontIcon icon="iconfont icon-github"/>`twostraws/HackingWithSwift`)](https://github.com/twostraws/HackingWithSwift). You should copy level1.txt into your Xcode project as you have done before.

Our first task will be to load the level and configure all the buttons to show a letter group. We're going to need two new arrays to handle this: one to store the buttons that are currently being used to spell an answer, and one for all the possible solutions. We also need two integers: one to hold the player's score, which will start at 0 but obviously change during play, and one to hold the current level.

So, declare these properties just below the views we defined previously:

```swift
var activatedButtons = [UIButton]()
var solutions = [String]()

var score = 0
var level = 1
```

We also need to create three methods that will be called from our buttons: one when submit is tapped, one when clear is tapped, and one when any of the letter buttons are tapped. These don’t need any code for now, but we *do* need to make sure they are called when our buttons are tapped.

First, add these three empty methods below `viewDidLoad()`:

```swift
@objc func letterTapped(_ sender: UIButton) {
}

@objc func submitTapped(_ sender: UIButton) {
}

@objc func clearTapped(_ sender: UIButton) {
}
```

All three of those have the `@objc` attribute because they are going to be called by the buttons - by Objective-C code - when they are tapped.

When we used `UIBarButtonItem` previously, we were able to specify the target and selector of that button right in the initializer. This is done a little differently with buttons: they have a dedicated `addTarget()` method that connects the buttons to some code.

So, in `loadView()` add this where we create the submit button:

```swift
submit.addTarget(self, action: #selector(submitTapped), for: .touchUpInside)
```

The target, action, and selector parts you know already, but the `.touchUpInside` part is new - that’s UIKit’s way of saying that the user pressed down on the button and lifted their touch while it was still inside. So, altogether that line means “when the user presses the submit button, call `submitTapped()` on the current view controller.”

Now add this where the clear button is created:

```swift
clear.addTarget(self, action: #selector(clearTapped), for: .touchUpInside)
```

That will call the `clearTapped()` method when the button is triggered.

Finally, we want all the letter buttons to call `letterTapped()` when they are tapped - they share the same method, much like our flag buttons in project 2.

So, add this line inside our nested loop, just below the call to `letterButtons.append()`:

```swift
letterButton.addTarget(self, action: #selector(letterTapped), for: .touchUpInside)
```

Of course, adding all those targets won’t actually *do* anything, because the three methods they are calling are all empty.

We’ll fill them in later, but first let’s focus on loading level data into the game.  We're going to isolate level loading into a single method, called `loadLevel()`. This needs to do two things: 

1. Load and parse our level text file in the format I showed you earlier.
2. Randomly assign letter groups to buttons.

In project 5 you already learned how to create a `String` using `contentsOf` to load files from disk, and we'll be using that to load our level. In that same project you learned how to use `components(separatedBy:)` to split up a string into an array, and we'll use that too.

We'll also need to use Swift’s array shuffling code that we've used before. But there are *some* new things to learn, honest! 

First, we'll be using the `enumerated()` method to loop over an array. We haven't used this before, but it's helpful because it passes you each object from an array as part of your loop, as well as that object's position in the array.

There's also a new string method to learn, called `replacingOccurrences()`. This lets you specify two parameters, and replaces all instances of the first parameter with the second parameter. We'll be using this to convert "HA|UNT|ED" into HAUNTED so we have a list of all our solutions.

Before I show you the code, watch out for how I use the method's three variables: `clueString` will store all the level's clues, `solutionString` will store how many letters each answer is (in the same position as the clues), and `letterBits` is an array to store all letter groups: HA, UNT, ED, and so on.

Now add the `loadLevel()` method:

```swift
func loadLevel() {
    var clueString = ""
    var solutionString = ""
    var letterBits = [String]()

    if let levelFileURL = Bundle.main.url(forResource: "level\(level)", withExtension: "txt") {
        if let levelContents = try? String(contentsOf: levelFileURL) {
            var lines = levelContents.components(separatedBy: "\n")
            lines.shuffle()

            for (index, line) in lines.enumerated() {
                let parts = line.components(separatedBy: ": ")
                let answer = parts[0]
                let clue = parts[1]

                clueString += "\(index + 1). \(clue)\n"

                let solutionWord = answer.replacingOccurrences(of: "|", with: "")
                solutionString += "\(solutionWord.count) letters\n"
                solutions.append(solutionWord)

                let bits = answer.components(separatedBy: "|")
                letterBits += bits
            }
        }
    }

    // Now configure the buttons and labels
}
```

If you read all that and it made sense first time, great! You can skip over the next few paragraphs and jump to the bold text "All done!". If you read it and only some made sense, these next few paragraphs are for you.

First, the method uses `url(forResource:)` and `contentsOf` to find and load the level string from our app bundle. String interpolation is used to combine "level" with our current level number, making "level1.txt". The text is then split into an array by breaking on the `\n` character (that's line break, remember), then shuffled so that the game is a little different each time.

Our loop uses the `enumerated()` method to go through each item in the `lines` array. This is different to how we normally loop through an array, but `enumerated()` is helpful here because it tells us where each item was in the array so we can use that information in our clue string. In the code above, `enumerated()` will place the item into the `line` variable and its position into the `index` variable.

We already split the text up into lines based on finding `\n`, but now we split each line up based on finding `:`, because each line has a colon and a space separating its letter groups from its clue. We put the first part of the split line into `answer` and the second part into `clue`, for easier referencing later.

Next comes our new string method call, `replacingOccurrences(of:)`. We're asking it to replace all instances of `|` with an empty string, so HA|UNT|ED will become HAUNTED. We then use `count` to get the length of our string then use that in combination with string interpolation to add to our solutions string.

Finally, we make yet another call to `components(separatedBy:)` to turn the string "HA|UNT|ED" into an array of three elements, then add all three to our `letterBits` array.

**All done!**

Time for some more code: our current `loadLevel()` method ends with a comment saying `// Now configure the buttons and labels`, and we're going to fill that in with the final part of the method. This needs to set the `cluesLabel` and `answersLabel` text, shuffle up our buttons, then assign letter groups to buttons.

Before I show you the actual code, there's a new string method to introduce: `trimmingCharacters(in:)` removes any letters you specify from the start and end of a string. It's most frequently used with the parameter `.whitespacesAndNewlines`, which trims spaces, tabs and line breaks, and we need exactly that here because our clue string and solutions string will both end up with an extra line break.

Put this code where the comment was:

```swift
cluesLabel.text = clueString.trimmingCharacters(in: .whitespacesAndNewlines)
answersLabel.text = solutionString.trimmingCharacters(in: .whitespacesAndNewlines)

letterBits.shuffle()

if letterBits.count == letterButtons.count {
    for i in 0 ..< letterButtons.count {
        letterButtons[i].setTitle(letterBits[i], for: .normal)
    }
}
```

That loop will count from 0 up to but not including the number of buttons, which is useful because we have as many items in our `letterBits` array as our `letterButtons` array. Looping from 0 to 19 (inclusive) means we can use the `i` variable to set a button to a letter group.

Before you run your program, make sure you add a call to `loadLevel()` in your `viewDidLoad()` method. Once that's done, you should be able to see all the buttons and clues configured correctly. Now all that's left is to let the player, well, *play*.

