---
lang: en-US
title: "SVG to CSS Shape Converter"
description: "Article(s) > SVG to CSS Shape Converter"
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
      content: "Article(s) > SVG to CSS Shape Converter"
    - property: og:description
      content: "SVG to CSS Shape Converter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/svg-to-css.html
prev: /programming/css/articles/README.md
date: 2025-05-12
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/d424d66d.png
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
  name="SVG to CSS Shape Converter"
  desc="The easiest way to convert an SVG shape into a CSS one"
  url="https://css-tip.com/svg-to-css/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/d424d66d.png"/>

Do you want to convert an SVG code into CSS? Check my online generator: [<VPIcon icon="fas fa-globe"/>css-generators.com/svg-to-css](https://css-generators.com/svg-to-css/)

It will transform a shape created using `<path d="...">` into a CSS code using `clip-path: shape()`. It's responsive, and the HTML code is a single element. No need to care about the viewBox, the generator will automatically find the smallest rectangle in which the shape fits.

Example of SVG path:

```xml
<path d="M199.6,18.9c-4.3-8.9-12.5-16.4-22.3-17.8c-11.9-1.7-23.1,5.4-32.2,13.2c-9.1,7.8-17.8,16.8-29.3,20.3c-20.5,6.2-41.7-7.4-63.1-7.5C38.7,27,24.8,33,15.2,43.3c-35.5,38.2-0.1,99.4,40.6,116.2c32.8,13.6,72.1,5.9,100.9-15c27.4-19.9,44.3-54.9,47.4-88.6c0.2-2.7,0.4-5.3,0.5-7.9C204.8,38,203.9,27.8,199.6,18.9z"></path>
```

It will get converted to:

```css
.shape {
  aspect-ratio: 1.233;
  clip-path: shape(from 97.54% 10.91%,curve by -10.93% -10.76% with -2.11% -5.38%/-6.13% -9.91%,curve by -15.78% 7.98% with -5.83% -1.03%/-11.32% 3.26%,curve by -14.36% 12.27% with -4.46% 4.71%/-8.72% 10.15%,curve by -30.93% -4.53% with -10.05% 3.75%/-20.44% -4.47%,curve to 7.15% 25.66% with 18.67% 15.81%/11.86% 19.43%,curve by 19.9% 70.23% with -17.4% 23.09%/-0.05% 60.08%,curve by 49.46% -9.07% with 16.08% 8.22%/35.34% 3.57%,curve by 23.23% -53.55% with 13.43% -12.03%/21.71% -33.18%,curve by 0.25% -4.77% with 0.1% -1.63%/0.2% -3.2%,curve to 97.54% 10.91% with 100.09% 22.46%/99.64% 16.29%,close);
}
```

Then you can apply the shape to any element of any size:

<CodePen
  user="t_afif"
  slug-hash="ZYYmNGK"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More CSS Tips

- [**How to correctly use if() in CSS**](/css-tip.com/inline-if.md) Learn how to easily fix an issue you will face when using if(). June 02, 2025
- [**How to style a broken image**](/css-tip.com/broken-image.md) Give a nice visual touch to images that fail to load. May 22, 2025
- [**A heart shape with modern CSS**](/css-tip.com/heart.md) Use the new shape() function to create a heart shape with minimal code. April 23, 2025
- [**Arrow-like Box with rounded corners**](/css-tip.com/arrow-like-box.md) Create a rectangle with a rounded triangle shape on one side. April 22, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SVG to CSS Shape Converter",
  "desc": "The easiest way to convert an SVG shape into a CSS one",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/svg-to-css.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
