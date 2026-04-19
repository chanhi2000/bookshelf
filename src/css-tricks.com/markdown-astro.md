---
lang: en-US
title: "Markdown + Astro = ❤️"
description: "Article(s) > Markdown + Astro = ❤️"
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
      content: "Article(s) > Markdown + Astro = ❤️"
    - property: og:description
      content: "Markdown + Astro = ❤️"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/markdown-astro.html
prev: /programming/js-astro/articles/README.md
date: 2026-04-20
isOriginal: false
author:
  - name: Zell Liew
    url: https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/mdx-astro.webp
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
  name="Markdown + Astro = ❤️"
  desc="Although Astro has built-in support for Markdown via .md files, I'd argue that your Markdown experience can be enhanced with MDX."
  url="https://css-tricks.com/markdown-astro"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/mdx-astro.webp"/>

Markdown is a great invention that lets us write less markup. It also handles typographical matters like converting straight apostrophes (`'`) to opening or closing quotes (`'` or `'`) for us.

Although Astro has built-in support for Markdown via `.md` files, I’d argue that your Markdown experience can be enhanced in two ways:

1. MDX
2. Markdown Component

I’ve cover these in depth in [<VPIcon icon="fas fa-globe"/>Practical Astro: Content Systems](https://zellwk.com/courses/practical-astro/content-systems/).

We’re going to focus on MDX today.

---

## MDX

[<VPIcon icon="fas fa-globe"/>MDX](https://mdxjs.com) is a superset of Markdown. **It lets you use components in Markdown** and simple JSX in addition to all other Markdown features.

For Astro, you can also use components from any frontend framework that you have installed. So you can do something like:

```mdx
---
# Frontmatter...
---

import AstroComp from '@/components/AstroComp.astro'
import SvelteComp from '@/components/AstroComp.astro'

<AstroComp> ... </AstroComp>
<SvelteComp> ... </SvelteComp>
```

It can be a great substitute for content-heavy stuff because it lets you write markup like the following.

```html
<div class="card">
  ## Card Title

  Content goes here

  - List
  - Of
  - Items

  Second paragraph
</div>
```

Astro will convert the MDX into the following HTML:

```html
<div class="card">
  <h2>Card Title</h2>

  <p>Content goes here </p>

  <ul>
    <li> List </li>
    <li> Of </li>
    <li> Items </li>
  </ul>

  <p>Second paragraph</p>
</div>
```

::: info Notice what I did above:

- I used `##` instead of a full `h2` tag.
- I used `-` instead of `<ul>` and `<li>` to denote lists.
- I didn’t need any paragraph tags.

:::

Writing the whole thing in HTML directly would have been somewhat of a pain.

---

## Installing MDX

Astro folks have built an integration for MDX so it’s easy-peasy to add it to your project. Just follow [<VPIcon icon="iconfont icon-astro"/>these instructions](https://docs.astro.build/en/guides/integrations-guide/mdx/#installation).

---

## Three Main Ways to Use MDX

These methods also work with standard Markdown files.

1. Import it directly into an Astro file
2. Through content collections
3. Through a layout

### Import it Directly

The first way is simply to import your MDX file and use it directly as a component.

```mdx
---
import MDXComp from '../components/MDXComp.mdx'
---

<MDXComp />
```

Because of this, MDX can kinda function like a partial.

### Through Content Collections

First, you feed your MDX into a content collection. Note that you have to add the `mdx` pattern to your glob here.

### Import it directly

The first way is simply to import your MDX file and use it directly as a component.

```js title="content.config.js"
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
});

export const collections = { blog };
```

Then you retrieve the MDX file from the content collection.

```mdx
---
import { getEntry, render } from 'astro:content'
const { slug } = Astro.props
const post = await getEntry('blog', slug)
const { Content } = await render(post)
---

<Content />
```

As you’re doing this, **you can pass components into the MDX files** so you don’t have to import them individually in every file.

For example, here’s how I would pass the [<VPIcon icon="fas fa-globe"/>`Image`](https://splendidlabz.com/docs/astro/components/image/) component from [<VPIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com) into each of my MDX files.

```mdx
---
import { Image } from '@splendidlabz/astro'
// ...
const { Content } = await render(post)
const components = { Image }
---

<Content {components} />
```

In my MDX files, I can now use `Image` without importing it.

```jsx
<Image src="..." alt="..." />
```

---

## Use a Layout

Finally, you can add a layout frontmatter in the MDX file.

```mdx
---
title: Blog Post Title
layout: @/layouts/MDX.astro
---
```

This `layout` frontmatter should point to an Astro file.

In that file:

- You can extract frontmatter properties from `Astro.props.content`.
- The MDX content can be rendered with `<slot>`.

```mdx
---
import Base from './Base.astro'
const props = Astro.props.content
const { title } = props
---

<Base>
  <h1>{title}</h1>
  <slot />
</Base>
```

---

## Caveats

### Formatting and Linting Fails

ESLint and Prettier don’t format MDX files well, so you’ll end up manually indenting most of your markup.

This is fine for small amounts of markup. But if you have lots of them… then the Markdown Component will be a much better choice.

More on that in another upcoming post.

### RSS Issues

The [<VPIcon icon="iconfont icon-astro"/>Astro RSS integration](https://docs.astro.build/en/recipes/rss/) doesn’t support MDX files out of the box.

Thankfully, this can be handled easily with Astro containers. I’ll show you how to do this in [<VPIcon icon="fas fa-globe"/>Practical Astro](https://zellwk.com/courses/practical-astro/).

---

## Taking it Further

I’ve been building with Astro for 3+ years, and I kept running into the same friction points on content-heavy sites: blog pages, tag pages, pagination, and folder structures that get messy over time.

So I built [<VPIcon icon="fas fa-globe"/>Practical Astro: Content Systems](https://zellwk.com/courses/practical-astro/content-systems/), 7 ready-to-use solutions for Astro content workflows (MDX is just one of them). You get both the code and the thinking behind it.

If you want a cleaner, calmer content workflow, check it out.

I also write about Astro Patterns and Using Tailwind + CSS together on [<VPIcon icon="fas fa-globe"/>my blog](https://zellwk.com/newsletters/css-tricks/). Come by and say hi!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Markdown + Astro = ❤️",
  "desc": "Although Astro has built-in support for Markdown via .md files, I'd argue that your Markdown experience can be enhanced with MDX.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/markdown-astro.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
