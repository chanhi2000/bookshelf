---
lang: en-US
title: "Next Gen CSS: @container"
description: "Article(s) > Next Gen CSS: @container"
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
      content: "Article(s) > Next Gen CSS: @container"
    - property: og:description
      content: "Next Gen CSS: @container"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/next-gen-css-container.html
prev: /programming/css/articles/README.md
date: 2021-05-11
isOriginal: false
author:
  - name: Una Kravets
    url : https://css-tricks.com/author/unakravets/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/05/Screen-Shot-2021-05-11-at-7.38.01-AM.png
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
  name="Next Gen CSS: @container"
  desc="Chrome is experimenting with @container, a property within the CSS Working Group Containment Level 3 spec being championed by Miriam Suzanne of Oddbird, and a"
  url="https://css-tricks.com/next-gen-css-container"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/05/Screen-Shot-2021-05-11-at-7.38.01-AM.png"/>

Chrome is experimenting with `@container`, a property within the CSS Working Group [Containment Level 3 spec (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues?q=is%3Aissue+label%3Acss-contain-3+) being championed by [Miriam Suzanne (<VPIcon icon="fa-brands fa-x-twitter"/>`TerribleMia`)](https://twitter.com/TerribleMia) of [<VPIcon icon="fas fa-globe"/>Oddbird](https://css.oddbird.net/rwd/query/), and a group of engineers across the web platform. `@container` brings us the ability to **style elements based on the size of their parent container**.

::: critical

The `@container` API is not stable, and is subject to syntax changes. If you try it out on your own, you may encounter a few bugs. Please report those bugs to the appropriate browser engine!

**Bugs:** [<VPIcon icon="fa-brands fa-chrome"/>](https://bugs.chromium.org/p/chromium/issues/list) | [<VPIcon icon="fa-brands fa-firefox" />](https://bugzilla.mozilla.org/home) | [<VPIcon icon="fa-brands fa-safari"/>](https://bugs.webkit.org/query.cgi?format=specific&product=WebKit)

:::

You can think of these like a media query (`@media`), but instead of relying on the **viewport** to adjust styles, the parent container of the element you’re targeting can adjust those styles.

---

## Container queries will be the single biggest change in web styling since CSS3, altering our perspective of what “responsive design” means

No longer will the viewport and user agent be the only targets we have to create responsive layout and UI styles. With container queries, elements will be able to target their own parents and apply their own styles accordingly. This means that the same element that lives in the sidebar, body, or hero could look completely different based on its available size and dynamics.

---

## `@container` in action

<CodePen
  user="anon"
  slug-hash="LYbvKpK"
  title="Component Query Card Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

In this example, I’m using two cards within a parent with the following markup:

```html
<div class="card-container">
  <div class="card">
    <figure> ... </figure>
    <div>
      <div class="meta">
        <h2>...</h2>
        <span class="time">...</span>
      </div>
      <div class="notes">
        <p class="desc">...</p>
        <div class="links">...</div>
      </div>
      <button>...</button>
    </div>
  </div>
</div>
```

Then, I’m setting containment (the [<VPIcon icon="iconfont icon-w3c"/>`container-type`](https://w3.org/TR/css-contain-3/#container-type) property) on the parent on which I’ll be querying the container styles (`.card-container`). I’m also setting a relative grid layout on the parent of `.card-container`, so its `inline-size` will change based on that grid. This is what I’m querying for with `@container`:

```css
.card-container {
  container-type: inline-size;
  width: 100%;
}
```

Now, I can query for container styles to adjust styles! This is very similar to how you would set styles using width-based media queries, using `max-width` to set styles when an element is *smaller* than a certain size, and `min-width` when it is *larger*.

```css :collapsed-lines
/* when the parent container is smaller than 850px, 
remove the .links div and decrease the font size on 
the episode time marker */

@container (max-width: 850px) {
  .links {
    display: none;
  }

  .time {
    font-size: 1.25rem;
  }

  /* ... */
}

/* when the parent container is smaller than 650px, 
decrease the .card element's grid gap to 1rem */

@container (max-width: 650px) {
  .card {
    gap: 1rem;
  }

  /* ... */
}
```

<VidStack src="https://css-tricks.com/wp-content/uploads/2021/04/Kapture-2021-03-24-at-12.04.23.mp4" />

---

## Container Queries + Media Queries

One of the best features of container queries is the ability to separate *micro layouts* from *macro layouts*. You can style individual elements with container queries, creating nuanced micro layouts, and style entire page layouts with media queries, the macro layout. This creates a new level of control that enables even more responsive interfaces.

Here’s another example that shows the power of using media queries for macro layout (i.e. the calendar going from single-panel to multi-panel), and micro layout (i.e. the date layout/size and event margins/size shifting), to create a beautiful orchestra of queries.

<CodePen
  user="anon"
  slug-hash="RwodQZw"
  title="CSS-Only Calendar Layout [CQ] + Polyfill"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Container Queries + CSS Grid

<VidStack src="https://css-tricks.com/wp-content/uploads/2021/04/Kapture-2021-03-15-at-17.27.15.mp4" />

One of my personal favorite ways to see the impact of container queries is to see how they work within a grid. Take the following example of a plant commerce UI:

No media queries are used on this website at all. Instead, we are only using container queries along with CSS grid to display the shopping card component in different views.

In the product grid, the layout is created with `grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));`. This creates a layout that tells the cards to take up the available fractional space until they hit `230px` in size, and then to flow to the next row. Check out more grid tricks at [<VPIcon icon="fas fa-globe"/>1linelayouts.com](http://1linelayouts.glitch.me).

Then, we have a container query that styles the cards to take on a vertical block layout when they are less than `350px` wide, and shifts to a horizontal inline layout by applying `display: flex` (which has an inline flow by default).

```css
@container (min-width: 350px) {
  .product-container {
    padding: 0.5rem 0 0;
    display: flex;
  }

  /* ... */
}
```

This means that each card *owns its own responsive styling*. This yet another example of where you can create a macro layout with the product grid, and a micro layout with the product cards. Pretty cool!

---

## Usage

In order to use `@container`, you first need to create a parent element that has [<VPIcon icon="fa-brands fa-firefox" />containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain). In order to do so, you’ll need to set `contain: layout inline-size` on the parent. You can use `inline-size` since we currently can only apply container queries to the inline axis. This prevents your layout from breaking in the block direction.

Setting `contain: layout inline-size` creates a new [<VPIcon icon="fa-brands fa-firefox" />containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block) and new [<VPIcon icon="fa-brands fa-firefox" />block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context), letting the browser separate it from the rest of the layout. Now, we can query!

---

## Limitations

Currently, you cannot use height-based container queries, using only the block axis. In order to make grid children work with `@container`, you’ll need to add a wrapper element. Despite this, adding a wrapper lets you still get the effects you want.

---

## Try it out

You can experiment with the `@container` property in Chromium today, by navigating to: `chrome://flags` in [<VPIcon icon="fa-brands fa-chrome"/>Chrome Canary](https://google.com/chrome/canary/) and turning on the **#experimental-container-queries** flag.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/05/chrome-canary-conatiner-query-flag.png?resize=1902%2C1510&ssl=1)

```component VPCard
{
  "title": "Responsive Components: a Solution to the Container Queries Problem",
  "desc": "Container Queries, as in, the ability to style elements based on values from a particular element, like its width and height. We have media queries, but those",
  "link": "/css-tricks.com/responsive-components-solution-container-queries-problem.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Say Hello to CSS Container Queries",
  "desc": "Container queries are finally here! Now available behind a flag in the latest version of Chrome Canary, you can go ahead and experiment to your heart’s",
  "link": "/css-tricks.com/say-hello-to-css-container-queries.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Origin Story of Container Queries",
  "desc": "Container queries don’t exist today but a lot of web developers have been arguing in their favor lately. At first, the idea sounds relatively simple: whereas",
  "link": "/css-tricks.com/the-origin-story-of-container-queries.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Raven Technique: One Step Closer to Container Queries",
  "desc": "For the millionth time: We need container queries in CSS! And guess what, it looks like we're heading in that direction.",
  "link": "/css-tricks.com/the-raven-technique-one-step-closer-to-container-queries.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Next Gen CSS: @container",
  "desc": "Chrome is experimenting with @container, a property within the CSS Working Group Containment Level 3 spec being championed by Miriam Suzanne of Oddbird, and a",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/next-gen-css-container.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
