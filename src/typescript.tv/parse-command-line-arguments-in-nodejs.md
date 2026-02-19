---
lang: en-US
title: "Parse command line arguments in Node.js"
description: "Article(s) > Parse command line arguments in Node.js"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Parse command line arguments in Node.js"
    - property: og:description
      content: "Parse command line arguments in Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/parse-command-line-arguments-in-nodejs.html
prev: /programming/js-node/articles/README.md
date: 2019-03-12
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Parse command line arguments in Node.js"
  desc="There are several libraries available for building command-line interface (CLI) tools in Node.js, such as optimist, minimist, yargs, Caporal.js, and commander. In this article, the author shares their favorite CLI builder, commander, because it comes with TypeScript definitions."
  url="https://typescript.tv/hands-on/parse-command-line-arguments-in-nodejs"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

There are several libraries available for building command-line interface (CLI) tools in Node.js, such as optimist, minimist, yargs, Caporal.js, and commander. In this article, the author shares their favorite CLI builder, commander, because it comes with TypeScript definitions.

There are many libraries to build CLI tools for Node.js like [<VPIcon icon="iconfont icon-github"/>`substack/node-optimist`](https://github.com/substack/node-optimist), [<VPIcon icon="iconfont icon-github"/>`substack/minimist`](https://github.com/substack/minimist), [<VPIcon icon="iconfont icon-github"/>`yargs/yargs`](https://github.com/yargs/yargs), [<VPIcon icon="iconfont icon-github"/>`mattallty/Caporal.js`](https://github.com/mattallty/Caporal.js) and [<VPIcon icon="iconfont icon-github"/>`tj/commander.js`](https://github.com/tj/commander.js) to name just a few. In the following article Benny gives you an overview of his favorites.

---

## Code samples

My favorite CLI builder is [<VPIcon icon="iconfont icon-github"/>`tj/commander.js`](https://github.com/tj/commander.js) because it comes with TypeScript definitions:

```ts title="commander-example.ts"
import program from 'commander';
 
const pkg = require('../package.json');
const appName = Object.keys(pkg.bin)[0];
 
program
  .description(pkg.description)
  .name(appName)
  .option('-c, --config <path>', 'set path to configuration file')
  .version(pkg.version)
  .parse(process.argv);
 
console.log('Configuration path', program.config);
```

Biggest lack of commander.js is that it does not fail if you have mandatory arguments but don't supply any argument at all. For example, it fails when calling `node program.js -c` because there is no value for `c` but it doesn't fail when just calling `node program.js`. Tested with commander v2.19.0 ([GitHub issue (<VPIcon icon="iconfont icon-github"/>`tj/commander.js#44`)](https://github.com/tj/commander.js/issues/44)).

Luckily, this got fixed in commander.js v4 with the `requiredOption` feature:

```ts title="commander-example.ts"
import { Command } from 'commander';
 
const pkg = require('../package.json');
const appName = Object.keys(pkg.bin)[0];
 
const program = new Command()
  .description(pkg.description)
  .name(appName)
  .requiredOption('-c, --config <path>', 'set path to configuration file')
  .version(pkg.version);
 
program.parse();
 
console.log('Configuration path', program.opts().config);
```

Alternatively, you can use [<VPIcon icon="iconfont icon-github"/>`mattallty/Caporal.js`](https://github.com/mattallty/Caporal.js) which also addresses the issue and is fully written in TypeScript:

```ts title="caporal-example.ts"
import program from 'caporal';
 
const pkg = require('../package.json');
const appName = Object.keys(pkg.bin)[0];
 
program
  .version(pkg.version)
  .description(pkg.description)
  .name(appName)
  .option('--config <config>', 'set path to configuration file', undefined, undefined, true)
  .action((args, options, logger) => {
    logger.info(`Configuration value: ${options.config}`);
  });
 
program.parse(process.argv);
```

Should you just care about getting arguments, you will be good with [<VPIcon icon="iconfont icon-github"/>`substack/minimist`](https://github.com/substack/minimist):

```ts title="minimist-example.ts"
import * as minimist from 'minimist';
 
const argv = minimist(process.argv.slice(1));
```

::: info More Features

- If you want to equip your program with some kind of configuration file (à la `webpack.config.js` or `.babelrc`) I can recommend [<VPIcon icon="iconfont icon-github"/>`davidtheclark/cosmiconfig`](https://github.com/davidtheclark/cosmiconfig) to you. Cosmiconfig searches for and loads configuration files with the extensions `.json`, `.yaml`, `.yml`, or `.js`.
- If you need pattern matching you will probably fall in love with [<VPIcon icon="iconfont icon-github"/>`isaacs/node-glob`](https://github.com/isaacs/node-glob) which are implemened by [<VPIcon icon="iconfont icon-github"/>`isaacs/minimatch`](https://github.com/isaacs/minimatch).
- If you need an interactive command line user interface with prompts, try [<VPIcon icon="iconfont icon-github"/>`SBoudrias/Inquirer.js`](https://github.com/SBoudrias/Inquirer.js).
- For more colorful log messages on the terminal, there is [<VPIcon icon="iconfont icon-github"/>`chalk/chalk`](https://github.com/chalk/chalk).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Parse command line arguments in Node.js",
  "desc": "There are several libraries available for building command-line interface (CLI) tools in Node.js, such as optimist, minimist, yargs, Caporal.js, and commander. In this article, the author shares their favorite CLI builder, commander, because it comes with TypeScript definitions.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/parse-command-line-arguments-in-nodejs.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
