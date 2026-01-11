---
lang: en-US
title: "Simulating Crop Marks"
description: "Article(s) > Simulating Crop Marks"
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
      content: "Article(s) > Simulating Crop Marks"
    - property: og:description
      content: "Simulating Crop Marks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/simulating-crop-marks.html
prev: /programming/css/articles/README.md
date: 2026-01-13
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8246
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
  name="Simulating Crop Marks"
  desc="Crop marks are an idea that comes from the print design world. Design in the bleed area will be cut away by giant cutter machines, and that bleed area is designated by the crop marks. We can do it on the web too, just for kicks."
  url="https://frontendmasters.com/blog/simulating-crop-marks/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8246"/>

This is weird, but: I had a dream where I was thinking about crop marks. What are crop marks? They were pretty damn important in my print design and digital prepress days. Designers would hang parts of the design *off the edge of the document* and the expectation is that the ink literally goes to the edge of the paper when printed. Printers can’t actually print to the edge of the paper though (it would be messy!) so instead, the use a *little bit bigger paper*, **crop marks** are added, and the design is printed a bit outside the crop marks. Then the final piece is literally *cut* at those marks, making the design hit the edges as intended.

Design software like InDesign can output files destined for printing this way with these marks.

![Screenshot of Adobe InDesign 2026 interface showing export settings for PDF, including options for printer's marks like crop marks, bleed marks, registration marks, and color bars.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/CleanShot-2026-01-12-at-16.06.35%402x.png?resize=1024%2C531&ssl=1)

Then the PDF will be a bit bigger than the designed sheet size and have these marks:

![A screenshot of a PDF document showing crop marks in the corner and a large pink shape filling the page.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/CleanShot-2026-01-12-at-16.07.41%402x.png?resize=1024%2C695&ssl=1)

Imagine thousands of printed pages like this all stacked up. The print shop binderies I worked at would have big ol’ cutter machines that would cut the stack of paper *right at the crop marks.* That’s the point of the crop marks, literally knowing exactly where to cut the paper.

![A cutting machine used in print shops, labeled 'BAUM-PM55', with a steel cutting blade and control panel.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/40945-Baum_PM55A_Paper_Cutter_1001180313001.jpg?resize=900%2C599&ssl=1)

::: note

Have you ever heard the term **“bleed”** in web design?

![For example…](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/Screenshot-2026-01-12-at-4.15.36-PM.png?resize=940%2C1024&ssl=1)

This comes directly from print design. It’s the area *outside* the crop marks. When a part of design has *bleed* it means there are elements of the design that are pulled out into the area that gets cut away. So on the web that means an element of the design touches the edge of the viewport.

:::

![Diagram illustrating crop marks, bleed, slug, page edge (trim), and margins in print design.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/160359937581220.jpg?resize=1024%2C576&ssl=1)

In my dream I was thinking about how they looked and how I could add them to a website, just for the aesthetics of it. Could be a worse dream, I guess. It was strong enough of a dream that I woke up and actually felt compelled to do it.

---

## Crop Marks on the Web

To be clear, there is no reason to do this on the web. I’m just thinking it’s a neat print design throwback and aesthetic thing. Like color bars or registration marks.

The trick is that there are *eight* of these little lines. Certainly, we could add eight `<div>`s to the page and fix position them and that would do it. But my head always says: this is *entirely* a visual design thing that has nothing to do with the content of the page. So don’t clutter the HTML!

We can get *four* elements “for free” on any given page without touching any HTML:

```css
html::before {}
html::after {}
body::before {}
body::after {}
```

So if we’re able to draw two marks with each of those, we should be able to pull this off. Let’s start by drawing boxes.

We can position a “bar” on each edge like so:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019bb4bc-6716-7498-ba3a-1ff0a7dc327c"
  title="edge bars"
  :default-tab="['css','result']"
  :theme="dark"/>

But we don’t have to make these full color background bars, we could make them lines instead.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019bb4c2-454f-733d-91f7-09b033ea31d0"
  title="edge bars"
  :default-tab="['css','result']"
  :theme="dark"/>

I tossed [<VPIcon icon="fas fa-globe"/>slideVars](https://codepen.github.io/slideVars/) in there to play with the values a little.

But we also don’t want *full* lines, we want a little line at the top and bottom. We can do this by using `linear-gradient()` with hard color stops. The big idea is like: *draw a little transparent line, **then a solid mark**, then a long transparent line, **then a solid mark**, then a little transparent line.*

If that was ASCII it would be like:

```plaintext
|---**===**----------------------**===**---|
```

(lolz)

Translated into CSS it’s like:

```css
/* horizontal line */
html::before {
  content: "";
  left: 0;
  height: 1px;
  width: 100%;
  background: linear-gradient(
    to right,
    transparent
       0
       20px,
    black
       20px
       40px,
    transparent
       40px
       calc(100% - 40px),
    black
       calc(100% - 40px),
       calc(100% - 20px),
    transparent
       calc(100% - 20px)
  );
}
```

If I abstract that out into custom properties and position the marks like real crop marks, we get:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019bb52f-9c72-71f8-9458-e533acb0d2c9"
  title="controllable crop marks"
  :default-tab="['css','result']"
  :theme="dark"/>

I put a less-fancy version of these crop marks into this more fleshed out design below, then made the areas outside the crop marks have a white partially transparent fill, showing off how perhaps that’s the part of the design that would be cut away.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019b50da-ec77-7cb4-b666-f6a4aa79224f"
  title="crop marks"
  :default-tab="['css','result']"
  :theme="dark"/>

WELL THAT WAS FUN.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Simulating Crop Marks",
  "desc": "Crop marks are an idea that comes from the print design world. Design in the bleed area will be cut away by giant cutter machines, and that bleed area is designated by the crop marks. We can do it on the web too, just for kicks.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/simulating-crop-marks.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
