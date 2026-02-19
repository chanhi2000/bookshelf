---
lang: en-US
title: "Loading JSON Files Dynamically in TypeScript"
description: "Article(s) > Loading JSON Files Dynamically in TypeScript"
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
      content: "Article(s) > Loading JSON Files Dynamically in TypeScript"
    - property: og:description
      content: "Loading JSON Files Dynamically in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/loading-json-files-dynamically-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2024-07-18
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
  name="Loading JSON Files Dynamically in TypeScript"
  desc="Learn how to dynamically import JSON files in TypeScript using import attributes and dynamic imports. Also, discover how to use `require` in ECMAScript modules with Node.js."
  url="https://typescript.tv/hands-on/loading-json-files-dynamically-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to dynamically import JSON files in TypeScript using import attributes and dynamic imports. Also, discover how to use `require` in ECMAScript modules with Node.js.

Using [Import Attributes (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-import-attributes`)](https://github.com/tc39/proposal-import-attributes), the evolution of Import Assertions, you can dynamically import JSON files at runtime in a TypeScript codebase. This process involves using import attributes in conjunction with a dynamic import, as shown in the following example:

```ts
async function loadJSON(filename: string) {
  const json = await import(filename, {
    with: { type: 'json' },
  });
 
  return json.default;
}
```

The `await import()`, known as dynamic import, is a function that returns a promise and initiates an asynchronous task to load the module from the specified path. JSON imports only support default imports, so you need to access the `default` property to retrieve the values from the JSON file. Note the `with` statement defined by the import attributes specification when importing the file.

---

## Using require in ESM

Starting with Node.js v18, you can mimic a `require` call to load JSON files in an ECMAScript module:

```ts
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
 
function loadJSON(filename: string) {
  return require(filename);
}
```

This technique leverages `createRequire` from the `node:module` package to create a `require` function. This function emulates the behavior of CommonJS' require, offering an alternate method to import JSON data in ESM. This approach is particularly useful for developers transitioning from CommonJS to ECMAScript modules.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Loading JSON Files Dynamically in TypeScript",
  "desc": "Learn how to dynamically import JSON files in TypeScript using import attributes and dynamic imports. Also, discover how to use `require` in ECMAScript modules with Node.js.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/loading-json-files-dynamically-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
