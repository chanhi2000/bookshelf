---
lang: ko-KR
title: "Reading from iCloud with CloudKit: CKQueryOperation and NSPredicate"
description: "Article(s) > Reading from iCloud with CloudKit: CKQueryOperation and NSPredicate"
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
      content: "Article(s) > Reading from iCloud with CloudKit: CKQueryOperation and NSPredicate"
    - property: og:description
      content: "Reading from iCloud with CloudKit: CKQueryOperation and NSPredicate"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/33/06-reading-from-icloud-with-cloudkit-ckqueryoperation-and-nspredicate.html
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
  "title": "Reading from iCloud with CloudKit: CKQueryOperation and NSPredicate | Hacking with iOS",
  "desc": "Reading from iCloud with CloudKit: CKQueryOperation and NSPredicate",
  "link": "https://hackingwithswift.com/read/33/6/reading-from-icloud-with-cloudkit-ckqueryoperation-and-nspredicate",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```


So far our app takes a recording from the microphone using `AVAudioRecorder` and sends it off to iCloud for storage. You should have just seen that data in the CloudKit Dashboard, so the next step is to write the code that pulls recordings back down to the device.

This is where things get a little bit more complicated, but only a little. You see, there are two ways of writing to CloudKit: a core API and a convenience API. The core API exposes every possible behavior of the system, offering effectively unlimited functionality to do what you want. The convenience API takes a subset of those features and simplifies them, making it easier to learn and use but less powerful.

When we wrote records two chapters ago we used the convenience API, but when it comes to reading we're going to use the core API. This isn't because I enjoy torturing you, there is a legitimate reason: when you read data using the convenience API it automatically downloads all the data for each record. Often that's helpful, because it means you have everything you need to show a record's data. But in our case that would mean downloading the audio for every record every time we loaded our data - and that's a huge waste of resources.

Remember, CloudKit gives you a basic quota of about 64MB per day of asset transfer, and you need to be careful not to waste it. One of the features offered by the core API that is absent from the convenience API is the ability to selectively download records. In our case, that means we want the genre and user comments, but not the audio - we'll fetch that separately, as needed.

Go ahead and select <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift` for editing. We're going to be using the CloudKit framework, so please add this import:

```swift
import CloudKit
```

This view controller is a `UIViewController` subclass right now, but as it’s going to contain a list of whistles to view I’d like you to change it to be a `UITableViewController` now. Yes, that includes doing a little work in Main.storyboard: you’ll need to delete the existing view controller, replace it with a table view controller, and change its class to be “ViewController”. This time, though, there’s one more step: you need to Ctrl-drag from the navigation controller to the table view controller, then choose “Root View Controller” under “Relationship Segue.”

The new table view controller has a single prototype cell by default, but you can zap it - we’ll do it in code this time. To do that, select the table view, go to the attributes inspector, then change Prototype Cells from 1 to 0.

Our table is going to show a series of whistles to users, letting them see at a glance the genre and user comments before choosing which whistle to listen to. To make this work we're going to create a new class called `Whistle` that will store those two fields, but also a `URL` for where the audio is stored when it's downloaded, and the CloudKit record ID that identifies the whistle in iCloud so we can work with it.

In Swift there is usually a discussion as to whether a class or a struct is the right approach when considering data types, but here we have no choice as you'll see later: it needs to be a class.

Create a new file, choose Cocoa Touch Class, name it Whistle, then make it subclass from NSObject. It doesn't need much code in there, but it does need to use the CloudKit framework. Change the contents of <FontIcon icon="fa-brands fa-swift"/>`Whistle.swift` to this:

```swift
import CloudKit
import UIKit

class Whistle: NSObject {
    var recordID: CKRecord.ID!
    var genre: String!
    var comments: String!
    var audio: URL!
}
```

Back in <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift`, we need a property that will store an array of Whistle objects so that we can show them in our table view. This is as simple as adding the following property:

```swift
var whistles = [Whistle]()
```

Every time the view is shown we're going to refresh our data from iCloud using a `loadWhistles()` method. That one does all the complicated CloudKit work so we're going to leave it to last, but we can at least write `viewWillAppear()` and put in a stub for `loadWhistles()`. The `viewWillAppear()` method is going to clear the table view's selection if it has one, then it will use the `isDirty` flag we made earlier to call `loadWhistles()` only if it's needed.

Here's the code:

```swift
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)

    if let indexPath = tableView.indexPathForSelectedRow {
        tableView.deselectRow(at: indexPath, animated: true)
    }

    if ViewController.isDirty {
        loadWhistles()
    }
}

func loadWhistles() {
}
```

For the table view, we're going to use some techniques first seen in project 32, which was my [Core Spotlight and SFSafariViewController tutorial]. Specifically, we're going to use `NSAttributedString` to show text neatly formatted, then use automatic `UITableViewCell` sizing to make each cell fit its contents.

Let's start by using an almost identical `makeAttributedString()` method here, except this version doesn’t try to add space for user comments if there aren't any:

```swift
func makeAttributedString(title: String, subtitle: String) -> NSAttributedString {
    let titleAttributes = [NSAttributedString.Key.font: UIFont.preferredFont(forTextStyle: .headline), NSAttributedString.Key.foregroundColor: UIColor.purple]
    let subtitleAttributes = [NSAttributedString.Key.font: UIFont.preferredFont(forTextStyle: .subheadline)]

    let titleString = NSMutableAttributedString(string: "\(title)", attributes: titleAttributes)

    if subtitle.count > 0 {
        let subtitleString = NSAttributedString(string: "\n\(subtitle)", attributes: subtitleAttributes)
        titleString.append(subtitleString)
    }

    return titleString
}
```

Just like in project 32, that uses Dynamic Type to ensure user font choices are respected. Putting that into each table view cell is identical to project 32, except here we're modifying the `numberOfLines` property by hand because we don't have prototype cells to work with:

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
    cell.accessoryType = .disclosureIndicator
    cell.textLabel?.attributedText =  makeAttributedString(title: whistles[indexPath.row].genre, subtitle: whistles[indexPath.row].comments)
    cell.textLabel?.numberOfLines = 0
    return cell
}
```

To make that code work, you'll need to register the "Cell" re-use identifier in `viewDidLoad()`, like this:

```swift
tableView.register(UITableViewCell.self, forCellReuseIdentifier: "Cell")
```

And now we need one very simple method to tell iOS how many rows we need:

```swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return self.whistles.count
}
```

I know - this is all a bit easy now, right? Well, the next part isn't, because the next part is where CloudKit comes in. To make this work you're going to need to meet a few new classes:

- **NSPredicate** describes a filter that we'll use to decide which results to show.
- **NSSortDescriptor** tells CloudKit which field we want to sort on, and whether we want it ascending or descending.
- **CKQuery** combines a predicate and sort descriptors with the name of the record type we want to query. That will be "Whistles" for us, if you remember.
- **CKQueryOperation** is the work horse of CloudKit data fetching, executing a query and returning results.

What complicates `CKQueryOperation` - and at the same time makes it so incredibly powerful - is that is has two separate closures attached to it. One streams records to you as they are downloaded, and one is called when all the records have been downloaded. To handle this, we're going to create a new array that will hold the whistles as they are parsed, and use it inside both closures.

As I said already, one of the advantages of this core API is that we can request only the record keys we want, but it also lets us specify how many results we want to receive from iCloud. Putting all this together, we can write the first part of `loadWhistles()`:

```swift
func loadWhistles() {
    let pred = NSPredicate(value: true)
    let sort = NSSortDescriptor(key: "creationDate", ascending: false)
    let query = CKQuery(recordType: "Whistles", predicate: pred)
    query.sortDescriptors = [sort]

    let operation = CKQueryOperation(query: query)
    operation.desiredKeys = ["genre", "comments"]
    operation.resultsLimit = 50

    var newWhistles = [Whistle]()

    // more to come here
}
```

Our use of `NSPredicate` is trivial right now: we just say "all records that match true," which means "all records." Notice how we set the `desiredKeys` property to be an array of the record keys we want - that's what makes this API so useful.

The next part of the method is going to set a `recordFetchedBlock` closure on our `CKQueryOperation` object. This will be given one `CKRecord` value for every record that gets downloaded, and we'll convert that into a `Whistle` object. This means pulling out the record ID for the `recordID` property, then reading the `genre` and `comments` values of the dictionary. Both those two values must be converted to strings, because by default they come out as the data type `CKRecordValue?`.

Here's the next part of `loadWhistles()` - replace the `// more to come here` comment with this:

```swift
operation.recordFetchedBlock = { record in
    let whistle = Whistle()
    whistle.recordID = record.recordID
    whistle.genre = record["genre"]
    whistle.comments = record["comments"]
    newWhistles.append(whistle)
}
```

At this point, the last part isn't too hard: we're going to set a `queryCompletionBlock` closure for the query operation. This will be called by CloudKit when all records have been downloaded, and will be given two parameters: a query cursor and an error if there was one. The query cursor is useful if you want to implement paging, because you can use that query cursor to have CloudKit show the next 50 rows, then the next 50 rows, and so on.

We won't be using the cursor here, but we do want to know whether there was any error. Additionally, error or not, we're going to be doing user interface work and this closure might be run on any thread, so we need to push all the work onto the main thread.

And what is that work? Well, if there was no error we're going to overwrite our current `whistles` array with the `newWhistles` array that was built up from downloaded records. We also need to clear the `isDirty` flag so we know the update was fetch, then reload the table view. If there was an error, we'll show a `UIAlertController` with a meaningful message to help you debug.

Here's the third part of `loadWhistles()`:

```swift
operation.queryCompletionBlock = { [unowned self] (cursor, error) in
    DispatchQueue.main.async {
        if error == nil {
            ViewController.isDirty = false
            self.whistles = newWhistles
            self.tableView.reloadData()
        } else {
            let ac = UIAlertController(title: "Fetch failed", message: "There was a problem fetching the list of whistles; please try again: \(error!.localizedDescription)", preferredStyle: .alert)
            ac.addAction(UIAlertAction(title: "OK", style: .default))
            self.present(ac, animated: true)
        }
    }
}
```

The last part of the method is the easiest: now that we've created a query, added it to a `CKQueryOperation`, then configured its two closures to handle downloading data, it's just a matter of asking CloudKit to run it. Put this at the end of the method, and you're done:

```swift
CKContainer.default().publicCloudDatabase.add(operation)
```

At this point you're code is in a working state, so you should be able to run the app now and see the whistle you submitted earlier listed in the table. If not, you should see an error that gives you an idea of what went wrong. Some things to check:

- Did you see your data in the CloudKit Dashboard?
- Did you name your record type "Whistles" when writing and reading?
- For the Metadata Indexes, did you select Query next to ID, and Sort next to Date Created?
- Is your device definitely online?

