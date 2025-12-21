---
lang: en-US
title: "Polygon shapes with rounded corners"
description: "Article(s) > Polygon shapes with rounded corners"
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
      content: "Article(s) > Polygon shapes with rounded corners"
    - property: og:description
      content: "Polygon shapes with rounded corners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/rounded-polygon.html
prev: /programming/css/articles/README.md
date: 2025-04-17
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/fcd30a7e.png
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
  name="Polygon shapes with rounded corners"
  desc="Use modern CSS and Sass to generate the code of rounded polygon shapes"
  url="https://css-tip.com/rounded-polygon/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/fcd30a7e.png"/>

Similar to [**the hexagon shape**](/css-tip.com/rounded-hexagon.md), here is a generic code to create any regular polygon shape with rounded corners. Powered by Sass and the new `shape()` function.

![CSS-only polygon shapes with rounded corners](https://css-tip.com/img/XOAYt9t8ba-785.png)

```scss
$n: 9; /* number of sides*/
$r: .2; /* control the radius [0 1] */
$a: 15deg; /* control the rotation */

$_r: 50%*math.cos(180deg/$n)/math.cos((180deg/$n*(1 - $r)));

.poly {
  aspect-ratio: 1;
  $m: ();
  @for $i from 0 through ($n - 1) {
    $c: line to;@if($i == 0){$c: from;}
    $m: append($m,$c 50% + $_r*math.cos(180deg*(2*$i - $r)/$n + $a)
                     50% + $_r*math.sin(180deg*(2*$i - $r)/$n + $a),comma);
    $m: append($m,curve to 50% + $_r*math.cos(180deg*(2*$i + $r)/$n + $a)
                           50% + $_r*math.sin(180deg*(2*$i + $r)/$n + $a)
      with 50%*(1 + math.cos($i*360deg/$n + $a))
           50%*(1 + math.sin($i*360deg/$n + $a)),comma);
  } 
  clip-path: shape(#{$m});
}
```

<CodePen
  user="t_afif"
  slug-hash="xbbxMdg"
  title="Polygon shapes with rounded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is another version with CSS variables in case you want to control the radius and rotation on the CSS side:

```scss
$n: 7; /* number of sides*/

.poly {
  --r: 0.25; /* control the radius [0 1] */
  --a: 10deg; /* control the rotation */
  
  aspect-ratio: 1;
  --_a: (#{180deg/$n}*var(--r));
  --_r: (50%*cos(#{180deg/$n})/cos((#{180deg/$n}*(1 - var(--r)))));
  $m: ();
  @for $i from 0 through ($n - 1) {
    $c: line to;@if($i == 0){$c: from;}
    $m: append($m,$c calc(50% + var(--_r)*cos(#{$i*360deg/$n} + var(--a) - var(--_a)))
                     calc(50% + var(--_r)*sin(#{$i*360deg/$n} + var(--a) - var(--_a))),comma);
    $m: append($m,curve to calc(50% + var(--_r)*cos(#{$i*360deg/$n} + var(--a) + var(--_a)))
                           calc(50% + var(--_r)*sin(#{$i*360deg/$n} + var(--a) + var(--_a)))
      with calc(50%*(1 + cos(#{$i*360deg/$n} + var(--a))))
           calc(50%*(1 + sin(#{$i*360deg/$n} + var(--a)))),comma);
  } 
  clip-path: shape(#{$m});
}
```

::: note ⚠️ Chrome-only for now ⚠️

<CodePen
  user="t_afif"
  slug-hash="KwwKVZr"
  title="Polygon shapes with rounded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

---

## More CSS Tips

- [**Blob shape with hover effect**](/css-tip.com/blob-hover.md) Add a blob shape to your image with a cool bouncy hover effect. April 29, 2025
- [**A heart shape with modern CSS**](/css-tip.com/heart.md) Use the new shape() function to create a heart shape with minimal code. April 23, 2025
- [**The unknown behavior of flex-wrap**](/css-tip.com/flex-wrap.md) flex-wrap doesn't only control the wrapping of items but also affects the alignment. April 14, 2025
- [**Custom progress element using attr()**](/css-tip.com/custom-progress.md) Create a custom progress element with a dynamic coloration based on the value. March 25, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Polygon shapes with rounded corners",
  "desc": "Use modern CSS and Sass to generate the code of rounded polygon shapes",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/rounded-polygon.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
