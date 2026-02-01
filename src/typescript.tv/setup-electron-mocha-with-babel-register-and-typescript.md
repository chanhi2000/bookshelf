---
lang: en-US
title: "Setup electron-mocha with @babel/register and TypeScript"
description: "Article(s) > Setup electron-mocha with @babel/register and TypeScript"
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
      content: "Article(s) > Setup electron-mocha with @babel/register and TypeScript"
    - property: og:description
      content: "Setup electron-mocha with @babel/register and TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/setup-electron-mocha-with-babel-register-and-typescript.html
prev: /programming/ts/articles/README.md
date: 2019-02-19
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
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
  name="Setup electron-mocha with @babel/register and TypeScript"
  desc="This tutorial teaches you how to write tests for Electron using TypeScript and mocha. You'll learn about the necessary dependencies and how to set up your test environment."
  url="https://typescript.tv/testing/setup-electron-mocha-with-babel-register-and-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

This tutorial teaches you how to write tests for Electron using TypeScript and mocha. You'll learn about the necessary dependencies and how to set up your test environment.

Write tests for Electron using TypeScript and mocha. The following tutorial will show you how to create a test setup.

::: note Environment

Tested with:

- Node.js v10.9.0
- Electron v4.0.5

:::

---

## Code files

```json title="package.json"
{
  "devDependencies": {
    "@babel/core": "7.3.3",
    "@babel/plugin-proposal-class-properties": "7.3.3",
    "@babel/preset-env": "7.3.1",
    "@babel/preset-typescript": "7.3.3",
    "@babel/register": "7.0.0",
    "@types/mocha": "5.2.6",
    "electron": "4.0.5",
    "electron-mocha": "6.0.4",
    "typescript": "3.3.3"
  },
  "main": "dist/main.js",
  "scripts": {
    "test": "electron-mocha --require ./babel-register.js src/**/*.test.ts"
  },
  "version": "0.0.0"
}
```

```js title="babel-register.js"
require('@babel/register')({
  cache: false,
  extensions: ['.ts'],
  plugins: ['@babel/proposal-class-properties'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
});
```

```json title="tsconfig.json"
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "target": "es5"
  },
  "exclude": ["dist", "node_modules"]
}
```

---

## Takeaways

### Checklist

- `--require ./babel-register.js` must be used because you need to specify `extensions` for TypeScript and this cannot be done when using just `--require @babel/register`
- `@babel/preset-env` is required with a `node` target because `electron-mocha` runs in a Node.js environment
- `@babel/preset-typescript` is used to turn tests written in TypeScript into JavaScript:

<SiteInfo
  name="TypeScript and Babel 7 - TypeScript"
  desc="Today we’re excited to announce something special for Babel users.Over a year ago, we set out to find what the biggest difficulties users were running into with TypeScript, and we found that a common theme among Babel users was that trying to get TypeScript set up was just too hard. The reasons often varied, but […]"
  url="https://devblogs.microsoft.com/typescript/typescript-and-babel-7//"
  logo="https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2018/10/Microsoft-Favicon.png"
  preview="https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2018/08/typescriptfeature.png"/>

- The `@babel/proposal-class-properties` is optional and only required if you code makes already use of class properties

### Good to know

- When your project contains a `babel.config.js` it may come to conflicts because `@babel/register` will pick it up and might overwrite settings defined in `babel-register.js`: 

```component VPCard
{
  "title": "@babel/register · Babel",
  "desc": "One of the ways you can use Babel is through the require hook. The require hook",
  "link": "https://babeljs.io/docs/babel-register/",
  "logo": "https://babeljs.io/img/favicon.png",
  "background": "rgba(245,218,85,0.2)"
}
```

- Since Mocha 4 the `--compilers` flag is deprecated and got replaced by `--require`:

```component VPCard
{
  "title": "Using Babel",
  "desc": "How to use Babel with your tool of choice.",
  "link": "https://babeljs.io/setup/",
  "logo": "https://babeljs.io/img/favicon.png",
  "background": "rgba(245,218,85,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Setup electron-mocha with @babel/register and TypeScript",
  "desc": "This tutorial teaches you how to write tests for Electron using TypeScript and mocha. You'll learn about the necessary dependencies and how to set up your test environment.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/setup-electron-mocha-with-babel-register-and-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
