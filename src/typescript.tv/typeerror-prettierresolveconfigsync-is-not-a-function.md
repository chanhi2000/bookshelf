---
lang: en-US
title: "TypeError: prettier.resolveConfig.sync is not a function"
description: "Article(s) > TypeError: prettier.resolveConfig.sync is not a function"
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
      content: "Article(s) > TypeError: prettier.resolveConfig.sync is not a function"
    - property: og:description
      content: "TypeError: prettier.resolveConfig.sync is not a function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/typeerror-prettierresolveconfigsync-is-not-a-function.html
prev: /programming/ts/articles/README.md
date: 2023-12-19
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
  name="TypeError: prettier.resolveConfig.sync is not a function"
  desc="Learn how to fix error: prettier.resolveConfig.sync is not a function. Resolve any issues that arise from updating to Prettier v3 and migrate from Husky & pretty-quick to Lefthook."
  url="https://typescript.tv/hands-on/typeerror-prettierresolveconfigsync-is-not-a-function"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to fix error: prettier.resolveConfig.sync is not a function. Resolve any issues that arise from updating to Prettier v3 and migrate from Husky & pretty-quick to Lefthook.

Type errors are the very reason TypeScript was developed. In JavaScript a type error tends to occur when there are breaking API changes without your code being informed about it because it lacks types. Let's explore this further using the example of Prettier v3 which removed the `resolveConfig.sync` functionality, resuting in breaking plugins like `pretty-quick` or `eslint-plugin-prettier`.

---

## Breaking Changes in Prettier 3

When [<VPIcon icon="iconfont icon-prettier"/>Prettier v3 was released](https://prettier.io/blog/2023/07/05/3.0.0.html), it introduced breaking changes to its API. One notable change was the removal of synchronous public APIs in favor of asynchronous ones. As a result, Prettier plugins that relied on these APIs started to fail and produced the following error:

> TypeError: prettier.resolveConfig.sync is not a function

Some of the plugins that failed were `eslint-plugin-prettier` v4 and `pretty-quick` v3. The team behind `eslint-plugin-prettier` has resolved the issue, so you can update to version 5 to ensure compatibility with Prettier v3. Unfortunately, the `pretty-quick` plugin has not been updated at the time of writing.

---

## Replacing pretty-quick with lefthook

The `pretty-quick` plugin executes Prettier on modified or staged files and is commonly integrated with `husky` to align with Git's lifecycle. All these processes can be substituted with [Lefthook (<VPIcon icon="iconfont icon-github"/>`evilmartians/lefthook`)](https://github.com/evilmartians/lefthook).

### Here are the instructions

1. [<VPIcon icon="fas fa-globe"/>Uninstall husky](https://typicode.github.io/husky/getting-started.html#uninstall) and ensure it leaves no traces in the <VPIcon icon="fas fa-folder-open"/>`.git/hooks` directory of your repository.
2. Remove `pretty-quick` from your <VPIcon icon="iconfont icon-json"/>`package.json` file.
3. Delete any specific configuration files (e.g., <VPIcon icon="iconfont icon-json"/>`.huskyrc.json`).
4. Add `lefthook` to the `devDependencies` section in your <VPIcon icon="iconfont icon-json"/>`package.json` file.
5. Run the installation command for your package manager (`npm install`, `yarn install`, or similar).
6. Confirm that the new Git hooks are in place by executing `npx lefthook install --force`.
7. Customize the <VPIcon icon="iconfont icon-yaml"/>`lefthook.yml` file according to your requirements.

Below is an example lefthook configuration calling Prettier and ESLint:

```yml title="lefthook.yml"
pre-commit:
  parallel: true
  commands:
    format:
      glob: '*.{css,html,json,less,md,scss,yml}'
      run: npx prettier --write --log-level error {staged_files}
    lint:
      glob: '*.{js,jsx,ts,tsx}'
      run: npx eslint {staged_files} --fix
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "TypeError: prettier.resolveConfig.sync is not a function",
  "desc": "Learn how to fix error: prettier.resolveConfig.sync is not a function. Resolve any issues that arise from updating to Prettier v3 and migrate from Husky & pretty-quick to Lefthook.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/typeerror-prettierresolveconfigsync-is-not-a-function.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
