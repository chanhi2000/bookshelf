---
lang: en-US
title: "Why TypeScript Enums Are Dead"
description: "Article(s) > Why TypeScript Enums Are Dead"
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
      content: "Article(s) > Why TypeScript Enums Are Dead"
    - property: og:description
      content: "Why TypeScript Enums Are Dead"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/why-typescript-enums-are-dead.html
prev: /programming/ts/articles/README.md
date: 2025-11-04
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
  name="Why TypeScript Enums Are Dead"
  desc="Node.js v22.6.0 introduced type-stripping support that lets you run TypeScript files directly, but it breaks traditional enums. Learn why as const objects are the modern, future-proof alternative that works seamlessly with Node's new capabilities."
  url="https://typescript.tv/best-practices/why-typescript-enums-are-dead"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Node.js v22.6.0 introduced type-stripping support that lets you run TypeScript files directly, but it breaks traditional enums. Learn why as const objects are the modern, future-proof alternative that works seamlessly with Node's new capabilities.

When Node.js introduced **type-stripping support** in version 22.6.0, it changed something fundamental about how we write TypeScript. Starting with v22.18.0, type stripping is enabled by default, allowing you to run `.ts` files directly with `node file.ts` without any flags. For older versions (v22.6.0 to v22.17.0), you need to explicitly enable it with the `--experimental-strip-types` flag. However, this only works if your code uses erasable TypeScript syntax. Node can execute TypeScript code and simply strip out the type annotations at runtime, with no build step required.

This feels magical for most TypeScript features, but there's one notable exception that breaks this elegant workflow: the traditional `enum`.

---

## The Type-Stripping Revolution

Node's type-stripping capability works seamlessly with standard TypeScript syntax. Since v22.18.0, it's enabled by default. You can write code like this and run it directly with `node example.ts`:

```ts
function greet(name: string) {
  console.log(`Hello, ${name}!`);
}
 
greet('TypeScript');
```

Node simply strips out the type annotations and executes the JavaScript underneath. No TypeScript compiler, no build configuration, no waiting for compilation. It's the compile-less TypeScript experience developers have been waiting for.

---

## The Enum Problem

Traditional TypeScript enums create a problem for this workflow because they aren't erasable syntax. When you define an enum, TypeScript generates actual runtime code to create an object. Consider this example:

```ts
enum Color {
  Red,
  Green,
  Blue,
}
 
console.log(Color.Red);
```

If you try to run this directly with Node:

```sh
node color.ts
```

You'll encounter an error:

> SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode

This happens because enums require code transformation, not just type erasure. Node's built-in type stripper only handles erasable syntax and can't transform code that needs to generate runtime objects. While you can work around this using the `--experimental-transform-types` flag (available since v22.7.0), which automatically enables [<VPIcon icon="fa-brands fa-node"/>type stripping](https://nodejs.org/api/typescript.html#type-stripping) and adds support for enums and namespaces, relying on experimental flags for production code isn't ideal. The flag's behavior may change in future versions, and using erasable-only syntax ensures maximum compatibility.

---

## The Modern Alternative

Instead of fighting against Node's type-stripping architecture, you can achieve the same functionality using plain objects with `as const`. This pattern provides the same clarity and type safety while working perfectly with Node's erasable-only approach:

```ts
const Color = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
} as const;
 
type Color = (typeof Color)[keyof typeof Color];
 
function paint(color: Color) {
  console.log(`Painting with "${color}"`);
}
 
paint(Color.RED);
```

TypeScript supports exporting both a value (const) and a type with the same name.

This approach offers several advantages. It works seamlessly with Node's type stripping because it's just JavaScript plus types. There's zero runtime overhead and no special compiler transformations required. You maintain both runtime constants and compile-time type safety. The pattern also plays nicely with modern tooling like ESLint, bundlers, and type checkers.

---

## When to Use Type Unions

If you don't need a runtime object at all and just want a set of allowed string values, you can use an even simpler approach with type unions:

```ts
type Role = 'admin' | 'editor' | 'viewer';
```

This syntax is fully erasable and stripped by Node with zero runtime footprint. It's perfect for situations where you only need compile-time type checking without any runtime constants.

---

## Catching Errors at Compile Time

TypeScript 5.8 introduced the [<VPIcon icon="iconfont icon-typescript"/>`--erasableSyntaxOnly`](https://typescriptlang.org/tsconfig/#erasableSyntaxOnly) compiler flag to help you catch compatibility issues before runtime. When this flag is enabled, TypeScript will only allow constructs that can be erased from a file and will issue compile-time errors if it encounters syntax that requires transformation.

This means you'll get immediate feedback in your editor when you try to use enums, namespaces with runtime code, parameter properties in classes, or import aliases. Instead of discovering incompatibility when you run your code with Node, TypeScript will warn you during development, making it much easier to write code that works seamlessly with Node's type-stripping feature.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why TypeScript Enums Are Dead",
  "desc": "Node.js v22.6.0 introduced type-stripping support that lets you run TypeScript files directly, but it breaks traditional enums. Learn why as const objects are the modern, future-proof alternative that works seamlessly with Node's new capabilities.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/why-typescript-enums-are-dead.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
