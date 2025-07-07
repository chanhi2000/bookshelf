---
lang: en-US
title: "Quantity Query Carousel"
description: "Article(s) > Quantity Query Carousel"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Quantity Query Carousel"
    - property: og:description
      content: "Quantity Query Carousel"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/quantity-query-carousel.html
prev: /programming/css/articles/README.md
date: 2025-06-25
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6323
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
  name="Quantity Query Carousel"
  desc=":has() makes quantities queries both easier and more powerful. We can alter how a grid is laid out and where the children go. Or, we can just blast it into a carousel. "
  url="https://frontendmasters.com/blog/quantity-query-carousel/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6323"/>

The concept of a **quantity query** is really neat. [<FontIcon icon="fas fa-globe"/>Coined by Heydon](https://alistapart.com/article/quantity-queries-for-css/) back in 2015, the idea is that you apply different styles depending on how many siblings there are. They was a [<FontIcon icon="fas fa-globe"/>way to do it back then](https://quantityqueries.com/), but it’s gotten much [**easier thanks to `:has()`**](/frontendmasters.com/quantity-queries-are-very-easy-with-css-has.md), which not only makes the detection easier but gives us access to the parent element where we likely want it.

For instance:

```scss
.grid {
  display: grid;

  &:has(:nth-child(2)) {
    /* Has at least 2 elements */
    grid-template-columns: 1fr 1fr;
  }
 
  /* Use a :not() to do reverse logic */
}
```

What if we kept going with the idea where we…

- If there is 1 element, let it be full-width
- If there are 2 elements, set them side-by-side
- If there are 3 elements, the first two are side-by-side, then the last is full-width
- If there are 4 elements, then it’s a 2×2 grid

Then…

- If there are 5+ elements, *woah there*, let’s just make it a carousel.

I heard Ahmad Shadeed mention this idea on stage at CSS Day and I had to try it myself. Good news is that it works, particularly if you can stomach the idea of a “carousel” just being “horizontal overflow with some scroll snapping” in Firefox/Safari for now. Of course you’d be free to make your own fallback as needed.

Here’s the whole gang:

<CodePen
  user="chriscoyier"
  slug-hash="qEdJqdZ"
  title="Quantity Query Carousel"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Setup & One

The default setup can be something like:

```css
.grid {
  display: grid;
  gap: 1rem;
}
```

Honestly we don’t even really need to make it a grid for one item, but it doesn’t really hurt and now we’re set up for the rest of them.

---

## Two

Does it have two? Yeah? Let’s do this.

```scss
.grid {
  ...

  &:has(:nth-child(2)) {
    grid-template-columns: 1fr 1fr;
  }
}
```

Note that if our grid has *three* or more elements, this will also match. So if want to do something different with columns, we’ll need to override this or otherwise change things.

---

## Three

To illustrate the point, let’s match where there are *only* three items.

```scss
.grid {
  ...

  &:has(> :nth-child(3)):not(:has(> :nth-child(4))) {
    > :nth-child(3) {
      grid-column: span 2;
    }
  }
}
```

So we’re not going to change the 2-column grid, we’ll leave that alone from **two**. And now we’re not selecting the grid itself, but just grabbing that third item and stretching it across both columns of the grid.

---

## Four

We can… do nothing. It’s already a two-column grid from **two**. So let’s let it be.

---

## Five+

This is the fun part. We already know how to test for X+ children, so we do that:

```scss
.grid {
  ...

  &:has(:nth-child(5)) {
    grid-template-columns: unset;
  }
}
```

But now we’re `unset`ing those columns, as we don’t need them anymore. Instead we’re going with automatic column creation in the column direction. We could use flexbox here too essentially but we’re already in a grid and grid can do it with easy sturdy columns so might as well. Then we’ll slap smooth scrolling and scroll snapping on there, which will essentially be the fallback behavior (only Chrome supports the `::scroll-button` stuff that makes it carousel-like for now).

```scss
.grid {
  ...

  &:has(:nth-child(5)) {
    grid-template-columns: unset;

    grid-auto-flow: column;
    grid-auto-columns: 200px;

    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    > div {
      scroll-snap-align: center;
    }
  }
}
```

---

## Actually Carouselling

We’re all set up for it, we just need those back/forward buttons to make it really be a carousel. That’s a CSS thing now, at least in Chrome ‘n’ friends, so we can progressively enhance into it:

```scss :collapsed-lines
.grid {
  ...

  &:has(:nth-child(5)) {
    ...

    anchor-name: --⚓️-carousel;

    &::scroll-button(*) {
      position: absolute;
      top: 0;
      left: 0;
      position-anchor: --⚓️-carousel;
      background: none;
      border: 0;
      padding: 0;
      font-size: 32px;
    }

    &::scroll-button(right) {
      position-area: center inline-end;
      translate: -3rem -0.5rem;
      content: "➡️" / "Next";
    }

    &::scroll-button(left) {
      position-area: inline-start center;
      translate: 3rem -0.5rem;
      content: "⬅️" / "Previous";
    }
  }
}
```

That’ll do it! [Here’s the demo (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/qEdJqdZ) and I’ll video it in case you’re not in Chrome.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Quantity Query Carousel",
  "desc": ":has() makes quantities queries both easier and more powerful. We can alter how a grid is laid out and where the children go. Or, we can just blast it into a carousel. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/quantity-query-carousel.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
