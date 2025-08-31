---
lang: ko-KR
title: "Drawing into a Core Graphics context with UIGraphicsImageRenderer"
description: "Article(s) > Drawing into a Core Graphics context with UIGraphicsImageRenderer"
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
      content: "Article(s) > Drawing into a Core Graphics context with UIGraphicsImageRenderer"
    - property: og:description
      content: "Drawing into a Core Graphics context with UIGraphicsImageRenderer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/27/03-drawing-into-a-core-graphics-context-with-uigraphicsimagerenderer.html
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
  "title": "Drawing into a Core Graphics context with UIGraphicsImageRenderer | Hacking with iOS",
  "desc": "Drawing into a Core Graphics context with UIGraphicsImageRenderer",
  "link": "https://hackingwithswift.com/read/27/3/drawing-into-a-core-graphics-context-with-uigraphicsimagerenderer",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/vzXl0MhVXxY" />

Carl Sagan once said, "if you wish to make an apple pie from scratch, you must first invent the universe." Filling in the `drawRectangle()` method doesn't require you to invent the universe, but it *does* require a fair amount of Core Graphics learning before you get to the actual drawing part. I will, of course, try to remove as much of it as I can so that the remaining bits are important.

The most important thing to understand is that, like Core Animation, Core Graphics sits at a lower technical level than UIKit. This means it doesn't understand classes you know like `UIColor` and `UIBezierPath`, so you either need to use their counterparts (`CGColor` and `CGPath` respectively), or use helper methods from UIKit that convert between the two.

Second you need to understand that Core Graphics differentiates between creating a path and drawing a path. That is, you can add lines, squares and other shapes to a path as much as you want to, but none of it will do anything until you actually draw the path. Think of it like a simple state machine: you configure a set of states you want (colors, transforms, and so on), then perform actions. You can even maintain multiple states at a time by pushing and popping in order to backup and restore specific states.

Finally, you should know that Core Graphics is extremely fast: you can use it for updating drawing in real time, and you'll be very impressed. Core Graphics can work on a background thread - something that UIKit can't do - which means you can do complicated drawing without locking up your user interface.

It's time to start looking at some code, so it’s time to meet the `UIGraphicsImageRenderer` class. This was introduced in iOS 10 to allow fast and easy graphics rendering, while also quietly adding support for wide color devices like the iPad Pro. It works with closures, which might seem annoying if you’re still not comfortable with them, but has the advantage that you can build complex drawing instructions by composing functions.

Now, wait a minute: that class name starts with "UI", so what makes it anything to do with Core Graphics? Well, it *isn’t* a Core Graphics class; it’s a UIKit class, but it acts as a gateway to and from Core Graphics for UIKit-based apps like ours. You create a renderer object and start a rendering context, but everything between will be Core Graphics functions or UIKit methods that are designed to work with Core Graphics contexts.

In Core Graphics, a context is a canvas upon which we can draw, but it also stores information about how we want to draw (e.g., what should our line thickness be?) and information about the device we are drawing to. So, it's a combination of canvas and metadata all in one, and it's what you'll be using for all your drawing. This Core Graphics context is exposed to us when we render with `UIGraphicsImageRenderer`.

When you create a renderer, you get to specify how big it should be, whether it should be opaque or not, and what pixel to point scale you want. To kick off rendering you can either call the `image()` function to get back a `UIImage` of the results, or call the `pngData()` and `jpegData()` methods to get back a `Data` object in PNG or JPEG format respectively.

Armed with this knowledge, you can write the first version of `drawRectangle()`:

```swift
func drawRectangle() {
    let renderer = UIGraphicsImageRenderer(size: CGSize(width: 512, height: 512))

    let img = renderer.image { ctx in
        // awesome drawing code
    }

    imageView.image = img
}
```

In that code, we create a `UIGraphicsImageRenderer` with the size 512x512, leaving it with default values for scale and opacity - that means it will be the same scale as the device (e.g. 2x for retina) and transparent.

Creating the renderer doesn’t actually start any rendering - that’s done in the `image()` method. This accepts a closure as its only parameter, which is code that should do all the drawing. It gets passed a single parameter that I’ve named `ctx`, which is a reference to a `UIGraphicsImageRendererContext` to draw to. This is a thin wrapper around another data type called `CGContext`, which is where the majority of drawing code lives.

When the rendering has finished it gets placed into the `image` constant, which in turn gets sent to the image view for display. Our rendering code is empty right now, but it will still result in an empty 512x512 image being created.

Let’s make things more interesting by having the `drawRectangle()` method actually draw a rectangle. And not just *any* rectangle - a `stroked` rectangle, which is a rectangle with a line around it.

There are a number of ways of drawing boxes in Core Graphics, but I've chosen the easiest: we'll define a `CGRect` structure that holds the bounds of our rectangle, we'll set the context's fill color to be red and its stroke color to be black, we'll set the context's line drawing width to be 10 points, then add a rectangle path to the context and draw it.

The part that might seem strange is the way we're adding a path then drawing it. This is because you can actually add multiple paths to your context before drawing, which means Core Graphics batches them all together. Your path can be as simple or as complicated as you want, you still need to set up your Core Graphics state as you want it then draw the path.

Although the `UIGraphicsImageRendererContext` does have a handful of methods we can call to do basic drawing, almost all the good stuff lies in its `cgContext` property that gives us the full power of Core Graphics.

Let's take a look at the five new methods you'll need to use to draw our box:

1. `setFillColor()` sets the fill color of our context, which is the color used on the insides of the rectangle we'll draw.
2. `setStrokeColor()` sets the stroke color of our context, which is the color used on the line around the edge of the rectangle we'll draw.
3. `setLineWidth()` adjusts the line width that will be used to stroke our rectangle. Note that the line is drawn centered on the edge of the rectangle, so a value of 10 will draw 5 points inside the rectangle and five points outside.
4. `addRect()` adds a `CGRect` rectangle to the context's current path to be drawn.
5. `drawPath()` draws the context's current path using the state you have configured.

All five of those are called on the Core Graphics context that comes from `ctx.cgContext`, using a parameter that does the actual work. So for setting colors the parameter is the color to set (remember how to convert `UIColor` values to `CGColor` values? I hope so!), for setting the line width it's a number in points, for adding a rectangle path it's the `CGRect` of your rectangle, and for drawing it's a special constant that says whether you want just the fill, just the stroke, or both.

Time for some code: replace `// awesome drawing code` with this:

```swift
let rectangle = CGRect(x: 0, y: 0, width: 512, height: 512)

ctx.cgContext.setFillColor(UIColor.red.cgColor)
ctx.cgContext.setStrokeColor(UIColor.black.cgColor)
ctx.cgContext.setLineWidth(10)

ctx.cgContext.addRect(rectangle)
ctx.cgContext.drawPath(using: .fillStroke)
```

At long last, this project does something useful: when you run it, you'll see a red box with a black line around it. You can’t really see it just yet, but the black line will be just five points across in its original image because it's centered on the edge of its path and therefore is cropped. You'll see this more clearly in a moment.

