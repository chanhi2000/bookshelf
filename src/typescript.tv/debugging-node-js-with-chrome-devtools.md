---
lang: en-US
title: "Debugging Node.js with Chrome DevTools"
description: "Article(s) > Debugging Node.js with Chrome DevTools"
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
      content: "Article(s) > Debugging Node.js with Chrome DevTools"
    - property: og:description
      content: "Debugging Node.js with Chrome DevTools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/debugging-node-js-with-chrome-devtools.html
prev: /programming/js-node/articles/README.md
date: 2021-03-17
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
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
  name="Debugging Node.js with Chrome DevTools"
  desc="You can use Chrome's DevTools to debug Node.js applications. To do this, you need to set your Node.js app as a remote target using the `--inspect` flag when starting the `node` process. Once your app is registered, you can open the DevTools for Node in Google Chrome."
  url="https://typescript.tv/hands-on/debugging-node-js-with-chrome-devtools"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

You can use Chrome's DevTools to debug Node.js applications. To do this, you need to set your Node.js app as a remote target using the `--inspect` flag when starting the `node` process. Once your app is registered, you can open the DevTools for Node in Google Chrome.

You can use Chrome's DevTools to debug Node.js applications. It's called [<VPIcon icon="fa-brands fa-google"/>remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging) and can be started from Google Chrome's internal website. In the following article we will show you how.

---

## Setup your Node.js app for debugging

To inspect your Node.js app with Google Chrome DevTools, you have to make it a **remote target**. This can be done by using the `--inspect` flag when starting the `node` process:

```sh
node --inspect ./dist/app.js
```

---

## Use Chrome DevTools

Once your Node.js app is registered as remote target and listening for debuggers, you can open the webpage "chrome://inspect/#devices" in Google Chrome to see the dedicated DevTools for Node.

### Set IP and Port

By default, the DevTools try to discover targets on "127.0.0.1:9229". You can change the host and port. Make sure that your Node.js process is listening to it. You can point Node.js to a specific IP and Port by running:

```sh
node --inspect=127.0.0.1:9200 ./dist/app.js
```

If you want to allow external connections (from the public internet) you have to bind the debugging interface to IP/Host "0.0.0.0".

---

## Use CLI Debugger

If you want to run debugging entirely in the CLI, you can start your app with:

```sh
node inspect ./dist/app.js
```

::: note

note the missing hyphens!

:::

Be aware that the [<VPIcon icon="fa-brands fa-node"/>Node.js inspector](https://nodejs.org/api/debugger.html) supports breakpoints but is not a full-featured debugger. If you want to continue from a breakpoint (set with the `debugger` statement), you have to enter `cont` (continue) within the CLI.

---

## Pause Debugging

When your app has a heavy initialization, you may want to pause your app until the debugger is attached. This can be done by using the flag `--inspect-brk`, which sets a break before running your code. You can use your remote debugger (i.e. Chrome DevTools) to unpause the debugging process.

---

## TypeScript Debugging Setup

If you want to use Node's debugger for TypeScript code, you will have to compile your Node.js app to JavaScript. Make sure that the compiler option "sourceMap" in "tsconfig.json" is set to `true` in order to get source map support.

1. Run `npx tsc` to compile your TypeScript app to JavaScript
2. Run `node --inspect ./dist/app.js` to start your compiled code in watch mode for debuggers

When you are using `ts-node`, you can directly call:

```sh
node --inspect -r ts-node/register ./src/app.ts
```

---

## Debugger doesn't stop with TypeScript

When your TypeScript code uses `debugger` statements but your code doesn't stop, then it is very likely that your `debugger` keyword got removed during compilation. You can prevent TypeScript's compiler from removing the `debugger` keywords by using this code comment:

```ts
debugger; // (tsc-save)
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Debugging Node.js with Chrome DevTools",
  "desc": "You can use Chrome's DevTools to debug Node.js applications. To do this, you need to set your Node.js app as a remote target using the `--inspect` flag when starting the `node` process. Once your app is registered, you can open the DevTools for Node in Google Chrome.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/debugging-node-js-with-chrome-devtools.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
