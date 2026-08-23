---
lang: en-US
title: "Creating Web Widgets Using the Document Picture-in-Picture API"
description: "Article(s) > Creating Web Widgets Using the Document Picture-in-Picture API"
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
      content: "Article(s) > Creating Web Widgets Using the Document Picture-in-Picture API"
    - property: og:description
      content: "Creating Web Widgets Using the Document Picture-in-Picture API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/creating-web-widgets-using-the-document-picture-in-picture-api.html
prev: /programming/js/articles/README.md
date: 2026-08-27
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/05/framed-image.png
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
  name="Creating Web Widgets Using the Document Picture-in-Picture API"
  desc="The general idea is that we create a Document Picture-in-Picture window (DPIP window), and then we put HTML, CSS, and JavaScript into it."
  url="https://css-tricks.com/creating-web-widgets-using-the-document-picture-in-picture-api"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/05/framed-image.png"/>

[<VPIcon icon="fa-brands fa-firefox"/>Firefox 151](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/151) recently shipped the [<VPIcon icon="fas fa-globe"/>Document Picture-in-Picture API](https://wicg.github.io/document-picture-in-picture/). This isn’t the same thing as the (regular?) [<VPIcon icon="iconfont icon-github"/>`w3c/picture-in-picture`](https://github.com/w3c/picture-in-picture/blob/main/explainer.md), which pushes videos into a resizable window that remains visible even after switching browser tabs or OS windows. No, the *Document* Picture-in-Picture API enables us to put *anything* into the window.

I guess we can think of these windows as web widgets. We can use them for floating stock tickers, live chat conversations, playlists, to-do lists, notes, spreadsheets — anything that we’d want to keep on the screen at all times.

The general idea is that we create a Document Picture-in-Picture window (DPIP window), and then we put HTML, CSS, and JavaScript into it. It’s pretty simple when you think about it, but as we explore how the Document Picture-in-Picture API works, we’re going to tackle a slightly more complex scenario that you’ll probably run into.

We’re going to clone a stock ticker from the main document *into* a DPIP window. This not only gives us an opportunity to talk about some relevant media queries and pseudo-classes, which we’ll use to write targeted CSS for the DPIP window, but it’s also a stark reminder that taking a HTML component out of context can break the CSS, so you’ll need to keep that in mind.

This is said stock ticker:

<CodePen
  user="anon"
  slug-hash="pvNNqOd"
  title="Document Picture-in-Picture API demo (open in debug mode)"
  :default-tab="['css','result']"
  :theme="dark"/>

But for it to work, you’ll need to open [the demo in debug mode (<VPIcon icon="fa-brands fa-codepen"/>`pen`)](https://cdpn.io/pen/debug/pvNNqOd). This is because picture-in-picture doesn’t work in nested browsing contexts such as CodePen `<iframe>`s.

In addition, Safari doesn’t support the DPIP API yet, so make sure that you’re using Chrome or Firefox.

Ready to begin?

---

## The JavaScript of it all

First we need to check if the browser supports the Document Picture-in-Picture API. I imagine that it’d be a nice-to-have feature, so why wait for Safari support? Unfortunately though, there’s no way to query whether or not `@media (display-mode: picture-in-picture)` is supported using feature queries (`@supports`) because the [**`at-rule()`**](/bram.us/at-rule.md) function is only supported by Chrome, and any plans to support preludes (that’s this part: `(display-mode: picture-in-picture)`) appear to have been dropped anyway.

To do this would’ve been awesome:

```css
@supports at-rule(@media; display-mode: picture-in-picture) {
  /* DPIP supported */
}
```

::: note

[<VPIcon icon="fa-brands fa-safari"/>Safari Technology Preview 251 release notes](https://webkit.org/blog/18194/release-notes-for-safari-technology-preview-251/) do mention support for at-rule detection in `@supports` but it’s unclear when that will rollout.

:::

Instead we have to check browser support using JavaScript, removing the button if DPIP isn’t supported, or making it create a DPIP window if it is supported):

```js
if (!("documentPictureInPicture" in window)) {
  /* DPIP not supported (remove button) */
  document.querySelector("button").remove();
} else {
  /* DPIP supported (listen for button click) */
  document.querySelector("button").addEventListener("click", async () => {
    /* ... */
  });
}
```

Keep in mind that the Document Picture-in-Picture API is a desktop-only API, so the check above accounts for that too while illustrating exactly why a full-featured `at-rule()` function would be so useful.

As for creating the DPIP window, there’s one thing that we might want to do first — handle an existing DPIP window. DPIP windows replace existing DPIP windows, so we don’t need to worry about that part of it, but we do need to decide what happens if the button is clicked a second time. The code below closes the DPIP window if it’s already open, effectively making the button a toggle button:

```js
document.querySelector("button").addEventListener("click", async () => {
  /* If the DPIP window is open, close it */
  if (window.documentPictureInPicture.window) {
    window.documentPictureInPicture.window.close();
  }
});
```

The problem is that focus always switches to the DPIP window, so toggling the DPIP window off might require two button clicks. One solution to that is cloning the button into the DPIP window, but the DPIP window already has a “Close” icon-button, so there’s no point in that. Personally, I wouldn’t do anything, letting subsequent button clicks recreate the DPIP window. In fact, if the user moves or resizes the DPIP window, subsequent button clicks will reset it to its original position and size (with the right options).

On that note, let’s talk about creating DPIP windows and said options. It’s pretty obvious what the `width` and `height` options do, but note that we can’t set one without the other, and if we don’t set either, the browser chooses. The `preferInitialWindowPlacement` option, if set to `true`, prevents the browser from saving the position and size of the DPIP window. The `disallowReturnToOpener` option (not used here), if set to `true`, hides the “Back to tab” icon-button (which does the same thing as the “Close” icon button, but also takes the user back to the originating tab).

```js
/* Create the DPIP window */
const DPIP = await window.documentPictureInPicture.requestWindow({
  width: 600,
  height: 400,
  preferInitialWindowPlacement: true
});
```

The [<VPIcon icon="fa-brands fa-firefox"/>`requestWindow()`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow) method of the `DocumentPictureInPicture` interface returns a promise (hence why we’re using `async` and `await`), which means that we can take care of everything else while the window is being prepared.

We can clone HTML into the DPIP window like this:

```js
/* Select the component */
const stock = document.querySelector("#stock");

/* Clone the component and append it to the DPIP <body> */
DPIP.document.body.append(stock.cloneNode(true));
```

But to clone multiple elements, we’d need to take a different approach. This is what we’re going to do as we clone all `<style>`s and `<link rel=stylesheet>`s (and `<script>`s if you need any, or whatever resources the DPIP window requires).

It’s quite simple, though — use `querySelectorAll()` to create an array of NodeList objects and `createDocumentFragment()` to create an arbitrary DOM tree, before looping through the array using `forEach()` and cloning each node into said off-screen document fragment. Finally, append the entire document fragment to the `<head>` of the DPIP window, causing just one reflow instead of multiple, which is more performant.

And remember, cloning *everything* probably isn’t necessary, so adjust as needed.

```js
/* Select all <style>s and <link rel=stylesheet>s */
const styles = document.querySelectorAll("style, [rel=stylesheet]");

/* Create a document fragment */
const documentFragment = document.createDocumentFragment();

/* Clone the styles and append them to the DPIP <head> */
styles.forEach((element) =>
  documentFragment.append(element.cloneNode(true))
);

/* Append the document fragment to the DPIP <head> */
DPIP.document.head.append(documentFragment);
```

Here’s the complete JavaScript snippet from the demo, which you’ll probably want to expand on (to add error handling, at least):

```js
if (!("documentPictureInPicture" in window)) {
  /* DPIP not supported (remove button) */
  document.querySelector("button").remove();
} else {
  /* DPIP supported (listen for button click) */
  document.querySelector("button").addEventListener("click", async () => {
    /* Create the DPIP window */
    const DPIP = await window.documentPictureInPicture.requestWindow({
      width: 600,
      height: 400,
      preferInitialWindowPlacement: true
    });

    /* Select the component */
    const stock = document.querySelector("#stock");

    /* Clone the component and append it to the DPIP <body> */
    DPIP.document.body.append(stock.cloneNode(true));

    /* Select all <style>s and <link rel=stylesheet>s */
    const styles = document.querySelectorAll("style, [rel=stylesheet]");

    /* Create a document fragment */
    const documentFragment = document.createDocumentFragment();

    /* Clone the styles and append them to the DPIP <head> */
    styles.forEach((element) =>
      documentFragment.append(element.cloneNode(true))
    );

    /* Append the document fragment to the DPIP <head> */
    DPIP.document.head.append(documentFragment);
  });
}
```

---

## Handling the CSS

Remember, if taking HTML out of context (along with its CSS) and putting it in a DPIP window, make sure that the CSS selectors aren’t too specific and are written for both contexts.

That being said, you might want to write some targeted CSS specifically for either window, and that’s where the `display-mode` media query comes into it. It’s fairly self-explanatory — here’s what I’m using in the demo to adjust the container:

```css
#stock {
  width: fit-content;
  border-radius: 0.7rem;

  @media (display-mode: picture-in-picture) {
    width: 100%;
    height: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
```

Also note that the `:picture-in-picture` pseudo-class is for the *regular* Picture-in-Picture API, *not* the Document Picture-in-Picture API.

---

## Wrapping up

I couldn’t think of a good use for the vaguely named `enter` event, which fires when the DPIP window opens (not to be confused with the `enterpictureinpicture` event for regular picture-in-picture):

```js
documentPictureInPicture.addEventListener("enter", (event) => {
  /* DPIP window opened */
});
```

Otherwise, I think that’s a wrap for the Document Picture-in-Picture API. It’s not a terribly large or complicated API, but it sounds like it could be really useful?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating Web Widgets Using the Document Picture-in-Picture API",
  "desc": "The general idea is that we create a Document Picture-in-Picture window (DPIP window), and then we put HTML, CSS, and JavaScript into it.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/creating-web-widgets-using-the-document-picture-in-picture-api.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
