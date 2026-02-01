---
lang: en-US
title: "Effortless Nodemon Setup with TypeScript and ESM"
description: "Article(s) > Effortless Nodemon Setup with TypeScript and ESM"
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
      content: "Article(s) > Effortless Nodemon Setup with TypeScript and ESM"
    - property: og:description
      content: "Effortless Nodemon Setup with TypeScript and ESM"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/effortless-nodemon-setup-with-typescript-and-esm.html
prev: /programming/ts/articles/README.md
date: 2023-09-21
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
  name="Effortless Nodemon Setup with TypeScript and ESM"
  desc="Learn how to use Nodemon to automatically restart your Node.js app when you make changes to your TypeScript code. Install the necessary dependencies and configure Nodemon to watch your TypeScript files. Then, run your application using Nodemon for a faster development experience."
  url="https://typescript.tv/hands-on/effortless-nodemon-setup-with-typescript-and-esm"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to use Nodemon to automatically restart your Node.js app when you make changes to your TypeScript code. Install the necessary dependencies and configure Nodemon to watch your TypeScript files. Then, run your application using Nodemon for a faster development experience.

Ready to supercharge your Node.js development? Nodemon's got your back! In this tutorial, we'll show you how to set up Nodemon to **automatically restart your Node.js app** when you make changes to your TypeScript code. Get ready for a faster, smoother development experience.

---

## Install Development Dependencies

We include the following development dependencies: [<VPIcon icon="fa-brands fa-npm"/>`typescript`](https://npmjs.com/package/typescript), [<VPIcon icon="fa-brands fa-npm"/>`nodemon`](https://npmjs.com/package/nodemon), [<VPIcon icon="fa-brands fa-npm"/>`ts-node`](https://npmjs.com/package/ts-node), and the essential [type definitions for Node.js (<VPIcon icon="fa-brands fa-npm"/>`@types/node`)](https://npmjs.com/package/@types/node). Use this command to install them:

```sh
npm i --save-dev typescript nodemon ts-node @types/node
```

The `ts-node` package performs Just-In-Time (JIT) transformations, converting TypeScript into JavaScript. **This allows you to execute TypeScript directly in Node.js** without the need for precompilation. It comes with two executables: `ts-node` for running CommonJS packages and `ts-node-esm` for running ESM packages.

Here's an example of how to launch an ESM module from its main entry point using `ts-node-esm`:

```sh
ts-node-esm src/main.ts
```

Alternatively, you can invoke Node directly and instruct it to load `ts-node` for you using the following command:

```sh
node --loader ts-node/esm src/main.ts
```

This will allow you to pass additional configuration to parameters like `max_old_space_size` to Node's process:

```sh
node --max_old_space_size=8192 --loader ts-node/esm src/start.ts
```

::: note

You also have to use `node --loader ts-node/esm` instead of `ts-node-esm` when you get to see this error message:

> TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for ...

:::

This is particularly the case when using ECMAScript modules instead of CommonJS packages. Read more about it [here](/hands-on/fixing-typeerror-err_unknown_file_extension-with-ts-node).

---

## Connect ts-node with nodemon

Now that we've covered how `ts-node` works, **let's improve your development workflow** by integrating nodemon. Nodemon will watch our TypeScript files for changes and automatically reload our code using the most recent modifications, all while running it through `ts-node`. To achieve this, we need to create a `nodemon.json` configuration file in the root directory of our project:

```json title="nodemon.json"
{
  "watch": ["src"],
  "ext": "ts",
  "execMap": {
    "ts": "node --loader ts-node/esm"
  }
}
```

**The configuration is easy to read.** It instructs `nodemon` to watch all files within the "src" directory that have a "ts" extension. When such file is found, nodemon will restart the running process using a command we've specified in our execution map (execMap). This map can hold different commands for various file types, **but we're only interested in TypeScript files**.

**Now we can run our application using nodemon**, which will operate based on the specified underlying configuration:

```sh
nodemon src/main.ts
```

If you find the "ExperimentalWarning: Custom ESM Loaders is an experimental feature and might change at any time" warning annoying, you can **disable it by making a change** in the `execMap`:

```json{5} title="nodemon.json"
{
  "watch": ["src"],
  "ext": "ts",
  "execMap": {
    "ts": "node --no-warnings=ExperimentalWarning --loader ts-node/esm"
  }
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Effortless Nodemon Setup with TypeScript and ESM",
  "desc": "Learn how to use Nodemon to automatically restart your Node.js app when you make changes to your TypeScript code. Install the necessary dependencies and configure Nodemon to watch your TypeScript files. Then, run your application using Nodemon for a faster development experience.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/effortless-nodemon-setup-with-typescript-and-esm.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
