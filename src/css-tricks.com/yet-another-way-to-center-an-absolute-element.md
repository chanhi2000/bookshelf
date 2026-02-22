---
lang: en-US
title: "Yet Another Way to Center an (Absolute) Element"
description: "Article(s) > Yet Another Way to Center an (Absolute) Element"
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
      content: "Article(s) > Yet Another Way to Center an (Absolute) Element"
    - property: og:description
      content: "Yet Another Way to Center an (Absolute) Element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/yet-another-way-to-center-an-absolute-element.html
prev: /programming/css/articles/README.md
date: 2026-02-27
isOriginal: false
author:
  - name: Juan Diego Rodríguez
    url: https://css-tricks.com/author/monknow/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/09/guide-centering.png
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
  name="Yet Another Way to Center an (Absolute) Element"
  desc="TL;DR: We can center absolute-positioned elements in three lines of CSS. And it works on all browsers!"
  url="https://css-tricks.com/yet-another-way-to-center-an-absolute-element"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/09/guide-centering.png"/>

TL;DR: We can center absolute-positioned elements in three lines of CSS. And it works on all browsers!

```css
.element {
  position: absolute;
  place-self: center; 
  inset: 0;
}
```

Why? Well, that needs a longer answer.

In recent years, CSS has brought a lot of new features that don’t necessarily allow us to do new stuff, but certainly make them easier and simpler. For example, we don’t have to hardcode indexes anymore:

```html
<ul style="--t: 8">
  <li style="--i: 1"></li>
  <li style="--i: 2"></li>
  <!--  ...  -->
  <li style="--i: 8"></li>
</ul>
```

Instead, all this is condensed into the [**`sibling-index()`**](/css-tricks.com/almanac-functions/sibling-index.md) and [**`sibling-count()`**](/css-tricks.com/almanac-functions/sibling-count.md) functions. There are lots of recent examples like this.

Still, there is one little task that feels like we’ve doing the same for decades: **centering an absolutely positioned element**, which we usually achieve like this:

```css
.element {
  position: absolute;
  top: 50%;
  left: 50%;
  
  translate: -50% -50%;
}
```

We move the element’s top-left corner to the center, then translate it back by 50% so it’s centered.

<CodePen
  user="anon"
  slug-hash="dPpyWLE"
  title="Yet another way to center an (absolute) element - Old Way"
  :default-tab="['css','result']"
  :theme="dark"/>

There is nothing wrong with this way — we’ve been doing it for decades. But still it feels like the *old way*. Is it the *only way*? Well, there is another not-so-known cross-browser way to not only center, but also easily place any absolutely-positioned element. And what’s best, it reuses the familiar [**`align-self`**](/css-tricks.com/almanac-properties/align-self.md) and [**`justify-self`**](/css-tricks.com/almanac-properties/justify-self.md) properties.

Turns out that these properties (along with their [**`place-self`**](/css-tricks.com/almanac-properties/place-self.md) shorthand) now work on absolutely-positioned elements. However, if we try to use them as is, we’ll notice our element doesn’t even flinch.

```css
/* Doesn't work!! */
.element {
  position: absolute;
  place-self: center; 
}
```

So, how do `align-self` and `justify-self` work for absolute elements? It may be obvious to say they should align the element, and that’s true, but specifically, they align it within its **Inset-Modified Containing Block** (IMCB). Okay… But what’s the IMCB?

Imagine we set our absolute element `width` and `height` to `100%`. Even if the element’s position is absolute, it certainly doesn’t grow infinitely, but rather it’s enclosed by what’s known as the **containing block**.

::: note

The containing block is the closest ancestor with a new [<VPIcon icon="fa-brands fa-firefox"/>stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context). By default, it is the `html` element.

:::

We can modify that containing block using [**`inset`**](/css-tricks.com/almanac-properties/inset.md) properties (specifically [**`top`, `right`, `bottom`, and `left`**](/css-tricks.com/almanac-properties/top-right-bottom-left.md)). I used to think that `inset` properties fixed the element’s corners (I even said it a couple of seconds ago), but under the hood, we are actually fixing the IMCB *borders*.

![Diagram showing the CSS for an absolutely-positioning element with inset properties and how those values map to an element.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/09/inset-modified-containing-block-example.png?resize=1920%2C1080&ssl=1)

By default, the IMCB is the same size as the element’s dimensions. So before, [**`align-self`**](/css-tricks.com/almanac-properties/align-self.md) and [**`justify-self`**](/css-tricks.com/almanac-properties/justify-self.md) were trying to center the element within itself, resulting in nothing. Then, our last step is to set the IMCB so that it is the same as the containing block.

```css{3}
.element {
  position: absolute;
  place-self: center; 
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
} 
```

Or, using their [**`inset`**](/css-tricks.com/almanac-properties/inset.md) shorthand:

```css
.element {
  position: absolute;
  place-self: center; 
  inset: 0;
}
```

Only three lines! A win for CSS nerds. Admittedly, I might be cheating since, in the old way, we could also use the `inset` property and reduce it to three lines, but… let’s ignore that fact for now.

<CodePen
  user="anon"
  slug-hash="vEXYePo"
  title="Yet another way to center an (absolute) element - New Way"
  :default-tab="['css','result']"
  :theme="dark"/>

We aren’t limited to just centering elements, since all the other `align-self` and `justify-self` positions work just fine. This offers a more idiomatic way to position absolute elements.

<CodePen
  user="anon"
  slug-hash="pvEodqx"
  title="Yet another way to center an (absolute) element - Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

::: tip Pro tip

If we want to leave a space between the absolutely-positioned element and its containing block, we could either add a `margin` to the element or set the container’s `inset` to the desired spacing.

:::

What’s best, I checked [<VPIcon icon="iconfont icon-caniuse"/>Caniuse](https://caniuse.com/mdn-css_properties_place-self_position_absolute_context), and while initially Safari didn’t seem to support it, upon testing, it seems to work on all browsers!


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Yet Another Way to Center an (Absolute) Element",
  "desc": "TL;DR: We can center absolute-positioned elements in three lines of CSS. And it works on all browsers!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/yet-another-way-to-center-an-absolute-element.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
