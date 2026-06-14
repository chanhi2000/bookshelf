---
lang: en-US
title: "How Wearables Track the Menstrual Cycle: The Sensors, the Algorithms, and the Accuracy Gap"
description: "Article(s) > How Wearables Track the Menstrual Cycle: The Sensors, the Algorithms, and the Accuracy Gap"
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
      content: "Article(s) > How Wearables Track the Menstrual Cycle: The Sensors, the Algorithms, and the Accuracy Gap"
    - property: og:description
      content: "How Wearables Track the Menstrual Cycle: The Sensors, the Algorithms, and the Accuracy Gap"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-wearables-track-the-menstrual-cycle-the-sensors-the-algorithms-and-the-accuracy-gap.html
prev: /hw/articles/README.md
date: 2026-06-19
isOriginal: false
author:
  - name: Shradha Puri
    url: https://freecodecamp.org/news/author/shradhapuri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f9883968-d2c8-4604-bd74-7e811ff52ca4.png
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
  name="How Wearables Track the Menstrual Cycle: The Sensors, the Algorithms, and the Accuracy Gap"
  desc="Your Garmin shows poor recovery, WHOOP paints your day red, your resting heart rate is high, your HRV is low, and the app recommends that you rest. But here’s the thing: you don’t actually feel bad. F"
  url="https://freecodecamp.org/news/how-wearables-track-the-menstrual-cycle-the-sensors-the-algorithms-and-the-accuracy-gap"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f9883968-d2c8-4604-bd74-7e811ff52ca4.png"/>

Your Garmin shows poor recovery, WHOOP paints your day red, your resting heart rate is high, your HRV is low, and the app recommends that you rest. But here’s the thing: you don’t actually feel bad.

For women who are in their reproductive years, chances are your wearable technology has misread your luteal phase symptoms as either a result of being overtrained or even sick. This is because the technology likely detected a symptom that it doesn’t actually understand.

Let’s get into how this is actually happening by going from sensors to algorithms and finally to where the accuracy gap actually lives.

---

## What the Menstrual Cycle Actually Does to Your Biometrics

Before jumping into the sensors and algorithms, here's what they're actually detecting. The menstrual cycle isn't the noise within wearable data, but an active component that alters the physiology upon which any recovery or health algorithm relies.

There are three signals that tell the story.

### Resting Heart Rate

[<VPIcon icon="fas fa-globe"/>Multiple studies](https://pmc.ncbi.nlm.nih.gov/articles/PMC9005074/) using continuous wearable monitoring have confirmed that resting heart rate increases 2-7 bpm from the follicular phase to the luteal phase. One prospective study of 91 women observed that resting heart rate was 3.8 bpm higher in the mid-luteal phase compared to the period of menstruation.

### Heart Rate Variability (HRV)

On the other hand, HRV changes in the opposite direction. In particular,  [<VPIcon icon="fas fa-globe"/>a meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC6912442/) of more than 1,000 participants showed the reduction of vagally mediated HRV from follicular to luteal phases of the menstrual cycle.

For example, [<VPIcon icon="fas fa-globe"/>one study reported](https://pmc.ncbi.nlm.nih.gov/articles/PMC5588411/) that SDNN decreased from 154 ms in the follicular phase to 136 ms in the luteal phase, which represents a decrease of 12%. Progesterone is responsible for such effects. Specifically, it triggers the renin-angiotensin system (RAS), increases the total blood volume, raises HRj, and reduces parasympathetic influence. On the other hand, estrogen decreases HR (negative chronotropic effect) and leads to greater HRV.

So during the mid-luteal phase, you already have an increased RHR but a reduced HRV. To a recovery algorithm that does not know where you are within your menstrual cycle, this combination signifies stress, sickness or overtraining.

### Skin Temperature

The temperature shift has been most thoroughly studied out of the three. [<VPIcon icon="fas fa-globe"/>Postovulatory rise of basal body temperature](https://pubmed.ncbi.nlm.nih.gov/33123618/) by 0.3–0.7°C due to progesterone’s effect has been known for over 100 years and constitutes the basis of traditional fertility awareness methods.

My Oura Ring data also shows that skin temperature usually increases during the luteal phase. It also tends to drop briefly just prior to ovulation due to an abrupt drop in body temperature related to estrogen.

The key point here is that signals change in the same direction at the same time, every cycle, predictably. When an algorithm treats these indicators separately, it's structurally wrong.

---

## How Wearables Measure These Signals

### PPG Sensors and What They Actually Capture

Heart rate and HRV measurements from wearables are done by Photoplethysmography (PPG). This sensor emits LED light, generally green for heart rate and red & infrared for SpO2, to shine on your skin. Light gets absorbed differently by blood depending on its volume, so as your heart beats and blood flows in capillaries, light reflected from your skin will be different for each heartbeat. Variation in light reflected is known as the PPG waveform.

Based on PPG waveform data, wearables calculate beat-to-beat intervals. While calculating the heart rate is relatively easy as it simply counts peaks per minute, HRV needs precise timing since it measures the variation in milliseconds between consecutive heartbeats. That’s where signal quality starts to matter a lot.

Placement of sensors on your skin also plays a vital role in this. Generally, finger devices such as smart rings like Oura and Ultrahuman give cleaner PPG signals compared to wrist-worn devices such as your Apple Watch, Garmin, or WHOOP. The finger has higher density capillaries, resulting in larger pulse amplitude and lower motion artifacts.

Wristwear makes up for this problem with more sophisticated signal processing techniques. But there's always a price to pay for that. For instance, Oura Ring 4 provides users with an 18-path multilayered wavelength PPG sensor with adaptive sensor configurations.

### Temperature Sensors: Continuous vs. Spot Measurement

Temperature sensors incorporated in current wearables measure skin temperature and not core body temperature. These sensors, called thermistors, are capable of detecting temperature fluctuations in terms of changes in electrical resistance.

While there's a relationship between skin temperature and core body temperature, the two aren't the same. Skin temperature responds to factors such as room temperature, weather conditions, and temperature variation caused by changes in blood flow around the skin surface.

Even so, continuous overnight monitoring of skin temperatures may provide better information compared to traditional basal body temperature (BBT). With the fertility awareness technique, temperature is always measured at the same time each morning, right before getting out of bed. Missing a measurement or a bad night of sleep may negatively impact results.

Wearables take a different approach. By collecting temperature data throughout the night, they can identify longer-term trends and reduce the impact of short-term fluctuations.

Some devices, such as the Apple Watch Series 8 and later, Fitbit Sense, and Oura Ring, have temperature sensors. Most smart rings track temperature changes from an individual’s baseline, not the absolute temperature itself. It makes identifying temperature increases, which happen after ovulation, easier.

---

## How the Algorithms Work

### Calendar-Based vs. Physiology-Based Detection

Perhaps the most basic way of detecting the menstrual cycle is through a calendar model. The user inputs the first day of their period, the app calculates the average cycle length, and predicts the fertile window forward from there.

Apps like Clue, Flo, and older versions of Apple’s period tracker use this as their foundation. It’s a simple algorithm that needs no sensor data at all.

The problem with calendar algorithms is accuracy. These types of methods operate on regular cycles, but these aren't common in many women. For ovulation detection, for example, [<VPIcon icon="fas fa-globe"/>studies reveal](https://pmc.ncbi.nlm.nih.gov/articles/PMC11829181/) that there's an average error of 3.44 days for calendar methods alone.

Also, calendar methods predict menstrual phases based only on dates entered by the user, whereas physiology-based approaches analyze sensor data such as temperature, heart rate and HRV to detect ovulation and cycle-related changes. For example, Oura uses heart rate and temperature to detect ovulation with an average error of 1.26 days.

### How Machine Learning Classifies Cycle Phases

Machine learning algorithms don't use a single metric to determine where you are within your menstrual cycle. Rather, they examine patterns in several physiological indicators taken from wearables, such as skin temperature, heart rate, heart rate variability (HRV), and in some cases, electrodermal activity (EDA).

Over time, machine learning algorithms figure out which cycle stages correspond to which physiological patterns. For example:

- The luteal stage is characterized by an increase in skin temperature and changes in cardiovascular metrics.
- Ovulation causes changes in patterns in terms of temperature and heart rate.
- The menstrual phase can show its own distinct combination of physiological changes.
- The follicular phase is generally the most difficult one to recognize since its biometric signatures aren't clearly defined and tend to coincide with those from other phases.

A [<VPIcon icon="fas fa-globe"/>2025 study](https://pubmed.ncbi.nlm.nih.gov/39889448/) found that machine learning algorithms can effectively determine the menstrual, ovulatory, and luteal phases. The accuracy of the results decreased when the follicular phase was added to the list of phases.

Modern cycle tracking apps have become complex because of this reason and they no longer depend solely on temperature. It becomes easier for a device to identify the phases of the menstrual cycle with every additional physiological signal that it captures.

Other technologies like the [<VPIcon icon="fas fa-globe"/>Vivoo FlowPad](https://wearablexp.com/smart-wearables/vivoo-flowpad-smart-menstrual-pad/) are also emerging that attempt to collect menstrual health data directly rather than inferring it from wearable sensors.

---

## Why the Accuracy Gap Exists

The issue with wearables comes down to the fact that many of the metrics related to menstrual cycle phases aren’t exclusive to the menstrual cycle.

Take, for instance, the metrics such as a high resting heart rate, reduced HRV, and increased skin temperature. These could be observed during the luteal phase, but can also occur thanks to a range of other factors, including illness, lack of sleep, stress, consumption of alcohol, or even jet lag.

Yet another hurdle with menstrual tracking involves individual differences since some women might have significant changes during their menstrual cycles when it comes to temperature and HRV, whereas others will have minimal changes in those metrics.

This is why most menstrual tracking algorithms require individual baselines instead of population baselines, meaning that the more data is collected from a woman regarding her menstrual cycles, the better it gets at identifying her personal patterns.

---

## What Cycle-Aware Algorithms Look Like in Practice

Until 2025, most wearables considered tracking cycles and recovery as two separate concepts. Oura became the first big company to connect the two.

Its updated algorithm accounts for increased resting heart rate, decreased HRV, and increased body temperature, all common during the luteal phase. Instead of automatically lowering readiness scores, it checks whether those changes are a normal part of the menstrual cycle.

This reduced the number of falsely low recovery scores during the second half of the menstrual cycle. In 2026, Oura went further with a dedicated AI model focused on cycles, fertility, pregnancy, and menopause.

WHOOP chose a different route through its metric called cardiovascular amplitude that measures heart rate and HRV variability throughout the whole cycle. Rather than focusing on individual phases, it looks at the overall physiological impact of hormonal changes.

Natural Cycles became the first fertility app that obtained FDA approval for contraceptive use, collecting users' body temperature data with the help of their wearables’ sensors like the Apple Watch, Oura Ring, Garmin, or its own dedicated NC Band.

Garmin, Fitbit, and Samsung track menstrual cycles, but those insights remain largely separate from their recovery and readiness metrics.

---

## Wrapping Up

This boils down to the mismatch between measurements taken by wearables and what recovery algorithms were designed to handle.

PPG sensors and temperature sensors allow wearables to detect changes that happen across the menstrual cycle and they work well enough. Multi-parameter machine learning allows for reliable classification of the cycle phases, particularly those happening during ovulation.

But problems arise because many recovery algorithms have been trained on data biased towards male samples, where hormonal cycle variations are considered to be noise. These recovery algorithms lack the means to differentiate between luteal phase physiology and initial phases of an illness. Sensors won’t solve this problem, but algorithmic design will.

From the perspective of developing health apps using wearable device APIs, we already have access to health metrics that incorporate information about the current stage of the cycle. Oura provides it in specific endpoints, Apple integrates with HealthKit’s HKCategoryTypeIdentifier, and WHOOP ties it into its recovery model.

The problem here is that data can be accessed on these platforms via different APIs, data models, and integration techniques. While Oura, Apple HealthKit, and WHOOP may expose similar health metrics, there can still be differences in the sampling frequency, preprocessing methods, and metric definitions, making it hard to create algorithms that would work consistently across platforms.

This lack of standardization also contributes to the training data problem. Data collected by Oura, Apple Watch, and WHOOP can't always be combined easily since each platform stores and works with data differently. As a result, researchers and developers have to do additional work preparing and normalizing data before it can be used to train models.

There are sensors and the models have been improving, but the APIs are fragmented and the lack of training data is real. That’s where the work is.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Wearables Track the Menstrual Cycle: The Sensors, the Algorithms, and the Accuracy Gap",
  "desc": "Your Garmin shows poor recovery, WHOOP paints your day red, your resting heart rate is high, your HRV is low, and the app recommends that you rest. But here’s the thing: you don’t actually feel bad. F",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-wearables-track-the-menstrual-cycle-the-sensors-the-algorithms-and-the-accuracy-gap.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
