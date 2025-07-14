---
lang: en-US
title: "International box-sizing Awareness Day"
description: "Article(s) > International box-sizing Awareness Day"
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
      content: "Article(s) > International box-sizing Awareness Day"
    - property: og:description
      content: "International box-sizing Awareness Day"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/international-box-sizing-awareness-day.html
prev: /programming/css/articles/README.md
date: 2016-03-04
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
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
  name="International box-sizing Awareness Day"
  desc="It's February 1st today, which I've decided to declare International box-sizing Awareness Day. In honor of, you guessed it, the most humble and undersung, yet"
  url="https://css-tricks.com/international-box-sizing-awareness-day"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

It’s February 1st today, which I’ve decided to declare **International box-sizing Awareness Day**. In honor of, you guessed it, the most humble and undersung, yet awesome and useful CSS property: [<FontIcon icon="iconfont icon-css-tricks"/>`box-sizing`](https://css-tricks.com/almanac/properties/b/box-sizing/).

The date corresponds to [<FontIcon icon="fas fa-globe"/>Paul Irish’s post](http://paulirish.com/2012/box-sizing-border-box-ftw/) where he introduced the concept of using it on every single element on the page. We’ve talked about it [**around here**](/css-tricks.com/box-sizing.md) a [<FontIcon icon="iconfont icon-css-tricks"/>few times](https://css-tricks.com/almanac/properties/b/box-sizing/) as well.

![](//css-tricks.com/wp-content/uploads/2014/02/mega-protest-city-yah1.svg)

Here it is, in all it’s glory:

```css
*, *:before, *:after {
  -webkit-box-sizing: border-box; 
  -moz-box-sizing: border-box; 
  box-sizing: border-box;
}
```

::: note

You might also consider [**having box-sizing cascade with this technique**](/css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice.md). The `box-sizing` property doesn’t normally cascade, and you would be forcing it to, but it makes it a lot easier to override at a component level.

:::

The default value for `box-sizing` is `content-box`, which is what we are overriding here. There is also a padding-box value but… kinda useless if you ask me. We’ll get to what this means shortly.

Notice we’re using the `*` selector to select all elements, as well as making pseudo elements use the same model, which otherwise wouldn’t be selected by the `*` selector alone.

Here’s the browser support situation. `-` = “this version and down”. `+` = “this version and up”.

```css
*, *:before, *:after {
  /* Chrome 9-, Safari 5-, iOS 4.2-, Android 3-, Blackberry 7- */
  -webkit-box-sizing: border-box; 

  /* Firefox (desktop or Android) 28- */
  -moz-box-sizing: border-box;

  /* Firefox 29+, IE 8+, Chrome 10+, Safari 5.1+, Opera 9.5+, iOS 5+, Opera Mini Anything, Blackberry 10+, Android 4+ */
  box-sizing: border-box;
}
```

In the fairly near future we won’t need any prefixes at all for it, but I like to just leave that kind of thing to [**Autoprefixer**](/css-tricks.com/autoprefixer.md).

---

## Why all the HOO-RAH?!

**It makes working with boxes so super duper much nicer.**

When you set the width of an element, that’s the width that it is. If you set the width to 25%, it will take up 1/4 of the horizontal space available in its parent element. That’s it.

![](//css-tricks.com/wp-content/uploads/2014/02/step-1.svg)

That’s not always the case. With the default box-sizing, as soon as an element has either padding or border applied, the actual rendered width is wider than the width you set.

$$
\text{Actual/:width}=\text{width}+\text{border-left}+\text{border-right}+\text{padding-left}+\text{padding-right}
$$

![](//css-tricks.com/wp-content/uploads/2014/02/step-2.svg)

The math is bad enough, but when combined with percentages (or any mixed units, really) the result is impossible to do in your head and, more importantly, ends up being some useless number that you can’t do anything with.

![](//css-tricks.com/wp-content/uploads/2014/02/step-3.svg)

You might think of it this way: with `box-sizing: border-box` the padding and border *press their way inside* the box rather than expand the box. The result is a box the exact width you set it to be and can count on.

![](//css-tricks.com/wp-content/uploads/2014/02/step-4.svg)

Columns is [**a particularly useful case**](/css-tricks.com/dont-overthink-it-grids.md), but this comes in useful all the time and becomes one of those things that [**just makes CSS development better**](/css-tricks.com/a-line-in-the-sand.md).

::: note

Remember to read [<FontIcon icon="fas fa-globe"/>Paul’s original post](http://paulirish.com/2012/box-sizing-border-box-ftw/) which covers some more ground like performance (don’t worry about it), jQuery (don’t worry about it), and third-party content (easy to fix).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "International box-sizing Awareness Day",
  "desc": "It's February 1st today, which I've decided to declare International box-sizing Awareness Day. In honor of, you guessed it, the most humble and undersung, yet",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/international-box-sizing-awareness-day.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
