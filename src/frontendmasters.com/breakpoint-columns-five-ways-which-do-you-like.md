---
lang: en-US
title: "Breakpoint Columns, Five Ways. Which Do You Like?"
description: "Article(s) > Breakpoint Columns, Five Ways. Which Do You Like?"
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
      content: "Article(s) > Breakpoint Columns, Five Ways. Which Do You Like?"
    - property: og:description
      content: "Breakpoint Columns, Five Ways. Which Do You Like?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/breakpoint-columns-five-ways-which-do-you-like.html
prev: /programming/css/articles/README.md
date: 2025-09-12
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7153
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
  name="Breakpoint Columns, Five Ways. Which Do You Like?"
  desc="There are usually multiple ways to do the same thing on the web. Sometimes... a lot of ways. Which is "
  url="https://frontendmasters.com/blog/breakpoint-columns-five-ways-which-do-you-like/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7153"/>

You’ve got a three-column grid, but when the browser window is less than 500px wide, you break to a one-column grid. Let us review some of the ways.

---

## 1. Top-Level Media Query

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

@media (width < 500px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

Aside from the slightly-newish media query syntax there, this has deep browser support and is a classic way of achieving our goal.

::: tabs

@tab:active Advantages?

- The single top-level media query could contain other selectors so you can do more work under the logic of a single media query.

@tab Disadvantages?

- You need to repeat the `.grid` selector (more code, error prone).
- You need to repeat the `grid-template-columns` property (more code, error prone).
- The property you are changing isn’t particularly close to the original.

:::

---

## 2. Nested Media Query

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (width < 500px) {
    grid-template-columns: 1fr;
  }
}
```

:::tabs

@tab:active Advantages?

- The nesting puts the property you are changing nearby the original, helping understanding at a glance what changes.
- You don’t have to repeat the `.grid` selector.

@tab Disadvantages?

- The 500px breakpoint might be a common one where you make other changes to the design. Nesting might have you sprinkling/repeating them throughout the code rather than consolidating the changes together.

:::

---

## 3. Variablizing the Columns

```css
html {
  --cols: 1fr 1fr 1fr;
}

.grid {
  display: grid;
  grid-template-columns: var(--cols);
  @media (width < 500px) {
    --cols: 1fr;
  }
}
```

We’re continuing the nesting here, but using a custom property to store and apply the `grid-template-columns` value.

::: tabs

@tab:active Advantages?

- As a custom property set at a high level, this value could be re-used in other places.
- Don’t have to repeat the `grid-template-columns` property.

@tab Disadvantages?

- Naming things is hard.
- Sometimes custom property usage causes abstraction that is more confusing than helpful.

:::

---

## 4. Using a Custom Function

```css
@function --cols() {
  result: 1fr 1fr 1fr;
  @media (width < 500px) {
    result: 1fr;
  }
}

.grid {
  display: grid;
  grid-template-columns: --cols();
}
```

Newfangled CSS! Custom value functions return a single value, and thus can be used to abstract away logic.

::: tabs

@tab:active Advantages?

- Abstracted away logic can make the more declarative design block easier to read.
- Like a custom property, the function can be re-used.

@tab Disadvantages?

- Very low browser support so far.
- Abstraction doesn’t always mean more understandable code.
- Unfortunate you can’t pass an argument for the media query size.

:::

---

## 5. Custom Function + `if()`

```css
@function --cols() {
  result: if(
    media(width < 500px): 1fr;
    else: 1fr 1fr 1fr;
  )
}

.grid {
  display: grid;
  grid-template-columns: --cols();
}
```

Even more newfangled CSS! (Also, you could imagine using `if()` alone for `grid-template-columns` without the custom function I’m sure.)

::: tabs

@tab:active Advantages?

- The custom function doesn’t need two `result` properties which could be a smidge confusing.
- The more conditions there are, they more terse and nice feeling the `if()` syntax looks.

@tab Disadvantages?

- Very low browser support, especially combining two brand new features.
- So friggin fancy it nearly breaks my old eyes.

:::

So?!

What do you think? What is your favorite here? Or do you have an alternate entry?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Breakpoint Columns, Five Ways. Which Do You Like?",
  "desc": "There are usually multiple ways to do the same thing on the web. Sometimes... a lot of ways. Which is ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/breakpoint-columns-five-ways-which-do-you-like.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
