---
lang: en-US
title: "JavaScript in TypeScript: Learn How to Use Them Together"
description: "Article(s) > JavaScript in TypeScript: Learn How to Use Them Together"
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
      content: "Article(s) > JavaScript in TypeScript: Learn How to Use Them Together"
    - property: og:description
      content: "JavaScript in TypeScript: Learn How to Use Them Together"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/javascript-in-typescript-learn-how-to-use-them-together.html
prev: /programming/ts/articles/README.md
date: 2023-01-22
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
  name="JavaScript in TypeScript: Learn How to Use Them Together"
  desc="TypeScript is a superset of JavaScript, so you can use regular JavaScript code in a TypeScript application. This means you can start with your existing JavaScript codebase and gradually migrate it to TypeScript. You can also use legacy JavaScript libraries and frameworks without any issues."
  url="https://typescript.tv/hands-on/javascript-in-typescript-learn-how-to-use-them-together"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript is a superset of JavaScript, so you can use regular JavaScript code in a TypeScript application. This means you can start with your existing JavaScript codebase and gradually migrate it to TypeScript. You can also use legacy JavaScript libraries and frameworks without any issues.

It is possible to use regular JavaScript code in a TypeScript application. TypeScript is a superset of JavaScript, which means that any valid JavaScript code is also valid TypeScript code. This allows developers to gradually adopt TypeScript by starting with their existing JavaScript codebase and gradually migrating it to TypeScript. Additionally, developers can use legacy JavaScript libraries and frameworks in a TypeScript application without any issues.

::: info Video Tutorial

The following tutorial shows you how to learn TypeScript step by step by importing your JavaScript code into a TypeScript project.

<VidStack src="youtube/AZhZlEbBaB4" />

:::

---

## Use JavaScript Libraries

When working with legacy JavaScript code, you may encounter cases where you need to use a global variable that was previously injected by JavaScript code. In such situations, TypeScript offers a solution through the use of the special keyword declare. This keyword allows for declaring types for your existing JavaScript code and libraries to utilize them within your TypeScript codebase. However, it's important to keep in mind that even though TypeScript offers additional type checking and other features, the final code will still be compiled to JavaScript and executed within a JavaScript runtime environment.

::: tip Example

```ts
declare function myGlobalLegacyFunction(input: number): void;
 
myGlobalLegacyFunction(1337);
```

:::

Though not recommended practice, you can also declare external namespaces with `any`:

```ts
declare const myNamespace: any;
 
console.log(myNamespace.name);
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript in TypeScript: Learn How to Use Them Together",
  "desc": "TypeScript is a superset of JavaScript, so you can use regular JavaScript code in a TypeScript application. This means you can start with your existing JavaScript codebase and gradually migrate it to TypeScript. You can also use legacy JavaScript libraries and frameworks without any issues.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/javascript-in-typescript-learn-how-to-use-them-together.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
