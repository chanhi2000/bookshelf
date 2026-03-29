---
lang: en-US
title: "The Radio State Machine"
description: "Article(s) > The Radio State Machine"
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
      content: "Article(s) > The Radio State Machine"
    - property: og:description
      content: "The Radio State Machine"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-radio-state-machine.html
prev: /programming/css/articles/README.md
date: 2026-04-14
isOriginal: false
author:
  - name: Amit Sheen
    url: https://css-tricks.com/author/amitsheen/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/css-state-machine.webp
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
  name="The Radio State Machine"
  desc="One of the best-known examples of CSS state management is the checkbox hack. What if we want a component to be in one of three, four, or seven modes? That is where the Radio State Machine comes in."
  url="https://css-tricks.com/the-radio-state-machine"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/css-state-machine.webp"/>

Managing state in CSS is not exactly the most obvious thing in the world, and to be honest, it is not always the best choice either. If an interaction carries business logic, needs persistence, depends on data, or has to coordinate multiple moving parts, JavaScript is usually the right tool for the job.

That said, not every kind of state deserves a trip through JavaScript.

Sometimes we are dealing with purely visual UI state: whether a panel is open, an icon changed its appearance, a card is flipped, or whether a decorative part of the interface should move from one visual mode to another.

In cases like these, keeping the logic in CSS can be not just possible, but preferable. It keeps the behavior close to the presentation layer, reduces JavaScript overhead, and often leads to surprisingly elegant solutions.

---

## The Boolean solution

One of the best-known examples of CSS state management is [**the checkbox hack**](/css-tricks.com/the-checkbox-hack.md).

If you have spent enough time around CSS, you have probably seen it used for all kinds of clever UI tricks. It can be used to restyle the checkbox itself, toggle menus, control inner visuals of components, reveal hidden sections, and even switch an entire theme. It is one of those techniques that feels slightly mischievous the first time you see it, and then immediately becomes useful.

If you have never used it before, the checkbox hack concept is very simple:

1. We place a hidden checkbox at the top of the document.

```html
<input type="checkbox" id="state-toggle" hidden>
```

2. We connect a `label` to it, so the user can toggle it from anywhere we want.

```html
<label for="state-toggle" class="state-button">
  Toggle state
</label>
```

3. In CSS, we use the [**`:checked`**](/css-tricks.com/almanac-pseudo-selectors/checked.md) state and sibling combinators to style other parts of the page based on whether that checkbox is checked.

```css
#state-toggle:checked ~ .element {
  /* styles when the checkbox is checked */
}

.element {
  /* default styles */
}
```

In other words, the checkbox becomes a little piece of built-in UI state that CSS can react to. Here is a simple example of how it can be used to switch between light and dark themes:

<CodePen
  link="https://codepen.io/amit_sheen/pen/bNwaqoG/23e99ec7b74dc448e40012df67b064ba"
  title="The Radio State Machine - Demo 01"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## We have `:has()`

Note that I’ve placed the checkbox at the top of the document, before the rest of the content. This was important in the days before the [**`:has()`**](/css-tricks.com/almanac-pseudo-selectors/has.md) pseudo-class, because CSS only allowed us to select elements that come after the checkbox in the DOM. Placing the checkbox at the top was a way to ensure that we could target any element in the page with our selectors, regardless of the `label` position in the DOM.

But now that `:has()` is widely supported, we can place the checkbox anywhere in the document, and still target elements that come before it. This gives us much more flexibility in how we structure our HTML. For example, we can place the checkbox right next to the label, and still control the entire page with it.

Here is a classic example of the checkbox hack theme selector, with the checkbox placed next to the label, and using `:has()` to control the page styles:

```html
<div class="content">
  <!-- content -->
</div>

<label class="theme-button">
  <input type="checkbox" id="theme-toggle" hidden>
  Toggle theme
</label>
```

```css
body {
  /* other styles */

  /* default to dark mode */
  color-scheme: dark;

  /* when the checkbox is checked, switch to light mode */
  &:has(#theme-toggle:checked) {
    color-scheme: light;
  }
}

/* use the color `light-dark()` on the content */
.content {
  background-color: light-dark(#111, #eee);
  color: light-dark(#fff, #000);
}
```

::: note

I’m using the ID selector (`#`) in the CSS as it is already part of the checkbox hack convention, and it is a simple way to target the checkbox. If you worry about CSS selectors performance, don’t.

<CodePen
  link="https://codepen.io/amit_sheen/pen/PwGEKOv/4ddae54abddd0a2c10205ca5d93c721b"
  title="The Radio State Machine - Demo 02"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

---

## Hidden, not disabled (and not so accessible)

Note I’ve been using the [<VPIcon icon="fa-brands fa-firefox"/>HTML `hidden` global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden) to hide the checkbox from view. This is a common practice in the checkbox hack, as it keeps the input in the DOM and allows it to maintain its state, while removing it from the visual flow of the page.

Sadly, the `hidden` attribute also hides the element from assistive technologies, and the `label` that controls it does not have any interactive behavior on its own, which means that screen readers and other assistive devices will not be able to interact with the checkbox.

This is a significant accessibility concern, and to fix this, we need a different approach: instead of wrapping the checkbox in a `label` and hiding it with `hidden`, we can turn the checkbox into the button itself.

```html
<input type="checkbox" class="theme-button" aria-label="Toggle theme">
```

No hidden, no label, just a fully accessible checkbox. And to style it like a button, we can use the [**`appearance`**](/css-tricks.com/almanac-properties/appearance.md) property to remove the default checkbox styling and apply our own styles.

```css
.theme-button {
  appearance: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  /* other styles */
  
  /* Add text using a simple pseudo-element */
  &::after {
    content: "Toggle theme";
  }
}
```

<CodePen
  link="https://codepen.io/amit_sheen/pen/myrxEeP/f32a6dfe16a0d6a0b733e7bc4310c70e"
  title="The Radio State Machine - Demo 02-2"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This way, we get a fully accessible toggle button that still controls the state of the page through CSS, without relying on hidden inputs or labels. And we’re going to use this approach in all the following examples as well.

---

## Getting more states

So, the checkbox hack is a great way to manage simple binary state in CSS, but it also has a very clear limitation. A checkbox gives us two states: checked and not checked. On and off. That is great when the UI only needs a binary choice, but it is not always enough.

What if we want a component to be in one of three, four, or seven modes? What if a visual system needs a proper set of mutually exclusive states instead of a simple toggle?

That is where **the Radio State Machine** comes in.

---

## Simple three-state example

The core idea is very similar to the checkbox hack, but instead of a single checkbox, we use a bunch of radio buttons. Each radio button represents a different state, and because radios let us choose one option out of many, they give us a surprisingly flexible way to build multi-state visual systems directly in CSS.

<CodePen
  user="https://codepen.io/amit_sheen/pen/RNGxxqO/c9f715f3c45063394f458d7246138d3e"
  title="The Radio State Machine - Demo 03"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Let’s break down how this works:

```html
<div class="state-button">
  <input type="radio" name="state" data-state="one" aria-label="state one" checked>
  <input type="radio" name="state" data-state="two" aria-label="state two">
  <input type="radio" name="state" data-state="three" aria-label="state three">
</div>
```

We created a group of radio buttons. Note that they all share the same `name` attribute (`state` in this case). This ensures that only one radio can be selected at a time, giving us mutually exclusive states.

We gave each radio button a unique `data-state` that we can target in CSS to apply different styles based on which state is selected, and the `checked` attribute to set the default state (in this case, `one` is the default).

### Style the buttons

The style for the radio buttons themselves is similar to the checkbox button we created earlier. We use `appearance: none` to remove the default styling, and then apply our own styles to make them look like buttons.

```css
input[name="state"] {
  appearance: none;
  padding: 1em;
  border: 1px solid;
  font: inherit;
  color: inherit;
  cursor: pointer;
  user-select: none;

  /* Add text using a pseudo-element */
  &::after {
    content: "Toggle State";
  }

  &:hover {
    background-color: #fff3;
  }
}
```

The main difference is that we have multiple radio buttons, each representing a different state, and we only need to show the one for the next state in the sequence, while hiding the others. We can’t use `display: none` on the radio buttons themselves, because that would make them inaccessible, but we can achieve this by adding a few properties as a default, and overriding them for the radio button we want to show.

1. `position: fixed;` to take the radio buttons out of the normal flow of the page.
2. `pointer-events: none;` to make sure the radio buttons themselves are not clickable.
3. `opacity: 0;` to make the radio buttons invisible.

That will hide all the radio buttons by default, while keeping them in the DOM and accessible.

Then we can show the **next** radio button in the sequence by targeting it with the [**adjacent sibling combinator**](/css-tricks.com/css-selectors.md##adjacent-combinator) (`+`) when the current radio button is checked. This way, only one radio button is visible at a time, and users can click on it to move to the next state.

```css
input[name="state"] {
  /* other styles */

  position: fixed;
  pointer-events: none;
  opacity: 0;

  &:checked + & {
    position: relative;
    pointer-events: all;
    opacity: 1;
  }
}
```

And to make the flow circular, we can also add a rule to show the first radio button when the last one is checked. This is, of course, optional, and we’ll talk about linear and bi-directional flows later.

```css
&:first-child:has(~ :last-child:checked) {}
```

One last touch is to add an `outline` to the radio buttons container. As we are always hiding the checked radio buttons, we are also hiding its outline. By adding an [**`outline`**](/css-tricks.com/almanac-properties/outline.md) to the container, we can ensure that users can still see where they are when they navigate through the states using the keyboard.

```css
.state-button:has(:focus-visible) {
  outline: 2px solid red;
}
```

### Style the rest

Now we can add styles for each state using the `:checked` selector to target the selected radio button. Each state will have its own unique styles, and we can use the `data-state` attribute to differentiate between them.

```css
body {
  /* other styles */
  
  &:has([data-state="one"]:checked) .element {
    /* styles when the first radio button is checked */
  }

  &:has([data-state="two"]:checked) .element {
    /* styles when the second radio button is checked */
  }

  &:has([data-state="three"]:checked) .element {
    /* styles when the third radio button is checked */
  }
}

.element {
  /* default styles */
}
```

And, of course, this pattern can be used for far more than a simple three-state toggle. The same idea can power steppers, view switchers, card variations, visual filters, layout modes, small interactive demos, and even more elaborate CSS-only toys. Some of these use cases are mostly practical, some are more playful, and we are going to explore a few of them later in this article.

<CodePen
  link="https://codepen.io/amit_sheen/pen/XJjVPrK/186c7f43c150fe4d2556062180604629"
  title="The Radio State Machine - Demo 04"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Utilize custom properties

Now that we are back to keeping all the state inputs in one place, and we are already leaning on `:has()`, we get another very practical advantage: [**custom properties**](/css-tricks.com/a-complete-guide-to-custom-properties.md).

In previous examples, we often set the final properties directly per state, which meant targeting the element itself each time. That works, but it can get noisy fast, especially as the selectors become more specific and the component grows.

A cleaner pattern is to assign state values to variables at a higher level, take advantage of how custom properties naturally cascade down, and then consume those variables wherever needed inside the component.

For example, we can define `--left` and `--top` per state:

```css
body {
  /* ... */
  &:has([data-state="one"]:checked) {
    --left: 48%;
    --top: 48%;
  }
  &:has([data-state="two"]:checked) {
    --left: 73%;
    --top: 81%;
  }
  /* other states... */
}
```

Then we simply consume those values on the element itself:

```css
.map::after {
  content: '';
  position: absolute;
  left: var(--left, 50%);
  top: var(--top, 50%);
  /* ... */
}
```

<CodePen
  link="https://codepen.io/amit_sheen/pen/gbwvJvb/5a74fe4e920534a93153ee1e8b89161e"
  title="The Radio State Machine - Demo 05"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This keeps state styling centralized, reduces selector repetition, and makes each component class easier to read because it only consumes variables instead of re-implementing state logic.

---

## Use math, not just states

Once we move state into variables, we can also treat state as a number and start doing calculations.

Instead of assigning full visual values for every state, we can define a single numeric variable:

```css
body {
  /* ... */
  &:has([data-state="one"]:checked) { --state: 1; }
  &:has([data-state="two"]:checked) { --state: 2; }
  &:has([data-state="three"]:checked) { --state: 3; }
  &:has([data-state="four"]:checked) { --state: 4; }
  &:has([data-state="five"]:checked) { --state: 5; }
}
```

Now we can take that value and use it in calculations on any element we want. For example, we can drive the background color directly from the active state:

```css
.card {
  background-color: hsl(calc(var(--state) * 60) 50% 50%);
}
```

And if we define an index variable like `--i` per item (at least until [**`sibling-index()`**](/css-tricks.com/almanac-functions/sibling-index.md) is more widely available), we can calculate each item’s style, like position and opacity, relative to the active state and its place in the sequence.

```css
.card {
  position: absolute;
  transform:
    translateX(calc((var(--i) - var(--state)) * 110%))
    scale(calc(1 - (abs(var(--i) - var(--state)) * 0.3)));
  opacity: calc(1 - (abs(var(--i) - var(--state)) * 0.4));
}
```

This is where the pattern becomes really fun: one `--state` variable drives an entire visual system. You are no longer writing separate style blocks for every card in every state. You define a rule once, give each item its own index (`--i`), and let CSS do the rest.

<CodePen
  link="https://codepen.io/amit_sheen/pen/zxKpgRz/e738832facbec02af08fb0634f713caf"
  title="The Radio State Machine - Demo 06"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Not every state flow should loop

You may have noticed that unlike the earlier demos, the last example was not circular. Once you reach the last state, you get stuck there. This is because I removed the rule that shows the first radio button when the last one is checked, and instead added a `disabled` radio button as a placeholder that appears when the last state is active.

```html
<input type="radio" name="state" disabled>
```

This pattern is useful for progressive flows like onboarding steps, checkout progress, or multi-step setup forms where the final step is a real endpoint. That said, the states are still accessible through keyboard navigation, and that is a good thing, unless you don’t want it to be.

In that case, you can replace the `position`, `pointer-events`, and `opacity` properties with `display: none` as a default, and `display: block` (or `inline-block`, etc.) for the one that should be visible and interactive. This way, the hidden states will not be focusable or reachable by keyboard users, and the flow will be truly linear.

<CodePen
  link="https://codepen.io/amit_sheen/pen/WbGzONO/1b7e1f863d2b762b3881eaa7e86e880a"
  title="The Radio State Machine - Demo 06-2"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Bi-directional flows

Of course, interaction should not only move forward. Sometimes users need to go back too, so we can add a “Previous” button by also showing the radio button that points to the previous state in the sequence.

To update the CSS so each state reveals not one, but two radio buttons, we need to expand the selectors to target both the next and previous buttons for each state. We select the next button like before, using the adjacent sibling combinator (`+`), and the previous button using `:has()` to look for the checked state on the next button (`:has(+ :checked)`).

```css
input[name="state"] {
  position: fixed;
  pointer-events: none;
  opacity: 0;
  /* other styles */
  
  &:has(+ :checked),
  &:checked + &  {
    position: relative;
    pointer-events: all;
    opacity: 1;
  }

  /* Set text to "Next" as a default */
  &::after {
    content: "Next";
  }

  /* Change text to "Previous" when the next state is checked */
  &:has(+ :checked)::after {
    content: "Previous";
  }
}
```

This way, users can navigate in either direction through the states.

<CodePen
  link="https://codepen.io/amit_sheen/pen/GgjQYQg/198ea1b339a6dd21d6b9cbb286ec2d2a"
  title="The Radio State Machine - Demo 07"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This is a simple extension of the previous logic, but it gives us much more control over the flow of the state machine, and allows us to create more complex interactions while still keeping the state management in CSS.

---

## Accessibility notes

Before wrapping up, one important reminder: this pattern should stay visual in responsibility, but accessible in behavior. Because the markup is built on real form controls, we already get a strong baseline, but we need to be deliberate about accessibility details:

- Make the radio buttons clearly interactive (cursor, size, spacing) and keep their wording explicit.
- Keep visible focus styles so keyboard users can always track where they are.
- If a step is not available, communicate that state clearly in the UI, not only by color.
- Respect reduced motion preferences when state changes animate layout or opacity.
- If state changes carry business meaning (validation, persistence, async data), hand that part to JavaScript and use CSS state as the visual layer.

In short: the radio state machine works best when it enhances interaction, not when it replaces semantics or application logic.

---

## Closing thoughts

The radio state machine is one of those CSS ideas that feels small at first, and then suddenly opens a lot of creative doors.

<CodePen
  link="https://codepen.io/amit_sheen/pen/myrxMzG/8958cf587491c7b17721fe15e75bc98e"
  title="The Radio State Machine - Demo 08"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

With a few well-placed inputs, and a couple of smart selectors, we can build interactions that feel alive, expressive, and surprisingly robust, all while keeping visual state close to the layer that actually renders it.

But it is still just that: an idea.

Use it when the state is mostly visual, local, and interaction-driven. Skip it when the flow depends on business rules, external data, persistence, or complex orchestration.

Believe me, if there were a prize for forcing complex state management into CSS just because we technically can, I would have won it long ago. The real win is not proving CSS can do everything, but learning exactly where it shines.

So here is the challenge: pick one tiny UI in your project, rebuild it as a mini state machine, and see what happens. If it becomes cleaner, keep it. If it gets awkward, roll it back with zero guilt. And don’t forget to share your experiments.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Radio State Machine",
  "desc": "One of the best-known examples of CSS state management is the checkbox hack. What if we want a component to be in one of three, four, or seven modes? That is where the Radio State Machine comes in.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-radio-state-machine.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
