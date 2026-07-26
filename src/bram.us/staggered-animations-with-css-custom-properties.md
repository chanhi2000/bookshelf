---
lang: en-US
title: "Staggered Animations with CSS Custom Properties"
description: "Article(s) > Staggered Animations with CSS Custom Properties"
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
      content: "Article(s) > Staggered Animations with CSS Custom Properties"
    - property: og:description
      content: "Staggered Animations with CSS Custom Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/staggered-animations-with-css-custom-properties.html
prev: /programming/css/articles/README.md
date: 2020-03-10
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/03/staggered-animations.png
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
  name="Staggered Animations with CSS Custom Properties"
  desc="Paul Hebert on the Paul Hebert blog: Movement in nature doesn’t happen all at once. Imagine a flock of birds taking off, raindrops splashing on the ground, or trees bending in the wind. The magic of these moments comes from many small movements overlapping and converging. I wanted to bring this natural movement into my … Continue reading ”Staggered Animations with CSS Custom Properties”"
  url="https://bram.us/2020/03/09/staggered-animations-with-css-custom-properties/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/03/staggered-animations.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2020/03/staggered-animations.png)

Paul Hebert on the Paul Hebert blog:

> Movement in nature doesn’t happen all at once. Imagine a flock of birds taking off, raindrops splashing on the ground, or trees bending in the wind. The magic of these moments comes from many small movements overlapping and converging. I wanted to bring this natural movement into my web animations.

Instead of setting an incremental `transition-delay` on each `:nth-of-type()` element to achieve this effect, a different approach was taken: the `transition-delay` was set once and [**CSS Custom Property**](/bram.us/css-variables-var-subtitle.md) is used as a multiplier to increase that delay per element.

```html
<li class="Menu__item">
  <a href="#" class="Menu__link" style="--index: 0;">Babar</a>
</li>
<li class="Menu__item">
  <a href="#" class="Menu__link" style="--index: 1;">Dumbo</a>
</li>
<li class="Menu__item">
  <a href="#" class="Menu__link" style="--index: 2;">Echo</a>
</li>
<!-- etc. -->
```

```css
.Menu__link {
  --index: 0;
  transition-delay: calc(0.025s * var(--index));
}
```

Here’s a pen with the final result:

<CodePen
  user="phebert"
  slug-hash="QWwONMy"
  title="Staggered Animations with Custom Properties"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

<SiteInfo
  name="Staggered Animations with CSS Custom Properties"
  desc="Movement in nature doesn’t happen all at once. Imagine a flock of birds taking off, raindrops splashing on the ground, or trees bending in the wind. The magic of these moments comes from many small movements overlapping and converging. I wanted to bring this natural movement into my web animations."
  url="https://cloudfour.com/thinks/staggered-animations-with-css-custom-properties/"
  logo="https://cloudfour.com/wp-content/themes/cloudfour2022/node_modules/@cloudfour/patterns/src/assets/favicons/icon.svg"
  preview="https://cloudfour.com/wp-content/uploads/2019/12/staggered-animations-1200x0-c-default.png"/>

:::

::: note 💡

You can also [**use CSS Custom Properties as binary conditions for your styles**](/bram.us/conditions-for-css-calculations.md). Combine it with a media query such as `prefers-reduced-motion` and you can [**disable animations that way**](/bram.us/css-variables-and-reduced-motion.md).

:::

::: info 💁‍♂️

Did you know the part after the `:` for CSS Custom Properties doesn’t need to be valid CSS? It’s only until it is used that it’ll be evaluated. This fact opens up the way for [<VPIcon icon="fas fa-globe"/>currying in CSS](https://trysmudford.com/blog/currying-in-css/).

```css
:root {
  --f-2: ((2 / 16 - var(--f-foot)) * var(--f-hill));
}

body {
  font-size: calc(var(--f-2) * 16);
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Staggered Animations with CSS Custom Properties",
  "desc": "Paul Hebert on the Paul Hebert blog: Movement in nature doesn’t happen all at once. Imagine a flock of birds taking off, raindrops splashing on the ground, or trees bending in the wind. The magic of these moments comes from many small movements overlapping and converging. I wanted to bring this natural movement into my … Continue reading ”Staggered Animations with CSS Custom Properties”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/staggered-animations-with-css-custom-properties.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
