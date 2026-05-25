---
lang: en-US
title: "How Step Counters Work in Wearables and Why Different Devices Give Different Results"
description: "Article(s) > How Step Counters Work in Wearables and Why Different Devices Give Different Results"
icon: fas fa-microchip
category:
  - Hardware
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - hw
  - hardware
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Step Counters Work in Wearables and Why Different Devices Give Different Results"
    - property: og:description
      content: "How Step Counters Work in Wearables and Why Different Devices Give Different Results"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/tech-giants-wearable-data-race.html
prev: /hw/articles/README.md
date: 2026-05-30
isOriginal: false
author:
  - name: Shradha Puri
    url: https://freecodecamp.org/news/author/shradhapuri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7a4f79f7-d490-4711-9245-6545c14b5244.png
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

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Step Counters Work in Wearables and Why Different Devices Give Different Results"
  desc="It’s been three years since I started using my wearables to count my steps. Three years of trying to hit the daily 10K target, closing rings, and going to sleep knowing that I accomplished something p"
  url="https://freecodecamp.org/news/tech-giants-wearable-data-race"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7a4f79f7-d490-4711-9245-6545c14b5244.png"/>

It’s been three years since I started using my wearables to count my steps. Three years of trying to hit the daily 10K target, closing rings, and going to sleep knowing that I accomplished something productive.

But then I put another smartwatch on my wrist in an attempt to see how different those results were. Both watches were on the same wrist, at the same time, counting the same walk. One said 8,400 steps, while the other said 6,900. Same wrist, 1,500 steps apart.

So naturally, I had a small crisis about everything I thought I knew.

The strange thing is that nobody really tells you this when you buy a fitness tracker. The packaging doesn’t read “lab accurate, not life accurate” or anything remotely close to this idea. The app never mentions the fact that two people who own wearables from the same company might actually have their steps counted differently.

But when you start looking into how wearables calculate your steps, things make more sense than you think.

---

## Table of Contents

- [Inside the MEMS Accelerometer](#heading-inside-the-mems-accelerometer)
- [How a Step Becomes a Number](#heading-how-a-step-becomes-a-number)
- [Why Wrist-Based Tracking Is Hard](#heading-why-wrist-based-tracking-is-hard)
- [Why Slow Walking Confuses Wearables](#heading-why-slow-walking-confuses-wearables)
- [False Steps Are Real](#heading-false-steps-are-real)
- [Why Lab Accuracy Doesn’t Match Real Life](#heading-why-lab-accuracy-doesnt-match-real-life)
- [Do Some Brands Perform Better?](#heading-do-some-brands-perform-better)
- [How the Person Wearing the Device Affects Accuracy and What You Can Actually Do to Improve It](#heading-how-the-person-wearing-the-device-affects-accuracy-and-what-you-can-actually-do-to-improve-it)
- [Final Thoughts](#heading-final-thoughts)

---

## Inside the MEMS Accelerometer

Each modern fitness tracker and smartwatch includes a **MEMS accelerometer** (Micro-Electro-Mechanical System). The MEMS consists of a tiny silicon chip with microscopic moving parts inside.

Body movements cause these microscopic components to move by an extremely small margin, which is captured by the sensor as a change in the electric signal. Most wearable devices have 3-axis or triaxial accelerometers. This means that they measure motions in three directions at once:

- up/down
- left/right
- forward/backward

These signals are captured continuously at about 50 times per second.

When you walk, your body produces a recognizable motion pattern, such as hip movement downward, movement of torso up and down and arm swinging rhythmically. What's most important is that your body bounces up and down with each step taken.

This vertical bounce is considered one of the clearest indications when someone walks and that is why step counters are so dependent upon it.

The accelerometer sends out three streams of information regarding movement. Many algorithms combine them into a single magnitude signal using the **Euclidean norm**:

‖a‖ = √(x² + y² + z²)

This gives the device a rotation-independent way to measure total acceleration.

### The Role of Gyroscopes

Higher-end wearables also have a gyroscope that detects any rotations. The accelerometer and gyroscope together make up the Inertial Measurement Unit (IMU). This makes sure that the device can differentiate between you walking or just moving your wrist around.

---

## How a Step Becomes a Number

The sensor itself can't calculate anything. All it does is produce raw motion data. The real work happens when that signal is interpreted through an algorithm, which is where things begin to differ dramatically.

All companies have their own proprietary algorithms. The algorithm used by Garmin is not the same algorithm used by Apple. And Apple’s is not the same as Samsung’s. Some of the most common approaches include:

- **Peak detection:** The algorithm detects repeating peaks in the acceleration signal that correspond to walking activity in humans. Since most people walk at a step rate in the range of 100 to 130 steps per minute, the device is designed to detect periodic activity in this range.
- **Zero-crossing detection:** Instead of looking for peaks, this approach involves determining how often the signal crosses a midpoint value.
- **Autocorrelation:** This method involves searching for repeating patterns in the motion signal over time.
- **Frequency-domain analysis:** Some algorithms search for the dominant frequency of walking.
- **Machine learning models:** Modern wearable devices have adopted machine learning approaches for walking pattern recognition based on training on large datasets of labeled walking behavior. These systems can differentiate between walking, running, typing, driving and random arm motion most of the time.

But every algorithm carries its own trade-offs. If the sensitivity of the algorithm is set too high, then the smartwatch may overlook slow or subtle motions. On the other hand, if the sensitivity is set too low, the watch would generate false steps when washing dishes or riding on bumpy roads.

There's no perfect setting, but every company has chosen to adopt its preferred compromise.

---

## Why Wrist-Based Tracking Is Hard

The primary problem with modern wearable devices is their position on the body.

The waist-mounted pedometer is located close to the center of mass, which allows for the detection of very clear and strong signals. This is why traditional clip-on pedometers often perform better than you might expect.

On the contrary, smartwatches operate with signals detected from arm movements, and your wrist is noisy. The natural walk accompanied by a natural swinging of the arms provides a very strong correlation between leg movements and arm movements, but any real-life scenario may disturb this reading. If you’re pushing a stroller, holding shopping bags, a mobile phone, or walking with hands deep in your pockets, the correlation weakens and it becomes impossible to detect a specific signal related to leg movement.

Beyond this, even the side of the body where you wear the smartwatch plays a role in data interpretation. For example, the dominant arm tends to produce a stronger acceleration signal, but it also produces additional signals due to its active work in performing different routine actions.

This is one of the reasons why you would’ve noticed that most wearable devices require specifying which wrist you are strapping the device to during setup.

---

## Why Slow Walking Confuses Wearables

One of the most surprising things about this research is that it’s far easier to accurately detect regular walking than it is to detect slow walking.

Wearables do well enough in detecting walking speed at normal paces. But as your speed drops, the acceleration and rhythm of the motion signals start to become smaller. This makes it difficult for algorithms trained primarily on healthy adults walking at normal treadmill speeds to identify slow walking correctly. The same studies may also show that wrist-worn trackers underestimate the number of steps in slow walking.

But why does this matter? The older we get, the slower and more restricted our gait becomes, which means that the motion signals detected by our wearable devices will be weaker. Then there are patients with neurological conditions like Parkinson’s disease or stroke, which can produce gait patterns that consumer algorithms simply weren’t trained to recognize.

So the next time you think your watch is broken, its likely that the detection system is simply working from assumptions that don’t match your movement pattern.

---

## False Steps Are Real

Wearables not only overlook steps, but they can actually create non-existent ones. Because accelerometers measure all kinds of acceleration, quite a lot of actions completely unrelated to walking may trick the algorithm.

Activities that can cause phantom steps include:

- Driving on bumpy roads
- Typing aggressively on the keyboard
- Washing dishes
- Folding the laundry
- Drumming
- Taking a train or bus

There's an engineering dilemma here: the more sensitive your algorithm is to slow walking, the more prone to errors. The less sensitive it is, the better it works, but undercounts certain activities.

This is the reason for very different results from different brands despite having the same data entered.

---

## Why Lab Accuracy Doesn’t Match Real Life

Fitness trackers tend to be surprisingly accurate within laboratory testing. In tests under controlled conditions, such as on treadmills, a number of wearables manage to reach step counting errors below 10%. But the real world tends to be messier.

Researchers call this “free-living” data because it involves movements made outside of the laboratory in normal life situations. The real-world walking pattern is characterized by irregularities such as rough surfaces, stops, carrying things, changes in speed, unpredictable arm movements and walking intervals. All these factors contribute to making step detection more difficult.

A smartwatch may prove to be exceptionally accurate in a controlled environment, yet still behave inconsistently in daily use.

---

## Do Some Brands Perform Better?

Yes, but it’s rarely that significant. Studies indicate that Apple Watch, Garmin, Fitbit, and Samsung are all decent pedometers during normal walking conditions. Garmins are especially valued for their consistency and reliable tracking when outdoors. The Apple Watch reportedly works very well for altered gait and slower walking. Fitbits use a more sensitive algorithm and that may result in increased step counts.

But there are other elements at play. The speed at which you walk, natural movement of your arms, location of the device on the body, what activity you’re doing, and how the algorithm interprets your movement. The difference between two people using the same watch is often larger than the difference between two brands.

---

## How the Person Wearing the Device Affects Accuracy and What You Can Actually Do to Improve It

A few things can noticeably improve step-count accuracy:

- **Walk at a natural pace when possible:** Wearables work best at moderate walking speeds. Walking slowly, shuffling and stop-and-go actions are significantly harder to detect with algorithms.
- **Wear the device properly:** Try putting on your wearable device snugly above your wrist bone to ensure consistent movement along with your arm.
- **Set your dominant wrist correctly:** Most smartwatches will adjust sensitivity settings based on which hand you use as the dominant one.
- **Keep your arms moving naturally:** Holding bags, pushing a stroller, or keeping your hands in your pockets might affect the accuracy because most wearable sensors depend greatly on the motion of your arms.
- **Keep firmware updated:** Most manufacturers continue to refine their algorithms through firmware updates.
- **Use trends, not exact numbers:** Step counts are better at tracking your habits and long-term patterns on the same device, but are less accurate compared to the number of steps registered by other brands.
- **Be cautious with slow or altered gait:** Older adults, rehabilitation patients, or those with brain injuries are likely to see undercounting of steps because most algorithms are trained on standard walking patterns.

---

## Final Thoughts

The technology in today’s wearables is truly amazing. A small sensor the size of a grain of rice measures your movement multiple times each second, filters out noise and tries to make sense of the data generated by it. That’s an incredibly difficult engineering problem. But step counting is ultimately an estimation problem.

There are different step counts generated by various brands because they all have different filtering, motion classification, signal interpretation and sensor placement. None of them count your actual steps perfectly. They estimate the probabilities based on your movement patterns. And in reality, human movements aren't always neat and monitored.

So if you have two watches that generate different step counts, don’t panic. They do their best to understand messy movement data.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Step Counters Work in Wearables and Why Different Devices Give Different Results",
  "desc": "It’s been three years since I started using my wearables to count my steps. Three years of trying to hit the daily 10K target, closing rings, and going to sleep knowing that I accomplished something p",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/tech-giants-wearable-data-race.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
