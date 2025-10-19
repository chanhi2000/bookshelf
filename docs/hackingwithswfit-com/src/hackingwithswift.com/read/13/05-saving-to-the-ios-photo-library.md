---
lang: ko-KR
title: "Saving to the iOS photo library"
description: "Article(s) > Saving to the iOS photo library"
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
      content: "Article(s) > Saving to the iOS photo library"
    - property: og:description
      content: "Saving to the iOS photo library"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/13/05-saving-to-the-ios-photo-library.html
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
  "title": "Saving to the iOS photo library | Hacking with iOS",
  "desc": "Saving to the iOS photo library",
  "link": "https://hackingwithswift.com/read/13/5/saving-to-the-ios-photo-library",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/F0clMFqiOys" />

I know it's fun to play around with Core Image filters (and you've only seen some of them!), but we have a project to finish so I want to introduce you to a new function: `UIImageWriteToSavedPhotosAlbum()`. This method does exactly what its name says: give it a `UIImage` and it will write the image to the photo album.

This method takes four parameters: the image to write, who to tell when writing has finished, what method to call, and any context. The context is just like the context value you can use with KVO, as seen in project 4, and again we're not going to use it here. The first two parameters are quite simple: we know what image we want to save (the processed one in the image view), and we also know that we want `self` (the current view controller) to be notified when writing has finished.

The third parameter can be provided in two ways: vague and clean, or specific and ugly. It needs to be a selector that lists the method in our view controller that will be called, and it's specified using `#selector`. The method it will call will look like this:

```swift
func image(_ image: UIImage, didFinishSavingWithError error: Error?, contextInfo: UnsafeRawPointer) {
}
```

Previously we've had very simple selectors, like `#selector(shareTapped)`. And we can use that approach here - Swift allows us to be really vague about the selector we intend to call, and this works just fine:

```swift
#selector(image)
```

Yes, that approach is nice and easy to read, but it's also very vague: it doesn't say what is actually going to happen. The alternative is to be very specific about the method we want called, so you can write this:

```swift
#selector(image(_:didFinishSavingWithError:contextInfo:))
```

This second option is longer, but provides much more information both to Xcode and to other people reading your code, so it's generally preferred. To be honest, this particular callback is a bit of a wart in iOS, but the fact that it stands out so much is testament to the fact that there are so few warts around!

Putting it all together, here's the finished `save()` method:

```swift
@IBAction func save(_ sender: Any) {
    guard let image = imageView.image else { return }

    UIImageWriteToSavedPhotosAlbum(image, self, #selector(image(_:didFinishSavingWithError:contextInfo:)), nil)
}
```

From here on it's easy, because we just need to write the `didFinishSavingWithError` method. This must show one of two messages depending on whether we get an error sent to us. The error might be, for example, that the user denied us permission to write to the photo album. This will be sent as an `Error?` object, so if it's `nil` we know there was no error.

This parameter is important because if an error has occurred (i.e., the `error` parameter is not `nil`) then we need to unwrap the `Error` object and use its `localizedDescription` property - this will tell users what the error message was in their own language.

```swift
@objc func image(_ image: UIImage, didFinishSavingWithError error: Error?, contextInfo: UnsafeRawPointer) {
    if let error = error {
        // we got back an error!
        let ac = UIAlertController(title: "Save error", message: error.localizedDescription, preferredStyle: .alert)
        ac.addAction(UIAlertAction(title: "OK", style: .default))
        present(ac, animated: true)
    } else {
        let ac = UIAlertController(title: "Saved!", message: "Your altered image has been saved to your photos.", preferredStyle: .alert)
        ac.addAction(UIAlertAction(title: "OK", style: .default))
        present(ac, animated: true)
    }
}
```

And that's it: your app now imports pictures, manipulates them with a Core Image filter and a `UISlider`, then saves the result back to the photo library. Easy!

