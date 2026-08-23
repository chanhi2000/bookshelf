---
lang: en-US
title: "MicroLighter: Syntax Highlighter"
description: "Article(s) > MicroLighter: Syntax Highlighter"
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
      content: "Article(s) > MicroLighter: Syntax Highlighter"
    - property: og:description
      content: "MicroLighter: Syntax Highlighter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/microlighter-syntax-highlighter.html
prev: /programming/css/articles/README.md
date: 2026-08-25
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/09/custom-properties-code-block.png
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
  name="MicroLighter: Syntax Highlighter"
  desc="Syntax highlighting for code blocks without the complicated markup, spans, classes, and bloated JavaScript, courtesy of Uncle Dave."
  url="https://css-tricks.com/microlighter-syntax-highlighter"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/09/custom-properties-code-block.png"/>

Here we go! Syntax highlighting for code blocks [**without the complicated**](/css-tricks.com/code-blocks-but-better.md) markup, spans, classes, and bloated JavaScript, courtesy of Uncle Dave.

```html
<pre>
  <code class="language-javascript">const answer = 42;</code>
</pre>
```

MicroLighter is pretty much straight-up CSS leaning on Custom Highlights, using the [**`::highlight()`**](/css-tricks.com/css-custom-highlight-api-early-look.md) pseudo… which is Baseline this year!

<BaselineStatus featureid="highlight" />

It accomplishes exactly every we need around here at CSS-Tricks — themes, line numbers, multiple language support, semantic markup, etc. — but without the added dependencies we rely on.

Chris made a custom WordPress block years and years ago that plugs in [<VPIcon icon="iconfont icon-prismjs"/>Prism.js](https://prismjs.com). There’s certainly nothing wrong with Prism. It’s robust, supports a crap-ton of languages, is also super lightweight, and plenty battled-tested. Either way, I’ll certainly be looking at integrating this into our WordPress block.

It’s not that there isn’t any JavaScript involved. It’s that less of it is needed. And it leans so hard into modern CSS that it brings things like `light-dark()` support and custom properties along for the ride, meaning rolling your own theme is totally doable.

```css
--syntax-background: light-dark(#ffffff, #0d1117);
--syntax-foreground: light-dark(#24292f, #c9d1d9);
--syntax-comment: light-dark(#6e7781, #8b949e);
--syntax-keyword: light-dark(#cf222e, #ff7b72);
--syntax-operator: light-dark(#24292f, #c9d1d9);
--syntax-string: light-dark(#0a3069, #a5d6ff);
--syntax-constant: light-dark(#0550ae, #79c0ff);
--syntax-function: light-dark(#8250df, #d2a8ff);
--syntax-type: light-dark(#8250df, #d2a8ff);
--syntax-variable: light-dark(#953800, #ffa657);
--syntax-property: light-dark(#0550ae, #79c0ff);
--syntax-tag: light-dark(#116329, #7ee787);
--syntax-selector: light-dark(#8250df, #d2a8ff);
--syntax-inserted: light-dark(#116329, #7ee787);
--syntax-deleted: light-dark(#cf222e, #ff7b72);
```

Plus, it’s super modular in the sense that you can snag the things you want à la carte: specific themes, just the languages you need to support, line numbers, a web component.

```js
import "microlighter/micro-lighter-element.min.js";
```

```html
<micro-lighter language="javascript" controls="copy" line-numbers>
  <pre>
    <code>const answer = 42;</code>
  </pre>
</micro-lighter>
```

Reminds me too of [<VPIcon icon="fas fa-globe"/>this clever little web font](https://blog.glyphdrawing.club/font-with-built-in-syntax-highlighting/) that brings syntax highlighting along for the ride. I’ve been happily using that on my personal site for a while without any fuss.

::: info

```component VPCard
{
  "title": "MicroLighter - A zero-dep syntax highlighter",
  "desc": "",
  "link": "https://davatron5000.github.io/microlighter/",
  "logo": "https://davatron5000.github.io/favicon.ico",
  "background": "rgba(210,168,255,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "MicroLighter: Syntax Highlighter",
  "desc": "Syntax highlighting for code blocks without the complicated markup, spans, classes, and bloated JavaScript, courtesy of Uncle Dave.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/microlighter-syntax-highlighter.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
