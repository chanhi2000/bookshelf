---
lang: ko-KR
title: "Working with CloudKit records: CKRecord.Reference, fetch(withRecordID:), and save()"
description: "Article(s) > Working with CloudKit records: CKRecord.Reference, fetch(withRecordID:), and save()"
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
      content: "Article(s) > Working with CloudKit records: CKRecord.Reference, fetch(withRecordID:), and save()"
    - property: og:description
      content: "Working with CloudKit records: CKRecord.Reference, fetch(withRecordID:), and save()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/33/07-working-with-cloudkit-records-ckrecordreference-fetchwithrecordid-and-save.html
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
  "title": "Working with CloudKit records: CKRecord.Reference, fetch(withRecordID:), and save() | Hacking with iOS",
  "desc": "Working with CloudKit records: CKRecord.Reference, fetch(withRecordID:), and save()",
  "link": "https://hackingwithswift.com/read/33/7/working-with-cloudkit-records-ckrecordreference-fetchwithrecordid-and-save",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

I promised this was going to be a thorough CloudKit tutorial, and I'm going to keep that promise over the next two chapters, starting here: we're going to learn about references and records, as well as the `fetch(withRecordID:)` convenience API.

So far, our app records whistles using `AVAudioRecorder`, submits it to CloudKit, then shows all whistles into a table view. The next step is to let users tap a whistle that interests them so they can see more information, and in our case that will show the user's comments, any suggestions submitted by other users, and a Listen button that downloads the whistle.

The valuable thing about this screen is that it gives me a chance to show you the `CKRecord.Reference` class, which is used to link records together. Specifically, we're going to build what's called a one-to-many relationship: one whistle can have many suggestions attached to it. Using `CKRecord.Reference` let us query to find all suggestions for a specific whistle, but it has another brilliant advantage known as *cascade deletes*: if we delete a whistle from our database, iCloud will automatically delete any suggestions that belong to it.

Now, an important warning: as each whistle holds multiple suggestions, and each suggestion is just going to be a string saying something like "I think this is the theme tune from Star Wars," you might be tempted to think "ah, that means our whistle should have an array of strings attached to its record." If you try that, it'll work, and it'll work great - in testing. But when it comes to shipping apps, this approach hits a core problem: conflicts.

A conflict occurs when CloudKit receives two sets of different information, and it's something that record arrays are particularly prone to. You see, if I get the record and it has no suggestions, I might write "that's the Star Wars theme tune." But before I hit Submit, you also download the record, see that it has no suggestions, and write "That's totally the theme tune to a big movie, but I can't remember which one," then hit Submit straight away. In iCloud, that record is now updated to have your (quite useless!) suggestion, so when I submit mine there's a conflict: I'm telling CloudKit the record has one suggestion (mine) and CloudKit thinks it already had one suggestion (yours), so it isn't sure what to do.

Conflict resolution isn't something CloudKit handles for you, because the correct answer depends on your app. In this case, the correct answer is to merge both the arrays, but really the whole premise is bad - using arrays to reference child objects like this is a terrible idea. This method of referencing is known as forward references, and as you can see it's error-prone. A much better solution are back references, which are where our Whistle record doesn't keep track of its suggestions; instead, the suggestions all know which whistle own it. So, the references go from the child back to the parent, rather than from the parent forward to its child.

Enough theory - time for action. Create a new `UITableViewController` subclass called `ResultsViewController`. This will need to import AVFoundation so we can listen to whistles, and also CloudKit so we can download whistle audio and any user suggestions. So, add these imports now:

```swift
import AVFoundation
import CloudKit
```

The view controller will need three extra properties: a `Whistle` object that will pass in whichever whistle object was selected in the main view controller, an array of strings for the suggestions (these are *not* stored in the whistle record, remember!), and an `AVAudioPlayer` object that will be used to play the downloaded whistle. Add these now:

```swift
var whistle: Whistle!
var suggestions = [String]()

var whistlePlayer: AVAudioPlayer!
```

Now let's talk about user interface. This is a `UITableViewController` subclass, because we have structured data that fits neatly into a table view. It's going to have two sections: one for showing the user's comments in big text, and one for showing user suggestions.

We're going to use a new method called `titleForHeaderInSection`, which lets us provide a title for the second section so that users can see what it's supposed to do. More importantly, the second section is going to have as many rows as there are suggestions, with one extra: a row that says "Add suggestion" so that users can tap that and suggest their own matches for the whistle. That last row will be the only one that responds to taps, so we'll set the `selectionStyle` of the other cells to be `.none`.

All the cells in this table view will have their `numberOfLines` property set to 0 so that lines wrap, which in turn means they will automatically expand their cells to fit as much content as they have. That explains all the code, so please put this code into <VPIcon icon="fa-brands fa-swift"/>`ResultsViewController.swift`:

```swift
override func numberOfSections(in tableView: UITableView) -> Int {
    return 2
}

override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
    if section == 1 {
        return "Suggested songs"
    }

    return nil
}

override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    if section == 0 {
        return 1
    } else {
        return suggestions.count + 1
    }
}

override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
    cell.selectionStyle = .none
    cell.textLabel?.numberOfLines = 0

    if indexPath.section == 0 {
        // the user's comments about this whistle
        cell.textLabel?.font = UIFont.preferredFont(forTextStyle: .title1)

        if whistle.comments.count == 0 {
            cell.textLabel?.text = "Comments: None"
        } else {
            cell.textLabel?.text = whistle.comments
        }
    } else {
        cell.textLabel?.font = UIFont.preferredFont(forTextStyle: .body)

        if indexPath.row == suggestions.count {
            // this is our extra row
            cell.textLabel?.text = "Add suggestion"
            cell.selectionStyle = .gray
        } else {
            cell.textLabel?.text = suggestions[indexPath.row]
        }
    }

    return cell
}
```

At this point your iOS career, every line of that should be second nature - I'm only repeating it here to help jog your memory. The real work happens when a user taps on the "Add suggestion" table view cell. This code needs to show a `UIAlertController` with a text field prompting the user to enter their suggestion. This code is a bit clumsy: if you haven't already read my [`addTextField` tutorial](/hackingwithswift.com/read/05/03-pick-a-word-any-word-uialertcontroller.md) that was inside project 5, that's a good place to start.

To summarize, here's what we're going to do:

- We're going to hook into the `didSelectRowAt` method of our table view, which will be triggered when any row is tapped.
- If the row that was tapped was not the last row in the second section (the "Add suggestion" row) we'll exit the method.
- We'll create a `UIAlertController` in the style `.alert`, then add a text field to it.
- We'll add a Submit button to the alert that, when tapped, will submit the suggestion if the text field has any text.
- Because we configure the text field in one closure and submit it in another, we need to create it outside of both - just like in project 5.
- As an added touch, we're going to deselect the row that was tapped, making it highlighted only temporarily.

Here's the code:

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    guard indexPath.section == 1 &amp;&amp; indexPath.row == suggestions.count else { return }

    tableView.deselectRow(at: indexPath, animated: true)

    let ac = UIAlertController(title: "Suggest a song…", message: nil, preferredStyle: .alert)
    ac.addTextField()

    ac.addAction(UIAlertAction(title: "Submit", style: .default) { [unowned self, ac] action in
        if let textField = ac.textFields?[0] {
            if textField.text!.count > 0 {
                self.add(suggestion: textField.text!)
            }
        }
    })

    ac.addAction(UIAlertAction(title: "Cancel", style: .cancel))
    present(ac, animated: true)
}
```

Don't worry that `self.add(suggestion: suggestion.text!)` will error at this point - we haven't written that yet.

It's time for some CloudKit action again, and this time we're going to be using the `CKRecord.Reference` class to link a user's suggestion to the whistle they were reading about. When you create a `CKRecord.Reference` you need to provide it two things: a record ID to link to, and a behavior to trigger when that linked record is deleted. We already have the record ID to link to because we're storing it in the `whistle` property, and for the action to trigger we'll use `.deleteSelf` - when the parent whistle is deleted, delete the child suggestions too.

`CKRecord.Reference`, like `CKAssets`, can be placed directly into a `CKRecord`, which means the first part of `add(suggestion:)` is easy:

```swift
func add(suggestion: String) {
    let whistleRecord = CKRecord(recordType: "Suggestions")
    let reference = CKRecord.Reference(recordID: whistle.recordID, action: .deleteSelf)
    whistleRecord["text"] = suggestion as CKRecordValue
    whistleRecord["owningWhistle"] = reference as CKRecordValue

    // more code to come!
}
```

Note that I'm using the name "Suggestions" as the record type for our user suggestions, and `owningWhistle` as the key for that reference value.

The second part of `add(suggestion:)` isn't much more difficult, because we'll use `save()` to post that new record back to iCloud, then check for errors.

Remember: CloudKit tells us when the save completes by executing our code as a closure, and that could be running on any thread. We want to either reload the table view or show a message depending on whether there was an error, but regardless this work needs to be pushed to the main thread as it involves user interface changes.

Here's the second part of `add(suggestion:)` - put this where the `more code to come!` comment is:

```swift
CKContainer.default().publicCloudDatabase.save(whistleRecord) { [unowned self] record, error in
    DispatchQueue.main.async {
        if error == nil {
            self.suggestions.append(suggestion)
            self.tableView.reloadData()
        } else {
            let ac = UIAlertController(title: "Error", message: "There was a problem submitting your suggestion: \(error!.localizedDescription)", preferredStyle: .alert)
            ac.addAction(UIAlertAction(title: "OK", style: .default))
            self.present(ac, animated: true)
        }
    }
}
```

Note that I append the user's new suggestion to the existing `suggestions` array so they see it has been posted successfully.

There are two more tasks to do before this view controller is complete. First, when the view is loaded, we need to fetch the existing list of user suggestions and show them in the table. Second, we need to let users download and listen to each whistle so they can try to guess what it is.

To download all suggestions that belong to a particular whistle we need to create another `CKRecord.Reference`, just like before. We can then pass that into an `NSPredicate` that will check for suggestions where `owningWhistle` matches that predicate. This time we're going to sort by `creationDate` ascending so that oldest suggestions appear first, but otherwise this isn't tricky - here's the first part of the new `viewDidLoad()` method:

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    title = "Genre: \(whistle.genre!)"
    navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Download", style: .plain, target: self, action: #selector(downloadTapped))

    tableView.register(UITableViewCell.self, forCellReuseIdentifier: "Cell")

    let reference = CKRecord.Reference(recordID: whistle.recordID, action: .deleteSelf)
    let pred = NSPredicate(format: "owningWhistle == %@", reference)
    let sort = NSSortDescriptor(key: "creationDate", ascending: true)
    let query = CKQuery(recordType: "Suggestions", predicate: pred)
    query.sortDescriptors = [sort]

    // more code to come!
```

When it comes to running this query, we can aren't going to take the same approach from the last chapter: `CKQueryOperation` isn't needed here because we want all the fields, which means we can use the much easier convenience API: `performQuery()`. Tell this method what query to run and where it should be run (or nil for the default), and it will return back either results or an error.

The remainder of `viewDidLoad()` is easy thanks to this convenience API, although I have cheated a bit by calling out to an as-yet unwritten `parseResults()` method. Here it is:

```swift
CKContainer.default().publicCloudDatabase.perform(query, inZoneWith: nil) { [unowned self] results, error in
    if let error = error {
        print(error.localizedDescription)
    } else {
        if let results = results {
            self.parseResults(records: results)
        }
    }
}
```

If that fails to fetch the suggestions, it prints a message to the Xcode log - see if you can have a go at making it a bit smarter.

The last step in handling suggestions is to write that `parseResults` method. This gets called once the record results array has been unwrapped, so we know we'll definitely get a list of records through. It's then just a matter of looping through that array, pulling out the `text` property of each record, and adding it to our `suggestions` string array. To make things safer on multiple threads, we'll actually use an intermediate array called `newSuggestions` - it's never smart to modify data in a background thread that is being used on the main thread.

Here's the `parseResults()` method:

```swift
func parseResults(records: [CKRecord]) {
    var newSuggestions = [String]()

    for record in records {
         newSuggestions.append(record["text"] as! String)
    }

    DispatchQueue.main.async { [unowned self] in
        self.suggestions = newSuggestions   
        self.tableView.reloadData()
    }
}
```

The final task for this view controller is to let users download and listen to whistles from other users. We already set up a right bar button item named "Download" in `viewDidLoad()`, but we haven't yet written the `downloadTapped()` method it will call.

This new method needs to:

1. Replace the button with a spinner so the user knows the data is being fetched.
2. Ask CloudKit to pull down the full record for the whistle, including the audio.
3. If it successfully gets audio for the whistle, attach it to the `Whistle` object of this view controller.
4. Create a new right bar button item that says "Listen" and will call `listenTapped()`.
5. If something goes wrong, show a meaningful error message and put the Download button back.

Fetching whole records is done through a simple CloudKit convenience API: `fetch(withRecordID:)`. Once that fetches the complete whistle record, we can pull out the `CKAsset` and read its `fileURL` property to know where CloudKit downloaded it to. Please note: this download is just a cache - CloudKit will automatically remove downloaded files at a later date.

Remember, all user interface work needs to be pushed onto the main thread, and you should be careful to handle your CloudKit errors properly. I put a comment in this code that you should replace with an error of your choosing - don't forget!

Here's the `downloadTapped()` method:

```swift
@objc func downloadTapped() {
    let spinner = UIActivityIndicatorView(style: .large)
    spinner.tintColor = UIColor.black
    spinner.startAnimating()
    navigationItem.rightBarButtonItem = UIBarButtonItem(customView: spinner)

    CKContainer.default().publicCloudDatabase.fetch(withRecordID: whistle.recordID) { [unowned self] record, error in
        if let error = error {
            DispatchQueue.main.async {
                // meaningful error message here!
                self.navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Download", style: .plain, target: self, action: #selector(self.downloadTapped))
            }
        } else {
            if let record = record {
                if let asset = record["audio"] as? CKAsset {
                    self.whistle.audio = asset.fileURL

                    DispatchQueue.main.async {
                        self.navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Listen", style: .plain, target: self, action: #selector(self.listenTapped))
                    }
                }
            }
        }
    }
}
```

There's only one more thing to do before this view controller is complete, and that's to write the `listenTapped()` method. This is almost identical to the "Tap to Play" button we already used in `RecordWhistleViewController`, so I'm not going to explain what it does here:

```swift
@objc func listenTapped() {
    do {
        whistlePlayer = try AVAudioPlayer(contentsOf: whistle.audio)
        whistlePlayer.play()
    } catch {
        let ac = UIAlertController(title: "Playback failed", message: "There was a problem playing your whistle; please try re-recording.", preferredStyle: .alert)
        ac.addAction(UIAlertAction(title: "OK", style: .default))
        present(ac, animated: true)
    }
}
```

That's `ResultsViewController` complete. All you need to do now is go back to <VPIcon icon="fa-brands fa-swift"/>`ViewController.swift` and tell it to show a new `ResultsViewController` when any whistle is tapped, passing in the `Whistle` object so it knows what to show:

```swift
func tableView(tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let vc = ResultsViewController()
    vc.whistle = whistles[indexPath.row]
    navigationController?.pushViewController(vc, animated: true)
}
```

Go ahead and run the app now, then submit a suggestion for your whistle. Once that's done, go to the CloudKit Dashboard to make sure the record type was created as expected (i.e., that everything works!), then check the Metadata Indexes boxes next to Query for ID and Sort for Date Created, just like you did for Whistles.

