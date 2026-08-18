---
lang: en-US
title: "CSS Navigation Matching, Early Days"
description: "Article(s) > CSS Navigation Matching, Early Days"
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
      content: "Article(s) > CSS Navigation Matching, Early Days"
    - property: og:description
      content: "CSS Navigation Matching, Early Days"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-navigation-matching-early-days.html
prev: /programming/css/articles/README.md
date: 2026-08-19
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/04/higher-order-components.jpg
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
  name="CSS Navigation Matching, Early Days"
  desc="Apply a style when someone navigates from one specific page to another. The idea being it'd make the sources for cross-document view transitions declarative in CSS rather than managing that stuff in JavaScript."
  url="https://css-tricks.com/css-navigation-matching-early-days"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/04/higher-order-components.jpg"/>

[<VPIcon icon="iconfont icon-w3c"/>Really like the intent here.](https://drafts.csswg.org/css-navigation-1/) Apply a style when someone navigates from one specific page to another. The idea being it’d make the sources for cross-document view transitions declarative in CSS rather than managing that stuff in JavaScript.

[**Bramus has a hypothetical example**](/bram.us/styling-the-navigation-declarative-route-and-navigation-matching-in-css.md) as this feature is fleshed out:

- Define the `@location`, i.e., the URLs involved in the transition. Bramus uses `@route` but [that appears to have changed (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts#12594`)](https://github.com/w3c/csswg-drafts/issues/12594#issuecomment-5178098027) since their post.
- Query the `@navigation` between routes.
- Select the thing that’s transitioned on each route.

So:

```css
/* Define the locations */
@location --contact-page {
  pathname: ("/contact");
}

@location --contact-confirmation {
  pathname: ("/contact/thanks");
}
```

That’s for when we know the *exact* pages we’re navigating from and to. There’s [<VPIcon icon="iconfont icon-w3c"/>URL pattern matching](https://drafts.csswg.org/css-navigation-1/#url-pattern-function) as well for the times we don’t:

```css
@location --article {
  pattern: url-pattern("/article/:id");
}

/* 
  Where :id matches anything two levels deep like:
  /article/25
  /article/3785
  /article/whatever
*/
```

There are additional ways to define the `@location` besides the `pathname` and `url-pattern` descriptors. Like maybe you’re trying to match a `hash`-ed URL instead, or a specific `port` or `hostname`. Apparently there’s `protocol` and `search` too, but honestly, I’d have to see examples and use cases to understand when to use one descriptor over another.

OK, so then we have a way to query the `@navigation` between locations using the custom idents registered in the `@location`. If the navigation matches the two points of navigation, then bingo.

```css
/* Fire a transition when navigating between these two pages */
@navigation (from: --contact) and (to: --contact-confirmation) {
  /* Apply transition */
}
```

Pretty clean `from` and `to` conditions there where they’re connected by an `and` keyword.

Another way to write it that’s a tad cleaner:

```css
/* Fire a transition when navigating between these two pages */
@navigation (between: --contact and --contact-confirmation) {
  /* Apply transition */
}
```

Or, hey, we can fire this off when there is `not` a match:

```css
/* Fire a transition, but NOT when navigating between these two pages */
@navigation not (between: --contact and --contact-confirmation) {
  /* Apply transition */
}
```

There’s also an `at` keyword to connect locations. The spec draft is vague on this at the moment, but Bramus demonstrates it like this:

```css
@navigation (between: --home and --detail) {
  @navigation (at: --home) {
    /* Target the clicked link's image */
    :nav-source img {
      view-transition-name: image;
    }
  }
}
```

I’ve gotta wrap my head around that. The way I read it, it says, *“when you’re navigating between `--home` and `--detail` and you’re starting ‘at’ `--home`, select this element and give it this view transition name.”* In other words, it happens at the very, very beginning (or end, I suppose) of the navigation between pages rather than when it’s in progress. I think. Please correct me.

And what about that `:nav-source` pseudo ([which may be renamed to `:navigation-source` (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/14303))? Again, gotta wrap my head around it all. But *if* I am understanding right, that’s to match the specific element that triggers the transition. It’s the source of the navigation, be it a link, image, div, or whatever element. I didn’t see anything in the spec draft about a corresponding pseudo that matches the element on the other side of the transition — say, `:target`? — but perhaps there’s no clear use case for it.

Speaking of pseudos, the spec defines another one called `:link-to()` that applies styles to a linked element that targets a certain location. Straight from the spec:

```css
@location --homepage {
  pattern: url-pattern("/");
}

:link-to(--homepage) {
  font-weight: bold;
}
```

…which I imagine matches an element in HTML like:

```html
<a href="/">Back to Home</a>
```

…which I think is a lot like [**styling links based on their targeted destination**](/css-tricks.com/snippets-css/style-links-depending-on-destination.md)? Maybe it’s more a DX convenience when there’s already a declared location?

---

## Couple notes

One thing I’m already not liking is that I doubt these features would work for a site like CSS-Tricks that has such a flat URL structure. Most of our URLs are a single level deep. So, if I want to match between a specific page (`/about`) and any article (`/article-url`) there’s no way to distinguish that route. But maybe that says something about the way URLs are designed around here and they should have more structure. That’s not a trivial change though.

My friend [<VPIcon icon="iconfont icon-css-tricks"/>Lee Meyer](https://css-tricks.com/author/leemeyer/) suggests that perhaps it would be possible to append a a parameter like `?blog` on URL to gain URL pattern matching superpowers.

Oh, and while I’m thinking of it, I could see a possible use case where you’d want to apply certain styles when navigating from one specific page to another. Like, maybe you’re navigating between the homepage and an About page and want to style elements on the destination page based on where you’re coming from. Playing off the earlier example from Bramus:

```css
@navigation (between: --home and --article) {
  @navigation (at: --article) {
    /* Target the .article-header element  */
    .article-header {
      background-image: url('/path-to-image.webp');
    }
  }
}
```

I dunno. Seems like [**there could be security issues**](/css-tricks.com/css-based-fingerprinting.md) with that?

And [<VPIcon icon="iconfont icon-css-tricks"/>Preethi](https://css-tricks.com/author/preethi/) chimed in on the CSS-Tricks Slack channel with what I think is insightful feedback:

> It would’ve been great if we had an at-rule for all data infrastructures, similar to `@property` for all property-value pairs, with configurations valid as per type. We could’ve used it instead of `@color-profile`, `@position-try`, and now `@location`.

So true when there’s so many new rules to learn these days. Anything that lowers the learning curve is certainly worth considering.

---

## There’s a lot more to this

You’ll want to [<VPIcon icon="iconfont icon-w3c"/>peruse the spec draft](https://drafts.csswg.org/css-navigation-1) for yourself to get deeper into the nitty-gritty of things like navigating based on navigation “type” (e.g., `back`, `forward`, `reload`) and navigation “phases” (e.g., `loading`, `ready`, `committed`).

It’s a lot to take in. But so are view transitions as a whole.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Navigation Matching, Early Days",
  "desc": "Apply a style when someone navigates from one specific page to another. The idea being it'd make the sources for cross-document view transitions declarative in CSS rather than managing that stuff in JavaScript.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-navigation-matching-early-days.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
