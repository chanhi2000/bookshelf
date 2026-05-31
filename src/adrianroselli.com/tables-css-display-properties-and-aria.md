---
lang: en-US
title: "Tables, CSS Display Properties, and ARIA"
description: "Article(s) > Tables, CSS Display Properties, and ARIA"
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
      content: "Article(s) > Tables, CSS Display Properties, and ARIA"
    - property: og:description
      content: "Tables, CSS Display Properties, and ARIA"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/tables-css-display-properties-and-aria.html
prev: /programming/css/articles/README.md
date: 2018-02-21
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2018/02/ARIA-flex-table_generated_thumb-300x300.png
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
  name="Tables, CSS Display Properties, and ARIA"
  desc="Update: 7 October 2023 Tables with display properties are now functional across Chromium, Gecko, and (finally) WebKit browsers. Barring regressions (which have happened), display: contents is the only style that may cause issues, and that is a function of a poor specification. My post It’s Mid-2022 and Browsers (Mostly Safari)…"
  url="https://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2018/02/ARIA-flex-table_generated_thumb-300x300.png"/>

::: note Update: 7 October 2023

Tables with display properties are now functional across Chromium, Gecko, and (finally) WebKit browsers. Barring regressions (which have happened), `display: contents` is the only style that may cause issues, and that is a function of a [poor specification (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/3040#issuecomment-1750967636).

My post [**It’s Mid-2022 and Browsers (Mostly Safari) Still Break Accessibility via Display Properties**](/adrianroselli.com/its-mid-2022-and-browsers-mostly-safari-still-break-accessibility-via-display-properties.md) goes into far more detail and is also far more current. The laggard, Apple, has addressed its table bugs in Safari 17. It only took 5¾ years. You can read my ongoing pestering in that post.

:::

This post has two separate but related things going on. One is an example of one of my responsive tables with ARIA added, and the other is the Twitter conversation that started this along with some generalized responses.

---

## Responsive Table with Semantics Retained by ARIA

<CodePen
  user="aardrian"
  slug-hash="LQddwO"
  title="Responsive Table with Semantics Retained by ARIA"
  :default-tab="['css','result']"
  :theme="dark"/>

This example ([viewable directly at CodePen (<VPIcon icon="fa-brands fa-codepen"/>`aardrian`)](https://codepen.io/aardrian/pen/LQddwO/)) shows how you can use ARIA table roles to override / re-insert the table semantics you may lose by using CSS flex or grid.

First, you need to understand how to use the roles, including getting the nesting right. In general these can be simple. The [<VPIcon icon="iconfont icon-w3c"/>`table` role](https://w3.org/TR/wai-aria-1.1/#table) should be added to the `<table>` element. If you use `<thead>`, `<tbody>`, and/or `<tfoot>`, they get the [<VPIcon icon="iconfont icon-w3c"/>`rowgroup` role](https://w3.org/TR/wai-aria-1.1/#rowgroup). `<tr>` gets [<VPIcon icon="iconfont icon-w3c"/>`row`](https://w3.org/TR/wai-aria-1.1/#row) and `<td>` gets [<VPIcon icon="iconfont icon-w3c"/>`cell`](https://w3.org/TR/wai-aria-1.1/#cell). `<th scope="col">` gets [<VPIcon icon="iconfont icon-w3c"/>`columnheader`](https://w3.org/TR/wai-aria-1.1/#columnheader) while `<th scope="row">` gets [<VPIcon icon="iconfont icon-w3c"/>`rowheader`](https://w3.org/TR/wai-aria-1.1/#rowheader).

It really is that straightforward.

But here is where it gets complicated. Tables that hide content (especially headers) in a responsive or similar context, and tables that re-order content.

The re-ordering issue is easy to solve — don’t use CSS to re-order table content. Use client-side script to move the nodes around in the DOM. For example, using CSS flex or grid to sort a table may be novel, but it will not support screen reader users.

Hiding content is a bit trickier. My example above addresses that. It uses the same code as my [**responsive accessible table**](/adrianroselli.com/a-responsive-accessible-table.md), but with two differences. It now has the ARIA roles I outlined above, and it does not add the replacement text for the row headers until you click the button. The button is only there to give you a chance to experience the table without the replacement text (in a narrow view).

### Examples

The following videos demonstrate how the ARIA can make the table semantics, and thus table navigation, work within the browser. The first one demonstrates how the hidden column headers hurt our ability to understand the narrow table (not just visually). The second video demonstrates how the table is more understandable once the generated content appears to take the place of the hidden column headers.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2018/02/ARIA-flex-table_generated-none.mp4" />

<VidStack src="https://adrianroselli.com/wp-content/uploads/2018/02/ARIA-flex-table_generated-yes.mp4" />

Each video uses the embedded CodePen example in Firefox 58.0.2 with NVDA 2017.4 on Windows 10. I am using table navigation (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd><VPIcon icon="fas fa-arrow-right"/></kbd>/<kbd><VPIcon icon="fas fa-arrow-left"/></kbd>/<kbd><VPIcon icon="fas fa-arrow-up"/></kbd>/<kbd><VPIcon icon="fas fa-arrow-down"/></kbd>) to get around the content, jumping up and down rows and between cells.

### Advice

If you are not able to test with a screen reader, maybe don’t do this. You run the risk of making an already problematic responsive table downright unusable. Further, if you are not going to test regularly as browsers and screen readers get updated, maybe don’t do this.

---

## The Tweet

I pushed out a tweet yesterday that generated a lot of interesting questions and conversations. I think it may have also led to some confusion.

::: info From *X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>aardrian</code>)

> Using CSS flex on a `<table>` overrides its native semantics, rendering it useless to a screen reader. Avoid.

https://adrianroselli.com/2015/10/html-source-order-vs-css-display-order.html#Update05

```component VPCard
{
  "title": "Adrian Roselli (no blue check) 🗯 on X",
  "desc": "Using CSS flex on a &lt;table&gt; overrides its native semantics, rendering it useless to a screen reader. Avoid...",
  "link": "https://x.com/aardrian/status/965657425297670144/",
  "logo": "https://abs.twimg.com/favicons/twitter.3.ico",
  "background": "rgba(62,65,68,0.2)"
}
```

:::

I followed it up to add some detail:

::: info From *X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>aardrian</code>)

I should add, using display: block | grid | inline | … on table elements will also override native semantics. Not unique to flex.

```component VPCard
{
  "title": "Adrian Roselli (no blue check) 🗯 on X",
  "desc": "I should add, using display: block | grid | inline | … on table elements will also override native semantics. Not unique to flex.",
  "link": "https://x.com/aardrian/status/965670533777055744/",
  "logo": "https://abs.twimg.com/favicons/twitter.3.ico",
  "background": "rgba(62,65,68,0.2)"
}
```

:::

### Collected Responses

I received some interesting questions and comments, some of them tinged with frustration. The most critical thing I learned is that developers who play around with CSS and tables on the whole do not test them in screen readers. This is my effort to break down the types of questions and comments and provide some extra information.

- Developers have been breaking HTML table semantics via display properties since before CSS flex and grid.
- This should not make it harder / impossible to make responsive tables. I wrote some [**easy and less easy ways to make responsive tables**](/adrianroselli.com/a-responsive-accessible-table.md).
- CSS already has as impact on HTML semantics — `display: none` is an example of that.
- If screen readers give priority to mark-up over styling in every instance, then `display: none` would no longer work.
- Setting `display: table` and related does not impart HTML table semantics to (`<div>`) layouts that used it for things like vertical centering.
- This is not a function of screen readers alone, as they get their accessibility information from the browser.
- A screen reader needs more than the DOM to understand a page, so asking it to ignore all but the DOM is impractical.
- Users don’t want us to be able to detect screen readers, [**nor should we**](/adrianroselli.com/on-screen-reader-detection.md) and certainly not as a workaround for responsive tables.
- Even if you could detect screen readers, how would you know which [**third of those users are not blind**](/adrianroselli.com/not-all-screen-reader-users-are-blind.md)?
- Even if you listen for mouse actions as a proxy for sighted screen reader users, how do you account for those with mobility impairments who do not use a mouse? Or mobile screen reader users who rely on touch gestures?
- Disabling a site’s CSS for screen reader users is therefore impractical (and a terrible, terrible idea).
- Using flex or grid for an HTML table already means you are running the risk of messing up [**content order versus source order**](/adrianroselli.com/html-source-order-vs-css-display-order.md) (not unique to tables).
- Using CSS grid to lay out an HTML table may be fine, but it still won’t be a table semantically
- A significant part of why we have this situation is because of years of relying on HTML tables for layout that had their display properties tweaked, providing a cue to screen readers that they were for layout only.
- Screen readers already have their own heuristics for dealing with tables, primarily due to years of poor developer practices, with [<VPIcon icon="fas fa-globe"/>current behaviors tracked by PowerMapper](https://powermapper.com/tests/screen-readers/tables/).
- While [<VPIcon icon="iconfont icon-w3c"/>ARIA provides roles for tables](https://w3.org/TR/wai-aria-1.1/#table), it requires you to understand your tables well and stay on top of screen reader testing as new releases come.
- Applying ARIA roles to retain table semantics can be problematic for responsive tables where header cells or other cells are discarded, a common pattern in responsive table examples. See the [previous section of this post](#the-table).
- Generally, do not use ARIA to try to override CSS, not just because the CSS may not load, but because this is [**not the purpose of ARIA**](/adrianroselli.com/hey-its-still-ok-to-use-tables.md).

If you find the ability to so casually dismiss HTML table semantics to be frustrating, it is not the fault of screen readers. It is the fault of years of terrible coding practices predicated on visual layout over developer rigor of choosing the right element for the job.

If you find you want to use CSS flex, grid, block, inline, or other display properties on a table, then maybe consider what the heck you are doing with the table.

### Assorted CSS Specifications

I may have stayed up too late trying to parse all this.

CSS 2.x tries to break down the role of CSS for tables, namely leaving it up to HTML to define the semantics:

::: info Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification, W3C Recommendation 07 June 2011, edited in place 12 April 2016 (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> Table layout can be used to represent tabular relationships between data. Authors specify these relationships in the [<VPIcon icon="iconfont icon-w3c"/>document language](https://w3.org/TR/CSS2/conform.html#doclanguage) and can specify their *presentation* using CSS 2.1.
> 
> Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification, W3C Recommendation 07 June 2011, edited in place 12 April 2016:

```component VPCard
{
  "title": "17.1 Introduction to tables | Tables",
  "desc": "This chapter defines the processing model for tables in CSS. Part of this processing model is the layout. For the layout, this chapter introduces two algorithms; the first, the fixed table layout algorithm, is well-defined, but the second, the automatic table layout algorithm, is not fully defined by this specification. For the automatic table layout algorithm, some widely deployed implementations have achieved relatively close interoperability...",
  "link": "https://w3.org/TR/CSS2/tables.html#tables-intro",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

CSS 2.x also accounts for non-HTML pages, where it adds the semantics and generates the necessary anonymous table objects around itself:

::: info Cascading Style Sheets Level 2 Revision 2 (CSS 2.2) Specification, W3C First Public Working Draft 12 April 2016 (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> In other document languages (such as XML applications), there may not be pre-defined table elements. Therefore, CSS 2.2 allows authors to “map” document language elements to table elements via the [<VPIcon icon="iconfont icon-w3c"/>‘display’](https://w3.org/TR/CSS22/visuren.html#propdef-display) property. For example, the following rule makes the FOO element act like an HTML TABLE element and the BAR element act like a CAPTION element:

```component VPCard
{
  "title": "17.1 Introduction to tables | Tables",
  "desc": "This chapter defines the processing model for tables in CSS. Part of this processing model is the layout. For the layout, this chapter introduces two algorithms; the first, the fixed table layout algorithm, is well-defined, but the second, the automatic table layout algorithm, is not fully defined by this specification. For the automatic table layout algorithm, some widely deployed implementations have achieved relatively close interoperability...",
  "link": "https://w3.org/TR/CSS22/tables.html#tables-intro",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

I can find nowhere in the CSS 2.x specification (specifically in the [<VPIcon icon="iconfont icon-w3c"/>visual formatting model](https://w3.org/TR/CSS22/visuren.html)) where the `display` property should override the native semantics of the source document language (HTML).

The closest statement about interaction with tables that I can find in the Flexbox specification is a note directed at user agent makers, and says nothing about changing the semantics:

> Note: Some values of [<VPIcon icon="iconfont icon-w3c"/>display](https://w3.org/TR/css-ruby-1/#propdef-display) normally trigger the creation of anonymous boxes around the original box. If such a box is a [<VPIcon icon="iconfont icon-w3c"/>flex item](https://w3.org/TR/2017/CR-css-flexbox-1-20171019/#flex-item), it is blockified first, and so anonymous box creation will not happen. For example, two contiguous [<VPIcon icon="iconfont icon-w3c"/>flex items](https://w3.org/TR/2017/CR-css-flexbox-1-20171019/#flex-item) with [<VPIcon icon="iconfont icon-w3c"/>display: table-cell](https://w3.org/TR/css-ruby-1/#propdef-display) will become two separate [<VPIcon icon="iconfont icon-w3c"/>display: block](https://w3.org/TR/css-ruby-1/#propdef-display) [<VPIcon icon="iconfont icon-w3c"/>flex items](https://w3.org/TR/2017/CR-css-flexbox-1-20171019/#flex-item), instead of being wrapped into a single anonymous table.
> 
> CSS Flexible Box Layout Module Level 1, W3C Candidate Recommendation, 19 October 2017: [<VPIcon icon="iconfont icon-w3c"/>4. Flex Items](https://w3.org/TR/2017/CR-css-flexbox-1-20171019/#flex-items)

CSS Grid has similar language:

> Note: Some values of [<VPIcon icon="iconfont icon-w3c"/>display](https://w3.org/TR/css-ruby-1/#propdef-display) normally trigger the creation of anonymous boxes around the original box. If such a box is a [<VPIcon icon="iconfont icon-w3c"/>grid item](https://w3.org/TR/2017/CR-css-grid-1-20171214/#grid-item), it is blockified first, and so anonymous box creation will not happen. For example, two contiguous [<VPIcon icon="iconfont icon-w3c"/>grid items](https://w3.org/TR/2017/CR-css-grid-1-20171214/#grid-item) with [<VPIcon icon="iconfont icon-w3c"/>display: table-cell](https://w3.org/TR/css-ruby-1/#propdef-display) will become two separate [<VPIcon icon="iconfont icon-w3c"/>display: block](https://w3.org/TR/css-ruby-1/#propdef-display) [<VPIcon icon="iconfont icon-w3c"/>grid items](https://w3.org/TR/2017/CR-css-grid-1-20171214/#grid-item), instead of being wrapped into a single anonymous table.
> 
> CSS Grid Layout Module Level 1, W3C Candidate Recommendation, 14 December 2017: [<VPIcon icon="iconfont icon-w3c"/>6.1. Grid Item Display](https://w3.org/TR/2017/CR-css-grid-1-20171214/#grid-item-display)

In short, I can see nowhere in the CSS, grid, nor flex specifications where a user agent should override the native semantics of the source document language (HTML). Based on that, my read is that browsers dumping table semantics is a bug.

### Example

I made videos with a screen reader to try to demonstrate how you can ruin the ability to navigate and parse a table just by adding flex.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2015/10/roma-table_NVDA.mp4" />

The table from the example with CSS disabled as heard in NVDA. I am using table navigation controls. NVDA announces the number of rows & columns, all the headings when hopping cells, and tells you when you hit the edge of the table.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2015/10/roma-table-with-flex_NVDA.mp4" />

The same table with CSS flex added, as heard in NVDA. It is longer presented as a table. The tab order when tabbing through the links is confusing, headers are not announced, sorting controls do not work.

---

## What You Can Do

Help purge the web of layout tables. Help purge the web of CSS table display properties just for vertical centering. Code tables properly and accessibly.

In conjunction with that, file issues against web browsers. Browsers parse the page and then hand it off to a screen reader. If you can get the browsers to behave consistently, then you can get screen readers to adapt as well, as they may no longer need to rely on heuristics to protect users from bad code.

In the meantime, test your responsive tables with screen readers.

Maybe weigh in on the discussion [<VPIcon icon="fas fa-globe"/>[Proposal] new attribute for specifying focus and reading order](https://web.archive.org/web/20210613060951/https://discourse.wicg.io/t/proposal-new-attribute-for-specifying-focus-and-reading-order/2601) at WICG Discourse.

:::: details Update(s)

**2018-03-03**

Roger Johansson wrote a piece in 2011 that wraps up both how browsers destroy semantics on tables and lists when CSS display properties are applied: [<VPIcon icon="fas fa-globe"/>Screen readers and CSS](https://456bereastreet.com/archive/201111/screen_readers_and_css/)

**2018-03-04**

This quote from Steve Faulkner’s post [<VPIcon icon="fas fa-globe"/>Short note on what CSS display properties do to table semantics](https://developer.paciellogroup.com/blog/2018/03/short-note-on-what-css-display-properties-do-to-table-semantics/) nails it (*it* being who is to blame for this mess):

::: info

> \[I\]t’s either wittingly/unwittingly the fault of the developer or the browser. But what we can be sure of, in these cases, is that it is not the fault of the screen reader.
> 
> ~~[Short note on what CSS display properties do to table semantics](https://developer.paciellogroup.com/blog/2018/03/short-note-on-what-css-display-properties-do-to-table-semantics/)~~

:::

**2018-03-27**

It is worth noting that `display: contents` on a `<table>`, `<ul>`, `<ol>`, etc. also hides it from screen readers. Granted, it’s late and I only tested in Firefox and NVDA so far, but you can try it out yourself (embedded below or [visit it directly at CodePen (<VPIcon icon="fa-brands fa-codepen"/>`aardrian`)](https://codepen.io/aardrian/pen/mxpWKX?editors=1100)):

<CodePen
  user="aardrian"
  slug-hash="mxpWKX"
  title="Table with display:contents"
  :default-tab="['css','result']"
  :theme="dark"/>

Read Ire Aderinokun’s post, [<VPIcon icon="fas fa-globe"/>How display: contents; Works](https://bitsofco.de/how-display-contents-works/) for other ways `display: contents` can affect content on a page.

**2020-02-19**

Big progress. Chrome 80 no longer drops semantics for HTML tables when the `display` properties `flex`, `grid`, `inline-block`, or `contents` are used. The new Edge (ChromiEdge) follows suit. Firefox still dumps table semantics for only `display: contents`. Safari dumps table semantics for everything.

**2020-09-29**

Léonie Watson has just posted [<VPIcon icon="fas fa-globe"/>How screen readers navigate data tables](https://tink.uk/how-screen-readers-navigate-data-tables/) where she walks through a sample table to get some information, explaining each step, the keyboard commands, and the output. She also links to a video demonstration, which I have embedded below.

<VidStack src="youtube/X1KR4u94cho" />

**2022-12-07**

I should have linked to my updated post sooner: [**It’s Mid-2022 and Browsers (Mostly Safari) Still Break Accessibility via Display Properties**](/adrianroselli.com/its-mid-2022-and-browsers-mostly-safari-still-break-accessibility-via-display-properties.md)

Chrome is fine now, the last Firefox bug just closed and should deploy soon, and Safari is still a hot mess after repeated assurances it was being fixed.

::::

::: info Other Posts

[**Earlier post: GitHub Contributions Chart**](https://adrianroselli.com/2018/02/github-contributions-chart.html)
<!-- TODO: /adrianroselli.com/github-contributions-chart.md -->

[**More recent post: CSUN 2018: Everything I Know About Accessibility I Learned from Stack Overflow**](https://adrianroselli.com/2018/03/csun-2018-everything-i-know-about-accessibility-i-learned-from-stack-overflow.html)
<!-- TODO: /adrianroselli.com/csun-2018-everything-i-know-about-accessibility-i-learned-from-stack-overflow.md -->

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Tables, CSS Display Properties, and ARIA",
  "desc": "Update: 7 October 2023 Tables with display properties are now functional across Chromium, Gecko, and (finally) WebKit browsers. Barring regressions (which have happened), display: contents is the only style that may cause issues, and that is a function of a poor specification. My post It’s Mid-2022 and Browsers (Mostly Safari)…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/tables-css-display-properties-and-aria.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
