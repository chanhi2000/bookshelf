---
lang: en-US
title: "Astro Markdown Component Utility for Any Framework"
description: "Article(s) > Astro Markdown Component Utility for Any Framework"
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
      content: "Article(s) > Astro Markdown Component Utility for Any Framework"
    - property: og:description
      content: "Astro Markdown Component Utility for Any Framework"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/astro-markdown-component-utility-any-framework.html
prev: /programming/js-astro/articles/README.md
date: 2026-06-01
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
  name="Astro Markdown Component Utility for Any Framework"
  desc="In the previous article, I spoke about the why and how to use a Markdown component in Astro."
  url="https://css-tricks.com/astro-markdown-component-utility-any-framework"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/markdown-astro.webp"/>

In the previous article, I spoke about the [**why and how to use a Markdown component in Astro**](/css-tricks.com/astro-markdown-component.md).

Here, we’re going to expand on that and help you use Markdown everywhere — regardless of the framework you use. So, this works for React, Vue, and Svelte.

The entire process hinges on the [<VPIcon icon="fas fa-globe"/>Markdown utility](https://splendidlabz.com/docs/utils/markdown/) I’ve built for [<VPIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com/).

---

## Why This Utility?

I hit a snag when using most Markdown libraries. I naturally write Markdown content like this:

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

But since most markdown libraries don’t account for whitespace indentation, they create an output with `<pre>` and `<code>` tags.

This is because Markdown treats the indentation beyond four spaces as a code block:

```html
<div>
  <div>
    <pre><code>  This is a paragraph

      This is a second paragraph
    </code></pre>
  </div>
</div>
```

So you’re forced to strip all indentation and write it like this instead:

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

That’s hard to read and annoying to maintain.

My Markdown utility handles this whitespace issue and generates the correct HTML regardless of how your code is indented:

```html
<div>
  <div>
    <p>This is a paragraph</p>
    <p>This is a second paragraph</p>
  </div>
</div>
```

---

## Using This in Your Framework

It’s easy. You have to pass the Markdown text into the utility. If `inline` is `true`, then `markdown` will return an output without paragraph tags.

Here’s an example with Astro.

```astro
---
import { markdown } from '@splendidlabz/utils'
const { inline = false, content } = Astro.props
const slotContent = await Astro.slots.render('default')

// Process content
const html = markdown(content || slotContent, { inline })
---

<Fragment set:html={html} />
```

You can then use it like this:

```astro
<Markdown>
   <!-- Your content here -->
</Markdown>
```

Here’s another example for Svelte.

Svelte cannot read dynamic content from slots, so we can only pass it through a prop.

```svelte
<script>
  import { markdown } from '@splendidlabz/utils'
  const { content, inline = false } = $props()
  const html = markdown(content, { inline })
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html html}
```

And you can use it like this:

```svelte
<Markdown content=`
  ## This is a header

  This is a paragraph
`/>
```

It’s rather simple to build the same for React and Vue so I’d leave that up to you.

---

## Taking it Further

I’ve been building for the web — long enough to experience the frustration of doing the same things over and over again.

So I consolidated everything I use into a few simple libraries — like [<VPIcon icon="fas fa-globe"/>Splendid Utils](https://splendidlabz.com/docs/utils), and a few others for layouts, Astro and Svelte components.

I write about all of them on [<VPIcon icon="fas fa-globe"/>my blog](https://zellwk.com/newsletter/css-tricks/). Come by if you’re interested in better DX as you build your sites and apps!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Astro Markdown Component Utility for Any Framework",
  "desc": "In the previous article, I spoke about the why and how to use a Markdown component in Astro.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/astro-markdown-component-utility-any-framework.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
