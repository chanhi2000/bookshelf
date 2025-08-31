---
lang: ko-KR
title: "Wrap up"
description: "Article(s) > Wrap up"
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
      content: "Article(s) > Wrap up"
    - property: og:description
      content: "Wrap up"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/01/07-wrap-up.html
next: /hackingwithswift.com/read/02/overview.md
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
  "title": "Wrap up | Hacking with iOS",
  "desc": "Wrap up",
  "link": "https://hackingwithswift.com/read/1/7/wrap-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/frqdi_lluvE" />

This has been a very simple project in terms of what it can do, but you've also learned a huge amount about Swift, Xcode and storyboards. I know it's not easy, but trust me: you've made it this far, so you're through the hardest part.

To give you an idea of how far you've come, here are just some of the things we've covered: table views and image views, app bundles, `FileManager`, typecasting, view controllers, storyboards, outlets, Auto Layout, `UIImage`, and more.

Yes, that's a *huge* amount, and to be brutally honest chances are you'll forget half of it. But that's OK, because we all learn through repetition, and if you continue to follow the rest of this series you'll be using all these and more again and again until you know them like the back of your hand.

---

## Review what you learned

Anyone can sit through a tutorial, but it takes actual work to remember what was taught. It’s my job to make sure you take as much from these tutorials as possible, so I’ve prepared a short review to help you check your learning.

```component VPCard
{
  "title": "Review - Project 1: Storm Viewer - Hacking with Swift",
  "desc": "Interactive tests that help gauge your progress learning Swift",
  "link": "https://hackingwithswift.com/review/hws/project-1-storm-viewer",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

---

## Challenge

This has the beginnings of a useful app, but if you really want your new knowledge to sink in you need to start writing some new code yourself - without following a tutorial, or having an answer you can just look up online.

So, each time you complete a project I’ll be setting you a challenge to modify it somehow. Yes, this will take some work, but there is no learning without struggle - all the challenges are completely within your grasp based on what you’ve learned so far.

For this project, your challenges are:

- Use Interface Builder to select the text label inside your table view cell and adjust its font size to something larger - experiment and see what looks good.
- In your main table view, show the image names in sorted order, so “nssl0033.jpg” comes before “nssl0034.jpg”.
- Rather than show image names in the detail title bar, show “Picture X of Y”, where Y is the total number of images and X is the selected picture’s position in the array. Make sure you count from 1 rather than 0.

---

## Hints

It is *vital* to your learning that you try the challenges above yourself, and not just for a handful of minutes before you give up.

Every time you try something wrong, you learn that it’s wrong and you’ll remember that it’s wrong. By the time you find the *correct* solution, you’ll remember it much more thoroughly, while also remembering a lot of the wrong turns you took.

This is what I mean by “there is no learning without struggle”: if something comes easily to you, it can go just as easily. But when you have to really mentally fight for something, it will stick much longer.

But if you’ve already worked hard at the challenges above and are still struggling to implement them, I’m going to write some hints below that should guide you to the correct answer.

**If you ignore me and read these hints without having spent at least 30 minutes trying the challenges above, the only person you’re cheating is yourself.**

Still here? OK. Let’s take a look at the challenges…

**Use Interface Builder to select the text label inside your table view cell and adjust its font size to something larger - experiment and see what looks good.**

This ought to be easy enough: open <FontIcon icon="iconfont icon-xcode"/>`Main.storyboard`, then use the document outline to select the table view, select the Picture cell inside it, select the Content View inside *that*, and finally select the Title label. In the attributes inspector you’ll find a number of options - try to figure out which one controls the font size.

**In your main table view, show the image names in sorted order, so “nssl0033.jpg” comes before “nssl0034.jpg”.**

These pictures may or may not already be sorted for you, but your challenge here is to make sure they are *always* sorted. We’ve covered sorting arrays previously, and you should remember there’s a `sort()` method you can use.

However, the question is: where should it be called? You *could* call this method each time you append an “nssl” picture to the `pictures` array, but that just causes extra work. Where could you put a call to `sort()` so its done only once, when the images have all been loaded?

**Rather than show image names in the detail title bar, show “Picture X of Y”, where Y is the total number of images and X is the selected picture’s position in the array. Make sure you count from 1 rather than 0.**

In this project you learned how to create properties like this one:

```swift
var selectedImage: String?
```

You also learned how to *set* those properties from somewhere else, like this:

```swift
vc.selectedImage = pictures[indexPath.row]
```

This challenge requires you to make two new properties in `DetailViewController`: one to contain the image’s position in the array, and one to contain the number of pictures.

For example, you might add these two properties to `DetailViewController`:

```swift
var selectedPictureNumber = 0
var totalPictures = 0
```

You can then use those for the title in the navigation bar by using string interpolation. Remember, string interpolation looks like this:

```swift
title = "This image is \(selectedImage)"
```

How can you use that with `selectedPictureNumber` and `totalPictures`?

Once that’s done, you need to pass in some values for those properties. We create `DetailViewController` here:

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    if let vc = storyboard?.instantiateViewController(withIdentifier: "Detail") as? DetailViewController {
        vc.selectedImage = pictures[indexPath.row]
        navigationController?.pushViewController(vc, animated: true)
    }
}
```

That sets the `selectedImage` property using one of the strings from the `pictures` array. Which string? Well, we use `indexPath.row` for that, because that tells us which table view cell was selected.

So, we can use `indexPath.row` to set the `selectedPictureNumber` property in `DetailViewController` - just make sure you add 1 to it so that it counts from 1 rather than 0.

As for the `totalPictures` property in `DetailViewController`, which needs to contain the total number of pictures in our array. We already wrote code to read the size of the array inside the `numberOfRowsInSection` method - how can you use similar code to set `totalPictures`?

