---
lang: en-US
title: "Scroll-Locked Dialogs"
description: "Article(s) > Scroll-Locked Dialogs"
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
      content: "Article(s) > Scroll-Locked Dialogs"
    - property: og:description
      content: "Scroll-Locked Dialogs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/scroll-locked-dialogs.html
prev: /programming/css/articles/README.md
date: 2024-02-19
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/938
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
  name="Scroll-Locked Dialogs"
  desc="I just wrote about the <dialog> element, with some basic usage and things to watch for. It’s a great addition to the web platform. Here’s another interesting thing we can do, connecting it to another one of my favorite new things on the web platform: :has(). (You can see I’ve been pretty into it lately.) […]"
  url="https://blog.master.dev/scroll-locked-dialogs/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/938"/>

[**I just wrote about the `<dialog>` element**](/blog.master.dev/basic-dialog-usage-and-gotchas-to-watch-for.md), with some basic usage and things to watch for. It’s a great addition to the web platform.

Here’s another interesting thing we can do, connecting it to another one of my favorite new things on the web platform: `:has()`. (You can see I’ve been [<VPIcon icon="fas fa-globe"/>pretty into it](https://blog.master.dev/tag/has/) lately.) I was reading [<VPIcon icon="fas fa-globe"/>2Locking scroll with :has()](https://robbowen.digital/wrote-about/locking-scroll-with-has/) from Robb Owen, and he gets into how you might want to prevent the page from scrolling when a modal is open.

> To prevent from losing the user’s place in the page whilst that modal is open – particularly on mobile devices – it’s good practice to prevent the page behind it from scrolling. That’s a scroll lock.

I like that. The user can’t interact with what’s behind the modal anyway, as focus is trapped into a modal (that’s what a modal is). So, might as well make sure they don’t inadvertently scroll away. Without doing anything, scrolling is definitely not locked.

<VidStack src="https://videopress.com/a57d78c2-e973-4180-b518-5446e95231e6" />

My first thought was actually… I wonder if `overscroll-behavior` on the `dialog` (and maybe the `::backdrop` too?) would prevent that, but some quick testing didn’t seem to work.

So to scroll lock the page, as Robb did in his article, we can do by hiding the `overflow` on the `body`. Robb did it like this:

```css
body:has(.lock-scroll) {
  overflow: hidden;
}
```

Which would then lock if the body had a `<dialog class="lock-scroll">` in it. That’s fine, but what I like about `<dialog>` is that it can sorta *always* be in the DOM, waiting to open, if you like. If you did that here, it would mean the scroll is *always* locked, which you certainly don’t want.

Instead, I had a play like:

```css
body {
  /* ... */

  &:has(dialog[open]) {
    overflow: hidden;
  }
}
```

So this just locks scrolling *only* when the dialog is open. When you call the API like `showModal`, it toggles that `open` attribute, so it’s safe to use.

This works, see:

<VidStack src="https://videopress.com/511c2b70-5494-48c8-9efa-aea66ec0805b" />

But… check out that *content shift* above. When we hide the overflow on the body, there is a possibility (depending on the browser/platform/version/settings and “overlay” scrollbars) that the scrollbars are taking up horizontal space, and the removal of them causes content to reflow.

Fortunately, there is yet another modern CSS feature to save us here, if we determine this to be a problem for the site we’re working on: [<VPIcon icon="fa-brands fa-firefox"/>`scrollbar-gutter`](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter). If we set:

```css
html {
  scrollbar-gutter: stable;
}
```

Then the page will reserve space for that scrollbar whether there is scrolling or not, thus there will be no reflow when the scrollbar pops in and out. Now we’re cookin’ — see:

<VidStack src="https://videopress.com/b1be03d4-f35d-4872-b8b1-40528ff7b19b" />

I don’t think `scrollbar-gutter` is a home run, sadly. It leaves a blank strip down the side of the page (no inherited background) when the scrollbar isn’t there, which can look awkward. Plus, “centered” content can look less centered because of the reserved space. Just one of those situations where you have to pick which is less annoying to you 🫠.

Demo:

<CodePen
  user="anon"
  slug-hash="QWooqVa"
  title="dialog with scroll locking"
  :default-tab="['css','result']"
  :theme="dark"/>

```component VPCard
{
  "title": "Basic Dialog Usage and Gotchas To Watch For",
  "desc": "The <dialog> element in HTML is tremendous. We’ve got support across the board now, so using it is a smart plan. Just with basic usage, you get a centered modal dialog experience that comes up when you call it, a dimmed background, focus trapped within it, closes with the ESC key, and focus returning where […]",
  "link": "/blog.master.dev/basic-dialog-usage-and-gotchas-to-watch-for.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "What’s the Difference Between HTML’s Dialog Element and Popovers?",
  "desc": "They are pretty similar in both look and functionality, but are have some important differences, slightly different APIs, and functionality. The use cases are also a bit different, so let's have a look!",
  "link": "/blog.master.dev/whats-the-difference-between-htmls-dialog-element-and-popovers.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Lessons Learned from Recreating a Styled Dialog",
  "desc": "Sometimes pretty simple HTML elements have a lot of things to consider and take care of, from interactivity, styling, accessibility, and more.",
  "link": "/blog.master.dev/lessons-learned-from-recreating-a-styled-dialog.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scroll-Locked Dialogs",
  "desc": "I just wrote about the <dialog> element, with some basic usage and things to watch for. It’s a great addition to the web platform. Here’s another interesting thing we can do, connecting it to another one of my favorite new things on the web platform: :has(). (You can see I’ve been pretty into it lately.) […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/scroll-locked-dialogs.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
