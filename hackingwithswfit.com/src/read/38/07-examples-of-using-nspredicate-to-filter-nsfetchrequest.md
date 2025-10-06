---
lang: ko-KR
title: "Adding Core Data entity relationships: lightweight vs heavyweight migration"
description: "Article(s) > Adding Core Data entity relationships: lightweight vs heavyweight migration"
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
      content: "Article(s) > Adding Core Data entity relationships: lightweight vs heavyweight migration"
    - property: og:description
      content: "Adding Core Data entity relationships: lightweight vs heavyweight migration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/38/08-adding-core-data-entity-relationships-lightweight-vs-heavyweight-migration.html
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
  "title": "Adding Core Data entity relationships: lightweight vs heavyweight migration | Hacking with iOS",
  "desc": "Adding Core Data entity relationships: lightweight vs heavyweight migration",
  "link": "https://hackingwithswift.com/read/38/8/adding-core-data-entity-relationships-lightweight-vs-heavyweight-migration",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Predicates are one of the most powerful features of Core Data, but they are actually useful in lots of other places too so if you master them here you'll learn a whole new skill that can be used elsewhere. For example, if you already completed [project 33](/hackingwithswift.com/read/33/overview.md) you'll have seen how predicates let us find iCloud objects by reference.

Put simply, a predicate is a filter: you specify the criteria you want to match, and Core Data will ensure that only matching objects get returned. The best way to learn about predicates is by example, so I've created three examples below that demonstrate various different filters. We'll be adding a fourth one in the next chapter once you've learned a bit more.

First, add this new property to the `ViewController` class:

```swift
var commitPredicate: NSPredicate?
```

I've made that an optional `NSPredicate` because that's exactly what our fetch request takes: either a valid predicate that specifies a filter, or `nil` to mean "no filter."

Find your `loadSavedData()` method and add this line just below where the `sortDescriptors` property is set:

```swift
request.predicate = commitPredicate
```

With that property in place, all we need to do is set it to whatever predicate we want before calling `loadSavedData()` again to refresh the list of objects. The easiest way to do this is by adding a new method called `changeFilter()`, which we'll use to show an action sheet for the user to choose from.

First we need to add a button to the navigation bar that will call this method, so put this code into `viewDidLoad()`:

```swift
navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Filter", style: .plain, target: self, action: #selector(changeFilter))
```

And here's an initial version of that new method for you to add to your view controller:

```swift
@objc func changeFilter() {
    let ac = UIAlertController(title: "Filter commits…", message: nil, preferredStyle: .actionSheet)

    // 1
    // 2
    // 3
    // 4

    ac.addAction(UIAlertAction(title: "Cancel", style: .cancel))
    present(ac, animated: true)
}
```

We'll be replacing the four comments one by one as you learn about predicates.

Let's start with something easy: matching an exact string. If we wanted to find commits with the message "I fixed a bug in Swift" - the kind of commit message that is frowned upon because it's not very descriptive! - you would write a predicate like this:

```swift
commitPredicate = NSPredicate(format: "message == 'I fixed a bug in Swift'")
```

That means "make sure the message attribute is equal to this exact string." Typing an exact string like that is OK because you know what you're doing, but please don't ever use string interpolation to inject user values into a predicate. If you want to filter using a variable, use this syntax instead:

```swift
let filter = "I fixed a bug in Swift"
commitPredicate = NSPredicate(format: "message == %@", filter)
```

The `%@` will be instantly recognizable to anyone who has used Objective-C before, and it means "place the contents of a variable here, whatever data type it is." In our case, the value of `filter` will go in there, and will do so safely regardless of its value.

Like I said, "I fixed a bug in Swift" isn't the kind of commit message you'll see in your data, so == isn't really a helpful operator for our app. So let's write a real predicate that will be useful: put this in place of the `// 1` comment in the `changeFilter()` method:

```swift
ac.addAction(UIAlertAction(title: "Show only fixes", style: .default) { [unowned self] _ in
    self.commitPredicate = NSPredicate(format: "message CONTAINS[c] 'fix'")
    self.loadSavedData()
})
```

The `CONTAINS[c]` part is an operator, just like ==, except it's much more useful for our app. The `CONTAINS` part will ensure this predicate matches only objects that contain a string somewhere in their message - in our case, that's the text "fix". The `[c]` part is predicate-speak for "case-insensitive", which means it will match "FIX", "Fix", "fix" and so on. Note that we need to use `self.` twice inside the closure to make capturing explicit.

Another useful string operator is `BEGINSWITH`, which works just like `CONTAINS` except the matching text must be at the start of a string. To make this second example more exciting, I'm also going to introduce the `NOT` keyword, which flips the match around: this action below will match only objects that *don't* begin with 'Merge pull request'. Put this in place of the `// 2` comment:

```swift
ac.addAction(UIAlertAction(title: "Ignore Pull Requests", style: .default) { [unowned self] _ in
    self.commitPredicate = NSPredicate(format: "NOT message BEGINSWITH 'Merge pull request'")
    self.loadSavedData()
})
```

For a third and final predicate, let's try filtering on the "date" attribute. This is the `Date` data type, and Core Data is smart enough to let us compare that date to any other date inside a predicate. In this example, which should go in place of the `// 3` comment, we're going to request only commits that took place 43,200 seconds ago, which is equivalent to half a day:

```swift
ac.addAction(UIAlertAction(title: "Show only recent", style: .default) { [unowned self] _ in
    let twelveHoursAgo = Date().addingTimeInterval(-43200)
    self.commitPredicate = NSPredicate(format: "date > %@", twelveHoursAgo as NSDate)
    self.loadSavedData()
})
```

As you can see, we’ve hit a small date problem: Core Data wants to work with the old `NSDate` type from Objective-C, so we typecast using `as` to keep it happy. Once that’s done, the magic `%@` will work with Core Data to ensure the `NSDate` is used correctly in the query.

For the final comment, `// 4`, we're just going to set `commitPredicate` to be `nil` so that all commits are shown again:

```swift
ac.addAction(UIAlertAction(title: "Show all commits", style: .default) { [unowned self] _ in
    self.commitPredicate = nil
    self.loadSavedData()
})
```

That's it! `NSPredicate` uses syntax that is new to you so you might find it a bit daunting at first, but it really isn't very hard once you have a few examples to work from, and it does offer a huge amount of power to your apps.

