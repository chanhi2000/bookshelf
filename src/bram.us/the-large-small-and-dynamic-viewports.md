---
lang: en-US
title: "The Large, Small, and Dynamic Viewports"
description: "Article(s) > The Large, Small, and Dynamic Viewports"
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
      content: "Article(s) > The Large, Small, and Dynamic Viewports"
    - property: og:description
      content: "The Large, Small, and Dynamic Viewports"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-large-small-and-dynamic-viewports.html
prev: /programming/css/articles/README.md
date: 2021-07-08
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/07/viewports.png
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
  name="The Large, Small, and Dynamic Viewports"
  desc="There are some changes being proposed regarding viewport units, finally solving that ”100vh in Safari on iOS” issue …"
  url="https://bram.us/2021/07/08/the-large-small-and-dynamic-viewports/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/07/viewports.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2021/07/viewports-teaser.png)

There are some changes being made regarding viewport units. The additions — which are part of the [<VPIcon icon="iconfont icon-w3c"/>CSS Values and Units Level 4](https://w3.org/TR/css-values-4/) specification — define several viewport sizes: the Large, Small, and Dynamic Viewport.

Thanks to these additions we will finally be able to solve [**that “100vh in Safari on iOS” issue**](/bram.us/100vh-in-safari-on-ios.md).

::: note Update 2021.07.14

Some parts of this post have been rewritten to include [the latest CSSWG changes (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/4329#issuecomment-880040513) regarding these units.

:::

::: note Update 2021.07.23 🎉

The proposed changes have [<VPIcon icon="iconfont icon-w3c"/>landed](https://w3.org/blog/CSS/2021/07/15/css-values-4-viewport-units/) in the official spec by now. This post has been updated accordingly.

:::

---

## The Large, Small, and Dynamic Viewports

The CSSWG has defined several extra Viewport Sizes and accompanying Viewport-relative Units ([<VPIcon icon="iconfont icon-w3c"/>spec](https://w3.org/TR/css-values-4/#viewport-relative-lengths)), in addition to the already existing `vw`/`vh`/`vmin`/`vmax` ones.

### The Large Viewport

The Large Viewport is the viewport sized assuming any UA interfaces (such as the address bar) that are dynamically expanded and retracted to be *retracted*. It has the `l`-prefix, so units are `lvh` / `lvw` / `lvmin` / `lvmax`.

![](https://bram.us/wordpress/wp-content/uploads/2021/07/viewports-large.png)

::: tip

`100lvh` stands for 100% of the large viewport height.

:::

### The Small Viewport

The Small Viewport is the viewport sized assuming any UA interfaces that are dynamically expanded and retracted to be *expanded*. It has the `s`-prefix, so units are `svh` / `svw` / `svmin` / `svmax`.

![](https://bram.us/wordpress/wp-content/uploads/2021/07/viewports-small.png)

::: tip

`100svh` stands for 100% of the small viewport height.

:::

### The Dynamic Viewport

The Dynamic Viewport is the viewport sized with *dynamic consideration of any UA interfaces*. **It will automatically adjust itself in response to UA interface elements being shown or not: the value will be anything within the limits of `100lvh` (maximum) and `100svh` (minimum).**

Its prefix is `d`, so the units are `dvh` / `dvw` / `dvmin` / `dvmax`.

::: note 👉

You’ll want these Dynamic Viewport Units to have a UI that auto-stretches as the UA interface changes. `100dvh` will automatically adapt itself.

```css
body {
  height: 100dvh; /* ✅ Do this! */
}
```

:::

---

## But, why? Can’t we just use a workaround?

You might ask yourself why we can’t simply rely on [this JS workaround (<VPIcon icon="iconfont icon-github"/>`getify`)](https://gist.github.com/getify/150ea5a3b30b8822dee7798883d120b9) or the CSS workaround shown below, instead of introducing all these new units.

```css
body {
  height: 100vh;
}

@supports (-webkit-touch-callout: none) {
  body {
    height: -webkit-fill-available; /* ❌ Don't do this! */
  }
}
```

Whilst the workaround above does achieve what we want, it only results in *“full viewport height”* for `body`. This is because `-webkit-fill-available` stretches items out inside their enclosing element — here the viewport. For some deeply nested elements that wouldn’t work, as `-webkit-fill-available` applied on them will look at their parent element — not the viewport. With `100dvh` we can easily achieve what we want.

Above that you can’t use `-webkit-fill-available` to size something *“half the size of the enclosing element”*, as you can’t use `-webkit-fill-available` within `calc()`, e.g. `height: calc(-webkit-fill-available * 0.5)` is invalid CSS. Even if this were to be allowed one day, we’d again run into the issues when wanting to size a deeply nested element relatively to the viewport *(see paragraph above)*.

**So yes, we definitely do need these new Viewport Units 🤩**

---

## The catch

As mentioned before these new proposed `l*`/`s*`/`d*` units are additions to the already existing `vw`/`vh`/`vmin`/`vmax` units. With this, the CSSWG chose to keep these “old” units ambiguous: `vw`/`vh`/`vmin`/`vmax` have no explicit definition, and it’s totally up to the UA (browser) to define how they behave. Some browsers will have `vh` behave like `lvh` *(like the current Safari does)*, while other browsers can make `vh` behave like `dvh`.

What also is up to the UA to choose, is the behavior of the Dynamic Viewport. Some browsers may update its value immediately while the interface is changing, whereas other browsers may only update the value after the UI has transitioned … the spec is fine with both.

> The UA is not required to animate the dynamic viewport-percentage units while expanding and retracting any relevant interfaces, and may instead calculate the units as if the relevant interface was fully expanded or retracted during the UI animation.

Above that things like on-screen keyboards are not taken into account. For that we have [the upcoming Virtual Keyboard API (<VPIcon icon="iconfont icon-github"/>`MicrosoftEdge/MSEdgeExplainers`)](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/VirtualKeyboardAPI/explainer.md).

---

## Going Logical

Additionally the spec now also defines [**logical units**](/bram.us/css-logical-properties-and-values-the-next-step-of-css-evolution.md), and thus talks about `vi`/`dvi`/`svi` and `vb`/`dvb`/`svb` which are the inline and block size respectively of the large/dynamic/small viewport. A small but very welcome addition.

---

## Browser Support

::: note

Although this post was originally published in July 2021, the section below is constantly being updated. *Last update: Nov 10, 2022*.

:::

Here is an up-to-date list of browser support for the `lv*`, `sv*`, and `dv*` Viewport Units:

### Chromium *(Blink)*

✅ Available in Chrome 108 and up.

### Firefox *(Gecko)*

✅ Available in Firefox 101 and up.

### Safari *(WebKit)*

✅ Available in Safari 15.4 and up.

To stay up-to-date regarding browser support, you can follow these tracking issues:

- Blink/Chromium: [<VPIcon icon="fa-brands fa-chrome"/>Issue #1093055](https://bugs.chromium.org/p/chromium/issues/detail?id=1093055) – Fixed (Closed)
- Gecko/Firefox: [<VPIcon icon="fa-brands fa-firefox"/>Issue #1610815](https://bugzilla.mozilla.org/show_bug.cgi?id=1610815) – RESOLVED FIXED
- WebKit/Safari: [<VPIcon icon="fa-brands fa-safari"/>Issue #219287](https://bugs.webkit.org/show_bug.cgi?id=219287) – RESOLVED FIXED

The pen below will indicate whether your browser supports CSS Dynamic Viewport Units or not:

<CodePen
  user="bramus"
  slug-hash="ZEJvMgX"
  title="CodePen Embed"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## In Closing

It feels great to see things finally move in this area I must say, as the [<VPIcon icon="fa-brands fa-safari"/>reported WebKit bug about 100vh not being 100vh-as-we-expect-it-to-be](https://bugs.webkit.org/show_bug.cgi?id=141832) dates back from 2015, and the [relevant CSSWG Issue (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/4329) from 2019. As a final consensus on these viewport additions has been reached, I hope that [**the upcoming Safari 15**](/bram.us/wwdc-meet-safari-15.md) — which alters the viewport extensively as you scroll up/down — will make work to include these additions on top of [**their already supported `env(safe-area-inset-*)` values**](/bram.us/introducing-user-agent-variables-rendering-sites-fullscreen-in-safari-on-iphone-x.md) (e.g. `height: calc(100vh - env(safe-area-inset-bottom));`).

![](https://bram.us/wordpress/wp-content/uploads/2021/07/viewports.png)

To help spread the contents of this post, feel free to retweet the announcement tweet:

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Large, Small, and Dynamic Viewports",
  "desc": "There are some changes being proposed regarding viewport units, finally solving that ”100vh in Safari on iOS” issue …",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-large-small-and-dynamic-viewports.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
