---
lang: en-US
title: "Switch-True Narrowing in TypeScript: A Practical Alternative to Pattern Matching"
description: "Article(s) > Switch-True Narrowing in TypeScript: A Practical Alternative to Pattern Matching"
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
      content: "Article(s) > Switch-True Narrowing in TypeScript: A Practical Alternative to Pattern Matching"
    - property: og:description
      content: "Switch-True Narrowing in TypeScript: A Practical Alternative to Pattern Matching"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/switch-true-narrowing-in-typescript-a-practical-alternative-to-pattern-matching.html
prev: /programming/ts/articles/README.md
date: 2025-08-19
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
  name="Switch-True Narrowing in TypeScript: A Practical Alternative to Pattern Matching"
  desc="TypeScript 5.3 introduces switch-true narrowing, a feature that simplifies complex if/else chains. By using switch-true narrowing, conditions can be expressed more declaratively, improving code readability and type safety."
  url="https://typescript.tv/new-features/switch-true-narrowing-in-typescript-a-practical-alternative-to-pattern-matching"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript 5.3 introduces switch-true narrowing, a feature that simplifies complex if/else chains. By using switch-true narrowing, conditions can be expressed more declaratively, improving code readability and type safety.

One of the more subtle but powerful features added in TypeScript 5.3 is **switch-true narrowing**. While the name might not sound flashy, the technique lets us write cleaner control flow that feels a lot like pattern matching in languages such as Rust, Haskell, or Scala. In this post, we’ll explore what switch-true narrowing is, how it works, and why you might want to reach for it when your `if/else` chains start getting out of hand.

---

## The Problem with if/else Spaghetti

We've all written logic that looks something like this:

```ts title="main.ts"
protected calculateSignal(result?: number | null | undefined) {
  if (result !== null && result !== undefined && result <= -100) {
    return MomentumSignal.OVERSOLD;
  } else if (result !== null && result !== undefined && result >= 100) {
    return MomentumSignal.OVERBOUGHT;
  } else {
    return MomentumSignal.UNKNOWN;
  }
}
```

This works fine, but the repeated null checks make it harder to see the actual business logic. Each condition reads like a rule, but visually the structure is buried inside nested `if/else` statements. Wouldn't it be nice if we could express this as a set of rules in a more declarative way?

---

## Enter Switch-True Narrowing

TypeScript 5.3 gives us exactly that with [<VPIcon icon="iconfont icon-typescript"/>switch-true narrowing](https://typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#switch-true-narrowing). Instead of switching on a variable, we switch on `true` and let each case be a condition:

```ts title="main.ts"
protected calculateSignal(result?: number | null | undefined) {
  const hasResult = result !== null && result !== undefined;
  const isOversold = hasResult && result <= -100;
  const isOverbought = hasResult && result >= 100;
 
  switch (true) {
    case isOversold:
      return MomentumSignal.OVERSOLD;
    case isOverbought:
      return MomentumSignal.OVERBOUGHT;
    default:
      return MomentumSignal.UNKNOWN;
  }
}
```

At runtime, this works exactly as you'd expect: the first case that evaluates to `true` is executed. But at compile time, TypeScript now narrows types inside each branch based on the condition.

---

## Is This Pattern Matching?

Not quite. True pattern matching (as seen in Rust, Scala, or OCaml) works on the structure of data and often enforces [**exhaustiveness checks**](/typescript.tv/glossary/exhaustiveness-checking.md).

Switch-true narrowing in TypeScript is really just boolean guards with type narrowing. It doesn’t enforce covering all cases, and it doesn’t destructure objects for you.

That said, the ergonomics are very similar: you line up a series of rules, each with a condition and an action, and TypeScript guarantees the types inside each branch are safe.

---

## How It Works

The pattern relies on a simple trick: `switch (true)` evaluates each case expression as a boolean. The first case that evaluates to `true` wins:

```ts
switch (true) {
  case 5 > 3: // true, this executes
    console.log('Math works');
    break;
  case 10 < 2: // false, skipped
    console.log('Never runs');
    break;
}
```

By extracting conditions into named booleans, you make the intent explicit.

---

## Alternative: The ts-pattern Library

If you want true pattern matching syntax, the [ts-pattern (<VPIcon icon="iconfont icon-github"/>`gvergnaud/ts-pattern`)](https://github.com/gvergnaud/ts-pattern) library provides it:

```ts
import { match } from 'ts-pattern';
 
const action = match({ canSell, hasReachedTarget, hasReachedStop })
  .with({ canSell: true, hasReachedTarget: true }, () => sellForTargetPrice())
  .with({ canSell: true, hasReachedStop: true }, () => sellForStopPrice())
  .with({ canSell: true }, () => notTakingSidewaysAction())
  .otherwise(() => notTakingAnyAction());
```

This library gives you exhaustiveness checking (all possible cases of a discriminated union), pattern guards, and more sophisticated matching. It's worth considering for complex pattern matching scenarios, but adds a dependency.

---

## The Future: Native Pattern Matching

There's an active [TC39 proposal (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-pattern-matching`)](https://github.com/tc39/proposal-pattern-matching) to add pattern matching to JavaScript. If it advances, you might eventually write:

```ts
const action = match (state) {
  when { canSell: true, reachedTarget: true }: sellForTargetPrice(),
  when { canSell: true, reachedStop: true }: sellForStopPrice(),
  when { canSell: true }: notTakingSidewaysAction(),
  default: notTakingAnyAction(),
};
```

Until then, `switch (true)` gives you similar benefits with zero dependencies and full TypeScript support.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Switch-True Narrowing in TypeScript: A Practical Alternative to Pattern Matching",
  "desc": "TypeScript 5.3 introduces switch-true narrowing, a feature that simplifies complex if/else chains. By using switch-true narrowing, conditions can be expressed more declaratively, improving code readability and type safety.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/switch-true-narrowing-in-typescript-a-practical-alternative-to-pattern-matching.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
