---
lang: en-US
title: "Keeping Pixely Images Pixely (and Performant!)"
description: "Article(s) > Keeping Pixely Images Pixely (and Performant!)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Keeping Pixely Images Pixely (and Performant!)"
    - property: og:description
      content: "Keeping Pixely Images Pixely (and Performant!)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/keeping-pixely-images-pixely-and-performant.html
prev: /programming/css/articles/README.md
date: 2024-09-23
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3972
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
  name="Keeping Pixely Images Pixely (and Performant!)"
  desc="With CSS' `image-rendering: pixelated;` we can keep HTML images that have pixelated look anyway quite sharp looking, and possibly more performant to boot."
  url="https://frontendmasters.com/blog/keeping-pixely-images-pixely-and-performant/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3972"/>

[After Marc chimed in](/frontendmasters.com/gradient-text-with-a-drop-shadow.md) with technique he needed to pull off as part of this years big promotion last week, it reminded me of another thing that ended up being relevant to the design aesthetic at play.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/Screenshot-2024-09-23-at-2.31.56%E2%80%AFPM.png?resize=1024%2C841&ssl=1)

A horizontal slice of that background image was used here on this blog and the image size was quite tolerably small thanks to this CSS property.

See how everything has that 8-bit-ish pixely look to it? There is a CSS property that you can apply to images (`<img>` elements) that will affect how they look when they scale. Like if you’ve got an image like this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/landscape.png?resize=1024%2C512&ssl=1)

You’re probably going to want to do this no matter what:

```css
.castle-landscape-image {
  image-rendering: pixelated;
}
```

If there is any resizing at all any direction, it’s just going to look better. There is also `image-rendering: crisp-edges;` which is apparently specifically for pixel art, but I don’t see much of a difference.

Another cool thing we can do here is ensure the original art is as small as it can reasonably be (probably whatever size it was *originally created at)* and served like that, so any scaling beyond that doesn’t cause any anti-aliasing stuff (blurred edges) *at all.* In the case of the example above where I didn’t really have the original just a high-res version, I can scale it down and down trying to find the best place where it still looks fine but I’m saving lots of image space:

<CodePen
  user="1Marc"
  slug-hash="jOgOYOL"
  title="Pixelated Landscape"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Another use-case here is something like a QR code. This QR code is 393 *bytes* (super small!). I’ll render it huge here and see how perfect it looks:

<CodePen
  user="1Marc"
  slug-hash="dyxydMv"
  title="Super Tiny QR code rendered big"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

I have an SVG version of this same QR code that is 33 KB. This is a (very rare) case where a simple vector-looking graphic is actually better served from a binary image that the natively vector SVG.

Even a bit more extreme, here’s a 78 byte GIF (I hand-pixeled drew in Photoshop, and exported without metadata to get that small). It can scale up huge. Here’s the tiny natural one on top and the big one below:

<CodePen
  user="1Marc"
  slug-hash="NWQWyrO"
  title="78 byte image pixelated"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Note that if you try the `crisp-edges` value on the above, it seems to bail out, so I guess there must be some kind of difference between the values.

Point of the story: if you’ve got a pixely `<img>`, chuck `image-rendering: pixelated;` and go as small as you can to save on size.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Keeping Pixely Images Pixely (and Performant!)",
  "desc": "With CSS' `image-rendering: pixelated;` we can keep HTML images that have pixelated look anyway quite sharp looking, and possibly more performant to boot.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/keeping-pixely-images-pixely-and-performant.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
