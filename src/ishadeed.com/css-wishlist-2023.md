---
lang: en-US
title: "My CSS Wishlist"
description: "Article(s) > My CSS Wishlist"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - ishadeed.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > My CSS Wishlist"
    - property: og:description
      content: "My CSS Wishlist"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/ishadeed.com/css-wishlist-2023.html
prev: /programming/css/articles/README.md
date: 2023-02-09
isOriginal: false
author:
  - name: Ahmed Shadeed
    url : https://ishadeed.com/about/
cover: https://ishadeed.com/assets/css-wishlist-2023/twitter-card.jpg
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
  name="My CSS Wishlist"
  desc="A few CSS features I wish to have."
  url="https://ishadeed.com/article/css-wishlist-2023/"
  logo="https://ishadeed.com/assets/favicon-32x32.png"
  preview="https://ishadeed.com/assets/css-wishlist-2023/twitter-card.jpg"/>

I like it when people share what they wish for CSS. In the last few weeks, I read two awesome wishlists by [<VPIcon icon="fas fa-globe"/>Dave Rupert](https://daverupert.com/2023/01/css-wishlist-2023/) and [<VPIcon icon="fas fa-globe"/>Eric Meyer](https://meyerweb.com/eric/thoughts/2023/02/08/css-wish-list-2023/). In 2022, we got many new CSS features, my favorite of them are container queries, CSS `:has`, and subgrid.

I thought about brain-dumping all the things that I want CSS to have one day.

---

## Flex wrapping detection

When I use `flex-wrap: wrap`, sometimes I wish there is a way to detect if the flex items are wrapped into a new line.

For example, say I have a section header that contains a title and a link. We can make this little component responsive with `flex-wrap: wrap`. The cherry on top will be to **know when the items wrap into a new line**.

I might need to add switch the position of a visual effect. For example, a border that is on the bottom by default, and is on the left when the times are wrapped.

```css
.section-header {
  display: flex;
  flex-wrap: wrap;
}
```

![](https://ishadeed.com/assets/css-wishlist-2023/css-wishlist-flex-wrap-detect-1.png)

Currently, we can’t detect when the items are wrapped. The only way is by using media queries to do the changes we want.

I wish we can have something like this:

```css
.section-header {
  container-type: style flex-wrap;
  display: flex;
  flex-wrap: wrap;
}

@container style(wrap) {
  /* do the things you should do when the flex items are wrapped. */
}
```

The above isn’t the best readable CSS syntax, but you get the idea.

---

## Flexbox `gap` support

Currently, there is no way to test if `gap` is supported when used with a flexbox container.

I haven’t dinged into the reason(s) but it’s a bummer. I want to check with `@supports`, just like this:

```css
@supports (gap: 10px) {
  .element {
    display: flex;
    gap: 10px;
  }
}
```

The above doesn’t work now.

---

## Logical CSS gradients

CSS logical properties are great for building multilingual websites. Since Arabic is my native language, I build lots of right-to-left experience, and each time I use logical properties, I wish we have them in gradients.

![](https://ishadeed.com/assets/css-wishlist-2023/css-wishlist-gradient-start-end.png)

Can we get that, please?

```css
.hero {
  background-image: linear-gradient(to inline-end, #000, transparent);
}
```

---

## Detect when `sticky` is active

I can think of a simple usage where I want to know when `position: sticky` is active. In other words, when an item is stuck.

```css
.site-header {
  position: sticky;
  top: 0;
}

.site-header:sticky {
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
}
```

![](https://ishadeed.com/assets/css-wishlist-2023/css-wishlist-sticky.png)

---

## Easing gradients

Let’s face that, CSS gradients on their own don’t look smooth. Each time I use one, I have to modify it to have a bit of easing.

![](https://ishadeed.com/assets/css-wishlist-2023/css-wishlist-easing-gradient.png)

I rely on this [<VPIcon icon="fas fa-globe"/>great tool](https://larsenwork.com/easing-gradients/) to generate eased gradients.

```css
.hero {
  linear-gradient(to bottom, #304365, ease-in-out, transparent);
};
```

The easing syntax is currently a [CSSWG proposal (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/1332), but no browser picked it up yet.

---

## Animate text-decoration

I wish that we have a way to animate link underlines without using CSS background or pseudo-elements.

Why not have something like `text-decoration-size`?

```css
a {
  text-decoration-size: 0%;
  transition: text-decoration-size 0.3s;
}

a:hover {
  text-decoration-size: 100%;
}
```

---

## Leading trim

One of the challenges when working with some typefaces is having a different leading value which might result in inconsistent spacing before and after a font.

![](https://ishadeed.com/assets/css-wishlist-2023/css-wishlist-leading-trim.png)

Currently, there is a hack that I [**wrote about**](/ishadeed.com/button-label-alignment.md), which is to use a pseudo-element and vertically align it.

```css
.button:before {
  content: "";
  display: inline-block;
  height: 16px;
  vertical-align: middle;
}
```

What’s better is to use `leading-trim`, a suggested CSS property that didn’t see the light till today.

```css
.button {
  leading-trim: both;
}
```

Here is [the article (<VPIcon icon="fa-brands fa-medium" />`microsoft-design`)](https://medium.com/microsoft-design/leading-trim-the-future-of-digital-typesetting-d082d84b202) that I remember about leading-trim.

---

## Force Overscroll behavior

Currently, we can prevent [**scroll chaining**](/ishadeed.com/prevent-scroll-chaining-overscroll-behavior.md) by using `overscroll-behavoir: contain`. Imagine having a modal, and when scrolling, the body element will scroll too.

![](https://ishadeed.com/assets/css-wishlist-2023/overscroll-behaviour-contain.jpg)

This is supported now, but one thing I don’t like about it is that it won’t work if the element has short content.

That’s it. What are the CSS features that you wish to have today?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "My CSS Wishlist",
  "desc": "A few CSS features I wish to have.",
  "link": "https://chanhi2000.github.io/bookshelf/ishadeed.com/css-wishlist-2023.html",
  "logo": "https://ishadeed.com/assets/favicon-32x32.png",
  "background": "rgba(129,38,197,0.2)"
}
```
