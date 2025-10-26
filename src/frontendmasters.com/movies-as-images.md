---
lang: en-US
title: "Movies as Images"
description: "Article(s) > Movies as Images"
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
      content: "Article(s) > Movies as Images"
    - property: og:description
      content: "Movies as Images"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/movies-as-images.html
prev: /programming/css/articles/README.md
date: 2025-03-05
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5281
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
  name="Movies as Images"
  desc="Safari made .mp4 file work in img tags in HTML back in 2017, but no other browser followed suite. Should they have? "
  url="https://frontendmasters.com/blog/movies-as-images/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5281"/>

Animated GIFs just suck for web performance, so don’t put them on websites. To [<VPIcon icon="fas fa-globe"/>quote Colin Bendell](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/):

::: info Colin Bendell (<VPIcon icon="fas fa-globe"/><code>calendar.perfplanet.com</code>)

<SiteInfo
  name="Evolution of <img>: Gif without the GIF"
  desc="tl;dr GIFs are awesome but terrible for quality and performanc Replacing GIFs with <video> is better but has perf. drawbacks: not preloaded, uses range request Now you can <img src=”.mp4”>s in Safari Technology Previe Early results show mp4s in <img> tags display"
  url="https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/"
  logo="https://calendar.perfplanet.com/wp-content/themes/wpc2/wpclogo.png"
  preview="https://colinbendell.cloudinary.com/image/upload/c_crop,f_auto,g_auto,h_350,w_400/v1512090971/Wizard-Clap-by-Markus-Magnusson.gif"/>

> Animated GIFs are terrible for web performance. They are HUGE in size, impact cellular data bills, require more CPU and memory,cause repaints, and are battery killers.

:::

So if you need that same *behavior* of automatically playing silent moving images, we’ve learned to do to use a `<video>` instead:

```html
<video autoplay loop muted inline
  src="https://assets.codepen.io/3/fire-ring.mp4">
</video>
```

That’s… *attribute soup*. But it works. Plus there is a very good chance the `.mp4` is *way* smaller in file size than the GIF would be.

::: note

My vote would be to always include `controls` as another attribute on there. Yes it adds some UI over the image, but that UI allows the user to hit a stop button, which is an accessibility feature and one I use often to stop forever-playing anyway. If you don’t, at least wire up some CSS or JavaScript that stops the playing on click.

:::

Since 2017, Safari has supported this alternate approach:

```html
<img src="https://assets.codepen.io/3/fire-ring.mp4" alt="" />
```

Just an `<img>` tag! No attributes to remember and get right, and it has the exact same behavior. *Except* the fact that there is no way to pause it, which is a bummer.

There are various ways to ship MP4-as-img by falling back to other techniques. When I started writing this and testing things out I was all prepared to try those and be annoyed at non-Safari browsers for not supporting this idea. But I’ve changed my tune. The fact that the `<video>`-based technique works fine across browsers and has a clear path toward pausing the movement makes me feel like MP4-as-img is just a sub-part technique and probably shouldn’t be used at all.

<CodePen
  user="chriscoyier"
  slug-hash="QwWvrqw"
  title="Video vs Img (MP4 Source)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Movies as Images",
  "desc": "Safari made .mp4 file work in img tags in HTML back in 2017, but no other browser followed suite. Should they have? ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/movies-as-images.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
