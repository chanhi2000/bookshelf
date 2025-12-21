---
lang: en-US
title: "Scroll-Driven… Sections"
description: "Article(s) > Scroll-Driven… Sections"
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
      content: "Article(s) > Scroll-Driven… Sections"
    - property: og:description
      content: "Scroll-Driven… Sections"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/scroll-driven-sections.html
prev: /programming/css/articles/README.md
date: 2024-10-29
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4277
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
  name="Scroll-Driven… Sections"
  desc="If you're creating a scroll-driven animation and the goal is "
  url="https://frontendmasters.com/blog/scroll-driven-sections/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4277"/>

I was checking out [<VPIcon icon="fas fa-globe"/>a very cool art-directed article](https://quantamagazine.org/the-thought-experiments-that-fray-the-fabric-of-space-time-20240925/) the other day, full of *scrollytelling*, and, like us web devs will be forever cursed to do, wondering what they used to build it. Spoiler: it’s [<VPIcon icon="fas fa-globe"/>GSAP](https://gsap.com/) and [<VPIcon icon="fas fa-globe"/>ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

No shame in those tech choices, they are great. But with [<VPIcon icon="fa-brands fa-firefox"/>scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations) now being a web standard with [<VPIcon icon="fas fa-globe"/>growing support](https://caniuse.com/mdn-css_properties_animation-timeline_scroll), it begs the question whether we could do this with native technologies.

My brain focused on one particular need of the scrollytelling style:

1. While the page scrolls *through a particular section*
2. Have a child element appear in a fixed position *and be animated*
3. … but before and after this section is being scrolled through, the element is hidden

Perhaps a diagram can help drive that home:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/10/Frame-3.png?resize=462%2C1024&ssl=1)

But I was immediately confused when thinking about how to do this with scroll-driven animations. **The problem is that that “section” itself is the thing we need to apply the `animation-timeline: view();` to, such that we have the proper moment to react to (“_the section is currently in view!_“).** But in my diagram above, it’s actually a `<blockquote>` that we need to apply special conditional styling to, not the section. In a `@keyframe` animation, all we can do is change declarations, we can’t select other elements. Apologies if that confusing, but the root of is that we need to transfer styles from the section to the blockquote without using selectors — and it’s weird.

The good news is that what we can do is update CSS custom properties on the section, and those values will cascade to all the children of the section, and we can use those to style the blockquote.

First, in order to make a custom property animatable, we need to declare it’s type. Let’s do a fade in first, thus we need opacity:

```css
@property --blockquoteOpacity {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 0%;
}
```

Now the section itself has the animation timeline:

```css
section.has-pullquote {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: cover 0% cover 100%;
}
```

And that animation we’ve named `reveal` above can now update the custom property:

```css
@keyframes reveal {
  from {
    --blockquoteOpacity: 0%;
  }
  to% {
    --blockquoteOpacity: 100%;
  }
}
```

Now as the animation runs, based on it’s visibility in the viewport, it will update the custom property and thus fade/in out the blockquote:

```css
blockquote {
  opacity: var(--blockquoteOpacity);

  position: sticky;
  top: 50%;
  transform: translateY(-50%);
}
```

Note I’m using `position: sticky` in there too, which will keep our blockquote in the middle of the viewport while we’re cruising through that section.

Try it out (Chrome ‘n’ friends have stable browser support):

<CodePen
  user="chriscoyier"
  slug-hash="gOVXVjj"
  title="Fixed Position Blockquote Only In Certain Section"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s a video of it working in case you’re in a non-supporting browser:

<VidStack src="https://videopress.com/e8b9dd44-4258-4198-930c-a2dea1ad0452" />

Because we instantiated the opacity custom property for the opacity at 100%, even in a non-supporting browser like Safari, the blockquote will be visible and it’s a fine experience.

I found this all a little fiddly, but I’m not even sure I’m doing this “correctly”. Maybe there is a way to tap into another elements view timeline I’m not aware of? If I’m doing it the intended way, I could see this getting pretty cumbersome with lots of elements and lots of different values needing updated. But after all, that’s the job sometimes. This is intricate stuff and we’re using the CSS primitives directly. The control we have is quite fine-grained, and that’s a good thing!

::: info Article Series

1. [Scroll-Driven… Sections](/frontendmasters.com/scroll-driven-sections.md)
2. [Named Scroll & View Timelines](/frontendmasters.com/named-scroll-view-timelines.md)
3. [(Up-) Scoped Scroll Timelines](/frontendmasters.com/scoped-scroll-timelines.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scroll-Driven… Sections",
  "desc": "If you're creating a scroll-driven animation and the goal is ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/scroll-driven-sections.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
