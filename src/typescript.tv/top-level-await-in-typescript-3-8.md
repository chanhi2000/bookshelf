---
lang: en-US
title: "Top-level await in TypeScript 3.8"
description: "Article(s) > Top-level await in TypeScript 3.8"
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
      content: "Article(s) > Top-level await in TypeScript 3.8"
    - property: og:description
      content: "Top-level await in TypeScript 3.8"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/new-featurestop-level-await-in-typescript-3-8.html
prev: /programming/ts/articles/README.md
date: 2020-03-31
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
  name="Top-level await in TypeScript 3.8"
  desc="TypeScript 3.8 introduces a new feature called top-level await. It allows developers to use the `await` keyword without a surrounding `async` function at the top level of a module."
  url="https://typescript.tv/new-features/top-level-await-in-typescript-3-8"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript 3.8 introduces a new feature called top-level await. It allows developers to use the `await` keyword without a surrounding `async` function at the top level of a module.

TypeScript 3.8 introduces a new functionality which is called **top-level await**. It allows developers to use the `await` keyword without a surrounding `async` function at the top level of a module.

---

## Tutorial

Top-level await was originally planned to land in TypeScript 3.7 but was moved to the iteration plan of TypeScript 3.8. The feature itself is the result of the corresponding ECMAScript proposal called "[<VPIcon icon="fas fa-globe"/>Top-Level Await](https://tc39.es/proposal-top-level-await/)".

The following video shows how to use top-level `await` in combination with Node.js v13:

<VidStack src="youtube/hgbHbbpph5c" />

---

## Code

```json title="package.json"
{
  "dependencies": {
    "axios": "0.19.2"
  },
  "devDependencies": {
    "@types/node": "13.9.0",
    "typescript": "3.8.3"
  },
  "scripts": {
    "client": "node --harmony-top-level-await ./dist/client.js",
    "server": "node ./dist/server.js"
  },
  "type": "module"
}
```

```json title="tsconfig.json"
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "target": "es2017"
  },
  "exclude": ["dist", "node_modules"]
}
```

```ts title="src/client.ts"
import axios from 'axios';
 
try {
  const response = await axios.post('http://localhost:8080/', { number: 1 });
  console.log(response.data);
} catch (error) {
  console.error(error.message);
}
```

```ts title="src/server.ts"
import { createServer } from 'http';
 
const server = createServer();
const port = 8080;
 
server.on('request', (request, response) => {
  const data = [];
  request
    .on('data', (chunk) => data.push(chunk))
    .on('end', () => {
      const body = Buffer.concat(data).toString();
      const payload = JSON.parse(body);
 
      if (typeof payload.number === 'number') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(
          JSON.stringify({
            status: 'OK',
          })
        );
        response.end();
      } else {
        response.statusCode = 500;
        response.end();
      }
    });
});
 
server.listen(port, () => console.info(`Server listening on port "${port}".`));
```

---

## Fallback

There is this handy snippet of a main function if you cannot use top-level await for any reason:

```ts
async function main(): Promise<void> {
  // await ...
}
 
main().catch(console.error);
```

::: note TL;DR

To use top-level await in TypeScript, you have to set "target" to `es2017` or higher. The "module" option in "tsconfig.json" has to be set to `esnext` or `system`. Your code also has to run on Node.js v14.8.0 or later.

:::

::: info Resources

<SiteInfo
  name="typescripttv/top-level-await-in-typescript-3-8"
  desc="Contribute to typescripttv/top-level-await-in-typescript-3-8 development by creating an account on GitHub."
  url="https://github.com/typescripttv/top-level-await-in-typescript-3-8/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/72372b949f92fdc653d2dc0b9fb0aff784112791114c209d9d1ee1be88523764/typescripttv/top-level-await-in-typescript-3-8"/>

```component VPCard
{
  "title": "Top-level await · V8",
  "desc": "Top-level `await` is coming to JavaScript modules! You’ll soon be able to use `await` without needing to be in an async function.",
  "link": "https://v8.dev/features/top-level-await/",
  "logo": "https://v8.dev/favicon.png",
  "background": "rgba(66,133,244,0.2)"
}
```

```component VPCard
{
  "title": "ECMAScript proposal: top-level `await`",
  "desc": "The ECMAScript proposal “Top-level await” by Myles Borins lets you use the asynchronous await operator at the top level of modules. Before, you could only use it in async functions and async generators.",
  "link": "https://2ality.com/2019/12/top-level-await.html/",
  "logo": "https://22ality.com/img/favicons/2ality-favicon-opaque.svg",
  "background": "rgba(0,0,139,0.2)"
}
```

```component VPCard
{
  "title": "Documentation - TypeScript 3.8",
  "desc": "TypeScript 3.8 Release Notes",
  "link": "https://typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#top-level-await/",
  "logo": "https://typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae",
  "background": "rgba(49,120,198,0.2)"
}
```

<VidStack src="youtube/EERzGWgkU2o" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Top-level await in TypeScript 3.8",
  "desc": "TypeScript 3.8 introduces a new feature called top-level await. It allows developers to use the `await` keyword without a surrounding `async` function at the top level of a module.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/new-featurestop-level-await-in-typescript-3-8.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
