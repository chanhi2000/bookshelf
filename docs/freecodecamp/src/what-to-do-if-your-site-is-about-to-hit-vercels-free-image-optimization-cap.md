---
lang: en-US
title: "What to Do if Your Site Is About to Hit Vercel's Free Image Optimization Cap"
description: "Article(s) > What to Do if Your Site Is About to Hit Vercel's Free Image Optimization Cap"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What to Do if Your Site Is About to Hit Vercel's Free Image Optimization Cap"
    - property: og:description
      content: "What to Do if Your Site Is About to Hit Vercel's Free Image Optimization Cap"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-to-do-if-your-site-is-about-to-hit-vercels-free-image-optimization-cap.html
prev: /programming/js-next/articles/README.md
date: 2026-08-19
isOriginal: false
author:
  - name: Md. Fahim Bin Amin
    url: https://freecodecamp.org/news/author/FahimFBA/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/58b79fa2-e0a0-4172-b07f-e3446413eca8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What to Do if Your Site Is About to Hit Vercel's Free Image Optimization Cap"
  desc="I maintain my own website, and every now and then I upgrade the site to a new version. And I frequently experiment with different technologies and architectures while doing so. Recently, I faced an is"
  url="https://freecodecamp.org/news/what-to-do-if-your-site-is-about-to-hit-vercels-free-image-optimization-cap"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/58b79fa2-e0a0-4172-b07f-e3446413eca8.png"/>

I maintain my own website, and every now and then I upgrade the site to a new version. And I frequently experiment with different technologies and architectures while doing so.

Recently, I faced an issue where Vercel was giving me a warning that I was almost reaching my free tier limit on "Image Optimization - Transformation". After a few trials and errors, I managed to fix that so that it doesn't exceed my free tier unnecessarily.

In this article, I'll explain what the issues were, how I pinpointed the exact cause, and what options I had for resolving them. I'll also walk you through the approach I ultimately chose and how I managed to fix the problem.

::: important So What Was the Problem?

My current website is running on version 5 (Year 2026), which uses a CDN from Cloudflare R2 Object Storage. It also has massive SEO optimization for both web search and AI search.

:::

::: note

You can check out the website directly here: [<VPIcon icon="fas fa-globe"/>fahimbinamin.com](https://fahimbinamin.com). I'm not sure which version you'll be able to see in the domain when you're visiting the website, but it'll always be the latest version.

![Fahim's Website (5th version)](https://cdn.hashnode.com/uploads/covers/60752ce9308cd51e1477fe19/6a478190-2df6-4138-b740-e0331833c0db.png)

:::

As version 5 of my website is a multi-page website, I tried to include everything about me under one platform. I have a lot of writing published in multiple places, and I wanted to add all of the articles under the same platform. But I also wanted to make sure that their canonical URLs worked well. This would help the AI crawler/bot understand the original published URL/source. So I incorporated this feature in the 5th version of my website.

This website uses Next.js and Next's image optimization protocol properly. Currently, the codebase is closed source and you won't be able to access it anywhere. But I've shared a screenshot so that you can have a glimpse of how it looks now.

![Fahim's website's (5th version) codebase on GitHub (Closed Source)](https://cdn.hashnode.com/uploads/covers/60752ce9308cd51e1477fe19/5fbedbc8-a5a1-4d84-8eb2-90efc8b81aeb.png)

Anyway, to save money, I like to utilize free resources as effectively as possible. For the CDN, I'm using Cloudflare with R2 object storage. All the media you see on my website (images, PDFs, and so on) comes from Cloudflare R2 object storage. It's running via Vercel.

Everything was going smoothly until yesterday, when I noticed an email from Vercel stating that I was approaching my free tier limit for image optimization.

![Warning about Image Optimization](https://cdn.hashnode.com/uploads/covers/60752ce9308cd51e1477fe19/c777113f-a8a5-41b5-a696-82f7d8ab2e37.png)

I opened the usage panel expecting to see my own project images: profile photos, project screenshots, and gallery frames. Instead, almost every source image listed was hosted on [<VPIcon icon="fa-brands fa-free-code-camp"/>`freecodecamp.org`](http://freecodecamp.org).

This was confusing for a few seconds because I don't host my images on freeCodeCamp. Then I remembered that I actually link to them!

---

## Where These Images Actually Come From

I have cross-posted a lot of my writing to freeCodeCamp over the years. When I backfilled my articles into this site's blog archive, I kept the article bodies intact, including the `<img>` tags pointing at freeCodeCamp's and Hashnode's CDNs (as those were the places where the screenshots had always lived).

The blog renderer wraps every inline image in a `BlogImage` component:

```js
import Image from "next/image";
 
export default function BlogImage({ src, alt, caption }) {
  return (
    <figure>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 768px" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
```

`next/image` actually doesn't care whether the `src` points at your own domain or someone else's. As long as the host is listed in `images.remotePatterns` in <VPIcon icon="fa-brands fa-js"/>`next.config.ts`, Next.js will run it through Vercel's Image Optimization pipeline in this step, including fetching the original, resizing it for every breakpoint, re-encoding to AVIF/WebP, and caching the result.

I had added `cdn-media-0.freecodecamp.org`, `www.freecodecamp.org`, and `cdn.hashnode.com` to that allowlist months ago in two separate commits. I did that specifically so those backfilled images would render instead of breaking.

That actually worked for me in this case. But it also meant that every one of those images (and every responsive size Next.js generated from each one) counted against my Vercel account's free-tier Image Optimization quota. I don't want my quota to be spent carelessly, since it resets monthly and I don't control how many times a crawler or a page load re-triggers a size variant.

---

## Confirming the Scope

Before fixing anything, I wanted real numbers instead of a guess. I grepped every post in `content/posts/*.mdx` for `src="..."` attributes pointing at the three external hosts:

```js
src="(https://(?:cdn-media-0.freecodecamp.org|www.freecodecamp.org|cdn.hashnode.com)[^"]*)"
```

That turned up 691 image references across 33 posts: old screenshots from tutorials going back to 2021, everything from disk-partitioning walkthroughs to CUDA setup guides. All of it was being optimized on someone else's dime (mine) instead of being cached once and served flat. That's what was causing the issue earlier.

When I was looking for solutions, I found two ways that could instantly help me fix the issue quickly.

---

## Two Ways to Fix This Issue

**Option 1: Stop optimizing them.** Pass `unoptimized` to `next/image` for any source that isn't my own CDN. Vercel stops touching those requests entirely.

In that case, the browser fetches the image straight from freeCodeCamp, and there's no resizing or AVIF conversion, and zero quota impact. This means that it will be just a small diff that can be done in minutes.

**Option 2: Own the images.** Download all 691, re-host them on the Cloudflare R2 bucket I already use for every other image on the site, rewrite the `src` attributes to point at `cdn.fahimbinamin.com`, and drop the three external hosts from `remotePatterns` entirely.

---

## Which Solution I Chose

Option 1 was tempting for how little needed to be touched. But it meant permanently giving up responsive sizing and modern formats for a third of my blog archive, and it left the site depending on freeCodeCamp's CDN staying up and those specific URLs never changing.

Option 2 costs more up front but matches how every other image on the site already works. It also keeps the optimization benefit and removes the external dependency completely. So I went with Option 2. ---

## Doing the Migration

### Step 1: Download Everything

I wrote a small Node script that walked every post, matched the same three-host regex, and pulled down each unique URL:

```js
const HOST_RE =
  /src="(https:\/\/(?:cdn-media-0.freecodecamp.org|www.freecodecamp.org|cdn.hashnode.com)[^"]*)"/g;
 
// ...for each match, download to downloaded-images/<slug>/<filename>
// and record oldUrl -> "images/writing/<slug>/<filename>" in url-map.json
```

Files were organized by post slug specifically to avoid collisions, since a lot of these screenshots share generic names like <VPIcon icon="fas fa-file-image"/>`2022-01-20_18-50.png` across completely different tutorials. Lastly, it was a total of 691 downloads with 0 failures, about 105 MB in total.

### Step 2: Upload to R2

I restructured the download folder to mirror the target key prefix (`images/writing/<slug>/...`) and uploaded it to the bucket using [<VPIcon icon="fas fa-globe"/>CS Browser](https://s3browser.com/). R2 exposes an S3-compatible API and a GUI client handles hundreds of nested files more reliably than dragging a folder through the dashboard.

### Step 3: Verify Before Touching content

Before rewriting anything, I spot-checked a couple of the newly uploaded URLs:

```sh
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://cdn.fahimbinamin.com/images/writing/automount-a-storage-partition-on-startup-in-linux/HDD-Partition.png"
# 200
```

### Step 4: Rewrite the MDX

A second script read `url-map.json` and replaced every matching `src="..."` in `content/posts/*.mdx` with the equivalent `cdn.fahimbinamin.com` URL:

```js
content = content.replace(HOST_RE, (match, url) => {
  const entry = urlMap[url];
  if (!entry) return match; // left untouched, logged for review
  return `src="${CDN_BASE}/${entry.cdnPath}"`;
});
```

After the testing, I found out that a total of 33 files changed, 692 replacements (one image was referenced twice in the same post), and 0 were left unmapped.

### Step 5: Clean Up the Config

With no more `<Image>` references to the external hosts, I removed all three from `images.remotePatterns` in `next.config.ts`:

```js
// Removed, no longer needed
{ protocol: "https", hostname: "cdn.hashnode.com", pathname: "/**" },
{ protocol: "https", hostname: "cdn-media-0.freecodecamp.org", pathname: "/**" },
{ protocol: "https", hostname: "www.freecodecamp.org", pathname: "/**" },
```

I ran a full production build afterward. All 43+ blog posts pre-rendered clean, lint passed, and nothing was broken.

---

## Why This Is the Better Fix Long-Term

The quota problem was really a symptom of a smaller mistake: treating a third-party CDN as if it were infrastructure that I controlled. It rendered fine for months, right up until usage crossed a threshold I wasn't watching closely enough.

`unoptimized` would have made the warning go away without addressing the issue. But I would have kept depending on freeCodeCamp's URLs staying valid indefinitely, with no optimization to show for it either.

Self-hosting means that every image on this site now goes through the same pipeline, and uses the cache rules and CDN, regardless of where the content originally lived. I didn't want anything that could silently break because someone else changed a URL structure.

---

## What I Will Do Differently Next Time

The two `remotePatterns` entries for freeCodeCamp and Hashnode were each added months apart, each time because a backfilled post's images were broken and adding the host was the fastest fix.

I never asked myself before, "should this actually be hosted here, or should it live on my own CDN from day one?" That question is cheap to ask before backfilling content and expensive to answer after 691 images and 33 posts are already live pointing outward.

I've written that rule down now, so future backfills download and re-host before a single `<img>` tag ever points off-domain.

---

## Conclusion

Thank you so much for reading all the way through. I hope that this article will help you if you face the same issue in the future.

::: info About Author

To get more content like this, you can follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`fahimfba`)](https://linkedin.com/in/fahimfba/) and [X (<VPIcon icon="fa-brands fa-x-twitter"/>`Fahim_FBA`)](https://x.com/Fahim_FBA). You can also check [<VPIcon icon="fas fa-globe"/>my website](https://fahimbinamin.com/) and follow me on [GitHub (<VPIcon icon="iconfont icon-github"/>`FahimFBA`)](https://github.com/FahimFBA) if you're into open source and development. If you like to watch programming and technology-related videos, then you can [subscribe to my YouTube channel (<VPIcon icon="fa-brands fa-youtube"/>`@FahimAmin`)](https://youtube.com/@FahimAmin) as well.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What to Do if Your Site Is About to Hit Vercel's Free Image Optimization Cap",
  "desc": "I maintain my own website, and every now and then I upgrade the site to a new version. And I frequently experiment with different technologies and architectures while doing so. Recently, I faced an is",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-to-do-if-your-site-is-about-to-hit-vercels-free-image-optimization-cap.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
