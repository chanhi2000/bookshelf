---
lang: en-US
title: "How the CSS :is() selector will simplify things"
description: "Article(s) > How the CSS :is() selector will simplify things"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How the CSS :is() selector will simplify things"
    - property: og:description
      content: "How the CSS :is() selector will simplify things"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/how-the-css-is-selector-will-simplify-things.html
prev: /programming/css/articles/README.md
date: 2019-12-16
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2019/12/css-is.gif
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
  name="How the CSS :is() selector will simplify things"
  desc="One of the selectors in CSS Level 4 is :is(). It is the successor to :any() and :matches() (which are supplanted by :is()): The :is() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for … Continue reading ”How the CSS :is() selector will simplify things”"
  url="https://bram.us/2019/12/15/how-the-css-is-selector-will-simplify-things/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2019/12/css-is.gif"/>

<VidStack src="https://www.bram.us/wordpress/wp-content/uploads/2019/12/css-is.mp4" />

One of the selectors in CSS Level 4 is `:is()`. It is the successor to `:any()` and `:matches()` *(which are supplanted by `:is()`)*:

> The `:is()` CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for writing large selectors in a more compact form.

```css
/* Without :is */
article > h1,
article > h2,
article > h3,
article > h4,
article > h5 {
  /* … */
}

/* With :is() */
article > :is(h1, h2, h3, h4, h5) {
  /* … */
}
```

Browser Support [<VPIcon icon="iconfont icon-caniuse"/>isn’t quite there yet](https://caniuse.com/#feat=mdn-css_selectors_is) though, as they’re either all behind feature flags or use the outdated `:matches()` or (prefixed) `:any()`

<SiteInfo
  name=":is() CSS pseudo-class - CSS | MDN"
  desc="The :is() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for writing large selectors in a more compact form."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:is/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

Video via [<VPIcon icon="fa-brands fa-x-twitter"/>`@argyleink`](https://x.com/argyleink/status/1192562385489260544)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How the CSS :is() selector will simplify things",
  "desc": "One of the selectors in CSS Level 4 is :is(). It is the successor to :any() and :matches() (which are supplanted by :is()): The :is() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for … Continue reading ”How the CSS :is() selector will simplify things”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/how-the-css-is-selector-will-simplify-things.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
