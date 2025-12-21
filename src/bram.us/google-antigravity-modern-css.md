---
lang: en-US
title: "The Google Antigravity website, rebuilt with Modern CSS"
description: "Article(s) > The Google Antigravity website, rebuilt with Modern CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Google Antigravity website, rebuilt with Modern CSS"
    - property: og:description
      content: "The Google Antigravity website, rebuilt with Modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/google-antigravity-modern-css.html
prev: /programming/css/articles/README.md
date: 2025-12-03
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2025/12/google-antigravity-recreation-scaled.png
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
  name="The Google Antigravity website, rebuilt with Modern CSS"
  desc="I recreated the Google Antigravity website with Modern CSS."
  url="https://bram.us/2025/12/02/google-antigravity-modern-css/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/12/google-antigravity-recreation-scaled.png"/>

![Screenshot of the Google Antigravity Website Recreation](https://bram.us/wordpress/wp-content/uploads/2025/12/google-antigravity-recreation.png)

I recreated the Google Antigravity website with Modern CSS.

Recently, Google Antigravity was released along with [<VPIcon icon="fa-brands fa-google"/>a website](https://antigravity.google/) with info about it. The thing that caught my eye immediately when browsing that site, is that the scrolling felt uncanny. One DevTools session later and I found out that the site is using scroll-jacking and does not use any of the Modern CSS feature.

<VidStack src="youtube/wsp5x4X3uI8" />

Being a CSS/UI DevRel for Chrome, I [<VPIcon icon="fas fa-globe"/>nerd sniped](https://xkcd.com/356/) myself into recreating the website using Modern CSS Features:

- [<VPIcon icon="fa-brands fa-chrome"/>CSS `@starting-style`](https://developer.chrome.com/blog/entry-exit-animations#the_starting-style_rule_for_entry_animations)
- A [Houdini PaintWorklet for the ring particles (<VPIcon icon="iconfont icon-github"/>`bramus/css-houdini-ringparticles`)](https://github.com/bramus/css-houdini-ringparticles).
- Size Container Queries
- [<VPIcon icon="fa-brands fa-chrome"/>CSS `@scope`](https://developer.chrome.com/docs/css-ui/at-scope)
- [<VPIcon icon="fa-brands fa-chrome"/>CSS Anchor Positioning](https://developer.chrome.com/docs/css-ui/anchor-positioning-api)
- [<VPIcon icon="fa-brands fa-chrome"/>CSS Carousels](https://developer.chrome.com/blog/carousels-with-css)
- [**`overscroll-behavior: contain;` on a non-scrollable scroll container**](/bram.us/use-overscroll-behavior-contain-to-prevent-a-page-from-scrolling-while-a-dialog-is-open.md)
- `scroll-state(scrolled: …)` scroll queries to [**create a hidey bar**](/bram.us/solved-by-css-scroll-state-queries-hide-a-header-when-scrolling-down-show-it-again-when-scrolling-up.md)
- [<VPIcon icon="iconfont icon-w3c"/>CSS Scroll-Triggered Animations](https://drafts.csswg.org/css-animations-2/#animation-trigger-prop) *(which is admittedly a bit buggy in Chrome Canary right now)*
- [**CSS `sibling-index()`**](/frontendmasters.com/staggered-animation-with-css-sibling-functions.md) *(would have loved to use `random()` but that’s not available in Chrome)*
- [<VPIcon icon="fas fa-globe"/>CSS Scroll-Driven Animations](https://scroll-driven-animations.style/)

::: note

Not included in this list are things I consider basic nowadays: Responsive Design, Cascade Layers, CSS Nesting, Custom Properties, …

:::

The only bit of JavaScript used is the registration of the PaintWorklet, and a tad of JS to sync the cursor’s position to two custom properties for the CSS to use.

<VidStack src="youtube/voeNnpv0ppg" />

You can [check out the recreation on CodePen (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/bNpoKmy). You must use Chrome Canary to see the latest niceties in action.

If you are not using Google Chrome Canary *(or not using Chrome at all)* don’t worry: the site was built with Progressive Enhancement in mind and everything – except `@scope` 😔 – is feature-detected with `@supports`. So even if your browser understands only a fragment of the Modern CSS that is used, everything can be viewed perfectly fine 🙂

The rest of the CSS is admittedly a bit messy, as I quickly threw this together during some late night coding sessions. I also didn’t code up all parts of the site *(like the mega menu or the footer)* as this is merely an after-hours POC.

<CodePen
  user="bramus"
  slug-hash="bNpoKmy"
  title="Google Antigravity with Modern CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

::: tip

To force this *“basic”* view, try disabling the `@layer` named `moderncss`. The easiest way to do so, is to change `@layer moderncss` to `@slayer moderncss` and you’re done.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Google Antigravity website, rebuilt with Modern CSS",
  "desc": "I recreated the Google Antigravity website with Modern CSS.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/google-antigravity-modern-css.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
