---
lang: en-US
title: "The Evolution Of The BEM Methodology"
description: "Article(s) > The Evolution Of The BEM Methodology"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Evolution Of The BEM Methodology"
    - property: og:description
      content: "The Evolution Of The BEM Methodology"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/the-history-of-the-bem-methodology.html
prev: /programming/css/articles/README.md
date: 2013-02-21
isOriginal: false
author:
  - name: Maxim Shirshin
    url : https://smashingmagazine.com/author/maksim-shirshin/
cover: https://files.smashing.media/articles/the-history-of-the-bem-methodology/sign-theme-stripe-1.png
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
  name="The Evolution Of The BEM Methodology"
  desc="In this article, Maxim Shirshin will introduce us to the history of the BEM methodology. BEM is a collection of ideas and methods. Companies and teams can integrate it into their existing workflow gradually, finding out what works best for them, using a unified language that consists of powerful terms: blocks, elements, modifiers. Learn about the challenges that a big company faces when gradually building an entire ecosystem of services with an ever-growing team of developers."
  url="https://smashingmagazine.com/2013/02/the-history-of-the-bem-methodology/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/the-history-of-the-bem-methodology/sign-theme-stripe-1.png"/>

In this article, Maxim Shirshin will introduce us to the history of the BEM methodology. BEM is a collection of ideas and methods. Companies and teams can integrate it into their existing workflow gradually, finding out what works best for them, using a unified language that consists of powerful terms: blocks, elements, modifiers. Learn about the challenges that a big company faces when gradually building an entire ecosystem of services with an ever-growing team of developers.

This article is a case study about the evolution of [**BEM**](/smashingmagazine.com/a-new-front-end-methodology-bem.md), a methodology that enables team members to collaborate and communicate ideas using a unified language that consists of simple yet powerful terms: blocks, elements, modifiers. Learn about the challenges that a big company faces when gradually building an entire ecosystem of services with an ever-growing team of developers.

Once upon a time, in a distant country far far away, an IT company named Yandex started developing Web search and related services. Time went by and its services grew, and more and more front-end developers put tireless effort into improving the ecosystem of Yandex. Great things they did, and amazing tools they built, making their developers’ lives easier, and the time has now come to **share that knowledge with the community**, to unleash the magic power of open source for the benefit of all good people out there.

Front-end developers are well known for their insatiable curiosity, which often yields innovation, as well as their remarkable laziness, which drives them to devise sophisticated systems in order to save precious time and to unify and automate everything.

Let’s travel back in time to 2005 and sneak a peek over the shoulder of a very very busy Yandex front-end developer and thus see…

---

## …Where It All Began

Back in 2005, the focus was still pretty much on the server side of things. From a front-ender’s perspective, a typical Yandex project was a set of static HTML pages used as a base reference to build advanced templates such as XSL style sheets. These pages were kept in a separate folder that looked like this after a checkout:

```sh title="file structure"
about.html
index.html
…
project.css
project.js
i/
   yandex.png
```

There was a static HTML file for each page, with all of the CSS pushed into a single style sheet, `project.css`, and all JavaScript placed in a single `project.js` file, with both files shared between all project pages. Back in 2005, JavaScript was only sparsely applied, so all of the interaction magic could fit comfortably in a small file. Images resided in a separate folder, because they were numerous. With IE 5 roaming in the wild and no CSS3, images were used for all sorts of eye candy, even for rounded corners (none of you younger Web developers would probably believe me).

To retain the basic structure, style definitions for different page sections were separated **using plain CSS comments**:

```css
/* Content container (begin) */
#body {
  font: 0.8em Arial, sans-serif;
  margin: 0.5em 1.95% 0.5em 2%;
}
/* Content container (end) */

/* Graphical banner (begin) */
.banner {
  text-align: center;
}
.banner a {
  text-decoration: none;
}
/* Graphical banner (end) */
```

Both IDs and class names were used in HTML markup.

Bits of HTML were manually pasted into production XSL style sheets, and **all changes were synced two-way, manually**. That was hard, and when it wasn’t hard, it was dull.

### Mid-Scale Projects

By the beginning of 2006, the first version of Yandex.Music had been under heavy development. Multiple pages, each unlike the others, didn’t fit well into familiar simplistic concepts. Dozens of CSS classes that one had to invent meaningful names for, a growing number of unintentional dependencies spreading across the project — all of this was calling for **a better solution**.

Here is a typical piece of CSS code from those days:

```css
/* Albums (begin) */
.result .albums .info {
  padding-right: 8.5em;
}
.result .albums .title {
  float: left;
  padding-bottom: 0.3em;
}
.result .albums .album .listen {
 float: left;
 padding: 0.3em 1em 0 1em;
}
.result .albums .album .buy {
  float: left;
  padding: 0.4em 1em 0 1.6em;
}
.result .albums .info i {
  font-size: 85%;
}
/* Albums (end) */
```

**Long cascading rules** were used throughout the code.

Have a look at another:

```css
/* Background images (begin) */
.b-foot div {
  height: 71px;
  background: transparent url(../i/foot-1.png) 4% 50% no-repeat;
}
.b-foot div div {
  background-position: 21%;
  background-image: url(../i/foot-2.png);
}
.b-foot div div div {
  background-position: 38%;
  background-image: url(../i/foot-3.png);
}
.b-foot div div div div {
  background-position: 54%;
  background-image: url(../i/foot-4.png);
}
.b-foot div div div div div {
  background-position: 71%;
  background-image: url(../i/foot-5.png);
}
.b-foot div div div div div div {
  background-position: 87%;
  background-image: url(../i/foot-6.png);
}
/* Background images (end) */
```

Notice that ID and tag name selectors were used in many rules.

At the same time, an even bigger project was being started wow.ya.ru: a blogging platform, a place for people to interact, to share, to read and to engage.

There were dozens of various pages to support. And with the old-fashioned approach, the code was losing control on so many levels.

### Blocks To The Rescue

We needed to specify a data domain to manage page interface objects. This was a **methodology issue**: we needed to clarify the way we worked with concepts such as classes, tags, visual components, etc.

For a typical Web page in a Yandex project, the HTML structure and its CSS styles were still the focus of our development efforts, with JavaScript being a supplementary technology. To be able to more easily maintain the HTML and CSS of many components, a new term was devised: “block.” A **block** was a part of a page design or layout whose specific and unique meaning was defined either semantically or visually.

In most cases, any distinct page element (either complex or simple) could be considered a block. Its HTML container got a unique CSS class, which also became a block name.

CSS classes for blocks got prefixes (`b-`, `c-`, `g-`) to provide a sort of namespace emulation in CSS. The naming convention itself was changed later, but here is the initial list, annotated:

- `b-` (block) An independent block, placed on a page wherever you needed it.
- `с-` (control) A control (i.e. an independent block), with a JavaScript object bound to it.
- `g-` (global) A global definition, used sparingly and always defined for a specific, unique purpose. The number of these definitions were kept to a minimum.

Some suffixes were employed as well, such as:

- `-nojs` (no JavaScript) A style rule to be applied with JavaScript turned off. An `onload` callback could remove these suffixes from all DOM nodes, semantically marking them up as “JavaScript-enabled.”

### What’s Inside?

In an HTML container holding a block, some of the inner nodes had distinct CSS classes. This not only facilitated the creation of tag name-independent style rules, but also assigned **semantically meaningful roles** to each node. Such nodes were “block elements,” or simply “elements.”

The **core distinction between a block and an element** is an element’s inability to exist outside of its parent block’s context. If something couldn’t be detached from a block, it was an element; detachable elements (probably) should themselves be blocks.

At first, an element could exist only in a block container. Later, a technique was devised to place some elements outside and still keep the block consistent.

In style sheets, elements with a lot of CSS got extra indentation and were wrapped in comments:

```css
/* Head (begin) */
.b-head { … }

/* Logo (begin) */
.b-head .logo { … }
.b-head .logo a { … }
/* Logo (end) */

/* Right side (begin) */
.b-head .right { … }

/* Info (begin) */
.b-head .info { … }
.b-head .info .exit a { … }
/* Info (end) */

/* Search (begin) */
.b-head .search { … }
.b-head .search div div, .b-head .search div div i { … }
/* Search (end) */
/* Right side (end) */

/* Head (end) */
```

### The Project’s File Structure Evolves

At Yandex, a front-end developer usually supports more than one project. Switching between different repositories and various branches is easier when all projects use the same (or a similar) file structure. Granularity is another requirement because it provides **more flexibility for version-control systems** and helps to avoid conflicts during concurrent development.

This led us to a more unified structure: CSS, JavaScript and image files would reside in separate folders. In CSS, there were dedicated files for IE-specific workarounds, to keep the main code clean and standards-compliant. In production, IE would get its well-earned CSS hackery via IE-only conditional comments.

**JavaScript** was being employed more and more; thus, the addition of optional components and libraries.

Here is a typical file structure:

```sh title="file structure"
index.html
css/
  yaru.css
  yaru-ie.css
js/
  yaru.js
i/
  yandex.png
```

IE-specific hacks could have gone into the main CSS file (`yaru.css`) if they complied with CSS standards:

```css
/* Common definitions (begin) */
body {
  font-family: Arial, sans-serif;
  font-size: 0.8em;
  padding: 0 0 2em 0;
  background: #fff;
}
* html body {
  font-size: 80%;
}
```

Non-valid workarounds were put in a standalone `yaru-ie.css` file (loaded with IE-only conditional comments).

```css
/* Common blocks (begin) */
/* Artist (begin) */
.b-artist .i i {
  top: expression(7 + (90 - this.parentNode.getElementsByTagName('img')[0].height)/2);
  filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../i/sticker-lt.png', sizingMethod='crop');
}
```

---

## Building A Framework: The Beginning

Designing similar projects eventually meant recreating the same blocks over and over again. Yandex is a portal and offers more than a hundred services that share the same corporate style, so careless copying and pasting wouldn’t work on that scale. Just to have something to begin with, **we made a small compilation of reusable components**, known internally as the common blocks library, or simply the common.

The first page fragments to be unified were the header, footer and some CSS typographic elements. Corresponding files were hosted on an internal dedicated server (`common.cloudkill.yandex.ru` in the listing below). Those were the early days of our unified framework.

Styles could be imported directly from that server:

```css
@import url(https://common.cloudkill.yandex.ru/css/global.css);
@import url(https://common.cloudkill.yandex.ru/css/head/common.css);
@import url(https://common.cloudkill.yandex.ru/css/static-text.css);
@import url(https://common.cloudkill.yandex.ru/css/foot/common-absolute.css);
@import url(https://common.cloudkill.yandex.ru/css/foot/common-absolute-4-columns.css);
@import url(https://common.cloudkill.yandex.ru/css/list/hlist.css);
@import url(https://common.cloudkill.yandex.ru/css/list/hlist-middot.css);
@import url(https://common.cloudkill.yandex.ru/css/dropdown/dropdown.css);
@import url(https://common.cloudkill.yandex.ru/css/dropdown/dropdown-arrow.css);
@import url(slider.css);

/* Header (begin) */
/* Service (begin) */
.b-head .service h1 { … }
.b-head .service h1, .b-head .service h1 a, .b-head .service h1 b { … }
```

Obviously, these were too many imports! So, we decided to precompile styles (and, later, JavaScript files) before deployment. The compilation would replace `@import` directives with the file’s actual contents (a process called “inlining”) and would perform optimizations. Our internal inlining tool evolved from a simple wrapper script into an open-source project, [<VPIcon icon="iconfont icon-github"/>`veged/borschik`](https://github.com/veged/borschik). Try it out!

---

## Independent Blocks As A Concept

By the fall of 2007, our everyday practice had gotten some theory behind it. The concept of independent blocks, the basic idea behind our understanding of HTML and CSS layouts, was featured at the ClientSide 2007 conference in Moscow, Russia.

In that presentation, the first attempt to define a block was made.

### Blocks: Declaration Of Independence

In our attempt to produce a formal (in fact, semi-formal) definition of a block, the following three principles were highlighted:

1. Only class names (not IDs) should be used for CSS.
2. Each block’s class name should have a namespace (prefix).
3. Every CSS rule must belong to a block.

As soon as unique IDs were dropped, a block could be used on the same page more than once. This also allowed two or more classes to coexist in the same DOM node, which turned out to be quite useful later.

### Simple And Compound Blocks: The Misclassification

We defined “simple” blocks as ones not able to hold other blocks anywhere inside. “Compound” blocks, on the other hand, were allowed (even required) to have nested blocks.

This classification was naive. Even the simplest blocks were sometimes wrapped around other blocks and had to be “upgraded” and refactored to fit the new role. This misclassification backfired so many times, in fact, that we finally accepted the opposite principle: any block should **allow for arbitrary content to be embedded**, whenever possible.

### Completely Independent Blocks

CSS definitions weren’t bulletproof when we mixed a lot of styled content originating from different sources on a single page. In complex layouts, blocks could alter each other’s appearance because of conflicts in element names. Tag name-based CSS rules might match more nodes than intended. Therefore, a stricter version of an independent block (named “completely independent block,” or **CIB**) was defined, with the following rules added:

1. Never match CSS with tag names. Use class names for everything. `.b-user b → .b-user .first-letter`
2. Class names for block elements must be prefixed with the parent’s block name. `.b-user .first-letter → .b-user-first_letter`

Such class names tend to be much longer, and the resulting HTML code was considerably bigger.

This was the main reason why CIB was considered to be a costly solution, used more as a remedy than as an everyday practice.

### Prefixes

As you are certainly aware, naming variables is one of the most difficult development problems, ever. We approached it cautiously and came up with four prefixes that would be allowed in block names, each with its own semantics.

- `b-` Common blocks
- `h-` Holsters, used to glue several elements together
- `l-` Layout grids
- `g-` Global styles

### Modifiers

A “modifier” can be defined as a particular state of a block, a flag holding a specific property.

This is best explained with an example. A block representing a button could have three default sizes: small, normal and big. Instead of creating three different blocks, you would assign a modifier to the block. The modifier would require a name (for example, `size`) and a value (`small`, `normal` or `big`).

There are two reasons for a block to change its presentation state:

1. A block’s presentation could be altered because of its placement in the layout. This was called a “context-dependent” modification.
2. An additional (postfixed) class name could change a block’s appearance by applying extra CSS rules. This was a “context-independent” modifier. `class="b-block b-block-postfix"`

---

## A Unified Portal-Wide Framework

At the beginning of 2008, Yandex was going through a major review of its internal design policies. We decided to create a branding book (for internal use) to enforce best practices in interface design, company-wide.

This task was assigned to the front-end team, and after some pondering of options, we decided to proceed with it using familiar technologies: HTML and CSS.

**Interfaces evolve fast**, so fast that any long-term attempt to describe interfaces with words and pictures would become obsolete even before completion. We needed a branding book that would represent our interfaces as they were: changing rapidly yet still unified between different Yandex services and products.

Therefore, we decided that our interface branding book should be built with the same blocks that we used to build our websites. Blocks could be shared between projects and would represent the latest in Yandex’s interface design.

We decided to build a portal-wide framework of blocks so that all could benefit from it and contribute back. The project was internally named “Lego.”

### Framework Repository Structure: First Approach

The top-most level corresponded to **various available implementations**:

```sh title="file structure"
css/
html/
js/
xml/
xsl/
```

Each implementation had its own folder sub-structure.

**CSS** went into three different folders:

```sh title="file structure"
css/
  block/
    b-dropdown/
      b-dropdown.css
  service/
    auto/
      block/
        b-head-logo-auto.css
        head.css
  util/
    b-hmenu/
      b-hmenu.css
```

1. `block` These were blocks shared between services.
2. `util` There were general-purpose blocks ready to be open-sourced.
3. `service` These were CSS styles for specific Yandex services, used for branding, headers and footers, etc.

**The HTML’s folder structure** was identical to the CSS’:

```sh title="file structure"
html/
  block/
    b-dropdown.html
  service/
    auto/
      l-head.html
  util/
    b-hmenu.html
```

**JavaScript** was loosely structured and used inconsistently between services, though:

```sh title="file structure"
js/
  check-is-frame.js
  check-session.js
  clean-on-focus.js
  dropdown.js
  event.add.js
  event.del.js
```

**Each service had a corresponding XML file** that semantically described its page header (and that provided necessary project-specific data). In conjunction with an XSL style sheet, the XML file was enough to generate the header HTML code.

```sh title="file structure"
xml/
  block/
    b-head-tabs-communication.xml
    common-services.ru.xml
    head-messages.ru.xml
  service/
    auto/
      head.xml
```

**XSL templates** for various blocks (one file per block) were contained in one folder:

```sh title="file structure"
xsl/
  block/
    b-dropdown.xsl
    b-head-line.xsl
    i-common.xsl
    i-locale.xsl
    l-foot.xsl
    l-head.xsl
```

**What about integration?**

Lego was linked to projects with the help of a version-control feature known as `svn:externals`.

When a package was built for production deployment, the code from the external library (Lego) was embedded in the package, similar to static library linking in compiled languages.

Lego provided an SVN branch for each of its major releases. Sticking to a branch in `svn:externals` allowed for hot fixes to be introduced to a project; for extreme stability, a project could be frozen at a specific Lego revision. In either case, major version switches could be prepared and done whenever necessary.

This simple technique proved quite flexible, and it is employed to this day for many Yandex services.

### Per-Page Files

CSS files imported rule definitions for blocks used on a page from the Lego folder structure.

```css
@import url(../../block/l-head/l-head.css);
@import url(../../block/b-head-logo/b-head-logo.css);
@import url(../../block/b-head-logo/b-head-logo_name.css);
@import url(block/b-head-logo-auto.css);
```

The consistency of importing directives was maintained manually.

By that point, we hadn’t yet come to a convention for unified file naming, and we tried several approaches.

---

## Portal-Wide Framework: Lego 1.2 (2008)

Upon the release of Lego 1.2, the code had been refactored and the folder structure changed.

```sh title="file structure"
common/
  css/
  js/
  xml/
  xsl/
example/
  html/
service/
  auto/
    css/
    xml/
```

Blocks previously separated and placed in <VPIcon icon="fas fa-folder-open"/>`util` and <VPIcon icon="fas fa-folder-open"/>`block` folders were combined. Common styles shared by most blocks were moved to <VPIcon icon="fas fa-folder-open"/>`common/css`. We had been pondering the possibility of open-sourcing the code but postponed it until two years later.

```sh title="file structure"
common/
  css/
    b-dropdown/
      arr/
        b-dropdown.arr.css
        b-dropdown.arr.ie.css
        b-dropdown.css
        b-dropdown.ie.css
```

IE-specific styles were renamed from <VPIcon icon="fa-brands fa-css3-alt"/>`*-ie.css` to <VPIcon icon="fa-brands fa-css3-alt"/>`*.ie.css`.

All contents of optional CSS files (such as <VPIcon icon="fa-brands fa-css3-alt"/>`b-dropdown_arr.css`) were moved into separate folders (<VPIcon icon="fas fa-folder-open"/>`arr/`<VPIcon icon="fa-brands fa-css3-alt"/>`b-dropdown.arr.css`).

For class name-based modification of a block, the underscore was assigned as a separator, replacing the single dash that was used previously.

This made a block name visually separate from a modifier name, and it proved quite useful for us while developing automated tools because it allowed for unambiguous search and pattern matching.

---

## BEM, Est. 2009

In March 2009, Lego 2.0 was released. That event marked **the rise of the BEM methodology**.

**BEM stands for “block, element, modifier,”** the three key entities we use to develop Web components.

![](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9950698d-da99-4f0d-8e11-ee3daf5766ac/sign-theme-stripe-1.png)

### Lego 2.0 In 2009

What key update did version 2.0 deliver?

It established the primacy of the “block” concept over underlying implementation technologies.

Each block was contained in a separate folder, and each technology (CSS, JavaScript, XSL, etc.) represented by a separate file. Documentation got its own file type, such as `.wiki`.

What other principles did we follow at the time?

### Terminology Excerpts

An “independent block” could be used on any Web page and placed anywhere in the layout. Because we used XML and XSL templating, a block was represented by a node in the `lego` namespace.

::: tabs

@tab:active XML

```xml
<lego:l-head>
<lego:b-head-logo>
```

@tab HTML+CSS

In HTML, a block container node got a class name corresponding exactly to the block’s name.

```html
<table class="l-head">
<div class="b-head-logo">
```

```css
.l-head
.b-head-logo
```

:::

**All block files** (CSS, JavaScript, HTML, XSL) were stored in the block’s folder:

```sh title="file structure"
common/
  block/
    b-head-logo/
      b-head-logo.css
      b-head-logo.xsl
      b-head-logo.js
      b-head-logo.wiki
```

In **XML files** that define page structure, blocks are defined with nodes in the `lego` namespace (with the block name’s prefix omitted):

```xml
<lego:b-head-logo>
   <lego:name/>
</lego:b-head-logo>
```

**Prefixes for HTML classes** inside the block were omitted as well.

```html
<div class="b-head-logo">
   <span class="name">Web Service Name Here</span>
</div>

.b-head-logo .name { … }
```

**Files describing block elements** each got their own folder:

```sh title="file structure"
common/
  block/
    b-head-logo/
      name/
        b-head-logo.name.css
        b-head-logo.name.png
        b-head-logo.name.wiki
```

**Modifiers in XML** were specified as node attributes in the `lego` namespace:

```xml
<lego:b-head-tabs lego:theme="grey">
```

In HTML, an extra class name was added:

```html
<div class="b-head-tabs b-head-tabs_grey">
```

```css
.b-head-tabs_grey { … }
```

**Modifier files** (i.e. styles and so on) went into separate folders, prefixed with an underscore:

```sh title="file structure"
common/
  block/
    b-head-logo/
      _theme/
        b-head-logo_gray.css
        b-head-logo_gray.png
        b-head-logo_gray.wiki
```

### Declarations In XML

All Lego components used in a project were defined in an XML file:

```xml
<lego:page>
  <lego:l-head>
    <lego:b-head-logo>
       <lego:name/>
    </lego:b-head-logo>

    <lego:b-head-tabs type="search-and-content"/>

    <!-- ... -->
  </lego:l-head>
</lego:page>
```

This XML allowed for CSS imports to be generated:

```css
@import url(../../common/block/global/_type/global_reset.css);
@import url(../../common/block/l-head/l-head.css);
@import url(../../common/block/b-head-logo/b-head-logo.css);
@import url(../../common/block/b-head-logo/name/b-head-logo.name.css);
@import url(../../common/block/b-head-tabs/b-head-tabs.css);
@import url(../../common/block/b-dropdown/b-dropdown.css);
@import url(../../common/block/b-dropdown/text/b-dropdown.text.css);
@import url(../../common/block/b-pseudo-link/b-pseudo-link.css);
@import url(../../common/block/b-dropdown/arrow/b-dropdown.arrow.css);
@import url(../../common/block/b-head-search/b-head-search.css);
@import url(../../common/block/b-head-search/arrow/b-head-search.arrow.css);
@import url(../../common/block/b-search/b-search.css);
@import url(../../common/block/b-search/input/b-search.input.css);
@import url(../../common/block/b-search/sample/b-search.sample.css);
@import url(../../common/block/b-search/precise/b-search.precise.css);
@import url(../../common/block/b-search/button/b-search.button.css);
@import url(../../common/block/b-head-userinfo/b-head-userinfo.css);
@import url(../../common/block/b-head-userinfo/user/b-head-userinfo.user.css);
@import url(../../common/block/b-user/b-user.css);
@import url(../../common/block/b-head-userinfo/service/b-head-userinfo.service.css);
@import url(../../common/block/b-head-userinfo/setup/b-head-userinfo.setup.css);
@import url(../../common/block/b-head-userinfo/region/b-head-userinfo.region.css);
@import url(block/b-head-logo/b-head-logo.css);
@import url(block/b-head-search/b-head-search.css);
```

This example shows that common styles were imported first; then, project styles applied extra definitions on top of that. This made project-specific changes possible, while maintaining a common shared code base.

The same XML declarations allowed for JavaScript includes to be autogenerated.

```js
include("../../common/block/i-locale/i-locale.js");
include("../../common/block/b-dropdown/b-dropdown.js");
include("../../common/block/b-search/sample/b-search.sample.js");
include("../../common/block/b-head-userinfo/user/b-head-userinfo.user.js");
```

XSL template imports were autogenerated as well, using the same XML-based definitions:

```xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="https://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:import href="../../common/block/i-common/i-common.xsl"/>
<xsl:import href="../../common/block/i-items/i-items.xsl"/>
<xsl:import href="../../common/block/l-head/l-head.xsl"/>
<xsl:import href="../../common/block/b-head-logo/b-head-logo.xsl"/>
<xsl:import href="../../common/block/b-head-logo/name/b-head-logo.name.xsl"/>
<xsl:import href="../../common/block/b-head-tabs/b-head-tabs.xsl"/>
<xsl:import href="../../common/block/b-dropdown/b-dropdown.xsl"/>
<xsl:import href="../../common/block/b-pseudo-link/b-pseudo-link.xsl"/>
<xsl:import href="../../common/block/b-head-search/b-head-search.xsl"/>
<xsl:import href="../../common/block/b-search/b-search.xsl"/>
<xsl:import href="../../common/block/b-search/input/b-search.input.xsl"/>
<xsl:import href="../../common/block/b-search/sample/b-search.sample.xsl"/>
<xsl:import href="../../common/block/b-search/precise/b-search.precise.xsl"/>
<xsl:import href="../../common/block/b-search/button/b-search.button.xsl"/>
<xsl:import href="../../common/block/b-head-userinfo/b-head-userinfo.xsl"/>
<xsl:import href="../../common/block/b-user/b-user.xsl"/>
<xsl:import href="../../common/block/b-head-userinfo/service/b-head-userinfo.service.xsl"/>
<xsl:import href="../../common/block/b-head-userinfo/setup/b-head-userinfo.setup.xsl"/>
<xsl:import href="../../common/block/b-head-userinfo/region/b-head-userinfo.region.xsl"/>

</xsl:stylesheet>
```

Code generation was an important step forward. From this point onward, we didn’t have to maintain dependencies manually.

### CSS Selector Speed, Revisited (2009)

During the major redesign of the Yandex.Mail service in 2009, interface responsiveness and overall speed were the key goals. We wanted to release a Web application that felt as fast as desktop software, maybe even faster.

Client-side (i.e. in-browser) XSL transformations were employed as the main templating solution (the XML with all of the data was loaded separately). According to initial measurements, XSL transforms were applied almost instantly, but the resulting HTML code took significant time to be appended to the DOM. Disabling CSS, however, made that problem go away magically.

After studying various factors that could affect rendering speed, CSS selectors were identified as a major source of the slowdown. The bigger the DOM tree and CSS style sheet, the longer it took for all CSS rules to be applied.

A summary of our study is available (in Russian).

It turns out that switching to simple selectors and eliminating CSS cascades wherever possible enabled the CSS rules to be applied much faster. Selectors based on a single class name were quick, and browsers handled them with ease. We already had a solution that could use such selectors, the so-called “completely independent blocks” (CIB).

All Lego blocks were refactored to comply with the CIB restrictions. As soon as all class names were made unique, most rules came to use only a single class query and worked way faster.

```html
<div class="b-head-logo">
   <span class="b-head-logo__name">
      Web Service Name Here
   </span>
</div>
```

### Establishing Naming Conventions

After making several attempts to modify naming conventions, we agreed on principles that haven’t changed since.

In file names, the dot separator was replaced by a double underscore (`__`):

- Before: `b-block.elem.css`
- After: `b-block__elem.css`

Thus, file names were made consistent with CSS selectors.

Block elements were allowed to have their own modifiers, too. So, `.b-block__elem_theme_green` was similar to `.b-block_theme_green`.

Modifiers were changed to be a key-value pair:

- Before: `.b-menu__item_current`
- After: `.b-menu__item_state_current`

This change turned out to be useful for working with modifiers from JavaScript.

---

## Going Open-Source (2010)

In 2010, we published some code on [our GitHub account (<VPIcon icon="iconfont icon-github"/>`bem`)](https://github.com/bem) to continue growing as an open-source project.

### Creating The BEM-BL Library

Blocks from Lego are being gradually ported to [<VPIcon icon="iconfont icon-github"/>`bem/bem-bl`](https://github.com/bem/bem-bl), a library of blocks that we consider useful for any website, not just Yandex projects. As blocks are gradually open-sourced, we improve code and add features.

This is very much a work in progress, and we invite everybody to make pull requests.

We’ve also developed [<VPIcon icon="iconfont icon-github"/>`bem/bem-tools`](https://github.com/bem/bem-tools), a set of helper scripts and automation utilities that make working with BEM files easier. This is mostly done with Node.js, to keep barriers low for front-end people who are familiar with JavaScript and are willing to contribute.

### Redefinition Levels In BEM

One size never fits all… but one BEM does! Because blocks and elements are represented in a file system as files and folders, and BEM’s file structure is unified and based mostly on semantic criteria, we can easily redefine a part of a BEM block and add functionality. Similar to the way we extend objects in JavaScript, BEM blocks can be extended using so-called “redefinition levels.”

A typical redefinition level might be defined like this:

1. The public `bem-bl` library pulled from GitHub, extended by…
2. An internal block library (such as Lego), extended by…
3. A project-specific block library.

You’re free to add more levels. Perhaps you need some page-specific block improvements… Oh, you get the idea.

For example:

```sh title="file structure"
bem-bl/
  b-logo/
lego/
  b-logo/
auto/
  blocks/
    b-logo/
```

Using a custom file structure for a particular redefinition level is also possible. As long as you follow the BEM concept, all you need to do is configure our building tools according to your cool new structure. We won’t go into much detail here, but there is a configuration file for this:

```sh title="file structure"
.bem/
  level.js
```

You could specify different file-naming patterns, or even flatten your folder structure completely.

### BEMHTML Templating Engine

We tried different templating solutions and ended up developing our own, called BEMHTML.

This templating engine:

1. Operates based on core BEM principles (block, element, modifier);
2. Supports redefinition levels;
3. Precompiles templates into JavaScript code that runs either in a browser or on a server.

More details on BEMHTML are available here (although in Russian):

- `clubs.ya.ru/bem/replies.xml?item_no=898`
- `clubs.ya.ru/bem/replies.xml?item_no=899`
- `clubs.ya.ru/bem/replies.xml?item_no=1153`
- `clubs.ya.ru/bem/replies.xml?item_no=1172`
- `clubs.ya.ru/bem/replies.xml?item_no=1391`

---

## BEM: Try This At Home!

As you can see, BEM has a long history of trial and error. It took Yandex a while to figure out what was important and what was not.

The foundation of the BEM methodology is block, element, modifier. These entities are used consistently in all of our projects.

BEM as we know and use it today is not the final answer, nor a revelation, but rather something constantly being driven by practice and tested in real-life projects. You can follow this to the extent that you find useful.

BEM is **quite flexible, because it is mostly a methodology**. There is no such thing as a BEM API or a BEM SDK. While we encourage you to try the open-source tools we provide, which are indeed a BEM framework, you might find that BEM principles are good enough to be embedded in your products or technologies in a different way.

Let’s discuss an example briefly.

### Multiple Blocks In A Single File

Let’s assume you’ve got a Web project and want to give BEM a try by using it here and there in your HTML and CSS. That’s great. That’s how we started using BEM, too!

Choose the approach that you find the easiest to understand and to maintain. For example, you could give your block elements simple (non-prefixed) classes and then use modifiers with a key-value pair:

```css
.b-block
.b-block .elem
.b-block_size_l
.b-block .elem_size_l
```

You could go one step further and assign a specific class to all DOM nodes in your block that have semantic meaning (those “completely independent blocks” that we talked about above):

```css
.b-block
.b-block__elem
.b-block_size_l
.b-block__elem_size_l
```

Find the CSS prefixes too long to type? Remove them!

```css
.block
.block__elem
.block_size_l
.block__elem_size_l
```

This is a perfect opportunity to try out BEM concepts. And because we don’t have strict rules, you can’t really break anything as long as you adhere to the main principle of block, element, modifier.

Establish a single file for each technology you use, and put all block declarations together:

```sh title="file structure"
myfacebook/
  myfacebook.css
  myfacebook.js
  myfacebook.html
```

You’ll have to support all of your changes manually at this stage (without bem-tools), but this could shorten the learning curve as well!

### Blocks In A Separate Folder

As your project grows, you’ll find it more convenient to keep each block in a separate file. Just create an extra folder and put all block declarations in there:

```sh title="file structure"
blocks/
  b-myblock.css
  b-myblock.js
  b-yourblock.css
  b-yourblock.js
```

At this point, you’ll need to build your JavaScript and CSS files to combine multiple block declarations into a single one (i.e. gather all individual block styles into the project’s CSS file). Try bem-tools to see if you find them useful!

### Making Things Optional

Some blocks might have elements or modifiers that are used only on certain pages or in particular scenarios. You can load optional elements separately to keep the core file small and neat:

```sh title="file structure"
blocks/
  b-myblock/
    b-myblock_mod_val1.css
    b-myblock__opt-elem.css
    b-myblock__opt-elem_mod_val1.css
    b-myblock.css
```

### Modifiers In Folders

For blocks with many modifiers, put the modifiers into separate folders:

```sh title="file structure"
blocks/
  b-myblock/
    _mod/
      b-myblock_mod_val1.css
      b-myblock__opt-elem.css
      b-myblock__opt-elem_mod_val1.css
    b-myblock.css
```

This will make the block’s root folder easier to maintain.

### Optional Elements In Folders

Block elements may also be made optional and get put in separate folders. This is an advanced, although quite flexible, approach.

```sh title="file structure"
blocks/
  b-myblock/
    _mod/
      b-myblock_mod_val1.css
    __opt-elem/
      b-myblock__opt-elem.css
    b-myblock.css
```

This is how we write the `bem-bl` library and most of the Lego blocks these days.

### A Folder For Everything!

You can have a separate folder for each element and each modifier, be it optional or not. This is very logical and clear, but you might find this consistent structure a bit more difficult to maintain:

```sh title="file structure"
blocks/
  b-myblock/
    _mod/
      b-myblock_mod_val1.css
    __elem/
      b-myblock__elem.css
      b-myblock.css
```

You’ll be able to understand a block structure just from its folder structure, without even reading a single line of code. This is an unprecedented level of transparency, although it comes at a cost.

We have not yet fully decided to switch to this approach in Lego, but this is the most likely option.

---

## Summary

There is no such thing as “true BEM,” and we don’t try to create one. The implementation we offer is consistent and we like it a lot, but you can create your own and still call it BEM, as long as you stay true to the core principles.

BEM is a collection of ideas and methods, a methodology. Companies and teams can integrate it into their existing workflow gradually, finding out what works best for them.

::: info Credits

This article is based on an introductory presentation given by [Vitaly Harisov (<VPIcon icon="fa-brands fa-x-twitter"/>`harisov`)](https://x.com/harisov), one of the creators of the BEM methodology, at a Yandex.Saturday event in Minsk, Belarus, in 2011.

:::

::: info Further Reading

```component VPCard
{
  "title": "BEM: A New Front-End Methodology",
  "desc": "This article is the sixth in our new series that introduces the latest, useful and freely available tools and techniques, developed and released by active members of the Web design community. The first article covered PrefixFree the second introduced Foundation, a responsive framework; the third presented Sisyphus.js, a library for Gmail-like client-side drafts, the fourth covered a free plugin called GuideGuide and the fifth presented Erskine Design's responsive grid generator Gridpak. Today, we are happy to feature a toolkit devised by Yandex: BEM.",
  "link": "/smashingmagazine.com/a-new-front-end-methodology-bem.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

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
  "title": "How To Build A Magazine Layout With CSS Grid Areas",
  "desc": "Web development, especially what you can do with CSS, has become increasingly complex. With the added capabilities of CSS Grid, it is now possible to achieve layouts that look like they were laid out by hand. Let’s tackle a practical example of how to do something like that.",
  "link": "/smashingmagazine.com/build-magazine-layout-css-grid-areas.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Write Better CSS By Borrowing Ideas From JavaScript Functions",
  "desc": "Many problems with website layouts happen when we don’t write CSS with the same care we’d use when writing a JavaScript function. Let’s look at how we can borrow best practices and ideas from writing good JavaScript functions for writing CSS.",
  "link": "/smashingmagazine.com/write-better-css-borrow-ideas-javascript-functions.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Evolution Of The BEM Methodology",
  "desc": "In this article, Maxim Shirshin will introduce us to the history of the BEM methodology. BEM is a collection of ideas and methods. Companies and teams can integrate it into their existing workflow gradually, finding out what works best for them, using a unified language that consists of powerful terms: blocks, elements, modifiers. Learn about the challenges that a big company faces when gradually building an entire ecosystem of services with an ever-growing team of developers.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/the-history-of-the-bem-methodology.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
