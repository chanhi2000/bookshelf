---
lang: en-US
title: "Basic Dialog Usage and Gotchas To Watch For"
description: "Article(s) > Basic Dialog Usage and Gotchas To Watch For"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Basic Dialog Usage and Gotchas To Watch For"
    - property: og:description
      content: "Basic Dialog Usage and Gotchas To Watch For"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/basic-dialog-usage-and-gotchas-to-watch-for.html
prev: /programming/css/articles/README.md
date: 2024-02-05
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/724
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
  name="Basic Dialog Usage and Gotchas To Watch For"
  desc="The <dialog> element in HTML is tremendous. We’ve got support across the board now, so using it is a smart plan. Just with basic usage, you get a centered modal dialog experience that comes up when you call it, a dimmed background, focus trapped within it, closes with the ESC key, and focus returning where […]"
  url="https://blog.master.dev/basic-dialog-usage-and-gotchas-to-watch-for/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/724"/>

The `<dialog>` element in HTML is tremendous. We’ve got [<VPIcon icon="iconfont icon-caniuse"/>support across the board](https://caniuse.com/dialog) now, so using it is a smart plan. Just with basic usage, you get a centered modal dialog experience that comes up when you call it, a dimmed background, focus trapped within it, closes with the ESC key, and focus returning where it came from. You can style it all entirely predictably in CSS. Those things range from a little bit of a pain to downright hard to pull off if left to our own implementations. Now we get them all *for free* as they say.

You don’t automatically get a close button, so here’s a basic implementation that adds that.

```xml
<button class="show-dialog-button">Show Dialog</button>

<dialog id="dialog">
  <div class="dialog-title">
    Hi, I'm a dialog.
  </div>
  <button aria-label="Close Dialog" class="close-dialog-button">
    <svg ...>
  </button>
</dialog>
```

Now we need two click handlers, one for opening and one for closing.

```js
const showDialogButton = document.querySelector(".show-dialog-button");
const closeDialogButton = document.querySelector(".close-dialog-button");
const dialog = document.querySelector("dialog");

showDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});
```

I think the naming of things here almost qualifies as a gotcha. So it’s `showModal()` eh? Why not `showDialog()`, since, ya know, it’s for the `<dialog>` element? So to close it it must be `closeDialog()` or `hideDialog()` surely, right? No. Just `close()`. Oh well I’m sure that was [<VPIcon icon="fas fa-globe"/>bikeshedded](https://en.wiktionary.org/wiki/bikeshedding) to death and there are probably *✨ reasons*.

That code above is it really, that’s largely functional. And that, friends, is extremely cool. Here’s a quick live demo:

<CodePen
  user="anon"
  slug-hash="VwRxOWg"
  title="dialog issue"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s another little gotcha! *Where do you want to position that close button?*

I would think probably in the top right or top left of the dialog. So you might…

```css{2}
dialog {
  position: relative;

  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
```

Danger danger!

By setting the `<dialog>` to `position: relative;`, something we naturally do when I’m thinking about using `position: absolute;` on a child element, we’ve introduced a potentially gnarly UX bug. Desktop browsers will now scroll the page all the way to the top when the dialog is opened, and you’ll see the dialog open and centered in the viewport. **But on iOS, the window will not scroll up.** This leads to a situation where you can open the dialog and… not see it at all.

<VidStack src="https://videopress.com/aca280d9-dfa4-4797-958f-2cecb8309144" />

The problem there is that, by default, the `<dialog>` is `position: fixed;`, which means it would show up no matter where the page is scrolled to (even without force-scrolling to the top). But we’ve (ok ok, *I’ve*) accidentally overridden it with `relative` creating this unexpected behavior.

It’s a little tempting to look into locking the scroll position while the dialog is open, [<VPIcon icon="fas fa-globe"/>perhaps with a simple `:has()`-based selector](https://robbowen.digital/wrote-about/locking-scroll-with-has/), but I’m not sure how much I care if the page can scroll while it’s open.

There is other little gotcha’s to think about as well, like the fact that content within dialogs are not find-on-page-able until opened. Which kinda makes sense, but content within details elements are, so it’s just something you need to know about and probably not accidentally hide content within you want available always. I’d [<VPIcon icon="fas fa-globe"/>listen to Scott O’Hara](https://scottohara.me/blog/2023/01/26/use-the-dialog-element.html), myself.

If you want to see a `<dialog>` in production use, look no further. Posts right here on Boost have a “Take Quiz” button the sidebar that opens a dialog with a custom Web Component that the Frontend Masters team have built to help build you a custom course path.

<VidStack src="https://videopress.com/fa8e0499-989e-47b7-af60-e76a6e72a600" />

Any other gotchas you’ve found with the dialog element?

Oh hey ya know what, if someone were to make like 8-10 really cool designs for the `<dialog>` and the `::backdrop`, that would make for a pretty sweet guest post, I’d say.

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
  "title": "Lessons Learned from Recreating a Styled Dialog",
  "desc": "Sometimes pretty simple HTML elements have a lot of things to consider and take care of, from interactivity, styling, accessibility, and more.",
  "link": "/blog.master.dev/lessons-learned-from-recreating-a-styled-dialog.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/03/toast-thumb.jpg?fit=1000%2C500&ssl=1&resize=350%2C200)](https://blog.master.dev/menus-toasts-and-more/ "Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style")

#### [Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style](https://blog.master.dev/menus-toasts-and-more/ "Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style")

Dropdowns, menus, tooltips, comboboxes, toasts — the popover attribute will make building a large variety of UI components easier. The popover attribute can be used on any HTML element, so you have the flexibility to choose whichever element is most appropriate semantically for each particular use case. Unlike a dialog,…

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Basic Dialog Usage and Gotchas To Watch For",
  "desc": "The <dialog> element in HTML is tremendous. We’ve got support across the board now, so using it is a smart plan. Just with basic usage, you get a centered modal dialog experience that comes up when you call it, a dimmed background, focus trapped within it, closes with the ESC key, and focus returning where […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/basic-dialog-usage-and-gotchas-to-watch-for.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
