---
lang: ko-KR
title: "Why is locking the UI bad?"
description: "Article(s) > Why is locking the UI bad?"
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
      content: "Article(s) > Why is locking the UI bad?"
    - property: og:description
      content: "Why is locking the UI bad?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/09/02-why-is-locking-the-ui-bad.html
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
  "title": "Why is locking the UI bad? | Hacking with iOS",
  "desc": "Why is locking the UI bad?",
  "link": "https://hackingwithswift.com/read/9/2/why-is-locking-the-ui-bad",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/tMsa3b9stCY" />

The answer is two-fold. First, we used `Data`'s `contentsOf` to download data from the internet, which is what's known as a *blocking* call. That is, it blocks execution of any further code in the method until it has connected to the server and fully downloaded all the data.

Second, behind the scenes your app actually executes multiple sets of instructions at the same time, which allows it to take advantage of having multiple CPU cores. Each CPU can be doing something independently of the others, which hugely boosts your performance. These code execution processes are called *threads*, and come with a number of important provisos:

1. Threads execute the code you give them, they don't just randomly execute a few lines from `viewDidLoad()` each. This means by default your own code executes on only one CPU, because you haven't created threads for other CPUs to work on.
2. All user interface work must occur on the main thread, which is the initial thread your program is created on. If you try to execute code on a different thread, it might work, it might fail to work, it might cause unexpected results, or it might just crash.
3. You don't get to control when threads execute, or in what order. You create them and give them to the system to run, and the system handles executing them as best it can.
4. Because you don't control the execution order, you need to be extra vigilant in your code to ensure only one thread modifies your data at one time.

Points 1 and 2 explain why our call is bad: if all user interface code must run on the main thread, and we just blocked the main thread by using `Data`'s `contentsOf`, it causes the entire program to freeze - the user can touch the screen all they want, but nothing will happen. When the data finally downloads (or just fails), the program will unfreeze. This is a terrible experience, particularly when you consider that iPhones are frequently on poor-quality data connections.

Broadly speaking, if you’re accessing any remote resource, you should be doing it on a *background thread* - i.e., any thread that is not the main thread. If you're executing any slow code, you should be doing it on a background thread. If you're executing any code that can be run in parallel - e.g. adding a filter to 100 photos - you should be doing it on multiple background threads.

The power of GCD is that it takes away a lot of the hassle of creating and working with multiple threads, known as *multithreading*. You don't have to worry about creating and destroying threads, and you don't have to worry about ensuring you have created the optimal number of threads for the current device. GCD automatically creates threads for you, and executes your code on them in the most efficient way it can.

To fix our project, you need to learn three new GCD functions, but the most important one is called `async()` - it means "run the following code asynchronously," i.e. don't block (stop what I'm doing right now) while it's executing. Yes, that seems simple, but there's a sting in the tail: you need to use closures. Remember those? They are your best friend. No, really.

