---
lang: en-US
title: "Fastest way to set up a TypeScript project with Node.js (npm)"
description: "Article(s) > Fastest way to set up a TypeScript project with Node.js (npm)"
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
      content: "Article(s) > Fastest way to set up a TypeScript project with Node.js (npm)"
    - property: og:description
      content: "Fastest way to set up a TypeScript project with Node.js (npm)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/fastest-way-to-set-up-a-typescript-project-with-nodejs-npm.html
prev: /programming/ts/articles/README.md
date: 2020-08-05
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
  name="Fastest way to set up a TypeScript project with Node.js (npm)"
  desc="Setting up a TypeScript project with Node.js is quick and easy. Here are the steps…"
  url="https://typescript.tv/hands-on/fastest-way-to-set-up-a-typescript-project-with-nodejs-npm"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Setting up a TypeScript project with Node.js is quick and easy. Here are the steps…

Setting up a TypeScript project with Node.js takes only a few minutes. Here is how to do it the fastest way by just using `npm` and `yarn`.

::: info Tutorial

<VidStack src="youtube/lML85tTsz4I" />

:::

::: note TL;DR

```sh
npm init -y
npm install -D typescript 
# or yarn add -DE typescript
npx tsc --init
echo console.log('Hello from TypeScript'); > index.ts
npx tsc
node index.js
```

> Tested with TypeScript v3.9.7, Node.js v13.10.1 & yarn v1.21.1.

---

## Prerequisites

To setup a Node.js project with TypeScript from scratch we have to install [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/) and preferably a package manager like [<VPIcon icon="fa-brands fa-npm"/>npm](https://npmjs.com/) or [<VPIcon icon="fa-brands fa-yarn"/>Yarn](https://yarnpkg.com/).

---

## Creating a Node.js package

The Node Package Manager (npm) ships with Node.js and supplies a wizard to create new packages using the initializer command `npm init`. To prevent the wizard from asking questions we can run it using the `-y` flag which will answer all setup questions with "yes":

```sh
npm init -y
```

---

## Adding TypeScript

Once our Node package is initialized, we can add dependencies using `npm i` or `yarn add`. To start a TypeScript project we need to install the `typescript` package:

```sh
npm i -D typescript
```

---

## Setting up TypeScript

To start a TypeScript project it is best to create a compiler configuration. This can be done with `tsc --init`, which will create a basic project setup using documented [<VPIcon icon="iconfont icon-typescript"/>compiler options](https://typescriptlang.org/docs/handbook/compiler-options.html).

---

## Writing TypeScript code

A good entry point for our application is a `index.ts` file where we will save our TypeScript code. To keep things simple, we will write a small program that just outputs a message:

```ts title="index.ts"
console.log('Hello from TypeScript');
```

---

## Compiling TypeScript code

Node.js is a JavaScript runtime and does not, unlike [<VPIcon icon="iconfont icon-deno"/>Deno](https://deno.land/), execute TypeScript code by default. That's why we have to transpile our TypeScript code to JavaScript. This code conversion can be done by simply executing the TypeScript compiler with the `tsc` command. As a result we will receive a new file called <VPIcon icon="fa-brands fa-js"/>`index.js`.

---

## Running TypeScript code

The transpiled <VPIcon icon="fa-brands fa-js"/>`index.js` file can be run with `node index.js` and will display our message on the command prompt.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fastest way to set up a TypeScript project with Node.js (npm)",
  "desc": "Setting up a TypeScript project with Node.js is quick and easy. Here are the steps…",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/fastest-way-to-set-up-a-typescript-project-with-nodejs-npm.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
