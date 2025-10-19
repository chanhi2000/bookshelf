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
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/08/01-setting-up.html
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
  "link": "https://hackingwithswift.com/read/8/1/setting-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/4rRktNrZm4g" />

This is one of the last games you'll be making with UIKit; almost every game after this one will use Apple's SpriteKit framework for high-performance 2D drawing.

We’re going to be making a word game based on the popular indie game 7 Little Words. Users are going to see a list of hints and an array of buttons with different letters on, and need to use those buttons to enter words matching the hints.

Of course I’ll also be using this project to teach lots of important concepts, in particular how to use Auto Layout to create user interfaces entirely in code - no storyboard needed. Being able to use storyboards is a great skill, and being able to create user interfaces in code is also a great skill. Best of all, though, is knowing how to do both, so you can pick whichever works best on a case-by-case basis.

I should warn you ahead of time: although creating UI in code isn’t hard, it does take a lot of time. As you’ll see I encourage you to run your code regularly so you can see the parts come together, because otherwise this can feel endless!

Anyway, enough chat: go ahead and create a new Single View App project in Xcode, name it Project8, then save it somewhere. Now go to the project editor and change its device from Universal to iPad, because we’re going to need all the space we can get!

What's that? You don't know where the project editor is? I'm sure I told you to remember where the project editor was! OK, here's how to find it, one last time, quoted from project 6:

*Press <kbd>Cmd</kbd>+<kbd>1</kbd> to show the project navigator on the left of your Xcode window, select your project (it's the first item in the pane), then to the right of where you just clicked will appear another pane showing "PROJECT" and "TARGETS", along with some more information in the center. The left pane can be hidden by clicking the disclosure button in the top-left of the project editor, but hiding it will only make things harder to find, so please make sure it's visible!*

*This view is called the project editor, and contains a huge number of options that affect the way your app works. You'll be using this a lot in the future, so remember how to get here! Select Project 6 under TARGETS, then choose the General tab, and scroll down until you see four checkboxes called Device Orientation. You can select only the ones you want to support.*

Obviously now that we’re in project 8, you should look for Project 8 under “TARGETS”, otherwise all that still applies.

