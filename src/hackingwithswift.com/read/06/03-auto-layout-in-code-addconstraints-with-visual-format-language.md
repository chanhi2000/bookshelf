---
lang: ko-KR
title: "Auto Layout in code: addConstraints with Visual Format Language"
description: "Article(s) > Auto Layout in code: addConstraints with Visual Format Language"
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
      content: "Article(s) > Auto Layout in code: addConstraints with Visual Format Language"
    - property: og:description
      content: "Auto Layout in code: addConstraints with Visual Format Language"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/06/03-auto-layout-in-code-addconstraints-with-visual-format-language.html
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
  "title": "Auto Layout in code: addConstraints with Visual Format Language | Hacking with iOS",
  "desc": "Auto Layout in code: addConstraints with Visual Format Language",
  "link": "https://hackingwithswift.com/read/6/3/auto-layout-in-code-addconstraints-with-visual-format-language",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/GiGhVZ-2EQg" />

Create a new Single View App project in Xcode, naming it Project6b. We're going to create some views by hand, then position them using Auto Layout. Put this into your `viewDidLoad()` method:

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    let label1 = UILabel()
    label1.translatesAutoresizingMaskIntoConstraints = false
    label1.backgroundColor = UIColor.red
    label1.text = "THESE"
    label1.sizeToFit()

    let label2 = UILabel()
    label2.translatesAutoresizingMaskIntoConstraints = false
    label2.backgroundColor = UIColor.cyan
    label2.text = "ARE"
    label2.sizeToFit()

    let label3 = UILabel()
    label3.translatesAutoresizingMaskIntoConstraints = false
    label3.backgroundColor = UIColor.yellow
    label3.text = "SOME"
    label3.sizeToFit()

    let label4 = UILabel()
    label4.translatesAutoresizingMaskIntoConstraints = false
    label4.backgroundColor = UIColor.green
    label4.text = "AWESOME"
    label4.sizeToFit()

    let label5 = UILabel()
    label5.translatesAutoresizingMaskIntoConstraints = false
    label5.backgroundColor = UIColor.orange
    label5.text = "LABELS"
    label5.sizeToFit()        

    view.addSubview(label1)
    view.addSubview(label2)
    view.addSubview(label3)
    view.addSubview(label4)
    view.addSubview(label5)
}
```

All that code creates five `UILabel` objects, each with unique text and a unique background color. All five views then get added to the view belonging to our view controller by using `view.addSubview()`.

We also set the property `translatesAutoresizingMaskIntoConstraints` to be `false` on each label, because by default iOS generates Auto Layout constraints for you based on a view's size and position. We'll be doing it by hand, so we need to disable this feature.

If you run the app now, you'll see seem some colorful labels at the top, overlapping so it looks like it says "LABELS ME". That's because our labels are placed in their default position (at the top-left of the screen) and are all sized to fit their content thanks to us calling `sizeToFit()` on each of them.

We're going to add some constraints that say each label should start at the left edge of its superview, and end at the right edge. What’s more, we're going to do this using a technique called Auto Layout Visual Format Language (VFL), which is kind of like a way of drawing the layout you want with a series of keyboard symbols.

Before we do that, we need to create a dictionary of the views we want to lay out. The reason this is needed for VFL will become clear shortly, but first here's the dictionary you need to add below the last call to `addSubview()`:

```swift
let viewsDictionary = ["label1": label1, "label2": label2, "label3": label3, "label4": label4, "label5": label5]
```

That creates a dictionary with strings for its keys and our labels as its values (the values). So, to get access to `label1`, we can now use `viewsDictionary["label1"]`. This might seem redundant, but wait just a moment longer: it's time for some Visual Format Language!

Add these lines directly below the `viewsDictionary` that was just created:

```swift
view.addConstraints( NSLayoutConstraint.constraints(withVisualFormat: "H:|[label1]|", options: [], metrics: nil, views: viewsDictionary))
view.addConstraints( NSLayoutConstraint.constraints(withVisualFormat: "H:|[label2]|", options: [], metrics: nil, views: viewsDictionary))
view.addConstraints( NSLayoutConstraint.constraints(withVisualFormat: "H:|[label3]|", options: [], metrics: nil, views: viewsDictionary))
view.addConstraints( NSLayoutConstraint.constraints(withVisualFormat: "H:|[label4]|", options: [], metrics: nil, views: viewsDictionary))
view.addConstraints( NSLayoutConstraint.constraints(withVisualFormat: "H:|[label5]|", options: [], metrics: nil, views: viewsDictionary))
```

That's a lot of code, but actually it's just the same thing five times over. As a result, we could easily rewrite those in a loop, like this:

```swift
for label in viewsDictionary.keys {
    view.addConstraints( NSLayoutConstraint.constraints(withVisualFormat: "H:|[\(label)]|", options: [], metrics: nil, views: viewsDictionary))
}
```

Note that we're using string interpolation to put the key ("label1", etc) into the VFL.

Let's eliminate the easy stuff, then focus on what remains.

- `view.addConstraints()`: this adds an array of constraints to our view controller's view. This array is used rather than a single constraint because VFL can generate multiple constraints at a time.
- `NSLayoutConstraint.constraints(withVisualFormat:)` is the Auto Layout method that converts VFL into an array of constraints. It accepts lots of parameters, but the important ones are the first and last.
- We pass `[]` (an empty array) for the options parameter and `nil` for the metrics parameter. You can use these options to customize the meaning of the VFL, but for now we don't care.

That's the easy stuff. So, let's look at the Visual Format Language itself: `"H:|[label1]|"`. As you can see it's a string, and that string describes how we want the layout to look. That VFL gets converted into Auto Layout constraints, then added to the view.

The `H:` parts means that we're defining a horizontal layout; we'll do a vertical layout soon. The pipe symbol, |, means "the edge of the view." We're adding these constraints to the main view inside our view controller, so this effectively means "the edge of the view controller." Finally, we have `[label1]`, which is a visual way of saying "put `label1` here". Imagine the brackets, [ and ], are the edges of the view.

So, `"H:|[label1]|"` means "horizontally, I want my `label1` to go edge to edge in my view." But there's a hiccup: what is "label1"? Sure, *we* know what it is because it's the name of our variable, but variable names are just things for humans to read and write - the variable names aren't actually saved and used when the program runs.

This is where our `viewsDictionary` dictionary comes in: we used strings for the key and `UILabels` for the value, then set "label1" to be our label. This dictionary gets passed in along with the VFL, and gets used by iOS to look up the names from the VFL. So when it sees `[label1]`, it looks in our dictionary for the "label1" key and uses its value to generate the Auto Layout constraints.

That's the entire VFL line explained: each of our labels should stretch edge-to-edge in our view. If you run the program now, that's sort of what you'll see, although it highlights our second problem: we don't have a vertical layout in place, so although all the labels sit edge-to-edge in the view, they all overlap.

We're going to fix this with another set of constraints, but this time it's just one (long) line.

```swift
view.addConstraints( NSLayoutConstraint.constraints(withVisualFormat: "V:|[label1]-[label2]-[label3]-[label4]-[label5]", options: [], metrics: nil, views: viewsDictionary))
```

That's identical to the previous five, except for the VFL part. This time we're specifying `V:`, meaning that these constraints are vertical. And we have multiple views inside the VFL, so lots of constraints will be generated. The new thing in the VFL this time is the `-` symbol, which means "space". It's 10 points by default, but you can customize it.

Note that our vertical VFL doesn't have a pipe at the end, so we're not forcing the last label to stretch all the way to the edge of our view. This will leave whitespace after the last label, which is what we want right now.

If you run your program now, you'll see all five labels stretching edge-to-edge horizontally, then spaced neatly vertically. It would have taken quite a lot of <kbd>Ctrl</kbd>-dragging in Interface Builder to make this same layout, so I hope you can appreciate how powerful VFL is!

