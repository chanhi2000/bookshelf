---
lang: en-US
title: "Improve Your Type Safety with Branded Types"
description: "Article(s) > Improve Your Type Safety with Branded Types"
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
      content: "Article(s) > Improve Your Type Safety with Branded Types"
    - property: og:description
      content: "Improve Your Type Safety with Branded Types"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/improve-your-type-safety-with-branded-types.html
prev: /programming/ts/articles/README.md
date: 2023-05-15
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
  name="Improve Your Type Safety with Branded Types"
  desc="Branded types in TypeScript can help catch programming errors early by ensuring that values meet certain criteria before they are used. To create a branded type, you add a readonly property to an existing type. Branded types are especially useful when combined with assertion functions, which validate inputs and assert the branded type after successful validation."
  url="https://typescript.tv/best-practices/improve-your-type-safety-with-branded-types"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Branded types in TypeScript can help catch programming errors early by ensuring that values meet certain criteria before they are used. To create a branded type, you add a readonly property to an existing type. Branded types are especially useful when combined with assertion functions, which validate inputs and assert the branded type after successful validation.

**Branded types** can help catch programming errors early in the development process by preventing values that don't meet certain criteria from being passed into functions or used in certain contexts. They are a form of defensive coding in TypeScript and can ensure type validation.

---

## Creating a Branded Type

To create a branded type in TypeScript, you start with an existing type and add a readonly property to it. This property is typically named `__brand`, `__kind`, or `__type`. Since this property is readonly, it's not possible to directly annotate a variable with this type.

::: tip Example

```ts
type PositiveNumber = number & { __brand: 'PositiveNumber' };
 
function divide(a: number, b: PositiveNumber) {
  return a / b;
}
 
const x: PositiveNumber = 10; // Error: 'number' is not assignable to 'PositiveNumber'
divide(100, x);
```

:::

---

## Using a Branded Type

Branded types are particularly powerful when used with assertion functions, which can validate an input and assert the branded type after successful validation. In the code below, you can only pass the variable `x` to the `divide` function after it has passed the `assertPositive` check.

::: tip Example

```ts
// PositiveNumber is a regular type connected with a custom "brand"
type PositiveNumber = number & { __brand: 'PositiveNumber' };
 
// The "divide" function requires "b" to be of type "PositiveNumber"
function divide(a: number, b: PositiveNumber) {
  return a / b;
}
 
// The assertion function returns a type predicate (is PositiveNumber)
// It converts any input into the "PositiveNumber" type if it passes the check
function assertPositiveNumber(x: unknown): asserts x is PositiveNumber {
  if (typeof x === 'number' && x < 0) {
    throw new Error('Number is not greater zero');
  }
}
 
const x = 10;
// After passing this check, "x" becomes "PositiveNumber"
assertPositiveNumber(x);
// A variable of type "PositiveNumber" can now be used with "divide"
divide(100, x); // OK!
```

:::

This way you can rest assured that your variables and arguments will always be validated before being passed around.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Improve Your Type Safety with Branded Types",
  "desc": "Branded types in TypeScript can help catch programming errors early by ensuring that values meet certain criteria before they are used. To create a branded type, you add a readonly property to an existing type. Branded types are especially useful when combined with assertion functions, which validate inputs and assert the branded type after successful validation.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/improve-your-type-safety-with-branded-types.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
