---
lang: ko-KR
title: "Invitation only: MCPeerID"
description: "Article(s) > Invitation only: MCPeerID"
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
      content: "Article(s) > Invitation only: MCPeerID"
    - property: og:description
      content: "Invitation only: MCPeerID"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/25/04-invitation-only-mcpeerid.html
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
  "title": "Invitation only: MCPeerID | Hacking with iOS",
  "desc": "Invitation only: MCPeerID",
  "link": "https://hackingwithswift.com/read/25/4/invitation-only-mcpeerid",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/ak4vK2ICg9M" />

Merely by saying that we conform to the `MCSessionDelegate` and `MCBrowserViewControllerDelegate` protocols, your code won't build any more. This is because the two protocols combined have seven required methods that you need to implement just to be compatible.

Helpfully, for this project you can effectively ignore three of them, two more are trivial, and one further is just for diagnostic information in this project. That leaves only one method that is non-trivial and important to the program.

Let's tackle the ones we can effectively ignore. Of course, you can't *ignore* required methods, otherwise they wouldn't be required. But these methods aren't ones that do anything useful to our program, so we can just create empty methods. Remember, once you've said you conform to a protocol, Xcode's code completion is updated so you can just start typing the first few letters of a method name in order to have Xcode prompt you with a list to choose from.

Here are the three methods that we need to provide, but don't actually need any code inside them:

```swift
func session(_ session: MCSession, didReceive stream: InputStream, withName streamName: String, fromPeer peerID: MCPeerID) {

}

func session(_ session: MCSession, didStartReceivingResourceWithName resourceName: String, fromPeer peerID: MCPeerID, with progress: Progress) {

}

func session(_ session: MCSession, didFinishReceivingResourceWithName resourceName: String, fromPeer peerID: MCPeerID, at localURL: URL?, withError error: Error?) {

}
```

They are really long, so make sure you use code completion!

The two methods we're going to implement that are trivial are both for the multipeer browser: one is called when it finishes successfully, and one when the user cancels. Both methods just need to dismiss the view controller that is currently being presented, which means this is their entire code:

```swift
func browserViewControllerDidFinish(_ browserViewController: MCBrowserViewController) {
    dismiss(animated: true)
}

func browserViewControllerWasCancelled(_ browserViewController: MCBrowserViewController) {
    dismiss(animated: true)
}
```

Brilliant! Isn't it easy being a coder?

There are two methods left: one that is used in this project only for diagnostic information, and one that's actually useful. Let's eliminate the diagnostic method first so that we can focus on the interesting bit.

When a user connects or disconnects from our session, the method `session(_:peer:didChangeState:)` is called so you know what's changed - is someone connecting, are they now connected, or have they just disconnected? We're not going to be using this information in the project, but I do want to show you how it might be used by printing out some diagnostics. This is helpful for debugging, because it means you can look in Xcode's debug console to see these messages and know your code is working.

When this method is called, you'll be told what peer changed state, and what their new state is. There are only three possible session states: not connected, connecting, and connected. So, we can make our app print out useful information just by using switch/case and a bit of `print()`:

```swift
func session(_ session: MCSession, peer peerID: MCPeerID, didChange state: MCSessionState) {
    switch state {
    case .connected:
        print("Connected: \(peerID.displayName)")

    case .connecting:
        print("Connecting: \(peerID.displayName)")

    case .notConnected:
        print("Not Connected: \(peerID.displayName)")

    @unknown default:
        print("Unknown state received: \(peerID.displayName)")
    }
}
```

There’s one final case in there to handle any unknown cases that crop up in the future. While we *could* have made one of the other cases handle that using a regular `default` case, in this project none of them really make sense for whatever might occur in the future so I’ve added a dedicated `@unknown default` case to handle future cases.

That just leaves one more method that must be implemented before you're fully compliant with the protocols, but before I talk you through it you need to know how the core of this app works. It's not hard, but it is important, so listen carefully!

Right now, when we add a picture to the collection view it is shown on our screen but doesn't go anywhere. We're going to add some code to the image picker's `didFinishPickingMediaWithInfo` method so that when an image is added it also gets sent out to peers.

Sending images across a multipeer connection is remarkably easy. In project 10 we used the function `jpegData()` to convert a `UIImage` object into a `Data` so it can be saved to disk, and here we’ll be using `pngData()` that does the same thing with the PNG image format. Once we have that, `MCSession` objects have a `sendData()` method that will ensure that data gets transmitted reliably to your peers.

Once the data arrives at each peer, the method `session(_:didReceive:fromPeer:)` will get called with that data, at which point we can create a `UIImage` from it and add it to our `images` array. There is one catch: when you receive data it might not be on the main thread, and you never manipulate user interfaces anywhere but the main thread, right? Right.

Here's the final protocol method, to catch data being received in our session:

```swift
func session(_ session: MCSession, didReceive data: Data, fromPeer peerID: MCPeerID) {
    DispatchQueue.main.async { [weak self] in    
        if let image = UIImage(data: data) {
            self?.images.insert(image, at: 0)
            self?.collectionView.reloadData()
        }
    }
}
```

Take note of the call to `async()` to ensure we definitely only manipulate the user interface on the main thread!

The final piece of code to finish up this whole project is the bit that sends image data to peers. This is so easy you might not even believe me. In fact, the code is only as long as it is because there's some error checking in there.

This final code needs to:

1. Check if we have an active session we can use.
2. Check if there are any peers to send to.
3. Convert the new image to a `Data` object.
4. Send it to all peers, ensuring it gets delivered.
5. Show an error message if there's a problem.

Converting that into code, you get the below. Put this into your `didFinishPickingMediaWithInfo` method, just after the call to `reloadData()`:

```swift
// 1
guard let mcSession = mcSession else { return }

// 2
if mcSession.connectedPeers.count > 0 {
    // 3
    if let imageData = image.pngData() {
        // 4
        do {
            try mcSession.send(imageData, toPeers: mcSession.connectedPeers, with: .reliable)
        } catch {
            // 5
            let ac = UIAlertController(title: "Send error", message: error.localizedDescription, preferredStyle: .alert)
            ac.addAction(UIAlertAction(title: "OK", style: .default))
            present(ac, animated: true)
        }
    }
}
```

Yes, the code to ensure data gets sent intact to all peers, as opposed to having some parts lost in the ether, is just to use transmission mode `.reliable` - nothing more.

It’s possible that sending data might throw errors, so we need to surround our code in a `do/catch` block as shown above. When any error is thrown in the `do` block, Swift immediately jumps straight to the `catch` block where you can handle it - or in our case show a message. Swift automatically creates an `error` constant telling you what went wrong.

Anyway, I hope you'll agree that the multipeer connectivity framework is super easy to use. The advertiser assistant takes care of telling the world that our app is looking for connections, as well as handling people who want to join. The browser controller takes care of finding all compatible sessions, and sending invitations. Our job is just to hook it all together with a nice user interface, then relax and wait for the App Store riches to come in. Sort of.

Remember: to test your project, you'll need to either run it on multiple devices, or use one device and one simulator.

