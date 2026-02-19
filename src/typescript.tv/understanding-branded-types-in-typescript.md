---
lang: en-US
title: "Understanding Branded Types in TypeScript"
description: "Article(s) > Understanding Branded Types in TypeScript"
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
      content: "Article(s) > Understanding Branded Types in TypeScript"
    - property: og:description
      content: "Understanding Branded Types in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/understanding-branded-types-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2024-07-26
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
  name="Understanding Branded Types in TypeScript"
  desc="Branded types in TypeScript help create unique types to prevent errors. By using a unique marker, type guards and assertion functions help enforce these branded types for added safety."
  url="https://typescript.tv/hands-on/understanding-branded-types-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Branded types in TypeScript help create unique types to prevent errors. By using a unique marker, type guards and assertion functions help enforce these branded types for added safety.

Branded types, also known as "nominal typing," allow you to create distinct types that cannot be mixed with other types, even if their underlying structures are the same. This is particularly useful when you want to prevent logical errors that type checks do not catch.

---

## Problem Statement

In the code example below, the `divide` function can accept any number for both parameters. This poses a risk of division by zero if the value of `b` is zero, which can lead to unintended consequences like returning "Infinity":

```ts
function divide(a: number, b: number) {
  return a / b;
}
 
const b = 0;
console.log(divide(100, b)); // shows "Infinity"
```

By implementing branded types, we can avoid the accidental use of `0` for `b` at the type level, enhancing type safety and avoiding such errors.

---

## Creating a Branded Type

A branded type in TypeScript can be implemented using an intersection type that combines a base type with a unique marker. Here’s how you can define a branded type using a type alias named `NetZero` and an intersection type (designated by the `&` symbol):

```ts
// Branded Type
type NotZero = number & { __brand: 'NotZero' };
```

The resulting type is an intersection of `number` and an object with a unique `__brand` property. This property acts as a unique tag, ensuring that the branded type is distinct from its base type and other branded types. The name `__brand` is conventional and sometimes can also have different names such as `__type`.

---

## Define the Brand utility type

If you want to use branded types more often, you can create a utility type that helps you creating more branded types with ease:

```ts
// Utility Type
type Brand<T, B extends string> = T & { __brand: B };
 
// Branded Type
type NotZero = Brand<number, 'NotZero'>;
```

---

## Using Type Guards with Branded Types

The simplest way to convert a primitive type into a branded type is by using a custom type guard. A type guard in TypeScript leverages the `is` keyword to predict a type, helping the TypeScript compiler recognize that our variables meet the requirements of our branded type:

```ts
type Brand<T, B extends string> = T & { __brand: B };
 
type NotZero = Brand<number, 'NotZero'>;
 
function isNotZero(input: unknown): input is NotZero {
  if (input !== 0) {
    return true;
  }
  return false;
}
 
function divide(a: number, b: NotZero) {
  return a / b;
}
 
const b = 0;
if (isNotZero(b)) {
  divide(100, b);
}
```

The benefit of using the `isNotZero` type guard is that it ensures the variable is checked prior to being passed to the `divide` function. Since `divide` mandates that `b` be of the type `NotZero`, we cannot directly pass any number; it must first pass through the `isNotZero` check. While this does require an if-statement, which may slightly complicate the readability by introducing additional code blocks, it offers the safety of not crashing the program if the check fails.

An alternative to employing a type guard is to use an assertion function. This approach eliminates the need for an if-statement, streamlining the code flow. However, if the assertion fails, it could crash the program, thus it is crucial to encapsulate it within a `try-catch` block to manage potential runtime exceptions. This trade-off between readability and robust error handling is a key consideration in choosing between a type guard and an assertion function.

---

## Using Assertion Functions with Branded Types

Assertion functions in TypeScript are used to perform runtime checks and signal to the compiler what type a particular value is, if the checks succeed:

```ts
function assertNotZero(input: unknown): asserts input is NotZero {
  if (input === 0) {
    throw new Error('Cannot divide by zero');
  }
}
```

In this setup, the `asserts` keyword transforms our type predicate into an assertion, indicating to TypeScript that if `assertNotZero` completes without throwing an error, the input can be reliably treated as type `NotZero`. Once our variables pass through this function, the TypeScript compiler will permit their use in subsequent code blocks with the inferred type of `NotZero`:

```ts
type Brand<T, B extends string> = T & { __brand: B };
 
type NotZero = Brand<number, 'NotZero'>;
 
function assertNotZero(input: unknown): asserts input is NotZero {
  if (input === 0) {
    throw new Error('Cannot divide by zero');
  }
}
 
function divide(a: number, b: NotZero) {
  return a / b;
}
 
const b = 0;
assertNotZero(b);
divide(100, b);
```

Branded types ensure that we enforce a safety check on the type of `b` before it is used in the `divide` function. This mitigates the risk of errors due to improper type usage.

::: info Video Tutorial

<VidStack src="youtube/yxoN1Q8innE" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding Branded Types in TypeScript",
  "desc": "Branded types in TypeScript help create unique types to prevent errors. By using a unique marker, type guards and assertion functions help enforce these branded types for added safety.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/understanding-branded-types-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
