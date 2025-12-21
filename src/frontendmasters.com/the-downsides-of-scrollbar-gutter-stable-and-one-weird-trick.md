---
lang: en-US
title: "The Downsides of scrollbar-gutter: stable; (and one weird trick)"
description: "Article(s) > The Downsides of scrollbar-gutter: stable; (and one weird trick)"
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
      content: "Article(s) > The Downsides of scrollbar-gutter: stable; (and one weird trick)"
    - property: og:description
      content: "The Downsides of scrollbar-gutter: stable; (and one weird trick)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-downsides-of-scrollbar-gutter-stable-and-one-weird-trick.html
prev: /programming/css/articles/README.md
date: 2025-12-03
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7892
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
  name="The Downsides of scrollbar-gutter: stable; (and one weird trick)"
  desc="It maintains space for where a scrollbar would be, whether there actually is one or not. But do you always want that?"
  url="https://frontendmasters.com/blog/the-downsides-of-scrollbar-gutter-stable-and-one-weird-trick/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7892"/>

The esteemed Zach ([<VPIcon icon="fas fa-globe"/>Leatherpants](https://bsky.app/profile/strange.website/post/3m6hwyxrtk22q)), blogged about the virtues of `scrollbar-gutter: stable;`, suggesting it might be good in a starter stylesheet. (Hey, [**I’ve got one of those**](/frontendmasters.com/the-coyier-css-starter.md).) The thing that it solves is content-shifting. If you have a page that, upon first render, doesn’t have a vertical scrollbar, but more content loads later and gets one, it can shift content horizontally to make room for the scrollbar, which is a smidge annoying. That’s assuming your OS setting has always visible scrollbars enabled. (I do in my macOS settings, I prefer it.)

Also, navigating from a page that doesn’t require vertical scrolling to one that does (or vice versa) causes a layout shift to the tune of one scrollbar width.

Using `scrollbar-gutter: stable;` ([<VPIcon icon="iconfont icon-caniuse"/>supported everywhere](https://caniuse.com/wf-scrollbar-gutter)) means that the browser will “reserve space” for a scrollbar and thus totally remove the layout-shifting downsides mentioned above.

blob:https://videopress.com/1d781c80-d8d7-4efe-b580-a575ac9411bf

You can see the visual shift when we add content that overflows vertically. But if we flip on `scrollbar-gutter: stable;` the content stays steady when it goes back and forth between overflowing and not.

Notice in the video above though, the shifting-fix is accomplished by putting the space of the scrollbar there. You can see it’s quite literally a white bar. This only seems to happen when the page is rendered in an [`<iframe>` like it is on CodePen](https://codepen.io/chriscoyier/pen/bNprQEE/1716173d165cddff9dd3489c2a64f645?editors=1100), but I still find it highly obnoxious and a downside (as there is no way I’ve found to make it not a white, or dark-in-dark-mode, bar).

Here’s that demo:

<CodePen
  user="anon"
  slug-hash="bNprQEE"
  title="scrollbar-gutter"
  :default-tab="['css','result']"
  :theme="dark"/>

Fortunately, the “literal white bar” problem isn’t there on regularly-rendered pages (outside of an iframe), as that would be an instant deal breaker.

The remaining problem is centering.

The space that is reserved for the maybe-maybe-not scrollbar cannot be factored into centering (like `margin: auto;` and whatnot).

![😭](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/Screenshot-2025-12-02-at-6.36.38-PM.png?resize=1024%2C656&ssl=1)

So if you *really need* to visually center something, it’ll be fine-ish if there *is* a scrollbar, and noticeably not-centered-looking if there isn’t. Boooo.

To me, this is just annoying enough to not put it in a starter stylesheet.

But!

Just for fun we could look at a newfangled CSS alternative. My big idea here is that we actually can tell if the page is overflowing and has a scrollbar or not these days. We can do this via [<VPIcon icon="iconfont icon-caniuse"/>scroll-state queries](https://caniuse.com/wf-container-scroll-state-queries).

So we make the whole page a scroll-state container then watch for when it is scrollable and push the whole page in a little bit the same width as the scrollbar.

```css
html {
  container-type: scroll-state;
  
  --scrollbar-width: 25px;
  &::--webkit-scrollbar {
    width: var(--scrollbar-width);
  }
}

body {
  @container scroll-state(scrollable: block) {
    padding-left: var(--scrollbar-width);
  }
}
```

Notice I’m attempting to wrestle control over the width of the scrollbar there using those non-standard vendor prefixes. But 25px is the generally standard width of the scrollbar anyway. But that could change if a user set something like `scrollbar-width: thin;` or something. Makes me wish there was an `env()` variable or something that always reflects the width of the scrollbar at any DOM level. Anyway, if you have Chrome, you can see this approach working here:

<CodePen
  user="anon"
  slug-hash="raeqaYg"
  title="scrollbar-state approach"
  :default-tab="['css','result']"
  :theme="dark"/>

Certainly the `scrollbar-gutter` approach is easier and far better supported, but it’s neat to know there are future options.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Downsides of scrollbar-gutter: stable; (and one weird trick)",
  "desc": "It maintains space for where a scrollbar would be, whether there actually is one or not. But do you always want that?",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-downsides-of-scrollbar-gutter-stable-and-one-weird-trick.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
