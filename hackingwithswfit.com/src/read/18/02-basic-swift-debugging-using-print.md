---
lang: ko-KR
title: "Basic Swift debugging using print()"
description: "Article(s) > Basic Swift debugging using print()"
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
      content: "Article(s) > Basic Swift debugging using print()"
    - property: og:description
      content: "Basic Swift debugging using print()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/18/02-basic-swift-debugging-using-print.html
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
  "title": "Basic Swift debugging using print() | Hacking with iOS",
  "desc": "Basic Swift debugging using print()",
  "link": "https://hackingwithswift.com/read/18/2/basic-swift-debugging-using-print",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/tbFO8DsJ6aw" />

We're going to start with the absolute easiest debugging technique, which is the `print()` function. This prints a message into the Xcode debug console that can say anything you want, because users won't see it in the UI. The "scattershot" approach to bug fixing is to litter your code with calls to `print()` then follow the messages to see what's going on.

You'll meet lots of people telling you how bad this is, but the truth is it's the debugging method everyone starts with - it's easy, it's natural, and it often gives you enough information to solve your problem. Use it with Swift's string interpolation to see the contents of your variables when your app is running.

We’ve used `print()` several times already, always in its most basic form:

```swift
print("I'm inside the viewDidLoad() method!")
```

By adding calls like that to your various methods, you can see exactly how your program flowed. 

However, `print()` is actually a bit more complicated behind the scenes. For example, you can actually pass it lots of values at the same time, and it will print them all:

```swift
print(1, 2, 3, 4, 5)
```

That makes `print()` a variadic function, which you learned about previously. Here, though, it’s worth adding that `print()`’s variadic nature becomes much more useful when you use its optional extra parameters: `separator` and `terminator`.

The first of these, `separator`, lets you provide a string that should be placed between every item in the `print()` call. Try running this code:

```swift
print(1, 2, 3, 4, 5, separator: "-")
```

That should print “1-2-3-4-5”, because the `separator` parameter is used to split up each item passed into `print()`.

The second optional parameter, `terminator`, is what should be placed after the final item. It’s `\n` by default, which you should remember means “line break”. If you don’t want `print()` to insert a line break after every call, just write this:

```swift
print("Some message", terminator: "")
```

Notice how you don’t need to specify `separator` if you don’t want to.

