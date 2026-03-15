---
lang: en-US
title: "Un-Sass'ing My CSS: Compiling Multiple CSS Files into One Always Twisted"
description: "Article(s) > Un-Sass'ing My CSS: Compiling Multiple CSS Files into One Always Twisted"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Node.js
  - Article(s)
tag:
  - blog
  - alwaystwisted.com
  - css
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Un-Sass'ing My CSS: Compiling Multiple CSS Files into One Always Twisted"
    - property: og:description
      content: "Un-Sass'ing My CSS: Compiling Multiple CSS Files into One Always Twisted"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/alwaystwisted.com/unsassing-my-css-css-imports.html
prev: /programming/css/articles/README.md
date: 2025-09-05
isOriginal: false
author:
  - name: Stuart Robson
    url: https://alwaystwisted.com/about/
cover: https://alwaystwisted.com/images/articles/meta-images/unsass-my-css-2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="Un-Sass'ing My CSS: Compiling Multiple CSS Files into One Always Twisted"
  desc="Discover how to transition from Sass to modern CSS, exploring ways we can import multiple CSS files into one sole CSS file"
  url="https://alwaystwisted.com/articles/UnSassing-my-CSS-CSS-imports.html"
  logo="https://alwaystwisted.com/images/favicons/apple-touch-icon.png"
  preview="https://alwaystwisted.com/images/articles/meta-images/unsass-my-css-2.png"/>

As mentioned in [**my last article**](/alwaystwisted.com/UnSasunsassing-my-css.md), my current client work sees me at the start of a much larger Design System project where the deliverables will be as close to vanilla HTML, CSS, and JavaScript as possible. This means we’re not using Sass, and for the first time (in a long time) I’m able to explore more of what modern CSS can do (whilst relying on browser support) instead of reaching for Sass as I normally would.

There are lots of things I like and love about Sass, and there’s a lot that can be done (or can soon to be done) using new CSS features. However, one thing that won’t reach CSS, and something that I think we would always need some aspect of 'tooling' for, is to compile various Sass (or CSS) files into one.

---

## Why Compile CSS?

Compiling multiple CSS files into one brings several benefits. By reducing the number of CSS files, you decrease HTTP requests, which can significantly improve page load times. Additionally, maintaining a single CSS file can simplify your workflow, making it easier to manage styles across different components. Furthermore, a single, minified CSS file can enhance the performance of your website, leading to a better user experience.

While HTTP/2 can support multiple requests efficiently, relying solely on it and multiple imports doesn't eliminate the overhead and complexity of managing numerous files, which can still impact performance and workflow efficiency. Compiling CSS into a single file, I think, remains essential for streamlined management and consistent performance across all browsers and devices.

---

## Tackling CSS Compilation Without Sass

To achieve this without Sass, we can use tools like PostCSS or a custom script to compile our CSS files. Yes, we could write in one CSS file and depending on your project that might work, but for all of my client work it’s been best to have separate files for aspects of the code that get unified into a single CSS file that is served.

### Method 1: Using PostCSS

PostCSS is a versatile tool that transforms CSS with JavaScript plugins. This method leverages the postcss-import plugin to handle CSS imports and bundle multiple files into one. PostCSS offers a straightforward, configurable approach that integrates well with modern frontend build systems. By using PostCSS, you maintain a clean development structure with separate CSS files while automatically generating a single production file, reducing HTTP requests and improving page load performance.

#### Setting Up PostCSS for Compilation

To compile your CSS files into one using [<VPIcon icon="iconfont icon-postcss"/>PostCSS](https://postcss.org/), follow these steps:

#### Step 1: Install PostCSS and Required Plugins

First, ensure you have PostCSS installed, along with the [<VPIcon icon="iconfont icon-github"/>`postcss/postcss-import`](https://github.com/postcss/postcss-import) plugin:

```sh
npm install --save-dev postcss postcss-import
```

#### Step 2: Configure PostCSS

In your PostCSS configuration file (e.g., postcss.config.js), include the postcss-import plugin:

```js
module.exports = {
  plugins: [
    require('postcss-import'),
    // other plugins can be added here
  ],
};
```

::: note

The `postcss-import` plugin automatically resolves nested imports, allowing you to have imports inside imported files while still generating a single compiled output file with the correct cascade order.

:::

#### Step 3: Organise Your CSS Files

Create a overarching, global CSS file (e.g., main.css) where you will import all your other CSS files:

```css title="main.css"
@import 'tokens.css';
@import 'components/button.css';
@import 'components/card.css';
@import 'layouts/grid.css';
```

#### Step 4: Build Your CSS

Run your PostCSS build process to generate a single output file:

```sh
postcss main.css -o output.css
```

::: note

PostCSS can seamlessly integrate with popular build tools like webpack, Gulp, and Rollup, allowing you to incorporate CSS compilation into your existing development workflow without potential, additional configuration headaches.

:::

### Method 2: Custom Script for Compilation

If you prefer not to use PostCSS, you could instead create a Node.js script to compile your CSS. This method uses a custom Node.js script to handle CSS compilation without additional dependencies like PostCSS. The script reads your main CSS file, processes any @import statements it finds, concatenates the contents of all imported files, and outputs a single compiled CSS file. This approach gives you complete control over the compilation process and can be tailored to specific project requirements. It's lightweight, requires minimal setup beyond Node.js itself, and can be easily integrated into your existing workflow or build process.

**Step 1: Create the Script** Create a file named compile-css.js and add the following code:

```js
const fs = require('fs');
const path = require('path');

// Function to read and compile CSS
function compileCSS(inputFile, outputFile) {
  const cssContent = fs.readFileSync(inputFile, 'utf-8');
  const imports = cssContent.match(/@import\s+['"]([^'"]+)['"]/g) || [];

  let compiledCSS = '';

  // Read and append each imported CSS file
  imports.forEach((importStatement) => {
    const filePath = importStatement.match(/['"]([^'"]+)['"]/)[1];
    const fullPath = path.resolve(path.dirname(inputFile), filePath);
    compiledCSS += fs.readFileSync(fullPath, 'utf-8') + '\n';
  });

  // Write the compiled CSS to the output file
  fs.writeFileSync(outputFile, compiledCSS.trim());
  console.log(`Compiled CSS written to ${outputFile}`);
}

// Usage
const inputCSSFile = 'index.css'; // Your main CSS file
const outputCSSFile = 'output.css'; // Output file

compileCSS(inputCSSFile, outputCSSFile);
```

::: note

With the flat file structure and single-level import strategy I employ, nested imports (you can do with `postcss-import` aren't necessary for my project setup, simplifying the compilation process while maintaining clean organisation.)

:::

**Step 2: Run the Script** Ensure you have Node.js installed, then run the script from your terminal:

```sh
node compile-css.js
```

This will read the index.css file, compile all the @imported CSS files, and create a single output.css file.

---

## Conclusion

Compiling multiple CSS files into one is a straightforward process, whether you choose to use PostCSS or a custom Node.js script. This approach not only improves the performance of your website but also simplifies the management of your stylesheets. By keeping your styles organised and consolidated, you can focus more on development and less on file management. As you continue to refine your CSS workflow, consider incorporating these methods to enhance your projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Un-Sass'ing My CSS: Compiling Multiple CSS Files into One Always Twisted",
  "desc": "Discover how to transition from Sass to modern CSS, exploring ways we can import multiple CSS files into one sole CSS file",
  "link": "https://chanhi2000.github.io/bookshelf/alwaystwisted.com/unsassing-my-css-css-imports.html",
  "logo": "https://alwaystwisted.com/images/favicons/apple-touch-icon.png",
  "background": "rgba(255,117,0,0.2)"
}
```
