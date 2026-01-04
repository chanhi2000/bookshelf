---
lang: en-US
title: "Bringing Back Parallax With Scroll-Driven CSS Animations"
description: "Article(s) > Bringing Back Parallax With Scroll-Driven CSS Animations"
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
      content: "Article(s) > Bringing Back Parallax With Scroll-Driven CSS Animations"
    - property: og:description
      content: "Bringing Back Parallax With Scroll-Driven CSS Animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations.html
prev: /programming/css/articles/README.md
date: 2025-08-06
isOriginal: false
author:
  - name: Blake Lundquist
    url : https://css-tricks.com/author/blakelundquist/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/01/smooth-scroll.jpg
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
  name="Bringing Back Parallax With Scroll-Driven CSS Animations"
  desc="Parallax is a pattern in which different elements of a webpage move at varying speeds as the user scrolls, creating a three-dimensional, layered appearance. It once required JavaScript. Now we have scroll-driven animations in CSS, which is free from the main-thread blocking that can plague JavaScript animations."
  url="https://css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/01/smooth-scroll.jpg"/>

For a period in the 2010s, **parallax** was a guaranteed way to make your website “cool”. Indeed, Chris Coyier was [**writing about it as far back as 2008**](/css-tricks.com/3d-parralax-background-effect.md).

For those unfamiliar with the concept, parallax is a pattern in which different elements of a webpage move at varying speeds as the user scrolls, creating a three-dimensional, layered appearance. A true parallax effect was once only achievable using JavaScript. However, [<VPIcon icon="iconfont icon-css-tricks"/>scroll-driven animations](https://css-tricks.com/tag/scroll-driven-animation/) have now given us a CSS-only solution, which is free from the main-thread blocking that can plague JavaScript animations.

Parallax may have become a little cliché, but I think it’s worth revisiting with this new CSS feature.

::: note

Scroll-driven animations are available on Chrome, Edge, Opera, and Firefox (behind a feature flag) at the time of writing. Use a supported browser when following this tutorial.

<BaselineStatus featureid="scroll-driven-animations" />

:::

---

## Starting code

In this example, we will apply parallax animations to the background and icons within the three “hero” sections of a universe-themed webpage. We’ll start with some lightly styled markup featuring alternating hero and text sections while including some space-related nonsense as placeholder content.

<CodePen
  user="blakeeric"
  slug-hash="azzXQPr"
  title="Parallax with scroll-driven animation (starting code)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Adding initial animations

Let’s add an animation to the background pattern within each hero section to modify the background position.

```css
@keyframes parallax {
  from {
    background-position: bottom 0px center;
  }
  to {
    background-position: bottom -400px center;
  }
}

section.hero {
  /* previous code */
  animation: parallax 3s linear; /* [!code ++] */
}
```

Here we use the `keyframes` CSS rule to create a start and end position for the background. Then we attach this animation to each of our hero sections using the `animation` property.

By default, CSS animations are duration-based and run when the specified selector is loaded in the DOM. If you refresh your browser, you will see the animation running for three seconds as soon as the page loads.

<VidStack src="youtube/26dV5mgW10k" />

We do not want our animation to be triggered immediately. Instead, we intend to use the page’s scroll position as a reference to calculate the animation’s progress.

Scroll-driven animations provide two new **animation timeline** CSS functions. These additions, [<VPIcon icon="iconfont icon-css-tricks"/>`view()`](https://css-tricks.com/almanac/functions/v/view/) and [<VPIcon icon="iconfont icon-css-tricks"/>`scroll()`](https://css-tricks.com/almanac/functions/s/scroll/), tell the browser what to reference when calculating the progress of a CSS animation. We will use the `view()` function later, but for now, let’s focus on `scroll()`. The [<VPIcon icon="fa-brands fa-firefox" />scroll progress timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll) couples the progression of an animation to the user’s scroll position within a scroll container. Parameters can be included to change the scroll axis and container element, but these are not necessary for our implementation.

Let’s use a scroll progress timeline for our animation:

```css
section.hero {
  /* previous code */
  animation: parallax 3s linear; /* [!code --] */
  animation: parallax linear; /* [!code ++] */
  animation-timeline: scroll(); /* [!code ++] */
}
```

If you refresh the page, you will notice that as you scroll down, the position of the background of each hero section also changes. If you scroll back up, the animation reverses. As a bonus, this CSS animation is handled off the main thread and thus is not subject to blocking by any JavaScript that may be running.

<VidStack src="youtube/lHJgXMvi96I" />

---

## Using the view progress timeline

Now let’s add a new parallax layer by animating the header text and icons within each hero section. This way, the background patterns, headers, and main page content will all appear to scroll at different speeds. We will initially use the `scroll()` CSS function for the animation timeline here as well.

```css
@keyframes float {
  from {
    top: 25%;
  }
  to {
    top: 50%;
  }
}

.hero-content {
  /* previous code */
  position: absolute; /* [!code ++] */
  top: 25%; /* [!code ++] */
  animation: float linear; /* [!code ++] */
  animation-timeline: scroll(); /* [!code ++] */
}
```
<!-- TODO: 이거 되는지 확인 -->

<VidStack src="youtube/Hhb0ytMMj5M" />

That’s not quite right. The animation for the sections further down the page is nearly done by the time they come into view. Luckily, the view animation timeline solves this problem. By setting the [<VPIcon icon="iconfont icon-css-tricks"/>`animation-timeline`](https://css-tricks.com/almanac/properties/a/animation-timeline/) property to `view()`, our animation progresses based on the position of the subject within the scrollport, which is the part of the container that is visible when scrolling. Like the scroll animation timeline, scrolling in reverse will also reverse the animation.

Let’s try changing our animation timeline property for the hero text:

```css
.hero-content {
  /* previous code */
  animation-timeline: scroll(); /* [!code --] */
  animation-timeline: view(); /* [!code ++] */
}
```

That looks pretty good, but there is a problem with the header content flashing into the view when scrolling back up the document. This is because the view timeline is calculated based on the original, pre-animation positioning of the subject element.

<VidStack src="youtube/lclrA2ey0_A" />

We can solve this by adding an `inset` parameter to the `view()` function. This adjusts the size of the container in which the animation will take place. According to [<VPIcon icon="fa-brands fa-firefox" />MDN’s documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view#inset), the “inset is used to determine whether the element is in view which determines the length of the animation timeline. In other words, the animation lasts as long as the element is in the inset-adjusted view.”

So, by using a negative value, we make the container larger than the window and trigger the animation to start a little before and end a little after the subject is visible. This accounts for the fact that the subject moves during the animation.

```css
  animation-timeline: view(); /* [!code --] */
  animation-timeline: view(-100px); /* [!code ++] */
```

Now both the text and background animate smoothly at different speeds.

<CodePen
  user="blakeeric"
  slug-hash="YPPByaw"
  title="Parallax with scroll-driven animation (part 2)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Adjusting animations using animation ranges

So far, we have employed both **scroll** and **view** progress timelines. Let’s look at another way to adjust the start and end timing of the animations using the [<VPIcon icon="fa-brands fa-firefox" />`animation-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range) property. It can be used to modify where along the timeline the animation will start and end.

We’ll start by adding a `view()` timeline animation to the `#spaceship` emoji:

```css
@keyframes launch {
  from {
    transform: translate(-100px, 200px);
  }
  to {
    transform: translate(100px, -100px);
  }
}

#spaceship {
  animation: launch;
  animation-timeline: view();
}
```

Again, we see the emoji returning to its `0%` position once its original unanimated position is outside of the scrollport.

<VidStack src="youtube/w1YbhvwXfx0" />

As discussed before, animations are based on the original pre-animation position of the subject. Previously, we solved this by adding an inset parameter to the `view()` function. We can also adjust the animation range and tell our animation to continue beyond 100% of the animation timeline without having to manipulate the inset of the view timeline itself.

```css
#spaceship {
  animation: launch;
  animation-timeline: view();
+ animation-range: 0% 120%; /* [!code ++] */
}
```

Now the animation continues until we have scrolled an extra 20% beyond the calculated scroll timeline’s normal endpoint.

<VidStack src="youtube/zZPy8XhaFAY" />

Let’s say that we want to add an animation to the `#comet` emoji, but we don’t want it to start animating until it has passed `4rem` from the bottom of the scrollport:

```css
@keyframes rotate {
  from {
    transform: rotate(0deg) translateX(100px);
  }
  to {
    transform: rotate(-70deg) translateX(0px);
  }
}

#comet {
  animation: rotate linear;
  transform-origin: center 125px;
  animation-timeline: view();
  animation-range: 4rem 120%;
}
```

Here we see the “delayed” animation in action:

<VidStack src="youtube/WZncIi4XePU" />

We can also combine animation ranges to run completely different animations at different points within the same timeline! Let’s illustrate this by combining animation ranges for the `#satellite` icon at the top of the page**.** The result is that the first animation runs until the icon passes 80% of the scrollport, then the second animation takes over for the final 20%.

```css
@keyframes orbit-in {
  0% {
    transform: rotate(200deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes orbit-out {
  0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(-50px, -15px);
  }
}

#satellite {
  animation: orbit-in linear, orbit-out ease;
  animation-timeline: view();
  animation-range: 0% 80%, 80% 110%;
}
```

<VidStack src="youtube/gnYJhJDXNWo" />

---

## Fallbacks and accessibility

Our webpage features numerous moving elements that may cause discomfort for some users. Let’s consider accessibility for motion sensitivities and incorporate the [<VPIcon icon="iconfont icon-css-tricks"/>`prefers-reduced-motion`](https://css-tricks.com/almanac/rules/m/media/prefers-reduced-motion/) CSS media feature.

There are two possible values: `no-preference`, and `reduce`. If we want to fine-tune the webpage with animations disabled by default and then enhance each selector with animations and associated styles, then we can use `no-preference` to enable them.

```css
@media (prefers-reduced-motion: no-preference) {
  .my-selector {
    position: relative;
    top: 25%;
    animation: cool-animation linear;
    animation-timeline: scroll(); 
  }
}
```

For us, however, the webpage content and images will still all be visible if we disable all animations simultaneously. This can be done concisely using the `reduce` option. It’s important to note that this sort of blanket approach works for our situation, but you should always consider the impact on your specific users when implementing accessibility features.

```css
@media (prefers-reduced-motion: reduce) {
  .my-selector {
    animation: none !important;
  }
}
```

In addition to considering accessibility, we should also take into account that scroll-driven animations are not supported by all browsers at the time of writing. If we care a lot about users seeing our animations, we can add a polyfill ([<VPIcon icon="fas fa-globe"/>direct link](https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js)) to extend this functionality to currently unsupported browsers. This, however, will force the animation to run on the main thread.

Alternatively, we could decide that performance is important enough to skip the animations on unsupported browsers, thereby keeping the main thread clear. In this case, we can use the `@supports` selector and include the styles only on supported browsers.

Here is the final code with everything, including the polyfill and reduced motion fallback:

<CodePen
  user="blakeeric"
  slug-hash="PwqBPVp"
  title="Parallax with scroll-driven animation part 3"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

There we go, we just re-created a classic web effect with scroll-driven animations using **scroll** and **view** progress timelines. We also discussed some of the parameters that can be used to adjust animation behavior. Whether or not parallax is your thing, I like the idea that we can use a modern approach that is capable of doing what we could before… only better with a dash of progressive enhancement.

### More information

- [**Unleash the Power of Scroll-Driven Animations**](/css-tricks.com/unleash-the-power-of-scroll-driven-animations.md)
- [`animation-timeline`](https://css-tricks.com/almanac/properties/a/animation-timeline/) (CSS-Tricks)

<SiteInfo
  name="CSS scroll-driven animations - CSS | MDN"
  desc="The CSS scroll-driven animations module provides functionality that builds on top of the CSS animations module and Web Animations API. It allows you to animate property values based on a progression along a scroll-based timeline instead of the default time-based document timeline. This means that you can animate an element by scrolling a scrollable element, rather than just by the passing of time."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="Scroll-driven Animations"
  desc="A bunch of demos and tools to show off Scroll-driven Animations"
  url="https://scroll-driven-animations.style/"
  logo="https://scroll-driven-animations.style/favicon.svg"
  preview="https://scroll-driven-animations.style/social.jpg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Bringing Back Parallax With Scroll-Driven CSS Animations",
  "desc": "Parallax is a pattern in which different elements of a webpage move at varying speeds as the user scrolls, creating a three-dimensional, layered appearance. It once required JavaScript. Now we have scroll-driven animations in CSS, which is free from the main-thread blocking that can plague JavaScript animations.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
