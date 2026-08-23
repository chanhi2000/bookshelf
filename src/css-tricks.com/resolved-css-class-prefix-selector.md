---
lang: en-US
title: "Resolved: CSS Class Prefix Selector"
description: "Article(s) > Resolved: CSS Class Prefix Selector"
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
      content: "Article(s) > Resolved: CSS Class Prefix Selector"
    - property: og:description
      content: "Resolved: CSS Class Prefix Selector"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/resolved-css-class-prefix-selector.html
prev: /programming/css/articles/README.md
date: 2026-08-21
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/css-prefix-selector.webp
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
  name="Resolved: CSS Class Prefix Selector"
  desc="A newly resolved proposal would allow us to select classes that are a prefix for variations with a wildcard, like .prefix-*."
  url="https://css-tricks.com/resolved-css-class-prefix-selector"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/css-prefix-selector.webp"/>

Just looking at what [**Bramus shared the other day**](https://bram.us/2026/08/20/the-future-of-css-target-multiple-classes-with-the-class-prefix-selector/):

```css
/* Adding a base class */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

/* Listing everything... yuck! */
.btn-primary,
.btn-secondary,
.btn-danger {
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

/* Works, but performs badly */
[class^="btn-"],
[class*=" btn-"] {
  padding: 0.5rem 1rem;
}

/* Newly resolved class prefix selector */
.btn-* {
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
```

First off, if you don’t follow Bramus, where have you been?! Jokes aside, his job is to be first-in-line on new features like this — especially as it pertains to Chrome — so it’s worth keeping tabs on [<VPIcon icon="fas fa-globe"/>his RSS](https://bram.us/feed/) and/or [social (<VPIcon icon="fa-brands fa-bluesky"/>`bram.us`)](https://bsky.app/profile/bram.us).

It’s not a new proposal. [<VPIcon icon="iconfont icon-w3c"/>Lea posted it back in 2024 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/100019) and has advocated for it the whole while. As Bramus mentions in his post, what’s new is that the proposal was [<VPIcon icon="iconfont icon-w3c"/>formally adopted (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10001#issuecomment-5204871059) and, as of three days ago, it has been [<VPIcon icon="iconfont icon-w3c"/>added to the Selectors Level 5 spec draft](https://drafts.csswg.org/selectors-5/#class-prefix). So, chances are that we’ll see it formally adopted at some point and implemented somewhere even sooner.

I really like the ergonomics of it. Existing substring selectors — `class^="prefix"` and `class=*" prefix"` — are verbose and defintely less readable than a simple `.prefix-*`.

And it’s not like `[data-attribute]` selectors that require not only an extra step touching HTML but still added verbosity.

But something makes me wince at the idea. I can’t quite put my finger on it. Perhaps it’s redundancy as in, we can already do this with existing selectors? [Bramus cites performance issues with existing substring selectors (<VPIcon icon="iconfont icon-github"/>`bramus`)](https://gist.github.com/bramus/1de3bc824ea3d9b47540b023dc165723) as a primary reason we need this. But Brian Kardell’s reply resonates with me:

::: info From Bluesky (<VPIcon icon="fa-brands fa-bluesky"/><code>bkardell.com</code>)

> Yeah, I guess if we have a very specific case we can optimize it more than a general one, but I'm not seeing how this is a lot more specific than the version above which almost exists today. Feels like if we could optimize this we could optimize that. I'd be curious how it is optimized.

<SiteInfo
  name="Brian Kardell (@bkardell.com)"
  desc="Yeah, I guess if we have a very specific case we can optimize it more than a general one, but I'm not seeing how this is a lot more specific than the version above which almost exists today. Feels like if we could optimize this we could optimize that.  I'd be curious how it is optimized."
  url="https://bsky.app/profile/bkardell.com/post/3mtjlk2i6qc2n/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:httl4meeb5mx5767hike2t4q/bafkreiduzv2xwkhuudncicmqday73trtdnqedafwezzlojhio57wu4jhwi"/>

:::

Then again, I do like how we extended color functions for brevity, like:

```css
/* old */
color: hsla(100, 50%, 50%, .5);

/* new */
color: hsl(100 50 50% / .5);
```

And it’s backwards-compatible, so no real harm if you continue to use the “old” way. It’s not like substring selectors don’t have other use cases and become totally obsolete. But maybe that’s it: this isn’t an “upgrade” of something we already have, but a new thing that isn’t progressive enhancement out of the gate. We’d have to `@support` it until it becomes a Baseline feature:

```css
@supports selector(.prefix-*) {
  /* ... */
}
```

…which may or may not be a long wait. But we don’t know. And if ergonomics are the selling point, then we’re losing that in the wait.

Should also note that the wildcard doesn’t match other conditions or non-dashed cases:

```css
/* Nope */
.prefix* {}
.prefix-*-suffix {}
.prefix_* {} /* the door is left open on this */
```

Another worthy note is that the spec currently *implies* (but doesn’t explicitly state) that this has the same specificity as a class selector, (0,1,0). That’d make sense, as `.prefix-*` is really no different than writing `.prefix-variation`.

That said, I like how it might possibly look in a nested syntax:

```css
.prefix {
  /* This would work, right? */
  &-* { /* ... */ }
}
```

…and Dave’s plea to support selecting web components:

::: info *From Bluesky* (<VPIcon icon="fa-brands fa-bluesky"/><code>davatron5000.bsky.social</code>)

> Do custom-elements next!

<SiteInfo
  name="Dave Rupert (@davatron5000.bsky.social)"
  desc="Do custom-elements next!"
  url="https://bsky.app/profile/davatron5000.bsky.social/post/3mtjl5xh6gc2h/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:wjrpkham2fhwlxkthcch2sc2/bafkreig6jdzydan5pi5yieyq3nr4rcdepek63fr4izloda3c3nunf63spe"/>

:::

Maybe I just convinced myself that I like it. Again, I dunno. Just take the added convenience and move on! Yada yada.

::: info Direct Link →

https://bram.us/2026/08/20/the-future-of-css-target-multiple-classes-with-the-class-prefix-selector/

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Resolved: CSS Class Prefix Selector",
  "desc": "A newly resolved proposal would allow us to select classes that are a prefix for variations with a wildcard, like .prefix-*.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/resolved-css-class-prefix-selector.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
