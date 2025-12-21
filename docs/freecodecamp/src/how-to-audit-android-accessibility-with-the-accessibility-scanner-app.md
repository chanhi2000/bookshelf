---
lang: en-US
title: "How to Audit Android Accessibility with the Accessibility Scanner App"
description: "Article(s) > How to Audit Android Accessibility with the Accessibility Scanner App"
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
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Audit Android Accessibility with the Accessibility Scanner App"
    - property: og:description
      content: "How to Audit Android Accessibility with the Accessibility Scanner App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-audit-android-accessibility-with-the-accessibility-scanner-app.html
prev: /programming/java-android/articles/README.md
date: 2025-07-01
isOriginal: false
author:
  - name: Ilknur Eren
    url : https://freecodecamp.org/news/author/ilknureren/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1751301060182/df4d483a-8dd6-45ce-a665-76cbf45ef945.png
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
  name="How to Audit Android Accessibility with the Accessibility Scanner App"
  desc="The Web Content Accessibility Guidelines (WCAG 2.1 Level AA) is an internationally recognized standard for digital accessibility. Meeting these guidelines helps you make sure that your website is usable by people with visual, motor, hearing, and cogn..."
  url="https://freecodecamp.org/news/how-to-audit-android-accessibility-with-the-accessibility-scanner-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1751301060182/df4d483a-8dd6-45ce-a665-76cbf45ef945.png"/>

The Web Content Accessibility Guidelines (WCAG 2.1 Level AA) is an internationally recognized standard for digital accessibility. Meeting these guidelines helps you make sure that your website is usable by people with visual, motor, hearing, and cognitive impairments.

Google’s [<VPIcon icon="fa-brands fa-google-play"/>Accessibility Scanner](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor&hl=en_US) on Google Play is a free app that offers developers, designers, and product leaders the ability to audit their app to find accessibility issues. The app is designed to highlight accessibility issues that might not meet the WCAG 2.1 Level AA standards.

Once installed, the Accessibility Scanner allows you to take screenshots or video recordings of your app, then highlights areas that may not meet accessibility requirements, like small touch targets, low color contrast, or missing content labels.

---

## How to Download and Enable the Accessibility Scanner

In five quick steps, you can download the Accessibility App and enable it on your Android device.

1. Search “Accessibility Scanner” on Google Play Store and download it.
2. Find the downloaded app on your device and open it.
3. Turn on the Accessibility scanner by clicking on the “Turn on” button on the bottom right side of the page. This will take you to your Accessibility Settings.
4. In the Accessibility Setting page, click on the Accessibility Scanner button. This will take you to the Accessibility Scanner Settings.
5. Find Accessibility Scanner toggle and turn it on. (This will open a modal that asks if you allow “Accessibility Scanner” to have full control of your device, click Allow.)

After step five, you will have a blue checkmark icon will appear on the right side of your screen (see image below). This floating icon gives you quick access to start scanning any screen for accessibility issues.

![Facebook Log in Page with Accessibility Scanner toggle on the right with arrow pointing to it](https://cdn.hashnode.com/res/hashnode/image/upload/v1750821547116/75f49863-7f19-4db5-ada1-45483c0df70b.png)

---

## How to Use the Accessibility Scanner

To scan or record your app to find accessibility issues, tap the blue checkmark icon. You’ll see a few options after clicking on the blue checkmark:

- **Record**: Captures a short video of user interaction and generates a report of potential accessibility issues.
- **Snapshot**: Takes a static screenshot and flags issues found on that screen.
- **Turn off:** Turns the Accessibility Scanner off.
- **Collapse:** Collapses the options to show the initial blue checkmark.

![Facebook Log in Page with Accessibility Scanner toggle opened on the right with arrow pointing to it](https://cdn.hashnode.com/res/hashnode/image/upload/v1750895121001/9673c7d5-5182-4c99-b36a-1b2a2e27986b.png)

You can choose between taking a single **Snapshot** or recording user flow using **Record** to evaluate multiple screens.

### How to Use the Snapshot Feature

The snapshot button will take a snapshot of the page you are currently in and give you a result of accessibility issues that may be on the page. The accessibility issues will be highlighted in red boxes.

The image below is the result of taking a snapshot of the Facebook log in page. The accessibility scanner states that there are 10 accessibility suggestions on this page alone.

![Facebook log in page with red boxes around several elements, highlighting accessibility issues.](https://cdn.hashnode.com/res/hashnode/image/upload/v1750898582440/76cc763c-e6db-46a9-b062-2e29a57e7022.jpeg)

You can click on the highlighted area in order to get more details of the potential accessibility issue. For example, you can click on the red box that is highlighting the “Mobile number or email” form that’s in the image above. Once you click on the highlighted area, you will get additional information.

The image below is the result of clicking on the “Mobile number or email” form element. Accessibility Scanner is highlighting errors it found on this email form.

The first suggestion it gives is to fix the item label, because the item may not have a label readable by screen readers. The second issue it highlights is the Touch Target and suggests that the target should be larger. The final suggestion is the Unexposed Text, possible text detected: Mobile number or email.

Snapshots allow us to take screenshots of our pages and highlight accessibility issues.

![Email form field is selected from Accessibility Scanner. Scanner shows three areas to fix.](https://cdn.hashnode.com/res/hashnode/image/upload/v1750898563142/ce93909e-b351-405c-8367-dd47d7d19c9f.jpeg)

### How to Use the Record Feature

If you select to record, the Accessibility Scanner will take snapshots at intervals as you go through your app’s pages. To end the recording, tap the blue pause button (which replaces the original checkmark during recording).

Once you stop recording, Accessibility Scanner will give you the several snapshots and highlighted errors. The image below is the result of recording the Facebook log in page in less than a minute.

While recording, I navigated to other pages within the app. The recording gave 5 snapshots of the pages I was going through. You can see the snapshots on top of the page. In the image below, I am on screen one of five,. I can click to the other snapshots underneath the words, “Screen 1 of 5” and see issues for different snapshots taken during my recording. Similar to the snapshot accessibility audit, you can click on the red boxes and get more information on the errors.

![Facebook Log in Page with Accessibility Scanner highlighting elements with accessibility issues.](https://cdn.hashnode.com/res/hashnode/image/upload/v1750898542344/a390f512-262d-40c1-87ad-35e36c31def4.jpeg)

---

## Why Use the Accessibility Scanner?

The Accessibility Scanner is a valuable tool for teams throughout the app development lifecycle. Engineers can use it early in the process to scan the app locally, identify accessibility issues, and resolve them before release. During the QA phase, designers and product managers can use the scanner to audit user interfaces and flag potential accessibility concerns. Even after an app is in production, all teams can continue to use the scanner to monitor and improve accessibility.

But it’s important to note that the Accessibility Scanner is just one part of an accessibility strategy - it’s not a complete replacement for manual testing or audits. And it won’t catch all types of accessibility barriers - especially those that require keyboard navigation, screen reader testing, or cognitive usability reviews. But it is a simple and effective starting point for improving accessibility in Android apps.

You should use it alongside other tools, such as Android’s TalkBack for screen reader testing. Most importantly, real-world feedback from people who use assistive technologies is essential to identifying usability barriers that automated tools may miss.

With just a few taps, Accessibility Scanner helps surface issues that might otherwise be missed. It’s a free, lightweight, and essential tool for anyone building inclusive mobile experiences.

---

## Thanks for Reading!

You should now know how to get started using the Accessibility Scanner to check your apps’ accessibility and make sure they’re usable by everyone.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Audit Android Accessibility with the Accessibility Scanner App",
  "desc": "The Web Content Accessibility Guidelines (WCAG 2.1 Level AA) is an internationally recognized standard for digital accessibility. Meeting these guidelines helps you make sure that your website is usable by people with visual, motor, hearing, and cogn...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-audit-android-accessibility-with-the-accessibility-scanner-app.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
