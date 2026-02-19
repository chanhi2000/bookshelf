---
lang: en-US
title: "Filtering arrays in TypeScript with correct types"
description: "Article(s) > Filtering arrays in TypeScript with correct types"
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
      content: "Article(s) > Filtering arrays in TypeScript with correct types"
    - property: og:description
      content: "Filtering arrays in TypeScript with correct types"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/filtering-arrays-in-typescript-with-correct-types.html
prev: /programming/ts/articles/README.md
date: 2023-12-06
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
  name="Filtering arrays in TypeScript with correct types"
  desc="This article explains how to filter arrays in TypeScript while maintaining correct types. It demonstrates how to create a type guard to ensure that the filtered array only contains the desired type. It also discusses the downsides of type guards and compares them to assertion functions."
  url="https://typescript.tv/best-practices/filtering-arrays-in-typescript-with-correct-types"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

This article explains how to filter arrays in TypeScript while maintaining correct types. It demonstrates how to create a type guard to ensure that the filtered array only contains the desired type. It also discusses the downsides of type guards and compares them to assertion functions.

In this tutorial I will show you how you can filter arrays properly in TypeScript, getting back their respective values and types.

---

## Demo Code

Let's say we have a type called `ResponseData` which contains a `data` property of type `string`. Next up, we will create an array of items, including some `ResponseData` objects. We will create an object with data "Banana" and another one that keeps data "Dog". To create an inhomogenous set, we will also add some `undefined` values to the mix:

```ts
type ResponseData = {
  data: string;
};
 
const items = [{ data: 'Banana' }, undefined, { data: 'Dog' }, undefined];
```

With the demo values set, we can now add type annotations to our items. We'll inform TypeScript that our array consists of a union of `ResponseData` values and `undefined` values:

```ts{5}
type ResponseData = {
  data: string;
};
 
const items: (ResponseData | undefined)[] = [{ data: 'Banana' }, undefined, { data: 'Dog' }, undefined];
```

---

## Filtering items in TypeScript

Next, we need to filter our items to only return the ones that are defined. We'll implement a filter that checks for non-undefined values. The filter removes items for which the condition evaluates to `false`:

```ts{7}
type ResponseData = {
  data: string;
};
 
const items: (ResponseData | undefined)[] = [{ data: 'Banana' }, undefined, { data: 'Dog' }, undefined];
 
const payloads = items.filter((item) => item !== undefined);
 
console.log(payloads);
```

At first glance, everything seems fine. However, upon closer inspection, our IDE still considers our payloads as potentially untyped. They could be either of type `ResponseData` or `undefined`. Ideally, we would like our filter to affect the inferred type.

---

## Filtering items with a type guard

We can achieve this by converting our filter into a [**type guard**](/typescript.tv/glossary/type-guards.md). To do so, we simply add a [**type predicate**](/typescript.tv/glossary/type-predicates.md) to our filter function using the syntax `item is ResponseData`. This small adjustment will ensure that we obtain the desired response type and provide better autocompletion support in our IDE:

```ts{7}
type ResponseData = {
  data: string;
};
 
const items: (ResponseData | undefined)[] = [{ data: 'Banana' }, undefined, { data: 'Dog' }, undefined];
 
const payloads = items.filter((item): item is ResponseData => item !== undefined);
 
console.log(payloads);
```

---

## Making type guards resuable

To make it more explicit, we can extract our type guard into a separate function. Let's create a function called `isResponseData` that takes an item as an input parameter. The item can be of the **union type**, which includes `ResponseData` or `undefined`.

The return type will be a type predicate indicating that our item is of type `ResponseData`. Our type guard will evaluate to `true` if the input item is not `undefined`. Once we have set up the type guard, we can supply it to the Array's filter function:

```ts{5-7}
type ResponseData = {
  data: string;
};
 
function isResponseData(item: ResponseData | undefined): item is ResponseData {
  return item !== undefined;
}
 
const items: (ResponseData | undefined)[] = [{ data: 'Banana' }, undefined, { data: 'Dog' }, undefined];
 
const payloads = items.filter(isResponseData);
 
console.log(payloads);
```

---

## Downsides of type guards

I also want to show you the downsides of type guards. It is possible to assume invalid types, for example we could say that the items are `undefined` in the case that they are not. In such cases, the type predicate will override TypeScript's compiler, leading to feedback that our payloads are undefined during design time:

```ts{5}
type ResponseData = {
  data: string;
};
 
function isResponseData(item: ResponseData | undefined): asserts item is undefined {
  return item !== undefined;
}
 
const items: (ResponseData | undefined)[] = [{ data: 'Banana' }, undefined, { data: 'Dog' }, undefined];
 
const payloads = items.filter(isResponseData);
 
console.log(payloads);
```

---

## Assertion Functions

By using the `asserts` keyword, we can transform our type guard into an [**assertion function**](/typescript.tv/glossary/assertion-functions.md). This approach requires an adjustment to our type guard implementation. Instead of returning a boolean value, we throw an error if something unexpected occurs. If the input item passes the check, TypeScript's compiler will assume it has the `ResponseData` type based on our [**assertion signature**](/typescript.tv/glossary/assertion-signatures.md):

```ts{5-9}
type ResponseData = {
  data: string;
};
 
function isResponseData(item: ResponseData | undefined): asserts item is ResponseData {
  if (item === undefined) {
    throw new Error('It is undefined');
  }
}
 
const items: (ResponseData | undefined)[] = [{ data: 'Banana' }, undefined, { data: 'Dog' }, undefined];
 
const payloads = items.filter(isResponseData);
 
console.log(payloads);
```

This approach requires us to perform checks on our types. Instead of returning a boolean value, we throw an error if something unexpected occurs. If the input item passes the check, TypeScript's compiler will assume it has the `ResponseData` type based on our [**assertion signature**](/typescript.tv/glossary/assertion-signatures.md). If the input fails the check, an error will be thrown.

---

## Type Guards vs. Assertion Functions

When deciding between a custom type guard or an assertion function, keep the following in mind: Assertion functions are better suited for validators that need to reject inputs at runtime, while type guards are great for narrowing down a type during design time.

::: info Video Tutorial

<VidStack src="youtube/-dntHgsg5bo" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Filtering arrays in TypeScript with correct types",
  "desc": "This article explains how to filter arrays in TypeScript while maintaining correct types. It demonstrates how to create a type guard to ensure that the filtered array only contains the desired type. It also discusses the downsides of type guards and compares them to assertion functions.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/filtering-arrays-in-typescript-with-correct-types.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
