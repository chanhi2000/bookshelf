---
lang: en-US
title: "Why You Should Be Excited About Native CSS Variables"
description: "Article(s) > Why You Should Be Excited About Native CSS Variables"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why You Should Be Excited About Native CSS Variables"
    - property: og:description
      content: "Why You Should Be Excited About Native CSS Variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/why-you-should-be-excited-about-native-css-variables.html
prev: /programming/css/articles/README.md
date: 2017-02-04
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2017/02/custom-properties-contextual-styling-1400w-768x404.png
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
  name="Why You Should Be Excited About Native CSS Variables"
  desc="With CSS Variables now being under development for Edge (the last of the modern browsers to not support it yet) it’s time to dig up this brilliant post on CSS Variables. If you’re under the impression that CSS Variables offer nothing new when compared to Preprocessor variables, then this post is a must-read for you: … Continue reading ”Why You Should Be Excited About Native CSS Variables”"
  url="https://bram.us/2017/02/03/why-you-should-be-excited-about-native-css-variables/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2017/02/custom-properties-contextual-styling-1400w-768x404.png"/>

With CSS Variables [<VPIcon icon="fas fa-globe"/>now being under development for Edge](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6261292-css-variables) *([<VPIcon icon="iconfont icon-caniuse"/>the last of the modern browsers to not support it yet](http://caniuse.com/#search=css%20variables))* it’s time to dig up this brilliant post on CSS Variables. If you’re under the impression that CSS Variables offer nothing new when compared to Preprocessor variables, then this post is a must-read for you:

> CSS preprocessors are fantastic tools, but their variables are static and lexically scoped. Native CSS variables, on the other hand, are an entirely different kind of variable: they’re dynamic, and they’re scoped to the DOM. In fact, I think it’s confusing to call them variables at all. They’re actually CSS properties, which gives them an entirely different set of capabilities and allows them to solve an entirely different set of problems.

The article first goes into detail on Preprocessor Variables and then switches over to CSS Variables, highlighting the differences and use cases where Preprocessor Variables fall short.

Say you want to style a button differenlty when it appears inside a header. Easy-peasy with CSS Variables:

```css
.Button {
  background: var(--Button-backgroundColor, #eee);
  border: 1px solid var(--Button-borderColor, #333);
  color: var(--Button-color, #333);
  /* ... */
}

.Header {
  --Button-backgroundColor: purple;
  --Button-borderColor: transparent;
  --Button-color: white;
}
```

::: info

```component VPCard
{
  "title": "Why I'm Excited About Native CSS Variables",
  "desc": "Thoughts on web development, open source, software architecture, and the future.",
  "link": "https://philipwalton.com/articles/why-im-excited-about-native-css-variables//",
  "logo": "https://philipwalton.com/static/favicon-16x16-066aacdaeb.png",
  "background": "rgba(77,179,128,0.2)"
}
```

:::

Not entirely familiar with CSS Variables? [**CSS Variables: `var(–subtitle);`**](/bram.us/css-variables-var-subtitle.md) is a good video/presentation to get you started.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why You Should Be Excited About Native CSS Variables",
  "desc": "With CSS Variables now being under development for Edge (the last of the modern browsers to not support it yet) it’s time to dig up this brilliant post on CSS Variables. If you’re under the impression that CSS Variables offer nothing new when compared to Preprocessor variables, then this post is a must-read for you: … Continue reading ”Why You Should Be Excited About Native CSS Variables”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/why-you-should-be-excited-about-native-css-variables.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
