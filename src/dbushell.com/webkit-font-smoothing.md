---
lang: en-GB
title: "What’s the deal with WebKit Font Smoothing?"
description: "Article(s) > What’s the deal with WebKit Font Smoothing?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Browser
  - Apple
  - Safari
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
  - browser
  - apple
  - safari
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What’s the deal with WebKit Font Smoothing?"
    - property: og:description
      content: "What’s the deal with WebKit Font Smoothing?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/webkit-font-smoothing.html
prev: /programming/css/articles/README.md
date: 2024-11-05
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-11-05-webkit-font-smoothing.png
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

```component VPCard
{
  "title": "Safari > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/safari/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What’s the deal with WebKit Font Smoothing?"
  desc="The one where I research subpixel antialiasing on macOS"
  url="https://dbushell.com/2024/11/05/webkit-font-smoothing/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-11-05-webkit-font-smoothing.png"/>

Have you ever added this CSS?

```css
body {
  -webkit-font-smoothing: antialiased;
}
```

What’s the deal with that?

I’ve always tried to avoid this CSS because a long time ago **Dmitry Fadeyev** asked us to [<VPIcon icon="fas fa-globe"/>Please Stop “Fixing” Font Smoothing](https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/).

::: info "Please Stop “Fixing” Font Smoothing" *From usabilitypost* (<VPIcon icon="fas fa-globe"/><code>usabilitypost.com</code>)

> The antialiasing mode is not a “fix” for subpixel rendering – in most cases it’s a handicap. Subpixel rendering is technically superior, clearer, and more readable than antialiasing because by utilizing every one of the subpixels it increases its effective resolution used for font smoothing by three times.

```component VPCard
{
  "title": "Please Stop "Fixing" Font Smoothing",
  "desc": "I wrote two posts on the topic of WebKit font smoothing before, but unfortunately the situation has grown worse since then. In allowing the designer to pick their own font smoothing mo...",
  "link": "https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing//",
  "logo": "https://usabilitypost.com/images/favicon.png",
  "background": "rgba(224,134,138,0.2)"
}
```

:::

This argument made sense to me. I’d like to assume the browser knows what’s best. I’ve always erred on the side of defaults and not messed with font smoothing.

Over the years I’ve had plenty of designers request I add the CSS above for aesthetic reasons. I would protest but usually yield to get a job over the finish line.

Perhaps it’s time to reevaluate?

---

## Fast Forward

The current year is 2024 and **Josh Comeau** updated [<VPIcon icon="fas fa-globe"/>A Modern CSS Reset](https://joshwcomeau.com/css/custom-css-reset/) which includes the same CSS snippet:

```css
body {
  /* 4. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}
```

(That may have been in the 2021 version but I’m just seeing it now.)

Josh explains why `subpixel-antialiased` — the default on macOS — is outdated. Therefore the criticism of applying `antialiased` is void.

> In macOS Mojave, released in 2018, **Apple disabled subpixel antialiasing across the operating system.** I’m guessing they realized that it was doing more harm than good on modern hardware.

Basically *subpixel antialiasing* is a relic of old low pixel density LCDs. If Apple has disabled it elsewhere on macOS, why shouldn’t we disable it in the browser too?

---

## macOS Only

So using `-webkit-font-smoothing: antialiased` disables subpixel antialiasing on macOS where it is enabled by default in **web browsers only**.

I wanted to test for myself on every operating system and device I have. I whipped up a quick [CodePen test (<VPIcon icon="fa-brands fa-codepen"/>`dbushell`)](https://codepen.io/dbushell/full/OJKEvvq) with various typographic samples. In hindsight it’s not the most readable test page but it did the job.

I tested on:

- Linux (Ubuntu 24.04)
- Windows 11
- macOS Sequoia 15.1
- iOS 18.1
- iPadOS 18.1
- An old Android 9 device

I tested in Firefox, Chromium, and Safari where possible.

For desktop I tested two monitors:

- 24” @ 1920×1080 - low DPI
- 27” @ 3840×2160 - high DPI

The 4K higher DPI monitor wouldn’t be considered “retina” by fans of Apple’s marketing department but it’s good enough for my eyes.

After an hour of juggling HDMI cables and almost dropping a monitor on my head I can safely conclude that `-webkit-font-smoothing` is **macOS only.**

Literally macOS only. Not even iOS Safari cares for it. I can categorically conclude that this CSS property has absolutely no effect outside of macOS. I feel like I already knew that but it’s good to test these things.

---

## Thick Consistency

So a quick recap of what this CSS does on macOS:

```css
body {
  -webkit-font-smoothing: antialiased;
}
```

This CSS **disables** the default “subpixel antialiasing” on macOS that is only enabled in web browsers. Text is rendered visually lighter as a result. From my observation **fonts are rendered closer in weight to other operating systems**. To put it another way: macOS web text is rendered abnormally thick by default.

In conclusion: I’m now on board with [<VPIcon icon="fas fa-globe"/>Josh Comeau](https://joshwcomeau.com/css/custom-css-reset/). I’m adding this to my CSS reset going forward. All modern browsers support `-webkit-font-smoothing` including Firefox 128+ so the `-moz-osx-font-smoothing` version isn’t necessary.

If you’re still unsure remember this is macOS only. If you don’t use a Mac, who cares! If you’re a Mac developer and leave the default subpixel-antialiasing enabled make sure to test other platforms to ensure your font weight isn’t too thin elsewhere.

It’s important to remember that all fonts will render differently and aesthetic preference is subjective. Choose a weight and size that is legible for the specific font. Using [<VPIcon icon="fa-brands fa-firefox"/>`font-size-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust) can help even out any differences in a font stack. [<VPIcon icon="fa-brands fa-firefox"/>Variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide) allow for more granular control over font weight.

Am I wrong? [Correct me on social media (<VPIcon icon="fas fa-mastodon"/>`@dbushell`)](https://social.lol/@db/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s the deal with WebKit Font Smoothing?",
  "desc": "The one where I research subpixel antialiasing on macOS",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/webkit-font-smoothing.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
