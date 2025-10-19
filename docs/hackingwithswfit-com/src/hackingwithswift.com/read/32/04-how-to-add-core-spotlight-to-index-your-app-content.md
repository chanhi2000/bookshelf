---
lang: ko-KR
title: "How to add Core Spotlight to index your app content"
description: "Article(s) > How to add Core Spotlight to index your app content"
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
      content: "Article(s) > How to add Core Spotlight to index your app content"
    - property: og:description
      content: "How to add Core Spotlight to index your app content"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/32/04-how-to-add-core-spotlight-to-index-your-app-content.html
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
  "title": "How to add Core Spotlight to index your app content | Hacking with iOS",
  "desc": "How to add Core Spotlight to index your app content",
  "link": "https://hackingwithswift.com/read/32/4/how-to-add-core-spotlight-to-index-your-app-content",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

One of the most important additions in iOS 9 was the ability for apps to communicate bidirectionally with Spotlight, the iOS system-wide search feature. What this means is that apps can ask for their content to be shown in the Spotlight search results and, if the user taps one of those search results, the app gets launched and told what was tapped so it can load the right content.

In this project, we're going to have users favorite the Hacking with Swift projects that most interest them. When they do that, we'll store the project title and subtitle in Spotlight so they can search for things like "wk" and find the `WKWebView` tutorial that is project 4.

We're going to tackle this problem in three stages: updating the user interface to reflect saved favorites, adding and removing items from Core Spotlight, then responding to deep links when our app is launched from a search result in Spotlight.

First up: creating a user interface that lets user favorite and unfavorite projects, and saving those choices. There are various ways of doing this, but I've chosen the simplest: we're going to set the table to be in editing mode, use the "Insert" and "Delete" icons to let users select their favorites, and use a checkmark accessory type to show which projects are already favorited.

Behind the scenes we'll also need an array of integers that tracks which project numbers are currently favorited, and that will be saved to `UserDefaults` whenever a change is made.

That's all we have to do in theory, but in practice there are two catches:

1. When a table is in editing mode, you can't tap the cells any more. Given that this is our way of reading the projects, that's a big problem! Fortunately, we can just set the `allowsSelectionDuringEditing` property to true to fix this.
2. When a table is in editing mode, you can't just set the `accessoryType` because that isn't shown. Instead, you need to set `editingAccessoryType`, which functions the same but is visible while editing.

Let's do the easy stuff first: add this property to your class:

```swift
var favorites = [Int]()
```

We need to load that from `UserDefaults` if it exists there already, which means using `if let` to conditionally unwrap the result of `object(forKey:)` as an `Int` array. Put this just before the end of `viewDidLoad()`:

```swift
let defaults = UserDefaults.standard
if let savedFavorites = defaults.object(forKey: "favorites") as? [Int] {
    favorites = savedFavorites
}
```

To make the list of favorites work in our user interface, we need to add two more lines to `viewDidLoad()`. Like I said already, these set the table view to be in editing mode, and tell it to let users tap on rows to select them. Add these lines now:

```swift
tableView.isEditing = true
tableView.allowsSelectionDuringEditing = true
```

Next we need to update `cellForRowAt` so that cells show a checkmark if they exist in the `favorites` array, or nothing otherwise. This is done just by using the `contains()` method of the `favorites` array, like this:

```swift
if favorites.contains(indexPath.row) {
    cell.editingAccessoryType = .checkmark
} else {
    cell.editingAccessoryType = .none
}
```

You should put that inside `cellForRowAt`, just before the `return cell` line.

Now it's just a matter of telling the table view that some rows should have the "insert" icon and others the "delete" icon. To do that, you just need to implement the `editingStyleForRowAt` method and check whether the item in question is in the `favorites` array. Put this into your class:

```swift
override func tableView(_ tableView: UITableView, editingStyleForRowAt indexPath: IndexPath) -> UITableViewCell.EditingStyle {
    if favorites.contains(indexPath.row) {
        return .delete
    } else {
        return .insert
    }
}
```

If you run the app now all the rows will have a green + symbol to their left and no checkmark on the right, because no projects have been marked as a favorite. If you click the + nothing will happen, because we haven't told the app what to do in that situation. To make this work, we need to handle the `tableView(_:commit:forRowAt:)` method, checking whether the user is trying to insert or delete their favorite.

If the user is adding a favorite, we're going to call a method called `index(item:)` that we'll write in a moment. We'll also add it to the `favorites` array, save it to `UserDefaults` then reload the table to reflect the change. If they are deleting a favorite, we do pretty much the opposite: call `deindex(item:)` (also not yet written), remove it from the favorites array, save that array and reload the table.

There's one small catch here, which is that removing an item from an array requires you to know its position in the array. We don't know the position of a project in the `favorites` array because they can add any projects they want - the array could contain 5, 2, 4, for example. We'll solve this by using the `indexOf()` method to find the position of a project number in the `favorites` array, then use that index to remove it.

Here's new code for the `commit` method that's currently empty, plus stubs for `index(item:)` and `deindex(item:)`:

```swift
override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
    if editingStyle == .insert {
        favorites.append(indexPath.row)
        index(item: indexPath.row)
    } else {
        if let index = favorites.firstIndex(of: indexPath.row) {
            favorites.remove(at: index)
            deindex(item: indexPath.row)
        }
    }

    let defaults = UserDefaults.standard
    defaults.set(favorites, forKey: "favorites")

    tableView.reloadRows(at: [indexPath], with: .none)
}

func index(item: Int) {
}

func deindex(item: Int) {
}
```

You should replace your existing `commit` method with that new one, but the other two are new.

OK, that's our first stage complete: the user user interface now updates to reflect saved favorites. You could give it a try now if you really wanted, but I suggest you don't to avoid confusing yourself later on. The next stage is adding and removing items from Core Spotlight, which means filling out those `index(item:)` and `deindex(item:)` methods that get called when favorites are added and deleted.

Using Core Spotlight means importing two extra frameworks: CoreSpotlight and MobileCoreServices. The former does all the heavy lifting of indexing items; the latter is just there to identify what type of data we want to store. So, import these two now:

```swift
import CoreSpotlight
import MobileCoreServices
```

Now for the new stuff: `index(item:)` accepts an `Int` identifying which project has been favorited. It needs to look inside the `projects` array to find that project, then create a `CSSearchableItemAttributeSet` object from it. This attribute set can store lots of information for search, including a title, description and image, as well as use-specific information such as dates (for events), camera focal length and flash setting (for photos), latitude and longitude (for places), and much more.

Regardless of what you choose, you wrap up the attribute set inside a `CSSearchableItem` object, which contains a unique identifier and a domain identifier. The former must identify the item absolutely uniquely inside your app, but the latter is a way to group items together. Grouping items is how you get to say "delete all indexed items from group X" if you choose to, but in our case we'll just use "com.hackingwithswift" because we don't need grouping. As for the unique identifier, we can use the project number.

To index an item, you need to call `indexSearchableItems()` on the default searchable index of `CSSearchableIndex`, passing in an array of `CSSearchableItem` objects. This method runs asynchronously, so we're going to use a trailing closure to be told whether the indexing was successful or not.

Here's the code:

```swift
func index(item: Int) {
    let project = projects[item]

    let attributeSet = CSSearchableItemAttributeSet(itemContentType: kUTTypeText as String)
    attributeSet.title = project[0]
    attributeSet.contentDescription = project[1]

    let item = CSSearchableItem(uniqueIdentifier: "\(item)", domainIdentifier: "com.hackingwithswift", attributeSet: attributeSet)
    CSSearchableIndex.default().indexSearchableItems([item]) { error in
        if let error = error {
            print("Indexing error: \(error.localizedDescription)")
        } else {
            print("Search item successfully indexed!")
        }
    }
}
```

The only thing in there that I haven't explained is `kUTTypeText as String`, which tells iOS we want to store text in our indexed record.

By default, content you index has an expiration date of one month after you add it. This is probably OK for most purposes (although you do need to make sure you re-index items when your app runs in case they have expired!), but you can change the expiration date if you want. It's not something that can easily be tested, but this kind of code probably works to make your items never expire:

```swift
let item = CSSearchableItem(uniqueIdentifier: "\(item)", domainIdentifier: "com.hackingwithswift", attributeSet: attributeSet)
item.expirationDate = Date.distantFuture
```

The last thing we need to do is fill in the `deindex(item:)` method, which is very similar to the `index(item:)` in that it receives an `Int`, calls a method on the default searchable index of `CSSearchableIndex`, then has a trailing closure to handle error reporting. Here's the code:

```swift
func deindex(item: Int) {
    CSSearchableIndex.default().deleteSearchableItems(withIdentifiers: ["\(item)"]) { error in
        if let error = error {
            print("Deindexing error: \(error.localizedDescription)")
        } else {
            print("Search item successfully removed!")
        }
    }
}
```

With that, the second stage of our Core Spotlight integration is complete: adding and removing items works! That just leaves the final stage, which is responding to deep links when our app is launched from a search result in Spotlight.

Now that we are indexing our content in Spotlight, users can search for our projects and tap on results. This will launch our app and pass in the unique identifier of the item that was tapped, and it's down to the app to do something with it. This is all done using in an <VPIcon icon="fa-brands fa-swift"/>`AppDelegate.swift` method called `application(_:continue:restorationHandler:)`, with the important part being what's given to us as the `continue` parameter.

This app delegate method is called when the application has finished launching and it's time to launch the activity requested by the user. If the user activity has the type `CSSearchableItemActionType` it means we're being launched as a result of a Spotlight search, so we need to unwrap the value of the `CSSearchableItemActivityIdentifier` that was passed in - that's the unique identifier of the indexed item that was tapped. In this project, that's the project number.

Once we know which project caused the app to be launched, we need to do a little view controller dance that involves conditionally typecasting the window’s root view controller as a `UINavigationController`, then conditionally typecasting its `topViewController` as a `ViewController` object, and finally calling the `showTutorial()` method on the result if it succeeded.

.<VPIcon icon="fa-brands fa-swift"/>`AppDelegate.swift` doesn’t already import the CoreSpotlight framework, so if you rely on code completion (as you should!) add this import to <VPIcon icon="fa-brands fa-swift"/>`AppDelegate.swift` now:

```swift
import CoreSpotlight
```

Now add this new method to the bottom of <VPIcon icon="fa-brands fa-swift"/>`AppDelegate.swift`, after the existing methods:

```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    if userActivity.activityType == CSSearchableItemActionType {
        if let uniqueIdentifier = userActivity.userInfo?[CSSearchableItemActivityIdentifier] as? String {
            if let navigationController = window?.rootViewController as? UINavigationController {
                if let viewController = navigationController.topViewController as? ViewController {
                    viewController.showTutorial(Int(uniqueIdentifier)!)
                }
            }
        }
    }

    return true
}
```

That's the third and final stage complete, which means the project is also complete. Run it now, and try clicking the + button next to Project 4. Now press <kbd>Shift</kbd>+<kbd>Cmd</kbd>+<kbd>H</kbd> to return to the home screen in the simulator and swipe to the left until you reach the Spotlight search tab. You should be able to type "uit" into the search box to have it find the reference to `UIToolbar` in project 4's description.

Now, before you go off indexing all sorts of information, be warned: Apple has said that iOS will automatically monitor how frequently users interact with your search results, and if you consistently serve up unhelpful results because you indexed your data badly then your results may stop appearing. Index only what's important!

