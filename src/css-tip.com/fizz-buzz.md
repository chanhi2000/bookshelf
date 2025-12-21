---
lang: en-US
title: "Fizz Buzz using Modern CSS (no HTML)"
description: "Article(s) > Fizz Buzz using Modern CSS (no HTML)"
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
      content: "Article(s) > Fizz Buzz using Modern CSS (no HTML)"
    - property: og:description
      content: "Fizz Buzz using Modern CSS (no HTML)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/fizz-buzz.html
prev: /programming/css/articles/README.md
date: 2025-12-06
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/99ac7b18.png
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
  name="Fizz Buzz using Modern CSS (no HTML)"
  desc="A fun experiment using modern CSS to create the classic Fizz Buzz"
  url="https://css-tip.com/fizz-buzz/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/99ac7b18.png"/>

Is it possible to create a Fizz Buzz using HTML and CSS? Yes, but what about a pure CSS version, with no HTML at all? It's doable using modern features. We can even simulate a kind of slider that shows four entries at a time.

```css
html {
  --N: 1000; /* the maximum number */
}
:is(html, body):before,
:is(html, body):after {
  counter-reset: n var(--n);
  animation: --n calc(var(--N) * 1s) linear both;
  --x: sign(mod(var(--n), 3)); /* 0 if divisible by 3 (1 otherwise) */
  --y: sign(mod(var(--n), 5)); /* 0 if divisible by 5 (1 otherwise) */
  content: if(
    style((--x: 0) and (--y: 0)): "FizzBuzz" ; /* divisible by 3 and 5 */
      style((--x: 0) and (--y: 1)): "Fizz" ; /* divisible by 3 and not 5 */
      style((--x: 1) and (--y: 0)): "Buzz" ; /* divisible by 5 and not 3 */ else:
      counter(n) ;
  );
}
@keyframes --n {to {--n: var(--N);}}
body:before {animation-delay: -1s;}
body:after {animation-delay: -2s;}
html:after {animation-delay: -3s;}

```

::: note ⚠️

A Chrome-only experiment for now

<CodePen
  user="t_afif"
  slug-hash="zxqMRWr"
  title="CSS-only Fizz Buzz (no HTML)"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

We can get fancier with an animated version!

<CodePen
  user="t_afif"
  slug-hash="gbrQeMq"
  title="CSS-only animated Fizz Buzz (no HTML)"
  :default-tab="['css','result']"
  :theme="dark"/>

Inspired by <VPIcon icon="fas fa-globe"/>["Fizz Buzz"](https://susam.net/fizz-buzz-in-css.html)

```component VPCard
{
  "title": "Fizz Buzz in CSS - Susam Pal",
  "desc": "How many CSS selectors and declarations do we need to produce the Fizz Buzz sequence? Of course we could do this with no CSS at all simply by placing the entire sequence as text in the HTML body. So to make the problem precise as well as to keep it interesting, we require that all text that appears in the Fizz Buzz sequence comes directly from the CSS. Placing any part of the output numbers or words outside the stylesheet is not allowed. JavaScript is not allowed either. With these constraints, I think we need at least four CSS selectors along with four declarations to solve this puzzle, as shown below",
  "link": "https://susam.net/fizz-buzz-in-css.html/",
  "logo": "https://susam.net/favicon.png",
  "background": "rgba(244,245,255,0.2)"
}
```

---

## More CSS Tips

- [**Gallery of Skewed Images with Hover Effect**](/css-tip.com/skewed-images.md) Using modern CSS and corner-shape to add a fancy gallery of images with a reveal hover effect. December 02, 2025
- [**Direction-Aware CSS Shapes**](/css-tip.com/direction-aware-shapes.md) A few lines of code to make any CSS shape adjust according to the direction of the text. November 27, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fizz Buzz using Modern CSS (no HTML)",
  "desc": "A fun experiment using modern CSS to create the classic Fizz Buzz",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/fizz-buzz.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
