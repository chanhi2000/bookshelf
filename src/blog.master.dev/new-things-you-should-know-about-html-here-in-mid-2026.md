---
lang: en-US
title: "New Things You Should Know About HTML Here in Mid 2026"
description: "Article(s) > New Things You Should Know About HTML Here in Mid 2026"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > New Things You Should Know About HTML Here in Mid 2026"
    - property: og:description
      content: "New Things You Should Know About HTML Here in Mid 2026"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/new-things-you-should-know-about-html-here-in-mid-2026.html
prev: /programming/css/articles/README.md
date: 2026-09-02
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10467
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
  name="New Things You Should Know About HTML Here in Mid 2026"
  desc="You've got your permissions elements, custom element registries, a potential future for HTML includes, HTML-in-Canvas, and a bunch more."
  url="https://blog.master.dev/new-things-you-should-know-about-html-here-in-mid-2026/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10467"/>

.article-content { hr { border: none; height: 200px; margin: 0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'%3E%3Cpath d='M0 10 C 6.25 3, 18.75 3, 25 10 S 43.75 17, 50 10 S 68.75 3, 75 10 S 93.75 17, 100 10' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center center; background-size: 100px 20px; } }

The foundational language of the web is getting plenty of love lately! While HTML moves a bit more slowly than its buddies, CSS and JavaScript, that tends to be a good thing.

I’m not gonna do, like, [<VPIcon icon="fa-brands fa-firefox"/>`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article) in here. That’s too basic for you. That shipped in like 2009. You already know it’s a perfect semantic wrapper element “which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.” Plus, it has the implied ARIA `role="article"`, so you don’t need to add that, which covers that [<VPIcon icon="iconfont icon-w3c"/>first rule of using ARIA](https://w3.org/TR/using-aria/#rule1) pretty nicely.

Nah, I wouldn’t do that to you. We’re going to do some other elements, attributes, and HTML fun that might have slipped under your radar in recent years. Mostly 2026 stuff, but I’m not terribly strict about it, as you’ll see.

---

## Permissions Elements (like `<geolocation>`)

There was a `<permission>` element [<VPIcon icon="fa-brands fa-chrome"/>tested out a while back](https://developer.chrome.com/blog/permission-element-origin-trial), but that experiment is dead. Instead, we’re going to get more specific elements for things you need permissions for, like [**the `<geolocation>` element**](/blog.master.dev/the-enforced-accessibility-of-the-geolocation-element.md#there-is-some-css-that-is-allowed-but-then-disables-the-button).

I kind of like the direct semantics of a button for a specific permission; that’s nice. **But I think the bigger story is “recovery”**, as they call it. Have you ever had a browser ask you for permissions for some kind of access and you’re like ***“No!”***? That’s fair. And it’s the point. APIs behind permission prompts are sensitive. It’s fair that you don’t want some website to know exactly where you are in the world, for example.

But when you said “No!” — it’s also fair that you might change your mind at some point in the future. But at this point, those APIs are kinda locked, and the only way to change your mind is to dig around in your browser preferences, find where you made that choice, and remove or reverse it. A permissions-specific button makes it much easier to change your mind. Just click it again; the button will ask again, and you can make a fresh choice. [<VPIcon icon="fa-brands fa-chrome"/>There is a variety of data](https://developer.chrome.com/blog/rethinking-web-permissions#case_studies) showing that the recovery flows are much more successful.

### The `<geolocation>` Element

This new element essentially makes a specialty `<button>` you can click to trigger a geolocation event. And, like I explained above, be asked whether that’s OK with you, regardless of what you may have allowed or disallowed in the past.

```xml
<geolocation onlocation="handleLocation(event)">
  <button onclick="handleLocationFallback(event)" autolocate>
    Use location
  </button>
</geolocation>
```

```js
/* This event just won't be fired if permissions not granted (geolocation element or otherwise) */
function handleLocation(event) {
  console.log("coordinates got!");
  /*
    Coordinates are in...
      event.coords.latitude
      event.coords.longitude
  */
}

function handleLocationFallback(event) {
  navigator.geolocation.getCurrentPosition(handleLocation);
}
```

I’m a fan! I like [**the enforced accessibility**](/blog.master.dev/the-enforced-accessibility-of-the-geolocation-element.md#there-is-some-css-that-is-allowed-but-then-disables-the-button).

Browser support is Chrome-only, but also isn’t a massive concern, as non-supporting browsers will essentially see `<geolocation>` like a meaningless `<span>` and the `<button>` inside will handle the permissions flow just like it traditionally has. These elements will be firm progressive enhancements.

### The `<usermedia>` Element

[<VPIcon icon="fa-brands fa-chrome"/>This one](https://developer.chrome.com/blog/usermedia-html-element#why_use_the_usermedia_element) is for the camera and microphone:

::: info "Introducing the &lt;usermedia&gt; HTML element" *From Chrome foir Developers* (<VPIcon icon="fa-brands fa-chrome"/><code>developer.chrome.com</code>)

> `<usermedia>` manages the entire flow for camera and microphone access. It captures user intent, manages the browser prompt, and delivers the `MediaStream` object to the application.

<SiteInfo
  name="Introducing the <usermedia> HTML element  |  Blog  |  Chrome for Developers"
  desc="Learn about the &lt;usermedia&gt; HTML element, a new Capability Element landing in Chrome 151."
  url="https://developer.chrome.com/blog/usermedia-html-element/"
  logo="https://gstatic.com/devrel-devsite/prod/v6c08f9bb601564cd99488472d05cdf6fb06f007f31b6552465782b15883ce123/chrome/images/favicon.png"
  preview="https://developer.chrome.com/static/blog/usermedia-html-element/image/thumbnail.png"/>

:::

```xml
<usermedia id="media-ctrl">
  <button>Enable camera and microphone</button>
</usermedia>
```

Like all these permission prompts, you get a literal prompt in the browser.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/userpermissions-prompt.png?resize=1024%2C476&ssl=1)

Because it’s a literal on-screen button, even if you deny the permission, it gives you a chance to change your mind later without having to dig through settings to figure out how to do that. That “recovery” data is strong:

> Cisco observed that users who initially denied permissions were only about **10%** likely to successfully grant permissions using legacy prompts, but that rate jumped to more than **65%** with the new element.

There is also planned `<camera>` and `<microphone>` elements for video-only and audio-only situations, respectively.

---

## The `<install>` Element

Here’s another Chrome-led one with a good premise:

::: info "Install web apps with the new HTML install element" *From Chrome foir Developers* (<VPIcon icon="fa-brands fa-chrome"/><code>developer.chrome.com</code>)

> Web app installation is fragmented. Every browser has its own set of entry points, for example address-bar icons, menu items, and prompts. Developers have limited control over when and how the install flow is surfaced.

<SiteInfo
  name="Install web apps with the new HTML install element  |  Blog  |  Chrome for Developers"
  desc="Test the proposed install element."
  url="https://developer.chrome.com/blog/install-element-ot/"
  logo="https://gstatic.com/devrel-devsite/prod/v6c08f9bb601564cd99488472d05cdf6fb06f007f31b6552465782b15883ce123/chrome/images/favicon.png"
  preview="https://developer.chrome.com/static/blog/install-element-ot/image/hero.png"/>

:::

So rather than rely on how different browsers surface web app installation (PWA’s, as it were), we make a semantic button for the job we can place wherever we like on our sites. Safari on iOS is notorious for making this difficult, leading many developers to believe it’s an intentional downplaying of the web (and an upplaying of their app store). So we’ll see if we ever get a cross-browser implementation of this.

```xml
<install 
  installurl="https://awesome-app.com/"
  manifestid="https://awesome-app.com/?source=pwa">
>
  <a href="https://awesome-app.com/">Launch Awesome App</a>
</install>
```

Note that to make a website installable, you need [<VPIcon icon="fa-brands fa-firefox"/>a web application manifest](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest). And to make a *good* installable web app, you’re probably doing things like caching data with [<VPIcon icon="fa-brands fa-firefox"/>a service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

In a simple twist of fate, *desktop* Safari on macOS has [<VPIcon icon="fa-brands fa-apple"/>an “add to Dock” feature](https://support.apple.com/guide/safari/add-to-dock-ibrw9e991864/mac) that does *not* require a web app manifest.

---

## The `<select>` Element

Wait! That’s not new! But being able to *custom design* it is from CSS. It’s a story right now because Chrome was first out of the gate with it, but now Safari supports it too.

There is plenty to know about it, because you need to opt in to it, and styling certain parts of it requires new pseudo-elements and such. First, you need to opt in to the styleability like:

```css
select,
::picker(select) {
  appearance: base-select;
}
```

Then you’ve pretty much got carte blanche to do whatever you want.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a054bd-c741-7209-adbb-22ab1288005f"
  title="Simple Custom Select"
  :default-tab="['css','result']"
  :theme="dark"/>

But there is *a lot* more to know. You can put a:

```html
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>

  <option>...
```

In there, which clones the contents of the `<option>` that is currently selected, and you can style it specially. There is the `::picker(select)` which is the dropdown parent itself. The `select::picker-icon` which is the indicator the whole thing [even is a dropdown (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/01a0546f-aa2b-7629-9970-80f89e0731d5). And a bunch more. Brecht has [<VPIcon icon="fas fa-globe"/>a huge series](https://utilitybend.com/blog/the-customizable-select-part-one-history-trickery-and-styling-the-select-with-css/) going deep on all this.

---

## Web Components

Web Components have been around for quite a while, but they aren’t just one thing; they are a collection of APIs that evolve independently.

### Scoped Element Registries

You can just register a custom element the classic way:

```js
customElements.define("my-element", MyElementClass);
```

But you could also put it [**into a Custom Element Registry**](/blog.master.dev/same-name-different-component-with-scoped-custom-element-registries.md), like:

```js
const myCustomRegistry = new CustomElementRegistry();
myCustomRegistry.define("my-element", MyElementClass);
```

Once you have a Custom Element Registry, you can tell any given Shadow DOM to use that one.

```js
const shadow = footer.attachShadow({
  mode: "open",
  customElementRegistry: myCustomRegistry
});
```

Then, whatever you put in that particular `shadow` will use the new custom registry.

The point is, you can have different/multiple registries. Which… is pretty niche. But we can imagine a situation where a big fancy company has a versioned design system and their new fancy weather widget uses v3 of their design system, which has a `<fancy-card>` and all the rest of the `<fancy-card>` elements on the rest of the page are stuck slumming it on v2. In other words: **this is an escape hatch for same-named but different-versioned custom elements**.

### Declarative Shadow DOM

Declarative Shadow DOM became widely supported more like 2024, I just feel like it’s still relatively new and not particularly well known so *it’s going on the list*, gosh dang it.

It basically means: **Shadow DOM without needing JavaScript** (and costing a bunch of potentially repetitive HTML). I could do this and get a fully legit Shadow DOM:

```xml
<my-element>
  <template shadowrootmode="open">
    <h1><slot name="title">Fallback Title</slot></h1>
  </template>

  <span slot="title">The Title</span>
</my-element>
```

If there were CSS on the page like `h1 { color: red; }` it wouldn’t target this `h1` because of the Shadow DOM boundary. Here’s that [basic example (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/01a04eae-4703-7179-bb3c-9cef6c719e29) and a more fleshed-out [generated example (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019fec39-dbba-751f-ae1a-f3867b6a44f8).

This feature, to me, **is meant to be the output of a build process** for Server-Side Rendering (SSR) of web components. [<VPIcon icon="fas fa-globe"/>Here’s an example](https://wcc.dev/) of that.

### Reference Target

Let’s say you’ve got a `<label>` *outside* a Shadow DOM, but an `<input>` *inside* the Shadow DOM. The kind of thing that might happen in a design system with a `<custom-input>` or whatever. Labels and inputs need to reference each other for accessibility. Typically the `for` attribute of the label matches the `id` of the input. This can work now with this reference target feature.

Here’s [an example (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/01a04f20-6cf0-7d6b-b659-95a72237c636) with declarative shadow DOM:

```xml
<label for="name">Your name</label>

<fancy-input id="name">
  <template shadowrootmode="open" shadowrootreferencetarget="real-input">
    <span class="decoration">✎</span>
    <input id="real-input" type="text">
  </template>
</fancy-input>
```

It’s out in Chrome and behind flags in Safari and Firefox, so really not far off.

### Declarative CSS Module Scripts

I’m [**a big fan of CSS Module Scripts**](/blog.master.dev/architecture-through-component-colocation.md), the kind like this:

```js
import sheet from './styles.css' with { type: 'css' };
```

But *this is not that*. And I think it’s only an experimental Chrome thing for now. [But it’s interesting! (<VPIcon icon="iconfont icon-github"/>`MicrosoftEdge/MSEdgeExplainers`)](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/ShadowDOM/explainer.md#proposal-the-import-attribute-on-link-relstylesheet)

```xml{10}
<script type="importmap">
  {
    "imports": {
      "foo": "https://example.com/foo.css"
    }
  }
</script>
<my-element>
  <template shadowrootmode="open">
    <link rel="stylesheet" import="foo">
    <p>Inside Shadow DOM</p>
  </template>
</my-element>
```

---

## HTML Includes

### Not the Web Components Kind, The Streaming Kind.

Why my mind thinks [**“HTML Includes”**](/blog.master.dev/seeking-an-answer-why-cant-html-alone-do-includes.md), I don’t think of “HTML imports”, the web components feature that sadly never saw the light of day, I think of the very basic…

```xml
<!-- something goes and gets header.html and puts it here -->

<main>
  <p>Blah blah blah.</p>
</main>

<!-- something goes and gets footer.html and puts it here -->
```

That light of day is starting to peek out for this again. The concept of [declarative partial updates (<VPIcon icon="iconfont icon-github"/>`WICG/declarative-partial-updates`)](https://github.com/WICG/declarative-partial-updates) is alive, which is related to HTML streaming. It all feels too new to really see how it’s all going to work. But perhaps, if you’re literally [**streaming some HTML**](/blog.master.dev/streaming-html.md), they can be [<VPIcon icon="fa-brands fa-chrome"/>new declarative elements](https://developer.chrome.com/blog/declarative-partial-updates) that allow you say, *hey that new `<template>` (or something) you just got, that actually goes way up here in the DOM, so put it there, please.*

```html
<div>
  <?start name="placeholder">
  Loading…
  <?end>
</div>

...

<template for="placeholder">
  Here is some <em>HTML content</em>!
</template>
```

Apparently, this tech opens doors, maybe-just-maybe, for something like a native `<include>`.

```xml
<template for="footer" patchsrc="/partials/footer.html">
```

### Persistent Widgets?

It feels to me [<VPIcon icon="fa-brands fa-google"/>like this Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/DGHoP1k2t2E/m/qQLbK1StDwAJ?pli=1) is an HTML include with superpowers?

> Persistent widgets are embedded browsing contexts, like iframes, but they can persist across same-origin navigations without reloading. Persistent widgets can be used via the `<persistentwidget>` HTML element. The `<persistentwidget>` HTML element takes a `src` attribute, like an `iframe`.

Like, the persistence is an amazing idea, but isn’t an HTML element with a `src` to more HTML an HTML include?

---

## HTML-in-Canvas

*… and the award for the most out-of-nowhere amazing feature this year is …*

[**HTML-in-Canvas!**](/blog.master.dev/the-web-is-fun-again-first-experiments-with-html-in-canvas.md) That’s Amit Sheen introducing it right here on Master.dev.

The main idea is that you can, ya know, put HTML in Canvas

```xml
<canvas>
  <div class="some-content">
    ...
  </div>
</canvas>
```

Normally, a browser would just *not render* that inner HTML. And that’s still true, but with the `layoutsubtree` attribute and a little setup JavaScript code, we can paint that content onto the canvas.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a05321-5c38-7344-954d-a0d7438df61c"
  title="Very Basic Setup of HTML-in-Canvas"
  :default-tab="['css','result']"
  :theme="dark"/>

To me, it looks a little less crisp than regularly rendered HTML, but it’s still very impressive that it’s there at all and fully interactive.

Now that it’s rendered on canvas, you can do anything canvas can do. Trying to mouse around Amit’s demo here.

<CodePen
  link="https://codepen.io/amit_sheen/pen/GgjwyXR/3697eeeb173fa8b909f3dd69ae85af99"
  title="HTML-in-Canvas (Demo 09)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Commands & Invokers

[**Popovers are here, and those**](/blog.master.dev/popover-api-is-here.md) seem like they were the first to get an HTML-specific way to open and close them.

But that evolved into a more generic API for commands that feels like the future.

```html
<!-- Original way. Very clear and totally fine to use. -->
<button popovertarget="mypopover">Toggle the popover</button>
<div id="mypopover" popover>Popover content</div>

<!-- Using commands -->
<button commandfor="mypopover" command="toggle-popover">Toggle the popover</button>
<div id="mypopover" popover>Popover content</div>
```

Commands have some built-in magical values like:

- `show-modal`
- `request-close`
- `show-popover`
- `hide-popover`
- `toggle-popover`

But commands can be *custom* as well, where you use a custom ident to name it.

```html
<button commandfor="player" command="--play">Play</button>

<script>
  player.addEventListener('command', (e) => {
    if (e.command === '--play') { /* ... */ }
  });
</script>
```

That feels nice to me. Like your player is using a structured way of “listening to commands” rather than a DIY event listener thing of your own creation.

And speaking of these commands, we can now trigger them *without actually clicking on them.* This is called an [<VPIcon icon="fa-brands fa-firefox"/>“interest invoker”](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using_interest_invokers). I think it started life as an Augmented Reality device thing, where you can essentially click just by looking at something hard enough. But you aren’t clicking; you’re just showing interest. The version of that in our 2D web world is *hovering.* **So now we have hover-based HTML tooltips now, which is very cool.**

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ffc5e-e476-70e3-b310-3f44fc8b8c3f"
  title="Super basic hover tooltip with delays"
  :default-tab="['css','result']"
  :theme="dark"/>

**Honorable mention!** Popovers also [**have `popover="hint"` now**](/una.im/popover-hint.md), which is a special category of popover that retains “light dismiss” (i.e., click outside) and only closes other “hint” popovers when opened.

---

## The `<model>` Element

I’ll just [<VPIcon icon="fas fa-globe"/>quote Blake Crosley](https://blakecrosley.com/blog/html-model-element-apple-platforms#fn:1) here:

> [<VPIcon icon="fa-brands fa-apple"/>At WWDC 2026](https://developer.apple.com/videos/play/wwdc2026/215/), a Safari engineer dropped a 3D camping mallet onto an e-commerce product page with one tag, `<model>`, no JavaScript library, and let visitors rotate it with their finger.

Cool? I think? It’s at least got [<VPIcon icon="fas fa-globe"/>a draft spec](https://immersive-web.github.io/model-element/). I don’t know that much about it, but this feels very *shipped* to me, and I can’t imagine Apple has any intention of un-shipping it should the standards process not go well. So I worry about that kind of thing.

```xml
<model src="mallet.usdz">
  <source src="mallet.usdz" type="model/vnd.usdz+zip">
  <img src="mallet.jpg" alt="Camping mallet" width="480" height="480">
</model>
```

---

## The `focusgroup` Attribute

The Chrome gang has an experimental implementation (and is asking for feedback) on [<VPIcon icon="fa-brands fa-chrome"/>a `focusgroup` attribute](https://developer.chrome.com/blog/focusgroup-rfc). It’s used like this:

```html
<div focusgroup="toolbar wrap" aria-label="Formatting">
  <button>Bold</button>
  <button>Italic</button>
  <button>Underline</button>
</div>
```

Normally, you’d be able to tab through all these buttons. But apparently that’s not the ideal accessible behavior. You should be able to tab into *the whole group, then use arrow keys to move between the options.* Another tab press takes you away from the whole group.

This has typically been referred to as “[<VPIcon icon="iconfont icon-w3c"/>roving tabindex](https://w3.org/WAI/ARIA/apg/patterns/radio/examples/radio/)” when implemented with JavaScript that updates HTML attributes. But this makes the the implementation a lot easier.

---

## The `hidden="until-found"` Attribute

We’ve long had the `hidden` attribute. All by itself it tries to hide an element, although it’s [<VPIcon icon="fas fa-globe"/>as strong as a moderate sneeze](https://meowni.ca/hidden.is.a.lie.html). Now we can add another trick to it:

```html
<div hidden="until-found">
  I'm not visible unless on-page search finds me.
</div>
```

I think the most practical use of this is a “collapsible” section. Imagine an FAQ section on a support page where the questions are all collapsed (or tabbed), but you want users to still be able to search the page and find what they need, and have the page auto-expand items that might otherwise be visually hidden.

Although I say that, and that reeks of `<details>` usage, and `<details>` already auto-expands when something hidden is found with page search, so this attribute isn’t necessary there. So it’s more for DIY implementations.

---

## `<h1>` Sizing Changes

Simon Pieters explains a change in UA styles for our commander-in-header:

> The browser rendering was such that `section > h1` would have the same font-size and margin as `<h2>`. The `section > section > h1` would be represented as `<h3>`, and so on. […]
> 
> In general, this created confusion about where developers could use `<h1>` elements, tools handled the HTML differently, and the outline algorithm was considered problematic.

So they changed it. And by “they,” I mean all browsers did it.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/old-new-h1.jpg?resize=1024%2C614&ssl=1)

Before/After for `<h1>` font sizing within `<section>`s.

---

## Support for `sizes="auto"` on Images

[**Mat Marquis was happy to see this happen.**](/piccalil.li/blog/the-end-of-responsive-images.md)

> Fully automatic responsive images. Supply the browser with a list of candidates using `srcset`, bolt on `sizes="auto"`, and let the browser do the rest.

```html
<img
  src="photo-800.jpg"
  srcset="
    photo-400.jpg   400w,
    photo-800.jpg   800w,
    photo-1200.jpg 1200w,
    photo-1600.jpg 1600w
  "
  sizes="auto"
  loading="lazy"
  width="800"
  height="600"
  alt="Sunset over the Cascades"
>
```

The `sizes` attribute is *rough* to get right and maintain over time. Now we don’t need to if we can lazy load the image. Which you can’t if the image is in that first loaded viewport. But hey, it’s still pretty great. Maybe we should all do `body { padding-block-start: 100vb; }`. jkjk.

---

## Yay!

That’s kind of a lot, huh? I honestly didn’t think this article would be this big, but here we are. What did I miss? Any favorites?

```component VPCard
{
  "title": "Custom Select (that comes up from the bottom on mobile)",
  "desc": "You've got A LOT of control over the design of select menus now, and it can be done as a progressive enhancement.",
  "link": "/blog.master.dev/custom-select-that-comes-up-from-the-bottom-on-mobile.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "console.delight",
  "desc": "Everyone knows you can use console.log() to log text and variables to the console. Did you know you could also render (limited) CSS, SVGs, and even HTML in it?!? I didn't! It's a neat technique that can delight the curious and further your brand for curious users.",
  "link": "/blog.master.dev/console-delight.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Background Patterns with CSS `corner-radius`",
  "desc": "You might need to know this someday: you can style a div, put the div into SVG, then put the SVG in to CSS and use it as a repeating background.",
  "link": "/blog.master.dev/background-patterns-with-css-corner-radius.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "New Things You Should Know About HTML Here in Mid 2026",
  "desc": "You've got your permissions elements, custom element registries, a potential future for HTML includes, HTML-in-Canvas, and a bunch more.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/new-things-you-should-know-about-html-here-in-mid-2026.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
