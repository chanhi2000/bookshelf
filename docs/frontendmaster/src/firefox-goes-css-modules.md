---
lang: en-US
title: "Firefox Goes CSS Modules"
description: "Article(s) > Firefox Goes CSS Modules"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Firefox Goes CSS Modules"
    - property: og:description
      content: "Firefox Goes CSS Modules"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/firefox-goes-css-modules.html
prev: /programming/css/articles/README.md
date: 2026-01-21
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8331
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

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Firefox Goes CSS Modules"
  desc="Firefox 147 just came out, and the flagship developer feature is clearly anchor positioning support, bringing that ”to the baseline” as we're supposed to say these days. That rules, but I'm also very hyped about CSS module scripts. Remember, they are a way of importing a stylesheet in JavaScript, that is, the only decent way…"
  url="https://blog.master.dev/firefox-goes-css-modules/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8331"/>

[<VPIcon icon="fa-brands fa-firefox"/>Firefox 147 just came out](https://firefox.com/en-US/firefox/147.0/releasenotes/), and the flagship developer feature is clearly anchor positioning support, bringing that “to the baseline” as we’re supposed to say these days. That rules, but I’m also very hyped about CSS module scripts. [**Remember**](/blog.master.com/architecture-through-component-colocation.md), they are a way of [<VPIcon icon="fa-brands fa-firefox"/>importing a stylesheet in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with), that is, the only decent way of handling CSS in the Shadow DOM.

```js{1,7}
import sheet from './styles.css' with { type: 'css' };

class MyComponent extends HTMLElement {
  constructor() {
    super(); 
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.adoptedStyleSheets = [sheet];
  }
}
```

For clarity, this is sometimes called “CSS Module Scripts” and the import syntax is called “Import Attributes”.

```component VPCard
{
  "title": "A Nice Vanilla App Archicture Using Web Components and CSS Module Scripts",
  "desc": "CSS module scripts help keep the dream of co-locating files that all relate to a component, without needing a bundler. ",
  "link": "/blog.master.dev/architecture-through-component-colocation.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

[![woman wearing blue shawl lapel suit jacket](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/06/pexels-photo-1036622.jpeg?fit=1200%2C801&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/import-assertions-use-with-not-assert-anymore/ "Import Assertions use &#8220;with&#8221; not &#8220;assert&#8221; anymore.")

#### [Import Assertions use “with” not “assert” anymore.](https://blog.master.dev/import-assertions-use-with-not-assert-anymore/ "Import Assertions use &#8220;with&#8221; not &#8220;assert&#8221; anymore.")

I was trying to play with CSS Module Scripts the other day, which are a way to import CSS as a constructable stylesheet using the ESModules syntax. They are Chrome-only so not really something we can generally use (unless you're building an Electron app or something), but I really like…

```component VPCard
{
  "title": "@media (scripting: enabled)",
  "desc": "Ahmad Shadeed: Today I learned about the media scripting feature. It's about detecting JS support via a CSS media query. Soon, we won't need the .no-js or .js classes once this is widely available. Currently supported in Chrome 120, Firefox 119, Safari 17. Tweet…",
  "link": "/blog.master.dev/media-scripting-enabled.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Firefox Goes CSS Modules",
  "desc": "Firefox 147 just came out, and the flagship developer feature is clearly anchor positioning support, bringing that ”to the baseline” as we're supposed to say these days. That rules, but I'm also very hyped about CSS module scripts. Remember, they are a way of importing a stylesheet in JavaScript, that is, the only decent way…",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/firefox-goes-css-modules.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
