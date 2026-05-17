---
lang: en-GB
title: "Croissant! Building a No-Framework Web App"
description: "Article(s) > Croissant! Building a No-Framework Web App"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - dbushell.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Croissant! Building a No-Framework Web App"
    - property: og:description
      content: "Croissant! Building a No-Framework Web App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/croissant-no-framework-web-app.html
prev: /programming/js-node/articles/README.md
date: 2025-07-11
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-07-11-croissant-no-framework-web-app.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Croissant! Building a No-Framework Web App"
  desc="The one where I animate a favicon with googly eyes (and build a web app)"
  url="https://dbushell.com/2025/07/11/croissant-no-framework-web-app/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-07-11-croissant-no-framework-web-app.png"/>

If you [<VPIcon icon="fas fa-globe"/>subscribe to my notes](https://dbushell.com/notes/2025-07-03T06:24Z/) you’ll know I’ve gone a little crazy building an RSS aggregator [<VPIcon icon="fa-brands fa-firefox"/>web app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app)[^1] over the past week. My side project [<VPIcon icon="fas fa-globe"/>code-named Croissant](https://dbushell.com/notes/2025-07-04T16:20Z/) has been a delightful challenge. Working with web standards is wonderful!

![a croissant emoji with googly eyes](https://dbushell.com/images/blog/2025/croissant-logo.png)

Cute, innit?

I planned nothing which is why I went on a side quests involving [<VPIcon icon="fas fa-globe"/>animated favicons](https://dbushell.com/notes/2025-07-08T14:38Z/) and [<VPIcon icon="fas fa-globe"/>interactive emojis](https://dbushell.com/notes/2025-07-09T17:00Z/). Eventually I progressed and built the minimum required features to read a blog feed. I’m now dogfooding version zero of Croissant for a month (or two) to discover and fix all the inevitable bugs.

I’ve documented the process so far. This is only a week of part time dev so my thoughts and ideas below are not concrete. The refactor fairies are beckoning!

Feel free to skip the boring parts. The penultimate topic is an incoherent snoozefest.

---

## Design

This entire project started in **CodePen** where I mocked up [typographic styles (<VPIcon icon="fa-brands fa-codepen"/>`dbushell`)](https://codepen.io/dbushell/full/bNdybBN) I find readable. Dark mode is a priority for me. (The CodePen is a little outdated now.)

I had no other design plans in mind as I built functionality. I think it turned out okay! Articles open in a full page dialog with no distractions. I’ve grown to detest the multi-column layout of most RSS readers. They all look like email inboxes and feel like a chore.

![screenshot of the croissant web app](https://dbushell.com/images/blog/2025/croissant-screenshot.avif)Alt

screenshot of the croissant web app

Croissant is the second best place to read the [<VPIcon icon="fas fa-globe"/>Piccalilli blog](https://piccalil.li/blog/)

Lack of planning leads to creative distractions.

Eventually I’d like to make Croissant themeable which is my excuse for such a sparse design.

![Croissant reading this very blog post!](https://dbushell.com/images/blog/2025/croissant-dialog-screenshot.avif)Alt

Croissant reading this very blog post!

Wait what is this inception…

---

## No Build

This was a big gamble. After months of [**SvelteKit**](/dbushell.com/vibe-free-sveltekit-for-fun-and-profit.md) (and even some [<VPIcon icon="fas fa-globe"/>React](https://jsx.lol/)) I’m sick of frameworks! I’m using no build tools and no frameworks for this project. And definitely [**no “AI”**](/dbushell.com/ai-policy.md). I have a text editor and a web server that points to `index.html`. No compilation. Web standards shipped straight to web browsers. Can you imagine?

I’m using [<VPIcon icon="fas fa-globe"/>JSDoc comments](https://jsdoc.app/) to provide the illusion of type safety. That said, TypeScript is already an illusion, so JSDoc is more like an illusion of an illusion. I’ve found myself making errors TypeScript would have caught. Does that mean TypeScript is good, or I have deskilled myself?

Bundles are overrated. I’m using a service worker to control cache for local-first offline support. The initial download is small due to no framework. Multiple imports are cached forever. Seriously, anyone know how to invalidate service workers?

---

## Proxy Server

Croissant needs to handle the [<VPIcon icon="fa-brands fa-wikipedia-w"/>RSS](https://en.wikipedia.org/wiki/RSS), [<VPIcon icon="fa-brands fa-wikipedia-w"/>Atom](https://en.wikipedia.org/wiki/Atom_%28web_standard%29), and [<VPIcon icon="fa-brands fa-wikipedia-w"/>JSON](https://en.wikipedia.org/wiki/JSON_Feed) specs. I have to proxy requests via the server to avoid [<VPIcon icon="fa-brands fa-firefox"/>CORS errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) in the browser. I threw together a proof of concept Deno server to handle the proxy alongside serving the website itself. I want to rewrite the server in [<VPIcon icon="iconfont icon-zig"/>Zig](https://ziglang.org/)[^2]

but that is a bigger project. The server also normalises data into a JSON format.

[<VPIcon icon="fas fa-globe"/>My feeds](https://dbushell.com/notes/2025-04-29T14:05Z/) have the `Access-Control-Allow-Origin: *` header, **do yours?** 🫵😠

These specifications are merely suggestions. Adhering to strict XML is an unpopular choice. I learnt that with [**podcast RSS**](/dbushell.com/deno-kv-to-sqlite.md). I just assume every feed is an amalgamation and bastardisation of multiple specs. My own feeds are a perfect example. I’ve no idea what I’m doing.

The Croissant server does nothing more than serve static web assets and proxy feeds.

---

## Sanitising HTML

Most RSS feed content is HTML (at least those I subscribe to). An RSS reader can just yolo this HTML into a web page. That opens the barn door for XSS ([<VPIcon icon="fa-brands fa-wikipedia-w"/>cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting)).

At first I tried to sanitise HTML on the server but I realised that was dumb. Web browsers are the best [**HTML parsers**](/dbushell.com/html-parser-conundrum.md). They provide free DOM APIs that are vastly superior to any server-side library. I discovered a few in-browser techniques that I believe are bulletproof! 🤞

### Safe Strings

Sanitising text using browser APIs is easy (I hope). All that is required is to strip unencoded HTML tags. Below is a basic example.

```js
const tmp = document.createElement("template");
const bad = '<style>*{display:none;}</style>';
tmp.innerHTML = bad;

const p = document.createElement("p");
p.textContent = tmp.content.textContent;

console.log(p);
```

This will effectively strip the `<style>` tags. A safe albeit confusing paragraph with the text “\*{display:none;}” is all that remains.

If the bad string had `<` and `>` encoded as HTML entities, `&amp;lt;` and `&amp;gt;` respectively, we’d see HTML in the paragraph as text rather than a `<style>` element injected into the DOM.

Setting `p.textContent` is important for this to work safely. If we set `p.innerHTML` instead of `p.textContent` (line 6 above) it leaves the door open for XSS again.

```js
// ⚠️ MISTAKE: do not set innerHTML!
p.innerHTML = tmp.content.textContent;
```

To abuse that mistake an attacker could encode the HTML tags as entities.

```js
const bad = '&lt;style&gt;*{display:none;}&lt;/style&gt;';
```

Then `tmp.content.textContent` becomes the decoded HTML. Using `p.innerHTML` by mistake will inject unsafe HTML into the page.

```html
<style>*{display:none;}</style>
```

This style renders the page invisible but it could be more nefarious. If the attacker tries to use a `script` element browsers are smart enough not to execute the script.

```js
const bad = '&lt;script&gt;console.log("test");&lt;/script&gt;';
```

Scripts won’t execute, thankfully!

I also discovered it was critical to use `template` and not `div` or any other temporary element. Consider these two examples.

```js
const tmp1 = document.createElement('div');
tmp1.innerHTML = '<img src="evil.png">';

const tmp2 = document.createElement('template');
tmp2.innerHTML = '<img src="evil.png">';
```

If you try the first example using a `div` element you’ll see a network request for `evil.png`. This happens immediately even if the element is never attached to the DOM.

Key lessons:

- Use `template` as a placeholder
- Use `textContent` to avoid XSS

That should be enough for sanitised text.

### Safe HTML

The example above strips raw HTML from text content. That’s perfect for article titles. What about safe HTML for the main body? Maintaining format and semantics is important. For that a similar `template` placeholder can be used. Below is the basic setup.

```js
const allowedTags = new Set(['p']);

const template = document.createElement("template");
template.innerHTML = `<p>Hello, <b>World!</b></p>`;

const sanitizeNode = (parent) => {
  for (const node of [...parent.childNodes]) {
    // Allow text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      continue;
    }
    // Remove all other non-elements
    if (node.nodeType !== Node.ELEMENT_NODE) {
      node.remove();
      continue;
    }
    const tagName = node.tagName.toLowerCase();
    if (allowedTags.has(tagName) === false) {
      node.remove();
      continue;
    }
    sanitizeNode(node);
  }
};

sanitizeNode(template.content);

console.log(template.innerHTML);
```

This example logs:

```html
<p>Hello, </p>
```

`sanitizeNode` is a recursive function that iterates over all child nodes and removes any that are not specfically allowed. I extended this function to loop over attributes too in a similar fashion. From here I added to the list of allowed tags and attributes until content was readable.

This approach is effectively how [DOM Purify (<VPIcon icon="iconfont icon-github"/>`cure53/DOMPurify`)](https://github.com/cure53/DOMPurify) works if you need a general purpose library.

I added a few extra steps to:

- convert relative URLs to absolute
- wrap table elements in a scrollable container
- add controls to all audio and video elements
- wrap top-level text nodes in paragraphs
- remove empty paragraphs

I subscribe to a lot of web developer blogs and some of their HTML is shocking! I suspect I’ll be adding edge cases to fix terrible HTML for a while. (I found mistakes in my own…)

### Safe Encoded HTML

The technique above works if feeds put their HTML inside [<VPIcon icon="fa-brands fa-wikipedia-w"/>CDATA](https://en.wikipedia.org/wiki/CDATA).

```html
<description>
  ﹤![𝖢𝖣𝖠𝖳𝖠[<h1>Hello, World!</h1>]]﹥
</description>
```

I’ve purposefully used alternate Unicode characters in that example because XML can’t nest CDATA and my hand-rolled script to generate my own RSS feed is an abomination!

Just strip the CDATA tags. There is, to no surprise, no guarantee where to find the HTML. It may be `<description>` or `<summary>` or `<content>` or elsewhere. Some authors skip the CDATA and “rawdog” HTML inside XML. Hence the requirement for loose parsing.

Other authors encode with HTML entities.

```jsx
<content>
  &lt;h1&gt;Hello, World!&lt;/h1&gt;
</content>
```

How do I know if that is intended to be decoded as an `<h1>` element, or if the author intends to write the text “`<h1>Hello, World!</h1>`” with the tags visible?

I use the logical assumption that if the entire content is encoded with HTML entities it’s intended to be decoded. I can check that by counting DOM nodes.

```js
const template = document.createElement("template");
template.innerHTML = `&lt;h1&gt;Hello, World!&lt;/h1&gt;`;

if (
  template.content.childNodes.length === 1 &&
  template.content.childNodes[0].nodeType === Node.TEXT_NODE
) {
  template.innerHTML = template.content.childNodes[0].nodeValue;
}

console.log(template.innerHTML);
```

In the example above I check if there is a single text node. The browser has parsed for HTML and it effectively guarantees there is no unsafe HTML hidden within. This allows me to then set the otherwise dangerous `template.innerHTML` to that text node value. The browser decodes the HTML entities for me resulting in the desired DOM I can sanitise.

There’s a gotcha here!

Text nodes have a maximum length of 65,536 (2^16). That means browsers use a two byte integer to store character length. If a blog ~post~ essay exceeds that length it gets split into multiple text nodes. The fix is to the check all nodes are text whilst concatenating the values.

If an author intends to write visible HTML they must double-encode.

```jsx
<content>
  &amp;lt;h1&amp;gt;Hello, World!&amp;lt;/h1&amp;gt;
</content>
```

This will decode into a text node with the value “<h1>Hello, World!</h1>” and not an `<h1>` element. Presumably most feeds are generated by tooling that handles this.

Despite all this effort some feed markup is hopeless. I’ve tested over 150 feeds and found only two I cannot present nicely.

::: note Update

forgot to mention the [<VPIcon icon="fa-brands fa-firefox"/>Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) and [<VPIcon icon="fa-brands fa-firefox"/>HTML Sanitizer](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API) browser APIs that’ll soon make this trivial. Thanks to [<VPIcon icon="fa-brands fa-bluesky"/>`@eldersouza.me`](https://bsky.app/profile/eldersouza.me/post/3ltoysyzqs22z) on Bluesky for the reminder.

:::

---

## Shadow DOM Styles

I’ve only ever dabbled with the light DOM approach for [<VPIcon icon="fas fa-globe"/>“HTML Web Components”](https://blog.jim-nielsen.com/2023/html-web-components/).

On this project I opted for a mix of [**Declarative Shadow DOM**](/web.dev/declarative-shadow-dom.md) for the app skeleton, i.e. elements always visible (header, menu, etc), and pure Shadow DOM for elements that will come and go; basically list items.

Styling these components proved quiet a challenge. I’m rather stubborn. I assume I know how CSS works and [<VPIcon icon="fas fa-globe"/>blame everyone](https://dbushell.com/notes/2025-07-06T08:11Z/) but myself [<VPIcon icon="fas fa-globe"/>when it doesn’t](https://dbushell.com/notes/2025-07-07T13:47Z/). Eventually I figured out how CSS like `:host`, `::part`, and `@scope` works (I read the spec).

My next enemy was FOUC (Flash of Unstyled Content). I tried the following methods with increasing levels of success:

1. inline `<style>` with `@import` statements
2. inline `<style>` with CSS
3. [<VPIcon icon="fa-brands fa-firefox"/>Adopted Stylesheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets)

Because my project is “no build”, and the fact that I can’t live without CSS imports, I tried inline CSS with multiple `@import` statements. This performed poorly.

**Chris Ferdinandi** had issue with [<VPIcon icon="fas fa-globe"/>micro CSS imports](https://gomakethings.com/modular-css-redux/) recently. I have relatively few and they’re cached by a service worker. Despite that the FOUC was still noticeable. For long lists of 100+ custom elements each with their own `<style>` the browser ground to a halt.

Next I tried fetching the imports upfront and using a single inline `<style>`. This performed better but not good enough. The FOUC remained regardless of how many elements I had.

Finally, thanks to **Dave Rupert** on the timely [<VPIcon icon="fas fa-globe"/>ShopTalk `#672`](https://shoptalkshow.com/672/) I learnt of adopted stylesheets. I prefetch the CSS and create one `CSSStyleSheet` in JavaScript per custom element type which gets adopted by all instances. This means the browser doesn’t repeatedly parse the same inline styles. This fixed both the FOUC issue and the slow renders.

---

## State and Reactivity

::: note ⚠️

I’m still experimenting with web components and reactivity. The notes below are a bit of a mess. Hopefully a somewhat comprehensible mess!

:::

I tried [Preact Signals (<VPIcon icon="iconfont icon-github"/>`preactjs/signals`)](https://github.com/preactjs/signals/tree/main/packages/core) which can be used as a tiny stand-alone library. The ergonomics were nice. I’d like a way to make signals read-only outside of the component or source that “owns” them. I’ll return to the signals idea when I have more free time.

For now I’m using good old [<VPIcon icon="fa-brands fa-firefox"/>Custom Events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events). Components are either responsible for themselves, or parents are responsible for their direct children. I have a global store that is a wrapper around [<VPIcon icon="fas fa-globe"/>Dexie](https://dexie.org/) which is itself a wrapper of [<VPIcon icon="fas fa-globe"/>IndexedDB](https://dbushell.com/notes/2025-07-05T16:43Z/). I’ve allowed myself [**plug-and-play libraries**](/dbushell.com/frameworks-vs-libraries.md#anyway-libraries) but no frameworks.

As an example, I have an `<rss-list>` element that renders a list of `<rss-item>` children. That element decides what items to show based on a custom event. Below is a reduced code example to illustrate this idea.

```jsx
import { store } from "./store.js";
import BaseComponent from "./base.js";

export class Component extends BaseComponent {

  connectedCallback() {
    this.subscribe("rss:route", this.#onRoute);
  }

  /** @param {CustomEvent<URL>} ev */
  async #onRoute(ev) {
    if (ev.detail.pathname === "/") {
      const items = await store.getItemsUnread();
      this.render(items);
      return;
    }
    if (ev.detail.pathname === "/today/") {
      const items = await store.getItemsRange();
      this.render(items);
      return;
    }
  }
}
```

The `rss:route` event is dispatched from the `<rss-menu>` element when a menu item is clicked. The `render` method (not shown) of `<rss-list>` is just DOM manipulation to add or remove `<rss-item>` children based on store data. Another event listener elsewhere reacts to the same event and updates the [<VPIcon icon="fa-brands fa-firefox"/>History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

I created a base class inspired by [<VPIcon icon="fas fa-globe"/>Mayank’s base element](https://mayank.co/blog/custom-element-base/). This provides common boilerplate setup and methods. As you can see I’m mixing the “custom element” and “web component” terminology that [<VPIcon icon="fas fa-globe"/>Mayank would frown upon](https://mayank.co/blog/web-components-considered-harmful/). Sorry!

If you’re curious the base element includes the following goodies.

```jsx
export default class BaseComponent extends HTMLElement {

  #subscriptions = [];

  disconnectedCallback() {
    this.unsubscribe();
  }

  subscribe(type, callback, target = globalThis) {
    const fn = (ev) => callback.call(this, ev);
    this.#subscriptions.push([type, fn, target]);
    target.addEventListener(type, fn);
  }

  unsubscribe() {
    for (const [type, fn, target] of this.#subscriptions) {
      target.removeEventListener(type, fn);
    }
    this.#subscriptions.length = 0;
  }

  dispatch(type, detail) {
    super.dispatchEvent(
      new CustomEvent(type, {
        detail,
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );
  }
}
```

The `subscribe` method is used to track `addEventListener` usage. This allows event handlers to be removed automatically when the element is disconnected from the DOM. The `dispatch` method is another simple wrapper to ensure custom events bubble up through all nested shadow DOMs.

I’ve found the use of a global store and custom events to be very effective. It bypasses the “prop drilling” nightmare that is React. Replicating “props” with custom element attributes is a bad idea. Yeah, I know modern React state libraries achieve similar. Why use React to begin with just to work around one of its core design failures?

Dexie has a “live query” feature that allows me to dispatch an event when new content is synced. The nature of my web app means that data is mostly static. I don’t need much fine grained reactivity. This is a blessing because DOM manipulation can be tedious.

**Justin Fagnani** asked recently: [“What should a native DOM templating API look like?”](https://justinfagnani.com/2025/06/30/what-should-a-dom-templating-api-look-like/) Native templating of some form would be nice. The [TC39 Signals proposal (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-signals`)](https://github.com/tc39/proposal-signals) looks promising. If we had data binding to DOM nodes, via signals or otherwise, I don’t think we need a “native JSX”.

I have a lot to explore in this area but I’m feeling good about the direction.

“Web components” don’t exist the way frameworks define components. We have primitives like [<VPIcon icon="fa-brands fa-firefox"/>custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), custom events, and hopefully new APIs like signals that’ll make the “no build” approach increasingly feasible.

I can’t pretend all front-end frameworks are as obsolete as React. I still think tools like [<VPIcon icon="iconfont icon-svelte"/>Svelte](https://svelte.dev/) have a place. They’re easier to work with “at scale” — i.e. something with more interactive UI than an RSS reader. I hate on React specifically because there is an *entire generation* of React developers that have never coded with web standards. React gets touted as the only solution and yet over a decade of use has shown it solves nothing in reality.

I’m not thrilled with Dexie but it does the job (so far). I need a web native database. That means IndexedDB and I’d prefer not to touch its [<VPIcon icon="fas fa-globe"/>irredeemably miserable API](https://dbushell.com/notes/2025-07-05T16:43Z/) with my own hands. Bring back Web SQL I say!

---

## Open Source

I know it’s really lame but Croissant and the source is not available yet. Boooo!

I’m in two minds whether or not to stay on GitHub. Ensloppification and all that. I’ll publish code somewhere soon. I need time to test and package it in a usable state. My initial idea was to release it as a self-hosted container. I’ll look at the feasibility of packaging an [<VPIcon icon="iconfont icon-electron"/>Electron](https://electronjs.org/) or [<VPIcon icon="fas fa-globe"/>Tauri](https://tauri.app/) app. I might even charge $5 bucks!

Theoretically I could host a version on the new Deno Deploy. [**Wouldn’t that be ironic!**](/dbushell.com/denos-decline.md) Does my CORS proxy fall foul of their [<VPIcon icon="iconfont icon-deno"/>acceptable use policy?](https://docs.deno.com/deploy/manual/acceptable-use-policy/#not-acceptable-use)

For my own use I will [**self-host in Proxmox**](/dbushell.com/self-hosted-update-spring-2025.md). I use Tailscale to make stuff available outside my LAN. All data is client-side which does present a problem. How do I sync subscriptions and read/unread state between browsers? I have a feeling I won’t like the answer.

Croissant is going to be super opinionated because it’s designed for myself. It won’t be a collaborative project accepting PRs because I don’t want the maintenance burden.

More on that later! If I run into any major hurdles I may still bin it.

You’ve made it this far which can’t go unrewarded. Take this gift: [Googly Eyes mouse tracking CodePen! (<VPIcon icon="fa-brands fa-codepen"/>`dbushell`)](https://codepen.io/dbushell/full/gbaYyEm) Don’t you dare click that if you skipped any topics!

::: note Update for 18th July 2025

[**Croissant is Coming for You**](/dbushell.com/croissant-is-coming-for-you.md) 🥐

:::

[^1]: see: Website.
[^2]: A low-level programming language with no hidden control flow and no hidden memory allocations.

::: info Sources on 'Progressive Web App'

<SiteInfo
  name="What is a progressive web app? - Progressive web apps | MDN"
  desc="A progressive web app (PWA) is an app that's built using web platform technologies, but that provides a user experience like that of a platform-specific app."
  url="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

<SiteInfo
  name="Progressive web apps"
  desc="If you’re thinking of making a native app, think again."
  url="https://adactio.com/journal/22074/"
  logo="https://adactio.com/favicon-16x16.png"
  preview="https://adactio.com/images/photo-300.jpg"/>

:::

::: info Sources on 'Zig'

```component VPCard
{
  "title": "Home ⚡ Zig Programming Language",
  "desc": "Zig is a general-purpose programming language and toolchain for maintaining robust, optimal and reusable software.",
  "link": "https://ziglang.org",
  "logo": "https://ziglang.org/favicon.svg",
  "background": "rgba(247,164,29,0.2)"
}
```

<SiteInfo
  name="Ziggit - A Zig community"
  desc="A community for anyone interested in the Zig Programming Language."
  url="https://ziggit.dev/"
  logo="https://ziggit.dev/uploads/default/optimized/1X/3417db0e8abaf83a355700b91efd528025492487_2_32x32.png"
  preview="https://ziggit.dev/uploads/default/original/1X/3417db0e8abaf83a355700b91efd528025492487.png"/>

<SiteInfo
  name="Welcome | zig.guide"
  desc="Get started with the Zig programming language. Zig is a general-purpose programming language and toolchain for maintaining robust, optimal, and reusable software."
  url="https://zig.guide/"
  logo="https://zig.guide/img/favicon.ico"
  preview="https://zig.guide/img/docusaurus-social-card.jpg"/>

```component VPCard
{
  "title": "Learning Zig",
  "desc": "Welcome to Learning Zig, an introduction to the Zig programming language. This guide aims to make you comfortable with Zig. It assumes prior programming experience, though not in any particular language.",
  "link": "https://openmymind.net/learning_zig/",
  "logo": "https://openmymind.net/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

<SiteInfo
  name="Programming with Zig: From Basics to Mastery"
  desc="Table of Contents 1. Introduction to Zig: History, Philosophy, and Getting Started  The origins of Zig Core design principles Comparison with other languages (C"
  url="https://gencmurat.com/en/pages/programming-with-zig//"
  logo="https://gencmurat.com/logo.svg"
  preview="https://gencmurat.com/icon512.png"/>

```component VPCard
{
  "title": "Introduction to Zig",
  "desc": "Welcome! This is the initial page for the “Open Access” HTML version of the book “Introduction to Zig: a project-based book”, written by Pedro Duarte Faria. This is an open book that provides an introduction to the Zig programming language, which is a new general-purpose, and low-level language for building robust and optimal software.",
  "link": "https://pedropark99.github.io/zig-book/",
  "logo": "https://pedropark99.github.io/favicon.ico",
  "background": "rgba(79,115,232,0.2)"
}
```

```component VPCard
{
  "title": "Zig Cookbook",
  "desc": "Zig cookbook is a collection of simple Zig programs that demonstrate good practices to accomplish common programming tasks.",
  "link": "https://cookbook.ziglang.cc/",
  "logo": "https://cookbook.ziglang.cc/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Croissant! Building a No-Framework Web App",
  "desc": "The one where I animate a favicon with googly eyes (and build a web app)",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/croissant-no-framework-web-app.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
