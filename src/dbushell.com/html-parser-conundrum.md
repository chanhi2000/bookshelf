---
lang: en-GB
title: "An Interesting HTML Parser Conundrum"
description: "Article(s) > An Interesting HTML Parser Conundrum"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - dbushell.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An Interesting HTML Parser Conundrum"
    - property: og:description
      content: "An Interesting HTML Parser Conundrum"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/html-parser-conundrum.html
prev: /programming/js/articles/README.md
date: 2024-10-01
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-10-01-html-parser-conundrum.png
---

# {{ $frontmatter.title }} 관련

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
  name="An Interesting HTML Parser Conundrum"
  desc="The one where I discover an interesting HTML parser conundrum"
  url="https://dbushell.com/2024/10/01/html-parser-conundrum/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-10-01-html-parser-conundrum.png"/>

Despite better judgement I decided to code a basic HTML parser. Not the [<VPIcon icon="fa-brands fa-html5"/>full HTML spec](https://html.spec.whatwg.org/multipage/parsing.html) but enough to create a tree of nodes and attributes. I’ve already written a [<VPIcon icon="iconfont icon-forgejo"/>streamable XML parser](https://git.dbushell.com/dbushell/xml-streamify) that has been working for my podcast web app.

Parsing (most) HTML isn’t as complicated as it sounds. Look for a less-than sign `<` and see if a valid tag like `<div>` follows. If that node is a [<VPIcon icon="fa-brands fa-firefox"/>void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) or self-closing element it gets appended to the current parent. If it’s an opening tag it becomes the current parent until a matching close tag is found.

There are several HTML elements that I consider opaque and will skip parsing inside.

So far that list includes:

```js
export const opaqueTags = new Set([
  'code', 'iframe', 'math', 'noscript',
  'object', 'pre', 'script', 'style',
  'svg', 'template', 'textarea'
]);
```

For these elements I just want to gather the raw text and avoid creating a node tree. This is where I became confused.

---

## The Conundrum

I started thinking about inline `<script>` and `<style>` tags. The contents of said elements are not HTML but *could* look like HTML.

What happens when I parse this inline script:

```html
<script>
  console.log('</script>');
</script>
```

Or similar:

```html
<script>
  /* </script> */
</script>
```

In these two examples the JavaScript text includes `</script>` inside a string literal and comment. How do HTML parsers know that is not real HTML? They’re not JavaScript parsers; they’re not aware of the string or comment context.

### Investigation

I tested two popular Node.js libraries: [<VPIcon icon="iconfont icon-github"/>`fb55/htmlparser2`](https://github.com/fb55/htmlparser2) and [<VPIcon icon="iconfont icon-github"/>`inikulin/parse5`](https://github.com/inikulin/parse5). Both libraries failed — at least I thought — by ending the `<script>` node early.

Nodes are created something like this:

1. `<script>` opening tag
2. `console.log('` child text node
3. `</script>` closing tag
4. `');` adjacent text node

The final `</script>` gets thrown away as a stray error.

I wasn’t satisfied! At this point I remembered that the best HTML parsers are **web browsers**, not Node packages. Surely a web browser can parse this correctly? Nope. Well… actually yes, once I realised my assumptions were wrong. Web browsers behave exactly the same.

<CodePen
  user="dbushell"
  slug-hash="wvVBLJZ"
  title="invalid markup"
  :default-tab="['css','result']"
  :theme="dark"/>

The same behaviour happens with an inline `<style>`:

```html
<style>
  /* </style> */
  html {
    background: red;
  }
</style>
```

Everything from `*/ html {` onwards is rendered as a text node and the “real” closing `</style>` tag is thrown away.

I did not expect this behaviour, but oh boy am I relieved! Can you imagine how difficult it would be to parse HTML otherwise?

My HTML parsing efforts currently reside in my [<VPIcon icon="iconfont icon-forgejo"/>Hyperless repo](https://git.dbushell.com/dbushell/hyperspace/src/branch/main/hyperless); an assortment of JavaScript + HTML experimental utilities. I’m not sure my final plans I’m just coding for fun right now. Originally I was planning to make a reference in JavaScript and then reimplement it in Rust or Zig. I just need more free time!

Update for 28 Sept 2024

Svelte maintainer [<VPIcon icon="fas fa-globe"/>Geoff Rich](https://geoffrich.net/) noted via Mastodon this was a [common reported issue (<VPIcon icon="iconfont icon-github"/>`sveltejs/svelte`)](https://github.com/sveltejs/svelte/issues/12042) for the [Svelte (<VPIcon icon="iconfont icon-github"/>`sveltejs/svelte`)](https://github.com/sveltejs/svelte) project. I probably would have blamed Svelte too!

PS, my blog post above was published on the 27th September. I dated it incorrectly, whatever, it’ll be October soon.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Interesting HTML Parser Conundrum",
  "desc": "The one where I discover an interesting HTML parser conundrum",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/html-parser-conundrum.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
