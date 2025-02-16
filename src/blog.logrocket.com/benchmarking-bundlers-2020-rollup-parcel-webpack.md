---
lang: en-US
title: "Benchmarking bundlers 2020: Rollup vs. Parcel vs. webpack"
description: "Article(s) > Benchmarking bundlers 2020: Rollup vs. Parcel vs. webpack"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Benchmarking bundlers 2020: Rollup vs. Parcel vs. webpack"
    - property: og:description
      content: "Benchmarking bundlers 2020: Rollup vs. Parcel vs. webpack"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack.html
prev: /programming/js-react/articles/README.md
date: 2020-10-07
isOriginal: false
author:
  - name: Zain Sajjad
    url : https://blog.logrocket.com/author/zainsajjad/
cover: /assets/image/blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack/banner.png
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

[[toc]]

---

<SiteInfo
  name="Benchmarking bundlers 2020: Rollup vs. Parcel vs. webpack"
  desc="Bundlers serve as a cornerstone technology for all modern web apps. We've benchmarked Rollup, Parcel.js, and webpack across multiple criteria."
  url="https://blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack/banner.png"/>

Bundlers serve as a cornerstone technology for all modern web apps — or, more specifically, all JavaScript apps. As the frontend world progressed with more client-side-rendered apps, ideas began to emerge about how to efficiently bundle our tons of JS.

![Benchmarking Bundlers in 2020: Parcel.js vs. Rollup vs. webpack](/assets/image/blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack/banner.png)

Cognitively, as the number of options increase, selection becomes difficult. Here, we will analyze the tech and non-tech competencies of the top bundlers available today to make your decision easy and well informed.

We’ll be covering:

- [<FontIcon icon="fas fa-globe"/>webpack](https://webpack.js.org/)
- [<FontIcon icon="fas fa-globe"/>Rollup](https://rollupjs.org/)
- [<FontIcon icon="fas fa-globe"/>Parcel.js](https://parceljs.org/)

For comparing technical competencies, we have picked up [React Facebook Pixel] (<FontIcon icon="iconfont icon-github"/>`zsajjad/react-facebook-pixel`)(https://github.com/zsajjad/react-facebook-pixel) as a library and a very basic [React app (<FontIcon icon="iconfont icon-github"/>`zsajjad/bundlers-comparison`)](https://github.com/zsajjad/bundlers-comparison) as a sample to benchmark each of these bundlers.

This comparison is not to establish a single winner from amongst these great tools; rather, it is to help you more easily make your decision. All of these bundlers are definitely great tools managed by great people, and they are all super awesome in one way or another. To all the maintainers, contributors, sponsors, and backers, cheers 🍻

---

## Configurations

Configuring a bundle has been one of the most cursed yet most sophisticated areas in the frontend world. For small-scale applications, one might feel this should be very straightforward. Still, as the application’s size grows, we need more sophisticated configurations to keep our apps efficient and performant.

We have witnessed many debates among developers about how tedious it is to configure a modern-day tech stack for a small app. These debates and the common patterns subsequently adopted by a majority of the community have led many bundlers to offer zero-config solutions.

Though it’s claimed by almost all of these bundlers, being zero-config is not possible for any of them. It is more about being quickly configurable and keeping the configuration guides as comfortable as possible.

All of these bundlers have their reds and blues in this area. Here, we are sharing configs for generating distribution packages for React Facebook Pixel. It will give you a glimpse of how it looks like for each of these bundlers.

### webpack

```js :collapsed-lines
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'fb-pixel-webpack.js',
    libraryTarget: 'umd',
    library: 'ReactPixel',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
  },
};
```

### Rollup

```js :collapsed-lines
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/fb-pixel.js',
      format: 'cjs',
      name: 'ReactPixel',
      exports: 'named',
    },
  ],
  plugins: [
    terser(),
    babel({ babelHelpers: 'bundled' }),
    nodeResolve(),
    // All of following are just for beautification, not required for bundling purpose
    progress(),
    visualizer(),
    filesize(),
  ],
};
```

### Parcel.js

We didn’t need any configs for Parcel, as the default configs were enough to handle our library. Here is the command we used:

```json
{
  "bundle:parcel": "parcel build src/index.js --experimental-scope-hoisting --out-file fb-pixel-parcel.js",
}
```

Here is my conclusion for this:

::: info

- webpack still requires us to use ES5 syntax, which makes it a little problematic
- Rollup has simpler syntax and looks ideal for managing libraries
- Parcel v2 is coming up with configuration file support with awesome default configs to extend for sophisticated apps

**1️⃣ Rollup     2️⃣ Parcel     3️⃣ Webpack**

:::

---

## Features

To stay competent for new and more sophisticated web apps, each of these bundlers offers all the features required by most of the modern apps.

The web.dev team recently launched a new initiative called [<FontIcon icon="fas fa-globe"/>Tooling.Report](https://bundlers.tooling.report/) with the goal of making it easy to select the right tools for your next project by directly comparing their feature sets.

Where bundlers are concerned, the team compared them across six dimensions and 61 feature tests. This report gives us great insight into what all of these bundlers are offering. Here we have summarized the results of these tests.

### Code splitting

By code splitting, we mean to extract common dependencies or modules in a shared bundle and ensure that only the code required for the page is downloaded and executed. Code splitting is a crucial aspect of keeping large-scale applications efficient. The web.dev team evaluated each bundler [<FontIcon icon="fas fa-globe"/>against eight criteria](https://bundlers.tooling.report/code-splitting/). The results are below.

::: info Results:

**1️⃣ Rollup [6/8]     2️⃣ Webpack [4/8]     3️⃣ Parcel [3.5/8]**

:::

None of these bundlers can split modules based on exports used by other bundles. But besides that, Rollup stands on top, as it passes all other tests.

### Hashing

To keep app load time lower, resources should be cached and reused on the client side after they have been downloaded once. To invalidate a resource’s cache, the resource name can be changed. This change can be done by associating a version identifier with the resource’s name.

Build tools can generate version identifiers based on the content of the file. If the file contents change, it will have a new version ID; otherwise, it stays the same, resulting in the client reusing the cached result.

To avoid excessive cache invalidation, bundlers have to ensure an invalidation “cascade” is implemented properly. This means every updated JS and non-JS asset should have a new hash, and all JS bundles referencing that asset need to be updated to reference the new URL — thus, updated content and a new hash for the JS referencing that asset, and so on.

The bundlers were compared on [<FontIcon icon="fas fa-globe"/>10 different caching criteria](https://bundlers.tooling.report/hashing/).

::: info Results

**1️⃣ Parcel [8.5/10]     2️⃣ Webpack [8/10]     3️⃣ Rollup [6/10]**

:::

Parcel stands on top here as it beats webpack with a really impressive feature: the bundle hashes based on the final compiled code, which means changes in comments will not impact bundle hashes.

### Non-JavaScript resources

Web apps are not just about JavaScript; they include many other resources, including rich content, fonts, serialized data, and HTML and CSS.

In recent times, we have seen JS emerge as a central point that holds and places all of these assets. Though JS doesn’t allow for importing these non-JS assets, bundlers have now made it possible. Keeping in mind the code splitting and hashing features, handling these assets becomes more complicated.

Bundlers consider applications as a graph. It handles each resource as a node connected with all other resources that it imports. This makes it easier to modify resource URLs after hashing and usage-based transformations like namespacing in CSS. For this feature category, the bundlers were [<FontIcon icon="fas fa-glboe"/>compared across 16 criteria](https://bundlers.tooling.report/non-js-resources/).

::: info Results

**1️⃣ Webpack [15.5/16]     2️⃣ Rollup [15/16]     3️⃣ Parcel [9.5/16]**

:::

When it comes to handling resources, Parcel is way behind in the race. Rollup and webpack remain toe to toe as both now offer almost everything required to bundle non-JS resources.

### Output module format

Modern browsers now support ECMAScript Modules (ESM), but supporting older browser versions means we have to transform our JS into CommonJS. There were just [<FontIcon icon="fas fa-globe"/>three criteria](https://bundlers.tooling.report/output-module-formats/) for this section.

::: info Results

**1️⃣ Rollup [3/3]     2️⃣ Webpack [2/3]     2️⃣ Parcel [2/3]**

:::

Rollup takes a lead here as neither of the others can generate ESM bundles.

### Transformations

A significant impetus for adopting bundlers in modern applications was the transformation of code and assets. Some of these transformations are general purpose, e.g., compression, minification, etc., while others are geared toward a specific set of assets. These transformations usually aim at supporting different versions of browsers and optimizations.

The web.dev team identified [<FontIcon icon="fas fa-globe"/>seven criteria](https://bundlers.tooling.report/transformations/) for comparing the bundlers’ transformations capabilities.

::: info Results

**1️⃣ Webpack [6/7]     1️⃣ Rollup [6/7]     3️⃣ Parcel [4.5/7]**

:::

Though neither webpack nor Rollup can eliminate dead code from dynamically imported modules, these two passed all other tests, including Brotli compression support.

---

## Benchmarking

Web bundlers today aren’t just used for creating production builds. Rather, our day-to-day development depends heavily upon their performance. As mentioned earlier, we created a small React application to benchmark bundling speed and the size of the bundles generated.

These benchmarks were performed on:

MacBook Pro (15-inch, 2018) | 2.2 GHz 6-Core Intel Core i7 | 16 GB 2400 MHz DDR4 | Radeon Pro 555X 4 GB, Intel UHD Graphics 630 1536 MB

### Bundling speeds

| **webpack \[4.41.2\] | **Rollup \[2.26.10\] | **Parcel \[2.0.0-beta.1\] |
| ---: | :---: | :---: | :---: |
| **Dev first build** | 1383ms 🌟 | 5500ms | 3730ms |
| **Dev reload** | 38ms 🌟 | 667ms | 190ms |
| **Release build** | 2996ms 🌟 | 9600ms| 4670ms |
| **Library release** | 2740ms| 1660ms| 1340ms 🌟 |

For application development, webpack 4 is a clear winner here, with the fastest build time for both dev and prod environments. Parcel takes a big leap for library bundling in almost half the time as webpack.

### Build size

| **webpack \[4.41.2\] | **Rollup \[2.26.10\] | **Parcel \[2.0.0-beta.1\] |
| ---: | :---: | :---: | :---: |
| **App release** | 132KB | 127.81KB 🌟 | 128.31KB |
| **Library release** | 6KB | 3KB 🌟 | 5KB |

As far as size is concerned, Rollup has the lead here, closely followed by Parcel v2. Please help make this benchmark better by sharing your results in the comments section or opening an issue in our repository.

---

## Documentation

webpack has been one of the most cursed libraries for its complexity, but its documentation has improved over the past few years. A number of developers have been sharing their experiences, and many resources are available to learn about webpack’s complexities. Certain features are still undocumented, and most of them are required for real advanced use cases.

Rollup has good documentation, and there are a good number of resources available to learn it in depth. You might find some difficulty in selecting plugins, as most of them are not official. Nevertheless, it is a go-to solution for library developers, as official and active plugins are enough to cover most use cases.

Parcel v2 is still in beta, and documentation is a work in progress. Since it has set up standards for onboarding plugins, this will help as it progresses.

---

## Plugins and ecosystem

There isn’t much to compare when it comes to plugins. Plugins for most common use cases are available for all the bundlers, but the quality of each may vary a lot.

webpack has a [large number of official plugins (<FontIcon icon="iconfont icon-github"/>`webpack-contrib/awesome-webpack`)](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins), which makes the selection easy and quick. Rollup has [a lot of community plugins (<FontIcon icon="iconfont icon-github"/>`rollup/awesome`)](https://github.com/rollup/awesome), both actively maintained and stalled. One has to put in some effort to test and decide what works best for them.

Parcel had a unique mechanism for [plugins with v1 (<FontIcon icon="iconfont icon-github"/>`parcel-bundler/awesome-parcel`)](https://github.com/parcel-bundler/awesome-parcel), wherein you don’t have to configure plugins at all — just install them and get them running. With v2, there is a configuration setup under development and will give more power for sophisticated use cases.

---

## Conclusion

Whether you’re a new or a seasoned frontend dev, you will have probably heard debates about bundlers — or joined in on some yourself. webpack is praised for its flexibility yet cursed for its complex. Rollup is considered excellent for libraries. Parcel has made a big impact and could very well be making a bigger one once v2 is out of beta.

What to select? As we said earlier, it depends upon your set of requirements. I hope this comparison will help in making the decision easier for you.

---

## Honorable mentions

- [<FontIcon icon="fas fa-globe"/>Snowpack](https://snowpack.dev/) is new in town but is making reasonable [**grounds for the future**](/blog.logrocket.com/snowpack-vs-webpack.md).
- [<FontIcon icon="fas fa-globe"/>Poi](https://poi.js.org/) is a human-friendly wrapper about webpack. This bundler is somewhere between Parcel and webpack.
- [<FontIcon icon="fas fa-globe"/>Pax](https://pax.js.org/), a Rust-based bundler, promises to deliver higher speed.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Benchmarking bundlers 2020: Rollup vs. Parcel vs. webpack",
  "desc": "Bundlers serve as a cornerstone technology for all modern web apps. We've benchmarked Rollup, Parcel.js, and webpack across multiple criteria.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/benchmarking-bundlers-2020-rollup-parcel-webpack.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
