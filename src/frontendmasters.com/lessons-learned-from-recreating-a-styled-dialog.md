---
lang: en-US
title: "Lessons Learned from Recreating a Styled Dialog"
description: "Article(s) > Lessons Learned from Recreating a Styled Dialog"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Lessons Learned from Recreating a Styled Dialog"
    - property: og:description
      content: "Lessons Learned from Recreating a Styled Dialog"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/lessons-learned-from-recreating-a-styled-dialog.html
prev: /programming/css/articles/README.md
date: 2025-04-16
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5578
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
  name="Lessons Learned from Recreating a Styled Dialog"
  desc="Sometimes pretty simple HTML elements have a lot of things to consider and take care of, from interactivity, styling, accessibility, and more."
  url="https://frontendmasters.com/blog/lessons-learned-from-recreating-a-styled-dialog/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5578"/>

I was on the epicgames.com website the other day, signing up so I could relive my Magic: The Gathering glory days with Arena. While doing that I saw their style for modal dialogs and thought *I should try to re-create that with `<dialog>`* because apparently I’m both of those types of nerd.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Screenshot-2025-04-14-at-8.20.15%E2%80%AFAM.png?resize=900%2C1024&ssl=1)

---

## It’s a `<dialog>`

This thing came up *on top* of other content, so that alone makes it appropriate for the HTML `<dialog>` element. We’ll use that.

---

## No Taller than Viewport

It’s not absolutely required that the entire `<dialog>` needs to be shorter than the viewport. If it’s taller, you just need to be able to scroll to all of the content it contains. The default styling for `<dialog>` allows for that.

But I would argue that if you’re putting actions that relate to the content of the dialog *at the bottom* then you *should* limit the height of the dialog to the viewport so that those actions are always visible. If a dialog simply has an ✕ close button on the top, maybe it doesn’t matter, but here we’ve got important buttons at the bottom, so it does.

The default styling for dialog includes `position: absolute;` and we can keep that while limiting the height like:

```css
dialog {
  block-size: 90dvb;
  inset-block-start: 5dvb;
}
```

That will limit the height to essentially 90% of the viewport height (the `dv`b part means “**d**ynamic **v**iewport size in the **b**lock direction”). I like the “dynamic” sizing units because it means that it accommodates browser “chrome” (toolbars and stuff) being present (or not). The inset amount is half of what’s left over, so essentially vertical centering.

![This graphic convinces me dynamic viewport height units are a good idea.<br/>([<FontIcon icon="iconfont icon-webdev"/>source](https://web.dev/blog/viewport-units))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/100dvh-adapts-itself-be-91c728b09836d_1920.png?resize=1024%2C576&ssl=1)

::: note

Note that the dialog element’s default styles can be a bit confusing and you need to understand when you can override safely and when you can’t without doing extra work. Simon Willison has an interesting article on this: [<FontIcon icon="fas fa-globe"/>Styling an HTML dialog modal to take the full height of the viewport](https://til.simonwillison.net/css/dialog-full-height).

:::

---

## Limited Width and Centering

This example has lots of written content in it (a bunch of `<p>`s) so it’s best practice to limit the width to a readable line length. When that’s the intent, it’s nice to use the `ch` unit as it maps roughly to number of characters, which is what we’re trying to limit.

```css
dialog {
  ...

  inline-size: min(50ch, 90dvi);
  margin-inline: auto;
}
```

Fifty characters of width is providing good readability here, but it’s possible that the current screen is actually narrower than that, hence the `min()` function assuring that the width will never be wider than 90% of the viewport. I’m not sure if our fancy dancy “dynamic viewport units in the inline direction” is buying us anything here, but it balances the usage with where we were using `dvb`).

<ImageGallery paths="
  https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Screenshot-2025-04-15-at-3.25.18%E2%80%AFPM-1.png?resize=1024%2C604&ssl=1
  https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Screenshot-2025-04-15-at-3.25.27%E2%80%AFPM.png?resize=483%2C1024&ssl=1
"/>
---

## Modal vs Non Modal (and the `open` attribute)

This seems like a pretty important distinction to know about:

- **“Modal”** (`dialog.showModal()`) means *interrupt everything else, this dialog needs to be dealt with immediately.*
  - The <kbd>ESC</kbd> key automatically works to close it.
  - Focus is put on the first focusable element within the dialog
  - Focus is trapped within the dialog
- **“Non Modal”** (`dialog.show()`) means the dialog is just *there*, but doesn’t require exclusive or immediate action.
  - None of those other things above happen. You likely want to bind the <kbd>ESC</kbd> key yourself anyway.
  - When you use the open attribute (useful when working on them!) like `<dialog open>` the dialog is open non-modally.

In our example, where a person needs to accept-or-not the Terms & Conditions, it’s likely **modal** is the better approach. That way what the person is trying to do can only continue if they accept or take a different path if they do not. This choice is likely required to know what to do next.

A non-modal dialog implementation might be something like a “site navigation drawer” where some of the attributes of using a modal is desirable (e.g. the hide/show behavior) but focus trapping is not required or even desirable.

Here’s a video of focus trapping at work with the modal state. Notice the “focusable element” (an anchor link) never gets focus, because it’s not within the `<dialog>`.

---

## No Invokers? Yes Invokers!

~There is no way to show a dialog in the modal state from HTML alone.~

Welllll, the above isn’t strictly true anymore as I [<FontIcon icon="fas fa-globe"/>learned from Curtis Wilcoxin the comments](https://frontendmasters.com/blog/lessons-learned-from-recreating-a-styled-dialog/#comment-25883). We can actually use the `popover` syntax to make a button in HTML alone that will open the dialog. That will (sadly) only open the dialog in the non-modal state, but at least it’s a toggle without JavaScript! The good news is that the Invoker Commands API is actually all over this. It’s used like this:

```html
<dialog id="my-dialog">
  ...
</dialog>

<!-- 
  popovertarget is the fallback

  command attributes are the new school,
  which open in a modal state!
-->
<button
  popovertarget="my-dialog"

  command="show-modal"
  commandfor="my-dialog"
>
  Open Modal
</button>

<button
  popovertarget="my-dialog"
  popovertargetaction="hide"

  commandfor="my-dialog"
  command="close"
>
  Close
</button>
```

::: note

To bone up:

```component VPCard
{
  "title": "What’s the Difference Between HTML’s Dialog Element and Popovers?",
  "desc": "They are pretty similar in both look and functionality, but are have some important differences, slightly different APIs, and functionality. The use cases are also a bit different, so let's have a look!",
  "link": "/frontendmasters.com/whats-the-difference-between-htmls-dialog-element-and-popovers.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## Careful with the `display` value

The reason that `<dialog>` is invisible by default is simply that default styles render it with `display: none;`. That is precariously easy to override. In fact, in this very demo I was playing with, I wanted to use `display: flex;` on the dialog to have the header/content/footer look where the content is `flex: 1;` to push the header and footer away and take up the remaining space. But you’ll have problems like this:

```css
/* Oops, dialog is always open */
dialog {
  display: flex;
}
```

It’s probably most resilient to just not mess with the `display` value of dialogs, instead using some internal wrapper element instead. But I’m a gamblin’ man apparently so I did:

```css
dialog {
  &[open] {
    display: flex;
  }
}
```

---

## Trimming `margin` can come anytime now

Any time I slap a bunch of elements into a container (read: doing web design) I’m reminded that the block-direction margins are kind of annoying in that context. The last item, particularly if it’s content, will likely have margin at the end that pushes further than you want it away from the container, or the start, or both.

It leads to this kind of thing:

```css
.container {
  :first-child {
    margin-block-start: 0;
  }
  :last-child {
    margin-block-end: 0;
  }
}
```

When instead we could be living in the future like:

```css
.container {
  margin-trim: block;
}
```

I once [<FontIcon icon="fas fa-globe"/>said this](https://chriscoyier.net/2023/06/12/margin-trim-as-a-best-practice/) and I’m sticking to it:

> If you add`padding`in the main flow direction of an element, adding`margin-trim`in that same direction.

---

## Right aligned buttons deux façons

I had [**`item-flow` on my brain**](/frontendmasters.com/the-latest-in-the-how-are-we-going-to-do-masonry-debate-apple-says-item-flow.md) when I was tinkering with this and thinking about how flow directions can be reversed, which is something I don’t think about or use very much. For some reason when I needed to right-align those buttons for “Accept” and “Close”, my fingers went for:

```css
dialog {
  > footer {
    display: flex;
    flex-direction: row-reverse;
  }
}
```

I’m not going to recommend that, as it changes the tabbing order awkwardly for no great reason. You should probably just do:

```css
dialog {
  > footer {
    display: flex;
    justify-content: end;
  }
}
```

But, ya know, always nice to have options. You could also not even bother with `flex` and do `text-align: end` or even old school `float: right` the buttons.

---

## Autofocus

In reading over [<FontIcon icon="fa-brands fa-firefox"/>the MDN for dialogs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), this stood out to me as something I didn’t know:

::: info The Dialog element <FontIcon icon="fa-brands fa-firefox"/><code>developer.mozilla.org</code>

> The[<FontIcon icon="fa-brands fa-firefox"/>`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus)attribute should be added to the element the user is expected to interact with immediately upon opening a modal dialog. If no other element involves more immediate interaction, it is recommended to add`autofocus`to the close button inside the dialog, or the dialog itself if the user is expected to click/activate it to dismiss.

:::

They didn’t mince words there and it makes sense to me, so I put it on the “Accept” button as that seems like the most likely user action.

```html
<dialog>
  ...
  <footer>
    ...
    <button autofocus>Accept</button>
  </footer>
</dialog>
```

---

Feel free to [peak at the demo (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/dPyExGZ/ca8110591c1b7d7c8a41a51c9917b46a) to see a few other thing like color modes and a backdrop. Sometimes fairly simple looking HTML elements have quite a bit of detail to implementation!

<CodePen
  user="chriscoyier"
  slug-hash="dPyExGZ"
  title="Terms & Conditions Dialog Element"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Lessons Learned from Recreating a Styled Dialog",
  "desc": "Sometimes pretty simple HTML elements have a lot of things to consider and take care of, from interactivity, styling, accessibility, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/lessons-learned-from-recreating-a-styled-dialog.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
