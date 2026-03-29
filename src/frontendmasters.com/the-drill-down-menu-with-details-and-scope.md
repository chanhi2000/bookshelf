---
lang: en-US
title: "The Drill-Down Menu with Details and @scope"
description: "Article(s) > The Drill-Down Menu with Details and @scope"
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
      content: "Article(s) > The Drill-Down Menu with Details and @scope"
    - property: og:description
      content: "The Drill-Down Menu with Details and @scope"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-drill-down-menu-with-details-and-scope.html
prev: /programming/css/articles/README.md
date: 2026-03-30
isOriginal: false
author:
  - name: Preethi Sam
    url: https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9143
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
  name="The Drill-Down Menu with Details and @scope"
  desc="Even if you nest details elements, you can ensure only one level of them is open at a time, making a menu you can drill down (and up!) from."
  url="https://frontendmasters.com/blog/the-drill-down-menu-with-details-and-scope/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9143"/>

We’re going to build a set of nested `<details>` elements that behave like nested *menus.* Click a top-level link, drill down into a submenu, which can drill down into another submenu, etc. Think of them as nesting dolls… without the shrinking size. We take off a shell and get a new doll from inside.

This type of navigation pattern could be used to save space, be entertaining to use, or actually be helpful to users who know they need to follow a narrow path of questions to get where they need to go.

Here’s a live demo:

<CodePen
  user="anon"
  slug-hash="qEamPyp"
  title="Drill-Down Menu"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Let’s see how to make this one, starting with the layout.

---

## The Nested Layout

A set of cascading, nested menus forms the foundation of this user interface. You can build it in your preferred way — you just need the nested `<details>` elements so users can open and close submenus. We’ll be targeting those states in CSS.

The `<details>` element is an interactive HTML element that can be **_opened_ and _closed_** to show or hide additional content as needed, making it perfect for this drill-down UI.

The `<summary>` element within `<details>` becomes the clickable interactive element which opens all the other content within.

```html
/* A three-level menu */

<details> /* Level 1 */
  <summary>Data Settings</summary>
  <details> /* Level 2 */
    <summary>Data Roaming</summary>
    <details> /* Level 3 */
      <summary>Domestic Roaming</summary>
      <!-- content -->
    </details>
    <!-- More in Level 3 -->
  </details>
  <!-- More in Level 2 -->
</details>
<!-- More in Level 1 -->
```

---

## The Donut Scope

The two-state `<details>`, by itself, can show and hide its content, but when one of the `<details>` is open, the rest of them on the same level should not be visible. Although there are other ways to reach those `<details>`s to be removed, a very easy way to make it happen is by using `@scope` in CSS.

The `@scope` rule in CSS allows us to **search for elements in a subtree defined by a scope root (an ancestor element) and a scope limit** (a descendant element). This is similar to the limits of integration in calculus, where calculations are performed within a specific range defined by upper and lower bounds.

The starting element of your subtree is like the upper bound (scope root). The ending element, a descendant, is like the lower bound (scope limit). The scope limit is optional and unaffected by style rules. Only the scope root and elements between it and the limit are affected.

Here’s an example:

```html
<main>
  <h1>Legal Provisions for Account Security</h1>
  <section>
    <h2>Section 4.1: User Accountability...</h2>
    <p>The User is solely and exclusively...</p>
  </section>
  <section>
    <h2>Section 4.2: Notification of...</h2>
    <p>In the event of an actual or suspected breach...</p>
  </section>
  <section class="plain-language-summary">
    <h2>Plain Language Summary</h2>
    <p>We want to keep your account safe, so you...</p>
    <p class="legal-clause">Legal Clause 4.1: User..</p>
    <p>If you lose access to your account...</p>
  </section>
</main>
```

```css{4}
main {
  font: 0.8rem monospace;
}
@scope (.plain-language-summary) to (.legal-clause) {
  * {
    color: navy;
    font-family: poppins;
  }
}
```

<CodePen
  user="anon"
  slug-hash="vEXeLpY"
  title="CSS @scope"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The above document contains legal clauses styled in `monospace` font and default black color. A ‘plain language summary’ in `poppins` font and `navy` color outlines the document. The summary includes a legal clause that must retain the default monospace font and black color of the legal clauses.

Instead of having to reset the legal clause’s style inside the summary, `@scope` is used to style the `.plain-language-summary'`s (scope root) content while excluding any `.legal-clause`es (scope limit) in it.

Being able to punch away elements not needed inward and outward — hence the term [<VPIcon icon="fas fa-globe"/>‘donut’](https://stubbornella.org/2011/10/08/scope-donuts/) — is what we need for the drill-down menu. **When an inner menu opens, its outer menu and everything between the outer and inner one has to be erased, leaving only the open inner menu’s content on the screen.**

```css
@scope (:has(>details[open])) to (details[open]) {
  * {  /* or details, summary { */
    display: none;
  }
}
```

The outer menu with the open inner menu (`:has(>details[open])`) is the scope root. The open inner menu (`details[open]`) is the scope limit. All the `<details>` and `<summary>` elements between them are removed. Here’s the example once more:

<CodePen
  user="anon"
  slug-hash="qEamPyp"
  title="Drill-Down Menu"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Drill-Down Menu with Details and @scope",
  "desc": "Even if you nest details elements, you can ensure only one level of them is open at a time, making a menu you can drill down (and up!) from.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-drill-down-menu-with-details-and-scope.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
