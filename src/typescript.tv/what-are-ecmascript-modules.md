---
lang: en-US
title: "What are ECMAScript Modules?"
description: "Article(s) > What are ECMAScript Modules?"
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
      content: "Article(s) > What are ECMAScript Modules?"
    - property: og:description
      content: "What are ECMAScript Modules?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/what-are-ecmascript-modules.html
prev: /programming/js-node/articles/README.md
date: 2023-11-10
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
  name="What are ECMAScript Modules?"
  desc="ECMAScript Modules (ESM) enable the importing and exporting of code and are supported in modern web browsers, Deno, Bun, and Node.js. It's recommended to use ESM as major frameworks are already embracing it. Let this tutorial guide you through the process."
  url="https://typescript.tv/new-features/what-are-ecmascript-modules"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

ECMAScript Modules (ESM) enable the importing and exporting of code and are supported in modern web browsers, Deno, Bun, and Node.js. It's recommended to use ESM as major frameworks are already embracing it. Let this tutorial guide you through the process.

ECMAScript Modules (ESM) provide a standardized approach for importing and exporting JavaScript code. This unifies the organization of code in both backend environments (such as Node.js) and frontend environments (like web browsers). Prior to ESM, different systems were used for backend and frontend development. Node.js relied on CommonJS, while the frontend world often utilized the Asynchronous Module Definition (AMD) approach.

---

## Key features of CommonJS

In Node.js each file, such as `math.js`, is treated as an independent module. This means that the variables, functions, and code defined within `math.js` are scoped to that specific module and are not directly accessible from other modules unless explicitly exported using the `module.exports` syntax.

::: tip CommonJS Export Example

```js title="math.js"
function add(a, b) {
  return a + b;
}
 
function subtract(a, b) {
  return a - b;
}
 
module.exports = {
  add,
  subtract,
};
```

:::

To make code from one module available to another, the `require()` function is being used with CommonJS.

::: tip CommonJS Import Example

```js title="app.js"
const { add, subtract } = require('./math.js');
 
console.log(add(72, 13)); // 85
console.log(subtract(72, 13)); // 59
```

:::

---

## Downsides of CommonJS

CommonJS was designed for server-side development, and its syntax and module resolution were not natively supported by web browsers. CommonJS packages are loaded synchronously, which means that when you use the `require()` function to import a module, it blocks the execution of the code until the required module is fully loaded. In frontend development, where asynchronous loading and non-blocking operations are crucial for performance, this synchronous nature was a significant drawback.

---

## Key features of ECMAScript Modules

The ESM standard was established by [<VPIcon icon="fas fa-globe"/>Ecma International](https://ecma-international.org/) to bring consistency to module systems across both frontends and backends. ESM provides a modern packaging approach as it supports asynchronous loading and is natively [<VPIcon icon="fa-brands fa-firefox"/>supported in modern web browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_compatibility), Deno, Bun, and Node.js.

Using ECMAScript modules, code can be imported with relative file paths or URLs. Here's an example of how exports work in Node.js with ESM:

::: tip ESM Export Example

```js title="math.mjs"
function add(a, b) {
  return a + b;
}
 
function subtract(a, b) {
  return a - b;
}
 
export { add, subtract };
```

Please note that the file extension was changed from `.js` to `.mjs` in order to signal Node.js that we are making use of the ECMAScript modules syntax instead of CommonJS. The `module.exports` assignment has also been replaced using an [<VPIcon icon="fa-brands fa-firefox"/>export declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export).

::: tip ESM Import Example

In order to import the code, we also have to change the extension of our importing file from `.js` to `.mjs`. Additionally, we have to switch to the [<VPIcon icon="fa-brands fa-firefox"/>`import` syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import):

```js title="app.mjs"
import { add, subtract } from './math.mjs';
 
console.log(add(72, 13)); // 85
console.log(subtract(72, 13)); // 59
```

If we don't use the correct file extension, we may see this error:

> SyntaxError: Cannot use import statement outside a module

---

## Choosing a Module Loader for Your Project

As of [<VPIcon icon="fa-brands fa-node"/>Node.js v13.2.0](https://nodejs.org/en/blog/release/v13.2.0), you can include `"type": "module"` in your `package.json` configuration to enable the ECMAScript module loader. By doing so, there's no need to modify all the file extensions from `.js` to `.mjs`. To enforce the use of CommonJS for certain files, you can employ the `.cjs` extension.

Vice versa, you use `"type": "commonjs"` in your `package.json` file to utilize CommonJS. You can then apply the `.mjs` extension to treat individual files with the ECMAScript module loader.

---

## Using ECMAScript Modules in Frontend Applications

Importing an ESM module into a website is simple. Similar to setting `"type": "module"` in a Node.js application, you can define `type="module"` within a `<script>` tag. Following that, you can use ESM's `import` syntax and start using the imported code:

```html title="index.html"
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <script type="module">
      import { UUID } from 'https://unpkg.com/uuidjs@^5';
 
      const uuid = UUID.generate();
      console.log(uuid);
    </script>
  </head>
  <body></body>
</html>
```

---

## Using ESM with TypeScript

TypeScript does a fantastic job in supporting CommonJS and ESM. It allows developers to define module resolution and export strategies for their own code. If you are already making use of the `import` and `export` syntax, then you can easily switch to ESM. Simply change the values for [<VPIcon icon="iconfont icon-typescript"/>module](https://typescriptlang.org/tsconfig#module) and [<VPIcon icon="iconfont icon-typescript"/>moduleResolution](https://typescriptlang.org/tsconfig#moduleResolution) in your `tsconfig.json` file.

The `"moduleResolution"` setting defines how you import code and the `"module"` setting defines how you export code. With the [<VPIcon icon="fa-brands fa-microsoft"/>correctness fixes in TypeScript 5.2](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#breaking-changes-and-correctness-fixes) these two settings are very much correleated to another. That's why it's advisable to keep them in sync.

::: info Module Values

- `node10` (previously `node`): This has to be set for Node.js environments that only support CommonJS (`module.exports` & `require`)
- `node16`: This is a stable setting if you want to support ESM or CommonJS (depending on your file extension or the `"type"` in your `package.json` file)
- `nodenext`: This is a nightly build setting and will use the latest module resolution features (recommended if you want to use experimental features such as [<VPIcon icon="fas fa-globe"/>JSON import assertions](https://v8.dev/features/import-assertions))
- `esnext`: This is a nightly build setting (similar to `nodenext`) for frontend applications

:::

It's sufficient to only set the value for `"module"` as it will affect the `"moduleResolution"`. Only if you want them to be different, you need to specify them indivually. The [<VPIcon icon="iconfont icon-typescript"/>esModuleInterop](https://typescriptlang.org/tsconfig#esModuleInterop) option is also coupled to the `"module"` setting and is already set to `true` if using `node16` or `nodenext`.

### ESM Imports & Exports

ECMAScript modules require explicit file extensions in import and export statements. Add a `.js` extension to your code. Yes, you read it right - even when using TypeScript with `.ts` files, mark the imports with `.js`. The TypeScript compiler will handle this seamlessly.

::: tabs

@tab:active Before

```ts title="example.ts"
import { AccountAPI } from '../account';
import { RESTClient } from './client/RESTClient';
```

@tab After

```ts title="example.ts"
import { AccountAPI } from '../account/index.js';
import { RESTClient } from './client/RESTClient.js';
```

:::

::: tip Pro tip

You can skip the manual work by using a code conversion tool like [TS2ESM (<VPIcon icon="iconfont icon-github" />`bennycode/ts2esm`)](https://github.com/bennycode/ts2esm).

<VidStack src="youtube/bgGQgSQSpI8" />

:::

### Module File Extensions

Just as the `.mjs` and `.cjs` file extensions are introduced, TypeScript brings forth the `.mts` and `.cts` extensions, accompanied by their type definition extensions `.d.mts` and `.d.cts`. But don't worry, if you specify your module format in your `package.json` file using the `"module"` setting, you can still use plain `.ts` files without any problems.

### Recommendation for TypeScript Backends

When working on code for Node.js environments, it's recommended to use `node16` as it provides stability. This setting is also recommended by the TypeScript team for Node v18-20 (see comment [here (<VPIcon icon="iconfont icon-github" />`tsconfig/bases`)](https://github.com/tsconfig/bases/pull/197#discussion_r1239170642)). If you need to import JSON files, make sure to set the `"module"` to `nodenext`, as JSON import assertions won't be accessible otherwise.

### Recommendation for TypeScript Frontends

When using an external bundler such as [esbuild (<VPIcon icon="iconfont icon-github" />`evanw/esbuild`)](https://github.com/evanw/esbuild), it is recommended to set `"module"` to `esnext` and `"moduleResolution"` to `bundler`. The `bundler` setting eliminates the need for file extensions on relative paths.

### Templates for TS configs

To save time and effort, you can use configuration templates. The TypeScript maintainers and alumni have published [reusable config templates (<VPIcon icon="iconfont icon-github" />`tsconfig/bases`)](https://github.com/tsconfig/bases) that can be used with the [<VPIcon icon="iconfont icon-typescript"/>extends](https://typescriptlang.org/tsconfig#extends) option. Just install the base templates and extend the desired configuration:

```sh
npm install --save-dev @tsconfig/node20
```

```json title="tsconfig.json"
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "extends": "@tsconfig/node20/tsconfig.json"
}
```

Frameworks, such as [<VPIcon icon="iconfont icon-astro"/>Astro](https://astro.build/), also offer configurations that work seamlessly out-of-the-box:

```json title="tsconfig.json"
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "extends": "astro/tsconfigs/base"
}
```

---

## Should you use ECMAScript Modules?

**Absolutely!** The Ecma International group is the powerhouse behind standardizing JavaScript and introducing ECMAScript modules as **THE** way to import and export code. It's crystal clear that this will sweep away previous solutions, with major frameworks already embracing the change.

A few examples:

- [<VPIcon icon="fas fa-globe"/>Prettier ships ESM standalone bundles](https://prettier.io/blog/2023/07/05/3.0.0.html)
- [<VPIcon icon="iconfont icon-deno"/>Deno is advocating ES modules](https://deno.com/blog/commonjs-is-hurting-javascript)
- [Jest works on native support for ES modules (<VPIcon icon="iconfont icon-github" />`jestjs/jest`)](https://github.com/jestjs/jest/issues/9430)
- [<VPIcon icon="iconfont icon-tailwindcss"/>Tailwind CSS can be configured in ESM](https://tailwindcss.com/blog/tailwindcss-v3-3#esm-and-type-script-support)
- [<VPIcon icon="fas fa-globe"/>TypeScript's development team has rebuilt its codebase](https://infoworld.com/article/3690342/typescript-50-rebuilt-to-use-ecmascript-modules.html) to use ECMAScript modules
- [<VPIcon icon="fas fa-globe"/>Vitest](https://vitest.dev/) has fully-fledged ESM support
- Redux maintainer Mark Erikson gives a handful of advices [<VPIcon icon="fas fa-globe"/>modernizing packages to ESM](https://blog.isquaredsoftware.com/2023/08/esm-modernization-lessons/)

However, if transitioning your code to ESM isn't feasible at the moment, there are tools available to assist you. Isaac Z. Schlueter, the creator of npm, published a tool called [tshy (<VPIcon icon="iconfont icon-github" />`isaacs/tshy`)](https://github.com/isaacs/tshy) for this purpose, enabling you to distribute your code as hybrid modules, compatible with both CommonJS and ES modules.

Andrew Branch, who is working on TypeScript at Microsoft, developed a solution called "[Are the types wrong? (<VPIcon icon="iconfont icon-github" />`arethetypeswrong/arethetypeswrong.github.io`)](https://github.com/arethetypeswrong/arethetypeswrong.github.io)". It provides a website and [CLI (<VPIcon icon="fa-brands fa-npm"/>`@arethetypeswrong/cli`)](https://npmjs.com/package/@arethetypeswrong/cli) to examine contents of npm packages to identify issues with their TypeScript types, with a focus on errors related to ESM module resolution.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What are ECMAScript Modules?",
  "desc": "ECMAScript Modules (ESM) enable the importing and exporting of code and are supported in modern web browsers, Deno, Bun, and Node.js. It's recommended to use ESM as major frameworks are already embracing it. Let this tutorial guide you through the process.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/what-are-ecmascript-modules.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
