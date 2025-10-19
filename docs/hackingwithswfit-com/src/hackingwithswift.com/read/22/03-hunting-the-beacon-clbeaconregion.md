---
lang: ko-KR
title: "Hunting the beacon: CLBeaconRegion"
description: "Article(s) > Hunting the beacon: CLBeaconRegion"
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
      content: "Article(s) > Hunting the beacon: CLBeaconRegion"
    - property: og:description
      content: "Hunting the beacon: CLBeaconRegion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/22/03-hunting-the-beacon-clbeaconregion.html
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
  "title": "Hunting the beacon: CLBeaconRegion | Hacking with iOS",
  "desc": "Hunting the beacon: CLBeaconRegion",
  "link": "https://hackingwithswift.com/read/22/3/hunting-the-beacon-clbeaconregion",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/HcS4U4aOeCI" />

If everything is working, you should have received a large iOS confirmation prompt asking whether you want to grant the app access to your location. This message is really blunt, so users hopefully take a few moments to read it before continuing.

But that prompt is not the only way iOS helps users guard their privacy. If you went for "when in use", you'll still get location information while your app is in the background if you enable the background capability, and iOS will notify users that this is happening by making the device status bar blue and saying "YourAppName is using your location." If you went for "always", iOS will wait a few days then ask the user if they still want to grant permission, just to be fully sure.

Assuming everything went well, let's take a look at how we actually range beacons. First, we use a new class called `CLBeaconRegion`, which is used to identify a beacon uniquely. Second, we give that to our `CLLocationManager` object by calling its `startMonitoring(for:)` and `startRangingBeacons(in:)` methods. Once that's done, we sit and wait. As soon as iOS has anything tell us, it will do so.

iBeacons are identified using three pieces of information: a universally unique identifier (UUID), plus a major number and a minor number. The first number is a long hexadecimal string that you can create by running the `uuidgen` in your Mac's terminal. It should identify you or your store chain uniquely.

The major number is used to subdivide within the UUID. So, if you have 10,000 stores in your supermarket chain, you would use the same UUID for them all but give each one a different major number. That major number must be between 1 and 65535, which is enough to identify every McDonalds and Starbucks outlet combined!

The minor number can (if you wish) be used to subdivide within the major number. For example, if your flagship London store has 12 floors each of which has 10 departments, you would assign each of them a different minor number.

The combination of all three identify the user's precise location:

- **UUID:** You're in a Acme Hardware Supplies store.
- **Major:** You're in the Glasgow branch.
- **Minor:** You're in the shoe department on the third floor.

If you don't need that level of detail you can skip minor or even major - it's down to you.

It's time to put this into code, so we're going to create a new method called `startScanning()` that contains the following:

```swift
func startScanning() {
    let uuid = UUID(uuidString: "5A4BCFCE-174E-4BAC-A814-092E77F6B7E5")!
    let beaconRegion = CLBeaconRegion(proximityUUID: uuid, major: 123, minor: 456, identifier: "MyBeacon")

    locationManager?.startMonitoring(for: beaconRegion)
    locationManager?.startRangingBeacons(in: beaconRegion)
}
```

You met `UUID` in project 10, but here we're converting a string into a UUID rather than generating a UUID and converting it to a string. The UUID I'm using there is one of the ones that comes built into the Locate Beacon app - look under "Apple AirLocate 5A4BCFCE" and find it there. Note that I'm scanning for specific major and minor numbers, so please enter those into your Locate Beacon app.

The `identifier` field is just a string you can set to help identify this beacon in a human-readable way. That, plus the UUID, major and minor fields, goes into the `CLBeaconRegion` class, which is used to identify and work with iBeacons. It then gets sent to our location manager, asking it to monitor for the existence of the region and also to start measuring the distance between us and the beacon.

Find the `// do stuff` comment inside the `didChangeAuthorization` method you wrote a few minutes ago, and change it to this:

```swift
startScanning()
```

That method should now be much clearer: we only start scanning for beacons when we have permission and if the device is able to do so.

If you run the app now (on a real device, remember!) you'll see that it literally looks identical, as if we needn't have bothered writing any iBeacon code. But behind the scenes, detection and ranging *is* happening, we're just not doing anything with it!

This app is going to change the label text and view background color to reflect proximity to the beacon we're scanning for. This will be done in a single method, called `update(distance:)`, which will use a switch/case block and animations in order to make the transition look smooth. Let's write that method first:

```swift
func update(distance: CLProximity) {
    UIView.animate(withDuration: 1) {
        switch distance {
        case .unknown:
            self.view.backgroundColor = UIColor.gray
            self.distanceReading.text = "UNKNOWN"

        case .far:
            self.view.backgroundColor = UIColor.blue
            self.distanceReading.text = "FAR"

        case .near:
            self.view.backgroundColor = UIColor.orange
            self.distanceReading.text = "NEAR"

        case .immediate:
            self.view.backgroundColor = UIColor.red
            self.distanceReading.text = "RIGHT HERE"
        }
    }
}
```

Most of that is just choosing the right color and text, but you'll notice the method accepts a `CLProximity` as its parameter.

Now, in theory this can only be be one of our four distance values, which is why we have a `default` case in there. However, Swift should show you a warning because Apple has marked `CLProximity` as an enum that might change in the future - they might add more fine-grained values, for example. 

This is only a *warning* rather than an *error* because you can build ship your code without covering future cases if you want to. However, if you do that you risk running into problems in the future: if Apple added an extra `.farFarAway` case in there, what would your code do?

There are two solutions here: we can add a special case called `@unknown default`, which is specifically there to catch future values. This allows you to cover all the other cases explicitly, then provide one extra case to handle as-yet-unknown cases in the future:

```swift
@unknown default:
    self.view.backgroundColor = .black
    self.distanceReading.text = "WHOA!"
```

In this app, though, it’s easier to treat unknown future cases as a regular unknown case, so instead I would recommend you write this:

```swift
func update(distance: CLProximity) {
    UIView.animate(withDuration: 0.8) {
        switch distance {
        case .far:
            self.view.backgroundColor = UIColor.blue
            self.distanceReading.text = "FAR"

        case .near:
            self.view.backgroundColor = UIColor.orange
            self.distanceReading.text = "NEAR"

        case .immediate:
            self.view.backgroundColor = UIColor.red
            self.distanceReading.text = "RIGHT HERE"

        default:
            self.view.backgroundColor = UIColor.gray
            self.distanceReading.text = "UNKNOWN"
        }
    }
}
```

With that method written, all that remains before our project is complete is to catch the ranging method from `CLLocationManager`. We'll be given the array of beacons it found for a given region, which allows for cases where there are multiple beacons transmitting the same UUID.

If we receive any beacons from this method, we'll pull out the first one and use its `proximity` property to call our `update(distance:)` method and redraw the user interface. If there aren't any beacons, we'll just use `.unknown`, which will switch the text back to "UNKNOWN" and make the background color gray.

Here's the code:

```swift
func locationManager(_ manager: CLLocationManager, didRangeBeacons beacons: [CLBeacon], in region: CLBeaconRegion) {
    if let beacon = beacons.first {
        update(distance: beacon.proximity)
    } else {
        update(distance: .unknown)
    }
}
```

With that, your code is done. Run it on a device, make sure Locate Beacon is up and transmitting, and enjoy your location-aware app!

