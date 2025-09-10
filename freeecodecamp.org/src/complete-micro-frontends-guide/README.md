---
lang: en-US
title: "The Micro-Frontend Architecture Handbook"
description: "Article(s) > The Micro-Frontend Architecture Handbook"
icon: fa-brands fa-node
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Micro-Frontend Architecture Handbook"
    - property: og:description
      content: "The Micro-Frontend Architecture Handbook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/complete-micro-frontends-guide/
prev: /programming/js-react/articles/README.md
date: 2025-06-06
isOriginal: false
author:
  - name: Andrew Maksimchenko
    url : https://freecodecamp.org/news/author/codelikeandrew/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748915817752/b35a8786-9aa7-46cd-a1d8-f82069470496.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Micro-Frontend Architecture Handbook"
  desc="Over the years, in my role as a lead full-stack developer, solutions architect, and mentor, I’ve been immersed in the world of micro frontend architecture, working across different large-scale frontend projects where multiple teams, stacks, and deplo..."
  url="https://freecodecamp.org/news/complete-micro-frontends-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748915817752/b35a8786-9aa7-46cd-a1d8-f82069470496.png"/>

Over the years, in my role as a lead full-stack developer, solutions architect, and mentor, I’ve been immersed in the world of micro frontend architecture, working across different large-scale frontend projects where multiple teams, stacks, and deployment pipelines had to coexist somehow.

As projects grew in complexity and teams worked in parallel across different stacks, it became clear that monolithic approaches couldn’t keep up. I needed practical tools that allowed easy cross-app interaction, independent deployability, better team autonomy, framework-agnosticism, and more. Some solutions worked elegantly in theory but struggled in real-world conditions. Others made things messier and more painful than helpful.

After diving deep into different paradigms—from iframes to Web Components, single-spa, Module Federation, Piral, Luigi, and hybrid setups—I even distilled my proven experience into a full-fledged online course on Udemy.

And today, in this comprehensive hands-on tutorial, I want to share my expertise and tell you more about micro-frontend architecture—method by method—with code, tradeoffs, visuals, and real-world insights.

---

## Table of Contents

(1/6) [What are Micro Frontends For?](#heading-what-are-micro-frontends-for)
(2/6) [Method #1: Iframes & Cross-Window Messaging](#heading-method-1-iframes-amp-cross-window-messaging)
(3/6) [Method #2: Web Components (Custom Elements + Shadow DOM)](#heading-method-2-web-components-custom-elements-shadow-dom)
(4/6) [Method #3: Single-SPA — The Meta-Framework Approach](#heading-method-3-single-spa-the-meta-framework-approach)
(5/6) [Method #4: Module Federation - Sharing Code at Runtime](#heading-method-4-module-federation-sharing-code-at-runtime)
(6/6) [Other Tools & Ecosystem Additions](#heading-other-tools-amp-ecosystem-additions)

---

## What are Micro Frontends For?

In traditional frontend development, we often build single, monolithic apps—one codebase, one repo, one deployment pipeline, one team. It works great for small to medium projects, sometimes even for larger ones.

![Monolith App Diagram - Three Features in React](https://cdn.hashnode.com/res/hashnode/image/upload/v1748770222181/fb73c7ce-366f-4897-9ab7-b208c6e37cfa.png)

But challenges arise when:

- Your frontend codebase expands beyond 50+ components.
- Multiple development teams need autonomy over different parts and tech stacks.
- Different sections require varying deployment frequencies (weekly or monthly).
- You need to integrate diverse frameworks, like combining React features with an Angular-based CMS.

This is where micro frontends step in.

Micro frontends extend the principles of microservices to the frontend world. Instead of one big frontend app, you build independent frontend modules, each owned by a team, using its own tech stack, deployed separately, and integrated at runtime.

![Micro-Frontends App Diagram - Three Apps in React, Angular, Vue](https://cdn.hashnode.com/res/hashnode/image/upload/v1748770253697/c78a8d84-a6a9-42af-90fd-423983c7ec77.png)

Think of it like Lego blocks:

- Each block is similar to a self-contained micro frontend.
- They plug into a shared layout or shell.
- Each can evolve, update, or be replaced without affecting the others.

For example, imagine that you’re building a modern e-commerce site, and here’s what your business side expects from you:

| `Section` | `Team` | `Stack` | `Deployment` |
| --- | --- | --- | --- |
| Product Listing | Search Team | React | Weekly |
| Product Details | Catalog Team | Angular | Monthly |
| Cart & Checkout | Checkout Team | Vue | Biweekly |
| CMS Pages | Marketing Team | Vanilla JS | Daily |

Each team wants autonomy, and with micro frontends, each of these sections becomes a separate app, loaded dynamically into a shell at runtime.

### Why It’s Getting Popular?

Here are a few things everyone considers:

1. **Independent deployments** - A little or no effort to coordinate every release.
2. **Team autonomy** - Teams choose their own stack and tools on the project.
3. **Incremental upgrades** - Migrate legacy apps piece by piece incrementally without the need to rewrite the whole app at once.
4. **Technical agnosticism** - Vue, React, Angular? Doesn’t matter. They can all work together seamlessly at the same time in a single app.
5. **Better scalability** - Parallelize work across teams to enable efficiency of delivery and scale at ease.

Now let’s discover how we can bring this idea to life in our projects.

Nowadays, there are different ways to achieve that, but not all solutions are equal. The implementation method you choose will drastically affect:

- Developer experience
- Bundle sizes and performance
- SEO and accessibility
- Runtime stability
- Interoperability across stacks

So let’s begin by exploring the oldest, but still surprisingly viable method.

---

## Method #1: Iframes & Cross-Window Messaging

You may ask, “Aren’t iframes bad?” They’re often misunderstood. While yes, iframes can feel clunky and isolated, they’re also the most secure and decoupled way to host micro frontends—especially when you don’t trust the team on the other side.

![Micro-Frontend Method 1 - Iframes](https://cdn.hashnode.com/res/hashnode/image/upload/v1748770863603/9daefd01-22ac-413f-bf54-c339bb6e4e9e.png)

### What Is an IFRAME?

An [<VPIcon icon="fa-brands fa-firefox"/>iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) (inline frame) is an HTML element that allows you to embed another HTML page within your current webpage. The whole communication between apps is strictly based on events and delivered by means of the [<VPIcon icon="fa-brands fa-firefox"/>Post Message API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

If you need to send data to another app, you simply call the `postMessage()` method on that element. On the other side, to receive a message, you just have to subscribe to the `message` event. That’s it.

### Real-World Example

Let’s see a simple example of two apps communicating with each other using `iframes` on two apps:

- The Main Web App
- A Search App.

Every iframe must be hosted somewhere to serve static content from it. It can be AWS Amplify, Digital Ocean, Heroku, GitHub Pages, or alike.

To help you out here, [<VPIcon icon="iconfont icon-github"/>here’s an official GitHub guideline](https://pages.github.com) explaining how to host a website on their platform.

Let’s say you deployed a Search App on Github Pages and you were given this URL to host your app: `https://example.github.io`. Now let’s write some content for it.

Assuming that you want to post messages from the Search App to the Main Web App, and to subscribe to the incoming messages from it there. You can do it in this way:

```js
console.log('Initializing Search App...');

// Subscribe to messages from outside the iframe (like Main Web App)
window.addEventListener('message', (event) => {
  if (event.data?.type === 'init') {
    console.log('Main Web App passed userId:', event.data.userId);
  }
});

// Simulate sending Search results back to Main Web App
window.parent.postMessage({
  type: 'searchResult',
  payload: ['Item A', 'Item B']
}, '*');
```

Here, you initialize the search app and set up two-way communication with a parent application (such as a main web app) using the [<VPIcon icon="fa-brands fa-firefox"/>Post Message API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). You listen for incoming messages using the built-in `message` event. Once received, that message becomes available in the `event.data` object. Finally, you simulate sending data back to the parent by posting a `searchResult` message containing a list of items. This setup enables isolated iframe-based apps to communicate safely with the main shell application.

Then, in the DOM of the main web app**,** you need to include the iframe that will render the search app, specifying the URL to the hosted search app in this way:

```html
<iframe
  id="search-mfe"
  src="https://example.github.io"
  style="width: 100%; height: 200px; border: none;"
></iframe>
```

Styles were added here to ensure that the `iframe` displays seamlessly within the layout for a cleaner UI integration.

And now you can pass some content from the main web app down to the search app and get some messages from it. You can accomplish it in the main web app’s JavaScript code in this way:

```js
console.log('Initializing Main Web App...');

const iframe = document.getElementById('search-mfe');
iframe.onload = () => {
  // Send message to child iframe (inputs)
  iframe.contentWindow.postMessage({ type: 'init', userId: 42 }, '*');
};

window.addEventListener('message', (event) => {
  // Receive data from the Search App (outputs)
  if (event.data?.type === 'searchResult') {
    console.log('Received result from Search App: ', event.data.payload);
  }
});
```

As you see, when the `iframe` loads, the `init` event is sent to the search app (the `type` can be anything you want, just ensure it matches the one that another app expects from you). And then, in the `message` event handler as before, you can receive the incoming messages from the search app, and do something with them.

Here are a few pros and cons to consider, along with popular use cases:

::: tabs

@tab:active ✅ Pros:

- **Strong sandboxing**: No shared memory, no shared styles.
- **Zero dependency clashes**: One iframe is equivalent to one environment.
- **Perfect for legacy**: Easy to wrap old apps in an iframe.
- **Practical** for micro-apps in PHP, Java, Razor (ASP.NET)

@tab ❌ Cons:

- Slow rendering
- Difficult shared navigation
- Inconsistent/complicated styling
- Complex communication
- Must be hosted somewhere

@tab 👨🏻‍💻 Popular Use Cases

- Embedding legacy dashboards (for example, old AngularJS or Java apps)
- Secure cross-domain apps (for example, payments, 3rd party analytics)
- Highly untrusted integrations
- Embedded Ads

:::

But if you want a more fluid UX, shared components, and a smoother dev experience, you’ll want something better. That brings us to Web Components.

---

## Method #2: Web Components (Custom Elements + Shadow DOM)

> “What if you could ship a self-contained natively understood widget that works in any framework — React, Vue, Angular, or plain HTML?”

That’s exactly what [<VPIcon icon="fa-brands fa-firefox"/>Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) make possible. They’re natively built into the browser as an [<VPIcon icon="fa-brands fa-firefox"/>API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), you don’t need a framework or extra dependency. They allow you to create reusable, scalable, encapsulated UI elements that work just like native HTML tags.

![Micro-Frontend Method 2 - Web Components](https://cdn.hashnode.com/res/hashnode/image/upload/v1748773939725/8b017162-96a8-449d-b9b8-5fe8ef382e91.png)

Moreover, you can easily use them as wrappers around any elements from other UI frameworks (React, Angular, Svelte, etc) and use your framework-based components as regular native DOM elements in any web application.

They are, in many ways, the ideal foundation for micro frontends.

A web component is made of:

- **Custom Element** - defines your own HTML tag (`<user-profile>`) and behavior
- **Shadow DOM** - provides scoped, encapsulated styles and DOM structure
- **HTML Template** - brings reusable HTML blocks/fragments
- **Slots** - acts as placeholder areas for host content (used in content projection)

![Micro-Frontend Method 2 - Web Components Key Blocks](https://cdn.hashnode.com/res/hashnode/image/upload/v1748772947093/6090d9bb-2c10-4a92-9ece-c5235b8382a2.png)

In web components**,** you have to sync the data (input/output) via:

- **Attributes** (inputs):
  - In Javascript: `element.setAttribute()`, `element.getAttribute()`, and so on.
  - In HTML: `<element attr1=”value1” attr2=”value2”></element>`
- **Properties** (inputs) - `element.someProp = value` (only Javascript)
- **Custom Events** (outputs) - `new CustomEvent('name', data)`

First, let me show you a basic implementation of a web component, and then you’ll learn how to leverage it for micro-frontends.

Assuming that you’re building a reusable product-tile component that must:

- Accept one input parameter - `“title”`
- Send an output event `"add-to-cart"` with this `“title”` to the outside world, when the component is mounted to the DOM.

Here’s how this web component could look:

```js collapsed-lines title="product-tile.js"
class ProductTile extends HTMLElement {
  // Specify which attributes (inputs) to observe for changes
  static get observedAttributes() { return ['title']; }

  constructor() {
      super(); // Call base HTMLElement constructor (obligatory)
      // Create a Shadow DOM for style and DOM encapsulation
      const shadow = this.attachShadow({ mode: 'open' });
      // Populate Shadow DOM with a DIV container where React will render the player
      shadow.innerHTML = `<div id="title"></div>`;
  }

  // Built-in Lifecycle Reaction.
  // Called when the custom element ProductTile is added to the DOM
  connectedCallback() {
      // When added to the DOM, read and render the title attribute
      const title = this.getAttribute('title') ?? 'Unnamed Product';
      this.updateTitle(title);

      // Dispatch a custom event with the current title
      const event = new CustomEvent('add-to-cart', {
          detail: { title },
          bubbles: true,
          composed: true,
      });

      this.dispatchEvent(event);
  }

  // Built-in Lifecycle Reaction.
  // Called whenever observed attributes change.
  // In our case it's "title" only
  attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'title' && oldValue !== newValue) {
          this.updateTitle(newValue);
      }
  }

  // Internal method to safely update the title content
  updateTitle(title) {
      const titleElem = this.shadowRoot.querySelector('#title');
      titleElem.textContent = title;
  }
}

customElements.define('product-tile', ProductTile);
```

Now, let me explain what’s happening here:

- First, you create a custom element class that extends from `HTMLElement` or its children. This gives you access to web component lifecycle hooks and DOM integration capabilities.
- If you want to react to changes in input parameters (attributes), you have to define a static `observedAttributes()` getter that returns a list of attribute names to watch. In our case, we observe `“title”`.
- Then, in the constructor:
  - Call `super()` to properly inherit from `HTMLElement`.
  - Create a shadow DOM using `attachShadow({ mode: 'open' })`. This encapsulates your component’s internal DOM and styles. You can even use a `closed` mode here to add a higher level of isolation to the shadow DOM.
  - Then, populate the shadow DOM with minimal inner HTML—in this case, a `<div>` element that will later display the product title.
- When the component is added to the DOM, the built-in `connectedCallback()` lifecycle reaction runs:
  - It reads the current value of the `"title"` attribute.
  - Updates the UI with an initial value in the `"title"` attribute.
  - Then it dispatches a custom event named `"add-to-cart"`, passing the `"title"` as detail down to it. The events are `bubbles: true` and `composed: true`, so that parent elements or host apps outside the shadow DOM can subscribe to it and catch it.
- When the title attribute changes at runtime, another built-in lifecycle reaction named `attributeChangedCallback()` runs automatically:
  - It checks the new value and updates the `"title"` display accordingly.
  - This enables reactive behavior in the component—similar to input bindings in UI frameworks.
- Finally, you register the component globally using `customElements.define()` method (it’s available in the global `window` object), giving it:
  - A tag name of `<product-tile>` that can be used anywhere in HTML.
  - A `reference` to the custom element you previously created to associate one with another.

Ultimately, here’s how you can use this component in your apps, which will work in vanilla JS, React, Angular, Svelte, Vue, whatever UI framework you choose:

```html
<product-tile title="Coffee Mug"></product-tile>
```

And then you can listen to the `"add-to-cart"` event from inside `ProductTile` component like so:

```js
const elem = document.querySelector('product-tile');
elem.addEventListener('add-to-cart', e => {
  console.log('Add to cart!', e.detail);
});
```

As you see, no `ReactDOM.render`, no `NgModule`, no extra glue. Everything is entirely native, pure **JavaScript** code that browsers understand.

And now, due to the Shadow DOM and other Web Components’ features, you can easily wrap and embed any web app written in a different framework into the Shadow Tree that will isolate your app entirely and won’t allow its layout or styles to leak out.

Alternatively, if you decide to publish it as a separate npm package (for example, `@webcomp/product-tile`), you can even dynamically import and mount the Web Component like so:

```js
import('@webcomp/product-tile').then(() => {
  // Now <product-tile> is defined — you can create and use it
  const elem = document.createElement('product-tile');
  elem.setAttribute('title', 'Wireless Mouse');
  document.body.appendChild(elem);
});
```

Or load from CDN or any hosting provider:

```html
<script type="module" src="https://example.github.io/product-tile.js"></script>
```

It’s simple, clean, and independent.

But you’re not here just for that, right? :) Now, let’s learn the real power of Web Components in a micro-frontends world!

### Micro-Frontends with Web Components

Imagine that you’ve built a Video Player in React—or perhaps want to reuse one from another team. Now the question is: How can you make this React-based player usable in any other frontend application, regardless of its underlying framework, using Web Components?

Let’s figure it out!

![Micro-Frontend Method 2 - Web Components - Real World Example](https://cdn.hashnode.com/res/hashnode/image/upload/v1748785841227/e58d9ffd-3098-4652-ae52-a55ab218c8fd.png)

Let’s say, this video player:

- Accepts `src` and `controls` as inputs
- Emits events: `play` and `pause` as outputs
- Can be used in any app via `<magic-player>` in this way:

```html
<magic-player
  src="https://cdn.example.com/video.mp4"
  controls="true"
></magic-player>
```
    

Now let’s get to implementation!

#### 🔹 Step #1: Include your React player in the project

Here, you can play around with any React component of your choice, to be honest, or you can just use a simple React Video Player like the one below:

```jsx title="ReactVideoPlayer.jsx"
import React from 'react';

export function ReactVideoPlayer({ src, controls, onPlay, onPause }) {
  return (
      // HTML5 video element with full width and controls enabled
    <video
      width="100%"
      controls={controls}  {/* Enable / Disable controls */}
      onPlay={onPlay}      {/* Callback for play event */}
      onPause={onPause}    {/* Callback for pause event */}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
```

#### 🔹 Step #2: Create the Web Component Wrapper

Now, you need to create a Web Component wrapper around this React player app by mounting it into the shadow DOM of a custom element in this way:

```js title="magic-player.element.js"
// Define a new custom element class
class MagicPlayerElement extends HTMLElement {
  constructor() {
    super(); // Call base HTMLElement constructor (obligatory)

    // Create a Shadow DOM for style and DOM encapsulation
    const shadowRoot = this.attachShadow({ mode: 'open' });
    // Populate Shadow DOM with a DIV container where React will render the player
    shadowRoot.innerHTML = `
        <div id="react-video-player"></div>
    `;
  }
}

customElements.define('magic-player', MagicPlayerElement);
```

Then you need to add inputs and outputs like so:

```js title="magic-player.element.js"
// Define a new custom element class
class MagicPlayerElement extends HTMLElement {
  // Specify which attributes (inputs) to observe for changes
  static get observedAttributes() { return ['src', 'controls']; }

  constructor() {
    super(); // Call base HTMLElement constructor (obligatory)

    // Create a Shadow DOM for style and DOM encapsulation
    const shadowRoot = this.attachShadow({ mode: 'open' });
    // Populate Shadow DOM with a DIV container where React will render the player
    shadowRoot.innerHTML = `
        <div id="react-video-player"></div>
    `;
  }

  // Helper-like method to dispatch native-like events (our outputs)
  // In our case, it will be triggered for "onPlay" and "onPause" events
  dispatch(eventName, detail = {}) {
      const event = new CustomEvent(eventName, {
      detail,            // Pass custom data ("onPlay" or "onPause")
      bubbles: true,     // Allow event to bubble up
      composed: true     // Allow it to cross the Shadow DOM boundary
    });
    this.dispatchEvent(event);
  }
}

customElements.define('magic-player', MagicPlayerElement);
```

And lastly, add two built-in lifecycle reactions to render a React video player app when the page loads and every time the inputs change:

```jsx :collapsed-lines title="magic-player.element.jsx"
// Define a new custom element class
class MagicPlayerElement extends HTMLElement {
  // Specify which attributes (inputs) to observe for changes
  static get observedAttributes() { return ['src', 'controls']; }

  constructor() {
    super(); // Call base HTMLElement constructor (obligatory)

    // Create a Shadow DOM for style and DOM encapsulation
    const shadow = this.attachShadow({ mode: 'open' });
    // Populate Shadow DOM with a DIV container where React will render the player
    shadow.innerHTML = `
        <div id="react-video-player"></div>
    `;
  }

  // Helper-like method to dispatch native-like events (our outputs)
  // In our case, it will be triggered for "onPlay" and "onPause" events
  dispatch(eventName, detail = {}) {
      const event = new CustomEvent(eventName, {
      detail,            // Pass custom data ("onPlay" or "onPause")
      bubbles: true,     // Allow event to bubble up
      composed: true     // Allow it to cross the Shadow DOM boundary
    });
    this.dispatchEvent(event);
  }

  // Built-in Lifecycle Reaction.
  // Called when the custom element <magic-player> is added to the DOM
  connectedCallback() {
    this.render();
  }

  // Built-in Lifecycle Reaction.
  // Called whenever observed attributes change.
  // In our case it's "src" and "controls"
  attributeChangedCallback() {
    this.render();
  }

  // Render the React player inside the container
  render() {
    const src = this.getAttribute('src');
    const controls = this.getAttribute('controls') === 'true';
    const mount = this.shadowRoot.querySelector('#react-video-player');

    ReactDOM.createRoot(mount).render(
      <ReactVideoPlayer
        src={src}
        controls={controls}
        onPlay={() => this.dispatch('play')}
        onPause={() => this.dispatch('pause')}
      />
    );
  }
}

customElements.define('magic-player', MagicPlayerElement);
```

#### 🔹 Step #3: Connect your React-Player to any UI framework:

Then, in the main web app (whatever UI framework you’re using there). We put our newly created React video player wrapper in any place in the DOM, passing down initial attributes (inputs) to it:

```html
<!-- Use your new React-based player anywhere! -->
<magic-player
  src="https://cdn.example.com/movie.mp4"
  controls="true"
></magic-player>
```

And then you can easily subscribe to the custom events (outputs) from inside the React app:

```js
// Listen to native-style events from the custom element
const magicPlayer = document.querySelector('magic-player');
magicPlayer.addEventListener('play', () => {
  console.log('Video has started playing!');
});

magicPlayer.addEventListener('pause', () => {
  console.log('Video has been paused.');
});
```

That’s it! Now, try to accomplish the same with a different **UI framework**!

::: tabs

@tab:active ✅ Pros

- **Framework-agnostic:** Works in React, Angular, Vue, Svelte, or even plain HTML — no rewrites needed
- **Natively supported by browsers:** No need for external libraries or frameworks — just HTML, JS, and CSS.
- No extra configuration or hosting needed as in iframes. But still, components can be published to npm/CDNs and reused across multiple apps.
- **Intuitive & easy communication:** Expose native DOM attributes as inputs and native custom events as outputs.
- **SSR-friendly with hydration:** It supports serialization, declarative shadow DOM, and can be server-rendered and hydrated, especially using modern tools.
- **Supports Accessibility** (ARIA attributes and roles).

@tab ❌ Cons

- **Integration Difficulties**: If you want to bridge two apps in different technical stacks, you need to properly manage their communication in a custom element wrapper and its shadow DOM.
- **Limited Support for old Browsers**: If you need compatibility with legacy browsers like Internet Explorer 10, Web Components need a polyfill. [But here’s a popular repository with all polyfills for Web Components (<VPIcon icon="iconfont icon-github"/>`webcomponents/polyfills`)](https://github.com/webcomponents/polyfills)
- **Global State Isolation**: There’s no built-in way to share state across components. You’ll need to implement your own global bus or event bridge using `CustomEvents` or alike.

@tab 👨🏻‍💻 Popular Use Cases

- Reusable Design systems & UI libraries
- Micro frontends inside framework apps
- Legacy integration to modern stack and vice versa
- Cross-team component delivery
- CDN-based plug-and-play UIs

:::

The Web Components API has many more possibilities and power. So, if you want, you can go deeper and advance your knowledge by passing any available free course on freeCodeCamp or passing the one I’ve built myself around this technique on Udemy.

Now let’s move on!

---

## Method #3: Single**-SPA — The Meta-**Framework Approach

> “What if instead of embedding micro frontends as Web Components or iframes, we had a system that orchestrated multiple SPAs together in one layout?”

That’s what [<VPIcon icon="fas fa-globe"/>single-spa](https://single-spa.js.org/) is all about. It’s not a rendering library, it’s a runtime JavaScript router and orchestrator for micro frontends.

![Micro-Frontend Method 3 - Single SPA](https://cdn.hashnode.com/res/hashnode/image/upload/v1748788736898/90800e32-f8d0-4fc5-aedb-e7ce8d753c4c.png)

<SiteInfo
  name="single-spa | single-spa"
  desc="A javascript router for front-end microservices"
  url="https://single-spa.js.org/"
  logo="https://single-spa.js.org/img/single-spa-mark-magenta.svg"
  preview="https://single-spa.js.org/img/docusaurus.png"/>

### What Is** single-spa**?

single-spa (Single Page Application) lets you build and run multiple independent SPAs (React, Vue, Angular, and so on) inside one webpage. Each SPA is responsible for part of the UI and is loaded dynamically depending on the current route.

In short, it’s a **framework** that:

- Loads your micro frontends when needed
- Mounts/unmounts them cleanly
- Coordinates routing and lifecycles
- Supports different frameworks in the same app.

### Real-Life Example

Let’s say you have this route breakdown:

| `Path` | `Micro Frontend App` | `Stack` | `App Name` |
| --- | --- | --- | --- |
| /products | Product Listing App | React | `@shop/products` |
| /checkout | Checkout App | Vue | `@shop/checkout` |
| /account | Account Dashboard | Angular | `@shop/account` |

Each one is a **fully independent SPA**, and single-spa loads them as needed.

#### 🔹 Step #1: single-spa installation

First, you need to install the single-spa as a dependency for your project:

```sh
# Create a new project (if it's not yet)
npm init

# Install Single SPA
npm i single-spa systemjs
```

Notice that we also installed the `systemjs` package. This package is responsible for the dynamic runtime module loading that makes Single-SPA work seamlessly. It uses `SystemJS` as a module loader to allow micro frontends to be:

1. Loaded at runtime
2. Independently deployed
3. Framework-agnostic
4. Lazy-loaded only when needed

Now you need to implement each micro-app. For instance, let’s see how the <VPIcon icon="fa-brands fa-npm"/>`@shop/products` app written in React could be managed.

##### 🔹 Step #2: Project Structure

The project structure for each micro app can look like this:

```plaintext title="file structure"
shop/products/
├── src/
│   ├── root.component.jsx
│   └── index.single-spa.js
├── public/
│   └── index.html
├── package.json
└── webpack.config.js
```

#### 🔹 Step #3: Root Micro App Component

The <VPIcon icon="fa-brands fa-react"/>`root.component.jsx` file represents the root of the React app that will be mounted to the main DOM using single-spa. Here’s a simple example:

```jsx title="root.component.jsx"
import React from 'react';

export default function Root() {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h2>🛍 Product Micro App</h2>
      <p>This is a micro frontend powered by React + Single-SPA!</p>
    </div>
  );
}
```

#### 🔹 Step #4: Set Up Lifecycle Hooks

Also, each Micro App in single-spa requires an entry point with at least three core functions/lifecycle hooks. For that purpose, you will need a separate file, which you can name as <VPIcon icon="fa-brands fa-js"/>`index.single-spa.js` and it will provide the implementation of those hooks, like:

- `bootstrap()` - Called when the micro app is launched by the main app (Shell) before mounting to the DOM
- `mount()` - Called when the app is attached to the host in the DOM
- `unmount()` - Called when the app is removed/detached from the DOM

And here’s an example of what they could look like:

```jsx :collapsed-lines title="src/index.single-spa.js"

import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './root.component.jsx';

// Hold the React root instance for reuse
let root = null;

// Called once when the micro frontend is first initialized
export function bootstrap() {
  return Promise.resolve();
}

// Called every time the route matches and the app should appear
export function mount(props) {
  return Promise.resolve().then(() => {
    const container = document.getElementById('product-container') || createContainer();
    root = ReactDOM.createRoot(container);
    root.render(<Root />);
  });
}

// Called when the route no longer matches (cleanup)
export function unmount() {
  return Promise.resolve().then(() => {
    if (root) {
      root.unmount();
    }
  });
}

// Create a container div if it doesn't exist
function createContainer() {
  const div = document.createElement('div');
  div.id = 'product-container';
  document.body.appendChild(div);
  return div;
}
```

As you see, you have to resolve a Promise in all lifecycle hooks and ensure the React app is mounted and unmounted properly based on the React best practices.

#### 🔹 Step #5: Configuring Webpack for SystemJS

Also, each micro-app in single-spa needs a separate configuration. For that, you will include a <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` file, specifying how to build the app (`output`), where to host it (`publicPath`), and so on.

Since single-spa uses the `SystemJS` package, the `libraryTarget` will be `system` for all micro apps.

```js title="webpack.config.js"
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: 'products.js',
    libraryTarget: 'system', // SystemJS-compatible format
    publicPath: 'http://localhost:8500/', // Host location of this micro app
  },
};
```

This app will be hosted on the `localhost:8500`. For production, you will have to use any suitable hosting provider (like the ones described in the iframes section).

#### 🔹 Step #6: Registering the Micro App in Root-Config

Next, it’s time to register a new micro-app in the Singla-SPA root config. Here’s how you can do it:

Create a `root-config.js` file in the root of the project and fill it with this content:

```js title="root-config.js"
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@shop/products',
  app: () => System.import('@shop/products'),
  activeWhen: ['/products'],
});

start(); // Initializes routing and micro app lifecycles
```

First, you have to register the application, and then you start it to enable routing and the micro app lifecycle. The registration for other micro apps will look the same.

::: note

`System.import()` is part of `SystemJS`, used by default in single-spa for loading remote apps.

:::

Also, single-spa comes with so-called "Parcels" - a lower-level construct in comparison to applications. They’re essentially self-contained pieces of UI that you can dynamically mount anywhere. Think of them like “mini microfrontends” or reusable widgets that don’t control routing:

::: tip example

```js
mountParcel(SomeParcelComponent, { domElement: document.getElementById('micro-app') });
```

You’d use them when:

- You don’t want the parcel to own a route.
- You need to inject a micro frontend dynamically inside another one.
- You want encapsulated logic (like a widget) embedded within a larger app.

:::

In all other cases, prefer the usage of a `registerApplication(...)` function.

#### 🔹 Step #7: Adding Micro App to SystemJS Import Map

The last step is to register the micro app in `SystemJS`. For that, in your root <VPIcon icon="fa-brands fa-html5"/>`index.html` file, you need to add the following two scripts:

```html :collapsed-lines title="public/index.html"
<!DOCTYPE html>
<html lang="en">
<head> <title>Micro Frontend Shell</title> </head>
<body>
  <nav>
    <a href="/products">Products</a> |
    <a href="/checkout">Checkout</a>
  </nav>

  <!-- Import maps handled by bundler or injected at runtime -->
  <script type="systemjs-importmap">
    {
      "imports": {
        "@shop/root-config": "http://localhost:9000/root-config.js",
        "@shop/products": "http://localhost:8500/products.js",
        // other micro apps
      }
    }
  </script>

  <!-- Start the root-config application -->
  <script>
    System.import('@shop/root-config');
  </script>
</body>
</html>
```

First, you have to add a script with an import map declaration. As you see, it represents a JSON where:

- Each key is the micro app name and
- Each value is the URL where the main JS file (from the bundle) actually lives

Note that we’ve added the <VPIcon icon="fa-brands fa-npm"/>`@shop/root-config` here to the import map to tell `SystemJS` where to fetch the main JavaScript file for the main/shell app so it knows how to resolve and execute `System.import('@shop/root-config')` properly.

Secondly, you include another script to start the main / shell application. It executes the JS file you just mapped in the import map above. Treat it as the real “boot” of your shell app:

```html
<script>
  System.import('@shop/root-config');
</script>
```

That’s it! Now go ahead and try doing the same with other micro-apps in Vue (Checkout App) and Angular (Account Dashboard).

Here’s a simple diagram illustrating this connection:

![Micro-Frontend Method 3 - Single SPA - Real World Example](https://cdn.hashnode.com/res/hashnode/image/upload/v1748789553598/4729600f-54d7-4d72-97e7-462093cf08b5.png)

Now that you’ve registered and integrated your first micro app, you might be wondering if this approach right for you. Let’s quickly look at the benefits and limitations of using single-spa in production.

::: tabs

@tab:active ✅ Pros

- **Built-in Routing & Lifecycles** - No need to reinvent navigation or mounting logic
- **Cross-framework support** - React, Vue, Angular can all co-exist
- **Fine-grained loading** - Only load the active app (lazy and efficient)
- **Flexible project structure** - can be monorepo or polyrepo
- **Good CLI tooling -** create and link MFEs with create-single-spa & helpers

@tab ❌ Cons

- **Complex learning curve** - Lifecycle APIs and `SystemJS` can be intimidating
- **Configurations** **can get verbose** - Managing multiple registries, import maps, deployment URLs, and lifecycle wrappers across apps adds setup overhead
- **Shared state is manual** - You must implement custom global state solutions
- **Hard to SSR** - Designed for full client-side rendering
- **More boilerplate** - Each app needs wrappers for lifecycles, routing, and so on.
- **Global styles leak -** No default encapsulation like Shadow DOM

And a few popular **use cases** for it:

@tab 👨🏻‍💻 Popular Use Cases

You can use single-spa when:

- You want a central router managing all micro frontends
- Teams are using different frameworks
- You prefer full SPA experiences over isolated widgets
- You don’t mind some boilerplate for orchestration
- You’re okay with a purely client-side setup

:::

Let’s move on!

---

## Method #4: Module Federation - Sharing Code at Runtime

> “What if your micro frontends could load each other’s components, modules, or libraries at runtime — without iframes, without import maps, and without repackaging?”

That’s exactly what [<VPIcon icon="fas fa-globe"/>Module Federation](https://module-federation.io/), introduced in [<VPIcon icon="fas fa-globe"/>Webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/), makes possible. It’s fairly new and it allows multiple, separately built and deployed applications to share modules in real-time, via the browser.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748789750463/ad976d48-f564-4e94-a3ca-c18e9612dc55.png)

```component VPCard
{
  "title": "Module federation",
  "desc": "Module Federation is a concept that allows developers to share code and resources across multiple JavaScript applications",
  "link": "https://module-federation.io/",
  "logo": "https://module-federation.io/svg.svg",
  "background": "rgba(229,231,235,0.2)"
}
```

With Module Federation, you can:

- Import components across independent builds
- Share React, Vue, or any dependency
- Version-control exposed modules
- Ship independently, yet consume each other

Module Federation is what makes micro frontends in a single cohesive layout truly feel like one app.

Now let’s see it in action!

### Real-Life Example

Let’s assume that you have to build two self-contained apps:

- Main / Host app (shell) — loads components from others (let’s say it’s in React)
- Remote app (product-app) — exposes components written also in React to others

Module Federation allows you to export these components without publishing them to NPM or wrapping them as a Web Component. Instead, the host app will load the component directly at runtime from the compiled JavaScript bundle.

Here’s how the project structure could look:

::: tabs

@tab:active Product App:

```plaintext title="file structure"
product-app/                ← Remote Micro Frontend
├── public/
│   └── index.html          ← Mount point for optional local test render
├── src/
│   ├── ProductTile.jsx     ← Component to expose
│   └── index.js            ← Optional: local entry point
├── webpack.config.js       ← Exposes Product App
├── package.json
└── .babelrc / .gitignore / etc
```

Note, that <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` must be at the root level, same as <VPIcon icon="iconfont icon-json"/>`package.json`, so `Webpack` can locate it automatically.

**Main / Host App (shell):**

```plaintext title="file structure"
host-app/                     
├── public/
│   └── index.html        ← Mount point
├── src/
│   ├── App.jsx           ← Mounts ProductTile from remote
│   └── bootstrap.js      ← App entry point
├── webpack.config.js     ← Loads remotes via Module Federation
└── package.json
```

:::

You can keep them both in a monorepo or host them in entirely different repos.

#### 🔹 Step #0: Initiate projects (Host + Product Apps)

If you know how to do it, you can set up two separate React applications yourself for the Host App and one for the Remote (Product App), or initialize them in this way:

```sh
npm init
npm i react react-dom
```

#### 🔹 Step #1: Install Webpack 5 + dependencies (Host + Product Apps)

Before you do anything federation-related, both the host and remote apps must be set up with Webpack 5 and its plugins. Go ahead and run this in both projects:

```sh
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
```

A few notes about these packages:

- `webpack + webpack-cli` — Core bundler and CLI
- `webpack-dev-server` — Local server for hot reload + module exposure
- `html-webpack-plugin` — Automatically injects your bundles into HTML
- Optional but common: You can add `Babel`, `React preset`, `loaders`, and so on, for `JSX`/`TSX` support later.

This setup gives you a foundation. From here, you can add module federation to connect apps together.

#### 🔹 Step #2: Create the Remote App (Product App)

Let’s start with the remote app, the one exposing a React component to be consumed by others.

Here’s a simple `ProductTile` React component (of course, you can implement yours):

```jsx title="product-app/src/ProductTile.jsx"
import React from 'react';

export default function ProductTile({ title }) {
  return (
    <div style={{ border: '1px solid #aaa', padding: '1rem' }}>
      <h3>🛍 {title}</h3>
    </div>
  );
}
```

A `ProductTile` component supplies a prop - `“title”` - and renders it.

Now let’s expose this component to other apps, not just render it locally.

#### 🔹 Step #3: Configure Webpack in the Remote App (Product App)

This will be done utilizing module federation, which you must enable in <VPIcon icon="fa-brands fa-js"/>`webpack.config.js` file. Here’s how it can be done. At the very top of the file, you will need to import these packages:

```js title="product-app/webpack.config.js"
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
```

- `HtmlWebpackPlugin` - Handles HTML generation and script injection.
- `ModuleFederationPlugin` - The core Webpack plugin that lets you expose and consume modules at runtime

Then, define the actual config in `module.exports`:

```js :collapsed-lines title="product-app/webpack.config.js"
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  entry: './src/index.js',                         // Entry file to the product app
  mode: 'development',                             // Must be production if you go live
  devServer: {
    port: 3001                                     // Product app runs on this port
  },
  output: {
    publicPath: 'auto',                            // Required for dynamic federation
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'productApp',                         // Internal name of the remote app
      filename: 'remoteEntry.js',                 // Entry file others will load
      exposes: {
        './ProductTile': './src/ProductTile.jsx', // Expose this module
      },
      shared: {                                   // Shared packages if needed
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

Now it’s time to use the product app in the main/host app:

```jsx title="host-app/src/App.jsx"
import React, { Suspense } from 'react';

// Dynamically import ProductTile from the remote
const RemoteProductTile = React.lazy(() => import('productApp/ProductTile'));

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>📦 Host App</h1>
      <Suspense fallback={<div>Loading product tile...</div>}>
        <RemoteProductTile title="Bluetooth Speaker" />
      </Suspense>
    </div>
  );
}
```

In React, you can use the `React.lazy()` function to dynamically import the federated module. It returns a promise that React renders as soon as it’s ready.

That’s it. There’s nothing related to the module federation in the <VPIcon icon="fa-brands fa-js"/>`bootstrap.js` and <VPIcon icon="fa-brands fa-html5"/>`index.html` files, but regular setup, so you can put whatever you want there:

```jsx title="host-app/src/bootstrap.js"
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

```html title="host-app/public/index.html"
<!DOCTYPE html>
<html>
  <head>
    <title>Host App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

And lastly, you can launch the host app:

```sh
npx webpack serve
```

That’s it!

Here are a few advantages and limitations of Module Federation, along with popular use cases.

::: tabs

@tab:active ✅ Pros

- **Runtime Integration** - Import remote components after both apps are built
- **Independent Deployment** - Teams can ship apps on separate pipelines
- **Code Sharing** - Share common libraries (React, lodash) to reduce duplication
- **No iframes or wrappers** - Native component integration, not isolated like Web Components
- **No import maps needed** - Webpack handles all the resolution logic
- **Works across frameworks -** Can be used in React, Angular, Vue, even Web Components

@tab ❌ Cons

- **Tied to Webpack** - **Federation** is Webpack-specific (Vite/Rollup alternatives exist but are not native)
- **Initial setup is complicated** - Requires per-app Webpack configuration and shared dependency coordination
- **Runtime failures are possible -** If the remote is down, the host may break unless you handle fallbacks
- **Version mismatch risks** - Shared libs (like React) must be tightly versioned and aligned
- **No automatic SSR** - Requires custom hydration logic for federated components

@tab 👨🏻‍💻 Popular Use Cases

Use **Module Federation** when:

- You want to build a platform composed of independently deployed apps
- You need runtime module loading (not just widgets)
- You want to share design systems or UI libraries across apps
- Your team is federating complex app sections, not just components
- You want to avoid loading dependencies multiple times across apps

:::

---

## Other Tools & Ecosystem Additions

While iframes, Web Components, single-spa, and Module Federation are the major players in the micro-frontend arena, there’s a growing ecosystem of alternative tools and strategies. They don’t always serve as full micro-frontend methods, but still solve important pieces of the puzzle. Let’s walk through some of the less prominent, yet practical solutions that are worth your attention.

### Import Maps + Native ES Modules

[<VPIcon icon="fa-brands fa-firefox"/>Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) allow you to define where modules are loaded from, directly in the browser. Combined with native ES module support, they enable zero-build micro frontend setups.

```html
<script type="importmap">
{
  "imports": {
    "ui-library/": "https://cdn.example.com/ui/v1.2.3/",
    "square": "./modules/shapes/square.js"
  }
}
</script>
```

You might’ve noticed that it looks similar to what single-spa + `SystemJS` does.

**Use it when**:

- You want to dynamically load shared libraries (like design systems)
- You’re building federated apps without bundlers
- You’re targeting modern browsers only

### Piral: Micro Frontends as Pluggable Portals

[<VPIcon icon="fas fa-globe"/>Piral](https://piral.io/) is a specialized framework for building portal-based micro frontends. It provides a structured environment where micro apps (called pilets) can be plugged into a central shell (the Piral instance).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748797958786/125cdd57-0d2d-4d23-a320-028b081ee989.png)

```component VPCard
{
  "title": "Piral - The Ultimate Framework for Micro Frontends",
  "desc": "Piral - Build next generation web apps using micro frontends.",
  "link": "https://piral.io//",
  "logo": "https://piral.io/330dffc64cb0d5ac23c4.png",
  "background": "rgba(0,255,173,0.2)"
}
```

**This framework comes with built-in:**

- Routing
- Layout orchestration
- Shared state
- Module loading
- Authentication hooks

**Great for:**

- Enterprise-scale portals
- Apps with lots of features teams
- Admin dashboards or CMS-heavy UIs

### Luigi: Micro Frontends + SAP-style Shells

[<VPIcon icon="fas fa-globe"/>Luigi](https://luigi-project.io/) is a microfrontend framework built by SAP to enable consistent layout shells with side navigation, top bars, permissions, and more.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748798177808/16380085-a4fc-4cc9-9fe2-b44821f9feef.png)

```component VPCard
{
  "title": "Luigi - The Enterprise-Ready Micro Frontend Framework",
  "desc": "Luigi is a micro frontend framework that enables you to create a unified user experience across a large set of functionality",
  "link": "https://luigi-project.io/",
  "logo": "https://luigi-project.io/assets/img/favicon.png",
  "background": "rgba(45,235,138,0.2)"
}
```

**This framework comes with built-in:**

- Config-driven app registration
- Automatic route activation
- Role-based access control (RBAC)
- Seamless iframe integration with a shell

**Great for:**

- Intranet tools
- Cloud admin panels
- Productized dashboards

### Open Components

[OpenComponents (<VPIcon icon="iconfont icon-github"/>`opencomponents/oc`)](https://github.com/opencomponents/oc) is a framework-agnostic way to build self-contained microservices with UI logic, registered to a central registry.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748798238923/6406ef71-4dde-47bc-8d2b-9476593afdd5.png)

<SiteInfo
  name="opencomponents/oc"
  desc="OpenComponents, serverless in the front-end world for painless micro-frontends delivery"
  url="https://github.com/opencomponents/oc/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/91600ddfdbbeaeb1639416cb6305566ebd5b4adcf2b6d29fe79861e8b761a3a9/opencomponents/oc"/>

**This framework comes with built-in:**

- Server-rendered or client-rendered
- REST-like model for UI consumption
- Great CDN + registry story

**Great for:**

- Used when your company treats UI as deployable microservices, just like APIs.

### Bit: Meet a composable architecture

[<VPIcon icon="fas fa-globe"/>Bit](https://bit.dev/) isn’t a micro frontend framework per se, but a component-driven development and distribution platform. It organizes source code into composable components, empowering to build reliable, scalable applications in the era of AI.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748798402542/9fdf7de4-cc1d-41b5-9709-be824c8ffe41.png)

<SiteInfo
  name="Bit. Composable software."
  desc="AI-powered development workspaces with composable components, architectural clarity and zero overhead."
  url="https://bit.dev/"
  logo="https://bit.dev/favicon.png"
  preview="https://static.bit.dev/og-images/bit-marketing-og-img-facebook-2025.png"/>

Use it alongside Web Components or Module Federation to supercharge reuse. If you want to practice, they have an [<VPIcon icon="fas fa-globe"/>Official Guide](https://bit.dev/blog/mastering-micro-frontends-with-module-federation-and-bit-ljn4ruah/) on how to master Micro-Frontends with Module Federation.

It’s a great addition when:

- You want to publish reusable components across teams
- You need to manage versions, ownership, and discovery
- You’re aiming for component-first delivery, not app-first

---

## Final Thoughts

Micro frontends offer immense power, but that power comes with architectural responsibility.

Each method we explored solves a different kind of problem:

- IFrames are secure, but come with complex communication and high isolation.
- Web Components are native, framework-agnostic, dependency-free, and perfect for reusable UI Kits
- single-spa shines when you need orchestration and multiple SPAs under one shell.
- Module Federation is the go-to for runtime code sharing and independent deployment.
- And tools like Import Maps, Piral, Luigi, and others fill in the gaps, each in their own way.

There’s no one-size-fits-all solution here, but with the right match for your team structure and product strategy, you can build apps that scale across teams, tech stacks, and time.

---

If you liked this guide, feel free to repost and share it with your friends, colleagues, and social network.

If you want to take your micro-frontend skills to a new level, especially around Web Components, I invite you to check out my best-selling Udemy course called [<VPIcon icon="fas fa-globe"/>“Web Components: The Ultimate Guide from Zero to Hero“](https://udemy.com/course/web-components-api/?couponCode=HERO_START).

And of course, if you have questions, feedback, or need help with your micro frontend setup, feel free to reach out to me on my social media such as [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`andrewmaksimchenko`)](https://linkedin.com/in/andrewmaksimchenko/) / [X (<VPIcon icon="fa-brands fa-x-twitter"/>`avmax19`)](https://x.com/avmax19) / [Telegram (<VPIcon icon="fa-brands fa-telegram"/>`codelikeandrew`)](https://t.me/codelikeandrew). I’m always happy to chat, connect, and help other devs build amazing things! 💚

Let’s build the IT future we could be proud of! 💪🏼 Thanks for reading — and happy decoupling! 🚀

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Micro-Frontend Architecture Handbook",
  "desc": "Over the years, in my role as a lead full-stack developer, solutions architect, and mentor, I’ve been immersed in the world of micro frontend architecture, working across different large-scale frontend projects where multiple teams, stacks, and deplo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/complete-micro-frontends-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
