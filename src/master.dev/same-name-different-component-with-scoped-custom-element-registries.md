---
lang: en-US
title: "Same Name; Different Component with Scoped Custom Element Registries"
description: "Article(s) > Same Name; Different Component with Scoped Custom Element Registries"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - master.dev
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Same Name; Different Component with Scoped Custom Element Registries"
    - property: og:description
      content: "Same Name; Different Component with Scoped Custom Element Registries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/same-name-different-component-with-scoped-custom-element-registries.html
prev: /programming/js/articles/README.md
date: 2026-07-30
isOriginal: false
author:
  - name: Dave Samaniego
    url: https://master.dev/blog/author/davesamaniego/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/10479
---

# {{ $frontmatter.title }} 관련

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
  name="Same Name; Different Component with Scoped Custom Element Registries"
  desc="Chrome 146 introduced a scoped custom element registry, allowing different versions of custom elements to share the same tag name without using the global namespace."
  url="https://master.dev/blog/same-name-different-component-with-scoped-custom-element-registries/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/10479"/>

[<VPIcon icon="fa-brands fa-chrome"/>Chrome 146](https://developer.chrome.com/release-notes/146) recently introduced [<VPIcon icon="fa-brands fa-firefox"/>scoped custom element registry](https://developer.chrome.com/release-notes/146#scoped_custom_element_registry), which is a way to introduce custom elements in your app without using the global registry namespace. This makes it possible for different versions or entirely different custom elements to share the same tag name. [<VPIcon icon="fa-brands fa-firefox"/>Firefox 150](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/150#experimental_web_features) also has this feature locked behind a feature flag, so it’s likely to be one of the features listed in [<VPIcon icon="iconfont icon-webdev"/>Baseline 2026](https://web.dev/baseline/2026?hl=en).

In this article, I’m going to share one or two examples of components that *“ought to have the same tag name”*.

---

## The Basics

You’ve got a custom element button. It’s from your design system, hence the “ds” naming:

```html
<ds-button>
```

Great. But maybe you’re *also* using *another* set of custom components, and it’s *also* got a `<ds-button>`. Or, perhaps more likely, it’s your own set of custom elements, but you’ve versioned them, and you need to use v1 and v2 on the same page.

```html
<body>
  <main>
    <!-- v1 usage up here -->
    <ds-button>Button</ds-button>
  </main>

  <footer>
    <!-- v2 usage down here, shadow DOM -->
  </footer>
```

So maybe our default registry is v1, and we get ready by having a custom registry where we’re gonna put v2 stuff.

```js
customElements.define("ds-button", v1Button);

const footerRegistry = new CustomElementRegistry();
footerRegistry.define("ds-button", v2Button);
```

Then *one* way to use the custom registry is to tell the Shadow DOM we put there to use it. This isn’t required as we’ll see later, but it’s one way.

```js
const footer = document.querySelector("footer");
const shadow = footer.attachShadow({
  mode: "open",
  customElementRegistry: footerRegistry
});

shadow.innerHTML = `
  <ds-button>Will be v2Button!</ds-button>
`;
```

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f999d-7e7e-7a38-b344-0c035875145f"
  title="Custom Element Registry Basic Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## This is Niche Stuff!

Before I proceed, I would like to note that I believe this specific issue or scenario can be considered *sub-niche*. Most readers of this article, regardless of their skill level in front-end programming, are likely to agree.

Custom elements are already their own niche, since most applications these days are built with frameworks like React. I do think, though, if you develop applications with a framework that *does compile down to custom elements* such as [<VPIcon icon="iconfont icon-lit"/>Lit](https://lit.dev/), you count as a user of this ‘niche’ feature. Regardless of how widely this feature will be adopted across many websites, it’s already well on its way to becoming a web standard. At the very least, this means you wouldn’t have to worry about this feature being deprecated anytime soon.

---

## About the Following Demos

I used AI to help me create the components by sending images of what the components looked like through the prompt. I also drew ideas from existing design systems, since that’s the easiest way I can think of to get examples that “ought to have the same tag name”.

In the first demo, I showcase two different versions of a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Material Design](https://en.wikipedia.org/wiki/Material_Design) button. The next has three slightly different versions of a [<VPIcon icon="fa-brands fa-apple"/>MacOS context menu](https://developer.apple.com/design/human-interface-guidelines/context-menus).

Although the components are copies of existing designs, I wrote most, if not all, of the code surrounding the components since that is the point of articles such as these.  You can consider this article an alternative to the [<VPIcon icon="fa-brands fa-chrome"/>Chrome blog post](https://developer.chrome.com/blog/scoped-registries) about this feature, mixing in my personal feelings on the feature.

---

## Material Design Button

If you take away only one thing from this article and forget everything else, I would say it has to be this screenshot from [the demo Pen (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019f8a8d-bbdd-7278-a278-1434a9198f37).

![Different buttons with same tag name and their surrounding HTML structure](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/Screenshot-2026-07-30-at-7.39.11-AM.png?resize=986%2C1024&ssl=1)

All of those buttons (the dark blue and purple ones, with different border radius, capitalization, etc) are the same element: `<md-button>`. 

For those unfamiliar, Material Design was something developed by Google so that different Android applications can have a more cohesive look. The [<VPIcon icon="fas fa-globe"/>button with rounded corners](https://m1.material.io/components/buttons.html#buttons-flat-buttons) is based on the original Material Design 1 specification. The [<VPIcon icon="fas fa-globe"/>button, shaped more like a capsule](https://m3.material.io/components/buttons/overview), is based on Material Design 3. Besides Android applications, you’re also likely to see the latter on Google’s Workspace applications in your web browser.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f8a8d-bbdd-7278-a278-1434a9198f37"
  title="Scoped Custom Elements"
  :default-tab="['css','result']"
  :theme="dark"/>

Both buttons were also designed to be themed using the same custom HTML attributes. You can see, for example, that the third button does not have the `md-theme="md3-violet"`, so it defaults to the same color present in the Material Design 1 button.

---

## Context Menu Web Component

For this example, I’ve decided to take an existing design that comes from Apple’s operating system instead of something related to Google. This next example will feature three similarly named context menus that have similar items yet slightly varying designs.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/image-1.png?resize=1024%2C576&ssl=1)

The designs of the context menus were taken from images featured [in this article](https://tonsky.me/blog/tahoe-icons/) since I don’t have my own personal MacOS device to extract them myself. It’s not exactly related to this article, but I recommend reading it later too if you haven’t already. It certainly taught me at least a thing or two on what can be considered a human-friendly design.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f94de-58cd-711c-a208-00550b175a0f"
  title="macos tahoe context menu [showcase]"
  :default-tab="['css','result']"
  :theme="dark"/>

The first two context menus are based on designs from [<VPIcon icon="fa-brands fa-wikipedia-w"/>MacOS Sequioa](https://en.wikipedia.org/wiki/MacOS_Sequoia) and [<VPIcon icon="fa-brands fa-wikipedia-w"/>MacOS Tahoe](https://en.wikipedia.org/wiki/MacOS_Tahoe), respectively, as per the image shown [<VPIcon icon="fas fa-globe"/>here](https://tonsky.me/blog/tahoe-icons/sequoia_tahoe_textedit@2x.webp?t=1782676429). The [<VPIcon icon="fas fa-globe"/>third](https://tonsky.me/blog/tahoe-icons/menu_cleanup_color@2x.webp?t=1782676429) context menu is a personal edit from the author of the blog post that is trying to improve upon the crowded design of Tahoe’s context menu. I know the AI-generated images aren’t exactly one-to-one clones of the images provided by the blog, but most of my attempts have led me to outputs more or less similar to the one shown in the Pen, so here we are.

This example also doesn’t lend itself to any particular theme or background so I’ve decided to use [this liquid glass library (<VPIcon icon="iconfont icon-github"/>`ybouane/liquidglass`)](https://github.com/ybouane/liquidglass) to design the right-click areas of each context menu. Liquid Glass is a design language from Apple that only came out much more recently and was also released alongside macOS Tahoe.

### My Preferred Method of Creating a Scoped Custom Element

In this context menu demo, I ended up declaring the scoped elements through [<VPIcon icon="fa-brands fa-chrome"/>`document.createElement`](https://developer.chrome.com/blog/scoped-registries#scope_to_an_individual_element) on all three of the elements. I believe it would be preferable to avoid methods such as creating a [<VPIcon icon="fa-brands fa-chrome"/>shadow host wrapper](https://developer.chrome.com/blog/scoped-registries#declarative_shadow_dom) for every scoped element present in the page. It just usually feels cumbersome to handle styling elements inside the Shadow DOM. In examples such as the ones in the Pen, where the host wrapper only contains the custom element, the Shadow DOM probably isn’t too much of a problem to work around.

The liquid glass library I used, [<VPIcon icon="iconfont icon-github"/>`ybouane/liquidglass`](https://github.com/ybouane/liquidglass), states that glass elements must be direct children of the root. Even if it did get an update that allowed children nested a few elements deep, I doubt authors of small libraries would have Shadow DOM support as a priority. To put it briefly, let’s just say I’m glad this new scoped registries feature doesn’t necessarily require you to create a shadow root in order to be used. It would take me much more work to integrate it in my context menu codepen demo even if it’s not entirely impossible to do so.

---

## Custom Type Declarations

::: note

This part is no longer an issue nowadays if you are using TypeScript 6 (or higher) or simply don’t use TypeScript at all.

:::

I wrote much of the code shown in my demo before TypeScript 6.0 was released, so I may as well share the type declarations I used.

```ts
declare global {
  interface CustomElementRegistry {
    initialize(root: Node): void
  }

  interface ElementCreationOptions {
    customElementRegistry?: CustomElementRegistry | null | undefined
  }

  interface Document {
    readonly customElementRegistry: CustomElementRegistry | null
  }
   
  interface HTMLElement {
    readonly customElementRegistry: CustomElementRegistry | null
  }

  interface ShadowRoot {
    readonly customElementRegistry: CustomElementRegistry | null
  }
}
```

The [<VPIcon icon="fa-brands fa-firefox"/>`initialize`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/initialize) method is straightforward enough. Simply call it on any DOM Node you query where you want the customElementRegistry to be applied to. Apparently, every Element has this customElementRegistry property now in a browser that supports ‘Scoped Custom Element Registry’. I’m not sure why the standards committee would prefer this property to be nullable only, rather than also allowing it to be optional or not defined. Perhaps it’s a neat way to let developers check whether the browser supports scoped registries via customElementRegistry on the element?

Another detail I noticed from the specification is that [<VPIcon icon="fa-brands fa-firefox"/>ElementCreationOptions](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#options) already existed in some browsers before customElementRegistry was made. It also has another property named ’is’ which enables you to set the ‘is’ attribute of an element to an [<VPIcon icon="fa-brands fa-firefox"/>existing custom element](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#web_component_example). It’s very unlikely this feature will make it to Baseline, though, as you can see from the issue tracker listed in the MDN page referencing this global attribute.

The scoped registry feature, though (unlike the feature I just mentioned that lets you customize built-in elements with `is`) has [<VPIcon icon="fa-brands fa-apple"/>Safari support](https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes). I also think it’s worth mentioning that [Safari was also the first (<VPIcon icon="iconfont icon-github"/>`whatwg/html`)](https://github.com/whatwg/html/issues/10854#issuecomment-2816888199) among the major browsers to implement this standard too.

If you ask me, Safari is much more conservative in implementing web standards compared to Chrome while also having a sizable market share unlike Firefox. That’s why I also hold the view that standards ratified first by Safari are more likely to become baseline than those initially pushed by the other two browsers.

While I think these discussions comparing different browsers may be insightful, it’s also *really subjective* and derailing from the main subject of this article. I’ll just end this section reminding readers that the examples later won’t work if you satisfy [<VPIcon icon="iconfont icon-caniuse"/>the browser requirements](https://caniuse.com/mdn-api_customelementregistry_initialize).

---

## Another Creation Method that I Wish Already Existed

I wish the light DOM version of the feature could also be done with a declarative syntax, similar to the method using the Declarative Shadow DOM. Something like the following:

```html
<div id="my-host" customelementregistry>
  <hello-world></hello-world>
</div>

<!-- Invoking the following script later down the line...  -->
<script>
  const registry = new CustomElementRegistry()
  registry.define("hello-world", class extends HTMLElement {
    connectedCallback() {
      this.textContent = "Hello World"
    }
  })

  const myHost = document.getElementById("my-host")
  registry.initialize(myHost)
</script>
```

As you can see from my example, I would like every HTMLElement to officially support this `customelementregistry` attribute. If you didn’t skip my earlier section talking about type declarations, I also mentioned that every `HTMLElement` now also has its own `customElementRegistry` *property* too.

To give a quick overview of parts from the existing specification that I want to highlight:

- The `customElementRegistry` of an element can only be `null` when it is created using JavaScript and is explicitly defined as such.
- When `customElementRegistry` is null, the element itself and all its child elements will also inherit the same value. The only exception is cases where an element is already created somewhere else and moved here, in which case it will keep its existing value.
- `registry.initialize(root)` only works when the element’s `customElementRegistry` property is still null. Running the function on an element where the registry is already initialized does not change the existing registry.

The feature I would like to happen is that when the `customelementregistry` *attribute* is present in an HTMLElement, its `customElementRegistry` *property* would be considered null on its creation. You then call the initialize method of registry to add the registry to the element, similar to the existing approach. So far, this seems straightforward enough, but some keen readers might also want to ask “What if I apply this attribute to a custom element itself?”

```html
<!-- Maybe sometimes this direct declaration can be better? -->
<hello-world customelementregistry></hello-world>
```

I think this custom element should behave like following:

- That specific custom element tag should remain not defined **even if the tag already exists in the global registry**. It needs to be called with the initialize method in order to be properly upgraded to a custom element
- If the custom element in question doesn’t exist in the global registry, just treat it similarly to a regular div.
- (Optional) If the custom element in question does exist but doesn’t have its own Shadow DOM, use the same behavior stated above. If it does, perhaps make all children of the [<VPIcon icon="fa-brands fa-firefox"/>`slot`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot) inherit the registry of the custom element?

At the very least, this kind of feature would have been useful in my CodePen demo with liquid glass since it did need the glass elements to be direct children. Though I wouldn’t get my hopes up on such a feature because even if something similar to this gets traction, the Shadow DOM does exist for a reason. I would imagine almost anything added to web standards involving the Shadow DOM implies there would be a big performance tax otherwise. I still think these types of “syntactic sugar” features are at least worth a discussion regardless.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Same Name; Different Component with Scoped Custom Element Registries",
  "desc": "Chrome 146 introduced a scoped custom element registry, allowing different versions of custom elements to share the same tag name without using the global namespace.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/same-name-different-component-with-scoped-custom-element-registries.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
