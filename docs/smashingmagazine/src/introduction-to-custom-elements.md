---
lang: en-US
title: "A Detailed Introduction To Custom Elements"
description: "Article(s) > A Detailed Introduction To Custom Elements"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Detailed Introduction To Custom Elements"
    - property: og:description
      content: "A Detailed Introduction To Custom Elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/introduction-to-custom-elements.html
prev: /programming/css/articles/README.md
date: 2014-03-04
isOriginal: false
author:
  - name: Peter Gasston
    url : https://smashingmagazine.com/author/peter-gasston/
cover: https://smashingmagazine.com/images/smashing-homepage.png
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
  name="A Detailed Introduction To Custom Elements"
  desc="Web Components are a suite of connected technologies aimed at making elements reusable across the Web. The lion’s share of the conversation has been around Shadow DOM, but probably the most transformative technology of the suite is Custom Elements, **a method of defining your own elements**, with their own behavior and properties."
  url="https://smashingmagazine.com/2014/03/introduction-to-custom-elements/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://smashingmagazine.com/images/smashing-homepage.png"/>

Web Components are a suite of connected technologies aimed at making elements reusable across the Web. The lion’s share of the conversation has been around Shadow DOM, but probably the most transformative technology of the suite is Custom Elements, **a method of defining your own elements**, with their own behavior and properties.

You’ve probably heard all the noise about [**Web Components**](/smashingmagazine.com/styling-web-components-using-a-shared-style-sheet.md) and how they’re going to change Web development forever. If you haven’t, you’ve either been living under a rock, are reading this article by accident, or have a full, busy life that doesn’t leave you time to read about unstable and speculative Web technologies. Well, not me.

That’s quite an ambiguous description, so the point of this article is to explain what Custom Elements are for, why they’re so transformative and how to use them. Please note, first, that I’ll talk about **custom elements** (common noun) when discussing the concept and **Custom Elements** (proper name) when discussing the technology, and secondly, that my humor tends to wear very thin very quickly. Let’s push forward.

---

## “What’s The Point Of Custom Elements?”

The basic idea is that if you create an element that always performs the same role and has the same set of properties and functions applied to it, then you should be able to name it after what it does. We have the `video` element for displaying video, the `select` element for displaying a select box, the `img` element for displaying images (and saving us from typing two characters whenever we write it). A lot of elements describe their own function.

But **the Web today has to do a lot more work than it did previously**, and HTML can’t always keep up with the rate of change. So Custom Elements are about giving us, the developers, flexibility to create elements based on their function and giving us low-level access to define their properties.

If the elements we create become well established, they could become a fully standardized part of a future HTML specification. The things we make could define the future of the things we make.

---

## “But Can’t We Create Custom Elements Right Now In HTML?”

You’re right, notional reader, we can. It’s disgustingly easy. Just open your favorite text editor and make up an element in an HTML document, like so:

```xml
<apes>…</apes>
```

Open it in a browser. It works. You can style it, attach JavaScript events to it. It may not be “valid” (who cares about that these days, right, kids?), but it works. You can do it with any name you like, and it’ll create a new inline element.

Well, yes. Sure. You could certainly do that, and perhaps it would even make your markup a little more understandable to other people — but that’s really the only advantage it brings. Custom Elements are smarter than that, and they bring real, measurable benefits. We’ll get to the benefits of Custom Elements in a moment; first, I want to show how easy it is to make one.

---

## “Are Custom Elements Easy To Create?”

They are, I just told you so in the previous sentence. The first step is to think of a good name. The only rule here is that, to avoid clashing with current or future HTML elements, you must use a hyphen somewhere in the name. For example:

```xml
<great-apes>…</great-apes>
```

When you’ve decided on a name, the next step is to register it in the DOM, which is done by passing the name in as an argument in the JavaScript `registerElement()` method, like so:

```js
document.registerElement('great-apes');
```

Now the DOM will recognize your newly registered `great-apes` element and the real fun can start. By the way, to confuse the terminology even further, an element created like this that’s not defined in the HTML specification is known as a “custom tag,” so don’t be surprised if I use that term.

---

## “I Still Don’t Get What The Big Deal Is”

Bear with me, impatient notional reader. The big difference between puny custom elements and mighty custom tags (I hope you’re not surprised by me using that term) is the interface that’s exposed to the DOM. Custom elements, unregistered and unrecognized, use the `HTMLUnknownElement` interface, whereas registered and recognized custom tags use the `HTMLElement` interface.

What’s the difference? With an `HTMLElement`, we can add our own methods and properties, creating essentially a per-element API. Wait, I understated how amazing that is: **a per-element API!!!** Yes, every custom tag can have its own API.

To initiate this, you would first define a new prototype, then attach your properties and methods to it. In this example, I’m creating a method named `hoot()` that logs a message to the console:

```js
var apeProto = Object.create(HTMLElement.prototype);
apeProto.hoot = function() {
  console.log('Apes are great!');
}
```

The next step is to register the element, just as before, only this time adding an argument in the options of `registerElement()` to state that it should use our newly defined prototype:

```js
document.registerElement('great-apes', {prototype: apeProto});
```

When this is done, you can query your element in the DOM and call the method:

```js
var apes = document.querySelector('great-apes');
apes.hoot();
```

Now, this is the simplest example I could possibly think of, but just take a minute to consider how this could be extended further still: adding unique properties, attributes and events to each element; putting markup in your element that renders with content passed in as attribute values; even having elements with no UI at all but that perform functions such as database queries. Honestly, the opportunity here is *huge*.

As a quick example of just how exceptionally useful Custom Elements can be, see [Eduardo Lundgren’s `google-maps` (<VPIcon icon="iconfont icon-github" />`eduardolundgren/google-maps-element`)](https://github.com/eduardolundgren/google-maps-element) element, which embeds a Google Map and can have options passed in through attribute values, like this:

```xml
<google-maps latitude="-8.034881" longitude="-34.918377"></google-maps>
```

---

## “Can Existing Elements Be Extended To Use This API?”

Wow, you really ask the most convenient questions. Yes, excitingly, we *can* make Custom Elements that extend existing elements. Yes, we can create a whole new API for existing HTML elements! I know, this sounds like the ramblings of a madman, right? But it’s true!

As an example, let’s create a table that has our `hoot()` method attached. To do this, we’d follow all of the steps in the previous section, then make the small addition of a new argument in the options of the `registerElement()` method, a lá:

```js
document.registerElement('great-apes', {
  prototype: apeProto,
  extends: 'table'
});
```

The value of the `extends` argument informs the DOM that the custom element is intended to extend the `table` element. Now, we have to make the `table` element inform the DOM that it wants to be extended, using the `is` attribute:

```xml
<table is="great-apes">…</table>
```

The humble `table` element may now have its own API. For example, it could query its own data in a standardized interface. **A table that has an API to query its own data!!!** How can you not be excited by that?

For a real-world example of an extended element, take a look at [Eduardo Lundgren’s `video-camera` (<VPIcon icon="iconfont icon-github" />`eduardolundgren/video-camera-element`)](https://github.com/eduardolundgren/video-camera-element), which extends the `video` element to use live input from `getUserMedia():`

```xml
<video is="video-camera"></video>
```

---

## “OK, This Is Cool. What Else?”

A set of callback events (with brilliantly prosaic names) are fired throughout the lifecycle of Custom Events: when an element is created (`createdCallback`), attached to the DOM (`attachedCallback`) or detached from the DOM (`detachedCallback`), or when an attribute is changed (`attributeChangedCallback`). For example, to run an anonymous function each time a new instance of a custom tag is created in a page, you’d use this:

```js
apeProto.createdCallback = function () {…};
```

---

## “How Do Custom Elements Work With Other Web Components Features?”

Custom Elements have been designed for complete interoperability with the companion features of the Web Components suite (and other generally related features). For example, you could include markup in the [<VPIcon icon="fas fa-globe"/>`template` element](https://broken-links.com/2013/04/10/the-template-element/), which wouldn’t be parsed by the browser until the element is initiated.

```xml
<great-apes>
  <template>…</template>
</great-apes>
```

You could ensure that the internal code is encapsulated from the browser and hidden from the end user with Shadow DOM. And sharing your element across multiple files and websites would be simplicity itself using HTML Imports.

If you’re not familiar with any of these other technologies yet, don’t worry: Custom Elements also work perfectly well on their own.

---

## “Can I Use Custom Elements Today?”

Well, no. And yes. These aren’t just some pie-in-the-sky concepts; browser vendors are already working on them: the latest releases of Chrome and Opera have implemented the `registerElement()` method, and it also recently landed in Firefox Nightly. But, raw Custom Elements aren’t really ready for use in production just yet.

![Gorillas are great apes… Look, it was either this or a screenshot of even more JavaScript code. (Image credits: [<VPIcon icon="fa-brands fa-flickr"/>Marieke IJsendoorn-Kuijpers](https://flickr.com/photos/mape_s/333862026/))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/47c519a6-6c7f-4c0b-964e-eaebaf4dacbf/gorillas.jpg)

However, there is a way around this, and that’s to use Polymer. In case you haven’t heard of it, it’s an open community project set up to make future Web technologies usable today, and that includes Web Components and, through them, Custom Elements. Polymer is both a development library, which uses native implementations where available and polyfills where not, and a UI library, with common elements and patterns built using its own technology.

::: info Recommended reading

[Enforcing Best Practices In Component-Based Systems](https://smashingmagazine.com/2017/01/styled-components-enforcing-best-practices-component-based-systems/)

:::

If you’re at all interested in Custom Elements — and, as you’ve read almost to the end of this article, I’d suggest you probably are — then Polymer is your best option for learning and making.

---

## “What About Accessibility?”

Ah, notional reader, here you have me. Using Custom Elements comes with one big caveat: **JavaScript is required**. Without it, your brand new element simply won’t work and will fall back to being a plain old `HTMLUnknownElement`. Unless your element gets adopted natively by browsers, there’s simply no way around this. Just plan for a graceful fallback, as you should be doing with JavaScript anyway.

As for further accessibility, it’s really down to you. I strongly suggest adding [<VPIcon icon="fa-brands fa-firefox" />ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) roles and attributes to your custom elements, just as browser default UI elements have today, to ensure that everyone gets a first-class experience of them.

---

## “Where Do I Go Next?”

Home, to have a good lay down. Or, if you prefer to carry on reading about Custom Elements, try some of these links:

- [<VPIcon icon="fas fa-globe"/>Polymer](https://polymer-project.org/) This the project that I talked about three paragraphs ago. Do you really need me to explain it again?
- [<VPIcon icon="fas fa-globe"/>Custom Elements](https://customelements.io/) This is a community-owned gallery of Web Components.
- “[<VPIcon icon="fas fa-globe"/>Custom Elements: Defining New Elements in HTML](https://html5rocks.com/en/tutorials/webcomponents/customelements/),” Eric Bidelman, HTML5 Rocks Bidelman’s article was invaluable to me in writing this piece.
- “[<VPIcon icon="fas fa-globe"/>Custom Elements](https://w3c.github.io/webcomponents/spec/custom/),” W3C The specification is fairly impenetrable, but maybe you’ll get more out of it than I did.

*Front page image credits: [Dmitry Baranovskiy](https://flickr.com/photos/dmitry-baranovskiy/2378867408/).*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Detailed Introduction To Custom Elements",
  "desc": "Web Components are a suite of connected technologies aimed at making elements reusable across the Web. The lion’s share of the conversation has been around Shadow DOM, but probably the most transformative technology of the suite is Custom Elements, **a method of defining your own elements**, with their own behavior and properties.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/introduction-to-custom-elements.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
