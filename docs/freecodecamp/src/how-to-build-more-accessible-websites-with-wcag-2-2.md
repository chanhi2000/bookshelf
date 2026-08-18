---
lang: en-US
title: "How to Build More Accessible Websites with WCAG 2.2"
description: "Article(s) > How to Build More Accessible Websites with WCAG 2.2"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Design
  - System
  - Accessibility
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
  - design
  - system
  - a11y
  - accessibility
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build More Accessible Websites with WCAG 2.2"
    - property: og:description
      content: "How to Build More Accessible Websites with WCAG 2.2"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-more-accessible-websites-with-wcag-2-2.html
prev: /programming/css/articles/README.md
date: 2026-08-19
isOriginal: false
author:
  - name: Aiyedogbon Abraham
    url: https://freecodecamp.org/news/author/abrahamaiyedogbon/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5cb22632-e793-40cc-9ded-4b813430e708.png
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
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build More Accessible Websites with WCAG 2.2"
  desc="A website can look polished, work perfectly with a mouse, and still be difficult for some people to use. A form might use colour as the only indication that something went wrong. A sticky header might"
  url="https://freecodecamp.org/news/how-to-build-more-accessible-websites-with-wcag-2-2"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5cb22632-e793-40cc-9ded-4b813430e708.png"/>

A website can look polished, work perfectly with a mouse, and still be difficult for some people to use.

A form might use colour as the only indication that something went wrong. A sticky header might completely cover the element that currently has keyboard focus. A login form might prevent users from pasting a password from their password manager. Or a custom button might work when clicked with a mouse but do nothing when someone uses a keyboard.

These are development decisions, not problems that only appear during an accessibility audit.

The Web Content Accessibility Guidelines (WCAG) provide a common standard for identifying and reducing many of these barriers. WCAG 2.2 is the latest WCAG 2 Recommendation, and the World Wide Web Consortium (W3C) advises developers and organisations to use WCAG 2.2 whenever possible.

This article focuses on the WCAG 2.2 Level A and AA requirements that frequently affect frontend development. The aim is to show how accessibility requirements connect to frontend development decisions.

---

## What Is WCAG 2.2?

WCAG stands for **Web Content Accessibility Guidelines**. W3C develops the standard to describe how web content can be made more accessible to people with disabilities.

WCAG 2.2 organises its requirements into principles, guidelines, and testable success criteria. The success criteria are technology-independent, which is important because WCAG doesn't exist specifically for HTML, React, WordPress, or any other implementation technology.

Consider this hierarchy:

```text
Principle: Operable

    Guideline 2.1: Keyboard Accessible

        Success Criterion 2.1.1: Keyboard
```

The principle gives you the broad accessibility objective. The guideline narrows that objective, while the success criterion provides the testable requirement.

W3C also publishes resources such as [<VPIcon icon="iconfont icon-w3c"/>Understanding WCAG 2.2](https://w3.org/WAI/WCAG22/Understanding/), [<VPIcon icon="iconfont icon-w3c"/>How to Meet WCAG 2.2](https://w3.org/WAI/WCAG22/quickref/), and [<VPIcon icon="iconfont icon-w3c"/>Techniques for WCAG 2.2](https://w3.org/WAI/WCAG22/Techniques/). These resources explain the success criteria and provide implementation approaches, examples, and known failures. They're informative rather than part of the normative WCAG requirements.

A W3C technique can show one recognised way to satisfy a criterion, but WCAG generally doesn't require you to use that exact technique. Another implementation can also be valid if it meets the actual success criterion.

---

## How WCAG Conformance Works

WCAG defines three conformance levels: **A, AA,** and **AAA**.

The levels build on one another. A page can't claim Level AA conformance by satisfying only the criteria labelled AA. It must satisfy all applicable Level A and Level AA success criteria. Level AAA similarly includes A, AA, and AAA requirements.

This distinction is important because accessibility discussions sometimes reduce WCAG to individual checks.

You might fix the keyboard interaction on a menu, add alternatives to your images, and correct several contrast problems. Those are useful accessibility improvements, but they don't automatically make the entire website "WCAG AA compliant".

WCAG conformance applies to complete web pages. When a process requires several pages to complete, such as a checkout process, all pages in that process must conform at the claimed level.

The examples in this article therefore demonstrate ways to address particular accessibility requirements. They don't constitute a conformance claim for an entire application.

---

## How the Four WCAG Principles Work

WCAG groups its guidelines under four principles commonly remembered with the acronym **POUR**: Perceivable, Operable, Understandable, and Robust.

**Perceivable** means users need to be able to perceive the information you provide. Text alternatives, captions, contrast, and adaptable layouts fall under this principle.

**Operable** concerns how people interact with the interface. Keyboard operation, focus behaviour, navigation, pointer interactions, and timing are examples.

**Understandable** deals with whether users can understand the information and the way the interface behaves. Form instructions, useful error messages, predictable interfaces, and accessible authentication are relevant here.

**Robust** concerns whether browsers and assistive technologies can correctly interpret the content. Semantic HTML, accessible names, roles, values, and states are central to this principle.

These categories are useful, but accessibility problems rarely respect the boundary between HTML, CSS, and JavaScript.

A custom dropdown, for example, might need semantic information in the markup, visible focus styling in CSS, and correct keyboard behaviour in JavaScript.

Accessibility therefore works best when it forms part of the implementation itself rather than becoming a separate task at the end of development.

---

## How to Start with Semantic HTML

One of the most useful accessibility decisions happens before you write any ARIA: choosing the correct HTML element.

Consider this:

```html
<div onclick="submitForm()">Submit</div>
```

A mouse user may be able to click the element, but a `div` doesn't automatically behave like a button.

Compare it with this:

```html
<button type="submit">Submit</button>
```

The native `button` already communicates its role to the browser and provides the expected keyboard behaviour.

This relates to [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 4.1.2 Name, Role, Value](https://w3.org/TR/WCAG22/#name-role-value), which requires user interface components to expose information such as their name and role programmatically. W3C notes that standard controls already provide much of this information when developers use them according to their specification.

The practical implication is simple: don't recreate browser behaviour unless you need to.

### How Semantic HTML Communicates Page Structure

Semantic HTML also helps expose relationships between parts of a page.

You could build a page like this:

```html
<div class="top">
  ...
</div>

<div class="navigation">
  ...
</div>

<div class="content">
  <div class="title">Account Settings</div>
  ...
</div>
```

The classes may create the visual layout you want, but they don't necessarily communicate the same structure programmatically.

A more meaningful structure could be:

```html
<header>
  ...
</header>

<nav aria-label="Primary">
  ...
</nav>

<main id="main-content">
  <h1>Account Settings</h1>
  ...
</main>
```

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.3.1 Info and Relationships](https://w3.org/TR/WCAG22/#info-and-relationships) requires structure and relationships communicated visually to also be programmatically determinable or available in text. Semantic markup can provide this information without requiring developers to recreate it with additional accessibility attributes.

This doesn't mean that using `<main>`, `<nav>`, and `<h1>` automatically makes a page accessible. It means you're giving the browser more accurate information about what the content represents.

### How to Add a Skip Link

Repeated page navigation creates another issue.

If a page has a large navigation menu, a keyboard user may otherwise need to move through those links every time before reaching the main content.

A skip link provides another path:

```html
<a class="skip-link" href="#main-content">
  Skip to main content
</a>

<header>
  ...
</header>

<nav aria-label="Primary">
  ...
</nav>

<main id="main-content">
  ...
</main>
```

You can position the link outside the normal view until it receives keyboard focus:

```css
.skip-link {
  position: absolute;
  top: -4rem;
  left: 1rem;
}

.skip-link:focus {
  top: 1rem;
}
```

This is one recognised way to support [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.4.1 Bypass Blocks](https://w3.org/TR/WCAG22/#bypass-blocks), which requires a mechanism for bypassing blocks of repeated content. WCAG requires the outcome rather than this exact CSS implementation.

The broader principle is worth keeping: **use HTML's existing semantics before adding custom semantics yourself**.

---

## How to Write Useful Text Alternatives for Images

Adding `alt` text is one of the best-known accessibility practices, but the rule is often oversimplified.

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.1.1 Non-text Content](https://w3.org/TR/WCAG22/#non-text-content) requires non-text content to have a text alternative that serves an equivalent purpose, subject to several exceptions. Decorative content, for example, should be implemented so assistive technologies can ignore it.

The important word is **purpose**.

Consider this image:

```html
<img src="revenue-chart.png" alt="Chart">
```

The alternative tells the user that the page contains a chart. It doesn't communicate anything the chart actually tells a sighted user.

If the main message is the change in revenue, an alternative could be:

```html
<img
  src="revenue-chart.png"
  alt="Revenue increased from £1.2 million in 2024 to
       £1.8 million in 2025."
>
```

That doesn't mean every chart can be reduced to one sentence.

If the chart contains several data series or detailed values that readers need, you may also need a nearby explanation, accessible table, or another way of communicating the underlying information.

The alternative should reflect what the image contributes in its context.

### How to Handle Decorative Images

A decorative image serves a different purpose.

Consider a visual divider:

```html
<img src="decorative-line.svg" alt="">
```

The empty `alt` value indicates that the image doesn't contribute information that needs to be announced.

A missing `alt` attribute and `alt=""` are therefore not interchangeable. The empty alternative is an intentional decision.

### How to Handle Icons Inside Controls

Now consider a search button containing a magnifying-glass SVG.

The relevant information isn't that the user is looking at a magnifying glass. The important information is that the control starts a search.

```xml
<button type="submit" aria-label="Search">
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M10 4a6 6 0 1 0 0 12a6 6 0 0 0 0-12Z"></path>
    <path d="m14.5 14.5 5 5"></path>
  </svg>
</button>
```

The button receives the accessible name `Search`, while the SVG itself doesn't add duplicate information.

When deciding what alternative to provide, ask a more useful question than "What does this image look like?"

Ask: **What information or function would the user lose if they couldn't perceive this image visually?** That distinction matters when implementing accessibility.

---

## How to Handle Colour, Contrast, Text Resizing, and Reflow

Accessibility also affects ordinary CSS decisions.

A layout may look correct at your preferred viewport size and still become difficult to use when somebody changes the way content is displayed.

### How to Avoid Relying Only on Colour

Imagine a form that changes an input border from grey to red when validation fails:

```css
.input {
  border: 1px solid #777;
}

.input.error {
  border-color: red;
}
```

The colour communicates that something changed, but a user needs to perceive that colour difference to understand the state.

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.1 Use of Color](https://w3.org/TR/WCAG22/#use-of-color) requires colour not to be the only visual means used to convey information, indicate an action, prompt a response, or distinguish a visual element.

An improved implementation can combine styling with actual text:

```html
<label for="email">Email address</label>

<input
  id="email"
  name="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
>

<p id="email-error">
  Enter an email address in the format name@example.com.
</p>
```

You can still use a red border. It just shouldn't carry the message alone.

### How to Check Text Contrast

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.3 Contrast (Minimum)](https://w3.org/TR/WCAG22/#contrast-minimum) requires regular text to have a contrast ratio of at least **4.5:1**. Qualifying large-scale text has a minimum ratio of **3:1**, subject to the criterion's exceptions.

Don't judge contrast only by looking at the colours. Two colours can look sufficiently different on your display while still falling below the required ratio. Use a contrast-testing tool as part of your design and development process.

### How Non-Text Contrast Differs from Text Contrast

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.11 Non-text Contrast](https://w3.org/TR/WCAG22/#non-text-contrast) deals with visual information needed to identify interface components, states, and meaningful graphical objects. The required ratio is generally **3:1** against adjacent colours, subject to the criterion's scope and exceptions.

This can affect things such as custom form controls, meaningful icons, component boundaries, selected states, and graphical information.

Passing the text contrast requirement therefore doesn't automatically mean the rest of the interface has sufficient contrast.

### How to Support Text resizing

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.4 Resize Text](https://w3.org/TR/WCAG22/#resize-text) requires text, with specified exceptions, to be resizable up to 200% without loss of content or functionality.

Fixed dimensions often expose problems here.

Consider:

```css
.card {
  height: 180px;
  overflow: hidden;
}
```

If text grows beyond the space the developer assumed it would need, some content can disappear.

Where the design doesn't genuinely require a fixed height, allowing the component to grow is safer:

```css
.card {
  min-height: 180px;
}
```

This doesn't prove that the component passes the criterion. You still need to resize the text and inspect the result.

The CSS simply removes one common source of failure.

### How to Design for Reflow

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.10 Reflow](https://w3.org/TR/WCAG22/#reflow) addresses the ability to use content at narrow equivalent dimensions without losing information or functionality or requiring prohibited two-dimensional scrolling.

For vertically scrolling content, the criterion uses a width equivalent to **320 CSS pixels**. Certain content, such as some maps and data tables, may genuinely require two-dimensional layout and falls under the criterion's exceptions.

A flexible layout can help ordinary content adapt:

```css
.settings-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
}
```

As space decreases, the cards move onto new rows rather than forcing the entire page to remain wide.

Responsive design helps here, but "responsive" and "accessible" aren't synonyms.

A responsive page can still hide controls, clip text, overlap content, or remove functionality at high zoom. Test the behaviour rather than assuming a media query solves the accessibility requirement.

---

## How to Make an Interface Work with a Keyboard

One of the simplest manual accessibility tests is to put the mouse aside and use the application with a keyboard.

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.1.1 Keyboard](https://w3.org/TR/WCAG22/#keyboard) requires functionality to be operable through a keyboard interface except where the underlying function genuinely depends on the path of the user's movement. WCAG doesn't prevent the interface from also supporting mouse, touch, voice, or other forms of input.

Let's return to our custom control:

```html
<div onclick="saveSettings()">Save</div>
```

Making the `div` look like a button doesn't give it button behaviour.

You could begin rebuilding that behaviour yourself:

```html
<div
  role="button"
  tabindex="0"
>
  Save
</div>
```

But now your JavaScript must also provide the appropriate keyboard interaction.

In most cases, this is unnecessary:

```html
<button type="button">
  Save
</button>
```

Native controls reduce the amount of interaction behaviour you need to reproduce.

W3C's ARIA Authoring Practices Guide makes this distinction explicit: ARIA roles don't cause browsers to add the keyboard behaviour that comes with native HTML controls. If you create a custom ARIA widget, you're responsible for implementing those interactions.

### How to Check for Keyboard Traps

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.1.2 No Keyboard Trap](https://w3.org/TR/WCAG22/#no-keyboard-trap) addresses situations where keyboard focus enters a component but can't leave through a keyboard interface.

This is particularly relevant to custom editors, dialogs, embedded widgets, and other complex controls.

Keyboard testing should go beyond asking whether you can press `Tab` until an element receives focus.

Try to complete the actual task. If you open a dialog, can you use its controls and close it? If you enter a custom widget, can you leave it? If a menu opens, can you operate it using its expected keyboard pattern?

Keyboard accessibility concerns the whole interaction, not simply whether an element appears in the tab order.

---

## How to Keep Keyboard Focus Visible

Keyboard navigation becomes difficult when users can't tell which element currently has focus.

This CSS is therefore risky:

```css
*:focus {
  outline: none;
}
```

It removes the browser's default focus indication without providing an alternative.

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.4.3 Focus Order](https://w3.org/TR/WCAG22/#focus-order) requires a keyboard-operable interface to provide a mode in which the keyboard focus indicator is visible.

If the default outline doesn't fit your design, replace it with another visible focus treatment rather than simply removing it:

```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

This is an example, not a guarantee of conformance. Your chosen indicator still needs to remain visible against the colours surrounding the component.

### How WCAG 2.2 Deals with Obscured Focus

WCAG 2.2 added [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.4.11 Focus Not Obscured (Minimum)](https://w3.org/TR/WCAG22/#focus-not-obscured-minimum) at Level AA.

When a user interface component receives keyboard focus, author-created content must not completely hide it. The Level AA criterion requires at least part of the focused component to remain visible.

A sticky header illustrates the problem:

```css
.site-header {
  position: sticky;
  top: 0;
  height: 5rem;
}
```

There's nothing inherently inaccessible about a sticky header. The problem occurs if the page scrolls a focused link or control entirely behind that header.

CSS such as this can help when scroll positioning is involved:

```css
html {
  scroll-padding-top: 6rem;
}
```

But don't treat it as a complete fix.

Test the real keyboard interaction because cookie notices, fixed bottom navigation, chat windows, sticky toolbars, and other overlays can create similar problems.

The important requirement is the outcome: when focus moves, the user should still be able to see the focused component.

---

## How to Design Pointer Targets and Dragging Interactions

Keyboard support doesn't cover every interaction barrier.

WCAG 2.2 introduced additional requirements that are particularly relevant to touchscreens, drag-and-drop interfaces, and compact controls.

### How to Provide an Alternative to Dragging

Imagine a task board where users reorder cards only by dragging them.

Dragging may work well for many users, but it depends on pressing a pointer, moving it while maintaining that interaction, and releasing it in the correct place.

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.5.7 Dragging Movements](https://w3.org/TR/WCAG22/#dragging-movements) requires functionality that uses a dragging movement to also be achievable without dragging through a single-pointer operation, unless dragging is essential to the function.

You can keep drag-and-drop while providing another control:

```html
<article class="task">
  <h3>Prepare monthly report</h3>

  <button type="button">
    Move up
  </button>

  <button type="button">
    Move down
  </button>
</article>
```

The exact reorder logic depends on your application.

The important part is that the user has another pointer-based way to perform the same function without having to drag the card.

WCAG isn't saying "don't use drag-and-drop". It's saying that dragging shouldn't unnecessarily become the only route to the functionality.

### How to Think About Target Size

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.5.8 Target Size (Minimum)](https://w3.org/TR/WCAG22/#target-size-minimum) is another WCAG 2.2 Level AA addition.

The criterion uses a minimum target size of **24 by 24 CSS pixels** or a defined spacing alternative and contains several exceptions. It therefore should not be simplified to "every clickable element must always be at least 24 pixels wide and high".

For an isolated icon button, you can choose to provide an even larger target:

```css
.icon-button {
  min-width: 2.75rem;
  min-height: 2.75rem;

  display: inline-grid;
  place-items: center;
}
```

At a typical root font size, this deliberately creates a target larger than the WCAG minimum.

The visible icon can remain smaller:

```xml
<button
  class="icon-button"
  type="button"
  aria-label="Delete invoice"
>
  <svg
    width="16"
    height="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 4h10M6 4V2h4v2M5 6v7M8 6v7M11 6v7"></path>
  </svg>
</button>
```

The size of the icon and the size of the interactive target are not the same thing.

That distinction is useful when designing dense interfaces.

### How to Keep the Accessible Name Aligned with the Visible Label

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.5.3 Label in Name](https://w3.org/TR/WCAG22/#label-in-name) concerns controls that have a visible text label.

The accessible name should contain the visible label text. This is particularly important for users who operate interfaces using speech and refer to controls by the words they can see.

Avoid this:

```html
<button aria-label="Find products">
  Search
</button>
```

The visible label is `Search`, but the accessible name is `Find products`.

In this case, the simplest version is better:

```html
<button>
  Search
</button>
```

If additional accessible context is genuinely necessary, retain the visible wording:

```html
<button aria-label="Search products">
  Search
</button>
```

Before adding an `aria-label`, check whether the visible text already gives the control an adequate accessible name.

---

## How to Build More Accessible Forms

Forms combine several areas of accessibility: structure, instructions, errors, input purpose, and status changes.

Start with the field itself.

### How to Label Form Controls

This pattern is common:

```html
<input
  type="email"
  name="email"
  placeholder="Email address"
>
```

The placeholder provides a visual hint, but it's not a good replacement for a proper label.

Use:

```html
<label for="email">
  Email address
</label>

<input
  id="email"
  name="email"
  type="email"
>
```

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 3.3.2 Labels or Instructions](https://w3.org/TR/WCAG22/#labels-or-instructions) requires labels or instructions when content requires user input.

The `for` and `id` values also create a programmatic relationship between the label and the field.

### How to Identify Common Input Purposes

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.3.5 Identify Input Purpose](https://w3.org/TR/WCAG22/#identify-input-purpose) applies to fields collecting certain types of information about the user. Their purpose needs to be programmatically determinable when the technology supports it.

HTML's `autocomplete` tokens help communicate common purposes:

```html
<label for="full-name">
  Full name
</label>

<input
  id="full-name"
  name="full-name"
  type="text"
  autocomplete="name"
>

<label for="email">
  Email address
</label>

<input
  id="email"
  name="email"
  type="email"
  autocomplete="email"
>
```

This also allows browsers and other tools to provide useful input assistance.

### How to Write Useful Validation Errors

Now consider an error message:

```text
Invalid input.
```

The message tells the user almost nothing: Which input is invalid? What's wrong with it? What needs to change?

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion **3.3.1 Error Identification**](https://w3.org/TR/WCAG22/#error-identification) requires an automatically detected input error to identify the item in error and describe the error in text.

An implementation might look like this:

```html
<label for="email">
  Email address
</label>

<input
  id="email"
  name="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
>

<p id="email-error">
  Enter an email address in the format name@example.com.
</p>
```

`aria-invalid="true"` exposes the invalid state. `aria-describedby` associates the explanation with the field.

More importantly, the message tells the user what needs correcting.

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 3.3.3 Error Suggestion](https://w3.org/TR/WCAG22/#error-suggestion) goes further at Level AA. When the system detects an input error and knows how it can be corrected, it should provide an appropriate suggestion unless doing so would compromise the security or purpose of the content.

The aim isn't to make every error message long. The aim is to make it actionable.

---

## How to Avoid Redundant Entry

Consider a checkout process.

The user enters a delivery address on one step. The next step asks them to type exactly the same address again for billing.

WCAG 2.2 introduced [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 3.3.7 Redundant Entry](https://w3.org/TR/WCAG22/#redundant-entry) at Level A.

When information previously entered by or provided to the user is required again during the same process, the information must generally be auto-populated or available for the user to select. The criterion includes exceptions where re-entry is essential, necessary for security, or where the previous information is no longer valid.

A checkout might offer:

```html
<label>
  <input
    type="checkbox"
    name="billing-same-as-delivery"
  >
  Use my delivery address as my billing address
</label>
```

Notice that the requirement concerns information within the same process. It doesn't mean every website has to remember every value a user entered during earlier visits.

This criterion also shows why accessibility extends beyond screen-reader support.

Reducing unnecessary repetition can lower the cognitive and interaction effort required to complete a task.

---

## How to Keep Help Consistent

WCAG 2.2 also added [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 3.2.6 Consistent Help](https://w3.org/TR/WCAG22/#consistent-help) at Level A.

If certain help mechanisms appear repeatedly across a set of pages, they need to appear in the same relative order unless the user initiates a change. These mechanisms can include human contact details, contact mechanisms, self-help options, and automated contact mechanisms.

Suppose your account pages all provide a support link in the header:

```html
<header>
  <a href="/">Acme</a>

  <nav aria-label="Primary">
    <!-- Navigation links -->
  </nav>

  <a href="/support">Support</a>
</header>
```

Do not move that support mechanism unpredictably between otherwise related pages.

A key nuance is that WCAG 2.2 does **not** require every website to introduce one of these help mechanisms.

The criterion applies when qualifying help is already available and repeated across multiple pages in the same set.

The development implication is therefore mostly about consistency.

If users learn where help appears on one page, avoid making them search for it again on the next.

---

## How WCAG 2.2 Affects Authentication

Authentication is another area that changed in WCAG 2.2. Consider a login form that deliberately blocks paste:

```js
passwordInput.addEventListener("paste", (event) => {
  event.preventDefault();
});
```

That may appear to encourage users to type a password manually, but it can also interfere with mechanisms that reduce the need to remember or transcribe credentials.

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 3.3.8 Accessible Authentication (Minimum)](https://w3.org/TR/WCAG22/#accessible-authentication-minimum) addresses authentication steps that require cognitive function tests.

The Level AA requirement allows such tests when an accepted alternative or assistance mechanism is available. W3C specifically identifies password-manager support and copy-and-paste as mechanisms that can reduce the cognitive burden involved in authentication.

A conventional login form can allow these tools to work:

```html
<label for="username">
  Email address
</label>

<input
  id="username"
  name="username"
  type="email"
  autocomplete="username"
>

<label for="password">
  Password
</label>

<input
  id="password"
  name="password"
  type="password"
  autocomplete="current-password"
>
```

It would be inaccurate to simplify this criterion to "WCAG 2.2 prohibits passwords". It does not.

A password is a cognitive function test, but the criterion permits it when the user has a mechanism that assists with completing that test, such as a password manager that can fill the field.

The same reasoning becomes relevant to multi-factor authentication.

If a process requires a user to read a code on one device and manually transcribe it to another, consider whether the authentication flow offers a path that avoids that cognitive burden. W3C's guidance explicitly discusses authentication processes with several steps and the need for an accessible path through them.

This is a good example of why the exact criterion matters more than a simplified accessibility checklist.

---

## How to Use ARIA Without Replacing HTML

ARIA stands for **Accessible Rich Internet Applications**.

It provides roles, states, and properties that help web applications communicate information that may not otherwise be available to assistive technologies.

ARIA is useful. It's also easy to misuse.

Consider this example:

```html
<div role="button">
  Place order
</div>
```

The `role` tells accessibility APIs that the element represents a button. It doesn't make the element behave like a button.

W3C [<VPIcon icon="iconfont icon-w3c"/>ARIA Authoring Practices Guide](https://w3.org/WAI/ARIA/apg/practices/read-me-first/) describes an ARIA role as a promise. When you use `role="button"`, you take responsibility for providing the expected keyboard and interaction behaviour yourself. ARIA doesn't cause the browser to add that behaviour automatically.

Where a native HTML element already exists, prefer it:

```html
<button type="button">
  Place order
</button>
```

### How ARIA Can Communicate State

ARIA becomes useful when HTML alone doesn't communicate enough about a component's current state.

Consider a disclosure control:

```html
<button
  id="account-options-trigger"
  type="button"
  aria-expanded="false"
  aria-controls="account-options"
>
  Account options
</button>

<div id="account-options" hidden>
  <a href="/profile">Profile</a>
  <a href="/security">Security</a>
</div>
```

You can keep `aria-expanded` in sync with the visible state:

```js
const trigger = document.querySelector(
  "#account-options-trigger"
);

const panel = document.querySelector(
  "#account-options"
);

trigger.addEventListener("click", () => {
  const isExpanded =
    trigger.getAttribute("aria-expanded") === "true";

  trigger.setAttribute(
    "aria-expanded",
    String(!isExpanded)
  );

  panel.hidden = isExpanded;
});
```

The JavaScript does two related things.

It changes whether the panel is hidden, and it updates the accessibility state exposed by the trigger.

If the panel opens visually but `aria-expanded` remains `false`, the interface now communicates two conflicting states.

This illustrates a useful ARIA rule: **ARIA state must describe the interface that actually exists.**

For more complex patterns such as dialogs, comboboxes, tabs, menus, and grids, the W3C [<VPIcon icon="iconfont icon-w3c"/>ARIA Authoring Practices Guide](https://w3.org/WAI/ARIA/apg/) provides documented interaction patterns and examples. W3C also makes clear that APG is implementation guidance rather than a normative accessibility standard.

---

## How to Make Dynamic Status Messages Accessible

Modern interfaces frequently update without loading a new page.

A user might save a profile and see:

```text
Your settings were saved.
```

Or run a search and see:

```text
18 results found.
```

A sighted user can often notice these updates without moving away from the current control.

Assistive technology also needs a programmatic way to identify relevant status messages.

[<VPIcon icon="iconfont icon-w3c"/>Success Criterion 4.1.3 Status Messages](https://w3.org/TR/WCAG22/#status-messages) requires qualifying status messages to be programmatically determinable so assistive technologies can present them without requiring the message itself to receive focus.

For a routine save confirmation, you can use `role="status"`:

```html
<button id="save-settings" type="button">
  Save settings
</button>

<p id="save-status" role="status"></p>
```

Then update its content:

```js
const saveButton = document.querySelector(
  "#save-settings"
);

const saveStatus = document.querySelector(
  "#save-status"
);

saveButton.addEventListener("click", () => {
  saveStatus.textContent =
    "Your settings were saved.";
});
```

The browser can expose that status change to supporting assistive technologies without moving keyboard focus away from the Save button.

Not every dynamic DOM change is a status message.

WCAG defines the term more narrowly. It includes information about the result or success of an action, an application's waiting state, the progress of a process, or the existence of errors when that update doesn't itself constitute a change of context.

Don't make every changing piece of content a live announcement. An excessively chatty interface can create a different usability problem.

Use status semantics for information users need to receive while continuing their current task.

---

## How to Test Your Website for Accessibility

Accessibility testing works best as a combination of methods.

WCAG itself is designed to support testing through both automated tools and human evaluation. An automated scanner can identify many technical problems, but it can't reliably judge every accessibility requirement or determine whether an entire user journey makes sense.

### How to Start with Automated Testing

Automated tools are useful for repeatable technical checks.

They can identify many problems involving accessible names, some contrast failures, invalid ARIA usage, form relationships, and other machine-detectable conditions.

The limitation appears when correctness depends on meaning.

A tool can tell you that an image has an `alt` attribute. It can't always determine whether the text accurately communicates the purpose of the image.

Automation should therefore start the evaluation, not end it.

### How to Perform Keyboard Testing

Open the page, put the mouse aside, and try to complete an actual task using only your keyboard.

Start with `Tab` to move forwards through interactive elements and `Shift + Tab` to move backwards.

Use `Enter` and `Space` to activate controls where appropriate. Custom widgets may also use arrow keys or `Escape` depending on their interaction pattern. The [<VPIcon icon="iconfont icon-w3c"/>ARIA Authoring Practices keyboard guidance](https://w3.org/WAI/ARIA/apg/practices/keyboard-interface/) documents expected behaviour for common widget patterns.

Don't simply press `Tab` a few times and stop.

For example, if you're testing a checkout flow:

1. Navigate to the basket.
2. Change a quantity.
3. Continue to checkout.
4. Move through the form.
5. Submit it.
6. Correct an error.
7. Complete the process.

As you do this, check whether you can reach and operate every required control, move away from every component, follow a sensible focus sequence, see where focus currently is, and avoid having focused content hidden by an overlay.

If something goes wrong, the relevant requirements include [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.1.1 Keyboard](https://w3.org/TR/WCAG22/#keyboard), [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.1.2 No Keyboard Trap](https://w3.org/TR/WCAG22/#no-keyboard-trap), [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.4.3 Focus Order](https://w3.org/TR/WCAG22/#focus-order), [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.4.7 Focus Visible](https://w3.org/TR/WCAG22/#focus-visible), and [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.4.11 Focus Not Obscured (Minimum)](https://w3.org/TR/WCAG22/#focus-not-obscured-minimum).

### How to Test Zoom, Resizing, and Reflow

You can perform a basic zoom test directly in your browser.

In most browsers:

- use <kbd>Ctrl</kbd>+<kbd>+</kbd> on Windows or Linux
- use <kbd>⌘</kbd>+<kbd>+</kbd> on macOS
- use <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>0</kbd> to return to the default zoom

W3C's [<VPIcon icon="iconfont icon-w3c"/>Zoom Easy Check](https://w3.org/WAI/test-evaluate/easy-checks/zoom/) suggests testing at 200%.

As you increase zoom, work through the page and look for:

- clipped text
- overlapping elements
- controls that disappear
- navigation that stops working
- content hidden behind other content
- horizontal scrolling across ordinary page content

Also use a narrow browser window or responsive browser tools to inspect how the content reflows.

This is to verify the behaviour discussed under [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.4 Resize Text](https://w3.org/TR/WCAG22/#resize-text) and [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.10 Reflow](https://w3.org/TR/WCAG22/#reflow).

### How to Test Colour and Contrast

Use a contrast checker or the colour information available in your browser developer tools to measure foreground and background combinations.

Do this for ordinary text as well as important non-text elements such as custom control borders, icons, and state indicators.

Then test colour-dependent information separately.

For example, if an error field turns red, temporarily ignore the colour change and ask whether another visible indication still communicates the error.

These checks correspond to [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.1 Use of Color](https://w3.org/TR/WCAG22/#use-of-color), [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.3 Contrast (Minimum)](https://w3.org/TR/WCAG22/#contrast-minimum), and [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 1.4.11 Non-text Contrast](https://w3.org/TR/WCAG22/#non-text-contrast).

### How to Test Forms Manually

Don't test a form only with valid information. You should deliberately make mistakes to test as many cases as possible.

Leave a required field empty. Enter an incorrectly formatted email address. Submit a value the form should reject.

Then check whether you can:

- identify the field that has a problem
- understand the error message
- determine how to correct it
- reach the error using the keyboard
- correct the information and continue

Also inspect form controls in your browser developer tools to confirm that visible labels and descriptions are associated with the correct fields.

These tests help you verify [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 3.3.1 Error Identification](https://w3.org/TR/WCAG22/#error-identification), [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 3.3.2 Labels or Instructions](https://w3.org/TR/WCAG22/#labels-or-instructions), and [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 3.3.3 Error Suggestion](https://w3.org/TR/WCAG22/#error-suggestion).

### How to Test Pointer and Dragging Interactions

If your interface contains drag-and-drop, complete the action normally first. Then try to perform the same function without dragging.

For example, if you can drag a task into a new position, check whether another pointer-operated control lets you move it as well.

That gives you a practical test for [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.5.7 Dragging Movements](https://w3.org/TR/WCAG22/#dragging-movements).

For small controls, use browser developer tools to inspect the rendered interactive area rather than judging only the visible icon.

Pay particular attention to close buttons, carousel controls, pagination items, icon buttons, and densely packed toolbars when checking [<VPIcon icon="iconfont icon-w3c"/>Success Criterion 2.5.8 Target Size (Minimum)](https://w3.org/TR/WCAG22/#target-size-minimum).

### How to Inspect the Accessibility Tree

Modern browser developer tools expose accessibility information associated with elements.

Inspect important controls and compare what the accessibility tree reports with what the interface shows.

A button might visually say `Search` while its accessible name says something completely different. A disclosure may look open while its `aria-expanded` state remains `false`.

Inspecting the accessibility tree helps expose these mismatches.

### How to Test with Assistive Technology

When testing with a screen reader, focus on complete tasks.

For a form, navigate to the fields, identify their labels, enter incorrect information, submit it, locate and understand the errors, correct them, and confirm the successful state.

The question isn't simply:

> **Can the screen reader read this page?**

The more useful question is:

> **Can the user complete the task and understand what happened?**

Testing with disabled users can reveal additional usability barriers that automated and standards-based evaluation may not expose.

---

## Conclusion

WCAG becomes easier to understand when you connect its requirements to normal development decisions. The important shift is to stop treating accessibility as a final audit. Build it into the interface while you build everything else.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build More Accessible Websites with WCAG 2.2",
  "desc": "A website can look polished, work perfectly with a mouse, and still be difficult for some people to use. A form might use colour as the only indication that something went wrong. A sticky header might",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-more-accessible-websites-with-wcag-2-2.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
