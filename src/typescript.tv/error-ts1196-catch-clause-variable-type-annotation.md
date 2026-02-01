---
lang: en-US
title: "Error TS1196: Catch clause variable type annotation"
description: "Article(s) > Error TS1196: Catch clause variable type annotation"
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
      content: "Article(s) > Error TS1196: Catch clause variable type annotation"
    - property: og:description
      content: "Error TS1196: Catch clause variable type annotation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/error-ts1196-catch-clause-variable-type-annotation.html
prev: /programming/ts/articles/README.md
date: 2021-03-08
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
  name="Error TS1196: Catch clause variable type annotation"
  desc="TypeScript's compiler doesn't allow custom type annotations for errors in try-catch statements. The simplest type guard is a conditional block with an instanceof check. Other type guards are presented in this article."
  url="https://typescript.tv/best-practices/error-ts1196-catch-clause-variable-type-annotation"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript's compiler doesn't allow custom type annotations for errors in try-catch statements. The simplest type guard is a conditional block with an instanceof check. Other type guards are presented in this article.

By default, TypeScript's compiler doesn't allow you to add a custom **type annotation** to an error in a try-catch statement (**TS1196**). That's because the underlying code can throw any type of error, even system generated exceptions, which makes it impossible for TypeScript to know the **error type** from the start. Luckily, there is the concept called "**type guards**" which can help the TypeScript compiler to infer a specific type.

---

## Error TS1196

TypeScript's compiler will throw an error when you assign a custom type to an error in a catch block:

> TS1196: Catch clause variable type annotation must be 'any' or 'unknown' if specified.

To circumvent the type annotation error, you can use a **type guard**.

---

## Type Guards

A type guard is a runtime check which guarantees a type in a defined scope. There are different forms of type guards. The simplest type guard is a **conditional block** paired with an `instanceof` check:

```ts
function getNumber(something: string | number): number {
  // Type guard with "typeof"
  if (typeof something === 'string') {
    // "something" is treated here as "string"
    return parseInt(something, 10);
  } else {
    // "something" is treated here as "number"
    return something;
  }
}
```

---

## Type Predicate

A more complex type guard is a function which returns a **type predicate**. A type predicate is identified by the `is` keyword. The following code shows type-safe error handling in action:

```ts
import { AxiosError } from 'axios';
 
// Type guard with "type predicate"
function isAxiosError(candidate: unknown): candidate is AxiosError {
  if (candidate && typeof candidate === 'object' && 'isAxiosError' in candidate) {
    return true;
  }
  return false;
}
 
try {
  // ...
} catch (error: unknown) {
  if (isAxiosError(error)) {
    console.log(`Catched error code "${error.code}".`);
  }
}
```

::: info Video Tutorial

The following video shows how to use a type guard with an error object. This tip can be very useful when you want to work with the properties of an error:

<VidStack src="youtube/0GLYiJUBz6k" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Error TS1196: Catch clause variable type annotation",
  "desc": "TypeScript's compiler doesn't allow custom type annotations for errors in try-catch statements. The simplest type guard is a conditional block with an instanceof check. Other type guards are presented in this article.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/error-ts1196-catch-clause-variable-type-annotation.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
