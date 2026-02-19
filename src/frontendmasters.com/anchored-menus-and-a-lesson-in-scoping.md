---
lang: en-US
title: "Anchored Menus and a Lesson in Scoping"
description: "Article(s) > Anchored Menus and a Lesson in Scoping"
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
      content: "Article(s) > Anchored Menus and a Lesson in Scoping"
    - property: og:description
      content: "Anchored Menus and a Lesson in Scoping"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/anchored-menus-and-a-lesson-in-scoping.html
prev: /programming/css/articles/README.md
date: 2026-02-16
isOriginal: false
author:
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8550
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
  name="Anchored Menus and a Lesson in Scoping"
  desc="Turns out `anchor-scope` is pretty darn useful for button/menu setups that will appear multiple times on the same page."
  url="https://frontendmasters.com/blog/anchored-menus-and-a-lesson-in-scoping/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8550"/>

I had this (bad) idea.

It’s related to [**popovers and anchor-positioned menus**](/frontendmasters.com/popover-context-menus-with-anchor-positioning.md). I love this pairing: with only HTML and CSS we can make a button that opens/closes anything we want. A tooltip or a menu is a wonderful use-case.

This isn’t a terribly difficult thing to do, but, you have to remember a bunch of stuff and put certain unique values on certain elements exactly.

1. Remember the right `command` attribute value on the button
2. Put a unique `id` on the menu.
3. Match up the `commandfor` attribute on the button to that id.
4. Make sure the button has an unique `anchor-name`.
5. Match up the `position-anchor` on the menu to that unique name.
6. Make sure you’re using good anchor positioning fallbacks.

```html
<button
  commandfor="menu-12345"
  command="toggle-popover"
  style="anchor-name: --menu-button-12345;"
>
  Toggle Menu
</button>

<menu
  id="menu-12345"
  style="position-anchor: --menu-button-12345"
>
  Menu
</menu>
```

That feels like kind of a lot to remember and get right.

Here’s my (bad) idea: make a quick `<web-component>` that does those things. On the surface, maybe that makes sense. It did to me. But the ridiculous part is that now it introduces JavaScript into things in a place we didn’t need JavaScript before, which makes it more fragile (and potentially render later) than it would without.

So I’m not advocating for use here, but I did learn some things along the way that I found interesting and worth sharing.

---

## Light DOM Web Component

I called it `<a-menu>` just to be short and slightly cheeky.

```js :collapsed-liens
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('a-menu')
export class AMenu extends LitElement {
  @property({ attribute: 'button-name' }) buttonName = 'Menu';

  private menuId = `menu-${Math.random().toString(36).substr(2, 9)}`;
  
  // Disable the Shadow DOM
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const menu = this.querySelector('menu');
    if (menu) {
      menu.setAttribute('popover', 'auto');
      menu.id = this.menuId;
    }
  }

  render() {
    return html` <style>
        a-menu {
          display: inline-block;
          
          button {
            position-anchor: --menu-button-${menuId};
          }
  
          menu {
            position-anchor: --menu-button-${menuId};
            position-area: block-end span-inline-start;
            position-try: flip-block, flip-inline, flip-block flip-inline;
            inset: unset;
            margin: 0;
          }
        }
      </style>
      <button
        commandfor="${this.menuId}"
        command="toggle-popover"
      > ${this.buttonName} </button>
    `;
  }
}`
```

Then usage is as simple as this:

```html
<a-menu button-name="My Menu">
  <menu>
    <li><button>Edit</button></li>
    <li><button>Delete</button></li>
    <li><button>Share</button></li>
  </menu>
</a-menu>
```

Notice we **don’t** need to:

1. Remember a unique ID on the menu.
2. Remember the popover commands.
3. Remember to attach an `anchor-name` or `position-anchor` to put the menu next to the button.

### … but now we have a problem

Even though we’re putting a unique ID on the menu and using unique custom idents on the anchors, the **first** menu will open in the position of the **last** button. Why? Because we’re using the Light DOM here, and the last generic `a-menu menu {}` selector will **override** the first one, making **all** buttons/menus use the values of the last one.

::: details Problem Demo

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c679f-6fd0-738d-9cfe-83c9bdb1a0db"
  title="An <a-menu> Component (no-scoping)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Using @scope

It occured to me that a potential fix here is the newfangled `@scope` in CSS. If we updated the style block to be this instead:

```scss
@scope {
  :scope {
    display: inline-block;
    
    button {
      anchor-name: --menu-button-${this.menuId};
    }

    menu {
      position-anchor: --menu-button-${this.menuId};
      position-area: block-end span-inline-start;
      position-try: flip-block, flip-inline, flip-block flip-inline;
      inset: unset;
      margin: 0;
      border: 0;
      padding: 0.5rem;
      background: light-dark(white, black);
      border-radius: 4px;
      box-shadow: 0 10px 10px lch(0% 0 0 / 0.2);
    }
  }
}
```

This fixes the problem because each `<style>` block only applies directly to the `<a-menu>` web component it lives inside of.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c67a9-219d-7113-aabb-67c2b6077617"
  title="An <a-menu> Component (@scope)"
  :default-tab="['css','result']"
  :theme="dark"/>

Kind of a nice little use case for `@scope`. But…

---

## Using anchor-scope (instead)

It turns out there is an even cleaner fix for this, because anchor positioning actually has its own version of scoping just for it. It’s called [<VPIcon icon="fa-brands fa-firefox"/>`anchor-scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/anchor-scope).

Rather than scoping everything, as well as requiring a unique custom ident for the anchor, we can tell the root web component to scope that custom ident to itself. Meaning that anything internally that is looking for that custom ident should look in this little neck-of-the-DOM-woods and no further.

```css
a-menu {
  anchor-scope: --menu-button;
  display: inline-block;
  
  button {
    anchor-name: --menu-button;
  }

  menu {
    position-anchor: --menu-button;
    position-area: block-end span-inline-start;
    position-try: flip-block, flip-inline, flip-block flip-inline;
    inset: unset;
    margin: 0;
    border: 0;
    padding: 0.5rem;
    background: light-dark(white, black);
    border-radius: 4px;
    box-shadow: 0 10px 10px lch(0% 0 0 / 0.2);
  }
}
```

Now it doesn’t matter if multiple elements are all using the same custom ident for an anchor because they are all scoped to their own parents.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c67ae-32c8-773d-9159-d36a67b04ff1"
  title="An <a-menu> Component (anchor-scope))"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Bonus: Implied Anchors

[<VPIcon icon="fas fa-globe"/>I learned *another* thing](https://matuzo.at/blog/2026/better-defaults-for-popovers) recently that helps just a smidge here too. That `position-anchor` we’re putting on the menu? It’s simply not needed. Because our `<button>` opens our `<menu>` with those popover commands, which match the `id` and `commandfor`, the `<menu>` has an “implied anchor” of the `<button>`. That’s amazing to me. You don’t normally see it because popovers have `margin: auto;` on them in the UA stylesheet which centers them on the screen and kinda overrides the anchor. But as soon as that is removed, like we’re doing with `margin: 0;`, it “just works”.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c67b2-f490-711e-afb2-c5df5b466edc"
  title="An <a-menu> Component (implied anchor)"
  :default-tab="['css','result']"
  :theme="dark"/>

I’m totally adding [<VPIcon icon="fas fa-globe"/>this](https://matuzo.at/blog/2026/better-defaults-for-popovers) to [**my reset stylesheet**](/frontendmasters.com/the-coyier-css-starter.md). (And I like how Manuel is down with the perfect fallbacks for anchors, `position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;`, which [**we also came to here**](/frontendmasters.com/blog/popover-context-menus-with-anchor-positioning.md#the-most-useful-position-try-incantation).)

---

## Conclusion

Again, this isn’t a smart web component to actually use because we’ve moved a very nice HTML/CSS only feature into requiring JavaScript. But hey, we learned some stuff along the way.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Anchored Menus and a Lesson in Scoping",
  "desc": "Turns out `anchor-scope` is pretty darn useful for button/menu setups that will appear multiple times on the same page.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/anchored-menus-and-a-lesson-in-scoping.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
