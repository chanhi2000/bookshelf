---
lang: ko-KR
title: "Acting on responses"
description: "Article(s) > Acting on responses"
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
      content: "Article(s) > Acting on responses"
    - property: og:description
      content: "Acting on responses"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/21/03-acting-on-responses.html
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
  "title": "Acting on responses | Hacking with iOS",
  "desc": "Acting on responses",
  "link": "https://hackingwithswift.com/read/21/3/acting-on-responses",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/t0l0-Kx_4l0" />

There’s a lot more you can do with notifications, but chances are the thing you *most* want to do is act on the user’s response - to show one or more options alongside your alert, then respond to the user’s choice.

We already set the `categoryIdentifier` property for our notification, which is a text string that identifies a type of alert. We can now use that same text string to create buttons for the user to choose from, and iOS will show them when any notifications of that type are shown.

This is done using two new classes: `UNNotificationAction` creates an individual button for the user to tap, and `UNNotificationCategory` groups multiple buttons together under a single identifier.

For this technique project we’re going to create one button, “Show me more…”, that will cause the app to launch when tapped. We’re also going to set the `delegate` property of the user notification center to be `self`, meaning that any alert-based messages that get sent will be routed to our view controller to be handled.

Creating a `UNNotificationAction` requires three parameters:

1. An identifier, which is a unique text string that gets sent to you when the button is tapped.
2. A title, which is what user’s see in the interface.
3. Options, which describe any special options that relate to the action. You can choose from `.authenticationRequired`, `.destructive`, and `.foreground`.

Once you have as many actions as you want, you group them together into a single `UNNotificationCategory` and give it the same identifier you used with a notification.

That’s it! Add this method to `ViewController` now:

```swift
func registerCategories() {
    let center = UNUserNotificationCenter.current()
    center.delegate = self

    let show = UNNotificationAction(identifier: "show", title: "Tell me more…", options: .foreground)
    let category = UNNotificationCategory(identifier: "alarm", actions: [show], intentIdentifiers: [])

    center.setNotificationCategories([category])
}
```

You might have noticed the empty `intentIdentifiers` parameter in the category initializer - this is used to connect your notifications to intents, if you have created any.

You’ll get an error because you assigned `self` to be the delegate of the user notification center. To fix it, make the `ViewController` class conform to `UNUserNotificationCenterDelegate` like this:

```swift
class ViewController: UIViewController, UNUserNotificationCenterDelegate {
```

You can call `registerCategories()` wherever you want, but in this project the safest place is probably right at the beginning of the `scheduleLocal()` method.

Now that we have registered the “alarm” category with a single button, the last thing to do is implement the `didReceive` method for the notification center. This is triggered on our view controller because we’re the center’s delegate, so it’s down to us to decide how to handle the notification.

We attached some customer data to the `userInfo` property of the notification content, and this is where it gets handed back - it’s your chance to link the notification to whatever app content it relates to.

When the user acts on a notification  you can read its `actionIdentifier` property to see what they did. We have a single button with the “show” identifier, but there’s also `UNNotificationDefaultActionIdentifier` that gets sent when the user swiped on the notification to unlock their device and launch the app.

So: we can pull out our user info then decide what to do based on what the user chose. The method also accepts a completion handler closure that you should call once you’ve finished doing whatever you need to do. This might be much later on, so it’s marked with the `@escaping` keyword.

Here’s the code - add this method to `ViewController` now:

```swift
func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    // pull out the buried userInfo dictionary
    let userInfo = response.notification.request.content.userInfo

    if let customData = userInfo["customData"] as? String {
        print("Custom data received: \(customData)")

        switch response.actionIdentifier {
        case UNNotificationDefaultActionIdentifier:
            // the user swiped to unlock
            print("Default identifier")

        case "show":
            // the user tapped our "show more info…" button
            print("Show more information…")

        default:
            break
        }
    }

    // you must call the completion handler when you're done
    completionHandler()
}
```

Our project now creates notifications, attaches them to categories so you can create action buttons, then responds to whichever button was tapped by the user - we’re done!

