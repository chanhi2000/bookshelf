---
lang: en-US
title: "Popover API or Dialog API: Which to Choose?"
description: "Article(s) > Popover API or Dialog API: Which to Choose?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Popover API or Dialog API: Which to Choose?"
    - property: og:description
      content: "Popover API or Dialog API: Which to Choose?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/popover-api-or-dialog-api-which-to-choose.html
prev: /programming/css/articles/README.md
date: 2026-03-02
isOriginal: false
author:
  - name: Zell Liew
    url: https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/10/dialog-pop.jpg
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

[[toc]]

---

<SiteInfo
  name="Popover API or Dialog API: Which to Choose?"
  desc="Choosing between Popover API and Dialog API is difficult because they seem to do the same job, but they don’t! After a bit lots of research, I discovered that the Popover API and Dialog API are wildly different in terms of accessibility and we'll go over that in this article."
  url="https://css-tricks.com/popover-api-or-dialog-api-which-to-choose"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/10/dialog-pop.jpg"/>

Choosing between Popover API and Dialog API is difficult because they seem to do the same job, but they don’t!

After ~a bit~ lots of research, I discovered that the Popover API and Dialog API are wildly different in terms of accessibility. So, if you’re trying to decide whether to use Popover API or Dialog’s API, I recommend you:

- Use Popover API for most popovers.
- Use Dialog’s API only for modal dialogs.

---

## Popovers vs. Dialogs

The relationship between Popovers and Dialogs are confusing to most developers, but it’s actually quite simple.

**Dialogs are simply subsets of popovers**. And modal dialogs are subsets of dialogs. [**Read this article**](/css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs.md) if you want to understand the rationale behind this relationship.

```md
![[popover-accessible-roles.jpg.webp]]
```

This is why you could use the Popover API even on a `<dialog>` element.

```html
<!-- Using popover on a dialog element --> 
<dialog popover>...</div> 
```

Stylistically, the difference between popovers and modals are even clearer:

- Modals should show a backdrop.
- Popovers should not.

**Therefore, you should never style a popover’s `::backdrop` element**. Doing so will simply indicate that the popover is a dialog — which creates *a whole can of problems*.

**You should only style a modal’s `::backdrop` element**.

---

## Popover API and its accessibility

Building a popover with the Popover API is relatively easy. You specify three things:

- a `popovertarget` attribute on the popover trigger,
- an `id` on the popover, and
- a `popover` attribute on the popover.

The `popovertarget` must match the `id`.

```html
<button popovertarget="the-popover"> ... </button>
<dialog popover id="the-popover"> The Popover Content </dialog>
```

Notice that I’m using the `<dialog>` element to create a `dialog` role. This is optional, but recommended. I do this because `dialog` is a [**great default role**](/css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs.md) since most popovers are simply just dialogs.

This two lines of code comes with a ton of accessibility features already built-in for you:

### Automatic focus management

- Focus goes to the popover when opening.
- Focus goes back to the trigger when closing.

### Automatic aria connection

- No need to write `aria-expanded`, `aria-popup` and `aria-controls`. Browsers handle those natively. Woo!

### Automatic light dismiss

- Popover closes when user clicks outside.
- Popover closes when they press the Esc key.

Now, without additional styling, the popover looks kinda meh. Styling is a whole ‘nother issue, so we’ll tackle that in a future article. [**Geoff has a few notes**](/css-tricks.com/poppin-in.md) you can review in the meantime.

<CodePen
  user="anon"
  slug-hash="dPYXEYV"
  title="Raw Popover"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Dialog API and its accessibility

Unlike the Popover API, the Dialog API doesn’t have many built-in features by default:

- No automatic focus management
- No automatic ARIA connection
- No automatic light dismiss

So, we have to build them ourselves with JavaScript. This is why **the Popover API is superior to the Dialog API in almost every aspect — except for one**: when modals are involved.

The Dialog API has a `showModal` method. When `showModal` is used, the Dialog API creates a modal. It:

1. automatically `inert`s other elements,
2. prevents users from tabbing into other elements, and
3. prevents screen readers from reaching other elements.

It does this so effectively, [**we no longer need to trap focus within the modal**](/css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element.md).

But we gotta take care of the focus and ARIA stuff when we use the Dialog API, so let’s tackle the bare minimum code you need for a functioning dialog.

We’ll begin by building the HTML scaffold:

```html
<button 
  class="modal-invoker" 
  data-target="the-modal" 
  aria-haspopup="dialog"
>...</button>

<dialog id="the-modal">The Popover Content</dialog>
```

Notice I did not add any `aria-expanded` in the HTML. I do this for a variety of reasons:

1. This reduces the complexity of the HTML.
2. We can write `aria-expanded`, `aria-controls`, and the focus stuff directly in JavaScript – since these won’t work without JavaScript.
3. Doing so makes this HTML very reusable.

### Setting up

I’m going to write about a vanilla JavaScript implementation here. If you’re using a framework, like React or Svelte, you will have to make a couple of changes — but I hope that it’s gonna be straightforward for you.

First thing to do is to loop through all `dialog-invoker`s and set `aria-expanded` to `false`. This creates the initial state.

We will also set `aria-controls` to the `<dialog>` element. We’ll do this even though [<VPIcon icon="fas fa-globe"/>`aria-controls` is poop](https://heydonworks.com/article/aria-controls-is-poop/), ’cause there’s no better way to connect these elements (and there’s no harm connecting them) as far as I know.

```js
const modalInvokers = Array.from(document.querySelectorAll('.modal-invoker'))

modalInvokers.forEach(invoker => {
  const dialogId = invoker.dataset.target
  const dialog = document.querySelector(`#${dialogId}`)
  invoker.setAttribute('aria-expanded', false)
  invoker.setAttribute('aria-controls', dialogId)
})
```

### Opening the modal

When the invoker/trigger is clicked, we gotta:

1. change the `aria-expanded` from `false` to `true` to `show` the modal to assistive tech users, and
2. use the `showModal` function to open the modal.

We don’t have to write any code to hide the modal in this `click` handler because users will never get to click on the invoker when the dialog is opened.

```js
modalInvokers.forEach(invoker => {
  // ... 

  // Opens the modal
  invoker.addEventListener('click', event => {
    invoker.setAttribute('aria-expanded', true)
    dialog.showModal()
  })
})
```

<CodePen
  user="anon"
  slug-hash="raOLgLe"
  title="Raw Modal — Open"
  :default-tab="['css','result']"
  :theme="dark"/>

Great. The modal is open. Now we gotta write code to close the modal.

### Closing the modal

By default, `showModal` doesn’t have automatic light dismiss, so users can’t close the modal by clicking on the overlay, or by hitting the Esc key. This means we have to add another button that closes the modal. This must be placed within the modal content.

```html
<dialog id="the-modal"> 
  <button class="modal-closer">X</button>
  <!-- Other modal content -->
</dialog>
```

When users click the close button, we have to:

1. set `aria-expanded` on the opening invoker to `false`,
2. close the modal with the `close` method, and
3. bring focus back to the opening invoker element.

```js
modalInvokers.forEach(invoker => {
  // ... 

  // Opens the modal
  invoker.addEventListener('click', event => {
    invoker.setAttribute('aria-expanded', true)
    dialog.showModal()
  })
})

const modalClosers = Array.from(document.querySelectorAll('.modal-closer'))

modalClosers.forEach(closer => {
  const dialog = closer.closest('dialog')
  const dialogId = dialog.id
  const invoker = document.querySelector(`[data-target="${dialogId}"]`)
  
  closer.addEventListener('click', event => {
    dialog.close()
    invoker.setAttribute('aria-expanded', false)
    invoker.focus()
  })
})
```

Phew, with this, we’re done with the *basic* implementation.

<CodePen
  user="anon"
  slug-hash="QwjERxw"
  title="Raw Modal — Open and Close"
  :default-tab="['css','result']"
  :theme="dark"/>

Of course, there’s advanced work like light dismiss and styling… which we can tackle in a future article.

---

## Can you use the Popover API to create modals?

Yeah, you can.

But you will have to handle these on your own:

1. Inerting other elements
2. [**Trapping focus**](/css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element.md)

I think what we did earlier (setting `aria-expanded`, `aria-controls`, and `focus`) are easier compared to inerting elements and trapping focus.

---

## The Dialog API might become much easier to use in the future

A proposal about [**invoker commands**](/css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more.md) has been [created (<VPIcon icon="iconfont icon-github"/>`whatwg/html`)](https://github.com/whatwg/html/issues/9625) so that the Dialog API can include `popovertarget` like the Popover API.

This is on the way, so we might be able to make modals even simpler with the Dialog API in the future. In the meantime, we gotta do the necessary work to patch accessibility stuff.

## Deep dive into building workable popovers and modals

We’ve only began to scratch the surface of building working popovers and modals with the code above — they’re barebone versions that are accessible, but they definitely don’t look nice and can’t be used for professional purposes yet.

To make the process of building popovers and modals easier, we will dive deeper into the implementation details for a professional-grade popover and a professional-grade modal in future articles.

In the meantime, I hope these give you some ideas on when to choose the Popover API and the Dialog API!

Remember, there’s no need to use both. One will do.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Popover API or Dialog API: Which to Choose?",
  "desc": "Choosing between Popover API and Dialog API is difficult because they seem to do the same job, but they don’t! After a bit lots of research, I discovered that the Popover API and Dialog API are wildly different in terms of accessibility and we'll go over that in this article.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/popover-api-or-dialog-api-which-to-choose.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
