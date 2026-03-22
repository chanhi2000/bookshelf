---
lang: en-US
title: "Auto-Save User’s Input In Your Forms With HTML5 And Sisyphus.js"
description: "Article(s) > Auto-Save User’s Input In Your Forms With HTML5 And Sisyphus.js"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Auto-Save User’s Input In Your Forms With HTML5 And Sisyphus.js"
    - property: og:description
      content: "Auto-Save User’s Input In Your Forms With HTML5 And Sisyphus.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/sisyphus-js-client-side-drafts-and-more.html
prev: /programming/js/articles/README.md
date: 2011-12-05
isOriginal: false
author:
  - name: Alexander Kaupanin
    url: https://smashingmagazine.com/author/alexander-kaupanin/
cover: https://smashingmagazine.com/images/smashing-homepage.png
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
  name="Auto-Save User’s Input In Your Forms With HTML5 And Sisyphus.js"
  desc="Have you ever been filling out a long form online or writing an eloquent and spirited comment when suddenly the browser crashes? Or perhaps you closed the browser tab accidentally, or your Internet connection cuts off, or the electricity goes down (and, being ever obedient to Murphy’s Law, you had no backup power supply). If not, then you’re lucky. But no one is protected from such minor catastrophes."
  url="https://smashingmagazine.com/2011/12/sisyphus-js-client-side-drafts-and-more/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://smashingmagazine.com/images/smashing-homepage.png"/>

Have you ever been filling out a long form online or writing an eloquent and spirited comment when suddenly the browser crashes? Or perhaps you closed the browser tab accidentally, or your Internet connection cuts off, or the electricity goes down (and, being ever obedient to Murphy’s Law, you had no backup power supply). If not, then you’re lucky. But no one is protected from such minor catastrophes.

This article is the third in our new series that introduces new, useful and freely available tools and techniques, developed and released by active members of the Web design community. The first article covered [**PrefixFree**](/smashingmagazine.com/prefixfree-break-free-from-css-prefix-hell.md); the second introduced [**Foundation**](/smashingmagazine.com/rapid-prototyping-for-any-device-with-foundation.md), a responsive framework that helps you build prototypes and production code. This time, we’re presenting Sisyphus.js, a library developed by Alexander Kaupanin to provide Gmail-like client-side drafts and a bit more.

---

## What Problem Needs Solving?

Have you ever been filling out a long form online or writing an eloquent and spirited comment when suddenly the browser crashes? Or perhaps you closed the browser tab accidentally, or your Internet connection cuts off, or the electricity goes down (and, being ever obedient to Murphy’s Law, you had no backup power supply). If not, then you’re lucky. But no one is protected from such minor catastrophes.

![Image: [<VPIcon icon="fa-brands fa-flickr"/>Kristian Bjornard](https://flickr.com/photos/bjornmeansbear/5081930704/sizes/m/in/set-72157624427149887/)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/bcd8ef39-49f8-4577-a029-2d15ec67dc87/make-everything-better.jpg)

Imagine the storm of emotions felt by a user who had to add just a bit more information before submitting a form and then loses all data. Horrible, huh? Now, if only there was a way to recover that data, rather than undertake a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Sisyphean](https://en.wikipedia.org/wiki/Sisyphus) pursuit.

---

## Existing Solutions

One common solution is to write one’s comments in a local document, saving the file periodically, and then copying and pasting the text into the form once it’s complete. Some forms also allow you to save your draft by clicking a button, but not all forms have this feature, and it’s not the most convenient solution. The product that does this best is Gmail, with its auto-save feature for drafts: just type away, and all of the content is stored automatically, without you even needing to press a button.

After releasing Sisyphus.js, I learned of Lazarus, an extension for Firefox and Chrome that helps to recover form data. But browser plugins lead to an even bigger problem: distribution. Some users don’t have a clue what a browser extension is — many users don’t, in fact, which makes this approach inadequate on a large scale.

The people with a direct line to users are Web developers themselves. So, addressing the problem of user input at the stage of development seems more practical than expecting users to add to their skyscraper of extensions.

---

## A Solution: Sisyphus.js

Implementing Gmail-like auto-saving of drafts is not straightforward at all. I wanted the solution to be simple and easy to use, which would rule out the use of server-side magic.

The result is an unassuming script that stores form data to the local storage of the user’s browser and restores it when the user reloads or reopens the page or opens the page in a new tab. The data is cleared from local storage when the user submits or resets the form.

---

## How to Use It

Implementing Sisyphus.js is pretty simple. Just select which forms you’d like to protect:

```js
$('#form1, #form2').sisyphus();
```

Or protect all forms on the page:

```js
$('form').sisyphus();
```

The following values are the defaults but are customizable:

```js
{
  customKeyPrefix: ’,
  timeout: 0,
  onSave: function() {},
  onRestore: function() {},
  onRelease: function() {}
}
```

Let’s break these options down:

- `customKeyPrefix`: An addition to key in local storage details in order to store the values of form fields.
- `timeout`: The interval, in seconds, after which to save data. If set to `0`, it will save every time a field is updated.
- `onSave`: A function that fires every time data is saved to local storage.
- `onRestore`: A function that fires when a form’s data is restored from local storage. Unlike `onSaveCallback`, it applies to the whole form, not individual fields.
- `onRelease`: A function that fires when local storage is cleared of stored data.

Even after Sisyphus.js has been implemented in a form, you can apply it to any other form and the script won’t create redundant instances, and it will use the same options. For example:

```js
// Save form1 data every 5 seconds
$('#form1').sisyphus( {timeout: 5 } );

…

// If you want to protect second form, too
$('#form2').sisyphus( {timeout: 10} )

// Now the data in both forms will be saved every 10 seconds
```

Of course, you can change options on the fly:

```js
var sisyphus = $('#form1').sisyphus();

…

// If you decide that saving by timeout would be better
$.sisyphus().setOptions( {timeout: 15} );

…

// Or
sisyphus.setOptions( {timeout: 15} );
```

---

## Usage Details

### Requirements

Sisyphus.js requires jQuery version 1.2 or higher.

### Browser support

- Chrome 4+,
- Firefox 3.5+,
- Opera 10.5+,
- Safari 4+,
- IE 8+,
- It also works on Android 2.2 (both the native browser and Dolphin HD). Other mobile platforms have not been tested.

::: info Download the script

[<VPIcon icon="fas fa-globe"/>Sisyphus.js and the demo](https://simsalabim.github.com/sisyphus/) are hosted on GitHub; the minified version is about 3.5 KB. A [road map (<VPIcon icon="iconfont icon-github"/>`simsalabim/sisyphus`)](https://github.com/simsalabim/sisyphus/issues?labels=feature) and [issue tracker (<VPIcon icon="iconfont icon-github"/>`simsalabim/sisyphus`)](https://github.com/simsalabim/sisyphus/issues?labels=) are also available.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Auto-Save User’s Input In Your Forms With HTML5 And Sisyphus.js",
  "desc": "Have you ever been filling out a long form online or writing an eloquent and spirited comment when suddenly the browser crashes? Or perhaps you closed the browser tab accidentally, or your Internet connection cuts off, or the electricity goes down (and, being ever obedient to Murphy’s Law, you had no backup power supply). If not, then you’re lucky. But no one is protected from such minor catastrophes.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/sisyphus-js-client-side-drafts-and-more.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
