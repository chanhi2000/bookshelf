---
lang: en-US
title: "CSS Color Scheme Queries (“Dark Mode CSS”)"
description: "Article(s) > CSS Color Scheme Queries (“Dark Mode CSS”)"
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
      content: "Article(s) > CSS Color Scheme Queries (“Dark Mode CSS”)"
    - property: og:description
      content: "CSS Color Scheme Queries (“Dark Mode CSS”)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-color-scheme-queries-dark-mode-css.html
prev: /programming/css/articles/README.md
date: 2019-05-24
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2019/05/darkmode.gif
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
  name="CSS Color Scheme Queries (“Dark Mode CSS”)"
  desc="Next to Safari 12.1 earlier this month, Firefox 67 now also supports “CSS Color Scheme Queries”. The prefers-color-scheme media feature allows sites to adapt their styles to match a user’s preference for dark or light color schemes, a choice that’s begun to appear in operating systems like Windows, macOS and Android. Chrome will support + … Continue reading ”CSS Color Scheme Queries (“Dark Mode CSS”)”"
  url="https://bram.us/2019/05/23/css-color-scheme-queries-dark-mode-css/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2019/05/darkmode.gif"/>

![](https://bram.us/wordpress/wp-content/uploads/2019/05/darkmode.gif)

Next to Safari 12.1 earlier this month, Firefox 67 now also supports “CSS Color Scheme Queries”.

> The `prefers-color-scheme` media feature allows sites to adapt their styles to match a user’s preference for dark or light color schemes, a choice that’s begun to appear in operating systems like Windows, macOS and Android.

Chrome [<VPIcon icon="fa-brands fa-chrome"/>will support + enable it by default in Chrome 76](https://chromestatus.com/feature/5109758977638400) *(the current Canary build at the time of writing)*

Defining a “Dark Mode” for your websites becomes really easy when you combine `prefers-color-scheme` with [**CSS Custom Properties (“CSS Variables”)**](/bram.us/theming-with-css-custom-properties-css-variables.md):

```css
:root {
  color-scheme: light dark;
  --special-text-color: hsla(60, 100%, 50%, 0.5);
  --border-color: black;
}

@media (prefers-color-scheme: dark) {
  :root {
    --special-text-color: hsla(60, 50%, 70%, 0.75);
    --border-color: white;
  }
}

.special {
  color: var(--special-text-color);
  border: 1px solid var(--border-color);
}
```

If you’re too lazy, then you can somewhat fake it by abusing `mix-blend-mode: difference;`, but it’s not perfect. Here’s an adjusted snippet, which injects the hack on the body using `::before`:

```css
@media (prefers-color-scheme: dark) {
  body::before {
    content: '';
    display: block;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    mix-blend-mode: difference;
    z-index: 1;
    pointer-events: none;
  }
}
```

![A nice touch of Safari is that its DevTools also change when Dark Mode is enabled](https://bram.us/wordpress/wp-content/uploads/2019/05/darkmode-webkit-webinspector.png)

<SiteInfo
  name="Dark Mode Support in WebKit"
  desc="With the introduction of Dark Mode in macOS Mojave last year, web developers have been asking for support in Safari to style web content that matches the system appearance."
  url="https://webkit.org/blog/8840/dark-mode-support-in-webkit//"
  logo="https://webkit.org/favicon.png"
  preview="https://webkit.org/wp-content/uploads/DarkModeSupportHeroDark.png"/>

<SiteInfo
  name="Dark Mode in Web Inspector"
  desc="Web Inspector on macOS Mojave now supports Dark Mode."
  url="https://webkit.org/blog/8892/dark-mode-in-web-inspector//"
  logo="https://webkit.org/favicon.png"
  preview="https://webkit.org/wp-content/uploads/trimmed.png"/>

<SiteInfo
  name="Firefox 67: Dark Mode CSS, WebRender, and more – Mozilla Hacks - the Web developer blog"
  desc="Firefox 67 is now available in general release, bringing a faster and better JavaScript debugger, support for CSS prefers-color-scheme queries, and the initial debut of WebRender in stable Firefox. Dan ..."
  url="https://hacks.mozilla.org/2019/05/firefox-67-dark-mode-css-webrender/"
  logo="https://hacks.mozilla.org/favicon.ico"
  preview="https://hacks.mozilla.org/wp-content/uploads/2019/05/dark-bugzilla-768x545-social.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Color Scheme Queries (“Dark Mode CSS”)",
  "desc": "Next to Safari 12.1 earlier this month, Firefox 67 now also supports “CSS Color Scheme Queries”. The prefers-color-scheme media feature allows sites to adapt their styles to match a user’s preference for dark or light color schemes, a choice that’s begun to appear in operating systems like Windows, macOS and Android. Chrome will support + … Continue reading ”CSS Color Scheme Queries (“Dark Mode CSS”)”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-color-scheme-queries-dark-mode-css.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
