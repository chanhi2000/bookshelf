---
lang: en-US
title: "__dirname is not defined in ES module scope"
description: "Article(s) > __dirname is not defined in ES module scope"
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
      content: "Article(s) > __dirname is not defined in ES module scope"
    - property: og:description
      content: "__dirname is not defined in ES module scope"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/dirname-is-not-defined-in-es-module-scope.html
prev: /programming/ts/articles/README.md
date: 2025-11-06
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
  name="__dirname is not defined in ES module scope"
  desc="Getting the __dirname is not defined error in your ES modules? Node.js now provides import.meta.dirname and import.meta.filename as native replacements, no workarounds needed."
  url="https://typescript.tv/new-features/dirname-is-not-defined-in-es-module-scope"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Getting the __dirname is not defined error in your ES modules? Node.js now provides import.meta.dirname and import.meta.filename as native replacements, no workarounds needed.

If you've switched from CJS to ES modules in Node.js, you've likely encountered this error:

```plaintext
ReferenceError: __dirname is not defined in ES module scope.
```

This happens because `__dirname` and `__filename` are CommonJS globals that don't exist in ES modules.

There is a workaround involving `fileURLToPath` and `dirname`. But Node.js now provides native solutions with `import.meta.dirname` and `import.meta.filename`. Here's how to fix the error and use the modern approach.

---

## Understanding the Error

In CommonJS modules, `__dirname` and `__filename` are automatically available:

```ts title="app.cts"
console.log(__dirname); // /Users/you/project
console.log(__filename); // /Users/you/project/app.cts
```

But when you use ES modules (files with `.mts` extension or `"type": "module"` in package.json), these globals don't exist:

```ts title="app.mts"
console.log(__dirname);
// ReferenceError: __dirname is not defined in ES module scope
```

This breaks code that relies on these values for file path operations, reading files relative to the current module, or resolving paths.

---

## The Old Workaround

Before Node.js added native support, you had to recreate `__dirname` manually using `import.meta.url`:

```ts title="app.mts"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
console.log(__dirname); // /Users/you/project
console.log(__filename); // /Users/you/project/app.mts
```

This pattern appeared in countless ES module codebases. It worked, but required extra imports and boilerplate code just to get basic path information.

---

## The Modern Solution

Node.js v20.11.0 and v21.2.0 introduced [<VPIcon icon="fa-brands fa-node"/>`import.meta.dirname`](https://nodejs.org/en/blog/release/v20.11.0) and [<VPIcon icon="fa-brands fa-node"/>`import.meta.filename`](https://nodejs.org/en/blog/release/v21.2.0) as direct replacements:

```ts title="app.mts"
console.log(import.meta.dirname); // /Users/you/project
console.log(import.meta.filename); // /Users/you/project/app.mts
```

No imports, no helper functions, no workarounds. These properties provide the exact same values you'd get from `__dirname` and `__filename` in CommonJS.

---

## Practical Usage

Here are common scenarios where you'd use these properties:

Reading files relative to your module:

```ts
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
 
const configFile = join(import.meta.dirname, 'config.json');
const config = await readFile(configFile, 'utf-8');
```

Resolving paths for imports or resources:

```ts
import { resolve } from 'node:path';
 
const templatesDir = resolve(import.meta.dirname, '..', '/templates');
console.log(templatesDir); // "/templates"
```

Loading assets in a web server:

```ts
import { join } from 'node:path';
import { createReadStream } from 'node:fs';
 
const publicDir = join(import.meta.dirname, 'public');
const stream = createReadStream(join(publicDir, 'index.html'));
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "__dirname is not defined in ES module scope",
  "desc": "Getting the __dirname is not defined error in your ES modules? Node.js now provides import.meta.dirname and import.meta.filename as native replacements, no workarounds needed.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/dirname-is-not-defined-in-es-module-scope.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
