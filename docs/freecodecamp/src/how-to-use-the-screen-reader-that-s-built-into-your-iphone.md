---
lang: en-US
title: "How to Use the Screen Reader That's Built into Your iPhone"
description: "Article(s) > How to Use the Screen Reader That's Built into Your iPhone"
icon: iconfont icon-ios
category:
  - DevOps
  - Apple
  - iOS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - apple
  - ios
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Screen Reader That's Built into Your iPhone"
    - property: og:description
      content: "How to Use the Screen Reader That's Built into Your iPhone"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-screen-reader-that-s-built-into-your-iphone.html
prev: /devops/ios/articles/README.md
date: 2026-07-01
isOriginal: false
author:
  - name: Ilknur Eren
    url: https://freecodecamp.org/news/author/ilknureren/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b5b3867f-7404-4557-85e6-bc508c88a961.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "iOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/ios/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the Screen Reader That's Built into Your iPhone"
  desc="Every iPhone and iPad includes a built-in screen reader called VoiceOver. VoiceOver speaks aloud the text on the screen, app names, icons, buttons, menus, links, and notifications and alerts. These ac"
  url="https://freecodecamp.org/news/how-to-use-the-screen-reader-that-s-built-into-your-iphone"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b5b3867f-7404-4557-85e6-bc508c88a961.png"/>

Every iPhone and iPad includes a built-in screen reader called VoiceOver.

VoiceOver speaks aloud the text on the screen, app names, icons, buttons, menus, links, and notifications and alerts.

These accessibility features are crucial for users who may be blind, have low vision, or have reading differences.

As a developer, it's always important to manually test your website for accessibility. A screen reader is one of the most important tools to add to your testing process. Even small issues, like a button with no label or an image with no alt text, can make a page completely unusable for someone relying on VoiceOver.

As you test on an actual device with VoiceOver, you may find accessibility issues you didn’t know you had. In this tutorial, we'll cover how to turn VoiceOver on, the basic gestures to know, and how to adjust its settings to fit your needs.

---

## How to Turn On VoiceOver

There are a few ways to turn VoiceOver on or off. As you practice, you might lean toward one option over the others.

### Option 1: Use Settings

1. Open the **Settings** app.
2. Tap **Accessibility**.
3. Tap **VoiceOver**.
4. Toggle it on or off.

In the Accessibility Settings section, you can also find other accessible settings to explore — including Display & Text Size, Motion, and Spoken Content. It's worth browsing through to understand what tools are available to users.

![iOS Accessibility setting page](https://cdn.hashnode.com/uploads/covers/68379e7b1fd0b956f4ad9839/d6b8dc8e-cb17-481d-a0cd-a8966448f7c7.png)

![iOS Accessibility Setting VoiceOver Section](https://cdn.hashnode.com/uploads/covers/68379e7b1fd0b956f4ad9839/416f54e2-5c86-436c-a870-1ec65ed9128f.png)

### Option 2: Use Siri

To turn on VoiceOver using Siri, say: **"Hey Siri, turn on VoiceOver."**

To turn it off, say: **"Hey Siri, turn off VoiceOver."**

Using Siri might be the easiest way to turn VoiceOver on or off for beginners. If you accidentally turn VoiceOver on and don't yet know any shortcuts or gestures, just ask Siri. Siri works independently of VoiceOver gestures, so it's a reliable fallback when you feel stuck.

### Option 3: Set Up the Accessibility Shortcut

If you find yourself turning VoiceOver on and off frequently, setting up the Accessibility Shortcut makes sense. This is the quickest method for developers who are regularly switching VoiceOver on to test and off to work. It lets you toggle VoiceOver by pressing the side button three times.

1. Go to **Settings > Accessibility**.
2. Scroll down and tap **Accessibility Shortcut**.
3. Select **VoiceOver**.

After that, press the side button (or Home button on older iPhones) **three times** to toggle VoiceOver on or off. If you have more than one accessibility feature enabled in the shortcut, your iPhone will show a menu to pick from instead of toggling automatically.

---

## Basic Gestures to Know

When VoiceOver is on, the way you touch the screen changes what the phone interprets. The same swipe or tap that normally opens an app does something different with VoiceOver active.

Here are the five core gestures every developer should learn first:

- **Swipe right**: Move to the next item on screen
- **Swipe left**: Move to the previous item on screen
- **Swipe up or down with three fingers**: Scroll up or down the page
- **One tap**: Hear VoiceOver read the item aloud
- **Double-tap**: Open an app or activate a button

:: tip

When you first tap an item, VoiceOver reads it to you. Then you can double-tap to actually open or activate it. This two-step process helps you confirm you're on the right element before you act. This is especially useful when testing unfamiliar interfaces.

:::

These five gestures are the foundation. As you use VoiceOver more frequently, they'll become second nature. Once you're comfortable, you can explore more advanced gestures like the VoiceOver rotor, which lets you navigate by headings, links, form fields, and more.

For the time being, if you're comfortable with these five gestures, you’ll be able to test mobile accessibility issues for your products.

---

## How to Adjust VoiceOver Settings

You can change how VoiceOver sounds and behaves to better suit your testing workflow or personal preferences.

### Change the Speaking Rate

1. Go to **Settings > Accessibility > VoiceOver**.
2. Use the **Speaking Rate** slider to make it faster or slower.

You can also adjust the speaking rate with the VoiceOver rotor. Rotate two fingers on the screen until you hear “Speaking Rate,” then swipe up or down with one finger to make VoiceOver faster or slower.

This changes the rate on the fly without going into Settings. It's handy when you want to slow down while exploring a complex page or speed up when navigating familiar content.

Experienced VoiceOver users often run the speaking rate very fast. Don't be surprised if the default speed feels quick. You can always slow it down while you're learning.

![iOS Accessibility Speaking Rate Section](https://cdn.hashnode.com/uploads/covers/68379e7b1fd0b956f4ad9839/4247bbbb-44e7-43c6-a341-07f0c7b3fc2e.png)

### Change the Voice

If you want to change the voice or language, Go to Settings > Accessibility > VoiceOver > Speech. From there, you can choose a different VoiceOver voice, add rotor voices for other languages, or enable language detection.

Apple offers multiple voice options across many languages. This is useful when testing multilingual content, but make sure your site also uses correct `lang` attributes so screen readers can switch pronunciation appropriately.

---

## Conclusion

As a developer, it's always important to manually test your website for accessibility. Testing it with the accessibility features your users use is crucial to access the product through their lens and fix accessibility bugs the product might have.

Simply turning the VoiceOver on and learning about these five simple gestures will give you the tools to audit and test your website for accessibility issues.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Screen Reader That's Built into Your iPhone",
  "desc": "Every iPhone and iPad includes a built-in screen reader called VoiceOver. VoiceOver speaks aloud the text on the screen, app names, icons, buttons, menus, links, and notifications and alerts. These ac",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-screen-reader-that-s-built-into-your-iphone.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
