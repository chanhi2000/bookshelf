---
lang: en-US
title: "Custom progress element using attr()"
description: "Article(s) > Custom progress element using attr()"
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
      content: "Article(s) > Custom progress element using attr()"
    - property: og:description
      content: "Custom progress element using attr()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/custom-progress.html
prev: /programming/css/articles/README.md
date: 2025-03-25
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/6d61f6b2.png
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
  name="Custom progress element using attr()"
  desc="Create a custom progress element with a dynamic coloration based on the value"
  url="https://css-tip.com/custom-progress/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/6d61f6b2.png"/>

Using the new `attr()` function, we can customize a progress element based on the progression. We can, for example, have a different coloration for each range of values! A single-element implementation without JavaSript.

![CSS-only Cut-out shapes using clip-path](https://css-tip.com/img/JhnYUtNu9T-699.png)

```css
progress[value] {
  --val: attr(value type(<number>));
  --max: attr(max type(<number>),1);
  
  --_p: calc(100%*var(--val)/var(--max)); /* the percentage of progression */
  --_b: 
    /* if (p < 30%) "red" */
    conic-gradient(red    0 0) 0/max(0%,30% - var(--_p)) 1%,
    /* else if (p < 60%) "orange" */
    conic-gradient(orange 0 0) 0/max(0%,60% - var(--_p)) 1%,
    /* else "green" */
    green;
}
progress[value]::-webkit-progress-value {
  background: var(--_b);
}
progress[value]::-moz-progress-bar {
  background: var(--_b);
}
```

The support is still limited (Chrome-only for now)

<CodePen
  user="t_afif"
  slug-hash="OPJwbVJ"
  title="Progress bar with dynamic coloration"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is another implementation where you can control the number of ranges and set the color for each one like an array.

```css
progress[value] {
  --n: 4; /* number of ranges */
  --c: #F04155,#F27435,#7AB317,#0D6759; /* color for each range */
  /* N=4 so we have the following ranges [0% 25%[ [25% 50%[ [50% 75%[ [75% 100%] */

  --_v: attr(value type(<number>));
  --_m: attr(max type(<number>),1);
  --_i: round(down,min(99,100*var(--_v)/var(--_m)),100/var(--n));
  --_b: linear-gradient(var(--c)) no-repeat
     0 calc(var(--_i)*var(--n)*1%/(var(--n) - 1))/100% calc(1px*infinity);
}
progress[value]::-webkit-progress-value {
  background: var(--_b);
}
progress[value]::-moz-progress-bar {
  background: var(--_b);
}
```

<CodePen
  user="t_afif"
  slug-hash="LEYJGoQ"
  title="Progress bar with dynamic coloration"
  :default-tab="['css','result']"
  :theme="dark"/>

For better support check the following method: [**Progress bar with dynamic coloration**](/css-tip.com/progress-bar-dynamic-color.md)

---

---

## More CSS Tips

- [**Polygon shapes with rounded corners**](/css-tip.com/rounded-polygon.md) Use modern CSS and Sass to generate the code of rounded polygon shapes. April 17, 2025
- [**Hexagon shapes with rounded corners**](/css-tip.com/rounded-hexagon.md) Use the new shape() function to create a hexagon shape with rounded corners. April 16, 2025
- [**Split and assemble an image using CSS mask**](/css-tip.com/assemble-image.md) A few lines of code to create a fancy reveal animation for images. March 18, 2025
- [**An infinite logos animation**](/css-tip.com/infinite-logos-animation.md) Using the offset property to create a CSS-only infinite logos animation. March 13, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom progress element using attr()",
  "desc": "Create a custom progress element with a dynamic coloration based on the value",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/custom-progress.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
