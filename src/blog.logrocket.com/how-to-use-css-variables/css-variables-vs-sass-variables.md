---
lang: en-US
title: "CSS variables vs. SASS variables"
description: "Article(s) > (6/9) How to use CSS variables like a pro" 
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
      content: "Article(s) > (6/9) How to use CSS variables like a pro"
    - property: og:description
      content: "CSS variables vs. SASS variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/css-variables-vs-sass-variables.html
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
  url="https://blog.logrocket.com/how-to-use-css-variables#css-variables-vs-sass-variables"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

The following table will help you know when to use CSS variables and preprocessor variables:

| Feature | CSS variables | Preprocessor variables |
| ---: | --- | --- |
| **Scope** | Can be dynamically modified at runtime | Compiles to static values before rendering |
| **Use cases** | Great for dynamic theming, user-controlled styles, or runtime updates | Great for working with a large-scale project that benefits from functions, mixins, and nested styles |
| **Usage** | Works directly in browsers | Requires a pre-processor like Less or SASS |
| **Performance** | Results in slightly higher runtime cost due to look up but mostly negligible in most cases | No runtime cost, but may impact load time due to larger stylesheets. |
| **Runtime update** | Can be modified easily with JavaScript | Impossible to update with JavaScript because it requires recompilation |
