---
lang: en-US
title: "CSS Type Grinding: Casting Tokens (sm|md|etc) into Useful Values (aka Style Queries without Style Queries thanks to @property)"
description: "Article(s) > CSS Type Grinding: Casting Tokens (sm|md|etc) into Useful Values (aka Style Queries without Style Queries thanks to @property)"
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
      content: "Article(s) > CSS Type Grinding: Casting Tokens (sm|md|etc) into Useful Values (aka Style Queries without Style Queries thanks to @property)"
    - property: og:description
      content: "CSS Type Grinding: Casting Tokens (sm|md|etc) into Useful Values (aka Style Queries without Style Queries thanks to @property)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-type-grinding-casting-tokens-smmdetc-into-useful-values-aka-style-queries-without-style-queries-thanks-to-property.html
prev: /programming/css/articles/README.md
date: 2022-10-14
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2022/10/css-type-grinding.gif
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
  name="CSS Type Grinding: Casting Tokens (sm|md|etc) into Useful Values (aka Style Queries without Style Queries thanks to @property)"
  desc="My favorite use case for Style Queries is the ability to change a bunch of styles based on the value of a so called “higher-order variable”. You use that variable as a switch to change a bunch of properties. @container style(--theme: dark) { .card { background: royalblue; border-color: navy; color: white; } .card button { … Continue reading ”CSS Type Grinding: Casting Tokens (sm|md|etc) into Useful Values (aka Style Queries without Style Queries thanks to @property)”"
  url="https://bram.us/bram.us/2022/10/14/css-type-grinding-casting-tokens-smmdetc-into-useful-values-aka-style-queries-without-style-queries-thanks-to-property/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2022/10/css-type-grinding.gif"/>

My favorite use case for [**Style Queries**](/bram.us/container-queries-style-queries.md) is the ability to change a bunch of styles based on the value of a so called “higher-order variable”. You use that variable as a switch to change a bunch of properties.

```css
@container style(--theme: dark) {
  .card {
    background: royalblue;
    border-color: navy;
    color: white;
  }

  .card button {
    border-color: navy;
    background-color: dodgerblue;
    color: white;
  }
}
```

Current issue with Style Queries though is that:

1. You need browser support *(which is Chrome Canary only at the time of writing)*
2. Only parent elements can be containers that children can query. There is no way to have an element be both the container and the querying child targeting self *(because: cycles)*

While the first issue should get fixed over time, the second one never will …

Last week, [Jane Ori](https://twitter.com/jane0ri/) surprised me a wonderful post that tackled the latter issue. Leveraging `@property`, they were able to implement Higher-Order Variables that work on the element itself! The technique is called *Type Grinding*:

> Type Grinding allows your design tokens (keywords, or “`<custom-ident>`” values) written in your CSS to be transformed into any other values – like `width`, `padding`, `color`, etc – without relying on anything outside of CSS.

For example, you could have a `--size` Custom Property that accepts the values `sm`, `md`, or `lg`. **Changing its value will act as a switch to change many other CSS properties, similar to Style Queries but without the need for Style Queries support!**

![](https://bram.us/wordpress/wp-content/uploads/2022/10/css-type-grinding.gif)

The full code to achieve it is detailed in the post by Jane. It starts of with registering the `--size` with only its allowed values:

```css
@property --size {
  syntax: "sm|md|lg";
  initial-value: md;
  inherits: true;
}
```

Based on the value of `--size`, it’s possible to have more properties that output a `1` or a `0`:

```css
@property --_sm-else-0 {
  syntax: "sm|<integer>";
  initial-value: 0;
  inherits: true;
}
@property --_if-sm-then-1-else-0 {
  syntax: "<integer>";
  initial-value: 1;
  inherits: true;
}

.type-grinding {
  --size: md;
  --_sm-else-0: var(--size);
  --_if-sm-then-1-else-0: var(--_sm-else-0);
}
```

With that at the base, Jane builds things up further, finally achieving the Type Grinding. Apart from being somewhat complicated, the only downside of the whole approach is that it needs `@property` support – a feature that’s only available in Chromium-based browsers at the time of writing.

If you happen to be visiting this site using Chrome, you can try it out yourself in the demo embedded below:

<CodePen
  user="propjockey"
  slug-hash="OJZZJVj"
  title="CSS-Only Badge Component via the “Type Grinding” Trick!"
  :default-tab="['css','result']"
  :theme="dark"/>

<SiteInfo
  name="New CSS Logical Properties!"
  desc="The Next Step of CSS Evolution"
  url="https://elad.medium.com/new-css-logical-properties-bc6945311ce7/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:880/1*hqumXaLjidnm_AKK5bdVxg.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Type Grinding: Casting Tokens (sm|md|etc) into Useful Values (aka Style Queries without Style Queries thanks to @property)",
  "desc": "My favorite use case for Style Queries is the ability to change a bunch of styles based on the value of a so called “higher-order variable”. You use that variable as a switch to change a bunch of properties. @container style(--theme: dark) { .card { background: royalblue; border-color: navy; color: white; } .card button { … Continue reading ”CSS Type Grinding: Casting Tokens (sm|md|etc) into Useful Values (aka Style Queries without Style Queries thanks to @property)”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-type-grinding-casting-tokens-smmdetc-into-useful-values-aka-style-queries-without-style-queries-thanks-to-property.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
