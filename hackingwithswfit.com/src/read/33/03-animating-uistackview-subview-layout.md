---
lang: ko-KR
title: "Animating UIStackView subview layout"
description: "Article(s) > Animating UIStackView subview layout"
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
      content: "Article(s) > Animating UIStackView subview layout"
    - property: og:description
      content: "Animating UIStackView subview layout"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/33/03-animating-uistackview-subview-layout.html
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
  "title": "Animating UIStackView subview layout | Hacking with iOS",
  "desc": "Animating UIStackView subview layout",
  "link": "https://hackingwithswift.com/read/33/3/animating-uistackview-subview-layout",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```


Before we get onto the CloudKit part of this tutorial, we're going to add a bit more to our user interface. Specifically, we're going to add a "Tap to Play" button into the stack view, and have it animate so that it slides out when recording has finished. This is the work of only a few minutes thanks to `UIStackView`, and I'm sure you'll agree the results look marvelous.

While we're finishing up the user interface, we're going to quickly add a couple more simple view controllers to let the user attach some metadata to their whistle: they'll be able to select what genre it is, then enter some free text with any comments - something like "I definitely remember hearing it in the early 90s" to help listeners narrow the scope a little.

First, the play button. Add this new property:

```swift
var playButton: UIButton!
```

Now create it by placing this just before the end of `loadRecordingUI()`:

```swift
playButton = UIButton()
playButton.translatesAutoresizingMaskIntoConstraints = false
playButton.setTitle("Tap to Play", for: .normal)
playButton.isHidden = true
playButton.alpha = 0
playButton.titleLabel?.font = UIFont.preferredFont(forTextStyle: .title1)
playButton.addTarget(self, action: #selector(playTapped), for: .touchUpInside)
stackView.addArrangedSubview(playButton)
```

That's almost identical to the code for creating the record button, except the play button is set to hidden and alpha 0. Normally you need only one of these, but with stack views it's a little different: a view that is not hidden but has an alpha of 0 appears hidden (i.e., the user can't see it) but still occupies space in the stack view. By setting the button to be hidden and have alpha 0, we're saying "don't show it to the user, and don't let it take up any space in the stack view."

We want to show and hide that play button when needed, meaning that we show it when recording finished successfully and hide it if the user taps to re-record. To solve the first of those, put this code into the `finishRecording()` method, just before setting the right bar button item:

```swift
if playButton.isHidden {
    UIView.animate(withDuration: 0.35) { [unowned self] in
        self.playButton.isHidden = false
        self.playButton.alpha = 1
    }
}
```

To solve the second, put this into `recordTapped()`, just after the call to `startRecording()`:

```swift
if !playButton.isHidden {
    UIView.animate(withDuration: 0.35) { [unowned self] in
        self.playButton.isHidden = true
        self.playButton.alpha = 0
    }
}
```

The `isHidden` property of any `UIView` subclass is a simple boolean, meaning that it's either true or false: a view is either hidden or it's not. As a result, if we had put this code anywhere else it would be meaningless to try to animate it, because there are no intermediate steps between "visible" and "invisible" to animate. But with `UIStackView` it has a meaning, and that meaning is brilliant: the stack view will animate the play button being shown, making it slide out neatly. Changing the alpha at the same time is the perfect finishing touch.

When we created the play button we attached a method called `playTapped()` to it, which isn't written yet. But now that you've seen how to use `AVAudioRecorder`, the code to play using `AVAudioPlayer` should be second nature. Just in case you don't fancy writing the code for yourself, I'll walk you through the steps.

First, create a new property to hold the audio player:

```swift
var whistlePlayer: AVAudioPlayer!
```

Now, add a `playTapped()` method using the code below. This grabs the shared whistle URL, creates an `AVAudioPlayer` inside a `do/try/catch` block, and makes it play. If there's an error loading the sound it shows an alert message to the user. Easy, right?

```swift
@objc func playTapped() {
    let audioURL = RecordWhistleViewController.getWhistleURL()

    do {
        whistlePlayer = try AVAudioPlayer(contentsOf: audioURL)
        whistlePlayer.play()
    } catch {
        let ac = UIAlertController(title: "Playback failed", message: "There was a problem playing your whistle; please try re-recording.", preferredStyle: .alert)
        ac.addAction(UIAlertAction(title: "OK", style: .default))
        present(ac, animated: true)
    }
}
```

If you run the app now I think you'll agree it looks good, particularly as the play button slides out in the stack view. Being able to hear what you recorded is of course a nice touch!

Once the user has a recording they are happy with, we're going to ask them to choose which genre they think it belongs to, and add any comments. At this stage in your Swift coding career, both of these should be very simple view controllers that you can make in just a few minutes.

Add a new file to your project, choosing Cocoa Touch Class. Make it a subclass of `UITableViewController` and name it `SelectGenreViewController`. Open the file for editing, and give it this property:

```swift
static var genres = ["Unknown", "Blues", "Classical", "Electronic", "Jazz", "Metal", "Pop", "Reggae", "RnB", "Rock", "Soul"]
```

This is marked as static so that we can use it in lots of other places - it's a shared list of all the music categories we want to work with. I added "Unknown" in there for people like me who struggle to tell the difference between some music types!

In this class's `viewDidLoad()` method we're going to give it a title, configure the back button to take up less space, then register a cell for re-use. All old stuff:

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    title = "Select genre"
    navigationItem.backBarButtonItem = UIBarButtonItem(title: "Genre", style: .plain, target: nil, action: nil)
    tableView.register(UITableViewCell.self, forCellReuseIdentifier: "Cell")
}
```

For handling the content of the table view, it's all code you've seen in previous projects, but I want to point out three things:

1. When referencing the `genres` array we need to use `SelectGenreViewController.genres` because the array belongs to the class, not to our instance of the class.
2. When reading the text of the cell that was tapped, we're going to use the nil coalescing operator. [The nil coalescing operator was covered in project 12](/hackingwithswift.com/read/12/02-reading-and-writing-basics-userdefaults.md), and in this situation it guarantees we have a genre.
3. When the user has selected a genre, we're going to create an instance of the class `AddCommentsViewController`, store that genre there, then push it onto our navigation stack.

That's it - here are the methods for handling the table view data source and delegate:

```swift
override func numberOfSections(in tableView: UITableView) -> Int {
    return 1
}

override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return SelectGenreViewController.genres.count
}

override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
    cell.textLabel?.text = SelectGenreViewController.genres[indexPath.row]
    cell.accessoryType = .disclosureIndicator
    return cell
}

override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    if let cell = tableView.cellForRow(at: indexPath) {
        let genre = cell.textLabel?.text ?? SelectGenreViewController.genres[0]
        let vc = AddCommentsViewController()
        vc.genre = genre
        navigationController?.pushViewController(vc, animated: true)
    }
}
```

That completes the class - I've deliberately kept it simple because this tutorial is about CloudKit rather than tables! You can now return to <FontIcon icon="fa-brands fa-swift"/>`RecordWhistleViewController.swift` and fill in the `nextTapped()` method like this:

```swift
@objc func nextTapped() {
    let vc = SelectGenreViewController()
    navigationController?.pushViewController(vc, animated: true)
}
```

There's one more easy class to add before we get onto CloudKit, and that's `AddCommentsViewController`. This will show a full-screen `UITextView` for the user to type any extra comments into.

We're going to give this new class three properties: one to hold the genre that gets passed in from `SelectGenreViewController`, one to hold a reference to the `UITextView`, and one to hold a placeholder string. That last property will be used to solve a long-standing `UITextView` annoyance: unlike `UITextField`, you can’t give a `UITextView` a placeholder string, which is a piece of text telling users what to type in there. We'll replicate this behavior by putting a default string into the text view and removing it when the user taps it.

So, create a new Cocoa Touch class. Name it “AddCommentsViewController”, make it inherit from “UIViewController”, then give it these three properties:

```swift
var genre: String!

var comments: UITextView!
let placeholder = "If you have any additional comments that might help identify your tune, enter them here."
```

We're going to override the `loadView()` method of this class, using it to create a new `UITextView` that is pinned to all edges using Auto Layout. The only vaguely interesting thing here is that we'll use Dynamic Type to make the font size adjustable for the user. Here's the code:

```swift
override func loadView() {
    view = UIView()
    view.backgroundColor = .white

    comments = UITextView()
    comments.translatesAutoresizingMaskIntoConstraints = false
    comments.delegate = self
    comments.font = UIFont.preferredFont(forTextStyle: .body)
    view.addSubview(comments)

    comments.leadingAnchor.constraint(equalTo: view.leadingAnchor).isActive = true
    comments.trailingAnchor.constraint(equalTo: view.trailingAnchor).isActive = true
    comments.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
    comments.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
}
```

As per usual, assigning the view controller to be a delegate of something requires conforming to a protocol. In this case, it means conforming to `UITextViewDelegate`, so please add that now.

The absolute least we need to do to make this class work is to fill in the `viewDidLoad()` method with a title for the view controller and a right bar button item to let the user proceed with their submission, then to write a `submitTapped()` method that gets triggered when the button is tapped.

Submitting will use another new class that we'll define shortly, called `SubmitViewController`, and will pass in the genre we got from `SelectGenreViewController` and the user's comments if there are any. If they kept the placeholder intact, we'll send an empty string on. Here's the code:

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    title = "Comments"
    navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Submit", style: .plain, target: self, action: #selector(submitTapped))
    comments.text = placeholder
}

@objc func submitTapped() {
    let vc = SubmitViewController()
    vc.genre = genre

    if comments.text == placeholder {
        vc.comments = ""
    } else {
        vc.comments = comments.text
    }

    navigationController?.pushViewController(vc, animated: true)
}
```

We could easily leave it there and get onto to the CloudKit work, but there's one small tweak we can make to improve the whole experience. As this view controller is the delegate for the `comments` text view, iOS will send us the `textViewDidBeginEditing()` message when the user starts editing it. We can then compare the text view's current text against the placeholder, and clear it if they match. Here's that code:

```swift
func textViewDidBeginEditing(_ textView: UITextView) {
    if textView.text == placeholder {
        textView.text = ""
    }
}
```

That's it: in order to build the `SubmitViewController` class, it's time to introduce CloudKit.

