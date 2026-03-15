---
lang: en-GB
title: "Declarative Dialog Menu with Invoker Commands"
description: "Article(s) > Declarative Dialog Menu with Invoker Commands"
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
      content: "Article(s) > Declarative Dialog Menu with Invoker Commands"
    - property: og:description
      content: "Declarative Dialog Menu with Invoker Commands"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/declarative-dialog-menu-invoker-commands.html
prev: /programming/css/articles/README.md
date: 2026-02-13
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2026-02-12-declarative-dialog-menu-invoker-commands.png
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
  name="Declarative Dialog Menu with Invoker Commands"
  desc="The one where I unpack the new CSS behind my menu"
  url="https://dbushell.com/2026/02/12/declarative-dialog-menu-invoker-commands/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2026-02-12-declarative-dialog-menu-invoker-commands.png"/>

The off-canvas menu — aka *the Hamburger*, if you must — has been hot ever since Jobs’ invented mobile web and Ethan Marcott put a name to [**responsive design**](/alistapart.com/responsive-web-design.md).

---

## My journey

Making an off-canvas menu free from heinous JavaScript has always been possible, but not ideal. I wrote up one technique for [**Smashing Magazine**](/smashingmagazine.com/off-canvas-navigation-for-responsive-website.md) in 2013. Later I explored `<dialog>` in an [**absurdly titled post**](/dbushell.com/css-off-canvas-responsive-navigation-revisited.md) where I used the new [**Popover API**](/frontendmasters.com/using-the-popover-api-for-html-tooltips.md)[^1]

[^1]: A mechanism for top-layer accessible components. Popovers can be implemented declaratively in HTML (yay!) or with JavaScript (boo!)

::: details Sources on 'Popover API'

```component VPCard
{
  "title": "Using the Popover API for HTML Tooltips",
  "desc": "We can *mostly* use HTML alone for this API. But here, we'll use CSS to style the ",
  "link": "/frontendmasters.com/using-the-popover-api-for-html-tooltips.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<SiteInfo
  name="Popover API | 12 Days of Web"
  desc="A declarative way to display elements on top of page content."
  url="https://12daysofweb.dev/2023/popover-api//"
  logo="https://12daysofweb.dev/img/favicon.png"
  preview="https://12daysofweb.dev/img/og/popover-api.png"/>

```component VPCard
{
  "title": "Dialog is for modals, popover is for everything else",
  "desc": "<dialog> and popover are currently the only two ways to access the browser’s top layer. So what’s the difference between them and which one should you use when?",
  "link": "https://mayank.co/notes/popover-vs-dialog//",
  "logo": "https://mayank.co/favicon.ico",
  "background": "rgba(94,81,112,0.2)"
}
```

<SiteInfo
  name="Popover API - Web APIs | MDN"
  desc="The Popover API provides developers with a standard, consistent, flexible mechanism for displaying popover content on top of other page content. Popover content can be controlled either using HTML attributes, or via JavaScript."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

### Current thoughts

I strongly push clients towards a simple, always visible, *flex-box-wrapping* list of links. Not least because leaving the subject unattended leads to a multi-level monstrosity.

I also believe that good design and content strategy should allow users to navigate and complete primary goals without touching the “main menu”. However, I concede that *Hamburgers* are now mainstream UI. Jason Bradberry makes a [**compelling case**](/piccalil.li/in-praise-of-off-screen-menus.md).

---

## My new menu

This month [**I redesigned my website**](/dbushell.com/big-design-and-bold-ideas.md). Taking the menu off-canvas at all breakpoints was a painful decision. I’m still not at peace with it. I don’t like plain icons. To somewhat appease my anguish I added big bold “Menu” text.

The HTML for the button is pure declarative goodness.

```html
<button type="button" commandfor="menu" command="show-modal">
  <span class="visually-hidden">open</span> Menu
</button>
```

::: note Accessibility updates

I originally added the extra “open” for clarity. It was noted that [prefixes can cause issues (<VPIcon icon="fa-brands fa-mastodon"/>`@therealkimblim`)](https://mastodon.coffee/@therealkimblim/116056940408537043) for voice control and that my addition is [<VPIcon icon="fas fa-globe"/>unnecessary](https://c.im/@cwilcox808/116057979742492120) anyway. I removed that from my live site. It was also noted there was [no navigation landmark (<VPIcon icon="fa-brands fa-bluesky"/>`sarasoueidan.com`)](https://bsky.app/profile/sarasoueidan.com/post/3meom3j3ch22v) on the page. This can be solved by wrapping the `<button>` in a `<nav>` element, which I have now done. Thanks for the feedback!

:::

::: note Aside note

[Ana Tudor asked (<VPIcon icon="fa-brands fa-bluesky"/>`anatudor.bsky.social`)](https://bsky.app/profile/anatudor.bsky.social/post/3mdze454wyc25) do we still need all those “visually hidden” styles? I’m using them out of an abundance of caution but my feeling is that Ana is on to something.

:::

The menu HTML is just as clean.

```html
<dialog id="menu">
  <h2 class="hidden">Menu</h2>
  <button type="button" commandfor="menu" command="close">
    Close <span class="visually-hidden">menu</span>
  </button>
  <nav>
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/services/">Services</a></li>
      <li><a href="/about/">About</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li><a href="/notes/">Notes</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
  </nav>
</dialog>
```

It’s that simple! I’ve only removed my opinionated class names I use to [<VPIcon icon="fas fa-globe"/>draw the rest of the owl](https://knowyourmeme.com/memes/how-to-draw-an-owl). I’ll explain more of my style choices later.

This technique uses the wonderful new [<VPIcon icon="fas fa-globe"/>Invoker Command API](https://open-ui.org/components/invokers.explainer/)[^2]

[^2]: Declarative HTML attributes that add interactive behaviour without JavaScript. That’s cheating!

::: details Sources on 'Invoker Command'

```component VPCard
{
  "title": "Invoker Commands (Explainer) | Open UI",
  "desc": "Adding commandfor and command attributes to <button> and elements would allow authors to assign behaviour to buttons in a more accessible and declarative way, while reducing bugs and simplifying the amount of JavaScript pages are required to ship for interactivity. Buttons with command will - when clicked, touched, or enacted via keypress - dispatch a CommandEvent on the element referenced by commandfor, with some default behaviours.",
  "link": "https://open-ui.org/components/invokers.explainer//",
  "logo": "https://open-ui.org/images/favicon-32x32.png",
  "background": "rgba(0,165,79,0.2)"
}
```

<SiteInfo
  name="Invoker Commands API - Web APIs | MDN"
  desc="The Invoker Commands API provides a way to declaratively assign behaviors to buttons, allowing control of interactive elements when the button is enacted (clicked or invoked via a keypress, such as the spacebar or return key)."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

for interactivity. It is similar to the `popover` I mentioned earlier. With a real `<dialog>` we get free focus management and more, as [**Chris Coyier explains**](/frontendmasters.com/whats-the-difference-between-htmls-dialog-element-and-popovers.md). I made a [basic CodePen demo (<VPIcon icon="fa-brands fa-codepen"/>`dbushell`)](https://codepen.io/dbushell/full/KwMrGdd) for the code above.

---

## The JavaScript

So here’s the bad news. Invoker commands are so new they must be polyfilled for old browsers. Good news; you don’t need a hefty script. Feature detection isn’t strictly necessary.

```js
const $menu = document.querySelector("#menu");
for (const $button of document.querySelectorAll('[commandfor="menu"]')) {
  $button.addEventListener("click", (ev) => {
    ev.preventDefault();
    if ($menu.open) $menu.close();
    else $menu.showModal();
  });
}
```

Keith Cirkel has a [more extensive polyfill (<VPIcon icon="iconfont icon-github"/>`keithamus/invokers-polyfill`)](https://github.com/keithamus/invokers-polyfill/) if you need full API coverage like JavaScript events. My basic version overrides the declarative API with the JavaScript API for one specific use case, and the behaviour remains the same.

### WebKit focus, visible?

Let’s get into CSS by starting with my favourite:

```css
:focus-visible {
  outline: 2px solid magenta;
  outline-offset: 2px;
}
```

A strong contrast outline around buttons and links with room to breath. This is not typically visible for pointer events. For other interactions like keyboard navigation it’s visible.

The first button inside the dialog, i.e. “Close (menu)”, is naturally given focus by the browser (focus is ‘trapped’ inside the dialog). In most browsers focus remains invisible for pointer events. [<VPIcon icon="fa-brands fa-safari"/>WebKit has bug.](https://bugs.webkit.org/show_bug.cgi?id=247416) When using `showModal` or invoker commands the `focus-visible` style is visible on the close button for pointer events. This seems wrong, it’s inconsistent, and clients *absolutely rage* at seeing “ugly” focus — seriously, what is their problem?!

I think I’ve found a reliable ‘fix’. **Please do not copy this untested**. From my limited testing with Apple devices and macOS VoiceOver I found no adverse effects. Below I’ve expanded the ‘not open’ condition within the event listener.

```js
if ($menu.open) {
  $menu.close();
} else {
  $menu.showModal();
  if (ev.pointerId > 0) {
    const $active = document.activeElement;
    if ($active.matches(":focus-visible")) {
      $active.blur();
      $active.focus({ focusVisible: false });
    }
  }
}
```

First I confirm the event is relevant. I can’t check for an instance of `PointerEvent` because of the `click` handler. I’d have to listen for keyboard events and that gets murky. Then I check if the focused element has the visible style. If both conditions are true, I remove and reapply focus in a non-visible manner. The `focusVisible` boolean is Safari 18.4 onwards.

::: warning

Like I said: **extreme caution!** But I believe this fixes WebKit’s inconsistency. Feedback is very welcome. I’ll update here if concerns are raised.

:::

### Click to dimiss

Native dialog elements allow us to press the <kbd>ESC</kbd> key to dismiss them. What about clicking the backdrop? We must opt-in to this behaviour with the `closedby="any"` attribute. [<VPIcon icon="fas fa-globe"/>Chris Ferdinandi](https://gomakethings.com/how-to-dismiss-native-html-dialog-elements-when-the-backdrop-is-clicked/) has written about this and the [<VPIcon icon="fas fa-globe"/>JavaScript fallback](https://gomakethings.com/revisiting-how-to-dismiss-native-html-dialog-elements-when-the-backdrop-is-clicked/).

That’s enough JavaScript!

---

## Fancy styles

My menu uses a combination of both basic CSS transitions and cross-document [<VPIcon icon="fas fa-globe"/>view transitions](https://htmx.org/essays/view-transitions/)[^3]

[^3]: Yet another web standard API for animations and transitions. They’ve become exceeding efficient at it.

::: info Sources on 'View Transition'

```component VPCard
{
  "title": "</> htmx ~ Examples ~ View Transitions",
  "desc": "Carson Gross explores the evolution of web applications and the significance of view transitions in improving user experience. He discusses the limitations of traditional web design, where full-page refreshes create an unpleasant experience, and how modern technologies like CSS transitions and the View Transition API aim to enhance aesthetic smoothness. Carson explains how htmx leverages the View Transition API to bring seamless transitions to hypermedia-driven applications, offering an alternative to single-page applications (SPAs) and highlighting its potential once widely available in HTML.",
  "link": "https://htmx.org/essays/view-transitions//",
  "logo": "https://htmx.org/favicon.svg",
  "background": "rgba(91,150,213,0.2)"
}
```

<SiteInfo
  name="View Transition API - Web APIs | MDN"
  desc="The View Transition API provides a mechanism for easily creating animated transitions between different website views. This includes animating between DOM states in a single-page app (SPA), and animating the navigation between documents in a multi-page app (MPA)."
  url="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

. For on-page transitions I use the setup below.

```css
#menu {
  opacity: 0;
  transition:
    opacity 300ms,
    display 300ms allow-discrete,
    overlay 300ms allow-discrete;

  &[open] {
    opacity: 1;
  }
}

@starting-style {
  #menu[open] {
    opacity: 0;
  }
}
```

As an example here I fade opacity in and out. How you choose to use nesting selectors and the `@starting-style` rule is a matter of taste. I like my at-rules top level.

My menu also transitions out when a link is clicked. This does not trigger the closing dialog event. Instead the closing transition is mirrored by a cross-document view transition.

The example below handles the fade out for page transitions.

```css
@view-transition {
  navigation: auto;
}

#menu {
  view-transition-name: --menu;
}

@keyframes --menu-old {
  from { opacity: 1; }
  to { opacity: 0; }
}

::view-transition-old(--menu) {
  animation: --menu-old 300ms ease-out forwards;
}
```

Note that I only transition the **old view state** for the closing menu. The new state is hidden (“off-canvas”). Technically it should be possible to use view transitions to achieve the on-page open and close effects too. I’ve personally found browsers to still be a little janky around view transitions — bugs, or skill issue?

It’s probably best to wrap a media query around transitions.

```css
@media not (prefers-reduced-motion: reduce) {
  /* fancy pants transitions */
}
```

“Reduced” is a significant word. It does not mean “no motion”. That said, I have no idea how to assess what is adequately reduced! No motion is a safe bet… I think?

So there we have it! Declarative dialog menu with invoker commands, topped with a medley of CSS transitions and a sprinkle of almost optional JavaScript. Aren’t modern web standards wonderful, when they work?

::: info

I can’t end this topic without mentioning [<VPIcon icon="fas fa-globe"/>Jim Nielsen’s menu](https://blog.jim-nielsen.com/2025/lots-of-little-html-pages/#example-2-navigation). I won’t spoil the fun, take a look! When I realised how it works, my first reaction was “is that allowed?!” It work’s remarkably well for Jim’s blog. I don’t recall seeing that idea in the wild elsewhere.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Declarative Dialog Menu with Invoker Commands",
  "desc": "The one where I unpack the new CSS behind my menu",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/declarative-dialog-menu-invoker-commands.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
