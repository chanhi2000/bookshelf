---
lang: en-US
title: "Making a Masonry Layout That Works Today"
description: "Article(s) > Making a Masonry Layout That Works Today"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Making a Masonry Layout That Works Today"
    - property: og:description
      content: "Making a Masonry Layout That Works Today"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/making-a-masonry-layout-that-works-today.html
prev: /programming/css/articles/README.md
date: 2025-07-28
isOriginal: false
author:
  - name: Zell Liew
    url : https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/11/masonry.jpg
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

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Making a Masonry Layout That Works Today"
  desc="I went on to figure out how make masonry work today with other browsers. I'm happy to report I've found a way — and, bonus! — that support can be provided with only 66 lines of JavaScript."
  url="https://css-tricks.com/making-a-masonry-layout-that-works-today"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/11/masonry.jpg"/>

Many CSS experts have weighed heavily on possible syntaxes for a new masonry layout feature last year. There were [**two main camps**](/css-tricks.com/css-masonry-css-grid.md) and a [<FontIcon icon="iconfont icon-webkit"/>third camp](https://webkit.org/blog/16587/item-flow-part-1-a-new-unified-concept-for-layout/) that strikes a balance between the two:

1. Use `display: masonry`
2. Use `grid-template-rows: masonry`
3. Use `item-pack: collapse`

I don’t think they’ve came up with a resolution [<FontIcon icon="fa-brands fa-chrome"/>yet](https://developer.chrome.com/blog/masonry-syntax). But you might want to know that [**Firefox already supports the masonry layout**](/css-tricks.com/native-css-masonry-layout-in-css-grid.md) with the second syntax. And [<FontIcon icon="fa-brands fa-chrome"/>Chrome is testing it](https://developer.chrome.com/blog/masonry-update?hl=en) with the first syntax. While it’s cool to see native support for CSS Masonry evolving, we can’t really use it in production if other browsers don’t support the same implementation…

So, instead of adding my voice to one of those camps, I went on to figure out **how make masonry work today with other browsers**. I’m happy to report I’ve found a way — and, bonus! — that support can be provided **with only 66 lines of JavaScript**.

In this article, I’m gonna show you how it works. But first, here’s a demo for you to play with, just to prove that I’m not spewing nonsense. Note that there’s gonna be a slight delay since we’re waiting for an image to load first. If you’re placing a masonry at the top fold, consider skipping including images because of this!

Anyway, here’s the demo:

CodePen Embed Fallback
https://codepen.io/zellwk/pen/QWoQwEy
Masonry Layout with CSS Grid

---

## What in the magic is this?!

Now, there are **a ton of things** I’ve included in this demo, even though there are only 66 lines of JavaScript:

- You can define the masonry with any number of columns.
- Each item can span multiple columns.
- We wait for media to load before calculating the size of each item.
- We made it responsive by listening to changes with the [**`ResizeObserver`**](/css-tricks.com/a-better-api-for-the-resize-observer.md).

These make my implementation incredibly robust and ready for production use, while also way more flexible than many [**Flexbox masonry knockoffs**](/css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout.md) out there on the interwebs.

::: tip Now, a hot tip

If you combine this with Tailwind’s responsive variants and arbitrary values, you can include [<FontIcon icon="fas fa-globe"/>even more flexibility](https://splendidlabz.com/docs/layouts/macro-layouts/masonry/) into this masonry grid without writing more CSS.

:::

Okay, before you get hyped up any further, let’s come back to the main question: How the heck does this work?

---

## Let’s start with a polyfill

Firefox already supports masonry layouts via the second camp’s syntax. Here’s the CSS you need to create a CSS masonry grid layout in Firefox.

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(var(--item-width, 200px), 100%), 1fr)
  );
  grid-template-rows: masonry;
  grid-auto-flow: dense; /* Optional, but recommended */
}
```

Since Firefox already has native masonry support, naturally we shouldn’t mess around with it. The best way to check if masonry is supported by default is to check if `grid-template-rows` can hold the `masonry` value.

```js
function isMasonrySupported(container) {
  return getComputedStyle(container).gridTemplateRows === 'masonry'
}
```

If masonry is supported, we’ll skip our implementation. Otherwise, we’ll do something about it.

```js
const containers = document.querySelectorAll('.masonry')

containers.forEach(async container => {
  if (isMasonrySupported(container)) return
})
```

---

## Masonry layout made simple

Now, I want to preface this segment that I’m not the one who invented this technique.

I figured out this technique when I was digging through the web, searching for possible ways to implement a masonry grid today. So kudos goes to the unknown developer who developed the idea first — and perhaps me for understanding, converting, and using it.

The technique goes like this:

1. We set `grid-auto-rows` to `0px`.
2. Then we set `row-gap` to `1px`.
3. Then we get the item’s height through `getBoundingClientRect`.
4. We then size the item’s “row allocation” by adding the `height` the `column-gap` value together.

This is *really* unintuitive if you’ve been using CSS Grid the standard way. But once you get this, you can also grasp how this works!

Now, because this is so unintuitive, we’re gonna take things step-by-step so you see how this whole thing evolves into the final output.

---

## Step by step

First, we set `grid-auto-rows` to `0px`. This is whacky because every grid item will effectively have “zero height”. Yet, at the same time, CSS Grid maintains the order of the columns and rows!

```js
containers.forEach(async container => {
  // ...
  container.style.gridAutoRows = '0px'
})
```

![Three columns over overlapping stacked cards with white backgrounds, black rounded borders and randomly generated placeholder text.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/sbs-1.webp?resize=1508%2C796&ssl=1)

Second, we set `row-gap` to `1px`. Once we do this, you begin to notice an initial stacking of the rows, each one one pixel below the previous one.

```js{4}
containers.forEach(async container => {
  // ...
  container.style.gridAutoRows = '0px'
  container.style.setProperty('row-gap', '1px', 'important')
}) 
```

![Cards are still stacked and in three columns, but now they are more directly stacked on top of one another.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/sbs-2.webp?resize=750%2C398)

Third, assuming there are no images or other media elements in the grid items, we can easily get the height of each grid item with `getBoundingClientRect`.

We can then restore the “height” of the grid item in CSS Grid by substituting `grow-row-end` with the `height` value. This works because each `row-gap` is now `1px` tall.

When we do this, you can see the grid beginning to take shape. Each item is now (kinda) back at their respective positions:

```js
containers.forEach(async container => {
  // ...
  let items = container.children
  layout({ items })
})

function layout({ items }) {
  items.forEach(item => {
    const ib = item.getBoundingClientRect()
    item.style.gridRowEnd = `span ${Math.round(ib.height)}`
  })
}
```

![A masonry layout of cards that alternates between one and two columns.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/sbs-3.webp?resize=528%2C397)

We now need to restore the row gap between items. Thankfully, since masonry grids usually have the same `column-gap` and `row-gap` values, we can grab the desired row gap by reading `column-gap` values.

Once we do that, we add it to `grid-row-end` to expand the number of rows (the “height”) taken up by the item in the grid:

```js
containers.forEach(async container => {
  // ...
  const items = container.children
  const colGap = parseFloat(getComputedStyle(container).columnGap)
  layout({ items, colGap })
})

function layout({ items, colGap }) {
  items.forEach(item => {
    const ib = item.getBoundingClientRect()
    item.style.gridRowEnd = `span ${Math.round(ib.height + colGap)}`
  })
}
```

![A three-column masonry layout. Most items occupy one column but two elements stretch to take up two columns. the order flows from left to right.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/sbs-4.webp?resize=749%2C384)

And, just like that, we’ve made the masonry grid! Everything from here on is simply to make this ready for production.

---

## Waiting for media to load

Try adding an image to any grid item and you’ll notice that the grid breaks. That’s because the item’s height will be “wrong”.

![The first item in the masonry layout contains an image with text and sits behind other items in the first two columns.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/sbs-5.webp?resize=752%2C424)

It’s wrong because we took the `height` value before the image was properly loaded. The DOM doesn’t know the dimensions of the image yet. To fix this, we need to wait for the media to load before running the `layout` function.

We can do this with the following code (which I shall not explain since this is not much of a CSS trick 😅):

```js :collapsed-lines
containers.forEach(async container => {
  // ...
  try {
    await Promise.all([areImagesLoaded(container), areVideosLoaded(container)])
  } catch(e) {}

  // Run the layout function after images are loaded
  layout({ items, colGap })
})

// Checks if images are loaded
async function areImagesLoaded(container) {
  const images = Array.from(container.querySelectorAll('img'))
  const promises = images.map(img => {
    return new Promise((resolve, reject) => {
      if (img.complete) return resolve()
      img.onload = resolve
      img.onerror = reject
    })
  })
  return Promise.all(promises)
}

// Checks if videos are loaded
function areVideosLoaded(container) {
  const videos = Array.from(container.querySelectorAll('video'))
  const promises = videos.map(video => {
    return new Promise((resolve, reject) => {
      if (video.readyState === 4) return resolve()
      video.onloadedmetadata = resolve
      video.onerror = reject
    })
  })
  return Promise.all(promises)
}
```

*Voilà*, we have a CSS masnory grid that works with images and videos!

![A complete masonry layout with six items. The first and third items occupy the first two columns and items 2, 4, 5, and 6 flow into the third column,.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/sbs-6.webp?resize=752%2C515)

---

## Making it responsive

This is a simple step. We only need to use the [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to listen for any change in dimensions of the masonry grid container.

When there’s a change, we run the `layout` function again:

```js
containers.forEach(async container => {
// ...
const observer = new ResizeObserver(observerFn)
observer.observe(container)

function observerFn(entries) {
  for (const entry of entries) {
    layout({colGap, items})
  }
}
})
```

This demo uses the standard Resize Observer API. But you can make it simpler by using the refined `resizeObserver` function we built [**the other day**](/css-tricks.com/a-better-api-for-the-resize-observer.md).

```js
containers.forEach(async container => {
  // ...
  const observer = resizeObserver(container, {
    callback () {
      layout({colGap, items})
    }
  })
})
```

That’s pretty much it! You now have a robust masonry grid that you can use in every working browser that supports CSS Grid!

Exciting, isn’t it? This implementation is so simple to use!

---

## Masonry grid with Splendid Labz

If you’re not adverse to using code built by others, maybe you might want to consider [<FontIcon icon="fas fa-globe"/>grabbing the one I’ve built for you](https://splendidlabz.com/docs/layouts/macro-layouts/masonry/) in Splendid Labz.

To do that, install the helper library and add the necessary code:

```sh
# Installing the library
npm install @splendidlabz/styles
```

```css
/* Import all layouts code */
@import '@splendidlabz/layouts';
```

```js
// Use the masonry script
import { masonry } from '@splendidlabz/styles/scripts'
masonry()
```

::: note One last thing

I’ve been building a ton of tools to help **make web development much easier for you and me**. I’ve parked them all under the [<FontIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com/) brand — and one of these examples is this masonry grid I showed you today.

:::

If you love this, you might be interested in other [<FontIcon icon="fas fa-globe"/>layout utilities](https://splendidlabz.com/docs/layouts/) that makes layout super simple to build.

Now, I hope you have enjoyed this article today. Go unleash your new CSS masonry grid if you wish to, and all the best!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Making a Masonry Layout That Works Today",
  "desc": "I went on to figure out how make masonry work today with other browsers. I'm happy to report I've found a way — and, bonus! — that support can be provided with only 66 lines of JavaScript.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/making-a-masonry-layout-that-works-today.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
