---
lang: en-US
title: "Setup TypeScript code coverage for Electron applications"
description: "Article(s) > Setup TypeScript code coverage for Electron applications"
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
      content: "Article(s) > Setup TypeScript code coverage for Electron applications"
    - property: og:description
      content: "Setup TypeScript code coverage for Electron applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/setup-typescript-code-coverage-for-electron-applications.html
prev: /programming/ts/articles/README.md
date: 2019-04-08
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
  name="Setup TypeScript code coverage for Electron applications"
  desc="This tutorial teaches you how to include all source files for code coverage reporting in an Electron app. It covers steps such as using `babel` with `electron-mocha`, registering plugins in `babel` to instrument code, and running `nyc` to create a coverage report. The article also provides code snippets and configuration files to help you implement these steps."
  url="https://typescript.tv/testing/setup-typescript-code-coverage-for-electron-applications"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

This tutorial teaches you how to include all source files for code coverage reporting in an Electron app. It covers steps such as using `babel` with `electron-mocha`, registering plugins in `babel` to instrument code, and running `nyc` to create a coverage report. The article also provides code snippets and configuration files to help you implement these steps.

Learn how to include all source files for code coverage reporting in an Electron app. In the following tutorial we will create TypeScript code coverage from Electron's main and renderer process.

---

## Environment

Tested with:

- Node.js v10.9.0
- Electron v4.0.5

To receive code coverage based on TypeScript source code within an Electron environment, we need to do the following:

1. Tell `electron-mocha` to use `babel`
2. Register `@babel/preset-typescript` in `babel` to compile our code on-the-fly
3. Register `istanbul` plugin in `babel` to instrument our compiled code
4. Register a `after` hook in `mocha` to write out our coverage information (provided by `istanbul`)
5. Run `nyc` to create a HTML report from our coverage information stored in `.nyc_output`

```json title="package.json"
{
  "devDependencies": {
    "@babel/core": "7.3.3",
    "@babel/plugin-proposal-class-properties": "7.3.3",
    "@babel/preset-env": "7.3.1",
    "@babel/preset-typescript": "7.3.3",
    "@babel/register": "7.0.0",
    "@types/mocha": "5.2.6",
    "babel-plugin-istanbul": "5.1.1",
    "electron": "4.0.5",
    "electron-mocha": "6.0.4",
    "nyc": "13.3.0",
    "typescript": "3.3.3"
  },
  "main": "dist/main.js",
  "scripts": {
    "coverage": "yarn test && nyc report",
    "test": "electron-mocha --require ./babel-register.js src/**/*.test.main.ts"
  },
  "version": "0.0.0"
}
```

```js title="babel-register.js"
require('@babel/register')({
  cache: false,
  extensions: ['.ts'],
  plugins: [
    '@babel/proposal-class-properties',
    [
      'istanbul',
      {
        exclude: ['**/*.test*.ts'],
      },
    ],
  ],
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

```json title=".nycrc.json"
{
  "all": true,
  "exclude": ["**/*.test*.ts"],
  "extension": [".ts"],
  "include": ["src/**/*.ts"],
  "per-file": false,
  "reporter": ["html"]
}
```

```ts title="after.test.ts"
import * as fs from 'fs-extra';
import * as path from 'path';
 
declare global {
  namespace NodeJS {
    interface Global {
      __coverage__: {};
    }
  }
}
 
const writeCoverageReport = (coverage: Object) => {
  const outputFile = path.resolve(process.cwd(), `.nyc_output/coverage.${process['type']}.json`);
  fs.outputJsonSync(outputFile, coverage);
};
 
after(() => {
  const coverageInfo = global.__coverage__;
  if (coverageInfo) {
    writeCoverageReport(coverageInfo);
  }
});
```

---

## Takeaways

- `nyc` can combine multiple coverage files (like <VPIcon icon="iconfont icon-json"/>`coverage.json`) into one report
- `eletron-mocha` can run tests in an Electron renderer process and in an Electron main process
- To get full code coverage, there needs to be a test run with test files for the main process (<VPIcon icon="iconfont icon-typescript"/>`*.test.main.ts`) and a second run for tests from the renderer process (<VPIcon icon="iconfont icon-typescript"/>`*.test.renderer.ts`)
- Electron provides a `process.type` (can be `browser` or `renderer`) to indicate in which process the code runs
- To have a universal `after` hook for both test runs, the `process.type` can be used in the coverage output file name
- `istanbul` needs to exclude the test files, otherwise it will report code coverage for the test files too

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Setup TypeScript code coverage for Electron applications",
  "desc": "This tutorial teaches you how to include all source files for code coverage reporting in an Electron app. It covers steps such as using `babel` with `electron-mocha`, registering plugins in `babel` to instrument code, and running `nyc` to create a coverage report. The article also provides code snippets and configuration files to help you implement these steps.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/setup-typescript-code-coverage-for-electron-applications.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
