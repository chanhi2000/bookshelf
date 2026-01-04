---
lang: en-US
title: "8 tips to reduce unused JavaScript"
description: "Article(s) > 8 tips to reduce unused JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 8 tips to reduce unused JavaScript"
    - property: og:description
      content: "8 tips to reduce unused JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/8-tips-reduce-unused-javascript.html
prev: /programming/js/articles/README.md
date: 2023-11-27
isOriginal: false
author:
  - name: Abhinav Anshul
    url : https://blog.logrocket.com/author/abhinavanshul/
cover: /assets/image/blog.logrocket.com/8-tips-reduce-unused-javascript/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="8 tips to reduce unused JavaScript"
  desc="Knowing how to reduce unused JavaScript can help you save time, optimize performance, and improve efficiency."
  url="https://blog.logrocket.com/8-tips-reduce-unused-javascript"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/8-tips-reduce-unused-javascript/banner.png"/>

Reducing JavaScript is a critical aspect of developing modern websites and a key aspect in terms of overall page efficiency.

![8 Tips To Reduce Unused Javascript](/assets/image/blog.logrocket.com/8-tips-reduce-unused-javascript/banner.png)

As software engineering evolves, there is always a push for faster, more efficient sites with an overall smaller JavaScript payload. Unused JavaScript adds unnecessary bloat to your web applications and slows down overall performance.

In this article, you will learn about a series of patterns and tips that you can use to reduce this bloat by removing unused JavaScript, helping you save time, optimize performance, and improve efficiency.

---

## What is unused JavaScript, anyway?

In the simplest terms, unused JavaScript — often called dead code — is any code that your web app doesn’t use or need, but exists in the final JavaScript bundle that you ship to the browser. This dead code sits dormant and increases the overall size of your JavaScript bundle, which can impact performance.

There could be many reasons for unused code in your JavaScript bundle.

The most obvious reason is that you might have added code that you no longer need, but you forgot to remove it in the final bundle. These could be functions, classes, or variables that are no longer being executed, called, or used anywhere in your app.

Another reason could be unused dependencies. In other words, you might be using a third-party JavaScript dependency in your code that you are not using. Even worse, those dependencies could have their own unused JavaScript, further adding to the unnecessary bloat in your project.

---

## Removing unused JavaScript

There are a couple of ways you can remove unused JavaScript from your web apps. These tips and patterns will help you ship more robust and efficient JavaScript bundles to the web, whether you are using plain old JavaScript or any dedicated libraries or frameworks like React, SolidJS, or Vue.js.

### Code splitting

Code splitting is a technique used to split JavaScript code into smaller, more manageable chunks. You can then load these chunks on demand or in parallel network requests, meaning you don’t have to load your entire JavaScript bundle every time — only what’s necessary.

Imagine you had a single JavaScript bundle like the following:

```html
<script src="mainbundle.js"></script> // 60kb file
```

You can split it into smaller chunks that can be downloaded only when needed:

```html
<script async defer src="chunk1.js"></script> // 30 kb file
<script async defer src="chunk2.js"></script> // 30 kb file
<script async defer src="chunk3.js"></script> // 30 kb file
```

This strategy reduces the overall network load on the main thread responsible for initializing and downloading JavaScript scripts:

![Graphic Showing How A Single Javascript Bundle, Which Takes Time To Load, Can Be Split Into Smaller Chunks, Which Can Be Loaded More Quickly And On Demand](/assets/image/blog.logrocket.com/8-tips-reduce-unused-javascript/img1-Single-JavaScript-bundle-split-smaller-chunks.jpeg)

If you’re using a JavaScript library or framework like Next.js or Vue, you don’t need to do this manually — most modern JavaScript frameworks support code splitting by default.

However, you can delegate some of the components used as server-side only. This helps the framework “smartly” split JavaScript into even smaller chunks that shouldn’t be bundled with client-side JavaScript chunks.

Many organizations use this strategy in production, which speaks to its efficiency. Here’s an example of code splitting in action on the Loom website:

![Screenshot Of Loom Website With Browser Developer Tools Open To Show Next Js Splitting Javascript Into Smaller Chunks](/assets/image/blog.logrocket.com/8-tips-reduce-unused-javascript/img2-Loom-site-developer-tools-showing-Next-js-splitting-JavaScript-smaller-chunks.jpeg)

### Tree shaking

Tree shaking refers to eliminating dead code — i.e., the unwanted JavaScript that is not being used by your app. Many popular bundlers, such as webpack, Rollup, or Vite, [**use a tree-shaking approach**](/blog.logrocket.com/tree-shaking-json-files-webpack.md) while building the JavaScript chunks that you ship to the browser.

To ensure tree shaking in your bundle, always use the modern ES6 syntax in your JavaScript components — that is, `import` and `export` syntax:

```js
// default import
import Navbar from 'Components'
// named import
import { Navbar } from 'Components'

// default export
export default Navbar
// named export
export { Navbar } 
```

The modern ES6 syntax helps your bundler identify dead code, similar to how ESLint points out if there is an imported component but it’s not being consumed anywhere.

### JavaScript minification

Less JavaScript in your bundle means less time needed for a browser to download the bundle. To ensure your JavaScript is as light as it can get, always minify it before shipping.

Minifying JavaScript will trim out whitespaces, syntax highlighting, comments, and other parts of your code that you don’t need in the final production build. These unnecessary snippets take up space in the bundle as dead code.

Even simple-looking JavaScript code can be compressed and modified. Here’s an example of simple JavaScript code before minification:

```js
// add function
const add = (a, b) => {
  return a + b
}

// call add function
add(3, 4) 
```

Here’s how this code looks after minification:

```js
const add=(d,a)=>d+a;add(3,4);
```

Imagine the effect minifying JavaScript would have on large-scale bundles!

JavaScript minification is easier than you might think. You can pick from a number of [**JavaScript minification tools available online**](//blog.logrocket.com/terser-vs-uglify-vs-babel-minify-comparing-javascript-minifiers.md), such as Terser, Ugligy, babel-minify, and more.

### Load JavaScript asynchronously

A small tip that can save your network bandwidth significant amounts of time is always loading JavaScript asynchronously.

One way you can do this is by adding `async` and `defer` to your JavaScript scripts. This will automatically handle JavaScript downloading and won’t delay or block your HTML from parsing or rendering while JavaScript is being loaded.

`async` and `defer` attributes handle JavaScript script downloading and execution in a slightly different order. You can pick what is best for your project.

An `async` JavaScript script works as shown in this image:

![Graphic Showing How Async Javascript Attribute Affects Script Execution. Upper Bar Labeled Html Showing Parsing Interrupted By Javascript Execution, Then Resuming After Execution Is Complete](/assets/image/blog.logrocket.com/8-tips-reduce-unused-javascript/img3-Async-JavaScript-script-execution.png)

Meanwhile, a `defer` JavaScript script works like so:

![Graphic Showing How Defer Javascript Attribute Affects Script Execution. Bar Shows Html Parsing And Completing While Javascript Is Fetched, Then Javascript Executing Afterwards](/assets/image/blog.logrocket.com/8-tips-reduce-unused-javascript/img4-Defer-JavaScript-attribute-script-execution.png)

In many cases, adding both async and defer gets the job done correctly. Here’s an example of how you could write this:

```js
<script async defer src="bundle.js"></script>
```

### Dynamic imports

Dynamic imports are now possible in plain JavaScript thanks to ES6 modules. These are particularly helpful when you want to load JavaScipt modules or scripts conditionally. Here’s how you would write dynamic imports:

```js
import('./utility.js')
  .then((module) => {
    // use utility code here
  })
.catch((error) => {
  // catch errors
});
```

This strategy enables us to request a JavaScript bundle after certain conditions are met, as opposed to importing every JavaScript component at the top of the file. Consider this code snippet, where the module is loading only after attaching the event listener:

```js
document.getElementById('dashboard').addEventListener('click', () => {
  import('./utility.js')
    .then((module) => {
      // Use utility module APIs
      module.callSomeFunction()
    })
     // catch unexpected error here
    .catch((error) => {
      console.error("Oops! An error has occurred");
    });
});
```

### Lazy loading

[**Lazy loading in JavaScript**](/blog.logrocket.com/understanding-lazy-loading-javascript.md) is a simple but quite useful pattern. When done correctly, lazy loading can help you conserve network bandwidth. The fundamental rule is to load only those JavaScript modules that are needed at the current time.

One pattern you can follow is to always load JavaScript on the viewport height. Suppose you had a very extensive list of users. You might not want to load the information of, say, the 300th user, as this information isn’t needed or even visible within the current viewport.

There are some really brilliant libraries out there for this particular use case, which delegate JavaScript modules to only load when a specified user — such as the 300th — reaches the current viewport.

Lazy loading is not just limited to lists. Assets such as images, videos, a large number of nodes, and more can be lazy loaded as well. For example, you can put up a placeholder before the actual image and its associated JavaScript gets downloaded by the browser.

These patterns not only help you with shipping less JavaScript code but improve user experience by a huge margin as well.

### Check for library deprecation

As the JavaScript ecosystem keeps improving, your code and the libraries you use should keep up with any changes. This will help make your code more robust and secure for future releases.

If you’re using any third-party libraries in your code, make sure to always use the latest versions and check that they have not been deprecated. Many libraries, especially smaller, open source libraries that are maintained on a volunteer basis, can become outdated or get deprecated unexpectedly.

In an npm or Node.js-based development environment, you can run the following code to check for library deprecations:

```sh
npx depcheck
```

### Pick lightweight libraries

Your choice of external dependencies or third-party libraries can affect how much JavaScript you are shipping. Always make sure any library you pick for your project is actively maintained, uses modern ECMAScript versions, and most importantly, is lightweight.

You can use tools like Bundlephobia to check for JavaScript size, overall versioning, and even how much time it takes for a particular library to download on a slow connection. You might find a better library out there that does a better job and is more lightweight compared to what you are using.

For example, if you [<VPIcon icon="fas fa-glboe"/>check React using Bundlephobia](https://bundlephobia.com/package/react@18.2.0), you will find out it is pretty fast — just 3ms on a 4G connection and 50ms on a slow 3g connection:

![React Library Stats On `Bundlephobia` Showing Bundle Size And Download Time](/assets/image/blog.logrocket.com/8-tips-reduce-unused-javascript/img5-React-library-Bundlephobia-stats.png)

This is quite impressive for a JavaScript library with millions of downloads each week. Furthermore, it has just one dependency, making it quite lightweight at just over 6kB minified.

This qualifies React as quite a good pick for an external dependency to your project in terms of speed, JavaScript bundle size, and scalability.

---

## Conclusion

In this article, we discussed eight methods you can use to ship less JavaScript and improve your project’s performance.

Every project is different and has different architecture and patterns being used. A lot of the tips mentioned here will work for you, but some might not.

Use your best judgment to determine what works best for you and your project. This will enable you to confidently make your sites and apps more robust.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "8 tips to reduce unused JavaScript",
  "desc": "Knowing how to reduce unused JavaScript can help you save time, optimize performance, and improve efficiency.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/8-tips-reduce-unused-javascript.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
