---
lang: en-US
title: "Lessons Learned Rewriting a Sticky Detector"
description: "Article(s) > Lessons Learned Rewriting a Sticky Detector"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Lessons Learned Rewriting a Sticky Detector"
    - property: og:description
      content: "Lessons Learned Rewriting a Sticky Detector"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/lessons-learned-rewriting-a-sticky-detector.html
prev: /programming/css/articles/README.md
date: 2026-07-15
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10399
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
  name="Lessons Learned Rewriting a Sticky Detector"
  desc="A dozen years go by, it turns out we can do things a lot differently and a lot better. Here a `scroll` event is entirely replaced by HTML and CSS features and much better performance."
  url="https://blog.master.dev/lessons-learned-rewriting-a-sticky-detector/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10399"/>

I recently came across [a demo I did in 2014 (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/0148624b-bda0-7450-9d80-69280682a1e5) where, as you scroll down, a search input becomes stuck to the top of the page, and changes styles a bit to make room for a hamburger menu. I’ll just video that so it’s clear:
<VidStack src="https://videopress.com/7fc8e906-5f34-419a-9462-8e177eb1a0d0" />

Perhaps you forget these long ago times, but we were *not* rocking `position: sticky;` back then. So this demo had to replicate that somehow. But I was noticing how the styles *change* as well, meaning even after we got `position: sticky;`, we’d need a way to detect when it’s stuck (through JavaScript or whatever) and update a class (through JavaScript or whatever).

In these cushy, simpler times, we can get this all done in CSS. But there are a couple of other lessons to be learned by converting this thing to 2026 magic, so let’s go.

---

## The Main Problem

In the old demo, the main problem is… JavaScript. It’s not even that JavaScript is used at all, it’s just that how it’s implemented is wildly inefficient.

```js
var wrap = $("#wrap");

wrap.on("scroll", function(e) {
  if (this.scrollTop > 147) {
    wrap.addClass("fix-search");
  } else {
    wrap.removeClass("fix-search");
  }
});
```

This listens to the `scroll` event and fires a callback on each. One little scroll flick downwards might fire this event (and thus do the callback and the DOM element access and math) *many hundreds* of times. Boooooo.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/Screenshot-2026-07-15-at-4.27.49-PM.png?resize=860%2C1024&ssl=1)

Plus, it’s jQuery 2.1.3 just because hey, it was 2014. ---

## Gettin’ Sticky

The first thing we’re gonna do is use `position: sticky;` as that’s going to do the main thing we need (stick the search input to the header as it scrolls by), and *we can toss the old JavaScript entirely*. We’re gonna need a wrapper element that will be the element gettin’ stuck. So we can do this:

```xml
<div class="search-area">
  <form action="/search">
    <label for="s" class="visually-hidden">Search</label>
    <input id="s" type="search" placeholder="Search..." />
  </form>
</div>
```

So even if this area isn’t at the top of the page to start, and ours isn’t, it’ll get stuck to the top when we scroll by if we do this:

```css
.search-area {
  position: sticky;
  top: 0;
}
```

<VidStack src="https://videopress.com/70ba552b-ff94-4ea6-9b17-d0bd0d129168" />

### Using `<search>`

Perhaps the `<form>` is a bit presumtive there. I might argue it’s a good idea since it’s the kind of thing that is the foundation of progressive enhancement and working without JavaScript. But this is literally a fake example that doesn’t search anything. We could replace that form with a `<search>` element or use `<search>` as the parent element.

```xml
<div class="search-area">
  <search>
    <label for="s" class="visually-hidden">Search</label>
    <input id="s" type="search" placeholder="Search..." />
  </search>
</div>
```

We basically [<VPIcon icon="fas fa-globe"/>get a free ARIA landmark](https://scottohara.me/blog/2023/03/24/search-element.html) for using it.

---

## Stuck State Query

I also chucked that `<search>` in there for a sneaky second reason. We need an additional child element to style, since we’re utlimately going to use a container query, and you can’t write container styles on the container itself. Classic gotcha.

Let’s officially make the wrapper element a container:

```css
.search-area {
  /* `scroll-state` is a real keyword we need to make this specific kind of container */
  container-type: scroll-state;
  /* `sticky-search` is a name we just made up to name the container */
  container-name: sticky-search;
  position: sticky;
  top: 0;
}
```

Now we can write a `@container` query to detect the stuck state and use it. We could it like this, without needing the name at all:

```css
.search-area {
  container-type: scroll-state;
  container-name: sticky-search;
  position: sticky;
  top: 0;

  @container scroll-state(stuck: top) {
    search {
      /* stuck styles for a child element */
    }
  }
}
```

Or do it elsewhere in the CSS and call it by name:

```css
...

search {
  ...

  @container sticky-search scroll-state(stuck: top) {
    /* stuck styles for a child element */
    
    input {
      /* keep styling other stuff */
    }
  }
}
```

In our demo, we add a bit of padding, change the background, and fiddle with the width of the input when it’s stuck (as that’s what the original demo did as well).

<VidStack src="https://videopress.com/0289c1e0-c2fb-46f2-8587-d0b4177690bc" />

---

## Anchor the Burger

This is another somewhat contrived situation because of the nature of the demo, but it’s useful for learning anyway. See how we’ve kind of make a “fake” mobile layout by limiting the wrapper area to `280px`? It’s in that area specifically where we want our `position: fixed;` hamburger menu. But there is another classic gotcha here where you can’t `position: fixed;` and element relative to some random element on the page. You can’t just `position: relative;` a parent like you do with `position: absolute;`. There is trickery, like applying an unnecessary `transform` to scope things, but I find the tradeoffs unacceptable. Plus, there is a better way, anyway.

We can express “put this thing relative to this other element and stay there” through anchor positioning these days, without any of the weird constraints.

Since we have an obvious parent element at play here (it might just be the `<body>` on a typical situation), we’ll make it the anchoring context like this:

```css
.wrap {
  /* ... */
  anchor-name: --wrap;
}
```

Now we can still use `position: fixed;`, but place it perfectly relative to that anchor we just set up.

```css
.menu-icon {
  /* ... */
  position: fixed;
  position-anchor: --wrap;
  top: calc(anchor(top) + 12px);
  right: calc(anchor(right) + 25px);
}
```

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/CleanShot-2026-07-15-at-16.35.28%402x.png?resize=1024%2C670&ssl=1)

I love this so much.

### Use SVG

The old demo used ☰ for the burger icon, which I’m just gonna say [is a bad practice](https://htmhell.dev/11-the-trigram-for-heaven/). Using `<svg>` is just better, and allows for some normal markup. Probably something like:

```xml
<button class="menu-icon" aria-label="Toggle Menu">
  <svg viewBox="0 0 100 100" width="12" height="12" aria-hidden="true">
    <path d="..." />
    <!-- or maybe some <line> stuff -->
  </svg>
</button>
```

I just grabbed one out of CodePen’s free assets:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/Screenshot-2026-07-15-at-4.37.41-PM.png?resize=1024%2C906&ssl=1)

---

## Final Demo

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f5d94-74b8-7052-9db1-f653635a7ceb/fabdf8101cbd5f7684ecb22c3856396b"
  title="Modernized Search Box Content Moves to Fixed Header"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Lessons Learned Rewriting a Sticky Detector",
  "desc": "A dozen years go by, it turns out we can do things a lot differently and a lot better. Here a `scroll` event is entirely replaced by HTML and CSS features and much better performance.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/lessons-learned-rewriting-a-sticky-detector.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
