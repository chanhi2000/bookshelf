---
lang: en-US
title: "How to correctly use if() in CSS"
description: "Article(s) > How to correctly use if() in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tip.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to correctly use if() in CSS"
    - property: og:description
      content: "How to correctly use if() in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/inline-if.html
prev: /programming/css/articles/README.md
date: 2025-06-02
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/dd814099.png
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
  name="How to correctly use if() in CSS"
  desc="Learn how to easily fix an issue you will face when using if()"
  url="https://css-tip.com/inline-if/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/dd814099.png"/>

CSS is adding a new way to express conditions using an [`if()` syntax (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10064#issuecomment-2165157958). While it looks easy to use, there is a gotcha you should be aware of. Take the example below:

```css
.box {
  --n: 6; /* We define 6 */
  
  --f: calc(var(--n)/2); /* the result is 3 */
  background: if(style(--f: 3): red; else: green); /* We get a red color */
}
```

The color is `red`, right? No, it's `green`! For the browser the value of `--f` is equal to `calc(var(--n)/2)` (no calculation are made)

<CodePen
  user="t_afif"
  slug-hash="dPoMeOB"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This can be confusing but the fix is quite easy. You have to register the value using `@property` so the browser can perform the calculation. Otherwise, the browser will see the value as it is (It's like a string value).

```css
@property --f {
  syntax: "<number>";
  inherits: false;
  initial-value: 0; 
}

.box {
  --n: 6; /* We define 6 */
  
  --f: calc(var(--n)/2); /* the result is 3 */
  background: if(style(--f: 3): red; else: green); /* We get a red color */
}
```

<CodePen
  user="t_afif"
  slug-hash="zxGqjwm"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The registration is not required if there is no calculation and you want an exact matching like the below examples:

```css
.box {
  --f: error; 
  background: if(style(--f: error): red; else: green);
}

.box {
  --v: 0;
  background: if(style(--v: 0): red; else: green);
}
```

---

## More CSS Tips

- [**Dots loader using shape()**](/css-tip.com/dots-loader.md) A classic 3 dots loader created using the new shape(). June 24, 2025
- [**The future of hexagon shapes**](/css-tip.com/hexagon.md) A new way to easily create hexagon shapes using corner-shape. June 12, 2025
- [**Arc shape with rounded edges**](/css-tip.com/arc-shape-rounded.md) A modern way to create arc shapes with rounded edges using minimal code. May 20, 2025
- [**SVG to CSS Shape Converter**](/css-tip.com/svg-to-css.md) The easiest way to convert an SVG shape into a CSS one. May 12, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to correctly use if() in CSS",
  "desc": "Learn how to easily fix an issue you will face when using if()",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/inline-if.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
