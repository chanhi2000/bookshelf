---
lang: en-US
title: "CSS subgrid"
description: "Article(s) > CSS subgrid"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - web.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS subgrid"
    - property: og:description
      content: "CSS subgrid"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/web.dev/css-subgrid.html
prev: /programming/css/articles/README.md
date: 2023-09-28
isOriginal: false
cover: https://web.dev/static/articles/css-subgrid/images/thumbnail.png
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
  name="CSS subgrid"
  desc="Subgrid enables grid shareability, allowing nested grids to align to ancestors and siblings."
  url="https://web.dev/articles/css-subgrid"
  logo="https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png"
  preview="https://web.dev/static/articles/css-subgrid/images/thumbnail.png"/>

::: info Celebration

This web feature is now available in all three major browser engines, and becomes **Baseline Newly available** as of September 15, 2023.

:::

<BaselineStatus featureid="subgrid" />

[<VPIcon icon="iconfont icon-webdev"/>CSS grid](https://web.dev/learn/css/grid) is a very powerful layout engine, but the row and column tracks created on a parent grid can only be used to position direct children of the grid container. Any author defined [<VPIcon icon="iconfont icon-webdev"/>named grid areas and lines](https://web.dev/learn/css/grid#named-grid-lines) were lost on any other element than a direct child. With `subgrid`, track sizing, templates and names can be shared with nested grids. This article explains how it works.

::: info

Special thanks to Microsoft Edge's Web Platform engineers for their contribution of subgrid to Chromium! This CSS feature was made available thanks to their great work: Alison Maher, Ethan Jimenez, Kurt Catti-Schmidt, Ana Sollano Kim and Daniel Libby. An additional special thanks to Ian Kilpatrick from the Google Chromium team for helping this land as well. Shout outs and kudos all around!

:::

![**Before** subgrid, content was often hand tailored to avoid ragged layouts like this one.](https://web.dev/articles/css-subgrid/images/subgrid1.avif)

![**After** subgrid, aligning the variably sized content is possible.](https://web.dev/articles/css-subgrid/images/subgrid2.avif)

<!-- TODO: Browser Support -->

---

## Subgrid basics

Here is a straightforward use case introducing the basics of CSS `subgrid`. A grid is defined with two named columns, the first is `20ch` wide and the second is "the rest" of the space `1fr`. The column names aren't required but they're great for illustrative and educational purposes.

```css
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: [column-1] 20ch [column-2] 1fr;
}
```

Then, a child of that grid, spans those two columns, is set as a grid container, and adopts the columns of its parent by setting `grid-template-columns` to `subgrid`.

```css
.grid > .subgrid {
  grid-column: span 2;

  display: grid;
  grid-template-columns: subgrid; /* 20ch 1fr */
}
```

![A screenshot of the CSS grid DevTools, showing two columns side by side with a name at the start of their column line. [(<VPIcon icon="fa-brands fa-codepen"/>`web-dot-dev`)](https://codepen.io/web-dot-dev/pen/NWezjXv)](https://web.dev/articles/css-subgrid/images/subgrid3.avif)

<CodePen
  user="web-dot-dev"
  slug-hash="NWezjXv"
  title="Basic Subgrid Example"
  :default-tab="['css','result']"
  :theme="dark"/>

That's it, a parent grid's columns have been effectively passed down a level to a subgrid. This subgrid can now assign children to either of those columns.

**Challenge!** Repeat the same demo but do it for `grid-template-rows`.

---

## Share a page level "macro" grid

Designers often work with shared grids, drawing lines over an entire design, aligning any element they want to it. Now web developers can too! This exact workflow can now be achieved, plus many more.

<VidStack src="https://web.dev/static/articles/css-subgrid/images/subgrid-video1.mp4" />

From macro grid to finished design. Grid named areas are created upfront and later components are placed as desired.

Implementing the most common designer grid workflow can provide excellent insights into the capabilities, workflows, and potentials of `subgrid`.

Here's a screenshot taken from Chrome DevTools of a mobile page layout macro grid. The lines have names and there are clear areas for component placement.

![A screenshot from Chrome CSS grid DevTools showing a mobile sized grid layout where rows and columns are named for quick identification: fullbleed, system-status, primary-nav, primary-header, main, footer and  system-gestures.](https://web.dev/articles/css-subgrid/images/subgrid4.avif)

The following CSS creates this grid, with named rows and columns for the device layout. Each row and column has a size.

```css
.device {
    display: grid;
    grid-template-rows:
      [system-status] 3.5rem
      [primary-nav] 3rem
      [primary-header] 4rem
      [main] auto
      [footer] 4rem
      [system-gestures] 2rem
    ;
    grid-template-columns: [fullbleed-start] 1rem [main-start] auto [main-end] 1rem [fullbleed-end];
}
```

Some additional styles give the following design.

![Same CSS DevTools grid overlay as before, but this time with some of the mobile system UI present, some shadows and a little color. Helps see where the design is going.](https://web.dev/articles/css-subgrid/images/subgrid5.avif)

Inside this parent, are various nested elements. The design requires a full width image under the nav and header rows. The furthest left and right column line names are `fullbleed-start` and `fullbleed-end`. Naming grid lines this way enables children to align to each simultaneously with the [<VPIcon icon="fas fa-globe"/>placement shorthand](https://rachelandrew.co.uk/archives/2017/06/01/breaking-out-with-css-grid-explained/) of `fullbleed`. It's very convenient as you'll soon see.

![A zoomed in screenshot of the grid overlay from DevTools, focusing specifically on the fullbleed-start and fullbleed-end column names.](https://web.dev/articles/css-subgrid/images/subgrid6.avif)

With the overall device layout created with nice named rows and columns, use `subgrid` to pass the well named rows and columns to nested grid layouts. This is that `subgrid` magic moment. The device layout passes the named rows and columns to the app container, which then passes it on to every one of its children.

```css
.device > .app,
.app > * {
    display: grid;
    grid: subgrid / subgrid;

    /* same as */
    grid-template-rows: subgrid;
    grid-template-columns: subgrid;
}
```

**CSS subgrid is a value used in place of a list of grid tracks.** The rows and columns the element is spanning from its parent, are now the same rows and columns it offers. This makes the line names from the `.device` grid available to children of `.app`, instead of only `.app`. Elements inside of `.app` were not able to reference the grid tracks created by `.device` before subgrid.

::: note

`display: grid` is required on every element that wishes to subscribe or pass on rows and columns.

:::

With this all defined, the nested image is now able to go full bleed in the layout thanks to `subgrid`. No negative values or tricks, instead a nice one-liner that says “my layout spans from `fullbleed-start` to `fullbleed-end`.”

```css
.app > main img {
    grid-area: fullbleed;
}
```

![The finished macro layout, complete with a full width nested image sitting properly undeath the primary nav and header rows and extending to each of the fullbleed named column lines. [(<VPIcon icon="fa-brands fa-codepen"/>`web-dot-dev`)](https://codepen.io/web-dot-dev/pen/WNLyjzX)](https://web.dev/articles/css-subgrid/images/subgrid7.avif)

<CodePen
  user="web-dot-dev"
  slug-hash="WNLyjzX"
  title="Subgrid slotted mobile layouts"
  :default-tab="['css','result']"
  :theme="dark"/>

There you have it, a macro grid like designers use, implemented in CSS. This concept can scale and grow with you as needed.

---

## Check for support

Progressive enhancement with CSS and subgrid is familiar and straightforward. Use `@supports` and inside the parenthesis ask the browser if it understands subgrid as a value for template columns or rows. The following example checks if the `grid-template-columns` property supports the `subgrid` keyword, which if true, means that subgrid can be used

```css
@supports (grid-template-columns: subgrid) {
  /* safe to enhance to */
}
```

<CodePen
  user="web-dot-dev"
  slug-hash="KKrJPZQ"
  title="Subgrid feature detection"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Devtools

Chrome, Edge, Firefox and Safari all have great CSS grid DevTools, and Chrome, Edge and Firefox have specific tools for helping with subgrid. [<VPIcon icon="fa-brands fa-chrome"/>Chrome announced their tools in 115](https://developer.chrome.com/blog/new-in-devtools-115#subgrid) while Firefox has had them for a year or more.

![Screenshot preview of the subgrid badge found on elements in the Elements
panel.](https://web.dev/articles/css-subgrid/images/subgrid8.avif)

The subgrid badge acts like the grid badge but visually distinguishes which grids are subgrids and which aren't.

::: info Resources

This list is a compilation of subgrid articles, demos and overall inspiration for getting started. If you're looking for the next step for your subgrid education, have fun exploring all these great resources!

<SiteInfo
  name="Subgrid - CSS | MDN"
  desc="The CSS grid layout module includes a subgrid value for grid-template-columns and grid-template-rows. This guide details what subgrid does and gives some use cases and design patterns that the feature solves."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

<CodePen
  user="rachelandrew"
  slug-hash="VVGZVW"
  title="An Event Apart: More subgrid"
  :default-tab="['css','result']"
  :theme="dark"/>

<SiteInfo
  name="CSS Subgrid | 12 Days of Web"
  desc="With subgrid coming to all engines very soon, it’s a great time to discover what this new feature of grid can do."
  url="https://12daysofweb.dev/2022/css-subgrid/"
  logo="https://12daysofweb.dev/img/favicon.png"
  preview="https://12daysofweb.dev/img/og/css-subgrid.png"/>

```component VPCard
{
  "title": "Grid by Example - Usage examples of CSS Grid Layout",
  "desc": "Everything you need to learn CSS Grid Layout",
  "link": "https://gridbyexample.com/examples/#css-grid-level-2-examples",
  "logo": "https://gridbyexample.com/favicon.ico",
  "background": "rgba(10,10,10,0.2)"
}
```

- [**Ahmad Shadeed article**](/ishadeed.com/learn-css-subgrid.md)
- [<VPIcon icon="fa-brands fa-youtube"/>Michelle Barker at CSS Day 2022](https://youtu.be/tueTFd2TQUA?t=2266)
- Cards
  - [Codepen by Jhey (<VPIcon icon="fa-brands fa-codepen"/>`jh3y`)](https://codepen.io/jh3y/pen/abKaYqO)
  - [Codepen by Ahmad Shadeed (<VPIcon icon="fa-brands fa-codepen"/>`shadeed`)](https://codepen.io/shadeed/pen/qBpQNQY)
  - [Codepen by Takeshi Kano (<VPIcon icon="fa-brands fa-codepen"/>`tonkotsuboy`)](https://codepen.io/tonkotsuboy/pen/LYexpZp)
  - [Codepen by Arvid (<VPIcon icon="fa-brands fa-codepen"/>`ArvidW`)](https://codepen.io/ArvidW/pen/rNrGjvW)
  - [Codepen by Chris Coyier (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/bGRXmEe)
  - [Codepen by Miriam Suzanne (<VPIcon icon="fa-brands fa-codepen"/>`miriamsuzanne`)](https://codepen.io/miriamsuzanne/pen/xxKRpmq)
- [Chris Coyier with forms (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/YzxqJap)

<CodePen
  user="facundocorradini"
  slug-hash="wvBBpJM"
  title="CSS subgrid #2: form layout"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="chriscoyier"
  slug-hash="mdemZaw"
  title="Aligned, Inside Lists"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="michellebarker"
  slug-hash="wvyBjOz"
  title="Subgrid"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="miriamsuzanne"
  slug-hash="ZEEbxro"
  title="Subgrid Line Names"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="kevinpowell"
  slug-hash="RwgvMMb"
  title="Subgrid basics"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="kevinpowell"
  slug-hash="XWgoWRx"
  title="Dynamic rows for subgrid"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="shannonmoeller"
  slug-hash="poLQLoO"
  title="CSS Grid Semantic Comparison Lists"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="kevinpowell"
  slug-hash="LYVmpqY"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="elad2412"
  slug-hash="KKaXOPG"
  title="The new CSS Sub-Grid with fallback"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="aaroniker"
  slug-hash="OeyayK"
  title="Subgrid Test"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="argyleink"
  slug-hash="ExbzqWp"
  title="Fullbleed Subgrid Items"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS subgrid",
  "desc": "Subgrid enables grid shareability, allowing nested grids to align to ancestors and siblings.",
  "link": "https://chanhi2000.github.io/bookshelf/web.dev/css-subgrid.html",
  "logo": "https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png",
  "background": "rgba(26,115,232,0.2)"
}
```
