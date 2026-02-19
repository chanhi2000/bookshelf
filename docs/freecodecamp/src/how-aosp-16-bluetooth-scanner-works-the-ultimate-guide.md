---
lang: en-US
title: "How AOSP 16 Bluetooth Scanner Works: The Ultimate Guide"
description: "Article(s) > How AOSP 16 Bluetooth Scanner Works: The Ultimate Guide"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - jdk
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How AOSP 16 Bluetooth Scanner Works: The Ultimate Guide"
    - property: og:description
      content: "How AOSP 16 Bluetooth Scanner Works: The Ultimate Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-aosp-16-bluetooth-scanner-works-the-ultimate-guide.html
prev: /programming/java-android/articles/README.md
date: 2026-02-05
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770234863523/44a1690e-ab8a-4f6b-a12b-2c2636947d8c.png
---

# {{ $frontmatter.title }} 관련

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
  name="How AOSP 16 Bluetooth Scanner Works: The Ultimate Guide"
  desc="Ah, Bluetooth. The technology we all love to hate. It's like that one friend who's always just about to connect, but then... doesn't. For years, Android developers have been locked in a dramatic, often tragic, romance with Bluetooth. We've wrestled w..."
  url="https://freecodecamp.org/news/how-aosp-16-bluetooth-scanner-works-the-ultimate-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770234863523/44a1690e-ab8a-4f6b-a12b-2c2636947d8c.png"/>

Ah, Bluetooth. The technology we all love to hate. It's like that one friend who's always just about to connect, but then... doesn't.

For years, Android developers have been locked in a dramatic, often tragic, romance with Bluetooth. We've wrestled with its quirks, begged it to just work, and shed silent tears over its mysterious connection drops.

But what if I told you that things are about to get better? What if I told you that with Android 16, the Bluetooth gods have finally smiled upon us? It's not a dream, my friends. It's the AOSP 16 Bluetooth Scanner, and it's here to bring a new hope to our weary developer souls.

In this handbook, we're going on a journey. A journey into the heart of AOSP 16's new Bluetooth features. We'll laugh, we'll cry (hopefully from joy this time), and we'll learn how to wield these new powers for good. We'll explore the magic of passive scanning, the drama of bond loss reasons, and the sheer convenience of getting service UUIDs without all the usual fuss.

By the end of this epic saga, you'll be able to:

- Build a Bluetooth scanner that's so efficient, it's practically psychic.
- Debug connection issues like a seasoned detective.
- Impress your friends and colleagues with your newfound Bluetooth mastery.

::: note Prerequisites

Before we dive in, it's a good idea to have a basic understanding of Android development and Kotlin. If you've ever tried to make two devices talk to each other and ended up wanting to throw your computer out the window, you're more than qualified.

So grab your favorite beverage, put on your coding cape, and let's get ready for the Bluetooth awakening!

:::

---

## A Brief History of Bluetooth (Or: How We Learned to Stop Worrying and Love the Radio Waves)

### The Dark Ages: Classic Bluetooth

In the beginning, there was Classic Bluetooth. It was the digital equivalent of a loud, boisterous party guest. It could carry a lot of data (like your favorite tunes to a speaker), but it sure was a battery hog. It was great for streaming audio, but for small, infrequent data transfers? It was like using a fire hose to water a houseplant. Overkill, and frankly, a little messy.

Developers in this era spent their days wrestling with BluetoothAdapter, BluetoothDevice, and the dreaded BluetoothSocket. It was a time of great uncertainty, where a simple connection could take seconds, or... well, let's just say you could go make a cup of coffee. And the battery drain? Your users would watch their phone's power level plummet faster than a lead balloon.

### The Renaissance: Enter Bluetooth Low Energy (BLE)

Then, with Android 4.3, a new hero emerged: Bluetooth Low Energy, or BLE. This wasn't your dad’s Bluetooth. BLE was sleek, efficient, and mysterious. It was designed for short bursts of data, sipping power like a fine wine instead of chugging it.

BLE was the cool kid on the block. It introduced us to a whole new world of possibilities: heart-rate monitors, smart watches, and a million and one IoT devices that could run for months on a single coin-cell battery. It was a game-changer.

But with great power came... great complexity. We had to learn a whole new language of GATT, GAP, services, and characteristics. It was like going from writing simple scripts to composing a full-blown opera. The potential was huge, but the learning curve was steep.

### The Problem Child: Scanning

And then there was scanning. The act of finding these new, power-sipping devices. In the early days of BLE, scanning was still a bit of a wild west. It was an active, noisy process. Your phone would shout into the void, "IS ANYONE OUT THERE?", and then listen for replies. This worked, but it was still a significant power drain, especially if your app needed to scan for long periods.

It was the classic developer dilemma: you need to find devices, but you don't want to be the reason your user's phone is dead by lunchtime. For years, we walked this tightrope, balancing the need for discovery with the desperate plea for battery life.

This is the world that AOSP 16 was born into. A world crying out for a better way to scan. A world ready for a hero. And that hero, my friends, is passive scanning. But more on that in a bit...

---

## What's New in AOSP 16? (Spoiler: It's Actually Cool)

Alright, let's get to the good stuff. What shiny new toys did the Android team give us in AOSP 16? It turns out, quite a few! But before we unwrap the presents, let's talk about the new delivery schedule, because even that is a little different now.

### A Tale of Two Releases

In a shocking plot twist, Android decided to grace us with two major API releases in 2025. First, we got the main event, Android 16 (codenamed "Baklava," because who doesn't love a good pastry?), which landed in Q2. This is your traditional, big-bang release with all the behavior changes you've come to know and love (or fear).

But then, in Q4, we get a surprise second act: a minor release, which is where our new Bluetooth goodies made their grand entrance. This release is all about new features and APIs, without the scary, app-breaking changes. It's like getting a free dessert after you've already paid the bill.

### The Three Musketeers of Bluetooth

So, what did this Q4 release bring to the Bluetooth party? I'm glad you asked. It brought three new heroes, ready to save us from our Bluetooth woes. I call them... The Three Musketeers.

| **Feature** | **The Gist** | **Why You Should Care** |
| ---: | :--- | :--- |
| **Passive Scanning** | The ability to listen for Bluetooth devices without shouting at them. | Your app can now be a silent, battery-saving ninja.
| **Bond Loss Reasons** | Finally, some closure on why your Bluetooth connections break up. | You can stop playing the guessing game and actually debug connection issues. |
| **Service UUID from Ads** | Grab a device's vital stats directly from its advertisement. | It's like speed dating for Bluetooth devices. Faster, more efficient connections. |

These aren't just minor tweaks, folks. These are quality-of-life improvements that will fundamentally change how we build and debug Bluetooth-enabled apps. It's as if the Android team actually listened to our collective cries for help. (I know, I'm shocked too.)

In the next few sections, we're going to get up close and personal with each of these new features. We'll dive into the code, explore the use cases, and learn how to harness their power. So, get ready to meet our first musketeer: the strong, silent type known as Passive Scanning.

---

## Deep Dive #1: Passive Scanning

Imagine you're in a library. You're looking for a friend, but you don't know where they are. You have two options:

- **Active Scanning:** You stand in the middle of the library and shout, "HEY, STEVE! ARE YOU HERE?" This is effective, but it's also loud, disruptive, and will get you kicked out by the librarian (who, in this analogy, is your user's battery).
- **Passive Scanning:** You quietly walk around the library, listening for your friend's distinctive, wheezing laugh. You don't say a word. You just listen. This is stealthy, efficient, and won't drain your social (or actual) battery.

For years, Android's Bluetooth scanning has been the guy shouting in the library. But with AOSP 16, we can finally be the quiet listener. This is the magic of passive scanning.

### Active vs. Passive: The Technical Showdown

In the world of BLE, devices send out little packets of information called "advertisements." It's their way of saying, "Hey, I'm here, and this is what I do!"

- **Active Scanning:** When your phone performs an active scan, it hears an advertisement and then sends back a SCAN_REQ (Scan Request). It's basically saying, "Tell me more!" The peripheral device then replies with a SCAN_RSP (Scan Response), which contains extra information.
- **Passive Scanning:** With passive scanning, your phone hears the advertisement... and that's it. It doesn't send anything back. It just takes note of the initial advertisement and moves on. It's a one-way conversation.

### Why Go Passive? The Power of Silence

So, why is this such a big deal? Two words: power consumption. Every time your phone's radio has to transmit something (like a SCAN_REQ), it uses energy. If your app is scanning for devices all the time, those little transmissions add up, and your user's battery pays the price.

By switching to passive scanning, you're telling the radio to just listen. No talking, just listening. This dramatically reduces the power needed for scanning, making it a perfect solution for apps that need to monitor for nearby devices over long periods.

### The Code: How to Become a Bluetooth Ninja

So, how do we implement this newfound stealth mode? It's surprisingly simple. It all comes down to the ScanSettings you use when you start your scan.

Previously, you might have done something like this:

```kotlin
val settings = ScanSettings.Builder()
    .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
    .build()
```

Now, with AOSP 16, we have a new option. To enable passive scanning, you simply set the scan type:

```kotlin
// This is the magic line!
.setScanMode(ScanSettings.SCAN_TYPE_PASSIVE)
```

Wait, that can't be right. The documentation says SCAN_TYPE_PASSIVE is a scan type, not a scan mode. And you're right! My apologies, I got a little too excited. The correct way to do this is by setting the scan mode to passive. Let's try that again.

```kotlin
val settings = ScanSettings.Builder()
    // The actual magic line!
    .setScanMode(ScanSettings.SCAN_MODE_OPPORTUNISTIC) // This is the closest to passive
    .build()
```

Hold on, that's not quite right either. It seems I've gotten my wires crossed. Let's consult the official scrolls... Ah, here it is! The ScanSettings.Builder has a new method in Android 16 QPR2. It's not setScanMode, it's a whole new setting.

Let's get this right once and for all. Here is the correct way to enable passive scanning:

```kotlin
// Available in Android 16 QPR2 and later
val settings = ScanSettings.Builder()
    // This is the REAL magic line, I promise!
    .setScanType(ScanSettings.SCAN_TYPE_PASSIVE) 
    .build()
```

And there you have it. With that one line, you've transformed your app from a loud, battery-guzzling tourist to a silent, efficient Bluetooth ninja. Your users' batteries will thank you.

Of course, there's a trade-off. Since you're not sending a SCAN_REQ, you won't get the extra data from the SCAN_RSP. But for many use cases, the initial advertisement is all you need. And the power savings are more than worth it.

Now that we've mastered the art of silent scanning, let's move on to the next piece of the puzzle: understanding the BluetoothLeScanner itself.

---

## Understanding BluetoothLeScanner (The Star of Our Show)

Before we can truly master the art of Bluetooth scanning, we must first understand our primary weapon: the BluetoothLeScanner. Think of it as the PKE Meter from Ghostbusters. It's the tool we use to detect the invisible energy (in our case, BLE advertisements) floating all around us. But how does this ghost-hunting gadget actually work?

### The Architecture: A Peek Behind the Curtain

At a high level, the process is pretty straightforward. Your app, living comfortably in its own little world, decides it wants to find some BLE devices. It grabs an instance of the BluetoothLeScanner and says, "Hey, go look for stuff."

Under the hood, a lot is happening. The BluetoothLeScanner talks to the Android Bluetooth stack (codenamed "Fluoride," which sounds like something your dentist would be very proud of). The stack then communicates with the device's Bluetooth controller, the actual hardware that does the sending and receiving of radio waves. It's a classic case of "it's more complicated than it looks."

### The Alphabet Soup: GATT, GAP, and Friends

When you venture into the world of BLE, you'll quickly run into a whole bunch of acronyms. Don't panic! They're not as scary as they look. The two most important ones to understand are GAP and GATT.

- **GAP (Generic Access Profile):** This is all about how devices discover and connect to each other. Think of GAP as the bouncer at a nightclub. It decides who gets to talk to whom. It manages advertising (the device shouting "I'm here!") and scanning (your app listening for those shouts). Our BluetoothLeScanner is a key player in the GAP-verse.
- **GATT (Generic Attribute Profile):** Once two devices are connected, GATT takes over. It defines how they exchange data. Think of GATT as the actual conversation happening inside the nightclub. It's all about Services, Characteristics, and Descriptors. A device might have a "Heart Rate Service," which contains a "Heart Rate Measurement Characteristic." Your app reads from or writes to these characteristics to get the data it needs.

For the purpose of scanning, we're mostly living in the world of GAP. We're the ones standing outside the club, listening for interesting advertisements.

### The Scanning Lifecycle: A Dramatic Play in Three Acts

The life of a Bluetooth scan is a simple, yet elegant, drama.

- **Act I:** The Preparation. Your app decides it's time to scan. It gets the BluetoothLeScanner, creates a set of ScanFilters (to only find specific devices) and ScanSettings (to define how to scan, like our new passive mode), and defines a ScanCallback.
- **Act II:** The Scan. Your app calls startScan(). The Bluetooth radio springs to life, listening for advertisements that match your filters. When it finds one, it reports back to your app via the onScanResult() method in your ScanCallback.
- **Act III:** The End. When your app has had enough (or, more importantly, when you've found what you're looking for), it calls stopScan(). The radio powers down, and all is quiet once more. It's crucial to always stop your scan when you're done. A rogue scan is the number one cause of "my battery dies in an hour" complaints from users.

And that's the BluetoothLeScanner in a nutshell. It's our gateway to the world of BLE discovery. It's powerful, it's complex, but as we're learning, it's getting smarter and more efficient with every new Android release. Now that we know our tool, let's get our hands dirty and build our first passive scanner!

---

## Hands-On: Building Your First Passive Scanner

Theory is great, but let's be honest, we're developers. We learn by doing (or by copying pasting from Stack Overflow). It's time to roll up our sleeves, fire up Android Studio, and build something. We're going to create a simple app that uses our newfound passive scanning powers to find nearby BLE devices.

### Step 1: The Permission Inquisition

Before we write a single line of Kotlin, we must appease the Android permission gods. This is a sacred and often frustrating ritual. For Bluetooth scanning, the rules have changed a bit over the years.

First, open your <VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml` and add the following:

```xml title="AndroidManifest.xml"
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

<!-- For Android 12 (API 31) and above -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />

<!-- For older versions, you needed location permissions -->
<!-- You might still need this if you support older devices -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Looking at the permissions we've declared above, you can see the evolution of Android's Bluetooth permission model playing out in real-time.

The first two permissions, `BLUETOOTH` and `BLUETOOTH_ADMIN`, are the old guard. They've been around since the early days of Android and provide basic Bluetooth functionality and the ability to discover devices. Then we have `BLUETOOTH_SCAN`, which was introduced in Android 12 (API 31) and represents a major shift in how Google thinks about privacy.

Yes, you're seeing that right. In the good old days (before Android 12), Google decided that finding a Bluetooth device was basically the same as knowing your user's exact location. It kind of made sense: after all, if you can see which Bluetooth beacons are nearby, you can triangulate your position. But it was also a bit creepy to ask for location just to find a pair of headphones. This led to the awkward situation where users would see a simple Bluetooth scanner app asking for their precise location and understandably get suspicious.

Thankfully, with Android 12, they introduced the `BLUETOOTH_SCAN` permission, which is much more sensible. This permission finally allows apps to scan for Bluetooth devices without needing to ask for location access, which makes a lot more sense from a user perspective. You'll still need to request this permission at runtime, but at least you don't have to explain to your users why your simple gadget-finder app wants to know where they live.

However, notice those last two permissions for location access. Those are the remnants of the old system. If you're building an app that needs to support older devices running Android 11 or below, you'll need to keep these location permissions in your manifest for backwards compatibility. On modern devices, the `BLUETOOTH_SCAN` permission alone will do the job.

### Step 2: The Code Awakens

Alright, let's get to the fun part. Here's a breakdown of how to implement the passive scanner in your Activity or Fragment.

#### Get the Scanner

First, we need to get an instance of the BluetoothLeScanner.

```kotlin
private val bluetoothAdapter: BluetoothAdapter? by lazy {
    val bluetoothManager = getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
    bluetoothManager.adapter
}

private val bleScanner: BluetoothLeScanner? by lazy {
    bluetoothAdapter?.bluetoothLeScanner
}
```

Let's break down what's happening in the code above. We're using Kotlin's `lazy` delegation, which is a fancy way of saying "don't create this object until I actually need it." This is a good practice because getting the Bluetooth adapter involves system calls, and there's no point in doing that work if we never actually use it.

First, we grab the `BluetoothManager` from the system services. Think of the `BluetoothManager` as the gatekeeper to all things Bluetooth on your device. From this manager, we get the `BluetoothAdapter`, which represents your device's physical Bluetooth hardware. Notice that we're declaring it as nullable (`BluetoothAdapter?`) because, believe it or not, not every Android device has Bluetooth. Some tablets or obscure devices might not have the hardware, so we need to be prepared for that possibility.

Once we have the adapter, we can ask it for the `BluetoothLeScanner`. This is the actual object we'll use to perform our scans. Again, we're using the safe call operator (`?.`) because if the adapter is null (no Bluetooth hardware), we definitely can't get a scanner from it. This defensive programming might seem paranoid, but it's what separates apps that crash mysteriously from apps that gracefully handle edge cases.

#### Define the Callback

This is where the magic happens. The ScanCallback is an object that will listen for scan results. We need to override two methods: onScanResult and onScanFailed.

```kotlin
private val scanCallback = object : ScanCallback() {
    override fun onScanResult(callbackType: Int, result: ScanResult) {
        // We found a device! 
        // The 'result' object contains the device, RSSI, and advertisement data.
        Log.d("BleScanner", "Found device: ${result.device.address}, RSSI: ${result.rssi}")
    }

    override fun onScanFailed(errorCode: Int) {
        // This is the universe's way of telling you to take a break.
        // Or that something went horribly wrong.
        Log.e("BleScanner", "Scan failed with error code: $errorCode")
    }
}
```

The `ScanCallback` we've defined above is your app's ears in the Bluetooth world. When the scanner finds a device, it doesn't just store the information somewhere, it actively calls back to your app through this callback object. This is classic event-driven programming, and it's how Android keeps your app responsive without blocking the main thread.

The `onScanResult` method is called every time the scanner discovers a device that matches your filters (or any device if you're not using filters). The `result` parameter is a treasure trove of information. It contains the `BluetoothDevice` object (which has the device's MAC address and name), the RSSI value (Received Signal Strength Indicator – basically how close the device is, with higher numbers meaning closer), and the raw advertisement data that the device is broadcasting.

In our simple example above, we're just logging the MAC address and RSSI, but in a real app, you'd probably want to update your UI, add the device to a list, or trigger a connection.

The `callbackType` parameter tells you *why* this callback was triggered. It could be `CALLBACK_TYPE_ALL_MATCHES` (the default, meaning "here's every device we found"), `CALLBACK_TYPE_FIRST_MATCH` (the first time we saw this device), or `CALLBACK_TYPE_MATCH_LOST` (we haven't seen this device in a while, so it probably left). We'll dive deeper into these types in the advanced section.

Then there's `onScanFailed`, the method we all hope never gets called but that we absolutely need to handle. This is invoked when something goes catastrophically wrong with the scan. Maybe the Bluetooth adapter got turned off mid-scan, maybe your app doesn't have the right permissions, or maybe the Bluetooth controller just had a bad day. The `errorCode` will give you a hint about what went wrong, and you should always log this and handle it gracefully – perhaps by showing a message to the user or attempting to restart the scan after a delay.

#### Configure the Scan

Now, we create our ScanSettings. This is where we tell Android that we want to be a passive, battery-saving ninja.

```kotlin
val scanSettings = ScanSettings.Builder()
    .setScanMode(ScanSettings.SCAN_MODE_LOW_POWER) // Let's be nice to the battery
    .setCallbackType(ScanSettings.CALLBACK_TYPE_ALL_MATCHES)
    .setMatchMode(ScanSettings.MATCH_MODE_AGGRESSIVE)
    .setNumOfMatches(ScanSettings.MATCH_NUM_ONE_ADVERTISEMENT) // Report each ad once
    .setReportDelay(0L) // Report immediately
    // And here's the star of the show!
    .setScanType(ScanSettings.SCAN_TYPE_PASSIVE)
    .build()
```

The `ScanSettings` object we're building above is like a detailed instruction manual for the Bluetooth scanner. Each method call fine-tunes exactly how the scan should behave, and getting these settings right is the difference between a battery-friendly app and one that gets uninstalled within hours.

Let's walk through each setting. First, `setScanMode(SCAN_MODE_LOW_POWER)` tells the scanner to use a low-power scanning mode, which means it will scan in intervals rather than continuously. This is perfect for most use cases where you don't need instant results and want to preserve battery life. The scanner will wake up, scan for a bit, sleep, and repeat. It's the Bluetooth equivalent of taking power naps.

Next, `setCallbackType(CALLBACK_TYPE_ALL_MATCHES)` means we want to be notified every time the scanner finds a matching device. This is the default behavior and is what you'll use most of the time. As we mentioned earlier, you can also use `CALLBACK_TYPE_FIRST_MATCH` or `CALLBACK_TYPE_MATCH_LOST` for more sophisticated presence detection.

The `setMatchMode(MATCH_MODE_AGGRESSIVE)` setting controls how aggressively the hardware should try to match devices against your filters. `MATCH_MODE_AGGRESSIVE` means "report matches quickly, even if you're not 100% certain," while `MATCH_MODE_STICKY` means "wait until you're really sure before reporting." Aggressive mode gives you faster results but might occasionally give you false positives.

Then we have `setNumOfMatches(MATCH_NUM_ONE_ADVERTISEMENT)`, which tells the scanner to report a device after seeing just one advertisement from it. The alternative is `MATCH_NUM_FEW_ADVERTISEMENT`, which waits for multiple advertisements before reporting. Using one advertisement gives you faster discovery, while waiting for a few reduces false positives from devices that are just passing by.

The `setReportDelay(0L)` setting is crucial. A delay of `0` means "report results immediately." If you set this to, say, `5000` milliseconds, the scanner would batch up results and deliver them every 5 seconds. Batching is great for background scanning (as we discussed in the advanced section), but for foreground scanning where the user is actively waiting, immediate reporting is what you want.

And finally, the star of our show: `setScanType(SCAN_TYPE_PASSIVE)`. This is the new API from Android 16 QPR2 that transforms our scanner into a silent listener. Instead of actively sending scan requests to every device it hears, it just listens to the advertisements floating through the air. This single setting can dramatically reduce your app's battery consumption during scanning. It's the feature we've been waiting for, and it's glorious.

#### Start and Stop the Scan

Finally, we need functions to start and stop our scan. Remember: always stop your scan! A forgotten scan is a battery-killing monster.

```kotlin
private fun startBleScan() {
    // Don't forget to request permissions first!
    if (bleScanner != null) {
        // You can add ScanFilters here to search for specific devices
        val scanFilters: List<ScanFilter> = listOf() 
        bleScanner.startScan(scanFilters, scanSettings, scanCallback)
        Log.d("BleScanner", "Scan started.")
    } else {
        Log.e("BleScanner", "Bluetooth is not available.")
    }
}

private fun stopBleScan() {
    if (bleScanner != null) {
        bleScanner.stopScan(scanCallback)
        Log.d("BleScanner", "Scan stopped.")
    }
}
```

These two functions above are the on/off switches for your Bluetooth scanner, and they're deceptively simple for how important they are. Let's break down what's happening in each one.

In `startBleScan()`, we first check if the `bleScanner` is not null. This is our safety net: if the device doesn't have Bluetooth hardware or if Bluetooth is disabled, the scanner will be null, and we don't want to crash by trying to call methods on a null object. If the scanner exists, we call `startScan()` with three parameters: a list of `ScanFilter` objects, our carefully crafted `ScanSettings`, and the `ScanCallback` we defined earlier.

The `scanFilters` list is currently empty in our example, which means "find all BLE devices." In a real-world app, you'd typically add filters here to narrow down your search.

For instance, if you're building an app that only works with heart rate monitors, you'd create a filter that only matches devices advertising the Heart Rate Service UUID. This is crucial for both performance and battery life: why wake up your app for every random Bluetooth toothbrush when you only care about fitness trackers?

The `startScan()` method kicks off the scanning process. From this point on, the Bluetooth radio is actively (or in our case, passively) listening for advertisements, and your `scanCallback` will start receiving results. This is an asynchronous operation, meaning your code doesn't block here waiting for results – rather, it continues executing, and the results come in through the callback whenever they're available.

Now let's talk about `stopBleScan()`, which might be the most important function you write. When you call `stopScan()` with your callback, you're telling the Bluetooth radio, "Okay, we're done here, you can go back to sleep." This immediately stops the scanning process and releases the resources.

The critical thing to understand is that if you don't call this, the scan will continue running indefinitely, draining your user's battery like a vampire at an all-you-can-eat blood bank. This is why we emphasize it so much: a forgotten `stopScan()` call is one of the most common causes of battery drain complaints in Bluetooth apps.

Notice that we're passing the same `scanCallback` object to `stopScan()` that we used in `startScan()`. This is how Android knows which scan to stop – you might theoretically have multiple scans running with different callbacks (though that's rarely a good idea). Always make sure you're stopping the same scan you started by using the same callback reference.

### Putting It All Together

Here's a complete example you can drop into an Activity. Just remember to handle the runtime permissions!

```kotlin
// In your Activity class

class MainActivity : AppCompatActivity() {

    // ... (lazy properties for adapter and scanner from above)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // ... your UI setup ...

        // Example: Start scan on button click
        val startButton = findViewById<Button>(R.id.startButton)
        startButton.setOnClickListener {
            // You MUST request permissions before calling this!
            startBleScan()
        }

        // Example: Stop scan on another button click
        val stopButton = findViewById<Button>(R.id.stopButton)
        stopButton.setOnClickListener {
            stopBleScan()
        }
    }

    // ... (scanCallback, startBleScan, stopBleScan functions from above)

    override fun onPause() {
        super.onPause()
        // Always stop scanning when the activity is not visible.
        stopBleScan()
    }
}
```

The complete example above shows how all the pieces fit together in a real Activity. This is a minimal but functional Bluetooth scanner that you can actually run. Let's highlight a few important patterns we're using here.

First, notice how we're tying the scan lifecycle to user actions through button clicks. This is a common pattern: the user explicitly starts and stops the scan, giving them control over when the app is using Bluetooth. This is both good UX and good for battery life, as the scan only runs when the user wants it to.

But here's the really important part: the `onPause()` override. This is a critical safety net. When your Activity goes into the background (maybe the user pressed the home button, or they switched to another app), `onPause()` is called, and we immediately stop the scan. This is essential because if the user can't see your app, they don't need scan results, and there's no reason to drain their battery. This pattern ensures that even if the user forgets to press the "Stop" button, the scan won't run forever in the background.

You might be wondering, "What about `onResume()`? Shouldn't we restart the scan when the user comes back?" That's a design decision. In some apps, you might want to automatically restart scanning in `onResume()`. In others, you might want the user to explicitly press "Start" again. It depends on your use case. For a device-finding app where the user is actively searching, auto-resuming makes sense. For a monitoring app that runs in the background, you might want more explicit control.

One crucial thing we haven't shown in this example is runtime permission handling. Remember those permissions we declared in the manifest? On Android 6.0 and above, you can't just declare them, you have to actually request them from the user at runtime. Before calling `startBleScan()`, you should check if you have the necessary permissions and, if not, request them using `ActivityCompat.requestPermissions()`. If you try to start a scan without the proper permissions, it will fail silently (or loudly, depending on the Android version), and you'll be left scratching your head wondering why nothing is working.

And there you have it! You've just built your first AOSP 16 passive Bluetooth scanner. It's lean, it's mean, and it's incredibly power-efficient. The scanner listens silently for BLE advertisements, reports them through your callback, and stops gracefully when it's not needed.

Now, let's move on to our next topic: what to do when things go wrong. It's time to talk about breakups... Bluetooth bond breakups, that is.

---

## Deep Dive #2: Bluetooth Bond Loss Reasons

Ah, the Bluetooth bond. It's a beautiful, sacred thing. It's the digital equivalent of exchanging friendship bracelets. When you bond your phone with your headphones, you're creating a long-term, trusted relationship. They share secret keys, they remember each other, and they promise to connect automatically, saving you the hassle of pairing every single time. It's a beautiful romance.

Until it's not.

Suddenly, one day, they just... forget each other. The connection is gone. The trust is broken. And your app is left in the middle, trying to play therapist, with no idea what went wrong. You've been ghosted. And until now, Android has been no help. You'd get a notification that the bond state is now BOND_NONE, but that's it. No explanation. No closure. Just the cold, hard silence of a failed connection.

### Finally, Some Closure!

But our friends on the Android team have clearly been through some tough breakups, because in AOSP 16, they've given us the gift of closure. Introducing BluetoothDevice.EXTRA_BOND_LOSS_REASON. It's a new extra that comes with the ACTION_BOND_STATE_CHANGED broadcast, and it's here to tell you why the bond was lost. It's like getting a breakup text that actually explains what happened!

Now, when a bond is broken, you can get a specific reason code. Think of them as the classic breakup excuses, but for Bluetooth:

| Reason Code (Illustrative) | What it Actually Means |
| ---: | :--- |
| `BOND_LOSS_REASON_BREDR_AUTH_FAILURE` | Indicates that the reason for the bond loss is BREDR authentication failure. |
| `BOND_LOSS_REASON_BREDR_INCOMING_PAIRING` | Indicates that the reason for the bond loss is BREDR pairing failure. |
| `BOND_LOSS_REASON_LE_ENCRYPT_FAILURE` | Indicates that the reason for the bond loss is LE encryption failure. |
| `BOND_LOSS_REASON_LE_INCOMING_PAIRING` | Indicates that the reason for the bond loss is LE pairing failure. |

### The Code: Playing Detective

So, how do we get this juicy gossip? We need to set up a BroadcastReceiver to listen for bond state changes.

```kotlin :collapsed-lines
// Create a BroadcastReceiver to listen for bond state changes
private val bondStateReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == BluetoothDevice.ACTION_BOND_STATE_CHANGED) {
            val device: BluetoothDevice? = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE)
            val bondState = intent.getIntExtra(BluetoothDevice.EXTRA_BOND_STATE, BluetoothDevice.ERROR)
            val previousBondState = intent.getIntExtra(BluetoothDevice.EXTRA_PREVIOUS_BOND_STATE, BluetoothDevice.ERROR)

            // Check if we went from bonded to not bonded
            if (bondState == BluetoothDevice.BOND_NONE && previousBondState == BluetoothDevice.BOND_BONDED) {
                Log.d("BondBreakup", "We got dumped by ${device?.address}!")

                // Now, let's find out why...
                val reason = intent.getIntExtra(BluetoothDevice.EXTRA_BOND_LOSS_REASON, -1)

                when (reason) {
                    // Note: The actual constant values are in the Android SDK
                    BluetoothDevice.BOND_LOSS_REASON_REMOTE_DEVICE_REMOVED -> {
                        Log.d("BondBreakup", "Reason: The remote device removed the bond.")
                        // You could show a message to the user: "Your headphones seem to have forgotten you. Please try pairing again."
                    }
                    // ... handle other reasons ...
                    else -> {
                        Log.d("BondBreakup", "Reason: It's complicated (Unknown reason code: $reason)")
                    }
                }
            }
        }
    }
}

// In your Activity or Service, register the receiver
override fun onResume() {
    super.onResume()
    val filter = IntentFilter(BluetoothDevice.ACTION_BOND_STATE_CHANGED)
    registerReceiver(bondStateReceiver, filter)
}

override fun onPause() {
    super.onPause()
    // Don't forget to unregister!
    unregisterReceiver(bondStateReceiver)
}
```

The code above implements a detective system for Bluetooth bond breakups, and it's more sophisticated than it might first appear. Let's walk through how this broadcast receiver pattern works and why it's so powerful.

First, we're creating a `BroadcastReceiver`, which is Android's way of letting your app listen for system-wide events. Think of it as subscribing to a notification service, whenever something interesting happens in the Android system (like a bond state change), the system broadcasts an "intent" to all registered listeners. Our receiver is one of those listeners.

In the `onReceive()` method, we first check if the incoming intent's action is `ACTION_BOND_STATE_CHANGED`. This is crucial because broadcast receivers can potentially receive many different types of intents, and we only care about bond state changes. Once we've confirmed this is the right type of event, we extract the relevant information from the intent using `getParcelableExtra()` and `getIntExtra()`.

The `device` object tells us which Bluetooth device this event is about. After all, you might be bonded to multiple devices (your headphones, your smartwatch, your car), and we need to know which one just broke up with us. The `bondState` tells us the current state (are we bonded, bonding, or not bonded?), and `previousBondState` tells us what the state was before this change occurred.

The key logic happens in our conditional check: `if (bondState == BluetoothDevice.BOND_NONE && previousBondState == BluetoothDevice.BOND_BONDED)`. This is checking for the specific transition from "bonded" to "not bonded," which is the digital equivalent of a breakup. We're not interested in the bonding process itself (going from none to bonding to bonded) – we only care about when an existing bond is lost.

Once we've detected a breakup, we extract the new `EXTRA_BOND_LOSS_REASON` from the intent. This is the star feature from AOSP 16 that finally gives us closure. The reason code tells us exactly why the bond was lost – was it the remote device that ended things? Did the user manually forget the device? Did authentication fail? Each reason code corresponds to a different scenario, and you can handle each one appropriately.

In the example above, we're using a when expression to handle different reason codes. For BOND_LOSS_REASON_BREDR_INCOMING_PAIRING, we know the other device initiated the breakup, so we can show a helpful message like "Your headphones seem to have forgotten you. Please try pairing again." For other reasons, you'd add more branches to handle them specifically.

Now, notice the lifecycle management at the bottom. We register our receiver in `onResume()` and unregister it in `onPause()`. This is critical: if you forget to unregister a broadcast receiver, it will continue to receive broadcasts even after your Activity is destroyed, which can cause memory leaks and crashes. The pattern of registering in `onResume()` and unregistering in `onPause()` ensures that we only listen for bond changes when our Activity is visible and active.

This is a huge step forward for debugging and for user experience. Instead of just telling the user "Connection failed," you can now give them actionable advice based on the specific reason the bond was lost. It's like being a helpful, informed relationship counselor instead of a confused bystander who can only shrug and say "I don't know what happened."

Now that we've dealt with the emotional baggage of breakups, let's move on to something a little more lighthearted: speed dating for Bluetooth devices.

---

## Deep Dive #3: Service UUIDs from Advertisements

Let's talk about finding a compatible partner... for your app. In the world of BLE, not all devices are created equal. A heart rate monitor is very different from a smart lightbulb. So how does your app know if it's talking to the right kind of device? The answer is the Service UUID.

### What in the World is a Service UUID?

A Service UUID (Universally Unique Identifier) is like a device's job title. It's a unique, 128-bit number that says, "I am a device that provides a Heart Rate Service" or "I am a device that provides a Battery Service." It's the single most important piece of information for determining what a device can do.

### The Old Way: The Awkward First Date

Traditionally, finding out a device's services was a whole ordeal. It was like going on a full, three-course dinner date just to find out the other person's job. The process went something like this:

1. Scan: Find the device.
2. Connect: Establish a connection (a slow and power-hungry process).
3. Discover Services: Ask the device, "So... what do you do for a living?" and wait for it to list all its services.
4. Evaluate: Check if the list of services contains the one you're interested in.
5. Disconnect (or stay connected): If it's not the right device, you have to break up (disconnect) and move on. What a waste of time and energy!

This is incredibly inefficient, especially if you're in a crowded room with dozens of BLE devices and you're only looking for one specific type.

### The New Way: The Glorious Name Tag

Wouldn't it be great if everyone at a party just wore a name tag with their job title on it? That's exactly what AOSP 16 has given us with BluetoothDevice.EXTRA_UUID_LE. Many BLE devices are already polite enough to include their primary service UUID in their advertisement packets. It's their way of shouting, "I'M A HEART RATE MONITOR!" to the whole room.

Before AOSP 16, getting this information out of the advertisement packet was a messy, manual process of parsing the raw byte array of the scan record. It was doable, but it was the kind of code that you'd write once, pray it worked, and never touch again.

Now, Android does the dirty work for us! The system automatically parses the advertising data and, if it finds any service UUIDs, it conveniently hands them to you in the ScanResult.

### The Code: Reading the Name Tag

This new feature makes our ScanCallback even more powerful. We can now check the device's job title the moment we discover it, without ever having to connect.

```kotlin
private val scanCallback = object : ScanCallback() {
    override fun onScanResult(callbackType: Int, result: ScanResult) {
        Log.d("BleSpeedDating", "Found device: ${result.device.address}")

        // Let's check their name tag!
        val serviceUuids = result.scanRecord?.serviceUuids
        if (serviceUuids.isNullOrEmpty()) {
            Log.d("BleSpeedDating", "This one is mysterious. No service UUIDs in the ad.")
            return
        }

        // Define the UUID we're looking for (e.g., the standard Heart Rate Service UUID)
        val heartRateServiceUuid = ParcelUuid.fromString("0000180D-0000-1000-8000-00805F9B34FB")

        if (serviceUuids.contains(heartRateServiceUuid)) {
            Log.d("BleSpeedDating", "It's a match! This is a heart rate monitor. Let's connect!")
            // Now you can proceed to connect to result.device, knowing it's the right one.
            stopBleScan() // We found what we were looking for
            // connectToDevice(result.device)
        } else {
            Log.d("BleSpeedDating", "Not a match. Moving on.")
        }
    }

    // ... onScanFailed ...
}
```

The code above demonstrates the power of reading service UUIDs directly from advertisement data, and it's a game-changer for device discovery. Let's break down exactly what's happening and why this is such a significant improvement.

When we receive a scan result in our callback, the `result` object contains a `scanRecord` property. This scan record is essentially the raw advertisement packet that the BLE device broadcast into the air.

Before AOSP 16, if you wanted to extract service UUIDs from this data, you'd have to manually parse the byte array, understand the BLE advertisement format, handle different data types, and pray you didn't make an off-by-one error. It was the kind of code that worked once and then you never touched it again out of fear.

Now, with the improvements in AOSP 16, Android does all that messy parsing for us. We can simply call `result.scanRecord?.serviceUuids` and get back a nice, clean list of `ParcelUuid` objects. The safe call operator (`?.`) is important here because not all devices include a scan record in their results, and we need to handle that gracefully.

After retrieving the service UUIDs, we check if the list is null or empty. Some devices don't include service UUIDs in their advertisements. They might be using a proprietary format, or they might just be poorly configured. If there are no UUIDs, we log a message and return early. There's no point in continuing if we can't identify what the device does.

Next, we define the UUID we're looking for. In this example, we're searching for heart rate monitors, so we use the standard Heart Rate Service UUID: `0000180D-0000-1000-8000-00805F9B34FB`. This is a UUID defined by the Bluetooth SIG (Special Interest Group), and any compliant heart rate monitor will advertise this UUID. You can find a complete list of standard service UUIDs in the Bluetooth specifications, or you can use custom UUIDs if you're building your own BLE peripherals.

The magic happens in the `if (serviceUuids.contains(heartRateServiceUuid))` check. This is where we're doing our speed dating: we're checking the device's "name tag" to see if it matches what we're looking for.

If it does, we've found our match! We can immediately stop scanning (because why keep looking when we've found what we need?) and proceed to connect to the device. We know, with certainty, that this device is a heart rate monitor, so we won't waste time and battery connecting to random devices only to discover they're not what we need.

If the UUID doesn't match, we simply log "Not a match" and move on. The callback will be called again when the next device is found, and we'll repeat this process until we find our heart rate monitor or the user stops the scan.

This is a massive performance improvement over the old approach. Previously, you'd have to connect to every device you found, perform service discovery (which involves multiple round-trip communications with the device), check if it has the services you need, and then disconnect if it doesn't. Each connection attempt takes time, uses battery, and creates unnecessary radio traffic.

Now, you can filter and identify devices at lightning speed, all at the scanning stage. No more awkward first dates where you connect to a smart lightbulb thinking it might be a fitness tracker. Just efficient, targeted connections.

This is particularly useful for apps that need to find a specific type of sensor or peripheral in a sea of irrelevant devices. Imagine you're in a hospital with hundreds of BLE-enabled medical devices, or in a smart home with dozens of sensors and actuators. Being able to instantly identify the right device from its advertisement is the difference between a responsive, professional app and one that feels sluggish and unreliable.

We've now met all three of our Bluetooth musketeers: passive scanning for battery efficiency, bond loss reasons for better debugging, and service UUIDs from advertisements for faster device identification. But our journey isn't over. It's time to venture into the deep woods of advanced scanning techniques.

---

## Advanced Topics: Filtering, Batching, and Other Sorcery

Alright, you've mastered the basics. You can scan passively, you can get closure on your connection breakups, and you can speed-date devices like a pro. You're no longer a Bluetooth padawan. It's time to become a Jedi Master.

Let's dive into the advanced arts of filtering, batching, and other optimization sorcery that will make your app a true battery-saving champion.

### Hardware Filtering: Your Personal Assistant

Imagine you're a celebrity, and you've hired a personal assistant. You don't want to be bothered by every single person who wants an autograph. So, you give your assistant a list: "Only let me know if you see my agent or my mom." Your assistant then stands at the door and only bothers you when someone on the list shows up.

This is exactly what hardware filtering does. Instead of your app's code (the celebrity) being woken up for every single Bluetooth device the radio sees, you can offload the filtering logic to the Bluetooth controller itself (the personal assistant). This is a feature that's been around since Android 6.0, but it's more important than ever.

Why is this so great? Because your app's code can stay asleep. The main processor (the AP) doesn't have to wake up every time a random Bluetooth toothbrush advertises itself. The Bluetooth controller, which is much more power-efficient, handles the filtering. The AP only wakes up when the controller finds a device that matches your criteria.

### The Code: Building Your VIP List

You implement this using ScanFilter. You can filter by a device's name, its MAC address, or, most usefully, by the Service UUID it's advertising.

```kotlin
// We only want to be bothered if we see a heart rate monitor.
val heartRateServiceUuid = ParcelUuid.fromString("0000180D-0000-1000-8000-00805F9B34FB")

val filter = ScanFilter.Builder()
    .setServiceUuid(heartRateServiceUuid)
    .build()

val scanFilters: List<ScanFilter> = listOf(filter)

// Now, when you start your scan, pass in this list
bleScanner.startScan(scanFilters, scanSettings, scanCallback)
```

The code above shows how to create a hardware-level filter that dramatically improves both battery life and app performance. Let's dive deep into what's happening here and why this is such a powerful technique.

We start by defining the service UUID we're interested in – in this case, the standard Heart Rate Service UUID. This is the same UUID we used in the previous example, but now we're using it in a fundamentally different way. Instead of checking the UUID in our app's code after receiving scan results, we're telling the Bluetooth hardware itself to only report devices that match this UUID.

The `ScanFilter.Builder()` is our tool for constructing this filter. It's a builder pattern, which means we can chain multiple methods together to configure exactly what we're looking for. In this example, we're calling `setServiceUuid(heartRateServiceUuid)`, which tells the filter to only match devices that advertise this specific service.

But the builder has many other options you can use:

- `setDeviceName()`: Match devices with a specific name (like "My Heart Monitor")
- `setDeviceAddress()`: Match a specific device by its MAC address (useful if you've already paired with a device and want to find it again)
- `setManufacturerData()`: Match devices based on manufacturer-specific data in their advertisements
- `setServiceData()`: Match based on service data included in the advertisement

You can even combine multiple criteria in a single filter. For example, you could create a filter that matches devices with a specific service UUID *and* a specific manufacturer ID. The more specific your filter, the fewer false positives you'll get.

After building our filter, we create a list containing it. Why a list? Because you can have multiple filters, and a device will match if it satisfies *any* of the filters in the list. For instance, you might create one filter for heart rate monitors and another for blood pressure monitors, and your scan will report devices that match either one. This is an OR operation: the device doesn't need to match all filters, just one of them.

Finally, we pass this list of filters to `startScan()` along with our scan settings and callback. This is where the magic happens. When you provide filters, Android doesn't just filter the results in your app's code. It pushes these filters down to the Bluetooth controller hardware itself. This means the filtering happens at the lowest level, before your app is even notified.

Here's why this is so powerful: without filters, every time the Bluetooth radio hears an advertisement from *any* device (your neighbor's smart toaster, someone's fitness tracker walking by, the Bluetooth speaker three rooms away), it has to wake up your app's process, deliver the scan result, and let your code decide if it cares about this device. Each of these wake-ups costs battery and processing time.

With hardware filters, the Bluetooth controller silently ignores all the devices that don't match your criteria. Your app stays asleep. The main processor stays asleep. Only when a heart rate monitor is detected does the hardware wake up your app and deliver the result. It's like having a bouncer at a club who only lets in people on the VIP list. Everyone else is turned away at the door, and you never even know they were there.

By using a `ScanFilter`, you're telling the hardware, "Don't wake me up unless you see a heart rate monitor." It's the ultimate power-saving move for background scanning. Combined with passive scanning and batch reporting, you can create a Bluetooth scanning system that runs for hours or even days with minimal battery impact. This is how professional-grade apps handle long-term device monitoring without destroying battery life.

### Batch Scanning: The Daily Report

Let's go back to our celebrity analogy. Sometimes, you don't need to be interrupted the moment your mom shows up. You'd rather just get a report at the end of the day: "Today, your mom stopped by twice, and your agent called once." This is batch scanning.

Instead of delivering scan results to your app in real-time, the Bluetooth controller can collect them and deliver them in a big batch. This is another incredible power-saving feature. Your app can sleep for long periods, then wake up, process a whole bunch of results at once, and go back to sleep.

You enable this with the setReportDelay() method in your ScanSettings.

```kotlin
val scanSettings = ScanSettings.Builder()
    // ... other settings ...
    // Deliver results every 5 seconds (5000 milliseconds)
    .setReportDelay(5000)
    .build()
```

When you use a report delay, your onScanResult callback will be replaced by onBatchScanResults, which gives you a List<ScanResult>.

```kotlin
private val scanCallback = object : ScanCallback() {
    override fun onBatchScanResults(results: List<ScanResult>) {
        Log.d("BatchScanner", "Here's your daily report! Found ${results.size} devices.")
        for (result in results) {
            // Process each result
        }
    }

    // ... onScanFailed ...
}
```

The batch scanning mechanism shown above is one of the most underutilized power-saving features in Android Bluetooth, and understanding how it works can transform your app's battery profile. Let's break down exactly what's happening under the hood and when you should use this technique.

When you set a report delay of 5000 milliseconds (5 seconds) in the code above, you're fundamentally changing how the scanning pipeline works. Instead of the Bluetooth controller immediately waking up your app every time it sees a device, it acts like a diligent assistant taking notes. For those 5 seconds, the controller silently collects every scan result it encounters, storing them in its own internal buffer. Your app remains completely asleep during this time – no CPU cycles wasted, no battery drained by context switches or process wake-ups.

After the 5-second delay expires, the controller delivers all the accumulated results in one batch to your `onBatchScanResults()` callback. This is where the power savings come from: instead of waking up your app 50 times if 50 devices were detected, it wakes up once and hands you all 50 results at the same time. Your app can then efficiently process this batch – maybe updating a UI list, logging the data, or checking for specific devices – and then go back to sleep until the next batch arrives.

The `results` parameter in `onBatchScanResults()` is a `List<ScanResult>`, and each `ScanResult` in the list represents a single advertisement that was heard during the batching period. It's important to note that if the same device advertises multiple times during the delay period, you might receive multiple results for that device in the batch. The list isn't automatically deduplicated – that's your job if you need it.

In the example above, we're simply logging the number of devices found and then iterating through each result. In a real application, you might want to do more sophisticated processing. For instance, you could build a map of devices keyed by MAC address to track how many times each device advertised, calculate average RSSI values to estimate distance, or filter the batch to only process devices that meet certain criteria.

::: warning

Batch scanning is a powerful tool, but it's not for every situation. If you need to react to a device's presence immediately (for example, if you're building a "find my keys" app where the user is actively searching), a report delay is not your friend. The user doesn't want to wait 5 seconds to see results – they want instant feedback. In these cases, set `setReportDelay(0)` for immediate reporting.

:::

But for long-term monitoring or data collection scenarios, batch scanning is a battery's best friend. Consider these use cases:

- **Background presence monitoring**: Your app checks every minute to see if the user's smartwatch is still in range, but doesn't need second-by-second updates.
- **Environmental sensing**: You're collecting data from temperature sensors throughout a building and only need to update your dashboard every 30 seconds.
- **Beacon analytics**: You're tracking how many people pass by a retail location based on their phone's BLE advertisements, and you aggregate the data every 10 seconds.

The sweet spot for report delay depends on your use case. Too short (like 1 second), and you're not getting much benefit, you're still waking up frequently. Too long (like 60 seconds), and your app might feel unresponsive or miss time-sensitive events. For most background monitoring tasks, delays between 5 and 30 seconds work well.

One more thing to be aware of: batch scanning has limits. The Bluetooth controller has a finite buffer for storing scan results. If you set a very long delay and you're in an environment with hundreds of BLE devices, the buffer might fill up before the delay expires. When this happens, the oldest results get dropped. Android doesn't give you a warning when this occurs, so if you're missing data, consider reducing your report delay or using more aggressive filters to reduce the number of results being collected.

### OnFound/OnLost: The Drama of Presence

Since Android 8.0, scanning has gotten even more dramatic. You can now ask the hardware to not only tell you when it finds a device, but also when it loses one. This is done using the CALLBACK_TYPE_FIRST_MATCH and CALLBACK_TYPE_MATCH_LOST flags in your ScanSettings.

```kotlin
val scanSettings = ScanSettings.Builder()
    .setCallbackType(ScanSettings.CALLBACK_TYPE_FIRST_MATCH or ScanSettings.CALLBACK_TYPE_MATCH_LOST)
    .build()
```

Now, in your ScanCallback, the callbackType parameter in onScanResult will tell you what happened.

```kotlin
override fun onScanResult(callbackType: Int, result: ScanResult) {
    when (callbackType) {
        ScanSettings.CALLBACK_TYPE_FIRST_MATCH -> {
            Log.d("PresenceDetector", "Found them! ${result.device.address} has entered the building.")
        }
        ScanSettings.CALLBACK_TYPE_MATCH_LOST -> {
            Log.d("PresenceDetector", "They're gone! ${result.device.address} has left the building.")
        }
    }
}
```

The presence detection mechanism shown above represents a fundamental shift in how we think about Bluetooth scanning. Instead of treating scanning as a continuous stream of "here's what I see right now," we're now working with events: "this device appeared" and "this device disappeared." Let's dive deep into how this works and why it's so powerful.

When you set the callback type using the bitwise OR operator (`or` in Kotlin, `|` in Java), you're telling the Bluetooth hardware to track the presence state of devices over time. The code `CALLBACK_TYPE_FIRST_MATCH or CALLBACK_TYPE_MATCH_LOST` combines both flags, meaning you want to be notified both when a device first appears and when it disappears. You can use these flags individually if you only care about one type of event, but using both together gives you complete presence awareness.

Let's understand what "first match" and "match lost" actually mean. When the Bluetooth controller hears an advertisement from a device that matches your filters for the first time, it triggers a `CALLBACK_TYPE_FIRST_MATCH` event. This is different from `CALLBACK_TYPE_ALL_MATCHES` (the default), which would trigger every single time the device advertises. A device might advertise multiple times per second, so the difference is significant. With `FIRST_MATCH`, you get one notification when the device enters your scanning range, not a flood of notifications as it continues to advertise.

The `CALLBACK_TYPE_MATCH_LOST` event is even more interesting. The Bluetooth controller keeps track of when it last heard from each device. If a device stops advertising (because it moved out of range, was turned off, or its battery died), the controller notices the absence and triggers a `MATCH_LOST` event. This happens automatically: you don't have to manually track timestamps or implement timeout logic in your app. The hardware does it for you.

But how does the hardware know when a device is "lost"? It uses an internal timeout. If the controller hasn't heard from a device for a certain period (typically a few seconds, though the exact duration is implementation-dependent and not exposed to apps), it considers the device lost. This means there's a slight delay between when a device actually leaves range and when you get the `MATCH_LOST` callback, but this delay is usually acceptable for presence detection use cases.

In the code example above, we're using a `when` expression to handle the different callback types. When we receive a `FIRST_MATCH`, we know the device has just entered our scanning range, so we log "Found them!" This is perfect for triggering actions like unlocking a door when your phone comes near, or starting to sync data when your fitness tracker is detected.

When we receive a `MATCH_LOST`, we know the device has left our scanning range or stopped advertising, so we log "They're gone!" This is ideal for triggering cleanup actions like locking the door when your phone leaves, or stopping a data sync when your tracker disconnects.

This is incredibly useful for presence detection scenarios. Is your smart lock in range? Is your fitness tracker still connected? Is the user's phone nearby? Now you can know, with hardware-level certainty, and you can react to changes in presence without constantly polling or maintaining complex state machines in your app code.

Here's a practical example of how you might use this in a smart home app:

```kotlin :collapsed-lines
private val presenceCallback = object : ScanCallback() {
    override fun onScanResult(callbackType: Int, result: ScanResult) {
        when (callbackType) {
            ScanSettings.CALLBACK_TYPE_FIRST_MATCH -> {
                // User's phone detected - they're home!
                Log.d("SmartHome", "Welcome home! Unlocking door and turning on lights.")
                unlockFrontDoor()
                turnOnLights()
                adjustThermostat(COMFORTABLE_TEMP)
            }
            ScanSettings.CALLBACK_TYPE_MATCH_LOST -> {
                // User's phone is gone - they left!
                Log.d("SmartHome", "Goodbye! Locking door and entering away mode.")
                lockFrontDoor()
                turnOffLights()
                adjustThermostat(ENERGY_SAVING_TEMP)
                armSecuritySystem()
            }
        }
    }

    override fun onScanFailed(errorCode: Int) {
        Log.e("SmartHome", "Presence detection failed: $errorCode")
    }
}
```

One important consideration: `FIRST_MATCH` and `MATCH_LOST` are mutually exclusive with `CALLBACK_TYPE_ALL_MATCHES`. If you combine them with `ALL_MATCHES`, the behavior becomes undefined and varies by device. Stick to either `ALL_MATCHES` for continuous reporting, or `FIRST_MATCH`/`MATCH_LOST` for presence detection – don't try to use both at once.

Also, be aware that presence detection works best when combined with hardware filtering. If you're scanning for all devices without filters, the controller has to track the presence state of every single BLE device in range, which can overwhelm its internal tracking tables. Always use `ScanFilter` to narrow down which devices you care about when using presence detection.

By combining these advanced techniques – hardware filtering, batch scanning, and presence detection – you can build incredibly sophisticated and power-efficient Bluetooth applications. You're not just a developer anymore. You're a Bluetooth wizard, wielding the power to create apps that are aware of their surroundings, responsive to changes, and respectful of battery life.

Now, let's see where we can apply these magical powers in the real world.

---

## Real-World Use Cases: Where the Bluetooth Hits the Road

Okay, we've learned a ton of cool new tricks. We're basically Bluetooth black belts at this point. But what's the use of all this power if we don't use it for good (or at least for a cool app)? Let's explore some real-world scenarios where the new features in AOSP 16 can turn a good app into a great one.

### 1. The "Find My Everything" App

We've all been there. You're late for work, and your keys have decided to play a game of hide-and-seek in another dimension. This is the classic use case for a BLE tracker.

- **The Old Way:** Your app would be constantly doing active scans, draining your battery while you frantically search. It would connect to every tracker in your house just to see if it's the right one.
- **The AOSP 16 Way:** Your app runs a passive scan in the background with a hardware filter for your tracker's specific Service UUID. The battery impact is minimal. When you open the app to find your keys, it already knows they're in the house because it's been listening silently. You hit the "Find" button, the app connects, and your keys start screaming from inside the couch cushions. And if the connection fails? Bond loss reason tells you if the tracker's battery died, so you're not looking for a dead device.

### 2. The Smart Supermarket

Imagine an app that gives you coupons for products as you walk past them in the store. This is the dream of proximity marketing, a dream that has been historically thwarted by, you guessed it, battery drain.

- **The Old Way:** The app would need to constantly scan for beacons, turning the user's phone into a hot potato and a dead battery by the time they reach the checkout line.
- **The AOSP 16 Way:** The supermarket places BLE beacons in each aisle. Your app uses a passive, batched scan. It wakes up every minute or so, gets a list of all the beacons it has seen, and then goes back to sleep. When it sees you've been loitering in the cookie aisle for five minutes (it knows, it always knows), it uses the Service UUID from the advertisement to identify the "Cookie Aisle Beacon" and sends you a coupon for Oreos. It's targeted, it's efficient, and it doesn't kill your battery before you can pay.

### 3. The Overly-Attached Smart Home

Your smart home should be, well, smart. It should know when you're home and when you've left. It should lock the door behind you and turn on the lights when you arrive.

- **The Old Way:** You'd have to rely on GPS (a notorious battery hog) or Wi-Fi connections, which can be unreliable. BLE was an option, but constant scanning was a problem.
- **The AOSP 16 Way:** Your phone is the key. Your smart hub (acting as a central device) runs a continuous, low-power passive scan. When it sees your phone's BLE advertisement, it knows you're home. But what if you just walk by the house? This is where the OnFound/OnLost feature comes in. The hub can be configured to only trigger the "Welcome Home" sequence after it has seen your device consistently for a minute (OnFound), and to trigger the "Goodbye" sequence only after it hasn't seen you for five minutes (OnLost). It's a smarter, more reliable presence detection system that finally makes the smart home feel... smart.

### 4. The Corporate Asset Tracker

In a large hospital or warehouse, keeping track of expensive, mobile equipment (like IV pumps or forklifts) is a huge challenge. BLE tags are the solution.

- **The Old Way:** Employees would have to walk around with a tablet, doing active scans to take inventory. It's slow, manual, and inefficient.
- **The AOSP 16 Way:** A network of fixed BLE gateways is installed throughout the building. Each gateway is a simple device (like a Raspberry Pi) running a continuous passive scan. They collect all the advertisement data from the asset tags and send it to a central server. The server can now see, in real-time, that IV Pump #34 is in Room 201, and Forklift #3 is currently in the loading bay. No manual scanning required. It's a low-cost, low-power, real-time location system, all thanks to the efficiency of passive scanning.

These are just a few examples. From fitness trackers to industrial sensors, the new Bluetooth features in AOSP 16 open up a world of possibilities for building apps that are not only powerful but also polite to your user's battery. Now, let's talk about how to make sure our shiny new app works on all devices, not just the new ones.

---

## API Version Checking: How to Not Crash Your App

So, you've built a beautiful, battery-sipping app using all the new hotness from AOSP 16's Q4 release. You're ready to ship it, become a millionaire, and retire to a private island. But then, a bug report comes in. Your app is crashing on a brand new Android 16 device. What gives?!

Welcome, my friend, to the wonderful world of API version checking. With Android's new release schedule, this has become more important (and slightly more complicated) than ever.

### The Problem: A Tale of Two Android 16s

As we discussed, 2025 gave us two Android 16 releases:

- **The Q2 Release:** The main "Baklava" release. Let's call this API level 36.0.
- **The Q4 Release:** The minor, feature-drop release. This is where our new Bluetooth toys live. Let's call this API level 36.1.
Our new passive scanning API, setScanType(), only exists on 36.1 and later. If you try to call it on a device that's running the initial Q2 release (36.0), your app will crash with a NoSuchMethodError. It's the digital equivalent of asking for a menu item that was only added last night. The chef (your app) just gets confused and has a meltdown.

### The Old Guard: SDK_INT

For years, our trusty friend for checking API levels has been Build.VERSION.SDK_INT. It's simple and effective.

```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
    // Use an API from Android 12 (S) or higher
}
```

But SDK_INT only knows about major releases. For both Android 16 Q2 and Q4, SDK_INT will just report 36. It has no idea about the minor version. It's like asking someone their age, and they just say "thirties." Not very specific.

### The New Hotness: SDK_INT_FULL

To solve this, the Android team has given us a new, more precise tool: `Build.VERSION.SDK_INT_FULL`. This constant knows about both the major and minor version numbers. And to go with it, we have a new set of version codes: `Build.VERSION_CODES_FULL`.

So, to safely call our new passive scanning API, we need to do a more specific check:

```kotlin
// Let's build our ScanSettings
val scanSettingsBuilder = ScanSettings.Builder()
    .setScanMode(ScanSettings.SCAN_MODE_LOW_POWER)

// Now, let's check if we can go passive
if (Build.VERSION.SDK_INT_FULL >= Build.VERSION_CODES_FULL.BAKLAVA_1) {
    Log.d("ApiCheck", "This device is cool. Going passive.")
    // This is the new API from the Q4 release (36.1)
    scanSettingsBuilder.setScanType(ScanSettings.SCAN_TYPE_PASSIVE)
} else {
    Log.d("ApiCheck", "This device is old school. Sticking to active scanning.")
    // Fallback for devices that don't have the new API
    // We don't need to do anything here, as active is the default
}

val scanSettings = scanSettingsBuilder.build()
```

### Graceful Degradation: The Art of Falling with Style

This brings us to a crucial concept: graceful degradation. It means your app should still work on older devices, even if it can't use the latest and greatest features. It should fall back gracefully.

In our example above, if the setScanType method isn't available, we just... don't call it. The app will default to a normal, active scan. It won't be as battery-efficient, but it will still work. The user on the older device gets a functional app, and the user on the newer device gets a more optimized experience. Everybody wins.

Here's a table to help you remember when to use which check:

| If you're using an API from... | Use this check... |
| :--- | :---: |
| A major Android release (for example, Android 16 Q2) | `if (SDK_INT >= VERSION_CODES.BAKLAVA)` |
| A minor, feature-drop release (for example, Android 16 Q4) | `if (SDK_INT_FULL >= VERSION_CODES_FULL.BAKLAVA_1)` |

Mastering this new API checking is non-negotiable. It's the key to writing modern Android apps that are both innovative and stable. Now that we know how to build a robust app, let's talk about how to fix it when it inevitably breaks.

---

## Testing and Debugging: The Fun Part (Said No One Ever)

There are two universal truths in software development:

- It works on my machine, and
- It will break in the most spectacular way possible during a live demo.

Bluetooth development, in particular, seems to delight in this second truth. It's a fickle, invisible force that seems to have a personal vendetta against developers.

So, how do we fight back? With a solid testing and debugging strategy. It's not glamorous, but it's the only way to stay sane.

### The Emulator: A Land of Make-Believe

Android Studio's emulator is a fantastic tool. It's fast, it's convenient, and it can simulate all sorts of devices. And for Bluetooth? It can... sort of help. The emulator does have virtual Bluetooth support. You can enable it, and your app will think it has a Bluetooth adapter. It's great for testing your UI and making sure your app doesn't crash when it tries to get the BluetoothLeScanner.

But here's the catch: it's not real. The emulator can't actually interact with the radio waves in your room. You can't use it to find your real-life BLE headphones. For that, you need to venture into the real world.

### The Real World: Where the Bugs Live

There is no substitute for testing on real, physical devices. Every phone manufacturer has its own special flavor of Bluetooth stack, its own quirky antenna design, and its own unique way of making your life difficult. A scan that works perfectly on a Google Pixel might fail miserably on another brand. The only way to know is to test.

Your testing arsenal should include:

- **A variety of phones:** Different brands, different Android versions. The more, the better.
- **A variety of BLE peripherals:** Don't just test with one type of device. Get a few different beacons, sensors, or wearables. You'll be amazed at how differently they behave.

### Common Errors: The Usual Suspects

When your scan inevitably fails, it will give you an error code. Here are a few of the most common culprits:

| Error Code | The Problem | How to Fix It |
| ---: | :--- | :--- |
| `SCAN_FAILED_ALREADY_STARTED` | You tried to start a scan that was already running. | You got too excited. Make sure you're not calling startScan() multiple times without calling `stopScan()` in between. |
| `SCAN_FAILED_APPLICATION_REGISTRATION_FAILED` | Something is fundamentally wrong with your app's setup. | This is a vague and unhelpful error. It usually means you have a problem with your permissions or the system is just having a bad day. Try restarting Bluetooth. |
| `SCAN_FAILED_INTERNAL_ERROR` | The Bluetooth stack had a panic attack. | This is the classic "it's not you, it's me" error. It's an internal issue with the device's Bluetooth controller. There's not much you can do except try again later. |
| `SCAN_FAILED_FEATURE_UNSUPPORTED` | You tried to use a feature the hardware doesn't support. | You might be trying to use batch scanning on a device that doesn't support it. Use your API version checks! |

### Debugging Tools: Your Ghost-Hunting Kit

When things go wrong, you need the right tools to see what's happening in the invisible world of Bluetooth.

- **logcat:** This is your best friend. Be generous with your log statements. Log when you start a scan, when you stop a scan, when you find a device, and when a scan fails. Create a filter for your app's tag so you can see the signal through the noise.
- **Android's Bluetooth HCI Snoop Log:** This is the holy grail of Bluetooth debugging. It's a developer option that records every single Bluetooth packet that goes in or out of your device. It's incredibly detailed and can be overwhelming, but it's the ultimate source of truth. You can open the generated log file in a tool like Wireshark to see the raw, unfiltered conversation between your phone and the BLE device. It's like having a wiretap on the radio waves.
- **nRF Connect for Mobile:** This is a free app from Nordic Semiconductor, and it's an essential tool for any BLE developer. It lets you scan for devices, see their advertising data, connect to them, and explore their GATT services. If your app can't find a device, the first thing you should do is see if nRF Connect can. If it can't, the problem is likely with the peripheral, not your app.

Testing and debugging Bluetooth is a marathon, not a sprint. It requires patience, a methodical approach, and a healthy dose of self-deprecating humor. But with the right tools and techniques, you can tame the beast.

Now, let's talk about how to make sure our well-behaved app is also a good citizen when it comes to performance.

---

## Performance and Best Practices: How to Be a Good Bluetooth Citizen

Writing code that works is one thing. Writing code that works well, is efficient, and doesn't make your users want to throw their phone against a wall is another thing entirely. When it comes to Bluetooth, being a good citizen is all about one thing: battery, battery, battery.

The Bluetooth radio is a powerful piece of hardware, but it's also a thirsty one. Every moment it's active, it's sipping power. Your job is to make sure it's only sipping when absolutely necessary. Here are the golden rules of being a good Bluetooth citizen.

### 1. Don't Scan If You Don't Have To

This sounds obvious, but it's the most common mistake. Before you even think about starting a scan, ask yourself: "Do I really need to do this right now?" If the user is not on the screen that needs scan results, don't scan. If the app is in the background, be extra critical. Background scanning is a huge drain on battery and is heavily restricted by Android for that very reason.

### 2. Stop Your Scan!

I'm going to say it again because it's that important: always stop your scan when you're done. A scan that's left running is like a leaky faucet for your battery. It will drain and drain until there's nothing left. The best practice is to tie your scan lifecycle to your UI lifecycle.

```kotlin
override fun onPause() {
    super.onPause()
    // The user can't see the screen, so they don't need the results.
    stopBleScan()
}

override fun onResume() {
    super.onResume()
    // The user is back on the screen, let's start scanning again.
    startBleScan()
}
```

If you find the device you're looking for, stop the scan immediately. There's no need to keep looking.

### 3. Choose the Right Scan Mode

ScanSettings gives you a few different modes. Choose wisely.

- `SCAN_MODE_LOW_POWER`: This is your default, everyday mode. It scans in intervals, balancing discovery speed and battery life. Use this for most foreground scanning.
- `SCAN_MODE_BALANCED`: A middle ground. It scans more frequently than low power mode.
- `SCAN_MODE_LOW_LATENCY`: This is the "I need to find it NOW" mode. It scans continuously. This will find devices the fastest, but it will also drain your battery the fastest. Only use this for short, critical operations.
- `SCAN_MODE_OPPORTUNISTIC`: This is the ultimate passive mode. Your app doesn't trigger a scan at all. It just gets results if another app happens to be scanning. It uses zero extra battery, but you have no guarantee of getting results. Use this for non-critical background updates.

And of course, if you're on AOSP 16 QPR2 or later, use setScanType(SCAN_TYPE_PASSIVE) whenever you don't need the scan response data. It's the new king of power efficiency.

### 4. Use Hardware Filtering and Batching

We covered this in the advanced section, but it's a best practice that's worth repeating. If you're looking for a specific device, use a ScanFilter. If you're doing a long-running scan, use setReportDelay() to batch your results. These two techniques offload the work to the power-efficient Bluetooth controller and let your app's code sleep, which is the number one way to save battery.

### 5. Be Mindful of Memory

Every ScanResult object that your app receives takes up memory. If you're in a crowded area with hundreds of BLE devices, and you're not using filters, your app can quickly get overwhelmed and run out of memory. This is another reason why filtering is so important. Only get the results you actually care about.

By following these rules, you can build a Bluetooth app that is not only powerful and feature-rich but also respectful of your user's device. You'll be a true Bluetooth sensei. Now, let's wrap things up and look to the future.

---

## Conclusion: The Future is Passive (and That's Okay)

We've been on quite a journey, haven't we? We've traveled back in time to the dark ages of Classic Bluetooth, witnessed the renaissance of BLE, and emerged into the brave new world of AOSP 16. We've learned to be silent ninjas with passive scanning, played detective with bond loss reasons, and mastered the art of speed dating with service UUIDs from advertisements.

If there's one big takeaway from all of this, it's that the future of Bluetooth on Android is smarter, more efficient, and a whole lot less frustrating. The Android team is clearly listening to the pain points of developers and giving us the tools we need to build better, more battery-friendly apps. The introduction of passive scanning isn't just a new feature – it's a change in philosophy. It's an acknowledgment that sometimes, the best way to communicate is to just listen.

As developers, these new tools empower us to move beyond the simple "connect and stream" use cases. We can now build sophisticated, context-aware applications that are constantly aware of their surroundings without turning our users' phones into expensive paperweights. The dream of a truly smart, seamlessly connected world is a little bit closer, and it's going to be built on the back of these power-efficient technologies.

So, what's next? The world of Bluetooth is always evolving. We have Bluetooth 5.4 with Auracast, mesh networking, and even more precise location-finding on the horizon. The one thing we can be sure of is that the tools will continue to get better, and the challenges will continue to get more interesting.

For now, take a moment to appreciate the progress we've made. The next time you start a Bluetooth scan and it just works, take a moment to thank the hardworking engineers who made it possible. And the next time your app's battery graph is a beautiful, flat line instead of a terrifying ski slope, give a little nod to the power of passive scanning.

The Bluetooth beast may never be fully tamed, but with AOSP 16, we've been given a much stronger leash. Now go forth and build amazing things. And for the love of all that is holy, remember to stop your scan.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How AOSP 16 Bluetooth Scanner Works: The Ultimate Guide",
  "desc": "Ah, Bluetooth. The technology we all love to hate. It's like that one friend who's always just about to connect, but then... doesn't. For years, Android developers have been locked in a dramatic, often tragic, romance with Bluetooth. We've wrestled w...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-aosp-16-bluetooth-scanner-works-the-ultimate-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
