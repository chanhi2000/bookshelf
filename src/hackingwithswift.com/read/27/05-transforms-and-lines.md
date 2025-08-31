---
lang: ko-KR
title: "Transforms and lines"
description: "Article(s) > Transforms and lines"
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
      content: "Article(s) > Transforms and lines"
    - property: og:description
      content: "Transforms and lines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/27/05-transforms-and-lines.html
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
  "title": "Transforms and lines | Hacking with iOS",
  "desc": "Transforms and lines",
  "link": "https://hackingwithswift.com/read/27/5/transforms-and-lines",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/y7NZvkTig40" />

Add another case to your `switch/case` block, and make this one call another new method named `drawRotatedSquares()`. This is going to demonstrate how we can apply transforms to our context before drawing, and how you can stroke a path without filling it.

To make this happen, you need to know three new Core Graphics methods:

1. `translateBy()` translates (moves) the current transformation matrix.
2. `rotate(by:)` rotates the current transformation matrix.
3. `strokePath()` strokes the path with your specified line width, which is 1 if you don't set it explicitly.

The current transformation matrix is very similar to those `CGAffineTransform` modifications we used in project 15, except its application is a little different in Core Graphics. In UIKit, you rotate drawing around the center of your view, as if a pin was stuck right through the middle. In Core Graphics, you rotate around the top-left corner, so to avoid that we're going to move the transformation matrix half way into our image first so that we've effectively moved the rotation point.

This also means we need to draw our rotated squares so they are centered on our center: for example, setting their top and left coordinates to be -128 and their width and height to be 256.

Here's the code for the method:

```swift
func drawRotatedSquares() {
    let renderer = UIGraphicsImageRenderer(size: CGSize(width: 512, height: 512))

    let img = renderer.image { ctx in
        ctx.cgContext.translateBy(x: 256, y: 256)

        let rotations = 16
        let amount = Double.pi / Double(rotations)

        for _ in 0 ..< rotations {
            ctx.cgContext.rotate(by: CGFloat(amount))
            ctx.cgContext.addRect(CGRect(x: -128, y: -128, width: 256, height: 256))
        }

        ctx.cgContext.setStrokeColor(UIColor.black.cgColor)
        ctx.cgContext.strokePath()
    }

    imageView.image = img
}
```

Run the app and look at the output: beautiful, rotated, stroked squares, with no extra calculations required. I mean, just stop for a moment and consider the math it would take to calculate the four corners of each of those rectangles. If sine and cosine are distant memories for you, be glad to have the current transformation matrix!

One thing that I should make clear: modifying the CTM is cumulative, which is what makes the above code work. That is, when you rotate the CTM, that transformation is applied on top of what was there already, rather than to a clean slate. So the code works by rotating the CTM a small amount more every time the loop goes around.

The last shape drawing I want to show you is how to draw lines, and you're going to need two new functions: `move(to:)` and `addLine(to:)`. These are the Core Graphics equivalents to the `UIBezierPath` paths we made in project 20 to move the fireworks.

Add another case to your switch/case block, this time calling `drawLines()`. I'm going to make this translate and rotate the CTM again, although this time the rotation will always be 90 degrees. This method is going to draw boxes inside boxes, always getting smaller, like a square spiral. It's going to do this by adding a line to more or less the same point inside a loop, but each time the loop rotates the CTM so the actual point the line ends has moved too. It will also slowly decrease the line length, causing the space between boxes to shrink like a spiral. Here's the code:

```swift
func drawLines() {
    let renderer = UIGraphicsImageRenderer(size: CGSize(width: 512, height: 512))

    let img = renderer.image { ctx in
        ctx.cgContext.translateBy(x: 256, y: 256)

        var first = true
        var length: CGFloat = 256

        for _ in 0 ..< 256 {
            ctx.cgContext.rotate(by: .pi / 2)

            if first {
                ctx.cgContext.move(to: CGPoint(x: length, y: 50))
                first = false
            } else {
                ctx.cgContext.addLine(to: CGPoint(x: length, y: 50))
            }

            length *= 0.99
        }

        ctx.cgContext.setStrokeColor(UIColor.black.cgColor)
        ctx.cgContext.strokePath()
    }

    imageView.image = img
}
```

The end result looks like one of the hand-crafted effects from the Twilight Zone, but it shows a little of the power that transforms and lines can bring to your drawing.

