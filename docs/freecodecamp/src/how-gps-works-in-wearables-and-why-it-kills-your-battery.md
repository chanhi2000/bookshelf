---
lang: en-US
title: "How GPS Works in Wearables (and Why It Kills Your Battery)"
description: "Article(s) > How GPS Works in Wearables (and Why It Kills Your Battery)"
icon: fas fa-microchip
category:
  - Hardware
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - hw
  - hardware
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How GPS Works in Wearables (and Why It Kills Your Battery)"
    - property: og:description
      content: "How GPS Works in Wearables (and Why It Kills Your Battery)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-gps-works-in-wearables-and-why-it-kills-your-battery.html
prev: /hw/articles/README.md
date: 2026-08-05
isOriginal: false
author:
  - name: Shradha Puri
    url: https://freecodecamp.org/news/author/shradhapuri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8e454167-3406-4d4c-b7f2-4e51a3f5a630.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hardware > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How GPS Works in Wearables (and Why It Kills Your Battery)"
  desc="A couple of months ago, I went for a 10K run with three different devices on me. Why? Another long story of review deadlines and my own procrastination. By the time I was done with my run and got back"
  url="https://freecodecamp.org/news/how-gps-works-in-wearables-and-why-it-kills-your-battery"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8e454167-3406-4d4c-b7f2-4e51a3f5a630.png"/>

A couple of months ago, I went for a 10K run with three different devices on me. Why? Another long story of review deadlines and my own procrastination.

By the time I was done with my run and got back home, the smartwatch that was using GPS had close to 15% battery left. But the smart band and the smart ring which were using my phone’s GPS stayed put.

That's when it clicked how much GPS actually costs a device and how little most people understand what’s happening when their watch gives them directions on a new hiking trail.

So let’s get into it: what GPS in a wearable device actually does, why it's such a battery hog, and how to save on battery during long hikes.

---

## What's Actually Happening When Your Watch Says "Acquiring GPS"

Your wearable isn't just listening to the signal of one satellite. It listens to the signals of at least four satellites orbiting the Earth, then calculates the location based on how long it took for each signal to reach the watch.

This technique is called trilateration, and the basic math principles are the same for your smartphone, your car's navigation system, and your watch.

This isn't an easy task since there's a tiny antenna in your watch and a tiny processor performing calculations in real-time. Not just one calculation, thought: it's performed every second while the device is on and while you're moving. This means that every second or so your watch gets and calculates the signal of satellites that are literally more than 12,000 miles away from the Earth.

That's a lot to do for such a small device.

### GPS, GLONASS, Galileo, and Why Your Watch Uses All of Them

Modern wearables rarely use GPS alone anymore. They draw on the signals provided by GPS (US-based), GLONASS (Russia), Galileo (Europe), as well as QZSS or BeiDou in some cases, depending on the chip set.

By drawing on the signals from more than one satellite system at a time, your wearable will be able to get and maintain the signal more quickly and more accurately, particularly when there's less sky visibility, like in a dense urban environment or while moving under a tree canopy.

It's a very practical feature. I've tested wearables that required minutes to get a GPS signal, as well as a later model from the same brand, equipped with multi-band capability, that connected almost instantly.

The downside to drawing on several different satellite systems is that it requires more radio activity and so uses up more battery. It's a trade-off between accuracy and speed and battery life, which not many users understand.

---

## Why This Eats Battery Like Nothing Else

It's safe to say that GPS functionality is one of the biggest battery hogs out there. And here's what makes it such an energy-sucking machine.

First of all, the GPS radio is active during your entire workout or activity. In contrast to a heart rate monitor that takes samples several times per second and only syncs with the app when the app is open, a GPS chip won't rest while it's working.

Also, most people leave their display on while exercising to check how far they've run or to check the directions while navigating a new trail.

So as you can see, there are two main functions that drain the battery that are running at the same time.

I've seen this problem firsthand during the test of a medium-quality running watch. In average conditions, the watch would last about a week. Add just a couple of hour-long runs with activated GPS and it needed to be charged every 2-3 days.

---

## Standalone GPS vs Phone-Connected GPS

There's one more thing to be aware of here. Some fitness wearables, especially rings and basic trackers, don't have their own GPS chip at all. They use GPS data sent from your smartphone via Bluetooth, which is why you need to bring your phone with you for the map to show up afterward.

Other devices, including the GPS watches used by runners, have their own chip and antenna built in. You're able to leave your smartphone at home and still get the correct map and route directions because the watch performs all the work. This is more convenient, but it consumes much more energy from the battery during an activity.

---

## What Wearable Brands Are Doing to Fix This

Most of the recent improvements to wearables aren't about making the satellites work harder. Instead, they're focused on making the chip smarter by utilizing existing information.

For example, there are some newer low power chipsets that are programmed to activate the GPS radio only from time to time whenever new coordinates are required. They then estimate your location with the help of an accelerometer and gyroscope in between.

This blending of GPS with motion sensor data is called sensor fusion and it's the main reason newer devices last longer without giving up accuracy. This way, the radio doesn't consume its maximum power capacity every second. It's just enough to correct course periodically.

There are also assisted GPS systems, where the device downloads position information from satellites prior to your activity using Wi-Fi or your phone as a source. That's part of why some watches can lock onto a signal almost instantly now compared to a few years ago when you'd stand in your driveway waving your arm around waiting for a dot to show up on the screen.

This doesn’t mean that the cost associated with the battery will no longer exist. But it definitely means that the cost is gradually being reduced. The difference between the old watch from five years ago and a new one that's been launched this year is quite evident.

---

## Which Wearables Actually Hold Up (and Which Ones Don't)

Dedicated running watches such as Garmin, Coros, and Suunto are designed to have long battery life first.

The Garmin Forerunner 570 lasts 18 hours in regular GPS mode and 13 hours in full satellite system mode. The Coros Apex 2 Pro is even more impressive with 66 hours in GPS mode and up to 200 hours in ultramarathon mode where it samples GPS only occasionally and uses motion data to fill gaps. If you train for a marathon or are going on an entire day trip in the wild, this is what you should be looking for.

Mainstream smartwatches prioritize having features over having battery life. In normal mode, the Apple Watch Ultra 2 works 12 hours in GPS mode and up to 17 hours in low power mode. The Samsung Galaxy Watch Ultra boasts up to 48 hours of working in its special exercise low power consumption mode, but it uses too much power if you keep it in regular GPS mode, making it useful for just a quick walk or a weekend 10K.

Smart rings can't have a GPS chip because their battery life would be reduced from 6 to 9 days to just a few hours, so they use the GPS of a smartphone. This is why my ring and band remained charged after the 10K while the watch wasn't. The Ultrahuman Ring Pro can now work up to 15 days on one charge and up to 45 days together with its case, but you need to have a phone to track a route at all.

The important question isn't whether there's GPS in your device, but whether it has its own chip and how it manages power while using it. The daily walker doesn't need an ultramarathon mode of the Coros watch and the trail runner won't go far using the phone-tethered ring.

---

## How to Save Battery Without Losing Your GPS Data

If you want to keep your GPS tracking functionality without needing to charge your watch every other day, there are several tips you can try.

- Most watches have a GPS tracking mode called "battery saver," which works by sampling less often. While you'll lose some precision when making sharp turns, for the vast majority of exercises, you won't notice it on the map.
- You can disable multi-band or full satellite system search if you aren't exercising in conditions that require or benefit from it. If you're simply running a loop in an open park or a familiar route, there's no need for full satellite system support.
- You can dim your screen or deactivate the always-on display mode while working out. It's not going to help you with the GPS issue, but it's the second-biggest battery drainer during exercise.
- And finally, you can pre-download maps from home before heading outdoors to get a more efficient lock.

I do these things before and during my long runs and the difference between the “normal tracking” mode and the “power saving” mode is only a few percentage points. This might not seem like a lot until you’re three hours into a hike and you wish you'd made better choices.

---

## The Trade-Off Isn't Going Away Anytime Soon

The GPS capability in wearable devices is definitely something that works well but is very expensive. I don't see that changing much in the near future, even with advances in chip technology.

That battery cost isn't going away. What's shrinking is how much of that cost you actually feel, thanks to sensor fusion and more efficient chips picking up the slack.

Every time your watch dies mid-race, it's most likely not because of a bad battery but because of the hard work it does, constantly, every second that you're running.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How GPS Works in Wearables (and Why It Kills Your Battery)",
  "desc": "A couple of months ago, I went for a 10K run with three different devices on me. Why? Another long story of review deadlines and my own procrastination. By the time I was done with my run and got back",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-gps-works-in-wearables-and-why-it-kills-your-battery.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
