---
lang: en-GB
title: "The Static Site Churns!"
description: "Article(s) > The Static Site Churns!"
icon: iconfont icon-hono
category:
  - Node.js
  - Hono
  - Article(s)
tag:
  - blog
  - dbushell.com
  - node
  - nodejs
  - node-js
  - hono
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Static Site Churns!"
    - property: og:description
      content: "The Static Site Churns!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/the-static-site-churns.html
prev: /programming/js-hono/articles/README.md
date: 2025-05-11
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-05-11-the-static-site-churns.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hono > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-hono/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Static Site Churns!"
  desc="The one where I rebuild my website again and again and again…"
  url="https://dbushell.com/2025/05/11/the-static-site-churns/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-05-11-the-static-site-churns.png"/>

I often refer to my scuffed static site generator but what is it?

It’s a hodgepodge of scripts honed over years, or pilfered from GitHub last week, that glue together my website. As of this weekend it now includes [<VPIcon icon="iconfont icon-hono"/>Hono](https://hono.dev/) too.

Yeah, I refactored again 😔 The self-inflicted JavaScript churn continues! Previously I achieved [**super fast builds**](/dbushell.com/super-fast-builds.md) using my own experimental [**just-in-time Svelte**](/dbushell.com/just-in-time-javascript.md) templates and [<VPIcon icon="iconfont icon-forgejo"/>URL pattern router](https://git.dbushell.com/dbushell/velocirouter). I then went down the [**HTML parsing**](/dbushell.com/html-parser-conundrum.md) and [**markdown rendering**](/dbushell.com/hmmarkdown.md) rabbit hole. Eventually I coded [<VPIcon icon="fas fa-globe"/>my own libraries](https://dbushell.com/notes/2024-10-18T12:29Z/) for both.

I could just use [<VPIcon icon="fas fa-globe"/>11ty](https://11ty.dev/) or [<VPIcon icon="iconfont icon-astro"/>Astro](https://astro.build/) but where’s the fun in that?

::: warning ⚠️ Disclaimer

This is my *personal website*. I do not write such ludicrous and convoluted code elsewhere (mostwhere). Much of my day work is good ol’ [<VPIcon icon="fa-brands fa-wikipedia-w"/>LAMP stack](https://en.wikipedia.org/wiki/LAMP_(software_bundle))[^1].

:::

---

## From markdown to markup

My website starts life as a humble collection of [<VPIcon icon="fas fa-globe"/>markdown](https://daringfireball.net/projects/markdown/)[^2] files with [<VPIcon icon="fas fa-globe"/>front matter](https://jekyllrb.com/docs/front-matter/). These get parsed into [<VPIcon icon="iconfont icon-json"/>JSON](https://json.org/)[^3] with the main body converted to HTML. That process takes around a second. Most of that time is [**syntax highlighting**](/dbushell.com/better-syntax-highlighting.md). I call the output the “manifest”.

Hono matches requests against patterns like my blog:

```js
const pattern = "/:year{\\d+}/:month{\\d+}/:day{\\d+}/:slug/";
```

That particular structure is a [<VPIcon icon="fas fa-globe"/>relic of WordPress](https://dbushell.com/notes/2025-02-24T06:48Z/).

Hono consults the manifest for content. It calls my [<VPIcon icon="iconfont icon-forgejo"/>Hypermore](https://git.dbushell.com/dbushell/hyperspace/src/branch/main/hypermore) template engine to render a HTML document. This runs as a live web server “in development” aka Dev Mode™. For that I still use [<VPIcon icon="fas fa-globe"/>Deno](https://dbushell.com/2025/04/28/denos-decline)
<!-- TODO: /dbushell.com/denos-decline.md --> but with Hono my runtime dependency is reducing.

To generate a static build I iterate over the manifest and `fetch` each page writing it back to disk. The build process takes around four seconds. Disk I/O is the bottleneck. There is a [<VPIcon icon="iconfont icon-hono"/>Hono SSG helper](https://hono.dev/docs/helpers/ssg) but I prefer full control.

I have another script to [**generate open graph images**](/dbushell.com/generate-open-graph-images-with-playwright.md). Another script to [**generate a static search index**](/dbushell.com/static-search-page-find.md). That last link is already outdated. I’ve since written my own [<VPIcon icon="iconfont icon-zig"/>Zig](https://ziglang.org/)[^4]and [<VPIcon icon="iconfont icon-wasm"/>WebAssembly](https://webassembly.org/)[^5] search index (I’m still drafting the blog post).

---

## Deployment

After moving to [**Bunny CDN**](/dbushell.com/bunny-cdn-edge-storage.md)[^6] I no longer use a GitHub Action for deployment. I hacked together yet another script to “rawdog” their API, so to speak, that compares SHA-256 checksums and uploads or deletes files as necessary to sync my local build. This negates my [**self-hosted action idea**](/dbushell.com/self-hosted-update-spring-2025.md#website-deployment) to the delight of my weekends.

---

## Is it ever done?

My static site generator has seen countless iterations [**since 2014**](/dbushell.com/how-i-built-a-static-site-generator.md). Not to mention the [**redesigns**](/dbushell.com/blog-redesign.md) that give me an excuse. Wait, what year is it now? Good lord, that’s over a decade!

I just like fooling around with JavaScript and recently, Zig. Every [**new addition**](/dbushell.com/glossary-web-component.md) improves my website and teaches me a new trick (for better, [<VPIcon icon="fas fa-globe"/>or worse](https://dbushell.com/notes/2025-05-08T13:12Z/)). Switching to Hono forced me to clean up my codebase. I’m [<VPIcon icon="fas fa-globe"/>technical debt](https://24ways.org/2016/we-need-to-talk-about-technical-debt/) free! For now, [Zine (<VPIcon icon="iconfont icon-github"/>`kristoff-it/zine`)](https://github.com/kristoff-it/zine) is giving me ideas…

[<VPIcon icon="iconfont icon-forgejo"/>Code’s in Git](https://git.dbushell.com/) if you can make sense of it. It won’t run for you. The data submodule is private to protect against LLMs. Images are in private [**large file storage**](/dbushell.com/git-granary.md) too.

[^1]: Linux, Apache, MySQL, and PHP. The way websites were meant to be served until we ruined it.
[^2]: A ~~simple~~ plain text markup language created by John Gruber and bastardised by everyone else. Designed for writers who enjoy teeny-weeny font sizes.
[^3]: JavaScript Object Notation. An almost perfect specification. If only they’d allowed trailing commas.
[^4]: A low-level programming language with no hidden control flow and no hidden memory allocations.
[^5]: Low-level machine code for web browsers. Wasm binary instructions are run in a virtual machine.
[^6]: A global content delivery network based in the EU. Ideal for hosting static websites if you find Cloudflare too passé.

::: info Sources on 'LAMP'(1)

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://en.wikipedia.org/wiki/LAMP_(software_bundle) "LAMP (software bundle)")

:::

::: info Sources on 'Markdown'(2)

```component VPCard
{
  "title": "Daring Fireball: Markdown",
  "desc": "Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML.",
  "link": "https://daringfireball.net/projects/markdown/",
  "logo": "https://daringfireball.net/favicon.ico",
  "background": "rgba(74,82,90,0.2)"
}
```

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

::: info Sources on 'JSON'(3)

```component VPCard
{
  "title": "JSON",
  "desc": "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.",
  "link": "https://json.org/json-en.html/",
  "logo": "https://json.org/favicon.png",
  "background": "rgba(250,240,230,0.2)"
}
```

:::

::: info Sources on 'Zig'

```component VPCard
{
  "title": "Home ⚡ Zig Programming Language",
  "desc": "Zig is a general-purpose programming language and toolchain for maintaining robust, optimal and reusable software.",
  "link": "https://ziglang.org",
  "logo": "https://ziglang.org/favicon.svg",
  "background": "rgba(247,164,29,0.2)"
}
```

<SiteInfo
  name="Ziggit - A Zig community"
  desc="A community for anyone interested in the Zig Programming Language."
  url="https://ziggit.dev/"
  logo="https://ziggit.dev/uploads/default/optimized/1X/3417db0e8abaf83a355700b91efd528025492487_2_32x32.png"
  preview="https://ziggit.dev/uploads/default/original/1X/3417db0e8abaf83a355700b91efd528025492487.png"/>

<SiteInfo
  name="Welcome | zig.guide"
  desc="Get started with the Zig programming language. Zig is a general-purpose programming language and toolchain for maintaining robust, optimal, and reusable software."
  url="https://zig.guide/"
  logo="https://zig.guide/img/favicon.ico"
  preview="https://zig.guide/img/docusaurus-social-card.jpg"/>

```component VPCard
{
  "title": "Learning Zig",
  "desc": "Welcome to Learning Zig, an introduction to the Zig programming language. This guide aims to make you comfortable with Zig. It assumes prior programming experience, though not in any particular language.",
  "link": "https://openmymind.net/learning_zig/",
  "logo": "https://openmymind.net/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

<SiteInfo
  name="Programming with Zig: From Basics to Mastery"
  desc="Table of Contents 1. Introduction to Zig: History, Philosophy, and Getting Started  The origins of Zig Core design principles Comparison with other languages (C"
  url="https://gencmurat.com/en/pages/programming-with-zig//"
  logo="https://gencmurat.com/logo.svg"
  preview="https://gencmurat.com/icon512.png"/>

```component VPCard
{
  "title": "Introduction to Zig",
  "desc": "Welcome! This is the initial page for the “Open Access” HTML version of the book “Introduction to Zig: a project-based book”, written by Pedro Duarte Faria. This is an open book that provides an introduction to the Zig programming language, which is a new general-purpose, and low-level language for building robust and optimal software.",
  "link": "https://pedropark99.github.io/zig-book/",
  "logo": "https://pedropark99.github.io/favicon.ico",
  "background": "rgba(79,115,232,0.2)"
}
```

```component VPCard
{
  "title": "Zig Cookbook",
  "desc": "Zig cookbook is a collection of simple Zig programs that demonstrate good practices to accomplish common programming tasks.",
  "link": "https://cookbook.ziglang.cc/",
  "logo": "https://cookbook.ziglang.cc/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

::: info Sources on 'WebAssembly (Wasm)'

<SiteInfo
  name="WebAssembly"
  desc="WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications."
  url="https://webassembly.org/"
  logo="https://webassembly.org/favicon.ico"
  preview="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwebassembly.org%2F/opengraph/"/>

<SiteInfo
  name="WebAssembly | MDN"
  desc="WebAssembly is a type of code that can be run in modern web browsers. It is a low-level assembly-like language with a compact binary format that runs with near-native performance and provides languages such as C/C++, C# and Rust with a compilation target so that they can run on the web."
  url="https://developer.mozilla.org/en-US/docs/WebAssembly/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

::: info Sources on 'Bunny'

[Bunny CDN 🐇 (Migrating from Cloudflare)](/dbushell.com/bunny-cdn-edge-storage.md)

<SiteInfo
  name="bunny.net - The Global Edge Platform that truly Hops"
  desc="Hop on bunny.net and speed up your web presence with the next-generation Content Delivery Service (CDN), Edge Storage, and Optimization Services at any scale."
  url="https://bunny.net/"
  logo="https://bunny.net/favicon-32x32.png?v=1ca91ab4134c7fdacfd5e433633a1572"
  preview="https://bunny.net/images24/Making-the-internet-hop-faster.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Static Site Churns!",
  "desc": "The one where I rebuild my website again and again and again…",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/the-static-site-churns.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
