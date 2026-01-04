---
lang: ko-KR
title: "A CSS-Powered Add/Remove Tags UI"
description: "Article(s) > A CSS-Powered Add/Remove Tags UI"
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
      content: "Article(s) > A CSS-Powered Add/Remove Tags UI"
    - property: og:description
      content: "A CSS-Powered Add/Remove Tags UI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-css-powered-add-remove-tags-ui.html
prev: /programming/css/articles/README.md
date: 2024-04-11
isOriginal: false
author: Preethi Sam
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/1650
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
  name="A CSS-Powered Add/Remove Tags UI - Frontend Masters Boost"
  desc="Checkboxes and labelsusedto have to be right next to each other to be a potent UI duo. You could do trickery like this:But now, thanks to:has()in CSS, we’re not beholden to that structure anymore.We can :has() it all, as it is said. Now that these HTML elements have some autonomy, without losing their connection to […]"
  url="https://frontendmasters.com/blog/a-css-powered-add-remove-tags-ui/"
  logo="/favicon-16x16.png"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/1650"/>

Checkboxes and labels*used*to have to be right next to each other to be a potent UI duo. You could do trickery like this:

```html
<label for="toggle">Toggle</label>
<input type="checkbox" id="toggle">
<div></div>
```

```css
#toggle:checked + div {
  /* Do something fancy in here with a toggleable on/off state */
}
```

But now, thanks to`:has()`in CSS, we’re not beholden to that structure anymore.[We can `:has()` it all](/frontendmasters.com/we-can-has-it-all.md), as it is said. Now that these HTML elements have some autonomy, without losing their connection to one another, a lot can be achieved

Using this as a base concept, we can build a tag management component operated entirely in HTML & CSS.

---

## A Tag Component with Interactive HTML

A`<label>`is an interactive element that can trigger its controlled element. For instance, when we click a`<label>`paired with an`<input type="checkbox">`the checkbox’s`:checked`state toggles.

A combo with a`<label>`allows us to design a toggle UI that can be operated from**_two different_**locations on a page (both the label and the checkbox). The controlled element is in one location and the label is in the other.

How far and how independent these two locations have to be from each other for the duo to work used to be limited, since labels can’t directly inform us which state their controlled element is currently in. For that, we have to ask the controlled element itself each time, and keep the label close to the element, so the label can be accessed in CSS during the element’s state change.

That was the case before.

Because of modern CSS standards like Grid,`:has()`selector and such, there’s much more freedom now between the source code arrangement in the HTML and our[<VPIcon icon="fa-brands fa-codepen"/>ability to reach any element in CSS](https://codepen.io/chriscoyier/pen/xxejMyw).

<CodePen
  user="chriscoyier"
  slug-hash="xxejMyw"
  title="Arbitrary Radio with :has() Usage"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"/>

```html
<div>
  <label for="one">One</label>
  <label for="two">Two</label>
  <label for="three">Three</label>
</div>

<p>Arbitrary DOM</p>

<div>
  <input type="checkbox" id="one">
  <input type="checkbox" id="two">
  <input type="checkbox" id="three">
</div>
```

```css
body:has(#one:checked) p {
  background: pink;
}
body:has(#two:checked) p {
  background: lightgreen;
}
body:has(#three:checked) p {
  background: lightblue;
}
```

In this article,**I’ll be using checkboxes, labels**,**and**[<VPIcon icon="fa-brands fa-firefox" />`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)**selectors to design****a UI where you can add and remove “tags”**. The UI will have a set of tags to select from, and a set of tags that have been selected. Clicking a tag in one set removes it from one area and makes it appear in the other set. It’s a functionality that’s perfect for checkboxes and labels to take on. Using the`:has()`selector means, I can keep the two set of tags in as much of a distance or depth from each other as I want, which in turn provides a lot flexibility.

Although the`:has()`selector can be used in many ways, in this article we’ll focus on its ability to target an element containing a specific child element. The parent is mentioned before the colon (`:`) and the child is mentioned inside the parentheses of`has()`. For example,`p:has(>mark)` selects all elements that have at least one direct descendant that’s a `<mark>`. Another example, `div:has(:checked)` selects all `<div>` elements that have at least one descendant (direct or not) element that’s in a checked state, like a radio or checkbox.

Now that we’ve got the basics covered. Here’s the final demo we’ll be working towards. We’re going to use**movie genres**as our tags.

<CodePen
  user="rpsthecoder"
  slug-hash="WNWXvve"
  title="CodePen Embed - CSS Dialog Animations (Max browser support with @keyframes)"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"/>

Let’s get started.

---

## HTML Construction

There are two parts:

1. One part nests the checkboxes
2. The other, their labels

Because we’ll be designing a cluster of tags of movie genres, a script is set up to add the checkboxes and labels for each genre to the HTML.

The script uses HTML[<VPIcon icon="fa-brands fa-firefox" />`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)to build the new elements off of. This is to prove that you could build all of this dynamically with arbitrary tags from a data source. You can use any method you prefer or not use script at all and directly build the HTML. You’ll see the full source code in a moment.

```html
<div>
  <!-- Plus tags (tags to be included) will render here -->
</div>

<ul>
  <!-- Minus tags (tags already included) will render here -->
</ul>

<template>
  <!-- The tags' templates -->
  <span class="plus"><input type="checkbox" /></span>
  <li><label class="minus"></label></li>
</template>
```

```js
const template = document.querySelector('template').content;

const div = document.querySelector('div');
const ul = document.querySelector('ul');

const genres = ["Adventure", "Comedy", "Thriller", "Horror"];

for (let i = 0; i < genres.length; i++) {
  /* get a clone of the template's content */
  let clone = template.cloneNode(true);

  let checkbox = clone.querySelector('input[type="checkbox"]');
  /* add id to the checkbox */
  checkbox.setAttribute("id", `c${i + 1}`);
  /* add genre text to the plus tag */
  checkbox.parentElement.innerHTML += genres[i];
  /* add plus tag to the div on page */
  div.appendChild(clone.querySelector(':has(input[type="checkbox"])'));

  let label = clone.querySelector("label");
  /* add "for" attr. to the label */
  label.setAttribute("for", `c${i + 1}`);
  /* add text to the minus tag */
  label.innerText = genres[i];
  /* add minus tag to the ul on page */
  ul.appendChild(clone.querySelector(":has(label)"));
}
```

In the script:

1. A set of`genres`(tag values) is stored as an array
2. For each item in the`genres`array, a new[<VPIcon icon="fa-brands fa-firefox" />`clone`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)is created from the[<VPIcon icon="fa-brands fa-firefox" />`template`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement)that has an empty`plus`(checkbox) and`minus`(label) tag, as seen inside the`<template>`in HTML
3. The empty tags’ text and attributes are filled using the`genres`item’s value and index
4. Finally, the filled tags are added to their respective containers on the page —`<div>`and`<ul>`

Here’s how the HTML source code will look like once the page renders:

```html
<div>
  <span class="plus"><input type="checkbox" id="c1">Adventure</span>
  <span class="plus"><input type="checkbox" id="c2">Comedy</span>
  <span class="plus"><input type="checkbox" id="c3">Thriller</span>
  <span class="plus"><input type="checkbox" id="c4">Horror</span>
</div>

<ul>
  <li><label class="minus" for="c1">Adventure</label></li>
  <li><label class="minus" for="c2">Comedy</label></li>
  <li><label class="minus" for="c3">Thriller</label></li>
  <li><label class="minus" for="c4">Horror</label></li><
</ul>
```

1. The parent of each checkbox is`.plus`. They are meant to be the tags that are yet to be included. It’s sectioned off inside a`<div>`
2. Each label is`.minus`— the tags that are included. These are arranged in a list inside a`<ul>`

---

## CSS Tag Management

Let’s look at the the key CSS rules first, then we’ll simplify it. This provides the core functionality of the tag management.

```css
/* Remove all minus tags initially */
li { display: none; } 

/* Remove a plus tag, if it's checked */
.plus:has(input:checked){
    display: none; 
}

/* Remove a minus tag, if its plus tag is checked */
:has(#c1:checked) li:has([for='c1']),
:has(#c2:checked) li:has([for='c2']),
:has(#c3:checked) li:has([for='c3']),
:has(#c4:checked) li:has([for='c4']) {
    display: revert; 
}
```

1. Initially, the list items (`li`) with the .`minus`tags are not displayed. It means the user hasn’t selected any tag to be included yet
2. When user selects a tag — i.e. checks a checkbox (`:has(input:checked)`) — its parent element,`.plus`, is removed with`display:`“\`none\`
3. And the corresponding`.minus`label’s parent (ex.`li:has([for='c1']`) is made visible with`display: revert`

::: note

The CSS keyword`revert`changes a property value to its browser default

:::

To automate the selector listing at the end of the above CSS snippet, I’ll add those rules in the script itself, so that it doesn’t have to be hard-coded in CSS. Again, the whole point here is proving this can all be dynamically generated for your own set of tags if you wanted. If you don’t prefer script, you can leave it as it is in CSS or use a CSS framework, whichever works for you. The following is a continuation of the previous JavaScript snippet, where only the code added now is shown.

```js
const style = document.createElement('style');
document.head.appendChild(style);

for (let i = 0; i < genres.length; i++) {
  /* ... */
  style.sheet.insertRule(`:has(#c${i+1}:checked) li:has([for='c${i+1}']) { display: revert; }`);
}

/* a clear view of the CSS rule string from the above snippet */
`:has(#c${i+1}:checked) li:has([for='c${i+1}']) { display: revert; }` 
```

In the above script: A new`style`is added to the page, and to this`style`a css rule for each`genres`items is added. The css rule is same as in the css snippet from before. Here the`id`values are dynamically generated.

---

## CSS Tag Styling

Let’s style the tags’ appearance:

```css
.plus,
.minus {
  display: inline-block;
  height: 1lh;
  padding-inline-end: 1.5em;
  border-radius: 4px;
  border: 1px solid currentColor;
  text-indent: 10%;
  font-weight: bold;
  &::after {
    display: block;
    width: 100%;
    margin-block-start: -1lh;
    margin-inline-start: 1.2em;
    text-align: right;
  }
  &:hover {
    box-shadow: 0 0 10px white, 0 0 6px currentColor;
  }
}
.plus {
  position: relative;
  color: rgb(118, 201, 140);
  margin-inline: 0.5em;
  &::after {
    content: "+";
  }
}
.minus {
  color: rgb(95, 163, 228);
  &::after {
    content: "\02212";
  }
}
input[type="checkbox"] {
  width: 100%;
  height: inherit;
  border-radius: inherit;
  appearance: none;
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
}
input[type="checkbox"],
label {
  cursor: pointer;
}
```

1. The`.plus`and`.minus`tags are colored and bordered. Each has a pseudo-element (`::after`) to add the “+” and “-“ icon next to it, respectively
2. The checkbox’s default appearance is removed and is made to fill the area of its container element, so the entire container is clickable

<CodePen
  user="rpsthecoder"
  slug-hash="VwNQxvZ"
  title="CSS tags"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## CSS Dynamic Notification

Notification messages can be displayed to the users in certain circumstances, and this can also be done entirely in CSS:

1. When*no*tags are selected
2. When*at least one*tag is selected
3. When*all*tags have been selected

```css
ul {
  &::before {
    display: block;
    text-align: center;
    margin-block-start: 1lh;
  }
  :not(:has(input:checked)) &::before {
    /* has no checked boxes */
    content: "No tags included yet";
  }
  :has(input:checked):has(input:not(:checked)) &::before {
    /* has atleast one checked and unchecked boxes */
    content: "Following tags are included";
  }
  :not(:has(input:not(:checked))) &::before {
    /* has no unchecked boxes */
    content: "All tags are included";
  }
}
```

In the above CSS[<VPIcon icon="fa-brands fa-firefox" />nested](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting)code snippet:

1. `&`represents`<ul>`. Hence`&::before`means`ul:before`
2. `:has()`and`:not(:has())`represent when the root element (the page) contains a given selector (mentioned inside the parentheses) and when it doesn’t
3. `input:checked`is a checked box
4. `input:not(:checked)`is an unchecked box

And here’s what’s happening in the code:

1. A`::before`pseudo-element is added to the`<ul>`. This serves as the notification area
2. When the page has no checked element,`'No tags included yet'`is displayed
3. When the page has at least one checked and one unchecked box,`'Following tags are included'`is shown
4. When the page doesn’t have any unchecked box,`'All tags are included'`appears

::: tip

Instead of the root element you can scope the code to a common parent, too. Ex. using`main:has()`instead of`:has()`, when`<main>`is a common ancestor of the two group of tags

:::

Here’s the final demo:

<CodePen
  user="anon"
  slug-hash="WNWXvve"
  title="CodePen Embed - CSS tags final"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

Because there’s so much independence between the two set of tags, it frees you up in styling the tags however you like. You can embed the tags in sentences if you want, or you could have as many elements in between them as you want without worrying. For as long as the user is well informed by the design the purpose of the tags, and which ones have been selected, and which ones remain unselected, design them however you feel like.

::: tip Bonus

You can even use CSS counters to add a running count of selected and unselected tags, if you want. Read on CSS counters for a similar use case[<VPIcon icon="fas fa-globe"/>here](https://css-tricks.com/counting-css-counters-css-grid/).

<SiteInfo
  name="Counting With CSS Counters And CSS Grid | CSS-Tricks"
  desc="In this post, we're going to demonstrate how we can use the source order independence of CSS Grid to solve a layout issue that's the result of a source order constraint. Specifically, we're going to look at checkboxes and CSS Counters—two concepts that rely on source order when used together."
  url="https://css-tricks.com/counting-css-counters-css-grid/"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://css-tricks.com/wp-json/social-image-generator/v1/image/266050"/>

:::

<!-- START: ARTICLE CARD -->
```component VPCard
{
  "title": "A CSS-Powered Add/Remove Tags UI",
  "desc": "Checkboxes and labelsusedto have to be right next to each other to be a potent UI duo. You could do trickery like this:But now, thanks to:has()in CSS, we’re not beholden to that structure anymore.We can :has() it all, as it is said. Now that these HTML elements have some autonomy, without losing their connection to […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-css-powered-add-remove-tags-ui.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
