---
lang: en-US
title: "What’s !important #3: Popover Context Menus, @scope, New Web Platform Features, and More"
description: "Article(s) > What’s !important #3: Popover Context Menus, @scope, New Web Platform Features, and More"
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
      content: "Article(s) > What’s !important #3: Popover Context Menus, @scope, New Web Platform Features, and More"
    - property: og:description
      content: "What’s !important #3: Popover Context Menus, @scope, New Web Platform Features, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-3.html
prev: /programming/css/articles/README.md
date: 2026-01-15
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/wi3.png
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
  name="What’s !important #3: Popover Context Menus, @scope, New Web Platform Features, and More"
  desc="The developer community hasn’t wasted any time kicking off 2026 with some really great articles, demos, and insights. Firefox 147 and Chrome 144 also shipped, and while they’re not jam-packed with features, the releases are still pretty exciting for what’s normally a slow time of year, so without further ado, here’s what’s important from the last couple of weeks (or should I say the first couple of weeks, of 2026?)…"
  url="https://css-tricks.com/whats-important-3"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/wi3.png"/>

The developer community hasn’t wasted any time kicking off 2026 with some really great articles, demos, and insights. Firefox 147 and Chrome 144 also shipped, and while they’re not jam-packed with features, the releases are still pretty exciting for what’s normally a slow time of year, so without further ado, here’s what’s important from the last couple of weeks (or should I say the *first* couple of weeks, of 2026?)…

---

## Building popover context menus with anchor positioning

Chris Coyier (a familiar name, perhaps) shows us [**how to build context menus using popovers and anchor positioning**](/frontendmasters.com/popover-context-menus-with-anchor-positioning.md) over at Frontend Masters. Interest invokers, `<menu>`, discrete transitions, [**`@starting-style`**](/css-tricks.com/almanac-rules/starting-style.md)`, and fallback positions are also mentioned, so grab a pickaxe, because this one’s a bit of a goldmine.

Also, [**anchor positioning**](/css-tricks.com/css-anchor-positioning-guide.md) went baseline this week, so you can use it on production websites now! Do we have our CSS feature of the year already?

---

## Scoping CSS with `@scope`

Funnily enough, I also got the opportunity to write something for Frontend Masters, and I went with [**`@scope`**](/css-tricks.com/almanac-rules/s/scope.md). `@scope` has been my most-anticipated CSS feature for quite a while now, and Firefox shipping it in their final release of the year (making it baseline) made it *my* feature of the year, so I’m very happy to kick off 2026 with this little [**how-to on using `@scope` and scoping CSS overall**](/frontendmasters.com/how-to-scope-css-now-that-its-baseline.md).

<BaselineStatus featureid="scope" />

---

## Generating gradient borders from an image source

In this demo, created and posted by Ana Tudor on Bluesky, Ana [blurs an image and masks it with a border (<VPIcon icon="fa-brands fa-bluesky"/>`anatudor.bsky.social`)](https://bsky.app/profile/anatudor.bsky.social/post/3mc5awalzss2t). You can actually accomplish this in Safari using just three lines of CSS, but the cross-browser solution isn’t too complex either (the key parts are the [**`backdrop-filter`**](/css-tricks.com/almanac-properties/backdrop-filter.md) and [**`mask`**](css-tricks.com/almanac-properties/mask.md)` CSS properties).
Given the current popularity of gradients, blurs, and dare I say it, _[**glass**](/css-tricks.com/getting-clarity-on-apples-liquid-glass.md)_, it’s a pretty sweet effect that you can probably adapt for other scenarios.

---

## You probably don’t need tabs

HTML, like CSS, is *soooo* good now. That being said, even though we’ve been getting all these new HTML elements that enable us to build interactive components without JavaScript, that doesn’t necessarily mean that we should. Stephen Margheim says that [tab components are over-engineered most of the time (<VPIcon icon="fa-brands fa-bluesky"/>`fractaledmind.bsky.social`)](https://bsky.app/profile/fractaledmind.bsky.social/post/3mbk6xfzutf2w), and explains why and what you can do instead.

---

## Using your OS as a CMS

Speaking of simplicity, Jim Nielsen introduced me to this incredibly cool OS-as-a-CMS concept as he explains [<VPIcon icon="fas fa-globe"/>how he got “Edit Post” buttons on his website to open the local document on his computer in iA Writer](https://blog.jim-nielsen.com/2026/os-as-cms/), completely negating the need for a CMS. Jim walks you through the whole thing, but the key ingredient is just a little link with a custom URL scheme:

```html
<a href="ia-writer://open?path=posts:post.md">Edit</a>
```

I love this because I also write in Markdown (using iA Writer, no less), and ~could~ will easily integrate this into my Eleventy build. But it got me thinking: do any other apps have their own URL scheme? Well, as it turns out, some of them do! Here’s an incomplete list (with examples of ‘edit’ commands for each app):

- **Obsidian:** `obsidian://open?vault=posts&file=post`
- **VS Code:** `vscode://exact/path/to/post.md:9:1` (`:9:1` is the line and column number)
- **Ulysses:** `ulysses://x-callback-url/open-item?id=ITEM_ID`
- **Sublime Text** (with [<VPIcon icon="iconfont icon-subl"/>`subl` protocol](https://packagecontrol.io/packages/subl%20protocol)): `subl://exact/path/to/post.md:9:1`
- **Apple Shortcuts:** `shortcuts://run-shortcut?name=Edit&input=/path/to/post.md` (great for doing stuff with apps that *don’t* have custom URL schemes)

---

## Quick hits and new web platform features

As you know (hopefully?), we post [<VPIcon icon="iconfont icon-css-tricks"/>Quick Hits](https://css-tricks.com/category/quick-hits/) throughout the week. The best way to find them is in the sidebar of the homepage, and they’re either links to things that you can read in just a minute or two, or just PSAs to read and remember. Anyway, here’s what you might’ve missed:

<SiteInfo
  name="The final nail in the HTML5 document outline coffin"
  desc="All the main web browsers have finally dropped visual support for the HTML5 document outline algorithm. Here’s why that’s good news."
  url="https://tempertemper.net/blog/the-final-nail-in-the-html5-document-outline-coffin/"
  logo="https://tempertemper.net/assets/img/icons/favicon.svg"
  preview="https://tempertemper.net/assets/img/summary.png"/>

<SiteInfo
  name="Death to Scroll Fade!"
  desc="The one where I crowdsource an argument winner"
  url="https://dbushell.com/2026/01/09/death-to-scroll-fade//"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2026-01-09-death-to-scroll-fade.png"/>

- Chris Coyier quickly explained [**how `!important` works with custom properties**](https://frontendmasters.com/important-and-css-custom-properties.md)
- [<VPIcon icon="fas fa-globe"/>ReliCSS](https://alwaystwisted.com/relicss/) shipped, which helps you to replace any CSS hacks with `@supports` and modern CSS
- Temani Afif coded [Mario World with CSS (<VPIcon icon="fa-brands fa-bluesky"/>`css-only.dev`)](https://bsky.app/profile/css-only.dev/post/3mbgzfvaonc2w)

And finally, here are my top picks from what Firefox and Chrome shipped on Tuesday:

- [<VPIcon icon="fa-brands fa-firefox"/>Firefox 147](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/147)
  - [**Anchor positioning**](/css-tricks.com/css-anchor-positioning-guide.md) (now Baseline!)
  - [**View transition types**](/css-tricks.com/what-on-earth-is-the-types-descriptor-in-view-transitions.md) (also Baseline!)
  - [<VPIcon icon="fa-brands fa-firefox"/>Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API) (a now-Baseline *JavaScript* API that replaces the History API and `window.location`)
- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 144](https://developer.chrome.com/blog/new-in-chrome-144)
  - [<VPIcon icon="fas fa-globe"/>`::search-text`](https://blogs.igalia.com/schenney/find-in-page-highlight-styling/) (only Chrome supports this pseudo-element that selects highlighted find-in-page text)
  - [<VPIcon icon="fa-brands fa-chrome"/>`<geolocation>`](https://developer.chrome.com/blog/geolocation-html-element) (only Chrome supports this HTML element that requests the user’s location declaratively)
  - [<VPIcon icon="fa-brands fa-firefox"/>Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) (Chrome joins Firefox in supporting this replacement for JavaScript’s Date API, which [**Piccalilli wrote about**](/piccalil.li/date-is-out-and-temporal-is-in.md))

Thanks for tuning in. I’ll see you in two weeks! Be there or be square (`aspect-ratio: 1`)!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #3: Popover Context Menus, @scope, New Web Platform Features, and More",
  "desc": "The developer community hasn’t wasted any time kicking off 2026 with some really great articles, demos, and insights. Firefox 147 and Chrome 144 also shipped, and while they’re not jam-packed with features, the releases are still pretty exciting for what’s normally a slow time of year, so without further ado, here’s what’s important from the last couple of weeks (or should I say the first couple of weeks, of 2026?)…",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-3.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
