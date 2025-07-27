---
lang: en-US
title: "A Primer on Focus Trapping"
description: "Article(s) > A Primer on Focus Trapping"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Primer on Focus Trapping"
    - property: og:description
      content: "A Primer on Focus Trapping"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/a-primer-on-focus-trapping.html
prev: /programming/js-node/articles/README.md
date: 2025-07-22
isOriginal: false
author:
  - name: Zell Liew
    url : https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/04/tab-key.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Primer on Focus Trapping"
  desc="Focus trapping is about managing focus within an element, such that focus always stays within it. The whole process sounds simple in theory, but it can quite difficult to build in practice, mostly because of the numerous parts to you got to manage."
  url="https://css-tricks.com/a-primer-on-focus-trapping"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/04/tab-key.png"/>

Focus trapping is a term that refers to managing focus within an element, such that focus always stays within it:

- If a user tries to tab out from the last element, we return focus to the first one.
- If the user tries to Shift + Tab out of the first element, we return focus back to the last one.

This whole focus trap thing is used to create accessible modal dialogs since it’s a whole ‘nother trouble to `inert` everything else — [**but you don’t need it anymore**](/css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs.md) if you’re building modals with the `dialog` API (assuming you do it right).

Anyway, back to focus trapping.

The whole process sounds simple in theory, but it can quite difficult to build in practice, mostly because of the numerous parts to you got to manage.

---

## Simple and easy focus trapping with Splendid Labz

If you are not averse to using code built by others, you might want to consider this snippet with the code I’ve created in [<FontIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com/).

The basic idea is:

1. We detect all focusable elements within an element.
2. We manage focus with a keydown event listener.

```js
import { getFocusableElements, trapFocus } from '@splendidlabz/utils/dom'

const dialog = document.querySelector('dialog')

// Get all focusable content
const focusables = getFocusableElements(node)

// Traps focus within the dialog
dialog.addEventListener('keydown', event => {
  trapFocus({ event, focusables })
})
```

The above code snippet makes focus trapping extremely easy.

But, since you’re reading this, I’m sure you wanna know the details that go within each of these functions. Perhaps you wanna build your own, or learn what’s going on. Either way, both are cool — so let’s dive into it.

---

## Selecting all focusable elements

I did research when I wrote about this [<FontIcon icon="fas fa-globe"/>some time ago](https://zellwk.com/blog/keyboard-focusable-elements/). It seems like you could only focus an a handful of elements:

- `a`
- `button`
- `input`
- `textarea`
- `select`
- `details`
- `iframe`
- `embed`
- `object`
- `summary`
- `dialog`
- `audio[controls]`
- `video[controls]`
- `[contenteditable]`
- `[tabindex]`

So, the first step in `getFocusableElements` is to search for all focusable elements within a container:

```js :collapsed-lines
export function getFocusableElements(container = document.body) {

  return {
    get all () {
      const elements = Array.from(
        container.querySelectorAll(
          `a,
            button,
            input,
            textarea,
            select,
            details,
            iframe,
            embed,
            object,
            summary,
            dialog,
            audio[controls],
            video[controls],
            [contenteditable],
            [tabindex]
          `,
        ),
      )
    }
  }
}
```

Next, we want to filter away elements that are `disabled`, `hidden` or set with `display: none`, since they cannot be focused on. We can do this with a simple `filter` function.

```js
export function getFocusableElements(container = document.body ) {

  return {
    get all () {
      // ...
      return elements.filter(el => {
        if (el.hasAttribute('disabled')) return false
        if (el.hasAttribute('hidden')) return false
        if (window.getComputedStyle(el).display === 'none') return false
        return true
      })
    }
  }
}
```

Next, since we want to trap keyboard focus, it’s only natural to retrieve a list of keyboard-only focusable elements. We can do that easily too. We only need to remove all `tabindex` values that are less than `0`.

```js
export function getFocusableElements(container = document.body ) {
  return {
    get all () { /* ... */ },
    get keyboardOnly() {
      return this.all.filter(el => el.tabIndex > -1)
    }
  }
}
```

Now, remember that there are two things we need to do for focus trapping:

- If a user tries to tab out from the last element, we return focus to the first one.
- If the user tries to Shift + Tab out of the first element, we return focus back to the last one.

This means we need to be able to find the first focusable item and the last focusable item. Luckily, we can add `first` and `last` getters to retrieve these elements easily inside `getFocusableElements`.

In this case, since we’re dealing with keyboard elements, we can grab the first and last items from `keyboardOnly`:

```js
export function getFocusableElements(container = document.body ) {
  return {
    // ...
    get first() { return this.keyboardOnly[0] },
    get last() { return this.keyboardOnly[0] },
  }
}
```

We have everything we need — next is to implement the focus trapping functionality.

---

## How to trap focus

First, we need to detect a keyboard event. We can do this easily with `addEventListener`:

```js
const container = document.querySelector('.some-element')
container.addEventListener('keydown', event => {/* ... */})
```

We need to check if the user is:

- Pressing tab (without Shift)
- Pressing tab (with Shift)

[<FontIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com/) has convenient functions to detect these as well:

```js
import { isTab, isShiftTab } from '@splendidlabz/utils/dom'

// ...
container.addEventListener('keydown', event => {
  if (isTab(event)) // Handle Tab
  if (isShiftTab(event)) // Handle Shift Tab
  /* ... */
})
```

Of course, in the spirit of learning, let’s figure out how to write the code from scratch:

- You can use `event.key` to detect whether the Tab key is being pressed.
- You can use `event.shiftKey` to detect if the Shift key is being pressed

Combine these two, you will be able to write your own `isTab` and `isShiftTab` functions:

```js
export function isTab(event) {
  return !event.shiftKey && event.key === 'Tab'
}

export function isShiftTab(event) {
  return event.shiftKey && event.key === 'Tab'
}
```

Since we’re only handling the Tab key, we can use an early return statement to skip the handling of other keys.

```js
container.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return

  if (isTab(event)) // Handle Tab
  if (isShiftTab(event)) // Handle Shift Tab
  /* ... */
}) 
```

We have almost everything we need now. The only thing is to know where the current focused element is at — so we can decide whether to trap focus or allow the default focus action to proceed.

We can do this with `document.activeElement`.

Going back to the steps:

- Shift focus if user Tab on the *last item*
- Shift focus if the user Shift + Tab on the *first* item

Naturally, you can tell that we need to check whether `document.activeElement` is the first or last focusable item.

```js
container.addEventListener('keydown', event => {
  // ...
  const focusables = getFocusableElements(container)
  const first = focusables.first
  const last = focusables.last

  if (document.activeElement === last && isTab(event)) {
    // Shift focus to the first item
  }

  if (document.activeElement === first && isShiftTab(event)) {
    // Shift focus to the last item
  }
})
```

The final step is to use `focus` to bring focus to the item.

```js
container.addEventListener('keydown', event => {
  // ...

  if (document.activeElement === last && isTab(event)) {
    first.focus()
  }

  if (document.activeElement === first && isShiftTab(event)) {
    last.focus()
  }
})
```

That’s it! Pretty simple if you go through the sequence step-by-step, isn’t it?

---

## Final callout to Splendid Labz

As I resolve myself to stop teaching (so much) and begin building applications, I find myself needing many common [<FontIcon icon="fas fa-globe"/>components](https://splendidlabz/docs/astro/), [<FontIcon icon="fas fa-globe"/>utilities](https://splendidlabz/docs/utils/), even [<FontIcon icon="fas fa-globe"/>styles](https://splendidlabz.com/docs/styles/).

Since I have the capability to build things for myself, (plus the fact that I’m super particular when it comes to good DX), I’ve decided to gather these things I find or build into a couple of easy-to-use libraries.

Just sharing these with you in hopes that they will help speed up your development workflow.

Thanks for reading my shameless plug. All the best for whatever you decide to code!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Primer on Focus Trapping",
  "desc": "Focus trapping is about managing focus within an element, such that focus always stays within it. The whole process sounds simple in theory, but it can quite difficult to build in practice, mostly because of the numerous parts to you got to manage.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/a-primer-on-focus-trapping.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
