---
lang: en-US
title: "Identify and Extract Pseudo-Element Selectors from built-in HTML Elements using DevTools"
description: "Article(s) > Identify and Extract Pseudo-Element Selectors from built-in HTML Elements using DevTools"
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
      content: "Article(s) > Identify and Extract Pseudo-Element Selectors from built-in HTML Elements using DevTools"
    - property: og:description
      content: "Identify and Extract Pseudo-Element Selectors from built-in HTML Elements using DevTools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/identify-and-extract-pseudo-element-selectors-from-built-in-html-elements-using-devtools.html
prev: /programming/css/articles/README.md
date: 2021-04-16
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/04/css-devtools-shadow-dom-setting.png
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
  name="Identify and Extract Pseudo-Element Selectors from built-in HTML Elements using DevTools"
  desc="Recently Stefan Judis shared how to style the browse button of a file selector using the ::file-selector-button pseudo-element TIL – you can style the file input ”browse” button using `::file-selector-button`.😲 Supported in Firefox, Chromiums starting with 89 & Safari Tech preview. 🔗 MDN: https://t.co/56jACY9qK1🔗 Compat data pr: https://t.co/vrFNS4LdIS Video alt: Example of a styled browse … Continue reading ”Identify and Extract Pseudo-Element Selectors from built-in HTML Elements using DevTools”"
  url="https://bram.us/2021/04/15/identify-and-extract-pseudo-element-selectors-from-built-in-html-elements-using-devtools/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/04/css-devtools-shadow-dom-setting.png"/>

Recently [<VPIcon icon="fa-brands fa-x-twitter"/>Stefan Judis](https://x.com/stefanjudis/) shared how to style the browse button of a file selector using [<VPIcon icon="fa-brands fa-firefox"/>the `::file-selector-button` pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::file-selector-button)

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code>@stefanjudis</code>)

> TIL – you can style the file input "browse" button using `::file-selector-button`.😲
>
> Supported in Firefox, Chromiums starting with 89 & Safari Tech preview.

<SiteInfo
  name="::file-selector-button CSS pseudo-element - CSS | MDN"
  desc="The ::file-selector-button CSS pseudo-element represents the button of an <input> of type=”file”."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::file-selector-button/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

<SiteInfo
  name="Update browser support for file-selector-button by lukewarlow · Pull Request #9763 · mdn/browser-compat-data"
  desc="As of version 89 Chrome now supports the file-selector-button pseudo element. So I&#39;ve added Chrome (desktop and Android), Edge and Android Webview support. As well as Opera (desktop only becaus..."
  url="https://github.com/mdn/browser-compat-data/pull/9763/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/3425db009bd35f627dfa5b2e2351846be7584d9799f7750c5226c883721cd7e3/mdn/browser-compat-data/pull/9763"/>

> Video alt: Example of a styled browse button. pic.twitter.com/3YQ0njkX0J

```component VPCard
{
  "title": "X에서 Stefan Judis 님",
  "desc": "TIL – you can style the file input “browse” button using `::file-selector-button`.😲 Supported in Firefox, Chromiums starting with 89 &amp; Safari Tech preview... / X",
  "link": "https://x.com/stefanjudis/status/1380251546198413315/",
  "logo": "https://abs.twimg.com/favicons/twitter.3.ico",
  "background": "rgba(62,65,68,0.2)"
}
```

:::

But what about other complex elements in the browser? How can we tweak individual parts of those? Take `<audio>` for example: is there a pseudo-element we can use to style the play button?

---

## Dissecting `<input type="file" />`

Before we answer the question above, let’s first take a look at the `<input type="file" />` Stefan used. Below is screenshot of how it’s rendered in Chromium on Mac, with a few extra outlines added.

![](https://bram.us/wordpress/wp-content/uploads/2021/04/input-file-shadow-dom.png)

Even though we only type 1 element in our HTML code, we see it consists of two parts:

1. A “Choose File” button
2. A label reading “No file chosen”

Internally, this is also how the browser builds it. We type in:

```html
<input type="file" />
```

But what’s being rendered is this:

```html
<input type="button" value="Choose file" pseudo="-webkit-file-upload-button" id="file-upload-button">
<span aria-hidden="true">No file chosen</span>
```

*(I’ll show you further down this post how I know this 😉)*

The `::file-selector-button` selector Stefan mentioned targets only the `<input type="button" …>` you see there. Using it you can style the button, like he did.

::: note 🧐

If you’re paying close attention you might notice that the pseudo-element used is `::file-selector-button`, whilst the `pseudo` attribute of the button reads `-webkit-file-upload-button`. More on that further down the post 😉

:::

---

## How to use DevTools to peek inside `<input type="file" />`

In the Chromium DevTools we don’t get to see the two elements that make up `<input type="file" />`. That’s because this information as is hidden in [**the Shadow DOM**](/bram.us/ghost-in-the-shadow-dom.md).

Thankfully there is a way to have DevTools show them. To do so, open DevTools’ Settings, and under Elements check the option that reads **“Show user agent Shadow DOM”**.

![](https://bram.us/wordpress/wp-content/uploads/2021/04/css-devtools-shadow-dom-setting.png)

::: note

🦊 Firefox or 🧭 Safari user? The DevTools in Firefox/Safari have this option enabled out of the box.

:::

Once enabled you’ll see `#shadow-root (user-agent)` appear in the Elements Tree for all elements that are built that way *(and there quite a few!)*.

```html
<input type="file">
  ↳ #shadow-root (user-agent)
      <input type="button" value="Choose file" pseudo="-webkit-file-upload-button" id="file-upload-button">
      <span aria-hidden="true">No file chosen</span>
</input>
```

Video Player

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/04/devtools-input-file-shadow-dom.mp4" />

::: note ☝️

Having this option enabled all the time can be quite distracting. I personally only turn it on when I need it.

:::

---

## Dissecting `<audio>`

Winging back to our initial question “is there a pseudo-element we can use to style the play button?”, we can use the DevTools to see the underlying structure.

In Chromium we get back this structure:

```html :collapsed-lines
<audio controls="" src="/media/cc0-audio/t-rex-roar.mp3">
  ↳ #shadow-root (user-agent)
    <div pseudo="-webkit-media-controls" class="phase-ready state-stopped">
      <div pseudo="-webkit-media-controls-overlay-enclosure">
        <input pseudo="-internal-media-controls-overlay-cast-button" type="button" aria-label="play on remote device" style="display: none;">
      </div>
      <div pseudo="-webkit-media-controls-enclosure">
        <div pseudo="-webkit-media-controls-panel">
          <input type="button" pseudo="-webkit-media-controls-play-button" aria-label="play" class="pause" style="">
          <div aria-label="elapsed time: 0:00" pseudo="-webkit-media-controls-current-time-display" style="">0:00</div>
          <div aria-label="total time: / 0:02" pseudo="-webkit-media-controls-time-remaining-display" style="">/ 0:02</div>
          <input type="range" step="any" pseudo="-webkit-media-controls-timeline" max="2.115918" aria-label="audio time scrubber 0:00 / 0:02" aria-valuetext="elapsed time: 0:00">
          <div pseudo="-webkit-media-controls-volume-control-container" class="closed" style="">
            <div pseudo="-webkit-media-controls-volume-control-hover-background"></div>
            <input type="range" step="any" max="1" aria-valuemax="100" aria-valuemin="0" aria-label="volume" pseudo="-webkit-media-controls-volume-slider" aria-valuenow="100" class="closed" style=""><input type="button" pseudo="-webkit-media-controls-mute-button" aria-label="mute" style="">
          </div>
          <input type="button" pseudo="-webkit-media-controls-fullscreen-button" aria-label="enter full screen" style="display: none;">
          <input type="button" aria-label="show more media controls" title="more options" pseudo="-internal-media-controls-overflow-button" style="">
        </div>
      </div>
      <div role="menu" aria-label="Options" pseudo="-internal-media-controls-text-track-list" style="display: none;"></div>
      <div pseudo="-internal-media-controls-overflow-menu-list" role="menu" class="closed" style="display: none;">
        <label pseudo="-internal-media-controls-overflow-menu-list-item" role="menuitem" tabindex="0" aria-label=" Play " style="display: none;">
          <input type="button" pseudo="-webkit-media-controls-play-button" tabindex="-1" aria-label="play" class="pause" style="display: none;">
          <div aria-hidden="true">
            <span>Play</span>
          </div>
        </label>
        <label pseudo="-internal-media-controls-overflow-menu-list-item" role="menuitem" tabindex="0" aria-label="enter full screen Full screen " style="display: none;">
          <input type="button" pseudo="-webkit-media-controls-fullscreen-button" aria-label="enter full screen" tabindex="-1" style="display: none;">
          <div aria-hidden="true">
            <span>Full screen</span>
          </div>
        </label>
        <label pseudo="-internal-media-controls-overflow-menu-list-item" role="menuitem" tabindex="0" aria-label="download media Download " class="animated-0" style="">
          <input type="button" aria-label="download media" pseudo="-internal-media-controls-download-button" tabindex="-1" style="">
          <div aria-hidden="true">
            <span>Download</span>
          </div>
        </label>
        <label pseudo="-internal-media-controls-overflow-menu-list-item" role="menuitem" tabindex="0" aria-label=" Mute " class="animated-2" style="display: none;">
          <input type="button" pseudo="-webkit-media-controls-mute-button" tabindex="-1" aria-label="mute" style="display: none;">
          <div aria-hidden="true">
            <span>Mute</span>
          </div>
        </label>
        <label pseudo="-internal-media-controls-overflow-menu-list-item" role="menuitem" tabindex="0" aria-label="play on remote device Cast " class="animated-1" style="display: none;">
          <input pseudo="-internal-media-controls-cast-button" type="button" aria-label="play on remote device" tabindex="-1" style="display: none;">
          <div aria-hidden="true">
            <span>Cast</span>
          </div>
        </label>
        <label pseudo="-internal-media-controls-overflow-menu-list-item" role="menuitem" tabindex="0" aria-label="show closed captions menu Captions " class="animated-0" style="display: none;">
          <input aria-label="show closed captions menu" type="button" pseudo="-webkit-media-controls-toggle-closed-captions-button" tabindex="-1" style="display: none;">
          <div aria-hidden="true">
            <span>Captions</span>
          </div>
        </label>
      </div>
    </div>
</audio>
```

Or visually, with outlines added:

![](https://bram.us/wordpress/wp-content/uploads/2021/04/html-audio-shadow-dom.png)

With a bit of digging we can find the the play button on line #9, and extract its pseudo attribute.

```html
<input type="button" pseudo="-webkit-media-controls-play-button" aria-label="play" class="pause" style="">
```

👉 To style the play button we can use `::-webkit-media-controls-play-button`

~

---

## Is there a catch?

While the `::-webkit-media-controls-play-button` selector above works, there’s a catch though: **it only works in Chromium based browsers**, and this for several reasons:

::: tabs

@tab:active 1.

Every browser engine has its own implementation for what makes up an `<audio>` element. Shown below is a comparison of the UI for the `<audio>` as seen in Firefox, Chromium, and Safari.

![](https://bram.us/wordpress/wp-content/uploads/2021/04/html-audio-element-comparison.jpg)

Whilst all implementation contain a play button, not all — for example — contain an element that indicates the current time. Styling that wouldn’t be possible.

@tab 2.

Not all browser expose the same parts of the UI using pseudo-elements. When it comes to `<audio>` for example, only Chromium exposes parts of its UI. Firefox and Safari don’t expose any pseudo-element for `<audio>`

And even if they would, the wouldn’t use `::-webkit-media-controls-play-button` for it.

:::

Another aspect to take into account is that `::-webkit-media-controls-play-button` is something that Chromium decided to use. This wasn’t discussed with any other browser vendor. As [Thomas Steiner (<VPIcon icon="fa-brands fa-x-twitter"/>`tomayac`)](https://x.com/tomayac/) warns:

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code></code>)

> It’s like coding against a private API, though. The internals can change without prior notice. (In practice, things have been quite stable, but worth calling out.)

:::

---

## One last thing

To close off I still owe you an explanation to why Chromium lists `::-webkit-file-upload-button` for the browse button of `<input type="file" />`, instead of `::file-selector-button`.

This is because they first exposed it using their own internal `::-webkit-file-upload-button` name. It was only later that [the CSS Working Group decided to standardize it to `::file-selector-button` (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5049#issuecomment-666449792).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Identify and Extract Pseudo-Element Selectors from built-in HTML Elements using DevTools",
  "desc": "Recently Stefan Judis shared how to style the browse button of a file selector using the ::file-selector-button pseudo-element TIL – you can style the file input ”browse” button using `::file-selector-button`.😲 Supported in Firefox, Chromiums starting with 89 & Safari Tech preview. 🔗 MDN: https://t.co/56jACY9qK1🔗 Compat data pr: https://t.co/vrFNS4LdIS Video alt: Example of a styled browse … Continue reading ”Identify and Extract Pseudo-Element Selectors from built-in HTML Elements using DevTools”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/identify-and-extract-pseudo-element-selectors-from-built-in-html-elements-using-devtools.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
