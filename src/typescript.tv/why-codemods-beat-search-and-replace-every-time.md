---
lang: en-US
title: "Why Codemods Beat Search and Replace Every Time"
description: "Article(s) > Why Codemods Beat Search and Replace Every Time"
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
      content: "Article(s) > Why Codemods Beat Search and Replace Every Time"
    - property: og:description
      content: "Why Codemods Beat Search and Replace Every Time"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/why-codemods-beat-search-and-replace-every-time.html
prev: /programming/ts/articles/README.md
date: 2025-12-02
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
  name="Why Codemods Beat Search and Replace Every Time"
  desc="Codemods are automated code transformation tools that parse and modify your source code programmatically. Learn why they're superior to search-and-replace, how major frameworks use them for upgrades, and how to leverage them in your TypeScript projects."
  url="https://typescript.tv/best-practices/why-codemods-beat-search-and-replace-every-time"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Codemods are automated code transformation tools that parse and modify your source code programmatically. Learn why they're superior to search-and-replace, how major frameworks use them for upgrades, and how to leverage them in your TypeScript projects.

Ever spent hours manually updating code after a framework upgrade? Codemods can do it in seconds. These automated code transformation tools are the secret weapon behind smooth migrations in major frameworks like [<VPIcon icon="iconfont icon-expo"/><VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/), [<VPIcon icon="iconfont icon-astro"/>Astro](https://astro.build/), and [<VPIcon icon="iconfont icon-expo"/>Expo](https://expo.dev/). Here's why you should be using them.

---

## What Are Codemods?

Codemods are scripts that programmatically transform your source code. Instead of doing manual find-and-replace operations, codemods parse your code into an [<VPIcon icon="fa-brands fa-wikipedia-w"/>Abstract Syntax Tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree), make semantic changes based on the code's structure, and output the modified code. This means they can safely rename functions, update import statements, restructure components, and handle complex code transformations that would be error-prone if done manually.

The name "codemod" comes from Facebook, where [<VPIcon icon="fa-brands fa-wikipedia-w"/>Justin Rosenstein](https://en.wikipedia.org/wiki/Justin_Rosenstein) coined the term while building the [codemod tool (<VPIcon icon="iconfont icon-github"/>`facebookarchive/codemod`)](https://github.com/facebookarchive/codemod) to keep their massive codebase up-to-date. Today, codemods are an essential part of the JavaScript and TypeScript ecosystem.

---

## Why Codemods Beat Search and Replace

At first glance, a simple find-and-replace might seem sufficient for renaming a function or updating an API call.

Search and replace operates on raw text without understanding code structure. If you search for `getServerSideProps` to replace it with `getServerData`, you'll accidentally modify comments, string literals, and variable names that happen to contain that text. You might even break code in subtle ways that only surface at runtime.

Codemods parse your code into an AST, which represents the logical structure of your program. They know the difference between a function name, a string, and a comment. When a codemod renames a function, it only touches actual function declarations and calls, leaving everything else untouched.

Consider this example where you want to rename an imported function:

```ts title="app.ts"
import { oldFunction } from 'library';
 
// Don't touch this comment about oldFunction
const result = oldFunction('data');
// Don't touch this string literal
console.log('Calling oldFunction with data');
```

A search-and-replace would change all three occurrences. A codemod only changes the import and the actual function call, leaving the comment and string literal alone.

Beyond simple renaming, codemods can handle complex transformations like restructuring component props, converting class components to functional components, or migrating entire API patterns. These are impossible with search-and-replace.

---

## The Tools Behind Codemods

Most codemods in the JavaScript ecosystem rely on a few core libraries:

- **jscodeshift**: The most popular codemod framework. Built by Facebook, it provides a simple API for traversing and transforming ASTs. You write transformation scripts in JavaScript that describe how to find and modify code patterns. [jscodeshift (<VPIcon icon="iconfont icon-github"/>`facebook/jscodeshift`)](https://github.com/facebook/jscodeshift) handles parsing, traversing, and outputting the transformed code.
- **ts-morph**: A wrapper around the TypeScript Compiler API that makes it easier to work with TypeScript code. It's especially useful when you need type information during transformations. Unlike jscodeshift, which focuses on structural changes, [ts-morph (<VPIcon icon="iconfont icon-github"/>`dsherret/ts-morph`)](https://github.com/dsherret/ts-morph) can reason about types and make more sophisticated transformations.
- **Babel**: It can also be used for codemods through its plugin system. While primarily a compiler, Babel's AST transformation capabilities make it suitable for code migrations, especially when dealing with modern JavaScript features.

---

## How Frameworks Use Codemods

Major frameworks have embraced codemods to make upgrades painless.

### Next.js

Next.js provides an official upgrade command that runs codemods automatically:

```sh
npx @next/codemod@canary upgrade latest
```

This command does more than just update your <VPIcon icon="iconfont icon-json"/>`package.json`. It runs transformation scripts that update your code for breaking changes. For example, when Next.js moved from `getServerSideProps` to the App Router's server components, codemods helped developers migrate their data fetching code automatically.

### Astro

Astro provides a similar upgrade utility:

```sh
npx @astrojs/upgrade
```

This command updates Astrocore and all official integrations to compatible versions. Behind the scenes, it runs codemods to update your Astro components when APIs change between major versions. For example, when Astro changed how you access props in components or modified the build configuration format, codemods handled the transformation.

### Expo

React Native developers using Expo can upgrade with:

```sh
expo upgrade
```

This command not only updates dependencies but also runs transformations on your app configuration and native code. When Expo changes the `app.json` schema or deprecated APIs, codemods update your code automatically. Expo's codemods are particularly valuable because React Native projects involve multiple layers: JavaScript code, native configuration files, and platform-specific code. Manual migration across all these layers would be extremely time-consuming.

### ts2esm

Beyond framework upgrades, codemods are perfect for modernizing legacy code. The [ts2esm tool (<VPIcon icon="iconfont icon-github"/>`bennycode/ts2esm`)](https://github.com/bennycode/ts2esm) is a great example of using codemods for a specific migration task: converting TypeScript projects from CommonJS to ES Modules.

---

## Writing Your Own Codemods

You can write custom codemods for project-specific refactoring tasks. Here's a simple example using `jscodeshift` to rename a function:

```js title="rename-function.js"
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
 
  // Find all calls to oldFunction
  root
    .find(j.CallExpression, {
      callee: { name: 'oldFunction' },
    })
    .forEach((path) => {
      path.value.callee.name = 'newFunction';
    });
 
  return root.toSource();
};
```

Run it with:

```sh
npx jscodeshift -t rename-function.js src/
```

For TypeScript projects, `ts-morph` provides a more intuitive API for the same task:

```ts title="rename-function.ts"
import { Project, SyntaxKind } from 'ts-morph';
 
const project = new Project();
project.addSourceFilesAtPaths('src/**/*.ts');
 
for (const sourceFile of project.getSourceFiles()) {
  // Find all call expressions
  sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((callExpr) => {
    const expression = callExpr.getExpression();
    if (expression.getText() === 'oldFunction') {
      expression.replaceWithText('newFunction');
    }
  });
 
  sourceFile.saveSync();
}
```

This updates all calls to `oldFunction` to use `newFunction` across your entire project. The ts-morph API reads more like natural code manipulation than raw AST traversal.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Codemods Beat Search and Replace Every Time",
  "desc": "Codemods are automated code transformation tools that parse and modify your source code programmatically. Learn why they're superior to search-and-replace, how major frameworks use them for upgrades, and how to leverage them in your TypeScript projects.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/why-codemods-beat-search-and-replace-every-time.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
