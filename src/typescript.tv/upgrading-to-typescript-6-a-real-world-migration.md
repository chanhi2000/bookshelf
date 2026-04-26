---
lang: en-US
title: "Upgrading to TypeScript 6: A Real-World Migration"
description: "Article(s) > Upgrading to TypeScript 6: A Real-World Migration"
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
      content: "Article(s) > Upgrading to TypeScript 6: A Real-World Migration"
    - property: og:description
      content: "Upgrading to TypeScript 6: A Real-World Migration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/upgrading-to-typescript-6-a-real-world-migration.html
prev: /programming/ts/articles/README.md
date: 2026-04-21
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
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
  name="Upgrading to TypeScript 6: A Real-World Migration"
  desc="TypeScript 6 flipped several compiler defaults, deprecated a handful of long-standing options, and gave me a good reason to enable erasableSyntaxOnly. Here's exactly what I reworked in my TypeScript projects to make the upgrade stick."
  url="https://typescript.tv/hands-on/upgrading-to-typescript-6-a-real-world-migration"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

TypeScript 6 flipped several compiler defaults, deprecated a handful of long-standing options, and gave me a good reason to enable erasableSyntaxOnly. Here's exactly what I reworked in my TypeScript projects to make the upgrade stick.

The [<VPIcon icon="fa-brands fa-node"/><VPIcon icon="iconfont icon-typescript"/>TypeScript 6.0 release notes](https://typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html) make the upgrade sound like a single version bump. In practice, the new compiler defaults and deprecated flags gave me a reason to clean up tsconfig files I'd been ignoring, and to make my code compatible with [<VPIcon icon="fa-brands fa-node"/>Node.js native type stripping](https://nodejs.org/learn/typescript/run-natively). Here's exactly what I reworked while migrating my TypeScript projects.

---

## What TypeScript 6 Changes

Most of what's new is default changes, not new syntax. `strict` now defaults to `true`. `module` defaults to `esnext`. `target` defaults to `es2025`. `rootDir` defaults to `.` rather than being inferred. `types` defaults to `[]` instead of automatically pulling in every `@types/*` package. `esModuleInterop` and `allowSyntheticDefaultImports` are now always on and can no longer be disabled.

On the deprecation side: `--module amd`, `umd`, `systemjs`, and `none` are gone. `--outFile` is gone. `baseUrl`, `downlevelIteration`, and `--moduleResolution node` (the old `node10` resolver) are deprecated. `target: es5` earns a deprecation warning. All of these are scheduled for full removal in TypeScript 7. ---

## module and moduleResolution

My first rework was to pin the module target to a fixed version instead of letting `nodenext` drift with every TypeScript release. `module: node16` broke immediately because my codebase uses JSON import attributes for test fixtures:

```plaintext title="output"
error TS2823: Import attributes are only supported when the '--module' option is set
to 'esnext', 'node18', 'node20', 'nodenext', or 'preserve'.
```

I bumped it to `node20` for the module target. Then, trying to mirror it with `moduleResolution: node20` failed:

```plaintext title="output"
error TS6046: Argument for '--moduleResolution' option must be: 'node16', 'nodenext', 'bundler'.
```

Here's the asymmetric trap worth naming explicitly: `module` and `moduleResolution` don't accept the same set of values.

`module` accepts versioned Node targets like `node16`, `node18`, `node20`, and `nodenext`. `moduleResolution` only accepts `node10`, `node16`, `nodenext`, or `bundler`.

The punchline: don't set `moduleResolution` at all when you pick a versioned Node target. TypeScript infers the matching resolver automatically, and writing `moduleResolution: node16` next to `module: node20` looks like a version mismatch when it's actually the only legal pairing. Letting inference do it removes the visual contradiction and one line of config:

```json{3} title="tsconfig.lib.json"
{
  "compilerOptions": {
    "module": "node20"
    // "moduleResoltion": "node16" <- inferred by "node20"
  }
}
```

---

## Redundant Settings Removed

TypeScript 6 let me drop two lines from my frontend tsconfig. `dom.iterable` is now folded into the base `dom` lib, so listing both is redundant. `esModuleInterop: true` is now permanent behavior, so explicitly setting it no longer does anything special.

---

## erasableSyntaxOnly

`erasableSyntaxOnly` was added in TypeScript 5.8 and forbids any syntax that can't be removed by pure type-stripping: enums with runtime members, parameter properties, `namespace` blocks with values, `import = require()`. Turning it on is what made my code eligible for Node's native TypeScript execution (on by default since Node 23.6):

```json{3} title="tsconfig.lib.json"
{
  "compilerOptions": {
    "erasableSyntaxOnly": true,
    "module": "node20"
  }
}
```

That flag surfaced two patterns in my code I had to rework: enums and parameter properties.

---

## Enums Reworked

I replaced every `enum` with an `as const` object paired with a derived type, the pattern I've [**covered in more detail here**](/typescript.tv/why-typescript-enums-are-dead.md):

```ts title="src/exchange/Exchange.ts"
// Before
export enum ExchangeOrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}
 
// After
export const ExchangeOrderSide = {
  BUY: 'BUY',
  SELL: 'SELL',
} as const;
export type ExchangeOrderSide = (typeof ExchangeOrderSide)[keyof typeof ExchangeOrderSide];
```

The `const` and the `type` can share the name `ExchangeOrderSide` because TypeScript keeps two separate namespaces: one for values and one for types. A `const` declaration lives in the value namespace, a `type` alias lives in the type namespace, and each reference resolves according to the position it appears in. That's the same dual identity `enum` had under the hood, and the same reason `class Foo` and `foo: Foo` don't collide.

Call sites using `ExchangeOrderSide.BUY` as a value keep working untouched. Annotations like `side: ExchangeOrderSide` resolve to the union `'BUY' | 'SELL'`. Using a single member in type position no longer works, so every `type: ExchangeOrderType.LIMIT` inside an interface became the string literal `type: 'LIMIT'`.

If you validated an enum with `z.nativeEnum()` from [<VPIcon icon="iconfont icon-zod"/>Zod](https://zod.dev/), the const-object rewrite makes that call the wrong shape. The replacement is `z.enum(['long', 'short'])`, which expresses the same constraint without runtime enum metadata.

---

## Parameter Properties Reworked

Every `constructor(public readonly …)` parameter property had to be promoted to an explicit field and assigned in the body:

```ts title="src/exchange/TradingPair.ts"
// Before
export class TradingPair {
  constructor(
    public readonly base: string,
    public readonly counter: string
  ) {}
}
 
// After
export class TradingPair {
  readonly base: string;
  readonly counter: string;
 
  constructor(base: string, counter: string) {
    this.base = base;
    this.counter = counter;
  }
}
```

The rewrite is mechanical but tedious when the same pattern appears in thirty indicator classes. I delegated that batch to an agent with a precise instruction set.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Upgrading to TypeScript 6: A Real-World Migration",
  "desc": "TypeScript 6 flipped several compiler defaults, deprecated a handful of long-standing options, and gave me a good reason to enable erasableSyntaxOnly. Here's exactly what I reworked in my TypeScript projects to make the upgrade stick.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/upgrading-to-typescript-6-a-real-world-migration.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
