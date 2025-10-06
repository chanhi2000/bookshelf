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
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/20/05-wrap-up.html
next: /hackingwithswift.com/read/21/overview.md
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
  "link": "https://hackingwithswift.com/read/20/5/wrap-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/id" />

This wasn’t a *complicated* project, although it did involve quite a bit of code because of the various ways fireworks are launched. However, it’s a good example of where particle systems can really bring a game to life - we only have two different types here, but they still do wonders as simple special effects. 

Plus of course you have yet more Swift coding experience under your belt, now complete with `follow()`, `UIBezierPath`, `for case let`, color blending, and, yes, even the shake gesture - although I wouldn't be surprised if you switch to having a button on the screen to make explosions easier!

---

## Review what you learned

Anyone can sit through a tutorial, but it takes actual work to remember what was taught. It’s my job to make sure you take as much from these tutorials as possible, so I’ve prepared a short review to help you check your learning.

```component VPCard
{
  "title": "Review - Project 20: Fireworks Night - Hacking with Swift",
  "desc": "Interactive tests that help gauge your progress learning Swift",
  "link": "https://hackingwithswift.com/review/hws/project-20-fireworks-night",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

:::

---

## Challenge

One of the best ways to learn is to write your own code as often as possible, so here are three ways you should try your new knowledge to make sure you fully understand what’s going on:

1. For an easy challenge try adding a score label that updates as the player’s score changes.
2. Make the game end after a certain number of launches. You will need to use the `invalidate()` method of `Timer` to stop it from repeating.
3. Use the `waitForDuration` and `removeFromParent` actions in a sequence to make sure explosion particle emitters are removed from the game scene when they are finished.

