---
lang: en-US
title: "A Nice Vanilla App Archicture Using Web Components and CSS Module Scripts"
description: "Article(s) > A Nice Vanilla App Archicture Using Web Components and CSS Module Scripts"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Nice Vanilla App Archicture Using Web Components and CSS Module Scripts"
    - property: og:description
      content: "A Nice Vanilla App Archicture Using Web Components and CSS Module Scripts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/architecture-through-component-colocation.html
prev: /programming/js-node/articles/README.md
date: 2025-08-11
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6712
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
  name="A Nice Vanilla App Archicture Using Web Components and CSS Module Scripts"
  desc="CSS module scripts help keep the dream of co-locating files that all relate to a component, without needing a bundler. "
  url="https://frontendmasters.com/blog/architecture-through-component-colocation/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6712"/>

It’s an established Good Idea™ that building digital interfaces of any kind is best done by building components and then piecing together the interfaces from those components. This can be sliced and diced a lot of ways, but generally: a component is a reasonable independent peice of what that interface needs. When it comes to websites, things like a header, footer, grid, card, button, etc. A design system, as it were. See concepts like [<VPIcon icon="fas fa-globe"/>Atomic Design](https://atomicdesign.bradfrost.com/).

A nice by-product of the Rise of JavaScript Frameworks is that they solidified this idea. React, Vue, Svelte… you work with them by building components and composing them together. That’s their point.

I like the idea of userland tools like JavaScript frameworks pushing the boundaries, then the web evolving to not require those tools. *So can we pull off a component-structured project without any build process or framework?* We’re close.

![This is an example of how I’d like to structure a website](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-09-at-1.19.58-PM.png?resize=488%2C462&ssl=1)

Those components (in our simple example, a button, card, and header) are all:

- Inside a `components` folder, each with their own named folder (organized!)
- Have a file for their template and logic
- Have a separate CSS file

![So like this](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-09-at-10.59.43-AM.png?resize=480%2C546&ssl=1)

This is the kind of logical grouping and isolation that makes sense to me in creating a component architecture. A more complex setup might have components with, say, <VPIcon icon="iconfont icon-graphql"/>`.graphql` files, their own images, tests, etc. The co-location is key to sanity.

Our components are JavaScript here because there is [**no concept of HTML includes yet**](/frontendmasters.com/seeking-an-answer-why-cant-html-alone-do-includes.md), but also that [<VPIcon icon="fa-brands fa-firefox"/>web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) are a generally nice way to handle this anyway, and they require JavaScript instantiation. We don’t need any framework to use web components (hence “vanilla app architecture”), but in the demo, I’ll use [<VPIcon icon="fas fa-globe"/>Lit](https://lit.dev/) (just a light helper library).

How do we integrate those <VPIcon icon="fa-brands fa-js"/>`component.js` and <VPIcon icon="fa-brands fa-css3-alt"/>`component.css` files? That question has long lingered for me. Bundlers can do this job. For instance, webpack just invented their own way of dealing with it. If you type `import "./card.css";` in a JavaScript file that is processed by webpack, it’ll just know what you mean and ensure that CSS is loaded on the page somehow. Likewise, [<VPIcon icon="iconfont icon-vite"/>Vite just does it’s own thing](https://vite.dev/guide/features.html#css):

> Importing `.css` files will inject its content to the page via a `<style>` tag with HMR support.

That’s great and all, but we’re trying to go vanilla here. No bundler/build process. How do we import CSS like that?

---

## Enter CSS Module Scripts

**Good news:** JavaScript has an answer to that question we just asked, and it’s called [<VPIcon icon="fas fa-globe"/>CSS Module Scripts](https://web.dev/articles/css-module-scripts).

**Bad news:** Only Chrome supports it. ([<VPIcon icon="iconfont icon-webkit"/>WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=227967); [<VPIcon icon="fa-brands fa-firefox"/>Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1720570))

Google’s blog post on them (linked above) is one of the few pieces of information available about them, and it contains some **_incorrect syntax_**, so be careful there. It should look like this (the `with` keyword is correct, if you see `assert` that’s old/wrong):

```js
import sheet from './styles.css' with { type: 'css' };
```

When you do that (in a supporting browser), `sheet` becomes a “Constructable Stylesheet” and then you can use it to, in our case, apply it to the Shadow Root of a web component.

```js
class MyComponent extends HTMLElement {
  constructor() {
    super(); 
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.adoptedStyleSheets = [sheet];
  }
  
  //...
}
```

These “import attributes,” as I think they are called, can do other things. It’s much better supported to import JSON this way, like:

```js
import sheet from './data.json' with { type: 'json' };
```

### Lit

Using [<VPIcon icon="fas fa-globe"/>Lit](https://lit.dev/), applying the styleheet (or, “the constructable stylesheet, as imported via CSS module scripts” to do the whole mouthful) is like this:

```js
import {html, LitElement} from 'lit';
import sheet from './button.css' with { type: 'css' };

class My Component extends LitElement {
  static styles = [sheet];

  // ...
}
```

---

## Demo

<CodePen
  user="anon"
  slug-hash="XJmppKN"
  title="Basic Demo for CSS Module Scripts in Web Components"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Nice Vanilla App Archicture Using Web Components and CSS Module Scripts",
  "desc": "CSS module scripts help keep the dream of co-locating files that all relate to a component, without needing a bundler. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/architecture-through-component-colocation.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
