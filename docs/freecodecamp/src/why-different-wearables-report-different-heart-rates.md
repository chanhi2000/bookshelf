---
lang: en-US
title: "Why Different Wearables Report Different Heart Rates"
description: "Article(s) > Why Different Wearables Report Different Heart Rates"
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
      content: "Article(s) > Why Different Wearables Report Different Heart Rates"
    - property: og:description
      content: "Why Different Wearables Report Different Heart Rates"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-different-wearables-report-different-heart-rates.html
prev: /hw/articles/README.md
date: 2026-06-30
isOriginal: false
author:
  - name: Shradha Puri
    url: https://freecodecamp.org/news/author/shradhapuri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bf4ce419-8c4f-4895-885b-d5af75a1df3f.png
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
  name="Why Different Wearables Report Different Heart Rates"
  desc="My partner and I have this thing where we check at what time our heart rates drop to their lowest during sleep, even though we sleep almost at the same time for a similar duration. He's on a Garmin, w"
  url="https://freecodecamp.org/news/why-different-wearables-report-different-heart-rates"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bf4ce419-8c4f-4895-885b-d5af75a1df3f.png"/>

My partner and I have this thing where we check at what time our heart rates drop to their lowest during sleep, even though we sleep almost at the same time for a similar duration. He's on a Garmin, while I track mine with the Ultrahuman Ring AIR.

I know you must be thinking that doesn't make sense: two different people are never going to have the same heart rate numbers anyway. Different resting baseline, different fitness levels, different everything. And yes, that part has nothing to do with wearables at all. But it's almost a competition at this point.

The real question here arises when you take the comparison of the same heart rate metric with different wearables but on the *same person*. The heart rate reading will be different – again because it will depend upon the type of sensors used in each case, the speed of sampling, and the software algorithms of the sensors.

After you learn how they work internally, you'll finally be able to understand why the numbers are different.

---

## They're All Measuring the Same Thing, Just Not in the Same Place

All of the wearables worn on your wrist or finger use the same technique known as photoplethysmography (PPG). An LED shines light into your skin while a sensor measures how much light bounces back with each heartbeat. The technology remains the same among all manufacturers, but the difference here lies in the place of measurements.

Finger-based wearables measure arteries located closer to the surface of the skin than the ones on your wrist. This gives finger-based devices like the Oura Ring a real advantage.

This advantage becomes clear even in the sleep stage, since the movements of your fingers are smaller than the movements of your wrist during sleep. [<VPIcon icon="fas fa-globe"/>Research done to test the accuracy](https://pmc.ncbi.nlm.nih.gov/articles/PMC8808342/) of the heart rate reading by the Oura Ring has been able to show high consistency with the ECG measurements.

This is one reason Oura tends to perform well in nocturnal heart rate verification. A comparative study conducted in 2025 in the journal [<VPIcon icon="fas fa-globe"/>Physiological Reports](https://physoc.onlinelibrary.wiley.com/doi/10.14814/phy2.70527) pitted 5 devices (the Oura Ring Gen 3, Oura Ring Gen 4, Whoop 4.0, Polar Grit X Pro, and Garmin Fenix 6) against a medical-grade ECG for 536 nights of sleep. The Oura Ring 3 and 4 correlated the most accurately with ECGs, WHOOP correlated moderately, and Polar had the lowest accuracy.

---

## Why Your Heart Rate Isn’t Constant

One thing you need to know is that your heart rate isn’t constant even at rest.

It varies all the time with your breathing movement or any other stress response, even when you're sitting completely still. 68 bpm can become 72 bpm after just a few seconds and nothing out of the ordinary happened.

It's enough for two wearables to have slightly different readings just because they were measuring at different times. Before sensor location, sampling rate, or any other algorithm comes into play, what's being measured is already constantly changing.

---

## Sampling Speed Changes What the Device Actually Catches

Position of the sensor is important, but frequency of readings is much more important than you might think. The PPG sensor from WHOOP 5.0 and WHOOP MG records reading **26 times per second**. This is considered to be quite a good rate of recording from a continuous wearable.

Other smart devices, on the contrary, work every few seconds and not continuously. As a result, if your Heart Rate suddenly spikes for any reason, like standing up too quickly or being startled, the device will miss that spike and fill in the gap to replace a missing value.

The Apple Watch also has a different mechanism: it has a high hardware sampling rate, but that doesn't mean that its heart rate sensor works continuously. In reality, it works periodically depending on your activity, and only works continuously while working out and for several minutes after the exercise.

None of this is necessarily better in an objective sense. The continuous heart rate frequency sampling is fantastic for capturing all those short-term spikes, but results in more raw data that needs to be filtered and sorted out by the *algorithm*.

Garmin takes a middle ground here, depending on the model of the watch. In general, most Garmin devices take continuous samples at low frequencies all day long until they detect the start of your exercise and increase sampling frequency automatically.

And there's another trade-off here: the device saves battery when you're working at your desk, but this also means that the device is essentially betting on its own movement detection being accurate before it decides that your heart rate actually matters more right now.

---

## The Algorithm Matters as Much as the Sensor

But here's the thing: the heart rate monitor only receives a raw signal of light intensity. And then something else must translate this information into a proper value. This translation is made using proprietary software for each brand separately. This is what results in the daily scores and graphs that we're all so obsessed with.

The task of this software is to determine whether the signal represents the heartbeat or some noise created by physical activity, skin contact, or ambient light.

A [2024 study published in Sensors](https://pmc.ncbi.nlm.nih.gov/articles/PMC11644394/) concluded that the heart rate readings for the Oura Ring remained accurate compared to ECG when lower quality readings were included.

The case of heart rate variability was quite different. Heart rate variability measurements became less accurate when the device used lower-quality data, especially for people over the age of 45. The heart rate algorithm used in WHOOP underwent a huge update in February 2026. The company used the training data collected at its own research facility for a wide range of skin tones, body types, and activity levels. Also, it used cloud-based processing for data analysis after the workout or a sleep session instead of [edge processing](https://iotforall.com/edge-ai-wearables).

This is a completely different strategy from having the watch do all the calculations on the device itself. Therefore, two devices that have identical hardware will give different figures from the same data depending on the interpretation of the software.

That’s also the reason why your figures might be altered by the brand itself even when it hasn't altered any of its hardware. With the release of the February 2026 update by WHOOP, there were some changes seen in heart rates and recovery scores for all 4.0 and 5.0 users, although none of the users’ activity had changed at all. The sensors remained the same, but the math behind them wasn’t.

The same happened to me with my step count on my Ultrahuman Ring AIR after a firmware update. If you've noticed your own numbers drift after an app update with no real change in your routine, this is usually why.

### Skin Tone and Wrist Size Add Another Layer

There are more than just sensors, positioning, and algorithms involved, of course. There's also the human who wears the device, plus PPG sensors *do not* work the same for all people.

The amount of light absorbed by the skin is dependent upon the amount of melanin in the skin, meaning you'll get different results on different skin tones.

One of the most extensive analyses is offered by [<VPIcon icon="fas fa-globe"/>Koerber et al. (2023)](https://link.springer.com/article/10.1007/s40615-022-01446-9). They showed that this may lower the accuracy of reading in darker skin tones, not just for a particular brand, but for many brands.

PPG works by shining light into the skin and measuring the light reflected back. Since melanin absorbs more light, darker skin tones can reduce the amount of reflected light that reaches the sensor. This can lower the signal quality and, in some situations, reduce measurement accuracy.

The same goes if you have any tattoos on the area where the wearable sensor is placed. Dark or densely pigmented tattoo ink may absorb or scatter the emitted light, making it more difficult for the sensor to obtain a clean signal.

This doesn't necessarily prevent measurements altogether, but it can increase the likelihood of inaccurate or inconsistent readings.

In addition to this, the circumference of your wrist along with the device's tightness and fit will also have an impact on the amount of light that leaks out of the sensor rather than being reflected back into it. A watch that's too loose allows ambient light to enter and reduces the amount of reflected light captured by the sensor, while one that's too tight can alter blood flow beneath the sensor. Smaller wrists may also make it harder for the sensor to maintain consistent contact with the skin.

For these reasons, manufacturers generally recommend wearing the device snugly, but not tightly and positioning it slightly above the wrist bone during measurements.

---

## Activity Type Throws Everything Off Differently for Each Brand

Resting heart rate during sleep is one thing, but your heart rate while working out is a totally different ball game for the sensors. This is where the difference becomes most evident between gadgets.

Motion artifacts are caused by movement, which means that your swinging arm interferes with the ability of the device to measure the reading the sensor is trying to capture. All companies have their algorithms to filter these movements and some handle certain movement patterns better than the others.

That's also the reason why chest strap monitors (that treat electrical signals directly from your heart rather than relying on light through skin) still outperform every wrist or finger-based wearable during high-intensity training.

---

## What This Means If You're Comparing Numbers With a Friend

When you and your friend are wearing different brands of wearables and your numbers don’t line up, that’s perfectly normal and not an indicator that your device is faulty. All that really matters is consistency over time.

The resting heart rate trend on your Oura or Garmin should be giving you an accurate picture of your recovery and stress based on your personal baseline. Consistently improving your workouts and striving towards a better *trend* in HRV is better than a single measurement.

My honest takeaway here is that heart rate tracking on consumer wearables has definitely improved, especially in terms of resting and steady state numbers. But there are still significant differences between brands and these are very much real. They come from design choices, not manufacturing defects.

The final number relies on three factors: the placement of the sensor, how often readings are taken, and how the softtware processes that information.

But will I stop arguing with my partner on how he stresses me out, which is why my heart rate drops later than his at night? Probably not.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Different Wearables Report Different Heart Rates",
  "desc": "My partner and I have this thing where we check at what time our heart rates drop to their lowest during sleep, even though we sleep almost at the same time for a similar duration. He's on a Garmin, w",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-different-wearables-report-different-heart-rates.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
