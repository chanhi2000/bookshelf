---
lang: en-US
title: "What’s the Difference Between HTML’s Dialog Element and Popovers?"
description: "Article(s) > What’s the Difference Between HTML’s Dialog Element and Popovers?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - dialog
  - html
  - popover
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What’s the Difference Between HTML’s Dialog Element and Popovers?"
    - property: og:description
      content: "What’s the Difference Between HTML’s Dialog Element and Popovers?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/whats-the-difference-between-htmls-dialog-element-and-popovers.html
prev: /programming/css/articles/README.md
date: 2024-09-30
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4069
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
  name="What’s the Difference Between HTML’s Dialog Element and Popovers?"
  desc="They are pretty similar in both look and functionality, but are have some important differences, slightly different APIs, and functionality. The use cases are also a bit different, so let's have a look!"
  url="https://frontendmasters.com/blog/whats-the-difference-between-htmls-dialog-element-and-popovers/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4069"/>

They are different HTML, to begin with. A dialog is like this:

```html
<dialog id="my-dialog">
  Content
</dialog>
```

While a popover is an attribute on some other element:

```html
<aside popover id="my-popover">
  Content
</aside>
```

The reason it’s worth comparing them is that they are quite similar in a lot of ways, both in look and functionality, which can be confusing. It’s worth thinking about which one you really need.

---

## They are both hidden-by-default

If you put either bit of the HTML above onto the page, they will be visually hidden as well as ignored in the accessibility tree by default (but available in the DOM). It isn’t until you specifically show them (via JavaScript or on-page HTML control when available) that they are visible.

![Accessibility tree with a hidden dialog and popover in it.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/Screenshot-2024-09-30-at-11.32.24%E2%80%AFAM.png?resize=762%2C248&ssl=1)

![When dialog is open, it’s a part of the accessibility tree.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/Screenshot-2024-09-30-at-11.33.48%E2%80%AFAM.png?resize=1024%2C346&ssl=1)

You *can* make a `<dialog>` visible by default in HTML alone:

```html{3}
<dialog
  id="my-dialog"
  open
>
  Content
</dialog>
```

Where you *cannot* make a popover visible in HTML alone.

---

## Popovers Have HTML-Only Controls

You *can* make a popover work (open & close) with HTML controls alone:

```html{2}
<!-- This button will open and close the matching popover. No JavaScript required. -->
<button popovertarget="my-popover">
  Toggle Popover
</button>

<aside popover id="my-popover">
  Content of popover
</aside>
```

But you *cannot* build HTML-only controls for a `<dialog>`. Opening and closing a dialog requires JavaScript event handlers.

---

## JavaScript APIs

### Dialog JavaScript APIs

The dialog APIs in JavaScript are interesting in that there are two different distinct APIs for opening it. This is where the term “modal” comes in. Modal is sometimes used as a term for the UI element itself, but here it essentially means if the modal should trap focus inside of it while open, or not.

- `.show()` — Open the dialog in a **non-modal** state, meaning no backdrop is shown and no focus trapping happens. Note that using the `open` attribute in the HTML/DOM to open the dialog is the same (non-modal).
- `.showModal()` — Open the dialog in a **modal** meaning a backdrop is shown and focus is trapped within the modal.
- `.close()` — Closes the dialog (if it’s open).

The `showModal()` method can throw if the dialog is already open in a non-modal state.

Uncaught InvalidStateError: Failed to execute 'showModal' on 'HTMLDialogElement': The dialog is already open as a non-modal dialog, and therefore cannot be opened as a modal dialog.

### Popover JS APIs

Popovers also have JavaScript APIs, but both the opening and closing APIs are different than with modals and do not overlap. These are pretty self explanatory.

- `.showPopover()` — Opens the popover.
- `.hidePopover()` — Closes the popover.

Calling `showPopover` on an already open popover or `hidePopover` on an already hidden popover does not throw.

---

## Focus Trapping

The ability of the dialog element to be opened in a modal state and thus trap focus inside of it is a superpower of this element. It is unique to the dialog element, popovers cannot do this (on their own).

Focus trapping, while it sounds kinda bad, is actually an accessibility *feature.* After all, that’s what a modal is: it *forces you to deal with some interaction* before anything else can be done. It’s actually *also* a [<VPIcon icon="iconfont icon-w3c"/>WCAG requirement to *not* trap focus](https://w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html) when you shouldn’t, but in the case of a modal, you *should* be trapping focus — as well as providing a standard way to close the dialog and escape the trap.

<VidStack src="https://videopress.com/08054cc3-1c6d-46a7-b272-316caff567e3" />

Focus can change to other focusable elements inside, and when you’re about to move focus forward to the next element when you’re at the last, it circles back to the first focusable element within the dialog. **You get all this “for free” with a `<dialog>` opened with `showModal()`**, which is otherwise a huge pain in the ass and you probably won’t even do it right (sorry).

If you need this focus trapping, don’t use a popover as it’s not for this job.

---

## Moving Focus

When a dialog is opened (either modal or non-modal), **focus is moved to the first focusable element within it**. When it is closed, focus is moved back to the element that opened it.

With a popover, focus remains on the element that opened it even after the popup is opened. However, after the popup is open, the next tab will put focus into the popup’s content if there is any in there, regardless of where it is in the DOM, tab through the focusable elements of the popup, then onto other focusable elements outside the popup after the original element that opened it.

This is all tricky work that you get for free by using the `<dialog>` element or popups and frankly a huge reason to use them 👍.

---

## Escape Key

Both *modal* dialogs and popups, when open, **can be closed by pressing the ESC key.** Very handy behavior that helps adhere to accessibility adherence, again given for free, which is tricky and error-prone to write yourself.

<VidStack src="https://videopress.com/3f9705fc-9ae6-4147-994d-9df6c90bf0ea" />

Non-modal dialogs do not close with the ESC key, so you’ll need to provide your own close functionality, like:

```html
<button onclick="myDialog.close()">Close</button>
```

---

## They Have the Same Default Styling

Dialogs and popovers look the same by default and have really basic default styling that you’ll almost certainly want to override.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/Screenshot-2024-09-30-at-10.28.22%E2%80%AFAM.png?resize=776%2C408&ssl=1)

They are essentially `position: fixed;` and `margin: auto;` which centers them in the viewport. This is a probably a smart default for dialogs. In my opinion, popovers are usually begging for [<VPIcon icon="fa-brands fa-firefox"/>anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) to open the popover near where the element that opened it is, but they [**work nicely as slide-out drawers**](/frontendmasters.com/popovers-work-pretty-nicely-as-slide-out-drawers.md) as well, particularly on mobile.

You’ll likely want to bring your own padding, border, background, typography, internal structure, etc.

---

## The Top Layer

Another amazing feature of both dialogs and popovers is that, when open, they are placed on what is called the “top layer”. It is literally impossible for any other element to be on top of them. It doesn’t matter where they are in the DOM (could be quite nested) or what containing blocks or `z-index` is involved, the top layer is the top no matter what. (Although - it is true that if you open *subsequent dialogs/popovers*, e.g. a button in a dialog opens another dialog, the second one will beat the first and be on top, as you’d expect.) This top-layer ability is yet another thing you get for free and a fantastic reason to use these native features.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/CleanShot-2024-09-30-at-11.35.04%402x.png?resize=1024%2C255&ssl=1)

DevTools showing the #top-layer

---

## Backdrops

Both (modal) dialogs and popovers use (and share) a backdrop. This is the layer above all content on the page that covers the page (by default), but is still underneath the actual dialog or popover. This backdrop is a very light transparent black by default, but can be styled like this:

```css
::backdrop {
  background: color-mix(in srgb, purple, transparent 20%);
}
```

That will apply *both* to modal dialogs and default popovers. If you wanted to have different backdrops for them, you could scope them like this, as the backdrop is applied to the element that is open:

```css
[popover]::backdrop {
  
}

dialog::backdrop {
  
}

.some-very-specific-element::backdrop {

}
```
<ImageGallery paths="
  https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/Screenshot-2024-09-30-at-10.31.04%E2%80%AFAM.png?resize=890%2C342&ssl=1
  https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/Screenshot-2024-09-30-at-10.30.56%E2%80%AFAM.png?resize=826%2C392&ssl=1
" />

You don’t *have* to show a backdrop if you don’t want to, but it’s a good indicator for users particularly when modal behavior is in play (and perhaps an anti-pattern when it’s not, as you may be visually hiding elements in focus).

Non-modal dialogs do not have a backdrop.

---

## Soft Dismiss

This feature is unique to popovers. You can “click outside” the popover to close it, by default (yet another tricky behavior to code yourself). I’ve used the term “default popover” in this article and what I mean is when you don’t provide a value to the `popover` attribute. That implies `auto` as a value which is what makes soft dismissal work.

```html
<!-- Soft Dismissible -->
<div popover id="myPopover"></div>

<!-- Soft Dismissible -->
<div popover="auto" id="myPopover"></div>

<!-- NOT Soft Dismissible -->
<div popover="manual" id="myPopover"></div>
```

<VidStack src="https://videopress.com/9a7e12f9-48d5-45d7-bf83-459dca8b172b" />

---

## Multiple Open

Both dialogs and popovers can have multiple open at once. The most recent one to be opened will be the one that is most “on top” and will close the first via soft dismiss or the ESC key. (Also [**see the CloseWatcher API**](/frontendmasters.com/closewatcher.md)).

For a modal dialog, note that because the rest of the page is essentially `inert` when it is open, the near-only way to open another is via interactivity within the first opened dialog.

<VidStack src="https://videopress.com/a59f3aac-f54d-45d5-9b52-5955f4751893" />

For popups, because the default behavior has soft dismissal, the popovers will need to be `popover="manual"` or be opened with JavaScript without interaction for multiple of them to be open.

---

## Purpose and Semantics

Popovers likely have more use cases than dialogs. Any time you [**need a tooltip**](/frontendmasters.com/using-the-popover-api-for-html-tooltips.md) or to provide more contextual information that has good reason not to be visible by default, a popover is a good choice.

Non modal dialogs are pretty similar to a popup, but are perhaps better suited to situations where there is no other element on the page that is relevant to the messaging. Perhaps something like a “No internet connection detected” message, which could be very important to tell a user, but doesn’t need to 100% stop other activity on the page.

Modal dialogs are show-stoppers, forcing a user to deal with them before anything else can happen. They should be used sparingly (they are reached for [<VPIcon icon="fas fa-globe"/>far too much](https://modalzmodalzmodalz.com/), some people say). Perhaps a message like “Are you sure you want to delete this entire document? This cannot be undone.” would be a modal dialog, as any other interaction on the page is moot should the user be deleting.

---

## Animation

This is all very cutting edge right now, so browser support is spotty, but both of these elements [**can be animated both on the way in and out**](/frontendmasters.com/the-dialog-element-with-entry-and-exit-animations.md).

---

[I played around with this Pen (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/NWQGjRv) while I was thinking and working on all this, which may be helpful to you if you’re doing the same.

<CodePen
  user="chriscoyier"
  slug-hash="NWQGjRv"
  title="Dialog vs Popover"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s the Difference Between HTML’s Dialog Element and Popovers?",
  "desc": "They are pretty similar in both look and functionality, but are have some important differences, slightly different APIs, and functionality. The use cases are also a bit different, so let's have a look!",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/whats-the-difference-between-htmls-dialog-element-and-popovers.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
