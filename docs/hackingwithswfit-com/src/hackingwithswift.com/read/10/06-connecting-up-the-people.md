---
lang: ko-KR
title: "Connecting up the people"
description: "Article(s) > Connecting up the people"
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
      content: "Article(s) > Connecting up the people"
    - property: og:description
      content: "Connecting up the people"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/10/06-connecting-up-the-people.html
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
  "title": "Connecting up the people | Hacking with iOS",
  "desc": "Connecting up the people",
  "link": "https://hackingwithswift.com/read/10/6/connecting-up-the-people",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/Ab4m2Mhj4-o" />

We need to make three final changes to this project in order to finish: show the correct number of items, show the correct information inside each cell, then make it so that when users tap a picture they can set a person's name.

Those methods are all increasingly difficult, so we'll start with the first one. Right now, your collection view's `numberOfItemsInSection` method just has `return 10` in there, so you'll see 10 items regardless of how many people are in your array. This is easily fixed:

```swift
override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
    return people.count
}
```

Next, we need to update the collection view's `cellForItemAt` method so that it configures each `PersonCell` cell to have the correct name and image of the person in that position in the array. This takes a few steps:

- Pull out the person from the `people` array at the correct position.
- Set the `name` label to the person's name.
- Create a `UIImage` from the person's image filename, adding it to the value from `getDocumentsDirectory()` so that we have a full path for the image.

We're also going to use this opportunity to give the image views a border and slightly rounded corners, then give the whole cell matching rounded corners, to make it all look a bit more interesting. This is all done using `CALayer`, so that means we need to convert the `UIColor` to a `CGColor`. Anyway, here's the new code:

```swift
override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Person", for: indexPath) as? PersonCell else {
        fatalError("Unable to dequeue PersonCell.")
    }

    let person = people[indexPath.item]

    cell.name.text = person.name

    let path = getDocumentsDirectory().appendingPathComponent(person.image)
    cell.imageView.image = UIImage(contentsOfFile: path.path)

    cell.imageView.layer.borderColor = UIColor(white: 0, alpha: 0.3).cgColor
    cell.imageView.layer.borderWidth = 2
    cell.imageView.layer.cornerRadius = 3
    cell.layer.cornerRadius = 7

    return cell
}
```

There are three new things in there.

First, notice how I’ve used `indexPath.item` rather than `indexPath.row`, because collection views don’t really think in terms of rows.

Second, that code sets the `cornerRadius` property, which rounds the corners of a `CALayer` - or in our case the `UIView` being drawn by the `CALayer`.

Third, I snuck in a new `UIColor` initializer: `UIColor(white:alpha:)`. This is useful when you only want grayscale colors.

With that done, the app works: you can run it with <kbd>Cmd</kbd>+<kbd>R</kbd>, import photos, and admire the way they all appear correctly in the app. But don't get your hopes up, because we're not done yet - you still can't assign names to people!

For this last part of the project, we're going to recap how to add text fields to a `UIAlertController`, just like you did in project 5. All of the code is old, but I'm going to go over it again to make sure you fully understand.

First, the delegate method we're going to implement is the collection view’s `didSelectItemAt` method, which is triggered when the user taps a cell. This method needs to pull out the `Person` object at the array index that was tapped, then show a `UIAlertController` asking users to rename the person.

Adding a text field to an alert controller is done with the `addTextField()` method. We'll also need to add two actions: one to cancel the alert, and one to save the change. To save the changes, we need to add a closure that pulls out the text field value and assigns it to the person's `name` property, then we'll also need to reload the collection view to reflect the change.

That's it! The only thing that's new, and it's hardly new at all, is the setting of the `name` property. Put this new method into your class:

```swift
override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    let person = people[indexPath.item]

    let ac = UIAlertController(title: "Rename person", message: nil, preferredStyle: .alert)
    ac.addTextField()

    ac.addAction(UIAlertAction(title: "Cancel", style: .cancel))

    ac.addAction(UIAlertAction(title: "OK", style: .default) { [weak self, weak ac] _ in
        guard let newName = ac?.textFields?[0].text else { return }
        person.name = newName

        self?.collectionView.reloadData()
    })

    present(ac, animated: true)
}
```

Finally, the project is complete: you can import photos of people, then tap on them to rename. Well done!

