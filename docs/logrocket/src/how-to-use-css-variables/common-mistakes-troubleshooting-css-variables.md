---
lang: en-US
title: "Common mistakes & troubleshooting CSS variables"
description: "Article(s) > (9/9) How to use CSS variables like a pro" 
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (9/9) How to use CSS variables like a pro"
    - property: og:description
      content: "Common mistakes & troubleshooting CSS variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/common-mistakes-troubleshooting-css-variables.html
next: /blog.logrocket.com/how-to-use-css-variables/README.md#conclusion
date: 2025-03-20
isOriginal: false
author:
  - name: Idorenyin Obong
    url : https://blog.logrocket.com/author/idorenyinobong/
cover: /assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to use CSS variables like a pro",
  "desc": "Build four simple projects to learn how CSS variables can help you write reusable, elegant code and streamline the way you build websites.",
  "link": "/blog.logrocket.com/how-to-use-css-variables/README.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to use CSS variables like a pro"
  desc="Build four simple projects to learn how CSS variables can help you write reusable, elegant code and streamline the way you build websites."
  url="https://blog.logrocket.com/how-to-use-css-variables#common-mistakes-troubleshooting-css-variables"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

Here are some common mistakes with CSS variables and how to fix them:

---

## Missing fallbacks for older browsers

Some older browsers, like IE11, do not support CSS variables, which can cause styling issues if a fallback is not provided. A common mistake is using `var(--color-primary)` without specifying an alternative. To prevent this, always include a fallback value inside `var()`, such as `var(--color-primary, #3498db)`, ensuring that a default color is applied if the variable is unavailable.

---

## Variables with media queries

CSS variables cannot be used directly in media queries, as they are not evaluated in the same way as standard values. For example, defining a variable like `--breakpoint-mobile: 600px` in `:root` and attempting to use it inside `@media (max-width: var(--breakpoint-mobile))` will not work. Instead, media queries require fixed values, so it’s best to use predefined breakpoints directly, such as `@media (max-width: 600px)`, to ensure proper functionality.

---

## Variables don’t work in certain properties (e.g.,`display`, `z-index`)

CSS variables don’t work in all properties, especially those that require integer values like `z-index` or `display`.

```css
:root {
  --display-mode: flex;
}

.container {
  display: var(--display-mode); /* Won't work */
}
```
