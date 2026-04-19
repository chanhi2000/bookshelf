---
lang: en-US
title: "Enhancing Astro With a Markdown Component"
description: "Article(s) > Enhancing Astro With a Markdown Component"
icon: iconfont icon-astro
category:
  - Node.js
  - Astro
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - node
  - nodejs
  - node-js
  - astro
  - astrojs
  - astro-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Enhancing Astro With a Markdown Component"
    - property: og:description
      content: "Enhancing Astro With a Markdown Component"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/astro-markdown-component.html
prev: /programming/js-astro/articles/README.md
date: 2026-04-22
isOriginal: false
author:
  - name: Zell Liew
    url: https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/markdown-astro.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Astro > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-astro/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Enhancing Astro With a Markdown Component"
  desc="I use a Markdown Component for two main reasons: (1) It reduces the amount of markup I need to write, and (2) it converts typographic symbols. Here's how it works."
  url="https://css-tricks.com/astro-markdown-component"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/markdown-astro.webp"/>

There are two ways to enhance Markdown in an Astro project:

1. [**Through MDX**](/css-tricks.com/markdown-astro.md#)
2. Through a Markdown Component

This article focuses on the Markdown Component.

---

## Why Use a Markdown Component

I use a Markdown Component for two main reasons:

1. It reduces the amount of markup I need to write.
2. It converts typographic symbols like `'` to opening or closing quotes (`'` or `'`).

So, I can skip several HTML tags — like `<p>`, `<strong>`, `<em>`, `<ul>`, `<ol>`, `<li>`, and `<a>`. I can also skip heading tags if I don’t need to add classes to them.

```jsx
<div class="card">
  <!-- prettier-ignore -->
  <Markdown>
    ## Card Title
    This is a paragraph with **strong** and *italic* text.
    This is the second paragraph with a [link](https://link-somewhere.com)

    - List
    - Of
    - Items
  </Markdown>
</div>
```

Notice the `prettier-ignore` comment? It tells prettier not to format the contents within the `<Markdown>` block so Prettier won’t mess up my Markdown content.

The HTML output will be as follows:

```html
<div class="card">
  <h2> Card Title </h2>
  <p>This is a paragraph with <strong>strong</strong> and <em>italic</em> text.</p>
  <p>This is the second paragraph with a <a href="https://link-somewhere.com">link</a></p>

  <ul>
    <li> List </li>
    <li> Of </li>
    <li> Items </li>
  </ul>
</div>
```

---

## Installing the Markdown Component

Fun Fact: Astro came with a `<Markdown>` component in its early release, but this `<Markdown>` component was [<VPIcon icon="iconfont icon-astro"/>migrated to a separate plugin in Version 1](https://docs.astro.build/en/guides/upgrade-to/v1/#markdown--component-removed), and [<VPIcon icon="iconfont icon-astro"/>completely removed in version 3](https://docs.astro.build/en/guides/upgrade-to/v3/#removed-markdown--component).

I was upset about it. But I decided to build a Markdown component for myself since I liked using one. [<VPIcon icon="fas fa-globe"/>You can the documentation here](https://splendidlabz.com/docs/astro/components/markdown/#features).

Using the Markdown component is simple: Just import and use it in the way I showed you above.

```mdx
---
import { Markdown } from '@splendidlabz/astro'
---

<Markdown>
  ...
</Markdown>
```

---

## Respects Indentation Automatically

You can write your Markdown naturally, as if you’re writing content normally. This Markdown component detects the indentation and outputs the correct values (without wrapping them in `<pre>` and `<code>` tags).

```jsx
<div>
  <div>
    <!-- prettier-ignore -->
    <Markdown>
      This is a paragraph

      This is a second paragraph
    </Markdown>
  </div>
</div>
```

Here’s the output:

```html
<div>
  <div>
    <p>This is a paragraph</p>
    <p>This is a second paragraph</p>
  </div>
</div>
```

---

## Inline Option

There’s an `inline` option that tells the `<Markdown>` component not to generate paragraph tags.

```jsx
<h2 class="max-w-[12em]">
  <Markdown inline> Ain't this cool? </Markdown>
</h2>
```

Here’s the output:

```html
<h2 class="max-w-[12em]">
  Ain't this cool?
</h2>
```

---

## Gotchas and Caveats

Prettier messes up the `<!-- prettier-ignore -->` block if you have unicode characters like emojis and em dashes anywhere before the block.

Here’s the original code:

```jsx
<!-- prettier-ignore -->
<Markdown>
  Markdown block that contains Unicode characters 🤗
</Markdown>

<!-- prettier-ignore -->
<Markdown>
  Second Markdown block.
</Markdown>
```

Here’s what it looks like after saving:

```jsx
<!-- prettier-ignore -->
<Markdown>
  Markdown block that contains unicode characters 🤗
</Markdown>

<!-- prettier-ignore -->
<Markdown>
  Second Markdown block.
</Markdown>
```

Unfortunately, we can’t do much about emojis because the issue stems from Prettier’s formatter.

But, we can use `en` and `em` dashes by writing `--` and `---`, respectively.

---

## Content Workaround

You can prevent Prettier from breaking all those `<!-- prettier-ignore -->` comments by not using them!

To do this, you just put your content inside a `content` property. No need to worry about whitespace as well — that’s taken care of for you.

```jsx
<Markdown content=`
  This is a paragraph

  This is another paragraph
`/>
```

Personally, I think it doesn’t look at nice as slot version above…

But it lets you use markdown directly with any JS or json content you load!

```mdx
---
const content = `
  This is a paragraph

  This is another paragraph
`
---

<Markdown {content} />
```

---

## Taking it Further

I’ve been building with Astro for 3+ years, and I kept running into the same friction points on content-heavy sites: blog pages, tag pages, pagination, and folder structures that get messy over time.

So I built [<VPIcon icon="fas fa-globe"/>Practical Astro: Content Systems](https://zellwk.com/courses/practical-astro/content-systems/) — 7 ready-to-use solutions for Astro content workflows (MDX is just one of them). You get both the code and the thinking behind it.

If you want a cleaner, calmer content workflow, check it out.

I also write about Astro Patterns and Using Tailwind + CSS together on [<VPIcon icon="fas fa-globe"/>my blog](https://zellwk.com/newsletter/css-tricks/). Come by and say hi!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Enhancing Astro With a Markdown Component",
  "desc": "I use a Markdown Component for two main reasons: (1) It reduces the amount of markup I need to write, and (2) it converts typographic symbols. Here's how it works.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/astro-markdown-component.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
