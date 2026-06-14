---
lang: en-US
title: "Prop For That"
description: "Article(s) > Prop For That"
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
      content: "Article(s) > Prop For That"
    - property: og:description
      content: "Prop For That"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/prop-for-that.html
prev: /programming/css/articles/README.md
date: 2026-06-16
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/prop-for-that-masthead.png
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
  name="Prop For That"
  desc="Props for That creates live props based things CSS can't normally see in the browser. Things like cursor position, progress values, certain form states, current time, scroll velocity."
  url="https://css-tricks.com/prop-for-that"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/prop-for-that-masthead.png"/>

No secret that Adam’s all about *props*. Dude gave us [<VPIcon icon="fas fa-globe"/>Open Props](https://open-props.style) a good while back for a slew of preconfigured variables for color, shadows, sizing, typography, among much much more. Now he’s back with Prop For That, a similar sorta idea, but mind-blowing in the sense that it creates *live* props based things CSS can’t normally see in the browser. Things like cursor position, progress values, certain form states, current time, scroll velocity — you know, the stuff that JavaScript sniffs and passes to CSS.

My understanding is that all the script-y stuff is already in the background. All that’s needed is to import the library, declare it in HTML, then style away in CSS.

Like, here’s Chris a long while back with [**custom properties registered in JavaScript to track cursor position**](/css-tricks.com/updating-a-css-variable-with-javascript.md#):

<CodePen
  user="anon"
  slug-hash="yxVQJG"
  title="Set CSS Variable with JavaScript"
  :default-tab="['css','result']"
  :theme="dark"/>

[<VPIcon icon="fas fa-globe"/>Prop For That has that nicely covered.](https://prop-for-that.netlify.app/#:~:text=Track%20the%20pointer) The difference is that we’re working with data attributes that trigger [the scripts (<VPIcon icon="iconfont icon-github"/>`argyleink/prop-for-that`)](https://github.com/argyleink/prop-for-that/blob/main/src/plugins/pointer-local.ts):

```html
<div class="mover" data-props-for="pointer">...</div>
```

And plop the relevant props into the styles:

```css
.mover {
  aspect-ratio: 1;
  width: 50px;
  background: red;
  position: absolute;
  left: calc(var(--live-pointer-x, 0) * 1px);
  top: calc(var(--live-pointer-y, 0) * 1px);
}
```

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019ed129-e979-7188-a4f1-7ee214e57365"
  title="Prop For That: Pointer"
  :default-tab="['css','result']"
  :theme="dark"/>

[<VPIcon icon="fas fa-globe"/>The demos are where it’s at.](https://prop-for-that.netlify.app/docsite/demos/pointer/) Good lord, can Adam put together some classy work.

```component VPCard
{
  "title": "prop-for-that: CSS reacts, JS just listens",
  "desc": "What JS knows, now CSS knows.",
  "link": "https://prop-for-that.netlify.app/",
  "logo": "https://prop-for-that.netlify.app/favicon.ico",
  "background": "rgba(149,149,255,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Prop For That",
  "desc": "Props for That creates live props based things CSS can't normally see in the browser. Things like cursor position, progress values, certain form states, current time, scroll velocity.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/prop-for-that.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
