---
lang: en-US
title: "Compiling Multiple CSS Files into One"
description: "Article(s) > Compiling Multiple CSS Files into One"
icon: fa-brands fa-node
category:
  - Node.js
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - node
  - nodejs
  - node-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Compiling Multiple CSS Files into One"
    - property: og:description
      content: "Compiling Multiple CSS Files into One"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/compiling-multiple-css-files-into-one.html
prev: /programming/css/articles/README.md
date: 2025-09-11
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/08/css-modules-connections.jpg
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

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Compiling Multiple CSS Files into One"
  desc="Stu Robson outlines two ways to compile multiple CSS files when you aren't relying on Sass for it."
  url="https://css-tricks.com/compiling-multiple-css-files-into-one"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/08/css-modules-connections.jpg"/>

[<VPIcon icon="fas fa-globe"/>Stu Robson](https://alwaystwisted.com) is on a mission to [<VPIcon icon="fas fa-globe"/>“un-Sass” his CSS](https://alwaystwisted.com/articles/UnSassing-my-CSS). I see articles like this pop up every year, and for good reason as CSS has grown so many new legs in recent years. So much so that much of the core features that may have prompted you to reach for Sass in the past are now baked directly into CSS. In fact, we have [<VPIcon icon="fas fa-globe"/>Jeff Bridgforth](https://jeffbridgforth.com) on tap with a related article next week.

What I like about Stu’s stab at this is that it’s an ongoing journey rather than a wholesale switch. In fact, he’s out with a new post that [<VPIcon icon="fas fa-globe"/>pokes specifically at compiling multiple CSS files into a single file](https://alwaystwisted.com/articles/UnSassing-my-CSS-CSS-imports). Splitting and organizing styles into separate files is definitely the reason I continue to Sass-ify my work. I love being able to find exactly what I need in a specific file and updating it without having to dig through a monolith of style rules.

But is that a real reason to keep using Sass? I’ve honestly never questioned it, perhaps due to a lizard brain that doesn’t care as long as something continues to work. *Oh, I want partialized style files? Always done that with a Sass-y toolchain that hasn’t let me down yet.* I know, not the most proactive path.

Stu outlines two ways to compile multiple CSS files when you aren’t relying on Sass for it:

---

## Using PostCSS

Ah, that’s right, we can use [<VPIcon icon="fas fa-globe"/>PostCSS](https://postcss.org) both with *and* without Sass. It’s easy to forget that PostCSS and Sass are compatible, but not dependent on one another.

```sh
postcss main.css -o output.css
```

Stu explains why this could be a nice way to toe-dip into un-Sass’ing your work:

> PostCSS can seamlessly integrate with popular build tools like webpack, Gulp, and Rollup, allowing you to incorporate CSS compilation into your existing development workflow without potential, additional configuration headaches.

---

## Custom Script for Compilation

The ultimate thing would be eliminating the need for any dependencies. Stu has a custom Node.js script for that:

```js
const fs = require('fs');
const path = require('path');
// Function to read and compile CSS
function compileCSS(inputFile, outputFile) {
  const cssContent = fs.readFileSync(inputFile, 'utf-8');
  const imports = cssContent.match(/@import\s+['"]([^'"]+)['"]/g) || [];
  let compiledCSS = '';
  // Read and append each imported CSS file
  imports.forEach(importStatement => {
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

Not 100% free of dependencies, but geez, what a nice way to reduce the overhead and still combine files:

```sh
node compile-css.js
```

This approach is designed for a flat file directory. If you’re like me and prefer nested subfolders:

::: note

With the flat file structure and single-level import strategy I employ, nested imports (you can do with `postcss-import` aren’t necessary for my project setup, simplifying the compilation process while maintaining clean organisation.

:::

Very cool, thanks Stu! And check out the [<VPIcon icon="fas fa-globe"/>full post](https://alwaystwisted.com/articles/UnSassing-my-CSS) because there’s a lot of helpful context behind this, particularly with the custom script.

<SiteInfo
  name="Un-Sass'ing My CSS: Compiling Multiple CSS Files into One Always Twisted"
  desc="Discover how to transition from Sass to modern CSS, exploring ways we can import multiple CSS files into one sole CSS file"
  url="https://alwaystwisted.com/articles/UnSassing-my-CSS-CSS-imports.html/"
  logo="https://alwaystwisted.com/images/favicons/favicon-16x16.png"
  preview="https://alwaystwisted.com/images/articles/meta-images/unsass-my-css-2.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Compiling Multiple CSS Files into One",
  "desc": "Stu Robson outlines two ways to compile multiple CSS files when you aren't relying on Sass for it.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/compiling-multiple-css-files-into-one.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
