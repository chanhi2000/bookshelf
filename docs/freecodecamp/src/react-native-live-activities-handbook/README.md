---
lang: en-US
title: "The React Native Live Activities Handbook: How to Build iOS Live Activities and Android 16 Live Updates"
description: "Article(s) > The React Native Live Activities Handbook: How to Build iOS Live Activities and Android 16 Live Updates"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Supabase
  - Apple
  - Swift
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - supabase
  - apple
  - swift
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The React Native Live Activities Handbook: How to Build iOS Live Activities and Android 16 Live Updates"
    - property: og:description
      content: "The React Native Live Activities Handbook: How to Build iOS Live Activities and Android 16 Live Updates"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-native-live-activities-handbook/
prev: /programming/js-react/articles/README.md
date: 2026-07-15
isOriginal: false
author:
  - name: Farouq Seriki
    url: https://freecodecamp.org/news/author/Fasthedeveloper/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/542a6607-0c73-4dbf-822e-d72d2325ef7a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Swift > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/swift/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The React Native Live Activities Handbook: How to Build iOS Live Activities and Android 16 Live Updates"
  desc="A Live Activity is the card that sits on your lock screen while a delivery rider approaches, updating itself without you opening the app. Apple shipped the API in iOS 16.1. Google shipped its own vers"
  url="https://freecodecamp.org/news/react-native-live-activities-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/542a6607-0c73-4dbf-822e-d72d2325ef7a.png"/>

A Live Activity is the card that sits on your lock screen while a delivery rider approaches, updating itself without you opening the app. Apple shipped the API in iOS 16.1. Google shipped its own version, called Live Updates, in Android 16. The product requirement is identical on both platforms. The contracts underneath are opposites.

On iOS, [<VPIcon icon="fa-brands fa-apple"/><VPIcon icon="fa-brands fa-google"/>Apple Push Notification service](https://developer.apple.com/documentation/usernotifications/sending-notification-requests-to-apns) (APNs) updates a system-owned SwiftUI widget for you, and your app code never runs. On Android there's no system-managed remote update at all. A data-only [<VPIcon icon="fa-brands fa-google"/>Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) (FCM) message wakes a background service, and your own code re-posts the notification every single time.

In this handbook you'll build both. You'll write one TypeScript API backed by two native implementations: a Swift one that talks to [<VPIcon icon="fa-brands fa-apple"/>ActivityKit](https://developer.apple.com/documentation/activitykit) and a Kotlin one that talks to `NotificationManager`. You'll also write an APNs client and an FCM client from scratch, in about sixty lines each, with no libraries. And you'll learn the silent failure modes that make this API hard, because almost every mistake here produces no error at all.

I built a delivery-tracking demo called DropTrack to work through this. Everything below comes from that build, including a three-device Samsung investigation that ends with a screenshot of a hardcoded allowlist.

---

## Table of Contents

5. [How the iOS Contract Works](#heading-how-the-ios-contract-works)
6. [How to Build the Widget in SwiftUI](#heading-how-to-build-the-widget-in-swiftui)
7. [How to Bridge ActivityKit to JavaScript](#heading-how-to-bridge-activitykit-to-javascript)
8. [Four iOS Gotchas That Cost Me an Evening Each](#heading-four-ios-gotchas-that-cost-me-an-evening-each)
9. [How to Drive iOS From a Server With APNs](#heading-how-to-drive-ios-from-a-server-with-apns)
10. [How to Write an APNs Client From Scratch](#heading-how-to-write-an-apns-client-from-scratch)
11. [How to Test on Real Hardware](#heading-how-to-test-on-real-hardware)
12. [Why Android Has No ActivityKit](#heading-why-android-has-no-activitykit)
13. [How to Build the Kotlin Side](#heading-how-to-build-the-kotlin-side)
14. [How to Drive Android From a Server With FCM](#heading-how-to-drive-android-from-a-server-with-fcm)
15. [Three UX Gaps the Naive Implementation Leaves](#heading-three-ux-gaps-the-naive-implementation-leaves)
16. [How to Script the Simulators and Devices](#heading-how-to-script-the-simulators-and-devices)
17. [How iOS and Android Compare](#heading-how-ios-and-android-compare)
18. [The Samsung Reality Check](#heading-the-samsung-reality-check)
19. [The Demo Repository](#heading-the-demo-repository)
20. [What to Know Before You Start](#heading-what-to-know-before-you-start)

::: note Prerequisites

To follow along, you'll need:

- Node.js 20 or later.
- Xcode 26 or later, plus a **paid Apple Developer account**. APNs requires a real signing key and a device build. The simulator can't receive Live Activity pushes.
- Android Studio with an API 36 emulator built from a `google_apis` system image. Google Play services are required for FCM, and a bare Android Open Source Project image doesn't include them.
- A [<VPIcon icon="fa-brands fa-google"/>Firebase](https://firebase.google.com/docs/cloud-messaging) project, for the Android half.
- Working knowledge of Swift, Kotlin, and TypeScript. This is a native modules article, not a JavaScript-only one.

The versions I used throughout:

| Package or tool | Version |
| --- | --- |
| Expo SDK | 57.0.4 |
| React Native | 0.86.0 |
| React | 19.2.3 |
| TypeScript | 6.0.3 |
| [<VPIcon icon="iconfont icon-github"/>`EvanBacon/expo-apple-targets`)](https://github.com/EvanBacon/expo-apple-targets) | 4.0.7 |
| [<VPIcon icon="fa-brands fa-android"/>`androidx.core`](https://developer.android.com/jetpack/androidx/releases/core) | 1.17.0 |
| `firebase-bom` | 33.7.0 |
| Xcode | 26.3 |

The `androidx.core` version isn't optional. Version 1.17.0 backports the Android 16 promotion APIs so they compile against base SDK 36. I'll explain why in a moment.

:::

---

## What Live Activities and Live Updates Actually Are

A Live Activity isn't a push notification. A notification is a fire-and-forget event. A Live Activity is a persistent, glanceable card with its own state that changes in place, a bounded lifetime, and dedicated system surfaces.

Here's where each platform landed:

- iOS 16.1 introduced lock-screen Live Activities. 16.2 added the Dynamic Island. 17.2 added push-to-start. 18 added broadcast channels. See Apple's [<VPIcon icon="fa-brands fa-apple"/>ActivityKit documentation](https://developer.apple.com/documentation/activitykit) and the [<VPIcon icon="fa-brands fa-apple"/>Live Activities Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/live-activities).
- Android 16 (API 36) introduced [<VPIcon icon="fa-brands fa-android"/>`Notification.ProgressStyle`](https://developer.android.com/reference/android/app/Notification.ProgressStyle), the segmented progress bar.
- Android 16 QPR1 (API 36.1), the first Quarterly Platform Release, introduced the *promotion* pipeline: the status-bar chip and the elevated lock-screen slot. Google calls the whole feature [<VPIcon icon="fa-brands fa-android"/>progress-centric notifications](https://developer.android.com/about/versions/16/features/progress-centric-notifications).

I built DropTrack to exercise all of it. An order moves through seven steps, from "Order placed" to "Arriving now". A courier can be reassigned mid-run. The card is driven either locally from an in-app console or remotely from a push.

![DropTrack expanded Dynamic Island on a real iPhone 14 Pro](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/ea8d99d3-162d-4104-8402-c38e4ebc39fb.png)

---

## Where You Have Already Seen This Feature

Before any code, it helps to know why this API exists, because "a card on the lock screen" undersells it.

Think about the last time you ordered food. You place the order, lock your phone, and then what? Without a Live Activity, the app's only way to reach you is a push notification per state change. Order confirmed. Restaurant is preparing your food. Rider assigned. Rider is two stops away. Rider has arrived.

That's five notifications for one order. Multiply that by every order, and you've trained the user to mute you.

A Live Activity replaces all five with one card that mutates in place. Same information with one surface and no notification fatigue. That's the entire product argument.

Apple's own [<VPIcon icon="fa-brands fa-android"/><VPIcon icon="fa-brands fa-apple"/>Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/live-activities) name the recurring use cases: sports scores, workouts, rides, and deliveries. Google's [<VPIcon icon="fa-brands fa-android"/>progress-centric notifications](https://developer.android.com/about/versions/16/features/progress-centric-notifications) documentation converges on almost the same list, stating that "key use cases include rideshare, delivery, and navigation." That page even describes the delivery example in terms of progress *points* for food preparation and delivery milestones, and *segments* colored by traffic conditions, which is precisely the widget you're about to build.

### Apps That Have Shipped it

Rather than repeat the roundup posts, I checked each app's own App Store listing, because a company describing its own feature is the strongest evidence available. Every app below states that it uses Live Activities in its own words:

| App | What its Live Activity shows | First-party source |
| --- | --- | --- |
| Chowdeck | Delivery progress, "right on your Lock Screen and in the Dynamic Island" | [<VPIcon icon="fa-brands fa-apple"/>App Store listing](https://apps.apple.com/us/app/chowdeck-food-delivery/id1530676376) |
| Flighty | Departure countdown, gate changes, taxi time, arrival progress | [Flighty's own help docs](https://flighty.com/help/live-activities-widgets) |
| ESPN | Key plays and game stats for major soccer leagues, the NHL, and the NBA | [<VPIcon icon="fa-brands fa-apple"/>App Store listing](https://apps.apple.com/us/app/espn-live-sports-scores/id317469184) |
| MLB | Game updates on the lock screen | [<VPIcon icon="fa-brands fa-apple"/>App Store listing](https://apps.apple.com/us/app/mlb/id493619333) |
| FotMob | Soccer scores on the lock screen | [<VPIcon icon="fa-brands fa-apple"/>App Store listing](https://apps.apple.com/us/app/fotmob-soccer-live-scores/id488575683) |
| CARROT Weather | Incoming precipitation and storm intensity | [<VPIcon icon="fa-brands fa-apple"/>App Store listing](https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574) |
| Structured | Pomodoro focus timers | [<VPIcon icon="fa-brands fa-apple"/>App Store listing](https://apps.apple.com/us/app/structured-daily-planner-todo/id1499198946) |

Apple ships them in its own software, too. The [<VPIcon icon="fa-brands fa-apple"/>Apple Sports support page](https://support.apple.com/guide/apple-sports-app/follow-games-in-real-time-apdc0cb7ad64/web) says that with Live Activities turned on "you can get real-time information on your iPhone Lock Screen or your Apple Watch so that you can follow every moment of the game."

Two more are well documented by the technology press rather than by the companies themselves. Uber Eats [<VPIcon icon="fas fa-globe"/>rolled out Live Activities in May 2023](https://macrumors.com/2023/05/02/uber-eats-live-activities/), showing order status, estimated time of arrival, and the driver's name and photo. DoorDash [<VPIcon icon="fas fa-globe"/>followed in December 2023](https://macrumors.com/2023/12/04/doordash-rolling-out-live-activities/) with a real-time estimated time of arrival in the Dynamic Island.

Two honest caveats about that table. First, an app not mentioning Live Activities in its listing doesn't mean it lacks the feature, only that I couldn't confirm it first-hand. Uber Eats is exactly that case. Second, this reflects the listings as I read them, and any app can add or drop the feature in a release.

Food delivery is the canonical case, and it's what DropTrack models. Ride-hailing is the highest-stakes version: "driver arriving in 3 minutes", the plate number, the trip in progress, glanced at while you stand on a curb with a locked phone. The Dynamic Island's compact presentation exists almost for this: a glyph and a percentage read in half a second.

Finance is the case people forget, and it's where a segmented bar would earn its keep. A crypto deposit isn't "pending, then done". It's "3 of 12 network confirmations", which is a segmented progress bar with discrete steps, mapping cleanly onto [<VPIcon icon="fa-brands fa-android"/>`ProgressStyle`'s](https://developer.android.com/reference/android/app/Notification.ProgressStyle) segments and points and onto the SwiftUI capsules you will write below. The same shape fits a bank transfer clearing or a card payment settling.

I want to be careful here, though: I checked the App Store listings for the major exchanges and neobanks and found none that documents a Live Activity. Treat this one as an obvious fit that the category hasn't yet taken up, not as prior art.

Here's the table I wish someone had shown me before I started:

| Category | What updates | Who drives the update | Why a card beats notifications |
| --- | --- | --- | --- |
| Food delivery | Courier position, ETA, rider swap | Backend | Five pushes collapse into one mutating card |
| Ride-hailing | Driver arriving, trip state, fare | Backend | Glanceable while the phone is locked |
| Crypto deposit | Confirmations, 3 of 12 | Backend | A progress bar, not a binary "done" ping |
| Bank transfer | Settlement stage | Backend | Fewer "has it landed?" support tickets |
| Parcel | Out for delivery, then delivered | Backend | Persistent, not buried in the tray |
| Timer or workout | Elapsed time | The device | No server needed. This is the easy case |

Look at the third column. In every commercially interesting case the update is driven by your server, not by the device. That means the entire value of the feature lives in the push path. And the push path is exactly where the two platforms diverge, where the failures are silent, and where most of this handbook's pain is concentrated.

The pretty SwiftUI card is the easy half. Getting a backend to reliably mutate that card while the app is dead is the hard half, and it's different on each platform.

---

## Why You Need a Custom Native Module

Before writing a line of Swift, I evaluated the shortcuts. Both fail, for instructive reasons.

[<VPIcon icon="iconfont icon-github"/>`software-mansion-labs/expo-live-activity`](https://github.com/software-mansion-labs/expo-live-activity) ships a predefined widget layout and a fixed content-state shape. DropTrack needs a custom segmented progress bar, a rider-reassignment treatment, and its own Dynamic Island layouts. All of those require owning `ActivityAttributes` and the SwiftUI that renders it. You reach first render fastest, and then you eject.

[<VPIcon icon="iconfont icon-github"/>`invertase/notifee`](https://github.com/invertase/notifee), the notification library most React Native developers reach for, is archived. As of this writing its GitHub repository is marked archived, its last published release was [<VPIcon icon="fa-brands fa-npm"/>`@notifee/react-native@9.1.8`](https://npmjs.com/package/@notifee/react-native) in December 2024, and its Android module still targets `compileSdk 34`. It has no Live Updates support. A custom module is currently the only React Native route to Android 16 Live Updates.

So: one local [<VPIcon icon="iconfont icon-expo"/>Expo module](https://docs.expo.dev/modules/overview/), one TypeScript API, two native backends.

```sh title="file structure"
modules/droptrack-live/
├── expo-module.config.json         # autolinking (apple + android)
├── index.ts                        # the public JS API
├── src/                            # TS types, native binding, web no-op
├── ios/
│   ├── DeliveryAttributes.swift    # the ActivityKit contract
│   └── DroptrackLiveModule.swift   # JS to ActivityKit
└── android/
    ├── DroptrackLiveModule.kt      # JS to NotificationManager
    ├── DeliveryNotifier.kt         # the shared notification builder
    └── DroptrackFcmService.kt      # push to NotificationManager
```

The JavaScript surface is deliberately small, and identical across platforms:

```ts
// The dynamic half of the card: every update replaces this object wholesale.
// Keep it small. iOS rejects an ActivityKit push payload over 4 KB.
export type DeliveryState = {
  status: string;           // free text shown as the headline: "Picked up"
  progress: number;         // 0.0 to 1.0, drives the bar on both platforms
  etaEpochMillis: number;   // Unix ms, the shape JS speaks. Swift converts it.
  stopsRemaining: number;   // renders as "2 stops away" / "you're next"
  courierName: string;      // dynamic, because riders get reassigned mid-run
  riderReassigned: boolean; // flips the courier row to the "new rider" style
};

// Three verbs, mirroring the ActivityKit lifecycle. Android fakes the same
// shape with notify / notify / cancel, so callers never branch on platform.

// Starts the activity and returns the system-assigned id. Hold on to it:
// every later call needs it, and it does NOT survive an app restart.
startDelivery(info: DeliveryInfo, state: DeliveryState): Promise<string>;

// Replaces the ContentState in place. The card mutates, it does not re-appear.
updateDelivery(id: string, state: DeliveryState): Promise<void>;

// Final state, then dismissal. Omit dismissAfterSeconds to let the card linger.
endDelivery(id: string, state: DeliveryState, dismissAfterSeconds?: number): Promise<void>;

isSupported(): boolean;          // false on iOS < 16.2, Android < 16, and web
areActivitiesEnabled(): boolean; // false if the USER switched them off in Settings
```

Those last two are separate on purpose. A device can support Live Activities while the user has switched them off in Settings, and only `areActivitiesEnabled()` catches that. `Activity.request` throws in that case, so `startDelivery` throws too.

The `dismissAfterSeconds` argument maps onto ActivityKit's [<VPIcon icon="fa-brands fa-apple"/>dismissal policy](https://developer.apple.com/documentation/activitykit/activityuidismissalpolicy). Under the default policy, Apple's documentation says "the system keeps a Live Activity that ended on the Lock Screen for up to four hours after it ends." Passing a value shortens that window.

This project uses Expo's [<VPIcon icon="iconfont icon-expo"/>Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/) (CNG), which means the `ios` and `android` folders are generated by `prebuild` and aren't committed. Every line of native code therefore lives in the module or in a [<VPIcon icon="iconfont icon-expo"/>config plugin](https://docs.expo.dev/config-plugins/introduction/), so it survives `prebuild --clean`. The widget extension itself is generated by [<VPIcon icon="iconfont icon-github"/>`EvanBacon/expo-apple-targets`](https://github.com/EvanBacon/expo-apple-targets) for the same reason.

One structural detail matters later: the module compiles as its own CocoaPod, not into the app target.

---

## How the iOS Contract Works

An ActivityKit activity is split in two. [<VPIcon icon="fa-brands fa-apple"/>`ActivityAttributes`](https://developer.apple.com/documentation/activitykit/activityattributes) holds static data, set once and never changed. Its nested `ContentState` holds the dynamic half, which every update replaces wholesale.

Most tutorials state that rule and move on. It's worth understanding *why* the platform forces it, because the reason tells you exactly which half any given field belongs in.

### Why the Split Exists

The split isn't a style convention. It's about what can physically cross the wire.

When you call `Activity.request(...)`, you hand ActivityKit two things at once: the attributes and the first content state. The system files the attributes away and never accepts a new copy of them. From that moment on, the only thing you can ever send is a new `ContentState`.

You can see this in the shape of an [<VPIcon icon="fa-brands fa-apple"/>ActivityKit push payload](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications). Here's what my APNs client actually transmits:

```js
aps: {
  // Older-than-last timestamps are discarded by APNs (ordering guard).
  timestamp: Math.floor(Date.now() / 1000),
  event,                        // "update" or "end"
  'content-state': contentState, // the only field that carries data
}
```

There is no `attributes` key. There can't be one. Nothing in the payload can reach the static half.

So "should this field be static or dynamic?" is really the question **"will my server ever need to change this value?"** If the answer is yes, the field must live in `ContentState`, because that's the only thing a push can move.

That's the whole design. `ActivityAttributes` is the activity's identity, fixed at birth. `ContentState` is its current reading, replaced wholesale on every update rather than patched. Send a content state that omits a field and you haven't left that field alone, you've failed to decode. The `Codable` conformance is what lets the system serialize the state across a process boundary, and the `Hashable` conformance lets it tell whether an incoming state actually differs from the one already on screen.

### The Bet I Lost

Here's what I wrote first. It looks reasonable:

```swift
// BEFORE: courierName is static. This compiles, ships, and works fine,
// right up until a dispatcher reassigns the rider mid-delivery.
struct DeliveryAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    var status: String
    var progress: Double
    var eta: Date
    var stopsRemaining: Int
  }
  var orderId: String
  var courierName: String   // the bet: a delivery has one courier
}
```

Putting a field in the static half is a bet that it can never change for the activity's lifetime. I bet that a delivery has one courier. Then I built rider reassignment, where a dispatcher swaps the courier mid-run, and the bet came due.

Because `courierName` was static, there was no way to express the change. Not through `activity.update()`, not through a push, not at all. The only escape would have been to end the activity and start a new one, which means the card disappears from the lock screen and returns as a different card, mid-delivery. That's not a fix, it's a regression.

So the field moved:

```swift
// AFTER: only orderId is genuinely immutable. Everything a dispatcher
// can change lives in ContentState, because ContentState is the only
// thing an APNs push can carry.
struct DeliveryAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    /// Human-readable status, e.g. "Picked up", "2 stops away"
    var status: String
    /// Overall delivery progress, 0.0 ... 1.0
    var progress: Double
    /// Estimated arrival time
    var eta: Date
    /// Stops before the courier reaches the user
    var stopsRemaining: Int
    /// Courier display name, dynamic since riders can be reassigned mid-run
    var courierName: String
    /// True right after a reassignment, drives the "new rider" treatment
    var riderReassigned: Bool
  }

  /// Order identifier shown on the card, the only truly immutable fact
  var orderId: String
}
```

Moving one field touched twelve files, because the contract is duplicated at every layer that has to encode or decode it:

```text
9  DeliveryNotifier.kt          Android notification builder
3  DroptrackLive.types.ts       the TypeScript contract
3  DroptrackLiveModule.swift    the Swift bridge record
3  App.tsx                      React state and the push handler
2  DeliveryLiveActivity.swift   the widget's SwiftUI
2  DeliveryAttributes.swift     the module's copy
2  DeliveryAttributes.swift     the widget's copy (yes, twice)
2  DroptrackLiveModule.kt       the Kotlin bridge record
1  DroptrackFcmService.kt, dispatch-server.mjs, push-update.mjs,
   apns.test.mjs, delivery.ts
```

The asymmetry here is what matters. A dynamic field you never change costs you a few bytes in every push. A static field you need to change costs you the entire stack. **When in doubt, put the field in `ContentState`**. In the end, only `orderId` earned its place in the static half.

### The Identical-Copy Trap

The widget extension is a separate binary. It's a different process, launched by the system, that doesn't link your app's code. Your app target compiles the module's `DeliveryAttributes.swift`. The widget target compiles its own. Two compilations produce two independent types that merely share a name.

At runtime, ActivityKit has to connect them. Your app says "start an activity of type `DeliveryAttributes`", and the system asks the widget whether it has a [<VPIcon icon="fa-brands fa-apple"/>`WidgetConfiguration`](https://developer.apple.com/documentation/widgetkit) for a type by that name whose `ContentState` decodes this data. The match is structural, on the type's name and its `Codable` shape, performed by a system daemon, at runtime, across a process boundary.

Now rename `courierName` to `riderName` in one copy and forget the other. The app compiles. The widget compiles. Both are internally consistent. `Activity.request()` succeeds and returns an id. But when the system hands the encoded state to the widget, the widget's decoder looks for `riderName`, doesn't find it, and throws inside a daemon in another process, where your breakpoints and your log statements don't exist.

The card never appears. No crash, no warning, no console line, and `Activity.activities` still lists the activity as running. You'll spend an hour on your SwiftUI layout, and the layout was never the problem.

Two things follow. A shared source file doesn't save you, because the module compiles as its own CocoaPod rather than into the app target, so no build phase naturally covers both. And since the compiler will never catch this, the check has to be external:

```sh
diff modules/droptrack-live/ios/DeliveryAttributes.swift \
targets/widgets/DeliveryAttributes.swift
```

If that command ever prints anything, your Live Activity is already broken. It costs nothing to wire into a pre-commit hook, and it's the single highest-value guardrail in this project.

---

## How to Build the Widget in SwiftUI

The widget declares one [<VPIcon icon="fa-brands fa-apple"/>`Widget`](https://developer.apple.com/documentation/widgetkit) with two presentations: the lock-screen card and the Dynamic Island.

Before reading the code, hold one idea in your head: **these closures are a pure function from state to view.** The widget extension isn't a running program. The system launches the process, calls your closure with the current `ContentState`, keeps the rendered result, and kills the process.

When a push delivers a new state, it runs the closure again. There's no `@State`, no timer, no network call, and no `onAppear` doing work. That's also why widget extensions have no network access: there's nobody home to make a request.

Two things about the type signature before the code. `Widget` is a WidgetKit protocol, not a SwiftUI `View`, and `body` returns `some WidgetConfiguration`, not `some View`. You're not describing pixels, you're declaring what kind of widget this is.

And the `for:` argument on line 3 is the binding point from the previous section: this is the exact spot where the app's `DeliveryAttributes` and the widget's copy are matched by name and `Codable` shape, so it's where the identical-copy trap either works or silently fails.

```swift :collapsed-lines
struct DeliveryLiveActivity: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: DeliveryAttributes.self) { context in
      // Closure 1 of 2: the lock screen and banner.
      DeliveryCardView(context: context)
        .activityBackgroundTint(Color(red: 0.07, green: 0.07, blue: 0.12))
        .activitySystemActionForegroundColor(.white)

    } dynamicIsland: { context in          // closure 2 of 2, labelled
      DynamicIsland {
        // Expanded (long-press): four named slots, arranged around the cutout.
        DynamicIslandExpandedRegion(.leading) {
          Image(systemName: "bicycle").foregroundStyle(brandOrange)
        }
        DynamicIslandExpandedRegion(.trailing) {
          Text(context.state.eta, style: .time).font(.callout.bold())
        }
        DynamicIslandExpandedRegion(.center) {
          Text(context.state.status).font(.callout.weight(.semibold)).lineLimit(1)
        }
        DynamicIslandExpandedRegion(.bottom) {
          VStack(spacing: 4) {
            SegmentedProgressBar(progress: context.state.progress)
            HStack {
              CourierLabel(state: context.state, compact: true)
              Spacer()
              Text(stopsLabel(context.state.stopsRemaining))
            }
            .font(.caption2).foregroundStyle(.secondary)
          }
        }
      } compactLeading: {                   // the default pill, left of the cutout
        Image(systemName: "bicycle").foregroundStyle(brandOrange)
      } compactTrailing: {                  // ...and right of it
        Text("\(Int(context.state.progress * 100))%").font(.caption2.bold())
      } minimal: {                          // when another app shares the island
        Image(systemName: "bicycle").foregroundStyle(brandOrange)
      }
      .keylineTint(brandOrange)
    }
  }
}
```

That's one state object rendered four ways, and a few of the choices are load-bearing:

- **The two closures:** `ActivityConfiguration` takes a content closure and a `dynamicIsland:` closure. The bare-then-labelled form is Swift's multiple-trailing-closure syntax, not two separate statements. The first is the lock-screen and banner card, and the second is every Dynamic Island form.
- `context`**:** Each closure receives `context.state`, the dynamic `ContentState` replaced on every update, and `context.attributes`, the static half, read exactly once, for the order id on the card.
- **The two** `.activity…` **modifiers:** These are ActivityKit-specific, not general SwiftUI. You don't draw the system's swipe-to-end chrome, so all you can do is tint it.
- `eta, style: .time` renders a localized clock time such as "5:42 PM", honouring the user's 12- or 24-hour setting. It's not a countdown. A ticking countdown would use `style: .timer`, which the system animates with no push at all, which is how a timer-style activity stays live with zero server traffic.
- `lineLimit(1)` isn't decoration. The centre slot is a few dozen points wide, and an unbounded status string wraps and wrecks the layout. The bar lives in `.bottom` for the opposite reason: it's the only region wide enough.
- `.font` **and** `.foregroundStyle` **on the** `HStack` apply to both children through SwiftUI's environment, and a child's explicit modifier still wins over the inherited one, which is how `CourierLabel` overrides the colour on a reassignment.
- `Int(progress * 100)` truncates rather than rounds, so 0.999 would render as "99%". The scripted steps end on exactly 1.0 so it lands on 100, but server-computed progress would want `.rounded()`.
- `minimal` is the presentation people forget. When another app's activity is also running, the island shrinks yours to a single circle. Skip it and your activity looks broken whenever a timer is going. `keylineTint` sets the glow the system draws around the whole island on update.

### The Segmented Progress Bar

The capsule bar is an `HStack` of rounded rectangles. `ContentState` carries `progress` as a double rather than a step index, so the widget derives how many segments to fill.

```swift
private struct SegmentedProgressBar: View {
  let progress: Double
  var segments: Int = 7   // one capsule per delivery step

  // ContentState carries a 0...1 fraction, never a step index, so the bar has
  // to work backwards to a segment count. Keeping the wire format numeric means
  // the widget never needs to know what the seven steps are called.
  private var filled: Int {
    // Clamp first: a server that sends 1.4 must not paint 10 of 7 segments.
    let clamped = min(max(progress, 0), 1)
    // .rounded(.up) so a step that has merely BEGUN already lights its capsule.
    // progress 0.05 * 7 = 0.35 -> ceil -> 1 segment lit, not 0.    // The outer min() guards the exact 1.0 case against a 8th segment.
    return min(segments, Int((clamped * Double(segments)).rounded(.up)))
  }

  var body: some View {
    HStack(spacing: 5) {
      // ForEach over a constant range, so `id: .self` on the index is safe.
      ForEach(0..<segments, id: .self) { i in
        RoundedRectangle(cornerRadius: 3, style: .continuous)
          // The only stateful decision in the whole view: lit, or track colour.
          .fill(i < filled ? brandOrange : trackGray)
          // Fixed height, no width: the HStack divides the width evenly, so the
          // same view fits the wide lock-screen card and the narrow island.
          .frame(height: 7)
      }
    }
  }
}
```

With progress values of 0.05, 0.15, 0.35, 0.55, 0.7, 0.85, 0.95, and 1.0, rounding `progress * 7` upward fills one through seven segments in lockstep with the steps. The same view renders on the lock-screen card and inside the expanded island, so the component reads as one thing across surfaces.

![DropTrack lock-screen card with the segmented progress bar](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/539a1b65-6fdf-440a-8e9b-0ea3a02c918a.png)

![DropTrack compact Dynamic Island pill](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/ef33b5c6-bab4-4df5-9753-ed032256ece2.png)

### The Reassignment Treatment

Reassignment is an in-place update: same activity id, same step, new `courierName`, and `riderReassigned` set to true. The courier row swaps its icon and copy.

```swift
// Shared by the lock-screen card and the expanded island, so a reassignment
// reads identically wherever the user happens to be looking.
private struct CourierLabel: View {
  let state: DeliveryAttributes.ContentState
  let compact: Bool   // true inside the island, where horizontal space is scarce

  var body: some View {
    // Both branches are driven purely by ContentState. No local state, because
    // the widget process does not live long enough to hold any.
    if state.riderReassigned {
      Label(
        // The island cannot fit "New rider · Tunde", so it drops the prefix and
        // leans on the swap icon plus the orange tint to carry the meaning.
        compact ? state.courierName : "New rider · \(state.courierName)",
        systemImage: "arrow.triangle.2.circlepath"
      )
      // An explicit style on the child overrides the .secondary the parent
      // HStack pushed down through the environment. This is what makes the
      // swapped rider the one thing on the card that draws the eye.
      .foregroundStyle(brandOrange).bold()
    } else {
      // Steady state: inherits the parent's caption font and secondary colour.
      Label(state.courierName, systemImage: "bicycle")
    }
  }
}
```

Advancing a step retires the badge. That's the whole feature, and the reason `courierName` had to leave the static half.

![DropTrack rider-reassignment treatment on the lock screen](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/38944dd0-0875-4b92-b1cb-16783123848c.png)

---

## How to Bridge ActivityKit to JavaScript

Expo's [<VPIcon icon="iconfont icon-expo"/>`Record`](https://docs.expo.dev/modules/module-api/) type gives you type-safe bridging. Expo validates the JavaScript object against these fields before your function body runs.

```swift
// A Record is Expo's typed bridge struct. Every @Field is decoded out of the
// JS object BEFORE your function body runs, so a missing or wrong-typed key
// fails at the boundary with a clear error rather than deep inside Swift.
// The defaults are what a field falls back to when JS omits it.
struct DeliveryStateRecord: Record {
  @Field var status: String = ""
  @Field var progress: Double = 0
  @Field var etaEpochMillis: Double = 0   // Double, not Int: JS numbers are f64,
                                          // and epoch ms overflows Int32.  @Field var stopsRemaining: Int = 0
  @Field var courierName: String = ""
  @Field var riderReassigned: Bool = false

  // The bridge type and the ActivityKit type are deliberately NOT the same
  // struct. This function is the single place the two vocabularies meet.
  @available(iOS 16.2, *)
  func toContentState() -> DeliveryAttributes.ContentState {
    DeliveryAttributes.ContentState(
      status: status,
      // Clamp at the boundary, so no downstream view has to defend itself.
      progress: min(max(progress, 0), 1),
      // JS speaks Unix milliseconds; Foundation.Date wants seconds. Divide once,
      // here, rather than scattering /1000 through the codebase.
      eta: Date(timeIntervalSince1970: etaEpochMillis / 1000),
      stopsRemaining: stopsRemaining,
      courierName: courierName,
      riderReassigned: riderReassigned
    )
  }
}
```

And the module itself:

```swift
AsyncFunction("startDelivery") { (info: DeliveryInfoRecord, state: DeliveryStateRecord) -> String in
  // Runtime OS guard: the module compiles against older targets, so this is
  // what stops it calling into a framework that isn't there.
  guard #available(iOS 16.2, *) else { throw LiveActivityUnsupportedException() }

  let activity = try Activity.request(
    attributes: DeliveryAttributes(orderId: info.orderId),                  // static half, set once
    content: ActivityContent(state: state.toContentState(), staleDate: nil), // dynamic half
    pushType: .token                                                        // ask APNs for a token
  )
  return activity.id   // the only handle JS gets, and the one it forgets on reload
}

AsyncFunction("updateDelivery") { (activityId: String, state: DeliveryStateRecord) in
  let activity = try Self.findActivity(id: activityId)
  // .update() replaces the whole ContentState. There is no partial-patch API.
  await activity.update(ActivityContent(state: state.toContentState(), staleDate: nil))
}
```

A few notes on the arguments, so they stay out of the code. `AsyncFunction` (rather than `Function`) is what makes the JS side a `Promise`, and Expo infers the rest of the signature from the parameter types.

`staleDate: nil` means the card is never marked stale. Pass a date and, once it passes, the system flips the activity's state so your widget can read `context.isStale` and render a degraded view, but it doesn't grey the card out for you.

And `pushType: .token` is what asks APNs for a per-activity token, where passing `nil` instead gives you a purely local activity that no server can update.

Notice `findActivity`. Activities are looked up fresh by id on every call rather than cached in a property, because activity handles live inside [<VPIcon icon="fa-brands fa-apple"/>ActivityKit](https://developer.apple.com/documentation/activitykit/activity), not in your process. That distinction matters enormously, as the next section shows.

```swift
@available(iOS 16.2, *)
private static func findActivity(id: String) throws -> Activity<DeliveryAttributes> {
  // `Activity.activities` is a live, system-owned list. It survives an app
  // relaunch, a JS reload, and a process kill. Caching a handle in a Swift
  // property would not, which is precisely why this lookup runs every time.
  guard let activity = Activity<DeliveryAttributes>.activities.first(where: { $0.id == id }) else {
    // Reached when the user swiped the card away, or the activity aged out.
    throw ActivityNotFoundException(id)
  }
  return activity
}
```

---

## Four iOS Gotchas That Cost Me an Evening Each

Each of these wasted an evening because the failure looked like a bug in my code when it was really a quirk of the platform. They share a shape, so I've written each one the same way: the symptom you see, why it happens, and what to do about it.

### Gotcha 1: The Compact Island Looks Broken

You build the compact Dynamic Island, run the app, and it never appears.

This happens because the compact presentation is hidden while your own app is in the foreground. This is by design, but nothing tells you so, and I spent twenty minutes certain my layout was wrong.

To fix this, lock the device, or switch to another app, before you judge whether the island works. There's nothing to fix in the code.

### Gotcha 2: An Old Activity Renders Nothing After a Rebuild

You change the widget, rebuild, and an activity that was already running goes blank. No error appears anywhere.

This happens when an activity is tied to the exact build that started it. Once you rebuild the widget extension, the running activity no longer matches the code on the device.

To fix this, after any change to the widget extension, end the stale activity and start a fresh one. Don't expect a warning to remind you.

### Gotcha 3: Reinstalling Can Jam the System Daemon

Right after `simctl install`, your first activity refuses to render. `Activity.activities` says it's active, yet the screen shows nothing.

This happens because Live Activities are drawn by a background system process called `chronod`. A reinstall can leave it wedged: in my case it threw `widgetDescriptorNotFound` and logged internal errors, and no amount of ending and restarting the activity cleared it.

This is a fault in the daemon, not in your app, which is why the usual checks mislead you. Listing the extension with `pluginkit -m` shows it present and healthy while the daemon behind it is stuck.

To fix this, reboot the simulator with `simctl shutdown && boot`, then start a fresh activity.

### Gotcha 4: Tapping the Card Opens an App That Forgot Everything

This is the subtle one, the most visible to users, and the reason for the next two code samples.

The user taps the live card to open your app. The app launches into an empty screen that insists nothing is being tracked, every control disabled, while the card sits right there on the lock screen still updating.

This happens because tapping the card cold-starts the app, which means your JavaScript begins from scratch. The activity id lived in React state, and that state died with the previous process.

The activity itself is completely fine: `Activity.activities` still lists it, and an APNs push to it still returns `200`. (A dead activity returns `410`, which makes a handy liveness probe.) The app simply forgot the id it needs to reconnect.

To fix this, stop treating your in-memory id as the source of truth, and ask the system what is running on launch. Expose the live activities to JavaScript.

```swift
AsyncFunction("getRunningActivities") { () -> [[String: Any]] in
  guard #available(iOS 16.2, *) else { return [] }

  // The system's list, populated even on a brand-new process. That is the point.
  return Activity<DeliveryAttributes>.activities.map { activity in
    self.observePushToken(of: activity)   // resubscribe: see note below
    let state = activity.content.state    // the live state, kept current by push
    return [
      "activityId": activity.id,                // the handle JS lost
      "orderId": activity.attributes.orderId,   // the static half
      "status": state.status,
      "progress": state.progress,
      "courierName": state.courierName,
      "riderReassigned": state.riderReassigned,
    ]
  }
}
```

That `observePushToken` call is the line everyone misses. The `for await` loop watching this activity's push token died with the previous process, so without resubscribing here the card recovers. But the server never learns the token again after a rotation, and pushes quietly stop landing.

Then rehydrate on mount, and again on every foreground, because a push that lands while you're backgrounded updates the widget without running your JavaScript at all. React Native's [<VPIcon icon="fa-brands fa-react"/>`AppState`](https://reactnative.dev/docs/appstate) gives you the hook.

```ts
useEffect(() => {
  const sync = () => {
    void DroptrackLive.getRunningActivities().then((running) => {
      const activity = running[0];
      if (!activity) return;   // nothing running: leave the empty state alone

      setActivityId(activity.activityId);   // this line re-enables the whole UI
      setRider({ name: activity.courierName, justReassigned: activity.riderReassigned });

      // The card carries a status string, not a step index. Guard the -1.      const index = STEPS.findIndex((s) => s.status === activity.status);
      if (index >= 0) setStepIndex(index);
    });
  };

  sync();   // case 1: cold start (e.g. the user tapped the card and we launched)
  const sub = AppState.addEventListener("change", (s) => {
    if (s === "active") sync();   // case 2: resume from background
  });
  return () => sub.remove();
}, []);
```

The whole tracking interface is gated on `activityId`, so restoring it is what turns the app back on. Miss that one line and the app looks dead while the card is live on the lock screen.

The two call sites cover the two ways state goes stale. `sync()` on mount handles a cold start, and the `AppState` listener handles a resume, because the mount effect won't re-run and a push may have advanced the card while you were backgrounded without executing any JavaScript. The empty dependency array means this wiring is set up once, for the app's lifetime.

That last gotcha generalises into the sentence I wish I'd read first: **Live Activities are owned by the system, not by your process.** The API hands you an activity id and it's easy to assume the id is yours to keep. It's not. The activity outlives the variable, and the moment a user is most likely to open your app, by tapping the live card, is precisely the moment your in-memory copy of that id doesn't exist.

---

## How to Drive iOS From a Server With APNs

Here's the payoff: updating the card while the app is fully force-quit. The API surface is almost insultingly small. You change one argument. Apple documents the flow in [<VPIcon icon="fa-brands fa-apple"/>Starting and updating Live Activities with ActivityKit push notifications](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications).

```swift
let activity = try Activity.request(
  attributes: attributes,
  content: ActivityContent(state: state.toContentState(), staleDate: nil),
  pushType: .token   // this was `nil`. That is the entire feature.
)

Task {
  for await tokenData in activity.pushTokenUpdates {
    let token = tokenData.map { String(format: "%02x", $0) }.joined()   // raw Data -> hex
    NSLog("[DropTrack] push token for %@: %@", activity.id, token)       // NSLog, so devicectl sees it
    self.sendEvent("onPushTokenReceived", ["activityId": activity.id, "token": token])
  }
}
```

`pushTokenUpdates` is an `AsyncSequence`, not a one-shot getter, which is why this is a `for await` loop and not a single read. Reading `activity.pushToken` right after `request()` reliably returns nil, because the token hasn't arrived from APNs yet, and it can also rotate mid-flight.

The token arrives as raw `Data`, so it's hexed before use. It's logged with `NSLog` rather than `print` because a standalone Release build has no Metro to receive `console.log`, and `NSLog` is what `devicectl --console` surfaces. And the token is per-activity, so it's keyed by activity id when handed to JS rather than stored globally.

Everything after that is plumbing, and two pieces of it fail without a single error message.

**`pushType: .token` does nothing without the [<VPIcon icon="fa-brands fa-apple"/>`aps-environment`](https://developer.apple.com/documentation/bundleresources/entitlements/aps-environment) entitlement**. `Activity.request` still succeeds. Local updates still work. The token stream simply never yields. Nothing logs. Add the entitlement in <VPIcon icon="iconfont icon-json"/>`app.json`:

```json title="app.json"
"ios": {
  "entitlements": {
    "aps-environment": "development",
    "com.apple.security.application-groups": ["group.com.fasarticle.droptrack"]
  }
}
```

Two notes on those values, since <VPIcon icon="iconfont icon-json"/>`app.json` can't carry comments. `aps-environment` set to `development` means your tokens are only valid against `api.sandbox.push.apple.com`. A shipping build needs `production`, and mixing the two produces an afternoon of `BadDeviceToken`. The application group is the shared container between the app and the widget extension, and both targets must carry the identical group id or shared reads silently return nothing.

Then verify that the entitlement survived signing, because an entitlement in your config isn't the same as an entitlement in your binary:

```sh
# Reads the entitlements actually baked into the signed .app.
# If aps-environment is absent here, the token stream will never yield,
# no matter what app.json says.
codesign -d --entitlements - --xml Build/Products/Release-iphoneos/DropTrack.app
```

**The push token is per-activity, not per-device.** It arrives asynchronously after `request()` returns, and the system can rotate it mid-flight. Consume the `pushTokenUpdates` async sequence. A single read of `activity.pushToken` immediately after `request()` is reliably nil. Every `startDelivery` mints a brand-new token. I verified that by starting two activities and comparing the hex.

---

## How to Write an APNs Client From Scratch

You don't need a library. Two Node.js built-ins and about sixty lines will do it.

Sending one push comes down to three steps. First, sign a token that proves the request is really from you. Second, open a connection to Apple and attach a precise set of headers. Third, send the state you want the card to show. The rest of this section walks each step, then covers the two ways it fails silently.

One thing to get out of the way first: APNs speaks HTTP/2 only, so `fetch()` can't reach it. You need Node's [<VPIcon icon="fa-brands fa-node"/>`node:http2`](https://nodejs.org/api/http2.html) module, which is why this is written by hand rather than as a `fetch` call.

### Step 1: Sign a Token That Proves Who You Are

APNs won't accept a push until you prove you own the app. You do that with an ES256 [<VPIcon icon="fa-brands fa-apple"/>JSON Web Token](https://datatracker.ietf.org/doc/html/rfc7519), signed by the `.p8` key you download from Apple, following [<VPIcon icon="fa-brands fa-apple"/>Establishing a token-based connection to APNs](https://developer.apple.com/documentation/usernotifications/establishing-a-token-based-connection-to-apns). A JWT is just three base64url chunks joined by dots: a header, a claims object, and a signature over the first two.

```js
import { createPrivateKey, sign } from "node:crypto";

const b64url = (buf) => Buffer.from(buf).toString("base64url");   // JWT uses base64url, not base64

export function mintJWT({ keyPath, keyId, teamId }) {
  const header = b64url(JSON.stringify({ alg: "ES256", kid: keyId }));   // kid: the 10-char key id
  const claims = b64url(JSON.stringify({ iss: teamId, iat: Math.floor(Date.now() / 1000) }));
  const signingInput = `${header}.${claims}`;   // a JWT signs header AND claims joined

  const signature = sign("sha256", Buffer.from(signingInput), {
    key: createPrivateKey(readFileSync(keyPath, "utf8")),
    dsaEncoding: "ieee-p1363",   // THE line. The default (DER) fails silently. See below.
  });

  return `${signingInput}.${b64url(signature)}`;
}
```

That one `dsaEncoding` line is the whole reason to write this by hand rather than trust a snippet off the internet.

Node signs in DER format by default, which wraps the signature's two halves in an envelope, but the JWT standard ([<VPIcon icon="fas fa-globe"/>RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518)) wants those two halves raw and joined. Use the wrong one and APNs answers `403 InvalidProviderToken`, which reads like your key is bad and sends you re-downloading the `.p8` for an hour, when the key was fine all along.

Two smaller details. `kid` is the ten-character key id (it is in the `.p8` filename), and it tells APNs which of your registered keys should check the signature. And the `iat` timestamp can't be more than an hour old, per Apple, which also asks you to refresh it no more than once every 20 minutes, so cache the token instead of minting a fresh one for every push.

### Step 2: Open the Connection and Send the Push

With the token in hand, open an HTTP/2 session to the APNs host and make one `POST`. The headers have to be exact, and the one people get wrong is the topic: it's your bundle id with `.push-type.liveactivity` appended, not the bundle id on its own.

```js
// Pseudo-headers (":method", ":path") are HTTP/2's way of encoding the request
// line. `client` here is an http2 session opened against the APNs host.
const req = client.request({
  ":method": "POST",
  // The device token in the path is the PER-ACTIVITY token, not a device token
  // from UNUserNotificationCenter. Those are different values entirely.
  ":path": `/3/device/${token}`,
  authorization: `bearer ${jwt}`,   // lowercase "bearer" is what APNs expects

  // Live Activity pushes get a SUFFIXED topic. Send the bare bundle id and
  // APNs rejects the request outright.
  "apns-topic": `${bundleId}.push-type.liveactivity`,
  "apns-push-type": "liveactivity", // must match the topic suffix
  "apns-priority": "10",            // 10 = deliver immediately, 5 = opportunistic
  "apns-expiration": "0",           // 0 = do not retry a failed push
});

req.end(JSON.stringify({
  aps: {
    // Ordering guard, in SECONDS. APNs discards a push whose timestamp is older
    // than the last one it applied, so out-of-order retries cannot rewind the card.
    timestamp: Math.floor(Date.now() / 1000),
    event: "update",              // "update" mutates the card, "end" finishes it
    // Decoded straight into the widget's Codable ContentState. Field names and
    // types must match that struct EXACTLY. See the eta trap below.
    "content-state": contentState,
  },
}));
```

The body is small on purpose. `timestamp` is an ordering guard in seconds: APNs drops any push older than the last one it applied, so a delayed retry can't rewind the card. `event` is `"update"` to change the card or `"end"` to finish the activity, and there's no `"start"` here because push-to-start is a separate token that needs iOS 17.2. Everything else lives in `content-state`, which the widget decodes directly, and that's where the second silent failure hides, below.

### How to Test Your Auth Without a Phone

This one trick saved me the most time, so do it before you involve a device at all. Send a push to the sandbox using a deliberately fake device token, and read the [<VPIcon icon="fa-brands fa-apple"/>response code](https://developer.apple.com/documentation/usernotifications/handling-notification-responses-from-apns) APNs gives back.

- `400 BadDeviceToken` is the good outcome. It means your key, key id, team id, and JWT encoding are all correct, and APNs got far enough to look up the token and simply not find it. Your auth works.
- `403 InvalidProviderToken` means the token itself is wrong, so the problem is your key or your signing, not the device.

That single request separates "my auth is broken" from "my token is broken" with no phone in the room. On this project it returned `400` on the first try, which told me the auth was solid and I should look elsewhere for the real bug. That was exactly the reassurance I needed.

### The `eta` Trap: a 200 That Renders Nothing

This is the most instructive bug in the project, and it hit the moment a second code path reused a shared helper.

The same delivery data takes two different routes to the widget, and the routes expect two different shapes. The native module path carries `etaEpochMillis` (Unix milliseconds), and Swift converts it into a `Date` on the way through. The push path skips Swift entirely: the JSON `content-state` is decoded directly by the widget's `Codable` struct, which expects a field literally named `eta`, holding seconds since 2001 (Apple's [<VPIcon icon="fa-brands fa-apple"/>reference date](https://developer.apple.com/documentation/foundation/date)), and knows nothing about `etaEpochMillis`.

So if you reuse the native-bridge object as a push payload, APNs returns `200`, iOS quietly throws the update away because it won't decode, and nothing is logged anywhere. The fix is to translate at the boundary, converting to the widget's shape only when building a push.

```js
const APPLE_EPOCH_OFFSET = 978_307_200;   // seconds between 1970 and 2001

// The shape the WIDGET decodes, not the shape the native bridge takes.
function toContentState({ etaEpochMillis, ...rest }) {
  return {
    ...rest,
    eta: Math.floor(etaEpochMillis / 1000) - APPLE_EPOCH_OFFSET,   // ms->s, then rebase to 2001
  };
}
```

Two details make this work. `Foundation.Date`'s reference point is 2001-01-01, not the Unix epoch, and Swift's `Codable` encodes a `Date` as seconds since that date, which is why the offset is subtracted. And destructuring `etaEpochMillis` out of `rest` is what drops the wrong key: leave it in and the widget's `Codable` init sees an unexpected field next to a missing `eta`, fails to decode, and the update vanishes after a 200. The lesson generalises past the `eta` field. **A `200` from APNs means only that Apple accepted your bytes, not that the card changed.** Any content-state that fails to decode is discarded with no error on any surface, so confirm on the lock screen every time rather than trusting the status code.

Two last environment traps to note. Development-signed builds must talk to `api.sandbox.push.apple.com`, because the production host returns `400 BadDeviceToken` for a sandbox token, which looks exactly like a malformed token and sends you debugging the wrong layer. And if you push frequently, add `NSSupportsLiveActivitiesFrequentUpdates` to your `Info.plist`, or the system budgets and drops your rapid pushes.

---

## How to Test on Real Hardware

The simulator will lie to you about push, so at some point you need a real phone. Four things can trip you up there that the documentation never mentions. Here is each one with the fix.

### Build in Release, not Debug

A Debug build expects to download its JavaScript from Metro over your local network. The build script bakes your Mac's network address into the app, so the moment the phone is on a different network, or simply not tethered to your Mac, it shows a red screen reading `No script URL provided`. There's no `adb reverse` equivalent on iOS to paper over this.

Build with `--configuration Release` instead, which embeds the JavaScript bundle inside the app. That's the more honest test anyway, because a Release build is the only way to fully force-quit the app and prove the push, not a live Metro connection, is doing the work.

### Read Logs with `devicectl`, Not `console.log`

Once you drop Metro, `console.log` has nowhere to go. To read something like a push token off the device, you need the app's real standard output, and `NSLog` in the Swift code plus `devicectl` on the Mac is the reliable way to get it.

```sh
# --console            stream the app's stdout/stderr back to this terminal
# --terminate-existing kill a running copy first, so we catch launch-time logs
# --device             the COREDEVICE id (see the identifier trap below)
xcrun devicectl device process launch --console --terminate-existing \
--device <coredevice-id> com.fasarticle.
#
# → [DropTrack] push token for 3095ACA0-...: 80875cb137590013a4c9...
#   ^ the hex string the dispatch server scrapes and pushes to
```

### Know Which of the Two Device Identifiers You Need

The same phone has two identifiers, and the tools disagree about which they want. `expo run:ios --device` wants the hardware UDID, listed by `xcrun xctrace list devices`. The `devicectl` command above wants the CoreDevice identifier, listed by `xcrun devicectl list devices`.

Pass one where the other belongs and you get `No device UDID or name matching`, which reads as though the phone is unplugged. It's not, so check that you copied the right kind of id before you check the cable.

### Handle Cold-start Deep Links, Not Just Live Ones

If your test driver opens the app with a deep link, note that `devicectl ... --payload-url` cold-starts the app, so the link arrives through [<VPIcon icon="fa-brands fa-react"/>`Linking.getInitialURL()`](https://reactnative.dev/docs/linking) rather than the `url` event that the simulator's `simctl openurl` fires. A driver that listens only for the `url` event will appear to do nothing on a device. Handle both entry points.

With all four handled and the app confirmed fully quit, I drove three pushes through it (a status change, a rider reassignment, and an "arriving now"). Each one rendered on the lock screen and in the Dynamic Island.

One bonus comes free. Sign the Mac into the same Apple ID, and Continuity mirrors the same Live Activity onto the macOS menu bar, segmented bar, and all. One APNs push, three surfaces.

![DropTrack Live Activity on the macOS menu bar via Continuity](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/9aaf2fd9-07b5-49b8-a6cb-6befe06b9e15.png)

---

## Why Android Has No ActivityKit

Android has no equivalent of ActivityKit, so there's no system-owned card and no framework keeping it up to date. What you have instead is an ordinary notification that you keep re-posting.

The trick is the notification id. Re-post under the same id and Android replaces the existing notification in place, which reads as an update. Post under a new id and you get a second notification instead. So the three lifecycle verbs map onto plain notification calls:

- **start** is `notify()` with a fresh id.
- **update** is `notify()` again under that same id.
- **end** is a final `notify()` with `ongoing = false`, followed by a delayed `cancel()`.

That is the entire model. The catch is that everything iOS did for you (keeping the card current, recovering it after a restart, and updating it from a push) is now code you have to write.

### The Trap That Shapes Everything: Android 16 is Two Releases in One

One versioning quirk shapes the whole Android side, so it's worth thirty seconds up front. "Android 16" ships as two releases that share a single API number:

| Release | Reports | What it adds |
| --- | --- | --- |
| Android 16 (base) | `SDK_INT == 36` | [<VPIcon icon="fa-brands fa-android"/>`ProgressStyle`](https://developer.android.com/reference/android/app/Notification.ProgressStyle), the segmented progress bar |
| Android 16 QPR1 | `SDK_INT == 36` | the *promotion* pipeline: the status-bar chip and the elevated lock-screen slot |

Both report `36` because `Build.VERSION.SDK_INT`, the value your code reads to check the OS version, is a plain integer with no room for a `.1`. Two different releases, one number.

That collision is the entire source of the friction, and it leaves you three things to handle. None is hard once you know it is coming.

#### 1. Compile through the backport, not the platform classes

The promotion methods (`setRequestPromotedOngoing`, `setShortCriticalText`, and the `POST_PROMOTED_NOTIFICATIONS` permission) live only in the 36.1 SDK, and React Native 0.86 compiles against base 36. Call them on the platform classes directly and the build fails with "no such method" before the app ever runs. One dependency fixes that:

```groovy title="build.gradle"
dependencies {
  // NotificationCompat backports the 36.1 promotion APIs so they compile
  // against base SDK 36. Without this, ProgressStyle, setRequestPromotedOngoing
  // and setShortCriticalText are simply not on the classpath.
  implementation 'androidx.core:core-ktx:1.17.0'
}
```

Call the [<VPIcon icon="fa-brands fa-android"/>`NotificationCompat`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) versions rather than the platform ones. They compile against 36, take effect on a real 36.1 device, and are ignored on older releases, so one build is safe everywhere.

#### 2. Read `SDK_INT_FULL` only when you truly need the minor version

A normal `SDK_INT >= 36` check can't tell base 36 from 36.1, since both say 36. When you genuinely need to know which release you are on, [<VPIcon icon="fa-brands fa-android"/>`Build.VERSION.SDK_INT_FULL`](https://developer.android.com/reference/android/os/Build.VERSION#SDK_INT_FULL) carries the minor version, with named values in [<VPIcon icon="fa-brands fa-android"/>`Build.VERSION_CODES_FULL`](https://developer.android.com/reference/android/os/Build.VERSION_CODES_FULL). Because of rule 1 you rarely need it for the promotion request itself. You reach for it to decide what to show the user, or to guard the call in rule 3. #### 3. Wrap the capability check so it can't crash you

[<VPIcon icon="fa-brands fa-android"/>`NotificationManager.canPostPromotedNotifications()`](https://developer.android.com/reference/android/app/NotificationManager#canPostPromotedNotifications()) reports whether the device will actually honour a promotion. Its reference lists it as [<VPIcon icon="fa-brands fa-android"/>added in API 36](https://developer.android.com/reference/android/app/NotificationManager#canPostPromotedNotifications()), so in theory it belongs to base Android 16, while the [<VPIcon icon="fa-brands fa-android"/>`POST_PROMOTED_NOTIFICATIONS`](https://developer.android.com/reference/android/Manifest.permission#POST_PROMOTED_NOTIFICATIONS) permission it depends on only arrived in 36.1. On the pre-QPR build I tested, though, the call was absent at runtime and threw. A capability probe should never be the thing that crashes your app, so wrap it and default to false:

```kotlin
Function("canPostPromotedNotifications") {
  // Function, not AsyncFunction: this is a cheap synchronous read, and the UI
  // wants it during the first render to decide what to disable.
  val manager = notificationManager ?: return@Function false

  // Cheapest gate first: below API 36 there is nothing to promote to.
  if (Build.VERSION.SDK_INT < 36) return@Function false

  // Docs list this as added in API 36, but on the pre-QPR build I tested it was
  // absent at runtime and threw. runCatching stops a capability probe from
  // crashing the app, defaulting to false when the call is unavailable.
  return@Function runCatching { manager.canPostPromotedNotifications() }.getOrDefault(false)
}
```

---

## How to Build the Kotlin Side

Here's the notification builder. Notice how many of these lines are promotion requirements rather than cosmetics.

```kotlin
// Whole percent, clamped: a server that sends 1.4 must not become 140.
val progressPercent = (progress.coerceIn(0.0, 1.0) * 100).toInt()

val builder = NotificationCompat.Builder(ctx, CHANNEL_ID)
  .setSmallIcon(R.drawable.ic_delivery)
  .setContentTitle(status)                     // promotion REQUIRES a title
  .setContentText(courierLine(courierName, riderReassigned, stopsRemaining))
  .setSubText("Order $orderId")
  .setOngoing(ongoing)                         // promotion REQUIRES ongoing
  .setOnlyAlertOnce(true)                      // buzz once, then update silently
  .setColor(BRAND_ORANGE)                      // NOT setColorized: that disqualifies it
  .setShortCriticalText("$progressPercent%")   // text inside the status-bar chip
  .setRequestPromotedOngoing(ongoing)          // the promotion request itself

// `when` is the ETA in the header. It must be in the future (see note below).
if (etaEpochMillis > System.currentTimeMillis()) {
  builder.setWhen(etaEpochMillis.toLong()).setShowWhen(true)
}

if (Build.VERSION.SDK_INT >= 36) {
  val style = NotificationCompat.ProgressStyle()
    .setStyledByProgress(true)                 // colour follows the value
    .setProgress(progressPercent)
    .setProgressTrackerIcon(IconCompat.createWithResource(ctx, R.drawable.ic_delivery))
    .setProgressSegments(listOf(               // segments: spans of the bar
      NotificationCompat.ProgressStyle.Segment(100).setColor(BRAND_ORANGE)
    ))
    .setProgressPoints(listOf(                 // points: milestone dots on top
      NotificationCompat.ProgressStyle.Point(35).setColor(Color.WHITE)
    ))
  builder.setStyle(style)
} else {
  builder.setProgress(100, progressPercent, false)  // pre-16 fallback bar
}

val notification = builder.build()
if (Build.VERSION.SDK_INT >= 36) {
  Log.d(TAG, "hasPromotableCharacteristics=${notification.hasPromotableCharacteristics()}")
}
manager.notify(notificationIdFor(activityId), notification)   // stable id = update in place
```

Several of those lines carry non-obvious weight:

- `setOnlyAlertOnce(true)` stops each of the seven re-posts per delivery from buzzing the phone. Only the first `notify()` alerts, and the rest land silently.
- `setColor` **versus** `setColorized`**:** `setColor` tints the notification and is fine, but `setColorized(true)` would *disqualify* it from promotion. They're not interchangeable.
- `setWhen` must be a future timestamp, or the update can be skipped entirely. One UI renders it as an absolute clock time, Pixel as a relative countdown.
- `ProgressStyle` **segments versus points:** *Segments* are spans of the bar (one `Segment(100)` fills the whole thing, several draw the divided look). *Points* are milestone dots painted on top at a given percent.
- **The** `else` **branch:** Below API 36 the compat layer has no `ProgressStyle` at all, so it falls back to the classic determinate bar.

Two runtime checks are your only debugging signal, and they answer different questions:

- `hasPromotableCharacteristics()`, logged after `build()`, tells you whether *you* satisfied every promotion precondition. It says nothing about the device.
- `canPostPromotedNotifications()` tells you whether the *device* will honour the request. The two genuinely disagree on Samsung, which is why you need both.

And `notificationIdFor()` derives a stable int from the activity id, so a re-post under the same id updates the card in place. A different id would post a second notification, the classic "why do I have seven delivery cards" bug.

![DropTrack notification with a ProgressStyle segmented bar in the shade](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/b815c40a-9c1f-42c6-a8da-1dc6647eb7d1.png)

**Promotion eligibility is all-or-nothing, and silent.** It flips true only when every condition holds: notification permission, `setRequestPromotedOngoing(true)`, ongoing, a content title, an allowed style, importance above `MIN`, and not colorized. Miss one and you get an ordinary notification with no explanation. Log [<VPIcon icon="fa-brands fa-android"/>`hasPromotableCharacteristics()`](https://developer.android.com/reference/android/app/Notification#hasPromotableCharacteristics()) after every `build()`, and surface `canPostPromotedNotifications()` in your development interface. Those two booleans are the only debugging signal the platform gives you.

Note also that custom `RemoteViews` aren't allowed for promoted notifications. You get the `ProgressStyle` template, or you get no promotion. That's the biggest design constraint compared with iOS, where you write arbitrary SwiftUI.

When it does promote on a real API 36.1 build, you get the chip and the elevated lock-screen slot.

![DropTrack status-bar chip on Android 16 QPR](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/d0c42fc5-3c8a-42c5-8398-cc4fc358a174.png)

![DropTrack promoted lock-screen placement on Android 16 QPR](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/1583af2a-bd36-40c1-9b6b-9fca3179669f.png)

The same APK behaves three different ways:

| Runtime | Result |
| --- | --- |
| API 36.1 (QPR) | Chip, promoted lock-screen slot, and segmented bar |
| API 36 (base) | Segmented bar only, no promotion |
| Below API 36 | No bar at all, unless you keep the manual `setProgress` branch |

---

## How to Drive Android From a Server With FCM

This is the deepest difference between the two platforms.

On iOS, APNs updates the widget through the system, and your app code never runs. On Android, there's no system-managed remote update. A data-only FCM message wakes a [<VPIcon icon="fa-brands fa-google"/>`FirebaseMessagingService`](https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/FirebaseMessagingService), and your code re-posts the notification. The app is the updater, even from the background.

```kotlin :collapsed-lines
// Registered in the manifest, so Android can instantiate it WITHOUT your
// Activity, your React context, or your module ever existing.
class DroptrackFcmService : FirebaseMessagingService() {

  // Called on install, and again whenever FCM rotates the token. Never assume
  // the token you saw at startup is still valid.
  override fun onNewToken(token: String) {
    Log.i(DeliveryNotifier.TAG, "[DropTrack] fcm token: $token")
  }

  override fun onMessageReceived(message: RemoteMessage) {
    // FCM `data` is always Map<String, String>. Every number and boolean was
    // stringified on the way out and has to be parsed back here.
    val d = message.data

    // No activityId means we cannot address a notification. Bail rather than
    // guess: posting under the wrong id creates a duplicate card.
    val activityId = d["activityId"] ?: return
    val event = d["event"] ?: "update"

    // This service is a SEPARATE entry point. It cannot see the module's
    // in-memory state, so every field must come from the payload, and every
    // parse must be defensive, because a crash here kills the update.
    DeliveryNotifier.ensureChannel(this)   // the process may be brand new
    DeliveryNotifier.post(
      ctx = this,
      activityId = activityId,
      // Every `?:` below is load-bearing. toDoubleOrNull returns null rather
      // than throwing on malformed input, so a bad payload degrades the card
      // instead of killing the service.
      orderId = d["orderId"] ?: "",
      status = d["status"] ?: "",
      progress = d["progress"]?.toDoubleOrNull() ?: 0.0,
      etaEpochMillis = d["etaEpochMillis"]?.toDoubleOrNull() ?: 0.0,
      stopsRemaining = d["stopsRemaining"]?.toIntOrNull() ?: 0,
      courierName = d["courierName"] ?: "",
      riderReassigned = d["riderReassigned"]?.toBoolean() ?: false,
      // "end" clears `ongoing`, which lets the user finally swipe the card away.
      ongoing = event != "end",
    )
  }
}
```

That "separate entry point" comment is the crux, so it's worth slowing down on. Android can start this service on its own to deliver a push, at a moment when the rest of your app isn't running. There's no React, no module instance, and none of the objects the app was holding in memory. So the push handler can't look up "what delivery is in progress" from app state, because there's no app state to look at. Everything it needs has to come from the push payload itself.

That forces a specific design. The code that builds a notification can't live inside the app and read app state. It has to be standalone code that takes plain values and nothing else.

So I pulled all of it into a shared `DeliveryNotifier` object, and both paths call it: the in-app path when JavaScript drives an update, and the push path when the service does. Because they run the same builder from the same inputs, they produce an identical notification, and that shared builder is the single most important structural change on the Android side.

![DropTrack notification updated by a remote FCM push while the app was backgrounded](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/652317c7-291c-4480-a402-fe44c60fcb7f.png)

### The Four Rules of Android Push

Four things have to be right, or the push half quietly fails. In short: send the right kind of message, authenticate the harder way, read the error codes correctly, and wire the plugin through prebuild. Each one in full below.

#### Rule 1: send a data-only message, never one with a `notification` block

This is the rule that catches everyone. A message with a `notification` block, while the app is backgrounded or killed, is handled by the system tray, and your `onMessageReceived` code never runs, so the card never updates. Only a data-only message (no `notification` block) reaches your code in the background.

Firebase documents this in [<VPIcon icon="fa-brands fa-google"/>Receive messages in an Android app](https://firebase.google.com/docs/cloud-messaging/android/receive). Send data-only, and set [<VPIcon icon="fa-brands fa-google"/>`android.priority`](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#androidconfig) to `high` so the app wakes promptly.

#### Rule 2: authenticate with a service-account token, not a static key

FCM v1 auth is heavier than APNs, with no one-shot `.p8`. You mint an RS256 JWT from a [<VPIcon icon="fa-brands fa-google"/>service account](https://developers.google.com/identity/protocols/oauth2/service-account), exchange it for a short-lived OAuth access token, and send that access token as a bearer credential to [<VPIcon icon="fa-brands fa-google"/>`projects.messages.send`](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages/send). The consolation is that FCM v1 is plain HTTPS, so `fetch()` works.

```js :collapsed-lines
// `sa` is the parsed service-account JSON from Firebase. This JWT is not the
// credential you send to FCM; it is the one you trade for a short-lived token.
export function buildAuthJWT(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));  // RSA key, so no ieee-p1363 trap
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging",  // exact scope, or every send 403s
    aud: sa.token_uri,        // the JWT is FOR Google's token endpoint
    iat: now,
    exp: now + 3600,          // one hour, Google's maximum
  }));
  const signingInput = `${header}.${claims}`;
  const sig = createSign("RSA-SHA256").update(signingInput).sign(sa.private_key);
  return `${signingInput}.${b64url(sig)}`;
}

export async function sendDataMessage({ token, data, sa }) {
  const accessToken = await getAccessToken(sa);   // trades the JWT for a token; cache the result
  const res = await fetch(
    `https://fcm.googleapis.com/v1/projects/${sa.project_id}/messages:send`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          token,                        // per-DEVICE token (APNs is per-activity)
          data,                         // note: NO `notification` key (see below)
          android: { priority: "high" },
        },
      }),
    }
  );
  const body = await res.json().catch(() => ({}));   // never throw on a bad error body
  return { status: res.status, reason: body?.error?.status ?? null };
}
```

The design turns on two absences and one indirection. The indirection is the token exchange. Unlike APNs, where the JWT *is* the credential, here you POST the JWT to Google's token endpoint, get back a short-lived access token, and send that, so cache it rather than re-minting per message.

The first absence is any `notification` key in the body, which is deliberate and covered next. The second is high priority over normal, because `normal` may be held until the device leaves Doze, by which time the delivery has finished.

On the response, `404 UNREGISTERED` means drop the token while `400 INVALID_ARGUMENT` means it was never a token. The caller needs to tell those apart, so the reason string is returned rather than swallowed.

FCM `data` values are a map of string to string, so everything is stringified on the way out and parsed on the way in. Unlike iOS, there's no silent shape mismatch, because you wrote the parser. But your parser must never throw.

#### Rule 3: treat `400` and `404` as different failures

FCM splits two cases that APNs collapses. A malformed token returns `400 INVALID_ARGUMENT`, while a well-formed but unregistered token returns `404 UNREGISTERED` (the full list is in the [<VPIcon icon="fa-brands fa-google"/>FCM ErrorCode reference](https://firebase.google.com/docs/reference/fcm/rest/v1/ErrorCode)).

APNs reports both as `BadDeviceToken`. This matters for the fake-token auth probe from the iOS section: on FCM a fake token gives `INVALID_ARGUMENT`, not `UNREGISTERED`. Either one still proves your auth works, since a bad service account fails earlier with `401` or `403`. I wrote my probe expecting `UNREGISTERED`, and correcting the test is how I learned the distinction.

#### Rule 4: wire the `google-services` plugin through prebuild

The [<VPIcon icon="fa-brands fa-google"/>`google-services` plugin](https://developers.google.com/android/guides/google-services-plugin) is what reads your Firebase config into the build. Because Continuous Native Generation regenerates the `android` folder on every `prebuild`, a [<VPIcon icon="iconfont icon-expo"/>config plugin](https://docs.expo.dev/config-plugins/introduction/) has to re-place `google-services.json` and re-add the Gradle wiring each time, or the setting is lost on the next prebuild.

```js title="plugins/withAndroidFcm.js"
function withGoogleServicesJson(config) {
  // withDangerousMod runs arbitrary filesystem work during prebuild. It is
  // "dangerous" because nothing validates the result. It is also the only way
  // to place a file the Gradle plugin expects to already exist.
  return withDangerousMod(config, ["android", (cfg) => {
    // Kept at the repo root, gitignored, and copied in on every prebuild.
    const src = path.join(cfg.modRequest.projectRoot, "google-services.json");
    // Must land in android/app/, where the google-services plugin looks for it.
    const dest = path.join(cfg.modRequest.platformProjectRoot, "app", "google-services.json");

    // Fail loudly at prebuild. Without this the build succeeds, the app starts,
    // and FCM initialisation quietly no-ops at runtime.
    if (!fs.existsSync(src)) {
      throw new Error("[withAndroidFcm] google-services.json not found at project root");
    }

    fs.copyFileSync(src, dest);
    return cfg;
  }]);
}
// plus withProjectBuildGradle for the classpath,
// and withAppBuildGradle to apply the plugin.
```

Have it throw when the file is missing. Failing fast at prebuild beats a mystery at runtime.

### The Honest Caveat

A data message can be dropped under [<VPIcon icon="fa-brands fa-android"/>Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) or after a force-kill. An iOS Live Activity is system-owned and updates regardless. High priority helps. This is a platform limitation to document rather than engineer around. Test with the app backgrounded, not swiped away, and be honest with your product team about the difference.

---

## Three UX Gaps the Naïve Implementation Leaves

Because your code owns the Android side, you inherit three responsibilities that iOS handles quietly for you. I shipped all three only after hitting each one in testing.

### Tapping the Notification Does Nothing

`NotificationCompat` posts happily, but with no `setContentIntent(PendingIntent)` there is no tap target, so Android just expands and collapses the notification. Nothing in the documentation shouts this at you.

```kotlin
private fun launchIntent(ctx: Context, activityId: String): PendingIntent? {
  // Ask the package manager for our own launcher intent, rather than naming
  // MainActivity. Under Expo's Continuous Native Generation that class name is
  // generated, so hardcoding it breaks on the next prebuild.
  val intent = ctx.packageManager.getLaunchIntentForPackage(ctx.packageName)
    // SINGLE_TOP: reuse the existing task instead of stacking a second copy.
    // CLEAR_TOP: drop anything above it, so the user lands on the tracking screen.
    ?.apply { flags = Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP }
    ?: return null

  return PendingIntent.getActivity(
    ctx,
    // The request code. Keyed per activity so two concurrent deliveries get
    // two distinct PendingIntents rather than silently sharing one.
    notificationIdFor(activityId),
    intent,
    // FLAG_IMMUTABLE is mandatory on Android 12+; omit it and this throws.
    // FLAG_UPDATE_CURRENT refreshes the extras of the existing PendingIntent
    // rather than handing back a stale one from an earlier delivery.
    PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
  )
}
```

[<VPIcon icon="fa-brands fa-android"/>`FLAG_IMMUTABLE`](https://developer.android.com/reference/android/app/PendingIntent#FLAG_IMMUTABLE) is required on Android 12 and later. Verify the result with `adb shell dumpsys notification`, which should show `contentIntent=PendingIntent{... startActivity}`.

### A Push Updates the Notification But Not Your Interface

The service is a separate entry point from your JavaScript state, so a push arriving while the app is open leaves the app showing a stale step. The fix is a static bridge, set when a module instance exists and cleared when it does not.

```kotlin
companion object {
  // Static, because the FCM service cannot reach a module INSTANCE. @Volatile
  // because the service runs on a different thread than the one that sets this.
  // Nullable because, most of the time, there is no live module to emit into.
  @Volatile private var pushEmitter: ((Map<String, String>) -> Unit)? = null

  // Safe to call from anywhere. The `?.` is the entire "is the app alive?" check.
  fun emitPush(data: Map<String, String>) { pushEmitter?.invoke(data) }
}

override fun definition() = ModuleDefinition {
  // Declares the events JS may subscribe to. Emitting an undeclared name throws.
  Events("onFcmTokenReceived", "onDeliveryPush")

  // Register the bridge when a module instance exists...
  OnCreate  { pushEmitter = { data -> sendEvent("onDeliveryPush", data) } }
  // ...and tear it down when it does not. Skip this and you leak a closure
  // holding a dead React context, then crash on the next push.
  OnDestroy { pushEmitter = null }
  // ...
}
```

The service calls `DroptrackLiveModule.emitPush(d)` after `notify()`. It does nothing when the app is dead, in which case the notification still updates and there's simply nothing to sync. This is the Android analogue of the iOS foreground resync.

### A Cold-started App Comes Up Empty

iOS recovers from `Activity.activities`. Android has no such store, so a killed app reopened by tapping its own notification shows "Not tracking". Persist the delivery to [<VPIcon icon="fa-brands fa-android"/>`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences) on every `notify()`, then read it back.

```kotlin
// Same JS name as the iOS implementation, so App.tsx never branches on platform.
AsyncFunction("getRunningActivities") {
  val ctx = context ?: return@AsyncFunction emptyList<Map<String, Any?>>()

  // Our stand-in for iOS's Activity.activities: the record written on notify().
  val active = DeliveryNotifier.activeDelivery(ctx)
    ?: return@AsyncFunction emptyList<Map<String, Any?>>()
  val activityId = active["activityId"] as String

  // Phantom guard: trust the system's notification list over our own record.
  if (!DeliveryNotifier.isActive(ctx, activityId)) {
    DeliveryNotifier.clear(ctx)
    return@AsyncFunction emptyList<Map<String, Any?>>()
  }

  // Repopulate the per-process map, or a later update/end throws after cold start.
  deliveries[activityId] = DeliveryInfoRecord().apply { orderId = active["orderId"] as String }
  return@AsyncFunction listOf(active)
}
```

Two subtleties here I only found by breaking them. Guard the rehydration with [<VPIcon icon="fa-brands fa-android"/>`getActiveNotifications()`](https://developer.android.com/reference/android/app/NotificationManager#getActiveNotifications()). Without that check, a stale record produces an uncancellable phantom delivery whose Cancel button throws `ActivityNotFoundException`. And make `endDelivery` forgiving. If the activity isn't in the in-memory map because you cold-started, still cancel the notification and clear the state rather than throwing. Tearing something down should never fail because you've forgotten about it.

Because the resync effect in `App.tsx` is cross-platform, implementing Android's `getRunningActivities()` lights up the existing cold-start path with no JavaScript changes. That's the payoff of keeping one API across two backends.

---

## How to Script the Simulators and Devices

Two small tools saved more time than any feature.

The iOS simulator has no scriptable tap. There's no `uiautomator` equivalent, and synthetic clicks need macOS accessibility grants. So I added a development-only deep-link driver, fifteen lines, stripped from release builds.

```ts
useEffect(() => {
  // Dead code in release builds: the bundler strips the whole effect body.
  if (!__DEV__) return;

  // "droptrack://drive/next" -> "next" -> call actions.next().
  // actionsRef, not actions: the listener is registered once, so a plain
  // closure would capture the first render's handlers forever.
  const run = (url: string) => actionsRef.current[url.split("/").pop() ?? ""]?.();

  // Case 1: app already running. simctl openurl fires this event.
  const sub = Linking.addEventListener("url", ({ url }) => run(url));

  // Case 2: devicectl --payload-url COLD-STARTS the app: the URL arrives as the
  // initial URL and never fires the 'url' event. Handle both or device
  // automation silently does nothing while simulator automation works.
  void Linking.getInitialURL().then((url) => url && run(url));

  return () => sub.remove();
}, []);
```

```sh
# Drives the running app one step forward, with no tap and no accessibility grant.
xcrun simctl openurl booted "com.fasarticle.droptrack://drive/next"
```

For the push half I built a small web dispatcher. A browser cannot reach APNs or FCM, because of HTTP/2, missing cross-origin headers, and the fact that signing keys must never leave the server. So it talks to a zero-dependency local Node.js signing server that scrapes push tokens off the device console, streams them to the browser with server-sent events, and sends to whichever platform you select.

```text
iPhone  --NSLog--> devicectl --console --+
Android --Log.i--> adb logcat -----------+
                                         | scrape
browser <--SSE /events-- dispatch-server (127.0.0.1:8787)
   --POST /push--------> apns.mjs / fcm.mjs --> APNs / FCM --> device
```

Pick a step, pick a courier, and press one button. It turns a two-minute test into a ten-second one, and it made the Samsung investigation below possible at all.

![The DropTrack web dispatcher, one control plane for iOS and Android pushes](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/ac41eefe-7672-4668-a26d-2e375879621b.png)

---

## How iOS and Android Compare

|  | iOS Live Activity | Android Live Update |
| --- | --- | --- |
| Introduced | iOS 16.1 and 16.2 | Android 16 (API 36), promotion in 36.1 |
| Interface | Custom SwiftUI in a widget extension | System `ProgressStyle` template, custom `RemoteViews` not allowed when promoted |
| Surfaces | Lock screen and Dynamic Island, plus Mac via Continuity | Shade, status-bar chip, promoted lock-screen slot |
| Update while app closed | Per-activity APNs token. The system updates the widget | Re-post the same notification id. Remote means an FCM data message that wakes your service |
| Progress bar | Hand-built, an `HStack` of capsules | `ProgressStyle` segments and points |
| Promotion rules | Automatic once started | Permission, request, ongoing, title, allowed style, importance above `MIN`, not colorized |
| Push auth | ES256 `.p8` key, HTTP/2 | Service-account RS256 to OAuth token, plain HTTPS |
| Payload decoding | The system decodes into your `Codable`. A mismatch drops silently | You parse it yourself in your service |
| Cold-start recovery | `Activity.activities`, owned by the system | You persist and read it back yourself |
| Tap to open | Free | You must attach a content `PendingIntent` |
| Delivery guarantee | System-owned and reliable | Data message, droppable under Doze or force-kill |

---

## The Samsung Reality Check

Version numbers lie, and Samsung is where they lie loudest. I tested by hand across three real Galaxy devices using [<VPIcon icon="fas fa-globe"/>Samsung Remote Test Lab](https://developer.samsung.com/remote-test-lab), whose Remote Debug Bridge turns out to be a full local `adb` tunnel to a phone in Korea. The entire emulator automation playbook (granting permissions, tapping, taking screenshots, and reading `dumpsys`) works unchanged against remote hardware.

Here's what the same unmodified APK did on each:

| Device | One UI / SDK | `canPostPromotedNotifications()` | What actually showed |
| --- | --- | --- | --- |
| Galaxy S25 Ultra | 8.0 / 36.0 | `false` | Nothing. No chip, no promoted card |
| Galaxy S26 Ultra | 8.5 / 36.1 | `true` | Top-of-shade pinning and a status-bar icon |
| Galaxy A37 (mid-range) | 8.5 / 36.1 | `true` | Same as the S26 |

Two findings come out of that table.

### 1. On the base-36 device, the two capability checks disagree

The S25 Ultra runs base 36, which has no promotion pipeline, so nothing promotes. But `hasPromotableCharacteristics()` returns `true` there (Samsung backported some framework pieces) while `canPostPromotedNotifications()` returns `false`. A base-36 Pixel emulator returns `false` for both. So you can't infer one check from the other. Detect both at runtime, and trust `canPostPromotedNotifications()` for whether promotion will actually happen.

### 2. On the 36.1 devices, promotion works but only partly

Both the S26 Ultra and the A37 genuinely grant `FLAG_PROMOTED_ONGOING` to the unmodified APK, which you can confirm in `dumpsys`. You get top-of-shade pinning and the status-bar icon. You do *not* get the chip pill, the lock-screen card, or a Now Bar entry, even though the promotion succeeded.

![DropTrack promoted to the top of the shade on Samsung One UI 8.5](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/71557971-c9d3-4936-ab7d-1ee9b2b779ef.png)

That "only partly" was the mystery, until I found where the missing surfaces went. In Settings, under Lock screen and Always On Display, there's a page called Live notifications (searchable as "live notification", notably not as "Now bar"). It promises exactly the surfaces I was missing: the lock screen, the status bar, and the top of the notification panel, illustrated with the Now Bar pill. And directly below that promise sits a fixed, six-app allowlist: Audio broadcast, Emergency sharing, Google Finance, Maps, Media player, and Sports from Google.

DropTrack isn't on that list. Yet its promoted delivery was live on that very device at that very second, and the page's own "Not seeing Live notifications?" checklist (three notification permissions) was fully satisfied. The feature was working. Samsung simply doesn't offer its best surfaces to apps outside the six.

![Samsung's Live notifications settings page showing a fixed six-app allowlist](https://cdn.hashnode.com/uploads/covers/66c84fbe8c8c80534346db05/5b2ad0b1-7c3d-4b96-ab37-8d82c72b09fb.png)

So the screenshot-backed conclusion for these units is this: One UI 8.5 accepts Google's promotion contract and ships the minor surfaces to any app, but reserves the headline ones for a hardcoded list. This reflects those specific devices at the time of testing, and Samsung may change it.

It leaves the three platforms in three different places. Apple offers a public API on every device. Google offers a public API on its own hardware. Samsung offers the framework to everyone but keeps the best stage by invitation.

---

## The Demo Repository

Everything in this handbook is one working project, [DropTrack (<VPIcon icon="iconfont icon-github"/>`FastheDeveloper/LiveActivity`)](https://github.com/FastheDeveloper/LiveActivity), released under the MIT licence. It's not a snippet dump. It's a single React Native app whose one delivery-tracking feature reaches down through five layers. The point of reading it is to see how those layers connect rather than how any one of them looks in isolation.

Here's what lives in the repo, layer by layer:

| Layer | Where | What is there |
| --- | --- | --- |
| **Mobile app** | <VPIcon icon="fa-brands fa-react"/>`App.tsx`, <VPIcon icon="iconfont icon-typescript"/>`delivery.ts` | The React Native UI and the one cross-platform TypeScript API (`startDelivery` / `updateDelivery` / `endDelivery`) that both native sides implement |
| **iOS native** | <VPIcon icon="fas fa-folder-open"/>`modules/droptrack-live/ios/`, <VPIcon icon="fas fa-folder-open"/>`targets/widgets/` | The Swift ActivityKit bridge and the SwiftUI widget with its four presentations, the segmented bar, and the reassignment treatment |
| **Android native** | <VPIcon icon="fas fa-folder-open"/>`modules/droptrack-live/android/` | The Kotlin `NotificationCompat` builder, the promotion logic, and the `FirebaseMessagingService` that re-posts from a push |
| **Web** | <VPIcon icon="fa-brands fa-react"/>`DispatcherConsole.tsx`, <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`dispatchClient.ts` | The Expo-web dispatcher console, a browser UI for composing and firing pushes at a chosen device |
| **Backend** | <VPIcon icon="fas fa-folder-open"/>`scripts/` | The APNs client (about 100 lines) and the FCM client (about 80 lines) written from scratch with no push libraries, plus the local signing server that ties the console to real devices |

A few things make it worth cloning rather than skimming:

- **It genuinely runs on all three surfaces:** The same `DeliveryState` object drives a SwiftUI Live Activity, an Android promoted notification, and a web console, so you can watch one API produce three very different results.
- **The push clients have no dependencies:** <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="fa-brands fa-js"/>`apns.mjs` and <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="fa-brands fa-js"/>`fcm.mjs` use only Node built-ins, so you can read the entire APNs and FCM path end to end without unpacking a library. Both have small test files next to them.
- **Every gotcha in this article is written up in [<VPIcon icon="fa-brands fa-markdown"/>`GOTCHAS.md` (<VPIcon icon="iconfont icon-github"/>`FastheDeveloper/LiveActivity`)](https://github.com/FastheDeveloper/LiveActivity/blob/main/GOTCHAS.md)**: The long checklist that used to live in this section now lives there, next to the code it refers to, alongside <VPIcon icon="fa-brands fa-markdown"/>`DEVLOG.md` (how the build unfolded) and <VPIcon icon="fa-brands fa-markdown"/>`ARTICLE_NOTES.md`.
- **It's safe to fork:** The Firebase service account, the <VPIcon icon="iconfont icon-json"/>`google-services.json`, and the APNs `.p8` key are all gitignored, so nothing sensitive is in the history. The <VPIcon icon="fa-brands fa-markdown"/>`README.md` lists exactly which of those you supply to run the push phase yourself.

Clone it, run the app on a simulator, open the web console, and push an update to your own device. That loop is the fastest way to make everything above concrete.

---

## What to Know Before You Start

**The product feature is identical, and the platform contracts are opposites.** iOS gives you a system-owned widget and updates it for you. Android gives you a notification and makes you the update engine, down to re-posting it from a background service on every message. Design your module's seam accordingly. The same three-function API can hide wildly different machinery, and that is exactly what a good native module is for.

**The silent failures are the tax.** Almost every hard bug in this project, from the mismatched widget struct, to the missing entitlement, the wrong epoch, the un-promoted notification, and the `notification`-instead-of-`data` message, fails with zero errors. So instrument aggressively. Log promotable characteristics. Verify entitlements survived signing. Probe push auth with fake tokens before you involve a device. Always confirm on the real surface rather than trusting a `200`.

**Version numbers lie, so detect features instead.** Android 16 is two releases. Samsung's Android 16 is a third. `canPostPromotedNotifications()` and `hasPromotableCharacteristics()` can disagree on the same build. Check both at runtime, and never infer one from the other.

**The system owns the activity, not your process.** On iOS the activity outlives your variable, your React state, and your process. On Android the notification outlives your process too, but nothing recovers it for you. Both platforms punish you for assuming the id in your `useState` is the source of truth.

---

## Conclusion

You now have a complete picture of both platforms. You built one TypeScript API over two native backends, a SwiftUI widget with four presentations, a Kotlin notification that satisfies Android's promotion contract, and two push clients written from scratch with no libraries. You also know the failure modes that produce no error message, which is most of them.

Three things are worth exploring next:

1. **Push-to-start, on iOS 17.2 and later.** You can start a Live Activity from a push, with no app launch at all. The token is per-app rather than per-activity, which rewrites the token plumbing described above.
2. **Broadcast channels, on iOS 18.** One push updates an activity for many users, which suits live scores. Every push in this handbook targets a single token.
3. **An Android foreground service.** It narrows the Doze and force-kill delivery gap. It won't close it, but it makes long-running deliveries more durable than a bare data message.

The interesting part was never `Activity.request()`. It was everything the two platforms decline to tell you when you get it wrong.

---

## Sources and Further Reading

::: info Apple, ActivityKit and APNs:

- [<VPIcon icon="fa-brands fa-apple"/>ActivityKit](https://developer.apple.com/documentation/activitykit) and [<VPIcon icon="fa-brands fa-apple"/>`ActivityAttributes`](https://developer.apple.com/documentation/activitykit/activityattributes)
- [<VPIcon icon="fa-brands fa-apple"/>Displaying live data with Live Activities](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)
- [<VPIcon icon="fa-brands fa-apple"/>Starting and updating Live Activities with ActivityKit push notifications](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications)
- [<VPIcon icon="fa-brands fa-apple"/>Live Activities, Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/live-activities)
- [<VPIcon icon="fa-brands fa-apple"/>The `aps-environment` entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/aps-environment)
- [<VPIcon icon="fa-brands fa-apple"/>Sending notification requests to APNs](https://developer.apple.com/documentation/usernotifications/sending-notification-requests-to-apns), [<VPIcon icon="fa-brands fa-apple"/>Establishing a token-based connection to APNs](https://developer.apple.com/documentation/usernotifications/establishing-a-token-based-connection-to-apns), and [<VPIcon icon="fa-brands fa-apple"/>Handling notification responses from APNs](https://developer.apple.com/documentation/usernotifications/handling-notification-responses-from-apns)
- [<VPIcon icon="fa-brands fa-apple"/>`Date`, and the 2001 reference date](https://developer.apple.com/documentation/foundation/date)
- [<VPIcon icon="fa-brands fa-apple"/>WidgetKit](https://developer.apple.com/documentation/widgetkit)

:::

::: info Android and Firebase:

- [<VPIcon icon="fa-brands fa-android"/>Progress-centric notifications in Android 16](https://developer.android.com/about/versions/16/features/progress-centric-notifications) and [<VPIcon icon="fa-brands fa-android"/>Android 16 overview](https://developer.android.com/about/versions/16)
- [<VPIcon icon="fa-brands fa-android"/>`Notification.ProgressStyle`](https://developer.android.com/reference/android/app/Notification.ProgressStyle) and [<VPIcon icon="fa-brands fa-android"/>`NotificationCompat.ProgressStyle`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.ProgressStyle)
- [<VPIcon icon="fa-brands fa-android"/>`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder), where `setRequestPromotedOngoing` and `setShortCriticalText` are backported
- [<VPIcon icon="fa-brands fa-android"/>`Build.VERSION.SDK_INT_FULL`](https://developer.android.com/reference/android/os/Build.VERSION#SDK_INT_FULL) and [<VPIcon icon="fa-brands fa-android"/>`Build.VERSION_CODES_FULL`](https://developer.android.com/reference/android/os/Build.VERSION_CODES_FULL), the 36 versus 36.1 distinction
- [<VPIcon icon="fa-brands fa-android"/>`NotificationManager.canPostPromotedNotifications()`](https://developer.android.com/reference/android/app/NotificationManager#canPostPromotedNotifications()), [<VPIcon icon="fa-brands fa-android"/>`Notification.hasPromotableCharacteristics()`](https://developer.android.com/reference/android/app/Notification#hasPromotableCharacteristics()), and [<VPIcon icon="fa-brands fa-android"/>`getActiveNotifications()`](https://developer.android.com/reference/android/app/NotificationManager#getActiveNotifications())
- [<VPIcon icon="fa-brands fa-android"/>`PendingIntent.FLAG_IMMUTABLE`](https://developer.android.com/reference/android/app/PendingIntent#FLAG_IMMUTABLE) and [<VPIcon icon="fa-brands fa-android"/>`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)
- [<VPIcon icon="fa-brands fa-android"/>`androidx.core` release notes](https://developer.android.com/jetpack/androidx/releases/core)
- [<VPIcon icon="fa-brands fa-android"/>Doze and App Standby](https://developer.android.com/training/monitoring-device-state/doze-standby)
- [<VPIcon icon="fa-brands fa-google"/>Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging), [<VPIcon icon="fa-brands fa-google"/>Receive messages in an Android app](https://firebase.google.com/docs/cloud-messaging/android/receive), [<VPIcon icon="fa-brands fa-google"/>`FirebaseMessagingService`](https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/FirebaseMessagingService), [<VPIcon icon="fa-brands fa-google"/>`projects.messages.send`](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages/send), and the [<VPIcon icon="fa-brands fa-google"/>FCM `ErrorCode` reference](https://firebase.google.com/docs/reference/fcm/rest/v1/ErrorCode)
- [<VPIcon icon="fa-brands fa-google"/>Using OAuth 2.0 for server to server applications](https://developers.google.com/identity/protocols/oauth2/service-account) and the [<VPIcon icon="fa-brands fa-google"/>`google-services` Gradle plugin](https://developers.google.com/android/guides/google-services-plugin)

:::

::: info Apps that document their own Live Activity, cited in "Where You Have Already Seen This Feature":

- [<VPIcon icon="fa-brands fa-apple"/>Chowdeck](https://apps.apple.com/us/app/chowdeck-food-delivery/id1530676376), [<VPIcon icon="fa-brands fa-apple"/>ESPN](https://apps.apple.com/us/app/espn-live-sports-scores/id317469184), [<VPIcon icon="fa-brands fa-apple"/>MLB](https://apps.apple.com/us/app/mlb/id493619333), [<VPIcon icon="fa-brands fa-apple"/>FotMob](https://apps.apple.com/us/app/fotmob-soccer-live-scores/id488575683), [<VPIcon icon="fa-brands fa-apple"/>CARROT Weather](https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574), and [<VPIcon icon="fa-brands fa-apple"/>Structured](https://apps.apple.com/us/app/structured-daily-planner-todo/id1499198946), all via their App Store listings
- [Flighty's Live Activities help page](https://flighty.com/help/live-activities-widgets)
- [<VPIcon icon="fa-brands fa-apple"/>Apple Sports, following games in real time](https://support.apple.com/guide/apple-sports-app/follow-games-in-real-time-apdc0cb7ad64/web)
- MacRumors on [Uber Eats, May 2023](https://macrumors.com/2023/05/02/uber-eats-live-activities/) and [DoorDash, December 2023](https://macrumors.com/2023/12/04/doordash-rolling-out-live-activities/)
- MacStories, [the iOS 16.1 Live Activities roundup](https://macstories.net/reviews/ios-16-1-and-apps-with-live-activities-the-macstories-roundup-part-1/)

:::

::: info React Native, Expo, and tooling:

- [<VPIcon icon="iconfont icon-expo"/>Expo Modules API overview](https://docs.expo.dev/modules/overview/) and the [<VPIcon icon="iconfont icon-expo"/>module API reference](https://docs.expo.dev/modules/module-api/)
- [<VPIcon icon="iconfont icon-expo"/>Expo config plugins](https://docs.expo.dev/config-plugins/introduction/) and [<VPIcon icon="iconfont icon-expo"/>Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)
- [`@bacons/apple-targets` (<VPIcon icon="iconfont icon-github"/>`EvanBacon/expo-apple-targets`)](https://github.com/EvanBacon/expo-apple-targets), which generates the widget extension
- [`expo-live-activity` (<VPIcon icon="iconfont icon-github"/>`software-mansion-labs/expo-live-activity`)](https://github.com/software-mansion-labs/expo-live-activity), the packaged alternative
- [Notifee (<VPIcon icon="iconfont icon-github"/>`invertase/notifee`)](https://github.com/invertase/notifee), archived, and its last release [`@notifee/react-native@9.1.8`](https://npmjs.com/package/@notifee/react-native)
- React Native [`AppState`](https://reactnative.dev/docs/appstate) and [`Linking`](https://reactnative.dev/docs/linking)
- Node.js [<VPIcon icon="fa-brands fa-node"/>`crypto`](https://nodejs.org/api/crypto.html) and [<VPIcon icon="fa-brands fa-node"/>`http2`](https://nodejs.org/api/http2.html)
- [RFC 7519, JSON Web Token](https://datatracker.ietf.org/doc/html/rfc7519) and [RFC 7518, JSON Web Algorithms](https://datatracker.ietf.org/doc/html/rfc7518), which define the ES256 and RS256 signature formats
- [Samsung Remote Test Lab](https://developer.samsung.com/remote-test-lab)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The React Native Live Activities Handbook: How to Build iOS Live Activities and Android 16 Live Updates",
  "desc": "A Live Activity is the card that sits on your lock screen while a delivery rider approaches, updating itself without you opening the app. Apple shipped the API in iOS 16.1. Google shipped its own vers",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-native-live-activities-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
