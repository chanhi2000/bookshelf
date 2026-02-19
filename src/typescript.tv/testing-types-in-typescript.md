---
lang: en-US
title: "Testing Types in TypeScript"
description: "Article(s) > Testing Types in TypeScript"
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
      content: "Article(s) > Testing Types in TypeScript"
    - property: og:description
      content: "Testing Types in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/testing-types-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2025-08-28
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
  name="Testing Types in TypeScript"
  desc="Testing types in TypeScript is crucial for SDK and API developers to ensure predictable type inferences. Tools like `tsc`, `dtslint`, `tsd`, and `Vitest` can help catch errors early and guarantee type behavior."
  url="https://typescript.tv/hands-on/testing-types-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Testing types in TypeScript is crucial for SDK and API developers to ensure predictable type inferences. Tools like `tsc`, `dtslint`, `tsd`, and `Vitest` can help catch errors early and guarantee type behavior.

If you’re building SDKs or APIs for third-party developers, it makes sense to write tests for your types. Especially if you want to guarantee that consumers get awesome, predictable type inferences, not frustrating surprises. In this article, we’ll explore how to test your types, from quick compiler tricks to dedicated tooling.

---

## Why test types?

Normally, TypeScript types vanish at runtime, so you can’t “run” them like a function. But that doesn’t stop you from verifying them during development, catching wrong assumptions early in your type definitions or APIs.

For library authors, this is huge: you can lock in guarantees about how your types behave, even across future refactors.

---

## Testing types with tsc

The most lightweight way is just using `tsc` with `@ts-expect-error`:

```ts
interface User {
  id: number;
  name: string;
}
 
const good: User = { id: 42, name: 'Alice' };
 
// This directive tells TypeScript that you expect this line to fail.
// @ts-expect-error
const bad: User = { id: 'nope', name: 'Alice' };
```

If you later change the type of `id` to `string`, the bad assignment will become valid, and the `@ts-expect-error` will itself raise an error.

---

## Testing types with dtslint

[dtslint (<VPIcon icon="iconfont icon-github"/>`microsoft/dtslint`)](https://github.com/microsoft/dtslint) was the first dedicated tool for type testing, created by members of the TypeScript team such as Nathan Shively-Sanders, Orta Therox, and Andrew Branch. It works with special comment directives:

```ts
// $ExpectType string
String(42);
 
// $ExpectError
String(true).toFixed();
```

Although it’s deprecated today and has largely been replaced by newer approaches like `tsd`, it’s still in use within the [DefinitelyTyped repository (<VPIcon icon="iconfont icon-github"/>`DefinitelyTyped/DefinitelyTyped`)](https://github.com/DefinitelyTyped/DefinitelyTyped/) and can be handy for legacy projects.

---

## Testing types with tsd

The `tsd` project is backed by well-known developers such as Sindre Sorhus, Matteo Collina, and Orta Therox. With `tsd`, you can write tests for your type definitions (your `.d.ts` files) by creating files with the `.test-d.ts` extension. This convention may look unusual at first and requires you to generate `.d.ts` files from your code beforehand.

Consider the following code:

```ts title="index.ts"
export function concat(a: string | number, b: string | number) {
  return `${a}${b}`;
}
```

When compiled with the [<VPIcon icon="iconfont icon-typescript"/>declaration flag](https://typescriptlang.org/tsconfig/#declaration) enabled, it produces this `.d.ts` file:

```ts title="index.d.ts"
export declare function concat(a: string | number, b: string | number): string;
```

Based on this declaration, we can create a `index.test-d.ts` file to check our types:

```ts title="index.test-d.ts"
import { expectType } from 'tsd';
import { concat } from './index.js';
 
expectType<string>(concat('Ben', 'ny'));
expectType<string>(concat(7, 2));
// @ts-expect-error
expectType<number>(concat(7, 2));
```

When running `tsd` on this code, we will receive a successful test result.

Got it. Here’s a revised **Vitest section** that emphasizes it being the most natural approach:

---

## Testing types with Vitest

If you’re already using [Vitest](https://vitest.dev/) for unit tests, the most natural way to test your types is by using the [`expectTypeOf`](https://vitest.dev/api/expect-typeof.html) helper. It follows the same style and structure as regular unit tests, so you don’t need to learn a new mental model.

```ts title="concat.test.ts"
import { describe, it, expectTypeOf } from 'vitest';
import { concat } from './index.js';
 
describe('concat', () => {
  it('returns a string', () => {
    expectTypeOf(concat('Ben', 'ny')).toEqualTypeOf<string>();
    expectTypeOf(concat(7, 2)).toEqualTypeOf<string>();
  });
});
```

Unlike `tsd`, this approach doesn’t require generating `.d.ts` files or maintaining separate `.test-d.ts` files. You simply write your type tests next to your runtime tests. Remember to update your test command to `vitest --typecheck` so type testing is enabled.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Testing Types in TypeScript",
  "desc": "Testing types in TypeScript is crucial for SDK and API developers to ensure predictable type inferences. Tools like `tsc`, `dtslint`, `tsd`, and `Vitest` can help catch errors early and guarantee type behavior.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/testing-types-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
