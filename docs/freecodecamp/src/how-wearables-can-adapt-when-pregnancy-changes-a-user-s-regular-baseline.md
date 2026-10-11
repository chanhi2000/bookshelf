---
lang: en-US
title: "How Wearables Can Adapt When Pregnancy Changes a User's Regular Baseline"
description: "Article(s) > How Wearables Can Adapt When Pregnancy Changes a User's Regular Baseline"
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
      content: "Article(s) > How Wearables Can Adapt When Pregnancy Changes a User's Regular Baseline"
    - property: og:description
      content: "How Wearables Can Adapt When Pregnancy Changes a User's Regular Baseline"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-wearables-can-adapt-when-pregnancy-changes-a-user-s-regular-baseline.html
prev: /hw/articles/README.md
date: 2026-10-21
isOriginal: false
author:
  - name: Shradha Puri
    url: https://freecodecamp.org/news/author/shradhapuri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bda2d690-df48-4c12-8a7d-d68cd0a5eedf.png
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
  name="How Wearables Can Adapt When Pregnancy Changes a User's Regular Baseline"
  desc="Your smart ring or watch has many useful jobs, including learning your usual physiological patterns and showing you when they change. Resting heart rate, heart rate variability (HRV), temperature, and"
  url="https://freecodecamp.org/news/how-wearables-can-adapt-when-pregnancy-changes-a-user-s-regular-baseline"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bda2d690-df48-4c12-8a7d-d68cd0a5eedf.png"/>

Your smart ring or watch has many useful jobs, including learning your usual physiological patterns and showing you when they change.

Resting heart rate, heart rate variability (HRV), temperature, and breathing rate can all contribute to that picture, although each device interprets these measurements differently.

That works well until pregnancy changes what usual looks like for several of those metrics.

The first app I open every morning is Oura, so I know how much one score can shape my day. A low Readiness Score can make me feel like I've done something wrong, even when I haven't. Now imagine seeing that for weeks while your body is going through expected physiological changes.

That's what I want to look at here, and I've pulled in the research so you don't have to take my word for it.

---

## Why Your Baseline Stops Making Sense

Most wearables use a combination of personal trends and device-specific reference ranges to interpret your measurements. The problem is that pregnancy changes several physiological metrics, and a baseline established before pregnancy may not reflect what's expected at a particular stage of pregnancy.

Oura, for example, gives people who join while already pregnant a [<VPIcon icon="fas fa-globe"/>calibration window of 7 to 15 days](https://channellife.com.au/story/oura-app-enhances-pregnancy-insights-with-personalised-tracking) so the app can establish a personal baseline. Its current support guidance describes a period of 7 to 14 days of consistent ring wear before Pregnancy Trends become available.

The distinction matters because a baseline established during pregnancy may represent that stage of pregnancy, rather than your pre-pregnancy physiology.

Pregnancy can change cardiovascular measurements quite early. Cardiac output, the amount of blood the heart pumps per minute, increases during pregnancy, as does heart rate. The magnitude and timing vary between individuals, so these changes shouldn't be treated as a fixed curve that everyone follows.

A [<VPIcon icon="fas fa-globe"/>2023 study published in *Sensors*](https://researchgate.net/publication/372549419_Changes_in_Heart_Rate_Heart_Rate_Variability_Breathing_Rate_and_Skin_Temperature_throughout_Pregnancy_and_the_Impact_of_Emotions-A_Longitudinal_Evaluation_Using_a_Sensor_Bracelet) also discusses research showing that resting heart rate can rise by 10 to 20 beats per minute, with changes beginning as early as weeks 5 to 7. But that increase isn't universal, and the trajectory varies across studies.

A system that relies too heavily on pre-pregnancy measurements may interpret expected changes as unusual. But pregnancy doesn't make every abnormal reading harmless, either. The challenge is helping users understand what their data might mean without treating a consumer wellness score as a medical assessment.

---

## What Actually Changes?

Let's get into it. Much of this research involves small samples and different devices, so treat the numbers as observations from specific studies, not predictions of what will happen to everyone.

### Heart Rate and HRV

A study conducted at University Hospital Zurich followed 23 healthy pregnant women who wore a bracelet at night. Average resting heart rate rose from about 61 beats per minute at week 8 to about 67 by week 35. It sat around 66 between weeks 24 and 32 and dropped slightly near the end.

HRV, which measures variations in the time between consecutive heartbeats, declined across roughly the first two-thirds of pregnancy in this sample, then climbed back toward where it started. HRV is often used as one indicator of physiological recovery or stress, but it isn't a direct measure of either. Its interpretation depends on personal history, measurement methods, and other factors.

[<VPIcon icon="fas fa-globe"/>A WHOOP study](https://whoop.com/thelocker/understanding-every-stage-of-pregnancy-with-new-pregnancy-coaching/) involving active women, including research associated with West Virginia University, reported a similar pattern of declining HRV and rising resting heart rate. Activity levels affected how much these measurements changed. Regular exercise, therefore, doesn't necessarily prevent pregnancy-related changes in either metric.

WHOOP also shares a rower's account in which her average HRV went from 64 before pregnancy to 50 during the first six months. That's an individual example, not a typical trajectory for every pregnant person. Still, it raises an important question: what happens when a recovery score interprets a change from someone's usual HRV as a negative signal without enough pregnancy context?

A 2025 scoping review of six wearable HRV studies found a similar overall pattern: HRV tended to decline during pregnancy and move back toward pre-pregnancy levels postpartum. But the studies differed in their methods, and the findings don't establish one expected HRV curve for everyone.

### Temperature

This one is trickier because the results depend on what you measure, where you measure it, and when.

A [<VPIcon icon="fas fa-globe"/>2024 study published in *npj Digital Medicine*](https://nature.com/articles/s41746-024-01183-9) analyzed Oura Ring data from 120 people, including 97 full-term pregnancies. After conception, nightly peak skin-temperature measurements rose above pre-pregnancy levels before gradually declining. Nightly lowest measurements followed a different pattern, dipping early in pregnancy and then rising towards delivery.

These were skin-temperature measurements recorded by a wearable, not direct measurements of core body temperature.

The [<VPIcon icon="fas fa-globe"/>Zurich bracelet study](https://pmc.ncbi.nlm.nih.gov/articles/PMC10385491/) measured wrist skin temperature during sleep and found relatively little change across pregnancy. The authors discuss how skin blood flow and the conditions under which measurements are taken may help explain this result.

The two studies used different devices, measurement sites, and methods, so their results aren't directly interchangeable.

This is why "your temperature is up" doesn't mean the same thing in week 6 as it does in week 36. A useful wearable needs to account for the measurement method and the stage of pregnancy before interpreting a temperature trend. A change in skin temperature alone also can't establish whether someone has an infection or another medical condition.

### Breathing and Sleep

In the Zurich study, breathing rate rose from about 12 breaths per minute around weeks 9 and 10 to about 16 around week 17, then eased down later. This was the pattern observed in that small sample, rather than a universal trajectory for pregnancy.

Sleep changes too. A [<VPIcon icon="fas fa-globe"/>2026 study in Frontiers in Global Women's Health](https://frontiersin.org/journals/global-womens-health/articles/10.3389/fgwh.2025.1622895/full) tracked 14 women with an Oura ring over 981 observation days. As pregnancy progressed, deep sleep began later and occurred less frequently, while time spent awake increased.

More deep sleep was associated with lower heart rate and higher HRV, while REM sleep showed the opposite associations. These are associations, not proof that one sleep stage causes a particular cardiovascular response. The sample was also small, so the findings need further study.

Still, the results raise a practical question. An app that treats reduced deep sleep as an isolated negative signal may fail to communicate how sleep patterns can change during pregnancy. A sleep score should help users understand their trends, not imply that every change represents poor recovery.

---

## How Major Wearables Handle Pregnancy

Several major wearable companies now offer pregnancy-related features, although their approaches differ.

Oura launched Pregnancy Insights in August 2025. It tracks temperature trends, resting heart rate, HRV and respiratory rate across pregnancy, with pregnancy-specific context to help users interpret these measurements. Users can also record symptoms and experiences, including nausea and Braxton Hicks contractions.

Oura's [<VPIcon icon="fas fa-globe"/>Pregnancy Insights documentation](https://channellife.com.au/story/oura-app-enhances-pregnancy-insights-with-personalised-tracking) describes the feature's introduction, while its support guidance explains how pregnancy trends and Readiness contributors are presented.

WHOOP has its own Pregnancy Insights. Users enter their due date to receive weekly guidance, and the feature provides pregnancy-related recovery context for up to 12 weeks postpartum. WHOOP also makes clear that its wearable can't detect or diagnose pregnancy. Its [<VPIcon icon="fas fa-globe"/>pregnancy coaching guide](https://whoop.com/thelocker/understanding-every-stage-of-pregnancy-with-new-pregnancy-coaching/) explains the feature and its intended use.

Apple added pregnancy-related tracking support with watchOS 11 and iOS 18. After a user logs a pregnancy in the Health app, Cycle Tracking can display gestational age on Apple Watch. Apple also prompts users to review high-heart-rate notification settings if the threshold is set below 120 bpm. Its guidance recommends turning off Cardio Fitness notifications during pregnancy and until 12 weeks after pregnancy ends.

I read that last recommendation as a reminder that standard health metrics and notifications may need different handling during pregnancy. But Apple's pregnancy logging and notification adjustments aren't the same as the pregnancy-specific trend analysis offered by Oura or the coaching offered by WHOOP.

These are useful steps, but the features shouldn't be treated as equivalent. Each company uses different measurements, algorithms, and forms of guidance, and none of these features replace clinical assessment.

---

## What Pregnancy-Aware Wearables Still Need

This part is my wish list, based on the research and the gaps I see in how consumer wearables communicate health data.

### Exercise Intensity

ACOG's guidance says perceived exertion may be more useful than heart-rate targets for monitoring exercise intensity during pregnancy, since heart-rate responses to exercise can be regular or blunted. Its [<VPIcon icon="fas fa-globe"/>exercise guidance](https://acog.org/clinical/clinical-guidance/committee-opinion/articles/2020/04/physical-activity-and-exercise-during-pregnancy-and-the-postpartum-period) discusses the use of perceived exertion and the talk test.

Most strain and training scores rely heavily on heart rate. I'd like a pregnancy mode that offers a talk-test prompt or a quick effort rating alongside heart-rate data, rather than relying on heart-rate zones alone.

The aim shouldn't be to discard heart-rate measurements. It should be to give them the right context and help users interpret exercise intensity using more than one signal.

### Curves, Not a Straight Line

The research shows that HRV may fall and then rise, breathing rate can change at different stages, and temperature patterns vary depending on what the device measures. A system that relies only on recent trends could misinterpret a late-pregnancy rise in HRV as improved recovery unless it accounts for gestational age and the wider pattern.

Oura already places pregnancy trends alongside reference patterns observed during pregnancy, which is a useful step. I'd like every brand to build on this approach by comparing measurements with both the user's own history and appropriate reference ranges for the relevant stage of pregnancy.

That would require more than assigning every pregnant user the same expected curve. Companies would need validated reference data, consistent measurement methods and testing across different populations. They would also need to account for missing data and explain when the available measurements aren't enough to draw a clear conclusion.

### Different Devices, Different Curves

Not every sensor measures the same thing in the same way. Oura measures skin temperature at the finger, while the Zurich bracelet study measured wrist skin temperature. The studies produced different temperature patterns, but differences in sensor location, measurement methods, and study design make a direct comparison difficult.

This is worth remembering when comparing your numbers with charts you find online from another device. A difference between two readings doesn't automatically mean that one device is wrong. The measurements may reflect different signals.

I'd like companies to explain what their sensors measure, how they process the data, and which comparisons are appropriate. That information would make it easier for users to understand what a trend can and cannot tell them.

### Symptoms Need a Seat at the Table

Nausea, food aversions, Braxton Hicks contractions and plain exhaustion are exactly the kind of context that can help explain an unusual morning score. The Zurich study also linked self-reported feelings such as stress and tiredness with changes in HRV and breathing rate.

Oura already offers a way to record this context through its Pregnancy Insights symptom tags. In the app's Keeping Track section, users can log symptoms, activities, emotions and other factors that may affect how they feel during pregnancy. Examples include nausea, heartburn, vomiting, and Braxton Hicks contractions. These tags can be viewed alongside biometric trends, helping users identify patterns over time. They don't directly change daily scores or prove that a particular symptom caused a change in HRV, heart rate or sleep.

I'd like to see this feature go one step further with a one-tap check-in when a score changes noticeably, making it easier to record relevant symptoms at the time. That context could help users interpret their trends more clearly, without treating symptoms as a reason to dismiss unusual readings or replacing medical advice.

That doesn't mean symptoms should be used to dismiss unusual readings. Instead, they should help the app explain the data more clearly and identify when a trend needs attention rather than simply assigning a lower score.

### Alerts That Need a Gentler Voice

Routine prenatal visits may be separated by several weeks, depending on gestational age and individual needs. Continuous wearable measurements could provide additional observations between appointments, but more data doesn't automatically lead to better clinical decisions.

Researchers have suggested that HRV could be worth studying as a potential signal associated with hypertensive disorders, while temperature measurements could contribute to research into infection detection.

But the evidence discussed here doesn't establish either metric as a validated standalone screening tool for these conditions. Larger studies and clinical validation are needed before such alerts can be relied on.

Getting an unexplained notification about a physiological change can cause a pregnant person unnecessary concern, particularly when an app can't establish whether that change is clinically significant. If pregnancy-related alerts are introduced, the wording needs care. The app should explain what changed, acknowledge uncertainty, and provide appropriate guidance on when to contact a healthcare professional.

### Postpartum

Your baseline changes again after birth. WHOOP offers pregnancy-related guidance for up to 12 weeks postpartum, while Apple recommends turning off Cardio Fitness notifications during pregnancy and for 12 weeks afterward.

These product settings recognize that pregnancy-related changes can extend beyond delivery, but they shouldn't be interpreted as a universal physiological recovery timeline. The 2025 HRV review found that HRV tended to return toward pre-pregnancy levels postpartum, but individual recovery patterns vary.

A device shouldn't automatically treat your pre-pregnancy numbers as the only reference point on day one after birth. It should account for postpartum trends and allow time for measurements to change. And honestly, with a newborn at home, sleep data needs a fair amount of context too.

---

## Wrapping Up

Baseline tracking only works if the baseline is allowed to change. Pregnancy affects several physiological measurements in patterns researchers are still working to understand, and Oura, WHOOP, and Apple have all introduced features to address parts of the problem.

My wish list is short: reference ranges by gestational week, exercise guidance that considers perceived effort, sleep scoring that accounts for changes in sleep patterns, careful alerts, and a gradual return to pre-pregnancy comparisons after birth.

The next step is to validate these approaches across larger and more varied groups of pregnant users. Wearables need to explain changes clearly, account for individual differences, and distinguish unusual measurements from clinically meaningful signals.

And if you're pregnant and wearing one of these devices, discuss health concerns with your care team regardless of what your wearable reports. These devices can provide useful context, but they don't replace prenatal care.

I'm curious which brand will take the next step in making pregnancy-related health data easier to interpret.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Wearables Can Adapt When Pregnancy Changes a User's Regular Baseline",
  "desc": "Your smart ring or watch has many useful jobs, including learning your usual physiological patterns and showing you when they change. Resting heart rate, heart rate variability (HRV), temperature, and",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-wearables-can-adapt-when-pregnancy-changes-a-user-s-regular-baseline.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
