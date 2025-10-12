---
lang: en-US
title: "Rainbow Selection in CSS"
description: "Article(s) > Rainbow Selection in CSS"
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
      content: "Article(s) > Rainbow Selection in CSS"
    - property: og:description
      content: "Rainbow Selection in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/rainbow-selection-in-css.html
prev: /programming/css/articles/README.md
date: 2025-02-14
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5194
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
  name="Rainbow Selection in CSS"
  desc="::selection is cool, but scoping it to selectors like :nth-child(5n+2) is even more fun, especially on a love filled ay like Valentine's Day."
  url="https://frontendmasters.com/blog/rainbow-selection-in-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5194"/>

There is a `::selection` pseudo class selector in CSS that allows you to style what content (mostly: text) looks like when it’s selected.

Say your website has pretty strong orange-colored branding, you could use this to extend the feel of that branding.

![Geoff Grahams website with the first few words of a paragraph selected. The selected text has an orange background color, just like the border of the whole site.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/Screenshot-2025-02-14-at-7.30.26%E2%80%AFAM.png?resize=1024%2C387&ssl=1)

```css
html {
  --brandColor: orange;
}
::selection {
  background-color: var(--brandColor);
}
```

There is really only a couple of things you can set on `::selection` (see the <VPIcon icon="fa-brands fa-firefox"/>[allowable properties](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection#allowable_properties) bit on MDN), which makes sense. You wouldn’t want to be changing `font-size` on selection or anything like that as it would get messy quickly.

I was on the [<VPIcon icon="fas fa-globe"/>Lit documentation](https://lit.dev/docs/) site the other day and highlighted some text and saw this:

![Lit documentation site with 5 paragraphs of text selected, each with slightly different hues of greens and blues as backgrounds.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/lit.png?resize=1024%2C895&ssl=1)

At first I wasn’t even sure if it was intentional, but I sure thought it was neat! I figured it was just `:nth-child()` trickery where you hang `::selection` off the end of it. Like:

```css
:nth-child(5n)::selection {
  background: oklch(70% 0.111 0 / 72.27%)
}
:nth-child(5n+1)::selection {
  background: oklch(70% 0.111 40 / 72.27%)
}
:nth-child(5n+2)::selection {
  background: oklch(70% 0.111 80 / 72.27%)
}
:nth-child(5n+3)::selection {
  background: oklch(70% 0.111 120 / 72.27%)
}
:nth-child(5n+4)::selection {
  background: oklch(70% 0.111 160 / 72.27%)
}
```

So I made a demo of that and it works great:

<CodePen
  user="chriscoyier"
  slug-hash="qEWeWLP"
  title="Rainbow Selection"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

![No dice on iOS But it seems to work everywhere else.](https://frontendmasters.com/blog/wp-content/uploads/2025/02/Screenshot-2025-02-14-at-7.54.12 AM.png)

I did ultimately poke at the Lit site with DevTools and saw their approach was basically what I thought it was going to be. Except a little more fancy as they are using `color-mix()` with their primary colors and setting both the `color` and `background`.

If you’re thinking _why not go **full** rainbow_ like with a `linear-gradient()` like any sane thinking person is of course, unfortunately gradients are `background-image`s, which are ignored here, with only `background-color` being supported. 😭🌈

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Rainbow Selection in CSS",
  "desc": "::selection is cool, but scoping it to selectors like :nth-child(5n+2) is even more fun, especially on a love filled ay like Valentine's Day.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/rainbow-selection-in-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
