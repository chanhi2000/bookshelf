---
lang: ko-KR
title: "Setting up"
description: "Article(s) > Setting up"
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
      content: "Article(s) > Setting up"
    - property: og:description
      content: "Setting up"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/34/01-setting-up.html
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
  "title": "Setting up | Hacking with iOS",
  "desc": "Setting up",
  "link": "https://hackingwithswift.com/read/34/1/setting-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

One of the most powerful features Apple introduced in iOS 9 is called GameplayKit. It's a library designed to handle non-drawing game functionality such as artificial intelligence, path finding and randomness, and it is pretty dazzling in its scope, so I was really looking forward to write a tutorial about it.

In this project, we're going to create a Four-in-a-Row (4IR) game, and I'm going to be honest with you: I've cheated a bit. You see, Apple already released some sample code for a 4IR game based on GameplayKit, and it works pretty well.

Why, then, am I choosing to write a tutorial based on it? Well, for some reason known only to Apple, the source code for the project isn't up to their usual standard. Not only is it in Objective-C, but it includes arcane C functions like `memcpy()`, it uses `CABasicAnimation` and `CAShapeLayer` when regular `UIView` functionality would do, and includes a 90-line method to detect wins that can be replaced with code a third that size and easier to understand.

Frustrating things further, this sample code is what's used to document GameplayKit, so you're kind of stuck trying to learn about a very large new technology while studying an unfriendly project, or reading the documentation… that's about the same unfriendly project. I wanted to produce a project that was easier to understand and easier to learn, then produce a tutorial that explained how it all worked.

So, I took the Objective-C code and rewrote it in Swift. I then simplified the structure to make it more useful for learners, renamed some methods to make more sense, then cleaned up the user interface. Where it wasn't too strange I have tried to keep Apple's original structure, so if you choose to check out their original source code you won't be too lost - look for FourInARow in the Apple sample code. I accept any and all blame for bugs introduced in the Swift conversion process!

You might well say, "well, if you didn't like the 4IR game, how about Apple's DemoBots sample code? That's really cool, and it uses GameplayKit!" Yes, it does use GameplayKit. But it's also made up of 84 Swift files, 6,952 images, 14 SKS files for effects and scenes, and a custom shader. Cool: yes. Easy to learn from: not really. By all means download it, but this tutorial is aimed at people just getting started with GameplayKit.

So, please go ahead and create a new project in Xcode, choosing the Single View App template. Name it Project34, and choose Swift for your language. When it's created, please lock the app orientation to landscape and set it to be iPad-only.

