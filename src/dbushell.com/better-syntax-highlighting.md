---
lang: en-GB
title: "Better Syntax Highlighting"
description: "Article(s) > Better Syntax Highlighting"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Better Syntax Highlighting"
    - property: og:description
      content: "Better Syntax Highlighting"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/better-syntax-highlighting.html
prev: /programming/css/articles/README.md
date: 2024-03-14
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-03-14-better-syntax-highlighting.png
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
  name="Better Syntax Highlighting"
  desc="The one where I style lines of code with pretty colours"
  url="https://dbushell.com/2024/03/14/better-syntax-highlighting/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-03-14-better-syntax-highlighting.png"/>

I’ve been using [<VPIcon icon="iconfont icon-github"/>`PrismJS/prism`](https://github.com/PrismJS/prism) to highlight syntax on my blog. I achieved this with a custom plugin for [<VPIcon icon="iconfont icon-github"/>`markedjs/marked`](https://github.com/markedjs/marked). This was kinda janky for my [**server-side build process**](/dbushell.com/super-fast-builds.md). Prism is old. [Prism v2 (<VPIcon icon="iconfont icon-github"/>`orgs/PrismJS`)](https://github.com/orgs/PrismJS/discussions/3531) doesn’t seem to be happening. You’ve served me well, Prism, but it’s time to go.

I tried [<VPIcon icon="iconfont icon-github"/>`highlightjs/highlight.js`](https://github.com/highlightjs/highlight.js) writing documentation for [<VPIcon icon="iconfont icon-github"/>`dbushell/dinossr`](https://github.com/dbushell/dinossr/). It’s better, but it’s not the amazing syntax highlighter I’m after. I want something truely modern.

---

## Something Modern

I discovered [<VPIcon icon="fas fa-globe"/>Shiki](https://shiki.style/) once before but February this year saw the [v1.0.0 release (<VPIcon icon="iconfont icon-github"/>`shikijs/shiki`)](https://github.com/shikijs/shiki/releases/tag/v1.0.0) with major improvements. Shiki uses the same engine that powers VS Code. I think it might be exactly what I’m looking for. It only took an hour to retrofit Shiki into my website.

::: tabs

@tab:active Pros

- Easy to use ES module exports
- Actively maintained and improved
- More variation in syntax tokens and themes
- Documentation †

@tab Cons

- Slower startup due to WASM
- Inline styles; no classes
- Documentation †

:::

Slower I can live with. It takes under two seconds to parse all the code blocks in my 400+ articles. With Prism that was under 500ms (but it did less).

Inline styles I can’t live with.

† Superb effort on the docs but they’re missing a basic API overview; what does the module export? I find that so useful without the marketing fluff and slow hand-holding intros.

---

## Wrestling Styles

My website uses [<VPIcon icon="fa-brands fa-firefox"/>content security headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). Every inline style element or attribute requires a cryptographic hash. It’s not practical to generate CSP hashes for every attribute. I could use the `unsafe-inline` header but that defeats the purpose.

My static site is hosted on Cloudflare Pages which is [<VPIcno icon="fa-brands fa-cloudflare"/>limited to 100 headers](https://developers.cloudflare.com/pages/configuration/headers/). Even with a server-side framework, generating a unique header per blog post would be a pain with tens or potentially hundreds of hashes.

### Undeterred

My solution is to strip out inline styles after the syntax highlighter has done its job. I generate a class for each unique style starting at `syntax-0`. I then replace the style attribute with the class attribute.

Something like this:

```js
const cssMap = new Map();
const styleAttr = /style=(["'])(.*?)\1/g;

const stripStyles = (code) => {
  return code.replace(styleAttr, (...args) => {
    if (!cssMap.has(args[2])) {
      cssMap.set(args[2], `syntax-${cssMap.size}`);
    }
    return `class="${cssMap.get(args[2])}"`;
  });
};
```

This CSS map is maintained across all pages as their markdown is rendered. The end result for my blog is 18 unique classes. From that I generate a single stylesheet and CSP hash I can add to every page. It’s only 675 bytes of extra CSS.

```js
let css = [...cssMap.entries()]
  .map(([k, v]) => `.${v}{${k};}`)
  .join('');
css = `@layer syntax{${css}}`;
```

I’ve effectively generated a theme stylesheet like the other syntax highlighters use. Below is an example output I’ve formatted with whitespace:

```css
@layer syntax {
  .syntax-1 {
    color: #ff79c6;
  }
  .syntax-2 {
    color:#F8F8F2;
  }
  /* 3 through 17 skipped... */
  .syntax-18 {
    color: #ffb86c;
  }
}
```

On top of this I’ve added additional styles for:

- Line numbers
- Alternating line backgrounds
- Visible whitespace characters
- A tiny language tag

I’m only adding line numbers for 3+ lines of code. Using the `:has()` pseudo-class makes it super easy to do “quantity queries”.

```css
pre:has(:nth-child(3 of .line)) {
  /* Add line numbers with CSS counter */
}
```

Shiki is not perfect. Did you spot the highlighting mistake in the code above? Same issue appears in VS Code too because they use the same engine. I’ve noticed a lot of modern CSS syntax gets messed up, especially when nesting is involved.

Maybe if you’re reading this from the future the bug was fixed. Sorry (not sorry). Here’s a screenshot with a red squiggly:

![code with syntax highlighting error underlined](https://dbushell.com/images/blog/2024/shiki-highlight-error.avif)

code with syntax highlighting error underlined

Anyway, I think this is still a major improvement to my blog.

Maintaining accessible colour contrast is difficult with syntax highlighters. Most themes fail WCAG guidelines. I’m using “Dracula” as a base. I modified a few colours to bump contrast above the 4.5:1 ratio. Red still fails but I think it’s only used for a few rare symbols.

```js
const code = await shiki.codeToHtml(token.text, {
  lang: token.lang,
  theme: 'dracula',
  colorReplacements: {
    '#6272a4': '#a3b5eb', // Grey
    '#ff79c6': '#ff93ce', // Pink
    '#bd93f9': '#caa7ff', // Purple
  }
});
```

What do you think? [<VPIcon icon="fa-brands fa-mastodon"/>Direct opinions to Mastodon!](https://social.lol/@db/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Better Syntax Highlighting",
  "desc": "The one where I style lines of code with pretty colours",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/better-syntax-highlighting.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
