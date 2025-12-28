---
lang: en-US
title: "How I Write Custom Elements with lit-html"
description: "Article(s) > How I Write Custom Elements with lit-html"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Write Custom Elements with lit-html"
    - property: og:description
      content: "How I Write Custom Elements with lit-html"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-elements-with-lit-html.html
prev: /programming/ts/articles/README.md
date: 2025-12-29
isOriginal: false
author:
  - name: Dave Samaniego
    url : https://frontendmasters.com/blog/author/davesamaniego/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8102
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How I Write Custom Elements with lit-html"
  desc="You can use a smaller part of Lit to build web web components that still take advantage of some of it's best features, particularly if you're cool with Light DOM."
  url="https://frontendmasters.com/blog/custom-elements-with-lit-html/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8102"/>

When I started learning more about web development, or more specifically about front-end frameworks, I thought writing components was so much better and more maintainable than calling `.innerHTML()` whenever you need to perform DOM operations. [<VPIcon icon="fa-brands fa-wikipedia-w"/>JSX](https://en.wikipedia.org/wiki/JavaScript_XML) felt like a great way to mix HTML, CSS, and JS in a single file, but I wanted a more vanilla JavaScript solution instead of having to install a JSX framework like React or Solid.

So I’ve decided to go with [<VPIcon icon="fas fa-globe"/>lit-html](https://lit.dev/docs/libraries/standalone-templates/) for writing my own components.

---

## Why not use the entire lit package instead of just lit-html?

Honestly, I believe something like lit-html should be a part of vanilla JavaScript ([<VPIcon icon="fas fa-globe"/>maybe someday?](https://justinfagnani.com/2025/06/30/what-should-a-dom-templating-api-look-like/)). So by using lit-html, I basically pretend like it is already. It’s my go-to solution when I want to write HTML in JavaScript. For more solid reasons, you can refer to the following list:

- **Size difference.** This often does not really matter for most projects anyway.)
  - [<VPIcon icon="fas fa-globe"/>lit-html](https://bundlephobia.com/package/lit-html@3.3.1) – 7.3 kb min, 3.1 kb min + gzip
  - [<VPIcon icon="fas fa-globe"/>lit](https://bundlephobia.com/package/lit@3.3.1) – 15.8 kb min, 5.9 kb min + gzip
- **LitElement creates a [<VPIcon icon="fa-brands fa-firefox"/>shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) by default.** I don’t want to use the shadow DOM when creating my own components. I prefer to allow styling solutions like Tailwind to work instead of having to rely on solutions like [<VPIcon icon="fa-brands fa-firefox"/>CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) to style my components. [**The light DOM can be nice**](/frontendmasters.com/light-dom-only.md).
- **`import { html, render } from "lit-html"` is all you need** to get started to write lit-html templates whereas Lit requires you to learn about [<VPIcon icon="fas fa-globe"/>decorators](https://lit.dev/docs/components/decorators/) to use most of its features. Sometimes you may want to use Lit directives if you need performant renders but it’s not necessary to make lit-html work on your project.

I will be showing two examples with what I consider to be two distinct methods to create a lit-html [<VPIcon icon="fa-brands fa-firefox"/>custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements). The first example will use what I call a **“stateless render”** because there won’t be any state parameters passed into the lit-html template. Usually this kind of component will only call the render method once during its lifecycle since there is no state to update. The second example will use a **“stateful render”** which calls the render function every time a state parameter changes.

---

## Stateless Render

For my first example, the custom-element is a `<textarea>` wrapper that also has a status bar similar to [<VPIcon icon="fas fa-globe"/>Notepad++](https://notepad-plus-plus.org/) that shows the length and lines of the content inside the `<textarea>`. The **status bar** will also display the position of the cursor and span of the selection if any characters are selected. Here is a picture of what it looks like for those readers that haven’t used Notepad++ before.

![A screenshot of a text editor displaying an excerpt about Lorem Ipsum, highlighting the text in yellow and showing line and character counts.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/12/image1-1.png?resize=1024%2C571&ssl=1)

<CodePen
  user="anon"
  slug-hash="raegrMQ"
  title="wc-textarea"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

I used a library called [TLN (<VPIcon icon="iconfont icon-github"/>`MatheusAvellar/textarea-line-numbers`)](https://github.com/MatheusAvellar/textarea-line-numbers) (“Textarea with Line Numbers”) to make the aesthetic of the textarea feel more like Notepad++, similar to the library’s official [<VPIcon icon="fas fa-globe"/>demo](https://lab.avl.la/textarea-line-numbers/demo.html). Since the base template has no state parameters, I’m using plain old JavaScript events to manually modify the DOM in response to changes within the textarea. I also used the render function again to display the updated status bar contents instead of user `.innerHTML()` to keep it consistent with the surrounding code.

Using lit-html to render stateless components like these is useful, but perhaps not taking full advantage of the power of lit-html. According to the [<VPIcon icon="fas fa-globe"/>official documentation](https://lit.dev/docs/libraries/standalone-templates/):

> When you call render, **lit-html only updates the parts of the template that have changed since the last render.** This makes lit-html updates very fast.

You may ask: *“Why should you use lit-html in examples like this where it won’t make that much of a difference performance wise? Since the root render function is really only called once (or once every `connectedCallback()`) in the custom elements lifecycle.”*

My answer is that, yes, it’s not *necessary* if you just want rendering to the DOM to be fast. The main reason I use lit-html is that the syntax is so much nicer to me compared to setting HTML to raw strings. With vanilla JavaScript, you have to perform `.createElement()`, `.append()`, and `.addEventListener()` to create deeply nested HTML structures. Calling ``.innerHTML() = `<large html structure></>` `` is much better, but you still need to perform `.querySelector()` to lookup the newly created HTML and add event listeners to it.

[<VPIcon icon="fas fa-globe"/>The `@event` syntax](https://lit.dev/docs/components/events/) makes it much more clear where the event listener is located compared to the rest of the template. For example…

```js
class MyElement extends LitElement {
  ...
  render() {
    return html` <p><button @click="${this._doSomething}">Click Me!</button></p>
    `;
  }
  _doSomething(e) {
    console.log("something");
  }
}`
```

It also makes it much more apparent to me on first glance that `event.currentTarget` can only be the HTMLElement where you attached the listener and `event.target` can be the same but also may come from any child of the said HTMLElement. The template also calls `.removeEventListener()` on its own when the template is removed from the DOM so that’s also one less thing to worry about.

### The Status Bar Area

Before I continue explaining the change events that make the status bar work, I would like to highlight one of the drawbacks of the “stateless render”: there isn’t really a neat way to render the initial state of HTML elements. I could add placeholder content for when the input is empty and no selection was made yet, but the `render()` function only appends the template to the given root. It doesn’t delete siblings within the root so the status bar text would end up being doubled. This could be fixed if I call an initial render somewhere in the custom element, similar to the render calls within the event listeners, but I’ve opted to omit that to keep the example simple.

The input change event is one of the more common change events. It’s straightforward to see that this will be the change event used to calculate and display the updated input length and the number of newlines that the input has.

I thought I would have a much harder time displaying the live status of selected text, but the `selectionchange` event provides everything I need to calculate the selection status within the textarea. This change event is relatively new too, having only been a part of baseline last [<VPIcon icon="fa-brands fa-firefox"/>September 2024](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/selectionchange_event).

Since I’ve already highlighted the two main events driving the status bar, I’ll proceed to the next example.

---

## Stateful Render

My second example is a `<pokemon-card>` custom-element. The pokemon card component will generate a random Pokémon from a specific pokemon TCG set. The specifications of the web component are as follows:

- The placeholder will be this [<VPIcon icon="fas fa-globe"/>generic pokemon card back](https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg).
- A **Generate** button that adds a new Pokémon card from the TCG set.
- Left and right arrow buttons for navigation.
- Text that shows the name and page of the currently displayed Pokémon.

<CodePen
  user="anon"
  slug-hash="raegryo"
  title="N/A"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In this example, only two other external libraries were used for the web component that weren’t related to lit and lit-html. I used [<VPIcon icon="fas fa-globe"/>shuffle](https://es-toolkit.dev/reference/array/shuffle.html) from [<VPIcon icon="fas fa-globe"/>es-toolkit](https://es-toolkit.dev) to make sure the array of cards is in a random order each time the component is instantiated. Though the shuffle function itself is likely small enough that you could just write your own implementation in the same file if you want to minimize dependencies.

I also wanted to mention [<VPIcon icon="fas fa-globe"/>es-toolkit](https://es-toolkit.dev/) in this article for readers that haven’t heard about it yet. I think it has a lot of useful utility functions so I included it in my example. According to their [<VPIcon icon="fas fa-globe"/>introduction](https://es-toolkit.dev/intro.html), “es-toolkit is a modern JavaScript utility library that offers a collection of powerful functions for everyday use.” It’s a modern alternative to lodash, which used to be a staple utility library in every JavaScript project especially during the times before [<VPIcon icon="fas fa-globe"/>ES6](https://262.ecma-international.org/6.0) was released.

There are many ways to implement a random number generator or how to randomly choose an item from a list. I decided to just create a list of all possible choices, shuffle it, then use the pop method so that it’s guaranteed no card will get generated twice. The es-toolkit shuffle type documentation states that it “randomizes the order of elements in an array using the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Fisher-Yates](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm”.

---

## Handling State using Signals

Vanilla JavaScript doesn’t come with a state management solution. While LitElement’s [<VPIcon icon="fas fa-globe"/>property](https://lit.dev/docs/api/decorators#property) and [<VPIcon icon="fas fa-globe"/>state](https://lit.dev/docs/api/decorators#state) decorators do count as solutions, I want to utilize a solution that I consider should be a part of Vanilla JavaScript just as with lit-html. The state management solution for the component will be [<VPIcon icon="fas fa-globe"/>JavaScript Signals](https://signaldb.js.org/signals). Unlike lit-html, signals are already a [Stage 1 Proposal (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-signals`)](https://github.com/tc39/proposal-signals) so there is a slightly better chance it will become a standard part of the JavaScript specification within the next few years.

As you can see from the Stage 1 Proposal, explaining JavaScript Signals from scratch can be very long that it might as well be its own multi-part article series so I will just give a rundown on how I used it in the `<pokemon-card>` custom-element. If you’re interested in a quick explanation of what signals are, the creator of SolidJS, which is a popular framework that uses signals, explains their thoughts [<VPIcon icon="fa-brands fa-youtube"/>here](https://youtu.be/l-0fKa0w4ps).

Signals need an effect implementation to work which is not a part of the proposed signal API, since according to the proposal, it ties into “framework-specific state or strategies which JS does not have access to”. I will be copy and pasting the [watcher code (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-signals`)](https://github.com/tc39/proposal-signals?tab=readme-ov-file#implementing-effects) in the example despite the comments recommending otherwise. My components are also too basic for any performance related issues to happen anyways. I also used the [@lit-labs/signals (<VPIcon icon="iconfont icon-github"/>`lit/lit`)](https://github.com/lit/lit/tree/main/packages/labs/signals) to keep the component “lit themed” but you can also just use the recommended [<VPIcon icon="iconfont icon-github"/>`proposal-signals/signal-polyfill`](https://github.com/proposal-signals/signal-polyfill) directly too.

### Signal Syntax

The syntax I used to create a signal state in my custom HTMLElement are as follows:

```js
#visibleIndex = new Signal.State(0)

get visibleIndex() {
  return this.#visibleIndex.get()
}

set visibleIndex(value: number) {
  this.#visibleIndex.set(value)
}
```

There is a much more concise way to define the above example which involves [<VPIcon icon="iconfont icon-typescript"/>auto accessors](https://typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#auto-accessors-in-classes) and [<VPIcon icon="iconfont icon-typescript"/>decorators](https://typescriptlang.org/docs/handbook/decorators.html#accessor-decorators). Unfortunately, CodePen only [supports](https://codepen.io/versions/) TypeScript 4.1.3 as of writing, so I’ve opted to just use long-hand syntax in the example. An [example (<VPIcon icon="iconfont icon-github"/>`proposal-signals/signal-polyfill`)](https://github.com/proposal-signals/signal-polyfill?tab=readme-ov-file#combining-signals-and-decorators) of the accessor syntax involving signals is also shown in the signal-polyfill proposal.

---

## Card Component Extras

The [<VPIcon icon="fa-brands fa-firefox"/>Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) was used to allow the user to navigate the card component via horizontal scroll bar while also properly updating the state of the current page being displayed.

There is also a [<VPIcon icon="fa-brands fa-firefox"/>`keydown` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event) handler present to also let the user navigate between the cards via keyboard presses. Depending on the key being pressed, it calls either the `handlePrev()` or `handleNext()` method to perform the navigation.

Finally, while entirely optional, I also added a feature to the component that will [<VPIcon icon="fa-brands fa-firefox"/>preload the next card in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image) to improve loading times between generating new cards.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Write Custom Elements with lit-html",
  "desc": "You can use a smaller part of Lit to build web web components that still take advantage of some of it's best features, particularly if you're cool with Light DOM.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-elements-with-lit-html.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
