---
lang: en-US
title: "Clip Pathing Color Changes"
description: "Article(s) > Clip Pathing Color Changes"
icon: fa-brands fa-js
category: 
  - JavaScript
  - Article(s)
tag: 
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: Article(s) > Clip Pathing Color Changes
    - property: og:description
      content: Clip Pathing Color Changes
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/clip-pathing-color-changes.html
prev: /programming/js/articles/README.md
date: 2024-07-23
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3103
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Clip Pathing Color Changes"
  desc="Let's look at a cool animated nav effect (from a recent post by Emil Kowalski) that uses CSS `clip-path` to move the highlighted nav item around. It's an interesting look at this CSS feature and adds a lot of polish to a simple idea."
  url="https://frontendmasters.com/blog/clip-pathing-color-changes"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3103"/>

[<VPIcon icon="fas fa-globe"/>This is a nice post from Emil Kowalski](https://emilkowal.ski/ui/the-magic-of-clip-path) on usage of [<VPIcon icon="fa-brands fa-firefox" />the `clip-path` property](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) in CSS. I’ve always liked `clip-path`. Maybe it’s because it’s such a sharp knife. When you clip an element, it’s *clipped*, yo. There isn’t a lot of nuance to it, it does what it does. But moreso, I think I like the connection to SVG (oh, hey, by the way, I just made [my old book Practical SVG](https://practical-svg.chriscoyier.net/) entirely free). The value that you give `clip-path` is stuff like `circle()`, `polygon()`, `path()`, etc — the primitive shapes of SVG.

In Emil’s post, my favorite example is a navigation bar where a “pill” shape animates from one navigation item to another when they are clicked. The pill is a different background color, and so the text color also changes. (If you’re over 100 years old like me, we used to call this kind of thing [<VPIcon icon="iconfont icon-jquery"/>“lava lamp” navigation](https://jqueryscript.net/demo/jQuery-Animated-Navigation-with-Sliding-Background-Lava-Lamp/) 👴).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/CleanShot-2024-07-23-at-10.06.59.gif?resize=800%2C156&ssl=1)

I would guess most people would assume what is happening here is an extra element set behind the links that moves position to underneath the newly active links. You *could* do it that way, but there is a minor aesthetic issue with it. Because the `background-color` is changing here, the text also needs to change appropriately (from dark to light here). You could change that color instantly, but that will look weird like it’s changing too early. You could set a `transition` on it, but you’ll never get the fade to look quite right, especially as it has to go through an awkward gray color.

![Essentially, you’ll *never* get a state like this](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/Screenshot-2024-07-23-at-10.09.32%E2%80%AFAM-1024x206.png?resize=1024%2C206&ssl=1)

This ain’t gonna happen with an underlay element alone.

See how the text is half-light and half-dark mid-animation when the highlight blue pill moves from one to another? That’s a lovely effect that makes this feel very polished and smooth. This idea first came from [a tweet by Paco](https://x.com/pacocoursey/status/1522639642155266048). Like Emil says:

> You might say that not everyone is going to notice the difference, but I truly believe that small details like this add up and make the experience feel more polished. Even if they go unnoticed.

Agreed.

In Emil’s post, it’s done with React. That’s totally fine, but I figured I’d make a vanilla one for y’all here:

<CodePen
  user="chriscoyier"
  slug-hash="ZEdOmYO"
  title="Nav Bar Clip Path Color Change"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s how this works:

1. There is one set of semantic HTML navigation.
2. If JavaScript executes, it duplicates the nav (we’ll need two) but ensures the duplicate is hidden for screen readers.
3. The duplicate is placed exactly on top of the original (it’s the “blue” one) and can’t directly be clicked (i.e. `pointer-events: none;`)
4. A `clip-path` is set that highlights one of the navigation items in particular by clipping the entire duplicate except one link.
5. As links are clicked, the `clip-path` is changed using positional math, highlighting the new one. Also high-five for the `round` keyword that can be used with `inset()` for rounded corners on inset rectangles.
6. The `clip-path` animates, thanks to a basic CSS `transition`.

I think it’s cool as heck that it all comes together that cleanly.

It’s also a nice touch that the new `clip-path` positions are calculated based on their page position, meaning that there are really no magic numbers here. If we add navigation items or change them, this code will be resilient and it will all still work. And if none of this JavaScript runs at all, no big deal.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Clip Pathing Color Changes",
  "desc": "Let's look at a cool animated nav effect (from a recent post by Emil Kowalski) that uses CSS `clip-path` to move the highlighted nav item around. It's an interesting look at this CSS feature and adds a lot of polish to a simple idea.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/clip-pathing-color-changes.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
