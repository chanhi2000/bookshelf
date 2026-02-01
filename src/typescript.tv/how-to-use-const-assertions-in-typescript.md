---
lang: en-US
title: "How to use const assertions in TypeScript"
description: "Article(s) > How to use const assertions in TypeScript"
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
      content: "Article(s) > How to use const assertions in TypeScript"
    - property: og:description
      content: "How to use const assertions in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-use-const-assertions-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-01-03
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
  name="How to use const assertions in TypeScript"
  desc="TypeScript 3.4 introduced const assertions, which allow you to claim a value as immutable. This is useful when working with arrays, as it prevents new values from being added to an existing array."
  url="https://typescript.tv/new-features/how-to-use-const-assertions-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript 3.4 introduced const assertions, which allow you to claim a value as immutable. This is useful when working with arrays, as it prevents new values from being added to an existing array.

TypeScript 3.4 introduced `const` assertions, a feature that allows you to claim a value as immutable. This feature is particularly valuable in combination with array literals, as it prevents new values from being pushed into an existing array.

---

## `const` declarations

A **`const` declaration** only makes the **array reference** immutable.

::: tip Example

```ts
// 'const' only makes the array reference immutable
const myArray = [1, 2, 3];
// Values of the array can still be removed
myArray.pop();
// ...or pushed
myArray.push(4);
// ... but reassignments become impossible
// TS2588: Cannot assign to 'myArray' because it is a constant.
myArray = [4];
```

:::

---

## const assertions

With a **const assertion** you will get immutability for your **array reference** and **array values** at design-time.

::: tip Example

```ts
// A 'const assertion' protects the reference and elements of your array
const myArray = [1, 2, 3] as const;
// TS2339: Property 'pop' does not exist on type 'readonly [1, 2, 3]'.
myArray.pop();
// TS2339: Property 'push' does not exist on type 'readonly [1, 2, 3]'.
myArray.push(4);
// TS2588: Cannot assign to 'myArray' because it is a constant.
myArray = [4];
```

:::

---

## Important note

One important thing to note is that const assertions are a TypeScript feature at **design-time** and do not actually make values immutable at runtime. This means that you will still be able to modify values at runtime using plain JavaScript. If you want to achieve a higher level of immutability, you can make use the [<VPIcon icon="fa-brands fa-firefox"/>`Object.freeze()` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

::: tip Example

```ts
const myArray = [1, 2, 3];
// The static 'freeze' method makes your array immutable at runtime
Object.freeze(myArray);
// This will happen when you try to manipulate your array in JavaScript:
// Uncaught TypeError: Cannot add property 4, object is not extensible
myArray.push(4);
```

:::

---

## Best Practice

You can combine a **const assertion** with `Object.freeze` to get type safety at **design-time** and **runtime**:

```ts
// Protection at design-time
const myArray = [1, 2, 3] as const;
// Protection at runtime
Object.freeze(myArray);
```

---

## `as const` with objects

A const assertion can also protect an object literal by marking its properties as `readonly`:

```ts
// Protect your object properties from changes at design-time
const objectLiteral = {
  age: 35,
  name: 'Benny',
} as const;
 
// TS2540: Cannot assign to 'age' because it is a read-only property.
objectLiteral.age = 30;
```

---

## `as const` with strings

You can narrow the type for a string to a specific string using `as const`:

```ts
// Don't use an explicit return type to make use of type inference
function getName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}` as const;
}
 
let displayName = getName('Benny', 'Code');
// TS2322: Type '"..."' is not assignable to type '`${string} ${string}`'.
displayName = '...';
```

---

## Alternative Options

You can use the `ReadonlyArray` type of TypeScript 3.4 to disallow array value modifications at design-time:

::: tip Example

```ts
const array: ReadonlyArray<number> = [1, 2, 3];
// TS2339: Property 'pop' does not exist on type 'readonly number[]'.
array.pop();
```

:::

::: info Shorthand Syntax

```ts
const array: readonly number[] = [1, 2, 3];
// TS2339: Property 'pop' does not exist on type 'readonly number[]'.
array.pop();
```

:::

::: info Video Tutorial

<VidStack src="youtube/-jZy8SYUfkE" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use const assertions in TypeScript",
  "desc": "TypeScript 3.4 introduced const assertions, which allow you to claim a value as immutable. This is useful when working with arrays, as it prevents new values from being added to an existing array.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-use-const-assertions-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
