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
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/31/01-setting-up.html
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
  "link": "https://hackingwithswift.com/read/31/1/setting-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

If you’ve read from the introduction to here you’re now a fairly competent iOS developer. You’ve learned a lot about the Swift language, but also UIKit, SpriteKit, Auto Layout, MapKit, iBeacons, Core Graphics, Core Image and more all from scratch, using incremental learning and real projects to make the experience fun and productive.

At this point, the pace changes a little. I’d still encourage you to follow the projects in sequence, but for these final projects I no longer enforce a strict app-game-technique series. Instead, the goal is to try to fill in the gaps: some things I missed earlier because they were complicated, some things I missed and I wanted to add based on reader feedback, but quite a few things got added by Apple after I wrote the first 30 projects. These final projects aim will really help round out your knowledge.

Now for the important stuff: what are we going to build? Well, we’re going to start with two great new features first seen in iOS 9: `UIStackView` and iPad multitasking. Both of these are stand out technologies in iOS 9, and, remarkably, both are so easy to adopt that we can make this entire project in about 20 minutes. We're also going to touch on Size Classes briefly for the first time, so there's a lot to learn.

The project itself is called Multibrowser, and it shows one or more web views that the user can simultaneously browse. So, you could have one pane with live sports results, one pane with the latest news, and another on Reddit - just like Safari tabs, except they are all visible at the same time.

Please go ahead and create a new project in Xcode, choosing the Single View App template. Name it Project31, then choose Swift for your language. When the project is created, use the project editor so that it’s iPad-only - multitasking is only available as an iPad feature.

