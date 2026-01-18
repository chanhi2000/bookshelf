---
lang: en-US
title: "View Transitions & Playing Video"
description: "Article(s) > View Transitions & Playing Video"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > View Transitions & Playing Video"
    - property: og:description
      content: "View Transitions & Playing Video"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/view-transitions-playing-video.html
prev: /programming/css/articles/README.md
date: 2026-01-20
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8304
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

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="View Transitions & Playing Video"
  desc="Can you keep a video playing as a view transitions happens? Yes and no. Mostly yes. "
  url="https://frontendmasters.com/blog/view-transitions-playing-video/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8304"/>

I was runnin’ my mouth the other day in a conversation about View Transitions and I believe I said that you can keep audio & video playing during a View Transition. Now that I’m sitting down to actually prove it, the answer seems to be more nuanced:

- Same-Page View Transitions: Just Works™
- Multi-Page View Transitions: Doesn’t Work… well… *you can fake it though.*

Let’s start with that first one as it’s easy and satisfying. But first [here’s both in a demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019bc461-b5cb-71e3-9ab9-558ebb5ff512). I would embed the demo here, but I find that multi-page view transitions don’t behave well in the embed for whatever reason. So rather than you try it and be confused or disappointed, just go directly to that demo link above.

---

## Same-Page View Transitions and Video

If you have a `<video>` element on the page and you use a `document.startViewTransition` that manipulates it somehow in the callback, it will preserve the state of the video during the transition. If the video is playing, that playing state will be preserved the entire time. Much like [**the newangled `.moveBefore()`**](/frontendmasters.com/preserve-state-while-moving-elements-in-the-dom.md).

```js
doViewTransition.addEventListener("click", () => {
    document.startViewTransition(() => {
      const $video = document.querySelector("video");
      $video.classList.toggle("fancy");
    });
});
```

Basically nothing to it. This works just as well on an `<audio>` or `<iframe>`.

<VidStack src="https://videopress.com/b9aebf17-7fac-414d-b5c7-d7321ca72c6a" />

---

## Multi-Page View Transitions and Video

The brass tacks here are that when a page unloads and a new page loads, no state at all is maintained. Even if the exact same `<video>` is on the next page, it’s not going to remember that’s playing or where you were.

I was just wrong when I was thinking there was some way to get this to work. There are some understandable sources for the confusion, though. If someone happened to be using an framework that provides SPA (single page app) navigations, you might see persisting video just because, well, the page never unloads. Also: Astro is a popular framework that [<VPIcon icon="iconfont icon-astro"/>specifically implemented persistent transitions for video](https://docs.astro.build/en/guides/view-transitions/#maintaining-state), and does so by essentially forcing an SPA experience with a same-page view transition.

[This GitHub thread (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10620) is a feature request for multi-page view transitions to be able to keep state and gets into this a little. Bramus notes that this isn’t a view transitions specific feature, it’s [a more general need for state-saving through page navigations (<VPIcon icon="iconfont icon-github" />`whatwg/html`)](https://github.com/whatwg/html/issues/8538). It also links to [<VPIcon icon="fa-brands fa-chrome"/>this demo](https://view-transitions.chrome.dev/video/mpa/), which… makes it work! This is the “faking it” I referred to. It doesn’t prevent the `<video>` from being unloaded and re-loaded, it just keeps the state in `sessionStorage`. So there is a little blip between pages. But hey it’s pretty close!

Here’s the important bits…

```css
/* Enable Multi-Page View Transitions */
@view-transition {
  navigation: auto;
}

/* Ensure video has a unique name shared on both pages */
video {
  view-transition-name: video;
}
```

```html
<!-- regular link goes between pages -->
<a href="./another-page.html">
  Go to Another Page (Multi-Page View Transition)
</a>

<!-- video exists on both pages -->
<video src="https://assets.codepen.io/3/mov_bbb.mp4" controls></video>
```

```js
window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    // page is leaving... save the video state
  }
});

window.addEventListener("pagereveal", async (e) => {
  if (e.viewTransition) {
    // page is entering, get video state and restore
  }
});
```

Here’s a video where I’m navigating pages in [the demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019bc461-b5cb-71e3-9ab9-558ebb5ff512) and you can see it working, and I’ve recorded the system audio along with it so you can hear the “blip” happen between pages:

<VidStack src="https://videopress.com/fd66a1a2-1a5d-4aac-8204-6700064dab7d" />

Again, [this demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019bc461-b5cb-71e3-9ab9-558ebb5ff512) is adapted from [<VPIcon icon="fa-brands fa-chrome"/>this demo from the Chrome gang](https://view-transitions.chrome.dev/video/mpa/detail.html). I’m posting mine because I was learning about it and playing with it and hope to make this all more findable information.

We’ve only looked at `<video>` specifically here, but if you were OK with the “blip” thing and wanted to do this with, say, a YouTube video that embeds as an `<iframe>`, the techniques would be the same, you’d just need to dig out the video information with the [<VPIcon icon="fa-brands fa-google"/>Iframe Player API](https://developers.google.com/youtube/iframe_api_reference) in order to save and retrieve the playing video information. I think that makes pretty fun homework if you ask me. 😉

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "View Transitions & Playing Video",
  "desc": "Can you keep a video playing as a view transitions happens? Yes and no. Mostly yes. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/view-transitions-playing-video.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
