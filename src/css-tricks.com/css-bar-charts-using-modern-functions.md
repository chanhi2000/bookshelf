---
lang: en-US
title: "CSS Bar Charts Using Modern Functions"
description: "Article(s) > CSS Bar Charts Using Modern Functions"
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
      content: "Article(s) > CSS Bar Charts Using Modern Functions"
    - property: og:description
      content: "CSS Bar Charts Using Modern Functions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-bar-charts-using-modern-functions.html
prev: /programming/css/articles/README.md
date: 2026-02-05
isOriginal: false
author:
  - name: Preethi
    url : https://css-tricks.com/author/preethi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/bar-chart-horizontal.webp
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
  name="CSS Bar Charts Using Modern Functions"
  desc="CSS-only bar charts are one of those things we've tackled a bunch of times in different ways. But how can modern CSS features finally make it not only trivial, but fun?"
  url="https://css-tricks.com/css-bar-charts-using-modern-functions"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/bar-chart-horizontal.webp"/>

New CSS features can sometimes make it easier and more efficient to code designs we already knew how to create. This efficiency could stem from reduced code or hacks, or improved readability due to the new features.

In that spirit, let’s revamp what’s under the hood of a bar chart.

```html
<ul class="chart" tabindex="0" role="list" aria-labelledby="chart-title">
  <li class="chart-bar" data-value="32" tabindex="0" role="img" aria-label="32 percentage">32%</li>
  <!-- etc. -->
</ul>
```

We begin by laying out a grid.

```css
.chart {
  display: grid;
  grid-template-rows: repeat(100, 1fr);
  /* etc. */
}
```

The chart metric is based on percentage, as in “some number *out of 100*.” Let’s say we’re working with a grid containing 100 rows. That ought to stress test it, right?

Next, we add the bars to the grid with the `grid-column` and `grid-row` properties:

```css
.chart-bar {
  grid-column:  sibling-index();
  grid-row: span attr(data-value number);
  /* etc. */
}
```

Right off the bat, I want to note a couple of things. First is that [**`sibling-index()`**](/css-tricks.com/almanac-functions/sibling-index.md) function. It’s brand new and has incomplete [<VPIcon icon="iconfont icon-caniuse"/>browser support](https://caniuse.com/wf-sibling-count) as of this writing (come on, Firefox!), though it’s currently supported in the latest Chrome and Safari (but not on iOS apparently). Second is that [**`attr()`**](/css-tricks.com/almanac-functions/attr.md) function. We’ve had it for a while, but it was recently upgraded and [<VPIcon icon="fas fa-globe"/>now accepts data-attributes](https://amitmerchant.com/attr-function-types-css/). So when we have one of those in our markup — like `data-value="32"` — that’s something the function can read.

With those in place, that’s really all we need to create a pretty darn nice bar chart in vanilla CSS! The following demo has fallbacks in place so that you can still see the final result in case your browser hasn’t adopted those new features:

<CodePen
  user="anon"
  slug-hash="ZYOOvmb"
  title="Easy CSS Bar Chart 1"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Yes, that was easy to do, but it’s best to know exactly *why* it works. So, let’s break that down.

---

## Automatically Establishing Grid Columns

Declaring the `sibling-index()` function on the `grid-column` property *explicitly* places the list items in consecutive columns. I say “explicit” because we’re telling the grid exactly where to place each item by its `data-value` attribute in the markup. It goes first `<li>` in first column, second `<li>` in second column, and so forth.

That’s the power of `sibling-index()` — the grid intelligently generates the order for us [**without having to do it manually**](/css-tricks.com/how-to-wait-for-the-sibling-count-and-sibling-index-functions.md) through CSS variables.

```css
/* First bar: sibling-index() = 1 */
grid-column: sibling-index();

/* ...results in: */
grid-column: 1;
grid-column-start: 1; grid-column-end: auto;

/* Second bar: sibling-index() = 2 */
grid-column: sibling-index();

/* ...results in: */
grid-column: 2;
grid-column-start: 2; grid-column-end: auto;

/* etc. */
```

---

## Automatically Establishing Grid Rows

It’s pretty much the same thing! But in this case, each bar occupies a certain number of rows based on the percentage it represents. The grid gets those values from the `data-value` attribute in the markup, effectively telling the grid how tall each bar in the chart should be.

```css
/* First bar: data-value="32" */
grid-row: span attr(data-value number);

/* ...results in: */
grid-row: span 32

/* Second bar: data-value="46" */
grid-row: span attr(data-value number);

/* ...results in: */
grid-row: span 46
```

The `attr()` function, when provided with a *data type* parameter (the parameter value `number` in our case), [<VPIcon icon="fa-brands fa-firefox"/>casts the value retrieved by](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/attr#return_value) [<VPIcon icon="fa-brands fa-firefox"/>`attr()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/attr#return_value) [**into that specific type**](/css-tricks.com/almanac-functions/attr.md#aa-css-attr-data-types). In our example, the `attr()` function returns the value of `data-value` as a `<number>` type, which is then used to determine the number of rows to span for each bar.

---

## Let’s Make Different Charts!

Since we have the nuts and bolts down on this approach, I figured I’d push things a bit and demonstrate how we can apply the same techniques for all kinds of CSS-only charts.

For example, we can use `grid-row` values to adjust the vertical direction of the bars:

<CodePen
  user="anon"
  slug-hash="azZBNQL"
  title="Easy CSS Bar Chart 3"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Or we can skip bars altogether and use markers instead:

<CodePen
  user="anon"
  slug-hash="WbxowYb"
  title="Easy CSS Bar Chart 2"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<CodePen
  user="anon"
  slug-hash="YPWpqRO"
  title="Easy CSS Bar Chart 4"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We can also swap the columns and rows for horizontal bar charts:

<CodePen
  user="anon"
  slug-hash="pvbNyqy"
  title="Easy CSS Bar Chart 5"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Wrapping up

Pretty exciting, right? Just look at all the ways we used to pull this stuff off before the days of `sibling-index()` and an upgraded `attr()`:

- [**Making Charts with CSS**](/css-tricks.com/making-charts-with-css.md) (Robin Rendle, 2015)
- [**Making A Bar Chart with CSS Grid**](/css-tricks.com/making-a-bar-chart-with-css-grid.md) (Robin Rendle, 2017)
- [**More CSS Charts, with Grid & Custom Properties**](/css-tricks.com/css-charts-grid-custom-properties.md) (Miriam Suzanne, 2017)
- [**Overlapping Bar Charts**](/css-tricks.com/overlapping-bar-charts.md) (Saleh Mubasher, 2022)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Bar Charts Using Modern Functions",
  "desc": "CSS-only bar charts are one of those things we've tackled a bunch of times in different ways. But how can modern CSS features finally make it not only trivial, but fun?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-bar-charts-using-modern-functions.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
