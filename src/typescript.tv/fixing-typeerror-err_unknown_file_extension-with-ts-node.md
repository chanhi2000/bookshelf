---
lang: en-US
title: "Fixing TypeError ERR_UNKNOWN_FILE_EXTENSION with ts-node"
description: "Article(s) > Fixing TypeError ERR_UNKNOWN_FILE_EXTENSION with ts-node"
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
      content: "Article(s) > Fixing TypeError ERR_UNKNOWN_FILE_EXTENSION with ts-node"
    - property: og:description
      content: "Fixing TypeError ERR_UNKNOWN_FILE_EXTENSION with ts-node"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/fixing-typeerror-err_unknown_file_extension-with-ts-node.html
prev: /programming/ts/articles/README.md
date: 2024-11-25
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
  name="Fixing TypeError ERR_UNKNOWN_FILE_EXTENSION with ts-node"
  desc="When using TypeScript with Node.js and ts-node, you might face ”ERR_UNKNOWN_FILE_EXTENSION.” To fix this, you have to use ts-node with specific commands for Node.js module loaders and ESM projects. Consider also alternatives like tsx and tsimp."
  url="https://typescript.tv/hands-on/fixing-typeerror-err_unknown_file_extension-with-ts-node"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

When using TypeScript with Node.js and ts-node, you might face "ERR_UNKNOWN_FILE_EXTENSION." To fix this, you have to use ts-node with specific commands for Node.js module loaders and ESM projects. Consider also alternatives like tsx and tsimp.

When building projects with TypeScript, you might encounter "ERR_UNKNOWN_FILE_EXTENSION" because runtimes like Node.js expect JavaScript and not plain TypeScript code. To fix this, you use ts-node, which runs TypeScript in Node.js. It’s downloaded over 30 million times weekly and is trusted by the TypeScript community. Previously, running `ts-node src/main.ts` was enough to get up and running, but with ECMAScript Modules and Node.js v20+, this will cause the "ERR_UNKNOWN_FILE_EXTENSION" error. Let's see how to fix this.

::: info TL;DR

- The `ts-node` package struggles with ESM projects and Node.js v20+ runtimes
- The [ts-node team is seeking sponsorship (<VPIcon icon="iconfont icon-github"/>`TypeStrong/ts-node#2140`)](https://github.com/TypeStrong/ts-node/issues/2140) to resolve the ESM incompatibilities
- You can switch to `tsx` or `tsimp` as alternatives to `ts-node`
- However, `tsx` doesn't support type checking and `tsimp` has [caching issues (<VPIcon icon="iconfont icon-github"/>`tapjs/tsimp#26`)](https://github.com/tapjs/tsimp/issues/26)
- A recommended approach is to use `tsc` for type checking and `ts-node` for transpiling
- Transpiling with `tsc`can be done like this: `tsc --noEmit`
- Compiling with `ts-node` on Node.js 20+ with ESM support can be done like this: `node --no-warnings=ExperimentalWarning --loader ts-node/esm/transpile-only src/main.ts`
- Combined command: `tsc --noEmit && node --no-warnings=ExperimentalWarning --loader ts-node/esm/transpile-only src/main.ts`
- Note that the `--loader` flag is experimental and deprecated as of Node.js v20.6.0
- If you want to be future-proof, better use `tsc --noEmit && tsx src/main.ts`

:::

---

## How ts-node was working in the past

For a CommonJS project using Node.js 18 with `ts-node`, you can run your code using the following command:

```sh
ts-node main.ts
```

For an ECMAScript Modules (ESM) project with Node.js 18, you need to use:

```sh
ts-node-esm main.ts
```

However, when using Node.js 20 and `ts-node-esm`, you may encounter the following error:

> TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /home/bennycode/dev/main.ts

To work with ESM and `ts-node-esm` in Node.js 20 and above, you must use the Node.js loader flag:

```sh
node --loader ts-node/esm src/main.ts
```

Unfortunately, this method doesn't provide stack traces. In the event of a compiler error, you'll only see an output like this:

```plaintext
node:internal/process/esm_loader:40
internalBinding('errors').triggerUncaughtException
[Object: null prototype] {
  [Symbol(nodejs.util.inspect.custom)]: [Function: [nodejs.util.inspect.custom]]
}
```

---

## How to Make ts-node Work

The "ERR_UNKNOWN_FILE_EXTENSION" error can show up when using ts-node with ECMAScript Modules (ESM) and recent Node.js versions. This is because ts-node v10.9.2 isn't fully compatible with Node.js v20 and ESM ([see GitHub issue (<VPIcon icon="iconfont icon-github"/>`TypeStrong/ts-node#1997`)](https://github.com/TypeStrong/ts-node/issues/1997)). That's why `ts-node-esm` cannot be used directly. Instead, you'll need to use Node.js's `--loader` flag:

```sh
node --loader ts-node/esm src/main.ts
```

### The Problem with the Loader Flag

The `--loader` flag is experimental and was deprecated in Node.js v20.6.0 ([see GitHub issue (<VPIcon icon="iconfont icon-github"/>`nodejs/node#51048`)](https://github.com/nodejs/node/issues/51048)). To suppress the warning you can filter out experimental issues by running:

```sh
node --no-warnings=ExperimentalWarning --loader ts-node/esm src/main.ts
```

While this allows your TypeScript code to run on Node.js, it introduces another limitation: you won't get proper stack traces if your code fails. This is a known issue with the current version of `ts-node` (v10.9.2).

Blake Embrey, the creator of ts-node, has raised a [sponsorship issue (<VPIcon icon="iconfont icon-github"/>`TypeStrong/ts-node#2140`)](https://github.com/TypeStrong/ts-node/issues/2140) to rewrite the ESM loading APIs. Until a proper fix is available, you can use TypeScript's original compiler (`tsc`) to ensure stack traces. Configure `tsc` to perform type checking without emitting JavaScript by enabling the `noEmit` flag. Then, execute `tsc` and `ts-node` together:

```sh
tsc --noEmit && node --no-warnings=ExperimentalWarning --loader ts-node/esm src/main.ts
```

### Disabling Type Checking in ts-node

Since type checking in `ts-node` is currently broken, you can disable it by enabling transpilation-only mode. Normally, you would run:

```sh
ts-node-esm --transpileOnly src/main.ts
```

However, you can't pass the [<VPIcon icon="iconfont icon-typescript"/>`--transpileOnly`](https://typestrong.org/ts-node/docs/options/#transpileonly) flag to Node.js when using `--loader ts-node/esm`, as it results in this error:

> node: bad option: --transpileOnly

In that case, you can use the `TS_NODE_TRANSPILE_ONLY` environment variable:

```sh
TS_NODE_TRANSPILE_ONLY=true tsc --noEmit && node --no-warnings=ExperimentalWarning --loader ts-node/esm src/main.ts
```

### Handling Environment Variables on Windows

On native Windows systems, you'll need a tool like [cross-env (<VPIcon icon="iconfont icon-github"/>`kentcdodds/cross-env`)](https://github.com/kentcdodds/cross-env) to set the environment variable:

```sh
cross-env TS_NODE_TRANSPILE_ONLY=true tsc --noEmit && node --no-warnings=ExperimentalWarning --loader ts-node/esm src/main.ts
```

### Configuring ts-node through tsconfig

As installing another dependency just for the sake of exporting a configuration value isn't ideal, you can configure the transpiling mode for `ts-node` inside of your <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file:

```json title="tsconfig.json"
{
  "ts-node": {
    "transpileOnly": true
  },
  "compilerOptions": {
    //
  }
}
```

This, however, is also an anti-pattern because configurations of external tools get mixed with TypeScript's compiler configuration.

### The Simplest Solution

Fortunately, the `ts-node` package includes a loading module called `ts-node/esm/transpile-only`, which resolves all the issues mentioned above. Thus, the final command will be:

```sh
tsc --noEmit && node --no-warnings=ExperimentalWarning --loader ts-node/esm/transpile-only src/main.ts
```

This approach avoids extra dependencies, suppresses loader warnings, enables type checking and ensures your project runs smoothly with TypeScript on Node.js 20+ with support for ECMAScript Modules.

### Solution for nodemon

Users of [<VPIcon icon="fa-brands fa-npm"/>`nodemon`](https://npmjs.com/package/nodemon) can set up this configuration within the <VPIcon icon="iconfont icon-json"/>`nodemon.json` config file:

```json title="nodemon.json"
{
  "watch": ["src"],
  "ext": "ts",
  "execMap": {
    "ts": "tsc --noEmit && node --no-warnings=ExperimentalWarning --loader ts-node/esm/transpile-only"
  }
}
```

Your program's executable will then be: 

```sh
nodemon src/main.ts
```

---

## The Future of ts-node

The latest version of ts-node was released on December 8, 2023, nearly a year from the time of writing this article. While ts-node is a fantastic tool, it requires improved ESM support. This feature has been the most requested since 2020 and is currently facing over 420 comments on the [issue thread (<VPIcon icon="iconfont icon-github"/>`TypeStrong/ts-node#1007`)](https://github.com/TypeStrong/ts-node/issues/1007). As long as this is an outstanding topic, there are a few options to consider.

### Alternative: tsx

The [tsx tool (<VPIcon icon="iconfont icon-github"/>`privatenumber/tsx`)](https://github.com/privatenumber/tsx) is in active development and can run TypeScript code but it doesn't provide type checking capabilities (tried with tsx v4.19.2). In order to make the best use of TypeScript, you'll need to combine it with `tsc`:

```sh
tsc --noEmit && tsx src/main.ts
```

The great thing about using `tsx` is that you don't have to rely on Node.js's deprecated `--loader` flag.

### Alternative: tsimp

The `tsimp` loader was initiated by Isaac Z. Schlueter, who also wrote npm. It is designed to provide complete type-checking support and can be used as follows:

```sh
TSIMP_DIAG=error node --import=tsimp/import src/main.ts
```

When using it (tsimp 2.0.12) I discovered [caching issues (<VPIcon icon="iconfont icon-github"/>`tapjs/tsimp#26`)](https://github.com/tapjs/tsimp/issues/26) that are difficult to debug. Therefore, I do not recommend it for production use at this time.

### Alternative: Deno

Deno offers first-class support for TypeScript. Running a TypeScript program on Deno is as simple as this:

```sh
deno src/main.ts
```

Be aware that Deno is a completely different environment to Node.js, so you can have a lot of compatibility issues when trying to run your aged Node.js projects on Deno. Yet, Deno has the most incredible video showing how "effortless" it is to [<VPIcon icon="fa-brands fa-youtube"/>set up a TypeScript project in 2024](https://youtube.com/shorts/6802RN_mNTg).

::: info Video Tutorial

<VidStack src="youtube/jn370WEIvjs" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fixing TypeError ERR_UNKNOWN_FILE_EXTENSION with ts-node",
  "desc": "When using TypeScript with Node.js and ts-node, you might face ”ERR_UNKNOWN_FILE_EXTENSION.” To fix this, you have to use ts-node with specific commands for Node.js module loaders and ESM projects. Consider also alternatives like tsx and tsimp.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/fixing-typeerror-err_unknown_file_extension-with-ts-node.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
