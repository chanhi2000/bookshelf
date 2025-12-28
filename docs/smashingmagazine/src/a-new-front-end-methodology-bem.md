---
lang: en-US
title: "BEM: A New Front-End Methodology"
description: "Article(s) > BEM: A New Front-End Methodology"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > BEM: A New Front-End Methodology"
    - property: og:description
      content: "BEM: A New Front-End Methodology"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/a-new-front-end-methodology-bem.html
prev: /programming/css/articles/README.md
date: 2012-04-16
isOriginal: false
author:
  - name: Varya Stepanova
    url : https://smashingmagazine.com/author/varvara-stepanova/
cover: https://smashingmagazine.com/images/smashing-homepage.png
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
  name="BEM: A New Front-End Methodology"
  desc="This article is the sixth in our new series that introduces the latest, useful and freely available tools and techniques, developed and released by active members of the Web design community. The first article covered PrefixFree the second introduced Foundation, a responsive framework; the third presented Sisyphus.js, a library for Gmail-like client-side drafts, the fourth covered a free plugin called GuideGuide and the fifth presented Erskine Design's responsive grid generator Gridpak. Today, we are happy to feature a toolkit devised by Yandex: BEM."
  url="https://smashingmagazine.com/2012/04/a-new-front-end-methodology-bem/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://smashingmagazine.com/images/smashing-homepage.png"/>

This article is the sixth in our new series that introduces the latest, useful and freely available tools and techniques, developed and released by active members of the Web design community. The first article covered [**PrefixFree**](/smashingmagazine.com/prefixfree-break-free-from-css-prefix-hell.md); the second introduced [**Foundation**](/smashingmagazine.com/rapid-prototyping-for-any-device-with-foundation.md), a responsive framework; the third presented [**Sisyphus.js**](/smashingmagazine.com/sisyphus-js-client-side-drafts-and-more.md), a library for Gmail-like client-side drafts, the fourth covered a free plugin called [**GuideGuide**](/smashingmagazine.com/guideguide-free-plugin-for-dealing-with-grids-in-photoshop.md) and the fifth presented Erskine Design’s responsive grid generator [**Gridpak**](/smashingmagazine.com/gridpak-the-responsive-grid-generator.md). Today, we are happy to feature a toolkit devised by Yandex: **BEM**.

**BEM** stands for “Block”, “Element”, “Modifier”. It is a front-end methodology: a new way of thinking when developing Web interfaces. This article will elaborate on the theory as well as the practice of building websites at Yandex—one of the leading internet companies in Russia.

The article has three parts: BEM Principles, Blocks Reiteration and File System Representation For A Block

::: info Further Reading

```component VPCard
{
  "title": "Scaling Down The BEM Methodology For Small Projects",
  "desc": "To make the right choices for your project, you need to start with a general approach, or methodology. You probably already know of BEM, one of those methodologies developed by a big company, but Maxim Shirshin decided to try BEM on a smaller scale. He wanted the same benefits that Yandex gets from BEM: code sharing, a live style guide, scalability, faster development. He is now convinced that BEM applies to small projects as well. Maxim has written down his findings, in case you find them useful!",
  "link": "/smashingmagazine.com/bem-methodology-for-small-projects.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "The Evolution Of The BEM Methodology",
  "desc": "In this article, Maxim Shirshin will introduce us to the history of the BEM methodology. BEM is a collection of ideas and methods. Companies and teams can integrate it into their existing workflow gradually, finding out what works best for them, using a unified language that consists of powerful terms: blocks, elements, modifiers. Learn about the challenges that a big company faces when gradually building an entire ecosystem of services with an ever-growing team of developers.",
  "link": "/smashingmagazine.com/the-history-of-the-bem-methodology.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Battling BEM CSS: 10 Common Problems And How To Avoid Them",
  "desc": "BEM has been an absolute lifesaver for me in my effort to create applications in a modular, component-driven way. David Berner has been using it for nearly three years now, and the problems above are the few stumbling blocks he’s hit along the way. This article aims to be useful for people who are already BEM enthusiasts and wish to use it more effectively or people who are curious to learn more about it.",
  "link": "smashingmagazine.com/battling-bem-extended-edition-common-problems-and-how-to-avoid-them.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

## BEM Principles

To begin, let’s first put [<VPIcon icon="fas fa-globe"/>BEM](https://getbem.com/) in some historical perspective.

We first began sketching out the internal front-end framework at Yandex around the year 2007, starting with a robust CSS naming convention, and a file system layout that was associated with it. Since the naming convention was well-structured, it seemed suitable to develop certain JavaScript helpers (to work with the DOM and CSS classes in particular, on a higher level of abstraction). We then used those approaches to build an internal library of UI components that could be shared among our various websites and rich applications, built using different technology stacks (XML/XSLT, Python/Django, Perl/TT2).

As our ambitions, complexity and performance requirements grew, we aimed at replacing XSLT and Perl templates with a JS-based declarative templating DSL, built on top of Node.js. Along with those efforts, we looked into simplifying development workflow and developed a bunch of command-line tools that already helped us manage front-end code on the file system, preprocess CSS and JavaScript code, and so on, and so forth.

Some parts of the BEM stack started as open source projects, while others (like the UI component library) are being gradually open sourced. Our goal is to publish most of them during 2012. BEM is a toolkit that will help address and resolve front-end issues quickly and effectively. It is available in a range of reusable code libraries—all of them are hosted on Github and are completely open source.

One of the most common examples of a methodology in programming is *Object-Oriented Programming*. It’s a programming paradigm embodied by many languages. In some ways, BEM is similar to OOP—a way of describing reality in code, with a range of patterns, and a way of thinking about program entities regardless of the programming languages being used.

We’ve used BEM principles to create a set of front-end development techniques and tools that allow us to build websites quickly and maintain them over a long period of time. The principles are the following:

---

## Unified Data Domain

Imagine an ordinary website, like the one pictured below:

![bem - ordinary website example](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7a118d71-1d2f-4f61-a1a2-3ea3fea113a8/site-screenshot.jpg)

While developing such a website, it’s useful to mark out “blocks” from which the website consists of. For example, in this picture there are `Head`, `Main Layout` and `Foot` blocks. The `Head` in turn consists of `Logo`, `Search`, `Auth Block` and `Menu`. `Main Layout` contains a `Page Title` and a `Text Block`:

![bem - site marked](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/980a9b7c-e0f9-4cef-a3f1-7c2ba55c8011/site2.jpg)

Giving each part of the page a name is very useful when it comes to team communication.

A project manager could ask:

- To make the `Head` bigger, or
- To create a page without a `Search` form in the `Head`.

An HTML guy could ask a fellow JavaScript developer:

- To make `Auth Block` animated, etc.

Let’s now take a closer look at what constitutes BEM:

### Block

A `block` is an independent entity, a “building block” of an application. A block can be either simple or compound (containing other blocks).

::: tip Example Search form block:

![search form block](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8fa03b3b-632f-4467-8758-facd7a7b9a6e/search-bar.jpg)

:::

### Element

An `element` is a part of a block that performs a certain function. Elements are context-dependent: they only make sense in the context of the block that they belong to.

::: tip Example

An input field and a button are elements of the Search Block:

![elements of search block](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1d8766e0-df2a-4486-a3c9-b922eae2ca90/input-button.jpg)

:::

---

## Means Of Describing Pages And Templates

Blocks and elements constitute page content. Besides simply being present on a page, their arrangement is also important.

Blocks (or elements) may follow each other in a certain order. For example, a list of goods on a commerce website:

![list of goods on a commerce website](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b01ce790-a401-4da5-9ff5-9f78dd6098a6/list-of-goods.jpg)

…or menu items:

![menu items](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6fedc4e5-2fec-4c64-8c0f-fcb61e59041d/menu-items2.jpg)

Blocks may also be contained inside other blocks. For example, a `Head Block` includes other blocks:

![blocks inside other blocks](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c702b771-3101-46e1-9908-faf586684640/head-marked2.jpg)

Besides, our building blocks need a way to describe page layout in plain text. To do so, every block and element should have a keyword that identifies it.

A keyword designating a specific block is called `Block Name`. For example, `Menu` can be a keyword for the `Menu Block` and `Head` can be a keyword for the `Head` block.

A keyword designating an element is called `Element Name`. For example, each item in a menu is an element `Item` of the `Menu` block.

Block names must be unique within a project to unequivocally designate which block is being described. Only instances of the same block can have the same names. In this case, we can say that one block is present on the page twice (or 3, 4, times… etc.).

Element names must be unique within the scope of a block. An element can be repeated several times. For example, menu items:

![repeated elements](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5c99a0bf-6da0-4948-af13-4f29f74bf1de/elements-repeated.jpg)

Keywords should be put in a certain order. Any data format that supports nesting (XML, JSON) will do:

```xml
<b:page>
  <b:head>
    <b:menu>
      ...
    </b:menu>
    <e:column>
      <b:logo/>
    </e:column>
    <e:column>
      <b:search>
        <e:input/>
        <e:button>Search</e:button>
      </b:search>
    </e:column>
    <e:column>
      <b:auth>
        ...
      </b:auth>
    <e:column>
  </b:head>
</b:page>
```

In this example, `b` and `e` namespaces separate block nodes from element nodes.

The same in JSON:

```json
{
  "block": "page",
  "content": {
    "block": "head",
    "content": [
      { "block": "menu", "content": ... },
      {
        "elem": "column",
        "content": { "block": "logo" }
      },
      {
        "elem": "column",
        "content": [
          {
            "block": "search",
            "content": [
              { "elem": "input" },
              {
                "elem": "button",
                "content": "Search"
              }
            ]
          }
        ]
      },
      {
        "elem": "column",
        "content": {
          "block": "auth",
          "content": ...
        }
      }
    ]
  }
}
```

Examples above show an object model with blocks and elements nested inside each other. This structure can also contain any number of custom data fields. We call this structure `BEM Tree` (by analogy with DOM tree).

Final browser markup is generated by applying template transformations (using XSL or JavaScript) to a BEM tree.

If a developer needs to move a block to a different place on a page, he does so by changing the BEM tree. Templates generate the final view themselves.

In our recent products we went with JSON as a page description format. It is then turned into HTML by a JS-based template engine. The tools we use are listed at the end of this article.

---

## Block Independence

As projects grow, blocks tend to be added, removed, or moved around on the page. For example, you may want to swap the `Logo` with the `Auth Block`, or place the `Menu` under the `Search Block`.

![swapping blocks](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/158bb8c5-ee1f-47e2-8a08-1ec45276ae59/switch-function.jpg)

To make this process easier, blocks must be `Independent`.

An `Independent` block is implemented in a way that allows arbitrary placement anywhere on the page—including nesting inside another block.

### Independent CSS

From the CSS point of view it means that:

- A block (or an element) must have a unique “name” (a CSS class) that could be used in a CSS rule.
- HTML elements must not be used in CSS selectors (.menu td) as such selectors are inherently not context-free.
- Cascading selectors for several blocks should be avoided.

#### Naming for Independent CSS Classes

One of the possible naming schemes for CSS classes that satisfies said requirements is the following:

- CSS class for a block coincides with its `Block Name`.

```html
<ul class="menu">
  ...
</ul>
```

- CSS class for an element is a `Block Name` and an `Element Name` separated by some character(s)

```html
<ul class="menu">
  <li class="menu__item">
    ...
  </li>
  <li class="menu__item">
    ...
  </li>
</ul>
```

It’s necessary to include block name in a CSS class for an element to minimize cascading. It’s also important to use separators consistently to allow the tools and helpers to have unambiguous programmatic access to the elements.

Different naming schemes can be used. Take a look [here (<VPIcon icon="iconfont icon-github"/>`bem-bl/pages`)](https://bem.github.com/bem-bl/pages/naming/naming.en.wiki) for the naming convention we used.

### Independent Templates

From the template engine’s perspective, block independence means that:

- Blocks and elements must be described in the input data. Blocks (or elements) must have unique “names” to make things like “`Menu` should be placed here” expressible in our templates.
- Blocks may appear anywhere in a BEM tree.

#### Independent templates for blocks

When coming across a block in a template, the template engine should be able to unambiguously transform it into HTML. Thus, every block should have a template for that.

For example, a template can look like this in XSL:

```xml
<xsl:template match="b:menu">
  <ul class="menu">
    <xsl:apply-templates/>
  </ul>
</xsl:template>

<xsl:template match="b:menu/e:item">
  <li class="menu__item">
    <xsl:apply-templates/>
  </li>
<xsl:template>
```

We are gradually discarding XSLT in our products in favor of our own JavaScript-based template engine [XJST (<VPIcon icon="iconfont icon-github"/>`veged/xjst`)](https://github.com/veged/xjst). This template engine absorbs everything we like about XSLT (we are fans of declarative programming), and implements it with JavaScript’s productivity on either the client or the server side.

We, at Yandex, write our templates using a domain-specific language called BEMHTML, which is based on XJST. The main ideas of BEMHTML are published in the BEM club on Ya.Ru (in Russian).

---

## Blocks Reiteration

The second `Menu Block` can occur in the `Foot Block` of a website. Also, a `Text Block` can divide into two, separated by an advertisement.

Even if a block was developed as a singular unit, the same one can appear on a page at any moment.

In CSS related terms, this means:

- ID-based CSS selectors must not be used. Only class selectors satisfy our non-uniqueness requirement.

On the JavaScript side it means:

- Blocks with similar behavior are detected unequivocally—they have the same CSS classes. Using CSS class selectors allows for picking all blocks with a given name to apply the required dynamic behavior.

---

## Modifiers For Elements And Blocks

We often need to create a block very similar to an existing one, but with a slightly altered appearance or behavior. Let’s say, we have a task:

- Add another `Menu` in the `Footer` with a *different layout*.

![site footer menu](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c6613141-0775-4fa6-87ec-513d5c37aee5/sitefootermenu.jpg)

To avoid developing another block that is only minimally different from an existing one, we can use a `Modifier`.

A `Modifier` is a property of a block or an element that alters its look or behavior. A modifier has both a name and a value. Several modifiers can be used at once.

::: tip Example: A block modifier specifies background color

![search background](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fa33fa27-d0e4-4d38-ac8b-b101104cb76a/search-background2.jpg)

:::

::: tip Example: An element modifier changes the look of the “current” item

![current item in menu](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a5f86638-e2aa-49be-8d38-aeb5b7789a16/menu-current-items.jpg)

:::

From the input data point of view:

- In a BEM tree, modifiers are properties of an entity that describes a block or an element.

For example, they can be attribute nodes in XML:

```xml
<b:menu m:size="big" m:type="buttons">
  ...
</b:menu>
```

The same expressed in JSON:

```json
{
  "block": "menu",
  "mods": [
   { "size": "big" },
   { "type": "buttons" }
  ]
}
```

From the CSS point of view:

- A modifier is an additional CSS class for a block or an element.

```html
<ul class="menu menu_size_big menu_type_buttons">
  ...
</ul>
```

```css
.menu_size_big {
  /* CSS code to specify height */
}
.menu_type_buttons .menu__item {
  /* CSS code to change item's look */
}
```

Element modifiers are implemented in the same fashion. Again, when writing CSS by hand, it’s very important to use separators consistently for programmatic access.

E.g., current menu item can be marked with a modifier:

```xml
<b:menu>
  <e:item>Index<e:item>
  <e:item m:state="current">Products</e:item>
  <e:item>Contact<e:item>
</b:menu>
```

```json
{
  "block": "menu",
  "content": [
    { "elem": "item", "content": "Index" },
    {
      "elem": "item",
      "mods": { "state" : "current" },
      "content" : "Products"
    },
    { "elem": "item", "content": "Contact" }
  ]
}
```

```html
<div class="menu">
  <ul class="menu__layout">
    <li class="menu__layout-unit">
      <div class="menu__item">Index</div>
    </li>
    <li class="menu__layout-unit">
      <div class="menu__item menu__item_state_current">Products</div>
    </li>
    <li class="menu__layout-unit">
      <div class="menu__item">Contact</div>
    </li>
  </ul>
</div>
```

```css
.menu__item_state_current {
  font-weight: bold;
}
```

---

## Subject-Matter Abstraction

When many people work on a project, they should agree on a data domain and use it when naming their blocks and elements.

For example, a `Tag Cloud` block is always named `Tags`. Each of its elements is a `Tag`. This convention spreads across all languages: CSS, JavaScript, XSL, etc.

From the development process’ point of view:

- All participants operate on the same terms.

From the CSS point of view:

- CSS for blocks and elements can be written in a pseudo language that compiles down to CSS according to the naming convention.

```css
.menu {
  __layout {
    display: inline;
  }
  __layout-item {
    display: inline-block;
    ...
  }
  __item {
    _state_current {
      font-weight: bold;
    }
  }
}
```

On the JavaScript side:

- Instead of using class selectors directly to find DOM elements, a special helper library may be used.

```js
$('menu__item').click( ... );
$('menu__item').addClass('menu__item_state_current');
$('menu').toggle('menu_size_big').toggle('menu_size_small');
```

The naming convention for CSS classes of blocks and elements can change over the course of time. Using special JavaScript functions to access blocks and elements (and to work with their modifiers) makes it possible to change only these functions if the naming convention changes.

```js
Block('menu').elem('item').click( ... );
Block('menu').elem('item').setMod('state', 'current');
Block('menu').toggleMod('size', 'big', 'small');
```

The code above is abstract. In real life we use the JavaScript core of `i-bem` block from the `bem-bl` block libraryi-bem.ru.html) (described in Russian)

---

## Blocks Consistency

A website has a `Button` block with certain dynamic behavior.

When a block is hovered, it changes its appearance.

A manager could ask:

- To use the same button on another page.

Having a CSS implementation of a block is not enough. Reusing a block also means reusing its behavior, described in JavaScript.

So a block must “know” everything about itself. To implement a block, we describe its appearance and behavior in all technologies being used—we call that `Multilingualism`.

`Multilingual` presentation is a description of a block in all the programming languages that are necessary to implement the view and the functionality of that block.

To have a block present on a page as a UI element, we need to implement it in the following techs:

- Templates (XSL, TT2, JavaScript, etc), which turn block declarations into HTML code.
- CSS that describes appearance of the block.

If a block has dynamic behavior, we add it to this list:

- A JavaScript implementation for the block.

Everything that constitutes a block is a technology, including images.

---

## Unequivocal Placement of Code

### File Naming

When a project is:

- Long-lived and under constant development.

If the development team:

- Consists of several people.
- Grows and changes.

Then being able to navigate the code base quickly is crucial.

Block code is easiest to find when it’s placed in files using the same naming scheme as the one we use for naming our entities:

```plaintext
menu.xsl
menu.js
menu.css
```

### Expressing Blocks on a File System

There could be a task:

- To reuse some blocks from a previous project for a new one.

We want the procedure of block reuse to be as simple as possible—like simply copying the files, or using partial checkout of a repository from a “donor” project. In both cases, it is useful to have all of the files under the same directory:

```plaintext title="file structure"
menu/
  menu.xsl
  menu.js
  menu.css
```

### File Structure of a Block

When working on a project we might need to change a block at some point.

A manager could ask:

- To change the color of the `Current Menu Item,` or
- To make the `Menu` react on hover.

A developer could ask their colleague:

- To help with `Search Form` styling for IE.

To understand where the relevant code is located, follow these (or similar) rules:

- Block code is placed in a separate directory.
  - Directory name matches block name.
  - Implementation is placed under this directory.
- Elements are placed in subdirectories under the block directory.
  - Directory name matches element name.
  - Implementation is placed under this directory.
- Modifiers are placed in subdirectories under the block directory.
  - Directory name matches modifier name.
  - Implementation is placed under this directory.
  - File name includes both key and value of the modifier (again, for programmatic access).

::: tip Example

File structure of a `Menu` block:

```plaintext title="file structure"
menu/
  __item/
    _state/
      menu__item_state_current.css
      menu__item_state_current.xsl
    menu__item.css
    menu__item.xsl
  menu.css
  menu.js
  menu.xsl
```

:::

Maintaining such file structure manually is, quite obviously, inconvenient. So we’ve developed [BEM Tools (<VPIcon icon="iconfont icon-github"/>`bem/bem-tools`)](https://github.com/bem/bem-tools) to handle the burden. These tools help with creating the directory structure, placing files, generating placeholder content, etc.

#### Grouping Blocks in Directories

Big internet portals often need to reuse the same blocks across different websites.

There could be a task:

- To create the same `Footer` on *all the portals’ websites,* or
- To create a *new project* using blocks from the existing websites.

Working for a Web design agency often means that one has to use typical solutions for typical Web pages.

A project manager could ask you:

- To create an order page with a Web form *as on the previous project.*

We have to do these tasks while preferably avoiding copying blocks around manually. So it’s nice to have a repository of shared blocks that can be linked to a project. Blocks should then be united under a single directory for that.

Such a directory is usually called `Blocks`.

::: tip E.g.

```plaintext title="file structure"
blocks/
  foot/
  head/
  menu/
  page/
  search/
```

:::

That directory can be linked to another project straight from the version control system, so that we can make changes to shared blocks in a single location.

---

## Levels Of Definition

If a group of blocks (united under one directory) is linked to a project directly (via a partial checkout, svn:externals, etc.), then every change committed to these blocks influences all projects.

When developing a website based on an existing one, we might want:

- To enlarge the font in the `Head` on site A without affecting site B.
- To add animation when showing a drop-down menu.

To do so, we need to be able to define or redefine blocks in different technologies for a specific website only, or for certain pages only. This can be achieved using `Definition Levels`.

A `Definition Level` is a set of blocks grouped in one directory.

An implementation of every block from the library can be changed (or completely redefined) at project level.

![block levels](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/265eefc7-3944-41f1-af1a-b7cce18dcf90/block-levels2.jpg)

From page-building process’ perspective:

- When building a page, we can set a list of levels (directories) to use their blocks on that page. E.g., `build-page -l blocks-common -l blocks-my my-page.html`

From the file structure point of view:

- A project can have any number of levels. But only the levels that are evaluated during the build will be present on the page. It is possible to specify different sets of definition levels for different parts of the website.

On the JavaScript side:

- We need to define dynamic behavior of a page in declarative style. Final behavior is gathered from different definition levels. E.g.,

```js
/* blocks-common/dropdown/dropdown.js */
Block('dropdown', {
  init: function() {
    ...
  }
});

/* blocks-my/dropdown/dropdown.js */
Block('dropdown', {
  init: function() {
    this.__base();
    ...
  }
});
```

From the viewpoint of a template engine:

- To be able to not only define, but to redefine a template, one needs to apply a preceding template implementation. E.g., for XSL:

```xml
<xsl:template match="b:head">
  <div> <!-- Node for extra design -->
    <xsl:apply-imports/>
  </div>
</xsl:template>
```

From the architectural point of view:

- When developing a portal of several websites, we can extract a block library that serves as one of the definition levels for all the websites which are part of the portal. The blocks for a specific website will form another level.
- The same repo can hold blocks of both desktop and mobile versions. Such a project will have the following levels: common, mobile, desktop. Different combinations of these levels give the resulting implementation, required by specific pages.

[<VPIcon icon="fas fa-globe"/>Open source block library bem-bl (in development)](https://bem.github.com/bem-bl/index.en.html) is an example of having several definition levels in one repository.

---

## Building A Page

Working in terms of blocks means having a `Subject-Matter Abstraction`. This abstraction is for developers only, and browsers will get a compiled version of the code.

So we have `Code For People` and `Code For Browsers`—they are not the same.

- Programmers code blocks—browsers get the code for the whole page.

To turn `Code For People` into `Code For Browsers` we `Build` a page.

`Building A Page` means generating HTML, CSS, and JavaScript code from a page declaration (written in XML or JSON) by applying implementations of declared blocks.

On the CSS side:

- All CSS files are combined into a “single page” CSS file. Despite the fact that CSS for every block, element or modifier is stored in separate files, we don’t have to link these files to the page as is. It’s possible to collect all the required CSS implementations into one file. This also solves the well-known “number of imports” issue in IE, and decreases the number of HTTP requests. For combining CSS we use [borschik (<VPIcon icon="iconfont icon-github"/>`veged/borschik`)](https://github.com/veged/borschik).
- Browser gets minimized code. When building CSS, we can minimize and optimize CSS code using the [CSSO (<VPIcon icon="iconfont icon-github"/>`afelix/csso`)](https://github.com/afelix/csso) utility, for example.
- Each browser can get CSS code written especially for it. It is also possible to divide CSS implementations for different browsers and deliver only the code needed for each browser. [setochka—currently in prototype (<VPIcon icon="iconfont icon-github"/>`afelix/setochka`)](https://github.com/afelix/setochka) can be used for that.

From the JavaScript point of view:

- Similarly to CSS, JavaScript files can be combined into one.

From the template engine’s point of view:

- Only needed templates are included. Final set of templates that are used for displaying a page includes only the templates for required blocks. This boosts template performance and reduces the likelihood of side effects.

From the viewpoint of development process:

- Robots serve people (not the other way around). Developer writes code as they see fit. “Robots” take (some) care of performance by optimizing the code (together with making it unreadable) when building a page.

In terms of work organization:

- Division of labor. We have developers working on the core framework (compilers, tools, performance); library developers, who maintain the block library; application developers, who develop websites using the framework.

We use [BEM tools (<VPIcon icon="iconfont icon-github"/>`bem/bem-tools`)](https://github.com/bem/bem-tools) to build pages.

### How to Automate the Building Process?

The usage of [bem tools (<VPIcon icon="iconfont icon-github"/>`bem/bem-tools`)](https://github.com/bem/bem-tools) requires to run several commands for each page whenever page input data or blocks implementation are changed. As a result of these commands, you get CSS and JavaScript files for the page, page’s template, and if you are developing static pages, the HTML code of your page.

To avoid running these commands manually, there is also the [<VPIcon icon="iconfont icon-gnu"/>GNUmakefile](https://gnu.org/software/make/manual/make.html), which was written for a project that includes the instructions on how to build pages. You can find an example of such a file in the test project [bem-bl-test (<VPIcon icon="iconfont icon-github"/>`bem/bem-bl-test`)](https://github.com/bem/bem-bl-test/blob/master/GNUmakefile).

But the usage of GNU Make has a list of problems:

- You have to run it every time you have changed something.
- Every time you run gmake, it reads the information from a disk. So the compilation process could not be fast.
- The pages you build not only depend on the content of block files, but on their file structure as well. But it’s impossible to write a gmake goal dependency in these terms.

So we’d like to create something to replace GNU Make for the process of page building. This will be both a development server and a tool to build production files. `Bem Server` will be run in a project root directory, and give HTTP response with the page files built (so you won’t need to run gmake manually after each change). Besides, it will be able to watch the files (the adding and removing of them) via fs.FSWatcher that help to chache results efficiently.

`BEM Server` is a subcommand of [bem-tools (<VPIcon icon="iconfont icon-github"/>`bem/bem-tools`)](https://github.com/bem/bem-tools). Currently it can run an HTTP server, apply `BEMhtml` templates to `BEMjson` data and inline CSS imports using [borschik (<VPIcon icon="iconfont icon-github"/>`veged/borschik`)](https://github.com/veged/borschik) utility.

---

## Real Examples

[<VPIcon icon="fa-brands fa-yandex-international"/>Yandex](https://yandex.ru/) is a large (mostly Russian) company that use BEM methodology to develop its services.

BEM methodology does not request that you use a certain framework. You also don’t have to use BEM for all the technologies you have on your pages (but that would be the most efficient).

[<VPIcon icon="fa-brands fa-yandex-international"/>All the services of Yandex](https://yandex.ru/all) have BEM in their CSS, JavaScript code or XSL templates for their pages. E.g.,

- [<VPIcon icon="fa-brands fa-yandex-international"/>Yandex.Maps](https://maps.yandex.ru/?text=%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&amp;sll=37.609218%2C55.753559&amp;ll=37.609218%2C55.753563&amp;spn=2.570801%2C0.884460&amp;z=9&amp;l=map)
- [<VPIcon icon="fa-brands fa-yandex-international"/>Yandex.Images](https://images.yandex.ru/yandsearch?text=Yandex+office&amp;rpt=image) This is a service for searching images in the Internet.
- [<VPIcon icon="fa-brands fa-yandex-international"/>Yandex.Video](https://video.yandex.ru/#search?text=yac%202011) This is a service for both hosting and searching images.
- [<VPIcon icon="fa-brands fa-yandex-international"/>Yandex.Jobs](https://rabota.yandex.ru/)
- [<VPIcon icon="fa-brands fa-yandex-international"/>Turkish Yandex](https://yandex.com.tr/)

Some services don’t use XSL templates, building their pages with our newest template product, `Bemhtml` template engine which was mentioned above. These are the following services:

- Yandex Search or [<VPIcon icon="fa-brands fa-yandex-international"/>Yandex Search in English](https://yandex.com/yandsearch?text=%22What+is+BEM%3F%22+front-end&amp;lr=213)
- [<VPIcon icon="fa-brands fa-yandex-international"/>Mobile Apps Search](https://apps.yandex.ru/) This website is to look under smartphones.

There are also other companies that use BEM methodology.

For example, the guys at [<VPIcon icon="fas fa-globe"/>Mail.ru](https://mail.ru/) partly use BEM for their services. Some blocks on their pages are BEM-based in terms of CSS code. They also have their own C++ template engine, and write block templates according to this methodology.

More examples:

- [<VPIcon icon="fas fa-globe"/>Rambler.News](https://beta.news.rambler.ru/)
- [<VPIcon icon="fas fa-globe"/>HeadHunter](https://hh.ru/)
- [<VPIcon icon="fas fa-globe"/>TNK Racing Team](https://futurecolors.ru/tnkracing/)

You also may be interested in websites that use [bem-bl](https://bem.github.com/bem-bl/index.en.html) block library (in development):

- [<VPIcon icon="fas fa-globe"/>Mikhail Troshev vCard](https://mishanga.pro/) Source code is hosted at [GitHub (<VPIcon icon="iconfont icon-github"/>`mishanga/bem-vcard`)](https://github.com/mishanga/bem-vcard)
- BEM based web form with JZ validation

---

## Related Links

### Libraries

- [<VPIcon icon="fas fa-globe"/>An open source block library bem-bl](https://bem.github.com/bem-bl/index.en.html) (in development).

### Tools

<SiteInfo
  name="bem-archive/bem-tools"
  desc="Toolkit to work with files based on BEM methodology"
  url="https://github.com/bem-archive/bem-tools/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7dca81453e795930536d10606c9cb10a2143baf1e9c03a58502b5a6c55d259a1/bem-archive/bem-tools"/>

<SiteInfo
  name="veged/borschik"
  desc="Main repository moved to https://github.com/bem/borschik. Extendable builder for text-based file formats."
  url="https://github.com/veged/borschik/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/974bbeee9fad6e4b576c21df6912c7ac4c053f263698c3b0b017578fd27a2667/veged/borschik"/>

<SiteInfo
  name="afelix/setochka"
  desc="Divide et impera."
  url="https://github.com/afelix/setochka/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/be1f0d8209114328d4ba0e0a71fe8ee31110a5e09ae74a53e2b36695f42b2f9e/afelix/setochka"/>

<SiteInfo
  name="afelix/csso"
  desc="CSS-optimizer."
  url="https://github.com/afelix/csso/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c52f307d4edf4a5165de0d5de45534b369312fe89b2d7902c113f3ce9917197f/afelix/csso"/>

### Additional Information

<VidStack src="vimeo/38346573" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "BEM: A New Front-End Methodology",
  "desc": "This article is the sixth in our new series that introduces the latest, useful and freely available tools and techniques, developed and released by active members of the Web design community. The first article covered PrefixFree the second introduced Foundation, a responsive framework; the third presented Sisyphus.js, a library for Gmail-like client-side drafts, the fourth covered a free plugin called GuideGuide and the fifth presented Erskine Design's responsive grid generator Gridpak. Today, we are happy to feature a toolkit devised by Yandex: BEM.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/a-new-front-end-methodology-bem.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
