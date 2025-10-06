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
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/21/04-wrap-up.html
next: /hackingwithswift.com/read/22/overview.md
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
  "link": "https://hackingwithswift.com/read/21/4/wrap-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/iAMuDXSi2Cc" />

That was easy, right? And yet it's such a great feature to have, because now your app can talk to users even when it isn't running. You want to show a step count for how far they've walked? Use a notification. You want to trigger an alert because it's their turn to play in a game? Use a notification. You want to send them marketing messages to make them buy more stuff? Actually, just don't do that, you bad person.

We’ve only scratched the surface of what notifications can do, but if you’d like to explore more advanced topics - such as attaching pictures or letting the user type responses rather than tapping buttons - see my book [<VPIcon icon="fas fa-globe"/>Advanced iOS: Volume One](https://gum.co/advanced-ios-1).

We’ll be coming back to notifications again in project 33, where CloudKit is used to create and deliver remote notifications when server data has changed.

---

## Review what you learned

Anyone can sit through a tutorial, but it takes actual work to remember what was taught. It’s my job to make sure you take as much from these tutorials as possible, so I’ve prepared a short review to help you check your learning.

```component VPCard
{
  "title": "Review - Project 21: Local Notifications - Hacking with Swift",
  "desc": "Interactive tests that help gauge your progress learning Swift",
  "link": "https://hackingwithswift.com/review/hws/project-21-local-notifications",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

---

## Challenge

One of the best ways to learn is to write your own code as often as possible, so here are three ways you should try your new knowledge to make sure you fully understand what’s going on:

1. Update the code in `didReceive` so that it shows different instances of `UIAlertController` depending on which action identifier was passed in.
2. For a harder challenge, add a second `UNNotificationAction` to the `alarm` category of project 21. Give it the title “Remind me later”, and make it call `scheduleLocal()` so that the same alert is shown in 24 hours. (For the purpose of these challenges, a time interval notification with 86400 seconds is good enough - that’s roughly how many seconds there are in a day, excluding summer time changes and leap seconds.)
3. And for an even harder challenge, update project 2 so that it reminds players to come back and play every day. This means scheduling a week of notifications ahead of time, each of which launch the app. When the app is finally launched, make sure you call `removeAllPendingNotificationRequests()` to clear any un-shown alerts, then make new alerts for future days.

