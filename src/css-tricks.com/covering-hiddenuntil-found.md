---
lang: en-US
title: "Covering hidden=until-found"
description: "Article(s) > Covering hidden=until-found"
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
      content: "Article(s) > Covering hidden=until-found"
    - property: og:description
      content: "Covering hidden=until-found"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/covering-hiddenuntil-found.html
prev: /programming/css/articles/README.md
date: 2025-08-15
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/10/in-page-search.jpg
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
  name="Covering hidden=until-found"
  desc="Short story: Slapping hidden=until-found on an element in HTML enables any hidden content within the element to be findable in the browser with in-page search."
  url="https://css-tricks.com/covering-hiddenuntil-found"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/10/in-page-search.jpg"/>

Filing this in the “Missed First Time Around” category. It popped up in the [<VPIcon icon="fa-brands fa-firefox" />Firefox 139 release notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/139#html) and I was, like, *ooo neat*. Then I saw [<VPIcon icon="fa-brands fa-chrome"/>it’s been in Chrome since at least 2022](https://developer.chrome.com/blog/new-in-chrome-102/#more). And as I wrote this, [<VPIcon icon="iconfont icon-webkit"/>it landed in Safari Technology Preview 125](https://webkit.org/blog/17216/release-notes-for-safari-technology-preview-225/). So there you have it.

Turns out there are a few good posts and tutorials about `hidden=until-found` floating out there, so I thought I’d jot down a few key takeaways for later reference.

---

## It makes hidden content “findable”

Short story: Slapping `hidden=until-found` on an element in HTML enables any hidden content within the element to be findable in the browser with in-page search.

```html
<div hidden="until-found">
  <!-- hidden content -->
</div>
```

You’ll see, or more accurately *not* see, that the content is hidden with that in place:

<CodePen
  user="geoffgraham"
  slug-hash="zxvrOoW"
  title="Default hidden=until-found"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## It’s `content-visibility: hidden` under the hood

The browser takes that as a hint to hide the content and does so by implicitly setting `content-visibility: hidden` on the element in the user agent styles.

![Inspecting an element with the attribute in place in Chrome DevTools.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/hidden-until-found-devtools.png?resize=2402%2C1856&ssl=1)

If we do a <kbd>Ctrl</kbd>+<kbd>F</kbd> on the keyboard to activate in-page search and enter a query, then a match reveals the content, highlighting said matched query.

![Showing a highlighted term on the page for a matched search query.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/hidden-tunil-found-match.png?resize=2402%2C1856&ssl=1)

---

## Why we need this

That’s what I was asking myself when I started digging into this a little deeper. The most prominent example of it being used is from the [<VPIcon icon="fa-brands fa-chrome"/>Chrome for Developers docs](https://developer.chrome.com/docs/css-ui/hidden-until-found) as a faux-accordion. You know, a series of panels that open and close on click.

<CodePen
  user="web-dot-dev"
  slug-hash="JjMxmom"
  title="hidden until-found demo"
  :default-tab="['css','result']"
  :theme="dark"/>

But isn’t that a solved deal now that we have the [**`<details>` element**](/css-tricks.com/using-styling-the-details-element.md) at the ready? May as well use a semantic disclosure widget to, you know, *disclose content*. Indeed, browsers also set `content-visibility: hidden` on the [<VPIcon icon="iconfont icon-css-tricks"/>`::details-content`](https://css-tricks.com/almanac/pseudo-selectors/d/details-content/) portion of the element that holds the content.

![Inspecting the details element's Shadow DOM in Chrome DevTools.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/details-content-visibility.png?resize=2402%2C1856&ssl=1)

I’m pretty sure `<details>` was not as widely supported in 2022 as it is today. It’s actually part of [<VPIcon icon="iconfont icon-webkit"/>Interop 2025](https://webkit.org/blog/16458/announcing-interop-2025/#details-element) and notice that one of the functionalities mentioned is the capability for in-page search. Chrome already supports it. Firefox recently shipped it (ostensibly as part of the `hidden=until-found` release). And Safari will presumably get there with Interop 2025. The example from the Chrome for Developers post demonstrates an approach for working around a not-fully-supported `<details>` element and now we have it.

So, why `hidden=until-closed`?

I don’t know. I’m sure there’s a good use case for hiding content accessibly in some fashion while making it searchable. I just can’t think of it off the top of my head. I mean, we have `popover` as well, but that takes a different approach with `display: none` which completely removes the content from in-page search.

![Showing the user agent styles for a popover element in Chrome DevTools.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/popover-display-none-1024x790.png?resize=1024%2C790&ssl=1)

---

## Browser support and polyfill

We’ve already established that Chrome and Firefox are on board. Safari is the bigger holdout, but knowing that making the hidden content in `<details>` findable is part of Interop 2025 (and Firefox’s corresponding support for it as part of that effort) makes me think it’s around the corner. (Turns out that hunch was correct because [<VPIcon icon="iconfont icon-webkit"/>it landed in Safari Technology Preview 125](https://webkit.org/blog/17216/release-notes-for-safari-technology-preview-225/) after writing this.)

In the meantime, though, is it worth using `hidden=until-found`? Because if we’re aiming for a consistent cross-browser experience, we’d need to do some sort of swap between `content-visibility: hidden` to hide the content and `content-visible: auto` to reveal it.

Nathan Knowler [<VPIcon icon="fas fa-globe"/>expertly explains](https://knowler.dev/blog/polyfilling-hidden-until-found) the conundrum this creates. We can’t set `content-visibility: hidden` on something without also removing it from in-page search. The `hidden=until-found` attribute works exactly like `content-visibility: hidden` but maintains that in-page search still works. In other words, we can’t polyfill the feature with `content-visibility`.

Thanks, Nathan, for going down the massive rabbit hole and finding a solution that leverages the Shadow DOM to look for the HTML attribute, check support, and revert its properties when needed to accessibly hide the content visually without fully nuking it from being found.

---

## Styling

Seems like there isn’t much to say about styling something that ain’t visible, but notice that the in-page search feature highlights content that matches the search query.

![Highlighting a single matched search term.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/search-term-highlight.png?resize=1794%2C1136&ssl=1)

Looks like we may get a new `::search-text` pseudo that allows us to select the matched query and style the highlight color in the [CSS Pseudo-Elements Module Level 4 specification](https://drafts.csswg.org/css-pseudo-4/#selectordef-search-text), which is currently in Editor’s Draft status at the time I’m writing this.

What about multiple matches? The current selection gets a different highlight from subsequent matches.

![Highlighting two matches for a search query. The first highlight is orange and the second highlight is yellow.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/Screenshot-2025-07-18-at-8.57.43%E2%80%AFAM.png?resize=1720%2C1024&ssl=1)

We’ll presumably, according to the spec, be able to combine `::search-text` with the `:current` pseudo-class to target the current match: `::search-text:current`.

If you’re thinking we might get to mix-and-match `::search-text` with the corresponding `:past` and `:future` pseudo-classes, I’m afraid the spec says nay. But it does not shut the door on it completely:

> The `:past` and `:future` pseudo-classes are reserved for analogous use in the future. Any unsupported combination of these pseudo-classes with `::search-text` *must* be treated as invalid.

---

## Anything else?

Not really, but I do like the note at the end of Christian Shaefer’s [<VPIcon icon="fas fa-globe"/>“Rethinking Find-in-Page Accessibility”](https://schepp.dev/posts/rethinking-find-in-page-accessibility-making-hidden-text-work-for-everyone/) post that says consideration needs to go into what happens *after* a search query matches content on the page. Currently, the content remains visible even after in-page search is closed or canceled. Perhaps we’ll need some other HTML hint for that.

::: info Links

A dump of things I found and used while researching this:

```component VPCard
{
  "title": "Making collapsed content accessible with hidden=until-found  |  CSS and UI  |  Chrome for Developers",
  "desc": "How this new attribute value can ensure that content within accordion sections can be found and linked to.",
  "link": "https://developer.chrome.com/docs/css-ui/hidden-until-found/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v07a69f77eed922d40ebfb742cd5d20eb11c7d4f7b172d68471db97f8f3b9f965/chrome/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

```component VPCard
{
  "title": "Polyfilling hidden until-found - Nathan Knowler",
  "desc": "Exploring what it takes to polyfill the until-found value of the hidden attribute.",
  "link": "https://knowler.dev/blog/polyfilling-hidden-until-found/",
  "logo": "https://knowler.dev/favicon.ico",
  "background": "rgba(137,220,192,0.2)"
}
```

<SiteInfo
  name="Hidden until found | James McGrath"
  desc=""
  url="https://jamesmcgrath.net/blog/hidden-until-found/"
  logo="https://jamesmcgrath.net/favicons/favicon.ico"
  preview="https://jamesmcgrath.net/images/avatar.png"/>

  <SiteInfo
  name="display-locking/explainers/hidden-content-explainer.md at main · WICG/display-locking"
  desc="A repository for the Display Locking spec. Contribute to WICG/display-locking development by creating an account on GitHub."
  url="https://github.com/WICG/display-locking/blob/main/explainers/hidden-content-explainer.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/70493b7e26686a5c1929c036261def8caa8813fb3a67925c460ea5d45ab4932e/WICG/display-locking"/>

<SiteInfo
  name="Announcing Interop 2025"
  desc="Exciting news for web developers, designers, and browser enthusiasts alike — Interop 2025 is here, continuing the mission of improving cross-browser interoperability."
  url="https://webkit.org/blog/16458/announcing-interop-2025//"
  logo="https://webkit.org/favicon.ico"
  preview="https://webkit.org/wp-content/uploads/Interop-2024-experimental-end.png"/>

```component VPCard
{
  "title": "1761043 - Implement hidden=until-found attribute and beforematch event",
  "desc": "RESOLVED (jjaschke) in Core - DOM: Core & HTML. Last updated 2025-05-21.",
  "link": "https://bugzilla.mozilla.org/show_bug.cgi?id=1761043/",
  "logo": "https://bugzilla.mozilla.org/extensions/BMO/web/images/favicon.svg",
  "background": "rgba(27,106,184,0.2)"
}
```

<SiteInfo
  name="[HTML/WebAPI] Implement hidden=until-found attribute and beforematch event · Issue #39306 · mdn/content"
  desc="Acceptance criteria The listed features are documented sufficiently on MDN BCD is updated Interactive example and data repos are updated if appropriate The content has been reviewed as needed For f..."
  url="https://github.com/mdn/content/issues/39306/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b60f7b0219282efa13e1dc5d4ef5fde7152f659211674e2feba6428a7b394ec0/mdn/content/issues/39306"/>

```component VPCard
{
  "title": "CSS Pseudo-Elements Module Level 4",
  "desc": "",
  "link": "https://drafts.csswg.org/css-pseudo-4/#selectordef-search-text/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Covering hidden=until-found",
  "desc": "Short story: Slapping hidden=until-found on an element in HTML enables any hidden content within the element to be findable in the browser with in-page search.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/covering-hiddenuntil-found.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
