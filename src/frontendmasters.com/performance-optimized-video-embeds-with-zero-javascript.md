---
lang: en-US
title: "Performance-Optimized Video Embeds with Zero JavaScript"
description: "Article(s) > Performance-Optimized Video Embeds with Zero JavaScript"
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
      content: "Article(s) > Performance-Optimized Video Embeds with Zero JavaScript"
    - property: og:description
      content: "Performance-Optimized Video Embeds with Zero JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/performance-optimized-video-embeds-with-zero-javascript.html
prev: /programming/css/articles/README.md
date: 2026-02-02
isOriginal: false
author:
  - name: Stefan Bauer
    url: https://frontendmasters.com/blog/author/stefanbauer/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8431
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
  name="Performance-Optimized Video Embeds with Zero JavaScript"
  desc="Putting a YouTube video inside a closed details element means it won't load until that details element is opened. We can use that."
  url="https://frontendmasters.com/blog/performance-optimized-video-embeds-with-zero-javascript/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8431"/>

Every embedded video comes with a real cost to page load performance. Each player loads extra resources, whether the user ever hits play or not, as Chris Coyier noted in his blog post on [**“YouTube Embeds are Bananas Heavy and it’s Fixable”**](/frontendmasters.com/youtube-embeds-are-bananas-heavy-and-its-fixable.md).

The approach of using `[<lite-youtube> (<VPIcon icon="iconfont icon-github"/>`paulirish/lite-youtube-embed`)](https://github.com/paulirish/lite-youtube-embed)` in that article works well when the video appears further down on the page and loads outside of the initial viewport. If the video is directly in the initial viewport, it can still cause a cumulative layout shift (CLS).

What if I told you you could lazy-load videos on interaction, without any JavaScript, even above the fold, with only native HTML and CSS?

---

## The Solution

The HTML elements `<details>` and `<summary>` can be used for a variety of purposes. The most common use case these days is creating an accordion without JavaScript. The visitor clicks the summary element, which behaves like a button, and the rest of the content is revealed. For that, the `open` attribute gets set on the `<details>` element. The visitor clicks the summary again, and the content collapses.

When the page loads, the content inside `<details>`, except the `<summary>` element, is not displayed by default, making it an ideal tool for displaying content only after user interaction.

### Lazy Loading

Modern HTML supports native lazy loading for images and iframes, a feature that Chris Coyier also used in his article. One thing to keep in mind is that when you load everything lazily, you can unintentionally degrade performance.

Research from the Google Chrome team found that excessive lazy loading can hurt your LCP (Largest Contentful Paint) by roughly 20%. This performance impact is especially noticeable when content is lazy-loaded directly into the viewport.

The good news is that the video we use as the details content is not considered part of the initial viewport on page load. It only enters the viewport after the user clicks the summary.

In conclusion, you are better off loading a YouTube Video, any iframe-embedded video, or even an animated GIF, lazy-loaded in an accordion.

---

## The Styling of the Accordion

The default design of this simple accordion is not pleasing to the end user. With a few lines of CSS, we can improve the user experience by signaling to visitors that it is a placeholder for a video.

### Summary as Video Thumbnail

Instead of text in the summary, use a video thumbnail with the same aspect ratio as the player:

```html
<details>
  <summary class="video-summary">
    <!-- Video Placeholder Image -->
    <img src="https://lab.n8d.studio/htwoo/htwoo-core/images/videos/big-bug-bunny.webp" class="video-thumbnail">
    <!-- Play Button -->
    <svg class="video-playicon" data-id="icon-play-filled" viewBox="0 0 32 32" data-icontype="filled"><path d="m11.167 5.608 16.278 8.47a2.169 2.169 0 0 1 .011 3.838l-.012.006-16.278 8.47a2.167 2.167 0 0 1-3.167-1.922V7.529a2.167 2.167 0 0 1 3.047-1.981l-.014-.005.134.065z"></path></svg>
  </summary>
  
  <!-- we'll get here... -->
</details>
```

The SVG play button can remain consistent across all videos, letting you use an on-brand play icon instead of the default one from the video platform.

CSS centers the play button on top of the thumbnail. Here’s where we are so far:

<CodePen
  link="https://codepen.io/StfBauer/pen/PwzOoEm/84213c473b723bd8b026c14f4d45909d"
  title="Summary Layout"
  :default-tab="['css','result']"
  :theme="dark"/>

The summary uses a 3×3 CSS grid to position the SVG exactly in the center of the thumbnail.

---

## Details as the Actual Video

Right after the `<summary>` element, the last step for HTML elements is to place the video content. I used a dedicated `<div>` element for that to avoid altering the original video embed code and keep it as flexible as possible, without modifying the original video player code.

::: details Demo

<CodePen
  link="https://codepen.io/StfBauer/pen/YPWEPNr/3179ae2a409e1383f84884ea374737bd"
  title="Details with video player"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

The surrounding `<details>` container is set to `position: relative`, allowing the `.video-content` to be positioned within it.

I also included a precaution for the iframe itself. Since the platform will provide that code. I made sure that it covers 100% of the height and 100% of the width.

---

## The Invitation to Get to the Video

The summary’s default behavior is to remain visible, regardless of whether the content is expanded or collapsed, due to the iframe’s positioning. It will always be hidden behind the thumbnail.

```css
/* <details> container */
.video-embed {
  position: relative;
  
  /* container state */
  &[open] {
    .video-summary {
      visibility: hidden;
    }
  } 
}
```

When a visitor decides to watch the video and clicks on the thumbnail, the `open` attribute will be placed by the browser on the details attribute, which means the video summary can be hidden.

The iframe player appears in the viewport and lazy loads the resources needed for the video.

<CodePen
  link="https://codepen.io/StfBauer/pen/RNbKYXe/a831adc966239412c0eded6aabd6b39b"
  title="Video Embedded - Optimisation"
  :default-tab="['css','result']"
  :theme="dark"/>

In general, instead of delaying the video until it appears in the viewport, everything is delayed when the user actually wants to watch the video.

One quick tip to smooth the user experience, especially for YouTube videos. Append `?autoplay=1` to the URL of the video, and it will page as soon as possible. Note that if autoplay is disabled in the user’s browser, they’ll still have to click to start the video.

---

## Performance

The `<details>`/`<summary>` implementation I showed is fast and only loads the video on user interaction, rather than assuming it will be watched.

It is a pattern that can be used not only for YouTube but also for other platforms. Think about Vimeo, self-hosted videos, animated GIFs, or any other content that gets embedded into a web page.

It could even be applied to an Embedded Pen like I’m showing the demos in (although they also have [<VPIcon icon="fa-brands fa-codepen"/>an optional click-to-run functionality](https://blog.codepen.io/documentation/embedded-pens/#delayed-embeds) already). Show an image first, and when the user clicks to interact, enable interactivity mode. In case loading fails, show an error message instead.

### Data

I created some tests to compare performance with the famous [lite-youtube-embed (<VPIcon icon="iconfont icon-github"/>`paulirish/lite-youtube-embed`)](https://github.com/paulirish/lite-youtube-embed) by Paul Irish against this pattern.

::: info The results

| Metric | `<details>`  
pattern | lite-youtube | Winner |
| --- | --- | --- | --- |
| Load Time | 595ms | 693ms | `<details>` (14% faster) |
| FCP | 11ms | 70ms | `<details>` (6.4× faster) |
| LCP | 97ms | 157ms | `<details>` (1.6× faster) |
| Transfer | 34 KB | 84 KB | `<details>` (2.5× less) |
| Resources | 2 | 5 | `<details>` (2.5× fewer) |
| CLS | 0.0075 | 0.0000 | Both good |
| TBT | 0ms | 0ms | Tie |
| JavaScript | 0 | ~3KB | `<details>` |

:::

In the test I conducted, both used the same YouTube thumbnail. For this solution, it was prefetched manually, of course. Something that could be automated on the backend.

---

## Wrapping Up

The `<details>` element has been in browsers since 2011. Lazy loading for iframes landed around 2019. Together, they deliver everything lite-youtube-embed provides. Faster initial load, deferred heavy content, and a clean user experience. Plus, you get native keyboard accessibility and toggle behavior with no extra work.

The real benefit? It’s not reliant on JavaScript. The only thing that can fail is the embedded content itself.

And because this is a pattern, not a product, it works for YouTube, Vimeo, CodePen, and maps. Any heavy embed you need to defer. Sometimes the best solution is the one the browser already provides.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Performance-Optimized Video Embeds with Zero JavaScript",
  "desc": "Putting a YouTube video inside a closed details element means it won't load until that details element is opened. We can use that.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/performance-optimized-video-embeds-with-zero-javascript.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
