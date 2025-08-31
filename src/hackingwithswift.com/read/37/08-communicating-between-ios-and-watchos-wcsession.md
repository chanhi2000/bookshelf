---
lang: ko-KR
title: "Communicating between iOS and watchOS: WCSession"
description: "Article(s) > Communicating between iOS and watchOS: WCSession"
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
      content: "Article(s) > Communicating between iOS and watchOS: WCSession"
    - property: og:description
      content: "Communicating between iOS and watchOS: WCSession"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/37/08-communicating-between-ios-and-watchos-wcsession.html
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
  "title": "Communicating between iOS and watchOS: WCSession | Hacking with iOS",
  "desc": "Communicating between iOS and watchOS: WCSession",
  "link": "https://hackingwithswift.com/read/37/8/communicating-between-ios-and-watchos-wcsession",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

It's time for something new, and something I've held back from covering in Hacking with Swift because only a small proportion of people have an Apple Watch. So, I'm covering it here only briefly, and only at the very end of the project so that if you don't have an Apple Watch you can just skip on past.

Still here? OK: we're going to upgrade our project so that when your finger moves over the correct card your Apple Watch will gently tap your wrist. The haptic vibration of Apple Watches is so marvelously subtle that no one will have any idea what's happening - the effect is very impressive!

I have good news and bad news. First the good news: for our purposes, communicating between Apple Watch and iOS could not be any easier - it take us maybe five minutes in total to complete the code. Now the bad news: even when the settings are adjusted, your Watch will go to sleep after 70 seconds of inactivity, so it's down you to make sure the app stays awake.

That bad news will make more sense once you're using the finished product, so without further ado let's crack on with development. In <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift` add this new import:

```swift
import WatchConnectivity
```

As you might imagine, the WatchConnectivity framework is responsible for connectivity between iOS apps and watchOS apps, and we'll be using it to send messages between our phone and a Watch. The messages are dictionaries of any data you want, so you can send strings, numbers, arrays and more - it's up to you.

In order to work with a session, we need to check whether it's supported on our current phone, then activate it. Put this code into the `viewDidLoad()` method of <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift`:

```swift
if (WCSession.isSupported()) {
    let session = WCSession.default
    session.delegate = self
    session.activate()
}
```

You'll get an error because the `ViewController` class doesn't conform to the `WCSessionDelegate` protocol, but that's easily fixed:

```swift
class ViewController: UIViewController, WCSessionDelegate {
```

You need to add a few methods to `ViewController` in order to satisfy this new protocol, but all of them can be empty because we don’t actually care about them. Add these three at the end of the class:

```swift
func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {

}

func sessionDidBecomeInactive(_ session: WCSession) {

}

func sessionDidDeactivate(_ session: WCSession) {

}
```

(Note: if you were wondering, you can’t call `activate()` on a session without a delegate. We don’t actually use any of the delegate methods, but we still need to assign a delegate!)

Sending a message from a phone to a watch is trivial, like I said, but there is one small piece of complexity: if we want the watch to buzz every time it receives a message (spoiler: that's exactly what we want), we need a way to rate limit those messages. That is, we don't want to send 100 messages a second when the user is touching the right card, because it would make your watch go nuts.

To solve this problem, we're going to add a new property that tracks when the last watch message was sent. This way, we can avoid sending a message to the watch if there was one sent very recently - i.e., less than about half a second ago.

Add this property to the class:

```swift
var lastMessage: CFAbsoluteTime = 0
```

If you were wondering, `CFAbsoluteTime` is actually just a `Double` behind the scenes. We can get the current time using a function called `CFAbsoluteTimeGetCurrent()`, which returns the number of seconds that have passed since midnight on January 1st 2001. Yes, that's a rather random date, but it doesn't matter: all we care about is the time since our previous call.

Sending a message from the app to the watch is done in two parts. First, we need to check whether the watch is reachable, which in practice means "is our Apple Watch app running and in the foreground?" Second, we need to use the `sendMessage()` method of `WCSession` to send a dictionary of data. It doesn't matter what data we send, because in our app *any* data will be interpreted as "please buzz."

Keeping in mind the need to rate limit these calls, here's a new method for the `ViewController` class:

```swift
func sendWatchMessage() {
    let currentTime = CFAbsoluteTimeGetCurrent()

    // if less than half a second has passed, bail out
    if lastMessage + 0.5 > currentTime {
        return
    }

    // send a message to the watch if it's reachable
    if (WCSession.default.isReachable) {
        // this is a meaningless message, but it's enough for our purposes
        let message = ["Message": "Hello"]
        WCSession.default.sendMessage(message, replyHandler: nil)
    }

    // update our rate limiting property
    lastMessage = CFAbsoluteTimeGetCurrent()
}
```

With that new method in place we can call it inside `touchesMoved()` by adding this code at the end of the `contains()` condition:

```swift
if card.isCorrect {
    sendWatchMessage()
}
```

Just in case you're not sure where I mean, here's how the complete `touchesMoved()` method should look:

```swift
override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesMoved(touches, with: event)

    guard let touch = touches.first else { return }
    let location = touch.location(in: cardContainer)

    for card in allCards {
        if card.view.frame.contains(location) {
            if view.traitCollection.forceTouchCapability == .available {
                if touch.force == touch.maximumPossibleForce {
                    card.front.image = UIImage(named: "cardStar")
                    card.isCorrect = true
                }
            }

            // here's the new code!
            if card.isCorrect {
                sendWatchMessage()
            }
        }
    }
}
```

And that's it. Yes, that's all the code it takes to send data from our iOS app to an Apple Watch. Of course, the app won't do anything yet because sending data isn't enough: we need to write code to *receive* it and do something interesting.

