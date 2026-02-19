---
lang: en-US
title: "Write a simple TypeScript script with ESM"
description: "Article(s) > Write a simple TypeScript script with ESM"
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
      content: "Article(s) > Write a simple TypeScript script with ESM"
    - property: og:description
      content: "Write a simple TypeScript script with ESM"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/write-a-simple-typescript-script-with-esm.html
prev: /programming/ts/articles/README.md
date: 2023-11-01
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
  name="Write a simple TypeScript script with ESM"
  desc="I recently wrote a small TypeScript script to generate a Markdown file with a sluggified filename. Since we're now in the era of modern ECMAScript Modules (ESM), I wanted to use this new module system in my TypeScript code. Here's how I did it."
  url="https://typescript.tv/hands-on/write-a-simple-typescript-script-with-esm"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

I recently wrote a small TypeScript script to generate a Markdown file with a sluggified filename. Since we're now in the era of modern ECMAScript Modules (ESM), I wanted to use this new module system in my TypeScript code. Here's how I did it.

I installed [ts-node (<VPIcon icon="iconfont icon-github"/>`TypeStrong/ts-node`)](https://github.com/TypeStrong/ts-node) so I could run my script in a Node.js environment from the command line. The great thing about `ts-node` is that it works well with ESM. It comes with a binary called `ts-node-esm` that supports loading ECMAScript modules when you run TypeScript code.

---

## Making TypeScript Work with ESM

Once you've installed `ts-node` with `npm install`, you can immediately direct it to your script by:

```sh
npx ts-node-esm src/main.ts
```

Please note that we are using `ts-node-esm` instead of `ts-node` to leverage its ESM loading capabilities.

This requires marking your Node.js package as an ECMAScript module. You can achieve this by using specific file extensions (as discussed later in the article) or by setting `"type": "module"` in your <VPIcon icon="iconfont icon-json"/>`package.json` file.

Additionally, ensure your <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file has the `module` option set to `Node16` (for module resolution introduced in Node v16) or `NodeNext` (for experimental module resolution).

---

## Handling File and Folder Paths

In the world of ESM, the usual `__filename` and `__dirname` constants are not available. So, I found a way to mimic this by using the [<VPIcon icon="fa-brands fa-firefox"/>`import.meta` property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta):

```ts
import path from 'node:path';
import url from 'node:url';
 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

---

## Using New File Extensions

TypeScript lets you pick [<VPIcon icon="iconfont icon-typescript"/>different file extensions](https://typescriptlang.org/docs/handbook/modules/theory.html#the-role-of-declaration-files) to tell whether you're using ES modules (`.mts`) or CommonJS modules (`.cts`).

If you only need to run a single script with the ES module syntax, I recommend using the `.mts` extension. It's great in scenarios where you don't want to set up your whole project to use ES modules.

---

## Demo Code

Here's the complete script I developed:

```ts title="src/new-post.mts"
import GithubSlugger from 'github-slugger';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const args = process.argv.slice(2);
const title = args[0];
const slugger = new GithubSlugger();
const slug = slugger.slug(title);
const filePath = path.join(__dirname, 'content', 'blog', `${slug}.md`);
 
console.log(`Creating file "${filePath}"...`);
fs.writeFileSync(filePath, '', 'utf8');
console.log(`Created file "${filePath}".`);
```

It can be executed as follows:

```sh
npx ts-node-esm src/new-post.mts "My Post Title"
```

---

## Fixing `ERR_UNKNOWN_FILE_EXTENSION`

There is the possibility that this error occurs when using Node.js v20 with ESM and `ts-node`. In such cases, we have to use the following command:

```sh
tsc --noEmit && \
node --no-warnings=ExperimentalWarning \
  --loader ts-node/esm/transpile-only \
  src/new-post.mts "My Post Title"
```

::: note

Read more about it [**here**](/typescript.tv/fixing-typeerror-err_unknown_file_extension-with-ts-node.md).

:::

::: info Video Tutorial

For a full explanation, check out the video I made here:

<VidStack src="youtube/jn370WEIvjs" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Write a simple TypeScript script with ESM",
  "desc": "I recently wrote a small TypeScript script to generate a Markdown file with a sluggified filename. Since we're now in the era of modern ECMAScript Modules (ESM), I wanted to use this new module system in my TypeScript code. Here's how I did it.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/write-a-simple-typescript-script-with-esm.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
