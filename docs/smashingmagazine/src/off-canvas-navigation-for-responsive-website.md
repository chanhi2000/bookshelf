---
lang: en-US
title: "How To Implement Off-Canvas Navigation For A Responsive Website"
description: "Article(s) > How To Implement Off-Canvas Navigation For A Responsive Website"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Implement Off-Canvas Navigation For A Responsive Website"
    - property: og:description
      content: "How To Implement Off-Canvas Navigation For A Responsive Website"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/off-canvas-navigation-for-responsive-website.html
prev: /programming/css/articles/README.md
date: 2013-01-15
isOriginal: false
author:
  - name: David Bushell
    url: https://smashingmagazine.com/author/david-bushell/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3bda1e68-eaf3-437d-a07a-c1d8a6eded94/demo-1-5001.png
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

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How To Implement Off-Canvas Navigation For A Responsive Website"
  desc="The varying viewports that our websites encounter on a daily basis continue to demand more from responsive design. Not only must we continue to tackle the issues of content choreography — the art of maintaining order and context throughout the chaotic ebb and flow of the Web browser — but we must also meet the expectations of users."
  url="https://smashingmagazine.com/2013/01/off-canvas-navigation-for-responsive-website/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3bda1e68-eaf3-437d-a07a-c1d8a6eded94/demo-1-5001.png"/>

The varying viewports that our websites encounter on a daily basis continue to demand more from responsive design. Not only must we continue to tackle the issues of content choreography — the art of maintaining order and context throughout the chaotic ebb and flow of the Web browser — but we must also **meet the expectations of users**.

The varying viewports that our websites encounter on a daily basis continue to demand more from responsive design. Not only must we continue to tackle the issues of [<VPIcon icon="fas fa-globe"/>content choreography](https://trentwalton.com/2011/07/14/content-choreography/) — the art of maintaining order and context throughout the chaotic ebb and flow of the Web browser — but we must also **meet the expectations of users**. They’re not sitting still.

With the likes of [<VPIcon icon="fa-brands fa-google"/><VPIcon icon="fa-brands fa-firefox"/>Firefox OS](https://mozilla.org/en-US/firefoxos/ "Firefox OS") (Boot to Gecko), [<VPIcon icon="fa-brands fa-google"/>Chrome OS](https://google.com/intl/en/chrome/devices/ "Chrome OS") and now Ubuntu for phones — an OS that makes “Web apps” first-class citizens — delivering native app-like experiences on the Web may become a necessity if users begin to expect it. Many in our field have argued for a degree of separation between the Web and native platforms for both technical and philosophical reasons. They’re certainly wise to heed caution, but as consumer devices continue to blur the boundaries, it’s worth thinking about what we can learn from native app design.

---

## A Demonstration

In this article, I’ll be walking through a build demo that centers on two topics. The first is [<VPIcon icon="fas fa-globe"/>responsive design patterns](http://bradfrost.github.io/this-is-responsive/patterns.html) that embrace the viewport and that improve content discoverability beyond the basic hyperlink; in this case, **off-canvas navigation**. The second is the complexities of implementing such ideas in an accessible and highly performant manner. These are two topics that I believe are at the heart of the Web’s future.

With that in mind, let’s get building.

---

## The Accessible Base

All good things begin with a solid foundation of semantic HTML and widely supported CSS. In theory, this baseline should function as a usable experience for all browsers that visit our website. (It might also be the *final* experience in less-capable browsers.)

As a starting point, I’ll use a technique very similar to Aaron Gustafson’s [<VPIcon icon="fas fa-globe"/>Smart Mobile Navigation Without Hacks](https://creativebloq.com/css3/build-smart-mobile-navigation-without-hacks-6122800). It requires no JavaScript to function.

![Step 1 of the responsive off-canvas menu.](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/28a4bd4f-42d8-4db0-bfbd-e3e3515a9c4c/demo-1-500.png)(https://dbushell.github.com/Responsive-Off-Canvas-Menu/step1.html)

::: info

[<VPIcon icon="fas fa-globe"/>View demo 1](http://dbushell.github.io/Responsive-Off-Canvas-Menu/step1.html) Be sure to view on a mobile or small screen, and take a while to inspect the code. Although our final design will be significantly different, starting simple is vital; retrofitting accessibility isn’t trivial.

:::

The HTML body looks like this (I’ve stripped a few attributes for semantic clarity):

```xml
<header id="top" role="banner">
  <h1>Book Title</h1>
  <a href="#nav">Book navigation</a>
</header>
<nav id="nav" role="navigation">
  <h2>Chapters</h2>
  <ul>
    <li><a href="#">Chapter 1</a></li>
    <li><a href="#">Chapter 2</a></li>
    <li><a href="#">Chapter 3</a></li>
    <li><a href="#">Chapter 4</a></li>
    <li><a href="#">Chapter 5</a></li>
  </ul>
  <a href="#top">Return to content</a>
</nav>
<article role="main">
  <!-- [main content here] -->
</article>
```

You could consider the HTML alone, with little to no styling, as being “breakpoint zero.” If it’s not logical at this stage, then accessibility will not improve.

### Demo 1 Breakdown

- Media queries are based on a viewport width of `45em` (that’s content-dependent). Above this breakpoint, the navigation is permanently visible. I prefer em units because they allow breakpoints to maintain a relationship with text size. Lyza Gardner explains in detail in her post “[<VPIcon icon="fas fa-globe"/>The EMs Have It: Proportional Media Queries FTW!](https://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/)”
- I’m using both `min-width` and `max-width` media queries to scope CSS. This adds a bit of complexity. Most people prefer a “mobile-first” build, using only progressively larger `min-width` queries. The downside with that technique is the amount of **resetting** required if an element has noticeably different visual states. Neither method is right or wrong.
- The crux of this initial stage is the [<VPIcon icon="fa-brands fa-firefox"/>`:target pseudo-class`](https://developer.mozilla.org/en-US/docs/Using_the_:target_selector) selector, utilized to show and hide the navigation. Only IE8 and lower lack support. However, this is a non-issue if you serve a semi-fluid desktop style sheet to old IEs. [<VPIcon icon="fas fa-globe"/>Jake Archibald](http://jakearchibald.github.io/sass-ie/), [<VPIcon icon="fas fa-globe"/>Nicolas Gallagher](https://nicolasgallagher.com/mobile-first-css-sass-and-ie/) and [<VPIcon icon="fas fa-globe"/>Stuart Robson](https://alwaystwisted.com/articles/css3-3d-ribbons-using-2d-transforms?s=2012-08-06-a-sass-mixin-for-media-queries-and-ie) can tell you more.

As the demo takes shape, I’ll continue to introduce the main development principles. There’s a long way to go yet…

---

## Going Off-Canvas

For some websites, the above may suffice — but not for us! We’re experimenting with off-canvas patterns and striving for that native experience. Because we cannot ignore older browsers, it’s now time to **progressively enhance**.

![Step 2 of the responsive off-canvas menu.](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/812550f5-0570-48cb-991d-7cbee7cb40f5/demo-2.png)

::: info

[<VPIcon icon="fas fa-globe"/>View demo 2](http://dbushell.github.io/Responsive-Off-Canvas-Menu/step2.html)** You will see the restyled navigation with basic functionality.

:::

### Demo 2 Breakdown

- I’m adding the class `js-ready` to the document element after the [<VPIcon icon="fa-brands fa-firefox"/>DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/DOMContentLoaded_(event)) event fires. The selector `.js-ready` is used as a hook to safely restyle the navigation off-canvas. If for whatever reason JavaScript *doesn’t* load, then the original functionality from demo 1 still exists.
- To show and hide the navigation, I’m toggling a class of `js-nav` on the document element when the user clicks (or taps) the relevant buttons. This simply applies a style of `left: 70%` to the `#inner-wrap` element (`#outer-wrap` is used to hide any overflow and to avoid scrollbars).

This is a fairly basic enhancement, but importantly it remains usable before JavaScript is ready. It’s also notable that no inline styles are written with JavaScript; only classes are used to manage states.

Jumping between open and closed navigation states makes for a jarring user experience. Users need to understand — or even *see* — how an interface has changed. This is often the point where developers let the Web down. To be fair, building user interfaces is incredibly difficult. What I’m going to show below is far from perfect, but it’s certainly a step in the right direction.

So, we have the set-up. Now let’s add transitions.

---

## Transitioning (The Wrong Way)

I’ll start by getting it all wrong, because this is how I would have done it a few years ago, and learning from mistakes is important.

![The responsive off-canvas menu using jQuery `.animate` for transitions.](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b52440b7-ba6b-4098-ac95-44d787163f85/demo-jquery.png)

jQuery is a resource that many front-end developers begin with to learn JavaScript. Personally, I am a big fan (never blame the tools), but unfortunately jQuery has a habit of making things look deceptively simple. It masks complexity and, with that, *understanding*.

Transitioning our off-canvas navigation with jQuery is very easy:

```js
$('#nav-open-btn').on('click', function() {
    $('#inner-wrap').animate({ left: '70%' }, 500);
});

$('#nav-close-btn').on('click', function() {
    $('#inner-wrap').animate({ left: '0' }, 500);
});
```

Visually, this achieves the effect we’re after, but test it on mobile and watch the frame rate stutter. Performance is dreadful.

This method is bad for several reasons:

![An animation of jQuery updating the DOM](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/aeb2feae-a427-4626-af93-43579c68df85/jquery-animate.gif)

- jQuery’s `.animate` increments the element’s `style` attribute on every animation frame (as can be seen in the GIF above). This forces the browser to [<VPIcon icon="fa-brands fa-google"/>recalculate the layout](https://developers.google.com/speed/articles/reflow "Minimizing browser reflow").
- It leaves inline styles in the DOM that have very **high specificity** and that will override our well-maintained CSS. This is a big issue if the viewport is resized and triggers different breakpoints.
- A **separation of concerns** is lost because styles are defined in JavaScript files.

Overall, it’s a performance and maintainability nightmare. There is a better way.

---

## Transitioning With CSS

Putting the jQuery experiment aside, I’m now building from the second demo again, this time using **CSS transforms and transitions**. These enable us to smoothly animate the off-canvas navigation with great performance.

![The final responsive off-canvas menu using CSS transforms and transitions.](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8d2726d2-eb46-4a2c-af31-3ae989985600/demo-final1.png)

::: info

[<VPIcon icon="fas fa-globe"/>View final demo](http://dbushell.github.io/Responsive-Off-Canvas-Menu/step4.html) Performance has drastically improved compared to the jQuery example.

:::

### Final Demo Breakdown

- Returning to CSS, I’m once again using the `.js-nav` class to toggle the navigation, while making no actual style alterations with JavaScript.
- I’m progressively enhancing with the classes `.csstransforms3d` and `.csstransitions` (applied to the document element by [<VPIcon icon="fas fa-globe"/>Modernizr](https://modernizr.com/)).
- Instead of moving the navigation with negative positioning (`left: -100%`), I’m using the `transform` property: `transform: translate3d(-100%, 0, 0)`.
- CSS transitions are used to animate `transform` changes: `transition: transform 500ms ease`. And I’ve added a few more transforms to enhance the visual effect.

With the help of Modernizr, this will fall back to [<VPIcon icon="fas fa-globe"/>demo 2](http://dbushell.github.io/Responsive-Off-Canvas-Menu/step2.html) if browser support is lacking for CSS transforms and transitions. (In theory, I could fall back to jQuery animation, but it’s really not worth it.) When you [<VPIcon icon="fas fa-globe"/>download Modernizr](https://modernizr.com/download/), you can include only the feature detection that you need. It also includes the HTML5 shiv for IE. All in all, it’s a very useful script.

The benefits here are immense. First and foremost, by transitioning elements with 3-D transforms, the browser can generate render layers that are [**hardware-accelerated**](/smashingmagazine.com/play-with-hardware-accelerated-css.md). Secondly, there’s no need for JavaScript to worry about style or media-query breakpoints. JavaScript need only interpret user interaction and apply classes to maintain states — CSS defines the visual changes.

We can look deeper into performance by using Chrome’s Developer Tools. The results below are from the desktop browser, but for mobile performance you could use [<VPIcon icon="fa-brands fa-google"/>USB Remote Debugging](https://developers.google.com/chrome/mobile/docs/debugging) on Android devices.

### jQuery Animation Performance

![jQuery animation performance in Chrome Developer Tools](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ea953dbd-f7ce-4614-adb8-65fdde17ba34/demo-perf-jquery.png)

The four events above represent the opening and closing of the navigation twice. In the diagram, yellow represents the JavaScript running, purple is the rendering (recalculating the style and layout), and green is the painting to the screen. On mobile, we’d be shooting way below that 30 FPS line. I also tested on an iPhone 3GS and could literally count 3 FPS with my own eyes — it’s that slow!

### CSS Transition Performance

![CSS transition performance in Chrome Developer Tools](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2e7b412c-6415-4754-b9af-64c9fb013cb4/demo-perf-css.png)

What a difference! The only JavaScript that exists is there to manage user interaction before and after the transition. The green we’re seeing is the minimum that the browser needs to repaint the transition at a respectable frame rate, using [**GPU acceleration**](/smashingmagazine.com/gpu-animation-doing-it-right.md).

### Possible Concerns

As with all new Web standards, nothing is inherently perfect.

In WebKit-based browsers, the [<VPIcon icon="fas fa-globe"/>font smoothing](https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/) may switch to antialiased from the default subpixel-antialiased when CSS transforms or transitions are applied. This could result in visually thinner text, which many designers actually prefer — but [<VPIcon icon="fas fa-globe"/>not something you should “fix.”](https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/)

Flickering can also occur if an element goes between transform and no-transform. To avoid this, always start with a default like `translate3d(0,0,0)` on an element that will move later, so that the render layer is composed and ready.

---

## The Next Step

Enhancing further, we could detect and take advantage of touch gestures, like swiping, to really bring this implementation closer to par with its native counterparts — “closer” being the operative word, but I do believe the gap is closer than many would have us believe.

It’s also — in my opinion — a gap that we *need* to bridge.

There are other clever ways to increase interaction speed. Mobile browsers tend to wait around 300 ms to fire click events.

[<VPIcon icon="iconfont icon-w3c"/>Transition easing](https://w3.org/TR/css3-transitions/#transition-timing-function-property) can radically change the visual effect and the user’s perception of what’s happening. Whether elements need to spring, bounce or accelerate into action, Lea Verou has a useful [<VPIcon icon="fas fa-globe"/>cubic bezier](https://cubic-bezier.com/) resource to generate custom easing functions.

Hopefully, this article has shown the improvements that can be made if we take extra care to understand the technology we’re using.

::: info Download The Code

So, there we have it: a three-tiered responsive, interactive, off-canvas menu. I’ve set up a [GitHub repository (<VPIcon icon="iconfont icon-github"/>`dbushell/Responsive-Off-Canvas-Menu`)](https://github.com/dbushell/Responsive-Off-Canvas-Menu) where you can view all the code. Have a play with it; there are a few bits and pieces I haven’t covered to avoid bloating this article.

:::

::: info Further Reading

To really understand why the techniques highlighted above are my preferred solution, I point you in the direction of these resources:

```component VPCard
{
  "title": "All you need to know about CSS Transitions",
  "desc": "CSS3 transitions bring simple and elegant animations to web applications, but there's a lot more to the spec than first meets the eye. In this post I'm going to delve into some of the more complicated parts of CSS transitions, from chaining and events to hardware acceleration and animation functions.",
  "link": "https://blog.alexmaccaw.com/all-you-need-to-know-about-css-transitions//",
  "logo": "https://blog.alexmaccaw.com/favicon.ico",
  "background": "rgba(139,92,246,0.2)"
}
```

```component VPCard
{
  "title": "Why moving elements with translate() is better than pos:abs top/left - Paul Irish",
  "desc": "In modern days we have two primary options for moving an element across the screen:...",
  "link": "https://paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft//",
  "logo": "https://paulirish.com/favicon.ico",
  "background": "rgba(41,112,166,0.2)"
}
```

- [**“Improving the Performance of Your HTML5 App”**](/web.dev/speed-html5.md), Malte Ubl Looks deep into the intricacies of performance.
- ~~“[<VPIcon icon="fa-brands fa-opera"/>CSS3 vs jQuery Animations](https://dev.opera.com/articles/view/css3-vs-jquery-animations/),” *Siddharth Rao* This article puts both methods head to head.~~
- ~~“[<VPIcon icon="fas fa-globe"/>Understanding Hardware Acceleration on Mobile Browsers](https://conferences.oreilly.com/velocity/velocity2012/public/schedule/detail/23298 "Understanding Hardware Acceleration on Mobile Browsers"),” *Ariya Hidayat* Goes under the hood with a technical review.~~
- ~~“[Scrolling Performance](https://html5rocks.com/en/tutorials/speed/scrolling/ "Scrolling Performance"),” *Paul Lewis* Looks at a related scenario.~~

:::

::: info Further Reading

- [**Exploring The Potential Of The Off-Canvas Pattern**](/smashingmagazine.com/off-the-beaten-canvas-exploring-the-potential-of-the-off-canvas-pattern.md)
- [**When Off-Canvas Isn’t Good Enough**](/smashingmagazine.com/smart-responsive-design-patterns-or-when-off-canvas-isnt-good-enough.md)
- [**How To Keep Framework Development Simple And Bug-Free**](/smashingmagazine.com/simple-real-and-bug-free-foundation-development.md)
- [**A Simple JavaScript Plugin For Responsive Navigation**](/smashingmagazine.com/javascript-plugin-for-responsive-navigation.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Implement Off-Canvas Navigation For A Responsive Website",
  "desc": "The varying viewports that our websites encounter on a daily basis continue to demand more from responsive design. Not only must we continue to tackle the issues of content choreography — the art of maintaining order and context throughout the chaotic ebb and flow of the Web browser — but we must also meet the expectations of users.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/off-canvas-navigation-for-responsive-website.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
