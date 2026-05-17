---
lang: en-GB
title: "Static Search with Pagefind"
description: "Article(s) > Static Search with Pagefind"
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
      content: "Article(s) > Static Search with Pagefind"
    - property: og:description
      content: "Static Search with Pagefind"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/static-search-page-find.html
prev: /programming/js/articles/README.md
date: 2024-11-21
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-11-21-static-search-page-find.png
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
  name="Static Search with Pagefind"
  desc="The one where my blog gets a search index"
  url="https://dbushell.com/2024/11/21/static-search-page-find/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-11-21-static-search-page-find.png"/>

My website has been static since — *checks new search index* — at least [**July 2014!**](/dbushell.com/how-i-built-a-static-site-generator.md) I’ve gone through so many static site generators and custom build scripts I’ve lost track. In that time I’ve amassed quite a big [<VPIcon icon="fas fa-globe"/>blog](https://dbushell.com/blog/). Finding old articles has become harder than it should be. I need search.

---

## Finding Pagefind

Because my website is “serverless”[^1] I have to implement client-side search. That means JavaScript. That means probably not a database and certainly not a multi-megabyte index of any kind. I could easily roll my own fuzzy JavaScript search but I can’t ship all the content required to the front-end.

[^1]: “Serverless” is such a dumb word.

First I found [<VPIcon icon="iconfont icon-github"/>`tinysearch/tinysearch`](https://github.com/tinysearch/tinysearch) which is a Rust app that compiles WASM. I tested it on my blog content and it generated an impressively small payload. The downside is that Tinysearch is limited to entire words. A search for “rasp” will not match “Raspberry”.

I asked around on social media and [<VPIcon icon="fas fa-globe"/>Dan Burzo](https://danburzo.ro/) was the first to suggest [<VPIcon icon="iconfont icon-github"/>`cloudcannon/pagefind`](https://github.com/cloudcannon/pagefind). Pagefind also involves Rust & WASM and works with any static build output. For my website I’m restricting it to my blog with `--glob` config.

```sh
npx pagefind --site "build" --glob "<[0-9]:4>/**/*.html" --root-selector "main"
```

I also configured the root selector to only index content inside a `<main>` element.

---

## Fallback

[<VPIcon icon="fas fa-globe"/>Paul Robert Lloyd](https://paulrobertlloyd.com/) suggested the clever fallback of directing the form `action` to a privacy respecting search engine. This is done by coding the search form something like:

```html
<form role="search" action="https://duckduckgo.com" method="GET">
  <label for="search-for">Search for</label>
  <input id="search-for" type="search" name="q">
  <input type="hidden" name="sites" value="dbushell.com">
  <button type="submit">Search</button>
</form>
```

If progressive enhancement fails — there are [<VPIcon icon="fas fa-globe"/>many reasons why](https://dbushell.com/notes/2024-08-01T16:27Z/) — the form is still functional. The trick is the hidden input named `sites` which allows us to restrict the **DuckDuckGo** query to a specific domain. I’m not aware of other search engines that support such a query parameter.

In my final code I’ve opted to wrap my `<form>` and results in [<VPIcon icon="fa-brands fa-firefox"/>`<search>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search) which negates the need for `role="search"`. I also wrapped the `<search>` in a `<search-form>` custom element.

---

## Web Component

At this stage I found **Zach Leatherman** had already built a [<VPIcon icon="fas fa-globe"/>Pagefind Search Web Component](https://zachleat.com/web/pagefind-search/). Pagefind comes with a default UI and Zach’s component uses this for a drop-in search feature. It doesn’t get much easier!

I’m using [<VPIcon icon="fas fa-globe"/>Pagefind’s search API](https://pagefind.app/docs/search-config/) to generate custom UI. In my custom element callback I defer the Pagefind setup until after the search input is first focused:

```js
connectedCallback() {
  const input = this.querySelector("input[type='search']");
  input.addEventListener("focus", () => {
    /* Setup Pagefind... */
  }, { once: true });
}
```

This prevents around 100 KBs from the initial page load that may never be downloaded.

I’ve merged my new search feature into my existing latest blog posts in the sidebar (footer on mobile). It’s not a prominent feature. If I ever redesign my website I’ll make more effort. Search results replace the latest posts or vice versa if the search is empty.

This is how it looks in action:

![screenshot of my website search with results for 'rasp' (Raspberry Pi)](https://dbushell.com/images/blog/2024/dbushell-search.avif)

That’s if it’s working. I’m still messing around. It will be a little unstable for a while! I haven’t tweaked any Pagefind options yet. The default sorting algorithm seems good enough.

Anyway, thanks to everyone who recommended [<VPIcon icon="iconfont icon-github"/>`cloudcannon/pagefind`](https://github.com/cloudcannon/pagefind). It only takes a second to generate a new static index so I can append that to my build script. I’ve yet to tidy up the technical debt from my [**build script addition**](/dbushell.com/generate-open-graph-images-with-playwright.md) last week 😬. I’ve been working on some pre-deployment tests but those are run manually for now.

::: note Immediate update

[<VPIcon icon="fa-brands fa-firefox"/>as prophesied](https://dbushell.com/notes/2024-08-01T16:27Z/) my progressive enhancement failed! It should be fixed now. My content security policy header required the [<VPIcon icon="fa-brands fa-firefox"/>`wasm-unsafe-eval`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_webassembly_execution) directive. Without this *“WebAssembly is blocked from loading and executing on the page”*.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Static Search with Pagefind",
  "desc": "The one where my blog gets a search index",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/static-search-page-find.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
