---
lang: en-US
title: "Using and Styling the Dialog Element"
description: "Article(s) > Using and Styling the Dialog Element"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using and Styling the Dialog Element"
    - property: og:description
      content: "Using and Styling the Dialog Element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/using-and-styling-the-dialog-element.html
prev: /programming/js/articles/README.md
date: 2026-08-07
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/10/dialog-pop.jpg
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
  name="Using and Styling the Dialog Element"
  desc="There's a lot of nuance to the <dialog> element, a seemingly little piece of web architecture. I've got some notes from digging into it."
  url="https://css-tricks.com/using-and-styling-the-dialog-element"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/10/dialog-pop.jpg"/>

Wasn’t it great — nay, *amazing* – the day we got a native [**HTML `<dialog>` element**](/css-tricks.com/the-dialog-element.md)? It’s, what now, nearly ten years old? Even so, I always find myself looking up how it works, when to use it, ideas for styling it, and whatnot. There’s a lot of nuance to this seemingly little piece of web architecture and it’s high time I give it a proper look… for future Geoff, but maybe future you as well.

---

## Marking up a `<dialog>`

This is the basic markup:

```html
<button id="dialog-button">Open Dialog</button>
<dialog id="dialog">...</dialog>
```

It won’t open by default. We could manually set the `open` attribute:

```html
<dialog id="dialog-button" open>...</dialog>
```

But when do you ever want to open a dialing by default? I’m sure it’s a rare use case. Instead, we have a JavaScript `show()` method for that. We can set up variables for the dialog and button, then invoke the method:

```js
const dialogButton = document.querySelector('#dialog-button');
const dialog = document.querySelect('#dialog');

formButton.addEventListener('click', () => {
  dialog.show();
})
```

That works, but buyer beware — that treats the dialog as more of a *pop-up* than a *modal*, and modal is what I think you’ll want in most cases. The key differences? A modal includes a [**backdrop**](/css-tricks.com/almanac-pseudo-selectors/backdrop.md), is automatically positioned in the center of the page, and allows the `Esc` key to close it.

Notice how `show()` lacks the backdrop, positioning, and closing stuff:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1818-2b53-74f2-977a-ef9e662c2e3c"
  title="Dialog: Simple Open with show() Method"
  :default-tab="['css','result']"
  :theme="dark"/>

So, maybe invoke the `showModal()` method instead:

```js
const dialogButton = document.querySelector('#dialog-button');
const formDialog = document.querySelector('#dialog');

formButton.addEventListener('click', () => {
  formDialog.showModal();
}) 
```

Great! It opens, positions… and closes:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1802-2551-7aef-8754-cb822ccc6d8f"
  title="Dialog: Simple Open"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More about closing

Now we can hit the `Esc` key when the dialog is in focus (and notice how it’s in focus by default) to close the dialog. But if we want some UI that closes the dialog, like a button, we can add that inside the element:

```html
<button id="dialog-button">Open Dialog</button>

<dialog id="dialog">
  <button id="dialog-close">Close</button>
  <!-- etc. -->
</dialog>
```

That doesn’t work right out of the box but I bet you’ve already guessed how. There’s a `close()` method for it:

```js
const formButton = document.querySelector('#dialog-button');
const formDialog = document.querySelector('#dialog');
const formClose = document.querySelector('#dialog-close');

formButton.addEventListener('click', () => {
  formDialog.showModal();
})

formClose.addEventListener('click', () => {
  formDialog.close();
}) 
 
 
```

I think it’s a little funny/weird that there isn’t a corresponding `closeModal()`. No worries, though, because `close()` just works:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e180e-d4da-75b6-99ee-bf984adbf1c3"
  title="Dialog: Simple Close"
  :default-tab="['css','result']"
  :theme="dark"/>

And if you want a JavasScript-less approach, we can actually do it declaratively directly in the HTML:

```html
<dialog id="dialog">
  <form method="dialog">
    <button type="submit">Close dialog</button>
  </form>
</dialog>
```

I can’t vouch for how that affects semantics, but it is indeed possible to close that sucker without JavaScript.

---

## Invoker Commands

As long as we’re talking about declarative closing, we may as well mention an evolving feature called [**invoker commands**](/css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more.md) that are designed specifically to open and close dialogs declaratively. It’s all totally experimental as I write this, but check this out:

```html
<button command="show-modal" commandfor="my-dialog">Show Dialog</button>
<dialog id="my-dialog">...</dialog>
```

That’s right! We will be able to hook up the button to the dialog directly in HTML with the `command` and and `commandfor` attributes to invoke a specific dialog (`#my-dialog`) to `show-modal`.

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e503c-5f3a-77b9-ba71-9d6a2a2e41c3"
  title="Dialog: Simple Invoker Open"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool, and that’s true for a closing button as well:

```html
<dialog id="my-dialog">
  <!-- Close #my-dialog -->
  <button command="close" commandfor="my-dialog">Close Dialog</button>
</dialog>
```

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e503c-5f3a-77b9-ba71-9d6a2a2e41c3"
  title="Dialog: Simple Invoker Open/Close"
  :default-tab="['css','result']"
  :theme="dark"/>

And, [**as Danny explains here**](/css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more.md##listening-to-commands-with-javascript), we can hook all that up with JavasScript if we need to listen to those commands and fire off some event when they happen:

```js
// Select all dialogs
const dialogs = document.querySelectorAll("dialog");

// Loop all dialogs
dialogs.forEach(dialog => {

  // Listen for close (as normal)
  dialog.addEventListener("close", () => {
    // Dialog was closed
  });

  // Listen for command
  dialog.addEventListener("command", event => {

    // If command is show-modal
    if (event.command == "show-modal") {
      // Dialog was shown (modally)
    }

    // Another way to listen for close
    else if (event.command == "close") {
      // Dialog was closed
    }

  });
});
```

Keep on eye on that support!

<BaselineStatus featureid="invoker-commands" />

---

## About button labeling

You might be tempted to use an “X” (or at least an SVG icon for it) for the close button’s label:

```html
<button id="dialog-button">Open Dialog</button>

<dialog id="dialog">
  <button id="dialog-close">X</button>
</dialog>
```

…but that’s not exactly the best thing for screenreaders to announce. We still want it to say “Close Dialog” or something to that effect. So, if you’re keen on using an “X” icon, I’d add a `<span>` containing the text we want read and [**visually hide it**](/css-tricks.com/inclusively-hidden.md) while preventing the icon from being announced using the `aria-hidden` attribute:

```html
<button id="form-button">Open Dialog</button>

<dialog id="form-dialog">
  <button id="form-close">
    <span class="visually-hidden">Close modal</span> 
    <span aria-hidden="true"></span>
  </button>
</dialog> 
 
```

One more accessibility-minded note. See how the close button gets focus when the dialog opens up?

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/dialog-button-focus.png?resize=884%2C478&ssl=1)

You may or may not want that because now the button could unexpectedly close the dialog if the `Space` key is accidentally hit. Not the end of the world because closing a modal isn’t exactly a destructive thing and can be opened back up. But if you have other focusable elements in the dialog — perhaps a link or a form field — then maybe consider giving one of those initial focus with the `tabindex` attribute.

---

## Innate inertness

I want to get into styling the backdrop, but before that, I think it’s worth noting that the page behind an open dialog is `inert`. In other words, any sort of interaction — text selection, button clicking, focus, inputs, etc. — are unavailable. That’s probably what you want anyway, so it’s good that isn’t something that has to be configured by default. You just won’t actually see the `inert` attribute in the markup when it happens.

But that’s only when the dialog is setup as a *modal*. Remember the very first demo? We used the `show()` method to open the dialog on click rather than the more explicit `showModal()`. That means the first demo is showing off something more like a popover (think tooltips) than a true attention-hoarding modal that traps focus and sits on the very top layer.

You might wonder about competing dialogs, like say a popover and modal that are open at the same time. Well, how did you open them at the same time in the first place? You’d have to open the dialog popover first since that does not trigger `inert` behavior. [<VPIcon icon="fa-brands fa-html5"/>Only the modal dialog does.](https://html.spec.whatwg.org/multipage/interaction.html#modal-dialogs-and-inert-subtrees) And when the modal dialog is open, the popover dialog is not in the top layer, making it inaccessible.

Anyway, let’s get to styling!

---

## Styling the backdrop

Let’s start here because I think it’s incredibly hard to even see the backdrop the way it’s styled by default. If you open dialog in the last example, notice that the page background is slightly tinted. Not much, though. That’s the backdrop.

![Dialog open and close states side by side. The left side has a khaki colored background and the right side is a slightly darker color.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/dialog-default-backdrop-before-after.webp?resize=1184%2C656&ssl=1)

Very subtle. We can style that ourselves with the `[**::backdrop**](/css-tricks.com/almanac-pseudo-selectors/backdrop/)` pseudo-element. For example, we could go full-on solid color:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1830-3c50-767d-b7cd-2f43691e7f9f"
  title="Dialog: Solid Backdrop ❌"
  :default-tab="['css','result']"
  :theme="dark"/>

Buuuuut now we’re obscuring the entire page behind it. That might be OK, but I also think a little transparency, perhaps with a little `[**blur()**](/css-tricks.com/almanac.md#functions/b/blur/)` action can’t hurt because, you know, context:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1832-b13f-71ea-a23d-630eb5cc8edd"
  title="Dialog: Scrolling by Default"
  :default-tab="['css','result']"
  :theme="dark"/>

I actually really like Mojtaba’s background image example [**in the CSS-Tricks Almanac**](/css-tricks.com/almanac-pseudo-selectors/backdrop.md), even if it contradicts my feelings about obscuring the rest of the page:

<CodePen
  user="anon"
  slug-hash="jEVryqr"
  title="::backdrop for a dialog"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Styling the border and background

Two very obvious defaults are setting the `<dialog>`’s styling: a vanilla white background and big ol’ black border. Totally fine to leave that as-is if you’d like. Or, not.

![DevTools styles panel shoeing the user agent styles for a dialog, dialog backdrop, open dialog, and modal dialog.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/dialog-devtools-ua-styles.png?resize=956%2C1208&ssl=1)

You might think your custom styles would go right on the `<dialog>` element:

```css
/* 👎 */
dialog {
  background-color: gold;
  border: 0;
  border-radius: 12px;
}
```

But you actually want to select it in its `open` state:

```css
dialog {
  /* ... */

  &[open] {
    background-color: gold;
    border: 0;
    border-radius: 12px;
  }
}
```

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1836-90ae-719e-a135-7e3fb37572ce"
  title="Dialog: Override Default Border and Background"
  :default-tab="['css','result']"
  :theme="dark"/>

You may have noticed in the DevTools screenshot up there that the `:modal` pseudo-class has even higher specificity than `:open`. You can totally use that as well should you need overrides to the overrides.

Watch out for that `:open` pseudo-class, though. Safari 26.5 just [<VPIcon icon="fa-brands fa-safari"/>gained support for it](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/) the day I’m writing this. If you need deeper support, consider selecting the `[open]` attribute instead… or just using `:modal`.

<BaselineStatus featureid="open-pseudo" />

---

## Styling the position

A less obvious default dialog style is how it’s positioned in the center of the viewport. Open DevTools and you’ll see the UA styling that does that:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/dialog-devtools-margin.png?resize=1576%2C966&ssl=1)

We could override `margin-top` to make the dialog a little more snug with the top of the viewport:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1849-090c-7774-a78c-94a65b8e16ec"
  title="Dialog: Override Default Margin"
  :default-tab="['css','result']"
  :theme="dark"/>

One thing you probably *don’t* want to do is override your dialog’s `display`. It’s set to `display: none` in its initial closed state. Set that to something like `block` on the element itself and you totally lose the whole point of having a modal — the whole closed by default thing. You still get basic opening and closing, only without the handy `Esc` key affordance.

And notice how the custom styles are only applied on the `:open` state since that’s where they live:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e184e-a67a-702c-bb54-4c1ccfa43c68"
  title="Dialog: Override Default Display ❌"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Prevent scrolling when open

Chances are that you don’t want the content behind the `::backdrop` to scroll. It’s one of those situations where a user can be taken out of context and placed somewhere totally different on the page than where they were when opening the dialog.

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1832-b13f-71ea-a23d-630eb5cc8edd"
  title="Dialog: Scrolling by Default"
  :default-tab="['css','result']"
  :theme="dark"/>

It’d be really nice if the underlying content was stuck in place by default, but it’s perfectly understandable why it doesn’t: **a dialog is not a scroll container.** If it was, we could slap `[overscroll-behavior](/css-tricks.com/almanac.md#properties/o/overscroll-behavior/): contain` on it and be done with it.

<BaselineStatus featureid="overscroll-behavior" />

Well, turns out that [**Chrome 144 tweaked that up a bit**](/css-tricks.com/prevent-a-page-from-scrolling-while-a-dialog-is-open.md) so that `overscroll-behavior` works on non-scrollable scroll containers. So, assuming we’re in Chrome 144+, we can set that behavior on the dialog and its backdrop:

```css
dialog {
  overscroll-behavior: contain;

  &::backdrop {
    overscroll-behavior: contain;
  }
}
```

The last missing piece is that we need to make the dialog itself a scroll container:

```css
dialog {
  overflow: hidden;
  overscroll-behavior: contain;

  &::backdrop {
    overscroll-behavior: contain;
  }
} 
```

Chrome 144 or above needed:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1928-a083-728f-9d4a-0ff5b1d146a1"
  title="Dialog: Prevent Scrolling (Chrome 144+)"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s cool and all, but another (and more concise) way to do it with broad browser support is to check if the body element `:has()` a dialog with an `open` attribute. And if it does, we hide the body overflow:

```css
body:has(dialog[open]) {
  overflow: hidden
}
```

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e193e-8963-7261-b8aa-ff44415d07bf"
  title="Dialog: Prevent Scrolling"
  :default-tab="['css','result']"
  :theme="dark"/>

That said, I do like the `overscroll-behavior` approach because it’s more declarative and attached to the element we’re selecting.

---

## Getting creative with dialog styling

Andy Clarke has a complete write-up on [**creative ways to style dialogs**](/css-tricks.com/getting-creative-with-html-dialog.md) beyond the basic content-in-box. It’s well out of scope of what we’re covering here, but well worth the read. Here’s one example to whet your appetite:

<CodePen
  user="anon"
  slug-hash="OPPYQjZ"
  title="Mike Worth’s dialog"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Animating dialogs

Dialogs kinda “snap” in and out when they’re opened and closed. But we can sprinkle in a little animation for when they enter and exit view.

Like, what if we made the dialog slowly fade in instead. You might think this would work:

```css
/* Nope! 👎 */
dialog {
  opacity: 0;
  overflow: hidden;
  overscroll-behavior: contain;
  transition: opacity .5s ease-in-out;
  width: 80vw;

  &:open {
    opacity: 1;
  }
} 
 
 
```

But, no. We have to explicitly set a *starting style* for elements just as they are rendered in the DOM. In this case, a dialog is `display: none` by default and has no opacity set on it when it is activated. That’s where the [**`@starting-style`**](/css-tricks.com/almanac-rules/starting-style.md)` at-rule comes into play:

```css
/* Yep! 👍 */
@starting-style {
  dialog:open {
    opacity: 0;
  }
}

dialog {
  overflow: hidden;
  overscroll-behavior: contain;
  transition: opacity .5s ease-in-out;
  width: 80vw;

  &:open {
    opacity: 1;
  }
}
```

There we go:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1cc1-236d-72c9-910d-6699a8fd6935"
  title="Dialog: Fade In"
  :default-tab="['css','result']"
  :theme="dark"/>

Entering and exiting view? That actually sounds like prime [**View Transitions API**](/css-tricks.com/toe-dipping-into-view-transitions.md) territory! But, alas, dialogs are not a great use case for them. Why? Modal dialogs live in the top layer, and closing them can remove them in a way that does not always produce a reliable old/new pair for the named transition.

Here’s an example of that where we have a `view-transition-name` set on the dialog element and then the `::view-transition-new()` and `::view-transition-old()` states bound to that name, each calling an animation that slides in and slides out, respectively. Works well for the starting transition, but not so much for the exiting transition. Notice, too, that the backdrop needs extra work since it’s included in the mix:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e1cce-1852-70c3-b5ea-d875a4bbc0b6"
  title="Dialog: Slide In-Out View Transition ❌"
  :default-tab="['css','result']"
  :theme="dark"/>

What you can do instead is some sort of hybrid approach by setting the view transition on the open state and using a CSS animation on the close state.

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019e40cd-6eaf-705b-8429-d871ef1913c7"
  title="Dialog: Slide In-Out View Transition ❌"
  :default-tab="['css','result']"
  :theme="dark"/>

Or maybe just use CSS animations/transitions for both states! I’m not sure there’s any real added value in using a view transition on one state for the sake of using a view transition.

Anyway, if you’re looking to get more creative with in-n-out animations, [**Chris Coyier has a pretty cool one**](/master.dev/blog/move-modal-in-on-a-shape.md) where the modal follows a `shape()` path. His demonstrates a dialog configured as a popover, so I forked it and used a modal instead:

<CodePen
  user="anon"
  slug-hash="YPpZLmb"
  title="Move Modal In on Path (Next Gen!)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Dialog or Popover?

Which one should you use? It’s a really good question because the Dialog API and Popover API are super similar but designed for different use cases. [**Zell Liew has a concise answer**](/css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs.md):

> After ~a bit~ lots of research, I discovered that the Popover API and Dialog API are wildly different in terms of accessibility. So, if you’re trying to decide whether to use Popover API or Dialog’s API, I recommend you:
> 
> - Use Popover API for most popovers.
> - Use Dialog’s API only for modal dialogs.

The “in terms of accessibility” is what really matters here because, popovers lack:

- automatic focus management, and
- automatic ARIA connection.

Meanwhile, a dialog:

- automatically `inert`s other elements,
- prevents users from tabbing into other elements, and
- prevents screen readers from reaching other elements.

So, if you’re planning to use a popover and need accessible affordances for trapping focus and making other elements inert, you’ll need to handle those on your own in JavaScript.

Zell also notes that popovers need an explicit accessible role. And there are several to choose from so it’s gonna take some thought to choose the right one.

This isn’t all to say, *hey, always use a dialog*. It’s more about choosing the right API for the right use case. Quoting Zell again:

> - **Popover** is an umbrella term for any kind of on-demand popup.
> - **Dialog** is one type of popover — a kind that creates a new window (or card) to contain some content.

---

## Wrapping up

That’s all for now. I’ll update this if y’all have more to add or better or more accurate ways to articulate what’s here. Future us-es (there’s no plural for *us*, right?) will thank us later.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using and Styling the Dialog Element",
  "desc": "There's a lot of nuance to the <dialog> element, a seemingly little piece of web architecture. I've got some notes from digging into it.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/using-and-styling-the-dialog-element.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
