---
lang: en-US
title: "Dark mode toggles: two states are enough"
description: "Article(s) > Dark mode toggles: two states are enough"
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
      content: "Article(s) > Dark mode toggles: two states are enough"
    - property: og:description
      content: "Dark mode toggles: two states are enough"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/dark-mode-toggles-two-states-are-enough.html
prev: /programming/css/articles/README.md
date: 2026-08-17
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/lea-verou-color-scheme-scenarios.png
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
  name="Dark mode toggles: two states are enough"
  desc="Lea's pushing back on light/dark mode implementations that display three state options for visitors: light, dark, and system."
  url="https://css-tricks.com/dark-mode-toggles-two-states-are-enough"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/lea-verou-color-scheme-scenarios.png"/>

Exactly the kind of nerdy UI/UX discussion I love:

Lea’s pushing back on light/dark mode implementations that display three state options for visitors:

- Light
- Dark
- System (core of the debate)

Why show a System option at all when:

> […] a [<VPIcon icon="fas fa-globe"/>good two state control](https://lea.verou.me/blog/2026/dark-mode-toggles/#good-two-state-ux) can actually express all three states — users just need to apply the override the first time it becomes relevant.

The first figure succinctly illustrates the point:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/lea-verou-color-scheme-scenarios.png?resize=1652%2C1362&ssl=1)

::: note In short

No preference? Fall back to the system settings and provide a setting to override that if that’s needed/preferred. Then that preference is stored in `localStorage` for future sessions.

:::

Something I sorta missed the first time I saw the image is that perhaps we don’t even need to display two states when we know what color scheme is active:

- Light by default? Show a Dark option to override that.
- Dark by default? Show a Light option to override that.

Personally, I’m convinced. Less UI that accomplishes the same as more UI is generally a good thing. Lea’s point goes way beyond that, getting into well-considered reasons that go beyond simplicity.

An interesting consideration is what happens when toggling *back* to a state. Like, if we start with a Light system preference, toggle it to Dark, then back to Light. Do we get a new override preference or go back to the system setting would be an undefined `localStorage` value? Maybe it doesn’t matter because theme switching isn’t exactly the primary user intent:

> Remember, this control is **entirely tangential** to the actual user goal for visiting the website. Even if their intent were to pin *light* instead of reverting to *System (light)*, this is something they would only notice once these diverge, i.e. the OS switches to dark. At that point, fixing it is a single click away. It’s such an easy fix, that there is no point in dwelling on it further.

To be clear, Lea is referring to persistent UI. The guidance is targeting toggles that are always visible to the visitor. That’s really, really common in a site’s header/navigation (my personal site included). If that’s the pattern, then it could distract from the visitor’s primary intent. And the more options we see, the more cognitive dissonance is introduced.

I think there’s an even more compelling argument in the thread:

::: info *From Bluesky* (<VPIcon icon="fa-brands fa-bluesky"/><code>chriscoleman.name</code>)

> *All I ever wanted was for my OS to be dark, not every website I look at. It was a huge leap by the browser vendors to tie all web content to that system preference.Anyway, I think the light/dark preference should be in the browser, and what you propose seems perfectly in line with that...*

<SiteInfo
  name="Chris Coleman (@chriscoleman.name)"
  desc="All I ever wanted was for my OS to be dark, not every website I look at. It was a huge leap by the browser vendors to tie all web content to that system preference. Anyway, I think the light/dark preference should be in the browser, and what you propose seems perfectly in line with that."
  url="https://bsky.app/profile/chriscoleman.name/post/3msg6dswfmc2f"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:wkd374xinxaugweumwpw3pdn/bafkreifwptpdw3ke4vsuzewislydexhwm335vlngjme2ukas6xb4cf6fu4"/>

:::

Yes, please! Development for the preference, but no need to show an override when the setting is in the browser itself. Then a tri-state toggle might be more acceptable.

Speaking of which, [<VPIcon icon="fas fa-globe"/>Lea does offer two scenarios](https://lea.verou.me/blog/2026/dark-mode-toggles/#when-is-a-tri-state-control-appropriate%3F) where three states make sense:

1. Color scheme setting that lives a separate settings panel (i.e., the toggle is in a completely different context that isn’t interfering with the visitor’s primary intent)
2. When color schemes are implemented differently depending on the system setting (i.e., more than two color schemes are offered )

Worth the full read, if you ask me!

::: info

<SiteInfo
  name="Dark mode toggles: two states are enough • Lea Verou"
  desc="Yes, the underlying model must have three states, but one is always irrelevant to the actual user goal. Users do not seek out solutions to problems they don’t currently have. A lot of the hate towards two-state toggles is based on poor implementations."
  url="https://lea.verou.me/blog/2026/dark-mode-toggles/"
  logo="https://lea.verou.me/mark.svg"
  preview="https://lea.verou.me/blog/2026/dark-mode-toggles/image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Dark mode toggles: two states are enough",
  "desc": "Lea's pushing back on light/dark mode implementations that display three state options for visitors: light, dark, and system.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/dark-mode-toggles-two-states-are-enough.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
