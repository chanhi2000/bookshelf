---
lang: en-US
title: "Fix type X is not assignable to type Y"
description: "Article(s) > Fix type X is not assignable to type Y"
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
      content: "Article(s) > Fix type X is not assignable to type Y"
    - property: og:description
      content: "Fix type X is not assignable to type Y"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/fix-type-x-is-not-assignable-to-type-y.html
prev: /programming/ts/articles/README.md
date: 2023-09-20
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
  name="Fix type X is not assignable to type Y"
  desc="When working with optional parameters in TypeScript, you may encounter the error message ”undefined cannot be assigned to a specific type.” This happens because optional parameters can either be `undefined` or of a specified type. To avoid this error, you can use several techniques."
  url="https://typescript.tv/best-practices/fix-type-x-is-not-assignable-to-type-y"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

When working with optional parameters in TypeScript, you may encounter the error message "undefined cannot be assigned to a specific type." This happens because optional parameters can either be `undefined` or of a specified type. To avoid this error, you can use several techniques.

The error message that **undefined cannot be assigned to a specific type** often occurs when working with optional parameters. When a parameter is marked as optional, it can either be `undefined` or of the specified type. In TypeScript this is represented by a [**union type**](/typescript.tv/glossary/union-types.md) such as `undefined | string`. If you want to use a function that doesn't accept `undefined` as a parameter (e.g., `parseInt`), you must first validate that your value exists.

Here are some helpful tricks for accomplishing this.

---

## Check for existence

You can simply check if the optional parameter has a value using an "if" statement. If the condition is fulfilled, your type will be guarded within the condition and TypeScript will recognize it as not being `undefined`. If it doesn't, you throw an error to handle the situation gracefully and to avoid error **TS7030** which says "Not all code paths return a value":

```ts
export function add(a: string, b?: string) {
  if (b) {
    return parseInt(a) + parseInt(b);
  } else {
    throw new Error(`Parameter "b" is "undefined".`);
  }
}
```

---

## Write an Assertion Function

When you need to perform a type check in multiple places or want to maintain clean and reusable code, you can create an "assertion function". Assertion functions are unique to TypeScript and utilize the `asserts` keyword. Here's an example:

```ts
function assertString(input: unknown): asserts input is string {
  if (typeof input !== 'string') {
    throw new Error('Input is not a string.');
  }
}
 
export function add(a: string, b?: string) {
  assertString(b);
  return parseInt(a) + parseInt(b);
}
```

One advantage of an assertion function is that it makes your business logic cleaner. You no longer need to wrap your code inside conditions.

Once the assertion function is evaluated, the TypeScript compiler will know that your type must match the asserted type (otherwise the function would have failed). As a result, it will assume the type for all lines of code following the assertion function.

---

## Use Third-Party Assertion Functions

Node.js offers an assertion module that allows you to write your own assertions with ease. By importing the `node:assert` package, you gain access to its assertion functions, which can be used to validate your optional parameters.

```ts
import assert from 'node:assert';
 
export function add(a: string, b?: string) {
  assert.ok(typeof b === 'string', 'Parameter b is not a string.');
  return parseInt(a) + parseInt(b);
}
```

::: tip

Make sure to use a descriptive error message when using `assert.ok`, otherwise you may receive cryptic error messages such as `false == true`.

:::

---

## Non-null Assertion Operator

While not advisable and should be considered a last resort, there is a method to convince TypeScript's type checker that a value is anything other than `null` and `undefined`. You can achieve this by employing the **non-null assertion operator** denoted by the `!` postfix notation:

```ts
export function add(a: string, b?: string) {
  return parseInt(a) + parseInt(b!);
}
```

These methods give you different ways to handle optional parameters and undefined values in TypeScript, making your code safer and more reliable. You can pick the one that suits your needs and coding style best. The practices shown here will also help you solving TypeScript error **TS18048** where a a type is possibly `undefined`.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fix type X is not assignable to type Y",
  "desc": "When working with optional parameters in TypeScript, you may encounter the error message ”undefined cannot be assigned to a specific type.” This happens because optional parameters can either be `undefined` or of a specified type. To avoid this error, you can use several techniques.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/fix-type-x-is-not-assignable-to-type-y.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
