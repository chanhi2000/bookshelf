---
lang: en-US
title: "How to Build Responsive and Accessible UI Designs with React and Semantic HTML"
description: "Article(s) > How to Build Responsive and Accessible UI Designs with React and Semantic HTML"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Responsive and Accessible UI Designs with React and Semantic HTML"
    - property: og:description
      content: "How to Build Responsive and Accessible UI Designs with React and Semantic HTML"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-responsive-accessible-ui-with-react-and-semantic-html.html
prev: /programming/js-react/articles/README.md
date: 2026-04-08
isOriginal: false
author:
  - name: Gopinath Karunanithi
    url: https://freecodecamp.org/news/author/gopinathtts/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d2651d02-040d-4c4f-bbfe-ef92097edab4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Build Responsive and Accessible UI Designs with React and Semantic HTML"
  desc="Building modern React applications requires more than just functionality. It also demands responsive layouts and accessible user experiences. By combining semantic HTML, responsive design techniques, "
  url="https://freecodecamp.org/news/build-responsive-accessible-ui-with-react-and-semantic-html"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d2651d02-040d-4c4f-bbfe-ef92097edab4.png"/>

Building modern React applications requires more than just functionality. It also demands responsive layouts and accessible user experiences.

By combining semantic HTML, responsive design techniques, and accessibility best practices (like ARIA roles and keyboard navigation), developers can create interfaces that work across devices and for all users, including those with disabilities.

This article shows how to design scalable, inclusive React UIs using real-world patterns and code examples.

::: note Prerequisites

Before following along, you should be familiar with:

- React fundamentals (components, hooks, JSX)
- Basic HTML and CSS
- JavaScript ES6 features
- Basic understanding of accessibility concepts (helpful but not required)

:::

---

## Overview

Modern web applications must serve a diverse audience across a wide range of devices, screen sizes, and accessibility needs. Users today expect seamless experiences whether they are browsing on a desktop, tablet, or mobile device – and they also expect interfaces that are usable regardless of physical or cognitive limitations.

Two essential principles help achieve this:

- Responsive design, which ensures layouts adapt to different screen sizes
- Accessibility, which ensures applications are usable by people with disabilities

In React applications, these principles are often implemented incorrectly or treated as afterthoughts. Developers may rely heavily on div-based layouts, ignore semantic HTML, or overlook accessibility features such as keyboard navigation and screen reader support.

This article will show you how to build responsive and accessible UI designs in React using semantic HTML. You'll learn how to:

- Structure components using semantic HTML elements
- Build responsive layouts using modern CSS techniques
- Improve accessibility with ARIA attributes and proper roles
- Ensure keyboard navigation and screen reader compatibility
- Apply best practices for scalable and inclusive UI design

By the end of this guide, you'll be able to create React interfaces that are not only visually responsive but also accessible to all users.

---

## Why Accessibility and Responsiveness Matter

Responsive and accessible design isn't just about compliance. It directly impacts usability, performance, and reach.

### Accessibility benefits

- Supports users with visual, motor, or cognitive impairments
- Improves SEO and content discoverability
- Enhances usability for all users

### Responsiveness benefits

- Ensures consistent UX across devices
- Reduces bounce rates on mobile
- Improves performance and scalability

Ignoring these principles can result in broken layouts on smaller screens, poor screen reader compatibility, and limited reach and usability.

---

## Core Principles of Accessible and Responsive Design

Before diving into the code, it’s important to understand the foundational principles.

### 1. Semantic HTML First

Semantic HTML refers to using HTML elements that clearly describe their meaning and role in the interface, rather than relying on generic containers like `<div> or <span>.`These elements provide built-in accessibility, improve SEO, and make code more readable.

For example:

::: code-tabs#html

@tab:active Non-semantic

```html
<div onClick={handleClick}>Submit</div>
```

@tab Semantic

```html
<button type="button" onClick={handleClick}>Submit</button>
```

:::

Another example:

::: code-tabs#html

@tab:active Non-semantic

```html
<div className="header">My App</div>
```

@tab Semantic

```html
<header>My App</header>
```

:::

Using semantic elements such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<button>` helps browsers and assistive technologies (like screen readers) understand the structure and purpose of your UI without additional configuration.

::: important Why this matters:

- Screen readers understand semantic elements automatically
- It supports built-in accessibility (keyboard, focus, roles)
- There's less need for ARIA attributes
- It gives you better SEO and maintainability

:::

### 2. Mobile-First Design

Mobile-first design means starting your UI design with the smallest screen sizes (typically mobile devices) and progressively enhancing the layout for larger screens such as tablets and desktops.

This approach makes sure that core content and functionality are prioritized, layouts remain simple and performant, and users on mobile devices get a fully usable experience.

In practice, mobile-first design involves:

- Using a single-column layout initially
- Applying minimal styling and spacing
- Avoiding complex UI patterns on small screens

Then, you scale up using CSS media queries:

```css
.container {
  display: flex;
  flex-direction: column;
}
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

Here, the default layout is optimized for mobile, and enhancements are applied only when the screen size increases.

::: important Why this approach works

- Prioritizes essential content
- Improves performance on mobile devices
- Reduces layout bugs when scaling up
- Aligns with how most users access web apps today

:::

### 3. Progressive Enhancement

Progressive enhancement is the practice of building a baseline user experience that works for all users (regardless of their device, browser capabilities, or network conditions) and then layering on advanced features for more capable environments.

This approach ensures that core functionality is always accessible, users on older devices or slow networks aren't blocked, and accessibility is preserved even when advanced features fail.

In practice, this means:

- Start with semantic HTML that delivers content and functionality
- Add basic styling with CSS for layout and readability
- Enhance interactivity using JavaScript (React) only where needed

For example, a form should still be usable with plain HTML:

```html
<form>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" />
  <button type="submit">Submit</button>
</form>
```

Then, React can enhance it with validation, dynamic feedback, or animations.

By prioritizing functionality first and enhancements later, you ensure your application remains usable in a wide range of real-world scenarios.

### 4. Keyboard Accessibility

Keyboard accessibility ensures that users can navigate and interact with your application using only a keyboard. This is critical for users with motor disabilities and also improves usability for power users.

Key aspects of keyboard accessibility include:

- Ensuring all interactive elements (buttons, links, inputs) are focusable
- Maintaining a logical tab order across the page
- Providing visible focus indicators (for example, outline styles)
- Supporting keyboard events such as Enter and Space

::: tabs#html

@tab:active Bad Example (Not Accessible)

```html
<div onClick={handleClick}>Submit</div>
```

This element:

- Cannot be focused with a keyboard
- Does not respond to Enter/Space
- Is invisible to screen readers

@tab Good Example

```html
<button type="button" onClick={handleClick}>Submit</button>
```

This automatically supports:

- Keyboard interaction
- Focus management
- Screen reader announcements

@tab Custom Component Example (if needed)

```html
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Submit
</div>
```

:::

But only use this when native elements aren't sufficient.

These principles form the foundation of accessible and responsive design:

- Use semantic HTML to communicate intent
- Design for mobile first, then scale up
- Enhance progressively for better compatibility
- Ensure full keyboard accessibility

Applying these early prevents major usability and accessibility issues later in development.

---

## Using Semantic HTML in React

As we briefly discussed above, semantic HTML plays a critical role in both accessibility (a11y) and code readability. Semantic elements clearly describe their purpose to both developers and browsers, which allows assistive technologies like screen readers to interpret and navigate the UI correctly.

For example, when you use a `<button>` element, browsers automatically provide keyboard support, focus behavior, and accessibility roles. In contrast, non-semantic elements like `<div>`require additional attributes and manual handling to achieve the same functionality.

From a readability perspective, semantic HTML makes your code easier to understand and maintain. Developers can quickly identify the structure and intent of a component without relying on class names or external documentation.

::: code-tabs#html

@tab:active Bad Example (Non-semantic)

```html
<div onClick={handleClick}>Submit</div>
```

Why this is problematic:

- The `<div>`element has no inherent meaning or role
- It is not focusable by default, so keyboard users can't access it
- It does not respond to keyboard events like Enter or Space unless explicitly coded
- Screen readers do not recognize it as an interactive element

To make this accessible, you would need to add:

`role="button"`

`tabIndex="0"`

`Keyboard event handlers`

@tab Good Example (Semantic)

```html
<button type="button" onClick={handleClick}>Submit</button>
```

Why this is better:

- The `<button>` element is inherently interactive
- It is automatically focusable and keyboard accessible
- It supports Enter and Space key activation by default
- Screen readers correctly announce it as a button

This reduces complexity while improving accessibility and usability.

:::

### Why all this matters:

There are many reasons to use semantic HTML.

First, semantic elements like `<button>, <a>,` and `<form>` come with default accessibility behaviors such as focus management and keyboard interaction

It also reduces complexity: you don’t need to manually implement roles, keyboard handlers, or tab navigation

They provide better screen reader support as well. Assistive technologies can correctly interpret the purpose of elements and announce them appropriately

Semantic HTML also improves maintainability and helps other developers quickly understand the intent of your code without reverse-engineering behavior from event handlers

Finally, you'll generally have fewer bugs in your code. Relying on native browser behavior reduces the risk of missing critical accessibility features

Here's another example:

::: code-tabs#html

@tab:active Non-semantic

```html
<div className="nav">
  <div onClick={goHome}>Home</div>
</div>
```

@tab Semantic

```html
<nav>
  <a href="/">Home</a>
</nav>
```

:::

Here, `<nav>` clearly defines a navigation region, and `<a>` provides built-in link behavior, including keyboard navigation and proper screen reader announcements.

---

## Structuring a Page with Semantic Elements

When building a React application, structuring your layout with semantic HTML elements helps define clear regions of your interface. Instead of relying on generic containers like `<div>`, semantic elements communicate the purpose of each section to both developers and assistive technologies.

In the example below, we're creating a basic page layout using commonly used semantic elements such as `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`. Each of these elements represents a specific part of the UI and contributes to better accessibility and maintainability.

```jsx
function Layout() {
  return (
    <>
      {/* Skip link for keyboard and screen reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header>
        <h1>My App</h1>
      </header>

      <nav>
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
      </nav>

      <main id="main-content">
        <section>
          <h2>Dashboard</h2>
        </section>
      </main>

      <footer>
        <p>© 2026</p>
      </footer>
    </>
  );
}
```

Each element in this layout has a specific role:

- The skip link allows screen reader users to skip to the main content
- `<header>`: Represents introductory content or branding
- `<nav>`: Contains navigation links
- `<main>`: Holds the primary content of the page
- `<section>`: Groups related content within the page
- `<footer>`: Contains closing or supplementary information

Using these elements correctly ensures your UI is both logically structured and accessible by default.

### Why this structure is important:

Properly structuring a page like this brings with it many benefits.

For example, it gives you Improved screen reader navigation. This is because semantic elements allow screen readers to identify different regions of the page (for example, navigation, main content, footer). Users can quickly jump between these sections instead of reading the page linearly

It also gives you better document structure. Elements like `<main>` and `<section>` define a logical hierarchy, making content easier to parse for both browsers and assistive technologies

Search engines also use semantic structure to better understand page content and prioritize important sections, resulting in better SEO.

It also makes your code more readable, so other devs can immediately understand the layout and purpose of each section without relying on class names or comments

And it provides built-in accessibility landmarks using elements like `<nav>` and `<main>`, allowing assistive technologies to provide shortcuts for users.

---

## Building Responsive Layouts

Responsive layouts ensure that your UI adapts smoothly across different screen sizes, from mobile devices to large desktop displays. Instead of building separate layouts for each device, modern CSS techniques like Flexbox, Grid, and media queries allow you to create flexible, fluid designs.

In this section, we’ll look at how layout behavior changes based on screen size, starting with a mobile-first approach and progressively enhancing the layout for larger screens.

### Using CSS Flexbox

```css
.container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

On smaller screens (mobile), elements are stacked vertically using `flex-direction: column`, making content easier to read and scroll.

On larger screens (768px and above), the layout switches to a horizontal row, utilizing available screen space more efficiently.

::: important Why this helps:

- Ensures content is readable on small devices without horizontal scrolling
- Improves layout efficiency on larger screens
- Supports a mobile-first design strategy by defining the default layout for smaller screens first and enhancing it progressively

:::

### Using CSS Grid

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

On mobile devices, content is displayed in a single-column layout (`1fr`), ensuring each item takes full width.

On larger screens, the layout shifts to three equal columns using `repeat(3, 1fr)`, creating a grid structure.

::: important Why this helps

- Provides a clean and consistent way to manage complex layouts
- Makes it easy to scale from simple to multi-column designs
- Improves visual balance and spacing across different screen sizes

:::

::: tip React Example

```js
function CardGrid() {
  return (
    <div className="grid">
      <div className="card">Item 1</div>
      <div className="card">Item 2</div>
      <div className="card">Item 3</div>
    </div>
  );
}
```

The React component uses the `.grid` class to apply responsive Grid behavior. Each card automatically adjusts its position based on screen size.

:::

::: important Why this is effective:

- Separates structure (React JSX) from layout (CSS)
- Allows you to reuse the same component across different screen sizes without modification
- Ensures consistent responsiveness across your application with minimal code

:::

By combining Flexbox for one-dimensional layouts and Grid for two-dimensional layouts, you can build highly adaptable interfaces that respond efficiently to different devices and screen sizes.

---

## Accessibility with ARIA

ARIA (Accessible Rich Internet Applications) is a set of attributes that enhance the accessibility of web content, especially when building custom UI components that cannot be fully implemented using native HTML elements.

ARIA works by providing additional semantic information to assistive technologies such as screen readers. It does this through:

- Roles, which define what an element is (for example, button, dialog, menu)
- States and properties, which describe the current condition or behavior of an element (for example, expanded, hidden, live updates)

For example, when you create a custom dropdown using `<div>` elements, browsers don't inherently understand its purpose. By applying ARIA roles and attributes, you can communicate that this structure behaves like a menu and ensure it is interpreted correctly.

Just make sure you use ARIA carefully. Incorrect or unnecessary usage can reduce accessibility. Here's a key rule to follow: use native HTML first. Only use ARIA when necessary.

::: info ARIA is especially useful for:

- Custom UI components (modals, tabs, dropdowns)
- Dynamic content updates
- Complex interactions not covered by standard HTML

:::

Something to note before we get into the examples here: real-world accessibility is complex. For production apps, you should typically prefer well-tested libraries like react-aria, Radix UI, or Headless UI. These examples are primarily for educational purposes and aren't production-ready.

::: tip Example: Accessible Modal

```js
function Modal({ isOpen, onClose }) {
  const dialogRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      ref={dialogRef}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <h2 id="modal-title">Modal Title</h2>
      <button type="button" onClick={onClose}>Close</button>
    </div>
  );
}
```

:::

::: info How this works:

- `role="dialog"` identifies the element as a modal dialog
- `aria-modal="true"` indicates that background content is inactive
- `aria-labelledby` connects the dialog to its visible title for screen readers
- `tabIndex={-1}` allows the dialog container to receive focus programmatically
- Focus is moved to the dialog when it opens
- Pressing Escape closes the modal, which is a standard accessibility expectation

:::

This ensures that users can understand, navigate, and exit the modal using both keyboard and assistive technologies.

### Key ARIA Attributes

#### 1. role

Defines the type of element and its purpose. For example, `role="dialog"` tells assistive technologies that the element behaves like a modal dialog.

#### 2. aria-label

Provides an accessible name for an element when visible text is not sufficient. Screen readers use this label to describe the element to users.

#### 3. aria-hidden

Indicates whether an element should be ignored by assistive technologies. For example, `aria-hidden="true"` hides decorative elements from screen readers.

#### 4. aria-live

Used for dynamic content updates. It tells screen readers to announce changes automatically without requiring user interaction (for example, form validation messages or notifications).

::: tip Example: Accessible Dropdown (Custom Component)

```js
function Dropdown({ isOpen, toggle }) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        onClick={toggle}
      >
        Menu
      </button>

      {isOpen && (
        <ul id="dropdown-menu">
          <li>
            <button type="button" onClick={() => console.log('Item 1')}>
              Item 1
            </button>
          </li>
          <li>
            <button type="button" onClick={() => console.log('Item 2')}>
              Item 2
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
```

:::

::: info How this works:

- `aria-expanded` indicates whether the dropdown is open or closed
- `aria-controls` links the button to the dropdown content via its id
- The `<button>` element acts as the trigger and is fully keyboard accessible
- The `<ul>` and `<li>` elements provide a natural list structure
- Using `<a>` elements ensures proper navigation behavior and accessibility

:::

::: important Why this approach is correct

- It follows standard web patterns instead of application-style menus
- It avoids misusing ARIA roles like role="menu", which require complex keyboard handling
- Screen readers can correctly interpret the structure without additional roles
- It keeps the implementation simple, accessible, and maintainable

:::

If you need advanced menu behavior (like arrow key navigation), then ARIA menu roles may be appropriate – but only when fully implemented according to the ARIA Authoring Practices.

::: note

Most dropdowns in web applications are not true "menus" in the ARIA sense. Avoid using role="menu" unless you are implementing full keyboard navigation (arrow keys, focus management, and so on).

:::

---

## Keyboard Navigation

Keyboard navigation ensures that users can fully interact with your application using only a keyboard, without relying on a mouse. This is essential for users with motor disabilities, but it also benefits power users and developers who prefer keyboard-based workflows.

In a well-designed interface, users should be able to:

- Navigate through interactive elements using the Tab key
- Activate buttons and links using Enter or Space
- Clearly see which element is currently focused

In the example below, we’ll look at common mistakes in keyboard handling and why relying on native HTML elements is usually the better approach.

::: tip Example:

Avoid adding custom keyboard handlers to native elements like `<button>`, as they already support keyboard interaction by default.

For example, this is all you need:

```html
<button type="button" onClick={handleClick}>Submit</button>
```

This automatically supports:

- Enter and Space key activation
- Focus management
- Screen reader announcements

:::

Adding manual keyboard event handlers here is unnecessary and can introduce bugs or inconsistent behavior.

::: info What this example shows

Avoid manually handling keyboard events for native interactive elements like `<button>`. These elements already provide built-in keyboard support and accessibility features.

:::

For example:

```html
<button type="button" onClick={handleClick}>Submit</button>
```

Why this works:

- Supports both Enter and Space key activation by default
- Is focusable and participates in natural tab order
- Provides built-in accessibility roles and screen reader announcements
- Reduces the need for additional logic or ARIA attributes

Adding custom keyboard handlers (like onKeyDown) to native elements is unnecessary and can introduce bugs or inconsistent behavior. Always prefer native HTML elements for interactivity whenever possible.

### Avoiding Common Keyboard Traps

One of the most common keyboard accessibility issues is “trapping users inside interactive components”, such as modals or custom dropdowns. This happens when focus is moved into a component but can't escape using <kbd>Tab</kbd>, <kbd>Shift</kbd>+<kbd>Tab</kbd>, or other keyboard controls. Users relying on keyboards may become stuck, unable to navigate to other parts of the page.

In the example below, you'll see a simple modal that tries to set focus, but doesn’t manage Tab behavior properly.

```js
function Modal({ isOpen }) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (isOpen) ref.current?.focus();
  }, [isOpen]);

  return (
    <div role="dialog">
      <button type="button" ref={ref}>Close</button>
    </div>
  );
}
```

::: info What this code shows:

- When the modal opens, focus is moved to the Close button using `ref.current.focus()`
- The modal uses `role="dialog"` to communicate its purpose

:::

There are some issues with this code that you should be aware of. First, tabbing inside the modal may allow focus to move outside the modal if additional focusable elements exist.

Users may also become trapped if no mechanism returns focus to the triggering element when the modal closes.

There's also no handling of <kbd>Shift</kbd>+<kbd>Tab</kbd> or cycling focus is present.

This demonstrates a **partial focus management**, but it’s not fully accessible yet.

To improve focus management, you can trap focus within the modal by ensuring that Tab and <kbd>Shift</kbd>+<kbd>Tab</kbd> cycle only through elements inside the modal.

You can also return focus to the trigger: when the modal closes, return focus to the element that opened it.

**Example improvement (conceptual):**

```js
function Modal({ isOpen, onClose, triggerRef }) {
  const modalRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      modalref.current?.focus();
      // Add focus trap logic here
    } else {
      triggerref.current?.focus();
    }
  }, [isOpen]);

  return (
    <div role="dialog" ref={modalRef} tabIndex={-1}>
      <button type="button" onClick={onClose}>Close</button>
    </div>
  );
}
```

Remember that this modal is not fully accessible without focus trapping. In production, use a library like `focus-trap-react`, `react-aria`, or Radix UI.

::: important Key points:

- `tabIndex={-1}` allows the div to receive programmatic focus
- Focus trap ensures users cannot tab out unintentionally
- Returning focus preserves context, so users can continue where they left off

:::

::: tip Best practices:

- Always move focus into modals
- Return focus to the trigger element when closed
- Ensure Tab cycles correctly

:::

As a general rule, always prefer native HTML elements for interactivity. Only implement custom keyboard handling when building advanced components that cannot be achieved with standard elements.

---

## Focus Management

Focus management is the practice of controlling where keyboard focus goes when users interact with components such as modals, forms, or interactive widgets. Proper focus management ensures that:

- Users relying on keyboards or assistive technologies can navigate seamlessly
- Focus does not get lost or trapped in unexpected places
- Users maintain context when content updates dynamically

The example below shows a common approach that only partially handles focus:

::: tabs

@tab:active Bad Example

```js
// Bad Example: Automatically focusing input without context
const ref = React.useRef();
React.useEffect(() => {
  ref.current?.focus();
}, []);
<input ref={ref} placeholder="Name" />
```

In the above code, the input receives focus as soon as the component mounts, but there’s no handling for returning focus when the user navigates away.

If this input is inside a modal or dynamic content, users may get lost or trapped. There aren't any focus indicators or context for assistive technologies.

This is a minimal solution that can cause confusion in real applications.

@tab Improved Example
```js
// Improved Example: Managing focus in a modal context
function Modal({ isOpen, onClose, triggerRef }) {  
const dialogRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    } else if (triggerRef?.current) {
      triggerref.current?.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      ref={dialogRef}
    >
      <h2 id="modal-title">Modal Title</h2>
      <button type="button" onClick={onClose}>Close</button>
      <input type="text" placeholder="Name" />
    </div>
  );
}
```

**Explanation:**

- `tabIndex={-1}` enables the dialog container to receive focus
- Focus is moved to the modal when it opens, ensuring keyboard users start in the correct context
- Focus is returned to the trigger element when the modal closes, preserving user flow
- `aria-labelledby` provides an accessible name for the dialog
- Escape key handling allows users to close the modal without a mouse

:::

::: note

For full accessibility, you should also implement focus trapping so users cannot tab outside the modal while it is open.

:::

::: tip

In production applications, use libraries like react-aria, focus-trap-react, or Radix UI to handle focus trapping and accessibility edge cases reliably.

:::

Also, keep in mind here that the document-level keydown listener is global, which affects the entire page and can conflict with other components.

```js
document.addEventListener('keydown', handleKeyDown);
```

A safer alternative is to scope it to the modal:

```js
<div
  onKeyDown={(e) => {
    if (e.key === 'Escape') onClose();
  }}
>
```

For simple cases, attach `onKeyDown` to the dialog instead of the document.

::: tip Best Practice

For complex components, use libraries like `focus-trap-react` or `react-aria` to manage focus reliably, especially for modals, dropdowns, and popovers.

:::

---

## Forms and Accessibility

Forms are critical points of interaction in web applications, and proper accessibility ensures that all users – including those using screen readers or other assistive technologies – can understand and interact with them effectively.

Proper labeling means that every input field, checkbox, radio button, or select element has an associated label that clearly describes its purpose. This allows screen readers to announce the input meaningfully and helps keyboard-only users understand what information is expected.

In addition to labeling, form accessibility includes:

- Providing clear error messages when input is invalid
- Ensuring error messages are announced to assistive technologies
- Maintaining logical focus order so users can navigate inputs easily

::: tabs

@tab:active Bad Example

```html
<input type="text" placeholder="Name" />
```

Why this isn't good:

- This input relies only on a placeholder for context
- Screen readers may not announce the purpose of the field clearly
- Once a user starts typing, the placeholder disappears, leaving no guidance
- Keyboard-only users may not have enough context to know what to enter

@tab Good Example

```html
<label htmlFor="name">Name</label>
<input id="name" type="text" />
```

Why this is better:

- The `<label>` is explicitly associated with the input via `htmlFor / id`
- Screen readers announce "Name" before the input, providing clear context
- Users navigating with Tab understand the field’s purpose
- The label persists even when the user types, unlike a placeholder

:::

::: tip Error Handling:

```html
<label htmlFor="name">Name</label>
<input
  id="name"
  type="text"
  aria-describedby="name-error"
  aria-invalid="true"
/>

<p id="name-error" role="alert">
  Name is required
</p>
```

:::

::: info Explanation

- `aria-describedby` links the input to the error message using the element’s id
- Screen readers announce the error message when the input is focused
- `aria-invalid="true"` indicates that the field currently contains an error
- `role="alert"` ensures the error message is announced immediately when it appears

:::

This creates a clear relationship between the input and its validation message, improving usability for screen reader users.

::: tip

Only apply aria-invalid and error messages when validation fails. Avoid marking fields as invalid before user interaction.

:::

---

## Responsive Typography and Images

Responsive typography and images ensure that your content remains readable and visually appealing across a wide range of devices, from small smartphones to large desktop monitors.

This is important, because text should scale naturally so it remains legible on all screens, and images should adjust to container sizes to avoid layout issues or overflow. Both contribute to a better user experience and accessibility

In this section, we’ll cover practical ways to implement responsive typography and images in React and CSS.

```css
h1 {
  font-size: clamp(1.5rem, 2vw, 3rem);
}
```

In this code:

- The `clamp()` function allows text to scale fluidly:
- The first value (1.5rem) is the “minimum font size”
- The second value (2vw) is the “preferred size based on viewport width”
- The third value (3rem) is the “maximum font size”
- This ensures headings are “readable on small screens” without becoming too large on desktops

Alternative methods include using `media queries` to adjust font sizes at different breakpoints

**Responsive Images:**

```html
<img src="image.jpg" alt="Description" loading="lazy" />
```

In this code, responsive images adapt to different screen sizes and resolutions to prevent layout issues or slow loading times. Key techniques include:

### 1. Fluid images using CSS:

```css
img {
  max-width: 100%;
  height: auto;
}
```

This makes sure that images never overflow their container and maintains aspect ratio automatically.

### 2. Using `srcset` for multiple resolutions:

```html
<img src="image-small.jpg"
     srcset="image-small.jpg 480w,
             image-medium.jpg 1024w,
             image-large.jpg 1920w"
     sizes="(max-width: 600px) 480px,
            (max-width: 1200px) 1024px,
            1920px"
     alt="Description">
```

This provides different image files depending on screen size or resolution and reduces loading times and improves performance on smaller devices.

### 3. Always include descriptive alt text

This is critical for screen readers and accessibility. It also helps users understand the image if it cannot be loaded.

Tip: Combine responsive typography, images, and flexible layout containers (like CSS Grid or Flexbox) to create interfaces that scale gracefully across all devices and maintain accessibility.

### 4. Ensure Sufficient Color Contrast

Low contrast text can make content unreadable for many users.

```css
.bad-text {
  color: #aaa;
}

.good-text {
  color: #222;
}
```

Use tools like WebAIM Contrast Checker and Chrome DevTools Accessibility panel to check your color contrasts. Also note that WCAG AA requires 4.5:1 contrast ratio for normal text.

---

## Building a Fully Accessible Responsive Component (End-to-End Example)

To understand how responsiveness and accessibility work together in practice, let’s build a reusable accessible card component that adapts to screen size and supports keyboard and screen reader users.

### Step 1: Component Structure (Semantic HTML)

```jsx
function ProductCard({ title, description, onAction }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" onClick={onAction}>
        View Details
      </button>
    </article>
  );
}
```

::: important Why This Works

- `<article>` provides semantic meaning for standalone content
- `<h3>` establishes a proper heading hierarchy
- `<button>` ensures built-in keyboard and accessibility support

:::

### Step 2: Responsive Styling

```css
.card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .card {
    padding: 24px;
  }
}
```

This ensures comfortable spacing on mobile and improved readability on larger screens.

### Step 3: Accessibility Enhancements

```html
<button type="button" onClick={onAction}>
  View Details
</button>
```

The visible button text provides a clear and accessible label, so no additional ARIA attributes are needed.

### Step 4: Keyboard Focus Styling

```css
button:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

Focus indicators are essential for keyboard users.

### Step 5: Using the Component

```jsx
function App() {
  return (
    <div className="grid">
      <ProductCard
        title="Product 1"
        description="Accessible and responsive"
        onAction={() => alert('Clicked')}
      />
    </div>
  );
}
```

::: important Key Takeaways

This simple component demonstrates:

- Semantic HTML structure
- Responsive design
- Built-in accessibility via native elements
- Minimal ARIA usage

:::

In real-world applications, this pattern scales into entire design systems.

---

## Testing Accessibility

Accessibility should be validated continuously, not just at the end of development. There are various automated tools you can use to help you with this process:

- Lighthouse (built into Chrome DevTools)
- axe DevTools for detailed audits
- ESLint plugins for accessibility rules

### Manual Testing

But automated tools cannot catch everything. Manual testing is essential to make sure users can navigate using only the keyboard and use a screen reader (NVDA or VoiceOver. You should also test zoom levels (up to 200%) and check the color contrast manually.

::: tip Example: ESLint Accessibility Plugin

```sh
npm install eslint-plugin-jsx-a11y --save-dev
```

:::

This helps catch accessibility issues during development.

::: tip Best Practices

- Use semantic HTML first
- Avoid unnecessary ARIA
- Test keyboard navigation
- Design mobile-first
- Ensure color contrast
- Use consistent spacing

:::

::: warning  When NOT to Overuse Accessibility Features

- Avoid adding ARIA when native HTML works
- Do not override browser defaults unnecessarily
- Avoid complex custom components without accessibility support

:::

::: note Future Enhancements

- Design systems with accessibility built-in
- Automated accessibility testing in CI/CD
- Advanced focus management libraries
- Accessibility-first component libraries

:::

---

## Conclusion

Building responsive and accessible React applications is not a one-time effort—it is a continuous design and engineering practice. Instead of treating accessibility as a checklist, developers should integrate it into the core of their component design process.

If you are starting out, focus on using semantic HTML and mobile-first layouts. These two practices alone solve a large percentage of accessibility and responsiveness issues. As your application grows, introduce ARIA enhancements, keyboard navigation, and automated accessibility testing.

The key is to build interfaces that work for everyone by default. When responsiveness and accessibility are treated as first-class concerns, your React applications become more usable, scalable, and future-proof.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Responsive and Accessible UI Designs with React and Semantic HTML",
  "desc": "Building modern React applications requires more than just functionality. It also demands responsive layouts and accessible user experiences. By combining semantic HTML, responsive design techniques, ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-responsive-accessible-ui-with-react-and-semantic-html.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
