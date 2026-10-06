---
lang: en-US
title: "Embracing Dark Mode: A User's Perspective on Accessibility"
description: "Article(s) > Embracing Dark Mode: A User's Perspective on Accessibility"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Embracing Dark Mode: A User's Perspective on Accessibility"
    - property: og:description
      content: "Embracing Dark Mode: A User's Perspective on Accessibility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/dark-mode-very-much-matters-to-me.html
prev: /programming/css/articles/README.md
date: 2026-09-21
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11094
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Embracing Dark Mode: A User's Perspective on Accessibility"
  desc="Explore the importance of dark mode for accessibility, eye comfort, and user experience in this insightful article. Join the discussion today!"
  url="https://blog.master.dev/dark-mode-very-much-matters-to-me/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11094"/>

The dark mode is an accessibility feature for me. I’m prone to splitting headaches from bright lights like the glaring screens of personal devices. Blue-light-filtering glasses and eye drops don’t work for me. Only dimness does.

In the past, before even eye strain from screens was a thing, I took some precautions to manage my condition:

1. Lowered the brightness on my phone and laptop as much as possible.
2. Set black screen wallpapers.
3. Set a large black image watermark in Word documents so I could type reports in white text.
4. Picked dark colored themes where possible.
5. Never placed the screen facing a light source.

Nowadays, on top of the lowest brightness and black wallpapers, all my devices have dark mode enabled and a matte screen cover.

When [**a recent discussion**](/blog.master.dev/two-vs-three-state-color-theme-toggles.md) came up about the UI for choosing dark/light mode, I read many insightful ideas and arguments about which offered a better user experience. It was a fun back-and-forth to witness, and everyone’s input was wonderful.

At the end of the day, though, I was thinking of myself. Not as a developer trying to figure out the best UX, but as a user who needs the best UX when it comes to dark/light mode.

**My thoughts begin with gratitude to those who have set their apps and sites to match the system appearance by default or at least offer a dark mode option.** If you’ve ever suffered from a migraine caused by screen light, you know my thanks is real.

![Web pages with light and dark appearances](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/wc4UP5Lc.jpeg?resize=1024%2C576&quality=89&ssl=1)

I also believe there’s room for improvement, and I know I don’t represent all users for whom dark/light mode matters.

In fact, I’m curious about other users’ perspectives on this, especially the light-mode people. Those for whom dark/light mode is about vibe or efficiency. Those who have system appearance set to auto. **Why do you choose the appearance you do?**

For me, it’s always dark in the best way possible. However, that choice has exceptions and disappointments, which I’ll share here.

---

## Basic Black

I find it best when the generic dark mode has a **black** background (literally #000), not just a dark shade.

No matter how good the contrast the designer set in the colors, with low screen brightness and, more importantly, a matte screen cover, the contrast noticeably drops on my screen. I don’t find that an issue when **the background is just black**.

Even dark greyish text (not that it should’ve been that color) is readable against black. However, a typical dark mode doesn’t usually have a pure black background. It’s usually dark grey or dark navy.

Maybe that’s a conscious choice by the designers to avoid the jarringness of black, but in my case, **black is much appreciated**, and it would be great if that was the default.

---

## When the Appearance Changes

Sometimes, someone else needs to use my computer or phone, and as one of them had once succinctly put it, it’s *frustrating* how dim everything is on my screens.

They need light, so I turn it on in the system settings.

One aspect I believe came up in the dark/light mode discussion was about retaining the chosen mode in an app or site when the system appearance changes.

**To me, switching between dark and light at the system level is an appearance *reset***. What I expect is that all apps and sites will switch to the mode I just set for the system.

So, when I update at the system level, I’m hoping my borrower gets a lightbox they could use that’s always on, i.e., all apps and sites have turned to light mode.

If I need to borrow back and quickly work in system-level light mode, I’ll just turn on **dark mode in the app I’m using** and turn it off once I’m done.

Hence, I need that one checkbox in the individual apps or sites that’ll let me swap the mode. Unfortunately, even among native apps, that checkbox is not ubiquitous.

---

## Contrast Adjustment

Like I mentioned before, in dark mode, I prefer a black background, and it’s not always set that way. In that case, it’d be great if I could adjust the darkness (or lightness for others) to suit my needs.

A fixed default appearance for dark/light mode is a bit of a disadvantage. The appearance need not have to be changed drastically; that’s what themes are for, but **to be able to increase or decrease contrast would be nice**.

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/01a0adbe-ecca-77b4-aa5c-f59e2836203a"
  title="Darkness Slider"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Bright Spots

Surprisingly, I find small white or bright areas against a dark background to be very helpful.

Those parts of high luminosity definitely catch my attention, and if that design is purposeful, **to make navigation or communication easier**, it comes through.

![A television displaying 'Prehistoric Planet 2' with a dinosaur leaping out of the water, accompanied by two HomePod speakers on a modern media console, highlighting a cinematic audio-visual experience.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/DeZpeJNo.png?resize=1024%2C661&quality=80&ssl=1)

In fact, I’ve come to realize it’s much better when icons and action buttons don’t dim or darken in dark mode.

On the other hand, **if the brightness is not purposeful or is distracting, then it just comes off as poor design**, and I believe it’s the same for light mode, where black can either bring clarity or disruption.

One thing I find myself squinting at is text in bright spots. A few words are fine, but **highlighting blocks of text with bright backgrounds undermines the dark mode**.

Moving bright spots? Depends.

**It comes down to how long I have to look at it to get the information I need.** If it’s a carousel with three or four slides? I’m good.

If there are endless slides, and I have to scroll a lot and look at it longer, dimming the slides or swapping the backdrops to dark (like in icons) helps tremendously.

---

## Final Thoughts

I rely on dark mode.

The only time I choose light mode at the system level is when I’m handing over my device to others who need the brightness. Or if it’s in an app or site, I use it to check how the colors look against white or how everything might look in print.

Overall, I assume if I change the mode at the system level, it reflects everywhere, and that one clear checkbox in the apps will let me override the default system mode when needed.

I’ve already said I’m only a subset of users for whom dark/light mode matters. It’s better to hear from everyone for whom these modes make a world of difference, like they do for me.

Ironically, I think we developers make up a good chunk of those users, and perhaps looking into how we ourselves benefit from this, and hearing from each other as users, will help us serve others better. **It’s simple: there’s a reason you’re reading this as white text on a black background or black text on a white background; what is that reason, how this mode came to be here, and what will you have to do to swap the mode for someone else to borrow your screen and read this ending? That makes for a good UX exercise.**

```component VPCard
{
  "title": "Why is this thing in Dark Mode?",
  "desc": "The website has the most control, since that's what applies the CSS. But browsers also have a Dark/Light/System setting, and that can fall through to the OS/Device.",
  "link": "/blog.master.dev/why-is-this-thing-in-dark-mode.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Quick Dark Mode Toggles",
  "desc": "All the browsers DevTools have a way of emulating color modes. The are essentially faking the system preference at the application level. Here's where those controls are located and another nice tool. ",
  "link": "/blog.master.dev/quick-dark-mode-toggles.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Tweaking One Set of Colors for Light/Dark Modes",
  "desc": "A CSS Custom Property can be used to tweak colors darker when shown on light and lighter when shown on dark, making them pop in both cases. ",
  "link": "/blog.master.dev/tweaking-one-set-of-colors-for-light-dark-modes.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Embracing Dark Mode: A User's Perspective on Accessibility",
  "desc": "Explore the importance of dark mode for accessibility, eye comfort, and user experience in this insightful article. Join the discussion today!",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/dark-mode-very-much-matters-to-me.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
