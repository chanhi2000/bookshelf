---
lang: en-US
title: "Honoring Mobile OS Text Size"
description: "Article(s) > Honoring Mobile OS Text Size"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Honoring Mobile OS Text Size"
    - property: og:description
      content: "Honoring Mobile OS Text Size"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/honoring-mobile-os-text-size.html
prev: /programming/css/articles/README.md
date: 2026-02-07
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2026/02/Android-text-size_thumb-300x300.jpg
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
  name="Honoring Mobile OS Text Size"
  desc="If your users scale the text size in Android or iDeviceOS, that doesn’t always affect the size of text on a web page. It’s a function of browser and authored code, as opposed to a standardized approach. That may be changing. Support The current state of affairs in the three…"
  url="https://adrianroselli.com/2026/02/honoring-mobile-os-text-size.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2026/02/Android-text-size_thumb-300x300.jpg"/>

If your users scale the text size in Android or iDeviceOS, that doesn’t always affect the size of text on a web page. It’s a function of browser and authored code, as opposed to a standardized approach. That may be changing.

::: info Support

The current state of affairs in the three rendering engines…

:::

:::: tabs

@tab:active <VPIcon icon="fa-brands fa-firefox"/>

Firefox on Android supports scaling a web page’s text if you adjust the system font size. It doesn’t seem to care if you use `px` units. You don’t need to do anything special; it just works.

@tab <VPIcon icon="fa-brands fa-safari"/>

Safari will not scale a web page’s text with the OS settings unless the author adds some CSS. This code points to the system font properties (such as size):

```css
body {
  font: -apple-system-body;
  /* other styles, including font-family */
}
```

This feature query checks for support while trying to limit it to touch devices only, then sets the font size:

```css
@supports (font: -apple-system-body) and (not (-webkit-touch-callout: default)) {
  :root {
    font-size: 100%;
  }
}
```

The rest of your styles have to use relative units or this breaks down.

@tab <VPIcon icon="fa-brands fa-chrome"/>

Google has opted *not* to follow Firefox’s lead and support OS text sizes by default. Google has also opted not to mimic Safari and make platform-specific features. Instead, Google has decided to use its weight in the CSSWG to mint a new value for the `<meta>` element:

```html
<meta name="text-scale" content="scale">
```

For this to work, however, the author will need to “opt-in” by *not* setting a base font size in your CSS:

```c
body {
  /* font-size: yeah, no */
}
```

You actually can set one, but it should be a percentage. You then need to avoid fixed units (such as `px`) throughout your site. If this seems familiar, it’s the core thesis of my aptly-named post [<VPIcon icon="fas fa-globe"/>The Ultimate Ideal Bestest Base Font Size That Everyone Is Keeping a Secret, Especially Chet](https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html#comment-283164).

::: info

Read Josh Tumath’s post [<VPIcon icon="fas fa-globe"/>Try text scaling support in Chrome Canary](https://joshtumath.uk/posts/2026-01-27-try-text-scaling-support-in-chrome-canary/) for more details.

:::

::::

---

## Frankenstyle’s Monster

Let’s combine those into one set of code that will work in Safari and now Chrome. Firefox was always on point, so no effort needed there.

Add this HTML to the `<head>` of your page (it’s the CSSWG code):

```html
<meta name="text-scale" content="scale">
```

Add this to the CSS of your page (it’s Apple’s code):

```css
body {
  font: -apple-system-body;
  /* other styles, including font-family */
}
@supports (font: -apple-system-body) and (not (-webkit-touch-callout: default)) {
  :root {
    font-size: 100%;
  }
}
```

Done.

---

## Frankenstyle’s Demo

I made a demo. It has images and a table. [Visit the debug version (<VPIcon icon="fa-brands fa-codepen"/>`aardrian`)](https://cdpn.io/aardrian/debug/azZjgGZ) in your mobile browser.

<CodePen
  user="aardrian"
  slug-hash="azZjgGZ"
  title="Honoring Mobile OS Text Scale"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## How to Test Frankenstyle’s Demo

Seriously, [visit the debug version (<VPIcon icon="fa-brands fa-codepen"/>`aardrian`)](https://cdpn.io/aardrian/debug/azZjgGZ) in your mobile browser. I’m not dealing with desktop here.

With your Android device, [<VPIcon icon="fa-brands fa-google"/>install Chrome Canary](https://play.google.com/store/apps/details?id=com.chrome.canary&hl=en) from the Google Play store. If you are using an Android device with another app store, I leave it to you to sort that out. Then, using [<VPIcon icon="fa-brands fa-chrome"/>`chrome://flags`](chrome://flags/#enable-experimental-web-platform-features), enable *Experimental Web Platform Features* in Chrome Canary.

### Android

In Android, go to *Settings* → *Accessibility* → *Display size & text*; in the *Size options* section, go to *Font size* and make it as large as possible.

![The Android text size settings screen at the smallest size.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_default_Android.jpg)

![The Android text size settings screen at the largest size.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_largest_Android.jpg)

The smallest Android text size setting and then the largest setting.

### iDevices

In iDevices, go to *Settings* → *Accessibility* → *Display & Text Size* → *Larger Text*, toggle *Larger Accessibility Sizes*, then drag that slider all the way to the to max.

![The iPadOS text size settings screen at the smallest size.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_default_iPadOS.jpg)

![The iPadOS text size settings screen at the largest size.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_largest_iPadOS.jpg)

The smallest iPadOS text size setting and then the largest setting.

---

## My Results from Frankenstyle’s Demo

These are before (small text) and after (largest text) images of Frankenstyle’s Demo. Your experience may differ. If you’re reading this from the future, it may differ a lot.

None of these required a browser reload. It may take a moment, so be patient.

### Firefox

![Firefox showing four paragraphs and the embedded photo of Jeff Goldblum.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_default_Firefox.jpg)

![Firefox showing twelve lines of text under the massive heading and about 20 characters per line.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_largest_Firefox.jpg)

Frankenstyle’s Demo in Firefox on Android, behaving just as it would without the Frankenstyles.

### Safari

![Safari showing about four paragraphs of text and images.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_default_Safari.jpg)

![Safari showing eight lines of text and about 10 characters per line.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_largest_Safari.jpg)

Frankenstyle’s Demo in Safari on iPadOS. I scrolled the second one a bit to show the inline images.

### Chrome Canary

![Chrome Canary showing four paragraphs and the embedded photo of Jeff Goldblum.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_default_Chrome-Canary.jpg)

![Chrome Canary showing twelve lines of text under the massive heading and about 20 characters per line.](https://adrianroselli.com/wp-content/uploads/2026/02/Text-size_largest_Chrome-Canary.jpg)

Chrome Canary showing Frankenstyle’s Demo.

---

## Other Reading

Things that may better inform those words and pictures above:

- CSSWG: [Explainer: meta tag for text scaling behavior (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/blob/main/css-env-1/explainers/meta-text-scale.md)
- CSSWG: [Explainer: `env(preferred-text-scale)` (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/blob/main/css-env-1/explainers/env-preferred-text-scale.md) (not addressed in this post)
- CSS Fonts Module Level 5 [<VPIcon icon="iconfont icon-w3c"/>§2. Text-Scale `<meta>` element](https://drafts.csswg.org/css-fonts-5/#text-scale-meta)
- Even though CSSWG issue OP suggests the [`<meta>` might better belong in WHATWG HTML (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/12380#issuecomment-2993195860), I could find [no corresponding issue with WHATWG (<VPIcon icon="iconfont icon-github"/>`whatwg/html`)](https://github.com/whatwg/html/issues?q=is%3Aissue%20state%3Aopen%20meta%20text-scale).
- Just as I was about to post this, I learned Manuel Matuzovic wrote [<VPIcon icon="fas fa-globe"/>A new meta tag for respecting text scaling on mobile](https://matuzo.at/blog/2026/text-scaling-meta-tag) just this morning.
- Yesterday Nat Tarnoff made the point that replicating platform features in the browser (ahem, overlays) is a poor idea, and this increased OS-level support bolsters his argument: [<VPIcon icon="fas fa-globe"/>Quick Tip: Do Not Replicate OS Behavior](https://tarnoff.info/2026/02/05/quick-tip-do-not-replicate-os-behavior/).

::: info Other Posts

[**Earlier post: You Know What? Just Don’t Split Words into Letters**](/adrianroselli.com/you-know-what-just-dont-split-words-into-letters.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Honoring Mobile OS Text Size",
  "desc": "If your users scale the text size in Android or iDeviceOS, that doesn’t always affect the size of text on a web page. It’s a function of browser and authored code, as opposed to a standardized approach. That may be changing. Support The current state of affairs in the three…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/honoring-mobile-os-text-size.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
