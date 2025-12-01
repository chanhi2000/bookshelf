---
lang: en-US
title: "Conditions for CSS Calculations"
description: "Article(s) > Conditions for CSS Calculations"
icon: 
category:
  - 
  - Article(s)
tag:
  - blog
  - bram.us
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Conditions for CSS Calculations"
    - property: og:description
      content: "Conditions for CSS Calculations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/conditions-for-css-calculations.html
prev: /articles/README.md
date: 2017-01-17
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: 
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Conditions for CSS Calculations",
  "desc": "In CSS we have feature queries (@supports) available to create if–else-like structs. What if we could extend our means of using conditions in CSS? Roman Komarov provides us with a clever technique – which involves using CSS Custom Properties, calc(), and some binary logic – to implementing this type of conditions on a per CSS … Continue reading ”Conditions for CSS Calculations”",
  "link": "https://bram.us/2017/01/17/conditions-for-css-calculations/",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(undefined,0.2)"
}
```

In CSS we have [feature queries (`@supports`)](https://bram.us/2016/08/27/using-feature-queries-in-css/) available to create `if`–`else`-like structs. What if we could extend our means of using conditions in CSS?

Roman Komarov provides us with a clever technique – which involves using [CSS Custom Properties](https://bram.us/2016/11/12/css-variables-var-subtitle/), `calc()`, and some binary logic – to implementing this type of conditions on a per CSS rule basis. The simplest way to explain it is to just show it:

```css
:root {
    --is-big: 0;
}

.is-big {
    --is-big: 1;
}

.block {
    padding: calc(
        25px * var(--is-big) +
        10px * (1 - var(--is-big))
    );
    border-width: calc(
        3px * var(--is-big) +
        1px * (1 - var(--is-big))
    );
}
```

The lines where `* var(--is-big)` is used are applied when the value of that CSS Variable is `1` *(true)*. The lines where `* (1 - var(--is-big))` is used are applied when said value is `0` *(false)*.

In the example above it’d be much easier/better to define two different CSS blocks (one for just `.block`, and one for `.block.is-big` *(or `.is-big .block` depending on the HTML structure)*). Perhaps some scenarios where [JavaScript changes the value of a CSS variable](https://bram.us/2016/11/12/css-variables-var-subtitle/) could provide us with a few interesting use cases.

[Conditions for CSS Variables →](http://kizu.ru/en/fun/conditions-for-css-variables/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Conditions for CSS Calculations",
  "desc": "In CSS we have feature queries (@supports) available to create if–else-like structs. What if we could extend our means of using conditions in CSS? Roman Komarov provides us with a clever technique – which involves using CSS Custom Properties, calc(), and some binary logic – to implementing this type of conditions on a per CSS … Continue reading ”Conditions for CSS Calculations”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/conditions-for-css-calculations.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
