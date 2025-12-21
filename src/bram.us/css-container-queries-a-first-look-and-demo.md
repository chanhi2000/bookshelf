---
lang: en-US
title: "CSS Container Queries: A First Look + Demo"
description: "Article(s) > CSS Container Queries: A First Look + Demo"
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
      content: "Article(s) > CSS Container Queries: A First Look + Demo"
    - property: og:description
      content: "CSS Container Queries: A First Look + Demo"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-container-queries-a-first-look-and-demo.html
prev: /programming/css/articles/README.md
date: 2021-03-29
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/03/css-container-queries-polar-bear.gif
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
  name="CSS Container Queries: A First Look + Demo"
  desc="CSS Container Queries landed in Chrome Canary (behind a flag). Let's take it for a test drive …"
  url="https://bram.us/2021/03/28/css-container-queries-a-first-look-and-demo/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/03/css-container-queries-polar-bear.gif"/>

[**Back in November 2020**](/bram.us/container-queries-are-coming-to-chromium.md) it was announced that Chromium would experiment with Container Queries — back then just a proposal but earlier this year *(February 2021)* adopted to become part of the CSS Containment Module Level 3 Specification.

Just before the weekend a first version of this experimental implementation landed in Chromium Canary for us to play with *(behind a flag)*. Let’s take it for a test drive …

::: note Update

This post is constantly being updated while the spec is still in flux. All code examples shown are in sync with the spec. The embedded demos however might still contain some older syntax/code, as the experimental implementations in browsers lag a bit behind on the spec. See [list of updates below](#updates) if you want to know what’s changed.

:::

::: info 👨‍🔬

The CSS features described in this post are still experimental and are not supported by all browsers! If you’re feeling adventurous you can play with these new features today, but you’ll need at least Chromium 91.0.4459.0 with the `#enable-container-queries` flag enabled, or Safari Technology Preview 142+.

:::

---

## Container Queries?

Container Queries allow authors to style elements according to the size or appearance of a Query Container. This Query Container – or Container for short – is always a Parent Element.

For size based Container Queries, children can look at the Container’s dimensions, and act upon that. This type of Container Query works similarly to how a `@media` query would resolve, except that the condition will be checked against a Parent Element instead of the Viewport.

![](https://bram.us/wordpress/wp-content/uploads/2021/03/container-queries.png)

For style based Container Queries, you can look at the styles applied on a Container. That means you can style children conditionally, based on the Computed (!) Value of a CSS property from that Container.

::: note

This post only covers size-based Container Queries.

:::

---

## Quick Demo

Wanting to test Container Queries out I quickly threw a demo together using a classic card component. Here’s a recording that shows how this component behaves:

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/03/css-container-queries-polar-bear.mp4?_=1" />

By default our component shows an image on top and a description below that. If enough space becomes available, they will be shown next to each other. Should even more space become available, then the image will grow even more.

---

## The Code

The markup for all those cards is the same and is pretty straightforward. Only extra thing I’ve added is an extra wrapper div `.animalcard-wrapper` so that our container queries will play nice [when being used inside CSS Grid (<VPIcon icon="iconfont icon-github"/>`oddbird/css-sandbox`)](https://github.com/oddbird/css-sandbox/blob/main/src/rwd/query/explainer.md#component-in-a-responsive-grid-track)

```html
<div class="animalcard-wrapper">
  <div class="animalcard">
    <div class="animalcard__image">
      …
    </div>
    <div class="animalcard__description">
      …
    </div>
  </div>
</div>
```

The default layout of our card uses CSS Grid to position the image and the description:

```css
/* SMALL LAYOUT: Image stacked on top of Description */
.animalcard {
  display: grid;
  grid-template: "image" "description" / 1fr;
  gap: 1em;
  padding: 1em;
}
```

To be able to use Container Queries, we first need to create a Containment Context *(Container Root)* on the `.animalcard-wrapper`. We instruct the browser to keep track of the `inline-size`, which translates to the width, as we will be changing the layout of its children based on that dimension.

```css
/* Container Queries: Create Container Root */
.animalcard-wrapper {
  container-type: inline-size;
}
```

You can also name your container query if you want:

```css
/* Container Queries: Create Container Root (Named) */
.animalcard-wrapper {
  container-type: inline-size;
  container-name: animalwrapper;
}
```

Or, as a shorthand:

```css
/* Container Queries: Create Container Root (Shorthand) */
.animalcard-wrapper {
  container: animalwrapper / inline-size;
}
```

With this Container Root in place, we can now add extra styles to apply when the Container Root reaches a certain `width`.

```css
/* MEDIUM LAYOUT: Image next to Description (1fr each) */
@container (min-width: 30rem) {
  .animalcard {
    gap: 2em;
    padding: 2em;
    grid-template: "image description" / 1fr 1fr;
  }

  .animalcard__description {
    text-align: left;
  }
}

/* LARGE LAYOUT: Large Image next to Description */
@container (min-width: 70rem) {
  .animalcard {
    grid-template-columns: 2fr 1fr;
  }
}
```

By default it will be matched against the nearest parent that’s a container. If you want to explicitly target a different container, include its name when using `@container`:

```css
/* MEDIUM LAYOUT: Image next to Description (1fr each) */
@container animalwrapper (min-width: 30rem) {
  …
}
```

If no parent container exists, the [**Small Viewport**](/bram.us/the-large-small-and-dynamic-viewports.md#small-viewport) will be used.

---

## Final Demo

All together our demo finally becomes this:

<CodePen
  user="bramus"
  slug-hash="LYxNpeE"
  title="CSS Container Queries Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

To cater for browsers that don’t support Container Queries, [**a container queries polyfill**](/bram.us/a-first-look-at-container-query-polyfill-a-polyfill-for-css-container-queries.md) is included.

---

## Browser Support

::: note

Although this post was originally published in March 2021, the section below is constantly being updated. *Last update: February 23, 2023*.

:::

This table below shows an up-to-date list of browser support:

### Chromium *(Blink)*

✅ Available in Chromium 106 and up.

Experimental support first appeared in Chromium 91.0.4459.0 with the `#enable-container-queries` flag enabled

### Firefox *(Gecko)*

✅ Available in Firefox 110 and up.

### Safari *(WebKit)*

✅ Available in Safari 16.0 and up.

Experimental support first appeared in Safari Technology Preview 142. To stay up-to-date regarding browser support, you can follow these tracking issues:

- Blink/Chromium: [<VPIcon icon="fa-brands fa-chrome"/>Issue #1145970](https://bugs.chromium.org/p/chromium/issues/detail?id=1145970) – Fixed (Closed)
- Gecko/Firefox: [<VPIcon icon="fa-brands fa-firefox"/>Issue #1744221](https://bugzilla.mozilla.org/show_bug.cgi?id=1744221) – NEW
- WebKit/Safari: [<VPIcon icon="fa-brands fa-safari"/>Issue #229659](https://bugs.webkit.org/show_bug.cgi?id=229659) – RESOLVED/FIXED

:::: info ☝️

If you’re looking for more demos, [Miriam Suzanne (<VPIcon icon="fa-brands fa-x-twitter"/>)](https://twitter.com/MiriSuzanne/) is collecting a bunch in [<VPIcon icon="fa-brands fa-codepen"/>this CodePen Collection](https://codepen.io/collection/XQrgJo). Be sure to check out [Una (<VPIcon icon="fa-brands fa-x-twitter"/>`una`)](https://twitter.com/una)‘s [Episode Card (<VPIcon icon="fa-brands fa-codepen"/>`una`)](https://codepen.io/una/pen/LYbvKpK) for [<VPIcon icon="fas fa-globe"/>The CSS Podcast](https://thecsspodcast.libsyn.com/)

:::

---

## Updates

As the spec for this new CSS feature is still in flux, this post has received some updates over time in order to reflect the latest spec changes.

- **Update 2022.03.31:** The order for the arguments for the `container` shorthand [got switched around](https://github.com/w3c/csswg-drafts/issues/7180#issuecomment-1083422839).
- **Update 2022.03.23:** Safari Technology Preview ships with unflagged *(size-based)* Container Queries support! 🎉
- **Update 2022.01.26:** The function syntax for querying sizes — using `size()` — [got dropped (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6870#issuecomment-1022430911).
- **Update 2021.11.26:** To make the embedded demo work in browsers that don’t yet support Container Queries, it got extended with a Polyfill named `container-queries-polyfill`. [**Check out this post for more details on how to use it.**](/bram.us/a-first-look-at-container-query-polyfill-a-polyfill-for-css-container-queries.md)
- **Update 2021.06.11:** To create a container you no longer need to set the `contain` property, but [instead use the `container` property (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6376).
- **Update 2021.05.02:** Creating a Containment Context / Container Root also requires [<VPIcon icon="fa-brands fa-firefox"/>`style` containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment#style_containment).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Container Queries: A First Look + Demo",
  "desc": "CSS Container Queries landed in Chrome Canary (behind a flag). Let's take it for a test drive …",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-container-queries-a-first-look-and-demo.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
