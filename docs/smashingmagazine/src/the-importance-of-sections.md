---
lang: en-US
title: "Structural Semantics: The Importance Of HTML5 Sectioning Elements"
description: "Article(s) > Structural Semantics: The Importance Of HTML5 Sectioning Elements"
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
      content: "Article(s) > Structural Semantics: The Importance Of HTML5 Sectioning Elements"
    - property: og:description
      content: "Structural Semantics: The Importance Of HTML5 Sectioning Elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/the-importance-of-sections.html
prev: /programming/css/articles/README.md
date: 2013-01-18
isOriginal: false
author:
  - name: Heydon Pickering
    url : https://smashingmagazine.com/author/heydon-pickering/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/07b3cca6-f289-4473-adc6-47ce25f6bc96/the-importance-of-sections.png
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
  name="Structural Semantics: The Importance Of HTML5 Sectioning Elements"
  desc="Now that HTML5 has finally made sectioning elements available, many of us greet them with great reluctance. Make no mistake: Sectioning elements help you improve document structure, and they’re in the spec’ to stay. Once and for all, Heydon Pickering will be exploring the problems these elements solve, the opportunities they offer and their important but misunderstood contribution to the semantic Web. Some people will tell you not to bother with sectioning. They say that it’s hard work or that it doesn’t make sense. This is hokum. Using sections demonstrably enhances HTML structure without breaking accessibility."
  url="https://smashingmagazine.com/2013/01/the-importance-of-sections/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/07b3cca6-f289-4473-adc6-47ce25f6bc96/the-importance-of-sections.png"/>

Now that HTML5 has finally made sectioning elements available, many of us greet them with great reluctance. Make no mistake: Sectioning elements help you improve document structure, and they’re in the spec’ to stay. Once and for all, Heydon Pickering will be exploring the problems these elements solve, the opportunities they offer and their important but misunderstood contribution to the semantic Web. Some people will tell you not to bother with sectioning. They say that it’s hard work or that it doesn’t make sense. This is hokum. Using sections demonstrably enhances HTML structure without breaking accessibility.

Whatever you call them — blocks, boxes, areas, regions — we’ve been dividing our Web pages into visible sections for well over a decade. The problem is, we’ve never had the right tools to do so. While our interfaces look all the world like grids, the underlying structure has been cobbled together from numbered headings and unsemantic helper elements; an unbridled stream of content at odds with its own box-like appearance.

Because we can make our `<div>`s look but not *behave* like sections, the experience for assistive technology (AT) users and data-mining software is quite different from the experience enjoyed by those gifted with sight.

Now that HTML5 has finally made [<VPIcon icon="iconfont icon-w3c"/>sectioning elements](https://w3.org/WAI/GL/wiki/Using_HTML5_section_elements) available, many of us greet them with great reluctance. Why? Partly, because we’re a community which is deceptively resistant to change, but also because of some perceived discrepancies regarding advice in the specification. In truth, the advice is sound and the algorithm for sectioning is actually easier to use than previous implementations. Some developers are just very married to their old workflow, and they think you should be too. There’s no good reason why.

Make no mistake: Sectioning elements help you improve document structure, and they’re in the spec’ to stay. Once and for all, I will be exploring the problems these elements solve, the opportunities they offer and their important but misunderstood contribution to the semantic Web. If you’re unfamiliar with the concept of the “semantic Web,” [<VPIcon icon="fa-brands fa-youtube"/>this video](https://youtu.be/OGg8A2zfWKg) is a great introduction.

<VidStack src="youtube/OGg8A2zfWKg" />

---

## Making Websites

My introduction to Web design was via a university course module called something like “2.1: Dreamweaver,” and I recall my first website well. I remember my deliberately garish choice of [<VPIcon icon="fa-brands fa-wikipedia-w"/>Web-safe](https://en.wikipedia.org/wiki/Web_colors#Web-safe_colors) colors. I remember it looking right only in [<VPIcon icon="fa-brands fa-wikipedia-w"/>Netscape Navigator](https://en.wikipedia.org/wiki/Netscape_Navigator). Most of all, I remember hours of frustration from tugging at the perimeter of a visual layout tool named “table.” I had no idea at the time that this layout tool represented a type of annotation called an HTML tag. Furthermore, no one told me that this annotation invited my patchwork of primary colors and compressed JPEGs to be computed as a sort of demented Excel spreadsheet. In other words, I had no idea I was **doing it wrong**.

![A Dreamweaver table](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/70f6ea7e-9212-4b4f-99c3-2c592466de1e/table.gif)

::: info Bites tongue (Richard Saul Wurman)

> “The fundamental failure of most graphic, product, architectural, and even urban design is its insistence on serving the God of Looking-Good rather than the God of Being-Good.”

:::

Macromedia’s Dreamweaver didn’t make the creation of valid documents impossible, but it was one of a number of emerging GUI editors that pandered to **our desire for visual expression** more than it encouraged informational clarity. Dreamweaver, and other editors classified under the misnomer “WYSIWYG,” helped transform a standardized information system into a home for graphic design and enabled a legion of insufferable Nathan Barleys to flypost the World Wide Web with their vapid eye candy. I was one of many.

### Web Standards

By the time I made my first website, the Web standards movement, promoting compliance, uniformity and inclusion, was burgeoning. I just wasn’t aware of it until much later. I didn’t have to be: Agency-based Web design was still mainly graphic design with a reluctant programming department clumsily bolted on. If you’re doubtful of the grip that this culture has had on the World Wide Web, look no further than the fact it took until 2010 (*2010!*) for us to concede that [<VPIcon icon="fas fa-globe"/>Web browsers are not really made of paper](https://alistapart.com/articles/responsive-web-design/).

When I finally became familiar with Web standards and the practice of “doing things right,” it was as someone who still worked primarily as a visual designer. Inevitably, my first forays into standards-based design revolved around mastering “CSS layout,” the practice of visually arranging content without relying on the semantically incorrect `<table`` element. We’ve held up `<div>`-based layout as a mark of quality for a number of years now. You might even say that it has become a time-honored rite of passage for graphic designers who are moving into “proper” HTML coding.

As I shall demonstrate, the `<div>` is the ultimate Graphic Design tool. By affecting only appearance, it licenses poor document structure and overengineered interfaces; all without making your document technically invalid. As such, it sanctions **the worst kind of hacks**.

---

## The Problem With `<div>`

Every day, thousands of Web developers invoke the almighty `<div>` to divide, partition and ring-fence their Web pages’ content. We use the `<div>` to police content, to prevent disparate chunks of information from collapsing into each other. In truth, the `<div>` has no such power.

Consider the following example:

![Two column layout with sidebar encircled with dark border](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/daf11c35-cc95-4e5e-ba17-0ca0b9581efd/drawing1-300x300.png)

In this basic layout, I have included a body of text and an adjacent “sidebar.” To make it absolutely clear to the reader that the sidebar is tangential and does not belong to the main content, I’ve drawn a **fat line** around it using the `border` property. For those of you screaming, “That sidebar heading should be an `<h3>`!”, I’ll get to that shortly. All of my design decisions (the adjacent position, the border and the reduced font size) are facilitated by CSS alone. So, when I take the CSS away, I get this:

![The same layout as before is now one column, no borders](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/37c5a186-056f-4783-9698-d7bff4b77dff/drawing2-300x300.png)

Not only is switching off CSS the quickest way to make a Web page [<VPIcon icon="iconfont icon-smashingmagazine"/>responsive](https://smashingmagazine.com/tag/responsive-web-design/), but it’s a great way to see how HTML4 documents (which lack sectioning elements) are actually computed. In this case, our so-called “sidebar” is revealed to be just another raft of information in the [<VPIcon icon="fas fa-globe"/>linear flow](https://webdesign.tutsplus.com/quick-tip-utilizing-normal-document-flow--webdesign-8199a) of the document.

### Why Is This So?

The reason for this is that the `<div>` is, and always has been, a [<VPIcon icon="iconfont icon-w3c"/>flow content](https://w3.org/TR/2011/WD-html5-20110525/content-models.html#flow-content-0) element. No matter how thick the `<div>`’s borders or how dark its background color, it does not stand apart in the structure of the document. Neither, therefore, does its content. With the CSS removed, the faux sidebar’s heading of “Resources” now seems less a distinct component of the page and more a part of the main content. To a parser or screen reader, it would have seemed this way all along.

For reasons of clarity, let’s look at a further example using a snippet of HTML:

```html
<div class="parent">
  <h2>Heading</h2>
  <p>Some content...</p>
    <div class="child">
      <h2>Another heading</h2>
      <p>Some other content...</p>
    </div>
  </div>
```

I’ve done something slightly different here by entering the two `<div>`s into a parent-child relationship: The `div.child` tag *belongs* to `div.parent`. We can certainly make it look that way with CSS, anyway. However, `<div>`s, to quote the specification, “have no special meaning.” Not only do they not mean anything semantically, but they have no impact on the **computable structure** of the page (sometimes called the “[<VPIcon icon="fas fa-globe"/>document outline](https://html5doctor.com/outlines/)”). The `<div>`s we’ve used may as well be invisible; so, to get a meaningful map of the structure we’ve created, we should **remove them completely**. That leaves just four elements and reveals the parent-child relationship to be an illusion:

```xml
<h2>Heading</h2>
  <p>Some content...</p>
  <h2>Another heading</h2>
  <p>Some other content...</p>
```

As HTML coders interested in sound structure, we should be interested that the above reduction — which omits all meaningless elements — is what we’ve **actually made**, and it’s not what we set out to do: By not really *belonging* to “parent,” “child” has a different contextual status in the document than intended.

### Heading Levels Don’t Really Help

It’s popular to believe that replacing the second `<h2>` with an `<h3>` would solve our problem. If we did so, we’d get the following, more dynamic outline:

- A Heading (`h2`)
  - Another Heading (`h3`)

This solution certainly seems more purposeful, but is it the right decision? Should the second heading be a subheading within the same topic (an `<h3>`  or be the introduction of an entirely new topic (an `<h2>`  as we had in the first place)? Headings alone can only show where a piece of content starts, not where it ends, which makes it difficult to tell **what belongs to what**. We have to simulate belonging by choosing the correct heading level for the context. Just think about that for a second: We’re defining the content’s structural status by labeling it retroactively. It’s just *begging* to go wrong.

Lets have a look at the homepage of accessibility experts The Paciello Group. Naturally, it’s a highly accessible and pretty well organized site, but **could the structure be improved with HTML5 sections**? You’ll notice their use of a `<div>` to collectively wrap the three `<h2>` , *Software Developers*, *Website Owners* and *Mike Paciello*. Since the `<div>` doesn’t computably contain these three blocks, the last `<h2>` and the following `<h3>` are allowed to pair off in this relationship:

- Mike Paciello (`h2`)
  - Contact Us Now (`h3`)

Wait … so, “Contact Us Now” is a subtopic belonging to the larger theme of “Mike Paciello”. Can that be right? It certainly doesn’t look this way in the visual layout. It’s worth noting at this point that the `<div>` which fails to thematically group those three `<h2>` blocks has a class of `class=“region”`. Ironically, if this `<div>` had been a `<secti` ``, some screen readers would consider it a “region”. If a `<secti` `` *had* been used in place of the `<div>`, the observed relationship would not have emerged: The “region” would be self-contained. The *class* of “region”, however, is not taken into consideration in any meaningful way and does not affect the structure.

Okay, so that’s a weird one, but the situation only gets more confusing when we start to include items for which **headings aren’t really even appropriate**. Take this further example:

![This layout has an h1, an h2 for content and an h3 sidebar with a footer div at the bottom](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/82fd7f41-1508-4cad-8796-10d534594d60/drawing3-300x300.png)

In my HTML4 page, I have an `<h1>` to introduce the document, an `<h2>` for the main content and an `<h3>` to mark the start of my “sidebar” (which is just a wishy-washy `<div>`, as in previous examples). The page follows long-standing convention by having an untitled `div#footer` resting at the foot of the document for copyright information and other such necessary evils. (It has to be a `<div>` in HTML4, because the `<foote `` tag doesn’t exist yet.) The question is, to which heading does the footer belong?

### Whose Footer Is This?

Most of us, based on appearances, would agree that the footer must belong to the document. That is what we’ve learned to expect. To the unsighted, it is a different story: Because there is no new introductory heading between the sidebar `<h3>` and the footer content, it could be extrapolated that these two components are as one (see image below left). By the same token, one could also argue that we’ve included the “sidebar” as a mere “break” from the flow of the main content, before returning to that flow at the advent of the footer (see image below right). This would make the `<h2>` the footer’s heading.

![Red outlines show different interpretations of structure](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a6f1977f-9bd2-46c3-bfb8-a19e7869f7dc/leftandright1.png)

The only decent chance we have of understanding the intended structure of the page is by inferring it from a reading of the content. Remembering that the whole point of a “markup language” is to make the structure of information easier to follow, I may as well have chucked the HTML and **written my Web page on the back of a napkin**.

Some accessibility gurus would suggest that you use a remedial `<h2>` to head the `#footer` and bring it back in line, marking up the end of the sidebar like so:

- `h1` (page)
  - `h2` (main)
    - `h3` (sidebar)
  - `h2` (footer)

This kind of works as a hack, but it’s not really sound. Do you really want to make a big announcement of the footer — an announcement as big and bold as the one used to summon the main content, not to mention *bolder* than the sidebar? **No**. If our Web page were a film, the footer wouldn’t be the titles — it would be the credits. In HTML5, the `<footeer>` element “contains information about its section.” This is semantically superior: We don’t use footers to introduce topics; we use them to conclude them. Accordingly, footers — unlike their parent sections in HTML5 — do not require headings.

![Tweet reads: Marking up lots of headings in a page significantly dilutes a screen reader user's ability to navigate between parts of a page efficiently](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1803e200-a60a-4983-9c5b-ae1d377934a0/tweet.png)

*Just because the nesting level of headings is correct doesn’t necessarily make a page easy to read.*

The closest thing we have to a “system” for structuring documents properly in HTML4 is numbered headings. Not only does this lead to ambiguity, as explained, but in practice we don’t really even *use* headings to define structure. We use `<div>`s to define structure and throw in some apologetic headings for accessibility’s sake. To make matters *even* worse, [<VPIcon icon="iconfont icon-w3c"/>advice regarding the deployment of numbered headings](https://w3.org/TR/WCAG-TECHS/H42.html) isn’t even clear on whether we should use them in order (h1-h6) or not.

The loose coupling between headings and `<div>`s is inadequate. Now, with the introduction of sectioning elements, we still use boxes, of sorts, but boxes that actually *say something* on their own. We are making a move from merely implying sections (by labeling them) to **letting them define themselves**. Simultaneously, sighted readers and unsighted parsers can experience content that one has effortlessly divided into clear, manageable portions.

::: info Mozilla Development Network (<VPIcon icon="fa-brands fa-firefox"/><code>developer.mozilla.org</code>)

> “The HTML4 spec is very imprecise on what is a section and how its scope is defined. Automatic generation of outlines is important, especially for assistive technology, that are likely to adapt the way they present information to the users according to the structure of the document. HTML5 removes the need for `<div>` elements from the outlining algorithm by introducing a new element, `<section>`, the HTML Section Element.”

<SiteInfo
  name="Structuring documents - Learn web development | MDN"
  desc="In addition to defining individual parts of your page (such as ”a paragraph” or ”an image”), HTML also boasts a number of block level elements used to define areas of your website such as ”the header”, ”the navigation menu”, or ”the main content column”. This article looks into how to plan a basic website structure, and write the HTML to represent this structure."
  url="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

---

## Sectioning

Aware of our desire for legitimate elements to create computable sections, HTML5 offers `<section>`, `<article>`, `<aside>` and `<nav>`. Like some sort of obnoxious holiday rep’, I’ll introduce the topic of practical sectioning using these elements with a quick quiz. Study the following diagram. How many sections do you count?

![An HTML5 page with header, aside and footer](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5941cc75-cb6d-43e5-9054-248b2a78aa99/sectioning1-300x300.png)

**Multiple-choice answers:**

1. 1
2. 2
3. 3
4. 4

The correct answer is (b), 2. We have included just one of HTML5’s new sectioning elements in the form of an `<aside``. Because `<foote ``s and `<heade ``s are not sectioning elements, what does that leave us with? The `<body>` tag is the outermost element, making the document itself a kind of section (a *super*section, to be precise). So, there you have it: We’ve been using “sectioning” since HTML 1.0, just not with any **subsections** to speak of.

Some of you may have missed the clue earlier in this article and thought that `<headeer>` and `<footer>` were sectioning elements. Don’t fret; it’s not your fault. Whenever developers like myself try to explain HTML5 page structure, they usually brandish a diagram like the one I used above. In these diagrams, the boxes marked “header,” “aside” and “footer” exist in the same visual paradigm and occupy a similar area. They seem alike, you might say. The other culprit for this endemic confusion is the way the specification is written. Believe it or not, the document structure of some pages in the specification that *refer* to document structure is **structurally unclear**! This sort of thing sometimes happens when a standard is constantly evolving. The navigation tree for “4.4 Sections” found in [<VPIcon icon="iconfont icon-w3c"/>this draft](https://w3.org/TR/2011/WD-html5-20110525/sections.html) is laid out like so:

- 4.4 Sections
  - 4.4.1 `body`
  - 4.4.2 `nav`
  - 4.4.3 `article`
  - 4.4.4 `aside`
  - 4.4.5 `h1`, `h2`, `h3`, `h4`, `h5` and `h6`
  - 4.4.6 `hgroup`
  - 4.4.7 `header`
  - 4.4.8 `footer`
  - 4.4.9 `address`

You’d be forgiven for thinking that anything in this list qualifies as a sectioning element, absurd as some of them (`<addre` ``?) may sound. It’s only when you navigate to 4.4 Sections > 4.4.8 Footer that you’re told that “the footer element is not sectioning content; it doesn’t introduce a new section.” Thanks!

Despite these ambiguities in the spec’ itself, as well as in the surrounding publicity for HTML5, sectioning in practice *just works*. The following three axioms are probably all you’ll need to understand the algorithm:

1. `<body>` is the first section;
2. `<article>`, `<section>`, `<nav>` and `<aside>` make subsections;
3. Subsections may contain more sections (subsections)

Aside from a few trifling details, that’s it. In a little while I’ll cover the *completely unnecessary worry* that is had over headings combined with sections. For now, let’s take another look at that example from before about footer ownership. This time, I’ll make a few HTML5 substitutions:

![The diagram clearly shows the footer in the context of the document](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/77f2938e-3d7e-4117-b214-9e67daea56ff/sectioning2-300x300.png)

Note the lack of illustrated headings. Wherever a section is opened, it assumes responsibility for nesting: The heading type is unimportant. More on this soon …

The outline for this example looks like this:

- Document
  - Article
  - Aside

Now that we’ve implemented sections, the boundaries are clear. Our document contains an article, which, in turn, contains an aside. There are three sections, each belonging to the last, and the depth of each section is reflected in the outline. Importantly, because sectioning elements *wrap* their contents, we know perfectly well where they *end*, as well as where they begin. And yes — screen readers like JAWS actually **announce the end of sections** like these! We know **what content belongs to what**, which makes deducing the purpose of the footer much easier. Because it exists outside the bounds of both the `<article>` and its `<aside>`, it *must* be the document’s footer. Here’s the same diagram again, with subsections faded out:

![The same diagram with subsections faded out](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2f4a813a-e500-4e34-8522-b15b507d8a09/sectioning3-300x300.png)

The power of sectioning lies in its ability to prescribe clearly defined boundaries, resulting in a more modular document hierarchy. The footer unequivocally belongs within the **immediate scope** of the highest-level section, giving assistive technologies and indexing parsers a good idea of its scope, which helps to make sense of the page’s overall structure.

---

## Headings And Accessibility

When Sir Tim Berners-Lee conceived the `<secti` `` element [all the way back in 1991](http://1997.webhistory.org/www.lists/www-talk.1991/0003.html), he envisioned the obsolescence of ranked heading levels. The thrust of the idea was that headings should act as mere labels for blocks of content, and the nature (i.e. the importance, scope, etc.) of the content would be calculated automatically based on the content’s standing in the document.

::: info Tim Berners-Lee (<VPIcon icon="fas fa-globe"/><code>1997.webhistory.org</code>)

> “I would in fact prefer, instead of `<h1>`, `<h2>` etc for headings [those come from the AAP DTD] to have a nestable `<section>..</section>` element, and a generic `<h>..</h>` which at any level within the sections would produce the required level of heading.”
> 
> – [Tim Berners-Lee](http://1997.webhistory.org/www.lists/www-talk.1991/0003.html)

Why is this preferable? Determining heading level systemically, based on nesting level, is much more dependable because it **removes a layer of decision-making**: By “producing” the required heading level automatically, we no longer have to decide separately which numbered heading we should include. It effectively prevents us from choosing the wrong heading level, which would be bad for parsable structure. A subsection *must* be subject to its parent section. Because this relationship between sections determines “level,” numbered headings are made redundant — hence, the proposed `<h>`

### A Lot Of Fuss Over Nothing

Now, this is the supposedly tricky part; the part that causes all the **consternation and gnashing of teeth**. This is the part that caused Luke Stevens to write [<VPIcon icon="fas fa-globe"/>this diatribe](https://creativebloq.com/net-magazine), and prompted Roger Johansson into a state of uncharacteristic apoplexy, asking, “[<VPIcon icon="fas fa-globe"/>are you confused too?](https://456bereastreet.com/archive/201103/html5_sectioning_elements_headings_and_document_outlines/)”. Ready?

In the WHATWG specification (in the same place where `<footer>`s were ostensibly classified as sectioning elements!), we are “strongly encouraged to either use only h1 elements, or to **use elements of the appropriate rank for the section’s nesting level**.” On first appearance, this seems contrary. Surely only one of these courses of action can possibly be right? What do you do? I’m thinking maybe the first option. Or the second. Who am I?

It certainly confused me, so I spoke with HTML Editor, Ian Hickson. He explained the outline to me in detail and I’m convinced it is perfectly robust. I’m going to do my best to explain it to you here.

Okay. As it turns out, we didn’t get the generic `<h>` element. This wouldn’t be backwards compatible because older browsers wouldn’t recognise it. However, headings that introduce sections are — regardless of their numbered level — *treated* as a generic `<h>`. Quite correctly, it is the **section itself** that takes responsibility for nesting in these situations — not the heading — and whenever you introduce a new section, you introduce a new nesting level *without fail*. What does this mean in practice? It means that we can introduce and benefit from the structural clarification offered by sections *without* abandoning heading levels. Take the following example:

```html
<h4>Page heading</h4>
<p>Introductory paragraph...</p>
<section>
  <h3>Section heading</h3>
  <p>some content...</p>
  <h2>Subheading</h2>
  <p>content following subheading...</p>
  <section>
    <h1>Sub-subheading</h1>
    <p>content two levels deep...</p>
  </section>
</section>
<h5>Another heading</h5>
<p>Continued content...</p>
```

Our heading levels are all over the place. This is not recommended by the specification, but it helps demonstrate just how robust the HTML5 outlining algorithm really is. If we replace all the headings that open sections with a generic (“wildcard”, if you prefer) `<h>` things become clearer:

```html
<h>Page heading</h>
<p>Introductory paragraph...</p>
<section>
  <h>Section heading</h>
  <p>some content...</p>
  <h2>Subheading</h2>
  <p>content following subheading...</p>
  <section>
    <h>Sub-subheading</h>
    <p>content two levels deep...</p>
  </section>
</section>
<h5>Another heading</h5>
<p>Continued content...</p>
```

It’s important to note that the only errors revealed in the computed outline are ones relating to **badly ordered numbered headings within the same section**. In the original example, you’ll see that I’ve followed an `<h3>` with an `<h2>`  Because they are in the wrong order, the outline interprets them as being on the same level. Had I encapsulated the `<h2>` in `<secti` ``, this error would have been suppressed.

Well, how about that? If you’re not convinced, go ahead and paste my example into the [<VPIcon icon="fas fa-globe"/>test outliner](https://gsnedders.html5.org/outliner/) and play around. It works just fine. In fact, it’s really difficult to break.

If you think there is a benefit to screen reader users, you may wish to adhere to the second of the two clauses from the specification and incorporate numbered headings that reflect nesting level. As demonstrated, this will have no effect on the outline, but since heading level (“Heading Level 2 - The Importance Of Sections”) is announced, it gives a clearer impression of structure to those who can’t see boxes inside boxes.

The assertation that heading levels are perpetually indispensable to screen reader users comes under pressure when you consider advancements being made by screen reader vendors. Screen readers like JAWS mark the territory of sections more clearly than headings, by announcing the beginnings and ends of sections and the thematic regions they represent (“Article End!”). From this perspective, using more than one `<h1>`  in your document might sometimes be applicable. You’ll come up against some accessibility experts who are keen on their “there can only be one \[h1\]!” mantra, but [<VPIcon icon="fas fa-globe"/>research shows](https://webaim.org/projects/screenreadersurvey3/#headings) that even in HTML4 or XHTML, this is not necessarily the case.

The approach you choose is yours to make; just employ some common sense and consistency. Bear in mind, though, that not all screen readers are able to announce the bounds of sectioned content. In these cases, there are measures you can take …

### ARIA Enhancement

Transition to an HTML5 document structure is made smoother by incorporating some ARIA [<VPIcon icon="fas fa-globe"/>landmark roles](https://paciellogroup.com/blog/2010/10/using-wai-aria-landmark-roles/), which are both relatively [<VPIcon icon="fas fa-globe"/>well supported](https://paciellogroup.com/blog/2011/07/html5-accessibility-chops-aria-landmark-support/) and somewhat analogous to the section-based navigation we should expect later. ARIA offers many more accessibility-specific features than baseline HTML5 could ever withstand; so, including “bolt-on” ARIA enhancements is [<VPIcon icon="fas fa-globe"/>certainly polite](https://456bereastreet.com/archive/201004/built-in_or_bolt-on_accessibility_in_html5_how_about_a_bit_of_both/). However, regarding ARIA roles as a substitute for semantic HTML would be a grave misconception.

Landmark roles, such as `role=“contentinfo”` and `role=“banner”`, address accessibility only — not data mining — and each may be used only once per document. They are essentially shortcuts to parts of the page. HTML elements are more like building blocks, which are used in a repeated and modular fashion. So, while you can assist accessibility by placing `role=”banner”` into the `<header>` element closest to the document’s root, this does not preclude you from using `<header>` to introduce other sections:

![The banner landmark role is used just once](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/aba2c726-0e14-4e72-ba80-4b4bac2a8ab9/banner-300x300.png)

### Are Sections The New `<div>`s?

This is a common misconception.

If it wasn’t clear already, it should be clear to you now that `<div>`s are semantically inert elements — elements that don’t really do or say anything. If this is clear, then it should also be clear that, when building a structured document, relying heavily on “[<VPIcon icon="iconfont icon-w3c"/>an element of last resort](https://w3.org/wiki/HTML/Elements/div)” makes for a very poor foundation.

If the new `<section>` element, for example, was just `<div>` with a new name, adopting it would be a straightforward matter of search and replace. It wouldn’t exactly be progress, though. The truth is, `<div>` still has a rightful place in the spec’; we’ve just given its organizational responsibilities to a team of elements that are better qualified. Sorry, `<div>`, old mate. What *do* we use `<div>`s for, then? Precisely what they were good at from the beginning: as a tool for “[<VPIcon icon="fa-brands fa-wikipedia-w"/>stylistic applications… when extant meaningful elements have exhausted their purpose](https://en.wikipedia.org/wiki/Span_and_div).”

For instance, you shouldn’t employ sections as [<VPIcon icon="iconfont icon-w3c"/>box-model](https://w3.org/TR/CSS2/box.html) controlling measures like this…

```html
<section class="outer">
  <section class="inner">
     <h1>Section title</h1>
  </section>
</section>
```

… because there’s nothing that the outer section does that the inner section doesn’t. We’ve created two sections for one piece of content. A quick run through [<VPIcon icon="fas fa-globe"/>our outliner](https://gsnedders.html5.org/outliner/) throws the “Untitled Section” warning:

- *[Untitled Section]*
  - Section title

The brilliance of `<div>` in this context is that it refuses to affect the outline, which is why we can use it without fear of reprisal. This…

```html
<section>
  <div>
     <h1>Section title</h1>
  </div>
</section>
```

… averts disaster and results in this unsullied, if simplistic, outline:

- Section title

### Sections And Semantics

A lot of developers have trouble with the word “semantic.” You might even say that they don’t know what the word means, which (if you *are* familiar with the term) makes an interesting paradox. For instance, when [<VPIcon icon="fa-brands fa-wikipedia-w"/>Jeffrey Zeldman advocates](https://zeldman.com/2012/11/21/in-defense-of-descendant-selectors-and-id-elements/) for the “semantic” application of the `id` attribute, he’s kind of missing the point. The main purpose of semantic HTML is for the automated extraction of meaning from content. Applying a private, non-standard `id` to a `<div>` would not improve the semantics of the element one iota: Visitors can’t see it and parsers will ignore it. So much for the [<VPIcon icon="fa-brands fa-wikipedia-w"/>semantic Web](https://en.wikipedia.org/wiki/Semantic_Web)!

Sections are often characterized as the “semantic” equivalent of `<div>`. This is a half-truth at best, and I apologize for throwing the term “semantic” around so much — it’s become a bit of a shorthand. Some HTML elements *are* inherently semantic in that they prescribe specific meaning to their contents. The `<addre` `` element is a good example: When a parser reaches `<addre` ``, it knows that the contents should probably be interpreted as contact information. What it chooses to do with this knowledge is another matter, but it’s plausible that a screen reader could provide a shortcut to the address or a search engine could use it to refine its results pages.

![Definition of syntax from Google search: The arrangement of words and phrases to create well-formed sentences in a language](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d71834a2-2566-4bef-9212-471fcf7c488a/syntax.png)

Sectioning elements are not so much semantic as syntactic. All `<secti` `` tells us is that it is a part of a whole. However, the *syntactic* contribution of sectioning elements to document structure is not unimportant. Consider the following sentence: **If sections you don’t websites your are use obsolete**. A lot of recognizable words are in there, but the lack of sensible syntax makes the sentence difficult to unpick. So it is with sectioning: You are not creating meaning so much as assembling it. Meaning isn’t always about the “thing”; it’s sometimes about what that thing’s role is amongst other things.

### Microdata

Efficient, syntactically sound data structures are worthless if they are semantically lacking. Fortunately, HTML5 has both angles covered and provides a mechanism for attaching semantic [<VPIcon icon="fa-brands fa-wikipedia-w"/>meta data](https://en.wikipedia.org/wiki/Metadata), called “[<VPIcon icon="fas fa-globe"/>microdata](https://googlewebmastercentral.blogspot.co.uk/2012/07/introducing-structured-data-dashboard.html),” to our structured content. Using microdata, and by consulting [<VPIcon icon="fas fa-globe"/>schema.org](https://schema.org/docs/full.html), you can define a page’s content as anything from a **scholarly article** to an **exercise regimen**. Unlike classes and IDs, this is information that can actually be interpreted usefully.

![Google's structured data dashboard](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9796bc97-3ac5-4d96-b34b-2f3124d3fd8e/typical.png)  

::: note

This microdata was found by Google and displayed in its “Structured Data Dashboard” for the WordPress theme Typical.

:::

---

## Conclusion

HTML isn’t just an SDK or a Graphic Designer’s palette. It is a metalanguage, a language that tells you special information *about* information. Sometimes we — or, more precisely, the parsers we employ — benefit from added information about the subject, timing, origin or popularity of content. This is what APIs such as microdata and RDFa are for. Other times, the context, hierarchy, relative importance and codependence of the information are what need to be determined. This is where appropriate syntax, facilitated by sectioning elements, can be employed.

Some people will tell you not to bother with sectioning. They say that it’s hard work or that it doesn’t make sense. This is hokum. Sure, if you’re lazy, *don’t* bother with sectioning, but don’t pretend you’re doing it on principle. **Using sections demonstrably enhances HTML structure without breaking accessibility**. We’ve covered this.

Still, there will always be people who will attack this aspect of the specification. Perhaps we’ll enjoy some of these objections in the comments:

1. They will point to bad implementations by specific vendors: *These are bugs and bugs get fixed!*
2. They will cite the actions of large websites who don’t use sectioning elements: *Just because large sites haven’t implemented sections doesn’t mean they wouldn’t like to. Since when does big mean ‘right’ anyway?*
3. They will flood you with examples of developers implementing sections badly: *Some developers do stupid things and their misuse of HTML doesn’t stop at sections. I include myself here, by the way.*
4. They will present you with anecdotal evidence about user behavior within specific groups: *It is expensive and impractical to address problems on a case-by-case basis. Fragmentation and complexity would also be inevitable: a loss for the majority of users.*

I don’t think anyone would advocate making badly structured Web documents any more than they’d suggest building a house by stuffing a bag full of bricks and throwing it into a ravine. The case has been made and the specification bears it out: Sections aren’t just good for document structure — they finally make proper structure attainable. Some browsers and screen readers have some catching up to do, that’s for sure, but the situation is improving rapidly. Any kind of change is a little turbulent, but this kind is worth it.

::: info Further Reading

- [**Coding An HTML 5 Layout From Scratch**](/smashingmagazine.com/designing-a-html-5-layout-from-scratch.md)

```component VPCard
{
  "title": "Sexy New HTML5 Semantics",
  "desc": "Much of the excitement we’ve seen so far about HTML5 has been for the new APIs: local storage, application cache, Web workers, 2-D drawing and the like. But let’s not overlook that **HTML5 brings us 30 new elements to mark up documents and applications**, boosting the total number of elements available to us to over 100.",
  "link": "/smashingmagazine.com/html5-semantics.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Learning to Love HTML5**](/smashingmagazine.com/learning-to-love-html5.md)
- [**HTML 5 Cheat Sheet (PDF)**](/smashingmagazine.com/html-5-cheat-sheet-pdf.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Structural Semantics: The Importance Of HTML5 Sectioning Elements",
  "desc": "Now that HTML5 has finally made sectioning elements available, many of us greet them with great reluctance. Make no mistake: Sectioning elements help you improve document structure, and they’re in the spec’ to stay. Once and for all, Heydon Pickering will be exploring the problems these elements solve, the opportunities they offer and their important but misunderstood contribution to the semantic Web. Some people will tell you not to bother with sectioning. They say that it’s hard work or that it doesn’t make sense. This is hokum. Using sections demonstrably enhances HTML structure without breaking accessibility.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/the-importance-of-sections.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
