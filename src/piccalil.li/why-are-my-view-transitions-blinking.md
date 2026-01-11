---
lang: en-US
title: "Why are my view transitions blinking?"
description: "Article(s) > Why are my view transitions blinking?"
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
      content: "Article(s) > Why are my view transitions blinking?"
    - property: og:description
      content: "Why are my view transitions blinking?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/why-are-my-view-transitions-blinking.html
prev: /programming/css/articles/README.md
date: 2025-12-11
isOriginal: false
author:
  - name: Miguel Pimentel
    url : https://piccalil.li/author/miguel-pimentel
cover: https://piccalil.b-cdn.net/api/og-image?slug=why-are-my-view-transitions-blinking/
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
  name="Why are my view transitions blinking?"
  desc="Miguel had been battling an annoying blinking with his view transitions and found the root cause. He’s sharing his learning in this article so you don’t fall into the same trap!"
  url="https://piccalil.li/blog/why-are-my-view-transitions-blinking"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=why-are-my-view-transitions-blinking/"/>

View transitions promise smooth, native animations that make your web app feel polished and professional. The browser handles the heavy lifting for you by taking snapshots, creating pseudo-elements, and animating between states.

When you call `document.startViewTransition()`, the browser creates pseudo-elements (`::view-transition-old()` and `::view-transition-new()`) that represent the before and after states of your content. The browser then animates between these snapshots, creating smooth visual transitions. You can read more on that [**here**](/piccalil.li/start-implementing-view-transitions-on-your-websites-today.md#anatomy-of-a-view-transition).

I spent more time than I’d like to admit debugging view transitions blinks before understanding what was happening. The API seemed straightforward enough, but my transitions kept flashing. Here’s what I learned, so you don’t have to repeat my mistakes.

---

## Beware, it blinks!

You’ve set up view transitions, you click, and… blink. Instead of a smooth morph between states, you get a brief flicker where content disappears and reappears abruptly. Sometimes the transition completes successfully, but then the old content briefly flashes before the new content settles. The flash can be subtle or obvious, but once you notice it, *you can’t unsee it*. This typically occurs in tab interfaces, modals, and other components where content is shown or hidden dynamically.

The blink can also happen when the transition completes instantly rather than animating smoothly. You might see the old content vanish, followed by the new content appearing without any intermediate animation frames. What you expected was a smooth morph; what you got was an abrupt swap.

### But why does it blink?

The browser needs to correlate elements between the old and new states using the `view-transition-name` CSS property. When an element in the old DOM state has the same `view-transition-name` as an element in the new DOM state, the browser creates a smooth animation between them.

The blink occurs when this correlation fails, resulting in the browser falling back to a cross-fade animation. Common causes include:

- The old element doesn’t have a `view-transition-name` assigned before the transition starts.
- Multiple elements share the same `view-transition-name` (each must be unique.)
- The element is hidden via CSS (such as `opacity: 0` and `display: none`) rather than being removed from the DOM.
- The `view-transition-name` is removed or changed at the wrong time.

When correlation fails, the browser has no reference point for creating the transition between states. Instead of smoothly morphing between the correlated element’s state, it falls back to a default cross-fade of the entire viewport. This appears as a blink because no smooth element-to-element morphing occurs; the browser just swaps between the two viewport states.

---

## A tabbed interface example

Tabbed interfaces commonly suffer from the blink because they typically use CSS to toggle visibility between panels rather than manipulating the DOM directly. This pattern breaks the element correlation that view transitions require.

### The broken version

Let me show you exactly how I broke it first. Learning from mistakes is more instructive than pretending I got everything right on the first try.

<CodePen
  user="semanticdata"
  slug-hash="emJYpJM"
  title="Tabs - View Transitions - Old"
  :default-tab="['css','result']"
  :theme="dark"/>

The problematic pattern uses `position: absolute` for all panels and toggles the `active` class:

```js
function switchToTab(targetTabId) {
  withViewTransition(() => {
    // Remove active from all panels
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      panel.style.viewTransitionName = 'none'; // Trying to be clever... (spoiler: doesn't work)
    });

    // Add active to target panel
    const targetPanel = document.getElementById(targetTabId);
    targetPanel.classList.add('active');
    targetPanel.style.viewTransitionName = 'active-tab'; // Only new state identified
  });
}
```

With CSS like:

```css
.tab-panel {
  position: absolute;
  opacity: 0; /* All panels exist, just hidden */
  pointer-events: none;
}

.tab-panel.active {
  opacity: 1; /* Only changes visibility */
  pointer-events: auto;
}
```

This approach fails because:

1. All panels exist in the DOM simultaneously with only visibility differences.
2. Only the new active panel receives a `view-transition-name`, leaving the browser unable to identify which old panel to transition from.
3. Setting `viewTransitionName = 'none'` explicitly breaks the correlation. Critically, attempting to remove the transition name inside the callback is too late, as the browser’s snapshot of the “old” state has already been taken.

When the transition runs, the browser cannot determine which element in the old state corresponds to which element in the new state. The result is an instant swap rather than a smooth animation.

### The working version

Here’s the pattern that actually works:

The working solution performs true DOM manipulation:

```js :collapsed-lines
function switchToTab(targetTabId) {
  const currentPanel = tabContent.querySelector('.tab-panel');
  const currentButton = document.querySelector('.tab-button.active');
  const targetButton = document.querySelector(`[data-tab="${targetTabId}"]`);

if (hasViewTransitions && currentPanel) {
    // KEY: Assign view-transition-name to current panel BEFORE transition
    currentPanel.style.setProperty('view-transition-name', 'active-tab');

    const transition = document.startViewTransition(() => {
      // Update button states (animates the indicator)
      currentButton.classList.remove('active');
      targetButton.classList.add('active');

      // KEY: True DOM manipulation - remove old, create new
      tabContent.innerHTML = ''; // Removes all child elements
      const newPanel = createTabPanel(targetTabId);
      newPanel.style.setProperty('view-transition-name', 'active-tab');
      tabContent.appendChild(newPanel);
    });

    // KEY: Clean up after transition completes
    transition.finished.then(() => {
      const panel = tabContent.querySelector('.tab-panel');
      if (panel) {
        panel.style.removeProperty('view-transition-name');
      }
    });
  }
}
```

This approach succeeds because:

1. The current panel is identified with `view-transition-name` *before* the transition callback executes
2. The old panel is completely removed from the DOM
3. A new panel is created and assigned the same `view-transition-name`
4. The browser can now correlate the old and new elements, creating a smooth animation
5. Cleanup removes the transition name to prevent conflicts

The tab indicator uses a separate `view-transition-name` for independent animation:

```css
.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #007bff;
  view-transition-name: tab-indicator;
}
```

This component separation allows the indicator to slide smoothly while the content transitions independently. Note that the indicator uses a *static* transition name in CSS because it’s always present, just moving between buttons. The content uses *dynamic* naming in JavaScript because panels are created and destroyed with each transition.

---

## Universal principles for smooth transitions(#universal-principles-for-smooth-transitions)

The tabbed interface example demonstrate a key pattern: it solves the core problem by creating and destroying elements. This strategy works because it gives the browser clear before-and-after states. The following principles extract what makes this pattern successful and apply them to any component, regardless of whether you are swapping elements or dynamically managing a single persistent element.

### Don’t mix the old with the new

Each `view-transition-name` must be unique per page at any given time. Having multiple elements with the same transition name creates ambiguity, and the browser cannot determine which elements to correlate.

When transitioning between states, ensure only one element has a specific `view-transition-name` at a time. This is why dynamic assignment works because you assign the name to the old element, perform the transition, assign it to the new element, then clean up.

Silent failure occurs when duplicate names exist. The browser doesn’t throw an error, but the transition doesn’t work as expected.

### Get your hands into that DOM

Visibility-based approaches using `opacity`, `display: none`, or `visibility: hidden` don’t create distinct old and new states. The same element with the same transition name exists before and after, giving the browser nothing to animate between.

True DOM manipulation means:

- Removing the old element completely (`element.remove()` or `container.innerHTML = ''`, which removes all child elements)
- Creating and inserting a new element (`container.appendChild(newElement)`)
- Allowing the browser to see two distinct elements with the same transition name in different states

If your component architecture requires keeping elements in the DOM (for example, for performance reasons with many panels), consider using view transitions only for the active content area and handling inactive states separately.

::: note FYI

When removing elements from the DOM, ensure screen reader announcements are appropriate. [<VPIcon icon="fas fa-globe"/>Sara Soueidan has a fantastic, deep dive here for you](https://sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/).

:::

### When to dynamically name your children

Static `view-transition-name` assignments in CSS create persistent identifiers that can cause conflicts. Instead, assign transition names programmatically just before transitions.

For elements that participate in transitions:

```js
// Before transition
element.style.setProperty('view-transition-name', 'unique-identifier');

// After transition completes
transition.finished.then(() => {
  element.style.removeProperty('view-transition-name');
});
```

For elements that always transition (like indicators or badges), static CSS naming is appropriate:

```css
.notification-badge {
  view-transition-name: notification-badge;
}
```

The distinction is whether the element always exists and always transitions (static naming) or appears and disappears conditionally (dynamic naming).

Component separation extends this principle. When a component has multiple independently animating parts (like tabs with indicators), assign different transition names:

```css
.tab-indicator {
  view-transition-name: tab-indicator;
}

.tab-content {
  /* Assigned dynamically in JavaScript */
}
```

This allows each part to animate independently without interfering with the other.

---

## A Practical implementation checklist(#a-practical-implementation-checklist)

A systematic approach to view transitions prevents common mistakes and ensures reliable behaviour. Let’s break it down so we can learn about what happens before, during, and after transitions.

### Before a transition

**Identify the departing element.** Find the current element that will be replaced. Store a reference to it if you’ll need to access it within the transition callback.

```js
const currentElement = container.querySelector('.active-content');
```

**Assign `view-transition-name`.** Give the current element a unique `view-transition-name`. This must happen *before* calling `startViewTransition()`. That is, before the function is invoked, not just before the callback executes.

```js
if (currentElement) {
  currentElement.style.setProperty('view-transition-name', 'content-transition');
}

// The view-transition-name is assigned BEFORE this line executes
const transition = document.startViewTransition(() => {
  // DOM manipulation happens here
});
```

**Verify uniqueness.** Ensure no other element on the page currently has this `view-transition-name`. Use DevTools to check for duplicate names if transitions aren’t working.

**Check accessibility state.** Ensure the current element has appropriate ARIA attributes that will be replicated in the new element (`role`, `aria-labelledby`, etc.).

### During a transition

**Perform minimal DOM operations.** Keep the transition callback focused. Fetch data and prepare content *before* the transition, not within it.

```js
// Good: prepare first
const newContent = await fetchContent();
document.startViewTransition(() => {
  updateDOM(newContent); // Fast operation
});

// Bad: slow operations block transition
document.startViewTransition(async () => {
  const newContent = await fetchContent(); // Blocks!
  updateDOM(newContent);
});
```

**Assign the `view-transition-name` to the new element.** After creating/revealing the new element, assign it the same `view-transition-name` as the old element.

```js
document.startViewTransition(() => {
  container.innerHTML = '';
  const newElement = createNewElement();
  newElement.style.setProperty('view-transition-name', 'content-transition');
  container.appendChild(newElement);
});
```

**Maintain focus context.** If the old element had focus, ensure the new element receives focus after the transition. Use `element.focus()` at the end of your transition callback.

```js
document.startViewTransition(() => {
  updateDOM();
  newElement.focus(); // Maintain keyboard navigation context
});
```

### After a transition

**Clean up `view-transition-name` values.** Remove dynamic `view-transition-name` values once the animation completes. This prevents naming conflicts in subsequent transitions.

```js
transition.finished.then(() => {
  element.style.removeProperty('view-transition-name');
});
```

**Verify DOM state.** Ensure your new state is fully established. Check that event listeners are attached, ARIA attributes are correct, and the component is interactive.

**Handle focus restoration.** For components that overlay content or temporarily block interaction, ensure focus returns to the appropriate element when they close or hide.

```js
const triggerElement = document.activeElement;

// … later when closing
transition.finished.then(() => {
  triggerElement.focus();
});
```

**Update screen reader context.** If the content change is significant and outside the user’s current focus, use `aria-live` to announce it.

```js
transition.finished.then(() => {
  announcer.textContent = `Switched to ${newTabLabel}`;
});
```

### Common and silent errors

View transitions fail silently, which makes debugging frustrating. The browser doesn’t throw errors — the animation just… doesn’t happen.

**Duplicate `view-transition-name` values.** Multiple elements with the same `view-transition-name`. The broken tabs example demonstrated this issue well for us. All panels existed simultaneously with potential naming conflicts. The solution was to ensure unique names or use dynamic assignment.

**Timing issues.** Assigning `view-transition-name` values after the transition starts. The browser captures state at the moment `startViewTransition()` is called. The solution is to assign names before the function is invoked.

**Persistent names.** This occurs when `view-transition-name` values are not cleaned up after use. When transition names remain attached to hidden or inactive elements, they can interfere with subsequent animations. The solution is to remove transition names in the `finished` callback.

[**CSS specificity**](/piccalil.li/a-primer-on-the-cascade-and-specificity.md) conflicts. Inline styles might be overridden by CSS selectors. The solution is to use `setProperty()` with inline styles or increase CSS specificity.

**Browser support.** View transitions aren’t supported in all browsers (yet). Always [<VPIcon icon="fa-brands fa-firefox"/>check for support](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API#css.at-rules.view-transition) and provide fallbacks and/or lean into [**progressive enhancement**](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md):

```js
function withViewTransition(callback) {
  if ('startViewTransition' in document) {
    return document.startViewTransition(callback);
  } else {
    callback();
    return {
      finished: Promise.resolve(),
      ready: Promise.resolve(),
      updateCallbackDone: Promise.resolve()
    };
  }
}
```

**Memory leaks.** Creating elements without removing them or failing to clean up event listeners. Even though JavaScript is [<VPIcon icon="iconfont icon-piccalilli"/>good at garbage collection](https://piccalil.li/javascript-for-everyone/lessons/25), a good practice is to ensure complete element removal and use `AbortController` for event listener cleanup.

---

## Wrapping up

So what’s the takeaway from all this blinking? The browser needs clear signposts: “this element *was* here, and *now* it’s here.” Miss those signposts, and you get the dreaded blink.

The view transitions blink stems from the browser’s inability to correlate elements between old and new states. This happens when `view-transition-name` assignments are missing, duplicated, or applied at the wrong time.

This debugging experience taught me the core lesson: **the browser needs distinct before-and-after states**. Everything else is implementation details.

The solution is systematic:

1. Explicitly identify old elements before transitions
2. Perform true DOM manipulation rather than visibility toggles
3. Assign matching `view-transition-name` values to new elements
4. Clean up names after transitions complete
5. Maintain accessibility throughout the transition lifecycle

These patterns apply broadly across components. Whether building tabs, modals, carousels, or custom interfaces, the principles remain the same: clear element identity, proper DOM manipulation, and careful lifecycle management.

View transitions offer powerful capabilities for creating smooth, professional animations. Understanding element correlation and following these patterns ensures that capability is realised without the frustrating blink.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why are my view transitions blinking?",
  "desc": "Miguel had been battling an annoying blinking with his view transitions and found the root cause. He’s sharing his learning in this article so you don’t fall into the same trap!",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/why-are-my-view-transitions-blinking.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
