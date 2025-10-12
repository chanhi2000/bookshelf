---
lang: en-US
title: "Quick Dark Mode Toggles"
description: "Article(s) > Quick Dark Mode Toggles"
icon: fa-brands fa-chrome
category:
  - Google
  - Google Chrome
  - Firefox
  - Apple
  - macOS
  - Safari
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - google
  - chrome
  - google-chrome
  - firefox
  - apple
  - macos
  - safari
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Quick Dark Mode Toggles"
    - property: og:description
      content: "Quick Dark Mode Toggles"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/quick-dark-mode-toggles.html
prev: /tool/chrome/articles/README.md
date: 2025-08-22
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6826
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Firefox > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/firefox/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Safari > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/safari/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Quick Dark Mode Toggles"
  desc="All the browsers DevTools have a way of emulating color modes. The are essentially faking the system preference at the application level. Here's where those controls are located and another nice tool. "
  url="https://frontendmasters.com/blog/quick-dark-mode-toggles/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6826"/>

I’ve moved off of Arc browser, but it had a browser-level feature of being able to toggle beween light and dark mode that I liked. I still have some muscle memory for that, so in the time I’m spending back on other Chrome-based browsers, I was looking for another browser-level toggle for it.

---

## Chrome

Chrome can do it, but it’s a little buried in DevTools. The main setting is under the “Rendering” tab (which I always remember how to get to be going under the main **Console** tab then pressing **ESC**, then choosing **Rendering** in the three-dot menu). In there, you’ll see an option for **Emulate CSS media feature prefers-color-scheme** where you can select light or dark.

![Screenshot of Chrome DevTools showing the 'Rendering' tab with options for emulating CSS media feature prefers-color-scheme.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-21-at-1.16.56-PM.png?resize=1024%2C931&ssl=1)

Alternatively, it’s a bit quicker to use the Command Palette (<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) and starting typing **emulate** and you’ll see a quick option to toggle to the value you want.

![Screenshot of Chrome DevTools Command Palette with options for emulating CSS prefers-color-scheme.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-21-at-1.18.01-PM.png?resize=1024%2C530&ssl=1)

Or, use the little paintbrush icon under the **Elements** tab then in the **Styles** section.

![Screenshot of a browser's DevTools showing the Styles panel, with options to toggle between light and dark color schemes.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-22-at-7.31.51-AM.png?resize=1024%2C410&ssl=1)

### The Non-Standard Chrome Thing

See in the first screenshot there is a setting called **Enable automatic dark mode** as well. I have made this mistake recently of thinking this was how you flip on dark mode testing, and it was pointed out to me, hence this blog post. *That* feature is some Chrome-specific thing which takes a page which may have been designed as light-mode-first (or only) and forces a dark mode on it whether it was designed to or not.

![Screenshot of a coding environment showing the Chrome DevTools interface with the Console and Rendering tabs open, highlighting options for enabling automatic dark mode and simulating CSS media features.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-21-at-1.26.22-PM.png?resize=1024%2C612&ssl=1)

This blog post in the WordPress editor with *forced* dark mode. This page doesn’t support a dark mode normally.

The **Enabled automatic dark mode** feature isn’t particularly relevant. I think it’s some Chrome team idea that hasn’t gone anywhere yet. It’s not something you’d really need to test with/for in my opinion.

---

## Firefox

Firefox has some mutually exclusive buttons in DevTools under the **Inspector** panel. The little sun icon is simulating preferring light mode and the moon(ish) icon is preferring light mode. Or they can both be off defaulting to the system.

![Screenshot of Chrome DevTools, showing the Inspector panel with options for toggling dark color scheme simulation for web pages.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-22-at-7.35.52-AM.png?resize=1024%2C217&ssl=1)

---

## Safari

In Safari DevTools under the **Elements** panel there is an icon to control the color modes as well as some other accessibility media preference simulators.

![A screenshot of browser developer tools displaying the appearance settings, specifically the color scheme set to dark, under the Elements tab.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/CleanShot-2025-08-22-at-07.42.46%402x.png?resize=1024%2C323&ssl=1)

---

## OS

Other than the non-standard Chrome thing, all this is doing is pretending as if the user has set one of the modes specifically at their OS level.

![A user interface displaying color mode options for appearance settings, including Light, Dark, and Auto modes.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-21-at-1.23.38-PM.png?resize=920%2C306&ssl=1)

The macOS version of setting Dark Mode.

Personally, I find it a little cumbersome to need DevTools or go into System Settings to test dark/light mode on sites. It was nice in Arc to have a simple command to do it, but as I write, color modes aren’t really a browser-level settings for the most part (let alone site-specific settings).

So I was happy to find [Nightfall (<VPIcon icon="iconfont icon-github"/>`r-thomson/Nightfall`)](https://github.com/r-thomson/Nightfall?tab=readme-ov-file), a little macOS menu bar utility for swapping out color modes.

There is something extra nice about doing the toggling at the system level as it feels like the “real” way to do it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Quick Dark Mode Toggles",
  "desc": "All the browsers DevTools have a way of emulating color modes. The are essentially faking the system preference at the application level. Here's where those controls are located and another nice tool. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/quick-dark-mode-toggles.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
