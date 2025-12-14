---
lang: en-US
title: "A Collection of Interesting Facts about CSS Grid Layout"
description: "Article(s) > A Collection of Interesting Facts about CSS Grid Layout"
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
      content: "Article(s) > A Collection of Interesting Facts about CSS Grid Layout"
    - property: og:description
      content: "A Collection of Interesting Facts about CSS Grid Layout"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/collection-interesting-facts-css-grid-layout.html
prev: /programming/css/articles/README.md
date: 2017-07-21
isOriginal: false
author:
  - name: Manuel Matuzovic
    url : https://css-tricks.com/author/mmatuzo/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="A Collection of Interesting Facts about CSS Grid Layout"
  desc="Have fun!"
  url="https://css-tricks.com/collection-interesting-facts-css-grid-layout"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

A few weeks ago [I held a CSS Grid Layout workshop (<VPIcon icon="fa-brands fa-x-twitter"/>`mmatuzo`)](https://x.com/mmatuzo/status/865886460670595072). Since I’m, like most of us, also pretty new to the topic, I learned a lot while preparing the slides and demos.  
I decided to share some of the stuff that was particularly interesting to me, with you.

Have fun!

---

## Negative values lower than -1 may be used for grid-row-end and grid-column-end

In a lot of code examples and tutorials you will see that you can use `grid-column-start: 1` and `grid-column-end: -1` (or the shorthand `grid-column: 1 / -1`) to span an element from the first line to the last. My friend [Max (<VPIcon icon="fa-brands fa-x-twitter"/>`mxbck`)](https://twitter.com/mxbck) made me aware that it’s possible to use lower values than `-1` as well.

```css
.grid-item {
  grid-column: 1 / -2;
}
```

For example, you can set `grid-column: 1 / -2` to span the cells between the first and the second to last line.

<CodePen
  user="matuzo"
  slug-hash="rmQMyp"
  title="Grid item from first to second to last"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## It’s possible to use negative values in `grid-column`/`row-start`

Another interesting thing about negative values is that you can use them on `grid-column/row-start` as well. The difference between positive and negative values is that with negative values the placement will come from the opposite side. If you set `grid-column-start: -2` the item will be placed on the second to last line.

```css
.item {
  grid-column-start: -3;
  grid-row: -2;
}
```

<CodePen
  user="matuzo"
  slug-hash="mwMLMX"
  title="Negative values in grid-column/row-start"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Generated content pseudo-elements (`::before` and `::after`) are treated as grid items

It may seem obvious that pseudo-elements generated with CSS become grid items if they’re within a grid container, but I wasn’t sure about that. So I created a quick demo to verify it. In the following Pen you can see that [generated elements become grid- and flex-items (<VPIcon icon="fa-brands fa-codepen"/>`matuzo`)](https://codepen.io/matuzo/pen/mmQxEx) if they are within a corresponding container.

<CodePen
  user="matuzo"
  slug-hash="mmQxEx"
  title="Experiment: Pseudo elements as grid items"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Animating CSS Grid Layout properties

According to the [<VPIcon icon="iconfont icon-w3c"/>CSS Grid Layout Module Level 1 specification](https://w3.org/TR/css-grid-1/#propdef-grid-column-gap) there are 5 animatable grid properties:

- `grid-gap`, `grid-row-gap`, `grid-column-gap`
- `grid-template-columns`, `grid-template-rows`

Currently only the animation of `grid-gap`, `grid-row-gap`, `grid-column-gap` is implemented and only in Firefox and Firefox Mobile. I wrote [a post about animating CSS Grid Layout properties (<VPIcon icon="fa-brands fa-codepen"/>`matuzo`)](https://codepen.io/matuzo/post/animating-css-grid-layout-properties), where you’ll find some more details and a demo.

---

## The value of grid-column/row-end can be lower than the start value

In level 4 of the [<VPIcon icon="fas fa-globe"/>CSS Grid Garden game](https://cssgridgarden.com/) I learned that the value of `grid-column-end` or `grid-row-end` may be lower than the respective start equivalent.

```css
.item:first-child {
  grid-column-end: 2;
  grid-column-start: 4;
}
```

The item in the above code will start on the 4th line and end on the 2nd, or in other words, start on the 2nd line and end on the 4th.

<CodePen
  user="matuzo"
  slug-hash="jwLxeg"
  title="Lower grid-column-end value than grid-column-start"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Using the `span` keyword on grid-column/row-start and grid-column/row-end

A grid item by default spans a single cell. If you want to change that, the `span` keyword can be quite convenient. For example setting `grid-column-start: 1` and `grid-column-end: span 2` will make the grid item span two cells, from the first to the third line.

You can also use the span keyword with `grid-column-start`. If you set `grid-column-end: -1` and `grid-column-start: span 2` the grid-item will be placed at the last line and span 2 cells, from the last to third to last line.

<CodePen
  user="matuzo"
  slug-hash="jwLKWb"
  title="CSS Grid Layout: span keyword"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## grid-template-areas and implicit named lines

If you create template areas in a grid, you automatically get four implicit named lines, two naming the `row-start` and `row-end` and two for the `column-start` and `column-end`. By adding the `-start` or `-end` suffix to the name of the area, they’re applicable like any other named line.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 200px 200px;
  grid-template-areas: 
    "header header header"
    "articles favorites posts"
}

.footer {
  grid-column-start: favorites-start;
  grid-column-end: posts-end;
}
```

::: info

See [an example for implicit named lines in this Pen (<VPIcon icon="fa-brands fa-codepen"/>`matuzo`)](https://codepen.io/matuzo/pen/YVaERZ).

<CodePen
  user="matuzo"
  slug-hash="YVaERZ"
  title="CSS Grid Layout Areas: magic lines (-start, -end)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

---

## Grid is available in the insider version of Microsoft Edge

Support for CSS Grid Layout is pretty great since all major browsers, except IE and Edge, support it. For a lot of projects you can [<VPIcon icon="fa-brands fa-youtube"/>start using CSS Grid Layouts today](https://youtu.be/tjHOLtouElA). Support for Microsoft Edge will probably come pretty soon, because it’s already available in the insider version of Microsoft Edge.

This browser support data is from [<VPIcon icon="iconfont icon-caniuse"/>Caniuse](http://caniuse.com/#feat=css-grid), which has more detail. A number indicates that browser supports the feature at that version and up.

### Desktop

| Chrome | Firefox | IE | Edge | Safari |
| --- | --- | --- | --- | --- |
| 57 | 52 | 11\* | 16 | 10.1 |

### Mobile / Tablet

| Android Chrome | Android Firefox | Android | iOS Safari |
| --- | --- | --- | --- |
| 142 | 144 | 142 | 10.3 |

If you want to learn more about Grids check out [<VPIcon icon="iconfont icon-css-tricks"/>The Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/), [**Getting Started with CSS Grid**](/css-tricks.com/getting-started-css-grid.md), [<VPIcon icon="fas fa-globe"/>Grid By Example](http://gridbyexample.com/) and my [<VPIcon icon="fa-brands fa-codepen"/>Collection of Grid demos on CodePen](https://codepen.io/collection/ngwzNp/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Collection of Interesting Facts about CSS Grid Layout",
  "desc": "Have fun!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/collection-interesting-facts-css-grid-layout.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
