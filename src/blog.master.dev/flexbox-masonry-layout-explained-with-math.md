---
lang: en-US
title: "Flexbox Masonry Layout (Explained with Math)"
description: "Article(s) > Flexbox Masonry Layout (Explained with Math)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Flexbox Masonry Layout (Explained with Math)"
    - property: og:description
      content: "Flexbox Masonry Layout (Explained with Math)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/flexbox-masonry-layout-explained-with-math.html
prev: /programming/css/articles/README.md
date: 2026-03-17
isOriginal: false
author:
  - name: Ibrahim Bendebka
    url: https://blog.master.dev/author/ibrahimbendebka/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8929
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
  name="Flexbox Masonry Layout (Explained with Math)"
  desc="Flexbox has a very specific algorithm for determining how to deal with remaining (or lack of) space in a row. Let's use actual math to understand it then apply it to a masonry layout."
  url="https://blog.master.dev/flexbox-masonry-layout-explained-with-math/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8929"/>

We’re going to get into building a somewhat unusual layout. It’s going to be multiple rows of differently sized elements, each with a *known* aspect ratio (like images), which span the full and exact width of the container.

We’re going to do this with flexbox in CSS and have a deep and very mathematical look at how it works.

---

## How Does Flexbox Distribute Space?

It will be first useful to understand flexbox itself and how the different properties affect how the space is used.

```css
.container {
  display: flex;
}
```

### Flex Properties

Certain things go on the flex container itself.

```css
.container {
  display: flex;
  flex-direction: row; /* Default. Could be "column" */
  gap: 1rem; /* size of the space between items */
  flex-wrap: wrap; /* Allows items to wrap. Default is "nowrap" */
}
```

Some important properties get applied to the items inside the container. These are a bit trickier to understand and use.

```css
.container {
  /* ... */

  > .item {
     flex-basis: 100px; /* The size of the item before growing or shrinking happens. */
     flex-grow: 1; /* Factor that decides how much of the remaining space the item receives. */
     flex-shrink: 1; /* Factor that decides how much of the exceeding space the item loses. */
  }
}
```

### Assumptions and Simplifications

The full flexbox algorithm defined in [<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/css-flexbox-1/#resolve-flexible-lengths) is more complex than the model we’re about to get into. Layout is complicated! I want to focus specifically on *space distribution* here, so to keep things focused, were going to ignore a few aspects of flexbox layout for now.

The things we’re ignoring are:

- The `min-width` and `max-width` (or height, or the logical property equivalents) on items.
- The algorithm is described as a single distribution step, while the specification says it may redistribute when items reach size limits.
- We’re only considering a flex container with `flex-direction: row` and where the main axis is horizontal.

---

## Conceptual Model

The process for distributing space in the row works as follows.

### Initial Free Space

The first step is to determine how much space is available or unavailable in the row. The initial *free* space is the flex container width minus the sum of the `flex-basis` of all items in the row and minus the gaps between them.

### Positive Initial Free Space (Growing)

If the initial free space is *positive*, items *grow* to fill the container:

- If the sum of the `flex-grow` of all items in the row is less than 1, the free space is scaled by this sum. This means less of the total free space will be distributed, and items will not fill the container.
- The free space is distributed among items, proportional to their `flex-grow` values.

<CodePen
  link="https://codepen.io/editor/sb3nder/pen/019cd91c-d135-791e-adb4-12d6db9320ed"
  title="[Article] Flexbox flex-grow animation"
  :default-tab="['css','result']"
  :theme="dark"/>

### Negative Free Space (Shrinking)

If the initial free space is *negative*, items shrink to fit the container:

- If the sum of the `flex-shrink` of all items in the row is less than 1, the free space is scaled by this sum. This means less of the total free space will be distributed, and items will overflow the container.
- Each item has a scaled-flex-shrink, calculated as flex-shrink multiplied by flex-basis. This ensures smaller items aren’t reduced to zero before larger ones shrink noticeably.
- The negative free space is distributed among items, proportional to their **scaled `flex-shrink`** values. Items with larger scaled-flex-shrink receive more of the negative space and therefore shrink more.

<CodePen
  link="https://codepen.io/editor/sb3nder/pen/019cf1d3-0d44-7149-9dc1-441b88132efd"
  title="[Article] Flexbox flex-shrink animation"
  :default-tab="['css','result']"
  :theme="dark"/>

### What About Wrapping?

- Without wrapping, all items remain in a single row.
- With wrapping enabled, each row contains as many items as fit, including gaps. Items that don’t fit move to the next row. The grow or shrink distribution described above is **applied independently to each row.**

---

## Mathematical Model

Now let’s formalize what we described conceptually, in mathematical terms. We first define the variables:

$$
\begin{align*}
w_i&\text{final width of item } i\\
FB_i&\text{flex-basis of item } i\\
FG_i&\text{flex-grow of item } i\\
FSH_i&\text{flex-shrink of item } i\\
IFS&\text{initial free space}\\
n&\text{number of items in a row}
\end{align*}
$$

Initial free space is:

$$
IFS=\text{Container Width}-\sum_{i=1}^{n}FB_i–\text{Gap Width}\cdot(n–1)
$$

If initial free space is positive, the item width is:

$$
w_i=FB_i+IFS\cdot\frac{FG_i}{\sum_{k=1}^{n}FG_k}\cdot\min\left(1,\sum_{k=1}^{n}FG_k\right)
$$

If initial free space is negative, the item width is:

$$
w_i=FB_i+IFS\cdot\frac{FSH_i\cdot{FB_i}}{\sum_{k=1}^{n}FSH_k\cdot{FB_k}}\cdot \min\left(1,\sum_{k=1}^{n}FSH_k\\right)
$$

### Again, what about Wrapping?

Without wrapping, *n* is just the number of items. With wrapping enabled, the number of items in a row is the maximum *n* such that:

$$
\sum_{i=1}^{n}FB_i+\text{Gap Width}\cdot(n–1)\leq\text{Container Width}
$$

And that’s a wrap! Now we can more or less grasp how flexbox actually works.

---

## The Masonry Layout

Now that we know how flexbox works, we can come back to our objective: a layout consisting of items, each with a known aspect ratio, disposed in rows, with items in the same row sharing the same height, and each row spanning the full width of the container.

### Layout Constraints

#### A. Each item having an aspect ratio:

$$
AR_i=\frac{w_i}{h_i}
$$

Which can be rewritten as:

$$
\begin{align*}
w_i=AR_i\cdo{h_i}&\text{or}&h_i=\frac{w_i}{AR_i}
\end{align*}
$$

#### B. Each row spanning the full width of the container:

$$
\sum_{i=1}^{n}w_i=\text{Container Width}
$$

#### C. Each item in the same row sharing the same height:

$$
\begin{align*}
h_i=H&\text{for every }i
\end{align*}
$$

Combining the constraints — plug C into A:

$$
w_i=AR_i\cdot{H}
$$

Plug the above into B:

$$
\sum_{i=1}^{n}AR_i\cdot{H}=\text{Container Width}
$$

$H$ can be taken outside the summation:

$$
H\cdot\sum_{i=1}^{n}AR_i=\text{Container Width}
$$

Divide by:

$$
\sum_{i=1}^{n}AR_i
$$

$$
H=\frac{Container Width}{\sum_{i=1}^{n}AR_i}
$$

Voilà, this last expression tells us that an $H$ always exists such that it respects the layout constraints.

### Plugging the Constraints into the Flexbox Model

#### A. Because each item has an aspect ratio:

$$
h_i=\frac{w_i}{AR_i}
$$

#### B. For each row to span the full width of the container we need:

$$
\begin{align*}
\min\left(1,\sum_{j=1}^{n}FG_j\right)=1&\text{and}\\
\min\left(1,\sum_{j=1}^{n}FSH_j\right)=1
\end{align*}
$$

We can guarantee that by putting:

$$
\begin{align*}
FG_i\geq{1}&\text{and}&{FSH_i}\geq{1}&\text{for every }\:i
\end{align*}
$$

We use the first two constraints: apply B to the flexbox item final widths and plug that into A.

$$
\begin{align*}
h_i=\frac{FB_i}{AR_i}+IFS\cdot\frac{FG_i}{AR_i\cdot\sum_{k=1}^{n}FG_k}&\text{and}\\
h_i=\frac{FB_i}{AR_i}+IFS\cdot\frac{FSH_i\cdot{FB_i}}{AR_i\cdot\sum_{k=1}^{n}FSH_k \cdot{FB_k}}
\end{align*}
$$

Now only the last constraint remains, each item in the same row sharing the same height.

The approach here will be to try to make each term constant independently of the item.

$$
\frac{FB_i}{AR_i}
$$

That is the first term. We can put $FB_i$ equal to $AR_i$ so it simplifies with the denominator. Additionally, we can multiply it by a constant $\alpha$:

$$
FB_i=AR_i\cdot\alpha
$$

Plug the just-defined $FB_i$ into the first term:

$$
\frac{AR_i\cdot\alpha}{AR_i}=\alpha
$$

Because $FB_i$ is the width of the item before growing and shrinking happens, and because $w_i=AR_i\cdot{h_i}$ (from constraint $A$), we can see that $\alpha$ is the height of the item before growing and shrinking happens. And because it is the same for every item, we can conclude that for our layout to work, all the items must start at the same height.

Rename $\alpha$ to $CB$ (cross-basis) so:

$$
FB_i=AR_i\cdot{CB}
$$

$IFS$ is the second term. If we think about it or look back at its expression, we can see that it’s already constant for items in a row.

After plugging the just defined $FB_i$ into the third term, it becomes:

$$
\begin{align*}
\frac{FG_i}{AR_i\cdot\sum_{k=1}^{n}FG_k}&\text{ or }\\
\frac{FSH_i\cdot{AR_i}\cdot{CB}}{AR_i\cdot\sum_{k=1}^{n}FSH_k\cdot{AR_k}\cdot{CB}}=\frac{FSH_i}{\sum_{k=1}^{n}FSH_k\cdot{AR_k}}&(\text{ for }CB>0)
\end{align*}
$$

Depending on if $IFS$ is positive or negative respectively.

For positive $FB_i$, we can put $FG_i$ equal to $AR_i\cdot\beta$, with $\beta$ being a constant of choice.

$$
FG_i=AR_i\cdot\beta
$$

Plug the just defined $FG_i$ into the third term:

$$
\begin{align*}
\frac{AR_i\cdot\beta}{AR_i\cdot\sum_{k=1}^{n}AR_k\cdot\beta}=\\frac{1}{\sum_{k=1}^{n}AR_k}
\end{align*}
$$

We can see that $\beta$ simplify away, and only remains 1 divided by the sum of aspect ratio, which is constant.

In constraint B we put $FG_i\geq{1}$, that now translates to choosing a $\beta$ big enough such that $AR_i\cdot\beta\geq{1}$ for every item.

For negative $IFS$, we can push $FSH_i=1$ so it’s constant and respects constraint B ($FSH_i\geq{1}$).

The third term becomes:

$$
\frac{1}{\sum_{k=1}^{n}AR_k}
$$

---

## Results

That’s it! We found some simple enough solutions. So to keep going here, for both positive and negative $IFS$:

$$
\begin{align*}
h_i&=H=CB+\frac{IFS}{\sum_{k=1}^{n}AR_k}\\
w_i&=FB_i+IFS\cdot\frac{AR_i}{\sum_{k=1}^{n}AR_k}\\
FG_i&=AR_i\cdot\beta&\text{such that}&FG_i\geq{1}\text{ for every } i\\
FSH_i&=1
FB_i=&AR_i\cdot{CB}
\end{align*}
$$

$CB$ is a constant of choice, representing the cross-basis, meaning the height of the item before growing or shrinking happens.

### The Intuition

All items start at the same height thanks to `flex-basis`.

When `flex-grow` is tied to an items aspect ratio, wider items expand more in width than narrower ones. On the flip side, with `flex-shrink` set to 1, items shrink in proportion to their width, so wider items lose more space than narrow ones.

Even though widths change at different rates, the height of all items changes evenly.

**The result is that no matter the aspect ratio of the items, they end up the same height.**

---

## Demos

No wrapping:

<CodePen
  link="https://codepen.io/editor/sb3nder/pen/019cd8bf-ab8d-7e9f-9902-90f7a7c3f22a"
  title="[Article] Masonry Flexbox nowrap"
  :default-tab="['css','result']"
  :theme="dark"/>

With wrapping:

<CodePen
  link="https://codepen.io/editor/sb3nder/pen/019cd8fb-89d2-7572-9f54-aa1a3fa12758"
  title="[Article] Masonry Flexbox wrap"
  :default-tab="['css','result']"
  :theme="dark"/>

With limits:

<CodePen
  link="https://codepen.io/editor/sb3nder/pen/019cd903-7dc0-7225-bccc-91c0cf330740"
  title="[Article] Masonry Flexbox wrap minmax"
  :default-tab="['css','result']"
  :theme="dark"/>

With images:

<CodePen
  user="anon"
  slug-hash="eYqavaP"
  title="CSS Horizontal Masonry layout"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Flexbox Masonry Layout (Explained with Math)",
  "desc": "Flexbox has a very specific algorithm for determining how to deal with remaining (or lack of) space in a row. Let's use actual math to understand it then apply it to a masonry layout.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/flexbox-masonry-layout-explained-with-math.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
