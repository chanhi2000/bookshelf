---
lang: en-US
title: "Some practical examples of view transitions to elevate your UI"
description: "Article(s) > Some practical examples of view transitions to elevate your UI"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Some practical examples of view transitions to elevate your UI"
    - property: og:description
      content: "Some practical examples of view transitions to elevate your UI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/some-practical-examples-of-view-transitions-to-elevate-your-ui.html
prev: /programming/css/articles/README.md
date: 2025-11-06
isOriginal: false
author:
  - name: Declan Chidlow
    url : https://piccalil.li/author/declan-chidlow
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/904548af940472e77e572871831a2d00b9389a2aff8ce5eff3f3a32051586a6f/png?url=https://piccalil.li/og/some-practical-examples-of-view-transitions-to-elevate-your-ui/&width=1024&height=526&retina=true
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
  name="Some practical examples of view transitions to elevate your UI"
  desc="Declan Chidlow here with some really practical uses of view transitions, along with some of the stuff that will trip you up, with guidance to help you navigate that."
  url="https://piccalil.li/blog/some-practical-examples-of-view-transitions-to-elevate-your-ui/"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/904548af940472e77e572871831a2d00b9389a2aff8ce5eff3f3a32051586a6f/png?url=https://piccalil.li/og/some-practical-examples-of-view-transitions-to-elevate-your-ui/&width=1024&height=526&retina=true"/>

The aptly named [<VPIcon icon="fa-brands fa-firefox"/>View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) is a powerful way to create animated transitions between two states. I use the word ‘powerful’, because the View Transition API is powerful — more powerful than anyone would expect. You can navigate between pages, or modify the DOM, or meddle with your webpage in a number of other ways, and have an animation between the two states.

It is incredibly powerful, and one could write quite the book (or several) explaining all the features and intricacies. There is plenty of surface-level view transition content on the web, but today we’ll be getting hands-on with some examples. Thus, for the sake of brevity and in the Piccalilli way, I won’t be covering every nuance but instead covering some cases and applicable patterns that you can use to apply view transitions in the real world.

::: note FYI

At the time of writing, the View Transition API has only just reached availability in the latest releases of Firefox, Chrome, and Safari, and even then, not all implementations feature support for all functionality of the API.

:::

In my opinion, the best cases for implementing view transitions are as a way to draw attention to an element, convey movement, and help users remain in context. While we’ve long been able to do animations with CSS and JavaScript, the View Transition API gives us further options. Notably, it handles some of the complexities of animations with many moving parts for us.

The truth is, they’re tricky, and that’s coming from me, the person writing this guide. There are plenty of little gotchas that’ll *getcha*, and it can take a while for it to finally click.

---

## Cross-document transitions

Cross-document transitions are transitions not limited to a single page but which instead go across multiple. Since the inception of the current web browser paradigm, we’ve been largely familiar with documents being separate without the ability to tween between them. If we decide to navigate to, for example, an about page from a landing page, there has historically been no animated transition. Instead we get an instant switching of content.

Thankfully, that is a limitation no longer. You’re likely familiar with using slide deck software like PowerPoint or Keynote, in which you can place a transition between slides to animate between each without a jarring jump while lending a little bit of *pizazz*. That is what cross-document transitions allow you to do natively via the web platform.

All those jazzy transitions between pages you see people do in their SPAs? You can do them with the cross-document functionality of the View Transition API. Of note is that you can currently only do cross-document transitions between same-origin documents (same protocol, hostname, and port), though this may change in the future.

We get started by adding this CSS to all pages we want to transition between. This means the page being transitioned from *and* the page being transitioned to.

```css
@view-transition {
    navigation: auto;
}
```

::: note FYI

The syntax to opt in to view transitions changed a few times during development. You might see some earlier articles and resources mention this meta tag: `<meta name="view-transition" content="same-origin">`.

That meta tag is obsolete and didn’t end up being the final syntax to opt in to view transitions; instead, we just use the above CSS at-rule.

:::

This will apply the default transition between pages — a cross fade. The outgoing content has its opacity reduced from 1 to 0, while the incoming content has its opacity increased from 0 to 1. Now we have fades between pages — which look great — one of my absolute favourite things to do (especially given how easy it is) is to have elements present on both pages animate between the incoming and outgoing page smoothly.

Let’s think about a gallery page, with one page containing an assortment of photos which each link to individual pages which further showcase each photo. With view transitions, we can make the selected photo animate between these two pages by giving them a transition name.

On our gallery page we can start with this simplified markup:

```html
<img src="picture1.avif" style="view-transition-name: image-1" alt="" />
<img src="picture2.avif" style="view-transition-name: image-2" alt="" />
<img src="picture3.avif" style="view-transition-name: image-3" alt="" />
```

::: note

This is just example markup so don’t forget to write alternative text in your real world markup.

:::

And then on our individual photo page we can have the same included:

```html
<h1>A Beautiful Photo</h1>
<img src="picture2.avif" style="view-transition-name: image-2" alt="" />
<p>Taken on a sunny day.</p>
```

The `view-transition-name` allows the browser to identify that both elements are the same and will thus transition between them, as seen here:

<VidStack src="https://iframe.mediadelivery.net/c499299d-fa9c-42a1-9d8a-96e73e8bfab6" />

All this is lovely, but we can take it further by changing the animation of the transition to something other than a fade. We are supplied with two pseudo-elements that we can work with: `::view-transition-old`, which handles the outgoing content, and `::view-transition-new`, which handles the incoming content (there is also `::view-transition-image-pair`, which is a container holding both views).

We can also supply brackets to house a custom identifier for the transition which you can [**read about in Cyd Stumpel’s overview**](/piccalil.li/start-implementing-view-transitions-on-your-websites-today.md). For our purposes doing a full-page transition, we’ll reference the entire page using `root`.

We can do this because browser’s user agent stylesheets define this:

```css
:root {
  view-transition-name: root;
}
```

Let’s leverage these with custom animations to make the new content wipe across the old content — *Star Wars* style.

```css
/* Disable the default fade out effect on the old content */
::view-transition-old(root) {
  animation: none;
}

/* Make new content wipe in from the right */
::view-transition-new(root) {
  animation: wipe-in 0.6s ease-out forwards;
}

/* Animation wiping in the new content */
@keyframes wipe-in {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

The best bit about this simple CSS-based cross-document transition functionality is that it doesn’t do anything on browsers lacking support. The beauty of [**progressive enhancement**](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md)!

---

## Progressive disclosure flows

We’ll start with one of my absolute favourite uses for view transitions in a case that isn’t too different from cross-document transitions: progressive disclosure flows. A common example we see is in login experiences, where we have a page to enter our username/email that then takes us to a page where we enter our password. It is a common pattern used to avoid overwhelming users during multi-step processes.

Unfortunately, it can also be disorienting with an interface jumping between pages. This is where we can use view transitions to achieve spacial coherency between steps.

Here is an example of a basic interface of this nature that we can work through — a checkout.

<CodePen
  user="piccalilli"
  slug-hash="azdOgVq"
  title="Progressive Disclosure Flow Without View Transitions"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s take this demo and modify it to add some view transitions. Unlike the previous examples we took a look at, this isn’t cross-document. This is a single page which we are modifying with JavaScript. As such we’ll be using same-document transitions, not cross-document transitions. This means we don’t need to opt-in with that same CSS at-rule.

We can make the contents of the current step move off to the left when going to the next step to offer a sense of progression, and then build on this interaction to return onto the screen from the left when going back. This helps maintain a spacial continuity, allowing users to remain oriented and subconsciously aware of how steps are relative to each other within the UI. We’ll also add a little fade for some pizazz and keep the animation slow so we can keep up with what is going on — in actual usage, you’d likely want a much faster animation. Remember, except for extenuating circumstances, animations should not slow down users or get in their way.

Our focus is on the `transitionToStep()` function, which we’ll modify to trigger a View Transition:

```js
function transitionToStep(stepNumber) {
  // Check if browser supports the View Transition API
  if (document.startViewTransition) {
    // Add direction class for animation
    document.documentElement.classList.toggle("going-back", isGoingBack);

    document
      .startViewTransition(() => {
        currentStep = stepNumber;
        showStep(currentStep);
      })
      .finished.then(() => {
        // Clean up direction class
        document.documentElement.classList.remove("going-back");
      });
  } else {
    // Fallback for browsers without View Transition API support
    currentStep = stepNumber;
    showStep(currentStep);
  }
}
```

You’ll notice that we’ve kept the original functionality as well in the case that the browser doesn’t support View Transition API. Unlike the purely CSS view transitions, there is no inbuilt graceful degradation or fallback with JavaScript transitions.

<CodePen
  user="piccalilli"
  slug-hash="ZYQGgrM"
  title="Progressive Disclosure Flow With View Transitions"
  :default-tab="['css','result']"
  :theme="dark"/>

Moving between states in a dialog as you’d expect from next/back buttons like this is much less jarring than sudden jumps. This is something that we could do prior to the View Transition API, but which would take a significant amount of work.

You’ll notice in the CSS that I’ve applied `animation-fill-mode: forwards;` to some of the view transitions. This ensures the final keyframe styles are kept after the animation ends, which avoids a slight flicker which can occur. Removing those lines in the demo, you might see the issue when moving forwards and backwards in some browsers.

You’ll also notice this declaration in the CSS:

```css
::view-transition-image-pair(content) {
  overflow: hidden;
}
```

This serves a very particular purpose: avoiding overflows. One thing that *really* infuriates me and consistently trips up me and many others when using the View Transition API is overflowing content. The View Transition API *isn’t* like standard animations, as actively transitioning content can break out of containment and change layers. By putting an overflow on the transition (not the element, as that won’t have any effect), you can deal with this behaviour.

---

## Reordering items in a table

If you have a list that changes, it can be useful to draw attention to what has altered in situations such as automatically updating content or alterations based on user interactions such as filtering or resorting. The obvious way to do so is via animation, which, as well as drawing attention, can visually convey how something changed.

Let’s take a [**beautifully styled table**](/piccalil.li/styling-tables-the-modern-css-way.md) and hook it up with some JavaScript to add/remove rows. We’ll forgo a version without any transitions and hook it up straight away with transitions.

<CodePen
  user="piccalilli"
  slug-hash="gbPaYxe"
  title="Sortable Table With View Transitions"
  :default-tab="['css','result']"
  :theme="dark"/>

You can see by clicking on the headers of the release year and rating columns that the items resort. This is a case of using view transitions in a situation that would require *a lot* of custom animation work to achieve otherwise.

::: note FYI

If you want to study an animation and are using Chrome, you can [<VPIcon icon="fa-brands fa-chrome"/>open the animations panel](https://developer.chrome.com/docs/devtools/css/animations/#open-animations) and slow down the animation. At slower speeds you can analyse exactly what is going on.

:::

We trigger the view transitions in a very similar way to the previous progressive disclosure example, by triggering `document.startViewTransition()` as part of our JavaScript.

The key in this case is that we’ve applied `view-transition-name: match-element;` to our table rows (`tr`) as it would be unrealistic to write a selector for each and every table row to give it a view transition name like so:

```css
tr:nth-child(1) {
  view-transition-name: row-1;
}

tr:nth-child(2) {
  view-transition-name: row-2;
}

/* And so on */
```

Thankfully, `match-element` generates a unique ID based on the element, which saves us from having to go through that rigmarole. Keep in mind that `match-element` doesn’t work for cross-document transitions, and [<VPIcon icon="iconfont icon-caniuse"/>hasn’t landed in Safari or Firefox just yet](https://caniuse.com/mdn-css_properties_view-transition-name_match-element).

---

## Further consideration

I’ve already covered many of the small things that can trip you up in the above examples, but there are plenty more. The View Transition API is a complex system that does take a while for one to wrap their head around. If you’re familiar with the transition features of frameworks, try to set those expectations and preconceptions aside. I found it helpful to think of the View Transitions API as less akin to React/Vue transitions and more like an animated DOM snapshot system.

I did opt to omit motion reduction from the examples in the name of brevity and clarity, but they should absolutely be a consideration in the name of accessibility. You should disable or tone down your transitions in the same manner you would any animation, and you can do so using the exact same methods you would any animation.

Namely, using the `prefers-reduced-motion` media query with CSS:

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}
```

Or the equivalent JavaScript:

```js
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.startViewTransition(() => {
    // Transition
  });
} else {
  // No transition
}
```

Try to scope your transitions to avoid implicating unnecessary elements. It is easy to always reach for `root`, but you should be careful to ensure your transitions are only affecting the elements you intend, lest you make further maintenance more difficult and introduce hard-to-address bugs.

You should also avoid leaving `view-transition-name` properties on elements when they aren’t needed. As we showcased with [cross-document transitions](#cross-document-transitions), the browser will animate between elements with the same view transition name between documents, which may very well not be what we want. By removing transition names when unneeded, we avoid them transitioning when inopportune.

I could continue for weeks with further gotchas, so I’ll restrain myself to quick-firing some off:

- Things can get tricky with some frameworks. Many frameworks like to reinvent the wheel and do their own DOM manipulation shenanigans, which can mess with your transitions. Be wary if trying to use view transitions with frameworks, and consider referring to the specific view transition related documentation that many provide.
- The outgoing UI state cannot be interacted with during transitions, as it is a static snapshot, but the incoming content can be interacted with as it transitions due to it being an interactive DOM region.
- Text transitions, specifically inline-to-block morphs, can be particularly fiddly.
- Dealing with aspect ratios can be an unexpected and unintuitive experience. Jake Archibald has a good post on [<VPIcon icon="fas fa-globe"/>handling aspect ratio changes](https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/) in the context of view transitions.

---

## Wrapping up

The View Transition API, as you’ve seen, is incredibly powerful. What would be impossible or incredibly complex can be done in mere moments — though not without effort. We have very barely tapped the potential of view transitions here, but I hope you’ve gotten a taste of what is possible and the gist of how to make it so.

For further reading, I vehemently recommend [<VPIcon icon="fas fa-globe"/>vtbag](https://vtbag.dev/), which calls itself ‘The Bag of Tricks for View Transitions’. It is an absolute treasure trove. You can also check out [<VPIcon icon="fa-brands fa-chrome"/>this primer from Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/) and MDN’s more technical guide, [<VPIcon icon="fa-brands fa-firefox"/>Using the View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using).

If I may offer a final word of advice, **be reserved with your view transitions**. Much like you’d disorient an audience if every slide of your slide deck had an extravagant transition, the same applies on the web. Show a little restraint, and try to avoid making something *too* gaudy.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Some practical examples of view transitions to elevate your UI",
  "desc": "Declan Chidlow here with some really practical uses of view transitions, along with some of the stuff that will trip you up, with guidance to help you navigate that.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/some-practical-examples-of-view-transitions-to-elevate-your-ui.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
