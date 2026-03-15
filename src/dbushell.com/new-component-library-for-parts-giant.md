---
lang: en-GB
title: "A New Component Library for Parts Giant"
description: "Article(s) > A New Component Library for Parts Giant"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - dbushell.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A New Component Library for Parts Giant"
    - property: og:description
      content: "A New Component Library for Parts Giant"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/new-component-library-for-parts-giant.html
prev: /programming/js/articles/README.md
date: 2021-07-01
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2021-07-01-new-component-library-for-parts-giant.png
---

# {{ $frontmatter.title }} 관련

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
  name="A New Component Library for Parts Giant"
  desc="The one where I revisit an old client"
  url="https://dbushell.com/2021/07/01/new-component-library-for-parts-giant/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2021-07-01-new-component-library-for-parts-giant.png"/>

::: warning

This post was written **5 years ago!**  

Personal opinions and technical details may have changed since writing.

:::

[**Back in 2015**](/dbushell.com/css-framework-for-partsgiant.md) I built the front-end for [<VPIcon icon="fas fa-name"/>Parts Giant](https://partsgiant.com/). Following a successful five years of e-commerce, Parts Giant handed me a similar brief with a refreshed design. Five years is a *long time* on the web. This was an opportunity to showcase that evolution and deliver a thoroughly modern front-end component library building on past success.

![The new home, category, and product page templates.](https://dbushell.com/images/blog/2021/parts-giant-design@1x.webp)

In this case study I’ll go in-depth on a handful of topics related to this project.

---

## Building Blocks

To build a website I first loosely itemise components into a three tier hierarchy. There are many names for a methodology like this but I don’t strictly adhere to any one in particular. I find being overly rigid on rules does not compliment the nature of front-end. One must be pragmatic and not get hung up on conventions for conventions sake.

![The component library in Fractal.](https://dbushell.com/images/blog/2021/parts-giant-library@1x.webp)

[<VPIcon icon="fas fa-globe"/>Fractal](https://fractal.build/) is my current tool of choice for documentation and presentation.

The first component tier is the most primitive. It comprises singular ‘elements’ like a button or form field. I also fit typographic styles, colours, and common units like spacing into this tier as CSS custom properties.

![Parts Giant button component states](https://dbushell.com/images/blog/2021/partsgiant-button-states@1x.png)

I’ve recently written on the topic of [**CSS focus state**](/dbushell.com/accessibility-css-focus-state.md) with several examples from this project. Improving accessibility was a key aspect here. I’ve also started to write CSS that is naturally adaptable to [**right-to-left styling**](/dbushell.com/changing-css-for-good-logical-properties-and-values.md). All the components I built for Parts Giant are RTL-ready.

A long time ago “browser testing” used to be a job I reluctantly tackled after coding full page templates. I still do a final sweep, but I now primarily test on a component-by-component basis to catch issues early. I do this whilst testing responsiveness, interactivity, and accessibility — so it’s time well spent. At this early stage it’s easier to tweak design accordingly if that is needed.

The final tier of ‘container’ components each represent a horizontal slice of a page. The header or a product listing, for example. The middle tier — I simply call ‘blocks’ — is literally everything else. A three tier component library suits how I mentally break up a web page. I find a more granular delineation is of little coding benefit. Towards the end of development I may break out other categories if it aids discovery in the documentation. This is just my preference, I’ll happily work with other methodologies if I’m not leading the project.

---

## Flexbox and Grid Layout

Since the original website was built the options for CSS layout have expanded immensely.

![Product listing: old design (left) and new design (right).](https://dbushell.com/images/blog/2021/parts-giant-product-grid@1x.webp)

The old code used the classic [**float and clearfix**](/css-tricks.com/all-about-floats.md) technique. This was not intuitive nor easy to use but it’s all we had at the time. The new version uses CSS Grid. Hallelujah! A sane and logical layout system. CSS Flexbox and Grid are real game changers.

Each product uses the [**card pattern**](/dbushell.com/accessibility-css-focus-state.md#the-card) which itself uses Flexbox layout in a column direction. This allows for equal height cards with the card footer aligned to the bottom.

![Form layout example for a shipping address.](https://dbushell.com/images/blog/2021/parts-giant-forms@1x.webp)

CSS Grid allowed for a simple responsive form layout without superfluous markup. An e-commerce website has a lot of forms. With this quick baseline we had plenty of time to tailor bespoke styles for the more complicated forms.

---

## Sidebar and Modal Filters

Aside the product listing grid is a sidebar with various filters. This was redesigned and coded to be modular allowing any arrangement of panels.

![Colour filter panel: old design (left) and new design (right).](https://dbushell.com/images/blog/2021/parts-giant-color-filter@1x.webp)

Several minor visual tweaks were made for an overall major improvement. General size and spacing has been bumped up a notch. The active selection and interaction states are clearer.

Under the hood the panels use a `<details>` element for interactivity free from JavaScript. A custom colour property is used to style each option (in [<VPIcon icon="fa-brands fa-firefox"/>HSL values](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)). This allows a bit more flexibility than the inline `background-color` style that was used previously.

A reduced code example:

```html
<details open>
  <summary>Colors</summary>
  <label style="--color: 25, 100%, 50%;">
    <input type="checkbox" />
    <span>Orange</span>
  </label>
</details>
```

On smaller screens, where there is no space for a sidebar, the filters are moved inside a pop-up modal. By default the modal is hidden and empty and thus considered a progressive enhancement. It’s “nice to have” functionality but not absolutely critical for browsing.

![Product filter sidebar and modal designs.](https://dbushell.com/images/blog/2021/parts-giant-filter@1x.webp)

The modal footer remains visible above any overflow using `position: sticky`. The same accordion-like design remains allowing panels to be toggled open and closed. Altogether a nice user experience.

JavaScript is used to switch between sidebar and modal. The CSS breakpoint is read once from the document style to avoid hard-coding it:

```js
const style = window.getComputedStyle(document.documentElement);
const breakpoint = style.getPropertyValue('--breakpoint-sidebar');
```

Then in a debounced window `resize` event a media query is used:

```js
const isSidebar = window.matchMedia(`(min-width:${breakpoint})`).matches;
```

If the sidebar breakpoint is not active, the `<form>` node — which contains the filter panels — is moved from the sidebar parent to the modal parent (or vice-versa). The appropriate ARIA attributes and styles are toggled so that only one of the parents is visible. This technique avoids have two duplicate form templates.

---

## Navigation

Parts Giant was designed with many avenues for product navigation and discovery. Mega-menus, keyword search, and filtering to name a few. The existing content structure has proved successful so that remained the same in the new design.

The new component library helped finalise the design of UI components to ensure they worked in regards to both aesthetics and overall usability.

![Pagination UI components.](https://dbushell.com/images/blog/2021/parts-giant-pagination@1x.webp)

[**CSS custom properties**](/css-tricks.com/a-complete-guide-to-custom-properties.md) are ideal to codify design tokens like size and colour. They ensure consistency across components and avoid duplicate code.

The new website introduces an off-canvas navigation for smaller screens.

![The off-canvas menu variations.](https://dbushell.com/images/blog/2021/parts-giant-off-canvas@1x.webp)

Check out my blog post on the topic of [**off-canvas navigation**](https://dbushell.com/2021/06/17/css-off-canvas-responsive-navigation/). I’ve published a generic version of this pattern that I’ll continue to maintain and repurpose for other projects.

---

## Deliverables

I’m not a fan of over-producing fancy deliverables full of fluffy prose and decorated with my logo all over. I’ve had to work with pretty PDFs before and they’re only good for eating up a budget. My component libraries are delivered in a metaphorical cardboard box, aka a git repository, that includes:

- One CSS stylesheet + SCSS source files
- Around two dozen static HTML templates
- A directory of accompanying assets
- Documentation
- Documentation!
- Documentation!!

As mentioned I used [<VPIcon icon="fas fa-globe"/>Fractal](https://fractal.build/) to document this component library. Included are visual code examples for each component and their variations. I also kept a change-log updated as I went along with a list of additions and amends. It’s a simple but effective way to show the client what’s new without bombarding them with emails.

The new stylesheet — despite providing significantly more components — has shrunk from 147KB to 93KB. Minified and compressed to just under 14KB. The templates hit a perfect 100 on [<VPIcon icon="fa-brands fa-google"/>PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). As they should; they’re static with placeholder content. Not a bad starting point though!

This was a large project and I’ll likely have more topics to blog about and generic patterns to evolve and share.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A New Component Library for Parts Giant",
  "desc": "The one where I revisit an old client",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/new-component-library-for-parts-giant.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
