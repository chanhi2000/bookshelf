---
lang: en-US
title: "Color Picker with Display P3"
description: "Article(s) > Color Picker with Display P3"
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
      content: "Article(s) > Color Picker with Display P3"
    - property: og:description
      content: "Color Picker with Display P3"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/color-picker-with-display-p3.html
prev: /programming/css/articles/README.md
date: 2024-04-12
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/1688
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
  name="Color Picker with Display P3"
  desc="One of my recent moanings-and-groanings is the fact that seemingly no color-picker supports Display P3 colors. Display P3 allows you to use far more vivid colors then we've historically had access to in CSS, but now are totally supported in CSS through newer color functions like oklch(). Not even the built-in color picker to macOS.…"
  url="https://blog.master.dev/color-picker-with-display-p3/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/1688"/>

One of my recent moanings-and-groanings is the fact that seemingly no color-picker supports Display P3 colors. Display P3 allows you to use [<VPIcon icon="fas fa-globe"/>far more vivid colors](https://blog.master.dev/wp-admin/post.php?post=1688&action=edit) then we’ve historically had access to in CSS, but now are totally supported in CSS through newer color functions like [`oklch()`](https://oklch.com/#70,0.1,73,100)`. Not even the built-in color picker to macOS.

Well it’s time for me to quit my bitchin’ because I’ve just seen two. I only looked at Mac stuff because that’s what I use. Feel free to chime in with options on other operating systems.

[<VPIcon icon="fas fa-globe"/>XScope](https://xscopeapp.com/) can do it — but XScope is $50 and I find it heavy handed for the work I do. [<VPIcon icon="fas fa-globe"/>System Color Picker](https://sindresorhus.com/system-color-picker) is *free* and I find very nice in it’s simplicity (it’s just a UX improvement over the default). The workflow I want, and it delivers, is: pick color from screen, have color on clipboard in OKLCH (that’s it).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/04/Screenshot-2024-04-12-at-3.39.54%E2%80%AFPM-505x1024.png?resize=505%2C1024&quality=80&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/04/Screenshot-2024-04-12-at-3.40.52%E2%80%AFPM-1024x899.png?resize=1024%2C899&quality=80&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/04/Screenshot-2024-04-12-at-3.40.47%E2%80%AFPM-1024x976.png?resize=1024%2C976&quality=80&ssl=1)

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/01/eyedropper-thumb.jpg?fit=1000%2C500&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/the-color-input-the-color-picker/ "The Color Input &#038; The Color Picker")

#### [The Color Input & The Color Picker](https://blog.master.dev/the-color-input-the-color-picker/ "The Color Input &#038; The Color Picker")

HTML has a color input that is pretty decent: That's it. Support across the board. However, browsers can and do have different approaches to what happens when the input is used. macOS Chrome (has it's own UI) macOS Firefox (uses the macOS system color picker) macOS Safari (has…

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/07/Custom-Select-that-comes-up-from-the-bottom-on-mobile.jpg?fit=1140%2C676&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/custom-select-that-comes-up-from-the-bottom-on-mobile/ "Custom Select (that comes up from the bottom on mobile)")

#### [Custom Select (that comes up from the bottom on mobile)](https://blog.master.dev/custom-select-that-comes-up-from-the-bottom-on-mobile/ "Custom Select (that comes up from the bottom on mobile)")

You've got A LOT of control over the design of select menus now, and it can be done as a progressive enhancement.

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/05/CleanShot-2025-05-23-at-07.32.58%402x.png?fit=1200%2C1146&quality=80&ssl=1&resize=350%2C200)](https://blog.master.dev/p3-in-color-inputs/ "P3 in Color Inputs")

#### [P3 in Color Inputs](https://blog.master.dev/p3-in-color-inputs/ "P3 in Color Inputs")

I just complained that color inputs couldn't deal in P3 colors. Looks like Safari is the first-mover on supporting that, as well as alpha: I was able to make a quick demo and see it on iOS: Under the Sliders…

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Color Picker with Display P3",
  "desc": "One of my recent moanings-and-groanings is the fact that seemingly no color-picker supports Display P3 colors. Display P3 allows you to use far more vivid colors then we've historically had access to in CSS, but now are totally supported in CSS through newer color functions like oklch(). Not even the built-in color picker to macOS.…",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/color-picker-with-display-p3.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
