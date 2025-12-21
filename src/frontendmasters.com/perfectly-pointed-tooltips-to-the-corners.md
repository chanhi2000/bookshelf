---
lang: en-US
title: "Perfectly Pointed Tooltips: To The Corners"
description: "Article(s) > Perfectly Pointed Tooltips: To The Corners"
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
      content: "Article(s) > Perfectly Pointed Tooltips: To The Corners"
    - property: og:description
      content: "Perfectly Pointed Tooltips: To The Corners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/perfectly-pointed-tooltips-to-the-corners.html
prev: /programming/css/articles/README.md
date: 2025-11-10
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7714
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
  name="Perfectly Pointed Tooltips: To The Corners"
  desc="With our foundation in positioning and flipping tooltips with anchors, and making pointer tails, we're going to get extra tricky and point them diagonally."
  url="https://frontendmasters.com/blog/perfectly-pointed-tooltips-to-the-corners/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7714"/>

Ready for the last challenge?

We are still creating tooltips that follow their anchors, and this time we will work with new positions and learn new tricks. I will assume you have read and understood the first two parts, as I will skip the things I already explained there. Fair warning, if you haven’t read those first two you might get a little lost.

::: info Article Series

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: A Foundation",
  "desc": "The Anchor Positioning API in CSS is very powerful. This is the beginning of a series where we understand it through the perfect use-case: tooltips.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-a-foundation.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: All Four Sides",
  "desc": "Tooltips are a natural fit for the abilities of Anchor Positioning, which can help place them on *any* side or corner. It does make dealing with the pointer extra tricky though.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-all-four-sides.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: To The Corners",
  "desc": "With our foundation in positioning and flipping tooltips with anchors, and making pointer tails, we're going to get extra tricky and point them diagonally.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-to-the-corners.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

::: note

At the time of writing, only Chrome and Edge have full support of the features we will be using.

:::

As usual, a demo of what we are making:

<CodePen
  user="t_afif"
  slug-hash="yyepRJM"
  title="Follow me if you can! (drag the anchor)"
  :default-tab="['css','result']"
  :theme="dark"/>

This time, instead of considering the sides, I am considering the *corners*. This is another common pattern in the tooltip world. The code structure and the initial configuration remain the same as in the previous examples, so let’s jump straight into the new stuff.

---

## Defining The Positions

If you took the time to explore [**my interactive demo**](/css-tip.com/position-area.md), you already know the position we will start with:

```css
position-area: top left;
```

The other positions will logically be `top right`, `bottom left`, and `bottom right`. We already learned that defining explicit positions is not the ideal choice, so let’s flip!

The flipped values are:

```css
position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline;
```

<CodePen
  user="t_afif"
  slug-hash="qEbMJaB"
  title="Initial configuration"
  :default-tab="['css','result']"
  :theme="dark"/>

The advantage of this configuration is that we are not using `flip-start`, so we can safely define `min-width` (or `max-height`) without issue. The drawback is that adding the tail is complex. It needs to be placed on the corners, and the `margin` trick won’t work. We need another hack.

Notice how I am using `margin` instead of `inset` to control the gap between the tooltip and the anchor. Both are correct, but you will see later why `margin` is slightly better in my use case.

---

## Adding The Tail

In the previous examples, the logic is to draw a shape with all the tails, then hide the non-needed parts. The tail has the same color as the tooltip and is placed behind its content, so we can only see what is outside the boundary of the tooltip.

This time, I will use a slightly different idea. I am still drawing a shape with all the tails, but the hiding technique will be different.

First, we place the pseudo-element of the tooltip above the anchor. Not on the top of it, but both will overlap each other.

```css
#tooltip::before {
  content: "";
  position: fixed;
  position-anchor: --anchor;
  position-area: center;
  width:  anchor-size(width);
  height: anchor-size(height);
}
```

I am using a fixed position to be able to “see” the anchor (we talked about this quirk in the first article). Then, I place the element in the center area, which means *above* the anchor element (or *below* it depending on the z-index).

I am introducing a new function, `anchor-size()`, which is part of the Anchor Positioning API. We saw the `anchor()` function, which allows us to query the position from an anchor element. `anchor-size()`does the same but with the sizes. I am using it to make the pseudo-element have the same size as the anchor. It’s like using `width: 100%` where 100% refers to the anchor.

<CodePen
  user="t_afif"
  slug-hash="GgoXYEm"
  title="adding pseudo-element"
  :default-tab="['css','result']"
  :theme="dark"/>

Nothing fancy so far. We have a square behind the anchor.

Let’s increase the size a little so it also touches the tooltip. We add twice the gap defined by the variable `--d` plus the value of `--s`, which controls both the radius and the size of the tooltip.

```css
#tooltip {
  --d: .5em; /* distance between anchor and tooltip */
  --s: .8em; /* tail size & border-radius */ 
}

#tooltip:before {
  width:  calc(anchor-size(width) +  2*(var(--d) + var(--s)));
  height: calc(anchor-size(height) + 2*(var(--d) + var(--s)));
}
```

<CodePen
  user="t_afif"
  slug-hash="azdaREb"
  title="increasing the size"
  :default-tab="['css','result']"
  :theme="dark"/>

It seems we are going nowhere with this idea but, believe me, we are almost there.

Now we sculpt the pseudo-element to have the shape of a tail on each corner, like illustrated below:

![Illustration showing a blue square transitioning into a tooltip design with four symmetrical tails around a centered anchor icon.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/1NKKeR9u.png?resize=703%2C290&ssl=1)

I am using a somewhat verbose `clip-path` value to create the final shape but the method used is not particularly important. You can consider gradients, SVG background, the new `shape()` function, etc. Perhaps you would also like to have a different design for the tails. The main idea is to have four tails around the anchor.

<CodePen
  user="t_afif"
  slug-hash="qEbMJyZ"
  title="shaping the tail"
  :default-tab="['css','result']"
  :theme="dark"/>

Do you start to see the tricks? We have the correct position for the tails (you can drag the anchor and see the result), but we still have to hide the extra ones.

All we need is to add one line of code to the tooltip:

```css
clip-path: inset(0) margin-box;
```

I know it’s not very intuitive but the explanation is fairly simple. Even if the pseudo-element is using a fixed position and has lost its relation with the tooltip, it remains part of its content, so clipping the tooltip will also affect the pseudo-element.

In our case, the clip-path will consider the margin box as its reference to create a basic rectangle using `inset(0)` that will show only what is inside it. In other words, anything outside the margin area is hidden.

Toggle the “debug mode” in the demo below and you will see a black rectangle that illustrates the clip-path area.

<CodePen
  user="t_afif"
  slug-hash="yyepRJM"
  title="Follow me if you can! (drag the anchor)"
  :default-tab="['css','result']"
  :theme="dark"/>

Only one tail can fit that rectangle, which is perfect for us!

::: note

This trick sounds cool! Can’t we apply it to the previous demo as well?

:::

We can! This series of articles could have been one article detailing this trick that I apply to the three examples, but I wanted to explore different ideas and, more importantly, learn about anchor positioning through many examples. Plus, it’s always good to have various methods to achieve the same result.

What about trying to redo the previous example using this technique? Take it as homework to practice what you have learned through this series. You will find my implementation in the next section.

---

## More Examples

Let’s start with the previous demos using the new technique. As usual, you have the debug mode to see what’s going on behind the scenes.

<CodePen
  user="t_afif"
  slug-hash="XJXPywg"
  title="Redoing 1st example"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="t_afif"
  slug-hash="WbrgLvr"
  title="Redoing 2nd example"
  :default-tab="['css','result']"
  :theme="dark"/>

I will conclude with one final example for you to study. You can also try to implement it before checking my code if you want another challenge.

<CodePen
  user="t_afif"
  slug-hash="QwyZLzZ"
  title="Another example"
  :default-tab="['css','result']"
  :theme="dark"/>

And a version with a curved tail:

<CodePen
  user="t_afif"
  slug-hash="KwVGwom"
  title="Another example (with curve)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

I hope you enjoyed this article series. Our goal was to leverage modern CSS to create common tooltip patterns, while also exploring the powerful Anchor Positioning API. It’s one of those modern features that introduce new mechanisms into the CSS world. We are far from the era where we simply define properties and see a static result. Now we can link different elements across the page, create conditional positioning, define a dynamic behavior that adjusts to each situation, and more!

This feature is only at its [<VPIcon icon="iconfont icon-w3c"/>Level 1](https://w3.org/TR/css-anchor-position-1/). The Level 2 will introduce even more ideas, one of which is the ability [<VPIcon icon="fa-brands fa-chrome"/>to query the fallback positions](https://developer.chrome.com/blog/anchored-container-queries?hl=en) and apply a custom CSS. Here is one of the previous demos using this future technique:

<CodePen
  user="t_afif"
  slug-hash="ogbPrWG"
  title="Using anchor queries"
  :default-tab="['css','result']"
  :theme="dark"/>

The code is probably more verbose, but it feels less hacky and more intuitive. I let you imagine all the possibilities you can do with this technique.

::: info Article Series

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: A Foundation",
  "desc": "The Anchor Positioning API in CSS is very powerful. This is the beginning of a series where we understand it through the perfect use-case: tooltips.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-a-foundation.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: All Four Sides",
  "desc": "Tooltips are a natural fit for the abilities of Anchor Positioning, which can help place them on *any* side or corner. It does make dealing with the pointer extra tricky though.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-all-four-sides.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: To The Corners",
  "desc": "With our foundation in positioning and flipping tooltips with anchors, and making pointer tails, we're going to get extra tricky and point them diagonally.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-to-the-corners.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Perfectly Pointed Tooltips: To The Corners",
  "desc": "With our foundation in positioning and flipping tooltips with anchors, and making pointer tails, we're going to get extra tricky and point them diagonally.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/perfectly-pointed-tooltips-to-the-corners.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
