---
lang: en-US
title: "Practical Accessibility Tips You Can Apply Today"
description: "Article(s) > Practical Accessibility Tips You Can Apply Today"
icon: 
category:
  - 
  - Article(s)
tag:
  - blog
  - piccalil.li
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Practical Accessibility Tips You Can Apply Today"
    - property: og:description
      content: "Practical Accessibility Tips You Can Apply Today"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/practical-accessibility-tips-you-can-apply-today.html
prev: /articles/README.md
date: 2024-10-03
isOriginal: false
author:
  - name: Kevin Andrews
    url: https://piccalil.li/author/kevin-andrews
cover: https://piccalil.b-cdn.net/api/og-image?slug=practical-accessibility-tips-you-can-apply-today/
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Practical Accessibility Tips You Can Apply Today"
  desc="Kevin Andrews shares some useful snippets of markup with handy explainers to help you deliver more accessible components."
  url="https://piccalil.li/blog/practical-accessibility-tips-you-can-apply-today"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=practical-accessibility-tips-you-can-apply-today/"/>

We’ve all been there—rushing to meet a deadline, we throw together a dropdown menu or modal without fully considering its accessibility. But what if making a few small changes could drastically improve the experience for a broader range of users? Accessibility doesn’t have to be a daunting task or a compliance box to tick. It’s about creating products that are usable by everyone, no matter their ability, technical literacy, operating system, or device.

In this article, I’ll share practical advice on marking up three common UI patterns the right way. Whether you’re new to accessibility or just need a refresher, these tips will help you build more inclusive interfaces. I also link out to implementations and external resources so you can experience firsthand how these changes affect usability. You’ll see how a few thoughtful adjustments can make all the difference.

---

## Dropdown menus

Dropdown menus are one of the most commonly used UI elements across the web. From navigation bars to filtering systems, they make it easier to present multiple options in a clean and compact way. But while dropdowns may look simple, they’re often built in a way that leaves many users unable to interact with them effectively.

### The problem

The issue with a lot of dropdowns is that they are constructed with generic elements like `<div>` or `<span>` with interaction typically handled through JavaScript. While this might work for a mouse user, someone using a keyboard, screen reader, or other assistive technology will struggle. If dropdowns aren’t properly marked up, users might not even know the options exist or may be unable to navigate them.

### The fix

To make dropdown menus more accessible, the first step is to use semantic HTML. This means using elements that communicate their purpose to the browser and assistive technologies. In this case, using a `<button>` for the dropdown trigger and a `<ul>` for the list of options provides the structure assistive technologies need to interpret the menu correctly.

Next, you’ll want to add ARIA (Accessible Rich Internet Applications) attributes like aria-expanded and aria-controls. These attributes give screen readers additional context, such as whether the menu is open or closed, and which element controls the dropdown.

```html
<button aria-haspopup="true" aria-expanded="false" aria-controls="menu1">Options</button>
<ul id="menu1" role="menu" aria-hidden="true">
  <li role="menuitem">Option 1</li>
  <li role="menuitem">Option 2</li>
</ul>
```

Let’s break it down:

- The `<button>` element with `aria-haspopup="true"` signals to assistive technologies that this button will open a dropdown.
- `aria-expanded="false"` tells the user that the menu is currently closed. This value will change dynamically to true when the menu is open.
- The `<ul>` tag, with its `role="menu"`, ensures that the list is recognized as a menu by screen readers.
- Each `<li>` element has `role="menuitem"`, letting screen readers treat these list items as menu options.
- `aria-hidden="true"` keeps the menu hidden until the user activates it, when it should be removed.

These small changes mean that not only can users interact with your dropdown via keyboard, but they can also receive feedback through their screen readers about the state of the dropdown.

::: note FYI

It’s worth also [**reading this article by Adrian Roselli**](/adrianroselli.com/dont-use-aria-menu-roles-for-site-nav.md) to make sure you have all bases covered.

```component VPCard
{
  "title": "Don’t Use ARIA Menu Roles for Site Nav",
  "desc": "Once again, the advice is in the title of the post. But I will ramble anyway since you scrolled this far. First run with the advice, and then review some background on ARIA and how navigation and menu items are defined. This way you can tap out quickly when it…",
  "link": "/adrianroselli.com/dont-use-aria-menu-roles-for-site-nav.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

---

## Modal dialogs

Modals are extremely useful for displaying important information or capturing user input without navigating away from the page. However, without the correct focus management, they can be incredibly frustrating for users who rely on screen readers or keyboards.

::: critical The problem

A common mistake with modals is not managing focus properly. When a modal is opened, users need to be focused on interacting **within** it, but in many cases, focus isn’t properly trapped inside the modal. This allows users to tab through the rest of the page content, which can be disorienting. Worse, users might not even realize they’re in a modal, making it difficult to know how to close it.

:::

::: tip The fix

The key to making modals more accessible is to trap focus within the modal itself. This means that when a modal is opened, keyboard navigation should cycle only through the elements inside the modal until it is closed. This prevents users from accidentally navigating to content behind the modal and ensures they stay focused on the task at hand.

You can appropriately manage focus trapping with JavaScript, which detects when the modal is opened and ensures focus remains inside. Additionally, adding ARIA attributes like `role="dialog"` and `aria-modal="true"` provides screen readers with the necessary context about the modal’s role and behavior. Here’s a [<VPIcon icon="fa-brands fa-firefox"/>step-by-step guide to do that](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role#focus_management).

```html
<div role="dialog" aria-labelledby="modal-title">
    <h1 id="modal-title">Sign Up</h1>
    <button>Close</button>
    <!-- Modal content -->
</div>
```

Let’s break it down:

- `role="dialog"` informs assistive technologies that this is a dialog window.
- `aria-labelledby="modal-title"` helps users know what the purpose of the dialog is by associating it with the modal’s title.

:::

::: note FYI

The [<VPIcon icon="fa-brands fa-firefox"/>HTML `<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) will give you `role="dialog"` for free.

:::

Additionally, [<VPIcon icon="fa-brands fa-firefox"/>JavaScript should be used to manage the focus](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role#required_javascript_features). When users press the tab key, the focus should loop through the interactive elements within the modal without leaving it. Finally, pressing the esc key should close the modal.

The basic tenants of your JavaScript for focus management should ensure that when a modal opens, the first interactive element inside it (such as a button or input field) receives focus, guiding keyboard users directly to the content. As the user navigates through the modal using the tab key, focus is trapped within the modal, cycling between the first and last focusable elements. If the user tries to tab out of the modal, the script should prevent this by redirecting focus to the opposite end, depending on the direction of their tabbing. When the modal is closed, you need to return focus to the button that opened it, ensuring a smooth and logical user experience.


::: note FYI

This CodePen Demo by Adrian Roselli does a good job of demonstrating the options.

<CodePen
  user="piccalilli"
  slug-hash="MWPKVbd"
  title="Modal Dialog"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

---

## Tabbed interfaces

Tabbed interfaces are a great way to organize content without overwhelming users, but only if they’re structured correctly. When tab navigation is improperly built, users relying on keyboard navigation or screen readers can find it difficult to understand which tab is selected and how to navigate between different sections.

### The problem

Many tabbed interfaces use basic `<div>` or `<span>` tags for tab buttons, which provide no context for assistive technologies. Without ARIA roles, screen readers can’t tell users that a tab is part of a larger tab set or which content corresponds to the selected tab. Additionally, users relying on keyboards may find it impossible to navigate between tabs without arrow key functionality.

### The fix

To fix this, use a combination of ARIA roles and properties. Specifically, `role="tablist"` defines the container for all the tabs, `role="tab"` identifies each tab, and `role="tabpanel”` specifies the content for each tab. Additionally, implement keyboard navigation so users can switch tabs using the arrow keys, making the experience seamless.

```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">Tab 2</button>
</div>
<div id="panel1" role="tabpanel" aria-labelledby="tab1">
  <p>Content for Tab 1.</p>
</div>
<div id="panel2" role="tabpanel" aria-labelledby="tab2">
  <p>Content for Tab 2.</p>
</div>
```

Let’s break it down:

- `role="tablist"` tells screen readers that the container holds a set of tabs.
- Each `role="tab"` button is part of the tab list and is linked to the corresponding tab content using aria-controls.
- `aria-selected="true"` denotes which tab is currently active. Only one tab should have this attribute set to true at a time.
- `role="tabpanel"` ensures that screen readers can navigate the tab content. `aria-labelledby` links the tab panel back to its associated tab for clear context.

To ensure keyboard accessibility, users should be able to switch between tabs using the arrow keys, which mimics the behavior they expect from other interfaces. Additionally, focus should move to the active tab’s content when a new tab is selected.

::: info

For more on how to create accessible tabbed interfaces, check out [<VPIcon icon="fas fa-globe"/>this excellent resource from Inclusive Components](https://inclusive-components.design/tabbed-interfaces/).

```component VPCard
{
  "title": "Tabbed Interfaces",
  "desc": "When you think about it, most of your basic interactions are showing or hiding something somehow. I've already covered popup menu buttons and the simpler and less assuming tooltips and toggletips. You can add simple disclosure widgets, compound ”accordions”, and their sister component the tabbed interface to that list. It's",
  "link": "http://inclusive-components.design/tabbed-interfaces//",
  "logo": "http://inclusive-components.design/favicon.ico",
  "background": "rgba(34,34,34,0.2)"
}
```

:::

---

## Wrapping up

Building accessible UI patterns doesn’t have to be complicated, but it does require attention to detail and a commitment to empathy. As you’ve seen, a few small changes — like using semantic HTML, adding ARIA roles, and managing focus correctly — can make your interfaces far more inclusive. If we want to create a web that works for everyone, we need to prioritize accessibility in every decision we make.

I also recommend that you read [<VPIcon icon="iconfont icon-w3c"/>ARIA Authoring Practices Guide Patterns](https://w3.org/WAI/ARIA/apg/patterns/), which provides a ton of examples to a whole bunch of component types beyond what we discussed and, if you’re going to/need to use ARIA, how to implement them correctly.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Practical Accessibility Tips You Can Apply Today",
  "desc": "Kevin Andrews shares some useful snippets of markup with handy explainers to help you deliver more accessible components.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/practical-accessibility-tips-you-can-apply-today.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
