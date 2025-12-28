---
lang: en-US
title: "!important and CSS Custom Properties"
description: "Article(s) > !important and CSS Custom Properties"
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
      content: "Article(s) > !important and CSS Custom Properties"
    - property: og:description
      content: "!important and CSS Custom Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/important-and-css-custom-properties.html
prev: /programming/css/articles/README.md
date: 2026-01-01
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8128
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
  name="!important and CSS Custom Properties"
  desc="The `!important` part doesn't become part of the value, the whole declaration is treated as !important;"
  url="https://frontendmasters.com/blog/important-and-css-custom-properties/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8128"/>

This just bit me the other day so I’m going to write it down. Again, as it’s [**surprised me before**](/css-tricks.com/the-surprising-behavior-of-important-in-css-custom-property-values.md). I just think I can maybe explain it even more clearly this time.

CSS custom properties are super permissive in what values are valid. Like this is totally fine, and I sure it can get much weirder:

```css
--whats-up: (👍🏻ᴗ _ᴗ)👍🏻;
```

So my brain extends that to think that *this also* is a complete valid value:

```css
--color: orange !important;
```

Like the value of `--color` is `orange !important`;

But it’s not! The value is just `orange` and the declaration itself is “important”. Hopefully this graphic makes it even more clear:

![A graphic explaining CSS custom properties, highlighting the difference between the value and the declaration, with emphasis on the statement '--color: orange !important;' and clarifications in colorful text.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/Screenshot-2026-01-01-at-7.11.02-AM.png?resize=1024%2C860&ssl=1)

This can come up when there are multiple declarations that apply to the same element. Normally specificity and source order help sort out which declaration wins, but just as `!important` always does, an `!important` declaration trumps those other things.

So say you have a:

```html
<div class="greeting">Hello</div>
```

Then two selector blocks:

```css
div {
  --color: red !important;
}

.greeting {
  --color: blue;
  color: var(--color);
}
```

Even though `--color` is set to `blue` right there next to where it is used with a higher-specificity selector, [the greeting will actually be `red` (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019b4d34-06d2-7bbb-9e68-f0816d7d7580). If `!important` became part of the value, `blue` would have won because the custom property declaration is more specific and would have won. But it’s the custom property declaration itself that is important-ized and thus the `red` value wins.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "!important and CSS Custom Properties",
  "desc": "The `!important` part doesn't become part of the value, the whole declaration is treated as !important;",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/important-and-css-custom-properties.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
