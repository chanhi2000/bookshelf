---
lang: en-US
title: "Enhancing Return Types with Function Overloading in TypeScript"
description: "Article(s) > Enhancing Return Types with Function Overloading in TypeScript"
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
      content: "Article(s) > Enhancing Return Types with Function Overloading in TypeScript"
    - property: og:description
      content: "Enhancing Return Types with Function Overloading in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/enhancing-return-types-with-function-overloading-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-05-08
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
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
  name="Enhancing Return Types with Function Overloading in TypeScript"
  desc="Function overloading in TypeScript allows you to define multiple functions with the same name but different parameters. This can be useful when you want to provide different behavior based on the arguments passed to the function. By using function overloading, you can improve the return types of your functions for different input scenarios."
  url="https://typescript.tv/new-features/enhancing-return-types-with-function-overloading-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Function overloading in TypeScript allows you to define multiple functions with the same name but different parameters. This can be useful when you want to provide different behavior based on the arguments passed to the function. By using function overloading, you can improve the return types of your functions for different input scenarios.

Function overloading allows you to define multiple functions with the same name, but with different parameters. This can be useful if you want to provide different behavior depending on the arguments that are passed to the function.

---

## Need for Function Overloading

Without function overloading, you may use a union type to handle input parameters of different formats. While this approach compiles just fine, it will lead to wider return types, as the resulting types will be a union of multiple types.

::: tip Example

```ts
function add(a: string | number, b: string | number): string | number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else {
    return `${parseInt(`${a}`, 10) + parseInt(`${b}`, 10)}`;
  }
}
 
const a = add(10, 10); // a is `string | number`
const b = add('10', '10'); // b is `string | number`
```

:::

---

## Function Overloading in Action

By using function overloading, you can improve the return types of your functions for different input scenarios. To create function overloads in TypeScript, you can use the function keyword followed by the name of the function, and then a list of parameter types in the signature. For example:

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
```

This defines two function overloads for the `add` function, one that takes two numbers and returns a number, and another that takes two strings and returns a string. Finally, you must provide a function implementation that can **handle all input parameters** from all the different function signatures you have defined:

```ts
function add(a: number, a: number): number;
function add(b: string, b: string): string;
function add(a: string | number, b: string | number): string | number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else {
    return `${parseInt(`${a}`, 10) + parseInt(`${b}`, 10)}`;
  }
}
 
const a = add(10, 10); // a is `number`
const b = add('10', '10'); // b is `string`
```

Now, when you call the `add` function, TypeScript will automatically select the correct implementation based on the types of the arguments that you pass.

::: info Video Tutorial

<VidStack src="youtube/xLa0wmolvV8" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Enhancing Return Types with Function Overloading in TypeScript",
  "desc": "Function overloading in TypeScript allows you to define multiple functions with the same name but different parameters. This can be useful when you want to provide different behavior based on the arguments passed to the function. By using function overloading, you can improve the return types of your functions for different input scenarios.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/enhancing-return-types-with-function-overloading-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
