---
lang: en-US
title: "Distinguishing “Components” and “Utilities” in Tailwind"
description: "Article(s) > Distinguishing “Components” and “Utilities” in Tailwind"
icon: iconfont icon-tailwindcss
category:
  - CSS
  - TailwindCSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - tailwindcss
  - tailwind-css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Distinguishing “Components” and “Utilities” in Tailwind"
    - property: og:description
      content: "Distinguishing “Components” and “Utilities” in Tailwind"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/distinguishing-components-and-utilities-in-tailwind.html
prev: /programming/css-tailwind/articles/README.md
date: 2026-02-18
isOriginal: false
author:
  - name: Zell Liew
    url: https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/02/tailwind-paint.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TailwindCSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Distinguishing “Components” and “Utilities” in Tailwind"
  desc="The distinction between ”components” and ”utilities” seems clear at first glance, but gets a little blurred when working with them in Tailwind."
  url="https://css-tricks.com/distinguishing-components-and-utilities-in-tailwind"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/02/tailwind-paint.jpg"/>

Here’s a really quick tip. You can think of [**Tailwind utilities**](/css-tricks.com/using-css-cascade-layers-with-tailwind-utilities.md) as components — because you can literally make a `card` “component” out of Tailwind utilities.

```css
@utility card {
  border: 1px solid black;
  padding: 1rlh;
}
```

```html
<div class="card"> ... </div>
```

![A plain white rectangular box with a black border.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/card-black.png?resize=954%2C204&ssl=1)

This blurs the line between “Components” and “Utilities” so we need to better define those terms.

---

## The Great Divide — and The Great Unification

CSS developers often define Components and Utilities like this:

1. **Component** = A group of styles
2. **Utility** = A single rule

This collective thinking has emerged from the terminologies we have gathered over many years. Unfortunately, they’re not really the right terminologies.

So, let’s take a step back and consider the actual meaning behind these words.

**Component** means: A thing that’s a part of a larger whole.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/component-definition.png?resize=1752%2C824&ssl=1)

**Utility** means: It’s useful.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/utility-definition.png?resize=1762%2C832&ssl=1)

So…

- **Utilities are Components** because they’re still part of a larger whole.
- **Components are Utilities** because they’re useful.

The division between Components and Utilities is really more of a marketing effort designed to sell those utility frameworks — nothing more than that.

It. Really. Doesn’t. Matter.

---

## The meaningful divide?

Perhaps the only meaningful divide between Components and Utilities (in the way they’re commonly defined so far) is that we often want to overwrite component styles.

It kinda maps this way:

- **Components:** Groups of styles
- **Utilities:** Styles used to overwrite component styles.

Personally, I think that’s a very narrow way to define something that actually means “useful.”

---

## Just overwrite the dang style

Tailwind provides us with an incredible feature that allows us to overwrite component styles. To use this feature, you would have to:

- Write your component styles in a `components` layer.
- Overwrite the styles via a Tailwind utility.

```css
@layer components {
  .card {
    border: 1px solid black;
    padding: 1rlh;
  }
}
```

```html
<div class="card border-blue-500"> ... </div>
```

![A simple rectangular box with a blue border.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/card-blue.png?resize=884%2C196&ssl=1)

But this is a tedious way of doing things. Imagine writing `@layer components` in all of your component files. There are two problems with that:

1. You lose the ability to use Tailwind utilities as components
2. You gotta litter your files with many `@layer component` declarations — which is one extra indentation and makes the whole CSS a little more difficult to read.

There’s a better way of doing this — we can [**switch up the way we use CSS layers**](/css-tricks.com/using-css-cascade-layers-with-tailwind-utilities.md) by writing utilities as components.

```css
@utility card {
  padding: 1rlh; 
  border: 1px solid black;
}
```

Then, we can overwrite styles with another utility using [<VPIcon icon="iconfont icon-tailwindcss"/>Tailwind’s `!important` modifier](https://v3.tailwindcss.com/docs/configuration#important-modifier) directly in the HTML:

```html
<div class="card !border-blue-500"> ... </div>
```

I put together [<VPIcon icon="iconfont icon-tailwindcss"/>an example](https://play.tailwindcss.com/ugkF6Pchvz) over at the Tailwind Playground.

---

## Unorthodox Tailwind

This article comes straight from my course, [<VPIcon icon="fas fa-globe"/>Unorthodox Tailwind](https://magicaldevschool.com/courses/unorthodox-tailwind/), where you’ll learn to use CSS and Tailwind in a synergistic way. If you liked this, there’s a lot more inside: practical ways to think about and use Tailwind + CSS that you won’t find in tutorials or docs.

::: info Check it out

<SiteInfo
  name="Unorthodox Tailwind | Magical Dev School"
  desc="We help people become amazing developers who can build anything they can imagine."
  url="https://magicaldevschool.com/courses/unorthodox-tailwind//"
  logo="https://magicaldevschool.com//favicon/favicon-16x16.png"
  preview="https://magicaldevschool.com/assets/open-graph.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Distinguishing “Components” and “Utilities” in Tailwind",
  "desc": "The distinction between ”components” and ”utilities” seems clear at first glance, but gets a little blurred when working with them in Tailwind.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/distinguishing-components-and-utilities-in-tailwind.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
