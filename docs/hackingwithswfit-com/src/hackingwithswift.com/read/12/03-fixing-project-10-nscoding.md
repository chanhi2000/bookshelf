---
lang: ko-KR
title: "Fixing Project 10: NSCoding"
description: "Article(s) > Fixing Project 10: NSCoding"
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
      content: "Article(s) > Fixing Project 10: NSCoding"
    - property: og:description
      content: "Fixing Project 10: NSCoding"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/12/03-fixing-project-10-nscoding.html
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
  "title": "Fixing Project 10: NSCoding | Hacking with iOS",
  "desc": "Fixing Project 10: NSCoding",
  "link": "https://hackingwithswift.com/read/12/3/fixing-project-10-nscoding",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/5H3J16QeNnI" />

You've just learned all the core basics of working with `UserDefaults`, but we're just getting started. You see, above and beyond integers, dates, strings, arrays and so on, you can also save any kind of data inside `UserDefaults` as long as you follow some rules.

What happens is simple: you use the `archivedData()` method of `NSKeyedArchiver`, which turns an object graph into a `Data` object, then write that to `UserDefaults` as if it were any other object. If you were wondering, “object graph” means “your object, plus any objects it refers to, plus any objects those objects refer to, and so on.”

The rules are very simple:

1. All your data types must be one of the following: boolean, integer, float, double, string, array, dictionary, `Date`, or a class that fits rule 2.
2. If your data type is a class, it must conform to the `NSCoding` protocol, which is used for archiving object graphs.
3. If your data type is an array or dictionary, all the keys and values must match rule 1 or rule 2.

Many of Apple's own classes support `NSCoding`, including but not limited to: `UIColor`, `UIImage`, `UIView`, `UILabel`, `UIImageView`, `UITableView`, `SKSpriteNode` and many more. But your own classes do not, at least not by default. If we want to save the `people` array to `UserDefaults` we'll need to conform to the `NSCoding` protocol.

The first step is to modify your `Person` class to this:

```swift
class Person: NSObject, NSCoding {
```

When we were working on this code in project 10, there were two outstanding questions:


- Why do we need a class here when a struct will do just as well? (And in fact better, because structs come with a default initializer!)
- Why do we need to inherit from `NSObject`?

It's time for the answers to become clear. You see, working with `NSCoding` requires you to use objects, or, in the case of strings, arrays and dictionaries, structs that are interchangeable with objects. If we made the `Person` class into a struct, we couldn't use it with `NSCoding`.

The reason we inherit from `NSObject` is again because it's required to use `NSCoding` - although cunningly Swift won't mention that to you, your app will just crash.

Once you conform to the `NSCoding` protocol, you'll get compiler errors because the protocol requires you to implement two methods: a new initializer and `encode()`.

We need to write some more code to fix the problems, and although the code is very similar to what you've already seen in `UserDefaults`, it has two new things you need to know about.

First, you'll be using a new class called `NSCoder`. This is responsible for both encoding (writing) and decoding (reading) your data so that it can be used with `UserDefaults`.

Second, the new initializer must be declared with the `required` keyword. This means "if anyone tries to subclass this class, they are required to implement this method." An alternative to using `required` is to declare that your class can never be subclassed, known as a *final class*, in which case you don't need `required` because subclassing isn't possible. We'll be using `required` here.

Add these two methods to the `Person` class:

```swift
required init(coder aDecoder: NSCoder) {
    name = aDecoder.decodeObject(forKey: "name") as? String ?? ""
    image = aDecoder.decodeObject(forKey: "image") as? String ?? ""
}

func encode(with aCoder: NSCoder) {
    aCoder.encode(name, forKey: "name")
    aCoder.encode(image, forKey: "image")
}
```

The initializer is used when loading objects of this class, and `encode()` is used when saving. The code is very similar to using `UserDefaults`, but here we’re adding `as?` typecasting and nil coalescing just in case we get invalid data back.

With those changes, the `Person` class now conforms to `NSCoding`, so we can go back to <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift` and add code to load and save the `people` array.

Let's start with writing, because once you understand that the reading code will make much more sense. As I said earlier, you can write `Data` objects to `UserDefaults`, but we don't currently have a `Data` object - we just have an array.

Fortunately, the `archivedData()` method of `NSKeyedArchiver` turns an object graph into a `Data` object using those `NSCoding` methods we just added to our class. Because we make changes to the array by adding people or by renaming them, let's create a single `save()` method we can use anywhere that's needed:

```swift
func save() {
    if let savedData = try? NSKeyedArchiver.archivedData(withRootObject: people, requiringSecureCoding: false) {
        let defaults = UserDefaults.standard
        defaults.set(savedData, forKey: "people")
    }
}
```

So: line 1 is what converts our array into a `Data` object, then lines 2 and 3 save that data object to `UserDefaults`. You now just need to call that `save()` method when we change a person's name or when we import a new picture.

You need to modify our collection view's `didSelectItemAt` method so that you call `self.save()` just after calling `self.collectionView.reloadData()`. Remember, the `self` is required because we're inside a closure. You then need to modify the image picker's `didFinishPickingMediaWithInfo` method so that it calls `save()` just before the end of the method.

And that's it - we only change the data in two places, and both now have a call to `save()`.

Finally, we need to load the array back from disk when the app runs, so add this code to `viewDidLoad()`:

```swift
let defaults = UserDefaults.standard

if let savedPeople = defaults.object(forKey: "people") as? Data {
    if let decodedPeople = try? NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(savedPeople) as? [Person] {
        people = decodedPeople
    }
}
```

This code is effectively the `save()` method in reverse: we use the `object(forKey:)` method to pull out an optional `Data`, using `if let` and `as?` to unwrap it. We then give that to the `unarchiveTopLevelObjectWithData()` method of `NSKeyedUnarchiver` to convert it back to an object graph - i.e., our array of `Person` objects.

