---
lang: en-US
title: "Babel vs. TypeScript: Choosing the right compiler for your project"
description: "Article(s) > Babel vs. TypeScript: Choosing the right compiler for your project"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - typescript
  - ts
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Babel vs. TypeScript: Choosing the right compiler for your project"
    - property: og:description
      content: "Babel vs. TypeScript: Choosing the right compiler for your project"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project.html
prev: /programming/ts/articles/README.md
date: 2023-07-10
isOriginal: false
author:
  - name: Gustav Wengel
    url : https://blog.logrocket.com/author/gustavwengel/
cover: /assets/image/blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/banner.png
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
  name="Babel vs. TypeScript: Choosing the right compiler for your project"
  desc="See how the two JavaScript compilers Babel and TypeScript compare through criteria such as performance, custom transformations, and more."
  url="https://blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/banner.png"/>

::: note Editor’s note

This post was last updated on 10 July 2023 to be accurate with the updates in* [*Babel 7.21.0* (<FontIcon icon="iconfont icon-github"/>`babel/babel`)](https://github.com/babel/babel/releases/tag/v7.21.0).

:::

![Babel Vs. TypeScript: Choosing The Right Compiler For Your Project](/assets/image/blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/banner.png)

Babel 7 was released in 2018 and since then, updates have allowed developers to use Babel and TypeScript without ever needing to complicate their builds with the TypeScript compiler. But what are the differences between using Babel and the TypeScript compiler? And should you use Babel or TypeScript for your next project? This article aims to answer these questions and more.

---

## What is Babel?

Babel is a widely used JavaScript compiler that enables developers to write modern JavaScript code using the latest ECMAScript features while ensuring compatibility with older browsers and environments.

As new JavaScript features are introduced, not all browsers support them immediately, which leads to potential compatibility issues for developers targeting broader audiences. Babel solves this problem by transforming modern JavaScript code into an older version of JavaScript that is widely supported across various browsers and environments. This process allows developers to use cutting-edge language features without sacrificing compatibility.

Here are the new updates since the latest feature at the time of writing, [v7.21.0 (<FontIcon icon="iconfont icon-github"/>`babel/babel`)](https://github.com/babel/babel/releases/tag/v7.21.0):

1. **`PrivateFieldsAsSymbols` assumption for Classes:** This update introduces the `privateFieldAsSymbols` assumption for classes, allowing private fields in classes to be treated as symbols. Private fields are declared using the `#` symbols before the field name
2. **Support for the Regexp Modifiers Proposal**: Babel now supports the `regexp` modifiers proposal, which allows regular expressions to have custom flags or modifiers
3. **Generate source maps of friendly call frames**: This means that debugging JavaScript code transpiled with Babel becomes more user-friendly and easier to understand. Source maps allow developers to map the code execution in the transpiled output back to the original source code, which is essential for debugging and understanding where issues occur
4. **Supports the `const` modifier in type parameters:** TypeScript support in Babel now includes support for the `const` modifier in the type parameter. The `const` modifier can be used to specify that a type parameter should be treated as immutable, providing more expressive and robust typing capabilities in TypeScript
5. **Implementing decorators:** Decorators provide a way to modify classes and class members at the declaration level, enabling advanced metaprogramming and code annotations
6. **Parser option to allow `new.target` outside functions**: Babel introduced a parser option that allows the usage of `new.target` outside functions. `new.target` is a special meta-property in JavaScript used to determine whether a function or constructor was called with the new keyword, and this option allows more flexible usage of this feature
7. **Disable Annex B behavior**: The update introduced a parser option, `annex: false`, to disable Annex B behavior. Annex B is a set of optional backward compatibility features in the ECMAScript specification, and this option allows developers to opt out of these behaviors, providing more control over the language features
8. **Support for `.cts` as configuration file**: Babel now supports the `.cts` file extension as a configuration file. Having more configuration file options allows developers to organize and manage their Babel configurations more efficiently, using the file extension that suits their project needs
9. **Support for `export type* from` in TypeScript:** Babel now supports the `export type * from` syntax in TypeScript. This syntax allows re-exporting all named exports from one module to another, providing better modularity and reusability in TypeScript projects

---

## Understanding the TypeScript compiler

The TypeScript compiler, `tsc`, is responsible for transforming TypeScript code into plain JavaScript that can be executed by browsers or Node.js. Understanding how the TypeScript compiler works and the compilation process is essential for TypeScript developers to produce efficient and error-free JavaScript code.

Here’s an overview of the compilation process:

- **TypeScript code input**: The TypeScript compiler takes TypeScript source code files (`.ts`) as input. These files contain TypeScript-specific syntax, including static typing annotations, interfaces, classes, and other TypeScript language features
- **Lexical analysis (scanning)**: The first step in the compilation process is lexical analysis, also known as scanning. The TypeScript compiler scans the input source code and breaks it down into individual tokens (such as keywords, identifiers, literals, operators) through a process called tokenization
- **Syntax analysis (parsing)**: After tokenization, the TypeScript compiler performs syntax analysis, also known as parsing. It uses the generated tokens to build an Abstract Syntax Tree (AST) that represents the hierarchical structure of the TypeScript code
- **Semantic analysis (type checking)**: Once the AST is created, the TypeScript compiler proceeds to the semantic analysis phase, which involves type-checking. During this stage, the compiler examines the types of variables, expressions, and other elements in the code based on the provided type annotations and inferred types
- **Transformation and emitting JavaScript**: After successful type checking, the TypeScript compiler goes through a transformation phase, where it applies various transformations, optimizations, and transpilations to the AST. The TypeScript compiler may perform operations like removing TypeScript-specific syntax (e.g., type annotations), converting advanced TypeScript features (e.g., decorators), or transpiling new ECMAScript features (e.g., `async`/`await`) into older JavaScript constructs for compatibility with different browsers and environments. The final output of the transformation phase is a new AST representing plain JavaScript code, without any TypeScript-specific constructs
- **Generating output (JavaScript files)**: The transformed AST is used to generate JavaScript code files (.js) corresponding to the original TypeScript source files. The TypeScript compiler creates the corresponding `.js` files with the transpiled JavaScript code
- **Declaration files (`.d.ts`)**: Additionally, the TypeScript compiler may also generate declaration files (.d.ts) during the compilation process. Declaration files provide type information for external libraries or JavaScript modules, allowing TypeScript developers to use them seamlessly within their TypeScript projects.
- **Emitting output**: Finally, the TypeScript compiler emits the generated JavaScript files (.js) and declaration files (`.d.ts`) as output. These files are now ready to be executed by browsers or Node.js

---

## Babel’s role in TypeScript integration

Babel plays a significant role in integrating TypeScript into JavaScript projects and workflows. While TypeScript provides static typing and advanced language features, Babel complements it by enabling transpilation of TypeScript code into widely supported versions of JavaScript.

Here’s how Babel contributes to the integration of TypeScript:

### Transpilation

TypeScript introduces features that may not be natively supported in older browsers or specific environments. Babel acts as a transpiler, taking TypeScript code (with static typing, decorators, etc.) and converting it into equivalent JavaScript code.

The transpilation process ensures that the TypeScript features are transformed into syntax and constructs compatible with the target environment.

### Compatibility with build tools

Many modern JavaScript projects use build tools like webpack, Rollup, or Parcel to bundle and optimize code. Babel integrates seamlessly with these build tools, allowing TypeScript code to be transpiled and included in the project’s build process.

Developers can leverage Babel plugins to fine-tune the transpilation process, making it compatible with the specific needs and requirements of the project.

### Easing migration

Babel helps in the gradual migration of existing JavaScript projects to TypeScript. By setting up Babel to transpile TypeScript code, developers can introduce TypeScript incrementally to their projects without rewriting the entire codebase at once. This allows developers to benefit from TypeScript’s type checking and other language features in specific parts of the project as they transition to TypeScript.

### React and JSX support

Babel is commonly used in React.js development to support JSX syntax, which is not natively understood by browsers. JSX allows developers to write React components more intuitively.

When using TypeScript with React, Babel ensures that the JSX syntax in TypeScript files is properly transpiled, allowing developers to write JSX components in a TypeScript environment.

### Customization with plugins

Babel’s extensive plugin ecosystem allows developers to add custom plugins and presets that cater to specific TypeScript use cases. Developers can choose from a range of plugins to support experimental TypeScript proposals, implement custom transformations, and fine-tune the transpilation process.

### Support for experimental TypeScript features:

Babel often supports TypeScript features that are still in the proposal stage or not yet standardized by ECMAScript. This allows developers to experiment with new TypeScript features before they are officially adopted, giving them early access to the latest language capabilities.

---

## Polyfilling with Babel vs. TypeScript

Polyfilling is the process of adding code to support newer JavaScript features in environments that do not natively support them. It enables developers to use the latest ECMAScript features while maintaining compatibility with older browsers or environments that lack support for those features. Polyfills help bridge this gap by providing the missing functionality.

### Babel’s auto polyfill

Babel provides an automatic polyfilling mechanism through the `@babel/preset-env` preset. When you configure Babel with `@babel/preset-env`, it automatically detects the ECMAScript features used in your code and includes the necessary polyfills only for the features that are missing in the target environment.

For example, if you use a modern ES6 feature like `Promise` in your code and the target environment lacks support for it, Babel’s auto polyfill will include a minimal and optimized polyfill for `Promise` in the output code. This approach ensures that your code runs correctly in older browsers that lack native `Promise` support.

The advantage of auto polyfilling is that it reduces the size of the output bundle by only including necessary polyfills, making the application more efficient.

### TypeScript’s approach to polyfilling

TypeScript itself does not provide built-in polyfilling like Babel. TypeScript focuses on static type checking and transpilation, leaving polyfilling to be handled separately. TypeScript users typically use Babel as part of their build process, and Babel takes care of both transpilation and polyfilling using the <FontIcon icon="fa-brands fa-npm"/>`@babel/preset-env`.

When TypeScript code is transpiled by Babel, the auto polyfilling mechanism comes into play, ensuring that any missing features required by the TypeScript code are properly polyfilled. Additionally, TypeScript developers often use other tools, like <FontIcon icon="fa-brands fa-npm"/>`core-js` or <FontIcon icon="fa-brands fa-npm"/>`@babel/polyfill`, directly to include specific polyfills based on the project’s needs and the targeted environments.

To include explicit polyfills in a TypeScript project, you can import the necessary polyfills at the entry point of their application. For example:

```typescript
import 'core-js'; // Import all core-js polyfills
// or
import 'core-js/features/promise'; // Import only the Promise polyfill
```

Using `core-js` or other polyfill libraries gives developers more control over which polyfills are included and allows them to customize the polyfilling behavior.

---

## The differences between Babel and TypeScript

There are some major differences between using TypeScript and using TypeScript with Babel. We’ll look at the five most important differences.

### No type checking in Babel

Babel doesn’t care about your fancy TypeScript types. It just throws them in the trash, without checking that they’re right. The example below compiles without any errors or warnings with Babel, but not with TypeScript:

```typescript
const myCoolString : string = 9;
```

`9` is definitely not a string Babel. Removing the types can be excellent for quick prototyping where you want the code to compile, even if your types aren’t on point.

If you’re going through the effort of typing things, at some point you’ll probably want to check that they’re right. Luckily, this isn’t a big deal. You can either let your editor take care of it or run `tsc --noEmit`, which typechecks your project without compiling anything.

### Babel can’t do `const enums`

By default, TypeScript compiles an entire project at once, while Babel only compiles one file at a time. Previously, this meant that Babel did not support TypeScript features that required reading multiple files — such as `const enums`.

However, this is no longer true since [Babel 7.15](https://babeljs.io/blog/2021/07/26/7.15.0), which was released in 2021. This means that if you’re on the newest version of Babel, you should be able to compile all valid TypeScript codebases.

### Decorators and metadata: TypeScript has an edge

TypeScript was a bit early to the decorator party (if you’re unsure what a decorator is, [**this is a good introduction to decorators**](/blog.logrocket.com/practical-guide-typescript-decorators.md)). After TypeScript implemented decorators, the decorator proposal has changed multiple times and is still not finalized.

What this means is that, currently, the [**ECMAScript**](/blog.logrocket.com/how-to-use-ecmascript-modules-with-node-js.md) spec and TypeScript don’t quite see eye-to-eye on how decorators should behave. Babel’s plugins follow the ECMAScript spec, which means that Babel doesn’t compile decorators the same way that TypeScript does. Luckily for us, Babel has a `legacy` mode to compile decorators with the old behavior. Simply add the Babel plugin <FontIcon icon="fa-brands fa-npm"/>`@babel/plugin-proposal-decorators` with the `legacy` option set to `true`.

There’s one other TypeScript decorators feature we should talk about: `emitDecoratorMetadata`. TypeScript normally erases all type information so it doesn’t exist at runtime. `emitDecoratorMetadata` is a feature that keeps the types around for classes and methods that have a decorator applied to them.

Having the type at runtime allows us to do all sorts of fancy things, such as dependency injection and mapping the TypeScript types to types in an SQL database. The feature sees reasonably heavy use in those two areas, with libraries such as TypeORM, TypeGoose, inversifyJS, and even [**Angular’s dependency injection system**](/blog.logrocket.com/how-to-use-ecmascript-modules-with-node-js.md) depending on this feature.

As Babel doesn’t care about your type information, this feature requires a custom plugin, [<FontIcon icon="fa-brands fa-npm"/>`babel-plugin-transform-typescript-metadata`](https://npmjs.com/package/babel-plugin-transform-typescript-metadata). Adding that plugin along with `plugin-proposal-decorators`, which we mentioned earlier, should give Babel feature parity with TypeScript in regards to decorators.

### Babel excels at custom transformations

Babel is much more extensible than TypeScript. There are plenty of plugins that optimize your code and help you strip out unused imports, inlines, constants, and much more. While TypeScript has its own Transformer API, which allows for custom transformations, the Babel ecosystem is both richer in plugin choices and much more accessible.

If you need custom transformations, you’ll need to use Babel. The good news is that most TypeScript tools allow you to use TypeScript and then run the code through Babel afterwards, to get the best of both worlds. But this obviously comes with additional complexity in your build-chain.

### TypeScript and Babel have similar performance

Comparing Babel and TypeScript in regards to performance is difficult and probably won’t give you the full picture. TypeScript that performs type-checking will definitely be slower than Babel because there are extra steps included there.

To reach approximately equal speed, you can mitigate that slowdown by using something like [<FontIcon icon="iconfont icon-github"/>`TypeStrong/fork-ts-checker-webpack-plugin`](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin), which runs the compilation without types in one process and the type-checking in a background process.

Of course, as anyone who’s tried to configure webpack knows, JavaScript toolchains feel immensely complicated. You have source map plugins, caching, choices between how many threads you should use  —  the list goes on. No simple benchmark can take the full story into account, but if you’re expecting a many-fold increase using Babel over the TypeScript compiler, you’ll have to look for performance gains elsewhere  —  [**perhaps your bundler**](/blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack.md)?

---

## Which should you choose: Babel or TypeScript?

At this point, TypeScript and Babel are approximately equal in the role they can play in your build chain. Babel now has full support for `const enums`, decorators, and decorator metadata. The only downside to using Babel is that you will need to run your type-checking as a separate process.

If you already have a build pipeline that works for you, I don’t see any compelling reason to switch. However, if you’re starting out on a project, I would probably tend towards using the TypeScript compiler, potentially via something like [<FontIcon icon="iconfont icon-github"/>`TypeStrong/ts-loader`](https://github.com/TypeStrong/ts-loader). Then later on if you find you need some transformation only Babel provides, you can pass the transpiled TypeScript output to Babel afterwards. It’s a little too complicated for my tastes, but hey  —  nobody ever said JavaScript build toolchains were easy.

*Do you have any experiences with TypeScript and Babel? I’d love to hear about them. ([<FontIcon icon="fa-brands fa-x-twitter"/>`GeeWengel`](https://x.com/GeeWengel))*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Babel vs. TypeScript: Choosing the right compiler for your project",
  "desc": "See how the two JavaScript compilers Babel and TypeScript compare through criteria such as performance, custom transformations, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
