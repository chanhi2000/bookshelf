---
lang: en-US
title: "Optimizing TypeScript Configs: Balancing Compilation and Type Checking"
description: "Article(s) > Optimizing TypeScript Configs: Balancing Compilation and Type Checking"
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
      content: "Article(s) > Optimizing TypeScript Configs: Balancing Compilation and Type Checking"
    - property: og:description
      content: "Optimizing TypeScript Configs: Balancing Compilation and Type Checking"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/optimizing-typescript-configs-balancing-compilation-and-type-checking.html
prev: /programming/ts/articles/README.md
date: 2024-06-28
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
  name="Optimizing TypeScript Configs: Balancing Compilation and Type Checking"
  desc="Learn how to optimize TypeScript configurations for lean compilation and type checking. Use rootDir and exclude patterns to manage configuration files without unnecessary compilation."
  url="https://typescript.tv/hands-on/optimizing-typescript-configs-balancing-compilation-and-type-checking"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to optimize TypeScript configurations for lean compilation and type checking. Use rootDir and exclude patterns to manage configuration files without unnecessary compilation.

Modern web tools like Playwright, Vitest, and Webpack allow you to save configurations in TypeScript. Typically, these configuration files are located at the root of your project, while your source code resides in a separate "src" directory. Using this location approach, I faced challenges managing type checking for my configuration files without compiling them when running `tsc`. Luckily, I found a solution which I want to share with you.

---

## Problem Statement

I wanted type checking enabled for configuration files like `playwright.config.ts` and `vitest.config.ts`. By default, TypeScript resolves all files in the directory containing the `tsconfig.json` file. This results in config files being checked but also compiled to JavaScript when running `tsc`. Having a configuration written in a TypeScript file and its emitted JavaScript version can confuse IDE extensions. I actually [encountered an issue (<VPIcon icon="iconfont icon-github"/>`vitest-dev/vscode`)](https://github.com/vitest-dev/vscode/issues/422) when working with the official [Vitest extension (<VPIcon icon="iconfont icon-vscode"/>`vitest.explorer`)](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) for Visual Studio Code. Additionally, placing TypeScript files outside the <VPIcon icon="fas fa-folder-open"/>`src` folder leads to a separate <VPIcon icon="fas fa-folder-open"/>`src` folder within the [<VPIcon icon="iconfont icon-typescript"/>`outDir`](https://typescriptlang.org/tsconfig/#outDir) when running a compilation.

---

## Intended Behavior

I wanted type-checking reports for my configuration files without compiling them to JavaScript when running `tsc`. Additionally, I wanted to avoid having a "src" directory inside my "dist" directory to maintain a flat file structure. Here’s how I achieved this.

---

## Initial TypeScript Configuration

Initially, my `tsconfig.json` was set up like this:

```json title="tsconfig.json"
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "outDir": "dist",
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*", "vitest.config.ts"],
  "extends": "@tstv/tsconfig-common/tsconfig.json"
}
```

My "include" pattern covered everything in the "src" folder plus the Vitest configuration file. Running `tsc --noEmit` flagged issues in my source code or Vitest config but also created an unwanted `dist/vitest.config.d.ts` file and "dist/src" folder.

---

## Defining a root directory

To address this, I defined a "rootDir" so the compiler would only inspect my source code when emitting JavaScript:

```json{4} title="tsconfig.json"
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "types": ["vitest/globals"]
  },
  "include": ["vitest.config.ts"],
  "extends": "@tstv/tsconfig-common/tsconfig.json"
}
```

Unfortunately, this led to the problem that `vitest.config.ts` is outside the root directory, which the TypeScript compiler dislikes, resulting in the following message:

> 'rootDir' is expected to contain all source files.
> 
> The file is in the program because:
> 
> Matched by include pattern 'vitest.config.ts' in 'tsconfig.json'

---

## Using an Exclude Pattern

That's why I used an [<VPIcon icon="iconfont icon-typescript"/>exclude pattern](https://typescriptlang.org/tsconfig/#exclude) to satisfy the `tsc` command. I also took this opportunity to exclude other generated directories, such as documentation or code coverage reports, that the TypeScript compiler might pick up:

```json{8} title="tsconfig.json"
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "types": ["vitest/globals"]
  },
  "exclude": ["coverage", "dist", "docs", "vitest.config.ts"],
  "extends": "@tstv/tsconfig-common/tsconfig.json"
}
```

Now my build configuration was working, but running `tsc --noEmit` didn’t report errors for files matched by the exclude pattern, such as <VPIcon icon="iconfont icon-typescript"/>`vitest.config.ts`. While I could see errors in my IDE, I wanted them to appear when running the `tsc` command.

---

## Creating a Type-Checking Configuration

To solve the missing type-checking for my configuration files, I created another TypeScript configuration that inherits from my main configuration but resets the `rootDir` and `exclude` settings:

```json title="tsconfig.check.json"
{
  "compilerOptions": {
    "noEmit": true,
    "rootDir": "."
  },
  "exclude": [],
  "extends": "./tsconfig.json"
}
```

I named this file `tsconfig.check.json` because I will mainly use it for type checking. It includes the `noEmit` setting as well, so that I don't need to specify it anymore when running the console command. It also helps from accidental compilations.

To use my type-checking configuration, I pass it to the TypeScript compiler with the following command:

```sh
tsc --project tsconfig.check.json
```

I made it part of my "scripts" section in my "package.json" file for easy access:

```json{4} title="package.json"
{
  // ...
  "scripts": {
    "test:types": "tsc --project tsconfig.check.json"
  },
  "type": "module",
  "version": "0.0.0"
}
```

---

## Summary

By using two TypeScript configurations (<VPIcon icon="iconfont icon-json"/>`tsconfig.json` for compilation and <VPIcon icon="iconfont icon-json"/>`tsconfig.check.json` for extended type checking), I can now enjoy all the benefits of TypeScript. This setup allows me to receive error reports for misconfigurations of Vitest and other tools while keeping my output directory clean of these configuration files. The maintenance is also minimal since one TSConfig inherits from the other.

---

## Final Configurations

For compiling with `tsc`:

```json title="tsconfig.json"
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "types": ["vitest/globals"]
  },
  "exclude": ["coverage", "dist", "docs", "vitest.config.ts"],
  "extends": "@tstv/tsconfig-common/tsconfig.json"
}
```

For testing with `tsc --project tsconfig.check.json`:

```json title="tsconfig.check.json"
{
  "compilerOptions": {
    "noEmit": true,
    "rootDir": "."
  },
  "exclude": [],
  "extends": "./tsconfig.json"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Optimizing TypeScript Configs: Balancing Compilation and Type Checking",
  "desc": "Learn how to optimize TypeScript configurations for lean compilation and type checking. Use rootDir and exclude patterns to manage configuration files without unnecessary compilation.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/optimizing-typescript-configs-balancing-compilation-and-type-checking.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
