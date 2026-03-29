---
lang: en-GB
title: "Everything you never wanted to know about visually-hidden"
description: "Article(s) > Everything you never wanted to know about visually-hidden"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Everything you never wanted to know about visually-hidden"
    - property: og:description
      content: "Everything you never wanted to know about visually-hidden"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/visually-hidden.html
prev: /programming/css/articles/README.md
date: 2026-02-21
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2026-02-20-visually-hidden.png
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
  name="Everything you never wanted to know about visually-hidden"
  desc="The one where I attempt to answer a question"
  url="https://dbushell.com/2026/02/20/visually-hidden/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2026-02-20-visually-hidden.png"/>

Nobody asked for it but nevertheless, I present to you my definitive *“it depends”* tome on visually-hidden web content. I’ll probably make an amendment before you’ve finished reading. If you enjoy more questions than answers, buckle up! I’ll start with the original premise, even though I stray off-topic on tangents and never recover.

---

## The question

I was [<VPIcon icon="fas fa-globe"/>nerd-sniped](https://xkcd.com/356/)[^1] on Bluesky. [Ana Tudor asked (<VPIcon icon="fa-brands fa-bluesky"/>`anatudor.bsky.social`)](https://bsky.app/profile/anatudor.bsky.social/post/3mdze454wyc25):

[^1]: Nerd Snipe: The art and sport of using a technical challenge to distract a nerd. Bonus points for sniping yourself.

::: info Ana Tudor, Bluesky (<VPIcon icon="fa-brands fa-bluesky"/><code>bsky.app</code>)

> Is there still any point to most styles in visually hidden classes in ’26?
> 
> Any point to shrinking dimensions to `1px` and setting `overflow: hidden` when `clip-path` to nothing via `inset(50%)`/ `circle(0)` reduces clickable area to nothing? And then no `1px` dimensions = no need for `white-space`.

<SiteInfo
  name="Ana Tudor (@anatudor.bsky.social)"
  desc="Is there still any point to most styles in visually hidden classes in '26? Any point to shrinking dimensions to `1px` and setting `overflow: hidden` when `clip-path` to nothing via `inset(50%)`/ `circle(0)` reduces clickable area to nothing? And then no `1px` dimensions = no need for `white-space`."
  url="https://bsky.app/profile/anatudor.bsky.social/post/3mdze454wyc25/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:4hm2yozxzsakerfalloor5s6/bafkreidhgqr6zpy56qeldne4gk7qmfb42w26tlhvmncjpqlvgbbpg5fy5a"/>

:::

::: details Sources on 'Nerd Snipe'

<SiteInfo
  name="Nerd Sniping"
  desc=""
  url="https://xkcd.com/356"
  logo="https://xkcd.com/s/919f27.ico"
  preview="https://imgs.xkcd.com/comics/nerd_sniping.png"/>

<SiteInfo
  name="Urban Dictionary: Nerd Sniping"
  desc="Nerd Sniping: 1. The act of presenting someone, often a mathematician/physicist with a time consuming problem or challenge (often impossible to solve or..."
  url="https://urbandictionary.com/define.php?term=Nerd+Sniping/"
  logo="https://urbandictionary.com/favicon-16x16.png"
  preview="https://udimg.com/v1/social/twitter.webp?word=Nerd+Sniping&meaning=1.+The+act+of+presenting+someone%2C+often+a+mathematician%2Fphysicist+with+a+time+consuming+problem+or+challenge+%28often+impossible+to+solve+or+complete%29+in+the+hopes+of+it+appealing+to+a+person%27s+obsessive+tendencies.%0A%0A2.+Doing+the+thing+above+in+a+situation+where+the+obsession+may+lead+to+bodily+harm+%28in+the+original+context+on+the+middle+of+a+road+where+they+will+get+inevitably+run-over+by+a+truck%29.&example=1.+The+XKCD+comic+%22Click+and+Drag%22+nerd+sniped+me%21+I+never+expected+it+to+take+so+long+to+explore.%0A%0A2.+There%27s+a+certain+type+of+brain+that+is+easily+disabled.+If+you+show+it+an+interesting+problem+it+involuntarily+drops+everything+else.+This+lead+me+to+the+development+of+a+new+sport%3A+Nerd+Sniping."/>

:::

Ana proposed the following:

```css
.visually-hidden { /* shouldn't this be enough in 2026? */
  position: absolute; /* take out of document flow */
  clip-path: circle(0); /* reduce clickable area to nothing */
}
```

Is this enough in 2026?

As an occasional purveyor of the `visually-hidden` class myself, the question wriggled its way into my brain. I felt compelled to investigate the whole ordeal. Spoiler: I do not have a satisfactory yes-or-no answer, but I do have a wall of text!

---

## Accessibility notice

I’m writing this based on the assumption that a `visually-hidden` class is considered **acceptable for specific use cases**. My final section on [native visually-hidden](#native-visually-hidden) addresses the bigger accessibility concerns. It’s not easy to say where this technique is appropriate. It is generally agreed to be OK but a symptom of — and not a fix for — other design issues.

::: note

Appropriate use cases for `visually-hidden` are far fewer than you think.

:::

---

## Class walkthrough

Skip to [the history lesson](#where-it-all-began) if you’re familiar.

`visually-hidden`, `sr-only` — there have been many variations on the class name. I’ve looked at popular implementations and compiled the kitchen sink version below.

```css
.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

**Please don’t copy this as a golden sample.** It merely encompasses all I’ve seen.

There are variations on the selector using pseudo-classes that allow for focus. Think *“skip to main content”* links, for example.

What is the purpose of the `visually-hidden` class? The idea is to hide an element visually, but allow it to be discovered by assistive technology. Screen readers being the primary example. The element must be removed from layout flow. It should leave no render artefacts and have no side effects. It does this whilst trying to avoid the bugs and quirks of web browsers.

If this sounds and looks just a bit hacky to you, you have a high tolerance for hacks! It’s a massive hack! How was this normalised? We’ll find out later.

I’ll whittle down the `visually-hidden` properties for those unfamiliar.

```css
.visually-hidden {
  position: absolute;
}
```

Absolute positioning is vital to remove the element from layout flow. Otherwise the position of surrounding elements will be affected by its presence.

```css
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}
```

This crops the visible area to nothing. `clip` remains as a fallback but has long been deprecated and is obsolete. All modern browsers support `clip-path`.

```css
.visually-hidden {
  border: 0;
  padding: 0;
}
```

These two properties remove styles that may add layout dimensions.

```css
.visually-hidden {
  height: 1px;
  margin: -1px;
  width: 1px;
}
```

This group effectively gives the element zero dimensions. There are reasons for `1px` instead of `0px` and negative margin that I’ll cover later.

```css
.visually-hidden {
  overflow: hidden;
}
```

Another property to ensure no visible pixels are drawn. I’ve seen the newer `clip` value used but what difference that makes if any is unclear.

```css
.visually-hidden {
  white-space: nowrap;
}
```

This was added to address text wrapping inside the `1px` square (I’ll explain later).

So basically we have `position: absolute` and a load of properties that attempted to make the element invisible. We cannot use `display: none` or `visibility: hidden` or `content-visibility: hidden` because those remove elements from the accessibility tree.

So the big question remains: why must we still ‘zero’ the dimensions? Why is `clip-path` not sufficient? To make sense of this mystery I went back to the beginning.

!['Impossible. Perhaps the archives are incomplete.' says a perplexed Obi-Wan Kenobi, who searches the Jedi archives for a mysterious planet (from Star Wars: Episode II)](https://dbushell.com/images/blog/2026/obiwan-archives.avif)

---

## Where it all began

::: note

It was tricky to research this topic because older articles have been corrected with modern information. I recovered many details from [<VPIcon icon="fas fa-globe"/>the archives](https://web.archive.org/) and mailing lists with the help of those involved. They’re cited along the way.

:::

Our journey begins November 2004. A draft document titled *“CSS Techniques for WCAG 2.0”* edited by **Wendy Chisholm** and **Becky Gibson** includes a technique for invisible labels.

::: w3 (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> While it is usually best to include visual labels for all form controls, there are situations where a visual label is not needed due to the surrounding textual description of the control and/or the content the control contains. Users of screen readers, however, need each form control to be explicitly labeled so the intent of the control is well understood when navigated to directly.

```component VPCard
{
  "title": "5.5 Creating Invisible labels for form elements - CSS Techniques for WCAG 2.0",
  "desc": "This technique relates to the following sections of the guidelines:",
  "link": "https://w3.org/TR/2004/WD-WCAG20-CSS-TECHS-20041119/#creating-invisible-labels/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

```component VPCard
{
  "title": "History of Changes to CSS Techniques for WCAG 2.0 Working Drafts",
  "desc": "",
  "link": "https://w3.org/WAI/GL/WCAG20/css-tech-change-history.html/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

The following CSS was provided:

```css
.nosize {
  position: absolute;
  width: 0px;
  height: 0px;
  overflow: hidden;
}
```

Could this be the original `visually-hidden` class?

My research jumped through decades but eventually I found an email thread [<VPIcon icon="iconfont icon-w3c"/>“CSS and invisible labels for forms”](https://lists.w3.org/Archives/Public/w3c-wai-gl/2004JulSep/0529.html) on the W3C WAI mailing list. This was a month prior, preluding the WCAG draft. A different technique from **Bob Easton** was noted:

```css
.off-left {
  position: absolute;
  left: -999px;
  width: 990px;
}
```

::: info Bob Easton (2003), Web Archive (<VPIcon icon="fas fa-globe"/><code>css-discuss.incutio.com</code>)

> The beauty of this technique is that it enables using as much text as we feel appropriate, and the elements we feel appropriate. Imagine placing instructive text about the accessibility features of the page off left (as well as on the site’s accessibility statement). Imagine interspersing “start of…” landmarks through a page with heading tags. Or, imagine parking full lists off left, lists of access keys, for example. Screen readers can easily collect all headings and read complete lists. Now, we have a made for screen reader technique that really works!

```component VPCard
{
  "title": "Screenreader Visibility - css-discuss",
  "desc": "When you hide material from visual display on a PC screen, you almost always hide it from screen readers too.",
  "link": "https://web.archive.org/web/20031008102214/http://css-discuss.incutio.com/?page=ScreenreaderVisibility/",
  "logo": "",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Easton attributed both [<VPIcon icon="fas fa-globe"/>Choan Gálvez](https://choan.es/en/) and [<VPIcon icon="fas fa-globe"/>Dave Shea](https://daveshea.com/) for their contributions.

In same the thread, **Gez Lemon** [<VPIcon icon="iconfont icon-w3c"/>proposed `overflow`](https://lists.w3.org/Archives/Public/w3c-wai-gl/2004JulSep/0530.html) to ensure that text doesn’t bleed into the display area. Following up, Becky Gibson shared a [<VPIcon icon="iconfont icon-w3c"/>test case](https://lists.w3.org/Archives/Public/w3c-wai-gl/2004JulSep/att-0546/labels.html) covering the ideas.

```css
.offscreen {
  position: absolute;
  width: 0px;
  overflow:hidden;
}

.offscreen2 {
  position: absolute;
  left: -200em;
}
```

Lemon later published an article [“Invisible Form Prompts”](https://juicystudio.com/article/invisible-form-prompts.php) about the WCAG plans which attracted plenty of commenters including Bob Easton.

The resulting WCAG draft guideline discussed both the `nosize` and `offscreen` ideas.

::: info 'Creating Invisible labels for form elements', (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> Note that instead of using the nosize style described above, you could instead use postion:absolute; and left:-200px; to position the label “offscreen”. This technique works with the screen readers as well. Only position elements offscreen in the top or left direction, if you put an item off to the right or the bottom, many browsers will add scroll bars to allow the user to reach the content.

```component VPCard
{
  "title": "5.5 Creating Invisible labels for form elements - CSS Techniques for WCAG 2.0",
  "desc": "This technique relates to the following sections of the guidelines:",
  "link": "https://w3.org/TR/2004/WD-WCAG20-CSS-TECHS-20041119/#creating-invisible-labels/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

Two options were known and considered towards the end of 2004. 1. Zero dimensions
2. Position off-screen

Why not both? Indeed, it appears **Paul Bohman** on the [<VPIcon icon="fas fa-globe"/>WebAIM mailing list](https://webaim.org/discussion/mail_thread?thread=1781) suggested such a combination in February 2004. 

```css
.hidden {
  position: absolute;
  left: 0px
  top: -100px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

Bohman even discovered possibly the first zero width bug.

::: info Paul Bohman, Re: Hiding text using CSS (<VPIcon icon="fas fa-globe"/><code>webaim.org</code>)

> I originally recommended setting the height and width to 0 pixels. This works with JAWS and Home Page Reader. However, this does not work with Window Eyes. If you set the height and width to 1 pixel, then the technique works with all browsers and all three of the screen readers I tested.

```component VPCard
{
  "title": "WebAIM List: Hiding text using CSS",
  "desc": "> (2) You commented about the TECHNIQUE 1 being invisible to some screen > readers, what about TECHNIQUE 5? I'm very glad you asked, because I did find that I need to make a slight modification to make technique 5 work with Window Eyes...",
  "link": "https://webaim.org/discussion/mail_thread?thread=1781#post2/",
  "logo": "https://webaim.org/media/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Later in May 2004, Bohman along with *Shane Anderson* [<VPIcon icon="fas fa-globe"/>published a paper](https://dl.acm.org/doi/abs/10.1145/990657.990664) on this technique. Citations within included *Bob Easton* and *Tom Gilder*.

::: note Aside note

other zero width bugs have been discovered since. Manuel Matuzović noted in 2023 that [<VPIcon icon="fas fa-globe"/>links in Safari were not focusable](https://matuzo.at/blog/2023/zero-width-height-skip/).

The zero width story continues as recently as February 2026 (last week).

> In browse mode in web browsers, NVDA no longer treats controls with 0 width or height as invisible. This may make it possible to access previously inaccessible “screen reader only” content on some websites.
>
> [NVDA 2026.1 Beta TWO now available](https://nvaccess.org/post/in-process-10th-february/) - NV Access News

:::

Digger further into WebAIM’s email archive uncovered a [<VPIcon icon="fas fa-globe"/>2003 thread](https://webaim.org/discussion/mail_thread?thread=1425&id=3281) in which **Tom Gilder** shared a class for [<VPIcon icon="fas fa-globe"/>skip navigation links](https://webaim.org/techniques/skipnav/).

```css
a.skip {
  position: absolute;
  overflow: hidden;
  width: 0;
  height: 0;
}
```

I found Gilder’s blog in the web archives introducing this technique.

::: info Skip-a-dee-doo-dah, Tom Gilder (<VPIcon icon="fas fa-globe"/><code>blog.tom.me.uk</code>)

> I thought I’d put down my “skip navigation” link method down in proper writing as people [seem to like it](https://web.archive.org/web/20031212060317/http://www.mezzoblue.com/archives/2003/09/12/accessibilit/) (and it gives me something to write about!). Try moving through the links on this page using the keyboard - the first link should magically appear from thin air and allow you to quickly jump to the blog tools, which modern/visual/graphical/CSS-enabled browsers (someone really needs to come up with an acronym for that) should display to the left of the content.

```component VPCard
{
  "title": "Tom Gilder's Blog: Skip-a-dee-doo-dah",
  "desc": "",
  "link": "https://web.archive.org/web/20031008092721/http://blog.tom.me.uk/2003/09/13/skipadeedoodah.php/",
  "logo": "",
  "background": "rgba(244,245,255,0.2)"
}
```

Gilder’s post links to a *Dave Shea* post which in turn mentions the 2002 book *“Building Accessible Websites”* by *Joe Clark*. Chapter eight discusses the necessity of a “skip navigation” link due to [<VPIcon icon="fas fa-globe"/>table-based layout](https://thehistoryoftheweb.com/tables-layout-absurd/) but advises:

::: info 'Building Accessible Websites - 08. Navigation', Joe Clark (<VPIcon icon="fas fa-globe"/><code>joeclark.org</code>)

> Keep them visible!
> 
> Well-intentioned developers who already use page anchors to skip navigation will go to the trouble to set the anchor text in the tiniest possible font in the same colour as the background, rendering it invisible to graphical browsers (unless you happen to pass the mouse over it and notice the cursor shape change).

```component VPCard
{
  "title": "08. Navigation",
  "desc": "",
  "link": "https://joeclark.org/book/sashay/serialization/Chapter08.html#h4-2020/",
  "logo": "https://joeclark.or/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Clark expressed frustration over common tricks like the invisible pixel.

```html
<a href="#skip">
  <img src="/media/core/1x1clear.gif"
    alt="[skip navigation links]"
    width="1"
    height="1"
  />
</a>
```

It’s clear no `visually-hidden` class existed when this was written.

[<VPIcon icon="iconfont icon-w3c"/>Choan Gálvez](https://choan.es/en/) informed me that [<VPIcon icon="iconfont icon-w3c"/>Eric Meyer](https://meyerweb.com/eric/thoughts/2002/08/12/css-tantalizing-public-archive-announced/) would have the css-discuss mailing list. Eric kindly searched the backups but didn’t find any earlier discussion. However, Eric did find a [<VPIcon icon="iconfont icon-w3c"/>thread on the W3C mailing list](https://lists.w3.org/Archives/Public/w3c-wai-gl/1999JulSep/0053.html) from 1999 in which Ian Jacobs (IBM) discusses the accessibility of “skip navigation” links.

The desire to visually hide “skip navigation” links was likely the main precursor to the early `visually-hidden` techniques. In fact, Bob Easton said as much:

::: info 'Screenreader Visibility', Bob Easton (<VPIcon icon="fas fa-globe"/><code>css-discuss.incutio.com</code>)

> As we move from tag soup to CSS governed design, we throw out the layout tables and we throw out the spacer images. Great! It feels wonderful to do that kind of house cleaning. So, what do we do with those “skip navigation” links that used to be attached to the invisible spacer images?

```component VPCard
{
  "title": "Screenreader Visibility - css-discuss",
  "desc": "",
  "link": "https://web.archive.org/web/20031008102214/http://css-discuss.incutio.com/?page=ScreenreaderVisibility/",
  "logo": "",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

I had originally missed that in my excitement seeing the `off-left` class.

---

I reckon we’ve reached the source of the `visually-hidden` class. At least conceptually. Technically, the class emerged from several ideas, rather than a “eureka” moment. Perhaps more can be gleaned from other CSS techniques such a the desire to improve accessibility of [<VPIcon icon="fa-brands fa-wikipedia-w"/>CSS image replacement](https://en.wikipedia.org/wiki/CSS_image_replacement).

Bob Easton retired in 2008 after a 40 year career at IBM. I reached out to Bob who was surprised to learn this technique was still a topic today[^2]. Bob emphasised the fact that it was always a clumsy workaround and something CSS probably wasn’t intended to accommodate. I’ll share more of Bob’s thoughts later.

[^2]: I might have overdone the enthusiasm

::: info Let’s take an intermission!

[<VPIcon icon="fas fa-globe"/>My contact page](https://dbushell.com/contact/) is where you can send corrections by the way

:::

---

## Further adaptations

The `visually-hidden` class stabilised for a period. Visit 2006 in the *Wayback Machine* to see [<VPIcon icon="fas fa-globe"/>WebAIM’s guide to invisible content](https://web.archive.org/web/20060615003534/http://webaim.org/techniques/css/invisiblecontent/) — Paul Bohman’s version is still recommended.

Moving forward to 2011, I found [<VPIcon icon="fas fa-globe"/>Jonathan Snook](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility) discussing the “clip method”. Snook leads us to Drupal developer **Jeff Burnz** the previous year.

::: info 'Using CSS clip as an Accessible Method of Hiding Content', Jeff Burnz (<VPIcon icon="fas fa-globe"/><code>adaptivethemes.com</code>)

> […] we still have the big problem of the page “jump” issue if this is applied to a focusable element, such as a link, like skip navigation links. WebAim and a few others endorse using the LEFT property instead of TOP, but this no go for Drupal because of major pain-in-the-butt issues with RTL.
> 
> In early May 2010 I was getting pretty frustrated with this issue so I pulled out a big HTML reference and started scanning through it for any, and I mean ANY property I might have overlooked that could possible be used to solve this thorny issue. It was then I recalled using clip on a recent project so I looked up its values and yes, it can have 0 as a value.

```component VPCard
{
  "title": "Using CSS clip as an Accessible Method of Hiding Content  | Drupal Themes & Design",
  "desc": "",
  "link": "https://web.archive.org/web/20100621141418/https://adaptivethemes.com/using-css-clip-as-an-accessible-method-of-hiding-content/",
  "logo": "https://web.archive.org/web/20100621141418im_/https://adaptivethemes.com/sites/default/files/gadp_favicon.gif",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

It would seem Burnz discovered the `clip` technique independently and was probably the first to write about it. Burnz also notes a right-to-left (RTL) issue. This could explain why pushing content off-screen fell out of fashion.

2010 also saw the arrival of [HTML5 Boilerplate (<VPIcon icon="iconfont icon-github"/>`h5bp/html5-boilerplate`)](https://github.com/h5bp/html5-boilerplate/wiki/history) along with [issue #194 (<VPIcon icon="iconfont icon-github"/>`h5bp/html5-boilerplate#194`)](https://github.com/h5bp/html5-boilerplate/issues/194) in which *Jonathan Neal* plays a key role in the discussion and comments:

> If we want to correct for every seemingly-reasonable possibility of overflow in every browser then we may want to consider [code below]

```css
.visuallyHidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
```

This was their final decision. I’ve removed `!important` for clarity. This is very close to what we have now, no surprise since HTML5 Boilterplate was extremely popular. I’m leaning to conclude that the additional properties are really just there for the “possibility” of pixels escaping containment as much as fixing any identified problem.

**Thierry Koblentz** covered the state of affairs in 2012 noting that: Webkit, Opera and to some extent IE do not play ball with \[clip\]. Koblentz prophesies:

::: info 'Clip your hidden content for better accessibility', Thierry Koblentz (<VPIcon icon="fa-brands fa-yahoo"/><code>yaccessibilityblog.com</code>)

> I wrote the declarations in the previous rule in a particular order because if one day clip works as everyone would expect, then we could drop all declarations after clip, and go back to the original

```component VPCard
{
  "title": "Clip your hidden content for better accessibility | Yahoo! Accessibility Library",
  "desc": "There are two ways to hide content. This article includes the best methods for hiding content from everyone and hiding content visually but keeping it available to screen readers.",
  "link": "https://web.archive.org/web/20110312112631/https://yaccessibilityblog.com/library/css-clip-hidden-content.html/",
  "logo": "https://web.archive.org/web/20110312112631im_/http://l.yimg.com/a/i/ydn/favicon2.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Sound familiar? With those browsers obsolete, and if `clip-path` behaves itself, can the other properties be removed? Well we have 14 years of new ~bugs~ features to consider first.

In 2016, **J. Renée Beach** published: [Beware smushed off-screen accessible text (<VPIcon icon="fa-brands fa-medium" />`@jessebeach`)](https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe#.2tyafsugc). This appears to be the origin of `nowrap` (as [<VPIcon icon="fas fa-globe"/>demonstrated by Vispero](https://vispero.com/resources/the-anatomy-of-visually-hidden/#text-wrapping).)

> Over a few sessions, Matt mentioned that the string of text “Show more reactions” was being smushed together and read as “Showmorereactions”.

Beach’s class did not include the kitchen sink.

```css
.accessible_elem {
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

The addition of `nowrap` became standard alongside everything else.

::: note Aside note

the origin of `margin: -1px` remains elusive. One [Bootstrap issue (<VPIcon icon="iconfont icon-github"/>`twbs/bootstrap`)](https://github.com/twbs/bootstrap/issues/25686) shows it was rediscovered in 2018 to fix a browser bug. However, another [HTML5 Boilterplate issue (<VPIcon icon="iconfont icon-github"/>`h5bp/main.css`)](https://github.com/h5bp/main.css/issues/12) dated 2017 suggests negative margin broke reading order. *Josh Comeau* shared a `<VisuallyHidden>` [<VPIcon icon="fas fa-globe"/>React component](https://joshwcomeau.com/snippets/react-components/visually-hidden/#the-css-2) in 2024 without margin. One of many examples showing that it has come in and out of fashion.

:::

We started with WCAG so let’s end there. The latest WCAG technique for [<VPIcon icon="iconfont icon-w3c"/>“Using CSS to hide a portion of the link text”](https://w3.org/WAI/WCAG22/Techniques/css/C7) provides the following code.

```css
.visually-hidden {
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

Circa 2020 the `clip-path` property was added as browser support increased and `clip` became deprecated. An obvious change I’m not sure warrants investigation (although someone had to be first!) That brings us back to what we have today.

Are you still with me?

---

## Minimum viable technique

As we’ve seen, many of the properties were thrown in for good measure. They exist to ensure absolutely no pixels are painted. They were adapted over the years to avoid various bugs, quirks, and edge cases. How many such decisions are now irrelevant?

This is a classic [<VPIcon icon="fas fa-globe"/>Chesterton’s Fence](https://fs.blog/chestertons-fence/) scenario.

::: info 'Chesterton’s Fence: A Lesson in Thinking' Farnam Street Media (<VPIcon icon="fas fa-globe"/><code>fs.blog</code>)

> Do not remove a fence until you know why it was put up in the first place.

<SiteInfo
  name="Chesterton’s Fence: A Lesson in Thinking"
  desc="A core component of making great decisions is understanding previous decisions. If we don’t understand how we got “here,” we run the risk of making things much worse."
  url="https://fs.blog/chestertons-fence/"
  logo="https://fs.blog/wp-content/uploads/2015/06/cropped-farnamstreet-300x300.png"
  preview="https://fs.blog/wp-content/uploads/2020/03/Chesterton’s-Fence-A-Lesson-in-Second-Order-Thinking.png"/>

:::

Well we kinda know why but the specifics are practically folklore at this point. Despite all that research, can we say for sure if any “why” is still relevant?

Back to Ana Tudor’s suggestion.

```css
.visually-hidden {
  position: absolute;
  clip-path: circle(0);
}
```

How do we know for sure? The only way is *extensive testing.* Unfortunately, I have neither the time nor skill to perform that adequately here. There is at least one concern with the code above, [<VPIcon icon="fas fa-globe"/>Curtis Wilcox noted](https://c.im/@cwilcox808/116055733807371406) that in Safari the focus ring behaves differently.

Other minimum viable ideas have been presented before.

**Scott O’Hara** proposed a different two-liner using `transform`.

```css
.vs-hidden {
  position: absolute;
  transform: scale(0);
}
```

::: info 'transform scale(0) to visually hide content', Scott O'Hara (<VPIcon icon="fa-brands fa-codepen"/><code>codepen.io</code>)

> JAWS, Narrator, NVDA with Edge all seem to behave just fine. As do Firefox with JAWS and NVDA, and Safari on macOS with VoiceOver. Seems also fine with iOS VO+Safari and Android TalkBack with Firefox or Chrome.
> 
> In none of these cases do we get the odd focus rings that have occurred with other visually hidden styles, as the content is scaled down to zero. Also because not hacked into a 1px by 1px box, there’s no text wrapping occurring, so no need to fix that issue.

<CodePen
  user="scottohara"
  slug-hash="QWVOqNY"
  title="transform scale(0) to visually hide content"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

Sounds promising!

It turns out **Katrin Kampfrath** had explored both minimum viable classes a couple of years ago, testing them against the traditional `visually-hidden` class.

::: info 'Exploring the visually-hidden css', Katrin Kampfrath (<VPIcon icon="fas fa-globe"/><code>frontend.die-katrin.eu</code>)

> I am missing the experience and moreover actual user feedback, however, i prefer the screen reader read cursor to stay roughly in the document flow. There are screen reader users who can see. I suppose, a jumping read cursor is a bit like a shifting layout.

<SiteInfo
  name="Exploring the visually-hidden css"
  desc="My personal website and blog around frontend topics."
  url="https://frontend.die-katrin.eu/blog/2024/exploring-the-visuallyhidden-css/"
  logo="https://frontend.die-katrin.eu/favicon-16x16.png"
  preview="https://frontend.die-katrin.eu/opengraph.png"/>

:::

Kampfrath’s limited testing found the read cursor size differs for each class. The `clip-path` technique was favoured but caution is given.

A few more years ago, **Kitty Giraudel** tested several ideas concluding that `sr-only` was still the most accessible for specific text use.

::: info 'Hiding content responsibly', Kitty Giraudel (<VPIcon icon="fas fa-globe"/><code>kittygiraudel.com</code>)

> This technique should only be used to mask text. In other words, there shouldn’t be any focusable element inside the hidden element. This could lead to annoying behaviours, like scrolling to an invisible element.

```component VPCard
{
  "title": "Hiding content responsibly",
  "desc": "A guide on hiding content in an accessible way, building on the A11y Advent calendar post",
  "link": "https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/",
  "logo": "https://kittygiraudel.com/assets/images/favicon.jpg",
  "background": "rgba(221,126,180,0.2)"
}
```

:::

**Zell Liew** proposed a different idea in 2019. 

```css
.hide-accessibly {
  position: absolute !important;
  opacity: 0;
  pointer-events: none;
}
```

::: info 'A new (and easy) way to hide content accessibly', Zell Liew (<VPIcon icon="fas fa-globe"/><code>zellwk.com</code>)

> Many developers voiced their opinions, concerns, and experiments over at Twitter. I wanted to share with you what I consolidated and learned.

<SiteInfo
  name="A new (and easy) way to hide content accessibly"
  desc="Possibly the best way to hide content accessibly. The CSS is easy to write and understand!"
  url="https://zellwk.com/blog/hide-content-accessibly/"
  logo="https://zellwk.com/favicon/favicon.ico?v=2"
  preview="https:/zellwk.com/og/hide-content-accessibly.png"/>

:::

Liew’s idea was unfortunately torn asunder. Although there are cases like [<VPIcon icon="fas fa-globe"/>inclusively hiding checkboxes](https://sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/) where near-zero opacity is more accessible.

I’ve started to go back in time again!

I’m also starting to question whether this class is a good idea. Unless we are capable and prepared to thoroughly test across every combination of browser and assistive technology — and keep that information updated — it’s impossible to recommend anything.

This is impossible for developers! Why can’t browser vendors solve this natively?

!['Help me, web standards working groups. You're my only hope.' caption superimposed over Princess Leia, originally asked Obi-Wan for help (from Star Wars: Episode IV)](https://dbushell.com/images/blog/2026/leia-only-hope.avif)

---

## Native visually-hidden

Once you’ve written 3000 words on a twenty year old CSS hack you start to question why it hasn’t been baked into web standards by now.

**Ben Myers** wrote [<VPIcon icon="fas fa-globe"/>“The Web Needs a Native .visually-hidden”](https://benmyers.dev/blog/native-visually-hidden/) proposing ideas from HTML attributes to CSS properties. Scott O’Hara responded noting larger accessibility issues that are not so easily handled. O’Hara concludes:

::: info 'Visually hidden content is a hack that needs to be resolved, not enshrined, Scott O’Hara (<VPIcon icon="fas fa-globe"/><code>scottohara.me</code>)

> Introducing a native mechanism to save developers the trouble of having to use a wildly available CSS ruleset doesn’t solve any of those underlying issues. It just further pushes them under the rug.

```component VPCard
{
  "title": "Visually hidden content is a hack that needs to be resolved, not enshrined | scottohara.me",
  "desc": "This will retread and extend on my previous Inclusively Hidden post. Specifically the parts about “visually hidden” content. But in lieu of reading that, the reasons one would visually hide content in the development of a website or web application is generally to include extra content for accessibility. For instance, to mitigate against specific design choices, where visually something may be apparent, but programmatically not so much. Or, portions of UI are only need to be visib...",
  "link": "https://scottohara.me/blog/2023/03/21/visually-hidden-hack.html/",
  "logo": "https://scottohara.me/assets/img/favicon.ico",
  "background": "rgba(136,161,250,0.2)"
}
```

:::

**Sara Soueidan** had [floated the topic (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/560) to the CSS working group back in 2016. Soueidan closed the issue in 2025, coming to a similar conclusion.

::: info Sara Soueidan (<VPIcon icon="iconfont icon-github"/><code>github.com/w3c/csswg-drafts</code>)

> I’ve been teaching accessibility for a little less than a decade now and if there’s one thing I learned is that developers will resort to using `visually-hidden` utility to do things that are more often than not just bad design decisions.
>
> Yes, there are valid and important use cases. But I agree with all of @scottaohara’s points, and most importantly I agree that we need to fix the underlying issues instead of standardizing a technique that is *guaranteed* to be overused and misused even more once it gets easier to use.

<SiteInfo
  name="[css-display] create a display property value for visually hiding an element while making it available for AT · Issue #560 · w3c/csswg-drafts"
  desc="While giving a talk at CSSConf last week, I mentioned how we should provide text for AT to be able to read when we are using only icons to represent that text visually. Basically: provide text in t..."
  url="https://github.com/w3c/csswg-drafts/issues/560/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ba52e2d70639f8223c6d9be0fbbe44ed0ebc7ba0f56c3d0fbc772c1614e3779f/w3c/csswg-drafts/issues/560"/>

::: 

**Adrian Roselli** has a blog post listing priorities for assigning an accessible name to a control. Like O’Hara and Soueidan, Roselli recognises there is no silver bullet.

::: info 'My Priority of Methods for Labeling a Control', Adrian Roselli (<VPIcon icon="fas fa-globe"/><code>adrianroselli.com</code>)

> Hidden text is also used too casually to provide information for just screen reader users, creating [overly-verbose content](https://adrianroselli.com/2019/10/stop-giving-control-hints-to-screen-readers.html). For [sighted screen reader users](https://adrianroselli.com/2017/02/not-all-screen-reader-users-are-blind.html), it can be a frustrating experience to not be able to find what the screen reader is speaking, potentially causing the user to get lost on the page while visually hunting for it.

<SiteInfo
  name="My Priority of Methods for Labeling a Control"
  desc="Here is the priority I follow when assigning an accessible name to a control: Native HTML techniques, aria-labelledby pointing at existing visible text, Visibly-hidden content that is still in the page, aria-label. Too often folks will grab ARIA first to provide an accessible name for a thing. Or they may…"
  url="https://adrianroselli.com/2020/01/my-priority-of-methods-for-labeling-a-control.html/"
  logo="https://adrianroselli.co/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2020/01/priority-labeling_thumb-300x300.png"/>

:::

In short, many believe that a native visually-hidden would do more harm than good. The use-cases are far more nuanced and context sensitive than developers realise. It’s often a half-fix for a problem that can be avoided with better design.

I’m torn on whether I agree that it’s ultimately a bad idea. A native version would give software an opportunity to understand the developer’s intent and define how “visually hidden” works in practice. It would be a pragmatic addition.

The `visually-hidden` technique has persisted for over two decades and is still mentioned by WCAG. Yet it remains hacks upon hacks! How has it survived for so long? Is that a failure of developers, or a failure of the web platform?

The web is overrun with inaccessible [<VPIcon icon="fas fa-globe"/>div soup](https://jsx.lol/). That is inexcusable. For the rest of us who care about accessibility — who try our best — I can’t help but feel the web platform has let us down. We shouldn’t be perilously navigating code hacks, conflicting advice, and half-supported standards. We need more ~energy~ money dedicated to accessibility. Not all problems can be solved with money. But what of the thousands of unpaid hours, whether volunteered or solicited, from those seeking to improve the web? I risk spiralling into a [**rant**](/dbushell.com/trillion-dollar-elephants.md) about browser vendors’ financial incentives, so let’s wrap up!

I’ll end by quoting **Bob Easton** from our email conversation:

> From my early days in web development, I came to the belief that semantic HTML, combined with faultless keyboard navigation were the essentials for blind users. Experience with screen reader users bears that out. Where they might occasionally get tripped up is due to developers who are more interested in appearance than good structural practices.
>
> The use cases for hidden content are very few, such as hidden information about where a search field is, when an appearance-centric developer decided to present a search field with no visual label, just a cute unlabeled image of a magnifying glass.
>
> […] The people promoting hidden information are either deficient in using good structural practices, or not experienced with tools used by people they want to help.

Bob ended with:

> You can’t go wrong with well crafted, semantically accurate structure.

Ain’t that the truth.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Everything you never wanted to know about visually-hidden",
  "desc": "The one where I attempt to answer a question",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/visually-hidden.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
