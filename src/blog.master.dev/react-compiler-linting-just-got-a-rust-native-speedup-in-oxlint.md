---
lang: en-US
title: "React Compiler Linting Just Got a Rust-Native Speedup in Oxlint"
description: "Article(s) > React Compiler Linting Just Got a Rust-Native Speedup in Oxlint"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > React Compiler Linting Just Got a Rust-Native Speedup in Oxlint"
    - property: og:description
      content: "React Compiler Linting Just Got a Rust-Native Speedup in Oxlint"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/react-compiler-linting-just-got-a-rust-native-speedup-in-oxlint.html
prev: /programming/js-react/articles/README.md
date: 2026-08-17
isOriginal: false
author:
  - name: Andrew Patton
    url: https://blog.master.dev/author/andrewpatton/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10691
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="React Compiler Linting Just Got a Rust-Native Speedup in Oxlint"
  desc="The React team made a big splash recently when it announced the release of the Rust rewrite of React Compiler and said that it would be the new canonical version of the compiler going forward. I’ve been on the React Compiler train to enable reliable performance on my AI website builder Outlyne for almost a […]"
  url="https://blog.master.dev/react-compiler-linting-just-got-a-rust-native-speedup-in-oxlint/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10691"/>

The React team made a big splash recently when it [announced the release of the Rust rewrite of React (<VPIcon icon="iconfont icon-github"/>`react/react`)](https://github.com/react/react/pull/36173) Compiler and said that it would be the new canonical version of the compiler going forward.

I’ve been on the React Compiler train to enable reliable performance on my AI website builder [<VPIcon icon="fa-brands fa-react"/>Outlyne](https://outlyne.com) for almost a year now, and I haven’t looked back. I no longer think about when I need to `useCallback` or `useMemo`. That, coupled with judicious use of `useEffectEvent` and adherence to [<VPIcon icon="fa-brands fa-react"/>“You Might Not Need An Effect”](https://react.dev/learn/you-might-not-need-an-effect) best practices, has largely freed me from the most common complaints leveled at React by its critics (and, maybe even more so, its proponents).

I’ve also migrated fully onto [<VPIcon icon="iconfont icon-vite"/>Vite](https://vite.dev/) v8 (with Rolldown) and the accompanying oxc ecosystem. There were many replacements recently in the Vite ecosystem:

- Rollup → Rolldown
- eslint → Oxlint
- prettier → oxfmt
- jest → vitest

This means repo-wide code formatting is effectively instantaneous, tests run way faster, and linting is mostly very fast. But React Compiler has held that toolchain back from its full potential.

Most of my build time goes to Babel + React Compiler, and my lint task has been slowed way down by needing to lean on Oxlint’s support for JS plugins to add the React Compiler linter. That linter plugin needs to run Babel, then the React Compiler core to build up the AST and understanding of the code it requires to statically analyze it and report its results. In total, running the React Compiler lint plugin made my lint job take more than three times as long as linting without.

“Not worth it,” you’re probably thinking, “it’s just some lint rules.” So glad you brought that up, because it gets at one last bit of essential context: **I consider running the React Compiler linter, with all rules enabled, to be an indisputable prerequisite** to using React Compiler, something I covered in a [<VPIcon icon="fas fa-globe"/>previous blog post](https://acusti.ca/blog/2025/12/16/react-compiler-silent-failures-and-how-to-fix-them/). Briefly, removing manual memoization to leave it in the hands of React Compiler is magic and simplifies and cleans up your codebase significantly, but it can also bite you hard if you have a situation where the component tree rapidly re-renders without the proper memoization being applied and you happen to introduce some code outside of React Compiler’s supported subset of JavaScript. Doing so causes the compiler to bail out, meaning you lose the automatic memoization and could see significant UX degradation.

It happened to us: a bailout shipped a janky, visually broken (though still functional) animated placeholder in our homepage’s primary prompt input.

---

## Oxlint gets native React Compiler support

While Vite doesn’t have support for the Rust version of React Compiler, `oxlint` [released v1.70.0 (<VPIcon icon="iconfont icon-github"/>`oxc-project/oxc`)](https://github.com/oxc-project/oxc/releases/tag/apps_v1.70.0) in June, which introduced built-in support for the [React Compiler linting plugin (<VPIcon icon="iconfont icon-github"/>`oxc-project/oxc`)](https://github.com/oxc-project/oxc/pull/23202):

::: info From Github (<VPIcon icon="iconfont icon-github"/><code>oxc-project/oxc</code>)

> Adds a nursery `react/react-compiler` rule that runs the React Compiler (`oxc_react_compiler`) in lint-only mode and reports Rules of React violations: conditional hook calls, setState during render, ref access during render, mutation errors, etc.

:::

The oxc team built and released their own vendored React Compiler crate (`oxc_react_compiler`) to power the new built-in ruleset. No more need for the Babel pipeline or the Oxlint jsPlugin escape hatch. I tried switching over and found that all of the existing React Compiler lint rules were fully supported, which I verified by introducing violations and seeing that they were caught. There was a small bug related to type generics, but that was fixed by [<VPIcon icon="iconfont icon-github"/>`oxc-project/oxc/pull#24158`)](https://github.com/oxc-project/oxc/pull/24158), which first shipped in Oxlint v1.73.0. And we **found that the speed gains were as promised**. Switching to the native rule took our lint task from ~29.2s → ~9.1s, a 3.2× speedup courtesy of the native Rust implementation. That number still includes `perfectionist`, a JS plugin with no native Oxlint equivalent that we keep running. When I tried dropping that too, the same lint task runs in ~2.6s, an 11× speedup.

---

## The Option You Never Knew You Needed: `reportAllBailouts`

`react/react-compiler` ships as a “nursery rule”, meaning it’s considered unstable and needs to be explicitly enabled in your config, at which point you can also enable a super useful new config option unique to Oxlint called `reportAllBailouts`. In your <VPIcon icon="iconfont icon-json"/>`.oxlintrc.json`:

```json title=".oxlintrc.json"
{
  "plugins": ["react"],
  "rules": {
    "react/react-compiler": ["error", { "reportAllBailouts": true }]
  }
}
```

Doing so makes the linter report an error on any instance where React Compiler has to bail out from compiling a component or hook. That lets you enforce, at the lint level, a code base where every hook and component is React Compiler compatible. You can achieve the same thing with the eslint React Compiler plugin, but it requires manually enumerating and enabling all of their lint rules in your config, including all of the bailout rules that aren’t a part of the `recommended` preset, and it’s tough to keep it comprehensive. My original list of rules gleaned from the React Compiler linter source was incomplete, and my expanded list had fallen out-of-date by the time I switched to Oxlint.

One tradeoff to the native Oxlint implementation: `react/react-compiler` is a single aggregate rule, covering everything from rules-of-hooks violations to bailouts. Disabling it on a line to quiet an intentional lint violation silences every compiler diagnostic on that line, so we’ve tried to minimize usage of that option. We also added guidance in our `AGENTS.md` warning about the risks of adding `// oxlint-disable-next-line react/react-compiler` in a component or hook.

---

## What About Vite?

So that all covers the lint part of your pipeline, which I would consider fully solved and available on the Rust React Compiler toolchain. But that’s not the case yet for your actual build, even if the rest of your build pipeline is Rust-based.

oxc merged a native, build-time transform version in [June 2026 (<VPIcon icon="iconfont icon-github"/>`oxc-project/oxc/pull#22942`)](https://github.com/oxc-project/oxc/pull/22942), but Rolldown/Vite maintainers pulled that integration back out shortly after shipping it, because enabling it grew Rolldown’s binary by around 17%. On August 4, 2026, oxc published [v0.0.1 of (<VPIcon icon="fa-brands fa-npm"/>`oxc-transform-react`)](https://npmjs.com/package/oxc-transform-react?activeTab=versions). It’s very early, but [the package’s README (<VPIcon icon="iconfont icon-github"/>`oxc-project/oxc`)](https://github.com/oxc-project/oxc/tree/main/napi/transform-react) describes it as “Native Node.js bindings for Oxc’s experimental Rust port of React Compiler”.

The package is intended for low-level usage to transform source code, but I’ve started testing it out to create a Vite plugin to replace the `@rolldown/plugin-babel` part of the recommended Vite React Compiler setup, and it’s promising. I’ll publish a follow-up post about that once it’s stable enough for me to switch over to using it in production.

---

## Try It Out

This only impacts linting, so you can adopt it without touching your build step, regardless of your stack (Next.js, Webpack, Vite, etc). It does require `oxlint`, but the [ESLint to Oxlint migration](https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint.html) is well-established and straightforward. If you’re on ESLint v9/v10 with flat config, there’s a migration tool that will handle it programmatically:

```sh
npx @oxlint/migrate <optional-eslint-flat-config-path>
```

Otherwise, ask your favorite LLM to do it, using the [<VPIcon icon="fas fa-globe"/>migrate-oxlint skill](https://skills.sh/oxc-project/oxc/migrate-oxlint) for extra insurance. Or for the most incremental option, just add Oxlint beside ESLint. It’s so fast that if you drop the existing ESLint React Compiler plugin and adopt the Oxlint version without any other changes, you will speed up your lint step despite adding a brand new tool.

To install Oxlint:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install --save-dev oxlint
```

@tab <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm add -D oxlint
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add -D oxlint
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bun add -D oxlint
```

:::

Create <VPIcon icon="iconfont icon-json"/>`.oxlintrc.json` (simplest version to get started with):

```json title=".oxlintrc.json"
{
  "plugins": ["react"],
  "rules": { "react/react-compiler": "error" }
}
```

Run `npx oxlint`, first without `reportAllBailouts`. The default mode only reports Rules of React violations (conditional hooks, `setState` during render, etc.), which are real bugs worth fixing. Once those are clean, update `.oxlintrc.json` to `"rules": { "react/react-compiler": ["error", { "reportAllBailouts": true }] }` to see everywhere the compiler is silently skipping memoization and where you’re missing out on performance in your app.

One of the most common incompatibilities I’ve run into is:

```jsx
function MyComponent({ value }) {
  value = value ?? someStateValue;
  // ...
}
```

The fix is to replace the reassignment with a rename, which is arguably cleaner anyway:

```jsx
function MyComponent({ value: valueFromProps }) {
  const value = valueFromProps ?? someStateValue;
  // ...
}
```

That little issue will opt out your entire component from React Compiler, meaning you could regress performance in any part of your app simply by adding a nullish prop coercion to a hot path component. But the Oxlint `reportAllBailouts` option will trigger an error if you do so, protecting you from those accidental regressions going forward.

A bailout is what broke our homepage’s animated placeholder, as I mentioned earlier in this post. You can [<VPIcon icon="fas fa-globe"/>read the full story here](https://acusti.ca/blog/2025/12/16/react-compiler-silent-failures-and-how-to-fix-them/). The takeaway: “React Compiler without linting all bailouts considered unsafe”. Protect yourself with Oxlint.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Compiler Linting Just Got a Rust-Native Speedup in Oxlint",
  "desc": "The React team made a big splash recently when it announced the release of the Rust rewrite of React Compiler and said that it would be the new canonical version of the compiler going forward. I’ve been on the React Compiler train to enable reliable performance on my AI website builder Outlyne for almost a […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/react-compiler-linting-just-got-a-rust-native-speedup-in-oxlint.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
