---
lang: en-US
title: "Scroll-Driven, Scroll-Triggered, Scroll States, and View Transitions"
description: "Article(s) > Scroll-Driven, Scroll-Triggered, Scroll States, and View Transitions"
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
      content: "Article(s) > Scroll-Driven, Scroll-Triggered, Scroll States, and View Transitions"
    - property: og:description
      content: "Scroll-Driven, Scroll-Triggered, Scroll States, and View Transitions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/scroll-driven-scroll-triggered-scroll-states-and-view-transitions.html
prev: /programming/css/articles/README.md
date: 2026-06-08
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/scroll-animations-view-transitions.webp
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
  name="Scroll-Driven, Scroll-Triggered, Scroll States, and View Transitions"
  desc="I've said one and mean another, and I've used one when I needed another. Comparing scroll-driven animations, scroll-triggered animations, container query scroll states, and view transitions for my future self."
  url="https://css-tricks.com/scroll-driven-scroll-triggered-scroll-states-and-view-transitions"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/scroll-animations-view-transitions.webp"/>

I’ve said one and meant another, and I’ve used one when I needed another. Please bear with me as I note the high-level similarities and differences between **scroll-driven animations**, **scroll-triggered animations**, **container query scroll states**, and **view transitions** for my future self.

---

## Scroll-Driven Animations

<BaselineStatus featureid="scroll-driven-animations" />

A scroll-*driven* animation is an animation that responds to, yeah, scrolling. Specifically, there’s a direct link between scrolling progress and the animation’s progress. Scroll forwards, the animation moves forward. Scroll backwards, the animation runs backwards. Stop scrolling, the animations stops.

```css
.element {
  animation: grow-progress linear forwards;
  animation-timeline: scroll();
}
```

<CodePen
  user="anon"
  slug-hash="LENgEQG"
  title="Scrolling Flip Cards: Cover Range"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Scroll-Triggered Animations

A scroll-*triggered* animation executes on scroll and runs in its entirety. In other words, there’s no direct link with the scroll progress here. When an element crosses some defined threshold — called the *trigger activation range* — the animation runs, runs, runs. For example, when that element enters and exits the scrollport.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/Screen-Recording-2026-04-14-at-10.16.47-AM.mov" />

<CodePen
  user="anon"
  slug-hash="qEaLPGE"
  title="Scroll-Triggered Flipping Cards"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Container Query Scroll State

<BaselineStatus featureid="container-scroll-state-queries" />

This one’s in the [<VPIcon icon="iconfont icon-w3c"/>working draft](https://drafts.csswg.org/css-conditional-5/#container-scroll-state-query) of CSS Conditional Rules Module Level 5 specification. Here’s how the spec defines it:

> […] allows querying a container for state that depends on scroll position. 

This is why my brain hurts so much. It’s sorta like a scroll-driven animation, sorta like a scroll-triggered animation, but updates styles when a container reaches some sort of scroll condition, say:

```css
.sticky-nav {
  container-type: scroll-state;
  position: sticky;
  top: 0;

  @container scroll-state(stuck: top) {
    background: orangered;
    border-radius: 0;
    flex-direction: row;
    width: 100%;

    a {
      text-decoration: none;
    }
  }
}
```

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/Screen-Recording-2026-04-14-at-9.29.54-AM.mov" />

<CodePen
  user="anon"
  slug-hash="OPLwNma"
  title="Container Query Scroll State Sticky Nav"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## View Transition

<BaselineStatus featureid="view-transitions" />

This has nothing to do with scroll! And it has nothing to do with `view()`. We’re actually talking about a complete API with interlocking CSS and JavaScript features that can do two things:

### Same-document transitions

An element changes from one state to another in response to a user interaction. I was really tickled by this one from Modern Web Weekly animating radio button check states where the state moves from one input to the other.

<CodePen
  user="anon"
  slug-hash="MYWwJEd"
  title="Modern Web Weekly Radio View Transition"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Basically, the state changes on the same page it started. Bramus is king of all-thing view transitions with oodles of beautiful examples in [<VPIcon icon="fas fa-globe"/>this collection](https://view-transitions.chrome.dev/my-patagonia-trip/) from the Chrome team.

### Cross-document transitions

Animating from one page to the next. The default usage is a crossfade from Page A to Page B (and back again) and [**is really easy to implement**](/css-tricks.com/snippets-css/basic-view-transition.md). It can get much more complex from there, of course. [**Sunkanmi recently shared several recipes**](/css-tricks.com/7-view-transitions-recipes-to-try.md), like this neat one that wipes out the first page with a circular `clip-path` revealing the second page.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-Transitions-Circular-Wipe.mp4" />

---

## That’s all!

It helps me to spell things out like this.

| Type | What it does |
| --- | --- |
| **Scroll-Driven Animations** | Scroll forwards, the animation moves forward. Scroll backwards, the animation runs backwards. Stop scrolling, the animations stops. |
| **Scroll-Triggered Animations** | When an element crosses some defined threshold — called the *trigger activation range* — the animation runs, runs, runs. |
| **Container Query Scroll State** | Updates styles when a container reaches some sort of scroll condition. |
| **View Transition** | API for *same-document transitions* (element changes from one state to another on the page) and *cross-document transitions* (transitioning from one page to the next, and back). |

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scroll-Driven, Scroll-Triggered, Scroll States, and View Transitions",
  "desc": "I've said one and mean another, and I've used one when I needed another. Comparing scroll-driven animations, scroll-triggered animations, container query scroll states, and view transitions for my future self.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/scroll-driven-scroll-triggered-scroll-states-and-view-transitions.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
