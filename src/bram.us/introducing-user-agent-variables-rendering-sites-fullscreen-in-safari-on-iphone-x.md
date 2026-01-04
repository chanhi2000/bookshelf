---
lang: en-US
title: "Rendering Sites Fullscreen in Safari on iPhone X / Introducing “User Agent Variables” (CSS Environment Variables)"
description: "Article(s) > Rendering Sites Fullscreen in Safari on iPhone X / Introducing “User Agent Variables” (CSS Environment Variables)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Rendering Sites Fullscreen in Safari on iPhone X / Introducing “User Agent Variables” (CSS Environment Variables)"
    - property: og:description
      content: "Rendering Sites Fullscreen in Safari on iPhone X / Introducing “User Agent Variables” (CSS Environment Variables)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/introducing-user-agent-variables-rendering-sites-fullscreen-in-safari-on-iphone-x.html
prev: /programming/css/articles/README.md
date: 2017-09-15
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: 
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

```component VPCard
{
  "title": "Rendering Sites Fullscreen in Safari on iPhone X / Introducing “User Agent Variables” (CSS Environment Variables)",
  "desc": "What the …? By default, the new iPhone X in landscape mode will contain sites in the so called “safe area”, resulting in white bars being rendered on either side of the site (src). The color, white by default, can be tweaked by altering the background-color on the <body> element. Do note that it’s only … Continue reading ”Rendering Sites Fullscreen in Safari on iPhone X / Introducing “User Agent Variables” (CSS Environment Variables)”",
  "link": "https://bram.us/bram.us/2017/09/14/introducing-user-agent-variables-rendering-sites-fullscreen-in-safari-on-iphone-x/",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

---

## What the …?

By default, the new iPhone X in landscape mode will contain sites in the so called [<VPIcon icon="fa-brands fa-safari"/>“safe area”](https://developer.apple.com/ios/human-interface-guidelines/images/OV_LayoutGuides_Landscape.svg), resulting in **white bars being rendered on either side of the site** *([src (<VPIcon icon="fa-brands fa-x-twitter"/>`thomasfuchs`)](https://twitter.com/thomasfuchs/status/907764896829452288))*.

![](https://bram.us/wordpress/wp-content/uploads/2017/09/iphonex-whitebars.png)

The color, white by default, can be tweaked by altering the `background-color` on the `<body>` element. Do note that it’s only `background-color` though: it doesn’t take gradients/background images into account, so you won’t jump very far with this …

---

## Cover it up!

By adding `viewport-fit=cover` to the viewport meta tag, it’s possible to make the site stretch out beyond the safe area so that it takes up the full width of the device *([src (<VPIcon icon="fa-brands fa-x-twitter"/>`steve228uk`)](https://twitter.com/steve228uk/status/908314139805790208))*

![](https://bram.us/wordpress/wp-content/uploads/2017/09/DJr64qeWsAAmVvc.jpg)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

---

## Embracing the notch

Whilst the use of `viewport-fit=cover` indeed stretches out the site, it also has a side effect of “the notch” overlapping with the site’s content.

To cater for this, [Apple has proposed the concept of “User Agent Variables” (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/1693), accessible via the `constant()` function in CSS.

This function has been renamed to [<VPIcon icon="fa-brands fa-firefox" />`env()`](https://developer.mozilla.org/en-US/docs/Web/CSS/env())

The current list of proposed User Agent Variables is:

- `user-font-size`: User’s requested font size
- `user-background-color`: User’s requested background color
- `user-foreground-color`: User’s requested foreground color
- `safe-area-inset-top`: Inset, as a `<length>` from the top of the viewport to the title-safe content area.
- `safe-area-inset-right`: Inset, as a `<length>` from the right of the viewport to the title-safe content area.
- `safe-area-inset-left`: Inset, as a `<length>` from the left of the viewport to the title-safe content area.
- `safe-area-inset-bottom`: Inset, as a `<length>` from the bottom of the viewport to the title-safe content area.

Using these `safe-area-inset-*` constants as the padding of a site, overlap of the notch can be prevented.

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

Additionally, these values can be used for elements that have `position: absolute;` / `position: fixed;` applied.

```css
#element {
  position: fixed;

  /* default position */
  top: 0;

  /* “safe” position (iOS 11) */
  top: env(safe-area-inset-top);
}
```

Phew.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Rendering Sites Fullscreen in Safari on iPhone X / Introducing “User Agent Variables” (CSS Environment Variables)",
  "desc": "What the …? By default, the new iPhone X in landscape mode will contain sites in the so called “safe area”, resulting in white bars being rendered on either side of the site (src). The color, white by default, can be tweaked by altering the background-color on the <body> element. Do note that it’s only … Continue reading ”Rendering Sites Fullscreen in Safari on iPhone X / Introducing “User Agent Variables” (CSS Environment Variables)”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/introducing-user-agent-variables-rendering-sites-fullscreen-in-safari-on-iphone-x.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
