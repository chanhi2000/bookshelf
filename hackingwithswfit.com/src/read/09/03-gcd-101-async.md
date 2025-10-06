---
lang: ko-KR
title: "GCD 101: async()"
description: "Article(s) > GCD 101: async()"
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
      content: "Article(s) > GCD 101: async()"
    - property: og:description
      content: "GCD 101: async()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/09/03-gcd-101-async.html
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
  "title": "GCD 101: async() | Hacking with iOS",
  "desc": "GCD 101: async()",
  "link": "https://hackingwithswift.com/read/9/3/gcd-101-async",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/SrWWLx5wOEU" />

We're going to use `async()` twice: once to push some code to a background thread, then once more to push code back to the main thread. This allows us to do any heavy lifting away from the user interface where we don't block things, but then update the user interface safely on the main thread - which is the only place it can be safely updated.

How you call `async()` informs the system where you want the code to run. GCD works with a system of queues, which are much like a real-world queue: they are First In, First Out (FIFO) blocks of code. What this means is that your GCD calls don't create threads to run in, they just get assigned to one of the existing threads for GCD to manage.

GCD creates for you a number of queues, and places tasks in those queues depending on how important you say they are. All are FIFO, meaning that each block of code will be taken off the queue in the order they were put in, but more than one code block can be executed at the same time so the finish order isn't guaranteed.

“How important” some code is depends on something called “quality of service”, or QoS, which decides what level of service this code should be given. Obviously at the top of this is the main queue, which runs on your main thread, and should be used to schedule any work that must update the user interface immediately even when that means blocking your program from doing anything else. But there are four background queues that you can use, each of which has their own QoS level set:

1. User Interactive: this is the highest priority background thread, and should be used when you want a background thread to do work that is important to keep your user interface working. This priority will ask the system to dedicate nearly all available CPU time to you to get the job done as quickly as possible.
2. User Initiated: this should be used to execute tasks requested by the user that they are now waiting for in order to continue using your app. It's not as important as user interactive work - i.e., if the user taps on buttons to do other stuff, that should be executed first - but it is important because you're keeping the user waiting.
3. The Utility queue: this should be used for long-running tasks that the user is aware of, but not necessarily desperate for now. If the user has requested something and can happily leave it running while they do something else with your app, you should use Utility.
4. The Background queue: this is for long-running tasks that the user isn't actively aware of, or at least doesn't care about its progress or when it completes.

Those QoS queues affect the way the system prioritizes your work: User Interactive and User Initiated tasks will be executed as quickly as possible regardless of their effect on battery life, Utility tasks will be executed with a view to keeping power efficiency as high as possible without sacrificing too much performance, whereas Background tasks will be executed with power efficiency as its priority.

GCD automatically balances work so that higher priority queues are given more time than lower priority ones, even if that means temporarily delaying a background task because a user interactive task just came in.

There’s also one more option, which is the default queue. This is prioritized between user-initiated and utility, and is a good general-purpose choice while you’re learning. 

Enough talking, time for some action: we're going to use `async()` to make all our loading code run in the background queue with default quality of service. It's actually only two lines of code different:

```swift
DispatchQueue.global().async {
```

…before the code you want to run in the background, then a closing brace at the end. If you wanted to specify the user-initiated quality of service rather than use the default queue - which is a good choice for this scenario - you would write this instead:

```swift
DispatchQueue.global(qos: .userInitiated).async {
```

The `async()` method takes one parameter, which is a closure to execute asynchronously. We’re using trailing closure syntax, which removes an unneeded set of parentheses.

Because `async()` uses closures, you might think to start with `[weak self] in` to make sure there aren’t any accident strong reference cycles, but it isn’t necessary here because GCD runs the code once then throws it away - it won’t retain things used inside.

To help you place it correctly, here's how the loading code should look:

```swift
DispatchQueue.global(qos: .userInitiated).async {
    if let url = URL(string: urlString) {
        if let data = try? Data(contentsOf: url) {
            self.parse(json: data)
            return
        }
    }
}

showError()
```

Note that because our code is now inside a closure, we need to prefix our method calls with `self.` otherwise Swift complains.

If you want to try the other QoS queues, you could also use `.userInteractive`, `.utility` or `.background`.

