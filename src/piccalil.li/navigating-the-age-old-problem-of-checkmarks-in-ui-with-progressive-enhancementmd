---
lang: en-US
title: "Navigating the age-old problem of checkmarks in UI with progressive enhancement"
description: "Article(s) > Navigating the age-old problem of checkmarks in UI with progressive enhancement"
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
      content: "Article(s) > Navigating the age-old problem of checkmarks in UI with progressive enhancement"
    - property: og:description
      content: "Navigating the age-old problem of checkmarks in UI with progressive enhancement"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/navigating-the-age-old-problem-of-checkmarks-in-ui-with-progressive-enhancement.html
prev: /programming/css/articles/README.md
date: 2026-05-28
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url: https://piccalil.li/author/sunkanmi-fafowora
cover: https://piccalil.b-cdn.net/api/og-image?slug=navigating-the-age-old-problem-of-checkmarks-in-ui-with-progressive-enhancement/
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
  name="Navigating the age-old problem of checkmarks in UI with progressive enhancement"
  desc="In terms of browser support and a full set of features, ::checkmark is way off still but that doesn’t stop Sunkanmi using it with a progressive enhancement mindset. "
  url="https://piccalil.li/blog/navigating-the-age-old-problem-of-checkmarks-in-ui-with-progressive-enhancement"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=navigating-the-age-old-problem-of-checkmarks-in-ui-with-progressive-enhancement/"/>

The `::checkmark` pseudo-element was introduced in [<VPIcon icon="iconfont icon-w3c"/>**CSS Form Control Styling Module Level 1**](https://drafts.csswg.org/css-forms-1/) and it’s a powerful CSS feature to say the least. I even wrote about it as an [**almanac entry for CSS-Tricks in 2025**](https://css-tricks.com/almanac-pseudo-selectors/checkmark.md) to share what this pseudo-element can do.

The CSS `::checkmark` pseudo-element is used to style the checked state of input elements with checkers including the `<select>` dropdown, checkboxes, and radio buttons. There’s one problem: at the time of writing, `::checkmark` lacks browser support on two major browsers: Safari & Firefox.

That’s not all.

[<VPIcon icon="iconfont icon-w3c"/>According to the specification](https://drafts.csswg.org/css-forms-1/#checkmark), `::checkmark` is supposed to support styling of checkmarks present in checkboxes, radios, and option elements, but again, at the time of writing, it’s only supported for `<option>` elements in the `<select>` dropdown.

This means that `::checkmark` , as simple, powerful, and useful as it is, is still very limited, and that’s a problem. So, do we rely on the traditional solutions we used to use in the past to style checkmarks? Are they better? In this article, we will be exploring how the problem of customised checkmarks was solved in the past and compare those solutions with the modern `::checkmark` solution, providing recommendations as we go.

---

## How we’ve traditionally approached checkmarks in menus

To create and style a traditional checkmark similar to the ones you see in `<option>` elements under `<select>` , first, we would create a custom dropdown to house the checkmark. To do that, we would have to consider a bunch of interactive states and rules. Your browser doesn’t provide these with non-semantic elements, so taking a few notes from [**Sandrina’s article**](/css-tricks.com/striking-a-balance-between-native-and-custom-select-elements.md), we need to have:

- A dropdown with the current selected option
- Box toggling ability to toggle the visibility of the options
- Clicking an option in the list updates the dropdown value. The dropdown text changes, and the list MUST be closed
- Clicking outside closes the list
- A customizable select dropdown icon to represent our picker
- A customizable select checkmark icon to represent our checkmark for any selected option

Here’s how our HTML would likely look:

```html
<div id="cs">
  <div id="cs-btn">
    <span id="btn-lbl">::before</span>
    <span class="btn-arrow">▼</span>
  </div>
  
  <!-- list menu -->
  <div class="cs-menu">
    <div class="item" data-sel data-v=":before">
      <span class="checkmark">✓</span>
      <span class="label">::before</span>
        
      </div>
    <div class="item" data-v="::after">
      <span class="checkmark">✓</span>
      <span class="label">::after</span> 
      </div>
    <div class="item" data-v="::marker">
      <span class="checkmark">✓</span>
      <span class="label">::marker</span>  
      </div>
    <div class="item" data-v="::selection">
      <span class="checkmark">✓</span>
      <span class="label">::selection</span>
      </div>
      
    <div class="item" data-v="::placeholder">
      <span class="checkmark">✓</span>
      <span class="label">::placeholder</span>
      </div>
  </div>
</div>
```

And our main CSS for the dropdown would look something like this:

```css :collapsed-lines
/* position property sets the list dropdown menu to be centered and non-clickable, just below the button that reveals it*/
.cs-menu {
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.3rem;
  z-index: 20;
  box-shadow: 0 1.5rem 3rem oklch(0% 0 0 / 0.55);
  opacity: 0;
  transform: translateY(-0.4rem);
  pointer-events: none;
  transition: opacity 0.15s, transform 0.15s;
}

/* this reveals the menu list when the dropdown menu button is clicked if data-open attribute is present. It is hidden otherwise */ 
#cs[data-open] .cs-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

/* you can use flex here instead of grid. Just follow the pattern stated */
.item {
  display: grid;
  grid-template-columns: 1.2rem 1fr;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background 0.1s;
}
.item:hover {
  background: var(--hover);
}
.item[data-sel] {
  background: oklch(75% 0.18 55 / 0.08);
}

.label {
  font-size: 0.88rem;
  color: var(--muted);
  transition: color 0.12s;
}
.item[data-sel] .label {
  color: var(--accent);
}

/* checkmark over here 🙋‍♂️ */
.checkmark {
  justify-self: end;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  visibility: hidden;
}
.item[data-sel] .checkmark {
  visibility: visible;
}

```

In essence, we’re using `position` absolute to remove the element from the normal document flow and hide it from the user. revealing the menu only when the dropdown is clicked. Then, we’re using `grid` to align and arrange the items in the dropdown menu.

Finally, we style the checkmark to be hidden by default on all list items, and only the selected item should reveal the checkmark, indicating it has been chosen!

Ah yes! That should be all, right?

All this code should make sure the dropdown and checkmark work as intended, fulfilling the requirements stated above. Surely, it works without JavaScript (JS). But, enough sarcastic talk, let’s see the result…

<CodePen
  user="pisunkanmii-the-stylefulcalilli"
  slug-hash="GgNqgym"
  title="The dilemma of custom select dropdown with checkmarks: no js, a problem"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice something not working? Yes, the dropdown is not working. Why? **It’s because there’s no JS to provide the interactivity!**

That’s a *big* issue with solutions like this because JS is required for them to work, and [**JS _will_ fail for your users**](/piccalil.li/a-handful-of-reasons-javascript-wont-be-available.md). Warnings about best practice aside, let’s provide some interactivity to at least get this sample working.

```jsx
const cs = document.getElementById("cs");
const btn = document.getElementById("cs-btn");
const lbl = document.getElementById("btn-lbl");
const items = document.querySelectorAll(".item");

btn.addEventListener("click", () => cs.toggleAttribute("data-open"));

items.forEach((item) =>
  item.addEventListener("click", () => {
    items.forEach((x) => x.removeAttribute("data-sel"));
    item.setAttribute("data-sel", "");
    lbl.textContent = item.dataset.v;
    cs.removeAttribute("data-open");
  })
);

document.addEventListener("click", (e) => {
  if (!cs.contains(e.target)) cs.removeAttribute("data-open");
});

```

<CodePen
  user="pisunkanmii-the-stylefulcalilli"
  slug-hash="ogYjrZv"
  title="custom dropdown using grid/flex with position property"
  :default-tab="['css','result']"
  :theme="dark"/>

We are missing two important points. What about accessibility and users who want to navigate via keyboard?

We will have to modify the HTML with some `aria-haspopup` , `aria-expanded`, `aria-selected`, `role`, `tab-index`, and `aria-label` . That would sort out our HTML accessibility dilemma. The code would look a lot like this. Setting it up this way from the start, although tedious, would ensure checkmarks in our dropdowns work as intended for *all* users:

```html :collapsed-lines
<div id="cs">
  <!-- Button to open/close dropdown -->
    <button id="cs-btn" aria-haspopup="listbox" aria-expanded="false">
      <span id="btn-lbl">::before</span>
      <span class="btn-arrow">▼</span>
    </button>
      
    <!-- Menu itself -->
    <div class="cs-menu" 
      id="cs-menu" 
      role="listbox" 
      aria-label="CSS pseudo-element"
    >
      <div class="item" 
        role="option" 
        data-sel 
        aria-selected="true" 
        data-v=":before"
        tabindex="-1"
        >
        <span class="checkmark">✓</span>
        <span class="label">::before</span>
      </div>
        
      <div class="item" 
        role="option" 
        aria-selected="false" 
        data-v="::after"
        tabindex="-1"
        >
        <span class="checkmark">✓</span>
        <span class="label">::after</span>
      </div>
        
      <div class="item" 
        role="option" 
        aria-selected="false" 
        data-v="::marker"
        tabindex="-1"
        >
        <span class="checkmark">✓</span>
        <span class="label">::marker</span>
      </div>
        
      <div class="item" 
        role="option" 
        aria-selected="false" 
        data-v="::selection"
        tabindex="-1"
        >
        <span class="checkmark">✓</span>
        <span class="label">::selection</span>
      </div>
        
      <div class="item" 
        role="option" 
        aria-selected="false" 
        data-v="::placeholder"
        tabindex="-1"
        >
        <span class="checkmark">✓</span>
        <span class="label">::placeholder</span>
      </div>
    </div>
  </div>
</div>
```

Then, for our JavaScript, that will be modified a bit from what you saw earlier. We would have to account for when the user uses the directional arrows `up` and `down`, and when they click `enter` and `esc` to navigate the dropdown and click on any option.

```js :collapsed-lines
const cs = document.getElementById("cs");
const btn = document.getElementById("cs-btn");
const lbl = document.getElementById("btn-lbl");
const items = [...document.querySelectorAll(".item")];

let selected = items.find((i) => i.hasAttribute("data-sel"));

function open() {
  cs.setAttribute("data-open", "");
  btn.setAttribute("aria-expanded", "true");
  (selected ?? items[0]).focus();
}

function close() {
  cs.removeAttribute("data-open");
  btn.setAttribute("aria-expanded", "false");
  btn.focus();
}

function select(item) {
  selected?.removeAttribute("data-sel");
  selected?.setAttribute("aria-selected", "false");
  item.setAttribute("data-sel", "");
  item.setAttribute("aria-selected", "true");
  selected = item;
  lbl.textContent = item.dataset.v;
}

btn.addEventListener("click", () =>
  cs.hasAttribute("data-open") ? close() : open()
);

btn.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    open();
  }
});

/* accounting for keyboard up, down, enter and esc for the dropdown */
items.forEach((item) => {
  item.addEventListener("click", () => {
    select(item);
    close();
  });
  item.addEventListener("keydown", (e) => {
    const i = items.indexOf(item);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(i + 1) % items.length].focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length].focus();
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(item);
      close();
    }
    if (e.key === "Escape") close();
  });
});

document.addEventListener("click", (e) => {
  if (!cs.contains(e.target)) close();
});

```

That’s *a lot* of JavaScript! And essentially, what I’m doing is accounting for when a user clicks the `down` arrow button on their keyboard, which can be used to expand the dropdown and also browse downwards through the options. The up arrow key inside the dropdown can be used to navigate up, enter selects the item, and esc leaves the dropdown.

<CodePen
  user="sunkanmii-the-styleful"
  slug-hash="NPbdVeY"
  title="custom dropdown using grid/flex with position property (accessible + keyboard navigation)"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s also not forget the accessibility toggles that let the screen reader know that the dropdown has been expanded or that an item in the dropdown list has been selected.

This approach is how many developers have tackled the problem at hand before and here two key reasons why it is not the best solution:

1. When JS fails, the whole solution is **dead**. Not even a glimmer of hope is here. No JavaScript means no interaction and the markup we added likely ends up creating even more problems for people using assistive technology
2. Every single browser behavior has to be unnecessarily implemented from scratch. From option focusing, to accounting for what happens when the user clicks the button to expand and close the dropdown and also clicks outside of the dropdown to close it, has to be implemented

In essence, this solution is fragile and unreliable due to its over-reliance on JS. What’s more? Our checkmark styles are nonexistent if the dropdown cannot be revealed!

So, how do we solve these issues? Luckily, there’s a far less “heavy code” intensive solution that allows us to do style checkmarks anyhow we like.

---

## Modern day `::checkmark` styling

The CSS `::checkmark` is a pseudo-element that allows us to apply styles to HTML elements that support a checkmark. It really helps remove the hassle of writing a bunch of HTML, CSS, and JS in order to make things work as they’re supposed to. Let’s take a custom dropdown and a checkmark designed using `::checkmark`.

Take for example, this `<select>`dropdown:

```html
<select id="ls">
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
  <option value="html">HTML</option>
  <option value="ts">TypeScript</option>
  <option value="rust">Rust</option>
</select>
```

The HTML is pretty concise when compared to the previous solution, right? It’s amazing what happens when we use semantic elements. This way, the browser handles everything for us. Accessibility, keyboard navigation, and every standard behavior we expect from our dropdown, without any hassle. Just define a dropdown using `<select>` with its `<option>`s and boom! We’re good to go.

Checkmarks even come out of the box with this native browser solution!

For our CSS, we would have something like this:

```css
/* required to make the checkmark stylable */ 
#ls,
::picker(select) {
  appearance: base-select;
}

#ls {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.6rem;
  padding: 0.7rem 1rem;
}

#ls option:checked {
  color: var(--accent);
  background: oklch(78% 0.22 145 / 0.1);
}

/* checkmark style here 🙋‍♂️*/
::checkmark {
  content: "🎨";
}

/* a dot checkmark for options not checked */
#ls option:not(:checked)::checkmark {
  visibility: visible;
  content: "·";
  color: var(--muted);
}
```

All you need to do is set `appearance` to `base-select` on the `<select>` dropdown and you’re set for styling your checkmarks using `::checkmark` and changing the default check using `content`!

<CodePen
  user="piccalilli"
  slug-hash="Pwbzqqa"
  title="::checkmark demo (no JS required!)"
  :default-tab="['css','result']"
  :theme="dark"/>

No JS required!

A win for [**progressive enhancement**](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md) because it essentially accounts for all the major issues associated with creating a custom dropdown and having a custom checkmark style. This solution, even when JS fails, will still work out fine.

This approach is clearly better than the previous approach, but there are a few issues with this that I think we should touch on.

---

## The problem with `::checkmark`

It’s amazing what this pseudo-element can do and what *it is intended to do*. It’s also amazing the amount of code it saves. Not only do I need to write less code to achieve the same result (efficiency), but the browser also handles the default behavior I expect when I click outside the dropdown (the dropdown closes automatically).

There are a few issues with `::checkmark` that I want to address though.

1. There’s limited browser support. At the time of writing, [<VPIcon icon="iconfont icon-caniuse"/>`::checkmark` is only supported in 3 major browsers](https://caniuse.com/mdn-css_selectors_checkmark) and not across the board. That would suck for a user having to experience a feature in one browser and be absent on the next.
2. Lacking full feature support: According to the documentation, [<VPIcon icon="iconfont icon-w3c"/>`::checkmark` is supposed to work for checkboxes, radios, and](https://drafts.csswg.org/css-forms-1/#checkmark) options. Guess what? In browsers that currently support this, **only the options from `<select>` are supported.** So even if I’m using this pseudo-element, I’m not getting its full feature!

Both need to be looked into by browser vendors, in my opinion.

---

## Wrapping up

The modern day `::checkmark` solution with native browser dropdown allows us to favor all users without having to implement our own accessibility, keyboard navigation, and dropdown behavior. Even when JavaScript fails, the solution still works! Because we’re using a native `<select>` element, we get the correct announcements from assistive technology too.

My only plea is that for our checkmarks to be styled correctly, major browser vendors may need to provide full support for this feature as soon as possible, so we can style our own custom checkmarks without having to rely on JS at all, ever again.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Navigating the age-old problem of checkmarks in UI with progressive enhancement",
  "desc": "In terms of browser support and a full set of features, ::checkmark is way off still but that doesn’t stop Sunkanmi using it with a progressive enhancement mindset. ",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/navigating-the-age-old-problem-of-checkmarks-in-ui-with-progressive-enhancement.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
