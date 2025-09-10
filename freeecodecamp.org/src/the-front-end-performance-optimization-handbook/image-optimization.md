---
lang: en-US
title: "Image Optimization"
description: "Article(s) > (9/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
category:
  - Node.js
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (9/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Image Optimization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/image-optimization.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-image-optimization"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

---

## 1. Lazy Loading Images

In a page, don't initially set the path for images - only load the actual image when it appears in the browser's viewport. This is lazy loading. For websites with many images, loading all images at once can have a significant impact on user experience, so image lazy loading is necessary.

First, set up the images like this, where images won't load when they're not visible in the page:

```html
<img data-src="https://avatars0.githubusercontent.com/u/22117876?s=460&u=7bd8f32788df6988833da6bd155c3cfbebc68006&v=4">
```

When the page becomes visible, use JS to load the image:

```js
const img = document.querySelector('img')
img.src = img.dataset.src
```

This is how the image gets loaded. For the complete code, please refer to the reference materials.

::: info Reference:

<SiteInfo
  name="Lazy loading - Performance | MDN"
  desc="Lazy loading is a strategy to identify resources as non-blocking (non-critical) and load these only when needed. It's a way to shorten the length of the critical rendering path, which translates into reduced page load times."
  url="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

---

## 2. Responsive Images

The advantage of responsive images is that browsers can automatically load appropriate images based on screen size.

Implementation through `picture`:

```html
<picture>
  <source srcset="banner_w1000.jpg" media="(min-width: 801px)">
  <source srcset="banner_w800.jpg" media="(max-width: 800px)">
  <img src="banner_w800.jpg" alt="">
</picture>
```

Implementation through `@media`:

```js
@media (min-width: 769px) {
  .bg {
    background-image: url(bg1080.jpg);
  }
}
@media (max-width: 768px) {
  .bg {
    background-image: url(bg768.jpg);
  }
}
```

---

## 3. Adjust Image Size

For example, if you have a 1920 \* 1080 size image, you show it to users as a thumbnail, and only display the full image when users hover over it. If users never actually hover over the thumbnail, the time spent downloading the image is wasted.

So we can optimize this with two images. Initially, only load the thumbnail, and when users hover over the image, then load the large image. Another approach is to lazy load the large image, manually changing the src of the large image to download it after all elements have loaded.

::: tip Example implementation of image size optimization:

```html
<!-- HTML Structure -->
<div class="image-container">
  <img class="thumbnail" src="thumbnail-small.jpg" alt="Small thumbnail">
  <img class="full-size" data-src="image-large.jpg" alt="Full-size image">
</div>
```

```css :collapsed-lines
/* CSS for the container and images */
.image-container {
  position: relative;
  width: 200px;
  height: 150px;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.full-size {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  max-width: 600px;
  max-height: 400px;
}

/* Show full size on hover */
.image-container:hover .full-size {
  display: block;
}
```

```js :collapsed-lines
// JavaScript to lazy load the full-size image
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.image-container');

  containers.forEach(container => {
    const thumbnail = container.querySelector('.thumbnail');
    const fullSize = container.querySelector('.full-size');

    // Load the full-size image when the user hovers over the thumbnail
    container.addEventListener('mouseenter', () => {
      if (!fullSize.src && fullSize.dataset.src) {
        fullSize.src = fullSize.dataset.src;
      }
    });

    // Alternative: Load the full-size image after the page loads completely
    /*
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!fullSize.src && fullSize.dataset.src) {
          fullSize.src = fullSize.dataset.src;
        }
      }, 1000); // Delay loading by 1 second after window load
    });
    */
  });
});
```

This implementation:

1. Shows only the thumbnail initially
2. Loads the full-size image only when the user hovers over the thumbnail
3. Provides an alternative approach to load all full-size images with a delay after page load

:::

---

## 4. Reduce Image Quality

For example, with JPG format images, there's usually no noticeable difference between 100% quality and 90% quality, especially when used as background images. When cutting background images in Adobe Photoshop, I often cut the image into JPG format and compress it to 60% quality, and basically can't see any difference.

There are two compression methods: one is through the Webpack plugin `image-webpack-loader`, and the other is through online compression websites.

Here's how to use the Webpack plugin `image-webpack-loader`:

```sh
npm i -D image-webpack-loader
```

::: tip Webpack configuration:

```js
{
  test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
  use:[
    {
    loader: 'url-loader',
    options: {
      limit: 10000, /* Images smaller than 1000 bytes will be automatically converted to base64 code references */
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    /* Compress images */
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
      }
    }
  ]
}
```

:::

---

## 5. Use CSS3 Effects Instead of Images When Possible

Many images can be drawn with CSS effects (gradients, shadows, and so on). In these cases, CSS3 effects are better. This is because code size is usually a fraction or even a tenth of the image size.

::: info Reference:

<SiteInfo
  name="Asset Management | webpack"
  desc="webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset."
  url="https://webpack.js.org/guides/asset-management//"
  logo="https://webpack.js.org/icon_512x512.png"
  preview="https://webpack.js.org/icon-pwa-512x512.934507c816afbcdb.png"/>

:::

---

## 6. Use WebP to Format Images

WebP's advantage is reflected in its better image data compression algorithm, which brings smaller image volume while maintaining image quality that's indistinguishable to the naked eye. It also has lossless and lossy compression modes, Alpha transparency, and animation features. Its conversion effects on JPEG and PNG are quite excellent, stable, and uniform.

::: tip Example of implementing WebP with fallbacks:

```html
<!-- Using the picture element for WebP with fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description of the image">
</picture>
```

**Server-side WebP detection and serving:**

```js title="express.js"
// Express.js example
app.get('/images/:imageName', (req, res) => {
  const supportsWebP = req.headers.accept && req.headers.accept.includes('image/webp');
  const imagePath = supportsWebP 
    ? `public/images/${req.params.imageName}.webp` 
    : `public/images/${req.params.imageName}.jpg`;

  res.sendFile(path.resolve(__dirname, imagePath));
});
```

:::

::: info Reference:

<SiteInfo
  name="WebP - Wikipedia"
  desc="WebP is a raster graphics file format developed by Google intended as a replacement for JPEG, PNG, and GIF file formats. It supports both lossy and lossless compression,[8] as well as animation and alpha transparency."
  url="https://en.wikipedia.org/wiki/WebP/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wikipedia-logo-v2-webp.webp/960px-Wikipedia-logo-v2-webp.webp.png"/>

:::
