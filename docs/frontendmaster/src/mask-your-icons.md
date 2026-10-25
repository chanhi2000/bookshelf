---
lang: en-US
title: "Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits"
description: "Article(s) > Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits"
    - property: og:description
      content: "Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/mask-your-icons.html
prev: /programming/css/articles/README.md
date: 2024-02-02
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/704
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
  name="Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits"
  desc="I'm a fan of just chucking SVG icons right into the HTML where you need them: <svg class=”icon icon-eye-dropper” width=”16” height=”16” viewBox=”0 0 16 16”> <path d=”...” /> <path d=”...” /> </svg> This has lots of benefits, like instant loading with no additional requests, and is 100% styleable, including all the internal parts (i.e. multicolor…"
  url="https://blog.master.dev/mask-your-icons/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/704"/>

I’m a fan of just chucking SVG icons right into the HTML where you need them:

```xml
<svg class="icon icon-eye-dropper" width="16" height="16" viewBox="0 0 16 16">
  <path d="..." />
  <path d="..." />
</svg>
```

This has lots of benefits, like instant loading with no additional requests, and is 100% styleable, including all the internal parts (i.e. multicolor icons).

<CodePen
  user="anon"
  slug-hash="JjzvGaM"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

But, putting your SVG icons in CSS can be advantageous too. [<VPIcon icon="fas fa-globe"/>This converter](https://yoksel.github.io/url-encoder/) is handy. For example:

```css
.icon-menu {
  width: 1rem; height: 1rem;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="..."/></svg>');
}
```

<CodePen
  user="anon"
  slug-hash="gOEzMPm"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

You give up some styling control there — the icon is just going to look how that SVG looks, barring stuff like `filter` and `background-blend-mode`.

The advantage here is that your icons are now cached within your CSS and shared across everywhere on your site that is using that CSS file. If you have the (rare) issue of your DOM being too big, this would help.

A minor alteration to this is to use a `mask` *instead* of `background-image` to show the icon. This actually frees up the `background` to use to color it. Still getting the caching, just a bit easier to style now.

<CodePen
  user="anon"
  slug-hash="qBvYNZB"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

David Bushell [**just blogged about this**](/dbushell.com/svg-icons-with-css-masks.md) and says:

::: info "" *From David Bushell* (<VPIcon icon="fas fa-globe"/><code>dbushell.com</code>)

This is technique perfect for:

- Button icons
- List bullet points
- Custom checkbox icons

Especically when the icon changes colour depending on interactive state, or light and dark theming, for example.

:::

```component VPCard
{
  "title": "Unlocking SVG Styling Control with CSS Linked Parameters",
  "desc": "Discover how CSS Linked Parameters transform SVG usage for icons, enhancing styling control while maintaining efficient caching and accessibility.",
  "link": "/blog.master.dev/svg-linked-parameters-will-change-how-we-do-icon-systems.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/04/search-thumb.jpg?fit=1000%2C500&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/the-html-css-and-svg-for-a-classic-search-form/ "The HTML, CSS, and SVG for a Classic Search Form")

#### [The HTML, CSS, and SVG for a Classic Search Form](https://blog.master.dev/the-html-css-and-svg-for-a-classic-search-form/ "The HTML, CSS, and SVG for a Classic Search Form")

Let's build a search form that looks like this: That feels like the absolute bowl-it-down-the-middle search form right now. Looks good but nothing fancy. And yet, coding it in HTML and CSS I don't think is perfectly intuitive and makes use of a handful of decently modern and slightly lesser…

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/09/Replace-Your-Animated-GIFs-with-SVGs.jpg?fit=1140%2C676&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/replace-your-animated-gifs-with-svgs/ "Replace Your Animated GIFs with SVGs")

#### [Replace Your Animated GIFs with SVGs](https://blog.master.dev/replace-your-animated-gifs-with-svgs/ "Replace Your Animated GIFs with SVGs")

You can animate an .svg and it will play even with an `` or `background-image`, making it a viable GIF replacement if you can pull it off!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits",
  "desc": "I'm a fan of just chucking SVG icons right into the HTML where you need them: <svg class=”icon icon-eye-dropper” width=”16” height=”16” viewBox=”0 0 16 16”> <path d=”...” /> <path d=”...” /> </svg> This has lots of benefits, like instant loading with no additional requests, and is 100% styleable, including all the internal parts (i.e. multicolor…",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/mask-your-icons.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
