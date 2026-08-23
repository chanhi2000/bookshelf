---
lang: en-US
title: "Vertical margins/paddings and Flexbox, a quirky combination"
description: "Article(s) > Vertical margins/paddings and Flexbox, a quirky combination"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Vertical margins/paddings and Flexbox, a quirky combination"
    - property: og:description
      content: "Vertical margins/paddings and Flexbox, a quirky combination"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/vertical-marginspaddings-and-flexbox-a-quirky-combination.html
prev: /programming/css/articles/README.md
date: 2017-07-30
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: 
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

```component VPCard
{
  "title": "Vertical margins/paddings and Flexbox, a quirky combination",
  "desc": "In CSS, percentage-based paddings are – as per spec – calculated with respect to the width of an element. However, for flex items (e.g. items whose parent have display: flex; applied) that’s not always the case. Depending on which browser you are using the percentage-based padding of a flex item will be resolved against its … Continue reading ”Vertical margins/paddings and Flexbox, a quirky combination”",
  "link": "https://bram.us/2017/07/30/vertical-marginspaddings-and-flexbox-a-quirky-combination/",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

::: note tl;dr

In CSS, percentage-based paddings are – as per spec – calculated with respect to the width of an element. However, for flex items *(e.g. items whose parent have `display: flex;` applied)* that’s not always the case.

Depending on which browser you are using the percentage-based `padding` of a flex item will be resolved against its `height` instead of its `width` **… and the spec is totally fine with that.**

Until browser vendors agree on one behavior, be advised to not use vertical margins/paddings on flex items … and know that [**the CSS Aspect Ratio Hack**](/bram.us/aspect-ratios-in-css-are-a-hack.md) won’t work on them.

:::

::: note UPDATE 2018-01-24

Microsoft [has announced (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts#2085`)](https://github.com/w3c/csswg-drafts/issues/2085#issuecomment-360244244) that they are going to implement the Blink/Webkit behavior for compat reasons and ship it in the next version of Edge.

As a result Firefox – the only browser left with the “odd” behavior, once the change in Edge ships – [also decided to follow the same path (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/2085#issuecomment-360602313). Work to implement this [<VPIcon icon="fa-brands fa-firefox"/>has already started](https://bugzilla.mozilla.org/show_bug.cgi?id=958714#c55).

Soon, this quirk will be resolved and all (modern) browsers will have the same behavior.

:::

::: note UPDATE 2018-01-31

The relating Firefox bug [<VPIcon icon="fa-brands fa-firefox"/>has been closed](https://bugzilla.mozilla.org/show_bug.cgi?id=958714#c71) and got marked as resolved. The changes are planned to ship with the release of Firefox 60. 🎉

:::

As detailed in [**“Aspect Ratios in CSS are a Hack”**](/bram.us/aspect-ratios-in-css-are-a-hack.md) we can use percentage-based padding to force a box to have a fixed aspect ratio.

However, In a recent project I was working on I noticed that my aspect ratio boxes weren’t working as expected in Firefox. Where other browsers would nicely render boxes with their set aspect ratio, Firefox would do render the box with a fixed height, independent of the box’s defined `width`.

Digging deeper into the problem – in order to flesh out what exactly triggers this rendering quirk – I knocked up a testcase in which it became clear to me that **the CSS Aspect Ratio Hack didn’t seem to work on flex items (e.g. elements that are contained inside a parent element that has `display: flex;` applied)** — Uh oh!

<CodePen
  user="bramus"
  slug-hash="JboQre"
  title="Aspect-Ratio box inside flexboxed wrapper?"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Interpreting the results

![The result in Chrome, yay 16:9](https://bram.us/wordpress/wp-content/uploads/2017/07/aspectratio-flexbox-chrome.png)

![The result in Firefox, not 16:9](https://bram.us/wordpress/wp-content/uploads/2017/07/aspectratio-flexbox-firefox.png)

In Chrome/Edge/Safari the green box acts as expected, and has a `16:9` aspect ratio thanks to a `56.25%` vertical padding. Firefox however renders the box with a `height` of `281.25px`, independent of its `width`. Running some numbers this `281.25px` turns out to be exactly `56.25%` of `500px`, which is the `height` of its parent.

This must be a bug, right?

---

## Filing a bug

So I set out to [<VPIcon icon="fa-brands fa-firefox"/>file a bug report for Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1315669). To my surprise the issue got closed, concluding that **Firefox renders things correctly … as do all the other browsers**.

Huh? How can two different results both be correct? Turns out there’s some wiggle room in the spec:

::: info "CSS Flexible Box Layout Module Level 1 - 4.2. Flex Item Margins and Paddings" *From CSS Working Group Editor Drafts* (<VPIcon icon="iconfont icon-w3c"/><code>drafts.csswg.org</code>)

> Percentage margins and paddings on flex items can be resolved against either:
>
> 1. their own axis (left/right percentages resolve against `width`, top/bottom resolve against `height`)
> 2. the inline axis (left/right/top/bottom percentages all resolve against `width`)
>
> **A User Agent must choose one of these two behaviors.**

```component VPCard
{
  "title": "CSS Flexible Box Layout Module Level 1",
  "desc": "The margins of adjacent flex items do not collapse. Percentage margins and paddings on flex items, like those on block boxes, are resolved against the inline size of their containing block, e.g. left/right/top/bottom perc...",
  "link": "https://drafts.csswg.org/css-flexbox-1/#item-margins",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

Now letting browsers choose which behavior they want to implement of course isn’t ideal, and that’s also what spec writer Tab Atkins has added as a note:

::: note

This behavior sucks, but it accurately captures the current state of the world. It is the CSSWG’s intention that browsers will converge on one of the behaviors, at which time the spec will be amended to require that.

:::

---

## Down the Rabbit Hole: How come Firefox behaves differently?

The “culprit” for this quirk is that ~~[<VPIcon icon="iconfont icon-w3c"/>an older version of the spec](https://hg.csswg.org/drafts/rev/86681ff9c4e9)~~ read this on `margin`/`padding` behavior for flex items:

::: info *From CSS Working Group Wiki* (<VPIcon icon="iconfont icon-w3c"/><code>wiki.csswg.org</code>)

> Percentage margins and paddings on flex items are always resolved against their own axis: left and right margins resolve against the containing block’s width, and top and bottom margins resolve against the containing block’s height. Unlike blocks, block-axis margins do not resolve against the inline dimension of their containing block.

:::

One might wonder why this initially specced behavior behaves different from what we are used to. As Tab Atkins [<VPIcon icon="fa-brands fa-chrome"/>put it](https://bugs.chromium.org/p/chromium/issues/detail?id=229568#c11):

::: info "Issue#41005888" *From Chromium* (<VPIcon icon="fa-brands fa-chrome"/><code>issues.chromium.org</code>)

> The logic is that the behavior of percentage vertical padding in existing layout modes is document-focused, where width is \*always\* the dominant measurement; height is nearly never an input to anything. The newer layout modes (Flexbox and Grid) are different – in them, height and width are on a more equal playing field, and code written that uses percentage padding in the main axis of a flexbox should work equally well for row and column flexboxes. Similar arguments apply for Grid.

```component VPCard
{
  "title": "for flex/grid items, percent margins and paddings should resolve against their respective dimension [41005888] - Chromium",
  "desc": "Word from last telcon is that the WG wants to keep the specced behavior, and IE will change its Flexbox behavior to match the spec. The logic is that the behavior of percentage vertical padding in existing layout modes is document-focused, where width is *always* the dominant measurement; height is nearly never an input to anything.  The newer layout modes...",
  "link": "https://issues.chromium.org/issues/41005888#comment12",
  "logo": "https://gstatic.com/chrome-tracker/img/chromium.svg",
  "background": "rgba(26,115,232,0.2)"
}
```

:::

So Firefox had implemented this behavior from the start on, and kept in place as a change in the spec still accepted it.

::: note Sidenote

In [<VPIcon icon="iconfont icon-w3c"/>an archived mailing list message](http://lists.w3.org/Archives/Public/www-style/2014May/0015.html) *– again by Tab Atkins, the man truly is/was the thriving force behind this spec –* I also found this note on the fact that speccing it in this way would nullify the existing aspect ratio hacks:

> We recognize that there are some drawbacks, notably the inconsistency with existing document-focused display modes, and the loss of the ability to employ the common “aspect-ratio” hack involving vertical padding. We believe that the first is not too relevant […]. The second is unfortunate, but we plan to address aspect ratios directly in the future, and so consider the loss of this hack for now to be not significant enough to sway our opinion.

… but we plan to address aspect ratios directly in the future … — More on that in a later post 😉

:::

---

## Feeling Curious

But why was the original spec changed in the first place? Looking at one of the responses in [<VPIcon icon="fa-brands fa-firefox"/>my initial bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=1315669) the adjustment was made because Chrome refused to implement the spec-mandated behavior.

I can follow Chrom(e/ium)’s decision here, as us developers [<VPIcon icon="fa-brands fa-chrome"/>are already used to](https://issues.chromium.org/issues/41005888#comment26) a vertical padding being calculated with respect to the `width`:

::: info "Issue#41005888" *From Chromiume* (<VPIcon icon="fa-brands fa-chrome"/><code>issues.chromium.org</code>)

> Part of the reason we’re arguing to change the spec is that all the developers we’ve heard from want the Blink/WebKit behavior because they want to do the aspect ratio hack. We’ve had no developers asking for the specced behavior.

```component VPCard
{
  "title": "for flex/grid items, percent margins and paddings should resolve against their respective dimension [41005888] - Chromium",
  "desc": "Word from last telcon is that the WG wants to keep the specced behavior, and IE will change its Flexbox behavior to match the spec. The logic is that the behavior of percentage vertical padding in existing layout modes is document-focused, where width is *always* the dominant measurement; height is nearly never an input to anything.  The newer layout modes...",
  "link": "https://issues.chromium.org/issues/41005888#comment12",
  "logo": "https://gstatic.com/chrome-tracker/img/chromium.svg",
  "background": "rgba(26,115,232,0.2)"
}
```

:::

On the other hand, one must admit that the behavior we’re used to is **an acquired taste**. The first time I ever set a vertical padding I thought it’d be resolved against the `height` and not the `width`.

The easy fix would be for Firefox to adjust its behavior to what other browsers do, right? In the long run however – given the history laid out here – I personally thing it might be better to follow the initially specced behavior. Why cling on to an acquired taste, and possibly limit our future possibilities?

That might explain why the spec authors didn’t just switch from one behavior to the other, but added a second behavior instead. By adding a second behavior, they left the door open for future decisions on the matter. For example: the day native aspect ratio methods arrive in browsers, this part of the spec can be reevaluated *(and hopefully one of both behaviors can be chosen)*.

---

## What now?

For now, be advised to not use percentage-based values paddings/margins when it comes to flex items as there’s still some ongoing discussion going on about this. This is also noted [<VPIcon icon="iconfont icon-w3c"/>in the spec](https://drafts.csswg.org/css-flexbox-1/#item-margins):

::: warning Advisement

Authors should avoid using percentages in paddings or margins on flex items entirely, as they will get different behavior in different browsers.

:::

The fact that the bug reports on this are still open for both Chromium and Firefox tell me that there’s more to come concerning this. The longer they remain open though, the more sites that might break though once a consensus has been reached.

In case you do want to use any of the [**current hacks to creating aspect ratios with CSS**](/bram.us/aspect-ratios-in-css-are-a-hack.md) in combination with flex items, don’t apply the styles on one and the same element but use separate elements for them.

<CodePen
  user="bramus"
  slug-hash="wqKbWq"
  title="Flex Items + Aspect Ratios"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s things like this that make the simple thing called CSS [<VPIcon icon="fas fa-globe"/>not easy](https://adactio.com/journal/12571) 😉

::: note UPDATE 2017-07-31

Today I came to discover that [there’s an open issue on Flexbugs about this (<VPIcon icon="iconfont icon-github"/>`philipwalton/flexbugs#87`)](https://github.com/philipwalton/flexbugs/issues/87). I’ve appended my findings to said issue.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Vertical margins/paddings and Flexbox, a quirky combination",
  "desc": "In CSS, percentage-based paddings are – as per spec – calculated with respect to the width of an element. However, for flex items (e.g. items whose parent have display: flex; applied) that’s not always the case. Depending on which browser you are using the percentage-based padding of a flex item will be resolved against its … Continue reading ”Vertical margins/paddings and Flexbox, a quirky combination”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/vertical-marginspaddings-and-flexbox-a-quirky-combination.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
