---
lang: en-US
title: "Letting iOS “Text Size” Setting Affect Font Size on the Web"
description: "Article(s) > Letting iOS “Text Size” Setting Affect Font Size on the Web"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - ios
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Letting iOS “Text Size” Setting Affect Font Size on the Web"
    - property: og:description
      content: "Letting iOS “Text Size” Setting Affect Font Size on the Web"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/letting-ios-text-size-setting-affect-font-size-on-the-web.html
prev: /programming/css/articles/README.md
date: 2024-08-16
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3524
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
  name="Letting iOS “Text Size” Setting Affect Font Size on the Web"
  desc="On iOS, there is a setting for Text Size. I’ll do a video here for the current version of iOS (17.5.1) to be clear: As far as I ever knew, that controlled the text size on the OS itself and native apps. It didn’t effect websites. I think that’s largely true, but I just learned […]"
  url="https://frontendmasters.com/blog/letting-ios-text-size-setting-affect-font-size-on-the-web"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3524"/>

On iOS, there is a setting for Text Size. I’ll do a video here for the current version of iOS (17.5.1) to be clear:

As far as I ever knew, that controlled the text size on the OS itself and native apps. It didn’t effect websites. I think that’s largely true, but I just learned you can honor the setting on the web as well. Craig Hockenberry wrote about this in [<VPIcon icon="fas fa-globe"/>Dynamic Type on the Web](https://furbo.org/2024/07/04/dynamic-type-on-the-web/):

> This is a big win for accessibility: many folks make this adjustment on their device to match their abilities. Just because you can read a tiny font doesn’t mean that I can. It also is a win for consistency: my site’s font size matches the other text that a visitor sees on their device.

I tend to agree. While I think few sites will actually do this, it’s nice when they do. It’s a little similar to using font family keywords like `system-ui` which, when supported, will match the operating system’s font, only this is even better as it’s an accessibility thing not just aesthetic.

Here’s the the trick:

```css
html {
  /* Default, relative sizing so other users can adjust in their own way */
  font-size: 1em;

  /* If supported, inherits the iOS font settings */
  font: -apple-system-body;

  /* Override the font-family if you don't want system-ui */
  font-family: "Avenir Next", "Helvetica Neue", sans-serif;
}
```

Here’s an example page.

<CodePen
  user="chriscoyier"
  slug-hash="qBzpyYo"
  title="iOS Text Size Respecting Page"
  :default-tab="['css','result']"
  :theme="dark"/>

And here’s a video showing it working:

<VidStack src="https://videos.files.wordpress.com/WyW3JXRT/rpreplay_final1723822483_mp4_hd.mp4" />

I haven’t actually done it yet on a production project, so I can’t entirely vouch for it, but it seems safe to me and like a good idea. I’ll likely give it a go in the future.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Letting iOS “Text Size” Setting Affect Font Size on the Web",
  "desc": "On iOS, there is a setting for Text Size. I’ll do a video here for the current version of iOS (17.5.1) to be clear: As far as I ever knew, that controlled the text size on the OS itself and native apps. It didn’t effect websites. I think that’s largely true, but I just learned […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/letting-ios-text-size-setting-affect-font-size-on-the-web.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
