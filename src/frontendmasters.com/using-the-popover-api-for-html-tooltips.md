---
lang: en-US
title: "Using the Popover API for HTML Tooltips"
description: "Article(s) > Using the Popover API for HTML Tooltips"
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
      content: "Article(s) > Using the Popover API for HTML Tooltips"
    - property: og:description
      content: "Using the Popover API for HTML Tooltips"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/using-the-popover-api-for-html-tooltips.html
prev: /programming/css/articles/README.md
date: 2024-05-06
isOriginal: false
author:
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2027
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Using the Popover API for HTML Tooltips"
  desc="We can *mostly* use HTML alone for this API. But here, we'll use CSS to style the "
  url="https://frontendmasters.com/blog/using-the-popover-api-for-html-tooltips/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2027"/>

Can it be done? This plucky front-end developer intends to find out.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/CleanShot-2024-05-06-at-08.57.55%402x.png?resize=1024%2C633&ssl=1)

Can we do it?

[We looked at the Popover API](https://frontendmasters.com/blog/popover-api-is-here/) and how it’s made it’s way across all browsers already just last week. One of the things I *should* have done is looked at the accessibility considerations more closely. Thanks to Melanie Sumner there is [a great explainer with demos (<VPIcon icon="fa-brands fa-codepen" />`melsumner`)](https://codepen.io/melsumner/pen/VwNmYLY). I tried to adhere to the points made in there the best I could while making a classic tooltips experience, and we’ll do a bit of a review at the end where deviations happened.

::: info Article Series

```component VPCard
{
  "title": "Using the Popover API for HTML Tooltips",
  "desc": "We can *mostly* use HTML alone for this API. But here, we'll use CSS to style the ",
  "link": "/frontendmasters.com/using-the-popover-api-for-html-tooltips.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

2. [**Footnotes Progressively Enhanced to Popovers**](/frontendmasters.com/footnotes-progressively-enhanced-to-popovers.md)
3. [**Popovers Work Pretty Nicely as Slide-Out Drawers**](/frontendmasters.com/popovers-work-pretty-nicely-as-slide-out-drawers.md)

:::

---

## Starting With HTML

This is actually my favorite part, as remember, this API can be used *entirely* in HTML. That rules. Remember when we got `<details>` where you could build an interactive open/close disclosure widget thing with just HTML? That also rules, but this is even cooler.

One small weirdness though, it only works in HTML alone when a `<button>` is the “invoker” of opening the popup. So in the case of a *tooltip*, that button might come right in the middle of a sentence like.

```html
<p>
   This blog post was written by 
   <button popovertarget="popover-chris-coyier">
     Chris Coyier
   </button>
   the genius.
</p>
```

Then elsewhere in the DOM (the location of which doesn’t effect the core functionality):

```html
<div id="popover-chris-coyier" popover role="tooltip">
  <img src="/images/chris.jpg" alt="A portrait of Chris Coyier in a tuxedo." width="100" height="100">
  <h4>Chris Coyier</h4>
  <p>Handsome fella.</p>
</div>
```

Note I’m calling this an *HTML* Tooltip, because what pops up isn’t text alone, which you might argue can be done with the `title` attribute. These popovers are far more flexible, allowing you to style them and can contain anything HTML can.

The weird part here is the button smack in the middle of the paragraph. That’ll be a bit awkward styling-wise, but that’s surmountable. Mostly I don’t know if that’s “cool” screen-reader wise. So if someone know’s, feel free to chime in. If it’s *not* cool, we might have to think about using a different element that is cool and relying on JavaScript to invoke the popup.

---

## The Basic CSS

I say basic, because we cannot to tooltip-like styling in CSS for these yet. That is, we cannot position them next to the button that invoked them. We’ll get that, someday, when we can use the [<VPIcon icon="fa-brands fa-chrome"/>Anchor Positioning API](https://developer.chrome.com/blog/tether-elements-to-each-other-with-css-anchor-positioning).

But we can do everything else that we want in terms of styling.

For one thing, let’s make the the middle-of-text look of the button look like something you can click. That’s something Melanie pointed out as a requirement. Rather than just being blue and underlined like a normal link, I’ll add an icon so it indicates slightly different behavior. We also need to *un*do basic button styling so the button looks more like just some text. I usually have a class for that I call “text-like”. So:

```css :collapsed-lines
button[popovertarget].text-like {
  border: 0;
  background: none;
  font: inherit;
  display: inline-block;

  color: #1e88e5;
  text-decoration-style: dashed;
  text-decoration-line: underline;
  text-decoration-color: #42a5f5;
  text-underline-offset: 2px;
  overflow: visible;
  

  padding: 0 1.1rem 0 0; /* space for icon */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='100' title='question-circle'%3E%3Cpath fill='%231e88e5' d='M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z' /%3E%3C/svg%3E");
  background-size: 0.8em;
  background-repeat: no-repeat;
  background-position: center right 1px;

  &:focus,
  &:hover {
    text-decoration-color: lightblue;
    text-decoration-style: solid;
  }
}
```

That leads to a within-paragraph look like this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/Screenshot-2024-05-06-at-8.30.13%E2%80%AFAM.png?resize=1024%2C265&ssl=1)

Then if we apply some super basic styling to the `[popover]` element itself, we can get a popover opening exactly in the middle of the page like this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/Screenshot-2024-05-06-at-8.33.46%E2%80%AFAM.png?resize=1024%2C921&ssl=1)

A couple of notes here:

- I did *not* use any `::backdrop` styling to style the rest of the page behind the popover. I feel like that may be a bit of an anti-pattern if using for tooltips. I don’t see any need to mess with the rest of the page when a tooltip is open.
- I wanted to use flexbox on the popup, but that caused an issue, because `display: flex;` overrides the default `display: none;` of the popup, making it visible all the time. Instead, you can use `[popover]:popover-open { }` to apply it only when the popover is open. Or use an internal wrapper or whatever.

---

## The Functional JavaScript

We need JavaScript here for two jobs:

1. Normal tooltip behavior suggests you should be able to hover over an element and the tooltip will appear. That cannot be done in HTML alone. Maybe it could be done in CSS somehow with an animation delay or something, but it’s likely a bit more straightforward in JavaScript.
2. Again, CSS doesn’t have anchor positioning yet, so we’ll do positioning with JavaScript.

These are both progressive enhancements, which is nice. So if either thing fails, the tooltip should still work.

### The Hover Delay

For the delay, we’ll start a timer when the mouse cursor enters a button that opens a popup, if the timer finishes, we’ll open it. If the mouse cursor leaves before the timeout, we’ll clear that timeout:

```js
const popoverButtons = document.querySelectorAll(
  "button[popovertarget]"
);

popoverButtons.forEach((button) => {
  let timeout = 0;
  button.addEventListener("mouseenter", () => {
    const target = button.getAttribute("popovertarget");
    const popover = document.querySelector("#" + target);
    // delay opening
    timeout = setTimeout(() => {
      popover.showPopover();
    }, 1500);
  });

  button.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
  });
});
```

### The Positioning

I went for a library called [<VPIcon icon="fas fa-globe"/>Floating UI](https://floating-ui.com/) to do this. I came across it the other day while using a library called [<VPIcon icon="fas fa-globe"/>Shepherd JS](https://shepherdjs.dev/) for creating tours ([<VPIcon icon="fa-brands fa-codepen"/>example](https://codepen.io/pen?welcome=true)). Shepherd uses it for positioning the steps of the tour, which are usually not far away from what an HTML tooltip might look like.

The `.showPopover()` API is what opens the popup, so the trick is positioning it as it is being opened.

```js{9-17}
popoverButtons.forEach((button) => {
  let timeout = 0;
  button.addEventListener("mouseenter", () => {
    const target = button.getAttribute("popovertarget");
    const popover = document.querySelector("#" + target);
    // delay opening
    timeout = setTimeout(() => {
      popover.showPopover();
      computePosition(button, popover, {
        placement: "top",
        middleware: [flip(), shift({ padding: 5 }), offset(6)]
      }).then(({ x, y }) => {
        Object.assign(popover.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }, 1500);
  });

  button.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
    button.removeAttribute("style");
  });
});
```

All that `computePosition` stuff with the `middleware` is just how Floating UI works. The `flip()` function is especially nice, which is essentially “edge detection”. Now the popover will attempt to be positioned on top like this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/Screenshot-2024-05-06-at-8.47.28%E2%80%AFAM.png?resize=1024%2C858&ssl=1)

But if there is no room on top, because that’s where the edge of the browser window is, it will “flip” to the bottom like this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/Screenshot-2024-05-06-at-8.48.54%E2%80%AFAM.png?resize=1024%2C937&ssl=1)

Nice.

::: info Demo

<CodePen
  user="anon"
  slug-hash="rNbXNeg"
  title="Popover API Tooltips with Positioning"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

::: note Review

- ✅ The links that open popups looks like that’s probably what they will do.
- ✅ The links the trigger the popups work. They can be clicked to open (and close) the popup. JavaScript provides a hover-to-open effect as well, mimicking `title` behavior.
- 🤷‍♀️ Unsure if a `<button>` in the middle of a `<p>` where the text is part of the sentence is acceptable from an accessibility perspective.
- 🤷‍♀️ Unsure where the perfect DOM Positioning of the popup would be. My gut tells me to treat it like a footnote, putting them at the end of the main content they apply to. This seems like it would matter quite a bit for something like syndication/RSS where they might just appear as additional paragraphs without context. Or possibly right after the text element that has the popup so they are closer contextually.
- 🤷‍♀️ I would probably always use `popover="hint"` to allow for multiple popovers to be open at once in a tooltip scenario,  but it’s unclear if that will happen or if that will be the naming.

:::

::: info Article Series

```component VPCard
{
  "title": "Using the Popover API for HTML Tooltips",
  "desc": "We can *mostly* use HTML alone for this API. But here, we'll use CSS to style the ",
  "link": "/frontendmasters.com/using-the-popover-api-for-html-tooltips.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

2. [**Footnotes Progressively Enhanced to Popovers**](/frontendmasters.com/footnotes-progressively-enhanced-to-popovers.md)
3. [**Popovers Work Pretty Nicely as Slide-Out Drawers**](/frontendmasters.com/popovers-work-pretty-nicely-as-slide-out-drawers.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using the Popover API for HTML Tooltips",
  "desc": "We can *mostly* use HTML alone for this API. But here, we'll use CSS to style the ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/using-the-popover-api-for-html-tooltips.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
