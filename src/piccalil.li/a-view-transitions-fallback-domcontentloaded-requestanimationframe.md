---
lang: en-US
title: "A view transitions fallback: DOMContentLoaded + requestAnimationFrame()"
description: "Article(s) > A view transitions fallback: DOMContentLoaded + requestAnimationFrame()"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A view transitions fallback: DOMContentLoaded + requestAnimationFrame()"
    - property: og:description
      content: "A view transitions fallback: DOMContentLoaded + requestAnimationFrame()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/a-view-transitions-fallback-domcontentloaded-requestanimationframe.html
prev: /programming/css/articles/README.md
date: 2025-12-05
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url : https://piccalil.li/author/sunkanmi-fafowora
cover: https://piccalil.b-cdn.net/api/og-image?slug=a-view-transitions-fallback-domcontentloaded-requestanimationframe/
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
  name="A view transitions fallback: DOMContentLoaded + requestAnimationFrame()"
  desc="Look, we get it, your boss wants everything to work the same in every browser. We're all about progressive enhancement here but we know a lot of organisations don’t like working like that, so Sunkanmi is here to help you navigate implementing view transitions with that in mind."
  url="https://piccalil.li/blog/a-view-transitions-fallback-domcontentloaded-requestanimationframe"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=a-view-transitions-fallback-domcontentloaded-requestanimationframe/"/>

View transitions came out in [<VPIcon icon="fa-brands fa-chrome"/>2023, with Chrome announcing support for it in CSS](https://developer.chrome.com/blog/view-transitions-case-studies). In the past, it was difficult to implement this strategy (and it still can be). Thankfully, view transitions can be performed with a couple of instructions in CSS. [**Cyd wrote a great beginner’s guide**](/piccalil.li/start-implementing-view-transitions-on-your-websites-today.md) to get you up to speed so I recommend you read that first if this is your first rodeo with view transitions.

https://iframe.mediadelivery.net/embed/468647/53975853-6013-4cdf-8694-b8aa50e8f3e2?autoplay=true&loop=true&muted=false&preload=true&responsive=true

The video above shows the smooth transition between home, about, and services. How am I doing this? I’m using the `@view-transition` at-rule, the `view-transition-name` property along with `::view-transition-old()` and `::view-transition-new()` pseudo-elements on each of the pages, making sure it transitions between page to page, but it’s best I show you the code:

```css :collapsed-lines
@view-transition {
  navigation: auto;
}

nav a.active {
  background: #ffffff;
  color: #f5576c;
  view-transition-name: active-link;
}

h1 {
  color: #ffffff;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  view-transition-name: page-title;
}

::view-transition-old(page-title),
::view-transition-new(page-title) {
  animation-duration: 0.8s;
}

::view-transition-old(active-link) {
  animation: 0.6s ease-out both fade-out;
}

::view-transition-new(active-link) {
  animation: 0.6s ease-out both fade-in;
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}
```

Notice how we used the [<VPIcon icon="fa-brands fa-firefox"/>`@view-transition` at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition)? This allows cross-page navigation from all pages, including *Home*, *About*, *Services* and *Contact*. The elements we wanted to apply our transitions to were on the anchor element `a` *only* when it’s active and the `h1` element. We gave both of them a view transition name using `view-transition-name` property, and these names were then used in the `::view-transition-old()` and `::view-transition-new()` properties with an animation for them both.

In fact, the only difference between the two animations we used for when they transition between pages is just the milliseconds with `active-link` being 600ms for the anchor elements and `page-title` being for just 800 milliseconds.

::: note Check it out

You can see the demo in your browser [<VPIcon icon="fas fa-globe"/>here](https://merry-crostata-2cc36b.netlify.app/).

```component VPCard
{
  "title": "Home - View Transitions with Fallback",
  "desc": "",
  "link": "https://merry-crostata-2cc36b.netlify.app",
  "logo": "https://merry-crostata-2cc36b.netlify.app/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Pretty simple, right? That’s right. It’s that easy to set up view transitions on your web pages with the [<VPIcon icon="fa-brands fa-firefox"/>View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API).

Now, what if you want to implement fallbacks for older browsers and browsers that don’t support the View Transitions API? Well, that’s where this article comes in. In this article, we will implement a simple view transition fallback using the `DOMContentLoaded` + `requestAnimationFrame()`

---

## Using existing APIs as the fallback

There is one method I discovered during my research that you can use as a fallback for the View Transitions API, and this is the [<VPIcon icon="fa-brands fa-firefox"/>`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) + [<VPIcon icon="fa-brands fa-firefox"/>`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) .

This particular event fires a specific function once the HTML content and deferred scripts, such as `<script defer src="" ../>` or `<script type="module"/>` have been parsed. Using this method allows us to control what happens when our HTML content is parsed and loaded, but the goal here is to transition from one page, right?

That’s where the `requestAnimationFrame()` comes in. The `requestAnimationFrame()` function instructs the browser that you wish to perform an animation, and in our case, the animation starts once our HTML content has been loaded using `DOMContentLoad` on the `document` object.

We’re going to be focusing on a simple demo to illustrate this, or this article would be exceedingly long. A challenge from me to you is to see if you can expand your learning into something higher fidelity like the original demo.

Let me show you the code:

### HTML

```html title="index.html"
<header class="reveal">
  <h1 class="reveal">My demo site</h1>
  <p>Try navigating to About. This uses a pure JS/CSS fallback transition.</p>
</header>

<main class="card reveal" id="mainCard">
  <p>Welcome to the index page.</p>
  <a href="about.html">Go to About</a><br>
</main>
```

In our <VPIcon icon="fa-brands fa-html5"/>`index.html` page, our HTML is pretty simple and I’ll start with the important stuff.

First, we create a `<h1>` in the `<header>` tag with a short paragraph (`<p>`). This is important because in this demo, we’re going to transition to-and-fro, from one page to another, and the `<h1>` would have a little animation, so we’re going to give the `<header>` and `<h1>` tags a `.reveal` class. We’re also going to give use the `.reveal` class on the `<main>` tag as well. The reason for this is that these are the targeted elements for page transitions.

Inside our `<main>`, we have a welcome text and links to the <VPIcon icon="fa-brands fa-html5"/>`about.html` page. This is important because, where do we want to route to if not? 🤷🏾‍♂️

For our <VPIcon icon="fa-brands fa-html5"/>`about.html` page, we have something quite similar.

```html title="about.html"
<a class="reveal" href="index.html">◀ Back</a>

<section class="reveal" id="panel">
  <h2>About this demo</h2>
  <p>This page demonstrates the lightweight fallback animation system without pagereveal or the View Transitions API.</p>
</section>
```

The `.reveal` class is applied to both the anchor tag (`<a>`) and the section tag (`<section>`). We have a little `<h2>` and `<p>` tag there too, but let’s just acknowledge those and move on for now..

Let’s head to the CSS section, where it’s the most fun (bias alert).

### CSS

One thing I love about CSS is its ever-evolving nature; however, CSS evolving at a good and steady pace can make it hard for major and old browsers to catch up to its speed. That’s why we have our transitions here to — in essence — *replace* our view transitions, *just in case* the browser doesn’t support them. I’m pasting the whole CSS section because, well, it ain’t much at all.

```css :collapsed-lines
/* Leave this commented for now */
/* @view-transition {
  navigation: auto;
} */

body {
  font-family: system-ui, Arial;
  padding: 3rem;
  color: black;
}

/* links */
a {
  display: inline-block;
  margin: .5rem 0;
}

/* card + header styling */
header {
  margin-bottom: 2rem;
  transition: all .45s ease;
}

.card {
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0 0 0 / 0.06);
  background: #fffff;
  width: 320px;
}

/* Incoming animation  */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: all .8s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Outgoing animation */
html.leaving .reveal {
  opacity: 0;
  transform: translateY(-12px);
  transition: all .8s ease;
}
```

What’s important is actually these specific lines of code:

```css
/* Leave this for now */
/* @view-transition {
  navigation: auto;
} */

/* Incoming animation  */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: all .8s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Outgoing animation */
html.leaving .reveal {
  opacity: 0;
  transform: translateY(-12px);
  transition: all .8s ease;
}
```

I commented out the lines for our `@view-transition` block because I don’t want it to work right now. Let’s focus on the fallback first.

Before that, what happens when JS fails, though? That’s where [**progressive enhancement**](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md) comes in, and it’s a technique we can use to ensure works for everyone by adding a class that nullifies every animation, delivering a more standard page transition (instant), just in case JS fails.

Add a `.default` CSS class just above the `.reveal` class that nullifies the animation and just keeps everything static:

```css
.default {
  opacity: 1;
  transform: translateY(0);
  transition: all .8s ease;
}

/* Incoming animation  */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: all .8s ease;
}
```

And make sure to add the `.default` CSS class to all your HTML elements that have `.reveal` right before `.reveal` :

```html title="index.html"
<a class="default reveal" href="index.html">◀ Back</a> // HIGHTLIGHT 5

<section class="reveal" id="panel"> // HIGHLIGHT 5
  <h2>About this demo</h2>
  <p>This page demonstrates the lightweight fallback animation system without pagereveal or the View Transitions API.</p>
</section>
```

```html title="about.html"
<header class="default reveal">
  <h1 class="reveal">My demo site</h1>
  <p>Try navigating to About. This uses a pure JS/CSS fallback transition.</p>
</header>

<main class="default card reveal" id="mainCard">
  <p>Welcome to the index page.</p>
  <a href="about.html">Go to About</a><br>
</main>
```

Now, back to our fallback. Notice how the `.reveal` class has an opacity value of `0` , translates 12 pixels on the Y-axis, and has a transition on it? Well, that’s because we want the initial state to be just that. Then, we apply the `.visible` class to have an `opacity` of `1` and it translates back to 0 pixels on the Y-axis.

That way, when the element reveal class is applied at load time, it animates to-and-fro from 12 pixels on the Y-axis of the screen to 0. Lastly, we have the `.leaving` class on the `html` root element when the `.reveal` class is toggled on the element to set the `opacity` back to `0` and have the whole HTML children translate -12 pixels on the Y-axis when it’s leaving. If not, it would look like this:

Stale at a point, right? Particularly when loading the next page. That’s what we’re trying to avoid. The animation should flow smoothly and not like we forced animations to the page. Now, the icing on our CSS cake is our JavaScript, which handles the hard logic to make this all work; in fact, it’s why we’re here in the first place.

### JavaScript

The JavaScript is pretty straightforward:

```js :collapsed-lines
(function () {
  document.querySelectorAll(".default").forEach(el => {
    el.classList.remove("default");
  });
  
  const allAnchors = document.querySelectorAll("a");

  allAnchors.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
    
      // stop default link behavior
      e.preventDefault();
      
      // let animation begin, then navigate
      document.documentElement.classList.add("leaving");
      
      setTimeout(() => {
        window.location.href = anchor.href;
      }, 250);
    });
  });

  // incoming animation (DOMContentLoaded + rAF)
  function reveal() {
    const els = document.querySelectorAll(".reveal");
    
    requestAnimationFrame(() => {
      els.forEach(el => el.classList.add("visible"));
    });
  }

  document.addEventListener("DOMContentLoaded", reveal, { once: true });
})();
```

Now, let’s break down this super-simple method using `DOMContentLoaded` & `requestAnimationFrame` . We first remove the `.default` class once JS loads because we don’t need that anymore and listen for a `click` event on all the anchor tags (`<a>`) using the `addEventListener()` function, get the anchor element using `anchor` variable and prevent its default behaviour using the `preventDefault()` function.

This is where it gets interesting.

You know how we need the page to have an exit animation? Well, that’s where the next line of code comes in:

```js
document.documentElement.classList.add("leaving");
```

This line of code adds the `leaving` class to the `html` element when it is leaving for another page, which gives off the illusion of a transition, then we only tell the window where the link is going after 250 milliseconds. The reason for this delay is that we want the exit animation to play out fully before the next page loads. In fact, without this, the document would not load.

This isn’t a perfect solution, *to be honest*, but it’s worth having in case your browser doesn’t support view transitions, so users who lack it would have a little experience of what and how it would be like.

Here’s where it all comes full circle:

```js
function reveal() {
  const els = document.querySelectorAll(".reveal");
  
  requestAnimationFrame(() => {
    els.forEach(el => el.classList.add("visible"));
  });
}

document.addEventListener("DOMContentLoaded", reveal, { once: true });
```

You know how we mentioned the `DOMContentLoaded` at the start? Yeah, this is where the main magic happens. We call `requestAnimationFrame` for each element that has the `.reveal` class, wrapping it into a function called `reveal()` . This function would then be used when the document loads and `DOMContentLoaded` fires this function for us just one time. And that’s the basic gist of it.

Here’s the final result!

---

## Final code

Remember how we commented out `@view-transition` at the start? Well, you can uncomment it out and paste this code above the query selector for the anchor element to ensure the View Transition API detection is live. If it’s present, we remove the `.reveal` class and go with view transition, if not, it defaults to the `DOMContentLoaded` + `requestAnimationFrame()` solution:

```js
if (document.startViewTransition) {
  console.log("ViewTransition supported — skipping JS fallback");
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.remove("reveal");
  });
  return;
}

const allAnchors = document.querySelectorAll("a");
```

This is what it would look like in Chrome that supports View Transitions:

To get the full code, visit [this Github repo (<VPIcon icon="iconfont icon-github" />`sunkanmii/view-transition-fallback.git`)](https://github.com/sunkanmii/view-transition-fallback.git). Here’s a [<VPIcon icon="fas fa-globe"/>Netlify demo link to the with @view-transition and fallback](https://rad-malabi-08a79d.netlify.app/) and here’s a [<VPIcon icon="fas fa-globe"/>demo link to the project](https://celadon-kitten-df0ea7.netlify.app/) with just the fallback. Although this method works super well, **always consider and fight for progressive enhancement first**.

Support for view transitions is improving *fast* too. This approach is handy, however, if your boss/client is demanding that everything behaves the same in every browser — which I know is very common — even *now,* leaning into progressive enhancement as a policy will always put you on a stronger footing for the long term.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A view transitions fallback: DOMContentLoaded + requestAnimationFrame()",
  "desc": "Look, we get it, your boss wants everything to work the same in every browser. We're all about progressive enhancement here but we know a lot of organisations don’t like working like that, so Sunkanmi is here to help you navigate implementing view transitions with that in mind.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/a-view-transitions-fallback-domcontentloaded-requestanimationframe.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
