---
lang: en-US
title: "Start implementing view transitions on your websites today"
description: "Article(s) > Start implementing view transitions on your websites today"
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
      content: "Article(s) > Start implementing view transitions on your websites today"
    - property: og:description
      content: "Start implementing view transitions on your websites today"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/start-implementing-view-transitions-on-your-websites-today/.html
prev: /programming/css/articles/README.md
date: 2025-10-28
isOriginal: false
author:
  - name: Cyd Stumpel
    url : https://piccalil.li/author/cyd-stumpel
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/a9b431b0454aad8eb7ff21ee5c44d7e1712131ee14794c1f1a133435765e3109/png?url=https://piccalil.li/og/start-implementing-view-transitions-on-your-websites-today/&width=1024&height=526&retina=true
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
  name="Start implementing view transitions on your websites today"
  desc="Browser support for view transitions is rocketing and there's not many better out there to help you understand how to implement them than Cyd Stumpel."
  url="https://piccalil.li/blog/start-implementing-view-transitions-on-your-websites-today/"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/a9b431b0454aad8eb7ff21ee5c44d7e1712131ee14794c1f1a133435765e3109/png?url=https://piccalil.li/og/start-implementing-view-transitions-on-your-websites-today/&width=1024&height=526&retina=true"/>

The [<VPIcon icon="fa-brands fa-firefox" />View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) allows us to animate between two states with relative ease. I say relative ease, but view transitions can get quite complicated *fast*.

A view transition can be called in two ways; if you add a tiny bit of CSS, a view transition is initiated on every page change, or you can initiate it manually with JavaScript.

```css
@view-transition {
  navigation: auto;
}
```

SPAs and most frameworks require you to call view transitions for page transitions manually, through JavaScript. If you don’t mess with the browser’s native routing you can use this CSS approach.

```js
if (document.startViewTransition()) {
  document.startViewTransition(() => {
    // If view transitions are supported we call a
    // function encased in a viewTransition
    filterItems()
  })
} else {
  // If view transitions are not supported we still
  // call the filter function
  filterItems()
}
```

When a view transition is initiated it creates two snapshots; one of the current state, and one the future state. The view transition then compares the position, sizing and rotation of the two snapshots and, finally creates a keyframe animation. It’s pretty much how the [<VPIcon icon="fas fa-globe"/>FLIP](https://aerotwist.com/blog/flip-your-animations/) animation technique works, but CSS does all the heavy lifting, even if JavaScript initiates the view transition.

Those snapshots end up in a view transition pseudo element, and by default only a snapshot of the root (HTML) element is created, but you can add more items to the pseudo element by adding `view-transition-name`s to elements.

---

## Anatomy of a view transition

```text
::view-transition
  ::view-transition-group(root)
    ::view-transition-image-pair(root)
      ::view-transition-old(root)
      ::view-transition-new(root)
```

Every named view transition gets its own group. Every group has a view-transition-image-pair *and* a view-transition-old and/or view-transition-new pseudo element.

- The view transition group is where the custom matrix animation is added to animate to the new state’s position, rotation and size.
- The view transition image pair is used to isolate the mix-blend-mode animation that’s on the `view-transition-old` and `view-transition-new` states by default.
- The `view-transition-old` and `view-transition-new` states represent the old and new state of the named element.

The snapshots are no longer HTML because it’s a non interactive snapshot of the element as it *was* when it was captured by the initiation of the view transition. Adding CSS to the view transition selector to change font size or colour, for example, or trying to change the content with JavaScript during the view transition doesn’t work.

---

## Debugging view transitions

You can debug your view transitions with the Animations Drawer in the Chrome Dev Tools, this drawer allows you to slow down animations and even to pause animations, which really gives you some time to inspect what’s going on.

Use <kbd>CMD</kbd>+<kbd>Shift</kbd>+<kbd>p</kbd> in the dev tools and type animations to open up the Animations Drawer. For Windows users, switch <kbd>CMD</kbd> with <kbd>CTRL</kbd>.

![The animations drawer as described above](https://piccalilli.imgix.net/images/blog/vt-debugger.png?auto=format&w=1500)

---

## Unique view transition names and match-element

Adding an element to the view transition pseudo element is easy: give it a unique name with `view-transition-name`.

For [<VPIcon icon="fa-brands fa-chrome"/>Same Document View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/same-document) you can set the view-transition name to `match-element`, but if you animate between pages you have to manually add unique view transition names to the elements on both pages.

---

## Setting up your project for view transitions

View transitions can be used to animate filtering, sorting, add to cart, page transitions, and much more, but when you start doing multiple view transitions triggered by different elements and different user interactions, it’s going to be hard to see the forest through the trees.

View Transition Types are the answer here, you can add types through JavaScript when you call a view transition:

```js
if (document.startViewTransition) {
  document.startViewTransition({
    update: () => filterItems(),
    types: ['filter']
  })
} else {
  filterItems()
}
```

::: note

I recently found out that the first Chrome versions that supported view transitions, do not support View Transition Types which breaks the entire view transition 🥲. Bramus van Damme sent me this [<VPIcon icon="fa-brands fa-chrome"/>try-catch function](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#not-a-polyfill) you could use to catch that. But you could also opt to use data attributes on the HTML tag instead.

:::

The types are added as a pseudo-class `:active-view-transition-type(filter)` that you can use to encase your specific styles for that interaction. This is very helpful if you want to have different animations on filter and page transition for example.

For specific page transitions between overview and detail pages we can also add a view transition type, but it’s a little more complicated because we currently need to use JavaScript to watch for the `pagereveal` event and check the from and entry url. Page reveal is called when a user navigates to a new page.

::: note

A little bird told we might be able to do this directly from CSS soon!

:::

```js :collapsed-lines
window.addEventListener('pagereveal', async (e) => {
  if (e.viewTransition) {
      // set a default transition type, you could also leave this empty
    let transitionType = 'normal'
    // check if navigation activation is defined and use it to get
    // from and to url:
    if (navigation?.activation?.from && navigation?.activation?.entry) {
      transitionType = determineTransitionType(navigation.activation.from, navigation.activation.entry)
    }
    e.viewTransition.types.add(transitionType)
  }
})

const determineTransitionType = (from, to) => {
  const currentUrl = from?.url ? new URL(from.url) : null
  const targetUrl = new URL(to.url)
  // get paths:
  let currentPath = currentUrl.pathname
  let targetPath = targetUrl.pathname
    const fromType = getPageType(currentPath)
    const toType = getPageType(targetPath)
    return `${fromType}-to-${toType}`
}

const getPageType = (path) => {
    // remove first /
  path = path.replace('/', '')
  // Split path into segments (/blog/view-transitions would be
  // split in 'blog' and 'view-transitions' f.e.)
  const segments = path.split('/')
  const [firstSegment, secondSegment] = segments

  switch (firstSegment) {
    case '':
      return 'home'
    case 'work':
    case 'blog':
      return secondSegment
        ? `${firstSegment}-detail`
        : `${firstSegment}-overview`
    default:
      return 'normal'
  }
}
```

Going from `/work/` to `/work/piccalilli` would return `work-overview-to-work-detail` as a view transition type.

---

## Good defaults and best practices

::: tip

View transitions run on CSS keyframes, adding some default styling can make your animations more sturdy.

```css
::view-transition-group(*),
::view-transition-old(*),
::view-transition-new(*) {
    animation-duration: 0.6s;
    animation-fill-mode: forwards; /* important if you mix durations */
    animation-timing-function: var(--default-ease);
}
```

:::

This will give your animations the same base duration, fill mode and ease.

::: tip

Use [<VPIcon icon="fa-brands fa-firefox" />`view-transition-class`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-class) to be able to style multiple items at once, and set all custom animations **without** using the `animation` shorthand so you don’t override any of your defaults without meaning to.

```css
::view-transition-old(.work-item) {
    /* animation: scale-out 0.4s; < 👎 this will override
       your fill-mode and ease */
    animation-name: scale-out;
    animation-duration: 0.4s;
}
```

:::

::: tip Tips

While a long animation might *look* cool, it will probably be very annoying to your users because the page will be blocked from interaction until the full animation is done.

Also, set your unique view transition names inline on your HTML with a CSS variable.

```html
<article class="work-item" style="--vt: work-item-1">
    <!-- [...] -->
</article>
```

```css
.work-item {
    @media (prefers-reduced-motion: no-preference) {
        view-transition-name: var(--vt);
    }
    view-transition-class: work-item;
}
```

This approach has several advantages:

- It’s easier to create unique view transition names, especially if you’re using a CMS or framework, using an id or index value in the name.
- It keeps your HTML from looking like a framework boilerplate like Tailwind because `--vt` is nice and short
- If you have multiple view transition types you can conditionally add the items to the pseudo element easier.

```css
html:active-view-transition-type(filter) {
  .work-item {
    @media (prefers-reduced-motion: no-preference) {
      view-transition-name: var(--vt);
    }
    view-transition-class: work-item;
  }
}
```

- If you want to add all view transition names at once you can use an attribute selector:

```css
[style*="--vt"] {
  @media (prefers-reduced-motion: no-preference) {
    view-transition-name: var(--vt);
  }
}
```

:::

::: note FYI

Users with vestibular disorders can get sick from all of that slick movement on your website, so make sure you’re mindful of that.

:::

The best thing to do is encase all your `view-transition-name` declarations in a [<VPIcon icon="fa-brands fa-firefox" />prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query set to `no-preference` which will default all view-transitions back to just cross-fading the root element.

```css
@media (prefers-reduced-motion: no-preference) {
  view-transition-name: var(--vt);
}
```

---

## Taking full advantage of the View Transition API

As I mentioned earlier, view transition groups consist of a `view-transition-image-pair` which has either `view-transition-old`, `view-transition-new` or both. Whether there is an old and/or a new state depends on if the named view-transition element exists in the old state and the new state.

In practice this means that for animations that change the order, like sorting, items will have an old and a new state, because they exist in the old state **and** the new state.

<VidStack src="https://iframe.mediadelivery.net/e629e4aa-df9e-4c80-89d0-8f4c3ea50a86" />

During the view transition, by default, the `view-transition-old` pseudo element crossfades into the `view-transition-new` state, represented by the red and green rectangle respectively.

If you filter items out, those items will only have a `view-transition-old` state because they do not exist in the new state:

<VidStack src="youtube/blob:https://iframe.mediadelivery.net/5c1c90d9-6b90-4240-94ae-3fc9a714b9a8" />

In the same way, if filters add items back in, they will only have a `view-transition-new` state because they did not exist in the old state:

<VidStack src="blob:https://iframe.mediadelivery.net/cd97cc36-35c4-447e-9d3c-c502fe707ff1" />

With CSS we can check if `view-transition-old` or `view-transition-new` is an only child using the `:only-child` pseudo-class, allowing us to create in-and-out animations for them.

```css
::view-transition-old(work-item):only-child {
    animation-name: animate-out;
    animation-duration: 0.3s;
}

::view-transition-new(work-item):only-child {
    animation-name: animate-in;
    animation-duration: 0.3s;
}
```

Try out this demo. When you apply sorting, the in-and-out animations are not triggered but when you filter they are!

<CodePen
  user="Sidstumple"
  slug-hash="ByyJqmy"
  title="View transitions sorting and filtering"
  :default-tab="['css','result']"
  :theme="dark"/>

This is pretty cool for filtering, but also when you want to transition from an overview to a detail page or back like I did [<VPIcon icon="fas fa-globe"/>for this website I created](https://cydstumpel.github.io/view-transitions/css-day/) for my [<VPIcon icon="fas fa-globe"/>CSS Day Talk](https://conffab.com/presentation/css-tried-to-come-for-my-job-a-practical-guide-to-view-transitions-for-creative-developers/?gl=T4jnT1uwe51o). In this talk I also mentioned we’re currently not able to use `:has` to check if a group has both view-transition-old and -new elements, because this would allow us to set a higher `z-index` on items that have both, and push them in front of the other elements. But complaining on a stage helps because that’s now [been added as an issue (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/12630)!

### Browser compatibility

With the release of Firefox 144, the View Transition API has now been implemented in all the ‘big browsers’ 🥳.

Unfortunately, though, Firefox currently only supports same-document view transitions, not transitions between pages (also known cross-document view transitions).

If you want to follow along when they **will** support that, you can check [<VPIcon icon="fa-brands fa-firefox" />MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition) or this handy CodePen that the Chrome team created.

<CodePen
  user="piccalilli"
  slug-hash="EaPbbgx"
  title="View Transitions Feature Explorer"
  :default-tab="['css','result']"
  :theme="dark"/>

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Start implementing view transitions on your websites today",
  "desc": "Browser support for view transitions is rocketing and there's not many better out there to help you understand how to implement them than Cyd Stumpel.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/start-implementing-view-transitions-on-your-websites-today.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
