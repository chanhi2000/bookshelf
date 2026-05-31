---
lang: en-US
title: "How to Build Responsive Designs and Scroll Effects with CSS Container Queries"
description: "Article(s) > How to Build Responsive Designs and Scroll Effects with CSS Container Queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Responsive Designs and Scroll Effects with CSS Container Queries"
    - property: og:description
      content: "How to Build Responsive Designs and Scroll Effects with CSS Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-responsive-designs-and-scroll-effects-with-css-container-queries.html
prev: /programming/css/articles/README.md
date: 2026-06-03
isOriginal: false
author:
  - name: jabo Landry
    url: https://freecodecamp.org/news/author/Arnold-Jabo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/dc70f649-2837-4768-be69-e4c1e85dcb03.png
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
  name="How to Build Responsive Designs and Scroll Effects with CSS Container Queries"
  desc="Container queries let you target specific sections of your webpage and apply styles to create customizable, responsive designs based on the container's size rather than that of the viewport. This guid"
  url="https://freecodecamp.org/news/how-to-build-responsive-designs-and-scroll-effects-with-css-container-queries"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/dc70f649-2837-4768-be69-e4c1e85dcb03.png"/>

Container queries let you target specific sections of your webpage and apply styles to create customizable, responsive designs based on the container's size rather than that of the viewport.

This guide will teach you this useful alternative for responsive designs. You'll also learn about on-scroll effects in CSS.

::: note Prerequisites

Before diving into scrollable queries and container-based scroll effects, make sure you have:

- **Basic familiarity with CSS features and key terms** — understanding properties like `height`, `overflow`, and how they affect layout.
- **Experience writing vanilla CSS** — being comfortable with selectors, rulesets, and applying styles without relying on frameworks.
- **A working knowledge of HTML structure** — since scroll behavior depends on parent elements, knowing how containers and child elements interact is essential.
- *(Optional but helpful)* Some exposure to responsive design concepts, so you can see how scrollable parents fit into broader layout strategies.

:::

---

## How to Use Container Queries

Usually, when making responsive designs, you use a media query that adds style to the page based on the page's width viewport, but container queries shift the narrative by adding styles based on the specific elements container or parent element size.

Take a navbar as an example. Let's say you want to have its links wrapped on top of each other when the size of a `nav` element size is less than `450px` and also change the background color when the screen size is less than `450px`.

To make `nav` element links wrap on top of each other when the `nav` element size is less than `450px`, we start by wrapping the links inside a single parent `nav`:

```html
<nav>
  <img src="" alt="logo" />
  <ul>
    <a href="">home</a>
    <a href="">about</a>
    <a href="">services</a>
    <a href="">contact</a>
  </ul>
</nav>
```

Then use `container-type` to define a container query on the wrapping element or parent (`nav`) element. It can have one of the following values:

- `inline-size`: Used when you want to track the x-axis of the parent element on the page (width)
- `block-size`: Used when you want to track the y-axis of the parent element on the page (height)
- Container Scroll-state: Used when you want to track the parent element when scrolled and when elements with position `sticky` are stuck on the screen.

For most cases, you will need to track the size of an element against the x-axis size, and you must use the `container-type` on a parent element because you want to apply styles based on the parent element size. Here, we'll use the `nav` because it is the parent element.

```css
nav { 
  container-type: inline-size;
}
```

You then define a container query with an at symbol (`@`) followed by the `container` keyword.

Then check if the `width` of the parent container (`nav`) gets narrower than `450px`. If the condition is true, add a `flex-wrap` to links element:

```css
@container (width > 450px) {
  ul {
    flex-wrap: wrap;
  }
}
```

---

## Difference Between Container Queries and Media queries

Take a look at the code below for media queries:

```css

@media (width < 450px) {
  nav {
    background: green;
  }
}
```

In the media query above, the `nav` element has a `green` background-color when the screen size is less than `450px`.

For container queries, the elements are getting stacked on top of each other when the `nav` element size is less than `450px`.

So, the difference is that media-queries considers **the whole screen size** while container-queries consider the **parent element size**.

**Example:**

jabo-arnold/pen/dPprjqM
Container query demo

---

## Container Scroll-state

You can also use container queries to style an element on scroll or to style an element with a position sticky when it's stuck on the page.

**Note**: Container **scroll-state** browser support isn't very good. It's supported in about 71% of all browsers currently, with the notable exceptions of Safari and Firefox. Be cautious when using it in production.

### Scrollable Queries

A scrollable query is used to check for parent element scrollbar behavior. If there is a scroll behavior on the parent element, then the container query for scrolling will be applied.

To use the scrollable queries, you need to have a parent that has a scroll behavior. HTML is the best fit for such an example because by default HTML has a scroll behavior on it.

To make an element scrollable, set a fixed height and apply `overflow`. This ensures a scroll bar appears whenever content exceeds that defined space.

#### Example:

We’ll design a simple page that displays a sidebar table of contents when the page is scrolled down and hides it when the user returns to the top.

First, make HTML a `container-type` of `scroll-state`:

```css
html {
  container-type: scroll-state;
}
```

Style the table of contents section and position it at the top right of the page.

```css
.toc {
  position: fixed;
  top: 5rem;
  left:90%;
  align-self: start;
  opacity: 0;
}
```

You positioned the table of contents to the right of the page and fixed it to the top of the screen by `5rem`. You also hid it by default by adding an `opacity` of `0`.

Now you need to check if the container scrollbar can be scrolled to the top of its container. If true, unhide the table of contents:

```css
@container scroll-state(scrollable: top) {
  .toc {
    transition: opacity 0.4s linear;
    opacity: 1;  
  }
}
```

You defined a container query, then followed it with the scroll-state keyword. This checks whether the scrollbar on a parent element can be scrolled.

Use `scrollable` to define the scroll direction. Setting it to `top` tests whether the container can scroll upward, while setting it to `bottom` tests whether it can scroll downward.

<CodePen
  user="jabo-arnold"
  slug-hash="GgjewRp"
  title="container scrolled demo"
  :default-tab="['css','result']"
  :theme="dark"/>

You can see that as long there's a space for scrolling to the top, the table-of- contents will be visible, but when you can't scroll to the top, the table of contents will be hidden.

You can also check whether you can scroll in both top and bottom directions using the `y` specifier to specify the container's top and bottom scroll directions.

::: tip Example:

<CodePen
  user="jabo-arnold"
  slug-hash="ogYgvJb"
  title="y-scroll-state"
  :default-tab="['css','result']"
  :theme="dark"/>

You can see from the example that the table of contents will always be visible on the screen because the scroll bar can scroll both ways (top and bottom)

:::

### Stuck Queries

Stuck queries are used to inspect the element that have a `position` of `sticky` and applies styles when the element is stuck on the page.

These are great if you want to style elements that have a sticky position and you want them to have a certain style(s) when they get stuck on the page.

::: tip Example:

We'll design a simple navbar that will change its `box-shadow` when its stuck at the top of the screen.

Here, you'll set a wrapper element that wraps `nav` and makes it a container query, and also gives it a `position` of `sticky` to be able to track if it is stuck at the top of the screen.

```css
header {
  position: sticky;
  top: 0rem;
  container-type: scroll-state;
}
```

You can then define `@container` to execute when the element gets stuck on the screen:

```css
@container scroll-state(stuck:top) {
  nav {
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.55),
      0 1px 0 rgba(255, 255, 255, 0.06) inset;
    background-color: #0a0a0a;
  }
}
```

You checked for `scroll-state` behavior and then, inside the parenthesis, checked if the element with `position: sticky` is **stuck** at top of the page. If true, the background color of the `nav` changes and a `box-shadow` is added.

Final results should look like this:

<CodePen
  user="jabo-arnold"
  slug-hash="gbwEQZR"
  title="container stuck query demo"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

By default, the `nav` doesn't have a `box-shadow`, but when you scroll and the `nav` element gets stuck at the top of the page, `box-shadow` and other rules defined within the stuck `@container` query definition will be applied to the `nav` element.

---

## Wrapping Up

In this article, you learned how to set up and work with container queries to make more customizable and responsive designs, and some cool scroll effects.

The examples provided in this guide are not the only things you can do with container queries. The examples were designed to help you think of other alternatives and contexts where you can apply container queries to match your exact needs and design.

Container queries have high browser support, which is currently at 95% and supported in all major browsers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Responsive Designs and Scroll Effects with CSS Container Queries",
  "desc": "Container queries let you target specific sections of your webpage and apply styles to create customizable, responsive designs based on the container's size rather than that of the viewport. This guid",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-responsive-designs-and-scroll-effects-with-css-container-queries.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
