---
lang: ko-KR
title: "Making the basic game work: UIButton and CALayer"
description: "Article(s) > Making the basic game work: UIButton and CALayer"
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
      content: "Article(s) > Making the basic game work: UIButton and CALayer"
    - property: og:description
      content: "Making the basic game work: UIButton and CALayer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/02/03-making-the-basic-game-work-uibutton-and-calayer.html
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
  "title": "Making the basic game work: UIButton and CALayer | Hacking with iOS",
  "desc": "Making the basic game work: UIButton and CALayer",
  "link": "https://hackingwithswift.com/read/2/3/making-the-basic-game-work-uibutton-and-calayer",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/XXqrQvWpVzE" />

We're going to create an array of strings that will hold all the countries that will be used for our game, and at the same time we're going to create another property that will hold the player's current score - it's a game, after all!

Let's start with the new properties. Add these two lines directly beneath the `@IBOutlet` lines you added earlier in <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift`:

```swift
var countries = [String]()
var score = 0
```

The first line is something you saw in project 1: it creates a new property called `countries` that will hold a new array of strings. The second one creates a new property called `score` that is set to 0. As you’ve seen previously, Swift’s type inference works wonders here - it figures out what data type a variable or constant should be based on what we put into it. 

We're going to be putting all this into practice over the next few minutes. First, let's fill our countries array with the flags we have, so add this code inside the `viewDidLoad()` method:

```swift
countries.append("estonia")
countries.append("france")
countries.append("germany")
countries.append("ireland")
countries.append("italy")
countries.append("monaco")
countries.append("nigeria")
countries.append("poland")
countries.append("russia")
countries.append("spain")
countries.append("uk")
countries.append("us")
```

This is identical to the code you saw in project 1, so there's nothing to learn here. If you recall your Swift introduction, you’ll know there's a more efficient way of doing this, which is to create it all on one line. To do that, you would write:

```swift
countries += ["estonia", "france", "germany", "ireland", "italy", "monaco", "nigeria", "poland", "russia", "spain", "uk", "us"]
```

The next step is to write a method that shows three random flag images on the screen. Buttons have a `setImage()` method that lets us control what picture is shown inside and when, so we can use that with `UIImage` to display our flags.

Add this new method underneath `viewDidLoad()`:

```swift
func askQuestion() {
    button1.setImage(UIImage(named: countries[0]), for: .normal)
    button2.setImage(UIImage(named: countries[1]), for: .normal)
    button3.setImage(UIImage(named: countries[2]), for: .normal)
}
```

The first line is easy enough: we're declaring a new method called `askQuestion()`, and it takes no parameters. The next three use `UIImage(named:)` and read from an array by position, both of which we used in project 1, so that bit isn't new either. However, the rest of those lines is new, and shows off two things:

- `button1.setImage()` assigns a `UIImage` to the button. We have the US flag in there right now, but this will change it when `askQuestion()` is called.
- `for: .normal` The `setImage()` method takes a second parameter that describes which state of the button should be changed. We're specifying `.normal`, which means "the standard state of the button."

That `.normal` parameter looks like an enum, but it’s actually a static property of a struct called `UIControlState`. In Objective-C - the language UIKit was written in - it’s an enum, but in Swift it gets mapped to a struct that just happens to be *used* like an enum, so if you want to be technically correct it’s not a true enum in Swift. At this point in your Swift career there is no difference, but let’s face it: “technically correct” is the best kind of correct.

![This is how your code should look at this point.](https://hackingwithswift.com/img/books/hws/2-11@2x.png)

Now that we have the countries all set up and a method that displays flags, all we need to do is add one more line just before the end of `viewDidLoad()` to make it all spring to life:

```swift
askQuestion()
```

At this point the game is in a fit state to run, so let’s give it a try.

First, select the iPhone XR simulator by going to the Product menu and choosing Destination > iPhone XR. Now press <kbd>Cmd</kbd>+<kbd>R</kbd> now to launch the Simulator and give it a try.

You'll immediately notice two problems

1. We're showing the Estonian and French flags, both of which have white in them so it's hard to tell whether they are flags or just blocks of color
2. The "game" isn't much fun, because it's always the same three flags!

The second problem is going to have to wait a few minutes, but we can fix the first problem now. One of the many powerful things about views in iOS is that they are backed by what's called a `CALayer`, which is a Core Animation data type responsible for managing the way your view looks.

Conceptually, `CALayer` sits beneath all your `UIView`s (that's the parent of `UIButton`, `UITableView`, and so on), so it's like an exposed underbelly giving you lots of options for modifying the appearance of views, as long as you don't mind dealing with a little more complexity. We're going to use one of these appearance options now: `borderWidth`.

The Estonian flag has a white stripe at the bottom, and because our view controller has a white background that whole stripe is invisible. We can fix that by giving the layer of our buttons a `borderWidth` of 1, which will draw a one point black line around them. Put these three lines in `viewDidLoad()` directly before it calls `askQuestion()`:

```swift
button1.layer.borderWidth = 1
button2.layer.borderWidth = 1
button3.layer.borderWidth = 1
```

Remember how points and pixels are different things? In this case, our border will be 1 pixel on non-retina devices, 2 pixels on retina devices, and 3 on retina HD devices. Thanks to the automatic point-to-pixel multiplication, this border will visually appear to have more or less the same thickness on all devices.

By default, the border of `CALayer` is black, but you can change that if you want by using the `UIColor` data type. I said that `CALayer` brings with it a little more complexity, and here's where it starts to be visible: `CALayer` sits at a lower technical level than `UIButton`, which means it doesn't understand what a `UIColor` is. `UIButton` knows what a `UIColor` is because they are both at the same technical level, but `CALayer` is below `UIButton`, so `UIColor` is a mystery.

Don't despair, though: `CALayer` has its own way of setting colors called `CGColor`, which comes from Apple's Core Graphics framework. This, like `CALayer`, is at a lower level than `UIButton`, so the two can talk happily - again, as long as you're happy with the extra complexity.

Even better, `UIColor` (which sits above `CGColor`) is able to convert to and from `CGColor` easily, which means you don't need to worry about the complexity - hurray!

So, let's put all that together into some code that changes the border color using `UIColor` and `CGColor` together. Put these three just below the three `borderWidth` lines in `viewDidLoad()`:

```swift
button1.layer.borderColor = UIColor.lightGray.cgColor
button2.layer.borderColor = UIColor.lightGray.cgColor
button3.layer.borderColor = UIColor.lightGray.cgColor
```

As you can see, `UIColor` has a property called `lightGray` that returns (shock!) a `UIColor` instance that represents a light gray color. But we can't put a `UIColor` into the `borderColor` property because it belongs to a `CALayer`, which doesn't understand what a `UIColor` is. So, we add `.cgColor` to the end of the `UIColor` to have it automagically converted to a `CGColor`. Perfect.

If `lightGray` doesn't interest you, you can create your own color like this:

```swift
UIColor(red: 1.0, green: 0.6, blue: 0.2, alpha: 1.0).cgColor
```

You need to specify four values: red, green, blue and alpha, each of which should range from 0 (none of that color) to 1.0 (all of that color). The code above generates an orange color, then converts it to a `CGColor` so it can be assigned to a `CALayer`'s `borderColor` property.

That's enough with the styling, I think - if you run the app now it should look better.

