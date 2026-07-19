---
lang: en-US
title: "How to Create Accessible Modals and Pop-ups Using HTML, CSS, and Minimal JavaScript"
description: "Article(s) > How to Create Accessible Modals and Pop-ups Using HTML, CSS, and Minimal JavaScript"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Accessible Modals and Pop-ups Using HTML, CSS, and Minimal JavaScript"
    - property: og:description
      content: "How to Create Accessible Modals and Pop-ups Using HTML, CSS, and Minimal JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-accessible-modals-and-pop-ups-using-html-css-and-minimal-javascript.html
prev: /programming/css/articles/README.md
date: 2026-07-18
isOriginal: false
author:
  - name: jabo Landry
    url: https://freecodecamp.org/news/author/Arnold-Jabo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e929b316-4b85-459b-9c40-1b7928518077.png
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
  name="How to Create Accessible Modals and Pop-ups Using HTML, CSS, and Minimal JavaScript"
  desc="Creating pop-ups and modals on your site can be a complicated process. And it often requires a lot of boilerplate code to get started. But the real challenge comes when you want to make that modal or "
  url="https://freecodecamp.org/news/how-to-create-accessible-modals-and-pop-ups-using-html-css-and-minimal-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e929b316-4b85-459b-9c40-1b7928518077.png"/>

Creating pop-ups and modals on your site can be a complicated process. And it often requires a lot of boilerplate code to get started.

But the real challenge comes when you want to make that modal or pop-up accessible.

Today, I'll show you how you can use `<dialog>` to create an accessible modal/pop-up with minimal setup using HTML, CSS and JavaScript.

::: note Prerequisites

Before diving in, it helps if you’re comfortable with a few basics:

- **CSS fundamentals**: You should be familiar with common CSS terminology and concepts (selectors, properties, positioning, and so on).
- **HTML structure**: A working knowledge of how elements are organized in the DOM will make the examples easier to follow.
- **JavaScript DOM basics**: While this guide uses only minimal JavaScript, understanding how to query and manipulate DOM elements will give you more confidence as you experiment.

:::

That’s all you need. No frameworks, no heavy boilerplate. Just a foundation in the core web technologies.

---

## How to Create Pop-ups with `popover`

Creating a pop-up from scratch using HTML, CSS and JavaScript can be quite challenging. A pop-up is a small dialog box that appears on the screen to show extra information or ask for input. Because it’s temporary by design, users expect it to disappear once they’re done interacting with it, like when they press Escape or click outside of it.

Using the HTML `popover` and `popovertarget` attributes, you can have several built-in accessibility and interaction behaviors, such as Escape-to-close and light dismiss, but you still need to choose the right semantic element and test keyboard and screen reader behavior.

### Setting Up the Pop-up with HTML

To be practical, let's create a common example and use case for pop-ups on a webpage. We'll create a nav element that displays when a user clicks a hamburger menu or the menu list.

First, you'll set the `popover` attribute on the pop-up container. This tells HTML to treat the containing block as a pop-up and hide it from the screen by default.

Then you set the `popovertarget` attribute on the element that will trigger the pop-up (like a button element or something else) to unhide the hidden element with an attribute of `popover`.

::: tip Example

```html
<button popovertarget="navbar-menu" id='nav-btn'>open</button>
<nav id="navbar-menu" popover>
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Address</a>
</nav>
```

:::

With the above setup, you have a pop-up with useful built-in interaction behaviors, including Escape-to-close and light dismiss. You can hide it from the screen by pressing the <kbd>ESC</kbd> key on the keyboard or when you click anywhere else on the page (as long as it's not inside the pop-up section).

Remember that the `popover` attribute alone doesn't automatically make a pop-up accessible. You still need to use the appropriate semantic elements, provide accessible labels where needed, and test keyboard and screen reader behavior.

### How to Align the Pop-up

Now you'll want to align the pop-up and place it where you want it to be. By default, the pop-up (or modal) that's created using either the `popover` attribute or the dialog tag will be centered on the page.

This is because by default elements with `popover` have a position of `fixed` and the `inset` of 0, which centers the pop-up box and a margin of `auto`.

::: note

`inset` is the shorthand for top, bottom, left and right of an element's position on the page. If you want to have the same size on all of sides of an element, use inset.

:::

If you don't want your pop-up in the center, you can start by setting the element with `popover` position to absolute to isolate it from the page's flow:

```css
#navbar-menu {
  position: absolute;
}
```

You can then disable the margin to 0 and positions (inset) to `unset`:

```css
#navbar-menu {
  position: absolute;
  margin: 0;
  inset: unset;
}
```

After this, you can then place the popover element on the side of the page you want.

### How to Use the `position-anchor` Property

::: note

CSS Anchor Positioning is a newer feature. Check browser support before relying on it in production and provide a fallback for browsers that don't support it yet.

:::

The next step is to position the element close to the element that triggers it. For it we can use the [<VPIcon icon="fa-brands fa-firefox"/>`position-anchor` property of CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-anchor).

The `position-anchor` property in CSS specifies a default anchor element that an absolutely or fixed-positioned element will "tether" or snap to. It lets you link a floating target (like our pop-up here) to another element on the page using only CSS.

In our example, we have a menu list icon or a hamburger menu that will open and close the nav element as a pop-up. We want the nav bar menu to be attached to/near the menu list that opens it.

So, you can add the `anchor-name` property to a menu icon. The name must be prefixed with double-dashes (and the name can be anything you want).

```css
#nav-btn {
  anchor-name: --nav;
}
```

The `position-anchor` property lets you attach an element to another element identified by an anchor name. Once anchored, you can use the `anchor()` function to position the element relative to that anchor, like aligning it to the anchor’s top, bottom, or center.

```css
#navbar-menu {
  position: absolute;
  margin: 0;
  inset: auto;
  position-anchor: --nav;
  top: anchor(bottom);
  right: anchor(right);
}
```

Pass the anchor name you give your anchor as value of `position-anchor` to align the nav element (`#navbar-menu` in our example) on the page around the `anchor-name` of `nav` which is `#nav-btn` in our example.

Then the `anchor()`positions the top of nav element on the bottom side and right side to the menu's right side.

<CodePen
  user="jabo-arnold"
  slug-hash="ogBBNNa"
  title="pop-up navbar"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## How to Create a Modal Using the `dialog` Tag

Using the `command` and `commandfor` attributes on a button, you can declaratively control a `<dialog>`. For example, `command="show-modal"` opens it as a modal, while `command="close"` closes it.

Pop-up modals and pop-ups are different: with a pop-up, you can still interact with the page when the pop-up is active. But with modals or pop-up modals you can't interact with the page – modals lock the screen until they're ignored or confirmed.

When a `<dialog>` is opened as a modal, it's placed in the browser's top layer so that it appears above the rest of the page content. The rest of the document becomes inert, meaning users can't interact with it while the modal is open. The browser also creates a `::backdrop` behind the modal, which you can style to provide a visual overlay.

Here's an example:

```html
<button command="show-modal" commandfor="contact-dialog">
  open modal
</button>

<dialog id="contact-dialog">
  <button command="close" commandfor="contact-dialog" aria-label="close modal">
    close modal
  </button>
  <!--modal contents goes here-->
</dialog>
```

You can use the `command` attribute to close and show the modal and the `commandfor` attribute to reference the modal that's being targeted using the modal's id.

The `command` attribute can receive one of the following options:

- `show-modal`: This option is used on the element that will trigger the modal or the dialog box to open it.
- `close`: This option is passed to an element and will close the modal when it's open.

In the code snippet example, you can see that the button with label `open modal` has a `command` attribute with the option to **show-modal** and the `commandfor` attribute that's targeting the dialog element by its id.

The close modal button is using the **close** option on the `command` attribute to close the modal when clicked. It also uses `commandfor` to indicate which modal should be closed when the close button is clicked.

Below you'll find a demo of a modal that's created using the `command` and `commandfor` attributes:

<CodePen
  user="jabo-arnold"
  slug-hash="NPdRqWK"
  title="native HTML dialog experimentation"
  :default-tab="['css','result']"
  :theme="dark"/>

Try clicking the "click to pop a modal!" button on the Code Pen above to see the modal you can create by just using the `command` and `commandfor` attributes on a `dialog` tag.

### Create modal using `showModal()`

The command API may not be supported in older browsers. Alternatively you can use JavaScript's `showModal()` method, as it's widely available in many browsers compared to `command` and `commandfor`.

```js
const btn = document.querySelector("button");
const dialog = document.querySelector("dialog");

btn.addEventListener("click", () => {
  dialog.showModal();
});
```

### How to Open a Non-Modal Dialog with `show()`

Sometimes you may want to have an element like modal that stays interactive and doesn't block the other pages content like the `command` and `commandfor` attributes do. For this, you can use `show()` on dialog using JavaScript.

```js
const btn = document.querySelector("button");
const dialog = document.querySelector("dialog");

btn.addEventListener("click", () => {
  dialog.show();
});
```

The above snippet keeps the rest of the page interactive while the dialog is open. This differs from opening a dialog with `showModal()` or using `command="show-modal"`, which opens the dialog as a modal and makes the rest of the document inert.

::: note

Keep in mind that `show()` isn't considered a modal but more of a dialog-like element that doesn't block interaction with the rest of the page.

:::

---

## Gotchas to Pay Attention to

When you're using element `popover`, the `command` and `commandfor` attributes, or the `show()` method, there are some "gotchas" to watch out for. Paying attention to these will help you stick to best practices.

### Don't Use Flex or Grid

Directly applying layout-related styles like Flex or Grid is highly discouraged on both elements with `popover` and modal elements.

By default, elements with `popover` attribute, `command` and `commandfor` button attributes, and `show()` have a display of `none`. This basically means the pop-up or modal is hidden from the screen.

When you add `flex` or `grid` directly on element with the `popover` attribute or on a modal element, you're rewriting the modal or `popover` element's default behavior and they will be always visible on the screen. This means that you won't be able to hide the modal from the screen.

Check out the below example in the CodePen demo:

```css
#navbar-menu {
  display: grid;
  /* other styles definition*/
}
```

<CodePen
  user="jabo-arnold"
  slug-hash="wBgrJEv"
  title="not-allowed-popup"
  :default-tab="['css','result']"
  :theme="dark"/>

You can see from the example that the nav element is always visible even if we click on the menu button to hide it again.

#### Suggested Approach

In this situation, you can either use the `popover-open` pseudo-class on an element on a property that has `popover` attributes, or you can use `dialog[open]` on the dialog element.

The pseudo-class styles the element based on its state when interacting with the page. So, in this case we want to give the pop-up or a modal a different layout when it's in the open state.

Example:

```css
/* element with a popover*/
#navbar-menu:popover-open {
  display: grid;
  gap: 2rem;
}

/* using a dialog element*/
dialog[open] {
  display: grid;
  gap: 2rem;
}
```

### Background Scrolling

Another thing to consider when using the `<dialog>` element is background scrolling. Depending on the browser and platform, the underlying page may still be scrollable while a modal dialog is open. If you want to prevent this behavior, you can explicitly disable scrolling while the dialog is open.

Take a look at this CodePen example:

<CodePen
  user="jabo-arnold"
  slug-hash="NPdRqWK"
  title="native HTML dialog experimentation"
  :default-tab="['css','result']"
  :theme="dark"/>

When you click on the button to show the modal, you can still see the scrollbar on the page, and you can scroll around the page.

#### Suggested Approach

To deal with this issue we can use the `has` pseudo class. `has` helps select the parent element based on its children's state. On the root element or HTML element, you can check if it has an open modal. If so, you can set the root element or HTML element overflow to hidden.

::: tip Example

```css
html:has(dialog[open]) {
  overflow: hidden;
}
```

:::

This will hide the scrollbar on the page when the modal is open. Keep in mind that you can also use any parent element to wrap the `dialog` tag with the `has` pseudo class. It doesn't always have to be the root element or HTML element.

---

## The `::backdrop` Pseudo Class

If you want to use a customized overlay color on the `popover` element or modal element, you can use the `::backdrop` pseudo class to customize the appearance for the modal overlay color.

::: tip Example

```css
dialog::backdrop {
  background: rgba(43, 50, 200, 0.4);
}
```

:::

This will apply the overlay with defined `RGB` colors and the `opacity` of 0.4 on the overlay to have a little transparent on the overlay.

---

## Final Thoughts

I hope you've gained something new from this article, and that it will help you start using these techniques in your projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Accessible Modals and Pop-ups Using HTML, CSS, and Minimal JavaScript",
  "desc": "Creating pop-ups and modals on your site can be a complicated process. And it often requires a lot of boilerplate code to get started. But the real challenge comes when you want to make that modal or ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-accessible-modals-and-pop-ups-using-html-css-and-minimal-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
