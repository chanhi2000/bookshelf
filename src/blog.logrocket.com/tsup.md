---
lang: en-US
title: "Using tsup to bundle your TypeScript package"
description: "Article(s) > Using tsup to bundle your TypeScript package"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using tsup to bundle your TypeScript package"
    - property: og:description
      content: "Using tsup to bundle your TypeScript package"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/tsup.html
prev: /programming/ts/articles/README.md
date: 2025-02-20
isOriginal: false
author:
  - name: Muhammed Ali
    url : https://blog.logrocket.com/author/muhammedali/
cover: /assets/image/blog.logrocket.com/tsup/banner.png
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
  name="Using tsup to bundle your TypeScript package"
  desc="Learn how to bundle your TypeScript package with tsup, including setup, custom output extensions, and best practices for optimized builds."
  url="https://blog.logrocket.com/tsup"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/tsup/banner.png"/>

tsup is a fast and efficient, zero-configuration TypeScript bundler designed to streamline the process of compiling, optimizing, and outputting different module formats. Unlike older bundlers, tsup leverages esbuild under the hood for high-speed performance, supports modern ECMAScript modules and CommonJS(CJS), and provides built-in features like tree shaking, minification, and code splitting.

![Using tsup To Bundle Your TypeScript Package](/assets/image/blog.logrocket.com/tsup/banner.png)

This guide walks through setting up tsup, configuring the output, and using the `outExtension` option to customize file extensions.

---

## What is tsup?

tsup is a modern, fast, and zero-configuration bundler for TypeScript and JavaScript projects. It simplifies the process of bundling libraries or applications written in TypeScript or JavaScript, making it easier to produce optimized and production-ready code. tsup [**uses esbuild under the hood for rapid build times**](/blog.logrocket.com/fast-javascript-bundling-with-esbuild.md).

---

## What is tsup used for?

tsup is primarily used to bundle TypeScript and JavaScript projects into distributable formats. It automatically handles TypeScript compilation, tree shaking, and bundling without requiring complex configuration. It supports multiple output formats like ESM, CJS, and IIFE, making it versatile for various environments.

It’s ideal for building libraries, applications, or any project that needs to be packaged for deployment. tsup optimizes code by removing unused sections (tree shaking) and minifying output for production. It has native TypeScript support, allowing you to bundle your code directly without precompilation. Additionally, tsup can generate development builds with source maps for debugging and production-ready builds with minification.

tsup minimizes setup complexity by offering a zero-configuration approach, allowing developers to bundle TypeScript and JavaScript projects without extensive configuration files. Unlike traditional bundlers that require complex setups with multiple plugins and custom build scripts, tsup works out of the box by automatically detecting entry points, handling TypeScript compilation, and optimizing output formats. This streamlined workflow significantly reduces the time spent configuring a build system, making it easier to focus on development rather than setup.

![](https://paper-attachments.dropboxusercontent.com/s_3FB3A3B70A676F901D54C587AA05F2EF26F6E1204D6CB56636CAF46CA0741547_1739144457617_image.png)

If you’re considering alternative bundlers, check out our article “[**Using Rollup to package a library for TypeScript and JavaScript**](/blog.logrocket.com/using-rollup-package-library-typescript-javascript.md)” for a detailed comparison.

---

## Setting up tsup in a TypeScript project

Before bundling with tsup, start by creating a new TypeScript package. Initialize a project directory and set up TypeScript:

```sh
mkdir my-ts-package && cd my-ts-package
npm init -y
npm install typescript --save-dev
npx tsc --init
```

This initializes a TypeScript package with a default <FontIcon icon="iconfont icon-json"/>`tsconfig.json`.

To integrate `tsup` into a TypeScript project, install it via npm:

```sh
npm install tsup --save-dev
```

Then, update the <FontIcon icon="iconfont icon-json"/>`package.json` file to add a build script:

```json title="package.json
{
  "scripts": {
    "build": "tsup"
  }
}
```

By default, tsup looks for an <FontIcon icon="iconfont icon-typescript"/>`index.ts` or <FontIcon icon="fas fa-folder-open"/>`src/`<FontIcon icon="iconfont icon-typescript"/>`index.ts` entry point. To specify an entry file manually, pass it as an argument. For example, if you have a <FontIcon icon="iconfont icon-typescript"/>`main.ts` file inside <FontIcon icon="fas fa-folder-open"/>`src/`, you can define a simple function:

```ts
export function greet() {
  return "Hello from tsup!";
}
```

Run the following `tsup` command:

```sh
npx tsup src/main.ts --format esm,cjs --dts
```

This command instructs tsup to generate both ESM and CJS outputs and includes TypeScript declaration files (`.d.ts`). These files are essential for TypeScript libraries because they provide type definitions that enable editors and compilers to understand the package’s API without needing access to the original TypeScript source. Manually generating these files with `tsc` can be cumbersome, requiring additional configurations, but tsup simplifies this by handling it automatically with the `--dts` flag.

For those exploring other modern bundling options, our post “[**Migrating a TypeScript app from Node.js to Bun**](/blog.logrocket.com/migrating-typescript-app-node-js-bun.md)” offers valuable insights on an emerging alternative.

---

## Customizing output extensions with `outExtension`

By default, tsup outputs `.js` files for both ESM and CJS formats. However, certain environments and packaging requirements may require different extensions. The `outExtension` option allows renaming output files.

In a `tsup.config.ts` file, define:

```ts title="tsup.config.ts"
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outExtension({ format }) {
    return format === 'esm' ? { js: '.mjs' } : { js: '.cjs' };
  },
});
```

This configuration ensures that ESM outputs use `.mjs`, while CJS outputs use `.cjs`, making module resolution more explicit in Node.js environments.

### Supporting both ESM and CJS formats

Supporting both ESM and CJS in a TypeScript package is crucial for module format compatibility across different environments. ESM (ECMAScript Modules) is the modern standard, optimized for tree shaking and better performance in bundlers like Webpack and Vite. CJS, on the other hand, is still widely used in Node.js projects and older toolchains. By generating both formats, the package is flexible, allowing users to consume it regardless of their module system.

tsup simplifies this dual support by allowing both formats to be defined in a single command:

```sh
npx tsup src/index.ts --format esm,cjs --dts
```

This approach ensures that both modern and legacy projects can import the package without issues.

For more on the differences between ESM and CommonJS — and why these distinctions matter — see our guide on [**CommonJS vs. ES modules in Node.js**](/blog.logrocket.com/commonjs-vs-es-modules-node-js.md).

---

## How is tsup used in real-world scenarios?

`tsup` plays a crucial role in efficiently bundling TypeScript code. The configuration in [Mappersmith’s (<FontIcon icon="iconfont icon-github"/>`tulios/mappersmith`)](https://github.com/tulios/mappersmith) <FontIcon icon="iconfont icon-typescript"/>`tsup.config.ts` provides an excellent example of setting up bundling for different environments, target versions, and output formats. It showcases how to define entry points, handle different build scenarios like Node.js and browser environments, and manage sourcemaps, type declarations, and minification.

The <FontIcon icon="iconfont icon-json"/>`package.json` script in Mappersmith integrates `tsup` as part of a larger build process. It begins by copying version files, running `tsup` to bundle the code, and finally generating type declarations. This modular approach keeps the workflow clean and focused on different aspects of the build process. The build script ties together multiple tasks, demonstrating how `tsup` fits into a broader toolchain.

### The <FontIcon icon="iconfont icon-typescript"/>`tsup.config.ts` file

For Mappersmith’s `tsup` configuration, the following setup is used:

```ts :collapsed-lines title="tsup.config.ts"
import { defineConfig, Options } from 'tsup'
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions'

// Inspired by https://github.com/immerjs/immer/pull/1032/files
export default defineConfig((options) => {
  const commonOptions: Partial = {
    entry: ['src/**/*.[jt]s', '!./src/**/*.d.ts', '!./src/**/*.spec.[jt]s'],
    platform: 'node',
    target: 'node16',
    // `splitting` should be false, it ensures we are not getting any `chunk-*` files in the output.
    splitting: false,
    // `bundle` should be false, it ensures we are not getting the entire bundle in EVERY file of the output.
    bundle: false,
    // `sourcemap` should be true, we want to be able to point users back to the original source.
    sourcemap: true,
    clean: true,
    ...options,
  }
  const productionOptions = {
    minify: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  }

  return [
    // ESM, standard bundler dev, embedded `process` references.
    // (this is consumed by ["exports" > "." > "import"] and ["exports > "." > "types"] in package.json)
    {
      ...commonOptions,
      format: ['esm'],
      clean: true,
      outDir: './dist/esm/',
      esbuildPlugins: [esbuildPluginFilePathExtensions({ filter: /^./ })],
      // Yes, bundle: true => https://github.com/favware/esbuild-plugin-file-path-extensions?tab=readme-ov-file#usage
      bundle: true,
      dts: {
        compilerOptions: {
          resolveJsonModule: false,
          outDir: './dist',
        },
      },
    },
    // ESM for use in browsers. Minified, with `process` compiled away
    {
      ...commonOptions,
      ...productionOptions,
      // `splitting` should be true (revert to the default)
      splitting: true,
      // `bundle` should be true, so we get everything in one file.
      bundle: true,
      entry: {
        'mappersmith.production.min': 'src/index.ts',
      },
      platform: 'browser',
      format: ['esm'],
      outDir: './dist/browser/',
    },
    // CJS
    {
      ...commonOptions,
      clean: true,
      format: ['cjs'],
      outDir: './dist/',
    },
  ]
})
```

#### Breakdown of the configuration

In the above setup:

- `commonOptions` contains settings that apply to all builds, such as defining entry files, targeting Node.js version 16, disabling code splitting, and enabling sourcemaps.
- `productionOptions` applies specifically to production builds, enabling minification and defining the `NODE_ENV` variable as `production`.
- The first configuration generates an ESM bundle for Node.js, incorporating the `esbuildPluginFilePathExtensions` plugin and handling TypeScript declarations.
- The second configuration bundles ESM code for browsers, applying production optimizations like minification.
- The third configuration generates a CommonJS (CJS) bundle for environments requiring this format.

---

## Handling minified outputs with `outExtension`

When generating production builds, it is often useful to append <FontIcon icon="fa-brands fa-js"/>`.min.js` to minified files for better clarity and organization. The `outExtension` option in tsup allows you to modify output file extensions dynamically. Update your configuration as follows:

```ts
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  outExtension({ format }) {
    return format === 'esm' ? { js: '.min.mjs' } : { js: '.min.cjs' };
  },
}));
```

This setup ensures:

- Minified ESM files are named `*.min.mjs`
- Minified CJS files are named `*.min.cjs`

This improves clarity when distributing both development and production builds. Explicitly defining file extensions prevents ambiguity in module resolution, particularly in environments requiring strict format handling.

---

## Generating multiple entry points

tsup supports multiple entry points, making it ideal for bundling libraries with several exports. To configure multiple entry points, update your `tsup.config.ts` as follows:

```ts title="tsup.config.ts"
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    utils: 'src/utils.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
});
```

This configuration compiles <FontIcon icon="fas fa-folder-open"/>`src/`<FontIcon icon="iconfont icon-typescript"/>`index.ts` and <FontIcon icon="fas fa-folder-open"/>`src/`<FontIcon icon="iconfont icon-typescript"/>`utils.ts` separately, enabling better modularity and maintainability in larger projects.

---

## Handling assets and external dependencies

If your project includes static assets (such as CSS or JSON files), tsup allows you to exclude external dependencies to keep the final bundle lightweight. Use the `external` option to specify dependencies that should not be bundled:

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'lodash'],
});
```

This ensures that dependencies like `react` and `lodash` are referenced externally rather than bundled within the output, reducing the final file size and improving efficiency.

By leveraging these configurations, tsup provides a streamlined approach to managing multiple entry points, minified outputs, and external dependencies, making it a powerful tool for modern TypeScript project bundling.

---

## Best practices to avoid common pitfalls

When using `tsup` to bundle your TypeScript package, following best practices ensures a smooth and efficient workflow while avoiding common pitfalls. Below are key strategies to use `tsup` effectively:

### Specify both ESM and CJS formats for maximum compatibility

To ensure your package works across different environments, always specify both ESM (ECMAScript Modules) and CJS (CommonJS) formats. Modern frameworks and tools often prefer ESM, while older systems or Node.js environments may still rely on CJS. Set the `format` option in your `tsup` configuration:

```json
{
  "format": ["esm", "cjs"]
}
```

Failing to support both formats can limit your package’s usability, so this step is essential.

### Generate TypeScript declaration files (`.d.ts`)

TypeScript declaration files provide type information for users of your package. Without them, users lose type safety and IntelliSense support. Enable `dts` in your `tsup` configuration to generate these files:

```json
{
  "dts": true
}
```

Skipping this step can hinder the developer experience for TypeScript users.

### Explicitly define `outExtension` for Node.js compatibility

Node.js has strict rules for resolving module files, requiring `.mjs` for ESM and `.cjs` for CJS. To avoid runtime errors, define the `outExtension` option in your `tsup` configuration:

```js
{
  "outExtension": ({ format }) => ({
    ".js": format === "cjs" ? ".cjs" : ".mjs"
  })
}
```

This ensures Node.js correctly resolves your module files, preventing import issues.

### Avoid hardcoding paths in configurations

Hardcoding paths in your `tsup` configuration reduces flexibility and makes setup less reusable. Instead, use dynamic options to adapt to different formats or environments. Set the `outDir` dynamically:

```js
{
  "outDir": ({ format }) => `dist/${format}`
}
```

This approach keeps your configuration flexible and easier to maintain.

### Enable source maps when minifying

Minification reduces bundle size but makes debugging difficult. Enable source maps when minifying to simplify debugging:

```json
{
  "minify": true,
  "sourcemap": true
}
```

Without source maps, debugging minified code can be nearly impossible.

### Handling dependency resolution issues

By default, tsup treats certain dependencies as external and does not include them in the bundle. If you find missing dependencies in the final output, configure the `external` option:

```json
{
  "external": ["react", "lodash"]
}
```

This ensures dependencies like `react` and `lodash` are referenced externally rather than bundled, reducing file size.

### Performance optimizations

While `tsup` is optimized for speed, enabling certain features like source maps can impact build times. Monitor your build performance and adjust configurations as needed to balance speed and debugging capabilities.

---

## Conclusion

`tsup` is a powerful bundler that simplifies the process of bundling TypeScript projects. Its support for ESM and CJS formats, along with features like `outExtension` for customized file extensions, makes it an essential tool for modern JavaScript development. By following these best practices, you can effectively integrate `tsup` into your workflow, ensuring efficient and production-ready builds. Whether you are focusing on tree shaking, module format compatibility, or streamlined builds, `tsup` provides the necessary tools for success.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using tsup to bundle your TypeScript package",
  "desc": "Learn how to bundle your TypeScript package with tsup, including setup, custom output extensions, and best practices for optimized builds.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/tsup.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
