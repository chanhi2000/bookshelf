---
lang: ko-KR
title: "Importing photos again"
description: "Article(s) > Importing photos again"
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
      content: "Article(s) > Importing photos again"
    - property: og:description
      content: "Importing photos again"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/25/02-importing-photos-again.html
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
  "title": "Importing photos again | Hacking with iOS",
  "desc": "Importing photos again",
  "link": "https://hackingwithswift.com/read/25/2/importing-photos-again",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/Uw1C0JCEprA" />

We've used the `UIImagePickerController` class twice now: once in project 10 and again in project 13, so I hope you're already comfortable with it. We also used a collection view in project 10, but we haven't used it since so you might not be quite so familiar with it.

We need to use a collection view controller, just like in project 10. So, start by opening <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift` and changing this line:

```swift
class ViewController: UIViewController {
```

To this:

```swift
class ViewController: UICollectionViewController {
```

Now open <FontIcon icon="iconfont icon-xcode"/>`Main.storyboard` in Interface Builder, then delete the existing view controller and replace it with a new collection view controller. Use the attributes inspector to make it the initial view controller, use the identity inspector to give it the class “ViewController”, then finally embed it inside a navigation controller.

With the collection view selected, set cell size to be 145 wide and 145 high, and give all four section insets a value of 10. Click inside the prototype cell that Xcode made for you and give it the reuse identifier "ImageView". Finally, drop an image view into the cell so that it occupies all its space, and give it the tag 1000.

All the constraints in this project can be made automatically, so select the collection view using the document outline then go to the Editor menu and choose Resolve Auto Layout Issues > Reset to Suggested Constraints.

We’re done with Interface Builder, so open up <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift` because it’s time to write the code. Note that almost all of this has been covered in other projects, so we're not going to waste much time here when there are far more interesting things around the corner!

To start, add a right bar button item that uses the system's camera icon and calls an `importPicture()` method that we'll write shortly. I'm also going to customize the title of the view controller so that it isn't empty, so here's the new `viewDidLoad()` method:

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    title = "Selfie Share"
    navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .camera, target: self, action: #selector(importPicture))
}
```

Next, let's make the collection view work correctly, starting with the easy stuff: make your view controller conform to the `UINavigationControllerDelegate` and `UIImagePickerControllerDelegate` protocols, because we need those to work with the image picker.

We will store all our apps images inside a `UIImage` array, so please add this property now:

```swift
var images = [UIImage]()
```

We're going to use that array to know how many items are in our collection view, so you should know to write this method yourself:

```swift
override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
    return images.count
}
```

Next comes the only thing out of the ordinary in all this code, which is the `cellForItemAt` method for our collection view. To get us through this part of the project as quickly as possible, I took a shortcut: when it comes to configuring cells to look correct, we can dequeue using the identifier "ImageView" then find the `UIImageView` inside them without a property.

I asked you to set the tag of the image view to be 1000, and here's why: all `UIView` subclasses have a method called `viewWithTag()`, which searches for any views inside itself (or indeed itself) with that tag number. We can find our image view just by using this method, although I'll still use `if let` and a conditional typecast to be sure.

Here's the code for `cellForItemAt`:

```swift
override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ImageView", for: indexPath)

    if let imageView = cell.viewWithTag(1000) as? UIImageView {
        imageView.image = images[indexPath.item]
    }

    return cell
}
```

That makes the collection view work just fine, but we still need three more methods in order to get our basic app ready, and these are the methods to handle the image picker. If this code isn't identical to the code we've previously written, it might as well be - check project 10 if your memory is bad!

```swift
@objc func importPicture() {
    let picker = UIImagePickerController()
    picker.allowsEditing = true
    picker.delegate = self
    present(picker, animated: true)
}

func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
    guard let image = info[.editedImage] as? UIImage else { return }

    dismiss(animated: true)

    images.insert(image, at: 0)
    collectionView.reloadData()
}
```

Done - no more boring old code now. At this point you can run the app if you want, but there's no need to other than being sure your code works - this is just a cut-down version of project 10 so far.

