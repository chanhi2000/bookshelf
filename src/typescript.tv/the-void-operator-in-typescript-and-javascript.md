---
lang: en-US
title: "The void operator in TypeScript and JavaScript"
description: "Article(s) > The void operator in TypeScript and JavaScript"
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
      content: "Article(s) > The void operator in TypeScript and JavaScript"
    - property: og:description
      content: "The void operator in TypeScript and JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/the-void-operator-in-typescript-and-javascript.html
prev: /programming/ts/articles/README.md
date: 2023-06-14
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
  name="The void operator in TypeScript and JavaScript"
  desc="The void operator in TypeScript and JavaScript evaluates an expression and returns `undefined`. It can be used to prevent unintended leakage of return values and handle Promises for side effects. It is useful when you want to suppress the return value of a function or initiate a Promise without handling its resolution."
  url="https://typescript.tv/new-features/the-void-operator-in-typescript-and-javascript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

The void operator in TypeScript and JavaScript evaluates an expression and returns `undefined`. It can be used to prevent unintended leakage of return values and handle Promises for side effects. It is useful when you want to suppress the return value of a function or initiate a Promise without handling its resolution.

The void operator, present in both TypeScript and plain JavaScript, evaluates an expression and returns `undefined`. Although it may not initially seem particularly useful, the void operator plays a significant role in preventing unintended leakage of return values and handling Promises for side effects.

---

## What is the Void Operator?

The void operator evaluates a given expression and returns `undefined`. In both TypeScript and JavaScript, it can be used to turn an expression's result into `undefined`. For example, the expression `(1 + 2)` can be transformed into `void (1 + 2)`, resulting in `undefined`:

```ts
const result = void (1 + 2);
```

---

## Preventing Unintended Return Values

Consider the scenario of the `addUser` function below. In certain cases, using the shorthand braceless syntax can cause issues when working with methods like `Array.push`, which returns a `number` type. To prevent unintended leakage of this return type, the void operator can be used. By utilizing the void operator in the `addUser` function, the return value of `Array.push`sis suppressed, ensuring that the function itself doesn't return anything:

```ts
type User = {
  props: {
    name: string;
  };
};
 
const users: User[] = [];
 
const addUser = (user: User) => void users.push(user);
```

---

## Promises with Side Effects

Another common use case for the void operator is when dealing with Promises. If you simply want to initiate a Promise for its side effects and are not interested in handling its resolution, the void operator comes in handy. By using the void operator, you can bypass the need for explicitly handling the Promise's resolution, allowing you to focus solely on the side effects.

```ts
import axios from 'axios';
 
void axios.get('https://typescript.tv/send-ping');
```

---

## Comparison between TypeScript and JavaScript

It's important to note that the void operator exists in both TypeScript and plain JavaScript. While TypeScript provides the benefits of static typing and additional language features, the void operator itself remains consistent in its behavior across both languages. It offers a concise and effective way to denote the absence of a return value.

::: info Video Tutorial

<VidStack src="youtube/-vI8-PytY9E" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The void operator in TypeScript and JavaScript",
  "desc": "The void operator in TypeScript and JavaScript evaluates an expression and returns `undefined`. It can be used to prevent unintended leakage of return values and handle Promises for side effects. It is useful when you want to suppress the return value of a function or initiate a Promise without handling its resolution.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/the-void-operator-in-typescript-and-javascript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
