---
lang: en-US
title: "Bring Immutability and Context to Arrays"
description: "Article(s) > Bring Immutability and Context to Arrays"
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
      content: "Article(s) > Bring Immutability and Context to Arrays"
    - property: og:description
      content: "Bring Immutability and Context to Arrays"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/bring-immutability-and-context-to-arrays.html
prev: /programming/ts/articles/README.md
date: 2025-11-12
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
  name="Bring Immutability and Context to Arrays"
  desc="Const assertions provide immutability but lack semantic meaning. Learn how TypeScript's named tuples and readonly arrays combine to give you both type safety and self-documenting code."
  url="https://typescript.tv/best-practices/bring-immutability-and-context-to-arrays"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Const assertions provide immutability but lack semantic meaning. Learn how TypeScript's named tuples and readonly arrays combine to give you both type safety and self-documenting code.

When you write arrays in TypeScript, you face a trade-off. Use `as const` and you get immutability, but you lose semantic context about what each element means. Use regular types and you get meaningful names, but nothing stops accidental mutations. TypeScript gives you a way to have both: named tuples with the `readonly` modifier.

---

## Starting Simple: Basic Arrays

The most straightforward way to type an array in an array is with basic type annotations:

```ts
const candles: number[][] = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

This works, but it tells you nothing about what those numbers represent. Is the first number an opening price? A timestamp? Without context, you need to check documentation or remember the structure.

The generic syntax offers the same flexibility with different notation:

```ts
const candles: Array<number[]> = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

Both approaches allow any length arrays with any number of elements. That flexibility comes at the cost of type safety.

---

## Adding Structure: Tuples

You can enforce a specific array length using tuple types:

```ts
const candles: Array<[number, number, number, number]> = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

Alternative Syntax:

```ts
const candles: [number, number, number, number][] = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

Now TypeScript knows each candle must have exactly four numbers. But you still don't know what those numbers represent without external documentation.

---

## Adding Context: Named Tuples

TypeScript allows you to name tuple elements, making their purpose clear:

```ts
const candles: Array<[open: number, high: number, low: number, close: number]> = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

The array shorthand syntax works too:

```ts
const candles: [open: number, high: number, low: number, close: number][] = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

Now the code documents itself. When you see a candle value, you immediately know which element is the opening price, the high, the low, and the closing price. Your editor's autocomplete and hover information show these names, making the code easier to understand and maintain.

---

## The Immutability Problem

Named tuples solve the context problem, but they don't prevent mutations:

```ts
const candles: [open: number, high: number, low: number, close: number][] = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
 
candles.push([6, 10, 4, 8]); // This works, but might not be intended
candles[0][0] = 100; // Modifying historical data
```

You might reach for `as const` to prevent modifications:

```ts
const candles = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
] as const;
```

This creates a deeply immutable structure, but you lose all the semantic information. TypeScript infers literal types like `readonly [5, 9, 3, 7]`, which doesn't help someone reading your code understand what those numbers mean.

---

## Immutability with Named Tuples

TypeScript 3.4 introduced the [<VPIcon icon="iconfont icon-typescript"/>readonly modifier](https://typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#improvements-for-readonlyarray-and-readonly-tuples) for arrays and tuples. You can combine it with named tuples to get both immutability and context:

```ts
const candles: readonly [open: number, high: number, low: number, close: number][] = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

This prevents adding and removing elements from the array:

```ts
candles.push([6, 10, 4, 8]); // Error: Property 'push' does not exist
candles[0][0] = 100; // Still allowed! The inner values are mutable
```

To make the entire structure deeply immutable, you need to apply `readonly` to the inner tuples as well. We can do this by using a type alias named `OHLC` ([<VPIcon icon="fa-brands fa-wikipedia-w"/>Open-High-Low-Close](https://en.wikipedia.org/wiki/Open-high-low-close_chart)):

```ts
type OHLC = readonly [open: number, high: number, low: number, close: number];
 
const candles: readonly OHLC[] = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

Alternative Syntax:

```ts
type OHLC = readonly [open: number, high: number, low: number, close: number];
 
const candles: ReadonlyArray<OHLC> = [
  [5, 9, 3, 7],
  [2, 4, 1, 3],
];
```

Result:

```ts
candles.push([6, 10, 4, 8]); // Error: Property 'push' does not exist
candles[0][0] = 100; // Error: Cannot assign to '0' because it is a read-only property
```

Now you have complete immutability with full context.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Bring Immutability and Context to Arrays",
  "desc": "Const assertions provide immutability but lack semantic meaning. Learn how TypeScript's named tuples and readonly arrays combine to give you both type safety and self-documenting code.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/bring-immutability-and-context-to-arrays.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
