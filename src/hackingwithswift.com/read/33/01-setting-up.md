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
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/33/01-setting-up.html
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
  "link": "https://hackingwithswift.com/read/33/1/setting-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

As I write these initial words, I already know this is going to be one of the most expansive and useful Hacking with Swift tutorials to date. We're going to be using CloudKit to load and save user data, we'll read from the microphone using `AVAudioRecorder`, we'll add `UIStackView` and `NSAttributedString` for great layout, and we're going to tie in push messaging for dynamic updates.

This tutorial is going to show you CloudKit to a depth you won't see much elsewhere. Yes, we're going to be loading and saving text data, but we're also going to be loading and saving binary data, registering for updates, and delivering push messages - in short, we're going to be covering the majority of CloudKit in one project, and you'll learn a huge amount along the way. We're even going to be covering the simple and advanced methods of working with CloudKit, because it gives a much better user experience.

As you know, my usual plan is to pick which technologies I want to teach, then strap a real project around it. In this case, the project is called "What's that Whistle?" It's an app where users can whistle or hum into their microphone, and upload it to iCloud. Other users can then download whistles and try to identify what song it's from. This is a genuinely useful app: think how often you know how a song goes but just can't remember its name, and boom: this app is for you. Of course, you could also turn it into a game - who can guess the song first? It's down to you.

To make things more exciting, we'll let users choose which music genres they specialize in, and we'll deliver them a push message whenever a new whistle comes in for that genre. They can then swipe to unlock and launch the app, and start posting suggestions for the song name.

CloudKit is something that was announced back in 2014, but it had some remarkably low limits that made it so unappealing I decided not to write a tutorial about it. Back then, each app got just 25MB per day of data transfer, growing at 0.5MB - yes, half a megabyte - per user per day, which was absurdly low. Since then Apple announced they were raising the limits so that every app now gets 2GB per month plus a further 50MB per user per month. Even better, database transfer is now judged on requests per second rather than an arbitrary data cap.

If you're not aware of what CloudKit does, I'll be going into much more detail later. For now, the least you need to know is that CloudKit lets you send and retrieve remote data for your app, effectively providing a server back-end for your app to talk to. Even better, unless you go over Apple's new generous limits, it's completely free.

::: warning

this project requires an active Apple developer program account, because CloudKit requires iCloud developer access. Although everything except push messaging works great in the simulator, you'll find CloudKit responds much faster on devices so you might find it easier to work from a device the entire time.

:::

Please go ahead and create a new project in Xcode, choosing the Single View App template. Name it Project 33, then choose Swift for your language. Now strap yourself in, because this is going to be awesome…

