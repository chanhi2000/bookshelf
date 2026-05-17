---
lang: en-US
title: "Callout UI with CSS Offset & Border"
description: "Article(s) > Callout UI with CSS Offset & Border"
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
      content: "Article(s) > Callout UI with CSS Offset & Border"
    - property: og:description
      content: "Callout UI with CSS Offset & Border"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/callout-ui-with-css-offset-border.html
prev: /programming/css/articles/README.md
date: 2026-05-13
isOriginal: false
author:
  - name: Preethi Sam
    url: https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9632
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
  name="Callout UI with CSS Offset & Border"
  desc="We look at designing callout UI elements using CSS, incorporating leader lines and text boxes. It details setting up the HTML structure, utilizing CSS properties like offset-path and borders."
  url="https://frontendmasters.com/blog/callout-ui-with-css-offset-border/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9632"/>

A callout UI typically has a leader line (or “tail”) with a text box at one end. It is often used as a visual highlight and to add annotations in a casual layout. Let’s look at one way to design a callout like this using CSS `offset` and borders.

<CodePen
  user="anon"
  slug-hash="yyaQEKx"
  title="Callouts"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Layout

The HTML layout consists of an element that represents the callout, inside which is another element that’ll carry the text.

```html
<div class="callout">
  <div class="callout-text"><!-- text --></div>
</div>
```

```css
.callout {
  container-type: size;
}
```

The outer element, `.callout`, is established as a *query container* that tracks both its horizontal and vertical sizes (that’s what the value `size` does as opposed to `inline-size`). This later gives us the dimensions needed to place the text boxes at the desired positions over `.callout`. The element will also receive borders later on to create the leader lines.

---

## The Text Box Offset

```css
.callout-text {
  offset-path: border-box;
  offset-anchor: bottom;
}
```

The text boxes (`.callout-text`) are to be placed along the border reference box of `.callout`. The text box’s bottom-center (center is default) is the point that attaches to the `.callout`’s border.

The `offset-path` CSS property defines a track that an element can be placed on and animated along. The `offset-anchor` CSS property defines a point in that element that connects to the path.

```css
.callout-text {
  offset-path: border-box;
  offset-anchor: bottom;
  offset-distance: 100cqw;
  /* shorthand would be: 
     offset: border-box 100cqw 0deg/bottom; */
}
```

If the leader line needs to extend from below the text box and towards the left, the text box needs to be at the opposite corner (the top right) of `.callout`, which is the distance of the entire callout width: `100cqw`.

---

## The Leader Line

With the text box positioned, we now add a leader line. This is done by setting the right and bottom borders for `.callout`.

```css
.callout {
  container-type: size;
  border: dashed;
  border-width: 0 2px 2px 0; 
}
```

<CodePen
  user="anon"
  slug-hash="jEVqwgz"
  title="Callout"
  :default-tab="['css','result']"
  :theme="dark"/>

A standard callout is ready, but let’s tweak it a little more!

---

## The Designs

One advantage of positioning text boxes using offset is that **the text box is now** **attached to the callout’s border**. If the border moves in any way, the text box moves along with it.

To make the leader line slanted, we add skew to `.callout`. To counter the effect of skew on the text box, it receives the same skew but in the opposite direction.

```css
.callout {
  /* etc. */
  --ang: 20deg;
  transform: skewX(calc(-1 * var(--ang)));
}
.callout-text {
  /* etc. */
  transform: skewX(var(--ang));
}
```

<CodePen
  user="anon"
  slug-hash="raWewQq"
  title="Callout 1"
  :default-tab="['css','result']"
  :theme="dark"/>

Box shadows can also be used to provide leader lines.

```css
.callout {
  /* etc. */
  box-shadow: 1px -1px 0 1px maroon, 
              2px -2px 0 2px pink, 
              3px -3px 0 3px deeppink;
}
```

<CodePen
  user="anon"
  slug-hash="azBNwQM"
  title="Callout 2"
  :default-tab="['css','result']"
  :theme="dark"/>

We can also take advantage of `border-radius` and `corner-shape` to affect the leader line’s shape.

::: note

The `corner-shape` fallback is the default rounded border.

:::

```css
.callout {
  /* etc. */
  border-bottom-right-radius: 30px;
  corner-shape: notch;
}
```

<CodePen
  user="anon"
  slug-hash="dPOMRwy"
  title="Callout 3"
  :default-tab="['css','result']"
  :theme="dark"/>

This can all be animated, too.

```css
.callout {
  /* etc. */
  --ang: 20deg;
  transform: scaleY(0);
  transform-origin: bottom left;
}
.callout-text {
  /* etc. */
  transform: scale(0);
  transform-origin: bottom center;
}
p:hover + .callout {
  transform: skewX(calc(-1 * var(--ang))) scaleY(1);
  transition: transform 0.3s;
}
p:hover + .callout > .callout-text {
  transform: scale(1) skewX(var(--ang));
  transition: 0.3s transform 0.3s;
}
```

First, the `.callout` scales up vertically, followed by the `.callout-text` scaling up in both axes.

<CodePen
  user="anon"
  slug-hash="raWewoq"
  title="Callout animation"
  :default-tab="['css','result']"
  :theme="dark"/>

The design variants can be many, arising from different combinations of these. In a nutshell, we use borders and shadows for the leader line’s type and color; use sizing, transforms, `border-radius`, etc., to change the line’s size and shape. Then style the text box as we would any element showcasing text.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Callout UI with CSS Offset & Border",
  "desc": "We look at designing callout UI elements using CSS, incorporating leader lines and text boxes. It details setting up the HTML structure, utilizing CSS properties like offset-path and borders.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/callout-ui-with-css-offset-border.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
