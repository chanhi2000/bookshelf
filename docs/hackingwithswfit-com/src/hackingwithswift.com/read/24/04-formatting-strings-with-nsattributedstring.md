---
lang: ko-KR
title: "Formatting strings with NSAttributedString"
description: "Article(s) > Formatting strings with NSAttributedString"
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
      content: "Article(s) > Formatting strings with NSAttributedString"
    - property: og:description
      content: "Formatting strings with NSAttributedString"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/24/04-formatting-strings-with-nsattributedstring.html
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
  "title": "Formatting strings with NSAttributedString | Hacking with iOS",
  "desc": "Formatting strings with NSAttributedString",
  "link": "https://hackingwithswift.com/read/24/4/formatting-strings-with-nsattributedstring",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/xNX45MXsXWc" />

Swift’s strings are plain text, which works fine in the vast majority of cases we work with text. But sometimes we want *more* - we want to be able to add formatting like bold or italics, select from different fonts, or add some color, and for *those* jobs we have a new class called `NSAttributedString`.

Attributed strings are made up of two parts: a plain Swift string, plus a dictionary containing a series of attributes that describe how various segments of the string are formatted. In its most basic form you might want to create one set of attributes that affect the whole string, like this:

```swift
let string = "This is a test string"
let attributes: [NSAttributedString.Key: Any] = [
    .foregroundColor: UIColor.white,
    .backgroundColor: UIColor.red,
    .font: UIFont.boldSystemFont(ofSize: 36)
]

let attributedString = NSAttributedString(string: string, attributes: attributes)
```

It’s common to use an explicit type annotation when making attributed strings, because inside the dictionary we can just write things like `.foregroundColor` for the key rather than `NSAttributedString.Key.foregroundColor`.

The *values* of the attributes dictionary are of type `Any`, because `NSAttributedString` attributes can be all sorts of things: numbers, colors, fonts, paragraph styles, and more.

If you look in the output pane of your playground, you should be able to click on the box next to where it says “This is a test string” to get a live preview of how our string looks - you should see large, white text with a red background.

Of course, we could get the same effect with a regular string placed inside a `UILabel`: change the font and colors, and it would look the same. But what labels *can’t* do is add formatting to different parts of the string.

To demonstrate this we’re going to use `NSMutableAttributedString`, which is an attributed string that you can modify:

```swift
let attributedString = NSMutableAttributedString(string: string)
attributedString.addAttribute(.font, value: UIFont.systemFont(ofSize: 8), range: NSRange(location: 0, length: 4))
attributedString.addAttribute(.font, value: UIFont.systemFont(ofSize: 16), range: NSRange(location: 5, length: 2))
attributedString.addAttribute(.font, value: UIFont.systemFont(ofSize: 24), range: NSRange(location: 8, length: 1))
attributedString.addAttribute(.font, value: UIFont.systemFont(ofSize: 32), range: NSRange(location: 10, length: 4))
attributedString.addAttribute(.font, value: UIFont.systemFont(ofSize: 40), range: NSRange(location: 15, length: 6))
```

When you preview *that* you’ll see the font size get larger with each word - something a regular Swift string certainly can’t do even with help from `UILabel`.

There are lots of formatting options for attributed strings, including:


- Set `.underlineStyle` to a value from `NSUnderlineStyle` to strike out characters.
- Set `.strikethroughStyle` to a value from `NSUnderlineStyle` (no, that’s not a typo) to strike out characters.
- Set `.paragraphStyle` to an instance of `NSMutableParagraphStyle` to control text alignment and spacing.
- Set `.link` to be a `URL` to make clickable links in your strings.

And that’s just a subset of what you can do.

You might be wondering how useful all this knowledge is, but here’s the important part: `UILabel`, `UITextField`, `UITextView`, `UIButton`, `UINavigationBar`, and more all support attributed strings just as well as regular strings. So, for a label you would just use `attributedText` rather than `text`, and UIKit takes care of the rest.

