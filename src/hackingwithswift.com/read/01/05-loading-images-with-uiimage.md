---
lang: ko-KR
title: "Loading images with UIImage"
description: "Article(s) > Loading images with UIImage"
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
      content: "Article(s) > Loading images with UIImage"
    - property: og:description
      content: "Loading images with UIImage"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/01/05-loading-images-with-uiimage.html
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
  "title": "Loading images with UIImage | Hacking with iOS",
  "desc": "Loading images with UIImage",
  "link": "https://hackingwithswift.com/read/1/5/loading-images-with-uiimage",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/FNrxEvtUl-U" />

At this point we have our original table view controller full of pictures to select, plus a detail view controller in our storyboard. The next goal is to show the detail screen when any table row is tapped, and have it show the selected image.

To make this work we need to add another specially named method to `ViewController`. This one is called `tableView(_, didSelectRowAt:)`, which takes an `IndexPath` value just like `cellForRowAt` that tells us what row we’re working with. This time we need to do a bit more work: 

1. We need to create a property in `DetailViewController` that will hold the name of the image to load.
2. We’ll implement the `didSelectRowAt` method so that it loads a `DetailViewController` from the storyboard.
3. Finally, we’ll fill in `viewDidLoad()` inside `DetailViewController` so that it loads an image into its image view based on the name we set earlier.

Let’s solve each of those in order, starting with the first one: creating a property in `DetailViewController` that will hold the name of the image to load.

This property will be a string - the name of the image to load - but it needs to be an *optional* string because when the view controller is first created it won’t exist. We’ll be setting it straight away, but it still starts off life empty.

So, add this property to `DetailViewController` now, just below the existing `@IBOutlet` line:

```swift
var selectedImage: String?
```

That’s the first task done, so onto the second: implement `didSelectRowAt` so that it loads a `DetailViewController` from the storyboard.

When we created the detail view controller, you gave it the storyboard ID “Detail”, which allows us to load it from the storyboard using a method called `instantiateViewController(withIdentifier:)`. Every view controller has a property called `storyboard` that is either the storyboard it was loaded from or nil. In the case of `ViewController` it will be <FontIcon icon="iconfont icon-xcode"/>`Main.storyboard`, which is the same storyboard that contains the detail view controller, so we’ll be loading from there.

We can break this task down into three smaller tasks, two of which are new:

1. Load the detail view controller layout from our storyboard.
2. Set its `selectedImage` property to be the correct item from the `pictures` array.
3. Show the new view controller.

The first of those is done by calling `instantiateViewController`, but it has two small complexities. First, we call it on the `storyboard` property that we get from Apple’s `UIViewController` type, but it’s optional because Swift doesn’t know we came from a storyboard. So, we need to use `?` just like when we were setting the text label of our cell: “try doing this, but do nothing if there was a problem.” 

Second, even though `instantiateViewController()` will send us back a `DetailViewController` if everything worked correctly, Swift *thinks* it will return back a `UIViewController` because it can’t see inside the storyboard to know what’s what.

This will seem confusing if you’re new to programming, so let me try to explain using an analogy. Let’s say you want to go out on a date tonight, so you ask me to arrange a couple of tickets to an event. I go off, find tickets, then hand them to you in an envelope. I fulfilled my part of the deal: you asked for tickets, I got you tickets. But what tickets are they - tickets for a sporting event? Tickets for an opera? Train tickets? The only way for you to find out is to open the envelope and look.

Swift has the same problem: `instantiateViewController()` has the return type `UIViewController`, so as far as Swift is concerned any view controller created with it is actually a `UIViewController`. This causes a problem for us because we want to adjust the property we just made in `DetailViewController`. The solution: we need to tell Swift that what it has is not what it thinks it is.

The technical term for this is “typecasting”: asking Swift to treat a value as a different type. Swift has several ways of doing this, but we’re going to use the safest version: it effectively means, “please try to treat this as a DetailViewController, but if it fails then do nothing and move on.”

Once we have a detail view controller on our hands, we can set its `selectedImage` property to be equal to `pictures[indexPath.row]` just like we were doing in `cellForRowAt` - that’s the easy bit.

The third mini-step is to make the new screen show itself. You already saw that view controllers have an optional `storyboard` property that either contains the storyboard they were loaded from or nil. Well, they also have an optional `navigationController` property that contains the navigation controller they are inside if it exists, or nil otherwise.

This is perfect for us, because navigation controllers are responsible for showing screens. Sure, they provide that nice gray bar across the top that you see in lots of apps, but they are also responsible for maintaining a big stack of screens that users navigate through.

By default they contain the first view controller you created for them in the storyboard, but when new screens are created you can push them onto the navigation controller’s stack to have them slide in smoothly just like you see in Settings. As more screens are pushed on, they just keep sliding in. When users go back a screen - i.e. by tapping Back or by swiping from left to right - the navigation controller will automatically destroy the old view controller and free up its memory.

Those three mini-steps complete the new method, so it’s time for the code. Please add this method to <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift` - I’ve added comments to make it easier to understand:

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    // 1: try loading the "Detail" view controller and typecasting it to be DetailViewController
    if let vc = storyboard?.instantiateViewController(withIdentifier: "Detail") as? DetailViewController {
        // 2: success! Set its selectedImage property
        vc.selectedImage = pictures[indexPath.row]

        // 3: now push it onto the navigation controller
        navigationController?.pushViewController(vc, animated: true)
    }
}
```

Let’s look at the `if let` line a bit more closely for a moment. There are three parts of it that might fail: the `storyboard` property might be nil (in which case the `?` will stop the rest of the line from executing), the `instantiateViewController()` call might fail if we had requested “Fzzzzz” or some other invalid storyboard ID, and the typecast - the `as?` part - also might fail, because we might have received back a view controller of a different type.

So, three things in that one line have the potential to fail. If you’ve followed all my steps correctly they *won’t* fail, but they have the *potential* to fail. That’s where `if let` is clever: if any of those things return nil (i.e., they fail), then the code inside the `if let` braces won’t execute. This guarantees your program is in a safe state before any action is taken.

There’s only one small thing left to do before you can take a look at the results: we need to make the image actually load into the image view in `DetailViewController`.

This new code will draw on a new data type, called `UIImage`. This doesn't have "View" in its name like `UIImageView` does, so it's not something you can view - it's not something that's actually visible to users. Instead, `UIImage` is the data type you'll use to load image data, such as PNG or JPEGs.

When you create a `UIImage`, it takes a parameter called `named` that lets you specify the name of the image to load. `UIImage` then looks for this filename in your app's bundle, and loads it. By passing in the `selectedImage` property here, which was sent from `ViewController`, this will load the image that was selected by the user.

However, we can’t use `selectedImage` directly. If you remember, we created it like this:

```swift
var selectedImage: String?
```

That `?` means it might have a value or it might not, and Swift doesn’t let you use these “maybes” without checking them first. This is another opportunity for `if let`: we can check that `selectedImage` has a value, and if so pull it out for usage; otherwise, do nothing.

Add this code to `viewDidLoad()` inside `DetailViewController`, *after* the call to `super.viewDidLoad()`:

```swift
if let imageToLoad = selectedImage {
    imageView.image  = UIImage(named: imageToLoad)
}
```

The first line is what checks and unwraps the optional in `selectedImage`. If for some reason `selectedImage` is nil (which it should never be, in theory) then the `imageView.image` line will never be executed. If it has a value, it will be placed into `imageToLoad`, then passed to `UIImage` and loaded.

OK, that’s it: press play or <kbd>Cmd</kbd>+<kbd>R</kbd> now to run the app and try it out! You should be able to select any of the pictures to have them slide in and displayed full screen.

Notice that we get a Back button in the navigation bar that lets us return back to `ViewController`. If you click and drag carefully, you’ll find you can create a swipe gesture too - click at the very left edge of the screen, then drag to the right, just as you would do with your thumb on a phone.

