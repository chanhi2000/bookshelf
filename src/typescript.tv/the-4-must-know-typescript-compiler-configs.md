---
lang: en-US
title: "The 4 Must-Know TypeScript Compiler Configs"
description: "Article(s) > The 4 Must-Know TypeScript Compiler Configs"
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
      content: "Article(s) > The 4 Must-Know TypeScript Compiler Configs"
    - property: og:description
      content: "The 4 Must-Know TypeScript Compiler Configs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/the-4-must-know-typescript-compiler-configs.html
prev: /programming/ts/articles/README.md
date: 2024-05-16
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
  name="The 4 Must-Know TypeScript Compiler Configs"
  desc="TypeScript compiler configs are crucial for building apps. Key settings include file locations, syntax specification, module formats, and type checking capabilities. Understanding these configs enhances development. This posts shows you how to build the perfect TypeScript compiler configuration for your project and how configs from frameworks can be extended for ease."
  url="https://typescript.tv/new-features/the-4-must-know-typescript-compiler-configs"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript compiler configs are crucial for building apps. Key settings include file locations, syntax specification, module formats, and type checking capabilities. Understanding these configs enhances development. This posts shows you how to build the perfect TypeScript compiler configuration for your project and how configs from frameworks can be extended for ease.

TypeScript has come a long way, adopted by top frameworks. Using TypeScripts you can build Blogs with [<VPIcon icon="iconfont icon-astro"/>Astro](https://astro.build/), web apps with [<VPIcon icon="fa-brands fa-angular"/>Angular](https://angular.io/), backend systems with [<VPIcon icon="iconfont icon-nestjs"/>Nest](https://nestjs.com/), hybrid apps with [<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/), and more. You can even create macOS and Windows apps with [<VPIcon icon="iconfont icon-electron"/>Electron](https://electronjs.org/), iOS/Android apps with [<VPIcon icon="fa-brands fa-react"/>React Native](https://reactnative.dev/), or command line applications with [<VPIcon icon="fas fa-globe"/>Caporal](https://caporal.io/).

Since TypeScript can be found in this many forms, it is necessary to configure it correctly for compiling the code you write to the specific platform where you intend to run it. Configuring TypeScript will also enhance your development process. The compiler will provide targeted hints for your platform and indicate which syntax is safe to use and which is not.

Well-known frameworks offer predefined configurations to promote the reuse of best practices. It's advisable to leverage these configurations, but before customizing them, it's crucial to understand TypeScript's compiler capabilities and identify the key configurations. This blog post will cover these fundamentals, helping you become a pro at understanding TypeScript configurations.

---

## TypeScript Compiler Configuration

To begin with I'd like to present a configuration that is crystal clear and emphasizes the key aspects of TypeScript's compiler. It's straightforward yet not often showcased in this way. Remember, the TypeScript code you write will be transpiled/compiled into JavaScript code, so the input code differs from the output code. Mastering the "input" vs. "output" concept is key for understanding TypeScript's compiler setup. It's the mental roadmap you need for acing the configuration game.

Let's break it down into input-output pairs, so you can see the mental modal behind a proper configuration:

```json{3,7,11,15} title="tsconfig.json"
{
  "compilerOptions": {
    // Files (1)
    "rootDir": "src", // in
    "outDir": "dist", // out
 
    // Syntax (2)
    "lib": ["ES2022"], // in
    "target": "ES2022", //out
 
    // Modules (3)
    "moduleResolution": "Node16", // in
    "module": "NodeNext", // out
 
    // Type Checking Behaviour (4)
    "strict": true
  }
}
```

Using this TypeScript configuration as a guide, we will explore the various configuration sections to understand their meanings.

---

## File Locations (1)

By default, TypeScript's compilation process outputs all JavaScript files next to your TypeScript files. To better understand what TypeScript's compiler will generate, it's advisable to **separate your input files from your compiled output files**. You can do this by specifying a [<VPIcon icon="iconfont icon-typescript"/>rootDir](https://typescriptlang.org/tsconfig/#rootDir) where your TypeScript code resides and an [<VPIcon icon="iconfont icon-typescript"/>outDir](https://typescriptlang.org/tsconfig/#outDir) where all JavaScript files will be emitted:

```json{3-4} title="tsconfig.json"
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
    // ...
  }
}
```

Please note that all TypeScript files must be located in the `outDir` when it is specified. As TypeScript gains popularity, many configuration files are now being written in TypeScript (such as <VPIcon icon="iconfont icon-typescript"/>`vitest.config.ts` or <VPIcon icon="iconfont icon-typescript"/>`webpack.config.ts`). In such cases, it is recommended to define an array of filenames to be included in the compilation process by specifying an [<VPIcon icon="iconfont icon-typescript"/>include](https://typescriptlang.org/tsconfig/#include) array:

```json{5} title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src/**/*", "vitest.config.ts"]
}
```

---

## Syntax (2)

JavaScript is a cool name for a programming language that implements the ECMAScript Language Specification. Like most specifications, the ECMAScript specification evolves over time through iterations and versions. Not every platform (think of web browsers or different versions of Node.js) supports the most recent specification, so it is important to identify the specific specifications you intend to use when writing your code.

Example: If you have your [<VPIcon icon="iconfont icon-typescript"/>lib](https://typescriptlang.org/tsconfig/#lib) set to `ES2022`, you cannot use `Array.toSorted` because it was introduced in ES2023, the 14th edition of ECMAScript. To make use of this feature, you should specify `"lib": ["ES2023"]` or combine ES2022 with the specific array subset (`ES2023.Array`) like this:

```json{3-4} title="tsconfig.json"
{
  "compilerOptions": {
    "lib": ["ES2022", "ES2023.Array"],
    "target": "ES2022"
    // ...
  }
}
```

TypeScript allows you to write your code with the latest syntax, even for platforms stuck on older ECMAScript versions. This magic happens through "downleveling". When your lib is ahead of your target's ECMAScript version, TypeScript transforms your cutting-edge syntax into a compatible format.

::: tip Example

Node v12 does not understand the `?.` optional chaining operator but when setting your `target` to `ES2019`, TypeScript transform the `?.` into a verbose pattern which checks properties to be defined.

:::

::: note Attention

Note that while syntax features like `?.` can be downleveled, new APIs like `Array.toSorted` cannot be downleveled and won't be polyfilled. Therefore, it's important not to set `lib` to a newer ES version than your `target` if you want to ensure that your code runs smoothly on the target platform.

:::

---

## Modules (3)

Before the specification of ECMAScript modules (ESM), the CommonJS (CJS) module syntax was dominant. With the shift from CJS to ESM, TypeScript had to adapt by creating compatibility between these two worlds and introducing backward-compatible and future-proof settings.

You can specify the way TypeScript resolves import statements in your code by setting the [<VPIcon icon="fa-brands fa-node"/><VPIcon icon="iconfont icon-typescript"/>moduleResolution](https://typescriptlang.org/tsconfig/#moduleResolution) option. There is a moving target called `nodenext` that consistently adopts the most recent module resolution technique from Node.js. If you prefer a technically safe target, you can specify `node16` to refer to the module resolution technique introduced in Node v16. This module resolution approach checks the [<VPIcon icon="fa-brands fa-node"/>type](https://nodejs.org/api/packages.html#type) property in your `package.json` file to decide whether to use the CommonJS or ESM module format.

Once you have determined how you want to import code, you can then specify how your compiled code should be exported. Your module output format is specified through the [<VPIcon icon="iconfont icon-typescript"/>module](https://typescriptlang.org/tsconfig/#module) option. Similar to the `moduleResolution` setting, you will find `node16` and `nodenext` as viable options. As mentioned earlier, the `nodenext` setting can be used to enable experimental features like import assertions. This is beneficial if you want to stay on the cutting edge of technology, but be cautious, as functionality may evolve, and your experimental "next" build could differ. For instance, the import assertion syntax has already been [<VPIcon icon="fa-brands fa-microsoft"/>replaced by import attributes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-3-beta/#import-attributes):

```json{3-4} title="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Node16", // safe setting
    "module": "NodeNext" // experimental setting, enabling "import assertions"
    // ...
  }
}
```

::: info Rule of thumb

Backend applications typically rely on npm packages and are built on Node.js. Therefore, the `module` and `moduleResolution` settings can be set to `Node16` or `NodeNext`. The module resolution is inferred from the `module` setting. So, if you want both to have the same value, just set the `module`.

:::

Frontend applications operate in the browser without a Node.js environment. It is advisable to set `moduleResolution` to `Bundler` and `module` to `ESNext` (as opposed to `NodeNext`) for frontend development.

---

## Type Checking (4)

TypeScript's standout feature is its type checking capability, performed by the compiler to catch errors during compilation which prevent them at runtime. Various type checking features can be enabled in the compiler configuration, often prefixed with "no" like [<VPIcon icon="iconfont icon-typescript"/>`noImplicitAny`](https://typescriptlang.org/tsconfig/#noImplicitAny) or [<VPIcon icon="iconfont icon-typescript"/>`noFallthroughCasesInSwitch`](https://typescriptlang.org/tsconfig/#noFallthroughCasesInSwitch). Enabling strict mode triggers a range of these checks, with the flexibility to incrementally add more type validations as your codebase evolves.

```json{3-4} title="tsconfig.json"
{
  "compilerOptions": {
    "noFallthroughCasesInSwitch": true,
    "strict": true
  }
}
```

::: note

While switching strict mode off is discouraged, it may be necessary when migrating a legacy JavaScript codebase to TypeScript, especially in situations where you don't have the resources to add all the types at once. This gradual transition from plain JavaScript to a type-safe codebase is another remarkable aspect of TypeScript.

:::

---

## Configuration Extensions

As you may have noticed, there are several viable options for setting up TypeScript. Determining which configuration to use may require some time and experience. This is why some organizations provide pre-defined best-practice configurations that you can easily apply. All you need to do is install a specific configuration and extend it using the [<VPIcon icon="iconfont icon-typescript"/>extends](https://typescriptlang.org/tsconfig/#extends) option.

Here's an example of how to extend a configuration built by Microsoft's team for Node v20 applications:

```sh
npm i --save-dev @tsconfig/node20
```

```json{5} title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "extends": "@tsconfig/recommended/node20"
}
```

Frameworks like Astro also provide pre-defined configurations that you can expand upon. For example:

```json{9} title="tsconfig.json"
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    },
    "strict": true
  },
  "extends": "astro/tsconfigs/base"
}
```

---

## Conclusion

With the foundational TypeScript compiler settings shown, you have learned some of the most crucial elements upon which you can build. While there are more options like [<VPIcon icon="iconfont icon-typescript"/>Watch Options](https://typescriptlang.org/tsconfig/#Watch_and_Build_Modes_6250) and [<VPIcon icon="iconfont icon-typescript"/>Language and Environment](https://typescriptlang.org/tsconfig/#Language_and_Environment_6254) settings, these basics empower you to understand and fine-tune your setup.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The 4 Must-Know TypeScript Compiler Configs",
  "desc": "TypeScript compiler configs are crucial for building apps. Key settings include file locations, syntax specification, module formats, and type checking capabilities. Understanding these configs enhances development. This posts shows you how to build the perfect TypeScript compiler configuration for your project and how configs from frameworks can be extended for ease.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/the-4-must-know-typescript-compiler-configs.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
