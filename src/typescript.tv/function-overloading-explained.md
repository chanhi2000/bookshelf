---
lang: en-US
title: "Function Overloading Explained"
description: "Article(s) > Function Overloading Explained"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Function Overloading Explained"
    - property: og:description
      content: "Function Overloading Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/function-overloading-explained.html
prev: /programming/ts/articles/README.md
date: 2020-11-29
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Function Overloading Explained"
  desc="This article provides a code example of a Calculator class in TypeScript that can add numbers or strings. The add method converts the inputs to numbers, adds them together, and returns the result as a number or string depending on the input types."
  url="https://typescript.tv/hands-on/function-overloading-explained"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

This article provides a code example of a Calculator class in TypeScript that can add numbers or strings. The add method converts the inputs to numbers, adds them together, and returns the result as a number or string depending on the input types.

Please write two sentences here. Yeah, two.

---

## Heading

Description of content goes here.

<VidStack src="youtube/qF_iZfc22oo" />

```ts
export type NumberLike = number | string;
 
export class Calculator {
  static add(a: number, b: number): number;
  static add(a: string, b: string): string;
  static add(a: NumberLike, b: NumberLike): NumberLike {
    const toNumber = (x: NumberLike): number => (typeof x === 'string' ? parseInt(x, 10) : x);
 
    const result = toNumber(a) + toNumber(b);
 
    if (typeof a === 'string' && typeof b === 'string') {
      return `${result}`;
    }
 
    return result;
  }
}
 
const result = Calculator.add('1', '1');
console.log(typeof result); // "string"
console.log(result); // "2"
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Function Overloading Explained",
  "desc": "This article provides a code example of a Calculator class in TypeScript that can add numbers or strings. The add method converts the inputs to numbers, adds them together, and returns the result as a number or string depending on the input types.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/function-overloading-explained.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
