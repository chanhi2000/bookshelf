---
lang: en-GB
title: "REM? PX? Why not both?"
description: "Article(s) > REM? PX? Why not both?"
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
      content: "Article(s) > REM? PX? Why not both?"
    - property: og:description
      content: "REM? PX? Why not both?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/rem-or-px.html
prev: /programming/css/articles/README.md
date: 2024-11-11
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-11-11-rem-or-px.png
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
  name="REM? PX? Why not both?"
  desc="The one where I consider responsive CSS units"
  url="https://dbushell.com/2024/11/11/rem-or-px/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-11-11-rem-or-px.png"/>

Last week I refreshed my website to take advantage of [<VPIcon icon="iconfont icon-webdev"/>new baseline 2024](https://web.dev/baseline/2024) stuff ([**and one old thing**](/dbushell.com/webkit-font-smoothing.md)). Another change I made was a move from `rem` to `px` units.

[<VPIcon icon="fas fa-globe"/>I pondered this change](https://dbushell.com/notes/2024-08-02T18:25Z/) back in August. The idea being: keep `rem` for **font size** and use `px` elsewhere. This is a big change for me. I’ve dogmatically used only relative units in `rem` and previously `em` for *years*.

---

## In Practice

It’s easier to show the end result than to describe it. For most users there is no difference. In the screenshots below I’ll show my website before and after. My old CSS used `rem` units everywhere. My new CSS uses `rem` only for **font sizes** and **queries**.

### 100% zoom

At the default zoom level the before and after screenshots are almost identical. There is a minor difference in the sidebar due to unrelated changes.

![Homepage before and after at 100% default zoom](https://dbushell.com/images/blog/2024/homepage-100p.avif)

Homepage before and after at 100% default zoom

### 150% zoom

Zooming in to 150% and beyond also reveals **no material differences**. At this scale my responsive design changes to a two column layout.

![Homepage before and after at 150% zoom](https://dbushell.com/images/blog/2024/homepage-150p.avif)

Homepage before and after at 150% zoom

::: note

🔎 Browser zoom doesn’t care what units are used.

:::

### 24px base font size

In Chrome and Firefox search “font size” on the settings page. This is an accessibility preference more permanent than zoom and has a slightly different effect.

![Firefox web browser fonts setting interface](https://dbushell.com/images/blog/2024/firefox-fonts-setting.avif)

Firefox web browser fonts setting interface

Increasing the base font size **150%** — from 16px to **24px** — does reveal a difference.

![Homepage before and after with 24px base font size](https://dbushell.com/images/blog/2024/homepage-24px.avif)

Homepage before and after with 24px base font size

::: note

🔎 Notice how my new CSS allows **more content** to fit in the initial viewport. This is because only `rem` font sizes scale up. Spacing defined in `px` units remains the same.

🔎 The old CSS remains identical to the 150% zoom example.

:::

### 32px base font size

The [<VPIcon icon="iconfont icon-w3c"/>WCAG “Resize Text”](https://w3.org/WAI/WCAG22/quickref/?showtechniques=144#resize-text) guideline suggests:

> Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.

So let’s **double** the base font size to **32px**.

![Homepage before and after with 32px base font size](https://dbushell.com/images/blog/2024/homepage-32px.avif)

Homepage before and after with 32px base font size

::: note

🔎 At this scale my website adapts to a single column layout. Again, fixed vertical spacing in `px` units allows more content to be visible.

:::

---

## Pixel queries?

In the screenshots above I’m still using `rem` units for all [<VPIcon icon="fa-brands fa-firefox"/>`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) and [<VPIcon icon="fa-brands fa-firefox"/>`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) queries. Below I test only my new CSS using `px` units for all queries too.

I don’t like this effect and **chose not to implement it**.

![New homepage using pixel units for responsive queries](https://dbushell.com/images/blog/2024/homepage-px.avif)

New homepage using pixel units for responsive queries

::: note

🔎 The responsive layout no longer adapts to font size at all. The result is increasing squashed text as the base font size increases.

:::

---

## Insights

Before I discuss opinionated design let’s recap the more objective lessons:

- Browser zoom will zoom the same regardless of units
- Relative units make **zoom** and **base font size** scale the same
- Relative units allow **uniform scaling** with the base font size
- Mixed units allow **selective scaling** with the base font size
- Fixed units for **font size** break the accessibility setting

I haven’t demonstrated that last point because you should already know it. Setting font sizes in non-relative units like `px` is needlessly harmful.

---

## Opinions

Professional design usually adheres to a restricted set of sizes that follow an harmonious scale. This provides logic and reason to both the design and code. By using relative units everywhere — font sizes, spacing, and responsive queries — that scale remains uniform, regardless of zoom or base font size.

By mixing relative and non-relative units it’s still possible to have such a scale. At least at the default base font size. If the base font size increases you trade some harmony for practicality; more content remains visible. Albeit a little tighter.

For my website I’ve made the change from `rem` everywhere to:

- `rem` units for font sizes
- `rem` units for container queries
- `px` units elsewhere for borders, margins, padding, etc

The end result will look the same for most visitors. Only those that have specifically changes the default base font size will see any difference. Personally, I think the trade-off is worth it. It also makes development a tad easier because `px` values are easier to visualise than floating `rem` values.

**What do you think?** Let me know on [Mastodon (<VPIcon icon="fa-brands fa-mastodon"/>`@db`)](https://social.lol/@db) or [<VPIcon icon="fas fa-globe"/>email](https://dbushell.com/contact/).

There is one negative side effect:

### 12px base font size

So far I’ve only discussed increasing size. What if the base font size **decreases**?

![Homepage before and after with 12px base font size](https://dbushell.com/images/blog/2024/homepage-12px.avif)

Homepage before and after with 12px base font size

My old CSS effectively zooms out; everything remains uniform. My new CSS decreases font size while spacing remains larger. This results in content spread out with less content visible. This is the worst of both worlds!

I wonder, how many people browse the web with a base font size lower than the default 16px? This is not an immediate concern for me but worth noting.

I could fix this with a `min` function:

```css
h1 {
  margin-block: min(2.25rem, 36px);
}
```

This would allow the margin to scale down proportionally. Therefore a base font size below 16px behaves like zoom, whereas increased sizes selectively scale.

Seems like a lot of work!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "REM? PX? Why not both?",
  "desc": "The one where I consider responsive CSS units",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/rem-or-px.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
