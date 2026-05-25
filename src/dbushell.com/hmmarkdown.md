---
lang: en-GB
title: "Hmmarkdown"
description: "Article(s) > Hmmarkdown"
icon: fa-brands fa-markdown
category:
  - Markdown
  - Article(s)
tag:
  - blog
  - dbushell.com
  - md
  - markdown
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Hmmarkdown"
    - property: og:description
      content: "Hmmarkdown"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/hmmarkdown.html
prev: /programming/md/articles/README.md
date: 2024-09-01
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-09-01-hmmarkdown.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Markdown > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/md/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Hmmarkdown"
  desc="The one where I parse and render Markdown myself"
  url="https://dbushell.com/2024/09/01/hmmarkdown/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-09-01-hmmarkdown.png"/>

I rolled my own *Markdown* library!

It’s called [<VPIcon icon="iconfont icon-forgejo"/>Hmmarkdown](https://git.dbushell.com/dbushell/hmmarkdown) on GitHub. It’s published on both [<VPIcon icon="iconfont icon-jsr"/>JSR](https://jsr.io/@dbushell/hmmarkdown) and [NPM (<VPIcon icon="fa-brands fa-npm"/>`@dbushell/hmmarkdown`)](https://npmjs.com/package/@dbushell/hmmarkdown) too. I’m testing in production on my own website! That might be a mistake but it’s too late now.

::: note ⚠️ Work in progress! ⚠️

Hmmarkdown is bad code and full of bugs. Okay, well it does *work*, but with limitations. Some of those limitations are by design!

:::

---

## Backstory

I’ve long used [Marked (<VPIcon icon="iconfont icon-github"/>`markedjs/marked`)](https://github.com/markedjs/marked) which is a perfectly cromulent choice. Marked has active development and plenty of plugins. It gets the job done.

Why change? I wanted:

- A challenge
- More control over HTML

Most Markdown parsers give up when they find HTML. I created Hmmarkdown to better handle scenarios where I want HTML in my Markdown.

For example Hmmarkdown transforms this:

```html
<aside class="Box">
  This is a **boxed** paragraph.
</aside>
```

Into this:

```html{2}
<aside class="Box">
  <p>This is a <strong>boxed</strong> paragraph.</p>
</aside>
```

Which looks like this:

```md
This is a **boxed** paragraph.
```

Marked couldn’t handle this without a bespoke and hacky extension.

Hmmarkdown is HTML-aware. When it finds HTML it creates a lightweight node tree to isolate text content and apply inline Markdown filters. This works regardless of node depth. Only **inline** Markdown is supported *inside HTML* for now. Block Markdown is trickier because I’ll need to track indentation and do some recursive magic. That’s the end goal for “v1.0”.

First I’m considering a major refactor. I’ve hit a bit of a technical wall and probably over-engineered it. I have a better approach I want to try.

---

## Markdown Specification

As [<VPIcon icon="fas fa-globe"/>CommonMark](https://commonmark.org/#why) says:

::: info CommonMark (<VPIcon icon="fas fa-globe"/><code>commonmark.org</code>)

> John Gruber’s [<VPIcon icon="fas fa-globe"/>canonical description of Markdown’s syntax](https://daringfireball.net/projects/markdown/syntax) does not specify the syntax unambiguously.

```component VPCard
{
  "title": "CommonMark",
  "desc": "John Gruber’s canonical description of Markdown’s syntax does not specify the syntax unambiguously. In the absence of a spec, early implementers consulted the original Markdown.pl code to resolve these ambiguities...",
  "link": "https://commonmark.org/#why",
  "logo": "https://commonmark.org/images/markdown-mark-apple-touch.png",
  "background": "rgba(51,195,240,0.2)"
}
```

:::

Attempts to standardise Markdown are insane. Just look at the [<VPIcon icon="iconfont icon-github"/>GitHub Flavored Markdown Spec](https://github.github.com/gfm/) which attempts to support every variation imaginable. No way I’m parsing that. My syntax support for top-level blocks is extremely strict. See the [<VPIcon icon="iconfont icon-forgejo"/>README documentation](https://git.dbushell.com/dbushell/hmmarkdown).

Hmmarkdown is so strict and unforgiving I’ve spent the last two week correcting errors on my blog. I have no plans to add support for anything beyond basic Markdown. Extended syntax for tables is wild, for example. It’s easier to just write HTML in my opinion. That’s why I created Hmmarkdown. I can break out the HTML and mix-n-match.

---

## Is it Fast?

I benchmarked a few micro-optimisations like checking if a string begins with a specific character before matching:

```js
if (line[0] !== '#') return false;
const match = line.match(/^(#{1,6})\s+/);
```

I stopped optimising when I realised speed was a non-issue.

Every JavaScript library claims to be the “fastest ever”. The truth with Markdown is that most competent parsers are already as fast as JavaScript allows. The bottleneck becomes I/O and CPU & memory limits. Rendering the ~400 pages on my website takes under *two seconds* and 90% of that time is waiting for [<VPIcon icon="fas fa-globe"/>Shiki](https://shiki.style/) syntax highlighting. It’s milliseconds or less per file. If that’s too slow stop using JavaScript!

---

## Work in Progress

[<VPIcon icon="iconfont icon-forgejo"/>Hmmarkdown](https://git.dbushell.com/dbushell/hmmarkdown) is early stage development and not the prettiest code. I will be extending the Markdown syntax support and there will be one or two refactors along the way. It will always be an opinionated library made for my use case; this blog. It’s open source and MIT licensed so anyone is welcome to try it. It should work in all JavaScript runtimes.

::: note Update for 22 Jan 2026

[**Hmmarkdown 2**](/dbushell.com/hmmarkdown2.md) is now a thing! I coded a new tokenizer.

```component VPCard
{
  "title": "Hmmarkdown 2",
  "desc": "The one where I parse and render Markdown (again)",
  "link": "/dbushell.com/hmmarkdown2.md",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Hmmarkdown",
  "desc": "The one where I parse and render Markdown myself",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/hmmarkdown.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
