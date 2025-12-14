---
lang: en-US
title: "The gotcha with @property animating custom properties"
description: "Article(s) > The gotcha with @property animating custom properties"
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
      content: "Article(s) > The gotcha with @property animating custom properties"
    - property: og:description
      content: "The gotcha with @property animating custom properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-gotcha-with-animating-custom-properties.html
prev: /programming/css/articles/README.md
date: 2023-02-01
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2023/01/with-custom-property-chrome.png
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
  name="The gotcha with @property animating custom properties"
  desc="Custom properties – even when registered through @property – don’t animate on the compositor."
  url="https://bram.us/2023/02/01/the-gotcha-with-animating-custom-properties/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2023/01/with-custom-property-chrome.png"/>

With `@property` support being [<VPIcon icon="iconfont icon-webdev"/>available in Chrome for a long time](https://web.dev/at-property/) and [<VPIcon icon="fa-brands fa-safari"/>now in Safari Technology preview](https://webkit.org/blog/13686/release-notes-for-safari-technology-preview-161/) too, it’s becoming really easy to use animated custom properties as the driver for a bunch of other things on your page. However, there’s one big gotcha with this: custom properties don’t animate on the compositor.

---

## `@property` 101

`@property` is an at-rule that allows you to register your [<VPIcon icon="fas fa-globe"/>CSS Custom Properties](https://w3c.github.io/csswg-drafts/css-variables/). You give them a certain type *(syntax)*, an initial value, and can control whether they should inherit or not.

By registering a custom property to be of a certain type, the browser knows how to interpolate its values when used in transitions and animations.

```css
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes adjust-angle {
  to {
    --angle: 360deg;
  }
}

div {
  --angle: 0deg;
  animation: 10s adjust-angle linear infinite;
  rotate: var(--angle);
}
```

If you didn’t register `--angle`, the browser would not know its type and animate it discretely, meaning it would flip halfway the duration from `0deg` to `360deg` without any interpolation.

::: note

More details and examples can be found [<VPIcon icon="iconfont icon-webdev"/>on web.dev](https://web.dev/at-property) and in [**Exploring `@property` and its Animating Powers**](/bram.us/exploring-at-property-and-its-animating-powers.md)

:::

---

## One CSS Custom Property to rule them all

::: warning ⚠️

This demo relies on CSS features that are not supported by all browsers yet. Please use Chrome 111+ or Safari Technology Preview 162+. Firefox does not support `@property` at the time of writing.

:::

Lets build a demo which animates two aspects of a box at the same time:

- Rotate the box from `0deg` to `360deg`
- Move the box down and up the y-axis over a distance of `100%` on each side

Thanks to `@property`, combined with [**Individual Transform Properties**](/bram.us/firefox-72-individual-transform-properties.md) and [**Trigonometric Functions**](/bram.us/css-trigonometric-functions-land-in-chrome-111.md), this becomes easy to do. Instead of animating the `rotate` and `translate` properties separately, you can animate a `--angle` custom property from `0deg` to `360deg`, and use its value in the `rotate` and `translate` properties.

```css
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes animate {
  to {
    --angle: 360deg;
  }
}

.box {
  animation: animate 5s linear infinite;
  transform-origin: 50% 50%;
  rotate: var(--angle);
  translate: 0 calc(sin(var(--angle)) * 100%);
}
```

As `--angle` constantly gets updated, so will the `rotate` and `translate` properties that depend on it.

<CodePen
  user="bramus"
  slug-hash="wvxqOOv"
  title="Animation in CSS, powered by a Custom Property"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

For comparison, here is an alternative version that does not use a custom property

```css
@keyframes animate {
  from {
    rotate: 0deg;
    translate: 0 0;
  }
  25% {
    translate: 0 100%;
  }
  50% {
    translate: 0 0;
  }
  75% {
    translate: 0 100%;
  }
  to {
    rotate: 360deg;
    translate: 0 0;
  }
}

.box {
  animation: animate 5s linear infinite;
  transform-origin: 50% 50%;
}
```

Visually, this code has the same outcome:

<CodePen
  user="bramus"
  slug-hash="abjyMMq"
  title="Animation in CSS, not using a Custom Property"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Personally I find the first approach – the one using the `--angle` custom property – easier to grasp, build, and maintain.

This *“One CSS Custom Property to rule them all”*-approach is a common technique: by simply flipping a few switches you can have your layout respond to it. Take this demo by [<VPIcon icon="fas fa-globe"/>my colleague Jhey](https://jhey.netlify.app/) for example: only the `--hue` value changes, and all stripes of the rainbow respond to that change. Easy.

<CodePen
  user="jh3y"
  slug-hash="JjbWpEZ"
  title="Animation in CSS, not using a Custom Property"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## The gotcha

Even though both box-demos both have the same visual outcome, the version that relies on `--angle` has a problem, as surfaced through a performance inspection:

![Performance recording using Chrome DevTools](https://bram.us/wordpress/wp-content/uploads/2023/01/with-custom-property-chrome.png)

![Timeline recording using Safari Web Inspector](https://bram.us/wordpress/wp-content/uploads/2023/01/with-custom-property-safari.png)

While `rotate` and `translate` are typically properties that are animated on the compositor thread with the help of the GPU, this is not the case here: layout is constantly being trashed and it gets rasterized on every frame. Huh!?

Zooming in on the timeline, we see style constantly being invalidated, a successive style recalculation being triggered, and eventually a repaint being done.

![Zoomed in timeline](https://bram.us/wordpress/wp-content/uploads/2023/01/with-custom-property-chrome-zoomed.png)

Compare this to a trace of the demo that does not use the custom property to drive the animation.

![Performance recording using Chrome DevTools (version without Custom Property)](https://bram.us/wordpress/wp-content/uploads/2023/01/without-custom-property.png)


As the timeline shows, this version is silky smooth and does not need to constantly recalculate styles – it runs on the compositor, as one would have expected.

---

## But why?

So we dialed down the cause to the `--angle` custom property that’s being used to control the other properties. Digging into [<VPIcon icon="fas fa-globe"/>the specification](https://drafts.css-houdini.org/css-properties-values-api/#substitution), it becomes clear what goes on:

> \[T\]he value of a registered custom property can be substituted into another value with the `var()` function. However, **registered custom properties substitute as their computed value**, rather than the original token sequence used to produce that value.

So as the animation runs, the value of the `--angle` custom property need to be updated as well. Because it gets passed as a [<VPIcon icon="fas fa-globe"/>computed value](https://drafts.csswg.org/css-cascade-5/#computed), style gets invalidated and a new value is computed. Once that’s done, the properties that rely on it require a repaint. Rinse and repeat.

::: note

Note that it is not the use of `@property` but that it’s the use of custom properties in animations by itself that’s causing this. Style invalidation also constantly happens for keyframes with custom properties that are not registered using `@property`, as they also need to be computed at every tick. However, you wouldn’t typically use non-registered custom properties for your animations as these animate *discretely*, meaning they flip halfway the duration from one value to the other without any interpolation.

What also is interesting here, is what happens when you disable the `rotate` and `translate` properties using DevTools. When doing so, repaint correctly stops from triggering but style invalidation still happens by simply having the animation run, even though `--angle` is not used anywhere.

<VidStack src="youtube/b-vIqvIkAwM" />

:::

---

## Can this be fixed?

If the compositor were able to do var-substitutions, I think this could be fixed. In the box example, the compositor would need to figure out a way to prevent the `--angle` custom property from causing a style invalidation while being animated, thereby preventing everything that follows.

Asking Chromium engineer Rune Lillesveen *(futhark)*, he mentioned that it would require a somewhat deep understanding of such `var()` substitutions on the compositor – It doesn’t seem to be impossible, but definitely would require a substantial amount of work.

At the time of writing, this optimisation might seem unnecessary, but I guess that’s because `@property` usage today is low. My prediction is that this need will become more urgent, once Safari and Firefox ship `@property` as well, and people start actively relying on this.

There’s no real solution right now other than rewriting your animations to not rely on the registered custom property, which is a pity as its one of their biggest use cases. If you want to see this change, go star [<VPIcon icon="fa-brands fa-chrome"/>Chromium issue #1411864](https://bugs.chromium.org/p/chromium/issues/detail?id=1411864) to signal interest.

::: note tl;dr

Custom properties don’t animate on the compositor.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The gotcha with @property animating custom properties",
  "desc": "Custom properties – even when registered through @property – don’t animate on the compositor.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-gotcha-with-animating-custom-properties.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
