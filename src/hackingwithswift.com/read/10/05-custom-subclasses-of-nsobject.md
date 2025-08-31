---
lang: ko-KR
title: "Custom subclasses of NSObject"
description: "Article(s) > Custom subclasses of NSObject"
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
      content: "Article(s) > Custom subclasses of NSObject"
    - property: og:description
      content: "Custom subclasses of NSObject"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/10/05-custom-subclasses-of-nsobject.html
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
  "title": "Custom subclasses of NSObject | Hacking with iOS",
  "desc": "Custom subclasses of NSObject",
  "link": "https://hackingwithswift.com/read/10/5/custom-subclasses-of-nsobject",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/AIbPN2eXqK4" />

You already created your first custom class when you created the collection view cell. But this time we're going to do something very simple: we're going to create a class to hold some data for our app. So far you've seen how we can create arrays of strings by using `[String]`, but what if we want to hold an array of *people*?

Well, the solution is to create a custom class. Create a new file and choose Cocoa Touch Class. Click Next and name the class “Person”, type “NSObject” for "Subclass of", then click Next and Create to create the file.

`NSObject` is what's called a *universal base class* for all Cocoa Touch classes. That means all UIKit classes ultimately come from `NSObject`, including all of UIKit. You don't have to inherit from `NSObject` in Swift, but you did in Objective-C and in fact there are some behaviors you can only have if you do inherit from it. More on that in project 12, but for now just make sure you inherit from `NSObject`.

We're going to add two properties to our class: a name and a photo for every person. So, add this inside the `Person` definition:

```swift
var name: String
var image: String
```

When you do that, you'll see errors: "Class 'Person' has no initializers." Swift is telling us that we aren't satisfying one of its core rules: objects of type `String` can't be empty. Remember, `String!` and `String?` can both be `nil`, but plain old `String` can't - it must have a value. Without an initializer, it means the object will be created and these two variables won't have values, so you're breaking the rules.

To fix this problem, we need to create an `init()` method that accepts two parameters, one for the name and one for the image. We'll then save that to the object so that both variables have a value, and Swift is happy.

```swift
init(name: String, image: String) {
    self.name = name
    self.image = image
}
```

Our custom class is done; it's just a simple data store for now. If you're the curious type, you might wonder why I used a class here rather than a struct. This question is even more pressing once you know that structs have an automatic initializer method made for them that looks exactly like ours. Well, the answer is: you'll have to wait and see. All will become clear in project 12!

With that custom class done, we can start to make our project much more useful: every time a picture is imported, we can create a `Person` object for it and add it to an array to be shown in the collection view.

So, go back to <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift`, and add this declaration for a new array:

```swift
var people = [Person]()
```

Every time we add a new person, we need to create a new `Person` object with their details. This is as easy as modifying our initial image picker success method so that it creates a `Person` object, adds it to our `people` array, then reloads the collection view. Put this code before the call to `dismiss()`:

```swift
let person = Person(name: "Unknown", image: imageName)
people.append(person)
collectionView.reloadData()
```

That stores the image name in the `Person` object and gives them a default name of "Unknown", before reloading the collection view.

Can you spot the problem? If not, that's OK, but you should be able to spot it if you run the program.

The problem is that although we've added the new person to our array and reloaded the collection view, we aren't actually using the `people` array with the collection view - we just return 10 for the number of items and create an empty collection view cell for each one! Let's fix that…

