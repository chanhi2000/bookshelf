---
lang: en-US
title: "How to Favicon in 2024"
description: "Article(s) > How to Favicon in 2024"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Favicon in 2024"
    - property: og:description
      content: "How to Favicon in 2024"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/how-to-favicon-in-2024.html
prev: /programming/css/articles/README.md
date: 2024-02-01
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/709
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
  name="How to Favicon in 2024"
  desc="Andrey Sitnik does a good job each year investigating what websites actually need in terms of doing the best we can for site favicons. The 2024 edition is out, and it looks like this: …"
  url="https://blog.master.dev/how-to-favicon-in-2024/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/709"/>

Andrey Sitnik does a good job each year investigating what websites actually need in terms of doing the best we can for site favicons. [<VPIcon icon="fas fa-globe"/>The 2024 edition is out](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs), and it looks like this:

```xml
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- 180×180 -->
<link rel="manifest" href="/manifest.webmanifest">
```

```json title="manifest.webmanifest"
{
  "icons": [
    { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" }
  ]
}
```

It’s worth knowing what you *actually* need, as there are quite a few “favicon generator” websites out there that spit out many dozen files and suggest outdated code that just isn’t needed anymore.

```component VPCard
{
  "title": "Creating Dynamic Social Media Cards for User Content",
  "desc": "Discover how to create dynamic social media cards for user-generated content and e-commerce sites, enhancing SEO and sharing efficiency.",
  "link": "/blog.master.dev/what-should-you-put-on-a-dynamic-custom-social-media-card-image.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Writing to the Clipboard in JavaScript",
  "desc": "The most basic use case, writing a bit of text to the user's clipboard, is mercifully easy. But there is plenty more to know. Did you know writing image data to the clipboard ONLY works with PNG?",
  "link": "/blog.master.dev/writing-to-the-clipboard-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Mapping with Leaflet",
  "desc": "Leaflet.js is a free open-source mapping library. We'll look at how to use it to create a basic map with location points of cats up for adoption. ",
  "link": "/blog.master.dev/mapping-with-leaflet.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Favicon in 2024",
  "desc": "Andrey Sitnik does a good job each year investigating what websites actually need in terms of doing the best we can for site favicons. The 2024 edition is out, and it looks like this: …",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/how-to-favicon-in-2024.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
