---
lang: en-US
title: "Don't Overthink It Grids"
description: "Article(s) > Don't Overthink It Grids"
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
      content: "Article(s) > Don't Overthink It Grids"
    - property: og:description
      content: "Don't Overthink It Grids"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/dont-overthink-it-grids.html
prev: /programming/css/articles/README.md
date: 2017-12-28
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/08/grid.png
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
  name="Don't Overthink It Grids"
  desc="The vast majority of websites out there use a grid. They may not explicitly have a grid system in place, but if they have a ”main content area” floated to the"
  url="https://css-tricks.com/dont-overthink-it-grids"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/08/grid.png"/>

The vast majority of websites out there use a grid. They may not explicitly have a grid system in place, but if they have a “main content area” floated to the left a “sidebar” floated to the right, it’s a simple grid.

If a more complex layout presents itself, people often reach for a grid framework. They assume grids are these super difficult things best left to super CSS nerds. That idea is perpetuated by the fact that a lot of the grid systems they reach for *are* very complicated.

::: note

Note that this article was published in 2012. Floats was still the primary method for a grid system, and this article focuses on *really* simple methods for that, like just floating four 25% elements and not getting crazy with math and exotic gutter systems. These days, I’d highly recommend using CSS [<VPIcon icon="iconfont icon-css-tricks"/>grid](https://css-tricks.com/snippets/css/complete-guide-grid/) or [<VPIcon icon="iconfont icon-css-tricks"/>flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for your grid system, if you even need to create an abstracted grid at all. It’s arguably even easier and definitely more flexible and powerful.

:::

Here’s how I build grids. It’s not hard or complicated. Even making them flexible is no big deal.

---

## Context

A block level element is as wide as the parent it’s inside (`width: auto;`). We can think of it as 100% wide. The wrapper for a grid probably don’t have much to do with semantics, it’s just a generic wrapper, so a `div` is fine.

```html
<div class="grid">
  <!-- 100% wide -->
</div>
```

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/08/grid.png?resize=796%2C210&ssl=1)

---

## Columns

Let’s start with a practical and common need: a main content area being 2/3 the width and a sidebar being 1/3 the width. We just make two column divs with appropriate class names.

```html
<div class="grid">
  <div class="col-2-3">
     Main Content
  </div>
  <div class="col-1-3">
     Sidebar
  </div>
</div>
```

To make them next to each other, we just need to float them and apply widths. We can select both like this:

```css
[class*='col-'] {
  float: left;
}
```

and individual width like this:

```css
.col-2-3 {
  width: 66.66%;
}
.col-1-3 {
  width: 33.33%;
}
```

That’s the whole premise of not overthinking grids.

---

## Clearing Context

The parent element will collapse to zero height since it has only floated children. Let’s fix that by clearing it. These days all you need is this:

```css
.grid:after {
  content: "";
  display: table;
  clear: both;
}
```

---

## Gutters

The hardest part about grids is gutters. So far we’ve made our grid flexible by using percentages for widths. We could make the math all complicated and use percentages for gutters as well, but personally I don’t like percentage gutters anyway, I like fixed pixel size gutters. Plus, we’re trying to keep too much thinking out of this.

**The first step** toward this is using [<VPIcon icon="iconfont icon-css-tricks"/>`box-sizing`](https://css-tricks.com/almanac/properties/b/box-sizing/): `border-box`;. I like using it on absolutely everything.

```css
*, *:after, *:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
```

Now when we set a width, that element *stays* that width, despite padding or borders being applied.

**The second step** is applying a fixed padding to the right side of all columns except the last one.

```css
[class*='col-'] {
  padding-right: 20px;
}
[class*='col-']:last-of-type {
  padding-right: 0;
}
```

![twothirdonethird](https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/08/twothirdonethird.png?resize=798%2C164)

That’s all there is to basic gutters.

---

## Outside Gutters

Need gutters on the outside? I like using an opt-in class for this:

```html
<div class="grid grid-pad">
  Grid with outside gutters also
</div>
```

**Step one** is to add left padding to the grid parent (and optionally top and bottom padding):

```css
.grid-pad {
  padding: 20px 0 20px 20px;
}
```

**Step two** is to restore the right padding to the last column:

```css
.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}
```

![grid outside padding](https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/08/grid-outside-padding.png?resize=796%2C200)

---

## More Column Choices

Super easy:

```css
.col-1-2 {
  width: 50%;
}
.col-1-4 {
  width: 25%;
}
.col-1-8 {
  width: 12.5%;
}
```

Do whatever you want. Just make sure the column fractions add up to 1. Yeah, a little thinking, but easier than usual.

![more grids](https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/08/more-grids.png?resize=798%2C224)

---

## Sass

I’m not using it heavily here, but the whole bit becomes even a bit more succinct with SCSS/Compass:

```scss :collapsed-lines
* {
  @include box-sizing(border-box);
}

$pad: 20px;

.grid {
  background: white;
  margin: 0 0 $pad 0;
  
  &:after {
    /* Or @extend clearfix */
    content: "";
    display: table;
    clear: both;
  }
}

[class*='col-'] {
  float: left;
  padding-right: $pad;
  .grid &:last-of-type {
    padding-right: 0;
  }
}
.col-2-3 {
  width: 66.66%;
}
.col-1-3 {
  width: 33.33%;
}
.col-1-2 {
  width: 50%;
}
.col-1-4 {
  width: 25%;
}
.col-1-8 {
  width: 12.5%;
}

/* Opt-in outside padding */
.grid-pad {
  padding: $pad 0 $pad $pad;
  [class*='col-']:last-of-type {
    padding-right: $pad;
  }
}
```

---

## Modules

I like to work within these grids with “modules”.

```html
<div class="grid">
  <div class="col-2-3">
     <article class="module">
        stuff
     </article>
     <article class="module">
        stuff
     </article>
  </div>
  <div class="col-1-3">
    <aside class="module">
       Sidebar stuff. Sub modules?
    </aside>
  </div>
</div>
```

It feels nice breaking up content into bits this way. The bonus side effect being that each module can have padding of it’s own, keeping text away from the edges of the grid.

---

## Result

Here’s [a demo on CodePen (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](http://codepen.io/chriscoyier/pen/eGcLw).

<CodePen
  user="chriscoyier"
  slug-hash="eGcLw"
  title="Don't Overthink It Grids"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Browser Whatnot

Works just great in IE 8 and up and all the other standard stuff. If you need IE 7 support, you’ll have to do something else.

Also, [<VPIcon icon="iconfont icon-css-tricks"/>Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is going to make this even easier and better (in various ways, including reordering on demand), but I think we need about a year until we can start to think about using it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Don't Overthink It Grids",
  "desc": "The vast majority of websites out there use a grid. They may not explicitly have a grid system in place, but if they have a ”main content area” floated to the",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/dont-overthink-it-grids.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
