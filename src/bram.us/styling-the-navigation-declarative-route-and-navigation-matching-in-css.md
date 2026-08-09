---
lang: en-US
title: "Styling the Navigation: Declarative Route and Navigation Matching in CSS"
description: "Article(s) > Styling the Navigation: Declarative Route and Navigation Matching in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Styling the Navigation: Declarative Route and Navigation Matching in CSS"
    - property: og:description
      content: "Styling the Navigation: Declarative Route and Navigation Matching in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/styling-the-navigation-declarative-route-and-navigation-matching-in-css.html
prev: /programming/css/articles/README.md
date: 2026-07-31
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2026/07/styling-the-navigation.gif
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
  name="Styling the Navigation: Declarative Route and Navigation Matching in CSS"
  desc="One of the things that we at Chrome have been thinking about for a while now is a way to do declarative route and navigation matching in CSS. Together with Noam Rosenthal and David Baron I’ve been working on it for the past few months.After an initial introduction at the CSS Working Group back in January, and a quick feedback session at CSS Day in June, we think we have something that is ready for further discussion.At next week’s CSS Working Group F2F (face-to-face) meeting in Berlin, we’ll be presenting our current line of thinking. This post is a quick intro to the concepts we’ll be covering."
  url="https://bram.us/2026/07/30/styling-the-navigation-declarative-route-and-navigation-matching-in-css/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2026/07/styling-the-navigation.gif"/>

One of the things that we at Chrome have been thinking about for a while now is a way to do declarative route and navigation matching in CSS. Together with Noam Rosenthal and David Baron I’ve been working on this for the past few months.

After an initial introduction at the CSS Working Group back in January, and a quick feedback session with developers at CSS Day in June, we think we have something that is ready for further discussion.

At next week’s CSS Working Group F2F (face-to-face) meeting in Berlin, we’ll be presenting our current line of thinking. This post is a quick intro to the concepts we’ll be covering.

---

## The Problem: Knowing where you’re going

If you’ve played around with View Transitions, especially for Multi-Page Apps (MPAs), you’ve probably hit a familiar wall. Very often, you want to style a page differently based on *where you are coming from* and *where you are going to*.

Imagine a simple flow:

- When navigating from the index page to the about page, you want the whole site to slide to the left.
- When navigating back from the about page to the index page, you want it to slide to the right.
- When clicking a thumbnail in a list to go to a detail page, you want that specific clicked thumbnail to transition into the hero image.

Right now, doing this requires JavaScript to intercept the navigation, figure out the URLs using `pageswap` and `pagereveal`, find the `NavigateEvent.sourceElement`, and dynamically set the View Transition Types based on those values.

To see it in action, check out this [this demo](https://chrome.dev/view-transitions-toolkit/navigation-types/) that uses the components mentioned above.

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2026/07/styling-the-navigation.mp4?_=1" />

Recording of a View Transitions Demo that animates different depending on which page you are coming from and which page you are going to.

It works, but the script required to do it right grows over time and can become quite complicated. We wanted to see if styling the navigation experience can be done declaratively instead, in CSS.

---

## Say Hello to Route and Navigation Matching 👋

The [<VPIcon icon="iconfont icon-w3c"/>CSS Route and Navigation Matching Specification (`css-navigation-1`)](https://drafts.csswg.org/css-navigation-1/) introduces a few new key components to CSS that allow you to style the navigation and links declaratively.

::: info "CSS Navigation Matching" *From W3C Working Draft* (<VPIcon icon="iconfont icon-w3c"/><code>drafts.csswg.org</code>)

> “CSS conditioned on the status of navigating between particular URLs.”

```component VPCard
{
  "title": "CSS Navigation Matching",
  "desc": "",
  "link": "https://drafts.csswg.org/css-navigation-1//",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

Here is a quick *(and abbreviated)* overview of what we are proposing:

### 1. Define Routes with `@route`

Instead of constantly typing out URL strings, you can define named routes using the `url-pattern()` function.

```css
@route --home { pathname: url-pattern('/'); }
@route --about { pathname: url-pattern('/about'); }
@route --detail { pathname: url-pattern('/detail/:id'); }
```

Pattern matching is done using the syntax from the popular [<VPIcon icon="iconfont icon-github"/>`pillarjs/path-to-regexp`](https://github.com/pillarjs/path-to-regexp) library, which is also used by JavaScript’s `URLPattern`.

::: note For completeness

You can also use the `protocol`, `hostname`, `port`, `pathname`, `search`, and `hash` descriptors to define a named route.

:::

### 2. Query the navigation with `@navigation`

This is where the magic happens. You can query the current, ongoing, navigation state using the `@navigation` at-rule, checking the `from` and `to` endpoints.

```css
/* Going from home to about? Slide left! */
@navigation (from: --home) and (to: --about) {
  @view-transition {
    navigation: auto;
    types: slide-all-to-left;
  }
}

/* Going back from about to home? Slide right! */
@navigation (from: --about) and (to: --home) {
  @view-transition {
    navigation: auto;
    types: slide-all-to-right;
  }
}
```

You can query against a named route (defined with `@route`) or a direct `url-pattern()`.

::: note For completeness

We are also introducing `between` and `at` keywords for the *“navigation relation”*.

:::

### 3. Select the element that triggered the navigation with `:nav-source`

The `:nav-source` pseudo-class selector allows you to target the exact element that initiated the outgoing navigation. This is modeled after `NavigateEvent.sourceElement`.

For example, If you want to apply a `view-transition-name` only to the specific image that was clicked, you can do this:

```css
@navigation (between: --home --detail) {
  @navigation (at: --home) {
    /* Target the clicked link's image */
    :nav-source img {
      view-transition-name: image;
    }
  }
  @navigation (at: --detail) {
    img#hero {
      view-transition-name: image;
    }
  }
}
```

### 4. Advanced link selection with `:link-to()`

The spec also introduces ways to style links based on what they link to using the `:link-to(...)` selector. Its argument is a named route, or `url-pattern()`. This is incredibly powerful for orchestrating complex UI transitions between routes.

```css
/* Target the all links that links to the --detail route */
:link-to(--detail) {
  color: hotpink;
}
```

Note: Currently not covered is a way to do parameter matching with `:link-to()` — e.g. *“select the link that links to a `--detail` route and whose `id` is equal to `6`”* — as we are still working on that part to make sure the syntax is easy to use and covers all use cases.

---

## We need your feedback!

Over the past months we have given this a lot of thought and have gone back and forth over the key features and their syntax, and now we think we have something that could work. As mentioned we will be presenting this at next week’s CSS Working Group F2F meeting, seeking resolutions to verify with the group that we are down the right path.

Back in June we did an introductory pitch at CSS Day, and a quick read of the room told us this was worth pursuing. Of course we are very open to feedback and would love to hear from you if you have any input.

Are we missing a use case? Do the keywords make sense? Or like one of the open questions we have is about the default base URL be used: should relative links be resolved against the document’s location or the stylesheet’s location?

Please take a look at the [<VPIcon icon="iconfont icon-w3c"/>current shape of the API](https://drafts.csswg.org/css-navigation-1/) and leave your feedback in the [<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts#12594`](https://github.com/w3c/csswg-drafts/issues/12594#issuecomment-5118003200) at the CSSWG, or reach out to me (or Noam) on social media.

Let’s build this together! 🚀

::: note PS

You can try this out in Chrome Canary with the Experimental Web Platform Features flag enabled 😉

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Styling the Navigation: Declarative Route and Navigation Matching in CSS",
  "desc": "One of the things that we at Chrome have been thinking about for a while now is a way to do declarative route and navigation matching in CSS. Together with Noam Rosenthal and David Baron I’ve been working on it for the past few months.After an initial introduction at the CSS Working Group back in January, and a quick feedback session at CSS Day in June, we think we have something that is ready for further discussion.At next week’s CSS Working Group F2F (face-to-face) meeting in Berlin, we’ll be presenting our current line of thinking. This post is a quick intro to the concepts we’ll be covering.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/styling-the-navigation-declarative-route-and-navigation-matching-in-css.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
