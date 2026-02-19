---
lang: en-US
title: "Save memory with TypeScript generators!"
description: "Article(s) > Save memory with TypeScript generators!"
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
      content: "Article(s) > Save memory with TypeScript generators!"
    - property: og:description
      content: "Save memory with TypeScript generators!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/save-memory-with-typescript-generators.html
prev: /programming/ts/articles/README.md
date: 2024-05-21
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
  name="Save memory with TypeScript generators!"
  desc="Memory usage is a crucial metric when developing applications in TypeScript. It's frequently ignored until the ”JavaScript heap out of memory” error appears. This error commonly occurs when loading large datasets in an application. In this tutorial, we will learn how to load big datasets and iterate over them while minimizing our memory usage."
  url="https://typescript.tv/hands-on/save-memory-with-typescript-generators"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Memory usage is a crucial metric when developing applications in TypeScript. It's frequently ignored until the "JavaScript heap out of memory" error appears. This error commonly occurs when loading large datasets in an application. In this tutorial, we will learn how to load big datasets and iterate over them while minimizing our memory usage.

---

## Testing Scenario

I prepared a 184 MB CSV data file to compare the memory consumption of the iterable `ReadableStream` API with traditional synchronous file loading. The aim is to iterate over the first line of the data and assess the memory consumption required for this operation. With [<VPIcon icon="fa-brands fa-node"/>`process.memoryUsage()`](https://nodejs.org/api/process.html#processmemoryusage), it's feasible to log the results in bytes. Here's how it appears in the initial implementation:

```ts{15,17,19,23} title="sync-file.ts"
import fs from 'node:fs';
import os from 'os';
import path from 'node:path';
import url from 'node:url';
 
function mem() {
  console.log(process.memoryUsage().heapUsed);
}
 
// ESM globals
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const filePath = path.join(__dirname, '184mb.csv');
mem(); // 4559808
const file = fs.readFileSync(filePath, 'utf8');
mem(); // 197654832
const data = file.split(os.EOL);
mem(); // 338513256
 
for (const chunk of data) {
  console.log(chunk);
  mem(); // 338699088
  break;
}
```

---

## Synchronous Execution

After the first call of `fs.readFileSync`, the memory consumption quickly reached around 197 MB, indicating that the entire CSV file had been loaded into memory. Splitting the data nearly doubles the memory usage as the split result is also stored in memory. Iterating over the first chunk and exiting using the `break` keyword has minimal impact on memory consumption. **With roughly 338.70 MB being used**, the memory consumption is quite high for such a small amount of business logic. Increasing the test data from 184 MB to 843 MB actually crashed the application with the following error message:

> FATAL ERROR: v8::ToLocalChecked Empty MaybeLocal

---

## Iterable Streams

To enhance memory consumption and reduce crash rates, I restructured the business logic by making use of the iterable `ReadableStream` API:

```ts{15,17,19,23} title="stream-file.ts"
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import split2 from 'split2';
 
function mem() {
  console.log(process.memoryUsage().heapUsed);
}
 
// ESM globals
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const filePath = path.join(__dirname, '184mb.csv');
mem(); // 4588544
const file = fs.createReadStream(filePath, 'utf8');
mem(); // 4603376
const data = file.pipe(split2());
mem(); // 4611728
 
for await (const chunk of data) {
  console.log(chunk);
  mem(); // 4641592
  break;
}
```

Observing the numbers above is quite impressive because the memory consumption remains quite stable. It begins at just 4.5 MB and **only rises to a maximum of 4.6 MB**. Surprisingly, even when handling the 843 MB sample data, there was not a significant increase in memory usage. In contrast to the 338.70 MB used in the previous scenario, this iterable code only consumes approximately 1.36% of the memory, **potentially saving you up to 98.64 MB of RAM**.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Save memory with TypeScript generators!",
  "desc": "Memory usage is a crucial metric when developing applications in TypeScript. It's frequently ignored until the ”JavaScript heap out of memory” error appears. This error commonly occurs when loading large datasets in an application. In this tutorial, we will learn how to load big datasets and iterate over them while minimizing our memory usage.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/save-memory-with-typescript-generators.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
