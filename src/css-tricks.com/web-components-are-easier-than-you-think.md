---
lang: en-US
title: "Web Components Are Easier Than You Think"
description: "Article(s) > Web Components Are Easier Than You Think"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Web Components Are Easier Than You Think"
    - property: og:description
      content: "Web Components Are Easier Than You Think"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/web-components-are-easier-than-you-think.html
prev: /programming/css/articles/README.md
date: 2021-03-08
isOriginal: false
author:
  - name: John Rhea
    url : https://css-tricks.com/author/johnrhea/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/02/zombie-custom-web-component.jpg
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
  name="Web Components Are Easier Than You Think"
  desc="When I’d go to a conference (when we were able to do such things) and see someone do a presentation on web components, I always thought it was pretty nifty"
  url="https://css-tricks.com/web-components-are-easier-than-you-think"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/02/zombie-custom-web-component.jpg"/>

When I’d go to a conference (when we were able to do such things) and see someone do a presentation on web components, I always thought it was pretty nifty (yes, apparently, I’m from 1950), but it always seemed complicated and excessive. A thousand lines of JavaScript to save four lines of HTML. The speaker would inevitably either gloss over the oodles of JavaScript to get it working or they’d go into excruciating detail and my eyes would glaze over as I thought about whether my per diem covered snacks.

But in a recent [<VPIcon icon="fas fa-globe"/>reference project](https://undead.institute/zombie-reference/) to make learning HTML easier (by adding zombies and silly jokes, of course), the completist in me decided I had to cover every HTML element in the spec. Beyond those conference presentations, this was my first introduction to the `<slot>` and `<template>` elements. But as I tried to write something accurate and engaging, I was forced to delve a bit deeper.

And I’ve learned something in the process: **web components are a lot easier than I remember.**

::: info Article series

```component VPCard
{
  "title": "Web Components Are Easier Than You Think",
  "desc": "When I’d go to a conference (when we were able to do such things) and see someone do a presentation on web components, I always thought it was pretty nifty",
  "link": "/css-tricks.com/web-components-are-easier-than-you-think.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

- [**Interactive Web Components Are Easier Than You Think**](/css-tricks.com/interactive-web-components-are-easier-than-you-think.md)
- [**Using Web Components in WordPress is Easier Than You Think**](/css-tricks.com/using-web-components-in-wordpress-is-easier-than-you-think.md)
- [**Supercharging Built-In Elements With Web Components “is” Easier Than You Think**](/css-tricks.com/supercharging-built-in-elements-with-web-components-is-easier-than-you-think.md/)
- [**Context-Aware Web Components Are Easier Than You Think**](/css-tricks.com/context-aware-web-components.md)
- [**Web Component Pseudo-Classes and Pseudo-Elements are Easier Than You Think**](/css-tricks.com/web-component-pseudo-classes-and-pseudo-elements.md)

:::

Either web components have come a long way since the last time I caught myself daydreaming about snacks at a conference, or I let my initial fear of them get in the way of truly knowing them — probably both.

I’m here to tell you that you—yes, *you*—can create a web component. Let’s leave our distractions, fears, and even our snacks at the door for a moment and do this together.

---

## Let’s start with the `<template>`

A `<template>` is an HTML element that allows us to create, well, a template—the HTML structure for the web component. A template doesn’t have to be a huge chunk of code. It can be as simple as:

```html
<template>
  <p>The Zombies are coming!</p>
</template>
```

The `<template>` element is important because it holds things together. It’s like the foundation of building; it’s the base from which everything else is built. Let’s use this small bit of HTML as the template for an `<apocalyptic-warning>` web component—you know, as a warning when the zombie apocalypse is upon us.

---

## Then there’s the `<slot>`

`<slot>` is merely another HTML element just like `<template>`. But in this case, `<slot>` customizes what the `<template>` renders on the page.

```html
<template>
  <p>The <slot>Zombies</slot> are coming!</p>
</template>
```

Here, we’ve slotted (is that even a word?) the word “Zombies” in the templated markup. If we don’t do anything with the slot, it defaults to the content between the tags. That would be “Zombies” in this example.

Using `<slot>` is a lot like having a placeholder. We can use the placeholder as is, or define something else to go in there instead. We do that with the `name` attribute.

```html
<template>
  <p>The <slot name="whats-coming">Zombies</slot> are coming!</p>
</template>
```

The `name` attribute tells the web component which content goes where in the template. Right now, we’ve got a slot called `whats-coming`. We’re assuming zombies are coming first in the apocalypse, but the `<slot>` gives us some flexibility to slot something else in, like if it ends up being a robot, werewolf, or even a web component apocalypse.

---

## Using the component

We’re technically done “writing” the component and can drop it in anywhere we want to use it.

```html
<apocalyptic-warning>
  <span slot="whats-coming">Halitosis Laden Undead Minions</span>
</apocalyptic-warning>

<template>
  <p>The <slot name="whats-coming">Zombies</slot> are coming!</p>
</template>
```

See what we did there? We put the `<apocalyptic-warning>` component on the page just like any other `<div>` or whatever. But we also dropped a `<span>` in there that references the `name` attribute of our `<slot>`. And what’s between that `<span>` is what we want to swap in for “Zombies” when the component renders.

::: note

Here’s a little gotcha worth calling out: custom element names must have a hyphen in them. It’s just one of those things you’ve gotta know going into things. [<VPIcon icon="fas fa-globe"/>The spec](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) prescribes that to prevent conflicts in the event that HTML releases a new element with the same name.

:::

Still with me so far? Not too scary, right? Well, minus the zombies. We still have a little work to do to make the `<slot>` swap possible, and that’s where we start to get into JavaScript.

---

## Registering the component

As I said, you do need some JavaScript to make this all work, but it’s not the super complex, thousand-lined, in-depth code I always thought. Hopefully I can convince you as well.

You need a constructor function that registers the custom element. Otherwise, our component is like the undead: it’s there but not fully alive.

Here’s the constructor we’ll use:

```js
// Defines the custom element with our appropriate name, <apocalyptic-warning>
customElements.define("apocalyptic-warning",

  // Ensures that we have all the default properties and methods of a built in HTML element
  class extends HTMLElement {

    // Called anytime a new custom element is created
    constructor() {

      // Calls the parent constructor, i.e. the constructor for `HTMLElement`, so that everything is set up exactly as we would for creating a built in HTML element
      super();

      // Grabs the <template> and stores it in `warning`
      let warning = document.getElementById("warningtemplate");

      // Stores the contents of the template in `mywarning`
      let mywarning = warning.content;

      const shadowRoot = this.attachShadow({mode: "open"}).appendChild(mywarning.cloneNode(true));
    }
  });
```

I left detailed comments in there that explain things line by line. Except the last line:

```js
const shadowRoot = this.attachShadow({mode: "open"}).appendChild(mywarning.cloneNode(true));
```

We’re doing a lot in here. First, we’re taking our custom element (`this`) and creating a clandestine operative—I mean, shadow DOM. `mode:` `open` simply means that JavaScript from outside the `:root` can access and manipulate the elements within the shadow DOM, sort of like setting up back door access to the component.

From there, the shadow DOM has been created and we append a node to it. That node will be a deep copy of the template, including all elements and text of the template. With the template attached to the shadow DOM of the custom element, the `<slot>` and `slot` attribute take over for matching up content with where it should go.

Check this out. Now we can plop two instances of the same component, rendering different content simply by changing one element.

<CodePen
  user="anon"
  slug-hash="qBavGXX"
  title="The ______ Are Coming!"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Styling the component

You may have noticed styling in that demo. As you might expect, we absolutely have the ability to style our component with CSS. In fact, we can include a `<style>` element right in the `<template>`.

```html
<template id="warningtemplate">
  <style>
    p {
      background-color: pink;
      padding: 0.5em;
      border: 1px solid red;
    }
  </style>

    <p>The <slot name="whats-coming">Zombies</slot> are coming!</p>
</template>
```

This way, the styles are scoped directly to the component and nothing leaks out to other elements on the same page, thanks to the shadow DOM.

Now in my head, I assumed that a custom element was taking a copy of the template, inserting the content you’ve added, and then injecting that into the page using the shadow DOM. While that’s what it looks like on the front end, that’s not how it actually works in the DOM. The content in a custom element stays where it is and the shadow DOM is sort of laid on top like an overlay.

![Screenshot of the HTML source of the zombie-warning component. The custom element is expanded in the shadow dam, including the style block, the custom element, and the template.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/02/s_8F6DFB47EF22F682CD91E662DFC02FBCEE87E5F6DAB4ACF2DC8A9426D0ED22D9_1613567406842_shadowDOM_warning.jpg?resize=900%2C250&ssl=1)

And since the content is technically *outside* the template, any descendant selectors or classes we use in the template’s `<style>` element will have no affect on the slotted content. This doesn’t allow full encapsulation the way I had hoped or expected. But since a custom element *is* an element, we can use it as an element selector in any ol’ CSS file, including the main stylesheet used on a page. And although the inserted material isn’t technically in the template, it *is* in the custom element and descendant selectors from the CSS will work.

```css
apocalyptic-warning span {
  color: blue;
}
```

<CodePen
  user="anon"
  slug-hash="wvodjjY"
  title="The ______ Are Coming and They're Blue..."
  :default-tab="['css','result']"
  :theme="dark"/>

But beware! Styles in the main CSS file cannot access elements in the `<template>` or shadow DOM.

---

## Let’s put all of this together

Let’s look at an example, say a profile for a zombie dating service, like one you might need after the apocalypse. In order to style both the default content and any inserted content, we need *both* a `<style>` element in the `<template>` *and* styling in a CSS file.

The JavaScript code is exactly the same except now we’re working with a different component name, `<zombie-profile>`.

```js
customElements.define("zombie-profile",
  class extends HTMLElement {
    constructor() {
      super();
      let profile = document.getElementById("zprofiletemplate");
      let myprofile = profile.content;
      const shadowRoot = this.attachShadow({mode: "open"}).appendChild(myprofile.cloneNode(true));
    }
  }
);
```

Here’s the HTML template, including the encapsulated CSS:

```html :collapsed-lines
<template id="zprofiletemplate">
  <style>
    img {
      width: 100%;
      max-width: 300px;
      height: auto;
      margin: 0 1em 0 0;
    }
    h2 {
      font-size: 3em;
      margin: 0 0 0.25em 0;
      line-height: 0.8;
    }
    h3 {
      margin: 0.5em 0 0 0;
      font-weight: normal;
    }
    .age, .infection-date {
      display: block;
    }
    span {
      line-height: 1.4;
    }
    .label {
      color: #555;
    }
    li, ul {
      display: inline;
      padding: 0;
    }
    li::after {
      content: ', ';
    }
    li:last-child::after {
      content: '';
    }
    li:last-child::before {
      content: ' and ';
    }
  </style>

  <div class="profilepic">
    <slot name="profile-image"><img src="https://assets.codepen.io/1804713/default.png" alt=""></slot>
  </div>

  <div class="info">
    <h2><slot name="zombie-name" part="zname">Zombie Bob</slot></h2>

    <span class="age"><span class="label">Age:</span> <slot name="z-age">37</slot></span>
    <span class="infection-date"><span class="label">Infection Date:</span> <slot name="idate">September 12, 2025</slot></span>

    <div class="interests">
      <span class="label">Interests: </span>
      <slot name="z-interests">
        <ul>
          <li>Long Walks on Beach</li>
          <li>brains</li>
          <li>defeating humanity</li>
        </ul>
      </slot>
    </div>

    <span class="z-statement"><span class="label">Apocalyptic Statement: </span> <slot name="statement">Moooooooan!</slot></span>

  </div>
</template>
```

Here’s the CSS for our `<zombie-profile>` element and its descendants from our main CSS file. Notice the duplication in there to ensure both the replaced elements and elements from the template are styled the same.

```css
zombie-profile {
  width: calc(50% - 1em);
  border: 1px solid red;
  padding: 1em;
  margin-bottom: 2em;
  display: grid;
  grid-template-columns: 2fr 4fr;
  column-gap: 20px;
}
zombie-profile img {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin: 0 1em 0 0;
}
zombie-profile li, zombie-profile ul {
  display: inline;
  padding: 0;
}
zombie-profile li::after {
  content: ', ';
}
zombie-profile li:last-child::after {
  content: '';
}
zombie-profile li:last-child::before {
  content: ' and ';
}
```

All together now!

<CodePen
  user="anon"
  slug-hash="zYoxeXL"
  title="Zombie Profiles"
  :default-tab="['css','result']"
  :theme="dark"/>

While there are still a few gotchas and other nuances, I hope you feel more empowered to work with the web components now than you were a few minutes ago. Dip your toes in like we have here. Maybe sprinkle a custom component into your work here and there to get a feel for it and where it makes sense.

That’s really it. Now what are you more scared of, web components or the zombie apocalypse? I might have said web components in the not-so-distant past, but now I’m proud to say that zombies are the only thing that worry me (well, that and whether my per diem will cover snacks…)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Web Components Are Easier Than You Think",
  "desc": "When I’d go to a conference (when we were able to do such things) and see someone do a presentation on web components, I always thought it was pretty nifty",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/web-components-are-easier-than-you-think.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
