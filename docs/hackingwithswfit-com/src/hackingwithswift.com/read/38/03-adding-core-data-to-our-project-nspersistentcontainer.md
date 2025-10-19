---
lang: ko-KR
title: "Adding Core Data to our project: NSPersistentContainer"
description: "Article(s) > Adding Core Data to our project: NSPersistentContainer"
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
      content: "Article(s) > Adding Core Data to our project: NSPersistentContainer"
    - property: og:description
      content: "Adding Core Data to our project: NSPersistentContainer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/38/03-adding-core-data-to-our-project-nspersistentcontainer.html
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
  "title": "Adding Core Data to our project: NSPersistentContainer | Hacking with iOS",
  "desc": "Adding Core Data to our project: NSPersistentContainer",
  "link": "https://hackingwithswift.com/read/38/3/adding-core-data-to-our-project-nspersistentcontainer",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

A Core Data model defines what your data should look like, but it doesn't actually store the real data anywhere. To make our app work, we need to load that model, create a real working database from it, load that database, then prepare what’s called a “managed object context” - an environment where we can create, read, update, and delete Core Data objects entirely in memory, before writing back to the database in one lump.

This all used to be a massive amount of work, to the point where it would put people off Core Data for life. But from iOS 10 onwards, Apple rolled all this work up into a single new class called `NSPersistentContainer`. This has removed almost all the tedium from setting up Core Data, and you can now get up and running in just a few lines of code.

So, in this second step we're going to write code to load the model we just defined, load a persistent store where saved objects can be stored, and also create a managed object context where our objects will live while they are active - all using the new `NSPersistentContainer` class. Once it finishes its work, we’ll have a managed object context ready to work with, and any changes we make to Core Data objects won't be saved until we explicitly request it. It is significantly faster to manipulate objects inside your managed object context as much as you need to before saving rather than saving after every change.

When data is saved, it's nearly always written out to an SQLite database. There are other options, but take my word for it: almost everyone uses SQLite. SQLite is a very small, very fast, and very portable database engine, and what Core Data does is provide a wrapper around it: when you read, write and query a managed object context, Core Data translates that into Structured Query Language (SQL) for SQLite to parse.

If you were wondering, SQL is pronounced Ess Cue Ell, but many people pronounce it "sequel." The pronunciation of SQLite is more varied, but when I met its author I asked him how *he* pronounces it, so I feel fairly safe that the definitive answer is this: you pronounce SQLite as Ess-Cue-Ell-ite, as if it were a mineral like Kryponite or Carbonite depending on your preferred movie. Unless you plan to get into more advanced usage, you don’t need to know anything about SQLite to use Core Data.

To get started, open <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift` and add an import for Core Data:

```swift
import CoreData
```

We’re going to create the `NSPersistentContainer` as a property, so we can load it once and share it elsewhere in our app. So, add this property now:

```swift
var container: NSPersistentContainer!
```

To set up the basic Core Data system, we need to write code that will do the following:

1. Load our data model we just created from the application bundle and create a `NSManagedObjectModel` object from it.
2. Create an `NSPersistentStoreCoordinator` object, which is responsible for reading from and writing to disk.
3. Set up a `URL` pointing to the database on disk where our actual saved objects live. This will be an SQLite database named <VPIcon icon="iconfont icon-sqlite"/>`Project38.sqlite`.
4. Load that database into the `NSPersistentStoreCoordinator` so it knows where we want it to save. If it doesn't exist, it will be created automatically
5. Create an `NSManagedObjectContext` and point it at the persistent store coordinator.

Beautifully, brilliantly, all five of those steps are exactly what `NSPersistentContainer` does for us. So what used to be 15 to 20 lines of code is now summed up in just six - add this to `viewDidLoad()` now:

```swift
container = NSPersistentContainer(name: "Project38")

container.loadPersistentStores { storeDescription, error in
    if let error = error {
        print("Unresolved error \(error)")
    }
}
```

The first line creates the persistent container, and must be given the name of the Core Data model file we created earlier: “Project38”. The next line calls the `loadPersistentStores()` method, which loads the saved database if it exists, or creates it otherwise. If any errors come back here you’ll know something has gone fatally wrong, but if it succeeds then you can be guaranteed the data has loaded and you’re ready to continue.

There’s one small thing we do still need to do ourselves, and that’s to write a small method to save any changes from memory back to the database on disk. The persistent container gives us a property called `viewContext`, which is a managed object context: an environment where we can manipulate Core Data objects entirely in RAM.

Once you’ve finished your changes and want to write them permanently - i.e., save them to disk - you need to call the `save()` method on the `viewContext` property. However, this should only be done if there are any changes since the last save - there’s no point doing unnecessary work. So, before calling `save()` you should read the `hasChanges` property. We’re going to wrap this all up in a single method called `saveContext()` - add this new method just after `viewDidLoad()`:

```swift
func saveContext() {
    if container.viewContext.hasChanges {
        do {
            try container.viewContext.save()
        } catch {
            print("An error occurred while saving: \(error)")
        }
    }
}
```

We'll be calling that whenever we've made changes that should be saved to disk.

At this point, our app has a working data model as well as code to load it into a managed object context for reading and writing. That means step two is done and we're on to step three: creating objects inside Core Data and fetching data from GitHub.

