---
lang: en-US
title: "Node.js rolls out experimental TypeScript support"
description: "Article(s) > Node.js rolls out experimental TypeScript support"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Node.js rolls out experimental TypeScript support"
    - property: og:description
      content: "Node.js rolls out experimental TypeScript support"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/nodejs-rolls-out-experimental-typescript-support.html
prev: /programming/js-node/articles/README.md
date: 2024-07-31
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Node.js rolls out experimental TypeScript support"
  desc="Node.js introduces `--experimental-strip-types` flag to run TypeScript files directly without transpiling, speeding up development. This sounds great but it currently leads to compatibility issues and lack of TypeScript features. The community is discussing concerns and potential solutions for the future."
  url="https://typescript.tv/new-features/nodejs-rolls-out-experimental-typescript-support"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Node.js introduces `--experimental-strip-types` flag to run TypeScript files directly without transpiling, speeding up development. This sounds great but it currently leads to compatibility issues and lack of TypeScript features. The community is discussing concerns and potential solutions for the future.

The `--experimental-strip-types` flag in [<VPIcon icon="fa-brands fa-node"/>Node.js v23.0.0-nightly](https://nodejs.org/download/nightly/v23.0.0-nightly202407253de7a4c374/) lets you run TypeScript files directly by stripping out type annotations at runtime. This experimental feature streamlines development by removing the need for a build step.

---

## Why Use It?

Running TypeScript without transpiling speeds up your workflow and makes rapid prototyping possible. No more waiting for builds—just write and run. This feature might be inspired by [<VPIcon icon="iconfont icon-deno"/>Deno](https://deno.com/), which offers first-class support for TypeScript and thus delivering a better developer experience (DX).

---

## How to Use It

Create a TypeScript File:

```ts
function greet(name: string) {
  return `Hello, ${name}!`;
}
 
console.log(greet('World'));
```

Run it with Node.js:

```sh
node --experimental-strip-types example.ts
```

---

## Risks and Considerations

Using `--experimental-strip-types` could cause fragmentation in TypeScript, possibly requiring compatibility tables and dividing communities and platforms. Because it skips the TypeScript compiler, you miss out on static type checking, increasing the risk of runtime errors. As this workflow simply removes the types, it is not fully compatible with TypeScript feature set. It only supports features that are compatible with JavaScript which makes it not very valuable for most TypeScript projects. Type assertions using `as` or angle-bracket syntax will be ignored. Enumerations in TypeScript are not processed. Experimental features like decorators, commonly used in frameworks such as Angular, are not supported. TypeScript's namespace declarations are not stripped correctly. Extending modules (module augmentation) with additional types or functionality is not handled.

---

## Community Concerns

Community members have raised additional concerns about the feature:

**Grammar Stability:** Stripping types from TypeScript without an up-to-date grammar can be problematic because the TypeScript grammar evolves. This evolution may cause parsing issues as new features are added to TypeScript.

**Upgrade Issues:** Users might need to upgrade Node.js more frequently to stay compatible with the latest TypeScript features, which conflicts with the stability desired from long-term support (LTS) versions of Node.js.

**Specific TypeScript Versions:** Ensuring that Node.js uses the project-specific version of TypeScript is crucial. Relying on a global TypeScript version can cause compatibility issues with older projects.

---

## The Future

Fortunately, members of the core TypeScript team are actively engaging with the Node.js development team to address related concerns. Their [<VPIcon icon="fa-brands fa-youtube"/>meeting on 24th of July](https://youtu.be/BN7OrlNtQvo) is recorded on YouTube and publicly accessible. Additionally, there's an ongoing [TC39 Proposal for Type Annotations (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-type-annotations`)](https://github.com/tc39/proposal-type-annotations), aiming to integrate types natively into JavaScript, which could provide a more unified solution for type safety across JavaScript and TypeScript.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Node.js rolls out experimental TypeScript support",
  "desc": "Node.js introduces `--experimental-strip-types` flag to run TypeScript files directly without transpiling, speeding up development. This sounds great but it currently leads to compatibility issues and lack of TypeScript features. The community is discussing concerns and potential solutions for the future.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/nodejs-rolls-out-experimental-typescript-support.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
