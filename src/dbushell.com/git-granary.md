---
lang: en-GB
title: "Git Granary"
description: "Article(s) > Git Granary"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Git Granary"
    - property: og:description
      content: "Git Granary"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/git-granary.html
prev: /programming/css/articles/README.md
date: 2024-07-25
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-07-25-git-granary.png
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
  name="Git Granary"
  desc="The one where I build it all myself"
  url="https://dbushell.com/2024/07/25/git-granary/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-07-25-git-granary.png"/>

::: note Captain’s log

It’s been 10 days since I entered the [**Git LFS rabbit hole**](/dbushell.com/replace-github-lfs-with-cloudflare-r2-proxy.md). Following an emergency in-prod GitHub replacement I got [<VPIcon icon="fas fa-globe"/>nerd sniped](https://xkcd.com/356/) by the [Git Large File Storage API (<VPIcon icon="iconfont icon-github"/>`git-lfs/git-lfs`)](https://github.com/git-lfs/git-lfs/blob/main/docs/api/).

---

## Git Granary

🌾 [**Git Granary** (<VPIcon icon="iconfont icon-github"/>`dbushell/granary`)](https://github.com/dbushell/granary/) is the end result. I coded my own LFS server!

I plan to self-host Granary locally alongside my [<VPIcon icon="iconfont icon-gitea"/>Gitea](https://about.gitea.com/) instance. Why not just use Gitea’s LFS? Because I honestly forgot [<VPIcon icon="iconfont icon-gitea"/>Gitea supported LFS](https://docs.gitea.com/administration/git-lfs-setup) …and that I’d configured it. It’s still sitting there empty. I may move to [<VPIcon icon="iconfont icon-forgejo"/>Forgejo](https://forgejo.org/)[^1] I need to catch up on the drama.

[^1]: Forgejo is an open source git code forge (way cooler than GitHub). I self-host my own instance.

Anyway, I’ll have separate Git and LFS servers on my local network. They’re not exposed to the internet 24/7. I will need to temporarily tunnel the LFS server when I deploy my website from the [<VPIcon icon="iconfont icon-forgejo"/>public GitHub repo](https://git.dbushell.com/). I haven’t figured that part out yet. Can I install Tailscale in an action runner?

Granary is designed for self-hosted personal use. Technically it can support multiple users but they must use the same [basic HTTP auth (<VPIcon icon="iconfont icon-github"/>`dbushell/granary`)](https://github.com/dbushell/granary/?tab=readme-ov-file#server-configuration). The only multi-user issue I see is if two users try to upload the exact same object simultaneously. In that case I’m guessing the file would be locked by the JavaScript runtime and one request would fail.

---

## Runtimes

[Granary (<VPIcon icon="iconfont icon-github"/>`dbushell/granary`)](https://github.com/dbushell/granary/) can run under [<VPIcon icon="iconfont icon-bun"/>Bun](https://bun.sh/), [<VPIcon icon="iconfont icon-deno"/>Deno](https://deno.com/), and [<VPIcon icon="fa-brands fa-node"/>Node](https://nodejs.org/). I’ve coded it with an adapter pattern to provide runtime specific filesystem API and HTTP server functionality. Bun and Node adapters are minimum viable implementations.

Deno is the primary runtime. [<VPIcon icon="iconfont icon-jsr"/>`serveFile`](https://jsr.io/@std/http/doc/~/serveFile) from the standard library does the heavy lifting for download operations. For uploads I’m using the [<VPIcon icon="iconfont icon-jsr"/>extended Web Crypto](https://jsr.io/@std/crypto) that support streaming through `digest`. This allows me to `tee` the `request.body` and stream it to disk whilst calculating the SHA-256. I found [<VPIcon icon="iconfont icon-bun"/>Bun’s file API](https://bun.sh/docs/api/file-io) to be lacking so it uses the same `node:fs` code from the Node adapter. Bun and Node don’t check the hash. That’s the main difference from Deno. They could but I’m not all that interested maintaining multiple adapters. I just wanted to prove the concept.

Each runtime uses it’s own HTTP server; `Bun.serve`, `Deno.serve`, and Node’s `createServer`. I had to fudge the Node one because it doesn’t use standard [<VPIcon icon="fa-brands fa-firefox"/>Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) objects. I borrowed from [@hono/node-server (<VPIcon icon="iconfont icon-github"/>`honojs/node-server`)](https://github.com/honojs/node-server/blob/main/src/request.ts) to polyfill `Request`. I’m not actually using [<VPIcon icon="iconfont icon-hono"/><VPIcon icon="iconfont icon-hono"/>Hono](https://hono.dev/) for routing. Simple [<VPIcon icon="fa-brands fa-firefox"/>URL pattern matching](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API) is sufficient in the root handler.

For example:

```js
async function handle(request: Request): Promise<Response> {
  const pathname = '/:repo([a-zA-Z0-9._-]+)/objects/batch';
  const batchMatch = new URLPattern({pathname}).exec(url);
  if (match) {
    const {repo} = match.pathname.groups;
    /* Do something... */
  }
}
```

Earlier this year I experimented with a [<VPIcon icon="iconfont icon-forgejo"/>request/response router](https://git.dbushell.com/dbushell/velocirouter) based on URL patterns. They’re slower than string or regular expression matching. “Slower” in the synthetic benchmark sense. Real world you wouldn’t be using JavaScript if you needed that many requests per second.

---

## Open Source

[Granary is MIT licensed (<VPIcon icon="iconfont icon-github"/>`dbushell/granary`)](https://github.com/dbushell/granary/blob/main/LICENSE) feel free to use it if you’re daring! I will be testing it myself. I don’t foresee many changes or bug fixes. The [Git LFS API (<VPIcon icon="iconfont icon-github"/>`git-lfs/git-lfs`)](https://github.com/git-lfs/git-lfs/blob/main/docs/api/) is remarkably simple.

If I don’t report back in a few months you’ll know I’ve binned it.

::: info Sources on 'Forgejo'(1)

[Forgejo](https://forgejo.org)[Codeberg](https://codeberg.org)[git.dbushell.com](https://git.dbushell.com)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Git Granary",
  "desc": "The one where I build it all myself",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/git-granary.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
