---
lang: en-GB
title: "Adios Netlify!"
description: "Article(s) > Adios Netlify!"
icon: fa-brands fa-cloudflare
category:
  - DevOps
  - Netlify
  - Cloudflare
  - Article(s)
tag:
  - blog
  - dbushell.com
  - devops
  - netlify
  - cloudflare
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Adios Netlify!"
    - property: og:description
      content: "Adios Netlify!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/adios-netlify-hola-cloudflare-pages.html
prev: /devops/cloudflare/articles/README.md
date: 2023-09-26
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2023-09-26-adios-netlify-hola-cloudflare-pages.png
---

# {{ $frontmatter.title }} 

```component VPCard
{
  "title": "Netlify > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/netlify/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Adios Netlify!"
  desc="The one where I move my website from Netlify to Cloudflare pages"
  url="https://dbushell.com/2023/09/26/adios-netlify-hola-cloudflare-pages/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2023-09-26-adios-netlify-hola-cloudflare-pages.png"/>

I’m moving my website hosting from **Netlify** to [**Cloudflare Pages**](/dbushell.com/cloudflare-dns-pages-workers.md)! If you can read this I was successful. If not… oh dear!

I first tried Netlify back in January 2020. I wrote some [**first impressions**](/dbushell.com/netlify-first-impressions.md) and experimented with [**Netlify functions**](/dbushell.com/building-a-pwa-with-netlify-functions.md). I initially planned to host projects on both Netlify and Cloudflare for a few weeks before settling on one. But then three years happened and I became too lazy to move. Until now.

---

## Tipping Point

There are a few reasons to prefer Cloudflare but what pushed me was on September 1st [<VPIcon icon="iconfont icon-netlify"/>Netlify quietly deprecated their “Large Media”](https://answers.netlify.com/t/large-media-feature-deprecated-but-not-removed/100804) Git LFS service. If they sent emails I never got one. That irked me a little but I never paid them a penny so who am I to complain.

I use Git LFS for my blog images; around 50MB. GitHub now offers large file storage so I decided to move there. Having no clue how LFS works, I made a right mess trying to move files. Ultimately I had to delete the entire repo and [<VPIcon icon="iconfont icon-forgejo"/>start again](https://git.dbushell.com/). Goodbye stars, and forks — always found it odd people forked my personal blog.

---

## Builds

Another reason I ditched Netlify was builds. I found it easier to simply build locally or use a GitHub Action. Relying on Netlify just added an unnecessary step.

For this website, which is Markdown, Svelte templates, and a custom Deno build script (no fancy framework), my Netlify build times were 90% [**downloading the Deno runtime**](https://dbushell.com/2021/07/22/netlify-deno-builds)
<!-- TODO: /dbushell.com/netlify-deno-builds.md -->. Netlify still haven’t added Deno to their build image. I’m surprised considering their edge functions are backed by the Deno Deploy platform.

Anyway, even if I were to use Node it’d be quicker to build without Netlify.

---

## Functions

Earlier this year I moved away from Netlify Functions to a Cloudflare Worker to [**PGP encrypt my contact form**](/dbushell.com/pgp-email-encryption-aws-cloudflare-worker.md). Workers are much more powerful and on “the edge”. I have other workers to handle things like redirects.

---

## Cloudflare

So in the end I was no longer using any of Netlify’s features. Literally just a static host. I’ve always used Cloudflare for DNS, TLS, and caching. Since I’m now using Workers too it made perfect sense to use Cloudflare Pages for hosting.

Cloudflare custom [<VPIcon icon="fa-brands fa-cloudflare"/>404 pages](https://developers.cloudflare.com/pages/platform/serving-pages/) are basically the same as Netlify. Controlling [<VPIcon icon="fa-brands fa-cloudflare"/>HTTP headers](https://developers.cloudflare.com/pages/platform/headers/) is similar too. Although it took me several commits because I failed to read the documentation carefully. You can also use a Worker to modify headers.

I still like Netlify but for my personal requirements it doesn’t make sense. So thanks for the free hosting! I’m sure I’ll be back.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Adios Netlify!",
  "desc": "The one where I move my website from Netlify to Cloudflare pages",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/adios-netlify-hola-cloudflare-pages.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
