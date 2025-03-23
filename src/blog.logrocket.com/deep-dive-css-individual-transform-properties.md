---
lang: en-US
title: "A deep dive into CSS individual transform properties"
description: "Article(s) > A deep dive into CSS individual transform properties"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A deep dive into CSS individual transform properties"
    - property: og:description
      content: "A deep dive into CSS individual transform properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/deep-dive-css-individual-transform-properties.html
prev: /programming/css/articles/README.md
date: 2022-09-09
isOriginal: false
author:
  - name: Daniel Yuschick
    url : https://blog.logrocket.com/author/danielyuschick/
cover: /assets/image/blog.logrocket.com/deep-dive-css-individual-transform-properties/banner.png
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
  name="A deep dive into CSS individual transform properties"
  desc="In this post, we'll review and compare CSS' current transform property with the new individual transform properties."
  url="https://blog.logrocket.com/deep-dive-css-individual-transform-properties"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/deep-dive-css-individual-transform-properties/banner.png"/>

There’s a chance you’ve never known CSS without its ability to transform properties. That functionality is at the core of CSS and a cornerstone of user interfaces (UI) as we know them today. However, in recent years, CSS hasn’t shied away from overhauling some of its most foundational pieces. After revolutionizing layouts with [<FontIcon icon="fas fa-globe"/>flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and [<FontIcon icon="fas fa-globe"/>grid](https://css-tricks.com/snippets/css/complete-guide-grid/) and restructuring its box model with [<FontIcon icon="fas fa-globe"/>logical properties](https://danyuschick.com/articles/css-logical-properties-are-the-future-of-the-web-and-i18n/), it was time to introduce its next evolution…

![A Deep Dive Into CSS Individual Transform Properties](/assets/image/blog.logrocket.com/deep-dive-css-individual-transform-properties/banner.png)

Transforms.

For as soft and welcoming as many subtle UI interactions may appear, creating and editing them can be anything but. This is because CSS has a single `transform` property to manage all of its different values, like `rotate`, `scale`, and `translate`.

When transforming a single value, a single property works well. However, when working with multiple values, it becomes a burdensome, cognitive load — a cognitive load CSS looks to resolve by introducing individual transform properties.

First, let’s review the current `transform` property, then discover how its functionality is improved by using the new individual transform properties. Let’s get started.

---

## Challenges of the `transform` property

In order to understand the benefits of individual transform properties, let’s first look at the two key challenges they’re trying to address. Neither of them is immediately obvious when starting out.

### Use it or lose it

The following `transform` property isn’t too complicated. It will scale, translate, then rotate the element.

```css
.item {
  transform: scale(1.5) translate(0, 50%) rotate(90deg);
}
```

But what happens to the `transform` if we want to change the scale amount on `hover`?

Every `transform` function must be defined in every state or its value will be lost. In order to scale down the item on `hover` without losing its `translate` and `rotate` values, they both must be duplicated along with the updated scale value.

```css
.item:hover {
  transform: scale(0.5) translate(0, 50%) rotate(90deg);
}
```

For a single `hover` state, this may not be too much of a burden. But this becomes more complicated as transforms grow or when creating animations with multiple frames.

However, needing to duplicate every `transform` function presents another challenge.

### Order of operations

When creating transforms with more than one function, it’s important to note that the browser will apply the values in order from left to right. This means the following transforms will, visually, have different results, despite having the same value.

```css
.item:first-child {
  transform: scale(1.75) translate(0, 50%);
}

.item:last-child {
  transform: translate(0, 50%) scale(1.75);
}
```

After the first item scales, it will be translated relative to its new size. Meanwhile, the second item will scale after translating, resulting in an element not positioned exactly like the first.

<CodePen
  user="DanielYuschick"
  slug-hash="YzaBMer"
  title="CSS Transforms & The Importance of Ordering"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

As transformations grow more complex and more `transform` functions are used, the more difficult it becomes to manage the entire property. Take an animation with multiple frames as an example:

<CodePen
  user="DanielYuschick"
  slug-hash="BarMOMM"
  title="CSS Transform Animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

When creating an animation with multiple `transform` values, the cognitive load to manage each property in its correct order across each frame can become quite a burden.

```css
@keyframes animate {
  10%, 15% {
    transform: translateX(0);
  }
  16% {
    transform: translateX(0) scale(0.5);
  }
  18% {
    transform: translateX(0) scale(1.5);
  }
  20% {
    transform: translateX(0) scale(1);
  }
  50% {
    transform: translateX(50%) scale(1) rotate(180deg);
  }
  65% {
    transform: translateX(-50%) scale(1) rotate(180deg);
  }
}
```

It’s these challenges and cognitive loads that look to be removed by the introduction of CSS individual transform properties.

---

## What are CSS individual transform properties?

CSS has introduced three new individual transform properties: `rotate`, `scale`, and `translate`.

```css
.item {
  rotate: 180deg;
  scale: 1.5;
  translate: 50% 0;
}
```

These new properties work like the legacy `transform` functions but without the legacy challenges.

Because these new individual properties are independent of one another, there is no need to duplicate values across states. And without the need to duplicate values across states, the order becomes much easier to manage, except individual transform properties are not dependent on their order, either.

Where the legacy `transform` functions are applied in order from left to right, the individual transform properties are applied in a much more favorable sequence: 1. translate 2. rotate 3. scale.

With the key challenges of working with the `transform` property out of the way, the previous animation can be refactored into a more manageable and legible `@keyframes` block seen below:

<CodePen
  user="DanielYuschick"
  slug-hash="XWEOxRa"
  title="CSS Individual Transform Properties Animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css :collapsed-lines
@keyframes animate {
  10%, 15% {
    scale: 1;
    translate: 0;
  }
  16% {
    scale: 0.5;
  }
  18% {
    scale: 1.5;
  }
  20% {
    rotate: 0deg;
    scale: 1;
  }
  50% {
    rotate: 180deg;
    translate: 50% 0;
  }
  65% {
    rotate: 180deg;
    translate: -50% 0;
  }
}
```

---

## Individual transform property considerations

Individual transform properties require a few other considerations when using them that may be different than their legacy equivalents. We’ll go over them in a little more depth below.

### Some properties left behind

While CSS has introduced the three individual properties `rotate`, `scale`, and `translate`, the remaining `transform` functions have not been given the same priority. Because of this, the individual and `transform` properties can work together.

You can visit MDN for a [<FontIcon icon="fa-brands fa-firefox"/>full list of `transform` functions](https://developer.mozilla.org/en-US/docs/Web/CSS/transform).

### `transform-origin`

When transforming an element, it’s common to also use the `transform-origin` property. While most browsers default to transforming an element, such as rotating an image from its center point, the `transform-origin` property allows explicit control over the point from which an element is transformed.

Because the two properties had similar names, `transform` and `transform-origin`, the mental model was pretty clear that these two properties were related — a mental model that has been disconnected from the individual transform properties.

However, despite the property names no longer being aligned, the `rotate`, `scale`, and `translate` properties all function as transforms that still adhere to any `transform-origin` values as expected. This means existing transforms which utilize explicit `transform-origin` points can be refactored to use individual transform properties without any conflicts.

```css
.item {
  scale: 1.5;
  transform-origin: top right;
}
```

### Setting values to `0`

When setting nearly any value in CSS to `0`, it’s generally acceptable to not supply any unit to the value. When the value is `0`, it doesn’t really matter if it’s `0px` or `0rem`. The same applies to the `transform` property and rotate function.

```css
.item {
  transform: rotate(90deg);
}

.item:hover {
  transform: rotate(0);
}
```

However, when using the individual `rotate` property, a unit or CSS keyword must be defined.

```css
.item {
  rotate: 90deg;
}

.item:hover {
  /* ❌ Will not rotate without a unit */
  rotate: 0;

  /* ✅ Will rotate with a unit specified */
  rotate: 0deg;
}
```

### The `will-change` property

Much like `transform-origin`, the individual transform properties also work together with the `will-change` property. Although, the [<FontIcon icon="fa-brands fa-opera"/>same considerations when using](https://dev.opera.com/articles/css-will-change-property/) `will-change` should still be followed, such as only applying the property if the animation or transform is already suffering from performance issues.

If the `transform` property isn’t causing any performance issues, the switch to individual transform properties will not change that.

### Overall performance

The use of individual transform properties is just as efficient as the original `transform` property.

---

## Support and fallbacks

The benefits of CSS individual transform properties are worthless if they can’t be used. Luckily, modern support for these properties is already quite good, with support in at least the latest version of all major browsers, being introduced to Chrome and Edge in v104, Safari 14.1, and Firefox 103. 

![Screenshot Of CSS Individual Transform Properties Support On Caniuse](/assets/image/blog.logrocket.com/deep-dive-css-individual-transform-properties/css-individual-transform-properties-support.png)

Building products for only the latest versions of major browsers, though, is often a fantasy rather than the reality of web development. But since the individual transform properties can be directly mapped to the legacy `transform` values, a reliable fallback can be used for progressive enhancement.

```css
.container {
  rotate: 80deg;
  scale: 1.5;
  translate: 50% 10%;

  @supports not (scale: 1) {
    // Use transform fallback if CSS individual transform properties are not supported
    transform: translate(50%, 10%) rotate(80deg) scale(1.5);
  }
}
```

By using the `@supports` query with the `not` keyword, we’re able to prioritize the newer properties, only rendering the fallback in environments where it’s required. But be wary, because the `transform` property is dependent on the order of its values, fallbacks must be written with this in mind.

To make the process of writing fallbacks easier, an [SCSS Mixin for individual transform properties (<FontIcon icon="fa-brands fa-codepen"/>`DanielYuschick`)](https://codepen.io/DanielYuschick/pen/NWYozPK) can be used to automate the fallback `transform` property and the order of its values.

<CodePen
  user="DanielYuschick"
  slug-hash="NWYozPK"
  title="CSS Individual Transform Properties SCSS Mixin"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Conclusion

Transformations have long been a fundamental feature of CSS. Their interactions have defined the web as we know it today. With the introduction of individual transform properties, `rotate`, `scale`, and `translate`, the boundaries of animations and transforms may be pushed further.

Where else may these properties be beneficial? Would you also like to see other `transform` functions, like `skew` and axis-specific functions, be moved to their own properties?

If nothing else, CSS individual transform properties have two key benefits:

1. The introduction to transforms and animations may now be better for beginners
2. The ability to clean up existing transforms and animations

And for these two reasons alone, individual transform properties are a welcomed shift to the CSS foundation.

::: info Resources

<SiteInfo
  name="rotate - CSS: Cascading Style Sheets | MDN"
  desc="The rotate CSS property allows you to specify rotation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform property."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/rotate/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="scale - CSS: Cascading Style Sheets | MDN"
  desc="The scale CSS property allows you to specify scale transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/scale/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="translate - CSS: Cascading Style Sheets | MDN"
  desc="The translate CSS property allows you to specify translation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/translate/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```component VPCard
{
  "title": "'rotate' | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "'rotate'",
  "link": "https://caniuse.com/?search=rotate",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

```component VPCard
{
  "title": "'scale' | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "'scale'",
  "link": "https://caniuse.com/?search=scale",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

```component VPCard
{
  "title": "'translate' | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "'translate'",
  "link": "https://caniuse.com/?search=translate",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

<SiteInfo
  name="Finer grained control over CSS transforms with individual transform properties  |  Articles  |  web.dev"
  desc="Learn how you can use the individual translate, rotate, and scale CSS properties to approach transforms in an intuitive way."
  url="https://web.dev/articles/css-individual-transform-properties/"
  logo="https://gstatic.com/devrel-devsite/prod/v17c4f87be230ffee20589ee6dca0a2318ead9eddb228ec5c58233202ff69a933/web/images/favicon.png"
  preview="https://web.dev/static/articles/css-individual-transform-properties/image/thumbnail.svg"/>

```component VPCard
{
  "title": "CSS Individual Transform Properties",
  "desc": "CSS Transforms appeared on the Web along with CSS Animations and CSS Transitions to add visual effects and motion on the Web.",
  "link": "https://webkit.org/blog/11420/css-individual-transform-properties/",
  "logo": "https://webkit.org/favicon.ico",
  "background": "rgba(0,37,61,0.2)"
}
```

<SiteInfo
  name="Order in CSS transformations – transform functions vs individual transforms"
  desc="Individual transformation in CSS have a pre-defined order which leads to different visual effects when moving translate transformation functions to transformation properties."
  url="https://stefanjudis.com/blog/order-in-css-transformation-transform-functions-vs-individual-transforms"
  logo="https://stefanjudis.com/favicon.svg"
  preview="https://res.cloudinary.com/dfcwuxv3l/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_900,c_fit,co_rgb:232129,g_south_west,x_70,y_160,l_text:oswald_84_bold_line_spacing_-34:Order%20in%20CSS%20transformations%20%E2%80%93%20transform%20functions%20vs%20individual%20transforms/w_900,c_fit,co_rgb:232129,g_north_west,x_70,y_540,l_text:ubuntu_38:%40stefanjudis/stefan-judis-website/social-image-with-new-dude"/>

- [Individual transform properties SCSS Mixin (<FontIcon icon="fa-brands fa-codepen"/>`DanielYuschick`)](https://codepen.io/DanielYuschick/pen/NWYozPK)
- [Individual transform properties Demos (<FontIcon icon="fa-brands fa-codepen"/>`daynix`)](https://codepen.io/collection/PYKbBa)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A deep dive into CSS individual transform properties",
  "desc": "In this post, we'll review and compare CSS' current transform property with the new individual transform properties.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/deep-dive-css-individual-transform-properties.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
