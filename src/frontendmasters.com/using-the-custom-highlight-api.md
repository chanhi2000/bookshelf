---
lang: en-US
title: "Using the Custom Highlight API"
description: "Article(s) > Using the Custom Highlight API"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using the Custom Highlight API"
    - property: og:description
      content: "Using the Custom Highlight API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/using-the-custom-highlight-api.html
prev: /programming/js/articles/README.md
date: 2025-08-07
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6686
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
  name="Using the Custom Highlight API"
  desc="You can get your hands on ranges of text in JavaScript, then apply a named "
  url="https://frontendmasters.com/blog/using-the-custom-highlight-api/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6686"/>

The [<FontIcon icon="fa-brands fa-firefox"/>Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API) came to my attention recently as [<FontIcon icon="iconfont icon-caniuse"/>Firefox recently started supporting](https://caniuse.com/mdn-api_highlight) it (Firefox 140, June 2025), which brought support across all the major browsers. With it, you can apply (some) styling to text that you get your hands on in JavaScript via the `Range()` class. I would say text that you *select*, but there aren’t really normal selectors involved here, making it rather unusual to work with for a CSS guy like me.

I think a basic word explanation is helpful here, as it sure would have helped me when I first started [<FontIcon icon="fa-brands fa-youtube"/>poking at it](https://youtu.be/IWDlCNEJclU):

1. You need a `textNode`[1](#18958d55-4f3c-4d44-9460-f364498054cf). (e.g. `document.querySelector("p").firstChild`)
2. Then you need a `Range()` in which you do a `setStart` and `setEnd` on, meaning the range is now between those two integers.
3. Then you call `CSS.highlights.set()` on that Range, giving it a name.
4. Then you use `::highlight()`in CSS, passing in that name you just used.

If we had one `<p>` of text on a page, that whole process looks like this:

```js
const WORD_TO_HIGHLIGHT = "wisdom";
const NAME_OF_HIGHLIGHT = "our-highlight";

const textNode = document.querySelector("p").firstChild;
const textContent = textNode.textContent;

const startIndex = textContent.indexOf(WORD_TO_HIGHLIGHT);
const endIndex = startIndex + WORD_TO_HIGHLIGHT.length;

const range = new Range();
range.setStart(textNode, startIndex);
range.setEnd(textNode, endIndex);

const highlight = new Highlight(range);
CSS.highlights.set(NAME_OF_HIGHLIGHT, highlight);
```

This is neat to see in DevTools, where the word “wisdom” clearly has custom CSS styling applied to it, but there is no element around that word that you’d normally think would be necessary to apply those styles.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-02-at-7.30.21-AM.png?resize=1024%2C794&ssl=1)

It’s likely what the browser itself does when it needs to apply styling to only certain parts of text, like it does when you use the **Find** feature baked into browsers.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-02-at-7.32.03-AM.png?resize=1024%2C798&ssl=1)

Here’s that demo:

<CodePen
  user="chriscoyier"
  slug-hash="yyYMzKG"
  title="Basic Range Highlighting"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Why is this useful?

- Having the ability to target and style text *without* needing to touch the DOM *at all* is interesting. Sometimes, DOM APIs are criticized for being slow, so being able to avoid that might be advantageous, particularly if you have to do it *a lo**t.*
- Adding and removing `<span>`s, aside from potentially being “slow” affects the DOM structure and thus might affect other CSS and JavaScript deal with the DOM.
- DOM weight can be a performance concern on web pages. Too much DOM, recalcs can be very “expensive” and the UX on the page can suffer with things like slow animations and scrolling.

Here’s a GitHub PR page with just 17 changed files. The page has over 4,500 spans on it already used in things like colorizing the diffs and syntax highlighting. That’s decently heavy, and it can definitely get worse.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/CleanShot-2025-08-02-at-07.38.54%402x.png?resize=1024%2C641&ssl=1)

I’m sure there are lots more reasons this API exists, but these are just a few reasons that come to mind right away.

---

## Doing a Bit More (Search Example)

Making a `new Highlight()` accepts *multiple* Ranges. Meaning a single `::highlight()` in CSS can apply to many Ranges of text. This would be useful if we built our own search feature onto a page. If search was a crucial feature of a web app you are building, I can easily see building out your own UI for it rather than relying on the built-in browser feature.

This time, let’s let the word(s) we’re going to find in the text come from the user:

```html
<label>
  Search the text below
  <input type="search" value="oven" id="searchTerm">
</label>
```

Then we’ll listen for changes:

```js
window.searchTerm.addEventListener("input", (e) => {
  doSearch(e.target.value.toLowerCase());
});
```

Note we’re passing the value typed in to a function, and we’re lower-casing it as we do, as search is generally most useful when it’s case insensitive.

Our `doSearch` function will then accept that search term and run a RegEx across all the text:

```js
const regex = new RegExp(searchTerm, "gi");
```

What we need is an Array of indexes for all the found instances of the text. It’s a bit of a mouthful of code, but here you go:

```js
const indexes = [...theTextContent.matchAll(new RegExp(searchTerm, 'gi'))].map(a => a.index);
```

With that Array of indexes, we can loop over them creating Ranges, then send *all* the Ranges to a new Highlight.

```js
const arrayOfRanges = [];

indexes.forEach(matchIndex => {
  // Make a "Range" out of the index values.
  const searchRange = new Range();
  searchRange.setStart(par, matchIndex);
  searchRange.setEnd(par, matchIndex + searchTerm.length);

  arrayOfRanges.push(searchRange);
})

const ourHighlight = new Highlight(...arrayOfRanges);
CSS.highlights.set("search-results", ourHighlight);
```

All together, it makes a functional search experience:

<CodePen
  user="chriscoyier"
  slug-hash="NPGbbJZ"
  title="Range Highlighting with Search"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## For Syntax Highlighting

It feels like syntax highlighting code is a pretty good use case for this API. André Ruffert has already taken that idea and ran with it, making a [<FontIcon icon="fas fa-globe"/>`<syntax-highlight>` Web Component](https://andreruffert.github.io/syntax-highlight-element/) which uses [<FontIcon icon="fas fa-globe"/>Prism.js](https://andreruffert.github.io/syntax-highlight-element/) by Lea Verou to tokenize the code, but then doesn’t apply `<span>`s like out-of-the-box Prism does, it uses this custom highlight API instead.

::: tip Example

<CodePen
  user="chriscoyier"
  slug-hash="GgpWMVy"
  title="Using <syntax-highlight>"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

I think this is awesome, but it’s noteworthy that this API is *only* possible client-side. And for something like syntax highlighting, that can mean a delay between seeing the code and having the syntax-highlighting “pop in”. I admit I prefer server-side rendered syntax highlighting when possible. Meaning if you can serve a bunch of `<span>`s from the server in code like this (and it doesn’t affect performance or accessibility badly) then that’s probably better.

I also admit I’m still somewhat obsessed with [<FontIcon icon="fas fa-globe"/>fonts with built-in syntax highlighting](https://blog.glyphdrawing.club/font-with-built-in-syntax-highlighting/), which feels like untapped territory for font foundries to jump on.

---

1. I’m glad I [**learned about `.firstChild`**](/frontendmasters.com/firstchild-can-be-white-space.md) the other day, and how it selects the `textNode` of otherwise childless text elements

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using the Custom Highlight API",
  "desc": "You can get your hands on ranges of text in JavaScript, then apply a named ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/using-the-custom-highlight-api.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
