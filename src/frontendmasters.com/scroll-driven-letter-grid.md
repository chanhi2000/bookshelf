---
lang: en-US
title: "Scroll-Driven Letter Grid"
description: "Article(s) > Scroll-Driven Letter Grid"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Scroll-Driven Letter Grid"
    - property: og:description
      content: "Scroll-Driven Letter Grid"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/scroll-driven-letter-grid.html
prev: /programming/css/articles/README.md
date: 2025-06-09
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6059
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
  name="Scroll-Driven Letter Grid"
  desc="scroll-timelines go from 0 to 100. Many variable fonts axis have similar ranges, like 100 to 900. Surely that's begging for interplay."
  url="https://frontendmasters.com/blog/scroll-driven-letter-grid/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6059"/>

I was thinking about variable fonts the other day, and how many of them that deal with a variable axis for their weight go from 100 to 900. It varies — so you can always check [<VPIcon icon="fas fa-globe"/>wakamaifondue.com](https://wakamaifondue.com/) if you have the font file. [<VPIcon icon="fa-brands fa-google"/>Jost on Google Fonts](https://fonts.google.com/specimen/Jost) is a classic example. Load that sucker up and you can use whatever weight you want.

<CodePen
  user="chriscoyier"
  slug-hash="JodOePb"
  title="Jost Variable"
  :default-tab="['css','result']"
  :theme="dark"/>

I was also thinking about the “simple” kind of scroll-driven animations where all it does is move a `@keyframe` animation from 0% to 100% while a scrolling element goes from 0% to 100% “scrolled”. Fair warning that [<VPIcon icon="iconfont icon-caniuse"/>browser support isn’t great](https://caniuse.com/mdn-css_properties_scroll-timeline), but it’s just a fun thing that can easily just not happen.

It’s deliciously simple to use:

<CodePen
  user="chriscoyier"
  slug-hash="azOVQmp"
  title="Scroll Loader"
  :default-tab="['css','result']"
  :theme="dark"/>

We can smash these things together. We should be able to map 0%-100% to 100-900 pretty easily, right?

Right.

Let’s made a grid of 100 letters inside a `<div id="grid">`. We could use any kind of HTML generating technology. Let’s just vanilla JavaScript here.

```js
function generateGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.textContent = getRandomLetter();
    grid.appendChild(div);
  }
}

generateGrid();
```

The lay it out as a 10✕10:

```css
#grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}
```

We can chew through that grid in Sass applying random weights:

```scss
@for $i from 1 through 100 {
  #grid :nth-child(#{$i}) {
    font-weight: 100 + math.ceil(random() * 800);
  }
}
```

Looks like this.

<CodePen
  user="chriscoyier"
  slug-hash="bNdYQqJ"
  title="Random Letter Grid with Variable Fonts"
  :default-tab="['css','result']"
  :theme="dark"/>

But scroll up and down that preview!

I attached a scroll timeline to the document like:

```css
html {
  scroll-timeline: --page-scroll block;
}
```

Then use that timeline to call an animation like:

```css
#grid {
  > div {
    animation: to-thin auto linear;
    animation-timeline: --page-scroll;
  }
}
```

That animation is named `to-thin`, but actually I made three different animations: `to-thick`, `to-thin`, and `to-mid`, then applied them in rotation to all the letters, so any given letter does something a bit different.

```css
@keyframes to-thick {
  50% {
    font-weight: 900;
  }
}
@keyframes to-thin {
  50% {
    font-weight: 100;
  }
}
@keyframes to-mid {
  50% {
    font-weight: 450;
  }
}
```

See how I used `50%` keyframes there which is a nice trick to animate to that value half way through the animation, **then back.**

It then occurred to me I could make a *secret message.* So I make a `@mixin` that would override certain letters in CSS to make the message. It still randomized the weight, but all the letters animate to thin while the secret message animates to thick, revealing it as you scroll down.

<CodePen
  user="chriscoyier"
  slug-hash="gbpXQQy"
  title="Random Letter Grid with Variable Fonts with special message"
  :default-tab="['css','result']"
  :theme="dark"/>

Anyway this is sometimes how I spend my free time and it’s completely normal.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scroll-Driven Letter Grid",
  "desc": "scroll-timelines go from 0 to 100. Many variable fonts axis have similar ranges, like 100 to 900. Surely that's begging for interplay.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/scroll-driven-letter-grid.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
