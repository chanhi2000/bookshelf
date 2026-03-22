---
lang: en-US
title: "Hey, It’s Still OK to Use Tables"
description: "Article(s) > Hey, It’s Still OK to Use Tables"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Hey, It’s Still OK to Use Tables"
    - property: og:description
      content: "Hey, It’s Still OK to Use Tables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/hey-its-still-ok-to-use-tables.html
prev: /programming/css/articles/README.md
date: 2017-11-01
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2017/10/tables_babyboomerangatuang-300x300.jpg
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
  name="Hey, It’s Still OK to Use Tables"
  desc="Baby Boomerangutuang, one of the Tick’s students. He was just shouting It’s OK to play with dolls! Consider this post to be the sequel to my 2012 post It’s OK to Use Tables. Here I will go into bit more detail based on the state of accessible efforts I see…"
  url="https://adrianroselli.com/2017/11/hey-its-still-ok-to-use-tables.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2017/10/tables_babyboomerangatuang-300x300.jpg"/>

![Baby Boomerangutuang, a guy in a gorilla costume, without the head, but with a belt of doll babies.](https://adrianroselli.com/wp-content/uploads/2017/10/tables_babyboomerangatuang.jpg)

Baby Boomerangutuang, one of the Tick’s students. He was just shouting It’s OK to play with dolls!

Consider this post to be the sequel to my 2012 post [**It’s OK to Use Tables**](/adrianroselli.com/its-ok-to-use-tables.md). Here I will go into bit more detail based on the state of accessible efforts I see today.

In that post I identified two scenarios I see frequently as a result of developers blindly following the *don’t use tables* mantra of near-modern web development:

1. Tables displayed via images, usually with useless alternative text,
2. Tables assembled from the flammable tinder of `<div>`s.

Here we are in 2017 and the slow oozing of ARIA into frameworks and libraries has emboldened the anything-but-a-table movement — because developers feel they can re-create any table semantics they excise.

Couple this with some confusion about *how* to make a standard table accessible, and we have a bit of a mess. Enough of a mess that nearly every accessibility audit I perform has a non-`<table>` table in it.

I want to qualify that I am talking about *data* tables, not layout tables. Data tables have two axes of information. If you only have one axis of information, use a list.

I am going to give you enough information, hopefully, to make accessible, responsive tables on your own that are not a burden on you nor your users.

What you will find below:

---

## Accessible Per WCAG 2.0 AA

This part is really easy. Just make a valid HTML `<table>`. You don’t even need that many elements. Avoid spanning cells, make sure you use `<th>` for headers, and adding a `<caption>` is nice of you. I made a [CodePen of a simple table (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://codepen.io/aardrian/pen/boXrOj?editors=1000), and embedded it below.

<CodePen
  user="aardrian"
  slug-hash="boXrOj"
  title="Minimal Table"
  :default-tab="['css','result']"
  :theme="dark"/>

Tables can be a bit more complex than this, though.

### Complexity #1: Row Headers

Not all headers are for columns. Some headers are for a row, and this can be throw off some developers. It just so happens that WCAG has some guidance for us in technique [<VPIcon icon="iconfont icon-w3c"/>H63: Using the scope attribute to associate header cells and data cells in data tables](https://w3.org/TR/WCAG20-TECHS/H63.html).

All you need to do is:

- Continue to use `<th>`.
- Add the [<VPIcon icon="iconfont icon-w3c"/>`scope` attribute](https://w3.org/TR/html/tabular-data.html#elementdef-th) using the values `row`, `col`, `rowgroup`, and `colgroup` as appropriate.

Conveniently, the WCAG technique offers a sample table, which [I recreated on CodePen (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://codepen.io/aardrian/pen/qPeVPQ?editors=1000) and also embedded below.

<CodePen
  user="aardrian"
  slug-hash="qPeVPQ"
  title="Table with Row Headers"
  :default-tab="['css','result']"
  :theme="dark"/>

### Complexity #2: Spanning Cells

Generally you want to avoid spanning table cells. This can lead to unnecessarily complex and confusing tables. If you have to, there just happens to be a WCAG technique to support it, specifically [<VPIcon icon="iconfont icon-w3c"/>H43: Using id and headers attributes to associate data cells with header cells in data tables](https://w3.org/TR/WCAG20-TECHS/H43.html).

The code can look complex, but the approach is straightforward.

- For every `<th>`, give it an `id` attribute (and a unique value, of course).
- Every cell then gets a [<VPIcon icon="iconfont icon-w3c"/>`headers` attribute](https://w3.org/TR/html/tabular-data.html#the-td-element) that points to the `id` of the header cell you want it to use.

Once again, the technique offers a sample table, which [I recreated on CodePen (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://codepen.io/aardrian/pen/PJMOBZ?editors=1000) and also embedded below.

<CodePen
  user="aardrian"
  slug-hash="PJMOBZ"
  title="Table with Cell Spans"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## ARIA

You may find it hard to believe, but for a straightforward data table, you probably do not need any ARIA. Screen readers in particular have been dealing with tables for far longer than the existence of ARIA.

Sometimes a table is just a grid of data and sometimes a table is a control (widget) that users modify (or modify its data, such as a spreadsheet). The control/widget use case produced some ARIA to account for it. This ARIA is what is so frequently abused when developers over-code to avoid using a `<table>`.

### ARIA Grid

ARIA has a few roles that define and describe data grids. The definitions that follow come from [<VPIcon icon="iconfont icon-w3c"/>ARIA 1.1](https://w3.org/TR/wai-aria-1.1/) (these are truncated).

#### `grid` (role)

https://w3.org/TR/wai-aria-1.1/#grid

A composite [<VPIcon icon="iconfont icon-w3c"/>`widget`](https://w3.org/TR/wai-aria-1.1/#widget) containing a collection of one or more rows with one or more cells where some or all cells in the grid are focusable by using methods of two-dimensional navigation, such as directional arrow keys.

#### `gridcell` (role)

https://w3.org/TR/wai-aria-1.1/#gridcell

A [<VPIcon icon="iconfont icon-w3c"/>`cell`](https://w3.org/TR/wai-aria-1.1/#cell) in a [<VPIcon icon="iconfont icon-w3c"/>`grid`](https://w3.org/TR/wai-aria-1.1/#grid) or [<VPIcon icon="iconfont icon-w3c"/>`treegrid`](https://w3.org/TR/wai-aria-1.1/#treegrid).

#### `rowheader` (role)

https://w3.org/TR/wai-aria-1.1/#rowheader

A cell containing header information for a row in a grid.

#### `columnheader` (role)

https://w3.org/TR/wai-aria-1.1/#columnheader

A cell containing header information for a column.

#### `row` (role)

https://w3.org/TR/wai-aria-1.1/#row

A row of cells in a tabular container.

#### `rowgroup` (role)

https://w3.org/TR/wai-aria-1.1/#rowgroup

A structure containing one or more row elements in a tabular container.

Please note that those roles are primarily intended to be used for interactive grids, such as a spreadsheet. In these controls each cell may be editable and can be navigated using a series of keyboard shortcuts.

### ARIA Table

Since developers were applying `grid` roles to what should be regular tabular data, ARIA 1.1 added the following role in response:

#### `table` (role)

https://w3.org/TR/wai-aria-1.1/#table

[ARIA 1.1] A [<VPIcon icon="iconfont icon-w3c"/>`section`](https://w3.org/TR/wai-aria-1.1/#section) containing data arranged in rows and columns. See related [<VPIcon icon="iconfont icon-w3c"/>`grid`](https://w3.org/TR/wai-aria-1.1/#grid).

The `table` role is intended for tabular containers which are not interactive. If the tabular container maintains a selection state, provides its own two-dimensional navigation, or allows the user to rearrange or otherwise manipulate its contents or the display thereof, authors *SHOULD* use `grid` or [<VPIcon icon="iconfont icon-w3c"/>`treegrid`](https://w3.org/TR/wai-aria-1.1/#treegrid) instead.

Authors *SHOULD* prefer the use of the host language’s semantics for table whenever possible, such as the [<VPIcon icon="iconfont icon-w3c"/>HTML `table`](https://w3.org/TR/html5/tabular-data.html#the-table-element) element.

If it’s not a widget, don’t use `role="grid"`, use `role="table"`. Ideally you do this by just using `<table>`, because then you can skip the `role="table"` as `<table>` has that role implied.

---

## ARIA Patterns

Putting all the ARIA roles into practice and understanding which to use can be tricky. The [<VPIcon icon="iconfont icon-w3c"/>WAI-ARIA Authoring Practices 1.1](https://w3.org/TR/wai-aria-practices-1.1/) document is intended to be a guide for developers, providing copy-paste-ready code for common user interface patterns.

### Grid Pattern

The ARIA Authoring Practices document defines a [<VPIcon icon="iconfont icon-w3c"/>pattern for grids](https://w3.org/TR/wai-aria-practices-1.1/#grid), providing guidance and sample code. This sample code includes the nesting requirements and the ever-complex necessary keyboard navigation support covering the following: <kbd>↓</kbd>, <kbd>↑</kbd>, <kbd>→</kbd>, <kbd>←</kbd>, <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>Page Down</kbd>, <kbd>Page Up</kbd>, <kbd>Ctrl
</kbd>+<kbd>Home</kbd> and <kbd>Ctrl</kbd>+<kbd>End</kbd>.

There are even more keys to support if you allow selection of cells, rows, or columns.

In short, if you start using `role="grid"` on tabular data then you are telling users that it is a fully interactive widget. You also need to implement all the keyboard support above and more.

### Table Pattern

There is a placeholder in the ARIA Authoring Practices document for tables, though it points back to the grid pattern and the following decision flow for choosing between a table and a grid:

- A `grid` is a composite widget so it:
  - Always contains multiple focusable elements.
  - Has only one focusable element in the page tab sequence.
  - Requires the author to provide code that [<VPIcon icon="iconfont icon-w3c"/>manages focus movement inside it](https://w3.org/TR/wai-aria-practices-1.1/#kbd_general_within).
- For a `table`, all focusable elements contained in a table are included in the page tab sequence.

To restate: a grid is a single tab stop on the page (which then manages focus within), while a table is not.

---

## Responsive

With a little creativity, you don’t need to worry about narrow viewports. Granted, not all layouts will work in all cases, but there is no reason to dump `<table>`s in service of responsive layouts. Here are a couple methods you can use.

To reiterate, I am just talking about *width* responsiveness. I have another post coming that goes into more detail.

### Just Let It Scroll

Yep, you can just let a table scroll off the screen (within a bounded container). It’s not ideal and can be offensive to some, but it is at least simple and straightforward. The catch is that you need to make the scrolling area keyboard accessible, but [<VPIcon icon="fas fa-globe"/>we already know a solution for that](https://developer.paciellogroup.com/blog/2016/02/short-note-on-improving-usability-of-scrollable-regions/).

I made a sample table in a scrolling container. I added `tabindex="0"` so keyboard users can get to the scrolling area and use the arrow keys to scroll back and forth. I added `role="region"` and `aria-labelledby` so that screen reader users who encounter this tab stop will understand what it is. I have embedded it below or you can [go directly to it at CodePen (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://codepen.io/aardrian/pen/VMoyEP?editors=1000).

<CodePen
  user="aardrian"
  slug-hash="VMoyEP"
  title="Responsive (Scrolling) Table"
  :default-tab="['css','result']"
  :theme="dark"/>

I show how [**this keyboard-friendly technique**](/adrianroselli.com/keyboard-and-overflow.md) can be used in individual cells as well in an old post.

### Use CSS Layout

For some tables you can just use CSS to re-arrange the entire thing. Just because table elements come with built-in table layout styles doesn’t mean you are restricted from changing them.

Between CSS flex and CSS grid, we have more options than ever to make responsive tables that can adapt to nearly any screen regardless of your data.

Note that as soon as you start messing with the display properties of a `<table>` (using the `display` property), it no longer registers as a table to a screen reader. I will go into more detail on that in my next post.

I have made an example that uses neither CSS flex nor CSS grid, for backward compatibility reasons. Instead it relies on the lowly CSS `display: block`. Obviously in my example it won’t work for anything more complex than simple values, but it at least shows you what is possible. You may [view it on CodePen (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://codepen.io/aardrian/pen/yzmpjG?editors=0100) or just play with the embed below.

<CodePen
  user="aardrian"
  slug-hash="yzmpjG"
  title="Responsive Table"
  :default-tab="['css','result']"
  :theme="dark"/>

### Use Them Both

I have more detail and a deeper dive into this example in the post [**A Responsive Accessible Table**](/adrianroselli.com/2017/11/a-responsive-accessible-table.md). There I take this apart and explain all the code going into it so you can give it a go on your own.

<CodePen
  user="aardrian"
  slug-hash="YEKmxP"
  title="Responsive Table That Also Scrolls if Necessary"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusions

1. Use `<table>`s for tabular data.
2. Don’t use ARIA grid roles unless you are making a spreadsheet (or something like it).

That’s it.

::: note Update: February 20, 2018

I expanded on how tables are affected in my post [**Tables, CSS Display Properties, and ARIA**](/adrianroselli.com/tables-css-display-properties-and-aria.md).

:::

::: note Update: July 9, 2018

Steve distills it nicely in a tweet:

:::

::: note Update: December 30, 2018

Steve Faulkner shows us the accessibility tree and demonstrates how tables are parsed by screen readers in his 24 Accessibility post [<VPIcon icon="fas fa-globe"/>Tables and Beers](https://24a11y.com/2018/tables-and-beers/). In a follow-up post, [Tables, Tequila and Beer (<VPIcon icon="fa-brands fa-codepen"/>`stevef`)](https://codepen.io/stevef/post/tables-tequila-and-beer), he also confirms my assertions that `scope="col"` is generally not needed. Minus a Chrome bug, that is.

:::

::: note Update: January 13, 2019

In a Twitter conversation about list heuristics in Safari, [James Craig shared (<VPIcon icon="fa-brands fa-x-twitter"/>`cookiecrook`)](https://twitter.com/cookiecrook/status/1084152419246759936) insight into [how Safari decides if a table (<VPIcon icon="iconfont icon-github"/>`WebKit/webkit`)](https://github.com/WebKit/webkit/blob/master/Source/WebCore/accessibility/AccessibilityTable.cpp) is a layout table or a data table. It is a great look under the hood at how browsers have to deal with the code they must parse constantly.

:::

::: note Update: September 29, 2020

Léonie Watson has just posted [<VPIcon icon="fas fa-globe"/>How screen readers navigate data tables](https://tink.uk/how-screen-readers-navigate-data-tables/) where she walks through a sample table to get some information, explaining each step, the keyboard commands, and the output. She also links to a video demonstration, which I have embedded below.

Watch [<VPIcon icon="fa-brands fa-youtube"/>How screen readers navigate data tables](https://youtu.be/X1KR4u94cho) at YouTube.

Note that the [<VPIcon icon="fas fa-globe"/>table used in that demo](https://demos.tink.uk/html-table/) has no `scope` attribute on either the row or column headers. NVDA handles it just fine.

:::

::: note Update: May 6, 2022

There is a bug in Chromium over support for the `headers` attribute that I genuinely hope someone fixes already: [<VPIcon icon="fa-brands fa-chrome"/>Issue 1081201: headers attribute ignored in tables resulting in an incorrect screen reader experience](https://bugs.chromium.org/p/chromium/issues/detail?id=1081201)

:::

::: note Update 20 May 2022: APG Relaunches

On Global Accessibility Awareness Day (GAAD) 2022, the APG relaunched and rebranded itself as an accessible pattern library:

I am thrilled this no longer looks like a standards doc and is much easier to navigate.

I am *less* thrilled this [left a pile of 404s (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices`)](https://github.com/w3c/aria-practices/issues/2335) with the move, implies it is a ready-to-use pattern library, [obfuscates the (watered down) warnings (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices`)](https://github.com/w3c/aria-practices/issues/2336) I fought so hard to get added, quietly hid some of its worst patterns with no acknowledgment in years-old issues, appears to have happened outside the W3C redesign project with Studio24, and [introduced WCAG issues (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices`)](https://github.com/w3c/aria-practices/issues/2338).

:::

::: info Other Posts

```component VPCard
{
  "title": "Don’t Use ARIA Menu Roles for Site Nav",
  "desc": "Once again, the advice is in the title of the post. But I will ramble anyway since you scrolled this far. First run with the advice, and then review some background on ARIA and how navigation and menu items are defined. This way you can tap out quickly when it…",
  "link": "/adrianroselli.com/dont-use-aria-menu-roles-for-site-nav.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

[**More recent post: A Responsive Accessible Table**](/adrianroselli.com/a-responsive-accessible-table.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Hey, It’s Still OK to Use Tables",
  "desc": "Baby Boomerangutuang, one of the Tick’s students. He was just shouting It’s OK to play with dolls! Consider this post to be the sequel to my 2012 post It’s OK to Use Tables. Here I will go into bit more detail based on the state of accessible efforts I see…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/hey-its-still-ok-to-use-tables.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
