---
lang: en-US
title: "Enumberable vs. Iterable in TypeScript: What's the Difference?"
description: "Article(s) > Enumberable vs. Iterable in TypeScript: What's the Difference?"
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
      content: "Article(s) > Enumberable vs. Iterable in TypeScript: What's the Difference?"
    - property: og:description
      content: "Enumberable vs. Iterable in TypeScript: What's the Difference?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/enumberable-vs-iterable-in-typescript-whats-the-difference.html
prev: /programming/ts/articles/README.md
date: 2024-01-11
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
  name="Enumberable vs. Iterable in TypeScript: What's the Difference?"
  desc="In TypeScript, ”enumerable” and ”iterable” are terms used to describe different aspects of data collections. Enumerable refers to an object's properties that can be counted or iterated over using a `for...in` loop. Iterable, on the other hand, refers to an object that can be traversed through its elements one by one using a `for...of` loop."
  url="https://typescript.tv/hands-on/enumberable-vs-iterable-in-typescript-whats-the-difference"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

In TypeScript, "enumerable" and "iterable" are terms used to describe different aspects of data collections. Enumerable refers to an object's properties that can be counted or iterated over using a `for...in` loop. Iterable, on the other hand, refers to an object that can be traversed through its elements one by one using a `for...of` loop.

In TypeScript, the terms "iterable" and "enumerable" are often used interchangeably when dealing with data collections. However, they do have distinct nuances.

---

## Enumerables

- Enumerable refers to an object's property that can be counted or iterated over. It is more related to the concept of properties within an object.
- When an object is said to be enumerable, it means that its properties can be enumerated using a `for...in` loop.
- Enumerable properties are usually associated with objects rather than collections like arrays.

::: tip Example

```ts
const person = { name: 'Benny', age: 36, city: 'Berlin' };
for (let key in person) {
  console.log(key, person[key]);
}
```

:::

---

## Iterables

- An iterable is an object that can be iterated over. It means you can traverse through its elements one by one.
- When an object is said to be iterable, it means that it can be iterated over using a `for...of` loop.
- Iterable objects in TypeScript must implement the `Symbol.iterator` method, which returns an [**iterator**](/typescript.tv/understanding-generators-iterators-and-iterables.md#iterator-objects).
- Examples of iterables include Arrays, Strings, Maps, Sets, etc.

::: tip Example

```ts
const array: number[] = [1, 2, 3];
for (let item of array) {
  console.log(item);
}
```

:::

In this example, the array is iterable, and the `for...of` loop can iterate over its elements.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Enumberable vs. Iterable in TypeScript: What's the Difference?",
  "desc": "In TypeScript, ”enumerable” and ”iterable” are terms used to describe different aspects of data collections. Enumerable refers to an object's properties that can be counted or iterated over using a `for...in` loop. Iterable, on the other hand, refers to an object that can be traversed through its elements one by one using a `for...of` loop.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/enumberable-vs-iterable-in-typescript-whats-the-difference.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
