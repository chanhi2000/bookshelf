---
lang: en-US
title: "Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style"
description: "Article(s) > Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style"
    - property: og:description
      content: "Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/menus-toasts-and-more.html
prev: /programming/js/articles/README.md
date: 2024-03-04
isOriginal: false
author:
  - name: Ollie Williams
    url: https://blog.master.dev/author/olliewilliams/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/1104
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
  name="Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style"
  desc="Dropdowns, menus, tooltips, comboboxes, toasts — the popover attribute will make building a large variety of UI components easier. The popover attribute can be used on any HTML element, so you have the flexibility to choose whichever element is most appropriate semantically for each particular use case. Unlike a dialog, a popover is always non-modal […]"
  url="https://blog.master.dev/menus-toasts-and-more/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/1104"/>

Dropdowns, menus, tooltips, comboboxes, toasts — the `popover` attribute will make building a large variety of UI components easier. The `popover` attribute can be used on any HTML element, so you have the flexibility to choose whichever element is most appropriate semantically for each particular use case. Unlike a dialog, a popover is always [<VPIcon icon="fas fa-globe"/>non-modal](https://hidde.blog/dialog-modal-popover-differences/) — meaning they don’t block interaction with anything else on the page. To toggle a popover open and closed, a `button` element needs to include an `invoketarget` attribute with a value that matches the `id` of the popover.

```xml
<button invoketarget="foobar">Toggle popover</button>

<div id="foobar" popover>
  Popover content goes here...
</div>
```

A `<button>` with an `invoketarget` attribute is called an *invoker*. Invokers might eventually bring all sorts of power to HTML markup, but in its first iteration it’s limited to opening and closing popovers and dialogs. You don’t need `onclick=` or `addEventListener`, it’ll just work.

The fact that popovers work without JavaScript is nice, but toggling `display: none` on an element using JS was never challenging. Popovers do, however, bring far more to the table:

- Popovers make use of the top layer.
- Light-dismiss functionality: clicking outside of the popover will close the popover.
- Hitting the escape key will close the popover.
- Focus management: when you open a popover, the next tab stop will be the first focusable element inside the popover. If you’ve focused an element within the popover and then close the popover, focus is returned to the correct place (this was tricky to get right with JavaScript).

---

## Browser support

The `popover` attribute is supported in Chrome, Safari, and Firefox 125. The `popovertarget` attribute currently has better browser support than `invoketarget`. `popovertarget` is popover-specific, offering a declarative way to toggle popovers open and closed. `popovertarget` will likely eventually be [deprecated and replaced (<VPIcon icon="iconfont icon-github"/>`openui/open-ui`)](https://github.com/openui/open-ui/issues/869) by the more flexible `invoketarget`. After popovers shipped in Chrome, some smart people realised it would also be handy to have a declarative way for buttons to open dialogs and perform other tasks, which is why there are two ways to do the same thing. A [polyfill for invokers (<VPIcon icon="fa-brands fa-npm"/>`invokers-polyfill`)](https://npmjs.com/package/invokers-polyfill) is available.

---

## Light dismiss

The `popover` attribute can be set to either `auto` (the default) or `manual`. When set to `auto`, the popover has light dismiss functionality: if the user clicks outside of the popover, the popover is closed. Pressing the escape key will also close the popover. Only one `auto` popover is ever open at a time.

When set to `manual`, there is no light dismiss functionality and the escape key does not close the popover. The popover must be explicitly closed by pressing the button again (or by calling `hidePopover()` in JavaScript). Multiple `manual` popovers can be open at the same time.

```xml
<button invoketarget="foobar">Toggle popover</button>

<div id="foobar" popover="manual">
  Popover content goes here...
</div>
```

---

## Invoker actions

Along with the `invoketarget` attribute, a button can also optionally include an `invokeaction` attribute. The different actions are listed below.

| Action | Description |
| --- | --- |
| `showpopover` | Show a popover. |
| `hidepopover` | Close a popover. |
| `showmodal` | Open a dialog element as modal. |
| `close` | Close a dialog element. |

If you omit the `invokeaction` attribute, the default behaviour depends on the context: If the target set by `invoketarget` is a popover it will call `.togglePopover()`. If the target is a dialog it will call `showModal()` if the dialog is closed and will close the dialog if the dialog is open.

Using invokers for the dialog element looks much the same as the popover example:

```xml
<button invoketarget="my-dialog">Open Dialog</button>

<dialog id="my-dialog">
  Dialog content goes here.
  <button invoketarget="my-dialog" invokeaction="close">Close dialog</button>
</dialog>
```

Along with built-in actions, developers can write custom actions. This is outside the scope of this article as a custom action [could do anything (<VPIcon icon="fa-brands fa-codepen"/>`keithamus`)](https://codepen.io/keithamus/pen/abXbzqv) — it need not be related to dialogs or popovers.

While a selling point of invokers is forgoing JavaScript, they also provide a new JavaScript `invoke` event should you need more than the default behaviour. This event is fired on the popover or dialog, not the button.

```js
document.querySelector("[popover]").addEventListener("invoke", function(event) {
    console.log(event.action);
    console.log(event.invoker);
    // do something useful here...
  });
```

Within the event handler you can get a reference to whichever button triggered the invocation with `event.invoker` and determine the action specified by `invokeaction` with `event.action`.

---

## Popover methods and events

For many use cases, the popover API doesn’t require JavaScript. What if we want to display a toast notification without a user first interacting with a button, for example?

There are methods to show, hide, or toggle a popover element: `.showPopover()`, `.hidePopover()` and `.togglePopover()`, respectively.

```js
document.getElementById('toast').showPopover();
```

There is a `toggle` event that fires on the popover both when the popover gets shown and when it gets hidden (there are no separate open or close events). This would be useful for a toast alert that automatically disappears after a set amount of time, for example, as there’s no markup or CSS-based way to do that.

Its worth checking that the popover isn’t already hidden before calling `hidePopover()`. We can do that with either `.matches(':popover-open')`, [<VPIcon icon="fa-brands fa-firefox"/>`.checkVisibility()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility), or `event.newState === 'open'`, all of which will return `true` if the popover is open.

```js
toast.addEventListener("toggle", function (event) {
  if (event.target.matches(":popover-open")) {
    setTimeout(function () {
      toast.hidePopover();
    }, 3000);
  }
});
```

<CodePen
  user="anon"
  slug-hash="XWxVWyw"
  title="Toast using popover API with entry and exit animation"
  :default-tab="['css','result']"
  :theme="dark"/>

There’s also a `beforetoggle` method, which is similar but lets you call `event.preventDefault()` inside the event handler, should you need to — and it might come in useful for animations. The `toggle` event, by contrast, isn’t cancellable.

---

## Default popover styles

By default a popover is set to `position: fixed` and displayed in the center of the viewport with a solid black border but you’re free to style it however you like. The styles the browser applies to a popover look something like this:

```css
[popover] {
  position: fixed;
  width: fit-content;
  height: fit-content;
  inset: 0px;
  margin: auto;
  border: solid;
  padding: 0.25em;
}
```

If I wanted to position a popover in the bottom left, for example, I’d need to set `top` and `right` to either `auto`, `initial` or `unset`.

```css
.toast {
  inset: unset;
  bottom: 12px;
  left: 12px;
}
```

---

## Beyond `z-index`: The top layer

Some JavaScript frameworks have something called *portals* for rendering things like tooltips and dialogs. I always found portals difficult to work with. The [<VPIcon icon="fa-brands fa-react"/>React docs](https://react.dev/reference/react-dom/createPortal#rendering-to-a-different-part-of-the-dom) describe portals like so:

::: "createPortal" *From React* (<VPIcon icon="fa-brands fa-react"/><code>react.dev</code>)

> “Portals let your components render some of their children into a different place in the DOM. This lets a part of your component “escape” from whatever containers it may be in. For example, a component can display a modal dialog or a tooltip that appears above and outside of the rest of the page… You can use a portal to create a modal dialog that floats above the rest of the page, even if the component that summons the dialog is inside a container with overflow: hidden.”

<SiteInfo
  name="createPortal – React"
  desc="The library for web and native user interfaces"
  url="https://react.dev/reference/react-dom/createPortal#rendering-to-a-different-part-of-the-dom"
  logo="https://react.dev/favicon-16x16.png"
  preview="https://react.dev/images/og/reference-react-dom-createPortal.png"/>

:::

When working with either the `<dialog>` element (rather than crafting one out of divs) or the `popover` attribute, you can avoid this issue entirely — no portals required. Their location in the DOM doesn’t matter. Its often convenient to collocate the markup for a popover or `<dialog>` together with the button that opens it. They can appear anywhere in your markup and won’t get cropped by `overflow: hidden` on a parent element. They make use of the top layer, which is a native web solution for rendering content above the rest of the document. The top layer sits above the document and always trumps `z-index`. An element in the top layer can also make use of a styleable `::backdrop` pseudo-element.

---

## Animate an element into and out of the top layer

By default, when a popover or dialog is opened, it instantly appears. You might want to add an entry animation — perhaps a quick opacity fade-in, for example. `@starting-style` is used to animate an element into view with a CSS `transition` (you don’t need `@starting-style` when working with `@keyframes`). `@starting-style` works both when you’re adding a new element to the DOM and when an element is already in the DOM but is being made visible by changing its display value from `display: none`. When in a closed state, both the popover attribute and the `<dialog>` element make use of `display: none` under the hood, so `@starting-style` can be used to animate them onto the page.

The following transition will fade and spin the popover into view, and scale down the size of the popover for the exit transition.

```css
/*  Transition to these styles on entry, and from these styles on exit   */
[popover]:popover-open {
  opacity: 1;
  rotate: 0turn;
  transition: rotate .5s, opacity .5s, display .5s allow-discrete, overlay .5s allow-discrete;
}

/*   Entry transition starts with these styles  */
@starting-style {
  [popover]:popover-open {
    opacity: 0;
    rotate: 1turn;
  }
}

/*  Exit transition ends with these styles  */
[popover]:not(:popover-open) {
  scale: 0;
  transition: scale .3s, display .3s allow-discrete, overlay .3s allow-discrete;
}
```

<CodePen
  user="anon"
  slug-hash="LYaBaaP"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

The popover will transition from its `@starting-style` styles to its `[popover]:popover-open` styles every time it’s opened.

The `overlay` transition is necessary boilerplate when transitioning an element in or out of the top layer. The [<VPIcon icon="iconfont icon-w3c"/>`overlay`](https://drafts.csswg.org/css-position-4/#overlay) property was added to CSS purely for this use case and has no other practical application. It is an unusual property to the extent that, outside of transitions, it can only be specified by the browser — you can’t set it with your own CSS. By default, a dialog or popover is instantly removed from the top layer when closed. This will lead to the element getting clipped and obscured. By transitioning `overlay`, the element stays in the top layer until the transition has finished.

`transition-behavior` is a new CSS property that can be set to either `normal` or `allow-discrete`. In the above code example I’m using the shorthand.

Similarly for the `display` property, by including it in the transition and specifying `transition-behavior: allow-discrete` we ensure that a change from `display: none` happens at the very start of the entrance transition and that a change to `display: none` happens at the very end of the exit transition.

`@starting-style` has some useful applications outside of working with popovers and dialogs, but that’s a topic for a different article.

You can transition the `::backdrop` pseudo-element in a similar way.

e.g.

```css
@starting-style {
  [popover]:popover-open::backdrop {
    opacity: 0;
  }
}
```

Now let’s look at doing the same transition with a `<dialog>` element:

```css
/*  Transition to these styles on entry, and from these styles on exit   */
dialog:open {
  opacity: 1;
  rotate: 0turn;
  transition: rotate .5s, opacity .5s, display .5s allow-discrete, overlay .5s allow-discrete;
}

/*   Entry transition starts with these styles  */
@starting-style {
  dialog:open {
    opacity: 0;
    rotate: 1turn;
  }
}

/*  Exit transition ends with these styles.  */
dialog:closed {
  scale: 0;
  transition: scale .3s, display .3s allow-discrete, overlay .3s allow-discrete;
}
```

The `:open` and `:closed` selectors are new pseudo-selectors. They work for details, dialog, and select elements — but not for popovers. You can use `dialog[open]` and `dialog:not([open])` for the time being for better browser support.

These examples all work in Chrome. `@starting-style` and `transition-behavior` are part of [**Interop 2024**](/web.dev/interop-2024.md), meaning they’ll likely be fully supported by the end of the year. [<VPIcon icon="fa-brands fa-apple"/>Safari 17.4](https://developer.apple.com/documentation/safari-release-notes/safari-17_4-release-notes#Web-Animations) added support for `transition-behavior: allow-discrete`. Safari Technology Preview 189 added support for `@starting-style`. WebKit have yet to declare a [position (<VPIcon icon="iconfont icon-github"/>`WebKit/standards-positions`)](https://github.com/WebKit/standards-positions/issues/169) on the `overlay` property.

---

## Anchor positioning

With a component like a toast or a dialog, we generally want to position the element in relation to the viewport. We typically display a dialog in the center of the screen, and a toast at the bottom. That’s easy to do. There are other times when you need to position an element in relation to another element on the page. For a dropdown menu, for example, we want to place the popover in relation to the button that opened it. This is more challenging.

![Screenshot of the ... three dot menu on YouTube opened up showing a menu of three options: Clip, Save, and Report.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/03/youtube-menu-example.png?resize=947%2C463&ssl=1)

This sort of behaviour usually requires JavaScript and led to the creation of the popular JavaScript libraries Popper, Floating UI and Tether. With the addition of anchor positioning to CSS, we’ll no longer need to reach for JavaScript. The [<VPIcon icon="iconfont icon-w3c"/>`anchor()` function](https://drafts.csswg.org/css-anchor-position-1/) allows developers to tether an absolutely positioned element to one or more other elements on the page. Unfortunately, it’s a work-in-progress so I’ll revisit the topic when the spec and implementation are more solid.

---

## Conclusion

I covered a lot in this article but there’s more to come. The popover attribute can be useful all by itself but some forthcoming web APIs will help cover more use cases. Anchor positioning looks set to be the most useful CSS feature since grid. Stay tuned.

```component VPCard
{
  "title": "Popover API is Here",
  "desc": "This API, which you can use entirely in HTML, allows you to open an element on top of *everything* despite where it lives in the DOM and without any particular styling. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/popover-api-is-here.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "What’s the Difference Between HTML’s Dialog Element and Popovers?",
  "desc": "They are pretty similar in both look and functionality, but are have some important differences, slightly different APIs, and functionality. The use cases are also a bit different, so let's have a look!",
  "link": "/blog.master.dev/whats-the-difference-between-htmls-dialog-element-and-popovers.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: Popovers (Part 2/3)",
  "desc": "Using our 3, 2, 1 state system, we can make popovers animate on ",
  "link": "/blog.master.dev/in-n-out-animations-popovers-part-2-3.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style",
  "desc": "Dropdowns, menus, tooltips, comboboxes, toasts — the popover attribute will make building a large variety of UI components easier. The popover attribute can be used on any HTML element, so you have the flexibility to choose whichever element is most appropriate semantically for each particular use case. Unlike a dialog, a popover is always non-modal […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/menus-toasts-and-more.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
