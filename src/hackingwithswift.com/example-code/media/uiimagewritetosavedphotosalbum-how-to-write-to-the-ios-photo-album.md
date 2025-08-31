---
lang: ko-KR
title: "UIImageWriteToSavedPhotosAlbum(): how to write to the iOS photo album"
description: "Article(s) > UIImageWriteToSavedPhotosAlbum(): how to write to the iOS photo album"
category:
  - Swift
  - iOS
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - swift-5.10
  - ios
  - ios-2.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > UIImageWriteToSavedPhotosAlbum(): how to write to the iOS photo album"
    - property: og:description
      content: "UIImageWriteToSavedPhotosAlbum(): how to write to the iOS photo album"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/media/uiimagewritetosavedphotosalbum-how-to-write-to-the-ios-photo-album.html
date: 2019-03-28
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Media - free Swift example code",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/example-code/media/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "UIImageWriteToSavedPhotosAlbum(): how to write to the iOS photo album | Media - free Swift example code",
  "desc": "UIImageWriteToSavedPhotosAlbum(): how to write to the iOS photo album",
  "link": "https://hackingwithswift.com/example-code/media/uiimagewritetosavedphotosalbum-how-to-write-to-the-ios-photo-album",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 2.0

<!-- TODO: 작성 -->

<!-- 
It's not hard to save an image straight to the user's photo library, but I have to admit the syntax isn't immediately obvious! iOS has a function called `UIImageWriteToSavedPhotosAlbum()` that takes four parameters: parameter one is the image to save, parameters two and three set a delegate and selector to send when the image has been written successfully, and parameter four is any additional context information you wan to send.

For example, you might use it like this:

```swift
UIImageWriteToSavedPhotosAlbum(yourImage, self, #selector(image(_:didFinishSavingWithError:contextInfo:)), nil)
```

That will write the image to the photo library, then call a method when it completes. That method needs to be named very precisely, which is where it's easy to go wrong. Using the call above, you need to write your callback method like this:

```swift
@objc func image(_ image: UIImage, didFinishSavingWithError error: NSError?, contextInfo: UnsafeRawPointer) {
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

-->

::: details Similar solutions…

<!--
/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller">How to choose a photo from the camera roll using UIImagePickerController 
/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller">How to take a photo using the camera and UIImagePickerController 
/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto">How to save a string to a file on disk with write(to:) 
/example-code/language/what-is-copy-on-write">What is copy on write? 
/example-code/language/how-to-write-a-closure-that-returns-a-value">How to write a closure that returns a value</a>
-->

:::

