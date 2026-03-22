---
lang: en-GB
title: "The Final Off-Canvas Navigation: Revisited"
description: "Article(s) > The Final Off-Canvas Navigation: Revisited"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Final Off-Canvas Navigation: Revisited"
    - property: og:description
      content: "The Final Off-Canvas Navigation: Revisited"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/css-off-canvas-responsive-navigation-revisited.html
prev: /programming/css/articles/README.md
date: 2023-10-06
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2023-10-06-css-off-canvas-responsive-navigation-revisited.png
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
  name="The Final Off-Canvas Navigation: Revisited"
  desc="The one where I regret using the word “final”"
  url="https://dbushell.com/2023/10/06/css-off-canvas-responsive-navigation-revisited/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2023-10-06-css-off-canvas-responsive-navigation-revisited.png"/>

So I may have used the word “final” rather ambitiously when I blogged [**“The Final Off-Canvas Navigation?”**](/dbushell.com/css-off-canvas-responsive-navigation.md) two years ago. At least I left the door open with a question mark? I’ve since made big changes to the implementation.

---

## The New (New) Version

Checkout [my new demo on CodePen (<VPIcon icon="fa-brands fa-codepen" />`dbushell`)](https://codepen.io/dbushell/pen/xxmzddB).

<CodePen
  user="dbushell"
  slug-hash="xxmzddB"
  title="Off-Canvas Navigation ²"
  :default-tab="['css','result']"
  :theme="dark"/>

All the good stuff remains like focus state, keyboard navigation, right-to-left styles. This is still experimental I don’t consider it ready to use just yet.

### Dialog and Popover

Modern web browsers now support [<VPIcon icon="fa-brands fa-firefox"/>dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) elements and [<VPIcon icon="fa-brands fa-firefox"/>popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) attributes. These two allow for accessible interactivity with zero JavaScript. That means less code. There is no longer a need for the “no script” version that looks and behaves differently. Core functionality just works. I’m using a sprinkling of JavaScript for minor improvements.

### CSS Animations

My previous version used overflow and scroll-snap to show and hide sub-menus. That proved to be janky and gave little control over the transition effect. Now `popover` does the hard work with CSS animations.

Adding an opening transition is easy with the `:popover-open` pseudo-class. Closing transitions are tricky. [<VPIcon icon="fa-brands fa-chrome"/>Chrome](https://developer.chrome.com/blog/introducing-popover-api/#interactive-entry-and-exit) appears to respect closing animations. Other browsers hide the popover immediately. I don’t know what is “spec” here. For now I’ve used JavaScript to delay the actual `hidePopover()` until the animation ends.

I’ve also found `::backdrop` transitions to behave strangely for some CSS properties. In fact this pseudo-element behaves just plain weird from my experience.

::: note Ready to use?

Short answer: I don’t know, so I wouldn’t recommend it. While browser support is strong it’s all very recent. I’d appreciate any accessibility related feedback on this implementation.

Find me at [@db (<VPIcon icon="fa-brands fa-mastodon"/>`social.lol`](https://social.lol/@db/) or [<VPIcon icon="fas fa-globe"/>email me](https://dbushell.com/contact/).

A closing thought: do you really want your entire navigation dumped into an off-canvas `<dialog>` modal?

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Final Off-Canvas Navigation: Revisited",
  "desc": "The one where I regret using the word “final”",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/css-off-canvas-responsive-navigation-revisited.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
