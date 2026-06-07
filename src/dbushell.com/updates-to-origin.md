---
lang: en-GB
title: "Updates to Origin"
description: "Article(s) > Updates to Origin"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - dbushell.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Updates to Origin"
    - property: og:description
      content: "Updates to Origin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/updates-to-origin.html
prev: /programming/js-node/articles/README.md
date: 2013-06-10
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/assets/images/ogimage.png
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
  name="Updates to Origin"
  desc="Updates to Origin"
  url="https://dbushell.com/2013/06/10/updates-to-origin/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/assets/images/ogimage.png"/>

::: note ⚠️

This post was written **13 years ago!**  

Personal opinions and technical details may have changed since writing.

:::

Back in April I published my [**front-end starting point**](https://dbushell.com/origin.md) on GitHub. It includes basic HTML & CSS and many [<VPIcon icon="iconfont icon-grunt"/>Grunt](http://gruntjs.com/) tasks to automate compilation, minification, optimisation, and rasterisation.

---

## What’s new

My custom [SVG rasterisation task (<VPIcon icon="iconfont icon-github"/>`dbushell/dbushell-Origin`)](https://github.com/dbushell/dbushell-Origin/blob/master/tasks/rasterize.js) was poorly written. It brought my laptop to a standstill while churning through as many phantom.js processes as there were SVG files. I’ve now improved that, mostly with a sexy progress bar:

![rasterize task](https://dbushell.com/images/blog/2013/rasterize.png)

rasterize task

~~There’s probably a faster way using a single phantom.js instance but by the time I figure that out I won’t need PNG fallbacks for legacy browsers…~~

::: note Update

I’ve now published [<VPIcon icon="fa-brands fa-npm"/>`grunt-svg2png`](https://npmjs.org/package/grunt-svg2png) to NPM and improved the speed performance dramatically! Instead of 30 seconds it’s done in less than 5.

:::

Because I’m generating some raster graphics on the fly I’ve had to manually optimise them using the ImageOptim desktop app. Now thanks to Jamie Mason’s awesome [<VPIcon icon="iconfont icon-github"/>`JamieMason/grunt-imageoptim`](https://github.com/JamieMason/grunt-imageoptim) and [<VPIcon icon="iconfont icon-github"/>`JamieMason/ImageOptim-CLI`](https://github.com/JamieMason/ImageOptim-CLI) that’s no longer the case! My automated build process now goes:

1. Create build folder
2. Compile HTML templates
3. Compile CSS (Sass with Compass)
4. Copy assets (images, fonts, JavaScript)
5. Minify JavaScript
6. Optimise and rasterise SVG
7. Optimise raster images

The whole process takes less than a minute and I have a production ready [**flat build**](/dbushell.com/the-flat-build-2.md). I could do more with JavaScript (concatenation and testing) but my usual work hasn’t mandated much attention here. I should probably normal(-ise/-ize) spelling at some point.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Updates to Origin",
  "desc": "Updates to Origin",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/updates-to-origin.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
