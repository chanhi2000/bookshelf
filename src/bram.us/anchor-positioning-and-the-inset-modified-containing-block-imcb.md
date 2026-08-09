---
lang: en-US
title: "Anchor Positioning and the Inset-Modified Containing Block (IMCB)"
description: "Article(s) > Anchor Positioning and the Inset-Modified Containing Block (IMCB)"
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
      content: "Article(s) > Anchor Positioning and the Inset-Modified Containing Block (IMCB)"
    - property: og:description
      content: "Anchor Positioning and the Inset-Modified Containing Block (IMCB)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/anchor-positioning-and-the-inset-modified-containing-block-imcb.html
prev: /programming/css/articles/README.md
date: 2025-12-02
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2025/12/anchoring-wes-1.jpg
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
  name="Anchor Positioning and the Inset-Modified Containing Block (IMCB)"
  desc="If you kinda understand Anchor Positioning, but it still surprises you from time to time, then most likely this is the missing piece of information: the Inset-Modified Containing Block (or IMCB for short)."
  url="https://bram.us/2025/12/02/anchor-positioning-and-the-inset-modified-containing-block-imcb/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/12/anchoring-wes-1.jpg"/>

If you kinda understand Anchor Positioning, but it still surprises you from time to time, then most likely this is the missing piece of information: the Inset-Modified Containing Block *(or IMCB for short)*.

Yesterday, Wes Bos [asked (<VPIcon icon="fa-brands fa-bluesky"/>`wesbos.com`)](https://bsky.app/profile/wesbos.com/post/3m6x2janmos2a):

::: info *From Bluesky* (<VPIcon icon="fa-brands fa-bluesky"/><code>wesbos.com</code>)

> (Why)? does CSS anchor not have a position-area for the inside corners?
> 
> You need to switch to a totally different approach using inset values if you need that.
> 
> As far as I understand position-area is a helper for common uses. Must have a reason?
> 
> ![](https://bram.us/wordpress/wp-content/uploads/2025/12/anchoring-wes-1.jpg)

<SiteInfo
  name="Wes Bos (@wesbos.com)"
  desc="(Why)? does CSS anchor not have a position-area for the inside corners?  You need to switch to a totally different approach using inset values if you need that. As far as I understand position-area is a helper for common uses. Must have a reason?"
  url="https://bsky.app/profile/wesbos.com/post/3m6x2janmos2a/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:etdjdgnly5tz5l5xdd4jq76d/bafkreih4dppuidnlbdtnkzie3bfy2hseo7cuixxzqmxayyyxiqkfa6zruy"/>

:::

It is perfectly possible, so I [replied (<VPIcon icon="fa-brands fa-bluesky"/><code>bram.us</code>)](https://bsky.app/profile/bram.us/post/3m6x76bh6os2r):

::: info *From Bluesky* (<VPIcon icon="fa-brands fa-bluesky"/><code>bram.us</code>)

> Use the `align-self` / `justify-self` properties to adjust the anchored element’s position inside the IMCB. For example, to have an element in the top right corner, use this:
> 
> ```css
> position-area: center span-left;
> align-self: start;
> ```
> 
> ![](https://bram.us/wordpress/wp-content/uploads/2025/12/anchoring-wes-2.jpg)

<SiteInfo
  name="Bramus (@bram.us)"
  desc="Use the align-self / justify-self properties to adjust the anchored element’s position inside the IMCB. For example, to have an element in the top right corner, use this: ..."
  url="https://bsky.app/profile/bram.us/post/3m6x76bh6os2r/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:343p6xcgmvkpz5abgezlgyep/bafkreicgg6pf7c4qbulwo4frvjc463c2kee3uvnmwxwjiom4kjuqembkcq"/>

:::

The IMCB I mention there is short for the *Inset-Modified Containing Block*. As [<VPIcon icon="iconfont icon-w3c"/>per `css-position-3`](https://drafts.csswg.org/css-position-3/#abspos-insets):

::: info *From W3C Editor's Draft* (<VPIcon icon="iconfont icon-w3c"/><code>drafts.csswg.org></code>)

> For an absolutely positioned box, the inset properties effectively reduce the containing block into which it is sized and positioned by the specified amounts. The resulting rectangle is called the inset-modified containing block.

```component VPCard
{
  "title": "CSS Positioned Layout Module Level 3",
  "desc": "For an absolutely positioned box, the inset properties effectively reduce the containing block into which it is sized and positioned by the specified amounts. The resulting rectangle is called the inset-modified containing block. (For disambiguation, the actual containing block of an absolutely positioned box can also be called the absolute-position containing block.)",
  "link": "https://drafts.csswg.org/css-position-3/#abspos-insets",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

The anchored box gets positioned within that IMCB.

I quickly built a recreation of Wes’s screenshot to have it show the “Inset-Modified Containing Block” (IMCB) when hovering over an anchored item.

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2025/12/anchor-positioning-imcb.mp4" />

*“But wait, there is no inset at play here?”* you might think. Well, I kinda cut a corner there *(because: social media)*.

The full explanation for what effectively happens is:

1. `position-area` selects a region of the “position area grid” to use as the Containing Block for the anchored element.
2. That Containing Block then can get adjusted by an inset, resulting in an Inset-Modified Containing Block.
3. The anchored element then gets positioned within that IMCB.

Because the inset is `0` by default, the CB and IMCB are also the same by default.

Today I further adjusted the demo I quickly throw together to allow you to change the values for `inset`, `align-self` and `justify-self` per anchored element. The demo also shows both the CB (as selected by the `position-area`) and the IMCB. When changing the `inset`, it should become apparent of how the anchor positioning areas work.

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2025/12/anchor-positioning-cb-imcb.mp4" />

Play with it yourself here:

<CodePen
  user="bramus"
  slug-hash="YPqjgMq"
  title="Anchor Positions + Position Area + IMCB"
  :default-tab="['css','result']"
  :theme="dark"/>

This visualizer/tool mixes [<VPIcon icon="fas fa-globe"/>Una’s approach](https://anchor-tool.com/) *(of visualizing the IMCB)* with Wes’s approach *(of showing multiple anchored elements)* and with [**Temani’s approach**](/css-tip.com/position-area.md) *(of allowing you to change the `align-self`/`justify-self`)*, while also adding the option to change the `inset` 🙂

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Anchor Positioning and the Inset-Modified Containing Block (IMCB)",
  "desc": "If you kinda understand Anchor Positioning, but it still surprises you from time to time, then most likely this is the missing piece of information: the Inset-Modified Containing Block (or IMCB for short).",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/anchor-positioning-and-the-inset-modified-containing-block-imcb.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
