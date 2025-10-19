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
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/06/06-wrap-up.html
next: /hackingwithswift.com/read/07/overview.md
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
  "link": "https://hackingwithswift.com/read/6/6/wrap-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/z7EvsqDwcT4" />

There are two types of iOS developer in the world: those who use Auto Layout, and people who like wasting time. It has bit of a steep learning curve (and we didn't even use the hard way of adding constraints!), but it's an extremely expressive way of creating great layouts that adapt themselves automatically to whatever device they find themselves running on - now and in the future.

Most people recommend you do as much as you can inside Interface Builder, and with good reason - you can drag lines about until you're happy, you get an instant preview of how it all looks, and it will warn you if there's a problem (and help you fix it.) But, as you've seen, creating constraints in code is remarkably easy thanks to the Visual Format language and anchors, so you might find yourself mixing them all to get the best results.

---

## Review what you learned

Anyone can sit through a tutorial, but it takes actual work to remember what was taught. It’s my job to make sure you take as much from these tutorials as possible, so I’ve prepared a short review to help you check your learning.

```component VPCard
{
  "title": "Review - Project 6: Auto Layout - Hacking with Swift",
  "desc": "Interactive tests that help gauge your progress learning Swift",
  "link": "https://hackingwithswift.com/review/hws/project-6-auto-layout",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

---

## Challenge

One of the best ways to learn is to write your own code as often as possible, so here are three ways you should try extending this app to make sure you fully understand what’s going on:

1. Try replacing the `widthAnchor` of our labels with `leadingAnchor` and `trailingAnchor` constraints, which more explicitly pin the label to the edges of its parent.
2. Once you’ve completed the first challenge, try using the `safeAreaLayoutGuide` for those constraints. You can see if this is working by rotating to landscape, because the labels won’t go under the safe area.
3. Try making the height of your labels equal to 1/5th of the main view, minus 10 for the spacing. This is a hard one, but I’ve included hints below!

---

## Hints

It is *vital* to your learning that you try the challenges above yourself, and not just for a handful of minutes before you give up.

Every time you try something wrong, you learn that it’s wrong and you’ll remember that it’s wrong. By the time you find the *correct* solution, you’ll remember it much more thoroughly, while also remembering a lot of the wrong turns you took.

This is what I mean by “there is no learning without struggle”: if something comes easily to you, it can go just as easily. But when you have to really mentally fight for something, it will stick much longer.

But if you’ve already worked hard at the challenges above and are still struggling to implement them, I’m going to write some hints below that should guide you to the correct answer.

**If you ignore me and read these hints without having spent at least 30 minutes trying the challenges above, the only person you’re cheating is yourself.**

Still here? OK. If you’re stuck on the last challenge, try looking at Xcode’s code completion options for the `constraint()` method. We’re using the `equalToConstant` option right now, but there are others - the `equalTo` option lets you specify another height anchor as its first parameter, along with a multiplier and a constant.

When you use both a multiplier and a constant, the multiplier gets factored in first then the constant. So, if you wanted to make one view half the width of the main view plus 50, you might write something like this:

```swift
yourView.widthAnchor.constraint(equalTo: view.safeAreaLayoutGuide.widthAnchor, multiplier: 0.5, constant: 50).isActive = true
```

