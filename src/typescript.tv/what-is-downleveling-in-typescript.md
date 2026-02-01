---
lang: en-US
title: "What is Downleveling in TypeScript?"
description: "Article(s) > What is Downleveling in TypeScript?"
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
      content: "Article(s) > What is Downleveling in TypeScript?"
    - property: og:description
      content: "What is Downleveling in TypeScript?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-downleveling-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-07-05
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
  name="What is Downleveling in TypeScript?"
  desc="Downleveling is the process of converting modern TypeScript code into an older version of JavaScript. This allows developers to target older JavaScript environments that may not support the latest features."
  url="https://typescript.tv/new-features/what-is-downleveling-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Downleveling is the process of converting modern TypeScript code into an older version of JavaScript. This allows developers to target older JavaScript environments that may not support the latest features.

**Downleveling** refers to the process of transpiling modern TypeScript code into an older version of JavaScript. It allows developers to target older JavaScript runtime environments that may not support the latest features and syntax introduced in newer versions of ECMAScript.

When downleveling is applied, TypeScript's compiler (`tsc`) converts your source code into an older version of JavaScript that is compatible with the specified [<VPIcon icon="iconfont icon-typescript"/>target](https://typescriptlang.org/tsconfig#target) environment.

---

## Downleveling Example

In [<VPIcon icon="fas fa-globe"/>ECMAScript 6](https://262.ecma-international.org/6.0/) several new features were added like the [<VPIcon icon="fa-brands fa-firefox"/>for-of loop statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of). When using an older version of JavaScript, such as ECMAScript 5, this syntax has to be downleveled in order to work.

Consider the following example:

Let's say you have written modern TypeScript code using the `for...of` loop:

```ts
const animals = ['cat', 'dog', 'zebra'];
 
for (const animal of animals) {
  console.log(animal);
}
```

If your "target" is set to "es6", the generated JavaScript code will adhere to the ES6 (ES2015) specification:

```json{3} title="tsconfig.json"
{
  "compilerOptions": {
    "target": "es6",
    "downlevelIteration": false,
    // ...
  }
}
```

```js
'use strict';
const animals = ['cat', 'dog', 'zebra'];
for (const animal of animals) {
  console.log(animal);
}
```

---

## Downleveling to ES5

If you set your "target" to an older version of JavaScript, such as ES5, the TypeScript compiler will downlevel your code and emit a traditional [<VPIcon icon="fa-brands fa-firefox"/>`for` loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) instead of the modern `for...of` loop:

```json{3} title="tsconfig.json"
{
  "compilerOptions": {
    "target": "es5",
    "downlevelIteration": false,
    // ...
  }
}
```

```js
'use strict';
var animals = ['cat', 'dog', 'zebra'];
for (var _i = 0, animals_1 = animals; _i < animals_1.length; _i++) {
  var animal = animals_1[_i];
  console.log(animal);
}
```

Please take note that the TypeScript compiler only performs downleveling of syntax (recognizable by special characters like `=>`, `?`, `` ` ``, `#` and keywords like `class` or `static`) but it does not downlevel the API itself. If you need to polyfill API calls, such as [<VPIcon icon="fa-brands fa-firefox"/>`Array.prototype.flat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) introduced in `ES2019`, you would require an additional JavaScript compiler like [<VPIcon icon="iconfont icon-babel"/>Babel](https://babeljs.io/).

---

## Progressive Enhancement with downlevelIteration

To [<VPIcon icon="iconfont icon-w3c"/>progressively enhance](https://w3.org/wiki/Graceful_degradation_versus_progressive_enhancement#Graceful_degradation_and_progressive_enhancement_in_a_nutshell) your code for modern browsers while still targeting an ES5 environment, you can enable the [<VPIcon icon="iconfont icon-typescript"/>`downlevelIteration`](https://typescriptlang.org/tsconfig#downlevelIteration) compiler option. This option generates a helper function that checks if modern [<VPIcon icon="fa-brands fa-firefox"/>`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) property is present to support modern loops and iteration. If it's not, the emitted code will fallback to a legacy `for` loop:

```json{3-4} title="tsconfig.json"
{
  "compilerOptions": {
    "target": "es5",
    "downlevelIteration": true,
    // ...
  }
}
```

```js :collapsed-lines
'use strict';
var __values =
  (this && this.__values) ||
  function (o) {
    var s = typeof Symbol === 'function' && Symbol.iterator,
      m = s && o[s],
      i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === 'number')
      return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        },
      };
    throw new TypeError(s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
  };
var e_1, _a;
var animals = ['cat', 'dog', 'zebra'];
try {
  for (
    var animals_1 = __values(animals), animals_1_1 = animals_1.next();
    !animals_1_1.done;
    animals_1_1 = animals_1.next()
  ) {
    var animal = animals_1_1.value;
    console.log(animal);
  }
} catch (e_1_1) {
  e_1 = { error: e_1_1 };
} finally {
  try {
    if (animals_1_1 && !animals_1_1.done && (_a = animals_1.return)) _a.call(animals_1);
  } finally {
    if (e_1) throw e_1.error;
  }
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Downleveling in TypeScript?",
  "desc": "Downleveling is the process of converting modern TypeScript code into an older version of JavaScript. This allows developers to target older JavaScript environments that may not support the latest features.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-downleveling-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
