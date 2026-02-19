---
lang: en-US
title: "TypeScript code coverage with Karma"
description: "Article(s) > TypeScript code coverage with Karma"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Node.js
  - Babel
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
  - node
  - nodejs
  - node-js
  - babel
head:
  - - meta:
    - property: og:title
      content: "Article(s) > TypeScript code coverage with Karma"
    - property: og:description
      content: "TypeScript code coverage with Karma"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/typescript-code-coverage-with-karma.html
prev: /programming/ts/articles/README.md
date: 2019-04-29
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

```component VPCard
{
  "title": "Babel > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-babel/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="TypeScript code coverage with Karma"
  desc="To obtain coverage reports for code running in web browsers, you can configure code coverage with TypeScript and Karma."
  url="https://typescript.tv/testing/typescript-code-coverage-with-karma"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

To obtain coverage reports for code running in web browsers, you can configure code coverage with TypeScript and Karma.

Configuring code coverage with TypeScript and Karma to get coverage reports for code running in web browsers.

::: note Environment

Tested with:

- Node.js v10.9.0
- yarn v1.15.2

:::

## Starter code

```json title="package.json"
{
  "devDependencies": {
    "jasmine": "3.4.0"
  },
  "main": "src/main.js",
  "name": "karma-webpack-babel-typescript-istanbul",
  "scripts": {
    "start": "node index.js",
    "test": "jasmine --config=jasmine.json"
  },
  "version": "0.0.0"
}
```

```json title="jasmine.json"
{
  "random": true,
  "spec_dir": "src",
  "spec_files": ["**/*test.js"],
  "stopSpecOnExpectationFailure": true
}
```

```js title="index.js"
const afterTwoSeconds = require('./src/main');
 
afterTwoSeconds(() => {
  console.log('I will be called after 2 seconds.');
});
```

```js title="src/main.js"
module.exports = function afterTwoSeconds(callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 2000);
  });
};
```

```js title="src/main.test.js"
const afterTwoSeconds = require('./main');
 
describe('afterTwoSeconds', () => {
  it('resolves after 2 seconds', async () => {
    const myCallbackSpy = jasmine.createSpy('myCallbackSpy');
    await afterTwoSeconds(myCallbackSpy);
    expect(myCallbackSpy).toHaveBeenCalled();
  });
});
```

---

## Add Karma

### Update dependencies

Karma needs an [<VPIcon icon="fa-brands fa-npm"/>adapter](https://npmjs.org/browse/keyword/karma-adapter) to know about the Jasmine testing framework. It also needs a [<VPIcon icon="fa-brands fa-npm"/>browser launcher](https://npmjs.org/browse/keyword/karma-launcher) to run the tests within a browser environment.

```json{4-6,12} title="package.json"
{
  "devDependencies": {
    "jasmine": "3.4.0",
    "karma": "4.1.0",
    "karma-chrome-launcher": "2.2.0",
    "karma-jasmine": "2.0.1"
  },
  "main": "src/main.js",
  "name": "karma-webpack-babel-typescript-istanbul",
  "scripts": {
    "start": "node index.js",
    "test": "karma start"
  },
  "version": "0.0.0"
}
```

### Update export

Karma will run the tests inside the operating system's Chrome browser which was in my case Chrome v74. The browser environment does not know about `module.exports`, so we will use the `window` namespace to export our `afterTwoSeconds` function:

```js{10-14} title="src/main.js"
function afterTwoSeconds(callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 2000);
  });
}
 
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = afterTwoSeconds;
} else {
  window.afterTwoSeconds = afterTwoSeconds;
}
```

::: note

We still export our code for Node.js environments, to make our code work in both worlds. That's why we keep [<VPIcon icon="fa-brands fa-node"/>setTimeout](https://nodejs.org/dist/latest-v10.x/docs/api/timers.html#timers_settimeout_callback_delay_args) because it is available in Node.js and browser environments. If we would write `window.setTimeout` it would only work in browsers but fail in Node.js.

:::

### Update test

Our tests will run in the browser so we cannot import code with a `require` statement (CommonJS syntax) anymore and need to use the `window` namespace:

```js{4} title="src/main.test.js"
describe('afterTwoSeconds', () => {
  it('resolves after 2 seconds', async () => {
    const myCallbackSpy = jasmine.createSpy('myCallbackSpy');
    await window.afterTwoSeconds(myCallbackSpy);
    expect(myCallbackSpy).toHaveBeenCalled();
  });
});
```

### Add Karma configuration

A Karma configuration can be interactively created by running `npx karma init`. In our case we reuse the file paths from our Jasmine configuration.

For a successful Karma test run it is important to declare the source code and test code within the `files` property.

Karma can be equipped with a custom [<VPIcon icon="fa-brands fa-npm"/>test reporter](https://npmjs.org/browse/keyword/karma-reporter) but for now we are good with the standard `progress` reporter:

```js title="karma.conf.js"
const jasmineConfig = require('./jasmine.json');
 
module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: jasmineConfig.spec_dir,
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    exclude: [],
    files: ['main.js', ...jasmineConfig.spec_files],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {},
    reporters: ['progress'],
    singleRun: true,
  });
};
```

---

## Add Webpack

### Update dependencies

We need to add `webpack-karma` so that Karma can use `webpack` to preprocess files. This also requires us to include `webpack` in our list of dependencies as it is a peer dependency of `webpack-karma`:

```json{7-8} title="package.json"
{
  "devDependencies": {
    "jasmine": "3.4.0",
    "karma": "4.1.0",
    "karma-chrome-launcher": "2.2.0",
    "karma-jasmine": "2.0.1",
    "karma-webpack": "3.0.5",
    "webpack": "4.30.0"
  },
  "main": "src/main.js",
  "name": "karma-webpack-babel-typescript-istanbul",
  "scripts": {
    "start": "node index.js",
    "test": "karma start"
  },
  "version": "0.0.0"
}
```

::: warning Common mistake

```plaintext
ERROR [preprocess]: Can not load "webpack", it is not registered! Perhaps you are missing some plugin?
```

This happens when you run `karma start` and you forgot to install `webpack`.

:::

### Add Webpack configuration

Thanks to webpack's zero configuration mode and its default settings, we don't need to specify much. All we do is defining a "development" mode to get detailed messages in case of preprocessing errors:

```js title="webpack.config.js"
module.exports = {
  mode: 'development',
};
```

Using a "development" mode will decrypt error messages like `TypeError: r is not a function`.

### Update Karma configuration

In the previous Karma setup, our test code was relying that our business logic is exposed to the `window` namespace (`window.afterTwoSeconds`). Having webpack in place we will now load our business logic through our test code. That's why we don't need to declare our business logic anymore within Karma's `files` pattern. It's sufficient if we just point Karma to our test code because the tests will import the main source code for us. We can also reuse our webpack configuration by requiring it. To activate webpack, we need to declare it as a preprocessor for our test code. We also need to add the webpack configuration to our Karma configuration:

```js{1-2,7,12-15,18-20,23} title="karma.conf.js"
const testCode = 'src/**/*test.js';
const webpackConfig = require('./webpack.config.js');
 
module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    exclude: [],
    files: [
      {pattern: testCode, watched: false}
    ],
    frameworks: ['jasmine', 'webpack],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      [testCode]: ['webpack']
    },
    reporters: ['progress'],
    singleRun: true,
    webpack: webpackConfig
  });
};
```

### Update imports

Our test code will now be preprocessed by webpack which means that we can use Node.js features like `require` statements to import code. Webpack will make sure that the `require` statements get processed into something that can be understood by our Browser environment:

```js{1,6} title="karma.conf.js"
const afterTwoSeconds = require('./main');
 
describe('afterTwoSeconds', () => {
  it('resolves after 2 seconds', async () => {
    const myCallbackSpy = jasmine.createSpy('myCallbackSpy');
    await afterTwoSeconds(myCallbackSpy);
    expect(myCallbackSpy).toHaveBeenCalled();
  });
});
```

---

## Add Babel

[<VPIcon icon="iconfont icon-typescript"/>Babel 7 ships with TypeScript support](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/) and can be used to preprocess code with TypeScript's compiler. You might not need Babel to compile your code with TypeScript but using Babel's ecosystem (with presets like [<VPIcon icon="iconfont icon-babel"/>`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env)) can bring enormous benefits if you want to ship code for various environments. That's why it is the preferred setup in this tutorial, so let's get started with a Babel setup:

### Update dependencies

```sh
yarn add @babel/core babel-loader --dev
```

```json{3-4} title="package.json"
{
  "devDependencies": {
    "@babel/core": "7.4.4",
    "babel-loader": "8.0.5",
    "jasmine": "3.4.0",
    "karma": "4.1.0",
    "karma-chrome-launcher": "2.2.0",
    "karma-jasmine": "2.0.1",
    "karma-webpack": "3.0.5",
    "webpack": "4.30.0"
  },
  "main": "src/main.js",
  "name": "karma-webpack-babel-typescript-istanbul",
  "scripts": {
    "start": "node index.js",
    "test": "karma start"
  },
  "version": "0.0.0"
}
```

### Add Babel configuration

We will start with a very basic Babel configuration which does not define any plugin our sets of plugins (called presets). Without plugins Babel won't do much which is okay for now and will be changed once we add TypeScript to our Babel toolchain.

```js title="babel.config.js"
module.exports = {
  plugins: [],
  presets: [],
};
```

### Update webpack configuration

With the `babel-loader` we are telling `webpack` to process files ending on `.js` or `.jsx` (`/.jsx?$/`) through Babel:

```js{3-11} title="webpack.config.js"
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        test: /.jsx?$/,
      },
    ],
  },
};
```

---

## Add TypeScript

### Update dependencies

```sh
yarn add @babel/preset-typescript @types/jasmine @types/node typescript --dev
```

```json{4-6,13} title="package.json"
{
  "devDependencies": {
    "@babel/core": "7.4.4",
    "@babel/preset-typescript": "7.3.3",
    "@types/jasmine": "3.3.12",
    "@types/node": "12.0.0",
    "babel-loader": "8.0.5",
    "jasmine": "3.4.0",
    "karma": "4.1.0",
    "karma-chrome-launcher": "2.2.0",
    "karma-jasmine": "2.0.1",
    "karma-webpack": "3.0.5",
    "typescript": "3.4.5",
    "webpack": "4.30.0"
  },
  "main": "src/main.js",
  "name": "karma-webpack-babel-typescript-istanbul",
  "scripts": {
    "start": "node index.js",
    "test": "karma start"
  },
  "version": "0.0.0"
}
```

### Add TypeScript configuration

```sh
tsc --init
```

```json title="tsconfig.json"
{
  "compilerOptions": {
    "esModuleInterop": true,
    "lib": ["es6"],
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "target": "es6"
  }
}
```

### Update webpack configuration

```js{8,12-14} title="webpack.config.js"
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        test: /.[tj]sx?$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
```

### Update Babel configuration

```js{3} title="babel.config.js"
module.exports = {
  plugins: [],
  presets: ['@babel/preset-typescript'],
};
```

### Migrate test code

We need to rename <VPIcon icon="fa-brands fa-js"/>`main.test.js` to <VPIcon icon="iconfont icon-typescript"/>`main.test.ts`. Thanks to the `allowJs` [<VPIcon icon="iconfont icon-typescript"/>TypeScript compiler option](https://typescriptlang.org/docs/handbook/compiler-options.html) we can still import our JavaScript business logic within our test code:

```ts title="src/main.test.ts"
const afterTwoSeconds = require('./main');
 
describe('afterTwoSeconds', () => {
  it('resolves after 2 seconds', async () => {
    const myCallbackSpy = jasmine.createSpy('myCallbackSpy');
    await afterTwoSeconds(myCallbackSpy);
    expect(myCallbackSpy).toHaveBeenCalled();
  });
});
```

### Update Karma configuration

Our Karma setup now needs to load our migrated test code:

```js{1} title="karma.conf.js"
const testCode = 'src/**/*test.ts';
const webpackConfig = require('./webpack.config.js');
 
module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    exclude: [],
    files: [{ pattern: testCode, watched: false }],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      [testCode]: ['webpack'],
    },
    reporters: ['progress'],
    singleRun: true,
    webpack: webpackConfig,
  });
};
```

---

## Migrate source code

### Update export

```ts{1} title="src/main.ts"
export function afterTwoSeconds(callback: Function) {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 2000);
  });
}
```

### Update import

```ts{1} title="src/main.test.ts"
import { afterTwoSeconds } from './main';
 
describe('afterTwoSeconds', () => {
  it('resolves after 2 seconds', async () => {
    const myCallbackSpy = jasmine.createSpy('myCallbackSpy');
    await afterTwoSeconds(myCallbackSpy);
    expect(myCallbackSpy).toHaveBeenCalled();
  });
});
```

### Adjust start script

```json{16,19} title="package.json"
{
  "devDependencies": {
    "@babel/core": "7.4.4",
    "@babel/preset-typescript": "7.3.3",
    "@types/jasmine": "3.3.12",
    "@types/node": "12.0.0",
    "babel-loader": "8.0.5",
    "jasmine": "3.4.0",
    "karma": "4.1.0",
    "karma-chrome-launcher": "2.2.0",
    "karma-jasmine": "2.0.1",
    "karma-webpack": "3.0.5",
    "typescript": "3.4.5",
    "webpack": "4.30.0"
  },
  "main": "dist/main.js",
  "name": "karma-webpack-babel-typescript-istanbul",
  "scripts": {
    "start": "tsc && node dist/main.js",
    "test": "karma start"
  },
  "version": "0.0.0"
}
```

---

## Add code coverage

Note: Every package prefixed with `karma-` will be automatically added to [<VPIcon icon="fas fa-globe"/>Karma's plugin section](http://karma-runner.github.io/4.0/config/plugins.html), so no need to define it.

### Update dependencies

```sh
yarn add istanbul-instrumenter-loader karma-coverage-istanbul-reporter --dev
```

### Update Karma configuration

```sh
yarn add istanbul-instrumenter-loader karma-coverage-istanbul-reporter --dev
```

```json{8,12} title="package.json"
{
  "devDependencies": {
    "@babel/core": "7.4.4",
    "@babel/preset-typescript": "7.3.3",
    "@types/jasmine": "3.3.12",
    "@types/node": "12.0.0",
    "babel-loader": "8.0.5",
    "istanbul-instrumenter-loader": "3.0.1",
    "jasmine": "3.4.0",
    "karma": "4.1.0",
    "karma-chrome-launcher": "2.2.0",
    "karma-coverage-istanbul-reporter": "2.0.5",
    "karma-jasmine": "2.0.1",
    "karma-webpack": "3.0.5",
    "typescript": "3.4.5",
    "webpack": "4.30.0"
  },
  "main": "dist/main.js",
  "name": "karma-webpack-babel-typescript-istanbul",
  "scripts": {
    "start": "tsc && node dist/main.js",
    "test": "karma start"
  },
  "version": "0.0.0"
}
```

### Update webpack configuration

```js{10-18} title="webpack.config.js"
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        test: /.[tj]sx?$/,
      },
      {
        enforce: 'post',
        exclude: /(node_modules|.test.[tj]sx?$)/,
        test: /.[tj]s$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
```

### Update Karma configuration

```js{11-14} title="karma.conf.js"
const testCode = 'src/**/*test.ts';
const webpackConfig = require('./webpack.config.js');
 
module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports: ['html'],
    },
    exclude: [],
    files: [{ pattern: testCode, watched: false }],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      [testCode]: ['webpack'],
    },
    reporters: ['progress', 'coverage-istanbul'],
    singleRun: true,
    webpack: webpackConfig,
  });
};
```

---

## Bonus: TypeScript everything!

Since Webpack 5 you can turn the <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` into a TypeScript file called <VPIcon icon="iconfont icon-typescript"/>`webpack.config.ts`. If you are using Webpack 4, you will have to add `@types/webpack` to get type definitions for Webpack's configuration file.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "TypeScript code coverage with Karma",
  "desc": "To obtain coverage reports for code running in web browsers, you can configure code coverage with TypeScript and Karma.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/typescript-code-coverage-with-karma.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
