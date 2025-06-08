---
lang: en-US
title: "Container Query for “is there enough space outside this element?”"
description: "Article(s) > Container Query for “is there enough space outside this element?”"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Container Query for “is there enough space outside this element?”"
    - property: og:description
      content: "Container Query for “is there enough space outside this element?”"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/container-query-for-is-there-enough-space-outside-this-element.html
prev: /programming/css/articles/README.md
date: 2025-05-13
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5796
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
  name="Container Query for “is there enough space outside this element?”"
  desc="A container query can contain viewport units, meaning you can compare the window vs the element and make choices."
  url="https://frontendmasters.com/blog/container-query-for-is-there-enough-space-outside-this-element/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5796"/>

Say you had a UI component that had pagination arrows for whatever reason. If there was enough space on the outside of that component, you wanted to put those arrows *outside*, like this this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-06-at-2.25.55%E2%80%AFPM.png?resize=1024%2C647&ssl=1)

But if there isn’t enough room for them without shrinking the main content area, then place them *inside*, like this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-06-at-2.25.59%E2%80%AFPM.png?resize=977%2C1024&ssl=1)

You could do that with plenty of magic numbers, especially in how big the main content area is. But wouldn’t it be cool if you didn’t have to know? Like the main content area could be whatever, fluid/responsive/flexible, and you could still test if there is “room” outside for the arrows or not.

::: note

I was playing with this trick because I remember Adam Argyle talking about it one time, but couldn’t find where he used it. So I wrote this article up to re-learn and document it. [<FontIcon icon="fas fa-globe"/>Then of course I find the original article.](https://nerdy.dev/carousel-adaptive-anchor-positioning-with-calc-in-a-container-query) So full credit to Adam here. Mine approach here is super similar of course. I think I prefer how his `@container` query uses `cqi` units inside of it in case the parent isn’t the viewport. Clever.

:::

The trick is in combining viewport units within a container query. You could probably do it by using container units within a media query too, but we’ll go with the former because I tried it and it worked.

We’re going to need a “wrapper” element because that’s just how `@container` queries tend to be most useful. You can’t query the same element that is the container, so easier if the container is a wrapper.

```html
<div class="box">
  <div class="box-inner">
    <div class="arrow arrow-left">
       <svg ...></svg>
    </div>
    <div class="arrow arrow-right">
       <svg ...></svg>
  </div>
</div>
```

The box will be the container:

```css
.box {
  container: box / inline-size;
  inline-size: min(500px, 100vw);
}
```

I love using that second declaration, which says: “Make the element 500px wide, but if the entire browser window is smaller than that, do that instead.” That element is the container.

Then we can use a `@container` query on the inside. If we wanted to make a style change *exactly* when the container is the same size as the browser window, we could do this:

```css
.box-inner {
  background: rebeccapurple;
  ...

  @container box (inline-size >= 100vw) {
    background: red;
  }
}
```

That will do this!

<VidStack src="https://videopress.com/4dab2ccc-f0df-4323-a89e-731675cd93c2" />

But we’re actually dealing with the arrows here, so what we want to know is “is there enough space outside for them?” Meaning not the *exact* size of the element, but that:

```
Element <= Viewport - Arrows - Gap
```

Which we can express like this:

```css
.box-inner {
  background: rebeccapurple;
  ...

  @container box (inline-size <= calc(100vw - 80px * 2 - 1rem * 2)) {
    /* move arrows here */
  }
}
```

I’ll use a bit of `translate` to move the arrows here:

<CodePen
  user="chriscoyier"
  slug-hash="qEEVjeR"
  title="Query for “is there enough space outside?”"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And here’s a video of the success:

<VidStack src="https://videos.files.wordpress.com/hKDgwenc/cleanshot-2025-05-09-at-13.28.18_mp4_vp9_2160p.original.jpg?w=605" />

Again what’s kinda cool about this is that we don’t know what the size of the container is. It could be changed anytime and this will continue to work. The only hard coded numbers we used were for the size of the arrow elements and the gap, which you could abstract out to custom properties if you wanted to be more flexible.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Container Query for “is there enough space outside this element?”",
  "desc": "A container query can contain viewport units, meaning you can compare the window vs the element and make choices.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/container-query-for-is-there-enough-space-outside-this-element.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
