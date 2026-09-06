---
lang: en-US
title: "React Now Rusted All The Way Out"
description: "Article(s) > React Now Rusted All The Way Out"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Rust
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
  - rs
  - rust
head:
  - - meta:
    - property: og:title
      content: "Article(s) > React Now Rusted All The Way Out"
    - property: og:description
      content: "React Now Rusted All The Way Out"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/react-now-rusted-all-the-way-out.html
prev: /programming/js-react/articles/README.md
date: 2026-09-04
isOriginal: false
author:
  - name: Andrew Patton
    url: https://blog.master.dev/author/andrewpatton/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10858
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

```component VPCard
{
  "title": "Rust > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/rust/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="React Now Rusted All The Way Out"
  desc="The transition to the Rust version of the React Compiler for the 1,036-file React Router codebase resulted in a significant speed increase, improving build times from 14.3 seconds to 0.81 seconds. The new compiler addresses previous limitations and ensures consistency across the toolchain, making it easier to manage builds with enhanced performance and capabilities."
  url="https://blog.master.dev/react-now-rusted-all-the-way-out/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10858"/>

Following the oxc team’s release of [official support (<VPIcon icon="fa-brands fa-npm"/>`oxc-transform-react`)](https://npmjs.com/package/oxc-transform-react) for the Rust React Compiler on August 4, 2026, we switched our 1,036-file React Router codebase ([<VPIcon icon="fas fa-globe"/>Outlyne](https://outlyne.com), a website builder) over to it and saw a ~17.6× speedup on the compiler portion of our build.

The [v6.1.0 release of (<VPIcon icon="iconfont icon-github"/>`vitejs/vite-plugin-react`)](https://github.com/vitejs/vite-plugin-react/releases/tag/plugin-react%406.1.0) `@vitejs/plugin-react` brought “experimental native React Compiler support”, which you can opt in to by passing `{ compiler: true }` to the plugin in your Vite config. And for those unable to use the Vite React plugin (e.g. if, like us, you’re using React Router in framework mode), [<VPIcon icon="fa-brands fa-npm"/>`@acusti/vite-plugin-react-compiler`](https://npmjs.com/package/@acusti/vite-plugin-react-compiler)` is a minimal Vite plugin to React-compile your codebase regardless of the rest of your build pipeline.

---

## Faster Builds = Happier Devs + Cheaper CI

The headline feature of this change is the speedup. [<VPIcon icon="fas fa-globe"/>Per Boshen](https://oxc.rs/blog/2026-08-18-react-compiler-support.html), the oxc project lead:

::: info "React Compiler Support" *From The JavaScript Oxidation Compiler* (<VPIcon icon="fas fa-globe"/><code></code>)

> It is more than 10 times faster than Babel in our preliminary benchmark.

<SiteInfo
  name="React Compiler Support"
  desc="A collection of high-performance JavaScript tools written in Rust"
  url="https://oxc.rs/blog/2026-08-18-react-compiler-support.html/"
  logo="/logo-without-border.svg"
  preview="https://oxc.rs/og.jpg"/>

:::

We saw more than a 17× speedup, with 1,036 files going from 14.3s when built with Babel to 0.81s natively (single-threaded). This is huge for us because, with the speed of change brought about by agent-assisted software development, CI usage and GitHub Actions minutes have become a real cost center, and waiting on CI is a bummer and puts further pressure on our already overly fragmented task-management brains.

Note that those speedups apply only to the compiler part of the build process. You likely have a lot of other stuff going on during the build, so the overall build time improvement won’t be nearly as dramatic. In our case, the build got around 2.4× faster (22.1s → 9.3s).

---

## What about React Compiler’s limitations?

Despite speed being the headliner, I’m more excited about the benefits of being on the latest and greatest version of the React Compiler, which has already fixed some substantial limitations in JavaScript support that were still present in v1.0 of the Babel-based React Compiler. That includes [support (<VPIcon icon="iconfont icon-github"/>`react/react`)](https://github.com/react/react/pull/35606) for any kind of conditional logic in try/catch blocks, which was a [blocker (<VPIcon icon="fa-brands fa-reddit"/>`reactjs`)](https://reddit.com/r/reactjs/comments/1po9t3c/comment/nufulpp/) for [many (<VPIcon icon="fa-brands fa-reddit"/>`reactjs`)](https://reddit.com/r/reactjs/comments/1po9t3c/comment/nudlx2n/) with the initial stable 1.0 release of the compiler. Another nice fix that landed just [last week (<VPIcon icon="iconfont icon-github"/>`oxc-project/oxc`)](https://github.com/oxc-project/oxc/pull/25724) at the time of writing is support for reassigning a destructured component prop that then gets used in a nested closure, e.g.:

```jsx
export default function Foo({ value }: { value: null | string }) {
  value = value ?? "this is a fallback";
  return <button onClick={() => console.log(value)}>{value}</button>;
}
```

Skipped before, fully supported now. A third common pattern that caused bailouts in the Babel compiler that’s now supported is computed object property keys, e.g.:

```jsx
import { clsx } from "clsx";

export default function Header({ itemCount }: { itemCount: number }) {
  return (
    <header className={clsx({ [`items-${itemCount}`]: itemCount > 0 })}>
      {/* ... */}
    </header>
  );
}
```

Those fixes mean that the new version expands compiler compatibility in our app by an additional seven functions: five thanks to the try/catch improvement, two thanks to computed object property keys. To be clear, there are still limitations to what it supports. The two patterns that I have come across that will still cause the compiler to skip a component/hook are a `throw` from inside a `try` block and logical assignment operators (`??=`, `&&=`, `||=`). But being on the Rust compiler means you will get those fixes when they land. No such luck if you’re stuck on the dead-end Babel-based compiler.

---

## Toolchain Consistency Means No Coverage Gaps

The final reason I’m excited about switching my build over is that my full toolchain is now using the same version of React Compiler with equivalent feature support. After adopting Oxlint’s React Compiler support while still on an earlier version of React Compiler for my build, I filed an [erroneous issue in oxc (<VPIcon icon="iconfont icon-github"/>`oxc-project/oxc`)](https://github.com/oxc-project/oxc/issues/25910) based on the destructured component prop bailout I described earlier, because the component wasn’t optimized during build but also didn’t trigger a lint error, so I thought there was a lint disconnect with the compiler output. Turns out the issue was that Oxlint was using `oxc-transform-react` v0.145.0, which supports that pattern, whereas I was testing with v0.144.0 of the same package.

Now, linter and build use the exact same React Compiler, with the same improvements and limitations, so we don’t have to worry about uncompiled components slipping into our production build.

---

## How to Use It

### Using `@vitejs/plugin-react`

As long as you’re on Vite v8+, switching an existing React Vite build to native React Compiler really just means simplifying it. The current Babel-based [<VPIcon icon="fa-brands fa-react"/>react.dev instructions](https://react.dev/learn/react-compiler/installation#vite) specify to run:

```sh
npm install -D @rolldown/plugin-babel
```

With the following Vite config:

```js title="vite.config.js"
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
```

Going native means shedding some config dead weight. You run:

```sh
npm install -D oxc-transform-react
```

And simplify your Vite config:

```js title="vite.config.js"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ compiler: true })],
});
```

This also means you can remove `@rolldown/plugin-babel` from your `package.json` dev dependencies.

### Not Using `@vitejs/plugin-react` (e.g. React Router Framework Mode)

For codebases that are on React Router in framework mode, the switch is a little different. React Router has its own Vite plugin that should be run in place of the Vite React plugin, so whereas you previously needed to run:

```sh
npm install -D vite-plugin-babel babel-plugin-react-compiler @babel/preset-typescript
```

With the following Vite config:

```js title="vite.config.js"
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import { reactRouter } from "@react-router/dev/vite";

const ReactCompilerConfig = {
  /* optional config if you have it */
};

export default defineConfig({
  plugins: [
    reactRouter(),
    babel({
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
      exclude: /node_modules/,
      include: /.[jt]sx?$/,
    }),
  ],
});
```

You can now drop `vite-plugin-babel`, `babel-plugin-react-compiler`, and `@babel/preset-typescript` entirely and instead just install:

```sh
npm install -D @acusti/vite-plugin-react-compiler
```

And simplify your config to:

```js title="vite.config.js"
import { defineConfig } from "vite";
import reactCompiler from "@acusti/vite-plugin-react-compiler";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter(), reactCompiler()],
  // or, if you need to pass custom compiler config:
  // reactCompiler({ compiler: { /* your existing ReactCompilerConfig */ } })
});
```

Simpler, faster, and more capable. Cheers to that. I think I know [<VPIcon icon="fa-brands fa-wikipedia-w"/>just the right drink](https://en.wikipedia.org/wiki/Rusty_nail_(cocktail)).

```component VPCard
{
  "title": "React Compiler Linting Just Got a Rust-Native Speedup in Oxlint",
  "desc": "The React team made a big splash recently when it announced the release of the Rust rewrite of React Compiler and said that it would be the new canonical version of the compiler going forward. I’ve been on the React Compiler train to enable reliable performance on my AI website builder Outlyne for almost a […]",
  "link": "/blog.master.dev/react-compiler-linting-just-got-a-rust-native-speedup-in-oxlint.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Million.js 3.0",
  "desc": "Million.js caught my eye a few months back because of the big claim it makes: Make React 70% faster. I ended up listening to a podcast with the creator, and the meat of it is: it removes the need for “diffing” the virtual DOM that React uses when re-rendering to find what needs to change, which […]",
  "link": "/blog.master.dev/million-js-3-0.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<SiteInfo
  name="25+ Days of Expert-Led Workshops Coming in 2025 – Master.dev Blog"
  desc="All sorts of great stuff coming up for all our members. Intermediate React, Complete Go, CSS Basics, TypeScript Monorepos, and so much more."
  url="https://blog.master.dev/25-days-of-expert-led-workshops-coming-in-2025"
  logo="https://blog.master.dev/favicon-16x16.png"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/5166"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Now Rusted All The Way Out",
  "desc": "The transition to the Rust version of the React Compiler for the 1,036-file React Router codebase resulted in a significant speed increase, improving build times from 14.3 seconds to 0.81 seconds. The new compiler addresses previous limitations and ensures consistency across the toolchain, making it easier to manage builds with enhanced performance and capabilities.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/react-now-rusted-all-the-way-out.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
