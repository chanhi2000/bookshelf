---
lang: ko-KR
title: "Listing images with FileManager"
description: "Article(s) > Listing images with FileManager"
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
      content: "Article(s) > Listing images with FileManager"
    - property: og:description
      content: "Listing images with FileManager"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/01/02-listing-images-with-filemanager.html
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
  "title": "Listing images with FileManager | Hacking with iOS",
  "desc": "Listing images with FileManager",
  "link": "https://hackingwithswift.com/read/1/2/listing-images-with-filemanager",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/XqFSZUM04fg" />

The images I've provided you with come from the National Oceanic and Atmospheric Administration (NOAA), which is a US government agency and thus produces public domain content that we can freely reuse. Once they are copied into your project, Xcode will automatically build them into your finished app so that you can access them.

Behind the scenes, an iOS app is actually a directory containing lots of files: the binary itself (that's the compiled version of your code, ready to run), all the media assets your app uses, any visual layout files you have, plus a variety of other things such as metadata and security entitlements.

These app directories are called bundles, and they have the file extension .app. Because our media files are loose inside the folder, we can ask the system to tell us all the files that are in there then pull out the ones we want. You may have noticed that all the images start with the name "nssl" (short for National Severe Storms Laboratory), so our task is simple: list all the files in our app's directory, and pull out the ones that start with "nssl".

For now, we’ll load that list and just print it to Xcode’s built in log viewer, but soon we’ll make them appear in our app.

So, step 1: open <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift`. A view controller is best thought of as being one screen of information, and for us that’s just one big blank screen. <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift` is responsible for showing that blank screen, and right now it won’t contain much code. You should see something like this:

```swift
import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
}
```

That contains four interesting things I want to discuss before moving on.

1. The file starts with `import UIKit`, which means “this file will reference the iOS user interface toolkit.”
2. The `class ViewController: UIViewController` line means “I want to create a new screen of data called ViewController, based on UIViewController.” When you see a data type that starts with “UI”, it means it comes from UIKit. `UIViewController` is Apple’s default screen type, which is empty and white until we change it.
3. The line `override func viewDidLoad()` starts a method. As you know, the `override` keyword is needed because it means “we want to change Apple’s default behavior from `UIViewController`.” `viewDidLoad()` is called by UIKit when the screen has loaded, and is ready for you to customize.
4. The `viewDidLoad()` method contains one line of code saying `super.viewDidLoad()` and one line of comment (that’s the line starting with `//`). This `super` call means “tell Apple’s `UIViewController` to run its own code before I run mine,” and you’ll see this used a lot.

We’ll come back to this code a *lot* in future projects; don’t worry if it’s all a bit hazy right now.

**No line numbers?** While you’re reading code, it’s frequently helpful to have line numbers enabled so you can refer to specific code more easily. If your Xcode isn't showing line numbers by default, I suggest you turn them on now: go to the Xcode menu and choose Preferences, then choose the Text Editing tab and make sure "Line numbers" is checked.

As I said before, the `viewDidLoad()` method is called when the screen has loaded and is ready for you to customize. We're going to put some more code into that method to load the NSSL images. Add this beneath the line that says `super.viewDidLoad()`:

```swift
let fm = FileManager.default
let path = Bundle.main.resourcePath!
let items = try! fm.contentsOfDirectory(atPath: path)

for item in items {
    if item.hasPrefix("nssl") {
        // this is a picture to load!
    }
}
```

::: note

Some experienced Swift developers will read that code, see `try!`, then write me an angry email. If you’re considering doing just that, please continue reading first.

:::

That’s a big chunk of code, most of which is new. Let’s walk through what it does line by line:

- The line `let fm = FileManager.default` declares a constant called `fm` and assigns it the value returned by `FileManager.default`. This is a data type that lets us work with the filesystem, and in our case we'll be using it to look for files.
- The line `let path = Bundle.main.resourcePath!` declares a constant called `path` that is set to the resource path of our app's bundle. Remember, a bundle is a directory containing our compiled program and all our assets. So, this line says, "tell me where I can find all those images I added to my app."
- The line `let items = try! fm.contentsOfDirectory(atPath: path)` declares a third constant called `items` that is set to the contents of the directory at a path. Which path? Well, the one that was returned by the line before. As you can see, Apple's long method names really does make their code quite self-descriptive! The `items` constant will be an array of strings containing filenames.
- The line `for item in items {` starts a loop that will execute once for every item we found in the app bundle. Remember: the line has an opening brace at the end, signaling the start of a new block of code, and there's a matching closing brace four lines beneath. Everything inside those braces will be executed each time the loop goes around.
- The line `if item.hasPrefix("nssl") {` is the first line inside our loop. By this point, we'll have the first filename ready to work with, and it'll be called `item`. To decide whether it's one we care about or not, we use the `hasPrefix()` method: it takes one parameter (the prefix to search for) and returns either true or false. That "if" at the start means this line is a conditional statement: if the item has the prefix "nssl", then… that's right, another opening brace to mark another new code block. This time, the code will be executed only if `hasPrefix()` returned true.
- Finally, the line `// this is a picture to load!` is a comment - if we reach here, `item` contains the name of a picture to load from our bundle, so we need to store it somewhere.

In this instance it’s perfectly fine to use `Bundle.main.resourcePath!` and `try!`, because if this code fails it means our app can't read its own data so something must be seriously wrong. Some Swift developers attempt to write code to handle these catastrophic errors at runtime, but sadly all too often they just mask the actual problem that occurred.

Right now our code loads the list of files that are inside our app bundle, then loops over them all to find the ones with a name that begins with “nssl”. However, it doesn’t actually *do* anything with those files, so our next step is to create an array of all the “nssl” pictures so we can refer to them later rather than having to re-read the resources directory again and again.

The three constants we already created - `fm`, `path`, and `items` - live inside the `viewDidLoad()` method, and will be destroyed as soon as that method finishes. What we want is a way to attach data to the whole `ViewController` type so that it will exist for as long as our screen exists. So, this a perfect example of when to use a property - we can give our `ViewController` class as many of these properties as we want, then read and write them as often as needed while the screen exists.

To create a property, you need to declare it *outside* of methods. We’ve been creating constants using `let` so far, but this array is going to be changed inside our loop so we need to make it variable. We also need to tell Swift exactly what kind of data it will hold - in our case that’s an array of strings, where each item will be the name of an “nssl” picture.

Add this line of code *before* `viewDidLoad()`:

```swift
var pictures = [String]()
```

If you’ve placed it correctly, your code should look like this:

```swift
class ViewController: UIViewController {
    var pictures = [String]()

    override func viewDidLoad() {
        super.viewDidLoad()

        let fm = FileManager.default
```

That `pictures` array will be created when the `ViewController` screen is created, and exist for as long as the screen exists. It will be empty, because we haven’t actually filled it with anything, but at least it’s there ready for us to fill.

What we *really* want is to add to the `pictures` array all the files we match inside our loop. To do that, we need to replace the existing `// this is a picture to load!` comment with code to add each picture to the `pictures` array.

Helpfully, Swift’s arrays have a built-in method called `append` that we can use to add any items we want. So, replace the `// this is a picture to load!` comment with this:

```swift
pictures.append(item)
```

That’s it! Annoyingly, after all that work our app won’t appear to do anything when you press play - you’ll see the same white screen as before. Did it work, or did things just silently fail?

To find out, add this line of code at the end of `viewDidLoad()`, just before the closing brace:

```swift
print(pictures)
```

That tells Swift to print the contents of `pictures` to the Xcode debug console. When you run the program now, you should see this text appear at the bottom of your Xcode window: “["nssl0033.jpg", "nssl0034.jpg", "nssl0041.jpg", "nssl0042.jpg", "nssl0043.jpg", "nssl0045.jpg", "nssl0046.jpg", "nssl0049.jpg", "nssl0051.jpg", "nssl0091.jpg”]”

Note: iOS likes to print lots of uninteresting debug messages in the Xcode debug console. Don’t fret if you see lots of other text in there that you don’t recognize - just scroll around until you see the text above, and if you see that then you’re good to go.

