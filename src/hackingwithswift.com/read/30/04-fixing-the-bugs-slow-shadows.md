---
lang: ko-KR
title: "Fixing the bugs: slow shadows"
description: "Article(s) > Fixing the bugs: slow shadows"
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
      content: "Article(s) > Fixing the bugs: slow shadows"
    - property: og:description
      content: "Fixing the bugs: slow shadows"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/30/04-fixing-the-bugs-slow-shadows.html
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
  "title": "Fixing the bugs: slow shadows | Hacking with iOS",
  "desc": "Fixing the bugs: slow shadows",
  "link": "https://hackingwithswift.com/read/30/4/fixing-the-bugs-slow-shadows",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/ggxcOnGm9tg" />

It's time for us to start fixing the problems.

::: important

when making performance changes you should change only one thing at a time, then re-test to make sure your change helped. If you changed two or more things and performance got better, which one worked? Or, if performance got worse, perhaps one thing worked and one didn't!

:::

Let's begin with the table view: you should have seen parts of the table view turn dark yellow when Color Offscreen-Rendered Yellow was selected. This is happening because the images are being rendered inefficiently: the rounded corners effect and the shadow are being done in real-time, which is computationally expensive.

You can find the code for this in <FontIcon icon="fa-brands fa-swift"/>`SelectionViewController.swift`, inside the `cellForRowAt` method:

```swift
let renderer = UIGraphicsImageRenderer(size: original.size)

let rounded = renderer.image { ctx in
    ctx.cgContext.addEllipse(in: CGRect(origin: CGPoint.zero, size: original.size))
    ctx.cgContext.clip()

    original.draw(at: CGPoint.zero)
}

cell.imageView?.image = rounded

// give the images a nice shadow to make them look a bit more dramatic
cell.imageView?.layer.shadowColor = UIColor.black.cgColor
cell.imageView?.layer.shadowOpacity = 1
cell.imageView?.layer.shadowRadius = 10
cell.imageView?.layer.shadowOffset = CGSize.zero
```

There are two new techniques being demonstrated here: creating a clipping path and rendering layer shadows.

We’ve used `UIGraphicsImageRenderer` before to create custom-rendered images, and the rendering here is made up of three commands: adding an ellipse and drawing a `UIImage` are both things you’ve seen before, but the call to `clip()` is new. As you know, you can create a path and draw it using two separate Core Graphics commands, but instead of running the draw command you can take the existing path and use it for clipping instead. This has the effect of only drawing things that lie inside the path, so when the `UIImage` is drawn only the parts that lie inside the elliptical clipping path are visible, thus rounding the corners.

The second new technique in this code is rendering layer shadows. iOS lets you add a basic shadow to any of its views, and it's a simple way to make something stand out on the screen. But it's not fast: it literally scans the pixels in the image to figure out what's transparent, then uses that information to draw the shadow correctly.

The combination of these two techniques creates a huge amount of work for iOS: it has to load the initial image, create a new image of the same size, render the first image into the second, the render the second image off-screen to calculate the shadow pixels, then render the whole finished product to the screen.  When you hit a performance problem, you either drop the code that triggers the problem or you make it run faster.

In our case, we'll assume the designer insists the drop shadow is gorgeous so we need to make the code faster. There are several different approaches we could take, and I want to walk you through each of them so you can see the relative benefits of each.

The first possibility: Core Graphics is more than able of drawing shadows itself, which means we could handle the shadow rendering in our `UIGraphicsImageRenderer` pass rather than needing an extra render pass. To do that, we can use the Core Graphics `setShadow()` method, which takes three parameters: how far to offset the shadow, how much to blur it, and what color to use. You’ll notice there’s no way of specifying what shape the shadow should be, because Core Graphics has a simple but powerful solution: once you enable a shadow, it gets applied to everything you draw until you disable it by specifying a nil color.

So, we can replicate our current shadow like this:

```swift
let rounded = renderer.image { ctx in
    ctx.cgContext.setShadow(offset: CGSize.zero, blur: 200, color: UIColor.black.cgColor)
    ctx.cgContext.fillEllipse(in: CGRect(origin: CGPoint.zero, size: original.size))
    ctx.cgContext.setShadow(offset: CGSize.zero, blur: 0, color: nil)

    ctx.cgContext.addEllipse(in: CGRect(origin: CGPoint.zero, size: original.size))
    ctx.cgContext.clip()

    original.draw(at: CGPoint.zero)
}
```

Notice how the blur is 200 points, which is quite different from the shadow radius of 10 in the old code? The reason for this is important, because it highlights another significant problem in the code. When the original code set the shadow size using `cell.imageView?.layer.shadowRadius` it was specified in points relative to the size of the `UIImageView`. When the new code sets the shadow size using `setShadow()` it’s in points relative to the size of the image being drawn, which is created like this:

```swift
let renderer = UIGraphicsImageRenderer(size: original.size)
```

The problem is that the images being loaded are 750x750 pixels at 1x resolution, so 1500x1500 at 2x and 2250x2250 at 3x. If you look at `viewDidLoad()` you’ll see that the row height is 90 points, so we’re loading huge pictures into a tiny space. That means loading a 1500x1500 image or larger, creating a second render buffer that size, rendering the image into it, and so on.

Clearly those images don’t need to be anything like that size, but sometimes you don’t have control over it. In this app you might be able to go back to the original designer and ask them to provide smaller assets, or if you were feeling ready for a fight you could resize them yourself, but what if you had fetched these assets from a remote server? And wait until you see the size of the images in the detail view - those images might only take up 500KB on disk, but when they are uncompressed by iOS they’ll need around 45 MB of RAM!

A second thing to notice is that the result of this new shadowing isn’t quite the same, because the shadow being rendered is now properly clipped inside the bounds of its image view. Although it’s more technically correct, it doesn’t look the same, and I’m going to assume that the original look - ugly as it was - was intentional.

So, option 1 - making Core Graphics draw the shadow - helps eliminate the second render pass, but it has very different results and a result we should rule it out. However, it did at least point us to an interesting problem: we’re squeezing very large images into a tiny space. iOS doesn’t know or care that this is happening because it just does what its told, but we have more information: we know the image isn’t needed at that crazy size, so we can use that knowledge to deliver huge performance increases.

First, change the rendering code to this:

```swift
let renderRect = CGRect(origin: .zero, size: CGSize(width: 90, height: 90))
let renderer = UIGraphicsImageRenderer(size: renderRect.size)

let rounded = renderer.image { ctx in
    ctx.cgContext.addEllipse(in: renderRect)
    ctx.cgContext.clip()

    original.draw(in: renderRect)
}
```

That still causes iOS to load and render a large image, but it now gets scaled down to the size it needs to be for actual usage, so it will immediately perform faster.

However, it still incurs a second rendering pass: iOS still needs to trace the resulting image to figure out where the shadow must be drawn. Calculating the shadow is hard, because iOS doesn’t know that we clipped it to be a circle so it needs to figure out what's transparent itself. Again, though, we have more information: the shadow is going to be a perfect circle, so why bother having iOS figure out the shadow for itself?

We can tell iOS not to automatically calculate the shadow path for our images by giving it the exact shadow path to use. The easiest way to do this is to create a new `UIBezierPath` that describes our image (an ellipse with width 90 and height 90), then convert it to a `CGPath` because `CALayer` doesn't understand what `UIBezierPath` is.

Here's the updated shadow code:

```swift
// give the images a nice shadow to make them look a bit more dramatic
cell.imageView?.layer.shadowColor = UIColor.black.cgColor
cell.imageView?.layer.shadowOpacity = 1
cell.imageView?.layer.shadowRadius = 10
cell.imageView?.layer.shadowOffset = CGSize.zero
cell.imageView?.layer.shadowPath = UIBezierPath(ovalIn: renderRect).cgPath
```

When you run that, you'll still see the same shadows everywhere, but the dark yellow color is gone. This means we’ve successfully eliminated the second render pass by giving iOS the pre-calculated shadow path, and we’ve also sped up drawing by scaling down the amount of working being done. You can turn off Color Offscreen-Rendered Yellow now; we don’t need it any more.

Working with rounded corners *and* shadows can be tricky, as you’ve seen here. If it weren’t for the shadowing, we could eliminate the first render pass by setting `layer.cornerRadius` to have iOS round the corners for us - it’s a nice and easy way to create rounded rectangle shapes (or even circles!) without any custom rendering code.

