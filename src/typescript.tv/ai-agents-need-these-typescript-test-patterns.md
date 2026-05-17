---
lang: en-US
title: "AI Agents Need These TypeScript Test Patterns"
description: "Article(s) > AI Agents Need These TypeScript Test Patterns"
icon: iconfont icon-typescript
category:
  - TypeScript
  - DevOps
  - Github
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
  - devops
  - github
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > AI Agents Need These TypeScript Test Patterns"
    - property: og:description
      content: "AI Agents Need These TypeScript Test Patterns"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/ai-agents-need-these-typescript-test-patterns.html
prev: /programming/ts/articles/README.md
date: 2026-04-27
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

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="AI Agents Need These TypeScript Test Patterns"
  desc="When the same AI agent writes both the implementation and the tests, ”all tests pass” is no longer evidence of correctness. Learn TypeScript testing patterns that prevent agents from gaming your test suite."
  url="https://typescript.tv/testing/ai-agents-need-these-typescript-test-patterns"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

When the same AI agent writes both the implementation and the tests, "all tests pass" is no longer evidence of correctness. Learn TypeScript testing patterns that prevent agents from gaming your test suite.

This post walks through six TypeScript patterns that progressively harden your test suite against an agent that controls the source code and test code. Each pattern stacks on the last, and you can stop at the level of paranoia your project actually needs.

---

## The Principal-Agent Problem

The classic principal-agent problem in economics describes the conflict that arises when one party (the agent) acts on behalf of another (the principal) and has different incentives. In our case, you (the principal) want code that works. The agent wants the test suite to be green so the task is marked done. Those two goals diverge the moment a test is harder to satisfy than to silently rewrite.

---

## Lessons from Dieselgate

The verifying sources have to live outside the agent's control. Otherwise you end up with the software equivalent of [<VPIcon icon="fa-brands fa-wikipedia-w"/>Dieselgate](https://en.wikipedia.org/wiki/Volkswagen_emissions_scandal), where Volkswagen's engine control software detected when a car was sitting on a regulator's test bench and switched into a cleaner mode that produced legal NOx output. On the road, the same cars emitted up to 40 times the limit.

The verifier ran inside the system it was meant to verify, and the manufacturer optimized for passing the test rather than for the property the test was supposed to measure. The joke is so well established that the [<VPIcon icon="iconfont icon-github"/>`auchenberg/volkswagen`](https://github.com/auchenberg/volkswagen) npm package exists purely to make your tests pass whenever they detect a CI environment.

---

## Surface Separation

No test framework fully solves the principal-agent problem when the agent controls the same files as the verifier. The strongest defenses move the verifier somewhere the agent cannot reach, such as a different repository, a CI-only secret, or a sealed package. Let's look at ways to establish this kind of separation in a TypeScript codebase.

---

## 1. Property-Based Tests with fast-check

This is the highest single-change impact you can make. Instead of asserting specific input and output pairs that an agent can hardcode against, you assert properties that must hold for arbitrary inputs.

Property-based testing originated in the Haskell community with [<VPIcon icon="iconfont icon-haskell"/>QuickCheck](https://hackage.haskell.org/package/QuickCheck) and has since spread to most major languages. Instead of hand-picking inputs, the framework generates hundreds of random values from a description of the input space and checks that an invariant holds for every one of them. When a test fails, the framework shrinks the failing input down to a minimal counterexample, so you see the smallest array, the smallest string, or the simplest object that breaks your code.

The [<VPIcon icon="fas fa-globe"/>fast-check](https://fast-check.dev/) package brings property-based testing to TypeScript and integrates cleanly with [<VPIcon icon="fas fa-globe"/>Vitest](https://vitest.dev/), [<VPIcon icon="iconfont icon-jest"/>Jest](https://jestjs.io/), and [<VPIcon icon="fas fa-globe"/>Mocha](https://mochajs.org/).

Install it with:

```sh
npm i -D fast-check
```

Here's the difference between an example-based test and a property-based one. The example-based test is easy to game, because an agent can hardcode the expected output:

```ts title="example-based-test.ts"
import { add } from './add.js';
 
// Agent can just implement "return 5" to pass:
test('add works', () => expect(add(2, 3)).toBe(5));
```

The property-based test asserts invariants that must hold for 100+ random inputs, leaving no shortcut for the agent to take:

```ts title="property-based-test.ts"
import fc from 'fast-check';
import { add } from './add.js';
 
const int = fc.integer();
 
// a + b === b + a
test('commutative', () => {
  fc.assert(fc.property(int, int, (a, b) => add(a, b) === add(b, a)));
});
 
// a + 0 === a
test('identity is zero', () => {
  fc.assert(fc.property(int, (a) => add(a, 0) === a));
});
```

The `fc.integer()` method is a generator of random values. By default it produces integers and biases towards edge cases like `0`, `1`, `-1`, `Number.MAX_SAFE_INTEGER`, and `Number.MIN_SAFE_INTEGER`. The `fc.property` method wraps the arbitraries and a predicate that should hold for every draw, and `fc.assert` runs that property 100 times by default. If any run fails, fast-check shrinks the offending input down to the smallest failing case before reporting it.

A more realistic example targets a `reverse` function:

```ts title="reverse.test.ts"
import fc from 'fast-check';
import { reverse } from './reverse.js';
 
// reverse(reverse(arr)) === arr
test('reverse is its own inverse', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => JSON.stringify(reverse(reverse(arr))) === JSON.stringify(arr))
  );
});
 
// reverse(arr).length === arr.length
test('reverse preserves length', () => {
  fc.assert(fc.property(fc.array(fc.anything()), (arr) => reverse(arr).length === arr.length));
});
```

To pass these, the agent has to actually implement `reverse` correctly. Property-based testing is so hard to cheat, that it got a [notable endorsement (<VPIcon icon="fa-brands fa-x-twitter"/>`andhaveaniceday`)](https://x.com/andhaveaniceday/status/1643468822752677888) from Jake Bailey of the TypeScript compiler team.

---

## 2. Mutation Testing with Stryker

Property-based tests catch bugs in your application code. Mutation testing catches the bugs in your test code. [<VPIcon icon="fas fa-globe"/>Stryker](https://stryker-mutator.io/) mutates your implementation by flipping `>` to `>=`, removing statements, swapping operators, and then runs your tests. If the tests still pass after the mutation, the mutant has "survived" and your tests are weak. I covered the fundamentals in a previous post on [**boosting your TypeScript tests with mutation testing**](/typescript.tv/boost-your-typescript-tests-with-mutation-testing.md), so here I'll focus on the agent-defense angle.

Install Stryker for [<VPIcon icon="fas fa-globe"/>Vitest](https://vitest.dev/):

```sh
npm i -D @stryker-mutator/core @stryker-mutator/vitest-runner
```

Wire it into [<VPIcon icon="iconfont icon-github"/>GitHub Actions](https://docs.github.com/actions):

```yaml title=".github/workflows/test.yml"
- name: Mutation testing
  run: npx stryker run
```

The build now fails when the mutation score drops below the [threshold](https://stryker-mutator.io/docs/stryker-js/configuration/#thresholds-object). An agent writing tests that satisfy line coverage but miss real bugs gets caught here, because Stryker is testing the tests, not the implementation.

This is also the first real piece of surface separation in the post. CI sits outside the agent's reach (or at least it should), so by running Stryker in the pipeline rather than locally, the verifying instance has moved off the agent's machine and into a system the agent does not control.

---

## 3. Human-owned Acceptance Tests

Property-based tests and mutation testing improve the quality of tests. They don't stop an agent from quietly deleting or weakening tests that get in its way. The cleanest fix is to deny the agent access to those files in the first place.

Claude Code reads a <VPIcon icon="fas fa-folder-open"/>`.claude/`<VPIcon icon="iconfont icon-json"/>`settings.json` file in your project root and applies permission rules before any tool call runs. Add a `deny` list that targets the test directories you want to keep human-owned.

```json title=".claude/settings.json"
{
  "permissions": {
    "deny": ["Edit(tests/acceptance/**)", "Write(tests/acceptance/**)"]
  }
}
```

Now Claude Code refuses to edit or create files anywhere under <VPIcon icon="fas fa-folder-open"/>`tests/acceptance/`. The agent can still iterate against co-located unit tests, but the human-owned acceptance suite is off-limits. You can extend this with `Read` denials if you also want to hide the test source from the model, which is a form of context isolation. The agent only sees pass-or-fail signals from the acceptance suite, never the assertions themselves, so it cannot inspect the test code in order to cheat it.

---

## 4. Human-owned Code Review

Local Claude settings only cover the case where the agent runs through Claude Code on your machine. An agent invoked through a different harness, a CI integration, or another model entirely will not honor your <VPIcon icon="fas fa-folder-open"/>`.claude/`<VPIcon icon="iconfont icon-json"/>`settings.json`.

GitHub offers a feature called [<VPIcon icon="iconfont icon-github"/>CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) that closes that gap. A CODEOWNERS file lives at the root of your repository (or under <VPIcon icon="fas fa-folder-open"/>`.github/`) and maps file path patterns to one or more required reviewers. When a pull request touches a covered path, GitHub automatically requests review from the listed owners. GitLab supports the [<VPIcon icon="iconfont icon-github"/>CODEOWNERS file format](https://docs.gitlab.com/user/project/codeowners/#codeowners-file), so the rest of this section applies there too.

For our case, add a single entry that covers the acceptance directory.

```text title=".github/CODEOWNERS"
/tests/acceptance/  @bennycode
```

Combined with [<VPIcon icon="iconfont icon-github"/>branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) that requires code-owner approval, GitHub now refuses to merge any PR that modifies acceptance tests until a human signs off. The reviewer is notified the moment test code shows up in a diff.

---

## 5. Sealed Black-Box Tests

This is the highest-assurance approach and the most setup. Tests live in a separate package or repository that depends on the published artifact rather than the source.

The agent working on `my-project` has no access to the acceptance repo and cannot read or modify these tests. The CI pipeline for `my-project` publishes a candidate version, the acceptance repo runs against it, and only green builds get promoted to production.

In practice, this pattern is usually employed through nightly run checks or end-to-end test suites written with [<VPIcon icon="iconfont icon-playwright"/>Playwright](https://playwright.dev/), [<VPIcon icon="iconfont icon-cypress"/>Cypress](https://cypress.io/), or similar browser-automation tools. Because of their nature, these tests come with a noticeable report delay. The implementation has to be built, packaged, and deployed before the e2e suite can pick it up, and the e2e run itself can take minutes or hours depending on the surface area covered. Failures land well outside the agent's tight feedback loop, often long after the PR was merged, which is exactly what makes the verifier impossible to game.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "AI Agents Need These TypeScript Test Patterns",
  "desc": "When the same AI agent writes both the implementation and the tests, ”all tests pass” is no longer evidence of correctness. Learn TypeScript testing patterns that prevent agents from gaming your test suite.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/ai-agents-need-these-typescript-test-patterns.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
