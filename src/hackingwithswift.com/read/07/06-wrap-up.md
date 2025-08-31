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
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/07/06-wrap-up.html
next: /hackingwithswift.com/read/08/overview.md
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
  "link": "https://hackingwithswift.com/read/7/6/wrap-up",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/utUpNqglZGs" />

As your Swift skill increases, I hope you're starting to feel the balance of these projects move away from explaining the basics and toward presenting and dissecting code. 

In this project you learned how to download JSON using Swift’s Data type, then use the Codable protocol to convert that data into Swift objects we defined. Working with JSON is something you're going to be doing time and time again in your Swift career, and you've cracked it in about an hour of work - while also learning about `UITabBarController`, `UIStoryboard`, and more.

Good job!

---

## Review what you learned

Anyone can sit through a tutorial, but it takes actual work to remember what was taught. It’s my job to make sure you take as much from these tutorials as possible, so I’ve prepared a short review to help you check your learning.

```component VPCard
{
  "title": "Review - Project 7: Whitehouse Petitions - Hacking with Swift",
  "desc": "Interactive tests that help gauge your progress learning Swift",
  "link": "https://hackingwithswift.com/review/hws/project-7-whitehouse-petitions",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

---

## Challenge

One of the best ways to learn is to write your own code as often as possible, so here are three ways you should try extending this app to make sure you fully understand what’s going on:

1. Add a Credits button to the top-right corner using `UIBarButtonItem`. When this is tapped, show an alert telling users the data comes from the We The People API of the Whitehouse.
2. Let users filter the petitions they see. This involves creating a second array of filtered items that contains only petitions matching a string the user entered. Use a `UIAlertController` with a text field to let them enter that string. This is a tough one, so I’ve included some hints below if you get stuck.
3. Experiment with the HTML - this isn’t a HTML or CSS tutorial, but you can find lots of resources online to give you enough knowledge to tinker with the layout a little.

---

## Hints

It is *vital* to your learning that you try the challenges above yourself, and not just for a handful of minutes before you give up.

Every time you try something wrong, you learn that it’s wrong and you’ll remember that it’s wrong. By the time you find the *correct* solution, you’ll remember it much more thoroughly, while also remembering a lot of the wrong turns you took.

This is what I mean by “there is no learning without struggle”: if something comes easily to you, it can go just as easily. But when you have to really mentally fight for something, it will stick much longer.

But if you’ve already worked hard at the challenges above and are still struggling to implement them, I’m going to write some hints below that should guide you to the correct answer.

**If you ignore me and read these hints without having spent at least 30 minutes trying the challenges above, the only person you’re cheating is yourself.**

Still here? OK. The second challenge here is to let users filter the petitions they see. To solve this you need to do a number of things:

1. Have one property to store all petitions, and one to store filtered petitions. This means the user can filter the petitions several times and you don’t have to keep redownloading your JSON.
2. At first your filtered petitions array will be the same as the main petitions array, so just assign one to the other when your data is ready.
3. Your table view should load all its data from the filtered petitions array.
4. You’ll need a bar button item to show an alert controller that the user can type into.
5. Once that’s done, go through all the items in your petitions array, adding any you want to the filtered petition.

The important part here is the last one: how do you decide whether a petition matches the user’s search? One option is to use `contains()` to check whether the petition title or body text contains the user’s search string - try it and see how you get on!

