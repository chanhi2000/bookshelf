---
lang: en-US
title: "Challenging CSS Best Practices"
description: "Article(s) > Challenging CSS Best Practices"
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
      content: "Article(s) > Challenging CSS Best Practices"
    - property: og:description
      content: "Challenging CSS Best Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/challenging-css-best-practices-atomic-approach.html
prev: /programming/css/articles/README.md
date: 2013-10-21
isOriginal: false
author:
  - name: Thierry Koblentz
    url: https://smashingmagazine.com/author/thierry-koblentz/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0899a4df-097c-4e76-acc5-1720a1cf2eee/illu-css.jpg
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
  name="Challenging CSS Best Practices"
  desc="When it comes to CSS, Thierry Koblentz is convinced that the only way to improve how to author style sheets is by moving away from the sacred principle of “separation of concerns”. CSS authors thrive on styling documents entirely through style sheets, an approach that has been sanctified by the CSS Zen Garden project (what most developers consider to be the standard for how to author style sheets)."
  url="https://smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0899a4df-097c-4e76-acc5-1720a1cf2eee/illu-css.jpg"/>

When it comes to CSS, Thierry Koblentz is convinced that the only way to improve how to author style sheets is by moving away from the sacred principle of “separation of concerns”. CSS authors thrive on styling documents entirely through style sheets, an approach that has been sanctified by the CSS Zen Garden project (what most developers consider to be the standard for how to author style sheets).

::: note Editor’s Note

This article features techniques that are used in practice by Yahoo! and question coding techniques that we are used to today. You might be interested in reading [**Decoupling HTML From CSS**](/smashingmagazine.com/decoupling-html-from-css.md) by Jonathan Snook, [On HTML Elements Identifiers](https://nefariousdesigns.co.uk/on-html-element-identifiers.html) by Tim Huegdon and [**Atomic Design With Sass**](/smashingmagazine.com/other-interface-atomic-design-sass.md) by Robin Rendle as well. Please keep in mind: some of the mentioned techniques are not considered to be best practices.

![](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f7fd599c-c918-470d-9968-9e63173f823a/class-stop-mini.jpg)

:::

When it comes to CSS, I believe that the sacred principle of “[<VPIcon icon="fa-brands fa-wikipedia-w"/>separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)” (SoC) has lead us to accept **bloat, obsolescence, redundancy, poor caching** and more. Now, I’m convinced that the only way to improve how we author style sheets is by moving away from this principle.

For those of you who have never heard of the SoC principle in the context of Web design, it relates to something commonly known as the “separation of the three layers”:

- structure,
- presentation,
- behavior.

It is about dividing these concerns into separate resources: an HTML document, one or more cascading style sheets and one or more JavaScript files.

But when it comes to the presentational layer, “best practice” goes way beyond the separation of resources. CSS authors thrive on styling documents entirely through style sheets, an approach that has been sanctified by Dave Shea’s excellent project [<VPIcon icon="fas fa-globe"/>CSS Zen Garden](https://csszengarden.com/). CSS Zen Garden is what most — if not all — developers consider to be the **standard** for how to author style sheets.

---

## The Standard

To help me illustrate issues related to today’s best practices, I’ll use a very common pattern: the [<VPIcon icon="fas fa-globe"/>media object](https://stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/). Its combination of markup and CSS will be our starting point.

### Markup

In our markup, a wrapper (`div.media`) contains an image wrapped in a link (`a.img`), followed by a div (`div.bd`):

```html
<div class="media">
  <a href="https://twitter.com/thierrykoblentz" class="img">
        <img src="thierry.jpg" alt="me" width="40" />
  </a>
  <div class="bd">
    @thierrykoblentz 14 minutes ago
  </div>
</div>
```

### CSS

Let’s give a 10-pixel margin to the wrapper and style both the wrapper and `div.bd` as block-formatting contexts (BFC). In other words, **the wrapper will contain the floated link**, and the content of `div.bd` will not wrap around said link. A gutter between the image and text is created with a 10-pixel margin (on the float):

```css
.media {
  margin: 10px;
}
.media,
.bd {
  overflow: hidden;
  _overflow: visible;
  zoom: 1;
}
.media .img {
  float: left;
  margin-right: 10px;
}
.media .img img {
  display: block;
}
```

### Result

Here is the presentation of the wrapper, with the image in the link and the blob of text:

<!-- TODO: 다시 변환 필요 -->

### A New Requirement Comes In

Suppose we now need to be able to display the image on the other side of the text as well.

### Markup

Thanks to the magic of BFC, all we need to do is change the styles of the link. For this, we use a new class, `imgExt`.

```html
<div class="media">
  <a href="https://twitter.com/thierrykoblentz" class="imgExt">
    <img src="thierry.jpg" alt="me" width="40" />
  </a>
  <div class="bd">@thierrykoblentz 14 minutes ago</div>
</div>
```

### CSS

We’ll add an extra rule to float the link to the right and change its margin:

```css
.media {
  margin: 10px;
}
.media,
.bd {
  overflow: hidden;
  _overflow: visible;
  zoom: 1;
}
.media .img {
  float: left;
  margin-right: 10px;
}
.media .img img {
  display: block;
}
.media .imgExt {
  float: right;
  margin-left: 10px;
}
```

### Result

The image is now displayed on the opposite side:

<!-- TODO: 다시 변환 필요 -->

### One More Requirement Comes In

Suppose we now need to make the text smaller when this module is inside the right rail of the page. To do that, we create a new rule, using `#rightRail` as a contextual selector:

### Markup

Our module is now inside a `div#rightRail` container:

```html
<div id="rightRail">
  <div class="media">
    <a href="https://twitter.com/thierrykoblentz" class="img">
      <img src="thierry.jpg" alt="me" width="40" />
    </a>
    <div class="bd">@thierrykoblentz 14 minutes ago</div>
  </div>
</div>
```

### CSS

Again, we create an extra rule, this time using a descendant selector, `#rightRail .bd`.

```css
.media {
  margin: 10px;
}
.media,
.bd {
  overflow: hidden;
  _overflow: visible;
  zoom: 1;
}
.media .img {
  float: left;
  margin-right: 10px;
}
.media .img img {
  display: block;
}
.media .imgExt {
  float: right;
  margin-left: 10px;
}
#rightRail .bd {
  font-size: smaller;
}
```

### Result

Here is our original module, showing inside `div#rightRail`:

<!-- TODO: 다시 변환 필요 -->

---

## What’s Wrong With This Model?

- **Simple changes to the style of our module have resulted in new rules in the style sheet.**<br/>There must be a way to style things without *always* having to write more CSS rules.
- **We are grouping selectors for common styles (`.media,.bd {}`).**<br/>Grouping selectors, rather than using a class associated with these styles, will lead to more CSS.
- **Of our six rules, four are context-based.**<br/>Rules that are context-specific are hard to maintain. Styles related to such rules are not very reusable.
- **RTL and LTR interfaces become complicated.**<br/>To change direction, we’d need to overwrite some of our styles (i.e. write *more* rules). For example:

```css
.rtl .media .img {
    margin-right: auto; /* reset */
    float: right;
    margin-left: 10px;
}
.rtl .media .imgExt {
    margin-left: auto; /* reset */
    float: left;
    margin-right: 10px;
}
```

---

## Meet Atomic Cascading Style Sheet

::: info a·tom·ic (<VPIcon icon="fa-brands fa-google"/><code>google.com</code>)
 
> /ə'tämik/
> 
> of or forming a single irreducible unit or component in a larger system.

:::

As we all know, the smaller the unit, the more reusable it is.

::: note csswizardry Twitter (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com</code>)

"Treat code like Lego. Break code into the smallest little blocks possible." — [@csswizardry (<VPIcon icon="fa-brands fa-x-twitter"/>`csswizardry`)](https://x.com/csswizardry) (via [@stubbornella (<VPIcon icon="fa-brands fa-x-twitter"/>`stubbornella`)](https://x.com/stubbornella)) [#btconf (<VPIcon icon="fa-brands fa-x-twitter"/>`search?q=%23btconf&src=hash`)](https://twitter.com/search?q=%23btconf&src=hash) — Smashing Magazine (@smashingmag) [May 27, 2013](https://x.com/smashingmag/statuses/339024926197559296)

:::

To break down styles into irreducible units, we can **map classes to a single style**, rather than many. This will result in a more granular palette of rules, which in turn improves reusability.

Let’s revisit the media object using this new approach.

### Markup

We are using five classes, none of which are related to content:

```html
<div class="Bfc M-10">
  <a href="https://twitter.com/thierrykoblentz" class="Fl-start Mend-10">
    <img src="thierry.jpg" alt="me" width="40" />
  </a>
  <div class="Bfc Fz-s">@thierrykoblentz 14 minutes ago</div>
</div>
```

### CSS

Each class is associated with one particular style. For the most part, this means we have one declaration per rule.

```css
.Bfc {
  overflow: hidden;
  zoom: 1;
}
.M-10 {
  margin: 10px;
}
.Fl-start {
  float: left;
}
.Mend-10 {
  margin-right: 10px;
}
.Fz-s {
  font-size: smaller;
}
```

### Result

<!-- TOOD: 다시 변환 필요 -->

### What Is This about?

Let’s ignore the class names for now and focus on what this does (or does not):

- **No contextual styling**<br/>We do not use contextual or descendant selectors, which means that our style sheet has no dead weight.
- **Directions (left and right) are “abstracted.”**<br/>Rather than overwriting styles, we serve a RTL style sheet that contains rules such as these:

```css
.Fl-start {
  float: right;
}
.Mend-10 {
  margin-left: 10px;
}
```

Same classes, same properties, different values.

But the most important thing to notice here is that **we are styling via markup**. We have changed the context in which we style our modules. We are now editing HTML templates instead of style sheets.

I believe that this approach is a game-changer because it **narrows the scope dramatically**. We are styling not in the global scope (the style sheet), but at the module and block level. We can change the style of a module without worrying about breaking something else on the page. And we can do this without adding any rule to the style sheet, let alone creating a new class and rule:

```css
.someBasicStyleForThisElementHere {...}
```

We get no redundancy. Selectors are not duplicated, and styles belong to a single rule instead of being part of many. For example, the style sheets that this page links to contain 72 `float` declarations.

Also, abandoning a style — for example, deciding to always keep the image on the left side of the module — does not make any of our rules obsolete.

### Sound Good?

Not sold yet? I hear you saying, “This goes against every single rule in the book. This is no better than inline styling. And your class names are not only cryptic, but unsemantic, too!”

Fair enough. Let’s address these concerns.

### Regarding Unsemantic Class Names

If you check the W3C’s “[<VPIcon icon="iconfont icon-w3c"/>Tips for Webmasters](https://w3.org/QA/Tips/goodclassnames),” where it says “Good names don’t change,” you’ll see that the argument is about *maintenance*, not semantics per se. All it says is that changing styles is easier in a CSS file than in multiple HTML files. `.border4px` would be a bad name only if changing the style of an element required us to change the declaration that that class name is associated with. In other words:

```css
.border4px {border-width:2px;}
```

### Regarding Cryptic Class Names

For the most part, these class names follow the syntax of Zen Coding — see the “[<VPIcon icon="fa-brands fa-google"/>Zen Coding Cheat Sheet](https://code.google.com/archive/p/zen-coding/). In other words, they are simple abbreviations.

There are exceptions for styles associated with direction (left and right) and styles that involve a combination of declarations. For example, `Bfc` stands for “block-formatting context.”

### Regarding Mimicking Inline Styles

Hopefully, the diagram below clears things up:

![Venn diagram that shows all possible logical relations between inline styles and styling via classes and markup.](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0bf58dff-5717-4cca-9e40-fd542ce6937c/venn-diagram-500-mini.png)

Inline styles versus Atomic CSS.

- **Specificity**<br/>The technique is not as specific as `@style`. It **lowers style weight** because rules rely on a single class, as opposed to rules like `.parent .bd {}`, which clocks in at 0.0.2.0 (see “[**CSS Specificity: Things You Should Know**](/smashingmagazine.com/css-specificity-things-you-should-know.md)”).
- **Verbosity**<br/>Most classes are abbreviations of declarations (for example, `M-10` versus `margin: 10px`). Some classes, such as `Bfc`, refer to more than one style (see “Mapping” in the diagram above). Other classes use “start” and “end” keywords, rather than left and right values (see “Abstraction” in the diagram above).

Here are the advantages of `@style`:

- **Scope**<br/>Styles are “sandboxed” to the nodes they are attached to.
- **Portability**<br/>Because the styles are “encapsulated,” you can move modules around without losing their styles. Of course, we still need the style sheet; however, because we are making context irrelevant, modules can live anywhere on a page, website or even network.

---

## The Path To Bloat

Because the styles of our module are tied only to presentational class names, **they can be anything we want them to be**. For example, if we need to create a simple two-column layout, all we need to do is replace the link with a `div` in our template. That would look like this:

```html
<div class="Bfc M-10">
  <div class="Fl-start Mend-10 W-25">column 1</div>
  <div class="Bfc">column 2</div>
</div>
```

And we would need only one extra rule in the style sheet:

```css
.Bfc {
  overflow: hidden;
  zoom: 1;
}
.M-10 {
  margin: 10px;
}
.Fl-start {
  float: left;
}
.Mend-10 {
  margin-right: 10px;
}
.Fz-s {
  font-size: smaller;
}
.W-50 {
  width: 50%;
```

Compare this to the traditional way:

```html
<div class="wrapper">
  <div class="sidebar">column 1</div>
  <div class="content">sidebar</div>
</div>
```

This would require us to create three new classes, to add an extra rule and to group selectors.

```css
.wrapper,
.content,
.media,
.bd {
  overflow: hidden;
  _overflow: visible;
  zoom: 1;
}
.sidebar {
  width: 50%;
}
.sidebar,
.media .img {
  float: left;
  margin-right: 10px;
}
.media .img img {
  display: block;
}
```

I think the code above pretty well demonstrates the price we pay for following the SoC principle. In my experience, all it does is grow style sheets.

Moreover, the larger the files, the more complex the rules and selectors become. And then no one would dare edit the existing rules:

- We leave alone rules that we suspect to be obsolete for fear of breaking something.
- We create new rules, rather than modify existing ones, because we are not sure the latter is 100% safe.

In other words, we make things worse because **we can get away with bloat**.

Nowadays, people are accustomed to very large style sheets, and many authors think they come with the territory. Rather than fighting bloat, they use tools (i.e. preprocessors) to help them deal with it. [<VPIcon icon="fas fa-globe"/>Chris Eppstein tells us](https://chriseppstein.github.io/blog/2013/04/22/joining-linkedin/):

::: info Chris Eppstein (<VPIcon icon="fas fa-globe"/><code>chriseppstein.github.io</code>)

> "LinkedIn has over 1,100 Sass files (230k lines of SCSS) and over 90 web developers writing Sass every day."

```component VPCard
{
  "title": "Joining LinkedIn",
  "desc": "After six years at Caring.com, I'm joining LinkedIn and pursuing my dream job of working on open source, front end architecture, and developer relations.",
  "link": "https://chriseppstein.github.io/blog/2013/04/22/joining-linkedin/",
  "logo": "tps://chriseppstein.github.io/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

### CSS Bloat vs. HTML Bloat

Let’s face it: the data has to live somewhere. Consider these two blocks:

```html
<div class="sidebar">
```

```html
<div class="Fl-start Mend-10 W-25">
```

In many cases, the “semantic” class name makes up more bytes than the presentational class name (`.wrapper` versus `.Bfc`). But I do not think this is a real concern compared to what most apps onboard these days via `data-` attributes.

This is where [<VPIcon icon="fas fa-globe"/>gzip](https://gzip.org/) comes into play, because the high redundancy in class names across a document would achieve better compression. And the same is true of style sheets, in which we have many redundant sequences:

```css
.M-1 {margin: 1px;}
.M-2 {margin: 2px;}
.M-4 {margin: 4px;}
.M-6 {margin: 6px;}
.M-8 {margin: 8px;}
etc.
```

---

## Caching

Presentational rules **do not change**. Style sheets made from such rules mature into tool sets in which authors can find everything they need. By their nature, they stop growing and become **immutable**, and immutable is **cache-friendly**.

---

## No More .button Class?

The technique I’m discussing here is not about banning “semantic” class names or rules that group many declarations. The idea is to reevaluate the benefits of the common approach, rather than adopting it as the *de facto* technique for styling Web pages. In other words, we are restricting the “component” approach to the few cases in which it makes the most sense.

For example, you may find the following rules in our style sheets, rules that set styles for which we do not create simple classes or rules that ensure cross-browser support.

```css
.button {
  display: inline-block;
  *display: inline;
  zoom: 1;
  font-size: bold 16px/2em Arial;
  height: 2em;
  box-shadow: inset 1px 1px 2px 0px #fff;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.05, #ededed),
    color-stop(1, #dfdfdf)
  );
  background: linear-gradient(center top, #ededed 5%, #dfdfdf 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#dfdfdf');
  background-color: #ededed;
  color: #777;
  text-decoration: none;
  text-align: center;
  text-shadow: 1px 1px 2px #ffffff;
  border-radius: 4px;
  border: 2px solid #dcdcdc;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  *width: 600px;
  *margin-left: -300px;
  *top: 50px;
}
@media \0screen {
  .modal {
    width: 600px;
    margin-left: -300px;
    top: 50px;
  }
}
```

On the other hand, you would not see rules like the ones below (i.e. styles bound to particular modules), because we prefer to apply these same styles using multiple classes: one for font size, one for color, one for floats, etc.

```css
.news-module {
  font-size: 14px;
  color: #555;
  float: left;
  width: 50%;
  padding: 10px;
  margin-right: 10px;
}
.testimonial {
  font-size: 16px;
  font-style: italic;
  color: #222;
  padding: 10px;
}
```

---

## Do We Include Every Possible Style In Our Style Sheet?

The idea is to have a pool of rules that authors can choose from to style anything they want. Styles that are common enough across a website would become part of the style sheet. If a style is too specific, then we’d rely on `@style` (the style attribute). In other words, we’d prefer to **pollute the markup rather than the style sheet**. The primary goal is to create a sheet made of rules that address various design patterns, from a basic rule that floats an element to “helper” classes.

```css
/**
 * one liner with ellipsis
 * 1. we inherit hyphens:auto from body, which would break "Ell" in table cells
 */
.Ell {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-hyphens: none; /* 1 */
  -ms-hyphens: none;
  -o-hyphens: none;
  hyphens: none;
}
/**
 * kinda line-clamp
 * two lines according to default font-size and line-height
 */
.LineClamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 13px;
  line-height: 1.25;
  max-height: 32px;
  _height: 32px;
  overflow: hidden;
}
/**
 * reveals an hidden element on :hover or :focus
 * visibility can be forced by applying the class "RevealNested-on"
 * IE8+
 */
:root .NestedHidden {
  opacity: 0;
}
:root .NestedHidden:focus,
:root .RevealNested:hover .NestedHidden,
:root .RevealNested-on .NestedHidden {
  opacity: 1;
}
```

---

## How Does This Scale?

We have just released a brand new [<VPIcon icon="fa-brands fa-yahoo"/>My Yahoo](https://my.yahoo.com), which relies heavily on this technique. This is how it compares to a few other Yahoo products (after gzip’ing):

|  | **CSS Assets** |
| --- | --- |
| answers.yahoo.com | 30.1 KB |
| sports.yahoo.com | 67.4 KB |
| omg.yahoo.com | 46.2 KB |
| yahoo.com | 45.9 KB |
| my.yahoo.com | 21.3 KB |

Our style sheet weighs 17.9 KB (about 3 KB of which are property-specific), and it is shareable (unlike the style sheets of other properties). The reason for this is that none of the rules it contains relate to content.

---

## Wrapping Up

Because **presentational class names have always been deemed “out of bounds**,” we — the community — have not really investigated what their use entails. In fact, in the name of best practice, we’ve dismissed every opportunity to explore their potential benefits.

Here at Yahoo, [(<VPIcon icon="fa-brands fa-x-twitter"/>`@renatoiwa`)](https://twitter.com/renatoiwa), @StevenRCarlson and I are developing projects with this new [<VPIcon icon="fas fa-globe"/>CSS architecture](https://engineering.appfolio.com/2012/11/16/css-architecture/). The code appears to be predictable, reusable, maintainable and scalable. These are the results we’ve experienced so far:

- **Less bloat**<br/>We can build entire modules without adding a single line to the style sheets.
- **Faster development**<br/>Styles are driven by classes that are not related to content, so we can copy and paste existing modules to get started.
- **RTL interface for free**<br/>Using start and end keywords makes a lot of sense. It saves us from having to write extra rules for RTL context.
- **Better caching**<br/>A huge chunk of CSS can be shared across products and properties.
- **Very little maintenance (on the CSS side)**<br/>Only a small set of rules are meant to change over time.
- **Less abstraction**<br/>There is no need to look for rules in a style sheet to figure out the styling of a template. It’s all in the markup.
- **Third-party development**<br/>A third party can hand us a template without having to attach a style sheet (or a `style` block) to it. No custom rules from third parties means no risk of breakage due to rules that have not been properly namespaced.

(Note that if maintenance is easier on the CSS side than on the HTML side, then the reason is simply that we can cheat on the CSS side by not cleaning up rules. But if we were required to keep things lean and clean, then the pain would be the same.)

::: note Final Note

I was at a [<VPIcon icon="fa-brands fa-meetup"/>meetup](https://meetup.com/sfhtml5/events/131694202/) a couple of weeks ago, where I heard Colt McAnlis say, “[<VPIcon icon="fa-brands fa-youtube"/>Tools, not rules](https://youtu.be/OPBvdsFi7Ss).” A quick search for [<VPIcon icon="fas fa-globe"/>this idiom](https://notrulestools.com/Main_Page) returned this:

> “We all need to be open to new learnings, new approaches, new best practices and we need to be able to share them.”

:::

::: info Further Reading

```component VPCard
{
  "title": "53 s You Couldn’t Live Without",
  "desc": "CSS is important. And it is being used more and more often. Cascading Style Sheets offer many advantages you don't have in table-layouts - and first of all a strict separation between layout, or design of the page, and the information, presented on the page. Thus the design of pages can be easily changed, just replacing a css-file with another one. Isn't it great? Well, actualy, it is...",
  "link": "/smashingmagazine.com/53-css-techniques-you-couldnt-live-without.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "The Road To Reusable HTML Components",
  "desc": "In a previous post, Niels Matthijs sampled a couple of common content types (such as products, stories and videos) across different websites. In this article, he sticks to four different views of a single content type: the story (or news article).",
  "link": "/smashingmagazine.com/road-reusable-html-components.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Semantic CSS With Intelligent Selectors",
  "desc": "In this article, we will explore an alternative approach to styling Web documents. With the use of “intelligent” selectors, we’ll cover how to query the extant, functional nature of semantic HTML in such a way as to reward well-formed markup. If you code it right, you’ll get the design you were hoping for. Heydon Pickering hopes that employing some of these ideas will make your workflow simpler and more transferable between projects.",
  "link": "/smashingmagazine.com/semantic-css-with-intelligent-selectors.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Creating A High-Contrast Design System With CSS Custom Properties**](/smashingmagazine.com/creating-high-contrast-design-system-css-custom-properties.md)

:::
<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Challenging CSS Best Practices",
  "desc": "When it comes to CSS, Thierry Koblentz is convinced that the only way to improve how to author style sheets is by moving away from the sacred principle of “separation of concerns”. CSS authors thrive on styling documents entirely through style sheets, an approach that has been sanctified by the CSS Zen Garden project (what most developers consider to be the standard for how to author style sheets).",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/challenging-css-best-practices-atomic-approach.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
