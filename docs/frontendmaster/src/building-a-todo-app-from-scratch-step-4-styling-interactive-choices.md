---
lang: en-US
title: "Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices"
description: "Article(s) > Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices"
    - property: og:description
      content: "Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/building-a-todo-app-from-scratch-step-4-styling-interactive-choices.html
prev: /programming/css/articles/README.md
date: 2024-02-28
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/1020
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
  name="Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices"
  desc="I'm already a little over all the green. What was I thinking? I'm much more of a nice gray color palette kinda guy with some fun poppy colors. That's what we need to get to here. When we left off, we just had wireframes going. It's time to get some style on this thing! Custom…"
  url="https://blog.master.dev/building-a-todo-app-from-scratch-step-4-styling-interactive-choices/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/1020"/>

I’m already a little over all the green. What was I [**thinking**](/blog.master.dev/building-a-todo-app-from-scratch-step-1-planning-design.md)? I’m much more of a nice gray color palette kinda guy with some fun poppy colors. That’s what we need to get to here. When we left off, we just had wireframes going. It’s time to get some style on this thing!

::: info Article Series

1. [Building a TODO App from Scratch — Step 1 — Planning & Design](https://blog.master.dev/building-a-todo-app-from-scratch-step-1-planning-design/)
2. [Building a TODO App from Scratch — Step 2 — HTML](https://blog.master.dev/building-a-todo-app-from-scratch-step-2-html/)
3. [Building a TODO App from Scratch — Step 3 — Basic JavaScript Functionality](https://blog.master.dev/building-a-todo-app-from-scratch-step-3-basic-javascript-functionality/)
4. [Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices](https://blog.master.dev/building-a-todo-app-from-scratch-step-4-styling-interactive-choices/)
5. [Building a TODO App from Scratch — Step 5 — Extra Functionality](https://blog.master.dev/building-a-todo-app-from-scratch-step-5-extra-functionality/)

:::

---

## Custom Properties

We can get rid of that wireframe look by removing all those 1px borders and applying some backgrounds. Let’s give ourselves some Custom Properties to work with, so we can apply colors in such a way they are easy to change later.

```css
html {
  --gray800: oklch(10% 0% 0);
  --gray600: oklch(40% 0% 0);
  --gray100: oklch(92% 0% 0);
  --brand: oklch(85% 0.3 145);

  background: var(--gray100);
}
```

You can see we’re using the lightest gray right away in colorizing the background.

I’m using OKLCH color function here because [<VPIcon icon="fas fa-globe"/>I find it the generally-nicest](https://chriscoyier.net/2023/01/22/ok-oklch-%F0%9F%91%91/) of all the color models. One very immediate thing it does for us here is that it unlocks P3 colors. That `--brand` color you see there is actually a bit more bright and vibrant than is even possible in the sRGB color space (like a hex code or any of the more common color functions you may be familiar with, like `rgb()`).

Applying those colors to the relevant sections gets us a start:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/Screenshot-2024-02-28-at-11.03.17%E2%80%AFAM-1024x476.png?resize=1024%2C476&quality=80&ssl=1)

---

## Fonts

We don’t need to go too far down the typography rabbit hole here, as all our design calls for is the header, one input, and a list of to-do items. Keeping it simple and fast (not loading fonts is… fast), is ideal, so:

```css
html {
  font-family: system-ui, sans-serif;
}
```

You’d think `system-ui` would be boring, but as a little fun and progressive enhancement, we can use some `font-variation-settings` on it in the case that the font that loads supports them. It’s not the only one, but [<VPIcon icon="fas fa-globe"/>Apple’s San Francisco font ships as a variable font](https://chriscoyier.net/2022/08/02/actually-the-san-francisco-typeface-does-ship-as-a-variable-font/), so we can do fun things like stretch it out.

```css
header {
  background: var(--gray800);
  color: white;
  h1 {
    font-variation-settings: "wght" 900, "wdth" 700;
  }
}
```

I love this look, myself:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/Screenshot-2024-02-28-at-11.04.11%E2%80%AFAM-1024x446.png?resize=1024%2C446&quality=80&ssl=1)

---

## SVGs

We need SVG’s for the “check” of the logo and that we’ll use when a user checks off a to-do. I’m kinda thinking we just re-use the same one for both as that just makes good sense. Plus we’ll make a “+” SVG too. It might be tempting to find unicode characters for these, but I’m telling you, just use SVG. The predictable bounding box of SVG will be your friend (no fighting against weird space).

There are loads of resources for finding SVGs to use. I’m usually a [<VPIcon icon="fas fa-globe"/>Noun Project](https://thenounproject.com/) guy, but if we needed, say, 10 or more icons I’d probably try to find a more cohesive set somewhere. These are also so simple that could (should) draw them ourselves (even directly in code), but we’ll save that for another day.

Ultimately, we’ll just get our hands on a “check” icon and use it in the logo…

```xml
<header>
  <svg ... class="svg-check site-logo">
    <polyline ... />
  </svg>
  <h1>TODOs</h1>
</header>
```

… in our template literal for each to-do …

```js
HTML += `<li id="${todo.id}">
  ${todo.title}
  <button aria-label="Complete" class="button-complete">
    <svg ... class="svg-check">
      <polyline ... />
    </svg>
  </button>
</li>`;
```

… and then our “+” in the form:

```xml
<form id="todo-form" class="todo-form">
  <label>
    <span class="screen-reader-text">New TODO</span>
    <input type="text" name="todo">
  </label>
  <button id="button-add-todo" class="button-add-todo">
    <svg ... class="svg-plus">
      <g>
        <line ... />
        <line ... />
      </g>
    </svg>
  </button>
</form>
```

There is a lot to know about SVG so I’m really just dropping the basic usage in here. I’ve chosen to drop the SVG code right “inline” with the HTML because I generally think that’s best because it’s fast and offers the most styling control. If you wanna dig more into SVG, I did [<VPIcon icon="fas fa-globe"/>write a book about it](https://abookapart.com/products/practical-svg) one time you could check out.

With the SVG’s I chose in there:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/Screenshot-2024-02-28-at-11.06.36%E2%80%AFAM-1024x470.png?resize=1024%2C470&quality=80&ssl=1)

---

## Adding To-Do Interactions

When we add a new to-do, I want to give the adding button a temporary class so we can do something fun with it. So we’ll use a saved reference to that button and do that:

```js
buttonAddTodo.classList.add("added");
```

But this is an opportunity! We could add a *different* class upon a failure. What failure? *Not entering any text*, for one. We could make the call not to allow entering blank to-dos, which at this point I think is a decent idea.

So the form event handler then becomes like:

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Don't allow empty todo
  if (!form[0].value) {
    buttonAddTodo.classList.add("shake");
    return;
  }
  addTodo(event);
  form.reset();
});
```

Now check out these little @keyframe animations I can do with those classes:

```css
.button-add-todo {
  ...

  &.shake {
    rotate: 0deg;
    transform-origin: bottom right;
    animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  &.added {
    transform-origin: center center;
    animation: added 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
}
@keyframes shake {
  50% {
    rotate: -12deg;
  }
}
@keyframes added {
  50% {
    rotate: 1turn;
    translate: 0 50px;
  }
}
```

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/CleanShot-2024-02-28-at-11.44.14.gif?resize=800%2C566&ssl=1)

A little fun, maybe?

Let’s be careful to *remove* those classes after the animation happens, so that another animation can be triggered freshly when needed:

```js
buttonAddTodo.addEventListener("animationend", () => {
  buttonAddTodo.classList.remove("shake", "added");
});
```

---

## Completing To-Do Interactions

We’ve got a big ol’ box sitting there waiting for to-do items to be checked. And now that we’re using SVG, my temptation is to do a little fun “line drawing” with that. That is, see the checkbox be “drawn” as we complete the to-do, before removing it.

Here’s the trick.

First we go find the SVG itself in our template literal, and add this special `pathLength` attribute to the actual shape:

```xml
<svg width="20" height="20" viewBox="0 0 241.44 259.83" class="svg-check">
  <polyline pathLength="1" points="16.17 148.63 72.17 225.63 225.17 11.63" />
</svg>
```

This just makes animating it much easier.

Then we set and animate some specific SVG properties to [**do the drawing**](/css-tricks.com/a-trick-that-makes-drawing-svg-lines-way-easier.md):

```css
.todo-list {
  /* ... */
  li {
    /* ... */
    .svg-check {
      opacity: 0;
    }
    &.complete {
      .svg-check {
        opacity: 1;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation: do-check 1s infinite alternate;
      }
    }
  }
}

@keyframes do-check {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}
```

Check out the drawing effect at work:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/CleanShot-2024-02-28-at-12.33.33.gif?resize=800%2C470&ssl=1)

The trick to getting the animation to run before being removed is just to … wait.

```js
function removeTodo(event) {
  const listItem = event.target.parentElement;
  listItem.classList.toggle("complete");
  setTimeout(() => {
    TODOs = TODOs.filter((todo) => todo.id !== event.target.parentElement.id);
    localStorage["data"] = JSON.stringify(TODOs);
    buildUI();
  }, 1000);
}
```

You can see I’m just waiting for a second there, which is about the same, a little longer, than the animation itself. We could tie it to the `animationend` event here also, but for some reason it felt better to me to leave this bit of business logic in the code here rather than tying it to a CSS thing.

### Really smoooooth completions

What if we remove a to-do from the *middle* of the list. It’ll be *jerky* won’t it? It certainly could be. This is one of those classic situations in CSS where being able to “animate to/from auto” would be nice. In this case, we want to animate from “however tall a list item is” to zero. That way the bottom items in the list would slide up, making a much more comfortable animation. But honestly, even animating the height here feels like slight of hand, what I actually want is just not to think very hard about it and for the list items to just slide up into place, if at all possible.

Turns out this is a lovely use-case for [<VPIcon icon="fa-brands fa-chrome"/>View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions). Without getting very deep at all into it, essentially all we need to do is:

1. Give all our to-dos a unique `view-transition-name`
2. When we update the DOM, e.g. `buildUI()`, wrap that in a `startViewTransition()` function.

So our template literal is updated to be like…

```js
  TODOs.forEach((todo) => {
    HTML += `<li id="${todo.id}" style="view-transition-name: list-item-${todo.id};">
```

We already have a unique ID so we’ll steal that for the dual purpose here.

Then wrap our DOM updating function like:

```js
if (!document.startViewTransition) {
  buildUI();
} else {
  document.startViewTransition(() => {
    buildUI();
  });
}
```

That’s the same and progressive-enhancement friendly way to do it. It’s kind of required here, as that `startViewTransition` will throw in browsers that don’t support it and it could break our whole site.

Look at us know:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/02/CleanShot-2024-02-28-at-12.48.25.gif?resize=800%2C778&ssl=1)

This is friggin’ cool if you ask me.

---

## So far

<CodePen
  user="anon"
  slug-hash="YzgboPm"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

Just a little bit more functionality to go!

::: info Article Series

1. [Building a TODO App from Scratch — Step 1 — Planning & Design](https://blog.master.dev/building-a-todo-app-from-scratch-step-1-planning-design/)
2. [Building a TODO App from Scratch — Step 2 — HTML](https://blog.master.dev/building-a-todo-app-from-scratch-step-2-html/)
3. [Building a TODO App from Scratch — Step 3 — Basic JavaScript Functionality](https://blog.master.dev/building-a-todo-app-from-scratch-step-3-basic-javascript-functionality/)
4. [Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices](https://blog.master.dev/building-a-todo-app-from-scratch-step-4-styling-interactive-choices/)
5. [Building a TODO App from Scratch — Step 5 — Extra Functionality](https://blog.master.dev/building-a-todo-app-from-scratch-step-5-extra-functionality/)

:::

```component VPCard
{
  "title": "Relative Color Syntax — Basic Use Cases",
  "desc": "Support for the relative color syntax in CSS is across the board now (go interop!), so here we look at some basic (and still very useful) use cases, like applying alpha to a color you have on hand.",
  "link": "/blog.master.dev/relative-color-syntax-basic-use-cases.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Rainbow Selection in CSS",
  "desc": "::selection is cool, but scoping it to selectors like :nth-child(5n+2) is even more fun, especially on a love filled ay like Valentine's Day.",
  "link": "/blog.master.dev/rainbow-selection-in-css.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```


```component VPCard
{
  "title": "Color Picker with Display P3",
  "desc": "One of my recent moanings-and-groanings is the fact that seemingly no color-picker supports Display P3 colors. Display P3 allows you to use far more vivid colors then we've historically had access to in CSS, but now are totally supported in CSS through newer color functions like oklch(). Not even the built-in color picker to macOS.…",
  "link": "/blog.master.dev/color-picker-with-display-p3.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices",
  "desc": "I'm already a little over all the green. What was I thinking? I'm much more of a nice gray color palette kinda guy with some fun poppy colors. That's what we need to get to here. When we left off, we just had wireframes going. It's time to get some style on this thing! Custom…",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/building-a-todo-app-from-scratch-step-4-styling-interactive-choices.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
