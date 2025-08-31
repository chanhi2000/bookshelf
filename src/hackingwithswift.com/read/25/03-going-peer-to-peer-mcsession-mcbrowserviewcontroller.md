---
lang: ko-KR
title: "Going peer to peer: MCSession, MCBrowserViewControll"
description: "Article(s) > Going peer to peer: MCSession, MCBrowserViewControll"
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
      content: "Article(s) > Going peer to peer: MCSession, MCBrowserViewControll"
    - property: og:description
      content: "Going peer to peer: MCSession, MCBrowserViewControll"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/25/03-going-peer-to-peer-mcsession-mcbrowserviewcontroller.html
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
  "title": "Going peer to peer: MCSession, MCBrowserViewControll | Hacking with iOS",
  "desc": "Going peer to peer: MCSession, MCBrowserViewControll",
  "link": "https://hackingwithswift.com/read/25/3/going-peer-to-peer-mcsession-mcbrowserviewcontroller",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/p_8TRJAoevA" />

The next step is to add a left bar button item to our view controller, using the "add" system icon, and making it call a method called `showConnectionPrompt()`. We're going to make that method ask users whether they want to connect to an existing session with other people, or whether they want to create their own. Here's the code for the bar button item - put this in `viewDidLoad()`:

```swift
navigationItem.leftBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(showConnectionPrompt))
```

Asking users to clarify how they want to take an action is of course the purpose of `UIAlertController` as an action sheet, and our `showConnectionPrompt()` method is going to use one to ask users what kind of connection they want to make. Put this code into your view controller:

```swift
@objc func showConnectionPrompt() {
    let ac = UIAlertController(title: "Connect to others", message: nil, preferredStyle: .alert)
    ac.addAction(UIAlertAction(title: "Host a session", style: .default, handler: startHosting))
    ac.addAction(UIAlertAction(title: "Join a session", style: .default, handler: joinSession))
    ac.addAction(UIAlertAction(title: "Cancel", style: .cancel))
    present(ac, animated: true)
}
```

Now, here's where it gets trickier. Multipeer connectivity requires four new classes:

1. `MCSession` is the manager class that handles all multipeer connectivity for us.
2. `MCPeerID` identifies each user uniquely in a session.
3. `MCAdvertiserAssistant` is used when creating a session, telling others that we exist and handling invitations.
4. `MCBrowserViewController` is used when looking for sessions, showing users who is nearby and letting them join.

We're going to use all four of them in our app, but only three need to be properties.

Start by importing the multipeer framework:

```swift
import MultipeerConnectivity
```

Now add these to your view controller:

```swift
var peerID = MCPeerID(displayName: UIDevice.current.name)
var mcSession: MCSession?
var mcAdvertiserAssistant: MCAdvertiserAssistant?
```

Although both the session and advertiser assistant are optional, that code creates the `MCPeerID` up front using the name of the current device, which will usually be something like "Paul's iPhone" - there’s no need to make an optional for that.

Depending on what users select in our alert controller, we need to call one of two methods: `startHosting()` or `joinSession()`. Because both of these are coming from the result of a `UIAction` being tapped, both methods must accept a `UIAlertAction` as their only parameter.

Before I show you the code to get multipeer connectivity up and running, I want to go over what they will do. Most important of all is that all multipeer services on iOS must declare a service type, which is a 15-digit string that uniquely identify your service. Those 15 digits can contain only the letters A-Z, numbers and hyphens, and it's usually preferred to include your company in there somehow.

Apple's example is, "a text chat app made by ABC company could use the service type `abc-txtchat`"; for this project I'll be using `hws-project25`.

This service type is used by both `MCAdvertiserAssistant` and `MCBrowserViewController` to make sure your users only see other users of the same app. They both also want a reference to your `MCSession` instance so they can take care of connections for you.

We're going to start by initializing our `MCSession` so that we're able to make connections. Put this code into `viewDidLoad()`:

```swift
mcSession = MCSession(peer: peerID, securityIdentity: nil, encryptionPreference: .required)
mcSession?.delegate = self
```

Our peer ID is used to create the session, along with the encryption option of `.required` to ensure that any data transferred is kept safe.

Don't worry about conforming to any extra protocols just yet; we'll do that in just a minute.

At this point, the code for `startHosting()` and `joinSession()` will look quite trivial. Here goes:

```swift
func startHosting(action: UIAlertAction) {
    guard let mcSession = mcSession else { return }
    mcAdvertiserAssistant = MCAdvertiserAssistant(serviceType: "hws-project25", discoveryInfo: nil, session: mcSession)
    mcAdvertiserAssistant?.start()
}

func joinSession(action: UIAlertAction) {
    guard let mcSession = mcSession else { return }
    let mcBrowser = MCBrowserViewController(serviceType: "hws-project25", session: mcSession)
    mcBrowser.delegate = self
    present(mcBrowser, animated: true)
}
```

We're making our view controller the delegate of a second object, so that's two protocols we need to conform to in order to fix our current compile failures. Easily done: add `MCSessionDelegate` and `MCBrowserViewControllerDelegate` to your class definition… and now there are even more errors, because we need to implement lots of new methods.

