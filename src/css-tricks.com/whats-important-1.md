---
lang: en-US
title: "What’s !important #1: Advent Calendars, CSS Wrapped, Web Platform Updates, and More"
description: "Article(s) > What’s !important #1: Advent Calendars, CSS Wrapped, Web Platform Updates, and More"
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
      content: "Article(s) > What’s !important #1: Advent Calendars, CSS Wrapped, Web Platform Updates, and More"
    - property: og:description
      content: "What’s !important #1: Advent Calendars, CSS Wrapped, Web Platform Updates, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-1.html
prev: /programming/css/articles/README.md
date: 2025-12-16
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/css-wrapped.png
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
  name="What’s !important #1: Advent Calendars, CSS Wrapped, Web Platform Updates, and More"
  desc="The best CSS news from around the web from the last two weeks. In this edition: advent calendars, CSS Wrapped 2025, and the latest Web Platform Updates."
  url="https://css-tricks.com/whats-important-1"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/css-wrapped.png"/>

Welcome to the first ever **What’s !important**, a roundup of the best CSS and web development news from the last two weeks. If you’re pressed for time (who isn’t?) or you just can’t stand missing out on anything CSS-related, this is the place to recap:

- the best CSS/web dev articles from around the web,
- interesting announcements and quick-read links that we shared,
- the best of what Chrome, Firefox, and Safari have recently shipped,
- and more, probably.

Let’s dig in!

---

## HTMHell Advent Calendar 2025

Manuel Matuzović has created this pretty hellish (all in good fun) [<VPIcon icon="fas fa-globe"/>HTMHell Advent Calendar 2025](https://htmhell.dev/adventcalendar/) made up of 24 HTML-focused articles — basically, there’s one every day until Christmas Day. Obviously, we’re already 16 fantastic articles in, so you’re in for a real treat with 8 more articles to come. The highlight for me so far is the [<VPIcon icon="fas fa-globe"/>article on Invoker Commands](https://htmhell.dev/adventcalendar/2025/7/), which as of this week are supported in all web browsers, so it’s a double win!

---

## WebKit flags `::target-text`

[<VPIcon icon="fa-brands fa-safari"/>WebKit did a little write-up on `::target-text`.](https://webkit.org/blog/17628/target-text-an-easy-way-to-style-text-fragments/) And I’m glad they did because I had never heard of it, even though [<VPIcon icon="iconfont icon-css-tricks"/>Sunkanmi has an excellent write-up on it here at CSS-Tricks as well](https://css-tricks.com/almanac/pseudo-selectors/t/target-text/). Target text is the text that search engines sometimes highlight when taking you to a web page, but we can actually highlight text ourselves when sending links to other people. `::target-text` selects this text so that we can style it, and it’s supported by all web browsers — who knew?

---

## Stop using JavaScript to solve CSS problems

Chizaram Ken walks us through the [**latest CSS tricks that we can perform to reduce our reliance on JavaScript**](/blog.logrocket.com/stop-using-js-for-css.md), and why we’d want to do that. With CSS growing faster than it’s ever grown before, I think we’ll be seeing a lot more of these articles.

---

## We have granular control over hyphenation

[<VPIcon icon="fa-brands fa-bluesky"/>@eva.town over at Bluesky said](https://bsky.app/profile/eva.town/post/3m7g5j7p72s2w) that it’d be nice to be able to set hyphenation rules preventing words like “lighter” from hyphenating as “light-er” — but @knowler.dev pointed out that we can, sort of. The [<VPIcon icon="iconfont icon-css-tricks"/>`hyphenate-limit-chars`](https://css-tricks.com/almanac/properties/h/hyphenate-limit-chars/) property (still waiting for Safari support) enables us to specify the preferred minimum number of characters on either side of the hyphen, which is good enough, I suppose?

---

## Which color format should we be using?

[@nadyavoynich.com asked this question (<VPIcon icon="fa-brands fa-bluesky"/>`nadyavoynich.com`)](https://bsky.app/profile//post/3m7ppr7dcls2s), but honestly I still don’t know.

Some very good points were made about human-readable formats and color depth, and I’ve kind of settled on [<VPIcon icon="iconfont icon-css-tricks"/>`oklch()`](https://css-tricks.com/almanac/functions/o/oklch/). But some UI design tools don’t even support HSL, so?

---

## CSS Wrapped 2025 and State of HTML 2025

It’s that time of the year. We’ve had Spotify’s Wrapped, PlayStation’s Wrap-Up, Duolingo’s Year-in-Review — now it’s time for [<VPIcon icon="fa-brands fa-chrome"/>CSS Wrapped 2025](https://chrome.dev/css-wrapped-2025/), all of the latest and greatest things that Chrome did with CSS (and HTML) this year, and [<VPIcon icon="fas fa-globe"/>State of HTML 2025](https://2025.stateofhtml.com/), which is about HTML in general.

---

## Cool conversations, fun demos, and new browser features

In case you missed any of our [<VPIcon icon="iconfont icon-css-tricks"/>Quick Hits](https://css-tricks.com/category/quick-hits/), here are the latest CSS/web dev announcements and links that we’ve shared:

- [This Bluesky post (<VPIcon icon="fa-brands fa-bluesky"/>`heyo53.bsky.social`)](https://bsky.app/profile/heyo53.bsky.social/post/3m6sxhftrv22i) by @heyo53 got us thinking about whether it’s okay to style scrollbars (since people rarely interact with them physically these days, I personally just use `scrollbar-width: none`)
- Bramus put together a [demo visualizing the different values for `position-area`](https://bram.us/2025/12/02/anchor-positioning-and-the-inset-modified-containing-block-imcb/) and explained how to handle inside corners

Finally, our top picks for the best CSS and HTML features shipped by web browsers in the last couple of weeks:

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 143](https://developer.chrome.com/release-notes/143)
  - [<VPIcon icon="fa-brands fa-chrome"/>Anchored container queries](https://developer.chrome.com/release-notes/143#css_anchored_fallback_container_queries), which I briefly talked about in an [**article on container queries**](/css-tricks.com/what-else-could-container-queries-query.mdanchored-container-queries)
- [<VPIcon icon="fa-brands fa-firefox" />Firefox 146](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/146)
  - [**`contrast-color()`**](/css-tricks.com/exploring-the-css-contrast-color-function-a-second-time.md), which ensures optimal color contrast between two colors (or at least it will once it leverages [<VPIcon icon="fas fa-globe"/>CSS Color 6](https://drafts.csswg.org/css-color-6/#contrast-color-winner))
  - `text-decoration-inset`, which enables control over the position and size of text decorations
  - [<VPIcon icon="iconfont icon-css-tricks"/>`@scope`](https://css-tricks.com/almanac/rules/s/scope/), which makes defining new CSS scoping contexts a baseline feature (this, frankly, is the highlight of my **year**)
  - [**`@custom-media`**](/css-tricks.com/can-we-have-custom-media-queries-please.md)`, which is basically custom properties but for media queries, is being trialed
- [<VPIcon icon="fa-brands fa-apple"/>Safari 26.2](https://developer.apple.com/documentation/safari-release-notes/safari-26_2-release-notes)
  - [<VPIcon icon="iconfont icon-css-tricks"/>`random()`](https://css-tricks.com/almanac/functions/r/random/)` generates a random number in CSS, but unfortunately it’s not supported anywhere else yet.
  - [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) and [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-count()`](https://css-tricks.com/almanac/functions/s/sibling-count/)` get the position and number of siblings respectively (we’re only waiting for Firefox support now).
  - [<VPIcon icon="iconfont icon-css-tricks"/>`field-sizing`](https://css-tricks.com/almanac/properties/f/field-sizing/) enables adaptive sizing for input fields (again, hurry up Firefox).
  - [**`command` and `commandfor`**](/css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more.md), now baseline and my pick for best HTML feature of the year, are HTML attributes for invoking certain JavaScript events declaratively.
  - [**`hidden=until-found`**](/css-tricks.com/covering-hiddenuntil-found.md), also baseline now, for hiding elements until found by find-in-page.
  - Also, we’ve never been able to set `cursor` on pseudo-elements such as `::before` and `::after`, but thankfully we can now!

Remember, you can catch us again in two weeks — happy holidays!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #1: Advent Calendars, CSS Wrapped, Web Platform Updates, and More",
  "desc": "The best CSS news from around the web from the last two weeks. In this edition: advent calendars, CSS Wrapped 2025, and the latest Web Platform Updates.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-1.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
