---
lang: en-US
title: "What is Type Coercion in TypeScript?"
description: "Article(s) > What is Type Coercion in TypeScript?"
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
      content: "Article(s) > What is Type Coercion in TypeScript?"
    - property: og:description
      content: "What is Type Coercion in TypeScript?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-type-coercion-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-08-09
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
  name="What is Type Coercion in TypeScript?"
  desc="Type coercion is when one type of data is automatically changed into another type. For example, TypeScript can change a number into a string. This happens automatically to prevent errors when different types interact."
  url="https://typescript.tv/new-features/what-is-type-coercion-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Type coercion is when one type of data is automatically changed into another type. For example, TypeScript can change a number into a string. This happens automatically to prevent errors when different types interact.

**Type coercion** means that one type of data is automatically turned into another type, like when TypeScript changes a number into a string. This process is based on JavaScript's underlying mechanics and takes place automatically to ensure that interactions between different types don't cause errors.

---

## Example

If you combine a number and a string, JavaScript handles the type changes behind the scenes to ensure a string concatenation:

```ts
const number: number = 42;
const message: string = 'The answer is: ' + number; // `number` is coerced to a string
```

When the data type is manually changed (by using a method like `parseInt`), it's called **type conversion**. While type coercion and type conversion are similar, there is a clear difference. Type coercion happens implicitly, while type conversion is primarily an explicit action:

```ts
const text: string = '10';
console.log(parseInt(text)); // `text` is converted to a string
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Type Coercion in TypeScript?",
  "desc": "Type coercion is when one type of data is automatically changed into another type. For example, TypeScript can change a number into a string. This happens automatically to prevent errors when different types interact.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-type-coercion-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
