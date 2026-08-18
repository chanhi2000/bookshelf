---
lang: en-US
title: "Use cases for aria-expanded"
description: "Article(s) > Use cases for aria-expanded"
icon: fa-brands fa-accessible-icon
category:
  - CSS
  - Design
  - System
  - Accessibility
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
  - design
  - system
  - a11y
  - accessibility
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Use cases for aria-expanded"
    - property: og:description
      content: "Use cases for aria-expanded"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/use-cases-for-aria-expanded.html
prev: /academics/system-design/articles/README.md
date: 2026-07-16
isOriginal: false
author:
  - name: Steve Frenzel
    url: https://piccalil.li/author/steve-frenzel
cover: https://piccalil.b-cdn.net/api/og-image?slug=use-cases-for-aria-expanded/
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
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Use cases for aria-expanded"
  desc="Without reading dry documentation, finding the correct use for aria roles can be a challenge, so Steve Frenzel is here to break down the often mis-used aria-expanded."
  url="https://piccalil.li/blog/use-cases-for-aria-expanded"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=use-cases-for-aria-expanded/"/>

Communication can be difficult. Not only when we humans try to communicate with one another, but also in web development.

While it is easy for sighted people with full mental and motor abilities to click a button with a mouse to display more information, users of Assistive Technology (AT) may have a completely different experience with the same action.

The information an expandable button conveys to AT depends heavily on the context. This context also dictates which ARIA attributes should (or should not) be used. Often, the patterns are very similar in their functionality and interpretation and can be interpreted differently by me than by you.

When I conduct accessibility audits, I usually can’t avoid having to check an element that has the `aria-expanded` attribute. One of the challenges I faced was determining what kind of pattern this was, whether `aria-expanded` was appropriate here, or if it could even be replaced by a native HTML element.

This article is intended to help you more easily determine whether `aria-expanded` has been used correctly or not. It’s not about how to implement every pattern discussed here in a production environment! However, in each section, I’ve included additional links so you can dive deeper into the topic.

:::: note FYI

In the following, I will refer to the [<VPIcon icon="iconfont icon-w3c"/>*ARIA Authoring Practices Guide* (APG)](https://w3.org/WAI/ARIA/apg/patterns/). It is important to note that the implementations presented there should be understood as proof-of-concept and *not* ready-to-use accessible patterns! In [**Uncanny A11y**](/adrianroselli.com/uncanny-a11ymd#APG), Adrian Roselli explains in detail why you should be cautious to use these patterns (without testing them thoroughly).

:::

---

## The two categories

As I understand it, collapsible widgets can be divided into two categories: collapsible sections and collapsible interactive elements.

These two categories include patterns that are sometimes very similar, but not identical. In addition, there are patterns that can also reveal and hide content, but these do not require the `aria-expanded` attribute.

---

## Collapsible sections

This category contains two patterns: Accordion and disclosure widget. The former is based on the latter, so let’s take a closer look at the disclosure widget first.

### Disclosure widget

```html
<button
  aria-controls="content"
  aria-expanded="false"
  type="button"
>
  Show more
</button>
<div id="content" >
  <p>I am hidden no more!</p>
</div>
```

This is a basic disclosure widget that requires JavaScript to dynamically change `aria-expanded` from `true` to `false` and to add keyboard support.

`aria-controls` serves as optional support here to establish a direct link between the button and the content. For more information on implementation, see Adrian Roselli’s article [**Disclosure Widgets**](/adrianroselli.com/disclosure-widgets.md).

However, if that is all it needs to do, it is recommended to use the [<VPIcon icon="fa-brands fa-firefox"/>`<details>` and `<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) elements. These two native HTML elements work in all major browsers and are also recognised by AT.

### Accordion

The accordion pattern is more complex because it combines multiple disclosure widgets. Here, too, `aria-expanded` is required to communicate the current state to assistive technologies.

There is also often the “exclusive accordion,” which only allows one disclosure widget to be open at a time and closes the others. Not only has Eric Eggert expressed legitimate doubts about this in his article *[<VPIcon icon="fas fa-globe"/>Exclusive accordions exclude](https://yatil.net/blog/exclusive-accordions)*, but Steven Hoober also explains in [<VPIcon icon="fas fa-globe"/>Designing for Progressive Disclosure](https://uxmatters.com/mt/archives/2020/05/designing-for-progressive-disclosure.php) why this is a user-hostile pattern.

If you still need to build one, it’s recommended to try out Alexander Lehner’s solution in [<VPIcon icon="fas fa-globe"/>Let’s Play Accordion with the HTML details element](https://oidaisdes.org/blog/lets-play-accordion/). Alternatively, Heydon Pickering also has a suggestion on how [<VPIcon icon="fas fa-globe"/>collapsible sections](https://inclusive-components.design/collapsible-sections/) could be implemented.

---

## Collapsible interactive elements

A collapsible section can also contain interactive elements such as links, but this pattern is most often used to hide large amounts of text in order to save vertical space. You can read about why this can be user-hostile in the linked articles from the previous section.

:::: note FYI

While it is technically possible to nest interactive elements within one another, this should be avoided due to potential accessibility issues. Links within the body text of a disclosure widget are perfectly fine. However, you should avoid placing complex interactive patterns within the disclosure widget. For an introduction to this issue, see the article [*Be Wary of Nesting Roles*](https://adrianroselli.com/2016/12/be-wary-of-nesting-roles.html) by Adrian Roselli.

:::

I was able to identify four patterns for collapsible interactive elements that would require `aria-expanded`: menus, navigation, tree views and combo box.

### Navigation

Perhaps because menus and navigation behave so similar, they are often confused with one another. That’s why, in my article [<VPIcon icon="fas fa-globe"/>Menu and Navigation: The Difference](https://stevefrenzel.dev/posts/menu-and-navigation-the-difference/), I explain how to tell them apart. What they do have in common, however, is that when the content becomes extensive, so-called [<VPIcon icon="iconfont icon-w3c"/>fly-out menus](https://w3.org/WAI/tutorials/menus/flyout/) are used to show and hide content:

```html
<nav aria-labelledby="main-nav">
  <span hidden id="main-nav">Main</span>
  <ul>
    <li><a href="…">Home</a></li>
    <li><a href="…">Shop</a></li>
    <li class="has-submenu">
      <a href="…" aria-expanded="false">
        Space Bears
      </a>
      <ul>
        <li><a href="…">Space Bear 6</a></li>
        <li><a href="…">Space Bear 6 Plus</a></li>
      </ul>
    </li>
    <li><a href="…">Mars Cars</a></li>
    <li><a href="…">Contact</a></li>
  </ul>
</nav>
```

In this slightly altered W3C example of a navigation we can see [**progressive enhancement**](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md) in action:

- If CSS and JavaScript fail to load, this navigation would still work because semantic HTML was used and none of the list items are hidden.
- `aria-expanded` indicates that the submenu is currently collapsed.
- No additional ARIA is needed to describe the relationships between the list items and their respective parent lists, as this is communicated by the semantic HTML elements `<ul>` and `<li>`.

:::: note FYI

There is currently no native solution for this pattern that works entirely without JavaScript. However, the proposed [<VPIcon icon="fas fa-globe"/>`focusgroup` attribute](https://stevefrenzel.dev/posts/my-thoughts-on-the-focusgroup-attribute-proposal/) might eventually fill this gap.

:::

There is another element related to this pattern that requires the `aria-expanded` attribute: the so-called hamburger button!

### Menu

It is very important here to distinguish whether this button is intended to reveal a navigation bar or a menu. If it is a navigation bar, `aria-expanded` is sufficient. If it is a menu, [<VPIcon icon="iconfont icon-w3c"/>`aria-haspopup`](https://w3c.github.io/aria/#aria-haspopup) is also required!

```html
<button
  aria-controls="menu"
  aria-haspopup="true"
  aria-expanded="false"
  id="menu-button"
  type="button"
>
  Menu
</button>
<ul
  aria-activedescendant="mi1"
  aria-labelledby="menu-button"
  id="menu"
  role="menu"
  tabindex="-1"
>
  <li id="mi1" role="menuitem">Action 1</li>
  <li id="mi2" role="menuitem">Action 2</li>
  <li id="mi3" role="menuitem">Action 3</li>
  <li id="mi4" role="menuitem">Action 4</li>
</ul>
```

Depending on the scope of the menu, the following ARIA roles may also be necessary:

- `aria-labelledby` or `aria-label`: If a menubar has a visible label, the element with role `menu` or `menubar` needs to have one of these attributes set to a value that refers to the labelling element.
- `aria-activedescendant`: Indicates the relationship between the selected menu item and the parent element in which it is located.
- `aria-checked`: If it is possible to select multiple menu items, the corresponding value must be `true` or `false`.
- `aria-controls`: Establishes a programmatic relationship between the respective menu button and the contained menu items. As mentioned earlier, browser support is sparse, and this feature should be considered more of a nice-to-have.

A very good guide to creating progressively enhanced menus is Heydon’s article [<VPIcon icon="fas fa-globe"/>*Menus & Menu Buttons*](https://inclusive-components.design/menus-menu-buttons/). The APG explainer for the [<VPIcon icon="fas fa-globe"/>*Menu Button Pattern*](https://w3.org/WAI/ARIA/apg/patterns/menu-button/) is a good place to start if you want to get an overview of the necessary ARIA roles.

### Tree view

APG distinguishes between two patterns here that are essentially the same but can vary greatly in complexity depending on the implementation:

- [<VPIcon icon="iconfont icon-w3c"/>Tree view](https://w3.org/WAI/ARIA/apg/patterns/treeview/): “A tree view widget presents a hierarchical list.”
- [<VPIcon icon="iconfont icon-w3c"/>Tree grid](https://w3.org/WAI/ARIA/apg/patterns/treegrid/): “A tree grid widget presents a hierarchical data grid consisting of tabular information that is editable or interactive.”

In both cases, the `aria-expanded` attribute is required for the interactive element, which can show or hide additional elements. Here, too, other ARIA roles may be necessary depending on the implementation. This simplified example shows a possible HTML structure. It would also need a significant amount of CSS and JavaScript to convey visual information, as well as information communicated to AT:

```html
<ul role="tree" aria-labelledby="tree-label">
  <span hidden id="tree-label">Menu</span>
  <li
    aria-expanded="false"
    aria-level="1"
    aria-posinset="1"
    aria-selected="false"
    aria-setsize="2"
    role="treeitem"
  >
    <ul role="group">
      <li
        aria-level="2"
        aria-posinset="1"
        aria-selected="false"
        aria-setsize="2"
        role="treeitem"
      >
        Content 1
      </li>
      <li
        aria-level="2"
        aria-posinset="2"
        aria-selected="false"
        aria-setsize="2"
        role="treeitem"
      >
        Content 2
      </li>
    </ul>
  </li>
</ul>
```

- [<VPIcon icon="iconfont icon-w3c"/>`aria-multiselectable`](https://w3.org/TR/wai-aria-1.2/#aria-multiselectable): Necessary if more than one node can be selected.
- `aria-selected` or `aria-checked`: One of the two is required if more than one node can be selected.
- `aria-labelledby` or `aria-label`: The element with role `tree` has either a visible label referenced by `aria-labelledby` or a value specified for `aria-label`.
- [<VPIcon icon="iconfont icon-w3c"/>`aria-orientation`](https://w3.org/TR/wai-aria-1.2/#aria-orientation): If the `tree` element is horizontally oriented, it has the value `aria-orientation="horizontal"`.
- [<VPIcon icon="iconfont icon-w3c"/>`aria-level`](https://w3.org/TR/wai-aria-1.2/#aria-level), [<VPIcon icon="iconfont icon-w3c"/>`aria-setsize`](https://w3.org/TR/wai-aria-1.2/#aria-setsize) and [<VPIcon icon="iconfont icon-w3c"/>`aria-posinset`](https://w3.org/TR/wai-aria-1.2/#aria-posinset): These might be necessary, if “the complete set of available nodes is not present in the DOM due to dynamic loading as the user moves focus in or scrolls the tree”.
- `tabindex`: Depending on your implementation, you might need to implement a [<VPIcon icon="fas fa-globe"/>roving `tabindex`](https://webaim.org/techniques/keyboard/tabindex#zero-negative-one).

If you need a starting point for creating one of these components, check out [<VPIcon icon="fas fa-globe"/>Create an accessible tree view widget using ARIA](https://blog.pope.tech/2023/07/06/create-an-accessible-tree-view-widget-using-aria/) by Pope Tech.

### Combo box

[**The native `<select>` element can now be styled freely**](/nerdy.dev/nice-select.md) and also offers keyboard support, as well as robust accessibility support by default, so there should be no need to build this element yourself.

```html
<label for="pet-select">Choose a pet:</label>

<select id="pet-select" name="pets">
  <option value="">Please choose an option:</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
</select>
```

If it is necessary after all, the `aria-expanded` attribute is required here as well. In addition, `aria-haspopup`, `aria-activedescendant`, and `aria-selected` may also be necessary, depending on the implementation. Furthermore, `aria-autocomplete` and `aria-labelledby` or `aria-label` may also be required.

Make sure to give the [<VPIcon icon="iconfont icon-w3c"/>specs of](https://w3c.github.io/aria/#combobox) [<VPIcon icon="iconfont icon-w3c"/>`combobox`](https://w3.org/TR/wai-aria-1.2/#combobox) [<VPIcon icon="iconfont icon-w3c"/>role](https://w3c.github.io/aria/#combobox) a good read before building it. Although, why go through all that trouble when the web platform provides an element that can already do all of this? 🤗

---

## Similar but different

The following patterns can also reveal content at the touch of a button. However, this isn’t so much a “fold-out” as it is a “pop-up”! Instead of using `aria-expanded` to communicate the state of an interactive element, you would rather use `aria-haspopup` oder `aria-modal`.

### Dialog (Modal)

[<VPIcon icon="iconfont icon-w3c"/>According to APG, the dialog pattern requires the `aria-modal` attribute](https://w3.org/WAI/ARIA/apg/patterns/dialog-modal/), but let me stop you right there. [<VPIcon icon="fa-brands fa-firefox"/>The native `<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) has had solid browser support for quite some time and is supported by assistive technologies. In addition, we now have [<VPIcon icon="fa-brands fa-firefox"/>invoker commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) at our disposal, which means you *could* implement this pattern without using any JavaScript! [<VPIcon icon="fas fa-globe"/>Use the dialog element (reasonably)](https://scottohara.me/blog/2023/01/26/use-the-dialog-element.html) to save time and frustration and to keep your users happy.

In this example, we’re using invoker commands. If you want to play it safe, you could also add a fallback using JavaScript, in case invoker commands are not supported yet in the browser of your choice.

```html
<button command="show-modal" commandfor="my-dialog">
  Open dialog
</button>

<dialog id="my-dialog">
  <h2>Progressive enhancement</h2>
  <p>This dialog uses no JavaScript!</p>
  <button commandfor="my-dialog" command="close">
    Close
  </button>
</dialog>
```

### Tabbed interfaces

Unfortunately, there is no native, JavaScript-free solution for this pattern yet, so you’ll either have to build it yourself using `aria-haspopup` or use a ready-made solution from a third-party provider.

Personally, I prefer the first option so you know what’s going on under the hood. A good starting point for this is [<VPIcon icon="fas fa-globe"/>Tabbed Interfaces](https://inclusive-components.design/tabbed-interfaces/) by Heydon Pickering.

Additionally ([<VPIcon icon="iconfont icon-w3c"/>according to the APG](https://w3.org/WAI/ARIA/apg/patterns/tabs/)), other ARIA roles such as `aria-controls`, `aria-selected`, `aria-orientation`, `aria-label`, or `aria-labelledby` may be added, depending on how you implement it.

### Tooltip

This pattern is an interesting case, as there is [<VPIcon icon="iconfont icon-w3c"/>no specific example of it in the APG](https://w3.org/WAI/ARIA/apg/patterns/tooltip/). Nevertheless, Heydon has taken on the challenge here as well and explains in [<VPIcon icon="fas fa-globe"/>Tooltips & Toggletips](https://inclusive-components.design/tooltips-toggletips/) how to create an accessible tooltip on your own.

Alternatively, you could experiment with how the [<VPIcon icon="fa-brands fa-firefox"/>Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) and invoker commands work together with AT to implement this pattern natively and without JavaScript:

```jsx
<button command="toggle-popover" commandfor="info">
  What is two-factor authentication?
</button>

<div id="info" popover="auto" role="tooltip">
  Two-factor authentication adds a second verification step (like a code
  from your phone) when you log in.
</div>
```

Once again, we need very little to get a lot done! Let’s break down what’s happening here:

- `command="toggle-popover"`: The Popover API provides to show or hide a popover, aka toggling it.
- `commandfor="info"`: Here we’re using the Popover API to target the element with `id="info"` in order to connect the button with this particular element.
- `popover="auto"`: This enables the so-called “light-dismiss”, meaning that clicking outside of the tooltip or pressing ESC will close it.
- `role="tooltip"`: Without explicitly specifying the role, it would have a role of “group”.

---

## Wrapping up

Originally, this article was supposed to be about expandable buttons. Then I realised it would make more sense to write specifically about the ARIA role `aria-expanded`. After further research, I discovered that this attribute is no longer absolutely necessary for some patterns because the web platform has evolved significantly in recent years!

Thanks to native solutions like `<detail>`, `<summary>`, and `<dialog>`, as well as the Popover and Invoker Commands API, it’s possible to implement many of the patterns discussed here with minimal effort and even without JavaScript.

Nevertheless, it’s very important that not only these native (and in some cases very new) solutions are thoroughly tested with assistive technology, but also those you’ve created yourself.

It’s even more important to note that the APG patterns are not suitable for production use but should be understood solely as illustrations of how to use various ARIA roles. That’s why I’ve added an alternative example to each pattern presented, in which it was implemented with progressive enhancement in mind.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Use cases for aria-expanded",
  "desc": "Without reading dry documentation, finding the correct use for aria roles can be a challenge, so Steve Frenzel is here to break down the often mis-used aria-expanded.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/use-cases-for-aria-expanded.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
