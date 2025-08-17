---
lang: en-US
title: "Using ES modules in Node.js"
description: "Article(s) > Using ES modules in Node.js"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using ES modules in Node.js"
    - property: og:description
      content: "Using ES modules in Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/es-modules-in-node-today.html
prev: /programming/js-node/articles/README.md
date: 2021-03-03
isOriginal: false
author:
  - name: Alexander Nnakwue
    url : https://blog.logrocket.com/author/alexandernnakwue/
cover: /assets/image/blog.logrocket.com/es-modules-in-node-today/banner.jpeg
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
  name="Using ES modules in Node.js"
  desc="Learn about the state of ES modules in Node today, including concerns realted to transitioning from and interoperability with CommonJS."
  url="https://blog.logrocket.com/es-modules-in-node-today"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/es-modules-in-node-today/banner.jpeg"/>

::: note Editor’s note

This article was updated on 3 March 2021.

:::

---

## Introduction

![ES Modules In Node Today](/assets/image/blog.logrocket.com/es-modules-in-node-today/banner.jpeg)

::: info Ralph Johnson

> “Before software can be reusable, it first has to be usable.”

```component VPCard
{
  "title": "Ralph Johnson (computer scientist) - Wikipedia",
  "desc": "Ralph E. Johnson is a Research Associate Professor in the Department of Computer Science at the University of Illinois at Urbana-Champaign. He is a co-author of the influential computer science textbook Design Patterns: Elements of Reusable Object-Oriented Software, for which he won the 2010 ACM SIGSOFT Outstanding Research Award.",
  "link": "https://en.wikipedia.org/wiki/Ralph_Johnson_(computer_scientist)/",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

[<FontIcon icon="fa-brands fa-wikipedia-w"/>Modules](https://en.wikipedia.org/wiki/Module) are independent building blocks of a software program. They are basically a design pattern that implements features of [<FontIcon icon="fa-brands fa-wikipedia-w"/>modular design](https://en.wikipedia.org/wiki/Modular_programming) in programming languages. The module system is supported in many languages and is quite popular since the way dependencies are handled, packaged, and managed determines how easy it is to work with a large and growing source code.

In modular design, business logic pertaining to particular features or functionalities are packaged (modularized) in a standardized format for reusability, flexibility, and for the sake of reducing complexity. This setup affords a loosely coupled system due to a smooth interface of communication, as there are no global variables or shared state.

Although the concept of modules is [<FontIcon icon="fa-brands fa-wikipedia-w"/>quite different depending on the language](https://en.wikipedia.org/wiki/Modular_programming#Terminology), they are akin to the idea of [<FontIcon icon="fa-brands fa-wikipedia-w"/>namespaces](https://en.wikipedia.org/wiki/Module_pattern#Namespaces) in languages like Java. Modules enable code organization by splitting a codebase into reusable components such that each performs individual functions and can be combined or composed to form larger functionalities or an entire application.

In Node.js, the [<FontIcon icon="fa-brands fa-node"/>module system](https://nodejs.org/docs/latest/api/modules.html#modules_modules) has come a long way from its earlier adoption of [<FontIcon icon="fas fa-globe"/>CommonJS](https://requirejs.org/docs/commonjs.html). Today, [<FontIcon icon="fa-brands fa-node"/>ECMAScript modules](https://nodejs.org/dist/latest-v13.x/docs/api/esm.html#esm_ecmascript_modules) (ES modules), which are now stable and fit for production use,are the official standard for packaging code for reuse in both client- and server-side JavaScript.

---

## Table of contents

In this article, we are going to learn about ES modules in Node. However, we will briefly explore other ways of handling and organizing server-side code with CommonJS.

Why? So that we have a point of reference to recognize the benefits of ES modules. In essence, we will learn about the challenges it tries to solve that earlier module systems were not adapted to solve.

We will be looking at:

- **An introduction to ES modules** — here, we introduce ES modules in an exciting way
- **A brief history of ES modules** — here, we learn about the transition from the earlier module system to ES modules. We will also briefly examine how interoperable these modules systems are with one another
- **Adding support for ES modules in Node** — here, we learn about how we can incrementally add support for ES modules in Node. We also learn how to migrate an old codebase to start using ES modules
- **Comparing and contrasting features** — here, we will learn about the features of both these module systems and how they compare
- **Then lastly, ES modules moving forward**

::: note Prerequisites

To easily follow along with this tutorial, it is advisable to have the latest version of Node.js installed. Instructions on how to do so are available in the [<FontIcon icon="fa-brands fa-node"/>Node documentation](https://nodejs.org/en/).

Also, for better context, readers may need to be fairly knowledgeable with the [<FontIcon icon="fas fa-globe"/>CommonJS](https://requirejs.org/docs/commonjs.html) module system in Node. It is equally welcoming for newcomers learning the Node.js module system or applying ES modules in their Node projects today.

:::

---

## What are ES modules?

With the release of Node version 15.3.0 (currently in v15.11.0), [<FontIcon icon="fa-brands fa-node"/>ES modules](https://nodejs.org/api/esm.html#esm_introduction) can now be used without an experimental flag, as they are now stable and compatible with the NPM ecosystem. Details about the stability index can be found [<FontIcon icon="fa-brands fa-node"/>here](https://nodejs.org/api/documentation.html) in the node.js ESM documentation.With ES modules, modules are defined with the use of the `import` and `export` keywords instead of the `require()` function in CommonJS. Here is how they are used:

```js title="f.js"
export function sayLanguage(language) {
  console.log(`I love ${language}!`);
}
```

```js title="g.js"
import {sayLanguage} from './f.js';
console.log(sayLanguage('JavaScript'));
```

```json title="package.json"
{
  "name": "esm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "type": "module",
  "author": "",
  "license": "ISC"
}
```

::: note

Readers should take note of the type field in the <FontIcon icon="iconfont icon-json"/>`package.json` file above. To be able to load an ES module, we need to set `"type": "module"` in this file or, as an alternative, we can use the `.mjs` file extension as against the usual `.js` file extension. Also, from Node version `12.7.0` and `13.2.0`, loading ECMAScript modules no longer required us to pass any command-line flag.

:::

```sh
node g.js
# 
# I love JavaScript!
# undefined
```

The result/terminal output of running our code is shown above.

---

## Adding support for ES modules in Node today

This support was previously behind the `--experimental-module` flag. Currently, this is no longer required as from version 13.14.0 to 14.0.0, the implementation is now stable and can now be used with the earlier commonJS module system.

Files ending with `.mjs` or `.js` extensions (with the nearest <FontIcon icon="iconfont icon-json"/>`package.json` file with a `field` type) are treated as ES modules, as shown earlier. So, in essence, when we run `node g.js` in the same folder as the above <FontIcon icon="iconfont icon-json"/>`package.json`, the file is treated as an ESM. Additionally, it is an ESM if we are passing string arguments to the Node.js standard input with flag `--input-type=module`. More details can be found [<FontIcon icon="fa-brands fa-node"/>here](https://nodejs.org/api/packages.html#packages_determining_module_system).

It’s important to note that with ESM, without the `type` field in the parent <FontIcon icon="iconfont icon-json"/>`package.json` file or the other ways specified above, Node throws the error shown below:

```plaintext title="output"
(node:2844) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.(Use `node --trace-warnings ...` to show where the warning was created). Also, as an aside, we cannot make use of import statements outside of modules.
```

---

## Package scope

A package scope, defined by the `type` flag in a parent <FontIcon icon="iconfont icon-json"/>`package.json` file and all folders below it, is present in the current scope of that package, as explained earlier. Furthermore, files ending with the `.mjs` extension are always loaded as ES modules regardless of the scope of that package.

In the same light, all other forms of files without extensions and without the `type` flag in the parent <FontIcon icon="iconfont icon-json"/>`package.json` file are treated as CommonJS. Additionally, files ending with `.cjs` extensions are treated as CJS modules regardless of package scope.

It’s important to know that because Node.js now supports both ES modules and commonJS modules, package authors need to always ensure the `type` field in their package.json file is always included, regardless of the module type. This allows for backwards compatibility; for instance, in a situation where the default type of Node.js changes, Node would know how to handle or interprete files in our program. More details [<FontIcon icon="fa-brands fa-node"/>here](https://nodejs.org/api/packages.html#packages_determining_module_system).

---

## Import and export syntax in ES modules

In ES modules, specifiers are like string-based file paths used after the `from` keyword. There are both [<FontIcon icon="fa-brands fa-node"/>algorithms](https://nodejs.org/api/esm.html#esm_resolution_algorithm) to load an ES module specifier and to determine the module format of a resolved URL. An example is shown below:

```js
import {cat} from 'animals';
```

The `animal` specifier in this case is an npm package, for example. Other ways specifiers can be referenced include from both absolute and relative file paths or URLs, and paths within other packages. Examples are shown in this [<FontIcon icon="fa-brands fa-node"/>section](https://nodejs.org/api/esm.html#esm_import_specifiers) of the documentation.

::: note

Node.js built-in Modules can now be loaded or referenced by absolute URL strings from version `14.13.1`. When using the import keyword, a file extension must be provided to resolve relative or absolute URL specifiers.

:::

Although `import` statements are permitted only in ES modules, they can reference both an ESM or CommonJS modules. For example:

```js
import packageMain from 'commonjs-package'; // Works

import { method } from 'commonjs-package'; // Errors
```

::: note

[<FontIcon icon="fa-brands fa-node"/>Import statements](https://nodejs.org/api/esm.html#esm_import_statements) that reference other types of files like JSON or Wasm are still experimental and require the `--experimental-json-modules` and `--experimental-wasm-modules` flags, respectively, to be passed, as they are only supported in commonJS. From Node version 14.8.0, we were able to make use of the top-level await without passing CLI flags. Details including using the await keyword outside async functions (AKA top-level await) for ESM, can be found [<FontIcon icon="fa-brands fa-node"/>here](https://nodejs.org/api/esm.html#esm_experimental_json_modules).

:::

For exports in ES modules, we can make use of the following:

```js
// Named exports
module.exports.name = "Alex"

// Default exports
export default function sayName() {console.log('My name is Mat')}
```

::: note

All built-in Node packages support all types of exports (named, default) described above. Since Node version `14.13.0`, support has been added for detection of CommonJS named exports in ESM.

:::

---

## Package entry points

There are now two fields that can define entry points for a package: `main` and `exports`, in a project’s <FontIcon icon="iconfont icon-json"/>`package.json` file. While the `main` field only defines the main entry point of the package, the `exports` field provides an alternative where the main entry point can be defined while also providing the benefit of encapsulating the package.

Module files within packages can be accessed by appending a path to the package name. Another way is if the package’s <FontIcon icon="iconfont icon-json"/>`package.json` contains an `exports` field where the files within packages can only be accessed via the paths defined in the `exports` object.

To set the main entry point for a package for example, it is advisable to define both `exports` and `main` in the package’s <FontIcon icon="iconfont icon-json"/>`package.json` file. More details can be found in the [<FontIcon icon="fa-brands fa-node"/>documentation](https://nodejs.org/api/esm.html#esm_package_entry_points).

---

## CommonJS module system

Prior to the introduction of ES modules, the community relied heavily on CommonJS for packaging server-side JavaScript code. In the CommonJS module system, each file is treated as a module, which exposes a set of APIs (via a well-defined interface) with the use of the [`exports`object (<FontIcon icon="iconfont icon-github"/>`nodejs/ecmascript-modules`)](https://github.com/nodejs/ecmascript-modules/blob/modules-lkgr/doc/api/modules.md#exports). To understand this better, here is an example using the object created by the module system:

```js title="a.js"
function sayName(name) {
  console.log(`My name is ${name}.`)
};

function sayAge(age) {
  console.log(`I'm ${age} years old.`)
};


module.exports = {sayName, sayAge};
```

To use these functions (imported as modules in a different file), we can use the [`require` function (<FontIcon icon="iconfont icon-github"/>`nodejs/ecmascript-modules`)](https://github.com/nodejs/ecmascript-modules/blob/modules-lkgr/doc/api/modules.md#requireid). This accepts a module identifier (ID) specified by either a relative or an absolute path or by name, based on the module type of the exposed APIs, like so:

```js title="b.js"
const {sayName, sayAge} = require('./a')  // assuming a.js is in the same folder path

console.log(sayName('Alex')) // My name is Alex.
console.log(sayAge(25)) // I'm 25 years old.

// TO RUN THE CODE SAMPLE TYPE: 
// node b.js 
// on your terminal
```

As we can see above, the `require` object returns/imports the module content exported from the `a.js` file. To learn more about the [implementation (<FontIcon icon="iconfont icon-json"/>`nodejs/node`)](https://github.com/nodejs/node/blob/7c63bc6540f4ad21f911f38f8708ed988f433ce7/lib/internal/modules/cjs/loader.js#L166) of the `module`, `export`, and `require` keywords, we can peek at the module wrapper [here (<FontIcon icon="iconfont icon-json"/>`nodejs/ecmascript-modules`)](https://github.com/nodejs/ecmascript-modules/blob/modules-lkgr/doc/api/modules.md#the-module-wrapper).

The CommonJS specification is also available [here (<FontIcon icon="iconfont icon-github"/>`commonjs/commonjs`)](https://github.com/commonjs/commonjs/blob/master/docs/specs/modules/1.0.html.markdown). The spec [highlights (<FontIcon icon="iconfont icon-github"/>`commonjs/commonjs`)](https://github.com/commonjs/commonjs/blob/master/docs/specs/modules/1.0.html.markdown#commonjs-modules) the minimum features that a module system must have in order to support and be interoperable with other module systems.

The CommonJS implementation allows for a defined structure in how files are loaded. In this approach, code required from other files are loaded or parsed synchronously. For this reason, catching and detecting failure points or debugging code are easier and less tedious.

Why? Because variables present in the modules or exported files are within the scope of that module or private to it and not in the global scope, as such errors are properly propagated. Also, because of the huge separation of concern, modules are loaded from parent to child, traversing down the dependency graph.

::: note

When the wrapper function returns, the exports object is cached, then returned as the return value for the `require()` method. This is like a cycle. How? On the next call to the `module.exports` method, the same process of wrapping the module with the wrapper function is repeated. But not without checking if that module is already stored in the cache.

:::

The signature of the wrapper function is shown below:

```js
(function(exports, require, module, __filename, __dirname) {
  // Module code actually lives in here
});
```

The `Module` object, which takes in an ID and a parent module as parameters, contains the `export` object:

```js
function Module(id = '', parent) {
  this.id = id;
  this.path = path.dirname(id);
  this.exports = {};
  this.parent = parent;
  updateChildren(parent, this, false);
  this.filename = null;
  this.loaded = false;
  this.children = [];
};
```

The `updateChildren` method scans through the file path until the root of the file system is reached. Its job is to update the `children` property of the `Module` object with the new `parent`, as the case may be. Here is the signature below:

```js
function updateChildren(parent, child, scan) {
  const children = parent && parent.children;
  if (children && !(scan && children.includes(child)))
   children.push(child);
}
```

Let’s see an example to understand this better. In the <FontIcon icon="fa-brands fa-js"/>`b.js` file above, add this line of code to print the module and the argument object:

```js
console.log(module, arguments);
```

After running `node b.js`, we get the following output:

```sh :collapsed-lines
node b.js
# 
# My name is Alex.
# undefined
# I'm 25 years old.
# undefined
# <ref *1> Module {
#   id: '.',
#   path: '/Users/retina/Desktop/es-modules in Node',
#   exports: {},
#   parent: null,
#   filename: '/Users/retina/Desktop/es-modules in Node/b.js',
#   loaded: false,
#   children: [
#     Module {
#       id: '/Users/retina/Desktop/es-modules in Node/a.js',
#       path: '/Users/retina/Desktop/es-modules in Node',
#       exports: [Object],
#       parent: [Circular *1],
#       filename: '/Users/retina/Desktop/es-modules in Node/a.js',
#       loaded: true,
#       children: [],
#       paths: [Array]
#     }
#   ],
#   paths: [
#     '/Users/retina/Desktop/es-modules in Node/node_modules',
#     '/Users/retina/Desktop/node_modules',
#     '/Users/retina/node_modules',
#     '/Users/node_modules',
#     '/node_modules'
#   ]
# } [Arguments] {
#   '0': {},
#   '1': [Function: require] {
#     resolve: [Function: resolve] { paths: [Function: paths] },
#     main: Module {
#       id: '.',
#       path: '/Users/retina/Desktop/es-modules in Node',
#       exports: {},
#       parent: null,
#       filename: '/Users/retina/Desktop/es-modules in Node/b.js',
#       loaded: false,
#       children: [Array],
#       paths: [Array]
#     },
#     extensions: [Object: null prototype] {
#       '.js': [Function (anonymous)],
#       '.json': [Function (anonymous)],
#       '.node': [Function (anonymous)]
#     },
#     cache: [Object: null prototype] {
#       '/Users/retina/Desktop/es-modules in Node/b.js': [Module],
#       '/Users/retina/Desktop/es-modules in Node/a.js': [Module]
#     }
#   },
#   '2': Module {
#     id: '.',
#     path: '/Users/retina/Desktop/es-modules in Node',
#     exports: {},
#     parent: null,
#     filename: '/Users/retina/Desktop/es-modules in Node/b.js',
#     loaded: false,
#     children: [ [Module] ],
#     paths: [
#       '/Users/retina/Desktop/es-modules in Node/node_modules',
#       '/Users/retina/Desktop/node_modules',
#       '/Users/retina/node_modules',
#       '/Users/node_modules',
#       '/node_modules'
#     ]
#   },
#   '3': '/Users/retina/Desktop/es-modules in Node/b.js',
#   '4': '/Users/retina/Desktop/es-modules in Node'
# }
```

As shown above, we can see the [module object (<FontIcon icon="iconfont icon-github"/>`nodejs/node`)](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js#L156) on line 6 with all the properties, including the `filename`, `id`, `children`, path depth, etc. Also, we can see the `argument` object, which consists of the `export` object, `require` function, file and folder path, and the `Module` (which is essentially what the wrapper function does, but it executes the code contained in a file/module).

Finally, as an exercise, we can go ahead and print the `require` function in the `b.js` file. To learn more about the output of the `require` function, we can check the [implementation (<FontIcon icon="iconfont icon-github"/>`nodejs/node`)](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js#L1087) in this section of the Node source code.

::: note

Special emphasis should be placed on the [`load` (<FontIcon icon="iconfont icon-github"/>`nodejs/node`)](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js#L890:8) and `validateString` methods. The `validateString` method, as its name implies, checks whether the passed-in module ID is a valid string. To understand the require function on a much higher level, you can check the [<FontIcon icon="iconfont icon-name"/>Knowledge section](https://nodejs.org/en/knowledge/getting-started/what-is-require/) of the Node documentation.

:::

---

## Interoperability for both module systems

In CommonJS, [modules are wrapped as functions (<FontIcon icon="iconfont icon-github"/>`nodejs/ecmascript-modules`)](https://github.com/nodejs/ecmascript-modules/blob/modules-lkgr/doc/api/modules.md#the-module-wrapper) before they are evaluated at runtime. For ES modules, code reuse provided via `import` and `export` [binding (<FontIcon icon="iconfont icon-github"/>`nodejs/node-eps`)](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#21-types) are already [created or loaded (<FontIcon icon="iconfont icon-github"/>`nodejs/node-eps`)](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#31-async-loading) asynchronously before they are evaluated. To understand how ESM works under the hood, you can check [here (<FontIcon icon="iconfont icon-github"/>`nodejs/node-eps`)](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#22-operations). Now let’s explore further 🙂

For a quick comparison, a CommonJS module goes through this phase in its lifecycle:

Resolution -> Loading -> Wrapping -> Evaluation -> Caching

This validates the fact that for CommonJS, there is no way to determine what gets exported as a module until the module is wrapped and evaluated. This is quite different for ES modules, as the imported symbols are already [parsed and understood by the language (<FontIcon icon="iconfont icon-github"/>`nodejs/node-eps`)](https://github.com/nodejs/node-eps/blob/master/002-es-modules.md#22-operations) before the code gets evaluated.

When the code is parsed, just before it is evaluated, an internal [<FontIcon icon="fas fa-globe"/>Module Record](https://tc39.es/ecma262/#sec-source-text-module-records) is created, and only after this data structure is well-formed are the files parsed and the code evaluated.

For example:

```mjs title="d.mjs"
const check = () => {
  console.log('Just checking');
};
export.check = check;
```

```mjs title="e.mjs"
import {check} from './d' // assuming they are on the same folder path
```

In the <FontIcon icon="fa-brands fa-js"/>`e.mjs` file above, Node.js parses and validates the imports before going further to execute or evaluate the piece of code. This is not the case for a CommonJS module: the exported symbols are only made known after the module is wrapped and evaluated.

This incompatibility is one of the many reasons the standard body in charge of ECMAScript intended to implement interoperability for both ESM and Node’s existing CommonJS module system.

Furthermore, the [<FontIcon icon="fa-brands fa-node"/>current specifier resolution](https://nodejs.org/api/esm.html#esm_customizing_esm_specifier_resolution_algorithm) does not support all default behavior of the CommonJS loader. One of the major differences is automatic resolution of file extensions and the ability to import directories that have an index file.

For example, if we do an `import './directory'` from, say, a directory that has an <FontIcon icon="fa-brands fa-js"/>`index.js`, ES modules do not look for an <FontIcon icon="fa-brands fa-js"/>`index.js` file in the specified folder, as was the case in CommonJS. Instead, it throws an error. This can be fixed by passing the experimental flag `--experimental-specifier-resolution=[mode]`. More details [<FontIcon icon="fa-brands fa-node"/>here](https://nodejs.org/api/esm.html#esm_customizing_esm_specifier_resolution_algorithm).

::: note

To customize the default module resolution, loader hooks can optionally be provided via the `--experimental-loader ./loader-name.mjs` argument to Node.js. The loaders APIs are currently being redesigned, which means they would change in the future.

:::

Also, while import statements can reference both an ES module and a commonJS module, import statements are permitted only in ES modules. However, for loading ES modules, commonJS supports dynamic import expressions. As an addition, a require function can be constructed within an ESM using the `module.createRequire()` method.

More details about interoperability with CommonJS can be found in this [<FontIcon icon="fa-brands fa-node"/>section](https://nodejs.org/api/esm.html#esm_interoperability_with_commonjs) of the documentation.

---

## Features of both module systems

- Dynamic `import()` is supported in both CommonJS and ES modules. It can be used to include ES module files from CommonJS code
- ECMAScript 6 also provides that modules can be loaded from a URL, while CommonJS is limited to relative and absolute file paths. [<FontIcon icon="fa-brands fa-node"/>This new improvement](https://nodejs.org/api/esm.html#esm_https_loader) not only makes loading more complicated, but also slow
- Sources that are in formats Node.js doesn’t understand can be converted into JavaScript. More details can be found [<FontIcon icon="fa-brands fa-node"/>here](https://nodejs.org/api/esm.html#esm_transpiler_loader)
- Support for [extensionless main entry points (<FontIcon icon="iconfont icon-github"/>`WICG/import-maps`)](https://github.com/WICG/import-maps#extension-less-imports) in ESM has been dropped
- [<FontIcon icon="iconfont icon-github"/>`tc39/proposal-import-meta`](https://github.com/tc39/proposal-import-meta) provides the absolute URL of the current ES module file. It is currently a stage 4 proposal in the TC39 spec
- Dynamic imports can be used to import both ES and CommonJS modules. In CommonJS modules it can be used to load ES modules. Note that it returns a promise
- A file extension must be provided when using the `import` keyword. Directory indexes (e.g., `'./database/index.js'`) must be fully specified
- Dual CommonJS and ESM are now possible with the use of [<FontIcon icon="fa-brands fa-node"/>conditional exports.](https://nodejs.org/api/esm.html#esm_conditional_exports) Now, Node.js can run ES module entry points, and a package can contain both CommonJS and ESM entry points
- From version 14.13.1, ESM added support for using `node: URLs` to load Node.js built-in modules, allowing built-in modules to be referenced by valid absolute URL strings

::: note

Function `require` shouldn’t be used in ES modules. This is because ES modules are executed asynchronously. To load an ES module from a CommonJS module, we can make use of `import()`.

:::

Readers should also note that there are still some known differences between ESM and commonJS modules. For example, native modules are not currently supported with ESM imports. Also, the ES module loader has its own kind of caching system and does not rely on `require.cache` found in the commonJS parlance.

Others include the unavailability of *_filename* or *_dirname* found in the commonJS module system. ESM provides other ways of replicating this behaviour with the use of `import.meta.url`.

For more details about the differences between ES Modules and commonJS modules, readers can check this [<FontIcon icon="fa-brands fa-node"/>section of the documentation](https://nodejs.org/api/esm.html#esm_differences_between_es_modules_and_commonjs).

---

## ES modules moving forward

ES modules are no longer tagged experimental, and are now stable in terms of technical implementation as of Node version 15.3.0. This means that they are now ready for production usage. The challenge, therefore, is upon package authors, maintainers, and developers to be explicit with defining the type field in the <FontIcon icon="iconfont icon-json"/>`package.json` file and other useful conventions discussed in the specifications. More details about this can be found [<FontIcon icon="fa-brands fa-node"/>here](https://nodejs.org/api/esm.html#esm_writing_dual_packages_while_avoiding_or_minimizing_hazards).

Nowadays, it is possible to use both CommonJS and ESM in one application, but with less friction. But of course, CommonJS modules need to know if the module being loaded is a CommonJS or an ES module since the latter is loaded only asynchronously.

The issues relating to dual-package hazard and ways to avoid or curtail these hazards are extensively covered in the [<FontIcon icon="fa-brands fa-node"/>package section](https://nodejs.org/api/packages.html#packages_dual_commonjs_es_module_packages) of the documentation.

Also, in accordance with the ESM spec, using the import keyword does not complete the file path by default with the file name extension, as for CommonJS modules. Therefore, this should also be explicitly stated beforehand. More details can be found in the section [<FontIcon icon="fa-brands fa-node"/>outlining the differences between both module systems](https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_differences_between_es_modules_and_commonjs).

---

## Conclusion

Prior to the introduction of the ES6 standard, there wasn’t any native implementation for organizing source code in server-side JavaScript. The community relied heavily on CommonJS module format.

Nowadays, with the introduction and API stabilization of ES modules, developers can enjoy the many benefits associated with the release specification. This article has highlighted the transition between both module systems and their interoperability.

Note that this article has not covered the loaders API since they are still experimental and will definitely change in future versions. To learn more about it please check [<FontIcon icon="fa-brands fa-node"/>this section](https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_loaders) of the documentation.

Tools like [<FontIcon icon="iconfont icon-babel"/>Babel](https://babeljs.io/) and [<FontIcon icon="iconfont icon-github"/>`standard-things/esm``](https://github.com/standard-things/esm#readme), which translate the newer syntax into code compatible with older environments, the transition becomes even easier.

In the long run, this entire draft process is an important step and paves the way for further future improvements. Let me know if you have any questions in the comment section below, or message me on my [Twitter handle ()<FontIcon icon="fa-brands fa-x-twitter"/>`alex_nnakwue`](https://twitter.com/alex_nnakwue). Thanks for reading 🙂

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using ES modules in Node.js",
  "desc": "Learn about the state of ES modules in Node today, including concerns realted to transitioning from and interoperability with CommonJS.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/es-modules-in-node-today.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
