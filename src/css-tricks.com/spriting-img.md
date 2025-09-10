---
lang: en-US
title: "Spriting with <img>"
description: "Article(s) > Spriting with <img>"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Spriting with <img>"
    - property: og:description
      content: "Spriting with <img>"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/spriting-img.html
prev: /programming/css/articles/README.md
date: 2015-02-06
isOriginal: false
author:
  - name: Robin Rendle
    url : https://css-tricks.com/author/robinrendle/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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

[[toc]]

---

<SiteInfo
  name="Spriting with <img>"
  desc="Sprites aren't limited to background-image, as with the object-fit and object-position properties we can nudge an inline image around its content-box to act"
  url="https://css-tricks.com/spriting-img"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

Sprites aren’t limited to background-image, as with the [<FontIcon icon="iconfont icon-css-tricks"/>object-fit](https://css-tricks.com/almanac/properties/o/object-fit/) and [<FontIcon icon="iconfont icon-css-tricks"/>object-position](https://css-tricks.com/almanac/properties/o/object-position/) properties we can nudge an inline image around its content-box to act just like a sprite. For example, let’s say we want the image below to be added to our HTML page like a regular ol’ image:

![Sprite](https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/02/sprite.png?ssl=1)

```html
<img src='sprite.png' alt='Icons'> 
```

Then we’ll crop the image so that only the first icon is visible on screen:

```css
img {
  object-fit: none;
  object-position: 0 0;
  width: 100px;
  height: 100px;
}
```

![Sprite image cropped to reveal the world icon](https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/02/single-image.png?ssl=1)

Here, the content-box of the `<img>` should be 100px wide and 100px tall, but because the image extends beyond those boundaries, it’s automatically cropped for us with `object-fit: none`. We might then want to use a class to nudge the image and reveal another part of it altogether:

```css
.book {
  object-position: 0 -234px;
}
```

![Sprite cropped to reveal the book icon](https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/02/book.png?ssl=1)

These sprites can be in any regular image format but it’s also possible to use the same technique with SVG. Here’s an example that currently works in the latest stable version of Chrome:

<CodePen
  user="robinrendle"
  slug-hash="jEGbpa"
  title="Sprites with object-position"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Image Slider

Using a dab of JavaScript, we can actually use this same concept to create an image slider out of a single `<img>` tag. When the image is clicked, just change some classes which change the object-position.

<CodePen
  user="robinrendle"
  slug-hash="RNLdNd"
  title="SVG sprite with object-position"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Support

Keep this in mind for the future, since unfortunately the browser support for `object-fit` isn’t particularly great at the moment. The current desktop versions of Safari and Firefox don’t support it and neither does iOS. So make sure to double check the [<FontIcon icon="fas fa-globe"/>almanac entry for `object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/) before using this trick anytime soon.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Spriting with <img>",
  "desc": "Sprites aren't limited to background-image, as with the object-fit and object-position properties we can nudge an inline image around its content-box to act",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/spriting-img.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
