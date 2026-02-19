---
lang: en-US
title: "How to write declarative TypeScript Code?"
description: "Article(s) > How to write declarative TypeScript Code?"
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
      content: "Article(s) > How to write declarative TypeScript Code?"
    - property: og:description
      content: "How to write declarative TypeScript Code?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-write-declarative-typescript-code.html
prev: /programming/ts/articles/README.md
date: 2024-08-28
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
  name="How to write declarative TypeScript Code?"
  desc="Declarative programming in TypeScript focuses on defining the desired outcome rather than the specific steps to achieve it. It simplifies code by abstracting control flow and state management, relying on functions like filter to handle details."
  url="https://typescript.tv/hands-on/how-to-write-declarative-typescript-code"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Declarative programming in TypeScript focuses on defining the desired outcome rather than the specific steps to achieve it. It simplifies code by abstracting control flow and state management, relying on functions like filter to handle details.

Declarative programming lets you define what you want without detailing how to get there. It's the essence of functional programming languages, focusing on results rather than steps.

Let's break down the difference between imperative and declarative programming in TypeScript with a straightforward example: filtering out even numbers from an array.

---

## Imperative Programming

Imperative programming details *how* to perform tasks step by step, explicitly describing the control flow and state changes. You explicitly define each step that the code should take to achieve a specific goal. This approach emphasizes how to perform tasks by focusing on the flow of control and the state changes in the system.

::: tip Example

```ts
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers: number[] = [];
 
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenNumbers.push(numbers[i]);
  }
}
 
console.log(evenNumbers); // Output: [2, 4, 6, 8, 10]
```

:::

In the imperative example, we define how to store our results by iterating over all numbers and checking if each number passes the modulo operation. We then manually add the passing numbers to our results array.

---

## Declarative Programming

Declarative programming focuses on *what* the result should be rather than how to achieve it. This approach abstracts away the control flow and state management, letting the underlying system or library handle those details. Its mostly reliant on APIs.

::: tip Example

```ts
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter((n) => n % 2 === 0);
 
console.log(evenNumbers); // Output: [2, 4, 6, 8, 10]
```

:::

In the declarative example, we only specify our goal to keep numbers that satisfy the condition `n % 2 === 0`, and the function takes care of the rest.

---

## Imperative vs. Declarative

::: info Comparison Table

| Aspect | Imperative Programming | Declarative Programming |
| --- | --- | --- |
| **Control Flow** | You manually loop through each element using a `for` loop. | You don't explicitly manage the loop; the `filter` function handles it internally. |
| **State Management** | You explicitly manage the state by pushing even numbers into the `evenNumbers` array. | You don't manage the state explicitly; the `filter` function returns a new array. |
| **Focus** | The code focuses on the exact steps required to achieve the result. | The code focuses on the final result, specifying the condition for filtering, without concern for how. |

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to write declarative TypeScript Code?",
  "desc": "Declarative programming in TypeScript focuses on defining the desired outcome rather than the specific steps to achieve it. It simplifies code by abstracting control flow and state management, relying on functions like filter to handle details.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-write-declarative-typescript-code.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
