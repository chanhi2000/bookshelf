---
lang: en-US
title: "The Two Button Problem"
description: "Article(s) > The Two Button Problem"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Two Button Problem"
    - property: og:description
      content: "The Two Button Problem"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-two-button-problem.html
prev: /programming/css/articles/README.md
date: 2025-10-21
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7422
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
  name="The Two Button Problem"
  desc="When you've got two buttons with two different looks (and no cursor), how do you know which one you're about to activate? You'll need to be careful with the design."
  url="https://frontendmasters.com/blog/the-two-button-problem/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7422"/>

I see this UI/UX issue all the time: there are two buttons, and it’s not clear which one of them is in the active state. Here’s an example from my TV:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/IMG_6368.jpeg?resize=768%2C1024&ssl=1)

Which one of those two buttons above is active? Like if I press the enter/select button on my remote, am I selecting “Try it free” or “Sign in”? It’s entirely unclear to me based on the design. Those two design styles are ambiguous. Just two random selections from today’s trends of button design.

If I press the up (or down) arrows on my remote, the styles of the buttons just reverses, so even interacting with the interface doesn’t inform the choice.

This is a problem that can be solved at multiple levels. If the buttons are toggles that affect on-page content, the accessibility angle is partially solved by [<VPIcon icon="fa-brands fa-firefox" />the `aria-selected` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-selected), for example. It’s also slightly less of an issue on devices with a cursor, as you likely just click on the one that you want. This is mostly a problem with remote control and keyboard usage where the `active` state is unclear or ambiguous.

I call it the “two button” problem because if there were more than two buttons, the one that is styled differently is probably the one that is active. We could use our grade school brains to figure out which button is active.

![([<VPIcon icon="fas fa-globe"/>via](https://subiscanoajsdblearning.z13.web.core.windows.net/which-one-is-different-worksheet.html))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/joinPdf_3f0300690d09f12d1940b2475ca2d8d3_page-0069.jpg?resize=791%2C1024&ssl=1)

Ideally, though, we don’t have to think very hard. It should be obvious which one is active.

Again, the problem:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-1.30.22-PM.png?resize=970%2C462&ssl=1)

The most obvious solution here is to make both button styles the same, but be additive when one of them is the active button.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-3.40.56-PM.png?resize=1024%2C526&ssl=1)

I feel like it’s very clear now that “Try it free” is the selected button now. Even if it’s not to a user immediately. If they tab/arrow/whatever to the *other* button, that outline design will move to it and it will become clear then.

You could also, ya know, literally point to it:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-3.43.43-PM.png?resize=1024%2C462&ssl=1)

Perhaps you could resort to more “extreme” design styles like this when there is prove-ably no mouse/cursor involved, like:

```css
@media (hover: none) and (pointer: coarse) {
  button:active {
    /* big obvious arrow styles */
  }
}
```

[**We’ve got a recent post on @media queries**](/frontendmasters.com/learn-media-queries.md) that goes into lots of situations like this!

This “two button” problem also can come up in the design pattern of “toggles”. Take something like this:

![A “pill” toggle design pattern.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-3.49.02-PM.png?resize=714%2C276&ssl=1)

Which one of those buttons is currently active? The up arrow? The down arrow? Neither? It’s impossible to tell by look alone.

Sometimes in this case the “active” button is “grayed out”:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-3.52.05-PM.png?resize=738%2C278&ssl=1)

The implication here is that the up arrow is the “active” one, so you don’t need to press it again as it won’t do anything. Only the non-active button is pressable. I feel like this is okay-ish as a pattern, but it’s not my favorite as the active state is less prominent instead of more prominent almost indicating it’s disabled for some other reason or doesn’t matter.

This kind of thing makes me almost miss the days of skeuomorphism where digital interfaces were designed to try to mimic real world surfaces and objects. We don’t have to go full leather-coated buttons though, we can just make the active button appear pressed through shadows and flattening.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-4.06.07-PM.png?resize=772%2C296&ssl=1)

This situation differs from the TV interface issue above in that this “active” button is indicating the button *has already* been pressed, not that it’s the button that *will be* pressed. So you’d need a style for that state as well.

Maybe these aren’t the most amazing examples in the world, but I hope I’ve got you thinking about the two-button problem. When there are only two buttons, you can’t just pick two arbitrary different styles, as that doesn’t help people understand which of the two are active. You need to think about it a little deeper and get those styles in a place where it’s obvious.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Two Button Problem",
  "desc": "When you've got two buttons with two different looks (and no cursor), how do you know which one you're about to activate? You'll need to be careful with the design.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-two-button-problem.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
