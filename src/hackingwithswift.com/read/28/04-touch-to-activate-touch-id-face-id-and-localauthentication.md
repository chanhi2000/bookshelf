---
lang: ko-KR
title: "Touch to activate: Touch ID, Face ID and LocalAuthentication"
description: "Article(s) > Touch to activate: Touch ID, Face ID and LocalAuthentication"
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
      content: "Article(s) > Touch to activate: Touch ID, Face ID and LocalAuthentication"
    - property: og:description
      content: "Touch to activate: Touch ID, Face ID and LocalAuthentication"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/28/04-touch-to-activate-touch-id-face-id-and-localauthentication.html
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
  "title": "Touch to activate: Touch ID, Face ID and LocalAuthentication | Hacking with iOS",
  "desc": "Touch to activate: Touch ID, Face ID and LocalAuthentication",
  "link": "https://hackingwithswift.com/read/28/4/touch-to-activate-touch-id-face-id-and-localauthentication",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/RMst1BtMTcE" />

Touch ID and Face ID are part of the Local Authentication framework, and our code needs to do three things:

1. Check whether the device is capable of supporting biometric authentication - that the hardware is available and is configured by the user.
2. If so, request that the biometry system begin a check now, giving it a string containing the reason why we're asking. For Touch ID the string is written in code; for Face ID the string is written into our Info.plist file.
3. If we get success back from the authentication request it means this is the device's owner so we can unlock the app, otherwise we show a failure message.

One caveat that you must be careful of: when we're told whether Touch ID/Face ID was successful or not, it might not be on the main thread. This means we need to use `async()` to make sure we execute any user interface code on the main thread.

The job of task 1 is done by the `canEvaluatePolicy()` method of the `LAContext` class, requesting the security policy type `.deviceOwnerAuthenticationWithBiometrics`. The job of task 2 is done by the `evaluatePolicy()` of that same class, using the same policy type, but it accepts a trailing closure telling us the result of the policy evaluation: was it successful, and if not what was the reason?

Like I said, all this is provided by the Local Authentication framework, so the first thing we need to do is import that framework. Add this above `import UIKit`:

```swift
import LocalAuthentication
```

And now here's the new code for the `authenticateTapped()` method. We already walked through what it does, so this shouldn't be too surprising:

```swift
@IBAction func authenticateTapped(_ sender: Any) {
    let context = LAContext()
    var error: NSError?

    if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
        let reason = "Identify yourself!"

        context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) {
            [weak self] success, authenticationError in

            DispatchQueue.main.async {
                if success {
                    self?.unlockSecretMessage()
                } else {
                    // error
                }
            }
        }
    } else {
        // no biometry
    }
}
```

There is one important new piece of syntax in there that we haven’t used before, which is `&error`. The LocalAuthentication framework uses the Objective-C approach to reporting errors back to us, which is where the `NSError` type comes from - where Swift likes to have an enum that conforms to the `Error` protocol, Objective-C had a dedicated `NSError` type for handling errors.

Here, though, we want LocalAuthentication to tell *us* what went wrong, and it can’t do that by returning a value from the `canEvaluatePolicy()` method - that already returns a Boolean telling us whether biometric authentication is available or not. So, instead what we use is the Objective-C equivalent of Swift’s `inout` parameters: we pass an empty `NSError` variable into our call to `canEvaluatePolicy()`, and if an error occurs that error will get filled with a real `NSError` instance telling us what went wrong.

Objective-C’s equivalent to `inout` is what’s called a *pointer*, so named because it effectively points to a place in memory where something exists rather us passing around the actual value instead. If we had passed `error` into the method, it would mean “here’s the error you should use.” By passing in `&error` - Objective-C’s equivalent of `inout` - it means “if you hit an error, here’s the place in memory where you should store that error so I can read it.”

I hope you can now see this is another example of why Swift was such a leap forward compared to Objective-C - having to pass around pointers to things wasn’t terribly pleasant!

Apart from that, there are a couple of reminders: we need `[weak self]` inside the first closure but not the second because it's already weak by that point. You also need to use `self?.` inside the closure to make capturing clear. Finally, you must provide a reason why you want Touch ID/Face ID to be used, so you might want to replace mine ("Identify yourself!") with something a little more descriptive.

You can see the “Identify yourself!” string in our code, which will be shown to Touch ID users. Face ID is handled slightly differently - open Info.plist, then add a new key called “Privacy - Face ID Usage Description”. This should contain similar text to what you use with Touch ID, so give it the value “Identify yourself!”.

That's enough to get basic biometric authentication working, but there are error cases you need to catch. For example, you’ll hit problems if the device does not have biometric capability or it isn’t configured. Similarly, you’ll get an error if the user failed authentication, which might be because their fingerprint or face wasn't scanning for whatever reason, but also if the system has to cancel scanning for some reason.

To catch authentication failure errors, replace the `// error` comment with this:

```swift
let ac = UIAlertController(title: "Authentication failed", message: "You could not be verified; please try again.", preferredStyle: .alert)
ac.addAction(UIAlertAction(title: "OK", style: .default))
self.present(ac, animated: true)
```

We also need to show an error if biometry just isn't available, so replace the `// no Touch ID` comment with this:

```swift
let ac = UIAlertController(title: "Biometry unavailable", message: "Your device is not configured for biometric authentication.", preferredStyle: .alert)
ac.addAction(UIAlertAction(title: "OK", style: .default))
self.present(ac, animated: true)
```

That completes the authentication code, so go ahead and try running the app now. If you’re using a physical device your regular Touch ID / Face ID should work just fine, but if you’re using the Simulator there are useful options under the Hardware menu - go to Hardware > Touch ID/Face ID > Toggle Enrolled State to opt in to biometric authentication, then use Hardware > Touch ID/Face ID > Matching Touch/Face when you’re asked for a fingerprint/face.

