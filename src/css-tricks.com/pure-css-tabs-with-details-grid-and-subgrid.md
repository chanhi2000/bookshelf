---
lang: en-US
title: "Pure CSS Tabs With Details, Grid, and Subgrid"
description: "Article(s) > Pure CSS Tabs With Details, Grid, and Subgrid"
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
      content: "Article(s) > Pure CSS Tabs With Details, Grid, and Subgrid"
    - property: og:description
      content: "Pure CSS Tabs With Details, Grid, and Subgrid"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid.html
prev: /programming/css/articles/README.md
date: 2025-10-27
isOriginal: false
author:
  - name: Silvestar Bistrović
    url : https://css-tricks.com/author/silvestar/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/details-tabs-subgrid.webp
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
  name="Pure CSS Tabs With Details, Grid, and Subgrid"
  desc="Can we use the <details> element as the foundation for a tabbed interface? Why yes, we can!"
  url="https://css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/details-tabs-subgrid.webp"/>

Making a tab interface with CSS is a never-ending topic in the world of modern web development. Are they possible? If yes, could they be accessible? I wrote how to build them [<VPIcon icon="fas fa-globe"/>the first time](https://silvestar.codes/articles/how-to-make-tabs-using-only-css/) nine long years ago, and [<VPIcon icon="fas fa-globe"/>how to](https://silvestar.codes/articles/css-tabs-part-ii-accessibility/) [<VPIcon icon="fas fa-globe"/>integrate accessible practices](https://silvestar.codes/articles/css-tabs-part-ii-accessibility/) into them.

Although my solution then could *possibly* still be applied today, I’ve landed on a more modern approach to CSS tabs using the [**`<details>`**](/css-tricks.com/using-styling-the-details-element.md) element in combination with [<VPIcon icon="iconfont icon-css-tricks"/>CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) and [**Subgrid**](/css-tricks.com/hello-subgrid.md).

---

## First, the HTML

Let’s start by setting up the HTML structure. We will need a set of `<details>` elements inside a parent wrapper that we’ll call `.grid`. Each `<details>` will be an `.item` as you might imagine each one being a tab in the interface.

```html
<div class="grid">
  <!-- First tab: set to open -->
  <details class="item" name="alpha" open>
    <summary class="subitem">First item</summary>
    <div><!-- etc. --></div>
  </details>
  <details class="item" name="alpha">
    <summary class="subitem">Second item</summary>
    <div><!-- etc. --></div>
  </details>
  <details class="item" name="alpha">
    <summary class="subitem">Third item</summary>
    <div><!-- etc. --></div>
  </details>
</div>
```

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/details-tabs-01.png?resize=1628%2C640&ssl=1)

These don’t look like true tabs yet! But it’s the right structure we want before we get into CSS, where we’ll put CSS Grid and Subgrid to work.

---

## Next, the CSS

Let’s set up the grid for our wrapper element using — you guessed it — CSS Grid. Basically what we’re making is a three-column grid, one column for each tab (or `.item`), with a bit of spacing between them.

We’ll also set up two rows in the `.grid`, one that’s sized to the content and one that maintains its proportion with the available space. The first row will hold our tabs and the second row is reserved for the displaying the active tab panel.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-template-rows: auto 1fr;
  column-gap: 1rem;
}
```

Now we’re looking a little more tab-like:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/details-tabs-02.png?resize=1630%2C680&ssl=1)

**Next, we need to set up the subgrid for our tab elements.** We want subgrid because it allows us to use the existing `.grid` lines without nesting an entirely new grid with new lines. Everything aligns nicely this way.

So, we’ll set each tab — the `<details>` elements — up as a grid and set their columns and rows to inherit the main `.grid`‘s lines with `subgrid`.

```css
details {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}
```

Additionally, we want each tab element to fill the entire `.grid`, so we set it up so that the `<details>` element takes up the entire available space horizontally and vertically using the `grid-column` and `grid-row` properties:

```css
details {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  grid-column: 1 / -1;
  grid-row: 1 / span 3;
} 
 
```

It looks a little wonky at first because the three tabs are stacked right on top of each other, but they cover the entire `.grid` which is exactly what we want.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/details-tabs-03.png?resize=1630%2C676&ssl=1)

Next, we will place the tab panel content in the second row of the subgrid and stretch it across all three columns. We’re using [<VPIcon icon="iconfont icon-css-tricks"/>`::details-content`](https://css-tricks.com/almanac/pseudo-selectors/d/details-content/) (good support, but [<VPIcon icon="iconfont icon-css-tricks"/>not yet in WebKit](https://css-tricks.com/almanac/pseudo-selectors/d/details-content/#aa-browser-support) at the time of writing) to target the panel content, which is nice because that means we don’t need to set up another wrapper in the markup simply for that purpose.

```css
details::details-content {
  grid-row: 2; /* position in the second row */
  grid-column: 1 / -1; /* cover all three columns */
  padding: 1rem;
  border-bottom: 2px solid dodgerblue;
}
```

The thing about a tabbed interface is that we only want to show one open tab panel at a time. Thankfully, we can select the `[open]` state of the `<details>` elements and hide the `::details-content` of any tab that is `:not([open])`by using [<VPIcon icon="fas fa-globe"/>enabling selectors](https://silvestar.codes/articles/you-want-a-single-enabling-selector-not-the-one-that-disables-the-rule-of-the-previous-one/):

```css
details:not([open])::details-content {
  display: none;
}
```

We still have overlapping tabs, but the only tab panel we’re displaying is currently open, which cleans things up quite a bit:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/details-tabs-04.png?resize=1630%2C680&ssl=1)

---

## Turning `<details>` into tabs

Now on to the fun stuff! Right now, all of our tabs are visually stacked. We want to spread those out and distribute them evenly along the `.grid`‘s top row. Each `<details>` element contains a `<summary>` providing both the tab label and button that toggles each one open and closed.

Let’s place the `<summary>` element in the first subgrid row and add apply light styling when a `<details>` tab is in an `[open]` state:

```css
summary {
  grid-row: 1; /* First subgrid row */
  display: grid;
  padding: 1rem; /* Some breathing room */
  border-bottom: 2px solid dodgerblue;
  cursor: pointer; /* Update the cursor when hovered */
}

/* Style the <summary> element when <details> is [open] */
details[open] summary {
  font-weight: bold;
}
```

Our tabs are still stacked, but how we have some light styles applied when a tab is open:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/details-tabs-05.png?resize=1630%2C674&ssl=1)

We’re almost there! The last thing is to position the `<summary>` elements in the subgrid’s columns so they are no longer blocking each other. We’ll use the `:nth-of-type` pseudo to select each one individually by their order in the HTML:

```css
/* First item in first column */
details:nth-of-type(1) summary {
  grid-column: 1 / span 1;
}
/* Second item in second column */
details:nth-of-type(2) summary {
  grid-column: 2 / span 1;
}
/* Third item in third column */
details:nth-of-type(3) summary {
  grid-column: 3 / span 1;
}
```

Check that out! The tabs are evenly distributed along the subgrid’s top row:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/detaiuls-tabs-06.png?resize=1628%2C680&ssl=1)

Unfortunately, we can’t use loops in CSS (yet!), but we can use variables to keep our styles DRY:

```css
summary {
  grid-column: var(--n) / span 1;
}
```

Now we need to set the `--n` variable for each `<details>` element. I like to inline the variables directly in HTML and use them as hooks for styling:

```html
<div class="grid">
  <details class="item" name="alpha" open style="--n: 1">
    <summary class="subitem">First item</summary>
    <div><!-- etc. --></div>
  </details>
  <details class="item" name="alpha" style="--n: 2">
    <summary class="subitem">Second item</summary>
    <div><!-- etc. --></div>
  </details>
  <details class="item" name="alpha" style="--n: 3">
    <summary class="subitem">Third item</summary>
    <div><!-- etc. --></div>
  </details>
</div>
```

Again, because loops aren’t a thing in CSS at the moment, I tend to reach for a templating language, specifically [<VPIcon icon="fas fa-globe"/>Liquid](https://liquidjs.com/tutorials/intro-to-liquid.html), to get some looping action. This way, there’s no need to explicitly write the HTML for each tab:

```xml
{% for item in itemList %}
  <div class="grid">
    <details class="item" name="alpha" style="--n: {{ forloop.index }}" {% if forloop.first %}open{% endif %}>
      <!-- etc. -->
    </details>
  </div>
{% endfor %}
```

You can roll with a different templating language, of course. There are plenty out there if you like keeping things concise!

---

## Final touches

OK, I lied. There’s *one more thing* we ought to do. Right now, you can click only on the last `<summary>` element because all of the `<details>` pieces are stacked on top of each other in a way where the last one is on top of the stack.

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/10/issues.mp4" />

You might have already guessed it: we need to put our `<summary>` elements on top by setting [<VPIcon icon="fas fa-globe"/>`z-index`](https://css-tricks.com/almanac/properties/z/z-index/).

```css
summary {
  z-index: 1;
}
```

Here’s the full working demo:

<CodePen
  user="CiTA"
  slug-hash="yyeOvgj"
  title="HTML/CSS only tabs w/ details elements and CSS subgrid"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Accessibility

The `<details>` element includes built-in accessibility features, such as keyboard navigation and screen reader support, for both expanded and collapsed states. I’m sure we could make it even better, but it might be a topic for another article. I’d love some feedback in the comments to help cover as many bases as possible.

::: note Update

[<VPIcon icon="fas fa-globe"/>Nathan Knowler chimed](https://mastodon.social/@knowler@sunny.garden/115446876109265856) in with some excellent points over on Mastodon. [<VPIcon icon="iconfont icon-css-tricks"/>Adrian Roselli buzzed in](https://css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid/comment-1883494) with additional context in the comments as well.

:::

---

It’s 2025, and we can create tabs with HTML and CSS only without any hacks. I don’t know about you, but this developer is happy today, even if we still need a little patience for browsers to fully support these features.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Pure CSS Tabs With Details, Grid, and Subgrid",
  "desc": "Can we use the <details> element as the foundation for a tabbed interface? Why yes, we can!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/pure-css-tabs-with-details-grid-and-subgrid.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
