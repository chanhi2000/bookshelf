---
lang: en-US
title: "Make Good Use of Caching, Avoid Reloading the Same Resources"
description: "Article(s) > (7/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (7/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Make Good Use of Caching, Avoid Reloading the Same Resources"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/make-good-use-of-caching-avoid-reloading-the-same-resources.html
date: 2025-05-07
isOriginal: false
author:
  - name: Gordan Tan
    url : https://freecodecamp.org/news/author/woai3c/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Front-End Performance Optimization Handbook - Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-make-good-use-of-caching-avoid-reloading-the-same-resources"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

To prevent users from having to request files every time they visit a website, we can control this behavior by adding Expires or max-age. Expires sets a time, and as long as it's before this time, the browser won't request the file but will directly use the cache. Max-age is a relative time, and it's recommended to use max-age instead of Expires.

But this creates a problem: what happens when the file is updated? How do we notify the browser to request the file again?

This can be done by updating the resource link addresses referenced in the page, making the browser actively abandon the cache and load new resources.

The specific approach is to associate the URL modification of the resource address with the file content, which means that only when the file content changes, the corresponding URL will change. This achieves file-level precise cache control.

So what is related to file content? We naturally think of using [<VPIcon icon="fas fa-globe"/>digest algorithms](https://okta.com/identity-101/md5/) to derive digest information for the file. The digest information corresponds one-to-one with the file content, providing a basis for cache control that's precise to the granularity of individual files.

---

## How to implement caching and cache-busting:

### 1. Server-side cache headers (using Express.js as an example):

```js
// Set cache control headers for static resources
app.use('/static', express.static('public', {
  maxAge: '1y', // Cache for 1 year
  etag: true,   // Use ETag for validation
  lastModified: true // Use Last-Modified for validation
}));

// For HTML files that shouldn't be cached as long
app.get('/*.html', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
    'Expires': new Date(Date.now() + 300000).toUTCString()
  });
  // Send HTML content
});
```

### 2. Using content hashes in filenames (Webpack configuration):

```js title="webpack.config.js"
module.exports = {
  output: {
    filename: '[name].[contenthash].js', // Uses content hash in filename
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // Extract CSS into separate files with content hash
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    // Generate HTML with correct hashed filenames
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
```

This will produce output files like:

- <VPIcon icon="fa-brands fa-js"/>`main.8e0d62a10c151dad4f8e.js`
- <VPIcon icon="fa-brands fa-css3-alt"/>`styles.f4e3a77c616562b26ca1.css`

When you change the content of a file, its hash will change, forcing the browser to download the new file instead of using the cached version.

### 3. Example of generated HTML with cache-busting:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Cache Busting Example</title>
  <!-- Note the content hash in the filename -->
  <link rel="stylesheet" href="/static/styles.f4e3a77c616562b26ca1.css">
</head>
<body>
  <div id="app"></div>
  <!-- Script with content hash -->
  <script src="/static/main.8e0d62a10c151dad4f8e.js"></script>
</body>
</html>
```

### 4. Version query parameters (simpler but less effective approach):

```html
<link rel="stylesheet" href="styles.css?v=1.2.3">
<script src="app.js?v=1.2.3"></script>
```

When updating files, manually change the version number to force a new download.

::: info References:

<SiteInfo
  name="Caching | webpack"
  desc="webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset."
  url="https://webpack.js.org/guides/caching/#root/"
  logo="https://webpack.js.org/icon_512x512.png"
  preview="https://webpack.js.org/icon-pwa-512x512.934507c816afbcdb.png"/>

:::