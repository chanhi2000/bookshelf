---
lang: en-US
title: "Solved by CSS Scroll-Driven Animations: Detect if an element can scroll or not"
description: "Article(s) > Solved by CSS Scroll-Driven Animations: Detect if an element can scroll or not"
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
      content: "Article(s) > Solved by CSS Scroll-Driven Animations: Detect if an element can scroll or not"
    - property: og:description
      content: "Solved by CSS Scroll-Driven Animations: Detect if an element can scroll or not"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not.html
prev: /programming/css/articles/README.md
date: 2023-09-16
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2023/09/css-scroll-detection.png
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
  name="Solved by CSS Scroll-Driven Animations: Detect if an element can scroll or not"
  desc="Leverage Scroll-Driven Animations + a Space Toggle or State Query to selectively style an element based on it being scrollable or not."
  url="https://bram.us/bram.us/2023/09/16/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2023/09/css-scroll-detection.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2023/09/css-scroll-detection.png)

Because Scroll-Driven Animations are only active when there is scrollable overflow, it is possible to use them as a mechanism to detect if an element can scroll or not. Mix in a Space Toggle or a Style Query, and you’ve got all you need to selectively style an element based on it being scrollable or not.

---

## The Code

If you’re here for just the code, here it is:

```css
@keyframes detect-scroll {
  from, to { --can-scroll: ; }
}

.container {
  animation: detect-scroll linear;
  animation-timeline: scroll(self);

  --bg-if-can-scroll: var(--can-scroll) lime;
  --bg-if-cant-scroll: red;
  background: var(--bg-if-can-scroll, var(--bg-if-cant-scroll));
}
```

If you want to know how to use it and why this works, keep on reading 😉

---

## Active vs Inactive Scroll-Driven Animations

A [<VPIcon icon="fas fa-globe"/>Scroll-Driven Animation](https://scroll-driven-animations.style/) is an animation that is driven by scroll. But what if there is no scroll distance to animate on, what happens then? Well, the spec has this covered, and [<VPIcon icon="iconfont icon-w3c"/>states that the animation is inactive in that case](https://w3.org/TR/scroll-animations-1/#:~:text=If%20the%20source%20of%20a%20ScrollTimeline%20is%20an%20element%20whose%20principal%20box%20does%20not%20exist%20or%20is%20not%20a%20scroll%20container%2C%20or%20if%20there%20is%20no%20scrollable%20overflow%2C%20then%20the%20ScrollTimeline%20is%20inactive.):

> If the source of a ScrollTimeline is an element whose principal box does not exist or is not a scroll container, or if there is no scrollable overflow, then the ScrollTimeline is inactive.

Take this animation `anim` for example, which animates the color from `hotpink` to `lime`.

```css
.container {
  height: 250px;
  width: 250px;
  overflow-y: auto;

  animation: anim linear;
  animation-timeline: scroll(self);
}

@keyframes anim {
  from { color: hotpink; }
  to { color: lime; }
}
```

In a scroll container that has no scrollable overflow, the animation won’t be active, and thus the text will have the color that was declared on it.

<CodePen
  link="https://codepen.io/bramus/pen/LYMjXpo/dbe4ab2961373fa9ceae7378d6fcdc9c"
  title="Scroll Detection with CSS Scroll-Driven Animations: Inactive Animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Adding Custom Properties to the mix to make a scroll detector

Just like regular CSS Properties, Custom Properties can also be animated.

```css
@keyframes anim {
  from { --foo: 0; }
  to { --foo: 1; }
}
```

When attached as a Scroll-Driven Animation to a scroll container that has no scrollable overflow, the value of the custom property would be `initial`, because it is not set.

To turn this into a scroll detector, it’s a matter of making sure the value has one and the same value when inside the animation. This is done by setting the `to` and `from` to the same value.

```css
@keyframes anim {
  from, to { --can-scroll: 1; }
}
```

Hooking that animation to a Scroll-Driven Animation and also making sure that `--can-scroll` has an initial value of `0`, the full code becomes this:

```css
.container {
  height: 250px;
  width: 250px;
  overflow-y: auto;

  --can-scroll: 0;
  animation: detect-scroll;
  animation-timeline: scroll(self);
}

@keyframes detect-scroll {
  from, to  {
    --can-scroll: 1;
  }
}
```

For elements that have scrollable overflow, the animation will be active, so the computed value of `--can-scroll` will be `1`. For elements without scrollable overflow, the value will be `0`

This value can be used in calculations, for example:

```css
.container {
  outline: calc(10px * var(--can-scroll)) dotted lime;
}
```

This code will give the scrollable container a 10px side dotted lime outline, whereas a non-scrollable container will have a 0px wide outline.

<CodePen
  link="https://codepen.io/bramus/pen/BavdGOw/895c51226b12b2363ebf72fc1dd66cf1"
  title="Scroll Detection with CSS Scroll-Driven Animations"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Note that you don’t need to [**register the property using `@property` here**](/bram.us/the-gotcha-with-animating-custom-properties.md#intro), as there’s no interpolation that needs to be done. The property is simply used as a telltale.

---

## Making it more developer friendly

To make it easier to work with, there’s a few variations to make:

- Use a Space Toggle
- Use a Style Query

### Space Toggle Variant

The [Space Toggle Variant (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/full/oNJeQjr/2611ac1421ae3f04ddbfc1c3854d5b7f) follows the basic mechanics of a [Space Toggle (<VPIcon icon="iconfont icon-github"/>`propjockey/css-sweeper`)](https://github.com/propjockey/css-sweeper#basics-of-space-toggle) by setting the `--can-scroll` to an initial value of `initial` and a space as the value inside the animation. This allows you to set more than just numbers.

```css
.container {
  height: 250px;
  width: 250px;
  overflow-y: auto;

  --can-scroll: initial; /* initial = false */
  animation: detect-scroll;
  animation-timeline: scroll(self);

  --color-if-can-scroll: var(--can-scroll) lime;
  --color-if-cant-scroll: red;
  outline: 10px dotted var(--color-if-can-scroll, var(--color-if-cant-scroll));
}

@keyframes detect-scroll {
  from, to {
    --can-scroll: ; /* space = true */
  }
}
```

A downside of this approach is that is a bit harder to read if you’re not entirely familiar with [how Space Toggles work (<VPIcon icon="iconfont icon-github"/>`propjockey/css-sweeper`)](https://github.com/propjockey/css-sweeper#basics-of-space-toggle).

<CodePen
  user="bramus"
  slug-hash="oNJeQjr"
  title="Scroll Detection with CSS Scroll-Driven Animations (Space Toggle)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Style Query Variant

The [Style Query Variant (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/full/PoXKxzG/51cf50fdaca90ac734986c47ce3af079) uses a Style Query to respond to this change in value. This makes it act as a polyfill for a [<VPIcon icon="fas fa-globe"/>State Query](https://ishadeed.com/article/css-state-queries/).

```css
@container style(--can-scroll: 1) {
  p {
    color: lime;
  }
}

@container style(--can-scroll: 0) {
  p {
    color: red;
  }
}
```

A downside of this approach is that is that you can only style child elements of the container and that – at the time of writing – only Chrome supports [<VPIcon icon="fa-brands fa-chrome"/>Style Queries](https://developer.chrome.com/blog/style-queries/).

<CodePen
  user="bramus"
  slug-hash="PoXKxzG/51cf50fdaca90ac734986c47ce3af079"
  title="Scroll Detection with CSS Scroll-Driven Animations (Style Query)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

~

---

## Practical example

Recently I saw [this nice demo by Shu Ding (<VPIcon icon="fa-brands fa-codepen"/>`shuding`)](https://codepen.io/shuding/pen/WNLGQor) that shows/hides scroll indicators as you scroll up/down, powered by Scroll-Driven Animations.

<CodePen
  user="shuding"
  slug-hash="WNLGQor"
  title="CodePen Embed"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

While nice, there is an issue with it though: when the content is too small for the scroller, the indicators both show!

<CodePen
  user="bramus"
  slug-hash="QWzMzyJ/a972a64f3625f1dc1b0da1d06b8ee76e"
  title="Scroll Timeline"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This is where the CSS scroll-detection detailed in this post can help: only show the indicators when there is scrollable overflow. I do this by conditionally setting the `visibility` to `hidden` so that there’s no layout shift when they are not visible.

```css
@keyframes detect-scroll {
  from, to { --can-scroll: ;}
}

.container {
  animation: detect-scroll;
  animation-timeline: --scroll-timeline;
}

.up, .down {
  --visibility-if-can-scroll: var(--can-scroll) visible;
  --visibility-if-cant-scroll: hidden;
  visibility: var(--visibility-if-can-scroll, var(--visibility-if-cant-scroll));
}
```

The result, looks like this:

<CodePen
  user="bramus"
  slug-hash="MWZjGeG"
  title="Conditional Revealing Scroll Indicators Scroll-Timeline"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

While at it, I also made the code more reusable. Instead of limiting the `reveal` keyframes from `0%` to `2%` – which makes them depend on the containing block’s size – they span the full `0%`–`100%` range. Then, `animation-range: 20px 40px;` is used to limit when the animation should run. See [this thread on X *(née Twitter)* (<VPIcon icon="fa-brands fa-x-twitter"/>`bramus`)](https://twitter.com/bramus/status/1698593292403794266) for more info.

Also see [<VPIcon icon="fas fa-globe"/>this demo+writeup](https://kizu.dev/scroll-driven-animations/#proper-scrolling-shadows) by kizu on Proper Scroll Shadows.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Solved by CSS Scroll-Driven Animations: Detect if an element can scroll or not",
  "desc": "Leverage Scroll-Driven Animations + a Space Toggle or State Query to selectively style an element based on it being scrollable or not.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
