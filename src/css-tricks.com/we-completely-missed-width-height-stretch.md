---
lang: en-US
title: "We Completely Missed width/height: stretch"
description: "Article(s) > We Completely Missed width/height: stretch"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > We Completely Missed width/height: stretch"
    - property: og:description
      content: "We Completely Missed width/height: stretch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/we-completely-missed-width-height-stretch.html
prev: /programming/css/articles/README.md
date: 2025-10-10
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/11/percentage-padding-width.png
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
  name="We Completely Missed width/height: stretch"
  desc="The TL;DR is that stretch does the same thing as declaring 100%, but ignores padding when looking at the available space."
  url="https://css-tricks.com/we-completely-missed-width-height-stretch"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/11/percentage-padding-width.png"/>

The `stretch` keyword, which you can use with `width` and `height` (as well as `min-width`, `max-width`, `min-height`, and `max-height`, of course), was shipped in Chromium web browsers back in June 2025. But the value is actually a unification of the non-standard `-webkit-fill-available` and `-moz-available` values, the latter of which has been available to use in Firefox since 2008. The issue was that, before the `@supports` at-rule, there was no nice way to implement the right value for the right web browser, and I suppose we just forgot about it after that until, whoops, one day I see [<VPIcon icon="fas fa-globe"/>Dave Rupert casually put it out there on Bluesky](https://bsky.app/profile/davatron5000.bsky.social/post/3lvomxgrds22s) a month ago:

![Dave Rupert post on Bluesky: Did you know you can do height: stretch now in CSS? Works for width too. via Patrick Brosset.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_AC0E97E63C42D4DCB598202C211DCD808E080150784BF489C692DBD48FB52DA8_1759247326546_Screenshot2025-09-30at9.48.26AM.png?resize=1182%2C1082&ssl=1)

Layout pro [<VPIcon icon="fa-brands fa-youtube"/>Miriam Suzanne recorded an explainer](https://youtu.be/iZZXOuLxagE) shortly thereafter. It’s worth giving this value a closer look.

<VidStack src="youtube/iZZXOuLxagE" />

---

## What does `stretch` do?

The quick answer is that `stretch` does the same thing as declaring `100%`, but ignores `padding` when looking at the available space. In short, if you’ve ever wanted `100%` to *actually mean `100%`* (when using `padding`), `stretch` is what you’re looking for:

```css
div {
  padding: 3rem 50vw 3rem 1rem;
  width: 100%; /* 100% + 50vw + 1rem, causing overflow */
  width: stretch; /* 100% including padding, no overflow */
}
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="VYewxej"
  title="width: stretch demo"
  :default-tab="['css','result']"
  :theme="dark"/>

The more *technical* answer is that the `stretch` value sets the width or height of the element’s margin box (rather than the box determined by `box-sizing`) to match the width/height of its *containing* block.

::: note

It’s never a bad idea to revisit the [**CSS Box Model**](/css-tricks.com/the-css-box-model.md) for a refresher on different box sizings.

:::

And on that note — yes — we can achieve the same result by declaring `box-sizing: border-box`, [**something that many of us do**](/css-tricks.com/international-box-sizing-awareness-day.md), as a CSS reset in fact.

```css
*,
::before,
::after {
  box-sizing: border-box;
}
```

I suppose that it’s because of this solution that we forgot all about the non-standard values and didn’t pay any attention to `stretch` when it shipped, but I actually rather like `stretch` and don’t touch `box-sizing` at all now.

---

## Yay `stretch`, nay `box-sizing`

There isn’t an especially compelling reason to switch to `stretch`, but there are several small ones. Firstly, the Universal selector (`*`) doesn’t apply to pseudo-elements, which is why the CSS reset typically includes `::before` and `::after`, and not only are there way more pseudo-elements than we might think, but the rise in declarative HTML components means that we’ll be seeing more of them. Do you really want to maintain something like the following?

```css :collapsed-lines
*, 
::after,
::backdrop,
::before,
::column,
::checkmark,
::cue (and ::cue()),
::details-content,
::file-selector-button,
::first-letter,
::first-line,
::grammar-error,
::highlight(),
::marker,
::part(),
::picker(),
::picker-icon,
::placeholder,
::scroll-button(),
::scroll-marker,
::scroll-marker-group,
::selection,
::slotted(),
::spelling-error,
::target-text,
::view-transition,
::view-transition-image-pair(),
::view-transition-group(),
::view-transition-new(),
::view-transition-old() {
  box-sizing: border-box;
}
```

Okay, I’m being dramatic. Or maybe I’m not? I don’t know. I’ve actually used quite a few of these and having to maintain a list like this sounds dreadful, although I’ve certainly seen crazier CSS resets. Besides, you might *want* `100%` to exclude padding, and if you’re a fussy coder like me you won’t enjoy un-resetting CSS resets.

---

## Animating to and from `stretch`

Opinions aside, there’s one thing that `box-sizing` certainly isn’t and that’s *animatable*. If you didn’t catch it the first time, we do transition to and from `100%` and `stretch`:

<CodePen
  user="mrdanielschwarz"
  slug-hash="VYewxej"
  title="width: stretch demo"
  :default-tab="['css','result']"
  :theme="dark"/>

Because `stretch` is a keyword though, you’ll need to [<VPIcon icon="iconfont icon-css-tricks"/>interpolate its size](https://css-tricks.com/almanac/properties/i/interpolate-size/), and you can only do that by declaring `interpolate-size: allow-keywords` (on the `:root` if you want to activate interpolation globally):

```css
:root {
  /* Activate interpolation */
  interpolate-size: allow-keywords;
}

div {
  width: 100%;
  transition: 300ms;

  &:hover {
    width: stretch;
  }
}
```

The [<VPIcon icon="iconfont icon-css-tricks"/>`calc-size()` function](https://css-tricks.com/almanac/functions/c/calc-size/) wouldn’t be useful here due to the web browser support of `stretch` and the fact that `calc-size()` doesn’t support its non-standard alternatives. In the future though, you’ll be able to use `width: calc-size(stretch, size)` in the example above to interpolate *just that specific* width.

---

## Web browser support

Web browser support is limited to Chromium browsers for now:

- Opera 122+
- Chrome and Edge 138+ (140+ on Android)

Luckily though, because we have those non-standard values, we can use the `@supports` at-rule to implement the right value for the right browser. The best way to do that (and strip away the `@supports` logic later) is to save the right value as a custom property:

```css
:root {
  /* Firefox */
  @supports (width: -moz-available) {
    --stretch: -moz-available;
  }

  /* Safari */
  @supports (width: -webkit-fill-available) {
    --stretch: -webkit-fill-available;
  }

  /* Chromium */
  @supports (width: stretch) {
    --stretch: stretch;
  }
}

div {
  width: var(--stretch);
}
```

Then later, once `stretch` is widely supported, switch to:

```css
div {
  width: stretch;
}
```

---

## In a nutshell

While this might not exactly win Feature of the Year awards (I haven’t heard a *whisper* about it), quality-of-life improvements like this are some of my favorite features. If you’d rather use `box-sizing: border-box`, that’s totally fine — it works really well. Either way, more ways to write and organize code is never a bad thing, especially if certain ways don’t align with your mental model.

Plus, using a brand new feature in production is just too tempting to resist. Irrational, but tempting and satisfying!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "We Completely Missed width/height: stretch",
  "desc": "The TL;DR is that stretch does the same thing as declaring 100%, but ignores padding when looking at the available space.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/we-completely-missed-width-height-stretch.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
