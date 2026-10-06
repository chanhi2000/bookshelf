---
lang: en-US
title: "5 Good Choices for HTML Containers"
description: "Article(s) > 5 Good Choices for HTML Containers"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 5 Good Choices for HTML Containers"
    - property: og:description
      content: "5 Good Choices for HTML Containers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/blog.master.dev5-good-choices-for-html-containers.html
prev: /programming/css/articles/README.md
date: 2026-10-09
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11290
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
  name="5 Good Choices for HTML Containers"
  desc="Divs and spans are fine, but purposefully meaningless. Often the meaning actually matters, so let's look at some of those situations."
  url="https://master.dev/blog/blog.master.dev/5-good-choices-for-html-containers/"
  logo="https://master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11290"/>

During the [<VPIcon icon="fa-brands fa-wikipedia-w"/>HTML5 revolution](https://en.wikipedia.org/wiki/HTML5), besides sending the Adobe Flash media player [<VPIcon icon="fa-brands fa-apple"/>into retirement](https://web.archive.org/web/20170615060422/https://apple.com/hotnews/thoughts-on-flash/), truly semantic markup made headlines. But even today, it’s not that easy to shake off the habit of reaching for `<div>` and `<span>` when we quickly need a tag to wrap the content.

Sometimes, `<div>` and `<span>` are exactly what we need. They are generic containers with no semantic meaning. They exist as styling targets alone.

But sometimes, generic containers like these make us miss out on the benefits we might get from other tags. In this article, we’ll look into a few elements that can host their content with aspirations beyond meeting the requirement of a tag enclosure.

---

## 1. `<output>`

A typical explanation of `<output>` is this: It’s used to show the results of a calculation. That’s something we could apply in a calculator. But providing semantics to the `4` trailing a `2 + 2` is not the only specialty of this element.

In fact `<output>` is quite special. It is the only HTML element that, by default, is **an [<VPIcon icon="fa-brands fa-firefox"/>ARIA live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)**, meaning screen readers automatically announce content updates inside it.

Reasonably, another use case for `<output>` emerged: **showing dynamic content**, such as alerts and messages acknowledging user actions, so that when they appear on a page, the screen reader user is automatically made aware of them.

```html
<div id="slider">
  <label for="slider-control">Pick a recharge amount</label>
  <input type="range" id="slider-control" min="10" max="50" value="10" step="10">
  <output>Minimum recharge &euro;10</output>
</div>
```

```js
const OUTPUT = document.querySelector('output');
/* show the chosen recharge amount in the output element */
document.getElementById('slider-control').addEventListener('input', (e) => {
  OUTPUT.innerHTML = `The recharge amount is &euro;${e.target.value}`;
});
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/01a0f087-6fb0-79b0-98d9-fd499a824019"
  title="<output> usage example"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info What is it good for?

- Displaying results from calculators and converters.
- Showing error messages, like when user input doesn’t pass validation.
- Providing timely alerts, such as live sports scores.
- Acknowledging user actions, like “10% Coupon has been applied” when a user clicks the coupon button.
- Perfect for countdowns, since the screen reader will announce the new count each time.

::: note

A live region is a section of a web page that updates content dynamically and relays the change to assistive technologies. The default live region mode of `<output>` is **polite**.

:::

---

## 2. `<ul>`

The unordered list element is one of the original gangsters of HTML: a familiar and self-descriptive element used to create, well, an unordered list. When we need a list, like a checklist, `<ul>` is used to show it.

This element is so well made that even its variant, `<menu>`, didn’t have to bring anything new except the semantics. But for all its glory from the structural, semantic, and accessibility advantages, `<ul>` is also an underused element.

Instead of thinking of it as something for a “list”, like in the past, it’s better to think of it as something for **a group of similar items**. That means a carousel, questionnaires, feeds, etc.

`<ul>` is good for all of them. It provides the right structure, orderly navigation, and speech for any assortment of items.

```html
<ul>
  <li> <img src="image-1.jpg" alt="snoopy roasting a marshmallow"> </li>
  <li> <img src="image-2.jpg" alt="snoopy in a sleeping bag"> </li>
  <li> <img src="image-3.jpg" alt="snoopy in a raft"> </li>
  <li> <img src="image-4.jpg" alt="snoopy near a campfire"> </li>
</ul>
```

```css
ul {
  margin: 0;
  padding: 0;
  columns: 2;
  list-style: none;
}
```

<CodePen
  user="editor/anon"
  slug-hash="01a0f08f-8339-7a75-a360-73b7605ef03d"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info What is it good for?

- The usual lists (i.e., a to-do list, inventory, registry, etc.)
- A group of similar things: photo gallery, news digest, announcement board
- A dynamic UI that rotates through a set of items, like a carousel, ticker, or timeline
- Menus and navigation links or buttons
- Product grids
- Lists of things `<ul>`s are good at

:::

---

## 3. `<fieldset>`

Long ago, `<fieldset>` was introduced to address the growing need for a more structured `<form>`.

It provides good semantics and accessibility to user controls. The `<legend>` inside a `<fieldset>` has the space to describe the controls contained in the `<fieldset>`.

Its association as something used in a `<form>`, however, has somewhat limited its employability elsewhere. Doesn’t have to be so.

**All user controls, whether in a submittable form or not, can benefit from the semantics of a `<fieldset>`.** It keeps the focus on the control elements, and if needed, we can disable all the controls in it by applying the `disabled` attribute to the `<fieldset>` container.

Bonus: the `<legend>`’s default style of sitting right on the border line is one of a kind.

```html
<fieldset>
  <legend>Access the Marauder's Map</legend>
  <p id="spellMsg">I solemnly swear that I'm up to no good</p>
  <button id="openMapBtn" aria-describedby="spellMsg">Show map</button>
</fieldset>
```

```css
fieldset {
  width: 350px;
  border: double 2px #2bc25e;
}
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/01a0f08f-8339-7a75-a360-73b7605ef03d"
  title="<ul> usage example"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info What is it good for?

- Forms for user account information broken into sections
- Settings controls, like in a search filter
- Interactive parts of UIs like tabs
- Accordions (like in FAQs)
- Action areas

:::

---

## 4. `<data>`

Typically, we see the attribute `value` associated with input control elements, like a checkbox or slider, where the user picks a value by interacting with the controls.

But some elements show user-friendly text while still having corresponding values that JavaScript or the backend can process. For example, `<option>`:

```html
<option value="PIK">Glasgow Prestwick Airport</option>
<!-- server works with the IATA codes for the respective airports -->
```

`<data>` is also capable of this. **We can display a user-friendly text inside it, and set a `value` that makes data processing cleaner.**

Surely `data-*` attribute can help with that, but with `<data>` we can avoid generic containers, like `<span>`, for information to be processed. Below, the pen’s barcode number is provided in the `value`.

```html
<p>
The <data value="Pigment Liner 308">Staedtler pen</data> is the ultimate tool for precise, long-lasting lines. This fineliner is perfect for writing, sketching, and technical drawing.
</p>
```

```js
document.querySelector('data').addEventListener('pointerenter',
  e=>document.querySelector('output').textContent = `Get the ${e.target.value}!`, 
  { once: true }
);
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/01a0f098-7c2a-7cdc-8e66-80cb7ccd328c"
  title="<data> usage example"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info What is it good for?

- To store product codes like barcodes
- Set IDs for something while its text changes, such as a stock’s price
- Storing numbers for calculations. For example, an amount shown in words has its corresponding digits in `value`
- To provide `<option>`-like functionality outside of `<select>`
- Auto-generated content, like a link to purchase a product based on its product code

:::

---

## 5. `<figure>`

I *figured* I should include it, given how versatile this one is. The `<figure>` element can contain digital images such as photos and illustrations. Visual representations of data like tables, charts, and graphs are also a good fit for `<figure>`.

What makes this element great for such content lies not only in its own capabilities but also in those of its one true heir, `<figcaption>`.

**If a visual element needs a description, it should be placed in a `<figure>` so that its caption can be neatly and semantically wrapped by a `<figcaption>`.** This leads to better accessibility. This expressive markup also helps with SEO and syndication.

```html
<figure>

  <iframe src="/video-url" title="video title"></iframe> 

  <figcaption>
    <strong>Chalk of Champions</strong>
    <p>Great Big Story tells the story of ...</p>
    <ul>
      <li><span>Director:</span> Jackie Omanoff</li>
      <!-- more list items -->
    </ul>
  </figcaption>

</figure>
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/01a0f09a-7e10-7d49-ab57-98cd90cdd914"
  title="<figure> usage example"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info What is it good for?

- Digital images like photos and graphics
- All kinds of diagrams and charts, interactive or not
- Carousels, slideshows, and other demos
- A set of schematic instructions, like in a manual
- Cat videos

:::

Wrapping up, I hope that through this article, we were able to see that, from age-old HTML elements to more recent additions, not only for functionality but also for their service as a parent container, we can pick a good one if we take a moment to look through our options.

```component VPCard
{
  "title": "The Weird Parts of position: sticky;",
  "desc": "There are a number of things that can rain on your sticky parade. Maybe it's time to actually understand why.",
  "link": "/blog.master.dev/the-weird-parts-of-position-sticky.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "A CSS-Powered Add/Remove Tags UI",
  "desc": "Checkboxes and labelsusedto have to be right next to each other to be a potent UI duo. You could do trickery like this:But now, thanks to:has()in CSS, we’re not beholden to that structure anymore.We can :has() it all, as it is said. Now that these HTML elements have some autonomy, without losing their connection to […]",
  "link": "/blog.master.dev/a-css-powered-add-remove-tags-ui.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "CSS Counters in Action",
  "desc": "CSS has counter variables (based on matching selectors) that you can output as formatted content or use in calculations. ",
  "link": "/blog.master.dev/css-counters-in-action.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "5 Good Choices for HTML Containers",
  "desc": "Divs and spans are fine, but purposefully meaningless. Often the meaning actually matters, so let's look at some of those situations.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/blog.master.dev5-good-choices-for-html-containers.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
